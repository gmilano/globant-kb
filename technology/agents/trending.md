# Trending AI Agents & Tools — Technology Industry

> Week of 2026-07-06 | What's new and gaining momentum

## Breakout This Month

### OpenCode — 172k stars (MIT)
The fastest-growing coding agent CLI of 2026. Terminal-first, model-agnostic, competes directly with Claude Code and Codex CLI. Growing 20k+ stars per week at peak. Went viral multiple times. Strong community momentum for teams wanting full local control with no proprietary lock-in.
- **Repo**: [anomalyco/opencode](https://github.com/anomalyco/opencode)

### OpenAI Codex CLI — 95k stars (Apache-2.0)
OpenAI's lightweight terminal-based coding agent. Runs locally, connects to OpenAI models. Direct competitor to Aider. Gained 95k stars rapidly — signals massive market demand for CLI-native AI coding tools that developers can self-host or pipe into CI/CD.
- **Repo**: [openai/codex](https://github.com/openai/codex)

### Gemini CLI — Apache-2.0 (Google, Q2 2026)
Google's open-source terminal agent. Deep Google services integration. First major coding agent from a hyperscaler released fully open-source. Signaling that the CLI coding agent market is too large for any vendor to keep proprietary.

### OpenHands Software Agent SDK — MIT (NEW)
OpenHands V1 launched a clean, modular SDK for building custom AI agents on top of the OpenHands platform. Companies can author specialized agents ("only touches Python files", "runs security scans before committing") as composable modules — now a public API.
- **Repo**: [OpenHands/software-agent-sdk](https://github.com/OpenHands/software-agent-sdk)
- **Globant angle**: Fork and extend for client-specific engineering automation. Replace junior-task automation in CI pipelines.

## Framework Momentum Shifts

### LangGraph Surpasses CrewAI in Enterprise Adoption
LangGraph crossed 24k stars and overtook CrewAI in enterprise adoption in early 2026. Driven by its deterministic graph-based architecture that satisfies audit/compliance requirements. Enterprise teams prefer graphs over role-play metaphors. 34.5M monthly downloads.

### Dify Crosses 144k Stars — "WordPress for AI Apps"
Dify is now the highest-starred AI agent platform globally. Growing 2k+ stars per week. No-code visual builder for LLM apps is hitting mass-market adoption — comparable to the moment WordPress made web publishing accessible.

### Google ADK: 20k Stars in <18 Months
Google's Agent Development Kit (April 2025) reached 20k stars and 3.3M monthly downloads — fastest-adopted enterprise agent framework from a major cloud provider. A2A (Agent-to-Agent) protocol adds cross-framework interoperability.

### Langfuse v3.x — Multi-Agent Tracing
New release adds multi-agent trace trees, cost attribution per agent node, and LLM-as-judge eval templates. First observability platform with native A2A trace support.
- **Repo**: [langfuse/langfuse](https://github.com/langfuse/langfuse)
- **Globant angle**: Mandatory for any production AI app delivery. Bill clients by actual token cost per workflow.

## Security & DevOps AI Trending

### claude-code-security-review — MIT, Anthropic (5.4k stars)
GitHub Action using Claude to analyze code for security vulnerabilities on every PR. Declarative YAML-based setup. Growing as enterprise CI security requirement — signals the market for "AI-native SDLC security" is forming.
- **Repo**: [anthropics/claude-code-security-review](https://github.com/anthropics/claude-code-security-review)

### code-review-graph (MIT, 19.1k stars)
Local-first code intelligence graph for MCP and CLI. Builds persistent graph of the codebase enabling semantic code navigation for AI agents. Novel approach: graph-first codebase representation.
- **Repo**: [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph)

### dtctl — Apache-2.0, Dynatrace
AI-native CLI for Dynatrace platform resources built for humans AND AI agents. Signals a new pattern: observability vendors building agent-first tooling as a primary interface (not just API afterthought).
- **Repo**: [dynatrace-oss/dtctl](https://github.com/dynatrace-oss/dtctl)

## GitHub Signals This Week

- **4.3 million** AI-related repos on GitHub — 178% YoY jump in LLM-focused projects (GitHub Octoverse 2025)
- **MCP adoption accelerating**: 500+ community MCP servers for GitHub, Jira, Slack, AWS, K8s, Postgres — the "npm for AI tool integrations" is forming
- **Coding agent consolidation**: With Roo Code archived (May 2026), market consolidating around Cline (VS Code), Aider (terminal), OpenHands (autonomous), OpenCode (terminal)
- **Sovereign dev stacks**: Forgejo + Woodpecker CI + SigNoz + Backstage gaining as GitHub alternative for LATAM/regulated clients
- **LLM observability category forming**: Langfuse (MIT, 12k+), SigNoz (Apache, 20k), Grafana Assistant all adding native agent/LLM traces — now a procurement requirement

## New Repos to Watch

| Repo | License | Stars | Signal |
|------|---------|-------|--------|
| [anomalyco/opencode](https://github.com/anomalyco/opencode) | MIT | 172k | Fastest-growing coding agent CLI 2026 — viral multiple times |
| [anthropics/claude-code-security-review](https://github.com/anthropics/claude-code-security-review) | MIT | 5.4k | Enterprise CI security requirement forming a category |
| [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph) | MIT | 19.1k | Graph-first codebase representation for AI agents |
| [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) | MIT | 18k | v2.0 with MCP support — frontend layer for any agent stack |
| [wong2/awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers) | MIT | growing | Community MCP registry; npm-equivalent for AI tool integrations |

---
*Updated 2026-07-06. Sources: GitHub Trending, OSSInsight, ByteByteGo Top AI Repos, community feeds.*
