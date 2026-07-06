# Foundational Repositories — Retail

> Bases to build on. Open license, active community, production-proven.
> Last updated: 2026-07-06

## Commerce Platforms

| Repo | License | Stars | Stack | Description |
|------|---------|-------|-------|-------------|
| [medusajs/medusa](https://github.com/medusajs/medusa) | MIT | 32k★ | Node.js/TypeScript | The world's most flexible headless commerce platform — modular architecture (cart, orders, inventory, promotions, fulfillment), agent-ready REST+GraphQL APIs, plugin ecosystem; Heineken and Mitsubishi use it in production; foundation for agentic checkout |
| [saleor/saleor](https://github.com/saleor/saleor) | Apache 2.0 | 22.4k★ | Python/Django/GraphQL | GraphQL-first headless commerce — MACH architecture, multi-channel, storefront-agnostic; extensible via webhooks and apps; ideal for AI recommendation layer integration |
| [bagisto/bagisto](https://github.com/bagisto/bagisto) | MIT | 28k★ | PHP/Laravel | Full-featured e-commerce with native AI model support (GPT-4, Claude, Gemini), multi-currency, multi-language, plugin/theme system; bridges traditional and headless retail |
| [apache/ofbiz](https://github.com/apache/ofbiz-framework) | Apache 2.0 | 750★ | Java | Apache OFBiz — enterprise ERP + e-commerce suite; accounting, inventory, catalog management, CRM, POS, order management; mature codebase; AI wrapper target for legacy retail modernization |
| [woocommerce/woocommerce](https://github.com/woocommerce/woocommerce) | GPL-3.0 | 10.4k★ | PHP/WordPress | World's largest e-commerce platform by merchant count (~30% of all online stores); active AI plugin ecosystem; not MIT but GPL allows customization |

## Recommendation & Personalization

| Repo | License | Stars | Stack | Description |
|------|---------|-------|-------|-------------|
| [RUCAIBox/RecBole](https://github.com/RUCAIBox/RecBole) | MIT | 3.3k★ | Python/PyTorch | Unified recommendation library — 94+ algorithms, 44 benchmark datasets; general/sequential/context-aware/knowledge-based rec; de facto academic-to-production bridge for retail recommendation engines |
| [RUCAIBox/RecBole-GNN](https://github.com/RUCAIBox/RecBole-GNN) | MIT | 720★ | Python/PyTorch | GNN-based collaborative filtering extension — LightGCN, SGL, SimGCL, NCL; graph-based "customers who bought X also bought Y" at scale |
| [guymorita/recommendationRaccoon](https://github.com/guymorita/recommendationRaccoon) | MIT | 816★ | Node.js/Redis | Collaborative filtering recommendation engine as an npm module — Redis-backed, lightweight, suitable for smaller catalogs or as a microservice |

## Visual Search & Embeddings

| Repo | License | Stars | Stack | Description |
|------|---------|-------|-------|-------------|
| [openai/CLIP](https://github.com/openai/CLIP) | MIT | 26k★ | Python/PyTorch | Contrastive Language-Image Pretraining — multimodal embedding; foundation for "shop by photo", product similarity search, automatic catalog tagging |
| [facebookresearch/faiss](https://github.com/facebookresearch/faiss) | MIT | 34k★ | C++/Python/CUDA | Facebook AI Similarity Search — billion-scale nearest-neighbor search; GPU-accelerated; backbone of every production product search engine |
| [weaviate/weaviate](https://github.com/weaviate/weaviate) | BSD-3 | 13k★ | Go | Vector database — hybrid BM25+vector search; product catalog store; semantic search ("find me casual summer dresses under $50") |

## Customer Engagement & Conversational

| Repo | License | Stars | Stack | Description |
|------|---------|-------|-------|-------------|
| [RasaHQ/rasa](https://github.com/RasaHQ/rasa) | Apache 2.0 | 19.5k★ | Python | Conversational AI framework — NLU, dialogue management, channel connectors (WhatsApp, Telegram, Slack, Instagram, FB Messenger); retail customer service and voice shopping assistants |

## Dynamic Pricing & Supply Chain

| Repo | License | Stars | Stack | Description |
|------|---------|-------|-------|-------------|
| [hpi-epic/pricewars](https://github.com/hpi-epic/pricewars) | MIT | 430★ | Python/Docker | Dynamic pricing simulation platform — multi-merchant competitive repricing microservice, RL agents, price elasticity modeling; spawn as pricing microservice |
| [LarrySnyder/stockpyl](https://github.com/LarrySnyder/stockpyl) | MIT | 164★ | Python | Inventory optimization and simulation — stochastic inventory theory, supply chain network design, GSAP algorithms; solid foundation for demand-driven replenishment |

## Agent Orchestration (Retail Workflows)

| Repo | License | Stars | Stack | Description |
|------|---------|-------|-------|-------------|
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | 13k★ | Python/TypeScript | Stateful multi-agent orchestration — cycles, branching, persistence; powers retail agent workflows: order tracking, returns, cart management |
| [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | 52.8k★ | Python | Role-based multi-agent system — product research crews, competitive pricing crews, customer support crews |
| [SGFGOV/medusa-mcp](https://github.com/SGFGOV/medusa-mcp) | MIT | 65★ | TypeScript | MCP server for Medusa SDK — LLM agents can natively call Medusa commerce APIs without custom tool wrapping |

## See also

- `verticals/solutions.md` — full vertical platforms (ERP, POS, loyalty programs)
- `agents/top.md` — AI agent details with algorithm breakdowns
