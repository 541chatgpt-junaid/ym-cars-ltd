# YM Cars Ltd: Website

Next.js 15 (App Router) + plain CSS. Font: Poppins (self-hosted via @fontsource).

## Run locally
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where to edit
- `data/site.ts`: phone, WhatsApp, address, opening hours, map location
- `data/cars.ts`: rental fleet and cars for sale (currently **sample data**)
- `app/page.tsx`: homepage sections, FAQ text
- `app/globals.css`: colours (brand blue `#0B4AB0`, green `#12892E`), layout, animations

## Booking form
Submissions open WhatsApp (07383 393739) with the booking details pre-filled. No server or email setup needed.

## Google reviews
Copy `.env.example` to `.env.local` and set `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID`.
Live reviews then load and refresh every 24 hours. Until then, labelled placeholder reviews are shown.

## SEO
Metadata, Open Graph image, `sitemap.xml`, `robots.txt`, and JSON-LD (AutoDealer + AutoRental + FAQPage) are included.
Set `NEXT_PUBLIC_SITE_URL` to the live domain.
