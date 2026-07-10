# Foundational Repos — Energy AI

> Base platforms to build on. Open license, active community.
> Last updated: 2026-07-10 (v3)

## Power System Simulation & Analysis

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [Grid2Op](https://github.com/Grid2op/grid2op) | LGPL-2.1 | 440★ | LF Energy testbed for sequential decision-making in power systems. Industry-standard RL environment for grid control. Competition platform (L2RPN). Compatible with stable-baselines3, RLlib. | ✅ Native RL env |
| [PyPSA](https://github.com/PyPSA/PyPSA) | MIT | 2k★ | Power System Analysis Automation. Network optimization (LP, MILP, NLOP), capacity planning, OPF. Python-native. IEA/Agora used for national energy scenarios. GPU-ready. | ✅ Optimization target |
| [pandapower](https://github.com/e2nIEE/pandapower) | BSD-3 | 1.2k★ | Power system modeling and analysis. AC/DC power flow, short-circuit, contingency. PSS/E and PowerWorld interface. European DSO standard. Backbone of PowerMCP. | ✅ Solver backend |
| [OSeMOSYS](https://github.com/OSeMOSYS/OSeMOSYS) | Apache-2.0 | 220★ | Open Source energy Modelling System for long-term planning. IEA, IRENA, 30+ country energy strategies. Python/GNU MathProg. TIMES-compatible. | ✅ Scenario agent input |
| [GenX](https://github.com/GenXProject/GenX) | MIT | 500+★ | MIT/Princeton capacity expansion model. Multi-stage, multi-zone, multi-technology. Julia-based (high performance). Gold standard for VPP and energy transition investment analysis. | ✅ VPP planning |

## Energy Management Systems (EMS)

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [MyEMS](https://github.com/MyEMS/myems) | MIT | 900+★ | Full-stack EMS — electricity, water, gas, cooling/heating. ISO 50001, REST API, React dashboard, Docker/K8s. Optional AI optimization, VPP, microgrids, EV charging modules. | ✅ REST API + AI module |
| [OpenEMS](https://github.com/OpenEMS/openems) | Apache-2.0 | 600+★ | Modular Java-based EMS for real-time control. Sector coupling: BESS, heat pumps, EV, solar. IEC 61850, OPC-UA, Modbus, MQTT, BACnet. 2-3 updates/month; carbon accounting added 2026. | ✅ Protocol bridge |
| [OpenRemote](https://github.com/openremote/openremote) | AGPL-3.0 | 1.8k★ | 100% open source IoT platform for energy management, smart microgrids, DER networks. MCP-native (2026). API-first, Docker. Best for edge+cloud hybrid architectures. | ✅ MCP native |
| [VOLTTRON](https://github.com/VOLTTRON/volttron) | Apache-2.0 | 560★ | DOE/PNNL distributed platform for building-grid interaction. Pub/sub messaging, agent marketplace, IEEE 2030.5, OpenADR, BACnet. Reference architecture for grid-edge AI agents. | ✅ Agent marketplace |

## Building & HVAC Optimization

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [sinergym](https://github.com/ugr-sail/sinergym) | MIT | 231★ | Gymnasium environment for building RL using EnergyPlus. Multi-agent, custom weather, reward engineering. HVAC and building energy optimization. | ✅ Gym env |
| [rl-testbed-for-energyplus](https://github.com/IBM/rl-testbed-for-energyplus) | MIT | 217★ | IBM Research RL testbed for EnergyPlus HVAC optimization. PPO/DDPG ready, proven 15-30% energy savings. | ✅ Gym env |
| [energym](https://github.com/bsl546/energym) | MIT | 230★ | Building energy simulation for RL. Multi-zone buildings, EnergyPlus/Modelica backends, weather API, benchmark suite. | ✅ Gym env |

## Carbon & Sustainability

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [Carbon Aware SDK](https://github.com/Green-Software-Foundation/carbon-aware-sdk) | MIT | 1.5k★ | Green Software Foundation SDK. REST + CLI to WattTime, ElectricityMaps, Energy Charts. Schedule workloads at grid-greenest times. GitHub Actions integration. | ✅ API-first |

## LLM-Native Energy Agents (2025-2026)

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [PowerMCP](https://github.com/Power-Agent/PowerMCP) | Apache-2.0 | 160★ | Harvard SEAS — MCP servers for PowerWorld, PSSE, OpenDSS. LLM-native tool use for power system simulators. | ✅ MCP-native |
| [PowerFM](https://github.com/Power-Agent/PowerFM) | Apache-2.0 | 43★ | Foundation models for power/energy domain. Load forecast, fault detection, grid simulation, agent control. | ✅ Fine-tuned models |
| [EnergyAgent](https://github.com/tsinghua-fib-lab/EnergyAgent) | MIT | New | Tsinghua — LLM framework for electric power time series reasoning. Load forecasting, demand response, anomaly detection. | ✅ LLM-native |
| [VPP-Sim](https://github.com/vpp-sim/vpp-sim) | MIT | New | Modular ML framework for VPP strategy development. Battery management, market bidding, multi-DER aggregation. | ✅ ML-first |

---

## Integration Architecture

```
[Data Layer]          [Simulation/Analysis]    [AI Layer]           [UI/API]
TimescaleDB      →    Grid2Op / PyPSA      →   LangGraph agents →   FastAPI
Smart meters     →    pandapower OPF       →   Claude Sonnet 5  →   React dashboard
MyEMS REST       →    sinergym HVAC RL     →   PowerMCP tools   →   Operator copilot
VOLTTRON pub/sub →    VPP-Sim dispatch     →   VPP agent        →   Market bidding UI
```

---
*See also: `verticals/solutions.md` for complete vertical platforms.*
