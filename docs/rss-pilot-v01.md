# Afrodescendant Ali RSS Pilot v0.1

Execution: EXE-20261028-007  
Project: PM-009 — AfrodescendantAli.com  
Status: NON-PRODUCTION / OWNER REVIEW REQUIRED

## Outcome contract

Build one bounded vertical slice across the six newsroom lanes:

- Africa
- Black America
- Caribbean
- Afro-Latin America
- Afro-Europe
- Indian Ocean & global corridors

The slice must collect public RSS/Atom metadata, normalize it, preserve direct source links, assign source and rights states, deduplicate repeated stories, and route every item into an editorial queue. It must not publish automatically.

## Included

- The existing 16-feed source manifest, disabled by default.
- A pure normalization and deduplication core.
- A read-only collector that prints a review-queue payload and never writes files or external systems.
- A preview fixture with six approved-for-preview cards and pending/held queue examples.
- A local preview adapter that renders only approved-for-preview items.
- Node tests for canonical-link deduplication, direct-link enforcement, lane coverage, and approval-state handling.


## Expanded source tranche — 2026-10-28

The source manifest now includes an AllAfrica latest-headlines feed and additional Black America and Caribbean candidates. AllAfrica is marked reviewed for metadata-only pilot use because its publisher states that headline modules are available at no charge when the site credits AllAfrica and links back to AllAfrica or the relevant feed page. The underlying rights of AllAfrica partner publishers remain unassumed.

The Root, TheGrio, Black Enterprise, Blavity, Nation News, Barbados Today, Trinidad and Tobago Newsday, WIC News, News Americas Now and Caribbean National Weekly remain disabled candidates until runtime behavior and source terms support the intended metadata-only/direct-link treatment. Barbados Today and WIC News currently carry explicit rights holds in the manifest.

The expanded browser fetch is evidence only: it does not activate feeds, publish stories, create recurrence, or authorize excerpts, images, translations, or article reuse.

## Runtime commands

~~~text
node scripts/rss-pilot.mjs
node scripts/rss-pilot.mjs --fetch --allow-readonly-fetch
node --test scripts/rss-pilot.test.mjs
~~~

The network command is intentionally double-gated. The manifest remains disabled for production, and the collector only performs bounded GET requests when --allow-readonly-fetch is explicitly supplied.

## State model

pending_review is the default state for every collected item. The collector cannot create approved, published, lead, developing, or notify states.

The preview fixture uses approved_for_preview, which is not a production approval state.

Source labels:

- REVIEWED_FEED — feed endpoint has passed the current source review.
- CANDIDATE_FEED — endpoint still needs runtime or terms review.
- PRIMARY — reserved for an item later verified against a primary source.
- UNVERIFIED — insufficient evidence for editorial use.

Rights states:

- DIRECT_LINK_ONLY
- REVIEW_REQUIRED
- HOLD_MISSING_DIRECT_LINK
- HOLD_SOURCE_FAILURE

## Deduplication

The pilot removes duplicate records in this order:

1. canonical URL with tracking parameters removed;
2. feed GUID or Atom ID;
3. normalized title as a last-resort fallback.

The source URL is retained for every item that survives normalization. Items without a direct link are held and never enter the approved preview surface.

## Failure states

A feed can resolve to:

- OK
- EMPTY
- HTTP_ERROR
- FETCH_ERROR
- TIMEOUT
- MALFORMED_OR_UNSUPPORTED

A failed feed does not remove existing editorial content. It produces an explicit source-health result for review.

## Activation gate

Do not activate recurrence or production rendering until:

1. all six lanes have an approved source tranche;
2. source terms and direct-link handling are reviewed;
3. duplicate and malformed-feed tests pass;
4. rights/failure states are visible to the editor;
5. desktop and 375px mobile preview QA passes;
6. an owner explicitly authorizes feed activation and release preparation.

No GitHub Actions schedule, Cloudflare Worker schedule, production deployment, indexability change, notification, or automatic publication is included in this pilot.
