# 🏗️ Repos fundacionales — Enterprise

> Bases sobre las cuales construir soluciones enterprise con AI. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-05

## Frameworks de orquestación de agentes

| Repo | Licencia | Stars | Descripción | ¿Base para AI? |
|------|----------|-------|-------------|----------------|
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | MIT | ~95k | Framework de referencia para LLM apps. Chains, retrievers, tools, memory. Base de LangGraph y Langflow. | Sí — capa de integración universal |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | ~13k | Orquestación de agentes stateful con grafos. Checkpoints, rollback, human-in-the-loop. Estándar de producción enterprise. | Sí — orquestador principal |
| [microsoft/semantic-kernel](https://github.com/microsoft/semantic-kernel) | MIT | 27k+ | SDK enterprise para Python, C#, Java. Plugins, planificación, memoria vectorial, integración Azure OpenAI. | Sí — indispensable en stacks Microsoft |
| [huggingface/smolagents](https://github.com/huggingface/smolagents) | Apache 2.0 | 27k+ | Framework minimalista. Code agents que escriben Python. Compatible con cualquier LLM en HF Hub o local. | Sí — para agentes ligeros |
| [pydantic/pydantic-ai](https://github.com/pydantic/pydantic-ai) | MIT | 12k+ | Type-safety para agentes Python. Validación estricta de I/O, compatible con FastAPI. | Sí — para APIs enterprise tipadas |

## Plataformas visuales de flujos LLM

| Repo | Licencia | Stars | Descripción | ¿Base para AI? |
|------|----------|-------|-------------|----------------|
| [langgenius/dify](https://github.com/langgenius/dify) | Apache 2.0 | 138k+ | Plataforma líder: RAG nativo, multi-agente, drag-drop. Self-hosteable con Docker. | Sí — hub de orquestación enterprise |
| [langflow-ai/langflow](https://github.com/langflow-ai/langflow) | MIT | 60k+ | Builder visual sobre LangChain/LangGraph con Python subyacente. Exporta a código. | Sí — para equipos Python con UI |
| [FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise) | Apache 2.0 | 40k+ | Chatbot LLM builder enfocado en RAG. Setup más rápido. Ideal para MVPs. | Sí — para chatbots internos rápidos |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | Sustainable Use | 50k+ | 400+ integraciones nativas + LangChain para AI. El pegamento entre sistemas legacy y agentes. | Sí — iPaaS con AI integrado |

## Plataformas ERP / CRM (base de customización)

| Repo | Licencia | Stars | Descripción | ¿Base para AI? |
|------|----------|-------|-------------|----------------|
| [frappe/frappe](https://github.com/frappe/frappe) | MIT | 10.4k | Low-code web framework Python+JS. Base de ERPNext. ORM, API REST automática, WebSockets. | Sí — base completa de ERPNext |
| [frappe/erpnext](https://github.com/frappe/erpnext) | GPL-3.0 | 36k+ | ERP open source completo: SCM, manufactura, contabilidad, RRHH, CRM. Auto-API. | Sí — ERP con extensiones AI |
| [odoo/odoo](https://github.com/odoo/odoo) | LGPL-3.0 | 52k+ | ERP+CRM lider open source. 30+ módulos: ventas, inventario, contabilidad, e-commerce. | Sí — ERP más popular para AI |
| [salesagility/SuiteCRM](https://github.com/salesagility/SuiteCRM) | AGPL-3.0 | 4.5k | CRM PHP con 5M+ usuarios. API REST completa. Alternativa open source a Salesforce. | Sí — CRM con API AI-ready |
| [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Apache-2.0 | 1.1k | ERP enterprise de Apache con SCM, CRM integrado. Java, muy customizable. | Sí — para stacks Java enterprise |

## Gobernanza de datos y catálogos

| Repo | Licencia | Stars | Descripción | ¿Base para AI? |
|------|----------|-------|-------------|----------------|
| [datahub-project/datahub](https://github.com/datahub-project/datahub) | Apache 2.0 | 11k+ | Catálogo de datos + linaje + gobernanza. Desarrollado por LinkedIn. Arquitectura event-driven con Kafka. | Sí — gobernanza de datos para AI |
| [open-metadata/OpenMetadata](https://github.com/open-metadata/OpenMetadata) | Apache 2.0 | 8k+ | Plataforma unificada: discovery, governance, quality, linaje, colaboración. 3000+ deployments. | Sí — capa de contexto para agentes |

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
