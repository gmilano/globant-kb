# Market Intelligence — Enterprise AI

> Key players, market sizing, and competitive landscape for enterprise AI agents. Updated 2026-07-12 (v4).

## Market Size & Growth

| Metric | Value | Source |
|--------|-------|--------|
| Agentic AI enterprise market (2026) | $9.14B standalone; $201.9B including embedded | Fortune Business Insights / Gartner |
| Agentic AI market by 2034 | $139.19B, CAGR 40.50% | Fortune Business Insights 2026 |
| CAGR (agentic AI, 2026–2030) | 44–46% | Multiple analysts |
| AI agents embedded in enterprise apps by end 2026 | 40% of apps (up from <5% in 2025) | Gartner |
| Organizations with AI agents in production | 79% experimenting; 57% in production (Accelirate 2026) | Accelirate / Joget survey |
| Organizations that have scaled agentic AI | 23% truly scaled (McKinsey) vs 57% any production | McKinsey 2026 |
| Average enterprise agentic AI ROI | 171% (US: 192%) — 3× traditional automation | Industry survey 2026 |
| Enterprise AI budget growth intention | 88% of executives plan to increase AI budgets due to agentic AI | Joget survey 2026 |
| Agentic AI projects canceled by 2027 | 40%+ (Gartner prediction) | Gartner 2026 |
| Shadow AI prevalence | 82% of enterprises have AI agents security teams didn't know existed | Cloud Security Alliance 2026 |
| Anthropic enterprise LLM spend share | 40% (up from 12% two years ago) | Industry tracking 2026 |
| OpenAI enterprise LLM spend share | ~25% (down from ~50%) | Industry tracking 2026 |
| Open-source ERP market (2026) | $5.31B, CAGR 9.66% through 2031 | Market research 2026 |
| McKinsey AI annual value potential | $2.6–4.4 trillion across business use cases | McKinsey Global Institute |
| Customer service agent ROI | 40+ hours saved monthly per team | Beam AI survey 2026 |
| Finance/ops automation | 30-50% acceleration in close processes | Beam AI survey 2026 |

## Key Enterprise AI Players

### Hyperscalers

| Player | Enterprise AI Offering | Open Source Strategy |
|--------|----------------------|---------------------|
| **Microsoft** | Azure AI, Copilot, Agent Framework (GA Apr 2026) | MIT: AutoGen → Agent Framework; MIT: Semantic Kernel; MIT: Agent Governance Toolkit |
| **Google** | Gemini for Workspace, Vertex AI Agent Builder, Gemini Enterprise Agent Platform | Apache-2.0: ADK (Python/TS/Go/Java/Kotlin); July 7 2026 latest release |
| **AWS** | Amazon Q, Bedrock Agents, Bedrock AgentCore Runtime | Apache-2.0: Strands Agents; 16.7M downloads/month; used for Amazon Q Developer in production |
| **Anthropic** | Claude for Enterprise, Claude API — 40% enterprise LLM spend share | MCP open protocol; Partners with n8n, Dify, CrewAI, Strands Agents |
| **OpenAI** | ChatGPT Enterprise, Assistants API, Agents SDK — down to ~25% share | Apache-2.0: OpenAI Agents SDK; Codex CLI |

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
| LangChain AI | LangGraph + LangChain | 34.5k / ~96k | MIT | LangSmith cloud SaaS; 34.5M library downloads/month |
| CrewAI Inc | CrewAI | ~54.2k | MIT | CrewAI+ enterprise; 5.2M downloads/month |
| n8n GmbH | n8n | ~189k | Fair-code | n8n Cloud + Enterprise |
| LangGenius | Dify | ~148k | Apache-2.0 | Dify Cloud + Enterprise |
| InfiniFlow | RAGFlow | ~73k | Apache-2.0 | Cloud + enterprise support |
| AWS (open source) | Strands Agents | 6.1k SDK | Apache-2.0 | AWS Bedrock AgentCore (managed) |
| Google (open source) | ADK | ~10k+ | Apache-2.0 | Vertex AI + Gemini Enterprise Agent Platform |
| Odoo SA | Odoo | ~49.1k | LGPL-3 | Odoo Enterprise subscription; €7B valuation Jan 2026 |
| Frappe | ERPNext + Frappe | 31.9k / 10.4k | GPL-3/MIT | Frappe Cloud + paid apps |
| NocoBase | NocoBase | ~21.6k | AGPL-3 | Commercial license |
| Langfuse | Langfuse | ~9k | MIT (OSS) | Langfuse Cloud (ClickHouse); joined ClickHouse Jan 2026 |

## Protocol Stack: A2A + MCP

The industry converged on two complementary protocols in 2026:

| Protocol | Direction | Status | Adoption |
|----------|-----------|--------|----------|
| **MCP** (Model Context Protocol) | Vertical: agent ↔ tool | Standard | 10,000+ enterprise servers; 97M+ SDK downloads; supported by all major agent frameworks |
| **A2A** (Agent-to-Agent) | Horizontal: agent ↔ agent | Production | 150+ orgs in production (Apr 2026); embedded in AWS Bedrock AgentCore, Azure AI Foundry, Google Cloud |

Architecture pattern: **MCP for tool access within each agent + A2A for delegation between agents**. A LangGraph orchestrator can delegate to a Vertex AI agent via A2A, which then calls ERPNext via MCP — no custom integration code.

## LATAM Opportunity Map

| Opportunity | Market Context | Globant Angle |
|-------------|---------------|---------------|
| **ERPNext / Odoo migration from SAP** | SAP pricing driving LATAM enterprises to open source | Implement + AI-augment with LangGraph/Dify on top |
| **AI CRM for financial services** | LATAM banks + fintechs building AI customer agents | SuiteCRM/Twenty + CrewAI + RAGFlow stack |
| **Agentic process automation** | BPO market in LATAM replacing RPA with agents | n8n + LangGraph replacing legacy UiPath/Automation Anywhere |
| **Multilingual enterprise agents (Spanish/Portuguese)** | Enterprise AI needs native LATAM language support | Dify/LangGraph + multilingual LLMs (Llama, Claude) |
| **EU AI Act compliance for EU-linked enterprises** | LGPD (Brazil) + EU AI Act affecting multinationals | Agent Governance Toolkit + Langfuse audit trails |
| **SME ERP adoption** | 99% of LATAM businesses are SMEs; most lack ERP | NocoBase + AI employee at 10% of SAP cost |
| **Shadow AI governance** | 82% of enterprises globally have undiscovered agents | Globant AI governance audit as an entry offer |

## Competitive Dynamics

### Open Source vs. Closed Enterprise AI (2026)

```
Proprietary AI (Salesforce Agentforce, Microsoft Copilot):
  ✓ Integrated into existing enterprise SaaS
  ✗ High cost, vendor lock-in, limited customization

Open Source AI (LangGraph, CrewAI, Dify, n8n, Strands, ADK):
  ✓ Full control, customization, self-hosted, no per-seat fees
  ✓ MIT/Apache-2.0 = Globant can resell custom solutions
  ✓ Hyperscaler-backed options (Strands=AWS, ADK=Google, MAF=Microsoft)
  ✗ Integration effort; need specialized talent (= Globant opportunity)
```

### The "Open Source ERP Gets Second Look" Trend
From ERP Today (2026): Open-source ERP providers getting a second look as AI changes the ERP shortlist. Enterprises realize that:
- Closed ERPs (SAP, Oracle) have AI features locked behind expensive licenses
- Open-source ERPs (Odoo, ERPNext, NocoBase) can be AI-augmented with full control
- NocoBase at $8k/5yr vs Odoo at $150k for 50-person team
- Odoo valued at €7B (General Atlantic follow-on, Jan 2026)

### The 40% Cancellation Risk (Gartner)
Gartner predicts 40%+ of agentic AI projects will be canceled by 2027 due to:
1. Workflow redesign challenges (agents layered onto old processes, not redesigned)
2. Inadequate metrics frameworks
3. Security and compliance concerns
4. RAG quality failures (60-70% of agent performance = retrieval quality)

**Globant positioning**: Design-first, governance-first approach. Use Agent Governance Toolkit from day one. Measure RAG quality with Langfuse before scaling.

---
*Auto-updated by ingest pipeline — v4 2026-07-12*
