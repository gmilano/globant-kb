# 🗺️ Market Intelligence — Automotive AI

> Key players, market map, positioning. Focus: LATAM + global.
> Last updated: 2026-07-11

## Market Size (2026)

| Segment | 2026 Size | 2030 Projection | CAGR |
|---------|-----------|-----------------|------|
| Automotive AI (broad) | $27.3B | $78.1B | 23.4% |
| Automotive AI Agents (specific) | $4.0B | $10.3B (2035) | 11.1% |
| Connected Vehicles (data/services) | $125B ecosystem | $350B+ | ~29% |
| Autonomous Driving Software | $18.8B | $38.5B | 15.3% |

**Key stat:** 99% of automotive executives surveyed in 2026 view agentic AI as essential to their monetization strategy. Industry has pivoted from "build software-defined vehicles" to "AI-defined vehicles" as the central narrative at CES 2026.

---

## Global Player Map

| Company | Type | AI Positioning | Open Source Posture |
|---------|------|---------------|---------------------|
| **Qualcomm** | Silicon / Platform | Snapdragon Digital Chassis + Chassis Agents; $1.1B automotive revenue, $45B design wins | SDK planned open; platform proprietary |
| **NVIDIA** | Silicon / Platform | DRIVE Thor SoC, Omniverse simulation, DRIVE OS for AV stacks | NeMo (Apache-2.0), TensorRT (Apache-2.0); platform proprietary |
| **Google / Android** | Platform | Android Automotive OS SDV expansion; AAOS open-source SDV stack H2 2026 | AAOS partially open; SDV layer planned Apache-2.0 |
| **Comma.ai** | Software / Hardware | openpilot — fully open ADAS; comma 3X device $999. 300M miles | 100% MIT open source — the model |
| **Autoware Foundation** | Non-profit / OSS | World's leading open AV stack; 100+ corporate members | 100% Apache-2.0 |
| **Eclipse Foundation** | Non-profit / OSS | Eclipse SDV ecosystem: Kuksa, Velocitas, LMOS, Leda, S-Core | 100% Apache-2.0 |
| **Waymo** | AV Operator | Commercial robotaxi San Francisco / Phoenix / Austin / Tokyo | Proprietary stack; Open Dataset only |
| **Tesla** | OEM | FSD v13+, Dojo supercomputer; "AI-defined vehicle" originator | Closed |
| **BYD** | OEM | #1 EV by sales; heavy in-vehicle AI investment; cockpit-agent style architecture | Partially open (DiLink SDK) |
| **Continental / Bosch** | Tier-1 | AUTOSAR-based SDV components; AI middleware integration | AUTOSAR Adaptive (open spec, proprietary impl) |
| **Microsoft** | Cloud | Azure OpenAI for automotive; CES 2026 showcase partner | Azure SDK open-source; models proprietary |
| **Amazon / AWS** | Cloud | Bedrock AgentCore for fleet management; Zoox AV | AWS SDKs MIT/Apache |

---

## Key Recent Moves (H1 2026)

- **Qualcomm + Google**: Partnership for turnkey pre-integrated AAOS SDV stack on Snapdragon Digital Chassis (CES 2026). Google plans open-source SDV platform release H2 2026.
- **Eclipse Foundation**: Launched Agent Definition Language (ADL) — industry's first open standard for defining AI agents. Positions Eclipse LMOS as neutral orchestration layer.
- **Comma.ai openpilot**: Hit 300+ supported vehicles milestone; 300M total miles driven. Fastest-growing ADAS open-source community.
- **Autoware Foundation**: Launched `autoware_vision_pilot` — L2 ADAS stack for consumer vehicles. Lower barrier to OEM adoption.
- **DriveX Workshop @ CVPR 2026**: Foundation model papers for autonomous driving signaling convergence of LLM + AV research.

---

## LATAM Opportunity Map

| Opportunity | Gap | Why Globant | Est. Value |
|-------------|-----|-------------|-----------|
| **Dealer AI Agent** (LATAM DMS) | No production-ready open-source DMS with AI layer for Spanish-speaking dealerships | Odoo expertise + LATAM deployment base | $60-150k per engagement |
| **Fleet Management AI** (LATAM trucking) | LatAm trucking fleets (LATAM is 2nd largest truck market) lack agentic dispatch/maintenance AI | Existing logistics clients (DHL LATAM, etc.) | $80-250k |
| **V2X for LATAM smart cities** | Brazilian and Mexican smart city programs (São Paulo, CDMX) don't have open-source V2X AI | CARMA Platform + LATAM public sector relationships | $200-500k per city |
| **SDV training/enablement** | OEMs entering LATAM (Chery, BYD, GWM) need SDV software teams | Eclipse SDV stack expertise = staffing/training | $40-80k/engagement |
| **In-car AI Spanish NLP** | No production-quality Spanish-language in-car LLM assistant tuned to LATAM dialects | AutoClaw + fine-tuned Spanish LLM | $50-120k |

---

## Competitive Positioning for Globant

**Strengths to leverage:**
1. Eclipse SDV technical expertise (open-source, non-lock-in pitch)
2. LATAM fleet / logistics client network
3. Full-stack capability: embedded (Velocitas Vehicle Apps) → cloud (LMOS agents) → UX
4. Non-OEM neutral partner — can work across Toyota, VW, BYD, Ford LATAM

**Win themes:**
- "We build on your existing open-source investments" (Eclipse SDV, Autoware) — no vendor lock-in
- "We have the LATAM context" — Spanish NLP, LATAM regulation, payment infrastructure
- "We are production-ready" — openpilot patterns, real miles, not just POC

---
*See `intel/trends.md` for technology trend detail.*
