# Vertical Solutions — Retail & E-Commerce

> Real platforms Globant can customize with AI on top.
> Model: start from something functional, add an agentic layer above.
> Last updated: 2026-07-06

## E-Commerce Platforms (AI-Customizable)

| Platform | License | GitHub | Stars | Stack | Best For |
|----------|---------|--------|-------|-------|----------|
| **Medusa** | MIT | [medusajs/medusa](https://github.com/medusajs/medusa) | 32k★ | Node.js/TypeScript | Modern headless commerce — best for building composable commerce with AI agents on top; MCP server available (medusa-mcp); used by Heineken, Mitsubishi |
| **Saleor** | Apache 2.0 | [saleor/saleor](https://github.com/saleor/saleor) | 22.4k★ | Python/Django | GraphQL-first API; multi-channel/multi-country; add AI rec layer via webhooks; strong for fashion, B2B, marketplace |
| **Bagisto** | MIT | [bagisto/bagisto](https://github.com/bagisto/bagisto) | 28k★ | PHP/Laravel | AI model integrations built-in (GPT-4/Claude/Gemini); plugin ecosystem; multi-language/multi-currency → LATAM-ready |
| **PrestaShop** | OSL-3.0 | [PrestaShop/PrestaShop](https://github.com/PrestaShop/PrestaShop) | 8.2k★ | PHP | 300k+ merchants, strong in Europe and LATAM; v9 released 2025; wide module ecosystem for AI add-ons; OSL allows customization |
| **OpenCart** | GPL-3.0 | [opencart/opencart](https://github.com/opencart/opencart) | 7.6k★ | PHP | Simple, widely deployed globally; large LATAM SMB base; add AI modules for product recommendation and chatbot |

## ERP + Retail Management

| Platform | License | GitHub/URL | Stars | Stack | Best For |
|----------|---------|-----------|-------|-------|----------|
| **Odoo Community** | LGPL-3.0 | [odoo/odoo](https://github.com/odoo/odoo) | 52.8k★ | Python | Full ERP suite — e-commerce, POS, inventory, CRM, accounting; LGPL allows proprietary modules; add AI layer for demand forecasting, customer scoring, automated reordering |
| **ERPNext / Frappe** | GPL-3.0 | [frappe/erpnext](https://github.com/frappe/erpnext) | 36.4k★ | Python/Frappe | Full-stack ERP with retail modules — POS, inventory, multi-warehouse; Frappe framework allows building AI-powered custom apps alongside |
| **Apache OFBiz** | Apache 2.0 | [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | 750★ | Java | Enterprise ERP + e-commerce all-in-one — order management, catalog, CRM, accounting; Apache license = no commercial restrictions; AI modernization target for large retailers |

## Point of Sale (POS)

| Platform | License | GitHub | Stars | Stack | Best For |
|----------|---------|--------|-------|-------|----------|
| **Unicenta oPos** | GPL-3.0 | [poolborges/unicenta-opos](https://github.com/poolborges/unicenta-opos) | 350★ | Java | Full-featured POS for physical retail — extensible for AI receipt analysis, upsell recommendations at checkout |
| **Openbravo** | Commercial/Community | openbravo.com | — | Java | Cloud/self-hosted ERP for retail and hospitality — POS + inventory + omnichannel; strong in Spain/LATAM; AI integration via REST API |

## Customer Data & Loyalty

| Platform | License | GitHub | Stars | Stack | Best For |
|----------|---------|--------|-------|-------|----------|
| **Mautic** | Apache 2.0 | [mautic/mautic](https://github.com/mautic/mautic) | 7.5k★ | PHP | Open source marketing automation — email, SMS, push notifications; add AI segmentation and send-time optimization on top |
| **SuiteCRM** | AGPL-3.0 | [salesagility/SuiteCRM](https://github.com/salesagility/SuiteCRM) | 4.5k★ | PHP | Full CRM — customer 360, cases, campaigns; add AI lead scoring, churn prediction, next-best-offer recommendations |
| **Open Loyalty** | MIT | [DivanteLtd/open-loyalty](https://github.com/DivanteLtd/open-loyalty) | 500★ | PHP/Symfony | Open loyalty program platform — points, tiers, rewards; integrate AI for personalized loyalty offers and churn prevention |

## How to Add AI on Top

### Step 1: Choose a vertical base
- **Modern API-first**: Medusa (MIT) or Saleor (Apache 2.0)
- **Full ERP needed**: Odoo (LGPL) or ERPNext (GPL)
- **Existing merchant base (LATAM)**: Bagisto (MIT) or PrestaShop (OSL)

### Step 2: Add AI recommendation layer
```
Medusa/Saleor → webhook on product views/purchases
             → RecBole (MIT) for collaborative filtering
             → FAISS (MIT) for real-time retrieval
             → return top-N recommendations via API
```

### Step 3: Add conversational agent
```
Rasa (Apache 2.0) or LangGraph (MIT)
  ↓ connects to commerce platform APIs
  ↓ order status, product search, returns
  ↓ deploys on WhatsApp (LATAM primary channel)
```

### Step 4: Add agentic commerce
```
medusa-mcp (MIT) exposes Medusa as MCP tools
Claude / GPT-4 can create carts, check inventory,
apply promotions, complete checkout autonomously
```
