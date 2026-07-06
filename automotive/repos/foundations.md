# 🏗️ Foundational Repos — Automotive

> Build-on-these bases. Open license, active community, production-proven.
> Last updated: 2026-07-06

---

## Autonomous Driving Stack

| Repo | License | Description | AI-Ready? |
|------|---------|-------------|-----------|
| [autowarefoundation/autoware](https://github.com/autowarefoundation/autoware) | Apache-2.0 | World's leading open-source AV stack. Full modular pipeline: perception, localization, planning, control. 100+ companies, 20+ countries. ROS 2-based. | Yes — 11.7k ★ |
| [commaai/openpilot](https://github.com/commaai/openpilot) | MIT | Open OS for robotics/ADAS. 300+ supported cars. v0.11 uses 2B-param world model trained on 2.5M min fleet video. Pure vision + radar. | Yes — ~50k ★ |
| [autowarefoundation/autoware_vision_pilot](https://github.com/autowarefoundation/autoware_vision_pilot) | Apache-2.0 | Production-grade vision-only ADAS/FSD stack — no HD map dependency. Safety-certifiable code quality. | Yes — ~500 ★ |
| [carla-simulator/carla](https://github.com/carla-simulator/carla) | MIT | Unreal Engine urban driving simulator. Sensors: RGB camera, LiDAR, radar, semantic seg. Python API. De-facto research standard. | Yes — 14.1k ★ |
| [erdos-project/pylot](https://github.com/erdos-project/pylot) | Apache-2.0 | Modular AV research platform on CARLA + real hardware (CMU/UCB). Dataflow graph architecture. Plug-in perception, prediction, planning. | Yes — 534 ★ |

---

## Simulation & Testing

| Repo | License | Description | AI-Ready? |
|------|---------|-------------|-----------|
| [NVlabs/alpasim](https://github.com/NVlabs/alpasim) | Apache-2.0 | NVIDIA AlpaSim — open AV simulation for E2E policy testing. gRPC microservices. Supports Alpamayo-R1, VaVAM, Transfuser. | Yes — ~1k ★ |
| [cjy1992/gym-carla](https://github.com/cjy1992/gym-carla) | MIT | OpenAI Gym wrapper for CARLA. Standardized RL training interface for AV agents. | Yes — 620 ★ |
| [carla-simulator/ros-bridge](https://github.com/carla-simulator/ros-bridge) | MIT | ROS 2 ↔ CARLA bridge. Enables Autoware and other ROS stacks to use CARLA for simulation. | Yes — 637 ★ |
| [MasoudJTehrani/PCLA](https://github.com/MasoudJTehrani/PCLA) | Apache-2.0 | Plug-and-play framework for registering and testing autonomous agents in CARLA. | Yes — 77 ★ |
| [PJLab-ADG/PCSim](https://github.com/PJLab-ADG/PCSim) | Apache-2.0 | LiDAR point cloud simulation + sensor placement optimization (ICRA 2023). | Yes — 272 ★ |

---

## Software-Defined Vehicle (SDV) Infrastructure

| Repo | License | Description | AI-Ready? |
|------|---------|-------------|-----------|
| [eclipse-kuksa/kuksa-databroker](https://github.com/eclipse-kuksa/kuksa-databroker) | Apache-2.0 | Rust-based in-vehicle VSS data broker. Standardizes CAN/LIN/Ethernet signals into gRPC-accessible data points. Backbone of Eclipse SDV ecosystem. | Yes — ~500 ★ |
| [eclipse-kuksa/kuksa.val.services](https://github.com/eclipse-kuksa/kuksa.val.services) | Apache-2.0 | Vehicle service implementations on KUKSA (seat, HVAC, VISS). Reference for vehicle abstraction layer. | Yes — ~200 ★ |
| [SoftwareDefinedVehicle](https://github.com/SoftwareDefinedVehicle) | Apache-2.0 | Eclipse SDV GitHub org. Eclipse Leda (Yocto-based SDV.EDGE build), Velocitas (vehicle app framework), Chariott (service discovery). | Yes |

---

## Fleet Management & Telematics

| Repo | License | Description | AI-Ready? |
|------|---------|-------------|-----------|
| [traccar/traccar](https://github.com/traccar/traccar) | Apache-2.0 | GPS tracking server for 2,000+ device protocols. Java + REST API. Industry standard. Webhook/event stream for AI integration. | Yes — ~5k ★ |
| [fleetbase/fleetbase](https://github.com/fleetbase/fleetbase) | AGPL-3.0 | Open logistics OS — dispatch, telematics, route optimization, maintenance, analytics. REST + WebSocket. | Yes — ~800 ★ |
| [openremote/fleet-management](https://github.com/openremote/fleet-management) | Apache-2.0 | OpenRemote-based fleet telematics. Teltonika device integration, IoT management. | Yes — ~100 ★ |
| [sachnaror/fleet-management-system](https://github.com/sachnaror/fleet-management-system) | Apache-2.0 | Python FastAPI fleet platform — OBD-II, CAN bus, GPS, driver behavior, fault detection, live dashboard. | Yes — ~30 ★ |

---

## CARLA Ecosystem Utilities

| Repo | License | Description | AI-Ready? |
|------|---------|-------------|-----------|
| [carla-simulator/carla-autoware](https://github.com/carla-simulator/carla-autoware) | MIT | CARLA ↔ Autoware AV integration. Bridge for testing Autoware stacks in CARLA. | Yes — 282 ★ |
| [YukunXia/Carla_iLQR_MPC](https://github.com/YukunXia/Carla_iLQR_MPC) | MIT | Real-time MPC based on iLQR in CARLA. Planning algorithm reference. | Yes — 315 ★ |
| [Amin-Tgz/awesome-CARLA](https://github.com/Amin-Tgz/awesome-CARLA) | CC0-1.0 | Curated CARLA resources: tutorials, blog posts, code. Community aggregator. | Yes — 917 ★ |

---

*See also: `verticals/solutions.md` for full vertical platforms (fleet, dealer, ERP).*
