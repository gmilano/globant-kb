# 🎮 Agentes AI — Gaming

> Agentes y herramientas AI open source verificados. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-06 | Segunda pasada — nuevas herramientas MCP multi-engine + openNPC

## Ecosistema Godot (MIT — recomendado como base)

| Nombre | Repo | Licencia | Descripción | Stars |
|--------|------|----------|-------------|-------|
| Beehave | [bitbrain/beehave](https://github.com/bitbrain/beehave) | MIT | Behavior trees componibles en el scene tree de Godot para NPC y boss AI | 3.2k |
| LimboAI | [limbonaut/limboai](https://github.com/limbonaut/limboai) | MIT | Plugin C++ para Godot: Behavior Trees + Hierarchical State Machines. BTState permite combinar ambos para IA reactiva | 2.8k |
| godot-ai | [hi-godot/godot-ai](https://github.com/hi-godot/godot-ai) | MIT | Servidor MCP con 120+ operaciones y ~41 herramientas. Conecta Claude/Codex al editor Godot en vivo: scene building, scripts, signals, animations | 805 |
| godot_rl_agents | [edbeeching/godot_rl_agents](https://github.com/edbeeching/godot_rl_agents) | MIT | Wrappers para 4 frameworks RL: StableBaselines3, Sample Factory, Ray RLLib, CleanRL. Entrena agentes contra juegos Godot | 900+ |

## NPC AI con LLMs

| Nombre | Repo | Licencia | Descripción | Stars |
|--------|------|----------|-------------|-------|
| Interactive LLM NPCs | [AkshitIreddy/Interactive-LLM-Powered-NPCs](https://github.com/AkshitIreddy/Interactive-LLM-Powered-NPCs) | MIT | LLM-driven dialogue para Cyberpunk 2077, GTA 5, AC. Vector stores para memoria ilimitada de NPCs + pre-conversation.json por personaje | 716 |
| LLMUnity | [undreamai/LLMUnity](https://github.com/undreamai/LLMUnity) | Apache-2.0 | Personajes Unity con LLMs locales o cloud | 1.7k |
| UnrealGenAISupport | [prajwalshettydev/UnrealGenAISupport](https://github.com/prajwalshettydev/UnrealGenAISupport) | MIT | Plugin Unreal Engine para LLM/GenAI + MCP server UE5. Soporta GPT, Gemini, Claude | 619 |
| npcpy | [NPC-Worldwide/npcpy](https://github.com/NPC-Worldwide/npcpy) | MIT | Librería Python para NPC con LLMs multimodales | 1.4k |

## Evaluación y Benchmarking de Agentes Jugadores (NUEVO — 2026)

| Nombre | Repo | Licencia | Descripción | Stars |
|--------|------|----------|-------------|-------|
| **GamingAgent** | [lmgame-org/GamingAgent](https://github.com/lmgame-org/GamingAgent) | MIT | **[ICLR 2026]** Framework para evaluar LLMs/VLMs jugando videojuegos reales. Soporta Tetris, Sokoban, 2048, Pokémon Red, Super Mario, Candy Crush, Ace Attorney. Compatible con OpenAI, Anthropic, Gemini, DeepSeek, Qwen | 947 |

## Reinforcement Learning para Juegos

| Nombre | Repo | Licencia | Descripción | Stars |
|--------|------|----------|-------------|-------|
| Unity ML-Agents | [Unity-Technologies/ml-agents](https://github.com/Unity-Technologies/ml-agents) | Apache-2.0 | Toolkit de Unity para entrenar agentes con DRL e imitation learning. 17+ entornos de ejemplo. PyTorch backend | 19.5k |
| OpenSpiel | [google-deepmind/open_spiel](https://github.com/google-deepmind/open_spiel) | Apache-2.0 | Framework DeepMind para investigación en RL y teoría de juegos. 70+ juegos soportados (C++ + Python) | 5.3k |
| RLCard | [datamllab/rlcard](https://github.com/datamllab/rlcard) | MIT | Toolkit RL para juegos de cartas: Blackjack, Texas Hold'em, DouDizhu, Mahjong, UNO | 3.5k |
| DouZero | [kwai/DouZero](https://github.com/kwai/DouZero) | Apache-2.0 | Mastering DouDizhu card game con self-play deep RL. ICML 2021. Kwai/TikTok | 4.6k |

## Pathfinding y AI de movimiento

| Nombre | Repo | Licencia | Descripción | Stars |
|--------|------|----------|-------------|-------|
| recastnavigation | [recastnavigation/recastnavigation](https://github.com/recastnavigation/recastnavigation) | Zlib | Estándar de la industria para navigation mesh (navmesh). Usado en Unity, Godot, UE. C++ | 7.8k |
| yuka | [Mugen87/yuka](https://github.com/Mugen87/yuka) | MIT | Game AI primitives en JavaScript: steering behaviors, pathfinding, FSM | 1.4k |
| aitoolkit | [linkdd/aitoolkit](https://github.com/linkdd/aitoolkit) | MIT | Da un cerebro a los NPCs de tu juego (header-only C++) | 524 |
| behaviac | [Tencent/behaviac](https://github.com/Tencent/behaviac) | Apache-2.0 | Framework behavior tree + FSM + HTN de Tencent. Usado en producción en juegos AAA chinos | 3k |

## Generación procedural y assets

| Nombre | Repo | Licencia | Descripción | Stars |
|--------|------|----------|-------------|-------|
| WorldX | [YGYOOO/WorldX](https://github.com/YGYOOO/WorldX) | MIT | Generación procedural de mundos con AI (TypeScript) | 1.1k |
| generative_agents | [joonspk-research/generative_agents](https://github.com/joonspk-research/generative_agents) | Apache-2.0 | Agentes con memoria, reflexión y planificación (Stanford). Arquitectura estándar para NPCs con personalidad | 21.7k |
| concordia | [google-deepmind/concordia](https://github.com/google-deepmind/concordia) | Apache-2.0 | Simulación social de agentes (DeepMind). Para mundos persistentes con personajes que evolucionan | 1.5k |

## AI Dev Tooling — MCP multi-engine (NUEVO — Jul 2026)

El ecosistema MCP de IvanMurzak cubre los tres motores principales con una infraestructura compartida:

| Nombre | Repo | Licencia | Descripción | Stars |
|--------|------|----------|-------------|-------|
| **Unity-MCP** | [IvanMurzak/Unity-MCP](https://github.com/IvanMurzak/Unity-MCP) | Apache-2.0 | AI Skills + MCP Tools + CLI para Unity Engine. 52 Tools, 48 Prompts. Cubre Assets, GameObject, Scene, Script, Package, Tests, Console, Screenshot. Funciona con Claude Code, Gemini, Copilot, Cursor gratis. | ~3k |
| **Unreal-MCP** | [IvanMurzak/Unreal-MCP](https://github.com/IvanMurzak/Unreal-MCP) | Apache-2.0 | Plugin C++ para Unreal Engine 5.7 + .NET bridge. 62 tools en 8 familias: actors, Blueprints, assets, C++ source, project management. | Activo |
| **GameDev-MCP-Server** | [IvanMurzak/GameDev-MCP-Server](https://github.com/IvanMurzak/GameDev-MCP-Server) | MIT | Servidor MCP engine-agnostic compartido por Unity-MCP, Godot-MCP y Unreal-MCP. Bridge via SignalR hacia ai-game.dev o self-hosted. | — |

> **Patrón emergente**: los tres engines principales (Unity, Unreal, Godot) ahora tienen MCP servers maduros. Los estudios que usan varios engines pueden usar **GameDev-MCP-Server** como punto de control unificado.

## NPC Frameworks Python (NUEVO — Jul 2026)

| Nombre | Repo | Licencia | Descripción | Stars |
|--------|------|----------|-------------|-------|
| **openNPC** | [balaraj74/openNPC](https://github.com/balaraj74/openNPC) | MIT | Framework open-source para NPCs autónomos. Pipeline unificado: villagers heurísticos, NPCs basados en LLM, y bosses entrenados con RL. Percepción del mundo, formación de objetivos, memoria de interacciones, decisiones context-aware — sin LLM en runtime si no se necesita. | Activo |

## ⚠️ Licencias a tener en cuenta

| Nombre | Licencia | Restricción |
|--------|----------|-------------|
| NobodyWho | EUPL-1.2 | **Copyleft** — requiere que derivados sean open source. No usar en soluciones propietarias. |
| 0 A.D. | GPL-2.0 | **Copyleft** — código del juego completo GPL. Solo para forking OSS. |

---
*Actualizado 2026-07-06 (segunda pasada). Unity-MCP (Apache-2.0, ~3k stars), Unreal-MCP, GameDev-MCP-Server y openNPC añadidos.*
