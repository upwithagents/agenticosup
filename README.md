# AgenticOS

Personal daily-briefing dashboard: morning report, today's plan, timeline,
and vitals (Claude usage, GitHub activity, Jira) in one screen. Part of the
`upwithagents` up-ecosystem, proxied into the portal at `/agenticosup`.

Currently ships with **sample data only** — the Calendar/Gmail, ccusage,
GitHub, and Jira connectors (plus the Obsidian vault state layer and the
morning-report/plan-today Claude Code skills that would populate it) are a
follow-up phase. `GET /api/briefing` is the stable contract those pieces
will write to.

## Run

    pnpm install
    pnpm run dev      # http://localhost:3000/agenticosup

## Test

    pnpm test
