# 📈 Trending AI Agents & Tools — Automotive

> What's new and gaining momentum this week. Curated for Globant AI Studios.
> Last updated: 2026-07-06

---

## 🔥 Top Story: openpilot 0.11 — World Model Breakthrough (March 2026)

comma.ai shipped **openpilot 0.11**, the first real-world robotics agent fully trained in a *learned* simulation. This is a decade-long milestone: the driving model now uses a **2B-parameter world model** trained on 2.5 million minutes of fleet video.

**What changed:**
- Previous versions trained on real-world video only; 0.11 uses synthetic rollouts from the world model
- Experimental mode adoption hit record highs immediately after nightly release (Jan 19, 2026)
- Idle power draw on comma four dropped 77% (225 mW → 52 mW)
- 0.11.2 released June 15, 2026 with further refinements

**Why it matters for Globant:** The learned-sim approach lets OEMs generate training data for rare edge-case scenarios (weather, near-miss) without real-world collection. This unlocks AV training at any scale.

Repos: [commaai/openpilot](https://github.com/commaai/openpilot) · MIT

---

## 🚀 NVIDIA Alpamayo Ecosystem Launch (CES 2026 + March 2026)

NVIDIA announced the **Alpamayo family** at CES 2026 — the industry's first open reasoning Vision-Language-Action (VLA) model for autonomous driving. Alpamayo 1.5 shipped in March 2026.

**Key components:**
| Component | Repo | License | Notes |
|-----------|------|---------|-------|
| Alpamayo model weights | [NVlabs/alpamayo](https://github.com/NVlabs/alpamayo) | Non-commercial (research) | Foundation VLA for AV reasoning |
| AlpaSim simulator | [NVlabs/alpasim](https://github.com/NVlabs/alpasim) | Apache-2.0 | Open evaluation framework |
| Autoware integration | [autowarefoundation/alpamayo-autoware](https://github.com/autowarefoundation/alpamayo-autoware) | Apache-2.0 | Plug Alpamayo into Autoware |

**Adoption:** Jaguar Land Rover, Lucid Motors, and Uber have all signed on. Uber plans robotaxi deployment in 2026 using Alpamayo reasoning backbone.

**Note on license:** Alpamayo model weights are non-commercial (research only). AlpaSim (the simulator) is Apache-2.0 and fully buildable-on. Commercial AV products should use AlpaSim + their own trained weights.

---

## 📡 Autoware: End-to-End AI + IEEE IV 2026 Workshop (June 2026)

The Autoware Foundation announced an initiative to integrate **end-to-end AI models** (starting with the AutoDrive E2E model) directly into the Autoware stack, targeting production-grade Level 2+ autonomy for automotive OEMs. Optimization partnership with AMD Instinct GPUs.

The full-day Autoware Tutorial & Workshop at **IEEE IV 2026** (Detroit) covered: map-less navigation, E2E driving, adverse weather perception, connected vehicles.

Repos: [autowarefoundation/autoware](https://github.com/autowarefoundation/autoware) · Apache-2.0

---

## 🏗️ Eclipse S-CORE 0.5 — First SDV Runtime Release (November 2025)

**Eclipse S-CORE** hit its first public release (v0.5) in November 2025, marking a key milestone in the Eclipse SDV ecosystem's mission to create a fully open, AUTOSAR-aligned runtime for software-defined vehicles. Full release planned for 2026.

The broader **Eclipse SDV Working Group** now includes 50+ member companies; the MoU for open SDV collaboration grew from 11 to 32 signatories.

Key SDV repos gaining traction:
- [eclipse-kuksa/kuksa-databroker](https://github.com/eclipse-kuksa/kuksa-databroker) — Rust VSS broker, Apache-2.0
- Eclipse Leda — Yocto-based SDV.EDGE build system, Apache-2.0

---

## 🚗 In-Vehicle Cockpit AI Agents Rising

A new class of **agentic cockpit systems** is emerging — multi-LLM orchestration running at the vehicle edge:

- **LG AI Cabin Platform** (2026) — on-device generative AI on Qualcomm Snapdragon Cockpit Elite. Analyzes internal cabin cameras + external environment in real-time, no cloud dependency
- **KPIT Agentic AI Suite** — built on GenAI + Microsoft Foundry for model orchestration inside vehicle ECUs
- **[cockpit-agent](https://github.com/SuperdeMan/cockpit-agent)** — community project: cloud-edge multi-agent system for intelligent cockpit (Chinese market), LLM planning + vehicle control VAL safety execution

**Pattern to watch:** Edge LLM (Llama 3.2 3B / Phi-3 Mini) + KUKSA databroker + voice NLP = privacy-preserving in-car AI that works offline.

---

## 📊 Trending GitHub Repos This Week

| Repo | Stars | Trend | Notes |
|------|-------|-------|-------|
| [commaai/openpilot](https://github.com/commaai/openpilot) | ~50k | ▲▲ | 0.11.2 release |
| [autowarefoundation/autoware](https://github.com/autowarefoundation/autoware) | ~11.7k | ▲ | IEEE IV 2026 workshop |
| [NVlabs/alpasim](https://github.com/NVlabs/alpasim) | ~1k | ▲▲ | NVIDIA ecosystem push |
| [eclipse-kuksa/kuksa-databroker](https://github.com/eclipse-kuksa/kuksa-databroker) | ~500 | ▲ | SDV momentum |
| [autowarefoundation/autoware_vision_pilot](https://github.com/autowarefoundation/autoware_vision_pilot) | ~500 | ▲▲ | Map-less AV gaining interest |
| [traccar/traccar](https://github.com/traccar/traccar) | ~5k | → | Stable, widely deployed |

---
*Pipeline automático — se actualiza cada hora.*
