# 🏗️ Foundation Repos — Technology Industry

> The bedrock open source projects to build AI solutions on top of.
> All MIT, Apache-2.0, or MPL — commercially safe for Globant engagements.
> Last updated: 2026-07-05

## Agent Frameworks & Orchestration

| Repo | License | Stars | Description | Build On For |
|------|---------|-------|-------------|--------------|
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | MIT | ~100k | Core LLM application framework. Chains, tools, memory, retrievers. The lingua franca of LLM development. | Any LLM app, RAG systems, tool-calling agents |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | ~12.8k | Graph-based stateful agent orchestration. Production standard for complex multi-step agents. | Enterprise agents needing audit trails and rollback |
| [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | ~52k | Role-based multi-agent framework. Define agent roles, goals, backstory; wire into crews. | Multi-agent teams, role-based automation |
| [microsoft/autogen](https://github.com/microsoft/autogen) | MIT | ~42k | Conversational multi-agent framework. Agents talk to each other to solve tasks. | Human-in-the-loop workflows, agentic conversations |
| [huggingface/smolagents](https://github.com/huggingface/smolagents) | Apache-2.0 | ~27.7k | Code-first agents — LLM writes Python to complete tasks. Sandboxed execution. | Open-weight model agents, research workflows |

## LLM Infrastructure & Serving

| Repo | License | Stars | Description | Build On For |
|------|---------|-------|-------------|--------------|
| [vllm-project/vllm](https://github.com/vllm-project/vllm) | Apache-2.0 | ~45k | High-throughput memory-efficient LLM serving engine. PagedAttention for ~24x throughput vs HuggingFace. | On-premise/private LLM serving, batch inference |
| [BerriAI/litellm](https://github.com/BerriAI/litellm) | MIT | ~22k | Universal LLM gateway — 100+ providers (OpenAI, Anthropic, Bedrock, Azure, local) in one API. Cost tracking, load balancing, guardrails. | Multi-provider LLM routing, enterprise cost control |
| [ollama/ollama](https://github.com/ollama/ollama) | MIT | ~120k | Run LLMs locally in one command. macOS, Linux, Windows. REST API + CLI. | Local dev, air-gapped deployments, demos |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Apache-2.0 | ~28k | Memory layer for AI agents. Persistent, intelligent memory across sessions. User/agent/session scopes. | Any stateful AI agent needing memory between interactions |

## LLMOps & Observability

| Repo | License | Stars | Description | Build On For |
|------|---------|-------|-------------|--------------|
| [langfuse/langfuse](https://github.com/langfuse/langfuse) | MIT | ~28k | LLM observability platform. Traces, evals, prompt versioning, datasets. Self-hostable. The open source LangSmith. | All production AI apps — monitoring, debugging, eval |
| [langgenius/dify](https://github.com/langgenius/dify) | Apache-2.0 | ~144k | Full-stack LLMOps platform: visual builder + RAG + agents + monitoring. 50+ LLM providers, 10k+ app templates. | Rapid prototyping, no/low-code AI apps for clients |

## Autonomous Coding Agents

| Repo | License | Stars | Description | Build On For |
|------|---------|-------|-------------|--------------|
| [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) | MIT | ~78k | Autonomous coding agent. Edits files, runs commands, browses web in sandboxed env. SWE-bench 53%+ with Claude. $18.8M Series A. | Software development automation, CI self-healing |
| [SWE-agent/SWE-agent](https://github.com/SWE-agent/SWE-agent) | MIT | ~15k | Automated software engineer from Princeton. ACI (Agent-Computer Interface) standardizes agent-tool interaction. Mini-SWE-Agent: 74% on SWE-bench Verified. | Bug fixing automation, code review, SWE-bench evals |
| [Aider-AI/aider](https://github.com/Aider-AI/aider) | Apache-2.0 | ~41k | Git-aware AI pair programmer. Terminal-based, any LLM. Auto-commits with descriptive messages. New architect/editor model split for efficiency. | Developer productivity augmentation, code editing agents |
| [cline/cline](https://github.com/cline/cline) | Apache-2.0 | ~58k | VS Code autonomous coding agent. File system + terminal + Playwright browser access. 200+ community configs. Most-starred VS Code AI extension. | IDE-embedded agent for developer teams |
| [continuedev/continue](https://github.com/continuedev/continue) | Apache-2.0 | ~31k | Open-source IDE autopilot for VS Code and JetBrains. Configurable to any LLM, 200+ integrations. Best for IDE AI without vendor lock-in. | Code completion + chat for any IDE |
| [block/goose](https://github.com/block/goose) | Apache-2.0 | ~32k | Block's MCP-native developer agent. Extensible via marketplace of MCP extensions. Runs tasks autonomously in terminal. | Tool-augmented developer automation, MCP extension development |
| [TabbyML/tabby](https://github.com/TabbyML/tabby) | Apache-2.0 | ~33k | Self-hosted AI code completion server. Drop-in Copilot replacement via LSP. Fine-tune on client codebase. Enterprise auth + team analytics. | On-prem Copilot alternative for privacy-sensitive clients |

## DevOps & Platform Engineering

| Repo | License | Stars | Description | Build On For |
|------|---------|-------|-------------|--------------|
| [backstage/backstage](https://github.com/backstage/backstage) | Apache-2.0 | ~29k | Developer portal framework (Spotify). Centralize services, APIs, docs, runbooks. Plugin ecosystem with AI add-ons. | Internal Developer Platforms (IDPs) with AI layer |
| [opentofu/opentofu](https://github.com/opentofu/opentofu) | MPL-2.0 | ~24k | Open source Terraform fork (Linux Foundation). Full Terraform HCL compatibility. IaC for any cloud. | Cloud infra provisioning when Terraform BSL is a concern |
| [crossplane/crossplane](https://github.com/crossplane/crossplane) | Apache-2.0 | ~9.8k | Kubernetes-native infrastructure provisioning. CNCF Graduated (Nov 2025). Multi-cloud control plane. | Platform engineering teams offering self-service infra |
| [argoproj/argo-cd](https://github.com/argoproj/argo-cd) | Apache-2.0 | ~18k | GitOps continuous delivery for Kubernetes. Declarative, auditable, rollback-capable. | Kubernetes CD pipelines, agent-driven deployment automation |

---
*See also: `verticals/solutions.md` for full vertical platforms.*
