# CATRED — design system

<!-- impeccable:design-schema 1 -->

## Surfaces

Public landing page, five selectable variants behind the fixed Version switcher. V4 is the default; V5–V8 are alternates in the same Svelte 5 codebase. V5–V7 are light by default with a dark toggle; V8 is dark and solid. V1–V3 remain in the source but are retired from the switcher.

## Color

| Token | Value | Role |
|---|---|---|
| `--red` | `#ED2224` | single vivid accent: thread, rules, marks, active states |
| `--red-deep` | `#B90F11` | CTA/band surfaces with paper text (6.1:1) |
| `--navy` | `#12103A` | dark page base, V3/V4 ground |
| `--indigo` | `#1B1464` | depth, diagram geometry, dark surfaces |
| `--violet` | `#5B2C8C` | mid layers, secondary diagram geometry |
| `--paper` | `#F6F4EE` | light ground, text on dark |
| `--ink` | `#141233` | text on light |
| `--line-light` | `#D8D3C4` | hairline on paper |
| `--line-dark` | `#2C2670` | hairline on dark |

V5–V7 local dark modes use navy/ink grounds with paper text and the same accent. No palette is redeclared in a variant beyond local light/dark surface variables.

## Type

- Display: **Archivo Black** — headlines only, uppercase, tight tracking, never body.
- Body: **Space Grotesk** — 1.55–1.7 line height, measure 44–60ch.
- Utility: **Space Mono** — labels, folios, specimen numbers, meta, 0.62–0.8rem.
- Scale: display `clamp(2rem, 7vw, 6rem)` depending on variant; section headings `clamp(1.8rem, 4vw, 3.4rem)`; body 0.9–1.15rem.
- Headings carry their own weight; no decorative eyebrow above a heading unless it is a real index/masthead field.

## Space, radius, depth

- 4px brand radius. V1–V3/V5 use 0–4px; V4 uses 16px glass panels as its stated remit; V7 uses up to 6px for plinth frames.
- Hairline rules and generous section rhythm; one accent per surface.
- Depth: flat paper/ink in V1–V3/V5/V6; soft shadows and plinth layering in V7; glass is confined to V4; V8 uses solid ink/indigo panels.

## Motion

- Progressive enhancement via `src/lib/reveal.js` (`.rv` → `.in`); content visible without JS or under reduced motion.
- One authored moment per surface: V5 generative thread diagram, V6 orbit ring, V7 stage/object transition, V8 red brand marquee + masked CATRED wordmark entrance, then the discipline-index crossfade with a red folio and stage thread.
- Marquees/scroll progress/stage transitions respect `prefers-reduced-motion`.

## Variants

| ID | Name | World |
|---|---|---|
| V1 | Current | Retired from switcher; source kept |
| V2 | Press proof | Retired from switcher; source kept |
| V3 | Thread Machine | Retired from switcher; source kept |
| V4 | Glass studio | Framer-inspired dark glass; console, bento, sticky pipeline; default live variant |
| V5 | Atelier Index | Light editorial index; generative red/indigo thread diagram; archive |
| V6 | Kinetic Signal | Light kinetic broadcast; circular plate orbit; scoreboard; transmission |
| V7 | Specimen Shelf | Light spatial specimen library; particle object; shelf; plinth |
| V8 | Studio OS | Dark, solid Framer-inspired studio system; brand-first CATRED wordmark, red marquee, fixed rail, oversized discipline index, process ledger, red contact slab; no glass. |

V5–V7 default to light and expose an accessible dark toggle; V4 and V8 keep their own single themes.

## Direction contracts

- V5–V7 are **pinned** to the user's reference message: `https://www.sequen.ai/`, `https://oblikdigital.com/en`, `https://skein.zeusstudio.dev/`. `seed: none (pinned)` is recorded in `.impeccable/surfaces/`.
- V8 is **pinned** to the user's instruction: "Use framer style and use /impeccable:impeccable" after "I want other rework from stracht for V8 not making from it, so RADICAL change again." `seed: none (pinned)`; code-led.
- Code-led builds; no image-generation comps. Artwork is placeholder SVG; no fabricated clients, quotes, prices, or benchmarks.

## Search

`index.html` carries a 45-character title, a 151-character description, a self-canonical URL, OG/Twitter title and description, and `ProfessionalService` JSON-LD naming the studio, services, email, Instagram and Indonesia. `public/robots.txt` allows the root and points to `public/sitemap.xml`, which lists `https://catred.web.id/` only.

## Accessibility

Semantic landmarks and heading order, one h1 per variant, visible focus, labelled forms, alt text or decorative `alt=""`, 360px responsive, reduced-motion safe. The fixed Version switcher is a labelled native select; light/dark toggles use `aria-pressed`.

## Provenance

All shipping raster art is placeholder (`public/dummy/*.svg`). Mechanical detector on V5–V8: clean. Build: `vp build` zero warnings. Final Impeccable finish-review dispositions: **V5 ship, V6 ship, V7 ship, V8 ship** after fix rounds; all material findings resolved. V8's brand-first refinement (CATRED wordmark, red marquee, masked entrance, explicit studio/audience lede, SEO metadata) returned **ship** with no material fixes. V5's fixed Version switcher still clips a small corner of the hero plate at 1280 and the mobile active service row repeats the rail plate — both cosmetic and accepted. V8's 192px stage crops the placeholder moon at the top edge and the fixed shell switcher overlaps discipline row 04 at 390 in the first viewport — placeholder art and shell chrome, both accepted.
