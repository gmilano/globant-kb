# 🏭 Vertical Solutions — Travel & Hospitality

> Existing platforms customizable with AI. Model: start from something functional, add agentic layer on top.
> Last updated: 2026-07-14 (v6)

## Open Source Platforms

| Platform | License | GitHub | Stack | AI Extension Point | Best For |
|----------|---------|--------|-------|--------------------|---------|
| [QloApps](https://github.com/Qloapps/QloApps) | OSL-3.0 | ~1.2k★ | PHP / PrestaShop | REST API → LLM agent wrapping; AI concierge on booking flow; dynamic pricing model | Independent hotels, boutique chains, tour operators needing full PMS + web + channel mgr |
| [Free-Hotel-Booking-Engine](https://github.com/TravelXML/Free-Hotel-Booking-Engine) | MIT | ~80★ | PHP | Wrap availability search with conversational AI; add yield management agent | Rapid prototype booking engine with AI layer |
| [amadeus-flight-booking-django](https://github.com/amadeus4dev/amadeus-flight-booking-django) | MIT | ~200★ | Python/Django | Replace search form with LLM intent parser; add post-booking agent notifications | Flight booking portal with conversational front-end |

## Commercial Platforms with Open AI Integration

| Platform | Type | AI Integration Path | Key Data |
|----------|------|---------------------|----------|
| **Sabre Mosaic** | GDS (commercial) | Native MCP server (May 2026) — 420+ airlines, 2M hotels, real fare rules, agentic APIs | Industry's first travel MCP; Claude / OpenAI / any MCP client connects directly |
| **Amadeus** | GDS (commercial) | Python SDK (MIT) + community MCP servers; self-service portal closes Jul 17 2026 | Richest flight data; SDK remains MIT open; partner API access required post-Jul 17 |
| **Expedia Group** | OTA (commercial) | MCP connector for Claude (live Jun 2026, US); hotels + flights + cars | 30%+ self-serve support now AI-handled; MCP enables deep integration |
| **Booking.com** | OTA (commercial) | ChatGPT Apps integration (OpenAI MCP); hotel search + booking | First OTA in ChatGPT apps ecosystem; accessible via OpenAI tool-use |
| **DIDA** | B2B Hotel (commercial, free MCP) | [Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) MIT — 2M+ hotels, no key, no rate limit | World's 3rd-largest B2B hotel distribution; freely accessible via MCP |
| **Hotelbeds** | B2B Hotel (commercial) | REST API → Python wrapper → LangGraph tool node | Used by HarimxChoi/langgraph-travel-agent in production |
| **MindTrip** | Agentic platform (commercial) | Sabre + PayPal infrastructure; end-to-end flight booking live (May 2026) | First commercial agentic travel booking; reference for what Globant can build custom |

## How to Layer AI on Existing Platforms

### Pattern: QloApps + AI Concierge
```
QloApps (hotel PMS + booking engine)
         ↓ REST API
LLM Agent (Claude / GPT-4o)
         ↓ tool calls
DIDA MCP (inventory check) + amadeus-python (flight upsell)
         ↓ response
Conversational UI (React / WhatsApp / Telegram)
```

### Pattern: Amadeus SDK + LangGraph
```
User intent (natural language)
         ↓ LLM intent parsing
LangGraph state machine
         ↓ tool nodes
amadeus-python (flight search + pricing + booking)
+ Google Flights MCP (competitive cross-check)
+ DIDA MCP (hotel add-on)
         ↓ booking confirmation
Twilio (SMS/WhatsApp notification)
```

### Pattern: Sabre Mosaic MCP (Enterprise)
```
Enterprise travel portal
         ↓ MCP protocol
Sabre Mosaic MCP Server
         ↓ GDS queries
420+ airlines + 2M hotels (real fare rules)
         ↓ agentic actions
Claude / GPT-4o agent completes booking + payment via PayPal agentic commerce
```

## LATAM-Specific Vertical Opportunities

| Opportunity | Platform Base | AI Layer | Market |
|-------------|--------------|----------|--------|
| LCC AI Yield Manager | amadeus-python | LangGraph price optimization agent | GOL, Aerolíneas Argentinas, LATAM |
| Boutique Hotel AI Concierge | QloApps fork | Claude + DIDA MCP | AR/MX/CO boutique/eco hotels |
| Tour Operator Trip Builder | Free-Hotel-Booking-Engine | CrewAI multi-agent itinerary | BR/PE/MX adventure travel |
| Corporate Travel Bot | LangGraph + Amadeus | HITL approval + Twilio | Enterprise clients in LATAM |

---
*See also: `repos/foundations.md` for underlying open source repos.*
