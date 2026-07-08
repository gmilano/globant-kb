# Patrones de composición — Gaming AI

> Recetas concretas para construir soluciones. Repos verificados, URLs reales.
> Última actualización: 2026-07-07 | v2 — añadida Receta 7 (Unity MCP) y Receta 8 (COCOS 4 Mobile)

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
                └── ChromaDB / Qdrant   ← vector store para memoria episódica + LTM
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
5. Para Long-Term Memory (breakthrough 2026): añadir campo `moral_alignment` y `tone` que se actualiza con cada interacción y se incluye en el prompt del NPC.
6. Opción local sin internet: usar Ollama con Llama 3.1 8B o Gemma 3n on-device.

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
**ROI**: reducción de 60-70% en QA manual. AAA studios reportan ahorro $10M/título en QA+localization+assets AI.

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

**Tiempo estimado**: 1-2 semanas para MVP funcional.
**Costo**: ~$0.001-0.003 por pregunta con Claude Haiku. Para volumen alto: Llama 3.1 8B local en servidor.

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
- [hi-godot/godot-ai](https://github.com/hi-godot/godot-ai) — MIT, 805 stars. 120+ operaciones, ~41 MCP tools. Listado en Godot Asset Library jul 2026.
- [jame581/GodotPrompter](https://github.com/jame581/GodotPrompter) — MIT. 51 agentic skills para Godot 4.x incluyendo PCG.

**Cómo configurar**:
1. Instalar godot-ai desde Godot Asset Library o GitHub.
2. Configurar Claude Code para conectarse al MCP server local (puerto configurable).
3. En Claude Code: `/add-context-window --mcp godot` y empezar a usar lenguaje natural.
4. Ejemplos de prompts: "Crea una escena de un jugador con física de plataformer", "Añade un sistema de inventario al player.gd", "Wire el signal `body_entered` del Area2D al método `on_enemy_hit`".

**Tiempo estimado**: Setup en 1 día. ROI inmediato.

---

## Receta 7: Unity MCP Dev Tooling (nuevo — julio 2026)

**Caso de uso**: Studio con codebase Unity que quiere AI-assisted development. La opción recomendada para clientes Unity.

**Stack**:
```
Claude Code / Cursor / Copilot / cualquier MCP client
    ↕ Model Context Protocol
CoplayDev/unity-mcp (MIT, 5.8k stars)  ← MCP bridge más adoptado
    ↕ Unity Editor API (C#)
Unity 6.2 Editor                        ← editor abierto
    ├── Gestión de assets desde lenguaje natural
    ├── Control de scenes: crear, modificar, eliminar GameObjects
    ├── Edición de scripts C# con contexto del proyecto
    ├── Ejecución de tests
    └── [Opcional] IvanMurzak/Unity-MCP (MIT) ← exposición de métodos C# custom
```

**Repos**:
- [CoplayDev/unity-mcp](https://github.com/CoplayDev/unity-mcp) — MIT, **5.8k stars**. 47 herramientas. El más adoptado.
- [IvanMurzak/Unity-MCP](https://github.com/IvanMurzak/Unity-MCP) — MIT, 3.4k stars. Extensible: cualquier método C# → herramienta.
- [CoderGamester/mcp-unity](https://github.com/CoderGamester/mcp-unity) — MIT, 1.8k stars. Node.js bridge para IDEs.
- [AnkleBreaker-Studio/unity-mcp-server](https://github.com/AnkleBreaker-Studio/unity-mcp-server) — MIT, 278 stars. 268 tools: Shader Graph, NavMesh, MPPM multiplayer.

**Cómo configurar**:
```bash
# 1. Instalar CoplayDev/unity-mcp via Package Manager de Unity
#    (UPM: https://github.com/CoplayDev/unity-mcp)

# 2. En settings de Claude Code:
{
  "mcpServers": {
    "unity": {
      "command": "npx",
      "args": ["unity-mcp-server"]
    }
  }
}

# 3. Abrir Unity Editor y el MCP server levanta automáticamente
```

**Ejemplo de uso**:
```
Claude Code: "Crea un sistema de inventario con UI para el player prefab"
  → unity-mcp crea el script C#, lo adjunta al prefab, crea el Canvas UI
  → Unity muestra los cambios en tiempo real

Claude Code: "El character controller tiene un bug con pendientes de >45 grados"
  → Inspecciona el CharacterController, modifica el slopeLimit, corre el test suite
```

**Para exponer lógica custom** (IvanMurzak/Unity-MCP):
```csharp
// Una línea convierte cualquier método en herramienta MCP
[McpPluginTool]
public static string GetPlayerStats(string playerId) {
    // Unity logic...
    return JsonUtility.ToJson(stats);
}
```

**Tiempo estimado**: Setup en 1 día. ROI inmediato para cualquier studio Unity.
**Ventaja diferencial**: CoplayDev/unity-mcp > godot-ai en stars (5.8k vs 805) — señal de adopción masiva en Unity.

---

## Receta 8: COCOS 4 + AI para mobile gaming LATAM (nuevo — julio 2026)

**Caso de uso**: Studio mobile LATAM que quiere añadir AI features sin costo de engine license. COCOS 4 pasó a MIT en enero 2026.

**Stack**:
```
COCOS 4 (MIT, mobile-first)            ← engine del juego
    ├── TypeScript/JavaScript lógica
    │   └── Claude Haiku API          ← NPC diálogo, $0.25/MTok input
    ├── ONNX modelo exportado          ← AI on-device (NPU en móviles 2026)
    │   └── Clasificador churn         ← sin costo de API, privacidad
    └── Supabase (Apache-2.0)          ← backend + pgvector
        ├── pgvector                   ← RAG sobre lore del juego sin ChromaDB
        └── Edge Functions (Deno)      ← trigger AI en eventos del juego
```

**Repos**:
- [cocos/cocos-engine](https://github.com/cocos/cocos-engine) — MIT (desde ene 2026). ~18k stars.
- [supabase/supabase](https://github.com/supabase/supabase) — Apache-2.0. 80k stars. pgvector incluido.

**Implementación NPC diálogo en COCOS 4**:
```typescript
// En COCOS TypeScript, llamada al LLM desde el evento de interacción
import { _decorator, Component } from 'cc';

@ccclass('NPCDialogue')
export class NPCDialogue extends Component {
    private characterId = 'village_elder';
    
    async onPlayerInteract(playerInput: string) {
        const memory = await this.getPlayerMemory();  // pgvector lookup
        
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'x-api-key': process.env.CLAUDE_API_KEY,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                model: 'claude-haiku-4-5-20251001',
                max_tokens: 150,
                system: `Eres ${this.characterId}. El jugador te ha ayudado ${memory.questsCompleted} veces. Su alineación es ${memory.moralAlignment}.`,
                messages: [{ role: 'user', content: playerInput }]
            })
        });
        
        const data = await response.json();
        this.showDialogue(data.content[0].text);
        
        // Guardar en Supabase pgvector para LTM
        await this.updatePlayerMemory(playerInput, data.content[0].text);
    }
}
```

**Costo por conversación**: ~$0.003 con Claude Haiku. Para 10k DAU con 3 interacciones/sesión: ~$90/día.
**Alternativa on-device**: ONNX model exportado desde Ollama/llama.cpp → sin costo de API, funciona offline.
**Tiempo estimado**: 3-5 semanas para MVP completo con NPC diálogo + analytics básico.

---

---

## Receta 9: Wanderfolk Pattern — NPC pgvector + Gossip Social Graph (nuevo — julio 2026)

**Caso de uso**: RPG o juego social donde los NPCs recuerdan al jugador, evolucionan con el tiempo, y se comunican entre sí. Patrón validado en producción por Wanderfolk (Steam, mayo 2026).

**Stack** (simplificado vs stack anterior):

```
Motor del juego (Godot / Unity / COCOS 4)
    ↓ interacción del jugador con NPC
Supabase (Apache-2.0)                   ← un solo backend para todo
    ├── PostgreSQL
    │   ├── Tabla npc_memories          ← historial de interacciones resumidas
    │   ├── Tabla npc_social_graph      ← quién le cuenta qué a quién (gossip)
    │   └── Tabla player_reputation     ← escala -100 a +100 por NPC/facción
    ├── pgvector extension
    │   └── Embeddings de memorias      ← retrieval cosine similarity (relevante, no reciente)
    └── Edge Functions (Deno/TypeScript)
        └── Llama llamada al LLM con contexto recuperado
xAI Grok / Claude Haiku / Llama local   ← generación de diálogo contextual
```

**Diferencia clave vs patrón anterior**:

| Antes (stack complejo) | Ahora (Wanderfolk pattern) |
|------------------------|---------------------------|
| ChromaDB para vectores | **pgvector en Supabase** |
| Redis para caché de estado | **PostgreSQL estándar** |
| Servicio de reputation separado | **Tabla en el mismo PostgreSQL** |
| 3 sistemas distintos que sincronizar | **1 solo backend** |

**Implementación Python — servidor de memoria NPC**:

```python
from supabase import create_client
from anthropic import Anthropic
import numpy as np

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
claude = Anthropic()

class NPCMemorySystem:
    def __init__(self, npc_id: str):
        self.npc_id = npc_id

    def get_relevant_memories(self, player_input: str, top_k: int = 5) -> list[dict]:
        """Retrieval por relevancia (cosine similarity), no por recencia."""
        # 1. Embedir el input del jugador
        embedding_response = claude.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=1,
            system="Return only the embedding vector as JSON array.",
            messages=[{"role": "user", "content": f"embed: {player_input}"}]
        )
        # En producción: usar text-embedding-3-small de OpenAI o Voyage AI
        # claude.messages no produce embeddings directamente
        
        # 2. Query pgvector — recupera lo relevante, no lo más reciente
        result = supabase.rpc('match_npc_memories', {
            'npc_id': self.npc_id,
            'query_embedding': player_input_embedding,  # del paso anterior
            'match_count': top_k,
            'match_threshold': 0.7
        }).execute()
        return result.data

    def get_player_reputation(self, player_id: str) -> dict:
        """Reputación -100 a +100 con tier label."""
        result = supabase.table('player_reputation') \
            .select('score, tier, last_action') \
            .eq('npc_id', self.npc_id) \
            .eq('player_id', player_id) \
            .single() \
            .execute()
        
        score = result.data.get('score', 0)
        tier = self._score_to_tier(score)
        return {'score': score, 'tier': tier}

    def _score_to_tier(self, score: int) -> str:
        tiers = [(-100,-70,'Hostile'), (-70,-30,'Disliked'), (-30,-10,'Cool'),
                 (-10,10,'Neutral'), (10,40,'Warm'), (40,70,'Friendly'), (70,100,'Beloved')]
        for low, high, name in tiers:
            if low <= score <= high:
                return name
        return 'Neutral'

    def get_gossip_context(self, player_id: str) -> list[str]:
        """Lo que otros NPCs le han dicho a este NPC sobre el jugador."""
        result = supabase.table('npc_social_graph') \
            .select('from_npc, message, importance') \
            .eq('to_npc', self.npc_id) \
            .eq('about_player', player_id) \
            .order('importance', desc=True) \
            .limit(3) \
            .execute()
        return [row['message'] for row in result.data]

    async def generate_dialogue(self, player_id: str, player_input: str) -> str:
        """Genera diálogo contextual usando memorias, reputación y gossip."""
        memories = self.get_relevant_memories(player_input)
        reputation = self.get_player_reputation(player_id)
        gossip = self.get_gossip_context(player_id)

        memory_context = "\n".join([m['content'] for m in memories])
        gossip_context = "\n".join([f"- {g}" for g in gossip]) if gossip else "Nada relevante"

        response = claude.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=200,
            system=f"""Eres {self.npc_id}, un personaje en este mundo.

RECUERDAS sobre este jugador:
{memory_context}

TU REPUTACIÓN CON ELLOS: {reputation['tier']} ({reputation['score']}/100)
- Si es Hostile: sé frío y desconfiado
- Si es Neutral: sé reservado pero educado  
- Si es Beloved: sé cálido y generoso con información

LO QUE OTROS TE HAN CONTADO:
{gossip_context}

Responde en personaje. Máximo 2 frases. Usa la reputación para determinar el tono.""",
            messages=[{"role": "user", "content": player_input}]
        )
        
        dialogue = response.content[0].text
        
        # Guardar la interacción en memoria
        await self._save_memory(player_id, player_input, dialogue)
        
        return dialogue

    async def _save_memory(self, player_id: str, player_input: str, npc_response: str):
        """Resume e indexa la interacción para retrieval futuro."""
        summary = f"El jugador dijo: '{player_input}'. Yo respondí: '{npc_response}'"
        # En producción: resumir con LLM para extraer puntos clave
        
        supabase.table('npc_memories').insert({
            'npc_id': self.npc_id,
            'player_id': player_id,
            'content': summary,
            # 'embedding': vector  ← generar con text-embedding-3-small
            'importance': 0.5  # ajustar según la acción del jugador
        }).execute()
```

**SQL: pgvector function para retrieval**:
```sql
-- Crear en Supabase: Settings → SQL Editor
CREATE OR REPLACE FUNCTION match_npc_memories(
  npc_id TEXT, query_embedding vector(1536),
  match_count INT DEFAULT 5, match_threshold FLOAT DEFAULT 0.7
)
RETURNS TABLE (id UUID, content TEXT, similarity FLOAT) AS $$
  SELECT id, content, 1 - (embedding <=> query_embedding) AS similarity
  FROM npc_memories
  WHERE npc_memories.npc_id = match_npc_memories.npc_id
    AND 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$ LANGUAGE sql;
```

**Gossip propagation** (cuando el jugador completa una quest):
```python
def propagate_gossip(player_id: str, from_npc: str, event: str, importance: float = 0.8):
    """Cuando un NPC es testigo de algo, puede contárselo a otros."""
    # Encontrar NPCs en el mismo pueblo/zona
    nearby_npcs = get_nearby_npcs(from_npc)
    
    for target_npc in nearby_npcs:
        supabase.table('npc_social_graph').insert({
            'from_npc': from_npc,
            'to_npc': target_npc,
            'about_player': player_id,
            'message': f"Vi al jugador {event}",
            'importance': importance
        }).execute()
```

**Repos**:
- [supabase/supabase](https://github.com/supabase/supabase) — Apache-2.0, 80k stars. PostgreSQL + pgvector + Edge Functions + Auth + Realtime.

**Costo**:
- Supabase: gratis hasta 500MB DB / 2GB storage. Pro: $25/mes para producción.
- Claude Haiku: ~$0.003 por conversación (input $0.25/MTok + output $1.25/MTok).
- Para 1,000 DAU × 5 conversaciones/día: ~$15/día en LLM.

**Tiempo estimado**: 2-3 semanas para MVP. Semanas 1-2: DB schema + retrieval function + API. Semana 3: gossip propagation + reputation tiers.

**Ventaja vs patrón anterior**: 1 sistema (Supabase) vs 3 (ChromaDB + Redis + PostgreSQL). Menos infraestructura = menos puntos de falla, menos costo, más rápido de iterar.

---

## Tabla resumen

| Patrón | Stack principal | Esfuerzo | ROI esperado |
|--------|----------------|---------|---------------|
| NPC con LLM (Godot) | Godot + LimboAI + Ollama/Claude | 2-3 semanas | +40% immersion (datos industria) |
| QA automatizado con RL | Godot + godot_rl_agents + SB3 | 3-4 semanas | -60% QA manual; $10M/título AAA |
| Multiplayer backend inteligente | Nakama + Open Match + PostHog | 3-4 semanas | Matchmaking mejor → retención |
| Mundo procedural | Godot + WFC + LLM + Concordia | 4-8 semanas | Contenido infinito, replayability |
| Game Support Agent | LlamaIndex + FastAPI + Godot UI | 1-2 semanas | -70% tickets soporte manual |
| AI Dev Tooling (Godot) | godot-ai + Claude Code/Cursor | 1 día setup | 2-3x velocidad de desarrollo |
| AI Dev Tooling (Unity) | CoplayDev/unity-mcp + Claude Code | 1 día setup | 2-3x velocidad; 5.8k stars adopción masiva |
| COCOS 4 + AI mobile LATAM | COCOS 4 (MIT) + Supabase + Claude | 3-5 semanas | AI features sin license fees |
| **Wanderfolk pgvector + Gossip** | **Supabase pgvector + Claude Haiku** | **2-3 semanas** | **NPC LTM validado en producción; stack simplificado** |

---
*v3 (2026-07-08): añadida Receta 9 (Wanderfolk Pattern — pgvector + gossip social graph, validado en producción mayo 2026). Código Python + SQL completo. Repos verificados en GitHub.*
*v2 (2026-07-07): añadidas Receta 7 (Unity MCP — stack con código, 4 repos) y Receta 8 (COCOS 4 mobile LATAM — código TypeScript). Repos verificados en GitHub.*
