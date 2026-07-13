# Agentes trending — Gaming AI

> Tendencias activas en AI gaming. Última actualización: 2026-07-13 | v13
> Semana del 7-13 julio 2026 — Carbon Engine open source, GDC 2026 análisis, ICLR 2026

## 🔴 BREAKING (julio 2026)

### Carbon Engine (EVE Online) — MIT open source — 1 jul 2026

Fenris Creations (ex-CCP Games) cumplió su promesa y abrió el **Carbon Engine**, el motor que alimenta EVE Online y EVE Frontier:

- **Repos**: github.com/Fenris-cs/carbon — más de 20 módulos C++
- **Licencias**: MIT (core), Apache-2.0 (audio espacial), PSF (IO)
- **Módulos clave**:
  - **Destiny**: physics simulation + pathfinding. Mismo motor de las batallas récord de EVE Online (miles de naves simultáneas). Navmesh + RL-ready.
  - **Trinity**: motor gráfico para worlds AAA de sci-fi a gran escala. PBR, LOD, rendering a distancias MMO.
- **Por qué importa**: primer motor de un MMO AAA de larga duración que abre su código. Única alternativa MIT/Apache-2.0 con physics probada en producción de MMO real.
- **Para Globant**: base para proyectos de MMO y simulaciones masivas sin royalties. Combinar con Godot para juegos más accesibles o usar Trinity directamente para AAA.

Fuentes: [PC Gamer](https://www.pcgamer.com/games/mmo/eve-online-studio-fenris-follows-through-on-yearslong-promise-to-make-its-in-house-game-engine-fully-open-source/) | [GamingOnLinux](https://www.gamingonlinux.com/2026/07/carbon-engine-framework-powering-eve-online-is-now-open-source/) | [Game Developer](https://www.gamedeveloper.com/production/eve-online-s-cross-platform-game-engine-framework-is-now-fully-open-source/)

---

## Tendencias principales confirmadas en 2026

### 1. NPCs con LLM + Memoria persistente — en producción
La adopción de LLMs para NPCs pasó de prototipos a producción en 2026. El patrón dominante combina:
- **LLM base** (GPT-4o, Claude 3.5, Llama 3.1 local) para generación de diálogo
- **Vector store** (ChromaDB, Qdrant) para memoria episódica del personaje
- **TTS/voz** (ElevenLabs, Kokoro TTS open source) para output de audio
- **Reconocimiento de emoción** del jugador vía análisis de texto o cámara

Impacto medido: NPCs AI aumentaron immersion scores 40% y session times 28% en RPGs.
Segmento NPCs + Digital Humans: 28.6% del mercado total AI gaming en 2026.

### 2. GDC 2026 — AI domina pero 52% de devs se opone
- AI dominó GDC 2026: video generation, voice synthesis, NPC animation, PCG reshapean workflows de estudios
- Herramientas en producción más citadas: Promethean AI, Unity ML-Agents, Meshy AI, Inworld AI, Scenario.gg
- **52% de game developers ven la GenAI negativamente** — sube desde 30% hace un año
- La pregunta ya no es si AI puede transformar game dev — sino si los devs quieren que lo haga
- Impacto positivo medido: juegos con AI avanzada logran **43% más retención** y **2.3× longer playtime**

### 3. GamingAgent — ICLR 2026, evaluación LLM en juegos reales
- **GamingAgent** (lmgame-org, Apache-2.0, 1.2k stars): aceptado en ICLR 2026
- Soporta: sokoban, tetris, candy_crush, 2048, Super Mario Bros, Ace Attorney
- **lmgame-bench**: 6 juegos reales como benchmarks modulares con Gym API
  - Evalúa: percepción visual, memoria, razonamiento espaciotemporal, long-context reasoning
  - 13 modelos SOTA evaluados — benchmark sigue siendo desafiante para todos
  - Expone limitaciones de modelos en: visual state extraction, reflection, spatiotemporal reasoning
- Relevancia: primer benchmark que discrimina efectivamente entre modelos en tareas de juego reales

### 4. NVIDIA ACE — Digital Humans en tiempo real
NVIDIA ACE (Avatar Cloud Engine): ASR + NLP + TTS + animación facial para NPCs en tiempo real.
Demo "Covert Protocol" (Inworld + ACE, GDC 2025): jugadores interrogan NPCs adaptativos.
SDK disponible para Unreal Engine y Unity. Tendencia: NPCs con voz generada on-the-fly sin latencia perceptible.
NVIDIA también lanzó un fork de Godot con path tracing en GDC 2026 (MIT).

### 5. Generative Agents — de paper a producción
El paper de Stanford "Generative Agents: Interactive Simulacra of Human Behavior" (2023, 21.7k stars) se convirtió en el estándar de arquitectura NPC. Las 3 capas:
- **Memory stream**: log de eventos con timestamp + relevancia + recencia
- **Reflection**: síntesis de recuerdos en insights de alto nivel
- **Planning**: planes horarios basados en reflexiones

Repos derivados activos: Concordia (Google DeepMind, Apache 2.0), implementaciones para RPGs y MMOs.

### 6. MCP en engines de juego — Godot, Unity, Unreal

La integración MCP entre editores de juego y AI coding assistants se consolidó:
- **Godot**: godot-ai (hi-godot, MIT, 805 stars), Godot-MCP (IvanMurzak, Apache-2.0), godot-mcp (Coding-Solo)
- **Unity**: Unity-MCP (IvanMurzak, MIT) — Any C# method as a tool with one line
- **Unreal**: UnrealGenAISupport (MIT, 619 stars) + Aura agent (Ramen VR, ene 2026)
- **FunplayAI**: herramientas MCP cross-engine para Unity, Cocos, Godot
- Adopción: 87% de estudios ya usa AI agents en workflows (Google Cloud survey, 615 devs)
- Caso Sinn Studio: lanzó *Zombonks* en 5 meses (~mitad del tiempo normal) con Aura en UE

### 7. AI integrado en engines — Unity 6.2, Godot MCP, Unreal Aura
- **Unity AI** (v6.2, mid-2025): suite en editor sin suscripción separada. Módulos: Assistant (docs/code), Generators (texturas/sprites con difusión), Inference Engine (ML on-device).
- **Roblox AI Studio** (dic 2025): MCP client integrado + OpenGameEval OSS (47 escenarios de benchmark).

### 8. PCG con LLMs, Diffusion y World Models
- **OpenGame** ([leigest519/OpenGame](https://github.com/leigest519/OpenGame), MIT): framework agentico OSS para generar juegos web end-to-end con GameCoder-27B (RL-entrenado para ejecución de código de juego). Abr 2026.
- **Roblox CUBE 3D**: modelo 1.8B params para generación de objetos 3D on-platform desde texto (mar 2025).
- **PANGeA** (paper 2024): Procedural Artificial Narrative using Generative AI para juegos de turnos.
- World models (Genie 2, etc.): modelos que generan entornos de juego completos e interactivos desde texto/imagen.

### 9. Behavior Trees + LLM — el stack ganador para NPCs
El ecosistema Godot consolidó el patrón Behavior Tree + LLM:
- **Beehave** (MIT, 3.2k stars): BTs componibles en el scene tree de Godot. Lógica reactiva estructurada.
- **LimboAI** (MIT, 2.8k stars): BTs + HSMs (Hierarchical State Machines) combinados.
- **godot_rl_agents** (MIT, 900+ stars): RL sobre juegos Godot con SB3, Sample Factory, RLLib, CleanRL.

Patrón emergente: BT como esqueleto de control → LLM como módulo de diálogo/decisión contextual.

### 10. AI QA automatizado — testing con agentes
- Bots RL que juegan el juego para detectar bugs en casos edge-case (especialmente level design)
- **GameStudio Subagents** ([pamirtuna/gamestudio-subagents](https://github.com/pamirtuna/gamestudio-subagents)): equipo de sub-agentes IA (dev, QA, artist, game designer) en terminal
- LLMs + Playwright + CrewAI para testing semántico de flujos de UI
- Roblox OpenGameEval: benchmark que incluye escenarios de testing AI automatizado

### 11. Player analytics con GNNs — churn prediction
- Graph Neural Networks sobre comportamiento + red social del jugador
- 75.83 AUROC con GNN (PyTorch Geometric) vs 62.44 de LightGBM flat-table (benchmark RelBench)
- Predicción de churn 14 días en adelante con señales: amigos que se van, difficulty walls, session length declining
- F2P mobile en LATAM: driver crítico (retención > adquisición en costo)

## Proyectos a seguir

| Proyecto | URL | Señal |
|----------|-----|-------|
| **Carbon Engine** | [github.com/Fenris-cs/carbon](https://github.com/Fenris-cs/carbon) | MIT, motor de EVE Online, abierto 1-jul-2026. Destiny physics + Trinity gráficos |
| **GamingAgent** | [lmgame-org/GamingAgent](https://github.com/lmgame-org/GamingAgent) | Apache-2.0, ICLR 2026, 1.2k stars. Evaluación LLM en juegos reales |
| **godot_rl_agents** | [edbeeching/godot_rl_agents](https://github.com/edbeeching/godot_rl_agents) | RL sobre Godot con 4 frameworks, comunidad activa |
| **LLMUnity** | [undreamai/LLMUnity](https://github.com/undreamai/LLMUnity) | LLMs locales en Unity, 1.7k stars, creciendo |
| **npcpy** | [NPC-Worldwide/npcpy](https://github.com/NPC-Worldwide/npcpy) | Python para NPCs multimodales, 1.4k stars |
| **OpenGame** | [leigest519/OpenGame](https://github.com/leigest519/OpenGame) | Primer framework agentico OSS para generación de juegos web |
| **Aivill** | [SKYHUBDev/Aivill](https://github.com/SKYHUBDev/Aivill) | Villanos adaptativos que aprenden del comportamiento del jugador |

## Señal de mercado — adopción

- 87% de estudios usa AI agents en workflows (Google Cloud survey, 615 devs, jun-jul 2025)
- 50%+ de estudios AAA usa AI en alguna capacidad
- **GenAI in Gaming**: $1.79B → **$2.21B en 2026**, CAGR 23.1%
- **AI in Gaming (amplio)**: **$10.1B en 2026** → $75.1B en 2033, CAGR 33.2%
- NPCs y Digital Humans: mayor segmento (28.6% del total AI gaming)
- 52% de devs tienen visión negativa de GenAI (vs 30% hace 1 año) — señal de madurez/fatiga

---
*Fuentes: PC Gamer, GamingOnLinux, Game Developer, aibuzz.blog, solidaitech.com, imseankim.com (GDC 2026), GitHub (verificado 2026-07-13)*
