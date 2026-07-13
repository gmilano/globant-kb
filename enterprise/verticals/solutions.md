# Vertical Solutions — Enterprise

> Real enterprise platforms that can be customized with AI on top. Model: start with a working system, add an agentic layer.
> Last updated: 2026-07-13 (v6)

## ERP Platforms

| Platform | License | Stars | URL | Stack | AI Integration Strategy |
|----------|---------|-------|-----|-------|------------------------|
| **Odoo** | LGPL-3 (community) | ~49.1k | [odoo/odoo](https://github.com/odoo/odoo) | Python/OWL/PostgreSQL | Odoo 19 current; **Odoo 20 launching Odoo Experience Brussels Sep 24-26, 2026** (stable Oct 2026): autonomous AI agents (not chatbots) execute across modules; natural language ERP search; read-replica DB for 10k+ users; >€7B valuation |
| **ERPNext** | GPL-3.0 | ~36.7k | [frappe/erpnext](https://github.com/frappe/erpnext) | Python/Frappe/MariaDB | v16 "Frappe Caffeine" (stable Dec 2025): 2× performance. AI ecosystem: NextAI (Gemini), changAI (on-prem RAG), Raven AI, MCP server bridge |
| **NocoBase** | AGPL-3.0 | ~21.6k | [nocobase/nocobase](https://github.com/nocobase/nocobase) | TypeScript/Node.js/PostgreSQL | **Most AI-native ERP**: AI Employee is an operational role, not a chatbot; participates in approvals, creates records, analyzes data; supports Claude/Cursor coding agents |
| **Apache OFBiz** | Apache-2.0 | ~1.1k | [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Java/Spring | API-first; Globant-safe Apache-2.0; ERP + SCM + CRM; build AI layer via REST API |
| **Dolibarr** | GPL-3.0 | ~5k | [dolibarr/dolibarr](https://github.com/Dolibarr/dolibarr) | PHP/MySQL | Lightweight ERP+CRM for SMEs; REST API for AI integration; easy to extend |

## CRM Platforms

| Platform | License | Stars | URL | Stack | AI Integration Strategy |
|----------|---------|-------|-----|-------|------------------------|
| **Twenty** | AGPL-3.0 | ~45.5k | [twentyhq/twenty](https://github.com/twentyhq/twenty) | TypeScript/React/GraphQL | "CRM designed for AI" (YC S23); native MCP server ships with cloud; agents query/create/update records via natural language; REST + GraphQL |
| **Relaticle** | MIT | — | [relaticle/relaticle](https://github.com/relaticle/relaticle) | Laravel/Filament | **30 MCP tools** expose full CRM to AI agents; MIT license; self-hostable; most MCP-complete open-source CRM |
| **SuiteCRM** | AGPL-3.0 | ~4.3k | [salesagility/SuiteCRM](https://github.com/salesagility/SuiteCRM) | PHP/MySQL | ~5M users globally; Salesforce alternative; REST API v8 for AI agent automation |
| **EspoCRM** | AGPL-3.0 | ~1.8k | [espocrm/espocrm](https://github.com/espocrm/espocrm) | PHP/MySQL | Modern CRM; REST API; easier to customize than SuiteCRM |
| **Vtiger** | MPL-1.1 | ~1.2k | [vtiger/vtigercrm](https://github.com/vtigercrm/vtigercrm) | PHP | Full CRM with workflow engine; API for AI integration |

## ITSM Platforms (NEW in v5)

| Platform | License | Stars | URL | Stack | AI Integration Strategy |
|----------|---------|-------|-----|-------|------------------------|
| **iTop** | AGPL-3.0 | — | [Combodo/iTop](https://github.com/Combodo/iTop) | PHP/MySQL | Full CMDB + ITIL service desk; itomig-ai-base provides unified LLM layer (OpenAI-compatible, Anthropic, Mistral, Ollama) |
| **GLPI** | GPL-2.0 | — | [glpi-project/glpi](https://github.com/glpi-project/glpi) | PHP | Most popular MSP ITSM; native AI layer for ticket classification and prioritization (GLPI 11) |
| **OTOBO** | GPL-3.0 | — | [RotherOSS/otobo](https://github.com/RotherOSS/otobo) | Perl/JavaScript | OTRS community edition successor; ML-based ticket classification plugin; full ITIL |

## Workflow & BPM Platforms

| Platform | License | Stars | URL | Description | AI Augmentation |
|----------|---------|-------|-----|-------------|------------------|
| **n8n** | Fair-code | ~182k | [n8n-io/n8n](https://github.com/n8n-io/n8n) | Workflow automation + 500+ integrations + native AI agent nodes | Native MCP; connects legacy systems to LLMs; AI agent nodes built in |
| **Dify** | Apache-2.0 | ~144k | [langgenius/dify](https://github.com/langgenius/dify) | Visual LLM workflow builder + RAG + LLMOps; 100+ LLM providers | Built-in; the platform IS the AI layer; self-hostable |
| **Flowise** | Apache-2.0 | ~35k | [FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise) | Low-code LLM flow builder with REST API | Built-in; drag-and-drop LangChain flows deployable as APIs |
| **Camunda** | Apache-2.0 (core) | ~4k | [camunda/camunda](https://github.com/camunda/camunda) | Process orchestration; BPMN workflows | AI decision services via REST; human-in-the-loop for complex approvals |

## Collaboration & Project Management Platforms (NEW in v5)

| Platform | License | Stars | URL | AI Capabilities |
|----------|---------|-------|-----|----------------|
| **Nextcloud** | AGPL-3.0 | — | [nextcloud/server](https://github.com/nextcloud/server) | Hub 25 Autumn 2026: AI assistant with full agent capabilities (creates calendar events, reads/sends messages/emails); MCP support; voice input/response; 100% on-prem local LLMs |
| **Mattermost** | Apache-2.0 | — | [mattermost/mattermost](https://github.com/mattermost/mattermost) | Agents V2: multiple AI assistants per channel, sovereign AI (Ollama/vLLM local), thread/channel summarization, HITL; tool calls in-conversation |
| **OpenProject** | GPL-3.0 | — | [opf/openproject](https://github.com/opf/openproject) | MCP server integration; AI contextual search; LLM project analytics (risk, optimization, suggestions); EU public sector standard |

## Knowledge & Document Management

| Platform | License | Stars | URL | Description | AI Augmentation |
|----------|---------|-------|-----|-------------|------------------|
| **RAGFlow** | Apache-2.0 | ~73k | [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Enterprise RAG with deep OCR, table extraction, and citation tracking | IS the AI layer; drop documents in, get grounded answers out |
| **Haystack** | Apache-2.0 | ~18k | [deepset-ai/haystack](https://github.com/deepset-ai/haystack) | NLP pipelines for document search, QA, and RAG | Pipeline composer; connects to any document store |
| **Mayan EDMS** | GPL-2.0 | ~1.5k | [mayan-edms/mayan-edms](https://github.com/mayan-edms/mayan-edms) | Open-source document management system | REST API for AI classification and extraction workflows |

## HR & People Platforms

| Platform | License | Stars | URL | Description | AI Augmentation |
|----------|---------|-------|-----|-------------|------------------|
| **OrangeHRM** | GPL-2.0 | ~1.3k | [orangehrm/orangehrm](https://github.com/orangehrm/orangehrm) | Open-source HR management | API for AI-powered resume screening, onboarding automation |
| **iHRIS** | GPL-3.0 | ~140 | [iHRIS/iHRIS](https://github.com/iHRIS/iHRIS) | Health workforce information system | Domain-specific HR for health sector |

---

## How to Add an AI Layer to Any Platform

```
Step 1: Identify the platform's API surface
├── REST API (most platforms have this)
├── MCP server (check for existing: ERPNext MCP, 1C MCP, Jira MCP, Salesforce MCP)
├── Webhook/event system (n8n, Zapier triggers)
└── Database (direct read for analytics)

Step 2: Build the AI adapter
├── Tool/function definitions for LLM agents
├── Authentication + rate limiting
└── Response schema validation

Step 3: Deploy orchestration layer
├── LangGraph for stateful workflows
├── Strands Agents for AWS-native deployments
├── Google ADK for Google Cloud deployments
├── Microsoft Agent Framework for Azure/.NET
├── n8n for visual automation
└── Dify for no-code teams

Step 4: Add observability
├── Langfuse for trace/eval (MIT, self-hosted)
└── OpenTelemetry to existing stack

Step 5: Governance (required for EU AI Act Aug 2026)
└── Agent Governance Toolkit for policy enforcement
    (Cedar policies; sub-millisecond; all 10 OWASP Agentic AI risks)
```

## Globant Engagement Starting Points by Client Size

| Client Size | ERP | CRM | ITSM | AI Orchestration | Cloud |
|-------------|-----|-----|------|-----------------|-------|
| SME (<200 employees) | NocoBase or Dolibarr | Relaticle (MIT, 30 MCP tools) or EspoCRM | GLPI | Dify or Flowise | Any |
| Mid-market (200-2k) | Odoo Community | Twenty + MCP server | iTop + itomig-ai-base | LangGraph + Langfuse | Any |
| Enterprise (>2k) | Odoo Enterprise or ERPNext v16 | Twenty or custom | GLPI or iTop | MAF or LangGraph + Governance Toolkit | Multi-cloud |
| Microsoft shops | — | Dynamics 365 | ServiceNow | Microsoft Agent Framework v1.0 + Agent 365 | Azure |
| AWS shops | — | — | — | Strands Agents + Bedrock AgentCore | AWS |
| Google Cloud shops | — | — | — | Google ADK 2.0 + Vertex AI Agent Runtime | GCP |
| Privacy-first / EU sovereign | ERPNext v16 (on-prem) | Twenty (self-hosted) | iTop + Ollama | LangGraph + Agno AgentOS + Mattermost Agents V2 | On-prem or EU DC |

## Enterprise AI Infrastructure Foundations (Open Standards, July 2026)

| Initiative | License | Owner | Description |
|-----------|---------|-------|-------------|
| **AAIF (Agentic AI Foundation)** | Open | Linux Foundation | Fastest-growing LF project; Anthropic, OpenAI, Block as co-founders; AWS, Google, Microsoft as platinum; home of MCP governance |
| **OPEA (Open Platform for Enterprise AI)** | Apache-2.0 | Linux Foundation | Standard stack for enterprise AI pipelines; Red Hat, NetApp, Nutanix founding; composable AI system building blocks |
| **MCP (Model Context Protocol)** | Open (AAIF) | Linux Foundation / AAIF | 10,000+ public servers; 97M+ SDK downloads; 28% Fortune 500 adoption; EMA stable July 2026 |
| **A2A (Agent-to-Agent) v1.0** | Open (LF) | Google / AAIF | Stable Jul 2026: signed Agent Cards (JWS/RFC 7515), native multi-tenancy, OAuth 2.0 PKCE; 150+ orgs; all three hyperscaler runtimes |
| **AP2 (Agent Payments Protocol)** | Open extension | Google + 60+ partners | A2A + MCP extension for autonomous agent-driven commerce; Mastercard, PayPal, Adyen, AmEx, Coinbase, ServiceNow, Salesforce; live for merchant purchases May 2026 |

## AI Security Standards (June 2026 Update)

| Standard | Publisher | Description |
|----------|-----------|-------------|
| **OWASP Agentic AI Top 10** (2026) | OWASP | 10 risks: goal hijacking, tool misuse, identity abuse, memory poisoning, cascading failures, rogue agents, data exfiltration, excessive autonomy, audit evasion, supply chain compromise |
| **State of Agentic AI Security v2.01** | OWASP (Jun 2026) | Enterprise Adoption Maturity Model (AT0–AT8 × Levels 0–4); 42 regulatory instruments; agent identity; AI SBOM + supply chain provenance |
| **AI Security Solutions Landscape Q2 2026** | OWASP GenAI | Maps open-source and commercial tools to agentic lifecycle stages and threat mitigations |

---
*Auto-updated by ingest pipeline — v6 2026-07-13*
