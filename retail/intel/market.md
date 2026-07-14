# 🗺️ Mapa de mercado — Retail & Consumer AI

> Players, oportunidades, posicionamiento. Foco LATAM + global.
> Última actualización: 2026-07-14 (v10)

## Tamaño de mercado (julio 2026)

| Segmento | 2026 | Proyección | CAGR | Fuente |
|----------|------|------------|------|--------|
| Agentic AI en Retail & eCommerce | $60.43B | $218.37B (2031) | 29.29% | Mordor Intelligence |
| Agentic Commerce global | $7.7B | $65.5B (2033) | 35.7% | Grand View Research |
| AI platforms en US retail ecommerce | $20.57B (1.5% del total) | $100B+ (2030) | — | eMarketer 2026 |
| Voice Commerce Agents | segmento en $60.43B | segmento más veloz | 36.25% CAGR | Mordor Intelligence |
| AI search + recomendación (retail) | parte del total | — | — | — |

**Nota clave**: McKinsey proyecta $1T de revenue retail US orquestado por agentes para 2030 y $3-5T global.

## Señales de adopción (Q1-Q2 2026)

- Tráfico retail referido por IA: **+393% YoY** en Q1 2026
- Tasa de conversión de tráfico AI vs búsqueda orgánica: **+42%**
- Black Friday 2025 vs 2024: **+805% tráfico AI**
- Generative Dialogue Agents: **45.80%** del market share en agentic retail (2025)
- North America: **38.2%** del mercado global (2025)
- Consumidores que usan AI para shopping discovery: ~40% de compradores online
- Consumidores que confían en AI para decisiones de compra autónomas: <40% (barrera principal)

## Mapa de players globales

| Empresa | Tipo | Fortaleza AI retail | Modelo |
|---------|------|---------------------|--------|
| Shopify | Plataforma commerce | UCP (co-fundador protocolo), Sidekick AI copilot, Shop app AI | SaaS comercial |
| Walmart | Retailer + tech | UCP (co-fundador), Walmart Commerce Technologies, agentes checkout | Propietario interno |
| Google | IA + search | UCP + Google AI Mode shopping, Product Studio, Merchant Center AI | SaaS + protocolo |
| Stripe | Pagos + checkout | ACP (co-fundador), agentes checkout en ChatGPT | SaaS comercial |
| OpenAI | LLMs | ACP + ChatGPT shopping, GPT-powered agentes de compra | SaaS + protocolo |
| Amazon | Retailer + cloud | Bedrock para retail AI, Rufus (shopping assistant), Alexa shopping | Propietario + cloud |
| Salesforce | CRM + commerce | Commerce Cloud AI, Einstein AI agents, Agentforce | SaaS enterprise |
| SAP | ERP + retail | SAP Joule agents, SAP Commerce Cloud, retail-specific AI | Enterprise |
| Magento/Adobe | eCommerce | Adobe Commerce AI, Live Search, Product Recommendations | SaaS comercial |
| Klarna | Fintech + checkout | Klarna AI agent (shopping + support), reemplazó 700 human agents | Fintech |

## Players open-source clave

| Proyecto | Rol en el ecosistema | Por qué relevante para Globant |
|----------|----------------------|-------------------------------|
| Medusa (MIT) | Plataforma commerce AI-native | Base ideal para proyectos greenfield — extensible con agentes |
| LangGraph (MIT) | Orquestador de agentes retail | Framework de facto para workflows retail complejos |
| medusa-mcp (MIT) | Puente MCP ↔ Medusa | Habilita cualquier LLM para operar sobre tiendas Medusa |
| WooCommerce (GPL-2.0) | Plataforma masiva PYME | 6M+ tiendas LATAM — base instalada enorme |
| Bagisto (MIT) | eCommerce Laravel AI-ready | Greenfield con PHP stack |
| retailGPT (MIT) | RAG para catálogos | Base para asistentes de ventas conversacionales |
| stockpyl (MIT) | Optimización inventario | Motor matemático para agentes de reabastecimiento |

## Oportunidades AI en LATAM

### Mercado general

| País | Tamaño ecommerce 2026 | Tasa penetración online | Canal dominante |
|------|----------------------|------------------------|------------------|
| Brasil | ~$60B | 75% usuarios Internet | WhatsApp + Pix |
| México | ~$32B | 65% | WhatsApp + OXXO Pay |
| Colombia | ~$12B | 72% | WhatsApp + PSE |
| Argentina | ~$9B | 68% | WhatsApp + MercadoPago |
| Chile | ~$8B | 82% | WhatsApp + Webpay |

### Oportunidades específicas

1. **WhatsApp Commerce agéntico**: El canal de mayor conversión en LATAM. Agentes que venden,
   procesan órdenes y hacen soporte directamente en WhatsApp + métodos de pago locales.
   Oportunidad: cliente tipo PYME retail que ya usa WhatsApp Business manual.

2. **Inventory AI para cadenas de distribución**: Muchas cadenas regionales (farmacéutica, alimentos,
   ferretería) usan hojas de cálculo para gestión de stock. Un agente con stockpyl + LLM puede
   reducir stockouts 20-30% en primer trimestre.

3. **Shelf audit con Computer Vision**: Las cadenas de supermercados medianas (no Walmart/Carrefour)
   no tienen sistemas de audit automatizado. shelfops + shelf-product-identifier son la base técnica.
   Oportunidad: SaaS regional de shelf compliance.

4. **RAG sobre catálogos propios**: Retailers con catálogos de 10k-100k SKUs necesitan búsqueda
   semántica + asistente de ventas. retailGPT o Medusa + pgvector es el stack.

5. **UCP/ACP implementation para retailers mid-market**: Los protocolos son nuevos y pocos retailers
   latinoamericanos los implementan. Ser primeros = aparecer en ChatGPT Shopping y Google AI Mode.

## Posicionamiento Globant AI Studios — Retail

### Ventajas diferenciales

- Experiencia en LATAM: conocimiento profundo de Pix/WhatsApp/OXXO como canales agénticos
- Capacidad de integrar plataformas existentes (WooCommerce/Odoo/ERPNext) con AI sin migración
- Portfolio de agentes reutilizables: pricing, inventory, shelf audit, customer service
- Dominio de protocolos agenticos: ACP + UCP + MCP — los tres que importan en 2026

### Propuesta de valor para clientes

```
Diagnóstico (1-2 semanas)
  → Identificar caso de uso de mayor ROI (pricing vs inventory vs CX)
  → Auditar stack existente (WooCommerce/Odoo/custom)
  → Estimar impacto financiero

Prueba de concepto (4-6 semanas)
  → Agente funcional en canal real (WhatsApp o chat web)
  → Integración con plataforma existente
  → Métricas base vs AI: conversión, NPS, tiempo de resolución

Producción (3-6 meses)
  → Agentes en producción con HITL donde sea necesario
  → Dashboard de KPIs AI
  → Expansión a más canales (UCP/ACP protocols)
```

---
*Fuentes: Mordor Intelligence, Grand View Research, eMarketer, McKinsey, Shopify Engineering, Google Developers Blog.*
