# 📈 Trending — Enterprise AI (July 2026)

> What's new and gaining momentum this week in enterprise AI.
> Last updated: 2026-07-06

## 🔥 Breaking This Week

### Microsoft Agent Framework 1.0 Goes GA (April 2026, still hot)
- **Repo:** [github.com/microsoft/agent-framework](https://github.com/microsoft/agent-framework)
- **What:** Production unification of AutoGen + Semantic Kernel into a single SDK with stable LTS APIs
- **Why it matters:** Enterprises using either AutoGen or SK now have a single migration target with Microsoft's full commercial support. Combines AutoGen's agent abstractions with SK's enterprise features (telemetry, type safety, filters). Native A2A + MCP support.

### Gartner: $234B Enterprise Software Spend at Risk from Agentic AI (July 1, 2026)
- Gartner published analysis showing $234 billion in traditional enterprise application software spend at risk of displacement by agentic AI systems
- SAP, Oracle, Salesforce, ServiceNow all named as at-risk vendors
- Open-source alternatives (ERPNext, Twenty, SuiteCRM) are direct beneficiaries

### Twenty CRM Passes 45k Stars — MCP Native
- **Repo:** [github.com/twentyhq/twenty](https://github.com/twentyhq/twenty)
- Open-source Salesforce alternative with native MCP server shipping in all cloud workspaces
- Any MCP-compatible agent (Claude, GPT, Gemini) can now read/write CRM data without custom integration
- Growing at ~500★/week; positioned as the "AI-first CRM" from day one

### Flowise Acquired by Workday
- Enterprise validation: Workday buying Flowise signals that visual agentic workflow builders are now core enterprise infrastructure
- Flowise's RAG capabilities rated best-in-class among visual builders
- Impact: enterprise procurement teams can now justify Flowise without open-source risk concerns

### Dify $30M Series A — Enterprise Push
- **Repo:** [github.com/langgenius/dify](https://github.com/langgenius/dify)
- 144k★, most starred LLMOps platform on GitHub
- New enterprise features: SSO/SAML, audit logs, team workspaces, role-based access control
- 100+ LLM providers including on-premise Ollama for air-gapped deployments

## 📊 Adoption Metrics (June 2026)

| Signal | Data |
|--------|------|
| Fortune 500 exploring AI agents | 80% |
| Enterprises deploying multi-stage agentic workflows | 50%+ |
| Avg ROI on enterprise agentic AI | 171% (US: 192%) |
| Enterprise apps embedding task-specific agents by EOY | 40% (Gartner) |
| Agentic AI projects expected to be canceled by 2027 | 40% (Gartner caution) |
| LangGraph Platform: companies in production | 400+ |
| CrewAI: agentic workflows processed | 2B+ |

## 🚀 New Repos to Watch

| Repo | Stars | What |
|------|-------|------|
| [microsoft/agent-framework](https://github.com/microsoft/agent-framework) | 18k | MAF 1.0 — AutoGen + SK unified |
| [twentyhq/twenty](https://github.com/twentyhq/twenty) | 45.5k | MCP-native CRM, fastest growing OSS CRM |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | 126k | v1.1.6 — most adopted enterprise agent framework |
| [langgenius/dify](https://github.com/langgenius/dify) | 144k | LLMOps platform with enterprise security push |
| [huggingface/smolagents](https://github.com/huggingface/smolagents) | 27.7k | Minimal code-first agents — gaining traction in data teams |

## 📡 Protocol Shifts

### MCP (Model Context Protocol) — The HTTP of AI Agents
- Every major enterprise platform (Dify, n8n, Flowise, Langflow, Twenty, OpenMetadata) now ships an MCP server
- Claude Desktop + VS Code Copilot + Cursor all natively consume MCP
- Impact: enterprise tools become instantly queryable by any MCP client without custom integration

### A2A (Agent-to-Agent) — Google's Inter-Agent Protocol
- Google's open protocol for agents to discover and call each other across organizational boundaries
- Already supported in MAF 1.0; LangGraph adding support in v1.2
- Impact: enterprises can wire specialist agents (legal, finance, HR) into a federation without custom middleware

---
*Auto-updated by ingest pipeline — 2026-07-06.*
