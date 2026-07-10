# 🏗️ Foundational Repos — Automotive AI

> Open-source bases to build on. Active communities, permissive licenses.
> Last updated: 2026-07-10 (v4)

## Autonomous Driving Stack

| Repo | License | Stars | Description | AI Ready? |
|------|---------|-------|-------------|-----------|
| [commaai/openpilot](https://github.com/commaai/openpilot) | MIT | 56k | Open driver assistance system; ACC, ALC, FCW, LDW; 200+ car makes; drives 80M+ miles/year on public roads | Yes — real-world ADAS, pluggable perception |
| [autowarefoundation/autoware](https://github.com/autowarefoundation/autoware) | Apache-2.0 | 11.7k | World's leading open-source AV framework; full stack from perception → planning → control on ROS 2; 100+ companies using it | Yes — full AI pipeline, modular nodes |
| [autowarefoundation/autoware_vision_pilot](https://github.com/autowarefoundation/autoware_vision_pilot) | Apache-2.0 | ~400 | Free, fully open-source L2 ADAS stack powered by end-to-end AI technology | Yes — drop-in L2 for consumer vehicles |
| [carla-simulator/carla](https://github.com/carla-simulator/carla) | MIT | 14.1k | Open-source AV simulator built on Unreal Engine; realistic environments, sensor simulation (cam/LiDAR/radar/IMU/GPS), Python & C++ APIs, ROS bridge | Yes — training + validation ground |
| [carla-simulator/ros-bridge](https://github.com/carla-simulator/ros-bridge) | MIT | 637 | ROS 2 bridge for CARLA simulator — connects CARLA with Autoware and any ROS-based AV stack | Yes — integration glue |
| [OpenGVLab/DriveMLM](https://github.com/OpenGVLab/DriveMLM) | Apache-2.0 | ~500 | LLM-based closed-loop autonomous driving; state-behavior decision matrix; evaluated in CARLA + nuScenes | Yes — LLM4AD research baseline |
| [maferrag/AgentDrive](https://github.com/maferrag/AgentDrive) | MIT | ~200 | Open benchmark: 300k LLM-generated AV scenarios; 100k MCQ; eval pipeline for LLM reasoning in autonomous systems (arXiv:2601.16964) | Yes — AV agent evaluation |

## Eclipse SDV Ecosystem (Apache-2.0)

| Repo | License | Stars | Description | AI Ready? |
|------|---------|-------|-------------|-----------|
| [eclipse-kuksa/kuksa-databroker](https://github.com/eclipse-kuksa/kuksa-databroker) | Apache-2.0 | ~800 | Modern in-vehicle VSS data broker in Rust; gRPC service for 1000+ vehicle signals; COVESA VISS v2; foundation of SDV stacks | Yes — stream vehicle signals to LLMs |
| [eclipse-velocitas/vehicle-app-python-sdk](https://github.com/eclipse-velocitas/vehicle-app-python-sdk) | Apache-2.0 | ~300 | Python SDK for building Vehicle Apps that run on Eclipse SDV; connects to KUKSA Databroker; DevContainer + CI templates | Yes — build LLM-powered vehicle apps |
| [eclipse-leda/leda-distro](https://github.com/eclipse-leda/leda-distro) | Apache-2.0 | ~200 | Yocto-based build setup for SDV edge: integrates Vehicle Apps (Velocitas), KUKSA Databroker, Kanto cloud connectivity, COVESA VSS | Yes — production SDV distro |
| [eclipse-sdv-blueprints](https://github.com/eclipse-sdv-blueprints) | Apache-2.0 | ~150 | Reference blueprints for SDV use cases: companion app, fleet management, insurance telematics | Yes — copy-paste starting points |
| [eclipse-lmos](https://github.com/eclipse-lmos) | Apache-2.0 | ~400 | Language Model Operating System: sovereign multi-agent platform; native MCP integration; each agent = MCP server + client; cloud or on-prem | Yes — agent orchestration layer for SDV |

## Vehicle Diagnostics & Maintenance

| Repo | License | Stars | Description | AI Ready? |
|------|---------|-------|-------------|-----------|
| [speed785/open-mechanic](https://github.com/speed785/open-mechanic) | MIT | ~80 | OBD-II adapter + Claude API = plain-English car diagnostics; FastAPI + React; repair guides by severity | Yes — AI-first by design |
| [petrpatek/obd2-mcp-server](https://github.com/petrpatek/obd2-mcp-server) | MIT | ~150 | MCP server: OBD-II → Claude; reads DTC fault codes + live sensor data; plain-language explanations | Yes — MCP native |
| [LGDiMaggio/predictive-maintenance-mcp](https://github.com/LGDiMaggio/predictive-maintenance-mcp) | MIT | ~120 | Peer-reviewed MCP server for predictive maintenance; vibration/FFT diagnostics, bearing defect detection, ISO 10816; published Applied Sciences Mar 2026 | Yes — production-quality MCP |
| [IBM/AssetOpsBench](https://github.com/IBM/AssetOpsBench) | MIT | ~300 | Industry 4.0 benchmark: 460+ maintenance scenarios, 5 specialist agents (IoT/FMSR/TSFM/WorkOrder/Knowledge), MetaAgent+AgentHive orchestration | Yes — evaluation + blueprint |

## Fleet Management & Logistics

| Repo | License | Stars | Description | AI Ready? |
|------|---------|-------|-------------|-----------|
| [fleetbase/fleetbase](https://github.com/fleetbase/fleetbase) | AGPL-3.0 | 1.9k | Modular logistics & supply chain OS; self-hostable; fleet management + e-commerce delivery + warehouse ops + API platform; PHP/Laravel + Ember.js | Add AI layer on top |
| [fleetbase/fleetops](https://github.com/fleetbase/fleetops) | AGPL-3.0 | ~400 | Fleet & transport management extension for Fleetbase; driver management, routing, dispatch, real-time tracking | Add predictive maintenance AI |

## Connected Car & CAN Bus

| Repo | License | Stars | Description | AI Ready? |
|------|---------|-------|-------------|-----------|
| [farzadnadiri/MCP-CAN](https://github.com/farzadnadiri/MCP-CAN) | MIT | ~100 | CAN bus virtualization for LLMs; simulates ECUs; DBC file decoding via cantools; python-can backend; MCP over SSE | Yes — LLMs access vehicle ECUs |
| [scald/tesla-mcp](https://github.com/scald/tesla-mcp) | MIT | ~200 | MCP server for Tesla Fleet API; charge monitoring, location, climate control, wake/lock/unlock; AWS Marketplace | Yes — Tesla fleet AI |
| [iDoka/awesome-canbus](https://github.com/iDoka/awesome-canbus) | CC0 | ~2k | Curated collection of CAN bus tools, hardware, and security research resources | Yes — discovery resource |

---

## Notes

- **openpilot** runs on a comma 3X device (~$1,199) — the cheapest path to real-world ADAS validation
- **Eclipse SDV** is becoming the interoperability standard for OEM + Tier-1 — 50+ member companies, Hyundai Mobis joined 2026
- **KUKSA Databroker** is the recommended in-vehicle data layer for any LLM integration — exposes 1000+ VSS signals
- **Godot**: unrelated to automotive — no bans affect any of these repos

---
*See also: `verticals/solutions.md` for full vertical platforms (ERP, fleet, DMS).*
