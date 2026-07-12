# 🧩 Patrones de composición — Automotive

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-12 (v7)

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
- `traccar/traccar` (Apache-2.0) — GPS tracking, geofencing, telemetría en tiempo real
- `openremote/openremote` (AGPL-3.0) — IoT platform, dashboard de flota
- LangGraph + Claude Sonnet 3.5 — agente de análisis y predicción
- WhatsApp API (Twilio) — notificaciones a conductores y dispatchers

**Flujo**:
```
Traccar (telemetría GPS + velocidad + ralentí)
    → LangGraph agent (análisis de comportamiento)
    → Claude Sonnet (genera reporte en español/portugués)
    → WhatsApp: "Conductor López: exceso de velocidad en Ruta 9, km 45"
    → Dashboard OpenRemote: mapa en tiempo real + KPIs
```

**Tiempo estimado**: 4-6 semanas a MVP
**Por qué funciona**: Traccar soporta 2000+ dispositivos GPS, Apache-2.0, sin licencias.

---

## Patrón 2: Taller Automotriz Inteligente (LATAM SMB)
> **Caso**: Red de talleres independientes que quiere digitalizar diagnóstico y presupuestación

**Stack**:
- `frappe/erpnext` + Car Repair Management app (MIT/GPL-3) — ERP de taller
- `libracore/erpnext_repairs` (MIT) — módulo de reparaciones
- MCP server custom sobre API Frappe — puente AI ↔ ERP
- Claude Haiku (edge/low-cost) — diagnóstico en lenguaje natural
- OBD-II connector API — lectura de códigos de falla

**Flujo**:
```
Mecánico conecta lector OBD-II → envía códigos P0300, P0420
    → MCP server consulta ERPNext: repuestos disponibles, precios, tiempo estimado
    → Claude Haiku: "El vehículo tiene falla de encendido en cilindro 1 y catalizador agotado.
       Repuestos en stock: bujías (4 unidades, $12), catalizador (consultar proveedor).
       Tiempo estimado: 2 horas. Presupuesto: $145."
    → ERPNext: genera orden de trabajo + presupuesto automático
```

**Tiempo estimado**: 6-8 semanas
**Diferenciador LATAM**: Español/portugués nativo, precios en moneda local, proveedores locales.

---

## Patrón 3: In-Cabin Voice Agent (OEM / Aftermarket)
> **Caso**: OEM o proveedor Tier-1 quiere diferenciarse con asistente de voz conversacional

**Stack**:
- NVIDIA DRIVE AGX Thor (edge compute en vehículo)
- Whisper v3 (MIT) — ASR multilingüe en device
- Claude Haiku / Sonnet (on-cloud o fine-tuned pequeño on-device)
- `NVlabs/OmniDrive` — comprensión 3D de la escena para contexto
- TTS edge (Coqui TTS, Apache-2.0) — síntesis de voz en español

**Flujo**:
```
Conductor: "Tengo frío y hay un embotellamiento en la autopista"
    → Whisper: transcripción en tiempo real
    → OmniDrive: estado de la escena (velocidad, ruta, tiempo)
    → Claude: "Subiendo temperatura a 22°C. Hay 8 km de tráfico en la Panamericana,
               sugiero desvío por Libertador. ¿Quieres que lo active en el GPS?"
    → TTS: respuesta en audio natural
    → CAN bus: ajuste de clima automático
```

**Tiempo estimado**: 10-14 semanas (hardware + integración CAN)
**Oportunidad**: Español/portugués sub-atendidos por asistentes actuales (Siri, Alexa Auto).

---

## Patrón 4: AV Simulation & Validation Pipeline
> **Caso**: Equipo de ingeniería AV quiere evaluar modelos de conducción en condiciones LATAM

**Stack**:
- `carla-simulator/carla` (MIT) — entorno de simulación fotorrealista
- `MasoudJTehrani/PCLA` (Apache-2.0) — framework de testing automatizado
- `NVlabs/alpamayo` (Apache-2.0) — modelo VLA a evaluar
- `autowarefoundation/autoware_universe` — stack AV baseline
- GitHub Actions / CI pipeline — evaluación continua en PR

**Flujo**:
```
PR con cambios en modelo/stack
    → CARLA lanza escenarios: lluvia, tráfico mixto, señales LATAM
    → PCLA ejecuta suite de tests: L2 ADAS, maniobras de emergencia
    → Alpamayo genera trayectorias + chain-of-thought
    → Métricas: L2 displacement error, collision rate, comfort score
    → Reporte automático en PR comentario
```

**Tiempo estimado**: 3-4 semanas (pipeline CI)
**Valor**: Evaluación reproducible antes de despliegue en hardware real.

---

## Patrón 5: Predictive Maintenance Agent (Concesionario / Flota)
> **Caso**: Concesionario o flota corporativa quiere anticipar fallas antes de que ocurran

**Stack**:
- `traccar/traccar` — telemetría vehicular (temperatura motor, RPM, km)
- ERPNext — historial de mantenimientos, órdenes de servicio
- LangGraph — agente de análisis de series temporales
- Claude Sonnet 3.5 — generación de alertas y recomendaciones
- SMTP/WhatsApp — notificación al fleet manager

**Flujo**:
```
Sensor: temperatura de aceite subiendo gradualmente (15 días de datos)
    → LangGraph: detecta tendencia anómala via Z-score
    → Consulta ERPNext: último cambio de aceite hace 8,500 km (vence a 10,000)
    → Claude: "Vehículo ABC-123 muestra calentamiento inusual de aceite.
               Próximo mantenimiento en 1,500 km pero la tendencia sugiere revisión
               anticipada. Recomiendo agendar en los próximos 3 días."
    → ERPNext: genera OS preventiva + notifica al conductor
```

**Tiempo estimado**: 5-7 semanas
**ROI**: Reducción de 40-60% en fallas en ruta (dato de industria).

---

## Patrón 6: L2 ADAS Deployment para OEM Local
> **Caso**: OEM o ensambladora LATAM quiere agregar ADAS L2 sin licencias costosas

**Stack**:
- `autowarefoundation/autoware_vision_pilot` (Apache-2.0) — stack L2 ADAS con pesos
- `autowarefoundation/autoware_universe` — planificación y percepción extendida
- `carla-simulator/carla` — validación en simulación
- NVIDIA Jetson Orin — hardware edge en vehículo (~$300-500 por unidad)
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
- nuScenes / Waymo Open Dataset — datos de pre-entrenamiento
- `carla-simulator/carla` — generación de datos sintéticos para casos borde

**Flujo de entrenamiento**:
```
nuScenes + CARLA synthetic data
    → UniAD: pre-entrenamiento backbone percepción
    → OmniDrive: fine-tuning 3D + VQA tasks
    → LMDrive: instruction following en closed-loop
    → CARLA + PCLA: evaluación continua
    → Resultado: modelo fundacional AD con capacidad multilingüe
```

**Tiempo estimado**: 6-12 meses (investigación)
**Oportunidad**: Globant como partner técnico para OEMs que quieren independencia de NVIDIA.

---

## Patrón 8: LATAM EV Fleet + Charging Optimization
> **Caso**: Empresa de delivery o transporte urbano LATAM con flota de EVs

**Stack**:
- `traccar/traccar` — tracking + estado de batería
- `TUMFTM/REVOL-E-TION` (Apache-2.0) — optimización de sistema de energía EV
- LangGraph + Claude Sonnet — agente de routing con restricciones de carga
- HERE Maps / OpenStreetMap — puntos de carga disponibles
- ERPNext — gestión de flota y costos

**Flujo**:
```
Flota de 20 EVs en operación
    → Traccar: estado SOC (state of charge) en tiempo real por vehículo
    → REVOL-E-TION: optimización de cuándo y dónde cargar (precio, tiempo)
    → LangGraph agent: reasigna pedidos considerando autonomía restante
    → Claude: "Vehículo 7 necesita carga en 45 min. Hay cargador disponible
               en Av. Corrientes 1200, a 3 min de su ruta actual. ¿Desvío?"
    → ERPNext: registro de costos de energía por vehículo
```

**Tiempo estimado**: 6-8 semanas
**Diferenciador**: Optimización en tiempo real en español + integración con redes de carga LATAM.
