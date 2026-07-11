# 🏭 Vertical Platforms — Automotive

> Existing open-source platforms to customize with AI. Start from something functional, add the agentic layer.
> Last updated: 2026-07-11 (v6)

## Platform Decision Tree

```
What does the client need?
├── Vehicle operations / in-car AI        → Eclipse SDV Stack (Kuksa + Velocitas + LMOS)
├── Dealer management / sales CRM         → Odoo Community (LGPL) or ERPNext
├── Fleet management / logistics          → OpenRemote + LangGraph agents
├── Manufacturing / supply chain          → ERPNext (Frappe) automotive module
├── Autonomous driving / ADAS development → openpilot or Autoware
├── End-to-end AV / VLA model             → OpenDriveVLA (fine-tune on local data)
├── Simulation / testing (photorealistic) → CARLA + PCLA
├── Simulation / testing (fast RL)        → MetaDrive + gym-carla
├── OBD2 AI diagnostics / workshop tools  → open-mechanic (MIT) + Claude API
└── V2X / cooperative driving             → CARMA Platform + carma-cloud
```

---

## Recommended Platforms by Domain

### 1. Eclipse SDV Stack — In-Vehicle AI Platform
| Component | License | URL | Purpose |
|-----------|---------|-----|---------|
| Eclipse Kuksa | Apache-2.0 | [eclipse-kuksa](https://github.com/eclipse-kuksa) | Vehicle signal bus (VSS) — reads speed, steering, ADAS state |
| Eclipse Velocitas | Apache-2.0 | [eclipse-velocitas](https://github.com/eclipse-velocitas) | Vehicle App containerized deployment toolchain |
| Eclipse Leda | Apache-2.0 | [eclipse-leda](https://github.com/eclipse-leda) | SDV quick-start distro with pre-integrated Kuksa + Velocitas |
| Eclipse LMOS | Apache-2.0 | [eclipse-lmos](https://github.com/eclipse-lmos) | Multi-agent orchestration layer (cloud + edge); ADL 1.0 final spec June 2026 |

**AI Customization:** Deploy LLM-based agents as Velocitas Vehicle Apps. Agents subscribe to Kuksa VSS signals, run LLM inference (Ollama on edge, Claude/GPT in cloud), execute vehicle actions via VSS write API. ADL defines agent capabilities in a vendor-neutral format.

**2026 status:** Eclipse S-Core 1.0 (production SDV OS) planned 2026; S-Core 0.5 released Nov 2025. ADL 1.0 final spec published. Kuksa + Velocitas integration stable.

---

### 2. Odoo Community — Dealer & Workshop Management
| Platform | License | URL | Stack |
|----------|---------|-----|-------|
| Odoo Community | LGPL-3 | [odoo/odoo](https://github.com/odoo/odoo) | Python/PostgreSQL, modular ERP |

**Key Odoo modules for automotive:**
- Fleet Management (`fleet`) — vehicle tracking, maintenance scheduling, fuel log
- CRM (`crm`) — dealer sales pipeline, lead management
- Repair Orders (`repair`) — workshop service orders, parts inventory
- Purchase + Inventory — parts procurement, stock management

**AI Customization path:**
1. Deploy Odoo CE 17+ with fleet + crm + repair modules
2. Add LangChain + Odoo XMLRPC integration (Python)
3. Build LangGraph agents that read/write Odoo data via XMLRPC API
4. Surface via Odoo chatbot widget or WhatsApp integration
5. Integrate `open-mechanic` diagnostics layer for workshop OBD2 data

**Cost model:** ~$40-80k for Odoo + AI layer vs $200-400k for proprietary DMS.

---

### 3. ERPNext / Frappe — Automotive Manufacturing ERP
| Platform | License | URL | Stack |
|----------|---------|-----|-------|
| ERPNext | GPL-3 | [frappe/erpnext](https://github.com/frappe/erpnext) | Python/MariaDB, Frappe Framework |
| Frappe Framework | MIT | [frappe/frappe](https://github.com/frappe/frappe) | Low-code platform underlying ERPNext |

**Key capabilities for automotive manufacturing:**
- BOM (Bill of Materials) management for vehicle components
- Work Order and production scheduling
- Quality Control inspections
- Supplier chain management
- Vehicle serial number tracking

**AI Customization:** Frappe's REST API + webhooks enable LangGraph agents for predictive maintenance scheduling, QC anomaly detection, and supply chain disruption alerting.

---

### 4. OpenRemote — IoT / Connected Vehicle Platform
| Platform | License | URL | Stack |
|----------|---------|-----|-------|
| OpenRemote | AGPL-3 | [openremote/openremote](https://github.com/openremote/openremote) | Java/TypeScript, rule engine, MQTT |

**Use case for automotive:** Fleet IoT platform. Connect vehicle telematics (OBD-II, CAN bus data via Kuksa) to OpenRemote's asset management, alerting rules, and dashboard. Add AI agents for predictive maintenance anomaly detection and fleet dispatch optimization.

---

### 5. Apache OFBiz — ERP/CRM/Supply Chain
| Platform | License | URL | Stack |
|----------|---------|-----|-------|
| Apache OFBiz | Apache-2.0 | [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Java, fully modular ERP |

**Use case:** Larger automotive suppliers or OEM back-office needing integrated ERP + CRM + SCM. Apache license means true commercial freedom. Less modern UX than Odoo but deeper supply chain capabilities.

---

### 6. openpilot — Production ADAS Platform
| Platform | License | URL | Stack |
|----------|---------|-----|-------|
| openpilot | MIT | [commaai/openpilot](https://github.com/commaai/openpilot) | Python/C++, comma 3X hardware |

**Use case:** Retrofit ADAS for 325+ supported vehicles. Platform for building custom driving algorithms, data collection pipelines, and ML model fine-tuning on real-world driving data. v0.11.x (2026) new driving model is the current baseline.

---

### 7. OpenDriveVLA — End-to-End AV Platform (NEW v6)
| Platform | License | URL | Stack |
|----------|---------|-----|-------|
| OpenDriveVLA | Apache-2.0 | [DriveVLA/OpenDriveVLA](https://github.com/DriveVLA/OpenDriveVLA) | Python, HuggingFace, AAAI 2026 |

**Use case:** Fine-tune VLA (Vision-Language-Action) model for specific ADAS scenarios or local road conditions. Open 0.5B checkpoint on HuggingFace as starting point. Target: OEM research teams building next-gen AV features, LATAM road condition adaptation, custom E2E ADAS for specific vehicle classes.

---

### 8. open-mechanic — OBD2 AI Diagnostics (NEW v6)
| Platform | License | URL | Stack |
|----------|---------|-----|-------|
| open-mechanic | MIT | [speed785/open-mechanic](https://github.com/speed785/open-mechanic) | Python, FastAPI, React, Claude API |

**Use case:** AI-powered vehicle diagnostics for workshops and fleet operators. OBD-II adapter → pyOBD/python-OBD → FastAPI backend → Claude API → plain-English diagnosis + repair guide. React dashboard with maintenance timeline. White-label for LATAM dealership chains or delivery fleet operators.

---

### 9. CARMA Platform — V2X / Cooperative Driving
| Platform | License | URL | Stack |
|----------|---------|-----|-------|
| CARMA Platform | Apache-2.0 | [usdot-fhwa-stol/carma-platform](https://github.com/usdot-fhwa-stol/carma-platform) | C++/Python, ROS 2 |
| CARMA Cloud | Apache-2.0 | [usdot-fhwa-stol/carma-cloud](https://github.com/usdot-fhwa-stol/carma-cloud) | Java, Spring Boot |

**Use case:** Smart city + autonomous vehicle integration. V2X AI agents for intersection management, emergency vehicle preemption, freight platooning. US DOT interstate pilots active in 2026.

---

## Comparison Table

| Platform | License | Best For | AI Complexity | Time to Value |
|----------|---------|----------|---------------|---------------|
| Eclipse SDV Stack | Apache-2.0 | In-vehicle AI agents | High | 3-6 months |
| Odoo Community | LGPL | Dealer / workshop ops | Low-Medium | 6-12 weeks |
| ERPNext | GPL | Manufacturing / supply chain | Medium | 2-4 months |
| OpenRemote | AGPL | Fleet IoT / telematics | Medium | 2-3 months |
| Apache OFBiz | Apache-2.0 | Enterprise ERP/CRM | Medium | 4-6 months |
| openpilot | MIT | ADAS / in-vehicle | High | 3-6 months |
| OpenDriveVLA | Apache-2.0 | E2E AV / VLA model | Very High | 4-8 months R&D |
| open-mechanic | MIT | OBD2 diagnostics / workshops | Low | 2-6 weeks |
| CARMA Platform | Apache-2.0 | V2X / smart city | High | 6-12 months |

---
*v6: Added OpenDriveVLA and open-mechanic platforms. Updated platform decision tree.*  
*See `compose/patterns.md` for concrete wiring recipes using these platforms.*
