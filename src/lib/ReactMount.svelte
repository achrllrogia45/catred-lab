<script>
  import { onMount, onDestroy } from "svelte";
  import { createElement } from "react";
  import { createRoot } from "react-dom/client";

  // React inside Svelte. Renders once on mount, props stay static.
  let { component, props = {} } = $props();
  let host, root;
  onMount(() => {
    root = createRoot(host);
    root.render(createElement(component, props));
  });
  onDestroy(() => root?.unmount());
</script>

<div bind:this={host} style="display:contents"></div>
