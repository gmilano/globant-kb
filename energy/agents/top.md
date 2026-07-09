# Top AI Agents & Tools — Energy

> Open source AI agents and tools for the energy industry. Focus: MIT / Apache 2.0 / BSD.
> Last updated: 2026-07-09 (v2 — full rewrite)

## Top AI Agents & Tools

| Name | License | Stars | Description |
|------|---------|-------|-------------|
| [Grid2Op](https://github.com/Grid2op/grid2op) | LGPL-2.1 | 440★ | LF Energy testbed for sequential decision-making in power systems. RL environment for grid control (switching, topology), competition platform, compatible with stable-baselines3 and RLlib. Industry standard for grid RL research. |
| [PyPSA](https://github.com/PyPSA/PyPSA) | MIT | 2k★ | Power System Analysis Automation — network optimization (linear, nonlinear), capacity planning, OPF. Python-native. Used by Agora Energiewende, OpenEntrance, IEA scenarios. GPU-ready via gurobipy/GLPK. |
| [pandapower](https://github.com/e2nIEE/pandapower) | BSD-3 | 1.2k★ | Convenient power system modeling, analysis, and optimization for Python. AC/DC power flow, short-circuit, contingency analysis. Interfaces with PSS/E, PowerWorld. Standard in European DSO analytics. |
| [MyEMS](https://github.com/MyEMS/myems) | MIT | 900+★ | Full-stack open source Energy Management System (EMS) — electricity, water, gas, cooling/heating. ISO 50001 compliant. REST API, React dashboard, Docker/K8s. Supports AI optimization module, VPP, microgrids, EV charging. |
| [sinergym](https://github.com/ugr-sail/sinergym) | MIT | 231★ | Gym/Gymnasium environment for building simulation and RL-based control using EnergyPlus. Multi-agent, custom weather files, reward engineering. Perfect for HVAC/building energy optimization. |
| [VOLTTRON](https://github.com/VOLTTRON/volttron) | Apache-2.0 | 560★ | DOE/PNNL distributed platform for building-grid interaction. Pub/sub messaging, agent marketplace, IEEE 2030.5 / OpenADR / BACnet. Reference architecture for grid-edge AI. |
| [Carbon Aware SDK](https://github.com/Green-Software-Foundation/carbon-aware-sdk) | MIT | 1.5k★ | Green Software Foundation SDK for carbon-aware computing. REST + CLI interfaces to WattTime, ElectricityMaps, Energy Charts. Schedule workloads when grid is greenest. Used by GitHub Actions CI carbon-aware runners. |
| [OSeMOSYS](https://github.com/OSeMOSYS/OSeMOSYS) | Apache-2.0 | 220★ | Open Source energy Modelling System — long-term energy transition planning. Used by IEA, IRENA, 30+ countries for national energy strategies. TIMES-compatible. Python/GNU MathProg. |
| [rl-testbed-for-energyplus](https://github.com/IBM/rl-testbed-for-energyplus) | MIT | 217★ | IBM Research RL testbed for EnergyPlus-based HVAC optimization. OpenAI Gym interface, PPO/DDPG ready, proven 15-30% energy savings in building simulations. |
| [OpenG2G](https://github.com/gpu2grid/openg2g) | Apache-2.0 | New | arXiv:2605.05519 (May 2026) — simulation platform for AI datacenter-grid runtime coordination. Modular datacenter + grid backend, generic controller interface. ML.ENERGY Benchmark powered. Critical for AI-at-scale sustainability. |
| [energym](https://github.com/bsl546/energym) | MIT | 230★ | Building energy simulation environments for RL. Multi-zone buildings with EnergyPlus/Modelica backends. Weather API integration, standardized benchmark suite for building control. |
| [Grid-Agent](https://arxiv.org/abs/2508.05702) | Research | — | arXiv:2508.05702 — LLM-powered multi-agent system for autonomous power grid control. Detects and remediates violations via switch reconfiguration, BESS dispatch, load curtailment. Integrates semantic LLM reasoning with numerical power flow solvers. |

## Agents by Use Case

| Use Case | Best Agents |
|----------|-------------|
| **Grid RL optimization** | Grid2Op, pandapower, Grid-Agent |
| **Building HVAC control** | sinergym, rl-testbed-for-energyplus, energym |
| **Energy system planning** | PyPSA, OSeMOSYS |
| **EMS / monitoring** | MyEMS, VOLTTRON, OpenEMS |
| **Carbon-aware scheduling** | Carbon Aware SDK |
| **AI datacenter-grid** | OpenG2G |
| **LLM-based grid ops** | Grid-Agent, X-GridAgent, GridMind |

## License Summary for Globant Engagements

| License | Tools | Commercial Use |
|---------|-------|----------------|
| MIT | PyPSA, MyEMS, sinergym, Carbon Aware SDK, rl-testbed, energym | ✅ Full freedom |
| Apache-2.0 | VOLTTRON, OSeMOSYS, OpenG2G | ✅ Full freedom |
| BSD-3 | pandapower | ✅ Full freedom |
| LGPL-2.1 | Grid2Op | ⚠️ Dynamic linking ok; modifications must be open |

---
*Updated by Globant AI Studios ingestion pipeline.*
