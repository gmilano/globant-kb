# Agentes trending — Gaming AI

> Tendencias activas en AI gaming. Última actualización: 2026-07-09 (v6)
> Investigación manual curada — complementa el pipeline automático de top.md

## Señales nuevas esta semana (2026-07-09 → 2026-07-09)

### S6: OmniGameArena — Benchmark UE5 para VLM Game Agents (jun 2026)
[mxlin043/OmniGameArena](https://github.com/mxlin043/OmniGameArena) — arXiv:2606.09826 (jun 2026). Benchmark unificado con 12 juegos construidos en **Unreal Engine 5** (7 Solo, 3 PvP, 2 Coop), interfaz de acciones uniforme para comparar VLMs comerciales (Claude, GPT, Gemini) con modelos especializados (NitroGen). Introduce **Improvement Dynamics Curve (IDC)**: un reflector LLM con herramientas refina automáticamente prompts de habilidad en múltiples rondas, midiendo mejora por reflexión además del score inicial.
- Complementa GameDevBench (Godot) con evaluación en entornos UE5 de producción
- NitroGen evaluado: modelo visión-acción entrenado en 40k horas / 1,000+ juegos
- Señal: la evaluación de VLMs en entornos de juego 3D reales es el próximo estándar de benchmarking

### S7: Godot Foundation prohíbe código AI — 1 jul 2026
La Godot Foundation actualizó su política de contribución (1-2 jul 2026) prohibiendo **casi todo uso de IA generativa** en contribuciones al engine:
- ❌ Código generado mayoritariamente por IA o "vibe coding"
- ❌ Pull requests enviados por AI agents autónomos
- ❌ Texto generado por IA en comunicaciones human-to-human
- ✅ Asistencia menor (autocompletado, regex, find-and-replace) con divulgación
- **Razón**: avalancha de PRs de baja calidad sobrecargando mantenedores voluntarios; "los LLMs no pueden aprender del feedback ni tomar responsabilidad por el código"
- **Fuente**: [godotengine.org/article/contribution-policy-2026/](https://godotengine.org/article/contribution-policy-2026/)
- **Implicación para Globant**: oportunidad competitiva — podemos posicionarnos como contribuidores humanos de alta calidad al ecosistema Godot, donde la IA-generada está prohibida.

---

## Señales anteriores esta semana (2026-07-07 → 2026-07-09)

### S1: Carbon Engine de EVE Online es MIT — 1 jul 2026
Fenris Creations (CCP Games) abrió el código de **Carbon**, el engine que alimenta EVE Online y EVE Frontier, bajo licencia **MIT** (audio espacial: Apache-2.0; IO: Python Software Foundation). Disponible en GitHub desde el 1 de julio de 2026.
- **Trinity**: motor gráfico (rendering sweeping space aesthetics)
- **Destiny**: física, colisiones, pathfinding para batallas MMO masivas
- Implicación: primera vez que un engine AAA de MMO single-shard con miles de jugadores concurrentes es completamente open source. Base de código para proyectos de mundo persistente con AI agents.
- GitHub: [github.com/orgs/carbonengine](https://github.com/orgs/carbonengine)

### S2: GamingAgent — primer benchmark LLM/VLM para juegos (ICLR 2026)
[lmgame-org/GamingAgent](https://github.com/lmgame-org/GamingAgent) (MIT, 947★) publicó **lmgame-Bench** en ICLR 2026: evaluación de LLMs/VLMs en 7 juegos estándar. Resultado clave: Claude con thinking modes domina en juegos de estrategia; GPT-4o en velocidad de reacción. Primer benchmark con leaderboard público para gaming agents.

### S3: GameDevBench — los agentes aún fallan el 46% de tareas de game dev (feb 2026)
[waynchi/gamedevbench](https://github.com/waynchi/gamedevbench) (arXiv:2602.11103): 132 tareas de game dev en Godot. Mejor resultado: 53.8%. La dificultad sube en tareas de gráficos 2D (33% success). Señal: AI-assisted dev es real pero el gap de los 47% es la oportunidad de servicio diferenciado de Globant.

### S4: Mercado NPC Generation AI a $2.44B en 2026 (+31.4% YoY)
Research & Markets (jul 2026): el mercado de AI para generación de NPCs crece de $1.86B (2025) a **$2.44B en 2026** con CAGR 31.4%. Impulsado por AI agentica, juegos AAA con NPCs conversacionales, y la explosión del mobile gaming con personajes generativos.

### S5: 52% de devs ven GenAI negativamente — pero agentic NPC sube 11%
GDC State of AI Survey 2026: 52% de desarrolladores de juegos tiene visión negativa de la IA generativa (sentimiento anti-GenAI). Sin embargo, la adopción de NPCs agenticos en producción subió +11% año a año. El gap indica oportunidad: los devs que SÍ adoptan AI agentica toman ventaja competitiva mientras sus pares dudan.

---

## Tendencias principales en 2026

### 1. NPCs con LLM + Memoria persistente — en producción
La adopción de LLMs para NPCs pasó de prototipos a producción en 2026. El patrón dominante combina:
- **LLM base** (GPT-4o, Claude 3.5, Llama 3.1 local) para generación de diálogo
- **Vector store** (ChromaDB, Qdrant) para memoria episódica del personaje
- **TTS/voz** (ElevenLabs, Kokoro TTS open source, Piper, xVASynth via Mantella)
- **Reconocimiento de emoción** del jugador vía análisis de texto o cámara

Impacto medido: NPCs AI aumentaron immersion scores 40% y session times 28% en RPGs.
Segmento NPCs + Digital Humans: 28.6% del mercado total AI gaming en 2026.
**Mantella** (MIT, art-from-the-machine): stack de referencia STT→LLM→TTS, 100% local o cloud.

### 2. NVIDIA ACE — Digital Humans en tiempo real
NVIDIA ACE (Avatar Cloud Engine): ASR + NLP + TTS + animación facial para NPCs en tiempo real.
Demo "Covert Protocol" (Inworld + ACE, GDC 2025): jugadores interrogan NPCs adaptativos.
SDK disponible para Unreal Engine y Unity. Tendencia: NPCs con voz generada on-the-fly sin latencia perceptible.
NVIDIA también lanzó un fork de Godot con path tracing en GDC 2026 (MIT).

### 3. Generative Agents — de paper a producción
El paper de Stanford "Generative Agents: Interactive Simulacra of Human Behavior" (2023, 21.7k stars) se convirtió en el estándar de arquitectura NPC. Las 3 capas:
- **Memory stream**: log de eventos con timestamp + relevancia + recencia
- **Reflection**: síntesis de recuerdos en insights de alto nivel
- **Planning**: planes horarios basados en reflexiones

Repos derivados activos: Concordia (Google DeepMind, Apache 2.0), implementaciones para RPGs y MMOs.

### 4. AI integrado en engines — Unity 6.2, Godot MCP, Unreal Aura
- **Unity AI** (v6.2, mid-2025): suite en editor sin suscripción separada. Módulos: Assistant (docs/code), Generators (texturas/sprites con difusión), Inference Engine (ML on-device).
- **Godot MCP** ([hi-godot/godot-ai](https://github.com/hi-godot/godot-ai), abr 2026, MIT, 1.1k+ stars): 150+ operaciones, 41 tools MCP. Conecta Godot a Claude Code, Cursor, Codex.
- **Unity MCP Server** ([AnkleBreaker-Studio/unity-mcp-server](https://github.com/AnkleBreaker-Studio/unity-mcp-server), MIT): 268 herramientas MCP para Unity Editor + Hub.
- **Unreal Engine — Aura** (Ramen VR, ene 2026): agente con modos editor y coding. Caso Sinn Studio: lanzó *Zombonks* en 5 meses (~mitad del tiempo normal).
- **Roblox AI Studio** (dic 2025): MCP client integrado + OpenGameEval OSS (47 escenarios de benchmark).

### 5. PCG con LLMs, Diffusion y World Models
- **OpenGame** ([leigest519/OpenGame](https://github.com/leigest519/OpenGame), MIT): framework agentico OSS para generar juegos web end-to-end con GameCoder-27B (RL-entrenado para ejecución de código de juego). Abr 2026.
- **Roblox CUBE 3D**: modelo 1.8B params para generación de objetos 3D on-platform desde texto (mar 2025).
- **PANGeA** (paper 2024): Procedural Artificial Narrative using Generative AI para juegos de turnos.
- World models (Genie 2, etc.): modelos que generan entornos de juego completos e interactivos desde texto/imagen.

### 6. Behavior Trees + LLM — el stack ganador para NPCs
El ecosistema Godot consolidó el patrón Behavior Tree + LLM:
- **Beehave** (MIT, 3.2k stars): BTs componibles en el scene tree de Godot. Lógica reactiva estructurada.
- **LimboAI** (MIT, 2.8k stars): BTs + HSMs (Hierarchical State Machines) combinados.
- **godot_rl_agents** (MIT, 1.5k stars): RL sobre juegos Godot con SB3, Sample Factory, RLLib, CleanRL.

Patrón emergente: BT como esqueleto de control → LLM como módulo de diálogo/decisión contextual.

### 7. AI QA automatizado — testing con agentes
- Bots RL que juegan el juego para detectar bugs en casos edge-case (especialmente level design)
- **GameStudio Subagents** ([pamirtuna/gamestudio-subagents](https://github.com/pamirtuna/gamestudio-subagents)): equipo de sub-agentes IA (dev, QA, artist, game designer) en terminal
- **GamingAgent** (ICLR 2026, lmgame-org): framework de evaluación estandarizado que puede repropurposarse como QA automatizado
- LLMs + Playwright + CrewAI para testing semántico de flujos de UI
- Roblox OpenGameEval: benchmark que incluye escenarios de testing AI automatizado

### 8. Player analytics con GNNs — churn prediction
- Graph Neural Networks sobre comportamiento + red social del jugador
- 75.83 AUROC con GNN (PyTorch Geometric) vs 62.44 de LightGBM flat-table (benchmark RelBench)
- Predicción de churn 14 días en adelante con señales: amigos que se van, difficulty walls, session length declining
- F2P mobile en LATAM: driver crítico (retención > adquisición en costo)

## Proyectos a seguir

| Proyecto | URL | Señal |
|----------|-----|-------|
| **Carbon Engine** | [github.com/orgs/carbonengine](https://github.com/orgs/carbonengine) | MIT desde 1-jul-2026. Engine AAA MMO open. Único en su clase. |
| **OmniGameArena** | [mxlin043/OmniGameArena](https://github.com/mxlin043/OmniGameArena) | arXiv:2606.09826, MIT. Benchmark VLM en UE5 con IDC. Estándar emergente para 3D. |
| **GamingAgent** | [lmgame-org/GamingAgent](https://github.com/lmgame-org/GamingAgent) | ICLR 2026, 947★. Leaderboard LLM gaming en crecimiento. |
| **GameDevBench** | [waynchi/gamedevbench](https://github.com/waynchi/gamedevbench) | Primer benchmark game dev agentico en Godot. Señal de madurez del campo. |
| **Mantella** | [art-from-the-machine/Mantella](https://github.com/art-from-the-machine/Mantella) | MIT, stack STT+LLM+TTS para NPCs. Más completo que alternativas. |
| **godot_rl_agents** | [edbeeching/godot_rl_agents](https://github.com/edbeeching/godot_rl_agents) | RL sobre Godot con 4 frameworks, 1.5k★, comunidad activa |
| **LLMUnity** | [undreamai/LLMUnity](https://github.com/undreamai/LLMUnity) | LLMs locales en Unity, 1.7k stars, creciendo |
| **npcpy** | [NPC-Worldwide/npcpy](https://github.com/NPC-Worldwide/npcpy) | Python para NPCs multimodales, 1.4k stars |
| **OpenGame** | [leigest519/OpenGame](https://github.com/leigest519/OpenGame) | Primer framework agentico OSS para generación de juegos web |

## Señal de mercado — adopción

- 90% de desarrolladores integra AI en sus flujos de trabajo (2026)
- 50% de estudios AAA usa AI en producción (no solo demos)
- ChatGPT: 74% adopción en industria gaming; Google Gemini: 37%; Microsoft Copilot: 22%
- AI in Gaming (broad): $10.1B (2026) → $75.1B (2033) CAGR 33.2% (Persistence Market Research)
- Generative AI in Gaming: $2.21B en 2026, CAGR 23.1%
- NPC Generation AI: $2.44B en 2026, CAGR 31.4%
- AI Asset Generator: $2.08B en 2026 → $10.73B en 2035
- 95%+ de jugadores califican experiencias con NPCs AI como "agradables o recompensantes" (2026)

---
*Fuentes: GDC 2026, Research & Markets, Persistence Market Research, arxiv.org, GitHub (verificado 2026-07-09)*
