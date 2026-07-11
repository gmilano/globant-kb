# 🧩 Composition Patterns — Automotive AI

> Concrete wiring recipes using real repos and agents. Each pattern has real code paths.
> Last updated: 2026-07-11

## Pattern Architecture

```
[Vertical Platform (open source)]     ← start with something that works
          ↓
[Signal/Data Integration Layer]       ← Kuksa VSS, Odoo XMLRPC, OpenRemote MQTT
          ↓
[Agent Orchestration]                 ← LangGraph, Eclipse LMOS, CrewAI
          ↓
[LLM Inference]                       ← Ollama (edge), Claude Haiku (cloud), GPT-4o
          ↓
[Action Execution + UI]               ← VSS writes, Odoo RPC, WhatsApp, CarPlay
```

---

## P1 — Smart Cockpit AI Agent

**Use case:** In-vehicle conversational assistant. Driver asks questions, controls media, gets navigation help, and executes vehicle commands via voice/steering wheel.

**Stack:**
- [eclipse-kuksa/kuksa-databroker](https://github.com/eclipse-kuksa/kuksa-databroker) — vehicle signal bus (speed, heading, climate state, ADAS status)
- [eclipse-velocitas/vehicle-app-python-sdk](https://github.com/eclipse-velocitas/vehicle-app-python-sdk) — package agents as Vehicle Apps
- [eclipse-lmos/lmos-platform](https://github.com/eclipse-lmos) — multi-agent orchestrator (routing, planning, memory)
- Whisper (Apache-2.0) — edge speech-to-text
- Claude Haiku or Llama 3.1 (8B) on Qualcomm NPU — intent classification + planning
- [btc710/AutoClaw](https://github.com/btc710/AutoClaw) — CarPlay/Android Auto HMI bridge

**Architecture:**
```
Steering Wheel Button
    → Whisper ASR (edge, <200ms)
    → Intent classifier (edge Llama 3.1-8B)
    → LMOS agent router
        ├── NavigationAgent (reads Kuksa GPS/heading signals)
        ├── MediaAgent (Spotify API / CarPlay media bridge)
        ├── ClimateAgent (writes Kuksa HVAC signals)
        └── VehicleStatusAgent (reads Kuksa diagnostic signals → Claude Haiku for NL response)
    → AutoClaw HMI (streams response to CarPlay display)
```

**Key code paths:**
- `kuksa-python-sdk`: `VehicleDataBrokerClient.get_datapoints([VSS_PATHS])` → read signals
- `vehicle-app-python-sdk`: `Vehicle.Cabin.HVAC.Station.Row1.Left.Temperature.set(22.0)` → write signals
- `LMOS ARC`: `@Agent` annotation on each domain agent class; LMOS routes based on ADL capability declarations

**Estimate:** 3-5 months, $80-200k  
**Key client:** LATAM OEM distributor (Toyota, VW LATAM) wanting to retrofit AI assistant onto existing AAOS vehicles

---

## P2 — OTA Feature Monetization Platform

**Use case:** Enable automakers to deploy new features (sport mode, heated seat subscription, safety package) over-the-air and monetize them per vehicle.

**Stack:**
- [eclipse-velocitas](https://github.com/eclipse-velocitas) — Vehicle App build and deployment pipeline
- [eclipse-kuksa/kuksa-databroker](https://github.com/eclipse-kuksa/kuksa-databroker) — feature flags mapped to VSS signals
- [eclipse-leda](https://github.com/eclipse-leda) — SDV distro with OTA update infrastructure
- Eclipse Kanto — container management on vehicle
- Custom Feature Catalog service — FastAPI (MIT) + PostgreSQL + Stripe
- LangGraph agent — recommends features based on driving behavior patterns

**Architecture:**
```
Vehicle telematics → Kuksa Databroker
    → Feature Usage Analyzer (LangGraph agent reads VSS history)
    → Feature Recommendation Engine (LLM: "You activate Sport mode manually 15x/month")
    → Push offer to mobile app
    → Customer accepts → Feature Catalog activates flag
    → Velocitas OTA deploy Vehicle App with feature enabled
    → Kuksa signals confirm feature active
```

**Estimate:** 4-6 months, $150-350k  
**Key client:** OEM or LATAM distributor wanting subscription revenue on existing fleet

---

## P3 — Predictive Maintenance AI Agent

**Use case:** Monitor vehicle telematics signals, detect anomalies, predict failures 2-3 weeks in advance, auto-create service appointments.

**Stack:**
- [eclipse-kuksa/kuksa-databroker](https://github.com/eclipse-kuksa/kuksa-databroker) — real-time vehicle signals (RPM, coolant temp, battery SoC, brake pressure, ABS events)
- InfluxDB (MIT) — time series storage for signal history
- [LangGraph](https://github.com/langchain-ai/langgraph) (MIT) — reasoning agent with tools
- Claude Haiku / GPT-4o mini — anomaly explanation + service recommendation
- [Odoo CE](https://github.com/odoo/odoo) — auto-create service order on diagnosis
- WhatsApp Business API — push notification to vehicle owner

**Agent tool definition (LangGraph):**
```python
tools = [
    query_signal_history,    # last 30d of VSS signals from InfluxDB
    run_anomaly_detection,   # statistical outlier detection on time series
    lookup_dtc_codes,        # OBDII diagnostic trouble code database
    create_service_order,    # Odoo XMLRPC: create repair order
    notify_customer,         # WhatsApp: send service recommendation
]
```

**Estimate:** 6-10 weeks, $40-100k  
**Key client:** LATAM fleet operator (Uber LATAM, DHL, Rappi delivery fleets)

---

## P4 — Dealer AI Copilot

**Use case:** AI agent for automotive dealership operations: lead qualification, inventory inquiry, service scheduling, warranty claim assistance.

**Stack:**
- [Odoo CE](https://github.com/odoo/odoo) (LGPL) — fleet + CRM + repair modules as DMS foundation
- [LangGraph](https://github.com/langchain-ai/langgraph) (MIT) — agent workflow orchestration
- pgvector (PostgreSQL extension) — RAG over vehicle inventory, service history, parts catalog
- Claude Haiku — low-latency responses for chat
- FastAPI (MIT) — REST bridge between LangGraph agents and Odoo XMLRPC
- WhatsApp Business or web chat widget — customer-facing interface

**Agent capabilities:**
```
DealerCopilotAgent
├── LeadQualifier    → reads CRM, asks qualifying questions, scores lead 1-10
├── InventoryAgent   → semantic search over vehicle catalog (make/model/price/features)
├── ServiceScheduler → checks calendar, books appointment, creates Odoo repair order
├── WarrantyAdvisor  → RAG over warranty terms + claim history, advises customer
└── FollowUpAgent    → proactive outreach based on service history triggers
```

**RAG corpus:** Load Odoo inventory table + service history + parts catalog into pgvector. Embed with `text-embedding-3-small`. Query at inference time.

**Estimate:** 8-14 weeks, $60-150k  
**Key client:** Auto dealership chain in Argentina/Brazil/Mexico (Kavak, Toyota/VW dealers)

---

## P5 — Fleet Management AI Agent

**Use case:** Real-time fleet dispatch, route optimization, driver coaching, EV charging coordination for LATAM commercial fleets.

**Stack:**
- [OpenRemote](https://github.com/openremote/openremote) (AGPL) — IoT fleet asset management + MQTT telematics ingestion
- SUMO traffic simulator (EPL) — route simulation for dispatch decisions
- [LangGraph](https://github.com/langchain-ai/langgraph) — multi-agent fleet coordination
- Pydantic AI (MIT) — typed agent outputs for dispatch decisions
- Claude Sonnet — complex multi-vehicle dispatch reasoning
- Google Maps Routes API — real-time traffic data (or OpenStreetMap + Valhalla for self-hosted)

**Agents:**
```
FleetCommanderAgent (orchestrator)
├── RouteOptimizer       → SUMO simulation + traffic API → optimal routes
├── MaintenanceMonitor   → vehicle signal anomaly detection (→ P3 pattern)
├── DriverCoach          → analyzes driving events (hard braking, speeding) → feedback
├── EVChargingCoordinator → schedules charging to minimize cost + downtime
└── IncidentResponder    → emergency rerouting on accidents/breakdowns
```

**Estimate:** 3-5 months, $100-250k  
**Key client:** LATAM logistics companies (DHL LATAM, Rappi, MercadoLibre logistics)

---

## P6 — ADAS Development & Simulation Pipeline

**Use case:** Build, test, and validate custom ADAS features using simulation before hardware deployment.

**Stack:**
- [carla-simulator/carla](https://github.com/carla-simulator/carla) (MIT) — photorealistic simulation
- [MasoudJTehrani/PCLA](https://github.com/MasoudJTehrani/PCLA) (Apache-2.0) — agent evaluation harness for CARLA
- [commaai/openpilot](https://github.com/commaai/openpilot) (MIT) — reference ADAS implementation + model training
- [cjy1992/gym-carla](https://github.com/cjy1992/gym-carla) (MIT) — RL training environment
- MLflow (Apache-2.0) — experiment tracking
- DVC (Apache-2.0) — dataset versioning

**Pipeline:**
```
Scenario Definition (PCLA DSL)
    → CARLA simulation runs (GPU cluster)
    → gym-carla RL training loop
    → Model checkpoint (MLflow tracking)
    → PCLA evaluation harness (metrics: collision rate, lane adherence, comfort)
    → Pass threshold? → openpilot integration branch
    → Shadow mode testing on comma 3X hardware
    → OTA deploy to pilot fleet
```

**Estimate:** 4-8 months, $120-300k  
**Key client:** OEM LATAM partner, aftermarket ADAS company, or fleet safety program

---

## P7 — V2X Cooperative Driving Agent

**Use case:** AI agents coordinating vehicle behavior with infrastructure (traffic lights, tolls, emergency vehicles) using CARMA Platform + V2X communications.

**Stack:**
- [usdot-fhwa-stol/carma-platform](https://github.com/usdot-fhwa-stol/carma-platform) (Apache-2.0) — cooperative driving automation framework
- [usdot-fhwa-stol/carma-cloud](https://github.com/usdot-fhwa-stol/carma-cloud) (Apache-2.0) — infrastructure-side coordination
- DSRC / C-V2X communication stack — V2X message exchange
- LangGraph agent — multi-vehicle negotiation planner
- Eclipse LMOS — agent orchestration across vehicle and infrastructure nodes

**Use case specific to LATAM:**
Smart city deployment in São Paulo or CDMX for:
- Emergency vehicle preemption at intersections
- Bus rapid transit (BRT) signal priority
- Freight platooning on LATAM highways
- Construction zone speed harmonization

**Estimate:** 6-12 months, $200-500k (city-scale deployment)  
**Key client:** Brazilian/Mexican smart city programs, transit authorities

---

## P8 — Automotive Supply Chain AI Agent

**Use case:** Predict supply chain disruptions, auto-trigger procurement, optimize parts inventory across dealer network.

**Stack:**
- [frappe/erpnext](https://github.com/frappe/erpnext) (GPL) — parts inventory + BOM + procurement foundation
- [LangGraph](https://github.com/langchain-ai/langgraph) (MIT) — supply chain reasoning agent
- Apache Kafka (Apache-2.0) — real-time supplier signal streaming
- pgvector — semantic search over parts catalog + supplier database
- Claude Sonnet — complex disruption scenario analysis
- Frappe webhooks — trigger agents on inventory events

**Agents:**
```
SupplyChainCommanderAgent
├── DisruptionMonitor    → news/social signals → predict supplier risk
├── InventoryOptimizer   → analyze stock levels → reorder point adjustment
├── SupplierNegotiator   → draft procurement requests based on shortage signals
├── SubstitutesFinder    → RAG over BOM → find alternative part numbers
└── DealerAllocator      → optimize parts distribution across dealer network
```

**Estimate:** 3-5 months, $80-200k  
**Key client:** OEM parts distributor in LATAM or Tier-1 supplier with LATAM manufacturing

---

## Pattern Decision Guide

| Client Situation | Recommended Pattern | Time | Investment |
|-----------------|---------------------|------|-----------|
| Fleet operator (50+ vehicles, LATAM) | P5 Fleet Management AI | 3-5 mo | $100-250k |
| Dealer network (10+ locations) | P4 Dealer AI Copilot | 8-14 wk | $60-150k |
| OEM wanting in-car assistant | P1 Smart Cockpit | 3-5 mo | $80-200k |
| OEM wanting OTA revenue | P2 OTA Monetization | 4-6 mo | $150-350k |
| Fleet/service company | P3 Predictive Maintenance | 6-10 wk | $40-100k |
| OEM ADAS team | P6 ADAS Simulation | 4-8 mo | $120-300k |
| Smart city / V2X | P7 Cooperative Driving | 6-12 mo | $200-500k |
| Parts distributor / manufacturer | P8 Supply Chain AI | 3-5 mo | $80-200k |
