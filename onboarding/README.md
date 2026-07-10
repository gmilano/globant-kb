# Onboarding Tutor

A DeepTutor-style agent that reads the Wany KB repo, quizzes itself on 10 key
concepts, and writes a gap report so the repo can auto-explain to any new
collaborator — human or agent.

This is Idea 5 of `viz/ideas/ideas-2026-04-10.md`, operationalized.

## What it does

1. **Discover** — walks the repo for onboarding-relevant files: `README.md`,
   `AGENTS.md`, `CLAUDE.md`, every ADR in `decisions/`, `wiki/INDEX.md`, the
   top 20 `wiki/concepts/*.md` by modification time, and the latest
   `viz/ideas/ideas-*.md`.
2. **Extract** — asks Claude (via Vercel AI SDK `generateObject`) to identify
   the 10 most important concepts a newcomer must know, each grounded in a
   real source file.
3. **Quiz** — 10 questions, one per concept.
4. **Self-grade** — the tutor answers its own questions from the same
   context and scores itself 0..1. A low score is a signal the repo itself is
   unclear, not that the model failed.
5. **Gaps** — concepts mentioned but not documented, broken links, missing
   material a newcomer would still have to ask a human about.
6. **Report** — writes `onboarding/reports/onboarding-report-YYYY-MM-DD.md`.

## Files

| Path | Purpose |
|------|---------|
| `onboarding/tutor.nlah.md` | Agent spec (NLAH format). Works standalone — paste into Claude with a file bundle and you get the same structured result. |
| `onboarding/run.js` | Node ESM runner. Uses `@ai-sdk/anthropic` + `generateObject` + a Zod schema identical to the one in `tutor.nlah.md`. |
| `onboarding/reports/` | Generated reports. `onboarding-report-SAMPLE.md` is committed as a hand-written reference. |

## How to run

```bash
export ANTHROPIC_API_KEY=sk-ant-…
make onboarding
# or, equivalently:
node onboarding/run.js
```

Environment variables:

- `ANTHROPIC_API_KEY` (required)
- `ONBOARDING_MODEL` (default `claude-sonnet-4-6`)
- `ONBOARDING_MAX_FILE_CHARS` (default `8000` — per-file truncation to keep
  the context bundle bounded)

## Dependency choice

`run.js` does **not** ship its own `package.json`. It resolves
`@ai-sdk/anthropic`, `ai`, and `zod` from `viewer/node_modules` via
`createRequire(viewer/package.json)`. Rationale:

- The viewer already installs these deps for `viewer/services/pack.js`.
- Adding a second `package.json` under `onboarding/` would duplicate
  versions and drift over time.
- The tutor is intentionally coupled to the viewer — they share the Pack
  pattern (Claude + structured output) and should share versions too.

If you ever split the viewer out, move these three deps into a new
`onboarding/package.json` — nothing else in `run.js` needs to change.

## How the report is structured

Each report has five sections:

1. **Header** — model, date, file count, overall readiness score.
2. **Key concepts** — 10 numbered entries, each with a source file.
3. **Quiz + self-grades** — 10 Q/A pairs with per-question score + reasoning.
4. **Gaps detected** — each tagged `low` / `medium` / `high`.
5. **Files reviewed** — the exact bundle the tutor saw.

## What "readiness" means

```
overall_readiness = mean(self_grades) − 0.05 × count(high-severity gaps)
                    (floored at 0, capped at 1)
```

Interpretation:

| Score | Meaning |
|-------|---------|
| ≥ 0.90 | Repo is self-explaining. A new agent can be productive in under an hour with no human help. |
| 0.70–0.89 | Mostly self-explaining. A few concepts require tribal knowledge. |
| 0.50–0.69 | Partially self-explaining. Onboarding still needs a human. |
| < 0.50 | Repo relies heavily on implicit knowledge. Treat gaps as backlog. |

Readiness is **a measure of the repo, not of the model**. When it drops,
fix the gaps — don't change the prompt.

## Sample report

See `onboarding/reports/onboarding-report-SAMPLE.md` for a hand-written
example grounded in the current repo state. It was produced by following
the tutor's six steps manually and demonstrates the exact shape the
automated runner emits.
