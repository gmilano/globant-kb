# Top AI Agents & Frameworks — Enterprise

> Open source AI agents and orchestration frameworks for enterprise. Focus: MIT / Apache 2.0 / permissive licenses Globant can build on.
> Last updated: 2026-07-11

## Agent Orchestration Frameworks

| Name | License | Stars | Description | Key Differentiator |
|------|---------|-------|-------------|-------------------|
| [LangGraph](https://github.com/langchain-ai/langgraph) | MIT (library) / ELv2 (server) | ~34.5k | Stateful, graph-based agent orchestration with durable execution and checkpointing | Production at Uber, Klarna, LinkedIn; human-in-the-loop built in |
| [CrewAI](https://github.com/crewAIInc/crewAI) | MIT | ~54.2k | Role-playing multi-agent framework for collaborative AI workflows | Fastest multi-agent prototyping; 5.2M downloads/month; 2B+ executions in 2025 |
| [Microsoft Agent Framework](https://github.com/microsoft/agent-framework) | MIT | ~11.6k | GA April 2026 — unifies AutoGen + Semantic Kernel into one production SDK for .NET and Python | A2A + MCP support; enterprise middleware; .NET-native for Microsoft shops |
| [Dify](https://github.com/langgenius/dify) | Apache-2.0 (core) | ~148k | Visual workflow builder + RAG pipeline + LLMOps observability on one platform | #1 LLM platform by stars; self-hostable; drag-and-drop agent builder |
| [n8n](https://github.com/n8n-io/n8n) | Fair-code (Apache-2.0 + source) | ~189k | Workflow automation with native AI agent nodes and MCP client/server support | 400+ integrations; native MCP; bridges legacy systems to AI |
| [RAGFlow](https://github.com/infiniflow/ragflow) | Apache-2.0 | ~73k | Enterprise RAG engine with deep document understanding and agent capabilities | Deep OCR, table extraction; grounded answers with citations; 2,596% YoY growth |
| [Smolagents](https://github.com/huggingface/smolagents) | Apache-2.0 | ~27k | HuggingFace minimal agent framework with code-first tool execution | Minimal footprint; CodeAct execution; integrates all HF models |
| [AutoGen](https://github.com/microsoft/autogen) | MIT | ~58.7k | Microsoft's conversational multi-agent framework (maintenance mode; succeeded by MAF) | Proven at scale; deep Azure integration; still widely deployed |
| [Semantic Kernel](https://github.com/microsoft/semantic-kernel) | MIT | ~27.9k | Microsoft AI SDK for .NET, Python, Java — plugin system + memory + planners (maintenance) | Best-in-class .NET/C# integration; 3-language support; Azure native |
| [OpenHands](https://github.com/All-Hands-AI/OpenHands) | MIT | ~68k | SWE-agent running in Docker sandbox; top SWE-bench performer | Full dev environment; code review + PR automation; enterprise DevOps |

## Enterprise Infrastructure Agents

| Name | License | Stars | Description |
|------|---------|-------|-------------|
| [Haystack](https://github.com/deepset-ai/haystack) | Apache-2.0 | ~18k | NLP pipeline framework for search, QA, and document-heavy enterprise workflows |
| [Flowise](https://github.com/FlowiseAI/Flowise) | Apache-2.0 | ~35k | Low-code visual builder for LLM flows; Langchain-based, REST API output |
| [MaxKB](https://github.com/1Panel-dev/MaxKB) | GPL-3.0 | ~14k | Enterprise knowledge base platform built on RAG; multi-model; webhook integrations |
| [Mem0](https://github.com/mem0ai/mem0) | Apache-2.0 | ~26k | Persistent memory layer for AI agents; user/session/agent memory management |
| [Agno](https://github.com/agno-agi/agno) | Apache-2.0 | ~26k | Lightweight, model-agnostic agent framework with native multimodality and team support |

---

## License Notes for Globant

| Framework | Can build on? | Notes |
|-----------|---------------|-------|
| LangGraph (library) | ✅ Yes | MIT — no restrictions; the `langgraph-api` server runtime requires commercial license |
| CrewAI | ✅ Yes | MIT — full commercial use |
| Microsoft Agent Framework | ✅ Yes | MIT — new standard for .NET enterprise |
| Dify | ✅ Yes (self-hosted) | Apache-2.0 core; some cloud-only features need Enterprise plan |
| n8n | ⚠️ Check | Fair-code: free for internal use; client production deployments need enterprise license |
| RAGFlow | ✅ Yes | Apache-2.0 — no restrictions |
| Smolagents | ✅ Yes | Apache-2.0 — no restrictions |
| AutoGen | ✅ Yes | MIT — maintenance mode but stable |

---
*Auto-updated by ingest pipeline.*
