# Trends — Enterprise AI

> Current signals, emerging patterns, strategic indicators.
> Last updated: 2026-07-07

## Trend 1: Agentic Workflows Cross the Production Threshold (2026 is Year Zero)
**Signal**: 57% of organizations have ≥1 AI agent in production (IDC 2026). Gartner: 40% of enterprise apps embed task-specific agents by end of 2026, up from <5% in 2025.

**What changed**: 2023-2025 = pilots. 2026 = orchestration, governance, and scale. Business leaders are no longer asking "does it work?" but "how do we make 50 agents work together safely?"

**Implication for Globant**: The market is ready to buy agentic transformation, not just experiments. Position as the enterprise agentic SI — not just an AI chatbot vendor.

---

## Trend 2: Orchestration Becomes the Core Competency
**Signal**: LangGraph accounts for 34% of agent-framework citations in production architecture docs at 1,000+ employee companies (Gartner Q1 2026). 34.5M monthly downloads.

**What changed**: Single-agent workflows → coordinated teams of specialized agents. Complex tasks exceed what any single context window can handle.

**Deployment reference**: Cisco, Uber, LinkedIn, BlackRock, JPMorgan all running LangGraph in production.

**Implication**: LangGraph expertise = the most defensible technical differentiator for an enterprise AI SI in 2026.

---

## Trend 3: MCP Becomes Enterprise Infrastructure
**Signal**: 9,652 MCP servers in official registry (May 2026). 97M monthly SDK downloads. 41% of software organizations in limited or broad production with MCP.

**What changed**: MCP crossed from developer curiosity to enterprise standard. Fortune 500 companies building internal MCP servers for ERP, CRM, databases. Linux Foundation governance = enterprise trust.

**Stack implication**: Every enterprise integration project should consider MCP-first. Twenty CRM's native MCP server is the model.

---

## Trend 4: A2A Protocol Enables Agent Federation
**Signal**: A2A v1.0 GA (early 2026). 150+ organizations in production. gRPC support, signed Agent Cards, multi-tenancy. Google/Anthropic/Microsoft/Salesforce all committed.

**What changed**: A2A solves the horizontal coordination problem (agent ↔ agent). MCP + A2A = the two-layer standard:
- MCP: agent ↔ tools/data (vertical integration)
- A2A: agent ↔ agent (horizontal coordination)

**Implication**: Enterprise agent platforms built on MCP+A2A are architecture-safe investments. Proprietary coordination protocols are dead ends.

---

## Trend 5: Browser-Use Unlocks Web Automation at Scale
**Signal**: browser-use hits 86k★ in under 12 months; Apache-2.0 license; fastest-growing agent tool H1 2026.

**What changed**: Legacy SaaS (SAP, Oracle, Workday) without APIs are now automatable. Enterprise "web scraping" rebrands as "agentic web automation" — same technique, legitimate enterprise use case.

**LATAM angle**: Many LATAM government portals (SUNAT, DIAN, Receita Federal) have clunky web UIs and no APIs. Browser-use enables compliance automation that was previously manual.

---

## Trend 6: OpenHands → Autonomous Code Modernization
**Signal**: $18.8M Series A. 76k★. 72.8% SWE-Bench Verified. 87% bug ticket resolution same-day.

**What changed**: AI coding agents moved from "autocomplete" (GitHub Copilot) to "autonomous engineer." OpenHands can navigate a codebase, write code, run tests, and open PRs without human in the loop.

**LATAM opportunity**: Banks and telcos in Brazil, Mexico, Argentina have enormous Java/.NET legacy codebases. OpenHands can run modernization at 3-5x the speed of human teams.

---

## Trend 7: No-Code Automation Absorbs AI (n8n 2.0)
**Signal**: n8n reaches 182k★, $2.5B valuation, n8n 2.0 enterprise with SSO + audit logging.

**What changed**: n8n is no longer just "Zapier open source." n8n 2.0 positions as the enterprise integration backbone with native AI agent nodes — the "pipes" of enterprise AI.

**Use case**: Every enterprise integration project (HR systems → Slack, CRM → email, ERP → reporting) can now include an AI decision node. n8n democratizes the connective tissue.

---

## Trend 8: Governance Becomes the Blocker (40% Cancellation Risk)
**Signal**: Gartner predicts 40%+ of agentic AI projects canceled by end of 2027 due to unclear ROI, governance failures, and cost overruns.

**What changed**: The early adopter phase is over. CFOs are demanding ROI proof. Compliance teams are asking about hallucination risk. CISO teams are worried about data leakage through agent tools.

**Implication for Globant**: Governance-as-a-feature is the differentiator. MLflow tracking + LangSmith observability + budget enforcement + RBAC = enterprise-grade agent deployment.

**Guardrails stack**: MLflow (model tracking) + Langfuse (trace observability) + Temporal (durable state) + OpenHands RBAC (agent permissions).

---

## Trend 9: LATAM — From Follower to Frontier
**Signal**: LATAM AI agents at 50.8% CAGR (fastest globally for enterprise agents). Brazil banking leads at 47% production rate (above global 31% average).

**What changed**: LATAM enterprises are not lagging in AI adoption — in specific verticals (banking, fintech, e-commerce), they are at or ahead of global averages.

**Country leaders**:
- Brazil: Banking AI (Itaú, Nubank, BTG), fintech agent automation
- Mexico: Retail AI (OXXO, Liverpool), government compliance agents
- Argentina: Fintech (Mercado Libre AI), startup ecosystem bootstrapping

---

## Trend 10: Small Models Win Enterprise (Cost Collapse)
**Signal**: Enterprise cost per agent query falling 70-90% YoY. Claude Haiku 4.5 at $0.0008/K tokens; Llama 3.3 on-prem at ~$0.0001/K tokens.

**What changed**: The model cost curve means 90% of enterprise agent tasks (classification, extraction, simple reasoning) don't need frontier models. Claude Haiku + Llama 3.3 routing covers most enterprise volume at 1/50th the cost of GPT-4-class models.

**Routing pattern emerging**:
```
Request → Router
  → Claude Haiku ($0.0008/K): routine queries, extraction, classification
  → Claude Sonnet 5 ($0.003/K): complex reasoning, synthesis
  → Claude Opus 4.8 ($0.015/K): legal review, high-stakes decisions
```

---

## Trend 11: Backstage as AI Platform Portal
**Signal**: 3,400+ companies on Backstage. Toyota $10M ROI. CNCF incubating. New AI model catalog and agent registry plugins viral on GitHub.

**What changed**: As enterprises accumulate 20-50 AI agents, the discoverability and governance problem emerges. Backstage becomes the "control plane UI" — catalog of models, agents, costs, owners.

**New pattern**: Platform Engineering teams building "AI platform portals" on Backstage as internal productization of GenAI investment.

---

## Trend 12: Autonomous Agents + Durable Execution (Temporal)
**Signal**: Temporal adds Multi-Region Replication, Nexus (cross-namespace agent calling), and 99.99% SLA. Agentic AI use cases dominate Temporal blog 2026.

**What changed**: Long-running agent tasks (multi-day procurement workflows, code modernization jobs, compliance audits) need durable state — not just retry logic, but true persistence across failures.

**Pattern**: Temporal wraps LangGraph as the "outer container" for enterprise agents that must run for hours or days.

---

## Q3 2026 Watch Signals

| Signal | ETA | Impact |
|--------|-----|--------|
| First Gartner MQ for Agentic Platforms | Q3 2026 | Defines vendor landscape for next 3 years |
| A2A + MCP joint spec | Q3 2026 | Eliminates protocol uncertainty |
| OpenHands Enterprise cloud GA | Q3 2026 | Enables autonomous coding as a managed service |
| Microsoft MAF 1.0 stable | Q3 2026 | Clarifies Microsoft enterprise agent stack |
| EU AI Act enterprise obligations enforcement | August 2026 | Governance requirements become real |
| LATAM enterprise AI agent spend crossing $1B | Q4 2026 | Market size unlock signal |

---
*See `intel/market.md` for market data. See `compose/patterns.md` for build recipes.*
