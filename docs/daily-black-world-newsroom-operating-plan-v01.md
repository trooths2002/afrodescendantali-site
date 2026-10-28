# Afrodescendant Ali Daily Black World Newsroom Operating Plan v0.1

Status: REFERENCE PLAN — DISCOVERY SCHEDULE ACTIVE / PUBLICATION GATED  
Project: PM-009 — AfrodescendantAli.com  
Coverage model: Signal newsroom, original Afrodescendant Ali writing, human editorial approval

## 1. Outcome contract

AfrodescendantAli.com will become a daily Black World information outlet that:

- discovers developments across six regional lanes;
- verifies and contextualizes them in original Afrodescendant Ali writing;
- shows readers what happened, why it matters and what remains unknown;
- uses rights-cleared or clearly labeled visuals;
- preserves regional balance without inventing coverage;
- keeps paid work secondary to the editorial mission.

RSS is the discovery layer. It is not the article-writing layer.

## 2. Current baseline

The daily discovery schedule now checks all 25 manifest sources for metadata leads across six lanes. Three have a reviewed link-only basis; 22 remain candidate-restored sources with unresolved runtime, terms or rights questions.

Discovery enablement does not make a source rights-cleared. The current system can surface signals across the Black World, but it is not yet a complete or resilient full-service news operation. Source verification, original writing, human reporting and separate media-rights review remain mandatory.

## 3. Daily operating loop

### A. Discovery harvest

The scheduled discovery run:

1. Reads the current source manifest.
2. Fetches only sources marked enabled.
3. Collects metadata: source, headline, time, direct URL, GUID/canonical link, lane and fetch status.
4. Does not copy article text, images, audio or video.
5. Produces a daily source-health and discovery receipt.

### B. Normalization

The collector:

- removes tracking parameters;
- resolves canonical links;
- deduplicates by canonical URL, GUID and normalized title;
- preserves the original source link;
- marks empty, stale, malformed, timed-out and failed feeds explicitly.

### C. Story triage

Each unique item receives:

- story ID;
- regional lane;
- story type candidate;
- urgency;
- affected people and geography;
- source status;
- rights status;
- evidence gaps;
- duplicate status;
- next editorial action.

Default state: PENDING_REVIEW.

### D. Regional balance pass

Before selecting a second story from one lane, the editor checks whether each lane has a meaningful candidate:

1. Africa
2. Black America
3. Caribbean
4. Afro-Latin America
5. Afro-Europe
6. Indian Ocean and global corridors

If a lane has no verified item, the homepage should show a transparent coverage gap or a manually researched brief—not a generic substitute presented as local coverage.

### E. Editorial selection

Selected items move to SOURCE_OPENED only after the editor opens the direct source and determines:

- what is confirmed;
- what is attributed;
- what is disputed or unclear;
- which primary records are needed;
- whether the story belongs on the site;
- whether a source link is sufficient for discovery or whether the item must remain on hold.

### F. Original writing

The editor creates one of:

- news brief;
- analysis;
- explainer;
- timeline;
- case file;
- community report;
- editorial or culture piece.

Every article uses the Afrodescendant Ali writing template and house style. The article must be written from scratch, with no copied source paragraphs or distinctive phrasing.

### G. Visual package

Every selected article receives:

- primary visual or approved fallback;
- caption;
- credit;
- alt text;
- rights/provenance record;
- hero, card and mobile crop review.

Generated visuals are conceptual and labeled. They cannot be used as evidence of a real event or person.

### H. Editorial review

The editor checks:

- claim ledger;
- attribution;
- geography and affected people;
- source and rights state;
- image rights and factual fit;
- headline and lede;
- regional context;
- mobile presentation;
- broken-image and empty-state behavior.

Only then can an item become APPROVED_FOR_PUBLISH.

### I. Homepage update

The Signal homepage should render only approved records:

- developing/lead story;
- live-update or context panel;
- latest stories across the six lanes;
- analysis and explainers;
- case files and ongoing watches;
- video/audio;
- regional discovery;
- quiet Work with Ali pathway.

Pending, held and rejected items remain visible only in the editorial queue.

### J. Daily closeout

Each day records:

- feeds attempted and successful;
- raw items and unique items;
- duplicate count;
- lane distribution;
- source failures;
- selected stories;
- drafts started;
- stories held and why;
- image status;
- editor workload;
- unresolved source or rights gaps.

## 4. Editorial state machine

DISCOVERED  
→ PENDING_REVIEW  
→ SOURCE_OPENED  
→ CLAIMS_IN_REVIEW  
→ DRAFTING  
→ IMAGE_RIGHTS_REVIEW  
→ EDITORIAL_REVIEW  
→ APPROVED_FOR_PUBLISH  
→ PUBLISHED

Possible exits at every review stage:

- HOLD — evidence, rights, safety or source problem;
- REJECTED — outside scope, duplicate, weak or unsuitable;
- FALLBACK_ONLY — article can proceed only with an approved visual fallback.

No automated transition may skip human editorial approval.

## 5. Coverage expansion path

### Phase 1 — Prove the daily loop

Use the 25 enabled discovery feeds to validate:

- daily discovery receipt;
- deduplication;
- direct-link preservation;
- source-health reporting;
- editorial queue handoff;
- original writing template;
- image workflow;
- desktop and mobile preview behavior.

### Phase 2 — Qualify the four undercovered lanes

Use the expanded discovery pool to qualify at least one reliable source or human reporting channel for:

- Black America;
- Afro-Latin America;
- Afro-Europe;
- Indian Ocean and global corridors.

Each source must pass runtime, terms, rights, attribution and failure-state review.

### Phase 3 — Build resilience

Target at least two cleared publisher sources, one institutional source and one human/community reporting channel per lane.

### Phase 4 — Production newsroom gate

Only after the six-lane evidence base and editorial queue pass QA should the owner consider:

- merging the preview work;
- enabling production rendering;
- enabling public indexability;
- expanding recurrence;
- promoting additional sources;
- publishing daily articles.

## 6. Source and rights rules

- RSS is metadata discovery, not permission to republish.
- Direct source links and attribution are mandatory.
- Source body text is not stored by the collector.
- Publisher images are not reused by default.
- Rights for text and rights for media are reviewed separately.
- Permission-pending or discovery-only sources cannot become automatic inputs to publication.
- Candidate feeds remain disabled until explicitly promoted.

## 7. Minimum daily newsroom output

A successful future daily cycle should produce:

1. One discovery receipt.
2. One source-health summary.
3. One deduplicated editorial queue.
4. At least one reviewed story candidate when evidence supports it.
5. A balanced lane report.
6. An article package with claims, source, image and rights records.
7. A clear HOLD list for unresolved items.

A day with no publishable story is acceptable when the evidence or rights do not support publication.

## 8. Success measures

Track:

- enabled-feed success rate;
- unique items per lane;
- duplicate rate;
- stale or failed-source rate;
- percentage of items with direct links;
- time from discovery to source review;
- time from source review to draft;
- percentage of drafts passing claim and rights review;
- image readiness rate;
- regional balance;
- corrections or post-publication changes.

Do not use raw item volume as the primary success measure. The goal is reliable, source-grounded Black World information.

## 9. Release boundary

The current schedule is discovery-only. It does not authorize automatic writing, automatic image creation, automatic publication, public indexing, production deployment, external notification, source outreach or candidate-feed activation.

The next review point is the first daily discovery receipt and its regional/source-health evidence.
