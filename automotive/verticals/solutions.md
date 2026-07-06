# Vertical Solutions — Automotive

> Existing vertical platforms customizable with AI. Strategy: start functional, add agentic layer on top.
> Last updated: 2026-07-06

## Recommended Platforms

| Platform | License | Repo | Stack | Use Case |
|----------|---------|------|-------|----------|
| **Fleetbase** | AGPL-3.0 | [fleetbase/fleetbase](https://github.com/fleetbase/fleetbase) | PHP/Laravel + Ember.js | Modular logistics + fleet OS. 8,000+ operations. Self-hostable. REST API + webhooks. |
| **Fleetbase Fleet-Ops** | AGPL-3.0 | [fleetbase/fleetops](https://github.com/fleetbase/fleetops) | Extension of Fleetbase | Fleet dispatch, driver management, real-time GPS tracking, route optimization. |
| **Fleetms** | MIT | [jmnda-dev/fleetms](https://github.com/jmnda-dev/fleetms) | Node.js + React | Fleet maintenance software — service records, cost tracking, vehicle lifecycle management. |
| **Odoo** | LGPL-3 | [odoo/odoo](https://github.com/odoo/odoo) | Python + JS | ERP/CRM with automotive dealer module, fleet management, service orders, spare parts. |
| **ERPNext** | GPL-3 | [frappe/erpnext](https://github.com/frappe/erpnext) | Python/Frappe | Full ERP including manufacturing (auto parts), service management, CRM. |
| **AGL SoDeV** | Apache 2.0 | [AGL/AGL-repo](https://gerrit.automotivelinux.org) | C/C++ + Linux | Automotive Grade Linux SDV reference platform (released May 2026). Toyota/Honda/Mazda/Panasonic/Renesas contributors. |
| **CARLA** | MIT | [carla-simulator/carla](https://github.com/carla-simulator/carla) | C++ + Python + UE | Full AV simulation environment — use as testing vertical for any AV or ADAS solution. |
| **Eclipse SUMO** | EPL-2.0 | [eclipse-sumo/sumo](https://github.com/eclipse-sumo/sumo) | C++ + Python | Traffic simulation platform — fleet routing, signal optimization, V2X testing. |
| **Apache OFBiz** | Apache 2.0 | [apache/ofbiz](https://github.com/apache/ofbiz-framework) | Java | Enterprise ERP including manufacturing + automotive supply chain modules. |

## How to Customize with AI

### Fleetbase + AI (Recommended Quick Win)
```
Fleetbase Fleet-Ops (self-hosted, AGPL-3.0)
    ↓ REST API / webhooks
LangGraph agent layer
    ↓ tools: dispatch, GPS, vehicle status
Claude / GPT-4 / Ollama (local)
    ↓
WhatsApp / Slack / Web chat UI
```
Use case: dispatcher asks in natural language "which driver is closest to pickup X?" — agent queries fleet API, calculates route, assigns.

### Odoo Dealer DMS + AI
```
Odoo (automotive dealer module)
    ↓ Python model hooks
LangChain tool wrappers for Odoo models
    ↓
AI agent: service advisor, parts lookup, customer follow-up
    ↓
Voice/chat integration (WhatsApp Business / Twilio)
```
Use case: customer calls, AI books service appointment, checks parts availability, follows up via WhatsApp.

### Workshop OBD-II + AI
```
Vehicle (OBD-II port via ELM327 Bluetooth)
    ↓
open-mechanic OR Automotive-AI (MIT)
    ↓ DTC codes + live sensor data
Claude API (plain-English explanation + repair guide)
    ↓
Technician mobile app (React Native)
```
Use case: mechanic scans car, AI explains fault in plain Spanish/English, links to repair guide, estimates labor.

## LATAM Considerations

- **Fleetbase** is self-hostable — critical for Brazil/Argentina data sovereignty requirements (LGPD/PDPA)
- **Odoo** has strong LATAM community + Spanish/Portuguese language support; cost-effective vs SAP for mid-market dealers
- **ERPNext** deployed in LATAM auto parts distributors; strong community in Mexico and Colombia
- **Open-mechanic** pattern is relevant for independent workshops (LATAM has 10x more independent shops than dealer networks)
