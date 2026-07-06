# 📈 Trending — Enterprise AI (July 2026)

> What's new and gaining momentum this week in enterprise AI.
> Last updated: 2026-07-06 (second pass)

## 🔥 Breaking This Week (July 2026)

### A2A Protocol Graduates to Linux Foundation — ADK 1.0 Goes GA
- **What:** Google's Agent-to-Agent (A2A) protocol is now governed by the Linux Foundation. Google ADK 1.0 went GA across Python, Go, Java, and TypeScript.
- **Adoption:** 150+ organizations in production. Native A2A support now in LangGraph, CrewAI, LlamaIndex Agents, Semantic Kernel, and AutoGen.
- **Why it matters:** Enterprises can now federate specialist agents (legal, finance, HR, procurement) across organizational/vendor boundaries without custom middleware. A Salesforce agent can hand off to a Google Vertex agent querying a ServiceNow agent — all via A2A with no bespoke integration.
- **Spec:** HTTP + Server-Sent Events + JSON-RPC 2.0; Agent Cards for capability advertisement; OAuth2/OIDC/mTLS auth.

### MCP Ecosystem Hits 5,500+ Servers — Enterprise Auth Layer Added
- **What:** MCP (Model Context Protocol) has grown from 3,000 servers (June 2026) to 5,500+ on registries like PulseMCP. Donated to Linux Foundation's Agentic AI Foundation in December 2025 — now cross-vendor standard.
- **Enterprise unlock:** 2026 added standardized enterprise auth: OAuth2, RBAC, and audit logging, which unblocked most Fortune 500 deployments. 28% of Fortune 500 have now implemented MCP servers.
- **Adoption:** Supported natively by Anthropic, OpenAI, Google, Microsoft, Salesforce, Snowflake, and most API gateway vendors. LangChain, CrewAI, LangGraph, and LlamaIndex have made MCP the default protocol for tool-calling.

### n8n Hits 182k Stars — n8n 2.0 Enterprise Release
- **What:** n8n surged to 182k+ GitHub stars (was 102k in early 2026). n8n 2.0 (Dec 2025) introduced enterprise-grade security by default, a modernized AI Agent node with enhanced token management, improved reliability, and better scalability. Valuation: $2.5B.
- **Signal:** The most-used building block in n8n is now the **AI Agent node** — not a Slack node or webhook. Enterprise automation infrastructure has shifted to agentic workflows.

### Dify: 1M+ Apps in Production, 280+ Enterprise Customers
- Updated validation: Dify (Apache-2.0, 144k★) has 1M+ applications deployed in production. Enterprise customers include Maersk and Novartis. New in 2026: SSO/SAML, audit logs, team workspaces, RBAC. 100+ LLM providers including on-premise Ollama for air-gapped enterprise deployments.

### OpenHands v1.6.0 — Kubernetes Multi-User RBAC
- **Repo:** [All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands) — MIT, 78.5k★
- v1.6.0 adds Kubernetes deployment with multi-user support and RBAC — enabling enterprise-wide deployment on shared infrastructure.
- OpenHands Index (launched Jan 2026): expanded benchmark covering issue resolution, greenfield app dev, frontend tasks, and testing — beyond SWE-bench Verified.

---

## 🔥 Previously Breaking (Still Hot)

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

## 📊 Adoption Metrics (July 2026)

| Signal | Data |
|--------|------|
| Fortune 500 exploring AI agents | 80% |
| Fortune 500 with MCP servers implemented | 28% |
| Enterprises deploying multi-stage agentic workflows | 50%+ |
| Avg ROI on enterprise agentic AI | 171% (US: 192%) |
| Enterprise apps embedding task-specific agents by EOY | 40% (Gartner) |
| Agentic AI projects expected to be canceled by 2027 | 40% (Gartner caution) |
| LangGraph Platform: companies in production | 400+ |
| CrewAI: agentic workflows processed | 2B+ |
| A2A protocol: organizations in production | 150+ |
| MCP servers in ecosystem | 5,500+ |

## 🚀 New Repos to Watch

| Repo | Stars | What |
|------|-------|------|
| [google/adk-python](https://github.com/google/adk-python) | ~8k | ADK 1.0 GA — A2A orchestration across organizational boundaries |
| [microsoft/agent-framework](https://github.com/microsoft/agent-framework) | 18k | MAF 1.0 — AutoGen + SK unified |
| [twentyhq/twenty](https://github.com/twentyhq/twenty) | 45.5k | MCP-native CRM, fastest growing OSS CRM |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | 126k | v1.1.6 — most adopted enterprise agent framework |
| [langgenius/dify](https://github.com/langgenius/dify) | 144k | LLMOps platform with enterprise security push |
| [langfuse/langfuse](https://github.com/langfuse/langfuse) | ~12k | OSS LLMOps: traces, prompt versioning, evals — OSS LangSmith alternative |

## 📡 Protocol Shifts

### MCP (Model Context Protocol) — The HTTP of AI Agents
- Every major enterprise platform (Dify, n8n, Flowise, Langflow, Twenty, OpenMetadata) now ships an MCP server
- Claude Desktop + VS Code Copilot + Cursor all natively consume MCP
- 5,500+ MCP servers in ecosystem; enterprise OAuth2/RBAC auth layer added in 2026
- Impact: enterprise tools become instantly queryable by any MCP client without custom integration

### A2A (Agent-to-Agent) — Google's Inter-Agent Protocol (Now Linux Foundation)
- Google's open protocol for agents to discover and call each other across organizational boundaries
- ADK 1.0 GA: Python, Go, Java, TypeScript; 150+ orgs in production
- Already supported in MAF 1.0, LangGraph, CrewAI, Semantic Kernel, AutoGen
- Impact: enterprises can wire specialist agents (legal, finance, HR) into a federation without custom middleware

---
*Auto-updated by ingest pipeline — 2026-07-06.*
