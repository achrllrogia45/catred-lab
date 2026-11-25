# catred

Static landing page (Svelte 5) with a local variant archive and React islands, built with Vite 8 + Tailwind 4. V4 (`src/variants/V4.svelte`, Glass studio) is the default live variant; V5 (`V5.svelte`, Atelier index), V6 (`V6.svelte`, Kinetic signal), V7 (`V7.svelte`, Specimen shelf) and V8 (`V8.svelte`, Studio OS) are selectable from the fixed Version dropdown or `?view=v4|v5|v6|v7|v8`. V1–V3 remain in the source but are no longer wired into the switcher.

- dev: `bun run dev` (port 5199)
- build: `bun run build` (`vp build`)
- preview: `bun run preview`
- tests / lint / typecheck: none configured
- branches: `development` → preview at `development.catredlab.pages.dev`; `main` → production `catredlab.site` (promotion only)

Cross-harness ECC config lives in `.agents/` (`rules/`, `skills/`, `ecc-install-state.json`).

Binding design brief: `.agents/DESIGN.md` (partly stale — see `HANDOFF.md` §6.4). Current state, deploy pipeline and known issues: `HANDOFF.md`. Shared tokens in `src/lib/tokens.css`, copy/data in `src/lib/data.js`, placeholder art in `public/dummy/`. Keep each variant self-contained in its own file under `src/variants/`.
