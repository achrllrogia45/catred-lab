// Pointer-attraction for the inner content of a link or button.
// The hit area stays put; only the label drifts toward the cursor.
export function magnetic(node, options = {}) {
  const root = node.closest("a, button") ?? node.parentElement;
  if (!root) return;

  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const fine = matchMedia("(pointer: fine)");
  if (reduce.matches || !fine.matches) return;

  const strength = options.strength ?? 0.28;
  const max = options.max ?? 16;
  const ease = options.ease ?? 350;
  const clamp = (n) => Math.max(-max, Math.min(max, n));

  let raf = 0;
  let active = false;
  const cur = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };

  const tick = () => {
    cur.x += (target.x - cur.x) * 0.18;
    cur.y += (target.y - cur.y) * 0.18;
    node.style.transform = `translate3d(${cur.x.toFixed(2)}px, ${cur.y.toFixed(2)}px, 0)`;

    if (
      Math.abs(target.x - cur.x) < 0.1 &&
      Math.abs(target.y - cur.y) < 0.1
    ) {
      cur.x = target.x;
      cur.y = target.y;
      node.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      active = false;
      return;
    }
    raf = requestAnimationFrame(tick);
  };

  const move = (event) => {
    const rect = root.getBoundingClientRect();
    target.x = clamp(
      (event.clientX - (rect.left + rect.width / 2)) * strength,
    );
    target.y = clamp(
      (event.clientY - (rect.top + rect.height / 2)) * strength,
    );
    if (active) return;
    active = true;
    node.style.transition = "";
    node.style.willChange = "transform";
    raf = requestAnimationFrame(tick);
  };

  const leave = () => {
    active = false;
    cancelAnimationFrame(raf);
    cur.x = 0;
    cur.y = 0;
    target.x = 0;
    target.y = 0;
    node.style.transition = `transform ${ease}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
    node.style.transform = "translate3d(0, 0, 0)";
    node.style.willChange = "";
  };

  root.addEventListener("pointermove", move);
  root.addEventListener("pointerleave", leave);

  return {
    destroy() {
      cancelAnimationFrame(raf);
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
      node.style.transform = "";
      node.style.transition = "";
      node.style.willChange = "";
    },
  };
}
