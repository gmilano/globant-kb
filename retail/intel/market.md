# 🗺️ Market Map — Retail & Consumer AI

> Key players, market sizing, and Globant positioning opportunities.
> Last updated: 2026-07-11

## Market Size

| Segment | 2026 | 2030 | CAGR | Source |
|---------|------|------|------|--------|
| AI in Retail (total) | $18.4B | — | 32.4% → $130.88B (2033) | Industry analysts |
| Agentic AI in Retail | $60.43B | $218.37B (2031) | 29.3% | Previous KB run |
| Agentic Commerce (US only) | $20.57B via agents | $900B–$1T | — | eMarketer / McKinsey |
| Agentic Commerce (global) | — | $3–5T | — | McKinsey |
| Retail tech budgets | $113B (2026) | — | — | Forrester / Microsoft |

## Global Players

| Company | Type | AI Strength | Open Source | Relevance to Globant |
|---------|------|-------------|-------------|----------------------|
| **Shopify** | Platform | ACP-native checkout, AI product descriptions | Limited | Most common client platform; need AI agents that speak Shopify APIs |
| **NVIDIA** | Infrastructure | Merlin recommender, Retail-Agentic-Commerce blueprint | Apache-2.0 (blueprints) | Reference architecture partner |
| **Salesforce** | CRM/Commerce | Einstein AI, AgentForce | No | Common enterprise client; build on top with MCP |
| **Adobe** | Commerce / Analytics | Sensei AI, Experience Cloud | No | Magento (Adobe Commerce) base with AI layers |
| **SAP** | ERP | Joule AI agent, S/4HANA | No | Large enterprise retail clients |
| **Microsoft** | Cloud + AI | Azure AI, Copilot for retail | Partial | Azure partner stack; Copilot4Retail |
| **Google** | Search + AI | Shopping Graph, Lens, A2A protocol | A2A (Apache-2.0) | AI shopping via Google agents |
| **Amazon** | Marketplace + AI | Rufus (shopping agent), AWS retail AI | Limited | Competitor and infrastructure provider |
| **Stripe** | Payments | ACP co-originator | ACP (open spec) | Payment layer in agentic commerce |
| **OpenAI** | AI models | ChatGPT Shopping, ACP | ACP (open spec) | AI shopping agent backbone |

## Open-Source / Globant-Buildable Layer

| Platform | License | Stars | Role in Stack |
|----------|---------|-------|---------------|
| **Medusa.js** | MIT | ~27k | Commerce API foundation |
| **ERPNext** | GPL-3 | ~22k | ERP + inventory layer |
| **Odoo** | LGPL-3 | ~40k | Full business suite |
| **Enthusiast** | MIT | ~800 | AI agent layer for commerce |
| **LightFM** | Apache-2.0 | ~4.7k | Recommendation engine |
| **RecBole** | MIT | ~3.5k | Recommendation research → prod |
| **NVIDIA Merlin** | Apache-2.0 | ~1.8k | GPU-scale inference |
| **LangGraph** | MIT | ~34.5k | Agent orchestration |
| **Mem0** | Apache-2.0 | ~32k | Shopping agent memory |

## Adoption Metrics (2026)

- **89%** of retail and CPG companies actively using or testing AI (McKinsey)
- **89%** of AI adopters report increased revenue; **95%** report decreased operating costs
- **AI personalization** drives **10–15% revenue increase** on average (McKinsey)
- **50%** of consumers remain cautious of fully autonomous AI purchasing
- **<40%** of users fully trust AI for autonomous transactions
- **40%** of enterprise apps will feature task-specific AI agents by end of 2026 (Gartner, up from <5% in 2025)
- Agentic AI will represent **10–15%** of IT spending in 2026, growing to **26%** (~$1.3T) by 2029

## ROI Benchmarks

| Use Case | Benefit | Source |
|----------|---------|--------|
| AI personalization | 10–15% revenue increase | McKinsey |
| Inventory optimization | 50% reduction in stockouts | Microsoft Cloud |
| Supply chain AI | 15% lower logistics costs | Microsoft Cloud |
| Demand forecasting AI | $3M–$6.3M in 3-year benefits | Retail case study |
| Agentic checkout | 20–30% conversion rate increase | Industry |
| Purchase time reduction | 60–70% faster (intent → checkout) | Industry |
| Microsoft AI (Forrester) | 124–282% ROI over 3 years | Forrester |

## LATAM Opportunities

- **Brazil**: Largest retail market in LATAM. LGPD compliance required for personalization AI. Strong WooCommerce + ERPNext adoption. Growing demand for Portuguese-language AI agents.
- **Mexico**: OXXO / Walmart dominant. Demand for omnichannel AI, loyalty agents, supply chain optimization.
- **Argentina**: Economic volatility drives demand for AI-powered dynamic pricing and inventory optimization.
- **Colombia**: Growing e-commerce (icommkt, Vtex strong). Demand for conversational commerce in WhatsApp.
- **Chile**: Early adopter of agentic retail; Falabella + Ripley investing heavily in AI personalization.

## Globant Positioning

| Capability | Build on | License | Time to POC |
|------------|----------|---------|-------------|
| Agentic shopping assistant | Enthusiast + Medusa.js + Claude | MIT | 2–3 weeks |
| Recommendation engine | RecBole + LightFM + FastAPI | MIT/Apache-2.0 | 1–2 weeks |
| Inventory optimization agent | stockpyl + LangGraph + ERPNext | MIT + GPL | 3–4 weeks |
| ACP-compliant merchant endpoint | NVIDIA blueprint + Medusa.js | Apache-2.0 | 2–3 weeks |
| Store-level intelligence | shelfops (CV) + LangGraph | Apache-2.0 | 4–6 weeks |
| WhatsApp commerce agent | Enthusiast + Twilio MCP + Medusa | MIT | 2–3 weeks |

---
*Updated automatically by the ingest pipeline.*
