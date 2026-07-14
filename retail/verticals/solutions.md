# Verticales de partida — Retail & eCommerce

> Plataformas verticales open source customizables con AI.
> Modelo: partir de algo funcional, añadir capa agentica arriba.
> Última actualización: 2026-07-14 (v9)

## Plataformas recomendadas

| Plataforma | Licencia | Repo / URL | Stack | Caso de uso | AI-readiness |
|------------|----------|-----------|-------|-------------|-------------|
| **Medusa.js** | MIT | [medusajs/medusa](https://github.com/medusajs/medusa) | Node.js + TypeScript | Headless eCommerce API-first. Ideal para tiendas que necesitan experiencias personalizadas (mobile, voice, chat, AR). 31k★. | ★★★★★ — MCP server disponible, tutorial Claude Code oficial, módulos plugin-based |
| **WooCommerce** | GPL-2.0 | [woocommerce/woocommerce](https://github.com/woocommerce/woocommerce) | PHP + WordPress | El estándar de facto para SMB retail. 37% market share global. 6.5M tiendas. Ecosistema masivo de plugins. Fuerte presencia LATAM (AR, BR, MX). | ★★★★☆ — WooCommerce MCP server, miles de plugins, REST API completa |
| **Odoo** | LGPL-3.0 | [odoo/odoo](https://github.com/odoo/odoo) + [odoo.com](https://odoo.com) | Python + JavaScript | ERP all-in-one con módulo eCommerce + POS + inventario + CRM. 5M+ usuarios. 50+ módulos en un solo DB. Odoo 20 (sep 2026) añade Agentic AI nativo. | ★★★★☆ — Odoo 20 Agentic AI, API REST, Python extensible, partners LATAM certificados |
| **Apache OFBiz** | Apache-2.0 | [apache/ofbiz](https://github.com/apache/ofbiz) | Java | ERP enterprise completo: eCommerce B2B+B2C, CRM, supply chain, contabilidad, manufactura. 20+ años de madurez. Ideal para enterprise grande. | ★★★☆☆ — API completa, alto grado de customización pero curva de aprendizaje alta |
| **Dolibarr** | Apache-2.0 | [Dolibarr/dolibarr](https://github.com/Dolibarr/dolibarr) | PHP | ERP+CRM para SMB: invoicing, inventory, stock, pedidos, clientes. Más liviano que Odoo. Ideal para retail pequeño que no necesita eCommerce complejo. | ★★★☆☆ — REST API, módulos extensibles, rápido de instalar |
| **InvenTree** | MIT | [inventree/InvenTree](https://github.com/inventree/InvenTree) | Python / Django | Sistema de gestión de inventario open source. Tracking de partes, stock, suppliers, BOM. REST API robusta. Ideal como backend de inventario para agentes. | ★★★★☆ — API-first, integración con agentes para alertas y reposición automática |
| **ERPNext** | GPL-3.0 | [frappe/erpnext](https://github.com/frappe/erpnext) | Python (Frappe) | ERP completo con módulo POS y retail. Fuerte en India y emergentes. Inventory, purchasing, sales, accounting. | ★★★☆☆ — API REST Frappe, Python extensible, self-hosted |
| **Shopware** | MIT | [shopware/shopware](https://github.com/shopware/shopware) | PHP / Symfony | Plataforma headless B2B+B2C. Líder en DACH. Flow Builder visual. REST API + Admin API. Complemento de WooCommerce para enterprise europeo. | ★★★★☆ — Flow Builder + AI rules, API-first, extensible |

## Cómo customizar con AI (modelo de trabajo Globant)

### Opción A: Medusa.js + Capa Agentica (recomendado para new builds)
```
Medusa.js (backend headless)
    ↓ REST API / SDK
medusa-mcp server (expone Medusa como MCP tools)
    ↓ MCP Protocol
Claude / LLM Agente (gestiona productos, órdenes, clientes)
    ↓
UCP endpoint (/.well-known/ucp) → visible en Google AI Shopping
ACP integration → visible en ChatGPT Shopping
```

### Opción B: WooCommerce + MCP + Claude (para clientes con WordPress existente)
```
WooCommerce (tienda existente en WordPress)
    ↓ REST API
woocommerce-mcp server
    ↓ MCP Protocol
Claude / agente (customer service, catalog management, order tracking)
    ↓
TikTok Ads MCP → campañas automatizadas por el agente
nexscope-ai/eCommerce-Skills → skills para el agente
```

### Opción C: Odoo + Agentes (para clientes con ERP complejo)
```
Odoo 20 (ERP + eCommerce + inventario + CRM)
    ↓ JSON-RPC API / Odoo 20 Agentic AI nativo
Agentes de supply chain (InvAgent + awesome-supply-chain skills)
    ↓
DeerFlow para research de mercado y pricing automático
stockpyl para optimización matemática de inventario
```

## Ecosistema de protocolos (julio 2026)

| Protocolo | Promotor | Repo / URL | Rol |
|-----------|----------|-----------|-----|
| ACP — Agentic Commerce Protocol | OpenAI + Stripe | [agentic-commerce-protocol](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol) | Checkout vía agentes en ChatGPT |
| UCP — Universal Commerce Protocol | Google + Shopify + Walmart | [google/universal-commerce-protocol](https://github.com/google/universal-commerce-protocol) | Discovery → checkout completo |
| MCP — Model Context Protocol | Anthropic (Linux Foundation) | [modelcontextprotocol](https://github.com/modelcontextprotocol) | Data connectivity layer para agentes |
| A2A — Agent-to-Agent Protocol | Google | [google/A2A](https://github.com/google/A2A) | Coordinación entre agentes |
| Visa TAP | Visa | Propietario | Verificación de identidad de agentes para pagos |

---
*v9 — Globant Retail & eCommerce KB. 2026-07-14.*
