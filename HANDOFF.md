# CATRED — Claude Code Handoff

**Snapshot:** 2026-11-25 12:20 WIB · branch `development` · production untouched.
**Repo:** `/home/hilman/projects/website/catred` · remote `github.com/achrllrogia45/catred-lab`
**Production:** <https://catredlab.site> · **Preview:** <https://development.catredlab.pages.dev>

---

## 0. Kickoff prompt (paste this into Claude Code)

```text
You are picking up the CATRED repo: a static Svelte 5 landing page with a
five-variant switcher (V4 default, V5–V8 alternates), built with Vite+ and
Tailwind 4, deployed to Cloudflare Pages, with four third-party "craft" web apps
served from R2 under /app/.

You are on the `development` branch. It deploys only to the preview host
https://development.catredlab.pages.dev — never to catredlab.site. Production is
the `main` branch and is promoted only on explicit instruction.

Before touching anything, read, in this order:
  1. CLAUDE.md
  2. AGENTS.md
  3. HANDOFF.md        (this file — full state of the repo)
  4. DESIGN.md         (current design system)
  5. .agents/DESIGN.md (older brief; partly stale, see HANDOFF §6.4)

Then run `bun install && bun run build` and report:
  - whether the build passes,
  - any warnings,
  - the top 3 issues you would fix from HANDOFF §11.

Do not edit, commit, push, or deploy anything until I confirm the plan.
```

---

## 1. What this repo is

CATRED Studio's public landing page plus the routing layer that hosts four
third-party creative apps:

| URL | What it is |
|---|---|
| <https://catredlab.site/> | Production landing (variant F, old build) |
| <https://development.catredlab.pages.dev/> | Development preview (V4–V8 switcher) |
| <https://catredlab.site/app/vectorcraft/> | VectorCraft v0.21.1 |
| <https://catredlab.site/app/effectcraft/> | EffectCraft v0.21.1 |
| <https://catredlab.site/app/filmcraft/> | FilmCraft v0.17.1 |
| <https://catredlab.site/app/photocraft/> | PhotoCraft v0.20.2 |

The landing page is a studio showpiece: 2D concept art, 3D art/animation,
mechanical CAD, 3D printing. Positioning: **"Concept to printed object"** —
one team, five stages, no handoffs. Visual language is poster/brutalist:
flat spot colors, Archivo Black headlines, tiny 4 px radii, one red accent.

The `development` branch currently ships five selectable variants: **V4 Glass
studio** (default), **V5 Atelier index**, **V6 Kinetic signal**, **V7 Specimen
shelf**, **V8 Studio OS**. V1 (old F), V2 and V3 remain in source but are retired
from the switcher.

The craft apps are **not built in this repo**. They are release zips from
upstream (`storytold/vectorcraft`, etc.) uploaded to Cloudflare R2 and streamed
through a Pages Worker. The only code for that is `public/_worker.js`.

---

## 2. Current state — read this before changing anything

### 2.1 Branches

| Branch | Role | Deploys to |
|---|---|---|
| `main` | production | <https://catredlab.site> (Pages production, direct upload) |
| `development` | integration / design lab | <https://development.catredlab.pages.dev> (Pages preview) |

Promotion is deliberate: merge/rebase `development` → `main`, then deploy with
`--branch main`. Never deploy `main` while a design experiment is in the tree.

### 2.2 What `development` contains

- `src/App.svelte` — variant switcher: V4 default, V5–V8 alternates; `?view=`
  query plus localStorage persistence.
- `src/variants/V4–V8.svelte` — five complete pages. V1 (`F.svelte`), V2 and V3
  are retired but kept in source.
- `src/lib/VariantSwitch.svelte` — fixed Version dropdown, all viewports.
- Vite+ migration: scripts run `vp`; deps are `vite-plus` and
  `@voidzero-dev/vite-plus-core` (aliased as `vite`).
- SEO: `index.html` OG/Twitter/canonical/JSON-LD, `public/robots.txt`,
  `public/sitemap.xml`.
- AI contributor context: `AGENTS.md`, `CLAUDE.md`, nested `CLAUDE.md`,
  `HANDOFF.md`, `DESIGN.md`, `PRODUCT.md`, `.agents/` (ECC rules/skills).
- Production plumbing carried over: `public/_worker.js`, `public/404.html`.

### 2.3 Production vs preview (verified 2026-11-25)

| Thing | State |
|---|---|
| Production `catredlab.site` | Deployment `2ebd589e` (2026-11-06), variant F, bundle `index-oQHmqk0y.js` / `index-N-SLJVV2.css` |
| Preview `development.catredlab.pages.dev` | Deployment `c921a9fa` (2026-11-25), preview, branch `development`, commit `6af3dc7`, V4 default; bundle `index-CpiivYb-.js` / `index-C4smuN-A.css` |
| Local build | `vp build` ~3.2 s; CSS ~123.7 kB, JS ~115.6 kB (five variants) |
| Tests / lint / typecheck | **None configured.** `bun run build` is the only gate. |
| Pages integration | **direct upload** (`wrangler`), not Git-connected. Pushing does not deploy. |

---

## 3. Stack and commands

| Layer | Version / choice |
|---|---|
| Runtime / package manager | Bun 1.4.5 (Node 24 also works; repo uses `bun.lock`) |
| Bundler | Vite+ 1.8.0 (`vp`), with `@voidzero-dev/vite-plus-core@8.3.8001` aliased as `vite` |
| UI | Svelte 5.57 (runes), plus React 19.3 islands |
| CSS | Tailwind 4.3.3 via `@tailwindcss/vite` — **CSS-first config, no `tailwind.config.js`** |
| Animation | None (CSS keyframes + IntersectionObserver). GSAP is **not** installed. |
| Hosting | Cloudflare Pages project `catredlab` |
| App storage | Cloudflare R2 bucket `catredlab-vectorcraft` |
| Domains | `catredlab.site` (production), `development.catredlab.pages.dev` (preview) |

```bash
bun install
bun run dev        # vp dev --host 0.0.0.0 --port 5199  → http://localhost:5199
bun run build      # vp build  → dist/
bun run preview    # vp preview
```

`vite.config.js` sets host/port for dev and preview and allows the dev host
`catred.motmot-kanyu.ts.net`; add your PC's LAN/tailnet hostname there only if
you need to hit the dev server from another device. The same file also carries
Vite+ `fmt`/`lint` config — do not strip it back to plain Vite without a reason.

---

## 4. Repository map

```text
.
├── index.html                 # shell, fonts, SEO/OG/JSON-LD
├── package.json               # scripts (vp) + deps
├── vite.config.js             # Vite+ config; plugins tailwind → react → svelte
├── svelte.config.js           # intentionally empty (plain Vite, NOT SvelteKit)
├── jsconfig.json              # checkJs; no TypeScript files
├── AGENTS.md                  # short cross-harness brief
├── CLAUDE.md                  # Claude Code entry point (+ per-folder files)
├── HANDOFF.md                 # this file
├── DESIGN.md                  # current design system (impeccable schema)
├── PRODUCT.md                 # product/users/positioning brief
├── .agents/
│   ├── CLAUDE.md              # ECC folder rules
│   ├── DESIGN.md              # older brief (partly stale — §6.4)
│   ├── rules/                 # 122 ECC rule files (mostly other languages)
│   ├── skills/                # bun-runtime, frontend-a11y, react-patterns, vite-patterns
│   └── ecc-install-state.json # generated elsewhere; paths do not exist here
├── public/
│   ├── CLAUDE.md              # production-artifact rules
│   ├── _worker.js             # Pages advanced-mode worker: /app/* → R2
│   ├── 404.html               # 404 + instant redirect home (SPA opt-out)
│   ├── robots.txt, sitemap.xml
│   ├── dummy/*.svg            # 6 placeholder artworks
│   ├── favicon.svg
│   └── icons.svg              # currently unused
└── src/
    ├── CLAUDE.md              # source-tree rules
    ├── main.js                # mounts Svelte, adds html.js
    ├── app.css                # Tailwind import, tokens, all component classes
    ├── App.svelte             # variant switcher (V4 default, V5–V8)
    ├── lib/
    │   ├── CLAUDE.md          # shared-primitive contracts
    │   ├── tokens.css         # palette + fonts + radius
    │   ├── data.js            # studio, services, works, pipeline, img()
    │   ├── reveal.js          # IntersectionObserver reveal helper
    │   ├── VariantSwitch.svelte # fixed Version dropdown
    │   └── ReactMount.svelte  # mounts a React component inside Svelte
    ├── react/
    │   ├── CLAUDE.md          # island rules
    │   ├── Marquee.jsx        # CONCEPT - MODEL - CAD - PRINT strip
    │   ├── ContactForm.jsx    # mailto form
    │   └── TickStrip.jsx      # unused
    └── variants/
        ├── CLAUDE.md          # variant rules; V4 is default
        ├── F.svelte           # V1 — retired Manifesto page
        ├── V2.svelte          # retired press-proof alternate
        ├── V3.svelte + v3/    # retired Thread Machine alternate
        ├── V4.svelte          # DEFAULT — Glass studio
        ├── V5.svelte          # Atelier index
        ├── V6.svelte          # Kinetic signal
        ├── V7.svelte          # Specimen shelf
        ├── V8.svelte          # Studio OS
        └── _archive/A–E.svelte # local-only, gitignored
```

**Ignore rules:** `node_modules`, `dist`, `src/variants/_archive/`, `.impeccable/`
(local Impeccable runtime state and screenshots). `.remember/` ignores itself.
`.agents/` **is** committed now — it is the shared AI-contributor rule set.

---

## 5. The page — variant switcher (`src/App.svelte`)

`App.svelte` renders one of five variants plus a fixed Version dropdown:

| Key | Component | Identity |
|---|---|---|
| `v4` (default) | `V4.svelte` | **Glass studio** — dark glass nav, studio-console stage switcher, bento sections, sticky pipeline |
| `v5` | `V5.svelte` | **Atelier index** — light editorial index, dark toggle |
| `v6` | `V6.svelte` | **Kinetic signal** — light, motion-led passes, dark toggle |
| `v7` | `V7.svelte` | **Specimen shelf** — light catalogue/specimen rows, dark toggle |
| `v8` | `V8.svelte` | **Studio OS** — solid dark, fixed rail, discipline index, process ledger, no glass |

V1 (`F.svelte`, Manifesto), V2 (press proof) and V3 (Thread Machine) remain in
source but are no longer imported. `_archive/` is local-only and gitignored.

Selection order: `?view=v4…v8` → localStorage `catred:variant` → default `v4`.
Changing the select rewrites `?view=` and keeps the current section anchor when
one exists (`services` ↔ `plates` mapping); otherwise it scrolls to top.

Each variant is self-contained (markup + runes + scoped styles) and consumes
`data.js` + the shared tokens. No variant imports another. The switcher is a
**development affordance** — pick one variant before promoting to `main`.

### 5.1 React islands

`ReactMount.svelte` creates a React root in `onMount`, renders once with static
props, and unmounts on destroy. The host element uses `display: contents`.
If a React island ever needs reactive props from Svelte, this wrapper must be
extended — currently it deliberately renders once.

### 5.2 Reveal system

`reveal.js` observes every `.rv` element and adds `.in` when it enters view.
`app.css` hides `.rv` **only** under `html.js` (set in `main.js`), so no-JS and
reduced-motion users see all content. Variants call `reveal(root)` from
`onMount`; several do not return its cleanup (minor, page-lifetime only).

---

## 6. Design system

### 6.1 Tokens — `src/lib/tokens.css`

| Token | Value | Use |
|---|---|---|
| `--red` | `#ED2224` | logo, single vivid accent |
| `--red-deep` | `#b90f11` | CTA/band surfaces, AA on paper |
| `--navy` | `#12103A` | dark page base/footer |
| `--indigo` | `#1B1464` | dark surfaces, text on light |
| `--violet` | `#5B2C8C` | cards, mid layers |
| `--paper` | `#F6F4EE` | light bg, text on dark |
| `--ink` | `#141233` | body text on light |
| `--line-dark` | `#2C2670` | hairlines on dark |
| `--line-light` | `#D8D3C4` | hairlines on light |
| `--font-display` | Archivo Black | headlines only |
| `--font-body` | Space Grotesk | body |
| `--font-mono` | Space Mono | labels, tags, captions |
| `--rad` | `4px` | everything |

`app.css` imports Tailwind **then** tokens, and mirrors colors/fonts in
`@theme` so Tailwind utilities can use them. If you add a token, add it in both
places. Never redeclare the palette inside a variant.

Tailwind's automatic source detection is explicitly told to ignore markdown:
`@source not "../**/*.md";`. Keep that line — otherwise every `AGENTS.md`,
`HANDOFF.md`, `CLAUDE.md` and `.agents/rules/*.md` gets scanned and prose/code
samples emit stray utilities (CSS grew 21.6 → 24.6 kB when that happened).

### 6.2 Current rules (root `DESIGN.md`)

- One accent per surface; red is the thread, used sparingly.
- Brand radius 4 px. Exceptions are deliberate and documented: V4's 16 px glass
  panels, V7's up-to-6 px plinth frames. Do not impose 4 px on those.
- Depth is variant-specific: flat in V1–V3/V5/V6, soft shadows in V7, glass only
  in V4, solid panels in V8. No purple mesh, no generic three-equal-cards.
- Copy must be specific (name deliverables, not "solutions"); no fabricated
  clients, quotes, prices or benchmarks.
- Responsive to 360 px, keyboard-focusable controls, alt text, reduced motion.
- One self-contained file per variant, styles in `<style>` or shared `.m-*`.

### 6.3 Motion

Reduced motion is handled globally in `app.css` (`animation/transition: none`)
and guarded in JS where needed (reveal, rail scroll). Keep it that way.

### 6.4 ⚠️ Two design docs — which one wins

- **`DESIGN.md` (root) is current.** It documents V1–V8, the 4 px brand radius
  with the V4 glass (16 px) and V7 plinth (≤6 px) exceptions, motion, search and
  accessibility. Use it for visual decisions.
- **`.agents/DESIGN.md` is the older A–D brief.** Brand constants still hold
  (palette, type, flat poster language), but it is stale on variants (A–D), on
  GSAP (never installed) and on its absolute "no gradients" rule (retired V1/F
  used a brand wash; V4 is explicitly glass).
- Do not "restore" GSAP or purge glass/gradients because the old brief says so.
  If the two docs conflict, root `DESIGN.md` + the variant's own direction
  contract win; update `.agents/DESIGN.md` only when the intent is confirmed.

---

## 7. Content model — `src/lib/data.js`

| Export | Shape | Notes |
|---|---|---|
| `studio` | `{ name, full, domain, email, instagram, tagline, location }` | `tagline` is currently unused (H1 is hardcoded). |
| `services` | 4 × `{ id, index, title, tag, desc, img }` | `img` is a filename under `public/dummy/`. |
| `works` | 6 × `{ title, type, img }` | Caption is `title / type`. |
| `pipeline` | 5 × `{ step, note, icon, body }` | `icon` is one of `search`, `nodes`, `cube`, `gear`, `layers`, rendered by the `stepIcon` snippet. |
| `img(f)` | `(filename) => "/dummy/" + filename` | Single place to change the asset path. |

All six artworks are placeholder SVGs. Replacing them with real work is the
biggest content gap. Keep filenames or update `data.js`.

`ContactForm.jsx` hardcodes `hello@catred.web.id` instead of importing
`studio.email` — one duplication to clean up if the address changes.

---

## 8. Build output

Current `bun run build` on `development` (five variants):

```
dist/index.html                 2.67 kB │ gzip:  0.90 kB
dist/assets/index-*.css       123.71 kB │ gzip: 21.34 kB
dist/assets/index-*.js        115.57 kB │ gzip: 36.04 kB
✓ built in ~3.2s
```

This no longer matches production's asset hashes — production is the old
variant-F build. That is expected. The `@source not "../**/*.md"` guard in
`app.css` still keeps agent docs out of Tailwind's scan.

`public/` is copied verbatim into `dist/`, including `_worker.js` and
`404.html`. `dist/` is gitignored — never commit it, never hand-edit it
(it is wiped on every build).

---

## 9. Deployment

### 9.1 Branch model and deploy commands

```
main        → production  → https://catredlab.site
development → preview     → https://development.catredlab.pages.dev
```

**Preview (default for all development work):**

```bash
bun run build
bunx wrangler pages deploy dist --project-name catredlab --branch development
# → https://development.catredlab.pages.dev
# → also a unique https://<hash>.catredlab.pages.dev
# → catredlab.site is NOT touched
```

**Production (only when promoting):**

```bash
git switch main
git merge --ff-only development     # or rebase, per the promotion you want
bun run build
bunx wrangler pages deploy dist --project-name catredlab --branch main
# → https://catredlab.site
```

- Pages project: `catredlab`, production branch `main`, **direct upload**.
  A deployment whose `--branch` is not `main` is a preview; it cannot update the
  apex domain.
- Preview deployments receive the same `VECTORCRAFT` R2 binding, so
  `/app/<name>/` works on the preview host too (verified in the project config).
- Account: `fe83e236f156bc697062d8ac99d718b0` (not a secret; confirm in dashboard).
- Zone: `catredlab.site`, id `069ae364337f88793caaac321a128e83`.
- Auth: `CLOUDFLARE_API_TOKEN` in the environment. On the home box it is sourced
  from `~/.hermes/profiles/sisyphus/.env`. **Never commit a token.** On the PC,
  create your own token with Pages:Edit (+ R2:Edit if you upload app files).
- `wrangler` is not installed globally; `bunx wrangler …` is the intended path.

> Note: the root `CLAUDE.md` still carries an older one-line deploy example with
> `--branch main`. This section and the branch table in §2.1 are authoritative:
> `development` → preview, `main` → production.

### 9.2 The Worker — `public/_worker.js`

Pages "advanced mode": the file ships in the output root and is the only
server-side code. It must stay in `public/` and must keep the default-export
module-worker shape.

Logic:

1. Match `^/(?:app/)?(vectorcraft|effectcraft|filmcraft|photocraft)(?:/(.*))?$`.
2. No match → `env.ASSETS.fetch(request)` (normal Pages static serving).
3. Legacy `/vectorcraft` → 308 `/app/vectorcraft/`; missing trailing slash →
   308 with slash.
4. Empty path or trailing slash → append `index.html`.
5. Fetch `env.VECTORCRAFT.get("<app>/<rest>")` from R2.
6. Missing object → `404 "Not found"` with **`cache-control: no-store`**.
7. Headers: copy R2 `httpMetadata`, set `etag`, `nosniff`; `index.html` is
   `no-cache`, hashed assets are `public, max-age=31536000, immutable`.

The binding is named `VECTORCRAFT` even though the bucket holds all four apps —
confusing but intentional. Bucket: `catredlab-vectorcraft`, one prefix per app.

The binding is **not** created by `wrangler pages deploy`. It was patched onto
the project via the Cloudflare API:

```bash
curl -X PATCH -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"deployment_configs":{"production":{"r2_buckets":{"VECTORCRAFT":{"name":"catredlab-vectorcraft"}}},"preview":{"r2_buckets":{"VECTORCRAFT":{"name":"catredlab-vectorcraft"}}}}}' \
  "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects/catredlab"
```

### 9.3 Why R2 at all

Every craft app's `.wasm` exceeds Cloudflare Pages' **25 MiB per-asset cap**
(89.3 / 71.6 / 48.2 / 13.9 MB uncompressed). They cannot live in `dist/`.
R2 has no such cap and keeps `httpMetadata`, so the browser receives the right
MIME type. Do not try to move the apps into the Pages bundle.

### 9.4 The 404 trap (already fixed — do not regress)

Cloudflare Pages assumes SPA mode when there is no top-level `404.html`: every
unknown path returns the landing page with HTTP 200 while the URL keeps the
bogus path (soft 404, indexable). `public/404.html` is the documented opt-out:
Pages serves it with HTTP 404, and it instantly redirects home.

Also learned the hard way: Cloudflare's edge caches by extension with a 4 h
default TTL **regardless of status code**. A missing `.js` that returned 404 got
pinned at the edge even after upload. That is why the worker's missing-object
response sets `cache-control: no-store`. **Do not remove that header.**

If the site ever gains a client-side router, delete `404.html` and add
`_redirects` (`/* /index.html 200`) instead — leaving the 404 redirect in place
would bounce every deep link to `/`.

### 9.5 Verify a deploy

```bash
# preview host
curl -sI https://development.catredlab.pages.dev/ | head -5          # 200
curl -s https://development.catredlab.pages.dev/ | grep -o 'index-[A-Za-z0-9_-]*\.js'

# production must still serve the old build
curl -s https://catredlab.site/ | grep -o 'index-[A-Za-z0-9_-]*\.js'
# expect index-oQHmqk0y.js (unless production was promoted)

# app routing on preview
curl -sI https://development.catredlab.pages.dev/app/vectorcraft/ | grep -i '^HTTP\|cache-control'
# 200, cache-control: no-cache

# legacy redirect
curl -sI https://catredlab.site/vectorcraft | grep -i '^HTTP\|^location'
# 308 → https://catredlab.site/app/vectorcraft/

# wasm MIME
curl -sI "https://catredlab.site/app/vectorcraft/$(curl -s https://catredlab.site/app/vectorcraft/ | grep -o 'vectorcraft-web-[^"]*\.wasm' | head -1)" \
  | grep -i '^HTTP\|content-type'
# 200 application/wasm

# 404 behaviour (no -L: the redirect is client-side, status is 404)
curl -s -o /dev/null -w '%{http_code}\n' https://catredlab.site/app/nope/
# 404, cache-control: no-store
```

A Pages deployment's environment is visible in the API:

```bash
curl -s -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects/catredlab/deployments?per_page=5" \
  | jq -r '.result[] | [.created_on, .environment, .deployment_trigger.metadata.branch, .url] | @tsv'
```

Note: local DNS on the home box lies (`*.lab` rewrites). If a probe looks
wrong, pin the edge with `--resolve` and get the IP via Cloudflare DoH.

### 9.6 Rollback

Pages keeps every deployment: dashboard → Deployments → previous → *Rollback*.
A bad preview is isolated — just deploy `development` again or ignore it.
Production rollback uses the same dashboard action on a production deployment.
Deploy is manual either way.

---

## 10. The four craft apps (R2 side)

These are third-party releases, not source in this repo:

| App | Upstream release | wasm (uncompressed) |
|---|---|---|
| VectorCraft | `storytold/vectorcraft` v0.21.1 | 89.3 MB |
| EffectCraft | `storytold/effectcraft` v0.21.1 | 71.6 MB |
| FilmCraft | `storytold/filmcraft` v0.17.1 | 48.2 MB |
| PhotoCraft | `storytold/photocraft` v0.20.2 | 13.9 MB (split) |

Upload pattern:

```bash
APP=vectorcraft
SRC=/path/to/unzipped/vectorcraft

upload() {
  f="$1"
  key="$APP/${f#"$SRC"/}"
  bunx wrangler r2 object put "catredlab-vectorcraft/$key" \
    --file "$f" --content-type "$(file --mime-type -b "$f")"
}
export -f upload; export APP SRC

# one object per file; wrangler is slow per invocation → 6 in parallel
find "$SRC" -type f -print0 | xargs -0 -P 6 -I{} bash -c 'upload "$@"' _ {}
```

Content types matter: `application/wasm`, `text/javascript`, `font/ttf`,
`image/svg+xml`, etc. R2 preserves them; a wrong type makes the app fail to
load.

Known upstream bug: **PhotoCraft v0.20.2** imports
`./snippets/eframe-*/inline0.js` from `app/photocraft-web.js`, i.e.
`photocraft/app/snippets/…`, but the zip only ships `snippets/…` at the root.
The workaround already applied in R2: copy the root snippet to
`photocraft/app/snippets/eframe-d31a8450ea12dfc1/inline0.js`. Re-check this on
every PhotoCraft upgrade and report it upstream.

None of the four apps are linked from the landing page yet. That is a product
decision, not an oversight to silently "fix".

---

## 11. Known issues / tech debt

| Priority | Issue | Detail |
|---|---|---|
| **P1** | Variant switcher must not ship to production as-is | Five variants ship in one bundle and the fixed Version dropdown is visible to visitors. Pick the production variant (V4 is default) and remove/disable the switcher and retired variants before promoting to `main`. |
| **P1** | Content is placeholder | All six artworks are dummy SVGs; quote sections are placeholders; contact is `mailto:` only. Not launch-ready content-wise. |
| **P1** | Variant drift | V4–V8 duplicate the same sections/data independently. Copy or structural fixes must be applied per variant, or consolidated into shared components. V1–V3 are retired dead weight (~2.6k lines) kept only for reference. |
| **P2** | Bundle size | One bundle carries all five variants: ~123.7 kB CSS / 115.6 kB JS (21.3 / 36.0 kB gzip). If the switcher stays, lazy-load variants with dynamic `import()`. |
| **P2** | Domain mismatch | `index.html`, `robots.txt`, `sitemap.xml` and `data.js` now use `catred.web.id`; the 404 page and hosting use `catredlab.site`. Decide the canonical public domain before SEO is indexed. |
| **P2** | `reveal()` cleanup not returned | Several variants call `reveal(root)` without returning its cleanup; observer lives for the page lifetime. Minor. |
| **P2** | `.agents/` is bloated | 122 rule files (720 KB) committed intentionally for AI contributors. Relevant: `common-*`, `web-*`, `react-*`, `typescript-*`. The rest is language noise; prune when convenient. |
| **P3** | Dead code/assets | `src/react/TickStrip.jsx` and `public/icons.svg` are unused; V2/V3 retired; ECC install-state paths point at another machine. |
| **P3** | Vite+ migration is fresh | `vp build` passes and `vp dev` is wired, but no CI/lint gate runs `vp lint` or `vp fmt --check`. Add only if the team wants it. |
| **P3** | `.impeccable/` is local state | Hook cache, screenshots and seeds; now gitignored. Never commit. |

---

## 12. Suggested next tasks (in order)

1. **Choose the production variant** — review V4–V8 on the preview host, pick one,
   then remove/disable the Version switcher and retired variants before promoting.
   *Acceptance:* production build renders one variant only; no `?view=` UI.
2. **Replace placeholder content** — real work images + real client quotes.
   *Acceptance:* no dummy SVGs in `works`; quote sections have real copy.
3. **Resolve the canonical domain** — `catred.web.id` vs `catredlab.site` across
   `index.html`, `sitemap.xml`, `robots.txt`, `data.js`, `404.html`, docs.
4. **If the switcher stays on dev longer** — lazy-load V5–V8 with dynamic
   imports to cut the preview bundle; keep V4 eager as the default.
5. **Optional: link the craft apps** — nav/footer "Tools" entry to `/app/<name>/`.
6. **Cleanup** — drop retired V2/V3 and unused `TickStrip`/`icons.svg`, prune
   `.agents/` to the rules actually used.

Promotion: `git switch main && git merge --ff-only development`, build, deploy
with `--branch main` (see §9.1). Do not add test/lint frameworks unless the user
asks; `bun run build` is the contract.

---

## 13. Guardrails — do not

- Deploy `development` with `--branch main`, or run the production deploy command
  while the variant experiment is live. Preview only until promotion is explicit.
- Ship the Version switcher to production as-is; pick one variant first.
- Commit `dist/`, `node_modules/`, `.remember/`, `src/variants/_archive/`, or
  `.impeccable/`.
- Commit tokens, `.env`, Cloudflare credentials, or the account API key.
- Rewrite git history, or push `main`, without an explicit order.
- Move `_worker.js` out of `public/`, rename the `VECTORCRAFT` binding, or
  change the R2 bucket.
- Remove `cache-control: no-store` from the worker's 404 response.
- Add a client-side router / SvelteKit without also replacing the `404.html`
  strategy (§9.4).
- Add `tailwind.config.js` — Tailwind 4 is configured in `app.css` via `@theme`.
- Redeclare palette tokens inside a variant.
- Add GSAP because the old brief mentions it.
- Delete `.agents/`, `AGENTS.md`, `CLAUDE.md` or `HANDOFF.md` — they are the
  shared AI-contributor context and are intentionally committed.
- Touch sibling infrastructure (`work.catredlab.site` AFFiNE, `api.catredlab.site`
  9Router, Caddy, DNS). Out of scope for this repo.

---

## 14. Verification checklist for any change

```bash
bun run build                 # must pass; note new warnings
bun run preview               # smoke-test at 360 px and desktop
```

Manual checks:

- [ ] 360 px width: no horizontal overflow, nav usable, process rail scrolls.
- [ ] Keyboard: nav/CTAs/rail/switcher reachable; focus ring visible.
- [ ] Reduced motion: marquee, reveals, stage transitions all stop.
- [ ] Version switcher: every `?view=v4…v8` renders; selection survives reload;
      section anchor is preserved where the target exists.
- [ ] Light/dark toggles (V5–V7) work and persist per variant.
- [ ] Contact form: submit opens a mail client with email + details prefilled.
- [ ] Images: alt text present and meaningful.
- [ ] Preview deploy: `/`, `?view=v8`, `/app/<name>/`, and a bogus path all behave.
- [ ] After deploy, production `catredlab.site` still serves the old bundle
      (`index-oQHmqk0y.js`) and is untouched.

---

## 15. Open questions for Master Manz

1. **Which variant becomes production?** — V4 is the default; V5–V8 are
   alternates. The switcher itself is dev-only.
2. **Canonical domain** — `catred.web.id` (current SEO/data copy) or
   `catredlab.site` (hosting/404)? Pick one before indexing.
3. **Craft apps on the landing page?** — add a Tools/Apps section or keep them
   reachable only by direct URL?
4. **Content timeline** — when do real artworks and client quotes land?
5. **Promotion trigger** — stay on the preview host until the variant is chosen,
   or promote a specific one now?

Resolved: `.agents/` and the AI contributor docs are intentionally committed
(per Master Manz, 2026-11-25).

---

## 16. Setting up on the PC

1. Install **Bun** (≥ 1.3) — <https://bun.sh>. Node 24 also works, but the repo
   is bun-first.
2. `git clone https://github.com/achrllrogia45/catred-lab.git`
   then `git switch development` for the variant work (`main` = production).
3. `cd catred && bun install`
4. `bun run dev` → <http://localhost:5199>
5. `bun run build` → must pass before any commit.
6. For preview deploys, set `CLOUDFLARE_API_TOKEN` in your shell (never in the
   repo), then:
   ```bash
   bunx wrangler pages deploy dist --project-name catredlab --branch development
   ```
   This updates only <https://development.catredlab.pages.dev>. Do not pass
   `--branch main` unless you are deliberately promoting to production.
7. Claude Code: open the repo, let it read `CLAUDE.md` → `HANDOFF.md`. It will
   auto-load the nearest nested `CLAUDE.md` when editing files in `src/`,
   `src/lib/`, `src/react/`, `src/variants/`, `public/` or `.agents/`. No need to
   paste them manually. Windows works natively with Bun; if a path/tooling issue
   appears, WSL is the fallback.

---

## 17. Appendix — verified facts

Checked on 2026-11-25 from the home box:

- `development` branch committed (`6af3dc7`) and pushed to
  `origin/development`.
- `bun run build` → success, 125 modules, ~3.2 s, no warnings. Output:
  `index-C4smuN-A.css` (123.71 kB) + `index-CpiivYb-.js` (115.57 kB).
- Preview deployment `c921a9fa-9764-4559-8e99-cb1ac05e1def`, environment
  **preview**, branch `development`, commit `6af3dc7`, created
  2026-11-25T05:19:08Z: <https://c921a9fa.catredlab.pages.dev> · alias
  <https://development.catredlab.pages.dev>. (The earlier `fbdb5a39` preview is
  superseded.)
- Preview alias returns HTTP 200 and serves the new bundle; all five variant
  markers (`Glass studio`, `Atelier index`, `Kinetic signal`, `Specimen shelf`,
  `Studio OS`) are present in the JS bundle.
- Preview `/app/vectorcraft/` → 200, `cache-control: no-cache` (R2 binding works
  on preview). Preview `/app/nope/` → 404.
- Production `catredlab.site` still returns HTTP 200 with the old bundle
  `index-oQHmqk0y.js` / `index-N-SLJVV2.css`. Production deployment
  `2ebd589e` (2026-11-06) is unchanged.
- Pages API: the new deployment is recorded as `preview`; the project's
  `latest_deployment` field simply points at the newest deployment overall (the
  preview), not at the apex domain. The apex still serves the production
  deployment.
- Git remote was switched from HTTPS to SSH (`git@github.com:…`) because the
  HTTPS token was invalid; SSH auth works.
- Not verified interactively: the headless browser daemon timed out, so the
  variant switcher was verified by bundle markers and build output, not by
  clicking through each view.
