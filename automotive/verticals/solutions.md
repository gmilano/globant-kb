# 🏭 Verticales de partida — Automotive

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-12 (v7)

## Plataformas recomendadas

| Plataforma | Licencia | Repo / URL | Stack | Caso de uso | AI Hook |
|------------|----------|------------|-------|-------------|---------|
| **Traccar** | Apache-2.0 | [traccar/traccar](https://github.com/traccar/traccar) | Java + React + MySQL/PostgreSQL | Fleet tracking en tiempo real — 200+ protocolos GPS, 2000+ dispositivos, geofencing, alertas | Conectar LLM para análisis de rutas, alertas predictivas, resumen de conductor |
| **OpenGTS** | Apache-2.0 | [opengts.org](http://www.opengts.org) | Java + Tomcat + MySQL | Web fleet tracking, historial, mantenimiento vehicular | Añadir agente de predicción de mantenimiento sobre datos históricos |
| **OpenRemote** | AGPL-3.0 | [openremote/openremote](https://github.com/openremote/openremote) | Java + TypeScript + PostgreSQL | IoT platform + fleet telematics, multi-tenant | Rules engine + LLM para alerts en lenguaje natural |
| **ERPNext** | GPL-3.0 | [frappe/erpnext](https://github.com/frappe/erpnext) | Python (Frappe) + MariaDB + Vue | ERP completo — compras, inventario, manufactura, ventas, contabilidad para talleres y concesionarios | Agente conversacional sobre módulos de inventario de repuestos y órdenes de servicio |
| **Car Repair Management** (ERPNext app) | MIT | [Frappe Marketplace](https://cloud.frappe.io/marketplace/apps/car_repair_management) | Python / Frappe | Gestión de taller automotriz: órdenes de reparación, clientes, repuestos, facturación | Chatbot de diagnóstico + recomendación de repuestos con Claude |
| **erpnext_repairs** | MIT | [libracore/erpnext_repairs](https://github.com/libracore/erpnext_repairs) | Python / Frappe | App ERPNext para procesamiento de reparaciones en talleres | Integración de agente para presupuestación automática |
| **CARLA Simulator** | MIT | [carla-simulator/carla](https://github.com/carla-simulator/carla) | C++ + Python + Unreal Engine | Simulación de conducción autónoma, generación de escenarios | Plataforma de entrenamiento y evaluación para modelos VLA/VLM |
| **Autoware** | Apache-2.0 | [autowarefoundation/autoware](https://github.com/autowarefoundation/autoware) | C++ + Python + ROS 2 | Stack AV completo para vehículos autónomos y robotaxi | Integración de modelos LLM-VLA (Alpamayo, DriveAgent-R1) |

## Cómo customizar con AI

### Para fleet management (Traccar + OpenRemote)
1. Deploy Traccar con Docker; activar API REST
2. Conectar LangGraph agent que consume telemetría en streaming
3. Añadir Claude Sonnet para análisis de comportamiento de conductor y predicción de mantenimiento
4. Notificaciones en WhatsApp/Slack vía n8n o webhook directo

### Para taller automotriz (ERPNext + Car Repair Management)
1. Deploy ERPNext con el módulo Car Repair Management
2. MCP server custom sobre la API de Frappe
3. Agente conversacional con Claude que responde a: "¿qué repuestos necesita el vehículo X?", "¿cuándo vence el próximo servicio?"
4. Integración con base de datos de códigos OBD-II para diagnóstico automático

### Para OEM / sistema AV (Autoware + VisionPilot)
1. Deploy Autoware Universe como base
2. Integrar VisionPilot para ADAS L2 en vehículo objetivo
3. Fine-tuning de Alpamayo o DriveAgent-R1 sobre datos de conducción local
4. CI/CD pipeline con CARLA + PCLA para evaluación continua
