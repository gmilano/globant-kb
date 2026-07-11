# 🏗️ Foundational Repos — Retail & E-Commerce

> The open-source bases to build on. Active communities, permissive licenses.
> Last updated: 2026-07-11

## Commerce Platforms (Headless / API-First)

| Repo | License | Stars | Stack | Description |
|------|---------|-------|-------|-------------|
| [medusajs/medusa](https://github.com/medusajs/medusa) | MIT | ~27k | Node.js, TypeScript, PostgreSQL | #1 open-source commerce platform on GitHub by star growth. Headless, API-first, built for agentic-ready deployments. MCP server available (medusa-mcp). Connectors to Shopify, Stripe, AWS. Ideal for brands up to $20M GMV. |
| [spree/spree](https://github.com/spree/spree) | BSD-3-Clause | ~13k | Ruby on Rails | Mature REST API + TypeScript SDK + Next.js integration. 2.4M+ downloads. Same technology base as Shopify's early stack. Battle-tested for B2B and B2C. |
| [woocommerce/woocommerce](https://github.com/woocommerce/woocommerce) | GPL-3.0 | ~10.4k | PHP, WordPress | The world's most-used open-source e-commerce platform. 28% of all online stores. Extensive plugin ecosystem. GPL-3 limits commercial reuse — prefer Medusa for Globant builds. |
| [opencart/opencart](https://github.com/opencart/opencart) | GPL-3.0 | ~7.9k | PHP | Lightweight e-commerce platform. Low server requirements. Large extension marketplace. Good for SMB deployments in LATAM. |
| [itswadesh/svelte-commerce](https://github.com/itswadesh/svelte-commerce) | MIT | ~1.8k | Svelte, SvelteKit | Headless storefront with Svelte. Fast, lightweight, ideal for composable commerce architectures. MIT makes it Globant-safe. |

## ERP & Inventory Platforms

| Repo | License | Stars | Stack | Description |
|------|---------|-------|-------|-------------|
| [frappe/erpnext](https://github.com/frappe/erpnext) | GPL-3.0 | ~22k | Python, Frappe | World's leading 100% open-source ERP. Native retail, POS, inventory, supply chain modules. GPL-3 for the app; Frappe Framework (MIT) is the base. Active LATAM community. |
| [odoo/odoo](https://github.com/odoo/odoo) | LGPL-3.0 | ~40k | Python, JavaScript | The dominant open-source business suite. Modules: POS, inventory, e-commerce, CRM, accounting, marketing. LGPL-3 core (proprietary apps extra). 12M users worldwide. |
| [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Apache-2.0 | ~1k | Java | Apache OFBiz: comprehensive ERP + CRM + e-commerce suite. Apache-2.0 makes it fully Globant-safe. Handles orders, inventory, supply chain, pricing, promotions. |

## Recommendation & Personalization

| Repo | License | Stars | Stack | Description |
|------|---------|-------|-------|-------------|
| [lyst/lightfm](https://github.com/lyst/lightfm) | Apache-2.0 | ~4.7k | Python, Cython | Hybrid recommendation algorithm (collaborative + content-based). BPR/WARP loss functions. Scales to millions of users/items. Used in production at Lyst. Cold-start capable. |
| [RUCAIBox/RecBole](https://github.com/RUCAIBox/RecBole) | MIT | ~3.5k | Python, PyTorch | Unified framework with 100+ recommendation algorithms. Covers CF, sequential, knowledge-aware, context-aware. Full pipeline from data ingestion to evaluation. Research-to-production. |
| [NVIDIA-Merlin/Merlin](https://github.com/NVIDIA-Merlin/Merlin) | Apache-2.0 | ~1.8k | Python, CUDA | End-to-end GPU recommender ecosystem. NVTabular (preprocessing), HugeCTR (training/inference), Transformers4Rec (sequential). Sub-10ms inference at scale. |
| [criteo-research/reco-gym](https://github.com/criteo-research/reco-gym) | Apache-2.0 | ~482 | Python | RL environment for product recommendation. Simulates user-ad interactions. Train and evaluate RL-based recommendation agents. From Criteo Research. |

## AI Agent Infrastructure (Retail-Applicable)

| Repo | License | Stars | Stack | Description |
|------|---------|-------|-------|-------------|
| [upsidelab/enthusiast](https://github.com/upsidelab/enthusiast) | MIT | ~800 | Python, Django, React | The purpose-built AI agent framework for e-commerce. RAG + vector search + workflow orchestration. Native connectors to Shopify, Shopware, Medusa, Solidus. Production-ready. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | MIT | ~100k | Python, TypeScript | General-purpose agent framework. Foundation for Enthusiast and most custom retail agents. LangGraph for stateful agent flows. |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Apache-2.0 | ~32k | Python | Long-term memory management for AI agents. Persist user preferences and purchase history across sessions. Essential for personalized shopping agents. |

## Inventory & Supply Chain

| Repo | License | Stars | Stack | Description |
|------|---------|-------|-------|-------------|
| [LarrySnyder/stockpyl](https://github.com/LarrySnyder/stockpyl) | MIT | ~164 | Python | Inventory optimization and simulation. EOQ, newsvendor, stochastic models. Building block for AI-driven replenishment agents. |

---

## Decision Guide

```
Need headless commerce API?          → medusajs/medusa (MIT) ✅
Need full ERP + retail POS?          → ERPNext (GPL) or OFBiz (Apache-2.0) ✅
Need recommendations fast?           → LightFM (Apache-2.0) for hybrid, RecBole (MIT) for research
Need GPU-scale recommendations?      → NVIDIA Merlin (Apache-2.0) ✅
Need AI agents on top of commerce?   → upsidelab/enthusiast (MIT) ✅
Need agent memory / personalization? → mem0 (Apache-2.0) ✅
```

---
*See also: `verticals/solutions.md` for complete vertical platforms.*
