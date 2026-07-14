# Foundational Repos — Technology

> The essential open source foundations for building AI-powered technology products.
> All permissive licenses (MIT / Apache 2.0) unless noted.
> Last updated: 2026-07-14 (v6)

## AI Coding Agents

| Repo | License | Stars | Why It's Foundational |
|------|---------|-------|-----------------------|
| [All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands) | MIT | 79.6k | Best open-source end-to-end software engineering agent. 72% SWE-bench Verified. Enterprise GA. Runs Claude, GPT-5, Gemini, local LLMs via Ollama. |
| [anomalyco/opencode](https://github.com/anomalyco/opencode) | MIT | 165k | Most-starred open coding agent, 2026. Provider-agnostic CLI. Default replacement for Gemini CLI. |
| [Aider-AI/aider](https://github.com/Aider-AI/aider) | Apache-2.0 | 42.4k | Git-native AI pair programmer. Best-in-class diff application and commit hygiene. Supports all frontier models. |
| [princeton-nlp/SWE-agent](https://github.com/princeton-nlp/SWE-agent) | MIT | 15k | Original SWE-bench agent from Princeton NLP. Foundational research; ACI (Agent-Computer Interface) pattern. |

## Multi-Agent Frameworks

| Repo | License | Stars | Why It's Foundational |
|------|---------|-------|-----------------------|
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | 18k | Production standard for stateful, auditable agentic workflows. HITL checkpoints. v0.4. Used in 1,500+ orgs. |
| [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | 52.8k | Fastest prototype path for role-based multi-agent systems. v0.105. 5.2M monthly installs. |
| [microsoft/autogen](https://github.com/microsoft/autogen) | MIT | 58.7k | Microsoft's multi-agent framework (now MAF). Conversational multi-agent with tool use. AutoGen 1.0 GA. |
| [geekan/MetaGPT](https://github.com/geekan/MetaGPT) | MIT | 67.9k | Software company in a box: one prompt → PRD + architecture + code + tests. Role-based agent simulation. |
| [huggingface/smolagents](https://github.com/huggingface/smolagents) | Apache-2.0 | 27.7k | Minimal, code-first agent framework from Hugging Face. Agents write and execute Python. Any HF model. |

## LLM App Platforms

| Repo | License | Stars | Why It's Foundational |
|------|---------|-------|-----------------------|
| [langgenius/dify](https://github.com/langgenius/dify) | Apache-2.0 | 143k | Battle-tested LLM app platform. RAG pipelines, agentic workflows, 100k+ deployments. Go-to for enterprise LLMOps. |
| [langflow-ai/langflow](https://github.com/langflow-ai/langflow) | MIT | 146k | Visual low-code agent builder. Best for rapid prototyping + non-technical stakeholder demos. |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | Apache-2.0* | 182k | Open-source workflow automation, 400+ integrations. 2026: AI-native agentic node support. Self-hostable. |
| [FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise) | Apache-2.0 | 51k | Node-based low-code LLM app builder. 500+ integrations, easy Docker deploy. |

## MLOps & LLMOps

| Repo | License | Stars | Why It's Foundational |
|------|---------|-------|-----------------------|
| [mlflow/mlflow](https://github.com/mlflow/mlflow) | Apache-2.0 | 20k+ | De facto open-source ML lifecycle platform. 30M+ monthly downloads. Linux Foundation. Experiment tracking, model registry, AI gateway. |
| [kubeflow/kubeflow](https://github.com/kubeflow/kubeflow) | Apache-2.0 | 10.3k | Kubernetes-native ML orchestration. CNCF project. Best for teams already on K8s. Pipelines record runs, params, metrics. |
| [iterative/dvc](https://github.com/iterative/dvc) | Apache-2.0 | 14k | Data and pipeline versioning alongside code. 100% open source. Acquired by lakeFS (Nov 2025), license unchanged. |
| [ray-project/ray](https://github.com/ray-project/ray) | Apache-2.0 | 35k | Distributed Python framework. Ray Serve for model serving, Ray Train for distributed training, RLlib for RL. |
| [evidentlyai/evidently](https://github.com/evidentlyai/evidently) | Apache-2.0 | 6k | ML model monitoring and observability. Drift detection, data quality, LLM evals. |

## MCP Infrastructure

| Repo | License | Stars | Why It's Foundational |
|------|---------|-------|-----------------------|
| [modelcontextprotocol/python-sdk](https://github.com/modelcontextprotocol/python-sdk) | MIT | 8k+ | Official Python SDK for MCP. Tier 1 — first to ship each spec update. Essential for any Python-based MCP server. |
| [modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk) | MIT | 6k+ | Official TypeScript SDK for MCP. Tier 1. Foundation for Node/edge MCP servers. |
| [jlowin/fastmcp](https://github.com/jlowin/fastmcp) | MIT | 8k | High-level Pythonic MCP server builder. Decorator-based API. Build production MCP servers in < 50 lines. |

## Benchmarks & Evals

| Repo | License | Stars | Why It's Foundational |
|------|---------|-------|-----------------------|
| [swe-bench/SWE-bench](https://github.com/swe-bench/SWE-bench) | MIT | 4k | The gold-standard coding agent benchmark (SWE-bench Verified and Pro). Use to measure agent performance before shipping. |
| [BerriAI/litellm](https://github.com/BerriAI/litellm) | MIT | 20k+ | Unified API for 100+ LLMs. Router, fallbacks, cost tracking. Use as an AI gateway layer in any platform. |

---
*See also: `verticals/solutions.md` for complete vertical platforms.*
