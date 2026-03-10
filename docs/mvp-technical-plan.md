# Castcadia.net Revamp — Overnight MVP Technical Plan

## 1) Objective (Why)
Build a high-conversion guided fishing charter website MVP by morning that:
- Clarifies trip options quickly
- Builds trust fast (social proof + guide credibility)
- Pushes visitors into booking with minimal friction
- Preserves and supports the existing **Vally** booking flow (no provider migration for MVP)

Primary KPI for MVP: **booking flow starts** and **completed bookings (if trackable)**.

---

## 2) MVP Scope & Constraints

### In Scope (must ship overnight)
- Core IA/pages:
  - Home
  - Trips / Services
  - About
  - Testimonials
  - FAQ
  - Booking CTA path (site → Vally)
- Structured trip/species/location/testimonial/FAQ content model
- Conversion analytics event instrumentation
- Mobile-first responsive layout
- Basic technical SEO (metadata, schema basics, performance hygiene)

### Out of Scope (post-MVP)
- Full CMS/editor workflow
- Blog/content marketing system
- Multi-language
- Advanced personalization/A-B testing framework
- Provider migration away from Vally

### Hard Requirement
- Existing booking provider flow remains: **Vally integration must be preserved and functional**.

---

## 3) Information Architecture (IA) & Page Structure

## Primary Navigation
1. Home
2. Trips
3. About
4. Testimonials
5. FAQ
6. Book Now (persistent CTA)

## Page-by-page Structure

### A) Home (`/`)
Purpose: Fast trust + fast path to booking.

Sections:
1. Hero
   - Headline (benefit-led)
   - Subheadline (location/species/context)
   - Primary CTA: **Book Your Trip**
   - Secondary CTA: **View Trips**
2. “Choose Your Trip” cards (3–6 top trip types)
3. Why Book With Us (guide credentials, safety, local expertise)
4. Target Species / Season snapshot
5. Featured testimonials
6. “How booking works” (3 steps, includes Vally flow)
7. FAQ preview (top 3)
8. Final sticky/inline booking CTA

### B) Trips / Services (`/trips`)
Purpose: Decision page; compare options and click into booking-ready detail.

Sections:
1. Filter/sort controls (trip type, duration, species, location)
2. Trip cards (price from, duration, species, max anglers, CTA)
3. Optional trip detail route (`/trips/[slug]`) for top offerings
4. Persistent CTA to book via Vally (per trip)

### C) About (`/about`)
Purpose: Trust and legitimacy.

Sections:
1. Guide/brand story
2. Credentials/licenses/safety
3. Equipment/boat highlights
4. Service area map snapshot
5. CTA: Book with confidence

### D) Testimonials (`/testimonials`)
Purpose: Social proof at scale.

Sections:
1. Aggregate rating / review highlights
2. Testimonial cards (taggable by trip type/species)
3. CTA after every 6–8 testimonials

### E) FAQ (`/faq`)
Purpose: Remove booking objections.

Sections:
1. Booking/payment/cancellation
2. What to bring / what’s included
3. Weather and rescheduling
4. Skill-level expectations
5. CTA block at bottom

### F) Booking Path (critical funnel)
- Global CTA button (header + sticky mobile + footer)
- Contextual CTA on trip cards and sections
- CTA route strategy:
  - Preferred: `Book Now` opens Vally flow with trip context params
  - Fallback: direct Vally landing if context param unsupported

---

## 4) Booking Integration Plan (Vally)

## Integration Modes (choose fastest viable)
1. **Deep-link redirect (recommended for overnight)**
   - Link buttons to Vally booking URL
   - Append query params for source attribution:
     - `utm_source=castcadia`
     - `utm_medium=website`
     - `utm_campaign=mvp_launch`
     - optional `trip_slug=<slug>`
2. Embedded iframe/widget (only if already proven stable)
   - Use only if mobile UX and performance are acceptable

## Implementation Notes
- Keep booking action explicit: “Book in Secure Checkout”
- Open in same tab for continuity (or new tab only if Vally constraints require)
- Ensure every CTA triggers analytics event before navigation
- Maintain a single config source for Vally URLs to avoid broken links

---

## 5) Technical Stack Recommendation (Overnight Practical)

## Recommended Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content Source (MVP):** Local typed JSON/TS data files (no CMS dependency overnight)
- **Deployment:** Vercel
- **Analytics:** GA4 (+ optional Microsoft Clarity)
- **Forms (optional contact):** simple serverless endpoint or Formspree

## Why this stack tonight
- Fast scaffolding and routing
- Strong SEO defaults
- Easy component reuse
- Typed content model for safety and speed
- One-command deploy path

---

## 6) Component Inventory (MVP)

## Layout / Global
- `SiteHeader`
- `SiteFooter`
- `PrimaryCTAButton`
- `StickyMobileCTA`
- `SectionContainer`

## Conversion / Booking
- `BookNowButton` (accepts `tripSlug`, `source`, `placement`)
- `BookingSteps`
- `TrustBadges`

## Content / Domain
- `HeroSection`
- `TripCard`
- `TripGrid`
- `TripFilters` (basic)
- `SpeciesBadgeList`
- `LocationPill`
- `TestimonialCard`
- `TestimonialGrid`
- `FAQAccordion`
- `GuideBio`

## Utilities
- `AnalyticsProvider`
- `trackEvent()` helper
- `buildVallyUrl()` helper

---

## 7) Data Model (MVP)

Use local JSON or TS objects under `src/content/`.

```ts
export type Species = {
  id: string;
  name: string;            // "Salmon"
  seasonMonths: number[];  // [5,6,7,8,9]
  notes?: string;
};

export type Location = {
  id: string;
  name: string;            // "Columbia River"
  region: string;          // "Pacific Northwest"
  description?: string;
  coordinates?: { lat: number; lng: number };
};

export type Trip = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  durationHours: number;
  priceFromUsd: number;
  maxAnglers: number;
  skillLevel: "beginner" | "intermediate" | "advanced" | "all";
  locationIds: string[];
  speciesIds: string[];
  includes: string[];      // gear, bait, etc.
  excludes?: string[];
  imageUrl: string;
  isFeatured?: boolean;
  vallyBookingPath?: string; // provider-specific path/id
  isActive: boolean;
};

export type Testimonial = {
  id: string;
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  date?: string;           // ISO
  tripId?: string;
  source?: "google" | "facebook" | "direct" | "other";
  isFeatured?: boolean;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: "booking" | "preparation" | "logistics" | "policy" | "safety";
  order: number;
};
```

## Suggested file structure
- `src/content/species.ts`
- `src/content/locations.ts`
- `src/content/trips.ts`
- `src/content/testimonials.ts`
- `src/content/faqs.ts`

---

## 8) Analytics & Conversion Event Plan

## Tooling
- GA4 via gtag (minimum)
- Optional: Clarity for behavior/session replay

## Core Events
1. `page_view`
   - params: `page_type`
2. `cta_click`
   - params: `cta_label`, `placement`, `page_type`, `trip_slug?`
3. `trip_card_view`
   - params: `trip_slug`, `position`
4. `trip_select`
   - params: `trip_slug`, `price_from`, `duration_hours`
5. `booking_start`
   - fired immediately before redirect to Vally
   - params: `trip_slug?`, `booking_url`, `placement`
6. `booking_return` (optional if return URL available)
   - params: `status` (success/cancel/unknown)
7. `faq_expand`
   - params: `faq_id`, `category`
8. `scroll_depth`
   - params: `page_type`, `depth_pct` (25/50/75/90)

## Funnel Definition
- Step 1: Landing page view
- Step 2: Trip interaction (`trip_select` or Trips page view)
- Step 3: Booking CTA click (`cta_click` with booking intent)
- Step 4: Booking start redirect (`booking_start`)
- Step 5: Completed booking (if Vally postback/return tracking available)

## Attribution Essentials
- Preserve UTM parameters in internal navigation
- Append source metadata into Vally link when supported
- Track CTA placement to identify best-converting sections

---

## 9) Overnight Build Sequence (Ship-by-Morning)

## Hour 0–1: Setup
- Initialize Next.js + Tailwind + TypeScript
- Define routes and shared layout
- Create content model/types + seed data

## Hour 1–3: Core Pages
- Build Home, Trips, About, Testimonials, FAQ
- Add responsive navigation and global CTA

## Hour 3–4: Booking Integration
- Implement `buildVallyUrl()` and `BookNowButton`
- Wire all primary/secondary CTAs to Vally deep links
- Validate flow on mobile + desktop

## Hour 4–5: Analytics
- Add GA4 base
- Implement event helper and key conversion events
- Validate in GA4 DebugView

## Hour 5–6: Polish + QA
- Performance pass (image sizing, lazy loading)
- Basic SEO metadata + Open Graph
- Accessibility checks (button labels, heading hierarchy, contrast)
- Smoke test all links + CTA routes

## Hour 6+: Deploy
- Deploy to Vercel preview then production
- Final funnel test from Home → Vally booking start

---

## 10) QA Checklist (MVP Go/No-Go)
- [ ] All nav pages load and are mobile responsive
- [ ] Every “Book Now” CTA resolves correctly to Vally
- [ ] Booking start event fires before redirect
- [ ] No broken links/images
- [ ] Core Web Vitals acceptable for MVP (especially LCP on home)
- [ ] Metadata populated per page (title/description/OG)
- [ ] FAQ and testimonial pages include clear CTA blocks

---

## 11) Post-MVP Immediate Next Steps
1. Add lightweight CMS (e.g., Sanity) only after conversion baseline is established
2. Add A/B testing on hero headline and CTA copy
3. Implement completed-booking reconciliation with Vally (webhook/postback if available)
4. Add location/species landing pages for SEO expansion
5. Add retargeting pixels once legal/privacy requirements are confirmed
