# Vertical Platforms — Technology

> Existing open source platforms that can be customized with AI on top.
> Model: start with something functional, add an agentic layer.
> Last updated: 2026-07-14 (v6)

## Core Platforms (Start Here)

| Platform | License | URL | Stack | AI Use Case |
|----------|---------|-----|-------|-------------|
| **Dify** | Apache-2.0 | [github.com/langgenius/dify](https://github.com/langgenius/dify) | Python + Next.js | End-to-end LLM app platform: RAG pipelines, visual workflow builder, agentic orchestration, 100k+ enterprise deployments. Self-hostable. The OSS alternative to Microsoft Copilot Studio. |
| **n8n** | Apache-2.0* | [github.com/n8n-io/n8n](https://github.com/n8n-io/n8n) | Node.js | Workflow automation with 400+ integrations + native AI agent nodes. Replaces Zapier/Make with a self-hosted, AI-native alternative. 182k stars. |
| **Langflow** | MIT | [github.com/langflow-ai/langflow](https://github.com/langflow-ai/langflow) | Python + React | Visual drag-and-drop AI agent builder. Best for rapid prototyping, demos, and non-technical stakeholders. 146k stars. |
| **Flowise** | Apache-2.0 | [github.com/FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise) | Node.js | Low-code node-based LLM app builder. 500+ integrations, easy Docker deploy. 51k stars. Alternative UI to Langflow. |
| **OpenHands** | MIT | [github.com/All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands) | Python | Full software engineering agent platform. Enterprise GA. Use as the agentic backbone for custom software factories. |

## MLOps & LLMOps Platforms

| Platform | License | URL | Stack | AI Use Case |
|----------|---------|-----|-------|-------------|
| **MLflow** | Apache-2.0 | [github.com/mlflow/mlflow](https://github.com/mlflow/mlflow) | Python | ML lifecycle management: experiment tracking, model registry, AI gateway, prompt management. Linux Foundation. 30M+ monthly downloads. The reference MLOps platform. |
| **Kubeflow** | Apache-2.0 | [github.com/kubeflow/kubeflow](https://github.com/kubeflow/kubeflow) | Python + K8s | Kubernetes-native ML pipelines and training. CNCF. Best when client is already on K8s. Combines with MLflow for tracking. |
| **Ray** | Apache-2.0 | [github.com/ray-project/ray](https://github.com/ray-project/ray) | Python | Distributed Python: Ray Serve (model serving), Ray Train (distributed training), RLlib (RL). 35k stars. |
| **Evidently** | Apache-2.0 | [github.com/evidentlyai/evidently](https://github.com/evidentlyai/evidently) | Python | ML monitoring, drift detection, LLM evals. Add this on top of any model deployment for observability. |
| **DVC** | Apache-2.0 | [github.com/iterative/dvc](https://github.com/iterative/dvc) | Python | Data + pipeline versioning alongside Git. Pairs with MLflow. Acquired by lakeFS (Nov 2025), OSS unchanged. |

## MCP-Enabled Infrastructure

| Platform | License | URL | Use Case |
|----------|---------|-----|----------|
| **FastMCP** | MIT | [github.com/jlowin/fastmcp](https://github.com/jlowin/fastmcp) | Build MCP servers in < 50 lines Python. Turn any internal tool, API, or database into an MCP resource. |
| **MCP Python SDK** | MIT | [github.com/modelcontextprotocol/python-sdk](https://github.com/modelcontextprotocol/python-sdk) | Official SDK. Tier 1 (ships each spec update first). Foundation for Python MCP servers. RC 2026-07-28 compliant. |
| **LiteLLM** | MIT | [github.com/BerriAI/litellm](https://github.com/BerriAI/litellm) | Unified proxy/router for 100+ LLMs. Rate limiting, cost tracking, fallbacks. Acts as AI gateway layer in any platform. |

## How to Customize with AI

### Pattern: Add an Agentic Layer to Any Platform

```
1. Start with a foundational platform (e.g., Dify, n8n, Flowise)
2. Connect to client's internal tools via MCP servers (FastMCP)
3. Route LLM calls through LiteLLM for model flexibility + cost control
4. Add OpenHands for autonomous software tasks
5. Track experiments and model performance in MLflow
6. Monitor drift and LLM output quality with Evidently
7. Wrap everything in a conversational UI (Dify or Langflow)
```

### LATAM Considerations

- **Ollama** (MIT) for on-premise model serving in data-sovereign contexts (Brazil LGPD, Argentina PDPA)
- **n8n** self-hosted for enterprises that can't use SaaS workflow tools
- **Langflow** for Spanish/Portuguese-language demos and stakeholder workshops
- All MLOps platforms are cloud-agnostic and work with AWS São Paulo, GCP São Paulo, and Azure Brazil South regions
