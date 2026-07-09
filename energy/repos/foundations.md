# Foundational Repos — Energy

> Core open source foundations for building AI-powered energy solutions.
> License filter: MIT / Apache-2.0 / BSD only (Globant-buildable).
> Last updated: 2026-07-09 (v2)

## Core Simulation & Optimization

| Repo | License | Stars | Description | AI Use |
|------|---------|-------|-------------|--------|
| [PyPSA/PyPSA](https://github.com/PyPSA/PyPSA) | MIT | 2k★ | Power System Analysis Automation: network optimization, capacity expansion, OPF. Python-native, GLPK/Gurobi/Cbc solvers. | OPF agent actions, planning scenarios, LLM-driven capacity expansion |
| [e2nIEE/pandapower](https://github.com/e2nIEE/pandapower) | BSD-3 | 1.2k★ | Electrical power systems analysis library — AC/DC power flow, short-circuit, contingency, grid equivalents. | Simulation backend for Grid-Agent and X-GridAgent patterns |
| [Grid2op/grid2op](https://github.com/Grid2op/grid2op) | LGPL-2.1 | 440★ | LF Energy sequential decision-making testbed for power grids. RL competition platform, gym-compatible. | RL training environment; foundation for grid control agents |
| [OSeMOSYS/OSeMOSYS](https://github.com/OSeMOSYS/OSeMOSYS) | Apache-2.0 | 220★ | Open Source energy Modelling System — long-term energy transition planning. Used by IEA, IRENA, African Development Bank. | AI scenario generation, LLM-driven what-if analysis |
| [google-research/timesfm](https://github.com/google-research/timesfm) | Apache-2.0 | 6k★ | Google TimesFM 2.5 — foundation model for time-series forecasting. NextEra Energy uses it for renewable generation prediction. | Zero-shot energy demand/generation/price forecasting |

## Reinforcement Learning for Energy

| Repo | License | Stars | Description | AI Use |
|------|---------|-------|-------------|--------|
| [ugr-sail/sinergym](https://github.com/ugr-sail/sinergym) | MIT | 231★ | Gymnasium environment for EnergyPlus-based building simulation. Multi-zone, multi-agent, custom weather, reward engineering. | HVAC agent training, energy-cost reward optimization |
| [IBM/rl-testbed-for-energyplus](https://github.com/IBM/rl-testbed-for-energyplus) | MIT | 217★ | IBM Research RL testbed using EnergyPlus. PPO/DDPG baseline, 15-30% energy reduction demonstrated in simulations. | Building energy optimization baseline |
| [bsl546/energym](https://github.com/bsl546/energym) | MIT | 230★ | Building energy simulation RL environments with EnergyPlus/Modelica backends. Standardized benchmarks. | Multi-building RL comparison baseline |
| [gpu2grid/openg2g](https://github.com/gpu2grid/openg2g) | Apache-2.0 | New | AI datacenter-grid coordination platform (arXiv:2605.05519). | Schedule GPU workloads to minimize grid impact |

## Grid Integration & Communication

| Repo | License | Stars | Description | AI Use |
|------|---------|-------|-------------|--------|
| [VOLTTRON/volttron](https://github.com/VOLTTRON/volttron) | Apache-2.0 | 560★ | DOE/PNNL distributed platform: pub/sub, OpenADR 2.0, BACnet, Modbus. Grid-edge reference architecture. | Agent host for demand response and grid-edge control |
| [Green-Software-Foundation/carbon-aware-sdk](https://github.com/Green-Software-Foundation/carbon-aware-sdk) | MIT | 1.5k★ | REST + CLI to WattTime, ElectricityMaps, Energy Charts. Schedule compute when grid is greenest. | Carbon-aware workload scheduling |
| [OpenEMS/openems](https://github.com/OpenEMS/openems) | Apache-2.0 | 500★ | OpenEMS Edge (on-site), Backend (cloud), UI (React). Monthly releases 2026.x. | Wrap OSGi components with AI controllers |

## Curated Resource Lists

| Repo | License | Value |
|------|---------|-------|
| [ps-wiki/best-of-ps](https://github.com/ps-wiki/best-of-ps) | MIT | Weekly-ranked open source power system libraries |
| [AI4Electricity/Awesome-AI-for-Electricity](https://github.com/AI4Electricity/Awesome-AI-for-Electricity) | MIT | Curated papers/tools/datasets for AI in electricity |
| [OpenEnergyPlatform/awesome-sustainable-technology](https://github.com/OpenEnergyPlatform/awesome-sustainable-technology) | MIT | Comprehensive sustainability tools including wind, solar, storage, demand, planning |

## Layered Architecture

```
Simulation:    PyPSA / pandapower / Grid2Op / sinergym
Planning:      OSeMOSYS / TimesFM (forecasting)
Communication: VOLTTRON / OpenEMS / Carbon Aware SDK
AI Agent:      Grid-Agent / X-GridAgent / PowerDAG
Product:       MyEMS / OpenRemote / custom (Globant build)
```

---
*See also: `verticals/solutions.md` for full platforms to fork.*
