# Trending Enterprise AI Agents — Week of 2026-07-11

> What's new, what just went GA, what moved fast this week.

## Breaking This Week

### Microsoft Agent Framework at BUILD 2026
Microsoft unveiled major enhancements at BUILD 2026 (May 2026):
- **Agent Harness** — structured execution environment for long-running agents
- **Hosted Agents** — managed serverless deployment on Azure
- **CodeAct** — agents that write and execute code natively
- MAF is now the go-to for Microsoft Azure enterprise shops; AutoGen + Semantic Kernel enter maintenance mode

### Dify Passes 148k Stars
Dify (langgenius/dify) crossed 148k GitHub stars in July 2026, making it the #1 most-starred LLM platform. Key recent additions:
- Native MCP server/client nodes
- Multi-model routing with cost optimization
- Enterprise SSO / RBAC (cloud + self-hosted enterprise edition)

### n8n 2.0: Native AI Agent Nodes + MCP
n8n 2.0 shipped with:
- Native AI Agent nodes (no plugin required)
- MCP Client + MCP Server Trigger — makes n8n workflows callable from Claude, Cursor, Lovable
- Self-Hosted AI Starter Kit v2 with Qdrant + Ollama pre-packaged
- 189k stars, making it the #1 workflow automation platform by stars

### RAGFlow Crosses 73k Stars
RAGFlow (infiniflow/ragflow) continues explosive growth after 2,596% YoY contributor activity in 2025. July 2026 highlights:
- DeepDoc v3 engine — improved table/chart extraction from complex PDFs
- Agent orchestration layer with loop + branch logic
- Production deployments at Fortune 500 companies for compliance document processing

### CrewAI Survey Results (Jan 2026)
- 100% of enterprise users plan to expand agentic AI in 2026
- 2 billion agentic system executions in the prior 12 months
- 74% call production deployment a strategic priority
- 75% report high/very high impact on time savings; 69% on cost reduction

## New Repos to Watch

| Repo | License | Stars | Why Interesting |
|------|---------|-------|-----------------|
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Apache-2.0 | ~26k | Persistent memory layer — fills the "agents forget context" gap in enterprise deployments |
| [agno-agi/agno](https://github.com/agno-agi/agno) | Apache-2.0 | ~26k | Model-agnostic, 23x faster agent spawn than LangGraph; new team/multi-agent primitives |
| [microsoft/agent-framework](https://github.com/microsoft/agent-framework) | MIT | ~11.6k | GA April 2026 — enterprise .NET + Python convergence point |
| [czlonkowski/n8n-mcp](https://github.com/czlonkowski/n8n-mcp) | MIT | growing | MCP server that lets Claude Code build n8n workflows — meta-automation |

## Key Trend: MCP Becoming Enterprise Integration Standard
The Model Context Protocol (donated to Linux Foundation AAIF in Dec 2025) is rapidly becoming the enterprise integration bus for AI:
- n8n, Dify, Mattermost, ERPNext all added MCP support in H1 2026
- 97M monthly SDK downloads; 20,000+ MCP servers on Glama
- Pattern: enterprise system exposes MCP server → any Claude/agent can drive it without custom integration code

## LATAM Watch
- Globant announced $1B investment in LATAM AI (June 2026)
- Globant–Anthropic alliance: Claude-powered AI Pods, adopted by 40% of top 20 revenue accounts
- Brazil AI Legal Framework creates compliance requirements (and consulting opportunities) for all enterprises in LATAM

---
*Updated 2026-07-11 by ingest pipeline.*
