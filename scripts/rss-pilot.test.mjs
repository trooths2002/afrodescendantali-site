import test from "node:test";
import assert from "node:assert/strict";
import {
  parseFeed,
  dedupeItems,
  toReviewItem,
  summarizeLanes,
  markUniqueAndPending
} from "./rss-pilot-core.mjs";

const feed = {
  id: "fixture-feed",
  name: "Fixture Publisher",
  lane: "africa",
  status: "reviewed"
};

test("parses RSS items and canonicalizes tracking parameters", () => {
  const xml = [
    "<rss><channel>",
    "<item><title>One story</title><link>https://publisher.test/story?utm_source=rss</link><guid>one</guid><pubDate>Tue, 28 Oct 2026 08:00:00 GMT</pubDate></item>",
    "<item><title>Missing link is held</title><guid>two</guid></item>",
    "</channel></rss>"
  ].join("");
  const items = parseFeed(xml, feed, 12);
  assert.equal(items.length, 1);
  assert.equal(items[0].canonicalLink, "https://publisher.test/story");
});

test("deduplicates the same story across feeds", () => {
  const items = [
    { title: "Same story", link: "https://publisher.test/story?utm_medium=rss", canonicalLink: "https://publisher.test/story" },
    { title: "Same story", link: "https://publisher.test/story", canonicalLink: "https://publisher.test/story" }
  ];
  assert.equal(dedupeItems(items).length, 1);
});

test("routes every collected item to pending review", () => {
  const item = {
    fingerprint: "1234567890abcdef1234",
    sourceId: feed.id,
    sourceName: feed.name,
    lane: feed.lane,
    title: "A source-controlled signal",
    canonicalLink: "https://publisher.test/story",
    guid: "one",
    publishedAt: "2026-10-28T08:00:00Z"
  };
  const review = toReviewItem(item, feed, "2026-10-28T09:00:00Z");
  assert.equal(review.approvalState, "pending_review");
  assert.equal(review.rightsState, "DIRECT_LINK_ONLY");
  assert.equal(review.directSourceLink, true);
});

test("keeps all six coverage lanes visible even when empty", () => {
  const summary = markUniqueAndPending(
    summarizeLanes([{ lane: "africa" }, { lane: "africa" }]),
    [{ lane: "africa" }]
  );
  assert.deepEqual(summary.africa, { collected: 2, unique: 1, pendingReview: 1 });
  assert.deepEqual(summary["indian-ocean-global"], { collected: 0, unique: 0, pendingReview: 0 });
});
