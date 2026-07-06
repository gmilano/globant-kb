# 🏭 Vertical Solutions — Energy

> Production-grade open-source platforms customizable with AI layers.
> Model: start with something functional, add an agentic layer on top.
> Last updated: 2026-07-06

## Recommended Platforms

| Platform | License | Repo | Stack | Use case |
|----------|---------|------|-------|----------|
| **MyEMS** | MIT | [github.com/myems/myems](https://github.com/myems/myems) | Python + React + MySQL | Building & industrial Energy Management System — dashboards, metering, reports. Add LLM advisor on top. |
| **OpenEMS** | MIT | [github.com/OpenEMS/openems](https://github.com/OpenEMS/openems) | Java + Angular | Edge energy management for solar, BESS, EV charging, heat pumps. REST API for AI agent integration. |
| **OpenRemote** | AGPL-3.0 | [github.com/openremote/openremote](https://github.com/openremote/openremote) | Java + TypeScript | Full IoT platform: device management, asset trees, rule engine. v1.6 native LLM support. 1.8k★ |
| **OperatorFabric** | MPL-2.0 | [github.com/opfab/operatorfabric-core](https://github.com/opfab/operatorfabric-core) | Spring Boot + Angular | RTE France — real-time grid operator alerting, card-based situational awareness. LLM annotation in v5.0. |
| **GridAPPS-D** | BSD-3 | [github.com/GRIDAPPSD/GRIDAPPSD](https://github.com/GRIDAPPSD/GRIDAPPSD) | Python + Java + Docker | DOE/PNNL grid application development platform — SCADA bridge, DER management APIs, RL training |
| **Fledge** | Apache-2.0 | [github.com/fledge-iot/fledge](https://github.com/fledge-iot/fledge) | C++ + Python | LF Energy industrial IoT framework — sensor ingestion, edge ML, cloud bridge for substations |
| **OSEM** | MIT | [github.com/osem-saar/osem](https://github.com/osem-saar/osem) | Ruby on Rails | Open-source event/conference energy mgmt — adaptable for demand-response programs |
| **EnergyPlus** | BSD-3 | [github.com/NREL/EnergyPlus](https://github.com/NREL/EnergyPlus) | C++ (NREL) | DOE whole-building energy simulation. Foundation for Sinergym / RL building control research |

## Key Standards & Protocols (open specs with open-source implementations)

| Standard | Relevance | Open impl |
|----------|-----------|----------|
| **IEC 61850** | Grid substation automation | [pyiec61850-ng](https://github.com/f0rw4rd/pyiec61850-ng) (GPL-3) |
| **OCPP 1.6 / 2.0** | EV charging protocol | [mobilityhouse/ocpp](https://github.com/mobilityhouse/ocpp) (MIT) |
| **OSCP** | EV smart charging | [ChargePi/oscp-go](https://github.com/ChargePi/oscp-go) (MIT) |
| **CIM / CGMES** | Grid topology data model | [CIM-Tools](https://github.com/sogno-platform/cimpy) (MPL-2.0) |
| **FIWARE NGSI-LD** | Smart grid data semantics | OpenRemote + Orion-LD |

## How to Add AI on Top

```
1. Deploy platform (Docker Compose / Helm)
2. Expose REST/MQTT API from platform
3. Connect LangGraph agent to API
4. Add LLM reasoning layer (Claude API / local Ollama)
5. Build operator chat UI (Streamlit / React)
```

### MyEMS + AI example
- **What it is**: production EMS used in 100+ buildings in China, Europe, LATAM
- **AI add-on**: connect Claude API to MyEMS REST; agent answers "Why did Building A spike 40% at 2pm?" in plain language
- **Data in**: real-time meter readings, hourly tariffs, weather
- **Data out**: anomaly explanations, demand response recommendations, report drafts

### OpenEMS + AI example
- **What it is**: edge controller for solar+BESS+EV at prosumer/microgrid level
- **AI add-on**: LangGraph agent reads SoC, solar forecast, tariff schedule; decides charge/discharge schedule
- **Proven**: reduces peak import by 20-35% on time-of-use tariffs

### OperatorFabric + AI example
- **What it is**: real-time operator dashboard used in French/Spanish national grid
- **AI add-on**: LLM alarm annotator classifies incoming grid events, suggests N-1 actions
- **In production**: RTE France v5.0 deployed Jun 2026

---
*See `compose/patterns.md` for wiring diagrams.*
