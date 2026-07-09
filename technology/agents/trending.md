# Trending This Week — Technology / AI Dev Tools

> What's new and moving fast in the AI development tools space. Updated: 2026-07-09.

## Week of July 7–9, 2026

### MCP 2026-07-28 Release Candidate — Biggest Revision Since Launch
The [Model Context Protocol 2026-07-28 RC](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) is now published.
Key changes:
- **Stateless core**: scales on ordinary HTTP infrastructure (no WebSocket required for basic servers)
- **MCP Apps**: server-rendered UIs embedded in clients (Claude, Cursor, VS Code)
- **Tasks extension**: long-running async work with progress streaming
- **Auth overhaul**: aligns with OAuth 2.1 and OpenID Connect; replaces the bespoke auth scheme
- Impact: 15,926 mcp-server repos on GitHub; 41% of software orgs in limited/broad production

### Claude Fable 5 + Mythos 5 — 95%+ SWE-bench Verified
Claude Fable 5 hits **95% SWE-bench Verified** (Jul 8, 2026), Claude Mythos 5 leads at **95.5%**.
Claude Opus 4.8 remains the best commercial model at 88.6% Verified / 69.2% SWE-bench Pro.
Open-weights leader: GLM-5.2 at 62.1% SWE-bench Pro.
Benchmark: [SWE-bench Verified Leaderboard](https://benchlm.ai/benchmarks/sweVerified)

### SpaceX Acquires Cursor — $60B All-Stock Deal
SpaceX announced a **$60 billion all-stock acquisition of Cursor** on June 16, 2026 (expected close Q3 2026).
As a result, **OpenCode** (MIT, 181.5k★) is emerging as the model-agnostic, enterprise-safe alternative for teams wary of vendor lock-in post-acquisition.

### Gemini CLI → Antigravity CLI Migration
Google announced at I/O 2026 that Gemini CLI is being replaced by **Antigravity CLI**.
- Individual-tier requests stopped June 18, 2026
- Enterprise access unchanged
- Gemini CLI repo (Apache-2.0, 80k★) remains open source
- Migration window: existing projects have 90 days

### OpenHands 0.40 — Enterprise Control Plane GA (May 6, 2026)
OpenHands released the **Enterprise Control Plane** into GA:
- RBAC + cost guardrails + full audit trails
- Docker and Kubernetes deployment targets
- SWE-bench Verified now at 77.6% on own harness
- [OpenHands Enterprise](https://www.openhands.dev/)

### Anthropic 2026 Agentic Coding Report
Anthropic published its [2026 Agentic Coding Trends Report](https://resources.anthropic.com/2026-agentic-coding-trends-report):
- Average agent session: **4 min (Q1 2025) → 23 min (Q1 2026)** — agents taking on much more complex work
- TELUS case study: **30% faster engineering** + 500,000 hours saved
- 75% of developers will spend more time orchestrating than writing code by end of 2026

### AI Code Tools Market — $9.35B in 2026
The AI code tools market hit **$9.35B in 2026**, growing to **$29.96B by 2031** (CAGR 26.23%).
Developer adoption: **84% use or plan to use AI tools**; 51% use daily.
McKinsey: **46% reduction** in time spent on routine coding tasks.

## Repos to Watch

| Repo | Stars | Why It Matters |
|------|-------|----------------|
| [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) | 79.6k | SWE-bench leader, enterprise-ready GA |
| [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) | 80k+ | Apache-2.0, now in transition to Antigravity CLI |
| [anomalyco/opencode](https://github.com/anomalyco/opencode) | 181.5k | Rising Cursor alternative post-SpaceX |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | 60k+ | MIT, skills-based personal/enterprise agent |
| [modelcontextprotocol/python-sdk](https://github.com/modelcontextprotocol/python-sdk) | 8.2k | MCP RC 2026-07-28 just dropped |
| [caramaschiHG/awesome-ai-agents-2026](https://github.com/caramaschiHG/awesome-ai-agents-2026) | 10k+ | Curated 300+ agents list for 2026 |

---
*Updated 2026-07-09. Sources: Anthropic Agentic Coding Report, MCP Blog, morphllm.com SWE-bench tracker.*
