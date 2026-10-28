#!/usr/bin/env node
/**
 * Afrodescendant Ali bounded RSS pilot v0.1
 * EXE-20261028-007
 *
 * This command is read-only. It never writes files, Drive, GitHub,
 * website content, notifications or publication records.
 */

import fs from "node:fs/promises";
import process from "node:process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  dedupeItems,
  parseFeed,
  toReviewItem,
  summarizeLanes,
  markUniqueAndPending,
  classifyFeedFailure
} from "./rss-pilot-core.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(await fs.readFile(path.resolve(here, "../data/rss-coverage-feeds.json"), "utf8"));
const args = new Set(process.argv.slice(2));

if (!args.has("--fetch")) {
  const byLane = manifest.feeds.reduce((result, feed) => {
    result[feed.lane] = (result[feed.lane] || 0) + 1;
    return result;
  }, {});
  console.log(JSON.stringify({
    executionId: "EXE-20261028-007",
    mode: "MANIFEST_INSPECTION",
    activation: manifest.activation,
    publishAutomatically: manifest.defaults.publishAutomatically,
    feeds: manifest.feeds.length,
    enabled: manifest.feeds.filter((feed) => feed.enabled).length,
    byLane,
    nextStep: "Use --fetch --allow-readonly-fetch for a bounded metadata-only run."
  }, null, 2));
  process.exit(0);
}

if (!args.has("--allow-readonly-fetch")) {
  console.error("Refusing network fetch: add --allow-readonly-fetch explicitly.");
  process.exit(2);
}

const includeCandidates = args.has("--include-candidates");
const feeds = manifest.feeds.filter((feed) => {
  if (!feed.enabled) return false;
  if (feed.status === "reviewed" || feed.status === "reviewed-link-only") return true;
  if (includeCandidates && (feed.status === "candidate" || feed.status === "candidate-restored")) return true;
  return false;
});
const feedById = new Map(feeds.map((feed) => [feed.id, feed]));
const retrievedAt = new Date().toISOString();
const results = [];

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "user-agent": "AfrodescendantAli-RSS-Pilot/0.1 (+metadata-only; owner-review-required)"
      }
    });
    return {
      ok: response.ok,
      status: response.status,
      contentType: response.headers.get("content-type") || "",
      body: await response.text()
    };
  } finally {
    clearTimeout(timeout);
  }
}

for (const feed of feeds) {
  try {
    const response = await fetchWithTimeout(feed.endpoint, manifest.defaults.timeoutMs);
    const parsed = response.ok ? parseFeed(response.body, feed, manifest.defaults.maxItemsPerFeed) : [];
    results.push({
      sourceId: feed.id,
      lane: feed.lane,
      name: feed.name,
      endpoint: feed.endpoint,
      status: classifyFeedFailure(response.status, parsed.length),
      httpStatus: response.status,
      contentType: response.contentType,
      itemCount: parsed.length,
      items: parsed
    });
  } catch (error) {
    const status = error.name === "AbortError" ? "TIMEOUT" : "FETCH_ERROR";
    results.push({
      sourceId: feed.id,
      lane: feed.lane,
      name: feed.name,
      endpoint: feed.endpoint,
      status,
      error: error.name === "AbortError" ? "TIMEOUT" : error.message,
      itemCount: 0,
      items: []
    });
  }
}

const allItems = results.flatMap((result) => result.items);
const uniqueItems = dedupeItems(allItems);
const laneSummary = markUniqueAndPending(summarizeLanes(allItems), uniqueItems);
const reviewQueue = uniqueItems.map((item) => toReviewItem(item, feedById.get(item.sourceId), retrievedAt));

console.log(JSON.stringify({
  executionId: "EXE-20261028-007",
  mode: "READ_ONLY_REVIEW_QUEUE",
  activation: manifest.activation,
  publishAutomatically: false,
  retrievedAt,
  sourcesChecked: results.length,
  itemsRetrieved: allItems.length,
  uniqueItems: uniqueItems.length,
  lanes: laneSummary,
  sources: results.map(({ items, ...source }) => source),
  items: reviewQueue
}, null, 2));
