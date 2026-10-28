# Daily RSS Source Inventory v0.1

Date: 2026-10-28
Project: PM-009 — AfrodescendantAli.com
Status: source inventory verified; feeds disabled and unscheduled

## Operating rule

These feeds are daily discovery sources. They do not publish automatically and do not become finished articles. Each item enters the RSS-to-original-journalism workflow for source opening, claim review, original drafting, attribution and editorial approval.

## Current inventory

| ID | Lane | Source | Endpoint | Language | Rights basis | Daily use |
| --- | --- | --- | --- | --- | --- | --- |
| allafrica-latest | Africa | AllAfrica — latest headlines | https://allafrica.com/tools/headlines/rdf/latest/headlines.rdf | English | Headline modules permitted with credit and publisher/feed link; originating partner rights remain subject to review | Discovery and source-link queue |
| jamaica-observer-latest | Caribbean | Jamaica Observer — latest | https://www.jamaicaobserver.com/app/latest/ | English | RSS terms permit non-commercial use with direct links, no modification and attribution | Discovery and source-link queue |
| jamaica-observer-news | Caribbean | Jamaica Observer — news | https://www.jamaicaobserver.com/app/news/ | English | RSS terms permit non-commercial use with direct links, no modification and attribution | Discovery and source-link queue |

## Bounded live check

Checked: 2026-10-28 at approximately 17:54 EAT

| Feed | HTTP | Content type | Items observed | Result |
| --- | ---: | --- | ---: | --- |
| AllAfrica — latest headlines | 200 | RSS/XML | 12 | PASS |
| Jamaica Observer — latest | 200 | RSS/XML | 12 | PASS |
| Jamaica Observer — news | 200 | RSS/XML | 12 | PASS |

The collector cap is 12 items per feed with a 12-second timeout. The fetch was read-only. No full feed body is stored by default.

## Daily editorial use

For each collected item:

1. Preserve the source name, source URL, direct article URL and publication time.
2. Open the original source.
3. Separate source-reported facts from Afrodescendant Ali analysis.
4. Build the claim record.
5. Draft an original article, brief, explainer, timeline or analysis.
6. Add attribution and direct source links.
7. Complete rights, copy, mobile and editorial review.
8. Keep the item unpublished until approval.

## Restrictions

- No automatic article generation.
- No automatic publication.
- No source-body, image, audio or video copying.
- No translation or close paraphrase of distinctive source language without permission.
- No ad association or commercial reuse where the source terms prohibit it.
- No indexability change.
- No recurrence or scheduler is enabled.

## Coverage limitation

The current daily inventory covers only Africa and the Caribbean. Black America, Afro-Latin America, Afro-Europe and Indian Ocean/global corridors remain source-acquisition gaps.

All three feeds remain enabled:false until the owner authorizes activation after the wider six-lane coverage and editorial QA gates pass.
