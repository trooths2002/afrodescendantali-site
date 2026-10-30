# Afrodescendant Ali newsroom strategy v1

Status: approved strategy baseline, production remains frozen  
Execution: EXE-20261030-005  
Scope: follow-up strategy/content-model work; PR #45 remains a bounded remediation

## Customer promise

> Afrodescendant Ali tracks signals across the Black World, then turns the most important ones into original reporting, analysis, and context.

Supporting line:

> We monitor sources daily, verify claims, and publish only work that has been written, reviewed, and approved by the editorial desk.

RSS and other feeds are discovery inputs. They are never presented as Afrodescendant Ali reporting without original work and approval.

## Public information architecture

- **Signal** — approved news briefs and timely original reporting.
- **Analysis** — published analysis and explainers only.
- **Coverage** — six Black World lanes with real source and story depth: Africa, Black America, Caribbean, Afro-Latin America, Afro-Europe, and Indian Ocean.
- **Case Files** — verified cases, records, timelines, and updates.
- **Culture & Media** — actual published video, audio, and cultural work.
- **Editorial Method** — sources, methods, corrections, rights, and feedback.
- **Work with Ali** — a secondary commercial pathway that does not displace the public-information mission.

Review-stage work is private editorial material. It must not appear in the public homepage, archive, sitemap, search-facing feeds, or customer-facing filters.

## Editorial lifecycle

`DISCOVERED` → `TRIAGED` → `SOURCE_VERIFIED` → `DRAFTED` → `QA_READY` → `APPROVED_FOR_PUBLICATION` → `PUBLISHED` → `UPDATED/CORRECTED` → `RETIRED`

Only `PUBLISHED` records are public. `UPDATED/CORRECTED` records remain public with visible history. `RETIRED` records leave the public index with a documented reason.

## Publishing cadence

- Daily metadata-only source monitoring.
- Same-day triage when the evidence supports it.
- Two to four original Signal briefs per week, as warranted.
- One deeper analysis or explainer per week.
- One weekly Signal Brief or digest.
- Social and video derivatives only from approved articles.
- Monthly review of source health, regional balance, corrections, and audience response.

The public site should say “updated daily” until the written newsroom window and automation schedule are reconciled. It should not promise a fixed publication time.

## Six-lane coverage readiness

Coverage is a rolling balance target, not a daily quota. Before claiming full Black World coverage, each lane needs:

1. At least two reliable publisher sources.
2. At least one institutional or primary source.
3. At least one local or community reporting channel.
4. A clear route on the site.
5. At least one publishable or actively monitored topic.

## Required article trust fields

Every published article should show:

- Story type: News brief, Analysis, Explainer, Case File, or Watch.
- Byline and publisher identity.
- Published date and updated date when applicable.
- Direct source links.
- “What we know” and “What remains unknown.”
- Method or reporting note.
- Image rights and illustration disclosure.
- Correction or clarification history.
- Visible correction and feedback path.

## Release gates

1. Keep PR #45 limited to the queue filter, stale-lead removal, mobile menu, and sitemap remediation.
2. Review this strategy/content-model follow-up separately.
3. Keep pending-review cards and generic media/case placeholders out of customer-facing publication surfaces.
4. Require explicit owner/editorial approval before story promotion, merge, deployment, or indexability changes.
5. Re-run desktop and mobile QA after the follow-up is reviewed; production remains frozen until the separate release decision.

## Non-goals

This strategy does not activate RSS publishing, automatic writing, automatic imagery, notifications, or story promotion. It does not change robots or canonical settings.
