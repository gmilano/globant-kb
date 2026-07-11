# 🎯 Top AI Agents — Automotive

> Open source AI agents and tools for the automotive industry. Focus: MIT / Apache 2.0.
> Last updated: 2026-07-11 (v6)

## Featured Agents & Tools

| Name | License | Stars | Description |
|------|---------|-------|-------------|
| [openpilot](https://github.com/commaai/openpilot) | MIT | 64.5k | Comma.ai's robotics OS. Upgrades driver-assistance systems on 325+ production vehicles (ACC + ALC). 300M+ miles driven by 20k+ users. Ships v0.11.x in 2026 with new driving model and DM model. The de-facto open platform for ADAS development and real-road testing. |
| [Autoware](https://github.com/autowarefoundation/autoware) | Apache-2.0 | 11.8k | World's leading open-source autonomous driving stack. Full perception → planning → control pipeline. Used by 100+ companies in 30+ countries. ROS 2 native. Active workshop at IEEE IV 2026 (Detroit). |
| [OpenDriveVLA](https://github.com/DriveVLA/OpenDriveVLA) | Apache-2.0 | ~620 | **AAAI 2026.** End-to-end autonomous driving with a large Vision-Language-Action (VLA) model. Hierarchical 2D+3D vision-language alignment; autoregressive trajectory generation; agent-env-ego interaction modeling. Accepts open-loop commands + 3D scene → outputs trajectory waypoints. First production-aligned open VLA for AV. |
| [Eclipse LMOS](https://github.com/eclipse-lmos/lmos-platform) | Apache-2.0 | ~950 | Language Model Operating System — vendor-neutral multi-agent orchestration for cloud and edge. First open Agent Definition Language (ADL). Originally built for automotive (Deutsche Telekom / T-Systems). ARC agent framework (Kotlin/JVM). |
| [CARMA Platform](https://github.com/usdot-fhwa-stol/carma-platform) | Apache-2.0 | ~580 | US DOT's Cooperative Driving Automation framework. SAE L3+, ROS 2 migration underway. Enables V2X (vehicle-to-infrastructure) AI agent plugins for intersection management, platooning, and emergency preemption. |
| [kuksa-databroker](https://github.com/eclipse-kuksa/kuksa-databroker) | Apache-2.0 | ~1.6k | Eclipse Kuksa's Rust-based VSS (Vehicle Signal Specification) gRPC data broker. The universal in-vehicle signal bus. Foundation for any agentic in-vehicle system — AI agents subscribe/publish to VSS paths. |
| [Eclipse Velocitas](https://github.com/eclipse-velocitas/vehicle-app-cpp-sdk) | Apache-2.0 | ~230 | Vehicle App development toolchain targeting containerized in-vehicle apps. C++ and Python SDKs. Integrates with Kuksa Databroker. Enables fast agent deployment onto SDV platforms. |
| [open-mechanic](https://github.com/speed785/open-mechanic) | MIT | ~210 | AI-powered OBD-II diagnostics. OBD-II adapter + Claude API = plain-English diagnosis and repair guides. Rich CLI with color-coded severity, FastAPI REST backend, React dashboard, maintenance timeline tracker. Bridges fleet mechanics and AI. |
| [autoware_vision_pilot](https://github.com/autowarefoundation/autoware_vision_pilot) | Apache-2.0 | ~350 | Free, fully open-source L2 ADAS stack powered by end-to-end AI. Hybrid architecture: safety perception models + E2E performance models in parallel. Targets privately-owned vehicles — lighter than full Autoware stack. |
| [cockpit-agent](https://github.com/SuperdeMan/cockpit-agent) | Apache-2.0 | ~100 | Cloud-edge collaborative multi-agent system for smart cockpits (智能座舱). Intent detection on-device, LLM planning in cloud, cross-domain agent orchestration, vehicle control via VSS/VAL layer, streaming HMI. Chinese SDV stack reference architecture. |
| [PCLA](https://github.com/MasoudJTehrani/PCLA) | Apache-2.0 | ~90 | Framework for testing autonomous AI agents inside the CARLA simulator. Structured evaluation harness — essential for any CARLA-based agent development and validation pipeline. |
| [MetaDrive](https://github.com/metadriverse/metadrive) | Apache-2.0 | ~1.1k | Lightweight, composable driving simulator for RL and generalization research. Generates infinite procedural scenarios. Runs 300+ FPS on a standard PC. Lidar, RGB, semantic map, first-person view. Lower overhead than CARLA for RL training loops. |

---

## How to Evaluate for a Client Engagement

1. **ADAS / Autonomous Driving**: Start with **openpilot** (validated on real roads, 325+ vehicles) or **Autoware** (full stack, research and commercial grade)
2. **VLA / Foundation Model for AV**: **OpenDriveVLA** is the AAAI 2026 reference — use for E2E trajectory generation research and fine-tuning
3. **In-vehicle AI agents / cockpit**: **kuksa-databroker** (signal bus) + **Eclipse LMOS** (orchestration) + **Eclipse Velocitas** (deployment toolchain)
4. **Fleet & V2X**: **CARMA Platform** for cooperative driving; combine with LangGraph for planning agents
5. **Dealer / back-office AI**: See `verticals/solutions.md` — Odoo + LangGraph recipes
6. **Simulation / RL training**: **MetaDrive** (fast, lightweight) or **CARLA** (photorealistic) + **PCLA** for evaluation
7. **OBD2 Diagnostics**: **open-mechanic** as the fastest path to AI-powered workshop tooling

---
*Auto-updated by the ingest pipeline. v6 adds OpenDriveVLA (AAAI 2026), open-mechanic, MetaDrive, updated star counts.*
