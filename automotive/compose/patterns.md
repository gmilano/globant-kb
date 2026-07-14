# 🧩 Patrones de Composición — Automotive AI

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Cada patrón menciona repos específicos, cómo conectarlos, y tiempo estimado.
> Última actualización: 2026-07-14 (v11)

---

## Patrón base

```
[Plataforma vertical open-source]
          ↓
[Capa de integración: EMQX / Kuksa / REST API]
          ↓
[Agente LangGraph / CrewAI + LLM (Claude/Ollama)]
          ↓
[UI conversacional / WhatsApp / Dashboard]
```

---

## P1: Fleet AI — Mantenimiento Predictivo de Flota

**Problema**: Flotas de camiones/buses con averías no planificadas que cuestan $X00k/mes en LATAM.

**Stack**:
- [fleetbase/fleetbase](https://github.com/fleetbase/fleetbase) (AGPL-3.0) — Fleet OS: vehículos, conductores, órdenes
- [emqx/emqx](https://github.com/emqx/emqx) (Apache-2.0) — Ingest de telemetría OBD-II en tiempo real (MQTT)
- [openremote/fleet-management](https://github.com/openremote/fleet-management) (AGPLv3) — Dashboard telemática + alertas geofencing
- LangGraph + Claude claude-haiku-4-5 — Agente de diagnóstico y scheduling de mantenimiento
- Frappe ERPNext (GPL) — Work orders y gestión de talleres

**Cómo conectar**:
```
Vehículo → OBD-II dongle → EMQX broker (MQTT)
EMQX → Rule Engine → Kafka → LangGraph Agent
Agent tools: [query_vehicle_history, predict_failure_ml, create_work_order_erpnext, notify_driver_whatsapp]
OpenRemote → dashboard geofencing + alertas visuales
Fleetbase → dispatching + driver assignment
```

**Customización clave**:
- Modelo ML de predicción de fallas entrenado con datos históricos OBD (temperatura, RPM, vibración)
- Claude Haiku para diagnóstico conversacional en español/portugués para conductores
- WhatsApp Business API para notificaciones al conductor y coordinador de flota

**Tiempo estimado**: 8-12 semanas
**ROI esperado**: -30% downtime, -40% costos de mantenimiento (datos industria)
**Mercado objetivo**: Operadores de flota México, Brasil, Colombia (>50 vehículos)

---

## P2: Dealer Copilot — Agente de Ventas para Concesionarias

**Problema**: 40,000+ concesionarias en LATAM con procesos de calificación de leads manuales; 60% de leads no contactados en < 1 hora.

**Stack**:
- [odoo/odoo](https://github.com/odoo/odoo) Fleet + CRM (LGPL-3.0) — Base de datos vehicular, inventario, CRM
- Frappe Dealership Management (MIT) — Alternativa Frappe: contratos, financiamiento, servicio
- LangGraph + Claude claude-sonnet-5 — Agente de calificación y seguimiento de leads
- WhatsApp Business API — Canal principal de comunicación LATAM

**Cómo conectar**:
```
Lead entra por WhatsApp / web form
→ Agente LangGraph:
   - tools: [query_inventory_odoo, check_financing_options, schedule_test_drive, update_crm_odoo]
   - Califica intención (nuevo/usado, presupuesto, modelo)
   - Agenda test drive o deriva a vendedor humano
→ Odoo CRM actualizado automáticamente
→ Vendedor recibe summary + transcripción
```

**Customización clave**:
- Catálogo de vehículos sincronizado en tiempo real desde Odoo
- Flujo de financiamiento con opciones de crédito LATAM (Banorte, Itaú, etc.)
- Handoff a vendedor humano cuando el lead indica "quiero hablar con alguien"
- Spanish/Portuguese-first, tono adaptable por marca (premium vs. budget)

**Tiempo estimado**: 6-10 semanas
**ROI esperado**: +25-40% conversión de leads, -70% carga de trabajo de calificación manual
**Mercado objetivo**: Grupos concesionarios México, Brasil, Argentina

---

## P3: ADAS Simulation Lab — Validación CI de Agentes de Conducción

**Problema**: OEMs y Tier-1s necesitan validar modelos ADAS antes de desplegar; el proceso manual es lento y caro.

**Stack**:
- [carla-simulator/carla](https://github.com/carla-simulator/carla) (MIT) — Simulador AV: sensores, clima, agentes, towns; UE5 branch
- [autowarefoundation/autoware_vision_pilot](https://github.com/autowarefoundation/autoware_vision_pilot) (Apache-2.0) — L2 ADAS modelo base a validar/extender
- [erdos-project/pylot](https://github.com/erdos-project/pylot) (Apache-2.0) — Pipeline de percepción + planificación + control
- [MasoudJTehrani/PCLA](https://github.com/MasoudJTehrani/PCLA) (Apache-2.0) — Framework de testing para agentes en CARLA
- [carla-simulator/ros-bridge](https://github.com/carla-simulator/ros-bridge) (MIT) — Integración ROS2 ↔ CARLA
- LangGraph + Claude — Agente de análisis de resultados y generación de reportes

**Cómo conectar**:
```
CI/CD trigger (GitHub Actions) → CARLA headless en cloud GPU
→ Scenarios automáticos (PCLA): rain, highway, urban, night
→ autoware_vision_pilot ejecuta manejo autónomo en cada escenario
→ Pylot captura métricas: colisiones, confort, latencia
→ LangGraph Agent analiza logs + genera reporte de safety
→ Claude redacta executive summary + recommendations
→ Artifact guardado en S3 + notificación Slack
```

**Customización clave**:
- Suite de escenarios personalizados por cliente (carreteras LATAM, condiciones de lluvia tropical)
- Integración con nuReasoning benchmark para validar razonamiento en escenarios long-tail
- Dashboard web con métricas históricas de safety score por versión de modelo

**Tiempo estimado**: 10-16 semanas
**ROI esperado**: -60% tiempo de validación vs. pruebas manuales, catch de regresiones en CI
**Mercado objetivo**: Tier-1 suppliers, startups ADAS, labs universitarios automotrices

---

## P4: In-Cabin AI Agent — Asistente Inteligente en Vehículo

**Problema**: Los asistentes de voz vehiculares actuales (regla-based) no pueden manejar consultas complejas, multi-turno o contextuales.

**Stack**:
- [SuperdeMan/cockpit-agent](https://github.com/SuperdeMan/cockpit-agent) (MIT) — Sistema multi-agente cloud-edge para cabina
- [eclipse-kuksa/kuksa-databroker](https://github.com/eclipse-kuksa/kuksa-databroker) (Apache-2.0) — Señales vehiculares (velocidad, fuel, temperatura)
- [emqx/emqx](https://github.com/emqx/emqx) (Apache-2.0) — Mensajería edge-cloud < 1ms
- Whisper (MIT) — STT on-device para reconocimiento de voz
- Ollama + llama3 / Claude Haiku — LLM on-device o cloud según latencia requerida
- Android Automotive OS / QNX — Plataforma IVI

**Cómo conectar**:
```
Usuario dice "¿Cuánta autonomía me queda para llegar a Monterrey?"
→ Whisper (on-device, ~200ms) → texto
→ cockpit-agent: edge intent router
   - Intención local (ruta, música, clima) → responde en 400ms total
   - Intención compleja (hotel, reserva, diagnóstico) → relay a cloud LLM
→ Kuksa databroker: fuel_level, range_estimate, location
→ Claude Haiku (cloud): razonamiento + respuesta natural
→ EMQX: control de actuadores (AC, pantalla, audio)
→ TTS → respuesta de voz al usuario (< 1.2s total)
```

**Customización clave**:
- Wakeword personalizado por marca ("Hey [Marca]")
- Integración con Google Maps / Apple Maps para routing
- Seguridad: comandos de vehículo (frenos, acelerador) nunca expuestos al LLM; solo via APIs validadas
- Soporte multi-idioma (ES, PT, EN) sin cambio de modelo

**Tiempo estimado**: 12-18 semanas (desde PoC a integración IVI)
**ROI esperado**: NPS +15 puntos en cabina; diferenciación de producto para OEM
**Mercado objetivo**: OEMs medianos buscando IVI inteligente sin coste de Google/Amazon

---

## P5: SDV OTA Intelligence — Actualizaciones Inteligentes de Software Vehicular

**Problema**: Los OEMs necesitan actualizar software de millones de vehículos de forma segura, priorizando por criticidad y condición del vehículo.

**Stack**:
- [eclipse-sdv org / Eclipse S-CORE](https://github.com/orgs/eclipse-sdv/repositories) (Apache-2.0) — Middleware SDV: apps, services, comunicación
- [eclipse-kuksa/kuksa-databroker](https://github.com/eclipse-kuksa/kuksa-databroker) (Apache-2.0) — Telemetría de estado del vehículo pre-update
- [emqx/emqx](https://github.com/emqx/emqx) (Apache-2.0) — Canal de distribución OTA MQTT
- LangGraph + Claude claude-sonnet-5 — Agente de decisión de rollout + monitoreo post-deploy
- Grafana + ClickHouse — Observabilidad de flota post-update

**Cómo conectar**:
```
Nueva versión SW lista en artefacto storage
→ Agente LangGraph:
   tools: [query_fleet_state_kuksa, segment_vehicles_by_risk, create_rollout_plan, trigger_ota_emqx, monitor_rollout_grafana]
1. Segmenta flota: vehículos < 20% batería, en movimiento, o en zona sin cobertura → excluidos
2. Genera plan de rollout: 1% → 5% → 20% → 100% con métricas de abort
3. Monitorea: error rates, crashlogs, performance regressions post-update
4. Abort automático si error rate > threshold
5. Report ejecutivo diario por Claude
```

**Tiempo estimado**: 14-20 semanas
**ROI esperado**: -90% tiempo de rollout manual, 0 recalls por software defectuoso en rollout
**Mercado objetivo**: OEMs con > 100,000 vehículos conectados

---

## P6: Manufactura Automotriz LATAM — Calidad + Productividad AI

**Problema**: Plantas automotrices en México tienen procesos de control de calidad manuales con alta tasa de re-trabajo.

**Stack**:
- [frappe/erpnext](https://github.com/frappe/erpnext) (GPL-3.0) — ERP de manufactura: BOM, órdenes de producción, calidad
- [emqx/emqx](https://github.com/emqx/emqx) (Apache-2.0) — Ingest de sensores de línea (temperatura, vibración, torque)
- LangGraph + Claude claude-sonnet-5 — Agente de control de calidad + alertas predictivas
- Visión computacional (OpenCV + YOLOv10) — Inspección automática de piezas
- Grafana — Dashboard de KPIs de producción en tiempo real

**Cómo conectar**:
```
Línea de ensamblaje → Sensores IoT → EMQX (MQTT)
EMQX → Rule engine → Kafka → LangGraph Agent:
  tools: [detect_anomaly_vibration, trigger_quality_inspection, create_work_order_erpnext, alert_shift_supervisor]

Cámara de inspección → YOLOv10 (defect detection) → si defecto:
  → agente crea registro de no-conformidad en ERPNext
  → notifica a operador con descripción del defecto en español
  → sugiere acción correctiva basada en historial

Diariamente: Claude genera reporte de calidad + recomendaciones de mejora de proceso
```

**Tiempo estimado**: 10-16 semanas
**ROI esperado**: -25% tasa de defectos, -35% re-trabajo, -50% tiempo de inspección manual
**Mercado objetivo**: Plantas Tier-1 y Tier-2 en México (Guanajuato, Puebla, Monterrey)

---

## P7: VLA Fine-Tuning para Escenarios LATAM — Custom AD Agent

**Problema**: Los modelos VLA de conducción autónoma (OpenDriveVLA, autoware_vision_pilot) están entrenados en datasets EE.UU./Europa; no manejan bien escenarios LATAM: intersecciones sin señalización, baches, motociclistas entre carriles, lluvias tropicales.

**Stack**:
- [DriveVLA/OpenDriveVLA](https://github.com/DriveVLA/OpenDriveVLA) (Apache-2.0) — VLA 3B/7B base; AAAI 2026 SOTA
- [carla-simulator/carla](https://github.com/carla-simulator/carla) (MIT) — Simulador + digital twins de ciudades LATAM (OpenStreetMaps → CARLA)
- [nutonomy/nuscenes-devkit](https://github.com/nutonomy/nuscenes-devkit) (Apache-2.0) — Formato de datos para fine-tuning
- [MasoudJTehrani/PCLA](https://github.com/MasoudJTehrani/PCLA) (Apache-2.0) — Testing del agente fine-tuned en CARLA
- BLUE gate (arXiv:2606.08684) — Capa de optimización para reducir latencia on-vehicle
- LangGraph + Claude — Agente de curación de datos + evaluación automática de resultados

**Cómo conectar**:
```python
# Fase 1: Recolección de datos LATAM
# Dash cam data de flotas cliente en México/Brasil → formato nuScenes
data_pipeline = [
    "dash_cam_footage",        # video multi-cámara del cliente
    "gps_track",               # trayectoria GPS
    "carla_synthetic_data",    # escenarios sintéticos LATAM (baches, lluvia tropical)
]

# Fase 2: Fine-tuning OpenDriveVLA
# Base: DriveVLA/OpenDriveVLA 3B (Apache-2.0)
# Dataset: ~5k clips de conducción LATAM (real + sintético)
# Compute: 8xA100, ~48h de fine-tuning

# Fase 3: Validación con PCLA en CARLA
scenarios = ["ciudad_mexico_noche", "sao_paulo_lluvia", "bogota_rush_hour", "carretera_federal_tope"]
for scenario in scenarios:
    result = pcla.run_agent(finetuned_vla, scenario)
    metrics = {"l2_error": result.l2, "collision_rate": result.collisions, "comfort": result.comfort}

# Fase 4: BLUE gate para optimización on-vehicle
# 0.11M params gate → decide per-frame: language vs. action
# → 2.54x speedup vs. VLA baseline → apto para edge compute vehicular
```

**Dataset mínimo viable**: 2,000 clips de 20s (60% real, 40% CARLA sintético)
**Compute estimado**: 8xA100 × 48h ($4,000-8,000 en cloud)
**Benchmark target**: L2 error < 0.45m en nuScenes LATAM subset; collision rate < 0.5% en CARLA LATAM scenarios

**Tiempo estimado**: 16-24 semanas (data collection + fine-tuning + validation)
**ROI esperado**: Modelo de AD específico para LATAM como IP diferenciadora; licenciable a OEMs/Tier-1s regionales
**Mercado objetivo**: Startups de robottaxi/robotrucking en Brasil/México; OEMs con operaciones LATAM

---

## Guía de selección de patrón

| Si el cliente tiene... | Recomienda... |
|------------------------|---------------|
| Flota de > 50 vehículos sin telemetría | P1 — Fleet AI Mantenimiento |
| Concesionaria o grupo dealer | P2 — Dealer Copilot |
| Necesidad de validar ADAS / modelos AV | P3 — ADAS Simulation Lab |
| OEM buscando diferenciación en cabina | P4 — In-Cabin AI Agent |
| OEM con > 100k vehículos conectados | P5 — SDV OTA Intelligence |
| Planta de manufactura automotriz | P6 — Manufactura LATAM |
| OEM o Tier-1 buscando AD para LATAM | P7 — VLA Fine-Tuning LATAM |

---
*Ver: `agents/top.md` para lista completa de agentes. `verticals/solutions.md` para plataformas base.*
