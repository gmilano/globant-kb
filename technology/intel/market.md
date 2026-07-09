# Market Map — Technology / AI Software Development

> Key players, market sizing, and positioning. Global + LATAM focus.
> Updated: 2026-07-09.

## Market Sizing

| Segment | 2026 Size | 2031 Projection | CAGR |
|---------|-----------|-----------------|------|
| AI Code Tools (global) | $9.35B | $29.96B | 26.23% |
| AI Agent Frameworks (global) | $7.84B | $52.62B | 46.3% |
| MLOps Platforms (global) | ~$4.5B | ~$18B | 30%+ |
| Developer Tools (all, global) | ~$29B | ~$68B | ~18% |

Sources: The Business Research Company (AI Code Tools, 2026), various analyst estimates.

## Developer Adoption (2026)

| Metric | Value | Source |
|--------|-------|--------|
| Devs using/planning AI tools | 84% | Multiple surveys |
| Devs using AI daily | 51% | Stack Overflow |
| Time reduction on routine coding | 46% | McKinsey (4,500+ devs) |
| Completed tasks increase | 26.08% | MIT Economics (4,867 devs) |
| Average time saved/week | 3.6 hours/dev | Panto AI survey |
| Devs who trust AI output | 29% | (down from 40% in 2024) |
| Orgs experimenting with AI agents | 62% | McKinsey |
| Orgs scaling agentic systems | 23% | McKinsey |

## SWE-bench Coding Benchmark (July 2026)

| Model | SWE-bench Verified | SWE-bench Pro |
|-------|--------------------|---------------|
| Claude Mythos 5 | 95.5% | N/A |
| Claude Fable 5 | 95.0% | N/A |
| Claude Opus 4.8 | 88.6% | 69.2% (leads active models) |
| GPT-5.4 (xHigh) | ~85% | 59.1% |
| GLM-5.2 (open weights) | ~72% | 62.1% |
| OpenHands + Claude Sonnet 4.5 | 72-77.6% | N/A |

SWE-bench Pro = Scale AI's contamination-resistant benchmark: 1,865 real-world tasks across 41 professional repos.

## Competitive Landscape

### Closed-Source Coding Tools

| Company | Product | Positioning |
|---------|---------|-------------|
| Anthropic | Claude Code | Best SWE-bench scores; proprietary CLI; used by TELUS (500k hrs saved), AWS |
| OpenAI | Codex CLI + GPT-5 | Terminal agent (Apache-2.0 code); API-first |
| Google | Antigravity CLI (ex-Gemini CLI) | Replacing Gemini CLI Jun 2026; free individual tier |
| GitHub (Microsoft) | Copilot Enterprise | IDE integration, inline + chat; 1.5M paid seats |
| SpaceX / Cursor | Cursor Pro | $60B acquisition closing Q3 2026; market leader in IDE agent UX |
| JetBrains | Junie AI Agent | IDE agent; IntelliJ native; strong in Java/Kotlin shops |

### Open-Source Champions

| Repo | Stars | Who Backs It |
|------|-------|-------------|
| OpenHands/OpenHands | 79.6k | MIT; $18.8M Series A; AMD/Apple/Google/Netflix engineers |
| anomalyco/opencode | 181.5k | MIT; community; emerging Cursor alternative |
| FoundationAgents/MetaGPT | 67.9k | MIT; FoundationAgents; academic origins |
| crewAIInc/crewAI | 52.8k | MIT; CrewAI Inc (Series A-funded); 5.2M monthly installs |
| langgenius/dify | 144k | Apache-2.0; Dify Inc; 100+ enterprise self-hosted deployments |
| microsoft/autogen | 42k | Apache-2.0; Microsoft Research; maintenance mode (→ Agent Framework) |

## Protocol & Ecosystem

### MCP (Model Context Protocol) — The Dominant Integration Standard

- **Donated** to Linux Foundation by Anthropic (December 2025)
- **10,000+ active MCP servers** in production (May 2026)
- **15,926 mcp-server repos** on GitHub
- **97M monthly SDK downloads** (Python + TypeScript combined)
- **41%** of software orgs in limited/broad MCP production (Stacklok 2026)
- **RC 2026-07-28** = largest spec revision since launch
- Major adopters: Slack, GitHub, Google, Salesforce, Stripe, HubSpot, Shopify, Notion, Linear, Sentry, Figma, Webflow, Cloudflare, Postman, WooCommerce

### A2A (Agent-to-Agent) — Google's Multi-Agent Protocol

- Published by Google April 2025
- Supported by Google ADK, Vertex AI
- Positioning: A2A for agent-to-agent; MCP for agent-to-tool; often used together

## LATAM Opportunity Map

| Opportunity | Market Signal | Globant Entry Point |
|-------------|--------------|---------------------|
| Nearshore dev productivity | 62% LATAM dev shops not yet using AI coding tools | Deploy Claude Code + OpenHands for client delivery teams |
| Air-gapped enterprise DevOps | Brazilian/Argentine banks require on-prem | Gitea + GitLab CE + MLflow on-prem + Claude API via private endpoint |
| Government digital modernization | LATAM govtech boom (BR, CO, MX, AR) | OpenHands Enterprise + MCP servers for legacy system integration |
| Startup ecosystem tooling | LATAM startup count +34% YoY 2026 | Dify + LangGraph SaaS — fast time-to-market |
| Tech talent upskilling | 500k dev talent gap in LATAM | AI coding tutor powered by SWE-agent + Claude |

## Globant Positioning

Globant AI Studios can offer:
1. **Agentic DevOps Platform** — GitLab CE + OpenHands + MCP as managed service for enterprise LATAM clients
2. **AI Coding Productivity Suite** — Internal deployment of CrewAI + Claude Code for delivery teams (following TELUS model: 30% faster, 500k hours)
3. **MCP Server Factory** — Standardized MCP server templates for clients' internal tools (Salesforce, SAP, legacy APIs)
4. **AI QA Automation** — SWE-agent + LangGraph for continuous automated testing on client repos
5. **MLOps Platform Build** — MLflow + Kubeflow + Evidently on K8s for clients starting ML programs

Deal sizes: $80k–$2M depending on scope and enterprise tier.
