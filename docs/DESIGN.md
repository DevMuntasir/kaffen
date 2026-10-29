# Kaffen design system

The original Coffee House reference remains the source for existing Kaffen sections. The hero and new horizontal journey follow Obsidian Brew / Midnight Roast; see `MOTION.md`. Preserve its section order, dark palette, photographic emphasis and tall condensed typography.

- **Tokens:** `src/styles/tokens.css` owns semantic colors, font families, width, spacing, radius and transition duration.
- **Typography:** Oswald 400 for section headings (42px desktop / 32px mobile), Oswald 500 for hero (120px desktop), Roboto 16px body, uppercase bronze 16px eyebrows, Merienda 24px prices.
- **Surfaces:** background `#090c0f`, alternating surface `#0e1317`, white primary text, muted body text, bronze action backgrounds.
- **Layout:** 1170px maximum container; 130px desktop / 90px tablet / 70px mobile section spacing; 30px standard grid gutters.
- **Primitives:** use Button / ButtonLink, SectionHeading, Photo and Modal rather than duplicating markup.
- **Content:** extend arrays in `src/data/site.ts`; do not embed new menu data inside layout rules.
- **Interaction:** keyboard-visible focus, accessible names on icon buttons, native modal focus handling, reduced-motion support. Hover effects must not hide required mobile content.
- **Scope:** navigation maps to homepage sections. New secondary pages should reuse layout and primitives and replace the corresponding anchors when implemented.

- **Editorial layer:** Playfair Display italic headings, Inter supporting copy, `#0f0f0f` midnight background and `#c69c6d` gold. Use `--font-editorial`, `--font-experience`, `--color-midnight` and `--color-gold`.
