# Agentes trending — Gaming AI

> Tendencias activas en AI gaming. Última actualización: 2026-07-08
> Investigación manual curada — complementa el pipeline automático de top.md

## Tendencias principales en 2026

### 1. NPCs con LLM + Memoria persistente — en producción
La adopción de LLMs para NPCs pasó de prototipos a producción en 2026. El patrón dominante combina:
- **LLM base** (GPT-4o, Claude 3.5, Llama 3.1 local) para generación de diálogo
- **Vector store** (ChromaDB, Qdrant) para memoria episódica del personaje
- **TTS/voz** (ElevenLabs, Kokoro TTS open source) para output de audio
- **Reconocimiento de emoción** del jugador vía análisis de texto o cámara

Impacto medido: NPCs AI aumentaron immersion scores 40% y session times 28% en RPGs.
Segmento NPCs + Digital Humans: 28.6% del mercado total AI gaming en 2026.

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
- **Godot MCP** ([hi-godot/godot-ai](https://github.com/hi-godot/godot-ai), abr 2026, MIT, 805 stars): 120+ operaciones, 41 tools MCP. Conecta Godot a Claude Code, Cursor, Codex.
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
- **godot_rl_agents** (MIT, 900+ stars): RL sobre juegos Godot con SB3, Sample Factory, RLLib, CleanRL.

Patrón emergente: BT como esqueleto de control → LLM como módulo de diálogo/decisión contextual.

### 7. AI QA automatizado — testing con agentes
- Bots RL que juegan el juego para detectar bugs en casos edge-case (especialmente level design)
- **GameStudio Subagents** ([pamirtuna/gamestudio-subagents](https://github.com/pamirtuna/gamestudio-subagents)): equipo de sub-agentes IA (dev, QA, artist, game designer) en terminal
- LLMs + Playwright + CrewAI para testing semántico de flujos de UI
- Roblox OpenGameEval: benchmark que incluye escenarios de testing AI automatizado

### 8. Player analytics con GNNs — churn prediction
- Graph Neural Networks sobre comportamiento + red social del jugador
- 75.83 AUROC con GNN (PyTorch Geometric) vs 62.44 de LightGBM flat-table (benchmark RelBench)
- Predicción de churn 14 días en adelante con señales: amigos que se van, difficulty walls, session length declining
- F2P mobile en LATAM: driver crítico (retención > adquisición en costo)

## 🔴 Señales nuevas — semana 2026-07-08

### Carbon Engine (EVE Online) — open source MIT, 1 julio 2026
**La señal más importante de esta semana.**
Fenris Creations (creadores de EVE Online) liberaron el código fuente de Carbon Engine bajo MIT — el motor que ha impulsado EVE Online por más de dos décadas.

- **Repos**: `github.com/orgs/carbonengine` (múltiples módulos)
- **Licencia**: MIT (core), Apache-2.0 (audio module), PSF (IO module)
- **Qué incluye**: Trinity (render engine, visual del espacio EVE), Core C++ modules, networking (CarbonIO), UI (CarbonUI), spatial audio, resource pipelines, Python scripting hooks.
- **Por qué importa**: Primera vez que un engine profesional de MMO AAA se open-sources completamente. Base real para construir juegos de espacio con física MMO probada en producción.
- **Restricción**: Los "key economy systems" (economía de EVE) siguen cerrados. Solo el engine.
- **Oportunidad Globant**: Base AAA para propuestas de juegos de espacio / simulación / MMO sin royalties.

### COCOS 4 — MIT license, enero 2026
Motor de juegos móviles open source bajo MIT. Adquirido por SUD ($72M, nov 2025). Motivación explícita: "AI-native evolution requiere open source — los modelos AI entienden mejor el código abierto."

- **Repo**: disponible en cocos.com + GitHub
- **Licencia**: MIT (sin restricciones comerciales)
- **Fortaleza**: Dominante en Asia (China/JP), mobile-first, cross-platform
- **Módulos**: engine core, cross-platform code, COCOS CLI, IDE headless mode
- **Oportunidad**: Juegos mobile con AI-native features para LATAM (mercado mobile-first)

### Unity MCP Server — 268 tools, en ascenso
AnkleBreaker Studio (Francia) publicó unity-mcp-server con 268 herramientas MCP para Unity. Es el servidor MCP más completo del ecosistema Unity.

- **Repo**: [AnkleBreaker-Studio/unity-mcp-server](https://github.com/AnkleBreaker-Studio/unity-mcp-server) (MIT)
- **Herramientas**: Scene management, GameObjects, Shader Graph, Amplify, terrain, NavMesh, MPPM multiplayer
- **Competidor**: CoplayDev/unity-mcp (MIT, 5.8k stars, 47 tools enfocadas)
- **Impacto**: Estudios Unity ahora tienen MCP parity con Godot para AI-assisted dev

### GDC 2026 — El Paradox AI
La encuesta GDC 2026 (2300+ profesionales) reveló la tensión central del sector:

| Métrica | Valor | Cambio |
|---------|-------|--------|
| Devs con visión negativa de GenAI | **52%** | ↑ desde 30% en 2025 |
| Devs que ven GenAI como positivo | **7%** | ↓ mínimo histórico |
| Juegos con "Agentic NPC" frameworks | +11% YoY | ↑ en adopción real |
| Uso real en producción (player-facing) | Minoritario | Backend sí, jugador no |

**Conclusión para Globant**: La oportunidad es en backend AI (QA, analytics, matchmaking, development tooling) — no en NPCs player-facing que los devs rechazan políticamente. El framing "AI que ayuda al dev" es más vendible que "AI que reemplaza contenido".

## Proyectos a seguir

| Proyecto | URL | Señal |
|----------|-----|-------|
| **godot_rl_agents** | [edbeeching/godot_rl_agents](https://github.com/edbeeching/godot_rl_agents) | RL sobre Godot con 4 frameworks, comunidad activa |
| **LLMUnity** | [undreamai/LLMUnity](https://github.com/undreamai/LLMUnity) | LLMs locales en Unity, 1.7k stars, creciendo |
| **npcpy** | [NPC-Worldwide/npcpy](https://github.com/NPC-Worldwide/npcpy) | Python para NPCs multimodales, 1.4k stars |
| **OpenGame** | [leigest519/OpenGame](https://github.com/leigest519/OpenGame) | Primer framework agentico OSS para generación de juegos web |
| **Aivill** | [SKYHUBDev/Aivill](https://github.com/SKYHUBDev/Aivill) | Villanos adaptativos que aprenden del comportamiento del jugador |

## Señal de mercado — adopción

- 87% de estudios usa AI agents en workflows (Google Cloud survey, 615 devs, jun-jul 2025)
- 50%+ de estudios AAA usa AI en alguna capacidad
- **AI in Gaming (broad): $10.1B en 2026** → $75.1B en 2033, CAGR 33.2% (Market.us, jul 2026)
- Generative AI in Gaming: $1.79B (2025) → **$2.21B en 2026**, CAGR 23.1% (BusinessResearchCompany, jul 2026)
- NPCs y Digital Humans: mayor segmento (28.6% del total AI gaming)
- 62% de nuevos RPG/adventure games usan AI NPCs en 2026 (vs 8% en 2024)
- Retención: juegos con PCG AI retienen 3x más jugadores a 6 meses; roguelikes: 500+ horas promedio vs 30h tradicional

---
*Fuentes: agentmarketcap.ai, solidaitech.com, aivexify.com, market.us, thebusinessresearchcompany.com, gdconf.com/GDC-2026-SOTI (verificado 2026-07-08)*
