# Top AI Agents — Technology / Software Development Industry

> Last updated: 2026-07-07 | Curated for Globant AI Studios (Third Pass)

## Autonomous Software Engineering Agents

| # | Agent | Repo | License | Stars | Description |
|---|-------|------|---------|-------|-------------|
| 1 | **OpenHands** | [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) | MIT | 78.5k | Autonomous AI software engineer. CodeAct agent executes code, edits files, runs tests, and iterates end-to-end. 72% SWE-Bench score — on par with proprietary alternatives. $18.8M Series A. |
| 2 | **SWE-agent** | [SWE-agent/SWE-agent](https://github.com/SWE-agent/SWE-agent) | MIT | 15.1k | Princeton NLP's Agent-Computer Interface (ACI) for autonomous GitHub issue resolution. 74% SWE-bench. Pioneered standardized shell/editor/test-runner interfaces now copied by every serious coding agent. |
| 3 | **Aider** | [Aider-AI/aider](https://github.com/Aider-AI/aider) | Apache-2.0 | 45.9k | AI pair programming in your terminal. Commits directly to Git, works with any editor or model. 4.1M installs, 15B tokens/week. Best-in-class for terminal-first and CI/CD-embedded workflows. |
| 4 | **Cline** | [cline/cline](https://github.com/cline/cline) | Apache-2.0 | 58.6k | Autonomous coding agent as VS Code extension + SDK + CLI. Creates/edits files, runs terminal commands, uses headless browser, integrates with MCP tools. Every action requires human approval. 4M+ installs. |

## Multi-Agent Orchestration Frameworks

| # | Agent | Repo | License | Stars | Description |
|---|-------|------|---------|-------|-------------|
| 5 | **LangGraph** | [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | 24k | Graph-based stateful multi-agent framework. De facto enterprise standard (34.5M monthly downloads). Directed graphs map cleanly to audit trails, rollback points, and branching workflows. Surpassed CrewAI in stars (2026). |
| 6 | **CrewAI** | [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | 52.8k | Role-playing AI agent orchestration. Crews of specialized agents collaborate on complex tasks. 5.2M monthly downloads. Production-deployable with strong community. |
| 7 | **AutoGen** | [microsoft/autogen](https://github.com/microsoft/autogen) | Apache-2.0 | 54k | Microsoft Research conversation-driven multi-agent framework. Teams of specialized agents collaborate through structured conversations. Pioneered agentic multi-agent chat patterns. |
| 8 | **Dify** | [langgenius/dify](https://github.com/langgenius/dify) | Apache-2.0 | 144k | Low-code / no-code AI agent and LLM app builder with visual interface. Highest-starred agent platform globally. RAG pipelines, workflows, tool use, custom LLM integration. Accessible to non-engineers. |
| 9 | **Smolagents** | [huggingface/smolagents](https://github.com/huggingface/smolagents) | Apache-2.0 | 27.7k | Hugging Face's minimal code-first agent framework (Jan 2025). Agents write Python to call tools — simplest possible design, highly hackable. Strong HuggingFace Hub model integration. |
| 10 | **Google ADK** | [google/adk-python](https://github.com/google/adk-python) | Apache-2.0 | 20k | Google Agent Development Kit (April 2025). Hierarchical agent trees with sub-agent delegation. Tight Vertex AI + Gemini integration. 3.3M monthly downloads. Ideal for GCP-native stacks. |

## Security, Quality & Connectivity Agents

| # | Agent | Repo | License | Stars | Description |
|---|-------|------|---------|-------|-------------|
| 11 | **Semgrep** | [semgrep/semgrep](https://github.com/semgrep/semgrep) | LGPL-2.1 (CE) | 11.8k | Lightweight SAST for 30+ languages. Finds bugs with patterns that look like source code. AI-assisted multimodal detection: deterministic rules + LLM for IDOR and business-logic vulns. CI/CD native. |
| 12 | **MCP Servers** | [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | MIT | 18k | Anthropic's official MCP (Model Context Protocol) reference server implementations. Filesystem, git, memory, fetch, sequential thinking, time. Linux Foundation project — de facto standard for connecting LLMs to tools/data. |

## AI Observability & Memory (LLMOps Layer)

| # | Agent | Repo | License | Stars | Description |
|---|-------|------|---------|-------|-------------|
| 13 | **Langfuse** | [langfuse/langfuse](https://github.com/langfuse/langfuse) | MIT | ~12k | Open-source LLM observability: traces, evals, prompt versioning, cost tracking per agent node. Self-hostable on Docker/Kubernetes. v3 adds multi-agent trace trees + A2A trace support. Mandatory for production AI. |
| 14 | **mem0** | [mem0ai/mem0](https://github.com/mem0ai/mem0) | Apache-2.0 | ~25k | Persistent memory layer for AI agents. Stores user preferences, past decisions, and learned context across sessions. v2 adds team memory (shared across agents). Integrates with LangGraph, CrewAI, AutoGen. |

## MCP (Model Context Protocol) Ecosystem

| # | Agent | Repo | License | Stars | Description |
|---|-------|------|---------|-------|-------------|
| 15 | **MCP Reference Servers** | [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | MIT | ~10k | Official MCP server implementations: filesystem, Postgres, Slack, GitHub, Brave. Linux Foundation project (donated Dec 2025). Spec v2026-07-28 RC adds multi-hop chaining and structured output resources. |
| 16 | **AWS MCP Servers** | [awslabs/mcp](https://github.com/awslabs/mcp) | Apache-2.0 | ~3k | Official AWS MCP servers: S3, DynamoDB, CloudWatch, Lambda, CDK. Enables AI agents to provision and manage AWS infrastructure via natural language. |
| 17 | **Microsoft MCP** | [microsoft/mcp](https://github.com/microsoft/mcp) | MIT | ~2k | Official Microsoft MCP servers for Azure, Teams, DevOps, OneDrive. Enterprise-grade auth. Use when client is Microsoft-stack. |

## Breakout Agents of 2026 (Added: Third Pass 2026-07-07)

| # | Agent | Repo | License | Stars | Description |
|---|-------|------|---------|-------|-------------|
| 18 | **Hermes Agent** | [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | MIT | 188k | Nous Research's self-improving AI agent — the fastest-growing open-source project in agentic AI history (0 → 188k stars in ~4 months, launched Feb 25 2026). Unique "skills system": learns from past actions, permanently improves recurring tasks, builds a persistent user model across sessions. Auto-imports settings/memories from OpenClaw. Always-on cloud deployment model. Skills Hub now has 90,000+ community-contributed skills. |
| 19 | **OpenClaw** | [PSPDFKit/openclaw](https://github.com/pspdfkit-labs/openclaw) | MIT | 210k | Personal agentic AI framework that runs on your hardware and communicates via Telegram/WhatsApp. Originally viral as Clawdbot (Nov 2025) → Moltbot → OpenClaw (Jan 2026). Surged from 9k → 210k+ stars in weeks, making it one of the fastest GitHub virals of all time. Designed for always-on desktop/server use; not IDE-embedded. Pioneer of "hardware-native agent" pattern. Succeeded by Hermes Agent for advanced users. |

## MLOps & AI Engineering Agents (Added: Third Pass 2026-07-07)

| # | Agent | Repo | License | Stars | Description |
|---|-------|------|---------|-------|-------------|
| 20 | **MLflow** | [mlflow/mlflow](https://github.com/mlflow/mlflow) | Apache-2.0 | 20k | Linux Foundation-backed ML lifecycle platform. MLflow 3.0 adds native LLM tracing and GenAI evaluation. Covers experiment tracking, model registry, model deployment, LLM evaluation. The de facto standard for open-source ML experiment management. Integrates with LangGraph (via OpenTelemetry traces) for agent-level experiment tracking. |
| 21 | **Prefect** | [PrefectHQ/prefect](https://github.com/PrefectHQ/prefect) | Apache-2.0 | ~17k | Modern workflow orchestration with a developer-friendly API and best-in-class UI. Used for ML pipelines, data engineering, and AI agent workflows. Handles retries, scheduling, and observability natively. Lighter-weight than Airflow; better DX than Kubeflow for teams without dedicated platform engineers. |

## Notes (Updated 2026-07-07)
- **Commercial safety**: MIT + Apache-2.0 across the board — all safe for Globant client engagements
- **SWE-bench crossed 80%+**: Claude Mythos Preview 93.9%, Claude Opus 4.8 88.6%, GPT-5.5 ~84% — AI coding agents are at or above senior-engineer level on standardized tasks (Jun 2026)
- **MCP is the integration layer**: Cline, OpenHands, Aider, Hermes Agent all support MCP for external tool connectivity
- **Dify for non-technical clients**: Visual builder when clients need drag-and-drop, not code-first agents
- **LangGraph + CrewAI + AutoGen**: Pick based on workflow type (stateful graph vs. role-play vs. conversation)
- **Hermes Agent for persistent autonomous tasks**: When the client needs "always-on" agents that learn and improve over time without human restarts
- **MLflow for MLOps**: Add to every engagement that trains or fine-tunes models; LLM tracing in v3.0 makes it dual-purpose for agentic workloads
