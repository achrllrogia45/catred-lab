<script>
  import { onMount } from "svelte";
  import { studio, services, works, pipeline, img } from "../lib/data.js";
  import { reveal } from "../lib/reveal.js";

  let root = $state();
  let dark = $state(false);
  let pass = $state(0);
  let form = $state({ name: "", email: "", details: "" });
  let sent = $state(false);
  let statusEl = $state();
  let railEl = $state();
  function selectPass(i) {
    pass = i;
    railEl?.children?.[i]?.scrollIntoView({ block: "nearest", inline: "center" });
  }

  const mail = `mailto:${studio.email}`;
  const ticker = [...services.map((s) => s.title.toUpperCase()), "CONCEPT TO PRINTED OBJECT"];

  function onSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Project inquiry — ${form.name || "new project"}`);
    const body = encodeURIComponent(`${form.details}\n\nFrom: ${form.name} <${form.email}>`);
    window.location.href = `${mail}?subject=${subject}&body=${body}`;
    sent = true;
    statusEl?.focus();
  }

  onMount(() => {
    if (!root) return;
    return reveal(root);
  });
</script>

<div class="v6-root" class:dark={dark} bind:this={root}>
  <a class="v6-skip" href="#v6-main">Skip to content</a>

  <header class="v6-mast">
    <a class="v6-word" href="#v6-top" aria-label="CATRED — back to top">CATRED<sup aria-hidden="true">*</sup></a>
    <nav class="v6-nav" aria-label="Primary">
      <a href="#v6-services">Scoreboard</a>
      <a href="#v6-passes">Passes</a>
      <a href="#v6-work">Plates</a>
      <a href="#v6-contact">Contact</a>
    </nav>
    <div class="v6-mast-actions">
      <button class="v6-toggle" type="button" aria-label="Dark mode" aria-pressed={dark} onclick={() => (dark = !dark)}>
        <span class="v6-dot" aria-hidden="true"></span><span aria-hidden="true">{dark ? "LIGHT" : "DARK"}</span>
      </button>
      <a class="v6-cta" href={mail}>Start a project</a>
    </div>
  </header>

  <main id="v6-main">
    <!-- HERO: split type / transmission ring -->
    <section class="v6-hero" id="v6-top" aria-labelledby="v6-h1">
      <div class="v6-hero-grid">
        <div>
          <h1 class="v6-display" id="v6-h1">
            <span class="v6-solid">CONCEPT</span>
            <span class="v6-hollow" aria-hidden="true">/ THREAD</span>
            <span class="v6-visually-hidden">/ Thread</span>
            <span class="v6-solid">/ OBJECT<span class="v6-period" aria-hidden="true">.</span></span>
          </h1>
          <p class="v6-lede">{studio.tagline} Four disciplines, five passes, one team — from first sketch to physical print. {studio.location}.</p>
          <div class="v6-rail" role="group" aria-label="Broadcast index">
            <span>CH 01–04 DISCIPLINES</span>
            <span>TX 5-PASS SEQUENCE</span>
            <span>RX 6 PLATES</span>
            <a href="#v6-contact">BOOK →</a>
          </div>
        </div>
        <div class="v6-orbit-wrap">
          <div class="v6-orbit" role="img" aria-label="Six studio work plates orbiting in a circular transmission ring">
            <div class="v6-halo" aria-hidden="true"></div>
            <div class="v6-ring" aria-hidden="true">
              {#each works as w, i}
                <span class="v6-node" style="--a: {i * 60}deg">
                  <img src={img(w.img)} alt="" loading={i > 1 ? "lazy" : "eager"} />
                </span>
              {/each}
            </div>
            <div class="v6-core" aria-hidden="true">
              <span class="v6-rec"></span>
              <strong>ON AIR</strong>
              <em>CAT·RED·06</em>
            </div>
          </div>
          <p class="v6-orbit-cap">Circular signal — the six plates in orbit. Artwork is placeholder SVG until real work lands.</p>
        </div>
      </div>
    </section>

    <!-- SCOREBOARD: four disciplines, hover invert -->
    <section class="v6-sec" id="v6-services" aria-labelledby="v6-h-services">
      <div class="v6-sec-head rv">
        <h2 id="v6-h-services">Service scoreboard</h2>
        <p class="v6-sec-note">Four disciplines. Read it like a scoreboard — hover a row to invert the signal.</p>
      </div>
      <ol class="v6-board">
        {#each services as s}
          <li class="v6-row rv">
            <span class="v6-idx">{s.index}</span>
            <div class="v6-row-main">
              <h3>{s.title}</h3>
              <p>{s.tag}</p>
            </div>
            <p class="v6-row-desc">{s.desc}</p>
            <span class="v6-arrow" aria-hidden="true">→</span>
          </li>
        {/each}
      </ol>
    </section>

    <!-- FIVE-PASS RAIL: horizontal broadcast -->
    <section class="v6-sec v6-passes" id="v6-passes" aria-labelledby="v6-h-passes">
      <div class="v6-sec-head rv">
        <h2 id="v6-h-passes">Five-pass transmission</h2>
        <p class="v6-sec-note">One sequence, sketch to object. Scroll sideways; select a pass to tune in.</p>
      </div>
      <div class="v6-tuner rv" role="group" aria-label="Select a pass">
        {#each pipeline as p, i}
          <button type="button" class:active={pass === i} aria-pressed={pass === i} onclick={() => selectPass(i)}>
            TX-0{i + 1} {p.step}
          </button>
        {/each}
      </div>
      <!-- The horizontal pass rail must be keyboard-focusable so arrow keys can scroll it. -->
      <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
      <ol class="v6-railx rv" tabindex="0" aria-label="Pipeline passes, scroll horizontally" bind:this={railEl}>
        {#each pipeline as p, i}
          <li>
            <button type="button" class="v6-pass" class:active={pass === i} onclick={() => selectPass(i)} aria-pressed={pass === i}>
              <span class="v6-pass-no">0{i + 1} / 05</span>
              <strong>{p.step}</strong>
              <span class="v6-pass-note">{p.note}</span>
              <span class="v6-pass-body">{p.body}</span>
              <span class="v6-pass-state" aria-hidden="true">{pass === i ? "● TUNED" : "○ TUNE"}</span>
            </button>
          </li>
        {/each}
      </ol>
    </section>

    <!-- PLATE WALL: poster wall, uneven spans -->
    <section class="v6-sec" id="v6-work" aria-labelledby="v6-h-work">
      <div class="v6-sec-head rv">
        <h2 id="v6-h-work">Plate wall</h2>
        <p class="v6-sec-note">Six plates, pinned like posters — not a grid of equals. Placeholder SVG artwork; real work replaces it.</p>
      </div>
      <div class="v6-wall">
        {#each works as w, i}
          <figure class="v6-plate rv" data-big={i === 0 || i === 3 ? "true" : null}>
            <img src={img(w.img)} alt="{w.title} — {w.type} (placeholder artwork)" loading={i > 1 ? "lazy" : "eager"} />
            <figcaption>
              <strong>{w.title}</strong>
              <span>PLATE 0{i + 1} · {w.type}</span>
            </figcaption>
          </figure>
        {/each}
      </div>
    </section>

    <!-- RED SIGNAL TICKER -->
    <div class="v6-ticker" aria-label="Studio signal ticker">
      <div class="v6-ticker-track" aria-hidden="true">
        {#each [0, 1] as dup}
          {#each ticker as t}
            <span>{t} ✕</span>
          {/each}
        {/each}
      </div>
      <p class="v6-visually-hidden">{ticker.join(", ")}</p>
    </div>

    <!-- CONTACT -->
    <section class="v6-sec v6-contact" id="v6-contact" aria-labelledby="v6-h-contact">
      <div class="rv">
        <h2 id="v6-h-contact">Start a project.</h2>
        <p class="v6-lede">Tell us what you want to hold in your hand. We reply by email — no forms that vanish, no quotes invented.</p>
        <p class="v6-contact-lines">
          <a href={mail}>{studio.email}</a>
          <a href={studio.instagram} rel="noopener">Instagram ↗</a>
        </p>
      </div>
      <form class="v6-form rv" onsubmit={onSubmit} aria-label="Project inquiry">
        <div>
          <label for="v6-name">Name</label>
          <input id="v6-name" name="name" type="text" autocomplete="name" required bind:value={form.name} oninput={(e) => (form.name = e.currentTarget.value)} />
        </div>
        <div>
          <label for="v6-email">Email</label>
          <input id="v6-email" name="email" type="email" autocomplete="email" required bind:value={form.email} oninput={(e) => (form.email = e.currentTarget.value)} />
        </div>
        <div class="v6-form-full">
          <label for="v6-details">What should we make?</label>
          <textarea id="v6-details" name="details" rows="4" required bind:value={form.details} oninput={(e) => (form.details = e.currentTarget.value)}></textarea>
        </div>
        <div class="v6-form-full v6-form-row">
          <button class="v6-cta v6-cta-lg" type="submit">Send via email</button>
          {#if sent}
            <p class="v6-sent" role="status" tabindex="-1" bind:this={statusEl}>Opening your mail app — talk soon.</p>
          {/if}
        </div>
      </form>
    </section>
  </main>

  <footer class="v6-foot">
    <a class="v6-word" href="#v6-top">CATRED<sup aria-hidden="true">*</sup></a>
    <p>{studio.tagline} {studio.location}.</p>
    <p class="v6-foot-links"><a href={mail}>{studio.email}</a> · <a href={studio.instagram} rel="noopener">Instagram ↗</a></p>
    <p class="v6-foot-small">Placeholder artwork throughout. No clients, quotes, or prices shown — real proof replaces this when it lands.</p>
  </footer>
</div>

<style>
  .v6-root {
    --v6-bg: var(--paper);
    --v6-fg: var(--ink);
    --v6-mut: var(--indigo);
    --v6-card: var(--paper);
    --v6-inv-bg: var(--ink);
    --v6-inv-fg: var(--paper);
    color-scheme: light;
    background: var(--v6-bg);
    color: var(--v6-fg);
    font-family: var(--font-body);
    border-top: 4px solid var(--red);
    overflow-x: clip;
  }
  .v6-root.dark {
    --v6-bg: var(--navy);
    --v6-fg: var(--paper);
    --v6-mut: var(--paper);
    --v6-card: var(--indigo);
    --v6-inv-bg: var(--paper);
    --v6-inv-fg: var(--navy);
    color-scheme: dark;
  }
  .v6-visually-hidden {
    position: absolute; width: 1px; height: 1px; margin: -1px;
    clip-path: inset(50%); overflow: hidden; white-space: nowrap;
  }
  .v6-skip {
    position: absolute; left: 1rem; top: -4rem; z-index: 60;
    background: var(--red-deep); color: var(--paper);
    font-family: var(--font-mono); font-size: 0.85rem;
    padding: 0.6rem 1rem; text-decoration: none; border-radius: 0 0 4px 4px;
  }
  .v6-skip:focus { top: 0; }
  .v6-root a:focus-visible, .v6-root button:focus-visible,
  .v6-root input:focus-visible, .v6-root textarea:focus-visible {
    outline: 2px solid var(--red); outline-offset: 3px;
  }

  /* masthead */
  .v6-mast {
    position: sticky; top: 0; z-index: 50;
    display: flex; align-items: center; justify-content: space-between; gap: 1rem;
    max-width: 76rem; margin: 0 auto; padding: 0.9rem 1.5rem;
    background: var(--v6-bg); border-bottom: 3px solid var(--red);
  }
  .v6-word {
    font-family: var(--font-display); font-size: 1.3rem; letter-spacing: 0.04em;
    color: var(--v6-fg); text-decoration: none;
  }
  .v6-word sup { color: var(--red-deep); }
  .v6-root.dark .v6-word sup { color: var(--red); }
  .v6-nav { display: flex; gap: 1.25rem; }
  .v6-nav a {
    font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 0.08em;
    color: var(--v6-fg); text-decoration: none; text-transform: uppercase;
  }
  .v6-nav a:hover { color: var(--red-deep); text-decoration: underline; text-underline-offset: 4px; }
  .v6-root.dark .v6-nav a:hover { color: var(--red); }
  .v6-mast-actions { display: flex; align-items: center; gap: 0.6rem; }
  .v6-toggle {
    display: inline-flex; align-items: center; gap: 0.45rem;
    font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.08em;
    color: var(--v6-fg); background: transparent;
    border: 2px solid var(--v6-fg); border-radius: 4px;
    padding: 0.5rem 0.7rem; cursor: pointer;
  }
  .v6-toggle:hover { color: var(--red-deep); border-color: var(--red-deep); }
  .v6-root.dark .v6-toggle:hover { color: var(--red); border-color: var(--red); }
  .v6-dot { width: 0.6rem; height: 0.6rem; border-radius: 50%; background: var(--red); }
  .v6-root.dark .v6-dot { background: var(--paper); }
  .v6-cta {
    display: inline-block; background: var(--red-deep); color: var(--paper);
    font-family: var(--font-mono); font-weight: 700; font-size: 0.8rem;
    text-decoration: none; border-radius: 4px; padding: 0.65rem 1rem;
    border: 2px solid var(--red-deep); white-space: nowrap;
  }
  .v6-cta:hover {
    background: var(--v6-fg);
    border-color: var(--v6-fg);
    color: var(--v6-bg);
  }
  .v6-cta-lg { font-size: 0.95rem; padding: 0.9rem 1.6rem; cursor: pointer; }

  main { display: block; }
  #v6-top, #v6-main, #v6-services, #v6-passes, #v6-work, #v6-contact { scroll-margin-top: 5rem; }
  .v6-sec { max-width: 76rem; margin: 0 auto; padding: 4rem 1.5rem 0; }
  .v6-sec-head {
    border-top: 3px solid var(--red); padding-top: 1rem;
    display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.5rem 2rem;
    margin-bottom: 1.5rem;
  }
  .v6-sec-head h2 {
    font-family: var(--font-display); font-size: clamp(1.8rem, 4.5vw, 3rem);
    letter-spacing: -0.01em; margin: 0; text-wrap: balance;
  }
  .v6-sec-note {
    font-family: var(--font-mono); font-size: 0.8rem; color: var(--v6-mut);
    margin: 0; max-width: 60ch;
  }

  /* hero */
  .v6-hero { max-width: 76rem; margin: 0 auto; padding: 2.5rem 1.5rem 3rem; border-bottom: 3px solid var(--red); }
  .v6-hero-grid { display: grid; gap: 2.5rem; grid-template-columns: 1.15fr 0.85fr; align-items: center; }
  .v6-display {
    font-family: var(--font-display);
    font-size: clamp(2.6rem, 8.5vw, 6rem);
    line-height: 0.95; letter-spacing: -0.02em;
    margin: 0; text-wrap: balance;
  }
  .v6-display span { display: block; }
  .v6-hollow { color: transparent; -webkit-text-stroke: 2.5px var(--v6-fg); }
  .v6-period { color: var(--red); -webkit-text-stroke: 0; }
  .v6-lede { font-size: 1.05rem; line-height: 1.6; max-width: 62ch; margin: 1.25rem 0 1.5rem; }
  .v6-rail {
    display: flex; flex-wrap: wrap; gap: 0; border: 2px solid var(--v6-fg); border-radius: 4px;
    font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.06em;
  }
  .v6-rail > * {
    padding: 0.7rem 1rem; border-right: 2px solid var(--v6-fg);
    color: var(--v6-fg); text-decoration: none; flex: 1 1 auto; text-align: center;
  }
  .v6-rail > :last-child { border-right: 0; background: var(--v6-fg); color: var(--v6-bg); font-weight: 700; }
  .v6-rail > a:hover { background: var(--red-deep); color: var(--paper); }

  /* orbit ring */
  .v6-orbit-wrap { display: grid; justify-items: center; gap: 0.75rem; }
  .v6-orbit {
    position: relative; width: min(400px, 78vw); aspect-ratio: 1;
    --v6-r: clamp(104px, 30vw, 150px);
  }
  .v6-halo {
    position: absolute; inset: 12%; border: 2px dashed var(--red);
    border-radius: 50%; animation: v6-spin 60s linear infinite;
  }
  .v6-ring { position: absolute; inset: 0; animation: v6-spin 36s linear infinite; }
  .v6-node {
    position: absolute; top: 50%; left: 50%; width: 72px; height: 72px; margin: -36px;
    transform: rotate(var(--a)) translate(var(--v6-r));
    background: var(--v6-card); border: 2px solid var(--v6-fg); border-radius: 4px; overflow: hidden;
  }
  .v6-node img { width: 100%; height: 100%; object-fit: cover; }
  .v6-core {
    position: absolute; top: 50%; left: 50%; translate: -50% -50%;
    width: 38%; aspect-ratio: 1; border-radius: 50%;
    background: var(--red); color: var(--paper);
    display: grid; place-content: center; gap: 0.15rem; text-align: center;
    font-family: var(--font-mono);
  }
  .v6-core strong { font-size: 0.85rem; letter-spacing: 0.14em; }
  .v6-core em { font-style: normal; font-size: 0.62rem; letter-spacing: 0.1em; opacity: 0.9; }
  .v6-rec { width: 0.65rem; height: 0.65rem; border-radius: 50%; background: var(--paper); margin: 0 auto; animation: v6-blink 1.4s steps(2, start) infinite; }
  .v6-orbit-cap { font-family: var(--font-mono); font-size: 0.72rem; color: var(--v6-mut); text-align: center; max-width: 38ch; margin: 0; }
  @keyframes v6-spin { to { transform: rotate(360deg); } }
  @keyframes v6-blink { 50% { opacity: 0.25; } }

  /* scoreboard */
  .v6-board { list-style: none; margin: 0; padding: 0; border: 2px solid var(--v6-fg); border-radius: 4px; overflow: hidden; }
  .v6-row {
    display: grid; grid-template-columns: 4rem 1fr 1.2fr 3rem; gap: 1rem; align-items: center;
    padding: 1.25rem 1.25rem; border-bottom: 2px solid var(--v6-fg);
    background: var(--v6-card); transition: background 0.18s ease-out, color 0.18s ease-out;
  }
  .v6-row:last-child { border-bottom: 0; }
  .v6-row:hover { background: var(--v6-inv-bg); color: var(--v6-inv-fg); }
  .v6-row:hover .v6-row-desc, .v6-row:hover .v6-row-main p { color: inherit; }
  .v6-row:hover .v6-arrow { color: var(--red); translate: 4px 0; }
  .v6-root.dark .v6-row:hover .v6-arrow { color: var(--red-deep); }
  .v6-idx { font-family: var(--font-mono); font-weight: 700; font-size: 0.85rem; }
  .v6-row-main h3 { font-family: var(--font-display); font-size: clamp(1.15rem, 2.6vw, 1.7rem); margin: 0; letter-spacing: 0; }
  .v6-row-main p { font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.05em; color: var(--v6-mut); margin: 0.3rem 0 0; }
  .v6-row-desc { font-size: 0.92rem; line-height: 1.55; margin: 0; max-width: 65ch; }
  .v6-arrow { font-family: var(--font-mono); font-size: 1.4rem; color: var(--red-deep); transition: translate 0.18s ease-out; }
  .v6-root.dark .v6-arrow { color: var(--red); }

  /* passes rail */
  .v6-passes { max-width: none; padding-left: 0; padding-right: 0; }
  .v6-passes .v6-sec-head { max-width: 76rem; margin-left: auto; margin-right: auto; padding-left: 1.5rem; padding-right: 1.5rem; }
  .v6-tuner {
    max-width: 76rem; margin: 0 auto 1rem; padding: 0 1.5rem;
    display: flex; flex-wrap: wrap; gap: 0.5rem;
  }
  .v6-tuner button {
    font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.06em;
    background: transparent; color: var(--v6-fg);
    border: 2px solid var(--v6-fg); border-radius: 4px;
    padding: 0.5rem 0.8rem; cursor: pointer;
  }
  .v6-tuner button:hover { border-color: var(--red-deep); color: var(--red-deep); }
  .v6-tuner button.active { background: var(--red-deep); border-color: var(--red-deep); color: var(--paper); }
  .v6-root.dark .v6-tuner button:hover { border-color: var(--red); color: var(--red); }
  .v6-railx {
    display: flex; gap: 1rem; overflow-x: auto; list-style: none;
    margin: 0; padding: 0.25rem max(1.5rem, calc((100vw - 76rem) / 2 + 1.5rem)) 0.75rem;
    scroll-snap-type: x proximity;
    scrollbar-color: var(--v6-fg) transparent; scrollbar-width: thin;
  }
  .v6-railx > li { flex: 0 0 min(300px, 82vw); scroll-snap-align: start; }
  .v6-pass {
    display: grid; gap: 0.45rem; width: 100%; height: 100%; text-align: left;
    background: var(--v6-card); color: var(--v6-fg);
    border: 2px solid var(--v6-fg); border-top: 6px solid var(--red);
    padding: 1.1rem 1.1rem 1.25rem; cursor: pointer; font-family: var(--font-body);
  }
  .v6-pass:hover { background: var(--v6-inv-bg); color: var(--v6-inv-fg); }
  .v6-pass.active { background: var(--v6-inv-bg); color: var(--v6-inv-fg); border-color: var(--v6-inv-bg); border-top-color: var(--red); }
  .v6-pass-no { font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.1em; }
  .v6-pass strong { font-family: var(--font-display); font-size: 1.5rem; }
  .v6-pass-note { font-family: var(--font-mono); font-size: 0.75rem; color: var(--red-deep); }
  .v6-root.dark .v6-pass-note { color: var(--paper); }
  .v6-pass:hover .v6-pass-note, .v6-pass.active .v6-pass-note { color: inherit; }
  .v6-pass-body { font-size: 0.88rem; line-height: 1.6; }
  .v6-pass-state { font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.1em; margin-top: 0.35rem; }

  /* plate wall — uneven poster pins */
  .v6-wall { display: grid; grid-template-columns: repeat(12, 1fr); gap: 1rem; align-items: start; }
  .v6-plate {
    margin: 0; grid-column: span 4;
    background: var(--v6-card); border: 2px solid var(--v6-fg); border-radius: 4px; overflow: hidden;
  }
  .v6-plate[data-big] { grid-column: span 8; }
  .v6-plate img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-bottom: 2px solid var(--v6-fg); }
  .v6-plate[data-big] img { aspect-ratio: 16 / 8; }
  .v6-plate figcaption {
    display: flex; justify-content: space-between; align-items: baseline; gap: 0.75rem;
    padding: 0.7rem 0.9rem;
  }
  .v6-plate figcaption strong { font-family: var(--font-display); font-size: 1rem; }
  .v6-plate figcaption span { font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.06em; color: var(--v6-mut); text-align: right; }

  /* ticker */
  .v6-ticker {
    margin-top: 4rem; background: var(--red-deep); color: var(--paper);
    border-top: 3px solid var(--red-deep); border-bottom: 3px solid var(--red-deep);
    overflow: hidden;
  }
  .v6-ticker-track {
    display: flex; gap: 2.5rem; width: max-content; padding: 0.8rem 0;
    font-family: var(--font-display); font-size: 1rem; letter-spacing: 0.06em; white-space: nowrap;
    animation: v6-marquee 26s linear infinite;
  }
  @keyframes v6-marquee { to { transform: translateX(-50%); } }

  /* contact */
  .v6-contact { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; padding-bottom: 4rem; align-items: start; }
  .v6-contact h2 { font-family: var(--font-display); font-size: clamp(2.2rem, 6vw, 4rem); margin: 0; text-wrap: balance; }
  .v6-contact-lines { display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; font-family: var(--font-mono); font-size: 0.85rem; margin: 1.25rem 0 0; }
  .v6-contact-lines a { color: var(--v6-fg); }
  .v6-contact-lines a:hover { color: var(--red-deep); }
  .v6-root.dark .v6-contact-lines a:hover { color: var(--red); }
  .v6-form {
    display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
    border: 2px solid var(--v6-fg); border-radius: 4px; padding: 1.25rem;
    background: var(--v6-card);
  }
  .v6-form label { display: block; font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.4rem; }
  .v6-form input, .v6-form textarea {
    width: 100%; box-sizing: border-box;
    font-family: var(--font-body); font-size: 0.95rem;
    color: var(--v6-fg); background: var(--v6-bg);
    border: 2px solid var(--v6-fg); border-radius: 4px; padding: 0.65rem 0.75rem;
  }
  .v6-form-full { grid-column: 1 / -1; }
  .v6-form-row { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; }
  .v6-sent { font-family: var(--font-mono); font-size: 0.8rem; margin: 0; }

  /* footer */
  .v6-foot {
    background: var(--navy); color: var(--paper);
    border-top: 4px solid var(--red);
    padding: 2.5rem 1.5rem 5rem;
    display: grid; gap: 0.6rem; justify-items: center; text-align: center;
  }
  .v6-foot .v6-word { color: var(--paper); }
  .v6-foot p { margin: 0; font-size: 0.9rem; max-width: 65ch; }
  .v6-foot-links a { color: var(--paper); font-family: var(--font-mono); font-size: 0.8rem; }
  .v6-foot-links a:hover { color: var(--red); }
  .v6-foot-small { font-family: var(--font-mono); font-size: 0.72rem; opacity: 0.8; }

  ::selection { background: var(--red); color: var(--paper); }

  @media (max-width: 900px) {
    .v6-hero-grid { grid-template-columns: 1fr; }
    .v6-row { grid-template-columns: 3rem 1fr 2.5rem; }
    .v6-row-desc { grid-column: 2 / 4; }
    .v6-contact { grid-template-columns: 1fr; }
  }
  @media (max-width: 560px) {
    .v6-nav { display: none; }
    .v6-mast { padding: 0.65rem 0.75rem; gap: 0.6rem; }
    .v6-word { font-size: 1.1rem; }
    .v6-mast-actions { gap: 0.4rem; }
    .v6-toggle { padding: 0.4rem 0.5rem; font-size: 0.68rem; }
    .v6-cta { padding: 0.5rem 0.65rem; font-size: 0.7rem; white-space: nowrap; }
    .v6-cta-lg { font-size: 0.85rem; padding: 0.75rem 1.1rem; }
    .v6-sec { padding: 2.5rem 1rem 0; }
    .v6-hero { padding: 2rem 1rem; }
    .v6-plate, .v6-plate[data-big] { grid-column: 1 / -1; }
    .v6-plate img, .v6-plate[data-big] img { aspect-ratio: 4 / 3; }
    .v6-form { grid-template-columns: 1fr; }
    .v6-node { width: 56px; height: 56px; margin: -28px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .v6-halo, .v6-ring, .v6-ticker-track, .v6-rec { animation: none !important; }
    .v6-ticker-track { width: auto; flex-wrap: wrap; }
    .v6-row:hover .v6-arrow { translate: none; }
  }
</style>
