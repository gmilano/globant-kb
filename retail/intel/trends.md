# Trends — Retail & E-Commerce AI

> Current signals, emerging patterns, and directional bets. Updated: 2026-07-10

## T1 — Agentic Commerce is the New Default Channel

AI agents completing purchases (not just recommending) is the defining shift of 2026. ChatGPT Shopping, Google Gemini Checkout, Perplexity Buy, and Amazon Alexa+ all perform end-to-end purchasing. The **Agentic Commerce Protocol (ACP)** — open standard by OpenAI + Stripe + Meta — is the infrastructure. 1M+ merchants live.

**Signal:** AI-sourced traffic to retail sites up **+1,200% YoY**. Traditional organic search down 10%.

**Implication for Globant:** Every retail client needs ACP integration as baseline infrastructure.

---

## T2 — The "Invisible Merchant" Problem

Retailers without ACP-compatible product feeds are invisible to AI shopping agents. AI agents browse by semantic attributes (material, size, use case) — not SEO keywords. Retailers with poor structured data are being filtered out before the shopper even sees them.

**Emerging pattern:** "AI SEO" — optimizing product catalog attributes, descriptions, and structured data for AI agent browsing, not human search.

---

## T3 — AI Catalog Enrichment at Scale

NVIDIA's Retail Catalog Enrichment blueprint (NRF Jan 2026) enables: 1 product image → rich catalog entry with 3D model + 50-language descriptions + variant images + FAQ + ACP schema. Nemotron Nano Omni + FLUX Kontext + TRELLIS pipeline. Cost: fraction of human copywriting.

**Who needs this:** Mid-market retailers with sparse catalogs. SMBs transitioning from brick-and-mortar to online. Cross-border merchants needing localized content.

---

## T4 — From Chatbot to Transaction: Alexa+ Effect

Amazon replaced Rufus (Q&A chatbot) with Alexa for Shopping (Alexa+, May 2026). Result: **3× purchase completion rate**. This validates that the value of AI in retail is in completing transactions, not just answering questions.

Corollary: retail AI investments that only add a chatbot are underperforming. The ROI is in the checkout completion, not the conversation.

---

## T5 — Shopify AI Toolkit Opens the Store to Agents

Shopify's MIT-licensed AI Toolkit (Apr 2026) means Claude Code, Cursor, Codex can now run a Shopify store end-to-end: update inventory, set prices, process orders, customize storefronts. 16 skills. 1M+ Shopify merchants can now have AI operators.

**Implication:** Shopify store management is becoming a commodity AI task. Value moves to strategy and differentiation, not operations.

---

## T6 — Social Commerce + AI Shopping = TikTok Shop Effect

TikTok Shop growing rapidly in LATAM (Mexico, Brazil). AI agents that connect content discovery to purchase are emerging. Products featured in AI-summarized videos driving purchases without human review.

**Open source angle:** nexscope-ai/ecommerce-skills covers TikTok Shop as a supported platform.

---

## T7 — Personalization via LLM Rankers Displaces Classic Collaborative Filtering

Gorse (Apache 2.0) added LLM ranker support and multimodal embeddings in 2026. LLM-based rankers outperform collaborative filtering for cold-start users and long-tail products — the two hardest cases in retail recommendation.

**Trend:** Moving from "users who bought X also bought Y" → "given this user's stated preferences and browsing context, what product best fits their intent?"

---

## T8 — Inventory Intelligence: From Reactive to Predictive to Autonomous

Three generations running simultaneously in 2026:
1. **Reactive:** Alerts when stock hits minimum threshold (legacy)
2. **Predictive:** ML demand forecasting (mainstream)
3. **Autonomous:** LLM multi-agent systems (InvAgent) that reason about demand, negotiate reorders, and execute procurement — zero-shot, no training data required

The shift to autonomous (T3) is nascent but has documented cost reduction + stockout prevention results.

---

## T9 — ACP + PIX/OXXO = LATAM Agentic Commerce Gap

ACP was designed around credit card + bank transfer flows common in the US/EU. LATAM's dominant payment rails (PIX in Brazil, OXXO in Mexico, PSE in Colombia, Mercado Pago across region) need ACP adapters. First movers building these adapters will own agentic commerce infrastructure for the region.

**Opportunity signal:** No dominant open-source ACP-PIX / ACP-OXXO adapter exists yet as of Jul 2026.

---

## T10 — Shelf Intelligence: Computer Vision at the Edge

Emerging pattern: edge AI cameras + local vision models auditing retail shelves for planogram compliance, out-of-stock detection, and pricing verification. Projects like shelfops (Cerebras vs. Gemma comparison) emerging.

**Why now:** Cerebras inference + local Gemma/Llama models make real-time shelf vision economically viable without cloud API costs.

---

## T11 — B2B Commerce Gets AI-Native

B2B e-commerce (procurement, wholesale, distributor ordering) is the next wave for ACP. B2B buyers want AI agents to handle RFQs, PO issuance, and inventory reordering autonomously. Medusa + ACP + ERPNext is a plausible stack.

---

## T12 — Open Source ERP Adoption Accelerated by License Cost Fatigue

Open source ERP adoption grew **32% globally in 2026** driven by enterprise license fatigue from SAP/Oracle. Odoo (LGPL community) and ERPNext (GPL) benefiting most in mid-market. LATAM especially: cost sensitivity makes open source ERP + AI customization a strong value proposition vs. Salesforce Commerce Cloud.

---

## T13 — Trust Barrier: The Remaining Friction in Agentic Commerce

Fewer than **40% of consumers** fully trust AI agents for autonomous purchasing decisions (as of mid-2026). Key friction: fear of wrong purchases, security concerns, lack of transparency.

**Design implication:** Successful agentic commerce products include human approval gates for high-value transactions, receipts with agent audit trails, and easy cancellation flows.

---

## T14 — Multimodal Product Search Replacing Keyword Search

AI-powered visual + semantic search (product image + natural language) replacing keyword search for product discovery. Retailers implementing embedding-based search seeing higher add-to-cart rates than keyword search.

**Open source tooling:** pgvector + PostgreSQL (via Medusa/Saleor) + embedding models (OpenAI, Cohere, open models via Ollama) now production-viable.

---

## T15 — Retail Data Monetization via AI

Retailers with rich customer behavior data are monetizing it as AI training datasets and retail media networks. Amazon's retail media ($40B+) is the model. Open source angle: data governance tools (Airbyte, dbt, OpenMetadata) enable smaller retailers to build similar data assets.

---
*Auto-updated by Globant AI Studios ingest pipeline.*
