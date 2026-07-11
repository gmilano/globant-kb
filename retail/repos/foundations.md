# 🏗️ Repos fundacionales — Retail & Ecommerce

> Bases sobre las cuales construir. Licencia abierta, comunidad activa, producción probada.
> Última actualización: 2026-07-11

## Plataformas ecommerce headless (base para añadir capa agéntica)

| Repo | Licencia | Stars | Stack | Descripción | Base para AI |
|------|----------|-------|-------|-------------|---------------|
| [medusajs/medusa](https://github.com/medusajs/medusa) | MIT | ~33k | Node.js / TypeScript / PostgreSQL | Plataforma ecommerce headless líder; API-first, modular, 14k+ desarrolladores en comunidad; Medusa 2.0 con módulos desacoplados | ✅ Excelente — REST APIs para cada entidad, plugin ecosystem |
| [saleor/saleor](https://github.com/saleor/saleor) | Apache-2.0 | ~22k | Python / Django / GraphQL | Plataforma headless con GraphQL nativo; fuerte en B2B; Saleor Apps marketplace para extensiones | ✅ Muy buena — GraphQL hace a los agentes muy eficientes en queries |
| [woocommerce/woocommerce](https://github.com/woocommerce/woocommerce) | GPL-3.0 | ~10.4k | PHP / WordPress | Plataforma con mayor base instalada global; REST API completa en v2/v3; WooCommerce Blocks con React | ⚠️ Buena — notar licencia GPL para extensiones |
| [PrestaShop/PrestaShop](https://github.com/PrestaShop/PrestaShop) | OSL-3.0 | ~9k+ | PHP / Symfony | ERP + ecommerce; 9k+ stars Marzo 2026; módulos AI disponibles (chatbot con vector search) | ✅ Buena — API REST + módulos AI Knowband disponibles |
| [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Apache-2.0 | ~700 | Java / Groovy | Apache OFBiz: ERP + ecommerce enterprise; ScipioERP es fork más moderno con B2B/B2C avanzado | ✅ Buena — Java; base para enterprise retail con ERP integrado |
| [gz-yami/mall4j](https://github.com/gz-yami/mall4j) | AGPL-3.0 | ~5.1k | Java / Spring Boot | Plataforma ecommerce china con app móvil; H5/PC/mini-app; popular para mercados APAC | ⚠️ Usar — atención a licencia AGPL |
| [itswadesh/svelte-commerce](https://github.com/itswadesh/svelte-commerce) | MIT | ~1.8k | SvelteKit / Node.js | Storefront headless para cualquier backend ecommerce; SSR; excelente como UI layer para agentes | ✅ Excelente como UI capa presentación para arquitecturas agénticas |

## Infraestructura de datos y búsqueda (crítica para AI retail)

| Repo | Licencia | Stars | Función retail |
|------|----------|-------|----------------|
| [meilisearch/meilisearch](https://github.com/meilisearch/meilisearch) | MIT | ~48k | Motor de búsqueda de producto ultrarrápido; typo-tolerant; integración nativa con Medusa/Saleor |
| [opensearch-project/OpenSearch](https://github.com/opensearch-project/OpenSearch) | Apache-2.0 | ~10k | Búsqueda + vector store; backend unificado de LightRAG; ideal para catálogos grandes |
| [pgvector/pgvector](https://github.com/pgvector/pgvector) | MIT | ~16k | Vector similarity search en PostgreSQL; usado en e-commerce-agents para product search semántico |
| [LarrySnyder/stockpyl](https://github.com/LarrySnyder/stockpyl) | MIT | ~165 | Inventory optimization matemático: EOQB, newsvendor, (s,S) policy — base para agentes de reposición |

## Plataformas de análisis y BI para retail

| Repo | Licencia | Stars | Función |
|------|----------|-------|----------|
| [apache/superset](https://github.com/apache/superset) | Apache-2.0 | ~64k | BI y dashboards para métricas de retail; connectors a PG/MySQL/BigQuery |
| [metabase/metabase](https://github.com/metabase/metabase) | AGPL-3.0 | ~40k | Analytics self-hosted con AI query; sencillo para equipos de tienda |

## MCP Servers para ecommerce (integración con LLMs)

| Repo | Licencia | Descripción |
|------|----------|-------------|
| [SGFGOV/medusa-mcp](https://github.com/SGFGOV/medusa-mcp) | MIT | MCP server oficial para Medusa.js SDK — permite a LLMs gestionar catálogo, orders, clientes |
| [nitin27may/e-commerce-agents](https://github.com/nitin27may/e-commerce-agents) | MIT | MCP servers mcp-product + mcp-inventory sobre HTTP streamable; patrón de referencia |

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
