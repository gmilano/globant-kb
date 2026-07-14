# Verticales de partida — Automotive

> Plataformas verticales existentes customizables con AI para la industria automotriz.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-14 (v12)

## Plataformas recomendadas

| Plataforma | Licencia | Repo / URL | Stack | Caso de uso principal |
|------------|----------|------------|-------|----------------------|
| **Fleetbase** | AGPL-3.0 | [fleetbase/fleetbase](https://github.com/fleetbase/fleetbase) | Laravel + Vue3 + MySQL | Gestión de flotas integral: tracking, despacho, fulfillment, sin tarifa por conductor |
| **Fleet Management (ERPNext)** | Apache-2.0 | [navariltd/Fleet-Management-System](https://github.com/navariltd/Fleet-Management-System) | Frappe + ERPNext + Python | Gestión de flota para transportistas con contabilidad integrada, mantenimiento, conductores |
| **OpenRemote** | Apache-2.0 | [openremote/openremote](https://github.com/openremote/openremote) | Java + TypeScript | IoT/telemática: gestión de flotas conectadas, geofencing, telemetría vehicular |
| **Eclipse SDV Blueprints** | Apache-2.0 | [eclipse-sdv-blueprints](https://github.com/eclipse-sdv-blueprints) | Rust + Python + K8s | Software Defined Vehicle: in-vehicle apps, OTA updates, vehicle connectivity |
| **CARLA Simulator** | MIT | [carla-simulator/carla](https://github.com/carla-simulator/carla) | C++ + Unreal Engine 5 | Simulación de conducción autónoma, test de agentes AD, generación de datasets |
| **Autoware Universe** | Apache-2.0 | [autowarefoundation/autoware_universe](https://github.com/autowarefoundation/autoware_universe) | C++ + ROS2 + Python | Stack completo de AD para vehículos autónomos: percepción, predicción, planificación |
| **ERPNext / Frappe** | MIT | [frappe/erpnext](https://github.com/frappe/erpnext) | Python + Vue + MariaDB | ERP base para fabricantes y distribuidores automotrices. Módulos: manufactura, inventario, ventas, CRM |
| **Odoo Manufacturing** | LGPL-3.0 | [odoo/odoo](https://github.com/odoo/odoo) | Python + JS + PostgreSQL | MES + ERP: órdenes de trabajo, calidad, MRP, PLM para talleres y plantas automotrices |
| **qcadoo MES** | LGPL-3.0 | [qcadoo/mes](https://github.com/qcadoo/mes) | Java + Spring + PostgreSQL | MES open source para manufactura discreta — ideal para plantas de autopartes |
| **OpenVehicleDiag** | MIT | [karunakaravel/OpenVehicleDiag](https://github.com/karunakaravel/OpenVehicleDiag) | Rust | Diagnóstico OBD2/UDS para vehículos. Base para agentes de mantenimiento predictivo |

---

## Cómo customizar con AI

### Nivel 1 — Fleet intelligence (tiempo a valor: 2-4 semanas)
```
[Fleetbase o Fleet-Management-System]
          ↓
[Webhook / API REST existente]
          ↓
[LangGraph agent: anomaly detection + alert generation]
          ↓
[WhatsApp (Twilio/Z-API) → conductor / dispatch]
```

### Nivel 2 — SDV AI cockpit (tiempo a valor: 4-8 semanas)
```
[Eclipse Kuksa data broker]  ←→  [Vehicle sensors via VSS]
          ↓
[cockpit-agent multi-agent stack]
   ├── Edge: intent classification (small LLM on-device)
   ├── Cloud: LLM planning (Claude Haiku / Llama3)
   └── VAL safety execution layer
          ↓
[HMI streaming → display en tablero]
```

### Nivel 3 — AD simulation + VLA evaluation (tiempo a valor: 6-12 semanas)
```
[CARLA Simulator (UE5)]
          ↓
[OpenDriveVLA o Alpamayo inference server]
          ↓
[PCLA testing harness]  →  [Métricas: L2 error, collision rate, PDMS]
          ↓
[LangGraph evaluation agent: report + regression alerts]
          ↓
[Dashboard con resultados de benchmark]
```

---

## Tabla por departamento cliente

| Departamento | Plataforma recomendada | Agente AI a agregar | Quick win |
|-------------|----------------------|---------------------|-----------|
| Flotas / Logística | Fleetbase | Anomaly detection agent | Alertas predictivas de mantenimiento vía WhatsApp |
| Manufactura / Planta | ERPNext + qcadoo | Production planning agent | Optimización de órdenes de trabajo con LLM |
| Concesionarios / Ventas | Odoo CRM | Sales agent con RAG catálogo | Chatbot de cotización en WhatsApp/web |
| I+D / AD | CARLA + Autoware | VLA evaluation pipeline | Benchmark continuo de modelos propios |
| Cockpit / HMI | Eclipse SDV Blueprints | cockpit-agent | Asistente vocal inteligente en cabina |
| EV / Carga | OpenRemote + ev-charging | Fleet EV routing agent | Optimización de rutas de carga para flotas EV |

---
*Ver también: `repos/foundations.md` para repos fundacionales técnicos.*
