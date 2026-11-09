import { readdir, readFile } from "node:fs/promises";
import { join, extname } from "node:path";

const root = new URL("../public/", import.meta.url).pathname;
const forbidden = [
  "pending_review",
  "private editorial draft",
  "private preview only",
  "fixture",
  "candidate source",
  "review required",
  "still being reviewed",
  "feed activation disabled"
];
const requiredFiles = [
  "index.html",
  "sitemap.xml",
  "robots.txt",
  "analysis/index.html",
  "coverage/index.html",
  "coverage/indian-ocean.html",
  "standards.html",
  "corrections.html"
];

async function walk(dir, files = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && entry.name === "news-design-preview") continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path, files);
    else files.push(path);
  }
  return files;
}

const publicRoot = root;
const files = await walk(publicRoot);
const textFiles = files.filter((file) => [".html", ".xml"].includes(extname(file)));
const failures = [];

for (const required of requiredFiles) {
  try { await readFile(join(publicRoot, required)); }
  catch { failures.push(`missing required public file: ${required}`); }
}

for (const file of textFiles) {
  const source = (await readFile(file, "utf8")).toLowerCase();
  for (const phrase of forbidden) {
    if (source.includes(phrase)) failures.push(`${file.replace(publicRoot, "public/")}: forbidden public phrase "${phrase}"`);
  }
  if (/\b\d+\s*(?:s|m|h|d)\s+ago\b/i.test(source)) {
    failures.push(`${file.replace(publicRoot, "public/")}: unanchored relative freshness label`);
  }
}

const index = await readFile(join(publicRoot, "index.html"), "utf8");
if (!/<link[^>]+rel=["']canonical["'][^>]+>/i.test(index)) failures.push("homepage is missing a canonical link");
if (!/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*index/i.test(index)) failures.push("homepage is not explicitly indexable");
if (!/<script[^>]+type=["']application\/ld\+json["']/i.test(index)) failures.push("homepage is missing JSON-LD structured data");
if (!/standards\.html/i.test(index)) failures.push("homepage is missing a visible editorial standards link");
if (!/corrections\.html/i.test(index)) failures.push("homepage is missing a visible corrections link");
if (!/Source note/i.test(index)) failures.push("homepage is missing explicit source-note labeling");

for (const file of textFiles) {
  const source = await readFile(file, "utf8");
  if (/"@type"\s*:\s*"NewsArticle"/i.test(source)) {
    if (!/"datePublished"\s*:/i.test(source)) failures.push(`${file.replace(publicRoot, "public/")}: NewsArticle is missing datePublished`);
    if (!/"dateModified"\s*:/i.test(source)) failures.push(`${file.replace(publicRoot, "public/")}: NewsArticle is missing dateModified`);
  }
}

const briefsStart = index.indexOf('id="latest-briefs"');
const briefsEnd = index.indexOf("</section>", briefsStart);
const briefs = briefsStart >= 0 && briefsEnd > briefsStart ? index.slice(briefsStart, briefsEnd) : "";
const briefDates = ["2026-11-08", "2026-11-06", "2026-11-04", "2026-11-03"];
let previousDatePosition = -1;
for (const date of briefDates) {
  const position = briefs.indexOf(date);
  if (position < 0) failures.push(`homepage latest briefs is missing date: ${date}`);
  if (position >= 0 && position <= previousDatePosition) failures.push("homepage latest briefs are not ordered newest first");
  if (position >= 0) previousDatePosition = position;
}

const sitemap = await readFile(join(publicRoot, "sitemap.xml"), "utf8");
for (const lane of ["sub-saharan-africa", "black-america", "black-caribbean", "afro-latino", "afro-europe", "indian-ocean"]) {
  if (!sitemap.toLowerCase().includes(`/coverage/${lane}`)) failures.push(`sitemap is missing coverage lane: ${lane}`);
}

if (failures.length) {
  console.error(failures.map((failure) => `FAIL ${failure}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`PASS public content contract (${textFiles.length} files scanned)`);
}
