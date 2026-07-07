# Top AI Agents & Tools — Retail

> Last updated: 2026-07-06 | Focus: open-source, permissive licenses Globant can build on

## Core Retail AI Agents

| Agent | Repo | License | Stars | Description |
|-------|------|---------|-------|-------------|
| RecBole | [RUCAIBox/RecBole](https://github.com/RUCAIBox/RecBole) | MIT | 3.3k★ | Unified recommendation library — 94+ algorithms (BPR, SASRec, LightGCN, DeepFM, KGAT) covering general, sequential, context-aware & knowledge-based rec; 44 benchmark datasets; PyTorch-based; industry standard for building e-commerce personalization engines |
| NVIDIA Retail Shopping Assistant | [NVIDIA-AI-Blueprints/retail-shopping-assistant](https://github.com/NVIDIA-AI-Blueprints/retail-shopping-assistant) | NVIDIA Community | 1.2k★ | Production multi-agent blueprint on LangGraph — natural language product search, image-based visual search, intelligent shopping cart management, real-time streaming responses; Shopware 6 integration documented; reference architecture Globant can extend |
| Rasa Open Source | [RasaHQ/rasa](https://github.com/RasaHQ/rasa) | Apache 2.0 | 19.5k★ | Conversational AI framework — NLU + dialogue management + channel connectors (WhatsApp, Telegram, Slack, FB); CALM approach (LLM understanding + deterministic actions for reliability); battle-tested for retail customer service and in-store voice assistants |
| LangGraph | [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | 13k★ | Stateful multi-agent orchestration with cycles and branching — powers retail agent workflows: cart management, order tracking, returns processing, inventory queries; 34.5M monthly downloads; backbone of NVIDIA's retail blueprint |
| CrewAI | [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | 52.8k★ | Role-based multi-agent orchestration — product research crew, competitive pricing crew, customer support crew; 5.2M monthly downloads; strong retail use-case community with ready-made crew templates |
| RecBole-GNN | [RUCAIBox/RecBole-GNN](https://github.com/RUCAIBox/RecBole-GNN) | MIT | 720★ | GNN-enhanced recommendation on top of RecBole — LightGCN, SGL, SimGCL, NCL; graph-based collaborative filtering for "customers also bought" and session-based recommendation at catalog scale |
| CLIP (OpenAI) | [openai/CLIP](https://github.com/openai/CLIP) | MIT | 26k★ | Contrastive Language-Image Pretraining — foundation for visual product search; enables "find similar product by photo" or text-to-image search; multimodal embedding for retail catalog AI; pairs with FAISS for sub-100ms retrieval |
| FAISS (Meta) | [facebookresearch/faiss](https://github.com/facebookresearch/faiss) | MIT | 34k★ | Facebook AI Similarity Search — billion-scale vector search in milliseconds; CUDA/CPU support; backbone for product embedding search, visual similarity, and real-time recommendation retrieval; GPU-accelerated for catalog sizes >10M SKUs |
| PriceWars | [hpi-epic/pricewars](https://github.com/hpi-epic/pricewars) | MIT | 430★ | Dynamic pricing simulation platform (HPI Berlin research) — multi-merchant competitive repricing, RL agents, rule-based and ML-driven pricing strategies; retail price elasticity modeling; spawn as microservice for live price optimization |
| Bagisto | [bagisto/bagisto](https://github.com/bagisto/bagisto) | MIT | 28k★ | Laravel-based AI-integrated e-commerce platform — native support for GPT-4/Claude/Gemini, multi-language/multi-currency, plugin/theme ecosystem; InnoShop variant with modular AI automation (search, recommendations, content) |

## Supporting Tools

| Tool | Repo | License | Stars | Description |
|------|------|---------|-------|-------------|
| Medusa | [medusajs/medusa](https://github.com/medusajs/medusa) | MIT | 32k★ | Headless commerce platform — agent-ready APIs, Node.js/TypeScript, modular modules (cart, orders, inventory, promotions); foundation for agentic checkout & composable commerce |
| Saleor | [saleor/saleor](https://github.com/saleor/saleor) | Apache 2.0 | 22.4k★ | GraphQL-first headless commerce (Django/Python) — extensible storefront with webhooks, multi-channel; ideal for adding AI recommendation layers on top |
| Dify | [langgenius/dify](https://github.com/langgenius/dify) | Apache 2.0 | 144k★ | Low-code AI agent builder — visual RAG pipeline, LLM workflow builder; rapidly build retail copilots & customer-facing AI without writing agent orchestration from scratch |
| Weaviate | [weaviate/weaviate](https://github.com/weaviate/weaviate) | BSD-3 | 13k★ | Vector database — product catalog embedding store; hybrid BM25+vector search; powers semantic product discovery and "shop the look" features |
| medusa-mcp | [SGFGOV/medusa-mcp](https://github.com/SGFGOV/medusa-mcp) | MIT | 65★ | MCP server for Medusa JS SDK — enables Claude/LLM agents to natively call Medusa commerce APIs (products, carts, orders); emerging pattern for agentic retail |
| Gorse | [gorse-io/gorse](https://github.com/gorse-io/gorse) | Apache 2.0 | 9k★ | Production-grade recommender system engine (Go) — REST API + dashboard + Docker/K8s; added LLM ranker support Jul 2026; classical CF + multimodal embeddings + LLM re-ranking pipeline; zero ML ops overhead vs. RecBole |
| LightFM | [lyst/lightfm](https://github.com/lyst/lightfm) | Apache 2.0 | 4.7k★ | Hybrid collaborative + content-based recommendation — key differentiator: solves cold-start for new SKUs/users via metadata; Cython-fast multi-core; used at Lyst (100M+ fashion items) and Catalant; scikit-compatible API |
| Microsoft Recommenders | [microsoft/recommenders](https://github.com/microsoft/recommenders) | Apache 2.0 | 20k★ | Best practices library — 30+ production algorithms with Jupyter notebooks; SAR (fast for enterprise), LightGCN (GNN), xDeepFM (CTR); AzureML integration; LF AI & Data project; most complete open RecSys for enterprise retail builds |
| Chronos | [amazon-science/chronos-forecasting](https://github.com/amazon-science/chronos-forecasting) | Apache 2.0 | 4k★ | Amazon's pretrained LLM for time-series forecasting (NeurIPS 2024) — zero-shot demand prediction for new SKUs without historical data; fine-tunable on SKU history; replaces ARIMA for cold-start demand sensing |
| statsforecast | [Nixtla/statsforecast](https://github.com/Nixtla/statsforecast) | Apache 2.0 | 4.2k★ | Lightning-fast demand forecasting — AutoARIMA, AutoETS, AutoTheta; 100× faster than pmdarima; parallelized by SKU; production at Walmart MX + Rappi; LATAM supply chain proven; pairs with Chronos for full coverage |

## Fourth Pass Additions (July 2026)

| Agent | Repo | License | Stars | Description |
|-------|------|---------|-------|-------------|
| NVIDIA Retail Catalog Enrichment | [NVIDIA-AI-Blueprints/Retail-Catalog-Enrichment](https://github.com/NVIDIA-AI-Blueprints/Retail-Catalog-Enrichment) | Apache-2.0 | ~600★ | NRF Jan 2026 launch — GenAI pipeline: product images → rich catalog entries with Nemotron VLM analysis, FLUX.1-Kontext cultural image gen (LATAM-ready), Microsoft TRELLIS 3D asset creation, ACP/UCP schema export. Cost: <$0.01/SKU vs $2–10/SKU manual. |
| OpenAI Agents SDK | [openai/openai-agents-python](https://github.com/openai/openai-agents-python) | MIT | ~10k★ | Official OpenAI agentic SDK powering ACP v1.3 shopping agents — handoffs between agents, tool orchestration, built-in guardrails. Used by Shopify + 1M+ merchants for agentic checkout. Compatible with Claude via tool-calling pattern. |

## ACP / UCP / MCP Protocol Standards (2026)

| Protocol | Owner | Version | What retail agents can do | Stars/Reach |
|----------|-------|---------|--------------------------|-------------|
| ACP v1.3 | OpenAI + Stripe | v1.3 (MCP-compatible) | Agent→merchant checkout, delegated payments, order lifecycle, dispute hooks | 1M+ Shopify merchants |
| UCP | NVIDIA | v2026-01-11 | Discovery, cart management, purchase completion, webhook events | Growing — 200+ merchants |
| MCP | Anthropic | Stable | Tool-calling standard — all retail APIs exposed as agent tools | 9,652+ servers, 97M downloads |

> **Globant play**: ACP/UCP compliance implementation = +1200% AI-sourced traffic for client merchants. Any retailer not ACP-ready is invisible to ChatGPT/Claude/Perplexity shoppers. 6–10 week implementation project.

## Recommendation Algorithm Coverage (RecBole)

| Category | Key Algorithms | Retail Use Case |
|----------|---------------|------------------|
| General Rec | BPR, NeuMF, LightGCN, NGCF | Homepage personalization, "For You" feed, email campaigns |
| Sequential Rec | SASRec, GRU4Rec, BERT4Rec, FPMC | Session-based "Next product" prediction, cart completion |
| Context-aware | FM, DeepFM, xDeepFM, DCN | CTR prediction, search ranking, sponsored placement |
| Knowledge-based | KGAT, RippleNet, KGCN, KGIN | Cross-category discovery, long-tail items, new user cold start |
