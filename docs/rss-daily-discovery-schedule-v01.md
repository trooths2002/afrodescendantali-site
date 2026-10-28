# Afrodescendant Ali Daily Discovery Schedule v0.1

Status: DISCOVERY-ONLY SCHEDULED / NON-PRODUCTION  
Project: PM-009 — AfrodescendantAli.com  
Timezone: Africa/Nairobi  
Cadence: Daily morning window

## Active discovery sources

Only the three sources with an existing reviewed link-only basis are enabled:

- AllAfrica — latest headlines
- Jamaica Observer — latest
- Jamaica Observer — news

The 22 restored candidate feeds remain disabled. Enabling a candidate requires separate runtime, terms and rights review.

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

This schedule activates discovery only. It does not authorize automatic article creation, automatic publishing, recurrence for disabled candidates, production deployment or indexability.
