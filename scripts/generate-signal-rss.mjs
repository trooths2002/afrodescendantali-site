#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const manifestPath = path.resolve(root, "data/signal-production-feed.json");
const outputPath = path.resolve(root, "public/rss.xml");
const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));

if (manifest.status !== "PUBLISHED" || manifest.activation !== "PRODUCTION_RSS_ENABLED") {
  throw new Error("Production feed manifest is not active");
}
if (manifest.automaticPublication !== false || manifest.externalFeedDiscovery !== "REVIEW_ONLY") {
  throw new Error("Production feed may contain only approved pages; automatic publication must remain disabled");
}
if (!Array.isArray(manifest.items) || manifest.items.length !== 7) {
  throw new Error("Expected exactly seven approved production feed items");
}

const escapeXml = (value) => String(value)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&apos;");
const rfc822 = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw new Error("Invalid date: " + value);
  return date.toUTCString();
};

const ids = new Set();
const urls = new Set();
for (const item of manifest.items) {
  if (!item.id || ids.has(item.id)) throw new Error("Duplicate or missing story ID: " + item.id);
  ids.add(item.id);
  if (!item.path || urls.has(item.path)) throw new Error("Duplicate or missing story path: " + item.path);
  urls.add(item.path);
  const localPath = path.resolve(root, "public", "." + item.path);
  await fs.access(localPath);
  if (!item.title || !item.description || !item.laneLabel) throw new Error("Incomplete feed item: " + item.id);
}

const items = manifest.items.map((item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${manifest.siteUrl.replace(/\/$/, "")}${item.path}</link>
      <guid isPermaLink="true">${manifest.siteUrl.replace(/\/$/, "")}${item.path}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${rfc822(item.publishedAt)}</pubDate>
      <category>${escapeXml(item.laneLabel)}</category>
    </item>`).join("\n");

const output = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Signal — Afrodescendant Ali</title>
    <link>${manifest.siteUrl}</link>
    <description>Published stories from Afrodescendant Ali’s Signal desk across the Black World.</description>
    <language>en</language>
    <lastBuildDate>${rfc822(manifest.generatedAt)}</lastBuildDate>
    <atom:link href="${manifest.feedUrl}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

if (process.argv.includes("--check")) {
  const existing = await fs.readFile(outputPath, "utf8");
  if (existing !== output) throw new Error("public/rss.xml does not match the manifest");
  console.log(JSON.stringify({ status: "PASS", items: manifest.items.length, output: "public/rss.xml" }));
} else {
  await fs.writeFile(outputPath, output, "utf8");
  console.log(JSON.stringify({ status: "WROTE", items: manifest.items.length, output: "public/rss.xml" }));
}
