# Trending AI Agents & Tools — Technology (Week of 2026-07-10, v7)

> What's new and moving fast in tech AI agents this week.
> Last updated: 2026-07-10

## Signal 1 — Claude Code $2.5B → ~$8B ARR + 4% of All GitHub Commits

Claude Code (Anthropic) has become the dominant AI coding tool in 2026:
- **$2.5B ARR** (Feb 2026) → **~$8B ARR** (May 2026) — the fastest ARR ramp in enterprise software history
- Writes **4% of all public GitHub commits** worldwide (SemiAnalysis projects >20% by end 2026)
- **54% AI coding market share**; rated "most loved" by 46% of surveyed developers
- **73% of engineering teams** use AI coding tools daily (up from 41% in 2025)
- Enterprise subscriptions **4×** since start of 2026; Deloitte rolled out to **470,000 employees**
- 300,000+ business customers; large accounts grew **7× year over year**

**Key stat (TELUS case study)**: shipped engineering code 30% faster, saved 500,000+ hours, averaging 40 min saved per AI interaction.

**Globant implication**: Claude Code at $8B ARR is the baseline expectation. Every engagement should include Claude Code adoption planning + context engineering setup.

---

## Signal 2 — Anthropic 2026 Agentic Coding Trends Report

Anthropic published the definitive state-of-market report for agentic coding in 2026. Key findings:

### The Delegation Gap
Developers use AI in **~60% of their work** but can only "fully delegate" **0–20% of tasks**. This gap is the central product problem of 2026.

### Context Engineering = The New Core Skill
- Teams with well-maintained context files (CLAUDE.md, DESIGN.md, etc.) complete tasks **55% faster** with **40% fewer errors**
- Context engineering is now listed as a distinct engineering skill in job postings
- The skill: writing AI-optimized project context, not just using AI tools

### 27% New Work Created
27% of AI-assisted work **didn't previously exist** — engineers are fixing papercuts, building internal dashboards, running experiments that previously weren't worth the effort. Agents expand total work done, not just speed up existing work.

### 8 Shifts Reshaping Software Engineering
1. Engineers become orchestrators, not implementers
2. Single agents → hierarchical multi-agent teams
3. Task horizons expand from minutes to days/weeks
4. Long-running agents with strategic human checkpoints
5. Agentic coding expands to non-devs (security, design, operations)
6. Legacy language support grows (COBOL, Fortran)
7. Parallel agent execution becomes standard
8. Context quality becomes the key performance variable

**Case studies**: Rakuten, CRED, TELUS, Zapier all report 30-55% productivity gains.

---

## Signal 3 — Cline Crosses 60k Stars + JetBrains Expansion

Cline (Apache-2.0, [cline/cline](https://github.com/cline/cline)) — the autonomous coding agent as SDK + IDE extension + CLI:
- **1.5 million VS Code Marketplace installs** by April 2026; **~60k GitHub stars**
- Now available in all **JetBrains IDEs** (IntelliJ, PyCharm, WebStorm, GoLand, etc.)
- **Multi-agent coordination**: a coordinator agent breaks work into subtasks and delegates to specialist agents
- **Messaging integration**: chat with your agent from Telegram, Slack, Discord, Google Chat, WhatsApp, Linear
- **BYOK**: developers connect their own API keys (Anthropic, OpenAI, AWS Bedrock, Google Vertex, Azure)
- **Plan mode** (explores without changes) + **Act mode** (executes with per-step approval)

**Pattern**: Cline as a drop-in replacement for Cursor in enterprise environments where self-hosted IDE plugins are required.

---

## Signal 4 — DeerFlow 2.0 (ByteDance) — Super-Agent Harness

ByteDance's DeerFlow ([bytedance/deer-flow](https://github.com/bytedance/deer-flow), Apache-2.0) hit **#1 GitHub Trending** in February 2026 after its v2.0 launch, reaching **~47k stars**.

DeerFlow is a "super-agent harness" — a runtime environment that gives AI agents the full infrastructure they need:
- **Sandboxed filesystem** — agents can write, run, and test code safely
- **Persistent memory** — cross-session context retention
- **Skills system** — plug-in domain capabilities
- **Sub-agent orchestration** — lead agent breaks work into parallel sub-tasks; each sub-agent has scoped context + tools
- **Messaging integration** — Telegram, Slack, Feishu connectors built in
- Built on **LangChain + LangGraph** (familiar stack for Globant engineers)

**Use case**: long-horizon research + coding tasks (hours not minutes). Think: "research competitors, generate a feature spec, code the prototype, write tests, commit" — all in one agent run.

---

## Signal 5 — OpenMontage: Agentic Video Production (MIT)

OpenMontage ([calesthio/OpenMontage](https://github.com/calesthio/OpenMontage), MIT) hit **#1 GitHub Trending** on June 26 2026:
- World's first open-source **agentic video production system**
- **12 production pipelines** (Animated Explainer, Documentary, Cinematic, Avatar Spokesperson, Podcast Repurpose, Screen Demo, etc.)
- **52 tools + 500+ agent skills** for research, scripting, asset generation, editing, composition
- Works with Claude Code, Cursor, Copilot, Windsurf, Codex
- Supports local models: **WAN 2.1, Hunyuan, CogVideo**
- Users describe desired video in natural language; agent handles the rest

**Globant angle**: immediate application for client marketing/content teams and for Globant's own content production. Pattern: P12 in compose/patterns.md.

---

## Signal 6 — MCP RC Spec (July 28, 2026) — Biggest Revision Since Launch

MCP Release Candidate published July 28, 2026 — changes production deployments significantly:

| Change | Before | After |
|--------|--------|-------|
| Sessions | Sticky sessions required | **Stateless core** — sessions optional, standard load balancers work |
| Routing | Body inspection required | `Mcp-Method` + `Mcp-Name` headers (SEP-2243) — L7 routing without body parse |
| Async work | Request-response only | **Tasks extension** — `tools/call` → task handle → `tasks/get`/`update`/`cancel` |
| UI | Server-side only | **MCP Apps** (SEP-1865) — servers ship sandboxed HTML UIs, same audit/consent path |
| Enterprise auth | Per-server OAuth | **EMA (Enterprise-Managed Authorization)** promoted to stable — org-wide SSO via IdP |
| Forward compat | Breaking changes | **Formal deprecation policy** — no breaking changes without migration path |

**Scale now**: 10,000+ active public servers; 97M SDK downloads/month; 28% Fortune 500.

---

## Signal 7 — Gartner: 40% Enterprise Apps With AI Agents by Year-End 2026

Gartner's 2026 prediction for enterprise AI agents is now materializing:
- **40% of enterprise applications** will feature task-specific AI agents by end 2026 (up from <5% in 2025)
- Enterprise AI Coding Agent market: **$9.8B–$11.0B annualized** (April 2026)
- **BUT**: 40% of agentic AI projects will be **canceled by end of 2027** — primary reasons: escalating costs, unclear business value, inadequate risk controls
- Long-term: agentic AI could drive 30% of enterprise app software revenue by 2035 ($450B+)

**Globant angle**: the 40% cancellation rate is a consulting opportunity. Clients need help with agent evaluation, cost governance, and ROI measurement — not just building.

---

## Radar This Week

| Repo | Signal | Why It Matters |
|------|--------|---------------|
| [cline/cline](https://github.com/cline/cline) | Breakout | 1.5M installs, all major IDEs, multi-agent, Apache-2.0 |
| [bytedance/deer-flow](https://github.com/bytedance/deer-flow) | Trending | Super-agent harness; LangGraph-based; #1 GitHub Feb 2026 |
| [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) | New | Agentic video production, MIT; 500+ skills; #1 GitHub Jun 2026 |
| [anthropics/claude-code](https://github.com/anthropics/claude-code) | Dominant | $8B ARR; 4% of GitHub commits; 54% market share |
| [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | Standard | RC spec Jul 28; stateless core; EMA stable; 10k+ servers |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | Enterprise | #1 multi-agent orchestration in production; DeerFlow base |
| DESIGN.md / CLAUDE.md pattern | Emerging | Context engineering = 55% faster, 40% fewer errors (Anthropic data) |
