# Verticales de partida — Gaming AI

> Plataformas verticales open source customizables con AI.
> Modelo: partir de algo funcional y robusto, añadir capa agentica encima.
> Última actualización: 2026-07-07 | v2

## Stack recomendado: Godot + Nakama + Agones

La combinación más potente disponible en open source hoy para juegos online con infraestructura cloud-native:

```
Godot (MIT) — motor del juego
    + LimboAI / Beehave — NPC behavior trees
    + godot_rl_agents — entrenamiento RL de agentes
    + godot-ai — MCP server para AI-assisted dev
    ↕ nakama-godot SDK (Apache-2.0)
Nakama (Apache-2.0) — backend multiplayer (lógica, social, auth)
    + TypeScript/Go hooks — lógica server-side con AI
    + Open Match (Apache-2.0) — matchmaking enchufable
    + PostHog (MIT) — analytics de jugador
Agones (Apache-2.0, CNCF) — orquestación de dedicated servers sobre K8s
    + integración: Open Match provee los jugadores, Agones provisiona el servidor
```

## Stack alternativo: Unity + unity-mcp (para clientes Unity)

Para studios que ya tienen código base en Unity y quieren añadir AI:

```
Unity 6.2 (propietario — free tier)
    + CoplayDev/unity-mcp (MIT) — MCP bridge AI ↔ Unity Editor
    + IvanMurzak/Unity-MCP (MIT) — cualquier método C# → herramienta
    + LLMUnity (Apache-2.0) — NPCs con LLMs locales o cloud
    ↕ Nakama SDK Unity (Apache-2.0) — backend
Nakama (Apache-2.0) — backend multiplayer compartido
```

---

## Plataformas base completas

| Plataforma | Licencia | URL | Stars | Stack | Caso de uso |
|------------|----------|-----|-------|-------|-------------|
| **Godot Engine** | MIT | [godotengine/godot](https://github.com/godotengine/godot) | 112k+ | C++/GDScript/C# | Engine 2D/3D completo. Base para integrar NPCs AI, PCG, diálogo. Ecosistema AI más rico open source. |
| **Open 3D Engine** | Apache-2.0 | [o3de/o3de](https://github.com/o3de/o3de) | 9.5k | C++ | Engine AAA. Sponsors AWS/Epic/Intel. Para proyectos enterprise con AWS Bedrock. |
| **COCOS 4** | MIT | [cocos/cocos-engine](https://github.com/cocos/cocos-engine) | ~18k | C++/TypeScript/JS | MIT desde enero 2026. Mobile-first. AI-native philosophy. Dominante en Asia, creciente en LATAM mobile. |
| **Nakama** | Apache-2.0 | [heroiclabs/nakama](https://github.com/heroiclabs/nakama) | 12.8k | Go + SDKs | Backend de juego completo. Matchmaking, leaderboards, chat, social. 500k devs. SDK Godot/Unity/Unreal. |
| **Colyseus** | MIT | [colyseus/colyseus](https://github.com/colyseus/colyseus) | 6.2k | Node.js/TypeScript | Servidor multiplayer web. Ideal para browser games y webapps. |
| **MonoGame** | MIT | [MonoGame/MonoGame](https://github.com/MonoGame/MonoGame) | 11k | C# | Framework C# cross-platform. Para devs .NET que quieren añadir AI. |
| **Stride** | MIT | [stride3d/stride](https://github.com/stride3d/stride) | 7.7k | C# | Engine .NET maduro (ex-Xenko). Alternativa seria a Unity sin controversy de pricing. |
| **Supabase** | Apache-2.0 | [supabase/supabase](https://github.com/supabase/supabase) | 80k | PostgreSQL + APIs | BaaS para juegos asíncronos: profiles, inventarios, leaderboards, UGC. **pgvector para NPC Long-Term Memory** (validado en Wanderfolk, mayo 2026). |
| **Agones** | Apache-2.0 | [googleforgames/agones](https://github.com/googleforgames/agones) | 6.3k | Go + K8s | Orquestación de dedicated game servers sobre Kubernetes. **CNCF Sandbox (mar 2026)**. SDK Unity/Unreal/C#/Rust. Estándar cloud-native para multiplayer a escala. |

---

## Juegos open source para fork + AI

Proyectos completos que pueden usarse como base con fork:

| Juego | Licencia | Repo | Stars | Por qué útil |
|-------|----------|------|-------|---------------|
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

### Unity + AI (para studios con codebase Unity)

**Stack AI-assisted dev en Unity:**
```
Unity 6.2
    └── CoplayDev/unity-mcp (MIT, 5.8k stars)   ← MCP bridge
        └── Claude Code / Cursor / Copilot       ← AI assistant
            ↕ 47 MCP tools
            ├── manage_assets      ← assets
            ├── control_scenes     ← scenes
            ├── edit_scripts       ← GDScript/C#
            └── run_tests          ← testing loop
```

**NPCs en Unity con LLMs locales:**
```
Unity 6.2
    └── LLMUnity (Apache-2.0, 1.7k stars)
        ├── LLM local (Ollama/llama.cpp) — sin costo de API
        └── Claude/GPT API — para calidad premium
```

---

### COCOS 4 + AI (mobile gaming — nuevo 2026)

```
COCOS 4 (MIT)
    └── TypeScript/JavaScript lógica
        ├── LLM API (Claude Haiku / GPT-4o-mini) → NPC diálogo
        ├── ONNX modelo exportado → AI on-device (NPUs en móviles 2026)
        └── Supabase (pgvector) → memoria del jugador y RAG sobre lore
```

Ventaja COCOS 4 + AI: engine 100% open source que los AI tools pueden leer, entender y modificar.
Impacto en mobile LATAM: COCOS MIT elimina el costo de engine para studios de bajo presupuesto.

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
| NPC con memoria persistente (Wanderfolk pattern) | Godot/COCOS + Supabase pgvector | pgvector + Claude Haiku | 2-3 semanas |
| AI dev tooling (Godot) | Godot + godot-ai | Claude Code / Cursor via MCP | 1 día setup |
| AI dev tooling (Unity) | Unity + CoplayDev/unity-mcp | Claude Code / Cursor / Copilot | 1 día setup |
| Multiplayer backend inteligente | Nakama | ONNX hooks + PostHog | 3-4 semanas |
| Multiplayer cloud-native escalable | Nakama + Agones + Open Match | K8s + ONNX matchmaking | 4-6 semanas |
| Backend social/persistente + AI | Supabase | Edge Functions + pgvector + LLM | 2-3 semanas |
| RL training / QA automatizado | Godot + godot_rl_agents | SB3 + PPO | 2-4 semanas |
| Mobile gaming + AI (LATAM) | COCOS 4 | ONNX on-device + Supabase pgvector | 3-5 semanas |
| Juego AAA con AI cloud | O3DE | AWS Bedrock / GameLift | Meses (enterprise) |
| RPG con PCG y narrativa generativa | Luanti fork + Godot | Concordia + LlamaIndex + LLM | 6-10 semanas |
| NPC dialogue en juego existente (mod-style) | Skyrim/cualquier juego | Mantella pattern: Whisper+Ollama+Piper | 1-2 semanas |

---
*v3 (2026-07-08): Agones añadido a la tabla (CNCF Sandbox mar 2026), stack recomendado actualizado con Agones, Wanderfolk pattern en tabla fit, Mantella pattern añadido, nota pgvector en Supabase.*
*v2 (2026-07-07): añadido COCOS 4 (MIT ene 2026), Stride, Unity MCP stack, nueva tabla fit con Unity MCP.*
*Fuentes: heroiclabs.com, supabase.com, godotengine.org, o3de.org, cocos.com, agones.dev, wanderfolk.ai, GitHub (verificado 2026-07-08)*
