# Emma-Ike Guesthouse website

Next.js 15 (App Router) + TypeScript + Tailwind CSS v4, with Lenis smooth scrolling and GSAP.

## Run it

```bash
npm install
cp .env.example .env.local   # fill in what you have
npm run dev                  # http://localhost:3000
npm run build                # production build (runs type-check and lint)
```

## Before launch: confirm with the property

These are placeholders. Nothing public listed them:

- **Room rates** (`src/data/rooms.ts`, `pricePerNight`). Currently ₵250 Standard and ₵400 Executive.
- **Bed type and occupancy** for each room (same file).
- Whether **breakfast is included** in the rate (`src/data/faq.ts` and the services page copy).

Prices feed the room cards, the comparison table, booking totals, the WhatsApp message and the Paystack amount, so you only change them in one place.

## Photos

- `src/data/media.ts` holds every image URL. The Unsplash photos are illustrative stock images.
- The real property photo is at `public/images/emma-ike-property.jpg`. Replace the file and keep the name.
- Each image falls back automatically (primary, then fallback, then a plain colour block), so a missing file never shows a broken image.
- The real photo is 800×500. A larger original (2000px wide or more) will look sharper.

## Booking

- **WhatsApp (primary):** the booking drawer builds a formatted request and opens `wa.me` with the number from `NEXT_PUBLIC_WHATSAPP_NUMBER`.
- **Paystack (optional):** set `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` and `PAYSTACK_SECRET_KEY`. The amount is calculated on the server from `rooms.ts`, never trusted from the browser. Currency is GHS, with card and mobile money channels (MTN MoMo and Telecel Cash on Paystack Ghana).
  - `POST /api/paystack/initialize`: starts the payment and returns the Paystack checkout URL.
  - `GET /api/paystack/verify?reference=...`: checks the result. `/booking/confirmation` uses it after Paystack redirects back.
  - Before taking real payments, add a Paystack `charge.success` webhook and store bookings in a database. The marked TODO in the verify route shows where.
- If the Paystack keys are empty, the online-payment button is disabled with a note and WhatsApp keeps working.

## Map

The default is a keyless Google Maps embed centred on the guesthouse coordinates. For the exact business pin, open the listing on Google Maps, choose Share, then Embed a map, and put that `src` URL in `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL`.

## Structure

```
src/
  app/                  pages, API routes, layout (JSON-LD LodgingBusiness schema), sitemap, robots
  components/
    booking/            BookingProvider, BookingModal (drawer), ReserveButton
    home/               hero, about, amenities, rooms, dining, location sections
    layout/             header, footer, mobile action bar, Lenis provider
    rooms/              filterable room list
    ui/                 SmartImage, buttons, map, FAQ, parallax frame
  data/                 site.ts, rooms.ts, amenities.ts, media.ts, faq.ts (swap for a CMS later)
  lib/                  booking maths, WhatsApp message, Paystack client
```
