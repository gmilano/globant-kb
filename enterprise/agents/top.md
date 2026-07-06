# 🎯 Top AI Agents — Enterprise

> Open-source AI agents and frameworks for enterprise automation. Focus: MIT / Apache 2.0 licenses that Globant can build on.
> Last updated: 2026-07-06 (second pass)

## Top Agents & Frameworks

| Name | License | Stars | Description |
|------|---------|-------|-------------|
| [LangGraph](https://github.com/langchain-ai/langgraph) | MIT | 126k | Graph-based stateful agent orchestration. Production standard for Fortune 500: Uber, LinkedIn, Klarna (saved $60M/yr). Supports persistent state via PostgreSQL checkpointer, HITL gates, LangSmith observability. |
| [CrewAI](https://github.com/crewAIInc/crewAI) | MIT | 52.8k | Role-based multi-agent framework. Claims 2B+ agentic workflows processed. Fastest path from prototype to team-of-agents; most Fortune 500 teams start here before migrating to LangGraph for production. |
| [Dify](https://github.com/langgenius/dify) | Apache-2.0 | 144k | Visual LLMOps platform with drag-and-drop agent builder, 100+ LLM providers, built-in RAG pipelines, and production observability dashboard. $30M raised 2026. 1M+ apps in production. Enterprise customers: Maersk, Novartis. |
| [Microsoft Agent Framework](https://github.com/microsoft/agent-framework) | MIT | 18k | MAF 1.0 (April 2026): production unification of AutoGen + Semantic Kernel. Enterprise-grade multi-agent orchestration, A2A + MCP interoperability, stable LTS APIs. Go-to for .NET enterprise stacks. |
| [Semantic Kernel](https://github.com/microsoft/semantic-kernel) | MIT | 27.9k | Microsoft's AI SDK for .NET/Python/Java. Native plugin system, thread-based state, type safety, telemetry. Enterprise features: filters, SSO hooks, Azure OpenAI integration. Foundation of MAF 1.0. |
| [n8n](https://github.com/n8n-io/n8n) | Sustainable | 182k | Workflow automation platform with native AI agent nodes. 400+ integrations, self-hosted, enterprise SSO/SAML, Kubernetes-native. n8n 2.0 (Dec 2025): enterprise-grade security by default, AI Agent node with token management. $2.5B valuation. Deepest enterprise integration story among visual builders. |
| [Flowise](https://github.com/FlowiseAI/Flowise) | Apache-2.0 | 51k | Low-code agentic workflow builder with best-in-class RAG. Acquired by Workday 2026, signaling enterprise legitimacy. Visual chain/agent builder, native vector DB integration, SSRF protection. |
| [Langflow](https://github.com/langflow-ai/langflow) | MIT | 46k | Visual flow-based agent builder for RAG + LLM apps, backed by IBM/DataStax. SOC2 Type II certified on managed cloud. Strong enterprise security posture post-acquisition. |
| [AutoGen](https://github.com/microsoft/autogen) | MIT | 54k | Microsoft multi-agent conversation framework (now superseded by MAF 1.0, but widely deployed). Simple abstractions for agent teams, code execution, and function calling. |
| [Smolagents](https://github.com/huggingface/smolagents) | Apache-2.0 | 27.7k | Hugging Face minimal agent framework. Code-first approach: agents write and execute Python directly. Fastest single-agent loop for tool-use tasks; composes cleanly with HF model ecosystem. |

---

## Specialized Enterprise Agents

| Name | License | Stars | Use Case |
|------|---------|-------|----------|
| [OpenHands](https://github.com/All-Hands-AI/OpenHands) | MIT | 78.5k | Software engineering agent, 72% SWE-bench Verified. v1.6.0: Kubernetes multi-user RBAC. Automates code review, PR creation, bug fixes. Production at enterprise engineering teams. |
| [DataHub](https://github.com/datahub-project/datahub) | Apache-2.0 | 11.8k | Metadata & data governance platform. Powers data discovery at thousands of orgs; agent-queryable via MCP. Originally from LinkedIn. |
| [OpenMetadata](https://github.com/open-metadata/OpenMetadata) | Apache-2.0 | 8.2k | Open context layer for data + AI: 130+ connectors, MCP server, semantic search, governance, lineage. Gives AI agents governed access to enterprise data assets. |
| [erpnext-mcp-server](https://github.com/rakeshgangwar/erpnext-mcp-server) | MIT | 104 | MCP server bridging AI assistants to ERPNext/Frappe — natural language queries against ERP data. |
| [Twenty](https://github.com/twentyhq/twenty) | Apache-2.0 | 45.5k | Open-source Salesforce alternative. Cloud workspaces ship with native MCP server — AI agents connect directly to CRM data. |

---

## Protocol Standards (2026)

| Protocol | Owner | Adoption | Role |
|----------|-------|---------|------|
| MCP (Model Context Protocol) | Anthropic → Linux Foundation Agentic AI Foundation (Dec 2025) | 5,500+ servers; 28% of Fortune 500 have implemented MCP servers; supported natively by Anthropic/OpenAI/Google/Microsoft | Standard for connecting agents to tools and data — "the HTTP of AI agents" |
| A2A (Agent-to-Agent) | Google → Linux Foundation (2026) | 150+ orgs in production; ADK 1.0 GA in Python/Go/Java/TypeScript | Standard for agents to discover and call each other across organizational/vendor boundaries |

---

## Framework Selection Guide

| Use Case | Recommended Framework | Why |
|----------|----------------------|-----|
| Complex stateful workflows, regulated industries | LangGraph | Persistent state, HITL, full audit trail |
| Team of specialized agents, rapid prototyping | CrewAI | Role abstraction, fast iteration |
| Visual builder, RAG + agents, non-technical users | Dify | All-in-one, observability out of the box |
| .NET / Azure enterprise stack | Microsoft Agent Framework (MAF) | LTS, A2A + MCP, Semantic Kernel foundation |
| Integration-heavy workflows, 400+ systems | n8n | Broadest connector library |
| Single agent, HuggingFace models | Smolagents | Minimal, code-first, fast |
| Multi-agent federation across org boundaries | Google ADK + A2A | Standard protocol, Linux Foundation governed |

---
*Auto-updated by ingest pipeline — 2026-07-06.*
