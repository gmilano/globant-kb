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

---

## Pattern 7: AI Demand Forecasting + Auto-Replenishment (Chronos + statsforecast + Odoo)

**Problem**: Retailer with 5k–100k SKUs loses margin to overstock (15-25% of inventory capital wasted) and stockouts (-15-30% revenue impact). Manual forecasting can't scale.

**Stack**:
```
Odoo (LGPL-3.0) — ERP: sales history, current stock, purchase orders
    ↓ (daily ETL: SKU-level time series extraction)
Nixtla/statsforecast (Apache 2.0) — AutoARIMA per SKU (existing SKUs with history)
Amazon Chronos (Apache 2.0) — zero-shot forecast for new/seasonal SKUs
Nixtla/neuralforecast (Apache 2.0) — NHITS for SKUs with complex seasonality
    ↓ (forecasts → safety stock → reorder point calculation)
stockpyl (MIT) — EOQ + newsvendor model + multi-echelon optimization
    ↓
LangGraph (MIT) — replenishment agent:
  • forecast_node — selects model (statsforecast/Chronos/neural) per SKU
  • stock_level_node — checks current inventory vs. reorder point
  • po_creation_node — generates Purchase Order draft in Odoo
  • approval_node — human-in-the-loop gate for POs above threshold
    ↓
Odoo API — creates Purchase Orders; notifies purchasing team
```

**Model selection logic**:
```python
def select_forecasting_model(sku_history_length: int, has_external_regressors: bool):
    if sku_history_length < 10:
        return "chronos"          # zero-shot for new/low-history SKUs
    elif has_external_regressors:
        return "neuralforecast"   # NHITS handles weather, promotions, holidays
    else:
        return "statsforecast"    # AutoARIMA — fastest, most reliable for standard SKUs
```

**Wiring**:
1. Daily ETL: extract SKU sales series from Odoo → pandas DataFrame with `[unique_id, ds, y]`
2. Run statsforecast `AutoARIMA` in parallel (n_jobs=-1) across all established SKUs
3. Run Chronos `chronos-t5-base` for new SKUs and low-history items
4. stockpyl computes reorder points: `ROP = lead_time_demand + safety_stock(z_score, σ)`
5. LangGraph agent: if `current_stock < ROP` → draft PO in Odoo via REST API
6. Human approval gate: POs > $10k threshold require buyer confirmation

**Estimated build time**: 4-6 weeks  
**Expected impact**: -20% overstock, -15% stockouts, 8-12% reduction in inventory carrying cost  
**LATAM fit**: Very high — Nixtla proven at Walmart MX + Rappi; Odoo dominant in LATAM SME retail

---

## Pattern 8: AI Catalog Enrichment Pipeline (NVIDIA Retail-Catalog-Enrichment + Claude)

**Problem**: Retailer has 50k–500k SKUs with bare-bones product listings (one image, short title, no attributes). Manual enrichment costs $2–10/SKU and takes months. Poor catalog = invisible to AI shopping agents.

**Stack**:
```
Product image feed (S3 / CDN)
    ↓
NVIDIA Retail-Catalog-Enrichment (Apache-2.0) — VLM analysis, image gen, 3D creation
  • Nemotron 3 Nano Omni → structured product JSON
  • FLUX.1-Kontext-Dev → cultural background images (LATAM/APAC-ready)
  • Microsoft TRELLIS → 3D GLB model for interactive viewer
    ↓
Claude Haiku — quality review (QA agent: approve/flag/improve)
    ↓
ACP/UCP schema export → Medusa / Saleor catalog update
```

**Wiring**:
```python
# catalog_enrichment_pipeline.py
import anthropic
import httpx
import base64
import json

client = anthropic.Anthropic()
NVIDIA_API = "http://localhost:8000"  # NVIDIA blueprint local deploy
MEDUSA_URL = "http://localhost:9000"
MEDUSA_KEY = "your_medusa_key"

def enrich_product(image_path: str, market: str = "latam") -> dict:
    """NVIDIA blueprint: image → rich catalog entry"""
    with open(image_path, "rb") as f:
        img_b64 = base64.b64encode(f.read()).decode()
    resp = httpx.post(f"{NVIDIA_API}/enrich", json={
        "image_base64": img_b64,
        "target_market": market,
        "generate_3d": True,
        "generate_cultural_background": True,
        "export_acp_schema": True
    }, timeout=120)
    return resp.json()

def claude_qa(enriched: dict) -> dict:
    """Claude Haiku: approve/flag enriched entry"""
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=512,
        messages=[{"role": "user", "content": f"""
QA review for AI-enriched product catalog entry:
{json.dumps(enriched, indent=2)}

Check: title clarity, description completeness, tag accuracy, no hallucinations.
Return JSON: {{"approved": bool, "quality_score": 0-100, "issues": [], "price_tier": "budget|mid|premium"}}"""}]
    )
    return json.loads(response.content[0].text)

def upload_to_medusa(enriched: dict, review: dict) -> str:
    """Upload approved entry to Medusa"""
    payload = {
        "title": enriched.get("title", ""),
        "description": enriched.get("description", ""),
        "metadata": {
            "enriched": True, "quality_score": review["quality_score"],
            "price_tier": review["price_tier"],
            "acp_schema": enriched.get("acp_schema", {}),
            "model_3d_url": enriched.get("model_3d_glb_url", "")
        },
        "tags": [{"value": t} for t in enriched.get("tags", [])]
    }
    r = httpx.post(f"{MEDUSA_URL}/admin/products", json=payload,
                   headers={"x-medusa-access-token": MEDUSA_KEY})
    return r.json().get("product", {}).get("id", "")

def process_batch(image_paths: list, market: str = "latam"):
    results = {"processed": 0, "approved": 0, "ids": [], "errors": []}
    for path in image_paths:
        try:
            enriched = enrich_product(path, market)
            review = claude_qa(enriched)
            if review["approved"] and review["quality_score"] >= 75:
                medusa_id = upload_to_medusa(enriched, review)
                results["ids"].append(medusa_id)
                results["approved"] += 1
            results["processed"] += 1
        except Exception as e:
            results["errors"].append(str(e))
    return results
```

**Estimated build time**: 2–3 weeks  
**Cost**: <$0.01/SKU (NVIDIA GPU) + $0.00015/SKU (Claude Haiku QA) — vs. $2–10/SKU manual  
**ROI**: 99% cost reduction; catalog completeness enables ACP/UCP shopping agent discoverability  
**LATAM fit**: High — FLUX.1-Kontext generates culturally-adapted backgrounds for Brazilian/Mexican market

---

## Pattern 9: WhatsApp Commerce + Visual Search (LATAM Live Commerce)

**Problem**: LATAM brand running Instagram/TikTok Live shopping wants to capture post-stream sales via WhatsApp — customers send a screenshot/photo from the live session and want to buy that exact item.

**Stack**:
```
Customer sends photo on WhatsApp
    ↓
Twilio WhatsApp API → webhook receives image
    ↓
Claude Haiku Vision — extracts product attributes from photo
    ↓
Gorse (Apache 2.0) — CF retrieval + vector match for catalog products
    ↓
Claude Haiku — generates WhatsApp reply with top matches + payment link
    ↓
Medusa (MIT) — creates cart + checkout link
    ↓
Pix (Brazil) / OXXO (Mexico) / WebPay (Chile) — payment completion
```

**Wiring**:
```python
# whatsapp_visual_commerce.py
from fastapi import FastAPI, Request
from twilio.rest import Client as Twilio
import anthropic
import httpx
import base64
import json, os

app = FastAPI()
twilio = Twilio(os.getenv("TWILIO_SID"), os.getenv("TWILIO_TOKEN"))
claude = anthropic.Anthropic()

GORSE_URL = "http://localhost:8088"
MEDUSA_URL = "http://localhost:9000"
MEDUSA_KEY = os.getenv("MEDUSA_KEY")

def detect_country_lang(phone: str) -> tuple[str, str]:
    mapping = {"+55": ("BR", "pt"), "+52": ("MX", "es"), "+54": ("AR", "es"),
               "+57": ("CO", "es"), "+56": ("CL", "es")}
    for prefix, (country, lang) in mapping.items():
        if phone.startswith(prefix):
            return country, lang
    return "LATAM", "es"

def analyze_product_image(image_bytes: bytes, lang: str) -> dict:
    """Claude Vision: extract searchable product attributes"""
    img_b64 = base64.standard_b64encode(image_bytes).decode()
    response = claude.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=256,
        messages=[{"role": "user", "content": [
            {"type": "image", "source": {"type": "base64", "media_type": "image/jpeg", "data": img_b64}},
            {"type": "text", "text": f"""Extract product attributes from this image for catalog search.
Return JSON: {{"search_query": "3 words", "category": "...", "color": "...", "style": "..."}}
Language context: {lang}"""}
        ]}]
    )
    try:
        return json.loads(response.content[0].text)
    except Exception:
        return {"search_query": "product", "category": "general"}

def gorse_search(query: str, n: int = 5) -> list:
    """Gorse: semantic catalog search"""
    r = httpx.get(f"{GORSE_URL}/api/items", params={"n": n, "text": query})
    return r.json() if r.status_code == 200 else []

def create_medusa_checkout(product_id: str, customer_email: str) -> str:
    """Create Medusa cart + return checkout URL"""
    cart_r = httpx.post(f"{MEDUSA_URL}/store/carts",
                        json={"email": customer_email, "currency_code": "brl"},
                        headers={"x-medusa-access-token": MEDUSA_KEY})
    cart_id = cart_r.json().get("cart", {}).get("id")
    if cart_id:
        httpx.post(f"{MEDUSA_URL}/store/carts/{cart_id}/line-items",
                   json={"variant_id": product_id, "quantity": 1},
                   headers={"x-medusa-access-token": MEDUSA_KEY})
        return f"https://store.example.com/checkout/{cart_id}"
    return ""

@app.post("/whatsapp/image-search")
async def image_search_handler(request: Request):
    form = await request.form()
    from_phone = form.get("From", "").replace("whatsapp:", "")
    media_url = form.get("MediaUrl0", "")
    
    if not media_url:
        return {"status": "no_image"}
    
    country, lang = detect_country_lang(from_phone)
    
    img_r = httpx.get(media_url, auth=(os.getenv("TWILIO_SID"), os.getenv("TWILIO_TOKEN")))
    
    attrs = analyze_product_image(img_r.content, lang)
    
    matches = gorse_search(attrs.get("search_query", ""), n=3)
    
    if lang == "pt":
        reply = f"Encontrei produtos similares para voce!\n\n"
    else:
        reply = f"Encontre productos similares!\n\n"
    
    checkout_urls = []
    for i, item in enumerate(matches[:3], 1):
        name = item.get("Labels", {}).get("name", f"Produto {i}")
        price = item.get("Labels", {}).get("price", "Consultar precio")
        checkout = create_medusa_checkout(item.get("ItemId", ""), "customer@example.com")
        reply += f"{i}. {name} — {price}\n"
        if checkout:
            checkout_urls.append(checkout)
    
    if checkout_urls:
        reply += f"\nComprar: {checkout_urls[0]}"
        if country == "BR":
            reply += "\nAceita Pix!"
        elif country == "MX":
            reply += "\nAceita OXXO!"
    
    twilio.messages.create(
        from_=f"whatsapp:{os.getenv('TWILIO_WHATSAPP_NUMBER')}",
        to=f"whatsapp:{from_phone}",
        body=reply
    )
    return {"status": "sent"}
```

**Estimated build time**: 2–3 weeks  
**Cost**: ~$0.01/image (Claude Haiku Vision) + $0.0042/WhatsApp message (Twilio)  
**Expected conversion**: 15–25% lift (visual intent = high-purchase-intent signal)  
**LATAM fit**: Very high — Brazil/Chile live video commerce growing fast; WhatsApp image sharing is native behavior
