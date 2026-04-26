# Rex Review — Milo Overnight MVP (CastCadia)

Date: 2026-03-09
Reviewer: Rex (security/gatekeeper)
Scope: code quality, production readiness, Vally CTA flow integrity, mobile CTA behavior, P0/P1 risk scan.

## Executive Verdict
**FAIL (medium)** — app is close and build/lint pass, but there are conversion-path correctness gaps in Vally handling that should be fixed before production launch.

---

## What I validated
- ✅ Next app builds successfully (`npm run build`) and static routes render:
  - `/`, `/trips`, `/about`, `/testimonials`, `/faq`
- ✅ Lint passes (`npm run lint`)
- ✅ Global CTA surfaces exist and are wired via shared component:
  - Header, hero, trip cards, footer, sticky mobile CTA, page-bottom CTAs
- ✅ Single source of base Vally URL exists (`src/lib/vally.ts`) with unset-env fallback
- ✅ No obvious unsafe patterns (no `dangerouslySetInnerHTML`, no eval, no obvious secret leaks)

---

## Required fixes (by severity)

### High (conversion correctness)
1. **Trip-specific Vally mapping is defined but not used**
   - `Trip` model includes `vallyBookingPath`, but CTA links only use `tripSlug` query param and never resolve provider-specific path/id.
   - Risk: if Vally flow depends on path/id routing, users can land on generic booking instead of selected trip, degrading conversion and attribution.
   - **Remediation:** update `BookOnVallyButton` + URL builder to accept and prefer `vallyBookingPath` (or authoritative booking identifier), and pass it from `TripCard`/trip CTAs.

### Medium (resilience / prod readiness)
2. **Malformed `NEXT_PUBLIC_VALLY_URL` can hard-fail URL construction**
   - `buildVallyUrl` does `new URL(getVallyBaseUrl())` without guard.
   - If env is set but invalid, CTA render/click path can throw and break booking links.
   - **Remediation:** wrap URL creation in try/catch; on failure fall back to default URL and optionally log a warning in dev.

### Low (tracking consistency / observability)
3. **Analytics taxonomy drift and typo inconsistency (`valy` vs `vally`)**
   - Event names use `valy` and `complete_redirect_to_valy`; plan references different naming (`booking_start`, etc.).
   - Risk: fragmented reporting and harder funnel QA.
   - **Remediation:** normalize event schema now (single canonical naming standard) and map old names if needed.

4. **Footer CTA uses header placement label**
   - Footer button emits `cta_click_valy_header`.
   - Risk: attribution ambiguity for placement performance.
   - **Remediation:** add dedicated footer placement event label.

---

## Security/safety basics check
- No critical security flaws observed in this MVP slice.
- Static content-only app with minimal attack surface.
- No obvious P0/P1 security issues found.

---

## Go-live recommendation
After fixing items #1 and #2, this can move to **PASS** for MVP launch. Items #3 and #4 should be completed in same pass if possible to avoid analytics cleanup debt.
