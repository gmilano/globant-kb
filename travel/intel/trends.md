# Trends — Travel & Hospitality AI (2026)

> Strategic intelligence. Curated for Globant AI Studios.
> Last updated: 2026-07-06

## Trend 1: Agentic Booking — End-to-End Autonomous Travel

The shift from AI as a search assistant to AI as a booking executor. IDC predicts 30% of travel bookings will be executed by AI agents by 2030; 2026 is the inflection year.

**Evidence:**
- Booking.com + OpenAI partnership (announced 2025) for agentic bookings
- Google AI Mode in Search adding agentic trip planning and booking
- Fliggy (Alibaba) open-sourcing flyai-skill — first full-stack production travel MCP from a major OTA
- 61% of travel businesses experimenting with or scaling agentic AI (Breaking Travel News)
- Booking completion rates +38% in agentic vs traditional funnel pilots

**Build signal**: Any client OTA or hotel should be building MCP-first interfaces now or ceding distribution to whoever does.

---

## Trend 2: MCP Ecosystem — Travel Inventory Becomes Agent-Accessible

Model Context Protocol has become the standard interface between AI agents and travel inventory. The ecosystem has grown from 0 to dozens of travel MCP servers in 12 months.

**Key servers live in 2026:**
- `punitarani/fli` — Google Flights (MIT, ~2.4k★)
- `ravinahp/flights-mcp` — Duffel/NDC flights (MIT)
- `donghyun-chae/mcp-amadeus` — Amadeus GDS (MIT)
- `RollingGo-AI/rollinggo-hotel-mcp` — 2M+ hotels via DIDA (MIT, free)
- `esakrissa/hotels_mcp_server` — Booking.com hotels (MIT)
- `alibaba-flyai/flyai-skill` — Full stack Fliggy (MIT)

**Build signal**: A travel agent can now be built purely by composing MCP servers — no proprietary integrations needed.

---

## Trend 3: A2A Protocol — Multi-Agent Travel Coordination

Google's Agent2Agent (A2A) protocol (~20k★) is emerging as the standard for specialized agents to communicate. Travel is the canonical use case: flight agent + hotel agent + car agent + budget agent all need to coordinate.

**Evidence:**
- `extrawest/a2a_protocol_fundamentals_python` — A2A travel reference implementation (MIT)
- `Azure-Samples/app-service-a2a-travel-agent` — Microsoft enterprise A2A travel agent
- A2A adopted by 50+ frameworks including LangGraph, CrewAI, Google ADK

**Build signal**: MCP handles tool calls (search, query). A2A handles agent-to-agent coordination. Production travel systems need both.

---

## Trend 4: Hyper-Personalization at Booking

AI models analyzing voice modulation, past reviews, social media sentiment, dietary needs, loyalty status, and budget sensitivity — all in a single booking conversation. IDC forecasts 50% of AI budgets in hospitality allocated to personalization by 2030.

**Evidence:**
- Real-time preference anticipation: suggest based on stated mood, not just filters
- Booking.com AI trip planner adapts to companion type (family, solo, business)
- LATAM Airlines #1 AI recommendation share — personalization is a moat

**Build signal**: Personalization engines need a customer profile store + preference inference layer + real-time offer assembly. LangGraph + vector store is the standard stack.

---

## Trend 5: NDC Adoption Unlocking Richer AI Inventory

New Distribution Capability (NDC) IATA standard enables AI agents to access live fare, availability, and ancillary data across 65+ airlines — things legacy EDIFACT PNRs couldn't support: seat upgrades, meals, lounge access, insurance, all in one query.

**Evidence:**
- Duffel is the developer-friendly NDC API (300+ airlines, used by `flights-mcp`)
- Amadeus NDC APIs growing; `amadeus-python` covers NDC endpoints
- Airlines publishing ancillary offers via NDC for AI agents to compose into packages

**Build signal**: NDC + MCP = agents can build custom travel packages including ancillaries dynamically.

---

## Trend 6: WhatsApp as the Travel Interface (LATAM priority)

WhatsApp penetration exceeds 80% in Brazil and Argentina. The default AI travel interface in LATAM is not a web app — it's a WhatsApp conversation.

**Evidence:**
- Almundo, CVC, and regional OTAs launching WhatsApp booking bots
- LATAM travelers 61% willing to delegate trip planning to AI (Phocuswright 2026)
- Twilio WhatsApp + LangGraph is the standard stack; `HarimxChoi/langgraph-travel-agent` integrates Twilio natively

**Build signal**: For LATAM clients, WhatsApp-first = 5-10x user reach vs web app.

---

## Trend 7: Digital Identity Wallets Enabling Autonomous Purchases

Digital identity wallets (hundreds of millions of users projected by 2026) let AI agents negotiate, buy, and personalize travel on travelers' behalf without manual payment entry at each step.

**Evidence:**
- EU Digital Identity Wallet framework going live
- Apple/Google Pay extending to travel agent use cases
- Booking platforms exploring consent-based autonomous purchasing

**Build signal**: AI travel agents + digital wallets = frictionless booking. The UX moat will shift from "easiest to search" to "best autonomous execution."

---

## Trend 8: Voice + Multimodal Trip Planning

Single-conversation trip planning combining voice, visuals, and text. Google reports a shift from keyword queries to detailed natural language prompts describing companions, budgets, moods, scenery, interests, and constraints in one message.

**Evidence:**
- Google AI Mode: "Plan a 10-day trip to Patagonia for 2 adults, $5k budget, we love hiking but not camping"
- Multimodal: share a photo of a beach and ask "find something like this near Buenos Aires"
- Voice: Alexa/Google Home integrating travel booking flows

**Build signal**: LLMs with vision capability (Claude, GPT-4o) + fli/rollinggo-hotel-mcp = multimodal travel agent.

---

## Trend 9: Predictive Pricing & Dynamic Offer Assembly

AI models predicting optimal booking windows, fare trends, and hotel pricing. Generating personalized offers assembled in real-time from components (flight + hotel + transfer + activity) at dynamic prices.

**Evidence:**
- Amadeus AI Platform: Flight Delay Prediction, Flight Inspiration Search
- Revenue management AI: demand forecasting + dynamic rates per segment
- "Trip in a Box" concept: AI assembles a complete personalized offer at quote time

**Build signal**: Components = Amadeus predictive APIs + hotel yield management + CRM preference data.

---

## Trend 10: LATAM Travel Tech Consolidation

Prosus ($1.7B Despegar acquisition) is building a Latin American super-app: travel (Despegar) + food delivery (iFood) + entertainment (Sympla). Parallels WeChat/Meituan model in China.

**Evidence:**
- Despegar acquired by Prosus NV for $1.7B (Dec 2024)
- iFood dominant in Brazil (LATAM's largest travel market)
- Sympla: Brazil's event ticketing and experiences platform
- ATPS LatAm 2026 conference focusing on AI + payments + fraud — MercadoLibre, Despegar, Almundo participating

**Build signal**: OTA + super-app convergence creates a single customer profile with 3x data density for personalization. Clients building travel products in LATAM should plan for Despegar API integration.

---
*Updated by ingest pipeline — 2026-07-06.*
