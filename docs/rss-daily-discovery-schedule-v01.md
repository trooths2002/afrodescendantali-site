# Afrodescendant Ali Daily Discovery Schedule v0.1

Status: DISCOVERY-ONLY SCHEDULED / NON-PRODUCTION  
Project: PM-009 — AfrodescendantAli.com  
Timezone: Africa/Nairobi  
Cadence: Daily morning window

## Active discovery sources

All 25 manifest sources are enabled for metadata discovery:

- Africa: AllAfrica, Africanews, VOA Africa, WHO AFRO
- Black America: TheGrio, Black Enterprise, The Root, Blavity
- Caribbean: Jamaica Observer — latest, Jamaica Observer — news, Jamaica Gleaner, Nation News, Barbados Today, Trinidad and Tobago Newsday, WIC News, News Americas Now, Caribbean National Weekly, CIJN
- Afro-Latin America: Mundo Negro, Race & Equality, Global Voices Latin America
- Afro-Europe: Afropean, The Voice
- Indian Ocean/global: Diaspora Africa, Global Voices Indian Ocean

The 22 restored sources are enabled for discovery only. Their prior runtime, terms and rights warnings remain active. Discovery enablement is not permission to republish, quote, reuse images or publish automatically.

## Daily run

Each run:

1. Reads the current RSS manifest.
2. Checks only feeds with enabled=true.
3. Retrieves feed metadata using bounded requests.
4. Parses headline, publication time, direct link, GUID/canonical link and source status.
5. Deduplicates by canonical URL, GUID and normalized title.
6. Assigns each item to a coverage lane.
7. Routes new items to PENDING_REVIEW.
8. Reports item counts, regional balance and source failures.

## Prohibited actions

The daily run must not:

- copy article text;
- reuse publisher images, video or audio;
- write or rewrite articles;
- generate article images;
- publish or index stories;
- notify readers;
- contact sources;
- enable candidate feeds;
- merge or deploy code;
- change DNS, production settings or recurrence;
- alter the editorial approval queue outside the discovery result.

## Failure states

The run must preserve explicit results for:

- timeout;
- HTTP error;
- empty feed;
- malformed or unsupported feed;
- stale feed;
- duplicate item;
- missing direct link.

A failed source does not remove prior editorial content or silently become a successful source.

## Editorial handoff

A discovered item is only a lead. The editor must:

1. Open the direct source.
2. Verify claims and record uncertainty.
3. Draft an original Afrodescendant Ali article.
4. Apply the visual style and image-rights template.
5. Complete source, claim, rights, image, mobile and editorial review.
6. Approve publication separately.

## Release boundary

This schedule activates metadata discovery across the current 25-feed manifest. It does not authorize source-text reuse, image or media reuse, automatic article creation, automatic publishing, reader notification, production deployment or indexability. Candidate sources remain rights-review items even while they are checked for leads.
