# Vertical Solutions — Retail Industry

> Real platforms with open-source cores that Globant can build AI on top of
> Last updated: 2026-07-04

## Commerce & Storefront

| Platform | Repo | License | Best For | AI Opportunity |
|----------|------|---------|----------|----------------|
| **Medusa** | [medusajs/medusa](https://github.com/medusajs/medusa) | MIT | Mid-market DTC brands, API-first & agent-native commerce (30.9k stars) | AI product search (vector embeddings), LLM shopping assistant, dynamic pricing rules, UCP agent endpoint; v3 workflow engine purpose-built for AI orchestration |
| **Saleor** | [saleor/saleor](https://github.com/saleor/saleor) | BSD-3 | B2C/B2B composable commerce, GraphQL-first (22.2k stars) | Built-in AI agent skill layer; LLM-driven catalog management; Claude/Cursor integration native; first-mover on UCP and Perplexity Shopping compatibility |
| **WooCommerce** | [woocommerce/woocommerce](https://github.com/woocommerce/woocommerce) | GPL-3.0 | SMB to mid-enterprise WordPress stores (30%+ market share, 10k stars) | AI chatbot plugins, Gorse recommendation engine integration, AI product description generation, SEO optimization |
| **OpenCart** | [opencart/opencart](https://github.com/opencart/opencart) | GPL-3.0 | Budget-conscious SMB online stores | AI product description generation via LLM extension, basic chatbot, SEO optimization |
| **PrestaShop** | [PrestaShop/PrestaShop](https://github.com/PrestaShop/PrestaShop) | OSL-3.0 | European SMB e-commerce, strong in LATAM | AI product descriptions, recommendation modules, GDPR/LGPD-compliant chatbot add-ons |

## ERP & Back Office

| Platform | Repo | License | Best For | AI Opportunity |
|----------|------|---------|----------|----------------|
| **Odoo** | [odoo/odoo](https://github.com/odoo/odoo) | LGPL-3.0 | Full-suite retail ops: POS, inventory, CRM, accounting, eCommerce (40k+ stars, 12M users) | AI demand forecasting module (v17+), conversational ops chatbot, AI-driven pricing rules, supplier negotiation agent; LGPL allows use without GPL contamination |
| **ERPNext** | [frappe/erpnext](https://github.com/frappe/erpnext) | GPL-3.0 | SMB to mid-market retail back office (20k stars); strong in LATAM | REST API integration with LangChain agents for inventory Q&A, PO automation, and supplier management; Frappe framework enables custom doctype AI tools |
| **Apache OFBiz** | [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Apache 2.0 | Enterprise catalog management, complex order routing; most permissive license | Deep Java integration for embedded ML models (demand forecasting, scoring, classification) — most flexible for enterprise AI embedding; safest license for IP-sensitive clients |

## POS & In-Store

| Platform | Repo | License | Best For | AI Opportunity |
|----------|------|---------|----------|----------------|
| **Open Source POS** | [opensourcepos/opensourcepos](https://github.com/opensourcepos/opensourcepos) | MIT | Small-format retail POS (PHP/CodeIgniter, MySQL) | Lightweight AI upsell recommendations at checkout, voice input at kiosk, LLM-powered receipt generation |
| **ERPNext POS Next** | [frappe forum](https://discuss.frappe.io/t/introducing-pos-next-the-future-of-open-source-pos-for-erpnext/155560) | AGPL-3.0 | Modern ERPNext POS (v15+), real-time + offline | AI sales associate assistant at terminal, real-time inventory lookup, AI cross-sell prompt at checkout |
| **UniCenta oPOS** | [unicenta/unicentaopos](https://github.com/unicenta/unicentaopos) | GPL-3.0 | Small-format store POS (Java, free) | Lightweight AI upsell recommendations at checkout, voice input at kiosk |

## Recommendation & Personalization

| Platform | Repo | License | Best For | AI Opportunity |
|----------|------|---------|----------|----------------|
| **Gorse** | [gorse-io/gorse](https://github.com/gorse-io/gorse) | Apache 2.0 | Self-hosted product recommendation engine for any retailer (9.6k stars) | Drop-in replacement for AWS Personalize (60-80% cost reduction); LLM re-ranking layer for business-rule injection; A/B testing native |
| **Apache PredictionIO** | [apache/predictionio](https://github.com/apache/predictionio) | Apache 2.0 | ML-powered recommendation and prediction server | Deploy trained recommendation models as REST endpoints into any existing commerce stack |
| **Microsoft Recommenders** | [microsoft/recommenders](https://github.com/microsoft/recommenders) | MIT | Reference library and rapid prototyping (18k stars) | 30+ algorithms for benchmarking before committing to production recommender architecture |

## Demand Forecasting & Analytics

| Platform | Repo | License | Best For | AI Opportunity |
|----------|------|---------|----------|----------------|
| **Nixtla NeuralForecast** | [Nixtla/neuralforecast](https://github.com/Nixtla/neuralforecast) | Apache 2.0 | SKU-level demand forecasting at scale | Neural models (NHITS, PatchTST, Moirai) + promotional calendar features → automated replenishment; <8% MAPE on M5 Walmart benchmark |
| **Nixtla StatsForecast** | [Nixtla/statsforecast](https://github.com/Nixtla/statsforecast) | Apache 2.0 | Fast statistical baseline forecasting (20× faster than pmdarima) | ETS/ARIMA ensemble as interpretable fallback alongside NeuralForecast for robust retail demand use cases |
| **TensorHouse** | [ikatsov/tensor-house](https://github.com/ikatsov/tensor-house) | Apache 2.0 | Retail ML reference implementations | Pricing optimization (DQN RL), demand sensing, promotion effectiveness, CLV modeling — industry-proven patterns in Jupyter notebooks |

## Catalog AI

| Platform | Repo | License | Best For | AI Opportunity |
|----------|------|---------|----------|----------------|
| **NVIDIA Retail Catalog Enrichment** | [NVIDIA-AI-Blueprints/Retail-Catalog-Enrichment](https://github.com/NVIDIA-AI-Blueprints/Retail-Catalog-Enrichment) | Apache 2.0 | Automated product catalog enrichment from images | Transform raw product images → rich titles/descriptions/attributes/tags using VLMs; critical for agentic commerce visibility; reduces catalog ops labor by 80%+ |

## Customer Service

| Platform | Repo | License | Best For | AI Opportunity |
|----------|------|---------|----------|----------------|
| **Rasa** | [RasaHQ/rasa](https://github.com/RasaHQ/rasa) | Apache 2.0 | Enterprise-grade retail chatbot (19k stars), on-prem/private-cloud | CALM architecture for order status, returns, product Q&A, store locator; EU AI Act transparent AI disclosure compliant; LGPD-friendly for LATAM deployments |

## Platform Selection Guide

| Scenario | Recommended Stack |
|----------|------------------|
| Net-new DTC brand, AI-first | Medusa (commerce) + Gorse (recs) + NeuralForecast (demand) + Rasa (CX) |
| Existing Odoo customer adding AI | Odoo v17 AI module + LangChain agent over Odoo REST API + Gorse recommendations |
| Enterprise retailer, Java shop | Apache OFBiz + PredictionIO + TensorHouse ML patterns |
| SMB WordPress store | WooCommerce + Rasa chatbot + Gorse for recommendations |
| Multi-location retail with POS | Odoo POS or OSPOS (MIT) + AI associate assist RAG app + NVIDIA Catalog Enrichment |
| Catalog modernization project | NVIDIA Retail-Catalog-Enrichment (Apache 2.0) + Medusa/Saleor catalog API + Milvus vector search |
| EU client — data residency required | Medusa + Rasa (on-prem) + Gorse (self-hosted) — all deployable in private cloud |
