# 📈 Trending Agents & Tools — Technology Industry

> What's gaining traction this week in dev tooling, AI agents, and infrastructure automation.
> Last updated: 2026-07-09 v4

## Breakout Repos (July 2026)

| Repo | License | Stars | Why It Matters |
|------|---------|-------|----------------|
| [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) | Apache-2.0 | 80k+ | **NEW Jul 2026** — Google's open-source terminal AI agent; Gemini 2.5 Pro free with personal Google account; MCP servers via ~/.gemini/settings.json; GitHub Actions CI integration at zero cost |
| [anomalyco/opencode](https://github.com/anomalyco/opencode) | MIT | 185k | v1.17.14 (Jul 6 2026): MCP adapter for confined orchestration scripts; 75+ model providers, LSP integration |
| openai/codex *(OpenClaw fork ecosystem)* | Apache-2.0 | 210k+ | Originally openai/codex; community "OpenClaw" fork surged 9k → 60k in days (Jan 2026), now 210k+ — fastest-growing OSS project in GitHub history |
| [openai/codex](https://github.com/openai/codex) | Apache-2.0 | 97k | OpenAI's CLI coding agent; sandboxed code execution model; spawned OpenClaw and hundreds of wrappers |
| [cline/cline](https://github.com/cline/cline) | Apache-2.0 | 61k | VS Code coding agent; Roo Code fork archived May 2026; 10k stars/month from returning community |
| [microsoft/autogen](https://github.com/microsoft/autogen) | MIT | 58.7k | AutoGen v0.4 (async rewrite) stable; merged with Semantic Kernel → Microsoft Agent Framework (GA Q1 2026); 856k downloads/month |
| [block/goose](https://github.com/block/goose) | Apache-2.0 | 19k | Block's CLI coding agent; skill-based architecture, runs any LLM, extends via MCP servers |
| [kagent-dev/kagent](https://github.com/kagent-dev/kagent) | Apache-2.0 | 3.2k | Kubernetes-native agent runtime; agents as K8s resources, kubectl-manageable, GitOps-compatible |
| [langfuse/langfuse](https://github.com/langfuse/langfuse) | MIT | 28k+ | LLM observability leader; self-hostable, framework-agnostic via OpenTelemetry; EU AI Act compliance tooling |
| [anthropics/claude-code-security-review](https://github.com/anthropics/claude-code-security-review) | MIT | 5.4k | AI-powered security review as GitHub Action; zero-config, drops into any repo |
| [dynatrace-oss/dtctl](https://github.com/dynatrace-oss/dtctl) | Apache-2.0 | 160 | CLI for Dynatrace platform "built for humans and AI agents alike" — agent-native CLI design pattern |

## MCP Protocol — 2026-07-28 Release Candidate (Shipping Jul 28)

The largest MCP revision since launch. RC locked May 21, 2026; 10-week window for SDK maintainers to validate. Final spec ships **July 28, 2026**.

### Breaking Changes
- **Sessions removed (SEP-2567)**: Protocol-level sessions and `Mcp-Session-Id` header gone from Streamable HTTP transport. Remote MCP servers no longer need sticky sessions or shared session stores — run behind plain round-robin load balancers.
- **New required headers (SEP-2243)**: `Mcp-Method` and `Mcp-Name` headers required so load balancers and rate-limiters can route on the operation without body inspection.

### New Capabilities
- **MCP Apps (SEP-1865)**: Servers ship interactive HTML interfaces that hosts render in sandboxed iframes. Tool UIs declared ahead of time so hosts can prefetch, cache, and security-review before execution.
- **Tasks extension**: Server answers `tools/call` with a task handle; client drives with `tasks/get`, `tasks/update`, `tasks/cancel`. Enables long-running work (minutes/hours) with progress events.
- **Response caching (SEP-2549)**: `tools/list` and resource reads carry `ttlMs` and `cacheScope` (modeled on HTTP Cache-Control). Clients know exactly how long a list is fresh and whether it's safe to share across users.
- **Formal deprecation policy**: 12-month minimum window for deprecated features to remain functional — protocol can evolve without breaking existing integrations.

### Ecosystem Stats
**5,000+ MCP servers** available; adopted by Anthropic, OpenAI, Google DeepMind (Gemini CLI), Microsoft. Every major AI coding tool (Claude Code, Cursor, VS Code Copilot, Windsurf, Gemini CLI) supports MCP.

## Notable MCP Servers for Technology

| MCP Server | License | Focus | Notes |
|-----------|---------|-------|-------|
| [github-mcp](https://github.com/github/github-mcp-server) | MIT | GitHub API | Official GitHub MCP server; 60+ tools covering repos, PRs, issues, CI actions |
| [kubernetes-mcp-server](https://github.com/manusa/kubernetes-mcp-server) | Apache-2.0 | Kubernetes | Cluster management via MCP; pairs perfectly with kagent |
| [docker/labs-ai-tools-for-devs](https://github.com/docker/labs-ai-tools-for-devs) | Apache-2.0 | Docker | Docker Labs AI tools; MCP server for container management and inspection |
| [filesystem](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) | MIT | Local files | Reference implementation for file system access in MCP agents |
| [sequential-thinking](https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking) | MIT | Reasoning | Structured chain-of-thought reasoning for complex dev tasks |
| [semgrep-mcp](https://github.com/semgrep/semgrep-mcp) | LGPL-2.1 | Security | Run Semgrep SAST scans from AI agents as MCP tool calls |

## SWE-bench Leaderboard Signal (Jul 2026)

The benchmark tells you what's actually production-ready:
- Claude Mythos 5 tops SWE-bench Verified at **95.5%** (Jul 6, 2026)
- Claude Fable 5 leads SWE-bench Pro at **80.3%** (Jul 7) — more meaningful as Pro has no ground-truth leakage
- **Tencent Hy3** debuts at **57.9%** on SWE-bench Pro — first major APAC model to crack top 5
- **Claude Opus 4.6** leads SWE-bench Lite at **62.7%** — 47 models evaluated, avg 28.1
- OpenHands + Claude reaches **72%** Verified — best fully open-source agent result
- SWE-bench average session: **47 tool calls**, **23 minutes** (up from 4 min in Q1 2025)
- 57 models now evaluated on SWE-bench Verified — the benchmark has become a procurement signal

## New This Week (Jul 7–9, 2026)

| Tool | Signal |
|------|--------|
| Gemini CLI GitHub Actions | Zero-cost AI CI teammate for any repo; Google's move to grab enterprise CI/CD mindshare |
| OpenCode v1.17.14 | MCP adapter for orchestration scripts; locked-down MCP execution model now in OSS |
| Persistent context tool (Jul 7) | Cross-session memory for Claude Code, OpenClaw, Codex, Gemini CLI, Copilot — compresses session history into future context |
| MCP 2026-07-28 RC | Stateless HTTP; sessions gone; MCP Apps (sandboxed UIs); Tasks extension; caching TTL |
| Tencent Hy3 SWE-bench | First major APAC model in top 5 on SWE-bench Pro — shows coding agent competition globalizing |

## Emerging Patterns to Watch

- **Agent-native CLIs**: New CLIs (dtctl, k8sgpt, kagent, Gemini CLI) designed for both humans and AI agents
- **Cross-session memory**: Persistent context tools compressing agent history for long-running autonomous work
- **Google + GitHub free CI tier**: Gemini CLI GitHub Actions at zero cost threatens GitHub Copilot Enterprise's CI value prop
- **Long-running autonomous workflows**: Avg coding agent session grew from 4 min → 23 min (Q1 2025 → Q1 2026)
- **Parallel agent runners**: Running 10+ agents on 10+ PRs simultaneously becoming standard DevOps practice
- **Security agents**: claude-code-security-review + semgrep-mcp pattern in CI/CD being widely cloned
- **LLM observability as table stakes**: Langfuse/Opik now required for any production AI system
- **SLM for agent tasks**: NVIDIA research shows 7B SLMs are 10–30x cheaper for most schema-constrained workloads

---
*Updated weekly — tracks GitHub trending, Hacker News, and OSS Insight rankings. Last refresh: 2026-07-09 v4.*
