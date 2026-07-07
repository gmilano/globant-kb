# GitHub Trending — Automotive AI (2026-07-07)

> Repos gaining momentum this week. Signals of what builders are excited about.

## High-Velocity Repos

| Repo | License | Stars | Velocity | Why It's Trending |
|------|---------|-------|----------|-------------------|
| [autowarefoundation/autoware_universe](https://github.com/autowarefoundation/autoware_universe) | Apache-2.0 | 1.7k | ↑ active | Core Autoware component gaining forks after Mobileye integration announcement; new ROS 2 Humble releases |
| [autowarefoundation/autoware](https://github.com/autowarefoundation/autoware) | Apache-2.0 | 11.8k | ↑ +200/wk | Updated June 25 2026; SDV wave driving evaluations by OEMs |
| [commaai/openpilot](https://github.com/commaai/openpilot) | MIT | ~52k | ↑ steady | NVIDIA Alpamayo announcement triggering community discussion on next-gen ADAS |
| [ApolloAuto/apollo](https://github.com/ApolloAuto/apollo) | Apache-2.0 | ~26k | ↑ active | Updated April 2026; new routing + prediction module commits |
| [MasoudJTehrani/PCLA](https://github.com/MasoudJTehrani/PCLA) | Apache-2.0 | 77 | ↑ new | Framework for testing autonomous agents in CARLA — agentic sim-testing pattern gaining attention |
| [SuperdeMan/cockpit-agent](https://github.com/SuperdeMan/cockpit-agent) | — | new | ↑ rising | Cloud-edge multi-agent system for smart cockpits; LLM planning + vehicle control + HMI streaming |
| [zubairm8580/InterFuser-UI](https://github.com/zubairm8580/InterFuser-UI) | Apache-2.0 | 1 | ↑ new | Real-time CARLA driving visualization with Pygame — useful for AD research dashboards |
| [vaisakhvenugopal/Deconstructing-BYD-s-Technology-Architecture](https://github.com/vaisakhvenugopal/Deconstructing-BYD-s-Technology-Architecture) | — | new | ↑ interest | Deep-dive into BYD's SDV + AI-DV strategy; referenced in automotive AI circles |
| [Eloquent-Algorithmics/Automotive-AI](https://github.com/Eloquent-Algorithmics/Automotive-AI) | Apache-2.0 | growing | ↑ new | Hands-free AI for mobile automotive diagnostic businesses; integrates APIs for 2-way interaction while driving |
| [Divyeshpratap/A.I.-AutoInspector](https://github.com/Divyeshpratap/A.I.-AutoInspector) | MIT | ~180 | ↑ stable | CV + Gen AI damage assessment; consistently cited in automotive insurance AI discussions |

## Emerging Signals

### Signal 1: Smart Cockpit Agents (2026 breakout theme)
The `cockpit-agent` pattern — cloud-edge multi-agent with LLM planning + in-vehicle control execution — is being replicated by multiple teams in China (BYD, SAIC) and Europe (Bosch, Continental). Expect this to become a standard architecture pattern by Q4 2026.

### Signal 2: CARLA-as-Agent-Testbed
Repos pairing CARLA with LangGraph or CrewAI for agentic scenario testing (PCLA, carla-agent-benchmark forks) are multiplying. The pattern: LLM agent drives scenario design → CARLA executes → vision model evaluates outcomes.

### Signal 3: CAN Bus × MCP Experiments
Several labs are publishing experiments connecting Model Context Protocol (MCP) servers to vehicle OBD-II/CAN bus. The goal: expose vehicle telemetry as tool-calls so an LLM agent can reason about vehicle state in real language. Still early (< 100 stars each) but conceptually important.

### Signal 4: Open-Source BEV Perception Models
Bird's-eye-view (BEV) perception models (NuScenes-trained) are moving from research to repo. Multiple Apache/MIT releases enabling camera-only L2+ perception without expensive LiDAR — directly relevant to retrofitting AI onto commercial fleets.

---
*Auto-updated by the ingest pipeline.*
