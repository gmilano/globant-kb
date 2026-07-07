# 🧩 Patrones de composición — Retail & Consumer AI

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Cada patrón tiene repos específicos, arquitectura y estimado de PoC.
> Última actualización: 2026-07-07

---

## Arquitectura base

```
[Plataforma vertical base (Medusa.js / Saleor / WooCommerce / Odoo)]
          ↓
[APIs REST / GraphQL / MCP]
          ↓
[Agente orquestador (LangGraph / CrewAI)]
     ↙           ↘
[Herramienta 1]  [Herramienta 2]    [Herramienta N]
(Gorse RecSys)  (tensor-house)    (CLIP visual search)
          ↓
[UI conversacional / WhatsApp / Storefront]
```

---

## Patrón 1: AI Shopping Advisor (Agentic Commerce)

**Inspiración**: NVIDIA Retail Shopping Assistant Blueprint

**Repos**:
- `NVIDIA-AI-Blueprints/retail-shopping-assistant` (Apache-2.0) — blueprint base
- `medusajs/medusa` (MIT) — backend commerce
- `gorse-io/gorse` (Apache-2.0) — recomendaciones personalizadas

**Arquitectura**:
```
User query
    ↓
LangGraph Orchestrator (Planner Agent)
    ├─→ Product Search Agent (Medusa catalog API + semantic search)
    ├─→ Recommendation Agent (Gorse REST API)
    ├─→ Visual Search Agent (CLIP embedding + vector DB)
    ├─→ Cart Agent (Medusa cart API)
    └─→ FAQ Agent (RAG sobre políticas de tienda)
```

**Código base**:
```python
from langgraph.graph import StateGraph, START, END
from langchain_anthropic import ChatAnthropic

llm = ChatAnthropic(model="claude-sonnet-5")

# Agente de búsqueda en catálogo Medusa
async def product_search_agent(state):
    query = state["user_query"]
    results = await medusa_client.products.search(query)
    return {"products": results, "step": "search_done"}

# Agente de recomendaciones Gorse
async def recommendation_agent(state):
    user_id = state["user_id"]
    resp = requests.get(f"http://gorse:8087/api/recommend/{user_id}?n=5")
    return {"recommendations": resp.json()}

# Construir grafo
graph = StateGraph(RetailState)
graph.add_node("planner", planner_agent)
graph.add_node("search", product_search_agent)
graph.add_node("recommend", recommendation_agent)
graph.add_edge(START, "planner")
graph.add_conditional_edges("planner", route_intent)
```

**PoC estimado**: 2-3 semanas
**ROI esperado**: +15-25% en conversión; reducción 60% en tiempo de decisión

---

## Patrón 2: Motor de Recomendaciones en Producción

**Repos**:
- `gorse-io/gorse` (Apache-2.0) — motor de recomendación
- `saleor/saleor` (BSD-3-Clause) — plataforma ecommerce
- `recommenders-team/recommenders` (MIT) — algoritmos avanzados (offline training)

**Docker Compose** (para PoC):
```yaml
version: "3"
services:
  gorse-master:
    image: zhenghaoz/gorse-master:nightly
    ports: ["8086:8086", "8088:8088"]
  
  gorse-worker:
    image: zhenghaoz/gorse-worker:nightly
    command: --master-host gorse-master --master-port 8086
  
  gorse-server:
    image: zhenghaoz/gorse-server:nightly
    ports: ["8087:8087"]
    command: --master-host gorse-master --master-port 8086
  
  saleor-api:
    image: ghcr.io/saleor/saleor:latest
    environment:
      RECOMMENDATION_API: http://gorse-server:8087
```

**Python: enviar feedback a Gorse**:
```python
import httpx

async def track_purchase(user_id: str, item_id: str):
    async with httpx.AsyncClient() as client:
        await client.post("http://gorse:8087/api/feedback", json=[{
            "FeedbackType": "purchase",
            "UserId": user_id,
            "ItemId": item_id,
            "Timestamp": "now"
        }])
```

**PoC estimado**: 1-2 semanas
**ROI esperado**: 20-35% de GMV adicional via recomendaciones

---

## Patrón 3: AI Customer Support con RAG Multi-Agente

**Repos**:
- `unicamp-dl/retailGPT` (MIT) — RAG sobre catálogo
- `ro-anderson/multi-agent-rag-customer-support` (MIT) — multi-agent routing

**Arquitectura**:
```
Cliente pregunta (chat widget / WhatsApp / email)
    ↓
Intent Classifier Agent
    ├─→ [Producto]    → Product RAG Agent (catálogo vectorizado)
    ├─→ [Pedido]      → Order Status Agent (API ecommerce → respuesta)
    ├─→ [Devolución]  → Policy RAG Agent (políticas de tienda)
    └─→ [Complejo]    → Escalate to Human (CRM ticket)
```

**Setup RAG**:
```python
from langchain_community.vectorstores import Chroma
from langchain_anthropic import ChatAnthropic
from langchain.chains import RetrievalQA

def index_catalog(products: list[dict]):
    docs = [
        Document(
            page_content=f"{p['name']}: {p['description']}. Precio: {p['price']}",
            metadata={"id": p["id"], "category": p["category"]}
        )
        for p in products
    ]
    return Chroma.from_documents(docs, embeddings)

llm = ChatAnthropic(model="claude-sonnet-5")
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vectorstore.as_retriever(search_kwargs={"k": 5}),
    chain_type="stuff"
)
```

**PoC estimado**: 2-3 semanas | **ROI**: -40% tickets; +30% CSAT

---

## Patrón 4: Dynamic Pricing Agent (RL-based)

**Repos**:
- `ikatsov/tensor-house` (MIT) — DQN pricing notebooks
- `odoo/odoo` (LGPL-3.0) — ERP fuente de precios

**Código base**:
```python
import torch
import torch.nn as nn
import xmlrpc.client

class PricingDQN(nn.Module):
    def __init__(self, state_dim=8, action_dim=3):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(state_dim, 64), nn.ReLU(),
            nn.Linear(64, 32), nn.ReLU(),
            nn.Linear(32, action_dim)
        )
    
    def forward(self, x):
        return self.net(x)

def get_pricing_action(model, state):
    state_tensor = torch.FloatTensor(state).unsqueeze(0)
    with torch.no_grad():
        q_values = model(state_tensor)
    actions = ["increase_5pct", "maintain", "decrease_5pct"]
    return actions[q_values.argmax().item()]

# Actualizar precio via Odoo RPC
def update_odoo_price(product_id: int, new_price: float, odoo_url: str, db: str, uid: int, pwd: str):
    models = xmlrpc.client.ServerProxy(f"{odoo_url}/xmlrpc/2/object")
    models.execute_kw(db, uid, pwd, "product.template", "write",
                      [[product_id], {"list_price": new_price}])
```

**PoC estimado**: 4-6 semanas | **ROI**: +5-15% en margen

---

## Patrón 5: Visual Search para Fashion/Decoración

**Repos**:
- `openai/CLIP` (MIT) — embeddings imagen+texto
- `medusajs/medusa` (MIT) — plataforma ecommerce

```python
import clip, torch
from PIL import Image

model, preprocess = clip.load("ViT-B/32")

def index_product_image(product_id: str, image_url: str):
    img = preprocess(Image.open(requests.get(image_url, stream=True).raw)).unsqueeze(0)
    with torch.no_grad():
        embedding = model.encode_image(img).numpy().tolist()[0]
    chroma.get_or_create_collection("products").add(
        embeddings=[embedding], ids=[product_id],
        metadatas=[{"product_id": product_id}]
    )

def visual_search(user_image_path: str, n_results: int = 10):
    img = preprocess(Image.open(user_image_path)).unsqueeze(0)
    with torch.no_grad():
        query_embedding = model.encode_image(img).numpy().tolist()[0]
    return chroma.get_collection("products").query(
        query_embeddings=[query_embedding], n_results=n_results
    )["ids"][0]
```

**PoC estimado**: 2-3 semanas | **ROI**: +20-30% en descubrimiento de productos

---

## Patrón 6: WhatsApp Commerce Agent (LATAM)

**Repos**:
- `medusajs/medusa` (MIT) — backend commerce
- LangGraph (MIT) — orquestación del agente
- Twilio WhatsApp Business API — canal

```python
from fastapi import FastAPI
from langgraph.prebuilt import create_react_agent
from langchain_anthropic import ChatAnthropic

app = FastAPI()
llm = ChatAnthropic(model="claude-sonnet-5")
tools = [search_catalog_tool, add_to_cart_tool, get_order_tool, generate_payment_link_tool]
agent = create_react_agent(llm, tools)

@app.post("/webhook/whatsapp")
async def whatsapp_webhook(data: dict):
    message = data["Body"]
    user_id = data["From"]
    response = await agent.ainvoke({
        "messages": [{"role": "user", "content": message}],
        "user_id": user_id
    })
    await send_whatsapp_message(user_id, response["messages"][-1]["content"])
    return {"status": "ok"}
```

**PoC estimado**: 3-4 semanas | **ROI**: +40% conversión vs. chat manual; 24/7 sin agentes humanos

---

## Patrón 7: UCP-Compliant Agentic Commerce

**Objetivo**: Hacer que el catálogo sea accesible por ChatGPT, Perplexity, Google AI Mode.

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/.well-known/ucp-manifest.json")
async def ucp_manifest():
    return {
        "version": "1.0",
        "catalog_url": "/ucp/catalog",
        "cart_url": "/ucp/cart",
        "checkout_url": "/ucp/checkout",
        "currency": "USD",
        "locale": "en-US"
    }

@app.get("/ucp/catalog")
async def ucp_catalog_search(q: str = "", limit: int = 10):
    results = await medusa_client.products.search(q=q, limit=limit)
    return {
        "products": [{
            "id": p.id,
            "name": p.title,
            "price": p.variants[0].prices[0].amount / 100,
            "image_url": p.images[0].url if p.images else None,
            "url": f"https://mystore.com/products/{p.handle}"
        } for p in results.products]
    }

@app.post("/ucp/cart")
async def ucp_add_to_cart(product_id: str, variant_id: str, quantity: int = 1):
    cart = await medusa_client.carts.create()
    await medusa_client.carts.line_items.create(cart.id, {
        "variant_id": variant_id, "quantity": quantity
    })
    return {"cart_id": cart.id, "checkout_url": f"/ucp/checkout/{cart.id}"}
```

**PoC estimado**: 1-2 semanas | **ROI**: Nuevo canal de tráfico orgánico desde AI agents externos

---

## Patrón 8: Shelf Intelligence con Visión Computacional

**Repos**:
- `IFAKA/shelfops` (MIT) — demo shelf audit
- Claude Vision / Gemma 4 / GPT-4V — vision LLM

```python
import anthropic, base64
from pathlib import Path

client = anthropic.Anthropic()

def audit_shelf(image_path: str) -> dict:
    image_data = base64.standard_b64encode(Path(image_path).read_bytes()).decode()
    
    message = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": [
                {"type": "image", "source": {
                    "type": "base64", "media_type": "image/jpeg", "data": image_data
                }},
                {"type": "text", "text": (
                    "Analiza esta imagen de estantería retail. Identifica:\n"
                    "1. Posiciones con stock-out (huecos vacíos)\n"
                    "2. Productos fuera de posición vs. planograma\n"
                    "3. Facings insuficientes (<2 unidades visibles)\n"
                    "Responde SOLO con JSON: {\"stockouts\": [], \"misplaced\": [], \"low_facings\": []}"
                )}
            ]
        }]
    )
    
    import json
    return json.loads(message.content[0].text)

# Ejecutar auditoría
alerts = audit_shelf("gondola_001_15h30.jpg")
if alerts["stockouts"]:
    notify_replenishment_team(alerts)
```

**PoC estimado**: 2-3 semanas (con cámara IP existente)
**ROI esperado**: -15-25% pérdida de ventas por OOS; -30% tiempo de auditoría manual

---
*Actualizado por el pipeline de ingest — recetas con repos reales y código funcional.*
