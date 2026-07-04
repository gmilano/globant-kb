# Market Intelligence — Retail AI

> Key players, market map, and competitive landscape as of 2026-07-04

## Market Size

| Metric | Value | Source |
|--------|-------|--------|
| **Global retail e-commerce revenue (2026)** | **$7.4T+** | Industry consensus |
| **Agentic AI in retail & ecommerce (2026)** | **$60.43B** | Mordor Intelligence |
| Agentic AI in retail CAGR (2026–2031) | 29.29% → **$218.37B by 2031** | Mordor Intelligence |
| McKinsey agentic commerce forecast (US, 2030) | $1 trillion orchestrated retail revenue | McKinsey |
| McKinsey agentic commerce forecast (global, 2030) | $3–5 trillion | McKinsey |
| Generative Dialogue Agents market share (2025) | 45.80% of agentic retail AI | Mordor Intelligence |
| Voice-Commerce Agents CAGR (2026–2031) | **36.25%** — fastest segment | Mordor Intelligence |
| Retailers using AI regularly (2026) | 88% | McKinsey |
| Retailers experimenting with AI agents | 62% | McKinsey |
| Enterprise apps with AI agents by end 2026 | 40% | Gartner |
| Ecommerce interactions influenced by AI (2025+) | 80%+ | Industry research |
| North America agentic retail market share | 37.35% | Mordor Intelligence |
| Asia-Pacific agentic retail CAGR | 34.88% (unmanned store proliferation) | Mordor Intelligence |

## Key Players

### Enterprise Commerce AI Platforms (Proprietary)
| Company | Position | Strength | Watch Out |
|---------|----------|----------|----------|
| **Salesforce Commerce Cloud** | Dominant enterprise | Einstein AI embedded; deep CRM integration | Very expensive; vendor lock-in |
| **Adobe Commerce (Magento)** | Enterprise mid-market | AI product recommendations, live search, Adobe Sensei | High TCO; complex customization |
| **SAP Commerce Cloud** | Enterprise ERP-first | SAP Business AI; tight S/4HANA integration | Slow innovation cycle; complex licensing |
| **Shopify** | SMB dominant, AI-first | Shopify Magic generative AI; 4.8M+ stores; MCP tool exposure | Limited enterprise flexibility; closed ecosystem |
| **BigCommerce** | SMB/mid-market open SaaS | AI product descriptions, headless-friendly | Smaller ecosystem than Shopify |

### Open Source Commerce Champions (Buildable)
| Project | Maintainer | Stars | Strength | Globant Angle |
|---------|-----------|-------|----------|---------------|
| **Medusa** | Medusa (Copenhagen) | 30.9k | MIT; agent-native v3; fastest growing 2026 | Recommended base for new AI commerce builds |
| **Saleor** | Saleor Commerce | 22.2k | BSD-3; GraphQL-native; UCP + Perplexity Shopping | Strong for headless B2B/B2C composable builds |
| **Odoo** | Odoo SA (Belgium) | 40k+ | LGPL; full-suite; 12M+ users | AI on top of existing Odoo implementations |
| **ERPNext** | Frappe (India) | 20k | GPL; best open-source ERP value | REST API surface for LangChain agent integration |
| **Apache OFBiz** | Apache Foundation | 3k | Apache 2.0; enterprise-grade; 20+ years | Most commercial-safe for enterprise embedding |

### AI Specialist Vendors in Retail
| Company | Capability | Open Source Status |
|---------|-----------|-------------------|
| **Nixtla** | TimeGPT: pre-trained time series forecasting | SDK Apache 2.0; model proprietary |
| **Gorse.io** | Self-hosted recommender system engine | Fully Apache 2.0 (9.6k stars) |
| **NVIDIA AI Blueprints** | Retail Shopping Assistant, Catalog Enrichment, Warehouse | Mixed: Catalog Enrichment is Apache 2.0 |
| **Recombee** | SaaS personalization API | Commercial |
| **Coveo** | Enterprise AI search + personalization | Commercial |
| **Dynamic Yield (Mastercard)** | Personalization platform | Commercial |
| **Constructor.io** | AI-powered search & discovery | Commercial |

## Competitive Dynamics 2026

### Agentic Commerce Race — The Defining Shift
AI agents shopping on behalf of consumers are disintermediating traditional search-and-browse. Google + Shopify's Universal Commerce Protocol (UCP, announced NRF 2026) standardizes how agents shop: REST/JSON-RPC protocol for catalog browsing, cart management, and checkout.

**Traffic already measurable:** ChatGPT Checkout, Perplexity Shopping, and Amazon AI Shopping are driving real purchases in 2026. Retailers not optimizing for agent-readiness are losing revenue now.

**Winners:** Medusa and Saleor (early UCP movers, clean machine-readable APIs); headless-native platforms with structured product data and JSON-LD
**Losers:** Closed platforms without public APIs; SEO-dependent traffic models; poor catalog data quality

### Catalog Quality as Competitive Moat
AI shopping agents rank and recommend products based on data richness. Retailers with thin catalog data (no attributes, poor descriptions, missing dimensions) are invisible to autonomous shoppers. NVIDIA Retail-Catalog-Enrichment (Apache 2.0) has become the go-to solution for closing this gap.

### Cloud vs Self-Hosted Tension
34% of mid-market retailers now prefer self-hosted AI (recommendation, forecasting) after cloud cost pressures from 2024–2025. Gorse, NeuralForecast, and Apache PredictionIO are the primary beneficiaries.

### EU AI Act Compliance Pressure (August 2026)
Transparency rules for chatbot deployments become enforceable in August 2026 — retailers must disclose AI interactions. This is driving demand for auditable, on-premises chatbot infrastructure (Rasa CALM) over opaque SaaS chatbot vendors.

### Physical Retail Resurgence
Physical stores gaining share as "trust-building hubs." Asia-Pacific leading with unmanned/autonomous stores (34.88% CAGR). Vision AI at the edge is the new battleground.

## LATAM Priorities for Globant

| Market | Priority | Signal | Compliance |
|--------|----------|--------|------------|
| **Brazil** | MAX | Largest LATAM e-commerce market; major retailers digitizing; Mercado Libre dominant | LGPD (Brazil data law); Marco Legal IA (2024) — on-prem AI preferred |
| **Mexico** | HIGH | Growing DTC and multi-channel retail; strong Odoo adoption | Less restrictive but LGPD-equivalent pressure building |
| **Colombia/Chile** | MEDIUM | Mid-market retailers upgrading from legacy ERPs; ERPNext sweet spot | Standard data protection frameworks |
