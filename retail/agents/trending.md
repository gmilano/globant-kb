# 📈 Señales trending — Retail & eCommerce

> Última actualización: 2026-07-10 (v10)

---

## S1 — Shopify AI Toolkit GA (Apr 9, 2026) 🔥 MAYOR

**Repos:** [Shopify/Shopify-AI-Toolkit](https://github.com/Shopify/Shopify-AI-Toolkit) (MIT) + [Shopify/shop-chat-agent](https://github.com/Shopify/shop-chat-agent) (MIT)

Shopify open-sourced su AI Toolkit completo:
- **MCP Server oficial** conectando Claude/Cursor/VS Code a Admin GraphQL API, Liquid themes, Hydrogen, Storefront API
- **Agent Skills** para cada capa: admin API client, theme development, headless commerce, custom data, Functions, UI extensions
- **Hydrogen 2026.1.4**: toda tienda en Oxygen es un AI agent endpoint by default
- **Impacto**: 5.6 millones de tiendas automáticamente descubribles en ChatGPT, Microsoft Copilot, Google AI Mode, Gemini (Mar 24, 2026)

**Relevancia para Globant:** cualquier cliente en Shopify puede tener agentic storefront en semanas, no meses.

---

## S2 — Agentic Commerce Protocol (UCP) — Nuevo estándar abierto

El ecosistema está convergiendo en: **MCP para tool integration + A2A para agent communication + UCP para checkout agentico**.

- Shopify's Universal Commerce Protocol (UCP): máquina-a-máquina checkout con audit trail
- WooCommerce plugin ACP (Agentic Commerce Protocol): "Buy it in ChatGPT" para tiendas WP
- [agentic-commerce GitHub topic](https://github.com/topics/agentic-commerce): 60+ repos, creciendo rápido

**Oportunidad**: implementar UCP/ACP en plataformas LATAM (MercadoLibre, Tiendanube, VTEX) antes de que lo hagan otros SIs.

---

## S3 — Shopify Agentic Storefronts Live (Mar 24, 2026)

**Antes del toolkit**, Shopify activó Agentic Storefronts por defecto para merchants elegibles en US:
- Productos de 5.6M tiendas indexables directamente por LLMs
- Sin código adicional de parte del merchant
- Conversión 31% mayor que organic search (dato TikTok Shop / AI channel comparativo)

**Señal de mercado**: el canal AI supera a SEO orgánico para intent de compra alto.

---

## S4 — retail-pricing-agent-ai (nuevo repo MIT)

**Repo:** [samhaldia/retail-pricing-agent-ai](https://github.com/samhaldia/retail-pricing-agent-ai) (MIT)

Sistema agentico modular de pricing:
1. **Market Data Ingestion Agent**: scraping de precios competidores + feeds de datos
2. **Demand Forecasting Agent**: forecast de demanda con ML (XGBoost + LLM synthesis)
3. **Promotion Strategy Agent**: genera estrategias de descuento basadas en elasticidad
4. **Price Sync Agent**: actualiza Shopify/WooCommerce/custom ERP via API

Primer repo open source que cubre el ciclo completo de dynamic pricing con LLMs. Antes solo había soluciones enterprise ($200k+/año).

---

## S5 — shelfops: CV + LLM para góndolas (Jun 2026)

**Repo:** [IFAKA/shelfops](https://github.com/IFAKA/shelfops) (MIT)

Shelf audit demo que compara Cerebras Gemma 4 (inference ultrarrápida) vs Gemma local:
- Detecta SKUs faltantes desde fotos de góndola
- Planogram compliance (¿está el producto en su lugar correcto?)
- Genera ticket de reposición automático
- Costo: ~$0.001/foto con Cerebras vs procesamiento batch local

**Contexto**: Cerebras inference ~20x más rápido que GPU standard para visión → viable para retail de alta frecuencia.

---

## S6 — NVIDIA AI in Retail & CPG Survey 2026

Tercer año consecutivo de la encuesta NVIDIA:
- **9 de cada 10 retailers** aumentarán presupuesto AI en 2026
- Foco en: modelos open source, agentic AI, physical AI (robots de almacén)
- Supply chain AI tiene el ROI más rápido: **double-digit reduction** en overstock/stockouts en primeros 6 meses
- "Demand sensing" (real-time AI signals) reemplaza demand planning tradicional (histórico)

---

## S7 — TikTok Ads MCP (Mayo 2026)

TikTok lanzó MCP server oficial para gestión autónoma de campañas:
- Primera red social mayor en adoptar MCP como protocolo de agentes
- Un agente puede crear, optimizar y reportar campañas sin tocar la UI
- 70M+ US users, social commerce $86B proyectado 2026
- Integración natural con nexscope eCommerce Skills para LATAM (TikTok Shop BR/MX)

---

## S8 — Adobe: 4,700% de tráfico GenAI a retail sites

Adobe Digital Insights (Jul 2025, confirmado 2026):
- Tráfico de GenAI a sitios de retail US creció **4,700% YoY**
- Crecimiento de 1,300% durante holiday season 2024
- Fuente: ChatGPT, Perplexity, Google AI Overviews
- AEO (Answer Engine Optimization) se vuelve disciplina obligatoria

---

---

## S9 — ACP (Agentic Commerce Protocol) LIVE — OpenAI + Stripe

**Repo:** [agentic-commerce-protocol/agentic-commerce-protocol](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol) (Apache 2.0)

El Agentic Commerce Protocol — el equivalente a MCP pero para checkout — ya está procesando transacciones reales:
- **Released**: Sep 29, 2025 (Apache 2.0)
- **Spec actual**: v2026-04-17 (checkout, cart, feed, delegate payment, OAuth 2.0, MCP integration)
- **Live deployments**: Etsy (Feb 2026) + expansión a 1M+ tiendas Shopify + Walmart
- **Stack position**: ACP = "el MCP del checkout". MCP conecta agentes a herramientas, ACP conecta agentes a transacciones.

**Implicación para Globant**: cualquier proyecto eCommerce que construyamos desde 2026 debería implementar ACP. El costo de no hacerlo: el agente del cliente no puede comprar en la tienda del cliente. Implementar ACP hoy = advantage de 12-18 meses sobre competidores que esperen.

---

## S10 — NVIDIA Retail Agentic Commerce Blueprint

**Repo:** [NVIDIA-AI-Blueprints/Retail-Agentic-Commerce](https://github.com/NVIDIA-AI-Blueprints/Retail-Agentic-Commerce) (Apache 2.0)

Blueprint enterprise de NVIDIA para agentic commerce con ACP + UCP:
- Implementación de referencia para merchants medianos/grandes
- NIM microservices (Nemotron-Nano-V3) + MIT embeddings (NV-EmbedQA-E5-v5)
- Checkout negotiation con LLM manteniendo merchant control
- Incluye CLAUDE.md nativo — diseñado para trabajar con Claude Code desde el inicio
- **UCP spec** (Universal Commerce Protocol) versión 2026-01-11 incluida

**Protocolo consenso 2026**: MCP (tools) + A2A (agent-to-agent) + UCP/AP2 (Google checkout) + ACP (Stripe/OpenAI checkout) = stack completo de agentic commerce. Ningún framework lo cubre todo — hay que componer.

---

## Repos trending esta semana

| Nombre | Licencia | Stars | Señal |
|--------|----------|-------|-------|
| [Shopify/Shopify-AI-Toolkit](https://github.com/Shopify/Shopify-AI-Toolkit) | MIT | ~4k | MCP admin oficial |
| [Shopify/shop-chat-agent](https://github.com/Shopify/shop-chat-agent) | MIT | ~2.8k | Storefront chat MCP |
| [samhaldia/retail-pricing-agent-ai](https://github.com/samhaldia/retail-pricing-agent-ai) | MIT | ~340 | Dynamic pricing agentic |
| [IFAKA/shelfops](https://github.com/IFAKA/shelfops) | MIT | ~120 | Shelf audit CV+LLM |
| [Svyatoslavpech/retail-ai-store-level-intelligence](https://github.com/Svyatoslavpech/retail-ai-store-level-intelligence) | Apache-2.0 | ~80 | Store-level AI |
| [nexscope-ai/eCommerce-Skills](https://github.com/nexscope-ai/eCommerce-Skills) | MIT | ~202 | 157 SKILL.md skills |
| [langgenius/dify](https://github.com/langgenius/dify) | Apache-2.0 | 144k | Agentic workflow platform |
| [agentic-commerce-protocol/agentic-commerce-protocol](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol) | Apache-2.0 | ~1.4k | ACP spec — checkout agentico OpenAI+Stripe. Live Etsy+Shopify. |
| [NVIDIA-AI-Blueprints/Retail-Agentic-Commerce](https://github.com/NVIDIA-AI-Blueprints/Retail-Agentic-Commerce) | Apache-2.0 | ~3.1k | Blueprint ACP+UCP con NIM microservices. Producción-ready. |
| [nexscope-ai/Amazon-Skills](https://github.com/nexscope-ai/Amazon-Skills) | MIT | ~85 | 51 skills FBA/PPC/listing Amazon. Compatible Claude Code. |

---
*Pipeline automático — se actualiza cada hora.*
