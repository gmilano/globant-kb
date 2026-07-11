# Foundational Repos — Enterprise AI

> The open source bedrock for building enterprise AI solutions. These are the repos with proven communities, permissive licenses, and production track records that Globant can build client solutions on top of.
> Last updated: 2026-07-11

## Agent Orchestration Layer

| Repo | License | Stars | Description | Build on for... |
|------|---------|-------|-------------|-----------------|
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | ~34.5k | Graph-based stateful agent orchestration; durable execution; checkpointing; HITL | Any stateful multi-step enterprise workflow (approval loops, long-running processes) |
| [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | ~54.2k | Role-based multi-agent collaboration; sequential and parallel crew execution | Research, analysis, and content pipelines where multiple specialist agents collaborate |
| [microsoft/agent-framework](https://github.com/microsoft/agent-framework) | MIT | ~11.6k | Unified .NET + Python SDK; multi-agent; A2A + MCP protocols; Azure-native | Microsoft Azure shops, .NET enterprise stacks, Teams/M365 integration |
| [huggingface/smolagents](https://github.com/huggingface/smolagents) | Apache-2.0 | ~27k | Minimal agent framework; CodeAct execution; all HF models | Lean deployments, HF Hub model swapping, code-executing agents |

## Knowledge & Retrieval Layer

| Repo | License | Stars | Description | Build on for... |
|------|---------|-------|-------------|-----------------|
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Apache-2.0 | ~73k | Enterprise RAG engine with deep document understanding (PDF, tables, charts) + agent loop | Enterprise knowledge bases, compliance document QA, policy/contract search |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Apache-2.0 | ~26k | Persistent memory layer for agents — user/session/agent-scoped memory | Any agent that needs to remember context across sessions (CRM, helpdesk, onboarding) |
| [deepset-ai/haystack](https://github.com/deepset-ai/haystack) | Apache-2.0 | ~18k | Modular NLP pipeline — retrieval, QA, summarization, hybrid search | Document-heavy workflows: legal, HR, finance, procurement |

## Workflow & Integration Layer

| Repo | License | Stars | Description | Build on for... |
|------|---------|-------|-------------|-----------------|
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | Fair-code | ~189k | Visual workflow automation; 400+ connectors; native AI agent nodes; MCP support | Connecting AI agents to legacy enterprise systems (ERP, CRM, ITSM, email) |
| [langgenius/dify](https://github.com/langgenius/dify) | Apache-2.0 | ~148k | Full-stack LLM platform: visual workflows + RAG + model management + LLMOps | Rapid enterprise AI app prototyping; internal tools with monitoring |

## ERP & Business Platform Layer

| Repo | License | Stars | Description | Build on for... |
|------|---------|-------|-------------|-----------------|
| [frappe/frappe](https://github.com/frappe/frappe) | MIT | ~10.4k | Low-code Python + JS framework; ORM, REST API, job queues, websockets | Foundation for ERPNext — any custom enterprise app needing full-stack Python framework |
| [frappe/erpnext](https://github.com/frappe/erpnext) | GPL-3.0 | ~36.4k | 100% open source ERP: accounting, inventory, HR, CRM, manufacturing, projects | Full ERP baseline for SME/mid-market clients; MIT Frappe framework underneath |
| [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Apache-2.0 | ~1.1k | Java enterprise application framework with ERP, CRM, e-commerce, POS | Enterprise Java shops needing Apache-licensed ERP; high customizability |
| [odoo/odoo](https://github.com/odoo/odoo) | LGPL-3.0 (Community) | ~52.8k | 50+ integrated business apps; 7M+ users; Community free, Enterprise $24.90/user/mo | Most popular open-core ERP; best when client is willing to pay Enterprise for AI features |

## Developer Platform Layer

| Repo | License | Stars | Description | Build on for... |
|------|---------|-------|-------------|-----------------|
| [backstage/backstage](https://github.com/backstage/backstage) | Apache-2.0 | ~30k | Spotify's internal developer portal — software catalog, TechDocs, plugins | Building enterprise AI developer portals; centralizing agent/tool catalog |
| [mattermost/mattermost](https://github.com/mattermost/mattermost) | Apache-2.0 | ~10k | Secure self-hosted team collaboration; AI plugin (thread summaries, chat agents) | On-prem/air-gapped enterprises; regulated industries; AI-powered team chat |

---

## Key Decision: Frappe/ERPNext vs Odoo vs OFBiz

| Criteria | ERPNext (Frappe) | Odoo Community | Apache OFBiz |
|----------|-----------------|----------------|--------------|
| License | GPL-3.0 / MIT (Frappe) | LGPL-3.0 | Apache-2.0 |
| AI features (free) | Full via Frappe Python APIs | None (Enterprise only) | Custom only |
| Language | Python + JS | Python + JS | Java |
| Best for | Full OSS ERP customization | When client will pay for Enterprise | Java enterprise shops |
| LATAM usage | High (Spanish docs, PIX adapters) | Very high (most recognized brand) | Low |

---
*See also: `verticals/solutions.md` for full platform decision guide.*
*Updated 2026-07-11 by ingest pipeline.*
