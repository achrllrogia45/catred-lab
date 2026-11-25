# Joyco components — handoff for Claude Code

**Status:** source added, **not wired**. `src/variants/V4.svelte` is untouched.
**Source:** <https://hub.joyco.studio/components> (Scramble, Magnetic).

These are original Svelte 5 ports of the behaviour, not copies. The Joyco
registry repo has no licence file, and this project is Svelte 5 with no GSAP or
React dependency, so adding their React/GSAP files would be wrong on both
counts. No new dependencies.

## Files

| File | What it is |
|---|---|
| `src/lib/Scramble.svelte` | Text-decode effect. Renders real text for AT, animates an `aria-hidden` copy. Respects `prefers-reduced-motion`. Props: `text`, `duration` (seconds, `0` = auto), `chars`, `cycles`, `chance`. |
| `src/lib/magnetic.js` | Svelte action for CTA labels. The hit area stays put; the label drifts toward the pointer and eases back. Only runs on `pointer: fine` and when reduced motion is off. |

Point Claude Code at **this file**; everything it needs is below.

## Integration map — V4 (default variant)

Line numbers are the current `src/variants/V4.svelte`; selectors are the stable
anchors.

### 1. Imports — after line 4

```svelte
import { reveal } from "../lib/reveal.js";
import Scramble from "../lib/Scramble.svelte";
import { magnetic } from "../lib/magnetic.js";
```

### 2. Hero accent word — line 104

Replace:

```svelte
<h1 id="g-h1">We make ideas <span>physical.</span></h1>
```

with:

```svelte
<h1 id="g-h1" aria-label="We make ideas physical.">
  <span aria-hidden="true">We make ideas <span class="g-h1-accent"><Scramble text="physical." duration={0.7} /></span></span>
</h1>
```

Why the wrapper: Svelte scoped CSS cannot see a class passed into a child
component. Styling `.g-h1-accent` on the wrapper avoids the `css_unused_selector`
warning. If the headline copy changes, update `aria-label` to match.

### 3. Console header — line 123

Replace:

```svelte
<span>CATRED / STUDIO CONSOLE</span>
```

with:

```svelte
<Scramble text="CATRED / STUDIO CONSOLE" duration={0.7} />
```

### 4. Stage label — line 162

Replace:

```svelte
<span class="g-stage-label">0{stage + 1} / {stageLabels[stage]}</span>
```

with:

```svelte
<span class="g-stage-label"><Scramble text={`0${stage + 1} / ${stageLabels[stage]}`} duration={0.5} /></span>
```

It replays when `stage` changes because `Scramble` re-runs on `text` changes.

### 5. Magnetic CTA labels — lines 88, 109, 230, 306

Wrap the label, not the link/button. The pill keeps its own hover lift; only the
label moves.

```svelte
<a class="g-nav-cta" href={mail}><span class="g-magnet" use:magnetic>Start a project</span></a>
```

```svelte
<a class="g-btn" href={mail}><span class="g-magnet" use:magnetic>Start a project <span aria-hidden="true">→</span></span></a>
```

```svelte
<a class="g-btn g-btn-sm" href={mail}><span class="g-magnet" use:magnetic>Start a project <span aria-hidden="true">→</span></span></a>
```

```svelte
<button type="submit"><span class="g-magnet" use:magnetic>Send inquiry <span aria-hidden="true">→</span></span></button>
```

### 6. CSS — lines 458, 474, 798

Line 458, replace:

```css
.g-hero h1 span { color: var(--red); }
```

with:

```css
.g-hero h1 .g-h1-accent { color: var(--red); }
```

After line 474 (`.g-btn:hover`), add:

```css
.g-magnet { display: inline-flex; align-items: center; gap: 0.6rem; }
```

After line 798 (`.g-form button:hover`), add:

```css
.g-form button .g-magnet { justify-content: center; }
```

## Where not to use it

- **Do not scramble body copy, the lede, nav links, or form labels.** Readability
  and screen-reader noise beat the effect.
- **One scramble per viewport.** The hero word, console header and stage label
  are already three; do not add it to every card or list row.
- **Do not put `use:magnetic` on text links.** Small hit areas moving under the
  cursor feel broken. Pills and buttons only.
- Magnetic auto-disables on touch and under reduced motion. Scramble shows the
  final string under reduced motion. Do not add manual overrides.

## Other variants

V5–V8 can use the same two primitives. Keep it to a mono label and the primary
CTA; do not bulk-apply without a visual pass. V4 is the current default.

## Verify

```bash
bun run build
```

I temporarily wired the exact V4 changes above: build passed, 127 modules,
zero warnings, `index-BQaYJ3uc.css` + `index-DcUkg_Ah.js`. Then I reverted
`V4.svelte` so the tree is clean for you. The snippets above are the verified
version; apply them and the build should stay warning-free.

Preview only, after you are happy:

```bash
bunx wrangler pages deploy dist --project-name catredlab --branch development
```

## CC prompt

> Read `JOYCO.md` and apply the V4 integration exactly as written. Do not add
> dependencies. Do not touch the other variants. Keep the existing tokens and
> layout. Run `bun run build` and confirm zero Svelte CSS warnings.

## Considered and skipped

| Component | Why not now |
|---|---|
| Typewriter | Body-length text causes layout jump; only worth it for a short console status. |
| Action Hint | Form feedback, but the form opens `mailto:` immediately, so the hint is unseen. |
| Marquee | V4 already has one; one per page. |
| Cluster | Layout system, not an effect; would mean a bento restyle. |
| Image Sequence / Spritesheet Sequencer | Needs frame assets; the console already switches four SVG stills. |
| Mobile Menu / Scroll Area / Infinite List | Utility components, nothing missing in V4. |
| Snake / Brick Breaker / Space Invaders | Off-brand for a studio landing. |
