# Vertical Solutions — Enterprise

> Real enterprise platforms that can be customized with AI on top. Model: start with a working system, add an agentic layer.
> Last updated: 2026-07-11 (v3)

## ERP Platforms

| Platform | License | Stars | URL | Stack | AI Integration Strategy |
|----------|---------|-------|-----|-------|------------------------|
| **Odoo** | LGPL-3 (community) | ~49.1k | [odoo/odoo](https://github.com/odoo/odoo) | Python/OWL/PostgreSQL | REST API + external LLM; built-in content generation AI; 84 business modules; AI assistive in v17/v18 |
| **ERPNext** | GPL-3.0 | ~31.9k | [frappe/erpnext](https://github.com/frappe/erpnext) | Python/Frappe/MariaDB | Custom dev for AI; flexible Python hooks; Frappe framework MIT; strong LATAM adoption |
| **NocoBase** | AGPL-3.0 | ~21.6k | [nocobase/nocobase](https://github.com/nocobase/nocobase) | TypeScript/Node.js/PostgreSQL | **AI-native**: AI employee model understands business context; participates in approval workflows; generates records autonomously |
| **Apache OFBiz** | Apache-2.0 | ~1.1k | [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Java/Spring | API-first; Globant-safe Apache-2.0; ERP + SCM + CRM; build AI layer via REST API |
| **Dolibarr** | GPL-3.0 | ~5k | [dolibarr/dolibarr](https://github.com/Dolibarr/dolibarr) | PHP/MySQL | Lightweight ERP+CRM for SMEs; REST API for AI integration; easy to extend |

## CRM Platforms

| Platform | License | Stars | URL | Stack | AI Integration Strategy |
|----------|---------|-------|-----|-------|------------------------|
| **SuiteCRM** | AGPL-3.0 | ~4.3k | [salesagility/SuiteCRM](https://github.com/salesagility/SuiteCRM) | PHP/MySQL | ~5M users globally; Salesforce alternative; REST API v8 for AI agent automation; CRM workflows |
| **EspoCRM** | AGPL-3.0 | ~1.8k | [espocrm/espocrm](https://github.com/espocrm/espocrm) | PHP/MySQL | Modern CRM with REST API; easier to customize than SuiteCRM; good for AI integration |
| **Twenty** | AGPL-3.0 | ~29k | [twentyhq/twenty](https://github.com/twentyhq/twenty) | TypeScript/React/GraphQL | Modern open-source CRM alternative to Salesforce; GraphQL API; strong for AI enrichment |
| **Vtiger** | MPL-1.1 | ~1.2k | [vtiger/vtigercrm](https://github.com/vtigercrm/vtigercrm) | PHP | Full CRM with workflow engine; API for AI integration |

## Workflow & BPM Platforms

| Platform | License | Stars | URL | Description | AI Augmentation |
|----------|---------|-------|-----|-------------|-----------------|
| **n8n** | Fair-code | ~189k | [n8n-io/n8n](https://github.com/n8n-io/n8n) | Workflow automation + 400+ integrations + native AI agent nodes | Native MCP; connects legacy systems to LLMs; AI agent nodes built in |
| **Dify** | Apache-2.0 | ~148k | [langgenius/dify](https://github.com/langgenius/dify) | Visual LLM workflow builder + RAG + LLMOps | Built-in; the platform IS the AI layer; self-hostable |
| **Flowise** | Apache-2.0 | ~35k | [FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise) | Low-code LLM flow builder with REST API | Built-in; drag-and-drop LangChain flows deployable as APIs |
| **Camunda** | Apache-2.0 (core) | ~4k | [camunda/camunda](https://github.com/camunda/camunda) | Process orchestration; BPMN workflows | AI decision services via REST; human-in-the-loop for complex approvals |

## Knowledge & Document Management

| Platform | License | Stars | URL | Description | AI Augmentation |
|----------|---------|-------|-----|-------------|-----------------|
| **RAGFlow** | Apache-2.0 | ~73k | [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Enterprise RAG with deep OCR, table extraction, and citation tracking | IS the AI layer; drop documents in, get grounded answers out |
| **Haystack** | Apache-2.0 | ~18k | [deepset-ai/haystack](https://github.com/deepset-ai/haystack) | NLP pipelines for document search, QA, and RAG | Pipeline composer; connects to any document store |
| **Mayan EDMS** | GPL-2.0 | ~1.5k | [mayan-edms/mayan-edms](https://github.com/mayan-edms/mayan-edms) | Open-source document management system | REST API for AI classification and extraction workflows |

## HR & People Platforms

| Platform | License | Stars | URL | Description | AI Augmentation |
|----------|---------|-------|-----|-------------|-----------------|
| **OrangeHRM** | GPL-2.0 | ~1.3k | [orangehrm/orangehrm](https://github.com/orangehrm/orangehrm) | Open-source HR management | API for AI-powered resume screening, onboarding automation |
| **iHRIS** | GPL-3.0 | ~140 | [iHRIS/iHRIS](https://github.com/iHRIS/iHRIS) | Health workforce information system | Domain-specific HR for health sector |

---

## How to Add an AI Layer to Any Platform

```
Step 1: Identify the platform's API surface
├── REST API (most platforms have this)
├── Webhook/event system (n8n, Zapier triggers)
└── Database (direct read for analytics)

Step 2: Build the AI adapter
├── Tool/function definitions for LLM agents
├── Authentication + rate limiting
└── Response schema validation

Step 3: Deploy orchestration layer
├── LangGraph for stateful workflows
├── n8n for visual automation
└── Dify for no-code teams

Step 4: Add observability
├── Langfuse for trace/eval
└── OpenTelemetry to existing stack

Step 5: Governance
└── Agent Governance Toolkit for policy enforcement
```

## Globant Engagement Starting Points by Client Size

| Client Size | ERP | CRM | Workflow | AI Orchestration |
|-------------|-----|-----|----------|-----------------|
| SME (<200 employees) | NocoBase or Dolibarr | EspoCRM | n8n | Dify or Flowise |
| Mid-market (200-2k) | Odoo Community | SuiteCRM | n8n + LangGraph | LangGraph + Langfuse |
| Enterprise (>2k) | Odoo Enterprise or ERPNext | Twenty or custom | n8n + Camunda | MAF or LangGraph + Governance Toolkit |
| Microsoft shops | — | Dynamics 365 | n8n or MAF workflows | Microsoft Agent Framework v1.0 |

---
*Auto-updated by ingest pipeline — v3 2026-07-11*
