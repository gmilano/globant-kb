# 🏭 Vertical Solutions — Automotive

> Real platforms: start with something functional, add an AI agent layer on top.
> Updated: 2026-07-10 (v4)

## Recommended Platforms

| Platform | License | Repo / URL | Stack | Use Case | AI Extension Point |
|----------|---------|------------|-------|----------|--------------------|
| **Odoo Fleet** | LGPL-3.0 | [odoo/odoo](https://github.com/odoo/odoo) — Fleet module | Python/OWL | Dealership ERP + Fleet management: vehicles, contracts, fuel, maintenance scheduling, driver mgmt | Add predictive maintenance agent (OBD → Odoo maintenance order); integrate Claude for NL service booking |
| **Fleetbase** | AGPL-3.0 | [fleetbase/fleetbase](https://github.com/fleetbase/fleetbase) | PHP/Laravel + Ember.js | Modular logistics & supply chain OS: fleet tracking, dispatch, delivery, warehouse, API platform | REST API + webhook hooks → LangGraph agent for route optimization, ETA prediction, anomaly detection |
| **Traccar** | Apache-2.0 | [traccar/traccar](https://github.com/traccar/traccar) | Java | Open-source GPS tracking platform; 200+ GPS protocols; real-time position, geofencing, reports | Stream location events to LLM agent; add anomaly detection + predictive route failure |
| **OpenPilot** | MIT | [commaai/openpilot](https://github.com/commaai/openpilot) | Python/C++ | Consumer ADAS platform; ACC + ALC + FCW + LDW; 200+ car makes | Add LLM-based intent prediction; voice command layer via MCP; fleet monitoring dashboard |
| **Eclipse SDV Stack** | Apache-2.0 | [eclipse-kuksa](https://github.com/eclipse-kuksa) / [eclipse-velocitas](https://github.com/eclipse-velocitas) | Rust/Python/Java | OEM-grade Software-Defined Vehicle platform: in-vehicle apps, VSS data broker, OTA updates, cloud connectivity | KUKSA Databroker → MQTT → LangGraph agents; Eclipse LMOS multi-agent OS layer |
| **Fleetms** | MIT | [jmnda-dev/fleetms](https://github.com/jmnda-dev/fleetms) | Full-stack JS | Open-source fleet maintenance & management: work orders, service records, fuel tracking | Lightweight: add Claude API for NL maintenance scheduling; integrate OBD2 MCP |
| **DealerSocket / VinSolutions** | Commercial | — | Various | Industry-standard Dealer Management Systems (DMS); closed source but offer APIs | Build MCP server wrapper around DMS API; Claude agent for NL inventory search + lead scoring |

---

## How to Add an AI Layer

### Pattern A: Diagnostics-First (OBD + MCP → Platform)
```
OBD-II adapter (ELM327)
       ↓
obd2-mcp-server (MIT)         ← $15 hardware, any car 1996+
       ↓
Claude / LLM agent             ← reads DTCs, sensor data
       ↓
Odoo/Fleetms work order        ← auto-creates maintenance ticket
       ↓
Technician dashboard
```
**Time:** 2–4 weeks | **Cost:** $30k–$80k | **ROI:** $22k/min prevented downtime

### Pattern B: SDV Vehicle App (Eclipse Stack)
```
Physical Vehicle
       ↓
KUKSA Databroker (VSS signals)
       ↓
Eclipse Velocitas Vehicle App (Python)
       ↓
LLM reasoning layer (Claude Haiku)
       ↓
Eclipse LMOS multi-agent orchestration
       ↓
Cloud dashboard / OTA actions
```
**Time:** 5–8 weeks | **Cost:** $200k–$600k | **Target:** OEM Tier-1 integration

### Pattern C: Fleet Intelligence (Fleetbase + AI)
```
Fleetbase API (fleet position, orders, drivers)
       ↓
LangGraph agent (route optimizer + anomaly detector)
       ↓
Claude Sonnet (NL report generation)
       ↓
WhatsApp / Dashboard alerts
```
**Time:** 4–6 weeks | **Cost:** $80k–$200k | **Target:** LATAM logistics operators

---

## OEM Platforms to Know (Commercial — context for clients)

| OEM Platform | AI Stack | What Globant Can Add |
|--------------|----------|----------------------|
| **BMW OS X** (iX3 Neue Klasse) | Alexa+ native, 20× compute | Eclipse LMOS integration, custom skill development |
| **Stellantis STLA Brain** | Applied Intuition Vehicle OS | Cabin Intelligence customization, LATAM market personalization |
| **Toyota Snapdragon Digital Chassis** | Qualcomm AI Hub | Edge inference Vehicle Apps, Japanese → LATAM localization |
| **Cerence xUI / CaLLM** | Swappable LLM (Claude-compatible) | CaLLM → Claude swap, custom voice UX |

---

## LATAM Vertical Opportunity Map

| Country | Automotive Base | AI Entry Point |
|---------|----------------|----------------|
| **Brazil** | VW, GM, Stellantis, Toyota plants | Predictive maintenance for assembly lines; OBD AI for Denatran compliance |
| **Argentina** | Renault, VW, Toyota, Stellantis | First in LATAM with federal AV regulations → pilot site for AV agent testing |
| **Mexico** | Nissan, GM, Ford, BMW, Honda | Supply chain agent (USMCA documentation + logistics) |
| **Colombia/Chile** | Growing mobility-as-a-service | Fleetbase + AI for ride-hailing + electric bus fleet management |
