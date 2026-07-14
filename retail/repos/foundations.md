# Repos fundacionales — Retail & eCommerce

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-14 (v9)

## Plataformas de comercio (headless & full-stack)

| Repo | Licencia | Stars | Descripción | ¿Base para AI? |
|------|----------|-------|-------------|----------------|
| [medusajs/medusa](https://github.com/medusajs/medusa) | MIT | ~31k★ | La plataforma de comercio headless más flexible. Node.js + TypeScript. API-first. Se auto-denomina "commerce platform for agents and developers" en 2026. Módulos: products, orders, customers, inventory, pricing, fulfillment. | Sí — MCP server disponible, Claude Code tutorial oficial |
| [woocommerce/woocommerce](https://github.com/woocommerce/woocommerce) | GPL-2.0 | ~10.4k★ | La plataforma de ecommerce más usada del mundo. 37% market share, 6.5M+ tiendas. Construida sobre WordPress (PHP). REST API completa. Masiva adopción en LATAM (especialmente AR, BR, MX). | Sí — WooCommerce MCP server disponible, enorme ecosystem de plugins |
| [odoo/odoo](https://github.com/odoo/odoo) | LGPL-3.0 | ~40k★ | ERP all-in-one: eCommerce + inventario + CRM + contabilidad + POS. 5M+ usuarios. Odoo 20 (sep 2026) añade Agentic AI nativo. 50+ módulos integrados en un solo DB. Fuerte en LATAM (partners certificados en AR, BR, MX, CO, PE). | Sí — Odoo 20 Agentic AI, API completa, módulos Python |
| [apache/ofbiz](https://github.com/apache/ofbiz) | Apache-2.0 | ~850★ | ERP enterprise Java con suite completa: eCommerce, CRM, supply chain, contabilidad, manufactura. Maduro (20+ años). Base sólida para enterprise retail que necesita compliance. | Sí — API REST, alto grado de customización |
| [dolibarr/dolibarr](https://github.com/Dolibarr/dolibarr) | Apache-2.0 | ~5.2k★ | ERP + CRM para SMBs. PHP. Módulos: invoicing, inventory, stock, orders, customers, suppliers. Más ligero que Odoo. Ideal para SMB retail que no necesita eCommerce complejo. | Sí — REST API, módulos extensibles |

## Frameworks de recomendación y personalización

| Repo | Licencia | Stars | Descripción | Caso de uso |
|------|----------|-------|-------------|-------------|
| [criteo-research/reco-gym](https://github.com/criteo-research/reco-gym) | Apache-2.0 | ~482★ | Entorno RL para recomendación de productos (Criteo). Simula sesiones de usuario con ads. Usado para entrenar y evaluar agentes de personalización antes de producción. | Entrenamiento de agentes de recomendación |
| [recommendationRaccoon](https://github.com/guymorita/recommendationRaccoon) | MIT | ~816★ | Motor de recomendación colaborativa NPM para Node.js. Algoritmo slope-one. Plug-and-play para stores con Node backend. | Recomendaciones colaborativas rápidas |
| [stockpyl](https://github.com/LarrySnyder/stockpyl) | MIT | ~164★ | Python toolkit completo de inventory optimization: EOQ, Wagner-Whitin, newsvendor, base-stock, (s,S), (r,Q), SCARF. Base matemática rigurosa. | Agentes de reposición automática |

## Agentes y harnesses para flujos retail

| Repo | Licencia | Stars | Descripción | Caso de uso |
|------|----------|-------|-------------|-------------|
| [zefang-liu/InvAgent](https://github.com/zefang-liu/InvAgent) | MIT | ~95★ | LLM Multi-Agent System para inventory management en supply chains. Múltiples agentes colaboran para optimización de stock end-to-end. | Automatización de inventario multi-agent |
| [kishorkukreja/awesome-supply-chain](https://github.com/kishorkukreja/awesome-supply-chain) | MIT | ~110★ | 132 skills para agentes de supply chain: demand forecasting, S&OP, inventory, procurement. Format SKILL.md — funciona con Claude Code, OpenClaw, Cursor. | Agentes especializados en supply chain |
| [bytedance/deer-flow](https://github.com/bytedance/deer-flow) | MIT | ~70.7k★ | SuperAgent harness con sub-agents, memoria, MCP tools, sandboxes. El mejor orchestrator open source para research y comparación de productos. LangGraph+LangChain. | Orchestration de flujos retail complejos |
| [nexscope-ai/eCommerce-Skills](https://github.com/nexscope-ai/eCommerce-Skills) | MIT | ~202★ | 157 SKILL.md skills: product research, marketing automation, supply chain, analytics. Amazon, Shopify, TikTok Shop, Etsy. | Plugin de skills para cualquier agente retail |
| [agentic-commerce-protocol/agentic-commerce-protocol](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol) | Apache-2.0 | ~800★ | Spec open source del Agentic Commerce Protocol (OpenAI+Stripe). El protocolo que implementar para ser visible en ChatGPT Shopping. | Integración en ecosistema de AI shopping |

## MCP servers para retail

| Repo | Licencia | Descripción |
|------|----------|-------------|
| [SGFGOV/medusa-mcp](https://github.com/SGFGOV/medusa-mcp) | MIT | MCP server para Medusa JS SDK. Gestión de productos, órdenes, clientes vía LLM. |
| [stefanopochet/woocommerce-mcp](https://github.com/stefanopochet/woocommerce-mcp) | MIT | MCP server para WooCommerce. Cualquier agente puede gestionar la tienda WP. |

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
