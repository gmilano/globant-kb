# Trending AI Agents & Tools — Technology

> What's new and moving fast this week (2026-07-14, v6).

## This Week's Signals

### MCP RC 2026-07-28 — Final Spec Imminent
The release candidate for the next Model Context Protocol specification dropped this week, targeting **July 28, 2026** as final publication date. Key changes:
- Stateless core that scales on ordinary HTTP (no sticky sessions required)
- MCP Apps extension: server-rendered UIs inside MCP clients
- Tasks extension: long-running async work natively in the protocol
- OAuth/OIDC-aligned authorization
- Formal deprecation policy (12-month minimum between deprecation → removal)
- SDK Tier 1 (Python, TypeScript) must ship support within the 10-week validation window

MCP is now governed by the **Agentic AI Foundation (AAIF)** under the Linux Foundation, co-founded by Anthropic, Block, and OpenAI, backed by Google, Microsoft, AWS, Cloudflare, and Bloomberg.

### SWE-bench Pro Reveals Realistic Coding Performance
Scale AI's SWE-bench Pro (1,865 multi-language tasks, contamination-resistant) paints a sobering picture:
- Claude Fable 5: 80.3% Pro (all-time high, currently suspended from leaderboard)
- Claude Opus 4.8: **69.2%** (current active leader)
- GPT-5.6 Sol: 64.6%
- Standard commercial codebases: best models reach only **47.1%** on private proprietary code
- Contrast with SWE-bench Verified where models report 80%+ — Pro is the more reliable signal

### OpenCode Overtakes Everything
`anomalyco/opencode` now holds **165k+ stars**, making it the most-starred open-source coding agent. With Gemini CLI shut down (replaced by closed-source `agy` on June 18), OpenCode is the clear default provider-agnostic CLI for teams that don't want lock-in.

### Agentic Fleet Tooling: Orca Emerges
**Orca** — an agent development environment for running fleets of parallel coding agents across desktop and mobile — is trending this week. Reflects the emerging "fleet orchestration" pattern: instead of one coding agent, teams run N agents in parallel on different subtasks.

### Graphify: Codebase Knowledge Graphs
**Graphify** turns codebases, schemas, docs, and media into queryable knowledge graphs for AI coding assistants. Trending as teams look for better long-context retrieval over large repos without repeatedly hitting LLM context limits.

### Voicebox: Open AI Voice Studio
Open-source AI voice studio for cloning, dictating, and creating audio — trending as teams integrate voice interfaces into developer tools and documentation systems.

## Framework News

| Event | Impact |
|-------|--------|
| AutoGen → MAF (Microsoft Agent Framework) | Microsoft merged AutoGen + Semantic Kernel; recommend MAF for new Microsoft-stack projects |
| CrewAI v0.105 | Enterprise observability, scheduling, 60% F500 adoption |
| LangGraph v0.4 | HITL checkpoints, state persistence improvements |
| Gemini CLI sunset (Jun 18) | Replaced by closed `agy` binary; OpenCode fills the gap |
| SpaceX acquires Cursor (~$60B) | Signals massive consolidation in AI coding tools space |

## Key Metrics (Jul 2026)

- MCP: **97M monthly SDK downloads**, **10,000+ active server implementations**
- AI-generated code: **60% of all new code** by 2026 (Gartner)
- Gartner: **40% of enterprise apps** will include task-specific AI agents by end of 2026
- 84% of developers use or plan to use AI tools; 51% use them daily
- AI coding tools save developers **3.6 hours/week** on average

---
*Pipeline auto-updated — refreshed each run.*
