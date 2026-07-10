# 📡 Trends — Travel & Hospitality AI

> Last updated: 2026-07-10

## Macro Trends

### T1 — Agentic Booking Entering Production
IDC projects 30% of travel bookings executed by AI agents by 2030. Already in production: Sabre Mosaic MCP (May 2026), Expedia+Claude (Jun 2026, US), Malaysia Airlines Mavis, LATAM Airlines Gemini platform. The question has shifted from "can AI book?" to "what happens when it books wrong?"
- **Signal**: OAG report titled "March 2026: The Month Agentic Travel Gets Real"
- **Implication for Globant**: Enterprise clients need booking-agent infrastructure now, not 2027

### T2 — MCP as Travel Distribution Layer
Sabre, DIDA, Amadeus, and independent developers are all converging on MCP as the integration standard. 420+ airlines and 2M+ hotels are accessible via MCP today. This mirrors how REST APIs unified web services in 2010–2015.
- **Key repos**: `DIDA-AI/Dida-hotel-MCP-CN`, `ravinahp/flights-mcp`, Sabre Mosaic MCP
- **Implication**: Any travel AI built in 2026 should be MCP-native from day 1

### T3 — Consumer Trust Gap (B2B vs B2C)
Only **2%** of leisure travelers are willing to let AI book on their behalf (PhocusWire, Skift, 2026). Corporate travel shows much higher adoption because of policy guardrails and accountability structures.
- **Implication**: B2B / corporate travel = best beachhead. Consumer products need trust layers (confirmation steps, editable itineraries, human escalation).

### T4 — Data Quality as Competitive Moat
"If your data is incomplete, outdated, or fragmented, you effectively disappear from the agent's decision set" (McKinsey, 2026). Hotels and airlines with poor machine-readable inventory will be invisible to AI agents.
- **Implication**: Globant can offer "AI-readiness audit + data enrichment" as a lead-generation service for travel clients

### T5 — LATAM: WhatsApp as Primary Booking Channel
Brazil has the world's largest WhatsApp Business installed base. 70%+ of LATAM consumers have integrated AI into shopping journeys (Visa/Santander survey). WhatsApp + agentic AI + Pix payments = complete autonomous booking loop in Brazil.
- **Key stat**: Santander + Visa completed agentic payments across 5 LATAM markets (Mar 2026)
- **Implication**: WhatsApp-native travel agent = highest ROI product for LATAM engagements

### T6 — NDC Enabling Airline → Agent Direct Sales
IATA NDC (New Distribution Capability) is allowing airlines to bypass GDS and distribute ancillaries (extra legroom, bags, lounge access) directly to AI agents. Airlines keep more margin; agents offer richer options.
- **Implication**: Build agents on NDC feeds, not just GDS — access to ancillary inventory that GDS doesn't have

### T7 — Personalization at Scale (Cross-Session Memory)
Travel AI agents that remember preferences across sessions (home airport, seat preference, hotel tier, dietary needs) convert 3–5x better than stateless agents. LangGraph's persistent state graph and memory stores enable this.
- **Key pattern**: Agent profile store → preference injection at search time → personalized offers

### T8 — Points / Loyalty Optimization via AI
Award travel and loyalty point optimization is a high-value AI use case. Agents can evaluate points vs cash for any itinerary, find availability gaps, and alert when award space opens. High willingness-to-pay segment (frequent flyers).
- **Key tool**: `MikkoParkkola/trvl` (noncommercial) as inspiration; build equivalent on open licensed components

### T9 — Multimodal Destination Discovery
Google, Airbnb, and TikTok driving discovery via short video. AI agents need to process visual content (destination photos, UGC video thumbnails) to extract intent and map to inventory. Claude's vision + MCP = new discovery pattern.
- **Implication**: Build multimodal itinerary builders that convert "I want somewhere like this video" into bookable trips

### T10 — Corporate Travel Compliance Automation
Policy enforcement (class of service, preferred vendors, advance booking requirements) was a manual bottleneck. LangGraph-based agents can enforce policy gates automatically before booking confirmation, with auditability.
- **Key pattern**: Policy-as-code → agent guardrails → automatic rejection/approval workflows

### T11 — Hotel PMS AI Layer (QloApps + AI)
4,000+ hotels on QloApps globally. An AI concierge layer on top (upselling, multilingual guest communication, automated check-in/out) is a repeatable Globant product. PHP hooks make integration straightforward.
- **Target**: Boutique hotel chains in LATAM and Europe running QloApps or similar open-source PMS

### T12 — Agentic Customer Service (Airlines)
Malaysia Airlines Mavis (Ada platform) handles customer queries autonomously across web, app, and email. Aerolíneas Argentinas, GOL, Avianca, Copa are potential Globant targets — same KaibanJS-pattern architecture.
- **Pattern**: Inquiry → intent classification → tool call (PNR lookup, rebooking, refund) → response → escalation if needed

## Radar Entries

| Signal | Type | Status |
|--------|------|--------|
| Sabre Mosaic MCP in production | Technology | **ADOPT** |
| DIDA free hotel MCP | Technology | **ADOPT** |
| MCP as travel distribution standard | Paradigm | **ADOPT** |
| Agentic corporate travel | Market | **TRIAL** |
| NDC direct airline distribution to agents | Technology | **TRIAL** |
| Consumer agentic booking (B2C) | Market | **ASSESS** — trust gap |
| WhatsApp + Pix agentic travel LATAM | Market | **TRIAL** |
| Multimodal destination discovery | Technology | **ASSESS** |
| Loyalty point AI optimization | Product | **TRIAL** |

---
*Updated by ingest pipeline.*
