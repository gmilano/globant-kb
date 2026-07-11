# 📈 Agentes AI trending — Retail (Semana 2026-07-11)

> Lo nuevo y notable esta semana en el ecosistema AI de retail y ecommerce.

## Novedad principal: Agentic Commerce Protocol (ACP) en producción masiva

El **Agentic Commerce Protocol** (OpenAI + Stripe, Apache-2.0) salió de beta limitada y está procesando transacciones reales en **Etsy** y expandiéndose a **más de 1 millón de merchants en Shopify**. Walmart también anunció integración. PayPal se unió como segundo PSP compatible (tras Stripe). Esto marca el punto de inflexión del "commerce agentico" de concepto a infraestructura real.

- Repo: [agentic-commerce-protocol/agentic-commerce-protocol](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol)
- Spec completa: [agenticcommerce.dev](https://www.agenticcommerce.dev/)

## Repos activos esta semana

| Repo | Novedades | Por qué importa |
|------|-----------|------------------|
| [upsidelab/enthusiast](https://github.com/upsidelab/enthusiast) | Actualización Apr 2026 con validación anti-hallucination | Único agente ecommerce open source con RAG grounded en datos reales del catálogo |
| [nitin27may/e-commerce-agents](https://github.com/nitin27may/e-commerce-agents) | Puerto .NET/C# completo + servidor MCP lanzado | Muestra arquitectura A2A de referencia para ecommerce enterprise |
| [microsoft/RecAI](https://github.com/microsoft/RecAI) | Nuevos benchmarks RecLM-eval para LLM-based RecSys | Microsoft Research establece métricas estándar para LLM+RecSys |
| [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG) | Backend OpenSearch unificado + setup wizard con Docker | Despliegue self-hosted más simple; ideal para catálogos de producto privados |
| [Svyatoslavpech/retail-ai-store-level-intelligence](https://github.com/Svyatoslavpech/retail-ai-store-level-intelligence) | Repo nuevo: inteligencia a nivel de tienda física | Cubre el gap de retail físico que la mayoría de repos de ecommerce ignoran |
| [IFAKA/shelfops](https://github.com/IFAKA/shelfops) | Demo de shelf audit con modelos Gemma 4 (Cerebras vs local) | Visión computacional aplicada a compliance de lineal en retail físico |

## Tendencia de la semana: AI Shopping Agents como canal

Morgan Stanley predice que casi **el 50% de los compradores online usarán AI shopping agents para 2030**, representando ~25% del gasto. Esto está forzando una reconfiguración del SEO de ecommerce:

- Los productos sin **Schema.org Product markup** son invisibles para los agentes compradores
- ACP define cómo los agentes hacen checkout autónomo (cart → payment → order)
- Retailers que no implementen ACP antes de Q4 2026 quedan fuera de este canal

## Proyectos a seguir (nuevos <30 días)

- **shelfops** — visión para shelf audit en retail físico
- **retail-ai-store-level-intelligence** — planogramas + out-of-stock detection
- **medusa-mcp** — bridge MCP ↔ Medusa.js; permite a LLMs gestionar orders/products

---
*Pipeline automático — se actualiza cada hora.*
