# src/ — application source

Plain Vite + Svelte 5. **Not SvelteKit**, no router, no SSR. One page.

- `main.js` — mounts `App.svelte` into `#app`, imports `app.css`, adds `html.js`.
- `App.svelte` — switches between `variants/V4.svelte` (Glass studio, default),
  `variants/V5.svelte` (Atelier index), `variants/V6.svelte` (Kinetic signal),
  `variants/V7.svelte` (Specimen shelf) and `variants/V8.svelte` (Studio OS);
  the fixed Version picker is `lib/VariantSwitch.svelte`. V1–V3 remain in
  `variants/` but are no longer imported.
- `app.css` — the only global stylesheet: Tailwind import, tokens import,
  `@theme`, base layer, all `.m-*` component classes, reduced-motion kill.
- `lib/` — shared tokens, data, reveal helper, React bridge.
- `react/` — React 19 islands.
- `variants/` — one self-contained page per file.

Rules:

- Svelte 5 **runes only** (`$state`, `$derived`, `$props`, `$effect`,
  `{#snippet}`). No legacy stores, no `export let`.
- Use CSS variables from `lib/tokens.css`; never hardcode palette hexes.
- Prefer Tailwind utilities for layout/spacing; put reusable component styles in
  `app.css` under `@layer components`, not in scattered global files.
- Imports use explicit `.js` / `.svelte` / `.jsx` extensions.
- No new dependencies without asking. No GSAP — motion is CSS + IntersectionObserver.
- Verification is `bun run build` (there is no test/lint/typecheck setup).
