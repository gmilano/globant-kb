# Vertical Solutions — Travel & Hospitality

> Production platforms with open licenses — customizable with AI on top.
> Model: start from something functional, add agentic layer above.
> Last updated: 2026-07-06

## Hotel & Property Management

| Platform | License | Repo | Stars | Stack | Use Case |
|----------|---------|------|-------|-------|----------|
| **QloApps** | OSL-3.0 / AFL-3.0 | [Qloapps/QloApps](https://github.com/Qloapps/QloApps) | ~731★ | PHP, PrestaShop | Full hotel PMS + Booking Engine + Hotel Website. Self-hosted. Manages reservations, front desk, housekeeping, rates, OTA channel management. 13k+ forks. Best open-source hotel OS for AI overlay. |
| **Mews Systems** (SDK) | MIT | [MewsSystems/fiscalizations](https://github.com/MewsSystems/fiscalizations) | ~62★ | .NET | Mews is a cloud PMS used by 5k+ hotels. Their fiscalization SDK enables e-invoicing/reporting integrations — entry point for AI-driven finance agents on top of Mews. |

## Online Travel Agency (OTA) Infrastructure

| Platform | License | URL | Stack | Use Case |
|----------|---------|-----|-------|----------|
| **PHPTRAVELS** | LGPL / Commercial | [phptravels.com](https://phptravels.com/open-source-travel-management-software) | PHP, Laravel | Full OTA booking engine: flights, hotels, tours, transfers, visa. Connects to Amadeus, Sabre, Travelport, Duffel. GDS-integrated. 4800+ agencies. Free open-source tier; paid for GDS modules. AI-ready via REST API. |
| **flyai-skill** (Fliggy) | MIT | [alibaba-flyai/flyai-skill](https://github.com/alibaba-flyai/flyai-skill) | Python, MCP | Full travel stack MCP: flights, hotels, attractions, transport, packages. From Alibaba's OTA Fliggy. Works end-to-end from search to booking. Best starting point for MCP-first travel products. |

## Flight Distribution

| Platform | License | Repo | Stars | Stack | Use Case |
|----------|---------|------|-------|-------|----------|
| **fli** | MIT | [punitarani/fli](https://github.com/punitarani/fli) | ~2.4k★ | Python, TypeScript | Google Flights data access via reverse-engineered API. MCP server + CLI + library. No paid API keys. Best developer-friendly flight search. |
| **flights-mcp** (Duffel) | MIT | [ravinahp/flights-mcp](https://github.com/ravinahp/flights-mcp) | ~205★ | Python, Docker | Duffel API MCP — 300+ airlines, NDC-connected, real booking capability. Better for production bookings (actual PNR creation) vs fli (search only). |
| **amadeus-python** | MIT | [amadeus4dev/amadeus-python](https://github.com/amadeus4dev/amadeus-python) | ~650★ | Python | Official Amadeus SDK. Full GDS: flight offers, hotel search, Points of Interest, Delay Prediction, Seat Maps. The enterprise-grade flight distribution layer. |

## Hotel Distribution

| Platform | License | Repo | Stars | Stack | Use Case |
|----------|---------|------|-------|-------|----------|
| **RollingGo Hotel MCP** | MIT | [RollingGo-AI/rollinggo-hotel-mcp](https://github.com/RollingGo-AI/rollinggo-hotel-mcp) | ~80★ | Python, MCP | DIDA-backed: 2M+ hotels, 110k+ direct partners, 500+ suppliers. Real-time pricing and inventory. Free unlimited access. Instant setup for hotel search and booking MCP. |
| **Hotels MCP Server** | MIT | [esakrissa/hotels_mcp_server](https://github.com/esakrissa/hotels_mcp_server) | ~35★ | Python, MCP | Booking.com API integration via MCP. Real availability, pricing, reviews. Good Western-market hotel coverage complement to RollingGo's Asian/global coverage. |

## Agent Coordination Infrastructure

| Platform | License | Repo | Stars | Stack | Use Case |
|----------|---------|------|-------|-------|----------|
| **A2A Protocol** | Apache 2.0 | [a2aproject/A2A](https://github.com/a2aproject/A2A) | ~20k★ | Multi-lang | Google's Agent2Agent open protocol. The coordination layer that lets flight agents, hotel agents, and trip planners talk to each other without central coupling. Foundation for multi-agent travel architectures. |

## How to Customize with AI

### Tier 1: MCP-First (1-2 weeks)
```
QloApps (self-hosted hotel PMS)  OR  flyai-skill (OTA inventory)
        ↓
Claude / GPT-4o as the agent via MCP protocol
        ↓
Natural language booking interface (web / WhatsApp / voice)
```

### Tier 2: Multi-Agent Orchestration (4-8 weeks)
```
LangGraph StateGraph (orchestrator)
    ├── FlightAgent  → fli MCP (Google Flights search)
    ├── BookingAgent → flights-mcp (Duffel) or amadeus-python
    ├── HotelAgent   → rollinggo-hotel-mcp (2M+ hotels)
    └── ItineraryAgent → CrewAI crew with web search tools
        ↓
Unified trip object → QloApps / PHPTRAVELS for fulfillment
```

### Tier 3: Enterprise A2A Platform (8-12 weeks)
```
Travel Planner Agent (Google ADK + A2A)   ← master coordinator
    ├── Hotel Booking Agent (CrewAI + A2A) ← QloApps backend
    ├── Flight Agent (LangGraph + A2A)     ← Amadeus/Duffel
    ├── Car Rental Agent (LangGraph + A2A)
    └── Currency/Finance Agent (A2A)       ← expense reporting
        ↓
Enterprise CRM (HubSpot) + PMS (Mews) + GDS (Amadeus)
```

---
*Updated by ingest pipeline — 2026-07-06.*
