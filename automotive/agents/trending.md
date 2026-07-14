# Agentes trending — automotive

> Lo nuevo esta semana en AI para automotriz. Última actualización: 2026-07-14 (v12)

## Señales calientes — julio 2026

### 1. WCog-VLA (arXiv:2607.08375 — 8 Jul 2026)
Dual-Level World-Cognitive Vision-Language-Action model para E2E AD. Modela el mundo a nivel de escena (macro) y objeto (micro) simultáneamente. Superstate-of-the-art en NAVSIMv2. Indica que la tendencia "cognición del mundo" en VLAs está acelerando — 3 papers similares en 60 días.

### 2. CLEAR — Closed-Loop RL at Scale (arXiv:2607.02841 — 2 Jul 2026)
CaRL/CLEAR: primer framework de RL cerrado a escala para CARLA E2E. Resuelve el problema de que los modelos VLA entrenados en open-loop fallan en closed-loop real. Señal fuerte: el training loop cerrado se convierte en el nuevo estándar (vs dataset estático).

### 3. Alpamayo 1.5 — NVIDIA (Mar 2026, actualización activa)
Alpamayo 1.5 lanzado en marzo con mejor rendimiento y nuevas features. GitHub NVlabs/alpamayo activo con commits semanales. Es la primera VLA con reasoning traces públicos: los logs muestran el "por qué" de cada decisión de conducción. Clave para reguladores EU AI Act.

### 4. Auto China 2026 — abandono del "Vase AI"
Señal de mercado crítica: Auto China 2026 (Gasgoo) muestra que la industria está abandonando la IA decorativa ("Vase AI") por IA funcional. BYD, NIO, Li Auto y SAIC presentaron agentes que ejecutan tareas reales: llamadas, reservas, control climático, cambios de ruta. Punto de inflexión: la IA agentica en cabina se vuelve obligatoria competitivamente.

### 5. autoware_vision_pilot — Autoware Foundation (activo Jul 2026)
El stack Vision Pilot de Autoware Foundation (Apache-2.0) ahora incluye modelo de IA E2E para producción en serie. Está diseñado para ser integrado directamente por OEMs y Tier-1 en vehículos de pasajeros. Diferencia clave vs openpilot: certificabilidad de seguridad funcional.

### 6. Eclipse S-Core v1.0 — target Q4 2026
Eclipse S-Core (32 OEMs involucrados) apunta a lanzar v1.0 en 2026. Será el middleware base para SDV de grado producción. Companías como Bosch, Continental, CARIAD (VW Group) están activamente contribuyendo. Impacto: plataforma OSS de grado industrial para vehículos SDV.

### 7. Qualcomm Snapdragon Chassis Agents — $45B design-win
Qualcomm reportó $45B en design-win pipeline para Snapdragon Ride en CES 2026. Q1-FY2026: $1.1B (+15% YoY) solo en automotive. El hardware determinará qué agentes de AI pueden correr en el vehículo — Snapdragon se convierte en el MCU dominante para cockpit + ADAS AI.

## Repos con momentum esta semana

| Repo | Señal | Por qué importa |
|------|-------|------------------|
| [autowarefoundation/autoware_universe](https://github.com/autowarefoundation/autoware_universe) | 1.7k★, commits diarios | Ecosistema Autoware Universe activo — base para AD en Japón, Europa, LATAM |
| [carla-simulator/carla](https://github.com/carla-simulator/carla) | 14k★, UE5 migration activa | Migración a UE5 para simulación fotorrealista — nuevas escenas urbanas |
| [DriveVLA/OpenDriveVLA](https://github.com/DriveVLA/OpenDriveVLA) | AAAI 2026 | Paper + código + pesos públicos — E2E VLA que compite con modelos propietarios |
| [NVlabs/alpamayo](https://github.com/NVlabs/alpamayo) | CES 2026 + 1.5 update | Ecosistema abierto de NVIDIA para AV reasoning con chain-of-thought |
| [commaai/openpilot](https://github.com/commaai/openpilot) | 61k★, releases mensuales | L2 ADAS con world model — comunidad de 30k+ devs activa |
| [MasoudJTehrani/PCLA](https://github.com/MasoudJTehrani/PCLA) | Apache-2.0 | Testing harness para agentes AD en CARLA — cada nuevo VLA necesita evaluación |

## Papers relevantes esta semana

| Paper | ArXiv | Señal |
|-------|-------|-------|
| WCog-VLA | 2607.08375 | Cognición dual-level para VLA |
| CLEAR | 2607.02841 | RL closed-loop a escala en CARLA |
| R-CARLA | 2506.09629 | CARLA para autonomous racing (alta fidelidad) |
| Safe2Drive | 2606.00191 | Benchmarking seguridad en E2E AD models |

---
*Pipeline automático — se actualiza cada hora.*
