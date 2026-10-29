# Afrodescendant Ali Editorial Image Workflow v0.1

Status: REFERENCE — PRE-PRODUCTION / UNPUBLISHED  
Project: PM-009 — AfrodescendantAli.com  
Applies to: News briefs, analysis, explainers, timelines, case files, community reports, editorials and media posts

## Principle

Every published Afrodescendant Ali article must have one approved primary visual or an approved fallback visual. The visual is part of the reporting package, not an afterthought.

A source image found through RSS is a discovery lead only. It is not reusable by default. The article may link to the source, but the image requires its own rights decision.

## Article visual package

Each article should be prepared with:

1. Primary visual — the hero image or approved fallback.
2. Caption — what the image shows, where and when, when known.
3. Credit — photographer, institution, contributor, license or “Afrodescendant Ali illustration.”
4. Alt text — concise factual description for accessibility.
5. Social crop — a safe 1:1 or 4:5 crop when the story will be promoted.
6. Rights record — source, permission or license, restrictions, access date and expiry if applicable.
7. Fallback state — what appears if the image is unavailable, withdrawn or not cleared.

Supporting images are optional and should earn their place through evidence, context or human connection. They should not be added only to increase visual density.

## Source ladder

Use the strongest available visual source in this order:

| Priority | Visual source | Default disposition |
| --- | --- | --- |
| 1 | Afrodescendant Ali original photograph, video frame or commissioned work | Preferred after contributor/release and metadata review |
| 2 | Direct contributor or community submission | Use only after identity, consent, location, date and safety review |
| 3 | Official institutional image or media kit | Use only when the terms permit the planned editorial use |
| 4 | Explicitly licensed editorial/stock image | Record license, territory, duration, attribution and crop limits |
| 5 | Public-domain image with verified status | Record the public-domain basis and original source |
| 6 | Commissioned or generated illustration | Suitable for analysis/explainers; label clearly and never present it as documentary evidence |
| 7 | Typographic or map-based fallback card | Use when no documentary image is cleared |

The following are not acceptable defaults:

- Downloading the image attached to an RSS item.
- Copying a publisher’s photograph from its article page.
- Treating a search-result thumbnail as permission.
- Using a social-media screenshot without permission and provenance.
- Using a generated image that depicts a real person or event as if it were a photograph.
- Using an image whose crop changes the factual meaning or removes necessary context.

## Workflow

### 1. Create the image brief with the article draft

Before drafting is complete, record:

- Article ID and lane.
- Story type and intended audience.
- Primary subject, place and time.
- Required visual function: evidence, scene, person/community, place, data, document, map or illustration.
- Preferred source ladder and two fallback options.
- Sensitive subjects, privacy concerns, minors, victims or security risks.
- Required crop and mobile placement.

### 2. Acquire or commission the visual

Open the original source or receive the asset directly. Preserve the original URL or file reference. Do not use the RSS enclosure as the rights record.

For contributor material, record consent and any restrictions. For institutional or licensed material, capture the terms page or written permission and note whether commercial, editorial, social, cropping and archival uses are allowed.

### 3. Verify factual fit

Check that the image actually matches:

- The people, place and event described.
- The date or time period.
- The caption and credit.
- The article's level of certainty.

If the image is illustrative, say so in the caption or metadata. A visual must not silently turn an attributed claim into an apparent fact.

### 4. Record the asset

Assign an internal asset ID and record:

| Field | Required value |
| --- | --- |
| Asset ID | Stable internal ID |
| Article ID | Linked article |
| File name and storage location | Controlled project media location |
| Asset type | Photo, video frame, illustration, map, chart or fallback card |
| Source/creator | Person, publisher, institution or generator |
| Original URL or delivery record | Direct provenance |
| Rights state | cleared_original, contributor_consent, licensed, public_domain, permission_pending, discovery_only, fallback_only, rejected |
| Permission/license evidence | URL, document, email reference or public-domain basis |
| Restrictions | Commercial use, crop, attribution, territory, duration, subjects or embargo |
| Credit line | Exact displayed credit |
| Caption | Fact-checked caption |
| Alt text | Factual accessibility description |
| Access/verification date | Date checked |
| Expiry/recheck date | If applicable |
| Reviewer and decision | Human approval record |

### 5. Prepare derivatives

Create only the variants needed by the design system:

- Hero: wide desktop crop.
- Card: 4:3 or 3:2.
- Mobile: portrait-safe crop.
- Social: 1:1 or 4:5 when required.

Keep the original master unchanged. Cropping must preserve faces, identifying context and factual meaning. Strip unnecessary location metadata from public derivatives when it could create a safety risk.

### 6. Editorial and rights review

The editor confirms:

- The image is cleared for the planned use.
- The credit and caption are accurate.
- The visual does not overstate the story.
- Consent and privacy risks are addressed.
- The image is not materially altered except for approved crop, color correction or accessibility treatment.
- Generated or illustrative visuals are labeled.
- A fallback visual exists.

### 7. Publish package

The article cannot move to `APPROVED_FOR_PUBLISH` until:

- `imageStatus = IMAGE_READY` or `IMAGE_FALLBACK_ONLY`.
- The asset record is complete.
- Caption, credit and alt text are present.
- The source and rights evidence are linked.
- Desktop and mobile crops are reviewed.
- Broken-image, missing-credit and unavailable-asset states are tested.

Automatic image selection and automatic publishing remain disabled.

## Image status states

- `IMAGE_NEEDED` — article has no visual brief.
- `IMAGE_DISCOVERY` — possible assets are being located.
- `IMAGE_RIGHTS_REVIEW` — provenance or permission is unresolved.
- `IMAGE_READY` — primary visual cleared and prepared.
- `IMAGE_FALLBACK_ONLY` — no documentary image cleared; approved illustration, map or typographic card is ready.
- `IMAGE_HOLD` — visual is blocked by rights, safety, accuracy or quality concerns.
- `IMAGE_REJECTED` — asset cannot be used.
- `IMAGE_PUBLISHED` — approved visual is live with its record retained.

## Fallback design

Fallbacks should feel intentional and editorial:

- Region label and story type.
- Short headline or topic.
- Date or “developing” state where relevant.
- Restrained regional color or texture.
- No fabricated people, places or events.
- Clear “Illustration” label when applicable.
- Accessible text alternative.

A fallback is not permission to publish an unverified story. The article still requires the same claim, attribution and editorial review.

## Special handling by article type

| Article type | Preferred visual treatment |
| --- | --- |
| News brief | Verified scene, document, official image or restrained fallback |
| Analysis | Commissioned/generated conceptual illustration, map, chart or relevant licensed image |
| Explainer | Diagram, map, document detail or clearly labeled illustration |
| Timeline | Archive image only when rights and date are established; otherwise timeline graphic |
| Case file | Court/public record, location image or document-led graphic; protect affected people |
| Community report | Contributor/community image with consent and safety review |
| Editorial | Illustration, portrait with permission or typographic treatment |
| Culture/media | Licensed or contributed stills, creator-approved artwork or commissioned visual |

## Acceptance tests

Before the pilot can advance, test at least one article in each of the six coverage lanes for:

- Rights evidence present.
- Caption/credit/alt text present.
- Image matches the article's verified claims.
- No source thumbnail or article image reused without clearance.
- Mobile crop remains legible and safe.
- Broken image resolves to the approved fallback.
- Permission expiry or withdrawal can move the asset to `IMAGE_HOLD`.
- Article remains unpublished when the image is `permission_pending`, `discovery_only` or `rejected`.

## Release boundary

This workflow is documentation and schema preparation only. It does not authorize image scraping, image licensing, contributor outreach, automated selection, publication, recurrence, production deployment or indexability changes.
