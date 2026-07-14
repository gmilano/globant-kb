# 🏗️ Repos fundacionales — Retail & Consumer

> Bases sobre las cuales construir. Licencias abiertas, comunidad activa, AI-ready.
> Última actualización: 2026-07-14 (v10)

## Plataformas y frameworks base

| Repo | Licencia | Descripción | ¿Base para AI? |
|------|----------|-------------|----------------|
| [medusajs/medusa](https://github.com/medusajs/medusa) | MIT | La plataforma de commerce más flexible del mundo. Headless, modular, TypeScript/Node.js. 32k+ ★. Diseñada para agentes: Claude Code puede extender modelos de datos, construir workflows y conectar storefronts desde instrucciones en lenguaje natural. | Sí — 32k ★ |
| [woocommerce/woocommerce](https://github.com/woocommerce/woocommerce) | GPL-2.0 | Plataforma ecommerce open-source sobre WordPress. 10.4k ★, >6M tiendas activas globales. Extensible via hooks/filters — base masiva en LATAM (pequeño y mediano retail). | Sí — 10.4k ★ |
| [bagisto/bagisto](https://github.com/bagisto/bagisto) | MIT | Framework ecommerce Laravel + Vue.js. MIT puro — sin cuotas, sin revenue sharing. Soporta GPT-5, Gemini, Mistral, LLaMA, Qwen via LLM plugins. Casos de uso AI: chatbot, descripción de productos, soporte, búsqueda, recomendaciones. | Sí — 15k ★ |
| [PrestaShop/PrestaShop](https://github.com/PrestaShop/PrestaShop) | OSL-3.0 | Plataforma ecommerce PHP madura. 8.7k ★. Muy presente en Europa y LATAM (especialmente Brasil, México, Colombia). Módulos de AI en marketplace oficial. | Sí — 8.7k ★ |
| [shopware/shopware](https://github.com/shopware/shopware) | MIT | Platform API-first con roadmap AI-first. 3.2k ★. Shopware Copilot en admin (Apr 2026). Agentic Commerce sales channel para plataformas tipo ChatGPT. Fuerte en DACH/Europa. | Sí — 3.2k ★ |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | MIT | Framework fundacional para agentes y aplicaciones LLM. 34.5M downloads/mes. Base para construir todos los agentes de la tabla anterior. | Sí — 95k ★ |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | Framework graph-based para flujos agentivos stateful. v0.4 (Apr 2026): HITL interrupt-resume, state persistence, LangSmith tracing. Ideal para orquestación compleja de retail. | Sí — 12k ★ |
| [LarrySnyder/stockpyl](https://github.com/LarrySnyder/stockpyl) | MIT | Herramientas Python para optimización de inventario y simulación. Modelos EOQ, newsvendor, SSMS, (r,Q), (s,S). Base matemática sólida para construir agentes de reabastecimiento. | Sí — 220 ★ |
| [SGFGOV/medusa-mcp](https://github.com/SGFGOV/medusa-mcp) | MIT | Servidor MCP para el SDK de Medusa JS. Permite que cualquier LLM compatible con MCP opere sobre una tienda Medusa: consultar productos, gestionar órdenes, actualizar inventario. | Sí — 65 ★ |
| [alopatenko/LLMSearchRecommender](https://github.com/alopatenko/LLMSearchRecommender) | MIT | Compendio de investigación y prácticas industriales para search, recommender y personalización con GenAI/LLMs. Pinterest, Netflix, Amazon como referencia producción. | Sí — 890 ★ |

---

## Notas de selección

### Medusa como plataforma principal
Medusa es la única plataforma diseñada explícitamente para agentes y developers desde el día 1.
Su arquitectura headless + modular permite que los agentes extiendan cualquier módulo (productos, órdenes, pagos)
sin romper el núcleo. Con `medusa-mcp`, cualquier LLM puede operar sobre la tienda.
**Recomendación**: Usar Medusa como plataforma base para clientes nuevos.

### WooCommerce para clientes existentes LATAM
El 60-70% del retail online de PYME en LATAM ya corre WooCommerce.
En proyectos de modernización: añadir LLM via plugin (LangChain REST → WooCommerce API) en lugar de migrar.
Tiempo estimado para añadir asistente conversacional: 2-3 sprints.

### Bagisto para proyectos greenfield con Laravel
Si el cliente tiene stack PHP/Laravel, Bagisto es preferible a WooCommerce (MIT puro vs GPL).
Soporta multi-currency, multi-language nativo — clave para expansión LATAM.

### stockpyl como motor de optimización
Antes de añadir capas LLM a inventario, validar con stockpyl que la lógica de reabastecimiento
es matemáticamente correcta. LLMs son buenos para interpretar y comunicar — no para optimizar EOQ.

---
*Ver también: `verticals/solutions.md` para plataformas verticales verticales completas.*
