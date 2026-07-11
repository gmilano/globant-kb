# 🏗️ Foundational Repos — Automotive

> Build-on-this list. Open licenses, active communities, production track record.
> Last updated: 2026-07-11 (v6)

## Core Platform Foundations

| Repo | License | Stars | Description | Build AI On Top? |
|------|---------|-------|-------------|-----------------|
| [commaai/openpilot](https://github.com/commaai/openpilot) | MIT | 64.5k | Robotics OS for 325+ vehicles. Full ADAS stack (perception, planning, control). Python/C++. 300M+ miles on real roads. The most battle-tested open-source in-vehicle AI platform. v0.11.x (2026) adds new driving model + DM model. | Yes — fork for custom ADAS agents |
| [autowarefoundation/autoware](https://github.com/autowarefoundation/autoware) | Apache-2.0 | 11.8k | World's leading autonomous driving stack. Modular ROS 2 architecture: sensing → perception → localization → planning → control. 100+ companies, 30+ countries. Tutorial at IEEE IV 2026 (Detroit). | Yes — add LLM planning agents on top |
| [carla-simulator/carla](https://github.com/carla-simulator/carla) | MIT | 14.2k | Open-source photorealistic autonomous driving simulator (UE5.5 branch active). Urban layouts, vehicles, sensors, weather. Standard simulation testbed for automotive AI. Python + C++ API. | Yes — train and evaluate AI agents |
| [eclipse-kuksa/kuksa-databroker](https://github.com/eclipse-kuksa/kuksa-databroker) | Apache-2.0 | ~1.6k | Rust-based in-vehicle VSS gRPC data broker. Universal signal bus: speed, steering, HVAC, ADAS state, battery SoC — all normalized to COVESA VSS schema. Core of any SDV AI agent system. | Yes — AI agents subscribe/publish VSS signals |
| [eclipse-velocitas/vehicle-app-cpp-sdk](https://github.com/eclipse-velocitas/vehicle-app-cpp-sdk) | Apache-2.0 | ~230 | Containerized Vehicle App development toolchain. Abstracts Kuksa integration, device management, OTA updates. Python SDK also available. Enables rapid AI agent deployment onto SDV platforms. | Yes — package agents as Vehicle Apps |
| [usdot-fhwa-stol/carma-platform](https://github.com/usdot-fhwa-stol/carma-platform) | Apache-2.0 | ~580 | US DOT cooperative driving automation framework. SAE L3+, ROS 2, plugin architecture for CDA algorithms. Includes carma-cloud (infrastructure cooperation) and CDASim (simulation). | Yes — implement custom V2X AI plugins |
| [autowarefoundation/autoware_universe](https://github.com/autowarefoundation/autoware_universe) | Apache-2.0 | 1.7k | Active development hub of the Autoware stack. Cutting-edge perception, planning, and control packages. More experimental than main Autoware repo — frontier of open AV research. | Yes — contribute and extend |
| [eclipse-lmos/lmos-platform](https://github.com/eclipse-lmos) | Apache-2.0 | ~950 | Eclipse LMOS Language Model Operating System. Multi-agent orchestration for cloud and edge. ADL (Agent Definition Language), ARC agent framework (Kotlin/JVM). Originally automotive-built (Deutsche Telekom). | Yes — orchestrate automotive AI agents |
| [DriveVLA/OpenDriveVLA](https://github.com/DriveVLA/OpenDriveVLA) | Apache-2.0 | ~620 | **AAAI 2026.** End-to-end autonomous driving VLA model. Hierarchical vision-language alignment, autoregressive trajectory generation. Open 0.5B checkpoint on HuggingFace. The open foundation for next-gen AV AI. | Yes — fine-tune on domain data |
| [metadriverse/metadrive](https://github.com/metadriverse/metadrive) | Apache-2.0 | ~1.1k | Lightweight driving simulator for generalizable RL. 300+ FPS on standard PC. Procedurally generates infinite scenarios. Lidar, RGB, semantic map, first-person view. Used by Stanford, UCB, CMU groups. | Yes — RL training for ADAS agents |

---

## Simulation & Testing Foundations

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [carla-simulator/ros-bridge](https://github.com/carla-simulator/ros-bridge) | MIT | 650 | ROS bridge for CARLA — connect any ROS-based autonomous driving agent to CARLA simulation |
| [cjy1992/gym-carla](https://github.com/cjy1992/gym-carla) | MIT | 630 | OpenAI Gym wrapper for CARLA — RL agent training environment for autonomous driving |
| [erdos-project/pylot](https://github.com/erdos-project/pylot) | Apache-2.0 | 534 | Modular autonomous driving platform on CARLA + real world. Perception, prediction, planning modules |
| [MasoudJTehrani/PCLA](https://github.com/MasoudJTehrani/PCLA) | Apache-2.0 | ~90 | Testing framework for autonomous agents in CARLA. Structured evaluation harness |
| [eclipse-sumo/sumo](https://github.com/eclipse-sumo/sumo) | EPL-2.0 | ~2.7k | Eclipse SUMO — open-source microscopic traffic simulation for large networks. Co-simulation with CARLA, Python library (sumolib), MARL traffic signal control. Standard for V2X and fleet routing research. |
| [eclipse-leda](https://github.com/eclipse-leda) | Apache-2.0 | ~350 | Eclipse Leda — SDV quick-starter with Docker/QEMU images. Pre-integrated Kuksa + Velocitas. Dev sandbox for SDV Vehicle Apps |

---

## Supporting Infrastructure

| Repo | License | Description |
|------|---------|-------------|
| [ros2/ros2](https://github.com/ros2/ros2) | Apache-2.0 | Robot Operating System 2 — pub/sub middleware that most open-source autonomous driving stacks run on |
| [eclipse-kuksa/kuksa-python-sdk](https://github.com/eclipse-kuksa/kuksa-python-sdk) | Apache-2.0 | Python client for Kuksa Databroker — fastest way to build Python AI agents that read/write vehicle signals |
| [COVESA/vehicle_signal_specification](https://github.com/COVESA/vehicle_signal_specification) | MPL-2.0 | Official VSS schema — canonical names for every vehicle signal. Any AI agent should use VSS paths |
| [usdot-fhwa-stol/carma-cloud](https://github.com/usdot-fhwa-stol/carma-cloud) | Apache-2.0 | Cloud-side of CARMA — infrastructure cooperation for V2X. Pairs with carma-platform |
| [speed785/open-mechanic](https://github.com/speed785/open-mechanic) | MIT | OBD-II + Claude API diagnostics. AI-powered workshop tooling — plain-English fault analysis, repair guides |

---
*v6: Added OpenDriveVLA, MetaDrive, eclipse-sumo, open-mechanic. Updated star counts.*  
*See also: `verticals/solutions.md` for full vertical platforms (ERP/DMS/Fleet).*
