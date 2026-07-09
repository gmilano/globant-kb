# Top AI Agents & Tools — Technology / Software Development

> Open-source AI agents and frameworks for the software development & technology industry.
> Focus: MIT / Apache 2.0 / BSD. Updated: 2026-07-09.

## Core AI Coding Agents

| Name | License | Stars | Description |
|------|---------|-------|-------------|
| [OpenHands](https://github.com/OpenHands/OpenHands) | MIT | 79.6k | Full software engineering agent (formerly OpenDevin). Sandboxed execution, web browsing, code editing. SWE-bench Verified 72% (Claude Sonnet 4.5 + extended thinking), 77.6% own harness. GA Enterprise Control Plane May 2026. |
| [MetaGPT](https://github.com/FoundationAgents/MetaGPT) | MIT | 67.9k | Multi-agent framework simulating a full software company (PM, Architect, Dev, QA). "Code = SOP(Team)". Best for greenfield product generation from a single prompt. |
| [CrewAI](https://github.com/crewAIInc/crewAI) | MIT | 52.8k | Role-based multi-agent orchestration with 5.2M monthly downloads. Agents collaborate like a crew with defined roles, tools, and tasks. Production-proven. |
| [Dify](https://github.com/langgenius/dify) | Apache-2.0 | 144k | Low-code platform for building AI agent workflows. Visual canvas, RAG pipelines, MCP integration, 50+ built-in tools, self-hostable. Fastest-growing agent platform. |
| [AutoGen](https://github.com/microsoft/autogen) | Apache-2.0 | 42k | Microsoft's multi-agent conversation framework. Merged with Semantic Kernel into Microsoft Agent Framework (GA Q1 2026); AutoGen in maintenance mode but widely deployed. |
| [smolagents](https://github.com/huggingface/smolagents) | Apache-2.0 | 27.7k | Hugging Face's minimal agent framework (Jan 2025). Code-first: agents write Python code to call tools rather than JSON. Fastest per-token cost among major frameworks. |
| [SWE-agent](https://github.com/princeton-nlp/SWE-agent) | MIT | 15.2k | Princeton NLP coding agent designed for the SWE-bench benchmark. Agent-Computer Interface (ACI) approach. Reference implementation for repo-level bug fixing. |
| [Aider](https://github.com/Aider-AI/aider) | Apache-2.0 | 32k | Terminal-based pair programming AI. Works with any Git repo, multi-file edits, voice coding support. "Gold standard for terminal pair-programming" per developer surveys. |
| [OpenCode](https://github.com/anomalyco/opencode) | MIT | 181.5k | Model-agnostic open source coding agent (emerged 2026 as Cursor alternative). Backed by SpaceX Cursor acquisition, positioned as vendor-lock-in alternative. |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) | Apache-2.0 | 80k+ | Google's open-source terminal AI agent. Apache-2.0 lets enterprises fork and contribute. Note: being replaced by Antigravity CLI for individual tier (Jun 18, 2026); enterprise unchanged. |

## Agent Orchestration Frameworks

| Name | License | Stars | Description |
|------|---------|-------|-------------|
| [LangGraph](https://github.com/langchain-ai/langgraph) | MIT | 12.8k | Stateful graph runtime for long-running agents. Most mature framework for production multi-step workflows. Native persistence, branching, human-in-the-loop. |
| [Google ADK](https://github.com/google/adk-python) | Apache-2.0 | 20k | Google Agent Development Kit (Apr 2025). 3.3M monthly downloads. Integrates with Gemini, Vertex AI, and A2A protocol for agent-to-agent communication. |
| [Hermes Agent](https://github.com/NousResearch/hermes-agent) | MIT | 60k+ | Nous Research autonomous AI agent. Crossed 60k stars in <2 months (2025). Skill.md-based architecture, open-source alternative to commercial personal agents. |
| [Mastra](https://github.com/mastra-ai/mastra) | Apache-2.0 | 9.8k | TypeScript-native agent framework. Memory, RAG, MCP client built-in. Good for Node.js/TypeScript shops. |
| [OpenAI Agents SDK](https://github.com/openai/openai-agents-python) | MIT | 14k | Official Python SDK for building multi-agent pipelines. Handoffs, guardrails, tracing built-in. Works with any OpenAI-compatible API. |

## MCP & Integration Tools

| Name | License | Stars | Description |
|------|---------|-------|-------------|
| [MCP Python SDK](https://github.com/modelcontextprotocol/python-sdk) | MIT | 8.2k | Official MCP SDK. 97M monthly downloads across Python+TypeScript SDKs. The standard for AI-tool integration. RC 2026-07-28: stateless core, OAuth, Tasks extension. |
| [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) | MIT | 6.5k | TypeScript MCP SDK. 10k+ MCP servers in production. Used by Cursor, VS Code, Claude Code natively. |
| [code-review-graph](https://github.com/tirth8205/code-review-graph) | MIT | 19.1k | Local-first code intelligence graph for MCP and CLI. Builds a persistent graph of codebase structure, works as MCP server for AI coding tools. |
| [claude-code-security-review](https://github.com/anthropics/claude-code-security-review) | MIT | 5.4k | GitHub Action using Claude to run automated security reviews on PRs. Drop-in CI step for OWASP/SAST analysis powered by AI. |

---
*Updated automatically by ingest pipeline. Deal sizes and use-case fit in `compose/patterns.md`.*
