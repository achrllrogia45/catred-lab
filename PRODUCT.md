# Product

<!-- impeccable:product-schema 1 -->

> Inferred from `HANDOFF.md`, `AGENTS.md`, `.agents/DESIGN.md`, and `src/lib/data.js`; confirm with the studio.

## Platform

web

## Users

Prospective clients hiring a creative studio: game teams needing concept and 3D assets, product teams needing CAD/engineering, collectors commissioning custom figures and prints. They arrive from Instagram or word of mouth, judge craft and range quickly, and decide whether to start a project.

## Product Purpose

CATRED Studio's public landing page. It presents the studio's four disciplines and five-stage pipeline, proves craft through selected work, and converts interest into a project inquiry. Success means qualified inquiries and a credible studio impression.

## Positioning

One team takes an idea from first sketch through 2D concept, 3D model and rig, CAD engineering, and physical print — no handoffs between vendors. "Concept to printed object."

## Operating Context

Static Svelte 5 site built with Vite+ and deployed to Cloudflare Pages. Content lives in `src/lib/data.js`. Contact is a `mailto:` form with no backend. Artwork is placeholder SVG until real work lands. Four third-party craft apps are served from R2 under `/app/` and are not part of this page.

## Capabilities and Constraints

Svelte 5 + Tailwind 4; no tests, lint, or typecheck — `bun run build` is the gate. Brand tokens live in `src/lib/tokens.css`. V4 (Glass studio) is the default live variant; V5 (Atelier index), V6 (Kinetic signal), V7 (Specimen shelf) and V8 (Studio OS) are selectable in the same codebase. V1–V3 remain in the source but are retired from the switcher. No fabricated clients, quotes, prices, or benchmarks. Placeholder sections must stay honest.

## Brand Commitments

CATRED name; "Concept to printed object" positioning; red `#ED2224` as the single vivid accent; navy `#12103A`, indigo `#1B1464`, violet `#5B2C8C`, paper `#F6F4EE`, ink `#141233`; Archivo Black display, Space Grotesk body, Space Mono labels; 4px radius; poster/brutalist flat spot-colour language; no glassmorphism; no Inter. Copy names deliverables, not "solutions".

## Evidence on Hand

Real studio identity, four service descriptions, five pipeline stages, six work titles and types, Instagram link, and email. Artwork is placeholder (`public/dummy/*.svg`); client quotes are explicitly absent. No real case studies, metrics, or testimonials exist yet.

## Product Principles

- Show the pipeline, not just the output: concept → model → CAD → print is the differentiator.
- Be specific: name deliverables, stages, materials, and constraints.
- Keep the voice terse and confident; no hype claims.
- The page itself is proof of the studio's visual ability.
- Stay honest about placeholders and missing proof.

## Accessibility & Inclusion

Responsive to 360px, keyboard-operable controls, visible focus, reduced motion respected, semantic landmarks and headings, alt text for images.
