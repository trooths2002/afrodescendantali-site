# EXE-20261122-002 — Afrodescendant Ali seven-story latest-news release

Status: PRODUCTION PUBLISHED AND VERIFIED
Date: 2026-11-22 (Africa/Nairobi)
Decision: DEC-20261122-002-ADN-SIGNAL-RELEASE
Manifest: AST-20261122-002-ADN-SIGNAL-RELEASE-MANIFEST

## Scope

Seven current Signal stories were published to the homepage and static RSS release:

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
- Preview branch used noindex/no-store headers and Disallow in robots.txt. Those protections were removed only in the separate production release commit after preview QA.

## QA and production evidence

- JSON, unique IDs, feed-generator checks and XML were verified.
- All seven story routes and visual paths were included in the release manifest.
- Protected preview headers and robots behavior were verified before production.
- Reachable desktop/mobile route QA passed: homepage and all seven article routes returned 200; RSS returned 200 application/xml with seven items; robots.txt returned 200; no horizontal overflow; no empty alt text; no broken images.
- Desktop QA used a 1005px viewport; mobile QA used a 390px viewport.
- GitHub PR: https://github.com/trooths2002/afrodescendantali-site/pull/58
- Production merge commit: e063426635bd74b7e2fec68f166d2b6cee2214f7
- Cloudflare Pages deployment: 8cac397f-422b-4780-ac3c-f73457fc69ec
- Live custom domain: https://www.afrodescendantali.com/
- Drive release pack: https://docs.google.com/document/d/1iBdUJJ8Wf2UACYPxjOWqsypZ0FPWXKnLj1xTzfJw3tQ/edit?usp=drivesdk

## Closeout

Status is PASS. The production manifest matched the approved release, the live homepage served the seven current stories, static RSS contained exactly seven approved items, and external-feed discovery remained separate from automatic publication. The Drive release pack and canonical execution, decision, asset and learning records contain the detailed source, claim, rights, accessibility, timing and rollback evidence.
