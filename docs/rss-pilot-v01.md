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


Final bounded fetch result — 2026-10-28: 24 endpoints checked; 136 capped metadata items; 132 unique; 4 duplicates (2.9%). All six lanes returned runtime items. The pilot remains PARTIAL / RELEASE HOLD because candidate and rights-held sources, unresolved endpoint failures, and empty/unsupported feed states remain visible. No recurrence, automatic publication, production release, deployment, indexability change or rights-sensitive reuse is authorized.

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

## Retry tranche and terms review — 2026-10-28

A read-only retry was run against the unresolved endpoints plus the newly added CIJN candidate. No feed was enabled and no story was published.

### Retry dispositions

| Source | Runtime observation | Rights / freshness disposition |
| --- | --- | --- |
| Africanews | Official RSS endpoint returned parseable XML items in the direct browser retry. | Remains disabled pending collector-side confirmation and source attribution review. |
| VOA Africa | Endpoint served XML, but the current verification surface could not parse the response for item counting. | Keep disabled pending collector verification. |
| Jamaica Gleaner | Still not verified as a parseable feed. | Keep disabled; replace or obtain publisher confirmation. |
| Trinidad and Tobago Newsday | Retry timed out / did not yield a verified parseable feed. | Keep disabled pending endpoint verification and terms review. |
| WIC News | Endpoint returned XML, but parser compatibility was not confirmed; terms restrict reuse without permission. | Keep disabled; rights permission and parser verification required. |
| News Americas Now | Direct retry exposed RSS items, but the publisher's data/licensing materials require a rights determination for reuse. | Keep disabled; metadata/link-only treatment requires written or clearly documented permission. |
| Caribbean National Weekly | Feed URL redirected to the HTML homepage rather than a verified RSS response. | Keep disabled pending a real feed endpoint and terms review. |
| Global Voices — Indian Ocean | Endpoint remained inaccessible in the bounded retry. | Keep disabled pending runtime verification. |
| CIJN | Official RSS endpoint parsed successfully, but the newest observed item was dated April 2026. | Added as a disabled candidate; stale feed and RSS reuse rights require resolution. |

### Black America terms review

TheGrio, Black Enterprise, The Root and Blavity remain disabled. The review found no clean basis for automatic RSS reuse:

- TheGrio: official contact materials point to publisher Terms of Service and editorial review, but do not grant RSS reuse.
- Black Enterprise: official About/Contact materials and the public feed were reviewed, but no RSS-specific reuse license was located.
- The Root: G/O terms limit ordinary access to personal, noncommercial use and do not confirm RSS reuse.
- Blavity: terms restrict use to personal, noncommercial access and prohibit reproduction, distribution, modification, republication and commercial use.

### QA result

The bounded normalization tests passed: 4/4. This covers tracking-parameter canonicalization, duplicate removal, direct-link enforcement, pending-review routing and visibility of all six lanes.

The pilot remains **PARTIAL / RELEASE HOLD**. Recurrence, automatic publication, production deployment, indexability, notifications and rights-sensitive reuse remain disabled.

## Permission outreach and full current-manifest fetch — 2026-10-28

Permission outreach was prepared for viable Black America and Caribbean sources. No message was sent and no contact form was submitted.

- Black Enterprise: unsent draft prepared to the official editorial contact listed on its Contact page.
- Barbados Today: unsent draft prepared to the official editorial contact listed on its About page.
- TheGrio, Nation News, News Americas Now and CIJN: official contact/licensing routes documented; form or licensing submission remains pending.
- The Root and Blavity remain held because no clean RSS reuse basis was established.

The permission request is limited to metadata-only discovery: title, publication time, source label and canonical direct link; no article text, excerpts, images, audio/video, translation, automatic publication, resale or redistribution. Written approval is still required before activation.

A new bounded, read-only fetch was run against the full current 25-feed manifest with a 12-item/feed cap and 12-second timeout. All manifest entries remained `enabled:false`.

### Full-fetch evidence

- Raw items: 154
- Unique canonical links: 150
- Duplicates removed: 4 (2.6%)
- Parseable feeds: 15/25
- Lane distribution:

| Lane | Parseable feeds | Raw items | Unique items |
| --- | ---: | ---: | ---: |
| Africa | 3/4 | 36 | 32 |
| Black America | 2/4 | 24 | 24 |
| Caribbean | 5/10 | 50 | 50 |
| Afro-Latin America | 3/3 | 24 | 24 |
| Afro-Europe | 1/2 | 10 | 10 |
| Indian Ocean & global corridors | 1/2 | 10 | 10 |

Key runtime results: VOA Africa, WHO AFRO, AllAfrica, TheGrio, Black Enterprise, both Jamaica Observer feeds, Barbados Today, News Americas Now and CIJN returned parseable items. Africanews and The Voice timed out; Nation News, WIC News and Caribbean National Weekly timed out; Jamaica Gleaner and Trinidad and Tobago Newsday returned HTTP 503; The Root and Blavity returned HTML instead of feeds; Global Voices Indian Ocean returned an empty response.

This fetch is evidence only. It does not constitute rights permission, approval, recurrence, automatic publication or production release. The pilot remains **PARTIAL / RELEASE HOLD** pending written permissions or documented link-only approvals and a follow-up QA/gate review.
## Authorization-free inventory reduction — 2026-10-28

The manifest was narrowed to feeds with an explicit documented basis for attributed, direct-link-only website display. Public RSS availability or successful parsing alone is not treated as authorization.

### Retained inventory

| Lane | Source | Basis |
| --- | --- | --- |
| Africa | AllAfrica — latest headlines | AllAfrica's RSS terms permit headline modules on a website at no charge when the publisher is credited and the site links to AllAfrica or the relevant feed page. |
| Caribbean | Jamaica Observer — latest | Jamaica Observer RSS terms permit non-commercial use with direct article linking, no modification and attribution. |
| Caribbean | Jamaica Observer — news | Same Jamaica Observer RSS basis. |

The retained inventory is **3 feeds**. All remain `enabled:false`; owner activation and final QA are still required.

### Excluded inventory

The remaining **22 feeds** were moved from the active candidate list into `excludedFeeds` with source-specific reasons. They include feeds requiring written permission or a rights determination, feeds whose general terms conflict with website reuse, and feeds without a documented authorization-free link-only basis. This includes the Black America candidates, most Caribbean candidates, Africanews, VOA Africa, WHO AFRO, Afro-Latin America, Afropean, Diaspora Africa, The Voice and Global Voices Indian Ocean.

This is a rights-basis classification, not a legal opinion. Publisher permission can be reconsidered later for any excluded source, but excluded feeds are no longer part of the current activation inventory.
