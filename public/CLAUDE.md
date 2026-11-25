# public/ — copied verbatim into `dist/` on every build

Nothing here is processed by Vite. Treat these as production artifacts.

- `_worker.js` — Cloudflare Pages **advanced-mode** module worker. Default
  export; routes `/app/<name>/*` (vectorcraft, effectcraft, filmcraft,
  photocraft) to R2 via the `VECTORCRAFT` binding, redirects legacy paths,
  falls through to `env.ASSETS.fetch` otherwise. Must keep `cache-control:
  no-store` on the missing-object 404 (edge-cache trap). Must stay in
  `public/`; do not move it or rename the binding. See `HANDOFF.md` §9.
- `404.html` — the Pages SPA opt-out. Serves HTTP 404 and redirects home.
  Deleting it re-enables soft-404 SPA fallback for every unknown path. If a
  router is ever added, replace it with `_redirects` instead.
- `dummy/*.svg` — six placeholder artworks referenced through `img()` in
  `src/lib/data.js`. Replace files or update `data.js`.
- `favicon.svg`, `icons.svg` — `icons.svg` is currently unused.

Do not hand-edit `dist/`; it is gitignored and wiped by `bun run build`.
Do not commit the 25 MiB+ craft-app assets here — Pages rejects them; they live
in R2.
