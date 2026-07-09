# Vertical Solutions — Energy

> Existing open source platforms that can be customized with an AI layer on top.
> Model: start with something functional, add agentic layer above.
> Last updated: 2026-07-09 (v2)

## Recommended Platforms (Fork and Extend)

| Platform | License | Stars | Stack | Primary Use Case | AI Layer Strategy |
|----------|---------|-------|-------|-----------------|-------------------|
| [OpenEMS](https://github.com/OpenEMS/openems) | Apache-2.0 | 500★ | Java/OSGi, TypeScript (React), REST | Residential/commercial EMS — solar, storage, EV, heat-pump | Add AI controller as OSGi bundle; LLM-driven schedule optimization via REST |
| [MyEMS](https://github.com/MyEMS/myems) | MIT | 900+★ | Python Flask, React, MySQL/TimescaleDB | Industrial/commercial EMS — electricity, water, gas, ISO 50001 | REST API → Agent integration; AI anomaly detection, VPP module |
| [OpenRemote](https://github.com/openremote/openremote) | AGPL-3.0 | 1.8k★ | Java, TypeScript, PostgreSQL, MQTT | IoT EMS / Energy Hub — industrial, airport, microgrid, EV fleet | Flow rules + AI agent via webhook/MCP; native MCP v5 |
| [VOLTTRON](https://github.com/VOLTTRON/volttron) | Apache-2.0 | 560★ | Python, pub/sub, OpenADR 2.0, BACnet | Building-grid interaction, demand response | Python agent host — drop in ML/RL agents; integrates with OpenADR |
| [Emoncms](https://github.com/emoncms/emoncms) | AGPL-3.0 | 1.5k★ | PHP, MySQL, MQTT, InfluxDB | Residential energy monitoring, OpenEnergyMonitor | InfluxDB → AI forecasting pipeline; anomaly detection |
| [OpenDSS (py bindings)](https://github.com/dss-extensions/OpenDSSDirect.py) | BSD-3 | 200★ | Python bindings to EPRI OpenDSS | Distribution system simulator — utility-grade T&D analysis | Grid-Agent can use OpenDSS as its power flow backend |
| [Node-RED](https://github.com/node-red/node-red) | Apache-2.0 | 20k★ | Node.js, visual flows, 5000+ nodes | IoT/SCADA orchestration — PLC, API, MQTT, Modbus | Add AI nodes (claude-node, langchain-node); visual agentic pipelines |
| [HOPP (NREL)](https://github.com/NREL/HOPP) | BSD-3 | 300★ | Python, NREL hybrid plant optimization | Hybrid renewable + storage plant optimization | AI scenario generation feeding HOPP; LLM interpretation of results |

## Deep Dives: Top 3 for Globant Engagements

### OpenEMS — Best for EU Residential/Commercial
```
OpenEMS Edge (on-site Java) <-> OpenEMS Backend (cloud Java) <-> OpenEMS UI (React)
       |
  AI Controller Bundle (Python REST bridge)
  LLM Scheduling Service (Claude Sonnet / local Ollama)
```
- **Why**: Monthly releases, Odoo integration, active EU community
- **Client fit**: EU utilities, ESCO companies, residential solar+BESS operators
- **LATAM fit**: Moderate — EU-centric but architecturally sound for AR/BR solar+BESS

### MyEMS — Best for Industrial/LATAM
```
Data Collectors (Modbus/BACnet/MQTT) → TimescaleDB → Python API → React Dashboard
                                                            |
                                         AI Agent (LangGraph + Claude)
                                         - Anomaly detection
                                         - Optimization recommendations
                                         - VPP aggregation
```
- **Why**: MIT license (cleanest for commercial), Python-native, ISO 50001 built-in
- **Client fit**: Factories, malls, hospitals in LATAM; ISO 50001 certification projects
- **LATAM fit**: High — multilingual, active in ASEAN + LATAM markets

### OpenRemote — Best for Microgrid / EV Fleet
```
Assets (EV chargers, panels, meters) → OpenRemote IoT Platform → Rules Engine
                                                 |
                                  AI Agent via MCP / Webhook
                                  - EV smart charging
                                  - Microgrid balancing
                                  - Predictive demand response
```
- **Why**: Native MCP support v5.x, best EV charging orchestration
- **Client fit**: EV fleet operators, airports, industrial microgrids
- **LATAM fit**: High — Brazil EV fleet growth + Chilean mining microgrids

## Custom AI Stack (Greenfield)
```
Data Layer:      TimescaleDB / InfluxDB + PostgreSQL
Protocol Layer:  VOLTTRON (grid-edge) or Node-RED (light)
Simulation:      PyPSA (planning) + pandapower (real-time) + sinergym (optimization)
AI Agent:        LangGraph + Claude Sonnet 5 + domain tools
Forecast:        TimesFM 2.5 (zero-shot) or fine-tuned Chronos
API/UI:          FastAPI + React (or OpenEMS UI fork)
```
Time-to-MVP: 8-14 weeks | Deal size: $150k-$800k

---
*Updated by Globant AI Studios ingestion pipeline.*
