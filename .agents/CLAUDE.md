# .agents/ — cross-harness ECC config

This folder is **not auto-loaded by Claude Code**. The Claude Code entry point is
the root `CLAUDE.md`, which points at `HANDOFF.md`. Read `.agents/` only when you
need the design brief or a specific rule.

- `DESIGN.md` — binding brand/design brief, but partly stale: it describes
  variants A–D and GSAP (only F exists, GSAP is not installed) and bans gradients
  while F intentionally uses them for the CAT-THREAD wash/fades. See `HANDOFF.md`
  §6.4 before enforcing it literally.
- `rules/` — 122 generated ECC rule files. Relevant here: `common-*`, `web-*`,
  `react-*`, `typescript-*`. The Angular/Swift/Rust/PHP/etc. sets are noise for
  this repo.
- `skills/` — `bun-runtime`, `vite-patterns`, `react-patterns`, `frontend-a11y`.
- `ecc-install-state.json` — generated on another machine; its absolute paths
  (`/home/achrllrogia/Mounts/...`) do not exist here. Do not treat them as real
  or regenerate blindly.

Rules:

- Do not edit generated rule files by hand; change the source ECC repo instead.
- Do not let this folder's size grow further without pruning irrelevant languages.
- The repo's real conventions live in `AGENTS.md`, `HANDOFF.md` and the nested
  `CLAUDE.md` files — prefer those when they conflict with generated rules.
