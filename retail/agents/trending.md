# Trending This Week — Retail AI

> Last updated: 2026-07-06

## Breakout Signals (July 2026)

### 1. Agentic Commerce Goes Mainstream
**"Zero-click commerce"** is the defining trend of H1 2026. AI agents shop autonomously on behalf of consumers — they browse, compare, add to cart, and complete purchases without user clicks. Over 1 million Shopify merchants have already opted into OpenAI's Instant Checkout feature inside ChatGPT. During Cyber Week 2025, 20% of all global orders were influenced by AI agents (Salesforce data).

### 2. NVIDIA Retail Blueprint Gaining Traction
[NVIDIA-AI-Blueprints/retail-shopping-assistant](https://github.com/NVIDIA-AI-Blueprints/retail-shopping-assistant) — LangGraph-powered multi-agent retail assistant published as a reference blueprint. Developers are forking it to connect to Shopware 6, Medusa, and Saleor backends. Features: natural language search + image search + cart management in a single agent graph.

### 3. Adobe Analytics: 4,700% YoY Growth in AI-Driven Retail Visits
Adobe Analytics Q1 2026 report: generative AI referred traffic to US retail sites grew 4,700% year-over-year. AI shopping assistants (ChatGPT, Perplexity, Gemini) are now a major discovery channel alongside Google Search.

### 4. Latam-GPT Launch for LATAM Commerce
Chile's National Center of Artificial Intelligence launched **Latam-GPT** (February 2026) — Spanish/Portuguese LLM trained on regional content. Creating opportunity for e-commerce personalization, product descriptions in regional Spanish, and LATAM customer service agents without translation overhead.

### 5. RecBole 2.0 + GNN Extensions
[RUCAIBox/RecBole-GNN](https://github.com/RUCAIBox/RecBole-GNN) — GNN-based collaborative filtering package merged into RecBole2.0 ecosystem. LightGCN and SimGCL are becoming the default production algorithms for session-based e-commerce recommendations. Better cold-start performance than matrix factorization for new SKUs.

### 6. Medusa v2 + MCP Integration Pattern
[SGFGOV/medusa-mcp](https://github.com/SGFGOV/medusa-mcp) — MCP server for Medusa SDK emerging as the pattern for "agentic retail": LLM agents can natively call Medusa's commerce APIs (create cart, query inventory, process orders) without custom tool wrapping. Globant opportunity: build retail agent stacks on this.

### 7. Visual Search Commoditization (CLIP+FAISS)
CLIP+FAISS pipelines for visual product search are now plug-and-play at production scale. Several startups are shipping "shop by photo" at <100ms latency with commodity GPU. Open-source implementations at [abinthomasonline/clip-faiss](https://github.com/abinthomasonline/clip-faiss) and [jarvisx17/OpenAI-Clip-Image-Search](https://github.com/jarvisx17/OpenAI-Clip-Image-Search).

### 8. ShelfOps & Store-Level Intelligence
[IFAKA/shelfops](https://github.com/IFAKA/shelfops) — Computer vision for retail shelf auditing, comparing Cerebras Gemma inference against local Gemma. Signals a trend: AI moving from digital/online retail into physical store operations (shelf availability, planogram compliance, in-store analytics).

### 9. MercadoLibre + AI: LATAM Scale
MercadoLibre controls 40% of Latin America's e-commerce and is deploying AI recommendation and pricing systems at scale. LATAM ecommerce projected to surpass $215 billion in 2026, growing 1.5× faster than global average. AI-driven logistics optimization is a key differentiator in markets like Brazil, Mexico, Argentina.

### 10. LLM-Enhanced Recommendations vs. Traditional CF
Research published H1 2026 shows LLM-enhanced recommendation models outperform traditional collaborative filtering on cold-start and diversity metrics. Hybrid architectures (LLM embedding + RecBole algorithms) becoming the new production standard.

### 11. NVIDIA Retail-Catalog-Enrichment: NRF Big Show Launch (Jan 2026)
[NVIDIA-AI-Blueprints/Retail-Catalog-Enrichment](https://github.com/NVIDIA-AI-Blueprints/Retail-Catalog-Enrichment) — Apache-2.0, ~600★, +40★/week.

Launched at NRF Big Show Jan 11–13 2026. Transforms bare product images into ACP/UCP-compliant rich catalog entries:
- **Nemotron 3 Nano Omni** (VLM) → structured product JSON: title, attributes, materials, sizing, tags
- **FLUX.1-Kontext-Dev** → culturally-appropriate product backgrounds (key for LATAM localization of product images)
- **Microsoft TRELLIS** → 2D product image → interactive 3D GLB model for product viewers
- **Exa Deep Agents** → web research for competitive positioning and product insights
- **Protocol export**: ACP/UCP-compliant schemas → products immediately discoverable by AI shopping agents

**Cost comparison**: Manual catalog enrichment at $2–10/SKU → AI pipeline at <$0.01/SKU. Retailers with 100k+ SKUs see 99% cost reduction.

**Globant angle**: Position as "catalog AI automation service" — measurable ROI in <6 months for large retailers.

### 12. Morgan Stanley $190–385B Agentic Commerce: Validated by 2026 Adoption Data

Published Dec 2025, now validated by H1 2026 behavioral data:

| Metric | Value | Source |
|--------|-------|--------|
| Agentic shopping U.S. e-commerce by 2030 (base) | $190 billion | Morgan Stanley |
| Agentic shopping U.S. e-commerce by 2030 (optimistic) | $385 billion | Morgan Stanley |
| Americans who bought something via AI in past month | 23% | Morgan Stanley survey H1 2026 |
| ChatGPT used for shopping | 45% of U.S. respondents | Morgan Stanley |
| Bain estimate: AI share of U.S. e-commerce 2030 | 25% | Bain & Company |
| McKinsey: orchestrated U.S. retail by 2030 | $1 trillion | McKinsey |
| McKinsey: orchestrated global retail by 2030 | $3–5 trillion | McKinsey |
| AI-sourced traffic increase for ACP-compliant merchants | +1200% | Q1 2026 industry data |
| Leading category | Grocery / CPG (replenishment frequency) | Morgan Stanley |

**Globant implication**: Every retail client pitch now has C-suite-level market data to frame the AI urgency.

### 13. ACP v1.3 — MCP-Compatible Agentic Commerce Protocol

OpenAI + Stripe shipped ACP v1.3 (2026) with full MCP compatibility:
- **MCP bridge**: any Claude/GPT agent can now complete ACP checkout via standard MCP tool calls
- **UCP interop**: NVIDIA UCP v2026-01-11 and ACP v1.3 now cross-compatible
- **Delegated payments**: AI agent holds payment authority on user's behalf (guardrails + limits configurable)
- **Dispute resolution**: merchant can reject or modify agent-proposed prices via webhook hooks

Impact: 1M+ Shopify merchants are now ACP-accessible. Retailers not on ACP are **invisible** to AI shopping agents.

### 14. LATAM Live Video Commerce: 5× Higher Conversion

Brazil and Chile data from H1 2026:
- **Live video shopping conversion**: 5× higher than static e-commerce pages
- **Brazil Gen-Z**: discovers products via "For You" page → direct Pix purchase → ~50% direct purchase rate
- **LATAM SMBs**: 86% use GenAI for customer chats; 50%+ targeting agent-driven commerce in 2026
- **LATAM e-commerce**: $232B market in 2026, 22% CAGR

**Pattern emerging**: Short video discovery → AI agent Q&A on WhatsApp → Pix/OXXO/WebPay checkout = frictionless LATAM retail funnel. Build time: 3–5 weeks.

## Repos to Watch

| Repo | Why Watch |
|------|----------|
| [NVIDIA-AI-Blueprints/retail-shopping-assistant](https://github.com/NVIDIA-AI-Blueprints/retail-shopping-assistant) | Best reference multi-agent retail architecture publicly available |
| [NVIDIA-AI-Blueprints/Multi-Agent-Intelligent-Warehouse](https://github.com/NVIDIA-AI-Blueprints/Multi-Agent-Intelligent-Warehouse) | Multi-agent warehouse/supply chain AI blueprint |
| [SGFGOV/medusa-mcp](https://github.com/SGFGOV/medusa-mcp) | MCP→Medusa bridge enabling LLM-native commerce actions |
| [IFAKA/shelfops](https://github.com/IFAKA/shelfops) | CV shelf auditing — physical retail AI frontier |
| [Svyatoslavpech/retail-ai-store-level-intelligence](https://github.com/Svyatoslavpech/retail-ai-store-level-intelligence) | Store-level AI intelligence framework |
