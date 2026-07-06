# Vertical Solutions — Travel & Hospitality

> Existing open-source platforms that can be customized with AI. Model: start with something functional, add agentic layer on top.
> Last updated: 2026-07-06

## Recommended Platforms

| Platform | License | Repo | Stars | Stack | Use Case |
|----------|---------|------|-------|-------|----------|
| QloApps | OSL-3.0 | [Qloapps/QloApps](https://github.com/Qloapps/QloApps) | 1.2k★ | PHP/MySQL | Hotel PMS + Booking Engine + Channel Manager. OTA sync (Booking.com, Expedia, Airbnb). Add AI guest concierge for upsell, check-in automation & support. |
| LibreBooking | Apache-2.0 | [LibreBooking/librebooking](https://github.com/LibreBooking/librebooking) | 900★ | PHP | General resource reservation. Tours, rooms, vehicles, activities. Best Apache-2.0 option for clean IP. Add NL booking assistant on top. |
| OpenTripPlanner | LGPL-2.1 | [opentripplanner/OpenTripPlanner](https://github.com/opentripplanner/OpenTripPlanner) | ~5.5k★ | Java/GraphQL | Multi-modal transit routing (bus, rail, bike, walk). Powers government transit apps worldwide. Add LLM front-end for conversational route planning. |
| PHPTRAVELS | Proprietary-ish | [phptravels.com](https://phptravels.com/open-source-travel-management-software) | — | PHP | Travel agency software: CRM, supplier API integrations, vouchers, booking engine. Largest OSS-adjacent travel agency management system. Check license carefully before forking. |
| ExcursioX | MIT | [moizkamran/ExcursioX](https://github.com/moizkamran/ExcursioX) | 65★ | MERN | Travel CRM: flight/train/bus ticketing, hotel management, booking. MIT = cleanest IP for Globant. Good starting point for tour-operator solutions in LATAM. |
| TREK | MIT | [mauriceboe/TREK](https://github.com/mauriceboe/TREK) | 210★ | TypeScript | Self-hosted trip planner: real-time collaboration, maps, PWA, SSO, budgets, packing lists. Corporate travel management alternative to Concur. |
| Odoo (Travel Modules) | LGPL-3.0 | [odoo/odoo](https://github.com/odoo/odoo) | 42k★ | Python | Via community modules: hotel management, tour operator, expense management. If client already runs Odoo, add AI agent layer for travel expense approvals & booking policy enforcement. |
| ERPNext (Expense) | GPL-3.0 | [frappe/erpnext](https://github.com/frappe/erpnext) | 22k★ | Python/JS | Travel expense management, reimbursement workflows, policy compliance. Extend with AI for receipt parsing & anomaly detection. |

## Travel-Specific Platforms Not on GitHub

| Platform | License | What It Is | AI Opportunity |
|----------|---------|------------|----------------|
| **Amadeus Self-Serve APIs** | Commercial (free tier) | GDS access: flights, hotels, points of interest | MCP wrapper → LLM travel agent with live GDS data |
| **Duffel API** | Commercial (free tier) | Flight booking API (NDC direct from airlines) | Pair with trvl/fli for search → book pipeline |
| **OpenGTS** | Apache-2.0 | Open GPS Tracking System for fleet/vehicle management | Fleet AI for ground transport / shuttle operators |

## How to Customize with AI

### Pattern A: Hotel PMS + AI Concierge (QloApps)
```
1. Deploy QloApps (Docker or VPS)
2. Expose REST booking API
3. Build LangGraph agent with tools: check_availability(), book_room(), get_amenities()
4. Connect WhatsApp/Web chat via Rasa or direct webhook
5. Add upsell logic: room upgrade, spa, late checkout suggestions
```

### Pattern B: Transit AI Assistant (OpenTripPlanner)
```
1. Deploy OpenTripPlanner with local GTFS + OSM data
2. Expose GraphQL API
3. Wrap with LLM agent: parse NL query → OTP GraphQL → format response
4. Add real-time GTFS-RT for delays/alerts
5. Output: "Your 9pm bus from Palermo is running 8 min late — here's an alternate"
```

### Pattern C: Tour Operator CRM + AI Sales Copilot (ExcursioX)
```
1. Fork ExcursioX (MIT) — add Globant branding
2. Integrate CrewAI sales agent: lead qualification → itinerary proposal → quote generation
3. Connect opentraveldata for airport/airline reference lookups
4. Add WhatsApp channel for LATAM market
5. Automate follow-up sequences with AI-drafted messages
```

### Pattern D: Corporate Travel Management (TREK + Odoo)
```
1. TREK for trip planning & collaboration (self-hosted)
2. Odoo for expense management & policy enforcement
3. AI agent: check travel policy → approve/flag bookings → parse receipts → submit expenses
4. Integration: TREK trips → Odoo expense reports automatically
```

---
*Updated automatically by the Globant AI Studios ingest pipeline.*
