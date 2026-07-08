# 📈 Agentes en tendencia — Retail & E-Commerce

> Señales esta semana. Última actualización: 2026-07-08 (v7 — segunda pasada)

## Señales clave

### 0. WooCommerce 10.9 — 7 Canonical Agent Abilities (jun-23-2026) 🔴 NUEVO
- **Release**: [WooCommerce 10.9.0](https://developer.woocommerce.com/2026/06/23/woocommerce-10-9/) — shippe ó jun-23-2026, dashboards WordPress jun-24-2026
- **7 abilities nativas** (`woocommerce/` namespace): `products-query`, `product-create`, `product-update`, `product-delete`, `orders-query`, `order-update-status`, `order-add-note`
- **Arquitectura**: transport-neutral — la misma ability funciona vía MCP, REST API, WP-CLI y futuros agent surfaces
- **Clientes soportados**: Claude Code, Cursor, VS Code — cualquier cliente MCP puede leer/escribir productos y pedidos directamente
- **Relevancia Globant**: 28% de todas las tiendas del mundo es ahora un MCP endpoint nativo. Enorme superficie para migrar clientes WooCommerce a AI sin cambiar plataforma.
- **Prerequisitos**: WooCommerce 10.7+, WordPress 6.9+, Node.js 22+ (Developer Preview)

### 1. Guerra de Agentes de Shopping AI — ChatGPT vs Perplexity vs Amazon vs Google 🔴 NUEVO
- **ChatGPT Instant Checkout retreated** (mar-2026): Solo 30 merchants activos en 6 meses. OpenAI pivotó a visual search + product comparison. Señal: checkout AI-to-AI aún no es mainstream.
- **Perplexity Shopping** (PayPal integration): Shoppers tienen **AOV 57% mayor** vs otras plataformas (Shopify analytics). Pro subscribers: one-click purchasing + free shipping.
- **Amazon "Buy for Me"**: Integra productos externos + Rufus para discovery + Alexa+ para recompras automáticas.
- **Bain 2026**: Consumidores confían **3x más** en agentes AI de la propia tienda vs agentes de terceros (ChatGPT/Perplexity). **Implicación Globant**: el diferencial no es el agente genérico — es el agente embedded en la experiencia del brand.
- **Señal estratégica**: Invertir en on-site agents (Medusa + Claude) antes que en integraciones de terceros.

### 2. NVIDIA Retail Agentic Commerce — ACP + UCP en producción (ene-2026)
- **Repo**: [NVIDIA-AI-Blueprints/Retail-Agentic-Commerce](https://github.com/NVIDIA-AI-Blueprints/Retail-Agentic-Commerce)
- **Licencia**: Apache-2.0
- **Señal**: NVIDIA lanzó implementación de referencia del Agentic Commerce Protocol (ACP) y Universal Commerce Protocol (UCP) en enero 2026. Incluye checkout AI-to-AI sin fricción y mantiene el control del merchant sobre precios y políticas.
- **Relevancia Globant**: Base para propuestas de "agentic checkout" a retailers latinoamericanos en 2H 2026.

### 2. Universal Commerce Protocol (UCP) — open spec Apache-2.0 (ene-2026)
- **Repo**: [Universal-Commerce-Protocol/ucp](https://github.com/Universal-Commerce-Protocol/ucp)
- **Anuncio**: Sundar Pichai en NRF 2026 (ene-11). Co-developers: Shopify, Etsy, Wayfair, Target, Walmart.
- **Señal**: El UCP define el stack completo para agentic commerce: discovery de productos, negociación de capacidades, checkout, post-compra. Apache-2.0 — compatible con Globant builds.
- **Acción**: Leer specs en ucp.dev + fork del repo de referencia.

### 3. WooCommerce — Evolución MCP (v10.3 oct-2025 → v10.9 jun-2026)
- **Señal**: De MCP experimental (v10.3, oct-2025) a 7 canonical abilities en core (v10.9, jun-2026). Roadmap: Checkout en preview Q3 2026.
- **Relevancia**: Habilita patrones de "store-as-context" para agentes de soporte, merchandising y forecasting. 28% del ecommerce mundial ya tiene AI-native endpoint.

### 4. Gorse v0.5+ — LLM Rankers + Multimodal Embeddings
- **Repo**: [gorse-io/gorse](https://github.com/gorse-io/gorse)
- **Señal**: Gorse agregó soporte para LLM rankers y embeddings multimodales (texto, imagen, video) en releases recientes. 9.7k★, Apache-2.0, drop-in replacement de motores de recomendación legacy.
- **Relevancia**: Para retailers con catálogos visuales (moda, hogar, electrónica).

### 5. Skyvern MCP & Skills — 35 tools, lanzado mar-3-2026 🔴 NUEVO
- **Repo**: [Skyvern-AI/skyvern](https://github.com/Skyvern-AI/skyvern) (AGPL-3.0, **21.9k★** actualmente)
- **Señal**: Skyvern lanzó servidor MCP oficial con 35 tools (mar-2026). Compatible con todos los AI coding assistants. Route Memorization: convierte rutas AI exitosas en scripts Playwright deterministas.
- **Uso retail**: Automatización de compras en sitios legacy (sin API), scraping de precios de competidores, RPA para checkout multi-tienda.

### 5b. Agentic Commerce — Tráfico AI Retail +393% YoY Q1 2026 🔴 NUEVO
- **Dato**: El tráfico de referencia AI a sitios retail creció **393% interanual** en Q1 2026 (después de +693% en holiday season 2025).
- **Conversión**: El tráfico AI convierte **42% mejor** que búsqueda tradicional.
- **McKinsey**: Agentic commerce podría generar **$1T en revenue US** y **$3-5T globalmente** para 2030.
- **Bain**: US market solo = $300-500B by 2030 (15-25% del eCommerce total).

### 6. Agentic Commerce — 7x mejor desempeño en Cyber Week 2025
- **Dato**: Retailers con AI agent integration mostraron ~7x mejor crecimiento de ventas durante Cyber Week 2025 vs los sin AI.
- **Señal del mercado**: Zero-click commerce emerge: compradores usan agentes para hacer compras sin visitar el sitio. Implica necesidad de feeds estructurados, MCP servers y AEO (Answer Engine Optimization).

### 6. LATAM — eCommerce supera $215B en 2026
- **Datos**: MercadoLibre lidera un mercado LATAM de ecommerce proyectado a superar $215B en 2026. CAGR AI en LATAM: 37.07%.
- **Brechas**: Adopción de agentic commerce (UCP/ACP) casi nula en LATAM — window de oportunidad 12-18 meses.
- **Señal**: Brasil y México son los mercados más listos para AI retail (mobile-first + WhatsApp adoption alta).

## Repos trending esta semana

| Repo | Licencia | Stars | Por qué está trending |
|------|----------|-------|----------------------|
| [NVIDIA-AI-Blueprints/Retail-Agentic-Commerce](https://github.com/NVIDIA-AI-Blueprints/Retail-Agentic-Commerce) | Apache-2.0 | ~600★ | Primer impl. de referencia ACP+UCP |
| [NVIDIA-AI-Blueprints/retail-shopping-assistant](https://github.com/NVIDIA-AI-Blueprints/retail-shopping-assistant) | Apache-2.0 | ~800★ | Blueprint multi-agente con LangGraph |
| [Universal-Commerce-Protocol/ucp](https://github.com/Universal-Commerce-Protocol/ucp) | Apache-2.0 | ~1k★ | Spec del protocolo del futuro del ecommerce |
| [gorse-io/gorse](https://github.com/gorse-io/gorse) | Apache-2.0 | 9.7k★ | LLM + multimodal embeddings v0.5+ |
| [Skyvern-AI/skyvern](https://github.com/Skyvern-AI/skyvern) | AGPL-3.0 | **21.9k★** | MCP server 35 tools (mar-2026) + Route Memorization |
| [recommenders-team/recommenders](https://github.com/recommenders-team/recommenders) | Apache-2.0 | 20k★ | Linux Foundation — estándar de facto |
| [woocommerce/woocommerce](https://github.com/woocommerce/woocommerce) | GPL-2.0 | 10.5k★ | **v10.9 (jun-2026)** — 7 canonical MCP agent abilities nativas |

---
*Pipeline automático — se actualiza cada hora.*
