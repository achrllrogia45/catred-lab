<script>
  import { pipeline } from "../../lib/data.js";

  let { stage = $bindable(0) } = $props();

  const labels = ["Sketch", "Model", "CAD", "Print"];
  const cues = [pipeline[0], pipeline[2], pipeline[3], pipeline[4]].map((p) => p.note);

  /* One gear, rendered four ways — the object resolves, it doesn't change. */
  const TAU = Math.PI * 2;
  const TEETH = 12;
  const R_OUT = 132;
  const R_ROOT = 106;
  const R_BORE = 44;
  const R_HUB = 66;
  const STEP = TAU / TEETH;
  const r2 = (n) => Math.round(n * 100) / 100;
  const pt = (r, a) => [r2(Math.cos(a) * r), r2(Math.sin(a) * r)];

  const teeth = Array.from({ length: TEETH }, (_, i) => {
    const a = i * STEP;
    return [
      pt(R_ROOT, a + STEP * 0.04),
      pt(R_ROOT, a + STEP * 0.26),
      pt(R_OUT, a + STEP * 0.34),
      pt(R_OUT, a + STEP * 0.66),
      pt(R_ROOT, a + STEP * 0.74),
    ];
  });
  const verts = teeth.flatMap((ring) => [ring[2], ring[3]]);
  const gear = `M${teeth.flat().map(([x, y]) => `${x} ${y}`).join("L")}Z`;

  const spokes = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * TAU + TAU / 16;
    return { p1: pt(R_BORE + 14, a), p2: pt(R_ROOT - 8, a) };
  });

  const hexPts = Array.from({ length: 6 }, (_, i) => pt(28, (i / 6) * TAU - Math.PI / 6));
  const hex = `M${hexPts.map(([x, y]) => `${x} ${y}`).join("L")}Z`;
  const screen = ([x, y]) => [r2(260 + x), r2(212 + y * 0.56)];
  const vertsScreen = verts.map(screen);
  const hexScreen = hexPts.map(screen);

  /* One continuous CAT-THREAD: off-canvas left, loops the hub, exits right. */
  const THREAD =
    "M -24 304 C 58 312 114 290 172 270 C 214 256 232 236 252 232 C 286 225 300 246 284 260 C 264 277 238 260 246 240 C 254 220 286 216 312 228 C 344 243 358 260 394 248 C 442 232 480 198 544 188";
</script>

<section class="ts-root" data-stage={stage} aria-label="Process: concept to printed object">
  <header class="ts-head">
    <span class="ts-kicker"><i class="ts-dot" aria-hidden="true"></i>CAT-THREAD / STAGE MACHINE</span>
    <span class="ts-headright">CONCEPT → PRINTED OBJECT</span>
  </header>

  <div class="ts-body">
    <div class="ts-stage">
      <svg viewBox="0 0 520 430" aria-hidden="true" focusable="false">
        <defs>
          <pattern id="ts-grid" width="26" height="26" patternUnits="userSpaceOnUse">
            <path d="M26 0H0v26" fill="none" stroke="var(--line-dark)" stroke-width=".6" />
          </pattern>
          <pattern id="ts-dots" width="7" height="7" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.05" fill="var(--red)" />
          </pattern>
        </defs>

        <rect class="ts-grid-bg" width="520" height="430" fill="url(#ts-grid)" />
        <path class="ts-crop" d="M20 38V20h18M482 20h18v18M20 392v18h18M500 392v18h-18" />
        <text class="ts-tag" x="34" y="54">ASSY.12 / GEAR + BOLT</text>
        <text class="ts-tag" x="486" y="54" text-anchor="end">Ø264 / 12T</text>

        <!-- 0 / SKETCH -->
        <g class="ts-layer ts-sketch">
          <g transform="translate(260 212) scale(1 .56)">
            <circle class="ts-sk-cons" r="150" />
            <circle class="ts-sk-cons" r="92" />
            <path class="ts-sk-c" d="M-158 0H158M0 -158V158" />
            <path class="ts-sk" d={gear} />
            <path class="ts-sk ts-sk-ghost" d={gear} transform="rotate(1.6) translate(3 -2)" />
            <path class="ts-sk-h" d="M-132 52l26 -14M-120 72l26 -14M-106 90l26 -14M92 96l26 -14M108 78l26 -14M-100 -92l24 12M-116 -74l24 12M96 -90l24 12" />
          </g>
        </g>

        <!-- 1 / MODEL -->
        <g class="ts-layer ts-model">
          <g transform="translate(260 212) scale(1 .56)">
            <path class="ts-wire-ghost" d={gear} transform="translate(0 -18)" />
            <circle class="ts-wire-ghost" r={R_BORE} transform="translate(0 -18)" />
            <line class="ts-wire-ghost" x1={-R_OUT} y1="0" x2={-R_OUT} y2="-18" />
            <line class="ts-wire-ghost" x1={R_OUT} y1="0" x2={R_OUT} y2="-18" />
            <path class="ts-wire" d={gear} />
            <circle class="ts-wire" r={R_BORE} />
            <circle class="ts-wire" r={R_HUB} />
            <path class="ts-wire" d={hex} />
            {#each spokes as s}
              <line class="ts-wire ts-wire-thin" x1={s.p1[0]} y1={s.p1[1]} x2={s.p2[0]} y2={s.p2[1]} />
            {/each}
          </g>
          <line class="ts-center" x1="30" y1="212" x2="490" y2="212" />
          <line class="ts-center" x1="260" y1="120" x2="260" y2="306" />
          {#each vertsScreen as v}
            <circle class="ts-vert" cx={v[0]} cy={v[1]} r="3" />
          {/each}
          {#each hexScreen as h}
            <rect class="ts-vert ts-vert-sq" x={h[0] - 2} y={h[1] - 2} width="4" height="4" />
          {/each}
        </g>

        <!-- 2 / CAD -->
        <g class="ts-layer ts-cad">
          <g transform="translate(260 212) scale(1 .56)">
            <circle class="ts-cad-ghost" r="150" />
            <path class="ts-cad-ghost" d={gear} />
            <circle class="ts-cad-ghost" r={R_BORE} />
            <path class="ts-cad-ghost" d={hex} />
          </g>
          <g class="ts-dim">
            <path d="M128 292v58M392 292v58" />
            <path class="ts-dim-key" d="M132 336h256M132 330v12M388 330v12" />
            <text class="ts-anno ts-anno-red" x="260" y="360" text-anchor="middle">Ø264.0</text>
            <path d="M398 140h62M398 286h62M446 146v134M440 146h12M440 280h12" />
            <text class="ts-anno" x="466" y="212" text-anchor="middle" transform="rotate(-90 466 212)">146.0</text>
            <path d="M292 238l54 62h48M234 212h52M260 186v52" />
            <text class="ts-anno" x="398" y="304">Ø88 BORE</text>
            <text class="ts-anno ts-anno-red" x="34" y="70">12T / MOD 2</text>
            <text class="ts-anno" x="486" y="70" text-anchor="end">R132.0</text>
            <text class="ts-anno" x="34" y="392">TOL ±0.2</text>
            <text class="ts-anno" x="486" y="392" text-anchor="end">DATUM A</text>
          </g>
        </g>

        <!-- 3 / PRINT -->
        <g class="ts-layer ts-print">
          <g transform="translate(260 212) scale(1 .56)">
            <path class="ts-print-shadow" d={gear} transform="translate(7 9)" />
            <path class="ts-print-body" d={gear} />
            <path class="ts-print-dots" d={gear} />
            <circle class="ts-print-ring" r={R_HUB + 4} />
            <circle class="ts-print-bore" r={R_BORE} />
            <path class="ts-print-bolt" d={hex} />
            <circle class="ts-print-pin" r="8" />
          </g>
        </g>

        <path class="ts-thread" d={THREAD} />
        <circle class="ts-knot" cx="268" cy="244" r="4.2" />
      </svg>
    </div>

    <div class="ts-meta">
      {#key stage}
        <div class="ts-facts">
          <p class="ts-count">
            <span class="ts-num">0{stage + 1}</span>
            <span class="ts-slash" aria-hidden="true">/</span>
            <span class="ts-word">{labels[stage].toUpperCase()}</span>
          </p>
          <p class="ts-note">{cues[stage]}</p>
        </div>
      {/key}
      <p class="ts-hint" aria-hidden="true">DRAG · ARROW KEYS</p>
    </div>
  </div>

  <div class="ts-control">
    <div class="ts-track">
      <div class="ts-nodes" aria-hidden="true">
        <span class="ts-node"></span>
        <span class="ts-node"></span>
        <span class="ts-node"></span>
        <span class="ts-node"></span>
      </div>
      <input
        class="ts-range"
        type="range"
        min="0"
        max="3"
        step="1"
        bind:value={stage}
        aria-label="Concept to object stage"
        aria-valuetext={labels[stage]}
      />
    </div>
    <div class="ts-marks" aria-hidden="true">
      {#each labels as label, i}
        <span class="ts-mark" class:ts-on={stage === i}>{label.toUpperCase()}</span>
      {/each}
    </div>
  </div>
</section>

<style>
  .ts-root {
    box-sizing: border-box; width: 100%; padding: clamp(14px, 2.2vw, 28px);
    color: var(--paper);
    background: color-mix(in srgb, var(--navy) 58%, transparent);
    -webkit-backdrop-filter: blur(22px) saturate(1.3);
    backdrop-filter: blur(22px) saturate(1.3);
    border: 1px solid rgb(246 244 238 / 0.12); border-radius: var(--rad);
    box-shadow: 0 40px 90px rgb(0 0 0 / 0.45), inset 0 1px 0 rgb(246 244 238 / 0.1);
    font-family: var(--font-body); overflow: hidden;
  }

  .ts-head {
    display: flex; justify-content: space-between; align-items: baseline; gap: 16px;
    padding-bottom: 10px; border-bottom: 1px solid var(--line-dark);
    font-family: var(--font-mono); font-size: 10px; letter-spacing: .16em;
    color: color-mix(in srgb, var(--paper) 66%, transparent);
  }
  .ts-kicker { display: inline-flex; align-items: center; gap: 9px; }
  .ts-dot { width: 7px; height: 7px; background: var(--red); border-radius: 50%; flex: none; }
  .ts-headright { text-align: right; }

  .ts-body {
    display: grid; grid-template-columns: minmax(0, 1fr);
    gap: clamp(14px, 2.5vw, 22px); align-items: start;
    margin-top: clamp(12px, 2vw, 22px);
  }
  .ts-stage {
    position: relative; aspect-ratio: 520 / 380;
    background: var(--ink); border: 1px solid var(--line-dark);
    border-radius: var(--rad); overflow: hidden;
  }
  .ts-stage svg { display: block; width: 100%; height: 100%; }
  .ts-grid-bg { opacity: .5; }
  .ts-crop { fill: none; stroke: var(--paper); stroke-opacity: .28; stroke-width: 1; }
  .ts-tag {
    font-family: var(--font-mono); font-size: 9px; letter-spacing: .1em;
    fill: var(--paper); fill-opacity: .65;
  }

  .ts-meta {
    display: grid; grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: end; gap: 0.9rem;
    min-width: 0; padding-top: 10px;
    border-top: 1px solid var(--line-dark);
  }
  .ts-facts {
    display: flex; flex-wrap: wrap; align-items: baseline; gap: 1rem;
    animation: ts-rise .45s cubic-bezier(.2, .7, .2, 1) both;
  }
  .ts-count {
    display: flex; align-items: baseline; gap: 8px;
    margin: 0; font-family: var(--font-mono);
  }
  .ts-num {
    font-family: var(--font-display); font-size: clamp(42px, 5.2vw, 60px);
    line-height: .82; letter-spacing: -.02em; color: var(--paper);
  }
  .ts-slash { font-size: 15px; color: var(--red); }
  .ts-word { font-size: 11px; letter-spacing: .2em; color: var(--paper); }
  .ts-note {
    max-width: 42ch; margin: 0;
    font-family: var(--font-mono); font-size: 12px; line-height: 1.6; letter-spacing: .01em;
    color: color-mix(in srgb, var(--paper) 76%, transparent);
  }
  .ts-hint {
    margin: 0; justify-self: end; font-family: var(--font-mono); font-size: 9px;
    letter-spacing: .16em; color: color-mix(in srgb, var(--paper) 60%, transparent);
  }

  .ts-control { margin-top: clamp(12px, 2vw, 20px); }
  .ts-track { position: relative; height: 34px; }
  .ts-nodes { position: absolute; inset: 0; pointer-events: none; }
  .ts-node {
    position: absolute; top: 50%; width: 8px; height: 8px; margin: -4px 0 0 -4px;
    background: var(--navy); border: 2px solid var(--red); border-radius: 50%;
  }
  .ts-node:nth-child(1) { left: 8px; }
  .ts-node:nth-child(2) { left: 33.333%; }
  .ts-node:nth-child(3) { left: 66.666%; }
  .ts-node:nth-child(4) { left: auto; right: 4px; }

  .ts-range {
    position: absolute; inset: 0; width: 100%; height: 100%; margin: 0;
    background: transparent; -webkit-appearance: none; appearance: none;
    cursor: pointer; border-radius: var(--rad);
  }
  .ts-range::-webkit-slider-runnable-track { height: 2px; background: var(--red); border-radius: 2px; }
  .ts-range::-moz-range-track { height: 2px; background: var(--red); border-radius: 2px; }
  .ts-range::-webkit-slider-thumb {
    -webkit-appearance: none; width: 16px; height: 16px; margin-top: -7px;
    background: var(--navy); border: 2px solid var(--red); border-radius: 50%;
    box-shadow: 0 0 0 3px var(--navy);
    transition: background .2s ease, transform .2s ease;
  }
  .ts-range::-moz-range-thumb {
    width: 16px; height: 16px; background: var(--navy);
    border: 2px solid var(--red); border-radius: 50%;
    box-shadow: 0 0 0 3px var(--navy);
    transition: background .2s ease, transform .2s ease;
  }
  .ts-range:hover::-webkit-slider-thumb,
  .ts-range:focus-visible::-webkit-slider-thumb,
  .ts-range:hover::-moz-range-thumb,
  .ts-range:focus-visible::-moz-range-thumb { background: var(--red); }
  .ts-range:active::-webkit-slider-thumb,
  .ts-range:active::-moz-range-thumb { transform: scale(1.15); }
  .ts-range:focus-visible { outline: 2px solid var(--red); outline-offset: 5px; }

  .ts-marks {
    position: relative; height: 16px; margin-top: 8px;
    font-family: var(--font-mono); font-size: 10px; letter-spacing: .16em;
  }
  .ts-mark {
    position: absolute; top: 0; transform: translateX(-50%);
    color: color-mix(in srgb, var(--paper) 65%, transparent);
    white-space: nowrap; transition: color .25s ease;
  }
  .ts-mark:nth-child(1) { left: 8px; transform: none; }
  .ts-mark:nth-child(2) { left: 33.333%; }
  .ts-mark:nth-child(3) { left: 66.666%; }
  .ts-mark:nth-child(4) { left: auto; right: 8px; transform: none; }
  .ts-mark.ts-on {
    color: var(--paper);
    text-decoration: underline;
    text-decoration-color: var(--red);
    text-underline-offset: 3px;
  }

  /* ---- the four treatments ------------------------------------------- */
  .ts-layer {
    opacity: 0; transform-box: view-box; transform-origin: 260px 212px;
    transition: opacity .55s ease, transform .55s ease;
  }
  .ts-sketch { transform: scale(1.012); }
  .ts-print { transform: scale(.975); }

  .ts-root[data-stage="0"] .ts-sketch { opacity: 1; transform: none; }
  .ts-root[data-stage="1"] .ts-sketch { opacity: .14; }
  .ts-root[data-stage="2"] .ts-sketch { opacity: .05; }
  .ts-root[data-stage="3"] .ts-sketch { opacity: 0; }
  .ts-root[data-stage="0"] .ts-model { opacity: .1; }
  .ts-root[data-stage="1"] .ts-model { opacity: 1; }
  .ts-root[data-stage="2"] .ts-model { opacity: .2; }
  .ts-root[data-stage="3"] .ts-model { opacity: 0; }
  .ts-root[data-stage="0"] .ts-cad { opacity: 0; }
  .ts-root[data-stage="1"] .ts-cad { opacity: .1; }
  .ts-root[data-stage="2"] .ts-cad {
    opacity: 1;
    animation: ts-spin 70s linear infinite;
    transform-origin: 260px 212px;
  }
  .ts-root[data-stage="3"] .ts-cad { opacity: .14; }
  .ts-root[data-stage="0"] .ts-print,
  .ts-root[data-stage="1"] .ts-print { opacity: 0; }
  .ts-root[data-stage="2"] .ts-print { opacity: .08; }
  .ts-root[data-stage="3"] .ts-print { opacity: 1; transform: none; }

  .ts-layer path, .ts-layer circle, .ts-layer line { vector-effect: non-scaling-stroke; }
  .ts-sk {
    fill: none; stroke: var(--paper); stroke-width: 1.6;
    stroke-dasharray: 9 6 2 5; stroke-linecap: round; stroke-linejoin: round;
    opacity: .85;
  }
  .ts-sk-ghost { opacity: .38; stroke-width: 1.1; }
  .ts-sk-cons { fill: none; stroke: var(--paper); stroke-width: 1; stroke-dasharray: 2 7; opacity: .45; }
  .ts-sk-c { fill: none; stroke: var(--paper); stroke-width: 1; stroke-dasharray: 14 6 2 6; opacity: .45; }
  .ts-sk-h { fill: none; stroke: var(--paper); stroke-width: 1; stroke-dasharray: 8 5; opacity: .5; }

  .ts-wire {
    fill: none; stroke: color-mix(in srgb, var(--violet) 62%, var(--paper));
    stroke-width: 1.4; stroke-linejoin: round;
  }
  .ts-wire-ghost {
    fill: none; stroke: color-mix(in srgb, var(--indigo) 58%, var(--violet));
    stroke-width: 1.2; opacity: .7;
  }
  .ts-wire-thin { stroke-width: .9; opacity: .7; }
  .ts-vert { fill: var(--violet); stroke: var(--paper); stroke-width: 1; }
  .ts-vert-sq { fill: var(--red); stroke: none; }
  .ts-center {
    stroke: var(--red); stroke-width: 1.2;
    stroke-dasharray: 16 6 2 6; opacity: .85;
  }

  .ts-cad-ghost { fill: none; stroke: var(--paper); stroke-width: 1; opacity: .22; }
  .ts-dim path { fill: none; stroke: var(--paper); stroke-width: 1; opacity: .5; }
  .ts-dim .ts-dim-key { stroke: var(--red); stroke-width: 1.4; opacity: .95; }
  .ts-anno {
    font-family: var(--font-mono); font-size: 9px; letter-spacing: .06em;
    fill: var(--paper); fill-opacity: .62;
  }
  .ts-anno-red { fill: var(--red); fill-opacity: .95; }

  .ts-print-shadow { fill: var(--red); }
  .ts-print-body { fill: var(--paper); }
  .ts-print-dots { fill: url(#ts-dots); opacity: .24; }
  .ts-print-ring { fill: none; stroke: var(--red); stroke-width: 6; }
  .ts-print-bore { fill: var(--ink); }
  .ts-print-bolt { fill: var(--red); }
  .ts-print-pin { fill: var(--paper); stroke: var(--ink); stroke-width: 1.5; }

  .ts-thread {
    fill: none; stroke: var(--red); stroke-width: 2.4; stroke-linecap: round;
    opacity: .62; transition: opacity .55s ease;
  }
  .ts-root[data-stage="1"] .ts-thread { opacity: .8; }
  .ts-root[data-stage="3"] .ts-thread { opacity: 1; }
  .ts-knot {
    fill: var(--red); stroke: var(--ink); stroke-width: 2;
    opacity: 0; transition: opacity .55s ease;
  }
  .ts-root[data-stage="3"] .ts-knot { opacity: 1; }

  @keyframes ts-rise {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: none; }
  }
  @keyframes ts-spin {
    to { rotate: 360deg; }
  }

  @media (max-width: 720px) {
    .ts-body { grid-template-columns: 1fr; align-items: start; }
    .ts-meta {
      flex-direction: row; align-items: flex-end; justify-content: space-between;
      gap: 16px; padding: 14px 0 0; border-top: 1px solid var(--line-dark);
      border-left: 0;
    }
    .ts-note { max-width: none; }
    .ts-hint { text-align: right; }
  }
  @media (max-width: 520px) {
    .ts-headright { display: none; }
    .ts-meta { flex-direction: column; align-items: flex-start; }
    .ts-hint { text-align: left; }
  }
  @media (prefers-reduced-motion: reduce) {
    .ts-layer, .ts-thread, .ts-knot, .ts-mark,
    .ts-range::-webkit-slider-thumb, .ts-range::-moz-range-thumb { transition: none; }
    .ts-facts { animation: none; }
    .ts-root[data-stage="2"] .ts-cad { animation: none; }
  }
</style>
