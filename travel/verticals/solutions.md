# 🏭 Vertical Solutions — Travel & Hospitality

> Existing platforms to customize with AI. Strategy: start with functional system, add agentic layer on top.
> Last updated: 2026-07-10

## Property Management Systems (PMS)

| Platform | License | Repo / URL | Stack | AI Customization Path |
|----------|---------|-----------|-------|----------------------|
| **QloApps** | OSL-3.0 (free) | [Qloapps/QloApps](https://github.com/Qloapps/QloApps) | PHP/MySQL, Apache | Add AI concierge via QloApps hooks API — wrap front desk queries with Claude; auto-generate availability responses from PMS data |
| **Mews** | Commercial | mews.com | SaaS (API-first) | Mews Open API → MCP server → AI upsell agent. MIT SDKs available (fiscalizations lib). Largest cloud-native PMS in EMEA. |
| **Hotelogix** | Commercial | hotelogix.com | SaaS | REST API available; build AI guest communication on top |

## Online Travel Agency (OTA) Platforms

| Platform | License | URL | Description | AI Path |
|----------|---------|-----|-------------|---------|
| **PHPTRAVELS** | Commercial (open-source community ed.) | [phptravels.com](https://phptravels.com/open-source-travel-management-software) | Full B2B/B2C OTA — flights, hotels, tours, transfers. Supports Amadeus, Sabre, Travelport via adapters. | Add AI search + recommendation layer via PHP hooks; wrap booking flows with LangGraph agent |
| **ExcursioX** | MIT | [moizkamran/ExcursioX](https://github.com/moizkamran/ExcursioX) | Open-source travel CRM with ticketing, booking, hotel management. Laravel + Vue. | Add AI sales assistant: leads → itinerary → quote → booking pipeline with Claude |

## GDS / Flight Inventory Access

| Platform | License | Description | Integration Pattern |
|----------|---------|-------------|---------------------|
| **Amadeus Self-Service** | MIT SDKs (free sandbox) | 420+ airlines, hotels, POI. Free sandbox; paid production. | Use `amadeus4dev/amadeus-python` or `-node` as tool in LangChain/LlamaIndex agent |
| **Sabre Mosaic** | Commercial (MCP available) | 420+ airlines. Enterprise MCP server connects LLMs directly to airline inventory. REST/JSON, NDC-native. | Register as Sabre developer → use MCP server → agent can search, price, book directly |
| **DIDA Hotel API** | Free (via MCP) | 2M+ hotels, real-time inventory, zero call limits. World #3 B2B travel. | `DIDA-AI/Dida-hotel-MCP-CN` — plug into Claude Desktop or any MCP client |

## Customer Experience / Chatbot Platforms

| Platform | License | Description | Use Case |
|----------|---------|-------------|----------|
| **KaibanJS** | MIT | Multi-agent JS framework with airline call-center reference. | Customer service automation: cancel, rebook, credit — with escalation to human |
| **Botpress** | MIT | Open-source chatbot + agent platform. Integrates with travel APIs. | Guest communication bot for hotels; WhatsApp + web |

## Tour & Experience Marketplaces

| Platform | License | Description |
|----------|---------|-------------|
| **Rezdy** | Commercial | Tours + activities distribution API (Airbnb Experiences, GetYourGuide competitor) |
| **FareHarbor** | Commercial | Activity booking widget + API — popular in LATAM tourism operators |
| **OpenTrip (concept)** | Apache-2.0 (reference) | Open standard for tour/activity booking messages (OpenTravel Alliance spec) |

## AI Add-On Architecture

```
[Existing Platform (QloApps / PHPTRAVELS / Amadeus)]
              ↓
[MCP Server Layer (flights-mcp / DIDA MCP / TravelMCP)]
              ↓
[Agent Orchestration (LangGraph / KaibanJS / CrewAI)]
              ↓
[Claude / GPT / Gemini (reasoning + response generation)]
              ↓
[Channel (WhatsApp / Web / Voice / Email / B2B Portal)]
```

---
*See also: `repos/foundations.md` for SDK-level building blocks.*
