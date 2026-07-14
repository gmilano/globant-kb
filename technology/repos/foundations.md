# 🏗️ Foundational Repos — Technology

> Core open source infrastructure to build AI-augmented technology solutions on top of.
> Focus: MIT / Apache 2.0 / MPL-2.0 — licenses Globant can build commercial products on.
> Last updated: 2026-07-14 (v7)

## Inference & LLM Serving

| Repo | License | Stars | Description | Build On? |
|------|---------|-------|-------------|----------|
| [vllm-project/vllm](https://github.com/vllm-project/vllm) | Apache-2.0 | 40k+ | Definitive high-throughput LLM inference engine; PagedAttention; 8,033 tok/s on Blackwell (16.6× Ollama at scale); OpenAI-compatible API | Yes — production GPU serving |
| [ollama/ollama](https://github.com/ollama/ollama) | MIT | 100k+ | Local LLM serving; Apple Silicon + CPU excellence; 45ms TTFT; best single-developer and edge story | Yes — local/edge/dev |
| [ggerganov/llama.cpp](https://github.com/ggerganov/llama.cpp) | MIT | 70k+ | C++ LLM inference; GGUF format; CPU/GPU/Apple Metal; foundation for Ollama and many local tools | Yes — embedded/low-footprint |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Apache-2.0 | 130k+ | ML model hub and inference library; 500k+ models; fine-tuning and training foundation | Yes — model fine-tuning |

## Agent Orchestration Frameworks

| Repo | License | Stars | Description | Build On? |
|------|---------|-------|-------------|----------|
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | 14k+ | Stateful graph-based agent orchestration; HITL interrupt-resume; per-node timeouts; DeltaChannel; v1.0 GA Oct 2025 | Yes — complex stateful agents |
| [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | 52k+ | Role-based multi-agent collaboration; pluggable backends; 100+ crew templates; 5.2M monthly downloads | Yes — task-crew patterns |
| [microsoft/autogen](https://github.com/microsoft/autogen) | MIT | 45k+ | MAF 1.0 GA (Apr 2026): AutoGen + Semantic Kernel merged; Python/.NET/Java; native MCP + A2A; OTel; HITL | Yes — enterprise Microsoft stack |
| [langgenius/dify](https://github.com/langgenius/dify) | Apache-2.0 | 144k+ | Visual LLM workflow builder + RAG + plugin marketplace; 34M active builders; self-hostable | Yes — no/low-code agentic |

## Protocol & Interoperability Standards

| Repo | License | Stars | Description | Build On? |
|------|---------|-------|-------------|----------|
| [modelcontextprotocol/specification](https://github.com/modelcontextprotocol/specification) | Apache-2.0 | 20k+ | MCP 2026-07-28 RC: stateless core, EMA auth, MCP Apps/Tasks extensions; 97M monthly SDK downloads; 10k+ active servers | Yes — tool connectivity standard |
| [google/A2A](https://github.com/google/A2A) | Apache-2.0 | 22k+ | Agent-to-Agent protocol; Linux Foundation governance; 150+ orgs; live in Azure + Bedrock; complements MCP | Yes — multi-agent coordination |

## Infrastructure & DevOps

| Repo | License | Stars | Description | Build On? |
|------|---------|-------|-------------|----------|
| [opentofu/opentofu](https://github.com/opentofu/opentofu) | MPL-2.0 | 23k+ | Terraform OSS replacement after IBM/HashiCorp; ~95% parity; community-governed; CNCF member | Yes — IaC for AI infra |
| [kubernetes/kubernetes](https://github.com/kubernetes/kubernetes) | Apache-2.0 | 110k+ | Container orchestration; standard runtime for all agent workloads; 12M+ deployments globally | Yes — compute substrate |
| [woodpecker-ci/woodpecker](https://github.com/woodpecker-ci/woodpecker) | Apache-2.0 | 4k+ | Lightweight CI/CD; Docker-native; 50 MB RAM; first-class Gitea/Forgejo integration; no vendor lock-in | Yes — self-hosted CI/CD |
| [forgejo/forgejo](https://github.com/forgejo/forgejo) | MIT | 4k+ | Community fork of Gitea; truly open, no corporate strings; self-hosted Git forge; pairs with Woodpecker | Yes — self-hosted Git |

## Observability (LGTM Stack)

| Repo | License | Stars | Description | Build On? |
|------|---------|-------|-------------|----------|
| [grafana/grafana](https://github.com/grafana/grafana) | AGPL-3.0 | 62k+ | Visualization layer of LGTM stack; dashboards, alerts, plugin ecosystem; gold standard 2026 | Yes — observability UI |
| [prometheus/prometheus](https://github.com/prometheus/prometheus) | Apache-2.0 | 54k+ | Metrics collection and alerting; integrates with every LLM serving framework; agent performance baseline | Yes — metrics backbone |
| [grafana/loki](https://github.com/grafana/loki) | AGPL-3.0 | 23k+ | Log aggregation like Prometheus for logs; low-resource; pairs with Grafana | Yes — log aggregation |

## Coding Agents (Open Source Scaffolds)

| Repo | License | Stars | Description | Build On? |
|------|---------|-------|-------------|----------|
| [All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands) | Apache-2.0 | 40k+ | Production coding agent; 72% SWE-bench Verified; web UI + VSCode; Docker sandboxing; RBAC + audit trails | Yes — enterprise coding agent |
| [princeton-nlp/SWE-agent](https://github.com/princeton-nlp/SWE-agent) | MIT | 15k+ | Agent-Computer Interface (ACI); canonical research scaffold; Mini-SWE-Agent variant 74% Verified in 100 lines | Yes — research and security agents |
| [anomalyco/opencode](https://github.com/anomalyco/opencode) | MIT | 181k+ | Most-starred OSS coding agent 2026; terminal+desktop+IDE; 75+ providers; privacy-first; 7.5M monthly devs | Yes — dev-facing agent |

---
*v7 — Updated 2026-07-14*
