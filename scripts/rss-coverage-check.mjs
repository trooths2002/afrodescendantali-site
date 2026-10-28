#!/usr/bin/env node
/**
 * Afrodescendant Ali RSS Coverage Checker v0.1
 * EXE-20261028-005
 *
 * Default mode is manifest inspection. Use --fetch --allow-readonly-fetch
 * for bounded GETs against reviewed feeds. This script never writes files,
 * Drive, GitHub, website content or notifications.
 */

import fs from "node:fs/promises";
import crypto from "node:crypto";
import process from "node:process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const manifestPath = path.resolve(here, "../data/rss-coverage-feeds.json");
const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
const args = new Set(process.argv.slice(2));

function clean(value = "") {
  return value
    .replace(/<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>/gi, "$1")
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/\\s+/g, " ")
    .trim();
}

function firstTag(block, names) {
  for (const name of names) {
    const re = new RegExp("<" + name + "(?:\\\\s[^>]*)?>([\\\\s\\\\S]*?)</" + name + ">", "i");
    const match = block.match(re);
    if (match) return clean(match[1]);
  }
  return "";
}

function linkFrom(block) {
  const atom = block.match(/<link\\b[^>]*href=["']([^"']+)["'][^>]*\\/?>(?:<\\/link>)?/i);
  if (atom) return atom[1].trim();
  return firstTag(block, ["link", "guid", "id"]);
}

function parseFeed(xml, feed) {
  const blocks = xml.match(/<(?:item|entry)\\b[\\s\\S]*?<\\/(?:item|entry)>/gi) || [];
  return blocks.slice(0, manifest.defaults.maxItemsPerFeed).map((block) => {
    const title = firstTag(block, ["title"]);
    const link = linkFrom(block);
    const publishedAt = firstTag(block, ["pubDate", "published", "updated", "dc:date"]);
    const guid = firstTag(block, ["guid", "id"]);
    const fingerprint = crypto
      .createHash("sha256")
      .update([feed.id, guid || link, title].join("|"))
      .digest("hex");
    return {
      fingerprint,
      sourceId: feed.id,
      sourceName: feed.name,
      lane: feed.lane,
      title,
      link,
      publishedAt,
      guid: guid || null
    };
  }).filter((item) => item.title && item.link);
}

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "user-agent": "AfrodescendantAli-RSS-Checker/0.1 (+metadata-only; contact-owner-before-activation)"
      }
    });
    const body = await response.text();
    return {
      ok: response.ok,
      status: response.status,
      contentType: response.headers.get("content-type") || "",
      body
    };
  } finally {
    clearTimeout(timeout);
  }
}

if (!args.has("--fetch")) {
  const summary = manifest.feeds.reduce((acc, feed) => {
    acc[feed.lane] = (acc[feed.lane] || 0) + 1;
    return acc;
  }, {});
  console.log(JSON.stringify({
    executionId: manifest.executionId,
    activation: manifest.activation,
    feeds: manifest.feeds.length,
    enabled: manifest.feeds.filter((feed) => feed.enabled).length,
    byLane: summary,
    nextStep: "Use --fetch --allow-readonly-fetch for bounded metadata-only checks."
  }, null, 2));
  process.exit(0);
}

if (!args.has("--allow-readonly-fetch")) {
  console.error("Refusing network fetch: add --allow-readonly-fetch explicitly.");
  process.exit(2);
}

const includeCandidates = args.has("--include-candidates");
const feeds = manifest.feeds.filter((feed) =>
  feed.status === "reviewed" || (includeCandidates && feed.status === "candidate")
);
const retrievedAt = new Date().toISOString();
const results = [];

for (const feed of feeds) {
  try {
    const response = await fetchWithTimeout(feed.endpoint, manifest.defaults.timeoutMs);
    const items = response.ok ? parseFeed(response.body, feed) : [];
    results.push({
      sourceId: feed.id,
      lane: feed.lane,
      name: feed.name,
      endpoint: feed.endpoint,
      status: response.status,
      contentType: response.contentType,
      itemCount: items.length,
      items,
      retrievedAt
    });
  } catch (error) {
    results.push({
      sourceId: feed.id,
      lane: feed.lane,
      name: feed.name,
      endpoint: feed.endpoint,
      status: "FETCH_ERROR",
      error: error.name === "AbortError" ? "TIMEOUT" : error.message,
      itemCount: 0,
      items: [],
      retrievedAt
    });
  }
}

const allItems = results.flatMap((result) => result.items);
const seen = new Set();
const deduped = allItems.filter((item) => {
  const key = item.link || item.fingerprint;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

console.log(JSON.stringify({
  executionId: manifest.executionId,
  mode: "READ_ONLY_METADATA_CHECK",
  retrievedAt,
  sourcesChecked: results.length,
  itemsRetrieved: allItems.length,
  uniqueItems: deduped.length,
  sources: results.map(({ items, ...source }) => ({ ...source })),
  items: deduped
}, null, 2));
