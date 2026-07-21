# Five-Article Website Publication Handoff

Date: 2026-07-21
Repository: `trooths2002/afrodescendantali-site`
Base branch: `main`
Base commit: `dd0cec3ab89e98b95a29f67daad1a0356715d6eb`
Implementation branch: `content/five-article-publication-batch-20260721`

## Control status

- Editorial preparation: COMPLETE for five reader-facing manuscripts and five internal source packets.
- Rights strategy: ORIGINAL-ASSET / RIGHTS-INDEPENDENT.
- Public route implementation: NOT STARTED.
- Pull-request review: PENDING.
- Merge authorization: NOT GRANTED.
- Production deployment authorization: NOT GRANTED.

The source packets and manuscripts are retained in the controlled Afrodescendant Ali Google Drive workspace. Private Drive links, local paths, internal machine identifiers, and security-sensitive implementation details must not be committed to this public repository.

## Approved article batch

| ID | Public title | Proposed route | Primary lane |
|---|---|---|---|
| ART-005 | Why Black Media Needs Controlled Source Infrastructure | `/analysis/black-world-source-infrastructure/` | Media systems / institutional capacity |
| ART-006 | Twelve Years After Eric Garner: What the Accountability System Actually Produced | `/analysis/eric-garner-accountability-system/` | Civil rights / police accountability |
| ART-007 | Martin Luther King Jr.'s Unfinished Economic Program | `/analysis/martin-luther-king-unfinished-economic-program/` | Black political economy / economic justice |
| ART-008 | How Black Scholars Restored Kush to the History of the Ancient World | `/analysis/black-scholars-kush-historical-recovery/` | Historical memory / Africana scholarship |
| ART-009 | From Offering Plate to Institutional Capacity | `/analysis/black-church-institutional-economics/` | Institutional economics / Black capital |

## Source-control decisions

### ART-005

- Present the bounded crawler and its validation as confirmed.
- State that the recurring scheduled worker was subsequently disabled and quarantined after a battery-transition interruption.
- Do not claim that recurring crawling is currently active.
- Do not expose private source indexes, Drive IDs, machine names, local paths, commands, or credentials.

### ART-006

- Use official criminal, civil, disciplinary, legislative, and judicial records.
- Do not embed or reproduce arrest footage, protest footage, family photographs, or third-party news photography.
- Distinguish criminal non-indictment, civil settlement, disciplinary action, and later legal review.

### ART-007

- Base the article on King's documented economic program and the Poor People's Campaign.
- Do not use the recent interview clip or reproduce protected transcript language.
- Use careful historical paraphrase and independently supported economic context.

### ART-008

- Preserve the verified Kushite historical frame.
- Exclude the unsupported territorial claim concerning modern Iraq, Iran, and Saudi Arabia.
- Use original maps, timelines, and evidence diagrams rather than archival portraits or footage.

### ART-009

- Treat the article as institutional-capacity analysis, not individualized financial, tax, legal, investment, or fiduciary advice.
- Do not use the Dick Gregory discovery clip or repeat its unverified banking assertion.
- Use original capital-flow and governance diagrams.

## Proposed repository manifest

Expected new public files:

- `public/analysis/black-world-source-infrastructure/index.html`
- `public/analysis/eric-garner-accountability-system/index.html`
- `public/analysis/martin-luther-king-unfinished-economic-program/index.html`
- `public/analysis/black-scholars-kush-historical-recovery/index.html`
- `public/analysis/black-church-institutional-economics/index.html`

Expected modified public files:

- `public/analysis/index.html`
- `public/sitemap.xml`

Possible new owned assets, subject to visual QA:

- `public/assets/articles/art-005-source-infrastructure.svg`
- `public/assets/articles/art-006-accountability-timeline.svg`
- `public/assets/articles/art-007-economic-program.svg`
- `public/assets/articles/art-008-kush-map.svg`
- `public/assets/articles/art-009-institutional-capacity.svg`

No CSS or JavaScript change is authorized unless the existing article template cannot support an approved manuscript or owned visual without modification. Any such expansion requires a documented justification and separate review.

## Required page structure

Each article page must include:

- Unique `<title>` and meta description.
- Canonical URL matching the extensionless public route.
- Open Graph title, description, URL, and approved owned image.
- `twitter:card=summary_large_image`.
- Valid Article JSON-LD matching visible content.
- Published and modified dates.
- Reader-facing evidence-status language where needed.
- One primary CTA matched to article intent.
- Related internal links.
- No private links, local paths, source-packet commentary, placeholders, unsupported prices, or hidden internal instructions.

## Analysis hub controls

Add five cards to `public/analysis/index.html` with `data-type="approved"` only after manuscript and metadata parity checks pass.

Suggested filters:

| ID | Topic | Region |
|---|---|---|
| ART-005 | media | black-world |
| ART-006 | strategy | diaspora |
| ART-007 | capital | diaspora |
| ART-008 | strategy | black-world |
| ART-009 | capital | diaspora |

Existing pending-review pages must remain pending and noindexed. Do not change Nigeria Refinery or Critical Minerals status in this batch.

## Sitemap controls

Add each approved extensionless route once. Use `2026-07-21` as the initial `lastmod` unless editorial publication occurs on a later date. Do not add source packets, internal audit files, noindex drafts, or private assets to the sitemap.

## Pre-merge QA gates

### Repository and scope

- [ ] Branch is based on the recorded `main` commit or explicitly rebased after review.
- [ ] Changed-file list matches the approved manifest.
- [ ] No unrelated homepage, Work, Contact, navigation, offer, pricing, or pending-review page changes.
- [ ] `git diff --check` equivalent passes.

### Editorial and evidence

- [ ] Public text matches the approved manuscripts.
- [ ] Every material claim remains within the source-packet clearance.
- [ ] ART-005 scheduler status is current and accurately qualified.
- [ ] ART-006 legal outcomes are separated and precisely described.
- [ ] ART-007 does not reproduce or depend on protected interview text.
- [ ] ART-008 unsupported territorial claim is absent.
- [ ] ART-009 contains the no-advice boundary and no Dick Gregory dependency.

### Rights, privacy, and safety

- [ ] Only original, owned, licensed, or clearly eligible public-domain assets are used.
- [ ] No third-party likeness is required for any hero image.
- [ ] No private Drive URL, folder ID, machine name, local path, email credential, token, or internal hash is exposed.
- [ ] Alt text and credits are complete.

### Technical and search

- [ ] All five routes load on the Cloudflare branch preview.
- [ ] Desktop and mobile rendering pass without horizontal overflow.
- [ ] Internal links resolve.
- [ ] Canonicals, Open Graph URLs, and JSON-LD URLs match the intended public routes.
- [ ] Sitemap contains each new route exactly once.
- [ ] Pending noindex pages remain absent from sitemap promotion.
- [ ] Secret, placeholder, localhost, local-path, and private-link scans pass.

### Merge and deployment

- [ ] Draft PR reviewed.
- [ ] Preview deployment commit matches the PR head.
- [ ] Owner explicitly authorizes merge after preview QA.
- [ ] Merge SHA recorded.
- [ ] Cloudflare production deployment SHA verified against the merge SHA.
- [ ] Post-deployment smoke tests pass on all five routes, Analysis hub, and sitemap.

## Stop conditions

Stop implementation and report before merge if:

- A route collision exists.
- A manuscript/source-packet conflict is found.
- A private or rights-sensitive asset is required.
- The repository has moved materially beyond the recorded base and conflicts cannot be safely reconciled.
- Preview deployment fails or points to a different commit.
- Any request expands into unrelated redesign, pricing, offer activation, analytics, form, domain, or deployment configuration changes.

## Current decision

Groundwork only. This document does not authorize public source edits, merge, or production deployment.
