# Afrodescendant Ali RSS Coverage Layer v0.1

Execution: EXE-20261028-005  
Project: PM-009 — AfrodescendantAli.com  
Status: NON-PRODUCTION / OWNER REVIEW REQUIRED

## Purpose

Create a bounded, source-controlled discovery layer for the existing Black World coverage map:

- Africa
- Black America
- Caribbean
- Afro-Latin America
- Afro-Europe
- Indian Ocean and global corridors

The RSS layer is a signal intake mechanism. It is not an automatic publishing system, source-verification system, or replacement for editorial judgment.

## Operating contract

1. Fetch only public RSS/Atom endpoints listed in the manifest.
2. Store metadata only: source, lane, title, link, published time, feed identifier and retrieval timestamp.
3. Keep the direct source link with every item.
4. Deduplicate by canonical link, GUID/ID and normalized title.
5. Do not rewrite, translate, excerpt, republish, embed, notify, or publish automatically.
6. Route discovered items into a review queue before any article, reel, case file or homepage placement.
7. Stop on repeated feed failures, terms uncertainty, malformed XML or missing direct links.
8. Keep all feed activation and recurring scheduling owner-gated.

## First source tranche

The initial manifest includes official or publisher-linked endpoints for Africanews, VOA Africa, WHO AFRO, TheGrio, Black Enterprise, Jamaica Observer, Jamaica Gleaner, Mundo Negro, Race & Equality, Afropean, Diaspora Africa and regional candidates.

All entries are disabled by default. A reviewed endpoint is not the same as permission to republish its content.

## Rights posture

Some publishers explicitly limit RSS use to non-commercial, unmodified, attributed and directly linked use. Those feeds must remain metadata-only until a separate owner decision confirms the intended use. The site’s commercial work must not be used to imply permission to reuse third-party feed content.

## Runtime shape

~~~
RSS endpoint
  → bounded fetch
  → XML/Atom normalization
  → canonical link + GUID dedupe
  → coverage-lane classification
  → review queue
  → human source verification
  → optional editorial production
~~~

The first implementation is a read-only checker. It produces JSON to stdout and makes no Drive, GitHub, website, notification or publication writes.

## Activation gate

Before scheduled collection:

- approve the source manifest;
- run a bounded read-only fetch against reviewed feeds;
- inspect freshness, duplicate rate, malformed items and regional balance;
- define the named downstream review queue;
- confirm retention and rights handling;
- explicitly authorize recurrence.

No GitHub Actions schedule, Cloudflare Worker, production deployment or external notification is included in v0.1.
