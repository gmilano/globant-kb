# Vertical Solutions — Energy

> Existing open source platforms to customize with AI. Model: start from a working system, add an agentic layer on top.
> Last updated: 2026-07-11 (v2)

## Recommended Platforms

| Platform | License | GitHub | Stack | Primary Use Case | AI Customization Path |
|----------|---------|--------|-------|-----------------|----------------------|
| **OpenEMS** | EPL-2.0 (edge/backend) / AGPL-3.0 (UI) | [OpenEMS/openems](https://github.com/OpenEMS/openems) | Java, OSGi, TypeScript | Behind-the-meter EMS: BESS, solar, EV charging, heat pumps, ToU tariffs | Expose REST API → LangGraph agent for VPP dispatch decisions; add LLM for operator Q&A |
| **VOLTTRON** | Apache-2.0 | [VOLTTRON/volttron](https://github.com/VOLTTRON/volttron) | Python 3.10, pub-sub bus | Distributed sensing and control across utility assets; SCADA/BMS integration | Native agent framework — deploy AI agents as VOLTTRON agents alongside existing control agents |
| **EVerest** | Apache-2.0 | [EVerest/everest-core](https://github.com/EVerest/everest-core) | C++, Python, MQTT | EV charging station software (OCPP 1.6/2.0.1/2.1, ISO 15118, IEC 61851) | Smart charging optimization agent: consume grid signal → adjust OCPP charge profile via EVerest API |
| **OpenSTEF** | MPL-2.0 | [OpenSTEF/openstef](https://github.com/OpenSTEF/openstef) | Python, MLflow, XGBoost/LightGBM | Probabilistic load/generation forecasting for DSOs | Add LLM alert agent: trigger natural-language forecasting reports + anomaly explanations |
| **PyPSA** | MIT | [PyPSA/PyPSA](https://github.com/PyPSA/PyPSA) | Python, pandas, Gurobi/HiGHS | National/regional energy system modeling and OPF | LLM scenario generation: "model 80% renewable by 2035 in Colombia" → agent drives PyPSA → explains results |
| **pandapower** | BSD-3-Clause | [e2nIEE/pandapower](https://github.com/e2nIEE/pandapower) | Python, pandas, SciPy | Distribution grid power flow, state estimation, N-1 contingency | FastAPI + pandapower grid analysis microservice; LLM front-end for utility engineers |
| **Grid2Op** | MPL-2.0 | [Grid2op/grid2op](https://github.com/Grid2op/grid2op) | Python, Gymnasium | RL testbed for TSO/DSO grid control agents | Train topology optimization agents; demonstrate AI grid control to utility clients |
| **CityLearn** | MIT | [intelligent-environments-lab/CityLearn](https://github.com/intelligent-environments-lab/CityLearn) | Python, Gymnasium | Multi-building demand response at district/city scale | Multi-agent RL for building portfolio demand response; integrate with utility AMI data |
| **OperatorFabric** | MPL-2.0 | [opfab/operatorfabric-core](https://github.com/opfab/operatorfabric-core) | Java, Angular, MongoDB | Real-time grid operator workstation: alerts, events, process monitoring | Add MCP-based Claude agent for natural-language query over grid events and incident triage |
| **OpenRemote** | AGPL-3.0 | [openremote/openremote](https://github.com/openremote/openremote) | Java, TypeScript, Docker | IoT platform for energy assets: EV, solar, BESS, smart meters | Flow-based AI rules → LLM agent for automated demand response and tenant notifications |

## How to Customize with AI

### Pattern: OpenEMS + LangGraph VPP Agent
```
OpenEMS (edge) collects BESS/solar/EV telemetry via IEC 61850 / Modbus
  → REST API exposes real-time asset state
  → LangGraph agent subscribes to state changes
  → Agent evaluates: market price signal + grid frequency + weather forecast
  → Agent calls OpenEMS REST to adjust BESS dispatch setpoints
  → Reports dispatch decisions to operator via Slack/email
```

### Pattern: VOLTTRON + AI Microservices
```
VOLTTRON agents (existing) collect BAS/SCADA data
  → Publish to VOLTTRON message bus
  → AI Agent subscribes (as a VOLTTRON agent)
  → Runs inference via local Ollama (air-gapped compliance)
  → Publishes AI-derived setpoints back to bus
  → VOLTTRON actuator agent executes setpoints
```

### Pattern: PyPSA + LLM Scenario Engine
```
Client provides grid topology data (MATPOWER/PSS-E format)
  → Convert to PyPSA network
  → LLM agent takes natural-language scenario: "Add 2GW offshore wind"
  → Agent translates to PyPSA component additions
  → Run OPF + capacity expansion
  → LLM agent interprets results → generates executive summary
  → Output: PDF report with charts for utility board
```

### Pattern: EVerest + Smart Charging Agent
```
EVerest manages physical EV charger hardware
  → OCPP 2.1 interface exposed via EVerest
  → Smart Charging Agent monitors: grid frequency, ToU tariff, local PV generation
  → Agent computes optimal charge schedule (PyPSA OPF or heuristic)
  → Issues OCPP SetChargingProfile commands to EVerest
  → Result: 15-30% charging cost reduction + grid congestion relief
```

## Platform Decision Guide

| Need | Recommended Platform |
|------|---------------------|
| Behind-the-meter BESS/solar control | OpenEMS |
| Distributed utility-grade sensing + AI agents | VOLTTRON |
| EV charging (EVSE manufacturer / fleet) | EVerest |
| Grid load forecasting for DSO | OpenSTEF |
| National/regional energy planning | PyPSA / PyPSA-Eur |
| Distribution grid analysis | pandapower |
| Grid RL agent demonstration | Grid2Op |
| Building demand response | CityLearn |
| TSO/DSO operator workstation | OperatorFabric |
| Multi-device IoT energy management | OpenRemote |

---
*See also: `repos/foundations.md` for lower-level component libraries.*
