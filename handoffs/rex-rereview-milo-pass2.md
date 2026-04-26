# Rex Re-Review — Milo Remediation Pass 2 (CastCadia MVP)

Date: 2026-03-10
Reviewer: Rex
Project: `/home/adam/clawd/projects/castcadia-net-revamp/app`

## Verdict
**PASS (low)**

All previously failed items were re-checked and are now fixed.

## Verification against prior fail items

1) **`vallyBookingPath` used in CTA URL generation** ✅
- `src/components/TripCard.tsx` passes `vallyBookingPath={trip.vallyBookingPath}` into CTA.
- `src/components/BookOnVallyButton.tsx` accepts `vallyBookingPath` prop and calls:
  - `buildVallyUrl({ tripSlug, vallyBookingPath, placement })`
- `src/lib/vally.ts` consumes `vallyBookingPath` and prefers trip-specific route construction.

2) **`buildVallyUrl` malformed env handling hardened** ✅
- `src/lib/vally.ts` now wraps URL parsing in `try/catch`.
- If `NEXT_PUBLIC_VALLY_URL` is malformed, it safely falls back to default:
  - `https://book.vally.co/castcadia`
- No uncaught throw path remains in URL construction.

3) **Analytics naming normalized to `vally`** ✅
- `src/lib/analytics.ts` event union uses `vally` consistently.
- Redirect event now `complete_redirect_to_vally`.
- Repo check confirms no `valy` tokens remain under `src/`.

4) **Footer CTA attribution label corrected** ✅
- `src/components/SiteFooter.tsx` now emits:
  - `placement="cta_click_vally_footer"`

## Build/quality confirmation
- `npm run lint` ✅
- `npm run build` ✅ (static routes generated successfully)

## Minor non-blocking recommendations (separate from required fixes)
- Consider constraining `placement` in `buildVallyUrl` to `AnalyticsEventName` for stronger type alignment across analytics and URL params.
- Consider trimming/normalizing `NEXT_PUBLIC_VALLY_URL` once at read time (e.g., whitespace cleanup) to reduce config-footgun risk.
