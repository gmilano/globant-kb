# Patrones de composición — Gaming AI

> Recetas concretas para construir soluciones. Repos verificados, URLs reales.
> Última actualización: 2026-07-02

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
- [godotengine/godot](https://github.com/godotengine/godot) — MIT, 112k stars. WFC implementable nativamente.
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

## Tabla resumen

| Patrón | Stack principal | Esfuerzo | ROI esperado |
|--------|----------------|---------|--------------|
| NPC con LLM | Godot + LimboAI + Ollama/Claude | 2-3 semanas | +40% immersion (datos industria) |
| QA automatizado con RL | Godot + godot_rl_agents + SB3 | 3-4 semanas | -60% QA manual |
| Multiplayer backend inteligente | Nakama + Open Match + PostHog | 3-4 semanas | Matchmaking mejor → retención |
| Mundo procedural | Godot + WFC + LLM + Concordia | 4-8 semanas | Contenido infinito, replayability |
| Game Support Agent | LlamaIndex + FastAPI + Godot UI | 1-2 semanas | -70% tickets soporte manual |
| AI Dev Tooling | godot-ai + Claude Code/Cursor | 1 día setup | 2-3x velocidad de desarrollo |

---
*Repos verificados en GitHub 2026-07-02. URLs directas incluidas.*

## Receta 7: World Model para RL Training — sin motor de física

**Caso de uso**: Entrenar agentes RL en una representación aprendida del juego, más rápido y barato que ejecutar el motor real. Ideal para: QA agents, balance testing, oponentes AI.

**¿Por qué?**
- Ejecutar Godot/Unity para entrenamiento RL es caro en CPU/GPU: el motor completo corre solo para generar obs/reward.
- Un world model aprende la dinámica del juego → el agente RL puede entrenarse en el modelo, 10-100x más rápido.
- DIAMOND (NeurIPS 2024) demostró 1.46 HNS en Atari 100k — SOTA para agentes en world models.

**Stack**:
```
Paso 1: Recolectar datos de juego
    Godot 4 (MIT)
    └── godot_rl_agents (MIT)
        └── Grabar: [frame_t, acción_t, frame_t+1, reward_t]
            → Dataset de transiciones (≥100k frames)

Paso 2: Entrenar el world model
    DIAMOND framework (MIT) [eloialonso/diamond]
    └── Diffusion world model
        └── Input: frame_t + acción → predice frame_t+1
        └── También predice: done_flag, reward

Paso 3: Entrenar el agente RL en el world model
    DIAMOND agent (MIT)
    └── PPO / SAC contra el world model (no el juego real)
    └── 10-100x más rápido que contra el motor

Paso 4: Transferir al juego real
    Godot 4 (MIT)
    └── godot_rl_agents
        └── Fine-tune del agente entrenado en world model
            → 90% del entrenamiento ya está hecho
```

**Repos**:
- [eloialonso/diamond](https://github.com/eloialonso/diamond) — MIT. DIAMOND: diffusion world model + RL agent. NeurIPS 2024 Spotlight. Base para este patrón.
- [edbeeching/godot_rl_agents](https://github.com/edbeeching/godot_rl_agents) — MIT. Recolección de datos de juego desde Godot + fine-tuning.
- [DLR-RM/stable-baselines3](https://github.com/DLR-RM/stable-baselines3) — MIT. Algoritmos RL para el agente.
- [etched-ai/open-oasis](https://github.com/etched-ai/open-oasis) — MIT. Referencia: arquitectura Oasis 500M (alternativa a DIAMOND).

**Código base (Python)**:
```python
# Entrenamiento simplificado con DIAMOND
# Ver: github.com/eloialonso/diamond para setup completo

from diamond.agent import DiamondAgent
from diamond.world_model import DiffusionWorldModel

# 1. Cargar datos recolectados con godot_rl_agents
dataset = GameTransitionDataset("recordings/godot_game/")

# 2. Entrenar world model
wm = DiffusionWorldModel(obs_shape=(84, 84, 3), action_dim=8)
wm.train(dataset, steps=500_000)

# 3. Entrenar agente RL en el world model
agent = DiamondAgent(world_model=wm)
agent.train(steps=2_000_000)  # sin ejecutar Godot

# 4. Exportar agente para deployment en Godot
agent.save("trained_agent.onnx")
# → Importar en godot_rl_agents para fine-tuning final
```

**Tiempo estimado**: 2-3 semanas para recolección + entrenamiento. 3-4 semanas para integración completa.
**Ventaja clave**: el world model puede entrenarse en CPU/GPU modesta. El agente RL en el world model no requiere Godot en runtime.
**Limitación**: el world model introduce "alucinaciones" (objetos que aparecen/desaparecen). Fine-tune en el juego real es necesario para production-quality.

---

## Receta 8: Dev Tooling Workflow — Productividad con el stack GDC-aceptado

**Caso de uso**: Acelerar el workflow de un equipo de 5-15 devs usando solo los usos de AI que tienen >35% de adopción según GDC 2026: research/brainstorm (81%), code assist (47%), prototipado (35%). Evita los usos con alta resistencia (asset gen, NPCs con AI visibles).

**Stack**:
```
Fase 1: Design + Research (brainstorm)
    Claude claude-sonnet-5 / Opus 4.8 (API)
    └── Prompt de brainstorm: "Genera 20 mecánicas de juego para [genre], con pros/cons/esfuerzo estimado"
    └── Prompt de research: "Analiza este GDD y encuentra inconsistencias de mecánicas"

Fase 2: Code Assist (desarrollo)
    Claude Code (CLI) con godot-ai (MIT)
    └── MCP server local: Claude Code conectado al editor Godot
    └── Godot 4 (MIT): engine
    └── Flujo: dev describe en lenguaje natural → Claude genera GDScript → dev revisa
    Alternativa: Cursor + godot-ai para devs acostumbrados a IDE

Fase 3: QA automatizado (testing invisible)
    godot_rl_agents (MIT)
    └── Agente RL explorador → detecta bugs edge-case
    └── GitHub Actions → runs diarios del agente QA
    └── Reporte automático en GitHub Issues

Fase 4: Analytics (producción)
    PostHog (MIT, self-hosted)
    └── Events: session_start, level_completed, died, quit_game
    └── Dashboards: funnel por nivel, churn por día de juego
    Grafana (Apache-2.0)
    └── Alertas: drop en DAU/MAU, spike en abandono de nivel
```

**Repos**:
- [hi-godot/godot-ai](https://github.com/hi-godot/godot-ai) — MIT. MCP server para Godot → code assist.
- [edbeeching/godot_rl_agents](https://github.com/edbeeching/godot_rl_agents) — MIT. QA con RL agents.
- [PostHog/posthog](https://github.com/PostHog/posthog) — MIT. Analytics self-hosted.
- [grafana/grafana](https://github.com/grafana/grafana) — Apache-2.0. Dashboards.

**Por qué este framing funciona con devs**:
- No reemplaza: el dev sigue siendo el autor del código (AI es copiloto).
- No genera assets: los artistas del estudio mantienen control creativo.
- El QA con RL hace trabajo tedioso (regresiones, edge cases) que los devs no quieren hacer.
- Analytics es backend invisible: el jugador no sabe que hay AI.

**Tiempo estimado**: Setup inicial 3-5 días. ROI desde semana 1.
**Cifras de referencia**: godot-ai reporta 2-3x velocidad en setup de escenas. RL QA reduce tiempo de bug finding en 60-70%.

---

## Tabla resumen actualizada

| Patrón | Stack principal | Esfuerzo | ROI esperado | GDC alignment |
|--------|----------------|---------|--------------|---------------|
| NPC con LLM | Godot + LimboAI + Ollama/Claude | 2-3 semanas | +40% immersion | ⚠️ baja adopción devs (5%) |
| QA automatizado con RL | Godot + godot_rl_agents + SB3 | 3-4 semanas | -60% QA manual | ✅ backend invisible |
| Multiplayer backend inteligente | Nakama + Open Match + PostHog | 3-4 semanas | Matchmaking mejor → retención | ✅ backend invisible |
| Mundo procedural | Godot + WFC + LLM + Concordia | 4-8 semanas | Contenido infinito | ⚠️ baja adopción devs (10%) |
| Game Support Agent | LlamaIndex + FastAPI + Godot UI | 1-2 semanas | -70% tickets soporte | ✅ tooling |
| AI Dev Tooling | godot-ai + Claude Code/Cursor | 1 día setup | 2-3x dev speed | ✅ alta adopción (47%) |
| World Model RL Training | DIAMOND + godot_rl_agents | 2-3 semanas | 10-100x entrenamiento | ✅ backend invisible |
| Dev Productivity Stack | godot-ai + RL QA + PostHog | 3-5 días setup | 2-3x team velocity | ✅ GDC-aceptado completo |

---
*Actualizado 2026-07-06. GDC alignment basado en GDC State of the Game Industry 2026.*
