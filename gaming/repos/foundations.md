# 🏗️ Repos fundacionales — Gaming

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-02 | Verificado con deep-research

## Game Engines

| Repo | Licencia | Descripción | Stars |
|------|----------|-------------|-------|
| [godotengine/godot](https://github.com/godotengine/godot) | MIT | Motor completo 2D/3D. Ecosistema AI más rico: LimboAI, Beehave, godot_rl_agents, godot-ai | 97k |
| [o3de/o3de](https://github.com/o3de/o3de) | Apache-2.0 | Open 3D Engine (ex-Amazon Lumberyard). AAA-grade. Opción enterprise | 7.8k |
| [MonoGame/MonoGame](https://github.com/MonoGame/MonoGame) | MIT | Framework C# cross-platform. Para devs .NET añadiendo AI | 11k |
| [love2d/love](https://github.com/love2d/love) | ZLIB | LÖVE 2D — Lua, ligero, ideal para prototipos rápidos con AI | 4.5k |

## Multiplayer Backends

| Repo | Licencia | Descripción | Stars |
|------|----------|-------------|-------|
| [heroiclabs/nakama](https://github.com/heroiclabs/nakama) | Apache-2.0 | Backend más completo open source. SDK oficial Godot. Extensible en Lua/TS/Go. Social, matchmaking, leaderboards | 12.8k |
| [googleforgames/open-match](https://github.com/googleforgames/open-match) | Apache-2.0 | Framework matchmaking de Google. Plug-in para algoritmos custom con AI | — |
| [colyseus/colyseus](https://github.com/colyseus/colyseus) | MIT | Server multijugador en Node.js/TypeScript. Ideal para web games + AI | 6.2k |

## Pathfinding

| Repo | Licencia | Descripción | Stars |
|------|----------|-------------|-------|
| [recastnavigation/recastnavigation](https://github.com/recastnavigation/recastnavigation) | Zlib | Estándar de industria navmesh. Ya en Godot, Unity, UE. Combinable con RL agents | 7.8k |
| [Mugen87/yuka](https://github.com/Mugen87/yuka) | MIT | Game AI primitives JS: steering behaviors, pathfinding, FSM | 1.4k |

## Analytics y Observability

| Repo | Licencia | Descripción | Stars |
|------|----------|-------------|-------|
| [grafana/grafana](https://github.com/grafana/grafana) | Apache-2.0 | Dashboards player analytics en tiempo real | 67k |
| [PostHog/posthog](https://github.com/PostHog/posthog) | MIT | Product analytics self-hosted. Player behavior analysis | 23k |

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*

## World Models (motores neurales)

| Repo | Licencia | Descripción | Stars |
|------|----------|-------------|-------|
| [eloialonso/diamond](https://github.com/eloialonso/diamond) | MIT | DIAMOND: agente RL en world model difusivo. NeurIPS 2024 Spotlight. Atari 100k SOTA para world model agents (1.46 HNS). También funciona como motor neural interactivo (CS:GO demo). | ~2k |
| [etched-ai/open-oasis](https://github.com/etched-ai/open-oasis) | MIT | Oasis 500M: inference code + weights. Primer mundo Minecraft-like playable generado frame-a-frame por transformer difusivo. Decart + Etched, oct 2024. | ~14k |
| [dweam-team/awesome-world-model-games](https://github.com/dweam-team/awesome-world-model-games) | MIT | Lista curada de todos los juegos world-model y dónde encontrarlos. Referencia del ecosistema emergente. | — |
| [liujiuming123/Awesome-Interactive-World-Model](https://github.com/liujiuming123/Awesome-Interactive-World-Model) | — | Survey comprensivo de modelos de mundo interactivos. Para entender el estado del arte académico. | — |

**Cuándo usar world models**:
- Entrenamiento RL más barato (sin ejecutar el motor completo).
- Exploración de variaciones de juego antes de codificarlas.
- Prototipado ultra-rápido: el modelo genera el juego, no el desarrollador.
- **Limitación actual**: inconsistencia temporal (objetos que aparecen/desaparecen). No production-ready para juegos publicados.

---
*Actualizado 2026-07-06. URLs verificados en GitHub.*
