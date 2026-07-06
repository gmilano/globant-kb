# 🎯 AI Agents & Tools — Automotive

> Open-source agents, frameworks, and tools for the automotive industry.
> Focus: MIT / Apache 2.0 licenses that Globant can build on commercially.
> Last updated: 2026-07-06

---

## Core Autonomous Driving Agents

| Name | License | Description | Stars |
|------|---------|-------------|-------|
| [openpilot](https://github.com/commaai/openpilot) | MIT | comma.ai's open OS for robotics — upgrades ADAS on 300+ car models. v0.11 (March 2026) is the first real-world robotics agent trained entirely in a learned (world model) simulator. 2B-param world model trained on 2.5M min of fleet video. | ~50k ★ |
| [autoware](https://github.com/autowarefoundation/autoware) | Apache-2.0 | World's leading open-source autonomous driving stack. Full perception → localization → planning → control pipeline. Used by 100+ companies, 30+ vehicle types, 20+ countries. Actively integrating E2E AI with Alpamayo. | ~11.7k ★ |
| [autoware_vision_pilot](https://github.com/autowarefoundation/autoware_vision_pilot) | Apache-2.0 | Safety-certifiable free self-driving stack — ADAS and FSD without requiring 3D HD maps. Vision-only architecture, production-grade code quality target. | ~500 ★ |
| [alpasim](https://github.com/NVlabs/alpasim) | Apache-2.0 | NVIDIA's AlpaSim — open-source AV simulation platform for testing end-to-end policies. Supports Alpamayo-R1, Alpamayo 1.5, VaVAM, and Transfuser. Microservice architecture with gRPC. Launched Oct 2025. | ~1k ★ |
| [carla](https://github.com/carla-simulator/carla) | MIT | Unreal Engine-based open urban driving simulator — de-facto standard for ADAS research. Sensors: camera, LiDAR, radar, semantic segmentation. Rich Python API. | ~14.1k ★ |

---

## SDV (Software-Defined Vehicle) Infrastructure

| Name | License | Description | Stars |
|------|---------|-------------|-------|
| [kuksa-databroker](https://github.com/eclipse-kuksa/kuksa-databroker) | Apache-2.0 | Eclipse KUKSA in-vehicle VSS (Vehicle Signal Specification) data broker written in Rust. The data orchestration layer for modern SDVs — standardizes CAN/LIN/Ethernet signals into gRPC-accessible data points. Bosch-backed. | ~500 ★ |
| [kuksa.val.services](https://github.com/eclipse-kuksa/kuksa.val.services) | Apache-2.0 | Vehicle service implementations on top of KUKSA — seat services, HVAC, VISS bridge. Reference implementation for vehicle abstraction layer. | ~200 ★ |

---

## Fleet Management & Telematics

| Name | License | Description | Stars |
|------|---------|-------------|-------|
| [traccar](https://github.com/traccar/traccar) | Apache-2.0 | Real-time GPS tracking server supporting 2,000+ device protocols. Java backend, REST API, web + mobile UI. Industry-standard open-source telematics platform. AI integration via webhook/event stream. | ~5k ★ |
| [fleetbase](https://github.com/fleetbase/fleetbase) | AGPL-3.0 | Open-source logistics OS — dispatch, live tracking, telematics, route optimization, maintenance, analytics. REST + WebSocket API. Self-hosted or cloud. No per-driver fees. | ~800 ★ |
| [fleet-management](https://github.com/openremote/fleet-management) | Apache-2.0 | OpenRemote-based fleet management + telematics platform. Native Teltonika device integration, session/location tracking, IoT device management. | ~100 ★ |

---

## Simulation & Validation Ecosystem

| Name | License | Description | Stars |
|------|---------|-------------|-------|
| [gym-carla](https://github.com/cjy1992/gym-carla) | MIT | OpenAI Gym wrapper for CARLA — standardized RL interface for training autonomous agents in simulation. Observation: camera, LiDAR, radar, BEV. | ~620 ★ |
| [pylot](https://github.com/erdos-project/pylot) | Apache-2.0 | Modular AV research platform on top of CARLA + real hardware. Dataflow graph architecture; perception, prediction, planning modules. Carnegie Mellon / UC Berkeley. | ~534 ★ |
| [PCLA](https://github.com/MasoudJTehrani/PCLA) | Apache-2.0 | Framework for testing autonomous agents directly in the CARLA simulator. Plug-in architecture for registering custom agents. | ~77 ★ |

---

## Honorable Mentions

| Name | License | Description |
|------|---------|-------------|
| [ros-bridge](https://github.com/carla-simulator/ros-bridge) | MIT | ROS 2 bridge for CARLA — enables ROS-based stacks (Autoware) to run in CARLA simulation. ~637 ★ |
| [REVOL-E-TION](https://github.com/TUMFTM/REVOL-E-TION) | Apache-2.0 | TU Munich EV site-level energy system optimizer for charging fleets. ~16 ★ |
| [ev-charging-optimization](https://github.com/philippnormann/ev-charging-optimization) | MIT | Simulation for shortest-route EV charging optimization. ~20 ★ |
| [alpamayo-autoware](https://github.com/autowarefoundation/alpamayo-autoware) | Apache-2.0 | Integration layer between NVIDIA Alpamayo models and the Autoware stack. Active 2026. |

---
*Auto-updated by ingest pipeline.*
