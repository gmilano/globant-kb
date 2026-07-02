# Vertical Solutions — Retail Industry

> Real platforms with open-source cores that Globant can build AI on top of

## Commerce & Storefront

| Platform | Repo | License | Best For | AI Opportunity |
|----------|------|---------|----------|----------------|
| **Medusa** | [medusajs/medusa](https://github.com/medusajs/medusa) | MIT | Mid-market DTC brands, API-first & agent-native commerce | AI product search (vector embeddings), LLM shopping assistant, dynamic pricing rules, UCP agent endpoint |
| **Saleor** | [saleor/saleor](https://github.com/saleor/saleor) | BSD-3 | B2C/B2B composable commerce, GraphQL-first | Built-in AI agent skill layer; LLM-driven catalog management; Claude/Cursor integration native |
| **WooCommerce** | [woocommerce/woocommerce](https://github.com/woocommerce/woocommerce) | GPL-3.0 | SMB to mid-enterprise WordPress stores (30%+ market share) | AI chatbot plugins, recommendation engine integration, AI product description generation |
| **OpenCart** | [opencart/opencart](https://github.com/opencart/opencart) | GPL-3.0 | Budget-conscious SMB online stores | AI product description generation via LLM extension, basic chatbot, SEO optimization |

## ERP & Back Office

| Platform | Repo | License | Best For | AI Opportunity |
|----------|------|---------|----------|----------------|
| **Odoo** | [odoo/odoo](https://github.com/odoo/odoo) | LGPL-3.0 | Full-suite retail ops: POS, inventory, CRM, accounting, eCommerce | AI demand forecasting module (v17+), conversational ops chatbot, AI-driven pricing rules, supplier negotiation agent |
| **ERPNext** | [frappe/erpnext](https://github.com/frappe/erpnext) | GPL-3.0 | SMB to mid-market retail back office | REST API integration with LangChain agents for inventory Q&A, PO automation, and supplier management |
| **Apache OFBiz** | [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Apache 2.0 | Enterprise catalog management, complex order routing | Deep Java integration for embedded ML models (demand forecasting, scoring, classification) — most flexible for enterprise AI embedding |

## POS & In-Store

| Platform | Repo | License | Best For | AI Opportunity |
|----------|------|---------|----------|----------------|
| **Openbravo** | [openbravo.com](https://www.openbravo.com) | Commercial (open core) | Retail + hospitality POS, multi-site | AI sales associate assistant at terminal, real-time inventory lookup, cross-sell prompt at checkout |
| **UniCenta oPOS** | [unicenta/unicentaopos](https://github.com/unicenta/unicentaopos) | GPL-3.0 | Small-format store POS (Java, free) | Lightweight AI upsell recommendations at checkout, voice input at kiosk |

## Recommendation & Personalization

| Platform | Repo | License | Best For | AI Opportunity |
|----------|------|---------|----------|----------------|
| **Gorse** | [gorse-io/gorse](https://github.com/gorse-io/gorse) | Apache 2.0 | Self-hosted product recommendation engine for any retailer | Drop-in replacement for AWS Personalize; LLM re-ranking layer for business-rule injection |
| **Apache PredictionIO** | [apache/predictionio](https://github.com/apache/predictionio) | Apache 2.0 | ML-powered recommendation and prediction server | Deploy trained recommendation models as REST endpoints into any existing commerce stack |

## Demand Forecasting & Analytics

| Platform | Repo | License | Best For | AI Opportunity |
|----------|------|---------|----------|----------------|
| **Nixtla NeuralForecast** | [Nixtla/neuralforecast](https://github.com/Nixtla/neuralforecast) | Apache 2.0 | SKU-level demand forecasting at scale | Neural models (NHITS, PatchTST) + promotional calendar features → automated replenishment |
| **Nixtla StatsForecast** | [Nixtla/statsforecast](https://github.com/Nixtla/statsforecast) | Apache 2.0 | Fast statistical baseline forecasting | ETS/ARIMA ensemble as interpretable fallback alongside neural models |

## Platform Selection Guide

| Scenario | Recommended Stack |
|----------|------------------|
| Net-new DTC brand, AI-first | Medusa (commerce) + Gorse (recs) + NeuralForecast (demand) |
| Existing Odoo customer adding AI | Odoo v17 AI module + LangChain agent over Odoo REST API |
| Enterprise retailer, Java shop | Apache OFBiz + PredictionIO + custom ML pipeline |
| SMB WordPress store | WooCommerce + AI chatbot plugin + Gorse for recommendations |
| Multi-location retail with POS | Odoo POS or Openbravo + AI associate assist RAG app |
