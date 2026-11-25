<script>
  import { onMount } from "svelte";
  import { studio, services, works, pipeline, img } from "../lib/data.js";
  import { reveal } from "../lib/reveal.js";

  let root = $state();
  let dark = $state(false);
  let progress = $state(0);
  let hoverId = $state(services[0].id);
  let form = $state({ name: "", email: "", details: "" });
  let sent = $state(false);
  let statusEl = $state();

  const mail = `mailto:${studio.email}`;
  const active = $derived(services.find((s) => s.id === hoverId) ?? services[0]);

  // Generative radial dot-thread diagram (Sequen-inspired), deterministic.
  // Colors route through theme vars so the indigo-ink ring stays legible on the dark plate.
  const CX = 200, CY = 200;
  const RINGS = [
    { r: 46, n: 8, c: "var(--red)" },
    { r: 86, n: 14, c: "var(--dia-ink)" },
    { r: 126, n: 20, c: "var(--dia-mid)" },
    { r: 164, n: 28, c: "var(--red)" },
  ];
  const dots = RINGS.flatMap((ring, ri) =>
    Array.from({ length: ring.n }, (_, i) => {
      const a = (i / ring.n) * Math.PI * 2 + ri * 0.32;
      return {
        x: CX + Math.cos(a) * ring.r,
        y: CY + Math.sin(a) * ring.r,
        c: ring.c,
        big: (i + ri) % 5 === 0,
      };
    })
  );
  const spokes = dots.filter((_, i) => i % 4 === 0);
  const cross = dots.filter((_, i) => i % 7 === 0);

  function onSubmit(event) {
    event.preventDefault();
    const subject = encodeURIComponent(`Project inquiry — ${form.name}`);
    const body = encodeURIComponent(`${form.details}\n\nFrom: ${form.name} <${form.email}>`);
    window.location.href = `${mail}?subject=${subject}&body=${body}`;
    sent = true;
    setTimeout(() => statusEl?.focus(), 0);
  }

  onMount(() => {
    if (!root) return;
    const stop = reveal(root);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      stop();
    };
  });
</script>

<div class="v5-root" class:dark={dark} bind:this={root}>
  <a class="v5-skip" href="#v5-main">Skip to content</a>
  <div class="v5-progress" style={`transform:scaleX(${progress})`} aria-hidden="true"></div>

  <header class="v5-mast">
    <div class="v5-mast-top">
      <span>Atelier Index — Vol. 01</span>
      <span class="v5-mast-loc">{studio.location}</span>
      <button
        type="button"
        class="v5-darkbtn"
        aria-pressed={dark}
        aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
        onclick={() => (dark = !dark)}
      >
        <span class="v5-darkbtn-dot" aria-hidden="true"></span>{dark ? "Light" : "Dark"}
      </button>
    </div>
    <div class="v5-mast-bar">
      <a class="v5-word" href="#v5-top" aria-label="{studio.full} — back to top">{studio.name}<span aria-hidden="true">.</span></a>
      <nav class="v5-mast-nav" aria-label="Primary">
        <a href="#v5-services">Services</a>
        <a href="#v5-pipeline">Pipeline</a>
        <a href="#v5-archive">Archive</a>
        <a href="#v5-contact">Contact</a>
      </nav>
      <a class="v5-start" href={mail}>Start a project</a>
    </div>
  </header>

  <main id="v5-main">
    <section class="v5-hero" id="v5-top" aria-labelledby="v5-h1">
      <div class="v5-hero-left">
        <h1 id="v5-h1" class="rv">Concept<br />to printed<br />object<span aria-hidden="true">.</span></h1>
        <p class="v5-folio rv">Fig. 01 — {studio.full} · {studio.tagline} · {studio.domain}</p>
        <p class="v5-lede rv">2D concept, 3D, CAD and print under one roof. This sheet is the studio index — four disciplines, five passes, six plates. Read it top to bottom, then start a brief.</p>
        <ol class="v5-toc rv">
          <li><a href="#v5-services"><b>01</b>Services<i>Four disciplines</i></a></li>
          <li><a href="#v5-pipeline"><b>02</b>Pipeline<i>Five passes</i></a></li>
          <li><a href="#v5-archive"><b>03</b>Archive<i>Six plates</i></a></li>
          <li><a href="#v5-contact"><b>04</b>Contact<i>Start a brief</i></a></li>
        </ol>
        <p class="v5-hero-act rv"><a class="v5-start v5-start-big" href={mail}>Start a project</a></p>
      </div>
      <figure class="v5-fig rv" aria-label="Generative radial dot-thread diagram in studio red and indigo">
        <svg viewBox="0 0 400 400" role="img" aria-hidden="true">
          {#each RINGS as ring}
            <circle cx={CX} cy={CY} r={ring.r} fill="none" style={`stroke:${ring.c}`} stroke-width="1" stroke-dasharray="2 5" opacity="0.55" />
          {/each}
          {#each spokes as d}
            <line x1={CX} y1={CY} x2={d.x} y2={d.y} style="stroke:var(--dia-ink)" stroke-width="1" opacity="0.35" />
          {/each}
          {#each cross as d, i}
            {#if cross[i + 1]}
              <line x1={d.x} y1={d.y} x2={cross[i + 1].x} y2={cross[i + 1].y} style="stroke:var(--red)" stroke-width="1" opacity="0.5" />
            {/if}
          {/each}
          <circle cx={CX} cy={CY} r="10" style="fill:var(--red)" />
          <circle cx={CX} cy={CY} r="22" fill="none" style="stroke:var(--red)" stroke-width="2" />
          {#each dots as d}
            <circle cx={d.x} cy={d.y} r={d.big ? 4.5 : 2.4} style={`fill:${d.c}`} />
          {/each}
        </svg>
        <figcaption><strong>Fig. 01</strong><span>Red thread, concept to object — drawn live in SVG, no image files.</span></figcaption>
      </figure>
    </section>

    <div class="v5-rule" aria-hidden="true"></div>

    <div class="v5-marquee" aria-hidden="true">
      <div class="v5-marquee-track"><span>Concept to printed object — 2D · 3D · CAD · Print —&nbsp;</span><span>Concept to printed object — 2D · 3D · CAD · Print —&nbsp;</span></div>
    </div>

    <section class="v5-block" id="v5-services" aria-labelledby="v5-svc-h">
      <div class="v5-split">
        <div class="v5-rail">
          <div class="v5-stick">
            <h2 id="v5-svc-h" class="rv"><span aria-hidden="true">01/</span>Four disciplines, one roof</h2>
            <p class="v5-sub rv">Hover or focus a row to pull its plate. The same hands draw, model, engineer and print — no handoffs.</p>
            <figure class="v5-plate-card rv" aria-live="polite">
              {#key active.id}
                <img src={img(active.img)} alt="{active.title} — placeholder artwork" loading="lazy" />
              {/key}
              <figcaption><strong>{active.index} — {active.title}</strong><span>{active.tag}</span></figcaption>
            </figure>
          </div>
        </div>
        <ol class="v5-svc">
          {#each services as s}
            <li class="rv">
              <button
                type="button"
                class:v5-on={hoverId === s.id}
                aria-current={hoverId === s.id ? "true" : undefined}
                onmouseenter={() => (hoverId = s.id)}
                onfocus={() => (hoverId = s.id)}
                onclick={() => (hoverId = s.id)}
              >
                <span class="v5-svc-no" aria-hidden="true">{s.index}</span>
                <span class="v5-svc-tx">
                  <strong>{s.title}</strong>
                  <em>{s.tag}</em>
                  <span>{s.desc}</span>
                  <span class="v5-svc-now" aria-hidden="true">Showing plate above</span>
                  <span class="v5-svc-thumb" aria-hidden="true"><img src={img(s.img)} alt="" loading="lazy" /></span>
                </span>
                <span class="v5-svc-go" aria-hidden="true"><svg viewBox="0 0 12 12" width="14" height="14" focusable="false"><path d="M2 10 10 2M3.5 2H10V8.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg></span>
              </button>
            </li>
          {/each}
        </ol>
      </div>
    </section>

    <section class="v5-block" id="v5-pipeline" aria-labelledby="v5-pipe-h">
      <div class="v5-split">
        <div class="v5-rail">
          <div class="v5-stick">
            <h2 id="v5-pipe-h" class="rv"><span aria-hidden="true">02/</span>Five passes, one object</h2>
            <p class="v5-sub rv">The ledger stays pinned while the passes scroll. Sketch is cheap, print is truth — nothing skips a row.</p>
            <p class="v5-ledger-no rv" aria-hidden="true">05 entries · 01 team</p>
          </div>
        </div>
        <ol class="v5-ledger">
          {#each pipeline as p, i}
            <li class="rv">
              <span class="v5-ledger-fig" aria-hidden="true">P.{i + 1}</span>
              <div>
                <h3>{p.step} <small>/ {p.note}</small></h3>
                <p>{p.body}</p>
              </div>
            </li>
          {/each}
        </ol>
      </div>
    </section>

    <section class="v5-block" id="v5-archive" aria-labelledby="v5-arch-h">
      <h2 id="v5-arch-h" class="rv"><span aria-hidden="true">03/</span>Archive of plates</h2>
      <p class="v5-sub v5-sub-wide rv">A contact sheet in ledger form — plates sit at different sizes like pinned prints, not equal cards.</p>
      <ol class="v5-plates">
        {#each works as w, i}
          <li class="rv" class:v5-wide={i % 3 === 0}>
            <figure>
              <img src={img(w.img)} alt="{w.title} — placeholder artwork" loading={i < 2 ? "eager" : "lazy"} />
              <figcaption><strong>Pl. {String(i + 1).padStart(2, "0")} — {w.title}</strong><span>{w.type}</span></figcaption>
            </figure>
          </li>
        {/each}
      </ol>
      <p class="v5-honest rv">Artwork shown is placeholder SVG; real studio work replaces it. No clients, quotes or prices are shown because none are published yet.</p>
    </section>

    <section class="v5-block v5-contact" id="v5-contact" aria-labelledby="v5-con-h">
      <div class="v5-split">
        <div class="v5-rail">
          <h2 id="v5-con-h" class="rv"><span aria-hidden="true">04/</span>Have something to build?</h2>
          <p class="v5-sub rv">Send the subject, size and deadline. We reply from {studio.email}.</p>
          <p class="v5-mail rv"><a href={mail}>{studio.email}</a></p>
          <p class="v5-mail rv"><a href={studio.instagram} target="_blank" rel="noreferrer">Instagram ↗</a></p>
        </div>
        <form class="v5-form rv" onsubmit={onSubmit}>
          <p class="v5-form-no">New inquiry — opens in your mail app</p>
          <label for="v5-name">Name</label>
          <input id="v5-name" autocomplete="name" required bind:value={form.name} />
          <label for="v5-email">Email</label>
          <input id="v5-email" type="email" autocomplete="email" required bind:value={form.email} />
          <label for="v5-details">What are we making?</label>
          <textarea id="v5-details" rows="5" required placeholder="Subject, size, deadline" bind:value={form.details}></textarea>
          <button type="submit">Send inquiry →</button>
          <p class="v5-done" class:v5-show={sent} role="status" tabindex="-1" bind:this={statusEl}>
            {#if sent}Your mail app should open with the brief. If not, <a href={mail}>email {studio.email}</a>.{/if}
          </p>
        </form>
      </div>
    </section>
  </main>

  <footer class="v5-foot">
    <p class="v5-foot-word" aria-hidden="true">{studio.name}</p>
    <nav class="v5-foot-nav" aria-label="Footer">
      <a href="#v5-services">Services</a>
      <a href="#v5-pipeline">Pipeline</a>
      <a href="#v5-archive">Archive</a>
      <a href="#v5-contact">Contact</a>
      <a href={studio.instagram} target="_blank" rel="noreferrer">Instagram</a>
    </nav>
    <p class="v5-colophon">{studio.location}. Set in Archivo Black, Space Grotesk, Space Mono. © 2026 {studio.domain}.</p>
  </footer>
</div>

<style>
  .v5-root {
    --bg: var(--paper);
    --fg: var(--ink);
    --line: var(--line-light);
    --mut: #55526e;
    --card: #fffdf7;
    --dia-ink: var(--indigo);
    --dia-mid: var(--violet);
    --red-ink: var(--red-deep);
    color-scheme: light;
    scrollbar-color: var(--mut) var(--bg);
    position: relative;
    min-height: 100vh;
    background: var(--bg);
    color: var(--fg);
    font-family: var(--font-body);
    overflow-x: clip;
  }
  .v5-root.dark {
    --bg: var(--navy);
    --fg: var(--paper);
    --line: var(--line-dark);
    --mut: #b9b4d6;
    --card: var(--indigo);
    --dia-ink: var(--paper);
    --dia-mid: #c9bde8;
    --red-ink: #ff8385;
    color-scheme: dark;
    scrollbar-color: var(--mut) var(--bg);
  }
  .v5-root a { color: inherit; text-underline-offset: 3px; }
  .v5-root :focus-visible { outline: 2px solid var(--red); outline-offset: 3px; }
  .v5-root ::selection { background: var(--red); color: var(--paper); }
  .v5-skip {
    position: fixed; top: 0.5rem; left: 0.5rem; z-index: 300;
    padding: 0.6rem 0.9rem; background: var(--fg); color: var(--bg);
    font-family: var(--font-mono); font-size: 0.8rem; text-decoration: none;
    transform: translateY(-250%);
  }
  .v5-skip:focus { transform: none; }
  .v5-progress {
    position: fixed; top: 0; left: 0; right: 0; height: 3px; z-index: 310;
    background: var(--red); transform-origin: 0 50%; pointer-events: none;
  }
  .v5-mast { position: sticky; top: 0; z-index: 100; background: var(--bg); border-bottom: 1px solid var(--line); }
  .v5-mast-top {
    display: flex; align-items: center; gap: 1rem;
    padding: 0.45rem clamp(1rem, 4vw, 2.5rem);
    border-bottom: 1px solid var(--line);
    font-family: var(--font-mono); font-size: 0.64rem; text-transform: uppercase; letter-spacing: 0.14em;
    color: var(--mut);
  }
  .v5-mast-loc { margin-left: auto; }
  .v5-darkbtn {
    display: inline-flex; align-items: center; gap: 0.45rem;
    background: transparent; color: var(--fg); cursor: pointer;
    border: 1px solid var(--line); border-radius: 4px; padding: 0.4rem 0.65rem;
    font-family: var(--font-mono); font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.08em;
  }
  .v5-darkbtn:hover { border-color: var(--red); }
  .v5-darkbtn-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--red); }
  .v5-mast-bar {
    display: flex; align-items: center; gap: 1.5rem;
    max-width: 76rem; margin: 0 auto; padding: 0.6rem clamp(1rem, 4vw, 2.5rem);
  }
  .v5-word { font-family: var(--font-display); font-size: 1.25rem; text-decoration: none; letter-spacing: 0.02em; }
  .v5-word span { color: var(--red); }
  .v5-mast-nav { display: flex; gap: 1.3rem; margin-left: auto; }
  .v5-mast-nav a { font-family: var(--font-mono); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; text-decoration: none; }
  .v5-mast-nav a:hover { color: var(--red-ink); }
  .v5-start {
    background: var(--red-deep); color: var(--paper) !important; text-decoration: none;
    font-family: var(--font-mono); font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;
    padding: 0.55rem 0.85rem; border-radius: 4px; white-space: nowrap;
  }
  .v5-start:hover { background: var(--red); }
  .v5-start-big { display: inline-block; padding: 0.7rem 1rem; }
  .v5-hero {
    max-width: 76rem; margin: 0 auto;
    padding: clamp(0.75rem, 1.5vw, 1.25rem) clamp(1rem, 4vw, 2.5rem) 0;
    display: grid; grid-template-columns: 1.1fr 0.9fr; gap: clamp(1.25rem, 3vw, 2.5rem); align-items: center;
  }
  .v5-hero h1 {
    margin: 0; font-family: var(--font-display);
    font-size: clamp(2.6rem, 6vw, 5.6rem); line-height: 0.9; letter-spacing: -0.03em; text-transform: uppercase;
    text-wrap: balance;
  }
  .v5-folio { font-family: var(--font-mono); font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--mut); margin: 0.5rem 0 0; }
  .v5-lede { margin: 0.5rem 0 0; font-size: 0.95rem; line-height: 1.5; max-width: 44ch; }
  .v5-toc { list-style: none; margin: 0.8rem 0 0; padding: 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); display: grid; grid-template-columns: repeat(4, 1fr); }
  .v5-toc a { display: grid; gap: 0.15rem; padding: 0.55rem 0.8rem; text-decoration: none; border-left: 1px solid var(--line); font-family: var(--font-display); font-size: 0.95rem; text-transform: uppercase; }
  .v5-toc li:first-child a { border-left: 0; }
  .v5-toc b { font-family: var(--font-mono); font-weight: 400; font-size: 0.66rem; color: var(--red-ink); }
  .v5-toc i { font-family: var(--font-mono); font-style: normal; font-size: 0.62rem; color: var(--mut); text-transform: uppercase; letter-spacing: 0.06em; }
  .v5-toc a:hover { background: var(--fg); color: var(--bg); }
  .v5-hero-act { margin: 0.9rem 0 0; }
  .v5-fig { margin: 0; border: 1px solid var(--line); border-radius: 4px; background: var(--card); overflow: hidden; align-self: start; }
  .v5-fig svg { display: block; width: 100%; height: auto; max-height: 46vh; animation: v5-spin 90s linear infinite; }
  .v5-fig figcaption { display: flex; gap: 0.6rem; padding: 0.7rem 0.9rem; border-top: 1px solid var(--line); font-family: var(--font-mono); font-size: 0.66rem; line-height: 1.5; }
  .v5-fig figcaption strong { color: var(--red-ink); }
  .v5-rule { height: 3px; background: var(--red); margin-top: 1rem; }
  .v5-marquee { border-bottom: 1px solid var(--line); overflow: hidden; padding: 0.6rem 0; }
  .v5-marquee-track { display: flex; width: max-content; animation: v5-tick 30s linear infinite; font-family: var(--font-mono); font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.2em; color: var(--mut); font-variant-numeric: tabular-nums; }
  .v5-block { max-width: 76rem; margin: 0 auto; padding: clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 2.5rem) 0; }
  .v5-block h2 { margin: 0 0 0.7rem; font-family: var(--font-display); font-size: clamp(1.7rem, 3.6vw, 2.6rem); line-height: 1; text-transform: uppercase; letter-spacing: -0.02em; text-wrap: balance; }
  .v5-block h2 span { color: var(--red-ink); font-family: var(--font-mono); font-size: 0.85rem; vertical-align: super; letter-spacing: 0.1em; }
  .v5-sub { margin: 0 0 1rem; line-height: 1.6; color: var(--mut); max-width: 36ch; }
  .v5-sub-wide { max-width: 60ch; }
  .v5-split { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: clamp(1.5rem, 4vw, 3.5rem); align-items: start; }
  .v5-stick { position: sticky; top: 7.5rem; }
  .v5-plate-card { margin: 1.2rem 0 0; border: 1px solid var(--line); border-radius: 4px; background: var(--card); overflow: hidden; }
  .v5-plate-card img { display: block; width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }
  .v5-plate-card figcaption { display: grid; gap: 0.15rem; padding: 0.7rem 0.8rem; border-top: 1px solid var(--line); font-family: var(--font-mono); font-size: 0.68rem; }
  .v5-plate-card figcaption span { color: var(--mut); }
  .v5-svc { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--line); }
  .v5-svc button {
    display: grid; grid-template-columns: 3rem 1fr auto; gap: 1rem; align-items: start;
    width: 100%; text-align: left; background: transparent; color: inherit; cursor: pointer;
    border: 0; border-bottom: 1px solid var(--line); padding: 1.3rem 0.6rem; font: inherit;
  }
  .v5-svc button:hover, .v5-svc button:focus-visible, .v5-svc button.v5-on { background: var(--card); }
  .v5-svc-no { font-family: var(--font-display); font-size: 1.4rem; color: var(--mut); }
  .v5-svc button:hover .v5-svc-no, .v5-svc button.v5-on .v5-svc-no { color: var(--red); }
  .v5-svc-tx { display: grid; gap: 0.25rem; }
  .v5-svc-tx strong { font-family: var(--font-display); font-weight: 400; font-size: 1.2rem; text-transform: uppercase; }
  .v5-svc-tx em { font-family: var(--font-mono); font-style: normal; font-size: 0.64rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--mut); }
  .v5-svc-tx span { line-height: 1.6; font-size: 0.92rem; max-width: 52ch; }
  .v5-svc-go { color: var(--mut); display: inline-flex; }
  .v5-svc-go svg { display: block; }
  .v5-svc-now { display: none; font-family: var(--font-mono); font-size: 0.64rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--red-ink); }
  .v5-svc-thumb { display: none; }
  .v5-ledger-no { font-family: var(--font-mono); font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--mut); margin: 0; }
  .v5-ledger { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--line); }
  .v5-ledger li { display: grid; grid-template-columns: 3.5rem 1fr; gap: 1.2rem; padding: 1.5rem 0.4rem; border-bottom: 1px solid var(--line); }
  .v5-ledger li:hover { background: var(--card); }
  .v5-ledger-fig { font-family: var(--font-display); font-size: 1.5rem; color: var(--line); }
  .v5-ledger li:hover .v5-ledger-fig { color: var(--red); }
  .v5-ledger h3 { margin: 0 0 0.5rem; font-family: var(--font-display); font-weight: 400; font-size: 1.25rem; text-transform: uppercase; }
  .v5-ledger h3 small { font-family: var(--font-mono); font-size: 0.64rem; color: var(--mut); letter-spacing: 0.06em; }
  .v5-ledger p { margin: 0; line-height: 1.65; font-size: 0.92rem; max-width: 56ch; }
  .v5-plates { list-style: none; margin: 1.5rem 0 0; padding: 0; display: grid; grid-template-columns: repeat(6, 1fr); gap: 1rem; align-items: start; }
  .v5-plates li { grid-column: span 2; }
  .v5-plates li.v5-wide { grid-column: span 3; }
  .v5-plates figure { margin: 0; border: 1px solid var(--line); border-radius: 4px; background: var(--card); overflow: hidden; }
  .v5-plates li:nth-child(even) { transform: translateY(1.2rem); }
  .v5-plates img { display: block; width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }
  .v5-wide img { aspect-ratio: 16 / 9; }
  .v5-plates figcaption { display: grid; gap: 0.15rem; padding: 0.65rem 0.75rem; border-top: 1px solid var(--line); font-family: var(--font-mono); font-size: 0.66rem; }
  .v5-plates figcaption span { color: var(--mut); }
  .v5-honest { margin: 2.4rem 0 0; font-family: var(--font-mono); font-size: 0.68rem; line-height: 1.6; color: var(--mut); max-width: 70ch; }
  .v5-contact { padding-bottom: clamp(3rem, 6vw, 5rem); }
  .v5-mail { margin: 0 0 0.5rem; }
  .v5-form { border: 1px solid var(--line); border-radius: 4px; background: var(--card); padding: 1.2rem; }
  .v5-form-no { margin: 0 0 0.6rem; padding-bottom: 0.6rem; border-bottom: 1px solid var(--line); font-family: var(--font-mono); font-size: 0.64rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--mut); }
  .v5-form label { display: block; margin: 0.9rem 0 0.35rem; font-family: var(--font-mono); font-size: 0.64rem; text-transform: uppercase; letter-spacing: 0.08em; }
  .v5-form input, .v5-form textarea { display: block; width: 100%; box-sizing: border-box; padding: 0.7rem; background: var(--bg); color: var(--fg); border: 1px solid var(--line); border-radius: 4px; font: inherit; caret-color: var(--red); }
  .v5-form input::placeholder, .v5-form textarea::placeholder { color: var(--mut); opacity: 1; }
  .v5-form textarea { resize: vertical; }
  .v5-form button { width: 100%; margin-top: 1.1rem; padding: 0.85rem; background: var(--red-deep); color: var(--paper); border: 0; border-radius: 4px; font-family: var(--font-mono); font-size: 0.76rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; cursor: pointer; }
  .v5-form button:hover { background: var(--red); }
  .v5-done { margin: 0; font-size: 0.85rem; line-height: 1.5; }
  .v5-done.v5-show { margin-top: 1rem; }
  .v5-foot { border-top: 1px solid var(--line); padding: 2.5rem clamp(1rem, 4vw, 2.5rem); }
  .v5-foot-word { margin: 0; font-family: var(--font-display); font-size: clamp(3rem, 12vw, 8rem); line-height: 0.9; letter-spacing: -0.03em; }
  .v5-foot-nav { display: flex; flex-wrap: wrap; gap: 1.2rem; margin-top: 1.2rem; }
  .v5-foot-nav a { font-family: var(--font-mono); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; text-decoration: none; }
  .v5-foot-nav a:hover { color: var(--red); }
  .v5-colophon { margin: 1rem 0 0; padding-top: 1rem; border-top: 1px solid var(--line); font-family: var(--font-mono); font-size: 0.66rem; line-height: 1.6; color: var(--mut); }
  @keyframes v5-tick { to { transform: translateX(-50%); } }
  @keyframes v5-spin { to { transform: rotate(360deg); } }
  @media (max-width: 900px) {
    .v5-hero, .v5-split { grid-template-columns: 1fr; }
    .v5-stick { position: static; }
    .v5-toc { grid-template-columns: 1fr 1fr; }
    .v5-toc li:nth-child(3) a { border-left: 0; }
    .v5-toc a { border-top: 1px solid var(--line); }
    .v5-toc li:nth-child(1) a, .v5-toc li:nth-child(2) a { border-top: 0; }
    .v5-plates li, .v5-plates li.v5-wide { grid-column: span 3; }
    .v5-plates li:nth-child(even) { transform: none; }
  }
  @media (max-width: 640px) {
    .v5-mast-nav, .v5-mast-loc { display: none; }
    .v5-mast-bar { gap: 1rem; }
    .v5-start { margin-left: auto; }
    .v5-toc { grid-template-columns: 1fr; }
    .v5-toc a { border-left: 0; border-top: 1px solid var(--line); }
    .v5-toc li:first-child a { border-top: 0; }
    .v5-plates li, .v5-plates li.v5-wide { grid-column: 1 / -1; }
    .v5-svc button { grid-template-columns: 2.2rem 1fr; }
    .v5-svc-go { display: none; }
    .v5-svc button.v5-on .v5-svc-now { display: block; }
    .v5-svc button.v5-on .v5-svc-thumb { display: block; margin-top: 0.7rem; }
    .v5-svc-thumb img { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; border-radius: 4px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .v5-marquee-track, .v5-fig svg { animation: none; }
  }
</style>
