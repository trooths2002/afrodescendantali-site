# Afrodescendant Ali Website Reconciliation Plan

Generated: 2026-07-01

Scope: reconcile the current uncommitted local website work with the recorded `origin/main` state without discarding either side.

No pull, merge, rebase, commit, push, checkout, reset, restore, stash, or branch-creation command was executed while preparing this plan.

## Repository State

| Item | State |
|---|---|
| Repository | `trooths2002/afrodescendantali-site` |
| Current branch | `main` |
| Local HEAD | `28411374e649b265511919f35544023745b62c25` (`2841137`, `fix: support clean work URL commerce`) |
| Recorded `origin/main` | `74b75957f6a66aaed294219eea86f3571e180af0` (`74b7595`) |
| Divergence | Local is 0 commits ahead and 4 commits behind the recorded remote-tracking branch |
| Tracked local source changes | 6 modified files |
| Untracked local public-source files | 10 files |
| Untracked operational artifacts | `_drive_sync_exports/` evidence, inventories, reports, and this plan |
| Remote-only public page | `public/analysis/global-black-world-digest-2026-06-21.html` |
| Direct source overlap | 5 files changed both locally and remotely |

The local HEAD is the parent/base of the first missing content commit, `eb7ca15`. This gives the reconciliation a clean common base: local uncommitted changes and the four remote commits both descend from `2841137`.

The five direct overlap files are:

- `public/analysis/index.html`
- `public/assets/site.css`
- `public/index.html`
- `public/sitemap.xml`
- `public/work.html`

`public/assets/site.js` and the ten untracked public pages are local-only. The June 21 digest page is remote-only.

## Local Changes Table

### Modified tracked website source

| Local file | Git state | Likely purpose | Recommendation | Preservation note |
|---|---|---|---|---|
| `public/analysis/index.html` | Modified | Adds a source-fed desk introduction, four May 19 source-fed article cards, Method and Starter Brief routes, and the free Substack briefing block. | **Combine manually** | Keep all local source-fed cards and routes; add the remote June 21 digest as the newest item; retain only one Substack block. |
| `public/assets/site.css` | Modified | Adds responsive Substack-button handling, evidence/source boxes, source-fed strip styling, action layout, and mobile rules. | **Combine manually** | Keep local evidence/source-fed styles and remote digest/latest-feature styles; deduplicate the Substack selector already present on both sides. |
| `public/assets/site.js` | Modified | Extends nested-path detection to `/work/` so injected coverage, commerce, and briefing layers use `../` links correctly on service-detail pages. | **Keep local** | No remote edit touches this file. Retain and test `/work/briefing.html`, `/work/memo.html`, and `/work/audit.html`. |
| `public/index.html` | Modified | Repoints latest-analysis areas to source-fed May articles, adds Starter Brief/Proof/Memo routes, replaces featured cards, and adds free Substack sections in the body and footer. | **Combine manually** | Keep the local source-fed routing and the remote June 21 digest feature. Deduplicate Substack markup and choose one coherent latest-analysis ordering. |
| `public/sitemap.xml` | Modified | Adds three Work detail pages, four source-fed articles, Method, Proof, and Starter Brief; updates Work lastmod. | **Combine manually** | Final sitemap must contain every local URL plus the remote digest exactly once, with reconciled lastmod dates. |
| `public/work.html` | Modified | Adds the free Substack bridge, routes Briefing/Memo/Audit cards to dedicated detail pages, and adds Proof/Starter Brief/source-fed analysis routing. | **Combine manually** | The remote Substack change is already represented locally; keep it once, then preserve the local detail-page and proof-routing additions. |

### Untracked local public-source files

| Local file | Likely purpose | Recommendation | Preservation note |
|---|---|---|---|
| `public/analysis/china-financing-africa-deal-terms.html` | Source-fed analysis on China-backed financing, deal terms, bargaining power, and a Custom Memo route. | **Keep local; investigate content evidence before deployment** | Preserve the page and its source trail; verify time-sensitive external sources during final QA. |
| `public/analysis/critical-minerals-data-access.html` | Source-fed analysis on mineral data, procurement, supply chains, and Audit/Memo paths. | **Keep local; investigate content evidence before deployment** | Preserve the page; verify external evidence and article schema during final QA. |
| `public/analysis/kenya-fuel-shock-worker-mobility.html` | Source-fed East Africa analysis on fuel prices, matatu fares, worker mobility, and the Briefing path. | **Keep local; investigate content evidence before deployment** | Preserve the page, coverage bridge, Starter Brief route, and external source trail. |
| `public/analysis/nigeria-refinery-ownership-energy-security.html` | Source-fed analysis on refinery ownership, imports, energy security, diaspora capital, and a Memo route. | **Keep local; investigate content evidence before deployment** | Preserve the page; verify external evidence before production use. |
| `public/method.html` | Explains the five-step signal-to-paid-intelligence method and source discipline. | **Keep local** | This is a trust/authority page and is linked from the local Analysis index. |
| `public/proof.html` | Shows sample deliverable structures for Briefing, Memo, Audit, and Starter Brief. | **Keep local** | This is the proof layer required by local Home, Work, and article routes. |
| `public/starter-brief.html` | Free Black World Intelligence Starter Brief lead-capture page using a pre-filled email action. | **Keep local** | Preserve the mailto route and reconcile its position with the remote Substack acquisition path. |
| `public/work/audit.html` | Dedicated Media / Intelligence System Audit offer-detail page. | **Keep local** | Required by the locally modified Work and article CTA routes. |
| `public/work/briefing.html` | Dedicated Rapid Advisory Briefing offer-detail page. | **Keep local** | Required by the locally modified Work and article CTA routes. |
| `public/work/memo.html` | Dedicated Custom Intelligence Memo offer-detail page. | **Keep local** | Required by the locally modified Work and article CTA routes. |

### Untracked operational artifacts

| Local path | Likely purpose | Recommendation |
|---|---|---|
| `_drive_sync_exports/*` | Drive-ready website inventories, risk reports, pre-reconciliation status/diff/log evidence, and this reconciliation plan. | **Keep local and preserve in a separate documentation commit.** Do not mix these files into the source-preservation commit. |

The arrow text in the captured patch appears as mojibake (`ÔåÆ`), but the current `public/work.html` contains the correct UTF-8 text `signal → dossier → bundle → membership`. Do not “repair” the live file based only on the patch rendering.

## Remote Changes Table

| Commit | Type | Files changed | What it changed | Recommendation |
|---|---|---|---|---|
| `eb7ca157db73b4b4bf6ac106272c67f006d2b1f6` (`eb7ca15`) | Content commit | `public/analysis/index.html`, `public/assets/site.css`, `public/index.html`, `public/work.html` | Adds the verified free Substack route: Analysis subscription block, Home subscription section/footer link, Work free-to-paid bridge, and responsive subscription-button styling. | **Combine.** The local working tree already contains these changes plus additional work; retain one copy of the Substack route. |
| `51529e69c98120396fdddbc6e706712212b0b589` (`51529e6`) | Merge commit | Same effective four-file payload as `eb7ca15` relative to first parent | Merges PR #1, “Add free Substack website route,” into `main`. It adds no separate product/content concept beyond `eb7ca15`. | **Keep remote history.** Do not replay this merge commit separately; base the integration branch on `origin/main`. |
| `84f89e6930adc99882dcc6207beabb4e48ecfc9a` (`84f89e6`) | Content commit | Adds `public/analysis/global-black-world-digest-2026-06-21.html`; modifies Analysis index, shared CSS, Home, and sitemap | Adds the June 21 Global Black World digest, Article schema and sources, a digest card on Analysis, a latest-intelligence feature on Home, digest-specific CSS, and the digest sitemap entry/Analysis lastmod. | **Keep remote, then investigate content evidence.** Preserve the page and integrations; verify time-sensitive claims and external sources before deployment. |
| `74b75957f6a66aaed294219eea86f3571e180af0` (`74b7595`) | Merge commit | Same effective five-file payload as `84f89e6` relative to first parent | Merges PR #2, “Add June 21 Global Black World intelligence digest,” into `main`. It adds no separate content beyond `84f89e6`. | **Keep remote history.** Do not replay separately; it is already the recorded `origin/main` tip. |

## Conflict Risk Table

| File / area | Local intent | Remote intent | Risk | Required resolution |
|---|---|---|---|---|
| `public/analysis/index.html` | Four May source-fed cards, source-fed desk explanation, Method/Starter routes, Substack block. | June 21 digest card plus the earlier Substack block. | **High** | Combine all article cards; place the digest first/newest; keep Method and Starter routes; keep one Substack block; update title/meta wording only after comparing both versions. |
| `public/assets/site.css` | Evidence, lead-path, source-fed, and responsive subscription styling. | Latest-intelligence and digest components plus the same subscription selector. | **High** | Retain both class families; remove duplicate selector definitions; check order/cascade and mobile breakpoints. |
| `public/index.html` | May source-fed links, Proof/Starter/Memo routes, revised cards, Substack body/footer blocks. | June 21 digest replaces the first latest item and adds a large latest-intelligence feature; also contains Substack changes. | **High** | Preserve the remote latest digest feature and the local source-fed/offer-routing layer. Remove duplicate Substack markup and decide the final reading order deliberately. |
| `public/sitemap.xml` | Ten local URLs and Work lastmod update. | Digest URL and Analysis lastmod `2026-06-21`. | **High** | Produce one deduplicated sitemap containing all pages. Expected post-combination public HTML count: 28; expected sitemap URL count: 28. |
| `public/work.html` | Dedicated Briefing/Memo/Audit detail routes, Proof/Starter strip, and Substack bridge. | Substack free-to-paid bridge. | **Medium–High** | Keep the Substack bridge once and preserve all local detail-page routing and proof/starter additions. |
| `public/analysis/global-black-world-digest-2026-06-21.html` | No local counterpart. | Remote-only digest with schema, ten cited sources, advisory CTA, Substack, Gumroad, and YouTube links. | **Low merge risk / High content-verification importance** | Keep remote unchanged during mechanical reconciliation; separately verify claims, dates, and external links before deployment. |
| `public/assets/site.js` | Local nested `/work/` routing fix. | No remote change. | **Low** | Keep local and test generated relative links on all three Work detail pages. |
| Ten local untracked pages | New articles, Method, Proof, Starter Brief, and service-detail pages. | No same-path remote files. | **Low textual conflict / Medium integration risk** | Keep local; validate links, sitemap, metadata, CTA consistency, and content evidence after combination. |
| Line endings | Local diff warns that several CRLF files may be normalized to LF and sitemap LF to CRLF. | Remote commits use repository-normalized blobs. | **Medium noise risk** | Avoid whole-file rewrites. Resolve semantic hunks, then inspect `git diff --check` and a whitespace-ignored diff before committing. |
| `_drive_sync_exports/` | Local operational evidence. | No remote counterpart. | **Low** | Preserve in a separate documentation commit so it cannot obscure source reconciliation. |

## Recommended Preservation Plan

1. **Freeze the evidence baseline.** Keep the existing pre-reconciliation status, patch, untracked-file, commit, and remote-file lists. Do not regenerate them after Git state changes and mistake the new files for the original baseline.
2. **Create a local preservation branch from the dirty current state only after explicit approval.** Do not stash. A branch plus commits makes every untracked page and modified file directly recoverable and auditable.
3. **Use two preservation commits.** First commit only `public/`; second commit only `_drive_sync_exports/`. This keeps website source review separate from operational documentation.
4. **Create the integration branch from the exact recorded remote tip `74b7595`.** This preserves both remote merge commits and avoids replaying them manually.
5. **Cherry-pick the local source-preservation commit onto the integration branch.** Expect conflicts in the five overlap files. Resolve by combination, not by choosing “ours” or “theirs” wholesale.
6. **Keep the remote digest page.** Do not replace it with a local page. Treat claim/source verification as a separate editorial approval gate before production.
7. **Keep every local-only public file.** None has a same-path remote replacement.
8. **Cherry-pick the documentation commit after source resolution.** The evidence folder should not conflict with remote site content.
9. **Run reconciliation QA before advancing `main`.** Minimum gates:
   - 28 public HTML files and 28 sitemap URLs.
   - No duplicate sitemap URLs.
   - No broken internal links.
   - Analysis index includes the June 21 digest, four local source-fed May articles, existing essays, Method, Starter Brief, and one Substack block.
   - Home includes the remote latest-digest feature, local source-fed routing, Proof/Starter/Memo routes, and no duplicate Substack section/footer block.
   - Work includes one Substack bridge, three detail-page routes, and the Proof/Starter source-fed strip.
   - Shared CSS contains both digest and local source-fed/evidence styles without duplicate conflicting selectors.
   - Work detail pages generate correct relative links through `site.js`.
   - Desktop/mobile preview and all public pages return HTTP 200.
   - Time-sensitive claims and external sources in all five source-fed/digest articles receive editorial verification.
10. **Advance `main` only after explicit approval of the resolved diff and QA results.** Do not push as part of the merge step unless separately authorized.

## Commands to Create a Safe Reconciliation Branch

These commands are a proposed future procedure. They have not been run. Run them only after explicit approval, from inside the repository, in one PowerShell session.

```powershell
$Repo = git rev-parse --show-toplevel
Set-Location $Repo

$ExpectedLocalHead = '28411374e649b265511919f35544023745b62c25'
$ExpectedRemoteTip = '74b75957f6a66aaed294219eea86f3571e180af0'

if ((git rev-parse HEAD) -ne $ExpectedLocalHead) {
    throw 'STOP: local HEAD changed after the reconciliation evidence was captured.'
}

if ((git rev-parse origin/main) -ne $ExpectedRemoteTip) {
    throw 'STOP: origin/main tracking state changed. Refresh the evidence before proceeding.'
}

git status --short --branch

# Preserve website source without discarding or stashing anything.
git switch -c safeguard/local-website-work-20260701
git add -- public
git diff --cached --check
git diff --cached --stat
git commit -m "chore: preserve local website work before reconciliation"
$LocalSourceCommit = git rev-parse HEAD

# Preserve exports/evidence separately.
git add -- _drive_sync_exports
git diff --cached --check
git diff --cached --stat
git commit -m "docs: preserve website exports and reconciliation evidence"
$LocalDocsCommit = git rev-parse HEAD

# Start the integration branch from the exact remote history already recorded.
git switch -c reconcile/origin-main-plus-local-20260701 origin/main

# Apply local source. Conflicts in the five overlap files are expected.
git cherry-pick $LocalSourceCommit
```

If the cherry-pick reports conflicts, stop automation and resolve only these expected files manually:

```powershell
git status --short

# Manually edit and combine:
# public/analysis/index.html
# public/assets/site.css
# public/index.html
# public/sitemap.xml
# public/work.html

git add -- `
  public/analysis/index.html `
  public/assets/site.css `
  public/index.html `
  public/sitemap.xml `
  public/work.html

git diff --cached --check
git cherry-pick --continue

# Apply the documentation/evidence commit after source reconciliation.
git cherry-pick $LocalDocsCommit

git status --short --branch
git log --oneline --decorate --graph -12
```

If the source combination is wrong or incomplete, abort before continuing:

```powershell
git cherry-pick --abort
git switch safeguard/local-website-work-20260701
```

The safeguard branch and both preservation commits remain available; this abort path does not discard local work.

## Commands to Apply the Final Merge After Approval

Run these only after the integration branch has passed the QA gates and its resolved diff has been explicitly approved.

```powershell
$Repo = git rev-parse --show-toplevel
Set-Location $Repo

$ExpectedOriginalMain = '28411374e649b265511919f35544023745b62c25'
$IntegrationBranch = 'reconcile/origin-main-plus-local-20260701'

git status --short --branch

if ((git status --porcelain)) {
    throw 'STOP: the integration branch is not clean.'
}

git switch main

if ((git rev-parse HEAD) -ne $ExpectedOriginalMain) {
    throw 'STOP: main changed after the reconciliation plan was prepared.'
}

# The integration branch descends from origin/main and should fast-forward main.
git merge --ff-only $IntegrationBranch

git status --short --branch
git log --oneline --decorate --graph -12
```

Do not run `git push` after this merge unless push authorization is given separately. If `--ff-only` refuses, stop and investigate; do not substitute a forced merge, reset, or rebase.

## Final Recommendation

The correct reconciliation policy is:

- **Keep local:** `site.js` and all ten local-only public pages.
- **Keep remote:** both remote merge histories and the June 21 digest page.
- **Combine manually:** Analysis index, shared CSS, Home, sitemap, and Work.
- **Investigate manually before deployment:** all time-sensitive article/digest claims and sources, duplicate Substack placement, CSS cascade/order, sitemap dates/count, line-ending noise, and final responsive rendering.

No local file should be discarded.
