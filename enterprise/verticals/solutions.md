# 🏭 Vertical Solutions — Enterprise

> Production-ready open-source platforms to fork, customize, and add AI on top.
> Model: start from something functional, add an agentic layer on top.
> Last updated: 2026-07-06

## ERP Platforms

| Platform | License | Stars | Stack | AI-Ready | Best For |
|----------|---------|-------|-------|----------|----------|
| [ERPNext / Frappe](https://github.com/frappe/erpnext) | GPL-3.0 | 36.4k | Python + MariaDB + Vue | MCP bridge via [erpnext-mcp-server](https://github.com/rakeshgangwar/erpnext-mcp-server) | SME to mid-market. Full ERP: accounting, HR, manufacturing, CRM, inventory. Most extensible open ERP for AI. |
| [Odoo](https://github.com/odoo/odoo) | LGPL-3.0 | 52.8k | Python + PostgreSQL + OWL | 2026 AI roadmap: smart CRM suggestions, predictive inventory, LLM accounting | Full-stack ERP+CRM. €7B valuation. 300+ modules. Best for full-suite enterprise apps. |
| [Apache OFBiz](https://github.com/apache/ofbiz-framework) | Apache-2.0 | 1.1k | Java + Derby/PostgreSQL | REST API, pluggable services | Pure Apache license. No viral license risk. Accounting, inventory, order management, HR. |
| [Dolibarr](https://github.com/Dolibarr/dolibarr) | GPL-3.0 | 5.5k | PHP + MySQL | REST API + module system | Freelancers to SMEs. Simple, lightweight ERP+CRM. Fast to deploy. |

## CRM Platforms

| Platform | License | Stars | Stack | AI-Ready | Best For |
|----------|---------|-------|-------|----------|----------|
| [Twenty](https://github.com/twentyhq/twenty) | Apache-2.0 | 45.5k | TypeScript + React + GraphQL | **Native MCP server** — any MCP client connects to CRM data out of the box | AI-first Salesforce alternative. Built from scratch for the agent era. Fastest growing OSS CRM 2026. |
| [SuiteCRM](https://github.com/salesagility/SuiteCRM) | AGPL-3.0 | 4.3k | PHP + MySQL | REST API, webhook integration | Enterprise feature parity with Salesforce. 5M users. Deepest open-source CRM feature set. |
| [EspoCRM](https://github.com/espocrm/espocrm) | AGPL-3.0 | 1.8k | PHP + JavaScript | REST API + webhook triggers | Clean REST API; strong for mid-market. Good AI integration point. |

## Developer Platform / Internal Tools

| Platform | License | Stars | Stack | AI-Ready | Best For |
|----------|---------|-------|-------|----------|----------|
| [Backstage](https://github.com/backstage/backstage) | Apache-2.0 | 36k | TypeScript + React + Node.js | Growing AI plugin catalog; becoming AI control plane for dev orgs | Internal developer portal: service catalog, TechDocs, scaffolder. Foundation for enterprise AI DevX. |
| [Directus](https://github.com/directus/directus) | BSL-1.1 | 30k | TypeScript + Vue + Node.js | REST+GraphQL auto-generated from schema; hooks for AI pipelines | Headless CMS / BaaS. Turns any database into an AI-queryable API. |
| [NocoBase](https://github.com/nocobase/nocobase) | AGPL-3.0 | 16k | TypeScript + React | Plugin system + REST API | No-code / low-code platform builder. Enterprise alternative to Airtable/Notion. |

## Data Governance & Discovery

| Platform | License | Stars | Stack | AI-Ready | Best For |
|----------|---------|-------|-------|----------|----------|
| [DataHub](https://github.com/datahub-project/datahub) | Apache-2.0 | 11.8k | Python + React + Kafka | **MCP server GA** — agents query data catalog directly | Enterprise data discovery, governance, lineage. Originally from LinkedIn. Thousands of org deployments. |
| [OpenMetadata](https://github.com/open-metadata/OpenMetadata) | Apache-2.0 | 8.2k | Python + React + Java | **MCP server + AI SDK** — 130 connectors, semantic search, data contracts | Open context layer for data+AI. 3,000+ enterprise deployments. Best for AI-first governance. |
| [Apache Atlas](https://github.com/apache/atlas) | Apache-2.0 | 1.8k | Java + Hadoop ecosystem | REST API | Hadoop-centric data governance. Best for orgs with heavy Hadoop/HBase footprint. |

## Workflow Automation Platforms

| Platform | License | Stars | Stack | AI-Ready | Best For |
|----------|---------|-------|-------|----------|----------|
| [n8n](https://github.com/n8n-io/n8n) | Sustainable | 102k | TypeScript + Vue + Node.js | Native AI agent nodes; 400+ integrations | Integration-heavy enterprise automation. Best for connecting ERP, CRM, SaaS + AI agents. |
| [Flowise](https://github.com/FlowiseAI/Flowise) | Apache-2.0 | 51k | TypeScript + React | Best-in-class RAG; agentic flow builder | Visual LLM app builder. Acquired by Workday. Strong for RAG + agent pipelines. |
| [Dify](https://github.com/langgenius/dify) | Apache-2.0 | 144k | Python + Next.js | All-in-one: RAG, agents, observability, 100+ LLMs | Enterprise LLMOps platform. Fastest path from idea to production AI app. |

## How to Add AI to Any Platform

```
1. CONNECT  — deploy MCP server (e.g. erpnext-mcp-server, DataHub MCP, Twenty native)
             OR expose REST/GraphQL API as LangGraph tools

2. GROUND   — connect DataHub or OpenMetadata as the context layer
             so agents know what data exists, its schema, and governance rules

3. ORCHESTRATE — wire LangGraph for complex stateful workflows
               OR CrewAI for role-based agent teams
               OR n8n for integration-heavy automation

4. OBSERVE  — LangSmith for agent traces
             OR Dify's built-in observability
             OR OpenTelemetry to existing APM (Datadog, New Relic, SigNoz)

5. GOVERN  — HITL gates in LangGraph for high-stakes actions
            RBAC in Dify/n8n for access control
            DataHub lineage to trace every AI decision to source data
```
