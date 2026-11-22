# EXE-20261122-002 — Afrodescendant Ali seven-story latest-news release

Status: PROTECTED PREVIEW STAGED / PRODUCTION GATE PENDING
Date: 2026-11-22 (Africa/Nairobi)
Decision: DEC-20261122-002-ADN-SIGNAL-RELEASE
Manifest: AST-20261122-002-ADN-SIGNAL-RELEASE-MANIFEST

## Scope

Seven current Signal stories were prepared for the homepage and static RSS release:

1. Africa — Gambia decarbonisation roadmap
2. Caribbean — Haiti Q3 human-rights report
3. Black America — sheriff elections and 287(g) agreements
4. Black America — Southern organizers’ political strategy (clearly labeled analysis)
5. Afro-Latin America — Brazil data on Black women and violence
6. Afro-Europe — Michel Zecler sentencing
7. Indian Ocean — Mauritius regional health forum

## Controls

- Source and claim registers are in data/signal-release-records-20261122.json.
- Each story has an original SVG map, chart, timeline or systems illustration plus a portrait-safe asset.
- No publisher image, RSS enclosure or external photograph was reused.
- Each visual has rights state cleared_original, a credit, caption and alt text.
- The manifest contains seven unique article IDs, paths and visual asset IDs.
- Static RSS contains the seven approved internal story pages.
- External feed discovery remains review-only; automatic publication remains false.
- Preview branch uses noindex/no-store headers and Disallow in robots.txt. These preview protections must be removed only in the production release commit after preview QA.

## Required QA

- Validate JSON, unique IDs, feed generator check and XML.
- Verify all story and visual paths exist.
- Verify protected preview headers and robots behavior.
- Run reachable desktop/mobile route QA and check positive image dimensions, alt text, broken-image state and overflow.
- Confirm the production manifest exactly matches the approved release before merging.
