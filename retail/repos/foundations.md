# 🏗️ Repos fundacionales — Retail & Ecommerce

> Bases sobre las cuales construir. Licencia abierta, comunidad activa, producción probada.
> Última actualización: 2026-07-12

## Plataformas ecommerce headless (base para añadir capa agéntica)

| Repo | Licencia | Stars | Stack | Descripción | Base para AI |
|------|----------|-------|-------|-------------|---------------|
| [medusajs/medusa](https://github.com/medusajs/medusa) | MIT | ~35k | Node.js / TypeScript / PostgreSQL | Plataforma ecommerce headless líder; API-first, modular; Medusa 2.0 con módulos desacoplados; 14k+ desarrolladores en comunidad | ✅ Excelente — REST APIs para cada entidad; medusa-mcp server disponible |
| [saleor/saleor](https://github.com/saleor/saleor) | BSD-3-Clause | ~23k | Python / Django / GraphQL | Plataforma headless con GraphQL nativo; fuerte en B2B; Saleor Apps marketplace para extensiones | ✅ Muy buena — GraphQL hace queries de agentes muy eficientes |
| [woocommerce/woocommerce](https://github.com/woocommerce/woocommerce) | GPL-3.0 | ~10.4k | PHP / WordPress | Mayor base instalada global; REST API completa v2/v3; WooCommerce Blocks con React | ⚠️ Buena — notar licencia GPL para extensiones |
| [PrestaShop/PrestaShop](https://github.com/PrestaShop/PrestaShop) | OSL-3.0 | ~9k | PHP / Symfony | ERP + ecommerce; módulos AI disponibles (chatbot con vector search); popular en LATAM | ✅ Buena — API REST + módulos AI Knowband disponibles |
| [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Apache-2.0 | ~700 | Java / Groovy | Apache OFBiz: ERP + ecommerce enterprise; ScipioERP es fork más moderno con B2B/B2C avanzado | ✅ Buena — base para enterprise retail con ERP integrado |
| [bagisto/bagisto](https://github.com/bagisto/bagisto) | MIT | ~16k | PHP / Laravel / Vue.js | Ecommerce Laravel; multi-canal (web, mobile, marketplace); LATAM friendly; activo en 2026 | ✅ Buena — APIs REST + canal WhatsApp compatible |
| [itswadesh/svelte-commerce](https://github.com/itswadesh/svelte-commerce) | MIT | ~1.8k | SvelteKit / Node.js | Storefront headless SSR para cualquier backend; ideal como UI layer para arquitecturas agénticas | ✅ Excelente como UI layer para sistemas agénticos |

## Infraestructura de datos y búsqueda (crítica para AI retail)

| Repo | Licencia | Stars | Función retail |
|------|----------|-------|----------------|
| [meilisearch/meilisearch](https://github.com/meilisearch/meilisearch) | MIT | ~48k | Motor de búsqueda ultrarrápido typo-tolerant; integración nativa Medusa/Saleor; base para product discovery |
| [opensearch-project/OpenSearch](https://github.com/opensearch-project/OpenSearch) | Apache-2.0 | ~10k | Búsqueda + vector store unificado; backend de LightRAG; ideal para catálogos grandes con semántica |
| [pgvector/pgvector](https://github.com/pgvector/pgvector) | MIT | ~16k | Vector similarity search en PostgreSQL; usado en e-commerce-agents para product search semántico |
| [redis-developer/shopping-ai-agent-langgraph-js-demo](https://github.com/redis-developer/shopping-ai-agent-langgraph-js-demo) | — | — | Patrón con Redis semantic caching para grocery agent; demuestra latencias sub-100ms en búsquedas repetidas |
| [LarrySnyder/stockpyl](https://github.com/LarrySnyder/stockpyl) | MIT | ~165 | Inventory optimization: EOQB, newsvendor, Wagner-Whitin, (s,S) — base para agentes de reposición |

## AI Blueprints (nuevos 2026 — base para proyectos enterprise)

| Repo | Licencia | Stars | Función |
|------|----------|-------|----------|
| [NVIDIA-AI-Blueprints/Retail-Catalog-Enrichment](https://github.com/NVIDIA-AI-Blueprints/Retail-Catalog-Enrichment) | Apache-2.0 | — | GenAI para catálogos: Nemotron VLM genera títulos, descripciones, categorías, lifestyle images localizadas a escala |
| [NVIDIA-AI-Blueprints](https://github.com/NVIDIA-AI-Blueprints) | Apache-2.0 | — | Hub de blueprints NVIDIA; incluye MAIW (Multi-Agent Intelligent Warehouse) con 5 agentes especializados |

## Plataformas de análisis y BI para retail

| Repo | Licencia | Stars | Función |
|------|----------|-------|----------|
| [apache/superset](https://github.com/apache/superset) | Apache-2.0 | ~64k | BI y dashboards para métricas de retail; connectors PG/MySQL/BigQuery |
| [metabase/metabase](https://github.com/metabase/metabase) | AGPL-3.0 | ~40k | Analytics self-hosted con AI query; sencillo para equipos de tienda |

## MCP Servers para ecommerce (integración con LLMs)

| Repo | Licencia | Descripción |
|------|----------|-------------|
| [SGFGOV/medusa-mcp](https://github.com/SGFGOV/medusa-mcp) | MIT | MCP server para Medusa.js SDK — permite a LLMs gestionar catálogo, orders, clientes via MCP |
| [nitin27may/e-commerce-agents](https://github.com/nitin27may/e-commerce-agents) | MIT | MCP servers mcp-product + mcp-inventory sobre HTTP streamable; patrón de referencia A2A |
| Shopify UCP MCP endpoint | Apache-2.0 (Toolkit) | Shopify AI Toolkit UCP Skill; endpoint público (sin aprobación previa Spring '26); acceso a millones de merchants |

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
