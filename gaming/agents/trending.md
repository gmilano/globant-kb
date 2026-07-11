# Agentes trending — Gaming AI

> Tendencias activas en AI gaming. Última actualización: 2026-07-11 | v9
> Investigación manual curada — complementa el pipeline automático de top.md

## Novedades julio 2026

### Concordia v2.0 — Google DeepMind
Google DeepMind lanzó Concordia v2.0 (Apache-2.0) en junio 2026: plataforma de simulación multi-agente generativa con patrón Game Master que administra el entorno mientras agentes "jugadores" interactúan en lenguaje natural.
- Aplicación gaming: RPGs con decenas de NPCs agénticos autónomos (cada NPC con su propio LLM context + memoria).
- Aplicación research: benchmark de AI safety y comportamiento social emergente.
- Repo: [google-deepmind/concordia](https://github.com/google-deepmind/concordia) — Apache-2.0, ~1.5k stars.

### Paper: "Multi-Actor Generative AI as a Game Engine" (arXiv 2507.08892, jul 2026)
Nuevo paper que propone usar múltiples agentes LLM como sustitutos parciales del game engine tradicional:
- Un LLM actúa como "game state manager" (física, reglas), otro como "NPC controller", otro como "narrative director".
- Demostrado en juegos de texto y prototipo 2D simple.
- Relevancia: abre el camino para "AI-native games" donde el motor es un grafo de agentes, no código determinístico.

### GPT-5.6 y Gemini 3.5 Flash — impacto en NPCs en tiempo real
Lanzamientos julio 2026 con relevancia directa para gaming:
- **GPT-5.6 gpt-realtime-2.1**: latencia p95 25% menor — abre conversaciones NPC sin latencia perceptible.
- **GPT-5.6 Luna**: modelo pequeño y rápido — viable para NPC responses a <200ms.
- **Gemini 3.5 Flash**: optimizado para agentic workflows — útil para NPC con memory retrieval complejo.
- Aplicación: NPCs que responden en <300ms end-to-end (ASR → LLM → TTS) son viables en producción hoy.

---

## Tendencias principales 2026

### 1. NPCs con LLM + Memoria persistente — en producción masiva
La adopción de LLMs para NPCs pasó de prototipos a producción en 2026:
- **62%** de nuevos RPG/adventure games lanzados en 2026 tienen AI NPCs (vs 8% en 2024) — GDC 2026.
- Patrón dominante: LLM base + Vector store (ChromaDB, Qdrant) para memoria episódica + TTS (ElevenLabs o Kokoro OSS).
- Impacto: +40% immersion scores, +28% session time en RPGs con AI NPCs.
- Segmento NPCs + Digital Humans: **28.6%** del mercado total AI gaming en 2026.
- NPC Generation AI Market: **$2.44B (2026)** → $7.22B (2030), CAGR 31.1%.

### 2. NVIDIA ACE — Digital Humans en tiempo real
NVIDIA ACE (Avatar Cloud Engine): ASR + NLP + TTS + animación facial para NPCs en tiempo real.
- SDK disponible para Unreal Engine y Unity.
- Tendencia: NPCs con voz generada on-the-fly sin latencia perceptible.
- NVIDIA también lanzó un fork de Godot con path tracing en GDC 2026 (MIT).
- Alternativa OSS: Kokoro TTS (Apache-2.0) para voz offline + Whisper para ASR.

### 3. Generative Agents — arquitectura estándar de industria
El paper de Stanford "Generative Agents: Interactive Simulacra of Human Behavior" (2023, 21.7k stars) se convirtió en el estándar de arquitectura NPC. Las 3 capas:
- **Memory stream**: log de eventos con timestamp + relevancia + recencia.
- **Reflection**: síntesis de recuerdos en insights de alto nivel.
- **Planning**: planes horarios basados en reflexiones.
Repos derivados activos: Concordia v2.0 (Google DeepMind, Apache 2.0), implementaciones para RPGs y MMOs.

### 4. AI integrado en engines — Unity 6.2, Godot MCP, Unreal Aura
- **Unity AI** (v6.2, mid-2025): suite en editor sin suscripción separada. Módulos: Assistant (docs/code), Generators (texturas/sprites con difusión), Inference Engine (ML on-device).
- **Godot + godot-ai** (abr 2026, MIT, 900+ stars): 120+ operaciones, 41 tools MCP. Conecta Godot a Claude Code, Cursor, Codex.
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
- **godot_rl_agents** (MIT, 1.0k+ stars): RL sobre juegos Godot con SB3, Sample Factory, RLLib, CleanRL.
Patrón emergente: BT como esqueleto de control → LLM como módulo de diálogo/decisión contextual.

### 7. AI QA automatizado — testing con agentes
- Bots RL que juegan el juego para detectar bugs en casos edge-case (especialmente level design).
- **GameStudio Subagents** ([pamirtuna/gamestudio-subagents](https://github.com/pamirtuna/gamestudio-subagents)): equipo de sub-agentes IA (dev, QA, artist, game designer) en terminal.
- LLMs + Playwright + CrewAI para testing semántico de flujos de UI.
- Roblox OpenGameEval: benchmark que incluye escenarios de testing AI automatizado.

### 8. Player analytics con GNNs — churn prediction
- Graph Neural Networks sobre comportamiento + red social del jugador.
- 75.83 AUROC con GNN (PyTorch Geometric) vs 62.44 de LightGBM flat-table (benchmark RelBench).
- Predicción de churn 14 días en adelante con señales: amigos que se van, difficulty walls, session length declining.
- F2P mobile en LATAM: driver crítico (retención > adquisición en costo).

### 9. Sentimiento dev — tensión cresciente
- **52%** de game developers ven la IA generativa negativamente en 2026 (vs 30% en 2025) — GDC 2026.
- Preocupaciones: desplazamiento laboral de artistas/escritores, calidad de contenido AI.
- Oportunidad para Globant: posicionarse en AI como "amplificación humana" vs "reemplazo", especialmente en LATAM donde los studios son mid-size y los equipos son ajustados.

## Proyectos a seguir

| Proyecto | URL | Señal |
|----------|-----|-------|
| **Concordia** | [google-deepmind/concordia](https://github.com/google-deepmind/concordia) | v2.0 jun 2026 — simulación multi-agente para RPGs/MMOs |
| **godot_rl_agents** | [edbeeching/godot_rl_agents](https://github.com/edbeeching/godot_rl_agents) | RL sobre Godot con 4 frameworks, comunidad activa |
| **LLMUnity** | [undreamai/LLMUnity](https://github.com/undreamai/LLMUnity) | LLMs locales en Unity, 1.7k stars, creciendo |
| **npcpy** | [NPC-Worldwide/npcpy](https://github.com/NPC-Worldwide/npcpy) | Python para NPCs multimodales, 1.4k stars |
| **OpenGame** | [leigest519/OpenGame](https://github.com/leigest519/OpenGame) | Primer framework agentico OSS para generación de juegos web |
| **Aivill** | [SKYHUBDev/Aivill](https://github.com/SKYHUBDev/Aivill) | Villanos adaptativos que aprenden del comportamiento del jugador |

## Señal de mercado — adopción

- AI in Gaming: **$10.1B (2026)** → $75.1B (2033), CAGR 33.2%
- 87% de estudios usa AI agents en workflows (Google Cloud survey, 615 devs, jun-jul 2025)
- 62% de nuevos RPG/adventure games tienen AI NPCs (2026 vs 8% en 2024) — GDC 2026
- NPCs y Digital Humans: mayor segmento (28.6% del total AI gaming)
- AI tools reducen tiempo de creación de assets 70-90% y costos $100k-$500k por título

---
*Fuentes: GDC 2026, arXiv 2507.08892, solidaitech.com, thegww.com, cooperativeai.com, GitHub (verificado 2026-07-11)*
