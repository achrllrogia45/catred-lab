// Progressive-enhancement reveals: content is visible by default;
// JS adds .in as elements enter view. No-JS / reduced-motion = fully visible.
export function reveal(root) {
  const els = root.querySelectorAll(".rv");
  if (
    matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  ) {
    els.forEach((el) => el.classList.add("in"));
    return () => {};
  }
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
  );
  els.forEach((el) => io.observe(el));
  return () => io.disconnect();
}
