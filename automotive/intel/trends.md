# Tendencias — Automotive AI

> 15 tendencias clave en AI para la industria automotriz — julio 2026.
> Última actualización: 2026-07-14 (v12)

## T1 — De stacks modulares a VLA E2E (punto de inflexión 2026)

La arquitectura dominante en AD está cambiando: del pipeline modular clásico (percepción → predicción → planificación → control, cada módulo separado) al modelo VLA unificado (Vision-Language-Action) que procesa todo en un solo forward pass. AAAI 2026 consagró OpenDriveVLA (Apache-2.0), NVIDIA lanzó Alpamayo en CES 2026. WCog-VLA (arXiv:2607.08375) representa la 4ª generación en 6 meses. El stack modular no desaparece (certificación de seguridad lo frena), pero toda la investigación nueva es VLA.

**Impacto Globant**: proyectos de AD deben planificar migración a VLA. El punto de partida recomendado es OpenDriveVLA (Apache-2.0) + CARLA PCLA para evaluación.

---

## T2 — Chain-of-thought reasoning en VLA (NVIDIA Alpamayo, CES 2026)

NVIDIA Alpamayo introduce un cambio conceptual: el modelo VLA ahora expone su razonamiento ("vi un ciclista, calculé 2.1m de clearance, decidí frenar"). Alpamayo 1.5 (Mar 2026) y AlpaSim permiten validar el razonamiento, no solo el resultado. Esto es crítico para reguladores EU AI Act.

**Impacto Globant**: para clientes en mercados regulados (EU, Japón) el VLA con reasoning traces es el único camino válido post-Aug 2026.

---

## T3 — Closed-loop training reemplaza open-loop (CLEAR, Jul 2026)

El estándar de entrenamiento está migrando de open-loop (el modelo predice trayectoria sobre video estático) a closed-loop (el modelo actúa en simulación y las consecuencias se retroalimentan al training). CLEAR (arXiv:2607.02841) demuestra RL cerrado a escala en CARLA. openpilot world model paradigm. Consecuencia: métricas de benchmark open-loop (L2 error nuScenes) ya no son suficientes — se necesita evaluación en simulación cerrada.

**Impacto Globant**: evaluar modelos VLA de cliente con CARLA + PCLA en closed-loop, no solo con datasets estáticos.

---

## T4 — Software Defined Vehicle (SDV) como arquitectura estándar (Eclipse S-Core)

Los 32 OEMs participantes de Eclipse SDV apuntan a S-Core v1.0 en Q4 2026. Bosch, Continental, CARIAD (VW Group), ZF activos. El SDV convierte el vehículo en plataforma de software actualizable por OTA, habilitando deployment continuo de AI agents. Eclipse Kuksa (Apache-2.0) ya es el data broker estándar para VSS (Vehicle Signal Specification).

**Impacto Globant**: los proyectos de cockpit AI y fleet intelligence deben construir sobre Eclipse Kuksa + SDV Blueprints para ser OEM-compatible.

---

## T5 — AI en cabina: del asistente de voz al agente cognitivo (Auto China 2026)

Auto China 2026 marcó el abandono del "Vase AI" (IA decorativa, solo responde preguntas) hacia agentes que ejecutan tareas: hacer llamadas, reservar restaurantes, ajustar climatización, cambiar rutas, pagar peajes. BYD, NIO, Li Auto, XPENG lideraron. Mercedes integra Google Automotive AI Agent con multi-turn y Maps en tiempo real. Este es el "killer use case" que justifica AI en cabina.

**Impacto Globant**: el patrón cockpit-agent (edge intent + cloud LLM + VAL safety) es el MVP correcto para clientes OEM.

---

## T6 — VLA de eficiencia para hardware vehicular (BLUE, Jun 2026)

VLAs de 3B-10B no caben en hardware vehicular actual (SoC automotriz: ~10-20 TOPS). BLUE (arXiv:2606.08684) demuestra un adapter de 0.11M parámetros sobre VLA frozen que logra 76.2% Bench2Drive con 2.54x speedup. Cualcomm Snapdragon Ride apunta a soportar VLA en 2027.

**Impacto Globant**: proyectos de AD en vehículo necesitan BLUE-style adapters. La ruta viable es VLA grande en nube → destilación → adapter ligero en edge.

---

## T7 — CARLA UE5 y la nueva era de simulación fotorrealista

La migración de CARLA a Unreal Engine 5 (branch ue5-dev, activo Jul 2026) trae ray tracing realista, mejor iluminación, materiales PBR para vehículos/peatones. CARLA Leaderboard 2.1 sigue siendo el benchmark estándar. R-CARLA (arXiv:2506.09629) extiende CARLA para autonomous racing con alta fidelidad de sensor.

**Impacto Globant**: los proyectos de simulación deben planificar migración a UE5 para datasets de mayor calidad.

---

## T8 — Long-tail y escenarios raros — el problema sin resolver (nuReasoning, May 2026)

Los VLA actuales tienen alta performance en escenarios comunes pero fallan en long-tail: lluvia intensa, obstáculos inusuales, semáforos dañados, peatones con comportamiento impredecible. nuReasoning (arXiv:2605.31572) provee 20k clips de escenarios long-tail para evaluación. Safe2Drive (arXiv:2606.00191) benchmarka comportamiento seguro en E2E.

**Impacto Globant**: cualquier VLA entregado a cliente debe incluir evaluación contra benchmarks long-tail.

---

## T9 — Qualcomm Snapdragon como MCU dominante ($45B design-win)

Qualcomm reportó $45B en design-win pipeline para Snapdragon Ride (CES 2026) y $1.1B Q1-FY2026 en automotive (+15% YoY). Posiciona Snapdragon como el hardware estándar para ADAS + cockpit AI. Soporte AIDV (AI-Driven Vehicle) con Google Gemini integrado.

**Impacto Globant**: los proyectos de cockpit AI deben optimizar para Snapdragon Ride. Los adapters BLUE-style son el camino.

---

## T10 — EV + AI: carga inteligente y gestión de batería

La penetración de EV está creando demanda de: optimización de rutas de carga para flotas, predicción de degradación de batería, gestión de energía V2G (Vehicle-to-Grid). ev-charging-optimization (MIT) es la base. OpenRemote soporta fleet EV telematics con geofencing.

**Impacto LATAM**: Chile y Colombia lideran adopción de buses eléctricos. Brasil: BYD lleva 5 plantas locales. Oportunidad: fleet EV AI agent para transporte público.

---

## T11 — EU AI Act Ago 2026: AD es high-risk

El EU AI Act entra en vigor completo el 2 de agosto de 2026. Los sistemas de conducción autónoma y ADAS clasifican como "high-risk" bajo el Anexo III. Requieren: documentación técnica, evaluación de conformidad, registro en base de datos EU, transparencia, supervisión humana, logging de decisiones.

**Impacto Globant**: todo proyecto de AD para clientes EU necesita compliance layer. Alpamayo reasoning traces + audit logging son la respuesta técnica.

---

## T12 — China EVs redibujando el mapa global (BYD, GWM, XPENG)

BYD superó a Toyota como el OEM más vendido en varios mercados en 2025-2026. GWM, JAC, Chery entran agresivamente a LATAM. El diferenciador competitivo chino NO es el precio ahora: es el AI cockpit (agentes cognitivos, voice AI, OTA continua). Los OEMs occidentales deben responder en AI cockpit.

**Impacto Globant**: oportunidad de localización de AI para OEMs chinos en LATAM (idioma español/portugués, regulaciones locales, integración WhatsApp).

---

## T13 — Mantenimiento predictivo con AI: el quick win más concreto

Fuera de AD, el caso de uso con mayor ROI demostrable es mantenimiento predictivo: sensores OBD2 → LLM → diagnóstico → alerta. Payback en 3-6 meses para flotas. OpenVehicleDiag (MIT/Rust) + ERPNext + LangGraph agent. Aplica a: concesionarios, flotas corporativas, transportistas.

**Impacto LATAM**: Brasil, México, Colombia: flotas de camiones y transporte público con mantenimiento reactivo. Quick win para Globant.

---

## T14 — LATAM: WhatsApp como canal principal de fleet intelligence

65%+ conductores LATAM usan WhatsApp como herramienta principal de comunicación. Los sistemas de fleet management existentes (Fleetbase, ERPNext) tienen APIs que permiten integrar bots WhatsApp vía Twilio, Z-API, o WPPConnect. El patrón: alertas de mantenimiento, incidentes, despacho y confirmación de entrega vía WhatsApp es el MVP de menor fricción para LATAM.

---

## T15 — Robotaxi en consolidación: solo los grandes sobreviven

El mercado de robotaxi se está consolidando: Waymo lidera en EE.UU. (50k+ viajes/semana), Cruise rebota post-accidente, Baidu Apollo en China. Los pequeños operadores están cerrando o siendo adquiridos. En LATAM el horizonte es 2028-2030 para uso comercial real. Oportunidad presente: simulación + testing + AI stack para estos players.

---

## Mapa de tendencias por urgencia

| Urgencia | Tendencia | Horizonte |
|----------|-----------|----------|
| Ahora | EU AI Act compliance (T11) | 2 Ago 2026 |
| Ahora | Cockpit AI agéntico (T5) | Competitivo 2026 |
| 3-6m | VLA E2E migration (T1) | Proyectos 2026-2027 |
| 3-6m | WhatsApp fleet LATAM (T14) | Quick wins |
| 3-6m | Mantenimiento predictivo (T13) | ROI rápido |
| 6-12m | SDV/Eclipse S-Core (T4) | Prod Q4 2026 |
| 6-12m | EV fleet optimization (T10) | LATAM EV ramp |
| 12m+ | Closed-loop training (T3) | R&D |
| 12m+ | VLA on-device eficiencia (T6) | Snapdragon 2027 |
