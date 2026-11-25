# src/react/ — React 19 islands inside Svelte

Mounted through `lib/ReactMount.svelte`, which renders each island **once** with
static props (`display: contents` host). These are accents, not an app: no
router, no global state library, no context shared with Svelte.

- `Marquee.jsx` — red `CONCEPT - MODEL - CAD - PRINT -` strip. CSS keyframe loop,
  pauses on hover, stops under `prefers-reduced-motion`.
- `ContactForm.jsx` — controlled email/details fields; submit builds a `mailto:`
  URL. No backend, no network call. Hardcoded recipient — sync with
  `studio.email` in `lib/data.js`.
- `TickStrip.jsx` — currently unused (only archived variant E used it). Safe to
  delete after confirming the archive stays local.

Rules:

- Style with Tailwind utilities + the shared CSS variables. Scoped `<style>` for
  keyframes is fine.
- Do not add React Router, state managers, or data-fetching libraries.
- Keep accessibility: labels tied to inputs, focus styles, reduced-motion guards.
- Verify with `bun run build`; the React plugin runs before Svelte in
  `vite.config.js` (order matters for `.jsx` ownership).
