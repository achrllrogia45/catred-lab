<script>
  let { value = $bindable("v4") } = $props();
</script>

<div class="view-switch" role="group" aria-label="Page version">
  <label class="view-switch-label" for="view-select">Version</label>
  <select id="view-select" class="view-switch-select" bind:value>
    <option value="v4">V4 · Glass studio</option>
    <option value="v5">V5 · Atelier index</option>
    <option value="v6">V6 · Kinetic signal</option>
    <option value="v7">V7 · Specimen shelf</option>
    <option value="v8">V8 · Studio OS</option>
  </select>
</div>

<style>
  .view-switch {
    position: fixed;
    top: 6rem;
    right: 1rem;
    z-index: 120;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.3rem 0.45rem 0.3rem 0.6rem;
    background: color-mix(in srgb, var(--paper) 86%, transparent);
    -webkit-backdrop-filter: blur(16px) saturate(1.3);
    backdrop-filter: blur(16px) saturate(1.3);
    color: var(--ink);
    border: 1px solid color-mix(in srgb, var(--ink) 68%, transparent);
    border-radius: 4px;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    box-shadow: 0 12px 34px rgb(10 8 32 / 0.22);
  }
  .view-switch-label {
    opacity: 0.62;
  }
  .view-switch-select {
    appearance: none;
    border: 0;
    background: transparent;
    color: var(--ink);
    font: inherit;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: none;
    padding: 0.35rem 1.15rem 0.35rem 0.1rem;
    min-height: 28px;
    cursor: pointer;
    background-image: linear-gradient(45deg, transparent 50%, var(--ink) 50%),
      linear-gradient(135deg, var(--ink) 50%, transparent 50%);
    background-position: calc(100% - 8px) 52%, calc(100% - 4px) 52%;
    background-size: 4px 4px, 4px 4px;
    background-repeat: no-repeat;
  }
  .view-switch-select:focus-visible {
    outline: 2px solid var(--red-deep);
    outline-offset: 3px;
  }
  @media (max-width: 640px) {
    .view-switch {
      top: auto;
      bottom: max(0.75rem, env(safe-area-inset-bottom));
      right: max(0.5rem, env(safe-area-inset-right));
      font-size: 11px;
    }
  }
  @media (forced-colors: active) {
    .view-switch-select {
      appearance: auto;
      background-image: none;
    }
  }
</style>
