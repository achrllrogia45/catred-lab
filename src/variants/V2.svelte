<script>
  import { onMount, tick } from "svelte";
  import { studio, services, works, pipeline, img } from "../lib/data.js";
  import { reveal } from "../lib/reveal.js";

  let root = $state();
  let rail = $state();
  let menu = $state();
  let statusEl = $state();
  let active = $state(0);
  let sent = $state(false);
  let scrolled = $state(false);
  let progress = $state(0);
  let form = $state({ name: "", email: "", details: "" });

  const clean = (t) => String(t).replaceAll("—", "-").replaceAll("–", "-");
  const mail = `mailto:${studio.email}`;
  const inks = ["var(--red)", "var(--indigo)", "var(--violet)", "var(--ink)"];
  const reduced = () =>
    typeof matchMedia === "function" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;

  onMount(() => {
    if (!root) return;
    const onScroll = () => {
      const y = window.scrollY;
      scrolled = y > 24;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress = max > 0 ? Math.min(1, y / max) : 0;
      root.style.setProperty("--par", `${Math.min(y, 700) * -0.06}px`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const stop = reveal(root);
    return () => {
      window.removeEventListener("scroll", onScroll);
      stop();
    };
  });

  function onTabKey(event, index) {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const last = services.length - 1;
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    active = next;
    document.getElementById(`plate-tab-${services[next].id}`)?.focus();
  }

  function scrollRail(direction) {
    const stage = rail?.querySelector("li");
    const step = stage?.offsetWidth ?? 294;
    rail?.scrollBy({
      left: direction * step,
      behavior: reduced() ? "auto" : "smooth",
    });
  }

  function closeMenu() {
    if (menu) menu.open = false;
  }

  function onMenuKey(event) {
    if (event.key === "Escape" && menu?.open) {
      menu.open = false;
      menu.querySelector("summary")?.focus();
    }
  }

  async function onSubmit(event) {
    event.preventDefault();
    const subject = encodeURIComponent(`Project inquiry - ${form.name}`);
    const body = encodeURIComponent(
      `${form.details}\n\nFrom: ${form.name} <${form.email}>`,
    );
    window.location.href = `mailto:${studio.email}?subject=${subject}&body=${body}`;
    sent = true;
    await tick();
    statusEl?.focus();
  }
</script>

<div class="pp" bind:this={root}>
  <a class="pp-skip" href="#pp-main">Skip to content</a>
  <div class="pp-progress" style={`transform:scaleX(${progress})`} aria-hidden="true"></div>

  <header class="pp-header" class:is-scrolled={scrolled}>
    <div class="pp-header-in">
      <a class="pp-brand" href="#pp-top">CATRED</a>
      <nav class="pp-nav" aria-label="Primary">
        <a href="#plates">Services</a>
        <a href="#process">Process</a>
        <a href="#work">Work</a>
        <a href="#contact">Contact</a>
      </nav>
      <a class="pp-cta-sm" href={mail}>Start a project</a>
      <details class="pp-menu" bind:this={menu}>
        <summary onkeydown={onMenuKey}>Menu</summary>
        <nav aria-label="Mobile">
          <a href="#plates" onclick={closeMenu} onkeydown={onMenuKey}>Services</a>
          <a href="#process" onclick={closeMenu} onkeydown={onMenuKey}>Process</a>
          <a href="#work" onclick={closeMenu} onkeydown={onMenuKey}>Work</a>
          <a href="#contact" onclick={closeMenu} onkeydown={onMenuKey}>Contact</a>
          <a href={mail} onclick={closeMenu} onkeydown={onMenuKey}>Start a project</a>
        </nav>
      </details>
    </div>
  </header>

  <main id="pp-main" tabindex="-1">
    <section class="pp-hero" id="pp-top" aria-labelledby="pp-hero-h">
      <div class="pp-crop" aria-hidden="true"><span></span><span></span><span></span><span></span></div>

      <div class="pp-hero-in">
        <div class="pp-hero-copy">
          <h1 class="pp-h1" id="pp-hero-h">Concept<br />to printed<br />object.</h1>
          <p class="pp-lede">
            A creative studio for 2D, 3D, CAD and print. One team from first
            sketch to physical object.
          </p>
          <div class="pp-actions">
            <a class="pp-btn" href={mail}>Start a project</a>
            <a class="pp-link" href="#plates">See the plates <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <figure class="pp-hero-plate">
          <div class="pp-media">
            <img
              src={img("dhero-reel.svg")}
              alt="Catred studio showreel artwork - placeholder"
              fetchpriority="high"
            />
            <span class="pp-halftone" aria-hidden="true"></span>
          </div>
          <figcaption><span>Proof 01</span> Hero sheet / placeholder artwork</figcaption>
        </figure>
      </div>

      <svg class="pp-thread" viewBox="0 0 1200 760" fill="none" aria-hidden="true" preserveAspectRatio="none">
        <path
          d="M-40 630 C 180 570 200 300 420 300 S 700 540 880 430 S 1080 150 1240 205"
          stroke="var(--red)"
          stroke-width="2.5"
          stroke-linecap="round"
        />
        <circle cx="420" cy="300" r="5" fill="var(--red)" />
        <circle cx="880" cy="430" r="5" fill="var(--red)" />
      </svg>

    </section>

    <section class="pp-section" id="plates" aria-labelledby="plates-h">
      <div class="pp-section-head rv">
        <h2 id="plates-h">Four plates, one press.</h2>
        <p>
          Four disciplines, one roof. Every plate ships real work, not promises.
        </p>
      </div>

      <div class="pp-plates">
        <div class="pp-tablist" role="tablist" aria-label="Disciplines" aria-orientation="vertical">
          {#each services as s, i (s.id)}
            <button
              class="pp-tab"
              class:is-active={active === i}
              id={`plate-tab-${s.id}`}
              role="tab"
              aria-selected={active === i}
              aria-controls={`plate-panel-${s.id}`}
              tabindex={active === i ? 0 : -1}
              onclick={() => (active = i)}
              onkeydown={(event) => onTabKey(event, i)}
            >
              <span class="pp-tab-num">{s.index}</span>
              <span class="pp-tab-body">
                <span class="pp-tab-title">{s.title}</span>
                <span class="pp-tab-tag">{s.tag}</span>
              </span>
              <span class="pp-swatch" style={`background:${inks[i]}`} aria-hidden="true"></span>
            </button>
          {/each}
        </div>

        <div class="pp-panel-wrap">
          {#each services as s, i (s.id)}
            <div
              class="pp-panel"
              id={`plate-panel-${s.id}`}
              role="tabpanel"
              aria-labelledby={`plate-tab-${s.id}`}
              tabindex="0"
              hidden={active !== i}
            >
              <div class="pp-panel-media">
                <img
                  src={img(s.img)}
                  alt=""
                  loading={i === 0 ? "eager" : "lazy"}
                />
                <span class="pp-panel-mark" aria-hidden="true">Plate {s.index}</span>
              </div>
              <div class="pp-panel-copy">
                <h3>{s.title}</h3>
                <p>{clean(s.desc)}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
      <p class="pp-note">Panel art is placeholder; real work replaces it.</p>
    </section>

    <section class="pp-section" id="process" aria-labelledby="process-h">
      <div class="pp-section-head rv">
        <h2 id="process-h">Five passes, sketch to object.</h2>
        <p>
          One team of drawers, modelers, engineers and printers. No handoffs
          between vendors, no lost files.
        </p>
      </div>

      <div
        class="pp-rail-viewport"
        role="group"
        aria-label="Studio process: five stages."
        bind:this={rail}
      >
        <ol class="pp-rail" role="list">
          {#each pipeline as p, i (p.step)}
            <li class="pp-stage">
              <span class="pp-stage-num">Pass {String(i + 1).padStart(2, "0")}</span>
              <h3>{p.step}</h3>
              <p class="pp-stage-note">{p.note}</p>
              <p class="pp-stage-body">{p.body}</p>
            </li>
          {/each}
        </ol>
      </div>

      <div class="pp-rail-controls">
        <button type="button" onclick={() => scrollRail(-1)} aria-label="Previous process stages">←</button>
        <p class="pp-rail-hint" aria-hidden="true">Scroll or use the buttons</p>
        <button type="button" onclick={() => scrollRail(1)} aria-label="Next process stages">→</button>
      </div>
    </section>

    <section class="pp-section" id="work" aria-labelledby="work-h">
      <div class="pp-section-head rv">
        <h2 id="work-h">Selected work</h2>
        <p>Six pieces from the current set. The proof shows range, not decoration.</p>
      </div>

      <div class="pp-contact-sheet">
        {#each works as w, i (w.title)}
          <figure class="pp-frame rv" style={`--span:${i === 0 ? 7 : i === 1 ? 5 : i === 5 ? 12 : 4}`}>
            <div class="pp-frame-media">
              <img
                src={img(w.img)}
                alt=""
                loading={i < 2 ? "eager" : "lazy"}
              />
              <span class="pp-frame-index" aria-hidden="true">Fig. {String(i + 1).padStart(2, "0")}</span>
            </div>
            <figcaption>{w.title} <span>/ {w.type}</span></figcaption>
          </figure>
        {/each}
      </div>
      <p class="pp-note">Artwork on this proof is placeholder; real work replaces it.</p>
    </section>

    <section class="pp-spec rv" aria-labelledby="spec-h">
      <h2 id="spec-h">Studio specification</h2>
      <dl>
        <div><dt>Disciplines</dt><dd>{String(services.length).padStart(2, "0")}</dd></div>
        <div><dt>Pipeline</dt><dd>{String(pipeline.length).padStart(2, "0")}</dd></div>
        <div><dt>Selected pieces</dt><dd>{String(works.length).padStart(2, "0")}</dd></div>
        <div><dt>Based</dt><dd>{clean(studio.location)}</dd></div>
        <div><dt>Email</dt><dd><a href={mail}>{studio.email}</a></dd></div>
        <div><dt>Instagram</dt><dd><a href={studio.instagram} target="_blank" rel="noreferrer">@catred_studio</a></dd></div>
      </dl>
    </section>

    <section class="pp-section pp-contact" id="contact" aria-labelledby="contact-h">
      <div class="pp-contact-copy rv">
        <h2 id="contact-h">Have something to build?</h2>
        <p>
          Tell us what we are making, the size, and the deadline. We reply from
          {studio.email}.
        </p>
        <p class="pp-contact-alt">
          Prefer email? <a href={mail}>Write to {studio.email}</a>
        </p>
      </div>

      <form class="pp-ticket rv" onsubmit={onSubmit}>
        <p class="pp-ticket-head">Job ticket / new inquiry</p>

        <label for="pp-name">Name</label>
        <input id="pp-name" bind:value={form.name} required autocomplete="name" />

        <label for="pp-email">Email</label>
        <input id="pp-email" type="email" bind:value={form.email} required autocomplete="email" />

        <label for="pp-details">What are we making?</label>
        <textarea
          id="pp-details"
          rows="4"
          bind:value={form.details}
          required
          placeholder="Subject, size, deadline"
        ></textarea>

        <button type="submit">Send inquiry <span aria-hidden="true">→</span></button>

        <p class="pp-sent" class:has-msg={sent} role="status" tabindex="-1" bind:this={statusEl}>
          {#if sent}
            Your mail app should open with the brief. If it does not,
            <a href={mail}>email {studio.email}</a>.
          {/if}
        </p>
      </form>
    </section>
  </main>

  <footer class="pp-footer">
    <div class="pp-footer-in">
      <div>
        <p class="pp-footer-brand">CATRED STUDIO</p>
        <p class="pp-footer-line">Concept to printed object.</p>
      </div>
      <nav class="pp-footer-nav" aria-label="Footer">
        <a href="#plates">Services</a>
        <a href="#work">Work</a>
        <a href={mail}>Start a project</a>
        <a href={studio.instagram} target="_blank" rel="noreferrer">Instagram</a>
      </nav>
      <p class="pp-colophon">
        {clean(studio.location)}. Set in Archivo Black, Space Grotesk and Space
        Mono. © 2026 {studio.domain}.
      </p>
    </div>
  </footer>
</div>

<style>
  :global(html) {
    scroll-padding-top: 5rem;
  }
  .pp {
    min-height: 100vh;
    background: var(--paper);
    color: var(--ink);
    font-family: var(--font-body);
    overflow-x: clip;
  }
  .pp a {
    color: inherit;
  }
  .pp :focus-visible {
    outline: 2px solid var(--red-deep);
    outline-offset: 3px;
  }
  .pp-skip {
    position: fixed;
    top: 0.5rem;
    left: 0.5rem;
    z-index: 200;
    padding: 0.6rem 0.9rem;
    background: var(--ink);
    color: var(--paper);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    text-decoration: none;
    transform: translateY(-200%);
  }
  .pp-skip:focus {
    transform: none;
  }
  .pp-progress {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--red);
    transform-origin: 0 50%;
    z-index: 210;
    pointer-events: none;
    box-shadow: 0 0 12px rgb(237 34 36 / 0.55);
  }

  /* header */
  .pp-header {
    position: sticky;
    top: 0;
    z-index: 80;
    background: var(--paper);
    border-bottom: 1.5px solid var(--ink);
    transition: background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
  }
  .pp-header.is-scrolled {
    background: color-mix(in srgb, var(--paper) 86%, transparent);
    -webkit-backdrop-filter: blur(20px) saturate(1.2);
    backdrop-filter: blur(20px) saturate(1.2);
    box-shadow: 0 12px 30px rgb(10 8 32 / 0.08);
  }
  .pp-header-in {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0.85rem clamp(1.25rem, 4vw, 2rem);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
  }
  .pp-brand {
    font-family: var(--font-display);
    font-size: 1.35rem;
    letter-spacing: 0.02em;
    text-decoration: none;
  }
  .pp-nav {
    display: flex;
    gap: 1.35rem;
  }
  .pp-nav a,
  .pp-footer-nav a {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    text-decoration: none;
    border-bottom: 1.5px solid transparent;
    padding-bottom: 0.15rem;
  }
  .pp-nav a:hover,
  .pp-footer-nav a:hover {
    border-bottom-color: var(--red-deep);
  }
  .pp-cta-sm {
    background: var(--red-deep);
    color: var(--paper) !important;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    text-decoration: none;
    padding: 0.62rem 0.9rem;
    border: 1.5px solid var(--red-deep);
    border-radius: 4px;
    white-space: nowrap;
  }
  .pp-cta-sm:hover {
    background: var(--ink);
    border-color: var(--ink);
  }
  .pp-menu {
    display: none;
    position: relative;
  }
  .pp-menu summary {
    list-style: none;
    cursor: pointer;
    border: 1.5px solid var(--ink);
    padding: 0.5rem 0.7rem;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .pp-menu summary::-webkit-details-marker {
    display: none;
  }
  .pp-menu nav {
    position: absolute;
    z-index: 90;
    right: 0;
    top: calc(100% + 0.45rem);
    min-width: 12rem;
    display: grid;
    gap: 0.15rem;
    background: var(--paper);
    border: 1.5px solid var(--ink);
    padding: 0.5rem;
  }
  .pp-menu nav a {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    text-decoration: none;
    padding: 0.55rem 0.6rem;
  }
  .pp-menu nav a:hover {
    background: var(--ink);
    color: var(--paper);
  }

  /* hero */
  .pp-hero {
    position: relative;
    max-width: 1180px;
    margin: 0 auto;
    padding: clamp(1.25rem, 3vw, 2.5rem) clamp(1.25rem, 4vw, 2rem) 0;
  }
  .pp-hero-in {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(0, 1.12fr) minmax(0, 0.88fr);
    gap: clamp(2rem, 5vw, 4.5rem);
    align-items: center;
    padding-block: 1rem clamp(1.5rem, 3vw, 2.5rem);
  }
  .pp-h1 {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(2.7rem, 7.2vw, 5.5rem);
    line-height: 0.9;
    letter-spacing: -0.035em;
    text-transform: uppercase;
    text-shadow: 0.055em 0.035em 0 rgb(91 44 140 / 0.55);
  }
  .pp-lede {
    max-width: 44ch;
    margin: 1.2rem 0 0;
    font-size: clamp(1rem, 1.5vw, 1.15rem);
    line-height: 1.6;
  }
  .pp-actions {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
    margin-top: 1.5rem;
  }
  .pp-btn {
    display: inline-block;
    background: var(--red-deep);
    color: var(--paper) !important;
    font-family: var(--font-mono);
    font-size: 0.82rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    text-decoration: none;
    padding: 0.95rem 1.35rem;
    border: 1.5px solid var(--red-deep);
    border-radius: 4px;
  }
  .pp-btn:hover {
    background: var(--ink);
    border-color: var(--ink);
  }
  .pp-link {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 1.5px;
  }
  .pp-link:hover {
    color: var(--red-deep);
  }
  .pp-hero-plate {
    margin: 0;
    padding: 0.5rem;
    background: #fff;
    border: 1.5px solid var(--ink);
    transform: rotate(-0.55deg);
    translate: 0 var(--par, 0px);
    animation: pp-register 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .pp-hero-plate figcaption {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.6rem 0.25rem 0.1rem;
    font-family: var(--font-mono);
    font-size: 0.66rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .pp-hero-plate figcaption span {
    color: var(--red-deep);
    white-space: nowrap;
  }
  .pp-media {
    position: relative;
    aspect-ratio: 4 / 5;
    overflow: hidden;
    background: var(--ink);
  }
  .pp-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(1) contrast(1.08);
  }
  .pp-halftone {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle at center, rgb(20 18 51 / 0.32) 0.8px, transparent 1.1px);
    background-size: 5px 5px;
    mix-blend-mode: multiply;
    opacity: 0.55;
    pointer-events: none;
  }
  .pp-thread {
    position: absolute;
    inset: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
    pointer-events: none;
  }
  .pp-thread path {
    stroke-dasharray: 1400;
    animation: pp-draw 2.4s cubic-bezier(0.16, 1, 0.3, 1) both;
    filter: drop-shadow(0 0 7px rgb(237 34 36 / 0.35));
  }
  .pp-crop span {
    position: absolute;
    width: 22px;
    height: 22px;
    border-color: var(--ink);
    border-style: solid;
    border-width: 0;
    opacity: 0.55;
  }
  .pp-crop span:nth-child(1) {
    top: 10px;
    left: 10px;
    border-top-width: 1.5px;
    border-left-width: 1.5px;
  }
  .pp-crop span:nth-child(2) {
    top: 10px;
    right: 10px;
    border-top-width: 1.5px;
    border-right-width: 1.5px;
  }
  .pp-crop span:nth-child(3) {
    bottom: 10px;
    left: 10px;
    border-bottom-width: 1.5px;
    border-left-width: 1.5px;
  }
  .pp-crop span:nth-child(4) {
    bottom: 10px;
    right: 10px;
    border-bottom-width: 1.5px;
    border-right-width: 1.5px;
  }

  /* sections */
  .pp-section {
    max-width: 1180px;
    margin: 0 auto;
    padding: clamp(3.5rem, 7vw, 6rem) clamp(1.25rem, 4vw, 2rem) 0;
  }
  .pp-section-head {
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    gap: 2rem;
    align-items: end;
    border-top: 1.5px solid var(--ink);
    padding-top: 1.15rem;
    margin-bottom: 2.4rem;
  }
  .pp-section-head h2,
  .pp-spec h2,
  .pp-contact-copy h2 {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 4vw, 3.2rem);
    line-height: 1.02;
    letter-spacing: -0.02em;
    text-transform: uppercase;
  }
  .pp-section-head p {
    margin: 0;
    max-width: 48ch;
    line-height: 1.6;
  }

  /* plates / services */
  .pp-plates {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: clamp(1.5rem, 3vw, 3rem);
    align-items: start;
  }
  .pp-tablist {
    display: flex;
    flex-direction: column;
    border-top: 1.5px solid var(--ink);
  }
  .pp-tab {
    display: grid;
    grid-template-columns: 2.6rem 1fr 1rem;
    gap: 0.9rem;
    align-items: center;
    width: 100%;
    padding: 1rem 0.2rem;
    background: none;
    border: 0;
    border-bottom: 1.5px solid var(--ink);
    color: var(--ink);
    text-align: left;
    cursor: pointer;
    transition: background 0.3s ease, color 0.3s ease, padding 0.3s ease;
  }
  .pp-tab:hover .pp-tab-title {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  .pp-tab.is-active {
    background: var(--ink);
    color: var(--paper);
    padding-inline: 0.8rem;
    box-shadow: 0 10px 26px rgb(10 8 32 / 0.18);
  }
  .pp-tab-num {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--red-deep);
  }
  .pp-tab.is-active .pp-tab-num {
    color: var(--paper);
  }
  .pp-tab-body {
    display: grid;
    gap: 0.2rem;
  }
  .pp-tab-title {
    font-family: var(--font-display);
    font-size: clamp(1.05rem, 1.8vw, 1.35rem);
    line-height: 1.05;
    text-transform: uppercase;
  }
  .pp-tab-tag {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    line-height: 1.4;
  }
  .pp-swatch {
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 50%;
    border: 1.5px solid currentColor;
  }
  .pp-panel {
    margin: 0;
    padding: 0.55rem;
    background: #fff;
    border: 1.5px solid var(--ink);
    box-shadow: 0 20px 50px rgb(10 8 32 / 0.1);
  }
  .pp-panel:not([hidden]) {
    animation: pp-panel-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .pp-panel-media {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: var(--ink);
  }
  .pp-panel-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .pp-panel-mark {
    position: absolute;
    left: 0.45rem;
    bottom: 0.45rem;
    padding: 0.12rem 0.35rem;
    background: var(--paper);
    border: 1px solid var(--ink);
    font-family: var(--font-mono);
    font-size: 0.62rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .pp-panel-copy {
    padding: 1.2rem 0.7rem 0.4rem;
  }
  .pp-panel-copy h3 {
    margin: 0.45rem 0 0.5rem;
    font-family: var(--font-display);
    font-size: clamp(1.4rem, 2.4vw, 2rem);
    line-height: 1.05;
    text-transform: uppercase;
  }
  .pp-panel-copy p:last-child {
    margin: 0;
    max-width: 58ch;
    line-height: 1.6;
  }

  /* process */
  .pp-rail-viewport {
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--ink) transparent;
    padding-bottom: 0.6rem;
  }
  .pp-rail {
    display: flex;
    gap: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    min-width: max-content;
    border-bottom: 1.5px solid transparent;
  }
  .pp-stage {
    flex: 0 0 270px;
    border-top: 1.5px solid var(--ink);
    padding: 1rem 1.5rem 0.5rem 0;
  }
  .pp-stage + .pp-stage {
    padding-left: 1.5rem;
    border-left: 1.5px solid var(--ink);
  }
  .pp-stage-num {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--red-deep);
  }
  .pp-stage h3 {
    margin: 0.45rem 0 0.3rem;
    font-family: var(--font-display);
    font-size: 1.5rem;
    line-height: 1.05;
    text-transform: uppercase;
  }
  .pp-stage-note {
    margin: 0 0 0.7rem;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .pp-stage-body {
    margin: 0;
    font-size: 0.86rem;
    line-height: 1.55;
  }
  .pp-rail-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 0.9rem;
  }
  .pp-rail-controls button {
    width: 2.6rem;
    height: 2.6rem;
    background: var(--paper);
    color: var(--ink);
    border: 1.5px solid var(--ink);
    border-radius: 4px;
    font-size: 1.15rem;
    line-height: 1;
    cursor: pointer;
  }
  .pp-rail-controls button:hover {
    background: var(--ink);
    color: var(--paper);
  }
  .pp-rail-hint {
    margin: 0;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  /* work */
  .pp-contact-sheet {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 1rem;
  }
  .pp-frame {
    grid-column: span var(--span, 4);
    margin: 0;
  }
  .pp-frame-media {
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    border: 1.5px solid var(--ink);
    background: var(--ink);
    transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.55s ease;
  }
  .pp-frame-media::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(115deg, rgb(255 255 255 / 0.28), transparent 42%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }
  .pp-frame:hover .pp-frame-media,
  .pp-frame:focus-within .pp-frame-media {
    transform: translateY(-6px);
    box-shadow: 0 24px 50px rgb(10 8 32 / 0.2);
  }
  .pp-frame:hover .pp-frame-media::after,
  .pp-frame:focus-within .pp-frame-media::after {
    opacity: 1;
  }
  .pp-frame[style*="--span:12"] .pp-frame-media,
  .pp-frame[style*="--span:7"] .pp-frame-media,
  .pp-frame[style*="--span:5"] .pp-frame-media {
    aspect-ratio: 16 / 9;
  }
  .pp-frame-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  .pp-frame:hover img,
  .pp-frame:focus-within img {
    transform: scale(1.03);
  }
  .pp-frame-index {
    position: absolute;
    top: 0.45rem;
    left: 0.45rem;
    padding: 0.12rem 0.35rem;
    background: var(--paper);
    border: 1px solid var(--ink);
    font-family: var(--font-mono);
    font-size: 0.62rem;
  }
  .pp-frame figcaption {
    padding-top: 0.45rem;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .pp-frame figcaption span {
    font-weight: 400;
  }
  .pp-note {
    margin: 1rem 0 0;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.06em;
  }

  /* spec */
  .pp-spec {
    max-width: 1180px;
    margin: 0 auto;
    padding: clamp(3.5rem, 7vw, 6rem) clamp(1.25rem, 4vw, 2rem) 0;
  }
  .pp-spec h2 {
    margin-bottom: 1.25rem;
  }
  .pp-spec dl {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin: 0;
    border-top: 1.5px solid var(--ink);
    border-bottom: 1.5px solid var(--ink);
  }
  .pp-spec dl > div {
    padding: 0.9rem 1.1rem;
    border-right: 1.5px solid var(--ink);
  }
  .pp-spec dl > div:nth-child(3n) {
    border-right: 0;
  }
  .pp-spec dt {
    font-family: var(--font-mono);
    font-size: 0.66rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .pp-spec dd {
    margin: 0.35rem 0 0;
    font-family: var(--font-display);
    font-size: clamp(1rem, 1.8vw, 1.3rem);
    line-height: 1.1;
    text-transform: uppercase;
    overflow-wrap: anywhere;
  }
  .pp-spec dd a {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  /* contact */
  .pp-contact {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(2rem, 5vw, 4rem);
    align-items: start;
    padding-bottom: clamp(4rem, 8vw, 7rem);
  }
  .pp-contact-copy p {
    max-width: 44ch;
    line-height: 1.6;
  }
  .pp-contact-alt {
    font-family: var(--font-mono);
    font-size: 0.8rem;
  }
  .pp-contact-alt a {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .pp-ticket {
    background: #fff;
    border: 1.5px solid var(--ink);
    padding: 1.4rem;
  }
  .pp-ticket-head {
    margin: 0 0 0.6rem;
    padding-bottom: 0.6rem;
    border-bottom: 1.5px solid var(--ink);
    font-family: var(--font-mono);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }
  .pp-ticket label {
    display: block;
    margin: 0.95rem 0 0.35rem;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .pp-ticket input,
  .pp-ticket textarea {
    display: block;
    width: 100%;
    padding: 0.7rem 0.75rem;
    background: var(--paper);
    color: var(--ink);
    border: 1.5px solid var(--ink);
    border-radius: 0;
    font: inherit;
  }
  .pp-ticket textarea {
    resize: vertical;
    min-height: 6rem;
  }
  .pp-ticket ::placeholder {
    color: #6b6879;
    opacity: 1;
  }
  .pp-ticket button {
    width: 100%;
    margin-top: 1.25rem;
    padding: 0.95rem 1rem;
    background: var(--red-deep);
    color: var(--paper);
    border: 1.5px solid var(--red-deep);
    border-radius: 4px;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    cursor: pointer;
  }
  .pp-ticket button:hover {
    background: var(--ink);
    border-color: var(--ink);
  }
  .pp-sent {
    margin: 0;
    font-size: 0.82rem;
    line-height: 1.5;
  }
  .pp-sent.has-msg {
    margin-top: 1rem;
  }
  .pp-sent a {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  /* footer */
  .pp-footer {
    background: var(--ink);
    color: var(--paper);
    padding: clamp(2.5rem, 5vw, 4rem) clamp(1.25rem, 4vw, 2rem);
  }
  .pp-footer-in {
    max-width: 1180px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 1.5rem 2rem;
    align-items: end;
  }
  .pp-footer-brand {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 3.4rem);
    line-height: 0.95;
    letter-spacing: -0.02em;
  }
  .pp-footer-line {
    margin: 0.5rem 0 0;
    font-family: var(--font-mono);
    font-size: 0.76rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    opacity: 0.7;
  }
  .pp-footer-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem;
    justify-content: flex-end;
  }
  .pp-footer-nav a:hover {
    color: var(--paper);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .pp-colophon {
    grid-column: 1 / -1;
    margin: 0.5rem 0 0;
    padding-top: 0.9rem;
    border-top: 1px solid rgb(246 244 238 / 0.28);
    font-family: var(--font-mono);
    font-size: 0.68rem;
    line-height: 1.6;
    opacity: 0.72;
  }

  @keyframes pp-register {
    from {
      opacity: 0;
      transform: translateY(10px) rotate(-0.55deg);
    }
    to {
      opacity: 1;
      transform: translateY(0) rotate(-0.55deg);
    }
  }
  @keyframes pp-draw {
    from {
      stroke-dashoffset: 1400;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
  @keyframes pp-panel-in {
    from {
      opacity: 0;
      transform: translateY(10px) scale(0.995);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @media (max-width: 900px) {
    .pp-hero-in,
    .pp-plates,
    .pp-contact,
    .pp-section-head {
      grid-template-columns: 1fr;
    }
    .pp-section-head {
      gap: 0.9rem;
      align-items: start;
    }
    .pp-hero-plate {
      max-width: 34rem;
    }
    .pp-spec dl {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .pp-spec dl > div:nth-child(3n) {
      border-right: 1.5px solid var(--ink);
    }
    .pp-spec dl > div:nth-child(2n) {
      border-right: 0;
    }
  }

  @media (max-width: 640px) {
    .pp-nav,
    .pp-cta-sm {
      display: none;
    }
    .pp-menu {
      display: block;
    }
    .pp-hero {
      padding-top: 1.8rem;
    }
    .pp-hero-in {
      padding-block: 1.5rem 2.5rem;
    }
    .pp-hero-plate figcaption {
      flex-direction: column;
      gap: 0.2rem;
    }
    .pp-rail-viewport {
      overflow: visible;
    }
    .pp-rail {
      display: grid;
      min-width: 0;
    }
    .pp-stage {
      flex: none;
      padding: 0.9rem 0 1rem;
    }
    .pp-stage + .pp-stage {
      padding-left: 0;
      border-left: 0;
    }
    .pp-rail-controls {
      display: none;
    }
    .pp-thread {
      display: none;
    }
    .pp-contact-sheet .pp-frame {
      grid-column: span 12;
    }
    .pp-frame-media,
    .pp-frame[style*="--span:7"] .pp-frame-media,
    .pp-frame[style*="--span:5"] .pp-frame-media {
      aspect-ratio: 4 / 3;
    }
    .pp-spec dl {
      grid-template-columns: 1fr;
    }
    .pp-spec dl > div,
    .pp-spec dl > div:nth-child(2n),
    .pp-spec dl > div:nth-child(3n) {
      border-right: 0;
      border-bottom: 1.5px solid var(--ink);
    }
    .pp-spec dl > div:last-child {
      border-bottom: 0;
    }
    .pp-footer-in {
      grid-template-columns: 1fr;
      align-items: start;
    }
    .pp-footer-nav {
      justify-content: flex-start;
      gap: 1rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .pp-hero-plate,
    .pp-thread path {
      animation: none;
    }
    .pp-thread path {
      stroke-dashoffset: 0;
    }
    .pp-frame-media img {
      transition: none;
    }
    .pp-frame:hover img,
    .pp-frame:focus-within img {
      transform: none;
    }
    .pp-panel:not([hidden]) {
      animation: none;
    }
    .pp-header {
      transition: none;
    }
    .pp-frame-media {
      transition: none;
    }
    .pp-frame:hover .pp-frame-media,
    .pp-frame:focus-within .pp-frame-media {
      transform: none;
      box-shadow: none;
    }
    .pp-frame-media::after {
      transition: none;
      opacity: 0;
    }
    .pp {
      scroll-behavior: auto;
    }
  }
</style>
