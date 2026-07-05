# Market Intelligence — Travel Industry

> Key players, competitive map, and partnership landscape as of 2026-07-05

## Key Players

### GDS / Infrastructure
| Player | Position | Open Source Posture | Relevance to Globant |
|--------|----------|---------------------|---------------------|
| **Amadeus IT Group** | Largest GDS (40%+ market share); also hotel tech (Delphi, HotSOS) | Official MIT-licensed SDKs (Python, Node, Java) on `amadeus4dev` GitHub | Primary GDS integration target; self-service API free for dev/test |
| **Sabre** | Second-largest GDS; Red App developer ecosystem | Sabre Dev Studio REST APIs; no major open-source repos | Enterprise contracts required; less agent-friendly than Amadeus |
| **Travelport** | Third GDS; pivoting to modern APIs (JSON/REST) | Limited open-source presence | Less common in LATAM engagements; Amadeus preferred |

### OTA & Booking Platforms
| Player | Position | AI Investment |
|--------|----------|---------------|
| **Booking.com** | Largest OTA; 28M+ listings | Heavy agentic AI investment; launched conversational booking assistant in 2025 |
| **Expedia Group** | Major OTA + B2B tech supplier | Expedia Rapid API; acquired AI travel startup in 2025; building autonomous booking |
| **Airbnb** | Dominant short-term rental | LLM-powered search redesign 2025; exploring autonomous booking for business travel |
| **Trip.com (Ctrip)** | Dominant Asia-Pacific OTA | AI itinerary generation native; MCP server publishing for agent interoperability |

### Hotel Chains & Industry Alliances
| Player | Position | AI/Agent Stance |
|--------|----------|-----------------|
| **Marriott International** | Largest hotel chain globally | Joined A2A/MCP interoperability standards; enabling autonomous AI booking of Marriott inventory |
| **IHG Hotels & Resorts** | Major global chain | Co-signed industry AI booking standards; exposing rate/availability via agent-compatible APIs |
| **Hilton** | Top 3 global chain | AI concierge deployment; testing LLM-powered check-in and room customization |

### Open-Source Ecosystem
| Player | Contribution | License |
|--------|-------------|---------|
| **QloApps / Webkul** | Only mature open-source hotel PMS | OSL-3.0 |
| **ExcursioX** | Only MIT travel CRM with full booking flow | MIT |
| **Amadeus4Dev** | Official GDS SDKs (Python, Node, Java, Android) | MIT |
| **OpenTravel Alliance** | Schema standards for interoperability | Apache 2.0 |
| **LangChain** | Agent framework dominant in travel AI builds | MIT |
| **NERVsystems/osmmcp** | OSM as MCP server — first geo layer for LLM agents | MIT |
| **DIDA-AI/Dida-hotel-MCP** | First hotel booking MCP server (2M+ hotels) | MIT |
| **Project-OSRM** | High-performance routing engine (BSD-2-Clause, 7.7k★) | BSD-2-Clause |
| **Valhalla** | Multi-modal routing engine (MIT, 5.6k★) | MIT |

## Market Size & Growth

| Segment | 2024 | 2030 | CAGR |
|---------|------|------|------|
| AI in Tourism (global) | $2.95B | $13.38B | 28.7% |
| Global travel tech total | $12B | $22B | ~8% |
| LATAM travel tech | $1.8B | $4.5B | ~12% |
| Agentic AI in travel | nascent | Significant | 40%+ |

**Key prediction (IDC 2026)**: 30% of travel bookings executed by AI agents by 2030.
**Phocuswright (2026)**: 61% of travel businesses experimenting with or scaling agentic AI.
**Consumer trust gap**: Only 2% of US consumers willing to fully delegate booking to AI — massive UX opportunity.
**Amadeus**: $50M AI fund launched for travel tech partners (2025).

## Market Map

```
[Traveler] ──────────────────────────────────────────────────────────────
    │                                                                    
    ├── AI Travel Agent (LangGraph/CrewAI) ─── Natural language input
    │       │
    │       ├── Flight Search ────── Amadeus SDK → GDS (Amadeus/Sabre/Travelport)
    │       ├── Hotel Search ─────── Amadeus SDK → Hotels / QloApps PMS
    │       ├── Activities ──────────Viator API / local tour operator API
    │       ├── Transfers ───────────Booking.com Transport API
    │       └── Visa/Docs ──────────RAG over visa requirement knowledge base
    │
    ├── OTA Layer ──────── Booking.com / Expedia / Airbnb (competing with agent)
    │
    ├── GDS Layer ──────── Amadeus / Sabre / Travelport (being disintermediated)
    │
    └── Operations Back-End
            ├── Hotel PMS ──────── QloApps / Odoo Hotel Module
            ├── Agency ERP ─────── ERPNext / Apache OFBiz / ExcursioX
            └── Analytics ──────── NeuralForecast + custom BI
```

## Competitive Dynamics (2026)

- **OTA disintermediation risk**: Agentic AI agents are beginning to bypass OTAs, booking directly with hotels/airlines via standardized APIs. Marriott and IHG's MCP adoption is a direct response.
- **GDS modernization pressure**: Amadeus is winning the developer mindshare race with free self-service APIs and MIT-licensed SDKs. Sabre and Travelport are playing catch-up.
- **LLM search replacing metasearch**: Kayak, Google Flights, Skyscanner all face disruption as LLM agents perform the comparison shopping step autonomously.
- **Globant positioning**: Strong position to deliver agent-first travel platforms — combining open-source foundations (QloApps, ExcursioX, Amadeus SDKs) with LangGraph/CrewAI orchestration.
