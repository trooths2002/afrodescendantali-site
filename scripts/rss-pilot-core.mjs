import crypto from "node:crypto";

export const COVERAGE_LANES = [
  "africa",
  "black-america",
  "caribbean",
  "afro-latin-america",
  "afro-europe",
  "indian-ocean-global"
];

export function clean(value = "") {
  return String(value)
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

export function normalizeTitle(value = "") {
  return clean(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function canonicalizeLink(raw = "") {
  if (!raw) return "";
  try {
    const url = new URL(raw.trim());
    url.hash = "";
    for (const key of [...url.searchParams.keys()]) {
      if (/^(utm_|fbclid$|gclid$|mc_cid$|mc_eid$|ref$)/i.test(key)) {
        url.searchParams.delete(key);
      }
    }
    url.pathname = url.pathname.replace(/\\/{2,}/g, "/").replace(/\\/$/, "") || "/";
    return url.toString();
  } catch {
    return "";
  }
}

function firstTag(block, names) {
  for (const name of names) {
    const safeName = name.replace(":", "\\:");
    const match = block.match(new RegExp("<" + safeName + "(?:\\\\s[^>]*)?>([\\\\s\\\\s]*?)</" + safeName + ">", "i"));
    if (match) return clean(match[1]);
  }
  return "";
}

function linkFrom(block) {
  const atom = block.match(/<link\\b[^>]*href=["']([^"']+)["'][^>]*\\/?>(?:<\\/link>)?/i);
  if (atom) return atom[1].trim();
  return firstTag(block, ["link", "guid", "id"]);
}

export function parseFeed(xml, feed, maxItems = 12) {
  const blocks = String(xml || "").match(/<(?:item|entry)\\b[\\s\\S]*?<\\/(?:item|entry)>/gi) || [];
  return blocks.slice(0, maxItems).map((block) => {
    const title = firstTag(block, ["title"]);
    const link = linkFrom(block);
    const canonicalLink = canonicalizeLink(link);
    const publishedAt = firstTag(block, ["pubDate", "published", "updated", "dc:date"]);
    const guid = firstTag(block, ["guid", "id"]);
    const fingerprint = crypto
      .createHash("sha256")
      .update([feed.id, canonicalLink || guid || normalizeTitle(title), normalizeTitle(title)].join("|"))
      .digest("hex");
    return {
      fingerprint,
      sourceId: feed.id,
      sourceName: feed.name,
      lane: feed.lane,
      title,
      link,
      canonicalLink,
      publishedAt,
      guid: guid || null
    };
  }).filter((item) => item.title && item.canonicalLink);
}

export function dedupeItems(items = []) {
  const seen = new Set();
  return items.filter((item) => {
    const key = item.canonicalLink || canonicalizeLink(item.link) || item.guid || normalizeTitle(item.title);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function toReviewItem(item, feed, retrievedAt) {
  const candidate = feed.status !== "reviewed";
  return {
    id: "rss-" + item.fingerprint.slice(0, 16),
    lane: item.lane,
    sourceId: item.sourceId,
    sourceName: item.sourceName,
    sourceStatus: candidate ? "CANDIDATE_FEED" : "REVIEWED_FEED",
    approvalState: "pending_review",
    rightsState: candidate ? "REVIEW_REQUIRED" : "DIRECT_LINK_ONLY",
    title: item.title,
    link: item.canonicalLink,
    guid: item.guid,
    publishedAt: item.publishedAt || null,
    retrievedAt,
    directSourceLink: true
  };
}

export function summarizeLanes(items = []) {
  const summary = Object.fromEntries(COVERAGE_LANES.map((lane) => [lane, {
    collected: 0,
    unique: 0,
    pendingReview: 0
  }]));
  for (const item of items) {
    const lane = summary[item.lane] || (summary[item.lane] = { collected: 0, unique: 0, pendingReview: 0 });
    lane.collected += 1;
  }
  return summary;
}

export function markUniqueAndPending(summary, uniqueItems) {
  for (const item of uniqueItems) {
    const lane = summary[item.lane] || (summary[item.lane] = { collected: 0, unique: 0, pendingReview: 0 });
    lane.unique += 1;
    lane.pendingReview += 1;
  }
  return summary;
}

export function classifyFeedFailure(status, itemCount) {
  if (status === "FETCH_ERROR") return "FETCH_ERROR";
  if (status === "TIMEOUT") return "TIMEOUT";
  if (typeof status === "number" && status >= 200 && status < 300 && itemCount === 0) return "EMPTY";
  if (typeof status === "number" && status >= 200 && status < 300) return "OK";
  if (typeof status === "number") return "HTTP_ERROR";
  return "MALFORMED_OR_UNSUPPORTED";
}
