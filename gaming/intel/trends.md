# Tendencias — Gaming AI 2026

> Investigación curada con datos verificados. Última actualización: 2026-07-09 (v5)

## Tendencias confirmadas (alta confianza)

### T1: Ecosistema Godot como plataforma AI-first
Godot (MIT, 112k+ stars) emergió como el engine open source con el ecosistema AI más rico. Juegos en Steam doblados año a año (2,864 en 2025-2026). En GDC Game Jam 2025 empató con Unity en adopción (~40% cada uno):
- **LimboAI** (MIT, 2.8k stars): BTs + Hierarchical State Machines. Stack NPC AI maduro.
- **Beehave** (MIT, 3.2k stars): behavior trees componibles en el scene tree de Godot.
- **godot-ai** (MIT, 1.1k+ stars, abr 2026): MCP server, 150+ operaciones, conecta Claude/Codex al editor en vivo.
- **godot_rl_agents** (MIT, 1.5k stars): wrappers para 4 frameworks RL (SB3, Sample Factory, RLLib, CleanRL).
- **NobodyWho** (EUPL, ver licencia): NPCs con LLM local, instalación 1-click en Godot AssetLib (jun 2026).
- **NVIDIA fork Godot** con path tracing (MIT) lanzado en GDC 2026.
- **GameDevBench** (arXiv:2602.11103, feb 2026): benchmark de 132 tareas de game dev en Godot — convirtiendo Godot en el testbed estándar para AI de game development.

**Oportunidad Globant**: "Godot + AI" como alternativa open source a Unity sin controversias de pricing.

### T2: LLM NPCs — de demo a producción
En 2026, NPCs con LLMs pasaron a producción en títulos comerciales:
- Segmento NPCs + Digital Humans: **28.6% del mercado total AI gaming** (mayor segmento).
- Impacto medido: +40% immersion scores, +28% session time en RPGs.
- Arquitectura ganadora: BT (estructura reactiva) + LLM (diálogo generativo) + Vector Store (memoria).
- **Inworld AI** (cerrado) + **NVIDIA ACE**: stack propietario dominante en AAA.
- **Mantella** (MIT, art-from-the-machine): STT (Moonshine/Whisper) → LLM → TTS (Piper/xVASynth/XTTS). Referencia OSS de NPC voice.
- Alternativa OSS completa: Mantella + LimboAI + Ollama (100% local, sin costo API).

### T3: GameCoder LLMs especializados
- **OpenGame / GameCoder-27B** (Apache-2.0, abr 2026): primer LLM open source entrenado en código de juegos via RL orientado a ejecución. Genera juegos web end-to-end.
- **Roblox CUBE 3D** (1.8B params, mar 2025): genera objetos 3D desde texto on-platform.
- Tendencia: modelos especializados en game dev superan a modelos generales en tareas de código de juego.

### T4: RL para testing automatizado y balance
- **godot_rl_agents** activo con 4 frameworks RL, ahora con 1.5k stars.
- Agentes RL entrenados para exploración de nivel → detectan bugs edge-case que QA manual no encuentra.
- Balance detection: agentes que encuentran estrategias dominantes (exploits) antes del launch.
- **GameStudio Subagents**: equipo de agentes multi-rol (dev, QA, artist) en terminal.
- **GamingAgent** (ICLR 2026): framework de evaluación repropurposable para QA automatizado.
- Reducción estimada de QA manual: 60-70% en proyectos con RL QA implementado.

### T5: Nakama como backend universal para proyectos OSS
- 12.8k stars, Apache-2.0, SDK oficial Godot, Unreal, Unity.
- 500k devs, 1B+ players en producción.
- Adoptado como backend por defecto en proyectos Godot+AI.
- Extensible: hooks en Go/TypeScript/Lua para añadir AI server-side.

### T6: AI asistido en el desarrollo (tooling)
- **Unity AI** (v6.2, mid-2025): suite integrada en editor. Assistant (docs/code), Generators (texturas/sprites), Inference Engine (on-device).
- **Unity MCP Server** (AnkleBreaker-Studio, MIT): 268 herramientas MCP para Unity Editor + Hub.
- **Godot + godot-ai**: Claude Code/Cursor conectados al editor via MCP. 150+ operaciones.
- **Unreal — Aura** (Ramen VR, ene 2026): agente editor + coding. Caso: *Zombonks* lanzado en 5 meses (mitad del tiempo).
- Adopción: 90% de desarrolladores usa AI agents en workflows (2026).

### T7: Analytics predictivo — churn y LTV
- GNNs (Graph Neural Networks) sobre comportamiento + red social: 75.83 AUROC vs 62.44 LightGBM flat-table.
- Predicción de churn 14 días en adelante.
- Señales más fuertes: amigos que se van, difficulty walls, session lengths declining.
- F2P mobile dominante en LATAM → retención es crítica → oportunidad.
- Herramientas: PyTorch Geometric (PyG) para GNNs, PostHog (MIT, 23k stars) para events, Grafana (Apache-2.0).

### T8: Anti-cheat con ML conductual
- Shift de detección por firmas (binarios) a detección por comportamiento (server-side ML).
- **OACS** (MIT): framework Python para anomaly detection server-side.
- GNNs para detectar redes coordinadas (boosting, account sharing, fraud en iGaming).
- Driver LATAM: regulación iGaming Brasil 2025 exige sistemas anti-fraud activos.

---

## 🆕 Tendencias emergentes (julio 2026)

### T9: Carbon Engine abre la era del MMO open source (1-jul-2026)
Fenris Creations liberó **Carbon Engine** (MIT) el 1 de julio de 2026 — el engine que ha corrido EVE Online por más de 20 años, soportando miles de jugadores concurrentes en un solo shard. Componentes:
- **Trinity**: motor gráfico AAA para mundos espaciales de gran escala
- **Destiny**: física, colisiones, pathfinding optimizado para batallas MMO masivas
Señal: primera vez en la historia que un engine AAA de MMO single-shard es completamente open source. Habilita construcción de mundos persistentes a escala sin royalties.
GitHub: [github.com/orgs/carbonengine](https://github.com/orgs/carbonengine)

### T10: GamingAgent y lmgame-Bench — benchmark estándar para LLMs en juegos (ICLR 2026)
[lmgame-org/GamingAgent](https://github.com/lmgame-org/GamingAgent) (MIT, 947★) publicó el primer benchmark estandarizado con leaderboard público para modelos LLM/VLM jugando videojuegos reales (Tetris, 2048, Pokémon Red, Super Mario Bros, etc.). Señales clave:
- Claude con thinking-modes lidera en juegos de estrategia
- Claude (computer-use) + gaming harness supera baselines de single-shot VLM
- Señal de madurez: los modelos ya pueden ser evaluados objetivamente en gaming

### T11: GameDevBench — el 47% de tareas de game dev aún falla (feb 2026)
arXiv:2602.11103 reveló que el mejor agente resuelve solo el 53.8% de las 132 tareas de game development en Godot. El gap más grande está en gráficos 2D (33% success) por complejidad multimodal (sprites, shaders, animaciones). Señal: hay un gap enorme entre AI-assisted coding genérico y la capacidad real en game dev — **es la oportunidad de diferenciación de Globant**.

### T12: Sentimiento desarrollador — 52% anti-GenAI pero +11% NPC agentico
GDC State of AI Survey 2026: aunque el 52% de desarrolladores tiene visión negativa de GenAI (preocupaciones laborales, calidad), la adopción de NPCs agenticos en producción creció +11% año a año. El gap entre sentimiento y adopción crea una ventana: los studios que SÍ implementan AI agentica para NPCs toman ventaja competitiva mientras sus pares vacilan.

---

## En el radar (emergente, 2026-2027)

| Tendencia | Señal | ETA |
|-----------|-------|-----|
| **AI-native games** (world models) | Yuan-ManX/AI-Native-Game tracker activo. Genie 2 (Google). | 2026-2027 |
| **Gemma 3n on-device NPCs** | Demostrado en Godot sin API. Offline-first gaming. | Ya disponible en beta |
| **Villanos adaptativos** | Aivill (SKYHUBDev): villanos que aprenden del jugador. | Concepto emergente |
| **AI game masters** | VirtualGameMaster (MIT, 300 stars): GM automático para RPGs. | En adopción indie |
| **Carbon Engine + AI** | Engine de EVE Online abierto → primeros proyectos MMO-AI OSS emergentes. | 2026-2027 |
| **PCG con diffusion models** | Generación de assets (texturas, música, diálogos) in-pipeline. | Parcialmente productivo ya |
| **Supabase para game backends** | Alternativa PostgreSQL a Firebase/Nakama para juegos asíncronos. | Adopción creciente 2026 |

---
*Fuentes: GitHub (verificado 2026-07-09), GDC 2026 Survey, Technavio, Research & Markets, arXiv:2602.11103, ICLR 2026*
