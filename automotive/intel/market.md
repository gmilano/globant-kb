# Market Map — Automotive AI

> Players, opportunities, positioning. LATAM + global focus.
> Last updated: 2026-07-06

## Market Size

| Source | 2025/2026 | Target Year | Projection | CAGR |
|--------|-----------|-------------|------------|------|
| Fortune Business Insights | $14.99B (2026) | 2034 | $51.68B | 16.7% |
| Markets and Markets | $18.83B (2025) | 2032 | $75.02B | 21.8% |
| Vynz Research | $15.8B (2025) | 2035 | $69.8B | 15.5% |
| Precedence Research | $5.80B (2026) | 2035 | $58.99B | 28.76% |
| IDTechEx (SDV SW revenue) | — | 2035 | +30-34% CAGR | 30-34% |

**Consensus range**: $15–19B in 2026 → $52–75B by 2032-2035. **Strong buy signal** across all forecasters.

## Global Players

| Company | Type | AI Strength | Open Source? | Notes |
|---------|------|-------------|--------------|-------|
| **Tesla** | OEM + tech | FSD v13, Dojo supercomputer, end-to-end neural net | No | Closed stack; regulatory friction in EU/China |
| **NVIDIA** | Chip + platform | Alpamayo (10B param L4 model), DRIVE platform | Partial | Drives Autoware integrations; partners with JLR/Lucid/Uber |
| **Baidu** | Tech + robotaxi | Apollo platform (Apache 2.0), RT6 robotaxi | Yes (Apollo) | Commercial robotaxi in China; strongest open AV platform |
| **Waymo** | Robotaxi | Waymo Open Dataset | Data only | Phoenix/SF commercial ops; raising $5.6B (2025) |
| **Motional** | Robotaxi | — | No | Uber robotaxi Las Vegas 2026; Hyundai Ioniq 5 fleet |
| **comma.ai** | ADAS hardware/SW | openpilot (MIT), neural net ADAS | Yes (MIT) | $999 device; 300+ car support; best consumer open ADAS |
| **Tier IV** | AV stack | Autoware (Apache 2.0) | Yes | Japan; commercializing Autoware for real deployments |
| **BYD** | OEM + tech | Vertical AI integration, DiLink OS | No | Fastest growing EV brand; SDV-native architecture |
| **Continental** | Tier-1 supplier | ADAS sensors + ECUs | Partial | Moving to software-first (SDV) in 2026 |
| **Mobileye** | ADAS chips | EyeQ chips + RSS model | No | Public (MBLY); dominant ADAS chip market |
| **Qualcomm** | Chip | Snapdragon Ride, AAOS SDV partnership | Partial | Google AAOS SDV collaboration |
| **Renault** | OEM | Software Defined Vehicle (partnership Google/AAOS) | No | First major EU OEM to commit to AAOS SDV |

## AI Sub-Segments

| Segment | Key Players | Open Source Opportunity |
|---------|-------------|------------------------|
| **Autonomous Driving** | Tesla, Waymo, Baidu, comma.ai | openpilot, Apollo, Autoware |
| **ADAS (L1-L2+)** | Mobileye, Continental, Bosch | openpilot, Autoware vision_pilot |
| **In-cabin AI** | Cerence, SoundHound, Amazon | cockpit-agent, whisper + LangGraph |
| **Fleet Management** | Samsara, Fleetio, Verizon Connect | Fleetbase, fleetms, Odoo |
| **Vehicle Diagnostics** | Bosch, Delphi, Snap-on | open-mechanic, Automotive-AI |
| **Simulation/Testing** | Ansys, dSPACE, IPG | CARLA, SUMO, Scenic, PCLA |
| **SDV Middleware** | BlackBerry QNX, Green Hills | AGL SoDeV, Android AAOS SDV |
| **Predictive Maintenance** | IBM, SAP, Siemens | LangGraph + OBD-II pattern |

## AI Opportunities in LATAM

| Opportunity | Why LATAM | Recommended Stack |
|-------------|-----------|-------------------|
| **Independent Workshop Digitization** | 10x more independent shops than dealer networks in LATAM; almost zero AI adoption | open-mechanic + WhatsApp + Claude |
| **Fleet AI for Logistics** | LATAM logistics boom post-ecommerce; growing fleets in BR/MX/CO | Fleetbase + LangGraph + OSRM |
| **Dealer DMS Modernization** | LATAM auto dealers run legacy DMS (CDK, Reynolds); fragmented market ripe for AI | Odoo dealer + AI service agent |
| **Shared Mobility AI** | Uber/Cabify/99 dominance; route optimization + demand forecasting | SUMO simulation + RL agent |
| **EV Charging Optimization** | EV growth in Brazil (ABVE: +120% 2025); charging infrastructure gaps | ev-charging-optimization + RL |
| **Road Safety AI (V2X)** | Brazil/Mexico have high road fatality rates; government funding available | SUMO + V2X simulation + CARLA |

## Globant Positioning

**Globant should lead with:**
1. **Fleet AI Platform** — Fleetbase + LangGraph + Claude → conversational fleet ops (nearest driver, fuel alerts, maintenance scheduling). Quick-to-POC (3-4 weeks), clear ROI.
2. **Workshop AI Diagnostics** — OBD-II + open-mechanic + Claude → plain-Spanish repair guidance for independent mechanics. Massive LATAM TAM.
3. **AV Testing Pipeline** — CARLA + DriveMLM + PCLA → AI-generated test scenarios for ADAS QA. Relevant for OEM/Tier-1 clients.
4. **In-Cabin AI Agent** — LangGraph + Whisper + Claude + vehicle API → hands-free, voice-driven vehicle AI. Sell to OEMs or fleet operators.

**Key differentiator**: open-source stack (MIT/Apache) + Claude API gives Globant a deployable, commercially licensable solution without royalty exposure.
