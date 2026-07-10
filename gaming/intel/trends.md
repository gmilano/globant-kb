# Tendencias — Gaming AI 2026

> Investigación curada con datos verificados. Última actualización: 2026-07-10 (v7)

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

### T13: Godot Foundation prohíbe código AI — señal de calidad en OSS (1-jul-2026)
La Godot Foundation actualizó su política de contribución el 1 de julio de 2026 prohibiendo casi todo uso de AI generativa en PRs:
- ❌ Código generado por IA ("vibe coding"), PRs enviados por AI agents autónomos, texto generado por IA en discusiones human-to-human
- ✅ Asistencia menor (autocomplete, regex, find-and-replace) con divulgación obligatoria
- **Causa raíz**: avalancha de PRs de baja calidad por AI que sobrecargó a los mantenedores voluntarios
- **Señal de industria**: la reacción al ruido AI en OSS está generando un "premium de calidad humana". Proyectos que rechacen submissions AI-generated ganarán credibilidad de contribuidores. Godot sigue siendo MIT — solo cambian las reglas de contribución.
- **Oportunidad Globant**: posicionarse como contribuidor de alta calidad humana en el ecosistema Godot, diferenciándose de la avalancha de AI-generated PRs.

### T14: OmniGameArena — Benchmarking VLM en UE5 con reflexión agentica (jun 2026)
arXiv:2606.09826: benchmark con 12 juegos construidos en Unreal Engine 5 para evaluar VLMs en entornos 3D reales de producción. Introduce **Improvement Dynamics Curve (IDC)**: un reflector LLM con herramientas refina prompts de habilidad en múltiples rondas — midiendo no solo el score frío sino la capacidad de mejora iterativa. Complementa GameDevBench (Godot 2D/Gameplay) con escenarios UE5 3D multiplayer.
- Evalúa Claude, GPT-4o, Gemini, Qwen3 y NitroGen (modelo especializado, 40k h de gameplay en 1k+ juegos)
- Señal: los modelos fundacionales de gaming (NitroGen-style) empiezan a competir con VLMs generalistas en tareas gaming específicas.

### T15: Orak — El benchmark MCP-nativo de KRAFTON cierra el ciclo train+eval (jun 2026)
[krafton-ai/Orak](https://github.com/krafton-ai/Orak) (MIT, arXiv:2506.03610): KRAFTON (PUBG, $4B+ valuation) lanzó el benchmark más completo hasta la fecha para LLM agents en videojuegos. Lo que lo distingue de GamingAgent y OmniGameArena no es solo el número de juegos (12, todos los géneros) sino dos características únicas:
1. **MCP plug-and-play**: interfaz basada en Model Context Protocol → compatible natively con Claude Code, Cursor, cualquier cliente MCP. Los agentes pueden conectarse al entorno de juego exactamente como se conectan a cualquier herramienta MCP.
2. **Dataset de fine-tuning**: trayectorias de gameplay expertas → se puede fine-tunear un LLM generalista para hacerlo efectivo en juegos específicos sin RL from scratch.
- Live leaderboard con ablation studies: input modality visual vs textual, estrategias agenticas, efectos de fine-tuning
- **Señal de consolidación**: con Orak (Krafton), GamingAgent (academia, ICLR 2026), y OmniGameArena (UE5), el ecosistema de benchmarking de LLM game agents está madurando igual que Gymnasium estandarizó el benchmarking RL. El stack MCP de Claude es ya el runtime de evaluación más accesible para todos estos benchmarks.

### T16: Play2Code — Cierre del loop generación → playtesting GUI (may 2026)
arXiv:2605.28258 (27 may 2026): investigadores formalizan que generar código de juego one-shot no es equivalente a crear un juego jugable. El paper introduce:
- **PlaytestArena**: 200 tareas de generación de browser games en 8 géneros, verificadas por GUI agent que **juega el build** en browser (no solo lo evalúa sintácticamente)
- **Play2Code**: loop game-code-agent ↔ GUI-playtest-agent con memoria compartida. La generación se convierte en diálogo iterativo entre "quién construye" y "quién juega".
- **Resultado**: 66.8% pass-rate vs 37.1% baseline (mejor +29.7 puntos). El feedback del GUI playtester es más trazable que reportes humanos.
- **Convergencia**: el paper valida el patrón que OpenGame, GameDevBench y Orak también indican — los agentes deben cerrar el loop construcción→prueba→corrección para generar artefactos de juego de calidad.
- **Para Globant**: el patrón Play2Code es directamente productizable: "genera prototipos de juego jugables en horas, no semanas" usando GUI agent como QA automático. Deal size: $30k-$100k para estudios que necesitan prototipar rápido.

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
| **NitroGen-style foundation models** | Modelos visión-acción entrenados on-gameplay (40k h / 1k+ juegos). Competirán con VLMs en tasks gaming-specific. | 2026-2027 |
| **AI-ban reacción en OSS** | Godot, y potencialmente otros motores OSS, endureciendo políticas anti-AI. Premium de calidad humana en contribuciones. | Presente |
| **Orak fine-tuning → gaming LLM** | KRAFTON dataset disponible → fine-tunear Llama/Qwen en trayectorias de gameplay. Primer paso hacia gaming-specific LLM open source. | 2026-2027 |
| **Play2Code pattern en producción** | Loop generación→playtesting GUI agent → corrección automática. Habilita prototipado de juegos jugables en horas. | 2026 |
| **Morgan Stanley $22B AI gaming** | Analistas mainstream apostando por savings-driven AI adoption. CFOs de studios empezarán a exigir ROI metrics concretas. | Ya presente |

---
*Fuentes: GitHub (verificado 2026-07-10), GDC 2026 Survey, Technavio, Research & Markets, arXiv:2602.11103, arXiv:2605.28258, arXiv:2506.03610, arXiv:2606.09826, ICLR 2026, godotengine.org/article/contribution-policy-2026/, Persistence Market Research, Morgan Stanley (abr 2026), KPMG/UNLV State of AI in Gaming 2026*
