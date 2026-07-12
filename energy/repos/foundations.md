# Foundational Repos — Energy

> Battle-tested open source bases to build on. Open license, active community.
> Last updated: 2026-07-12 (v4)

## Core Platforms & Frameworks

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [PyPSA/PyPSA](https://github.com/PyPSA/PyPSA) | MIT | ~2,100 | TU Berlin — Python for Power System Analysis. OPF, unit commitment, storage, multi-sector coupling (electricity + heat + H2). The standard open tool for national/continental energy system modeling. Pandas-based DataFrame interface makes it trivially wrappable with LLM agents. PyPSA User Meeting Jun 29 2026 — active community. | Yes — wrap OPF results with LLM explanation agent |
| [e2nIEE/pandapower](https://github.com/e2nIEE/pandapower) | BSD-3-Clause | ~1,200 | Fraunhofer IEE + Uni Kassel — Fast Newton-Raphson power flow, state estimation, short-circuit analysis, OPF. 500k+ PyPI downloads. PYPOWER-compatible, pandas-based. Ideal for distribution grid AI applications. | Yes — DataFrames expose grid topology directly to ML pipelines |
| [PowerGridModel/power-grid-model](https://github.com/PowerGridModel/power-grid-model) | MIT | ~228 (10M+ PyPI DL) | Alliander / LF Energy — High-performance Python/C++ library for steady-state distribution power system analysis. v1.13.12 Feb 2026. 7th meetup May 2026. Production at Alliander, Enexis, Stedin (three main Dutch DSOs). LF Energy Early Adoption. Enables batch simulation of millions of scenarios via numpy vectorization. | Yes — numpy batch interface ideal for scenario simulation and ML training data generation |
| [pybamm-team/PyBaMM](https://github.com/pybamm-team/PyBaMM) | BSD-3-Clause | ~1,600 | NumFOCUS — Fast, flexible physics-based battery modelling (Doyle-Fuller-Newman model). Critical for BESS state-of-health, degradation prediction, and BMS AI integration. Used by BMW, Northvolt, and national labs. | Yes — physics model + ML surrogate for real-time BMS AI |
| [VOLTTRON/volttron](https://github.com/VOLTTRON/volttron) | Apache-2.0 | ~495 | DOE / PNNL — Distributed sensing and control platform. Pub-sub message bus, SCADA/BMS driver framework, historian for time-series data. Native agent lifecycle management. v10 migrating to Eclipse Foundation. The foundational OS for building AI microservices on energy infrastructure. | Yes — native agent lifecycle + SCADA integration |
| [EVerest/everest-core](https://github.com/EVerest/everest-core) | Apache-2.0 | ~230 | PIONIX / LF Energy — Full-stack EV charging software. OCPP 1.6/2.0.1/2.1, ISO 15118, IEC 61851, hardware drivers. Most active community in LF Energy. C++ + Python. Production-deployed by EVSE manufacturers across EU/US. | Yes — AI charging optimization layer on top of OCPP stack |
| [OpenSTEF/openstef](https://github.com/OpenSTEF/openstef) | MPL-2.0 | ~380 | Alliander / LF Energy — AutoML pipelines for probabilistic short-term grid load forecasting (hours to 48h ahead). Weather data ingestion, MLflow tracking, production-grade. Used by a top-5 European DSO. New: OpenMeteo connector + MLflow integration 2026. | Yes — already ML-native; add LLM alert layer |
| [rte-france/Grid2Op](https://github.com/Grid2op/grid2op) | MPL-2.0 | ~450 | RTE France / LF Energy — Gymnasium-compatible testbed for RL-based power grid control. L2RPN 2026 challenge platform. Supports pandapower, lightsim2grid, and Powsybl backends. Essential for training autonomous grid control agents. | Yes — designed for AI agents; drop in any RL framework |
| [intelligent-environments-lab/CityLearn](https://github.com/intelligent-environments-lab/CityLearn) | MIT | ~622 | Georgia Tech — Farama Gymnasium RL environment for multi-agent building demand response at city scale. Models BESS, heat pumps, electric heaters, EVs. v2.5.0 released Oct 2025. ASHRAE + IECC compliant loads. | Yes — multi-agent RL out of the box; Stable Baselines 3 compatible |
| [PyPSA/pypsa-eur](https://github.com/PyPSA/pypsa-eur) | MIT | ~577 | TU Berlin — Sector-coupled open optimization model of the European energy system. Covers all ENTSO-E + transport, heating, industry, agriculture sectors. Reference tool cited in EU policy documents. Snakemake workflow. | Yes — generate scenarios with LLM agent; explain results in plain language |
| [gridfm/gridfm-datakit](https://github.com/gridfm/gridfm-datakit) | Apache-2.0 | ~127 | IBM / Hydro-Quebec / LF Energy — Synthetic dataset generator for training ML/foundation models on OPF and power flow. Handles grids up to 30k buses. MATPOWER format, topology perturbations, constraint violations. Essential for training grid foundation models. | Yes — feeds foundation model training pipelines |

## Harvard SEAS Power-Agent Ecosystem

The **Power-Agent** GitHub organization (backed by Harvard SEAS Power and AI Initiative) is the center of gravity for open-source LLM-powered power system tools. All repos under `github.com/Power-Agent` are MIT licensed.

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [Power-Agent/PowerMCP](https://github.com/Power-Agent/PowerMCP) | MIT | ~80 | MCP servers for PowerWorld, PSS/E, OpenDSS, PSCAD. Enables any MCP-compatible LLM to issue commands to industry-standard power simulators. Foundational interface layer for the whole ecosystem. |
| [Power-Agent/PowerSkills](https://github.com/Power-Agent/PowerSkills) | MIT | ~60 | Agent skills for power system analysis: domain knowledge, tool selection heuristics, mitigation playbooks. Layer on top of PowerMCP that makes agents production-ready without prompt engineering from scratch. |
| [Power-Agent/PowerWF](https://github.com/Power-Agent/PowerWF) | MIT | ~45 | Pre-built agentic workflows for power system operations: contingency analysis, N-1 studies, OPF, protection coordination. Composable workflow templates for LangGraph or CrewAI orchestration. |
| [Power-Agent/PowerFM](https://github.com/Power-Agent/PowerFM) | MIT | ~55 | Hub for power domain foundation models: GridLDM (latent diffusion for grid time series), OpenPowerBench, mAIEnergy (50k docs + 25M TS for LLM pre-training). |
| [Power-Agent/PowerAgentBench](https://github.com/Power-Agent) | MIT | — | Benchmark for evaluating power system agents on complex multi-step operational tasks. Standardized for fair, reproducible comparison across agent designs. |

## Power Grid Model Ecosystem (NEW in v4)

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [PowerGridModel/power-grid-model](https://github.com/PowerGridModel/power-grid-model) | MIT | ~228 | Core library: Python/C++ high-performance distribution power system analysis. Newton-Raphson, iterative linear, batch calculation. The fastest open source distribution grid solver. |
| [PowerGridModel/power-grid-model-ds](https://github.com/PowerGridModel/power-grid-model-ds) | MIT | ~40 | Data Science toolkit: high-level Pythonic modeling interface. Graph algorithms (rustworkx), network mutation modeling for simulation, visualization. Best entry point for AI/ML integrations. |
| [PowerGridModel/power-grid-model-io](https://github.com/PowerGridModel/power-grid-model-io) | MIT | ~30 | Format conversion: IEC CIM, CGMES, Vision CSV, Pandapower → Power Grid Model format. Bridge from utility data systems to the calculation engine. |

## Supporting Libraries

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [ugr-sail/sinergym](https://github.com/ugr-sail/sinergym) | MIT | ~240 | Universidad de Granada — Gymnasium + EnergyPlus building RL. Multi-zone buildings, EnergyPlus 24 support, custom weather, real-time monitoring. |
| [alliander-opensource/s4casting](https://github.com/alliander-opensource/s4casting) | Apache-2.0 | ~120 | Alliander — Time series foundation models tuned for energy (demand, solar, wind). Zero-shot on new substations. |
| [ADGEfficiency/energy-py](https://github.com/ADGEfficiency/energy-py) | MIT | ~430 | RL environments for battery dispatch and energy arbitrage. Gymnasium compatible. |
| [tsinghua-fib-lab/EnergyAgent](https://github.com/tsinghua-fib-lab/EnergyAgent) | MIT | ~150 | Tsinghua University — LLM Agent Framework for electric power time series modeling and reasoning. Bridges LLMs and power domain data. |
| [RedaElMakroum/agentic-ai-hems](https://github.com/RedaElMakroum/agentic-ai-hems) | MIT | ~80 | Agentic AI HEMS — multi-specialist-agent architecture for home/C&I energy management. ReAct reasoning chains, provider-agnostic LLM support. |
| [OpenEnergyPlatform/awesome-sustainable-technology](https://github.com/OpenEnergyPlatform/awesome-sustainable-technology) | CC0 | ~1,000 | Community-curated list of all open source energy and climate tools. Best starting map of the ecosystem. |
| [emarche/RL2Grid](https://github.com/emarche/RL2Grid) | MIT | ~90 | Standardized RL benchmark for Grid2Op environments; ICLR 2026 workshop paper. |
| [AI4Electricity/Awesome-AI-for-Electricity](https://github.com/AI4Electricity/Awesome-AI-for-Electricity) | CC | — | Community-curated list of AI research papers and repos for the electricity domain. Best resource for staying current. |
| [chenweilong915/awesome_energy_LLM](https://github.com/chenweilong915/awesome_energy_LLM) | CC | — | Curated collection of energy papers using LLMs — covers forecasting, fault detection, grid optimization, agent control. Research discovery resource. |

---
*See also: `verticals/solutions.md` for full-stack vertical platforms.*
