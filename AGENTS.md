# AGENTS.md — Wany KB Behavioral Contract

> Karpathy-style single-file contract for every agent that touches this repo.
> Inspired by `andrej-karpathy/andrej-karpathy-skills` (CLAUDE.md as anti-pattern
> catalogue). Short, punchy, grounded in this repo's actual failures — not
> generic LLM folklore.

## 1. Purpose

This file is the **contract of behavior** for every agent — human, LLM, or
pipeline — that reads, writes, or compiles anything in Wany KB. It encodes
the non-negotiables (meta-rules) and the specific anti-patterns we have
observed in our own repo over the last 30 days. See the grounded audit at
[`.agents/audit/agent-error-patterns-2026-04-12.md`](.agents/audit/agent-error-patterns-2026-04-12.md).

Harnesses **MUST** inject the contents of this file as system context
before every agent run. The canonical injector is
[`scripts/inject-agents-contract.sh`](scripts/inject-agents-contract.sh),
which wraps the file in `<agents_contract>…</agents_contract>` tags so it
can be piped into any prompt builder. See §5 for the integration contract.

## 2. Meta-rules (non-negotiable)

M1. **Cite or disclaim.** Every factual claim about the KB MUST cite a
    `wiki/<slug>.md` or `raw/<path>` file. If the fact is not in the KB,
    say "not in KB" — never paraphrase training data as if it were.

M2. **Never invent file paths.** Only reference files that exist. If you
    need a file, list what you looked at. If a path is wrong, fail loud.

M3. **Respect KB structure.** `raw/` is un-vetted intake; `wiki/` is
    curated; `viz/` is derived. A query agent answering from `raw/` MUST
    label its evidence as "raw, uncompiled".

M4. **Truncation is not silence.** Any time you drop context (history
    window, pack cap, skill slice), say so. "I only saw the first N files"
    is always better than pretending.

M5. **No CLI-session magic in pipelines.** Agents that need an LLM call
    the SDK directly with env-var creds. `claude --dangerously-skip-permissions`
    is forbidden inside any non-interactive path. (See anti-pattern #1.)

M6. **Provenance on every write.** Any commit, file, or wiki edit written
    by an agent MUST carry `Agent: <name>@<version>` and, for commits,
    `Skill: <path>` trailers.

M7. **One language per turn.** Match the user. Internal artifacts follow
    the repo's split: Spanish for product/ADR prose, English for code
    comments and schema keys.

M8. **Degrade explicitly.** If a source fetch returns 3xx/4xx/5xx and you
    fall back to a partial view, propagate a `source_completeness` field
    forward. Confidence drops with evidence.

M9. **Stale is a warning, not a status.** If you load a file with a
    `generated:` date older than 7 days as authoritative context, prepend
    a STALE warning and say so in the response.

M10. **GitNexus first on code questions.** For any question about code
     structure, impact, or refactor, use the GitNexus MCP tools before
     grepping. See the GitNexus block at the bottom of this file.

## 3. Anti-patterns (observed in this repo)

Each anti-pattern has: **Rule** (one-liner), **Why** (what goes wrong),
**How** (concrete correction). Full evidence in
[`.agents/audit/agent-error-patterns-2026-04-12.md`](.agents/audit/agent-error-patterns-2026-04-12.md).

### AP-1. Do not shell `claude` CLI from a pipeline

- **Rule.** Never invoke `claude --dangerously-skip-permissions -p` from
  scripts meant to run unattended or in serverless.
- **Why.** Couples agent execution to an interactive session. Expires.
  Incompatible with Vercel. Root cause of the "401" blocker in ADR 0001.
- **How.** Use `@anthropic-ai/sdk` or `openai` directly with env creds.
  If you must shell out, fail with a distinct exit code and surface stderr.

### AP-2. Do not silently truncate skills, indexes, or wiki pages

- **Rule.** No `slice(0, <magic>)` on context without a visible marker.
- **Why.** `viewer/server.js:2026,2030` cuts skill files at 1500 bytes and
  the wiki index at 1000. Agents answer as if they read the whole thing.
- **How.** Append `<!-- TRUNCATED: N bytes dropped -->` at the cut point
  and make the agent say "I only had the first N bytes of the index."

### AP-3. Do not pretend a 6-turn window is the whole conversation

- **Rule.** If you dropped earlier turns, say so.
- **Why.** `viewer/server.js:2037` keeps `history.slice(-6)`. Users
  re-state facts the agent just forgot.
- **How.** When the window clips, summarize the dropped turns into a
  rolling `session_summary` prepended to the system prompt, or state
  "that was before my recent context" when the user refers back.

### AP-4. Do not propagate degraded evidence as if it were full

- **Rule.** `source_completeness` travels with the data.
- **Why.** The NLAH `research-paper` pipeline fell back to the abstract
  after ar5iv returned 303 (`.agents/state/.../fetch.txt:4`) and the
  downstream `classify.json` shows no drop in confidence.
- **How.** Every pipeline stage reads `source_completeness` from the
  previous stage. Classify/connect/draft lower confidence or refuse
  when `degraded_from` is set.

### AP-5. Do not code-switch inside a single turn

- **Rule.** One language per response. Match the user.
- **Why.** Prompts mix Spanish and English (`kb.sh:104` vs.
  `viewer/server.js:2032` vs. the GitNexus block), and agents drift
  mid-answer.
- **How.** Detect the user's language on first message; lock it for the
  session. For internal artifacts, follow M7.

### AP-6. Do not make factual claims without citations

- **Rule.** `[[wiki-slug]]` or `(raw/path)` on every fact, or say
  "not in KB".
- **Why.** "Fundamentado en el conocimiento de la KB" is aspirational
  (`viewer/server.js:2032`). Agents paraphrase their training data and
  label it "from the KB".
- **How.** System prompt MUST require inline citations; a lint pass can
  flag any numeric/named claim without a nearby `[[…]]` or `(raw/…)`.

### AP-7. Do not hide pack caps

- **Rule.** The pack stage returns `{files, total_candidates, truncated}`.
- **Why.** `KB_PACK_MAX_FILES=20` (`kb.sh:95`) drops silently; agents
  answer "everything about X" with 20 files.
- **How.** Plumb `truncated: true` through the response; agents MUST
  surface it: "I saw 20 of 147 candidate files."

### AP-8. Do not 404 an unknown agent domain without suggestions

- **Rule.** 404 on `/api/agents/:domain/chat` includes `available: [...]`.
- **Why.** `viewer/server.js:2016` returns a bare 404. Clients retry
  against hard-coded guesses.
- **How.** Always list current skill files. Client agents MUST pick from
  the returned list.

### AP-9. Do not auto-commit without agent provenance

- **Rule.** Every agent-authored commit carries `Agent: …` + `Skill: …`
  trailers.
- **Why.** `kb.sh:231` and the nightly `hooks: ontology + graph + agents`
  commits make `git blame` useless.
- **How.** Commit message template lives with the agent; the harness
  enforces it.

### AP-10. Do not background hooks into an ephemeral log

- **Rule.** Hook runs write durable status to `.agents/state/last-hook-run.json`.
- **Why.** `kb.sh:236` backgrounds `run-hooks.sh` to `/tmp/kb-hooks.log`;
  errors vanish, stale graphs persist.
- **How.** Foreground with a spinner OR write JSON status; next
  invocation surfaces failures from the last run.

### AP-11. Do not answer from `raw/` files with `compiled: false`

- **Rule.** Query agents filter `compiled: true` by default.
- **Why.** `ingest/tech-news.sh:17` and `kb.sh:56` mark new intake
  `compiled: false`; many `raw/research/news/*.md` stay stuck on that
  flag because compile is skipped.
- **How.** Query MUST filter, or explicitly tag raw citations
  "(uncompiled intake)". Nightly job flips the flag or flags stuck files.

### AP-12. Do not treat stale agent skills as ground truth

- **Rule.** Skills older than 7 days are warned; older than 30 days are
  rejected.
- **Why.** `viz/agent-skills/agent-*.md` freezes examples at generation
  time; `viewer/server.js:2014` loads them live per request.
- **How.** Loader checks `generated:` frontmatter; prepends STALE marker
  or refuses. Scheduler regenerates weekly.

## 4. Agent roster

There are no named personas (Norma / Finn / Corpus) in this repo as of
2026-04-12. The actual roster is:

| Agent                     | Defined in                                        | Role                                                            |
|---------------------------|---------------------------------------------------|-----------------------------------------------------------------|
| `agent:ai-agents`         | `viz/agent-skills/agent-ai-agents.md`             | Multi-agent systems, coordination protocols, agent memory       |
| `agent:devtools`          | `viz/agent-skills/agent-devtools.md`              | Coding agents, IDEs, harnesses, dev infra                       |
| `agent:enterprise`        | `viz/agent-skills/agent-enterprise.md`            | Enterprise AI deployment, verticals, Wany Studios projects      |
| `agent:research`          | `viz/agent-skills/agent-research.md`              | AI research synthesis (papers, arXiv, DAIR)                     |
| `pipeline:tech-news`      | `ingest/tech-news.sh`                             | 3h-cadence HN + arXiv intake → `raw/research/news/`             |
| `pipeline:research-paper` | `.agents/state/research-paper/` (NLAH stages)     | fetch → classify → connect → draft for arXiv papers             |
| `pipeline:kb-compile`     | `kb.sh compile` → `viewer/services/pack.js`       | raw → wiki compile (under 0001-ADR portability migration)       |
| `pipeline:kb-hooks`       | `.kb-hooks/run-hooks.sh` (post-compile)           | ontology + graph + agent-skill regeneration                     |

When this file grows personas, append them here with a 1-line role. Keep
the roster under 15 entries; beyond that, split per-agent skill files.

## 5. Injection contract

### Where this file goes in the prompt

Harnesses MUST inject `AGENTS.md` into the **system** role of every agent
call, **before** any task-specific instructions. The canonical wrapping is:

```text
<agents_contract>
... full AGENTS.md contents ...
</agents_contract>

<task>
... task-specific system instructions ...
</task>
```

The `<agents_contract>` tag tells the agent: "these are the house rules,
inherited for this run." Task-specific rules in `<task>` MAY add but MUST
NOT weaken the contract.

### How harnesses load it

**Shell (canonical):**

```bash
bash scripts/inject-agents-contract.sh | my-agent-harness --stdin
```

`scripts/inject-agents-contract.sh` reads `AGENTS.md` and prints it wrapped
in the `<agents_contract>` tags. Pipe it into any harness that accepts
system context on stdin.

**Node:**

```js
const fs = require('fs');
const path = require('path');
const contract = fs.readFileSync(path.join(__dirname, '..', 'AGENTS.md'), 'utf8');
const systemPrompt =
  `<agents_contract>\n${contract}\n</agents_contract>\n\n<task>\n${taskPrompt}\n</task>`;
```

**Python:**

```py
from pathlib import Path
contract = Path(__file__).resolve().parents[1].joinpath("AGENTS.md").read_text()
system_prompt = f"<agents_contract>\n{contract}\n</agents_contract>\n\n<task>\n{task}\n</task>"
```

### Cadence

- Load on **every** agent run; do not cache across process restarts.
- Re-read on long-running servers when `AGENTS.md` mtime changes.
- `viewer/server.js` SHOULD read it on each chat request (cheap; <10KB).

### Enforcement

Any harness that does not inject the contract is non-compliant. Add a
health check that grep-asserts `<agents_contract>` appears in the rendered
system prompt before the agent call returns.

---

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **globant-kb** (2570 symbols, 4131 relationships, 199 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## When Debugging

1. `gitnexus_query({query: "<error or symptom>"})` — find execution flows related to the issue
2. `gitnexus_context({name: "<suspect function>"})` — see all callers, callees, and process participation
3. `READ gitnexus://repo/globant-kb/process/{processName}` — trace the full execution flow step by step
4. For regressions: `gitnexus_detect_changes({scope: "compare", base_ref: "main"})` — see what your branch changed

## When Refactoring

- **Renaming**: MUST use `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` first. Review the preview — graph edits are safe, text_search edits need manual review. Then run with `dry_run: false`.
- **Extracting/Splitting**: MUST run `gitnexus_context({name: "target"})` to see all incoming/outgoing refs, then `gitnexus_impact({target: "target", direction: "upstream"})` to find all external callers before moving code.
- After any refactor: run `gitnexus_detect_changes({scope: "all"})` to verify only expected files changed.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Tools Quick Reference

| Tool | When to use | Command |
|------|-------------|---------|
| `query` | Find code by concept | `gitnexus_query({query: "auth validation"})` |
| `context` | 360-degree view of one symbol | `gitnexus_context({name: "validateUser"})` |
| `impact` | Blast radius before editing | `gitnexus_impact({target: "X", direction: "upstream"})` |
| `detect_changes` | Pre-commit scope check | `gitnexus_detect_changes({scope: "staged"})` |
| `rename` | Safe multi-file rename | `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` |
| `cypher` | Custom graph queries | `gitnexus_cypher({query: "MATCH ..."})` |

## Impact Risk Levels

| Depth | Meaning | Action |
|-------|---------|--------|
| d=1 | WILL BREAK — direct callers/importers | MUST update these |
| d=2 | LIKELY AFFECTED — indirect deps | Should test |
| d=3 | MAY NEED TESTING — transitive | Test if critical path |

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/globant-kb/context` | Codebase overview, check index freshness |
| `gitnexus://repo/globant-kb/clusters` | All functional areas |
| `gitnexus://repo/globant-kb/processes` | All execution flows |
| `gitnexus://repo/globant-kb/process/{name}` | Step-by-step execution trace |

## Self-Check Before Finishing

Before completing any code modification task, verify:
1. `gitnexus_impact` was run for all modified symbols
2. No HIGH/CRITICAL risk warnings were ignored
3. `gitnexus_detect_changes()` confirms changes match expected scope
4. All d=1 (WILL BREAK) dependents were updated

## Keeping the Index Fresh

After committing code changes, the GitNexus index becomes stale. Re-run analyze to update it:

```bash
npx gitnexus analyze
```

If the index previously included embeddings, preserve them by adding `--embeddings`:

```bash
npx gitnexus analyze --embeddings
```

To check whether embeddings exist, inspect `.gitnexus/meta.json` — the `stats.embeddings` field shows the count (0 means no embeddings). **Running analyze without `--embeddings` will delete any previously generated embeddings.**

> Claude Code users: A PostToolUse hook handles this automatically after `git commit` and `git merge`.

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
