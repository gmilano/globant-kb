# 🏗️ Repos fundacionales — Enterprise

> Bases sobre las cuales construir soluciones enterprise con AI. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-08

---

## Stack A: Orquestación de Agentes (Agent Frameworks)

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|--------------|
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | 110k+ | Graph-based stateful agent orchestration. GA Oct 2025. DeltaChannel + per-node timeouts v1.1. Powers Uber, LinkedIn. | ✅ — El framework production más maduro 2026 |
| [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | 52.8k | Multi-agent role-based collaboration. 5.2M downloads/mes. Pluggable backends + Chat API v1.14. | ✅ — Ideal para equipos de dominio (ventas, RRHH, finanzas) |
| [ag2ai/ag2](https://github.com/ag2ai/ag2) | Apache-2.0 | 22k | Fork comunitario de AutoGen. Base del Microsoft Agent Framework 1.0. Conversational multi-agent. | ✅ — .NET shops y clientes Microsoft |
| [microsoft/semantic-kernel](https://github.com/microsoft/semantic-kernel) | MIT | 24k | Framework enterprise Microsoft. C#/Python/Java. Session state, middleware, telemetry. | ✅ — Enterprise .NET con compliance reqs |
| [huggingface/smolagents](https://github.com/huggingface/smolagents) | Apache-2.0 | 27.7k | Minimalista, CodeAgent nativo, MCP client. HuggingFace. Jan 2025 → crecimiento explosivo. | ✅ — Prototipos rápidos y researchers |
| [pydantic/pydantic-ai](https://github.com/pydantic/pydantic-ai) | MIT | 14k | Type-safe agent framework Python. v2 Jun 23 2026. Claude/OpenAI/Gemini. | ✅ — Equipos Python-first, APIs tipadas |

---

## Stack B: Visual Builders / Low-Code AI

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|--------------|
| [langgenius/dify](https://github.com/langgenius/dify) | Apache-2.0 | 138k | Visual AI app builder. RAG nativo, HITL, multi-tenant, MCP 2026. $30M raised. | ✅ — Primer deployment enterprise para no-devs |
| [FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise) | Apache-2.0 | 40k | LangChain/LlamaIndex visual canvas. HITL añadido 2026. Auto-scaling nativo. | ✅ — Prototipos en horas, LangChain-compatible |
| [langflow-ai/langflow](https://github.com/langflow-ai/langflow) | MIT | 60k | Visual builder adquirido por IBM/DataStax. MCP support 2026. | ✅ — Clientes IBM/DataStax, Python backend |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | Sustainable Use | 56k | Workflow automation con 1500+ integraciones. n8n 2.0 Jan 2026: 70+ AI nodes, MCP nativo. | ⚠️ — No MIT pero self-hostable; revisar con legal |

---

## Stack C: ERP / CRM Enterprise Open Source

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|--------------|
| [odoo/odoo](https://github.com/odoo/odoo) | LGPL-3.0 | 52.8k | ERP+CRM+eCommerce+HR todo-en-uno. Python+OWL. Community Edition gratuita. | ✅ — Base para AI-over-ERP patterns |
| [frappe/frappe](https://github.com/frappe/frappe) | MIT | 10.4k | Low-code web framework Python+JS. Base de ERPNext. REST API nativa, hooks system. | ✅ — Custom ERP/CRM con MCP server |
| [frappe/erpnext](https://github.com/frappe/erpnext) | GPL-3.0 | 36.4k | ERP open source sobre Frappe. Manufacturing, HR, CRM, contabilidad. 15+ módulos. | ✅ — ERPNext + erpnext-mcp-server |
| [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Apache-2.0 | 1.1k | Apache OFBiz: ERP+CRM+SCM+eCommerce. Java. Licencia Apache-2.0 = ideal Globant. | ✅ — Clientes Java enterprise legacy |
| [suitecrmio/suitecrm-core](https://github.com/suitecrmio/suitecrm-core) | AGPL-3.0 | 4.2k | CRM open source PHP. Feature-parity con Salesforce. Plugin API robusto. | ✅ — CRM con AI on top (AGPL, revisar licensing) |
| [espocrm/espocrm](https://github.com/espocrm/espocrm) | GPL-3.0 | 2.5k | CRM open source PHP moderno. API REST nativa, webhooks, custom entities. | ✅ — CRM más liviano que SuiteCRM |

---

## Stack D: Data Catalog / Governance

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|--------------|
| [open-metadata/OpenMetadata](https://github.com/open-metadata/OpenMetadata) | Apache-2.0 | 6k | Data catalog + data quality + MCP server. 3000+ enterprise deployments. EU AI Act compliance tooling. | ✅ — AI governance stack |
| [datahub-project/datahub](https://github.com/datahub-project/datahub) | Apache-2.0 | 10k | Data discovery + lineage + governance. LinkedIn. Agentic workflows integración 2026. | ✅ — Data lineage para AI compliance |

---

## Stack E: Observabilidad LLM

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|--------------|
| [langfuse/langfuse](https://github.com/langfuse/langfuse) | MIT | 28k | LLM observability + tracing + evaluación. Self-hostable Docker. EU AI Act audit trail. | ✅ — Mandatorio para enterprise prod |
| [comet-ml/opik](https://github.com/comet-ml/opik) | Apache-2.0 | 8.5k | LLM evaluation + tracing. Integra con LangChain/LlamaIndex. | ✅ — Alternativa OSS a Langfuse |
| [Arize-ai/phoenix](https://github.com/Arize-ai/phoenix) | Elastic-2.0 | 7.2k | LLM tracing + evals + prompt management. Arize Phoenix. | ⚠️ — Elastic License (revisar con legal) |

---

## Stack F: Protocolos Enterprise AI

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|--------------|
| [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | MIT | 18k | Servidores MCP oficiales. 97M descargas/mes. Linux Foundation. 5000+ MCP servers ecosistema (Jul 2026 RC). | ✅ — Estándar de integración AI↔enterprise tools |
| [OpenHands/software-agent-sdk](https://github.com/OpenHands/software-agent-sdk) | MIT | - | SDK para production software agents. Stateless, event-sourced, composable. 4 packages. | ✅ — Coding agents enterprise |

---

*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
