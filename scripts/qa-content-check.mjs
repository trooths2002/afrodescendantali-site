import { readdir, readFile } from "node:fs/promises";
import { join, extname } from "node:path";

const root = new URL("../public/", import.meta.url);
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
  "coverage/index.html"
];

async function walk(dir, files = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path, files);
    else files.push(path);
  }
  return files;
}

const publicRoot = root.pathname;
const files = await walk(publicRoot);
const textFiles = files.filter((file) => [".html", ".xml", ".json", ".js"].includes(extname(file)));
const failures = [];

for (const required of requiredFiles) {
  try {
    await readFile(join(publicRoot, required));
  } catch {
    failures.push(`missing required public file: ${required}`);
  }
}

for (const file of textFiles) {
  const source = (await readFile(file, "utf8")).toLowerCase();
  for (const phrase of forbidden) {
    if (source.includes(phrase)) failures.push(`${file.replace(publicRoot, "public/")}: forbidden public phrase "${phrase}"`);
  }
}

const index = await readFile(join(publicRoot, "index.html"), "utf8");
if (!/<link[^>]+rel=["']canonical["'][^>]+>/i.test(index)) failures.push("homepage is missing a canonical link");
if (!/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*index/i.test(index)) failures.push("homepage is not explicitly indexable");
if (!/<script[^>]+type=["']application\/ld\+json["']/i.test(index)) failures.push("homepage is missing JSON-LD structured data");

const sitemap = await readFile(join(publicRoot, "sitemap.xml"), "utf8");
for (const lane of ["sub-saharan-africa", "black-america", "black-caribbean", "afro-latino", "afro-europe"]) {
  if (!sitemap.toLowerCase().includes(`/coverage/${lane}`)) {
    failures.push(`sitemap is missing coverage lane: ${lane}`);
  }
}

if (failures.length) {
  console.error(failures.map((failure) => `FAIL ${failure}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`PASS public content contract (${textFiles.length} files scanned)`);
}
