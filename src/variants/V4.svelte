<script>
  import { onMount } from "svelte";
  import { studio, services, works, pipeline, img } from "../lib/data.js";
  import { reveal } from "../lib/reveal.js";

  const stageLabels = ["Sketch", "Model", "CAD", "Print"];
  const stageImages = ["d2-city.svg", "d3-mecha.svg", "dcad-gear.svg", "dprint-fig.svg"];
  const stageNotes = [pipeline[0], pipeline[2], pipeline[3], pipeline[4]].map((p) => p.note);

  let root = $state();
  let menu = $state();
  let statusEl = $state();
  let sent = $state(false);
  let scrolled = $state(false);
  let progress = $state(0);
  let stage = $state(0);
  let form = $state({ name: "", email: "", details: "" });

  const clean = (t) => String(t).replaceAll("—", "-").replaceAll("–", "-");
  const mail = `mailto:${studio.email}`;
  const stats = [services.length, pipeline.length, works.length];

  function closeMenu() {
    if (menu) menu.open = false;
  }

  function onMenuKey(event) {
    if (event.key === "Escape" && menu?.open) {
      menu.open = false;
      menu.querySelector("summary")?.focus();
    }
  }

  function onSubmit(event) {
    event.preventDefault();
    const subject = encodeURIComponent(`Project inquiry - ${form.name}`);
    const body = encodeURIComponent(
      `${form.details}\n\nFrom: ${form.name} <${form.email}>`,
    );
    window.location.href = `mailto:${studio.email}?subject=${subject}&body=${body}`;
    sent = true;
    setTimeout(() => statusEl?.focus(), 0);
  }

  onMount(() => {
    if (!root) return;
    const stop = reveal(root);
    const onScroll = () => {
      const y = window.scrollY;
      scrolled = y > 32;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress = max > 0 ? Math.min(1, y / max) : 0;
      root.style.setProperty("--par", `${Math.min(y, 900) * -0.04}px`);
    };
    const fine =
      typeof matchMedia === "function" &&
      matchMedia("(pointer: fine)").matches;
    const onMove = (event) => {
      root.style.setProperty("--mx", `${event.clientX}px`);
      root.style.setProperty("--my", `${event.clientY}px`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (fine) window.removeEventListener("pointermove", onMove);
      stop();
    };
  });
</script>

<div class="g" bind:this={root}>
  <div class="g-aura" aria-hidden="true"></div>
  <div class="g-glow" aria-hidden="true"></div>
  <a class="g-skip" href="#g-main">Skip to content</a>
  <div class="g-progress" style={`transform:scaleX(${progress})`} aria-hidden="true"></div>

  <header class="g-nav">
    <div class="g-nav-pill" class:is-scrolled={scrolled}>
      <a class="g-brand" href="#g-top">CATRED</a>
      <nav class="g-nav-links" aria-label="Primary">
        <a href="#services">Services</a>
        <a href="#process">Process</a>
        <a href="#work">Work</a>
        <a href="#contact">Contact</a>
      </nav>
      <a class="g-nav-cta" href={mail}>Start a project</a>
      <details class="g-menu" bind:this={menu}>
        <summary onkeydown={onMenuKey}>Menu</summary>
        <nav aria-label="Mobile">
          <a href="#services" onclick={closeMenu} onkeydown={onMenuKey}>Services</a>
          <a href="#process" onclick={closeMenu} onkeydown={onMenuKey}>Process</a>
          <a href="#work" onclick={closeMenu} onkeydown={onMenuKey}>Work</a>
          <a href="#contact" onclick={closeMenu} onkeydown={onMenuKey}>Contact</a>
          <a href={mail} onclick={closeMenu} onkeydown={onMenuKey}>Start a project</a>
        </nav>
      </details>
    </div>
  </header>

  <main id="g-main">
    <section class="g-hero" id="g-top" aria-labelledby="g-h1">
      <h1 id="g-h1">We make ideas <span>physical.</span></h1>
      <p class="g-lede">
        2D concept, 3D, CAD and print. One team from first line to final form.
      </p>
      <div class="g-actions">
        <a class="g-btn" href={mail}>Start a project <span aria-hidden="true">→</span></a>
        <a class="g-ghost" href="#work">See the work <span aria-hidden="true">↓</span></a>
      </div>
      <div class="g-hero-meta">
        <span>Independent studio</span>
        <span>{clean(studio.location)}</span>
        <span>Concept → object</span>
      </div>
    </section>

    <section class="g-console-wrap" aria-label="Studio console">
      <div class="g-console">
        <div class="g-console-top">
          <span class="g-dot" aria-hidden="true"></span>
          <span>CATRED / STUDIO CONSOLE</span>
          <span class="g-live">Live proof</span>
        </div>

        <div class="g-console-grid">
          <aside class="g-console-side">
            <p class="g-side-label">Pipeline</p>
            <div class="g-steps" role="group" aria-label="Pipeline stage">
              {#each stageLabels as label, i}
                <button
                  class="g-step"
                  class:is-on={stage === i}
                  aria-pressed={stage === i}
                  onclick={() => (stage = i)}
                >
                  <span class="g-step-no">0{i + 1}</span>
                  <span>{label}</span>
                </button>
              {/each}
            </div>
            <p class="g-side-note">{stageNotes[stage]}</p>
          </aside>

          <div class="g-console-main">
            <div class="g-visual">
              {#key stage}
                <img
                  class="g-visual-img"
                  src={img(stageImages[stage])}
                  alt={`${stageLabels[stage]} stage - placeholder artwork`}
                />
              {/key}
              <span class="g-visual-shade" aria-hidden="true"></span>
              <span class="g-chip g-chip-a">CONCEPT</span>
              <span class="g-chip g-chip-b">CAD</span>
              <span class="g-chip g-chip-c">PRINT</span>
              <span class="g-visual-thread" aria-hidden="true"></span>
            </div>
            <div class="g-console-foot">
              <span class="g-stage-label">0{stage + 1} / {stageLabels[stage]}</span>
              <div class="g-segments" aria-hidden="true">
                {#each stageLabels as _, i}
                  <span class:is-on={stage >= i}></span>
                {/each}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="g-marquee" aria-hidden="true">
      <div class="g-marquee-track">
        {#each ["CONCEPT", "MODEL", "CAD", "PRINT", "CONCEPT", "MODEL", "CAD", "PRINT"] as word}
          <span>{word}</span>
        {/each}
      </div>
    </div>

    <section class="g-bento" id="services" aria-labelledby="g-bento-h">
      <div class="g-sec-head rv">
        <h2 id="g-bento-h">Everything under one roof.</h2>
        <p>Four disciplines, five passes, one team. No handoffs.</p>
      </div>

      <div class="g-grid">
        <article class="g-card g-card-wide rv">
          <p class="g-card-label">Disciplines</p>
          <ul class="g-service-list">
            {#each services as s}
              <li>
                <span class="g-service-no">{s.index}</span>
                <span class="g-service-body">
                  <span class="g-service-title">{s.title}</span>
                  <span class="g-service-tag">{s.tag}</span>
                </span>
                <span class="g-service-arrow" aria-hidden="true">↗</span>
              </li>
            {/each}
          </ul>
        </article>

        <article class="g-card rv">
          <p class="g-card-label">The pipeline</p>
          <ol class="g-mini-list">
            {#each pipeline as p, i}
              <li><span>0{i + 1}</span>{p.step}</li>
            {/each}
          </ol>
          <a class="g-card-link" href="#process">See the passes →</a>
        </article>

        <article class="g-card g-card-work rv">
          <p class="g-card-label">Selected work</p>
          <div class="g-mini-work">
            {#each works.slice(0, 2) as w}
              <figure>
                <img src={img(w.img)} alt="" loading="lazy" />
                <figcaption>{w.title} / {w.type}</figcaption>
              </figure>
            {/each}
          </div>
        </article>

        <article class="g-card g-card-cta rv">
          <p class="g-card-label">New project</p>
          <p class="g-card-cta-line">Have an object in mind?</p>
          <a class="g-btn g-btn-sm" href={mail}>Start a project <span aria-hidden="true">→</span></a>
        </article>

        <article class="g-card g-card-stat rv">
          <p class="g-card-label">At a glance</p>
          <dl>
            <div><dt>Disciplines</dt><dd>{String(stats[0]).padStart(2, "0")}</dd></div>
            <div><dt>Passes</dt><dd>{String(stats[1]).padStart(2, "0")}</dd></div>
            <div><dt>Pieces</dt><dd>{String(stats[2]).padStart(2, "0")}</dd></div>
          </dl>
        </article>
      </div>
    </section>

    <section class="g-pipeline" id="process" aria-labelledby="g-pipeline-h">
      <div class="g-sticky">
        <h2 id="g-pipeline-h">Five passes.<br />One object.</h2>
        <p>
          One team of drawers, modelers, engineers and printers. Each pass is
          built from the one before it.
        </p>
        <a class="g-ghost" href="#contact">Start a project <span aria-hidden="true">→</span></a>
      </div>

      <div class="g-passes">
        {#each pipeline as p, i}
          <article class="g-pass rv">
            <span class="g-pass-no">0{i + 1}</span>
            <div>
              <h3>{p.step}</h3>
              <p class="g-pass-note">{p.note}</p>
              <p>{p.body}</p>
            </div>
          </article>
        {/each}
      </div>
    </section>

    <section class="g-work" id="work" aria-labelledby="g-work-h">
      <div class="g-sec-head rv">
        <h2 id="g-work-h">Selected work.</h2>
        <p>A contact sheet of studio pieces. Real work replaces these plates.</p>
      </div>

      <div class="g-work-grid">
        {#each works as w, i}
          <figure class="g-work-item rv" style={`--span:${i === 0 || i === 5 ? 7 : 5}`}>
            <div class="g-work-frame">
              <img src={img(w.img)} alt="" loading={i < 2 ? "eager" : "lazy"} />
              <span class="g-work-no" aria-hidden="true">Fig. {String(i + 1).padStart(2, "0")}</span>
            </div>
            <figcaption>{w.title} <span>/ {w.type}</span></figcaption>
          </figure>
        {/each}
      </div>
      <p class="g-note">Artwork is placeholder; real work replaces it.</p>
    </section>

    <section class="g-contact" id="contact" aria-labelledby="g-contact-h">
      <div class="g-contact-copy rv">
        <h2 id="g-contact-h">Have something to build?</h2>
        <p>
          Tell us what we are making, the size, and the deadline. We reply from
          {studio.email}.
        </p>
        <a class="g-ghost" href={mail}>Write to {studio.email} <span aria-hidden="true">↗</span></a>
      </div>

      <form class="g-form rv" onsubmit={onSubmit}>
        <p class="g-form-head">New inquiry</p>
        <label for="g-name">Name</label>
        <input id="g-name" bind:value={form.name} required autocomplete="name" />
        <label for="g-email">Email</label>
        <input id="g-email" type="email" bind:value={form.email} required autocomplete="email" />
        <label for="g-details">What are we making?</label>
        <textarea id="g-details" rows="4" bind:value={form.details} required placeholder="Subject, size, deadline"></textarea>
        <button type="submit">Send inquiry <span aria-hidden="true">→</span></button>
        <p class="g-sent" class:has-msg={sent} role="status" tabindex="-1" bind:this={statusEl}>
          {#if sent}
            Your mail app should open with the brief. If it does not,
            <a href={mail}>email {studio.email}</a>.
          {/if}
        </p>
      </form>
    </section>
  </main>

  <footer class="g-footer">
    <div class="g-footer-in">
      <p class="g-footer-brand">CATRED</p>
      <nav class="g-footer-nav" aria-label="Footer">
        <a href="#services">Services</a>
        <a href="#process">Process</a>
        <a href="#work">Work</a>
        <a href={mail}>Start a project</a>
        <a href={studio.instagram} target="_blank" rel="noreferrer">Instagram</a>
      </nav>
      <p class="g-colophon">
        {clean(studio.location)}. Set in Archivo Black, Space Grotesk and Space
        Mono. © 2026 {studio.domain}.
      </p>
    </div>
  </footer>
</div>

<style>
  .g {
    --g-bg: #070615;
    --g-panel: rgba(18, 16, 58, 0.55);
    --g-line: rgba(246, 244, 238, 0.12);
    --g-soft: #d9d5ea;
    --g-muted: #a9a4c4;
    --g-red: var(--red);
    position: relative;
    min-height: 100vh;
    background: var(--g-bg);
    color: var(--paper);
    font-family: var(--font-body);
    overflow-x: clip;
  }
  .g a { color: inherit; }
  .g :focus-visible { outline: 2px solid var(--red); outline-offset: 3px; }
  .g-skip {
    position: fixed; top: 0.5rem; left: 0.5rem; z-index: 300;
    padding: 0.6rem 0.9rem; background: var(--paper); color: var(--g-bg);
    font-family: var(--font-mono); font-size: 0.8rem; text-decoration: none;
    transform: translateY(-200%);
  }
  .g-skip:focus { transform: none; }
  .g-progress {
    position: fixed; top: 0; left: 0; right: 0; height: 2px;
    background: var(--red); transform-origin: 0 50%; z-index: 310;
    pointer-events: none; box-shadow: 0 0 14px rgb(237 34 36 / 0.6);
  }

  /* atmosphere */
  .g-aura {
    position: fixed; inset: -20%; z-index: 0; pointer-events: none;
    background:
      radial-gradient(36% 42% at 22% 18%, rgb(91 44 140 / 0.55), transparent 70%),
      radial-gradient(26% 34% at 80% 10%, rgb(237 34 36 / 0.24), transparent 70%),
      radial-gradient(44% 48% at 72% 82%, rgb(27 20 100 / 0.6), transparent 72%);
    filter: blur(70px);
    animation: g-drift 24s ease-in-out infinite alternate;
  }
  .g-glow {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background: radial-gradient(620px circle at var(--mx, 50%) var(--my, 30%), rgb(237 34 36 / 0.14), transparent 62%);
    mix-blend-mode: screen;
  }
  .g > header, .g > main, .g > footer { position: relative; z-index: 1; }

  /* nav */
  .g-nav {
    position: fixed; top: 1rem; left: 0; right: 0; z-index: 100;
    display: flex; justify-content: center; padding: 0 1rem;
    pointer-events: none;
  }
  .g-nav-pill {
    pointer-events: auto;
    display: flex; align-items: center; gap: 1.4rem;
    padding: 0.5rem 0.65rem 0.5rem 1rem;
    border-radius: 999px;
    background: rgb(8 7 21 / 0.62);
    -webkit-backdrop-filter: blur(22px) saturate(1.3);
    backdrop-filter: blur(22px) saturate(1.3);
    border: 1px solid var(--g-line);
    box-shadow: 0 20px 60px rgb(0 0 0 / 0.45);
    transition: background 0.3s ease, border-color 0.3s ease;
  }
  .g-nav-pill.is-scrolled {
    background: rgb(8 7 21 / 0.78);
    border-color: rgb(246 244 238 / 0.18);
  }
  .g-brand {
    font-family: var(--font-display); font-size: 1rem; letter-spacing: 0.04em;
    text-decoration: none;
  }
  .g-nav-links { display: flex; gap: 1.2rem; }
  .g-nav-links a {
    font-family: var(--font-mono); font-size: 0.72rem; text-transform: uppercase;
    letter-spacing: 0.08em; text-decoration: none; color: var(--g-soft);
  }
  .g-nav-links a:hover { color: var(--paper); }
  .g-nav-cta {
    background: var(--red-deep); color: var(--paper) !important;
    font-family: var(--font-mono); font-size: 0.72rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em; text-decoration: none;
    padding: 0.6rem 0.95rem; border-radius: 999px; white-space: nowrap;
    border: 1px solid rgb(255 255 255 / 0.12);
    transition: background 0.25s ease, transform 0.25s ease;
  }
  .g-nav-cta:hover { background: var(--red); transform: translateY(-1px); }
  .g-menu { display: none; position: relative; }
  .g-menu summary {
    list-style: none; cursor: pointer; border: 1px solid var(--g-line);
    padding: 0.5rem 0.75rem; border-radius: 999px;
    font-family: var(--font-mono); font-size: 0.7rem; text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .g-menu summary::-webkit-details-marker { display: none; }
  .g-menu nav {
    position: absolute; right: 0; top: calc(100% + 0.5rem); min-width: 12rem;
    display: grid; gap: 0.15rem; padding: 0.5rem;
    background: rgb(10 9 26 / 0.94);
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    border: 1px solid var(--g-line); border-radius: 14px;
  }
  .g-menu nav a {
    padding: 0.6rem; border-radius: 8px;
    font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase;
    letter-spacing: 0.08em; text-decoration: none;
  }
  .g-menu nav a:hover { background: var(--paper); color: var(--g-bg); }

  /* hero */
  .g-hero {
    max-width: 1180px; margin: 0 auto;
    padding: clamp(4.5rem, 9vw, 7.5rem) clamp(1.25rem, 4vw, 2rem) 0;
  }
  .g-hero h1 {
    max-width: 14ch; margin: 0;
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 7.6vw, 6rem);
    line-height: 0.9; letter-spacing: -0.035em; text-transform: uppercase;
    text-wrap: balance;
  }
  .g-hero h1 span { color: var(--red); }
  .g-lede {
    max-width: 50ch; margin: 1.5rem 0 0;
    font-size: clamp(1rem, 1.4vw, 1.15rem); line-height: 1.6; color: var(--g-soft);
  }
  .g-actions { display: flex; gap: 1.4rem; align-items: center; flex-wrap: wrap; margin-top: 1.8rem; }
  .g-btn {
    display: inline-flex; align-items: center; gap: 0.6rem;
    background: var(--red-deep); color: var(--paper) !important;
    font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em; text-decoration: none;
    padding: 0.9rem 1.25rem; border-radius: 999px;
    border: 1px solid rgb(255 255 255 / 0.12);
    box-shadow: 0 12px 34px rgb(237 34 36 / 0.22);
    transition: transform 0.25s ease, background 0.25s ease;
  }
  .g-btn:hover { background: var(--red); transform: translateY(-2px); }
  .g-btn-sm { padding: 0.7rem 1rem; font-size: 0.72rem; }
  .g-ghost {
    font-family: var(--font-mono); font-size: 0.78rem; text-transform: uppercase;
    letter-spacing: 0.06em; text-decoration: none; color: var(--g-soft);
    border-bottom: 1px solid rgb(246 244 238 / 0.35); padding-bottom: 0.15rem;
  }
  .g-ghost:hover { color: var(--paper); border-color: var(--red); }
  .g-hero-meta {
    display: flex; flex-wrap: wrap; gap: 0.8rem 2rem; margin-top: 2.6rem;
    padding-top: 1rem; border-top: 1px solid var(--g-line);
    font-family: var(--font-mono); font-size: 0.68rem; text-transform: uppercase;
    letter-spacing: 0.12em; color: var(--g-muted);
  }

  /* console */
  .g-console-wrap {
    max-width: 1180px; margin: 0 auto;
    padding: clamp(2rem, 4vw, 3.5rem) clamp(1.25rem, 4vw, 2rem) 0;
    perspective: 1200px;
  }
  .g-console {
    position: relative;
    padding: clamp(0.7rem, 1.4vw, 1rem);
    border-radius: 20px;
    background: linear-gradient(180deg, rgb(255 255 255 / 0.07), rgb(255 255 255 / 0.02));
    -webkit-backdrop-filter: blur(24px) saturate(1.3);
    backdrop-filter: blur(24px) saturate(1.3);
    border: 1px solid rgb(246 244 238 / 0.13);
    box-shadow:
      0 50px 120px rgb(0 0 0 / 0.5),
      0 0 90px rgb(91 44 140 / 0.22),
      inset 0 1px 0 rgb(255 255 255 / 0.12);
    transform: translateY(var(--par, 0px));
    transition: transform 0.15s linear;
  }
  .g-console::before {
    content: ""; position: absolute; inset: -1px; border-radius: 21px; pointer-events: none;
    background: linear-gradient(120deg, rgb(237 34 36 / 0.5), transparent 28%, transparent 70%, rgb(91 44 140 / 0.5));
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    padding: 1px;
  }
  .g-console-top {
    display: flex; align-items: center; gap: 0.7rem;
    padding: 0.25rem 0.35rem 0.8rem;
    font-family: var(--font-mono); font-size: 0.62rem; text-transform: uppercase;
    letter-spacing: 0.14em; color: var(--g-muted);
  }
  .g-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--red); box-shadow: 0 0 12px var(--red); }
  .g-live { margin-left: auto; color: var(--g-soft); }
  .g-console-grid {
    display: grid; grid-template-columns: 210px minmax(0, 1fr);
    gap: clamp(0.7rem, 1.5vw, 1rem);
  }
  .g-console-side {
    padding: 1rem;
    border-radius: 14px;
    background: rgb(8 7 21 / 0.45);
    border: 1px solid var(--g-line);
  }
  .g-side-label {
    margin: 0 0 0.7rem; font-family: var(--font-mono); font-size: 0.6rem;
    text-transform: uppercase; letter-spacing: 0.16em; color: var(--g-muted);
  }
  .g-steps { display: grid; gap: 0.3rem; }
  .g-step {
    display: flex; align-items: center; gap: 0.7rem;
    padding: 0.6rem 0.65rem; border-radius: 9px;
    background: transparent; border: 1px solid transparent; color: var(--g-soft);
    font-family: var(--font-mono); font-size: 0.72rem; text-transform: uppercase;
    letter-spacing: 0.08em; text-align: left; cursor: pointer;
    transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
  }
  .g-step:hover { background: rgb(246 244 238 / 0.06); }
  .g-step.is-on {
    background: rgb(237 34 36 / 0.14);
    border-color: rgb(237 34 36 / 0.4);
    color: var(--paper);
  }
  .g-step-no { color: var(--red); font-size: 0.62rem; }
  .g-side-note {
    margin: 1rem 0 0; font-size: 0.76rem; line-height: 1.55; color: var(--g-muted);
  }
  .g-console-main { min-width: 0; }
  .g-visual {
    position: relative; aspect-ratio: 16 / 9; overflow: hidden;
    border-radius: 14px; background: var(--ink);
    border: 1px solid var(--g-line);
  }
  .g-visual-img {
    width: 100%; height: 100%; object-fit: cover;
    animation: g-fade 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .g-visual-shade {
    position: absolute; inset: 0;
    background: linear-gradient(180deg, rgb(7 6 21 / 0.05), rgb(7 6 21 / 0.55));
  }
  .g-chip {
    position: absolute; display: inline-flex; align-items: center;
    padding: 0.3rem 0.55rem; border-radius: 999px;
    background: rgb(8 7 21 / 0.55);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    border: 1px solid rgb(246 244 238 / 0.16);
    font-family: var(--font-mono); font-size: 0.58rem; letter-spacing: 0.12em;
    color: var(--g-soft);
  }
  .g-chip-a { top: 12%; left: 6%; }
  .g-chip-b { top: 44%; right: 8%; }
  .g-chip-c { bottom: 14%; left: 10%; }
  .g-visual-thread {
    position: absolute; left: -5%; right: -5%; top: 58%; height: 2px;
    background: linear-gradient(90deg, transparent, var(--red) 18%, var(--red) 82%, transparent);
    transform: rotate(-7deg);
    box-shadow: 0 0 18px rgb(237 34 36 / 0.55);
  }
  .g-console-foot {
    display: flex; align-items: center; justify-content: space-between; gap: 1rem;
    padding: 0.8rem 0.2rem 0.1rem;
  }
  .g-stage-label {
    font-family: var(--font-mono); font-size: 0.66rem; text-transform: uppercase;
    letter-spacing: 0.14em; color: var(--g-soft);
  }
  .g-segments { display: flex; gap: 4px; }
  .g-segments span {
    width: 28px; height: 3px; border-radius: 2px; background: rgb(246 244 238 / 0.16);
    transition: background 0.3s ease, box-shadow 0.3s ease;
  }
  .g-segments span.is-on { background: var(--red); box-shadow: 0 0 10px rgb(237 34 36 / 0.55); }

  /* marquee */
  .g-marquee {
    margin-top: clamp(2rem, 5vw, 4rem);
    border-top: 1px solid var(--g-line); border-bottom: 1px solid var(--g-line);
    overflow: hidden; padding: 0.8rem 0;
    background: rgb(8 7 21 / 0.35);
  }
  .g-marquee-track {
    display: flex; gap: 3rem; width: max-content;
    animation: g-marquee 26s linear infinite;
    font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.2em;
    color: var(--g-muted);
  }
  .g-marquee-track span::after { content: "·"; margin-left: 3rem; color: var(--red); }

  /* shared section */
  .g-bento, .g-pipeline, .g-work, .g-contact {
    max-width: 1180px; margin: 0 auto;
    padding: clamp(3.5rem, 7vw, 6rem) clamp(1.25rem, 4vw, 2rem) 0;
  }
  .g-sec-head {
    display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: 2rem; align-items: end; margin-bottom: 2rem;
  }
  .g-sec-head h2, .g-pipeline h2, .g-contact h2 {
    margin: 0; font-family: var(--font-display);
    font-size: clamp(1.9rem, 4.4vw, 3.4rem); line-height: 1.02;
    letter-spacing: -0.02em; text-transform: uppercase; text-wrap: balance;
  }
  .g-sec-head p { margin: 0; max-width: 44ch; line-height: 1.6; color: var(--g-soft); }

  /* bento */
  .g-grid {
    display: grid; grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 1rem;
  }
  .g-card {
    position: relative; overflow: hidden;
    grid-column: span 5;
    padding: clamp(1.2rem, 2vw, 1.6rem);
    border-radius: 16px;
    background: linear-gradient(180deg, rgb(255 255 255 / 0.06), rgb(255 255 255 / 0.018));
    -webkit-backdrop-filter: blur(18px) saturate(1.2);
    backdrop-filter: blur(18px) saturate(1.2);
    border: 1px solid var(--g-line);
    box-shadow: 0 24px 60px rgb(0 0 0 / 0.28), inset 0 1px 0 rgb(255 255 255 / 0.08);
    translate: 0 0;
    transition: translate 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.4s ease;
  }
  .g-card::before {
    content: ""; position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(60% 40% at 20% 0%, rgb(255 255 255 / 0.09), transparent 70%);
  }
  .g-card:hover {
    translate: 0 -5px;
    border-color: rgb(237 34 36 / 0.38);
    box-shadow: 0 34px 80px rgb(0 0 0 / 0.36), inset 0 1px 0 rgb(255 255 255 / 0.12);
  }
  .g-card-wide { grid-column: span 7; }
  .g-card-work { grid-column: span 7; }
  .g-card-stat { grid-column: span 12; }
  .g-card-cta { grid-column: span 5; display: flex; flex-direction: column; justify-content: space-between; gap: 1rem; }
  .g-card-label {
    margin: 0 0 1rem; font-family: var(--font-mono); font-size: 0.62rem;
    text-transform: uppercase; letter-spacing: 0.16em; color: var(--g-muted);
  }
  .g-service-list { list-style: none; margin: 0; padding: 0; }
  .g-service-list li {
    display: grid; grid-template-columns: 2rem minmax(0, 1fr) auto;
    gap: 0.8rem; align-items: baseline; padding: 0.7rem 0;
    border-top: 1px solid var(--g-line);
  }
  .g-service-list li:first-child { border-top: 0; }
  .g-service-no { font-family: var(--font-mono); font-size: 0.66rem; color: var(--red); }
  .g-service-body { display: grid; gap: 0.15rem; }
  .g-service-title { font-family: var(--font-display); font-size: 1.1rem; text-transform: uppercase; }
  .g-service-tag { font-family: var(--font-mono); font-size: 0.64rem; color: var(--g-muted); }
  .g-service-arrow { color: var(--g-muted); }
  .g-mini-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.55rem; }
  .g-mini-list li { display: flex; gap: 0.7rem; font-family: var(--font-mono); font-size: 0.76rem; color: var(--g-soft); }
  .g-mini-list li span { color: var(--red); }
  .g-card-link {
    display: inline-block; margin-top: 1.1rem; font-family: var(--font-mono);
    font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.06em;
    text-decoration: none; color: var(--g-soft);
  }
  .g-card-link:hover { color: var(--paper); }
  .g-mini-work { display: grid; grid-template-columns: 1fr 1fr; gap: 0.7rem; }
  .g-mini-work figure { margin: 0; }
  .g-mini-work img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: 10px; }
  .g-mini-work figcaption { padding-top: 0.4rem; font-family: var(--font-mono); font-size: 0.6rem; color: var(--g-muted); }
  .g-card-stat dl { display: grid; grid-template-columns: repeat(3, 1fr); margin: 0; gap: 1rem; }
  .g-card-stat dt { font-family: var(--font-mono); font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--g-muted); }
  .g-card-stat dd { margin: 0.3rem 0 0; font-family: var(--font-display); font-size: clamp(1.6rem, 3vw, 2.4rem); line-height: 1; }
  .g-card-cta-line { margin: 0; font-family: var(--font-display); font-size: clamp(1.2rem, 2vw, 1.6rem); line-height: 1.05; text-transform: uppercase; }

  /* sticky pipeline */
  .g-pipeline {
    display: grid; grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
    gap: clamp(2rem, 5vw, 5rem); align-items: start;
  }
  .g-sticky { position: sticky; top: 7rem; }
  .g-pipeline h2 { margin-bottom: 1rem; }
  .g-sticky p { max-width: 34ch; line-height: 1.6; color: var(--g-soft); margin: 0 0 1.4rem; }
  .g-passes { display: grid; }
  .g-pass {
    display: grid; grid-template-columns: 4rem minmax(0, 1fr); gap: 1rem;
    padding: 1.6rem 0; border-top: 1px solid var(--g-line);
  }
  .g-pass:last-child { border-bottom: 1px solid var(--g-line); }
  .g-pass-no { font-family: var(--font-display); font-size: 2rem; line-height: 0.9; color: var(--red); }
  .g-pass h3 { margin: 0 0 0.3rem; font-family: var(--font-display); font-size: clamp(1.2rem, 2vw, 1.6rem); text-transform: uppercase; }
  .g-pass-note { margin: 0 0 0.5rem; font-family: var(--font-mono); font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--g-muted); }
  .g-pass p:last-child { margin: 0; line-height: 1.65; color: var(--g-soft); font-size: 0.92rem; }

  /* work */
  .g-work-grid {
    display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 1rem;
  }
  .g-work-item { grid-column: span var(--span, 5); margin: 0; }
  .g-work-frame {
    position: relative; overflow: hidden; border-radius: 14px;
    background: rgb(18 16 58 / 0.45);
    -webkit-backdrop-filter: blur(14px);
    backdrop-filter: blur(14px);
    border: 1px solid var(--g-line);
    box-shadow: 0 24px 60px rgb(0 0 0 / 0.32);
    translate: 0 0;
    transition: translate 0.45s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
  }
  .g-work-frame img {
    width: 100%; display: block; aspect-ratio: 4 / 3; object-fit: cover;
    filter: saturate(0.9); transition: transform 0.7s ease, filter 0.7s ease;
  }
  .g-work-item:nth-child(1) .g-work-frame img,
  .g-work-item:nth-child(6) .g-work-frame img { aspect-ratio: 16 / 9; }
  .g-work-item:hover .g-work-frame { translate: 0 -5px; border-color: rgb(237 34 36 / 0.4); }
  .g-work-item:hover img { transform: scale(1.035); filter: saturate(1.05); }
  .g-work-no {
    position: absolute; top: 0.5rem; left: 0.5rem; padding: 0.15rem 0.4rem;
    border-radius: 999px; background: rgb(8 7 21 / 0.55);
    -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
    border: 1px solid var(--g-line);
    font-family: var(--font-mono); font-size: 0.58rem; letter-spacing: 0.08em;
  }
  .g-work-item figcaption {
    padding-top: 0.5rem; font-family: var(--font-mono); font-size: 0.68rem;
    text-transform: uppercase; letter-spacing: 0.06em;
  }
  .g-work-item figcaption span { color: var(--g-muted); }
  .g-note { margin: 1rem 0 0; font-family: var(--font-mono); font-size: 0.66rem; color: var(--g-muted); }

  /* contact */
  .g-contact {
    display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(2rem, 5vw, 4rem); align-items: start;
    padding-bottom: clamp(4rem, 8vw, 7rem);
  }
  .g-contact-copy p { max-width: 42ch; line-height: 1.6; color: var(--g-soft); margin: 1rem 0 1.2rem; }
  .g-form {
    padding: clamp(1.2rem, 2vw, 1.6rem); border-radius: 16px;
    background: linear-gradient(180deg, rgb(255 255 255 / 0.06), rgb(255 255 255 / 0.018));
    -webkit-backdrop-filter: blur(18px);
    backdrop-filter: blur(18px);
    border: 1px solid var(--g-line);
    box-shadow: 0 30px 70px rgb(0 0 0 / 0.35);
  }
  .g-form-head {
    margin: 0 0 0.8rem; padding-bottom: 0.6rem; border-bottom: 1px solid var(--g-line);
    font-family: var(--font-mono); font-size: 0.66rem; text-transform: uppercase;
    letter-spacing: 0.14em; color: var(--g-muted);
  }
  .g-form label {
    display: block; margin: 0.9rem 0 0.35rem;
    font-family: var(--font-mono); font-size: 0.64rem; text-transform: uppercase;
    letter-spacing: 0.1em; color: var(--g-soft);
  }
  .g-form input, .g-form textarea {
    display: block; width: 100%; padding: 0.7rem 0.75rem;
    background: rgb(8 7 21 / 0.55); color: var(--paper);
    border: 1px solid var(--g-line); border-radius: 10px; font: inherit;
  }
  .g-form textarea { resize: vertical; min-height: 6rem; }
  .g-form ::placeholder { color: #8f8aab; opacity: 1; }
  .g-form button {
    width: 100%; margin-top: 1.2rem; padding: 0.9rem 1rem;
    background: var(--red-deep); color: var(--paper);
    border: 1px solid rgb(255 255 255 / 0.12); border-radius: 999px;
    font-family: var(--font-mono); font-size: 0.76rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.08em; cursor: pointer;
    transition: background 0.25s ease, transform 0.25s ease;
  }
  .g-form button:hover { background: var(--red); transform: translateY(-2px); }
  .g-sent { margin: 0; font-size: 0.82rem; line-height: 1.5; color: var(--g-soft); }
  .g-sent.has-msg { margin-top: 1rem; }
  .g-sent a { text-decoration: underline; text-underline-offset: 3px; }

  /* footer */
  .g-footer { border-top: 1px solid var(--g-line); padding: clamp(2.5rem, 5vw, 4rem) clamp(1.25rem, 4vw, 2rem); }
  .g-footer-in {
    max-width: 1180px; margin: 0 auto; display: grid;
    grid-template-columns: minmax(0, 1fr) auto; gap: 1.4rem 2rem; align-items: end;
  }
  .g-footer-brand { margin: 0; font-family: var(--font-display); font-size: clamp(2.4rem, 6vw, 4rem); line-height: 0.95; }
  .g-footer-nav { display: flex; flex-wrap: wrap; gap: 1.2rem; justify-content: flex-end; }
  .g-footer-nav a {
    font-family: var(--font-mono); font-size: 0.7rem; text-transform: uppercase;
    letter-spacing: 0.08em; text-decoration: none; color: var(--g-soft);
  }
  .g-footer-nav a:hover { color: var(--paper); }
  .g-colophon {
    grid-column: 1 / -1; margin: 0.4rem 0 0; padding-top: 0.9rem;
    border-top: 1px solid var(--g-line); font-family: var(--font-mono);
    font-size: 0.66rem; line-height: 1.6; color: var(--g-muted);
  }

  @keyframes g-drift {
    from { transform: translate3d(-2%, -1%, 0) scale(1); }
    to { transform: translate3d(2%, 2%, 0) scale(1.06); }
  }
  @keyframes g-marquee { to { transform: translateX(-50%); } }
  @keyframes g-fade {
    from { opacity: 0; transform: scale(1.02); }
    to { opacity: 1; transform: none; }
  }

  @media (max-width: 900px) {
    .g-console-grid { grid-template-columns: 1fr; }
    .g-sec-head, .g-pipeline, .g-contact { grid-template-columns: 1fr; }
    .g-sticky { position: static; }
    .g-card-wide, .g-card-work, .g-card-stat, .g-card-cta, .g-card { grid-column: span 12; }
  }
  @media (max-width: 640px) {
    .g-nav-links, .g-nav-cta { display: none; }
    .g-menu { display: block; }
    .g-nav-pill { gap: 1rem; padding: 0.45rem 0.55rem 0.45rem 0.85rem; }
    .g-hero { padding-top: 5.5rem; }
    .g-console-wrap { padding-top: 1.5rem; }
    .g-work-item { grid-column: span 12; }
    .g-footer-in { grid-template-columns: 1fr; align-items: start; }
    .g-footer-nav { justify-content: flex-start; gap: 1rem; }
  }
  @media (prefers-reduced-motion: reduce) {
    .g-aura, .g-marquee-track, .g-visual-img { animation: none; }
    .g-console { transition: none; }
    .g-card, .g-work-frame, .g-form button, .g-btn, .g-nav-cta { transition: none; }
  }
</style>
