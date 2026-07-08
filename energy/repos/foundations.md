# Foundation Repositories — Energy AI

> Core open-source libraries, platforms, and tools for building AI energy solutions.
> Last updated: 2026-07-08 (v3)

---

## Category 1: Power System Analysis & Optimization

### PyPSA — Python for Power System Analysis
- **Repo:** https://github.com/PyPSA/PyPSA
- **License:** MIT
- **Stars:** ~2,000
- **Stack:** Python, NumPy, pandas, scipy, linopy
- **What it does:** Open-source framework for optimizing and simulating modern power and energy systems. Supports conventional generators, variable renewables, storage, sector coupling, transmission constraints, and linearized power flow (DC and AC). Developed by TU Berlin (Department of Digital Transformation in Energy Systems) and backed by German Research Foundation.
- **AI integration:** Network topology as graph for GNN-based fault detection; optimal power flow output as training data for RL agents; scenario generation for grid planning; PowerMCP wraps PyPSA as MCP tools for LLM access.
- **Variants:**
  - `PyPSA-Eur` — European power system model
  - `pypsa-meets-earth/pypsa-earth` — global power system model for LATAM grid planning
  - `PyPSA/pypsa-usa` — US energy system optimization model

### pandapower — Power System Modelling and Analysis
- **Repo:** https://github.com/e2nIEE/pandapower
- **License:** BSD 3-Clause
- **Stars:** ~1,200
- **Stack:** Python, pandas, PYPOWER, igraph
- **What it does:** Automated network calculation tool for power system analysis and optimization. Uses pandas for data management; compatible with MATPOWER/PYPOWER formats. Supports load flow, short-circuit, optimal power flow, state estimation, and topology analysis. Joint development by University of Kassel and Fraunhofer IEE.
- **AI integration point:** Core input for PowerMCP simulations; benchmark test networks for ML model training; power flow results as RL state observations in Grid2Op.

### oemof-solph — Energy System Optimization Modelling Framework
- **Repo:** https://github.com/oemof/oemof-solph
- **License:** MIT
- **Stars:** ~350
- **Stack:** Python, PuLP, CBC/Gurobi solvers
- **What it does:** Graph-based approach to energy system modeling and LP/MILP optimization. Supports multi-sector energy systems (electricity, heat, gas) across multiple periods. Used for long-term capacity planning and dispatch optimization in research and by energy agencies in Europe.
- **AI integration point:** Optimization output as training signal for ML-based dispatch heuristics; scenario generation for energy forecasting models.

---

## Category 2: Reinforcement Learning for Grid Operations

### Grid2Op — Sequential Decision Making in Power Systems
- **Repo:** https://github.com/Grid2op/grid2op
- **License:** MPL v2.0 (all Grid2op org repos)
- **Stars:** ~700
- **Stack:** Python, gym/gymnasium interface
- **What it does:** Powerful and versatile open-source framework by RTE France (French TSO) for modeling sequential decision-making in power systems. Supports RL algorithms, heuristics, optimization strategies, and hybrid techniques. Includes realistic constraints: thermal limits, N-1 security, reconnection times, opponent models.
- **Benchmark:** RL2Grid (arXiv:2503.23101, 2026) established Grid2Op as the standard benchmark for evaluating RL agents in power grid operations. Standardized tasks enable fair comparison across agent designs.
- **AI integration:** Train RL grid operators → export policies → pilot with actual distribution grid operators. GridPath and grid2viz companion tools for visualization and analysis.

### CityLearn — Multi-Agent RL for Demand Response
- **Repo:** https://github.com/intelligent-environments-lab/CityLearn
- **License:** MIT
- **Stars:** 621
- **Stack:** Python, Farama Gymnasium
- **What it does:** RL environment for multi-agent building energy coordination and demand response in cities. Agents control HVAC systems, EV chargers, batteries, and electric heaters. Standardizes RL evaluation across algorithms. Backed by Intelligent Environments Lab (Georgia Tech).
- **Production path:** Train RL policies in CityLearn → export ONNX model → deploy to production building controllers → measure peak reduction and cost savings.
- **Integration:** Works with Stable-Baselines3, RLlib, TF-Agents, CleanRL.

### energy-py — RL for Energy Systems
- **Repo:** https://github.com/ADGEfficiency/energy-py
- **License:** MIT
- **Stack:** Python, gym
- **What it does:** Lightweight reinforcement learning framework for energy systems. Focused on building energy management and demand response experiments. Good starting point before scaling to production-grade CityLearn or Grid2Op.

---

## Category 3: Energy Management Systems (EMS)

### OpenEMS — Open Source Energy Management System
- **Repo:** https://github.com/OpenEMS/openems
- **License:** AGPL-3.0 (UI) / EPL-2.0 (Edge/Backend)
- **Stars:** ~1,400
- **Stack:** Java, TypeScript, HTML, REST/WebSocket
- **What it does:** Modular IoT platform for energy management. Three components: **Edge** (on-site device control, fast PLC-like algorithms, 15-min cycle), **UI** (real-time web/mobile dashboard), **Backend** (cloud server, aggregation, monitoring). Integrates energy storage, renewables, EV chargers, heat pumps, and time-of-use tariffs. Operated by OpenEMS Association e.V. Latest release: 2026.7.0 (July 2026, 138 releases total).
- **LATAM angle:** Self-hostable on local servers — important for data sovereignty (Brazil LGPD, ANPD regulations on grid operational data).
- **AI integration points:**
  - REST API exposes real-time meter readings → feed to anomaly detection agents
  - Device control commands → output for RL demand-response agents
  - Historical data export → train load forecasting models with OpenSTEF

### Emoncms — IoT Energy Monitoring
- **Repo:** https://github.com/emoncms/emoncms
- **License:** AGPL-3.0
- **Stars:** ~1,600
- **Stack:** PHP, MySQL, Redis
- **What it does:** Web-based IoT energy monitoring platform. Processes and stores time-series energy data from smart meters, solar PV, battery storage, and sensors. SCADA-grade for distributed solar and building energy monitoring. Used in low-cost SCADA deployments for grid-connected PV systems.
- **AI integration point:** Data feed for solar generation forecasting models; real-time anomaly detection on energy consumption patterns.

---

## Category 4: Energy Forecasting

### OpenSTEF — Open Short-Term Energy Forecasting
- **Repo:** https://github.com/OpenSTEF/openstef
- **License:** Apache-2.0 (LF Energy project)
- **Stars:** ~180
- **Stack:** Python, XGBoost, LightGBM, scikit-learn, pandas
- **What it does:** Complete AutoML pipeline for probabilistic short-term energy forecasting (24-48h horizon). Developed by Alliander (Netherlands' largest grid operator) and open-sourced. Handles data preprocessing, feature engineering (including weather), model training, evaluation, and retraining triggers. Returns probabilistic P10/P50/P90 forecasts — critical for balancing reserves.
- **Deployment:** Alliander runs OpenSTEF in production across its Dutch distribution network. Grid-operator-grade reliability. Expanding to German, Belgian, and LATAM utilities in 2026.

---

## Category 5: LLM × Power Systems

### PowerMCP — MCP Servers for Power Grid Software
- **Repo:** https://github.com/Power-Agent/PowerMCP
- **License:** MIT
- **Stars:** ~178
- **Stack:** Python, Model Context Protocol, pandapower, PyPSA, PowerIO
- **What it does:** Universal adapter enabling LLMs (Claude, GPT-4, Gemini) to interact with power system applications via MCP. Supports PowerWorld, PSSE, PowerFactory, pandapower, PyPSA, OpenDSS, PSCAD, ANDES. Enables LLMs to run power flow calculations, fault analysis, and grid optimization through natural language. CLI wizard auto-configures Claude Desktop and Claude Code.
- **Key architecture insight:** Treats power system software as MCP tools — same pattern as giving Claude access to a filesystem or browser, now applied to a power grid simulator.

---

## Category 6: Building Energy Simulation

### EnergyPlus — Whole Building Energy Simulation
- **Repo:** https://github.com/NREL/EnergyPlus
- **License:** BSD 3-Clause
- **Stars:** ~700
- **Stack:** C++, Python (EMS/API/EMS Python)
- **What it does:** Whole-building energy simulation engine from US Department of Energy / NREL. Simulates HVAC, lighting, plug loads, solar/thermal systems. Used for building design, retrofit analysis, and RL agent training environments.
- **AI integration:** `rl-testbed-for-energyplus` (open source): RL agents control building systems inside EnergyPlus simulation — primary benchmark for building energy RL research alongside CityLearn.

---

## Category 7: Data & Benchmarks

### awesome-energy-models — Python Energy Model Catalogue
- **Repo:** https://github.com/rebase-energy/awesome-energy-models
- **License:** Open source
- **What it does:** Catalogue and categorization of open-source, Python-based energy models covering capacity planning, dispatch optimization, demand forecasting, and renewable integration. Maintained by rebase.energy community.

### awesome-sustainable-technology — Open Sustainability Index
- **Repo:** https://github.com/OpenEnergyPlatform/awesome-sustainable-technology
- **License:** Open source
- **What it does:** Curated list of open development environments for preserving global energy supply and natural resources. Indexes tools across solar/wind/hydro/storage/grid/efficiency. Companion to opensustain.tech.

### best-of-ps — Weekly Power Systems Rankings
- **Repo:** https://github.com/jinningwang/best-of-ps
- **License:** Open source
- **What it does:** Weekly updated ranked list of popular open-source libraries and tools for power system analysis. Maps the power systems OSS ecosystem with star counts and activity signals.

---

## Category 8: Agentic AI Research (2026)

### PowerDAG — Adaptive Retrieval + JIT Supervision for Grid Analysis
- **Paper:** arXiv:2603.17418 (March 2026)
- **License:** Open source (Power-Agent ecosystem)
- **Stack:** Python, pandapower/PyPSA (via PowerMCP), LLM (Claude/GPT/open-source)
- **What it does:** Agentic AI system for automating distribution grid analysis with two reliability mechanisms:
  - **Adaptive retrieval**: similarity-decay cutoff algorithm selects only the most relevant annotated examples as context — prevents irrelevant exemplars from degrading agent performance
  - **Just-in-time (JIT) supervision**: actively intercepts and corrects tool-usage violations during execution — catches errors before they propagate
- **Performance:** 100% success on GPT-5.2; 94.4–96.7% with smaller open-source models; outperforms ReAct/LangChain/CrewAI by 6–50 pp
- **AI integration:** The JIT supervision pattern is extractable — applicable to any agentic system that calls external tools (not just power engineering). For Globant: pattern for reliable agentic workflows in regulated industries (energy, healthcare, financial)

### PowerChain — Verifiable Agentic Grid Workflows
- **Paper:** arXiv:2508.17094 (2026)
- **License:** Open source (Power-Agent ecosystem)
- **What it does:** Extends PowerDAG with verifiability — full audit trail of tool calls, parameters, and intermediate results for each distribution grid analysis workflow. Enables regulatory-grade AI: ANEEL (Brazil) and CNE (Chile) mandate explainable AI for grid-affecting decisions.
- **Key design principle:** Every tool call is logged with input/output — the agent cannot take a grid action without the step being traceable. This is the foundation for regulatory approval of AI in grid operations.

### Power Systems Agent Benchmark (PSAB)
- **Paper:** arXiv:2606.20950 (June 2026)
- **License:** Open source
- **What it does:** First standardized executable benchmark for evaluating AI agents on comprehensive electric power engineering tasks. Agents actually run simulations; evaluated on engineering correctness, not text quality.
- **Why foundational:** Benchmark maturity = accelerating adoption cycle. PSAB will drive investment toward agents that score highest (PowerDAG, PowerMCP) and become the standard procurement criterion for utilities evaluating AI vendors by 2027.

---

## Dependency Map — Quick Start Stacks

```
## Stack A: Smart Grid AI Analytics
pandapower (power flow) → PowerMCP (LLM interface) → Claude (reasoning)
OpenSTEF (load forecast) → LangGraph (orchestration) → operator dashboard

## Stack B: Demand Response RL
CityLearn (RL env) → Stable-Baselines3 (training) → production BMS/EMS
OpenEMS (real-time data) → RL agent (action) → OpenEMS (device control)

## Stack C: Grid Operations RL (research → production)
Grid2Op (simulation) → RL agent training → RL2Grid benchmark → PSAB evaluation → TSO/ISO pilot

## Stack D: Energy Management Platform
OpenEMS (IoT stack) → LangGraph agent layer → Claude (anomaly + advice)
Emoncms (metering data) → OpenSTEF (forecast) → EMS optimizer

## Stack E: LLM Grid Planning
PyPSA-Earth (grid model) → PowerMCP (MCP tools) → Claude (scenario analysis)

## Stack F: Agentic Distribution Grid Analysis (PowerDAG pattern)
pandapower (simulation) → PowerMCP (MCP) → PowerDAG (adaptive retrieval + JIT) → Claude → PowerChain (audit log) → ANEEL/CNE compliant report

## Stack G: Chile Curtailment Minimization
OpenSTEF (solar forecast + DMC Chile weather) → CityLearn RL (battery dispatch) → CEN API (market signals) → Claude (strategy) → SCADA commands
```

---
*Auto-updated by the ingest pipeline.*
