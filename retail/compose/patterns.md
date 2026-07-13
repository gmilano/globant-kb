# Composition Patterns — Retail & Consumer

> Concrete recipes combining real repos + agents + wiring instructions.
> Last updated: 2026-07-13

## Architecture Reference

```
[Vertical Platform: Medusa / Odoo / ERPNext / Bagisto]
          ↓ (REST/GraphQL/MCP)
[Orchestration Layer: Mastra (TypeScript) or LangGraph (Python)]
          ↓
[Specialized Agents: RecSys / Forecasting / ACP / Vision]
          ↓
[Channel: WhatsApp / Web chat / Voice / ACP-compatible AI agent]
```

---

## P1 — AI-Native Composable Storefront (Medusa + MCP + Claude)

**Goal**: Build a headless storefront where AI agents can manage catalog, inventory, and orders.

**Stack**:
- [medusajs/medusa](https://github.com/medusajs/medusa) (MIT, ~31.3k★) — commerce backend
- [medusajs/medusa-agent-skills](https://github.com/medusajs/medusa-agent-skills) (MIT) — Claude Code agent skills
- [minimalart/mcp-medusa](https://github.com/minimalart/mcp-medusa) (MIT) — MCP server for AI agent access
- Claude Sonnet 5 — product description generation, Q&A, catalog enrichment
- Next.js storefront (official Medusa starter)

**Wiring**:
```
1. Deploy Medusa v2 backend (Docker or Medusa Cloud)
2. Install mcp-medusa → expose as MCP server to Claude/agents
3. Add medusa-agent-skills to Claude Code workspace
4. Agent loop: user query → MCP tools (search_products, get_inventory) → LLM response
5. For content: trigger Claude batch job on product creation → enrich descriptions/SEO
```

**Timeline**: 4–6 weeks to PoC; 10–14 weeks to production  
**Budget signal**: $0 software; $2–5K/month Medusa Cloud or self-hosted  
**Best for**: D2C brands, mid-market retailers moving off Shopify/Magento

---

## P2 — AI Recommendation Engine (LightFM + LLM Hybrid)

**Goal**: Personalized recommendations that work for both cold-start (new users/products) and at scale.

**Stack**:
- [lyst/lightfm](https://github.com/lyst/lightfm) (Apache-2.0, ~4.7k★) — hybrid ColFil + ContentBased ranking
- [criteo-research/reco-gym](https://github.com/criteo-research/reco-gym) (Apache-2.0, ~482★) — RL evaluation env
- Claude Haiku — product embedding generation; explanation generation
- FastAPI — recommendation microservice
- Redis — user interaction store for LightFM

**Wiring**:
```
1. Ingest product catalog → Claude Haiku → semantic embeddings (features for LightFM)
2. Train LightFM model on user×item interactions (purchase, view, cart events)
3. Serve recommendations via FastAPI microservice
4. Generate "why recommended" explanation via Claude Haiku (fast, cheap)
5. A/B test: LightFM-only vs LightFM + LLM re-ranking
6. Evaluate with reco-gym RL simulator before production rollout
```

**Timeline**: 6–8 weeks  
**ROI signal**: 10–35% lift in conversion; 15–25% increase in average order value  
**Best for**: Catalogues >10k SKUs; D2C brands; marketplace platforms

---

## P3 — Agentic Checkout via ACP (Stripe + Medusa/Shopify)

**Goal**: Make your storefront discoverable and purchasable by any AI agent (ChatGPT, Claude, Perplexity shopping agents).

**Stack**:
- [agentic-commerce-protocol/agentic-commerce-protocol](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol) (Apache-2.0) — protocol spec
- Stripe (existing payment processor) — 1-line ACP enablement if already Stripe
- [medusajs/medusa](https://github.com/medusajs/medusa) (MIT) — commerce backend (ACP-compatible)
- [mastra-ai/mastra](https://github.com/mastra-ai/mastra) (Apache-2.0, ~22k★) — orchestrate agent checkout flow

**Wiring**:
```
1. Ensure product catalog has real-time inventory API (Medusa exposes this natively)
2. If on Stripe: enable ACP in Stripe Dashboard (1-line, ~1 day)
3. If not on Stripe: implement ACP spec endpoints (product discovery, cart, checkout)
4. Test with Mastra agent: agent.search() → agent.addToCart() → agent.checkout()
5. Set spend controls + brand guardrails in ACP product manifest
6. Monitor: ACP-sourced orders in dashboard (new attribution channel)
```

**Timeline**: 1–3 weeks (Stripe) or 4–8 weeks (custom ACP implementation)  
**Revenue signal**: New channel (AI-driven shoppers); 4% fee to OpenAI only on ChatGPT purchases  
**Best for**: Any retailer >$1M online revenue; immediate for existing Stripe merchants

---

## P4 — Demand Forecasting + Inventory Optimization Agent

**Goal**: Agent that continuously forecasts demand and triggers reorder recommendations, integrated with ERP.

**Stack**:
- [LarrySnyder/stockpyl](https://github.com/LarrySnyder/stockpyl) (MIT, ~164★) — EOQ, (r,Q), multi-echelon optimization
- Facebook Prophet (MIT) — time-series demand forecasting
- [frappe/erpnext](https://github.com/frappe/erpnext) (GPL-3.0, ~24k★) — ERP + inventory source of truth
- Claude Sonnet 5 — enriches forecasts with unstructured signals (weather, events, social trends)
- Mastra — scheduled agent workflow

**Wiring**:
```
1. Connect ERPNext → extract last 24 months of sales by SKU + location
2. Run Prophet model: weekly forecast per SKU × location
3. Enrich: Claude scans news/social for demand signals → adjusts forecast confidence
4. stockpyl: compute optimal (r, Q) reorder points per SKU
5. Mastra scheduled job: daily run → generates purchase orders as ERPNext drafts
6. Human-in-the-loop: buyer reviews + approves (or auto-approve for commodity items)
```

**Timeline**: 8–12 weeks  
**ROI signal**: $1.1T in overstock + $634B in stockout losses industry-wide; 5–15% inventory reduction typical  
**Best for**: Retailers with 100–50k SKUs; multi-location; seasonal demand patterns

---

## P5 — WhatsApp Commerce Agent for LATAM

**Goal**: Full commerce experience on WhatsApp: browse, recommend, order, and pay — in Spanish/Portuguese.

**Stack**:
- [medusajs/medusa](https://github.com/medusajs/medusa) (MIT) — product catalog + order management
- WhatsApp Business Cloud API — messaging channel (Meta, free tier available)
- Claude Haiku — fast, cheap LLM for conversational responses (latency <500ms target)
- Stripe + PIX (Brazil) or OXXO/SPEI (Mexico) — payments
- [mastra-ai/mastra](https://github.com/mastra-ai/mastra) (Apache-2.0) — conversation state management

**Wiring**:
```
1. Medusa: product catalog + real-time stock + order API
2. WhatsApp webhook → Mastra workflow → Claude Haiku response
3. Conversation states: BROWSE → SEARCH → ADD_TO_CART → CHECKOUT → PAYMENT
4. Payments: generate PIX QR code or OXXO barcode inline in WhatsApp
5. Order confirmation + tracking updates via WhatsApp template messages
6. Fallback: human agent handoff for complex issues (Mastra escalation node)
```

**Timeline**: 6–10 weeks  
**Revenue signal**: Brazil WhatsApp commerce growing 40% YoY; conversion 3–5x higher than email  
**Best for**: D2C brands in Brazil/Mexico; grocers; fashion; beauty; any frequent-purchase category

---

## P6 — AI Shelf Audit (Computer Vision + Inventory Agent)

**Goal**: Automated shelf audit using store cameras or handheld device → detect OOS, misplacements, freshness issues → trigger replenishment.

**Stack**:
- NVIDIA NIM Vision model or YOLOv11 (AGPL-3.0) — shelf image analysis
- [NVIDIA-AI-Blueprints/retail-shopping-assistant](https://github.com/NVIDIA-AI-Blueprints/retail-shopping-assistant) (Apache-2.0) — multi-agent blueprint reference
- [medusajs/medusa](https://github.com/medusajs/medusa) or [frappe/erpnext](https://github.com/frappe/erpnext) — inventory source of truth
- Claude Haiku — audit report generation + anomaly explanation
- LangGraph — agent orchestration (scan → analyze → report → action)

**Wiring**:
```
1. Image capture: store camera feed or tablet-based scanning workflow
2. NVIDIA vision model: detect products, read barcodes/QR, assess freshness
3. Match detected products to inventory system (Medusa/ERPNext product IDs)
4. Anomaly detection: OOS (<2 units visible), planogram violation, expiry risk
5. LangGraph agent: categorize anomalies → generate restock tasks in ERP
6. Claude Haiku: generate daily shelf audit report for store manager
7. Alert: WhatsApp message to store associate for critical OOS
```

**Timeline**: 10–16 weeks (hardware integration adds complexity)  
**ROI signal**: 8.3% revenue lost to OOS industry-wide; 40–60% reduction with daily automated audit  
**Best for**: Grocery, pharma, CPG, convenience stores; clients with physical retail

---

## P7 — AI Catalog Enrichment Agent (NVIDIA Blueprint + AEO)

**Goal**: Automatically enrich product catalog with rich descriptions, attributes, SEO metadata, and AI-agent-readable schemas.

**Stack**:
- [NVIDIA-AI-Blueprints/retail-shopping-assistant](https://github.com/NVIDIA-AI-Blueprints/retail-shopping-assistant) (Apache-2.0) — multi-agent reference
- Claude Sonnet 5 — description generation, attribute extraction, schema markup
- [medusajs/medusa](https://github.com/medusajs/medusa) (MIT) — product catalog target
- LangGraph (MIT, ~24k★) — batch enrichment pipeline
- Schema.org / JSON-LD — AEO-ready structured data output

**Wiring**:
```
1. Source: raw product data (title, SKU, images, supplier description)
2. Claude vision: extract attributes from product images (color, material, dimensions)
3. Claude Sonnet: generate rich description (SEO + AEO optimized; schema.org ready)
4. Attribute standardizer: normalize to taxonomy (size charts, color codes, material types)
5. JSON-LD generation: product schema for AI-agent readability
6. Push enriched data → Medusa product API (batch or streaming)
7. Monitor: AEO coverage score (% products with rich schemas)
```

**Timeline**: 4–8 weeks  
**ROI signal**: Catalog quality is now the #1 determinant of AI-agent purchase decisions (AEO)  
**Best for**: Retailers with 10k–10M SKUs; marketplaces; wholesale/B2B catalogs

---

## Pattern Selection Guide

| Client Situation | Start With |
|-----------------|---|
| New D2C brand, greenfield | P1 (AI-native storefront) → P3 (ACP checkout) |
| Existing Stripe merchant | P3 (ACP) first — fastest ROI, 1 line of code |
| Struggling with discovery / SEO declining | P7 (catalog enrichment / AEO) |
| Physical retail, OOS problems | P6 (shelf audit) |
| Recommendation engine missing | P2 (LightFM hybrid RecSys) |
| LATAM SMB, WhatsApp-first market | P5 (WhatsApp commerce) |
| Multi-location, inventory issues | P4 (demand forecasting + stockpyl) |
