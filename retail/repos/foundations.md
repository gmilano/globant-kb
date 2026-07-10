# Foundational Repos — Retail & E-Commerce

> Battle-tested bases to build on. Open license, active community.
> Last updated: 2026-07-10

## Commerce Platforms

| Repo | License | Stars | Stack | AI-Ready? |
|------|---------|-------|-------|-----------|
| [medusajs/medusa](https://github.com/medusajs/medusa) | MIT | 31.3k | Node.js, TypeScript | ✅ Branded "Commerce Platform for Agents and Developers" — has MCP server, ACP hooks |
| [vendure-ecommerce/vendure](https://github.com/vendure-ecommerce/vendure) | MIT | 6.9k | TypeScript, NestJS, GraphQL | ✅ GraphQL-first API ideal for LLM tool calls |
| [woocommerce/woocommerce](https://github.com/woocommerce/woocommerce) | GPL-2.0 | 10.4k | PHP, WordPress | ⚠️ GPL — AI plugins available (AI Engine MCP, StoreAgent) |
| [saleor/saleor](https://github.com/saleor/saleor) | Apache-2.0 | 21k | Python, Django, GraphQL | ✅ Apache — clean GraphQL API for agent integration |
| [directus/directus](https://github.com/directus/directus) | BSL/Apache-2.0 | 29k | TypeScript, REST+GraphQL | ✅ Headless CMS+data layer — good for product catalog + AI content pipelines |

## ERP & Inventory Management

| Repo | License | Stars | Stack | AI-Ready? |
|------|---------|-------|-------|-----------|
| [odoo/odoo](https://github.com/odoo/odoo) | LGPL-3.0 (Community) | 41k | Python | ✅ 51k+ stars total across orgs; REST+JSON-RPC; MCP connector available; 7M+ users |
| [frappe/erpnext](https://github.com/frappe/erpnext) | GPL-3.0 | 23k | Python, Frappe | ⚠️ GPL — but Frappe framework has REST API + Python hooks for agents |
| [InvenTree/InvenTree](https://github.com/InvenTree/InvenTree) | MIT | 4.2k | Python, Django | ✅ MIT — open-source inventory management REST API, excellent for retail stock |
| [apache/ofbiz](https://github.com/apache/ofbiz-framework) | Apache-2.0 | ~900 | Java | ✅ Apache — enterprise-grade retail ERP; POS, catalog, warehouse, CRM |

## Recommender Systems

| Repo | License | Stars | Stack | AI-Ready? |
|------|---------|-------|-------|-----------|
| [gorse-io/gorse](https://github.com/gorse-io/gorse) | Apache-2.0 | 8.9k | Go | ✅ LLM rankers + multimodal embeddings + distributed; REST API |
| [criteo-research/reco-gym](https://github.com/criteo-research/reco-gym) | Apache-2.0 | ~490 | Python | ✅ RL training env for recommendation agents (Criteo research) |
| [grahamjenson/list_of_recommender_systems](https://github.com/grahamjenson/list_of_recommender_systems) | MIT | 3.8k | — | Reference list of 100+ recommender system implementations |

## AI Catalog & Enrichment

| Repo | License | Stars | Stack | AI-Ready? |
|------|---------|-------|-------|-----------|
| [NVIDIA-AI-Blueprints/Retail-Catalog-Enrichment](https://github.com/NVIDIA-AI-Blueprints/Retail-Catalog-Enrichment) | Apache-2.0 | ~900 | Python, NIM | ✅ SOTA multimodal pipeline: image → 3D asset + localized content + ACP schema |
| [agentic-commerce-protocol/agentic-commerce-protocol](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol) | Apache-2.0 | ~1.8k | Spec (JSON/YAML) | ✅ The industry checkout standard — implement as spec |

## Supply Chain & Demand Forecasting

| Repo | License | Stars | Stack | AI-Ready? |
|------|---------|-------|-------|-----------|
| [zefang-liu/InvAgent](https://github.com/zefang-liu/InvAgent) | Apache-2.0 | ~420 | Python | ✅ LLM multi-agent zero-shot inventory management; arXiv:2407.11384 |
| [LarrySnyder/stockpyl](https://github.com/LarrySnyder/stockpyl) | MIT | ~180 | Python | ✅ Classical inventory optimization (EOQ, newsvendor, MEIO) — pairs with AI |
| [kishorkukreja/awesome-supply-chain](https://github.com/kishorkukreja/awesome-supply-chain) | MIT | ~530 | — | Curated AI supply chain skills and implementations |

---

## Selection Rationale for Globant Engagements

**Preferred stack for new retail builds:**
```
Medusa (commerce backbone, MIT)
  + Gorse (personalization, Apache 2.0)
  + InvAgent (inventory AI, Apache 2.0)
  + ACP (checkout protocol, Apache 2.0)
  + Shopify AI Toolkit or NVIDIA Catalog Enrichment (if client is on Shopify)
```

**Key advantage:** All above are MIT or Apache 2.0 — safe for Globant to fork, customize, and embed in client solutions without GPL contamination risk.

---
*See also: `verticals/solutions.md` for full vertical platforms.*
