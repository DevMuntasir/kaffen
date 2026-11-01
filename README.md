# Kaffen Coffee House — Next.js

A component-based Kaffen **Coffee House homepage**, enhanced with the Obsidian Brew / Midnight Roast motion experience, using Next.js App Router, React and TypeScript. The reference is https://kaffen.bslthemes.com/ (the destination of the supplied ThemeForest preview).

## Run locally

Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

Open http://localhost:3000. `npm run build` creates a production Next.js build. Run it with `npm start`. Reservations require the Node.js server; static hosting cannot run the booking API.

## Structure

```text
src/app/                   App Router page, layout and SEO metadata
src/components/layout/     Header, navigation and footer
src/components/sections/   Independently reusable homepage sections
src/components/ui/         Button, heading, photo and accessible dialog primitives
src/data/site.ts           Typed, centralized homepage content
src/styles/tokens.css      Semantic colors, typography, dimensions and motion
src/styles/globals.css     Components and responsive layout rules
src/styles/{font}.css      Locally hosted font declarations
public/images/             Local reference images
public/fonts/              Local fonts, no Google Fonts runtime dependency
docs/asset-sources.json    Original image source URLs
```

Change brand colors and fonts in `tokens.css`, copy/menu/prices in `site.ts`, and page composition in `home-page.tsx`. Section components can be moved into other pages. Interactive state is localized to its owning section, except the shared booking and delivery dialogs.

## Included behavior

- Midnight-style hero with a lazy-loaded rotating 3D coffee cup, steam and locally hosted imagery.
- Lenis smooth scrolling, a coffee-bean cursor with particle trail, and animated section reveals.
- Three-panel pinned horizontal coffee journey with vertical mobile/reduced-motion fallback.
- Reusable floating beans and section parallax.
- Desktop dropdown navigation and mobile toggle navigation.
- Horizontal gallery with scroll controls and native dialog image preview.
- Review pagination, article previews and all-articles status.
- Two-step table reservations with live availability, guest details, special requests and a saved booking reference.
- Server-side validation, duplicate-submit protection and capacity checks across overlapping 90-minute sittings.
- Anchor navigation, keyboard focus states, skip link, dialog focus trapping and Escape dismissal.

This implements the homepage and a local reservation backend, not the theme's secondary pages, WooCommerce or real delivery. Reference testimonials, statistics, contact details and news are demo content. Social links lead to the respective platform homepages until real profiles are provided.

## Design and assets

Dark `#090c0f` / `#0e1317`, bronze `#b99272`, Oswald headings, Roboto body, Merienda prices. Responsive layouts at 1200 / 1024 / 767px, a 1170px content container and 130px desktop section rhythm follow the reference. Original demo images have been downloaded for visual matching; provenance is in `docs/asset-sources.json`. Verify image/theme usage rights before production use.

## Verification

```bash
npm run typecheck
npm run build
npm run test:e2e
```

Browser tests require a Playwright Chromium installation (`npx playwright install chromium`). Alternatively set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to an existing Chromium executable. Run `npm run build` first. Tests start a production Next.js server on port 3100 with an isolated reservation data directory.

## Motion system

See [docs/MOTION.md](docs/MOTION.md) for the investigated reference, architecture, responsive fallbacks and tuning points. Browser screenshots are saved under `docs/` by the tests.

# kaffen

## Reservations

The header and reservation section open a two-step booking dialog. Guests select a date within the next 90 days, 1–8 people and an available half-hour slot, then provide their name, email, phone and optional requests. The server returns a reservation reference only after saving the record. No automatic emails are sent.

`GET /api/reservations?date=YYYY-MM-DD&guests=2` returns available times. `POST /api/reservations` validates and saves a booking; unavailable times return HTTP 409. Each sitting lasts 90 minutes, with 24 shared seats and starts from 08:00 to 19:30. Policy is centralized in `src/lib/reservation.ts`. Times use `America/New_York`, matching the existing restaurant address; replace the reference contact details and timezone with your restaurant's real details.

Records (including contact details) are saved server-side in `.data/reservations.json`, excluded from Git. Set `RESERVATION_DATA_DIR` to a private, persistent writable directory. Atomic writes and an in-process queue protect reservations in a **single Node.js process**. For multiple processes, serverless hosts, or multiple replicas, replace the file store with a shared transactional database before deployment. Back up the data directory and restrict its access.
