# 🧩 Composition Patterns — Retail & E-Commerce AI

> Concrete recipes combining specific repos + agents + wiring instructions.
> Last updated: 2026-07-11

## Architecture Overview

```
[Vertical Platform (Medusa / ERPNext / Odoo / WooCommerce)]
                    ↓  REST API / MCP
         [Enthusiast Agent Layer OR LangGraph]
                    ↓
         [LLM: Claude / GPT-4 / Llama via Ollama]
                    ↓
    [Specialized AI: RecBole / LightFM / Merlin / stockpyl]
                    ↓
    [Output: Chat UI / API / WhatsApp / ACP Endpoint]
```

---

## P1 — Agentic Shopping Assistant

**Goal**: AI agent that helps customers find products, answers questions, and completes purchases  
**Time to POC**: 2–3 weeks | **License stack**: MIT + Apache-2.0

### Components
| Role | Repo | License |
|------|------|---------|
| Commerce API | [medusajs/medusa](https://github.com/medusajs/medusa) | MIT |
| AI agent framework | [upsidelab/enthusiast](https://github.com/upsidelab/enthusiast) | MIT |
| Agent memory | [mem0ai/mem0](https://github.com/mem0ai/mem0) | Apache-2.0 |
| LLM | Claude claude-sonnet-5 via Anthropic API | Commercial |
| MCP connector | [SGFGOV/medusa-mcp](https://github.com/SGFGOV/medusa-mcp) | MIT |

### Wiring
```python
# 1. Boot Medusa.js v2 (commerce backend)
# docker-compose up medusa

# 2. Configure Enthusiast with Medusa connector
# enthusiast/config.py
CONNECTORS = {
    "medusa": {
        "url": "http://localhost:9000",
        "api_key": os.environ["MEDUSA_API_KEY"]
    }
}

# 3. Enable agents
AGENTS = [
    "product_search",    # RAG over product catalog
    "customer_support",  # FAQ + order status
    "recommendation",    # Personalized suggestions
]

# 4. Add Mem0 for persistent user preferences
from mem0 import MemoryClient
memory = MemoryClient(api_key=os.environ["MEM0_API_KEY"])

# On each user message:
user_memories = memory.search(query=user_message, user_id=user_id)
context = f"User preferences: {user_memories}\n\nUser: {user_message}"

# 5. Route to Enthusiast agent
response = enthusiast.chat(context, agent="product_search")
```

### Capabilities
- Natural language product search across full catalog
- Personalized recommendations based on purchase history
- Order status, returns, FAQ handling
- Add to cart / checkout initiation

---

## P2 — Recommendation Engine Pipeline

**Goal**: Hybrid recommendation system powering product pages, email, and push notifications  
**Time to POC**: 1–2 weeks | **License stack**: MIT + Apache-2.0

### Components
| Role | Repo | License |
|------|------|---------|
| Collaborative filtering | [lyst/lightfm](https://github.com/lyst/lightfm) | Apache-2.0 |
| Benchmark + evaluation | [RUCAIBox/RecBole](https://github.com/RUCAIBox/RecBole) | MIT |
| GPU inference (scale) | [NVIDIA-Merlin/Merlin](https://github.com/NVIDIA-Merlin/Merlin) | Apache-2.0 |
| API layer | FastAPI | MIT |
| Commerce integration | Medusa.js / Shopify API | MIT / Commercial |

### Wiring
```python
# Phase 1: Train LightFM model (cold-start + warm)
from lightfm import LightFM
from lightfm.data import Dataset

dataset = Dataset()
dataset.fit(users, items, item_features=item_metadata)
interactions, weights = dataset.build_interactions(purchase_history)
item_features = dataset.build_item_features(item_metadata)

model = LightFM(loss='warp', no_components=64)
model.fit(interactions, item_features=item_features, epochs=30, num_threads=8)

# Phase 2: Serve recommendations via FastAPI
@app.get("/recommend/{user_id}")
def recommend(user_id: str, n: int = 10):
    user_idx = user_map[user_id]
    scores = model.predict(user_idx, np.arange(n_items), item_features=item_features)
    top_items = [item_map[i] for i in scores.argsort()[-n:][::-1]]
    return {"recommendations": top_items}

# Phase 3 (scale): Swap LightFM for NVIDIA Merlin
# NVTabular preprocessing → HugeCTR training → Triton inference
# Sub-10ms serving at millions of requests/day
```

### Variants
- **Cold-start users**: Use LightFM with item metadata (content-based path)
- **Sequential/session-based**: Use RecBole's SASRec or BERT4Rec models
- **Large-scale GPU**: Migrate to NVIDIA Merlin once traffic > 1M req/day

---

## P3 — Autonomous Inventory Optimization Agent

**Goal**: Agent that monitors inventory levels, forecasts demand, and triggers reorders autonomously  
**Time to POC**: 3–4 weeks | **License stack**: MIT + GPL (ERPNext)

### Components
| Role | Repo | License |
|------|------|---------|
| Inventory math | [LarrySnyder/stockpyl](https://github.com/LarrySnyder/stockpyl) | MIT |
| Agent orchestration | [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT |
| ERP backend | [frappe/erpnext](https://github.com/frappe/erpnext) | GPL-3 |
| LLM reasoning | Claude claude-sonnet-5 | Commercial |

### Wiring
```python
from langgraph.graph import StateGraph
import stockpyl

# Define agent tools
@tool
def get_inventory_level(sku: str) -> dict:
    """Get current stock level from ERPNext"""
    return erpnext_api.get_stock_balance(sku)

@tool
def forecast_demand(sku: str, days: int = 30) -> dict:
    """Forecast demand using historical sales"""
    sales = erpnext_api.get_sales_history(sku, lookback_days=90)
    return prophet_model.predict(sales, periods=days)

@tool
def calculate_reorder_point(sku: str, lead_time_days: int) -> dict:
    """Calculate optimal reorder point using stockpyl"""
    demand_mean = forecast_demand(sku, 30)["mean"]
    demand_std = forecast_demand(sku, 30)["std"]
    return stockpyl.reorder_point(
        mean_demand=demand_mean/30,
        std_demand=demand_std/30,
        lead_time=lead_time_days,
        service_level=0.95
    )

@tool
def create_purchase_order(sku: str, quantity: int, supplier: str) -> str:
    """Create purchase order in ERPNext"""
    return erpnext_api.create_po(sku, quantity, supplier)

# Build agent graph
graph = StateGraph(InventoryState)
graph.add_node("monitor", monitor_inventory)
graph.add_node("forecast", run_demand_forecast)
graph.add_node("decide", llm_decision_node)  # Claude reasons over options
graph.add_node("reorder", create_reorder)
graph.add_node("human_review", human_in_loop_node)  # supervised autonomy

# Run daily
agent = graph.compile()
agent.invoke({"skus": all_skus, "autonomy_level": "supervised"})
```

---

## P4 — AI Catalog Enrichment Pipeline

**Goal**: Automatically generate product titles, descriptions, tags, and SEO metadata from sparse catalog data  
**Time to POC**: 1 week | **License stack**: MIT

### Components
| Role | Repo | License |
|------|------|---------|
| Agent framework | [upsidelab/enthusiast](https://github.com/upsidelab/enthusiast) | MIT |
| Commerce backend | Medusa.js | MIT |
| LLM | Claude claude-sonnet-5 | Commercial |
| Image understanding | Vision-capable LLM | Commercial |

### Wiring
```python
# Enthusiast catalog enrichment agent (built-in)
from enthusiast.agents import CatalogEnrichmentAgent

agent = CatalogEnrichmentAgent(
    connector="medusa",  # native Medusa.js connector
    llm="claude-sonnet-5",
    tasks=[
        "generate_description",   # Long-form product description
        "generate_seo_title",      # SEO-optimized title
        "extract_tags",            # Searchable tags from product data
        "translate",               # Multi-language (ES, PT, FR)
        "generate_search_keywords" # Internal search optimization
    ]
)

# Batch enrichment
sparse_products = medusa.get_products(filter={"description": None})
enriched = agent.enrich_batch(sparse_products, concurrency=10)

# Push back to Medusa
for product, enriched_data in zip(sparse_products, enriched):
    medusa.update_product(product.id, enriched_data)
```

### Output Example
```json
{
  "title": "Premium Merino Wool Crew-Neck Sweater — Men's Classic Fit",
  "description": "Crafted from 100% superfine merino wool, this ...",
  "seo_title": "Merino Wool Sweater for Men | Soft, Warm & Wrinkle-Resistant",
  "tags": ["merino", "wool", "sweater", "crewneck", "men's", "winter"],
  "search_keywords": ["wool jumper", "warm sweater", "merino top"]
}
```

---

## P5 — ACP-Compliant Merchant Endpoint (Agentic Commerce)

**Goal**: Enable AI shopping agents (ChatGPT, Perplexity, Gemini) to discover and purchase from your client's store  
**Time to POC**: 2–3 weeks | **License stack**: Apache-2.0

### Components
| Role | Repo | License |
|------|------|---------|
| ACP + UCP reference | [NVIDIA-AI-Blueprints/Retail-Agentic-Commerce](https://github.com/NVIDIA-AI-Blueprints/Retail-Agentic-Commerce) | Apache-2.0 |
| Commerce API | Medusa.js | MIT |
| MCP server | medusa-mcp | MIT |

### Wiring
```bash
# 1. Clone NVIDIA blueprint
git clone https://github.com/NVIDIA-AI-Blueprints/Retail-Agentic-Commerce

# 2. Configure merchant credentials
cp .env.example .env
# Edit: MEDUSA_URL, MEDUSA_API_KEY, MERCHANT_ACP_SECRET

# 3. Deploy ACP endpoint (exposes /.well-known/acp.json)
docker-compose up acp-server

# 4. Register with AI shopping platforms
# ChatGPT Shopping: submit merchant URL to OpenAI plugin directory
# Perplexity Shopping: add to product feed
# Google Shopping: submit ACP manifest

# 5. Configure UCP merchant controls
# ucp_config.json — set pricing floors, discount caps, inventory buffers
```

### What This Unlocks
- AI shopping agents can discover your products
- Agents can check real-time prices and availability
- Agents can complete purchases autonomously on behalf of users
- Merchant retains control via UCP (minimum prices, excluded products, inventory reserves)

---

## P6 — WhatsApp Commerce Agent (LATAM Focus)

**Goal**: Full e-commerce experience inside WhatsApp — browse, order, track — for LATAM markets  
**Time to POC**: 2–3 weeks | **License stack**: MIT

### Components
| Role | Repo | License |
|------|------|---------|
| Agent framework | [upsidelab/enthusiast](https://github.com/upsidelab/enthusiast) | MIT |
| WhatsApp integration | WhatsApp Business API (via Twilio MCP) | Commercial API |
| Commerce backend | Medusa.js or WooCommerce | MIT / GPL |
| Conversation memory | [mem0ai/mem0](https://github.com/mem0ai/mem0) | Apache-2.0 |

### Wiring
```python
# WhatsApp webhook → Enthusiast agent → Medusa → Reply
from enthusiast import EnthusiastAgent
from twilio.rest import Client

agent = EnthusiastAgent(
    connector="medusa",
    llm="claude-sonnet-5",
    memory=Mem0Client(),
    agents=["product_search", "order_tracking", "support"]
)

@app.post("/whatsapp/webhook")
async def handle_whatsapp(request: WhatsAppMessage):
    user_id = request.from_number
    message = request.body
    
    # Retrieve user context from Mem0
    context = await memory.search(message, user_id=user_id)
    
    # Route to Enthusiast
    response = await agent.chat(
        message=message,
        user_id=user_id,
        context=context
    )
    
    # Reply via WhatsApp
    client.messages.create(
        body=response.text,
        from_="whatsapp:+14155238886",
        to=f"whatsapp:{user_id}"
    )
```

### LATAM-Specific Features
- Portuguese-first for Brazil (Enthusiast supports multi-language via LLM)
- Pix payment integration (Brazil)
- Mercado Pago connector (Argentina, Mexico, Brazil)
- Regional holiday promotions agent

---

## P7 — Demand Forecasting + Auto-Reorder

**Goal**: Time-series forecasting pipeline that feeds inventory agent with accurate demand signals  
**Time to POC**: 2–3 weeks | **License stack**: MIT

### Components
| Role | Repo | License |
|------|------|---------|
| Forecasting | [facebook/prophet](https://github.com/facebook/prophet) | MIT |
| Inventory optimization | [LarrySnyder/stockpyl](https://github.com/LarrySnyder/stockpyl) | MIT |
| Orchestration | [apache/airflow](https://github.com/apache/airflow) | Apache-2.0 |
| ERP | ERPNext or Odoo | GPL / LGPL |

### Wiring
```python
# Daily Airflow DAG
from prophet import Prophet
import stockpyl

@dag(schedule="0 2 * * *")  # 2am daily
def demand_forecast_reorder():
    
    @task
    def fetch_sales_data():
        return erpnext.get_sales_by_sku(days=365)
    
    @task
    def forecast_demand(sales_data):
        forecasts = {}
        for sku, history in sales_data.items():
            m = Prophet(seasonality_mode='multiplicative')
            m.fit(pd.DataFrame(history))
            future = m.make_future_dataframe(periods=30)
            forecast = m.predict(future)
            forecasts[sku] = forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(30)
        return forecasts
    
    @task
    def calculate_reorders(forecasts):
        reorders = []
        for sku, forecast in forecasts.items():
            current_stock = erpnext.get_stock(sku)
            lead_time = erpnext.get_supplier_lead_time(sku)
            
            rop = stockpyl.reorder_point(
                mean_demand=forecast['yhat'].mean(),
                std_demand=forecast['yhat'].std(),
                lead_time=lead_time,
                service_level=0.95
            )
            
            if current_stock <= rop:
                eoq = stockpyl.eoq(
                    demand=forecast['yhat'].sum(),
                    order_cost=erpnext.get_order_cost(sku),
                    holding_cost_rate=0.25
                )
                reorders.append({"sku": sku, "qty": eoq, "trigger": "rop"})
        return reorders
    
    @task
    def create_purchase_orders(reorders):
        for reorder in reorders:
            erpnext.create_po(reorder["sku"], reorder["qty"])
```

---

## P8 — Computer Vision Shelf Audit Agent

**Goal**: In-store shelf monitoring agent using vision models for planogram compliance and OOS detection  
**Time to POC**: 4–6 weeks | **License stack**: Apache-2.0

### Components
| Role | Repo | License |
|------|------|---------|
| Vision model inference | shelfops pattern (Gemma 4 / Claude Vision) | Apache-2.0 |
| Agent orchestration | LangGraph | MIT |
| Store data integration | ERPNext or custom POS | GPL / MIT |
| Alert routing | n8n or Zapier | Apache-2.0 / Commercial |

### Wiring
```python
# shelf_audit_agent.py
from langgraph.graph import StateGraph
import anthropic

client = anthropic.Anthropic()

@tool
def analyze_shelf_image(image_path: str, planogram_ref: str) -> dict:
    """Use Claude Vision to audit shelf against planogram"""
    with open(image_path, "rb") as f:
        image_data = base64.b64encode(f.read()).decode()
    
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": [
                {"type": "image", "source": {"type": "base64", "media_type": "image/jpeg", "data": image_data}},
                {"type": "text", "text": f"""
                Analyze this retail shelf photo against planogram reference: {planogram_ref}
                
                Report:
                1. Out-of-stock positions (list by shelf/position)
                2. Misplaced products
                3. Facing compliance issues
                4. Overall planogram compliance % (0-100)
                
                Return as JSON.
                """}
            ]
        }]
    )
    return json.loads(response.content[0].text)

@tool  
def create_replenishment_task(store_id: str, sku: str, shelf_position: str):
    """Alert store associate or trigger auto-reorder"""
    return task_management.create_task(
        store=store_id,
        type="replenishment",
        sku=sku,
        position=shelf_position,
        priority="high"
    )

# Run audit graph
graph = StateGraph(ShelfAuditState)
graph.add_node("capture", capture_shelf_image)
graph.add_node("analyze", analyze_shelf_image)
graph.add_node("alert", create_replenishment_task)
agent = graph.compile()
```

---

## Pattern Selection Guide

| Client Situation | Start With | Expand To |
|-----------------|------------|-----------|
| New e-commerce build | P1 (Shopping Assistant) + P5 (ACP) | P2 (Recommendations) |
| Existing Shopify/WooCommerce | P1 via Enthusiast Shopify connector | P6 (WhatsApp) |
| Inventory / supply chain pain | P7 (Demand Forecasting) + P3 (Inventory Agent) | P8 (Store CV) |
| Content / catalog issues | P4 (Catalog Enrichment) | P1 (Search) |
| LATAM market entry | P6 (WhatsApp Commerce) | P1 + P2 |
| Enterprise with ACP requirement | P5 (ACP endpoint) | P1 + P3 |

---
*See also: `agents/top.md` for full agent/tool inventory.*
