# Top AI Agents & Frameworks — Enterprise

> Open-source AI agents and orchestration frameworks for enterprise automation.
> Focus: MIT / Apache 2.0 licenses Globant can build on.
> Last updated: 2026-07-07

## Top 10 Enterprise AI Agents & Frameworks

| Name | License | Repo | Stars | Description |
|------|---------|------|-------|-------------|
| [LangGraph](https://github.com/langchain-ai/langgraph) | MIT | langchain-ai/langgraph | ~34k | Stateful multi-agent orchestration with graph-based workflows; 34.5M monthly downloads; used in prod by Cisco, Uber, LinkedIn, BlackRock, JPMorgan |
| [n8n](https://github.com/n8n-io/n8n) | Sustainable Use | n8n-io/n8n | ~182k | Visual workflow automation with 400+ integrations and native AI agent nodes; self-hostable; $2.5B valuation; n8n 2.0 with enterprise SSO/audit |
| [Dify](https://github.com/langgenius/dify) | Apache-2.0 | langgenius/dify | ~144k | LLMOps platform with visual workflow builder, RAG pipeline, and agentic app factory; 1M+ apps in production (Maersk, Novartis) |
| [CrewAI](https://github.com/crewAIInc/crewAI) | MIT | crewAIInc/crewAI | ~31k | Role-based multi-agent orchestration; 1,500+ enterprise deployments; 5.2M monthly downloads; best for task-decomposed crew patterns |
| [AutoGen](https://github.com/microsoft/autogen) | MIT | microsoft/autogen | ~42k | Microsoft multi-agent framework (maintenance mode → succeeded by MAF); conversational multi-agent abstractions with GroupChat and nested conversations |
| [OpenHands](https://github.com/All-Hands-AI/OpenHands) | Apache-2.0 | All-Hands-AI/OpenHands | ~76k | Autonomous AI software engineer; 72.8% SWE-Bench Verified with Claude 4.5; sandboxed Docker/K8s; $18.8M Series A; Enterprise: RBAC + SAML + VPC |
| [browser-use](https://github.com/browser-use/browser-use) | Apache-2.0 | browser-use/browser-use | ~86k | Give AI agents real browser control (click, type, navigate); fastest-growing agent tool of H1 2026; powers web automation layer in enterprise stacks |
| [Google ADK](https://github.com/google/adk-python) | Apache-2.0 | google/adk-python | ~20k | Google Agent Development Kit; multi-agent orchestration with A2A protocol native support; 3.3M monthly downloads; strong Vertex AI integration |
| [Backstage](https://github.com/backstage/backstage) | Apache-2.0 | backstage/backstage | ~29k | Spotify's internal developer portal platform; CNCF incubating; 3,400+ companies; ML model catalog + AI service templates + agent registry patterns |
| [Temporal](https://github.com/temporalio/temporal) | MIT | temporalio/temporal | ~13k | Durable workflow execution for long-running agent tasks; automatic retry + state persistence; Multi-Region Replication 99.99% SLA; ideal for agent orchestration |

---

## MCP Servers for Enterprise

| MCP Server | Repo | Description |
|-----------|------|-------------|
| ERPNext MCP | github.com/rakeshgangwar/erpnext-mcp-server | Connect AI to ERPNext (Frappe) data and operations |
| 1C:Enterprise MCP | github.com/infaton/MCP35 | 51 tools for 1C ERP via Model Context Protocol |
| Twenty CRM MCP | github.com/twentyhq/twenty | Native MCP server — Claude/ChatGPT/Cursor integration |
| Odoo MCP | github.com/zahere-dev/odoo-mcp-server | Odoo ERP operations via MCP |
| Salesforce MCP | community | Salesforce data and workflow access for AI agents |

---

## Protocol Standards (2026)

| Protocol | Maintainer | Adoption | Role |
|----------|-----------|---------|------|
| MCP (Model Context Protocol) | Anthropic / Linux Foundation | 9,652 servers; 97M monthly SDK downloads; 41% orgs in prod | Agent ↔ tool integration (vertical) |
| A2A (Agent-to-Agent) | Google / Linux Foundation | v1.0 GA; 150+ orgs in production | Agent ↔ agent communication (horizontal) |
| ACP (Agent Communication Protocol) | IBM / BeeAI | Emerging; REST-based | Agent lifecycle + discovery |
| OpenAI Agents SDK | OpenAI | ~15k★ | Lightweight SDK with tracing + guardrails |

---

## Framework Selection Guide

| Scenario | Recommended | Why |
|---------|------------|-----|
| Complex stateful enterprise workflows | LangGraph | Graph model, 34% enterprise market share |
| No-code automation + AI | n8n | 400+ integrations, self-hostable |
| LLM app factory + RAG | Dify | Visual builder, 1M+ apps in prod |
| Role-based multi-agent | CrewAI | Simple mental model, 1,500+ deployments |
| Autonomous coding/DevOps | OpenHands | 76k★, 72.8% SWE-Bench, enterprise RBAC |
| Web automation layer | browser-use | 86k★, direct browser control |
| Long-running durable workflows | Temporal | Automatic retry, 99.99% SLA |
| Internal developer portal | Backstage | 3,400 companies, CNCF |

---
*Updated automatically by the ingest pipeline.*
