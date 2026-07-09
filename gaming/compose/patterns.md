# Patrones de composición — Gaming AI

> Recetas concretas para construir soluciones. Repos verificados, URLs reales.
> Última actualización: 2026-07-08

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

---

## Receta 7: NPC con voz completo — Mantella-pattern (STT → LLM → TTS)

**Caso de uso**: NPC conversacional con voz, memoria y personalidad en cualquier juego (no solo mods). Basado en la arquitectura de Mantella (Skyrim/Fallout 4) adaptada a producción propia.

**Stack**:
```
Juego (Godot 4 / Unity / motor propio)
    ↕ HTTP / WebSocket local
Pipeline de NPC AI (Python FastAPI)
    ├── STT: Moonshine (MIT) / faster-whisper (MIT)
    │   └── Audio del micrófono → texto
    ├── LLM Context Builder
    │   ├── pre_conversation.json  ← personalidad, backstory, voz del personaje
    │   ├── memory_store (ChromaDB / SQLite)  ← recuerdos episódicos
    │   └── game_context.json  ← estado actual del mundo/misión
    ├── LLM: Claude Haiku / Llama 3.1 8B (Ollama local)
    │   └── Genera respuesta en carácter + markup de emoción
    └── TTS: Piper (MIT) / Kokoro (Apache-2.0)
        └── Audio → jugador
```

**Repos clave**:
- [art-from-the-machine/Mantella](https://github.com/art-from-the-machine/Mantella) — MIT. Referencia de implementación completa.
- [moonshine (Useful Sensors)](https://github.com/usefulsensors/moonshine) — Apache-2.0. STT on-device rápido.
- [rhasspy/piper](https://github.com/rhasspy/piper) — MIT. TTS neural offline, 900+ voces.
- [thewh1teagle/kokoro-onnx](https://github.com/thewh1teagle/kokoro-onnx) — Apache-2.0. TTS alta calidad ONNX.
- [chroma-core/chroma](https://github.com/chroma-core/chroma) — Apache-2.0. Vector store para memoria.

**Código esqueleto (FastAPI)**:
```python
from fastapi import FastAPI
import json, chromadb
from anthropic import Anthropic

app = FastAPI()
client = Anthropic()
db = chromadb.Client()
collection = db.get_or_create_collection("npc_memory")

@app.post("/npc/speak")
async def npc_speak(player_text: str, npc_id: str, game_context: dict):
    # Recuperar memoria episódica del NPC
    memories = collection.query(
        query_texts=[player_text],
        where={"npc_id": npc_id},
        n_results=5
    )
    
    # Cargar personalidad del personaje
    with open(f"characters/{npc_id}.json") as f:
        character = json.load(f)
    
    # Construir contexto
    system = f"""Eres {character['name']}, {character['description']}.
    
Recuerdos recientes de tu interacción con el jugador:
{chr(10).join([m for m in memories['documents'][0]])}

Contexto actual: {json.dumps(game_context)}

Responde en carácter. Añade [emoción] al inicio: [alegre|triste|enojado|neutral|sorprendido]."""

    # Llamar LLM
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=200,
        messages=[{"role": "user", "content": player_text}],
        system=system
    )
    
    npc_text = response.content[0].text
    
    # Guardar en memoria
    collection.add(
        documents=[f"Jugador: {player_text} | NPC: {npc_text}"],
        metadatas=[{"npc_id": npc_id, "timestamp": "now"}],
        ids=[f"{npc_id}_{hash(player_text)}"]
    )
    
    return {"text": npc_text, "npc_id": npc_id}
```

**Tiempo estimado**: 2-3 semanas para MVP con voz. Pipeline local 100% posible (Ollama + Whisper + Piper).
**Costo cloud**: ~$0.002 por conversación con Claude Haiku. Local: $0.
**Deal size típico**: $60k-200k (implementación completa para estudio con 5-10 NPCs principales)

---

## Receta 8: Unity AI Dev Workflow — 268 tools MCP

**Caso de uso**: Estudio Unity que quiere multiplicar productividad de devs con AI-assisted development. Alternativa a GitHub Copilot embedded: más control + más tools + sin suscripción adicional.

**Stack**:
```
Claude Code / Cursor / Copilot (cualquier cliente MCP)
    ↕ Model Context Protocol (Local)
unity-mcp-server (MIT, 268 tools)
    ↕ Unity Editor API
Unity 6.2 Editor (propietario, pero sin lock-in del MCP layer)
    ├── Scene management (crear, modificar, eliminar escenas)
    ├── GameObjects (crear, manipular, componentes)
    ├── Builds (trigger, config, profiling)
    ├── Shader Graph (crear materiales AI-described)
    ├── Terrain (heightmaps, textures desde prompts)
    ├── Physics (configurar RigidBodies, Colliders desde texto)
    ├── NavMesh (configurar pathfinding desde descripción)
    ├── Animation (crear clips, state machines desde texto)
    └── MPPM Multiplayer (configurar sesiones multiplayer)
```

**Setup (5 minutos)**:
```bash
# 1. Clonar el servidor
git clone https://github.com/AnkleBreaker-Studio/unity-mcp-server
cd unity-mcp-server && npm install

# 2. Instalar Unity MCP Plugin (UPM)
# En Unity: Window → Package Manager → + → Add package from git URL
# https://github.com/AnkleBreaker-Studio/unity-mcp-plugin.git

# 3. Configurar en Claude Code (~/.claude/mcp_servers.json)
{
  "unity": {
    "command": "node",
    "args": ["path/to/unity-mcp-server/index.js"]
  }
}
```

**Prompts de ejemplo en Claude Code**:
```
"Crea una escena de combate con terreno, 2 spawn points de enemigos y un checkpoint"
"Añade un NavMesh Agent al Player con velocidad 5 y radio de avoidance 0.5"
"Configura un Shader Graph para un material de agua con reflexión y distorsión"
"Genera el loop de animación de ataque con blend tree para 4 direcciones"
```

**Repos**:
- [AnkleBreaker-Studio/unity-mcp-server](https://github.com/AnkleBreaker-Studio/unity-mcp-server) — MIT, 268 tools
- [AnkleBreaker-Studio/unity-mcp-plugin](https://github.com/AnkleBreaker-Studio/unity-mcp-plugin) — MIT, UPM package
- [CoplayDev/unity-mcp](https://github.com/CoplayDev/unity-mcp) — MIT, 5.8k stars, alternativa más enfocada (47 tools)

**Tiempo estimado**: 1 día setup, ROI inmediato en velocidad de desarrollo.
**Deal size típico**: $20k-80k (setup + training + customización para estudio mediano)

---

## Receta 9: Carbon Engine + AI — MMO/Espacio con Python hooks

**Caso de uso**: Proyecto de juego de espacio/MMO enterprise usando el engine de EVE Online, con capa AI para NPCs de facción, economía procedural y soporte de jugador.

**Stack**:
```
Carbon Engine (MIT, github.com/orgs/carbonengine)
    ├── Trinity renderer ← visuales de espacio AAA
    ├── CarbonIO ← networking para MMO
    └── Python scripting hooks ← punto de integración AI
        ├── NPC Faction AI
        │   └── LangGraph (MIT) + Claude Sonnet ← agentes de facción con memoria
        ├── Procedural Economy
        │   └── Reglas económicas generadas por LLM + validadas con reglas fijas
        └── Game Support Agent
            └── LlamaIndex (MIT) + ChromaDB ← RAG sobre lore del juego
```

**Ejemplo de Python hook para NPC de facción**:
```python
# carbon_npc_hook.py — se registra como hook en el Carbon Engine
from langgraph.graph import StateGraph
from anthropic import Anthropic
import json

client = Anthropic()

def faction_npc_respond(player_input: str, faction_id: str, 
                         npc_state: dict, faction_context: dict) -> dict:
    """Hook que Carbon Engine llama cuando un jugador interactúa con un NPC."""
    
    system = f"""Eres un representante de la facción {faction_context['name']}.
    
Ideología: {faction_context['ideology']}
Relación actual con el jugador (reputación {npc_state['player_reputation']}/100):
{'Neutral' if npc_state['player_reputation'] < 50 else 'Amistoso' if npc_state['player_reputation'] < 80 else 'Aliado'}

Misiones activas con esta facción: {json.dumps(npc_state.get('active_missions', []))}

Responde coherentemente con la ideología y relación actual. Máximo 3 oraciones."""

    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=150,
        system=system,
        messages=[{"role": "user", "content": player_input}]
    )
    
    return {
        "dialogue": response.content[0].text,
        "reputation_delta": _calculate_reputation_delta(player_input, faction_context),
        "available_missions": _get_contextual_missions(npc_state, faction_context)
    }

def _calculate_reputation_delta(player_input: str, faction_context: dict) -> int:
    """Lógica de reputación basada en palabras clave + faction ideology."""
    # Simplificado — en prod usar clasificador ML
    positive_keywords = faction_context.get('positive_keywords', [])
    return 1 if any(kw in player_input.lower() for kw in positive_keywords) else 0
```

**Repos**:
- [carbonengine (org)](https://github.com/orgs/carbonengine) — MIT. Engine base.
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — MIT, 110k stars. Para agentes con estado.
- [run-llama/llama_index](https://github.com/run-llama/llama_index) — MIT. RAG sobre lore.

**Tiempo estimado**: 3-6 meses para producción (engine es complejo, requiere expertise C++).
**Deal size típico**: $300k-1.5M (proyecto AAA enterprise)
**Ventaja Globant**: Propuesta diferenciada — "MMO sin royalties de engine, con AI nativa en Python hooks"

---

## Tabla resumen

| Patrón | Stack principal | Esfuerzo | Deal size típico |
|--------|----------------|---------|-----------------|
| NPC con LLM (Godot) | Godot + LimboAI + Ollama/Claude | 2-3 semanas | $40k-150k |
| NPC con voz (Mantella-pattern) | Godot + Whisper + Claude Haiku + Piper | 2-3 semanas | $60k-200k |
| QA automatizado con RL | Godot + godot_rl_agents + SB3 | 3-4 semanas | $50k-150k |
| Multiplayer backend inteligente | Nakama + Open Match + PostHog | 3-4 semanas | $80k-250k |
| Mundo procedural | Godot + WFC + LLM + Concordia | 4-8 semanas | $100k-400k |
| Game Support Agent | LlamaIndex + FastAPI + Godot UI | 1-2 semanas | $20k-80k |
| AI Dev Tooling (Godot) | godot-ai + Claude Code/Cursor | 1 día setup | $20k-50k |
| AI Dev Tooling (Unity 268 tools) | unity-mcp-server + Claude Code | 1 día setup | $20k-80k |
| Carbon Engine + AI (MMO/espacio) | Carbon Engine + LangGraph + Claude | Meses | $300k-1.5M |

---
*Repos verificados en GitHub 2026-07-08. URLs directas incluidas.*
