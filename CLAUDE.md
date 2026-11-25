# catred — Claude Code entry

Read `HANDOFF.md` first — it is the full state-of-the-repo brief. Then `AGENTS.md`
and `.agents/DESIGN.md` (the brief is partly stale; see HANDOFF §6.4).

## Scoped context files

Claude Code auto-loads the nearest `CLAUDE.md` for the folder it is working in.
Each major directory has one with its own invariants:

| Path | Covers |
|---|---|
| `src/CLAUDE.md` | Svelte 5 / Vite / global CSS rules |
| `src/lib/CLAUDE.md` | tokens, data, reveal, React bridge |
| `src/react/CLAUDE.md` | React islands and their limits |
| `src/variants/CLAUDE.md` | variant rules, F is live, archive is off-limits |
| `public/CLAUDE.md` | worker, 404, dummy art — production artifacts |
| `.agents/CLAUDE.md` | ECC config, stale design brief, what to ignore |

## Commands and guardrails

- Bun only: `bun install`, `bun run dev` (port 5199), `bun run build`.
- No tests / lint / typecheck configured. `bun run build` is the gate.
- Svelte 5 runes + Tailwind 4 (CSS-first, no config file) + React 19 islands.
- Deploy is manual and only on explicit request:
  `bunx wrangler pages deploy dist --project-name catredlab --branch main`
- Do not commit/push/deploy without asking. Never commit tokens or `dist/`.
- `public/_worker.js` and `public/404.html` are production-critical — read
  HANDOFF §9 before touching either.

