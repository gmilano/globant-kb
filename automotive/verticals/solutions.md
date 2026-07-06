# 🏭 Vertical Solutions — Automotive

> Existing platforms that can be customized with AI on top.
> Model: start from something functional, add an agentic layer.
> Last updated: 2026-07-06

---

## Fleet Management & Telematics

| Platform | License | URL | Stack | Use Case |
|----------|---------|-----|-------|----------|
| **Traccar** | Apache-2.0 | [traccar/traccar](https://github.com/traccar/traccar) | Java + PostgreSQL + REST API | GPS tracking for 2,000+ device protocols. Add AI layer: route optimization agent, anomaly detection on telemetry streams, predictive maintenance alerts. |
| **Fleetbase** | AGPL-3.0 | [fleetbase/fleetbase](https://github.com/fleetbase/fleetbase) | Laravel + Vue + WebSocket | Full logistics OS — dispatch, telematics, route optimization, maintenance. Extend with: NLP dispatch assistant, AI-powered ETA prediction, driver scoring agent. |
| **OpenRemote Fleet** | Apache-2.0 | [openremote/fleet-management](https://github.com/openremote/fleet-management) | Java + Kotlin + IoT | IoT-native fleet telematics on OpenRemote platform. Teltonika native integration. Add: sensor fusion AI, geofencing alerts, carbon footprint optimizer. |
| **fleet-management-system** | Apache-2.0 | [sachnaror/fleet-management-system](https://github.com/sachnaror/fleet-management-system) | Python FastAPI + SQLAlchemy | OBD-II + CAN bus + GPS platform. Extend with: LangGraph maintenance agent, driver behavior scoring ML, fault prediction model. |

**How to add AI:**
1. Connect Traccar webhook → Lambda/FastAPI → LangGraph agent
2. Agent monitors telemetry stream, triggers alerts, schedules maintenance in Odoo
3. Add Claude API for natural-language fleet queries: "Which trucks are due for service this week?"

---

## Dealer Management Systems (DMS)

| Platform | License | URL | Stack | Use Case |
|----------|---------|-----|-------|----------|
| **Odoo Community** | LGPL-3.0 | [odoo/odoo](https://github.com/odoo/odoo) | Python + PostgreSQL + JS | Activate: Vehicle Inventory, CRM, Accounting, Service modules. All on one DB. Add AI: lead scoring, appointment scheduling agent, predictive parts inventory. |
| **ERPNext / Frappe** | GPL-3.0 | [frappe/erpnext](https://github.com/frappe/erpnext) | Python + MariaDB + Vue | Full ERP with manufacturing, inventory, CRM. Automotive workshops use it for service orders, parts, customer history. AI layer: NLP service request intake, warranty claim agent. |
| **Apache OFBiz** | Apache-2.0 | [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Java + Derby/PostgreSQL | Modules: accounting, inventory, CRM, catalog, HR. Enterprise-grade. AI layer: demand forecasting, parts procurement agent. |

**Odoo automotive recipe:**
```
Odoo Community (self-hosted)
  └─ Vehicle Inventory module
  └─ CRM module (lead → vehicle match)
  └─ Service module (repair orders)
  └─ AI add-on: webhook → Claude API → structured service notes
  └─ AI add-on: SMS/WhatsApp bot for appointment booking
```

---

## Autonomous Driving & ADAS Platforms

| Platform | License | URL | Stack | Use Case |
|----------|---------|-----|-------|----------|
| **Autoware** | Apache-2.0 | [autowarefoundation/autoware](https://github.com/autowarefoundation/autoware) | ROS 2 + C++ + Python | Full AV stack. Customize: add customer-specific sensor drivers, perception models, geofenced behavioral planners. Used in production L2-L4 deployments. |
| **openpilot** | MIT | [commaai/openpilot](https://github.com/commaai/openpilot) | Python + C++ + tinygrad | ADAS OS for 300+ cars. Fork and adapt for OEM use, fleet retrofits, or research. v0.11 world model is commercially buildable (MIT). |
| **AlpaSim** | Apache-2.0 | [NVlabs/alpasim](https://github.com/NVlabs/alpasim) | Python + gRPC | Simulation-first AV development. Test any policy (custom or Alpamayo) in NVIDIA's open simulator. |
| **CARLA** | MIT | [carla-simulator/carla](https://github.com/carla-simulator/carla) | C++ + Unreal Engine + Python | Simulation environment for ADAS R&D. Customize: inject custom map tiles, sensor configs, traffic scenarios. |

---

## Software-Defined Vehicle (SDV) Middleware

| Platform | License | URL | Stack | Use Case |
|----------|---------|-----|-------|----------|
| **Eclipse KUKSA** | Apache-2.0 | [eclipse-kuksa/kuksa-databroker](https://github.com/eclipse-kuksa/kuksa-databroker) | Rust + gRPC + VSS | In-vehicle data broker. Subscribe to vehicle signals (speed, door state, HVAC) via gRPC. Power AI apps: personalization agents, OTA health monitors, cabin safety. |
| **Eclipse Velocitas** | Apache-2.0 | [eclipse-velocitas](https://github.com/eclipse-velocitas) | Python + Docker + K8s | Vehicle app development framework on top of KUKSA. Write Python "vehicle apps" that read/write VSS signals. |
| **Eclipse Leda** | Apache-2.0 | [eclipse-leda](https://github.com/eclipse-leda) | Yocto + K8s + OTA | SDV.EDGE OS build. Run containerized vehicle apps on embedded hardware. |

**SDV AI recipe:**
```
Eclipse Leda (embedded OS on vehicle compute unit)
  └─ KUKSA Databroker (VSS signal hub)
  └─ Vehicle app (Velocitas): subscribes to speed, location, CAN signals
  └─ Edge LLM (Phi-3 Mini / Llama 3.2 3B via Ollama)
  └─ Cockpit AI agent: voice NLP → KUKSA write → seat/HVAC/nav control
  └─ Cloud sync: anonymized telemetry → OTA model updates
```

---

## EV Charging & Energy Management

| Platform | License | URL | Stack | Use Case |
|----------|---------|-----|-------|----------|
| **REVOL-E-TION** | Apache-2.0 | [TUMFTM/REVOL-E-TION](https://github.com/TUMFTM/REVOL-E-TION) | Python + OR-Tools | Site-level EV fleet energy optimization. TU Munich. Extend with: LLM scheduling assistant, grid price forecasting agent. |
| **ev-charging-optimization** | MIT | [philippnormann/ev-charging-optimization](https://github.com/philippnormann/ev-charging-optimization) | Python simulation | Shortest-route EV charging simulation. Foundation for fleet-level charge scheduling AI. |

---

## How to Customize Any Platform with AI

```
1. Fork the base repo (Odoo / Autoware / Traccar / KUKSA)
2. Add AI endpoint (Anthropic API / local Ollama for on-vehicle)
3. Identify trigger points: events, webhooks, scheduled jobs
4. Wrap existing flows with agents (LangGraph / CrewAI)
5. Add conversational UI layer (Chainlit / custom React + WebSocket)
6. Keep original platform logic intact — AI is additive, not a rewrite
```

**Cost model for fleet AI:**
- Self-hosted Traccar + LangGraph + Ollama on-prem: ~$0 variable cost after hardware
- Traccar + Claude API: ~$0.003 per maintenance alert generation
- Full Fleetbase + Claude Sonnet for dispatch: ~$0.01-0.05 per dispatch decision
