# Foundational Repos — Technology Industry

> Production-grade open source bases to build on. Active communities, permissive licenses.
> Last updated: 2026-07-10 (v7)

## LLM App & Agent Frameworks

| Repo | License | Stars | Description | AI Base? |
|------|---------|-------|-------------|----------|
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | MIT | 97k | The foundational LLM application framework; chains, RAG, tools, memory; massive ecosystem; use for structured LLM pipelines | Yes — core |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | 12.8k | Graph-based multi-agent orchestration; stateful workflows; LangGraph Platform for hosting; production multi-agent standard | Yes — orchestration |
| [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | 52.8k | Role-based agent crews; 5.2M monthly downloads; A2A protocol; accessible for teams new to multi-agent | Yes — agent crews |
| [huggingface/smolagents](https://github.com/huggingface/smolagents) | Apache-2.0 | 27.7k | Minimal CodeAgent framework; agents write executable Python; strong HuggingFace Hub + model integration | Yes — lightweight |
| [All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands) | MIT | 79.6k | Full autonomous software engineer; SWE-bench 72%; Docker sandboxed; OpenHands SDK for extending agents | Yes — coding agent |
| [bytedance/deer-flow](https://github.com/bytedance/deer-flow) | Apache-2.0 | ~47k | ByteDance super-agent harness; sandboxed FS + persistent memory + skills + sub-agent orchestration; built on LangGraph; best for long-horizon tasks | Yes — super-agent |
| [cline/cline](https://github.com/cline/cline) | Apache-2.0 | ~60k | Autonomous coding agent as SDK + IDE extension (VS Code + all JetBrains) + CLI; 1.5M installs; multi-agent; BYOK | Yes — coding agent |

## LLM App Builders & Low-Code

| Repo | License | Stars | Description | AI Base? |
|------|---------|-------|-------------|----------|
| [langgenius/dify](https://github.com/langgenius/dify) | Apache-2.0 | 144k | Visual LLM app builder; RAG pipelines, chatbots, agents, workflows; self-hosted; 50+ tools built-in; MCP support | Yes — app platform |
| [FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise) | Apache-2.0 | 51k | Drag-and-drop LangChain visual builder; best for LangChain-style prototyping; self-hosted Node.js | Yes — visual builder |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | Source-Available (fair-code) | 182k | Workflow automation with 400+ integrations + AI nodes; AI as one step in larger workflows; HITL built-in | Yes — workflow AI |

## Open Source LLM Models (2026 Leaders)

| Model | License | Org | Description |
|-------|---------|-----|-------------|
| Qwen3 235B-A22B | Apache-2.0 | Alibaba | Leads 2026 open-source benchmarks (coding, reasoning, multilingual); 235B total / 22B active parameters (MoE); top-tier for self-hosted enterprise |
| DeepSeek R1 | MIT | DeepSeek | 95%+ GPT-4 quality at ~10% cost; default choice for cost-sensitive teams; chain-of-thought reasoning |
| Llama 4 Scout | Meta Community | Meta | Strong local inference; GPU-friendly; default open model for US enterprise air-gapped deployments |
| Gemma 4 | Apache-2.0 | Google | Lightweight, deployable on standard GPUs; strong for edge/mobile agent scenarios |
| Phi 4 | MIT | Microsoft | Strong for code + reasoning at small parameter count; fits in consumer GPU |

## MLOps & ML Infrastructure

| Repo | License | Stars | Description | AI Base? |
|------|---------|-------|-------------|----------|
| [mlflow/mlflow](https://github.com/mlflow/mlflow) | Apache-2.0 | 20k | ML lifecycle management: experiment tracking, model registry, deployment; 30M monthly PyPI downloads; Linux Foundation | Yes — ML lifecycle |
| [kubeflow/kubeflow](https://github.com/kubeflow/kubeflow) | Apache-2.0 | 33.1k | ML on Kubernetes: pipelines, training operators, serving, notebooks; CNCF project; 3,000+ contributors | Yes — K8s ML |
| [apache/airflow](https://github.com/apache/airflow) | Apache-2.0 | 40k | Workflow orchestration for data pipelines; Python DAGs; 1,000+ providers; pairs with MLflow for ML pipelines | Yes — orchestration |
| [PrefectHQ/prefect](https://github.com/PrefectHQ/prefect) | Apache-2.0 | 17k | Modern Python workflow orchestration; better DX than Airflow; native async; Prefect Cloud or self-hosted | Yes — data workflows |
| [ray-project/ray](https://github.com/ray-project/ray) | Apache-2.0 | 36k | Distributed compute for AI/ML; scales Python workloads; Ray Serve for model serving; Ray Data for large datasets | Yes — distributed |

## Vector Stores & AI Data

| Repo | License | Stars | Description | AI Base? |
|------|---------|-------|-------------|----------|
| [qdrant/qdrant](https://github.com/qdrant/qdrant) | Apache-2.0 | 23k | Rust-native vector similarity search; gRPC + REST; filtering; hybrid search; best performance benchmark 2026 | Yes — vector DB |
| [weaviate/weaviate](https://github.com/weaviate/weaviate) | BSD-3 | 13k | Vector + keyword hybrid search; built-in ML models; multi-modal; GraphQL API; strong for semantic search | Yes — vector DB |
| [chroma-core/chroma](https://github.com/chroma-core/chroma) | Apache-2.0 | 19k | Simplest vector store; Python-first; in-memory or persistent; default for LangChain/Dify RAG prototyping | Yes — RAG store |

## Developer Infrastructure

| Repo | License | Stars | Description | AI Base? |
|------|---------|-------|-------------|----------|
| [backstage/backstage](https://github.com/backstage/backstage) | Apache-2.0 | 29k | Spotify's developer portal; plugin ecosystem; software catalog; AI plugin layer for internal developer assistants | Yes — dev portal |
| [grafana/grafana](https://github.com/grafana/grafana) | AGPL-3.0 | 66k | Observability dashboards; integrates with Prometheus, Loki, Tempo; AI anomaly detection plugins | Yes — observability |
| [prometheus/prometheus](https://github.com/prometheus/prometheus) | Apache-2.0 | 57k | De-facto metrics standard; scrapes + stores time-series; pairs with Grafana; foundation for AI alerting agents | Yes — monitoring |

---
*See also: `verticals/solutions.md` for full vertical platforms.*
