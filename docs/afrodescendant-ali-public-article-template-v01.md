# Afrodescendant Ali Public Article Template v0.1

Status: DRAFT IMPLEMENTATION REFERENCE — PM-009 / EXE-20261030-023

This template defines the minimum public contract for a finished Afrodescendant Ali article. It is a publishing template, not an automatic publishing mechanism.

## Required visible fields

- Story type: News Brief, Analysis, Explainer, Case File, or Watch
- Headline and deck
- Byline / publisher identity
- Published date
- Updated date when changed
- Primary and secondary Black World coverage lanes
- What we know
- What remains unknown
- Method / reporting note
- Source trail with direct links
- Related coverage
- Correction / clarification history
- Reader feedback path

## Required head metadata

- Unique title and meta description
- Canonical URL matching the public route
- Open Graph title, description, URL, and approved visual
- twitter:card=summary_large_image
- Article JSON-LD matching visible headline, author, publisher, image, publication date, modified date, and canonical URL

## Editorial boundaries

- RSS and other feeds provide discovery; they do not become published copy automatically.
- Attribution and source terms apply whenever text, images, video, excerpts, or other material is reused.
- Analysis must be labeled as analysis; reported facts and attributed claims must remain distinct.
- Internal queue statuses, private review labels, and unapproved drafts never appear on public pages.
- A page may omit a media or case-file module when no finished public asset exists.

## QA acceptance

- All required visible fields render at mobile and desktop widths.
- No horizontal overflow, broken links, missing assets, or console-blocking errors.
- JSON-LD agrees with visible content.
- The page is included in the sitemap only after its publication decision is recorded.
- Merge, deployment, publication, and indexability remain separate owner decisions.

## Current vertical slice

The existing public analysis article **Why Black Media Needs Controlled Source Infrastructure** is the reference implementation for the full trust contract. The AfCFTA implementation brief and remaining public analysis routes should be migrated to this contract in a separate content-template pass.
