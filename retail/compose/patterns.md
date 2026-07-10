# Composition Patterns — Retail & E-Commerce AI

> Concrete recipes using real repos + agents. All stacks use MIT/Apache 2.0 components.
> Updated: 2026-07-10

---

## Pattern Base

```
[Open Source Commerce Platform (Medusa / Saleor / Odoo)]
          ↓
[ACP Layer — Agentic Commerce Protocol (Apache 2.0)]
          ↓
[AI Agents: Catalog + Recommendations + Inventory + Shopping]
          ↓
[Customer-facing: ChatGPT / Gemini / Alexa+ / Custom UI]
```

---

## P1 — Agentic Checkout Pipeline (Core Pattern)

**Goal:** Allow AI shopping agents (ChatGPT, Gemini, Perplexity, custom) to browse, select, and purchase from a retail client's catalog.

**Stack:**
- Commerce: [medusajs/medusa](https://github.com/medusajs/medusa) (MIT) — product catalog + order management
- Protocol: [agentic-commerce-protocol/agentic-commerce-protocol](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol) (Apache 2.0) — ACP spec
- Payments: Stripe with ACP delegated payment handler
- Reference impl: [locus-technologies/agentic-commerce-protocol-demo](https://github.com/locus-technologies/agentic-commerce-protocol-demo) (Apache 2.0)

**Architecture:**
```python
# ACP Merchant Server (FastAPI wrapping Medusa API)
from fastapi import FastAPI
from medusa_sdk import MedusaClient

app = FastAPI()
medusa = MedusaClient(base_url="http://localhost:9000", api_key=MEDUSA_KEY)

@app.get("/acp/catalog")          # ACP: Product Feed endpoint
async def get_catalog(query: str, limit: int = 20):
    products = await medusa.products.search(q=query, limit=limit)
    return {
        "products": [
            {
                "id": p.id,
                "title": p.title,
                "description": p.description,
                "variants": [{"id": v.id, "price": v.price, "sku": v.sku} for v in p.variants],
                "attributes": p.metadata  # structured for AI browsing
            }
            for p in products.products
        ]
    }

@app.post("/acp/checkout")        # ACP: Create checkout session
async def create_checkout(items: list[dict], buyer_token: str):
    cart = await medusa.carts.create()
    for item in items:
        await medusa.carts.add_line_item(cart.id, item["variant_id"], item["quantity"])
    # Delegate payment via Stripe ACP handler
    payment_session = await medusa.carts.create_payment_sessions(cart.id)
    return {"session_id": cart.id, "payment_methods": payment_session}

@app.post("/acp/checkout/{session_id}/complete")   # ACP: Complete purchase
async def complete_checkout(session_id: str, payment_token: str):
    order = await medusa.orders.create_from_cart(session_id)
    return {"order_id": order.id, "status": order.status, "total": order.total}
```

**Estimated cost to build:** $80k–$250k  
**Timeline:** 8–12 weeks  
**LATAM note:** Add PIX (Brazil) or OXXO (Mexico) as custom payment handlers in Medusa.

---

## P2 — AI Catalog Enrichment Factory

**Goal:** Transform sparse product images/data into rich, multi-language, ACP-ready catalog entries at scale.

**Stack:**
- Blueprint: [NVIDIA-AI-Blueprints/Retail-Catalog-Enrichment](https://github.com/NVIDIA-AI-Blueprints/Retail-Catalog-Enrichment) (Apache 2.0)
- Content generation: Claude claude-sonnet-5 (Anthropic API) for copywriting
- Image generation: FLUX Kontext via NVIDIA NIM API
- 3D assets: TRELLIS model
- Storage: Medusa catalog or Saleor product API

**Pipeline:**
```python
import anthropic
import httpx
import base64

client = anthropic.Anthropic()

async def enrich_product(image_path: str, basic_info: dict, target_languages: list[str]) -> dict:
    """Transform a product image + minimal info into a rich catalog entry."""
    
    # Step 1: Analyze product via Claude vision
    with open(image_path, "rb") as f:
        image_data = base64.standard_b64encode(f.read()).decode("utf-8")
    
    analysis = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2000,
        messages=[{
            "role": "user",
            "content": [
                {"type": "image", "source": {"type": "base64", "media_type": "image/jpeg", "data": image_data}},
                {"type": "text", "text": f"""Analyze this product image and generate:
1. Detailed description (150 words)
2. Key attributes (material, color, dimensions, use case, care instructions)
3. Target customer persona
4. 5 semantic search tags
5. FAQ (3 common questions + answers)

Context: {basic_info}
Return as JSON."""}
            ]
        }]
    )
    
    product_data = json.loads(analysis.content[0].text)
    
    # Step 2: Generate localized descriptions for each language
    translations = {}
    for lang in target_languages:
        translation = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=500,
            messages=[{
                "role": "user",
                "content": f"Translate this product description to {lang}, keeping retail tone:\n{product_data['description']}"
            }]
        )
        translations[lang] = translation.content[0].text
    
    # Step 3: Generate variant images via NVIDIA FLUX Kontext (NIM API)
    async with httpx.AsyncClient() as http:
        variants = await http.post(
            "https://integrate.api.nvidia.com/v1/images/generations",
            headers={"Authorization": f"Bearer {NVIDIA_API_KEY}"},
            json={
                "model": "black-forest-labs/flux-kontext-pro",
                "prompt": f"{product_data['description']} - white background, product photography",
                "n": 3  # 3 variant angles
            }
        )
    
    # Step 4: Export ACP-compatible schema
    return {
        "title": basic_info["name"],
        "description": product_data["description"],
        "attributes": product_data["attributes"],
        "translations": translations,
        "tags": product_data["tags"],
        "faq": product_data["faq"],
        "images": [{"url": v["url"], "role": f"variant_{i}"} for i, v in enumerate(variants.json()["data"])],
        "acp_schema": {  # ACP-ready product representation
            "id": basic_info["sku"],
            "name": basic_info["name"],
            "description": product_data["description"],
            "attributes": product_data["attributes"],
            "searchable_text": " ".join(product_data["tags"]) + " " + product_data["description"]
        }
    }
```

**Estimated cost to build:** $60k–$200k  
**Timeline:** 6–10 weeks  
**ROI:** Replaces $5–50/product human copywriting cost; enables AI-agent discoverability.

---

## P3 — AI Personalization Engine (Gorse + Medusa)

**Goal:** Real-time product recommendations personalized per user, replacing rule-based "customers also viewed."

**Stack:**
- Recommender: [gorse-io/gorse](https://github.com/gorse-io/gorse) (Apache 2.0)
- Commerce: [medusajs/medusa](https://github.com/medusajs/medusa) (MIT)
- Feedback loop: User click/purchase events → Gorse feedback API
- LLM reranker: Claude claude-haiku-4-5 for context-aware reranking

**Gorse setup (docker-compose excerpt):**
```yaml
version: "3"
services:
  gorse-master:
    image: zhenghaoz/gorse-master
    environment:
      GORSE_CACHE_STORE: "redis://redis:6379"
      GORSE_DATA_STORE: "postgres://gorse:password@postgres/gorse"
    ports: ["8088:8088"]   # REST API
  
  gorse-worker:
    image: zhenghaoz/gorse-worker
    environment:
      GORSE_MASTER_HOST: gorse-master
    deploy:
      replicas: 2

  gorse-server:
    image: zhenghaoz/gorse-server
    ports: ["8087:8087"]   # Recommendation serving
```

**Integration with Medusa:**
```python
import httpx
import anthropic

GORSE_URL = "http://gorse-server:8087"

async def get_personalized_recommendations(user_id: str, context: str, n: int = 10):
    """Get recommendations from Gorse, rerank with Claude for context."""
    
    # 1. Fetch collaborative filtering recommendations from Gorse
    async with httpx.AsyncClient() as http:
        resp = await http.get(f"{GORSE_URL}/api/recommend/{user_id}", params={"n": n * 2})
    candidates = resp.json()  # [{item_id, score}, ...]
    
    # 2. Fetch product details from Medusa
    medusa_products = await medusa.products.list(
        ids=[c["item_id"] for c in candidates]
    )
    
    # 3. LLM reranking for context (e.g., user just searched for "running shoes")
    client = anthropic.Anthropic()
    rerank = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=500,
        messages=[{
            "role": "user",
            "content": f"""Given user context: "{context}"
            
Rerank these products (keep top {n}) from most to least relevant.
Return product IDs as JSON array.

Products: {[{"id": p.id, "title": p.title, "tags": p.tags} for p in medusa_products.products]}"""
        }]
    )
    
    top_ids = json.loads(rerank.content[0].text)
    return [p for p in medusa_products.products if p.id in top_ids[:n]]

# Track feedback to improve future recommendations
async def track_event(user_id: str, item_id: str, event_type: str):
    """Send user interaction back to Gorse for model improvement."""
    async with httpx.AsyncClient() as http:
        await http.post(f"{GORSE_URL}/api/feedback", json={
            "FeedbackType": event_type,  # "click", "purchase", "add_to_cart"
            "UserId": user_id,
            "ItemId": item_id,
        })
```

**Estimated cost to build:** $50k–$180k  
**Timeline:** 6–8 weeks  
**Expected lift:** 15–35% increase in average order value (industry benchmark for AI recommendations).

---

## P4 — Autonomous Inventory Management Agent

**Goal:** LLM multi-agent system that monitors inventory levels, forecasts demand, and autonomously triggers reorders.

**Stack:**
- Agent framework: [zefang-liu/InvAgent](https://github.com/zefang-liu/InvAgent) (Apache 2.0) — LLM zero-shot inventory management
- ERP backend: [InvenTree/InvenTree](https://github.com/InvenTree/InvenTree) (MIT) or Odoo (LGPL)
- Orchestration: Claude claude-sonnet-5 via Anthropic Managed Agents
- Tools: InvenTree REST API, supplier APIs, demand signal feeds

**Agent definition:**
```python
import anthropic

client = anthropic.Anthropic()

INVENTORY_TOOLS = [
    {
        "name": "get_stock_levels",
        "description": "Get current stock levels for all SKUs below safety stock threshold",
        "input_schema": {
            "type": "object",
            "properties": {
                "threshold_pct": {"type": "number", "description": "Alert when stock < X% of safety stock"}
            }
        }
    },
    {
        "name": "get_demand_forecast",
        "description": "Get 30-day demand forecast for a SKU using historical sales + seasonality",
        "input_schema": {
            "type": "object",
            "properties": {
                "sku": {"type": "string"},
                "days": {"type": "integer", "default": 30}
            },
            "required": ["sku"]
        }
    },
    {
        "name": "create_purchase_order",
        "description": "Create a purchase order to restock a SKU",
        "input_schema": {
            "type": "object",
            "properties": {
                "sku": {"type": "string"},
                "quantity": {"type": "integer"},
                "supplier_id": {"type": "string"},
                "requires_human_approval": {"type": "boolean"}
            },
            "required": ["sku", "quantity", "supplier_id"]
        }
    }
]

def run_inventory_agent(alert_threshold_pct: float = 0.2):
    """Autonomous inventory management agent — runs daily."""
    
    messages = [{
        "role": "user",
        "content": f"""You are an inventory management agent for a retail operation.
        
Your task:
1. Check all SKUs where stock is below {alert_threshold_pct*100}% of safety stock
2. For each low-stock SKU, get demand forecast for next 30 days  
3. Calculate optimal reorder quantity (safety stock + forecast - current stock)
4. Create purchase orders for SKUs needing reorder
   - Orders < $5,000: approve autonomously
   - Orders >= $5,000: flag for human approval (requires_human_approval=true)
5. Produce a summary report

Prioritize: SKUs with zero stock > high-demand SKUs > everything else."""
    }]
    
    # Agentic loop
    while True:
        response = client.messages.create(
            model="claude-sonnet-5",
            max_tokens=4096,
            tools=INVENTORY_TOOLS,
            messages=messages
        )
        
        if response.stop_reason == "end_turn":
            return response.content[-1].text  # Final summary
        
        # Process tool calls
        tool_results = []
        for block in response.content:
            if block.type == "tool_use":
                result = execute_inventory_tool(block.name, block.input)
                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": json.dumps(result)
                })
        
        messages.extend([
            {"role": "assistant", "content": response.content},
            {"role": "user", "content": tool_results}
        ])
```

**Estimated cost to build:** $70k–$250k  
**Timeline:** 8–14 weeks  
**Expected savings:** 20–40% reduction in stockout events; 15–25% reduction in overstock holding costs.

---

## P5 — Amazon Seller Intelligence Agent

**Goal:** Autonomous AI agent for Amazon sellers — keyword research, competitor tracking, listing optimization, PPC management.

**Stack:**
- Skills: [nexscope-ai/Amazon-Skills](https://github.com/nexscope-ai/Amazon-Skills) (MIT) — 6 specialized skills
- Runtime: Claude Code / Claude claude-sonnet-5 with Skills format
- Data sources: Jungle Scout API, Google Trends, Amazon SP-API
- Expanded: [nexscope-ai/ecommerce-skills](https://github.com/nexscope-ai/ecommerce-skills) for multi-platform

**Usage with Claude Code:**
```bash
# Install Amazon Skills for Claude Code
git clone https://github.com/nexscope-ai/Amazon-Skills ~/amazon-skills

# Configure in CLAUDE.md or as project skills
# Skills available:
# - amazon-keyword-research: Find high-value, low-competition keywords
# - amazon-niche-finder: Identify underserved product niches
# - amazon-listing-optimization: Rewrite titles, bullets, descriptions for ranking
# - amazon-ppc-campaign: Build PPC campaign structure + bid recommendations
# - amazon-competitor-analysis: Track competitor pricing, reviews, BSR
# - amazon-enhanced-brand-content: Generate A+ content
```

**Automated pipeline:**
```python
# Daily seller intelligence loop
async def daily_seller_intelligence(asin: str, keywords: list[str]):
    """Run full intelligence cycle for an Amazon listing."""
    
    client = anthropic.Anthropic()
    
    # 1. Keyword research (via Amazon-Skills keyword-research skill)
    kw_analysis = await run_skill("amazon-keyword-research", {
        "seed_keywords": keywords,
        "marketplace": "amazon.com",
        "include_competitors": True
    })
    
    # 2. Competitor analysis
    competitor_data = await run_skill("amazon-competitor-analysis", {
        "asin": asin,
        "competitor_asins": kw_analysis["top_competitor_asins"][:5]
    })
    
    # 3. Listing optimization if needed
    if competitor_data["listing_score"] < 70:
        optimized = await run_skill("amazon-listing-optimization", {
            "asin": asin,
            "current_listing": await get_current_listing(asin),
            "top_keywords": kw_analysis["recommended_keywords"][:20],
            "competitor_analysis": competitor_data
        })
        
        # Auto-update via SP-API if score improvement > 15 points
        if optimized["projected_score"] - competitor_data["listing_score"] > 15:
            await update_amazon_listing(asin, optimized)
    
    return {
        "keywords_analyzed": len(kw_analysis["keywords"]),
        "competitors_tracked": len(competitor_data["competitors"]),
        "listing_updated": optimized is not None
    }
```

**Estimated cost to build:** $30k–$100k  
**Timeline:** 3–6 weeks  
**LATAM relevance:** Amazon LATAM (amazon.com.br, amazon.com.mx) growing rapidly; same skills apply.

---

## P6 — Shopify Store AI Operator

**Goal:** Deploy AI agent as a Shopify store operator — handles inventory, pricing, content, and order management autonomously.

**Stack:**
- Toolkit: [Shopify/Shopify-AI-Toolkit](https://github.com/Shopify/Shopify-AI-Toolkit) (MIT)
- AI runtime: Claude Code with Shopify skills loaded
- Monitoring: Custom dashboard tracking agent decisions + outcomes

**Claude Code config (`CLAUDE.md`):**
```markdown
## Shopify Store Operator Mode

You have access to the Shopify AI Toolkit with 16 store management skills.

Daily tasks:
1. Check inventory levels → reorder alerts if any SKU < 20 units
2. Review orders from last 24h → flag any fulfillment issues
3. Check product performance → identify underperforming listings
4. Monitor competitor pricing (via scrape skills) → adjust prices if within ±10% band
5. Generate weekly performance summary

Autonomous limits:
- Price changes: ±15% of current price (no approval needed)
- Inventory reorder alerts: always (approval needed to actually order)
- Product descriptions: can update (log changes)
- Do NOT: delete products, change payment settings, modify shipping zones
```

**Estimated cost to build:** $40k–$150k  
**Timeline:** 4–8 weeks  

---

## P7 — LATAM Agentic Commerce (PIX/OXXO ACP Adapter)

**Goal:** Bridge ACP (designed for US credit card flows) to LATAM payment methods — enabling Brazilian and Mexican retailers to participate in agentic commerce.

**Stack:**
- Protocol: [agentic-commerce-protocol/agentic-commerce-protocol](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol) (Apache 2.0)
- Commerce: [medusajs/medusa](https://github.com/medusajs/medusa) (MIT)
- Payments: Mercado Pago SDK (Brazil PIX / OXXO) or Ebanx
- Trust layer: Human approval gates for first-time purchases

**PIX ACP Payment Handler:**
```python
from fastapi import FastAPI
import mercadopago

sdk = mercadopago.SDK(MERCADO_PAGO_ACCESS_TOKEN)

@app.post("/acp/payment/pix")
async def create_pix_payment(session_id: str, amount: float, buyer_email: str):
    """ACP-compatible PIX payment handler for Brazilian market."""
    
    payment_data = {
        "transaction_amount": amount,
        "payment_method_id": "pix",
        "payer": {"email": buyer_email},
        "external_reference": session_id,  # ACP session ID
        "notification_url": f"{BASE_URL}/acp/payment/webhook"
    }
    
    result = sdk.payment().create(payment_data)
    pix_data = result["response"]["point_of_interaction"]["transaction_data"]
    
    return {
        "payment_type": "pix",
        "qr_code": pix_data["qr_code"],
        "qr_code_base64": pix_data["qr_code_base64"],
        "expires_at": pix_data["ticket_url"],
        "session_id": session_id
    }

@app.post("/acp/payment/webhook")
async def pix_payment_webhook(notification: dict):
    """Receive PIX payment confirmation and complete ACP checkout."""
    if notification["action"] == "payment.updated":
        payment = sdk.payment().get(notification["data"]["id"])
        if payment["response"]["status"] == "approved":
            session_id = payment["response"]["external_reference"]
            await complete_acp_checkout(session_id)
```

**Estimated cost to build:** $80k–$280k  
**Timeline:** 10–16 weeks (includes regulatory compliance)  
**Strategic value:** First-mover advantage — no dominant open-source ACP+PIX adapter exists yet.

---

## P8 — Visual Search + AI Shopping Assistant

**Goal:** Allow customers to upload a photo of any item and find matching/similar products from retailer's catalog.

**Stack:**
- Embeddings: OpenAI CLIP or open alternatives (LAION CLIP via HuggingFace)
- Vector DB: pgvector (PostgreSQL extension — works with Medusa/Saleor)
- Commerce: Medusa (MIT) product catalog
- LLM: Claude claude-sonnet-5 for conversational refinement

**Architecture:**
```python
import anthropic
from pgvector.psycopg2 import register_vector
import psycopg2
import numpy as np

client = anthropic.Anthropic()

async def visual_search(image_data: bytes, user_query: str = None) -> list[dict]:
    """Find products matching uploaded image + optional text query."""
    
    # 1. Generate image embedding
    embedding = await generate_clip_embedding(image_data)  # 512-dim vector
    
    # 2. Vector similarity search in PostgreSQL/pgvector
    conn = psycopg2.connect(DATABASE_URL)
    register_vector(conn)
    cur = conn.cursor()
    
    cur.execute("""
        SELECT product_id, title, price, 1 - (embedding <=> %s::vector) AS similarity
        FROM product_embeddings
        ORDER BY embedding <=> %s::vector
        LIMIT 20
    """, (embedding, embedding))
    
    candidates = [{"id": row[0], "title": row[1], "price": row[2], "score": row[3]} 
                  for row in cur.fetchall()]
    
    # 3. If text query provided, refine with Claude
    if user_query:
        refined = client.messages.create(
            model="claude-sonnet-5",
            max_tokens=500,
            messages=[{
                "role": "user",
                "content": f"""Given these product candidates from visual search:
{json.dumps(candidates[:10])}

User is looking for: "{user_query}"

Return the top 5 most relevant product IDs as JSON array."""
            }]
        )
        top_ids = json.loads(refined.content[0].text)
        return [c for c in candidates if c["id"] in top_ids]
    
    return candidates[:10]
```

**Estimated cost to build:** $60k–$200k  
**Timeline:** 6–10 weeks  
**Expected impact:** 20–40% higher conversion rate for visual discovery (fashion, home decor, furniture).

---

## P9 — Retail Analytics Intelligence Agent

**Goal:** Autonomous analytics agent that monitors KPIs, detects anomalies, and surfaces actionable insights without a human analyst.

**Stack:**
- Data: Medusa/Saleor order data + behavioral events (Shoplytics or custom)
- Claude claude-sonnet-5 with SQL tools + Python code execution
- Delivery: Slack/email digest + real-time alerts

**Daily analytics loop:**
```python
async def daily_retail_analytics_agent():
    """Run daily analytics and surface key insights."""
    
    ANALYTICS_TOOLS = [
        {"name": "query_sales_data", "description": "Run SQL query on sales database"},
        {"name": "get_funnel_data", "description": "Get conversion funnel metrics for date range"},
        {"name": "detect_anomalies", "description": "Statistical anomaly detection on time series"},
        {"name": "send_slack_alert", "description": "Send alert to retail team Slack channel"}
    ]
    
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=8096,
        tools=ANALYTICS_TOOLS,
        messages=[{
            "role": "user",
            "content": f"""You are a retail analytics agent. Today is {TODAY}.
            
Analyze yesterday's performance:
1. Revenue vs. same day last week and last year
2. Top 10 products by revenue and units
3. Conversion funnel (sessions → product views → add to cart → purchase)
4. Cart abandonment rate — any spike vs. 7-day average?
5. Any SKU with unexpected demand spike (>2σ above normal)?
6. Customer acquisition vs. returning customer split

Alert via Slack if:
- Revenue down >15% vs. last week
- Conversion rate down >20% vs. last week
- Any SKU showing stockout risk within 48h

End with a 3-bullet executive summary."""
        }]
    )
    
    return response.content[-1].text
```

**Estimated cost to build:** $40k–$150k  
**Timeline:** 4–8 weeks  

---

*All patterns can be combined. Recommended sequence for a new retail client: P1 (ACP) → P3 (Personalization) → P2 (Catalog) → P4 (Inventory). Then add vertical features.*

*Auto-updated by Globant AI Studios ingest pipeline.*
