# Foundational Repos — Enterprise AI

> The core open-source repositories every enterprise AI engagement should know. Curated for Globant: real URLs, verified licenses, active communities.
> Last updated: 2026-07-12 (v5)

## Core Orchestration Foundations

| Repo | License | Stars | Maintainer | Description | Why Foundational |
|------|---------|-------|-----------|-------------|------------------|
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | ~34.5k | LangChain AI | Stateful graph-based agent orchestration with durable execution and checkpoints | De-facto enterprise standard for production agents in 2026; 34.5M monthly library downloads; Uber, Klarna, LinkedIn production |
| [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | ~54.2k | CrewAI Inc | Role-playing multi-agent framework with memory, tools, delegation, and workflow automation | Fastest multi-agent prototyping; 5.2M downloads/month; widest enterprise pilot adoption |
| [microsoft/agent-framework](https://github.com/microsoft/agent-framework) | MIT | ~11.6k | Microsoft | GA April 2026 — production unification of AutoGen + Semantic Kernel for .NET and Python | New LTS standard for Microsoft-ecosystem enterprises; A2A + MCP native; stable APIs |
| [strands-agents/harness-sdk](https://github.com/strands-agents/harness-sdk) | Apache-2.0 | ~6.1k | AWS | Model-driven agent SDK (renamed from sdk-python); same framework AWS uses for Amazon Q Developer, AWS Glue, VPC Reachability Analyzer | 16.7M downloads/month (Jun 2026); AWS production-proven; Bedrock AgentCore native; OTEL built in |
| [google/adk-python](https://github.com/google/adk-python) | Apache-2.0 | ~20.1k | Google | ADK 2.0 GA: code-first agent toolkit (Python/TS/Go/Java/Kotlin); graph workflows; Vertex AI Agent Runtime | Moody's + Dun & Bradstreet production references; native Vertex AI; fastest-growing framework at launch |
| [openai/openai-agents-python](https://github.com/openai/openai-agents-python) | MIT | ~25.6k | OpenAI | Multi-agent workflows with Handoffs, Guardrails, Tracing; provider-agnostic (100+ LLMs); enterprise sandboxing Apr 2026 | Successor to Swarm; default SDK for OpenAI API users; TypeScript companion; 25.6k ★ |
| [pydantic/pydantic-ai](https://github.com/pydantic/pydantic-ai) | MIT | ~18.4k | pydantic | Type-safe agent framework; model-agnostic; durable execution; Pydantic Logfire tracing | Best for finance/legal/data pipelines needing validated structured outputs; durable execution stable |
| [microsoft/autogen](https://github.com/microsoft/autogen) | MIT | ~40k | Microsoft Research | Conversational multi-agent framework — **maintenance mode; migrate to MAF for new projects** | Large installed base; proven at Azure enterprise scale; migration guides published |
| [microsoft/semantic-kernel](https://github.com/microsoft/semantic-kernel) | MIT | ~27.9k | Microsoft | AI SDK for .NET, Python, Java — **maintenance mode; migrating to MAF** | Best-in-class .NET plugin ecosystem; 3-language support |

## LLM Platforms & Workflow Engines

| Repo | License | Stars | Maintainer | Description | Why Foundational |
|------|---------|-------|-----------|-------------|------------------|
| [langgenius/dify](https://github.com/langgenius/dify) | Apache-2.0 | ~144k | LangGenius | Visual workflow builder + RAG pipeline + LLMOps; 100+ LLM providers; self-hostable | #1 LLM platform by stars; only framework with full GUI + production RAG + LLMOps self-hostable |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | Fair-code | ~182k | n8n GmbH | Workflow automation with native AI agent nodes, MCP support, and 500+ integrations | The integration layer between legacy enterprise systems and modern AI agents |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Apache-2.0 | ~73k | InfiniFlow | Enterprise RAG engine with deep document understanding, OCR, table extraction, and citations | Solves enterprise hallucination/compliance problem; grounded, traceable AI answers |
| [FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise) | Apache-2.0 | ~35k | FlowiseAI | Low-code visual builder for LLM flows with REST API output | Enables non-technical teams to build AI workflows; deployable as microservices |

## Enterprise Infrastructure

| Repo | License | Stars | Maintainer | Description | Why Foundational |
|------|---------|-------|-----------|-------------|------------------|
| [langfuse/langfuse](https://github.com/langfuse/langfuse) | MIT | ~9k | Langfuse (ClickHouse) | LLM observability: tracing, evals, prompt management, datasets; OTEL-native; ClickHouse backend | Industry-standard observability layer; 2,300+ companies; mandatory for production agents |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Apache-2.0 | ~26k | Mem0 AI | Persistent memory layer for AI agents: user/session/agent memory with semantic search | Enables agents to maintain context across sessions; critical for enterprise deployments |
| [huggingface/smolagents](https://github.com/huggingface/smolagents) | Apache-2.0 | ~27k | Hugging Face | Minimal code-first agent framework with CodeAct execution and OpenTelemetry tracing | Lightweight, composable; OTEL built in; works with any HF model |
| [deepset-ai/haystack](https://github.com/deepset-ai/haystack) | Apache-2.0 | ~18k | deepset | NLP pipeline framework for search, QA, and document-heavy enterprise workflows | Battle-tested for enterprise document search; modular component design |
| [agno-agi/agno](https://github.com/agno-agi/agno) | MIT | ~39.8k | Agno | Lightweight, model-agnostic agent framework with multimodality, AgentOS control plane, and RBAC; rebranded from Phidata Jan 2025 | Ultra-fast init; data sovereignty focus; AgentOS enterprise RBAC; rapid PoC to production pathway |
| [microsoft/agent-governance-toolkit](https://github.com/microsoft/agent-governance-toolkit) | MIT | ~3.2k | Microsoft | Runtime security governance for autonomous AI agents; OWASP Agentic AI Top 10 coverage | Essential for EU AI Act Aug 2026 compliance; Cedar policy-as-code; sub-millisecond enforcement |

## ERP / CRM Vertical Foundations

| Repo | License | Stars | Maintainer | Description | AI Integration |
|------|---------|-------|-----------|-------------|---------------|
| [odoo/odoo](https://github.com/odoo/odoo) | LGPL-3 (community) | ~49.1k | Odoo SA (>€7B val. 2026) | Comprehensive ERP+CRM+84 business modules; Python/OWL; Odoo 19 current; Odoo 20 expected Sep 2026 | AI content gen built in; 9 AI features shipped 2026 roadmap; v20: AI-assisted accounting |
| [frappe/erpnext](https://github.com/frappe/erpnext) | GPL-3.0 | ~36.7k | Frappe | ERP v16 "Frappe Caffeine" (stable Dec 2025/Jan 2026); 2× performance; manufacturing, HR, accounting | Ecosystem AI: NextAI (Gemini), changAI (RAG/on-prem), Raven AI, ERPNext MCP server |
| [frappe/frappe](https://github.com/frappe/frappe) | MIT | ~10.4k | Frappe | Low-code web framework underlying ERPNext; Python + JavaScript | MIT license: strong foundation for AI-augmented Frappe apps |
| [nocobase/nocobase](https://github.com/nocobase/nocobase) | AGPL-3.0 | ~21.6k | NocoBase | AI-native no-code ERP/CRM: AI Employee framework participates in real workflows; supports both coding agents (Claude/Cursor) and no-code users | Most AI-native ERP: AI as operational role, not sidebar chatbot; full business context |
| [twentyhq/twenty](https://github.com/twentyhq/twenty) | AGPL-3.0 | ~45.5k | TwentyHQ (YC S23) | Modern open-source CRM alternative to Salesforce; TypeScript/React/GraphQL; "designed for AI" | Native MCP server ships with cloud workspaces; agents query/create/update CRM records via natural language |
| [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Apache-2.0 | ~1.1k | Apache Foundation | Enterprise-grade ERP framework with SCM + CRM; Java/Spring | Apache-2.0: pure Globant buildable; API-first for AI agent integration |
| [salesagility/SuiteCRM](https://github.com/salesagility/SuiteCRM) | AGPL-3.0 | ~4.3k | SalesAgility | World's most popular open-source CRM; ~5M users globally; Salesforce alternative | REST API v8 enables AI agent CRM automation |
| [relaticle/relaticle](https://github.com/relaticle/relaticle) | MIT | — | Relaticle | Open-source CRM with native AI agent support via 30 MCP tools; Laravel + Filament; self-hostable | MIT license; 30 MCP tools expose full CRM to agents; most MCP-complete open-source CRM |

---
*Auto-updated by ingest pipeline — v5 2026-07-12*
