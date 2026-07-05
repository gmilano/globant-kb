# 🎯 Agentes AI — enterprise

> Agentes y herramientas AI open source para la industria enterprise. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-05

## Agentes y herramientas destacadas

| Nombre | Repo | Licencia | Stars | Descripción |
|--------|------|----------|-------|-------------|
| LangGraph | [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | ~13k | Orquestación de agentes con grafos de estado; estándar de facto para producción enterprise. Audit trails nativos, rollback, human-in-the-loop. |
| CrewAI | [crewAI-Inc/crewAI](https://github.com/crewAI-Inc/crewAI) | MIT | 45k+ | Framework multi-agente con roles; 5.2M descargas/mes. RBAC y UI enterprise disponibles. 1500+ empresas en producción. |
| AutoGen / AG2 | [microsoft/autogen](https://github.com/microsoft/autogen) | Apache 2.0 | 42k+ | Conversaciones multi-agente de Microsoft. La rama AG2 continúa el lineage v0.2 con soporte comunitario activo. |
| Semantic Kernel | [microsoft/semantic-kernel](https://github.com/microsoft/semantic-kernel) | MIT | 27k+ | SDK enterprise de Microsoft para Python, C# y Java. Plugins modulares, memoria, planificación de objetivos, observabilidad con telemetría. |
| Dify | [langgenius/dify](https://github.com/langgenius/dify) | Apache 2.0 | 138k+ | Plataforma visual LLM líder en open source. RAG nativo, multi-agente, orquestación drag-drop. Ideal para equipos sin deep ML expertise. |
| Langflow | [langflow-ai/langflow](https://github.com/langflow-ai/langflow) | MIT | 60k+ | Builder visual sobre LangChain/LangGraph con código Python subyacente. Combina UI no-code con extensibilidad full-code. |
| Flowise | [FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise) | Apache 2.0 | 40k+ | Constructor de chatbots LLM con recuperación de documentos (RAG) más rápido de configurar. Ideal para MVPs y chatbots empresariales. |
| smolagents | [huggingface/smolagents](https://github.com/huggingface/smolagents) | Apache 2.0 | 27k+ | Framework minimalista de HuggingFace. Code agents que escriben Python directamente; soporte para todos los LLMs de HF Hub. |
| PydanticAI | [pydantic/pydantic-ai](https://github.com/pydantic/pydantic-ai) | MIT | 12k+ | Framework Python-first con tipos estrictos. Validación de inputs/outputs de agentes; resonó con equipos enterprise acostumbrados a FastAPI/Pydantic. |
| n8n | [n8n-io/n8n](https://github.com/n8n-io/n8n) | Sustainable Use | 50k+ | Automatización de flujos con 400+ integraciones nativas + LangChain para AI. El pegamento entre sistemas legacy y agentes modernos. |

---

## Por caso de uso enterprise

| Caso de Uso | Herramienta Recomendada | Razón |
|-------------|-------------------------|-------|
| Producción crítica / auditoría | LangGraph | Graph-state, rollback, trazabilidad nativa |
| Automatización de procesos cross-sistema | n8n + Dify | 400+ conectores + RAG visual |
| Equipos Microsoft (.NET / Azure) | Semantic Kernel | C#, Java, Python; integración con Azure OpenAI |
| Multi-agente con roles definidos | CrewAI | Role-based, 1500+ casos reales documentados |
| Prototipado rápido con LLM | Flowise / Langflow | Setup < 30 min, drag-drop |
| Equipos con restricciones de modelo | smolagents | Compatible con cualquier modelo HF o local |

---
*Actualizado automáticamente por el pipeline de ingest.*
