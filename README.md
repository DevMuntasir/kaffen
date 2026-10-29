# Kaffen Coffee House — Next.js

A component-based Kaffen **Coffee House homepage**, enhanced with the Obsidian Brew / Midnight Roast motion experience, using Next.js App Router, React and TypeScript. The reference is https://kaffen.bslthemes.com/ (the destination of the supplied ThemeForest preview).

## Run locally

Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

Open http://localhost:3000. `npm run build` produces a deployable static site in `out/`. Preview that export with any static HTTP server. `npm start` is not used for static exports.

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
- Booking dialog with native field validation and explicit demo completion.
- Anchor navigation, keyboard focus states, skip link, dialog focus trapping and Escape dismissal.

This implements the homepage, not the theme's secondary pages, WooCommerce, real delivery or reservation backend. Booking requests are **not sent or stored**. Reference testimonials, statistics, contact details and news are demo content. Social links lead to the respective platform homepages until real profiles are provided.

## Design and assets

Dark `#090c0f` / `#0e1317`, bronze `#b99272`, Oswald headings, Roboto body, Merienda prices. Responsive layouts at 1200 / 1024 / 767px, a 1170px content container and 130px desktop section rhythm follow the reference. Original demo images have been downloaded for visual matching; provenance is in `docs/asset-sources.json`. Verify image/theme usage rights before production use.

## Verification

```bash
npm run typecheck
npm run build
npm run test:e2e
```

Browser tests require a Playwright Chromium installation (`npx playwright install chromium`). Alternatively set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to an existing Chromium executable. Run `npm run build` first. Tests start a static production preview on port 3100 unless one is already running.

## Motion system

See [docs/MOTION.md](docs/MOTION.md) for the investigated reference, architecture, responsive fallbacks and tuning points. Browser screenshots are saved under `docs/` by the tests.
