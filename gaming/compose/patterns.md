# Patrones de composición — Gaming AI

> Recetas concretas para construir soluciones. Repos verificados, URLs reales.
> Última actualización: 2026-07-13 | v7 — Nuevos: Carbon Engine, COCOS 4 Mobile, Unity MCP

## Patrón base

```
[Engine / Plataforma base (open source)]
          ↓
[Capa de integración AI (LLM / RL / ML)]
          ↓
[Agentes especializados de Gaming]
          ↓
[UI conversacional / API / juego en producción]
```

---

## Receta 1: NPC con LLM en Godot (recomendado — stack MIT/Apache)

**Caso de uso**: NPCs que hablan naturalmente, recuerdan al jugador, tienen personalidad persistente.

**Stack completo**:
```
Godot 4 (MIT)                          ← engine del juego
└── LimboAI (MIT)                       ← behavior tree del NPC
    └── BTState con trigger HTTP         ← dispara llamada al LLM
        └── Claude Haiku / GPT-4o-mini / Ollama  ← LLM
            └── pre-conversation.json   ← personalidad + conocimiento del personaje
                └── ChromaDB / Qdrant   ← vector store para memoria episódica
```

**Repos**:
- [limbonaut/limboai](https://github.com/limbonaut/limboai) — MIT, 2.9k stars
- [bitbrain/beehave](https://github.com/bitbrain/beehave) — MIT, 3.4k stars
- [AkshitIreddy/Interactive-LLM-Powered-NPCs](https://github.com/AkshitIreddy/Interactive-LLM-Powered-NPCs) — MIT
- [undreamai/LLMUnity](https://github.com/undreamai/LLMUnity) — Apache-2.0, 1.7k (Unity variant)

**Cómo conectar**:
1. Instalar LimboAI como plugin en Godot 4.
2. Crear un BTAction `LLMDialogue` que envía POST al endpoint LLM con: `{character: "...", player_input: "...", memory: [...últimos N eventos...]}`.
3. La respuesta vuelve como texto → lip sync + texto en UI.
4. Guardar el intercambio en memory store (ChromaDB via HTTP o SQLite local).
5. Opción local sin internet: Ollama con Llama 3.1 8B o Gemma 3n on-device.

**Métricas esperadas**: +43% player retention, 2.3× playtime (benchmark industria 2026).
**Tiempo**: 2-3 semanas MVP. **Costo cloud**: ~$0.01-0.05 por conversación con Claude Haiku.

---

## Receta 2: Agente RL para QA automatizado

**Caso de uso**: Reemplazar QA manual con agentes que exploran el juego detectando bugs, exploits, estrategias dominantes.

**Stack**:
```
Godot 4 (MIT)                           ← juego a testear como entorno RL
└── godot_rl_agents (MIT)               ← bridge Python ↔ Godot (obs/actions/rewards)
    └── Stable-Baselines3 (MIT)         ← algoritmo PPO / SAC
        └── Reward: coverage + crashes + exploits encontrados
        └── Reporter → GitHub Issues / Slack automático
```

**Repos**:
- [edbeeching/godot_rl_agents](https://github.com/edbeeching/godot_rl_agents) — MIT, 950+ stars
- [DLR-RM/stable-baselines3](https://github.com/DLR-RM/stable-baselines3) — MIT, 14k stars
- [Farama-Foundation/Gymnasium](https://github.com/Farama-Foundation/Gymnasium) — MIT, 12.5k stars

**Cómo conectar**:
1. Definir espacio de observación: posición del jugador, estado del nivel, items disponibles.
2. Definir acciones: movimiento, interacciones.
3. Reward function: +reward por área nueva, +reward por estados inválidos (out-of-bounds, NaN), -reward por acciones repetitivas.
4. Entrenar 1-5M steps con PPO via SB3.
5. Agente entrenado corre el juego 24/7 detectando regresiones.

**Tiempo**: 1-2 semanas para primer agente; 3-4 para sistema completo.
**ROI**: -60% QA manual (benchmark industria 2026).

---

## Receta 3: Backend multijugador + AI features (Nakama)

**Caso de uso**: Juego multijugador con matchmaking inteligente, anti-cheat conductual, analytics de retención.

**Stack**:
```
Godot 4 (MIT) — cliente
└── SDK nakama-godot (Apache-2.0)
    ↕ WebSocket / HTTP
Nakama server (Apache-2.0)
    ├── Matchmaking hook (TypeScript)
    │   └── Modelo ONNX de matching
    ├── Server-side events → PostHog (MIT) analytics
    ├── Anti-cheat hook (Go) → anomaly detection
    └── Open Match (Apache-2.0) — matchmaking Google
```

**Repos**:
- [heroiclabs/nakama](https://github.com/heroiclabs/nakama) — Apache-2.0, 12.8k stars
- [heroiclabs/nakama-godot](https://github.com/heroiclabs/nakama-godot) — Apache-2.0
- [googleforgames/open-match](https://github.com/googleforgames/open-match) — Apache-2.0
- [PostHog/posthog](https://github.com/PostHog/posthog) — MIT, 25k stars

**Cómo conectar**:
1. Instalar Nakama via Docker. Configurar SDK en Godot.
2. Hooks TypeScript en `after_match_create` → modelo ONNX predice "calidad" del partido.
3. Anti-cheat: loguear posición + velocidad + kills/segundo → z-score > 3 → flag.
4. PostHog recibe eventos → dashboards de retención, churn prediction.

**Tiempo**: 3-4 semanas. **Aplica para iGaming Brasil/México**.

---

## Receta 4: Mundo procedural con AI

**Caso de uso**: Generación infinita de contenido: niveles, quests, diálogos, texturas.

**Stack**:
```
Godot 4 (MIT)
    ├── PCG de niveles: Wave Function Collapse + LLM para constraints
    ├── PCG de narrativa: LLM + RAG sobre lore (ChromaDB)
    └── PCG de assets: Stable Diffusion API para texturas
```

**Repos**:
- [YGYOOO/WorldX](https://github.com/YGYOOO/WorldX) — MIT, 1.2k stars
- [joonspk-research/generative_agents](https://github.com/joonspk-research/generative_agents) — Apache-2.0, 21.7k stars
- [google-deepmind/concordia](https://github.com/google-deepmind/concordia) — Apache-2.0, 1.5k stars
- [run-llama/llama_index](https://github.com/run-llama/llama_index) — MIT, 40k stars

**Cómo conectar**:
1. Definir "grammar" del nivel: tipos de habitaciones, conexiones, reglas.
2. LLM recibe contexto del jugador → genera constraints para WFC.
3. WFC aplica constraints → layout coherente.
4. Para quests: agente con memoria (generative_agents pattern) genera objetivos basados en historial.
5. Assets: Stable Diffusion con prompt generado por LLM → texturas coherentes.

**Tiempo**: 4-6 semanas básico; 3-4 meses calidad AAA-like.

---

## Receta 5: Game Support Agent (in-game chatbot)

**Caso de uso**: Soporte conversacional dentro del juego. Responde sobre mecánicas, ayuda a jugadores atascados.

**Stack**:
```
Godot 4 UI (MIT) — chat overlay
    ↕ HTTP
FastAPI server (Python)
    ├── LlamaIndex (MIT) — RAG sobre docs del juego
    │   ├── game_manual.md → chunks en ChromaDB
    │   └── patchnotes.md, community_faq.md
    └── LLM (Claude Haiku / GPT-4o-mini / Llama local)
```

**Cómo conectar**:
1. Preparar corpus: manual, patch notes, FAQs → Markdown.
2. Indexar en ChromaDB con LlamaIndex.
3. FastAPI POST `/ask` → LlamaIndex recupera top-5 chunks → LLM genera respuesta.
4. Godot muestra respuesta en UI in-game.

**Costo**: ~$0.001-0.003/pregunta con Claude Haiku. Para volumen alto: Llama 3.1 8B local.
**Tiempo**: 1-2 semanas MVP.

---

## Receta 6: AI Dev Tooling — Godot MCP

**Caso de uso**: Estudio que quiere acelerar desarrollo con AI en Godot.

**Stack**:
```
Claude Code / Cursor / Codex (cliente MCP)
    ↕ Model Context Protocol
godot-ai (MIT, hi-godot/godot-ai) — MCP server local
    ↕ Godot Editor API
Godot 4 Editor (MIT)
    ├── Scene building desde descripción natural
    ├── Scripts GDScript generados y editados
    ├── Signals wired automáticamente
    └── Materials, animations, UI configurados
```

**Repos**:
- [hi-godot/godot-ai](https://github.com/hi-godot/godot-ai) — MIT, 900+ stars. 120+ ops, ~41 MCP tools.
- [IvanMurzak/Godot-MCP](https://github.com/IvanMurzak/Godot-MCP) — Apache-2.0. 39 tools, 11 familias.
- [mkdevkit/godot-mcp](https://github.com/mkdevkit/godot-mcp) — MIT. Editor control completo.

**Setup**: instalar plugin → configurar Claude Code para MCP server local → prompts en lenguaje natural.
**Tiempo**: 1 día setup. **ROI**: 2-3x velocidad de desarrollo (estimado studios 2026).

---

## Receta 7: AI Dev Tooling — Unity MCP (288 tools)

**Caso de uso**: Studio Unity que quiere máxima cobertura AI-assisted.

**Stack**:
```
Claude Code / Cursor / Windsurf (cliente MCP)
    ↕ Model Context Protocol
AnkleBreaker unity-mcp-server (MIT) — 288 tools, 30+ categorías
    ↕ Unity Editor & Unity Hub API
Unity Editor
    ├── Scene management, GameObjects, Components
    ├── Builds, Profiling, Shader Graph, Amplify
    ├── Terrain, Physics, NavMesh
    ├── Animation, MPPM Multiplayer
    └── Scripting, Assets, Tests
```

**Repos**:
- [AnkleBreaker-Studio/unity-mcp-server](https://github.com/AnkleBreaker-Studio/unity-mcp-server) — MIT. 288 herramientas.
- [CoplayDev/unity-mcp](https://github.com/CoplayDev/unity-mcp) — MIT, 5.8k stars. 25+ tools, mayor adopción.
- [IvanMurzak/Unity-MCP](https://github.com/IvanMurzak/Unity-MCP) — MIT. Extensible: cualquier C# → tool.

**Setup**: instalar package via Unity Package Manager → configurar MCP endpoint en Claude Code.
**Tiempo**: 1 día setup.

---

## Receta 8: 🆕 Carbon Engine + AI (juegos espaciales/MMO) — jul 2026

**Caso de uso**: Juego espacial, simulación masiva, MMO con física de flotas. Usando el motor de EVE Online.

**Stack**:
```
Carbon Engine (MIT) — github.com/carbonengine
    ├── Destiny (física + pathfinding)
    │   ├── Módulo base: pathfinding de flotas masivas (ya funcional)
    │   └── RL overlay: MARL para coordinación táctica de flotas
    │       └── [PettingZoo (MIT) + SB3 (MIT)] — entrenamiento multi-agente
    ├── Trinity (gráficos)
    │   └── Añadir AI-driven LOD / neural LOD si se necesita optimización
    └── Simulación de mundo
        └── generative_agents (Apache-2.0) — NPCs con memoria en el mundo del juego
            └── LLM API (Claude Haiku) para decisiones narrativas de alto nivel
```

**Repos**:
- [carbonengine](https://github.com/carbonengine) — MIT. Módulos Trinity, Destiny y más.
- [Farama-Foundation/PettingZoo](https://github.com/Farama-Foundation/PettingZoo) — MIT, 3.5k stars. MARL environment standard.
- [DLR-RM/stable-baselines3](https://github.com/DLR-RM/stable-baselines3) — MIT, 14k stars.
- [joonspk-research/generative_agents](https://github.com/joonspk-research/generative_agents) — Apache-2.0.

**Cómo construir**:
1. Clonar carbon/Destiny como base de física → definir el mundo del juego (coordenadas, flotas, naves).
2. Envolver Destiny como entorno PettingZoo (multi-agente): cada flota = un agente.
3. Entrenar con MARL: SB3 con algoritmo MAPPO → política de coordinación táctica.
4. Añadir generative_agents para NPCs del universo: corporaciones, traders, facciones con memoria.
5. Claude Haiku para decisiones narrativas de alto nivel cuando se detectan eventos especiales.

**Perfil de proyecto**: MMO espacial, juego de flotas tácticas, simulación de economía de mercado.
**Tiempo**: 8-16 semanas. **Ventaja**: 23 años de física de EVE Online, MIT.

---

## Receta 9: 🆕 COCOS 4 Mobile Gaming + AI (LATAM/Asia F2P) — jul 2026

**Caso de uso**: Juego mobile F2P en COCOS 4 con personalización AI: Dynamic Difficulty Adjustment, diálogo NPC, retención predictiva.

**Stack**:
```
COCOS 4 (MIT, TypeScript)              ← engine mobile
    ├── AI via MCP (first-class feature en roadmap)
    │   └── Claude Code / Cursor → genera escenas TS directamente
    ├── Dynamic Difficulty Adjustment (DDA)
    │   └── TS client → LLM API (Claude Haiku) o modelo TF Lite on-device
    │   └── Ajusta parámetros de juego en tiempo real (vida, velocidad, enemigos)
    ├── NPC dialogue
    │   └── Llamada a Claude Haiku / GPT-4o-mini (muy bajo costo en mobile)
    │   └── O Llama.cpp WASM para offline-first
    └── Analytics + Churn prediction
        └── PostHog (MIT) para events → modelo scikit-learn para churn score
        └── Trigger push notification si score > umbral
```

**Repos**:
- [cocos2d/cocos-engine](https://github.com/cocos2d/cocos-engine) — MIT. Engine base.
- [PostHog/posthog](https://github.com/PostHog/posthog) — MIT, 25k stars. Analytics self-hosted.
- [DLR-RM/stable-baselines3](https://github.com/DLR-RM/stable-baselines3) — MIT. Para entrenamiento DDA offline.

**Cómo construir**:
1. Setup COCOS 4 con PinK IDE (standalone) o VSCode.
2. DDA: instrumentar el juego con métricas (deaths/min, progression rate, session length).
3. Un microservicio Python consume métricas → predice "frustración" → ajusta parámetros via API al juego.
4. Para NPC: llamada directa desde TypeScript al Claude API (no bridge C++).
5. PostHog recibe sesiones → modelo de churn en Python → notificación/incentivo automático.

**Perfil de proyecto**: mobile gaming F2P LATAM con 100k+ DAU. DDA reduce churn; NPC dialogue aumenta retention.
**Tiempo**: 3-5 semanas MVP. **Mercado**: 500M+ jugadores en juegos COCOS.

---

## Tabla resumen

| Patrón | Stack principal | Esfuerzo | ROI esperado |
|--------|----------------|---------|-------------|
| NPC con LLM (Godot) | Godot + LimboAI + Ollama/Claude | 2-3 semanas | +43% retention, 2.3× playtime |
| QA automatizado con RL | Godot + godot_rl_agents + SB3 | 3-4 semanas | -60% QA manual |
| Multiplayer backend inteligente | Nakama + Open Match + PostHog | 3-4 semanas | Matchmaking mejor → retención |
| Mundo procedural | Godot + WFC + LLM + Concordia | 4-8 semanas | Contenido infinito, replayability |
| Game Support Agent | LlamaIndex + FastAPI + Godot UI | 1-2 semanas | -70% tickets soporte manual |
| AI Dev Tooling (Godot) | godot-ai + Claude Code/Cursor | 1 día setup | 2-3× velocidad de desarrollo |
| AI Dev Tooling (Unity) | AnkleBreaker MCP + Claude/Cursor | 1 día setup | 2-3× velocidad de desarrollo |
| Carbon Engine + AI (MMO) | Carbon + PettingZoo + MARL + GenAgents | 8-16 semanas | Motor AAA MIT, física masiva battle-tested |
| COCOS 4 Mobile AI | COCOS 4 + Claude Haiku + PostHog | 3-5 semanas | DDA + NPC para 500M+ LATAM players |

---
*v7 actualizado 2026-07-13. Repos verificados en GitHub. Recetas 7 (Unity MCP 288 tools), 8 (Carbon Engine MMO), 9 (COCOS 4 Mobile) añadidas.*
