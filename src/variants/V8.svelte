<!-- V8 · Studio OS: solid dark, fixed rail, discipline index, process ledger. No glass. -->
<script>
  import { onMount } from "svelte";
  import { studio, services, works, pipeline, img } from "../lib/data.js";
  import { reveal } from "../lib/reveal.js";

  let active = $state(0);
  let openStep = $state(0);
  let progress = $state(0);

  const pad = (n) => String(n).padStart(2, "0");

  onMount(() => {
    const stopReveal = reveal(document.querySelector(".v8"));
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      progress = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      stopReveal();
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  });
</script>

<div class="v8" id="top">
  {#snippet arrow()}
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" />
    </svg>
  {/snippet}

  <div class="v8-progress" aria-hidden="true">
    <span style="transform: scaleX({progress})"></span>
  </div>

  <aside class="v8-rail" aria-label="Studio index">
    <a class="v8-brand" href="#top" aria-label="CATRED Studio, back to top">
      CATRED<span>®</span>
    </a>
    <p class="v8-rail-note">Concept to<br />printed object.</p>
    <nav class="v8-nav" aria-label="Sections">
      <a href="#work"><span>01</span>Work</a>
      <a href="#services"><span>02</span>Disciplines</a>
      <a href="#process"><span>03</span>Process</a>
      <a href="#studio"><span>04</span>Studio</a>
      <a href="#contact"><span>05</span>Contact</a>
    </nav>
    <div class="v8-rail-foot">
      <p><span class="v8-dot" aria-hidden="true"></span>{studio.location}</p>
      <a href="mailto:{studio.email}">{studio.email}</a>
      <a href={studio.instagram} target="_blank" rel="noreferrer">Instagram</a>
    </div>
  </aside>

  <main class="v8-main">
    <div class="v8-marquee" aria-hidden="true">
      <div class="v8-marquee-track">
        {#each [0, 1] as copy}
          <span>{studio.full}</span><b></b>
          <span>{studio.tagline}</span><b></b>
          <span>2D · 3D · CAD · PRINT</span><b></b>
        {/each}
      </div>
    </div>

    <section class="v8-hero" id="services" aria-labelledby="v8-hero-title">
      <div class="v8-hero-copy">
        <h1 id="v8-hero-title" class="v8-wordmark" aria-label="CATRED Studio">
          <span class="v8-wordmark-name">
            {studio.name}<span class="v8-wordmark-dot" aria-hidden="true">.</span>
          </span>
          <span class="v8-wordmark-sub">Studio</span>
        </h1>
        <p class="v8-thesis">We make ideas <span>physical.</span></p>
        <p class="v8-lede">
          CATRED is a creative studio taking work from first sketch to finished
          object — 2D, 3D, CAD and print under one roof, for game teams, product
          teams and collectors. No vendor handoffs.
        </p>
        <div class="v8-actions">
          <a class="v8-btn v8-btn--solid" href="#contact">
            Start a project <span class="v8-btn-ico">{@render arrow()}</span>
          </a>
          <a class="v8-btn" href="#work">See selected work</a>
        </div>
        <dl class="v8-meta">
          <div><dt>Studio</dt><dd>Indonesia</dd></div>
          <div><dt>Scope</dt><dd>Concept → object</dd></div>
          <div><dt>Base</dt><dd>Working worldwide</dd></div>
        </dl>
      </div>

      <div class="v8-panel">
        <div class="v8-panel-head"><span>Discipline index</span><span>04</span></div>
        <ul class="v8-index">
          {#each services as s, i}
            <li class:on={active === i}>
              <button
                type="button"
                onclick={() => (active = i)}
                onmouseenter={() => (active = i)}
                onfocus={() => (active = i)}
                aria-pressed={active === i}
              >
                <span class="v8-index-n">{s.index}</span>
                <span class="v8-index-title">{s.title}</span>
                <span class="v8-index-tag">{s.tag}</span>
                <span class="v8-index-arrow">{@render arrow()}</span>
              </button>
            </li>
          {/each}
        </ul>
        <div class="v8-stage">
          <div class="v8-stage-media">
            {#each services as s, i}
              <figure class:on={active === i} aria-hidden={active !== i}>
                <img
                  src={img(s.img)}
                  alt="{s.title} placeholder artwork"
                  width="640"
                  height="440"
                  loading="eager"
                  decoding="async"
                />
              </figure>
            {/each}
          </div>
          <div class="v8-stage-bar">
            <span>{services[active].index}</span>
            <strong>{services[active].title}</strong>
            <span>{services[active].tag}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="v8-work" id="work" aria-labelledby="v8-work-title">
      <header class="v8-head rv">
        <h2 id="v8-work-title">Selected<br />work.</h2>
        <p>
          Six placeholder plates from the studio archive. Client releases replace
          them as projects ship.
        </p>
      </header>
      <div class="v8-grid">
        {#each works as w, i}
          <figure class="v8-work-card rv">
            <div class="v8-work-media">
              <img
                src={img(w.img)}
                alt="Placeholder artwork for {w.title}"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption>
              <span>{w.type}</span>
              <strong>{w.title}</strong>
              <span class="v8-work-n">{pad(i + 1)}</span>
            </figcaption>
          </figure>
        {/each}
      </div>
    </section>

    <div class="v8-ticker" aria-hidden="true">
      <div class="v8-ticker-track">
        {#each [0, 1] as copy}
          {#each services as s}<span>{s.title}</span><b></b>{/each}
          {#each pipeline as p}<span>{p.step}</span><b></b>{/each}
        {/each}
      </div>
    </div>

    <section class="v8-process" id="process" aria-labelledby="v8-process-title">
      <header class="v8-head rv">
        <h2 id="v8-process-title">One line.<br />Five passes.</h2>
        <p>
          The same team owns every stage. Open a pass to see what happens before the
          work moves on.
        </p>
      </header>
      <div class="v8-ledger">
        {#each pipeline as p, i}
          <article class="v8-pass" class:on={openStep === i}>
            <h3>
              <button
                type="button"
                id="pass-btn-{i}"
                aria-expanded={openStep === i}
                aria-controls="pass-body-{i}"
                onclick={() => (openStep = openStep === i ? -1 : i)}
              >
                <span class="v8-pass-n">{pad(i + 1)}</span>
                <span class="v8-pass-step">{p.step}</span>
                <span class="v8-pass-note">{p.note}</span>
                <span class="v8-pass-toggle" aria-hidden="true"></span>
              </button>
            </h3>
            <div class="v8-pass-body" id="pass-body-{i}" hidden={openStep !== i}>
              <p>{p.body}</p>
            </div>
          </article>
        {/each}
      </div>
    </section>

    <section class="v8-studio" id="studio" aria-labelledby="v8-studio-title">
      <div class="v8-studio-grid">
        <div class="v8-studio-copy rv">
          <h2 id="v8-studio-title">One team,<br />start to object.</h2>
          <p>
            CATRED keeps concept, modelling, engineering and fabrication in one
            room. Fewer translations, fewer surprises, one point of contact from the
            first thumbnail to the finished piece.
          </p>
          <p class="v8-fine">Artwork shown is placeholder studio material until client releases land.</p>
        </div>
        <dl class="v8-facts rv">
          <div><dt>Disciplines</dt><dd>04</dd><p>2D, 3D, CAD, print</p></div>
          <div><dt>Passes</dt><dd>05</dd><p>Sketch to finished object</p></div>
          <div><dt>Team</dt><dd>01</dd><p>One studio, no handoffs</p></div>
          <div><dt>Base</dt><dd>ID</dd><p>Working worldwide</p></div>
        </dl>
      </div>
    </section>

    <section class="v8-contact" id="contact" aria-labelledby="v8-contact-title">
      <div class="v8-contact-inner">
        <div class="v8-contact-head rv">
          <h2 id="v8-contact-title">Have something<br />worth making?</h2>
          <p>
            Send the brief, the rough idea, or just the reference. We reply with
            scope and next steps.
          </p>
        </div>
        <a class="v8-email" href="mailto:{studio.email}?subject=Project%20inquiry">
          <span>{studio.email}</span>
          <span class="v8-email-arrow">{@render arrow()}</span>
        </a>
        <footer class="v8-foot">
          <span>© 2026 {studio.full}</span>
          <span>{studio.location}</span>
          <a href={studio.instagram} target="_blank" rel="noreferrer">
            Instagram <span class="v8-foot-arrow">{@render arrow()}</span>
          </a>
          <a href="#top">Back to top</a>
        </footer>
      </div>
    </section>
  </main>
</div>

<style>
  .v8 {
    --v8-bg: color-mix(in srgb, var(--navy) 55%, black);
    --v8-panel: var(--navy);
    --v8-panel-2: var(--indigo);
    --v8-panel-3: color-mix(in srgb, var(--indigo) 72%, var(--navy));
    --v8-line: color-mix(in srgb, var(--line-dark) 70%, black);
    --v8-muted: color-mix(in srgb, var(--paper) 64%, var(--indigo));
    --v8-fg: var(--paper);
    --v8-red: var(--red);
    --v8-rail: 14.5rem;
    position: relative;
    min-height: 100svh;
    overflow-x: clip;
    background: var(--v8-bg);
    color: var(--v8-fg);
    color-scheme: dark;
    font-family: var(--font-body);
    accent-color: var(--v8-red);
  }

  :global(html:has(.v8)) {
    background: color-mix(in srgb, var(--navy) 55%, black);
    scrollbar-color: var(--line-dark) color-mix(in srgb, var(--navy) 55%, black);
  }

  .v8-progress {
    position: fixed;
    inset: 0 0 auto;
    z-index: 200;
    height: 2px;
    background: var(--v8-line);
    pointer-events: none;
  }
  .v8-progress span {
    display: block;
    height: 100%;
    background: var(--v8-red);
    transform-origin: 0 50%;
  }

  .v8-rail {
    position: fixed;
    inset: 0 auto 0 0;
    z-index: 110;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    width: var(--v8-rail);
    padding: 1.6rem 1.35rem 1.4rem;
    background: var(--v8-panel);
    border-right: 1px solid var(--v8-line);
  }
  .v8-brand {
    display: flex;
    align-items: flex-start;
    gap: 0.2rem;
    width: fit-content;
    color: var(--v8-fg);
    font-family: var(--font-display);
    font-size: 1.45rem;
    line-height: 1;
    letter-spacing: -0.04em;
    text-decoration: none;
  }
  .v8-brand span {
    margin-top: 0.15rem;
    color: var(--v8-red);
    font-family: var(--font-mono);
    font-size: 0.55rem;
  }
  .v8-rail-note {
    margin: 0;
    color: var(--v8-muted);
    font-family: var(--font-mono);
    font-size: 0.6rem;
    line-height: 1.6;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .v8-nav {
    display: flex;
    flex-direction: column;
    margin-top: -0.6rem;
  }
  .v8-nav a {
    display: flex;
    align-items: baseline;
    gap: 0.7rem;
    padding: 0.6rem 0;
    border-bottom: 1px solid var(--v8-line);
    color: var(--v8-fg);
    font-size: 0.92rem;
    text-decoration: none;
  }
  .v8-nav a:first-child {
    border-top: 1px solid var(--v8-line);
  }
  .v8-nav a span {
    color: var(--v8-muted);
    font-family: var(--font-mono);
    font-size: 0.58rem;
    letter-spacing: 0.06em;
    transition: color 0.25s;
  }
  .v8-nav a:hover,
  .v8-nav a:focus-visible {
    text-decoration: underline;
    text-decoration-color: var(--v8-red);
    text-underline-offset: 0.25rem;
  }
  .v8-nav a:hover span,
  .v8-nav a:focus-visible span {
    color: var(--v8-fg);
  }
  .v8-rail-foot {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    color: var(--v8-muted);
    font-family: var(--font-mono);
    font-size: 0.58rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .v8-rail-foot p {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    margin: 0;
    line-height: 1.4;
  }
  .v8-dot {
    flex: none;
    width: 6px;
    height: 6px;
    background: var(--v8-red);
  }
  .v8-rail-foot a {
    width: fit-content;
    padding-bottom: 0.1rem;
    border-bottom: 1px solid var(--v8-line);
    color: var(--v8-fg);
    text-decoration: none;
    transition: border-color 0.25s;
  }
  .v8-rail-foot a:hover {
    border-color: var(--v8-red);
  }

  .v8-main {
    margin-left: var(--v8-rail);
  }
  .v8 section[id] {
    scroll-margin-top: 1rem;
  }

  .v8-marquee {
    overflow: hidden;
    background: var(--red-deep);
    color: var(--paper);
  }
  .v8-marquee-track {
    display: flex;
    align-items: center;
    width: max-content;
    padding: 0.42rem 0;
    animation: v8-marq 30s linear infinite;
  }
  .v8-marquee-track span {
    padding: 0 1rem;
    font-family: var(--font-mono);
    font-size: 0.58rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .v8-marquee-track b {
    flex: none;
    width: 5px;
    height: 5px;
    background: var(--paper);
  }

  .v8-hero {
    display: grid;
    grid-template-columns: minmax(0, 1.06fr) minmax(0, 0.94fr);
    align-items: center;
    gap: clamp(2rem, 4vw, 4.5rem);
    min-height: 100svh;
    padding: clamp(3rem, 7vh, 5.5rem) clamp(1.25rem, 4vw, 4.5rem) clamp(2rem, 4vh, 3.5rem);
    border-bottom: 1px solid var(--v8-line);
    background:
      linear-gradient(to right, color-mix(in srgb, var(--v8-line) 34%, transparent) 1px, transparent 1px) 0 0 / 6rem 100%,
      var(--v8-bg);
  }
  .v8-wordmark {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 0.25rem 0.65rem;
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(3.2rem, 7vw, 8.4rem);
    line-height: 0.82;
    letter-spacing: -0.045em;
    text-transform: uppercase;
    animation: v8-word-in 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .v8-wordmark-name {
    display: inline-block;
  }
  .v8-wordmark-dot {
    color: var(--v8-red);
  }
  .v8-wordmark-sub {
    padding-bottom: 0.16em;
    color: var(--v8-muted);
    font-family: var(--font-mono);
    font-size: clamp(0.56rem, 0.8vw, 0.7rem);
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }
  .v8-thesis {
    max-width: 38rem;
    margin: 1.2rem 0 0;
    font-family: var(--font-display);
    font-size: clamp(1.4rem, 2.4vw, 2.5rem);
    line-height: 0.98;
    letter-spacing: -0.03em;
    text-transform: uppercase;
    text-wrap: balance;
    animation: v8-word-in 0.9s 0.08s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .v8-thesis span {
    color: var(--v8-red);
  }
  .v8-lede {
    max-width: 34rem;
    margin: 1.4rem 0 0;
    color: var(--v8-muted);
    font-size: clamp(1rem, 1.3vw, 1.15rem);
    line-height: 1.6;
  }
  .v8-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    margin-top: 2rem;
  }
  .v8-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    min-height: 46px;
    padding: 0.75rem 1.1rem;
    border: 1px solid var(--v8-line);
    background: transparent;
    color: var(--v8-fg);
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    transition:
      background 0.25s,
      border-color 0.25s,
      color 0.25s;
  }
  .v8-btn:hover {
    border-color: var(--v8-fg);
    background: var(--v8-fg);
    color: var(--v8-bg);
  }
  .v8-btn--solid {
    border-color: var(--red-deep);
    background: var(--red-deep);
    color: var(--paper);
  }
  .v8-btn--solid:hover {
    border-color: var(--paper);
    background: var(--paper);
    color: var(--ink);
  }
  .v8-btn-ico {
    display: inline-flex;
  }
  .v8-btn svg {
    width: 0.8rem;
    height: 0.8rem;
  }
  .v8-meta {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
    gap: 1rem;
    margin: clamp(2rem, 5vh, 3.5rem) 0 0;
    padding-top: 1rem;
    border-top: 1px solid var(--v8-line);
  }
  .v8-meta dt {
    color: var(--v8-muted);
    font-family: var(--font-mono);
    font-size: 0.56rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .v8-meta dd {
    margin: 0.35rem 0 0;
    font-size: 0.85rem;
  }

  .v8-panel {
    border: 1px solid var(--v8-line);
    background: var(--v8-panel);
    box-shadow: 0 24px 60px -30px rgb(0 0 0 / 0.85);
  }
  .v8-panel-head {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.7rem 0.9rem;
    border-bottom: 1px solid var(--v8-line);
    color: var(--v8-muted);
    font-family: var(--font-mono);
    font-size: 0.58rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .v8-index {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .v8-index li {
    border-bottom: 1px solid var(--v8-line);
  }
  .v8-index li:last-child {
    border-bottom: 0;
  }
  .v8-index button {
    display: grid;
    grid-template-columns: 2.2rem minmax(0, 1fr) auto;
    grid-template-areas:
      "n title arrow"
      "n tag arrow";
    align-items: center;
    column-gap: 0.85rem;
    width: 100%;
    padding: 0.95rem 0.9rem;
    border: 0;
    background: transparent;
    color: var(--v8-fg);
    text-align: left;
    cursor: pointer;
    transition: background 0.25s;
  }
  .v8-index button:hover,
  .v8-index li.on button {
    background: var(--v8-panel-2);
  }
  .v8-index li.on button {
    box-shadow: inset 0 -2px 0 var(--v8-red);
  }
  .v8-index-n {
    grid-area: n;
    color: var(--v8-muted);
    font-family: var(--font-mono);
    font-size: 0.64rem;
    transition: color 0.25s;
  }
  .v8-index li.on .v8-index-n {
    color: var(--v8-fg);
  }
  .v8-index-title {
    grid-area: title;
    font-family: var(--font-display);
    font-size: clamp(1.2rem, 1.9vw, 1.6rem);
    font-weight: 400;
    line-height: 1;
    letter-spacing: -0.03em;
    text-transform: uppercase;
  }
  .v8-index-tag {
    grid-area: tag;
    overflow: hidden;
    color: var(--v8-muted);
    font-family: var(--font-mono);
    font-size: 0.56rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .v8-index-arrow {
    grid-area: arrow;
    display: inline-flex;
    color: var(--v8-muted);
    transition:
      color 0.25s,
      transform 0.25s;
  }
  .v8-index-arrow svg {
    width: 0.75rem;
    height: 0.75rem;
  }
  .v8-index li.on .v8-index-arrow {
    color: var(--v8-red);
    transform: translate(2px, -2px);
  }
  .v8-stage {
    border-top: 2px solid var(--v8-red);
    background: var(--v8-panel-2);
  }
  .v8-stage-media {
    position: relative;
    height: clamp(10rem, 15vw, 13rem);
    overflow: hidden;
    background: var(--v8-panel-3);
  }
  .v8-stage-media figure {
    position: absolute;
    inset: 0;
    margin: 0;
    opacity: 0;
    transform: scale(1.035);
    transition:
      opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .v8-stage-media figure.on {
    opacity: 1;
    transform: none;
  }
  .v8-stage-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .v8-stage-bar {
    display: grid;
    grid-template-columns: 1.6rem minmax(0, 1fr);
    gap: 0.15rem 0.6rem;
    padding: 0.65rem 0.9rem 0.75rem;
    border-top: 1px solid var(--v8-line);
    font-family: var(--font-mono);
    font-size: 0.58rem;
    letter-spacing: 0.05em;
    line-height: 1.4;
    text-transform: uppercase;
  }
  .v8-stage-bar > span:first-child {
    grid-row: span 2;
    color: var(--v8-fg);
    font-size: 0.7rem;
  }
  .v8-stage-bar strong {
    font-weight: 700;
  }
  .v8-stage-bar > span:last-child {
    color: var(--v8-muted);
    font-size: 0.52rem;
  }

  .v8-head {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
    align-items: end;
    gap: 2rem;
    margin-bottom: clamp(2rem, 5vw, 3.5rem);
  }
  .v8-head h2 {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(2.2rem, 4.6vw, 4.4rem);
    line-height: 0.9;
    letter-spacing: -0.035em;
    text-transform: uppercase;
  }
  .v8-head p {
    max-width: 32rem;
    margin: 0 0 0.3rem;
    color: var(--v8-muted);
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .v8-work {
    padding: clamp(4rem, 9vh, 7rem) clamp(1.25rem, 4vw, 4.5rem);
    border-bottom: 1px solid var(--v8-line);
  }
  .v8-grid {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    align-items: start;
    gap: clamp(0.9rem, 1.8vw, 1.5rem);
  }
  .v8-work-card {
    grid-column: span 4;
    margin: 0;
  }
  .v8-work-card:nth-child(1),
  .v8-work-card:nth-child(6) {
    grid-column: span 7;
  }
  .v8-work-card:nth-child(2),
  .v8-work-card:nth-child(5) {
    grid-column: span 5;
  }
  .v8-work-card:nth-child(3),
  .v8-work-card:nth-child(4) {
    grid-column: span 6;
  }
  .v8-work-media {
    position: relative;
    overflow: hidden;
    border: 1px solid var(--v8-line);
    background: var(--v8-panel);
  }
  .v8-work-card:nth-child(1) .v8-work-media,
  .v8-work-card:nth-child(6) .v8-work-media {
    aspect-ratio: 9 / 8;
  }
  .v8-work-card:nth-child(2) .v8-work-media,
  .v8-work-card:nth-child(5) .v8-work-media {
    aspect-ratio: 4 / 5;
  }
  .v8-work-card:nth-child(3) .v8-work-media,
  .v8-work-card:nth-child(4) .v8-work-media {
    aspect-ratio: 5 / 4;
  }
  .v8-work-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .v8-work-media::after {
    position: absolute;
    inset: auto 0 0;
    height: 3px;
    background: var(--v8-red);
    content: "";
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .v8-work-card:hover .v8-work-media img {
    transform: scale(1.045);
  }
  .v8-work-card:hover .v8-work-media::after {
    transform: scaleX(1);
  }
  .v8-work-card figcaption {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.15rem 0.8rem;
    margin-top: 0.55rem;
    padding-top: 0.7rem;
    border-top: 1px solid var(--v8-line);
  }
  .v8-work-card figcaption span:first-child {
    grid-column: 1;
    color: var(--v8-muted);
    font-family: var(--font-mono);
    font-size: 0.55rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .v8-work-card figcaption strong {
    grid-column: 1;
    font-size: 0.95rem;
    font-weight: 500;
  }
  .v8-work-n {
    grid-row: 1 / span 2;
    grid-column: 2;
    align-self: center;
    color: var(--v8-muted);
    font-family: var(--font-mono);
    font-size: 0.6rem;
  }

  .v8-ticker {
    overflow: hidden;
    border-bottom: 1px solid var(--v8-line);
    background: var(--v8-panel);
  }
  .v8-ticker-track {
    display: flex;
    align-items: center;
    width: max-content;
    padding: 0.55rem 0;
    animation: v8-marq 38s linear infinite;
  }
  .v8-ticker-track span {
    padding: 0 1.1rem;
    color: var(--v8-muted);
    font-family: var(--font-mono);
    font-size: 0.6rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .v8-ticker-track b {
    flex: none;
    width: 5px;
    height: 5px;
    background: var(--v8-red);
  }
  @keyframes v8-marq {
    to {
      transform: translateX(-50%);
    }
  }
  @keyframes v8-word-in {
    from {
      clip-path: inset(0 0 100% 0);
      transform: translateY(0.12em);
    }
    to {
      clip-path: inset(0);
      transform: none;
    }
  }

  .v8-process {
    padding: clamp(4rem, 9vh, 7rem) clamp(1.25rem, 4vw, 4.5rem);
    border-bottom: 1px solid var(--v8-line);
    background: var(--v8-panel);
  }
  .v8-ledger {
    border-top: 1px solid var(--v8-line);
  }
  .v8-pass {
    border-bottom: 1px solid var(--v8-line);
  }
  .v8-pass h3 {
    margin: 0;
  }
  .v8-pass button {
    display: grid;
    grid-template-columns: 3.2rem minmax(0, 1fr) minmax(0, 1.2fr) 2rem;
    align-items: center;
    gap: 1rem;
    width: 100%;
    padding: 1.1rem 0;
    border: 0;
    background: transparent;
    color: var(--v8-fg);
    text-align: left;
    cursor: pointer;
  }
  .v8-pass-n {
    color: var(--v8-muted);
    font-family: var(--font-mono);
    font-size: 0.62rem;
    transition: color 0.25s;
  }
  .v8-pass.on .v8-pass-n {
    color: var(--v8-fg);
  }
  .v8-pass-step {
    font-family: var(--font-display);
    font-size: clamp(1.1rem, 2vw, 1.65rem);
    line-height: 1;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    transition: color 0.25s;
  }
  .v8-pass button:hover .v8-pass-toggle::before,
  .v8-pass button:hover .v8-pass-toggle::after {
    background: var(--v8-red);
  }
  .v8-pass-note {
    color: var(--v8-muted);
    font-family: var(--font-mono);
    font-size: 0.58rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .v8-pass-toggle {
    position: relative;
    justify-self: end;
    width: 1rem;
    height: 1rem;
  }
  .v8-pass-toggle::before,
  .v8-pass-toggle::after {
    position: absolute;
    inset: 50% 0 auto;
    height: 1px;
    background: var(--v8-fg);
    content: "";
    transform: translateY(-50%);
    transition:
      background 0.3s,
      transform 0.3s;
  }
  .v8-pass-toggle::after {
    transform: translateY(-50%) rotate(90deg);
  }
  .v8-pass.on .v8-pass-toggle::before,
  .v8-pass.on .v8-pass-toggle::after {
    background: var(--v8-red);
  }
  .v8-pass.on .v8-pass-toggle::after {
    transform: translateY(-50%) rotate(0);
  }
  .v8-pass-body {
    padding: 0 2rem 1.4rem 4.2rem;
  }
  .v8-pass-body p {
    max-width: 62ch;
    margin: 0;
    color: var(--v8-muted);
    font-size: 0.95rem;
    line-height: 1.7;
  }

  .v8-studio {
    position: relative;
    overflow: hidden;
    padding: clamp(4rem, 10vh, 8rem) clamp(1.25rem, 4vw, 4.5rem);
    border-bottom: 1px solid var(--v8-line);
    background: var(--v8-panel-2);
  }
  .v8-studio-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
    gap: clamp(2rem, 6vw, 6rem);
  }
  .v8-studio-copy h2 {
    margin: 0 0 1.5rem;
    font-family: var(--font-display);
    font-size: clamp(2.4rem, 5.6vw, 5.4rem);
    line-height: 0.9;
    letter-spacing: -0.035em;
    text-transform: uppercase;
  }
  .v8-studio-copy p {
    max-width: 40rem;
    color: color-mix(in srgb, var(--paper) 76%, var(--indigo));
    line-height: 1.7;
  }
  .v8-studio-copy .v8-fine {
    margin-top: 2rem;
    color: var(--v8-muted);
    font-family: var(--font-mono);
    font-size: 0.58rem;
    letter-spacing: 0.06em;
    line-height: 1.6;
    text-transform: uppercase;
  }
  .v8-facts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-self: start;
    margin: 0;
    border-top: 1px solid var(--v8-line);
    border-left: 1px solid var(--v8-line);
  }
  .v8-facts > div {
    padding: 1.1rem;
    border-right: 1px solid var(--v8-line);
    border-bottom: 1px solid var(--v8-line);
  }
  .v8-facts dt {
    color: var(--v8-muted);
    font-family: var(--font-mono);
    font-size: 0.54rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .v8-facts dd {
    margin: 0.4rem 0 0.25rem;
    font-family: var(--font-display);
    font-size: 2.4rem;
    line-height: 1;
    letter-spacing: -0.04em;
  }
  .v8-facts p {
    margin: 0;
    color: var(--v8-muted);
    font-size: 0.72rem;
    line-height: 1.4;
  }

  .v8-contact {
    background: var(--red-deep);
    color: var(--paper);
  }
  .v8-contact-inner {
    padding: clamp(4rem, 10vh, 8rem) clamp(1.25rem, 4vw, 4.5rem) 1.5rem;
  }
  .v8-contact-head {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
    align-items: end;
    gap: 2rem;
  }
  .v8-contact-head h2 {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(2.4rem, 6vw, 5.8rem);
    line-height: 0.88;
    letter-spacing: -0.04em;
    text-transform: uppercase;
  }
  .v8-contact-head p {
    max-width: 32rem;
    margin: 0 0 0.4rem;
    color: color-mix(in srgb, var(--paper) 90%, var(--red-deep));
    line-height: 1.6;
  }
  .v8-email {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin: clamp(2rem, 6vh, 4rem) 0 0;
    padding: 1.1rem 0;
    border-top: 1px solid color-mix(in srgb, var(--paper) 40%, transparent);
    border-bottom: 1px solid color-mix(in srgb, var(--paper) 40%, transparent);
    color: var(--paper);
    font-family: var(--font-display);
    font-size: clamp(1.45rem, 4.4vw, 4.1rem);
    line-height: 1;
    letter-spacing: -0.035em;
    text-decoration: none;
    transition:
      background 0.25s,
      border-color 0.25s,
      color 0.25s,
      padding 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .v8-email:hover {
    padding-right: 1rem;
    padding-left: 1rem;
    border-color: var(--paper);
    background: var(--paper);
    color: var(--ink);
  }
  .v8-email-arrow {
    display: inline-flex;
    padding-top: 0.1em;
  }
  .v8-email-arrow svg {
    width: clamp(1.2rem, 3vw, 2.4rem);
    height: clamp(1.2rem, 3vw, 2.4rem);
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .v8-email:hover .v8-email-arrow svg {
    transform: translate(4px, -4px);
  }
  .v8-foot {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem 1.5rem;
    margin-top: clamp(3rem, 8vh, 6rem);
    padding-top: 1rem;
    border-top: 1px solid color-mix(in srgb, var(--paper) 40%, transparent);
    font-family: var(--font-mono);
    font-size: 0.56rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .v8-foot a {
    padding-bottom: 0.1rem;
    border-bottom: 1px solid color-mix(in srgb, var(--paper) 45%, transparent);
    text-decoration: none;
    transition: border-color 0.25s;
  }
  .v8-foot a:hover {
    border-color: var(--paper);
  }
  .v8-foot-arrow {
    display: inline-flex;
    vertical-align: -2px;
  }
  .v8-foot-arrow svg {
    width: 0.65rem;
    height: 0.65rem;
  }

  .v8 a:focus-visible,
  .v8 button:focus-visible {
    outline: 2px solid var(--v8-red);
    outline-offset: 3px;
  }
  .v8-contact a:focus-visible {
    outline-color: var(--paper);
  }

  @media (min-width: 1181px) {
    .v8-panel {
      margin-top: 5rem;
    }
  }

  @media (max-width: 1180px) {
    .v8-hero {
      grid-template-columns: 1fr;
      min-height: auto;
    }
    .v8-panel {
      width: 100%;
      max-width: 42rem;
    }
  }

  @media (max-width: 1080px) {
    .v8-rail {
      position: sticky;
      top: 0;
      inset: auto;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      width: auto;
      height: auto;
      padding: 0.65rem 1rem;
      border-right: 0;
      border-bottom: 1px solid var(--v8-line);
    }
    .v8-rail-note {
      display: none;
    }
    .v8-nav {
      flex-direction: row;
      gap: 0.1rem;
      margin: 0;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .v8-nav a {
      padding: 0.45rem 0.55rem;
      border: 0;
      font-size: 0.7rem;
      white-space: nowrap;
    }
    .v8-nav a:first-child {
      border-top: 0;
    }
    .v8-nav a span {
      font-size: 0.5rem;
    }
    .v8-rail-foot {
      flex-direction: row;
      align-items: center;
      gap: 0.7rem;
      font-size: 0.5rem;
    }
    .v8-rail-foot p,
    .v8-rail-foot a:not(:last-child) {
      display: none;
    }
    .v8-main {
      margin-left: 0;
    }
    .v8 section[id] {
      scroll-margin-top: 4.5rem;
    }
  }

  @media (max-width: 900px) {
    .v8-head,
    .v8-contact-head {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    .v8-work-card,
    .v8-work-card:nth-child(n) {
      grid-column: span 6;
    }
    .v8-studio-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 720px) {
    .v8-rail {
      padding: 0.55rem 0.75rem;
    }
    .v8-brand {
      font-size: 1.15rem;
    }
    .v8-nav a {
      padding: 0.4rem 0.35rem;
      font-size: 0.62rem;
    }
    .v8-nav a span {
      display: none;
    }
    .v8-rail-foot {
      display: none;
    }
  }

  @media (max-width: 380px) {
    .v8-rail {
      flex-wrap: wrap;
      justify-content: flex-start;
      gap: 0.35rem;
    }
    .v8-brand {
      flex: 1 0 auto;
    }
    .v8-nav {
      order: 3;
      justify-content: space-between;
      width: 100%;
      overflow: visible;
    }
    .v8-nav a {
      padding: 0.35rem 0.2rem;
    }
    .v8 section[id] {
      scroll-margin-top: 6rem;
    }
  }

  @media (max-width: 640px) {
    .v8-hero {
      gap: 2rem;
      padding: 2rem 1rem 2.5rem;
    }
    .v8-wordmark {
      font-size: clamp(2.8rem, 12vw, 4.4rem);
    }
    .v8-thesis {
      font-size: clamp(1.35rem, 5.2vw, 2rem);
    }
    .v8-marquee-track span {
      font-size: 0.54rem;
    }
    .v8-actions {
      flex-direction: column;
      align-items: stretch;
    }
    .v8-btn {
      justify-content: space-between;
    }
    .v8-meta {
      grid-template-columns: 1fr 1fr;
    }
    .v8-index button {
      grid-template-columns: 1.6rem minmax(0, 1fr) auto;
      padding: 0.65rem 0.75rem;
    }
    .v8-index-tag {
      display: none;
    }
    .v8-stage-media {
      height: 12rem;
    }
    .v8-work,
    .v8-process,
    .v8-studio,
    .v8-contact-inner {
      padding-right: 1rem;
      padding-left: 1rem;
    }
    .v8-contact-inner {
      padding-bottom: 5.5rem;
    }
    .v8-work-card,
    .v8-work-card:nth-child(n) {
      grid-column: span 12;
    }
    .v8-work-card:nth-child(n) .v8-work-media {
      aspect-ratio: 4 / 3;
    }
    .v8-pass button {
      grid-template-columns: 2rem minmax(0, 1fr) 1.5rem;
      gap: 0.15rem 0.6rem;
      padding: 0.9rem 0;
    }
    .v8-pass-n {
      grid-row: 1 / span 2;
      align-self: start;
      margin-top: 0.25rem;
    }
    .v8-pass-step {
      grid-row: 1;
      grid-column: 2;
    }
    .v8-pass-note {
      grid-row: 2;
      grid-column: 2;
    }
    .v8-pass-toggle {
      grid-row: 1 / span 2;
      grid-column: 3;
    }
    .v8-pass-body {
      padding: 0 0 1.2rem 2.6rem;
    }
    .v8-studio-copy h2,
    .v8-contact-head h2 {
      font-size: clamp(2.2rem, 10vw, 3.4rem);
    }
    .v8-facts dd {
      font-size: 2rem;
    }
    .v8-email {
      font-size: clamp(1.25rem, 7vw, 2rem);
    }
    .v8-foot {
      font-size: 0.52rem;
    }
  }
</style>
