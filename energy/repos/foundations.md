# Foundation Repositories — Energy AI

> Core open-source libraries, platforms, and tools for building AI energy solutions.
> Last updated: 2026-07-07

---

## Category 1: Power System Analysis & Optimization

### PyPSA — Python for Power System Analysis
- **Repo:** https://github.com/PyPSA/PyPSA
- **License:** MIT
- **Stars:** ~2,000
- **Stack:** Python, NumPy, pandas, scipy
- **What it does:** Open-source framework for optimizing and simulating modern power and energy systems. Supports conventional generators, variable renewables, storage, sector coupling, and linearized power flow. Developed by TU Berlin (Department of Digital Transformation in Energy Systems) and backed by the German Research Foundation.
- **AI integration:** Network topology as graph for GNN-based fault detection; optimal power flow output as training data for RL agents; scenario generation for grid planning.
- **Variants:** PyPSA-Eur (European power system model), PyPSA-Earth (global power system model — ideal for LATAM grid planning).

### pandapower — Power System Modelling and Analysis
- **Repo:** https://github.com/e2nIEE/pandapower
- **License:** BSD 3-Clause
- **Stars:** ~1,200
- **Stack:** Python, pandas, PYPOWER
- **What it does:** Automated network calculation tool for power system analysis and optimization. Uses pandas for data management; compatible with MATPOWER/PYPOWER formats. Supports load flow, short-circuit, optimal power flow, and state estimation. Joint development by University of Kassel and Fraunhofer IEE.
- **AI integration point:** Input data for PowerMCP simulations; benchmark test networks for ML model training; power flow results as RL state observations.

### oemof-solph — Energy System Optimization Modelling Framework
- **Repo:** https://github.com/oemof/oemof-solph
- **License:** MIT
- **Stars:** ~350
- **Stack:** Python, PuLP, CBC/Gurobi solvers
- **What it does:** Graph-based approach to energy system modeling and optimization. Supports multi-sector energy systems (electricity, heat, gas) across multiple periods. Used for long-term capacity planning and dispatch optimization in research and by energy agencies.
- **AI integration point:** Optimization output as training signal for ML-based heuristics; scenario generation for forecasting models.

---

## Category 2: Energy Management Systems (EMS)

### OpenEMS — Open Source Energy Management System
- **Repo:** https://github.com/OpenEMS/openems
- **License:** AGPL-3.0 (UI) / EPL-2.0 (Edge/Backend)
- **Stars:** ~1,400
- **Stack:** Java, TypeScript, HTML
- **What it does:** Modular IoT platform for energy management. Three components: **Edge** (on-site device control, fast PLC-like algorithms), **UI** (real-time web/mobile dashboard), **Backend** (cloud server, aggregation, monitoring). Integrates energy storage, renewables, EV chargers, heat pumps, and time-of-use tariffs. Operated by OpenEMS Association e.V. (utilities, hardware manufacturers, scientific institutions). Latest release: 2026.7.0.
- **LATAM angle:** Self-hostable on local servers — important where data sovereignty rules restrict cloud deployments (Brazil LGPD, regional energy regulations).
- **AI integration points:**
  - REST API exposes real-time meter readings → feed to anomaly detection agents
  - Device control commands → output for RL demand-response agents
  - Historical data export → train load forecasting models

### Emoncms — IoT Energy Monitoring
- **Repo:** https://github.com/emoncms/emoncms
- **License:** AGPL-3.0
- **Stars:** ~1,600
- **Stack:** PHP, MySQL, Redis
- **What it does:** Web-based IoT energy monitoring platform. Processes and stores time-series energy data from smart meters, solar PV, battery storage, and sensors. SCADA-grade for distributed solar and building energy monitoring. Used in low-cost open-source SCADA deployments for grid-connected PV systems.
- **AI integration point:** Data feed for solar generation forecasting models; real-time anomaly detection on energy consumption.

---

## Category 3: Demand Response & Reinforcement Learning

### CityLearn — Multi-Agent RL for Demand Response
- **Repo:** https://github.com/intelligent-environments-lab/CityLearn
- **License:** MIT
- **Stars:** 621
- **Stack:** Python, Farama Gymnasium
- **What it does:** RL environment for multi-agent building energy coordination and demand response in cities. Agents control HVAC systems, EV chargers, batteries, and electric heaters. Standardizes RL evaluation across algorithms. Backed by the Intelligent Environments Lab (Georgia Tech).
- **Production path:** Train RL policies in CityLearn → export to production building controllers → measure peak reduction in kW and cost savings in $.
- **Integration:** Works with Stable-Baselines3, RLlib, TF-Agents, CleanRL.

---

## Category 4: Forecasting

### OpenSTEF — Open Short-Term Energy Forecasting
- **Repo:** https://github.com/OpenSTEF/openstef
- **License:** Apache-2.0
- **Stars:** ~180
- **Stack:** Python, XGBoost, LightGBM, scikit-learn
- **What it does:** Complete AutoML pipeline for probabilistic short-term energy forecasting (24-48h horizon). Developed by Alliander (Netherlands' largest grid operator) and open-sourced. Handles data preprocessing, feature engineering (including weather), model training, evaluation, and retraining triggers. Returns probabilistic forecasts — critical for balancing reserves.
- **Deployment:** Alliander runs OpenSTEF in production across its distribution network. Grid-operator-grade reliability.

---

## Category 5: LLM × Power Systems

### PowerMCP — MCP Servers for Power Grid Software
- **Repo:** https://github.com/Power-Agent/PowerMCP
- **License:** MIT
- **Stars:** ~178
- **Stack:** Python, Model Context Protocol
- **What it does:** Universal adapter enabling LLMs (Claude, GPT-4, Gemini) to interact with power system applications via MCP. Supports PowerWorld, PSSE, PowerFactory, pandapower, PyPSA, OpenDSS, ANDES. Enables LLMs to run power flow calculations, fault analysis, and grid optimization through natural language. CLI wizard auto-configures Claude Desktop and Claude Code.
- **Key architecture insight:** Treats power system software as MCP tools — same pattern as giving Claude access to a filesystem or browser, now applied to a power grid simulator.

---

## Category 6: Building Energy Simulation

### EnergyPlus
- **Repo:** https://github.com/NREL/EnergyPlus
- **License:** BSD 3-Clause
- **Stars:** ~700
- **Stack:** C++, Python (EMS/API)
- **What it does:** Whole-building energy simulation engine from the US Department of Energy / NREL. Simulates HVAC, lighting, plug loads, solar/thermal systems. Used for building design, retrofit analysis, and RL agent training.
- **AI integration:** `rl-testbed-for-energyplus` (open source): RL agents control building systems inside EnergyPlus simulation — primary benchmark for building energy RL research.

---

## Dependency Map — Quick Start Stacks

```
## Stack A: Smart Grid AI Analytics
pandapower (power flow)  →  PowerMCP (LLM interface)  →  Claude (reasoning)
OpenSTEF (load forecast)  →  LangGraph (orchestration)  →  operator dashboard

## Stack B: Demand Response RL
CityLearn (RL env)  →  Stable-Baselines3 (training)  →  production BMS/EMS
OpenEMS (real-time data)  →  RL agent (action)  →  OpenEMS (device control)

## Stack C: Energy Management Platform
OpenEMS (IoT stack)  →  LangGraph agent layer  →  Claude (anomaly + advice)
Emoncms (metering data)  →  OpenSTEF (forecast)  →  EMS optimizer
```

---
*Auto-updated by the ingest pipeline.*
