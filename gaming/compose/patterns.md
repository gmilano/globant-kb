# Patrones de composición — Gaming AI

> Recetas concretas para construir soluciones. Repos verificados, URLs reales.
> Última actualización: 2026-07-10 (v7 — 13 patrones)

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
- [edbeeching/godot_rl_agents](https://github.com/edbeeching/godot_rl_agents) — MIT, 1.5k stars. Wrappers para SB3, Sample Factory, Ray RLLib, CleanRL.
- [DLR-RM/stable-baselines3](https://github.com/DLR-RM/stable-baselines3) — MIT, 13.5k stars. PPO, SAC, A2C, DQN en PyTorch.
- [Farama-Foundation/Gymnasium](https://github.com/Farama-Foundation/Gymnasium) — MIT, 12.1k stars. API estándar del entorno.

**Cómo conectar**:
1. Definir el espacio de observación: posición del jugador, estado del nivel, items disponibles.
2. Definir las acciones: movimiento, interacciones disponibles.
3. Definir la reward function: +reward por área nueva explorada, +reward por estados inválidos (out-of-bounds, NaN values), -reward por acciones repetitivas.
4. Entrenar durante 1-5M steps con PPO vía SB3.
5. El agente entrenado se convierte en un "explorador" que corre el juego 24/7 detectando regresiones.

**Tiempo estimado**: 1-2 semanas para primer agente; 3-4 semanas para sistema QA completo.
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
- [godotengine/godot](https://github.com/godotengine/godot) — MIT, 112k stars.
- [YGYOOO/WorldX](https://github.com/YGYOOO/WorldX) — MIT, 1.1k stars. Generación procedural de mundos (TypeScript).
- [joonspk-research/generative_agents](https://github.com/joonspk-research/generative_agents) — Apache-2.0, 21.7k stars. Para quests y narrativa con agentes que recuerdan.
- [google-deepmind/concordia](https://github.com/google-deepmind/concordia) — Apache-2.0, 1.5k stars. Simulación social para worlds persistentes.

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
        └── System prompt: "Eres el asistente de [nombre del juego]. Solo respondes sobre mecánicas y soporte."
```

**Repos**:
- [run-llama/llama_index](https://github.com/run-llama/llama_index) — MIT, 40k stars.
- [chroma-core/chroma](https://github.com/chroma-core/chroma) — Apache-2.0. Vector database para embeddings.

**Costo**: ~$0.001-0.003 por pregunta con Claude Haiku.
**Tiempo estimado**: 1-2 semanas para MVP funcional.

---

## Receta 6: AI Dev Tooling — Godot MCP

**Caso de uso**: Estudio que quiere usar AI para acelerar desarrollo en Godot (generación de scenes, scripts, assets).

**Stack**:
```
Claude Code / Cursor / Codex (cualquier cliente MCP)
    ↕ Model Context Protocol
godot-ai (MIT)                          ← MCP server local (150+ operaciones)
    ↕ Godot Editor API
Godot 4 Editor (MIT)                   ← editor abierto
    ├── Scene building desde descripción natural
    ├── Script GDScript generado y editado
    ├── Signals wired automáticamente
    └── Materials, animations, UI configurados
```

**Repos**:
- [hi-godot/godot-ai](https://github.com/hi-godot/godot-ai) — MIT, 1.1k+ stars. 150+ operaciones, ~41 MCP tools.

**Setup**: 1 día. ROI inmediato (2-3x velocidad de desarrollo reportado por usuarios).

---

## Receta 7: NPC con Voz Completa — Pipeline Mantella-style (MIT)

**Caso de uso**: NPCs con voz naturalista, sin licencias cerradas. Pipeline completo STT → LLM → TTS corriendo localmente o en servidor.

**Stack**:
```python
# server.py (FastAPI)
from faster_whisper import WhisperModel    # STT (MIT)
from anthropic import Anthropic            # LLM
import subprocess                          # TTS via Piper

whisper = WhisperModel("base", device="cpu")
client = Anthropic()

@app.post("/npc/speak")
async def npc_speak(audio: UploadFile, character_id: str):
    # 1. STT: voz del jugador → texto
    segments, _ = whisper.transcribe(audio.file)
    player_text = " ".join([s.text for s in segments])
    
    # 2. Recuperar memoria del NPC (ChromaDB)
    memory = chroma.query(query_texts=[player_text], n_results=5)
    
    # 3. LLM: generar respuesta del NPC
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        system=f"You are {character_id}. {load_character_profile(character_id)}",
        messages=[
            *format_memory(memory["documents"]),
            {"role": "user", "content": player_text}
        ]
    )
    npc_text = response.content[0].text
    
    # 4. TTS: texto → audio del NPC (Piper MIT)
    audio_out = subprocess.run(
        ["piper", "--model", f"models/{character_id}.onnx"],
        input=npc_text.encode(), capture_output=True
    ).stdout
    
    # 5. Guardar en memoria
    chroma.add(documents=[f"Player: {player_text}\nNPC: {npc_text}"],
               ids=[str(uuid4())])
    
    return {"audio": base64.b64encode(audio_out), "text": npc_text}
```

**Repos**:
- [art-from-the-machine/Mantella](https://github.com/art-from-the-machine/Mantella) — MIT. Referencia completa de NPC voice pipeline.
- [SYSTRAN/faster-whisper](https://github.com/SYSTRAN/faster-whisper) — MIT. STT 4x más rápido que Whisper original.
- [rhasspy/piper](https://github.com/rhasspy/piper) — MIT. TTS rápido y natural, modelos por idioma/personaje.
- [chroma-core/chroma](https://github.com/chroma-core/chroma) — Apache-2.0. Vector DB para memoria.

**Costo**: $0 con modelos locales (Ollama + Piper). ~$0.03/minuto de conversación con Claude Haiku.
**Tiempo estimado**: 3-4 semanas para pipeline completo integrado en Godot.
**Deal size**: $80k-$200k para estudio que quiere NPCs con voz sin licencia de Inworld/Convai.

---

## Receta 8: Unity MCP 268 Tools — AI Dev Workflow

**Caso de uso**: Studio que usa Unity y quiere aceleración AI máxima. 268 herramientas MCP dan control total del editor desde Claude Code / Cursor.

**Stack**:
```
Claude Code (cliente MCP)
    ↕ MCP protocol (local socket)
Unity MCP Server (MIT)                ← 268 herramientas:
    ├── Scene management (create, modify, query scenes)
    ├── GameObject + Components (add, configure, remove)
    ├── C# Script generation + hot-reload
    ├── Build pipeline (trigger builds, read errors)
    ├── Profiler data (leer rendimiento en tiempo real)
    ├── Shader Graph + Amplify support
    ├── Terrain + Physics + NavMesh
    ├── Animation + Timeline
    └── Asset import + Material configuration
Unity Editor (Runtime)                 ← editor respondiendo a comandos AI
```

**Repos**:
- [AnkleBreaker-Studio/unity-mcp-server](https://github.com/AnkleBreaker-Studio/unity-mcp-server) — MIT. 268 tools MCP para Unity.

**Ejemplos de prompts MCP**:
```
"Create a third-person character controller with jump and sprint"
"Add a NavMesh agent to all enemy GameObjects in the scene"
"Profile the current build and identify the 3 biggest performance bottlenecks"
"Generate a shader that creates a dissolve effect from UV coordinates"
```

**Tiempo estimado**: setup en 1 día. ROI: 2-3x velocidad de desarrollo (reportado en campo).
**Deal size**: $40k-$120k como servicio de "AI-acceleration" para studio Unity.

---

## Receta 9: Carbon Engine + LangGraph — Agentes para MMO Persistente

**Caso de uso**: Proyecto de mundo persistente a escala MMO. Carbon Engine (MIT, jul 2026) como base, agentes LangGraph para entidades del mundo, Nakama para el backend social.

**Stack**:
```python
# world_agent.py — Agente de entidad del mundo MMO
from langgraph.graph import StateGraph, END
from anthropic import Anthropic

# Estado del agente: entidad persistente en el mundo
class WorldEntityState(TypedDict):
    entity_id: str
    location: dict
    inventory: list
    relationships: dict  # otros jugadores/entidades conocidos
    current_goal: str
    action_history: list

def build_entity_agent():
    """Agente LangGraph para entidad de mundo persistente (NPC o sistema)."""
    graph = StateGraph(WorldEntityState)
    
    # Nodo: percibir el mundo (Destiny physics + Trinity visual state)
    graph.add_node("perceive", perceive_world)
    
    # Nodo: planear (LLM con contexto de memoria)
    graph.add_node("plan", plan_action)
    
    # Nodo: actuar (Carbon Engine API → mover, interactuar, construir)
    graph.add_node("act", execute_action)
    
    # Nodo: actualizar memoria (Nakama storage)
    graph.add_node("remember", update_memory)
    
    graph.set_entry_point("perceive")
    graph.add_edge("perceive", "plan")
    graph.add_edge("plan", "act")
    graph.add_edge("act", "remember")
    graph.add_conditional_edges("remember", should_continue)
    
    return graph.compile()

async def plan_action(state: WorldEntityState):
    """LLM decides next action based on goal + world state."""
    client = Anthropic()
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        system=f"You are entity {state['entity_id']} in a persistent MMO world.",
        messages=[{
            "role": "user",
            "content": f"Goal: {state['current_goal']}\nLocation: {state['location']}\nNearby: {state['relationships']}\nWhat do you do next?"
        }]
    )
    return {"current_goal": parse_action(response.content[0].text)}
```

**Repos**:
- [orgs/carbonengine](https://github.com/orgs/carbonengine) — MIT. Carbon Engine (Trinity + Destiny). EVE Online engine.
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — MIT, 15k stars. Grafos de agentes stateful.
- [heroiclabs/nakama](https://github.com/heroiclabs/nakama) — Apache-2.0, 12.8k stars. Backend persistente.
- [joonspk-research/generative_agents](https://github.com/joonspk-research/generative_agents) — Apache-2.0. Patrón de memoria para entidades.

**Tiempo estimado**: 3-6 meses para prototipo MMO funcional sobre Carbon Engine.
**Deal size**: $300k-$1.5M para estudio de MMO o mundo virtual persistente.

---

## Receta 10: GamingAgent Evaluation — QA con Modelos Estándar

**Caso de uso**: Studio que quiere evaluar qué LLM/VLM es más adecuado para sus mecánicas de juego específicas antes de integrar en producción. Adaptar lmgame-Bench a los juegos propios.

**Stack**:
```python
# custom_game_eval.py — Adaptar GamingAgent para el juego propio
# Basado en lmgame-org/GamingAgent (MIT)

from gaming_agent import GamingAgent, GameEnvironment
import anthropic

class CustomGameEnv(GameEnvironment):
    """Adaptador para nuestro juego propio."""
    
    def get_observation(self) -> dict:
        """Screenshot + estado del juego como observación VLM."""
        screenshot = self.capture_screen()  # PIL Image
        game_state = self.read_game_state()  # dict con HP, position, objectives
        return {
            "image": screenshot,
            "state": game_state,
            "available_actions": self.get_valid_actions()
        }
    
    def step(self, action: str) -> tuple[dict, float, bool]:
        """Ejecutar acción y devolver (obs, reward, done)."""
        self.execute_action(action)
        obs = self.get_observation()
        reward = self.compute_reward()  # métrica de éxito del juego
        done = self.is_game_over()
        return obs, reward, done

# Evaluar Claude vs GPT-4o en nuestro juego
def run_comparative_eval(game_env: CustomGameEnv):
    models_to_test = [
        "claude-sonnet-5",          # Anthropic
        "gpt-4o",                   # OpenAI
        "claude-haiku-4-5-20251001", # Lightweight option
    ]
    
    results = {}
    for model in models_to_test:
        agent = GamingAgent(model=model, max_steps=100)
        score = agent.play_episode(game_env)
        results[model] = score
        print(f"{model}: {score:.2f}")
    
    return results  # → elegir el mejor modelo para integrar en NPCs/agents
```

**Repos**:
- [lmgame-org/GamingAgent](https://github.com/lmgame-org/GamingAgent) — MIT, 947 stars. ICLR 2026. Framework completo.
- [waynchi/gamedevbench](https://github.com/waynchi/gamedevbench) — MIT. 132 tareas Godot para benchmarking de game dev agents.

**Valor para cliente**: evaluar LLMs en el juego real antes de contratar. Decisión basada en datos, no en marketing.
**Tiempo estimado**: 1-2 semanas para adaptar el framework al juego propio.
**Deal size**: $20k-$60k como servicio de "AI model selection y evaluación para gaming".

---

## Receta 11: OmniGameArena — Evaluación VLM en Entornos UE5 Realistas

**Caso de uso**: Cliente con juego en Unreal Engine 5 quiere saber qué VLM (Claude, GPT-4o, Gemini) se desempeña mejor en sus mecánicas específicas, incluyendo escenarios PvP y Coop. Adaptar OmniGameArena a su juego para obtener datos de evaluación antes de integrar.

**Stack**:
```python
# omni_eval.py — Adaptar OmniGameArena al juego UE5 propio
# Basado en mxlin043/OmniGameArena (MIT, arXiv:2606.09826)

from omni_game_arena import GameArena, IDCEvaluator
import anthropic

class ClientGameUE5(GameArena):
    """Wrapper para el juego UE5 del cliente."""
    
    def capture_observation(self) -> dict:
        """Screenshot de UE5 + estado del juego como observación VLM."""
        frame = self.ue5_bridge.capture_frame()  # PIL Image desde UE5
        state = self.ue5_bridge.get_game_state()  # dict: score, health, position
        return {
            "image": frame,
            "state": state,
            "valid_actions": self.ue5_bridge.get_action_space()
        }
    
    def execute_action(self, action: str) -> float:
        """Ejecutar acción en UE5 y devolver reward."""
        self.ue5_bridge.send_action(action)
        reward = self.ue5_bridge.get_reward()  # métrica de éxito definida por cliente
        return reward

# Evaluación con Improvement Dynamics Curve (IDC)
# IDC mide no solo score frío sino cómo mejora el modelo con reflexión iterativa
evaluator = IDCEvaluator(rounds=5)  # 5 rondas de reflexión agentica

results = {}
for model_name in ["claude-sonnet-5", "gpt-4o", "claude-haiku-4-5-20251001"]:
    client_game = ClientGameUE5(model=model_name)
    idc_score = evaluator.evaluate(client_game)  # → curva de mejora por ronda
    results[model_name] = {
        "cold_start": idc_score.round_0,
        "after_5_reflections": idc_score.round_5,
        "improvement_rate": idc_score.improvement_delta
    }
    print(f"{model_name}: {idc_score.round_0:.2f} → {idc_score.round_5:.2f} (Δ{idc_score.improvement_delta:.2f})")

# Recomendación automática: usar el modelo con mejor cold_start para NPC reactivos
# y mejor improvement_rate para agentes que requieren planificación iterativa
```

**Repos**:
- [mxlin043/OmniGameArena](https://github.com/mxlin043/OmniGameArena) — MIT. arXiv:2606.09826 (jun 2026). Benchmark 12 juegos UE5.
- [lmgame-org/GamingAgent](https://github.com/lmgame-org/GamingAgent) — MIT. ICLR 2026. Complementar con evaluación en 7 juegos 2D.

**Ventaja vs P10** (GamingAgent): OmniGameArena evalúa en entornos 3D UE5 de producción + escenarios multiplayer (PvP/Coop) + IDC para medir capacidad de mejora.

**Tiempo estimado**: 2-3 semanas para adaptar al juego UE5 del cliente.
**Deal size**: $25k-$80k como servicio de evaluación VLM para gaming UE5.

---

## Receta 12: Orak MCP + Fine-tuning — Agent training sobre datos reales de PUBG

**Caso de uso**: Studio que quiere (a) evaluar qué LLM se comporta mejor en sus juegos Y (b) crear un LLM game agent especializado mediante fine-tuning sobre trayectorias expertas reales. Usar el dataset de Orak como punto de partida.

**Stack**:
```python
# orak_train_eval.py — Evaluar + fine-tunear LLM game agent con Orak (Krafton/MIT)
# Requiere: pip install orak anthropic

import orak
from orak import GameEnvironment, OrakBenchmark
from anthropic import Anthropic

# ─── FASE 1: Evaluación MCP-nativa ────────────────────────────────────────────
# Orak expone los entornos de juego como MCP tools — Claude Code los puede usar
# directamente via el cliente MCP sin código adicional.

benchmark = OrakBenchmark(
    games=["stardew_valley", "minecraft", "starcraft_ii"],  # subset del studio
    leaderboard_submit=True  # contribuye al leaderboard público de Krafton
)

client = Anthropic()
results = benchmark.evaluate(
    model="claude-sonnet-5",
    max_steps_per_game=200,
    agentic_strategy="reflection",  # usa reflexión iterativa estilo IDC
)
print(f"Average score: {results.mean_score:.2f}")
print(f"Best game: {results.top_game} ({results.top_score:.2f})")

# ─── FASE 2: Fine-tuning con dataset de Krafton ───────────────────────────────
# Orak incluye trayectorias de gameplay expertas para fine-tuning
# Aquí fine-tuneamos Llama-3.1-8B-Instruct (costo ~$30-100 en cloud) para
# que juegue específicamente el tipo de juego del cliente (e.g. RPG/strategy)

from orak.dataset import OrakDataset
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import LoraConfig, get_peft_model

# Cargar dataset filtrado por géneros relevantes para el cliente
dataset = OrakDataset.load(
    games=["darkest_dungeon", "slay_the_spire"],  # strategy/RPG
    split="train",
    format="chat"  # formateado como mensajes para chat models
)
print(f"Loaded {len(dataset)} expert gameplay trajectories")

# Fine-tuning con LoRA (eficiente en GPU A100 40GB, ~4-6 horas)
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.1-8B-Instruct")
lora_config = LoraConfig(r=16, lora_alpha=32, target_modules=["q_proj", "v_proj"])
model = get_peft_model(model, lora_config)

# trainer = SFTTrainer(model=model, train_dataset=dataset, ...)
# trainer.train()  # → modelo fine-tuned que domina el género

# ─── FASE 3: Comparar base model vs fine-tuned ───────────────────────────────
baseline = benchmark.evaluate(model="meta-llama/Llama-3.1-8B-Instruct")
finetuned = benchmark.evaluate(model="./orak-finetuned-strategy-llm")
print(f"Base model: {baseline.mean_score:.2f} → Fine-tuned: {finetuned.mean_score:.2f}")
```

**Repos**:
- [krafton-ai/Orak](https://github.com/krafton-ai/Orak) — MIT, 148 stars. Benchmark + dataset + MCP interface.

**Ablation studies disponibles en Orak**: input modality (vision vs text-only), estrategia agentica (one-shot vs reflection vs tree-search), efectos de fine-tuning.

**Tiempo estimado**: 1 semana para evaluación; 2-3 semanas para fine-tuning + validación.
**Costo GPU**: ~$30-100 para fine-tuning LoRA en A100 cloud (dataset <100MB).
**Deal size**: $30k-$80k como "Gaming AI model selection + fine-tuning service". Se puede extender a $150k-$400k si se integra el modelo fine-tuned en producción con NPCs o agentes de juego.

---

## Receta 13: Play2Code — Game prototyping con loop generate→playtest→fix

**Caso de uso**: Studio indie o estudio de gamificación que necesita prototipar mecánicas de juego rápidamente. El patrón Play2Code usa un agente generador de código + un GUI agent que juega el resultado, iterando hasta que el prototipo es jugable.

**Stack**:
```python
# play2code.py — Loop generate → playtest → fix para browser games
# Basado en arXiv:2605.28258. Requiere: pip install playwright anthropic

import asyncio
from anthropic import Anthropic
from playwright.async_api import async_playwright

client = Anthropic()

GAME_SPEC = """
RPG roguelite de 2 minutos: jugador vs 3 enemigos en grid 5x5.
Mecánicas: movimiento WASD, ataque spacebar, 3 HP por lado.
Win condition: eliminar todos los enemigos.
Implementar en HTML/CSS/JS, browser-runnable.
"""

PLAYTESTER_PROMPT = """
Eres un QA tester. Juega el browser game en este screenshot e informa:
1. ¿Se puede iniciar? ¿Hay errores en consola?
2. ¿Las mecánicas principales funcionan? (movimiento, ataque, victoria/derrota)
3. ¿Qué falla específicamente? Sé preciso para que el developer pueda corregirlo.
Rubric: pass si ≥80% de mecánicas funcionan sin errores críticos.
"""

async def generate_game(spec: str, prev_feedback: str = "") -> str:
    """Agente 1: genera/corrige código del juego."""
    messages = [{"role": "user", "content": f"Spec: {spec}\n\nFeedback del playtester: {prev_feedback}\n\nGenera/corrige el juego. Devuelve solo el HTML completo." if prev_feedback else f"Spec: {spec}\n\nGenera el juego completo como un solo archivo HTML."}]
    response = client.messages.create(model="claude-sonnet-5", max_tokens=8000, messages=messages)
    return response.content[0].text

async def playtest_game(html: str) -> dict:
    """Agente 2 (GUI): abre el juego en browser y lo juega."""
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.set_content(html)
        await asyncio.sleep(2)  # esperar render
        
        # Capturar screenshot + errores de consola
        errors = []
        page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)
        screenshot = await page.screenshot(type="png")
        
        # Jugar: intentar mecánicas básicas
        await page.keyboard.press("w")  # movimiento
        await page.keyboard.press("Space")  # ataque
        await asyncio.sleep(1)
        screenshot_after = await page.screenshot(type="png")
        
        await browser.close()
    
    # LLM evalúa el estado del juego
    eval_response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=500,
        messages=[{"role": "user", "content": [
            {"type": "text", "text": PLAYTESTER_PROMPT},
            {"type": "image", "source": {"type": "base64", "media_type": "image/png", "data": screenshot_after.hex()}},
            {"type": "text", "text": f"Errores de consola: {errors}"}
        ]}]
    )
    feedback = eval_response.content[0].text
    passed = "pass" in feedback.lower()
    return {"passed": passed, "feedback": feedback, "errors": errors}

async def play2code_loop(spec: str, max_iterations: int = 5):
    """Loop principal: generar → playtest → corregir hasta pasar el rubric."""
    feedback = ""
    for i in range(max_iterations):
        print(f"\n── Iteración {i+1}/{max_iterations} ──")
        html = await generate_game(spec, feedback)
        result = await playtest_game(html)
        print(f"Estado: {'✅ PASS' if result['passed'] else '❌ FAIL'}")
        print(f"Feedback: {result['feedback'][:200]}...")
        
        if result["passed"]:
            print(f"\n🎮 Juego jugable en {i+1} iteración(es).")
            with open("prototype.html", "w") as f:
                f.write(html)
            return html
        
        feedback = result["feedback"]
    
    print(f"⚠️ No se alcanzó pass en {max_iterations} iteraciones.")
    return html

# Ejecutar
asyncio.run(play2code_loop(GAME_SPEC))
```

**Repos**:
- Patrón basado en: arXiv:2605.28258 (Play2Code, PlaytestArena — mayo 2026)
- [microsoft/playwright](https://github.com/microsoft/playwright) — Apache-2.0. GUI agent automation.
- Claude API (Anthropic) — modelo `claude-sonnet-5` para generación, `claude-haiku-4-5-20251001` para playtesting económico.

**Resultados del paper**: 66.8% pass-rate vs 37.1% single-pass baseline. Cada iteración mejora ~14.6 puntos de pass-rate en promedio.

**Tiempo estimado**: setup en 3-5 días. Prototipo jugable en <2 horas de compute.
**Costo compute**: ~$0.10-$0.50 por prototipo (5 iteraciones máx, Claude Haiku para playtesting).
**Deal size**: $30k-$100k para studio que necesita "rapid game prototyping AI service" — generar 10+ prototipos jugables/día vs días por prototipo con equipo humano.

---

## Tabla resumen

| Patrón | Stack principal | Esfuerzo | ROI esperado | Deal size |
|--------|----------------|---------|--------------|----------|
| P1: NPC con LLM | Godot + LimboAI + Ollama/Claude | 2-3 semanas | +40% immersion | $40k-$150k |
| P2: QA automatizado con RL | Godot + godot_rl_agents + SB3 | 3-4 semanas | -60% QA manual | $60k-$200k |
| P3: Multiplayer backend inteligente | Nakama + Open Match + PostHog | 3-4 semanas | Matchmaking mejor → retención | $80k-$250k |
| P4: Mundo procedural | Godot + WFC + LLM + Concordia | 4-8 semanas | Contenido infinito, replayability | $100k-$400k |
| P5: Game Support Agent | LlamaIndex + FastAPI + Godot UI | 1-2 semanas | -70% tickets soporte manual | $20k-$80k |
| P6: AI Dev Tooling (Godot) | godot-ai + Claude Code/Cursor | 1 día setup | 2-3x velocidad desarrollo | $20k-$60k |
| P7: NPC con Voz Completa | Mantella + Faster-Whisper + Piper + LLM | 3-4 semanas | NPCs vivos sin Inworld/Convai | $80k-$200k |
| P8: Unity MCP 268 Tools | Unity MCP Server + Claude Code | 1 día setup | 2-3x velocidad en Unity | $40k-$120k |
| P9: Carbon Engine + LangGraph MMO | Carbon + LangGraph + Nakama | 3-6 meses | MMO persistent world OSS | $300k-$1.5M |
| P10: GamingAgent Evaluation | lmgame-org + custom adapter (Godot/2D) | 1-2 semanas | Modelo correcto antes de integrar | $20k-$60k |
| P11: OmniGameArena Evaluation (UE5) | OmniGameArena + IDC + UE5 bridge | 2-3 semanas | VLM correcto para entorno 3D/multiplayer | $25k-$80k |
| P12: Orak MCP + Fine-tuning | Krafton Orak + LoRA + Llama | 1-3 semanas | LLM game agent especializado | $30k-$400k |
| P13: Play2Code Prototyping | Claude + Playwright GUI agent loop | 3-5 días | Prototipos jugables en horas, no semanas | $30k-$100k |

---
*Repos verificados en GitHub 2026-07-10. URLs directas incluidas. Orak (Krafton) añadido jul-2026. Play2Code (arXiv:2605.28258) añadido jul-2026. Morgan Stanley $22B → ROI framing actualizado.*
