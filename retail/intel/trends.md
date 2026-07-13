# Trends — Retail AI

> Last updated: 2026-07-13

## Macro Context

Agentic AI in retail hit an inflection point in early 2026. The Agentic Commerce Protocol (ACP) went live with Walmart, Shopify (1M+ merchants), and Etsy. McKinsey projects $1T US / $3–5T global agent-driven commerce by 2030. 73% of consumers already use AI in their shopping journey. NRF 2026 declared the shift from "what-if to what-now."

---

## T1 — ACP Becomes the Checkout Standard

**What**: The Agentic Commerce Protocol (OpenAI + Stripe, Apache-2.0) is now in beta with live transactions across 1M+ Shopify merchants + Walmart + Etsy. Single line of code for Stripe merchants; open spec for others.  
**Why it matters**: AI agents can now browse, negotiate, and complete purchases without human intervention. Retailers without ACP will become invisible to AI shoppers.  
**Action**: Evaluate ACP integration timeline. Priority for any client processing >$5M online.

## T2 — Answer Engine Optimization (AEO) Replacing SEO

**What**: As consumers shift to AI assistants (ChatGPT, Perplexity, Claude) for product research, traditional SEO loses value. AI agents pull structured product data, not indexed pages.  
**Why it matters**: Brands with rich, structured, real-time product data (schema.org, JSON-LD, vector embeddings) win AI-driven discovery. Catalog quality becomes a competitive moat.  
**Action**: Audit client product catalogs; implement AI-readable schemas; build catalog enrichment agents (NVIDIA blueprint).

## T3 — Voice Commerce Agents — Fastest Growing Segment

**What**: Voice-Commerce Agents growing at 36.25% CAGR through 2031 (Mordor Intelligence). Amazon Alexa+, Google Assistant, and open-source alternatives integrating with ACP.  
**Why it matters**: Hands-free purchasing for grocery, household items, and repeat orders. LATAM opportunity: voice in Portuguese/Spanish on WhatsApp.  
**Action**: Prototype WhatsApp voice + Claude Haiku + Medusa for LATAM grocery/convenience use case.

## T4 — Autonomous Purchase Agents (70% Consumer Comfort)

**What**: 70% of consumers comfortable with AI agents making purchases autonomously. Moving from recommendation → execution. AI agents compare prices, select variants, complete checkout.  
**Why it matters**: The trust barrier is falling faster than infrastructure readiness. First movers building agent-native storefronts will capture AI-shopper market share.  
**Action**: Build ACP-compliant product APIs + guardrails (spend limits, brand rules) for client storefronts.

## T5 — Composable Commerce + Headless = AI-Readiness

**What**: Medusa v2 stable with MCP-native support. Headless architectures (APIs over monoliths) are inherently more agent-friendly than legacy platforms.  
**Why it matters**: Retailers on headless platforms can add AI capabilities without re-platforming. Monolith retailers face a 12–24 month migration gap.  
**Action**: Use Medusa as the OSS reference for client headless migration projects.

## T6 — NVIDIA Retail AI Blueprints

**What**: NVIDIA released Multi-Agent Intelligent Warehouse + Retail Catalog Enrichment blueprints (Jan 2026). Apache-2.0. Use NIM microservices + LangGraph.  
**Why it matters**: Enterprise-grade, GPU-optimized retail AI available as OSS starting points. Particularly valuable for catalog enrichment at scale (10M+ SKUs).  
**Action**: Qualify NIM deployment cost for client catalogs; consider CPU-fallback for LATAM SMB.

## T7 — AI Shelf Audit (Computer Vision at Store Level)

**What**: Autonomous shelf audit using computer vision + LLMs to detect out-of-stock, planogram violations, freshness. Walmart piloting; OSS: `shelfops` repo.  
**Why it matters**: 8.3% of retail revenue lost to out-of-stocks. CV agents can reduce this by 40–60% with daily automated audits vs. weekly manual.  
**Action**: Build PoC with NVIDIA vision model + Medusa inventory API for CPG/retail client.

## T8 — Demand Forecasting + Inventory AI

**What**: stockpyl (MIT), Prophet (MIT), and now LLM-augmented forecasting agents that incorporate unstructured data (weather, social trends, local events) alongside historical sales.  
**Why it matters**: $1.1T in overstock and $634B in lost sales from stockouts annually (IHL Group). Even 5% accuracy improvement = significant P&L impact.  
**Action**: Combine Prophet + stockpyl + Claude as a demand signal enrichment agent for retail ERP clients.

## T9 — WhatsApp Commerce Dominance in LATAM

**What**: Brazil (97% WhatsApp penetration) + PIX payments create a unique conversational commerce opportunity. WhatsApp Business API now supports catalog, cart, and payment flows.  
**Why it matters**: Underserved by Shopify/Amazon; local brands + SMBs need AI-native WhatsApp storefronts. MercadoPago + PIX + WhatsApp + Claude = full stack.  
**Action**: Build a reference architecture: Medusa (catalog/inventory) + WhatsApp Business API + Claude Haiku + PIX. Target Brazil D2C brands.

## T10 — RecSys + LLM Hybrid Recommendations

**What**: LightFM (collaborative + content-based) combined with LLM-generated product embeddings produces significantly better recommendations than either alone. Emerging pattern in 2026.  
**Why it matters**: Cold start problem (new users/products) is solved by LLM semantic understanding; at-scale personalization is solved by LightFM's Cython performance.  
**Action**: Implement two-stage RecSys: LightFM for ranking + Claude Haiku for explanation + diversity injection.

## T11 — Benchmark Gap: AI Agents Still Below 50% on Real Shopping Tasks

**What**: ShoppingBench (Princeton) shows GPT-4.1 scoring <50% on realistic shopping agent tasks in 2026. Biggest gaps: price negotiation, bundle comparison, BOPIS flows.  
**Why it matters**: Production shopping agents need custom fine-tuning or specialized tools, not just off-the-shelf LLMs. Specialist advantage for system integrators.  
**Action**: Use ShoppingBench as evaluation harness for client shopping agent deployments; document accuracy vs. task type.

## T12 — Asia-Pacific Fastest Growing (34.88% CAGR)

**What**: Unmanned store proliferation (Amazon Go model), live-stream commerce, and super-app ecosystems driving APAC retail AI adoption. China, South Korea, Southeast Asia leading.  
**Why it matters**: Global benchmark for what agentic retail looks like at scale. Patterns (unmanned checkout, social commerce agents) are 2–3 years ahead of Western markets.  
**Action**: Monitor APAC OSS retail AI projects (mall4j, etc.) for emerging patterns applicable to LATAM markets.

## T13 — 97% Retailers Increasing AI Spend (But Only 5% of Budget)

**What**: Almost universal intent to invest, but budget allocation is still modest. This creates a professional services opportunity for fast, high-ROI AI implementations.  
**Why it matters**: "Prove it works at small scale fast" is the winning sales motion. PoC → pilot → scale vs. big-bang transformation.  
**Action**: Build a 4–6 week AI retail PoC offer (AEO audit + catalog enrichment agent + recommendation layer).

## T14 — EU AI Act Compliance for Retail Data

**What**: EU AI Act full obligations live Aug 2, 2026. Retail AI systems using profiling, recommendation, or pricing optimization may be classified as high-risk (Art. 6).  
**Why it matters**: Clients with EU operations need documented AI system registers, bias audits, and opt-out mechanisms for recommendation engines.  
**Action**: Add EU AI Act assessment to any recommendation engine engagement in EU markets.

## T15 — Globant-Specific: LATAM First-Mover Window

**What**: ACP not yet live in LATAM. WhatsApp + PIX + conversational commerce has no dominant OSS player. ERPNext/Odoo + AI is underserved.  
**Why it matters**: 12–18 month window to establish reference architectures and case studies before US/EU system integrators enter.  
**Action**: Prioritize Brazil and Mexico pilots in H2 2026. Publish case studies. Build LATAM-specific ACP bridge.

---
*Sources: Mordor Intelligence, NRF Research, McKinsey, ShoppingBench (Princeton), Coherent Market Insights, IHL Group.*
