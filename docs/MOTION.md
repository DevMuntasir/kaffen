# Midnight motion system

Reference investigated: https://obsidianbrew.vercel.app/ on 2026-10-29. The live page and its public JS/CSS were inspected, including rendered desktop screenshots. The original Kaffen content and section architecture are retained; the hero is replaced and a coffee journey is inserted after the menu.

## Reference behavior and implementation

| Feature            | Reference                                                                                     | Local implementation                                                                     |
| ------------------ | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Scroll             | Lenis, duration 1.2, exponential ease-out                                                     | Same duration/easing in `src/data/motion.ts`, driven by one GSAP ticker                  |
| Cursor             | Gold point/glow with rising elliptical particles                                              | Matching canvas trail plus a small coffee-bean follower requested by the user            |
| Horizontal journey | Three 100vw panels, 2000px pinned scroll, 0.5s scrub                                          | GSAP ScrollTrigger, same travel and timing; responsive width recalculation               |
| Journey design     | Selection / Roast / Midnight Finish; alternating copy/image; floating SVG beans               | Same copy, source photos, stats, tags, colors, Playfair/Inter typography and composition |
| Hero               | Dark photographic background, large italic title, rotating Three.js cup, steam, gold pill CTA | Midnight-inspired hero with Kaffen identity and existing delivery interaction            |
| Reveals            | Smooth fade/translate/blur, repeatable on scrolling                                           | Scoped GSAP reveal primitives with stagger and reverse-on-return behavior                |
| Decorations        | Floating beans and parallax                                                                   | Reusable `FloatingBeans` and `CoffeeBean` with section-specific color variants           |

## Components

- `MotionProvider`: owns Lenis, GSAP ticker synchronization and dialog scroll locks.
- `BeanCursor`: bounded canvas particle pool, pointer follower, DPI scaling and idle-frame suspension.
- `Reveal`: scoped animation ownership with cleanup and visible no-JS/reduced-motion fallback.
- `FloatingBeans`: reusable scroll parallax plus gentle floating motion.
- `CoffeeJourney`: self-contained pinning; data in `src/data/coffee-journey.ts`.
- `HeroCup`: lazy-loaded Three.js, local geometries; renderer lifecycle cleanup and offscreen pause.

Motion settings live in `src/data/motion.ts`. Typography/color tokens live in `src/styles/tokens.css`. Styles are in `src/styles/motion.css`; images/fonts are local. Asset provenance is in `docs/obsidian-assets.json`.

## Responsive and accessibility behavior

- Full horizontal pinning only on viewports at least 1024px wide and 650px tall, with no reduced-motion preference.
- Smaller screens and reduced-motion mode use vertically stacked panels so no content is clipped or trapped.
- Fine-pointer desktop cursor only; standard cursor in dialogs, touch mode and reduced motion.
- Native dialogs pause Lenis, retain focus trapping and Escape dismissal, and allow internal scrolling.
- Reduced-motion preference changes clean up/recreate scroll and animation instances.
- Hero photo remains if WebGL is unavailable. The WebGL enhancement is not loaded server-side.
- Decorative objects are hidden from assistive technologies and do not intercept pointer input.

The journey copy remains reference demo content, not independently verified business claims. No audio/autoplay gate, shop/cart or other unrequested secondary functionality was added.
