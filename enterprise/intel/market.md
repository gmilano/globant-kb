# 🗺️ Market Map — Enterprise AI

> Key players, market sizing, and Globant positioning.
> Last updated: 2026-07-13 (v4)

## Market Size & Growth

| Metric | Value | Source |
|--------|-------|--------|
| Global AI Agents Market (2026) | $10.9–12.06B | IDC / Gartner |
| CAGR through 2030 | 44–46% | Multiple analysts |
| Enterprise apps with AI agents by EOY 2026 | 40% (up from <5% in 2025) | Gartner |
| McKinsey AI value potential (annual) | $2.6–4.4T | McKinsey Global Institute |
| Average enterprise AI agent ROI | 171% (US: 192%) | OneReach.ai / Accelirate survey |
| Enterprises scaling agentic AI to production | 23% | McKinsey (39% experimenting) |
| Gartner 2035 projection | $450B+ (30% of enterprise app SW revenue) | Gartner |

## Competitive Landscape

### Closed-Source / Proprietary Platforms

| Vendor | Product | Strength | Weakness vs. OSS |
|--------|---------|----------|------------------|
| **Salesforce** | Agentforce | Deep CRM ecosystem; 1K+ enterprise deals closed | $75/user/mo agent tax; vendor lock-in |
| **ServiceNow** | Now Assist AI | Deep ITSM integration; compliance baked in | $100k+ entry; hard to customize |
| **Microsoft** | Copilot 365 + MAF | Office 365 ecosystem; Teams integration | Expensive; MAF is open but Azure-bound |
| **SAP** | Joule AI | Deep ERP data access | SAP-only; very expensive; slow releases |
| **UiPath** | Agentic Automation | Enterprise RPA heritage; governance | Not truly agentic; process-bound |
| **Google** | Agentspace | 1M token context; Workspace integration | Cloud-only; data privacy concerns |

### Open Source Leaders

| Project | Backer | License | Enterprise Adoption |
|---------|--------|---------|---------------------|
| LangGraph | LangChain Inc. | MIT | De facto standard for stateful enterprise agents |
| AutoGen / MAF | Microsoft Research | MIT | Standard for Azure enterprise shops |
| CrewAI | CrewAI Inc. | MIT | 1,500+ orgs; 60%+ Fortune 500 |
| n8n | n8n GmbH | Apache-2.0 | 182k stars; leading self-hosted automation |
| Dify | LangGenius | Apache-2.0 | 100k+ deployments globally |
| Odoo | Odoo SA | LGPL | 12M+ users worldwide |

## Key Players by Category

### Enterprise Agent Frameworks
- **Microsoft** (AutoGen → MAF, Semantic Kernel)
- **LangChain** (LangGraph, LangSmith)
- **CrewAI** (role-based multi-agent)
- **Google DeepMind** (Gemini CLI, Apache-2.0)

### Enterprise Platforms (AI-Ready)
- **Odoo** (ERP — 12M users, LGPL)
- **Frappe/ERPNext** (ERP — developer-friendly, MIT/GPL)
- **Twenty** (CRM — fast-growing, AGPL)
- **Mattermost** (Collab — self-hosted Slack, AGPL)
- **Superset / Metabase** (BI — analytics, Apache/AGPL)

### Observability & Ops
- **LangSmith** (LangChain; closed)
- **Arize AI** (closed)
- **OpenTelemetry** (open standard — built into MAF)

## LATAM Opportunity Map

| Country | Primary Verticals | Enterprise AI Opportunity | Key Consideration |
|---------|-------------------|--------------------------|-------------------|
| **Brazil** | Banking, Retail, Telecom | Digital banking transformation; Pix-powered fintech agents; retail personalization at scale | LGPD data residency requirements → self-hosted solutions preferred |
| **Mexico** | Manufacturing, Nearshoring, Retail | Supply chain AI for US-Mexico nearshoring boom; predictive maintenance; field service agents | IMMEX manufacturing data sensitivity |
| **Colombia** | Public sector, Healthcare | Government digitization push; hospital management AI | GDPR-equivalent coming 2027 |
| **Argentina** | Software export, FinTech | Enterprise AI product development services; inflation hedging via crypto/AI treasury tools | USD billing preferred; talent arbitrage |
| **Chile** | Mining, Finance, Energy | Predictive operations in copper mining; wealth management AI agents | High digital maturity; open to cloud |

## Globant Positioning

### Competitive Differentiation
1. **"Open-First" enterprise AI** — avoid vendor lock-in by building on MIT/Apache OSS (LangGraph + CrewAI + n8n + Frappe/ERPNext) vs. Salesforce Agentforce or SAP Joule
2. **LATAM-aware AI** — data residency, LGPD/data-protection compliance, Spanish/Portuguese language agents, LATAM business process expertise
3. **AI-on-existing-systems** — augment client's existing ERP/CRM (Odoo, SAP, Salesforce) with agentic AI layer; don't replace, extend
4. **Regulated industry expertise** — HITL compliance patterns (LangGraph checkpointing), audit trails (OpenTelemetry), PII handling

### Go-to-Market Plays
- **Play 1 — Enterprise AI Audit**: 4-week engagement mapping all manual workflows → AI automation ROI analysis (use McKinsey $2.6-4.4T / Gartner 171% ROI stat)
- **Play 2 — Agentic ERP**: Build AI agent layer on Odoo or ERPNext for mid-market clients; 3-4 months to production
- **Play 3 — Copilot Replacement**: Self-hosted LLM + n8n + LangGraph alternative to Microsoft Copilot 365; pitch to data-sensitive enterprises
- **Play 4 — MAF Integration**: For Azure-native enterprises, position as Microsoft Agent Framework implementation partner
