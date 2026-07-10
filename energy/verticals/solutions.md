# Vertical Solutions — Energy AI

> Existing platforms to customize with AI. Start from something working, add an agentic layer.
> Last updated: 2026-07-10 (v3)

## Energy Management Systems (EMS)

| Platform | License | Repo | Stack | AI Customization Point |
|----------|---------|------|-------|----------------------|
| **MyEMS** | MIT | [MyEMS/myems](https://github.com/MyEMS/myems) | FastAPI + React + TimescaleDB | REST API; add LangGraph agent for anomaly detection, ISO 50001 reporting. Best for factories, hospitals, malls. |
| **OpenEMS** | Apache-2.0 | [OpenEMS/openems](https://github.com/OpenEMS/openems) | Java OSGi + InfluxDB + Grafana | OSGi plugin API; add AI optimization controller for BESS/EV/heat pump dispatch. Carbon accounting module. |
| **OpenRemote** | AGPL-3.0 | [openremote/openremote](https://github.com/openremote/openremote) | Java + Keycloak + Docker | MCP-native (2026); Groovy rules engine replaceable with LLM agent. Best for microgrid and smart building IoT. |
| **Emoncms** | GPL-3.0 | [emoncms/emoncms](https://github.com/emoncms/emoncms) | PHP + MySQL + MQTT | REST API; feed-level anomaly detection. Lightweight for prosumer/community energy monitoring. |

## Power System Analysis & Planning

| Platform | License | Repo | Stack | AI Customization Point |
|----------|---------|------|-------|----------------------|
| **PyPSA** | MIT | [PyPSA/PyPSA](https://github.com/PyPSA/PyPSA) | Python + Pyomo/Gurobi | Network optimization object model; LLM can set constraints, interpret results. IEA/IRENA planning tool. |
| **pandapower** | BSD-3 | [e2nIEE/pandapower](https://github.com/e2nIEE/pandapower) | Python + NumPy/SciPy | PowerMCP wraps this for LLM-native tool calls. European DSO standard. |
| **OpenDSS** | BSD-3 | [dss-extensions/OpenDSS](https://github.com/dss-extensions/OpenDSS) | Pascal/Python COM | PowerMCP exposes COM API to LLMs. EPRI-backed, used by 100+ US utilities. |
| **OSeMOSYS** | Apache-2.0 | [OSeMOSYS/OSeMOSYS](https://github.com/OSeMOSYS/OSeMOSYS) | Python/MathProg | Long-term capacity planning. LLM for scenario input generation and result interpretation. |

## Grid Control & Automation

| Platform | License | Repo | Stack | AI Customization Point |
|----------|---------|------|-------|----------------------|
| **VOLTTRON** | Apache-2.0 | [VOLTTRON/volttron](https://github.com/VOLTTRON/volttron) | Python + MQTT + ZMQ | Agent marketplace; add LLM-powered control agents for OpenADR demand response and BESS dispatch. |
| **Grid2Op** | LGPL-2.1 | [Grid2op/grid2op](https://github.com/Grid2op/grid2op) | Python + NumPy | RL environment; train PPO/SAC agents for topology optimization. LLM explains RL agent actions. |
| **PowerMCP** | Apache-2.0 | [Power-Agent/PowerMCP](https://github.com/Power-Agent/PowerMCP) | Python + MCP | Direct LLM-to-simulator bridge. LLMs drive PowerWorld, PSSE, OpenDSS. Harvard SEAS production. |

## Building & HVAC

| Platform | License | Repo | Stack | AI Customization Point |
|----------|---------|------|-------|----------------------|
| **sinergym** | MIT | [ugr-sail/sinergym](https://github.com/ugr-sail/sinergym) | Python + EnergyPlus | Gymnasium interface; train and evaluate RL agents. Multi-zone, multi-agent HVAC. |
| **EnergyPlus** | BSD-3 | [NREL/EnergyPlus](https://github.com/NREL/EnergyPlus) | C++ + Python API | Physics simulation; LLM generates optimization recommendations from simulation output. |

## Virtual Power Plant (VPP)

| Platform | License | Repo | Stack | AI Customization Point |
|----------|---------|------|-------|----------------------|
| **VPP-Sim** | MIT | [vpp-sim/vpp-sim](https://github.com/vpp-sim/vpp-sim) | Python + PyTorch | ML strategy framework. Add LLM market strategy agent on top of optimization core. |
| **VOLTTRON** | Apache-2.0 | [VOLTTRON/volttron](https://github.com/VOLTTRON/volttron) | Python + OpenADR | Dispatch layer; LLM decides dispatch strategy, VOLTTRON executes via OpenADR/IEEE 2030.5. |

## Carbon & Sustainability Tools

| Platform | License | Repo | Stack | AI Customization Point |
|----------|---------|------|-------|----------------------|
| **Carbon Aware SDK** | MIT | [Green-Software-Foundation/carbon-aware-sdk](https://github.com/Green-Software-Foundation/carbon-aware-sdk) | C# / REST + CLI | Carbon signal API; schedule CI/CD workloads at cleanest grid time. Claude generates CSRD reports. |
| **Electricity Maps API** | CC-BY-NC | [electricitymaps/electricitymaps-contrib](https://github.com/electricitymaps/electricitymaps-contrib) | Python | Real-time carbon intensity data; feeds Carbon Aware SDK and custom carbon-aware agents. |

## AI Customization Stack

```
[Vertical Platform]        [Integration]         [AI Layer]
MyEMS REST API        →    LangGraph             → Claude Sonnet 5
OpenEMS OSGi Plugin   →    VOLTTRON Pub/Sub      → Anthropic Tool Use
pandapower Python     →    PowerMCP (MCP tools)  → Claude + Tool calls
sinergym Gymnasium    →    stable-baselines3     → PPO/SAC + LLM explain
VPP-Sim ML framework  →    Custom FastAPI bridge → Claude VPP agent
```

## Platform Selection Guide

| Scenario | Recommended Platform | Rationale |
|----------|---------------------|-----------|
| Factory / hospital EMS | MyEMS | MIT, full-stack, ISO 50001, Docker |
| Utility grid analytics | pandapower + PowerMCP | European DSO standard, LLM-native |
| Smart microgrid IoT | OpenRemote | MCP-native, flexible, AGPL open |
| HVAC RL optimization | sinergym | Best Gymnasium integration |
| VPP aggregation | VOLTTRON + VPP-Sim | OpenADR + ML dispatch |
| Long-term planning | PyPSA / OSeMOSYS | IEA/IRENA validated |
| Carbon CI/CD | Carbon Aware SDK | Fast-close, 3-week delivery |
| LLM grid copilot | PowerMCP + Grid2Op | Harvard SEAS production |

---
*Updated by Globant AI Studios ingestion pipeline.*
