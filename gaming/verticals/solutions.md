# Verticales de partida — Gaming AI

> Plataformas verticales open source customizables con AI.
> Modelo: partir de algo funcional y robusto, añadir capa agentica encima.
> Última actualización: 2026-07-13 | v7 — Carbon Engine MIT, COCOS 4 MIT añadidos

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
| **Godot Engine** | MIT | [godotengine/godot](https://github.com/godotengine/godot) | 112k | C++/GDScript/C# | Engine 2D/3D completo. Base para integrar NPCs AI, PCG, diálogo. Ecosistema AI más rico open source. Core contributions: solo humanos (ban AI-PRs 1-jul-2026); plugins: libre. |
| **Carbon Engine** | MIT | [github.com/carbonengine](https://github.com/carbonengine) | ★ nuevo | C++ (Trinity + Destiny + 24 módulos) | Motor de EVE Online. MIT desde 1-jul-2026. Trinity (gráficos AAA), Destiny (física + pathfinding para flotas masivas). Para juegos espaciales, simulación, MMO, o uso de módulos aislados. |
| **COCOS 4** | MIT | [cocos2d/cocos-engine](https://github.com/cocos2d/cocos-engine) | — | JavaScript / TypeScript | Engine AI-native, MIT desde ene-2026. Domina mobile gaming Asia/LATAM (500M+ jugadores). Features como MCPs/Agents. Sin royalties. PinK = IDE standalone. |
| **Open 3D Engine** | Apache-2.0 | [o3de/o3de](https://github.com/o3de/o3de) | 9.5k | C++ | Engine AAA. Sponsors AWS/Epic/Intel. Para proyectos enterprise con AWS Bedrock. |
| **Nakama** | Apache-2.0 | [heroiclabs/nakama](https://github.com/heroiclabs/nakama) | 12.8k | Go + SDKs | Backend de juego completo. Matchmaking, leaderboards, chat, social. 500k devs. |
| **Colyseus** | MIT | [colyseus/colyseus](https://github.com/colyseus/colyseus) | 6.2k | Node.js/TypeScript | Servidor multiplayer web. Ideal para browser games y webapps. |
| **MonoGame** | MIT | [MonoGame/MonoGame](https://github.com/MonoGame/MonoGame) | 11k | C# | Framework C# cross-platform. Para devs .NET que quieren añadir AI. |
| **Stride** | MIT | [stride3d/stride](https://github.com/stride3d/stride) | 7.7k | C# | Engine C# maduro (ex-Xenko). Alternativa a Unity para .NET sin controversias de pricing. |
| **Supabase** | Apache-2.0 | [supabase/supabase](https://github.com/supabase/supabase) | 80k+ | PostgreSQL + APIs | BaaS para juegos asíncronos: profiles, inventarios, leaderboards, UGC. pgvector para RAG. |

---

## Cómo customizar Carbon Engine con AI (nuevo — jul 2026)

```
Carbon Engine (MIT) — github.com/carbonengine
    ├── Trinity (gráficos)
    │   └── Añadir AI-driven LOD / neural rendering
    ├── Destiny (física + pathfinding)
    │   └── Reemplazar path planning con RL (godot_rl_agents pattern adaptado)
    │   └── Añadir MARL para batallas masivas con agentes coordinados
    └── Módulos de simulación (física de espacio, colisiones masivas)
        └── Integrar con Farama Gymnasium para entornos de entrenamiento RL
```

**Perfil de proyecto**: Juegos espaciales/MMO que requieren física masiva multijugador + AI de flota. Base con 23 años de battle-test.

---

## Cómo customizar COCOS 4 con AI (nuevo — jul 2026)

```
COCOS 4 Engine (MIT, AI-native) — cocos2d/cocos-engine
    ├── Features MCP/Agent (primer ciudadano en roadmap)
    │   └── Conectar Claude Code / Cursor al editor via MCP
    │   └── Generación de escenas y scripts en TypeScript via LLM
    ├── Runtime JS/TS
    │   └── LLM client directo (sin bridging): llama a Claude/GPT/Llama desde código del juego
    └── Mobile-first (iOS/Android/Web)
        └── On-device inference: Llama.cpp WASM para NPCs offline
        └── COCOS optimizado para bajo consumo de memoria
```

**Perfil de proyecto**: Mobile gaming LATAM/Asia. F2P con personalización AI (dynamic difficulty, NPC dialogue, recomendación de items). Sin royalties, JS/TS = más amigable para AI codegen.

---

## Juegos open source para fork + AI

| Juego | Licencia | Repo | Stars | Por qué útil |
|-------|----------|------|-------|-------------|
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
godot-ai (MIT) + LimboAI (MIT)
    ↓ HTTP local
Ollama con Gemma 3n / Llama 3.1 8B
    ↓
NPC con diálogo dinámico, sin latencia de red, sin costo de API
```

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

### Nakama + AI (backend inteligente)

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

---

### COCOS 4 + AI mobile (nuevo jul 2026)

```
COCOS 4 (MIT, TypeScript)
    ├── MCP integration (first-class feature)
    │   └── Claude Code / Cursor → genera escenas TS directamente
    ├── Dynamic Difficulty Adjustment (DDA)
    │   └── TS client → LLM API / modelo local
    │   └── Ajusta dificultad en tiempo real según comportamiento del jugador
    ├── NPC dialogue
    │   └── llamada a Claude Haiku / GPT-4o-mini (bajo costo en mobile)
    │   └── O Llama.cpp WASM para offline-first
    └── Personalización F2P
        └── Modelo de recomendación de items (TF Lite / ONNX en iOS/Android)
```

---

### Supabase para juegos asíncronos/persistentes

```
Supabase (PostgreSQL + realtime + auth + storage + pgvector)
    ├── Edge Functions (Deno/TypeScript)
    │   └── Trigger en evento de juego → llama LLM API
    ├── pgvector extension
    │   └── Embeddings del lore/personajes → RAG sin ChromaDB externo
    └── Realtime subscriptions
        └── Live updates de estado de juego

Casos de uso:
    ├── Recomendación de siguiente misión (LLM sobre historial del jugador)
    ├── Descripción generativa de ítems de inventario (LLM)
    ├── Soporte in-game via chatbot (RAG sobre pgvector + LLM)
    └── Detección de cheating en juegos asíncronos (SQL analytics + ML)
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
| Unity AI-assisted dev | Unity + AnkleBreaker MCP | Claude/Cursor, 288 tools | 1 día setup |
| Juego AAA con AI cloud | O3DE | AWS Bedrock / GameLift | Meses (enterprise) |
| MMO espacial / simulación masiva | Carbon Engine | RL + MARL (Destiny module) | 6+ semanas |
| Mobile gaming LATAM/Asia F2P | COCOS 4 | MCP + Claude Haiku + DDA | 3-4 semanas |
| RPG con PCG y narrativa generativa | Luanti fork + Godot | Concordia + LlamaIndex + LLM | 6-10 semanas |

---
*v7 actualizado 2026-07-13. Carbon Engine (MIT, jul-2026) y COCOS 4 (MIT, ene-2026) añadidos como verticales.*
