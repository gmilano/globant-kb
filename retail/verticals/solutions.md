# Vertical Solutions — Retail & E-Commerce

> Real platforms that can be customized with AI on top. Prioritize MIT/Apache 2.0.
> Last updated: 2026-07-10

## E-Commerce Platforms

### Medusa — The Agent-Native Commerce Platform
- **Repo:** [medusajs/medusa](https://github.com/medusajs/medusa)
- **License:** MIT | **Stars:** 31.3k | **Stack:** Node.js, TypeScript
- **Why:** Explicitly branded "Open-Source Commerce Platform for Agents and Developers" in 2026. Has MCP server ([SGFGOV/medusa-mcp](https://github.com/SGFGOV/medusa-mcp)), headless API-first design, native ACP checkout hooks. Best choice for new retail builds where AI is a first-class concern.
- **Globant use:** White-label headless store + add Gorse recommendations + InvAgent inventory + ACP checkout = full agentic commerce stack.

### Vendure — TypeScript-Native Headless Commerce
- **Repo:** [vendure-ecommerce/vendure](https://github.com/vendure-ecommerce/vendure)
- **License:** MIT | **Stars:** 6.9k | **Stack:** TypeScript, NestJS, GraphQL
- **Why:** GraphQL-first API naturally maps to LLM tool definitions. Plugin system allows custom AI workflows. NestJS makes it easy to add AI microservices.
- **Globant use:** When clients need TypeScript-all-the-way or existing NestJS expertise.

### Saleor — Python/Django Headless Commerce
- **Repo:** [saleor/saleor](https://github.com/saleor/saleor)
- **License:** Apache-2.0 | **Stars:** 21k | **Stack:** Python, Django, GraphQL
- **Why:** Apache license (cleaner than GPL for commercial engagements than WooCommerce). Mature GraphQL API, multi-channel (web, mobile, POS), Django REST for AI integrations.
- **Globant use:** When client has Python AI stack or needs Apache 2.0 explicitly.

### WooCommerce — WordPress Commerce
- **Repo:** [woocommerce/woocommerce](https://github.com/woocommerce/woocommerce)
- **License:** GPL-2.0 | **Stars:** 10.4k | **Stack:** PHP, WordPress
- **Why:** Massive installed base (~27% of all e-commerce). Not ideal for new builds (GPL) but huge for clients with existing WooCommerce stores needing AI upgrades.
- **AI add-ons:** AI Engine plugin (MCP support), StoreAgent (WooCommerce-native + 4 agentic loops + 50+ tools).
- **Globant use:** AI augmentation projects for existing WooCommerce clients, not greenfield.

---

## ERP + Retail Management

### Odoo — All-in-One Business Suite
- **Repo:** [odoo/odoo](https://github.com/odoo/odoo)
- **License:** LGPL-3.0 (Community Edition) | **Stars:** 41k | **Users:** 7M+
- **Stack:** Python, PostgreSQL
- **Modules relevant to retail:** Inventory, Purchase, Sales, eCommerce, POS, CRM, Accounting, Manufacturing
- **Why:** Most comprehensive open-source retail ERP. LGPL community edition is free and customizable. REST/JSON-RPC APIs. Odoo MCP connector available.
- **Globant use:** Full retail operations suite — inventory + orders + POS + customer CRM, then add AI agents on top via Odoo's external API.
- **LATAM relevance:** Odoo has the largest LATAM partner ecosystem of any open-source ERP.

### ERPNext — ERP for Growing Businesses
- **Repo:** [frappe/erpnext](https://github.com/frappe/erpnext)
- **License:** GPL-3.0 | **Stars:** 23k | **Stack:** Python, Frappe framework
- **Modules:** Inventory, Retail POS, Buying, Selling, eCommerce, Warehouse, CRM
- **Why:** Frappe framework exposes clean Python hooks and REST APIs. Strong in retail + manufacturing. GPL-3.0 limits commercial customization but community is large.
- **Globant use:** Mid-market clients needing full ERP + willing to contribute back. Add AI demand forecasting + InvAgent on top.

### InvenTree — Lightweight Inventory Management
- **Repo:** [InvenTree/InvenTree](https://github.com/InvenTree/InvenTree)
- **License:** MIT | **Stars:** 4.2k | **Stack:** Python, Django
- **Why:** MIT license, REST API, focused specifically on inventory/stock management. Lighter than full ERP. Perfect for adding AI demand forecasting agents.
- **Globant use:** Inventory-focused AI projects where client doesn't need full ERP. Pair with InvAgent.

### Apache OFBiz — Enterprise Retail ERP
- **Repo:** [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework)
- **License:** Apache-2.0 | **Stars:** ~900 | **Stack:** Java
- **Why:** Mature enterprise Apache-licensed retail ERP. Covers POS, catalog management, warehouse, order management, CRM, accounting. Customizable at framework level.
- **Globant use:** Enterprise clients needing Java stack + Apache license + full retail suite.

---

## Specialized Vertical Tools

### ACP (Agentic Commerce Protocol) — The Checkout Standard
- **Repo:** [agentic-commerce-protocol/agentic-commerce-protocol](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol)
- **License:** Apache-2.0 | Maintained by: OpenAI + Stripe + Meta
- **Why:** Every AI shopping agent (ChatGPT, Gemini, Perplexity) uses ACP to complete purchases. Not implementing ACP means being invisible to agentic shoppers.
- **Globant use:** Mandatory layer on any retail client that wants AI shopping agent traffic.

### Gorse — AI Recommender System
- **Repo:** [gorse-io/gorse](https://github.com/gorse-io/gorse)
- **License:** Apache-2.0 | **Stars:** ~8.9k | **Stack:** Go
- **Why:** Production-ready distributed recommender with LLM rankers, multimodal embeddings, GUI dashboard, REST API. Supports MySQL/MongoDB/Postgres/ClickHouse + Redis.
- **Globant use:** Drop-in personalization engine for any retail platform (Medusa, Saleor, WooCommerce, custom).

### NVIDIA Retail Catalog Enrichment Blueprint
- **Repo:** [NVIDIA-AI-Blueprints/Retail-Catalog-Enrichment](https://github.com/NVIDIA-AI-Blueprints/Retail-Catalog-Enrichment)
- **License:** Apache-2.0 | Released: Jan 2026 (NRF)
- **Why:** Solves the "sparse catalog" problem — transforms a single product image into full catalog entry: variants, 3D model, localized descriptions in 50+ languages, ACP-ready schema. Uses FLUX Kontext + TRELLIS.
- **Globant use:** Retail clients with poor product data (typical of mid-market) — automate catalog enrichment before deploying AI shopping agents.

---

## Recommended Stack by Client Size

| Client Size | Commerce | ERP/Inventory | Recommendations | Checkout |
|-------------|----------|---------------|-----------------|----------|
| SMB | Medusa (MIT) | InvenTree (MIT) | Gorse (Apache) | ACP |
| Mid-Market | Medusa or Vendure | Odoo CE (LGPL) | Gorse | ACP |
| Enterprise | Saleor (Apache) or OFBiz (Apache) | Odoo or ERPNext | Gorse + NVIDIA Blueprint | ACP |
| Existing Shopify | Shopify AI Toolkit | Shopify native | Gorse (sidecar) | ACP via Shopify |
| Existing WooCommerce | AI Engine MCP | ERPNext | Gorse (sidecar) | ACP |

---
*Auto-updated by Globant AI Studios ingest pipeline.*
