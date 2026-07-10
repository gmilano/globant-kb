# Top AI Agents & Tools — Energy

> Open source AI agents and tools for the energy industry. Focus: MIT / Apache 2.0 / BSD.
> Last updated: 2026-07-10 (v3 — PowerAgent ecosystem + VPP-Sim + LLM contracts)

## Top AI Agents & Tools

| Name | License | Stars | Description |
|------|---------|-------|-------------|
| [Grid2Op](https://github.com/Grid2op/grid2op) | LGPL-2.1 | 440★ | LF Energy testbed for sequential decision-making in power systems. RL environment for grid control (switching, topology, redispatch), competition platform (L2RPN). Compatible with stable-baselines3, RLlib, Ray. Industry standard for grid RL research. |
| [PyPSA](https://github.com/PyPSA/PyPSA) | MIT | 2k★ | Power System Analysis Automation — network optimization (linear, nonlinear), capacity planning, OPF. Python-native. Used by Agora Energiewende, OpenEntrance, IEA scenarios. GPU-ready via gurobipy/GLPK. |
| [pandapower](https://github.com/e2nIEE/pandapower) | BSD-3 | 1.2k★ | Convenient power system modeling, analysis, and optimization for Python. AC/DC power flow, short-circuit, contingency analysis. Interfaces with PSS/E, PowerWorld. Standard in European DSO analytics. |
| [MyEMS](https://github.com/MyEMS/myems) | MIT | 900+★ | Full-stack open source Energy Management System (EMS) — electricity, water, gas, cooling/heating. ISO 50001 compliant. REST API, React dashboard, Docker/K8s. Supports AI optimization module, VPP, microgrids, EV charging. |
| [sinergym](https://github.com/ugr-sail/sinergym) | MIT | 231★ | Gym/Gymnasium environment for building simulation and RL-based control using EnergyPlus. Multi-agent, custom weather files, reward engineering. Perfect for HVAC/building energy optimization. |
| [VOLTTRON](https://github.com/VOLTTRON/volttron) | Apache-2.0 | 560★ | DOE/PNNL distributed platform for building-grid interaction. Pub/sub messaging, agent marketplace, IEEE 2030.5 / OpenADR / BACnet. Reference architecture for grid-edge AI. |
| [Carbon Aware SDK](https://github.com/Green-Software-Foundation/carbon-aware-sdk) | MIT | 1.5k★ | Green Software Foundation SDK for carbon-aware computing. REST + CLI interfaces to WattTime, ElectricityMaps, Energy Charts. Schedule workloads when grid is greenest. Used by GitHub Actions CI carbon-aware runners. |
| [OSeMOSYS](https://github.com/OSeMOSYS/OSeMOSYS) | Apache-2.0 | 220★ | Open Source energy Modelling System — long-term energy transition planning. Used by IEA, IRENA, 30+ countries for national energy strategies. TIMES-compatible. Python/GNU MathProg. |
| [PowerMCP](https://github.com/Power-Agent/PowerMCP) | Apache-2.0 | 160★ | Harvard SEAS — MCP servers for power system software (PowerWorld, PSSE, OpenDSS). Enables LLMs to directly interact with power system simulators. Enables Claude/GPT-4 to run contingency analysis, OPF, and fault detection via natural language. Part of PowerAgent community. |
| [PowerFM](https://github.com/Power-Agent/PowerFM) | Apache-2.0 | 43★ | Harvard SEAS — Foundation models repository for the power and energy domain. Fine-tuned and domain-trained models for load forecasting, fault detection, grid simulation, and agent control. Collects community-contributed energy foundation models. |
| [PowerWF](https://github.com/Power-Agent/PowerWF) | Apache-2.0 | New | Harvard SEAS — Agentic workflows for power system applications. Pre-built workflows for interconnection studies (5x speedup), contingency screening, capacity expansion analysis. Works with PowerMCP + Claude/GPT-4. |
| [agentic-ai-hems](https://github.com/RedaElMakroum/agentic-ai-hems) | MIT | New | Agentic AI Home Energy Management System. LLM Framework for Residential Load Scheduling. Autonomous orchestration with specialist agents, real-time electricity price optimization, transparent reasoning chains, multi-appliance coordination. |
| [EnergyAgent](https://github.com/tsinghua-fib-lab/EnergyAgent) | MIT | New | LLM Agent Framework for Electric Power Time Series Modeling and Reasoning (Tsinghua University). Handles load forecasting, demand response, anomaly detection with LLM-native reasoning over temporal energy data. |
| [LLM-Electricity-Contracts](https://github.com/TU-Delft-AI-Energy-Lab/LLM-Electricity-Contracts) | MIT | New | TU Delft — Automating customised electricity contracts using LLMs. Integrations with power-system studies, feasibility checks, contract negotiation workflows. Published IEEE Transactions on Power Systems 2026. |
| [OpenG2G](https://github.com/gpu2grid/openg2g) | Apache-2.0 | New | arXiv:2605.05519 (May 2026) — simulation platform for AI datacenter-grid runtime coordination. Modular datacenter + grid backend, generic controller interface. ML.ENERGY Benchmark powered. Critical for AI-at-scale sustainability. |
| [VPP-Sim](https://github.com/vpp-sim/vpp-sim) | MIT | New | Modular open-source framework for developing and deploying ML-driven strategies in Virtual Power Plants. Battery management interface, market bidding optimization, multi-DER aggregation. IEEE paper 2026. |
| [rl-testbed-for-energyplus](https://github.com/IBM/rl-testbed-for-energyplus) | MIT | 217★ | IBM Research RL testbed for EnergyPlus-based HVAC optimization. OpenAI Gym interface, PPO/DDPG ready, proven 15-30% energy savings in building simulations. |
| [GenX](https://github.com/GenXProject/GenX) | MIT | 500+★ | MIT/Princeton open-source capacity expansion model for power system investment analysis. Used for VPP and energy transition scenario planning. High-performance Julia implementation with multi-stage, multi-zone modeling. |

## Agents by Use Case

| Use Case | Best Agents |
|----------|-------------|
| **Grid RL optimization** | Grid2Op, pandapower, PowerMCP |
| **LLM power system ops** | PowerMCP, PowerWF, PowerFM, EnergyAgent |
| **Building HVAC control** | sinergym, rl-testbed-for-energyplus |
| **Energy system planning** | PyPSA, OSeMOSYS, GenX |
| **EMS / monitoring** | MyEMS, VOLTTRON, OpenEMS |
| **Carbon-aware scheduling** | Carbon Aware SDK |
| **AI datacenter-grid** | OpenG2G |
| **Virtual Power Plant** | VPP-Sim, VOLTTRON |
| **Home / residential** | agentic-ai-hems |
| **Electricity contracts** | LLM-Electricity-Contracts |

## License Summary for Globant Engagements

| License | Tools | Commercial Use |
|---------|-------|----------------|
| MIT | PyPSA, MyEMS, sinergym, Carbon Aware SDK, rl-testbed, GenX, agentic-ai-hems, EnergyAgent, LLM-Electricity-Contracts, VPP-Sim | ✅ Full freedom |
| Apache-2.0 | VOLTTRON, OSeMOSYS, OpenG2G, PowerMCP, PowerFM, PowerWF | ✅ Full freedom |
| BSD-3 | pandapower | ✅ Full freedom |
| LGPL-2.1 | Grid2Op | ⚠️ Dynamic linking ok; modifications must be open |

## Consortium Signal: Open Power AI (EPRI + NVIDIA)

EPRI and NVIDIA launched the **Open Power AI Consortium** (GTC March 2025, production 2026) with Articul8:
- Building domain-specific multimodal LLMs trained on EPRI's massive library of proprietary energy/electrical engineering data
- Developed using hundreds of NVIDIA H100 GPUs; available as NVIDIA NIM microservice (early access)
- Target: 5x speedup for interconnection studies (currently 2-4 year process)
- Members: energy companies, tech companies, researchers tackling grid AI challenges
- **Globant implication**: PowerMCP + Claude + EPRI Open Power LLM is the enterprise-grade pattern for utility engagements

---
*Updated by Globant AI Studios ingestion pipeline.*
