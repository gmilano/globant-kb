# 📡 Trends — Technology Industry AI

> Current trends shaping AI in technology. Last updated: 2026-07-14 (v7)

## T1 — MCP Goes Stateless (RC: 2026-07-28)

The MCP 2026-07-28 Release Candidate is the largest spec revision since launch:
- **Stateless HTTP core**: `Mcp-Session-Id` removed; any request lands on any server → horizontal scaling on ordinary HTTP infra, no sticky routing required
- **EMA (Enterprise-Managed Authorisation)**: stable extension; centralised IdP control; aligns with OAuth 2.0 + OIDC enterprise deployments
- **Routing headers**: `Mcp-Method` + `Mcp-Name` headers allow load balancers and API gateways to route without body inspection
- **Extensions framework**: reverse-DNS IDs, independent versioning (MCP Apps, Tasks); delegated maintainers
- **Cache control**: `ttlMs` + `cacheScope` on list/resource-read results for efficient client caching
- **Impact**: Tier 1 SDKs must ship support in the 10-week RC window (closes ~Oct 2026)
- **97M monthly SDK downloads; 10k+ active MCP servers** already

## T2 — A2A Protocol Achieves Enterprise Production

Google's A2A (Agent-to-Agent) protocol, donated to Linux Foundation Jun 2025:
- **150+ organizations** as of Jul 2026: IBM, Salesforce, MongoDB, ServiceNow, Accenture, Deloitte, McKinsey
- **Production in Azure AI Foundry and Amazon Bedrock AgentCore**
- **MCP + A2A interoperability stack**: MCP = tool access layer; A2A = agent coordination layer; both needed in production multi-agent systems
- Vertical adoption: supply chain, financial services, insurance, IT operations

## T3 — SWE-bench Verified Approaching Saturation

- Top open-source agents (OpenHands, Mini-SWE-Agent) now reach 72–74% Verified (approaching top-5 frontier 2 years ago)
- Fable 5: 95.0% Verified / 80.3% Pro; Opus 4.8: 88.6% Verified / 69.2% Pro
- OpenAI stopped reporting SWE-bench Verified Feb 2026 (contamination concerns)
- **New watch**: SWE-bench Pro (harder), Terminal-Bench (CLI-native; 83.4% Codex+GPT-5.5 leads)
- AgentLens (arXiv:2605.12925): "Lucky Pass Problem" — contamination inflates top scores; interpret with caution

## T4 — Agentic Coding Sessions Lengthen 5.75× in One Year

Anthropic's 2026 Agentic Coding Trends Report (published Jun 2026):
- Avg session length: **4 min (Q1 2025) → 23 min (Q1 2026)**
- Agents now handle multi-step, hours-long engineering tasks, not just autocomplete
- Engineering roles shifting: less foundational code writing → more agent supervision, system design, output review
- 90% of engineering leaders report improvements; +19.3% average net productivity gain (Gartner)
- Market: enterprise AI coding agents ~$9.8–$11B annualized (Apr 2026); 119% CAGR

## T5 — Browser Automation Migrates to CDP

- **browser-use** (100k stars) dropped Playwright, moved to Chrome DevTools Protocol — Playwright overhead too high for agent loops
- **Skyvern 2.0**: 85.85% WebVoyager; 10M+ executed workflows; vision + LLM without brittle selectors
- **Stagehand**: TypeScript CDP-native; developer-friendly browser agent framework
- Signal: browser automation is now a first-class AI agent substrate, not just a testing tool

## T6 — Agent Context Infrastructure Breakout Category

Context-window limits on large codebases are the #1 pain for coding agents. New category emerging:
- **codebase-memory-mcp**: persistent code graph accessible to any MCP-compatible agent
- **claude-mem** (85k stars): persistent cross-session memory for any agent
- **code-review-graph** (19k): local-first code intelligence graph for MCP + CLI
- **agent-skills** (43.8k): 23 Google engineering skills encoded for coding agents
- Pattern: "agent harnesses" — opinionated environments that bundle tools + skills + memories for specific workflows

## T7 — Framework Consolidation: LangGraph, CrewAI, MAF, Dify Lead

Four frameworks pulling ahead of the rest:
- **Dify** (144k stars): visual + no-code; 34M active builders; largest OSS LLM platform
- **LangGraph 1.0** (34.5M monthly downloads): stateful graphs; HITL; per-node timeouts; enterprise standard
- **CrewAI 1.14** (52k stars, 5.2M monthly): role-based crews; pluggable backends; 100+ templates
- **MAF 1.0 GA** (Apr 2026): Microsoft merged AutoGen + Semantic Kernel; .NET/Python/Java; OTel; MCP+A2A native
- **Loser**: independent frameworks (Flowise acquired by Workday; Haystack → niche; Agentverse → sunset)

## T8 — vLLM Dominates Production GPU Serving at Scale

- vLLM vs Ollama throughput gap: **16.6× at scale** (8,033 vs 484 tok/s on Blackwell for 70B model)
- PagedAttention + speculative decoding + Blackwell NVFP4 = step-change inference efficiency
- Ollama wins: single developer, CPU-only, Apple Silicon, fast setup
- vLLM wins: any concurrent users >5–6, NVIDIA or AMD hardware, team-serving scenarios
- llama.cpp: embedded systems, CPU-only, maximum control, GGUF format

## T9 — SpaceX/Cursor Acquisition Signals Coding Tool Market Maturity

- SpaceX acquired Cursor (~$60B, Jun 2026) — largest coding tool exit in history
- Signal: coding agents are now infrastructure, not experiment
- Response: opencode (MIT, 181k stars) positioned as the privacy-first, vendor-neutral alternative
- 7.5M developers use opencode monthly — OSS alternative capturing enterprise data-sovereignty concerns

## T10 — OpenTofu Consolidates Terraform Migration

- IBM acquired HashiCorp; Terraform OSS moved to BSL (non-open)
- OpenTofu (MPL-2.0, CNCF member) now has ~95% feature parity; community-governed
- CNCF graduation progress; Crossplane growing for cloud-native control planes (Kubernetes-native IaC)
- AI agent infra teams: standardizing on OpenTofu for Terraform compatibility without vendor lock-in

## T11 — Self-Hosted DevOps Renaissance (Forgejo + Woodpecker)

- Forgejo (community Gitea fork, MIT) + Woodpecker CI (Apache-2.0, 50MB RAM) = complete OSS DevSecOps
- Rising vs GitHub Actions: no per-minute billing; data stays on-prem; LATAM data residency compliant
- AI integrations: code review agents as Woodpecker pipeline steps; issue triage bots via Gitea webhooks

## T12 — LGTM Stack Becomes Observability Gold Standard

- Loki (logs) + Grafana (viz) + Tempo (traces) + Mimir (metrics) = new gold standard for cloud-native teams
- AI use: anomaly detection agents on top of Prometheus metrics; LLM latency/cost dashboards in Grafana
- MLflow LLMOps gateway: route LLM calls, log experiments, compare model versions — Apache-2.0

## T13 — Multi-Agent Orchestration Moves to Production

- Organizations moving from single agents to groups of specialized agents under orchestrator
- Pattern: **orchestrator agent** → specialized sub-agents (coder, reviewer, tester, deployer)
- MAF and LangGraph leading in production multi-agent deployments
- Key challenge: agent observability — OTel integration now first-class in MAF; LangSmith in LangChain ecosystem

## T14 — AI Democratization Beyond Senior Engineers

- Coding agents expanding into: legacy languages (COBOL/Fortran), security ops, operations/SRE, design
- Dify enabling non-technical product teams to build LLM workflows without code
- n8n + AI nodes: 400+ integrations + LLM calls in visual low-code
- Signal: AI developer tooling TAM expanding from ~$9.8B (professional devs) toward all knowledge workers

## T15 — LATAM-Specific: WhatsApp-First + Data Residency Pressure

- Brazil LGPD + Argentina PDPA + Colombia Habeas Data = data residency mandates for AI tools
- **WhatsApp API**: 120M+ users Brazil, 88M Mexico, 35M Colombia — primary channel for AI agents
- Pattern: Dify or n8n backend + WhatsApp Business API = enterprise AI in LATAM's dominant channel
- **Local AI stacks** (Ollama + Forgejo + Woodpecker) gaining traction in LATAM regulated industries
- **AWS sa-east-1 (São Paulo) + Azure Brazil South + GCP Vinhedo** = three LATAM AI-compliant regions

---
*v7 — Updated 2026-07-14*
