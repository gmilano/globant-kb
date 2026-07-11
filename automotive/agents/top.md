# 🎯 Top AI Agents — Automotive

> Open source AI agents and tools for the automotive industry. Focus: MIT / Apache 2.0.
> Last updated: 2026-07-11

## Featured Agents & Tools

| Name | License | Stars | Description |
|------|---------|-------|-------------|
| [openpilot](https://github.com/commaai/openpilot) | MIT | 64.5k | Comma.ai's robotics OS. Upgrades driver-assistance systems on 300+ production vehicles (ACC + ALC). 300M miles driven by 20k+ users. The de-facto open platform for ADAS development and testing. |
| [Autoware](https://github.com/autowarefoundation/autoware) | Apache-2.0 | 11.8k | World's leading open-source autonomous driving stack. Full perception → planning → control pipeline. Used by 100+ companies in 30+ countries. ROS 2 native. |
| [Eclipse LMOS](https://github.com/eclipse-lmos/lmos-platform) | Apache-2.0 | ~900 | Language Model Operating System — open, vendor-neutral multi-agent orchestration for cloud and edge. Originally built for automotive (Deutsche Telekom / T-Systems backbone). First open Agent Definition Language (ADL). |
| [CARMA Platform](https://github.com/usdot-fhwa-stol/carma-platform) | Apache-2.0 | ~570 | US DOT's Cooperative Driving Automation framework. SAE L3+ autonomy, ROS 2 migration underway. Enables V2X (vehicle-to-infrastructure) AI agent plugins. |
| [kuksa-databroker](https://github.com/eclipse-kuksa/kuksa-databroker) | Apache-2.0 | ~1.5k | Eclipse Kuksa's Rust-based VSS (Vehicle Signal Specification) data broker. The in-vehicle signal bus that AI agents read/write to. Foundation for any agentic in-vehicle system. |
| [Eclipse Velocitas](https://github.com/eclipse-velocitas/vehicle-app-cpp-sdk) | Apache-2.0 | ~220 | Vehicle App development toolchain targeting containerized in-vehicle apps. C++ and Python SDKs. Integrates with Kuksa Databroker. Enables fast agent deployment onto SDV platforms. |
| [AutoClaw](https://github.com/btc710/AutoClaw) | MIT | ~120 | Open-source in-car AI copilot for Android Auto and Apple CarPlay. Multi-agent runtime (OpenClaw + NemoClaw + OpenHuman). Steering-wheel-driven conversations. Early alpha — high upside. |
| [autoware_vision_pilot](https://github.com/autowarefoundation/autoware_vision_pilot) | Apache-2.0 | ~310 | Free, fully open-source L2 ADAS stack powered by End-to-End AI. Privately-owned vehicles target. From Autoware Foundation — lighter weight than full Autoware. |
| [PCLA](https://github.com/MasoudJTehrani/PCLA) | Apache-2.0 | 77 | Framework for testing autonomous AI agents inside the CARLA simulator. Structured evaluation harness — needed for any CARLA-based agent development pipeline. |
| [cockpit-agent](https://github.com/SuperdeMan/cockpit-agent) | Apache-2.0 | ~90 | Cloud-edge collaborative multi-agent system for smart cockpits (智能座舱). Intent detection on-device, LLM planning in cloud, cross-domain agent orchestration, vehicle control via VSS/VAL layer, streaming HMI. Chinese SDV stack reference. |

---

## How to Evaluate for a Client Engagement

1. **ADAS / Autonomous Driving**: Start with **openpilot** (validated on real vehicles) or **Autoware** (full stack, research-grade)
2. **In-vehicle AI agents / cockpit**: Use **kuksa-databroker** as the signal bus + **Eclipse LMOS** for orchestration + **Eclipse Velocitas** for deployment toolchain
3. **Fleet & V2X**: **CARMA Platform** for cooperative driving; combine with LangGraph for planning agents
4. **Dealer / back-office AI**: See `verticals/solutions.md` — Odoo + LangGraph recipes
5. **Simulation / testing**: **CARLA** + **PCLA** for evaluation harness

---
*Auto-updated by the ingest pipeline.*
