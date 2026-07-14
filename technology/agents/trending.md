# 📈 Trending Agents & Repos — Technology

> What's hot this week in AI developer tooling. Updated: 2026-07-14 (v7)

## This Week's Breakout Signals

### 1. MCP 2026-07-28 Release Candidate — Stateless Core Ships
The largest MCP spec revision since launch is available as RC now (final July 28):
- **Stateless architecture**: `Mcp-Session-Id` header removed — any request lands on any server instance; sticky routing gone
- **EMA** (Enterprise-Managed Authorisation): stable extension, centralised IdP control for MCP servers
- **Routing headers**: `Mcp-Method` + `Mcp-Name` headers let load balancers route without body inspection
- **Cache control**: `ttlMs` + `cacheScope` on list/resource-read results
- **Formal extensions framework**: reverse-DNS identifiers, independent versioning, MCP Apps + Tasks extensions
- **Impact**: all MCP servers need re-testing; stateless means cheaper horizontal scaling on ordinary HTTP infra
- **SDKs**: Tier 1 SDKs must ship support in this 10-week RC window (window closes ~Oct 2026)

### 2. SWE-bench Verified Approaching Saturation
- Top open-source agents (OpenHands, Mini-SWE-Agent) now reach 72–74% Verified
- Frontier models (Fable 5) at 95.0%, Opus 4.8 at 88.6% Verified
- SWE-bench Pro (harder variant): Fable 5 80.3%, Opus 4.8 69.2%
- OpenAI stopped reporting Verified scores in Feb 2026 citing contamination
- New benchmark watch: **Terminal-Bench** (Codex+GPT-5.5 83.4% leads; Claude Code+Fable 5 83.1%)
- **AgentLens** (arXiv:2605.12925): exposes "Lucky Pass Problem" — top scores inflate via test-case overlap

### 3. A2A Protocol Crosses 150-Org Milestone
- Google's Agent-to-Agent protocol (donated to Linux Foundation Jun 2025) now has 150+ member organizations
- Live in **Azure AI Foundry** and **Amazon Bedrock AgentCore** (production deployments)
- Partners include: Salesforce, MongoDB, ServiceNow, IBM, Accenture, Deloitte, McKinsey
- A2A (coordination layer) + MCP (tool access layer) = canonical interoperability stack for multi-agent systems
- GitHub repo: github.com/google/A2A — 22k+ stars

### 4. Agentic Coding Session Length: 4 min → 23 min
- Anthropic's 2026 Agentic Coding Trends Report: avg session length grew 5.75× in one year (Q1 2025 → Q1 2026)
- Agents are now handling multi-step, hours-long engineering tasks, not just one-off completions
- 90% engineering leaders report productivity improvements; avg +19.3% net gain (Gartner)
- Enterprise AI coding agents market: ~$9.8–$11B annualized (Apr 2026), 119% CAGR

### 5. Browser-Use Completes CDP Migration (100k Stars)
- browser-use dropped Playwright, now communicates directly via Chrome DevTools Protocol
- Motivation: Playwright overhead too high for performance-critical agent loops
- Concurrent with: Skyvern 2.0 achieves 85.85% WebVoyager with vision + Playwright integration

### 6. opencode v1.17.x — Azure AI + GPT-5.6 Support
- Latest release adds Azure AI support for GPT-5.6, removes obsolete Codex workarounds
- 181k+ GitHub stars; 7.5M developers use monthly
- Offers privacy-first local harness as alternative to Claude Code / Cursor for enterprise data concerns

## Top Repos by Momentum (Week of 2026-07-14)

| Repo | Why It's Trending |
|------|-------------------|
| [anomalyco/opencode](https://github.com/anomalyco/opencode) | v1.17.x Azure AI + GPT-5.6; 181k stars, 7.5M monthly devs |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | CDP migration complete; 100k stars milestone |
| [google/A2A](https://github.com/google/A2A) | 150+ orgs, Azure/Bedrock production, Linux Foundation |
| [All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands) | 72% SWE-bench Verified; Docker + RBAC production-ready |
| [modelcontextprotocol/specification](https://github.com/modelcontextprotocol/specification) | RC 2026-07-28 stateless spec; Tier 1 SDKs must update |
| [langgenius/dify](https://github.com/langgenius/dify) | 144k stars; 34M monthly active; visual workflow builder |
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | 43.8k stars; Google eng culture in 23 production skills |
| [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | v1.14 pluggable backends; 52k stars; 5.2M monthly downloads |

---
*v7 — Updated 2026-07-14*
