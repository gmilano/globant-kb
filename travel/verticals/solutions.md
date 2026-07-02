# Vertical Solutions — Travel Industry

> Real platforms with open-source cores that Globant can build AI on top of

## Hotel & Property Management

| Platform | Repo | License | Best For | AI Opportunity |
|----------|------|---------|----------|----------------|
| **QloApps** | [Qloapps/QloApps](https://github.com/Qloapps/QloApps) | OSL-3.0 | Independent hotels and boutique chains; full PMS + booking engine + channel manager | AI dynamic pricing agent, LLM-powered upsell at checkout (room upgrades, spa packages), automated guest communication agent, demand forecasting for revenue management |
| **Odoo (Hotel Module)** | [JayVora-SerpentCS/OdooHotelManagementSystem](https://github.com/JayVora-SerpentCS/OdooHotelManagementSystem) | LGPL-3.0 | Hotels already on Odoo ERP wanting unified operations | AI front-desk chatbot integrated with Odoo CRM, occupancy forecasting via Odoo AI module, automated billing reconciliation |

## Travel Agency & Tour Operator

| Platform | Repo | License | Best For | AI Opportunity |
|----------|------|---------|----------|----------------|
| **ExcursioX** | [moizkamran/ExcursioX](https://github.com/moizkamran/ExcursioX) | MIT | SMB travel agencies needing CRM + ticketing + hotel management in one stack | AI itinerary suggestion sidebar, lead scoring agent for new inquiries, automated follow-up email agent, package pricing optimization |
| **ERPNext (Travel)** | [frappe/erpnext](https://github.com/frappe/erpnext) | GPL-3.0 | Travel agencies needing invoicing, supplier management, and payroll | LangChain agent for cost breakdown Q&A, automated supplier payment reminders, AI-generated tour cost estimates from customer requirements |
| **Apache OFBiz** | [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Apache 2.0 | Large tour operators with complex product catalogs and multi-currency operations | Embedded ML models for package demand forecasting, AI pricing engine via Java service layer, automated order fulfillment workflows |

## GDS & Flight Data

| Platform | Repo | License | Best For | AI Opportunity |
|----------|------|---------|----------|----------------|
| **Amadeus Python SDK** | [amadeus4dev/amadeus-python](https://github.com/amadeus4dev/amadeus-python) | MIT | Python-stack travel agents needing live flight search, hotel rates, and ancillaries | Wrap as LangChain/LangGraph tool; AI agent calls `flight_offers_search()` and `hotel_offers_search()` autonomously; trip purpose prediction API for corporate travel |
| **Amadeus Node SDK** | [amadeus4dev/amadeus-node](https://github.com/amadeus4dev/amadeus-node) | MIT | Node.js/TypeScript travel apps and serverless booking microservices | Same GDS capabilities in TypeScript; ideal for Next.js travel frontends with server actions calling Amadeus via agent tool |

## Standards & Interoperability

| Platform | Resource | License | Best For | AI Opportunity |
|----------|----------|---------|----------|----------------|
| **OpenTravel Alliance** | [opentravel.org](https://opentravel.org) | Apache 2.0 | Any travel system needing standardized data schemas (OTA XML/JSON) | Use OTA schemas to normalize supplier feeds into a unified vector store for RAG-powered travel Q&A agents |
| **A2A Travel Interoperability** | Emerging standard (2026) | Open | AI agents from different vendors interoperating on booking tasks | Wire hotel and flight provider MCP servers to LangGraph booking agents; Marriott and IHG already implementing |

## Platform Selection Guide

| Scenario | Recommended Stack |
|----------|------------------|
| New hotel client, AI-native PMS | QloApps (base PMS) + LangGraph agent (pricing + upsell) + Amadeus SDK (channel connect) |
| Travel agency wanting AI upsell | ExcursioX (MIT CRM) + CrewAI crew (Researcher + Booker + Concierge) |
| Enterprise tour operator | Apache OFBiz (ERP) + LangChain agents (order Q&A, cost estimation) + NeuralForecast (demand) |
| Existing Odoo agency client | Odoo Hotel Module + LangChain over Odoo REST API + Amadeus Python SDK for live rates |
| Corporate travel management | ERPNext (travel module) + CrewAI corporate travel crew + Amadeus SDK for policy compliance |
