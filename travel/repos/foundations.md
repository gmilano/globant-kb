# 🏗️ Foundational Repos — Travel & Hospitality

> Open-source bases to build on. Active communities, permissive licenses.
> Last updated: 2026-07-10

## Core Infrastructure

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [amadeus4dev/amadeus-python](https://github.com/amadeus4dev/amadeus-python) | MIT | ~900 | Official Python SDK for Amadeus Self-Service APIs — flights, hotels, points of interest, city search, airport autocomplete, seat maps. Free sandbox tier. | Yes — wrap with LangChain/LlamaIndex tool |
| [amadeus4dev/amadeus-node](https://github.com/amadeus4dev/amadeus-node) | MIT | ~600 | Official Node.js SDK for Amadeus Self-Service APIs. Same API surface as Python SDK. | Yes — MCP-server wrapper |
| [amadeus4dev/amadeus-open-api-specification](https://github.com/amadeus4dev/amadeus-open-api-specification) | MIT | ~350 | OpenAPI 3.0 spec for all Amadeus APIs. Feed to LLM to auto-generate tool definitions. | Yes — auto-generate agent tools |
| [Qloapps/QloApps](https://github.com/Qloapps/QloApps) | OSL-3.0 | ~1.3k | Free and open-source hotel PMS + booking engine + hotel website. PHP/MySQL. Deployed by 4,000+ hotels globally. Modular hooks system for AI layer integration. | Yes — add AI concierge on top |
| [moizkamran/ExcursioX](https://github.com/moizkamran/ExcursioX) | MIT | ~45 | Open-source travel CRM with integrated ticketing, booking, and hotel management. Laravel + Vue. | Yes — add AI booking assistant |
| [kaiban-ai/KaibanJS](https://github.com/kaiban-ai/KaibanJS) | MIT | ~3.4k | JavaScript multi-agent framework with Kanban-inspired task management. Official airline call-center demo. Production-ready for travel customer service. | Core framework |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | MIT | ~103k | LLM application framework. Most travel AI agents use LangChain's tool-calling + memory primitives. | Core framework |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | ~12.8k | State-machine workflow for multi-step agentic AI. Best choice for complex booking flows (search → compare → book → confirm). | Core orchestration |
| [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | ~52.8k | Role-based multi-agent framework. Popular for travel planning (destination researcher + itinerary builder + budget optimizer roles). | Core framework |
| [mews-systems/fiscalizations](https://github.com/MewsSystems/fiscalizations) | MIT | ~62 | .NET library for fiscal reporting across 20+ countries (hotel tax/receipt compliance). Useful for hospitality platforms needing fiscal compliance. | Compliance layer |

## Key API Ecosystems (non-open-source but free tiers available)

| Platform | Free Tier | Coverage | Notes |
|----------|-----------|----------|-------|
| Amadeus Self-Service | Yes (sandbox) | Flights, hotels, POI | MIT SDKs above |
| DIDA Hotel API | Yes (via MCP) | 2M+ hotels global | World #3 B2B travel |
| Open-Meteo | Yes (MIT API) | Weather worldwide | No key required, use in travel agents |
| Nominatim/OSM | Yes (free) | Geocoding / maps | No key for moderate use |

## Foundational Standards

| Standard | Owner | Description |
|----------|-------|-------------|
| NDC (New Distribution Capability) | IATA | XML standard for airline direct distribution to AI agents and OTAs — bypasses GDS. Enables ancillary upsell (seats, bags) via AI. |
| OpenTravel Alliance | OTA | XML/JSON schema standards for travel message exchange (hotel availability, car rental, cruise). Enables interoperability between systems. |
| MCP (Model Context Protocol) | Anthropic | Emerging integration layer connecting AI agents to travel inventory (Sabre, DIDA, Amadeus all adopting). |

---
*See also: `verticals/solutions.md` for full vertical platforms.*
