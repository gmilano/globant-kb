# Vertical Solutions — Travel & Hospitality

> Real open-source platforms to fork and add AI on top.
> Last updated: 2026-07-08 (v2)

## Hotel Property Management Systems (PMS)

| Platform | License | GitHub | Stack | Best For | Stars |
|----------|---------|--------|-------|----------|-------|
| **QloApps** | OSL-3.0 | [Qloapps/QloApps](https://github.com/Qloapps/QloApps) | PHP/MySQL | Full hotel PMS + Booking Engine + Website. Complete hotel operations for independent hotels | ~1.4k★ |
| **HotelDruid** | AGPL-3.0 | [digital-druid/hoteldruid](https://github.com/digital-druid/hoteldruid) | PHP | Advanced room allocation + scheduling. v3.0.8 (Dec 2025). Multi-language, customizable booking engine, occupancy/revenue reporting. Ideal for independent hotels + hostels needing flexible scheduling | ~200★ |

**Comparison — QloApps vs HotelDruid:**
- **QloApps**: Full stack (PMS + channel manager + website). Better for LATAM deployment (active community). OSL-3.0 allows commercial use with source disclosure.
- **HotelDruid**: More flexible room management logic. AGPL-3.0 requires open sourcing modifications. Better for complex multi-property scheduling.

## Multi-Modal Trip Planning Infrastructure

| Platform | License | GitHub | Stack | Use Case | Stars |
|----------|---------|--------|-------|----------|-------|
| **OpenTripPlanner** | LGPL-3.0 | [opentripplanner/OpenTripPlanner](https://github.com/opentripplanner/OpenTripPlanner) | Java, GTFS+OSM | Multi-modal routing (transit + walk + cycle + rideshare). REST + GraphQL APIs. Powers hundreds of transit apps globally | ~5.5k★ |

## Travel Agency CRM & Booking Engines

| Platform | License | GitHub | Stack | Use Case | Stars |
|----------|---------|--------|-------|----------|-------|
| **ExcursioX** | MIT | [moizkamran/ExcursioX](https://github.com/moizkamran/ExcursioX) | Node.js/React | Travel Agency CRM + Ticketing + Booking + Hotel management. Tour operators and travel agencies | ~120★ |
| **Yatra (WordPress)** | GPL-2.0 | [mantrabrain/yatra](https://github.com/mantrabrain/yatra) | WordPress/PHP | Tour operator booking plugin: trips, departures, capacity, dynamic pricing, multi-gateway payments, WhatsApp notifications, OTA distribution to Viator + GetYourGuide. 700+ active sites since 2018. | ~300★ |

## Specialized Travel Verticals

| Platform | License | GitHub | Stack | Use Case | Stars |
|----------|---------|--------|-------|----------|-------|
| **Yatra-Vritta** | MIT | [Vipul-Mhatre/Yatra-Vritta](https://github.com/Vipul-Mhatre/Yatra-Vritta) | Python | AI-powered specialized travel: medical tourism (KNN destination scoring by medical quality/affordability/safety), MICE events, destination weddings. Multi-criteria decision models, real-time itinerary updates, vendor management | ~15★ |

## Scheduling Infrastructure

| Platform | License | GitHub | Stack | Use Case | Stars |
|----------|---------|--------|-------|----------|-------|
| **Cal.com** | AGPLv3 | [calcom/cal.com](https://github.com/calcom/cal.com) | Next.js/TypeScript | Scheduling infrastructure for tour bookings, activity reservations, guide appointments. Self-hostable, API-first. | ~35k★ |

## ERP with Hospitality Modules

| Platform | License | GitHub | Stack | Use Case | Stars |
|----------|---------|--------|-------|----------|-------|
| **Odoo Community** | LGPL-3.0 | [odoo/odoo](https://github.com/odoo/odoo) | Python/JS | Full ERP with hospitality modules (hotels, tours, F&B). 40k★, massive LATAM ecosystem of partners and modules | ~40k★ |
| **Flectra** | LGPL-3.0 | [flectra-hq/flectra](https://github.com/flectra-hq/flectra) | Python/JS | Odoo fork optimized for hospitality + tourism: streamlines bookings, guest management, sales. Lower commercial overhead than Odoo Enterprise | N/A |

## Fiscal Compliance Tools (Critical for LATAM Deployment)

| Platform | License | GitHub | Stack | Use Case | Stars |
|----------|---------|--------|-------|----------|-------|
| **Mews Fiscalizations** | MIT | [MewsSystems/fiscalizations](https://github.com/MewsSystems/fiscalizations) | .NET | Fiscal compliance for hotel invoicing across 15+ countries including Czech Republic, Portugal, Spain, Italy | ~62★ |

## Commercial Travel Management (Open API / SDK)

These are commercial platforms but publish open-source SDKs (MIT/Apache) that Globant agents can build on:

| Platform | Open Component | License | Stars | Notes |
|----------|---------------|---------|-------|-------|
| **Amadeus** | [amadeus4dev/amadeus-python](https://github.com/amadeus4dev/amadeus-python) | MIT | ~800★ | 30 APIs: flights, hotels, activities, predictions. GDS #2 globally |
| **Duffel** | [duffelhq/duffel-api-python](https://github.com/duffelhq/duffel-api-python) | MIT | ~200★ | NDC-first, 400+ airlines. Better for agentic flows than GDS |
| **DIDA** | [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) | MIT | ~85★ | B2B hotel MCP: 2M+ hotels. World's 3rd largest B2B travel API |

---

## Platform Selection Decision Matrix

| Requirement | Recommended Platform | License Note |
|-------------|---------------------|--------------|
| Independent hotel (<100 rooms), LATAM | QloApps | OSL-3.0 — commercial OK with source |
| Hostel / complex room scheduling | HotelDruid | AGPL-3.0 — must open-source modifications |
| Tour operator / adventure travel | Yatra (WordPress) + ExcursioX | GPL-2.0 / MIT |
| Online travel agency (OTA) | ExcursioX + Amadeus SDK | MIT |
| Medical tourism / MICE | Yatra-Vritta | MIT |
| Multi-modal city transport | OpenTripPlanner | LGPL-3.0 — link-only OK |
| Hotel group (5+ properties) | Odoo Community + hospitality module | LGPL-3.0 |
| Activity/tour booking on WordPress | Yatra plugin | GPL-2.0 |
| Corporate travel booking | Amadeus SDK + travel-booking-agents pattern | MIT |

---

## LATAM Deployment Notes

| Country | Key Consideration | Recommended Stack |
|---------|------------------|-------------------|
| Brazil | PIX payment, NF-e invoicing, WhatsApp dominant (94% penetration), LGPD data privacy | QloApps + PIX API + NF-e module + Travel-Yathri WhatsApp |
| Argentina | USD/ARS dual pricing, AFIP fiscal receipts, domestic travel recovery | QloApps + Mews Fiscalizations model + Mercado Pago |
| Mexico | CFDI invoicing, SAT compliance, Cancun/CDMX tourism corridors | QloApps + Facturama + OXXO Pay + WhatsApp chatbot |
| Colombia | Dian invoicing, Cartagena/Medellín boutique hotel market | QloApps + custom fiscal + PSE payments |
| Chile | SII invoicing, Patagonia adventure tourism | Yatra (WordPress) + ExcursioX + bsale integration |
| Peru | Sunat invoicing, Machu Picchu / cultural tourism | Odoo Community + tourism module + Yizmo or OSE fiscal |

---
*Updated: 2026-07-08*
