# 🏭 Vertical Solutions — Retail & E-Commerce

> Real platforms that can be customized with AI on top. Start from something functional, add the agentic layer.
> Last updated: 2026-07-11

## E-Commerce Platforms

| Platform | Repo | License | Stars | Stack | Best For |
|----------|------|---------|-------|-------|----------|
| **Medusa.js** | [medusajs/medusa](https://github.com/medusajs/medusa) | MIT | ~27k | Node.js, TypeScript, PostgreSQL | Best: Greenfield builds needing agentic-readiness. Has MCP server (medusa-mcp) — Claude and other LLM agents can directly call commerce APIs. Modular: orders, products, customers, pricing, promotions as separate modules. Native TypeScript SDK. |
| **Spree Commerce** | [spree/spree](https://github.com/spree/spree) | BSD-3-Clause | ~13k | Ruby on Rails | Best: Existing Rails teams, mature REST API, B2B/B2C. TypeScript SDK available. 2.4M downloads, battle-tested. Powers many mid-market retailers. |
| **WooCommerce** | [woocommerce/woocommerce](https://github.com/woocommerce/woocommerce) | GPL-3.0 | ~10.4k | PHP, WordPress | Best: SMB clients on WordPress. Massive plugin ecosystem (55k+ plugins). WordPress AI plugins now abundant. GPL restricts commercial redistribution. |
| **OpenCart** | [opencart/opencart](https://github.com/opencart/opencart) | GPL-3.0 | ~7.9k | PHP | Best: Low-budget SMB deployments. Minimal server requirements. Common in LATAM. Extension marketplace for integrations. |
| **PrestaShop** | [PrestaShop/PrestaShop](https://github.com/PrestaShop/PrestaShop) | OSL-3.0 | ~7.8k | PHP | Best: European mid-market retailers, multi-language from day 1. Strong LATAM presence (especially Brazil, Argentina). |

## ERP + Retail Management

| Platform | Repo | License | Stars | Stack | Best For |
|----------|------|---------|-------|-------|----------|
| **Odoo** | [odoo/odoo](https://github.com/odoo/odoo) | LGPL-3.0 | ~40k | Python, JS | Best: Full business suite. Modules: POS, inventory, e-commerce, CRM, accounting, HR, marketing. 12M users. LGPL core (proprietary modules available). Go-to for SMB/mid-market needing one system. LATAM localization included. |
| **ERPNext** | [frappe/erpnext](https://github.com/frappe/erpnext) | GPL-3.0 | ~22k | Python, Frappe | Best: 100% open-source ERP. Retail, POS, supply chain, inventory, accounting modules. GPL application on MIT Frappe Framework. Active LATAM deployments in Brazil, Mexico, Argentina. |
| **Apache OFBiz** | [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Apache-2.0 | ~1k | Java | Best: Enterprise Java shops, full Apache-2.0 stack (Globant-safe for all use cases). ERP + CRM + e-commerce + supply chain + accounting in one. Used by mid-large enterprises. |

## POS & In-Store Systems

| Platform | Repo | License | Stars | Stack | Best For |
|----------|------|---------|-------|-------|----------|
| **UniCenta oPOS** | [unicenta/unicentaopos](https://github.com/unicenta/unicentaopos) | GPL-3.0 | ~500 | Java | Open-source POS system for retail and hospitality. Java-based, cross-platform. Add AI agents for real-time upsell recommendations. |
| **uniCenta POS (fork)** | [openbravo/openbravo](https://www.openbravo.com/) | MPL-2.0 | — | Java | Openbravo: web-based POS + ERP. MPL-2.0. Strong in grocery and fashion retail. REST API ready for AI integration. |

## Order Management

| Platform | Repo | License | Stars | Stack | Best For |
|----------|------|---------|-------|-------|----------|
| **Orderful** | Via Apache OFBiz | Apache-2.0 | — | Java | EDI + order management within OFBiz framework. |
| **Solidus** | [solidusio/solidus](https://github.com/solidusio/solidus) | BSD-3-Clause | ~5k | Ruby on Rails | Spree fork, used by larger retailers. Enthusiast has a native Solidus connector. |

---

## How to Add AI on Top

### Pattern A: Medusa.js + Enthusiast (Recommended for new builds)
```
Medusa.js (commerce API) ← → Enthusiast (AI agent layer)
                                    ↓
                         LangChain / LangGraph agents
                                    ↓
                         Claude / GPT-4 / Llama (LLM)
                                    ↓
              Product search | Support chatbot | Catalog enrichment
```

### Pattern B: ERPNext / Odoo + Custom Agent
```
ERPNext or Odoo (inventory + orders + CRM)
              ↓
        REST API / JSON-RPC
              ↓
    LangGraph agent with tools:
        - get_inventory_level(sku)
        - create_reorder(sku, qty)
        - get_demand_forecast(sku, days)
        - update_price(sku, new_price)
              ↓
  Autonomous replenishment + pricing decisions
```

### Pattern C: WooCommerce / Medusa + ACP (Agentic Commerce Protocol)
```
Existing store (WooCommerce or Medusa)
              ↓
  Add ACP endpoint (NVIDIA blueprint as reference)
              ↓
  AI shopping agents (ChatGPT Shopping, Perplexity Shopping, etc.)
  can now discover, evaluate, and purchase autonomously
```

---

## LATAM Presence

| Platform | Argentina | Brazil | Mexico | Colombia |
|----------|-----------|--------|--------|----------|
| WooCommerce | ✅ Strong | ✅ Strong | ✅ Strong | ✅ Strong |
| Odoo | ✅ Growing | ✅ Growing | ✅ Growing | ✅ Growing |
| ERPNext | ✅ Community | ✅ Active | ✅ Growing | ✅ Community |
| PrestaShop | ✅ Established | ✅ Established | ✅ Established | ✅ Established |
| Medusa.js | 🔵 Emerging | 🔵 Emerging | 🔵 Emerging | 🔵 Emerging |

---
*See also: `repos/foundations.md` for low-level libraries and AI components.*
