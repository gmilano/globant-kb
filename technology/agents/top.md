# Top AI Agents — Technology / Software Development

> Open source AI agents and tools for the technology industry. Focus: MIT / Apache 2.0.
> Last updated: 2026-07-11 (v8)

## Top Agents & Tools

| Name | License | Description | Stars |
|------|---------|-------------|-------|
| [OpenHands](https://github.com/All-Hands-AI/OpenHands) | MIT | Full autonomous software engineer platform (formerly OpenDevin); runs in sandboxed Docker containers, completes multi-file tasks end-to-end, top SWE-bench scores | 68k |
| [Cline](https://github.com/cline/cline) | Apache-2.0 | VS Code AI coding agent with Claude/GPT/Gemini backend; edits files, runs terminal commands, and uses browser — full agentic loop inside the IDE | 64k |
| [openai/codex](https://github.com/openai/codex) | Apache-2.0 | Lightweight CLI coding agent; reads codebase context, writes and runs code, commits — designed for terminal-first autonomous workflows | 95k |
| [Aider](https://github.com/Aider-AI/aider) | Apache-2.0 | Terminal CLI coding agent; pairs with git, supports 100+ LLMs, consistent top scorer on SWE-bench verified; 93 releases, 13k+ commits | 47k |
| [Continue](https://github.com/continuedev/continue) | Apache-2.0 | Open source autopilot for VS Code and JetBrains; inline code editing, codebase-aware chat, and tab autocomplete; BYOK and local model support | 31k |
| [Tabby](https://github.com/TabbyML/tabby) | Apache-2.0 | Self-hosted AI coding assistant server; runs locally or on-prem, OpenAPI compatible, supports StarCoder2, CodeLlama, DeepSeek-Coder | 33k |
| [Goose](https://github.com/block/goose) | Apache-2.0 | Open source AI agent by Block (Square); terminal-based, extensible with toolkits, memory persistence, BYOK — production-tested at Block | 32k |
| [Dify](https://github.com/langgenius/dify) | MIT | Low-code LLM app platform; visual pipeline builder, RAG, agent orchestration, 100+ integrations; 144k stars, most-starred LLM platform | 144k |
| [LangGraph](https://github.com/langchain-ai/langgraph) | MIT | Stateful multi-agent runtime on LangChain; cyclic graphs, human-in-the-loop, checkpointing; 34.5M monthly downloads, de facto enterprise standard | 12k |
| [CrewAI](https://github.com/crewAIInc/crewAI) | MIT | Role-playing multi-agent orchestration; minimal boilerplate, 52k stars, 5.2M monthly downloads; ships v1.10.1 (Mar 2026) | 52k |
| [Smolagents](https://github.com/huggingface/smolagents) | Apache-2.0 | Hugging Face's minimal agent framework; CodeAgent executes Python tool-calls natively; best-in-class on AgentBench for small models | 27k |
| [Context7 MCP](https://github.com/upstash/context7) | MIT | Most popular MCP server (54k stars, 890k weekly npm downloads); injects up-to-date library docs into any MCP-compatible coding agent | 54k |

---

## Notes for Globant Engagements

- **OpenHands** is the best starting point for autonomous "Devin-style" software agents — MIT license, Docker sandbox, REST API
- **Cline + Continue** combo gives in-IDE autonomy + autocomplete; both BYOK so no vendor lock-in
- **Dify** as the orchestration platform of choice when clients need a visual workflow builder and don't want to write agent code
- **LangGraph** for complex stateful enterprise workflows requiring human approval gates
- **Context7 MCP** is a must-have addition to any MCP server stack — keeps agents up to date on library APIs

---
*Auto-updated by ingest pipeline.*
