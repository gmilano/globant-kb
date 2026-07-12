# 🧩 Patrones de composición — Retail & Ecommerce AI

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-12

## Arquitectura base

```
[Plataforma ecommerce/ERP (Medusa / Saleor / Shopify UCP / ERPNext)]
              ↓
     [MCP Server (medusa-mcp / UCP endpoint / mcp-product)]
              ↓
[Agentes especializados (LangGraph / CrewAI / MAF / shop-chat-agent)]
              ↓
   [LLM (Claude Haiku para volumen / Sonnet para análisis)]
              ↓
  [UI / Canal (Next.js storefront / WhatsApp / UCP / ACP)]
```

---

## Patrón 1: AI Shopping Agent con ACP/UCP (ecommerce agéntico)

**Objetivo**: Permitir que los AI shopping agents de los usuarios completen compras autónomamente en tu tienda.

**Stack**:
- Backend: [medusajs/medusa](https://github.com/medusajs/medusa) (MIT) — tienda con catálogo y orders
- MCP: [SGFGOV/medusa-mcp](https://github.com/SGFGOV/medusa-mcp) (MIT) — expone Medusa via MCP
- Checkout protocol: [agentic-commerce-protocol](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol) (Apache-2.0)
- Pagos: Stripe / PayPal con Shared Payment Token (ACP-compatible)
- Alternativa Shopify: UCP endpoint público (sin aprobación desde Spring '26)

**Flujo**:
```
AI shopping agent del usuario
  → ACP/UCP endpoint: GET /catalog/search?q=zapatillas running talla 42
  → ACP/UCP endpoint: POST /cart {sku, qty}
  → ACP/UCP endpoint: POST /checkout/session
  → ACP/UCP endpoint: POST /checkout/pay {payment_token}
  → Respuesta: order_id + tracking
```

**Tiempo estimado**: 3-4 semanas (Medusa existente); 1-2 semanas (Shopify existente con UCP Skill)
**Valor**: Visibilidad en canal de AI shopping agents — 1,200% crecimiento YoY

---

## Patrón 2: RAG sobre catálogo de productos (product Q&A)

**Objetivo**: Agente que responde preguntas en lenguaje natural sobre productos del catálogo.

**Stack**:
- Agente: [upsidelab/enthusiast](https://github.com/upsidelab/enthusiast) (MIT) — RAG anti-hallucination
- Plataforma: Medusa / Shopify / Shopware / Solidus (integración nativa en Enthusiast)
- Vector store: PostgreSQL + pgvector
- LLM: Claude Haiku (bajo costo, alta frecuencia)

**Configuración** (docker-compose):
```yaml
services:
  enthusiast:
    image: upsidelab/enthusiast:latest
    environment:
      SHOP_PLATFORM: medusa
      MEDUSA_API_URL: http://medusa:9000
      ANTHROPIC_API_KEY: ${ANTHROPIC_API_KEY}
      ANTHROPIC_MODEL: claude-haiku-4-5-20251001
  medusa:
    image: medusajs/medusa:latest
  db:
    image: pgvector/pgvector:pg16
```

**Tiempo estimado**: 1-2 semanas para MVP
**KPI esperados**: 40%+ de deflexión de queries de soporte al cliente

---

## Patrón 3: Demand Forecasting + Reposición Automática

**Objetivo**: Sistema agéntico que predice demanda, detecta riesgo de stockout y genera órdenes de reposición.

**Stack**:
- Forecasting: [LarrySnyder/stockpyl](https://github.com/LarrySnyder/stockpyl) (MIT) — modelos matemáticos
- Orquestación: LangGraph (MIT) — workflow con memoria y human-in-the-loop
- ERP: [frappe/erpnext](https://github.com/frappe/erpnext) (MIT) — inventario y órdenes de compra
- LLM: Claude Sonnet 5 — análisis cualitativo de señales externas

**Workflow LangGraph**:
```python
# Agentes especializados
forecaster_agent    # stockpyl models + Claude análisis de señales externas
replenishment_agent # cantidades óptimas + genera PO draft
approval_agent      # human-in-the-loop para órdenes > umbral
supplier_agent      # comunica órdenes aprobadas via EDI/API proveedor

# Grafo
START → forecaster → replenishment → approval_check
     → [auto_approve if <$5k] → supplier → END
     → [human_review if >$5k] → supplier → END
```

**Tiempo estimado**: 6-8 semanas
**ROI esperado**: 15-20% reducción en stockouts + 10-15% reducción en overstock

---

## Patrón 4: Multi-Agente ecommerce (referencia A2A)

**Objetivo**: Suite completa de agentes especializados para operar un ecommerce a escala.

**Stack de referencia**: [nitin27may/e-commerce-agents](https://github.com/nitin27may/e-commerce-agents) (MIT)

**6 agentes especializados**:
```
┌─────────────────────────────────────────────────────────┐
│                    ORCHESTRATOR AGENT                   │
├──────────┬──────────┬──────────┬──────────┬─────────────┤
│ Product  │  Orders  │ Pricing  │ Reviews  │  Inventory  │
│Discovery │  Agent   │  Agent   │  Agent   │   Agent     │
├──────────┴──────────┴──────────┴──────────┴─────────────┤
│              CUSTOMER SUPPORT AGENT                     │
├─────────────────────────────────────────────────────────┤
│    MCP Layer: mcp-product | mcp-inventory               │
├─────────────────────────────────────────────────────────┤
│    FastAPI Backend + PostgreSQL + pgvector              │
└─────────────────────────────────────────────────────────┘
```

**Comunicación**: A2A protocol (Microsoft Agent Framework v1.0)
**Tiempo estimado**: 8-12 semanas para implementación enterprise

---

## Patrón 5: WhatsApp Shopping Agent (LATAM)

**Objetivo**: Agente de compras por WhatsApp optimizado para mercados LATAM.

**Stack**:
- Canal: WhatsApp Business API (Meta)
- Orquestación: LangGraph (MIT) con memoria conversacional
- Catálogo: Medusa.js (MIT) + medusa-mcp (MIT)
- Checkout: ACP + MercadoPago (LATAM) o Stripe
- LLM: Claude Haiku 4.5 (bajo costo, alta velocidad para chat)

**Flujo de conversación**:
```
Usuario: "Hola! Busco regalo para niña de 8 años, presupuesto 500 pesos"
  → LangGraph state: {channel: whatsapp, intent: gift, age: 8, budget_ars: 500}
  → Tool: medusa-mcp.search_products({category: "niñas", age_range: "6-10", max_price: 500})
  → Claude: formatea respuesta con 3 opciones + imágenes
  → Usuario: "Me gusta la opción 2"
  → Tool: medusa-mcp.create_cart({product_id: "...", qty: 1})
  → ACP checkout → MercadoPago link
  → Confirmación automática
```

**Tiempo estimado**: 4-6 semanas para MVP
**Diferenciador**: Canal donde el cliente ya está; no necesita descargar app

---

## Patrón 6: AI Recommendations con LLM + RecSys híbrido

**Objetivo**: Motor de recomendaciones que combina collaborative filtering con comprensión en lenguaje natural.

**Stack**:
- Base: [microsoft/RecAI](https://github.com/microsoft/RecAI) InteRecAgent (MIT)
- RecSys: LightFM para candidato retrieval eficiente
- Embeddings: RecAI RecLM-emb para item retrieval semántico
- Cache: Redis semantic caching (patrón redis-developer/shopping-ai-agent-langgraph-js-demo)
- LLM: Claude Haiku para re-ranking con contexto en lenguaje natural

**Arquitectura**:
```
Request: user_id + context
  → RecLM-emb: top-100 candidatos por similitud semántica
  → Redis cache: ¿ya calculado para este contexto? → devuelve en <10ms
  → InteRecAgent LLM: re-ranking con contexto cualitativo
  → Output: top-10 recomendaciones con explicación natural
```

**Cold start resuelto**: LLM maneja nuevos usuarios via onboarding conversacional
**Tiempo estimado**: 5-7 semanas
**Uplift esperado**: 15-25% vs CF clásico en cold start + long tail

---

## Patrón 7: Shelf Intelligence para Retail Físico

**Objetivo**: Detección automática de out-of-stock, compliance de planograma y analytics de lineal.

**Stack**:
- Visión: Gemma 4 via Cerebras (velocidad) o local (costo) — [shelfops](https://github.com/IFAKA/shelfops)
- Arquitectura: [intel-iot-devkit/smart-retail-analytics](https://github.com/intel-iot-devkit/smart-retail-analytics) (Apache-2.0)
- Datos: PostgreSQL + timeseries (InfluxDB o Timescale)
- Alertas: LangGraph → webhook → WhatsApp/Slack al encargado de tienda
- Dashboard: Apache Superset

**Pipeline**:
```
Cámara IP → frame capture (cada 5 min)
  → Gemma 4 vision: detección de huecos + productos mal ubicados
  → Comparación vs planograma digital
  → Si deviation > umbral: alert vía WhatsApp al encargado
  → Log en Superset para análisis de tendencias
```

**Tiempo estimado**: 8-10 semanas (incluye integración de cámaras)
**ROI esperado**: 3-5% incremento en ventas por reducción de stockouts en lineal

---

## Patrón 8: Customer Service AI con 60-70% Automatización

**Objetivo**: Deflectar mayoría de tickets de soporte con agente AI, escalar lo que no puede resolver.

**Stack**:
- Orquestación: LangGraph (MIT) con routing inteligente
- CRM: SuiteCRM (AGPL) o ERPNext (MIT) para historial de cliente
- Conocimiento: LightRAG (MIT) sobre FAQs, políticas, catálogo
- LLM: Claude Haiku (volumen alto) + Claude Sonnet (casos complejos)
- Canales: WhatsApp + web chat + email

**Clasificación de tickets**:
```
Ticket entrante
  → Clasificador (Claude Haiku): {intent, urgency, can_automate}
  → Si can_automate:
      → LightRAG: busca en knowledge base
      → Medusa-MCP: obtiene estado real de orden/envío
      → Claude Haiku: genera respuesta personalizada → responde
  → Si not can_automate:
      → Resumen + contexto → cola de agente humano
```

**Métricas esperadas**: 60-70% deflexión; CSAT equivalente al canal humano; <30s primera respuesta

---

## Patrón 9: Shopify UCP Chat Agent (onboarding rápido)

**Objetivo**: Agente de compras conversacional sobre cualquier store Shopify en 1-2 semanas, usando la infraestructura UCP que Shopify abrió en Spring '26.

**Stack**:
- Referencia: [Shopify/shop-chat-agent](https://github.com/Shopify/shop-chat-agent) (Apache-2.0)
- Protocolo: Shopify UCP con UCP Skill (open-source AI Toolkit)
- Checkout: Checkout MCP de Shopify (discovery → compra en flujo conversacional)
- LLM: Claude Haiku 4.5 (bajo costo, velocidad para chat; ~$0.25 por 1M input tokens)
- Deploy: Docker + Next.js frontend

**Flujo**:
```
Usuario: "¿Tienen camisetas de algodón orgánico talla M por menos de $50?"
  → UCP Skill: catalog_search({query: "camiseta algodón orgánico", size: "M", max_price: 50})
  → Claude: presenta 3 opciones con imágenes y precios reales
  → Usuario: "Agrego la azul al carrito"
  → Checkout MCP: create_cart() → checkout_session()
  → Usuario: completa pago via checkout nativo de Shopify
  → Confirmación + tracking automático
```

**Configuración mínima**:
```env
SHOPIFY_STORE_URL=tu-tienda.myshopify.com
ANTHROPIC_API_KEY=sk-ant-...
SHOPIFY_UCP_AGENT_ID=<registrado en Developer Dashboard>
```

**Tiempo estimado**: 1-2 semanas para MVP sobre Shopify existente
**Ventaja clave**: Sin necesidad de buildear MCP server propio; UCP endpoint de Shopify hace el trabajo

---

## Patrón 10: NVIDIA Catalog Enrichment Pipeline

**Objetivo**: Transformar un catálogo de imágenes básicas en metadata rica y localizada usando GenAI, a escala de miles de SKUs.

**Stack**:
- Blueprint: [NVIDIA-AI-Blueprints/Retail-Catalog-Enrichment](https://github.com/NVIDIA-AI-Blueprints/Retail-Catalog-Enrichment) (Apache-2.0)
- VLM: Nemotron-3-Nano-Omni-30B (vision language model para análisis de imágenes)
- Imagen: FLUX.1-Kontext-Dev para lifestyle images culturalmente apropiadas
- Embeddings: nv-embedqa-e5-v5 para búsqueda semántica del catálogo
- Hosting: NVIDIA NIM APIs (cloud) o on-prem con GPU

**Pipeline**:
```python
for sku in product_catalog:
    # Input: imagen de producto + metadata básica + locale config
    result = catalog_enrichment_blueprint.enrich(
        image=sku.image_url,
        basic_metadata=sku.raw_data,
        brand_voice="premium, sostenible, joven",
        target_locales=["es-AR", "es-MX", "pt-BR", "en-US"]
    )
    # Output por locale:
    # - title: "Camiseta algodón orgánico pima de comercio justo — Talle M"
    # - description: párrafo de 150 palabras con beneficios y materiales
    # - categories: ["ropa/camisetas", "sustentable", "casual"]
    # - lifestyle_image: imagen contextual generada por FLUX.1
    sku.update(result)  # → import a Medusa/Saleor/Shopify
```

**Tiempo estimado**: 4-6 semanas (incluyendo fine-tuning de brand voice)
**Escala**: 1,000+ SKUs por hora en NVIDIA NIM cloud
**Caso de referencia**: Grid Dynamics usa este blueprint con retailers grandes en producción

---
