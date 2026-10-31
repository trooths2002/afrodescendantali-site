# QA harness v0.1 — EXE-20261031-014

This draft branch adds the minimum repeatable QA core for the approved Studio & Briefing build. It is intentionally isolated from production and does not publish, merge, deploy, alter the sitemap, or change indexability.

## Required checks

- Playwright behavior checks across Chromium, Firefox, WebKit, mobile Chromium, and tablet emulation.
- Playwright visual baseline for the approved desktop homepage reference.
- axe-core scan of the rendered homepage.
- Keyboard and focus contract for the mobile menu, including Enter, Escape, and focus return.
- Route, content-status, and six-lane coverage assertions.
- Canonical, robots, sitemap, and JSON-LD assertions.
- Lighthouse CI checks for the core public routes.
- Nu HTML validation for representative HTML routes.
- lychee link and asset scan for public HTML/XML.

## Run locally

```bash
npm install
npx playwright install --with-deps chromium firefox webkit
npm run test:content
npm run test:html
npm run test:qa
npm run test:lhci
```

Set `BASE_URL` to a Cloudflare Pages preview URL to test a deployed preview instead of the local static server.

## Visual baseline protocol

The raster design reference is not treated as a pixel-perfect engineering specification. Before accepting a baseline:

1. Freeze the design tokens and responsive component contract.
2. Run the Chromium visual test at the approved preview URL.
3. Review the generated screenshot with the owner and editorial/design reviewer.
4. Commit only the reviewed `tests/site.spec.mjs-snapshots/` baseline files.

A missing baseline is an intentional, visible gate; it must not be bypassed with a blanket snapshot update.

## Manual release review

Automated checks do not prove complete accessibility or editorial quality. Before any merge decision, review:

- keyboard order and visible focus;
- screen-reader names, headings, landmarks, and reading order;
- reduced-motion behavior;
- captions/transcripts and image alt text;
- no fixture, queue, candidate, or review-stage language on public surfaces;
- existing analysis reachability and labels;
- all six regional lanes and their links;
- exact preview URL, commit SHA, reports, and screenshot evidence.

## Expected first-run status

Because this branch is a harness against the current repository, the first run may expose existing blockers (for example missing JSON-LD, incomplete menu state attributes, stale public queue language, invalid routes, or an unapproved visual baseline). Those failures are evidence for the next bounded implementation change; they are not permission to merge or deploy this branch.
