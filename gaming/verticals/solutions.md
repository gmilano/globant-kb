# Verticales de partida — Gaming AI

> Plataformas verticales open source customizables con AI.
> Modelo: partir de algo funcional y robusto, añadir capa agentica encima.
> Última actualización: 2026-07-13 | v13 — Carbon Engine añadido como vertical MMO

## Stack recomendado: Godot + Nakama

La combinación más potente disponible en open source hoy para juegos online:

```
Godot (MIT) — motor del juego
    + LimboAI / Beehave — NPC behavior trees
    + godot_rl_agents — entrenamiento RL de agentes
    + godot-ai — MCP server para AI-assisted dev
    ↕ nakama-godot SDK (Apache-2.0)
Nakama (Apache-2.0) — backend multiplayer
    + TypeScript/Go hooks — lógica server-side con AI
    + Open Match (Apache-2.0) — matchmaking enchufable
    + PostHog (MIT) — analytics de jugador
```

---

## Plataformas base completas

| Plataforma | Licencia | URL | Stars | Stack | Caso de uso |
|------------|----------|-----|-------|-------|-------------|
| **Godot Engine** | MIT | [godotengine/godot](https://github.com/godotengine/godot) | 112k+ | C++/GDScript/C# | Engine 2D/3D completo. Base para integrar NPCs AI, PCG, diálogo. Ecosistema AI más rico open source. |
| **Carbon Engine** | MIT (core) | [Fenris-cs/carbon](https://github.com/Fenris-cs/carbon) | — | C++ (20+ módulos) | **Nuevo jul 2026.** Motor de EVE Online. Destiny (physics + navmesh MMO-scale) + Trinity (gráficos AAA). Único motor MIT con physics probada en MMO masivo (20 años). Ideal para MMOs y simulaciones a gran escala. |
| **Open 3D Engine** | Apache-2.0 | [o3de/o3de](https://github.com/o3de/o3de) | 9.5k | C++ | Engine AAA. Sponsors AWS/Epic/Intel. Para proyectos enterprise con AWS Bedrock. |
| **Nakama** | Apache-2.0 | [heroiclabs/nakama](https://github.com/heroiclabs/nakama) | 12.8k | Go + SDKs | Backend de juego completo. Matchmaking, leaderboards, chat, social. 500k devs. |
| **Colyseus** | MIT | [colyseus/colyseus](https://github.com/colyseus/colyseus) | 6.2k | Node.js/TypeScript | Servidor multiplayer web. Ideal para browser games y webapps. |
| **MonoGame** | MIT | [MonoGame/MonoGame](https://github.com/MonoGame/MonoGame) | 11k | C# | Framework C# cross-platform. Para devs .NET que quieren añadir AI. |
| **Stride** | MIT | [stride3d/stride](https://github.com/stride3d/stride) | 7.7k | C# | Engine 3D PBR completo. Alternativa Unity para devs .NET sin controversia de pricing. |
| **Supabase** | Apache-2.0 | [supabase/supabase](https://github.com/supabase/supabase) | 80k+ | PostgreSQL + APIs | BaaS para juegos asíncronos: profiles, inventarios, leaderboards, UGC. pgvector para RAG. |

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

### Godot + AI (stack recomendado para la mayoría de proyectos)

**Opción A — NPC local sin API externa (indie/privacy-first)**
```
Godot Engine (MIT)
    ↓ plugin via Asset Library
local-llm-npc / NobodyWho (Godot AssetLib)
    ↓ HTTP local
Ollama con Gemma 3n / Llama 3.1 8B
    ↓
NPC con diálogo dinámico, sin latencia de red, sin costo de API
```
Repos: [code-forge-temple/local-llm-npc](https://github.com/code-forge-temple/local-llm-npc) (MIT)

**Opción B — RAG sobre lore del juego (narrativa coherente)**
```
Godot Engine (MIT)
    ↓ llamada HTTP a FastAPI
LlamaIndex (MIT) + ChromaDB (Apache-2.0)
    ↓ retrieval de lore, quests, personajes
Claude Haiku / GPT-4o-mini (API)
    ↓
NPC que "conoce" el universo del juego y no inventa lore
```

**Opción C — RL training + MCP dev tooling (studio workflow)**
```
Godot Engine (MIT)
    ├── godot_rl_agents → entrenar agentes / QA bots
    └── godot-ai (MCP) → Claude Code conectado al editor
```

---

### Carbon Engine + AI (MMO y simulaciones masivas — nuevo jul 2026)

```
Carbon Engine — Destiny module (MIT)
    ├── Physics + Pathfinding MMO-scale
    │   └── Integrar ML para: pathfinding adaptativo con RL, anti-cheat conductual
    └── Trinity module (MIT)
        └── Gráficos AAA para mundos persistentes
Nakama backend (Apache-2.0)
    └── Hooks TS/Go para AI server-side
AWS Bedrock / Claude API
    └── NPCs LLM para MMO: diálogo contextual, memoria por personaje
```

Perfil: estudio que quiere MMO/simulación masiva con physics probada en producción real.
Ventaja vs O3DE: 20 años de battle-testing en EVE Online, no prototipo de investigación.

---

### Nakama + AI (backend inteligente)

Nakama expone hooks server-side en Go, TypeScript y Lua. Interceptar eventos y llamar a modelos:

```
Nakama server (Apache-2.0)
    ├── Hook: after_match_create
    │   └── ONNX model (PyTorch exportado) → matchmaking scoring
    ├── Hook: after_authenticate
    │   └── Clasificador ML → detectar cuenta nueva vs botfarm
    ├── Hook: stream de eventos en partida
    │   └── Anomaly detection → anti-cheat conductual
    └── Cron job Nakama
        └── Churn prediction model → trigger re-engagement notification
```

Módulos AI a añadir:
- **Matchmaking predictivo**: modelo que predice balance de partida (skill + latencia + historial)
- **Anti-cheat conductual**: z-score en velocidad, puntería, recursos → flag automático
- **Churn prevention**: score diario por jugador → notificación personalizada si en riesgo

---

### Supabase para juegos asíncronos/persistentes

Ideal para: RPGs, idle games, juegos de turnos, social games, UGC platforms.

```
Supabase (PostgreSQL + realtime + auth + storage + pgvector)
    ├── Edge Functions (Deno/TypeScript)
    │   └── Trigger en evento de juego → llama LLM API
    ├── pgvector extension
    │   └── Embeddings del lore/personajes → RAG sin ChromaDB externo
    └── Realtime subscriptions
        └── Live updates de estado de juego
```

---

### O3DE + AWS AI (proyectos enterprise/AAA)

```
Open 3D Engine (Apache-2.0)
    ↓ AWS Gem (plugin nativo)
AWS Bedrock (Claude / Llama on AWS)    ← LLM para NPCs y PCG
AWS GameLift                           ← multiplayer servers managed
AWS Comprehend                         ← análisis de toxicidad en chat
AWS Rekognition                        ← moderación de contenido UGC
```

---

## Tabla fit por caso de uso

| Caso de uso | Plataforma base | Capa AI | Esfuerzo |
|-------------|----------------|---------|----------|
| NPC con LLM local | Godot | LimboAI + Ollama | 2-3 semanas |
| NPC con memoria persistente | Godot | Generative Agents pattern + Claude API | 3-4 semanas |
| Multiplayer backend inteligente | Nakama | ONNX hooks + PostHog | 3-4 semanas |
| Backend social/persistente + AI | Supabase | Edge Functions + pgvector + LLM | 2-3 semanas |
| RL training / QA automatizado | Godot + godot_rl_agents | SB3 + PPO | 2-4 semanas |
| AI-assisted game dev | Godot + godot-ai | Claude Code / Cursor via MCP | 1 día setup |
| Juego AAA con AI cloud | O3DE | AWS Bedrock / GameLift | Meses (enterprise) |
| RPG con PCG y narrativa generativa | Luanti fork + Godot | Concordia + LlamaIndex + LLM | 6-10 semanas |
| MMO / simulación masiva | **Carbon Engine (Destiny + Trinity)** | Nakama + Claude API + RL anti-cheat | 3-6 meses |

---
*Fuentes: heroiclabs.com, supabase.com/blog, godotengine.org, o3de.org, fenris.com, PC Gamer, GamingOnLinux (verificado 2026-07-13)*
