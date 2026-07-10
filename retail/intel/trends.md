# 📡 Tendencias — Retail & eCommerce

> Última actualización: 2026-07-10 (v10)

## Tendencias activas (Jul 2026)

### T1 — Agentic Commerce: el mayor cambio desde el eCommerce móvil

Agentic commerce = agentes AI autónomos que perciben, razonan, deciden y ejecutan transacciones en nombre de consumidores. Morgan Stanley proyecta que ~50% de compradores online usarán agentes para 2030 (25% del gasto total). McKinsey: $1T US / $3-5T global para 2030.

**Señales concretas 2026:**
- Shopify activó Agentic Storefronts por defecto para 5.6M tiendas (Mar 24, 2026)
- ChatGPT, Copilot, Gemini ya pueden completar compras en tiendas Shopify
- Universal Commerce Protocol (UCP) como estándar emergente de máquina-a-máquina

### T2 — Zero-Click Commerce

Evolución del agentic commerce: el consumidor no toca, no busca, no hace clic. Un agente detecta la necesidad (reposición de inventario personal, mejor precio disponible), construye el carrito, compara y completa la transacción. McKinsey: reducción de touchpoints >80%.

**Bloqueador principal**: confianza del consumidor (<40% confía totalmente en AI para compras). Oportunidad: diseñar flujos de "human-in-the-loop" que reduzcan fricción gradualmente.

### T3 — Shopify como protocolo, no como plataforma

Shopify AI Toolkit (MIT, Apr 9, 2026) transforma a Shopify en infraestructura de agentes:
- Cualquier LLM puede gestionar operaciones de tienda via MCP
- Storefront se convierte en endpoint AI por defecto (Hydrogen 2026.1.4)
- 5.6M tiendas = 5.6M endpoints agénticos disponibles

**Implicación**: los integradores que dominen Shopify MCP tendrán ventaja competitiva masiva en 2026-2027.

### T4 — MCP como estándar universal de commerce

El ecosistema converge: **MCP (Anthropic) + A2A (Google) + UCP (Shopify) = stack de agentic commerce**.

- Shopify MCP: Admin API + Storefront API + Liquid
- WooCommerce MCP: en desarrollo (community)
- VTEX MCP: pilots en Brasil
- TikTok Ads MCP (Mayo 2026): primera red social con MCP oficial para campañas autónomas

### T5 — AEO: Answer Engine Optimization (nuevo SEO)

Con el 31.3% de US usando AI search (ChatGPT, Perplexity, Google AI Overviews), los retailers necesitan optimizar para ser mencionados por LLMs, no solo indexados por crawlers.

- Adobe: 4,700% YoY de tráfico GenAI a retail sites
- ChatGPT convierte 31% más que búsqueda orgánica para intent de compra alta
- JSON-LD / structured data se vuelve crítico (es el "SEO" de los LLMs)
- Nuevas métricas: AI Share of Voice, LLM citation rate

### T6 — Demand Sensing > Demand Planning

La IA está reemplazando el demand planning histórico (Excel/SAP) por demand sensing en tiempo real:
- Inputs: weather, redes sociales, eventos locales, competitor pricing, inventory levels
- AI predice intent antes de que el consumidor lo reconozca
- NVIDIA Survey 2026: supply chain AI tiene el ROI más rápido (double-digit reduction en overstock/stockouts en 6 meses)
- Python stack: TimesFM (Google), Chronos (Amazon), stockpyl + LLM reasoning

### T7 — TikTok Shop como canal dominante LATAM (MX/BR)

TikTok Shop está transformando social commerce en LATAM:
- TikTok Ads MCP (Mayo 2026): campañas autónomas vía agente
- Live shopping integrado: ver → comprar en segundos
- AI generativa para creación de contenido de producto
- Integración nativa con nexscope eCommerce Skills (157 skills)

### T8 — Computer Vision para Retail Físico

Shelf intelligence + planogram compliance + footfall analysis con CV + LLM:
- Cerebras Gemma 4: inference ~20x más rápido que GPU standard, ~$0.001/foto
- shelfops (MIT, Jul 2026): audit de góndola con reasoning LLM
- retail-ai-store-level-intelligence (Apache-2.0): edge AI por tienda
- ROI: reducción de stockouts 15-30%, mejora planogram compliance 40%

### T9 — Personalización Predictiva (de reactiva a proactiva)

2026 marca la transición de personalización reactiva (basada en historial) a predictiva (basada en contexto en tiempo real):
- Weather + local events + inventory + competitor pricing → recommend antes de que el cliente pida
- 40% más de revenue en empresas con AI personalization vs sin ella (McKinsey)
- Herramientas: Dify RAG + customer data platform + LLM reasoning

### T10 — WhatsApp Commerce en LATAM

WhatsApp como canal de ventas con agentes AI:
- 95%+ penetración en BR/MX/AR/CO
- Integración con Medusa/WooCommerce vía API de WhatsApp Business
- Agentes que manejan catálogo, precios, pedidos y pagos en chat
- Sin app nativa = menor fricción de adopción para SMBs

### T11 — Dynamic Pricing Agentico

El pricing dinámico manual (reglas estáticas) está siendo reemplazado por agentes que optimizan en tiempo real:
- retail-pricing-agent-ai (MIT, Jun 2026): primer repo open source con pipeline completo
- Ciclo: competitor scraping → demand forecast → elasticidad → precio → sync
- Casos de uso: perecederos, fashion (markdown optimization), electronics
- ROI: +3-8% gross margin con dynamic pricing bien implementado

### T12 — Open Source vs. Proprietary AI en Retail

NVIDIA Survey 2026: 84% de retailers consideran el open source importante o muy importante. El stack ganador 2026:

| Capa | Open Source leader | Stars |
|------|-------------------|-------|
| Plataforma commerce | Medusa (MIT) | 32k+ |
| Agentic workflow | Dify (Apache-2.0) | 144k |
| Browser automation | browser-use (MIT) | 93k |
| Skills reutilizables | nexscope (MIT) | ~202 |
| Inventory math | stockpyl (MIT) | 164 |

### T13 — ACP en Producción: Checkout Agentico como Infraestructura

El Agentic Commerce Protocol (ACP, mantenido por OpenAI + Stripe, Apache 2.0) ha salido de beta y procesa transacciones reales:
- **Etsy** (Feb 2026): 90M+ items comprables directamente desde agentes AI
- **Shopify 1M tiendas**: ACP activado por defecto en US
- **Spec v2026-04-17**: cubre checkout, cart, feed, delegate payment (token seguro), OAuth 2.0, integración MCP nativa

**Por qué importa para Globant**: ACP es el protocolo de la capa de transacción en agentic commerce. Si un cliente nos pide "hacer su tienda compatible con AI agents", ACP es el paso imprescindible. El NVIDIA Retail-Agentic-Commerce blueprint (Apache 2.0) provee la implementación de referencia lista para customizar.

**Conversión 4.4x**: merchants con infraestructura de datos compatible con agentes (ACP + buena metadata de producto) convierten 4.4x más que los que no tienen ACP. La diferencia no es el agente — es si el merchant está preparado para recibir al agente.

### T14 — Convergencia de Protocolos: El Stack Agentico Completo

En Jul 2026 existe consenso en la industria sobre el stack de agentic commerce:

```
MCP      → Herramientas (inventory, search, CRM, logistics)
A2A      → Comunicación entre agentes (buyer agent ↔ merchant agent)
UCP/AP2  → Checkout vía Google AI Mode / Microsoft Copilot
ACP      → Checkout vía ChatGPT / Shopify / Etsy
x402     → Pagos machine-to-machine (crypto-native, B2B)
```

Ningún framework cubre todo — hay que componer. Una tienda "agentic-first" en 2026 necesita:
1. MCP server (para que los agentes lean inventario, precios, políticas)
2. ACP endpoint (para que los agentes completen transacciones)
3. Schema.org / JSON-LD enriquecido (para AEO — que los LLMs citen la tienda)

**Señal táctica**: Medusa 2.x + medusa-mcp (MCP) + ACP plugin = la combinación open source más AI-native disponible hoy. NVIDIA blueprint es la referencia enterprise.

---

## Radar de señales emergentes

| Señal | Calor | Horizonte | Acción |
|-------|-------|-----------|--------|
| ACP checkout en producción (Etsy+Shopify) | 🔥🔥🔥 | Ahora | Implementar ACP en TODOS los proyectos eComm nuevos |
| NVIDIA Retail blueprint (ACP+UCP ref impl) | 🔥🔥🔥 | Ahora | Usar como base para proposals enterprise |
| Protocol convergence MCP+A2A+UCP+ACP | 🔥🔥🔥 | 0-3 meses | Arquitectar proyectos con todos los layers |
| Shelf Vision AI (shelfops pattern) | 🔥🔥 | 6-12 meses | Build offering para retailers con tiendas físicas |
| Zero-click commerce mainstream | 🔥🔥 | 6-18 meses | Diseñar UX de confianza progresiva + ACP integration |
| LATAM VTEX MCP | 🔥🔥 | 6-12 meses | Monitorear; cuando salga, desarrollar integraciones |
| AI pricing en LATAM (inflación AR) | 🔥🔥🔥 | Ahora | Proponer dynamic pricing como caso LATAM prioritario |
| Amazon Marketplace AI (nexscope Amazon-Skills) | 🔥🔥 | Ahora | Pitch a sellers Amazon LATAM con 51 skills listas |
