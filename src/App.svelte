<script>
  import V4 from "./variants/V4.svelte";
  import V5 from "./variants/V5.svelte";
  import V6 from "./variants/V6.svelte";
  import V7 from "./variants/V7.svelte";
  import V8 from "./variants/V8.svelte";
  import VariantSwitch from "./lib/VariantSwitch.svelte";

  const KEY = "catred:variant";
  const OPTIONS = ["v4", "v5", "v6", "v7", "v8"];

  const load = () => {
    try {
      const query = new URLSearchParams(location.search).get("view");
      if (OPTIONS.includes(query)) return query;
      const saved = localStorage.getItem(KEY);
      return OPTIONS.includes(saved) ? saved : "v4";
    } catch {
      return "v4";
    }
  };

  let version = $state(load());
  let first = true;

  $effect(() => {
    try {
      localStorage.setItem(KEY, version);
    } catch {
      /* storage unavailable: keep the in-memory choice */
    }
    if (first) {
      first = false;
      const query = new URLSearchParams(location.search).get("view");
      if (query && !OPTIONS.includes(query)) {
        const url = new URL(location.href);
        url.searchParams.set("view", version);
        history.replaceState(null, "", url.pathname + url.search + url.hash);
      }
      return;
    }
    const from = location.hash.slice(1);
    const url = new URL(location.href);
    url.searchParams.set("view", version);
    url.hash = "";
    history.replaceState(null, "", url.pathname + url.search);

    const map = { services: "plates", plates: "services" };
    const to = map[from] ?? from;
    requestAnimationFrame(() => {
      const target = to ? document.getElementById(to) : null;
      if (target) {
        history.replaceState(null, "", `${url.pathname}${url.search}#${to}`);
        target.scrollIntoView({ block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    });
  });
</script>

{#if version === "v8"}
  <V8 />
{:else if version === "v7"}
  <V7 />
{:else if version === "v6"}
  <V6 />
{:else if version === "v5"}
  <V5 />
{:else}
  <V4 />
{/if}

<VariantSwitch bind:value={version} />

<span class="view-announce" aria-live="polite">
  Showing {version === "v8" ? "V8, Studio OS" : version === "v7" ? "V7, Specimen shelf" : version === "v6" ? "V6, Kinetic signal" : version === "v5" ? "V5, Atelier index" : "V4, Glass studio"}
</span>

<style>
  .view-announce {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }
</style>
