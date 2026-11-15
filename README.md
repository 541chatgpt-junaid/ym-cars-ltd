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
Set `GOOGLE_PLACES_API_KEY` (Vercel: Project, Settings, Environment Variables), then redeploy.
The "YM CARS LTD" listing is found automatically (`GOOGLE_PLACE_ID` is optional). Reviews refresh every 24 hours.
Without a key, the section shows "Read all reviews" and "Write a review" buttons that link to the Google listing.

## SEO
Metadata, Open Graph image, `sitemap.xml`, `robots.txt`, and JSON-LD (AutoDealer + AutoRental + FAQPage) are included.
Set `NEXT_PUBLIC_SITE_URL` to the live domain.
