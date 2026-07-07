# Agentes trending — Gaming AI

> Tendencias activas en AI gaming. Última actualización: 2026-07-07
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
- Generative AI in Gaming: $1.79B en 2026, CAGR 23.2%
- NPCs y Digital Humans: mayor segmento (28.6% del total AI gaming)

---
*Fuentes: agentmarketcap.ai, solidaitech.com, aivexify.com, wanderfolk.ai, GitHub (verificado 2026-07-02)*

### 9. GDC 2026 — La brecha adopción-rechazo en GenAI
El GDC State of the Game Industry 2026 (3.000+ desarrolladores) reveló una paradoja:
- **52% de devs ven GenAI negativamente** — subió desde 30% en 2025 (el rechazo crece más rápido que la adopción).
- Pero adopción corporativa alcanzó 52%, con solo 36% de uso personal real → brecha "mandato vs convicción".
- Usos más aceptados: research/brainstorm (81%), code assist (47%), prototipado (35%).
- Usos más rechazados: asset generation (19%), PCG (10%), player-facing (5%).
- Devs aceptan AI para **su workflow interno** pero rechazan AI como característica del juego.

**Implicación para Globant**: proponer AI como tooling de productividad (dev tools, QA, análisis) tiene 2-4x mejor recepción en estudios que proponer "NPCs con IA" al usuario final.

### 10. World Models como motores de juego — nueva categoría
Los modelos de mundo (world models) pasaron de papers académicos a demos jugables en 2024-2026:
- **DIAMOND** (MIT, NeurIPS 2024 Spotlight, [eloialonso/diamond](https://github.com/eloialonso/diamond)): agente RL entrenado completamente en un world model difusivo. Score 1.46 human normalized en Atari 100k — nuevo estado del arte para agentes entrenados en world models. También funciona como motor neural interactivo de CS:GO.
- **Oasis 500M** (MIT, [etched-ai/open-oasis](https://github.com/etched-ai/open-oasis)): Decart + Etched, oct 2024. Primer mundo Minecraft-like playable generado frame-a-frame por un modelo transformer difusivo. Sin motor de física. ~14k stars.
- **ReactiveGWM** (arxiv jun 2026): conecta world models con NPCs reactivos — el mundo generativo responde al estado del NPC.
- Tracking: [dweam-team/awesome-world-model-games](https://github.com/dweam-team/awesome-world-model-games).

**Aplicaciones prácticas para studios**:
1. Entrenar agentes RL en una *representación aprendida* del juego (más rápido/barato que el motor real).
2. Generar variaciones infinitas de niveles sin código de PCG adicional.
3. Crear demos interactivos de juegos antes de construir el motor completo.

**Estado actual (2026)**: mundo models todavía tienen problemas de consistencia temporal (el inventario "aparece y desaparece"). No producción-ready para juegos completos, pero sí para entrenamiento RL y prototipado.

### 11. GamingAgent + lmgame-Bench — evaluación sistemática de LLMs en juegos (ICLR 2026)
El proyecto [lmgame-org/GamingAgent](https://github.com/lmgame-org/GamingAgent), aceptado en ICLR 2026, introduce un framework para evaluar LLMs y VLMs usando 6 juegos clásicos como entorno de test.

**Qué hace:**
- **lmgame-Bench**: benchmark modular sobre Sokoban, Tetris, Candy Crush, 2048, Super Mario Bros y Ace Attorney via API Gym unificada.
- **Harness modular**: los módulos de percepción, memoria y razonamiento se pueden habilitar/deshabilitar para aislar qué capacidad falla.
- **13 modelos evaluados**: ranking de qué LLM sirve para qué tipo de juego.
- **Correlaciones clave**: juegos de planificación espacial (Sokoban, Tetris) discriminan bien entre modelos; juegos narrativos (Ace Attorney) miden comprensión de lenguaje largo.

**Por qué importa para Globant:**
- Permite escoger el modelo correcto para cada caso de uso (razonamiento espacial vs narrativo vs memoria).
- Protocolo reproducible para benchmarkear modelos propietarios del cliente contra juegos internos.
- Señal académica de calidad: ICLR 2026 valida el enfoque "juegos como benchmark universal".

**Repos relacionados:**
- [lmgame-org/GamingAgent](https://github.com/lmgame-org/GamingAgent) — Apache-2.0
- [git-disl/awesome-LLM-game-agent-papers](https://github.com/git-disl/awesome-LLM-game-agent-papers) — survey ACM CSUR
- MineExplorer (arxiv 2605.30931): 1,497 tareas en Minecraft para evaluar exploración open-world con MLLMs
- MineAnyBuild (NeurIPS 2025): benchmarking de planificación espacial para agentes en Minecraft

### 12. GDC Festival of Gaming 2026 — "infrastructure problem" y studios propietarios
El GDC Festival of Gaming 2026 Trends Report (mayo 27, 2026) es el segundo informe GDC del año, complementando al State of the Game Industry (marzo):

**Nuevos datos clave:**
- El 36% de desarrolladores usa herramientas GenAI en su trabajo diario.
- **30% de estudios AAA ya tienen sistemas AI propietarios** entrenados en datos y assets internos — señal de madurez del mercado que el State of Industry no capturó.
- El reporte enmarca el problema central como "infrastructure problem": los devs tienen acceso a modelos potentes pero carecen de toolchains integrados, pipelines de datos y governance para operarlos de forma sostenible.
- AI agentica podría reducir costos de desarrollo AAA manejando coding, debugging y customer support.
- Co-desarrollo creciendo como estrategia para compensar falta de presupuesto interno.
- Unity y Unreal ahora tienen AI integrada "en el punto de creación" (no como herramienta externa separada).

**Implicación para Globant:** El gap de "infrastructure problem" es exactamente el servicio de AI Studios — los estudios tienen la demanda pero no la arquitectura. Oportunidad de positioning como "AI game dev infrastructure partner".

Fuente: businesswire.com/news/home/20260527821603/en/GDC-Festival-of-Gaming-2026-Trends-Report, gamedev.net/news/gdc-trends-report-2026

### 13. Morgan Stanley — AI puede desbloquear $22B en ganancias gaming (abril 2026)
Análisis de Morgan Stanley publicado en abril 2026 sobre el impacto financiero de AI en gaming:

**Datos clave:**
- Gasto global de consumidores en videojuegos: **$275B en 2026**.
- AI podría **reducir costos de desarrollo en ~50%** (coding, testing, content generation).
- Potencial de desbloquear **$22B adicionales en ganancias** anuales para la industria.
- Beneficiarios principales: **Tencent, Sony, Roblox** (plataformas/operadores); y grandes publishers como **Take-Two, EA, Ubisoft** (escala para desplegar AI en múltiples títulos).
- Mecánica: equipos más pequeños, timelines comprimidos, más iteraciones post-launch.

**Contexto para Globant**: el análisis confirma que la presión para adoptar AI en gaming es financiera, no solo tecnológica. Los clientes no son solo estudios apasionados por la tecnología — son ejecutivos buscando reducir COGS del juego. El pitch más efectivo: ROI en reducción de QA manual + content creation speed.

Fuente: morganstanley.com/insights/articles/ai-gaming-22-billion-industry-earning-potential-2026

---
*Fuentes: GDC 2026 (winbuzzer.com, blog.imseankim.com), GDC Festival 2026 (businesswire.com, gamedev.net), Morgan Stanley (morganstanley.com, reuters.com), github.com/lmgame-org/GamingAgent, arxiv.org/abs/2605.30931, github.com/eloialonso/diamond, github.com/etched-ai/open-oasis, arxiv.org/abs/2605.15256*
