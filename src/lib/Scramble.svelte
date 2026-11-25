<script>
  const CHARS = "!<>-_\\/[]{}?=+*^#";

  let {
    text = "",
    duration = 0,
    chars = CHARS,
    cycles = 2,
    chance = 1,
    class: klass = "",
  } = $props();

  let el = $state();

  $effect(() => {
    const final = text;
    if (!el) return;
    return scramble(el, final, { duration, chars, cycles, chance });
  });

  function scramble(node, final, opts) {
    node.textContent = final;
    if (
      !final ||
      (typeof matchMedia === "function" &&
        matchMedia("(prefers-reduced-motion: reduce)").matches)
    ) {
      return;
    }

    const len = final.length;
    const dur =
      opts.duration || Math.min(1.2, Math.max(0.3, len * 0.05));
    const schedule = [];
    const frames = new Array(len).fill(0);
    const resolved = new Array(len).fill(false);

    for (let i = 0; i < len; i++) {
      const base = len === 1 ? 0.5 : i / (len - 1);
      const jitter = (Math.random() - 0.5) * 0.3;
      schedule.push(Math.max(0, Math.min(1, base + jitter)));
      if (Math.random() >= opts.chance) resolved[i] = true;
    }

    let raf = 0;
    let start = 0;
    let last = -1;

    const tick = (now) => {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / (dur * 1000));

      if (p !== last) {
        last = p;
        let out = "";
        for (let i = 0; i < len; i++) {
          const ch = final[i];
          if (ch === " ") {
            out += " ";
            continue;
          }
          if (resolved[i]) {
            out += ch;
            continue;
          }
          if (p >= schedule[i] && frames[i] >= opts.cycles) {
            resolved[i] = true;
            out += ch;
            continue;
          }
          if (p >= schedule[i]) frames[i]++;
          out += opts.chars[Math.floor(Math.random() * opts.chars.length)];
        }
        node.textContent = out;
      }

      if (p < 1) raf = requestAnimationFrame(tick);
      else node.textContent = final;
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      node.textContent = final;
    };
  }
</script>

<span class={klass}>
  <span aria-hidden="true" bind:this={el}>{text}</span>
  <span class="sr-only">{text}</span>
</span>
