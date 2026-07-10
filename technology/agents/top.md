# Top AI Agents & Tools — Technology Industry

> Open source AI agents and frameworks for software/tech industry. Focus: MIT / Apache 2.0.
> Last updated: 2026-07-10 (v7)

## Top Coding & Developer Agents

| Name | License | Repo | Stars | Description |
|------|---------|------|-------|-------------|
| [OpenHands](https://github.com/All-Hands-AI/OpenHands) | MIT | All-Hands-AI/OpenHands | 79.6k | Full AI software engineer; SWE-bench Verified 72% w/ Claude Sonnet 4.5; browser + terminal + file editing in sandboxed container; OpenHands SDK for custom agents |
| [opencode](https://github.com/opencodejsx/opencode) | MIT | opencodejsx/opencode | 95k+ | Open-source coding agent in Go; 75+ model providers (Claude, OpenAI, Gemini, local); polished terminal UI with Build and Plan modes; MCP native |
| [Cline](https://github.com/cline/cline) | Apache-2.0 | cline/cline | ~60k | Autonomous coding agent as SDK, IDE extension (VS Code + all JetBrains), or CLI; 1.5M VS Code installs; Plan/Act dual-mode; multi-agent coordination; messaging integration (Slack, Telegram, Discord, WhatsApp); BYOK |
| [MetaGPT](https://github.com/geekan/MetaGPT) | MIT | geekan/MetaGPT | 67.9k | Simulates a full software company (PM, Architect, Engineer, QA) as multi-agent crew; generates PRDs, system designs, and code from a single prompt |
| [Aider](https://github.com/Aider-AI/aider) | Apache-2.0 | Aider-AI/aider | 45.9k | Terminal pair programmer; git-native (every accepted change is a commit); 15B tokens/week; 6.8M PyPI installs; best with Claude 3.7 Sonnet / DeepSeek |
| [OpenClaw](https://github.com/openclaw/openclaw) | MIT | openclaw/openclaw | 310k | Messaging-first personal AI assistant (WhatsApp, Telegram, Slack, iMessage); SKILL.md ecosystem; runs any OS/model; Docker-in-Docker for safe code execution |

## Multi-Agent Orchestration Frameworks

| Name | License | Repo | Stars | Description |
|------|---------|------|-------|-------------|
| [CrewAI](https://github.com/crewAIInc/crewAI) | MIT | crewAIInc/crewAI | 52.8k | Role-based multi-agent orchestration; 5.2M monthly downloads; A2A protocol support added Jun 2026; largest dedicated agent framework community |
| [smolagents](https://github.com/huggingface/smolagents) | Apache-2.0 | huggingface/smolagents | 27.7k | HuggingFace's CodeAgent-first framework; agents write Python code to take actions rather than JSON; minimal footprint; 14 months from 0 to 27k stars |
| [LangGraph](https://github.com/langchain-ai/langgraph) | MIT | langchain-ai/langgraph | 12.8k | Graph-based agent orchestration from LangChain; surpassed CrewAI in enterprise adoption H1 2026; stateful workflows with audit trails + rollback; production-grade |
| [DeerFlow](https://github.com/bytedance/deer-flow) | Apache-2.0 | bytedance/deer-flow | ~47k | ByteDance super-agent harness (Deep Exploration + Efficient Research Flow); orchestrates sub-agents with sandboxed filesystem, memory, skills system; built on LangGraph; #1 GitHub Trending Feb 2026 |
| [Google ADK](https://github.com/google/adk-python) | Apache-2.0 | google/adk-python | 20k | Google Agent Development Kit (Apr 2025); 3.3M monthly downloads; tight Gemini + Vertex AI integration; A2A protocol native |

## LLM App Builders & Workflow Platforms

| Name | License | Repo | Stars | Description |
|------|---------|------|-------|-------------|
| [Dify](https://github.com/langgenius/dify) | Apache-2.0 | langgenius/dify | 144k | Visual LLM app builder with RAG, agents, workflows, and 50+ built-in tools; MCP server support; self-hosted; best for chat-first RAG apps |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) | Apache-2.0 | google-gemini/gemini-cli | 80k | Google's open-source agentic CLI; 1,000 free requests/day (effectively unlimited for many devs); ReAct + MCP + 1M context window; Go-based |
| [OpenMontage](https://github.com/calesthio/OpenMontage) | MIT | calesthio/OpenMontage | trending | World's first open-source agentic video production system; 12 pipelines, 52 tools, 500+ agent skills; works with Claude Code / Cursor / Copilot / Windsurf; #1 GitHub Trending Jun 26 2026 |

---

## Context Engineering Tools

> Identified by Anthropic's 2026 Agentic Coding Report as the key differentiator: teams with well-maintained context files complete tasks 55% faster with 40% fewer errors.

| Tool / Pattern | License | Link | Description |
|----------------|---------|------|-------------|
| CLAUDE.md | — | Project convention | Per-project AI context file; structure: role, codebase overview, conventions, common tasks |
| DESIGN.md | MIT | awesome-design-md | AI-readable design specs; 95k★; used with Claude Code, Cursor, Copilot |
| .cursor/rules | — | Cursor convention | Cursor-specific rules equivalent to CLAUDE.md |
| Memory MCP | MIT | modelcontextprotocol/servers | Persistent entity-relationship memory store for cross-session context |

---
*Updated automatically by the ingest pipeline.*
