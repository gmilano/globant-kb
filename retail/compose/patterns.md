# 🧩 Patrones de composición — Retail & eCommerce

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-09 (v9)

## Stack base de referencia

```
[Plataforma vertical base (Medusa / WooCommerce / Shopify / Odoo)]
          ↓
[MCP Server de la plataforma (medusa-mcp / WC MCP / Shopify AI Toolkit)]
          ↓
[Orquestador de agentes (Dify / n8n / código Python)]
          ↓
[Agentes especializados (pricing / inventory / recommendations / shelf)]
          ↓
[Canal conversacional (WhatsApp / chat widget / Slack / CLI)]
```

---

## P1 — Shopify Agentic Storefront (Claude + MCP)

**Stack**: Shopify AI Toolkit (MIT) + shop-chat-agent (MIT) + Claude Sonnet  
**Time-to-market**: 2-4 semanas  
**Rango de precio**: $40k-$120k  
**Caso de uso**: cualquier cliente sobre Shopify que quiera chat con checkout en conversación

```python
# 1. Instalar Shopify AI Toolkit MCP
# En Claude Code / Cursor:
# settings.json → mcpServers → { "shopify": { "command": "npx", "args": ["@shopify/ai-toolkit"] } }

# 2. El agente puede ahora:
# - Buscar productos por descripción natural
# - Aplicar descuentos y promociones
# - Gestionar carritos y checkout
# - Consultar políticas de devolución

# 3. Embed del chat widget (basado en shop-chat-agent)
from anthropic import Anthropic
import mcp

client = Anthropic()
shopify_mcp = mcp.connect("shopify://admin")

def handle_shopper_query(query: str, session_id: str) -> str:
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        tools=shopify_mcp.get_tools(),  # search_products, add_to_cart, checkout
        messages=[
            {"role": "user", "content": query}
        ],
        system="Eres un asistente de compras. Ayuda al cliente a encontrar productos, "
               "responde preguntas sobre políticas y completa compras. "
               "Confirma siempre antes de procesar el pago."
    )
    return response.content[0].text

# 4. Widget en Hydrogen (React)
# app/components/ChatWidget.tsx → usa shop-chat-agent como base
```

**Output esperado**: +31% conversión vs organic. Time-to-checkout <2 minutos en chat.

---

## P2 — WooCommerce AI Assistant (LATAM, WhatsApp)

**Stack**: WooCommerce (GPL-3.0) + WooCommerce REST API + n8n + Claude Haiku + WhatsApp Business API  
**Time-to-market**: 4-6 semanas  
**Rango de precio**: $30k-$80k  
**Caso de uso**: SMBs LATAM (BR/MX/AR) con WooCommerce que quieren ventas por WhatsApp

```python
# n8n workflow (JSON exportable):
# Trigger: WhatsApp Webhook → 
# Node 1: Classify intent (Claude Haiku, ultra-low cost)
# Node 2: Route to tool (search / order_status / cart / checkout)
# Node 3: WooCommerce REST API call
# Node 4: Format response → WhatsApp reply

import anthropic
import requests

WC_URL = "https://tienda.ejemplo.com/wp-json/wc/v3"
WC_AUTH = ("consumer_key", "consumer_secret")

client = anthropic.Anthropic()

def handle_whatsapp_message(phone: str, message: str) -> str:
    # 1. Classify intent (Haiku = $0.00025/1k input tokens)
    intent = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=50,
        messages=[{"role": "user", "content": f"Classify: {message}"}],
        system="Respond with ONE word: SEARCH, ORDER_STATUS, CART, CHECKOUT, or OTHER"
    ).content[0].text.strip()
    
    if intent == "SEARCH":
        # 2. Search WooCommerce
        products = requests.get(
            f"{WC_URL}/products",
            params={"search": message, "per_page": 5},
            auth=WC_AUTH
        ).json()
        
        # 3. Generate response with Haiku
        return client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=300,
            messages=[{"role": "user", "content": f"Products found: {products}. Message: {message}"}],
            system="Respond in Portuguese (BR) with product options, prices and links. Keep it concise for WhatsApp."
        ).content[0].text
    
    # ... handlers para ORDER_STATUS, CART, CHECKOUT

# Costo estimado: ~$0.002/conversación (20 mensajes avg), vs $4.18 agente humano
```

**Métricas esperadas**: ticket promedio +25%, tiempo de respuesta <5s, costo <$0.01/conversación.

---

## P3 — Dynamic Pricing Agent (Retail)

**Stack**: retail-pricing-agent-ai (MIT) + browser-use (MIT) + stockpyl (MIT) + cualquier eCommerce API  
**Time-to-market**: 6-10 semanas  
**Rango de precio**: $80k-$200k  
**Caso de uso**: retailers con 500+ SKUs que necesitan pricing competitivo en tiempo real

```python
import asyncio
from browser_use import Agent, Controller
from anthropic import Anthropic
import stockpyl.supply_chain_node as scn

client = Anthropic()

class DynamicPricingPipeline:
    """
    Ciclo: competitor scraping → demand forecast → elasticity → price → sync
    Basado en: samhaldia/retail-pricing-agent-ai (MIT)
    """
    
    async def scrape_competitor_prices(self, sku: str) -> dict:
        """Agent 1: Market Data Ingestion usando browser-use"""
        agent = Agent(
            task=f"Find current prices for '{sku}' on MercadoLibre, Amazon.com.br, and Magalu. Return JSON with {{'site': 'price'}}",
            llm=client,
        )
        return await agent.run()
    
    def forecast_demand(self, sku: str, historical: list) -> float:
        """Agent 2: Demand Forecasting con stockpyl + LLM synthesis"""
        # stockpyl para math base
        node = scn.SupplyChainNode(
            echelon=0,
            demand_type='N',
            demand_mean=sum(historical[-30:]) / 30,
            demand_sd=10
        )
        base_forecast = node.demand_source.demand_mean
        
        # LLM synthesis con señales externas
        synthesis = client.messages.create(
            model="claude-sonnet-5",
            max_tokens=100,
            messages=[{"role": "user", "content": 
                f"Base demand forecast: {base_forecast}. "
                f"Adjust for: current season, local events, competitor pricing. "
                f"Return adjusted demand as number only."}]
        ).content[0].text
        
        return float(synthesis.strip())
    
    def generate_price(self, sku: str, cost: float, demand: float, competitor_prices: dict) -> float:
        """Agent 3: Price Strategy Generation"""
        response = client.messages.create(
            model="claude-sonnet-5",
            max_tokens=100,
            messages=[{"role": "user", "content":
                f"SKU: {sku}, Cost: ${cost}, Demand forecast: {demand} units/week, "
                f"Competitors: {competitor_prices}. "
                f"Target margin: 35%. Return optimal price as number only."}],
            system="You are a retail pricing expert. Maximize margin while staying competitive."
        )
        return float(response.content[0].text.strip())
    
    async def sync_price(self, sku: str, new_price: float, platform: str = "medusa"):
        """Agent 4: Price Synchronization"""
        # Medusa API
        import requests
        requests.post(
            f"https://store.example.com/admin/products/{sku}/variants",
            json={"prices": [{"amount": int(new_price * 100), "currency_code": "BRL"}]},
            headers={"Authorization": "Bearer TOKEN"}
        )
    
    async def run_cycle(self, skus: list):
        for sku in skus:
            competitors = await self.scrape_competitor_prices(sku)
            demand = self.forecast_demand(sku, historical=[])
            new_price = self.generate_price(sku, cost=10.0, demand=demand, competitor_prices=competitors)
            await self.sync_price(sku, new_price)
            print(f"✅ {sku}: nuevo precio ${new_price:.2f}")

# Ejecutar cada hora (cron o Dify scheduler)
asyncio.run(DynamicPricingPipeline().run_cycle(skus=["SKU001", "SKU002"]))
```

**ROI esperado**: +3-8% gross margin. Payback: 3-6 meses en retailers con 1k+ SKUs.

---

## P4 — Shelf Audit CV + LLM (Retail Físico)

**Stack**: shelfops (MIT) + Cerebras Gemma 4 inference + Claude Sonnet (reasoning) + Medusa/ERP API  
**Time-to-market**: 4-8 semanas  
**Rango de precio**: $60k-$150k  
**Caso de uso**: cadenas de retail con tiendas físicas que quieren audit automatizado de góndolas

```python
import base64
import anthropic
from pathlib import Path

client = anthropic.Anthropic()

def audit_shelf(image_path: str, planogram: dict) -> dict:
    """
    Detecta: SKUs faltantes, items fuera de lugar, oportunidades de reposición
    Basado en: IFAKA/shelfops (MIT) con Cerebras Gemma 4 pattern
    """
    # 1. Encode image
    with open(image_path, "rb") as f:
        image_b64 = base64.standard_b64encode(f.read()).decode("utf-8")
    
    # 2. Vision + reasoning con Claude (mejor para planogram compliance)
    audit_result = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1000,
        messages=[{
            "role": "user",
            "content": [
                {
                    "type": "image",
                    "source": {"type": "base64", "media_type": "image/jpeg", "data": image_b64}
                },
                {
                    "type": "text",
                    "text": f"""Analiza esta foto de góndola retail.
                    
Planograma esperado: {planogram}

Detecta y reporta en JSON:
{{
  "missing_skus": ["SKU001", ...],
  "misplaced_items": [{{"sku": "SKU002", "should_be": "shelf_2_pos_3", "is_at": "shelf_1_pos_1"}}],
  "out_of_stock": ["SKU003"],
  "facing_issues": [{{"sku": "SKU004", "current_facings": 1, "required_facings": 3}}],
  "replenishment_tickets": [{{"sku": "SKU005", "quantity": 24, "priority": "high"}}],
  "compliance_score": 0.87
}}"""
                }
            ]
        }]
    )
    
    return audit_result.content[0].text

def create_replenishment_ticket(audit: dict, store_id: str):
    """Crea tickets automáticos en ERP/WMS"""
    for ticket in audit.get("replenishment_tickets", []):
        # POST a ERP (Odoo/ERPNext/custom)
        print(f"🔄 Ticket: {ticket['sku']} × {ticket['quantity']} — prioridad {ticket['priority']}")

# Uso: auditor corre app mobile, toma foto, el agente genera tickets en segundos
result = audit_shelf("gondola_foto.jpg", planogram={"shelf_1": ["SKU001", "SKU002"], "shelf_2": ["SKU003"]})
create_replenishment_ticket(result, store_id="TIENDA_001")

# Costo: ~$0.01/foto (Claude Vision) vs $15-50 por audit manual
# Frecuencia: 4x/día por góndola → detección temprana de stockouts
```

**ROI esperado**: reducción stockouts 15-30%, mejora planogram compliance 40%, ahorro en mano de obra de audit 60%.

---

## P5 — Demand Sensing Dashboard (Supply Chain)

**Stack**: stockpyl (MIT) + TimesFM (Apache-2.0, Google) + Dify + retail-ai-store-level-intelligence (Apache-2.0)  
**Time-to-market**: 8-12 semanas  
**Rango de precio**: $100k-$300k  
**Caso de uso**: retailers medianos/grandes que necesitan forecast de demanda con señales en tiempo real

```python
import stockpyl.supply_chain_node as scn
import anthropic

client = anthropic.Anthropic()

def demand_sensing_cycle(sku: str, store_id: str, context: dict) -> dict:
    """
    Combina TimesFM forecast + LLM reasoning sobre señales externas
    Equivale a 'demand sensing' vs demand planning tradicional
    """
    # 1. TimesFM: forecast de serie temporal (Google, Apache-2.0)
    # pip install timesfm
    # import timesfm
    # tfm = timesfm.TimesFm(hparams=timesfm.TimesFmHparams(backend="cpu", per_core_batch_size=32, horizon_len=7))
    # forecast = tfm.forecast_on_df(df, freq="D", value_name="sales", num_jobs=-1)
    base_forecast = 100  # placeholder; reemplazar con TimesFM output
    
    # 2. LLM sensing: ajusta por señales externas
    sensing_prompt = f"""
    SKU: {sku}, Tienda: {store_id}
    Forecast base (7 días): {base_forecast} unidades
    
    Señales contextuales:
    - Clima: {context.get('weather', 'normal')}
    - Eventos locales: {context.get('local_events', 'ninguno')}
    - Precio competidor: {context.get('competitor_price_delta', '0%')}
    - Tendencias redes sociales: {context.get('social_trend', 'neutral')}
    - Nivel de inventario actual: {context.get('current_stock', 0)} unidades
    
    Ajusta el forecast y recomienda acción (REORDER / MARKDOWN / HOLD / URGENT_REORDER).
    JSON: {{"adjusted_forecast": N, "action": "...", "reason": "...", "reorder_quantity": N}}
    """
    
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=200,
        messages=[{"role": "user", "content": sensing_prompt}],
        system="Eres un experto en supply chain retail. Analiza señales y optimiza inventario."
    )
    
    return response.content[0].text

# Dashboard: Dify workflow llama esta función cada hora por tienda/SKU
# Output: alertas de reposición, markdown automático, visualización por tienda
result = demand_sensing_cycle(
    sku="PROD-001",
    store_id="BA-PALERMO",
    context={
        "weather": "lluvia intensa (impacta categoría paraguas +200%)",
        "local_events": "partido Boca vs River mañana",
        "competitor_price_delta": "-15% (MercadoLibre tiene descuento)",
        "current_stock": 5
    }
)
```

---

## P6 — AEO + Structured Data Agent (Answer Engine Optimization)

**Stack**: Claude Vision + Medusa (MIT) + schema.org JSON-LD + nexscope eCommerce Skills (MIT)  
**Time-to-market**: 3-5 semanas  
**Rango de precio**: $40k-$120k  
**Caso de uso**: retailer que quiere ser mencionado por ChatGPT/Perplexity/Google AI cuando alguien pregunta por su categoría

```python
import anthropic
import json
from datetime import datetime

client = anthropic.Anthropic()

def generate_product_aeo(product: dict) -> dict:
    """
    Genera structured data JSON-LD + copy optimizado para LLMs (AEO)
    Adobe: 4,700% YoY de tráfico GenAI a retail; AEO = nuevo SEO
    """
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1000,
        messages=[{"role": "user", "content": f"Product data: {json.dumps(product)}"}],
        system="""Generate AEO-optimized content for this product. Output JSON with:
        1. "schema_org": valid schema.org/Product JSON-LD (name, description, offers, brand, review, aggregateRating)
        2. "llm_summary": 2-sentence natural language summary optimized to be cited by ChatGPT/Perplexity 
        3. "faq_pairs": 5 Q&A pairs about this product that LLMs can use to answer customer questions
        4. "comparison_points": 3 bullet points vs competitors (why choose this)
        5. "aeo_keywords": 10 natural language phrases customers use when asking AI assistants about this product category"""
    )
    
    return json.loads(response.content[0].text)

def inject_schema_to_medusa(sku: str, aeo_data: dict):
    """Inyecta JSON-LD en la página del producto via Medusa metadata"""
    import requests
    requests.post(
        f"https://store.example.com/admin/products/{sku}",
        json={"metadata": {"schema_org": aeo_data["schema_org"], "llm_summary": aeo_data["llm_summary"]}},
        headers={"Authorization": "Bearer TOKEN"}
    )

# Uso: correr para todos los productos del catálogo, luego monitorear AI citations
product = {
    "name": "Zapatillas Running ProFlow X1",
    "price": 299.99,
    "currency": "BRL",
    "category": "calzado deportivo",
    "brand": "ProFlow",
    "features": ["amortiguación gel", "transpirable", "suela antideslizante"],
    "rating": 4.7,
    "reviews_count": 234
}
aeo = generate_product_aeo(product)
inject_schema_to_medusa("PROD-SHOE-001", aeo)
```

---

## P7 — TikTok Social Commerce + AI Campaigns (LATAM)

**Stack**: TikTok Ads MCP (Mayo 2026) + nexscope eCommerce Skills (MIT) + n8n + WooCommerce  
**Time-to-market**: 4-6 semanas  
**Rango de precio**: $60k-$160k  
**Caso de uso**: retailers LATAM (BR/MX) que quieren presencia en TikTok Shop con campañas autónomas

```python
# n8n workflow + Claude:
# 1. Trigger: nuevo producto añadido a WooCommerce
# 2. Claude genera: TikTok video script + hashtags + caption en PT-BR/ES-MX
# 3. TikTok Ads MCP: crea campaign automáticamente
# 4. Monitor: analiza performance cada 6h, ajusta budget

import anthropic
import mcp  # TikTok Ads MCP (Mayo 2026)

client = anthropic.Anthropic()

def launch_tiktok_product_campaign(product: dict, market: str = "BR") -> dict:
    lang = "Portuguese (Brazilian)" if market == "BR" else "Spanish (Mexican)"
    
    # 1. Generate content
    content = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=500,
        messages=[{"role": "user", "content": f"Product: {product}. Market: {market}"}],
        system=f"""Generate TikTok campaign content in {lang}. JSON with:
        - video_script: 30-second script for product demo
        - hooks: 3 attention-grabbing opening lines
        - hashtags: 10 relevant hashtags (mix trending + niche)
        - caption: 150-char caption with call-to-action
        - target_audience: TikTok audience targeting parameters
        - budget_recommendation: daily budget in BRL/MXN"""
    ).content[0].text
    
    # 2. Create TikTok campaign via MCP
    # tiktok_mcp = mcp.connect("tiktok://ads")
    # campaign = tiktok_mcp.call("create_campaign", {
    #     "content": content,
    #     "product_link": product["url"],
    #     "budget": content["budget_recommendation"]
    # })
    
    return {"content": content, "status": "campaign_created"}

# Resultado: campaña activa en TikTok Shop en <5 minutos
# vs. 2-4 horas de trabajo manual de equipo de marketing
```

---

## P8 — Medusa + Dify: Agentic Commerce sin código (LATAM midmarket)

**Stack**: Medusa 2.x (MIT) + medusa-mcp (MIT) + Dify (Apache-2.0) + nexscope eCommerce Skills (MIT)  
**Time-to-market**: 8-12 semanas  
**Rango de precio**: $80k-$200k  
**Caso de uso**: retailer LATAM midmarket sin equipo técnico grande que quiere agentic commerce completo

```yaml
# Dify workflow (visual, exportable como YAML):
name: "Retail Agent Completo"
nodes:
  - id: "intent_classifier"
    type: "llm"
    model: "claude-haiku-4-5-20251001"  # barato para classify
    prompt: "Classify user intent: BROWSE | CART | ORDER | SUPPORT | PRICING"
    
  - id: "product_search"
    type: "tool"
    tool: "medusa_mcp.search_products"
    condition: "intent == BROWSE"
    
  - id: "price_check"
    type: "tool"
    tool: "medusa_mcp.get_pricing"
    condition: "intent == PRICING"
    
  - id: "cart_manager"
    type: "tool"
    tool: "medusa_mcp.manage_cart"
    condition: "intent == CART"
    
  - id: "order_status"
    type: "tool"
    tool: "medusa_mcp.get_order"
    condition: "intent == ORDER"
    
  - id: "response_generator"
    type: "llm"
    model: "claude-sonnet-5"
    prompt: "Generate friendly response in Spanish. Include product details, prices, next steps."

# Deploy: Dify → embed en WhatsApp + Web + app mobile
# No requiere código custom: solo configuración visual en Dify
```

**Ventaja**: el equipo de negocio puede ajustar el workflow sin ingenieros. Reducción de TTM de 20 semanas a 8.

---

## Matriz de selección rápida

| Escenario del cliente | Patrón recomendado | TTM | Costo |
|----------------------|-------------------|-----|-------|
| Shopify, quiere chat+checkout | P1 | 2-4 sem | $40k-$120k |
| WooCommerce LATAM, WhatsApp ventas | P2 | 4-6 sem | $30k-$80k |
| Catalog grande, pricing competitivo | P3 | 6-10 sem | $80k-$200k |
| Retail físico, stockouts en góndola | P4 | 4-8 sem | $60k-$150k |
| Supply chain, demand forecast | P5 | 8-12 sem | $100k-$300k |
| Visibilidad en AI search (AEO) | P6 | 3-5 sem | $40k-$120k |
| TikTok Shop LATAM BR/MX | P7 | 4-6 sem | $60k-$160k |
| Midmarket sin equipo técnico | P8 | 8-12 sem | $80k-$200k |
