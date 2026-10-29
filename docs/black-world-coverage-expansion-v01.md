# Black World Coverage Expansion Plan v0.1

Date: 2026-10-28
Project: PM-009 — AfrodescendantAli.com
Branch: exe-20261028-007-rss-pilot-v01
Status: planning-only; no source activated

## Objective

Build resilient coverage across the six Black World lanes without treating RSS as the only intake channel:

- Africa
- Black America
- Caribbean
- Afro-Latin America
- Afro-Europe
- Indian Ocean & global corridors

## Lane success condition

A lane is ready for activation only when it has:

1. Two publisher sources with either explicit link-only terms or written permission.
2. One official institutional source for primary announcements, advisories or data.
3. One named human/community reporting channel with a source and consent record.
4. One discovery channel for leads, such as a newsletter, search/API result, public event page or platform-native account.
5. Two successful bounded runtime checks, direct attribution, canonical links, duplicate handling, and visible failure states.

Discovery sources are not automatically publishable. A public page, social post, newsletter or parseable feed remains DISCOVERY_ONLY until rights, source identity and editorial verification pass.

## Coverage matrix

| Lane | Publisher track | Institutional track | Human/community track | Discovery track | Current state |
| --- | --- | --- | --- | --- | --- |
| Africa | AllAfrica retained; recruit a second cleared African publisher | African Union News/RSS and AU Media Centre | East/West/Central/Southern/African diaspora correspondent | AU departmental feeds, official event pages and monitored newsletters | 1 cleared publisher; 3 gaps |
| Black America | NNPA/BlackPressUSA partnership; recruit one additional member publisher | Civil-rights, congressional, municipal and public-agency pressrooms | Black newsroom/community correspondent network | NNPA member sites, newsletters and platform-native newsroom channels | 0 cleared publishers; partner outreach needed |
| Caribbean | Jamaica Observer retained; evaluate CANAnews and recruit one additional cleared publisher | CARICOM press releases and regional agencies | Island-by-island community correspondents | CARICOM releases, disaster/health/trade notices and regional newsletters | 1 publisher relationship with 2 feeds; second publisher needed |
| Afro-Latin America | Reassess Mundo Negro, Race & Equality and Global Voices Latin America for rights or permission; recruit a second publisher | OAS Afro-descendant press and regional public institutions | Spanish/Portuguese-speaking Afro-descendant correspondents | OAS releases, local-language newsletters and public event pages | 0 cleared publishers |
| Afro-Europe | Evaluate Afropean/Afronews and recruit a second cleared publisher | ENAR and relevant national public pressrooms | Country-based diaspora correspondents | ENAR news, community newsletters and event calendars | 0 cleared publishers |
| Indian Ocean & global corridors | Reassess Diaspora Africa and recruit a second regional publisher | Diaspora affairs offices, AU diaspora channels and regional public institutions | Indian Ocean/diaspora correspondent or partner desk | Diaspora organization releases, newsletters and official public notices | 0 cleared publishers |

Candidate names in this matrix are leads for verification, not approvals. The current active manifest remains limited to AllAfrica and Jamaica Observer feeds.

## Intake architecture

### 1. Discovery queue

Collect only:

- source name and source type;
- headline or item title;
- publication time;
- source URL and canonical article URL;
- language and geography;
- rights state;
- verification state;
- failure or freshness state.

Do not store article bodies, images, video or audio by default.

### 2. Rights and source review

Classify each candidate as:

- DISCOVERY_ONLY
- RIGHTS_REVIEW
- RUNTIME_VERIFIED
- EDITORIALLY_ELIGIBLE
- ACTIVATED

Only EDITORIALLY_ELIGIBLE items may enter the editor queue. ACTIVATED remains owner-gated and disabled in this pilot.

### 3. Human reporting channel

Each lane should have at least one named contributor or partner with:

- identity and geography recorded;
- consent and submission terms;
- conflict disclosure;
- original-work or permission confirmation;
- verification checklist;
- editor approval before publication.

### 4. Editorial output

Published cards should contain:

- original headline or a clearly marked Afrodescendant Ali headline;
- source label;
- publication date;
- short attributed context;
- direct link to the original source;
- status label such as Reported, Official statement, Analysis, Community report or Developing.

## Release gate

Do not enable recurrence, automatic publishing, production deployment or indexability until every lane has:

- two cleared publisher sources;
- one verified institutional source;
- one functioning human/community reporting route;
- two successful runtime checks;
- rights and attribution records;
- mobile and failure-state QA;
- owner approval.

This plan creates the acquisition and verification path. It does not grant permission, activate feeds, send outreach or authorize production release.
