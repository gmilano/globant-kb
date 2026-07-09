# 🎯 Agentes AI — Enterprise

> Agentes y herramientas AI open source para la industria Enterprise. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-09 v3

## Agentes y herramientas destacadas

| Nombre | Licencia | Descripción | Stars |
|--------|----------|-------------|-------|
| [LangGraph](https://github.com/langchain-ai/langgraph) | MIT | Framework de grafo para agentes stateful en producción. Powers Uber, LinkedIn, Klarna. GA Oct 2025; v1.1 Jun 2026 añade DeltaChannel y timeouts por nodo. | 110k+ |
| [CrewAI](https://github.com/crewAIInc/crewAI) | MIT | Orquestación de agentes multi-rol. 52.8k ★, 5.2M descargas/mes. Core OSS gratuito; UI/RBAC enterprise de pago. v1.14 May-Jun 2026. | 52.8k |
| [AG2 / AutoGen](https://github.com/ag2ai/ag2) | Apache-2.0 | Fork comunitario de AutoGen de Microsoft. Conversational multi-agent framework. 22k ★. Base del Microsoft Agent Framework 1.0. | 22k |
| [OpenHands](https://github.com/OpenHands/OpenHands) | MIT | Plataforma agentic de software engineering. 65k+ ★. 72% SWE-bench Verified. **Enterprise Control Plane GA May 6, 2026**: RBAC, cost guardrails, audit trails, Docker/K8s. | 65k+ |
| [Dify](https://github.com/langgenius/dify) | Apache-2.0 | Visual AI app builder enterprise-grade. 138k ★ (Apr 2026). RAG nativo, MCP support, HITL, multi-tenant. $30M raised 2026. | 138k |
| [Flowise](https://github.com/FlowiseAI/Flowise) | Apache-2.0 | Drag-and-drop LangChain/LlamaIndex builder. 40k ★. HITL añadido 2026. Auto-scaling nativo. | 40k |
| [Langflow](https://github.com/langflow-ai/langflow) | MIT | Visual builder adquirido por IBM/DataStax. 60k ★. MCP support 2026. 146k ★ en versión enterprise-fork. | 60k |
| [Smolagents](https://github.com/huggingface/smolagents) | Apache-2.0 | HuggingFace framework minimalista de agentes. 27.7k ★. CodeAgent nativo, MCP client, multi-step tool use. Jan 2025 → rapid growth. | 27.7k |
| [Semantic Kernel](https://github.com/microsoft/semantic-kernel) | MIT | Framework enterprise de Microsoft. C#/Python/Java. Telemetría, middleware, session-based state. Base del Microsoft Agent Framework 1.0 (Apr 3 2026). | 24k |
| [OpenMetadata](https://github.com/open-metadata/OpenMetadata) | Apache-2.0 | Data catalog + governance enterprise. 6k ★. MCP server nativo 2026. 3000+ enterprise deployments, 8k+ ★, 11k+ community members. | 6k |
| [Pydantic AI](https://github.com/pydantic/pydantic-ai) | MIT | Agent framework type-safe para Python. v2 Jun 23 2026 (harness-first redesign). Integra con Claude, OpenAI, Gemini. Ideal para equipos .py-first. | 14k |
| [n8n](https://github.com/n8n-io/n8n) | Sustainable Use (fair-code) | Workflow automation 1500+ integraciones. $55M Series B 2024. n8n 2.0 Jan 2026: 70+ AI nodes, MCP Server/Client nodes, LangChain nativo. No MIT pero self-hostable. | 56k |
| [microsoft/agent-framework](https://github.com/microsoft/agent-framework) | MIT | Microsoft Agent Framework 1.0 GA (Apr 2, 2026). AutoGen + Semantic Kernel unificados. BUILD 2026 (Jun): CodeAct (Python in Hyperlight micro-VMs) + Hosted Agents GA. Python + .NET. | 18k |
| [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) | Apache-2.0 | Terminal agentic CLI de Google. Apr 2026. ReAct loop, MCP support nativo, 1M context window. Alternativa OSS a Claude Code. Crecimiento explosivo. | 80k+ |
| [openclaw-org/openclaw](https://github.com/openclaw-org/openclaw) | MIT | Agente personal multi-canal (WhatsApp, Telegram, Discord, iMessage, Signal). Breakout 2026: de 9k a 210k+ ★ en semanas. Sam Altman endorsement. | 210k+ |

---

## MCP Servers Enterprise (Model Context Protocol)

| MCP Server | Licencia | Descripción | Fuente |
|------------|----------|-------------|--------|
| [erpnext-mcp-server](https://github.com/rakeshgangwar/erpnext-mcp-server) | MIT | Conecta Claude/GPT a ERPNext vía MCP. 104 ★. | Frappe/ERPNext |
| [MCP Servers (official)](https://github.com/modelcontextprotocol/servers) | MIT | 18k ★, 97M descargas/mes. Linux Foundation. Reference servers para filesystem, git, GitHub, Slack, Google Workspace. | Anthropic/LF |
| [MCP35](https://github.com/infaton/MCP35) | MIT | 51 tools para 1C:Enterprise ERP vía MCP. | Community |
| [OpenMetadata MCP](https://github.com/open-metadata/OpenMetadata) | Apache-2.0 | MCP server integrado en OpenMetadata v1.5+ para data catalog agents. | OpenMetadata |
| [DataHub MCP](https://github.com/datahub-project/datahub) | Apache-2.0 | MCP server para data lineage y governance en DataHub. | Acryl Data |

---

## Benchmarks de referencia Enterprise 2026

| Benchmark | Métrica clave | Resultado top | Fecha |
|-----------|---------------|---------------|-------|
| SWE-bench Verified | % issues GitHub resueltos automáticamente | OpenHands 72% (Claude Sonnet 4.5 + extended thinking) | Jun 2026 |
| SWE-bench Verified | % issues GitHub resueltos automáticamente | Claude Fable 5 95.5% | Jul 6 2026 |
| GAIA | General AI Assistant tasks | LangGraph + Claude Sonnet 5 ~88% nivel 1 | May 2026 |
| AgentBench Enterprise | Business process automation tasks | CrewAI + Claude 78% | Apr 2026 |
| Microsoft Agent Framework | Multi-step enterprise workflows | MAF 1.0 production-validated | Apr 3 2026 |
| MAF BUILD 2026 | CodeAct aislado en Hyperlight micro-VM | Isolation overhead <5ms por call | Jun 2026 |

## ROI Enterprise — Datos concretos 2026

| Métrica | Dato | Fuente |
|---------|------|--------|
| ROI promedio agentic AI | 171% (US enterprises: 192%) | Industry surveys 2026 |
| Horas recuperadas/semana (knowledge worker) | 6.4h mediana (seniors: 10-12h) | AI Productivity Index 2026 |
| Costo ticket CS con agente | $0.46 vs $4.18 humano (9x) | Enterprise benchmarks |
| Costo code review con agente | $0.72 vs $48 senior-engineer (66x) | Engineering benchmarks |
| Payback period (customer service) | 4.1 meses | ROI studies 2026 |
| Payback period (engineering) | 9.3 meses | ROI studies 2026 |
| % rollouts con ROI positivo en 12 meses | 41% | Industry data 2026 |
| Klarna AI agent savings | $60M + work of 853 FTEs (Q3 2025) | Public disclosure |
| JPMorgan AI use cases en producción | 450+ diarios | Public disclosure |

---
*Actualizado automáticamente por el pipeline de ingest.*
