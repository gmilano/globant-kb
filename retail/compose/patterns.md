# Patrones de composición — Retail & eCommerce

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-14 (v9 — Era ACP/UCP)

## Arquitectura base

```
[Plataforma vertical open source (Medusa / WooCommerce / Odoo)]
          ↓
[MCP Server (medusa-mcp / woocommerce-mcp / Odoo API)]
          ↓
[Agentes especializados (nexscope-skills / InvAgent / nitin27may)]
          ↓
[Protocolo de commerce (ACP / UCP endpoint)]
          ↓
[AI Shopping Surfaces (ChatGPT / Google AI / Perplexity)]
```

---

## P1 — Agentic Shopping Assistant con Medusa + Claude
**Objetivo**: tienda headless con asistente AI que recomienda, responde y convierte
**Stack**: Medusa.js + medusa-mcp + Claude + nexscope-ai/eCommerce-Skills

```python
# Paso 1: Levantar Medusa backend
# medusajs.com/docs/getting-started

# Paso 2: Conectar medusa-mcp como MCP server en Claude
# claude_config.json:
# {
#   "mcpServers": {
#     "medusa": {
#       "command": "npx",
#       "args": ["@sgfgov/medusa-mcp", "--store-url", "https://tu-tienda.com"]
#     }
#   }
# }

# Paso 3: Claude tiene acceso a productos, órdenes, clientes
# Ejemplo de interacción agentica:
import anthropic

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=2048,
    system="""Eres un asistente de compras para [Tienda]. 
    Tienes acceso a:
    - products: buscar y listar productos del catálogo
    - orders: consultar y actualizar pedidos
    - customers: gestionar perfiles y preferencias
    Usa los skills de nexscope-ai/eCommerce-Skills para research de productos.""",
    messages=[{"role": "user", "content": "Busco un regalo para mi madre, le gustan las plantas"}]
)
```
- **Tiempo estimado**: 2-3 semanas (1 dev)
- **Costo**: $30k-$60k
- **ROI**: +15-25% conversion rate (AI personalization benchmark)

---

## P2 — UCP Endpoint: ser visible en Google AI Shopping
**Objetivo**: retailer LATAM visible en Google AI Shopping y ChatGPT
**Stack**: Medusa.js + UCP spec + ACP spec

```python
# UCP endpoint (Google Universal Commerce Protocol)
# Archivo: public/.well-known/ucp/manifest.json

import json
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/.well-known/ucp/manifest.json')
def ucp_manifest():
    """Implementación del Universal Commerce Protocol endpoint"""
    return jsonify({
        "version": "1.0",
        "storeName": "Mi Tienda LATAM",
        "capabilities": ["product_search", "inventory_check", "checkout"],
        "apiVersion": "v1",
        "endpoints": {
            "products": "/api/ucp/products",
            "search": "/api/ucp/search",
            "checkout": "/api/ucp/checkout"
        },
        "regions": ["AR", "BR", "MX", "CO", "CL"],
        "currencies": ["ARS", "BRL", "MXN", "COP", "CLP"]
    })

@app.route('/api/ucp/products')
def ucp_products():
    """Feed de productos en formato UCP"""
    # Conectar con Medusa API
    products = medusa_client.products.list(limit=100)
    return jsonify({
        "products": [ucp_format(p) for p in products],
        "total": len(products)
    })
```
- **Tiempo estimado**: 1 semana
- **Costo**: $10k-$20k
- **ROI**: Visibilidad en ChatGPT Shopping y Google AI Shopping — tráfico orgánico de agentes

---

## P3 — Multi-Agent eCommerce con A2A Protocol
**Objetivo**: sistema de 6 agentes especializados para operar una tienda completa
**Stack**: nitin27may/e-commerce-agents + FastAPI + PostgreSQL + pgvector
**Referencia**: https://github.com/nitin27may/e-commerce-agents

```python
# Arquitectura de 6 agentes A2A (basada en nitin27may/e-commerce-agents)

# Agente 1: Product Discovery
# Responsable de: búsqueda semántica, recomendaciones, catálogo

# Agente 2: Order Management  
# Responsable de: creación, tracking, modificación de pedidos

# Agente 3: Pricing Intelligence
# Responsable de: precios dinámicos, descuentos, comparación competitiva

# Agente 4: Review Analyzer
# Responsable de: análisis de reseñas, sentiment, respuesta automática

# Agente 5: Inventory Controller
# Responsable de: stock alerts, reposición automática, forecasting

# Agente 6: Customer Support
# Responsable de: atención al cliente, devoluciones, escalamiento

# Orquestador A2A
from microsoft_agent_framework import AgentOrchestrator, A2AProtocol

orchestrator = AgentOrchestrator(protocol=A2AProtocol())

# Flujo de compra agentico completo:
# User query → Product Discovery Agent
#            → Pricing Agent (best offer)
#            → Inventory Agent (stock check)
#            → Order Management Agent (create order)
#            → Customer Support Agent (confirmation + tracking)
```
- **Tiempo estimado**: 4-6 semanas (2 devs)
- **Costo**: $60k-$120k
- **ROI**: Operación 24/7 sin staff, reducción de OPEX operaciones 40-60%

---

## P4 — Inventory Agent Autónomo
**Objetivo**: gestión autónoma de inventario con forecasting y reposición automática
**Stack**: InvAgent + stockpyl + Medusa.js + alertas

```python
# Paso 1: Configurar InvAgent (github.com/zefang-liu/InvAgent)
# InvAgent orquesta múltiples LLM agents para inventory management

# Paso 2: Integrar stockpyl para optimización matemática
import stockpyl.supply_chain_node as scn
import stockpyl.policy as pol

# Definir política de inventario (s, S)
node = scn.SupplyChainNode(
    index=1,
    name="Almacén Principal",
    echelon_holding_cost=0.5,
    stockout_cost=20,
    demand_source=scn.DemandSource(type='N', mean=100, standard_deviation=20),
    supply_lead_time=7
)

# Política base-stock óptima
policy = pol.Policy(type='BS', base_stock_level=150)
node.inventory_policy = policy

# Paso 3: Agente que ejecuta reposición automática
def inventory_agent_loop():
    """Agente que monitorea y actúa sobre inventario"""
    while True:
        current_stock = medusa.inventory.get_current()
        
        # InvAgent evalúa situación y recomienda acción
        action = inv_agent.evaluate(
            current_stock=current_stock,
            demand_forecast=forecaster.predict(horizon=30),
            supplier_lead_times=get_lead_times()
        )
        
        if action.type == "REORDER":
            # Crear orden de compra automáticamente
            medusa.purchase_orders.create(
                supplier_id=action.supplier_id,
                quantity=action.quantity,
                sku=action.sku
            )
            notify_team(f"Orden automática: {action.sku} x{action.quantity}")
```
- **Tiempo estimado**: 3-4 semanas
- **Costo**: $40k-$80k
- **ROI**: Reducción de stockouts 30-50%, reducción de overstock 20-40%

---

## P5 — WooCommerce + TikTok Ads MCP + Agente de Campañas
**Objetivo**: automatizar campañas de social commerce en TikTok para tiendas WooCommerce
**Stack**: WooCommerce MCP + TikTok Ads MCP + Claude + nexscope-skills

```python
# Configurar agente con acceso a WooCommerce + TikTok Ads vía MCP
import anthropic

client = anthropic.Anthropic()

# MCP config con ambos servers
# woocommerce-mcp: acceso a productos, órdenes, stock
# tiktok-ads-mcp: creación y gestión de campañas

system_prompt = """Eres un agente de social commerce para [Marca LATAM].
Tienes acceso a:
- WooCommerce: catálogo, precios, stock en tiempo real
- TikTok Ads: creación de campañas, targeting, analytics
- Instrucciones del catálogo disponibles vía nexscope-ai/eCommerce-Skills

Tu trabajo diario:
1. Revisar productos con alto stock y bajo movimiento → crear campañas TikTok
2. Monitorear campañas activas → ajustar presupuesto según performance
3. Detectar productos trending en TikTok → aumentar stock si hay en catálogo
4. Reportar ROI diario por canal"""

# Ejecutar loop agentico diario
response = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=4096,
    system=system_prompt,
    messages=[{"role": "user", "content": "Ejecuta el ciclo diario de optimización de campañas"}]
)
```
- **Tiempo estimado**: 2-3 semanas
- **Costo**: $30k-$60k
- **ROI**: Social commerce +21% YoY en LATAM, automatización de $5k-$50k/mes en ad spend

---

## P6 — AEO + Structured Data Agent (Answer Engine Optimization)
**Objetivo**: optimizar catálogo para ser encontrado por agentes AI (ChatGPT, Gemini, Perplexity)
**Stack**: Medusa.js + Claude Vision + schema.org + nexscope-skills

```python
# Agente que genera structured data para cada producto
import anthropic
import json

client = anthropic.Anthropic()

def generate_product_schema(product: dict) -> dict:
    """Genera schema.org JSON-LD optimizado para AI engines"""
    
    prompt = f"""Eres un experto en AEO (Answer Engine Optimization) para retail.
    
    Genera un schema.org Product JSON-LD completo y optimizado para este producto:
    {json.dumps(product)}
    
    Incluye:
    - @type: Product
    - name, description (optimizada para búsquedas conversacionales)
    - offers: price, availability, shippingDetails
    - aggregateRating (si hay reviews)
    - brand, manufacturer
    - additionalProperty: características técnicas clave
    
    El objetivo es que agentes como ChatGPT y Gemini puedan responder preguntas sobre 
    este producto con información precisa directamente desde el structured data."""
    
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2048,
        messages=[{"role": "user", "content": prompt}]
    )
    
    return json.loads(response.content[0].text)

# Ejecutar sobre todo el catálogo Medusa
products = medusa_client.products.list(limit=1000)
for product in products:
    schema = generate_product_schema(product)
    medusa_client.products.update(product.id, metadata={"schema_org": schema})
    inject_jsonld_in_storefront(product.id, schema)
```
- **Tiempo estimado**: 1-2 semanas
- **Costo**: $15k-$30k
- **ROI**: AI-referred traffic (ya +805% YoY) → conversión estimada 31% superior a tráfico orgánico

---

## P7 — DeerFlow para Research y Comparación de Productos
**Objetivo**: agente de research profundo para buyers B2B o comparación de productos complejos
**Stack**: bytedance/deer-flow + MCP tools de catálogos + Claude

```python
# DeerFlow orquesta sub-agents para research exhaustivo de productos

# Configuración de DeerFlow con MCP tools de retail
deer_flow_config = {
    "model": "claude-sonnet-5",
    "tools": [
        "medusa_mcp",      # catálogo propio
        "web_search",      # comparación con competidores
        "price_tracker",   # historical price data
    ],
    "memory": True,
    "subagents": True,
    "report_format": "product_comparison"
}

# Caso de uso: buyer B2B buscando los mejores proveedores de laptops
task = """
Research y compara las 5 mejores opciones de laptops para flota corporativa (200 unidades):
- Precio unitario + precio volumen
- Especificaciones técnicas vs necesidades declaradas
- Garantía y soporte en Argentina
- Disponibilidad de stock
- ROI a 3 años
Genera un informe de compra con recomendación final.
"""

# DeerFlow spawna sub-agents en paralelo para cada proveedor
# y consolida en un report con recomendación fundamentada
```
- **Tiempo estimado**: 1-2 semanas de integración
- **Costo**: $20k-$40k
- **ROI**: Reducción de tiempo de proceso de compra B2B 60-80%

---

## P8 — Supply Chain AI Completo con Odoo 20
**Objetivo**: supply chain autónoma con Odoo 20 Agentic AI + agentes especializados
**Stack**: Odoo 20 + awesome-supply-chain skills + InvAgent + stockpyl

```python
# Odoo 20 (sep 2026) incluye Agentic AI nativo
# Este patrón combina Odoo 20 con agentes especializados adicionales

# awesome-supply-chain provee 132 skills:
# - demand_forecasting: predice demanda por SKU, región, temporada
# - s_op_planning: Sales & Operations Planning automatizado
# - supplier_negotiation: análisis de offers y scoring de proveedores
# - logistics_optimization: rutas de entrega, picking paths

# Flujo completo:
# 1. Odoo 20 Agentic AI detecta nivel bajo de stock en 15 SKUs
# 2. Invoca demand_forecasting skill → proyección próximos 60 días
# 3. InvAgent calcula cantidad óptima de reorden (stockpyl EOQ/Wagner-Whitin)
# 4. Odoo 20 crea RFQ (Request for Quotation) automáticamente a proveedores
# 5. supplier_negotiation skill evalúa respuestas y recomienda proveedor
# 6. Odoo 20 aprueba PO si está dentro de parámetros aprobados
# 7. Alerta a buyer humano solo para excepciones (>$50k, nuevo proveedor)

from odoo_api import OdooAPI
import awesome_supply_chain as asc

odoo = OdooAPI(url="https://mi-odoo.com", db="produccion")

# Trigger agentico en Odoo 20
def autonomous_procurement_agent():
    low_stock_items = odoo.stock.quant.search_read(
        [('qty_available', '<', 'reorder_point')],
        fields=['product_id', 'qty_available', 'reorder_point']
    )
    
    for item in low_stock_items:
        # Forecasting con skill especializada
        demand = asc.demand_forecasting(
            product_id=item['product_id'][0],
            horizon_days=60,
            historical_orders=odoo.sale.order.line.search_read(...)
        )
        
        # Cantidad óptima con stockpyl
        optimal_qty = calculate_eoq(demand, item['product_id'])
        
        # Crear RFQ en Odoo
        odoo.purchase.order.create({
            'partner_id': best_supplier_id,
            'order_line': [{'product_id': item['product_id'][0], 'qty': optimal_qty}]
        })
```
- **Tiempo estimado**: 6-10 semanas (requiere Odoo 20, disponible sep 2026)
- **Costo**: $80k-$200k
- **ROI**: Reducción de stockouts 40-60%, OPEX supply chain -25-35%

---

## P9 — Cross-Border eCommerce LATAM con nexscope Skills
**Objetivo**: tienda con capacidades de cross-border para LATAM (AR, BR, MX)
**Stack**: WooCommerce + nexscope-ai/eCommerce-Skills (cross-border-skill) + WhatsApp API

```python
# nexscope-ai/eCommerce-Skills incluye cross-border-ecommerce/SKILL.md:
# - Cálculo de aranceles y regulaciones aduaneras por país
# - Optimización de listings para cada marketplace local
# - Gestión de devoluciones internacionales
# - Soporte multi-moneda (ARS, BRL, MXN)
# - Detección de restricciones de importación

# Integración con WhatsApp para soporte LATAM
from whatsapp_business_api import WhatsAppClient
import anthropic

wa = WhatsAppClient(token=WHATSAPP_TOKEN)
claude = anthropic.Anthropic()

def handle_cross_border_query(from_number: str, message: str):
    """Agente de soporte para compradores internacionales"""
    
    system = """Eres el asistente de compras cross-border de [Marca].
    
    Tienes acceso a:
    - cross-border-skill: regulaciones de importación AR/BR/MX/CO
    - WooCommerce: catálogo, precios, disponibilidad
    - Calculadora de costos: producto + shipping + aranceles + IVA local
    
    Ayuda al comprador a entender:
    1. Si el producto puede ser enviado a su país
    2. Costo total (producto + envío + impuestos de importación)
    3. Tiempo estimado de entrega
    4. Proceso de devolución internacional"""
    
    response = claude.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        system=system,
        messages=[{"role": "user", "content": message}]
    )
    
    wa.send_message(to=from_number, body=response.content[0].text)
```
- **Tiempo estimado**: 2-3 semanas
- **Costo**: $30k-$60k
- **ROI**: Acceso a mercado LATAM cross-border. AR+BR+MX = 80% del eCommerce sudamericano.

---

## P10 — Store-Level AI: Visión Computacional en Retail Físico
**Objetivo**: inteligencia AI en el punto de venta físico (planogramas, shelf auditing, conversión)
**Stack**: shelfops (VLM) + Claude Vision + cámara IP + alertas

```python
# Basado en repo shelfops (IFAKA/shelfops)
# VLM analiza imágenes de estantes en tiempo real

import anthropic
import base64
from PIL import Image

client = anthropic.Anthropic()

def audit_shelf(image_path: str, planogram_path: str) -> dict:
    """Auditoría automática de estante vs planograma esperado"""
    
    # Cargar imagen de cámara y planograma esperado
    shelf_image = encode_image(image_path)
    planogram = encode_image(planogram_path)
    
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2048,
        messages=[{
            "role": "user",
            "content": [
                {"type": "image", "source": {"type": "base64", "media_type": "image/jpeg", "data": shelf_image}},
                {"type": "image", "source": {"type": "base64", "media_type": "image/jpeg", "data": planogram}},
                {"type": "text", "text": """Compara el estante actual (imagen 1) con el planograma esperado (imagen 2).
                
                Reporta:
                1. Productos fuera de posición (lista con ubicación)
                2. Huecos de stock vacíos (gaps)
                3. Productos con facing incorrecto
                4. Precio faltante o incorrecto
                5. Score de compliance 0-100
                6. Acciones prioritarias para reposición
                
                Responde en JSON."""}
            ]
        }]
    )
    
    return json.loads(response.content[0].text)

# Ejecutar cada 15 minutos por cámara de estante
# Alertar al repositor si compliance < 80
# Integrar con WooCommerce/Odoo para actualizar stock en tiempo real
```
- **Tiempo estimado**: 3-4 semanas
- **Costo**: $40k-$80k + hardware (cámaras IP)
- **ROI**: +5-10% ventas por mejor disponibilidad en estante, reducción de shrinkage 15-20%

---

## P11 — Chatbot de Atención al Cliente con RAG sobre Catálogo
**Objetivo**: agente conversacional que conoce el catálogo completo y atiende 24/7
**Stack**: Dify (self-hosted) + Medusa API + pgvector + Claude

```python
# Dify (langgenius/dify) orquesta el flujo de RAG + conversación
# Configuración de knowledge base con catálogo Medusa

# 1. Indexar catálogo en Dify
# - Sync automático desde Medusa API cada hora
# - Embeddings de descriptions + specs + FAQs + políticas
# - pgvector para búsqueda semántica

# 2. Flujo de conversación en Dify (visual builder):
# User message → Intent classification
#              → Si es consulta de producto → RAG sobre catálogo
#              → Si es estado de pedido → Medusa API
#              → Si es reclamo → escalamiento a humano
#              → Si es recomendación → agente de personalization

# 3. Integración multicanal (Dify soporta nativamente):
# - Web chat widget (Medusa storefront)
# - WhatsApp Business API
# - Instagram DM
# - Email
```
- **Tiempo estimado**: 2-3 semanas
- **Costo**: $25k-$50k
- **ROI**: Resolución de consultas 24/7 sin staff, ticket resolution time -70%

---

## P12 — Demand Forecasting Agentico con RL
**Objetivo**: predecir demanda por SKU con agente de RL + LLM para contexto
**Stack**: reco-gym (Criteo) + stockpyl + DeerFlow + Medusa

```python
# reco-gym provee el entorno RL para simular interacciones de usuarios
# Permite entrenar agentes de recomendación antes de producción

from recogym import env_1_args, make_env
import gym
import numpy as np

# Entorno de simulación con datos históricos de la tienda
P = 100  # número de productos en catálogo
env_args = {**env_1_args, 'num_products': P}
env = gym.make('RecoGym-v1')
env = env.unwrapped
env.init_gym(env_args)

# Entrenar agente de recomendación con datos históricos
# Luego deployar en Medusa como servicio de recomendación

# Complementar con LLM para contexto cualitativo:
# - Tendencias de TikTok (via DeerFlow research)
# - Eventos estacionales (Navidad, Día de la Madre, Hot Sale LATAM)
# - Stock actual (via Medusa MCP)
# = Demand forecast contextualizado

def contextual_demand_agent(sku: str, horizon_days: int = 30):
    """Combina RL con contexto LLM para forecasting superior"""
    
    # Base: predicción RL del reco-gym entrenado
    rl_forecast = rl_agent.predict(sku=sku, horizon=horizon_days)
    
    # Contexto: DeerFlow research sobre tendencias del producto
    context = deerflow.research(
        query=f"tendencias y eventos que afectan demanda de {sku} próximos {horizon_days} días LATAM"
    )
    
    # Claude ajusta el forecast con contexto
    adjusted = claude.messages.create(
        model="claude-sonnet-5",
        messages=[{
            "role": "user",
            "content": f"Base forecast: {rl_forecast}\nContexto de mercado: {context}\nAjusta el forecast y justifica."
        }]
    )
    
    return adjusted
```
- **Tiempo estimado**: 4-6 semanas
- **Costo**: $50k-$100k
- **ROI**: Forecast accuracy +20-35% vs ARIMA básico → menos stockouts y overstock

---

## Quick wins (1 semana o menos)

| Quick Win | Stack | Costo | ROI esperado |
|-----------|-------|-------|-------------|
| AEO Structured Data | Claude + schema.org | $5k-$10k | +AI traffic en 30 días |
| WooCommerce MCP | woocommerce-mcp + Claude | $8k-$15k | Customer service 24/7 |
| ACP endpoint básico | ACP spec + Medusa | $5k-$15k | Visible en ChatGPT Shopping |
| UCP manifest.json | UCP spec + cualquier backend | $3k-$8k | Visible en Google AI Shopping |
| nexscope Skills plugin | eCommerce-Skills + Claude Code | $5k-$10k | Productividad del equipo +40% |

---
*Globant AI Studios — Retail & eCommerce Patterns. v9 — 2026-07-14. 12 patrones totales.*
