# 🧩 Patrones de composición — Retail & Ecommerce AI

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-11

## Arquitectura base

```
[Plataforma ecommerce/ERP (Medusa / Saleor / ERPNext)]
              ↓
     [MCP Server (medusa-mcp / mcp-product)]
              ↓
[Agentes especializados (LangGraph / CrewAI / MAF)]
              ↓
   [LLM (Claude Haiku para volumen / Sonnet para análisis)]
              ↓
  [UI / Canal (Next.js storefront / WhatsApp / ACP)]
```

---

## Patrón 1: AI Shopping Agent con ACP (ecommerce agéntico)

**Objetivo**: Permitir que los AI shopping agents de los usuarios completen compras autónomamente en tu tienda.

**Stack**:
- Backend: [medusajs/medusa](https://github.com/medusajs/medusa) (MIT) — tienda con catálogo y orders
- MCP: [SGFGOV/medusa-mcp](https://github.com/SGFGOV/medusa-mcp) (MIT) — expone Medusa via MCP
- Checkout protocol: [agentic-commerce-protocol](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol) (Apache-2.0)
- Pagos: Stripe con Shared Payment Token (ACP-compatible)

**Flujo**:
```
AI shopping agent del usuario
  → ACP endpoint: GET /catalog/search?q=zapatillas running talla 42
  → ACP endpoint: POST /cart {sku, qty}
  → ACP endpoint: POST /checkout/session
  → ACP endpoint: POST /checkout/pay {payment_token}
  → Respuesta: order_id + tracking
```

**Tiempo estimado**: 3-4 semanas para MVP (si Medusa ya está en producción)  
**Valor**: Visibilidad en el canal de AI shopping agents (25% del gasto online en 2030)

---

## Patrón 2: RAG sobre catálogo de productos (product Q&A)

**Objetivo**: Agente que responde preguntas en lenguaje natural sobre productos del catálogo.

**Stack**:
- Agente: [upsidelab/enthusiast](https://github.com/upsidelab/enthusiast) (MIT) — RAG anti-hallucination para ecommerce
- Plataforma: Medusa / Shopify / Shopware / Solidus (integración nativa en Enthusiast)
- Vector store: PostgreSQL + pgvector
- LLM: Claude Haiku (bajo costo, alta frecuencia)

**Flujo**:
```
Usuario: "¿Tienen zapatillas impermeables para trail running talla 42 por menos de €100?"
  → Enthusiast RAG: búsqueda semántica en catálogo indexado
  → Validation layer: filtra respuestas no grounded en datos reales
  → Respuesta con producto real, precio real, disponibilidad real
  → Link directo a product page con Schema.org markup
```

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

**Objetivo**: Sistema agéntico que predice demanda, detecta riesgo de stockout y genera órdenes de reposición automáticas.

**Stack**:
- Forecasting base: [LarrySnyder/stockpyl](https://github.com/LarrySnyder/stockpyl) (MIT) — modelos matemáticos (newsvendor, (s,S))
- Orquestación: LangGraph (MIT) — workflow con memoria y human-in-the-loop
- ERP: [frappe/erpnext](https://github.com/frappe/erpnext) (MIT) — inventario y órdenes de compra
- LLM: Claude Sonnet 5 — análisis cualitativo de señales externas (tendencias, eventos)
- Datos externos: tools para clima, Google Trends, eventos locales

**Workflow LangGraph**:
```python
# Agentes especializados
forecaster_agent    # stockpyl models + Claude análisis de señales
replenishment_agent # calcula cantidades óptimas y genera PO draft
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
**Frontend**: Next.js con SSR  
**Deploy**: Docker Compose → K8s para producción

**Tiempo estimado**: 8-12 semanas para implementación enterprise  
**Base**: Fork de nitin27may/e-commerce-agents + adaptación al stack del cliente

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
Usuario WhatsApp: "Hola! Busco regalo para niña de 8 años, presupuesto 500 pesos"
  → LangGraph state: {channel: whatsapp, intent: gift, age: 8, budget_ars: 500}
  → Tool: medusa-mcp.search_products({category: "niñas", age_range: "6-10", max_price: 500})
  → Claude: formatea respuesta conversacional con 3 opciones + imágenes
  → Usuario: "Me gusta la opción 2"
  → Tool: medusa-mcp.create_cart({product_id: "...", qty: 1})
  → ACP checkout → MercadoPago link
  → Usuario paga → Confirmación automática
```

**Personalización LATAM**:
- Soporte español + variantes regionales (AR, MX, CO, CL, BR)
- Integración MercadoPago + MercadoLibre shipping
- Manejo de cuotas/financiamiento (contexto clave en LATAM)

**Tiempo estimado**: 4-6 semanas para MVP  
**Diferenciador**: Canal donde el cliente ya está; no necesita descargar app

---

## Patrón 6: AI Recommendations con LLM + RecSys híbrido

**Objetivo**: Motor de recomendaciones que combina collaborative filtering con comprensión en lenguaje natural.

**Stack**:
- Base: [microsoft/RecAI](https://github.com/microsoft/RecAI) InteRecAgent (MIT)
- RecSys clásico: LightFM (MF) o similar para candidato retrieval
- Embeddings: RecAI RecLM-emb para item retrieval semántico
- Re-ranking: Claude Haiku con contexto del usuario en lenguaje natural
- Exposición: API REST → Medusa/Saleor recommendations widget

**Arquitectura**:
```
Request: user_id + context (page, session, explicit prefs)
  → RecLM-emb: obtiene top-100 candidatos por similitud semántica
  → InteRecAgent LLM: re-ranking con contexto cualitativo
  → Output: top-10 recomendaciones con explicación en lenguaje natural
  → UI: carousel con "Porque te gustó X, te puede gustar Y..."
```

**Cold start**: LLM maneja nuevos usuarios via onboarding conversacional (pregunta preferencias)  
**Tiempo estimado**: 5-7 semanas  
**Uplift esperado**: 15-25% vs collaborative filtering clásico en cold start + long tail

---

## Patrón 7: Shelf Intelligence para Retail Físico

**Objetivo**: Detección automática de out-of-stock, compliance de planograma y analytics de lineal.

**Stack**:
- Visión: Gemma 4 via Cerebras (velocidad) o local (costo) — [shelfops](https://github.com/IFAKA/shelfops) como base
- Arquitectura: [retail-ai-store-level-intelligence](https://github.com/Svyatoslavpech/retail-ai-store-level-intelligence) (Apache-2.0)
- Datos: PostgreSQL + timeseries (InfluxDB o Timescale)
- Alertas: LangGraph → webhook → WhatsApp/Slack al encargado de tienda
- Dashboard: Apache Superset

**Pipeline**:
```
Cámara IP → frame capture (cada 5 min)
  → Gemma 4 vision: detección de huecos + productos mal ubicados
  → Comparación vs planograma digital
  → Si deviation > umbral: alert vía WhatsApp al encargado
  → Log en dashboard (Superset) para análisis de tendencias
```

**Tiempo estimado**: 8-10 semanas (incluye integración de cámaras)  
**ROI esperado**: 3-5% incremento en ventas por reducción de stockouts en lineal

---

## Patrón 8: Customer Service AI con 60-70% Automatización

**Objetivo**: Deflectar la mayoría de tickets de soporte con agente AI, escalar lo que no puede resolver.

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
      → SuiteCRM: crea ticket con contexto completo
```

**Métricas esperadas**:
- 60-70% deflexión automática
- CSAT equivalente al canal humano (con Enthusiast anti-hallucination)
- Tiempo de primera respuesta: <30 segundos (vs horas con humanos)

---
