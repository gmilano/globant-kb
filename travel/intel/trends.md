# Trends — Travel & Hospitality AI

> Current trends. Updated: 2026-07-08 (v3)

## Key Numbers

| Stat | Value | Source |
|------|-------|--------|
| Global AI in travel market 2024 | $2.95B | MarketsandMarkets |
| Projected 2030 | $13.38B | MarketsandMarkets |
| CAGR 2024–2030 | **28.7%** | MarketsandMarkets |
| Agentic booking market CAGR 2026–2034 | 22.5% | MarketIntelo |
| IDC: AI agent share of bookings by 2030 | **30%** | IDC FutureScape |
| Execs deploying agentic booking | **80% planning** | Hospitality.today |
| Consumers ready for fully autonomous booking | 2–7% | Multiple surveys |
| Millennials/Gen Z willing to delegate planning | 61% | Survey 2026 |
| AI booking completion vs traditional OTA funnel | +38% | Industry pilots |
| Traveler awareness of AI trip planning tools | **90%** | Hotel Management Jun 2026 |
| AI travel users: use it for most/every trip | **63%** | Hotel Management Jun 2026 |
| AI travel users: will use it again | **96%** | Hotel Management Jun 2026 |
| Radisson Hotel Group: AI marketing productivity boost | **+50%** | Case study 2026 |
| Radisson Hotel Group: AI-driven revenue increase | **+20%** | Case study 2026 |
| Data/AI investment increase in hospitality/travel | +65% | IDC 2026 |
| GenAI in travel market 2026 | **$1.27B** | Precedence Research 2026 |
| GenAI in travel market 2035 | **$5.79B** | Precedence Research 2026 |
| GenAI in travel CAGR 2026–2035 | **18.64%** | Precedence Research 2026 |
| Hotel chains planning AI agents in 2026 | **40%** | IDC FutureScape 2026 |
| Travel cos. with AI agents at scale (end-2025) | **<10%** | IDC FutureScape 2026 |
| LATAM online booking penetration | **74%** | Statista 2026 |

---

## Trend 1: March 2026 — The Agentic Travel Inflection Point

OAG (aviation analytics) named **March 2026** "The Month Agentic Travel Gets Real":
- Google AI Mode integrated live booking for flights + hotels with Booking.com, Expedia, Choice Hotels, IHG, Marriott, and Wyndham
- First measurable autonomous booking transactions at scale
- Corporate enterprise travel crossed the production line

**Before March 2026**: AI as trip planning assistant and recommendation layer.
**After March 2026**: AI as booking executor with real transaction authority.

**McKinsey "Remapping Travel with Agentic AI" (Apr 2026)** framework: by 2030, agentic AI mediates 30% of all travel bookings. Winners are companies mastering clean data backends, not just the agent layer.

---

## Trend 2: The 96% Repeat-Use Signal

New data from Hotel Management (June 2026):
- **90%** of travelers are aware of AI tools for trip planning
- **63%** of AI travel users rely on it for most or every trip
- **96%** say they will probably or definitely use it again

The 96% repeat rate is the critical signal. Compare to the 2-7% willing for fully autonomous booking — the trust gap is about payment authority, not about AI usefulness. **Design principle: AI is trusted for planning; humans still confirm payment.** This will evolve to 20-30% autonomous payment by 2028.

---

## Trend 3: Token-Efficient MCP Design Is the New Standard

`trvl` (MikkoParkkola, MIT) showed that a single MCP tool with 65 compatibility aliases uses 378 tokens vs 33,500 for 65 separate tools — a 98.9% reduction. This design philosophy is spreading:

**Before (naive MCP)**:
```json
// 65 separate tools: search_flights, search_hotels, search_rental_cars, get_lounge_info...
// tools/list payload: ~33,500 tokens
```

**After (trvl pattern)**:
```json
// 1 smart router tool with natural language dispatch:
// tools/list payload: ~378 tokens
// LLM asks: "Find economy flights London to Buenos Aires in October"
// Router dispatches to Google Flights, Booking.com, or airline direct
```

**Signal**: Every domain will adopt this pattern. Expect Amadeus, Booking.com, and Duffel MCP servers to adopt smart routers in H2 2026.

---

## Trend 4: MCP Becomes the Standard Travel Integration Layer

The MCP travel ecosystem went from 0 to 6+ servers in H1 2026:
- DIDA hotel MCP (2M+ hotels, MIT, free) — first major travel B2B on MCP
- Community Amadeus MCP (3 implementations: donghyun-chae, lev-corrupted, privilegemendes)
- Google Travel Impact Model MCP (official, Google for Developers) — flight carbon emissions
- trvl MCP super-server (Google Flights + Hotels + 6 more platforms)

**Prediction**: By end 2026, Amadeus (official), Duffel, Booking.com, and Sabre will publish official MCP servers. MCP replaces XML/SOAP GDS connections as the standard travel data access layer.

---

## Trend 5: WhatsApp as the Primary Travel AI Interface in LATAM

WhatsApp dominance stats:
- **3 billion+** monthly active users globally
- **94%** penetration in Brazil
- **85–95%** penetration across most LATAM markets
- Default inbox for traveler-to-hotel communication across LATAM, Middle East, South Asia

**What this means for architecture**: Travel AI in LATAM must be WhatsApp-first, not app-first or web-first.

**Emerging open source stack**:
- `Travel-Yathri` (MIT) — WhatsApp chatbot for trip planning + PDF itinerary
- Build pattern: Travel-Yathri + Dida-hotel-MCP-CN + Claude + Twilio WhatsApp Business API

**Commercial benchmarks**:
- AskSuite (Brazil-focused, Series B): omnichannel inbox + booking AI
- Visito: AI agent with live PMS rates + Stripe booking in WhatsApp chat
- HiJiffy (Europe → LATAM): hotel AI chatbot

**Globant opportunity**: White-label WhatsApp hotel concierge for LATAM hotel chains at 1/10th the cost of AskSuite or Visito.

---

## Trend 6: Agent-Native Distribution Bypasses OTA Intermediaries

LetsFG demonstrated **$116 savings across 5 routes** vs Google Flights on the same day (Jun 2026) by connecting directly to 400+ airlines via NDC.

**The bypass mechanism**:
```
Traditional: Traveler → Google Flights → OTA → GDS → Airline (3-4 markups)
Agentic:     AI Agent → Duffel/NDC → Airline (direct pricing)
```

Duffel (NDC-first, 400+ airlines, MIT SDK) is the infrastructure enabling this. How LetsFG achieves savings: direct NDC pricing removes GDS booking fee (~$4-8/segment) and OTA markup.

**Implications**: OTAs face disintermediation. Airlines benefit. Consumers win on price. AI agents are the new distribution channel.

---

## Trend 7: Corporate Travel is the First Full-Autonomy Use Case

Why corporate travel before consumer travel:
1. **Policy is machine-readable**: per-diem limits, approved suppliers, approval thresholds
2. **Employees already delegate**: used to submitting booking requests to travel desks
3. **ROI is measurable**: policy violations, admin hours, booking accuracy

**Production patterns**:
- Search (Amadeus/Duffel) → policy check → approval routing ($500 auto/$2k manager/$2k+ finance) → book → expense record
- Reference: `jongalloway/travel-booking-agents` (MIT)

**Market**: SAP Concur ($7B+ revenue), Navan (TripActions, $9.2B valuation), Brex all building AI agents here. Open source alternative is viable for Globant clients.

---

## Trend 8: Data Infrastructure as the Real AI Differentiator

McKinsey "Remapping Travel with Agentic AI" (Apr 2026):
> "The winners in agentic travel won't be those with the best agent layer — they'll be the companies that mastered the boring back end. AI needs clean inventory, pricing, and policy data to function."

**The data problem by sector**:
| Sector | Data Readiness | Gap |
|--------|---------------|-----|
| Airlines | High (NDC-ready) | NDC adoption still ~40% globally |
| Hotels (chains) | Medium (PMS data siloed) | PMS-to-API layer needed |
| Hotels (independent) | Low (spreadsheets + WhatsApp) | Full digitization needed |
| Tour operators | Very Low | Manual processes dominant |
| Car rental | High (OTA integrations) | Data is clean |

**Globant play**: Offer "AI Readiness Audit" as a first engagement — assess PMS data quality, build clean pipelines, then add agent layer on top. Data work is the moat, not the agent code.

---

## Trend 9: Specialized Travel Verticals Getting AI-Native

| Vertical | 2026 Signal | AI Capability |
|----------|------------|---------------|
| Medical tourism | Yatra-Vritta (MIT) | KNN destination ranking by medical quality/cost/safety |
| MICE | Yatra-Vritta + enterprise CRMs | Venue matching, group logistics |
| Destination weddings | Yatra-Vritta | Vendor coordination + timeline management |
| Adventure / outdoor | emerging repos | Permit availability, route planning, weather |
| Religious / pilgrimage | niche repos (India market) | Group logistics, capacity planning |

---

## Trend 10: The Era of Autonomous Agents Arrives in Travel (2026)

The major travel industry forecast for 2026 (IDC, Hospitality Net, McKinsey): the industry shifts from "AI as chatbot" to "AI as autonomous system that does things."

**Three phases of AI in travel:**
1. **2023-2024 — Generative text**: AI answers questions, writes itineraries, powers chatbots
2. **2025 — Agentic pilots**: AI executes searches, handles bookings in supervised workflows
3. **2026 — Autonomous agents**: AI agents act as buyer proxies with transaction authority

**The implementation gap is the opportunity**: <10% of travel companies had AI agents at scale by 2025, but 40% of hotel chains plan deployment in 2026. That gap = Globant's engagement pipeline.

**What buyers need in 2026:**
- Data infrastructure layer (PMS → clean API → agent-readable)
- Agent orchestration (LangGraph / OpenAI Agents SDK)
- Trust layer (human-in-the-loop for payment confirmation)
- LATAM localization (PIX, SPEI, LGPD, WhatsApp, ES/PT)

---

## Trend 11: Amadeus × Microsoft — AI Agents Enter GDS (Jul-2026)

Amadeus and Microsoft co-published a joint AI agents report and announced the first batch of **6 AI agents** across Amadeus's product portfolio:
- Targets: airlines (seat optimization, revenue management), airports (passenger flow), travel sellers (booking automation), hospitality (guest services)
- Technology stack: Azure OpenAI + Amadeus Self-Service APIs
- Community MCP ecosystem (3+ implementations) bridges Amadeus data to Claude/GPT agents today

**Globant play**: Position as the implementation partner for Amadeus AI agents in LATAM. Amadeus has deep LATAM relationships (LATAM Airlines, Avianca, Copa, Aeromexico). Globant's LATAM expertise + Amadeus AI blueprint = differentiated GTM.

**NDC acceleration in LATAM (Dec 2024)**: Amadeus signed NDC content distribution deals with LATAM Airlines and Saudia. Direct pricing is now available for AI agents in LATAM — the GDS markup gap LetsFG demonstrated ($116 savings) applies to LATAM routes.

---

## Timeline

| Date | Event |
|------|-------|
| Nov 2025 | Google announces agentic flight/hotel booking for AI Mode |
| Dec 2024 | Amadeus + LATAM Airlines sign NDC distribution deal — direct pricing in LATAM enabled |
| Jan 2026 | Amadeus SDK updated, 30 Self-Service APIs, NDC compatibility |
| Mar 2026 | OAG: "The Month Agentic Travel Gets Real" — first scale transactions |
| Apr 2026 | McKinsey "Remapping Travel with Agentic AI" published |
| Apr 2026 | trvl MCP super-server updated: 65 aliases, 8 platforms, zero keys |
| Jun 2026 | LetsFG: $116 savings verified vs Google Flights (5 routes, same day) |
| Jun 2026 | Booking.com debuts agentic AI innovations (Trips feature) |
| Jul 2026 | DIDA hotel MCP server public (2M+ hotels, free, MIT) |
| Jul 2026 | 3 community Amadeus MCP servers published |
| Jul 2026 | Amadeus × Microsoft co-publish AI agents report, announce 6 AI agents |
| Jul 2026 | HarimxChoi/langgraph-travel-agent published — first Hotelbeds+Amadeus+Twilio LangGraph agent |
| 2026 H2 | Expected: Amadeus official MCP, Duffel MCP |
| 2027 | Expected: Booking.com / Expedia MCP servers |
| 2028 | Predicted: consumer autonomous booking trust at 15-20% |
| 2030 (est) | IDC: 30% of all travel bookings by AI agents |

---
*Updated: 2026-07-08 (v3)*
