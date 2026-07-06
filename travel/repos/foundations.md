# Foundational Repos — Travel & Hospitality

> Bases to build on. Open license, active community, real production usage.
> Last updated: 2026-07-06

## Core Foundations

| Repo | License | Stars | Stack | Role |
|------|---------|-------|-------|------|
| [opentripplanner/OpenTripPlanner](https://github.com/opentripplanner/OpenTripPlanner) | LGPL-2.1 | ~5.5k★ | Java, GraphQL | Industry-standard multi-modal trip planner. GTFS + OpenStreetMap routing. Powers transit apps for 100+ city governments. 26,985 commits, 255 contributors. Add AI on top for NL route queries. |
| [Qloapps/QloApps](https://github.com/Qloapps/QloApps) | OSL-3.0 | 1.2k★ | PHP, MySQL | Hotel PMS + booking engine + channel manager. OTA sync (Booking.com, Expedia, Airbnb), room management, invoicing. Add AI concierge layer for upsell & guest service automation. |
| [LibreBooking/librebooking](https://github.com/LibreBooking/librebooking) | Apache-2.0 | 900★ | PHP | Flexible resource scheduling & reservation system. Used for meeting rooms, equipment, tours. Mobile-friendly. Apache-2.0 means clean Globant IP. |
| [OSU-NLP-Group/TravelPlanner](https://github.com/OSU-NLP-Group/TravelPlanner) | MIT | 468★ | Python | ICML'24 Spotlight. 4M-record travel dataset + 1,225 planning intents + sandbox. Use as: (1) eval suite for your travel agent, (2) fine-tuning data source, (3) benchmark to communicate quality to clients. |
| [opentraveldata/opentraveldata](https://github.com/opentraveldata/opentraveldata) | LGPL/CC-BY | 180★ | CSV, Python | Canonical open dataset: 10,000+ airports, 900+ airlines, country/timezone/currency codes. Foundation for all travel search reference data. Companion: OpenTREP full-text C++ search engine. |
| [moizkamran/ExcursioX](https://github.com/moizkamran/ExcursioX) | MIT | 65★ | MERN | Travel agency CRM with integrated ticketing (flights, trains, buses), hotel management & booking. MIT license — cleanest IP for Globant to fork. Starting point for tour-operator solutions. |
| [MikkoParkkola/trvl](https://github.com/MikkoParkkola/trvl) | MIT | 27★ | Go | MCP server exposing Google Flights, Hotels, Airbnb, Booking.com as LLM tools. The foundation for any conversational travel search agent. Single Go binary; no API keys; production-ready MCP transport. |
| [mauriceboe/TREK](https://github.com/mauriceboe/TREK) | MIT | 210★ | TypeScript | Self-hosted trip planner: real-time collaboration, interactive maps, PWA, SSO, budgets, packing lists. Foundation for corporate travel management tools. Deploy on-prem for data-sovereign clients. |

## What Each Foundation Enables

### OpenTripPlanner → AI-Powered Transit Assistant
```
OSM + GTFS data → OpenTripPlanner (routing) → GraphQL API
       ↓
LLM agent parses natural language query → calls OTP API → formats itinerary
       ↓
"How do I get from Palermo to Retiro by public transit at 9pm?" answered in seconds
```

### QloApps → AI Hotel Concierge
```
QloApps PMS (rooms, rates, reservations) → REST API
       ↓
LangGraph agent: guest NL request → check availability → upsell rooms/spa → book
       ↓
WhatsApp/Web chat interface for guests
```

### TravelPlanner Dataset → Benchmark-Driven Development
```
1,225 planning intents with constraints (budget, dietary, mobility)
       ↓
Run your agent against dataset → compute delivery rate, commonsense, final-trip score
       ↓
Present quality metrics to client at kickoff — defensible engineering
```

### opentraveldata → Reference Data Service
```
10k airports + 900 airlines + timezone/currency data → microservice
       ↓
Travel agents use it for IATA code lookup, flight time zone normalization, currency display
       ↓
No vendor dependency — fully open, self-hostable
```

---
*See also: `verticals/solutions.md` for full vertical platforms.*  
*Updated automatically by the Globant AI Studios ingest pipeline.*
