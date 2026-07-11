# Top AI Agents & Frameworks — Enterprise

> Open source AI agents and orchestration frameworks for enterprise. Focus: MIT / Apache 2.0 / permissive licenses Globant can build on.
> Last updated: 2026-07-11 (v3)

## Agent Orchestration Frameworks

| Name | License | Stars | Org | Description | Key Differentiator |
|------|---------|-------|-----|-------------|-------------------|
| [LangGraph](https://github.com/langchain-ai/langgraph) | MIT (library) | ~34.5k | LangChain AI | Stateful, graph-based agent orchestration with durable execution, checkpointing, and human-in-the-loop | Largest production footprint in 2026; deployed at Uber, Klarna, LinkedIn; de-facto enterprise standard |
| [CrewAI](https://github.com/crewAIInc/crewAI) | MIT | ~54.2k | CrewAI Inc | Role-playing multi-agent framework for collaborative AI workflows with memory, tools, and delegation | Fastest prototyping ergonomics; 5.2M downloads/month; 2B+ agent executions in 2025 |
| [Microsoft Agent Framework](https://github.com/microsoft/agent-framework) | MIT | ~11.6k | Microsoft | GA April 2026 — production unification of AutoGen + Semantic Kernel into one .NET/Python SDK | A2A + MCP native; sequential/concurrent/handoff/group-chat/Magentic-One patterns; LTS guaranteed |
| [Dify](https://github.com/langgenius/dify) | Apache-2.0 (core) | ~148k | LangGenius | Visual workflow builder + RAG pipeline + LLMOps observability on one platform | #1 LLM platform by GitHub stars; drag-and-drop agent builder; self-hostable |
| [n8n](https://github.com/n8n-io/n8n) | Fair-code (source) | ~189k | n8n GmbH | Workflow automation with native AI agent nodes, MCP client/server support, and 400+ integrations | Bridges legacy systems to agentic AI; 180k+ stars; best for system-of-record integration |
| [RAGFlow](https://github.com/infiniflow/ragflow) | Apache-2.0 | ~73k | InfiniFlow | Enterprise RAG engine with deep document understanding, citation tracking, and agent capabilities | Deep OCR + table extraction; grounded answers with citations; 2,596% YoY star growth |
| [Smolagents](https://github.com/huggingface/smolagents) | Apache-2.0 | ~27k | Hugging Face | Minimal code-first agent framework with CodeAct execution and OpenTelemetry-native tracing | Minimal footprint; CodeAct; integrates all HF models; OTEL tracing built in |
| [AutoGen](https://github.com/microsoft/autogen) | MIT | ~58.7k | Microsoft Research | Conversational multi-agent framework (maintenance mode; succeeded by Microsoft Agent Framework) | Proven at scale; deep Azure integration; still valid for existing projects |
| [Semantic Kernel](https://github.com/microsoft/semantic-kernel) | MIT | ~27.9k | Microsoft | AI SDK for .NET, Python, Java — plugin system + memory + planners (maintenance, migrating to MAF) | Best-in-class .NET/C# integration; 3-language support; Azure-native plugin ecosystem |
| [Agno](https://github.com/agno-agi/agno) | Apache-2.0 | ~26k | Agno | Lightweight, model-agnostic agent framework with native multimodality and team/role support | Ultra-fast initialization; multimodal out of box; strong for rapid enterprise PoCs |

## Enterprise Infrastructure & Observability

| Name | License | Stars | Description | Use Case |
|------|---------|-------|-------------|----------|
| [Langfuse](https://github.com/langfuse/langfuse) | MIT | ~9k | Open-source LLM engineering platform: tracing, evals, prompt management, datasets; OpenTelemetry-native; ClickHouse backend | Production observability for any agent stack; 2,300+ companies; billions of observations/month |
| [Haystack](https://github.com/deepset-ai/haystack) | Apache-2.0 | ~18k | NLP pipeline framework for search, QA, and document-heavy enterprise workflows | Document-heavy search pipelines; multi-step RAG; modular component design |
| [Flowise](https://github.com/FlowiseAI/Flowise) | Apache-2.0 | ~35k | Low-code visual builder for LLM flows; LangChain-based with REST API output | Low-code agent prototyping for business teams; deployable REST APIs |
| [Mem0](https://github.com/mem0ai/mem0) | Apache-2.0 | ~26k | Persistent memory layer for AI agents: user/session/agent memory management with semantic search | Long-running agents needing conversation history and contextual memory |
| [Agent Governance Toolkit](https://github.com/microsoft/agent-governance-toolkit) | MIT | ~3.2k | Runtime security governance for autonomous AI agents; covers all 10 OWASP Agentic AI Top 10 risks | Policy-as-code with Cedar; sub-millisecond enforcement; Python/TS/.NET/Rust/Go SDKs |
| [MLflow](https://github.com/mlflow/mlflow) | Apache-2.0 | ~20k | ML lifecycle platform: experiment tracking, model registry, observability, AI gateway; Linux Foundation | End-to-end MLOps + agent observability; no enterprise paywall; LF-backed |

## Framework Selection Guide (2026)

| Scenario | Recommended | Reason |
|----------|-------------|--------|
| Complex stateful workflows, human-in-the-loop | **LangGraph** | Graph-based control, checkpointing, durable execution |
| Fast multi-agent prototyping, role-based | **CrewAI** | Fastest time-to-demo; 2B+ executions proven |
| Microsoft / .NET / Azure shops | **Microsoft Agent Framework** | GA v1.0 April 2026; A2A+MCP; LTS guaranteed |
| No-code / low-code workflows | **Dify** or **Flowise** | Visual builders; self-hostable; API-first |
| Legacy system integration | **n8n** | 400+ connectors; AI nodes; MCP native |
| Enterprise RAG / knowledge base | **RAGFlow** | Deep doc understanding; citation-grounded answers |
| Minimal footprint / HF models | **Smolagents** | Code-first; tiny core; OTEL built in |
| Rapid PoC, model-agnostic | **Agno** | Ultra-fast init; multimodal; Apache-2.0 |
| Compliance + runtime safety | **Agent Governance Toolkit** | OWASP agentic risk coverage; Cedar policy-as-code |

---

## License Notes for Globant

| Framework | Can build on? | Notes |
|-----------|---------------|-------|
| LangGraph (library) | ✅ Yes | MIT — no restrictions on library; `langgraph-api` server needs commercial license |
| CrewAI | ✅ Yes | MIT — full commercial use |
| Microsoft Agent Framework | ✅ Yes | MIT — new enterprise standard; April 2026 GA with LTS |
| Dify | ✅ Yes (self-hosted) | Apache-2.0 core; some cloud-only features need Enterprise plan |
| n8n | ⚠️ Check | Fair-code: free for internal use; client-facing production needs enterprise license |
| RAGFlow | ✅ Yes | Apache-2.0 — no restrictions |
| Smolagents | ✅ Yes | Apache-2.0 — no restrictions |
| AutoGen | ✅ Yes | MIT — maintenance mode; prefer MAF for new projects |
| Agno | ✅ Yes | Apache-2.0 — no restrictions |
| Langfuse | ✅ Yes | MIT self-hosted — full data control |
| Agent Governance Toolkit | ✅ Yes | MIT — runtime policy enforcement |
| MLflow | ✅ Yes | Apache-2.0 — Linux Foundation backed |

---
*Auto-updated by ingest pipeline — v3 2026-07-11*
