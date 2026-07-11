# 🏭 Vertical Platforms — Automotive

> Existing open-source platforms to customize with AI. Start from something functional, add the agentic layer.
> Last updated: 2026-07-11

## Platform Decision Tree

```
What does the client need?
├── Vehicle operations / in-car AI        → Eclipse SDV Stack (Kuksa + Velocitas + LMOS)
├── Dealer management / sales CRM         → Odoo Community (LGPL) or ERPNext
├── Fleet management / logistics          → OpenRemote + LangGraph agents
├── Manufacturing / supply chain          → ERPNext (Frappe) automotive module
├── Autonomous driving / ADAS development → openpilot or Autoware
├── Simulation / testing                  → CARLA + PCLA
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
| Eclipse LMOS | Apache-2.0 | [eclipse-lmos](https://github.com/eclipse-lmos) | Multi-agent orchestration layer for cloud + edge |

**AI Customization:** Deploy LLM-based agents as Velocitas Vehicle Apps. Agents subscribe to Kuksa VSS signals, run LLM inference (Ollama on edge, Claude/GPT in cloud), and execute vehicle actions through the VSS write API.

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
2. Add `odoo-ai-copilot` Python package (LangChain + Odoo RPC)
3. Build LangGraph agents that read Odoo data via XMLRPC API
4. Surface via Odoo chatbot widget or Slack/WhatsApp integration
5. Common agents: inventory reorder agent, service appointment agent, lead qualification agent

**Cost model:** ~$40-80k for Odoo + AI layer implementation vs $200-400k for proprietary DMS.

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

**AI Customization:** Frappe's REST API + webhooks enable LangGraph agents for predictive maintenance scheduling, quality control anomaly detection, and supply chain disruption alerting.

**Reference:** [Frappe ERPNext Automotive ERP](https://frappe.io/erpnext/manufacturing/automotive-erp-software)

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
| openpilot | MIT | [commaai/openpilot](https://github.com/commaai/openpilot) | Python/C++, QNX-inspired, comma 3X hardware |

**Use case:** Retrofit ADAS for supported vehicles. Platform for building custom driving algorithms, data collection pipelines, and ML model fine-tuning on real-world driving data.

---

### 7. CARMA Platform — V2X / Cooperative Driving
| Platform | License | URL | Stack |
|----------|---------|-----|-------|
| CARMA Platform | Apache-2.0 | [usdot-fhwa-stol/carma-platform](https://github.com/usdot-fhwa-stol/carma-platform) | C++/Python, ROS 2 |
| CARMA Cloud | Apache-2.0 | [usdot-fhwa-stol/carma-cloud](https://github.com/usdot-fhwa-stol/carma-cloud) | Java, Spring Boot |

**Use case:** Smart city + autonomous vehicle integration. Municipalities and fleet operators. AI agents can be implemented as CARMA plugins for intersection management, emergency vehicle preemption, or freight platooning.

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
| CARMA Platform | Apache-2.0 | V2X / smart city | High | 6-12 months |

---
*See `compose/patterns.md` for concrete wiring recipes using these platforms.*
