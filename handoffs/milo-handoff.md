# Milo Handoff — Castcadia Overnight MVP Plan

I created the requested overnight technical MVP plan for the guided fishing charter revamp, focused on booking conversion and preserving the current Vally booking flow.

## Files Delivered
1. `/home/adam/clawd/projects/castcadia-net-revamp/docs/mvp-technical-plan.md`
2. `/home/adam/clawd/projects/castcadia-net-revamp/handoffs/milo-handoff.md` (this file)

## What’s Included in the Plan
- Conversion-focused objective and MVP constraints
- Full IA and required page structure:
  - Home
  - Trips/Services
  - About
  - Testimonials
  - FAQ
  - Booking CTA funnel path
- Vally integration approach (deep-link first, embed optional)
- Practical overnight stack recommendation (Next.js + TS + Tailwind + Vercel + GA4)
- Component inventory for fast implementation
- Typed MVP data model for:
  - Trips
  - Species
  - Locations
  - Testimonials
  - FAQ
- Analytics event taxonomy + funnel for booking conversion tracking
- Hour-by-hour implementation sequence to ship by morning
- QA go/no-go checklist and immediate post-MVP follow-ups

## Key Technical Decision
For speed and reliability overnight, the plan recommends:
- Keeping content in typed local data files (no CMS dependency tonight)
- Instrumenting `booking_start` immediately before redirect to Vally
- Passing UTM/source/trip context via Vally-compatible query params

## Note for Execution Team
If Vally supports webhook/postback or return URL status signaling, implement it in the next iteration to track completed bookings (not just booking starts) and close attribution loop.