# Foundational Repos — Technology / Software Development AI

> Core open-source foundations to build on. Active communities, permissive licenses.
> Updated: 2026-07-09.

## AI Coding Agents & Frameworks

| Repo | License | Stars | Description | Best For |
|------|---------|-------|-------------|----------|
| [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) | MIT | 79.6k | Full AI software engineering agent. Browser, shell, file editor, code interpreter in a Docker sandbox. SWE-bench Verified 72-77.6%. Enterprise Control Plane GA. | Autonomous dev agent, enterprise coding platform |
| [FoundationAgents/MetaGPT](https://github.com/FoundationAgents/MetaGPT) | MIT | 67.9k | Multi-agent software company (PM → Architect → Dev → QA → Data Analyst). Natural language → working codebase. | Greenfield product generation, AI software teams |
| [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | 52.8k | Role-based multi-agent orchestration. 5.2M monthly pip installs. Large ecosystem of pre-built tools and integrations. | Multi-agent pipelines, task automation |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | 12.8k | Stateful graph runtime for agents. Cycles, branching, human-in-the-loop, persistence. Most mature production agent framework. | Long-running stateful agents, workflow orchestration |
| [huggingface/smolagents](https://github.com/huggingface/smolagents) | Apache-2.0 | 27.7k | Minimal code-first agent framework by Hugging Face. Agents write Python to call tools. Cheapest per-token execution among major frameworks. | Fast iteration, open-weight model agents |
| [Aider-AI/aider](https://github.com/Aider-AI/aider) | Apache-2.0 | 32k | Terminal pair-programming AI. Edits multiple files per request, commits to Git, supports 100+ LLMs. Industry gold standard for interactive coding assistance. | Day-to-day dev assistance, legacy code refactoring |
| [princeton-nlp/SWE-agent](https://github.com/princeton-nlp/SWE-agent) | MIT | 15.2k | Academic-origin coding agent with Agent-Computer Interface (ACI). SWE-bench reference implementation, benchmark harness. | Evaluation, research, autonomous bug fixing |

## Low-Code & Platform

| Repo | License | Stars | Description | Best For |
|------|---------|-------|-------------|----------|
| [langgenius/dify](https://github.com/langgenius/dify) | Apache-2.0 | 144k | LLM application development platform. Visual workflow builder, RAG, MCP client, 50+ built-in tools, self-hosted. Fastest-growing agent platform in 2026. | Rapid prototyping, non-dev users, RAG apps |
| [microsoft/autogen](https://github.com/microsoft/autogen) | Apache-2.0 | 42k | Multi-agent conversation framework (maintenance mode; merged into Microsoft Agent Framework). Still the most-forked multi-agent codebase. | Enterprise Microsoft ecosystem, established teams |
| [google/adk-python](https://github.com/google/adk-python) | Apache-2.0 | 20k | Google Agent Development Kit. A2A protocol, Gemini/Vertex AI integration, session management. | Google Cloud deployments, A2A multi-agent |

## MLOps & Infrastructure

| Repo | License | Stars | Description | Best For |
|------|---------|-------|-------------|----------|
| [mlflow/mlflow](https://github.com/mlflow/mlflow) | Apache-2.0 | 20k | ML lifecycle management: experiment tracking, model registry, deployment, evaluation. 100% open source, forever free. | ML experiment management, model serving |
| [kubeflow/kubeflow](https://github.com/kubeflow/kubeflow) | Apache-2.0 | 14.5k | Full-featured MLOps platform on Kubernetes. Pipelines, notebooks, model serving, hyperparameter tuning. | Production ML on K8s, enterprise MLOps |
| [iterative/dvc](https://github.com/iterative/dvc) | Apache-2.0 | 14.2k | Data Version Control for ML. Git for data and models. Standard for ML data pipelines. | Data versioning, reproducible ML |
| [evidentlyai/evidently](https://github.com/evidentlyai/evidently) | Apache-2.0 | 6.5k | ML model monitoring and evaluation. Drift detection, data quality, LLM evaluation. Standard for production model monitoring. | LLM/ML observability, regression detection |

## MCP & Agent Integration

| Repo | License | Stars | Description | Best For |
|------|---------|-------|-------------|----------|
| [modelcontextprotocol/python-sdk](https://github.com/modelcontextprotocol/python-sdk) | MIT | 8.2k | Official MCP Python SDK. RC 2026-07-28: stateless core, Tasks extension, OAuth 2.1. 97M monthly downloads across SDKs. | Building MCP servers in Python |
| [modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk) | MIT | 6.5k | Official MCP TypeScript SDK. Native integration in Claude Code, Cursor, VS Code. | MCP servers in Node.js/TypeScript |
| [openai/openai-agents-python](https://github.com/openai/openai-agents-python) | MIT | 14k | OpenAI Agents SDK. Handoffs, guardrails, tracing. Works with any OpenAI-compatible API endpoint. | Multi-agent pipelines, compatible APIs |

---
*See `verticals/solutions.md` for DevOps/observability platforms. See `compose/patterns.md` for wiring these together.*
