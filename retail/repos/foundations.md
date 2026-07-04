# Foundational Repos — Retail Industry

> The bedrock open-source projects every retail AI initiative should know
> Last updated: 2026-07-04

| # | Repo | License | Stars | Role |
|---|------|---------|-------|------|
| 1 | [medusajs/medusa](https://github.com/medusajs/medusa) | MIT | 30.9k+ | Headless commerce platform (Node.js/TypeScript); API-first, modular architecture designed for AI augmentation — the recommended base for AI-native storefronts in 2026; fastest-growing open-source commerce platform at 33.4% monthly community growth |
| 2 | [saleor/saleor](https://github.com/saleor/saleor) | BSD-3 | 22.2k+ | High-performance GraphQL headless commerce API (Python/Django); MACH-native with native AI agent skill support — point Cursor, Claude, or Codex directly at the Saleor skill; first-mover on Universal Commerce Protocol (UCP) compatibility |
| 3 | [odoo/odoo](https://github.com/odoo/odoo) | LGPL-3.0 | 40k+ | Full ERP + CRM + POS + eCommerce suite; most feature-complete retail back-office open source; v17+ adds AI demand forecasting module and built-in chatbot capabilities; 12M+ users worldwide |
| 4 | [frappe/erpnext](https://github.com/frappe/erpnext) | GPL-3.0 | 20k+ | ERPNext — open source ERP with inventory, procurement, retail POS, and accounting modules; Python/Frappe REST APIs pair cleanly with LangChain agent tools; strong in LATAM and India mid-market |
| 5 | [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Apache 2.0 | 3k+ | Apache OFBiz — mature Java ERP/CRM/catalog/inventory framework; most customizable open-source retail backbone for enterprise scenarios requiring deep embedded ML; only Apache 2.0 full-suite ERP |
| 6 | [gorse-io/gorse](https://github.com/gorse-io/gorse) | Apache 2.0 | 9.6k+ | Universal recommender system engine (Go); plug-and-play product recommendations with REST API, admin dashboard, A/B testing, and support for both CF and LLM rankers; growing 13% in stars this week alone |
| 7 | [Nixtla/neuralforecast](https://github.com/Nixtla/neuralforecast) | Apache 2.0 | 3.5k+ | Neural time-series forecasting; covers demand forecasting, seasonality decomposition, promotional lift; benchmarked on M5 Walmart retail competition dataset with <8% MAPE using PatchTST/Moirai models |
| 8 | [Nixtla/statsforecast](https://github.com/Nixtla/statsforecast) | Apache 2.0 | 4k+ | Statistical forecasting (ARIMA, ETS, Theta) — 20× faster than pmdarima; ideal as ensemble baseline alongside NeuralForecast for robust retail demand use cases |
| 9 | [microsoft/recommenders](https://github.com/microsoft/recommenders) | MIT | 18k+ | Reference implementations of 30+ recommendation algorithms with Jupyter notebooks; use for rapid prototyping and algorithm selection before committing to a production recommender stack |
| 10 | [RasaHQ/rasa](https://github.com/RasaHQ/rasa) | Apache 2.0 | 19k+ | Open-source ML framework for retail customer service chatbots (text + voice); CALM architecture (2025) adds LLM-driven dialogue understanding while preserving on-prem deployment for EU AI Act compliance |
| 11 | [ikatsov/tensor-house](https://github.com/ikatsov/tensor-house) | Apache 2.0 | 1.4k+ | Reference Jupyter notebooks for enterprise retail ML: dynamic pricing (DQN RL), demand sensing, promotion effectiveness, supply chain optimization, customer lifetime value — proven patterns from industry practitioners |
| 12 | [woocommerce/woocommerce](https://github.com/woocommerce/woocommerce) | GPL-3.0 | 10k+ | WordPress-native ecommerce platform powering 30%+ of all online stores; massive plugin ecosystem enables LLM search, AI chatbots, and pricing optimization add-ons |

## Selection Rationale

- **Commerce layer:** Medusa (MIT, agent-native) for net-new builds; Saleor for GraphQL-first enterprise; WooCommerce for WordPress-based SMB clients.
- **ERP/back-office:** Odoo for full-suite retail clients; ERPNext for budget-conscious mid-market; Apache OFBiz for Java enterprise with deep customization needs.
- **AI/ML layer:** Gorse for recommendations; NeuralForecast + StatsForecast for demand forecasting; Microsoft Recommenders for algorithm research; TensorHouse for proven ML patterns.
- **Customer service:** Rasa (Apache 2.0) for on-prem NLU chatbots — critical for EU AI Act and LGPD compliance scenarios in EU and LATAM.
- **License posture:** MIT (Medusa, CrewAI, Microsoft Recommenders) and Apache 2.0 (OFBiz, Gorse, NeuralForecast, Rasa, TensorHouse) are fully commercial-safe. LGPL (Odoo) and GPL (WooCommerce, ERPNext) require careful scoping — use as-is or buy commercial license.
