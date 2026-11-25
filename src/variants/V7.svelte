<script>
  import { onMount } from "svelte";
  import { studio, services, works, pipeline, img } from "../lib/data.js";
  import { reveal } from "../lib/reveal.js";

  const stages = ["Sketch", "Model", "CAD", "Print"];
  const stageNote = [pipeline[0].note, pipeline[2].note, pipeline[3].note, pipeline[4].note];
  const stageBody = [
    "Loose construction lines and dot markers — proportion before detail.",
    "Dense particle mass — form resolved from every angle before engineering.",
    "Measured isometric lines — joints, tolerances and fit drawn to hold.",
    "Sliced strata — layer lines a printer can follow without guesswork."
  ];

  let root = $state(null);
  let statusEl = $state(null);
  let dark = $state(false);
  let stage = $state(1);
  let step = $state(0);
  let sent = $state(false);
  let form = $state({ name: "", email: "", details: "" });

  const mail = `mailto:${studio.email}`;
  let tilt = $derived(`rotateX(${12 - stage * 3}deg) rotateY(${-28 + stage * 18}deg)`);
  let shadowW = $derived(`${62 - stage * 4}%`);

  // deterministic ring field for the Model stage (Sequen-like dot mass)
  let rings = $derived(
    Array.from({ length: 7 }, (_, r) => {
      const n = 10 + r * 6;
      const rad = 26 + r * 13;
      return Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2 + r * 0.35;
        return { x: 160 + Math.cos(a) * rad * 1.18, y: 150 + Math.sin(a) * rad * 0.82, r: r === 0 ? 4.5 : 3.4 - r * 0.18 };
      });
    }).flat()
  );

  function onSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Project inquiry — ${form.name}`);
    const body = encodeURIComponent(`${form.details}\n\nFrom: ${form.name} <${form.email}>`);
    window.location.href = `${mail}?subject=${subject}&body=${body}`;
    sent = true;
    requestAnimationFrame(() => statusEl?.focus());
  }

  onMount(() => reveal(root));
</script>

<div class="v7-shell" class:dark={dark} bind:this={root}>
  <a class="v7-skip" href="#v7-main">Skip to content</a>

  <header class="v7-head">
    <div class="v7-head-in">
      <a class="v7-word" href="#v7-top" aria-label="Catred Studio — top">CATRED<sup>®</sup></a>
      <nav class="v7-nav" aria-label="Primary">
        <a href="#v7-shelf">Shelf</a>
        <a href="#v7-ledger">Ledger</a>
        <a href="#v7-plinth">Plinth</a>
        <a href="#v7-contact">Contact</a>
      </nav>
      <div class="v7-head-acts">
        <button class="v7-toggle" type="button" aria-pressed={dark} onclick={() => (dark = !dark)}>
          <span class="v7-toggle-dot" aria-hidden="true"></span>Dark mode
        </button>
        <a class="v7-cta" href={mail}>Start a project</a>
      </div>
    </div>
  </header>

  <main id="v7-main">
    <section class="v7-hero" id="v7-top" aria-labelledby="v7-h1">
      <div class="v7-hero-copy">
        <h1 id="v7-h1">Concept&nbsp;to<br />printed object.</h1>
        <p class="v7-lede">{studio.tagline} One team carries a 2D sketch through 3D, CAD and print — no handoffs between vendors.</p>
        <div class="v7-actions">
          <a class="v7-cta" href={mail}>Start a project <span aria-hidden="true">→</span></a>
          <a class="v7-link" href="#v7-plinth">See the work <span aria-hidden="true">↓</span></a>
        </div>
        <dl class="v7-meta">
          <div><dt>Studio</dt><dd>{studio.full}</dd></div>
          <div><dt>Base</dt><dd>{studio.location}</dd></div>
          <div><dt>Reply from</dt><dd>{studio.email}</dd></div>
        </dl>
      </div>

      <div class="v7-stage">
        <div class="v7-scene rv">
          <p class="v7-scene-tag">Fig. 01 — shelf object · <span>{stages[stage]}</span></p>
          <div class="v7-orbit" aria-hidden="true"><span></span><span></span></div>
          <div class="v7-tilt">
            <div class="v7-object" style={`transform: ${tilt}`}>
              {#key stage}
              <svg class="v7-svg" viewBox="0 0 320 300" role="img" aria-label={`${stages[stage]} specimen object drawn from dots and lines`}>
                {#if stage === 0}
                  <g class="v7-draw" fill="none" stroke="var(--v7-ink)" stroke-width="2.5" stroke-dasharray="7 6">
                    <polygon points="160,28 262,86 262,204 160,262 58,204 58,86" />
                    <polygon points="160,60 234,102 234,188 160,230 86,188 86,102" stroke="var(--v7-violet)" />
                    <path d="M160 28v34M58 86l30 17M262 86l-30 17" stroke="var(--v7-red)" stroke-dasharray="none" />
                  </g>
                  <g fill="var(--v7-red)">
                    {#each Array.from({ length: 18 }, (_, i) => i) as i}
                      {@const a = (i / 18) * Math.PI * 2}
                      <circle cx={160 + Math.cos(a) * 96} cy={145 + Math.sin(a) * 78} r={i % 3 === 0 ? 4 : 2.4} />
                    {/each}
                  </g>
                  <g fill="var(--v7-ink)">
                    {#each Array.from({ length: 10 }, (_, i) => i) as i}
                      <circle cx={96 + i * 14} cy={238 - (i % 2) * 8} r="2" />
                    {/each}
                  </g>
                {:else if stage === 1}
                  <ellipse cx="160" cy="150" rx="118" ry="96" fill="none" stroke="var(--v7-violet)" stroke-width="2" stroke-dasharray="2 7" />
                  <g fill="var(--v7-ink)">
                    {#each rings as d}
                      <circle cx={d.x} cy={d.y} r={d.r} />
                    {/each}
                  </g>
                  <circle cx="160" cy="150" r="12" fill="var(--v7-red)" />
                  <circle cx="160" cy="150" r="26" fill="none" stroke="var(--v7-red)" stroke-width="2.5" />
                {:else if stage === 2}
                  <g stroke="var(--v7-ink)" stroke-width="2" fill="none">
                    {#each Array.from({ length: 9 }, (_, i) => i) as i}
                      <line x1={40 + i * 30} y1="30" x2={40 + i * 30} y2="260" opacity="0.28" />
                      <line x1="34" y1={44 + i * 26} x2="286" y2={44 + i * 26} opacity="0.28" />
                    {/each}
                    <polygon points="160,52 244,100 244,196 160,244 76,196 76,100" stroke-width="3" />
                    <line x1="160" y1="52" x2="160" y2="244" stroke="var(--v7-violet)" stroke-dasharray="6 5" />
                    <line x1="76" y1="100" x2="244" y2="196" stroke="var(--v7-violet)" stroke-dasharray="6 5" />
                    <circle cx="160" cy="148" r="30" stroke="var(--v7-red)" stroke-width="3" />
                  </g>
                  <g font-family="var(--font-mono)" font-size="13" fill="var(--v7-ink)">
                    <text x="248" y="108">84.0</text>
                    <text x="52" y="250">0.2 tol</text>
                  </g>
                  <g fill="var(--v7-indigo)">
                    {#each [[160,52],[244,100],[244,196],[160,244],[76,196],[76,100],[160,148]] as p}
                      <circle cx={p[0]} cy={p[1]} r="4.5" />
                    {/each}
                  </g>
                {:else}
                  <g fill="none" stroke-width="2.5">
                    {#each Array.from({ length: 10 }, (_, i) => i) as i}
                      {@const w = 30 + i * 9}
                      <ellipse cx="160" cy={52 + i * 19} rx={w} ry={w * 0.32} stroke={i === 9 ? "var(--v7-red)" : "var(--v7-ink)"} opacity={0.35 + i * 0.07} />
                      {#each Array.from({ length: 8 + (i % 3) * 4 }, (_, k) => k) as k}
                        {@const a = (k / 12) * Math.PI * 2 + i * 0.4}
                        <circle cx={160 + Math.cos(a) * w} cy={52 + i * 19 + Math.sin(a) * w * 0.32} r="2.6" fill={i > 7 ? "var(--v7-red)" : "var(--v7-ink)"} stroke="none" />
                      {/each}
                    {/each}
                  </g>
                {/if}
              </svg>
              {/key}
            </div>
          </div>
          <div class="v7-plinth" aria-hidden="true">
            <span class="v7-plinth-top"></span>
            <span class="v7-plinth-body">CATRED / OBJECT 0{stage + 1} — {stages[stage].toUpperCase()}</span>
          </div>
          <div class="v7-shadow" style={`width: ${shadowW}`} aria-hidden="true"></div>
          <div class="v7-plates" role="group" aria-label="Specimen stage">
            {#each stages as label, i}
              <button type="button" class="v7-plate" class:is-on={stage === i} aria-pressed={stage === i} onclick={() => (stage = i)}>
                <span class="v7-plate-no">0{i + 1}</span><span>{label}</span>
              </button>
            {/each}
          </div>
          <p class="v7-stage-note" aria-live="polite"><strong>0{stage + 1} / {stages[stage]}</strong> — {stageNote[stage]}. {stageBody[stage]}</p>
        </div>
      </div>
    </section>

    <section class="v7-shelf-sec" id="v7-shelf" aria-labelledby="v7-shelf-h">
      <div class="v7-sec-head rv">
        <h2 id="v7-shelf-h">Four disciplines on one shelf.</h2>
        <p>One long board, four specimens at four heights. Scroll sideways — everything below is drawn, built, engineered and printed in-house.</p>
      </div>
      <ol class="v7-shelf rv">
        {#each services as s, i}
          <li class="v7-spec" style={`--sink:${i === 0 ? 0 : i === 1 ? 2.4 : i === 2 ? 0.8 : 3}rem; --wide:${i === 1 ? 300 : 252}px`}>
            <span class="v7-chip">{s.id.toUpperCase()} · SPEC-{s.index}</span>
            <figure>
              <img src={img(s.img)} alt={`${s.title} — placeholder artwork`} loading="lazy" />
            </figure>
            <h3>{s.title}</h3>
            <p class="v7-tag">{s.tag}</p>
            <p class="v7-desc">{s.desc}</p>
          </li>
        {/each}
      </ol>
      <div class="v7-board" aria-hidden="true"></div>
    </section>

    <section class="v7-ledger-sec" id="v7-ledger" aria-labelledby="v7-ledger-h">
      <div class="v7-sec-head rv">
        <h2 id="v7-ledger-h">Process viewer and spec ledger.</h2>
        <p>Five passes from thumbnail to physical object. Pick a pass to read its ledger entry.</p>
      </div>
      <div class="v7-ledger-grid">
        <div class="v7-steps rv" role="group" aria-label="Pipeline pass">
          {#each pipeline as p, i}
            <button type="button" class="v7-step" class:is-on={step === i} aria-pressed={step === i} onclick={() => (step = i)}>
              <span class="v7-step-no">0{i + 1}</span>
              <span class="v7-step-body"><span class="v7-step-name">{p.step}</span><span class="v7-step-note">{p.note}</span></span>
              <span class="v7-step-dot" aria-hidden="true"></span>
            </button>
          {/each}
        </div>
        <article class="v7-ledger rv" aria-live="polite">
          {#key step}
            <div class="v7-ledger-in">
              <h3>{pipeline[step].step}</h3>
              <p class="v7-ledger-note">{pipeline[step].note}</p>
              <p class="v7-ledger-body">{pipeline[step].body}</p>
              <dl>
                <div><dt>Pass</dt><dd>0{step + 1} / 05</dd></div>
                <div><dt>Disciplines</dt><dd>04</dd></div>
                <div><dt>Pieces on plinth</dt><dd>0{works.length}</dd></div>
              </dl>
            </div>
          {/key}
        </article>
      </div>
    </section>

    <section class="v7-work" id="v7-plinth" aria-labelledby="v7-work-h">
      <div class="v7-sec-head rv">
        <h2 id="v7-work-h">Work plinth.</h2>
        <p>Six studio pieces standing on one plinth. Images are local placeholders — real work replaces them.</p>
      </div>
      <div class="v7-plinth-row rv">
        {#each works as w, i}
          <figure class="v7-piece" style={`--tall:${i % 3 === 0 ? 1.25 : i % 3 === 1 ? 1 : 1.12}`}>
            <div class="v7-piece-frame">
              <img src={img(w.img)} alt={`${w.title}, ${w.type} — placeholder artwork`} loading={i < 2 ? "eager" : "lazy"} />
              <span class="v7-piece-no" aria-hidden="true">FIG.{String(i + 1).padStart(2, "0")}</span>
            </div>
            <figcaption>{w.title} <span>/ {w.type}</span></figcaption>
          </figure>
        {/each}
      </div>
      <div class="v7-board" aria-hidden="true"></div>
      <p class="v7-note">All artwork is placeholder in <code>/dummy/*.svg</code>. No client work, quotes or prices are shown.</p>
    </section>

    <section class="v7-contact" id="v7-contact" aria-labelledby="v7-contact-h">
      <div class="v7-contact-copy rv">
        <h2 id="v7-contact-h">Have something to build?</h2>
        <p>Name the object, its size and its deadline. We reply from {studio.email}.</p>
        <ul class="v7-rail" aria-label="Contact details">
          <li><span>Email</span><a href={mail}>{studio.email}</a></li>
          <li><span>Studio</span><span>{studio.full} — {studio.domain}</span></li>
          <li><span>Base</span><span>{studio.location}</span></li>
          <li><span>Social</span><a href={studio.instagram} target="_blank" rel="noreferrer">Instagram ↗</a></li>
        </ul>
      </div>
      <form class="v7-form rv" onsubmit={onSubmit}>
        <p class="v7-form-head">New inquiry — rail Nº 01</p>
        <label for="v7-name">Name</label>
        <input id="v7-name" value={form.name} oninput={(e) => (form.name = e.currentTarget.value)} required autocomplete="name" />
        <label for="v7-email">Email</label>
        <input id="v7-email" type="email" value={form.email} oninput={(e) => (form.email = e.currentTarget.value)} required autocomplete="email" />
        <label for="v7-details">What are we making?</label>
        <textarea
          id="v7-details"
          rows="4"
          value={form.details}
          required
          placeholder="Subject, size, deadline"
          oninput={(e) => (form.details = e.currentTarget.value)}
        ></textarea>
        <button type="submit">Send inquiry <span aria-hidden="true">→</span></button>
        <p class="v7-sent" class:has-msg={sent} role="status" tabindex="-1" bind:this={statusEl}>
          {#if sent}Your mail app should open with the brief. If not, <a href={mail}>email {studio.email}</a>.{/if}
        </p>
      </form>
    </section>
  </main>

  <footer class="v7-foot">
    <div class="v7-foot-in">
      <p class="v7-foot-brand">CATRED</p>
      <nav class="v7-foot-nav" aria-label="Footer">
        <a href="#v7-shelf">Shelf</a>
        <a href="#v7-ledger">Ledger</a>
        <a href="#v7-plinth">Plinth</a>
        <a href={mail}>Start a project</a>
        <a href={studio.instagram} target="_blank" rel="noreferrer">Instagram</a>
      </nav>
      <p class="v7-colophon">Set in Archivo Black, Space Grotesk, Space Mono. Paper ground, ink text, one red accent. © 2026 {studio.domain}. Artwork is placeholder.</p>
    </div>
  </footer>
</div>

<style>
  .v7-shell {
    --v7-bg: var(--paper);
    --v7-ink: var(--ink);
    --v7-soft: var(--indigo);
    --v7-mute: var(--indigo);
    --v7-line: var(--line-light);
    --v7-card: var(--paper);
    --v7-indigo: var(--indigo);
    --v7-violet: var(--violet);
    --v7-red: var(--red);
    --v7-accent: var(--red-deep);
    --v7-plinth: var(--navy);
    --v7-plinth-ink: var(--paper);
    --v7-board: var(--navy);
    --v7-shadow: rgb(20 18 51 / 0.24);
    --v7-lift: 0 2px 0 rgb(20 18 51 / 0.05), 0 22px 44px -24px var(--v7-shadow);
    color-scheme: light;
    background: var(--v7-bg);
    color: var(--v7-ink);
    font-family: var(--font-body);
    min-height: 100vh;
  }
  .v7-shell.dark {
    --v7-bg: var(--navy);
    --v7-ink: var(--paper);
    --v7-soft: var(--paper);
    --v7-mute: var(--paper);
    --v7-line: var(--line-dark);
    --v7-card: var(--indigo);
    --v7-indigo: var(--paper);
    --v7-violet: var(--paper);
    --v7-plinth: var(--paper);
    --v7-plinth-ink: var(--navy);
    --v7-board: var(--paper);
    --v7-shadow: rgb(0 0 0 / 0.55);
    --v7-lift: 0 2px 0 rgb(0 0 0 / 0.3), 0 26px 52px -24px var(--v7-shadow);
    color-scheme: dark;
  }
  .v7-shell ::selection { background: var(--red-deep); color: var(--paper); }
  .v7-shell :focus-visible { outline: 3px solid var(--red); outline-offset: 3px; }
  #v7-top, #v7-shelf, #v7-ledger, #v7-plinth, #v7-contact { scroll-margin-top: 5rem; }
  .v7-shell a { text-underline-offset: 4px; font-variant-numeric: tabular-nums; }
  .v7-skip {
    position: fixed; top: 0.5rem; left: 0.5rem; z-index: 200;
    background: var(--v7-ink); color: var(--v7-bg);
    font-family: var(--font-mono); font-size: 0.78rem;
    padding: 0.6rem 0.9rem; border-radius: 4px; text-decoration: none;
    transform: translateY(-220%);
  }
  .v7-skip:focus { transform: none; }

  .v7-head { position: sticky; top: 0; z-index: 100; background: var(--v7-bg); border-bottom: 2px solid var(--v7-ink); }
  .v7-head-in { max-width: 1180px; margin: 0 auto; display: flex; align-items: center; gap: 1.2rem; padding: 0.8rem clamp(1rem, 4vw, 2rem); }
  .v7-word { font-family: var(--font-display); font-size: 1.15rem; text-decoration: none; margin-right: auto; color: inherit; }
  .v7-word sup { font-size: 0.55rem; }
  .v7-nav { display: flex; gap: 1.2rem; }
  .v7-nav a { font-family: var(--font-mono); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; text-decoration: none; color: inherit; }
  .v7-nav a:hover { text-decoration: underline; text-underline-offset: 4px; }
  .v7-head-acts { display: flex; align-items: center; gap: 0.6rem; }
  .v7-toggle {
    display: inline-flex; align-items: center; gap: 0.5rem; background: transparent; color: inherit; cursor: pointer;
    border: 2px solid var(--v7-ink); border-radius: 4px;
    font-family: var(--font-mono); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em;
    padding: 0.5rem 0.7rem; font-variant-numeric: tabular-nums; white-space: nowrap;
  }
  .v7-toggle-dot { width: 10px; height: 10px; border-radius: 4px; background: var(--v7-ink); }
  .v7-shell.dark .v7-toggle-dot { background: var(--red); }
  .v7-cta {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: var(--red-deep); color: var(--paper) !important;
    font-family: var(--font-mono); font-size: 0.74rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em; text-decoration: none;
    padding: 0.62rem 0.95rem; border-radius: 4px; border: 2px solid var(--red-deep); white-space: nowrap;
  }
  .v7-cta:hover { background: var(--red-deep); border-color: var(--red-deep); }
  .v7-link { font-family: var(--font-mono); font-size: 0.76rem; text-transform: uppercase; letter-spacing: 0.06em; color: inherit; }

  .v7-hero {
    max-width: 1180px; margin: 0 auto;
    display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(1.6rem, 4vw, 3.5rem); align-items: start;
    padding: clamp(2.5rem, 6vw, 4.5rem) clamp(1rem, 4vw, 2rem) 0;
  }
  .v7-hero h1 {
    margin: 0; font-family: var(--font-display);
    font-size: clamp(2.6rem, 6.2vw, 4.6rem); line-height: 0.95;
    letter-spacing: -0.02em; text-transform: uppercase; text-wrap: balance;
  }
  .v7-lede { max-width: 42ch; line-height: 1.65; color: var(--v7-soft); margin: 1.2rem 0 0; }
  .v7-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 1.2rem; margin-top: 1.6rem; }
  .v7-meta { display: grid; margin: 2rem 0 0; border-top: 2px solid var(--v7-ink); }
  .v7-meta div { display: flex; justify-content: space-between; gap: 1rem; padding: 0.6rem 0; border-bottom: 1px solid var(--v7-line); font-family: var(--font-mono); font-size: 0.72rem; font-variant-numeric: tabular-nums; }
  .v7-meta dt { text-transform: uppercase; letter-spacing: 0.1em; color: var(--v7-mute); }
  .v7-meta dd { margin: 0; text-align: right; }

  .v7-stage { position: sticky; top: 4.6rem; }
  .v7-scene { border: 2px solid var(--v7-ink); border-radius: 6px; background: var(--v7-card); box-shadow: var(--v7-lift); padding: 1rem 1rem 1.2rem; position: relative; overflow: hidden; }
  .v7-scene-tag { margin: 0 0 0.4rem; font-family: var(--font-mono); font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--v7-mute); font-variant-numeric: tabular-nums; }
  .v7-scene-tag span { color: var(--v7-accent); font-weight: 700; }
  .v7-shell.dark .v7-scene-tag span { color: var(--v7-ink); }
  .v7-orbit { position: absolute; inset: 3rem -4rem auto; height: 300px; pointer-events: none; }
  .v7-orbit span { position: absolute; left: 50%; top: 0; width: 560px; height: 560px; translate: -50% -38%; border: 1px dashed var(--v7-mute); border-radius: 50%; opacity: 0.35; }
  .v7-orbit span:last-child { width: 420px; height: 420px; opacity: 0.22; }
  .v7-tilt { perspective: 1100px; padding-top: 0.4rem; }
  .v7-object { width: min(330px, 72vw); margin: 0 auto; transform-style: preserve-3d; transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1); }
  .v7-svg { width: 100%; height: auto; display: block; animation: v7-pop 0.55s cubic-bezier(0.16, 1, 0.3, 1) both; }
  .v7-plinth { max-width: 340px; margin: 0.2rem auto 0; }
  .v7-plinth-top { display: block; height: 12px; border: 2px solid var(--v7-ink); border-radius: 4px; background: var(--v7-card); }
  .v7-plinth-body { display: block; margin: 6px 14px 0; background: var(--v7-plinth); color: var(--v7-plinth-ink); border-radius: 4px; font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.12em; text-align: center; padding: 0.45rem; font-variant-numeric: tabular-nums; }
  .v7-shadow { height: 10px; margin: 0.7rem auto 0; border-radius: 6px; background: var(--v7-ink); opacity: 0.16; filter: blur(3px); transition: width 0.7s cubic-bezier(0.16, 1, 0.3, 1); }
  .v7-plates { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin-top: 0.9rem; }
  .v7-plate {
    display: grid; gap: 0.1rem; text-align: left; cursor: pointer;
    background: var(--v7-bg); color: inherit; border: 2px solid var(--v7-ink); border-radius: 4px;
    font-family: var(--font-mono); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.06em;
    padding: 0.55rem 0.6rem; transition: transform 0.25s ease, background 0.25s ease;
  }
  .v7-plate:hover { transform: translateY(-3px); }
  .v7-plate-no { font-size: 0.62rem; color: var(--v7-mute); font-variant-numeric: tabular-nums; }
  .v7-plate.is-on { background: var(--v7-ink); color: var(--v7-bg); }
  .v7-plate.is-on .v7-plate-no { color: inherit; }
  .v7-shell.dark .v7-plate.is-on .v7-plate-no { color: inherit; }
  .v7-stage-note { margin: 0.8rem 0 0; font-family: var(--font-mono); font-size: 0.7rem; line-height: 1.55; color: var(--v7-soft); }

  .v7-shelf-sec, .v7-ledger-sec, .v7-work, .v7-contact { max-width: 1180px; margin: 0 auto; padding: clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 2rem) 0; }
  .v7-sec-head { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); gap: 1.5rem; align-items: end; margin-bottom: 1.6rem; }
  .v7-sec-head h2 { margin: 0; font-family: var(--font-display); font-size: clamp(1.7rem, 3.8vw, 2.8rem); line-height: 1; text-transform: uppercase; text-wrap: balance; }
  .v7-sec-head p { margin: 0; max-width: 44ch; line-height: 1.65; color: var(--v7-soft); }

  .v7-shelf {
    list-style: none; margin: 0; padding: 0.4rem 0.2rem 0;
    display: flex; gap: 1rem; overflow-x: auto; align-items: start;
    scroll-snap-type: x proximity; scrollbar-width: thin; scrollbar-color: var(--v7-ink) transparent;
  }
  .v7-shelf::-webkit-scrollbar { height: 8px; }
  .v7-shelf::-webkit-scrollbar-thumb { background: var(--v7-ink); border-radius: 6px; }
  .v7-spec {
    flex: 0 0 var(--wide); margin: var(--sink) 0 0;
    border: 2px solid var(--v7-ink); border-radius: 6px; background: var(--v7-card);
    box-shadow: var(--v7-lift); padding: 0.9rem; scroll-snap-align: start;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .v7-spec:hover { transform: translateY(-5px); }
  .v7-chip { display: inline-block; font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.1em; border: 2px solid var(--v7-ink); border-radius: 4px; padding: 0.15rem 0.45rem; font-variant-numeric: tabular-nums; }
  .v7-spec figure { margin: 0.8rem 0 0; border: 2px solid var(--v7-ink); border-radius: 4px; overflow: hidden; background: var(--v7-bg); }
  .v7-spec img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }
  .v7-spec:nth-child(2) img { aspect-ratio: 3 / 3.4; }
  .v7-spec h3 { margin: 0.8rem 0 0.25rem; font-family: var(--font-display); font-size: 1.02rem; text-transform: uppercase; line-height: 1.05; }
  .v7-tag { margin: 0; font-family: var(--font-mono); font-size: 0.64rem; color: var(--v7-mute); line-height: 1.5; }
  .v7-desc { margin: 0.6rem 0 0; font-size: 0.86rem; line-height: 1.6; color: var(--v7-soft); }
  .v7-board { height: 10px; margin-top: 1.2rem; background: var(--v7-board); border-radius: 4px; box-shadow: 0 10px 24px -14px var(--v7-shadow); }

  .v7-ledger-grid { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr); gap: 1rem; align-items: start; }
  .v7-steps { display: grid; border: 2px solid var(--v7-ink); border-radius: 6px; overflow: hidden; background: var(--v7-card); }
  .v7-step { display: flex; align-items: center; gap: 0.8rem; text-align: left; cursor: pointer; background: transparent; color: inherit; border: 0; border-top: 1px solid var(--v7-line); padding: 0.85rem 0.95rem; font-family: var(--font-mono); transition: background 0.25s ease; }
  .v7-step:first-child { border-top: 0; }
  .v7-step:hover { background: var(--v7-bg); }
  .v7-step.is-on { background: var(--v7-ink); color: var(--v7-bg); }
  .v7-step-no { font-size: 0.7rem; color: inherit; font-weight: 700; min-width: 2rem; font-variant-numeric: tabular-nums; }
  .v7-step-body { display: grid; gap: 0.1rem; margin-right: auto; }
  .v7-step-name { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; }
  .v7-step-note { font-size: 0.66rem; color: var(--v7-mute); }
  .v7-step.is-on .v7-step-note { color: inherit; opacity: 0.78; }
  .v7-step-dot { width: 10px; height: 10px; border-radius: 50%; border: 2px solid currentColor; flex: none; }
  .v7-step.is-on .v7-step-dot { background: currentColor; border-color: currentColor; }
  .v7-ledger { border: 2px solid var(--v7-ink); border-radius: 6px; background: var(--v7-card); box-shadow: var(--v7-lift); }
  .v7-ledger-in { padding: 1.2rem; animation: v7-pop 0.45s cubic-bezier(0.16, 1, 0.3, 1) both; }
  .v7-ledger h3 { margin: 0 0 0.2rem; font-family: var(--font-display); font-size: 1.6rem; text-transform: uppercase; }
  .v7-ledger-note { margin: 0; font-family: var(--font-mono); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--v7-mute); }
  .v7-ledger-body { line-height: 1.65; color: var(--v7-soft); font-size: 0.92rem; }
  .v7-ledger dl { margin: 1rem 0 0; border-top: 2px solid var(--v7-ink); }
  .v7-ledger dl div { display: flex; justify-content: space-between; gap: 1rem; padding: 0.55rem 0; border-bottom: 1px dotted var(--v7-mute); font-family: var(--font-mono); font-size: 0.7rem; font-variant-numeric: tabular-nums; }
  .v7-ledger dt { text-transform: uppercase; letter-spacing: 0.08em; color: var(--v7-mute); }
  .v7-ledger dd { margin: 0; }

  .v7-plinth-row { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 1rem; align-items: end; padding: 0.4rem 0.2rem 0; }
  .v7-piece { margin: 0; min-width: 0; transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
  .v7-piece:hover { transform: translateY(-5px); }
  .v7-piece-frame { border: 2px solid var(--v7-ink); border-radius: 6px; overflow: hidden; background: var(--v7-card); box-shadow: var(--v7-lift); position: relative; }
  .v7-piece-frame img { width: 100%; aspect-ratio: 4 / calc(3 * var(--tall)); object-fit: cover; }
  .v7-piece-no { position: absolute; top: 0.5rem; left: 0.5rem; background: var(--v7-ink); color: var(--v7-bg); font-family: var(--font-mono); font-size: 0.6rem; letter-spacing: 0.08em; padding: 0.2rem 0.45rem; border-radius: 4px; font-variant-numeric: tabular-nums; }
  .v7-piece figcaption { padding: 0.55rem 0.1rem 0; font-family: var(--font-mono); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; }
  .v7-piece figcaption span { color: var(--v7-mute); }
  .v7-note { margin: 1.2rem 0 0; font-family: var(--font-mono); font-size: 0.7rem; color: var(--v7-mute); }
  .v7-note code { font: inherit; }

  .v7-contact { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(1.6rem, 4vw, 3rem); align-items: start; padding-bottom: clamp(3.5rem, 7vw, 6rem); }
  .v7-contact h2 { margin: 0; font-family: var(--font-display); font-size: clamp(1.9rem, 4.4vw, 3.2rem); line-height: 1; text-transform: uppercase; text-wrap: balance; }
  .v7-contact-copy p { max-width: 42ch; line-height: 1.65; color: var(--v7-soft); }
  .v7-rail { list-style: none; margin: 1.4rem 0 0; padding: 0; border-top: 2px solid var(--v7-ink); }
  .v7-rail li { display: grid; grid-template-columns: 6rem minmax(0, 1fr); gap: 1rem; padding: 0.7rem 0; border-bottom: 1px solid var(--v7-line); font-family: var(--font-mono); font-size: 0.74rem; }
  .v7-rail li > span:first-child { text-transform: uppercase; letter-spacing: 0.1em; color: var(--v7-mute); }
  .v7-rail a { color: inherit; }
  .v7-form { border: 2px solid var(--v7-ink); border-radius: 6px; background: var(--v7-card); box-shadow: var(--v7-lift); padding: 1.2rem; caret-color: var(--v7-red); }
  .v7-form-head { margin: 0 0 0.4rem; padding-bottom: 0.6rem; border-bottom: 2px solid var(--v7-ink); font-family: var(--font-mono); font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.14em; color: var(--v7-mute); }
  .v7-form label { display: block; margin: 0.85rem 0 0.3rem; font-family: var(--font-mono); font-size: 0.64rem; text-transform: uppercase; letter-spacing: 0.1em; }
  .v7-form input, .v7-form textarea { display: block; width: 100%; box-sizing: border-box; padding: 0.65rem 0.7rem; font: inherit; font-size: 0.9rem; background: var(--v7-bg); color: var(--v7-ink); border: 2px solid var(--v7-ink); border-radius: 4px; }
  .v7-form input::placeholder, .v7-form textarea::placeholder { color: var(--v7-mute); opacity: 1; }
  .v7-form textarea { resize: vertical; min-height: 6rem; }
  .v7-form button { width: 100%; margin-top: 1.1rem; padding: 0.85rem 1rem; cursor: pointer; background: var(--red-deep); color: var(--paper); border: 2px solid var(--red-deep); border-radius: 4px; font-family: var(--font-mono); font-size: 0.76rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; }
  .v7-form button:hover { background: var(--red-deep); border-color: var(--red-deep); }
  .v7-sent { margin: 0; font-size: 0.84rem; line-height: 1.55; }
  .v7-sent.has-msg { margin-top: 1rem; }

  .v7-foot { border-top: 2px solid var(--v7-ink); }
  .v7-foot-in { max-width: 1180px; margin: 0 auto; padding: clamp(2rem, 5vw, 3.5rem) clamp(1rem, 4vw, 2rem); display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 1.2rem 2rem; align-items: end; }
  .v7-foot-brand { margin: 0; font-family: var(--font-display); font-size: clamp(2.2rem, 6vw, 3.8rem); line-height: 0.95; }
  .v7-foot-nav { display: flex; flex-wrap: wrap; gap: 1.1rem; justify-content: flex-end; }
  .v7-foot-nav a { font-family: var(--font-mono); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; text-decoration: none; color: inherit; }
  .v7-foot-nav a:hover { text-decoration: underline; text-underline-offset: 4px; }
  .v7-colophon { grid-column: 1 / -1; margin: 0; padding-top: 0.9rem; border-top: 1px solid var(--v7-line); font-family: var(--font-mono); font-size: 0.66rem; line-height: 1.6; color: var(--v7-mute); }

  @keyframes v7-pop {
    from { opacity: 0; transform: translateY(12px) scale(0.985); }
    to { opacity: 1; transform: none; }
  }

  @media (max-width: 960px) {
    .v7-hero, .v7-sec-head, .v7-ledger-grid, .v7-contact { grid-template-columns: 1fr; }
    .v7-stage { position: static; }
    .v7-plinth-row { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }
  @media (max-width: 640px) {
    .v7-nav { display: none; }
    .v7-head-in { gap: 0.7rem; }
    .v7-cta { padding: 0.55rem 0.7rem; font-size: 0.66rem; }
    .v7-toggle { padding: 0.45rem 0.55rem; font-size: 0.62rem; }
    .v7-plates { grid-template-columns: 1fr 1fr; }
    .v7-foot-in { grid-template-columns: 1fr; align-items: start; }
    .v7-foot-nav { justify-content: flex-start; }
  }
  @media (prefers-reduced-motion: reduce) {
    .v7-object, .v7-shadow, .v7-plate, .v7-spec, .v7-piece, .v7-svg, .v7-ledger-in { animation: none; transition: none; }
  }
</style>
