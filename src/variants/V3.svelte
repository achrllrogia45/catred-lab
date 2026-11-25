<script>
  import { onMount, tick } from "svelte";
  import { studio } from "../lib/data.js";
  import { reveal } from "../lib/reveal.js";
  import ThreadStage from "./v3/ThreadStage.svelte";
  import Chapters from "./v3/Chapters.svelte";

  let root = $state();
  let menu = $state();
  let statusEl = $state();
  let sent = $state(false);
  let stage = $state(0);
  let form = $state({ name: "", email: "", details: "" });

  const clean = (t) => String(t).replaceAll("—", "-").replaceAll("–", "-");
  const mail = `mailto:${studio.email}`;

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

  onMount(() => {
    if (!root) return;
    const stop = reveal(root);
    const fine =
      typeof matchMedia === "function" &&
      matchMedia("(pointer: fine)").matches;
    const onMove = (event) => {
      root.style.setProperty("--mx", `${event.clientX}px`);
      root.style.setProperty("--my", `${event.clientY}px`);
    };
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      stop();
      if (fine) window.removeEventListener("pointermove", onMove);
    };
  });
</script>

<div class="vm" bind:this={root}>
  <div class="vm-aura" aria-hidden="true"></div>
  <div class="vm-glow" aria-hidden="true"></div>
  <a class="vm-skip" href="#vm-main">Skip to content</a>

  <header class="vm-header">
    <div class="vm-header-in">
      <a class="vm-brand" href="#vm-top">CATRED</a>
      <nav class="vm-nav" aria-label="Primary">
        <a href="#services">Services</a>
        <a href="#process">Process</a>
        <a href="#work">Work</a>
        <a href="#contact">Contact</a>
      </nav>
      <a class="vm-cta-sm" href={mail}>Start a project</a>
      <details class="vm-menu" bind:this={menu}>
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

  <main id="vm-main" tabindex="-1">
    <section class="vm-hero" id="vm-top" aria-labelledby="vm-h">
      <div class="vm-hero-in">
        <div class="vm-hero-copy">
          <h1 id="vm-h">Thread goes in.<br />Object comes out.</h1>
          <p class="vm-lede">
            A creative studio for 2D, 3D, CAD and print. One team from first
            sketch to physical object.
          </p>
          <div class="vm-actions">
            <a class="vm-btn" href={mail}>Start a project</a>
            <a class="vm-link" href="#services">Follow the thread <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <div class="vm-stage">
          <ThreadStage bind:stage={stage} />
        </div>
      </div>

      <div class="vm-hero-foot">
        <span>One thread. Five stages.</span>
        <span>Drag the stage at right / below</span>
      </div>
    </section>

    <div class="vm-ticker" aria-hidden="true">
      <div class="vm-ticker-track">
        {#each ["CONCEPT", "MODEL", "CAD", "PRINT", "CONCEPT", "MODEL", "CAD", "PRINT"] as word}
          <span>{word}</span>
        {/each}
      </div>
    </div>

    <Chapters />

    <section class="vm-contact" id="contact" aria-labelledby="vm-contact-h">
      <div class="vm-contact-copy rv">
        <h2 id="vm-contact-h">Have something to build?</h2>
        <p>
          Tell us what we are making, the size, and the deadline. We reply from
          {studio.email}.
        </p>
        <p class="vm-contact-alt">
          Prefer email? <a href={mail}>Write to {studio.email}</a>
        </p>
      </div>

      <form class="vm-ticket rv" onsubmit={onSubmit}>
        <p class="vm-ticket-head">Job ticket / new inquiry</p>

        <label for="vm-name">Name</label>
        <input id="vm-name" bind:value={form.name} required autocomplete="name" />

        <label for="vm-email">Email</label>
        <input id="vm-email" type="email" bind:value={form.email} required autocomplete="email" />

        <label for="vm-details">What are we making?</label>
        <textarea
          id="vm-details"
          rows="4"
          bind:value={form.details}
          required
          placeholder="Subject, size, deadline"
        ></textarea>

        <button type="submit">Send inquiry <span aria-hidden="true">→</span></button>

        <p class="vm-sent" class:has-msg={sent} role="status" tabindex="-1" bind:this={statusEl}>
          {#if sent}
            Your mail app should open with the brief. If it does not,
            <a href={mail}>email {studio.email}</a>.
          {/if}
        </p>
      </form>
    </section>
  </main>

  <footer class="vm-footer">
    <div class="vm-footer-in">
      <div>
        <p class="vm-footer-brand">CATRED</p>
        <p class="vm-footer-line">Thread goes in. Object comes out.</p>
      </div>
      <nav class="vm-footer-nav" aria-label="Footer">
        <a href="#services">Services</a>
        <a href="#process">Process</a>
        <a href="#work">Work</a>
        <a href={mail}>Start a project</a>
        <a href={studio.instagram} target="_blank" rel="noreferrer">Instagram</a>
      </nav>
      <p class="vm-colophon">
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
  .vm {
    --vm-bg: #080718;
    --vm-panel: #0e0b26;
    --vm-line: #2b245c;
    --vm-soft: #d9d5ea;
    --vm-muted: #a9a4c4;
    --vm-placeholder: #8f8aab;
    min-height: 100vh;
    background: var(--vm-bg);
    color: var(--paper);
    font-family: var(--font-body);
    overflow-x: clip;
  }
  .vm-aura {
    position: fixed;
    inset: -20%;
    z-index: 0;
    pointer-events: none;
    background:
      radial-gradient(38% 44% at 18% 20%, rgb(91 44 140 / 0.55), transparent 70%),
      radial-gradient(30% 38% at 82% 12%, rgb(237 34 36 / 0.28), transparent 70%),
      radial-gradient(42% 46% at 70% 80%, rgb(27 20 100 / 0.65), transparent 72%);
    filter: blur(60px);
    opacity: 0.8;
    animation: vm-drift 22s ease-in-out infinite alternate;
  }
  .vm-glow {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background: radial-gradient(
      560px circle at var(--mx, 50%) var(--my, 40%),
      rgb(237 34 36 / 0.16),
      transparent 60%
    );
    mix-blend-mode: screen;
  }
  .vm > header,
  .vm > main,
  .vm > footer {
    position: relative;
    z-index: 1;
  }
  .vm-ticker {
    position: relative;
    z-index: 1;
    overflow: hidden;
    border-top: 1px solid var(--vm-line);
    border-bottom: 1px solid var(--vm-line);
    padding: 0.8rem 0;
    background: color-mix(in srgb, var(--vm-bg) 60%, transparent);
  }
  .vm-ticker-track {
    display: flex;
    gap: 3rem;
    width: max-content;
    animation: vm-ticker 24s linear infinite;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.18em;
    color: var(--vm-muted);
  }
  .vm-ticker-track span::after {
    content: "·";
    margin-left: 3rem;
    color: var(--red);
  }
  @keyframes vm-drift {
    from {
      transform: translate3d(-2%, -1%, 0) scale(1);
    }
    to {
      transform: translate3d(2%, 2%, 0) scale(1.06);
    }
  }
  @keyframes vm-ticker {
    to {
      transform: translateX(-50%);
    }
  }
  .vm a {
    color: inherit;
  }
  .vm :focus-visible {
    outline: 2px solid var(--red);
    outline-offset: 3px;
  }
  .vm-skip {
    position: fixed;
    top: 0.5rem;
    left: 0.5rem;
    z-index: 200;
    padding: 0.6rem 0.9rem;
    background: var(--paper);
    color: var(--vm-bg);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    text-decoration: none;
    transform: translateY(-200%);
  }
  .vm-skip:focus {
    transform: none;
  }

  /* header */
  .vm-header {
    position: sticky;
    top: 0;
    z-index: 80;
    background: color-mix(in srgb, var(--vm-bg) 72%, transparent);
    -webkit-backdrop-filter: blur(18px) saturate(1.25);
    backdrop-filter: blur(18px) saturate(1.25);
    border-bottom: 1px solid var(--vm-line);
  }
  .vm-header-in {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0.85rem clamp(1.25rem, 4vw, 2rem);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
  }
  .vm-brand {
    font-family: var(--font-display);
    font-size: 1.35rem;
    letter-spacing: 0.02em;
    text-decoration: none;
  }
  .vm-nav {
    display: flex;
    gap: 1.35rem;
  }
  .vm-nav a,
  .vm-footer-nav a {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    padding-bottom: 0.15rem;
  }
  .vm-nav a:hover,
  .vm-footer-nav a:hover {
    border-bottom-color: var(--red);
  }
  .vm-cta-sm {
    background: var(--red-deep);
    color: var(--paper) !important;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    text-decoration: none;
    padding: 0.62rem 0.9rem;
    border: 1px solid var(--red-deep);
    border-radius: 4px;
    white-space: nowrap;
  }
  .vm-cta-sm:hover {
    background: var(--paper);
    color: var(--vm-bg) !important;
    border-color: var(--paper);
  }
  .vm-menu {
    display: none;
    position: relative;
  }
  .vm-menu summary {
    list-style: none;
    cursor: pointer;
    border: 1px solid var(--vm-line);
    padding: 0.5rem 0.7rem;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .vm-menu summary::-webkit-details-marker {
    display: none;
  }
  .vm-menu nav {
    position: absolute;
    z-index: 90;
    right: 0;
    top: calc(100% + 0.45rem);
    min-width: 12rem;
    display: grid;
    gap: 0.15rem;
    background: var(--vm-panel);
    border: 1px solid var(--vm-line);
    padding: 0.5rem;
  }
  .vm-menu nav a {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    text-decoration: none;
    padding: 0.55rem 0.6rem;
  }
  .vm-menu nav a:hover {
    background: var(--paper);
    color: var(--vm-bg);
  }

  /* hero */
  .vm-hero {
    max-width: 1180px;
    margin: 0 auto;
    padding: clamp(1rem, 2.5vw, 2rem) clamp(1.25rem, 4vw, 2rem) 0;
  }
  .vm-hero-in {
    display: grid;
    grid-template-columns: minmax(0, 1.02fr) minmax(0, 0.98fr);
    gap: clamp(2rem, 5vw, 4rem);
    align-items: center;
    padding-block: 0.5rem clamp(1rem, 2.5vw, 2rem);
  }
  .vm-hero-copy h1 {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(2rem, 6.8vw, 4.8rem);
    line-height: 0.88;
    letter-spacing: -0.035em;
    text-transform: uppercase;
  }
  .vm-lede {
    max-width: 44ch;
    margin: 1.4rem 0 0;
    font-size: clamp(1rem, 1.5vw, 1.15rem);
    line-height: 1.6;
    color: var(--vm-soft);
  }
  .vm-actions {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
    margin-top: 1.6rem;
  }
  .vm-btn {
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
    border: 1px solid var(--red-deep);
    border-radius: 4px;
  }
  .vm-btn:hover {
    background: var(--paper);
    color: var(--vm-bg) !important;
    border-color: var(--paper);
  }
  .vm-link {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 1px;
  }
  .vm-link:hover {
    color: var(--red);
  }
  .vm-stage {
    position: relative;
    min-width: 0;
  }
  .vm-stage::before {
    content: "";
    position: absolute;
    inset: -16px;
    z-index: -1;
    background:
      radial-gradient(60% 60% at 30% 35%, rgb(237 34 36 / 0.22), transparent 70%),
      radial-gradient(55% 55% at 75% 65%, rgb(91 44 140 / 0.35), transparent 70%);
    filter: blur(28px);
    pointer-events: none;
  }
  .vm-hero-foot {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    border-top: 1px solid var(--vm-line);
    padding: 0.8rem 0 0;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--vm-muted);
  }

  /* contact */
  .vm-contact {
    max-width: 1180px;
    margin: 0 auto;
    padding: clamp(4rem, 8vw, 7rem) clamp(1.25rem, 4vw, 2rem);
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(2rem, 5vw, 4rem);
    align-items: start;
    border-top: 1px solid var(--vm-line);
  }
  .vm-contact-copy h2 {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(1.9rem, 4vw, 3.2rem);
    line-height: 1.02;
    letter-spacing: -0.02em;
    text-transform: uppercase;
  }
  .vm-contact-copy p {
    max-width: 42ch;
    line-height: 1.6;
    color: var(--vm-soft);
  }
  .vm-contact-alt {
    font-family: var(--font-mono);
    font-size: 0.8rem;
  }
  .vm-contact-alt a {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .vm-ticket {
    background: var(--vm-panel);
    border: 1px solid var(--vm-line);
    padding: 1.4rem;
  }
  .vm-ticket-head {
    margin: 0 0 0.6rem;
    padding-bottom: 0.6rem;
    border-bottom: 1px solid var(--vm-line);
    font-family: var(--font-mono);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--vm-soft);
  }
  .vm-ticket label {
    display: block;
    margin: 0.95rem 0 0.35rem;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .vm-ticket input,
  .vm-ticket textarea {
    display: block;
    width: 100%;
    padding: 0.7rem 0.75rem;
    background: var(--vm-bg);
    color: var(--paper);
    border: 1px solid var(--vm-line);
    border-radius: 0;
    font: inherit;
  }
  .vm-ticket textarea {
    resize: vertical;
    min-height: 6rem;
  }
  .vm-ticket ::placeholder {
    color: var(--vm-placeholder);
    opacity: 1;
  }
  .vm-ticket button {
    width: 100%;
    margin-top: 1.25rem;
    padding: 0.95rem 1rem;
    background: var(--red-deep);
    color: var(--paper);
    border: 1px solid var(--red-deep);
    border-radius: 4px;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    cursor: pointer;
  }
  .vm-ticket button:hover {
    background: var(--paper);
    color: var(--vm-bg);
    border-color: var(--paper);
  }
  .vm-sent {
    margin: 0;
    font-size: 0.82rem;
    line-height: 1.5;
  }
  .vm-sent.has-msg {
    margin-top: 1rem;
  }
  .vm-sent a {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  /* footer */
  .vm-footer {
    border-top: 1px solid var(--vm-line);
    padding: clamp(2.5rem, 5vw, 4rem) clamp(1.25rem, 4vw, 2rem);
  }
  .vm-footer-in {
    max-width: 1180px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 1.5rem 2rem;
    align-items: end;
  }
  .vm-footer-brand {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 3.4rem);
    line-height: 0.95;
    letter-spacing: -0.02em;
  }
  .vm-footer-line {
    margin: 0.5rem 0 0;
    font-family: var(--font-mono);
    font-size: 0.76rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--vm-muted);
  }
  .vm-footer-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem;
    justify-content: flex-end;
  }
  .vm-footer-nav a:hover {
    color: var(--paper);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .vm-colophon {
    grid-column: 1 / -1;
    margin: 0.5rem 0 0;
    padding-top: 0.9rem;
    border-top: 1px solid var(--vm-line);
    font-family: var(--font-mono);
    font-size: 0.68rem;
    line-height: 1.6;
    color: var(--vm-muted);
  }

  @media (max-width: 900px) {
    .vm-hero-in,
    .vm-contact {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 640px) {
    .vm-nav,
    .vm-cta-sm {
      display: none;
    }
    .vm-menu {
      display: block;
    }
    .vm-hero {
      padding-top: 1.8rem;
    }
    .vm-footer-in {
      grid-template-columns: 1fr;
      align-items: start;
    }
    .vm-footer-nav {
      justify-content: flex-start;
      gap: 1rem;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .vm {
      scroll-behavior: auto;
    }
    .vm-aura,
    .vm-ticker-track {
      animation: none;
    }
  }
</style>
