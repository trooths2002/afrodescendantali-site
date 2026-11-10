#!/usr/bin/env node
/**
 * Daily source-refresh and customer-experience health check.
 *
 * This job intentionally produces a review artifact only. It does not write
 * public content, change the sitemap, approve a source, or publish a claim.
 * EXE-20261106-008-PM009-DAILY-FRESHNESS
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artifactRoot = path.resolve(process.env.GITHUB_WORKSPACE || repoRoot, "qa-artifacts");
const args = new Set(process.argv.slice(2));
const runAt = new Date().toISOString();
const executionId = "EXE-20261106-008-PM009-DAILY-FRESHNESS";

await fs.mkdir(artifactRoot, { recursive: true });

function run(command, commandArgs) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, commandArgs, {
      cwd: repoRoot,
      stdio: ["ignore", "pipe", "pipe"]
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("error", reject);
    child.on("close", (code) => resolve({ code, stdout, stderr }));
  });
}

async function writeJson(name, value) {
  await fs.writeFile(
    path.join(artifactRoot, name),
    JSON.stringify(value, null, 2) + "\n",
    "utf8"
  );
}

async function checkPublicSite() {
  const result = {
    checkedAt: new Date().toISOString(),
    homepage: { url: "https://www.afrodescendantali.com/", status: "NOT_CHECKED" },
    queue: { url: "https://www.afrodescendantali.com/news-design-preview/rss-editorial-queue.json", status: "NOT_CHECKED" },
    failures: [],
    notes: []
  };

  try {
    const response = await fetch(result.homepage.url, {
      cache: "no-store",
      headers: { "user-agent": "AfrodescendantAli-DailyHealth/0.1" }
    });
    const body = await response.text();
    result.homepage.status = response.ok ? "OK" : "HTTP_ERROR";
    result.homepage.httpStatus = response.status;
    result.homepage.hasCanonical = /rel=["']canonical["']/i.test(body);
    result.homepage.isIndexable = /name=["']robots["'][^>]+content=["'][^"']*index/i.test(body);
    if (!response.ok) result.failures.push("production homepage did not return 2xx");
    if (!result.homepage.hasCanonical) result.failures.push("production homepage is missing a canonical link");
    if (!result.homepage.isIndexable) result.failures.push("production homepage is not explicitly indexable");
  } catch (error) {
    result.homepage.status = "FETCH_ERROR";
    result.failures.push("production homepage health check failed: " + error.message);
  }

  try {
    const response = await fetch(result.queue.url, {
      cache: "no-store",
      headers: { "user-agent": "AfrodescendantAli-DailyHealth/0.1" }
    });
    result.queue.httpStatus = response.status;
    if (!response.ok) {
      result.queue.status = "FALLBACK_ALLOWED";
      result.notes.push("Queue endpoint unavailable; the homepage should retain published analysis as its safe fallback.");
    } else {
      const payload = await response.json();
      result.queue.status = Array.isArray(payload.items) ? "OK" : "INVALID_JSON";
      result.queue.itemCount = Array.isArray(payload.items) ? payload.items.length : 0;
      if (!Array.isArray(payload.items)) result.failures.push("queue endpoint returned JSON without an items array");
    }
  } catch (error) {
    result.queue.status = "FALLBACK_ALLOWED";
    result.notes.push("Queue health check could not read the optional review endpoint; fallback remains the expected customer path.");
  }

  return result;
}

const fetchResult = await run(process.execPath, [
  path.join(repoRoot, "scripts", "rss-pilot.mjs"),
  "--fetch",
  "--allow-readonly-fetch"
]);

if (fetchResult.code !== 0) {
  console.error(fetchResult.stderr || "rss-pilot exited non-zero");
  process.exit(fetchResult.code || 1);
}

let payload;
try {
  payload = JSON.parse(fetchResult.stdout);
} catch (error) {
  console.error("rss-pilot did not return valid JSON:", error.message);
  process.exit(1);
}

const validationFailures = [];
if (payload.mode !== "READ_ONLY_REVIEW_QUEUE") validationFailures.push("unexpected RSS mode");
if (payload.publishAutomatically !== false) validationFailures.push("publishAutomatically must remain false");
if (!Array.isArray(payload.items)) validationFailures.push("review queue items must be an array");

for (const item of payload.items || []) {
  if (item.approvalState !== "pending_review") validationFailures.push(item.id + ": item is not pending_review");
  if (!["DIRECT_LINK_ONLY", "REVIEW_REQUIRED"].includes(item.rightsState)) validationFailures.push(item.id + ": unsupported rights state");
  if (item.directSourceLink !== true) validationFailures.push(item.id + ": direct source link is missing");
  if (typeof item.link !== "string" || !item.link.startsWith("https://")) validationFailures.push(item.id + ": source link is not HTTPS");
  if (item.previewPath) validationFailures.push(item.id + ": previewPath must not be emitted by the daily discovery job");
}

const sources = Array.isArray(payload.sources) ? payload.sources : [];
const reachableSources = sources.filter((source) => ["OK", "EMPTY"].includes(source.status));
const sourceFailures = sources.filter((source) => !["OK", "EMPTY"].includes(source.status));

const report = {
  version: "0.1",
  executionId,
  runAt,
  disposition: "REVIEW_ONLY_ARTIFACT",
  publicPublication: false,
  sitemapChanged: false,
  sourceRefresh: {
    mode: payload.mode,
    retrievedAt: payload.retrievedAt || null,
    sourcesChecked: sources.length,
    eligibleFeeds: payload.eligibleFeeds || sources.length,
    skippedFeeds: payload.skippedFeeds || 0,
    reachableSources: reachableSources.length,
    sourceFailures: sourceFailures.length,
    itemsRetrieved: payload.itemsRetrieved || 0,
    uniqueItems: payload.uniqueItems || 0,
    validationFailures
  },
  publicHealth: args.has("--check-public") ? await checkPublicSite() : {
    status: "NOT_REQUESTED",
    notes: ["Pass --check-public in the scheduled workflow to verify the production fallback."]
  },
  nextGate: "Editorial/owner approval is required before any source item can become approved_for_preview or change public pages."
};

await writeJson("daily-review-queue.json", payload);
await writeJson("daily-source-refresh.json", report);
console.log(JSON.stringify(report, null, 2));

if (reachableSources.length === 0) {
  console.error("No source endpoint returned a usable response.");
  process.exitCode = 1;
}
if (validationFailures.length > 0) {
  console.error("Review-queue validation failed.");
  process.exitCode = 1;
}
if (report.publicHealth.failures?.length > 0) {
  console.error("Production customer-experience health check failed.");
  process.exitCode = 1;
}
