# 🏭 Verticales de partida — Retail & eCommerce

> Plataformas verticales open source customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-09 (v9)

## Plataformas eCommerce

| Plataforma | Licencia | Repo | Stars | Stack | Caso de uso | AI-ready |
|------------|----------|------|-------|-------|-------------|----------|
| **Medusa** | MIT | [medusajs/medusa](https://github.com/medusajs/medusa) | 32k+ | TypeScript/Node | Headless commerce, B2B, DTC, marketplaces, POS | ★★★ — MCP server oficial, posicionado como "platform for agents". Módulos independientes (Orders, Products, Inventory, Pricing) = fácil de wrappear con agentes. |
| **WooCommerce** | GPL-3.0 | [woocommerce/woocommerce](https://github.com/woocommerce/woocommerce) | 10.4k | PHP/WordPress | SMBs, LATAM dominante (37% global share, 6.5M tiendas) | ★★★ — WooCommerce MCP disponible. Plugin ACP ("Buy in ChatGPT"). 60k+ plugin ecosystem. |
| **PrestaShop** | OSL-3.0 | [PrestaShop/PrestaShop](https://github.com/PrestaShop/PrestaShop) | 7.8k | PHP | Europa, LATAM (FR/ES/BR fuerte), fashion, retail | ★★ — REST API moderna (v8+). Add-on marketplace AI en crecimiento. |
| **Magento Open Source** | OSL-3.0 | [magento/magento2](https://github.com/magento/magento2) | 11.2k | PHP | Enterprise B2C/B2B, catálogos grandes | ★★ — Adobe Commerce Open Source. B2B nativo. Módulos AI community disponibles. Complejidad alta. |
| **OpenCart** | GPL-3.0 | [opencart/opencart](https://github.com/opencart/opencart) | 7.3k | PHP | SMBs LATAM emergente, single-store | ★ — Amplio en mercados emergentes. API REST disponible para integración AI. |
| **Svelte Commerce** | MIT | [itswadesh/svelte-commerce](https://github.com/itswadesh/svelte-commerce) | 1.8k | Svelte/TS | Storefront headless agnóstico de backend | ★★ — Perfecto para storefronts agenticos livianos sobre Medusa o custom API. |

## ERPs con módulo eCommerce + Retail

| Plataforma | Licencia | Repo | Stars | Caso de uso | AI-ready |
|------------|----------|------|-------|-------------|----------|
| **Odoo** | LGPL-3.0 (core) | [odoo/odoo](https://github.com/odoo/odoo) | 40k+ | ERP #1 LATAM. Módulos: eCommerce + POS + Inventory + Manufacturing + CRM | ★★★ — AI add-ons community. Odoo Studio sin código. Base ideal para retailers medianos LATAM que necesitan eComm + back-office. |
| **ERPNext** | GPL-3.0 | [frappe/erpnext](https://github.com/frappe/erpnext) | 24k | Retail POS, inventory, e-commerce integrado. Frappe framework | ★★ — Frappe framework permite AI hooks fácilmente. Open source puro (sin subscription). |
| **Apache OFBiz** | Apache-2.0 | [apache/ofbiz](https://github.com/apache/ofbiz) | 700+ | ERP full customizable con módulo eCommerce. Java | ★★ — Apache 2.0 = máxima libertad de uso. Más customizable que Odoo. Mayor complejidad técnica. |

## Plataformas de Agentic Commerce

| Plataforma | Licencia | Repo | Stars | Descripción |
|------------|----------|------|-------|-------------|
| **Shopify AI Toolkit** | MIT | [Shopify/Shopify-AI-Toolkit](https://github.com/Shopify/Shopify-AI-Toolkit) | ~4k | MCP server + agent skills + Claude Code plugin para Shopify. Conecta cualquier LLM a Admin API. |
| **shop-chat-agent** | MIT | [Shopify/shop-chat-agent](https://github.com/Shopify/shop-chat-agent) | ~2.8k | Referencia de storefront chat agent con MCP. Integra checkout en conversación. |
| **Dify** | Apache-2.0 | [langgenius/dify](https://github.com/langgenius/dify) | 144k | Plataforma agentic workflow agnóstica de plataforma de retail. RAG + MCP + 50+ tools. |

## Guía de selección

```
¿Cuál plataforma elegir?

Cliente SMB LATAM (< $5M GMV):
  → WooCommerce + WooCommerce MCP + Claude
  → Tiempo: 4-6 semanas, $30k-$80k

Cliente midmarket (B2C headless):
  → Medusa 2.x + medusa-mcp + Shopify AI Toolkit pattern
  → Tiempo: 8-12 semanas, $80k-$200k

Cliente enterprise Shopify:
  → Shopify AI Toolkit + shop-chat-agent + nexscope skills
  → Tiempo: 2-4 semanas (ya en Shopify), $40k-$120k

Cliente con back-office LATAM (ERP needs):
  → Odoo (eCommerce + POS + Inventory) + Dify encima
  → Tiempo: 12-16 semanas, $150k-$400k

Cliente B2B manufacturing/distribution:
  → ERPNext + Medusa (eComm module) + agentes
  → Tiempo: 16-24 semanas, $200k-$600k
```

## Cómo añadir AI a cualquier plataforma

1. **Fork del repo base** (Medusa / WooCommerce / Odoo)
2. **Instalar MCP server** disponible para la plataforma (medusa-mcp, WC MCP, etc.)
3. **Conectar LLM** (Claude via MCP, o self-hosted vía Dify)
4. **Añadir agent skills** con nexscope eCommerce Skills o skills propias
5. **UI conversacional**: chat widget (shop-chat-agent pattern) o WhatsApp/Telegram
6. **Monitoring**: FutureAGI o LangSmith para observabilidad de agentes
