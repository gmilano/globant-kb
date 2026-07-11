# Market Intelligence — Enterprise AI

> Key players, market sizing, and competitive landscape for enterprise AI agents. Updated 2026-07-11 (v3).

## Market Size & Growth

| Metric | Value | Source |
|--------|-------|--------|
| Agentic AI enterprise market (2026) | $9–12B standalone; $201.9B including embedded | Tech-Insider / Gartner |
| CAGR (agentic AI, 2026–2030) | 44–46% | Multiple analysts |
| AI agents embedded in enterprise apps by end 2026 | 40% of apps (up from <5% in 2025) | Gartner Aug 2025 |
| Organizations with AI agents in production | 57% | Accelirate 2026 |
| Organizations that have scaled agentic AI | 23% (McKinsey) vs 57% in any production | McKinsey 2026 |
| Average enterprise agentic AI ROI | 171% (US: 192%) — 3× traditional automation | Industry survey 2026 |
| Agentic AI projects canceled by 2027 | 40%+ (Gartner prediction) | Gartner 2026 |
| Open-source ERP market (2026) | $5.31B, CAGR 9.66% through 2031 | Market research 2026 |
| McKinsey AI annual value potential | $2.6–4.4 trillion across business use cases | McKinsey Global Institute |
| Gartner AI app software revenue (2035) | ~30% agentic, $450B+ | Gartner best-case |

## Key Enterprise AI Players

### Hyperscalers

| Player | Enterprise AI Offering | Open Source Strategy |
|--------|----------------------|---------------------|
| **Microsoft** | Azure AI, Copilot, Agent Framework (GA Apr 2026) | MIT: AutoGen → Agent Framework; MIT: Semantic Kernel; MIT: Agent Governance Toolkit |
| **Google** | Gemini for Workspace, Vertex AI Agent Builder, ADK | Apache-2.0: ADK; LangChain ecosystem support |
| **AWS** | Amazon Q, Bedrock Agents | Apache-2.0: various; Strands Agents framework |
| **Anthropic** | Claude for Enterprise, Claude API | MCP open protocol; Partners with n8n, Dify, CrewAI |
| **OpenAI** | ChatGPT Enterprise, Assistants API, Agents SDK | Apache-2.0: OpenAI Agents SDK; Codex CLI |

### Enterprise Software Incumbents

| Player | AI Strategy | Open Source Status |
|--------|------------|-------------------|
| **SAP** | Joule (AI copilot in BTP); AI SDK for SAP AI Core | Limited open source; API-first for partner AI |
| **Salesforce** | Agentforce (AI agents for CRM); Einstein | Closed; partner ecosystem with LangChain/LangGraph |
| **ServiceNow** | AI Agents for ITSM; Now Assist | Closed; REST APIs for AI integration |
| **Workday** | AI features in HCM/Finance | Closed; ML models embedded |
| **Oracle** | Oracle AI: Fusion apps AI | Closed; OCI AI services |

### Open Source Platform Leaders (Globant-relevant)

| Player | Product | Stars | License | Revenue Model |
|--------|---------|-------|---------|---------------|
| LangChain AI | LangGraph + LangChain | 34.5k / ~96k | MIT | LangSmith cloud SaaS |
| CrewAI Inc | CrewAI | ~54.2k | MIT | CrewAI+ enterprise |
| n8n GmbH | n8n | ~189k | Fair-code | n8n Cloud + Enterprise |
| LangGenius | Dify | ~148k | Apache-2.0 | Dify Cloud + Enterprise |
| InfiniFlow | RAGFlow | ~73k | Apache-2.0 | Cloud + enterprise support |
| Odoo SA | Odoo | ~49.1k | LGPL-3 | Odoo Enterprise subscription |
| Frappe | ERPNext + Frappe | 31.9k / 10.4k | GPL-3/MIT | Frappe Cloud + paid apps |
| NocoBase | NocoBase | ~21.6k | AGPL-3 | Commercial license |
| Langfuse | Langfuse | ~9k | MIT (OSS) | Langfuse Cloud (ClickHouse) |

## LATAM Opportunity Map

| Opportunity | Market Context | Globant Angle |
|-------------|---------------|---------------|
| **ERPNext / Odoo migration from SAP** | SAP pricing driving LATAM enterprises to open source | Implement + AI-augment with LangGraph/Dify on top |
| **AI CRM for financial services** | LATAM banks + fintechs building AI customer agents | SuiteCRM/Twenty + CrewAI + RAGFlow stack |
| **Agentic process automation** | BPO market in LATAM replacing RPA with agents | n8n + LangGraph replacing legacy UiPath/Automation Anywhere |
| **Multilingual enterprise agents (Spanish/Portuguese)** | Enterprise AI needs native LATAM language support | Dify/LangGraph + multilingual LLMs (Llama, Claude) |
| **Compliance-grade AI for regulated industries** | LGPD (Brazil), data privacy laws tightening | Agent Governance Toolkit + Langfuse audit trails |
| **SME ERP adoption** | 99% of LATAM businesses are SMEs; most lack ERP | NocoBase + AI employee at 10% of SAP cost |

## Competitive Dynamics

### Open Source vs. Closed Enterprise AI (2026)

```
Proprietary AI (Salesforce Agentforce, Microsoft Copilot):
  ✓ Integrated into existing enterprise SaaS
  ✗ High cost, vendor lock-in, limited customization

Open Source AI (LangGraph, CrewAI, Dify, n8n):
  ✓ Full control, customization, self-hosted, no per-seat fees
  ✓ MIT/Apache-2.0 = Globant can resell custom solutions
  ✗ Integration effort; need specialized talent (= Globant opportunity)
```

### The "Open Source ERP Gets Second Look" Trend
From ERP Today (2026): Open-source ERP providers getting a second look as AI changes the ERP shortlist. Enterprises realize that:
- Closed ERPs (SAP, Oracle) have AI features locked behind expensive licenses
- Open-source ERPs (Odoo, ERPNext, NocoBase) can be AI-augmented with full control
- NocoBase at $8k/5yr vs Odoo at $150k for 50-person team

### The 40% Cancellation Risk (Gartner)
Gartner predicts 40%+ of agentic AI projects will be canceled by 2027 due to:
1. Workflow redesign challenges (agents layered onto old processes, not redesigned)
2. Inadequate metrics frameworks
3. Security and compliance concerns
4. RAG quality failures (60-70% of agent performance = retrieval quality)

**Globant positioning**: Design-first, governance-first approach. Use Agent Governance Toolkit from day one. Measure RAG quality with Langfuse before scaling.

---
*Auto-updated by ingest pipeline — v3 2026-07-11*
