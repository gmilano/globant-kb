# Vertical Solutions — Energy

> Existing open-source platforms to customize with AI. Strategy: start with something functional, add agentic layer on top.
> Last updated: 2026-07-13

## EV Charging Management

| Platform | License | Stars | Stack | AI Customization |
|----------|---------|-------|-------|----------------|
| [EVerest](https://github.com/EVerest/everest-core) | Apache-2.0 | ~500 | C++/Python, OCPP 1.6/2.0.1, ISO 15118, OCPI, V2G | FlexMeasures plugin for AI scheduling; LLM agent for fleet optimization. v2026.02.0 LTS. OEMs: Tritium, Pionix. |
| [evcc](https://github.com/evcc-io/evcc) | MIT | ~12k | Go binary, 200+ charger integrations, REST + MQTT API | Tariff-aware AI load shifting; solar surplus charging; webhook/API for agent integration. Best-in-class UX. |
| [open-e-mobility](https://github.com/sap/e-mobility-charging-stations-simulator) | Apache-2.0 | ~600 | Node.js, OCPP 1.6/2.0, multi-tenant | SAP-backed; smart charging features; AI agent via REST hooks |
| [OpenOCPP](https://github.com/c3t-eng/open-ocpp) | Apache-2.0 | ~80 | Embedded C++, OCPP 1.6/2.0, CSMS | ChargeLab-supported; firmware-level EV charger AI integration |

## Energy Management Systems (EMS)

| Platform | License | Stars | Stack | AI Customization |
|----------|---------|-------|-------|----------------|
| [OpenEMS](https://github.com/OpenEMS/openems) | Apache-2.0 | ~1.1k | Java OSGi, REST/JSON-RPC, modular controllers | Controller modules for RL-based dispatch; REST API for AI agents; 50+ device integrations |
| [evcc](https://github.com/evcc-io/evcc) | MIT | ~12k | Go, REST, MQTT, modbus | (see above) Best for prosumer + small commercial sites |
| [MyEMS](https://github.com/MyEMS/myems) | MIT (core) | ~1k | Python + React, REST API | Supports electricity/gas/water/cooling/heating + BESS + solar + VPP; AI module hooks via REST |
| [FlexMeasures](https://github.com/FlexMeasures/flexmeasures) | Apache-2.0 | ~600 | Python Flask, REST API, plugin system | Native AI scheduling core — it IS the AI layer; add custom ML forecasters via plugin |

## Grid Operations & SCADA

| Platform | License | Stars | Stack | AI Customization |
|----------|---------|-------|-------|----------------|
| [SOGNO Platform](https://github.com/sogno-platform) | Apache-2.0 | ~300 | Microservices, Kubernetes, gRPC | LF Energy microservices for grid automation; ML service injection via gRPC |
| [OpenRemote](https://github.com/openremote/openremote) | AGPL-3.0 | ~1.8k | Java, React, MQTT, REST | 100% open IoT + asset management; rules engine extensible with ML predictions |
| [OpenDSS (Python)](https://github.com/dss-extensions/OpenDSSDirect.py) | BSD-3-Clause | ~200 | Python wrapper for EPRI OpenDSS | Distribution system simulator; used in PowerGym, GridLearn; AI agent integration via Python |

## BESS / Storage Optimization

| Platform | License | Stars | Stack | AI Customization |
|----------|---------|-------|-------|----------------|
| [FlexMeasures](https://github.com/FlexMeasures/flexmeasures) | Apache-2.0 | ~600 | Python, REST, Celery | Built-in BESS scheduling with ML forecasting; market price integration |
| [bess-optimizer](https://github.com/FlexPwr/bess-optimizer) | MIT | ~90 | Python, Pyomo | Three-market optimization model; customizable with ML price forecasts |
| [BESS-Analytics](https://github.com/sztistvan/BESS-Analytics) | MIT | ~50 | Python, browser-based | Sizing + simulation tool; add AI recommendations on top |

## Virtual Power Plants (VPP)

| Platform | License | Stars | Stack | AI Customization |
|----------|---------|-------|-------|----------------|
| [OpenEMS](https://github.com/OpenEMS/openems) | Apache-2.0 | ~1.1k | Java OSGi, modular | VPP aggregation via controller modules; AI dispatch agent via REST |
| [FlexMeasures](https://github.com/FlexMeasures/flexmeasures) | Apache-2.0 | ~600 | Python, REST | Native VPP use case: aggregate flexibility from many sites for grid services |

## How to Add AI Layer

```
1. Pick a vertical platform (e.g., OpenEMS for EMS, EVerest for EV charging)
2. Fork + deploy (Docker Compose templates available for all above)
3. Expose REST/MQTT API endpoints to an AI orchestration layer (LangGraph / FlexMeasures)
4. Add a forecasting service (Claude + custom ML model or EMQX data pipeline)
5. Build conversational UI for operators (Claude claude-sonnet-4-5 + MCP tools)
6. Close the loop: AI agent → schedule → actuate via platform API
```

## LATAM Fit

| Platform | LATAM Suitability |
|----------|-----------------|
| evcc | Strong: Brazil/Chile/Mexico prosumers; Spanish/Portuguese UI; low server footprint |
| OpenEMS | Strong: industrial + commercial; works in air-gapped environments |
| EVerest | Growing: LATAM EV market expanding; Pionix partnership in BR/MX |
| MyEMS | Strong: multi-building portfolios (hospitals, factories, universities) common in LATAM |
| FlexMeasures | Good: demand response programs emerging in BR/CL/CO; B2B API integration |
