# 🏭 Verticales de partida — Retail & Ecommerce

> Plataformas verticales existentes customizables con AI agéntica.
> Modelo: partir de algo funcional con datos reales, añadir capa agéntica arriba.
> Última actualización: 2026-07-11

## Plataformas recomendadas por vertical de retail

| Plataforma | Licencia | Repo / URL | Stack | Caso de uso principal | Stars |
|------------|----------|------------|-------|-----------------------|-------|
| **Medusa.js** | MIT | [medusajs/medusa](https://github.com/medusajs/medusa) | Node.js / TypeScript / PG | Ecommerce headless composable; B2C y B2B; API-first; modular | ~33k |
| **Saleor** | Apache-2.0 | [saleor/saleor](https://github.com/saleor/saleor) | Python / Django / GraphQL | Ecommerce headless B2B enterprise; GraphQL nativo; Saleor Apps | ~22k |
| **WooCommerce** | GPL-3.0 | [woocommerce/woocommerce](https://github.com/woocommerce/woocommerce) | PHP / WordPress | Plataforma ecommerce con mayor base instalada global; REST API v3 | ~10.4k |
| **PrestaShop** | OSL-3.0 | [PrestaShop/PrestaShop](https://github.com/PrestaShop/PrestaShop) | PHP / Symfony | Ecommerce SME + mid-market; módulos AI disponibles (chatbot vector search) | ~9k |
| **Apache OFBiz** | Apache-2.0 | [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Java | ERP + ecommerce enterprise; catálogo, inventario, pedidos, CRM integrados | ~700 |
| **Odoo (Commerce)** | LGPL-3.0 | [odoo/odoo](https://github.com/odoo/odoo) | Python / JavaScript | ERP con módulo ecommerce; desde POS hasta online store; muy adoptado en LATAM | ~40k |
| **Solidus** | BSD-3 | [solidusio/solidus](https://github.com/solidusio/solidus) | Ruby on Rails | Plataforma ecommerce para retailers medianos/grandes; compatible con Enthusiast | ~5k |
| **OpenCart** | GPL-3.0 | [opencart/opencart](https://github.com/opencart/opencart) | PHP | Solución simple para SME; 100k+ tiendas activas; bajo coste de entrada | ~7.5k |
| **Bagisto** | MIT | [bagisto/bagisto](https://github.com/bagisto/bagisto) | PHP / Laravel / Vue.js | Ecommerce Laravel; soporte multi-canal (web, mobile, marketplace); LATAM friendly | ~16k |

## Plataformas de gestión de punto de venta (POS)

| Plataforma | Licencia | Repo | Stack | Descripción |
|------------|----------|------|-------|-------------|
| **Odoo POS** | LGPL-3.0 | [odoo/odoo](https://github.com/odoo/odoo) | Python / JS | POS integrado con ERP Odoo; offline-capable; popular en LATAM |
| **UniCenta** | GPL-3.0 | [unicenta/unicenta-opos](https://github.com/UniCenta/unicentaoPOS) | Java | POS para restaurantes y retail; Java cross-platform |
| **Floreant POS** | GPL-3.0 | — | Java | POS open source para hospitality y retail; sin nube requerida |

## CRM para retail

| Plataforma | Licencia | Repo | Descripción |
|------------|----------|------|-------------|
| **SuiteCRM** | AGPL-3.0 | [salesagility/SuiteCRM](https://github.com/salesagility/SuiteCRM) | CRM completo feature-parity Salesforce; PHP; popular en LATAM |
| **Dolibarr** | GPL-3.0 | [Dolibarr/dolibarr](https://github.com/Dolibarr/dolibarr) | ERP+CRM integrado para SME; retail, inventario, billing; 18k★ |
| **ERPNext Retail** | MIT | [frappe/erpnext](https://github.com/frappe/erpnext) | Python/JS; ERP con módulo retail + POS; muy adoptado en LATAM; base para AI agents |

## Cómo añadir capa agéntica

### Paso a paso para Medusa.js + Enthusiast

```
1. Fork medusajs/medusa → tu instancia con catálogo real
2. Deploy medusa-mcp (SGFGOV/medusa-mcp) → expone SDK via MCP
3. Deploy upsidelab/enthusiast → RAG sobre tu catálogo
4. Conectar Enthusiast → LangGraph para workflows multi-step
5. Exponer ACP endpoints → checkout agentico para AI shopping agents
```

### Paso a paso para Odoo/ERPNext + agentes

```
1. ERPNext/Odoo con datos reales de inventario y clientes
2. Exponer APIs REST/GraphQL → wrapper MCP tool
3. LangGraph agent con tools: get_inventory, update_order, recommend_product
4. Claude Haiku para bajo costo en alta frecuencia (alerts, restock)
5. Claude Sonnet para análisis complejo (demand forecasting narrativo)
```

### Patterns de integración

- **Catálogo** → Medusa/Saleor API → LightRAG (indexación semántica) → Enthusiast (Q&A agente)
- **Inventario** → stockpyl (optimización) → LangGraph (orquestación) → alertas automáticas
- **Checkout** → ACP (protocolo) → Stripe/PayPal → order completion sin fricción
- **Recomendaciones** → RecAI/InteRecAgent → modelo fine-tuned en dominio → API REST

---
*Ver también: `repos/foundations.md` para repos técnicos base.*
