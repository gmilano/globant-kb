# Trends — Travel & Hospitality AI

> Current trends. Updated: 2026-07-08 (v4)

## Key Numbers

| Stat | Value | Source |
|------|-------|--------|
| Global AI in travel market 2024 | $2.95B | MarketsandMarkets |
| Projected 2030 | $13.38B | MarketsandMarkets |
| CAGR 2024–2030 | **28.7%** | MarketsandMarkets |
| Agentic booking market CAGR 2026–2034 | 22.5% | MarketIntelo |
| IDC: AI agent share of bookings by 2030 | **30%** | IDC FutureScape |
| Execs deploying agentic booking | **80% planning** | Hospitality.today |
| Leisure consumers ready for fully autonomous booking | **2%** | Multiple surveys 2026 — revised down |
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
| Feb 2026 | Sabre + PayPal + MindTrip announce strategic partnership | End-to-end agentic booking pipeline |
| May 6, 2026 | MindTrip Flights launches — Sabre Mosaic + PayPal | First complete agentic flight booking in single chat session (search → select → pay) |
| May 2026 | Expedia Explore 2026: Claude integration + Expedia × Meta announced | OTA + LLM provider convergence; social + AI planning merge |
| Jun 2026 | LetsFG: $116 savings verified vs Google Flights (5 routes, same day) | NDC-first is verifiably cheaper |
| Jun 2026 | Google confirms AI Mode travel booking partners (Booking.com, Expedia, Marriott, IHG, etc.) — not yet live | Google as discovery layer, partners as transaction layer |
| Jun 2026 | Booking.com debuts agentic AI innovations (Trips feature) |
| Jul 2026 | DIDA hotel MCP server public (2M+ hotels, free, MIT) |
| Jul 2026 | 3 community Amadeus MCP servers published |
| Jul 2026 | Amadeus × Microsoft co-publish AI agents report, announce 6 AI agents |
| Jul 2026 | HarimxChoi/langgraph-travel-agent published — first Hotelbeds+Amadeus+Twilio LangGraph agent |
| Jul 2026 | Fieldy76/Agentic-Travel-Planner + embabel/tripper published — framework-free + Airbnb integration |
| 2026 H2 | Expected: Amadeus official MCP, Duffel MCP, Google AI Mode Travel launch |
| 2027 | Expected: Booking.com / Expedia MCP servers |
| 2028 | Predicted: consumer autonomous booking trust at 15-20% |
| 2030 (est) | IDC: 30% of all travel bookings by AI agents |

---

## Trend 12: Sabre Mosaic + MindTrip + PayPal — The Complete Agentic Stack Is Live

**May 6, 2026**: The industry's first complete end-to-end agentic flight booking experience launched, combining:
- **MindTrip** — conversational AI planning interface (OpenAI partnership, 11M+ points of interest)
- **Sabre Mosaic™** — enterprise "agentic-ready" Air APIs providing real-time GDS inventory
- **PayPal** — inline payment with Buy Now Pay Later (Pay in 4 + Pay Monthly) without redirect

**Why this is the defining commercial milestone:**
1. It eliminates the redirect: booking happens inside the conversation
2. It shows GDS + AI can work together without replacing each other
3. Sabre positions as infrastructure, not competitor to AI platforms
4. PayPal's "agentic commerce API" may become the standard for in-chat payments

**The pattern it proves:**
```
Conversational AI + Enterprise GDS + In-Chat Payment = Complete Booking
```

This pattern is recreatable for LATAM with: Claude/custom LLM + Amadeus (or Sabre if enterprise) + PayPal / MercadoPago / PIX integration.

**Signal**: Every major GDS (Sabre, Amadeus, Travelport) will launch an "agentic-ready API" by 2027. The race is to be the preferred GDS backend for AI travel platforms.

---

## Trend 13: Expedia × Claude — The OTA + LLM Integration Blueprint

**Expedia Explore 2026 (May 2026)**: Expedia announced a Claude integration allowing U.S. travelers to search for flights and hotels in natural language within Claude, then click through to Expedia to complete booking.

**What Expedia built (multi-pronged AI strategy):**
- Claude integration for discovery (→ drives qualified traffic to Expedia)
- Expedia × Meta: AI conversations on travel ads (start planning from a social ad)
- AI Property Compare via Hotels.com (natural language hotel comparison)
- Package Price Insights: "Is this price typical or lower than usual?" (coming 2026)
- 30%+ of self-serve customer support handled by AI

**The pattern Globant can replicate for LATAM OTAs:**
1. Partner with Claude (or build with Anthropic SDK) for discovery layer
2. Keep booking on OTA platform (traffic + data control)
3. Add AI Package Price Insights (Amadeus historical pricing API already supports this)
4. AI Property Compare = GPT-4V/Claude Vision comparing hotel photos + specs

**Why this matters**: The "discovery via AI, booking on OTA" model is the sustainable OTA play against Google AI Mode. Expedia is showing OTAs don't have to build a full AI platform — integrate a discovery layer, own the booking.

**Globant pitch**: "We'll give your travel platform what Expedia just built — in 4-6 weeks."

---

## Trend 14: The Consumer Trust Gap Is Deeper Than Expected

Updated data (2026): Only **2%** of leisure consumers are willing for AI to book travel completely autonomously — down from the 2-7% range previously estimated.

**Why the gap persists:**
1. No clear consumer protection framework for AI booking errors (wrong dates, wrong names)
2. Liability: who is responsible when AI books the wrong thing?
3. Credit card chargeback ambiguity for AI-made purchases
4. Travelers have been burned by chatbot errors (wrong hotel, missed connections)

**Business travel is different** (rapidly adopting):
- Corporate policies provide the protection framework AI needs
- Employees already delegate bookings to travel desks (AI is just a better desk)
- Clear approval workflows provide human oversight
- ROI is directly measurable (policy violations caught, admin hours saved)

**Design principle that follows:**
> "Trust is granted to AI in inverse proportion to financial risk and reversibility."

- Trusted: "Tell me cheap weeks to fly GRU-MIA" (advisory, no commitment)
- Trusted: "Find me hotels near the Ipanema" (research, no commitment)
- Low trust: "Book the cheapest option" (financial commitment, limited reversibility)
- Untrusted: "Book and pay without showing me the price" (autonomous payment)

**Implication for product design**: Present AI as a "shortlisting and recommendation" agent; keep the final booking confirmation always human-initiated. This builds trust faster than trying to hide the human confirmation step.

---
*Updated: 2026-07-08 (v4)*
