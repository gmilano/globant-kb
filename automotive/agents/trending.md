# 📈 Agentes & Repos Trending — Automotive

> Lo nuevo esta semana / mes. Foco en movimientos de julio 2026.
> Última actualización: 2026-07-14 (v11)

## Señal principal — La explosión de VLAs para Conducción Autónoma (2026)

El año 2026 es el año de los **Vision-Language-Action (VLA) models** para AD: en 6 meses han surgido más arquitecturas VLA para conducción autónoma que en los 3 años anteriores combinados. El paradigma está reemplazando los pipelines modularizados clásicos (percepción → predicción → planificación) por modelos E2E que razonan en lenguaje natural antes de actuar.

## Novedades destacadas — julio 2026

### 1. OpenDriveVLA — VLA SOTA para AD (AAAI 2026)
- **Repo**: [DriveVLA/OpenDriveVLA](https://github.com/DriveVLA/OpenDriveVLA) — Apache-2.0
- **Paper**: arXiv:2503.23463, aceptado AAAI 2026
- **Qué hay de nuevo**: Modelos 3B y 7B para conducción autónoma E2E. Proyección jerárquica de tokens 2D+3D a espacio semántico unificado. **L2 error 0.33m en nuScenes — SOTA** sobre todos los modelos autoregresivos. Sigue comandos de alto nivel con robustez en escenarios complejos.
- **Relevancia Globant**: Base open-source más validada para proyectos de AD con VLA. Ideal para PoC con OEMs o Tier-1s que buscan alternativa open-source a propietarios.

### 2. BLUE — VLA Eficiente para On-Vehicle Inference (jun 2026)
- **Paper**: arXiv:2606.08684 — código/checkpoints/datos públicos
- **Qué hay de nuevo**: Encontró que el lenguaje generado por VLA mejora el driving en solo 14.5% de rutas y lo degrada en 23.6%. Solución: gate 0.11M params sobre VLA frozen que decide per-frame si generar lenguaje o actuar directamente. **2.54x speedup** + **+8.9% success rate** sobre backbone base. 76.2% en Bench2Drive, 36 driving score en Longest6 v2.
- **Relevancia Globant**: Resolver el problema de latencia de VLAs en producción — clave para proyectos IVI y ADAS on-vehicle donde latencia < 200ms es requerida.

### 3. nuReasoning — Benchmark de Razonamiento para AD Long-Tail (may 2026)
- **Paper**: arXiv:2605.31572 — [nureasoning.github.io](https://nureasoning.github.io/)
- **Qué hay de nuevo**: 20,000 clips de 20 segundos; datos multi-cámara + LiDAR + HD maps + anotaciones de razonamiento verificadas por humanos. 3 tipos: Spatial Reasoning, Decision Reasoning, Counterfactual Reasoning. Primer benchmark que une evaluación de razonamiento Y planificación en conducción real.
- **Relevancia Globant**: Usar para evaluar cualquier agente de conducción ante escenarios de cola larga (lluvia tropical, intersecciones no señalizadas — comunes en LATAM).

### 4. openpilot 0.11 — Nuevo Paradigma de Entrenamiento con World Model
- **Repo**: [commaai/openpilot](https://github.com/commaai/openpilot) — MIT | 60.6k★
- **Blog**: blog.comma.ai/011release
- **Qué hay de nuevo**: v0.11 (marzo 2026) es el primer modelo de conducción entrenado con World Model (videos + planes generados por el World Model, no solo labels humanos). v0.11.1 (abril 2026): LM GT3 driver monitoring model con labels generados por VLM local. Enfoque en comma four hardware; comma 3X soportado hasta v0.10.3.
- **Relevancia Globant**: La adopción del paradigma World Model en el ADAS OS más usado confirma la tendencia; base para demos "next-gen ADAS" con clientes.

### 5. Qualcomm Snapdragon Chassis Agents — CES 2026
- **URL**: [qualcomm.com/news](https://www.qualcomm.com/news/onq/2026/01/from-software-defined-to-ai-defined-vehicle-snapdragon-chassis-agents)
- **Qué hay de nuevo**: Snapdragon Chassis Agents: IA agéntica en hardware vehicular que personaliza funciones del vehículo en tiempo real. Pipeline Q1 FY2026 automotriz de **$45B design-win**; ingresos $1.1B (+15% YoY). Integración con Google Gemini Enterprise for Automotive para asistentes proactivos. OEMs: VW Group, BMW, Mercedes-Benz, Toyota.
- **Relevancia Globant**: El hardware agentic vehicular ya es realidad comercial a escala. Posicionar proyectos de cockpit AI como extensión del ecosistema Snapdragon.

### 6. Eclipse S-CORE v1.0 — 2026 milestone
- **Org**: [eclipsesdv.org](https://eclipsesdv.org/) — Apache-2.0
- **Qué hay de nuevo**: S-CORE v0.5 GA noviembre 2025; v1.0 planeado para 2026. 32 empresas en el MoU incluyendo Hyundai Mobis (mayo 2026) y TRATON (VW trucks). Informe "2026 State of Automotive Software Development" publicado. Eclipse Foundation posicionando SDV como el "Linux de los vehículos".
- **Relevancia Globant**: 32 OEMs significa que los futuros proyectos SDV requerirán conocimiento de S-CORE. Ventana de oportunidad como SI especializado antes de mainstream (2028-2030).

### 7. Familias VLA emergentes (WCog-VLA, CoWorld-VLA, ChainFlow-VLA)
- **WCog-VLA** (arXiv:2607.08375, jul 2026): Dual-level World-Cognitive VLA — combina razonamiento a nivel de escena y predicción de acción.
- **CoWorld-VLA** (arXiv:2605.10426, may 2026): Multi-Expert World Model con especialistas por dominio (urban, highway, weather).
- **ChainFlow-VLA** (arXiv:2605.23270): Causal flow planning con VLMs; razonamiento causal explícito.
- **Relevancia Globant**: El espacio VLA para AD está en plena exploración. OpenDriveVLA y BLUE son los más maduros para uso en producción.

## Repos activos esta semana

| Repo | Actualización | Stars | Nota |
|------|--------------|-------|------|
| [DriveVLA/OpenDriveVLA](https://github.com/DriveVLA/OpenDriveVLA) | AAAI 2026 accepted | ~400 | VLA SOTA AD — nuevo en tracking |
| [commaai/openpilot](https://github.com/commaai/openpilot) | v0.11.1 abr-2026 | 60.6k | World Model training paradigm |
| [autowarefoundation/autoware_vision_pilot](https://github.com/autowarefoundation/autoware_vision_pilot) | activo 2026 | ~600 | L2 ADAS gratuito, crecimiento acelerado |
| [autowarefoundation/autoware_universe](https://github.com/autowarefoundation/autoware_universe) | activo jul-2026 | 1.7k | Paquetes de universo; actualizado semanal |
| [eclipse-kuksa/kuksa-databroker](https://github.com/eclipse-kuksa/kuksa-databroker) | activo 2026 | 450 | Momentum SDV; audit de seguridad publicado |
| [fleetbase/fleetbase](https://github.com/fleetbase/fleetbase) | activo 2026 | 2k | Nuevas integraciones contabilidad + API |
| [liulin815/DriveWorld-VLA](https://github.com/liulin815/DriveWorld-VLA) | feb 2026 | ~200 | World model para VLA — nuevo |

---
*Pipeline automático — v11 2026-07-14.*
