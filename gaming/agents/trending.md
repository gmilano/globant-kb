# Agentes trending — Gaming AI

> Tendencias activas en AI gaming. Última actualización: 2026-07-12
> Investigación manual curada — complementa el pipeline automático de top.md

## 🆕 Novedades clave — semana del 7–12 Jul 2026

### Carbon Engine (EVE Online) — Open Source 1 Jul 2026
**El evento más relevante de la semana en gaming open source.**

Fenris Creations (antes CCP Games, vendida de Pearl Abyss por $120M en mayo 2026) liberó el engine Carbon que potencia EVE Online bajo licencia MIT el 1 de julio de 2026:
- **20+ módulos** en GitHub en [carbonengine org](https://github.com/carbonengine): Destiny (física + pathfinding), Trinity (gráficos).
- Licencia MIT en la mayoría de módulos; audio clustering bajo Apache-2.0; IO bajo Python Software Foundation License.
- Es inspectable, forkable y usable para construir juegos comerciales incluyendo nuevos MMOs.
- Modelo: siguiendo principios Godot — totalmente open source.
- **Impacto**: primer engine AAA probado en producción (EVE Online, 20+ años de uptime) disponible como base OSS para MMOs.

---

## Tendencias principales en 2026

### 1. NPCs con LLM + Memoria persistente — en producción
La adopción de LLMs para NPCs pasó de prototipos a producción en 2026. El patrón dominante combina:
- **LLM base** (GPT-4o, Claude 3.5, Llama 3.1 local) para generación de diálogo
- **Vector store** (ChromaDB, Qdrant) para memoria episódica del personaje
- **TTS/voz** (ElevenLabs, Kokoro TTS open source) para output de audio
- **Reconocimiento de emoción** del jugador vía análisis de texto o cámara

Impacto medido: NPCs AI aumentaron immersion scores 40% y session times 28% en RPGs.
Segmento NPCs + Digital Humans: **28.6% del mercado total AI gaming** en 2026.

### 2. GDC 2026 — Estado de la industria (datos oficiales)
- **52%** de profesionales del gaming cree que la IA generativa **daña** la industria.
- **30%** de empleados en estudios de desarrollo usa herramientas AI (vs **58%** en publishers/marketing/PR).
- **50%** de estudios de juego usa AI activamente en el desarrollo.
- **7,300+ juegos** en Steam declaran uso de AI — el doble respecto a 2024.
- Preocupaciones dominantes: desplazamiento de puestos de trabajo y calidad del contenido ("gameslop").

### 3. NVIDIA ACE — Digital Humans en tiempo real
NVIDIA ACE (Avatar Cloud Engine): ASR + NLP + TTS + animación facial para NPCs en tiempo real.
Demo "Covert Protocol" (Inworld + ACE, GDC 2025): jugadores interrogan NPCs adaptativos.
SDK disponible para Unreal Engine y Unity. Tendencia: NPCs con voz generada on-the-fly sin latencia perceptible.
NVIDIA también invierte activamente en engines open source (confirmado 2026).

### 4. Generative Agents — de paper a producción
El paper de Stanford "Generative Agents: Interactive Simulacra of Human Behavior" (2023, 21.7k stars) se convirtió en el estándar de arquitectura NPC. Las 3 capas:
- **Memory stream**: log de eventos con timestamp + relevancia + recencia
- **Reflection**: síntesis de recuerdos en insights de alto nivel
- **Planning**: planes horarios basados en reflexiones

Repos derivados activos: Concordia (Google DeepMind, Apache 2.0), implementaciones para RPGs y MMOs.

### 5. AI integrado en engines — Unity 6.2, Godot 4.4, Unreal Aura, Bevy 0.16
- **Unity AI** (v6.2, mid-2025): suite en editor sin suscripción separada. Módulos: Assistant (docs/code), Generators (texturas/sprites con difusión), Inference Engine (ML on-device).
- **Godot 4.4**: potencia ~**12% de nuevas releases en Steam** (mayo 2026). Con 4.5 beta corriendo en paralelo. ~112k stars.
- **Godot MCP** ([hi-godot/godot-ai](https://github.com/hi-godot/godot-ai), abr 2026, MIT, 805 stars): 120+ operaciones, 41 tools MCP. Conecta Godot a Claude Code, Cursor, Codex.
- **Unreal Engine — Aura** (Ramen VR, ene 2026): agente con modos editor y coding. Caso Sinn Studio: lanzó *Zombonks* en 5 meses (~mitad del tiempo normal).
- **Roblox AI Studio** (dic 2025): MCP client integrado + OpenGameEval OSS (47 escenarios de benchmark).
- **Bevy** (Rust, MIT) alcanzó **v0.16** — motor ECS maduro, ahora considerado serio para proyectos de producción.

### 6. LLM Gaming Agents para evaluación — GamingAgent (ICLR 2026)
- **GamingAgent** ([lmgame-org/GamingAgent](https://github.com/lmgame-org/GamingAgent), MIT, ICLR 2026): paper "lmgame-Bench: How Good are LLMs at Playing Games?" — evalúa LLMs jugando juegos reales (UC Berkeley).
- Juegos soportados: Sokoban, Tetris, Candy Crush, 2048, Super Mario Bros, Ace Attorney.
- Benchmark evalúa: vision brittleness, prompt variance, data contamination.
- Impacto: establece estándar para medir capacidades agenticas de LLMs en entornos de juego real.

### 7. PCG con LLMs, Diffusion y World Models
- **OpenGame** ([leigest519/OpenGame](https://github.com/leigest519/OpenGame), Apache-2.0, ~2.3k★): framework agentico OSS para generar juegos web end-to-end con GameCoder-27B. Abr 2026.
- **Roblox CUBE 3D**: modelo 1.8B params para generación de objetos 3D on-platform desde texto (mar 2025).
- **PANGeA** (paper 2024): Procedural Artificial Narrative using Generative AI para juegos de turnos.
- World models (Genie 2, etc.): modelos que generan entornos de juego completos e interactivos desde texto/imagen.

### 8. Behavior Trees + LLM — el stack ganador para NPCs
- **Beehave** (MIT, 3.2k stars): BTs componibles en el scene tree de Godot.
- **LimboAI** (MIT, 2.8k stars): BTs + HSMs (Hierarchical State Machines) combinados.
- **godot_rl_agents** (MIT, 900+ stars): RL sobre juegos Godot con SB3, Sample Factory, RLLib, CleanRL.
- Patrón emergente: BT como esqueleto de control → LLM como módulo de diálogo/decisión contextual.

### 9. AI QA automatizado — testing con agentes
- Bots RL que juegan el juego para detectar bugs en casos edge-case (especialmente level design).
- Framework **TITAN** (MMORPGs): combina zero-shot LLMs con componentes especializados. Adoptado en pipelines QA de varios estudios.
- **GameStudio Subagents** ([pamirtuna/gamestudio-subagents](https://github.com/pamirtuna/gamestudio-subagents)): equipo de sub-agentes IA (dev, QA, artist, game designer) en terminal.
- Reducción estimada de QA manual: 60-70% en proyectos con RL QA implementado.

### 10. Player analytics con GNNs — churn prediction
- Graph Neural Networks sobre comportamiento + red social del jugador.
- 75.83 AUROC con GNN (PyTorch Geometric) vs 62.44 de LightGBM flat-table (benchmark RelBench).
- Predicción de churn 14 días en adelante: señales clave son amigos que se van, difficulty walls, session length declining.
- F2P mobile en LATAM: driver crítico (retención > adquisición en costo).

## Proyectos a seguir

| Proyecto | URL | Señal |
|----------|-----|-------|
| **Carbon Engine** | [carbonengine](https://github.com/carbonengine) | Engine EVE Online open-sourced 1 Jul 2026. 20+ módulos MIT. Base para MMOs. |
| **GamingAgent** | [lmgame-org/GamingAgent](https://github.com/lmgame-org/GamingAgent) | ICLR 2026 MIT. LLMs jugando juegos reales. Benchmark estándar emergente. |
| **godot_rl_agents** | [edbeeching/godot_rl_agents](https://github.com/edbeeching/godot_rl_agents) | RL sobre Godot con 4 frameworks, comunidad activa. |
| **LLMUnity** | [undreamai/LLMUnity](https://github.com/undreamai/LLMUnity) | LLMs locales en Unity, 1.7k stars, creciendo. |
| **OpenGame** | [leigest519/OpenGame](https://github.com/leigest519/OpenGame) | Primer framework agentico OSS para generación de juegos web, 2.3k stars. |
| **Bevy** | [bevyengine/bevy](https://github.com/bevyengine/bevy) | Rust ECS engine v0.16 — consideración seria para nuevos proyectos. |

## Señal de mercado — adopción

- 87% de estudios usa AI agents en workflows (Google Cloud survey, 615 devs, jun-jul 2025).
- 50%+ de estudios usa AI activamente; 7,300+ juegos en Steam con AI (GDC 2026).
- Generative AI in Gaming: **$2.21B en 2026** (vs $1.79B 2025), CAGR 23.2%, → $5.09B en 2030.
- AI in Gaming (amplio): **$10.1B en 2026** → $75.1B en 2033, CAGR 33.2%.
- NPCs y Digital Humans: mayor segmento (28.6% del total AI gaming).

---
*Fuentes: gdconf.com/GDC-2026-SOTI, gamingonlinux.com, gamedeveloper.com, globenewswire.com, youngju.dev/blog/2026-05-16, GitHub (verificado 2026-07-12)*
