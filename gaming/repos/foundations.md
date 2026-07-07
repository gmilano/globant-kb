# 🏗️ Repos fundacionales — Gaming

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-07 | v2

## Game Engines

| Repo | Licencia | Descripción | Stars |
|------|----------|-------------|-------|
| [godotengine/godot](https://github.com/godotengine/godot) | MIT | Motor completo 2D/3D. Ecosistema AI más rico: LimboAI, Beehave, godot_rl_agents, godot-ai. NVIDIA fork con path tracing (GDC 2026). | 112k+ |
| [o3de/o3de](https://github.com/o3de/o3de) | Apache-2.0 | Open 3D Engine (ex-Amazon Lumberyard). AAA-grade. Sponsors: AWS, Epic, Intel, Microsoft. Opción enterprise. | 9.5k |
| [MonoGame/MonoGame](https://github.com/MonoGame/MonoGame) | MIT | Framework C# cross-platform. Para devs .NET añadiendo AI sin royalties de Unity. | 11k |
| [cocos/cocos-engine](https://github.com/cocos/cocos-engine) | MIT | COCOS 4 pasó a MIT en enero 2026 con restricciones comerciales eliminadas. AI-native: código abierto permite a AI tools razonar mejor sobre el engine. Dominante en mobile gaming China → LATAM. | ~18k |
| [stride3d/stride](https://github.com/stride3d/stride) | MIT | Engine C# cross-platform (ex-Xenko de Silicon Studio). Alternativa a Unity para devs .NET sin drama de pricing. Maduro. | 7.7k |
| [love2d/love](https://github.com/love2d/love) | ZLIB | LÖVE 2D — Lua, ligero, ideal para prototipos rápidos con AI | 4.5k |

## Multiplayer Backends

| Repo | Licencia | Descripción | Stars |
|------|----------|-------------|-------|
| [heroiclabs/nakama](https://github.com/heroiclabs/nakama) | Apache-2.0 | Backend más completo open source. SDK oficial Godot/Unity/Unreal. Extensible en Lua/TS/Go. Social, matchmaking, leaderboards. 500k devs, 1B+ players. | 12.8k |
| [googleforgames/open-match](https://github.com/googleforgames/open-match) | Apache-2.0 | Framework matchmaking de Google. Plug-in para algoritmos custom con AI. Orquesta lógica de matching via gRPC. | — |
| [colyseus/colyseus](https://github.com/colyseus/colyseus) | MIT | Server multijugador en Node.js/TypeScript. Ideal para web games + AI. Autoridad server-side. | 6.2k |
| [supabase/supabase](https://github.com/supabase/supabase) | Apache-2.0 | BaaS (Backend as a Service). PostgreSQL + auth + storage + pgvector. Alternativa moderna a Firebase para juegos asíncronos. pgvector habilita RAG sin ChromaDB. | 80k |

## RL para Games (Research + Production)

| Repo | Licencia | Descripción | Stars |
|------|----------|-------------|-------|
| [google-deepmind/open_spiel](https://github.com/google-deepmind/open_spiel) | Apache-2.0 | Colección de 60+ entornos de juego + algoritmos RL para investigación. Chess, Go, Poker, Hex, Hanabi. C++/Python. Estándar académico. | 4.8k |
| [Farama-Foundation/Gymnasium](https://github.com/Farama-Foundation/Gymnasium) | MIT | API estándar para entornos RL (sucesor de OpenAI Gym). Base de interoperabilidad para todos los frameworks RL. | 12.1k |
| [DLR-RM/stable-baselines3](https://github.com/DLR-RM/stable-baselines3) | MIT | Algoritmos RL en PyTorch: PPO, SAC, A2C, DQN, TD3, HER. El más usado en proyectos gaming RL. | 13.5k |

## Pathfinding

| Repo | Licencia | Descripción | Stars |
|------|----------|-------------|-------|
| [recastnavigation/recastnavigation](https://github.com/recastnavigation/recastnavigation) | Zlib | Estándar de industria navmesh. Ya en Godot, Unity, UE. Combinable con RL agents para navegación híbrida. | 7.8k |
| [Mugen87/yuka](https://github.com/Mugen87/yuka) | MIT | Game AI primitives JS: steering behaviors, pathfinding, FSM | 1.4k |

## Analytics y Observability

| Repo | Licencia | Descripción | Stars |
|------|----------|-------------|-------|
| [grafana/grafana](https://github.com/grafana/grafana) | Apache-2.0 | Dashboards player analytics en tiempo real | 67k |
| [PostHog/posthog](https://github.com/PostHog/posthog) | MIT | Product analytics self-hosted. Player behavior analysis, churn prediction pipelines. | 23k |

---
*v2 (2026-07-07): añadido COCOS 4 (MIT desde ene 2026), Stride, OpenSpiel, Supabase. Verificado GitHub.*
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
