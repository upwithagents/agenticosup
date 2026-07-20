<img src="docs/icon.svg" width="56" align="left" alt="" />

# AgenticOS

Personal daily-briefing dashboard: morning report, plan, timeline, and
vitals (Claude usage, GitHub, Jira) in one screen. Part of the
`upwithagents` ecosystem, proxied into the portal at `/agenticosup`.

<br clear="left"/>

Ships with **sample data only** for now — real connectors (Calendar/Gmail,
ccusage, GitHub, Jira) are a follow-up phase. `GET /api/briefing` is the
stable contract they'll write to.

## Run

    pnpm install
    pnpm run dev      # http://localhost:3000/agenticosup

## Test

    pnpm test
