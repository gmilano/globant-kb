# 📈 Trending Repos — Automotive AI

> What's gaining stars and commits this week. Updated: 2026-07-11 (v6)

## Top Movers (July 2026)

| Repo | License | Stars | Why It's Moving |
|------|---------|-------|----------------|
| [commaai/openpilot](https://github.com/commaai/openpilot) | MIT | 64.5k | v0.11.2 (Jun 15 2026) with new driving model, DM model, and new UI. 325+ supported vehicles. Most deployed open-source ADAS in real-world conditions. |
| [autowarefoundation/autoware](https://github.com/autowarefoundation/autoware) | Apache-2.0 | 11.8k | IEEE IV 2026 (Detroit) tutorial driving new OEM attention. Advancing end-to-end AI integration via vision_pilot track. |
| [DriveVLA/OpenDriveVLA](https://github.com/DriveVLA/OpenDriveVLA) | Apache-2.0 | ~620 | AAAI 2026 paper generating citations and forks. CVPR 2026 DriveX workshop exposure. VLA for AV is the new frontier; this is the open-source reference. |
| [metadriverse/metadrive](https://github.com/metadriverse/metadrive) | Apache-2.0 | ~1.1k | Growing adoption as lightweight CARLA alternative for RL. Stanford/UCB/CMU groups + new academic papers citing it. |
| [autowarefoundation/autoware_universe](https://github.com/autowarefoundation/autoware_universe) | Apache-2.0 | 1.7k | Active development hub — new perception and planning packages weekly. |
| [autowarefoundation/autoware_vision_pilot](https://github.com/autowarefoundation/autoware_vision_pilot) | Apache-2.0 | ~350 | Hybrid E2E AI architecture gaining attention: safety perception models + E2E performance models running in parallel. |
| [eclipse-kuksa/kuksa-databroker](https://github.com/eclipse-kuksa/kuksa-databroker) | Apache-2.0 | ~1.6k | SDV ecosystem growth — every new Eclipse SDV project integrates with Kuksa. Eclipse S-Core 1.0 pre-release work pulling activity. |
| [eclipse-lmos/lmos-platform](https://github.com/eclipse-lmos) | Apache-2.0 | ~950 | ADL 1.0 final spec published June 2026; automotive teams evaluating as orchestration standard. |
| [speed785/open-mechanic](https://github.com/speed785/open-mechanic) | MIT | ~210 | Viral in independent mechanic and fleet maintenance communities. OBD-II + Claude pattern is immediately deployable. |
| [usdot-fhwa-stol/carma-platform](https://github.com/usdot-fhwa-stol/carma-platform) | Apache-2.0 | ~580 | ROS 2 migration active. US DOT V2X interstate pilot results driving interest in cooperative driving. |
| [btc710/AutoClaw](https://github.com/btc710/AutoClaw) | MIT | ~130 | Steady growth from OpenClaw ecosystem. CarPlay/Android Auto AI copilot — first-mover still gaining community PRs. |
| [SuperdeMan/cockpit-agent](https://github.com/SuperdeMan/cockpit-agent) | Apache-2.0 | ~100 | Chinese SDV community engagement; cited in BYD-style cockpit architecture discussions on Weibo + GitHub. |

---

## Hot Subdomains This Week

### VLA (Vision-Language-Action) for AV
OpenDriveVLA and follow-on papers (DriveAgent-R1, WAM-Flow CVPR 2026, ColaVLA CVPR 2026) signal a paradigm shift: from modular perception-planning-control to unified VLA models that take vision + language commands and output actions directly. Watch [github.com/worldbench/awesome-vla-for-ad](https://github.com/worldbench/awesome-vla-for-ad) for the curated tracker.

### SDV / In-Vehicle Agents
Eclipse SDV ecosystem converging toward S-Core 1.0. All three core repos (Kuksa, Velocitas, Leda) getting concurrent commits. Signal: teams are integrating and dogfooding, not just building. ADL 1.0 final spec marks the maturity point.

### Open OBD2 AI Diagnostics
New cluster of repos combining OBD-II hardware adapters with Claude/GPT APIs for plain-English diagnostics. `open-mechanic` is the front-runner (MIT license, FastAPI + React stack). Pattern: OBD-II → pyOBD / python-OBD → LLM → structured fault analysis. Immediate LATAM dealership opportunity.

### Foundation Models for Autonomous Driving
CVPR 2026 DriveX workshop (held June 2026) generated a wave of papers + code releases targeting CARLA. Foundation model approaches replacing modular pipelines in research. Watch for code releases from WAM-Flow, ColaVLA, and SimLingo in H2 2026.

---

## Repos to Watch (Emerging, <500 stars)

| Repo | License | Stars | Watch Because |
|------|---------|-------|--------------|
| [DriveVLA/OpenDriveVLA](https://github.com/DriveVLA/OpenDriveVLA) | Apache-2.0 | ~620 | **AAAI 2026** reference VLA for AV. Growing citations. Open checkpoint. Architecture defining the next 2 years. |
| [speed785/open-mechanic](https://github.com/speed785/open-mechanic) | MIT | ~210 | Immediate Globant build-on path: OBD-II diagnostics + AI copilot for LATAM workshops |
| [eclipse-velocitas/vehicle-app-python-sdk](https://github.com/eclipse-velocitas/vehicle-app-python-sdk) | Apache-2.0 | ~180 | Python SDK for SDV Vehicle Apps — lower barrier to AI agent deployment on SDV platforms |
| [SuperdeMan/cockpit-agent](https://github.com/SuperdeMan/cockpit-agent) | Apache-2.0 | ~100 | Best open reference for cloud-edge cockpit agent architecture (BYD/NIO-style) |
| [MasoudJTehrani/PCLA](https://github.com/MasoudJTehrani/PCLA) | Apache-2.0 | ~90 | Growing use as evaluation harness paired with DriveX paper releases |

---
*Auto-updated each pipeline run. v6: Adds OpenDriveVLA, MetaDrive, open-mechanic. VLA subdomian section added.*
