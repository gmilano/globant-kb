# Top AI Agents & Frameworks — Enterprise

> Open source AI agents and orchestration frameworks for enterprise. Focus: MIT / Apache 2.0 / permissive licenses Globant can build on.
> Last updated: 2026-07-13 (v6)

## Agent Orchestration Frameworks

| Name | License | Stars | Org | Description | Key Differentiator |
|------|---------|-------|-----|-------------|-------------------|
| [LangGraph](https://github.com/langchain-ai/langgraph) | MIT | ~34k | LangChain AI | Stateful, graph-based agent orchestration; durable execution, checkpointing, HITL; v1.0 GA Oct 2025 | Production leader: 34.5M monthly downloads; Uber, Klarna, LinkedIn production; gold standard for compliance audit trails |
| [CrewAI](https://github.com/crewAIInc/crewAI) | MIT | ~44k | CrewAI Inc | Role-playing multi-agent framework for collaborative AI workflows with memory, tools, and delegation | Fastest prototyping; 5.2M downloads/month; ~60% Fortune 500 adoption for business automation |
| [Microsoft Agent Framework](https://github.com/microsoft/agent-framework) | MIT | ~11.6k | Microsoft | GA April 2026 — production unification of AutoGen + Semantic Kernel into one .NET/Python SDK | A2A + MCP native; sequential/concurrent/handoff/Magentic-One; LTS; BUILD 2026: Agent Harness + Hosted Agents added |
| [Strands Agents](https://github.com/strands-agents/harness-sdk) | Apache-2.0 | ~6.1k | AWS | Model-driven agent SDK; same framework AWS uses internally for Amazon Q Developer, AWS Glue, VPC Reachability Analyzer | 16.7M downloads/month (Jun 2026); Bedrock AgentCore native; OTEL; Accenture/PwC contributors |
| [Google ADK 2.0](https://github.com/google/adk-python) | Apache-2.0 | ~20.1k | Google | Code-first agent toolkit; Python/TS/Go/Java/Kotlin; graph workflows; multi-agent collaboration; Vertex AI Agent Runtime | ADK 2.0 GA: fastest-growing agent framework at launch; Moody's, D&B production; native Agent Runtime on Vertex |
| [Dify](https://github.com/langgenius/dify) | Apache-2.0 | ~144k | LangGenius | Visual workflow builder + RAG pipeline + LLMOps observability on one platform; 100+ LLM providers | #1 LLM platform by stars; only framework with full GUI + self-hostable + production RAG; no-code teams |
| [n8n](https://github.com/n8n-io/n8n) | Fair-code | ~182k | n8n GmbH | Workflow automation with native AI agent nodes, MCP client/server support, and 500+ integrations | Integration bridge: legacy ERP/CRM/email/Slack → AI agents; highest star count of any workflow tool |
| [RAGFlow](https://github.com/infiniflow/ragflow) | Apache-2.0 | ~73k | InfiniFlow | Enterprise RAG engine with deep document understanding, citation tracking, and agent capabilities | Deep OCR + table extraction; grounded answers with citations; 2,596% YoY star growth |
| [Agno](https://github.com/agno-agi/agno) | MIT | ~39.8k | Agno AGI | High-performance agent framework; AgentOS control plane with RBAC, session/memory/trace persistence in your DB | Rebranded from Phidata Jan 2025; 39.8k ★; data sovereignty focus; multimodal; rapid PoC-to-production |
| [OpenAI Agents SDK](https://github.com/openai/openai-agents-python) | MIT | ~25.6k | OpenAI | Multi-agent workflows with Handoffs, Guardrails, and Tracing; provider-agnostic (100+ LLMs) | Enterprise sandboxing added Apr 2026; successor to Swarm; TypeScript companion SDK |
| [PydanticAI](https://github.com/pydantic/pydantic-ai) | MIT | ~18.4k | pydantic | Type-safe agent framework with model-agnostic support (OpenAI/Anthropic/Gemini/Ollama/Bedrock) and durable execution | Best for validated structured outputs; finance/legal/data pipelines; Pydantic Logfire native tracing |
| [Smolagents](https://github.com/huggingface/smolagents) | Apache-2.0 | ~27k | Hugging Face | Minimal code-first agent framework with CodeAct execution and OpenTelemetry-native tracing | Minimal footprint; CodeAct; integrates all HF models; OTEL tracing built in |
| [Mastra](https://github.com/mastra-ai/mastra) | Apache-2.0 | ~26k | Mastra AI (YC W25) | Modern TypeScript/Node.js agent framework; v1.0 GA Jan 2026; graph workflows, memory, tools, MCP, observability; $22M Series A Apr 2026 | 1.8M npm downloads/month; production at Replit/SoftBank/PayPal/Plaid/Marsh McLennan; enterprise RBAC/SSO under Enterprise License |
| [LlamaIndex Workflows](https://github.com/run-llama/llama_index) | MIT | ~42k | LlamaIndex | Workflows 1.0 stable (Jun 2026): event-driven typed step composition for multi-step LLM apps; async-first; replaces older query-engine assembly pattern | De-facto standard for event-driven agentic pipelines; typed events prevent schema drift in production |
| [AutoGen](https://github.com/microsoft/autogen) | MIT | ~40k | Microsoft Research | Conversational multi-agent framework — **now in maintenance mode; succeeded by Microsoft Agent Framework** | Still valid for existing deployments; migrate to MAF for new projects |
| [Semantic Kernel](https://github.com/microsoft/semantic-kernel) | MIT | ~27.9k | Microsoft | AI SDK for .NET, Python, Java — **now in maintenance mode; migrating to MAF** | Best-in-class .NET/C# plugin ecosystem; 3-language support |

## Enterprise Infrastructure & Observability

| Name | License | Stars | Description | Use Case |
|------|---------|-------|-------------|----------|
| [Langfuse](https://github.com/langfuse/langfuse) | MIT | ~9k | Open-source LLM engineering platform: tracing, evals, prompt management, datasets; OpenTelemetry-native; ClickHouse backend (joined Jan 2026) | Production observability for any agent stack; 2,300+ companies; billions of observations/month |
| [Haystack](https://github.com/deepset-ai/haystack) | Apache-2.0 | ~18k | NLP pipeline framework for search, QA, and document-heavy enterprise workflows | Document-heavy search pipelines; multi-step RAG; modular component design |
| [Flowise](https://github.com/FlowiseAI/Flowise) | Apache-2.0 | ~35k | Low-code visual builder for LLM flows; LangChain-based with REST API output | Low-code agent prototyping for business teams; deployable REST APIs |
| [Mem0](https://github.com/mem0ai/mem0) | Apache-2.0 | ~26k | Persistent memory layer for AI agents: user/session/agent memory management with semantic search | Long-running agents needing conversation history and contextual memory |
| [Agent Governance Toolkit](https://github.com/microsoft/agent-governance-toolkit) | MIT | ~3.2k | Runtime security governance for autonomous AI agents; covers all 10 OWASP Agentic AI Top 10 risks; EU AI Act Aug 2026 | Policy-as-code with Cedar; sub-millisecond enforcement; Python/TS/.NET/Rust/Go SDKs |
| [MLflow](https://github.com/mlflow/mlflow) | Apache-2.0 | ~20k | ML lifecycle platform: experiment tracking, model registry, observability, AI gateway; Linux Foundation | End-to-end MLOps + agent observability; no enterprise paywall; LF-backed |

## Framework Selection Guide (2026)

| Scenario | Recommended | Reason |
|----------|-------------|--------|
| Complex stateful workflows, human-in-the-loop | **LangGraph** | Graph-based control, checkpointing, durable execution; 34.5M downloads/month; production leader |
| Fast multi-agent prototyping, role-based | **CrewAI** | Fastest time-to-demo; 5.2M downloads/month; ~60% Fortune 500 business automation |
| Microsoft / .NET / Azure shops | **Microsoft Agent Framework** | GA v1.0 April 2026; A2A+MCP; LTS; Agent Harness + Hosted Agents added at BUILD 2026 |
| AWS / Bedrock shops | **Strands Agents** | Same SDK AWS runs in production; 16.7M downloads/month; Bedrock AgentCore native |
| Google Cloud / Vertex AI shops | **Google ADK 2.0** | Apache-2.0; Python/TS/Go/Java/Kotlin; Vertex AI Agent Runtime; Moody's/D&B reference deployments |
| TypeScript / Node.js / full-stack teams | **Mastra** | Apache-2.0; v1.0 GA; 1.8M npm/month; graph workflows + memory + MCP + OTEL in one TS SDK |
| No-code / low-code workflows | **Dify** or **Flowise** | Visual builders; self-hostable; API-first |
| Legacy system integration | **n8n** | 500+ connectors; AI nodes; MCP native |
| Enterprise RAG / knowledge base | **RAGFlow** | Deep doc understanding; citation-grounded answers |
| Type-safe structured outputs (finance/legal) | **PydanticAI** | Validation at model boundary; durable execution; Logfire tracing |
| Event-driven multi-step LLM pipelines | **LlamaIndex Workflows 1.0** | Typed events; async steps; stable API; replaces monolithic query-engine patterns |
| Data sovereignty / RBAC control | **Agno (AgentOS)** | RBAC + self-hosted trace/memory/knowledge in your own DB |
| OpenAI API-first / rapid agent build | **OpenAI Agents SDK** | Enterprise sandboxing; provider-agnostic; TS companion |
| Minimal footprint / HF models | **Smolagents** | Code-first; tiny core; OTEL built in |
| Compliance + runtime safety (EU AI Act) | **Agent Governance Toolkit** | OWASP agentic risk coverage; Cedar policy-as-code; GPAI/Article 50 Aug 2026 |

---

## License Notes for Globant

| Framework | Can build on? | Notes |
|-----------|---------------|-------|
| LangGraph (library) | ✅ Yes | MIT — no restrictions on library; `langgraph-api` server needs commercial license |
| CrewAI | ✅ Yes | MIT — full commercial use |
| Microsoft Agent Framework | ✅ Yes | MIT — new enterprise standard; April 2026 GA with LTS |
| Strands Agents | ✅ Yes | Apache-2.0 — AWS-backed production-proven; 16.7M downloads/month |
| Google ADK | ✅ Yes | Apache-2.0 — full commercial use; multi-language (Python/TS/Go/Java/Kotlin) |
| Dify | ✅ Yes (self-hosted) | Apache-2.0 core; some cloud-only features need Enterprise plan |
| n8n | ⚠️ Check | Fair-code: free for internal use; client-facing production needs enterprise license |
| RAGFlow | ✅ Yes | Apache-2.0 — no restrictions |
| Smolagents | ✅ Yes | Apache-2.0 — no restrictions |
| AutoGen | ✅ Yes | MIT — maintenance mode; prefer MAF for new projects |
| Agno | ✅ Yes | MIT — AgentOS enterprise control plane; data sovereignty |
| OpenAI Agents SDK | ✅ Yes | MIT — provider-agnostic; 25.6k ★ |
| PydanticAI | ✅ Yes | MIT — type-safe; durable execution; Logfire tracing |
| Mastra | ✅ Yes (core) | Apache-2.0 core — 1.8M npm/month; Enterprise License for RBAC/SSO (source-available) |
| LlamaIndex Workflows | ✅ Yes | MIT — stable Workflows 1.0; event-driven typed composition |
| Langfuse | ✅ Yes | MIT self-hosted — full data control |
| Agent Governance Toolkit | ✅ Yes | MIT — runtime policy enforcement |
| MLflow | ✅ Yes | Apache-2.0 — Linux Foundation backed |

---
*Auto-updated by ingest pipeline — v6 2026-07-13*
