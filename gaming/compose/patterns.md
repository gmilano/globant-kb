# Patrones de composición — Gaming AI

> Recetas concretas para construir soluciones. Repos verificados, URLs reales.
> Última actualización: 2026-07-06 (segunda pasada — Receta 8 añadida: MCP multi-engine)

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
- [edbeeching/godot_rl_agents](https://github.com/edbeeching/godot_rl_agents) — MIT, 900+ stars. Wrappers para SB3, Sample Factory, Ray RLLib, CleanRL.
- [DLR-RM/stable-baselines3](https://github.com/DLR-RM/stable-baselines3) — MIT, 13.5k stars. PPO, SAC, A2C, DQN en PyTorch.
- [Farama-Foundation/Gymnasium](https://github.com/Farama-Foundation/Gymnasium) — MIT, 12.1k stars. API estándar del entorno.

**Cómo conectar**:
1. Definir el espacio de observación: posición del jugador, estado del nivel, items disponibles.
2. Definir las acciones: movimiento, interacciones disponibles.
3. Definir la reward function: +reward por área nueva explorada, +reward por encontrar estados inválidos (out-of-bounds, NaN values), -reward por acciones repetitivas.
4. Entrenar durante 1-5M steps con PPO vía SB3.
5. El agente entrenado se convierte en un "explorador" que corre el juego 24/7 detectando regresiones.

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
- [heroiclabs/nakama](https://github.com/heroiclabs/nakama) — Apache-2.0, 12.8k stars. Backend completo.
- [heroiclabs/nakama-godot](https://github.com/heroiclabs/nakama-godot) — Apache-2.0. SDK oficial Godot.
- [googleforgames/open-match](https://github.com/googleforgames/open-match) — Apache-2.0. Matchmaking framework de Google.
- [PostHog/posthog](https://github.com/PostHog/posthog) — MIT, 23k stars. Product analytics self-hosted.

**Cómo conectar**:
1. Instalar Nakama via Docker. Configurar SDK en Godot.
2. Crear server-side hooks en TypeScript que interceptan eventos: `after_match_create`, `before_authenticate`.
3. En el hook de matchmaking: llamar al modelo ONNX que predice la "calidad" de un partido (skill balance, latencia, historial de jugadores).
4. Anti-cheat: loguear posición + velocidad + kills por segundo. Si supera umbral estadístico (z-score > 3), flag para revisión.
5. PostHog recibe eventos → dashboards de retención, churn prediction, session analysis.

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
            └── [o opcional] AI-generated music con MusicGen (MIT)

```

**Repos**:
- [godotengine/godot](https://github.com/godotengine/godot) — MIT, 114k stars. WFC implementable nativamente.
- [YGYOOO/WorldX](https://github.com/YGYOOO/WorldX) — MIT, 1.1k stars. Generación procedural de mundos con AI (TypeScript).
- [joonspk-research/generative_agents](https://github.com/joonspk-research/generative_agents) — Apache-2.0, 21.7k stars. Para quests y narrativa con agentes que recuerdan.
- [google-deepmind/concordia](https://github.com/google-deepmind/concordia) — Apache-2.0, 1.5k stars. Simulación social para worlds persistentes.

**Cómo conectar**:
1. Definir el "grammar" del nivel: tipos de habitaciones, conexiones posibles, reglas de juego.
2. LLM recibe descripción del jugador y contexto del mundo → genera constraints para el generador.
3. WFC aplica constraints → produce layout de nivel que respeta coherencia.
4. Para quests: agente con memoria (generative_agents pattern) genera objetivos basados en historial del jugador.
5. Assets: llamada a Stable Diffusion API con prompt generado por LLM → texturas coherentes con el bioma.

**Tiempo estimado**: 4-6 semanas para sistema básico; 3-4 meses para calidad AAA-like.

---

## Receta 5: Game Support Agent (in-game chatbot)

**Caso de uso**: Agente de soporte conversacional dentro del juego. Responde preguntas sobre mecánicas, ayuda a jugadores atascados, reemplaza FAQ estático.

**Stack**:
```
Godot 4 UI (MIT) — chat overlay en el juego
    ↕ HTTP
FastAPI server (Python)
    ├── LlamaIndex (MIT) — RAG sobre documentación del juego
    │   ├── game_manual.md → chunks embedidos en ChromaDB
    │   ├── patchnotes.md
    │   └── community_faq.md
    └── LLM (Claude Haiku / GPT-4o-mini / Llama local)
        └── System prompt: "Eres el asistente de [nombre del juego]. Solo respondes sobre mecánicas y soporte. No spoilers."
```

**Repos**:
- [run-llama/llama_index](https://github.com/run-llama/llama_index) — MIT, 40k stars. RAG + agentes sobre datos propios.
- [chroma-core/chroma](https://github.com/chroma-core/chroma) — Apache-2.0. Vector database para embeddings.

**Cómo conectar**:
1. Preparar el corpus del juego: manual, patch notes, FAQs, descripciones de ítems → convertir a Markdown.
2. Indexar en ChromaDB con LlamaIndex usando embeddings de OpenAI o Sentence Transformers (MIT).
3. FastAPI expone endpoint POST `/ask` que recibe pregunta del jugador.
4. LlamaIndex recupera chunks relevantes (top-5 por similitud coseno).
5. LLM recibe chunks + pregunta → genera respuesta natural en el tono del juego.
6. Godot muestra respuesta en UI in-game con animación.

**Costo**: ~$0.001-0.003 por pregunta con Claude Haiku. Para volumen alto: Llama 3.1 8B local en servidor.
**Tiempo estimado**: 1-2 semanas para MVP funcional.

---

## Receta 6: AI Dev Tooling — Godot MCP

**Caso de uso**: Estudio que quiere usar AI para acelerar desarrollo en Godot (generación de scenes, scripts, assets).

**Stack**:
```
Claude Code / Cursor / Codex (cualquier cliente MCP)
    ↕ Model Context Protocol
godot-ai (MIT)                          ← MCP server local
    ↕ Godot Editor API
Godot 4 Editor (MIT)                   ← editor abierto
    ├── Scene building desde descripción natural
    ├── Script GDScript generado y editado
    ├── Signals wired automáticamente
    └── Materials, animations, UI configurados
```

**Repos**:
- [hi-godot/godot-ai](https://github.com/hi-godot/godot-ai) — MIT, 805 stars. 120+ operaciones, ~41 MCP tools.
- [FlamxGames/godot-ai-assistant-hub](https://github.com/FlamxGames/godot-ai-assistant-hub) — MIT. Alternativa con Ollama/Gemini/OpenRouter.

**Cómo configurar**:
1. Instalar godot-ai desde Godot Asset Library o GitHub.
2. Configurar Claude Code para conectarse al MCP server local (puerto configurable).
3. En Claude Code: `/add-context-window --mcp godot` y empezar a usar lenguaje natural.
4. Ejemplos de prompts: "Crea una escena de un jugador con física de plataformer", "Añade un sistema de inventario al player.gd", "Wire el signal `body_entered` del Area2D al método `on_enemy_hit`".

**Tiempo estimado**: Setup en 1 día. ROI inmediato.

---

## Receta 7: Evaluación de LLMs para Gaming con GamingAgent (NUEVO — Jul 2026)

**Caso de uso**: El cliente quiere integrar un LLM en su juego (NPCs, game master, soporte). Antes de comprometerse con un proveedor, evaluar cuál modelo funciona mejor en contextos de juego similares.

**Stack**:
```
GamingAgent (MIT, ICLR 2026)           ← framework de evaluación
    ├── Gymnasium / Retro interfaces   ← entornos estándar de juego
    │   ├── Entorno A: juego del cliente (si es web-based)
    │   └── Entorno B: proxy (Tetris, Sokoban, Pokémon Red)
    ├── Evaluación multi-modelo:
    │   ├── Claude Opus/Sonnet (Anthropic API)
    │   ├── GPT-4o (OpenAI API)
    │   ├── Gemini 1.5 Pro (Google API)
    │   └── Llama 3.1 local (Ollama)
    └── Benchmark output:
        ├── Score por modelo por juego
        ├── Replay videos de cada intento
        └── Análisis de fallos por tipo
```

**Repos**:
- [lmgame-org/GamingAgent](https://github.com/lmgame-org/GamingAgent) — MIT, 947 stars. ICLR 2026. Framework completo.
- [Farama-Foundation/Gymnasium](https://github.com/Farama-Foundation/Gymnasium) — MIT, 12.1k stars. Entornos RL estándar.

**Cómo usar**:
1. Clonar GamingAgent: `git clone https://github.com/lmgame-org/GamingAgent`
2. Configurar API keys de los modelos a evaluar en `.env`.
3. Seleccionar los juegos proxy relevantes al dominio del cliente (razonamiento espacial → Tetris/Sokoban; secuencial → Pokémon Red; multistep → Ace Attorney).
4. Correr evaluación: `python evaluate.py --game tetris --models claude,gpt4o,gemini --episodes 10`
5. Analizar replays y scores → seleccionar el LLM con mejor desempeño en el caso de uso específico.
6. Usar ese LLM como base para la integración en el juego del cliente.

**Valor para Globant**:
- Diferenciador técnico vs propuestas que solo dicen "usamos ChatGPT"
- Datos duros para recomendar modelo al cliente con evidencia
- Due diligence antes de comprometer integración en producción
- Reduce riesgo de elegir LLM equivocado por sesgo de marketing

**Tiempo estimado**: 2-3 días de setup + benchmarking; 1 semana para análisis completo.

---

---

## Receta 8: AI Dev Tooling Multi-Engine (Unity + Unreal + Godot) — NUEVO Jul 2026

**Caso de uso**: Estudio con proyectos en múltiples engines (Unity para mobile, Unreal para console, Godot para indie) que quiere una solución única de AI-assisted development.

**Stack**:
```
Claude Code / Cursor / Copilot / Gemini (cualquier cliente MCP)
    ↕ Model Context Protocol
IvanMurzak/GameDev-MCP-Server (MIT)     ← bridge engine-agnostic via SignalR
    ├── IvanMurzak/Unity-MCP (Apache-2.0)
    │   ├── 52 Tools: Assets, Scene, GameObject, Script, Tests, Console, Screenshot
    │   ├── 48 Prompts para flujos comunes
    │   └── Cualquier método C# → tool con 1 línea de código
    ├── IvanMurzak/Unreal-MCP (Apache-2.0)
    │   ├── 62 Tools: actores, Blueprints, assets, C++ source, project mgmt
    │   └── Plugin C++ + .NET bridge para UE 5.7
    └── hi-godot/godot-ai (MIT)
        ├── 120+ operaciones, 41 MCP tools
        └── Scene building, scripts, signals, animations via lenguaje natural
```

**Repos**:
- [IvanMurzak/Unity-MCP](https://github.com/IvanMurzak/Unity-MCP) — Apache-2.0, ~3k stars. MCP para Unity, 52 tools.
- [IvanMurzak/Unreal-MCP](https://github.com/IvanMurzak/Unreal-MCP) — Apache-2.0. MCP para UE 5.7, 62 tools.
- [IvanMurzak/GameDev-MCP-Server](https://github.com/IvanMurzak/GameDev-MCP-Server) — MIT. Bridge agnostic compartido.
- [hi-godot/godot-ai](https://github.com/hi-godot/godot-ai) — MIT, 805+ stars. MCP para Godot.

**Cómo conectar**:
1. Para Unity: instalar Unity-MCP desde Package Manager (git URL). Configurar en Claude Code: `claude mcp add unity-mcp`.
2. Para Unreal: instalar el plugin C++ en UE 5.7, configurar .NET bridge local.
3. Para Godot: instalar godot-ai desde Godot Asset Library.
4. Opcionalmente usar GameDev-MCP-Server como punto de control único si el estudio alterna entre engines.
5. Prompts de ejemplo por engine:
   - Unity: "Crea un sistema de inventario con ScriptableObjects, agrega un UI Canvas vinculado"
   - Unreal: "Spawna un Actor con NavMeshComponent y configura el Blueprint para seguir al jugador"
   - Godot: "Crea una escena de plataformer con KinematicBody2D, wirea los signals de colisión"

**Extensión — openNPC para cualquier engine**:
```
openNPC (MIT)                           ← framework Python NPC agnóstico
    ├── Tier 1: heurísticos              ← NPCs simples sin LLM (0 costo, offline)
    ├── Tier 2: LLM runtime              ← diálogo generativo (Claude Haiku, ~$0.01/conv)
    └── Tier 3: RL-trained bosses        ← agentes entrenados con SB3+PPO
        ↕ HTTP API
    Engine (Unity / Unreal / Godot)     ← cualquiera llama a la misma API Python
```
openNPC separa la lógica NPC del engine → mismo backend de NPC para proyectos multi-platform.

**Tiempo estimado**: Setup base en 1-2 días por engine; openNPC integration 1 semana adicional.
**Valor**: eliminación del "one-size-fits-one-engine" — ofrecer AI game dev como práctica horizontal.

---

## Tabla resumen

| Patrón | Stack principal | Esfuerzo | ROI esperado |
|--------|----------------|---------|-------------|
| NPC con LLM | Godot + LimboAI + Ollama/Claude | 2-3 semanas | +40% immersion (datos industria) |
| QA automatizado con RL | Godot + godot_rl_agents + SB3 | 3-4 semanas | -60% QA manual |
| Multiplayer backend inteligente | Nakama + Open Match + PostHog | 3-4 semanas | Matchmaking mejor → retención |
| Mundo procedural | Godot + WFC + LLM + Concordia | 4-8 semanas | Contenido infinito, replayability |
| Game Support Agent | LlamaIndex + FastAPI + Godot UI | 1-2 semanas | -70% tickets soporte manual |
| AI Dev Tooling Godot | godot-ai + Claude Code/Cursor | 1 día setup | 2-3x velocidad de desarrollo |
| Evaluación LLMs para gaming | GamingAgent (ICLR 2026) | 2-5 días | Selección óptima de LLM, -riesgo |
| AI Dev Tooling Multi-Engine | Unity-MCP + Unreal-MCP + GameDev-MCP | 2-3 días setup | AI dev para cualquier engine del cliente |

---
*Repos verificados en GitHub 2026-07-06 (segunda pasada). Receta 8 añadida: MCP multi-engine + openNPC.*
