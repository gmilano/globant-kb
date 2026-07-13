# Composition Patterns — Enterprise AI

> Concrete recipes for building enterprise AI solutions. Each names specific repos, how to wire them, estimated effort, and Globant positioning.
> Last updated: 2026-07-13 (v6)

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

**Effort**: 8–12 weeks PoC; 6 months production with full ERP modules
**Revenue model**: Globant Odoo implementation + AI module subscription

---

## P4 — Compliant Multi-Agent System (MAF + Agent Governance Toolkit + Langfuse)

**Use case**: Build an enterprise AI agent system that can pass legal/compliance review and EU AI Act audit — required for financial services, healthcare-adjacent, and regulated industries.

**URGENT**: EU AI Act high-risk enforcement begins **August 2, 2026** (21 days away).

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
- EU AI Act August 2 2026 enforcement: this architecture passes high-risk AI requirements
- **NEW**: Applicable to shadow AI discovery — use to bring undocumented agents into compliance

**Effort**: 6–8 weeks governance-ready PoC; 4 months production
**Positioning**: "AI agents that your compliance team can actually approve"

---

## P5 — SME AI-Native ERP (NocoBase + AI Employee + Agno)

**Use case**: Deploy a full AI-native ERP+CRM for LATAM SMEs at dramatically lower cost than SAP/Odoo Enterprise — with AI that understands business context from day one.

**Repos**:
- [nocobase/nocobase](https://github.com/nocobase/nocobase) — AGPL-3 — AI-native no-code ERP/CRM
- [agno-agi/agno](https://github.com/agno-agi/agno) — MIT — AgentOS; lightweight agent layer for custom extensions

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
- 50-person company: $8k/5yr vs $150k for Odoo Enterprise
- Spanish/Portuguese support: use Claude or Llama 3.x for LATAM language

**Effort**: 3–4 weeks PoC; 2 months customized production
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
LLM APIs (Anthropic Claude, Azure OpenAI, Ollama for on-prem)
    ↓
Langfuse: token usage by department, cost attribution, quality scores
```

**Effort**: 4–6 weeks MVP; runs continuously as enterprise AI platform
**Revenue model**: Platform delivery + ongoing management as managed service

---

## P8 — AWS-Native Agent Platform (Strands Agents + Bedrock AgentCore + Langfuse)

**Use case**: Build an enterprise AI agent platform for clients running on AWS — leverage the same framework AWS uses in production for Amazon Q Developer and AWS Glue.

**Repos**:
- [strands-agents/harness-sdk](https://github.com/strands-agents/harness-sdk) — Apache-2.0 — Agent SDK (Python + TypeScript harness); model-driven; 16.7M downloads/month
- [langfuse/langfuse](https://github.com/langfuse/langfuse) — MIT — Observability (Strands emits OTEL; Langfuse ingests OTEL)

**Architecture**:
```
AWS Enterprise Account
    ↓
Strands Agents SDK (Python/TypeScript)
    ├── Agent 1: data retrieval via Bedrock Knowledge Bases
    ├── Agent 2: reasoning via Claude Sonnet (Bedrock)
    └── Agent 3: action via Lambda functions
    ↓
AWS Bedrock AgentCore Runtime
    ├── Managed execution (Lambda/Fargate/EKS)
    ├── IAM-native authentication (no API key management)
    ├── VPC-isolated deployment
    └── CloudWatch → OpenTelemetry → Langfuse
    ↓
Langfuse: trace all agent calls + eval quality
```

**Key decision points**:
- Strands Agents: Apache-2.0, AWS-backed, Accenture/PwC contributors — enterprise GSI credibility
- Bedrock AgentCore: managed runtime; no container ops; IAM-native; $0 infra mgmt overhead
- Claude on Bedrock: 40% enterprise LLM market share; compliance-friendly; long context
- OTEL built into Strands → Langfuse collects traces without custom instrumentation

**Effort**: 3–4 weeks PoC on AWS; 2–3 months production with IAM + audit
**Cloud angle**: Ideal entry for clients already on AWS with Bedrock enabled

---

## P9 — Shadow AI Governance Audit (Agent Governance Toolkit + Langfuse + n8n)

**Use case**: Globant enters an enterprise where 82% of the time there are undiscovered AI agents. Map, classify, and govern them before the EU AI Act August 2 deadline.

**Repos**:
- [microsoft/agent-governance-toolkit](https://github.com/microsoft/agent-governance-toolkit) — MIT — Policy enforcement; OWASP Agentic AI Top 10
- [langfuse/langfuse](https://github.com/langfuse/langfuse) — MIT — Observability; unified trace collection
- [n8n-io/n8n](https://github.com/n8n-io/n8n) — Fair-code — Discovery automation; connects to cloud APIs for agent inventory

**Architecture**:
```
Phase 1: Discovery (Week 1-2)
    n8n: scan cloud accounts (AWS/Azure/GCP) for AI service usage
    n8n: query Slack/Teams for bot integrations
    n8n: pull API gateway logs for LLM API calls
    → Shadow AI inventory spreadsheet

Phase 2: Classification (Week 3)
    For each discovered agent:
    ├── Domain? (HR, Finance, Healthcare, Legal) → EU AI Act risk tier
    ├── Data accessed? (PII, financial, health) → GDPR scope
    └── Actions taken? (read-only vs write) → autonomy level

Phase 3: Governance Retrofit (Week 4-8)
    Agent Governance Toolkit: add Cedar policies to all high-risk agents
    Langfuse: instrument all agents with OTEL traces
    n8n: automated weekly compliance reports
    → Compliance dossier for EU AI Act audit
```

**Deliverables**:
- Shadow AI inventory + risk classification
- Policy-as-code (Cedar) for all high-risk agents
- Unified observability dashboard (Langfuse)
- EU AI Act readiness assessment

**Effort**: 2 weeks discovery + classification; 4–6 weeks governance retrofit
**POSITIONING**: EU AI Act GPAI/Article 50 enforcement August 2, 2026. Annex III high-risk compliance deadline December 2, 2027 (Digital Omnibus extension). Still a board-level offer — the extension is for preparation, not delay.

---

## P10 — MCP EMA SSO Enterprise Integration (MCP EMA + Okta/Azure AD + Any Agent Framework)

**Use case**: Wire an enterprise's existing identity provider (IdP) to MCP server authorization, so agents automatically get the same RBAC permissions as the human user — no per-agent API key management.

**Repos**:
- MCP EMA (stable July 2026) — built into any MCP-compliant server (Asana, Atlassian, Figma, Supabase, Linear, or custom)
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — MIT — Agent orchestration
- [microsoft/agent-governance-toolkit](https://github.com/microsoft/agent-governance-toolkit) — MIT — Policy enforcement layer

**Architecture**:
```
Enterprise IdP (Okta / Azure AD / Auth0)
    ↓ MCP EMA (Enterprise-Managed Authorisation — stable Jul 2026)
MCP Servers (one per enterprise system)
    ├── Asana MCP → project tasks
    ├── Atlassian MCP → Jira + Confluence
    ├── Custom ERPNext MCP → ERP data
    ├── Salesforce MCP → CRM
    └── SAP OData → MCP proxy → SAP
    ↓
LangGraph Agent (or any MCP-compatible framework)
    ├── Calls tools through MCP; inherits user's IdP permissions automatically
    ├── No per-agent API keys; no credential rotation burden
    └── Actions are logged to IdP audit log + Langfuse traces
    ↓
Agent Governance Toolkit: Cedar policies enforce what agents can do beyond IdP role
```

**Key decision points**:
- MCP EMA is now stable (July 2026) — safe to build on
- Enterprises with Okta/Azure AD don't need new permission systems — MCP EMA reuses existing RBAC
- Pattern works for any MCP-compatible agent framework (LangGraph, CrewAI, MAF, ADK, Strands)
- Gartner: 75% of API gateway vendors will support MCP in 2026 — integration surface expanding rapidly

**Effort**: 2–3 weeks PoC (if enterprise already has SSO + target systems with MCP servers); 6–8 weeks production with governance layer
**Positioning**: "Enterprise AI with zero new credential management" — reuses existing security infrastructure

---

## P11 — Sovereign AI Collaboration Hub (Mattermost Agents V2 + Nextcloud + LangGraph + Ollama)

**Use case**: Build a fully sovereign (no external cloud, no API data leakage) enterprise AI collaboration environment for EU-regulated or defense-sector clients — runs on-premises with local LLMs.

**Repos**:
- [mattermost/mattermost-plugin-agents](https://github.com/mattermost/mattermost-plugin-agents) — Apache-2.0 — Agents V2: multi-AI per channel, HITL, sovereign AI
- [nextcloud/assistant](https://github.com/nextcloud/assistant) — AGPL-3.0 — File/calendar/email AI assistant; MCP support; voice
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — MIT — Agent orchestration with HITL checkpoints
- [Ollama](https://ollama.com) — MIT — Local LLM inference (Llama 3.3, Mistral, Qwen); no data leaves infra

**Architecture**:
```
On-premises data center / private cloud (EU sovereign)
    │
    ├── Ollama: local LLM serving (Llama 3.3 / Mistral / Qwen 2.5)
    │       └── 0 data leaves infra
    │
    ├── Nextcloud: file/calendar/email management
    │   ├── Nextcloud Assistant (AI agent): reads files, creates events, sends email
    │   └── MCP server: bridges external AI agents to Nextcloud data
    │
    ├── Mattermost Agents V2: team collaboration
    │   ├── AI assistant per channel (HR channel → HR agent; Legal → Legal agent)
    │   ├── Agents propose tool calls; humans approve before execution
    │   └── Summarizes threads, extracts action items, routes decisions
    │
    └── LangGraph: orchestrates cross-system workflows
        ├── HR request → Nextcloud EDMS → approval workflow → Mattermost notification
        └── All via Ollama; OTEL traces → Langfuse (self-hosted)
```

**Key decision points**:
- BYOM (Bring Your Own Model): this architecture makes enterprise-managed local LLMs the standard, not a workaround
- Mattermost: Apache-2.0 core — fully Globant-buildable; no fair-code restrictions
- Nextcloud: AGPL-3.0 — self-hosted deployment avoids copyleft distribution issues
- EU AI Act GPAI: no foundation model provider exposure — Ollama runs open-weight models
- This architecture responds directly to the 2026 BYOM security challenge: governed local AI beats ungoverned personal Ollama instances

**Effort**: 4–6 weeks PoC; 3–4 months production deployment with SSO + HITL policies
**Ideal clients**: EU public sector, defense/intelligence adjacent, highly regulated industries (banking, healthcare, energy)
**LATAM angle**: LGPD compliance + data residency requirements make this compelling for Brazilian regulated enterprises

---

## P12 — TypeScript-First Agent Platform (Mastra + n8n + Langfuse)

**Use case**: Enterprise with a TypeScript/Node.js engineering culture (fintech, e-commerce, SaaS) that wants to build production AI agents without switching to Python for the AI layer.

**Repos**:
- [mastra-ai/mastra](https://github.com/mastra-ai/mastra) — Apache-2.0 — TypeScript agent framework v1.0; graph workflows, memory, MCP, OTEL
- [n8n-io/n8n](https://github.com/n8n-io/n8n) — Fair-code — Trigger layer and legacy system integration (500+ connectors)
- [langfuse/langfuse](https://github.com/langfuse/langfuse) — MIT — Observability (Mastra emits OTEL; Langfuse ingests OTEL natively)

**Architecture**:
```
Enterprise Event (Salesforce webhook / cron / Slack command)
    ↓
n8n: receive trigger → normalize payload → call Mastra HTTP endpoint
    ↓
Mastra Agent (TypeScript):
    ├── Graph workflow: steps in typed .then()/.branch()/.parallel() chains
    ├── Memory: per-user / per-session context via Mastra Memory API
    ├── MCP client: calls enterprise systems (Jira MCP, ERPNext MCP, Atlassian MCP)
    └── EMA: MCP EMA enforces user IdP RBAC on each tool call
    ↓
Langfuse: trace every agent call; token cost attribution; eval quality scores
    ↓
n8n: write back to source systems + notify Slack/Teams
```

**Key decision points**:
- Mastra v1.0 GA: stable API; `.then()/.branch()/.parallel()` workflow DSL mirrors LangGraph patterns in TS
- Same SaaS pattern Replit, PayPal, and Plaid use in production
- Enterprise License needed for RBAC/SSO in client-facing production (confirm with Mastra sales)
- n8n fair-code: check license if the automation runs client-facing

**Effort**: 3–4 weeks PoC; 2–3 months production with MCP EMA + governance
**Ideal for**: TypeScript teams; LATAM SaaS and fintech companies already on Node.js; React/Next.js shops extending into AI

---

## P13 — Agentic Procurement with AP2 Autonomous Payments (A2A + AP2 + LangGraph + Odoo)

**Use case**: Procurement agent that autonomously identifies the best vendor, negotiates or selects a price, creates a PO in Odoo, and completes the payment via AP2 — all with cryptographic audit trail and HITL approval gate for orders above a threshold.

**Repos**:
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — MIT — Orchestration with HITL checkpointing (pause for human approval above threshold)
- [odoo/odoo](https://github.com/odoo/odoo) — LGPL-3 — ERP backbone: purchase orders, vendor master, inventory
- AP2 Protocol (open, May 2026) — A2A + MCP extension for agent-driven payments; Mastercard/PayPal/Adyen supported

**Architecture**:
```
Trigger: inventory level drops below reorder point (Odoo webhook)
    ↓
LangGraph: Procurement Agent workflow
    ├── Step 1: query vendor catalog via MCP (Odoo purchase module)
    ├── Step 2: score vendors (price, lead time, reliability history)
    ├── Step 3: select best offer → draft PO in Odoo via REST
    ├── Step 4 (conditional): if PO value > $10,000 → HITL pause → manager approves
    └── Step 5: execute payment via AP2 Protocol
            ├── AP2 creates non-repudiable cryptographic payment intent
            ├── Routes to AP2-compliant payment processor (Adyen / Mastercard)
            └── Writes payment confirmation + audit trail back to Odoo
    ↓
Langfuse: full trace of vendor selection reasoning + payment event log
    ↓
HITL notification: Slack/email with decision context + one-click approve
```

**Key decision points**:
- AP2 is an open protocol extension — does not require a specific payment vendor; works with any AP2-compliant processor
- LangGraph HITL checkpoint suspends the workflow; resumes on approval without re-running prior steps
- Odoo 20 (Oct 2026) ships autonomous procurement agents natively — integrate, don't replace
- A2A v1.0 Signed Agent Cards provide verifiable identity for every action in the payment chain

**Effort**: 4–6 weeks PoC (if Odoo already implemented); 3–4 months production with AP2 processor integration
**Revenue / cost case**: Autonomous procurement reduces approval cycle time 60–80%; AP2 eliminates manual payment entry and enables vendor rebates for faster payment

---
*Auto-updated by ingest pipeline — v6 2026-07-13*
