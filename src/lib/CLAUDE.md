# src/lib/ — shared primitives

| File | Contract |
|---|---|
| `tokens.css` | Single source of palette, fonts, `--rad: 4px`. Imported once by `app.css` **after** Tailwind. `app.css` mirrors colors/fonts in `@theme`; when you add a token, update both. |
| `data.js` | Single source of copy/content: `studio`, `services`, `works`, `pipeline`, `img(filename)`. Artwork paths resolve to `/dummy/<file>` in `public/`. Do not hardcode studio copy in components. |
| `reveal.js` | Progressive-enhancement scroll reveals. `app.css` hides `.rv` **only** under `html.js`, so no-JS users see everything. Returns a cleanup function — the caller should return it from `onMount`. |
| `ReactMount.svelte` | Bridges React into Svelte: creates a React root in `onMount`, renders **once**, unmounts on destroy. Props are static by design. Extend it only if an island needs reactive Svelte props. |

Rules:

- Never redeclare palette values in this folder or in variants.
- `studio.tagline` is currently unused; the H1 is hardcoded in F.
- `ContactForm.jsx` hardcodes the email instead of importing `studio.email` —
  keep them in sync or pass the value as a prop.
- `img()` is the only place that should know the asset base path.
