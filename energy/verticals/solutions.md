# Vertical Solutions — Energy

> Full vertical platforms — real systems to fork and add an AI layer on top.
> Model: start from something functional, add an agentic layer above it.
> Last updated: 2026-07-08

## Recommended Platforms

| Platform | License | Repo / URL | Stack | Use Case |
|----------|---------|------------|-------|----------|
| [OpenEMS](https://github.com/OpenEMS/openems) | AGPL-3.0 / EPL-2.0 | github.com/OpenEMS/openems | Java + TypeScript | Energy management IoT stack; add AI anomaly detection + RL dispatch |
| [Emoncms](https://github.com/emoncms/emoncms) | AGPL-3.0 | github.com/emoncms/emoncms | PHP + MySQL | IoT energy monitoring + SCADA for PV; add ML forecasting layer |
| [PyPSA](https://github.com/PyPSA/PyPSA) | MIT | github.com/PyPSA/PyPSA | Python | Power system optimization; add LLM planning assistant + scenario generation |
| [pandapower](https://github.com/e2nIEE/pandapower) | BSD-3 | github.com/e2nIEE/pandapower | Python + pandas | Power flow analysis; add PowerMCP for LLM-driven grid analysis |
| [CityLearn](https://github.com/intelligent-environments-lab/CityLearn) | MIT | github.com/intelligent-environments-lab/CityLearn | Python + Gymnasium | RL demand response; deploy trained policies to building controllers |
| [OpenSTEF](https://github.com/OpenSTEF/openstef) | Apache-2.0 | github.com/OpenSTEF/openstef | Python + XGBoost | AutoML energy forecasting; deploy at any distribution utility |
| [EnergyPlus](https://github.com/NREL/EnergyPlus) | BSD-3 | github.com/NREL/EnergyPlus | C++ + Python | Building energy simulation; RL agent training environment |
| [oemof-solph](https://github.com/oemof/oemof-solph) | MIT | github.com/oemof/oemof-solph | Python | Energy system optimization modeling; multi-sector long-term planning |
| [Grid2Op](https://github.com/Grid2op/grid2op) | MPL v2.0 | github.com/Grid2op/grid2op | Python + Gymnasium | Grid RL training environment; RL2Grid benchmark standard (2026) |
| [Rapid SCADA](https://rapidscada.org/) | Apache-2.0 | rapidscada.org | C# + ASP.NET | Industrial SCADA; real-time data acquisition, alarm management, trending |
| [MyEMS](https://github.com/MyEMS/myems) | Open source | github.com/MyEMS/myems | Python + React | Commercial building EMS; AI-ready analytics for electricity/water/gas |

---

## Platform Deep Dives

### 1. OpenEMS — AI-Enhanced Energy Management

**What it does:** Modular IoT platform for managing energy storage, renewables, EV chargers, heat pumps, and grid tariffs. Three-tier architecture: Edge (on-site PLC-like control, 15-min cycle), UI (real-time web dashboard), Backend (cloud aggregation). Used by utilities, building operators, and industrial sites across Europe. Latest release: 2026.7.0 (July 2026, 138 total releases).

**AI integration points:**
```
OpenEMS REST API (real-time meter readings, device states, PV output, battery SoC)
    ↓ (poll every 60s)
LangGraph agent orchestrator
    ├── anomaly_agent: detect abnormal consumption vs. expected profile (Claude)
    ├── forecast_agent: 24h load + solar generation forecast (calls OpenSTEF)
    ├── dispatch_agent: optimal battery charge/discharge schedule
    └── alert_agent: notify operator for critical events (Slack / WhatsApp)
    ↓
OpenEMS control commands (charge battery, curtail PV, adjust EV charging rate)
```

**What to add:**
- Conversational energy advisor: NL interface ("Why is building 3 consuming 40% more than yesterday?")
- Predictive maintenance: inverter + battery health agent from telemetry trends
- Tariff optimization: agent reads real-time electricity prices and schedules flexible loads
- Carbon footprint tracker: auto-generate Scope 2 emissions reports from meter data
- Portuguese/Spanish language interface for LATAM utility field operators

**LATAM angle:** Self-hostable — critical for Brazilian and Chilean utilities where data sovereignty (Brazil LGPD) restricts cloud processing of grid operational data.

---

### 2. CityLearn — RL Demand Response for Buildings

**What it does:** Multi-agent RL environment for building energy coordination. RL agents control HVAC, EV charging, batteries, and heating systems to minimize peak demand, costs, and grid stress. MIT license, 621★. Compatible with all major RL libraries.

**Production deployment path:**
```
CityLearn environment (simulation with real building data)
    ↓
RL agent training (PPO / SAC via Stable-Baselines3)
    ↓
Policy evaluation (reward = -cost - peak_penalty - discomfort)
    ↓
Export trained policy (ONNX or pickle)
    ↓
Deploy to building controller (BMS API integration)
    ↓
Real-time inference: agent reads state → sends control commands every 15 min
```

**What to add:**
- LLM explainer: Claude explains RL agent decisions to building operators in plain language
- Multi-building coordinator: LangGraph orchestrates RL agents across building portfolio
- Demand response market agent: links to electricity market APIs (CCEE Brazil / CEN Chile) for incentive-based response
- Spanish/Portuguese alert messages for LATAM building facility managers

---

### 3. OpenSTEF — Utility-Grade Energy Forecasting

**What it does:** Complete AutoML pipeline for short-term energy forecasting. Developed by Alliander and production-tested at scale. Handles the full ML workflow — raw data to probabilistic forecast with uncertainty bands. Critical for grid operators scheduling balancing reserves.

**Integration with LATAM utilities:**
```
Smart meter data (AMI head-end system)
    +
Weather forecast API (INMET Brazil / DMC Chile / Open-Meteo)
    ↓
OpenSTEF AutoML pipeline
    → Feature engineering (lags, weather, calendar effects, Brazilian holidays)
    → Model selection (XGBoost / LightGBM / linear boosting)
    → Probabilistic forecast (P10, P50, P90)
    ↓
Operational planning:
    ├── Grid operator: schedule reserves based on P90 forecast
    ├── Renewables: curtailment planning for overgeneration scenarios
    └── DER aggregator: coordinate demand response events
```

**LATAM retrain opportunity:** European-trained OpenSTEF models underperform in LATAM due to different climate patterns (Brazilian cerrado, Chilean desert, LATAM holiday calendar). Retraining on local data = significant accuracy gain = competitive differentiation.

---

### 4. PyPSA + PowerMCP — LLM-Assisted Grid Planning

**What it does:** PyPSA provides power system optimization (capacity planning, optimal dispatch, transmission constraints). PowerMCP wraps PyPSA as an MCP server, enabling Claude and other LLMs to call PyPSA directly through natural language.

**Use case — Grid Planning Agent:**
```
Planning engineer asks Claude:
"What is the impact of adding 500 MW of offshore wind in Rio Grande do Sul
on grid congestion and curtailment?"
    ↓
Claude uses PowerMCP to:
    1. Load the PyPSA-Earth Brazil grid model
    2. Add the new wind generation nodes
    3. Run optimal power flow (OPF)
    4. Compute congestion delta and curtailment volume
    5. Return narrative + tables to the engineer
```

---

### 5. Grid2Op — RL Grid Operations Platform

**What it does:** RTE France's open-source framework for sequential decision-making in power systems. Standard RL environment for training and evaluating grid operators. RL2Grid (2026) benchmark makes Grid2Op the scientific reference for this domain.

**AI pipeline:**
```
Grid2Op environment (realistic power grid simulation)
    ↓
RL agent training:
    ├── Algorithm: PPO / SAC / A3C
    ├── State: grid topology + line flows + generation dispatch
    ├── Action: topological reconfigurations + redispatch
    └── Reward: minimize overloads + minimize curtailment
    ↓
RL2Grid benchmark evaluation (standardized score)
    ↓
TSO/ISO pilot deployment with human operator oversight
```

---

### 6. MyEMS — Commercial Building Energy Management

**What it does:** Open-source energy management system for buildings, factories, shopping malls, hospitals, and parks. Collects, analyzes, and reports energy and carbon emissions across electricity, water, gas, cooling, and heating systems. Enterprise version adds PV, storage, microgrids, virtual power plants, and AI optimization.

**AI integration:** REST API exposes metered data → LangGraph agent → anomaly detection + procurement optimization + Scope 2 carbon reporting. Strong candidate for LATAM commercial real estate clients (São Paulo office towers, Chilean malls).

---

## Selection Guide

| Scenario | Recommended Platform | AI Layer |
|----------|---------------------|----------|
| Commercial building / campus energy | OpenEMS + LangGraph | Anomaly + tariff optimization + forecast |
| Multi-building demand response | CityLearn + LangGraph | RL dispatch + LLM explainer |
| Distribution utility forecasting | OpenSTEF | AutoML probabilistic forecasting |
| Grid planning + analysis | PyPSA + PowerMCP | LLM-driven scenario analysis |
| Solar/storage site SCADA | Emoncms + ML pipeline | Generation forecast + fault detection |
| National/regional grid modeling | PyPSA-Earth | LLM planning assistant + scenario generation |
| Industrial energy management | OpenEMS + oemof | Cost optimization + multi-carrier energy |
| RL grid operations (research→pilot) | Grid2Op + RL training | RL2Grid benchmark → TSO/ISO pilot |
| Commercial building EMS (LATAM) | MyEMS + LangGraph | Scope 2 carbon + AI procurement |

---

## How to Add AI to Any Energy Platform

1. **Fork the base platform** — keep upstream remote for security patches (energy software has long maintenance horizons)
2. **Expose the time-series data** — most platforms have REST or MQTT hooks; capture telemetry at consistent intervals
3. **Add an agent orchestration layer** — LangGraph wrapping the platform's API for multi-agent coordination
4. **Wire in LLM inference** — Claude API for reasoning; local Ollama for sensitive operational data (LGPD compliance)
5. **Add probabilistic forecasting** — OpenSTEF or custom XGBoost model on historical data
6. **Build the operator interface** — React chat panel or WhatsApp webhook (common in LATAM utility operations)
7. **Instrument with Langfuse** — trace agent calls, measure forecast accuracy, track operator intervention rate

---
*Auto-updated by the ingest pipeline.*
