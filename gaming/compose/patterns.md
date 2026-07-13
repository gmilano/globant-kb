# Patrones de composición — Gaming AI

> Recetas concretas para construir soluciones. Repos verificados, URLs reales.
> Última actualización: 2026-07-13 | v13 — Patrón 7: Carbon Engine MMO stack

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
        └── Claude / GPT-4o / Ollama    ← LLM (cloud o local)
            └── pre-conversation.json   ← personalidad + conocimiento del personaje
                └── ChromaDB / Qdrant   ← vector store para memoria episódica
```

**Repos**:
- [limbonaut/limboai](https://github.com/limbonaut/limboai) — MIT, 2.8k stars. BTs + HSMs para Godot.
- [bitbrain/beehave](https://github.com/bitbrain/beehave) — MIT, 3.2k stars. BTs componibles alternativo.
- [AkshitIreddy/Interactive-LLM-Powered-NPCs](https://github.com/AkshitIreddy/Interactive-LLM-Powered-NPCs) — MIT, 716 stars. Referencia de implementación con voz + memoria.
- [undreamai/LLMUnity](https://github.com/undreamai/LLMUnity) — Apache-2.0, 1.7k stars. Para Unity en vez de Godot.

**Cómo conectar**:
1. Instalar LimboAI como plugin en Godot 4.
2. Crear un BTAction `LLMDialogue` que envía POST al endpoint LLM con: `{character: "...", player_input: "...", memory: [...últimos N eventos...]}`.
3. La respuesta del LLM vuelve como texto → animación de lip sync + texto en UI.
4. Guardar el intercambio en el memory store (ChromaDB vía API HTTP o SQLite local).
5. Opción local sin internet: usar Ollama con Llama 3.1 8B o Gemma 3n on-device.

**Tiempo estimado**: 2-3 semanas para MVP funcional con voz.
**Costo cloud**: ~$0.01-0.05 por conversación con Claude Haiku / GPT-4o-mini.
**Costo local**: $0 con Ollama, requiere GPU en el cliente.

---

## Receta 2: Agente RL para QA automatizado

**Caso de uso**: Reemplazar QA manual con agentes que exploran el juego detectando bugs, exploits de nivel, y estrategias dominantes.

**Stack**:
```
Godot 4 (MIT)                           ← juego a testear como entorno RL
└── godot_rl_agents (MIT)               ← bridge Python ↔ Godot (obs/actions/rewards)
    └── Stable-Baselines3 (MIT)         ← algoritmo PPO / SAC
        └── Entrenamiento con reward:    ← maximiza: coverage + crashes encontrados + exploits
            → Agente explorador
        └── Reporter automático          ← logs → GitHub Issues / Slack
```

**Repos**:
- [edbeeching/godot_rl_agents](https://github.com/edbeeching/godot_rl_agents) — MIT, 900+ stars.
- [DLR-RM/stable-baselines3](https://github.com/DLR-RM/stable-baselines3) — MIT, 13.5k stars. PPO, SAC, A2C, DQN en PyTorch.
- [Farama-Foundation/Gymnasium](https://github.com/Farama-Foundation/Gymnasium) — MIT, 12.1k stars.

**Cómo conectar**:
1. Definir el espacio de observación: posición del jugador, estado del nivel, items disponibles.
2. Definir las acciones: movimiento, interacciones disponibles.
3. Definir la reward function: +reward por área nueva explorada, +reward por estados inválidos, -reward por repetición.
4. Entrenar durante 1-5M steps con PPO vía SB3.
5. El agente entrenado corre el juego 24/7 detectando regresiones.

**Tiempo estimado**: 1-2 semanas para primer agente; 3-4 semanas para sistema de QA completo.
**ROI**: reducción de 60-70% en QA manual según benchmarks de la industria.

---

## Receta 3: Backend multijugador + AI features

**Caso de uso**: Juego multijugador con matchmaking inteligente, anti-cheat conductual, y analytics de retención.

**Stack**:
```
Godot 4 (MIT) — cliente
└── SDK nakama-godot (Apache-2.0)
    ↕ WebSocket / HTTP
Nakama server (Apache-2.0)              ← backend multiplayer
    ├── Matchmaking hook (TypeScript)
    │   └── Modelo ONNX de matching     ← PyTorch → exportado como ONNX
    ├── Server-side events               ← cada acción del jugador logeada
    │   └── PostHog (MIT)               ← analytics de comportamiento
    ├── Anti-cheat hook (Go)
    │   └── Detección de anomalías      ← velocidad, puntería, recursos anómalos
    └── Open Match (Apache-2.0)         ← matchmaking enchufable de Google
```

**Repos**:
- [heroiclabs/nakama](https://github.com/heroiclabs/nakama) — Apache-2.0, 12.8k stars.
- [heroiclabs/nakama-godot](https://github.com/heroiclabs/nakama-godot) — Apache-2.0. SDK oficial Godot.
- [googleforgames/open-match](https://github.com/googleforgames/open-match) — Apache-2.0.
- [PostHog/posthog](https://github.com/PostHog/posthog) — MIT, 23k+ stars.

**Cómo conectar**:
1. Instalar Nakama via Docker. Configurar SDK en Godot.
2. Crear server-side hooks en TypeScript: `after_match_create`, `before_authenticate`.
3. En el hook de matchmaking: llamar al modelo ONNX que predice la "calidad" de un partido.
4. Anti-cheat: loguear posición + velocidad + kills por segundo. Si supera z-score > 3, flag para revisión.
5. PostHog recibe eventos → dashboards de retención, churn prediction.

**Tiempo estimado**: 3-4 semanas para stack completo.

---

## Receta 4: Mundo procedural con AI

**Caso de uso**: Generación infinita de contenido: niveles, quests, diálogos, texturas.

**Stack**:
```
Godot 4 (MIT) — runtime del juego
    ├── PCG de niveles:
    │   └── Wave Function Collapse (WFC) en GDScript
    │       └── LLM para describir constraints en lenguaje natural → parámetros WFC
    ├── PCG de narrativa:
    │   └── LLM (Claude / Llama) para generar quests + diálogos dinámicos
    │       └── Lore base en ChromaDB (RAG) → coherencia narrativa
    └── PCG de assets:
        └── Stable Diffusion (API) para texturas procedurales
```

**Repos**:
- [godotengine/godot](https://github.com/godotengine/godot) — MIT, 112k stars. WFC implementable nativamente.
- [YGYOOO/WorldX](https://github.com/YGYOOO/WorldX) — MIT, 1.1k stars. Generación procedural de mundos AI (TypeScript).
- [joonspk-research/generative_agents](https://github.com/joonspk-research/generative_agents) — Apache-2.0, 21.7k stars.
- [google-deepmind/concordia](https://github.com/google-deepmind/concordia) — Apache-2.0, 1.5k stars. Simulación social para worlds persistentes.

**Tiempo estimado**: 4-6 semanas para sistema básico; 3-4 meses para calidad AAA-like.

---

## Receta 5: Game Support Agent (in-game chatbot)

**Caso de uso**: Agente de soporte conversacional dentro del juego. Responde sobre mecánicas, ayuda a jugadores atascados.

**Stack**:
```
Godot 4 UI (MIT) — chat overlay en el juego
    ↕ HTTP
FastAPI server (Python)
    ├── LlamaIndex (MIT) — RAG sobre documentación del juego
    │   ├── game_manual.md → chunks embedidos en ChromaDB
    │   └── patchnotes.md + community_faq.md
    └── LLM (Claude Haiku / GPT-4o-mini / Llama local)
```

**Repos**:
- [run-llama/llama_index](https://github.com/run-llama/llama_index) — MIT, 40k stars.
- [chroma-core/chroma](https://github.com/chroma-core/chroma) — Apache-2.0.

**Costo**: ~$0.001-0.003 por pregunta con Claude Haiku.
**Tiempo estimado**: 1-2 semanas para MVP funcional.

---

## Receta 6: AI Dev Tooling — Godot MCP

**Caso de uso**: Estudio que quiere usar AI para acelerar desarrollo en Godot (generación de scenes, scripts, assets).

**Stack**:
```
Claude Code / Cursor / Codex (cualquier cliente MCP)
    ↕ Model Context Protocol
godot-ai (MIT)                          ← MCP server local (120+ operaciones)
    ↕ Godot Editor API
Godot 4 Editor (MIT)
    ├── Scene building desde descripción natural
    ├── Script GDScript generado y editado
    └── Signals wired automáticamente
```

**Repos**:
- [hi-godot/godot-ai](https://github.com/hi-godot/godot-ai) — MIT, 805+ stars.
- [IvanMurzak/Unity-MCP](https://github.com/IvanMurzak/Unity-MCP) — MIT. Para Unity equivalente.
- [IvanMurzak/Godot-MCP](https://github.com/IvanMurzak/Godot-MCP) — Apache-2.0. Alternativa C# para Godot.

**Tiempo estimado**: Setup en 1 día. ROI inmediato.
**Caso real**: Sinn Studio lanzó *Zombonks* en 5 meses (~mitad del tiempo normal) con Aura en Unreal.

---

## Receta 7: MMO / Simulación masiva con Carbon Engine (NUEVO — jul 2026)

**Caso de uso**: Juego o simulación con miles de entidades concurrentes. Física a escala MMO. Mundo persistente con NPCs AI.

**Stack**:
```
Carbon Engine — Destiny module (MIT)    ← physics + navmesh + pathfinding MMO-scale
    ├── Pathfinding adaptativo
    │   └── RL agent (SB3 / RLLib) → optimizar rutas en tiempo real
    └── Physics simulation
        └── ONNX model → predecir comportamiento de entidades

Carbon Engine — Trinity module (MIT)    ← gráficos AAA large-scale
    └── Integración con Godot shaders / texturas PCG

Nakama backend (Apache-2.0)            ← backend multiplayer persistente
    ├── Hooks TypeScript → eventos de mundo
    └── Anti-cheat hooks → anomaly detection

Claude API (Anthropic)                  ← LLM para NPCs con memoria
    ├── generative_agents pattern (Apache-2.0)   ← memoria + reflexión + planning
    └── Qdrant / ChromaDB               ← vector store por NPC (memoria episódica)

PostHog (MIT)                          ← analytics de jugadores en mundo persistente
```

**Repos**:
- [Fenris-cs/carbon](https://github.com/Fenris-cs/carbon) — MIT. Motor de EVE Online, open sourced jul 2026.
- [heroiclabs/nakama](https://github.com/heroiclabs/nakama) — Apache-2.0, 12.8k stars.
- [joonspk-research/generative_agents](https://github.com/joonspk-research/generative_agents) — Apache-2.0, 21.7k stars.
- [DLR-RM/stable-baselines3](https://github.com/DLR-RM/stable-baselines3) — MIT, 13.5k stars.
- [PostHog/posthog](https://github.com/PostHog/posthog) — MIT, 23k+ stars.

**Por qué Carbon Engine y no Godot para este caso**:
- Destiny physics está optimizado para miles de entidades concurrentes (probado en batallas de EVE Online con +6,000 naves)
- Navmesh a escala MMO (terrenos de continentes, no niveles de 10-100 actores)
- Trinity maneja rendering a distancias de decenas de km con LOD de producción real
- Godot es mejor para proyectos 2D/3D estándar; Carbon Engine para simulaciones masivas

**Cómo conectar**:
1. Compilar Carbon Engine (C++, CMake). Módulos independientes: Destiny puede usarse sin Trinity.
2. Exponer API de física (posiciones, velocidades, colisiones) a través de binding Python/TypeScript.
3. Integrar SB3/RLLib para agentes RL que optimicen pathfinding en tiempo real.
4. Cada NPC importante: agente con memoria episódica en Qdrant + reflexión diaria via Claude API.
5. Nakama gestiona la persistencia de estado del mundo y los eventos multijugador.
6. PostHog analytics para entender comportamiento de jugadores en el mundo abierto.

**Tiempo estimado**: 3-6 meses para prototipo funcional (motor complejo, integración alta).
**Perfil ideal**: estudio con experiencia en C++ y ambiciones MMO / simulación masiva.
**Primer mover**: comunidad de Carbon Engine en formación (post jul 2026) → Globant puede ser referente.

---

## Tabla resumen

| Patrón | Stack principal | Esfuerzo | ROI esperado |
|--------|----------------|---------|---------------|
| NPC con LLM | Godot + LimboAI + Ollama/Claude | 2-3 semanas | +40% immersion (datos industria) |
| QA automatizado con RL | Godot + godot_rl_agents + SB3 | 3-4 semanas | -60% QA manual |
| Multiplayer backend inteligente | Nakama + Open Match + PostHog | 3-4 semanas | Matchmaking mejor → retención |
| Mundo procedural | Godot + WFC + LLM + Concordia | 4-8 semanas | Contenido infinito, replayability |
| Game Support Agent | LlamaIndex + FastAPI + Godot UI | 1-2 semanas | -70% tickets soporte manual |
| AI Dev Tooling | godot-ai + Claude Code/Cursor | 1 día setup | 2-3x velocidad de desarrollo |
| **MMO / simulación masiva** | **Carbon Engine (MIT) + Nakama + SB3** | **3-6 meses** | **Physics MMO-scale sin royalties** |

---
*Repos verificados en GitHub 2026-07-13. Carbon Engine (jul 2026) incluido como nuevo patrón.*
