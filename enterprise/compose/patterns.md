# Composition Patterns — Enterprise AI

> Concrete recipes for building enterprise AI solutions. Each names specific repos, how to wire them, estimated effort, and Globant positioning.
> Last updated: 2026-07-11 (v3)

---

## P1 — Enterprise Knowledge Agent (RAGFlow + LangGraph + Langfuse)

**Use case**: Replace generic ChatGPT-style internal AI with a grounded, compliance-grade enterprise knowledge agent.

**Repos**:
- [infiniflow/ragflow](https://github.com/infiniflow/ragflow) — Apache-2.0 — Document ingestion, OCR, table extraction, citation tracking
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — MIT — Orchestration, state management, human-in-the-loop
- [langfuse/langfuse](https://github.com/langfuse/langfuse) — MIT — Tracing, evals, prompt management

**Architecture**:
```
Enterprise Documents (PDF, Excel, SharePoint, Confluence)
    ↓
RAGFlow ingest + deep OCR + vector index
    ↓
LangGraph agent: query → retrieve → reason → cite
    ↓
Langfuse: trace every query + eval quality monthly
    ↓
REST API → React/Next.js chat UI
```

**Key decision points**:
- RAGFlow handles multi-format ingestion; no custom parsing needed
- LangGraph checkpoint enables HITL for low-confidence answers
- Langfuse gives compliance team audit trail of every response + source

**Effort**: 6–8 weeks for PoC; 3–4 months for production with SSO + audit
**Cost anchor**: $0 infrastructure (self-hosted); Globant delivery cost

---

## P2 — Legacy System Integration Agent (n8n + CrewAI + Mem0)

**Use case**: Replace RPA bots or manual processes that span SAP/Salesforce/Jira with AI agents that can understand context and make decisions.

**Repos**:
- [n8n-io/n8n](https://github.com/n8n-io/n8n) — Fair-code — Integration layer; 400+ connectors to enterprise systems
- [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) — MIT — Multi-agent orchestration with roles
- [mem0ai/mem0](https://github.com/mem0ai/mem0) — Apache-2.0 — Cross-session memory for agent context

**Architecture**:
```
Trigger: Salesforce opportunity created / SAP invoice received / Jira ticket opened
    ↓
n8n webhook receives event
    ↓
n8n → CrewAI: route to specialist agent team
    ├── Sales Agent: reads CRM history via Mem0
    ├── Finance Agent: queries SAP via n8n connector
    └── Coordinator Agent: synthesizes and routes action
    ↓
n8n: write back to source systems
    ↓
Langfuse: audit all decisions
```

**Key decision points**:
- n8n handles credential management + system connections (not the agent)
- CrewAI roles map naturally to business roles (Sales, Finance, Ops)
- Mem0 remembers per-customer and per-case context across sessions
- n8n fair-code license: OK for internal use, needs enterprise for client-facing

**Effort**: 4–6 weeks PoC; 3 months production
**LATAM angle**: Replaces UiPath/Automation Anywhere for LATAM BPO at fraction of cost

---

## P3 — AI-Augmented ERP (Odoo/ERPNext + LangGraph + Dify)

**Use case**: Add an AI layer on top of an open-source ERP — intelligent procurement, demand forecasting, vendor selection, AR/AP automation.

**Repos**:
- [odoo/odoo](https://github.com/odoo/odoo) — LGPL-3 — ERP backbone (or ERPNext if GPL-3 acceptable)
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — MIT — Complex ERP workflow orchestration
- [langgenius/dify](https://github.com/langgenius/dify) — Apache-2.0 — Business-user AI workflow builder on top of ERP
- [langfuse/langfuse](https://github.com/langfuse/langfuse) — MIT — Decision audit trail

**Architecture**:
```
Odoo REST API (sales orders, inventory, vendor master)
    ↓
LangGraph agent: daily ERP reasoning loop
    ├── Demand forecaster (reads sales history)
    ├── Procurement agent (monitors inventory, suggests POs)
    ├── Vendor scorer (evaluates delivery performance)
    └── Approval orchestrator (HITL for POs > threshold)
    ↓
Dify: business-user chatbot ("Why did we order 500 units of X?")
    ↓
Odoo writes approved actions back via REST
    ↓
Langfuse: full audit trail + weekly eval report
```

**Key decision points**:
- Odoo LGPL-3 allows custom modules; Globant ships modules as product
- Apache OFBiz (Apache-2.0) if client prefers pure-Apache stack
- LangGraph handles the orchestration; Dify handles the business-user UX
- Langfuse evaluation catches forecast drift before it hurts the business

**Effort**: 8–12 weeks PoC; 6 months production with full ERP modules
**Revenue model**: Globant Odoo implementation + AI module subscription

---

## P4 — Compliant Multi-Agent System (MAF + Agent Governance Toolkit + Langfuse)

**Use case**: Build an enterprise AI agent system that can pass legal/compliance review and EU AI Act audit — required for financial services, healthcare-adjacent, and regulated industries.

**Repos**:
- [microsoft/agent-framework](https://github.com/microsoft/agent-framework) — MIT — Production orchestration (GA April 2026)
- [microsoft/agent-governance-toolkit](https://github.com/microsoft/agent-governance-toolkit) — MIT — Runtime policy enforcement, OWASP Agentic AI Top 10
- [langfuse/langfuse](https://github.com/langfuse/langfuse) — MIT — Observability, audit trail, evals

**Architecture**:
```
Enterprise Request (user or system trigger)
    ↓
Microsoft Agent Framework: orchestrate agent team
    ├── Agent 1: data retrieval (bounded tools)
    ├── Agent 2: analysis (read-only)
    └── Agent 3: action execution (gated by policy)
    ↓
Agent Governance Toolkit (per agent call):
    ├── Cedar policy: check permission to call tool
    ├── Identity: verify agent identity chain
    ├── Resource limits: cap tool invocations
    └── Audit log: immutable record of all actions
    ↓
Langfuse: trace + eval + compliance export (SOC2, GDPR)
```

**Key decision points**:
- MAF is MIT; ideal for .NET/Azure shops migrating from AutoGen/SK
- Governance Toolkit runs in-process; sub-millisecond policy check; no network hop
- Cedar policies are declarative and auditable — legal can review them
- EU AI Act August 2026 enforcement: this architecture passes high-risk AI requirements

**Effort**: 6–8 weeks governance-ready PoC; 4 months production
**Positioning**: "AI agents that your compliance team can actually approve"

---

## P5 — SME AI-Native ERP (NocoBase + AI Employee + Agno)

**Use case**: Deploy a full AI-native ERP+CRM for LATAM SMEs at dramatically lower cost than SAP/Odoo Enterprise — with AI that understands business context from day one.

**Repos**:
- [nocobase/nocobase](https://github.com/nocobase/nocobase) — AGPL-3 — AI-native no-code ERP/CRM
- [agno-agi/agno](https://github.com/agno-agi/agno) — Apache-2.0 — Lightweight agent layer for custom extensions

**Architecture**:
```
NocoBase: ERP core (customers, orders, inventory, approvals)
    ├── AI Employee: built-in
    │   ├── Reads business context (customer history, open orders)
    │   ├── Participates in approval workflows
    │   └── Generates follow-up records automatically
    └── Agno agents: domain extensions
        ├── Sales forecaster (pulls NocoBase data → LLM → forecast)
        ├── Collection agent (AR aging → outreach emails)
        └── Onboarding agent (new customer → auto-creates records)
    ↓
Self-hosted on Docker; Spanish/Portuguese LLM
```

**Key decision points**:
- NocoBase AGPL-3: Globant must offer as a service or resell under commercial license
- NocoBase AI employee handles common cases; Agno handles custom domain logic
- 50-person company: $8k/5yr vs $150k for Odoo Enterprise
- Spanish/Portuguese support: use Llama 3.1 or Claude for LATAM language

**Effort**: 3–4 weeks PoC (NocoBase fast to configure); 2 months customized production
**LATAM angle**: 99% of LATAM businesses are SMEs with no ERP — this is a greenfield market

---

## P6 — Agentic BPO Platform (n8n + LangGraph + RAGFlow)

**Use case**: Modernize a LATAM BPO operation — replace human workers on structured processes (data entry, invoice processing, customer classification) with supervised AI agents.

**Repos**:
- [n8n-io/n8n](https://github.com/n8n-io/n8n) — Fair-code — Integration with client systems; trigger management
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — MIT — Agent orchestration with HITL for exceptions
- [infiniflow/ragflow](https://github.com/infiniflow/ragflow) — Apache-2.0 — Document understanding (invoices, contracts, forms)
- [langfuse/langfuse](https://github.com/langfuse/langfuse) — MIT — SLA monitoring; agent quality metrics

**Architecture**:
```
Client Systems (email, FTP, SharePoint, portal)
    ↓
n8n: receive documents → normalize → route by type
    ↓
RAGFlow: extract structured data from documents
    ├── Invoice: vendor, amount, line items, PO matching
    ├── Contract: parties, dates, obligations
    └── Form: field extraction + validation
    ↓
LangGraph: decision workflow
    ├── Confidence high → auto-process + log
    ├── Confidence medium → flag for QA
    └── Confidence low → human review queue (HITL)
    ↓
n8n: write to client ERP/CRM
Langfuse: throughput, accuracy, SLA dashboard
```

**Metrics to track** (from day 1 with Langfuse):
- Straight-through processing rate (target: 70%+)
- Human escalation rate (target: <15%)
- Extraction accuracy (target: >98%)
- Processing time per document

**Effort**: 6–8 weeks PoC; 3–4 months production BPO platform
**Positioning**: "Agentic BPO — faster than RPA, cheaper than headcount"

---

## P7 — Enterprise AI Gateway (Dify + Langfuse + Mem0)

**Use case**: Centralize all enterprise AI access through one governed gateway — manage models, costs, usage policies, and user-specific context across the organization.

**Repos**:
- [langgenius/dify](https://github.com/langgenius/dify) — Apache-2.0 — AI gateway + workflow builder + admin portal
- [langfuse/langfuse](https://github.com/langfuse/langfuse) — MIT — Usage tracking, cost attribution, quality evals
- [mem0ai/mem0](https://github.com/mem0ai/mem0) — Apache-2.0 — Per-user memory across all enterprise AI tools

**Architecture**:
```
Enterprise Users (all departments)
    ↓ SSO (SAML/OIDC)
Dify: AI portal
    ├── Pre-built apps by department (HR, Finance, Legal, Sales)
    ├── Model router (Claude for complex, smaller for routine)
    ├── Rate limits per team/budget
    └── Prompt library (compliance-approved prompts)
    ↓
Mem0: per-user context (role, preferences, history)
    ↓
LLM APIs (Anthropic, Azure OpenAI, Ollama for on-prem)
    ↓
Langfuse: token usage by department, cost attribution, quality scores
```

**Key decision points**:
- Dify admin portal allows non-technical deployment of AI apps
- Mem0 means users don't re-explain their context every session
- Langfuse cost attribution enables chargeback to business units
- MLflow (Apache-2.0) as alternative for model-centric organizations

**Effort**: 4–6 weeks MVP; runs continuously as enterprise AI platform
**Revenue model**: Platform delivery + ongoing management as managed service

---
*Auto-updated by ingest pipeline — v3 2026-07-11*
