# 🧩 Patrones de composición — Automotive

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-12 (v8)

## Arquitectura base

```
[Plataforma vertical base (open source)]
          ↓
[Capa de integración AI / MCP server]
          ↓
[Agentes especializados de Automotive]
          ↓
[UI conversacional / API / edge device]
```

---

## Patrón 1: Fleet Intelligence Platform
> **Caso**: Empresa de transporte LATAM quiere reducir costos operativos y accidentes

**Stack**:
- `fleetbase/fleetbase` (AGPL-3.0) — fleet management OS modular, dashboard, API REST
- `traccar/traccar` (Apache-2.0) — GPS tracking, geofencing, telemetría en tiempo real
- `emqx/emqx` (Apache-2.0) — MQTT broker + MCP-over-MQTT bridge para AI agents
- LangGraph + Claude Sonnet — agente de análisis y predicción
- WhatsApp API (Twilio) — notificaciones a conductores y dispatchers

**Flujo**:
```
Dispositivo GPS → MQTT → EMQX broker
    → MCP-over-MQTT: AI agent consulta telemetría en tiempo real
    → LangGraph agent (análisis de comportamiento, Z-score sobre velocidad/ralentí)
    → Claude Sonnet (genera reporte en español/portugués)
    → Fleetbase API: actualiza driver score + alerta dispatcher
    → WhatsApp: "Conductor López: exceso de velocidad en Ruta 9, km 45"
    → Dashboard Fleetbase: mapa en tiempo real + KPIs + scoring
```

**Tiempo estimado**: 4-6 semanas a MVP
**Por qué funciona**: Fleetbase maneja la capa de gestión; Traccar + EMQX exponen telemetría vía MCP; Claude cierra el loop en lenguaje natural.

---

## Patrón 2: Taller Automotriz Inteligente (LATAM SMB)
> **Caso**: Red de talleres independientes que quiere digitalizar diagnóstico y presupuestación

**Stack**:
- `frappe/erpnext` + Car Repair Management app (MIT/GPL-3) — ERP de taller
- `libracore/erpnext_repairs` (MIT) — módulo de reparaciones
- Auto.dev MCP Server — consulta de specs, recalls y datos de vehículo
- MCP server custom sobre API Frappe — puente AI ↔ ERP
- Claude Haiku (edge/low-cost) — diagnóstico en lenguaje natural

**Flujo**:
```
Mecánico conecta lector OBD-II → envía códigos P0300, P0420
    → Auto.dev MCP: VIN decode + recall lookup + specs técnicas
    → MCP Frappe: repuestos disponibles, precios, tiempo estimado
    → Claude Haiku: "El vehículo tiene falla de encendido en cilindro 1 y catalizador agotado.
       Repuestos en stock: bujías (4 unidades, $12). Recall activo: campaña #SA-045.
       Tiempo estimado: 2 horas. Presupuesto: $145."
    → ERPNext: genera orden de trabajo + presupuesto automático
```

**Tiempo estimado**: 6-8 semanas
**Diferenciador LATAM**: Español/portugués nativo, precios en moneda local, lookup de recalls en tiempo real vía Auto.dev MCP.

---

## Patrón 3: In-Cabin Voice Agent (OEM / Aftermarket)
> **Caso**: OEM o proveedor Tier-1 quiere diferenciarse con asistente de voz conversacional

**Stack**:
- NVIDIA DRIVE AGX Thor o Qualcomm Snapdragon Ride Flex (edge compute en vehículo)
- Whisper v3 (MIT) — ASR multilingüe en device
- Claude Haiku / Sonnet (on-cloud o fine-tuned pequeño on-device)
- `NVlabs/OmniDrive` — comprensión 3D de la escena para contexto
- Coqui TTS (Apache-2.0) — síntesis de voz en español/portugués

**Flujo**:
```
Conductor: "Tengo frío y hay un embotellamiento en la autopista"
    → Whisper: transcripción en tiempo real
    → OmniDrive: estado de la escena (velocidad, ruta, tiempo)
    → Claude: "Subiendo temperatura a 22°C. Hay 8 km de tráfico en la Panamericana,
               sugiero desvío por Libertador. ¿Quieres que lo active en el GPS?"
    → Coqui TTS: respuesta en audio natural en español
    → CAN bus: ajuste de clima automático
```

**Tiempo estimado**: 10-14 semanas (hardware + integración CAN)
**Oportunidad**: Español/portugués sub-atendidos por asistentes actuales (Siri, Alexa Auto). Mercedes, Honda, VW aún sin solución para LATAM.

---

## Patrón 4: AV Simulation & Validation Pipeline
> **Caso**: Equipo de ingeniería AV quiere evaluar modelos de conducción en condiciones LATAM

**Stack**:
- `carla-simulator/carla` (MIT) — entorno de simulación fotorrealista
- `MasoudJTehrani/PCLA` (Apache-2.0) — framework de testing automatizado
- `NVlabs/alpamayo` (Apache-2.0) o `NVIDIA/LCDrive` — modelo VLA a evaluar
- `autowarefoundation/autoware_universe` — stack AV baseline
- GitHub Actions / CI pipeline — evaluación continua en PR

**Flujo**:
```
PR con cambios en modelo/stack
    → CARLA lanza escenarios: lluvia, tráfico mixto, señales LATAM
    → PCLA ejecuta suite de tests: L2 ADAS, maniobras de emergencia
    → Alpamayo (chain-of-thought explícito para debugging) vs LCDrive (latent CoT para velocidad)
    → Métricas: L2 displacement error, collision rate, comfort score, tokens/inference
    → Reporte automático en PR comentario
```

**Tiempo estimado**: 3-4 semanas (pipeline CI)
**Valor**: Evaluar trade-off explicabilidad (Alpamayo) vs eficiencia embebida (LCDrive) antes de hardware real.

---

## Patrón 5: Predictive Maintenance Agent (Concesionario / Flota)
> **Caso**: Concesionario o flota corporativa quiere anticipar fallas antes de que ocurran

**Stack**:
- `emqx/emqx` (Apache-2.0) — MQTT broker + MCP bridge para telemetría vehicular
- `jmnda-dev/fleetms` (MIT) — historial de mantenimientos, órdenes de servicio
- LangGraph — agente de análisis de series temporales
- Claude Sonnet — generación de alertas y recomendaciones
- SMTP/WhatsApp — notificación al fleet manager

**Flujo**:
```
Sensor: temperatura de aceite subiendo gradualmente (15 días de datos)
    → EMQX MCP: AI agent recibe telemetría en tiempo real vía MCP-over-MQTT
    → LangGraph: detecta tendencia anómala via Z-score
    → fleetms API: último cambio de aceite hace 8,500 km (vence a 10,000)
    → Claude: "Vehículo ABC-123 muestra calentamiento inusual de aceite.
               Próximo mantenimiento en 1,500 km pero la tendencia sugiere revisión
               anticipada. Recomiendo agendar en los próximos 3 días."
    → fleetms: genera OS preventiva + notifica al conductor
```

**Tiempo estimado**: 5-7 semanas
**ROI**: Reducción de 40-60% en fallas en ruta. fleetms (MIT) — sin restricciones para producto comercial.

---

## Patrón 6: L2 ADAS Deployment para OEM Local
> **Caso**: OEM o ensambladora LATAM quiere agregar ADAS L2 sin licencias costosas

**Stack**:
- `autowarefoundation/autoware_vision_pilot` (Apache-2.0) — stack L2 ADAS con pesos
- `autowarefoundation/autoware_universe` — planificación y percepción extendida
- `carla-simulator/carla` — validación en simulación
- NVIDIA Jetson Orin o Qualcomm Snapdragon Ride Flex — hardware edge en vehículo
- `Zwc2003/DriveAgent-R1` (MIT) — fine-tuning para casos borde LATAM

**Flujo**:
```
Cámara frontal → VisionPilot: detección de carril y vehículos
    → Autoware Universe: planificación de trayectoria
    → DriveAgent-R1 (fine-tuned LATAM): manejo de casos borde
       (motocicletas entre carriles, señales oxidadas, baches)
    → CAN bus: comandos de dirección y freno
    → Validación: suite PCLA en CARLA antes de cada OTA update
```

**Tiempo estimado**: 16-24 semanas (incluye certificación ISO 26262)
**Ahorro**: ~$2,000-5,000 por vehículo vs. soluciones propietarias (Mobileye, etc.)

---

## Patrón 7: Multi-Modal Driving World Model (Research)
> **Caso**: Lab de AI / OEM grande quiere construir modelo fundacional propio para AV

**Stack**:
- `OpenDriveLab/UniAD` (Apache-2.0) — framework unificado percepción+predicción+plan
- `NVlabs/OmniDrive` (Apache-2.0) — representación 3D sparse-query + VQA
- `opendilab/LMDrive` (Apache-2.0) — conducción guiada por lenguaje
- Metis (arXiv:2606.15869) — world-action model generalizable
- nuScenes / Waymo Open Dataset — datos de pre-entrenamiento
- `carla-simulator/carla` — generación de datos sintéticos para casos borde

**Flujo de entrenamiento**:
```
nuScenes + CARLA synthetic data + datos LATAM propios
    → UniAD: pre-entrenamiento backbone percepción
    → OmniDrive: fine-tuning 3D + VQA tasks
    → LMDrive: instruction following en closed-loop
    → Metis: world-action model para generalización a escenarios no vistos
    → CARLA + PCLA: evaluación continua
    → Resultado: modelo fundacional AD con capacidad multilingüe + escenarios LATAM
```

**Tiempo estimado**: 6-12 meses (investigación)
**Oportunidad**: Globant como partner técnico para OEMs que quieren independencia de NVIDIA/Qualcomm.

---

## Patrón 8: LATAM EV Fleet + Charging Optimization
> **Caso**: Empresa de delivery o transporte urbano LATAM con flota de EVs

**Stack**:
- `fleetbase/fleetbase` (AGPL-3.0) — gestión de flota, pedidos, accounting
- `emqx/emqx` (Apache-2.0) — MQTT + MCP bridge para SOC en tiempo real
- LangGraph + Claude Sonnet — agente de routing con restricciones de carga
- OpenStreetMap + OSRM — rutas + puntos de carga disponibles

**Flujo**:
```
Flota de 20 EVs en operación
    → EMQX MCP: SOC (state of charge) en tiempo real por vehículo vía MCP-over-MQTT
    → LangGraph agent: reasigna pedidos considerando autonomía restante
    → Claude: "Vehículo 7 necesita carga en 45 min. Cargador disponible
               en Av. Corrientes 1200, a 3 min de su ruta actual. ¿Desvío?"
    → Fleetbase: registro de costos de energía por vehículo + dashboard
```

**Tiempo estimado**: 6-8 semanas
**Diferenciador**: Optimización en tiempo real en español + integración con redes de carga LATAM.

---

## Patrón 9: MCP-over-MQTT Connected Fleet Intelligence (NUEVO v8)
> **Caso**: Integrar AI agents nativamente con flotas existentes que ya hablan MQTT, sin cambiar el stack vehicular

**Stack**:
- `emqx/emqx` (Apache-2.0, ~15k stars) — MQTT broker con MCP-over-MQTT bridge nativo
- `traccar/traccar` (Apache-2.0) o cualquier telemática MQTT existente
- Claude Sonnet 5 vía Anthropic API — agente conversacional sobre datos vehiculares
- LangGraph — orquestador multi-step para análisis complejo

**Flujo**:
```
Telemetría vehicular (GPS, RPM, temperatura, fuel, DTC codes)
    → Publicada en topics MQTT: vehicles/{id}/telemetry
    → EMQX MCP bridge: expone topics MQTT como tools MCP
    → Claude puede invocar: get_vehicle_telemetry(id), get_fleet_summary(), get_anomalies()
    → Flujo conversacional: "¿Cuál es el vehículo con mayor consumo de combustible esta semana?"
    → Claude accede a datos MQTT reales via MCP + devuelve análisis + recomendación
    → Sin modificar un solo microcontrolador ni firmware vehicular
```

**Tiempo estimado**: 2-3 semanas para integración básica sobre flota existente
**Diferenciador**: Zero-touch para el stack vehicular. Cualquier flota MQTT-connected se vuelve AI-native en semanas.
**Por qué ahora**: EMQX MCP-over-MQTT es nuevo en 2026 — ventana de oportunidad antes de que sea estándar de mercado.

---

## Patrón 10: V2X Cooperative Perception Agent (NUEVO v8)
> **Caso**: Ciudad o autopista inteligente quiere mejorar seguridad vehicular con percepción cooperativa

**Stack**:
- `emqx/emqx` (Apache-2.0) — broker MQTT V2X (Vehicle-to-Everything)
- DriveX Foundation Model (a publicar post-CVPR 2026) — percepción cooperativa nativa V2X
- `Zwc2003/DriveAgent-R1` (MIT) — agente con Active Perception por vehículo
- `autowarefoundation/autoware_universe` (Apache-2.0) — stack AV en vehículo
- `carla-simulator/carla` (MIT) — simulación de escenario V2X cooperativo

**Flujo**:
```
Intersección inteligente: infraestructura + 4 vehículos + 2 peatones
    → Cada vehículo publica percepción local via MQTT V2X topic
    → EMQX: broker de mensajes V2X, latencia <10ms
    → DriveX Foundation Model en servidor edge de la intersección:
        funde percepción de todos los agentes → mapa cooperativo
        predice trayectorias de todos los participantes
        detecta conflictos: "Vehículo 3 y peatón 1 van a colisionar en 2.3s"
    → DriveAgent-R1 en cada vehículo: recibe alerta via MCP + ajusta plan
    → Resultado: frenada anticipada antes de que el sensor local detecte al peatón
```

**Tiempo estimado**: 12-16 semanas (simulación) + 24+ semanas (despliegue real)
**Valor**: La percepción cooperativa reduce accidentes en hasta 30% en intersecciones (dato de industria).
**Aplicación LATAM**: Ciudades como São Paulo, CDMX y Buenos Aires con iniciativas de Smart City activas.
