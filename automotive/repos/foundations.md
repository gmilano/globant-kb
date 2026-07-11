# 🏗️ Foundational Repos — Automotive

> Build-on-this list. Open licenses, active communities, production track record.
> Last updated: 2026-07-11

## Core Platform Foundations

| Repo | License | Stars | Description | Build AI On Top? |
|------|---------|-------|-------------|-----------------|
| [commaai/openpilot](https://github.com/commaai/openpilot) | MIT | 64.5k | Robotics OS for 300+ vehicles. Full ADAS stack (perception, planning, control). Python/C++. The most battle-tested open-source in-vehicle AI platform on real roads. | Yes — fork for custom ADAS agents |
| [autowarefoundation/autoware](https://github.com/autowarefoundation/autoware) | Apache-2.0 | 11.8k | World's leading autonomous driving stack. Modular ROS 2 architecture: sensing → perception → localization → planning → control. 100+ companies, 20+ countries. | Yes — add LLM planning agents on top |
| [carla-simulator/carla](https://github.com/carla-simulator/carla) | MIT | 14.1k | Open-source photorealistic autonomous driving simulator (Unreal Engine 5.5). Urban layouts, vehicles, sensors, weather. The standard simulation testbed for any automotive AI project. | Yes — train and eval AI agents |
| [eclipse-kuksa/kuksa-databroker](https://github.com/eclipse-kuksa/kuksa-databroker) | Apache-2.0 | ~1.5k | Rust-based in-vehicle VSS (Vehicle Signal Specification) gRPC data broker. The universal signal bus: all vehicle signals (speed, temperature, steering, ADAS state) normalized to COVESA VSS schema. | Yes — AI agents subscribe/publish signals |
| [eclipse-velocitas/vehicle-app-cpp-sdk](https://github.com/eclipse-velocitas/vehicle-app-cpp-sdk) | Apache-2.0 | ~220 | Containerized Vehicle App development toolchain. Abstracts Kuksa integration, device management, OTA updates. Also has Python SDK. Enables rapid AI agent deployment onto SDV platforms. | Yes — package agents as Vehicle Apps |
| [usdot-fhwa-stol/carma-platform](https://github.com/usdot-fhwa-stol/carma-platform) | Apache-2.0 | ~570 | US DOT cooperative driving automation framework. SAE L3+, ROS 2, plugin architecture for CDA algorithms. Includes carma-cloud (infrastructure cooperation) and CDASim (simulation). | Yes — implement custom V2X AI plugins |
| [autowarefoundation/autoware_universe](https://github.com/autowarefoundation/autoware_universe) | Apache-2.0 | 1.7k | Autoware Universe — the active development hub of the Autoware stack. Contains cutting-edge perception, planning and control packages. More experimental than main autoware repo. | Yes — contribute and extend |
| [eclipse-lmos/lmos-platform](https://github.com/eclipse-lmos) | Apache-2.0 | ~900 | Eclipse LMOS Language Model Operating System. Multi-agent orchestration for cloud and edge. ADL (Agent Definition Language), ARC agent framework (Kotlin/JVM), open deployment lifecycle management. | Yes — orchestrate automotive AI agents |

---

## Simulation & Testing Foundations

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [carla-simulator/ros-bridge](https://github.com/carla-simulator/ros-bridge) | MIT | 637 | ROS bridge for CARLA — connect any ROS-based autonomous driving agent to CARLA simulation |
| [cjy1992/gym-carla](https://github.com/cjy1992/gym-carla) | MIT | 620 | OpenAI Gym wrapper for CARLA — RL agent training environment for autonomous driving |
| [erdos-project/pylot](https://github.com/erdos-project/pylot) | Apache-2.0 | 534 | Modular autonomous driving platform running on CARLA and real world. Perception, prediction, planning modules |
| [MasoudJTehrani/PCLA](https://github.com/MasoudJTehrani/PCLA) | Apache-2.0 | 77 | Testing framework for autonomous agents in CARLA. Evaluation harness for systematic agent assessment |
| [eclipse-leda](https://github.com/eclipse-leda) | Apache-2.0 | ~340 | Eclipse Leda — SDV quick-starter with Docker/QEMU images including pre-integrated Kuksa + Velocitas. Dev sandbox for SDV Vehicle Apps |

---

## Supporting Infrastructure

| Repo | License | Description |
|------|---------|-------------|
| [ros2/ros2](https://github.com/ros2/ros2) | Apache-2.0 | Robot Operating System 2 — the pub/sub middleware that most open-source autonomous driving stacks run on |
| [eclipse-kuksa/kuksa-python-sdk](https://github.com/eclipse-kuksa/kuksa-python-sdk) | Apache-2.0 | Python client for Kuksa Databroker — fastest way to build Python AI agents that read/write vehicle signals |
| [COVESA/vehicle_signal_specification](https://github.com/COVESA/vehicle_signal_specification) | MPL-2.0 | The official VSS schema — canonical names for every vehicle signal. Any AI agent should use VSS paths |
| [usdot-fhwa-stol/carma-cloud](https://github.com/usdot-fhwa-stol/carma-cloud) | Apache-2.0 | Cloud-side of CARMA — infrastructure cooperation for V2X. Pairs with carma-platform |

---
*See also: `verticals/solutions.md` for full vertical platforms (ERP/DMS/Fleet).*
