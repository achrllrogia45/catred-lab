# src/variants/ — page variants

- `F.svelte` — **retired V1**. Kept in source, no longer wired into `App.svelte`. 528 lines, self-contained:
  markup + runes state + scoped styles, with shared `.m-*` classes coming from
  `app.css`.
- `V2.svelte` — **retired press-proof alternate**. Kept in source, no longer
  wired. Svelte-only; reuses `data.js` and the shared tokens, with its own
  scoped `pp-*` styles.
- `V3.svelte` — **retired Thread Machine alternate**. Kept in source, no longer wired. Dark cinematic page with a
  Concept → Object stage scrubber (`v3/ThreadStage.svelte`) and thread chapters
  (`v3/Chapters.svelte`); Svelte-only, no new dependencies. Kept in source,
  not in the switcher.
- `V4.svelte` — **Glass studio, default live variant**. Framer-inspired dark glass page with
  a fixed glass nav, a studio-console stage switcher, bento sections and a
  sticky pipeline; Svelte-only, no new dependencies. Selected with `?view=v4`.
- `V5.svelte` — **Atelier index alternate**. Selected with `?view=v5`.
- `V6.svelte` — **Kinetic signal alternate**. Selected with `?view=v6`.
- `V7.svelte` — **Specimen Shelf alternate**. Selected with `?view=v7`.
- `V8.svelte` — **Studio OS alternate**. Dark, solid Framer-inspired studio system with a fixed rail, discipline index, process ledger and red contact slab; no glass. Selected with `?view=v8`.
- `_archive/A–E.svelte` — local-only explorations, **gitignored**. Do not edit,
  wire up, or commit them. A fresh clone will not have this folder.

If adding a variant:

1. One file per variant, self-contained, styles in `<style>` or shared `.m-*`.
2. Wire it in `src/App.svelte` (replace `<F />`).
3. Follow `.agents/DESIGN.md` — but it is partly stale: it describes A–D and
   GSAP (neither true) and bans gradients while F intentionally uses them for
   the CAT-THREAD wash/fades. See `HANDOFF.md` §6.4 before "fixing" those.
4. Required sections: hero (1 line + 1 CTA + scroll cue), work,
   services/pipeline, proof strip, contact/footer with Instagram + email.
5. 360 px responsive, keyboard-focusable controls, alt text, reduced-motion safe.

Known F behaviour: `manualDark || bandActive` makes the nav theme toggle inert
while the CAT-THREAD band is on screen. Tri-state fix is proposed in
`HANDOFF.md` §11; confirm intent before changing it.
