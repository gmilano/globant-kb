# 🎯 Agentes AI — Retail & eCommerce

> Agentes y herramientas AI open source para retail y comercio electrónico. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-10 (v10)

## Agentes y herramientas destacadas

| Nombre | Licencia | Repo | Stars | Descripción |
|--------|----------|------|-------|-------------|
| [Shopify AI Toolkit](https://github.com/Shopify/Shopify-AI-Toolkit) | MIT | Shopify/Shopify-AI-Toolkit | ~4k | MCP server oficial de Shopify + agent skills + Claude Code plugin. Conecta Claude/Cursor/VS Code directamente a Shopify Admin API, GraphQL schemas, Liquid themes. Open-sourced Apr 9, 2026. |
| [shop-chat-agent](https://github.com/Shopify/shop-chat-agent) | MIT | Shopify/shop-chat-agent | ~2.8k | App de referencia: chat widget en storefront con MCP; búsqueda de productos, políticas de envío, checkout completo en conversación. Hydrogen 2026.1.4 nativo. |
| [nexscope eCommerce Skills](https://github.com/nexscope-ai/eCommerce-Skills) | MIT | nexscope-ai/eCommerce-Skills | ~202 | 157 SKILL.md para agentes AI: Amazon, Shopify, TikTok Shop, Etsy. Compatible con Claude Code, OpenClaw, Cursor. Cross-border price monitoring, batch product image generation. |
| [retail-pricing-agent-ai](https://github.com/samhaldia/retail-pricing-agent-ai) | MIT | samhaldia/retail-pricing-agent-ai | ~340 | Sistema agentico completo: market data ingestion → demand forecasting → promotion strategy → price synchronization. Multi-agent pipeline con LangChain. |
| [Dify](https://github.com/langgenius/dify) | Apache-2.0 | langgenius/dify | 144k | Plataforma agentic workflow con RAG, MCP server nativo, 50+ built-in tools, self-hosted. Ideal para orquestar agentes de retail sin código. |
| [n8n](https://github.com/n8n-io/n8n) | fair-code | n8n-io/n8n | 97k | Workflow automation con 400+ integraciones y AI nativo. Shopify + WooCommerce + CRM + LLM en flows visuales. Self-hostable. |
| [browser-use](https://github.com/browser-use/browser-use) | MIT | browser-use/browser-use | 93k | Agente que controla browser para tareas web. Price scraping, competitor monitoring, form filling, checkout automation. Default answer for browser-driven retail agents. |
| [shelfops](https://github.com/IFAKA/shelfops) | MIT | IFAKA/shelfops | ~120 | Retail shelf audit con visión AI (Cerebras Gemma 4 vs local Gemma). Detecta gaps, SKUs faltantes, planogram compliance desde fotos de góndola. |
| [retail-ai-store-level-intelligence](https://github.com/Svyatoslavpech/retail-ai-store-level-intelligence) | Apache-2.0 | Svyatoslavpech/retail-ai-store-level-intelligence | ~80 | Intelligence a nivel tienda: footfall, heatmaps, asociaciones de compra, alertas de stock por location. FastAPI + LLM reasoning. |
| [stockpyl](https://github.com/LarrySnyder/stockpyl) | MIT | LarrySnyder/stockpyl | 164 | Python para inventory optimization y simulación: EOQ, SSMS, multi-echelon. Base sólida para demand forecasting con LLM encima. |
| [agentic-commerce-protocol](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol) | Apache-2.0 | agentic-commerce-protocol/agentic-commerce-protocol | ~1.4k | Especificación ACP (Agentic Commerce Protocol) mantenida por OpenAI + Stripe. Define checkout agentico, cart, feed, delegate payment, OAuth 2.0 auth. Spec v2026-04-17. Live en Etsy + 1M tiendas Shopify. |
| [NVIDIA Retail-Agentic-Commerce](https://github.com/NVIDIA-AI-Blueprints/Retail-Agentic-Commerce) | Apache-2.0 | NVIDIA-AI-Blueprints/Retail-Agentic-Commerce | ~3.1k | Implementación de referencia de ACP + UCP. NIM microservices + LLM-powered checkout negotiation + merchant control layer. Blueprint listo para producción. Incluye CLAUDE.md nativo. |
| [nexscope Amazon-Skills](https://github.com/nexscope-ai/Amazon-Skills) | MIT | nexscope-ai/Amazon-Skills | ~85 | 51 SKILL.md skills para vendedores Amazon: FBA, PPC, listing optimization, keyword research, competitor analysis. Hermano de eCommerce-Skills. Compatible con Claude Code, Cursor, Windsurf. |

---

## Agentes por caso de uso

### 🛒 Agentic Storefront (compra autónoma)
- **Shopify AI Toolkit** — MCP admin + storefront; 5.6M tiendas compatibles con ChatGPT/Copilot/Gemini
- **shop-chat-agent** — referencia de chat widget MCP en Hydrogen
- **nexscope eCommerce Skills** — skills reutilizables para cualquier marketplace
- **nexscope Amazon-Skills** — 51 skills FBA/PPC/listing para Amazon specificamente

### 🔌 Protocolos de Agentic Commerce
- **ACP (OpenAI + Stripe)** — estándar open para checkout agentico; live en Etsy + 1M Shopify merchants
- **NVIDIA Retail-Agentic-Commerce** — blueprint de referencia ACP+UCP con NIM microservices

### 💰 Pricing & Promotions
- **retail-pricing-agent-ai** — pipeline completo market data → forecast → precio → sync
- **browser-use** — scraping de precios de competidores en tiempo real

### 📦 Inventory & Supply Chain
- **stockpyl** — modelos matemáticos de inventario (EOQ, safety stock, multi-echelon)
- **retail-ai-store-level-intelligence** — inteligencia por tienda con LLM

### 👁️ Computer Vision Retail
- **shelfops** — shelf audit: planogram compliance, out-of-stock detection

### 🔄 Orquestación & Workflow
- **Dify** — no-code agentic workflows con RAG
- **n8n** — automation visual con 400+ conectores

---
*Actualizado automáticamente por el pipeline de ingest.*
