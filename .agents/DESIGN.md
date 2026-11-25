# CATRED landing — 4 variants, 1 page each

Design read: creative-studio landing for hiring clients (game teams, product
teams, collectors), poster/brutalist language over cinematic studio structure.
DIALS: VARIANCE 9 / MOTION 7 / DENSITY 3.

## Shared (do NOT redeclare — import)
- `src/lib/tokens.css` — palette: `--red #ED2224, --navy #12103A,
  --indigo #1B1464, --violet #5B2C8C, --paper #F6F4EE, --ink, --line-dark,
  --line-light`; fonts `--font-display (Archivo Black), --font-body
  (Space Grotesk), --font-mono (Space Mono)`; `--rad: 4px`.
  Import once per variant: `import "../lib/tokens.css"` NOT needed —
  already global via app.css; just use the vars.
- `src/lib/data.js` — `studio, services, works, pipeline, img()` helper.
  Images live in `public/dummy/*.svg`, referenced as `/dummy/<file>`.
- GSAP + ScrollTrigger registered in main.js. In variants:
  `onMount(() => { const ctx = gsap.context(() => {...}, root); return () => ctx.revert(); })`
  Scope all selectors to component root. Honor reduced motion (global CSS
  kills animations; also guard heavy JS anims with
  `matchMedia("(prefers-reduced-motion: reduce)").matches` → skip).

## Hard rules (anti-slop)
- NO gradients (brand is flat spot colors), NO glassmorphism, NO Inter,
  NO three-equal-cards, NO purple mesh, radius ≤ 4px, red used sparingly
  as single accent. Copy must be specific (name deliverables, not "solutions").
- Sections every variant needs: hero (1 line + 1 CTA + scroll cue), work,
  services/pipeline, proof strip, contact/footer with IG + email.
- Responsive to 360px, keyboard-focusable CTA/links, alt text on images.
- One file per variant, self-contained styles in `<style>`.

## Variant briefs
- **A · Dusk Reel** (`src/variants/A.svelte`): dark cinematic (Blur/Unit Image).
  Fullscreen `/dummy/dhero-reel.svg` hero with slow Ken Burns zoom, giant
  display headline, 1 CTA. Work grid with hover zoom + caption
  `Title / type`. Scroll reveals via ScrollTrigger batch. Footer navy.
- **B · Pipeline** (`src/variants/B.svelte`): light paper (VOLTA energy).
  Paper bg, ink text. Hero = big statement + red underline mark. Core is
  pipeline walk Concept→3D→CAD→Print: 4 full-width bands alternating
  paper/white, each with stage number, image, deliverable list. CSS marquee
  strip ("CONCEPT · MODEL · CAD · PRINT ·") between hero and pipeline.
  Gentle stagger reveals only.
- **C · Poster Wall** (`src/variants/C.svelte`): brutalist gig-poster.
  Navy bg, oversized Archivo Black headlines, thick red rules, hard-edge
  blocks, mono labels. Work as screenprint wall (offset frames, rotated
  captions). Service index 01–04 as rows with hover invert (paper bg).
  Loudest of the four; keep motion to fast snappy reveals.
- **D · Year Feed** (`src/variants/D.svelte`): DIGIC-style chronological feed.
  Dark, sticky left rail nav (Work / Services / Studio / Contact anchors),
  stacked 16:9 entries with year tags (#2025, #2026), lazy reveal per entry,
  "Scroll to take a peek" cue. Restrained, gallery-like.
