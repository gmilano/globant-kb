# 🎯 Agentes AI — Retail & Ecommerce

> Agentes y herramientas AI open source para retail, ecommerce y comercio agentico.
> Foco: MIT / Apache 2.0. Última actualización: 2026-07-12

## Agentes y herramientas destacadas

| Nombre | Repo | Licencia | Stars | Descripción |
|--------|------|----------|-------|-------------|
| Enthusiast | [upsidelab/enthusiast](https://github.com/upsidelab/enthusiast) | MIT | ~140 | AI agent ecommerce-nativo con RAG anti-hallucination; búsqueda por lenguaje natural en catálogos; integración nativa Shopify / Shopware / Medusa / Solidus; soporte Shopify UCP endpoint (Apr 2026) |
| e-commerce-agents | [nitin27may/e-commerce-agents](https://github.com/nitin27may/e-commerce-agents) | MIT | ~200 | 6 agentes especializados (product discovery, orders, pricing, reviews, inventory, support) colaborando via protocolo A2A sobre Microsoft Agent Framework; FastAPI + Next.js + PostgreSQL + pgvector; MCP data-access layer (mcp-product, mcp-inventory); puerto .NET lanzado |
| shop-chat-agent | [Shopify/shop-chat-agent](https://github.com/Shopify/shop-chat-agent) | Apache-2.0 | — | Reference app oficial de Shopify para storefront chat agent; integra UCP Skill con 20 años de conocimiento commerce; accede a catálogo + checkout de millones de merchants via UCP MCP endpoint |
| RecAI / InteRecAgent | [microsoft/RecAI](https://github.com/microsoft/RecAI) | MIT | ~1.2k | Puente LLM ↔ RecSys de Microsoft Research; InteRecAgent usa LLM como cerebro + RecSys clásico como tools; incluye RecLM-emb (item retrieval semántico), RecExplainer (explicabilidad), RecLM-gen (fine-tuning dominio); benchmarks RecLM-eval publicados |
| NVIDIA Retail Catalog Enrichment | [NVIDIA-AI-Blueprints/Retail-Catalog-Enrichment](https://github.com/NVIDIA-AI-Blueprints/Retail-Catalog-Enrichment) | Apache-2.0 | — | Blueprint GenAI para enriquecimiento de catálogos a escala; Nemotron VLM genera títulos, descripciones, categorías y variantes de imagen multilocale; corre en NVIDIA NIM; Grid Dynamics lo usa en producción para retailers grandes |
| Agentic Commerce Protocol | [agentic-commerce-protocol/agentic-commerce-protocol](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol) | Apache-2.0 | ~600 | Estándar abierto (OpenAI + Stripe) para checkout agentico; define cart, fulfillment, payment token delegation y OAuth 2.0; Etsy + Shopify (1M+ merchants) + Walmart en producción; PayPal como segundo PSP; ahora integrado con Shopify UCP |
| reco-gym | [criteo-research/reco-gym](https://github.com/criteo-research/reco-gym) | Apache-2.0 | ~480 | Entorno RL para recomendación de productos de Criteo Research; simula flujo de usuario real en ecommerce para entrenar agentes de recomendación; base estándar para investigación RecSys con RL |
| LightRAG | [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG) | MIT | ~25k | RAG con indexación graph-based para catálogos y knowledge bases de producto; backend OpenSearch unificado; multimodal (PDF, imágenes, tablas); setup wizard Docker; ideal para Q&A sobre catálogos y manuales |
| stockpyl | [LarrySnyder/stockpyl](https://github.com/LarrySnyder/stockpyl) | MIT | ~165 | Python para inventory optimization y supply chain simulation; EOQB, newsvendor, Wagner-Whitin, política (s,S); base matemática para agentes de reposición automática |
| AgentScope | [agentscope-ai/agentscope](https://github.com/agentscope-ai/agentscope) | Apache-2.0 | ~6k | Framework multi-agente de Alibaba con monitoreo visual; producción probada en pricing dinámico, inventory y atención al cliente en ecommerce a escala |
| Shopping AI Agent (Redis) | [redis-developer/shopping-ai-agent-langgraph-js-demo](https://github.com/redis-developer/shopping-ai-agent-langgraph-js-demo) | — | — | Agente de compras grocery con LangGraph.js + Redis semantic caching; recipe tools + product search; demuestra semantic caching para respuestas ultrarrápidas en alto volumen |

---

## Frameworks de orquestación recomendados para Retail

| Framework | Repo | Licencia | Caso de uso retail clave |
|-----------|------|----------|--------------------------|
| LangGraph | [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | Workflows de pricing/inventory con memoria persistente y human-in-the-loop |
| CrewAI | [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | Investigación de competencia, análisis de tendencias de producto; 52.8k★ |
| Microsoft Agent Framework | [microsoft/agent-framework](https://github.com/microsoft/agent-framework) | MIT | Orquestación A2A+MCP para suites enterprise de retail (ERP + CRM + commerce) |
| DeerFlow | [bytedance/deer-flow](https://github.com/bytedance/deer-flow) | Apache-2.0 | ~70.7k★; sub-agents + memory + sandboxes; GitHub Trending #1 Feb 2026 |
| Dify | [langgenius/dify](https://github.com/langgenius/dify) | Apache-2.0 | Low-code RAG + agentes para equipos de negocio en retail (sin código); ~144k★ |

---

## Herramientas especializadas retail

| Herramienta | Repo | Licencia | Función |
|-------------|------|----------|---------|
| medusa-mcp | [SGFGOV/medusa-mcp](https://github.com/SGFGOV/medusa-mcp) | MIT | MCP server para Medusa.js SDK; permite a agentes interactuar con ecommerce backend via MCP |
| Shopify AI Toolkit | [shopify.dev/docs/agents](https://shopify.dev/docs/agents) | Apache-2.0 | UCP Skill open-source; Checkout MCP; Catalog API; registro de agentes sin aprobación previa (Spring '26) |
| recommendationRaccoon | [guymorita/recommendationRaccoon](https://github.com/guymorita/recommendationRaccoon) | MIT | Collaborative filtering en Node.js + Redis para recomendaciones en tiempo real |
| shelfops | [IFAKA/shelfops](https://github.com/IFAKA/shelfops) | — | Retail shelf audit con visión (Cerebras Gemma 4 vs local Gemma); detección de compliance en lineal |
| smart-retail-analytics | [intel-iot-devkit/smart-retail-analytics](https://github.com/intel-iot-devkit/smart-retail-analytics) | Apache-2.0 | Analytics de engagement, tráfico de tienda y shelf inventory con OpenVINO CV |

---
*Actualizado automáticamente por el pipeline de ingest.*
