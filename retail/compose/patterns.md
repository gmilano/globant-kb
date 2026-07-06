# Composition Patterns — Retail AI

> Concrete recipes using specific repos + agents + wiring instructions.
> All components are MIT / Apache 2.0 / LGPL unless noted.
> Last updated: 2026-07-06

---

## Pattern 1: Agentic Shopping Assistant (WhatsApp → Medusa)

**Problem**: LATAM retailer wants customers to browse, search, and buy via WhatsApp without building a native app.

**Stack**:
```
WhatsApp Business API (customer channel)
    ↓
Rasa (Apache 2.0) — intent recognition, dialogue management, CALM
    ↓
LangGraph (MIT) — multi-step agent graph (search → cart → checkout → confirmation)
    ↓
medusa-mcp (MIT) — MCP server exposing Medusa commerce APIs as LLM tools
    ↓
Medusa (MIT) — cart, orders, inventory, promotions backend
    ↓
RecBole (MIT) — "while you shop" recommendation engine
```

**Wiring**:
1. Deploy Medusa v2 with product catalog, inventory, and checkout configured
2. Start medusa-mcp server — exposes `create_cart`, `add_item`, `search_products`, `get_order` as MCP tools
3. Build LangGraph agent with nodes: [intent_router → product_search → add_to_cart → apply_promo → checkout_confirm]
4. Wire Rasa CALM to handle NLU + call LangGraph for multi-step flows
5. Connect Rasa to WhatsApp via Twilio or Vonage connector

**Estimated build time**: 8-12 weeks  
**Key differentiator**: WhatsApp as primary commerce channel; medusa-mcp enables LLM-native cart operations without custom tool code  
**LATAM fit**: High — Brazil/Mexico WhatsApp commerce adoption

---

## Pattern 2: Real-Time Personalization Engine (RecBole + Medusa)

**Problem**: E-commerce platform has >50k SKUs but serves the same homepage to all users. Wants "Amazon-style" personalization without building from scratch.

**Stack**:
```
Medusa (MIT) — commerce backend + event webhooks
    ↓ (purchase/view events via webhooks)
Event stream (Redis Streams or Kafka)
    ↓
RecBole (MIT) — SASRec (sequential rec) + LightGCN (collaborative filtering)
    ↓
FAISS (MIT) — real-time nearest-neighbor retrieval from precomputed embeddings
    ↓
Recommendation API (FastAPI) — returns top-N products per user
    ↓
Storefront (Next.js + Medusa Storefront) — "Recommended for you" widget
```

**Algorithm selection**:
| Use Case | Algorithm | Why |
|----------|-----------|-----|
| "You might also like" | LightGCN (RecBole) | Graph-based CF; handles implicit feedback |
| "Complete the look" | BERT4Rec (RecBole) | Sequential; considers recent browsing |
| "Trending now" | ItemKNN (RecBole) | Popularity + similarity; no cold-start issues |
| "Shop by style" | CLIP + FAISS | Multimodal; works on image similarity |

**Wiring**:
1. Deploy RecBole training pipeline — ingest purchase/view events, retrain nightly
2. FAISS index built from RecBole embeddings — serves real-time top-N in <50ms
3. FastAPI wrapper with user_id input → returns ranked product_ids
4. Medusa storefront calls recommendation API on page load
5. A/B test RecBole vs. existing rule-based recommendations

**Estimated build time**: 10-14 weeks  
**Expected impact**: +15-25% CTR on product cards; up to +31% revenue contribution from recommendations

---

## Pattern 3: Visual Search — "Shop by Photo" (CLIP + FAISS + Saleor)

**Problem**: Fashion/home decor retailer wants "find similar product" — user uploads photo, system returns visually matching items from catalog.

**Stack**:
```
User uploads image (mobile app or web)
    ↓
CLIP (MIT) — extract 512-dim visual embedding from uploaded image
    ↓
FAISS (MIT) — approximate nearest-neighbor search over pre-indexed catalog embeddings
    ↓
Top-K product IDs returned in <100ms
    ↓
Saleor (Apache 2.0) — fetch product metadata, prices, availability
    ↓
Storefront — display visually similar products with "Shop this look" CTA
```

**Catalog indexing pipeline**:
```python
# Nightly batch: index all product images
from openai.clip import CLIP
import faiss, numpy as np

model = CLIP.load("ViT-B/32")
embeddings = []
for product in catalog.products:
    img = load_image(product.image_url)
    emb = model.encode_image(img)  # 512-dim
    embeddings.append(emb)

index = faiss.IndexFlatIP(512)  # inner product = cosine similarity
index.add(np.array(embeddings))
faiss.write_index(index, "catalog.index")
```

**Wiring**:
1. Build nightly CLIP embedding pipeline for all catalog images (GPU recommended for >100k SKUs)
2. Serve FAISS index via FastAPI endpoint: POST /search-by-image → returns product_ids + similarity scores
3. Connect to Saleor via GraphQL to fetch product details for returned IDs
4. Add "Upload photo to find similar" button to storefront product discovery

**Estimated build time**: 6-8 weeks  
**Key metric**: Conversion rate on visual search sessions typically 2-3× higher than keyword search

---

## Pattern 4: Dynamic Pricing Agent (PriceWars + CrewAI + Saleor)

**Problem**: Mid-market retailer wants automated competitive repricing — monitor competitor prices, model demand elasticity, update prices within margin guardrails.

**Stack**:
```
Competitor price feeds (scrapers / price intelligence APIs)
    ↓
PriceWars (MIT) — simulation engine; models demand elasticity + competitor reactions
    ↓
CrewAI (MIT) — multi-agent pricing crew:
  • CompetitorAnalystAgent — monitors market prices
  • ElasticityModelAgent — forecasts demand at price points
  • MarginGuardAgent — enforces floor/ceiling rules
  • PricingDecisionAgent — synthesizes and decides
    ↓
Saleor (Apache 2.0) — applies price updates via GraphQL mutation
    ↓
Monitoring dashboard — price change audit log, revenue impact
```

**CrewAI crew definition**:
```python
from crewai import Agent, Task, Crew

competitor_analyst = Agent(
    role="Competitor Price Analyst",
    goal="Monitor and summarize competitor pricing for SKUs",
    tools=[price_scraper_tool, market_data_tool]
)
elasticity_modeler = Agent(
    role="Demand Elasticity Modeler",
    goal="Predict demand at candidate price points using historical data",
    tools=[pricewars_simulation_tool, historical_sales_tool]
)
margin_guard = Agent(
    role="Margin Guardian",
    goal="Reject pricing decisions that violate floor/ceiling rules",
    tools=[margin_calculator_tool]
)
pricing_decision = Agent(
    role="Pricing Decision Maker",
    goal="Synthesize analysis and recommend optimal price",
    tools=[saleor_update_price_tool]
)
```

**Estimated build time**: 10-14 weeks  
**Key guardrails**: Always require human approval for >20% price change; log all decisions for compliance

---

## Pattern 5: AI Customer Service Agent (Rasa + LangGraph + Medusa)

**Problem**: Retailer handling 10k+ customer service inquiries/day. 70% are repetitive: order status, returns, product questions. Wants AI to resolve tier-1 automatically.

**Stack**:
```
Customer channels: WhatsApp / Web chat / Email
    ↓
Rasa (Apache 2.0) — NLU classification → intent routing
    ↓
LangGraph (MIT) — stateful agent graph:
  • order_status_node — queries Medusa Orders API
  • return_initiation_node — creates return in Medusa
  • product_qa_node — RAG over product catalog + FAQs
  • escalation_node — human handoff with context
    ↓
Medusa (MIT) — orders, returns, inventory APIs
Weaviate (BSD-3) — product knowledge base (semantic search)
    ↓
Human agent dashboard — receives escalated tickets with full context
```

**Automation tiers**:
| Intent | Automation Level | Tool |
|--------|-----------------|------|
| "Where is my order?" | Full auto (95% confidence) | Medusa Orders API |
| "I want to return X" | Full auto + confirmation | Medusa Returns API |
| "Does it come in blue?" | Full auto via RAG | Weaviate product KB |
| "I'm angry about X" | Escalate to human | Human handoff + context |

**Estimated build time**: 8-12 weeks  
**Expected outcome**: 60-70% of tier-1 inquiries automated; CSAT maintained or improved via faster response

---

## Pattern 6: Retail Intelligence Dashboard (ERPNext + RecBole + LangGraph)

**Problem**: Regional retailer with 50+ stores needs business intelligence: what to reorder, what to promote, what's underperforming — with natural language querying.

**Stack**:
```
ERPNext (GPL-3.0) — sales data, inventory, purchase orders
    ↓ (daily data sync)
RecBole (MIT) — item popularity modeling, trend detection
Stockpyl (MIT) — inventory optimization (reorder points, safety stock)
    ↓
LangGraph (MIT) — "retail intelligence agent":
  • trend_analyst_node — identifies top/bottom performers
  • reorder_agent_node — suggests replenishment orders
  • promo_agent_node — recommends markdown candidates
  • report_generator_node — creates executive summary
    ↓
Dify (Apache 2.0) — natural language interface: "What should I reorder this week?"
    ↓
ERPNext — auto-creates Purchase Orders from agent recommendations
```

**Key queries the agent handles**:
- "Show me items trending up this week but at risk of stockout"
- "Which products have been sitting over 60 days? Suggest markdowns"
- "What should I reorder for the holiday season given last year's data?"
- "Compare store performance for locations in São Paulo"

**Estimated build time**: 12-16 weeks  
**LATAM fit**: High — mid-market LATAM retailers running ERPNext (large Frappe community in Brazil)
