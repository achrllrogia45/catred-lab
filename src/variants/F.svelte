<script>
  import { onMount } from "svelte";
  import { studio, services, works, pipeline, img } from "../lib/data.js";
  import { reveal } from "../lib/reveal.js";
  import ReactMount from "../lib/ReactMount.svelte";
  import Marquee from "../react/Marquee.jsx";
  import ContactForm from "../react/ContactForm.jsx";

  let root;
  let rail;
  let takeover;
  let manualDark = $state(false); // picked theme, resets on reload
  let bandActive = $state(false);
  let dark = $derived(manualDark || bandActive);
  let scrolled = $state(false);
  onMount(() => {
    reveal(root);
    const onScroll = () => {
      scrolled = window.scrollY > 40;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (bandActive = e.isIntersecting)),
      { threshold: 0.35 },
    );
    if (takeover) io.observe(takeover);
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  });

  const clean = (t) => String(t).replaceAll("—", "-").replaceAll("–", "-");
  const mail = `mailto:${studio.email}`;
  const stats = [
    {
      n: String(services.length),
      label: "disciplines",
      note: "2D, 3D, CAD and print under one roof.",
    },
    {
      n: String(pipeline.length),
      label: "stages",
      note: "Sketch to physical object, no handoffs.",
    },
    {
      n: String(works.length),
      label: "selected pieces",
      note: "The current set, shown below.",
    },
  ];
  const pairs = [
    ["Handoffs out.", "One team in."],
    ["Guesswork out.", "Tolerances that hold in."],
    ["Dead renders out.", "Physical objects in."],
    ["Scope creep out.", "Five clear stages in."],
    ["Stalled prototypes out.", "Finished objects in."],
  ];
</script>

<div
  class="manifesto bg-[var(--m-bg)] text-[var(--m-fg)] [font-family:var(--font-body)]"
  class:dark
  bind:this={root}
>
  <nav aria-label="Page" class="m-nav" class:float={scrolled}>
    <div class="m-nav-in">
      <a href="#top" class="m-brand">CATRED</a>
      <div class="flex items-center gap-4">
        <a href="#services" class="m-link hidden min-[560px]:inline">Services</a
        >
        <a
          href={studio.instagram}
          target="_blank"
          rel="noreferrer"
          class="m-link hidden min-[560px]:inline">Instagram</a
        >
        <a href={mail} class="m-cta m-cta-sm">Start a project</a>
        <button
          class="m-toggle"
          onclick={() => (manualDark = !dark)}
          aria-pressed={dark}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {#if dark}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              aria-hidden="true"
              ><circle cx="12" cy="12" r="4" /><path
                d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
              /></svg
            ><span class="hidden min-[560px]:inline">Light</span>
          {:else}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
              ><path
                d="M20 13.5A8 8 0 1 1 10.5 4 6.5 6.5 0 0 0 20 13.5z"
              /></svg
            ><span class="hidden min-[560px]:inline">Dark</span>
          {/if}
        </button>
      </div>
    </div>
  </nav>

  <header
    id="top"
    class="relative min-h-[calc(100svh-64px)] flex items-center justify-center text-center overflow-hidden"
  >
    <img
      class="absolute inset-0 w-full h-full object-cover motion-safe:animate-[fkb_36s_ease-in-out_infinite_alternate] motion-reduce:animate-none"
      src={img("dhero-reel.svg")}
      alt="Catred studio showreel art"
      fetchpriority="high"
    />
    <div class="m-veil" aria-hidden="true"></div>
    <div
      class="relative max-w-[960px] px-6 pt-[72px] pb-[120px] max-md:px-5 max-md:py-20"
    >
      <p
        class="font-mono text-[13px] tracking-[0.22em] uppercase mb-5 opacity-90"
      >
        Catred Studio - 2D/3D/CAD/Print
      </p>
      <h1
        class="m-0 mb-5 leading-[1.04] tracking-[-0.01em] text-[clamp(48px,9vw,104px)] [font-family:var(--font-display)]"
      >
        Concept to printed object.
      </h1>
      <p
        class="text-lg leading-[1.55] max-w-[52ch] mx-auto mb-8 opacity-[0.92]"
      >
        A creative studio for 2D, 3D, CAD and print. One team from first sketch
        to physical object.
      </p>
      <p class="m-0 flex gap-6 justify-center flex-wrap">
        <a href={mail} class="m-cta m-cta-lg">Start a project</a>
        <a href="#services" class="m-sec m-cta-lg">See services</a>
      </p>
    </div>
  </header>

  <ReactMount component={Marquee} />

  <section
    class="mx-auto w-full max-w-6xl px-6 pt-[88px] pb-6"
    id="services"
    aria-label="Services"
  >
    <h2
      class="rv m-0 mb-7 leading-[1.05] text-[clamp(28px,5vw,54px)] [font-family:var(--font-display)]"
    >
      Comprehensive studio services
    </h2>
    <p class="rv text-[17px] opacity-85 mb-8 max-w-[60ch]">
      Four disciplines, one roof. Every card ships real work, not promises.
    </p>
    <div class="grid gap-5 grid-cols-1 md:grid-cols-2">
      {#each services as s}
        <article class="m-card rv">
          <div class="overflow-hidden">
            <img
              class="w-full aspect-[4/3] object-cover block"
              src={img(s.img)}
              alt="{s.title} artwork"
              loading="lazy"
            />
          </div>
          <div class="p-6">
            <p
              class="font-mono text-[13px] tracking-[0.18em] uppercase opacity-60 m-0 mb-2"
            >
              {s.index} / {s.tag}
            </p>
            <h3
              class="m-0 mb-2.5 leading-[1.1] text-[clamp(20px,2.6vw,30px)] [font-family:var(--font-display)]"
            >
              {s.title}
            </h3>
            <p class="text-base leading-[1.6] m-0 opacity-90 max-w-[60ch]">
              {clean(s.desc)}
            </p>
          </div>
        </article>
      {/each}
    </div>
  </section>

  <div class="m-takeover mt-16" bind:this={takeover}>
    <div class="m-fade-top" aria-hidden="true"></div>
    <section class="m-band m-band-core text-center" aria-label="Studio definition">
      <div class="mx-auto w-full max-w-6xl px-6">
        <h2
          class="rv m-0 mb-4 leading-none text-[clamp(44px,8vw,96px)] [font-family:var(--font-display)]"
        >
          CAT-THREAD:
        </h2>
        <p class="rv font-mono text-[15px] tracking-[0.08em] opacity-80 m-0 mb-3">
          /kat-thread/
        </p>
        <p class="rv text-lg leading-[1.55] max-w-[60ch] mx-auto mt-0 mb-4">
          noun. a cat that bats at loose ideas until only the good ones stay on
          the table, plus a thread in studio red that stitches sketch to model to
          print - pulled tight and knotted where it matters.
        </p>
        <p
          class="rv font-mono text-[13px] tracking-[0.06em] opacity-75 m-0 mb-10"
        >
          red is the color the thread leaves behind.
        </p>
        <figure class="rv m-0 mx-auto max-w-[600px] text-center">
          <div class="m-frame">
            <img
              class="w-full aspect-[16/9] object-cover block"
              src={img("dhero-reel.svg")}
              alt="Night Reel, studio showreel art"
              loading="lazy"
            />
          </div>
          <figcaption class="mt-7">
            <p class="font-mono text-[15px] m-0 mb-5 opacity-90">
              Watch our demo reel
            </p>
            <a
              class="inline-flex items-center gap-2 border border-[var(--paper)] text-[var(--paper)] font-mono text-[15px] no-underline px-5 py-2.5 rounded-[4px] hover:bg-[var(--paper)] hover:text-[var(--m-band)] focus-visible:outline-2 focus-visible:outline-[var(--paper)] focus-visible:outline-offset-3"
              href={studio.instagram}
              target="_blank"
              rel="noreferrer"
              >Watch more <svg
                class="block w-[14px] h-[14px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
                ><rect x="2" y="7" width="13" height="10" rx="2" /><path
                  d="M15 10.5 22 7.5v9l-7-3"
                /></svg
              ></a
            >
          </figcaption>
        </figure>
      </div>
    </section>
    <div class="m-fade-bot" aria-hidden="true"></div>
  </div>

  <section
    class="mx-auto w-full max-w-6xl px-6 pt-[88px] pb-6"
    aria-label="Why Catred"
  >
    <div class="grid gap-10 items-center grid-cols-1 md:grid-cols-2">
      <div class="rv">
        <h2
          class="m-0 mb-7 leading-[1.05] text-[clamp(28px,5vw,54px)] [font-family:var(--font-display)]"
        >
          Less back-and-forth. More built.
        </h2>
        <p class="text-base leading-[1.6] m-0 opacity-90 max-w-[60ch]">
          One roof for sketch, model, engineering and print. No handoffs, no
          lost files, no stalled prototypes.
        </p>
        <ul class="list-none mt-7 mb-0 p-0">
          {#each pairs as [out, inn]}
            <li class="py-3 text-[17px]">
              <span class="opacity-55">{out}</span>
              <span class="font-bold">{inn}</span>
            </li>
          {/each}
        </ul>
      </div>
      <div class="m-frame rv">
        <img
          class="w-full aspect-[3/4] object-cover block"
          src={img("denv-vista.svg")}
          alt="Far Ridge environment vista"
          loading="lazy"
        />
      </div>
    </div>
  </section>

  <section
    class="m-bandline text-center px-6 py-[88px] mt-16"
    aria-label="One studio"
  >
    <h2
      class="rv m-0 mb-4 leading-[1.05] text-[clamp(32px,6vw,68px)] [font-family:var(--font-display)]"
    >
      One studio, sketch to object.
    </h2>
    <p class="rv text-[17px] opacity-85 mt-0 mb-8">
      From thumbnail to finished print, every stage under one roof.
    </p>
    <a class="rv m-cta text-[15px] px-7 py-3.5" href={mail}>Start a project</a>
  </section>

  {#snippet stepIcon(kind)}
    <svg
      class="block w-[30px] h-[30px] text-[var(--red)]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      {#if kind === "search"}
        <circle cx="11" cy="11" r="7" /><circle
          cx="11"
          cy="11"
          r="1.2"
          fill="currentColor"
          stroke="none"
        /><path d="M5.5 16.5 2 20" />
      {:else if kind === "nodes"}
        <circle cx="6" cy="18" r="2.5" /><path d="M8.5 15.5 14 10" /><path
          d="M9 18h5"
        /><path d="M15 3.5l4 4M19 3.5l-4 4" /><path d="M17 13l4 4M21 13l-4 4" />
      {:else if kind === "cube"}
        <path d="M12 2l8 4.5v9L12 20l-8-4.5v-9z" /><path
          d="M12 11 4 6.5M12 11l8-4.5M12 11v9"
        />
      {:else if kind === "gear"}
        <circle cx="12" cy="12" r="3.5" /><circle cx="12" cy="12" r="7" /><path
          d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"
        />
      {:else}
        <path d="M12 3l9 5-9 5-9-5z" /><path d="M4.5 12.5 12 16.5l7.5-4" /><path
          d="M4.5 16.5 12 20.5l7.5-4"
        />
      {/if}
    </svg>
  {/snippet}

  <section id="process" class="pt-16 pb-6" aria-label="Process">
    <div class="mx-auto w-full max-w-6xl px-6">
      <h2
        class="rv m-0 mb-7 leading-[1.05] text-[clamp(28px,5vw,54px)] [font-family:var(--font-display)]"
      >
        How it runs
      </h2>
      <p class="rv text-[17px] opacity-85 mb-8 max-w-[60ch]">
        One team of drawers, modelers, engineers and printers. No handoffs
        between vendors, no lost files.
      </p>
    </div>
    <div class="relative">
      <ol
        class="run-rail rv"
        bind:this={rail}
        tabindex="0"
        aria-label="Studio process: five stages, scroll right for more"
      >
        {#each pipeline as p}
          <li>
            {@render stepIcon(p.icon)}
            <h3
              class="m-0 mt-[15px] mb-[9px] leading-[1.1] text-[26px] [font-family:var(--font-display)]"
            >
              {p.step}
            </h3>
            <p class="font-mono text-[13px] mt-0 mb-2 opacity-65">{p.note}</p>
            <p
              class="font-mono text-[13px] leading-[1.5] tracking-[0.02em] m-0"
            >
              {p.body}
            </p>
          </li>
        {/each}
      </ol>
      <button
        class="absolute right-3 top-10 text-[28px] leading-none px-3 py-2 opacity-70 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-[var(--red)] focus-visible:outline-offset-3"
        onclick={() =>
          rail?.scrollBy({
            left: 230,
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "auto"
              : "smooth",
          })}
        aria-label="Scroll process forward">›</button
      >
    </div>
    <div class="mx-auto w-full max-w-6xl px-6">
      <p class="rv mt-8 font-mono text-sm opacity-70">
        One roof. Five stages. Zero handoffs.
      </p>
    </div>
  </section>

  <section class="m-bandline mt-12" aria-label="Studio at a glance">
    <div class="mx-auto w-full max-w-6xl px-6 pt-10 pb-10">
      <h2
        class="rv m-0 mb-7 leading-[1.05] text-[clamp(28px,5vw,54px)] [font-family:var(--font-display)]"
      >
        Studio at a glance
      </h2>
      <div class="grid gap-10 grid-cols-1 md:grid-cols-3">
        {#each stats as st}
          <div class="rv m-stat">
            <p
              class="m-0 leading-none text-[clamp(44px,6vw,76px)] text-[var(--red)] [font-family:var(--font-display)]"
            >
              {st.n}
            </p>
            <p class="font-mono text-sm mt-2.5 mb-0">{st.label}</p>
            <p class="font-mono text-[13px] mt-1.5 mb-0 opacity-65">
              {st.note}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section
    class="mx-auto w-full max-w-6xl px-6 pt-16 pb-6"
    id="work"
    aria-label="Selected work"
  >
    <h2
      class="rv m-0 mb-7 leading-[1.05] text-[clamp(28px,5vw,54px)] [font-family:var(--font-display)]"
    >
      Selected work
    </h2>
    <div class="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {#each works as w}
        <figure class="rv m-0">
          <div class="m-frame">
            <img
              class="w-full aspect-[4/3] object-cover block transition-transform duration-500 ease-out hover:scale-105"
              src={img(w.img)}
              alt="{w.title}, {w.type}"
              loading="lazy"
            />
          </div>
          <figcaption
            class="font-mono text-[13px] pt-2.5 px-0.5 opacity-80 m-0"
          >
            {w.title} / {w.type}
          </figcaption>
        </figure>
      {/each}
    </div>
  </section>

  <section
    class="mx-auto w-full max-w-6xl px-6 pt-16 pb-6"
    aria-label="Client words"
  >
    <h2
      class="rv m-0 mb-7 leading-[1.05] text-[clamp(28px,5vw,54px)] [font-family:var(--font-display)]"
    >
      Hear it from the people we build for
    </h2>
    <!-- real client quotes go here when we have them -->
    <div class="rv m-card p-6">
      <p class="font-mono text-sm opacity-70 m-0">
        Client quotes land here. One real sentence beats a wall of lorem.
      </p>
    </div>
  </section>

  <section class="text-center px-6 py-24 max-md:py-[72px]">
    <h2
      class="rv m-0 mb-8 leading-[1.05] text-[clamp(32px,6vw,68px)] [font-family:var(--font-display)]"
    >
      Have something to build?
    </h2>
    <div class="rv m-card max-w-[560px] mx-auto mb-5 text-left p-6">
      <ReactMount component={ContactForm} />
    </div>
    <p class="font-mono text-[13px] mt-5 mb-0 opacity-65">
      Prefer email? <a
        class="font-mono text-[15px] inline-block mx-3 mb-2 focus-visible:outline-2 focus-visible:outline-[var(--red)] focus-visible:outline-offset-3"
        href={mail}>Start a project</a
      >
    </p>
  </section>

  <footer class="m-foot text-center px-6 pt-16 pb-10">
    <p
      class="m-0 mb-2 leading-[1.05] text-[clamp(28px,6vw,56px)] [font-family:var(--font-display)]"
    >
      CATRED STUDIO
    </p>
    <p class="font-mono text-[13px] opacity-70 mt-0 mb-5">
      {clean(studio.location)}
    </p>
    <p class="m-0">
      <a
        class="font-mono text-[15px] inline-block mx-3 mb-2 focus-visible:outline-2 focus-visible:outline-[var(--red)] focus-visible:outline-offset-3"
        href="#services">Services</a
      >
      <a
        class="font-mono text-[15px] inline-block mx-3 mb-2 focus-visible:outline-2 focus-visible:outline-[var(--red)] focus-visible:outline-offset-3"
        href="#work">Work</a
      >
      <a
        class="font-mono text-[15px] inline-block mx-3 mb-2 focus-visible:outline-2 focus-visible:outline-[var(--red)] focus-visible:outline-offset-3"
        href={mail}>Start a project</a
      >
      <a
        class="font-mono text-[15px] inline-block mx-3 mb-2 focus-visible:outline-2 focus-visible:outline-[var(--red)] focus-visible:outline-offset-3"
        href={studio.instagram}
        target="_blank"
        rel="noreferrer">Instagram</a
      >
    </p>
    <p class="font-mono text-xs opacity-55 mt-5 mb-0">
      © 2026 {studio.domain}
    </p>
  </footer>
</div>
