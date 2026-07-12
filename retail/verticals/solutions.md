# 🏭 Verticales de partida — Retail & Ecommerce

> Plataformas verticales existentes customizables con AI agéntica.
> Modelo: partir de algo funcional con datos reales, añadir capa agéntica arriba.
> Última actualización: 2026-07-12

## Plataformas recomendadas por vertical de retail

| Plataforma | Licencia | Repo / URL | Stack | Caso de uso principal | Stars |
|------------|----------|------------|-------|-----------------------|-------|
| **Medusa.js** | MIT | [medusajs/medusa](https://github.com/medusajs/medusa) | Node.js / TypeScript / PG | Ecommerce headless composable; B2C y B2B; API-first; modular; medusa-mcp para integración LLM | ~35k |
| **Saleor** | BSD-3-Clause | [saleor/saleor](https://github.com/saleor/saleor) | Python / Django / GraphQL | Ecommerce headless B2B enterprise; GraphQL nativo hace queries de agentes muy eficientes | ~23k |
| **Shopify (UCP)** | Propietario + Apache-2.0 Toolkit | [shopify.dev/docs/agents](https://shopify.dev/docs/agents) | SaaS + UCP MCP endpoint | Mayor ecosistema de merchants; Spring '26 abrió UCP a todos los devs; shop-chat-agent como referencia | SaaS |
| **WooCommerce** | GPL-3.0 | [woocommerce/woocommerce](https://github.com/woocommerce/woocommerce) | PHP / WordPress | Mayor base instalada global; REST API v3 completa; plugins AI disponibles | ~10.4k |
| **PrestaShop** | OSL-3.0 | [PrestaShop/PrestaShop](https://github.com/PrestaShop/PrestaShop) | PHP / Symfony | Ecommerce SME + mid-market LATAM; módulos AI Knowband (chatbot + vector search) | ~9k |
| **Bagisto** | MIT | [bagisto/bagisto](https://github.com/bagisto/bagisto) | PHP / Laravel / Vue.js | Ecommerce Laravel; multi-canal; LATAM-friendly; APIs REST + WebSocket | ~16k |
| **Apache OFBiz** | Apache-2.0 | [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Java | ERP + ecommerce enterprise; catálogo, inventario, pedidos, CRM integrados | ~700 |
| **Odoo** | LGPL-3.0 | [odoo/odoo](https://github.com/odoo/odoo) | Python / JavaScript | All-in-one ERP+ecommerce; módulo ecommerce maduro + POS + inventario; muy adoptado en LATAM | ~53k |
| **Solidus** | BSD-3 | [solidusio/solidus](https://github.com/solidusio/solidus) | Ruby on Rails | Retailers medianos/grandes; compatible con Enthusiast AI agent | ~5k |

## Plataformas de gestión de punto de venta (POS)

| Plataforma | Licencia | Repo | Stack | Descripción |
|------------|----------|------|-------|-------------|
| **Odoo POS** | LGPL-3.0 | [odoo/odoo](https://github.com/odoo/odoo) | Python / JS | POS integrado con ERP Odoo; offline-capable; popular en LATAM |
| **ERPNext Retail** | MIT | [frappe/erpnext](https://github.com/frappe/erpnext) | Python/JS | ERP con módulo retail + POS; MCP-integrable; ideal para agentes de inventario |
| **UniCenta** | GPL-3.0 | [UniCenta/unicentaoPOS](https://github.com/UniCenta/unicentaoPOS) | Java | POS para restaurantes y retail; Java cross-platform |

## CRM para retail

| Plataforma | Licencia | Repo | Descripción |
|------------|----------|------|-------------|
| **SuiteCRM** | AGPL-3.0 | [salesagility/SuiteCRM](https://github.com/salesagility/SuiteCRM) | CRM completo; PHP; popular en LATAM; base para agentes de customer service |
| **Dolibarr** | GPL-3.0 | [Dolibarr/dolibarr](https://github.com/Dolibarr/dolibarr) | ERP+CRM integrado para SME; retail, inventario, billing; 18k★ |
| **ERPNext Retail** | MIT | [frappe/erpnext](https://github.com/frappe/erpnext) | Python/JS; ERP con módulo retail + POS; muy adoptado en LATAM; base para AI agents |

## Cómo añadir capa agéntica

### Opción A: Medusa.js + Enthusiast + medusa-mcp (Globant stack recomendado)

```
1. Fork medusajs/medusa → instancia con catálogo real
2. Deploy medusa-mcp (SGFGOV/medusa-mcp) → expone SDK via MCP
3. Deploy upsidelab/enthusiast → RAG anti-hallucination sobre catálogo
4. Conectar Enthusiast + LangGraph → workflows multi-step
5. Exponer ACP/UCP endpoint → checkout agentico para AI shopping agents
```

### Opción B: Shopify + shop-chat-agent + UCP (onboarding rápido)

```
1. Store Shopify existente (1M+ merchants disponibles)
2. Registrar agente en Developer Dashboard (sin aprobación desde Spring '26)
3. Fork Shopify/shop-chat-agent → agente chat personalizado
4. Integrar UCP Skill → acceso a catálogo + checkout completo
5. Deploy Claude Haiku como LLM backend → bajo costo para alto volumen
```

### Opción C: Odoo/ERPNext + agentes (enterprise con ERP)

```
1. ERPNext/Odoo con datos reales de inventario y clientes
2. Exponer APIs REST/GraphQL → wrapper MCP tool
3. LangGraph agent con tools: get_inventory, update_order, recommend_product
4. Claude Haiku para bajo costo en alta frecuencia (alerts, restock)
5. Claude Sonnet para análisis complejo (demand forecasting narrativo)
```

### Opción D: NVIDIA Catalog Enrichment (retailer con catálogo grande)

```
1. Dataset de imágenes de productos + metadata básica
2. Deploy NVIDIA Blueprint (Retail-Catalog-Enrichment) via NIM APIs
3. Nemotron VLM genera: títulos, descripciones, categorías, tags por locale
4. FLUX.1 genera lifestyle images culturalmente apropiadas
5. Import resultados a Medusa/Saleor/Shopify → catálogo enriquecido a escala
```

### Patterns de integración

- **Catálogo** → Medusa/Saleor API → LightRAG (indexación semántica) → Enthusiast (Q&A agente)
- **Inventario** → stockpyl (optimización) → LangGraph (orquestación) → alertas automáticas
- **Checkout** → ACP/UCP (protocolo) → Stripe/PayPal/MercadoPago → order sin fricción
- **Recomendaciones** → RecAI/InteRecAgent → Claude Haiku re-ranking → API REST
- **Warehouse** → NVIDIA MAIW (5 agentes) → digital twin + ERP → operaciones autónomas

---
*Ver también: `repos/foundations.md` para repos técnicos base.*
