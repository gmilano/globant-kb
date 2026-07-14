# 🏭 Plataformas Verticales — Automotive

> Plataformas open-source existentes que se pueden customizar con AI.
> Modelo: partir de algo funcional (ERP, DMS, fleet, ADAS) y añadir capa agéntica encima.
> Última actualización: 2026-07-14 (v11)

## Gestión de Flotas (Fleet Management)

| Plataforma | Licencia | Repo / URL | Stack | Caso de uso |
|------------|----------|-----------|-------|-------------|
| **Fleetbase** | AGPL-3.0 | [fleetbase/fleetbase](https://github.com/fleetbase/fleetbase) | Laravel + Ember.js + PostgreSQL | OS completo de logística y flota: despacho, tracking, órdenes, sin fee/driver |
| **OpenRemote Fleet** | AGPLv3 | [openremote/fleet-management](https://github.com/openremote/fleet-management) | Java + PostgreSQL + MQTT | Telemática IoT: GPS tracking, geofencing, alertas; soporte nativo Teltonika |

**Cómo agregar AI:**
- Añadir un agente LangGraph conectado a la API de Fleetbase para despacho predictivo
- Entrenar modelo de mantenimiento predictivo con datos de telemetría OpenRemote
- Chatbot de WhatsApp para conductores usando EMQX + Claude Haiku

## ERP / DMS para Concesionarias y Fabricantes

| Plataforma | Licencia | Repo / URL | Stack | Caso de uso |
|------------|----------|-----------|-------|-------------|
| **Odoo Fleet** | LGPL-3.0 | [odoo/odoo](https://github.com/odoo/odoo) | Python + PostgreSQL + JS | Fleet management + DMS integrado al ERP; 12M+ usuarios globales |
| **ERPNext Manufacturing** | GPL-3.0 | [frappe/erpnext](https://github.com/frappe/erpnext) | Python (Frappe) + MariaDB | ERP de manufactura automotriz: BOM, producción, calidad, mantenimiento |
| **Frappe Dealership Mgmt** | MIT | [cloud.frappe.io/marketplace](https://cloud.frappe.io/marketplace/apps/dealership_management) | Python (Frappe) | DMS: ventas de vehículos, contratos, servicio post-venta |

**Cómo agregar AI:**
- Agente de calificación de leads sobre Odoo CRM automotriz (LangGraph + Claude)
- Predicción de demanda sobre ERPNext con datos históricos + agente de compras
- Frappe Dealership + agente de conversación para test drives y financing

## Conducción Autónoma y ADAS

| Plataforma | Licencia | Repo / URL | Stack | Caso de uso |
|------------|----------|-----------|-------|-------------|
| **openpilot** | MIT | [commaai/openpilot](https://github.com/commaai/openpilot) | Python + C++; Android/Linux | ADAS OS producción: 300+ autos; v0.11 World Model training paradigm |
| **Autoware** | Apache-2.0 | [autowarefoundation/autoware](https://github.com/autowarefoundation/autoware) | C++ + Python; ROS 2 | Stack L4 completo; modular; usado por Toyota, Tier IV, Apex.AI |
| **autoware_vision_pilot** | Apache-2.0 | [autowarefoundation/autoware_vision_pilot](https://github.com/autowarefoundation/autoware_vision_pilot) | PyTorch + Python | L2 ADAS end-to-end; una cámara, sin mapas HD; pesos incluidos |
| **CARLA Simulator** | MIT | [carla-simulator/carla](https://github.com/carla-simulator/carla) | C++ + Python; UE4/UE5 | Simulador AV; UE5 branch activo (ue5-dev); digital twins; NuRec 25.07 |
| **OpenDriveVLA** | Apache-2.0 | [DriveVLA/OpenDriveVLA](https://github.com/DriveVLA/OpenDriveVLA) | PyTorch; 3B/7B VLA | VLA E2E para AD; L2 error SOTA 0.33m nuScenes; base para fine-tuning custom |

**Cómo agregar AI:**
- Agente LLM sobre openpilot para diagnóstico verbal de fallas (OBD-II conversacional)
- Autoware + agente de planificación de rutas en tiempo real con LangGraph
- CARLA + autoware_vision_pilot + nuReasoning para validar agentes en escenarios long-tail
- OpenDriveVLA fine-tuned en datos LATAM (carreteras sin señalización, lluvias tropicales)

## Conectividad Vehicular (V2X / IoT / SDV)

| Plataforma | Licencia | Repo / URL | Stack | Caso de uso |
|------------|----------|-----------|-------|-------------|
| **EMQX** | Apache-2.0 | [emqx/emqx](https://github.com/emqx/emqx) | Erlang; MQTT 5.0 | Broker de telemática vehicular: telemetría, V2X, OTA updates; < 1ms latencia |
| **Eclipse Kuksa** | Apache-2.0 | [eclipse-kuksa/kuksa-databroker](https://github.com/eclipse-kuksa/kuksa-databroker) | Rust + gRPC; VSS | Data broker vehicular estándar; señales VSS; security audit publicado 2026 |
| **Eclipse Velocitas** | Apache-2.0 | [eclipse-velocitas](https://github.com/eclipse-velocitas) | Python + GitHub Actions | Toolchain para vehicle apps portables; CI/CD; AUTOSAR Adaptive target |
| **Eclipse uProtocol** | Apache-2.0 | [eclipse-uprotocol](https://github.com/eclipse-uprotocol) | Multi-lang | Mensajería estándar ECU ↔ cloud; reemplaza propietarios |

**Cómo agregar AI:**
- EMQX → Kafka → agente de anomaly detection en tiempo real
- Kuksa databroker + agente de diagnóstico OBD-II conversacional
- Velocitas + agente de pruebas automáticas de vehicle apps

## SDV Platform (en producción 2026-2030)

| Plataforma | Licencia | Repo / URL | Adopción | Caso de uso |
|------------|----------|-----------|----------|-------------|
| **Eclipse S-CORE** | Apache-2.0 | [eclipse-sdv org](https://github.com/orgs/eclipse-sdv/repositories) | 32 OEMs; v0.5 GA → v1.0 2026 | Middleware SDV: adaptive AUTOSAR, POSIX, capa común para OEMs |
| **NVIDIA DriveOS** | Propietario | developer.nvidia.com/drive | JLR 2026+, Toyota | OS vehicular con VMs QNX+Linux; NIM microservices BEVFormer/SparseDrive |
| **Qualcomm Snapdragon Chassis** | Propietario | qualcomm.com/snapdragon-digital-chassis | VW, BMW, Mercedes, Toyota | Chassis Agents + Gemini integration; $45B design-win pipeline; AIDV concept |

---
*Ver también: `repos/foundations.md` para repos de componentes individuales.*
