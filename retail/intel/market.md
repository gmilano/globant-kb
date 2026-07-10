# Market Map — Retail & E-Commerce AI

> Key players, market structure, competitive landscape. Focus: LATAM + global.
> Last updated: 2026-07-10

## Market Size

| Segment | 2026 Value | 2030/2031 Projection | CAGR |
|---------|-----------|----------------------|------|
| Agentic AI in Retail & E-Commerce | $60.43B | $218.37B (2031) | 29.29% |
| AI in Retail (broad) | $18.4B | ~$45B (2030) | ~25% |
| AI platform retail spending | $20.9B | ~$80B (2030) | ~40% |
| AI agent-redirected commerce | — | $3–5 trillion (2030) | — |

**Key stat:** Morgan Stanley predicts ~50% of online shoppers will use AI shopping agents by 2030, accounting for ~25% of their total spend.

---

## Global Platform Players

| Company | Role | AI Capabilities | Open Source? |
|---------|------|-----------------|--------------|
| **Shopify** | #1 cloud e-commerce | AI Toolkit (Apr 2026), ACP-native, 1M+ merchants | MIT toolkit |
| **Amazon** | #1 US retail | Alexa for Shopping (Alexa+), 3× purchase conversion vs. Rufus | Closed |
| **Google** | AI shopping discovery | Gemini Checkout via ACP, Walmart integration live | ACP open |
| **OpenAI** | AI shopping agent | ChatGPT Shopping runs on ACP, co-author of ACP spec | ACP open |
| **Stripe** | Payments for agents | ACP co-author + delegated payment handler spec | ACP open |
| **Meta** | Social commerce + ACP | ACP contributor, Instagram/WhatsApp shopping | ACP open |
| **NVIDIA** | AI infrastructure | Retail Catalog Enrichment + Intelligent Warehouse blueprints (Jan 2026) | Apache 2.0 |
| **Walmart** | Brick+click retail | Google Gemini integration live, Sam's Club | Closed |
| **Perplexity** | AI search+buy | Perplexity Buy built on ACP | Closed |
| **Microsoft** | AI shopping | Copilot Shopping (ACP-based) | Partial |

---

## Open Source Platform Leaders

| Platform | License | Stars | Market Position |
|----------|---------|-------|-----------------|
| Medusa | MIT | 31.3k | Fastest-growing headless commerce; agent-native positioning |
| Saleor | Apache-2.0 | 21k | Strong in Europe; Python/Django; GraphQL |
| WooCommerce | GPL-2.0 | 10.4k | ~27% of all online stores; huge installed base |
| Vendure | MIT | 6.9k | TypeScript-native; developer experience focus |
| Odoo | LGPL-3.0 | 41k | #1 open-source ERP globally; 7M+ users |
| ERPNext | GPL-3.0 | 23k | Strong in India, Middle East, growing LATAM |

---

## Agentic Commerce Ecosystem

```
BUYER                    AGENT LAYER               MERCHANT
  │                          │                         │
  │ "Buy me running shoes     │                         │
  │  under $120"              │                         │
  └──────────────────────────►│                         │
                      [ChatGPT / Gemini /               │
                       Perplexity / Alexa+]             │
                              │                         │
                              │   ACP (Apache 2.0)      │
                              ├──────────────────────►  │
                              │  1. Browse catalog       │
                              │  2. Create cart          │
                              │  3. Get shipping options │
                              │  4. Delegate payment     │
                              │  5. Complete checkout    │
                              │                         │
                              │◄────────────────────── │
                              │  Order confirmation     │
```

**Who implements ACP on the merchant side:** Shopify (built-in), Stripe checkout, Medusa (via ACP hooks), custom implementations using the open spec.

---

## LATAM Retail AI Landscape

### Market Context
- LATAM e-commerce: $175B+ (2026), growing 20%+ YoY
- Brazil: largest LATAM market; strong Shopify + WooCommerce adoption
- Mexico: second-largest; TikTok Shop growing rapidly
- Argentina: cost-conscious — open source preferred over SaaS
- Colombia, Chile, Peru: fast-growing mid-market

### Key LATAM Dynamics
1. **Cash/PIX dominance:** ACP's payment delegation must handle PIX (Brazil), OXXO (Mexico), PSE (Colombia) — not just credit cards
2. **Informal retail:** Large segment of brick-and-mortar without digital inventory — huge opportunity for AI catalog enrichment
3. **Cross-border commerce:** US → LATAM dropshipping growing; Amazon Skills + nexscope tools relevant
4. **Language:** Spanish + Portuguese catalogs essential — NVIDIA Catalog Enrichment's 50-language support is a differentiator

### LATAM Opportunities for Globant
| Opportunity | Market | Solution Stack | Revenue Range |
|------------|--------|---------------|---------------|
| ACP Integration for Regional Retailers | Brazil, Mexico, Colombia | ACP + Medusa + PIX handler | $80k–$300k |
| Catalog Enrichment for Mid-Market | All LATAM | NVIDIA Blueprint + Claude | $50k–$200k |
| AI Inventory Optimization | All LATAM | InvAgent + InvenTree/Odoo | $60k–$250k |
| Amazon Seller Acceleration | Brazil, Mexico | nexscope-ai/Amazon-Skills | $30k–$120k |
| AI-Powered POS + Analytics | Brick-and-mortar | Odoo + AI agents | $100k–$500k |

---

## Competitive Moat for Globant in Retail AI

**Strengths to build on:**
1. Deep engineering capacity to customize Medusa/Saleor/Odoo at source level
2. LATAM relationships and regional payment expertise (PIX, OXXO, etc.)
3. Ability to host NVIDIA Retail Blueprints on-premise for privacy-conscious clients
4. Can wire ACP to any existing retail platform — not dependent on Shopify/Stripe

**Risks:**
1. Shopify AI Toolkit commoditizes basic store management — focus on complex integrations
2. ACP adoption moving fast — need to stay current on spec versions
3. SMB clients may prefer SaaS over custom builds — target mid-market+

---
*Auto-updated by Globant AI Studios ingest pipeline.*
