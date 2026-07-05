# Vertical Solutions — Travel Industry

> Real platforms with open-source cores that Globant can build AI on top of
> Last updated: 2026-07-05

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

## Geo & Routing Infrastructure (NEW Jul 2026)

| Platform | Repo | License | Best For | AI Opportunity |
|----------|------|---------|----------|----------------|
| **OSRM** | [Project-OSRM/osrm-backend](https://github.com/Project-OSRM/osrm-backend) | BSD-2-Clause | High-performance route calculation on OSM data; sub-ms queries | Expose as LangChain tool: agent asks "fastest route from hotel to airport" → OSRM responds in <1ms |
| **Valhalla** | [valhalla/valhalla](https://github.com/valhalla/valhalla) | MIT | Multi-modal routing (car/bike/walk/transit); isochrones; time matrices | Agent calculates walking time between itinerary stops; fleet routing for transfer services |
| **GraphHopper** | [graphhopper/graphhopper](https://github.com/graphhopper/graphhopper) | Apache 2.0 | Java stack routing; custom vehicle profiles; REST API | Embed in Java-based PMS or booking platform for route-aware scheduling |
| **OpenTripPlanner** | [opentripplanner/OpenTripPlanner](https://github.com/opentripplanner/OpenTripPlanner) | LGPL-3.0 | Multi-modal trip planning with GTFS transit data; GraphQL API | LATAM public transit routing (São Paulo SPTrans, Buenos Aires GCBA, CDMX Metro) |
| **osmmcp** | [NERVsystems/osmmcp](https://github.com/NERVsystems/osmmcp) | MIT | OSM as MCP server; geocoding, routing, POI, neighborhood analysis for LLMs | Wire to any LangGraph/CrewAI agent — no custom SDK, just MCP tool calls for all geo needs |

## Platform Selection Guide

| Scenario | Recommended Stack |
|----------|------------------|
| New hotel client, AI-native PMS | QloApps (base PMS) + LangGraph agent (pricing + upsell) + Amadeus SDK (channel connect) |
| Travel agency wanting AI upsell | ExcursioX (MIT CRM) + CrewAI crew (Researcher + Booker + Concierge) |
| Enterprise tour operator | Apache OFBiz (ERP) + LangChain agents (order Q&A, cost estimation) + NeuralForecast (demand) |
| Existing Odoo agency client | Odoo Hotel Module + LangChain over Odoo REST API + Amadeus Python SDK for live rates |
| Corporate travel management | ERPNext (travel module) + CrewAI corporate travel crew + Amadeus SDK for policy compliance |
| Geo-aware itinerary agent | osmmcp (all geo needs via MCP) + OpenTripPlanner (transit) + OSRM (driving) + LangGraph (orchestration) |
| LATAM sustainable transit | OpenTripPlanner + GTFS (SPTrans/GCBA/CDMX) + Valhalla (bike/walk legs) + Dify (chat UI) |
| Airport/hotel kiosk (offline) | Llama 4 local (Ollama) + osmmcp (OSM, self-hosted) + OSRM (self-hosted) + QloApps |
