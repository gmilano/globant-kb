# Patrones de Composición — Automotive

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-13

## Patrón base

```
[Plataforma vertical base (open source)]
          ↓
[Capa de datos en tiempo real (EMQX / ROS 2)]
          ↓
[Servidores MCP especializados por dominio]
          ↓
[Agente Claude con herramientas específicas]
          ↓
[UI conversacional / API / Dashboard]
```

---

## Receta P1: Mantenimiento Predictivo de Flota

**Caso de uso**: Detectar fallas antes de que ocurran en flotas de camiones, buses o maquinaria de manufactura.

**Tiempo estimado**: 6-8 semanas | **Costo infra**: ~$500-2.000/mes

### Stack
- **Base**: [Fleetbase](https://github.com/fleetbase/fleetbase) — gestión de flota (GPS, despacho, historial)
- **Datos**: [EMQX](https://github.com/emqx/emqx) — broker MQTT para telemetría de vehículos en tiempo real
- **AI Engine**: [predictive-maintenance-mcp](https://github.com/LGDiMaggio/predictive-maintenance-mcp) — análisis de vibraciones y fallas
- **Agente**: Claude claude-sonnet-5 con herramientas MCP de diagnóstico
- **Alertas**: WhatsApp Business API + Claude para notificaciones en lenguaje natural

### Arquitectura
```
Sensores vehiculares (OBD-II / CAN bus)
          ↓ MQTT
    EMQX Broker
          ↓
  predictive-maintenance-mcp
    (análisis espectral, FFT, detección de fallas)
          ↓ MCP tools
    Claude Agent
    ("El motor del camión ABC-123 muestra vibración anómala en rodamiento trasero.
      Probabilidad de falla en 72hs: 87%. Recomendar revisión urgente.")
          ↓
  Fleetbase (crear orden de trabajo)
  + WhatsApp al jefe de flota
```

### Customización LATAM
- Idioma: español / portugués nativo
- Offline mode: Ollama local para rutas sin conectividad (guía incluida en repo)
- Integración: SURA / Rimac seguros para reportes automáticos de mantenimiento

---

## Receta P2: AI Copilot para Concesionario

**Caso de uso**: Agente conversacional para gestión de leads, presupuestos, agendamiento de servicio y seguimiento post-venta en concesionarios.

**Tiempo estimado**: 8-10 semanas | **Costo infra**: ~$300-800/mes

### Stack
- **Base**: [Odoo](https://github.com/odoo/odoo) — CRM, inventario de vehículos, servicio técnico
- **Agente**: Claude con tools MCP que exponen la API Odoo
- **Canal**: WhatsApp Business (Twilio) + Web chat
- **Reportes**: Odoo BI + generación automática de informes por Claude

### Arquitectura
```
Cliente (WhatsApp / Web)
          ↓
    Claude Agent
    (interpreta intención: test drive, precio, servicio)
          ↓ MCP tools
    Odoo API
    (consulta stock, crea lead, agenda cita)
          ↓
    Respuesta personalizada al cliente
    + Notificación al vendedor
```

### Valor medido
- 40% reducción en tiempo de respuesta a leads
- 25% mejora en conversión de leads a test drive
- 60% automatización de consultas repetitivas

---

## Receta P3: Pipeline de Validación ADAS

**Caso de uso**: Validar comportamiento de un agente autónomo en escenarios de prueba antes de pruebas en vehículo real.

**Tiempo estimado**: 4-6 semanas (setup) + continuo | **Costo infra**: GPU cloud ~$2.000-5.000/mes

### Stack
- **Simulador**: [CARLA](https://github.com/carla-simulator/carla) — simulación fotorrealista de escenarios de conducción
- **AV Stack**: [Autoware](https://github.com/autowarefoundation/autoware) o [openpilot](https://github.com/commaai/openpilot) — agente de conducción
- **Evaluador**: [PCLA](https://github.com/MasoudJTehrani/PCLA) — framework de evaluación de métricas
- **Orquestador**: Claude Agent — diseña escenarios de prueba, analiza resultados, genera reportes
- **Bridge**: [carla-simulator/ros-bridge](https://github.com/carla-simulator/ros-bridge) — conecta CARLA con Autoware

### Arquitectura
```
Claude Agent
(genera escenarios: "intersección con peatón + lluvia + visibilidad reducida")
          ↓
    CARLA Simulator
    (ejecuta escenario, genera sensor data)
          ↓ ROS Bridge
    Autoware / openpilot
    (toma decisiones de conducción)
          ↓ PCLA metrics
    Claude Agent
    (analiza: colisiones, confort, cumplimiento de señales)
          ↓
    Reporte: "Tasa de éxito: 94.2%. Fallas en: semáforos con oclusión parcial."
```

---

## Receta P4: In-Cabin AI Conversacional

**Caso de uso**: Asistente multimodal dentro del vehículo. Control por voz + contexto + integración con servicios del ecosistema del vehículo.

**Tiempo estimado**: 10-14 semanas | **Costo infra**: Hardware + cloud ~$1.000-3.000/mes

### Stack
- **Arquitectura**: [cockpit-agent](https://github.com/SuperdeMan/cockpit-agent) — multi-agent cloud-edge
- **Modelos**: Claude Haiku (edge, intent detection) + Claude Sonnet (cloud, planificación)
- **Audio**: ASR local + TTS (edge) para baja latencia
- **Integración**: CAN bus adapter → MCP tool para control vehicular
- **Maps/POI**: HERE o Mapbox API como MCP tool

### Arquitectura
```
Voz del conductor
          ↓ ASR (edge)
    Intent Agent (Haiku, edge)
    (clasificar: navegación / música / control HVAC / pregunta general)
          ↓ si complejo
    Planning Agent (Sonnet, cloud)
    (planificar: "Busca restaurante vegetariano en ruta a destino")
          ↓ VAL safety layer
    Vehicle Control (CAN bus MCP)
    + Maps MCP + Music MCP
          ↓
    Respuesta TTS al conductor
```

### Seguridad
- VAL (Vehicle Abstraction Layer) como gate de seguridad antes de cualquier control vehicular
- Todas las acciones de control pasan por validación de estado actual del vehículo
- Modo degradado local si pierde conectividad

---

## Receta P5: SDV OTA Intelligence Agent

**Caso de uso**: Agente que gestiona el ciclo de vida de actualizaciones OTA en una flota de vehículos SDV. Decide qué versiones desplegar, en qué orden, con qué rollback plan.

**Tiempo estimado**: 12-16 semanas | **Costo infra**: Kubernetes cluster + ~$3.000/mes

### Stack
- **Base SDV**: [Eclipse S-CORE](https://github.com/eclipse-score) + [Eclipse SDV Blueprints](https://github.com/eclipse-sdv-blueprints) — foundation vehicular
- **Comunicación**: [EMQX](https://github.com/emqx/emqx) — delivery y confirmación de OTA a vehículos
- **Orquestación**: Claude Agent con herramientas de fleet state, version registry, rollback
- **CI/CD**: GitHub Actions → build → CARLA validation → fleet deployment

### Arquitectura
```
Nuevo release de software vehicular (GitHub tag)
          ↓ CI
    CARLA + PCLA (validación automatizada)
          ↓ si pass
    Claude OTA Agent
    ("¿Desplegar v2.3.1 al 5% de la flota primero?")
    [Analiza: historial de fallas, conectividad de vehículos, horario óptimo]
          ↓ EMQX
    OTA delivery a vehículos seleccionados
          ↓ monitoring 24h
    Auto-rollback si métricas caen
```

---

## Receta P6: Manufactura Automotriz — Calidad + Trazabilidad AI

**Caso de uso**: AI para inspección de calidad visual en línea de ensamblaje + trazabilidad de componentes + mantenimiento predictivo de equipos de producción. Mercado objetivo: maquiladoras México.

**Tiempo estimado**: 10-14 semanas | **Costo infra**: GPUs edge + cloud ~$5.000/mes

### Stack
- **ERP**: [ERPNext/Frappe](https://github.com/frappe/frappe) — BOM, producción, trazabilidad
- **Visión**: PyTorch + YOLO (detección de defectos) en cámaras de línea
- **Mantenimiento**: [predictive-maintenance-mcp](https://github.com/LGDiMaggio/predictive-maintenance-mcp) para equipos de producción
- **Agente**: Claude con herramientas de quality database, production metrics, maintenance history
- **Dashboard**: Frappe + reportes AI generados

### KPIs objetivo
- Detección de defectos: >99% precision, <0.1% false negative
- Reducción de downtime por mantenimiento no planificado: 40-60%
- Trazabilidad completa de componentes: 100% (cumplimiento IATF 16949)
- ROI estimado: 18-24 meses

---

## Selección de receta por perfil de cliente

| Perfil cliente | Receta recomendada | Tiempo | ROI |
|----------------|-------------------|--------|-----|
| Concesionario LATAM (50+ empleados) | P2 — AI Dealer Copilot | 8-10 sem | 12 meses |
| Flota logística (200+ vehículos) | P1 — Predictive Maintenance | 6-8 sem | 18 meses |
| OEM / Tier-1 (validación AV) | P3 — ADAS Validation Pipeline | 4-6 sem setup | ROI en safety |
| OEM premium (in-cabin experience) | P4 — In-Cabin AI | 10-14 sem | 24 meses |
| OEM con SDV (gestión OTA) | P5 — OTA Intelligence Agent | 12-16 sem | 18 meses |
| Maquiladora automotriz (México) | P6 — Manufactura AI | 10-14 sem | 18-24 meses |
