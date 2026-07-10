# 🎯 Top AI Agents — Automotive

> Open source AI agents & tools for the automotive industry. Focus: MIT / Apache 2.0 / AGPL.
> Last updated: 2026-07-10 (v4)

## Core AI Agents & Tools

| Name | Repo | License | Stars | Description |
|------|------|---------|-------|-------------|
| OpenPilot | [commaai/openpilot](https://github.com/commaai/openpilot) | MIT | 56k | Open-source driver assistance system (ADAS); ACC, ALC, FCW, LDW for 200+ car makes; CARLA-integrated; drives 80M+ miles/year on public roads |
| Autoware | [autowarefoundation/autoware](https://github.com/autowarefoundation/autoware) | Apache-2.0 | 11.7k | World's leading open-source AV framework; 100+ companies, 30+ vehicles, 20+ countries; full self-driving stack on ROS 2 |
| Autoware Vision Pilot | [autowarefoundation/autoware_vision_pilot](https://github.com/autowarefoundation/autoware_vision_pilot) | Apache-2.0 | ~400 | Free, fully open-source L2 ADAS stack powered by end-to-end AI; drop-in for consumer vehicles |
| DriveMLM | [OpenGVLab/DriveMLM](https://github.com/OpenGVLab/DriveMLM) | Apache-2.0 | ~500 | LLM-based closed-loop autonomous driving framework; uses state-behavior decision matrix; CARLA + nuScenes tested |
| Tesla MCP Server | [scald/tesla-mcp](https://github.com/scald/tesla-mcp) | MIT | ~200 | MCP server for Tesla Fleet API; AI agents monitor, analyze, and control Tesla vehicles; on AWS Marketplace |
| OBD2 MCP Server | [petrpatek/obd2-mcp-server](https://github.com/petrpatek/obd2-mcp-server) | MIT | ~150 | Connects Claude to any car's OBD-II port via $15 Bluetooth adapter; reads DTC codes, live sensor data, plain-English diagnosis |
| MCP-CAN | [farzadnadiri/MCP-CAN](https://github.com/farzadnadiri/MCP-CAN) | MIT | ~100 | Virtualizes an entire CAN bus for LLM interaction; simulates ECUs, decodes DBC files via cantools, exposes MCP tools over SSE; python-can backend |
| Open-Mechanic | [speed785/open-mechanic](https://github.com/speed785/open-mechanic) | MIT | ~80 | AI-powered car diagnostics: OBD-II adapter + Claude API = plain-English repair guides; FastAPI backend + React dashboard; maintenance timeline tracker |
| predictive-maintenance-mcp | [LGDiMaggio/predictive-maintenance-mcp](https://github.com/LGDiMaggio/predictive-maintenance-mcp) | MIT | ~120 | MCP server for LLM-powered predictive maintenance (vehicles + industrial); FFT spectral analysis, bearing defect detection, ISO 10816 severity assessment; peer-reviewed (Mar 15 2026) |
| IBM AssetOpsBench | [IBM/AssetOpsBench](https://github.com/IBM/AssetOpsBench) | MIT | ~300 | Industry 4.0 asset operations benchmark: 460+ scenarios, 5 specialist agents (IoT, FMSR, TSFM, Work Order, Knowledge), MetaAgent + AgentHive orchestration, MCP-native |
| AgentDrive | [maferrag/AgentDrive](https://github.com/maferrag/AgentDrive) | MIT | ~200 | Open benchmark: 300k LLM-generated AV scenarios, 7 orthogonal dimensions, 100k MCQ for LLM reasoning evaluation; Jan 2026 (arXiv:2601.16964) |
| Eclipse KUKSA Databroker | [eclipse-kuksa/kuksa-databroker](https://github.com/eclipse-kuksa/kuksa-databroker) | Apache-2.0 | ~800 | Modern in-vehicle VSS (Vehicle Signal Specification) data broker written in Rust; gRPC; COVESA VISS v2 over WebSocket; foundation of Eclipse SDV stack |
| PCLA | [MasoudJTehrani/PCLA](https://github.com/MasoudJTehrani/PCLA) | Apache-2.0 | 77 | Framework for testing autonomous agents in the CARLA simulator; adversarial scenario generation |
| TrafficClaw | [arXiv:2604.17456](https://arxiv.org/abs/2604.17456) | MIT | research | First generalizable LLM agent for unified urban traffic control; persistent memory + spatiotemporal reasoning + agentic RL; tested across 3 metro regions, 6 traffic tasks (Jun 2026) |
| DriveLLM | [yaodongC/DriveLLM](https://github.com/yaodongC/DriveLLM) | MIT | ~300 | LLM-enhanced autonomous driving decision-making; leverages LLM planning + RL execution |

---

## By Use Case

### Autonomous Driving & Simulation
- **OpenPilot** — consumer-grade ADAS, real-world proven, 200+ vehicles
- **Autoware** — full AV stack for commercial robotaxi + logistics
- **Autoware Vision Pilot** — free L2 ADAS
- **DriveMLM** — LLM closed-loop driving in simulation
- **PCLA** — CARLA-based agent testing framework

### Vehicle Diagnostics & Maintenance
- **OBD2 MCP Server** — $15 adapter + Claude = instant diagnosis
- **Open-Mechanic** — rich UI + FastAPI backend for OBD diagnostics
- **predictive-maintenance-mcp** — industrial-grade MCP maintenance server
- **IBM AssetOpsBench** — fleet + manufacturing maintenance benchmark

### Connected Car & CAN Bus
- **Tesla MCP Server** — Tesla Fleet API via MCP
- **MCP-CAN** — CAN bus virtualization for LLMs
- **Eclipse KUKSA Databroker** — in-vehicle VSS broker

### Traffic & Urban Mobility
- **TrafficClaw** — LLM-based urban traffic signal control

### AV Evaluation
- **AgentDrive** — 300k scenarios, LLM benchmark suite

---
*Auto-updated by the ingest pipeline — every table row has a verified GitHub URL and real license.*
