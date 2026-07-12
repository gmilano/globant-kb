# Verticales de partida — Gaming AI

> Plataformas verticales open source customizables con AI.
> Modelo: partir de algo funcional y robusto, añadir capa agentica encima.
> Última actualización: 2026-07-12

## Stack recomendado: Godot + Nakama

La combinación más potente disponible en open source hoy para juegos online:

```
Godot 4.4 (MIT) — motor del juego
    + LimboAI / Beehave — NPC behavior trees
    + godot_rl_agents — entrenamiento RL de agentes
    + godot-ai — MCP server para AI-assisted dev
    ↕ nakama-godot SDK (Apache-2.0)
Nakama (Apache-2.0) — backend multiplayer
    + TypeScript/Go hooks — lógica server-side con AI
    + Open Match (Apache-2.0) — matchmaking enchufable
    + PostHog (MIT) — analytics de jugador
```

## Stack alternativo MMO: Carbon Engine

Para proyectos MMO enterprise (julio 2026):

```
Carbon Engine (MIT) — framework MMO probado en producción (EVE Online)
    + Destiny module — física + pathfinding server-authoritative
    + Trinity module — rendering
    + AI capa propia — LLMs para NPCs + RL para comportamiento de facciones
    ↕ Nakama o backend propio
```

---

## Plataformas base completas

| Plataforma | Licencia | URL | Stars | Stack | Caso de uso |
|------------|----------|-----|-------|-------|-------------|
| **Godot Engine** | MIT | [godotengine/godot](https://github.com/godotengine/godot) | 112k | C++/GDScript/C# | Engine 2D/3D completo. Godot 4.4 powers ~12% de Steam releases. Ecosistema AI más rico open source. |
| **Carbon Engine** | MIT / Apache-2.0 | [carbonengine](https://github.com/carbonengine) | nuevo | C++ | **NUEVO Jul 2026**: Engine de EVE Online. 20+ módulos AAA. Destiny (física), Trinity (gráficos). Base para MMOs. |
| **Open 3D Engine** | Apache-2.0 | [o3de/o3de](https://github.com/o3de/o3de) | 9.5k | C++ | Engine AAA. Sponsors AWS/Epic/Intel. Para proyectos enterprise con AWS Bedrock. |
| **Nakama** | Apache-2.0 | [heroiclabs/nakama](https://github.com/heroiclabs/nakama) | 12.8k | Go + SDKs | Backend de juego completo. Matchmaking, leaderboards, chat, social. 500k devs. |
| **Colyseus** | MIT | [colyseus/colyseus](https://github.com/colyseus/colyseus) | 6.2k | Node.js/TypeScript | Servidor multiplayer web. Ideal para browser games y webapps. |
| **MonoGame** | MIT | [MonoGame/MonoGame](https://github.com/MonoGame/MonoGame) | 11k | C# | Framework C# cross-platform. Para devs .NET que quieren añadir AI. |
| **Supabase** | Apache-2.0 | [supabase/supabase](https://github.com/supabase/supabase) | 80k | PostgreSQL + APIs | BaaS para juegos asíncronos: profiles, inventarios, leaderboards, UGC. pgvector para RAG. |
| **GDevelop** | MIT | [4ian/GDevelop](https://github.com/4ian/GDevelop) | 12k | JS/C++ | No-code 2D engine con AI generativa integrada. Ideal para prototipos rápidos AI-first. |
| **Bevy** | MIT | [bevyengine/bevy](https://github.com/bevyengine/bevy) | 38k | Rust | ECS engine v0.16 (2026). Para proyectos Rust-native con AI moderno. |

---

## Juegos open source para fork + AI

Proyectos completos que pueden usarse como base con fork:

| Juego | Licencia | Repo | Stars | Por qué útil |
|-------|----------|------|-------|--------------|
| **Luanti (Minetest)** | LGPL-2.1 | [minetest/minetest](https://github.com/minetest/minetest) | 10.5k | Voxel world completo. Base ideal para añadir PCG con AI y NPCs agenticos. |
| **0 A.D.** | GPL-2.0 | [0ad/0ad](https://github.com/0ad/0ad) | 2.5k | RTS completo. AI de unidades mejorable con ML. |
| **SuperTuxKart** | GPL-3.0 | [supertuxkart/stk-code](https://github.com/supertuxkart/stk-code) | 5k | Juego de carreras completo. AI de oponentes mejorable con RL. |

---

## Cómo customizar cada plataforma con AI

### Godot (recomendado — ecosistema AI más rico)

**Paso 1 — Dev tooling**: Instalar [godot-ai](https://github.com/hi-godot/godot-ai) (MIT) para conectar Claude Code o Cursor al editor via MCP. 120+ operaciones disponibles.

**Paso 2 — NPC AI**: Añadir [LimboAI](https://github.com/limbonaut/limboai) (MIT) para behavior trees + [Beehave](https://github.com/bitbrain/beehave) (MIT) para comportamiento reactivo. Conectar vía BTAction HTTP al LLM.

**Paso 3 — RL**: Instalar [godot_rl_agents](https://github.com/edbeeching/godot_rl_agents) (MIT) + Stable-Baselines3 para entrenar agentes de QA, oponentes adaptativos o pathfinding.

**Paso 4 — Backend**: Conectar Nakama (Apache-2.0) vía SDK oficial. Añadir hooks TypeScript/Go para AI server-side.

**Paso 5 — Analytics**: PostHog (MIT) para player events. Grafana (Apache-2.0) para dashboards. PyTorch Geometric para churn prediction con GNNs.

### Carbon Engine (nuevo Jul 2026 — para MMOs AAA)

**Paso 1**: Clonar módulos del engine desde [carbonengine org](https://github.com/carbonengine). Evaluar Destiny (física/pathfinding) + Trinity (gráficos).

**Paso 2**: Integrar capa AI para NPCs (LLM + vector store), comportamiento de facciones (RL), y procedural content.

**Paso 3**: Backend propio o Nakama para persistencia y matchmaking.

**Nota**: Engine nuevo en OSS — comunidad en formación. Considerar para proyectos con 12+ meses de tiempo.

### Open 3D Engine (O3DE — para enterprise + AWS)

Integrar **AWS Bedrock** para LLMs via [aws-sdk-cpp](https://github.com/aws/aws-sdk-cpp) (Apache-2.0).
Usar **Amazon GameLift** para multiplayer managed + **Amazon IVS** para streaming in-game.
O3DE tiene arquitectura de componentes extensible para añadir AI modules como entidades ECS.

---
*Fuentes: youngju.dev/blog/2026-05-16, gamingonlinux.com, gdconf.com/GDC-2026-SOTI, GitHub (verificado 2026-07-12)*
