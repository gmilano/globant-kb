# Agentes trending — Retail & eCommerce

> Semana del 14 de julio de 2026 — Señales nuevas esta semana.
> v9 — Era de los protocolos de comercio agentico (ACP / UCP / MCP)

## Señales calientes esta semana

### 1. UCP presentado en Open Source Summit NA (junio 2026)
Google publicó la implementación de referencia del **Universal Commerce Protocol (UCP)** en el Open Source Summit North America (junio 2026). UCP es el estándar abierto respaldado por Google, Shopify y Walmart para agentes de compra. Cubre discovery → checkout → post-purchase. Cada retailer lo activa exponiendo `/.well-known/ucp` en su dominio.
- **Implicancia Globant**: implementar el endpoint UCP es el nuevo SEO para retailers — sin él, los agentes de Google no los ven.
- Ref: https://opensource.googleblog.com/2026/06/open-rails-for-agentic-commerce-at-open-source-summit-north-america-2026.html

### 2. ACP en GitHub — El protocolo de OpenAI + Stripe está open source
El **Agentic Commerce Protocol (ACP)** de OpenAI y Stripe ya tiene repo público en GitHub (`agentic-commerce-protocol/agentic-commerce-protocol`). ACP powers ChatGPT Instant Checkout (Etsy, Shopify). PayPal y Worldpay son payment partners de lanzamiento.
- **Señal clave**: OpenAI decidió open-sourcear la especificación — señal de que quieren que todo el ecosistema lo implemente.
- Ref: https://github.com/agentic-commerce-protocol/agentic-commerce-protocol

### 3. ChatGPT Instant Checkout pivotó — del checkout directo a apps de merchants
OpenAI anunció el fin de Instant Checkout (checkout directo en ChatGPT) y pivot hacia **dedicated merchant apps** dentro de ChatGPT. Razones: selección limitada de productos, datos de inventario desactualizados. El nuevo modelo: merchants crean "apps" en ChatGPT que el agente puede usar.
- **Implicancia Globant**: Oportunidad de construir "merchant apps" para ChatGPT para retailers LATAM.
- Ref: https://www.cnbc.com/2026/03/24/openai-revamps-shopping-experience-in-chatgpt-after-instant-checkout.html

### 4. nexscope-ai/Amazon-Skills — Nuevo repo (junio 2026)
Skills especializadas para Amazon sellers en formato SKILL.md: keyword research, competitor analysis, listing audit. Funciona como plugin para Claude Code, OpenClaw, Cursor. Complementa el eCommerce-Skills principal.
- **Stars**: ~85★ en 3 semanas.
- Ref: https://github.com/nexscope-ai/Amazon-Skills

### 5. DeerFlow 2.0 con MCP retail tools
ByteDance DeerFlow 2.0 (70.7k★) añadió soporte para invocar MCP tools en sus subagentes. Esto lo convierte en el harness más completo para research + comparison de productos: puede buscar en Medusa MCP, WooCommerce MCP, y APIs de marketplace en un solo flujo.
- **Señal**: DeerFlow se posiciona como el "orchestrator" de referencia para flujos de retail agentic.
- Ref: https://github.com/bytedance/deer-flow

### 6. Medusa + Claude Code tutorial — Headless commerce para developers
El equipo de Medusa.js publicó tutorial oficial de construcción de tienda con **Claude Code** como co-developer. "Describe a store, get a store" — señal de que Medusa se posiciona explícitamente como "la plataforma de comercio para agentes y developers".
- Ref: https://medusajs.com/blog/how-to-build-a-custom-ecommerce-store-with-medusa-and-claude-code/

### 7. AI-driven orders crecieron 15x en 12 meses
Según datos de enero 2026 vs enero 2025, los pedidos generados por AI crecieron **15x**. En Black Friday 2025, el tráfico referido por AI a sitios retail US creció **+805% YoY**.
- El 58% de los consumidores ya usa GenAI para recomendaciones de productos en lugar de búsqueda tradicional.
- Fuente: searchengineland.com, commercetools.com

### 8. Odoo 20 Agentic AI (September 2026)
Odoo anunció para septiembre 2026 el lanzamiento de Odoo 20 con **Agentic AI**: agentes que ejecutan workflows proactivamente sin intervención humana. Integrado con su módulo eCommerce, inventario y CRM. Primer ERP open source con agentes agenticos nativos.
- **Implicancia Globant**: clientes con Odoo pueden recibir upgrade a agentic workflows sin cambiar plataforma.

---
*Pipeline automático — actualización semanal. v9 retail-kb.*
