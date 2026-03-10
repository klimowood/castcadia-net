# Castcadia.net Revamp MVP

Overnight MVP implementation for a conversion-focused guided fishing charter site with **Book on vally** CTA flow preserved.

## Project Structure

- `docs/` source-of-truth planning docs
- `app/` Next.js 15 + TypeScript + Tailwind app (App Router)
- `handoffs/` implementation handoff notes

## Run Locally

```bash
cd app
npm install
npm run dev
```

Open http://localhost:3000

## Build for Production

```bash
cd app
npm run build
npm run start
```

## Environment Variables

Create `app/.env.local`:

```bash
NEXT_PUBLIC_VALLY_URL=https://book.vally.co/castcadia
```

If unset, the app uses that same fallback by default.

## Shipped MVP Pages

- `/`
- `/trips`
- `/about`
- `/testimonials`
- `/faq`

## Post-MVP TODO

- Wire real GA4 measurement ID + verify DebugView events
- Replace placeholder content/media with production assets
- Add trip detail pages (`/trips/[slug]`) and richer filters
- Add booking-success return path if Vally supports callback/return URL
- Add CMS integration (after conversion baseline)
