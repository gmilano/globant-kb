# 🏭 Verticales de partida — Automotive

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-12 (v8)

## Plataformas recomendadas

| Plataforma | Licencia | Repo / URL | Stack | Caso de uso | AI Hook |
|------------|----------|------------|-------|-------------|---------|
| **Fleetbase** | AGPL-3.0 | [fleetbase/fleetbase](https://github.com/fleetbase/fleetbase) | Laravel + Ember.js + PostgreSQL | Logistics OS modular: fleet management, e-commerce delivery, warehouse ops, accounting, identity management. 8k+ operaciones activas. | Conectar LLM para dispatching inteligente, ETA prediction, conductor scoring |
| **Traccar** | Apache-2.0 | [traccar/traccar](https://github.com/traccar/traccar) | Java + React + MySQL/PostgreSQL | Fleet tracking en tiempo real — 200+ protocolos GPS, 2000+ dispositivos, geofencing, alertas | Conectar LLM para análisis de rutas, alertas predictivas, resumen de conductor |
| **fleetms** | MIT | [jmnda-dev/fleetms](https://github.com/jmnda-dev/fleetms) | Modern web stack | Fleet Maintenance Management: historial de mantenimientos, alertas de vencimiento, órdenes de servicio. Licencia MIT pura — ideal para proyectos comerciales. | Agente predictivo de mantenimiento sobre datos históricos |
| **OpenRemote** | AGPL-3.0 | [openremote/openremote](https://github.com/openremote/openremote) | Java + TypeScript + PostgreSQL | IoT platform + fleet telematics, multi-tenant, rules engine visual | Rules engine + LLM para alerts en lenguaje natural; MCP-over-MQTT bridge |
| **ERPNext** | GPL-3.0 | [frappe/erpnext](https://github.com/frappe/erpnext) | Python (Frappe) + MariaDB + Vue | ERP completo — compras, inventario, manufactura, ventas, contabilidad para talleres y concesionarios | Agente conversacional sobre módulos de inventario de repuestos y órdenes de servicio |
| **Car Repair Management** (ERPNext app) | MIT | [Frappe Marketplace](https://cloud.frappe.io/marketplace/apps/car_repair_management) | Python / Frappe | Gestión de taller automotriz: órdenes de reparación, clientes, repuestos, facturación | Chatbot de diagnóstico + recomendación de repuestos con Claude |
| **erpnext_repairs** | MIT | [libracore/erpnext_repairs](https://github.com/libracore/erpnext_repairs) | Python / Frappe | App ERPNext para procesamiento de reparaciones en talleres | Integración de agente para presupuestación automática |
| **CARLA Simulator** | MIT | [carla-simulator/carla](https://github.com/carla-simulator/carla) | C++ + Python + Unreal Engine | Simulación de conducción autónoma, generación de escenarios, sensores fotorrealistas. Act. jun 2026. | Plataforma de entrenamiento y evaluación para modelos VLA/VLM |
| **Autoware** | Apache-2.0 | [autowarefoundation/autoware](https://github.com/autowarefoundation/autoware) | C++ + Python + ROS 2 | Stack AV completo para vehículos autónomos y robotaxi | Integración de modelos LLM-VLA (Alpamayo, LCDrive, DriveAgent-R1) |
| **EMQX** | Apache-2.0 | [emqx/emqx](https://github.com/emqx/emqx) | Erlang/Elixir | MQTT broker ultra-low-latency para vehículos conectados. Pioneer MCP-over-MQTT 2026. | Puente entre telemetría vehicular MQTT y agentes AI que hablan MCP |

## MCP Servers Automotrices (2026)

| MCP Server | URL | Caso de uso |
|------------|-----|-------------|
| **Auto.dev MCP** | [auto.dev/mcp](https://www.auto.dev/mcp) | VIN decode, listings, recalls, calculadora de pagos, specs técnicas — para agentes de concesionario |
| **AutoMobile MCP** | [Medium: Shekhar Manna](https://medium.com/@shekhar.manna83/comprehensive-automobile-mcp-project-documentation-7721b803ce2f) | Diagnostic simulation platform con suite completa de herramientas para análisis vehicular vía MCP |
| **AutoUnify ServiceMCP** | [masterofcode.com/blog/ai-agents-for-automotive](https://masterofcode.com/blog/ai-agents-for-automotive) | Primer AI-commerce para service scheduling automotriz — Claude/ChatGPT agenda revisiones directamente |

## Cómo customizar con AI

### Para fleet management (Fleetbase + Traccar)
1. Deploy Fleetbase con Docker — incluye fleet-ops module, API REST y dashboard
2. Integrar Traccar para telemetría GPS en tiempo real (protocolo MQTT nativo)
3. Activar EMQX como broker MQTT → MCP-over-MQTT bridge para exponer telemetría a agentes AI
4. LangGraph agent consume el MCP + Claude Sonnet para análisis de comportamiento y dispatching
5. Notificaciones en WhatsApp/Slack vía n8n o webhook directo

### Para taller automotriz (ERPNext + Car Repair Management)
1. Deploy ERPNext con el módulo Car Repair Management
2. MCP server custom sobre la API de Frappe
3. Agente conversacional con Claude que responde: "¿qué repuestos necesita el vehículo X?", "¿cuándo vence el próximo servicio?"
4. Integración con base de datos de códigos OBD-II + Auto.dev MCP para diagnóstico automático

### Para OEM / sistema AV (Autoware + LCDrive)
1. Deploy Autoware Universe como base
2. Integrar VisionPilot para ADAS L2 en vehículo objetivo
3. Evaluar LCDrive (latent CoT, menor costo computacional) vs Alpamayo (chain-of-thought explícito) según hardware disponible
4. CI/CD pipeline con CARLA + PCLA para evaluación continua
