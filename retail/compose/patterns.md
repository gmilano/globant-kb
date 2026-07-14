# 🧩 Patrones de composición — Retail & Consumer

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-14 (v10)

## Arquitectura base

```
[Plataforma vertical base (Medusa / WooCommerce / Bagisto / ERPNext)]
          ↓
[MCP Server / REST API / pgvector RAG layer]
          ↓
[Agentes especializados Retail (pricing / inventory / CX / shelf)]
          ↓
[Protocolos: ACP (ChatGPT) + UCP (Google AI) + WhatsApp (LATAM)]
          ↓
[UI conversacional / app / WhatsApp / voz]
```

---

## P1 — Asistente de Ventas Conversacional (Medusa + LangGraph + ACP)

**Caso de uso**: Retailer quiere que ChatGPT pueda vender sus productos directamente.
**Stack**: medusajs/medusa + medusa-mcp + LangGraph + ACP endpoint

```python
# Patrón P1: Medusa + MCP + LangGraph agent de ventas
from langchain_anthropic import ChatAnthropic
from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated
import operator

class SalesState(TypedDict):
    messages: Annotated[list, operator.add]
    cart: list
    user_id: str
    stage: str  # discovery | product_detail | checkout | confirmation

llm = ChatAnthropic(model="claude-sonnet-5")

# Tools via Medusa MCP server (expone: buscar_productos, add_to_cart, checkout)
from mcp import MCPClient
medusa_tools = MCPClient("http://localhost:3000/mcp").get_tools()

def discovery_agent(state: SalesState):
    """Entiende intención de compra y busca productos relevantes"""
    response = llm.invoke(state["messages"], tools=medusa_tools)
    return {"messages": [response], "stage": "product_detail"}

def checkout_agent(state: SalesState):
    """Procesa pago via ACP (Stripe/OpenAI Agentic Commerce Protocol)"""
    # ACP endpoint expuesto en /api/acp/checkout
    # Compatible con ChatGPT Shopping Plugin
    import httpx
    result = httpx.post("https://store.client.com/api/acp/checkout", json={
        "cart": state["cart"],
        "user_id": state["user_id"],
        "payment_methods": ["stripe", "paypal", "pix"]  # LATAM: incluir Pix
    })
    return {"messages": [{"role": "assistant", "content": f"Orden creada: {result.json()['order_id']}"}]}

# Build graph
graph = StateGraph(SalesState)
graph.add_node("discovery", discovery_agent)
graph.add_node("checkout", checkout_agent)
graph.add_edge("discovery", "checkout")
graph.add_edge("checkout", END)
sales_agent = graph.compile()
```

**Tiempo de implementación**: 3-4 sprints
**ROI esperado**: +15-25% conversión vs carrito web tradicional (reducción fricción checkout)

---

## P2 — Pricing Dinámico Agentico (retail-pricing-agent-ai + LangChain)

**Caso de uso**: Optimización automática de precios por producto basada en competencia, demanda e inventario.
**Stack**: samhaldia/retail-pricing-agent-ai + LangChain + Amazon Bedrock / Anthropic Claude

```python
# Patrón P2: Pipeline de pricing agentico
from langchain_anthropic import ChatAnthropic
from langchain.tools import tool
import pandas as pd

llm = ChatAnthropic(model="claude-sonnet-5")

@tool
def get_competitor_prices(product_id: str) -> dict:
    """Obtiene precios de competidores via scraping / API pricing intelligence"""
    return {"amazon": 29.99, "mercadolibre": 31.50, "falabella": 28.90}

@tool
def get_demand_forecast(product_id: str, days: int = 7) -> dict:
    """Predice demanda con modelo ARIMA/LSTM para próximos N días"""
    return {"predicted_units": 145, "confidence": 0.87, "trend": "increasing"}

@tool
def get_current_inventory(product_id: str) -> dict:
    """Consulta inventario actual en tiempo real"""
    return {"units_in_stock": 23, "reorder_point": 50, "days_of_stock": 4}

@tool
def update_product_price(product_id: str, new_price: float, reason: str) -> bool:
    """Actualiza precio en plataforma ecommerce via API"""
    print(f"Precio {product_id} → ${new_price} | Razón: {reason}")
    return True

tools = [get_competitor_prices, get_demand_forecast, get_current_inventory, update_product_price]

PRICING_PROMPT = """Eres un agente experto en pricing retail.
Para el producto {product_id}:
1. Analiza precios de competidores
2. Evalúa demanda forecast y nivel de inventario
3. Determina el precio óptimo (considera: margen mínimo 30%, competitividad, urgencia de clearance)
4. Actualiza el precio con justificación clara
No hagas descuentos >25% sin justificación de exceso de inventario crítico."""

from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_core.prompts import ChatPromptTemplate

prompt = ChatPromptTemplate.from_messages([
    ("system", PRICING_PROMPT),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}")
])

agent = create_tool_calling_agent(llm, tools, prompt)
pricing_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

def run_pricing_cycle(products: list):
    for product_id in products:
        result = pricing_executor.invoke({
            "product_id": product_id,
            "input": f"Optimiza el precio del producto {product_id}"
        })
        print(result["output"])

import schedule
schedule.every(4).hours.do(run_pricing_cycle, products=["SKU001", "SKU002"])
```

**Tiempo de implementación**: 2-3 sprints
**ROI esperado**: +3-8% margen bruto, reducción de 40% en tiempo de clearance de stock

---

## P3 — Shelf Audit con Computer Vision + LLM (shelfops + YOLOv8)

**Caso de uso**: Auditoría automática de góndolas de supermercado sin personal humano.
**Stack**: IFAKA/shelfops + albertferre/shelf-product-identifier (YOLOv8) + LLM para reporte

```python
# Patrón P3: Computer Vision + LLM para shelf audit
import cv2
from ultralytics import YOLO
from anthropic import Anthropic
import base64

model = YOLO("shelf-audit-yolov8.pt")
client = Anthropic()

def analyze_shelf_image(image_path: str, planogram: dict) -> dict:
    results = model(image_path)
    detected_skus = {}
    for box in results[0].boxes:
        sku_id = model.names[int(box.cls)]
        facing_count = detected_skus.get(sku_id, 0) + 1
        detected_skus[sku_id] = facing_count
    
    missing_skus = []
    low_facing = []
    for sku, expected_facings in planogram.items():
        actual = detected_skus.get(sku, 0)
        if actual == 0:
            missing_skus.append(sku)
        elif actual < expected_facings * 0.7:
            low_facing.append({"sku": sku, "expected": expected_facings, "actual": actual})
    
    with open(image_path, "rb") as f:
        image_b64 = base64.b64encode(f.read()).decode()
    
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=500,
        messages=[{
            "role": "user",
            "content": [
                {"type": "image", "source": {"type": "base64", "media_type": "image/jpeg", "data": image_b64}},
                {"type": "text", "text": f"""Analiza esta imagen de góndola retail.
Productos faltantes (OSA): {missing_skus}
Productos con bajo facing: {low_facing}
Genera un reporte de 3 acciones prioritarias para el reposicionador."""}
            ]
        }]
    )
    
    return {
        "detected": detected_skus,
        "missing": missing_skus,
        "low_facing": low_facing,
        "action_report": response.content[0].text
    }
```

**Tiempo de implementación**: 4-5 sprints (incluye fine-tuning del modelo con SKUs del cliente)
**ROI esperado**: Reducción de 60-70% en tiempo de audit manual + reducción de 8% de ventas perdidas por OSA

---

## P4 — WhatsApp Commerce Agent LATAM (Medusa + WhatsApp Business API)

**Caso de uso**: Agente de ventas completo en WhatsApp para clientes LATAM sin app nativa.
**Stack**: medusajs/medusa + WhatsApp Business API (Meta) + LangGraph + Pix/OXXO/PSE

```python
# Patrón P4: WhatsApp Commerce Agent (Patrón dominante LATAM)
from fastapi import FastAPI, Request
import httpx
from langchain_anthropic import ChatAnthropic
from langchain.tools import tool

app = FastAPI()
llm = ChatAnthropic(model="claude-haiku-4-5-20251001")  # Haiku para bajo costo + velocidad

@tool
def buscar_productos(query: str, max_results: int = 5) -> list:
    """Busca productos en el catálogo via Medusa API + pgvector semántico"""
    response = httpx.get(f"http://medusa:9000/store/products", params={"q": query, "limit": max_results})
    return response.json()["products"]

@tool  
def agregar_al_carrito(product_id: str, quantity: int, cart_id: str) -> dict:
    """Agrega producto al carrito de compras"""
    response = httpx.post(f"http://medusa:9000/store/carts/{cart_id}/line-items",
                          json={"variant_id": product_id, "quantity": quantity})
    return response.json()

@tool
def iniciar_pago_pix(cart_id: str, customer_phone: str) -> dict:
    """Genera QR code Pix para pago (Brasil). Similar para OXXO (México) o PSE (Colombia)"""
    response = httpx.post("http://payments/pix/create", json={
        "cart_id": cart_id,
        "customer_phone": customer_phone,
        "webhook_url": f"https://api.client.com/webhooks/pix/{cart_id}"
    })
    return {"pix_code": response.json()["code"], "qr_image_url": response.json()["qr_url"]}

@app.post("/webhook/whatsapp")
async def whatsapp_webhook(request: Request):
    data = await request.json()
    message = data["entry"][0]["changes"][0]["value"]["messages"][0]
    phone = message["from"]
    text = message["text"]["body"]
    session = get_or_create_session(phone)
    agent_response = sales_agent.invoke({
        "messages": session.history + [{"role": "user", "content": text}],
        "phone": phone,
        "cart_id": session.cart_id
    })
    send_whatsapp_message(phone, agent_response["messages"][-1]["content"])
    return {"status": "ok"}
```

**Tiempo de implementación**: 2-3 sprints (con WhatsApp Business API ya aprobada)
**ROI esperado**: Conversión 3-4x vs web tradicional para PYME. Costo de implementación $15k-30k vs app nativa $100k+.

---

## P5 — Autonomous Inventory Replenishment (stockpyl + LangGraph + ERPNext)

**Caso de uso**: Sistema que ordena stock automáticamente cuando detecta nivel crítico.
**Stack**: LarrySnyder/stockpyl + LangGraph + ERPNext REST API + email/WhatsApp para aprobación

```python
# Patrón P5: Reabastecimiento autónomo con HITL
from stockpyl.supply_chain_node import SupplyChainNode
from langgraph.graph import StateGraph, END, interrupt
import anthropic

client = anthropic.Anthropic()

def calculate_reorder_point(sku_id: str, lead_time_days: int = 7) -> dict:
    node = SupplyChainNode(
        echelon=0,
        demand_source=get_demand_distribution(sku_id),
        lead_time=lead_time_days,
        holding_cost=0.20,
        stockout_cost=5.0
    )
    rop, safety_stock = node.reorder_point()
    return {"reorder_point": rop, "safety_stock": safety_stock, "sku": sku_id}

def monitor_inventory(state):
    low_stock_items = []
    for sku in state["active_skus"]:
        current = get_current_stock(sku)
        params = calculate_reorder_point(sku)
        if current <= params["reorder_point"]:
            order_qty = calculate_eoq(sku)
            low_stock_items.append({"sku": sku, "current": current, 
                "reorder_point": params["reorder_point"], "suggested_order": order_qty})
    return {"low_stock": low_stock_items}

def generate_purchase_order(state):
    if not state["low_stock"]:
        return {"po": None}
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=800,
        messages=[{"role": "user", "content": f"""
Genera una orden de compra para estos productos con stock crítico:
{state['low_stock']}
Incluye: 1. Justificación de cantidad sugerida (EOQ + safety stock)
2. Proveedor preferido según historial de precios
3. Fecha de entrega requerida (lead time + 20% buffer)
Formato: tabla con SKU, cantidad, proveedor, precio estimado, urgencia.
"""}]
    )
    return {"po_draft": response.content[0].text}

def human_approval(state):
    send_notification(state["buyer_contact"], {
        "type": "po_approval_required",
        "draft": state["po_draft"],
        "approve_url": f"https://internal.client.com/approve-po/{state['po_id']}"
    })
    approval = interrupt("Esperando aprobación del comprador...")
    return {"approved": approval["approved"]}

def send_purchase_order(state):
    if not state["approved"]:
        return {"status": "cancelled"}
    erpnext_api.create_purchase_order(state["po_draft"])
    return {"status": "submitted"}

graph = StateGraph(dict)
graph.add_node("monitor", monitor_inventory)
graph.add_node("generate_po", generate_purchase_order)
graph.add_node("approve", human_approval)
graph.add_node("submit", send_purchase_order)
graph.set_entry_point("monitor")
graph.add_edge("monitor", "generate_po")
graph.add_edge("generate_po", "approve")
graph.add_edge("approve", "submit")
graph.add_edge("submit", END)
replenishment_agent = graph.compile(checkpointer=MemorySaver(), interrupt_before=["approve"])
```

**Tiempo de implementación**: 3-4 sprints
**ROI esperado**: Reducción 20-30% stockouts + 15-20% exceso inventario. ROI positivo en <3 meses típicamente.

---

## P6 — RAG Catalog Search + Product Assistant (retailGPT + Medusa + pgvector)

**Caso de uso**: Búsqueda semántica sobre catálogo propio + asistente de ventas conversacional.
**Stack**: unicamp-dl/retailGPT (patrón) + Medusa + pgvector + sentence-transformers

```python
# Patrón P6: RAG sobre catálogo de productos
import anthropic
import psycopg2
from sentence_transformers import SentenceTransformer

client = anthropic.Anthropic()
embed_model = SentenceTransformer("all-MiniLM-L6-v2")

def embed_product_catalog(products: list) -> None:
    conn = psycopg2.connect("postgresql://medusa:5432/medusa")
    cur = conn.cursor()
    for product in products:
        text = f"{product['title']} {product['description']} {' '.join(product['tags'])}"
        embedding = embed_model.encode(text)
        cur.execute("""
            INSERT INTO product_embeddings (product_id, embedding, metadata)
            VALUES (%s, %s, %s)
            ON CONFLICT (product_id) DO UPDATE SET embedding = EXCLUDED.embedding
        """, (product["id"], embedding.tolist(), {"title": product["title"], "price": product["price"]}))
    conn.commit()

def search_products_semantic(query: str, top_k: int = 5) -> list:
    query_embedding = embed_model.encode(query)
    conn = psycopg2.connect("postgresql://medusa:5432/medusa")
    cur = conn.cursor()
    cur.execute("""
        SELECT product_id, metadata, 1 - (embedding <=> %s::vector) AS similarity
        FROM product_embeddings
        ORDER BY embedding <=> %s::vector
        LIMIT %s
    """, (query_embedding.tolist(), query_embedding.tolist(), top_k))
    return [{"id": row[0], "metadata": row[1], "similarity": row[2]} for row in cur.fetchall()]

def product_assistant(user_query: str, conversation_history: list) -> str:
    relevant_products = search_products_semantic(user_query)
    context = "\n".join([f"- {p['metadata']['title']}: ${p['metadata']['price']}" 
                          for p in relevant_products])
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=400,
        system=f"""Eres un asistente de ventas amable y experto.
Productos disponibles relevantes para la consulta del usuario:
{context}
Recomienda el producto más adecuado, explica por qué, y ofrece agregar al carrito.
Sé conciso. Máximo 3 párrafos.""",
        messages=conversation_history + [{"role": "user", "content": user_query}]
    )
    return response.content[0].text
```

**Tiempo de implementación**: 2-3 sprints
**ROI esperado**: Aumento 20-35% en descubrimiento de productos de larga cola + reducción 40% en preguntas de soporte repetitivas.

---

## P7 — UCP/ACP Protocol Gateway (Medusa + UCP SDK + ACP)

**Caso de uso**: Hacer que los productos del retailer sean accesibles desde Google AI Mode y ChatGPT Shopping.
**Stack**: Medusa + UCP spec (ucp.dev) + ACP (Stripe) + structured product data

```python
# Patrón P7: UCP + ACP dual-protocol gateway
from fastapi import FastAPI
from pydantic import BaseModel
import httpx

app = FastAPI()

@app.get("/ucp/catalog")
async def ucp_product_catalog(query: str, limit: int = 10):
    products = await search_medusa_products(query, limit)
    return {
        "products": [{
            "id": p["id"],
            "name": p["title"],
            "description": p["description"],
            "price": {"amount": p["price"], "currency": "USD"},
            "availability": "in_stock" if p["inventory_quantity"] > 0 else "out_of_stock",
            "images": [img["url"] for img in p["images"]],
            "url": f"https://store.client.com/products/{p['handle']}",
            "attributes": p.get("metadata", {}),
        } for p in products]
    }

@app.post("/ucp/checkout")
async def ucp_checkout(cart: dict):
    medusa_cart = await create_medusa_cart(cart["items"])
    return {
        "checkout_url": f"https://store.client.com/checkout/{medusa_cart['id']}",
        "order_id": medusa_cart["id"],
        "status": "pending"
    }

@app.post("/acp/buy")
async def acp_checkout(order: dict):
    stripe_session = await create_stripe_acp_session(order)
    return {
        "payment_url": stripe_session["url"],
        "session_id": stripe_session["id"],
        "expires_at": stripe_session["expires_at"]
    }

@app.get("/mcp/tools")
async def mcp_tool_manifest():
    return {
        "tools": [
            {"name": "search_products", "description": "Busca productos en el catálogo"},
            {"name": "get_product_details", "description": "Obtiene detalles de un producto"},
            {"name": "add_to_cart", "description": "Agrega producto al carrito"},
            {"name": "get_cart", "description": "Obtiene el estado del carrito"},
            {"name": "checkout", "description": "Procesa el pago"}
        ]
    }
```

**Tiempo de implementación**: 2-3 sprints
**ROI esperado**: Visibilidad en ChatGPT Shopping y Google AI Mode. Tráfico AI convierte +42% vs búsqueda orgánica.

---

## P8 — AI Personalization Engine (LLMSearchRecommender + Medusa)

**Caso de uso**: Recomendaciones 1:1 personalizadas para cada usuario basadas en comportamiento y preferencias.
**Stack**: alopatenko/LLMSearchRecommender (investigación) + Medusa + two-tower model + LLM re-ranker

```python
# Patrón P8: Personalización 1:1 con LLM re-ranking
# Inspirado en Pinterest (Feb 2026) y Netflix (Mar 2025) production approaches
from anthropic import Anthropic

client = Anthropic()

def personalized_recommendations(user_id: str, context: str = "homepage", top_n: int = 10) -> list:
    # Stage 1: Recall con two-tower embeddings
    user_embedding = get_user_embedding(user_id)
    candidates = ann_search(user_embedding, k=100)
    
    # Stage 2: LLM re-ranking
    user_profile = get_user_profile(user_id)
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=600,
        messages=[{"role": "user", "content": f"""
Usuario: {user_profile}
Contexto: {context}
Candidatos ({len(candidates)} productos): {candidates[:20]}

Selecciona y ordena los 10 productos más relevantes para este usuario específico.
Considera: historial de compras, preferencias de precio, categorías de interés.
Para cada producto seleccionado, escribe una línea de explicación personalizada (max 15 palabras).
Formato: [{{"product_id": "...", "reason": "..."}}]
"""}]
    )
    recommendations = parse_llm_recommendations(response.content[0].text)
    return recommendations[:top_n]

def ab_test_recommendations(user_id: str) -> list:
    if hash(user_id) % 2 == 0:
        return personalized_recommendations(user_id)
    else:
        return collaborative_filtering_recommendations(user_id)
```

**Tiempo de implementación**: 4-6 sprints (incluye entrenamiento two-tower)
**ROI esperado**: +15-30% CTR en recomendaciones. Pinterest reporta +20% engagement con LLM re-ranking (Feb 2026).

---

## P9 — Chatbot Soporte Post-Venta (LangGraph + Medusa API + HITL)

**Caso de uso**: Agente que maneja tracking, devoluciones y reclamos sin intervención humana (salvo casos complejos).
**Stack**: LangGraph + Medusa order API + correo/WhatsApp

```python
# Patrón P9: Agente soporte post-venta con HITL para casos complejos
from langchain_anthropic import ChatAnthropic
from langchain.tools import tool
from langgraph.graph import StateGraph, END, interrupt

llm = ChatAnthropic(model="claude-haiku-4-5-20251001")

@tool
def get_order_status(order_id: str) -> dict:
    response = httpx.get(f"http://medusa:9000/admin/orders/{order_id}")
    return response.json()

@tool
def initiate_return(order_id: str, item_ids: list, reason: str) -> dict:
    response = httpx.post(f"http://medusa:9000/admin/returns", json={
        "order_id": order_id, "items": item_ids, "reason": reason
    })
    return response.json()

@tool
def issue_store_credit(customer_id: str, amount: float, reason: str) -> dict:
    response = httpx.post(f"http://medusa:9000/admin/customers/{customer_id}/store-credit",
                          json={"amount": amount, "note": reason})
    return response.json()

def support_agent(state):
    if state["escalation_needed"]:
        return interrupt("Caso complejo — escalando a agente humano")
    response = llm.invoke(state["messages"], tools=[get_order_status, initiate_return, issue_store_credit])
    complexity = assess_complexity(response)
    return {"messages": [response], "escalation_needed": complexity > 0.8}

graph = StateGraph(dict)
graph.add_node("support", support_agent)
graph.add_edge("support", END)
support_bot = graph.compile(checkpointer=MemorySaver(), interrupt_before=["escalation"])
```

**Tiempo de implementación**: 2-3 sprints
**ROI esperado**: 60-70% de tickets resueltos sin intervención humana. Klarna (referencia): reemplazó 700 agentes manteniendo NPS.

---

## P10 — WooCommerce AI Extension Suite (WooCommerce + Claude + LangChain)

**Caso de uso**: Añadir AI a una tienda WooCommerce existente sin migrar de plataforma.
**Stack**: WooCommerce REST API + Python middleware + Claude + LangChain

```python
# Patrón P10: AI layer sobre WooCommerce existente (patrón para clientes LATAM)
import woocommerce
from anthropic import Anthropic

wcapi = woocommerce.API(
    url="https://tienda.cliente.com",
    consumer_key="ck_xxx",
    consumer_secret="cs_xxx",
    version="wc/v3"
)
client = Anthropic()

def generate_product_description(product_id: int) -> str:
    product = wcapi.get(f"products/{product_id}").json()
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=600,
        messages=[{"role": "user", "content": f"""
Producto: {product['name']}
Datos actuales: {product.get('description', 'sin descripción')}
Precio: ${product['price']}
Categorías: {[c['name'] for c in product['categories']]}

Genera:
1. Descripción atractiva (150 palabras) para página de producto
2. Meta description (160 chars) para SEO
3. 5 bullet points de beneficios clave
Tono: amigable, concreto, orientado a beneficios. No usar jerga técnica.
"""}]
    )
    return response.content[0].text

def auto_optimize_catalog(batch_size: int = 50):
    page = 1
    while True:
        products = wcapi.get("products", params={"page": page, "per_page": batch_size}).json()
        if not products:
            break
        for product in products:
            if len(product.get("description", "")) < 100:
                new_description = generate_product_description(product["id"])
                wcapi.put(f"products/{product['id']}", data={"description": new_description})
                print(f"Optimizado: {product['name']}")
        page += 1

auto_optimize_catalog()
```

**Tiempo de implementación**: 1-2 sprints
**ROI esperado**: +15-25% conversión de páginas de producto con descripciones optimizadas. +10-20% posicionamiento SEO orgánico.

---

## Matriz de selección de patrón

| Si el cliente necesita... | Usar patrón |
|--------------------------|-------------|
| Vender en ChatGPT / Google AI Mode | P7 (UCP/ACP Gateway) |
| Chatbot de ventas en WhatsApp (LATAM) | P4 (WhatsApp Commerce) |
| Tienda nueva desde cero | P1 (Medusa + LangGraph) |
| Añadir AI a WooCommerce existente | P10 (WooCommerce AI Layer) |
| Optimizar precios automáticamente | P2 (Pricing Agentico) |
| Auditoría de góndolas en supermercado | P3 (Shelf Audit CV) |
| Eliminar stockouts con reabastecimiento auto | P5 (Autonomous Replenishment) |
| Búsqueda semántica en catálogo propio | P6 (RAG Catalog) |
| Personalización 1:1 de recomendaciones | P8 (Personalization Engine) |
| Automatizar soporte post-venta | P9 (Support Bot HITL) |

---
*Actualizado automáticamente por el pipeline de ingest.*
