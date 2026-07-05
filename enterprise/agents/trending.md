# 📈 Agentes en Tendencia — enterprise (semana 2026-07-05)

> Movimientos notables esta semana en el ecosistema AI enterprise.

## 🔥 Novedades de la semana

### 1. Dify supera los 138k ★ — líder indiscutido de plataformas LLM visuales
- **Repo**: [langgenius/dify](https://github.com/langgenius/dify)
- **Hito**: Se consolida como la plataforma visual LLM más estrellada en open source, superando a Langflow (60k) y Flowise (40k) combinados.
- **Por qué importa**: Enterprises adoptan Dify como capa de orquestación sobre modelos propietarios (Azure OpenAI, AWS Bedrock). La interfaz no-code reduce time-to-value a < 2 semanas.

### 2. LangGraph lidera adopción enterprise en producción
- **Repo**: [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph)
- **Novedad**: Superó a CrewAI en adopción enterprise en Q1 2026. Arquitectura de grafo con checkpoints, rollback y human-in-the-loop nativo — crítico para flujos de aprobación empresarial.
- **Patrón emergente**: Empresas usan LangGraph para orquestar agentes y Dify para la capa de prompt management y RAG.

### 3. MCP (Model Context Protocol) como estándar de integración enterprise
- El protocolo MCP de Anthropic emerge como el estándar para conectar agentes a sistemas empresariales (ERPs, CRMs, SaaS).
- **Repos clave**: `rakeshgangwar/erpnext-mcp-server` (ERPNext via MCP), `infaton/MCP35` (1C:Enterprise, 51 herramientas), múltiples servidores MCP para Salesforce, SAP, ServiceNow.
- **Predicción**: Cada sistema enterprise mayor tendrá servidor MCP oficial en H2 2026.

### 4. CrewAI en 45k★ — 1500+ empresas en producción
- **Repo**: [crewAI-Inc/crewAI](https://github.com/crewAI-Inc/crewAI)
- **Update**: Core MIT; tier enterprise añade UI de monitoreo, RBAC, deployments gestionados. 5.2M descargas mensuales.
- **Caso real**: Equipos de ventas usando CrewAI para lead qualification → proposal generation → CRM update sin intervención humana.

### 5. n8n como "pegamento AI" para stacks legacy
- **Repo**: [n8n-io/n8n](https://github.com/n8n-io/n8n)
- **Tendencia**: Enterprises con RPA viejo (UiPath, AA) lo están envolviendo con n8n + AI agents. RPA para UI scraping; n8n+LangChain para el razonamiento.
- **Resultado**: 60-70% reducción en tiempo de configuración vs. iPaaS tradicionales.

## 📊 Comparativa de adopción (julio 2026)

| Framework | Stars | Tendencia | Dominante en |
|-----------|-------|-----------|--------------|
| Dify | 138k | ↑↑ | Enterprise visual, equipos no-code |
| Langflow | 60k | ↑ | Python-first builders |
| n8n | 50k | ↑ | Automation + AI híbrido |
| AutoGen | 42k | → | Research, coding agents |
| Flowise | 40k | → | RAG chatbots, MVPs |
| CrewAI | 45k | → | Multi-agente con roles |
| Semantic Kernel | 27k | ↑ | Ecosistema Microsoft |
| smolagents | 27k | ↑ | Model-agnostic, minimal |

## 🧠 Repos a seguir esta semana

| Repo | Por qué |
|------|---------|
| [openai/openai-agents-python](https://github.com/openai/openai-agents-python) | SDK oficial de OpenAI — alternativa directa a CrewAI con soporte first-party |
| [google/adk-python](https://github.com/google/adk-python) | Google ADK madurando con observabilidad — fuerte para Google Workspace enterprise |
| [pydantic/pydantic-ai](https://github.com/pydantic/pydantic-ai) | Type-safety para agentes; v1.0 esperado Q3 2026 |
| [mastra-ai/mastra](https://github.com/mastra-ai/mastra) | Framework TypeScript enterprise emergente — para equipos full-stack |

---
*Actualizado automáticamente. Fuentes: GitHub trending, firecrawl.dev, alicelabs.ai, accelirate.com*
