# Top AI Agents & Tools — Automotive

> Open source AI agents and tools for the automotive industry. Focus: MIT / Apache 2.0 / BSD.
> Last updated: 2026-07-06

## Top Agents & Tools

| Name | Repo | License | Stars | Description |
|------|------|---------|-------|-------------|
| openpilot | [commaai/openpilot](https://github.com/commaai/openpilot) | MIT | 63k★ | Full ADAS OS for 300+ cars — adaptive cruise control + lane centering via end-to-end neural net. comma four hardware. Production-grade. |
| Autoware | [autowarefoundation/autoware](https://github.com/autowarefoundation/autoware) | Apache 2.0 | 11.8k★ | World's leading open-source AV stack on ROS2. Full perception→planning→control pipeline. Runs in CARLA, real vehicles. |
| Apollo | [ApolloAuto/apollo](https://github.com/ApolloAuto/apollo) | Apache 2.0 | 24k★ | Baidu's full-stack autonomous driving platform (v11.0). Perception, localization, planning, C++ + Python. Deployed in commercial robotaxi. |
| CARLA | [carla-simulator/carla](https://github.com/carla-simulator/carla) | MIT | 14.1k★ | Open-source autonomous driving simulator on Unreal Engine. 100+ scenarios, sensor suite, Python API. UE5 branch active. |
| DriveMLM | [OpenGVLab/DriveMLM](https://github.com/OpenGVLab/DriveMLM) | Apache 2.0 | 1.2k★ | LLM-based end-to-end AV framework. Multimodal LLM for behavior planning. 76.1 score on CARLA Town05 Long, beats Apollo baseline +4.7. |
| DriveLLM | [yaodongC/DriveLLM](https://github.com/yaodongC/DriveLLM) | MIT | 380★ | LLM agent for autonomous driving decisions via FastAPI + LangChain backend wired into ROS1/Autoware stack. |
| open-mechanic | [speed785/open-mechanic](https://github.com/speed785/open-mechanic) | MIT | 420★ | OBD-II adapter + Claude API → plain-English diagnosis and repair guides. Connects to any ELM327 Bluetooth dongle. |
| Automotive-AI | [Eloquent-Algorithmics/Automotive-AI](https://github.com/Eloquent-Algorithmics/Automotive-AI) | MIT | 310★ | Hands-free voice diagnostic assistant: GPT-4 + NLP + TTS + STT + OBD-II ELM327. Customizable for any API. |
| Eclipse SUMO | [eclipse-sumo/sumo](https://github.com/eclipse-sumo/sumo) | EPL-2.0 | 3.2k★ | Highly portable microscopic traffic simulation. Intermodal (pedestrians, bikes, vehicles). Python TraCI API for real-time control. |
| Scenic | [BerkeleyLearnVerify/Scenic](https://github.com/BerkeleyLearnVerify/Scenic) | BSD-3 | 980★ | Probabilistic programming language for scenario generation and AV testing. Integrates with CARLA, SUMO, Webots. |

## Why These Matter for Globant

- **openpilot + CARLA**: Best combo for ADAS prototyping — real-world neural net on MIT license, simulation validation
- **Autoware**: Enterprise-grade AV stack; Toyota/Honda/Renault ecosystem; ROS2 native
- **Apollo**: China market entry (Baidu ecosystem); strongest perception stack; Apache 2.0 commercial use OK
- **DriveMLM + DriveLLM**: LLM-layer on top of classic AV stacks — next-gen human-interpretable decisions
- **open-mechanic + Automotive-AI**: Quick-win for dealer/workshop digitization — OBD-II AI in < 2 weeks

---
*Auto-updated by the ingest pipeline.*
