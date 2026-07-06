# Foundational Repos — Automotive

> Bases to build on. Open license, active community, production-proven.
> Last updated: 2026-07-06

## Core Platforms & Frameworks

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [commaai/openpilot](https://github.com/commaai/openpilot) | MIT | 63k★ | Production ADAS OS running on 300+ car models. End-to-end neural net for lane centering + adaptive cruise. Python + C++ + OpenCL. | Yes — plug in custom models |
| [ApolloAuto/apollo](https://github.com/ApolloAuto/apollo) | Apache 2.0 | 24k★ | Baidu's full autonomous driving platform. Modular: perception, HD map, prediction, planning, control. v11.0 for commercial deployment. | Yes — swappable modules |
| [autowarefoundation/autoware](https://github.com/autowarefoundation/autoware) | Apache 2.0 | 11.8k★ | World's #1 open-source AV stack on ROS2. Foundation-backed by Toyota, Tier IV, ROBOTIS. Runs CARLA + real vehicles. | Yes — ROS2 native, AI plugins |
| [carla-simulator/carla](https://github.com/carla-simulator/carla) | MIT | 14.1k★ | Open-source autonomous driving simulator (Unreal Engine). Full sensor suite, Python API, 100+ scenarios. UE5 branch in active development. | Yes — simulation sandbox |
| [eclipse-sumo/sumo](https://github.com/eclipse-sumo/sumo) | EPL-2.0 | 3.2k★ | Eclipse SUMO — microscopic traffic simulation for large networks. Python TraCI/libsumo API. Intermodal (cars, bikes, pedestrians, transit). | Yes — TraCI API for RL agents |
| [carla-simulator/ros-bridge](https://github.com/carla-simulator/ros-bridge) | MIT | 637★ | ROS/ROS2 bridge for CARLA — connects CARLA simulation to Autoware/openpilot/ROS stacks seamlessly. | Yes — integration glue |
| [erdos-project/pylot](https://github.com/erdos-project/pylot) | Apache 2.0 | 534★ | Modular AV platform on CARLA + real world. ERDOS dataflow runtime. Perception + planning + control in Python. | Yes — rapid prototype |
| [BerkeleyLearnVerify/Scenic](https://github.com/BerkeleyLearnVerify/Scenic) | BSD-3 | 980★ | Probabilistic scenario specification language for AV testing. Generates adversarial + edge-case test scenarios for CARLA/SUMO/Webots. | Yes — AV test generation |
| [cjy1992/gym-carla](https://github.com/cjy1992/gym-carla) | MIT | 620★ | OpenAI Gym wrapper for CARLA — reinforcement learning environments for autonomous driving experiments. | Yes — RL training |
| [OpenGVLab/DriveMLM](https://github.com/OpenGVLab/DriveMLM) | Apache 2.0 | 1.2k★ | LLM-based AV framework — multimodal LLM as behavior planning module. 76.1 CARLA Town05 Long score. Human-interpretable decisions. | Yes — LLM-native AV |

## Infrastructure Repos

| Repo | License | Stars | Purpose |
|------|---------|-------|---------|
| [fleetbase/fleetbase](https://github.com/fleetbase/fleetbase) | AGPL-3.0 | 1.8k★ | Modular logistics OS (PHP/Laravel + Ember.js). REST API + webhooks. Fleet ops, dispatch, tracking. |
| [fleetbase/fleetops](https://github.com/fleetbase/fleetops) | AGPL-3.0 | 420★ | Fleet & transport management extension for Fleetbase. Driver management, real-time tracking, dispatch. |
| [jmnda-dev/fleetms](https://github.com/jmnda-dev/fleetms) | MIT | 180★ | Fleet maintenance and management software — service records, costs, vehicle lifecycle. |
| [odoo/odoo](https://github.com/odoo/odoo) | LGPL-3 | 52.8k★ | Full ERP/CRM — automotive dealer module, fleet management, service orders, spare parts inventory. |

---
*See also: `verticals/solutions.md` for complete vertical platforms.*
