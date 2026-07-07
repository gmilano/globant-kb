# Foundational Repos — Automotive

> The bedrock repositories to build on. Open license, active community, production-proven.
> Last updated: 2026-07-07

## Autonomous Driving & Simulation

| Repo | License | Stars | Description | Build-on potential |
|------|---------|-------|-------------|-------------------|
| [commaai/openpilot](https://github.com/commaai/openpilot) | MIT | ~52k | Operating system for robotics / ADAS. Runs on 300+ vehicle models. Production-grade lane keeping + adaptive cruise. Python core. | High — add LLM-powered scene narration, driver monitoring agents |
| [ApolloAuto/apollo](https://github.com/ApolloAuto/apollo) | Apache-2.0 | ~26k | Baidu's L4 autonomous driving platform. Full perception → planning → control pipeline. Cyber RT middleware. | High — extend with LLM-based mission planning and edge cases |
| [autowarefoundation/autoware](https://github.com/autowarefoundation/autoware) | Apache-2.0 | ~11.8k | World's leading open-source AD stack, built on ROS 2. Production-deployed in 30+ vehicle types across 20 countries. | High — ROS 2 ecosystem; add AI planners via ROS nodes |
| [carla-simulator/carla](https://github.com/carla-simulator/carla) | MIT | ~14.1k | Open-source autonomous driving simulator in Unreal Engine. Photorealistic environments, Python+C++ API, sensor suite. | High — primary training/validation platform; pair with openpilot or Autoware |
| [carla-simulator/ros-bridge](https://github.com/carla-simulator/ros-bridge) | MIT | ~637 | ROS/ROS 2 bridge for CARLA. Connects simulation sensors (camera, LiDAR, radar) to ROS 2 nodes. | Medium — glue layer for CARLA + Autoware integration |
| [erdos-project/pylot](https://github.com/erdos-project/pylot) | Apache-2.0 | ~534 | Modular AD platform running on CARLA and real-world vehicles. Separates perception, prediction, planning, control into composable components. | High — good reference architecture for modular AI agent composition |

## Fleet Management & Telematics

| Repo | License | Stars | Description | Build-on potential |
|------|---------|-------|-------------|-------------------|
| [traccar/traccar](https://github.com/traccar/traccar) | Apache-2.0 | ~5.2k | Real-time GPS tracking server. 200+ protocols, 2000+ device models, REST API, geofencing, trip reporting. Java backend. | High — add ML anomaly detection, route optimization AI, predictive alerts |
| [fleetbase/fleetbase](https://github.com/fleetbase/fleetbase) | AGPL-3.0 | ~1.1k | Modular logistics + fleet OS. Fleet management, route optimization, warehouse ops, e-commerce delivery. Laravel + Vue.js. | High — add AI dispatching agents, ETA prediction, cost forecasting |

## Computer Vision & Inspection

| Repo | License | Stars | Description | Build-on potential |
|------|---------|-------|-------------|-------------------|
| [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) | AGPL-3.0 | ~45k | YOLOv8/v11 — fastest production-grade object detection. Runs on edge (Jetson, RPi). | High — power automotive visual inspection; detects defects, pedestrians, road signs |
| [Divyeshpratap/A.I.-AutoInspector](https://github.com/Divyeshpratap/A.I.-AutoInspector) | MIT | ~180 | Vehicle damage assessment via CV + Gen AI chatbot. YOLO-based defect localization + GPT-powered Q&A on damage reports. | High — extend with multi-car batch processing, insurance API integration |

## EV & Energy Infrastructure

| Repo | License | Stars | Description | Build-on potential |
|------|---------|-------|-------------|-------------------|
| [TUMFTM/REVOL-E-TION](https://github.com/TUMFTM/REVOL-E-TION) | Apache-2.0 | ~16 | Site-level energy system optimization for EV fleet charging. Investigates charging strategies and grid impact. Python. | High — add RL-based smart charging agent; connect to real grid API |
| [philippnormann/ev-charging-optimization](https://github.com/philippnormann/ev-charging-optimization) | MIT | ~20 | RL simulation for finding shortest charging routes for EVs. Gym-compatible environment. | Medium — baseline for routing agent development |

## Manufacturing & Robotics

| Repo | License | Stars | Description | Build-on potential |
|------|---------|-------|-------------|-------------------|
| [microsoft/agentic-factory-hack](https://github.com/microsoft/agentic-factory-hack) | MIT | ~60 | Multi-agent predictive maintenance orchestration with LangGraph + Azure AI. Reference architecture for factory AI agents. | High — adapt to automotive body-shop or press-shop equipment monitoring |

## Dependency Map (Quick-Start Stack)

```
Autonomous Driving Stack
├── carla-simulator/carla          ← simulation environment
│   └── carla-simulator/ros-bridge ← ROS 2 bridge
├── autowarefoundation/autoware    ← full AD software stack
│   └── erdos-project/pylot        ← modular perception/planning research
└── commaai/openpilot              ← consumer ADAS (MIT, deployable today)

Fleet Ops Stack
├── traccar/traccar                ← GPS backbone
│   └── [LangGraph agent layer]   ← add AI anomaly detection here
└── fleetbase/fleetbase            ← logistics OS
    └── [route optimization AI]   ← add ML dispatch agents here

Visual Inspection Stack
├── ultralytics/ultralytics        ← YOLO object detection
├── A.I.-AutoInspector             ← end-to-end damage assessment demo
└── [agentic-factory-hack pattern] ← multi-agent orchestration for inspection lines
```

---
*See also: `verticals/solutions.md` for full vertical platforms.*
