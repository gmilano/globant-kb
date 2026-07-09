# 🧩 Patrones de composición — Retail & E-Commerce AI

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-08 (v7 — segunda pasada, +2 patrones)

## Arquitectura base

```
[Plataforma vertical (Medusa / WooCommerce / Odoo)]
          ↓ MCP / REST / GraphQL
[Capa de orquestación AI (LangGraph / Claude MCP)]
          ↓
[Agentes especializados: Gorse / NVIDIA Blueprints / Skyvern]
          ↓
[UI conversacional / WhatsApp / Agentic Checkout (UCP)]
```

---

## Patrón 1 — AI Shopping Assistant con Medusa + LangGraph + Gorse

**Caso de uso**: Asistente de compras conversacional que recomienda productos, responde preguntas y completa el carrito.

**Stack**:
- [medusajs/medusa](https://github.com/medusajs/medusa) (MIT, 31k★) — backend de comercio
- [gorse-io/gorse](https://github.com/gorse-io/gorse) (Apache-2.0, 9.7k★) — motor de recomendación
- [NVIDIA-AI-Blueprints/retail-shopping-assistant](https://github.com/NVIDIA-AI-Blueprints/retail-shopping-assistant) (Apache-2.0) — patrón de referencia
- Claude Sonnet 5 via API Anthropic — LLM del agente

**Tiempo estimado**: 4-6 semanas | **Deal size LATAM**: $100k-300k

```python
from anthropic import Anthropic
import requests

client = Anthropic()
MEDUSA_URL = "http://localhost:9000"
GORSE_URL = "http://localhost:8088"

def get_recommendations(user_id: str, n: int = 5) -> list:
    """Obtiene recomendaciones de Gorse para el usuario."""
    resp = requests.get(f"{GORSE_URL}/api/recommend/{user_id}?n={n}")
    return resp.json()

def search_products(query: str) -> list:
    """Busca productos en Medusa."""
    resp = requests.get(f"{MEDUSA_URL}/store/products?q={query}&limit=5")
    return resp.json().get("products", [])

def add_to_cart(cart_id: str, variant_id: str, quantity: int = 1) -> dict:
    """Añade producto al carrito de Medusa."""
    resp = requests.post(
        f"{MEDUSA_URL}/store/carts/{cart_id}/line-items",
        json={"variant_id": variant_id, "quantity": quantity}
    )
    return resp.json()

tools = [
    {"name": "search_products", "description": "Busca productos por texto",
     "input_schema": {"type": "object", "properties": {
         "query": {"type": "string", "description": "Texto de búsqueda"}},
         "required": ["query"]}},
    {"name": "get_recommendations", "description": "Obtiene recomendaciones personalizadas",
     "input_schema": {"type": "object", "properties": {
         "user_id": {"type": "string"}, "n": {"type": "integer", "default": 5}},
         "required": ["user_id"]}},
    {"name": "add_to_cart", "description": "Añade producto al carrito",
     "input_schema": {"type": "object", "properties": {
         "cart_id": {"type": "string"}, "variant_id": {"type": "string"},
         "quantity": {"type": "integer", "default": 1}},
         "required": ["cart_id", "variant_id"]}}
]

def shopping_agent(user_message: str, user_id: str, cart_id: str):
    messages = [{"role": "user", "content": user_message}]
    system = f"""Eres un asistente de compras experto. Tienes acceso a:
    - Búsqueda de productos en el catálogo
    - Recomendaciones personalizadas para el usuario {user_id}
    - Carrito de compras {cart_id}
    Responde en español, sé conciso y útil."""

    while True:
        response = client.messages.create(
            model="claude-sonnet-5",
            max_tokens=1024,
            system=system,
            tools=tools,
            messages=messages
        )
        if response.stop_reason == "end_turn":
            return response.content[0].text
        # procesar tool calls
        for block in response.content:
            if block.type == "tool_use":
                if block.name == "search_products":
                    result = search_products(block.input["query"])
                elif block.name == "get_recommendations":
                    result = get_recommendations(block.input["user_id"])
                elif block.name == "add_to_cart":
                    result = add_to_cart(cart_id, block.input["variant_id"],
                                         block.input.get("quantity", 1))
                messages.extend([
                    {"role": "assistant", "content": response.content},
                    {"role": "user", "content": [
                        {"type": "tool_result", "tool_use_id": block.id,
                         "content": str(result)}]}
                ])
                break
```

---

## Patrón 2 — Agentic Checkout con UCP (Universal Commerce Protocol)

**Caso de uso**: Implementar checkout compatible con AI agents (ChatGPT, Claude, Perplexity) que pueden comprar directamente en la tienda.

**Stack**:
- [NVIDIA-AI-Blueprints/Retail-Agentic-Commerce](https://github.com/NVIDIA-AI-Blueprints/Retail-Agentic-Commerce) (Apache-2.0) — impl. referencia ACP+UCP
- [Universal-Commerce-Protocol/ucp](https://github.com/Universal-Commerce-Protocol/ucp) (Apache-2.0) — spec
- [medusajs/medusa](https://github.com/medusajs/medusa) (MIT) — backend

**Tiempo estimado**: 6-8 semanas | **Deal size LATAM**: $150k-400k

```python
# ucp_merchant_server.py — servidor UCP sobre Medusa
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests

app = FastAPI()
MEDUSA_URL = "http://localhost:9000"

class UCPProductQuery(BaseModel):
    query: str
    budget: float | None = None
    currency: str = "USD"

class UCPCheckoutRequest(BaseModel):
    product_id: str
    quantity: int
    buyer_agent_id: str
    payment_method: str

@app.get("/.well-known/ucp-manifest")
def ucp_manifest():
    """UCP discovery endpoint — los agentes AI lo encuentran aquí."""
    return {
        "protocol": "ucp/1.0",
        "merchant_id": "globant-demo-store",
        "capabilities": ["product-search", "price-negotiation", "checkout", "fulfillment-status"],
        "currency": "USD",
        "languages": ["es", "pt", "en"],
        "checkout_endpoint": "/ucp/checkout"
    }

@app.post("/ucp/search")
def ucp_search(query: UCPProductQuery):
    """Endpoint de búsqueda de productos para agentes AI."""
    resp = requests.get(f"{MEDUSA_URL}/store/products",
                        params={"q": query.query, "limit": 10})
    products = resp.json().get("products", [])
    # Filtrar por presupuesto si se especifica
    if query.budget:
        products = [p for p in products
                    if any(v["prices"][0]["amount"] / 100 <= query.budget
                           for v in p.get("variants", []))]
    return {"products": products, "currency": query.currency}

@app.post("/ucp/checkout")
def ucp_checkout(checkout: UCPCheckoutRequest):
    """Endpoint de checkout para agentes AI — compatible con UCP spec."""
    # 1. Crear cart en Medusa
    cart_resp = requests.post(f"{MEDUSA_URL}/store/carts")
    cart_id = cart_resp.json()["cart"]["id"]
    # 2. Añadir producto
    requests.post(f"{MEDUSA_URL}/store/carts/{cart_id}/line-items",
                  json={"variant_id": checkout.product_id,
                        "quantity": checkout.quantity})
    # 3. Completar pago (aquí iría integración con Stripe MCP o similar)
    return {
        "order_id": f"ORD-{cart_id[:8]}",
        "status": "confirmed",
        "agent_id": checkout.buyer_agent_id,
        "estimated_delivery": "2026-07-15"
    }
```

---

## Patrón 3 — Motor de Recomendación con Gorse + Cold-Start LightFM

**Caso de uso**: Sistema de recomendaciones con LLM ranker para retailers con catálogos de moda/electrónica (imagen + texto).

**Stack**:
- [gorse-io/gorse](https://github.com/gorse-io/gorse) (Apache-2.0, 9.7k★) — motor principal
- [lyst/lightfm](https://github.com/lyst/lightfm) (Apache-2.0, 4.9k★) — cold-start inicial
- pgvector — embeddings de imágenes de productos

**Tiempo estimado**: 3-5 semanas | **Deal size LATAM**: $80k-200k

```python
# recommender_pipeline.py
import requests
import numpy as np
from lightfm import LightFM
from lightfm.data import Dataset

GORSE_URL = "http://localhost:8088"

def cold_start_train(interactions: list, item_features: list) -> LightFM:
    """Entrena LightFM para cold-start cuando Gorse aún no tiene datos."""
    dataset = Dataset()
    dataset.fit(
        users=[i["user_id"] for i in interactions],
        items=[i["item_id"] for i in interactions],
        item_features=[f for item in item_features for f in item["features"]]
    )
    (interactions_matrix, weights) = dataset.build_interactions(
        [(i["user_id"], i["item_id"], i.get("rating", 1.0)) for i in interactions]
    )
    item_features_matrix = dataset.build_item_features(
        [(item["item_id"], item["features"]) for item in item_features]
    )
    model = LightFM(loss="warp", no_components=64)
    model.fit(interactions_matrix, item_features=item_features_matrix, epochs=30)
    return model, dataset

def ingest_to_gorse(user_id: str, item_id: str, feedback_type: str = "click"):
    """Ingesta feedback de usuario a Gorse para aprendizaje continuo."""
    requests.post(f"{GORSE_URL}/api/feedback", json=[{
        "FeedbackType": feedback_type,
        "UserId": user_id,
        "ItemId": item_id,
        "Timestamp": "2026-07-08T00:00:00Z"
    }])

def get_hybrid_recommendations(user_id: str, model: LightFM, dataset,
                                 n: int = 10) -> list:
    """Combina Gorse (warm) con LightFM (cold-start)."""
    # Primero intenta Gorse (tiene historial)
    gorse_resp = requests.get(f"{GORSE_URL}/api/recommend/{user_id}?n={n}")
    if gorse_resp.status_code == 200 and len(gorse_resp.json()) >= n // 2:
        return gorse_resp.json()
    # Fallback a LightFM cold-start
    user_idx = dataset.mapping()[0].get(user_id)
    if user_idx is None:
        return []
    n_items = dataset.interactions_shape()[1]
    scores = model.predict(user_idx, np.arange(n_items))
    top_items = np.argsort(-scores)[:n]
    reverse_mapping = {v: k for k, v in dataset.mapping()[2].items()}
    return [reverse_mapping[i] for i in top_items if i in reverse_mapping]

# Docker Compose setup
GORSE_COMPOSE = """
version: '3'
services:
  gorse:
    image: zhenghaoz/gorse-in-one
    ports: ["8088:8088", "8087:8087"]
    environment:
      GORSE_DASHBOARD_USER: admin
      GORSE_DASHBOARD_PASSWORD: password
    volumes: ["gorse_data:/var/lib/gorse"]
volumes:
  gorse_data:
"""
```

---

## Patrón 4 — Enriquecimiento de Catálogo con Claude Vision

**Caso de uso**: Retailers con catálogos de imágenes sin descripción (frecuente en LATAM). GenAI genera títulos, descripciones, atributos, categorías.

**Stack**:
- [NVIDIA-AI-Blueprints/Retail-Catalog-Enrichment](https://github.com/NVIDIA-AI-Blueprints/Retail-Catalog-Enrichment) (Apache-2.0) — patrón referencia
- Claude claude-sonnet-5 Vision API — análisis de imágenes
- [medusajs/medusa](https://github.com/medusajs/medusa) (MIT) — destino del catálogo

**Tiempo estimado**: 3-4 semanas | **Deal size LATAM**: $60k-150k

```python
import anthropic
import base64
import requests
from pathlib import Path

client = anthropic.Anthropic()

def enrich_product_image(image_path: str, category_hint: str = "",
                          language: str = "es") -> dict:
    """Analiza imagen de producto y genera metadatos ricos."""
    with open(image_path, "rb") as f:
        image_data = base64.standard_b64encode(f.read()).decode("utf-8")
    suffix = Path(image_path).suffix.lower()
    media_type_map = {".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp"}
    media_type = media_type_map.get(suffix, "image/jpeg")

    prompt = f"""Analiza esta imagen de producto de e-commerce y genera metadatos en {language}.
    Categoría sugerida: {category_hint or 'detectar automáticamente'}
    
    Devuelve JSON con:
    - title: título del producto (max 80 chars, SEO-optimizado)
    - description: descripción detallada (150-300 palabras)
    - short_description: resumen (max 50 chars)
    - attributes: dict con color, material, talla/tamaño, marca (si visible)
    - category: categoría principal
    - subcategory: subcategoría
    - keywords: lista de 10 keywords SEO
    - condition: nuevo/usado (inferir)
    """
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        messages=[{"role": "user", "content": [
            {"type": "image", "source": {"type": "base64",
             "media_type": media_type, "data": image_data}},
            {"type": "text", "text": prompt}
        ]}]
    )
    import json
    text = response.content[0].text
    # Extraer JSON del response
    start = text.find("{")
    end = text.rfind("}") + 1
    return json.loads(text[start:end]) if start != -1 else {}

def bulk_enrich_catalog(product_images: list, medusa_url: str,
                         api_key: str, language: str = "es"):
    """Enriquece catálogo masivamente y sube a Medusa."""
    results = []
    for item in product_images:
        metadata = enrich_product_image(item["image_path"], item.get("category", ""),
                                         language)
        if metadata:
            # Actualizar producto en Medusa
            resp = requests.post(
                f"{medusa_url}/admin/products",
                headers={"x-medusa-access-token": api_key},
                json={
                    "title": metadata["title"],
                    "description": metadata["description"],
                    "handle": metadata["title"].lower().replace(" ", "-"),
                    "metadata": {
                        "keywords": metadata.get("keywords", []),
                        "attributes": metadata.get("attributes", {})
                    }
                }
            )
            results.append({"item": item, "status": resp.status_code,
                            "metadata": metadata})
    return results
```

---

## Patrón 5 — WhatsApp Commerce Agent (LATAM Focus)

**Caso de uso**: Agente de ventas por WhatsApp para retailers LATAM. Búsqueda de productos, carrito, pagos por Pix/SPEI.

**Stack**:
- [medusajs/medusa](https://github.com/medusajs/medusa) (MIT) + Medusa MCP
- Claude claude-sonnet-5 API — agente conversacional
- WhatsApp Business API (Meta) — canal
- Stripe / MercadoPago — pagos

**Tiempo estimado**: 4-6 semanas | **Deal size LATAM**: $80k-200k

```python
from anthropic import Anthropic
from flask import Flask, request, jsonify

app = Flask(__name__)
client = Anthropic()
MEDUSA_URL = "http://localhost:9000"

# Sesiones por número de WhatsApp
sessions = {}

@app.route("/webhook/whatsapp", methods=["POST"])
def whatsapp_webhook():
    data = request.json
    phone = data["from"]
    message = data["body"]
    # Recuperar historial de conversación
    history = sessions.get(phone, [])
    history.append({"role": "user", "content": message})
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=512,
        system="""Eres un asistente de ventas por WhatsApp para una tienda online.
        Habla en español, sé amigable y conciso (máx 3 párrafos por respuesta).
        Puedes: buscar productos, mostrar precios, crear pedidos, dar seguimiento.
        Usa emojis ocasionalmente para ser amigable 🛍️""",
        messages=history
    )
    reply = response.content[0].text
    history.append({"role": "assistant", "content": reply})
    sessions[phone] = history[-20:]  # mantener últimos 20 turnos
    # Enviar respuesta por WhatsApp Business API
    send_whatsapp_message(phone, reply)
    return jsonify({"status": "ok"})

def send_whatsapp_message(phone: str, message: str):
    import requests
    requests.post(
        "https://graph.facebook.com/v18.0/FROM_PHONE_NUMBER_ID/messages",
        headers={"Authorization": f"Bearer {WA_TOKEN}"},
        json={"messaging_product": "whatsapp", "to": phone,
              "type": "text", "text": {"body": message}}
    )
```

---

## Patrón 6 — Pricing Dinámico con Tensor-House + LLM Rules Engine

**Caso de uso**: Pricing dinámico basado en demanda, inventario, competencia y factores externos (Argentina: tipo de cambio).

**Stack**:
- [ikatsov/tensor-house](https://github.com/ikatsov/tensor-house) (MIT, 3.1k★) — modelos base
- Claude claude-sonnet-5 — motor de reglas de negocio en lenguaje natural
- [odoo/odoo](https://github.com/odoo/odoo) (LGPL-3.0) — sistema de precios destino

**Tiempo estimado**: 4-6 semanas | **Deal size LATAM**: $100k-250k

```python
import anthropic
import pandas as pd
import numpy as np

client = anthropic.Anthropic()

def dynamic_price_agent(product_id: str, current_price: float,
                         inventory: int, demand_forecast: float,
                         competitor_price: float | None,
                         exchange_rate: float = 1.0,
                         rules: str = "") -> dict:
    """
    Agente de pricing dinámico. Combina modelo estadístico + LLM para
    decisiones de precio explicables y auditables.
    """
    context = f"""
    Producto: {product_id}
    Precio actual: ${current_price:.2f}
    Inventario disponible: {inventory} unidades
    Demanda pronosticada (próximos 7d): {demand_forecast:.0f} unidades
    Precio de competencia: {f'${competitor_price:.2f}' if competitor_price else 'No disponible'}
    Tipo de cambio (vs USD): {exchange_rate:.4f}
    
    Reglas de negocio adicionales:
    {rules or 'Ninguna específica'}
    
    Historial de reglas de pricing dinámico (Tensor-House):
    - Price elasticity estimada: -1.8
    - Margen mínimo: 15%
    - Rango de variación permitido: ±20% del precio base
    """
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=512,
        messages=[{"role": "user", "content": f"""
        Eres un experto en pricing dinámico para retail.
        Analiza la situación y recomienda:
        1. Nuevo precio sugerido (justificado)
        2. Confianza en la recomendación (0-100%)
        3. Razón principal del cambio
        4. Alerta si hay algo inusual
        
        Contexto:
        {context}
        
        Responde en JSON: {{"price": 0.0, "confidence": 0, "reason": "", "alert": ""}}
        """}]
    )
    import json
    text = response.content[0].text
    start = text.find("{")
    end = text.rfind("}") + 1
    result = json.loads(text[start:end]) if start != -1 else {}
    result["original_price"] = current_price
    result["price_change_pct"] = ((result.get("price", current_price) - current_price)
                                   / current_price * 100)
    return result
```

---

## Patrón 7 — Supply Chain Intelligence con NVIDIA Warehouse + Odoo

**Caso de uso**: Capa AI sobre WMS/ERP existente para optimizar operaciones de warehouse: forecasting, rutas, seguridad, documentos.

**Stack**:
- [NVIDIA-AI-Blueprints/Multi-Agent-Intelligent-Warehouse](https://github.com/NVIDIA-AI-Blueprints/Multi-Agent-Intelligent-Warehouse) (Apache-2.0)
- [odoo/odoo](https://github.com/odoo/odoo) (LGPL-3.0) — ERP backend
- Claude claude-sonnet-5 — agente orquestador

**Tiempo estimado**: 8-12 semanas | **Deal size LATAM**: $200k-500k

```python
# warehouse_orchestrator.py — LangGraph multi-agent sobre NVIDIA Warehouse Blueprint
from langgraph.graph import StateGraph, END
from anthropic import Anthropic
from typing import TypedDict, Annotated
import operator

client = Anthropic()

class WarehouseState(TypedDict):
    task: str
    inventory_data: dict
    alerts: Annotated[list, operator.add]
    recommendations: Annotated[list, operator.add]
    final_report: str

def inventory_agent(state: WarehouseState) -> WarehouseState:
    """Agente de inventario: detecta stockouts y excesos."""
    response = client.messages.create(
        model="claude-sonnet-5", max_tokens=512,
        messages=[{"role": "user", "content": f"""
        Analiza el inventario y detecta:
        - Productos con stock crítico (<7 días de cobertura)
        - Excesos de inventario (>90 días de cobertura)
        Datos: {state['inventory_data']}
        Responde en JSON: {{"critical": [], "excess": []}}
        """}]
    )
    import json
    alerts_text = response.content[0].text
    start = alerts_text.find("{")
    end = alerts_text.rfind("}") + 1
    alerts = json.loads(alerts_text[start:end]) if start != -1 else {}
    return {"alerts": [alerts]}

def forecasting_agent(state: WarehouseState) -> WarehouseState:
    """Agente de forecasting: predicciones de demanda."""
    response = client.messages.create(
        model="claude-sonnet-5", max_tokens=512,
        messages=[{"role": "user", "content": f"""
        Basado en el inventario y patrones históricos, genera forecast:
        - Top 5 productos que necesitarán reposición en los próximos 14 días
        - Cantidad sugerida de orden
        Datos de inventario: {state['inventory_data']}
        """}]
    )
    return {"recommendations": [response.content[0].text]}

def report_agent(state: WarehouseState) -> WarehouseState:
    """Consolida todos los insights en reporte ejecutivo."""
    response = client.messages.create(
        model="claude-sonnet-5", max_tokens=1024,
        messages=[{"role": "user", "content": f"""
        Genera un reporte ejecutivo de warehouse operations para el día de hoy.
        Alertas: {state['alerts']}
        Recomendaciones: {state['recommendations']}
        Formato: bullet points en español, máximo 1 página.
        """}]
    )
    return {"final_report": response.content[0].text}

# Construir el grafo de agentes
graph = StateGraph(WarehouseState)
graph.add_node("inventory", inventory_agent)
graph.add_node("forecasting", forecasting_agent)
graph.add_node("report", report_agent)
graph.set_entry_point("inventory")
graph.add_edge("inventory", "forecasting")
graph.add_edge("forecasting", "report")
graph.add_edge("report", END)
warehouse_app = graph.compile()
```

---

## Patrón 8 — Retail Analytics con WooCommerce MCP + Claude

**Caso de uso**: Análisis de ventas conversacional para retailers con WooCommerce existente. Sin código para el cliente.

**Stack**:
- WooCommerce 10.3+ con MCP nativo
- Claude Desktop o cualquier cliente MCP
- [apache/superset](https://github.com/apache/superset) (Apache-2.0) — dashboards

**Tiempo estimado**: 1-2 semanas | **Deal size LATAM**: $20k-60k

```markdown
# Configuración MCP para WooCommerce (claude_desktop_config.json)

{
  "mcpServers": {
    "woocommerce": {
      "command": "npx",
      "args": ["@woocommerce/mcp-server"],
      "env": {
        "WOOCOMMERCE_URL": "https://mitienda.com",
        "WOOCOMMERCE_KEY": "ck_...",
        "WOOCOMMERCE_SECRET": "cs_..."
      }
    }
  }
}
```

```python
# Ejemplo: Claude puede responder preguntas como:
# "¿Cuáles son los 10 productos más vendidos este mes?"
# "¿Qué clientes no han comprado en 90 días?"
# "Muéstrame el revenue por categoría de los últimos 30 días"
# "¿Cuál es el ticket promedio por país?"

# Claude accede directamente a WooCommerce via MCP y responde con datos reales.
# No requiere código adicional — la integración MCP lo maneja todo.

# Para dashboards automáticos, exportar a Superset:
import subprocess
# wc-cli export → CSV → Superset dataset → auto-dashboard con AI
```

---

---

## Patrón 9 — On-Site Brand Agent (Trust Advantage, Bain 2026)

**Caso de uso**: Agente embedded en la propia tienda del brand (no ChatGPT/Perplexity). Aprovecha el diferencial de confianza: 3x más confiado según Bain 2026. Ideal como contrapropuesta a "integrar con ChatGPT Checkout".

**Stack**:
- [medusajs/medusa](https://github.com/medusajs/medusa) (MIT) — backend, datos propios del brand
- [gorse-io/gorse](https://github.com/gorse-io/gorse) (Apache-2.0) — recomendaciones con historial propio
- Claude claude-sonnet-5 via API (vía Anthropic managed agents) — LLM con personalidad del brand
- Widget embedded en el frontend (React/Next.js) — no third-party iframe

**Por qué on-site gana**:
- Datos propios: el agente conoce el historial completo del cliente en el brand
- Personalidad: responde como el brand, no como asistente genérico
- Trust: consumidores confían 3x más (Bain 2026)
- Data privacy: sin compartir datos con OpenAI/Perplexity

**Tiempo estimado**: 3-5 semanas | **Deal size LATAM**: $80k-250k

```python
# brand_agent_server.py — On-Site Agent con personalidad del brand
from anthropic import Anthropic
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests

app = FastAPI()
client = Anthropic()

# Personalidad del brand (configurar por cliente)
BRAND_CONFIG = {
    "brand_name": "MiTienda",
    "brand_voice": "amigable, experto en moda, usa español informal",
    "brand_values": "sostenibilidad, calidad artesanal, precio justo",
    "return_policy": "30 días sin preguntas",
    "loyalty_program": "MiPuntos — 1 punto por cada $1 gastado",
}

class ChatRequest(BaseModel):
    user_id: str
    session_id: str
    message: str
    cart_id: str | None = None

MEDUSA_URL = "http://localhost:9000"
GORSE_URL = "http://localhost:8088"

# Store chat histories per session
sessions = {}

@app.post("/chat")
async def brand_chat(req: ChatRequest):
    """Endpoint del agente embedded del brand."""
    history = sessions.get(req.session_id, [])

    # Enriquecer contexto con datos del cliente
    customer_context = get_customer_context(req.user_id)
    recs = get_recommendations(req.user_id)

    system_prompt = f"""Eres el asistente personal de compras de {BRAND_CONFIG['brand_name']}.
Personalidad: {BRAND_CONFIG['brand_voice']}.
Valores del brand: {BRAND_CONFIG['brand_values']}.

Información del cliente actual:
{customer_context}

Productos recomendados para este cliente:
{recs[:3]}

Política de devoluciones: {BRAND_CONFIG['return_policy']}
Programa de fidelización: {BRAND_CONFIG['loyalty_program']}

Sé el experto del brand — usa el conocimiento de la tienda y del cliente para dar recomendaciones genuinas.
NUNCA menciones competidores ni otras plataformas de AI (ChatGPT, etc.)."""

    history.append({"role": "user", "content": req.message})

    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=768,
        system=system_prompt,
        messages=history
    )

    reply = response.content[0].text
    history.append({"role": "assistant", "content": reply})
    sessions[req.session_id] = history[-30:]  # últimos 30 turnos

    return {
        "reply": reply,
        "session_id": req.session_id,
        "recommendations": recs[:3]
    }

def get_customer_context(user_id: str) -> str:
    """Carga historial y preferencias del cliente desde Medusa."""
    try:
        resp = requests.get(f"{MEDUSA_URL}/admin/customers/{user_id}",
                           headers={"x-medusa-access-token": "..."})
        c = resp.json().get("customer", {})
        return (f"Nombre: {c.get('first_name', 'Cliente')}. "
                f"Pedidos: {c.get('orders', {}).get('count', 0)}. "
                f"Puntos de fidelización: {c.get('metadata', {}).get('loyalty_points', 0)}.")
    except Exception:
        return "Nuevo cliente — sin historial."

def get_recommendations(user_id: str, n: int = 6) -> list:
    """Recomendaciones personalizadas de Gorse."""
    try:
        resp = requests.get(f"{GORSE_URL}/api/recommend/{user_id}?n={n}")
        return resp.json() if resp.status_code == 200 else []
    except Exception:
        return []
```

---

## Patrón 10 — WooCommerce 10.9 Full Agentic Upgrade

**Caso de uso**: Migrar tienda WooCommerce existente a "agentic-ready" usando las 7 abilities nativas de v10.9 + Claude Code como brain del agent. Para clientes con WooCommerce ya instalado (40% del retail LATAM).

**Stack**:
- WooCommerce 10.9+ (7 MCP abilities en core)
- Claude Code + MCP adapter (ya conectado a WC 10.9)
- [gorse-io/gorse](https://github.com/gorse-io/gorse) (Apache-2.0) — recomendaciones
- [apache/superset](https://github.com/apache/superset) (Apache-2.0) — dashboards analytics

**Por qué este patrón**:
- WooCommerce 10.9 ya expone productos-query, product-create, product-update, product-delete, orders-query, order-update-status, order-add-note **sin código adicional**
- Setup time: instalación de plugin + configurar Claude Code = 1-2 días
- Roadmap WC Q3 2026: Checkout ability → primera tienda WC con agentic checkout completo

**Tiempo estimado**: 2-3 semanas (con WC ya instalado) | **Deal size LATAM**: $30k-80k

```bash
# 1. Actualizar WooCommerce a 10.9+
wp plugin update woocommerce

# 2. Configurar MCP adapter en claude_desktop_config.json
# (WC 10.9 expone nativo via WordPress MCP Adapter)

# 3. Claude Code ya puede:
# - "Lista los 10 productos más vendidos este mes"
# - "Crea un producto nuevo: Camiseta Azul, $29.99, stock 50"
# - "Actualiza el estado del pedido #1234 a 'enviado'"
# - "Agrega nota al pedido #1234: 'paquete frágil, manejo especial'"
```

```python
# wc_agentic_integration.py — Claude agent con WC 10.9 via MCP + Gorse recs
from anthropic import Anthropic
import subprocess
import json

client = Anthropic()

# El MCP server de WC 10.9 ya expone los tools via Node.js adapter
# Claude recibe automáticamente: products_query, product_create,
# product_update, product_delete, orders_query, order_update_status, order_add_note

WC_MCP_CONFIG = {
    "mcpServers": {
        "woocommerce": {
            "command": "npx",
            "args": ["@woocommerce/mcp-server"],
            "env": {
                "WOOCOMMERCE_URL": "https://mitienda.com",
                "WOOCOMMERCE_KEY": "ck_...",
                "WOOCOMMERCE_SECRET": "cs_..."
            }
        },
        "gorse": {
            "command": "python",
            "args": ["gorse_mcp_bridge.py"],  # bridge personalizado
            "env": {"GORSE_URL": "http://localhost:8088"}
        }
    }
}

# Con esta configuración, Claude puede responder:
# "¿Qué productos tienen stock crítico (< 5 unidades)?"
# → usa products_query con filter stock_quantity__lt=5
#
# "¿Cuál fue el revenue total esta semana?"
# → usa orders_query con date_after=fecha_inicio_semana
#
# "Añade envío gratis al pedido #1234 como excepción"
# → usa order_add_note + order_update_status

def wc_ai_analytics_report(natural_language_question: str) -> str:
    """Usa Claude + WC MCP para responder preguntas de analytics en NL."""
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        system="""Eres el analista de datos de una tienda WooCommerce.
        Tienes acceso directo a todos los productos, pedidos e inventario.
        Responde en español con datos precisos y recomendaciones accionables.""",
        messages=[{"role": "user", "content": natural_language_question}]
        # MCP tools disponibles automáticamente vía WC 10.9 adapter
    )
    return response.content[0].text

# Ejemplo de uso:
# reporte = wc_ai_analytics_report("¿Cuáles son los 5 productos con mayor abandono de carrito?")
```

---

## Patrón 11 — AEO + Structured Data Agent (Answer Engine Optimization)

**Caso de uso**: Auditar y corregir automáticamente el catálogo de una tienda para hacerlo "agent-ready": structured data JSON-LD, schema.org, metadata completa. El catálogo invisible para ChatGPT/Claude/Perplexity pierde ventas — AEO lo corrige.

**Por qué ahora**: 31.3% de americanos usan AI generativo para búsqueda (2026). ChatGPT ecommerce convierte 31% más que búsqueda orgánica. Pero la conversión AI es 86% peor que afiliados cuando el catálogo no tiene structured data. AEO cierra esa brecha.

**Stack**:
- [medusajs/medusa](https://github.com/medusajs/medusa) (MIT) — backend headless con API de productos
- Claude claude-sonnet-5 Vision API — análisis de imágenes + generación de structured data
- [spatie/schema-org](https://github.com/spatie/schema-org) (MIT) — librería PHP/Python para schema.org
- [nexscope-ai/eCommerce-Skills](https://github.com/nexscope-ai/eCommerce-Skills) (MIT) — skill `product-review-analysis` + `listing-audit`
- WooCommerce 10.9 MCP (para clientes WC) — ingesta y update de productos directamente

**Tiempo estimado**: 2-4 semanas | **Deal size LATAM**: $40k-$120k

```python
# aeo_agent.py — AEO Audit + Remediation Agent
import anthropic
import json
import requests
from typing import Any

client = anthropic.Anthropic()
MEDUSA_URL = "http://localhost:9000"

def audit_product_structured_data(product: dict) -> dict:
    """Audita un producto y devuelve qué campos de schema.org faltan o son incorrectos."""
    required_fields = {
        "name": product.get("title"),
        "description": product.get("description"),
        "image": product.get("thumbnail"),
        "sku": product.get("handle"),
        "price": None,  # se extrae de variants
        "availability": None,
        "brand": product.get("metadata", {}).get("brand"),
        "category": product.get("collection", {}).get("title") if product.get("collection") else None,
        "keywords": product.get("metadata", {}).get("keywords", []),
        "gtin": product.get("metadata", {}).get("gtin"),
    }
    # Precios de variantes
    if product.get("variants"):
        prices = product["variants"][0].get("prices", [])
        if prices:
            required_fields["price"] = prices[0]["amount"] / 100
            required_fields["price_currency"] = prices[0]["currency_code"].upper()
    
    # Calcular score AEO
    filled = sum(1 for v in required_fields.values() if v)
    total = len(required_fields)
    missing = [k for k, v in required_fields.items() if not v]
    
    return {
        "product_id": product.get("id"),
        "title": product.get("title"),
        "aeo_score": round(filled / total * 100),
        "filled_fields": filled,
        "total_fields": total,
        "missing_fields": missing,
        "agent_ready": filled / total >= 0.85,
    }

def generate_schema_org_jsonld(product: dict, enriched_metadata: dict) -> dict:
    """Genera JSON-LD schema.org Product para el producto."""
    variants = product.get("variants", [{}])
    prices = variants[0].get("prices", []) if variants else []
    price = prices[0]["amount"] / 100 if prices else None
    currency = prices[0]["currency_code"].upper() if prices else "USD"
    
    return {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": enriched_metadata.get("title") or product.get("title"),
        "description": enriched_metadata.get("description") or product.get("description", ""),
        "image": [product.get("thumbnail")] if product.get("thumbnail") else [],
        "sku": product.get("handle"),
        "brand": {
            "@type": "Brand",
            "name": enriched_metadata.get("brand") or product.get("metadata", {}).get("brand", "")
        },
        "category": enriched_metadata.get("category") or "",
        "keywords": enriched_metadata.get("keywords", []),
        "offers": {
            "@type": "Offer",
            "price": str(price) if price else "",
            "priceCurrency": currency,
            "availability": "https://schema.org/InStock",
            "url": f"https://mitienda.com/products/{product.get('handle', '')}"
        } if price else {}
    }

def enrich_and_fix_product(product: dict, language: str = "es") -> dict:
    """Usa Claude para enriquecer campos faltantes del producto."""
    audit = audit_product_structured_data(product)
    
    if audit["agent_ready"]:
        return {"product_id": product["id"], "status": "already_agent_ready",
                "aeo_score": audit["aeo_score"]}
    
    # Preparar prompt para Claude
    missing = audit["missing_fields"]
    prompt = f"""Analiza este producto de e-commerce y genera los campos faltantes para AEO (Answer Engine Optimization).
    
Producto actual:
- Título: {product.get('title', 'Sin título')}
- Descripción: {product.get('description', 'Sin descripción')}
- Categoría: {product.get('collection', {}).get('title', 'Sin categoría') if product.get('collection') else 'Sin categoría'}

Campos AEO faltantes que debes generar: {missing}

Idioma: {language}

Responde en JSON con exactamente los campos listados en "missing_fields":
{{"title": "...", "description": "...", "brand": "...", "category": "...", "keywords": ["kw1", "kw2", ...], "gtin": null}}

Asegúrate que:
1. La descripción sea de 150-300 palabras, factual, sin hipérboles
2. Las keywords sean términos que un agente AI buscaría para encontrar este producto
3. La categoría siga la taxonomía Google Product Category"""
    
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}]
    )
    
    text = response.content[0].text
    start, end = text.find("{"), text.rfind("}") + 1
    enriched = json.loads(text[start:end]) if start != -1 else {}
    
    # Generar JSON-LD final
    jsonld = generate_schema_org_jsonld(product, enriched)
    
    # Actualizar metadata en Medusa
    update_resp = requests.post(
        f"{MEDUSA_URL}/admin/products/{product['id']}",
        headers={"x-medusa-access-token": "..."},
        json={
            "description": enriched.get("description", product.get("description", "")),
            "metadata": {
                **product.get("metadata", {}),
                "brand": enriched.get("brand", ""),
                "keywords": enriched.get("keywords", []),
                "schema_org_jsonld": json.dumps(jsonld),
                "aeo_score": audit["aeo_score"],
                "aeo_updated_at": "2026-07-09"
            }
        }
    )
    
    return {
        "product_id": product["id"],
        "title": product.get("title"),
        "status": "enriched",
        "aeo_score_before": audit["aeo_score"],
        "missing_filled": missing,
        "jsonld_generated": bool(jsonld),
        "medusa_update_status": update_resp.status_code
    }

def run_aeo_audit(limit: int = 50, language: str = "es") -> dict:
    """Ejecuta AEO audit sobre los primeros N productos del catálogo."""
    # Obtener productos de Medusa
    resp = requests.get(f"{MEDUSA_URL}/admin/products?limit={limit}",
                        headers={"x-medusa-access-token": "..."})
    products = resp.json().get("products", [])
    
    results = []
    for product in products:
        result = enrich_and_fix_product(product, language)
        results.append(result)
    
    # Resumen ejecutivo
    agent_ready = [r for r in results if r.get("status") == "already_agent_ready"]
    enriched = [r for r in results if r.get("status") == "enriched"]
    
    return {
        "total_audited": len(results),
        "already_agent_ready": len(agent_ready),
        "enriched": len(enriched),
        "avg_aeo_score": sum(r.get("aeo_score", r.get("aeo_score_before", 0))
                             for r in results) / len(results) if results else 0,
        "results": results
    }

# Uso:
# summary = run_aeo_audit(limit=100, language="es")
# print(f"Productos agent-ready: {summary['already_agent_ready']}/{summary['total_audited']}")
# print(f"AEO score promedio: {summary['avg_aeo_score']:.1f}%")
```

**Output del agente**:
```json
{
  "total_audited": 100,
  "already_agent_ready": 23,
  "enriched": 77,
  "avg_aeo_score": 91.4
}
```

---

## Patrón 12 — Social Commerce AI (TikTok Shop + Shopify + WhatsApp)

**Caso de uso**: Agente orquestador que gestiona simultáneamente TikTok Shop, Shopify/WooCommerce y WhatsApp Business desde un único LLM. Para retailers LATAM Gen-Z que venden por múltiples canales.

**Por qué ahora**: TikTok Ads MCP (may-2026) permite que agentes AI lancen y optimicen campañas autónomamente. TikTok Shop activo en Brasil y México. Gen Z impulse buying + 24/7 live streams = canal de alta conversión.

**Stack**:
- Claude claude-sonnet-5 via Anthropic API — agente orquestador
- TikTok Ads MCP (may-2026) — campañas autónomas
- [nexscope-ai/eCommerce-Skills](https://github.com/nexscope-ai/eCommerce-Skills) (MIT) — skill `tiktok-shop` + `social-commerce` + `product-review-analysis`
- WooCommerce 10.9 MCP — backend de inventario y pedidos
- WhatsApp Business API — canal conversacional LATAM
- [langgenius/dify](https://github.com/langgenius/dify) (Apache-2.0) — orquestación visual del workflow completo

**Tiempo estimado**: 4-6 semanas | **Deal size LATAM**: $80k-$200k

```python
# social_commerce_orchestrator.py — Agente multi-canal con MCP
from anthropic import Anthropic
from fastapi import FastAPI
from pydantic import BaseModel
import requests

app = FastAPI()
client = Anthropic()

# El sistema de herramientas multi-canal
OMNICHANNEL_TOOLS = [
    {
        "name": "get_inventory",
        "description": "Consulta inventario real en WooCommerce vía MCP",
        "input_schema": {
            "type": "object",
            "properties": {"product_id": {"type": "string"},
                           "sku": {"type": "string"}},
            "required": []
        }
    },
    {
        "name": "create_tiktok_campaign",
        "description": "Crea campaña en TikTok Ads vía MCP (may-2026)",
        "input_schema": {
            "type": "object",
            "properties": {
                "product_id": {"type": "string"},
                "budget_daily": {"type": "number"},
                "target_audience": {"type": "string"},
                "ad_format": {"type": "string",
                              "enum": ["in-feed", "top-view", "spark-ads"]}
            },
            "required": ["product_id", "budget_daily"]
        }
    },
    {
        "name": "send_whatsapp",
        "description": "Envía mensaje por WhatsApp Business API",
        "input_schema": {
            "type": "object",
            "properties": {"phone": {"type": "string"},
                           "message": {"type": "string"}},
            "required": ["phone", "message"]
        }
    },
    {
        "name": "analyze_tiktok_performance",
        "description": "Obtiene métricas de campaña TikTok (views, clicks, CVR, ROAS)",
        "input_schema": {
            "type": "object",
            "properties": {"campaign_id": {"type": "string"},
                           "days": {"type": "integer", "default": 7}},
            "required": ["campaign_id"]
        }
    }
]

class OmnichannelRequest(BaseModel):
    instruction: str          # "Lanza campaña TikTok para los 3 productos más vendidos esta semana"
    channel: str = "all"      # "tiktok" | "whatsapp" | "woocommerce" | "all"
    context: dict = {}

@app.post("/orchestrate")
async def orchestrate(req: OmnichannelRequest):
    """Orquestador multi-canal: TikTok + WooCommerce + WhatsApp."""
    system = """Eres el orquestador de ventas omnicanal de una tienda.
    Gestionas simultáneamente: TikTok Shop, WooCommerce, WhatsApp Business.
    
    Siempre:
    1. Verifica inventario antes de crear campañas (no prometas lo que no hay)
    2. Cuando lances una campaña en TikTok, notifica al equipo por WhatsApp
    3. Prioriza productos con stock > 20 unidades para campañas
    4. Responde en español, conciso y orientado a resultados."""
    
    messages = [{"role": "user", "content": req.instruction}]
    if req.context:
        messages[0]["content"] += f"\n\nContexto adicional: {req.context}"
    
    # Agentic loop
    max_iterations = 5
    for _ in range(max_iterations):
        response = client.messages.create(
            model="claude-sonnet-5",
            max_tokens=1024,
            system=system,
            tools=OMNICHANNEL_TOOLS,
            messages=messages
        )
        
        if response.stop_reason == "end_turn":
            return {"status": "completed", "result": response.content[0].text}
        
        # Procesar tool calls
        tool_results = []
        for block in response.content:
            if block.type == "tool_use":
                result = dispatch_tool(block.name, block.input)
                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": json.dumps(result)
                })
        
        messages.extend([
            {"role": "assistant", "content": response.content},
            {"role": "user", "content": tool_results}
        ])
    
    return {"status": "max_iterations_reached", "messages": messages}

def dispatch_tool(name: str, input_data: dict) -> Any:
    """Dispatcher de tools — conecta con APIs reales."""
    import json
    
    if name == "get_inventory":
        # WooCommerce MCP (vía endpoint local del adapter)
        resp = requests.get("http://localhost:3100/wc/products",
                           params={"sku": input_data.get("sku", "")})
        return resp.json() if resp.ok else {"error": "WC unreachable"}
    
    elif name == "create_tiktok_campaign":
        # TikTok Ads MCP endpoint
        resp = requests.post("http://localhost:3200/tiktok-mcp/campaigns",
                            json=input_data)
        return resp.json() if resp.ok else {"error": "TikTok MCP unreachable"}
    
    elif name == "send_whatsapp":
        # WhatsApp Business API
        requests.post(
            "https://graph.facebook.com/v18.0/PHONE_ID/messages",
            headers={"Authorization": "Bearer WA_TOKEN"},
            json={"messaging_product": "whatsapp", "to": input_data["phone"],
                  "type": "text", "text": {"body": input_data["message"]}}
        )
        return {"sent": True, "phone": input_data["phone"]}
    
    elif name == "analyze_tiktok_performance":
        # TikTok Ads MCP — reportes
        resp = requests.get(f"http://localhost:3200/tiktok-mcp/campaigns/{input_data['campaign_id']}/report",
                           params={"days": input_data.get("days", 7)})
        return resp.json() if resp.ok else {"error": "Report unavailable"}
    
    return {"error": f"Unknown tool: {name}"}
```

**Ejemplo de uso**:
```python
import httpx
result = httpx.post("http://localhost:8000/orchestrate", json={
    "instruction": "Verifica inventario de los tops de verano y si stock > 30 unidades, lanza campaña TikTok spark-ads con budget $50/día, luego notifica al equipo por WhatsApp al +5491122334455",
    "channel": "all"
}).json()
print(result["result"])
```

---

## Tabla de selección de patrón

| Si el cliente tiene... | Usa el Patrón | Stack principal | Deal Size |
|------------------------|---------------|-----------------|-----------|
| Tienda WooCommerce 10.9+ existente | P10 (WC Agentic Upgrade) | WooCommerce MCP + Claude | $30k-80k |
| Tienda WooCommerce, analytics básico | P8 (MCP + Analytics) | WooCommerce MCP + Superset | $20k-60k |
| Retailer nuevo, headless | P1 (Shopping Assistant) | Medusa + Gorse + Claude | $100k-300k |
| Quiere on-site agent de marca | P9 (Brand Agent) | Medusa + Gorse + Claude embedded | $80k-250k |
| Quiere AI agents externos comprando | P2 (Agentic Checkout UCP) | NVIDIA Agentic-Commerce + UCP | $150k-400k |
| Catálogo de imágenes sin descripción | P4 (Catalog Enrichment) | Claude Vision + Medusa | $60k-150k |
| Mercado LATAM, WhatsApp-first | P5 (WhatsApp Commerce) | Medusa + Claude + WhatsApp API | $80k-200k |
| Precios inestables / alta competencia | P6 (Dynamic Pricing) | Tensor-House + Claude + Odoo | $100k-250k |
| Warehouse / supply chain complejo | P7 (Warehouse Intelligence) | NVIDIA Warehouse + LangGraph + Odoo | $200k-500k |
| Catálogo grande, recomendaciones | P3 (Hybrid Recommender) | Gorse + LightFM + pgvector | $80k-200k |
| Catálogo invisible para AI (AEO) | P11 (AEO Agent) | Claude Vision + Medusa + schema.org | $40k-120k |
| Vende en TikTok Shop + WooCommerce | P12 (Social Commerce AI) | Claude + TikTok MCP + WC MCP + nexscope | $80k-200k |

---
*Ver también: `agents/top.md` para lista completa de agentes y repos.*
