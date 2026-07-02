# Compose Patterns — Retail AI

> Concrete recipes: specific repos + agents + wiring instructions

---

## Pattern 1: Self-Hosted AI Product Recommendation Engine

**Use case:** Replace SaaS personalization (Recombee, Coveo, AWS Personalize) with a self-hosted stack delivering collaborative filtering + LLM re-ranking.

**Components:**
- **[gorse-io/gorse](https://github.com/gorse-io/gorse)** (Apache 2.0) — recommendation engine core
- **[medusajs/medusa](https://github.com/medusajs/medusa)** (MIT) — commerce catalog + events source
- **[langchain-ai/langchain](https://github.com/langchain-ai/langchain)** (MIT) — LLM re-ranking layer

**Wiring:**
```
1. Deploy Gorse with Docker Compose (gorse-io/gorse/docker-compose.yml)
   - Configure item catalog source: call Medusa GET /store/products → POST /api/items to Gorse
   - Set up daily catalog sync job

2. Ingest user interaction events in real-time:
   - Medusa webhook: order.placed → POST /api/feedback {user, item, type:"purchase", value:1}
   - Medusa webhook: cart.item_added → POST /api/feedback {type:"add-to-cart", value:0.5}
   - Frontend event: product_view → POST /api/feedback {type:"view", value:0.1}

3. Serve recommendations:
   - Homepage: GET /api/recommend?user-id={uid}&n=20 → Gorse collaborative filtering results
   - Product page: GET /api/neighbors?item-id={pid}&n=10 → similar item recommendations

4. Optional LLM re-ranking (when business rules needed):
   - Pass Gorse top-20 + user context to LangChain chain
   - Prompt: "Re-rank these 20 products for a user who prefers eco-friendly items. Boost margin >30%. Output ranked IDs only."
   - Cache LLM re-ranked results in Redis (TTL 15 min per user)

5. A/B test: Gorse native ranking vs LLM re-ranked via Gorse experiment API
```

**Expected outcome:** 15-25% CTR improvement vs random/bestseller baseline; <50ms p99 recommendation latency with Redis cache.

---

## Pattern 2: Retail Demand Forecasting + Automated Replenishment

**Use case:** Predict weekly SKU demand per store location, then automatically generate purchase orders in ERPNext within guardrails.

**Components:**
- **[Nixtla/neuralforecast](https://github.com/Nixtla/neuralforecast)** (Apache 2.0) — NHITS/PatchTST demand models
- **[Nixtla/statsforecast](https://github.com/Nixtla/statsforecast)** (Apache 2.0) — ETS/ARIMA ensemble baseline
- **[frappe/erpnext](https://github.com/frappe/erpnext)** (GPL-3.0) — PO generation and inventory
- **[crewAIInc/crewAI](https://github.com/crewAIInc/crewAI)** (MIT) — multi-agent orchestration

**Wiring:**
```
1. Data extraction:
   - ERPNext REST API: GET /api/resource/Stock Ledger Entry → 2 years daily sales per (SKU, store)
   - Enrich with: promotional calendar, store closures, competitor events

2. Forecast pipeline (run weekly on Sundays):
   - NeuralForecast NHITS: train per (SKU, store); 8-week horizon; use log1p transform
   - StatsForecast ETS: baseline ensemble (add +30% weight to NHITS if MAPE < ETS)
   - Output: forecast_df[['SKU','store','date','yhat','yhat_lower','yhat_upper']]

3. CrewAI Demand Analyst Agent:
   - Input: forecast_df + current_stock from ERPNext + in_transit_qty
   - Computes: reorder_qty = max(0, sum(yhat_8wk) - current_stock - in_transit + safety_stock)
   - Flags: items with forecast confidence interval > 40% for human review

4. CrewAI Procurement Agent:
   - For items with reorder_qty > 0 and confidence OK:
     - ERPNext API: POST /api/resource/Purchase Order (status=Draft)
   - Applies constraints: MOQ from supplier master, pack size rounding

5. CrewAI Supervisor Agent:
   - Reviews all Draft POs
   - Auto-approves if total_value < $5,000 AND supplier_reliability_score > 0.85
   - Sends Slack alert via webhook for POs requiring human approval
   - ERPNext: PATCH status=Submitted for auto-approved POs
```

**Expected outcome:** 20-35% reduction in stockout events; 15% reduction in overstock carrying costs.

---

## Pattern 3: Multimodal AI Shopping Assistant

**Use case:** Customer-facing chatbot handling natural-language queries, image-based search, personalized recommendations, and cart management — all from one agent surface.

**Components:**
- **[NVIDIA-AI-Blueprints/retail-shopping-assistant](https://github.com/NVIDIA-AI-Blueprints/retail-shopping-assistant)** (Apache 2.0) — base LangGraph blueprint
- **[saleor/saleor](https://github.com/saleor/saleor)** (BSD-3) — GraphQL commerce API
- **[gorse-io/gorse](https://github.com/gorse-io/gorse)** (Apache 2.0) — personalized recommendations

**Wiring:**
```
1. Fork NVIDIA retail-shopping-assistant repo
   - Replace demo catalog with Saleor GraphQL product API calls
   - Set SALEOR_API_URL and SALEOR_AUTH_TOKEN in config

2. LangGraph agent graph nodes:
   Intent Classifier Node
   ├── SEARCH → Product Search Tool
   │   ├── Text: embed query → vector similarity over CLIP product embeddings
   │   └── Image: CLIP encode upload → cosine similarity search → top-10 products
   ├── RECOMMEND → Gorse Tool
   │   └── GET /api/recommend?user-id={session_uid} → personalized products
   ├── CART → Cart Manager Tool
   │   ├── addLine: Saleor GraphQL mutation checkoutLinesAdd
   │   └── removeLines: Saleor GraphQL mutation checkoutLinesDelete
   ├── PRODUCT_INFO → RAG Tool
   │   └── Retrieve from product catalog vector store → LLM answers care/size/material Qs
   └── SUPPORT → Escalation Tool
       └── Create Zendesk ticket via API if confidence < 0.7

3. Streaming: all responses via WebSocket (LangGraph astream_events)
4. Session state: Redis (user preferences, cart context, conversation history)
5. Observability: LangSmith traces for QA and prompt optimization
```

**Expected outcome:** 40% reduction in support ticket volume; 12-18% uplift in average order value from recommendation-driven cross-sell.

---

## Pattern 4: Agentic Dynamic Pricing Pipeline

**Use case:** Continuously monitor competitor prices and demand signals, optimize retail prices within business rules (minimum margin, MAP compliance), and sync to storefront automatically.

**Components:**
- **[samhaldia/retail-pricing-agent-ai](https://github.com/samhaldia/retail-pricing-agent-ai)** (MIT) — pricing agent core
- **[medusajs/medusa](https://github.com/medusajs/medusa)** (MIT) — price lists API
- **[Nixtla/neuralforecast](https://github.com/Nixtla/neuralforecast)** (Apache 2.0) — demand elasticity modeling

**Wiring:**
```
1. Configure retail-pricing-agent-ai:
   - Competitor data: Rainforest API (Amazon) or Keepa (historical + real-time)
   - Internal data: Medusa GET /admin/products → current prices + margin data

2. Demand Elasticity Agent (runs daily):
   - NeuralForecast: train price-demand model per SKU (historical price changes + units sold)
   - Output: elasticity coefficient ε per SKU (e.g., -1.3 means 10% price ↑ → 13% demand ↓)

3. Pricing Strategy Agent (runs every 4 hours):
   For each SKU:
     competitor_min = min(competitor_prices)
     optimal_price = argmax(price × predicted_demand(price, ε))
     proposed_price = clip(
       optimal_price,
       min=COGS × 1.15,            # 15% minimum margin floor
       max=MAP_PRICE               # manufacturer advertised price ceiling
     )
     if proposed_price > competitor_min × 1.05:
       proposed_price = competitor_min × 1.02  # stay within 2% of cheapest

4. Sync Agent:
   - Batch updates: Medusa PATCH /admin/price-lists/{id}/prices
   - Audit log: append {sku, old_price, new_price, reason, timestamp} to append-only log table
   - Slack notification: daily digest of price changes > 10%

5. Guardrails:
   - Never change more than 15% in a single cycle
   - Block changes during flash sale windows (calendar integration)
   - Human approval required if SKU revenue > $100k/month
```

**Expected outcome:** 3-8% gross margin improvement; elimination of systematic under/overpricing vs. competitors.

---

## Pattern 5: Autonomous Inventory Management Crew

**Use case:** Multi-agent crew monitors stock levels 24/7, detects anomalies (stockouts, shrinkage, demand spikes), and coordinates replenishment without constant human intervention.

**Components:**
- **[crewAIInc/crewAI](https://github.com/crewAIInc/crewAI)** (MIT) — crew orchestration
- **[odoo/odoo](https://github.com/odoo/odoo)** or **[frappe/erpnext](https://github.com/frappe/erpnext)** — inventory data source
- **[Nixtla/neuralforecast](https://github.com/Nixtla/neuralforecast)** (Apache 2.0) — demand sensing

**Wiring:**
```python
# CrewAI crew definition
crew = Crew(agents=[
    Agent(
        role='Inventory Monitor',
        goal='Poll ERP every 30 min; flag items below safety_stock threshold',
        tools=[odoo_stock_tool, alert_tool]
    ),
    Agent(
        role='Anomaly Detective',
        goal='Compare actual vs expected consumption; alert on shrinkage (>2σ variance from forecast)',
        tools=[forecast_tool, stats_tool, alert_tool]
    ),
    Agent(
        role='Replenishment Coordinator',
        goal='Run 4-week NeuralForecast; compute EOQ; generate purchase quantity recommendations',
        tools=[neuralforecast_tool, supplier_catalog_tool]
    ),
    Agent(
        role='Supplier Liaison',
        goal='Send RFQ via email if preferred supplier lead time > 5 days; track responses',
        tools=[email_tool, supplier_api_tool]
    ),
    Agent(
        role='Ops Reporter',
        goal='Generate daily markdown inventory health summary → post to Slack #ops-inventory',
        tools=[slack_tool, reporting_tool]
    )
])

# Task flow (sequential with conditional branching)
Monitor → Anomaly (parallel) → Replenishment → Liaison (if lead_time > 5d) → Report
```

**Expected outcome:** 30-minute mean time to detect stockout (vs. 24-hour human-driven cycle); 40% reduction in emergency replenishment orders at premium freight cost.
