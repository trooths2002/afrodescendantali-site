# Afrodescendant Ali Website Risk and Inconsistency Report

Generated: 2026-07-01T19:23:41+03:00
Repository: trooths2002/afrodescendantali-site
Branch: main
Local HEAD: 2841137 — fix: support clean work URL commerce
Remote-tracking snapshot: origin/main 74b7595 — Merge pull request #2 from trooths2002/content/global-black-world-digest-2026-06-21

## Executive Risk Position

The local website is structurally healthy enough to inventory: 27 public HTML pages were found, every page has a title, meta description, H1, and canonical URL, all 27 sitemap URLs correspond to local pages, and no broken internal link was detected. The largest risks are governance and conversion clarity rather than basic file integrity.

The working tree is not release-clean. It is 4 commits behind the recorded origin/main snapshot and already contains 15 pre-existing modified or untracked paths. This export task did not change those site source files.

## 1. Repository and Release-State Risk

- Local branch divergence: 0 ahead / 4 behind relative to the existing origin/main tracking reference.
- Local HEAD: 28411374e649b265511919f35544023745b62c25 (2026-05-19T13:13:50+03:00).
- Recorded origin/main tip: 74b75957f6a66aaed294219eea86f3571e180af0 (2026-06-22T18:38:50+03:00).
- Do not pull, rebase, merge, or push blindly. First compare the four remote commits with the local source-fed article, Method, Proof, Starter Brief, Work detail, Substack, CSS, JavaScript, and sitemap work.

Pre-existing working-tree paths:

- M: public/assets/site.css
- M: public/assets/site.js
- M: public/index.html
- M: public/sitemap.xml
- M: public/work.html
- M: ublic/analysis/index.html
- untracked: _drive_sync_exports/
- untracked: public/analysis/china-financing-africa-deal-terms.html
- untracked: public/analysis/critical-minerals-data-access.html
- untracked: public/analysis/kenya-fuel-shock-worker-mobility.html
- untracked: public/analysis/nigeria-refinery-ownership-energy-security.html
- untracked: public/method.html
- untracked: public/proof.html
- untracked: public/starter-brief.html
- untracked: public/work/

## 2. Pricing and Offer Inconsistencies

- Dossier pricing appears as both $11.99 and $12.
- Bundle pricing appears as both $49 and $49.97.
- Briefing Pack ($29), monthly membership ($19/month), and annual membership ($199/year) are named and priced, but no product-specific purchase or enrollment destination was found.
- Rapid Advisory Briefing is described as a planned paid lane on the Work page, while a requestable detail page and multiple CTAs already exist.
- Custom memo and audit routes are active locally, but no price or commercial scope boundary is stated.
- The homepage and Coverage page describe membership as part of the business model, creating an active-offer impression that the local CTA layer does not complete.

Consolidated offer evidence:

| Offer | Price in local files | Destination | Status |
|---|---|---|---|
| Geopolitical dossiers / Gumroad catalog | $11.99 / $12 (both variants appear) | https://teman.gumroad.com/l/mcyhd and https://teman.gumroad.com | Configured; local copy calls the path verified; external availability not checked |
| Briefing Pack | $29 | No direct Briefing Pack destination found; general Gumroad catalog is present | Unclear / price reference without a product-specific CTA |
| Intelligence Bundle | $49 / $49.97 (both variants appear) | No bundle-specific destination found; general Gumroad catalog is present | Unclear / inconsistent price and no product-specific CTA |
| Monthly membership | $19/month | NOT FOUND IN LOCAL FILES | Unclear / priced and described, but no enrollment CTA was found |
| Annual membership | $199/year | NOT FOUND IN LOCAL FILES | Unclear / priced and described, but no enrollment CTA was found |
| Rapid advisory briefing | NOT FOUND IN LOCAL FILES | public/work/briefing.html then public/contact.html | Planned/active ambiguity: Work calls it planned, while detail and inquiry routes are live locally |
| Custom intelligence memo | NOT FOUND IN LOCAL FILES | public/work/memo.html then public/contact.html | Active local inquiry route; commercial terms are not stated |
| Media / intelligence system audit | NOT FOUND IN LOCAL FILES | public/work/audit.html then public/contact.html | Active local inquiry route; commercial terms are not stated |
| Black World Intelligence Starter Brief | Free entry point | mailto:info@afrodescendantali.com (pre-filled Starter Brief request) | Configured email lead-capture action |
| Free weekly Afrodescendant Ali Briefings | Free | https://afrodescendantali.substack.com and its Start Here page | Configured external route; not live-verified in this extraction |

## 3. Link Status

- Broken internal links detected: 0.
- Distinct external URLs detected: 25.
- External links were extracted from local files but were not live-tested, so they must not be described as currently reachable on the strength of this report alone.
- The Media page uses https://web.facebook.com/jermaine.pitter.7. Treat that as a verification item because web.facebook.com is a specialized host and the canonical public-profile record should control the final URL.
- No localhost, 127.0.0.1, or example.com reference was found.

## 4. CTA Consistency

- 92 meaningful CTA/link actions were inventoried outside header/footer navigation.
- CTA destinations resolve locally where they are internal; external commerce, Substack, source, and social destinations were not live-verified.
- The CTA ladder mixes active local routes, planned-offer language, and general Gumroad catalog routes. Status should be normalized in one Drive CTA/Offer map.
- Coverage-lane pages consistently request a briefing or memo, but the service terms and prices are not visible on those paths.
- Several articles send readers directly to Contact while newer source-fed articles send readers to dedicated Briefing, Memo, or Audit detail pages. Choose a consistent article-to-offer rule.

## 5. SEO and GEO / AI-Search Gaps

- All 27 pages have a title tag, meta description, H1, and canonical URL.
- Open Graph title, description, and image are missing on all 27 pages.
- Twitter title and description are missing on all 27 pages.
- Structured data is missing on 11 pages:

  - public/coverage/afro-europe.html
  - public/coverage/afro-latino.html
  - public/coverage/black-america.html
  - public/coverage/black-caribbean.html
  - public/coverage/sub-saharan-africa.html
  - public/method.html
  - public/proof.html
  - public/starter-brief.html
  - public/work/audit.html
  - public/work/briefing.html
  - public/work/memo.html

- Article structured data exists on the nine Analysis articles, but offer-detail and coverage-lane pages have no Service/Product/CollectionPage structure.
- The sitemap covers all current public pages, but Home, Work, and Analysis lastmod values still show May dates despite later local Substack and content-route edits.
- AI-search opportunity: add explicit organization, person, service, offer, coverage taxonomy, evidence policy, and article relationships in schema without inventing claims.

## 6. Assets and Runtime Dependencies

- Local assets inventoried: 7.
- Unreferenced local assets: 2.
  - public/assets/hero-art.jpg
  - public/assets/hero-texture.svg
- All public pages load Tailwind through a remote CDN and the base CSS loads Google Fonts remotely. Those are availability, privacy, and performance dependencies.
- All HTML pages reference site.js with the cache token 20260519-commerce-path even though site.js has later pre-existing local edits. The token should be refreshed when those edits are accepted.
- No standalone logo file was found. The brand mark is text/inline SVG, which is consistent with the current no-logo rule but increases duplicated markup.

## 7. Duplicate or Drift-Prone Language

The repeated header/footer language is expected. The following longer copy blocks repeat and should be reviewed for intentional reuse versus drift:

- 2 occurrences across 1 file(s): “The operating base in Mombasa supports a perspective shaped by Pan-African history, geopolitics, and diaspora concerns.”
- 2 occurrences across 2 file(s): “Weekly Pan-African intelligence connecting Black America, Africa, the Caribbean, diaspora capital, media power, and geopolitical signals.”

Additional positioning concern:

- Home closes with “Pan-African analysis, education, community empowerment, and geopolitical awareness.” That language is broader and more generic than the site’s current intelligence-desk, evidence, decision-support, and institution-focused positioning. Review it rather than automatically deleting it.

## 8. Social-Link Freshness

- Local social destinations: YouTube, Facebook, and TikTok.
- No local verification date is attached to the individual links.
- The Facebook host should be reconciled with the current canonical digital-presence inventory.
- No Instagram, LinkedIn, or other social destination was found in the public site; do not add any without verification.

## 9. TODO, FIXME, Placeholder, and Development Markers

- TODO: none found.
- FIXME: none found.
- localhost: none found.
- 127.0.0.1: none found.
- example.com: none found.
- Lorem Ipsum: none found.
- The word “placeholder” appears only in Contact input attributes used as visible form hints:
  - public/contact.html:123 — <textarea rows="4" data-inquiry-objective placeholder="Briefly describe the decision, project, or question."></textarea>
  - public/contact.html:127 — <input type="text" data-inquiry-deadline placeholder="Example: this week, before a meeting, no fixed deadline">
- These are intentional UI hints, not unresolved placeholder copy, but they should remain documented because the extraction rule asked for every placeholder hit.

## 10. Missing Drive Reference Updates

The Drive knowledge base should be updated to reflect the current 27-page local surface, nine Analysis articles plus the index, five coverage lanes plus the index, three dedicated paid-service detail pages, Method, Proof, Starter Brief, Substack routes, pricing ambiguity, and the repository divergence state.

Required records:

- Website Knowledge Base Source Snapshot: replace the older six-surface summary with the full current map and repository-state warning.
- Website URL Inventory Sheet: add all 27 canonical URLs, page roles, sitemap presence, and last verification date.
- Website Change Log: record this extraction-only documentation change separately from the pre-existing site edits.
- Website CTA and Offer Map: import the CTA and consolidated offer evidence, with Active / Planned / Unclear status.
- Website Opportunity Backlog: add the ten priorities below.
- Article Writing for Afrodescendant Ali: update because the source-fed article structure and article-to-Briefing/Memo/Audit routing are now present locally.
- Revenue Ledger and Payment Positioning Guide: update because local price variants and membership ambiguity directly affect payment positioning.

## Top 10 Update Opportunities

1. Reconcile the four remote commits with the pre-existing local edits before any further site release or push.
2. Choose one authoritative price for dossiers and bundles, then remove the $11.99/$12 and $49/$49.97 variants.
3. Decide whether the Briefing Pack and monthly/annual memberships are active, planned, or retired; add a verified destination or remove the sales language.
4. Resolve the Rapid Advisory Briefing status: the Work page calls it planned while live local detail and inquiry routes present it as requestable.
5. Add complete Open Graph and Twitter metadata, including a verified share image, across all 27 public pages.
6. Add appropriate structured data to the 11 pages that currently lack it, especially offer detail and coverage-lane pages.
7. Refresh sitemap lastmod dates and replace the stale 20260519 site.js cache-busting token after current local changes are reconciled.
8. Verify all 25 external URLs, normalize the Facebook destination against the canonical public-profile record, and record verification dates.
9. Reduce remote-dependency and asset drift: review Tailwind/Google Fonts reliance and remove or document the two unreferenced hero assets.
10. Make the Drive knowledge base authoritative for page URLs, CTA ownership, offer status, prices, and the article-to-offer routing model.
