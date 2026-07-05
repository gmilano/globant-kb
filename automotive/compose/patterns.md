# 🧩 Patrones de composición — Automotive AI

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-05

## Arquitectura base

```
[Plataforma vertical base (ERPNext / Odoo / Fleetbase / Apollo)]
          ↓
[Capa de integración AI — MCP server / LangGraph / API bridge]
          ↓
[Agentes especializados: percepción, diagnóstico, planificación, optimización]
          ↓
[UI conversacional / Dashboard / API para el cliente]
```

---

## Receta 1: Taller inteligente con mantenimiento predictivo

**Objetivo**: Red de talleres que predice qué vehículos necesitan servicio antes de que fallen.

```
Odoo Fleet Module (datos históricos de vehículos)
       +
OBD-II sensor data (telemetría en tiempo real por CAN bus)
       ↓
predictive-maintenance-mcp (LGDiMaggio) — Servidor MCP
       ↓
Claude claude-sonnet-5 o GPT-4o
       ↓
Chatbot del técnico (WhatsApp Business / web widget)
       ↓
Trigger automático de OT en Odoo si riesgo > umbral
```

**Repos**: [LGDiMaggio/predictive-maintenance-mcp](https://github.com/LGDiMaggio/predictive-maintenance-mcp) + [odoo/odoo](https://github.com/odoo/odoo)

**Tiempo estimado**: 3-4 semanas (MVP); 8-10 semanas (producción con integración OBD-II)

**ROI documentado**: talleres con predictive maintenance reportan -30% en tiempos de inactividad no planificada

---

## Receta 2: Inspección visual de daños para aseguradoras

**Objetivo**: Ajustador digital que estima daños a partir de fotos del vehículo.

```
App móvil (cliente toma fotos post-siniestro)
       ↓
A.I.-AutoInspector (Divyeshpratap) — computer vision + GenAI
  → Detección de zona dañada (YOLOv8)
  → Severidad del daño (clasificador fine-tuned)
  → Consulta de manual técnico (RAG)
       ↓
LLM genera presupuesto estimado + narrative para el perito
       ↓
API → Sistema de gestión de siniestros de la aseguradora
```

**Repos**: [Divyeshpratap/A.I.-AutoInspector](https://github.com/Divyeshpratap/A.I.-AutoInspector) + [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics)

**Tiempo estimado**: 4-6 semanas (MVP con modelos pre-entrenados); +4 semanas fine-tuning con datos del cliente

**Mercado**: aseguradoras LATAM con +500k siniestros anuales — reducción de 15 días a 2 horas en peritaje

---

## Receta 3: Agente AV en simulador (pipeline de testing)

**Objetivo**: Validar un nuevo agente de conducción autónoma en 1000 escenarios antes de poner en vehículo real.

```
CARLA Simulator (carla-simulator/carla)
  → Escenarios: lluvia, cruce de peatones, emergencia, noche
       ↓
Autoware_universe o Pylot (agente bajo prueba)
       ↓
PCLA (MasoudJTehrani) — framework de test
  → Métricas: colisiones, violaciones de tráfico, confort
       ↓
LangGraph orchestration → agente de análisis de resultados
       ↓
Report automático: qué escenarios falló + severidad + sugerencias de fix
```

**Repos**: [carla-simulator/carla](https://github.com/carla-simulator/carla) + [autowarefoundation/autoware_universe](https://github.com/autowarefoundation/autoware_universe) + [MasoudJTehrani/PCLA](https://github.com/MasoudJTehrani/PCLA)

**Tiempo estimado**: 2-3 semanas (setup); cada ciclo de test toma 2-4 horas para 1000 escenarios

**Entregable**: informe de safety automatizado con trazabilidad por escenario — requerido para certificación ISO 26262

---

## Receta 4: Optimización de flota EV

**Objetivo**: Flota de 50-500 vehículos eléctricos con despacho y carga optimizados por AI.

```
Fleetbase API (tracking GPS, estado de batería, disponibilidad de conductor)
       +
Red de estaciones de carga (API de operador o simulada)
       +
Tarifas eléctricas en tiempo real (API utility)
       ↓
Agente RL de optimización (ev-charging-optimization + custom policy)
  → ¿Cuándo cargar? ¿En qué estación? ¿Qué vehículo priori?
       ↓
Dashboard de despacho (Fleetbase UI)
       +
Alertas proactivas al conductor (push notifications)
```

**Repos**: [fleetbase/fleetbase](https://github.com/fleetbase/fleetbase) + [philippnormann/ev-charging-optimization](https://github.com/philippnormann/ev-charging-optimization) + [TUMFTM/REVOL-E-TION](https://github.com/TUMFTM/REVOL-E-TION)

**Tiempo estimado**: 6-8 semanas (MVP con datos simulados); +4 semanas para integración con operador real

**Ahorro estimado**: -18% en costo de energía para flotas de buses en ciudades como Santiago o Bogotá

---

## Receta 5: CRM conversacional para concesionario

**Objetivo**: Lead que llega por web o WhatsApp → agente AI que califica, propone vehículos, agenda test drive y cierra cotización.

```
Lead ingresa (WhatsApp Business / web chat)
       ↓
LLM Agent (LangGraph) con acceso a:
  → Inventario de vehículos (Odoo CRM)
  → Historial de interacciones del lead
  → Pricing y disponibilidad en tiempo real
  → Catálogo técnico (RAG sobre PDFs de modelos)
       ↓
Acciones del agente:
  → Propone 3 vehículos con fit score
  → Agenda test drive en sistema de calendario
  → Genera cotización PDF y la envía por WhatsApp
       ↓
Odoo actualiza pipeline de CRM + tarea para asesor humano si lead califica
```

**Repos**: [odoo/odoo](https://github.com/odoo/odoo) + LangGraph + WhatsApp Business API

**Tiempo estimado**: 3-4 semanas (MVP); +2 semanas por integración de inventario real

**KPI**: tasa de conversión lead→cita +35% (benchmark industria con AI CRM automotriz)

---

## Receta 6: Inspección visual en línea de manufactura

**Objetivo**: Detectar defectos de pintura, soldadura y ensamblaje en línea de producción en tiempo real.

```
Cámaras industriales en banda de producción
       ↓
YOLOv8 (ultralytics) — modelo fine-tuned con defectos del cliente
  → Clases: burbuja de pintura, soldadura incompleta, pieza faltante, alineación
       ↓
Si defecto detectado:
  → Trigger de parada de línea o desvío a rework
  → Registro en ERPNext con foto, timestamp, tipo de defecto
  → Alerta a supervisor (Teams / Slack webhook)
       ↓
Dashboard de calidad: defectos por turno, por operario, por tipo
```

**Repos**: [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) + [frappe/erpnext](https://github.com/frappe/erpnext)

**Tiempo estimado**: 4-5 semanas (setup + fine-tuning con 500 imágenes etiquetadas del cliente)

**ROI**: -40 a -60% en defectos de manufactura (documentado en BMW, VW); payback < 6 meses en planta de 500 unidades/día
