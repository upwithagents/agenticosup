# agenticosup

Daily-briefing dashboard for the up ecosystem. See README.md for what it
does and its current (sample-data) scope.

## Conventions

- **Identity**: this repo commits and pushes as `upwithagents` (repo-local
  git config; remote via the `github-upwithagents` SSH alias). Never use the
  `gh` CLI here — it authenticates as a different user.
- **Branches**: `up/<max-3-word-kebab>`. The initial MVP was committed
  directly to `main` (repo genesis, matching sibling repos); later feature
  work goes through `up/*` branches.
- **Stack**: Next.js 16 + TypeScript + vitest (pnpm). No Tailwind, no ORM —
  there's no persisted domain data yet, `src/core/briefing.ts` is a plain
  mock generator. Layering: `src/core` is pure TS and must not import
  `next`/`react`; `src/app` holds UI and the `/api/briefing` route.
- basePath is `/agenticosup`, matching the portal's `zoneRewrites()` in
  `upwithagents-portal/apps.config.ts`.
- Plans live in the workspace-level `1_CLAUDE_WORKFLOW/plans/agenticosup/`
  (the brainstorming-session design spec lands there once written), not in
  this repo.
