# Signal Production RSS and Discovery Automation v0.1

Date: 2026-11-20 (Africa/Nairobi)
Project: PM-009 — AfrodescendantAli.com
Status: PRODUCTION RSS ENABLED / DISCOVERY AUTOMATION ACTIVE / AUTOMATIC PUBLICATION DISABLED

## Release boundary

The production feed at https://www.afrodescendantali.com/rss.xml contains only the five owner-approved Signal story pages in `data/signal-production-feed.json`. The feed links to Afrodescendant Ali pages; it does not republish external article text, images, audio or video.

The homepage advertises the feed through an RSS alternate link and states that external feeds remain review-only. The five story cards and their article pages remain the approved production content from the five-story release.

## Published-feed manifest

- Governing execution: `EXE-20261120-016-ADN-SIGNAL-FIVE-STORY-PRODUCTION-RSS`
- Governing decision: `DEC-20261120-006-ADN-SIGNAL-FIVE-STORY-PRODUCTION-RSS`
- Feed source: `data/signal-production-feed.json`
- Generated artifact: `public/rss.xml`
- Generator: `scripts/generate-signal-rss.mjs`
- Validation: `node scripts/generate-signal-rss.mjs --check`

The generator validates unique story IDs and URLs and confirms that each manifest path exists in `public/news` before writing the feed.

## Discovery automation

A separate GitHub Actions workflow runs at 06:00 UTC (09:00 Africa/Nairobi) and supports manual dispatch:

- reads the existing `data/rss-coverage-feeds.json` manifest;
- performs bounded metadata-only GET requests;
- preserves direct links, source status, lane, publication time and source-health results;
- deduplicates by canonical link and routes every item to `pending_review`;
- uploads the JSON review queue as a short-retention workflow artifact.

The workflow does not commit the queue, modify the website, publish a story, change indexability, reuse source media, send notifications, contact publishers or enable automatic article publication. Each workflow run is identified by its GitHub run ID and is tied to the governing production execution as a parent reference.

## Release QA and rollback

Required checks are:

1. parser tests pass;
2. the production-feed generator check passes;
3. five unique feed items resolve to five approved story pages;
4. homepage and article routes render at desktop and mobile widths;
5. the production deployment points to the approved release commit;
6. live RSS returns XML with five items.

Rollback is a versioned Git revert of the release commit, followed by Cloudflare deployment readback. Removing the RSS link/feed is not a substitute for recording the rollback.

## Editorial rule

An external RSS item is a lead. It becomes publishable only after source, claim, rights, image, accessibility, legal and owner-approval gates are complete. The production RSS feed never turns discovery results into published articles automatically.
