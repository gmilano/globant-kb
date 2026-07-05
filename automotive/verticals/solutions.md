# 🏭 Verticales de partida — Automotive

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-05

## Plataformas recomendadas

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| **ERPNext** (Frappe) | GPL-3.0 | [frappe/erpnext](https://github.com/frappe/erpnext) | Python/Frappe Framework, MariaDB | ERP con módulo de manufactura automotriz: variantes de ítem (motor, color, trim), BOM, control de producción, inventario de repuestos. ~23.5k ★ |
| **Odoo** | LGPL-3.0 | [odoo/odoo](https://github.com/odoo/odoo) | Python, PostgreSQL | Suite completa con módulos de concesionario (fleet, maintenance, CRM), taller y facturación. El más adoptado en LATAM para PyMEs automotrices. ~40k ★ |
| **Apache OFBiz** | Apache-2.0 | [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Java, Apache | ERP/CRM/SCM enterprise para fabricantes y distribuidores. Módulos de manufactura, cadena de suministro y CRM para concesionarios grandes. |
| **Fleetbase** | MIT | [fleetbase/fleetbase](https://github.com/fleetbase/fleetbase) | Laravel, Vue.js | Plataforma headless de gestión de flotas con API. Despacho, tracking en tiempo real, gestión de conductores. Base ideal para añadir agentes RL de optimización de rutas. |
| **OpenDMS** | Apache-2.0 | [openDMS](https://github.com/topics/dealer-management) | PHP/MySQL | Sistemas de Dealer Management System open source para concesionarios: inventario de vehículos, órdenes de trabajo, CRM de leads. |
| **AureusERP** | MIT | [aureuserp/aureuserp](https://github.com/aureuserp/aureuserp) | Laravel, Vue.js | ERP full-stack MIT puro. Base limpia para construir módulos verticales automotrices sin restricciones de licencia. |

## Módulos AI que encajan sobre estas plataformas

### Sobre ERPNext / Odoo (taller y concesionario)
```
Odoo Fleet Module
       ↓
predictive-maintenance-mcp (servidor MCP)
       ↓
LLM (Claude / GPT-4o / Ollama local)
       ↓
Técnico consulta en lenguaje natural: "¿Qué vehículos necesitan revisión esta semana?"
```

### Sobre Fleetbase (operaciones de flota)
```
Fleetbase API (tracking GPS, datos de ruta)
       ↓
Agente RL de optimización (ev-charging-optimization o custom)
       ↓
Dashboard de despacho + alertas proactivas al conductor
```

### Sobre ERPNext (manufactura)
```
ERPNext Manufacturing (BOM, producción)
       ↓
YOLOv8 en línea de inspección (defecto visual)
       ↓
Trigger automático de orden de trabajo en ERPNext si defecto detectado
```

## Cómo customizar con AI

1. **Fork** del repo base (ERPNext, Odoo, Fleetbase)
2. **Añadir servidor MCP** o endpoint REST que expone datos del ERP al LLM
3. **Wrapear flujos existentes** con agentes LangGraph: aprobación de OT, predicción de quiebre de stock, generación de presupuesto de reparación
4. **UI conversacional** (chat widget) sobre el sistema base; o integrar con WhatsApp Business API para flotas y talleres LATAM
5. **Deploy local** con Ollama + modelo Llama-3 para clientes con restricciones de datos (OEMs, aseguradoras)
