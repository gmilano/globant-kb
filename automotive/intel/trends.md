# 📡 Trends — Automotive AI

> Technology and market trends. Updated: 2026-07-11

## T1 — AI-Defined Vehicle (AIDV) Replaces SDV Narrative

**Signal strength: 🔴 Critical**

At CES 2026, the dominant story shifted from "software-defined vehicles" (SDV) to **AI-defined vehicles** (AIDV). Competitive advantage now determined by the ability to deploy, validate, monitor, update, and monetize AI safely at scale across the full vehicle lifecycle.

> "Vehicles can learn, adapt and improve continuously — monitoring health, analyzing road conditions, recognizing occupants, launching personal assistants." — Qualcomm CES 2026

**Implication for Globant:** Clients asking for SDV work are actually asking for AI-defined vehicle capabilities. Frame engagements around AIDV, not SDV.

---

## T2 — In-Vehicle Multi-Agent Orchestration

**Signal strength: 🔴 Critical**

Orchestrators are the new buzzword. Qualcomm's Snapdragon Chassis Agents (announced CES 2026) combine agentic frameworks with on-device inference to orchestrate multiple in-vehicle agents across cockpit, connectivity, ADAS, and cloud. Eclipse LMOS provides the open-source equivalent architecture.

**Key pattern:** Conversational AI → Intent classification → Agent router → Domain agents (navigation, media, climate, vehicle control) → VSS/VAL execution layer → Streaming HMI response.

---

## T3 — Foundation Models for Autonomous Driving

**Signal strength: 🟡 Emerging (→ Critical 2027)**

Foundation model architectures (LLMs + Vision Transformers) are being applied to end-to-end autonomous driving — replacing modular perception-planning-control pipelines with unified models. DriveX workshop at CVPR 2026 is the leading research venue. Autoware Foundation's `autoware_vision_pilot` is the first commercially-aligned open-source implementation.

---

## T4 — Agentic Predictive Maintenance

**Signal strength: 🔴 Critical**

AI agents that monitor CAN bus / telematics signals and predict failures 48-72 hours (or 3 weeks) in advance with 90%+ accuracy. Moving from rule-based OBD alerts to continuous LLM-powered reasoning over sensor time series.

**Open-source stack:** Kuksa Databroker (signal stream) + InfluxDB (time series) + LangGraph agent (reasoning) + notification system.

---

## T5 — Agentic Dealer & Service Operations

**Signal strength: 🔴 Critical**

Fastest-growing ROI segment. AI agents for: 24/7 lead qualification, warranty fraud detection, inventory-aware ordering, service appointment scheduling, customer sentiment analysis post-service. Mid-size OEM ROI: $140-287M annual savings vs $17-30M implementation cost.

**Open-source stack:** Odoo CE (DMS foundation) + LangGraph agents + RAG on service history + WhatsApp/web widget.

---

## T6 — Fleet Management Agentic AI

**Signal strength: 🔴 High**

Three waves converging: agentic AI systems (plan + execute + self-correct), factory OEM telematics (shipped in 90%+ new vehicles), edge AI inference (real-time without cloud latency). Fleet agents for: real-time route optimization, predictive maintenance dispatch, driver behavior coaching, EV charging coordination.

---

## T7 — V2X (Vehicle-to-Everything) AI

**Signal strength: 🟡 Emerging**

CARMA Platform's ROS 2 migration and US DOT deployments represent the leading open-source V2X implementation. Smart city projects in Latin America (São Paulo, CDMX) and Asian markets are early adopters. V2X agents coordinate intersection management, emergency vehicle preemption, freight platooning.

---

## T8 — Over-the-Air Feature Monetization

**Signal strength: 🟡 High**

Industry leaders are industrializing SDV architectures to transition vehicles from depreciating hardware assets into high-margin service nodes. OTA updates enable feature unlocking (subscriptions), performance upgrades, and safety patches. Eclipse Velocitas + OTA update frameworks enable Globant to build feature-as-a-service platforms.

---

## T9 — Simulation as AI Training Infrastructure

**Signal strength: 🟡 High**

CARLA (MIT, 14.1k stars) + Unreal Engine 5.5 branch enables photorealistic synthetic data generation for training perception and planning models. Scale: generate millions of edge cases in simulation that would take years to encounter on real roads.

---

## T10 — AUTOSAR to SDV Migration

**Signal strength: 🟡 High**

Traditional Tier-1 suppliers (Continental, Bosch) are migrating from AUTOSAR Classic (decades-old) to AUTOSAR Adaptive + Eclipse SDV. This migration creates massive services opportunity: code porting, validation, AI integration into migrated systems.

---

## T11 — Android Automotive OS SDV Expansion

**Signal strength: 🟡 Emerging → High**

Google + Qualcomm announced partnership to deliver turnkey pre-integrated AAOS SDV stack. Google plans open-source SDV platform release H2 2026. AAOS SDV will bring Google's app ecosystem directly into SDV architecture — major shift for in-vehicle software.

---

## T12 — Edge AI Inference Without Cloud Latency

**Signal strength: 🔴 Critical**

Safety-critical vehicle functions cannot tolerate cloud round-trip latency. Edge AI chips (Qualcomm Snapdragon, NVIDIA DRIVE Thor) enabling sub-millisecond inference on-vehicle. Architecture: fast edge inference for safety actions, cloud LLM for planning and personalization. Eclipse LMOS's cloud-edge pattern reflects this.

---

## T13 — LLM-Powered Vehicle Cockpit Assistants

**Signal strength: 🔴 High**

BYD, NIO, Mercedes EQS, and BMW iDrive 9 all shipping LLM-based cockpit assistants. The open-source equivalent: AutoClaw (CarPlay/Android Auto) + locally-run Llama/Mistral for privacy. Chinese OEMs leading in cockpit AI velocity.

---

## T14 — Digital Twins for Automotive Manufacturing

**Signal strength: 🟡 High**

NVIDIA Omniverse + factory digital twins for automotive production lines. AI agents simulate production changes, detect bottlenecks, and orchestrate robotic workflows. Microsoft Azure Digital Twins also active in LATAM manufacturing clients.

---

## T15 — Supply Chain AI Agents

**Signal strength: 🟡 High**

Post-COVID chip shortage trauma driving investment in AI-powered supply chain visibility and resilience. Agents that monitor supplier signals, predict disruptions 2-4 weeks out, and automatically trigger procurement actions. ERPNext + LangGraph is the open-source foundation.

---

## Trend Radar Summary

| Trend | Horizon | Open Source Ready | Globant Action |
|-------|---------|-------------------|----------------|
| T1 AIDV narrative | Now | Eclipse SDV | Reframe all SDV pitches |
| T2 Multi-agent cockpit | Now | LMOS + Kuksa | Pattern P1 |
| T3 Foundation models for AV | 2027 | Autoware vision_pilot | Monitor/contribute |
| T4 Predictive maintenance | Now | Kuksa + LangGraph | Pattern P3 |
| T5 Dealer agents | Now | Odoo + LangGraph | Pattern P4 |
| T6 Fleet AI | Now | OpenRemote + LangGraph | Pattern P5 |
| T7 V2X AI | 2027 | CARMA Platform | Pattern P7 |
| T8 OTA feature monetization | Now | Velocitas + LMOS | Pattern P2 |
| T9 AV simulation | Now | CARLA + PCLA | Pattern P6 |
| T10 AUTOSAR migration | Now | Eclipse SDV | Services play |
| T11 AAOS SDV | 2026 H2 | AAOS open planned | Watch |
| T12 Edge AI | Now | Ollama + Kuksa | All patterns |
| T13 LLM cockpit | Now | AutoClaw | Pattern P1 |
| T14 Digital twins | 2027 | Omniverse (proprietary) | Partner play |
| T15 Supply chain agents | Now | ERPNext + LangGraph | Pattern P8 |
