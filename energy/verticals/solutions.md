# Vertical Solutions — Energy

> Full vertical platforms — real systems to fork and add an AI layer on top.
> Model: start from something functional, add an agentic layer above it.
> Last updated: 2026-07-07

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

---

## Platform Deep Dives

### 1. OpenEMS — AI-Enhanced Energy Management

**What it does:** Modular IoT platform for managing energy storage, renewables, EV chargers, heat pumps, and grid tariffs. Three-tier architecture: Edge (on-site PLC-like control), UI (real-time web dashboard), Backend (cloud aggregation). Used by utilities, building operators, and industrial sites across Europe. Latest release: 2026.7.0 (July 2026).

**AI integration points:**
```
OpenEMS REST API (real-time meter readings, device states)
    ↓
LangGraph agent orchestrator
    ├── anomaly_agent: detect abnormal consumption vs. expected profile
    ├── forecast_agent: 24h load + solar generation forecast (calls OpenSTEF)
    ├── dispatch_agent: optimal battery charge/discharge schedule
    └── alert_agent: notify operator for critical events (Slack / WhatsApp)
    ↓
OpenEMS control commands (charge battery, curtail PV, adjust EV charging rate)
```

**What to add:**
- Conversational energy advisor: NL interface for operators ("Why is building 3 consuming 40% more than yesterday?")
- Predictive maintenance: inverter + battery health agent from telemetry trends
- Tariff optimization: agent reads real-time electricity prices and schedules flexible loads
- Carbon footprint tracker: auto-generate Scope 2 emissions reports from meter data

**LATAM angle:** Self-hostable — critical for Brazilian and Chilean utilities where data sovereignty (LGPD) restricts cloud processing of grid operational data.

---

### 2. CityLearn — RL Demand Response for Buildings

**What it does:** Multi-agent RL environment for building energy coordination. RL agents control HVAC, EV charging, batteries, and heating systems to minimize peak demand, costs, and grid stress. Compatible with all major RL libraries (Stable-Baselines3, RLlib, CleanRL). MIT license, 621★.

**Production deployment path:**
```
CityLearn environment (simulation with real building data)
    ↓
RL agent training (PPO / SAC via Stable-Baselines3)
    ↓
Policy evaluation (reward = -cost - peak penalty - discomfort)
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
- Demand response market agent: links to electricity market APIs for incentive-based response

---

### 3. OpenSTEF — Utility-Grade Energy Forecasting

**What it does:** Complete AutoML pipeline for short-term energy forecasting. Developed by Alliander (Netherlands grid operator) and production-tested at scale. Handles the full ML workflow — from raw data to probabilistic forecast with uncertainty bands. Critical for grid operators scheduling balancing reserves.

**Integration with LATAM utilities:**
```
Smart meter data (AMI head-end system)
    +
Weather forecast API (INMET Brazil / DMC Chile)
    ↓
OpenSTEF AutoML pipeline
    → Feature engineering (lags, weather, calendar effects)
    → Model selection (XGBoost / LightGBM / linear boosting)
    → Probabilistic forecast (P10, P50, P90)
    ↓
Operational planning:
    ├── Grid operator: schedule reserves based on P90 forecast
    ├── Renewables: curtailment planning for overgeneration scenarios
    └── DER aggregator: coordinate demand response events
```

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
