# Milo Remediation Pass 2 — CastCadia MVP

## Scope completed
Applied all 4 required Rex remediation items in `/home/adam/clawd/projects/castcadia-net-revamp/app`.

## What changed

### 1) Wired `vallyBookingPath` into CTA URL generation
- **Updated** `src/components/BookOnVallyButton.tsx`
  - Added optional `vallyBookingPath?: string` prop.
  - Passed it into URL builder: `buildVallyUrl({ tripSlug, vallyBookingPath, placement })`.
- **Updated** `src/components/TripCard.tsx`
  - Passed trip-specific path into CTA:
    - `vallyBookingPath={trip.vallyBookingPath}`

### 2) Hardened `buildVallyUrl()` against malformed `NEXT_PUBLIC_VALLY_URL`
- **Updated** `src/lib/vally.ts`
  - Extended options type to include `vallyBookingPath`.
  - Added guarded base URL handling:
    - Uses `try/catch` around `new URL(base)`.
    - Falls back safely to default `https://book.vally.co/castcadia` on parse failure.
    - No throw on malformed env URL.
  - Preserved trip context by deriving `origin + vallyBookingPath` when provided.

### 3) Normalized analytics naming to `vally` (not `valy`)
- **Updated** `src/lib/analytics.ts`
  - Renamed all event unions from `valy` to `vally`.
  - Renamed `complete_redirect_to_valy` → `complete_redirect_to_vally`.
  - Added footer event union: `cta_click_vally_footer`.
- **Updated all usages** to match `vally` spelling:
  - `src/components/SiteHeader.tsx`
  - `src/components/StickyMobileCTA.tsx`
  - `src/components/TripCard.tsx`
  - `src/app/page.tsx`
  - `src/app/trips/page.tsx`
  - `src/app/about/page.tsx`
  - `src/app/faq/page.tsx`
  - `src/app/testimonials/page.tsx`
  - `src/components/BookOnVallyButton.tsx` (`complete_redirect_to_vally`)

### 4) Fixed footer CTA event attribution
- **Updated** `src/components/SiteFooter.tsx`
  - Changed placement from `cta_click_vally_header` to **`cta_click_vally_footer`**.

## Verification
Ran from `app/`:
- `npm run lint` ✅
- `npm run build` ✅
  - Next.js build completed successfully with static routes generated.

## Notes
- `vallyBookingPath` is now carried from trip content through CTA component into final booking URL generation.
- URL builder now degrades safely for malformed `NEXT_PUBLIC_VALLY_URL` without runtime exceptions.
