# Verticales de Partida — Automotive

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-13

## Plataformas recomendadas

| Plataforma | Licencia | Repo / URL | Stack | Caso de uso principal |
|------------|----------|------------|-------|----------------------|
| **Fleetbase** | AGPL-3.0 | [fleetbase/fleetbase](https://github.com/fleetbase/fleetbase) | Laravel, Ember.js, PostgreSQL | Fleet management OS. GPS tracking, despacho, optimización de rutas, API modular. 8.000+ ops en prod. |
| **Odoo (Automotive)** | LGPL-3.0 | [odoo/odoo](https://github.com/odoo/odoo) | Python, JavaScript, PostgreSQL | ERP integral: CRM de concesionario, inventario de vehículos, servicio técnico, taller, contabilidad. Módulos específicos para dealers. |
| **ERPNext / Frappe** | MIT | [frappe/frappe](https://github.com/frappe/frappe) | Python, Vue.js, MariaDB | ERP para manufactura automotriz. BOM, producción, calidad, logística. Customizable con módulos Frappe. |
| **Eclipse SDV Blueprints** | Apache-2.0 | [eclipse-sdv-blueprints](https://github.com/eclipse-sdv-blueprints) | Rust, Python, C++, Kubernetes | Blueprints de referencia para SDV. Digital twins, in-vehicle services, cloud connectivity. Base para OEMs. |
| **Eclipse S-CORE** | Apache-2.0 | [eclipse-score](https://github.com/eclipse-score) | C++, Rust, CMake | Core de software seguro para ECUs de alto rendimiento. Multi-processor, AUTOSAR-compatible. SDV foundation. |
| **Autoware** | Apache-2.0 | [autowarefoundation/autoware](https://github.com/autowarefoundation/autoware) | C++, Python, ROS 2 | Stack completo L4 para vehículos autónomos. Base para proyectos de autonomía comercial. |
| **openpilot** | MIT | [commaai/openpilot](https://github.com/commaai/openpilot) | Python, C++, cereal | OS de conducción. Upgrade ADAS para 300+ vehículos. Base para proyectos de asistencia al conductor. |
| **Open-DMS (Odoo-based)** | LGPL-3.0 | Concepto sobre Odoo | Python, JS | Sistema de gestión de concesionarios sobre Odoo. CRM, inventario, finanzas, taller. Requiere customización. |

## Cómo customizar con AI

### Fleetbase + Agentes AI
1. Desplegar Fleetbase self-hosted (Docker)
2. Conectar EMQX como broker MQTT para telemetría de flota
3. Añadir servidor MCP `predictive-maintenance-mcp` para diagnóstico
4. Integrar Claude como agente de despacho y alertas predictivas
5. Dashboard de alertas con explicaciones en lenguaje natural

### Odoo Automotive + AI
1. Instalar Odoo con módulos de concesionario (CRM, Servicio, Inventario)
2. Exponer API Odoo como herramientas MCP
3. Agente Claude para atención al cliente, presupuestos automáticos, scheduling de servicio
4. Integración WhatsApp Business para LATAM (Odoo + Twilio + Claude)

### Eclipse SDV Blueprints + AI
1. Partir de los blueprints de referencia (in-vehicle, cloud connectivity)
2. Añadir Alpamayo (modelos NVIDIA) para razonamiento autónomo
3. EMQX como middleware de comunicación V2X
4. Pipeline de CI/CD con CARLA + PCLA para validación de comportamiento

### ERPNext Manufacturing + AI
1. Instalar ERPNext para manufactura automotriz
2. Configurar módulos de BOM, producción y calidad
3. Añadir agente de predicción de demanda (PyTorch + datos históricos)
4. Integrar `predictive-maintenance-mcp` para equipos de producción

## Oportunidades LATAM específicas

| País | Vertical | Plataforma base | Oportunidad |
|------|----------|----------------|-------------|
| Brasil | Concesionarios (LATAM mayor mercado auto) | Odoo + Claude | Atención al cliente AI, gestión de test drives, financing automation |
| México | Maquiladoras / manufactura | ERPNext + mantenimiento predictivo | Reducción downtime en líneas de ensamblaje (BMW, GM, Ford, Stellantis) |
| Argentina | Flotas logísticas | Fleetbase + EMQX | Despacho inteligente, ahorro combustible |
| Colombia | Transporte masivo | Fleetbase + CARLA sim | Planificación de rutas, seguridad de conductores |
| Chile | Minería (flotas off-road) | Fleetbase + predictive-maintenance-mcp | Mantenimiento predictivo de maquinaria pesada (Codelco, SQM) |
