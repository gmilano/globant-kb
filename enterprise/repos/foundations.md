# Foundational Repos — Enterprise AI

> The core open-source repositories every enterprise AI engagement should know. Curated for Globant: real URLs, verified licenses, active communities.
> Last updated: 2026-07-11 (v3)

## Core Orchestration Foundations

| Repo | License | Stars | Maintainer | Description | Why Foundational |
|------|---------|-------|-----------|-------------|-----------------|
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | ~34.5k | LangChain AI | Stateful graph-based agent orchestration with durable execution and checkpoints | De-facto enterprise standard for production agents in 2026; Uber, Klarna, LinkedIn production |
| [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | ~54.2k | CrewAI Inc | Role-playing multi-agent framework with memory, tools, delegation, and workflow automation | Fastest multi-agent prototyping; 5.2M downloads/month; widest enterprise pilot adoption |
| [microsoft/agent-framework](https://github.com/microsoft/agent-framework) | MIT | ~11.6k | Microsoft | GA April 2026 — production unification of AutoGen + Semantic Kernel for .NET and Python | New LTS standard for Microsoft-ecosystem enterprises; A2A + MCP native; stable APIs |
| [microsoft/autogen](https://github.com/microsoft/autogen) | MIT | ~58.7k | Microsoft Research | Conversational multi-agent framework (maintenance mode; base for Agent Framework) | Most widely deployed Microsoft agent framework; proven at Azure enterprise scale |
| [microsoft/semantic-kernel](https://github.com/microsoft/semantic-kernel) | MIT | ~27.9k | Microsoft | AI SDK for .NET, Python, Java — plugin architecture, memory, planners | Core of .NET enterprise AI; 3-language support; large existing plugin ecosystem |

## LLM Platforms & Workflow Engines

| Repo | License | Stars | Maintainer | Description | Why Foundational |
|------|---------|-------|-----------|-------------|-----------------|
| [langgenius/dify](https://github.com/langgenius/dify) | Apache-2.0 | ~148k | LangGenius | Visual workflow builder + RAG pipeline + LLMOps; self-hostable enterprise AI platform | #1 LLM platform by stars; fastest growing AI infra project ever; 100k stars record |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | Fair-code | ~189k | n8n GmbH | Workflow automation with native AI agent nodes, MCP support, and 400+ integrations | The integration layer between legacy enterprise systems and modern AI agents |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Apache-2.0 | ~73k | InfiniFlow | Enterprise RAG engine with deep document understanding, OCR, table extraction, and citations | Solves enterprise hallucination/compliance problem; grounded, traceable AI answers |
| [FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise) | Apache-2.0 | ~35k | FlowiseAI | Low-code visual builder for LLM flows with REST API output | Enables non-technical teams to build AI workflows; deployable as microservices |

## Enterprise Infrastructure

| Repo | License | Stars | Maintainer | Description | Why Foundational |
|------|---------|-------|-----------|-------------|-----------------|
| [langfuse/langfuse](https://github.com/langfuse/langfuse) | MIT | ~9k | Langfuse (ClickHouse) | LLM observability: tracing, evals, prompt management, datasets; OTEL-native; ClickHouse backend | Industry-standard observability layer; 2,300+ companies; mandatory for production agents |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Apache-2.0 | ~26k | Mem0 AI | Persistent memory layer for AI agents: user/session/agent memory with semantic search | Enables agents to maintain context across sessions; critical for enterprise deployments |
| [huggingface/smolagents](https://github.com/huggingface/smolagents) | Apache-2.0 | ~27k | Hugging Face | Minimal code-first agent framework with CodeAct execution and OpenTelemetry tracing | Lightweight, composable; OTEL built in; works with any HF model |
| [deepset-ai/haystack](https://github.com/deepset-ai/haystack) | Apache-2.0 | ~18k | deepset | NLP pipeline framework for search, QA, and document-heavy enterprise workflows | Battle-tested for enterprise document search; modular component design |
| [agno-agi/agno](https://github.com/agno-agi/agno) | Apache-2.0 | ~26k | Agno | Lightweight, model-agnostic agent framework with multimodality and team support | Ultra-fast init; multimodal from day one; rapid PoC to production pathway |
| [microsoft/agent-governance-toolkit](https://github.com/microsoft/agent-governance-toolkit) | MIT | ~3.2k | Microsoft | Runtime security governance for autonomous AI agents; OWASP Agentic AI Top 10 coverage | Essential for EU AI Act compliance; Cedar policy-as-code; sub-millisecond enforcement |

## ERP / CRM Vertical Foundations

| Repo | License | Stars | Maintainer | Description | AI Integration |
|------|---------|-------|-----------|-------------|---------------|
| [odoo/odoo](https://github.com/odoo/odoo) | LGPL-3 (community) | ~49.1k | Odoo SA | Comprehensive ERP+CRM+84 business modules; Python/OWL stack | REST API + external LLM integration; AI content generation built in |
| [frappe/erpnext](https://github.com/frappe/erpnext) | GPL-3.0 | ~31.9k | Frappe | Open-source ERP built on Frappe framework; manufacturing, HR, accounting | Custom dev required for AI; flexible Python architecture |
| [frappe/frappe](https://github.com/frappe/frappe) | MIT | ~10.4k | Frappe | Low-code web framework underlying ERPNext; Python + JavaScript | MIT license; strong foundation for AI-augmented Frappe apps |
| [nocobase/nocobase](https://github.com/nocobase/nocobase) | AGPL-3.0 | ~21.6k | NocoBase | AI-native no-code ERP/CRM with AI employee model, approval workflows, and knowledge bases | Built-in AI: understands business context, participates in workflows autonomously |
| [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Apache-2.0 | ~1.1k | Apache Foundation | Enterprise-grade ERP framework with SCM + CRM; Apache licensed | Apache-2.0: pure Globant buildable; API-first for AI agent integration |
| [suitecrm/SuiteCRM](https://github.com/salesagility/SuiteCRM) | AGPL-3.0 | ~4.3k | SalesAgility | World's most popular open-source CRM; ~5M users globally; Salesforce alternative | REST API v8 enables AI agent CRM automation |

---
*Auto-updated by ingest pipeline — v3 2026-07-11*
