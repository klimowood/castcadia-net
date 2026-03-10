# CastCadia MVP UX Layout

## 1) Goal (WHY)
Increase guided charter bookings by making the path from "I might fish" to "I reserved my trip" feel premium, trustworthy, and low-friction — especially on mobile.

Primary conversion: **Click-through to Valy booking flow**
Secondary conversion: **Lead capture (SMS/email) for visitors not ready to book now**

---

## 2) Premium Visual Direction

### Brand Feel
- **Pacific Northwest luxury outdoors**: deep evergreen, slate, mist, river silver, warm copper accents.
- **Editorial + expedition** aesthetic: high-end adventure brand, not discount-tour look.
- **Quiet confidence** tone: expert guide service, premium equipment, local river knowledge.

### Visual System
- **Typography pairing**
  - Display: elegant high-contrast serif for hero headlines.
  - UI/body: clean sans for clarity on mobile.
- **Image treatment**
  - Full-bleed cinematic hero image/video still (guide + guest + fish + natural light).
  - Tight documentary detail shots (hands, tackle, fish release, boat texture).
  - Social proof portraits (real guests, authentic smiles, candid not staged).
- **Motion (subtle)**
  - Soft parallax on hero background.
  - Fade/slide reveals on section entry.
  - Sticky bottom CTA on mobile for persistent booking intent.

### Premium UI Details
- Rounded 12–16px corners, generous whitespace, restrained shadow.
- Card surfaces with matte tone rather than glossy gradients.
- Iconography: thin-line custom set (species, water type, duration, gear).

---

## 3) Homepage Information Hierarchy (Wireframe-Level Order)

## Page: `/` (Homepage)

1. **Header (sticky)**
   - Logo (left)
   - Nav: Trips, Rates, Reviews, FAQ, About
   - Primary CTA button: **Book with Valy**
   - Mobile: hamburger + persistent CTA chip

2. **Hero Section (conversion-first)**
   - H1: clear value proposition (guided fishing charter in CastCadia region)
   - Subhead: seasonality + expertise + outcomes
   - CTAs:
     - Primary: **Check Availability (Valy)**
     - Secondary: View Trips
   - Trust micro-row under CTA: ⭐ rating | # trips guided | licensed/insured

3. **Quick-Decision Bar (mobile-first utility block)**
   - Trip type selector chips (Half Day / Full Day / Float / Family)
   - Guest count selector
   - Month selector
   - CTA: **See matching trips** (jumps to Trips grid)

4. **Featured Trips Grid (high-intent block)**
   - 3–6 top trip cards
   - Each card: image, trip name, duration, target species, from-price, next availability
   - Card CTAs:
     - **Book on Valy** (primary)
     - View details (secondary)

5. **Why CastCadia (premium trust narrative)**
   - 3-column (mobile stacked):
     - Local river expertise
     - Premium gear + safety standards
     - Beginner-friendly to advanced clients

6. **Proof Section (trust block)**
   - Review carousel with headshots + verified tag
   - Logos/badges: licensing, conservation partners, local publications
   - Optional short stat tiles: repeat guest rate, average rating, years guiding

7. **Experience Gallery (imagery strategy block)**
   - Scrollable story strip:
     - Dawn launch
     - On-water action
     - Catch moment
     - Fish handling/release ethics
     - End-of-trip recap

8. **Guide Credibility Block**
   - Guide portrait + short bio
   - Certifications, safety, local years on water
   - CTA: **Talk to a Guide** (SMS/form)

9. **FAQ (objection handling before booking)**
   - What to bring
   - Weather/cancellation
   - Kids/beginners welcome?
   - Licensing included?
   - Best season by species

10. **Final CTA Band (high-contrast close)**
   - Headline: "Ready to lock in your date?"
   - Primary CTA: **Book with Valy**
   - Secondary: Get trip recommendation

11. **Footer**
   - Contact, service area, social, legal

---

## 4) Booking Funnel Structure (Wireframe-Level Order)

## Page: `/trips` (Catalog / discovery)
1. Sticky header + Book CTA
2. Filter row (date, trip type, duration, species, price)
3. Sort (recommended / soonest / price)
4. Trip result cards (large imagery + quick specs)
5. Inline trust note (licensed guide, secure booking via Valy)
6. Sticky mobile CTA per card: **Book on Valy**

## Page: `/trips/:slug` (Trip detail)
1. Hero media (image/video still) + trip name
2. Quick facts ribbon: duration, group size, skill level, species, season window
3. Price + availability preview
4. Primary CTA cluster (above fold):
   - **Reserve on Valy** (primary)
   - Ask a question (secondary)
5. Detailed itinerary (what happens, timeline)
6. Included / not included
7. Safety + cancellation policy summary
8. Reviews specific to this trip
9. Related trips (upsell/cross-sell)
10. Bottom sticky CTA (mobile): **Reserve on Valy**

## Page: `/book` (Pre-booking bridge page, optional but recommended)
Purpose: reduce drop-off before external booking provider.
1. Confirmation headline: "You’re 60 seconds from reserving"
2. Recap of selected trip details
3. What happens next (Valy flow expectations)
4. Reassurance: secure payment, cancellation terms, support contact
5. Primary CTA: **Continue to Valy Booking**
6. Exit capture: "Not ready? Get trip plan by text"

## External: `vally` booking flow
- Ensure UTM/source parameters passed from all CTA entry points.
- Open in same tab for continuity on mobile unless provider constraints require new tab.
- Add return link path back to CastCadia support/FAQ.

## Page: `/booking-success` (Post-conversion on CastCadia)
1. Confirmation + celebration visual
2. Next steps checklist (license, prep list, arrival time)
3. Add-ons / upsell (gear package, photo package)
4. Referral prompt + review intent capture

---

## 5) CTA Placement Strategy (Valy-first)

### Primary CTA label consistency
Use one dominant label sitewide: **Book with Valy** or **Reserve on Valy** (pick one and keep consistent).

### Mandatory CTA locations
- Header (desktop + mobile)
- Hero primary button
- Every trip card
- Trip detail above fold
- Sticky bottom mobile CTA on key pages
- Final homepage CTA band

### Mobile behavior
- Persistent sticky bottom bar on homepage/trip detail:
  - Price anchor ("From $X")
  - Primary CTA: **Reserve on Valy**
- Tap targets minimum 44px height

---

## 6) Mobile-First Layout Recommendations

- Start at **360px** and **390px** widths, then scale up.
- One-column narrative flow until ~768px.
- Keep key conversion content above first 1.5 screen heights:
  - Value prop
  - Trust proof
  - Primary CTA
- Use collapsible accordions for FAQ and policy details.
- Prioritize compressed media:
  - Hero image optimized for LCP
  - Lazy-load lower gallery assets
- Sticky CTAs should never obscure form fields or system UI.

---

## 7) Trust Architecture (What removes hesitation)

- **Proof in first viewport**: rating + trip count + licensed/insured badge.
- **Real guest reviews** near first trip offers.
- **Transparent policies** before redirect to Valy.
- **Guide identity** (face, credentials, local expertise) to humanize premium price.
- **Conservation/safety ethic** to align with modern outdoor traveler values.

---

## 8) Content Priorities (MVP copy blocks)

1. Outcome-driven headline (not just "book now")
2. Clear trip packaging (what, who, how long, how much)
3. Specific proof (ratings, testimonials, credentials)
4. Objection handling (weather, beginners, cancellation)
5. Repeated direct booking invitation (Valy)

---

## 9) Analytics & Conversion Instrumentation (MVP)

Track these events:
- `cta_click_valy_header`
- `cta_click_valy_hero`
- `cta_click_valy_trip_card`
- `cta_click_valy_trip_detail`
- `cta_click_valy_sticky_mobile`
- `view_trip_detail`
- `start_prebook_bridge`
- `complete_redirect_to_valy`

KPIs:
- CTA click-through rate to Valy
- Trip detail → Valy click rate
- Mobile vs desktop booking initiation rate
- Scroll depth to first trust block

---

## 10) MVP Launch Checklist

- [ ] Consistent primary CTA naming and styling
- [ ] Valy links configured on all required placements
- [ ] Mobile sticky CTA present and QA tested
- [ ] First-view trust signals visible
- [ ] Fast media performance (hero optimized)
- [ ] Event tracking validated end-to-end
