# Vertical Solutions — Automotive

> Full vertical platforms — real systems to fork and add an AI layer on top.
> Model: start from something functional, add an agentic layer above it.
> Last updated: 2026-07-07

## Recommended Platforms

| Platform | License | Repo / URL | Stack | Use Case |
|----------|---------|------------|-------|----------|
| [Traccar](https://github.com/traccar/traccar) | Apache-2.0 | github.com/traccar/traccar | Java + React | Real-time GPS fleet tracking; add AI anomaly detection + predictive alerts |
| [Fleetbase](https://github.com/fleetbase/fleetbase) | AGPL-3.0 | github.com/fleetbase/fleetbase | Laravel + Vue.js | Full logistics OS: fleet, warehouse, delivery; add AI dispatching agents |
| [Odoo Fleet](https://github.com/odoo/odoo) | LGPL-3.0 | github.com/odoo/odoo | Python + PostgreSQL | ERP-integrated fleet: contracts, fuel, maintenance; add AI cost forecasting |
| [Autoware](https://github.com/autowarefoundation/autoware) | Apache-2.0 | github.com/autowarefoundation/autoware | C++ + ROS 2 | Full autonomous driving stack for L4; add LLM mission planners |
| [openpilot](https://github.com/commaai/openpilot) | MIT | github.com/commaai/openpilot | Python + C++ | ADAS OS for consumer vehicles; extend with LLM co-pilot features |
| [CARLA Simulator](https://github.com/carla-simulator/carla) | MIT | github.com/carla-simulator/carla | C++ + Python | Autonomous driving sim; build AI agent training/eval pipelines on top |
| [OpenGTS](http://www.opengts.org) | Apache-2.0 | sourceforge.net/projects/opengts | Java | Web-based GPS fleet tracking; mature, enterprise-proven; add ML alerts |
| [DMS via Frappe](https://github.com/frappe/frappe) | MIT | github.com/frappe/frappe | Python + MariaDB | Frappe framework used as base for open-source DMS; add AI inventory + CRM agents |

---

## Platform Deep Dives

### 1. Traccar — AI-Enhanced Fleet Tracking

**What it does:** GPS tracking for vehicle fleets. Supports 200+ GPS protocols, 2000+ device models. Geofencing, trip reporting, driver behavior scoring, maintenance reminders.

**AI integration points:**
```
Traccar REST API
    ↓
LangGraph agent (polling vehicle telemetry every 30s)
    ↓
Anomaly detection model (abnormal speed, fuel consumption, route deviation)
    ↓
Alert → Slack / email / dashboard
```

**What to add:**
- Predictive maintenance: vibration + temp anomalies → predict breakdown 48-72h ahead
- Route optimization: LLM agent re-routes dynamically based on traffic + fuel cost
- Driver coaching: NLP analysis of trip patterns → personalized driving tips
- Carbon reporting: auto-generate Scope 3 emissions reports from trip data

**LATAM angle:** Large logistics operators (Mercado Libre, DHL LATAM, Rappi) run fleets of 10k+ vehicles. AI on top of Traccar = real differentiation vs. generic fleet SaaS.

---

### 2. Fleetbase — AI Logistics OS

**What it does:** Modular LSOS (Logistics + Supply Chain OS). Fleet management, driver apps, route optimization, warehouse management, e-commerce delivery fulfillment, developer API. Multi-tenant, self-hosted or cloud.

**AI integration points:**
```
Fleetbase Webhooks / REST API
    ↓
LangGraph multi-agent orchestrator
    ├── Dispatch agent (optimal driver assignment)
    ├── ETA prediction agent (ML model on historical trip data)
    ├── Cost optimization agent (fuel + toll + driver time)
    └── Exception handler (weather, traffic, vehicle breakdown)
```

**What to add:**
- Real-time dispatch: LLM agent considers driver skills, vehicle load, traffic → optimal assignment
- Customer comms: auto-send ETA updates and delay alerts via WhatsApp (common in LATAM)
- Fleet health scoring: aggregate all vehicle telemetry → health score → proactive maintenance

---

### 3. Autoware — Open AD Stack for Commercial Fleets

**What it does:** Production-ready autonomous driving software stack on ROS 2. Used in automated shuttle buses, last-mile delivery robots, airport tugs. Commercial-grade SLAM, object detection, path planning.

**AI integration points:**
```
Autoware Core
    ├── Perception (object detection, lane detection) → add foundation model fine-tuning
    ├── Prediction (agent behavior forecasting) → add LLM-based scenario reasoning
    └── Planning (route + trajectory) → add LLM mission planner for edge cases
```

**Best fit for Globant engagements:** Smart city pilots (closed-campus autonomous shuttles), port/mine/airport logistics autonomy projects.

---

### 4. Odoo Fleet + AI

**What it does:** Fleet module within Odoo ERP. Vehicle registry, contract management, fuel tracking, maintenance scheduling, cost analysis. Integrates with HR, accounting, procurement.

**AI integration points:**
- Predictive maintenance scheduler: ML model on maintenance history → predict next service date
- AI-assisted procurement: agent suggests tire/part orders based on fleet usage patterns
- Cost forecasting: LLM generates fleet cost forecasts for finance teams
- Compliance agent: auto-generate regulatory compliance reports (LATAM varies by country)

---

## Selection Guide

| Scenario | Recommended Platform | AI Layer |
|----------|---------------------|----------|
| Fleet of 50-500 vehicles, SMB | Traccar + LangGraph | Anomaly + maintenance alerts |
| Enterprise logistics / delivery | Fleetbase + CrewAI | Multi-agent dispatch + ETA |
| ERP-first client | Odoo Fleet | Predictive maintenance + cost AI |
| Autonomous shuttle/delivery pilot | Autoware + ROS 2 | LLM mission planner |
| Vehicle inspection at scale | A.I.-AutoInspector + YOLO | CV damage + LLM report |
| Consumer ADAS upgrade | openpilot fork | LLM scene narrator + co-pilot |

---

## How to Add AI to Any Platform

1. **Fork the base repo** — keep a clean upstream remote for security patches
2. **Expose a data API** — most platforms have REST hooks; capture telemetry events
3. **Add an agent orchestration layer** — LangGraph or CrewAI wrapping the platform's API
4. **Wire in LLM inference** — Anthropic Claude API or local Ollama (for data-sensitive clients)
5. **Add a conversational UI** — React chat panel or WhatsApp webhook for LATAM markets
6. **Instrument with Langfuse** — trace agent calls, costs, and quality for ongoing improvement

---
*Auto-updated by the ingest pipeline.*
