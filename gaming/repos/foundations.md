# 🏗️ Repos fundacionales — Gaming

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-10 (v8) | Verificado con deep-research (v8 — NitroGen añadido)
> ⚠️ NOTA (jul 2026): Godot Foundation **prohíbe contribuciones de código AI** desde 1-jul-2026. El engine Godot sigue MIT — solo cambian las reglas de PR para el engine core. Los plugins/extensiones en repos externos no tienen esta restricción.

## Game Engines (Open Source)

| Repo | Licencia | Descripción | Stars |
|------|----------|-------------|-------|
| [godotengine/godot](https://github.com/godotengine/godot) | MIT | Motor completo 2D/3D. Ecosistema AI más rico open source: LimboAI, Beehave, godot_rl_agents, godot-ai, GameDevBench (Godot-based). Juegos en Steam: 2,864 (doblado en 2025-2026). | 112k+ |
| [o3de/o3de](https://github.com/o3de/o3de) | Apache-2.0 | Open 3D Engine (ex-Amazon Lumberyard). AAA-grade. Linux Foundation. Sponsors: AWS, Epic, Intel. Integrable con AWS Bedrock/GameLift. | 9.5k |
| [MonoGame/MonoGame](https://github.com/MonoGame/MonoGame) | MIT | Framework C# cross-platform. Para devs .NET añadiendo AI | 11k |
| [love2d/love](https://github.com/love2d/love) | ZLIB | LÖVE 2D — Lua, ligero, ideal para prototipos rápidos con AI | 4.5k |
| [cocos2d-x/cocos2d-x](https://github.com/cocos2d-x/cocos2d-x) | MIT | Cocos2d-x / Cocos Creator 3.x — engine mobile AI-native (COCOS 4, ene 2026). Dominante en mobile gaming APAC + LATAM. | 18k |

## AAA Engine — Nuevo en 2026

| Repo | Licencia | Descripción | Stars |
|------|----------|-------------|-------|
| [orgs/carbonengine](https://github.com/orgs/carbonengine) | MIT* | **Carbon Engine** — el engine de EVE Online (Fenris Creations/CCP Games), open-sourced el 1 jul 2026. Componentes: **Trinity** (motor gráfico AAA para mundos espaciales) + **Destiny** (física, colisiones, pathfinding para MMO masivos). *Excepción: audio espacial Apache-2.0, IO Python SF License. Primer engine AAA de MMO single-shard open source. | Nuevo |

## Multiplayer Backends

| Repo | Licencia | Descripción | Stars |
|------|----------|-------------|-------|
| [heroiclabs/nakama](https://github.com/heroiclabs/nakama) | Apache-2.0 | Backend más completo open source. SDK oficial Godot. Extensible en Lua/TS/Go. Social, matchmaking, leaderboards. 500k devs, 1B+ jugadores en prod. | 12.8k |
| [googleforgames/open-match](https://github.com/googleforgames/open-match) | Apache-2.0 | Framework matchmaking de Google. Plug-in para algoritmos custom con AI | — |
| [colyseus/colyseus](https://github.com/colyseus/colyseus) | MIT | Server multijugador en Node.js/TypeScript. Ideal para web games + AI | 6.2k |

## Pathfinding

| Repo | Licencia | Descripción | Stars |
|------|----------|-------------|-------|
| [recastnavigation/recastnavigation](https://github.com/recastnavigation/recastnavigation) | Zlib | Estándar de industria navmesh. Ya en Godot, Unity, UE. Combinable con RL agents | 7.8k |
| [Mugen87/yuka](https://github.com/Mugen87/yuka) | MIT | Game AI primitives JS: steering behaviors, pathfinding, FSM | 1.4k |

## RL y ML para games

| Repo | Licencia | Descripción | Stars |
|------|----------|-------------|-------|
| [unity-technologies/ml-agents](https://github.com/Unity-Technologies/ml-agents) | Apache-2.0 | Unity ML-Agents Toolkit. RL e imitation learning para Unity. Estándar de la industria para NPCs adaptativos y testing con RL. | 19.5k |
| [DLR-RM/stable-baselines3](https://github.com/DLR-RM/stable-baselines3) | MIT | Implementaciones limpias de algoritmos RL (PPO, SAC, A2C, DQN) en PyTorch. Base para todos los proyectos RL de gaming. | 13.5k |
| [Farama-Foundation/Gymnasium](https://github.com/Farama-Foundation/Gymnasium) | MIT | Sucesor de OpenAI Gym. API estándar para entornos RL. Usado por godot_rl_agents y gym-pcgrl. | 12.1k |

## Analytics y Observability

| Repo | Licencia | Descripción | Stars |
|------|----------|-------------|-------|
| [grafana/grafana](https://github.com/grafana/grafana) | Apache-2.0 | Dashboards player analytics en tiempo real | 67k |
| [PostHog/posthog](https://github.com/PostHog/posthog) | MIT | Product analytics self-hosted. Player behavior analysis | 23k |

## LLM Game Agent Evaluation & Training

| Repo | Licencia | Descripción | Stars |
|------|----------|-------------|-------|
| [MineDojo/NitroGen](https://github.com/MineDojo/NitroGen) | MIT | **arXiv:2601.02427 (ene 2026). NVIDIA + Stanford + Caltech + UChicago + UT Austin.** Primer foundation model open source listo-para-usar para game agents. 493M params (SigLip2 + DiT). Entrenado en 40k h / 1k+ juegos. 52% mejora en unseen games. Pesos en HuggingFace (nvidia/NitroGen). Base para fine-tuning con Orak dataset. | ~400 |
| [krafton-ai/Orak](https://github.com/krafton-ai/Orak) | MIT | **arXiv:2506.03610 (jun 2026). Por KRAFTON (PUBG).** Benchmark MCP-nativo para training + evaluación de LLM agents en 12 juegos de todos los géneros. Dataset de fine-tuning con trayectorias expertas. Live leaderboard. Úsalo con NitroGen para pipeline completo train→eval. | 148+ |
| [lmgame-org/GamingAgent](https://github.com/lmgame-org/GamingAgent) | MIT | ICLR 2026. Eval de LLM/VLM en 7 juegos + leaderboard público. Framework extensible para custom games. Claude thinking-modes lidera en estrategia. | 947 |

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
*Verificado 2026-07-10. Carbon Engine añadido jul-2026. Orak (Krafton) añadido jul-2026.*
