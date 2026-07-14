# 🏗️ Repos fundacionales — Gaming

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-14 | v8 — GRL y GamingAgent añadidos como fundacionales para LLM gaming

## Game Engines

| Repo | Licencia | Descripción | Stars |
|------|----------|-------------|-------|
| [godotengine/godot](https://github.com/godotengine/godot) | MIT | Motor completo 2D/3D. Ecosistema AI más rico open source: LimboAI, Beehave, godot_rl_agents, godot-ai. Godot Foundation prohibió PRs con vibe-coding en core (1-jul-2026), plugins sin restricción. | 112k |
| [carbonengine](https://github.com/carbonengine) | MIT | **Carbon Engine** — motor de EVE Online. Open-source desde 1 jul 2026. Trinity (gráficos), Destiny (física + pathfinding para batallas masivas), 24+ módulos. 23 años de battle-test. Ideal para juegos espaciales/simulación o reutilizar módulos aislados. | ★ nuevo |
| [cocos2d/cocos-engine](https://github.com/cocos2d/cocos-engine) | MIT | **COCOS 4** — engine AI-native, MIT desde ene 2026. Sin restricciones comerciales. Domina mobile gaming en Asia/LATAM. 500M+ players. JS/TS primario. Nuevas features como MCPs/Agents. PinK = IDE standalone. | — |
| [o3de/o3de](https://github.com/o3de/o3de) | Apache-2.0 | Open 3D Engine (ex-Amazon Lumberyard). AAA-grade. Opción enterprise. Sponsors: AWS, Epic, Intel, Microsoft. | 9.5k |
| [stride3d/stride](https://github.com/stride3d/stride) | MIT | Engine C# cross-platform (ex-Xenko). Alternativa a Unity para devs .NET. 7.7k stars. | 7.7k |
| [MonoGame/MonoGame](https://github.com/MonoGame/MonoGame) | MIT | Framework C# cross-platform. Para devs .NET añadiendo AI | 11k |
| [love2d/love](https://github.com/love2d/love) | ZLIB | LÖVE 2D — Lua, ligero, ideal para prototipos rápidos con AI | 4.5k |

## Multiplayer Backends

| Repo | Licencia | Descripción | Stars |
|------|----------|-------------|-------|
| [heroiclabs/nakama](https://github.com/heroiclabs/nakama) | Apache-2.0 | Backend más completo open source. SDK oficial Godot, Unreal, Unity. Extensible en Lua/TS/Go. Social, matchmaking, leaderboards. 500k devs, 1B+ players. | 12.8k |
| [googleforgames/open-match](https://github.com/googleforgames/open-match) | Apache-2.0 | Framework matchmaking de Google. Plug-in para algoritmos custom con AI. | — |
| [colyseus/colyseus](https://github.com/colyseus/colyseus) | MIT | Server multijugador en Node.js/TypeScript. Ideal para web games + AI | 6.2k |
| [supabase/supabase](https://github.com/supabase/supabase) | Apache-2.0 | BaaS PostgreSQL. Para juegos asíncronos: profiles, inventarios, leaderboards. pgvector para RAG in-game. Alternativa OSS a Firebase. | 80k+ |

## AI para NPCs y Agentes

| Repo | Licencia | Descripción | Stars |
|------|----------|-------------|-------|
| [Unity-Technologies/ml-agents](https://github.com/Unity-Technologies/ml-agents) | Apache-2.0 | Unity ML-Agents: entornos para entrenar agentes con deep RL e imitation learning. 17k+ stars. | 17k |
| [edbeeching/godot_rl_agents](https://github.com/edbeeching/godot_rl_agents) | MIT | RL sobre Godot: wrappers para SB3, Sample Factory, Ray RLLib, CleanRL | 950+ |
| [DLR-RM/stable-baselines3](https://github.com/DLR-RM/stable-baselines3) | MIT | PPO, SAC, A2C, DQN en PyTorch. Estándar para entrenar agentes RL gaming | 14k |
| [Farama-Foundation/Gymnasium](https://github.com/Farama-Foundation/Gymnasium) | MIT | API estándar para entornos RL. Sucesor de OpenAI Gym | 12.5k |
| [joonspk-research/generative_agents](https://github.com/joonspk-research/generative_agents) | Apache-2.0 | Arquitectura Stanford para NPCs con memoria, reflexión y planificación (21.7k stars) | 21.7k |
| [google-deepmind/concordia](https://github.com/google-deepmind/concordia) | Apache-2.0 | Simulación social multiagente de DeepMind. Para worlds persistentes y poblaciones de NPCs. | 1.5k |

## LLM Gaming Agents — Evaluation & Training (nuevo v8)

| Repo | Licencia | Descripción | Stars |
|------|----------|-------------|-------|
| [lmgame-org/GamingAgent](https://github.com/lmgame-org/GamingAgent) | MIT | **ICLR 2026** benchmark y deployment de LLM/VLM gaming agents. lmgame-Bench: 6 juegos, API Gym, 13 modelos SOTA evaluados. CUA mode para gaming sin acceso a API del engine. arXiv:2505.15146 | — |
| [lmgame-org/GRL](https://github.com/lmgame-org/GRL) | MIT | Multi-Turn RL Training System con AgentTrainer para LLM game RL. Fine-tuning de LLMs en entornos de juego directamente. Del equipo GamingAgent ICLR 2026. | — |
| [wuxiyang1996/cos-play](https://github.com/wuxiyang1996/cos-play) | MIT | COS-PLAY: Co-Evolving LLM Decision y Skill Bank Agents para long-horizon game play. | — |

## Pathfinding

| Repo | Licencia | Descripción | Stars |
|------|----------|-------------|-------|
| [recastnavigation/recastnavigation](https://github.com/recastnavigation/recastnavigation) | Zlib | Estándar de industria navmesh. Ya en Godot, Unity, UE. Combinable con RL agents | 8.0k |
| [Mugen87/yuka](https://github.com/Mugen87/yuka) | MIT | Game AI primitives JS: steering behaviors, pathfinding, FSM | 1.4k |

## Analytics y Observability

| Repo | Licencia | Descripción | Stars |
|------|----------|-------------|-------|
| [grafana/grafana](https://github.com/grafana/grafana) | Apache-2.0 | Dashboards player analytics en tiempo real | 67k |
| [PostHog/posthog](https://github.com/PostHog/posthog) | MIT | Product analytics self-hosted. Player behavior analysis, session recordings, feature flags | 25k |

---

## Motores open source adicionales en radar

| Repo | Licencia | Descripción |
|------|----------|-------------|
| [defold/defold](https://github.com/defold/defold) | Developer grant | Motor 2D ligero (Defold Foundation). Lua scripting. Usado en juegos mobile LATAM. |
| [minetest/minetest](https://github.com/minetest/minetest) | LGPL-2.1 | Luanti: mundo voxel completo. Base para PCG + NPCs agenticos. |

---
*v8 actualizado 2026-07-14. GamingAgent (ICLR 2026, MIT), GRL (multi-turn RL para LLM gaming, MIT) y COS-PLAY (co-evolving agents, MIT) añadidos como repos fundacionales para LLM gaming agent development.*
