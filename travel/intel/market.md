# Market Map — Travel & Hospitality AI

> Key players, market size, competitive dynamics, and LATAM opportunities.
> Last updated: 2026-07-06

## Market Size

| Metric | Value | Source |
|--------|-------|--------|
| AI in Travel & Hospitality market (2026) | ~$8B | OpenPR / multiple analysts |
| AI in Travel & Hospitality market (2033) | $182.5B | OpenPR, CAGR 28.4% |
| Online Travel Agencies market (2025) | $663.7B | Grand View Research |
| Online Travel Agencies market (2026) | $718.9B | Grand View Research, CAGR 9.0% |
| LATAM online travel penetration | 74% | Skift Research 2026 |
| AI-enabled travelers (global) | 40% have used AI for trip planning | Travala.com, 2026 |
| Consumers willing to use fully autonomous AI booking | 2% | Expedia AI Trust Gap 2026 |
| AI bookings share by 2030 (IDC forecast) | up to 30% | IDC Research 2026 |

## Key Players — Global

| Company | Revenue (2024) | AI Move | OSS Relevance |
|---------|---------------|---------|---------------|
| **Booking Holdings** | $23.7B | AI-powered personalization, price prediction, smart filters | Primary target for agentic travel disruption |
| **Expedia Group** | $13.7B | Romie AI travel buddy (plan, shop, book, monitor in real-time, group-chat integration) | Romie = the UX benchmark to beat |
| **Airbnb** | $11.94B revenue, $83.8B mktcap | AI agent on 13 models for customer service (Aug 2025); AI-native 2026 strategy | High personalization bar |
| **Amadeus IT Group** | Commercial | Mosaic APIs for agentic booking (420+ airlines, 2M hotels); partner in Sabre+MindTrip pipeline | GDS kingmaker — OSS must interop or route around |
| **Sabre Corporation** | Commercial | Sabre+PayPal+MindTrip Q2 2026 end-to-end agentic pipeline | First production agentic booking loop |
| **TripAdvisor** | Commercial | AI content, AI-powered reviews analysis, testing AI agents | 8 GitHub repos; community-built recommenders |
| **Google** | Commercial | Google Flights (data layer), Google Travel, Gemini trip planning | Key data source for OSS (trvl, fli scrape public API) |

## Key Players — LATAM

| Company | Market | AI Initiative |
|---------|--------|---------------|
| **LATAM Airlines Group** | Chile, Colombia, Peru, Ecuador, Brazil | AI virtual agent launched April 2025 (Chile), expanded June 2025. Natural language trip planning for LATAM passengers. |
| **MercadoLibre / Meli Travel** | Brazil, Argentina, Mexico | Nascent travel vertical embedded in MercadoPago/Meli ecosystem |
| **Despegar / Decolar** | Latin America | Major OTA; integrating AI chat for trip planning |
| **Almundo** | Argentina, Colombia | Mid-size OTA with AI customer service investment |
| **CVC Corp** | Brazil | Largest travel company in LATAM, digitalization push |

## Agentic Travel: The 2026 Race

The industry's defining inflection point: **Sabre + PayPal + MindTrip** announced (March 2026) as the first end-to-end agentic travel booking pipeline. The loop: conversational AI → GDS inventory query → payment completion, all without the user leaving a chat window. Target launch Q2 2026.

**Market reaction:** Booking Holdings, IHG, Marriott all signed partnerships to ensure AI agents can access their inventory. Every major OTA is now racing to be "agentic-ready."

**OSS counter:** The open-source equivalent is achievable today:  
`trvl/fli` (search, no keys) → `LangGraph` (orchestration) → `Duffel API` (NDC booking) → `Stripe` (payment)

## AI Trust Gap (Expedia, 2026)

| Traveler behavior | Data |
|------------------|------|
| Use AI for trip discovery & inspiration | High adoption |
| Use AI for itinerary suggestions | Medium adoption |
| Let AI complete bookings autonomously | 2% willing |
| Want trusted brands involved in booking | 80%+ |

**Implication for Globant:** Solutions that keep humans in the loop for final booking (AI-assisted vs AI-autonomous) will see 10-40× higher adoption. Build "confirm before book" UX patterns.

## Globant Positioning

| Segment | Opportunity | Entry Point |
|---------|-------------|-------------|
| **LATAM Airlines / Airport** | AI passenger assistant (disruption management, rebooking, gate info) | LATAM Airlines AI agent success story as reference |
| **Hotel Chains** | AI concierge (pre-stay, in-stay, post-stay) + channel manager optimization | QloApps fork + LangGraph + WhatsApp |
| **Tour Operators / OTAs** | Conversational booking agent for LATAM market | ExcursioX + CrewAI + WhatsApp Business API |
| **Corporate Travel** | AI expense automation + travel policy enforcement | TREK + Odoo + receipt parsing AI |
| **Government / Transit** | AI-enhanced public transit routing (cities) | OpenTripPlanner + LLM front-end |

---
*Updated automatically by the Globant AI Studios ingest pipeline.*
