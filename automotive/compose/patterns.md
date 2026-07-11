# 🧩 Composition Patterns — Automotive AI

> Concrete wiring recipes using real repos and agents. Each pattern has real code paths.
> Last updated: 2026-07-11 (v6)

## Pattern Architecture

```
[Vertical Platform (open source)]     ← start with something that works
          ↓
[Signal/Data Integration Layer]       ← Kuksa VSS, Odoo XMLRPC, OpenRemote MQTT, OBD-II
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
- [eclipse-lmos/lmos-platform](https://github.com/eclipse-lmos) — multi-agent orchestrator (routing, planning, memory); ADL 1.0 capability declarations
- Whisper (Apache-2.0) — edge speech-to-text
- Claude Haiku or Llama 3.1 (8B) on Qualcomm NPU — intent classification + planning
- [btc710/AutoClaw](https://github.com/btc710/AutoClaw) — CarPlay/Android Auto HMI bridge

**Architecture:**
```
Steering Wheel Button
    → Whisper ASR (edge, <200ms)
    → Intent classifier (edge Llama 3.1-8B)
    → LMOS agent router (ADL capability matching)
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

**Spanish/Portuguese LATAM variant:** Replace Whisper model with fine-tuned Spanish/Portuguese acoustic model. Fine-tune intent classifier on LATAM Spanish commands. Add Portuguese (Brazil) path for BYD LATAM deployments.

**Estimate:** 3-5 months, $80-200k  
**Key client:** LATAM OEM distributor (Toyota, VW LATAM, or BYD entering LATAM) wanting in-vehicle AI assistant

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
**Key client:** Auto dealership chain in Argentina/Brazil/Mexico (Kavak, Toyota/VW dealers, or BYD LATAM dealers)

---

## P5 — Fleet Management AI Agent

**Use case:** Real-time fleet dispatch, route optimization, driver coaching, EV charging coordination for LATAM commercial fleets.

**Stack:**
- [OpenRemote](https://github.com/openremote/openremote) (AGPL) — IoT fleet asset management + MQTT telematics ingestion
- [eclipse-sumo/sumo](https://github.com/eclipse-sumo/sumo) (EPL) — traffic simulation for route decisions
- [LangGraph](https://github.com/langchain-ai/langgraph) — multi-agent fleet coordination
- Pydantic AI (MIT) — typed agent outputs for dispatch decisions
- Claude Sonnet — complex multi-vehicle dispatch reasoning
- Google Maps Routes API — real-time traffic (or OpenStreetMap + Valhalla for self-hosted)

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
- [carla-simulator/carla](https://github.com/carla-simulator/carla) (MIT) — photorealistic simulation (UE5.5)
- [metadriverse/metadrive](https://github.com/metadriverse/metadrive) (Apache-2.0) — lightweight 300+ FPS RL training environment
- [MasoudJTehrani/PCLA](https://github.com/MasoudJTehrani/PCLA) (Apache-2.0) — agent evaluation harness for CARLA
- [commaai/openpilot](https://github.com/commaai/openpilot) (MIT) — reference ADAS implementation + model training
- [cjy1992/gym-carla](https://github.com/cjy1992/gym-carla) (MIT) — RL training environment for CARLA
- MLflow (Apache-2.0) — experiment tracking
- DVC (Apache-2.0) — dataset versioning

**Pipeline:**
```
Scenario Definition (PCLA DSL)
    → MetaDrive: fast RL training (300+ FPS, infinite scenarios)
    → CARLA: photorealistic validation (edge cases, sensor realism)
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
- [eclipse-sumo/sumo](https://github.com/eclipse-sumo/sumo) (EPL) — traffic simulation for V2X scenario modeling
- DSRC / C-V2X communication stack — V2X message exchange
- LangGraph agent — multi-vehicle negotiation planner
- Eclipse LMOS — agent orchestration across vehicle and infrastructure nodes

**LATAM deployment targets:**
- Emergency vehicle preemption at São Paulo intersections
- Bus rapid transit (BRT) signal priority in CDMX
- Freight platooning on LATAM highways (BR-101, Route 40 Argentina)
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

## P9 — OBD2 AI Diagnostics Agent (NEW v6)

**Use case:** AI-powered vehicle diagnostics for workshop mechanics and fleet operators. Reads OBD-II fault codes + live sensor data, produces plain-English diagnosis and repair guidance.

**Stack:**
- ELM327 OBD-II adapter (hardware, ~$10-30)
- [python-OBD](https://github.com/brendan-w/python-OBD) (Apache-2.0) — OBD-II Python interface
- [speed785/open-mechanic](https://github.com/speed785/open-mechanic) (MIT) — FastAPI backend + React dashboard
- Claude Haiku (or Haiku 4.5) — low-latency fault code interpretation + repair guide generation
- pgvector + Odoo CE — RAG over vehicle service history + parts catalog
- WhatsApp Business API — push diagnosis report to vehicle owner

**Architecture:**
```
OBD-II Adapter (ELM327 via USB/Bluetooth)
    → python-OBD library (reads DTC codes + live PIDs)
    → open-mechanic FastAPI backend
    → Claude Haiku: "DTC P0301 on 2019 Toyota Corolla → cylinder 1 misfire"
        ↓ RAG: service history (last ignition coil replacement?)
        ↓ RAG: parts catalog (coil part number + price)
    → Structured diagnosis:
        {severity: "high", dtc: "P0301", diagnosis: "...", repair_steps: [...], parts_needed: [...]}
    → React dashboard (mechanic) + WhatsApp (vehicle owner)
    → Odoo: auto-create repair order with pre-populated parts
```

**Code sketch:**
```python
import obd
connection = obd.OBD()  # auto-connect to OBD-II adapter
dtc_codes = connection.query(obd.commands.GET_DTC).value
live_rpm = connection.query(obd.commands.RPM).value.magnitude

# Pass to Claude for diagnosis
response = client.messages.create(
    model="claude-haiku-4-5-20251001",
    messages=[{"role": "user", "content": f"Vehicle: 2019 Toyota Corolla. DTCs: {dtc_codes}. RPM: {live_rpm}. Diagnose and provide repair steps."}]
)
```

**LATAM localization:**
- Add Spanish/Portuguese fault code database
- Add LATAM-specific parts suppliers (AutoZone Brazil, Salguero Argentina)
- Integrate with Brazilian DENATRAN vehicle registration API for VIN lookup

**Estimate:** 2-6 weeks, $20-60k  
**Key client:** LATAM dealership chain (Toyota, VW dealers), independent mechanic network, Rappi/iFood delivery fleet operators

---

## P10 — VLA Fine-Tuning for Custom ADAS (NEW v6)

**Use case:** Fine-tune OpenDriveVLA on local road data (LATAM conditions, specific vehicle types) to produce a custom E2E ADAS model for an OEM client.

**Stack:**
- [DriveVLA/OpenDriveVLA](https://github.com/DriveVLA/OpenDriveVLA) (Apache-2.0) — base VLA model + 0.5B HuggingFace checkpoint
- [commaai/openpilot](https://github.com/commaai/openpilot) (MIT) — data collection platform (comma 3X fleet)
- [metadriverse/metadrive](https://github.com/metadriverse/metadrive) (Apache-2.0) — synthetic data augmentation (LATAM road scenarios)
- [carla-simulator/carla](https://github.com/carla-simulator/carla) (MIT) — photorealistic validation scenarios
- [MasoudJTehrani/PCLA](https://github.com/MasoudJTehrani/PCLA) (Apache-2.0) — evaluation harness
- HuggingFace Transformers (Apache-2.0) — fine-tuning framework
- MLflow (Apache-2.0) — experiment tracking + model registry
- DVC (Apache-2.0) — dataset versioning

**Pipeline:**
```
Phase 1 — Data Collection (4 weeks)
    comma 3X fleet → openpilot data logger → annotated driving segments
    (LATAM-specific: unpaved roads, motorcycles, informal signage, speed bumps "topes")
    
Phase 2 — Synthetic Augmentation (2 weeks)
    MetaDrive: generate infinite LATAM-like road scenarios
    CARLA: photorealistic rare-event scenes (night, rain, market crossing)
    
Phase 3 — Fine-Tuning (4-6 weeks)
    HuggingFace Transformers + LoRA on 0.5B OpenDriveVLA checkpoint
    Loss: trajectory waypoint prediction on LATAM scenarios
    MLflow: track loss curves, checkpoint management
    
Phase 4 — Evaluation (2 weeks)
    PCLA evaluation harness in CARLA (LATAM maps)
    Metrics: collision rate, lane adherence, comfort index, tope handling
    Compare to base model: target ≥25% improvement on LATAM-specific scenarios
    
Phase 5 — Deployment
    Export to ONNX → Qualcomm AISE SDK → on-vehicle inference
    Shadow mode on pilot fleet → A/B vs openpilot baseline
```

**Estimate:** 4-8 months, $150-400k (R&D engagement)  
**Key client:** OEM entering LATAM market (BYD, Chery) or LATAM-based fleet safety tech startup

---

## Pattern Decision Guide

| Client Situation | Recommended Pattern | Time | Investment |
|-----------------|---------------------|------|-----------|
| Fleet operator (50+ vehicles, LATAM) | P5 Fleet Management AI | 3-5 mo | $100-250k |
| Dealer network (10+ locations) | P4 Dealer AI Copilot | 8-14 wk | $60-150k |
| OEM wanting in-car assistant | P1 Smart Cockpit | 3-5 mo | $80-200k |
| OEM wanting OTA revenue | P2 OTA Monetization | 4-6 mo | $150-350k |
| Fleet/service company | P3 Predictive Maintenance | 6-10 wk | $40-100k |
| Workshop / indie mechanic | P9 OBD2 AI Diagnostics | 2-6 wk | $20-60k |
| OEM ADAS team | P6 ADAS Simulation | 4-8 mo | $120-300k |
| OEM wanting E2E AV (LATAM) | P10 VLA Fine-Tuning | 4-8 mo | $150-400k |
| Smart city / V2X | P7 Cooperative Driving | 6-12 mo | $200-500k |
| Parts distributor / manufacturer | P8 Supply Chain AI | 3-5 mo | $80-200k |
