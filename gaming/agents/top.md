# 🎮 Agentes AI — Gaming

> Agentes y herramientas AI open source verificados. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-10 (v8) | Verificado por deep-research (v8 — nuevos: NitroGen/NVIDIA, Claude-Code-Game-Studios, GDC 2026 LTM NPC Trust Score)

## Foundation Models para Gaming (nuevo 2026)

| Nombre | Repo | Licencia | Descripción | Stars |
|--------|------|----------|-------------|-------|
| NitroGen | [MineDojo/NitroGen](https://github.com/MineDojo/NitroGen) | MIT | **arXiv:2601.02427 (ene 2026). Por NVIDIA + Stanford + Caltech + UChicago + UT Austin.** Vision-action foundation model: 493M params (SigLip2 + DiT). Entrenado en 40,000 horas de gameplay videos de 1,000+ juegos via behavior cloning. 52% mejora relativa sobre modelos entrenados desde cero en juegos nunca vistos. Pesos + dataset + evaluation suite open source. HuggingFace: nvidia/NitroGen. | ~400 |

---

## Ecosistema Godot (MIT — recomendado como base)

| Nombre | Repo | Licencia | Descripción | Stars |
|--------|------|----------|-------------|-------|
| Beehave | [bitbrain/beehave](https://github.com/bitbrain/beehave) | MIT | Behavior trees componibles en el scene tree de Godot para NPC y boss AI | 3.2k |
| LimboAI | [limbonaut/limboai](https://github.com/limbonaut/limboai) | MIT | Plugin C++ para Godot: Behavior Trees + Hierarchical State Machines. BTState permite combinar ambos para IA reactiva | 2.8k |
| godot-ai | [hi-godot/godot-ai](https://github.com/hi-godot/godot-ai) | MIT | Servidor MCP con 150+ operaciones y ~41 herramientas. Conecta Claude/Codex al editor Godot en vivo: scene building, scripts, signals, animations | 1.1k+ |
| godot_rl_agents | [edbeeching/godot_rl_agents](https://github.com/edbeeching/godot_rl_agents) | MIT | Wrappers para 4 frameworks RL: StableBaselines3, Sample Factory, Ray RLLib, CleanRL. Entrena agentes contra juegos Godot | 1.5k |

## NPC AI con LLMs

| Nombre | Repo | Licencia | Descripción | Stars |
|--------|------|----------|-------------|-------|
| Mantella | [art-from-the-machine/Mantella](https://github.com/art-from-the-machine/Mantella) | MIT | Mod Skyrim/Fallout 4: STT (Moonshine/Whisper) → LLMs → TTS (Piper/xVASynth/XTTS). Conversación natural con cualquier NPC. 100% local o cloud. | 4.5k+ |
| Interactive LLM NPCs | [AkshitIreddy/Interactive-LLM-Powered-NPCs](https://github.com/AkshitIreddy/Interactive-LLM-Powered-NPCs) | MIT | LLM-driven dialogue para Cyberpunk 2077, GTA 5, AC. Vector stores para memoria ilimitada de NPCs + pre-conversation.json por personaje | 716 |
| LLMUnity | [undreamai/LLMUnity](https://github.com/undreamai/LLMUnity) | Apache-2.0 | Personajes Unity con LLMs locales o cloud | 1.7k |
| UnrealGenAISupport | [prajwalshettydev/UnrealGenAISupport](https://github.com/prajwalshettydev/UnrealGenAISupport) | MIT | Plugin Unreal Engine para LLM/GenAI + MCP server UE5. Soporta GPT, Gemini, Claude | 619 |
| npcpy | [NPC-Worldwide/npcpy](https://github.com/NPC-Worldwide/npcpy) | MIT | Librería Python para NPC con LLMs multimodales | 1.4k |

## Evaluación y benchmarking de agentes en juegos

| Nombre | Repo | Licencia | Descripción | Stars |
|--------|------|----------|-------------|-------|
| Orak | [krafton-ai/Orak](https://github.com/krafton-ai/Orak) | MIT | **arXiv:2506.03610 (jun 2026). Por KRAFTON (creadores de PUBG).** 12 juegos de todos los géneros principales: Street Fighter III, Super Mario, Pokémon Red, Darkest Dungeon, Minecraft, Stardew Valley, StarCraft II, Slay the Spire, Baba Is You + más. Interfaz plug-and-play **vía MCP**. Incluye **dataset de fine-tuning** con trayectorias de gameplay expertas. Live leaderboard en krafton-ai.github.io/orak-leaderboard/. | 148 |
| GamingAgent | [lmgame-org/GamingAgent](https://github.com/lmgame-org/GamingAgent) | MIT | **ICLR 2026.** LLM/VLM gaming agents: evaluación de modelos en 7 juegos (Sokoban, Tetris, 2048, Candy Crush, Pokémon Red, Super Mario Bros, Ace Attorney). lmgame-Bench + computer-use agents. | 947 |
| GameDevBench | [waynchi/gamedevbench](https://github.com/waynchi/gamedevbench) | MIT | **arXiv:2602.11103 (feb 2026).** 132 tareas de game development en Godot: 3D/2D Graphics, Gameplay, UI. Mejor agente resuelve 53.8%. Primer benchmark agentico para desarrollo de juegos. | — |
| OmniGameArena | [mxlin043/OmniGameArena](https://github.com/mxlin043/OmniGameArena) | MIT | **arXiv:2606.09826 (jun 2026).** 12 juegos en Unreal Engine 5 (7 Solo, 3 PvP, 2 Coop). Improvement Dynamics Curve (IDC): reflexión agentica iterativa para mejorar skills. Evalúa Claude, GPT, Gemini, Qwen y NitroGen (fundation model: 40k h / 1k+ juegos). | — |
| AgentBench | [THUDM/AgentBench](https://github.com/THUDM/AgentBench) | MIT | **ICLR 2024.** Eval de LLMs como agentes en 8 entornos (OS, DB, juego de cartas, web shopping, etc.). Referencia de la industria para eval agentica general. | 3.1k |

## Pathfinding y AI de movimiento

| Nombre | Repo | Licencia | Descripción | Stars |
|--------|------|----------|-------------|-------|
| recastnavigation | [recastnavigation/recastnavigation](https://github.com/recastnavigation/recastnavigation) | Zlib | Estándar de la industria para navigation mesh (navmesh). Usado en Unity, Godot, UE. C++ | 7.8k |
| yuka | [Mugen87/yuka](https://github.com/Mugen87/yuka) | MIT | Game AI primitives en JavaScript: steering behaviors, pathfinding, FSM | 1.4k |
| aitoolkit | [linkdd/aitoolkit](https://github.com/linkdd/aitoolkit) | MIT | Da un cerebro a los NPCs de tu juego (header-only C++) | 524 |

## Generación procedural

| Nombre | Repo | Licencia | Descripción | Stars |
|--------|------|----------|-------------|-------|
| WorldX | [YGYOOO/WorldX](https://github.com/YGYOOO/WorldX) | MIT | Generación procedural de mundos con AI (TypeScript) | 1.1k |
| gym-pcgrl | [amidos2006/gym-pcgrl](https://github.com/amidos2006/gym-pcgrl) | MIT | OpenAI Gym para Procedural Content Generation via Reinforcement Learning | 700+ |

## AI Game Studio Orchestration

| Nombre | Repo | Licencia | Descripción | Stars |
|--------|------|----------|-------------|-------|
| Claude Code Game Studios | [Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) | MIT | 49 AI agents + 72 workflow skills con coordinación completa que espeja la jerarquía de un estudio real. Incluye roles de Director, Lead Dev, Art Director, QA Lead y más. Basado en Claude Code. | ~150 |
| GameStudio Subagents | [pamirtuna/gamestudio-subagents](https://github.com/pamirtuna/gamestudio-subagents) | MIT | Equipo AI en terminal: Producer, Market Analyst, Dev, QA, Artist, Game Designer. Master Orchestrator coordina. Multi-engine: Godot / Unity / Unreal. | ~80 |
| Game Studio Simulator | [mxcl/game-studio-simulator](https://github.com/mxcl/game-studio-simulator) | MIT | You have the game idea. We have the agents. Simula pipeline completo de desarrollo de juego con agentes especializados. | ~50 |
| OpenGame | [leigest519/OpenGame](https://github.com/leigest519/OpenGame) | MIT | **arXiv:2604.18394 (abr 2026).** Framework agentico OSS end-to-end para generar juegos web desde texto. GameCoder-27B (Qwen3.5-27B + SFT en trajectories de game dev). Game Skill library: Template Skill (biblioteca de project skeletons) + Debug Skill (protocolo de fixes verificados). OpenGame-Bench: Build Health + Visual Usability + Intent Alignment via headless browser + VLM judging. SOTA en 150 game prompts. | ~600 |

## ⚠️ Licencias a tener en cuenta

| Nombre | Licencia | Restricción |
|--------|----------|-------------|
| NobodyWho | EUPL-1.2 | **Copyleft** — requiere que derivados sean open source. No usar en soluciones propietarias. |

---
*Verificado con deep-research: 3-0 votes en claims principales. Fuentes directas de GitHub API. 2026-07-09*
