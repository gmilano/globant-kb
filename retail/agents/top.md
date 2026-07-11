# 🎯 Agentes AI — Retail & Ecommerce

> Agentes y herramientas AI open source para retail, ecommerce y comercio agentico.
> Foco: MIT / Apache 2.0. Última actualización: 2026-07-11

## Agentes y herramientas destacadas

| Nombre | Repo | Licencia | Stars | Descripción |
|--------|------|----------|-------|-------------|
| Enthusiast | [upsidelab/enthusiast](https://github.com/upsidelab/enthusiast) | MIT | ~140 | AI agent ecommerce-nativo con RAG anti-hallucination, búsqueda por lenguaje natural en catálogos, integración nativa Shopify / Shopware / Medusa / Solidus, stack Python/Django/PostgreSQL/React, deploy Docker o K8s |
| e-commerce-agents | [nitin27may/e-commerce-agents](https://github.com/nitin27may/e-commerce-agents) | MIT | ~200 | 6 agentes especializados (product discovery, orders, pricing, reviews, inventory, support) colaborando via protocolo A2A sobre Microsoft Agent Framework; FastAPI + Next.js + PostgreSQL + pgvector; MCP data-access layer (mcp-product, mcp-inventory) |
| RecAI / InteRecAgent | [microsoft/RecAI](https://github.com/microsoft/RecAI) | MIT | ~1.2k | Puente LLM ↔ RecSys de Microsoft Research; InteRecAgent usa LLM como cerebro + modelos de recomendación clásicos como tools; incluye RecLM-emb (item retrieval) + RecExplainer (explicabilidad) + RecLM-gen (fine-tuning dominio) |
| Agentic Commerce Protocol | [agentic-commerce-protocol/agentic-commerce-protocol](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol) | Apache-2.0 | ~600 | Estándar abierto (OpenAI + Stripe) para checkout agentico; define cart, fulfillment, payment token delegation y OAuth 2.0; en beta procesando transacciones en Etsy + Shopify 1M+ merchants + Walmart; PayPal como segundo PSP compatible |
| reco-gym | [criteo-research/reco-gym](https://github.com/criteo-research/reco-gym) | Apache-2.0 | ~480 | Entorno RL para recomendación de productos de Criteo Research; simula flujo de usuario real en ecommerce para entrenar y evaluar agentes de recomendación; base estándar para investigación en RecSys con RL |
| LightRAG | [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG) | MIT | ~24k | RAG con indexación graph-based para catálogos y knowledge bases de producto; backend OpenSearch unificado; multimodal (PDF, imágenes, tablas); setup wizard para deploy local con Docker; ideal para Q&A sobre catálogos y manuales de producto |
| stockpyl | [LarrySnyder/stockpyl](https://github.com/LarrySnyder/stockpyl) | MIT | ~165 | Python para inventory optimization y supply chain simulation; cubre EOQB, newsvendor, Wagner-Whitin, política (s,S); base matemática para agentes de reposición automática de stock |
| AgentScope | [agentscope-ai/agentscope](https://github.com/agentscope-ai/agentscope) | Apache-2.0 | ~6k | Framework multi-agente de Alibaba con monitoreo visual en tiempo real; producción probada en pipelines de pricing dinámico, inventory y atención al cliente en ecommerce a escala |
| 500-AI-Agents-Projects | [ashishpatel26/500-AI-Agents-Projects](https://github.com/ashishpatel26/500-AI-Agents-Projects) | MIT | ~32k | Colección curada de 500+ implementaciones de agentes AI con links a repos; sección retail incluye demand forecasting agents, dynamic pricing agents, store analytics agents |
| retail-ai-store-level-intelligence | [Svyatoslavpech/retail-ai-store-level-intelligence](https://github.com/Svyatoslavpech/retail-ai-store-level-intelligence) | Apache-2.0 | ~0 | Demo de inteligencia a nivel de tienda física: planogramas, detección shelf-out-of-stock con visión computacional, alertas en tiempo real; arquitectura de referencia para retail físico |

---

## Frameworks de orquestación recomendados para Retail

| Framework | Repo | Licencia | Caso de uso retail clave |
|-----------|------|----------|--------------------------|
| LangGraph | [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | Workflows de pricing/inventory con memoria persistente y human-in-the-loop |
| CrewAI | [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | Investigación de competencia, análisis de tendencias de producto |
| Microsoft Agent Framework | [microsoft/agent-framework](https://github.com/microsoft/agent-framework) | MIT | Orquestación A2A+MCP para suites enterprise de retail (ERP + CRM + commerce) |
| n8n | [n8n-io/n8n](https://github.com/n8n-io/n8n) | fair-code | 400+ integraciones: triage de email, pipelines de contenido, alertas de inventario |
| Dify | [langgenius/dify](https://github.com/langgenius/dify) | Apache-2.0 | Low-code RAG + agentes para equipos de negocio en retail (sin código) |

---

## Herramientas especializadas retail

| Herramienta | Repo | Licencia | Función |
|-------------|------|----------|---------|
| recommendationRaccoon | [guymorita/recommendationRaccoon](https://github.com/guymorita/recommendationRaccoon) | MIT | Collaborative filtering en Node.js + Redis para recomendaciones en tiempo real |
| medusa-mcp | [SGFGOV/medusa-mcp](https://github.com/SGFGOV/medusa-mcp) | MIT | MCP server para Medusa.js SDK; permite a agentes interactuar con el backend de ecommerce via MCP |
| shelfops | [IFAKA/shelfops](https://github.com/IFAKA/shelfops) | — | Retail shelf audit con visión (Cerebras Gemma 4 vs local Gemma); detección de compliance en lineal |

---
*Actualizado automáticamente por el pipeline de ingest.*
