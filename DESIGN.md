# Afrodescendant Ali — newsroom visual reset

## Review-stage direction

This branch replaces the previous dark, map-led presentation with a lighter editorial newsroom system. It is review-stage and does not change production, publication, sitemap/indexability, receivers, payment, or rights scope.

## Reference evidence

- Target preview: https://content-exe-20261105-015-afr.afrodescendantali-site.pages.dev/
- Live production comparison: https://www.afrodescendantali.com/
- Structural benchmarks: https://www.aljazeera.com/ and https://allafrica.com/
- Current source-linked items: Al Jazeera Africa and Africa CDC pages used in the homepage/newsroom cards.

Observed reference patterns:

- Al Jazeera exposes a broad news taxonomy including News, regions, explainers, opinion, video, features, investigations, podcasts, and a most-read container.
- allAfrica presents current source-linked headlines, regional navigation, media discovery, and institutional/partner context.
- The prior preview used a dark brown/gold palette, an oversized decorative map hero, repeated card treatments, mission-heavy sections, and visible draft receiver language. That direction remains preserved on PR #54 for comparison and is not the target of this branch.

## Proposed tokens

- Paper: `#f5f4ef`
- White: `#ffffff`
- Ink: `#14232d`
- Muted: `#71808a`
- Rule: `#d6dcd8`
- Navy: `#10222c`
- Accent: `#bd4932`
- Gold: `#b98635`
- Body: system sans stack
- Display: restrained serif stack
- Layout: 1320px shell, 1px rules, compact utility line, dense latest rail, white story cards, dark editorial rail

## Component rules

- First viewport: masthead, date/currentness bar, one lead story, compact lead visual, latest rail.
- Content rhythm: latest feed before explanatory mission copy; region navigation is a slim rule-based index.
- Story cards show format, geography, source/date, summary, and a direct destination.
- The commercial path is a separate dark band and a separate `/work.html` page.
- External media is labeled as external; first-party audio/video is not implied before it exists.
- Use editorial selection language where ranking data is not available; do not label a static list “Most read.”
- Use no email-draft or receiver-preview CTA in the main newsroom.

## Known gaps

- First-party story photography, newsletter receiver, ranked most-read data, and aggregate audience analytics require separate owner-approved implementation.
- `/about.html`, `/contact.html`, and legacy analysis entry routes may still contain prior presentation patterns and should be brought onto this system after homepage/newsroom QA.
- Production remains unchanged until the owner approves a separate release gate.

