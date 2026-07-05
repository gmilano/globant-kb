# Agentes trending — Gaming AI

> Tendencias activas en AI gaming. Última actualización: 2026-07-05
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
**62% de los nuevos juegos RPG/aventura tienen AI NPCs en 2026** (vs 8% en 2024 — crecimiento brutal).

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

### 9. VLMs como agentes jugadores — benchmark de modelo (NUEVO — Jul 2026)
**GamingAgent** ([lmgame-org/GamingAgent](https://github.com/lmgame-org/GamingAgent), MIT, 947★, **ICLR 2026**) establece el paradigma de evaluar modelos LLM/VLM jugando videojuegos reales:
- Usa Gymnasium/Retro interfaces sobre juegos reales: Tetris, Sokoban, 2048, Pokémon Red, Super Mario Bros, Candy Crush, Ace Attorney
- Compara APIs de OpenAI, Anthropic, Google Gemini, xAI, DeepSeek, Qwen sin infraestructura adicional
- Genera replays en video para análisis de fallos
- Casos de uso para Globant: **evaluar qué modelos LLM se comportan mejor en tareas de juego específicas** antes de integrarlos en productos de clientes

**Tendencia paralela**: computer-use agents (Claude Computer Use, GPT-4o Vision) empezando a jugar juegos como tarea de evaluación estándar.

### 10. Sentiment divide — 52% de devs en contra, 50%+ usan AI (GDC 2026)
**Dato clave de GDC 2026**: 52% de los desarrolladores de juegos tienen visión **negativa** de generative AI (vs 30% en 2025). Sin embargo, al mismo tiempo, 50%+ usa AI en alguna capacidad en su desarrollo.
- Uso detrás del escenario: brainstorming, placeholder assets, debugging
- Resistencia a AI player-facing: pocas features AI visibles en títulos shipped
- Preocupaciones: calidad inconsistente, derechos de autor, impacto en empleo de artistas
- **Implicación para Globant**: proponer AI como herramienta de studio (dev tooling, QA, analytics) es más fácil de vender que "AI NPCs" en el pitch inicial. Mostrar beneficios técnicos antes de features de cara al jugador.

## Proyectos a seguir

| Proyecto | URL | Señal |
|----------|-----|-------|
| **GamingAgent** | [lmgame-org/GamingAgent](https://github.com/lmgame-org/GamingAgent) | ICLR 2026, benchmarking estándar emergente para LLM en gaming |
| **godot_rl_agents** | [edbeeching/godot_rl_agents](https://github.com/edbeeching/godot_rl_agents) | RL sobre Godot con 4 frameworks, comunidad activa |
| **LLMUnity** | [undreamai/LLMUnity](https://github.com/undreamai/LLMUnity) | LLMs locales en Unity, 1.7k stars, creciendo |
| **npcpy** | [NPC-Worldwide/npcpy](https://github.com/NPC-Worldwide/npcpy) | Python para NPCs multimodales, 1.4k stars |
| **OpenGame** | [leigest519/OpenGame](https://github.com/leigest519/OpenGame) | Primer framework agentico OSS para generación de juegos web |
| **Aivill** | [SKYHUBDev/Aivill](https://github.com/SKYHUBDev/Aivill) | Villanos adaptativos que aprenden del comportamiento del jugador |
| **Carbon Engine** (Fenris) | [FenrisCreations/carbon](https://github.com/FenrisCreations/carbon) | Motor de EVE Online liberado MIT — 1 julio 2026, muy fresco |

## Señal de mercado — adopción

- 87% de estudios usa AI agents en workflows (Google Cloud survey, 615 devs, jun-jul 2025)
- 50%+ de estudios AAA usa AI en alguna capacidad
- 52% de devs tiene opinión **negativa** de generative AI (GDC 2026, up from 30% in 2025)
- 62% de nuevos RPG/aventura tienen AI NPCs (2026 vs 8% en 2024)
- Generative AI in Gaming: $1.79B (2025) → $2.21B (2026), CAGR 23.1%
- NPCs y Digital Humans: mayor segmento (28.6% del total AI gaming)

---
*Fuentes: GDC 2026 developer survey, aivexify.com, blog.imseankim.com, thegww.com, GitHub (verificado 2026-07-05)*
