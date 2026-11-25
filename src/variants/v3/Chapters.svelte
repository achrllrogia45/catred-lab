<script>
  import { services, works, pipeline, img } from "../../lib/data.js";

  const clean = (t) => String(t).replaceAll("—", "-").replaceAll("–", "-");
  const pad = (n) => String(n).padStart(2, "0");
</script>

<div class="tm">
  <!-- I. SERVICES -->
  <section id="services" class="tm-sec tm-sec-services" aria-labelledby="tm-services-title">
    <span class="tm-ghost" aria-hidden="true">I</span>
    <div class="tm-in">
      <header class="tm-head">
        <h2 id="tm-services-title" class="tm-h2">Four disciplines,<br />one <span class="tm-red">thread</span>.</h2>
        <p class="tm-lede">
          Concept art, 3D, CAD and print are not four separate services. They are four points on one
          line, from the first thumbnail to the object in your hand.
        </p>
      </header>

      <ol class="tm-nodes">
        {#each services as s (s.id)}
          <li class="tm-node">
            <span class="tm-pin" aria-hidden="true"></span>
            <div class="tm-node-txt">
              <p class="tm-index">Plate {s.index}</p>
              <h3>{s.title}</h3>
              <p class="tm-tag">{s.tag}</p>
              <p class="tm-desc">{clean(s.desc)}</p>
            </div>
            <figure class="tm-frame">
              <img
                src={img(s.img)}
                alt={`${s.title} - ${s.tag}`}
                width="1200"
                height="800"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </li>
        {/each}
      </ol>
    </div>
  </section>

  <!-- II. PROCESS -->
  <section id="process" class="tm-sec tm-sec-process" aria-labelledby="tm-process-title">
    <span class="tm-ghost" aria-hidden="true">II</span>
    <div class="tm-in">
      <header class="tm-head">
        <h2 id="tm-process-title" class="tm-h2">Every stage,<br />on the <span class="tm-red">line</span>.</h2>
        <p class="tm-lede">
          No handoffs and no gaps. Each stage is built from the one before it, and the thread only
          moves forward.
        </p>
      </header>

      <ol class="tm-rail">
        {#each pipeline as p, i (p.step)}
          <li class="tm-stage">
            <span class="tm-pin" aria-hidden="true"></span>
            <p class="tm-step">Step {pad(i + 1)}</p>
            <h3>{p.step}</h3>
            <p class="tm-tag">{p.note}</p>
            <p class="tm-desc">{clean(p.body)}</p>
          </li>
        {/each}
      </ol>
    </div>
  </section>

  <!-- III. WORK -->
  <section id="work" class="tm-sec tm-sec-work" aria-labelledby="tm-work-title">
    <span class="tm-ghost" aria-hidden="true">III</span>
    <div class="tm-in">
      <header class="tm-head">
        <h2 id="tm-work-title" class="tm-h2">Scenes from<br />the <span class="tm-red">studio</span>.</h2>
        <p class="tm-lede">
          A contact sheet pulled from the dark room: environments, characters, mechanical parts and
          the prints that leave the bench.
        </p>
      </header>

      <ul class="tm-sheet">
        {#each works as w, i (w.img)}
          <li class="tm-shot">
            <figure class="tm-shot-frame">
              <img
                src={img(w.img)}
                alt={`${w.title} - ${w.type}`}
                width="1200"
                height="800"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <div class="tm-shot-cap">
              <span class="tm-frame-no" aria-hidden="true">{pad(i + 1)}</span>
              <h3>{w.title}</h3>
              <p class="tm-type">{w.type}</p>
            </div>
          </li>
        {/each}
      </ul>

      <p class="tm-honest">Artwork is placeholder; real work replaces it.</p>
    </div>
  </section>
</div>

<style>
  /* scene shell */
  .tm {
    --tm-pad: clamp(1.25rem, 5vw, 4.5rem);
    background: transparent; color: var(--paper);
    font-family: var(--font-body); overflow-x: clip;
  }
  .tm :focus-visible { outline: 2px solid var(--red); outline-offset: 3px; }
  .tm-sec {
    position: relative; overflow: clip;
    padding: clamp(3.5rem, 8vw, 7rem) var(--tm-pad);
    scroll-margin-top: 4rem;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
  }
  .tm-sec + .tm-sec { border-top: 1px solid var(--line-dark); }
  .tm-sec-services { --tm-ground: var(--navy); background: color-mix(in srgb, var(--navy) 72%, transparent); }
  .tm-sec-process { --tm-ground: var(--ink); background: color-mix(in srgb, var(--ink) 68%, transparent); }
  .tm-sec-work { --tm-ground: var(--navy); background: color-mix(in srgb, var(--navy) 62%, transparent); }
  .tm-in { position: relative; z-index: 1; width: 100%; max-width: 1180px; margin-inline: auto; }
  .tm-ghost {
    position: absolute; top: -0.18em; right: -0.04em; z-index: 0;
    font-family: var(--font-display); font-size: clamp(10rem, 27vw, 24rem);
    line-height: 0.8; color: var(--indigo); opacity: 0.55;
    user-select: none; pointer-events: none;
  }
  .tm-sec-work .tm-ghost { color: var(--violet); opacity: 0.45; }

  /* scene header */
  .tm-head { display: grid; gap: 0.85rem; max-width: 54rem; margin-bottom: clamp(2.5rem, 6vw, 4.5rem); }
  .tm-h2 {
    margin: 0; font-family: var(--font-display);
    font-size: clamp(2rem, 5.6vw, 4.6rem); line-height: 0.94;
    letter-spacing: -0.02em; text-wrap: balance;
  }
  .tm-red { color: var(--red); }
  .tm-lede {
    max-width: 36rem; margin: 0;
    font-size: clamp(0.95rem, 1.35vw, 1.1rem); line-height: 1.65; opacity: 0.75;
  }

  /* services: vertical thread */
  .tm-nodes {
    position: relative; display: flex; flex-direction: column;
    gap: clamp(2.5rem, 6vw, 5rem); margin: 0; padding: 0; list-style: none;
  }
  .tm-nodes::before {
    content: ""; position: absolute; top: 6px; bottom: 6px; left: 50%;
    width: 1px; transform: translateX(-0.5px); background: var(--red); opacity: 0.6;
  }
  .tm-node {
    position: relative; display: grid; align-items: start;
    grid-template-columns: minmax(0, 1fr) clamp(3rem, 6vw, 5.5rem) minmax(0, 1fr);
  }
  .tm-pin {
    position: relative; z-index: 1; width: 14px; height: 14px;
    border-radius: 50%; background: var(--red); box-shadow: 0 0 0 5px var(--tm-ground);
  }
  .tm-node > .tm-pin { grid-column: 2; grid-row: 1; justify-self: center; margin-top: 0.5rem; }
  .tm-node-txt { grid-column: 1; grid-row: 1; min-width: 0; padding-right: clamp(1rem, 3vw, 2.5rem); }
  .tm-node .tm-frame { grid-column: 3; grid-row: 1; width: min(100%, 29rem); margin-left: auto; }
  .tm-node:nth-child(even) .tm-node-txt {
    grid-column: 3; padding-right: 0; padding-left: clamp(1rem, 3vw, 2.5rem);
  }
  .tm-node:nth-child(even) .tm-frame { grid-column: 1; margin-right: auto; margin-left: 0; }
  .tm-node:nth-child(2) .tm-node-txt,
  .tm-node:nth-child(2) .tm-frame { margin-top: clamp(0.75rem, 2vw, 1.5rem); }
  .tm-node:nth-child(3) .tm-node-txt,
  .tm-node:nth-child(3) .tm-frame { margin-top: clamp(0.4rem, 1.5vw, 1.25rem); }
  .tm-index {
    margin: 0 0 0.9rem; font-family: var(--font-mono); font-size: 0.7rem;
    letter-spacing: 0.22em; line-height: 1.4; text-transform: uppercase; opacity: 0.65;
  }
  .tm-index::before {
    content: ""; display: inline-block; width: 6px; height: 6px;
    margin-right: 0.55rem; vertical-align: 0.08em; background: var(--red);
  }
  .tm-node h3 {
    margin: 0 0 0.55rem; font-family: var(--font-display);
    font-size: clamp(1.5rem, 2.6vw, 2.15rem); line-height: 1.02; letter-spacing: -0.01em;
  }
  .tm-tag {
    margin: 0 0 1rem; font-family: var(--font-mono); font-size: 0.72rem;
    letter-spacing: 0.06em; line-height: 1.5; text-transform: uppercase; opacity: 0.7;
  }
  .tm-desc {
    max-width: 29rem; margin: 0; font-size: clamp(0.92rem, 1.15vw, 1rem);
    line-height: 1.7; opacity: 0.78; overflow-wrap: break-word;
  }
  .tm-frame {
    margin: 0; padding: 0.55rem; overflow: hidden; aspect-ratio: 3 / 2;
    background: rgb(18 16 58 / 0.45);
    border: 1px solid rgb(246 244 238 / 0.1);
    border-radius: var(--rad);
    -webkit-backdrop-filter: blur(14px);
    backdrop-filter: blur(14px);
    box-shadow: 0 24px 60px rgb(0 0 0 / 0.35), inset 0 1px 0 rgb(246 244 238 / 0.08);
    translate: 0 0;
    transition: translate 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease, border-color 0.3s ease;
  }
  .tm-node:hover .tm-frame {
    translate: 0 -6px;
    border-color: rgb(237 34 36 / 0.5);
    box-shadow: 0 34px 80px rgb(0 0 0 / 0.45), inset 0 1px 0 rgb(246 244 238 / 0.12);
  }
  .tm-frame img {
    width: 100%; height: 100%; object-fit: cover; border-radius: var(--rad);
    filter: saturate(0.92); transition: transform 0.8s ease, filter 0.8s ease;
  }
  .tm-node:hover .tm-frame img { transform: scale(1.04); filter: saturate(1.05); }
  .tm-node:nth-child(2) .tm-frame { aspect-ratio: 4 / 5; }
  .tm-node:nth-child(3) .tm-frame { aspect-ratio: 1 / 1; }
  .tm-node:nth-child(4) .tm-frame { aspect-ratio: 16 / 10; }

  /* process: rail / timeline */
  .tm-rail {
    position: relative; display: grid; margin: 0; padding: 0; list-style: none;
    grid-template-columns: repeat(5, minmax(0, 1fr)); gap: clamp(0.9rem, 2.2vw, 1.8rem);
  }
  .tm-rail::before {
    content: ""; position: absolute; top: 7px; right: 0; left: 0;
    height: 2px; background: var(--red); opacity: 0.6;
  }
  .tm-stage { position: relative; min-width: 0; padding-top: 2.6rem; }
  .tm-stage > .tm-pin { position: absolute; top: 1px; left: 0; }
  .tm-step {
    margin: 0 0 0.8rem; font-family: var(--font-mono); font-size: 0.68rem;
    letter-spacing: 0.2em; line-height: 1.4; text-transform: uppercase; opacity: 0.6;
  }
  .tm-stage h3 {
    margin: 0 0 0.45rem; font-family: var(--font-display);
    font-size: clamp(1.15rem, 1.8vw, 1.5rem); line-height: 1.05; transition: color 0.25s ease;
  }
  .tm-stage:hover h3 { color: var(--red); }
  .tm-stage .tm-tag { margin-bottom: 0.7rem; }
  .tm-stage .tm-desc { font-size: 0.86rem; line-height: 1.65; }

  /* work: contact sheet */
  .tm-sheet {
    position: relative; display: grid; margin: 0; padding: 1.4rem 0; list-style: none;
    grid-template-columns: repeat(12, minmax(0, 1fr)); gap: clamp(0.85rem, 2vw, 1.6rem);
  }
  .tm-sheet::before, .tm-sheet::after {
    content: ""; position: absolute; right: 0; left: 0; height: 6px; opacity: 0.75;
    background-image: repeating-linear-gradient(90deg,
      color-mix(in srgb, var(--violet) 45%, var(--line-dark)) 0 8px, transparent 8px 22px);
    pointer-events: none;
  }
  .tm-sheet::before { top: 0; }
  .tm-sheet::after { bottom: 0; }
  .tm-shot { min-width: 0; }
  .tm-shot:nth-child(1) { grid-column: 1 / span 7; }
  .tm-shot:nth-child(2) { grid-column: 8 / span 5; margin-top: clamp(1.25rem, 3.5vw, 3rem); }
  .tm-shot:nth-child(3) { grid-column: 2 / span 4; margin-top: clamp(0.5rem, 1.5vw, 1.25rem); }
  .tm-shot:nth-child(4) { grid-column: 7 / span 6; margin-top: clamp(-2.5rem, -2vw, -0.5rem); }
  .tm-shot:nth-child(5) { grid-column: 1 / span 5; margin-top: clamp(1rem, 3vw, 2.5rem); }
  .tm-shot:nth-child(6) { grid-column: 6 / span 7; margin-top: clamp(1.5rem, 4vw, 3.5rem); }
  .tm-shot-frame {
    margin: 0; padding: 0.5rem; overflow: hidden;
    background: rgb(18 16 58 / 0.42);
    border: 1px solid rgb(246 244 238 / 0.1);
    border-radius: var(--rad);
    -webkit-backdrop-filter: blur(14px);
    backdrop-filter: blur(14px);
    box-shadow: 0 24px 60px rgb(0 0 0 / 0.35), inset 0 1px 0 rgb(246 244 238 / 0.08);
    translate: 0 0;
    transition: translate 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease, border-color 0.3s ease;
  }
  .tm-shot:nth-child(1) .tm-shot-frame { aspect-ratio: 3 / 2; }
  .tm-shot:nth-child(2) .tm-shot-frame { aspect-ratio: 4 / 5; }
  .tm-shot:nth-child(3) .tm-shot-frame { aspect-ratio: 1 / 1; }
  .tm-shot:nth-child(4) .tm-shot-frame { aspect-ratio: 16 / 9; }
  .tm-shot:nth-child(5) .tm-shot-frame { aspect-ratio: 5 / 4; }
  .tm-shot:nth-child(6) .tm-shot-frame { aspect-ratio: 21 / 9; }
  .tm-shot:nth-child(2) .tm-shot-frame,
  .tm-shot:nth-child(5) .tm-shot-frame { transform: rotate(-0.6deg); }
  .tm-shot-frame img {
    width: 100%; height: 100%; object-fit: cover; border-radius: var(--rad);
    filter: saturate(0.9); transition: transform 0.8s ease, filter 0.8s ease;
  }
  .tm-shot:hover .tm-shot-frame {
    translate: 0 -6px;
    border-color: rgb(237 34 36 / 0.5);
    box-shadow: 0 34px 80px rgb(0 0 0 / 0.45), inset 0 1px 0 rgb(246 244 238 / 0.12);
  }
  .tm-shot:hover .tm-shot-frame img { transform: scale(1.035); filter: saturate(1.06); }
  .tm-shot-cap {
    display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.35rem 0.75rem;
    padding: 0.65rem 0.1rem 0;
  }
  .tm-frame-no {
    font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.16em;
    line-height: 1.4; opacity: 0.55;
  }
  .tm-shot-cap h3 {
    flex: 1 1 auto; margin: 0; font-family: var(--font-display);
    font-size: clamp(0.95rem, 1.4vw, 1.15rem); line-height: 1.1;
  }
  .tm-type {
    margin: 0; font-family: var(--font-mono); font-size: 0.66rem;
    letter-spacing: 0.1em; line-height: 1.4; text-transform: uppercase; opacity: 0.6;
  }
  .tm-honest {
    display: flex; align-items: center; gap: 0.6rem; margin: clamp(1.75rem, 4vw, 3rem) 0 0;
    font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.08em;
    line-height: 1.5; opacity: 0.7;
  }
  .tm-honest::before {
    content: ""; flex: none; width: 6px; height: 6px; border-radius: 50%; background: var(--red);
  }

  /* responsive */
  @media (max-width: 880px) {
    .tm-nodes::before { left: 7px; transform: none; }
    .tm-node { grid-template-columns: minmax(0, 1fr); gap: 1.1rem; padding-left: 2.5rem; }
    .tm-node > .tm-pin { position: absolute; top: 0.45rem; left: 0; margin: 0; }
    .tm-node-txt, .tm-node:nth-child(even) .tm-node-txt {
      grid-column: 1; grid-row: auto; padding-right: 0; padding-left: 0;
    }
    .tm-node .tm-frame, .tm-node:nth-child(even) .tm-frame {
      grid-column: 1; grid-row: auto; width: 100%; margin: 0;
    }
    .tm-node:nth-child(2) .tm-node-txt, .tm-node:nth-child(2) .tm-frame,
    .tm-node:nth-child(3) .tm-node-txt, .tm-node:nth-child(3) .tm-frame { margin-top: 0; }
    .tm-node:nth-child(n) .tm-frame { aspect-ratio: 3 / 2; }
  }

  @media (max-width: 780px) {
    .tm-rail { grid-template-columns: 1fr; gap: 0; }
    .tm-rail::before { top: 0; right: auto; bottom: 0; left: 6px; width: 2px; height: auto; }
    .tm-stage { padding: 0 0 2.25rem 2.25rem; }
    .tm-stage:last-child { padding-bottom: 0; }
    .tm-stage > .tm-pin { top: 0.4rem; left: 0; }
    .tm-stage .tm-desc { max-width: 36rem; }
  }

  @media (max-width: 720px) {
    .tm-sheet { grid-template-columns: 1fr; gap: 1.5rem; padding: 1.2rem 0; }
    .tm-shot:nth-child(n) { grid-column: 1 / -1; margin-top: 0; }
    .tm-shot:nth-child(n) .tm-shot-frame { aspect-ratio: 3 / 2; transform: none; }
    .tm-shot:nth-child(2) .tm-shot-frame { aspect-ratio: 4 / 5; }
  }

  @keyframes tm-rise {
    from { opacity: 0; translate: 0 36px; }
    to { opacity: 1; translate: 0 0; }
  }
  @supports (animation-timeline: view()) {
    .tm-head,
    .tm-node,
    .tm-stage,
    .tm-shot {
      animation: tm-rise both linear;
      animation-timeline: view();
      animation-range: entry 5% cover 26%;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .tm-frame img, .tm-shot-frame img, .tm-shot-frame, .tm-stage h3 { transition: none; }
    .tm-node:hover .tm-frame img,
    .tm-shot:hover .tm-shot-frame img { transform: none; }
    .tm-head, .tm-node, .tm-stage, .tm-shot { animation: none; }
    .tm-frame, .tm-shot-frame { transition: none; }
    .tm-node:hover .tm-frame,
    .tm-shot:hover .tm-shot-frame { translate: 0 0; }
  }
</style>
