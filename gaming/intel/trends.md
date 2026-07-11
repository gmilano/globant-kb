# Tendencias — Gaming AI 2026

> Investigación curada con datos verificados. Última actualización: 2026-07-11

## Tendencias confirmadas (alta confianza)

### 1. Ecosistema Godot como plataforma AI-first
Godot (MIT, 112k stars) emergió como el engine open source con el ecosistema AI más rico:
- **LimboAI** (MIT, 2.8k stars): BTs + Hierarchical State Machines. Stack NPC AI maduro.
- **Beehave** (MIT, 3.2k stars): behavior trees componibles en el scene tree de Godot.
- **godot-ai** (MIT, 805 stars, abr 2026): MCP server, 120+ operaciones, conecta Claude/Codex al editor en vivo.
- **godot_rl_agents** (MIT, 900+ stars): wrappers para 4 frameworks RL (SB3, Sample Factory, RLLib, CleanRL).
- **NobodyWho** (EUPL, ver licencia): NPCs con LLM local, instalación 1-click en Godot AssetLib (jun 2026).
- **NVIDIA fork Godot** con path tracing (MIT) lanzado en GDC 2026.

**Oportunidad Globant**: "Godot + AI" como alternativa open source a Unity sin controversias de pricing.

### 2. LLM NPCs — de demo a producción
En 2026, NPCs con LLMs pasaron a producción en títulos comerciales:
- Segmento NPCs + Digital Humans: **28.6% del mercado total AI gaming** (mayor segmento).
- Impacto medido: +40% immersion scores, +28% session time en RPGs.
- Arquitectura ganadora: BT (estructura reactiva) + LLM (diálogo generativo) + Vector Store (memoria).
- **Inworld AI** (cerrado) + **NVIDIA ACE**: stack propietario dominante en AAA.
- Alternativa OSS: Interactive LLM NPCs (MIT, 716 stars) + LimboAI + Ollama.
- **LLMUnity** (Apache-2.0, 1.7k stars): LLMs locales o cloud directamente en Unity.

### 3. GameCoder LLMs especializados
- **OpenGame / GameCoder-27B** (Apache-2.0, abr 2026): primer LLM open source entrenado en código de juegos via RL orientado a ejecución. Genera juegos web end-to-end.
- **Roblox CUBE 3D** (1.8B params, mar 2025): genera objetos 3D desde texto on-platform.
- Tendencia: modelos especializados en game dev superan a modelos generales en tareas de código de juego.

### 4. RL para testing automatizado y balance
- **godot_rl_agents** activo con 4 frameworks RL.
- Agentes RL entrenados para exploración de nivel → detectan bugs edge-case que QA manual no encuentra.
- Balance detection: agentes que encuentran estrategias dominantes (exploits) antes del launch.
- **GameStudio Subagents**: equipo de agentes multi-rol (dev, QA, artist) en terminal.
- Reducción estimada de QA manual: 60-70% en proyectos con RL QA implementado.

### 5. Nakama como backend universal para proyectos OSS
- 12.8k stars, Apache-2.0, SDK oficial Godot, Unreal, Unity.
- 500k devs, 1B+ players en producción.
- Adoptado como backend por defecto en proyectos Godot+AI.
- Extensible: hooks en Go/TypeScript/Lua para añadir AI server-side.
- Nakama vs Managed (2026): mayoría de proyectos mid-size prefieren self-host para control de datos.

### 6. AI asistido en el desarrollo (tooling)
- **Unity AI** (v6.2, mid-2025): suite integrada en editor. Assistant (docs/code), Generators (texturas/sprites), Inference Engine (on-device).
- **Godot + godot-ai**: Claude Code/Cursor conectados al editor via MCP. 120+ operaciones: build scenes, edit scripts, wire signals.
- **Unreal — Aura** (Ramen VR, ene 2026): agente editor + coding. Caso: *Zombonks* lanzado en 5 meses (mitad del tiempo).
- Adopción: 87% de estudios ya usa AI agents en workflows (Google Cloud survey, jun-jul 2025).

### 7. Analytics predictivo — churn y LTV
- GNNs (Graph Neural Networks) sobre comportamiento + red social: 75.83 AUROC vs 62.44 LightGBM flat-table.
- Predicción de churn 14 días en adelante.
- Señales más fuertes: amigos que se van, difficulty walls, session lengths declining.
- F2P mobile dominante en LATAM → retención es crítica → oportunidad.
- Herramientas: PyTorch Geometric (PyG) para GNNs, PostHog (MIT, 23k stars) para events, Grafana (Apache-2.0) para dashboards.

### 8. Anti-cheat con ML conductual
- Shift de detección por firmas (binarios) a detección por comportamiento (server-side ML).
- Ventaja: no se puede bypassear con ofuscación; detecta cheaters nuevos sin actualizar reglas.
- **OACS** (MIT): framework Python para anomaly detection server-side.
- **UltimateAntiCheat** (AGPL-3.0): referencia educativa C++ client-side.
- GNNs para detectar redes coordinadas (boosting, account sharing, fraud en iGaming).
- Driver LATAM: regulación iGaming Brasil 2025 exige sistemas anti-fraud activos.

### 9. Carbon Engine (EVE Online) — Engine AAA Open Sourced MIT — julio 2026 🆕
Fenris Creations libero el engine de producción de EVE Online bajo MIT en julio 2026. Primera vez en la historia que un engine MMO masivo de producción es open sourced completamente. La comunidad está organizando contribuciones de AI tooling para Q3 2026.

**Oportunidad Globant**: Diferenciación como partner de implementación para proyectos que adopten Carbon Engine. Combinar con agentes LLM para NPCs de simulación MMO.

### 10. Brecha Sentimiento vs Adopción (GDC 2026) — nueva dinámica de mercado 🆕
El **52%** de game developers ve AI negativamente (vs 30% en 2025). El **85%** de gamers también negativos. Sin embargo el **50%** de estudios ya usa AI y **7,300+** juegos en Steam declaran AI. La brecha entre lo que estudios hacen vs lo que comunican externamente es enorme.

**Impacto para Globant**: No pitchear AI AI AI al cliente públicamente. Posicionar AI como "herramientas de desarrollo" (dev tooling, QA, backend) que el usuario final no percibe. Reservar AI generativa visible (NPCs, assets) para proyectos donde el cliente esté dispuesto a comunicarlo.

### 11. lmgame-Bench — Selección Racional de Modelos para Juegos (ICLR 2026) 🆕
El benchmark lmgame-Bench (GamingAgent, arXiv:2505.15146, ICLR 2026) revela diferencias significativas de capability entre modelos frontier en tareas de juego:
- **Planificación** (Sokoban): gap importante entre modelos "reasoning" y no-reasoning
- **Reacción rápida** (Tetris): desafíos de latencia + coordinación visio-motora para VLMs
- **Narrativa larga** (Ace Attorney): modelos con ventanas de contexto largas y coherencia

**Impacto para Globant**: No asumir que el modelo "mejor" del catálogo es el mejor para gaming. Benchmark el modelo específico para la tarea específica.

---

## En el radar (emergente, 2026-2027)

| Tendencia | Señal | ETA |
|-----------|-------|-----|
| **AI-native games** (world models) | Yuan-ManX/AI-Native-Game tracker activo. Genie 2 (Google). | 2026-2027 |
| **Gemma 3n on-device NPCs** | Demostrado en Godot sin API. Offline-first gaming. | Ya disponible en beta |
| **Villanos adaptativos** | Aivill (SKYHUBDev): villanos que aprenden del jugador. | Concepto emergente |
| **AI game masters** | VirtualGameMaster (MIT, 300 stars): GM automático para RPGs. | En adopción indie |
| **PCG con diffusion models** | Generación de assets (texturas, música, diálogos) in-pipeline. | Parcialmente productivo ya |
| **Supabase para game backends** | Alternativa PostgreSQL a Firebase/Nakama para juegos asíncronos. | Adopción creciente 2026 |

| **Unity MCP Plugin (268 tools)** | AI agents controlando Unity Editor directamente — sin escribir código manualmente | Ya disponible OSS |
| **lmgame-Bench v2.0 esperado** | Expansión del benchmark a más juegos; ICLR 2026 follow-ups | Q3-Q4 2026 |
| **Carbon Engine AI tooling** | Primera comunidad AI sobre engine AAA MIT | Q3 2026 |

---
*Fuentes: GitHub, GDC 2026 State of Industry, Business Research Company (jul 2026), agentmarketcap.ai, solidaitech.com (actualizado 2026-07-11)*
