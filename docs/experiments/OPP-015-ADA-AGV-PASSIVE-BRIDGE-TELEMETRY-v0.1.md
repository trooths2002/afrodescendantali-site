# Experiment Spec: OPP-015 ADA → AGV Passive Bridge Telemetry v0.1

**Execution ID:** `EXE-20260903-006`  
**Opportunity ID:** `OPP-20260903-015`  
**Date:** 2026-09-03  
**Status:** `L2 — READY / ADA SIDE IMPLEMENTED / AGV SIDE OBSERVATION-ONLY`  
**Authoritative Repositories:**  
- Source Surface: `trooths2002/afrodescendantali-site` (branch `experiment/opp-015-ada-agv-bridge-v0.1`)  
- Target Surface: `ascendglobalventures.com` (Live on Cloudflare Worker `ascendglobalventures-com`; source repo unresolved / HOLD)  

---

## 1. Hypothesis

An existing AfroDescendantAli audience member navigating public editorial, methodology, or work pages can encounter subtle, contextual attribution bridges to Ascend Global Ventures and generate an attributable, measurable signal of commercial/institutional interest without aggressive marketing, popups, or trust degradation.

---

## 2. Baseline (Pre-Implementation State)

A rigorous audit of `trooths2002/afrodescendantali-site` at base commit `e4fa2aa` established:
1. **Existing AGV Links:** Exactly **0**. No outbound links to `ascendglobalventures.com` existed anywhere on `afrodescendantali.com`.
2. **Existing AGV CTAs:** Exactly **0**.
3. **Existing Referral Telemetry:** `UNKNOWN` / Not tracked.
4. **Existing ADA Analytics Stack:** GA4 Measurement ID `G-11B3ZP3DH2` loaded in `public/assets/site.js` (PR #33) with first-party event dispatcher `trackLeadIntent()`.
5. **Existing Target AGV Analytics Stack:**
   - GA4 / Third-party trackers: `NOT PRESENT`.
   - Internal Telemetry: `VERIFIED` (`window.dispatchEvent(new CustomEvent('agv:telemetry', ...))`).
   - Client-side UTM capture: `NOT PRESENT` (Relies on Cloudflare edge access logs and HTTP Referer headers).
   - Inquiry submission: `PREVIEW ONLY` (Live transmission disabled).

---

## 3. Telemetry & Event Taxonomy Contract

### ADA-Side Outbound Event: `ada_agv_bridge_click`
Fired whenever a user activates any bridge placement (`data-agv-bridge`).

```json
{
  "event": "ada_agv_bridge_click",
  "source_surface": "afrodescendantali",
  "source_page": "/about",
  "source_content_type": "bridge_attribution",
  "bridge_variant": "about_systems",
  "destination": "https://ascendglobalventures.com/?utm_source=afrodescendantali&utm_medium=owned&utm_campaign=ada_agv_bridge_v01&utm_content=about_systems",
  "campaign": "ada_agv_bridge_v01",
  "timestamp": "2026-09-03T18:45:00.000Z"
}
```

Dispatched to:
1. `window.gtag('event', 'ada_agv_bridge_click', ...)` (GA4)
2. `window.dataLayer.push(...)` (GTM / browser observers)
3. `trackLeadIntent('ada_agv_bridge_' + variant, ...)` (First-party local stream)

### Inbound Campaign URL Contract
All bridge destinations follow this immutable format:
`https://ascendglobalventures.com/?utm_source=afrodescendantali&utm_medium=owned&utm_campaign=ada_agv_bridge_v01&utm_content=<bridge_variant>`

Allowed variants in v0.1:
- `about_systems`
- `method_systems`
- `work_enterprise`

---

## 4. Passive Bridge Placements (3 Total)

1. **Placement 1: `public/about.html` (`about_systems`)**
   - *Context:* Section "Business direction", following discussion of production capacity.
   - *Copy:* "Research systems, trade data infrastructure, and decision architecture operated in alignment with Ascend Global Ventures."
   - *Attribute:* `data-agv-bridge="about_systems"`

2. **Placement 2: `public/method.html` (`method_systems`)**
   - *Context:* Section "Source discipline", within the trust-list alongside news feeds and CFR-style references.
   - *Copy:* "Decision systems: Trade decision models, evidence packet standards, and institutional frameworks operated in partnership with Ascend Global Ventures."
   - *Attribute:* `data-agv-bridge="method_systems"`

3. **Placement 3: `public/work.html` (`work_enterprise`)**
   - *Context:* Section "Proof before purchase", below sample deliverable links.
   - *Copy:* "For sovereign, institutional, or enterprise decision intelligence and trade infrastructure, see Ascend Global Ventures."
   - *Attribute:* `data-agv-bridge="work_enterprise"`

---

## 5. Funnel & Observability Matrix

| Funnel Stage | Telemetry Mechanism | Current Observability Status |
| :--- | :--- | :--- |
| **1. ADA Contextual Exposure** | Pageview on `/about`, `/method`, `/work` | **MEASURABLE NOW** (GA4 pageviews) |
| **2. ADA Bridge Click** | `ada_agv_bridge_click` event + variant | **MEASURABLE NOW** (GA4 custom event + dataLayer) |
| **3. AGV Attributed Arrival** | Cloudflare edge access logs + URL query string | **OBSERVABLE AT EDGE / CLIENT UNKNOWN** |
| **4. AGV Qualified Intent** | Progression to `/inquiry` / CTA clicks | **CANDIDATE SURFACE (HOLD on AGV mutation)** |
| **5. Inquiry / Conversion** | Form transmission | **HOLD (AGV form in PREVIEW mode)** |

---

## 6. Success / Hold / Kill Logic

- **Technical PASS:**
  - Bridge links point to live AGV domain with valid UTM parameters.
  - Event `ada_agv_bridge_click` fires correctly without console errors.
  - All existing site navigation, mailto links, and lead trackers remain unbroken.
  - Zero third-party trackers or fingerprinting introduced.
- **Commercial Evidence Result:**
  - `COMMERCIAL_RESULT = PENDING_OBSERVATION`
  - Requires live traffic data over minimum 14-day observation window.
- **HOLD Trigger:**
  - If AGV production mutation is required to interpret the test, hold AGV changes until canonical code repo is established.

---

## 7. Privacy Constraints

- No cross-site tracking cookies.
- No device fingerprinting.
- No user profile databases.
- Anonymous campaign attribution only (`utm_*`).

---

## 8. Rollback Plan

If rollback is required:
1. Revert commit on `experiment/opp-015-ada-agv-bridge-v0.1` or checkout base commit `e4fa2aa`.
2. Cloudflare Pages will serve previous production build cleanly.
