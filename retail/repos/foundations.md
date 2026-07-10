# 🏗️ Repos fundacionales — Retail & eCommerce

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-10 (v10)

## Plataformas eCommerce

| Repo | Licencia | Stars | Stack | ¿Base para AI? |
|------|----------|-------|-------|----------------|
| [medusajs/medusa](https://github.com/medusajs/medusa) | MIT | 32k+ | TypeScript/Node | ★★★ — "Open-Source Commerce Platform for Agents and Developers" posicionamiento oficial. MCP server nativo (medusa-mcp). Arquitectura modular: Orders, Products, Inventory, Pricing como módulos independientes. |
| [woocommerce/woocommerce](https://github.com/woocommerce/woocommerce) | GPL-3.0 | 10.4k | PHP/WordPress | ★★★ — 37% share global (6.5M tiendas). Plugin ecosystem 60k+. WooCommerce MCP + Agentic Commerce Protocol (ACP) disponible. LATAM dominante. |
| [PrestaShop/PrestaShop](https://github.com/PrestaShop/PrestaShop) | OSL-3.0 | 7.8k | PHP | ★★ — fuerte en Europa/LATAM (especialmente FR, ES, BR). API REST moderna desde v8. Add-on marketplace 6k+ módulos. |
| [magento/magento2](https://github.com/magento/magento2) | OSL-3.0 | 11.2k | PHP | ★★ — Adobe Commerce Open Source. B2B features nativas. Complejidad alta pero enterprise-grade. Módulos AI disponibles. |
| [opencart/opencart](https://github.com/opencart/opencart) | GPL-3.0 | 7.3k | PHP | ★ — ampliamente usado en LATAM emergente. Simple de customizar. Extensiones AI community. |
| [itswadesh/svelte-commerce](https://github.com/itswadesh/svelte-commerce) | MIT | 1.8k | Svelte/TypeScript | ★★ — headless, agnóstico de backend. Puede conectar a Medusa, Shopify, o custom API. Ideal para storefronts agenticos livianos. |

## ERPs con módulo eCommerce

| Repo | Licencia | Stars | Stack | Relevancia Retail |
|------|----------|-------|-------|-------------------|
| [odoo/odoo](https://github.com/odoo/odoo) | LGPL-3.0 (core) | 40k+ | Python | ERP #1 LATAM. Módulos: eCommerce + POS + Inventory + Manufacturing. Odoo Studio para customizar sin código. AI add-ons community. |
| [frappe/erpnext](https://github.com/frappe/erpnext) | GPL-3.0 | 24k | Python/Frappe | ERPNext: retail POS, inventory, e-commerce integrado. Frappe framework permite AI hooks fácilmente. |
| [apache/ofbiz](https://github.com/apache/ofbiz) | Apache-2.0 | 700+ | Java | OFBiz: el ERP open source más customizable. Módulo eCommerce completo. Apache 2.0 = máxima libertad. |

## Ecosistema Medusa (starter kits)

| Repo | Licencia | Stars | Descripción |
|------|----------|-------|-------------|
| [medusajs/medusa-eats](https://github.com/medusajs/medusa-eats) | MIT | 251 | Food delivery Uber Eats–style sobre Medusa 2.0 + Next.js 14 |
| [SGFGOV/medusa-mcp](https://github.com/SGFGOV/medusa-mcp) | MIT | 65 | MCP server para Medusa JS SDK — conecta Claude a admin Medusa |
| [bidah/universal-medusa](https://github.com/bidah/universal-medusa) | MIT | 196 | Multi-platform: React Native + Next.js + Medusa.js |
| [reorder-js/reorder](https://github.com/reorder-js/reorder) | MIT | 23 | Plugin de suscripciones para Medusa.js |

## Protocolos Agentic Commerce (capa de transacción)

| Repo | Licencia | Stars | Stack | Descripción |
|------|----------|-------|-------|-------------|
| [agentic-commerce-protocol/agentic-commerce-protocol](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol) | Apache-2.0 | ~1.4k | Spec + JSON | ACP spec mantenida por OpenAI + Stripe. Define checkout agentico, delegate payment, feed, cart, OAuth 2.0. Spec v2026-04-17. Live Etsy + 1M Shopify. |
| [NVIDIA-AI-Blueprints/Retail-Agentic-Commerce](https://github.com/NVIDIA-AI-Blueprints/Retail-Agentic-Commerce) | Apache-2.0 | ~3.1k | Python + NIM | Blueprint de referencia ACP+UCP con NIM microservices. CLAUDE.md nativo. Checkout negotiation + merchant control. Producción-ready. |
| [topics/universal-commerce-protocol](https://github.com/topics/universal-commerce-protocol) | Apache-2.0 | — | Spec | UCP (Google/Shopify): machine-to-machine checkout. Live en Google AI Mode + Microsoft Copilot checkout (Apr 2026). |

## Infraestructura AI para Retail

| Repo | Licencia | Stars | Descripción |
|------|----------|-------|-------------|
| [langgenius/dify](https://github.com/langgenius/dify) | Apache-2.0 | 144k | Plataforma agentic workflow. RAG + MCP + 50+ tools. Se integra con cualquier plataforma de retail vía API. |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | fair-code | 97k | Automation visual con 400+ conectores (Shopify, WooCommerce, Stripe, CRMs). Self-hosted. |
| [LarrySnyder/stockpyl](https://github.com/LarrySnyder/stockpyl) | MIT | 164 | Inventory optimization library: EOQ, safety stock, multi-echelon, simulación. |
| [criteo-research/reco-gym](https://github.com/criteo-research/reco-gym) | Apache-2.0 | 482 | RL environment para recommendation systems en e-commerce. Criteo Research. |

---
*Ver también: `verticals/solutions.md` para comparativa de plataformas verticales.*
