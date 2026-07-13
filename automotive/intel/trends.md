# 📡 Tendencias — Automotive AI

> Última actualización: 2026-07-13 (v10)

## Tendencias clave — julio 2026

### T1: openpilot 0.11.1 — ADAS de producción con 60k★
- **Qué**: v0.11.1 (jun 2026) con mejoras en driver monitoring; ahora 60.6k★ (era 50k en 2025).
- **Señal**: comma.ai sigue siendo el mayor caso de ADAS open-source en producción real con 300+ modelos de autos.
- **Para Globant**: Base inmediata para demos y PoC de "asistente de conducción conversacional" en concesionarias premium.

### T2: autoware_vision_pilot — L2 ADAS gratis para OEMs
- **Qué**: La Autoware Foundation lanzó en 2026 un L2 ADAS completo (end-to-end, Apache-2.0), con pesos de modelos, pipeline de entrenamiento y arquitecturas.
- **Señal**: Primera vez que un L2 ADAS completo es realmente open-source y comercialmente utilizable (Apache-2.0).
- **Para Globant**: Oportunidad de ofrecer integración de vision_pilot a Tier-1s y OEMs medianos que no pueden costear Mobileye.

### T3: Eclipse SDV alcanza masa crítica (32 OEMs — CES 2026)
- **Qué**: 32 empresas en el MoU SDV. Hyundai Mobis se unió mayo 2026. TRATON (VW trucks). Eclipse S-CORE v0.5 GA. Informe "2026 State of Automotive SW Dev" publicado.
- **Señal**: El software vehicular se está convirtiendo en commodity open-source, similar a lo que Linux hizo con servidores.
- **Para Globant**: Posicionarse como system integrator de Eclipse SDV antes de que sea mainstream (2028-2030 ventana).

### T4: AI-Defined Vehicle (AIDV) — nueva categoría estratégica
- **Qué**: Los líderes del sector están adoptando "AIDV" como término para vehículos donde la IA define continuamente el comportamiento, actualizaciones y servicios.
- **Señal**: El vehículo deja de ser hardware depreciable y se convierte en nodo de servicios de alto margen. 91% de ejecutivos ve autonomía como clave de monetización.
- **Para Globant**: Narrativa de pitch para clientes OEM: "de SDV a AIDV con Globant como AI Systems Integrator".

### T5: NVIDIA DriveOS 7 + NIM microservices en producción
- **Qué**: DriveOS 7 en SoC Thor: múltiples VMs QNX + Linux. Nuevos NIM: BEVFormer (3D perception), SparseDrive (motion + planning). JLR vehículos 2026+ en plataforma NVIDIA DRIVE.
- **Señal**: El stack de referencia de la industria para AI vehicular en 2026-2030 es NVIDIA DRIVE + CUDA + NIM.
- **Para Globant**: Necesario tener expertise en NVIDIA stack para trabajar con OEMs premium.

### T6: Despliegue global de vehículos conectados (2026 = inflexión)
- **Qué**: 2025 fue el año de la escala de conectividad OTA. 2026 es el año del despliegue global: vehículos vistos como activos digitales a largo plazo.
- **Fases**: Phase 1 (Connected) ubiquitous by 2027 → Phase 2 (Augmented) 2030 → Phase 3 (Adaptive) 2035.
- **Para Globant**: Oportunidad en servicios de monetización post-venta (subscripciones OTA, safety bundles).

### T7: AI agéntica en cabina inteligente (IVI)
- **Qué**: Los asistentes de voz están evolucionando a sistemas agénticos multi-modal. Mercedes MBUX con Google Automotive AI Agent; cockpit-agent (open-source) con cloud-edge.
- **Señal**: La cabina se convierte en la interfaz principal del usuario con el vehículo. NLP + visión + control vehicular integrados.
- **Para Globant**: Proyectos de IVI agent integration con LLMs (Claude Haiku para latencia) son realizables en 3-4 meses.

### T8: Mantenimiento predictivo con AI — ROI demostrado
- **Qué**: Los sensores de vibración, temperatura y corriente del motor alimentan modelos que predicen fallas 48-72h antes. -30% downtime, -40% costos de mantenimiento.
- **Señal**: Fabricantes automotrices pierden $22,000/minuto por paradas no planificadas en línea de ensamblaje.
- **Para Globant**: Stack open-source (ERPNext + sensores + LangGraph + Claude) elimina licencias de IBM/SAP PM.

### T9: Flota LATAM — mercado no digitalizado masivo
- **Qué**: Brasil, México, Colombia tienen millones de vehículos comerciales sin telemetría AI. Startups de logística buscando diferenciación.
- **Señal**: Costos de telemática SaaS cayeron 70% con opciones open-source (Fleetbase + EMQX).
- **Para Globant**: Propuesta llave en mano: Fleetbase self-hosted + EMQX + agente predictivo en 60-90 días.

### T10: V2X y edge computing vehicular
- **Qué**: Vehicle-to-everything (V2X), links satelitales, redes híbridas y edge computing son ahora esenciales para fiabilidad en entornos de baja señal.
- **Señal**: EMQX tiene deployments en V2X con latencia < 1ms. Eclipse uProtocol estandarizando mensajería ECU-cloud.
- **Para Globant**: Arquitectura de referencia: EMQX broker + Kuksa databroker + agente cloud; 3-tier latency hierarchy.

### T11: Benchmarks automotrices para AI (benchmark race)
- **Qué**: Múltiples nuevos benchmarks en 2026 para evaluar LLMs en contexto automotriz: diagnóstico OBD, planning, V2X queries.
- **Señal**: Similar a lo que pasó en healthcare con HealthBench, el automotive está creando su benchmark race.
- **Para Globant**: Oportunidad de publicar benchmark de "dealer copilot" propio como diferenciador técnico.

### T12: México manufactura automotriz + AI — ventana 2026-2028
- **Qué**: México 6to productor mundial. Nearshoring post-tariffs está llevando más plantas a México. AI para calidad, ensamblaje y logística interna es la siguiente ola.
- **Señal**: GM Silao, VW Puebla, Toyota Apaseo ya tienen proyectos piloto de AI en manufactura.
- **Para Globant**: Globant tiene presencia en México. Propuesta específica: ERPNext + agentes de calidad + CARLA para validación robótica.

---
*Fuentes: IDTechEx SDV Report 2026, Eclipse SDV newsroom, Autoware Foundation, N-iX Agentic AI 2026, NVIDIA Tech Blog, Forbes Connected Vehicle 2026, SP Global Automotive Insights.*
