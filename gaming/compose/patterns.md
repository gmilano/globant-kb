# Patrones de composición — Gaming AI

> Recetas concretas para construir soluciones. Repos verificados, URLs reales.
> Última actualización: 2026-07-12

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
Godot 4.4 (MIT)                        ← engine del juego
└── LimboAI (MIT)                       ← behavior tree del NPC
    └── BTState con trigger HTTP         ← dispara llamada al LLM
        └── Claude Haiku / Ollama       ← LLM (cloud o local)
            └── pre-conversation.json   ← personalidad + conocimiento del personaje
                └── ChromaDB / Qdrant   ← vector store para memoria episódica
```

**Repos**:
- [limbonaut/limboai](https://github.com/limbonaut/limboai) — MIT, 2.8k stars. BTs + HSMs para Godot.
- [bitbrain/beehave](https://github.com/bitbrain/beehave) — MIT, 3.2k stars. BTs componibles alternativo.
- [AkshitIreddy/Interactive-LLM-Powered-NPCs](https://github.com/AkshitIreddy/Interactive-LLM-Powered-NPCs) — MIT, 716 stars. Referencia de implementación con voz + memoria.
- [undreamai/LLMUnity](https://github.com/undreamai/LLMUnity) — Apache-2.0, 1.7k stars. Para Unity en vez de Godot.

**Cómo conectar**:
1. Instalar LimboAI como plugin en Godot 4.4.
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
Godot 4.4 (MIT)                         ← juego a testear como entorno RL
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
3. Definir la reward function: +reward por área nueva explorada, +reward por estados inválidos (out-of-bounds, NaN values), -reward por acciones repetitivas.
4. Entrenar durante 1-5M steps con PPO vía SB3.
5. El agente entrenado corre el juego 24/7 detectando regresiones.

**Tiempo estimado**: 1-2 semanas para primer agente; 3-4 semanas para sistema de QA completo.
**ROI**: reducción de 60-70% en QA manual según benchmarks de la industria.

---

## Receta 3: Backend inteligente con Nakama + AI (matchmaking y engagement)

**Caso de uso**: Matchmaking predictivo por skill, anti-cheat conductual, notificaciones de re-engagement.

**Stack**:
```
Nakama (Apache-2.0)                      ← backend multiplayer
└── TypeScript runtime hooks              ← lógica server-side
    └── TensorFlow.js / ONNX Runtime     ← modelos ML en Node.js
        ├── Matchmaking ML               ← predice "match quality" antes de confirmar
        ├── Anti-cheat GNN               ← detecta boosting / account sharing
        └── Churn predictor              ← activa rewards para jugadores en riesgo
```

**Repos**:
- [heroiclabs/nakama](https://github.com/heroiclabs/nakama) — Apache-2.0, 12.8k stars. Core backend.
- [googleforgames/open-match](https://github.com/googleforgames/open-match) — Apache-2.0. Matchmaking enchufable.
- [PostHog/posthog](https://github.com/PostHog/posthog) — MIT, 23k stars. Player events.
- [pytorch/geometric](https://github.com/pyg-team/pytorch_geometric) — MIT, 22k stars. GNNs para churn (PyTorch Geometric).

**Cómo conectar**:
1. Implementar Nakama hook `matchmakerMatched` → llamar a modelo ML que puntúa el "match quality" → confirmar o rechazar.
2. Log de eventos a PostHog via SDK TypeScript → feature engineering para modelo churn.
3. Entrenar GNN con PyTorch Geometric sobre grafo jugador-partida → exportar a ONNX → cargar en hook Nakama.
4. Open Match para cola de matchmaking con función de evaluación personalizada.

**Tiempo estimado**: 3-4 semanas para matchmaking ML; 4-6 semanas para churn + anti-cheat.

---

## Receta 4: Editor AI-assisted con MCP (godot-ai + Claude Code)

**Caso de uso**: Desarrollo de juego asistido por AI directamente en el editor Godot. Velocidad 2x en producción de contenido.

**Stack**:
```
Godot 4.4 (MIT)                          ← editor del juego
└── godot-ai (MIT)                        ← MCP server: 120+ operaciones, 41 tools
    └── Claude Code / Cursor              ← LLM con acceso al editor via MCP
        ├── Build scenes desde descripción
        ├── Generar scripts GDScript
        ├── Wire signals automáticamente
        └── Refactoring y debugging
```

**Repos**:
- [hi-godot/godot-ai](https://github.com/hi-godot/godot-ai) — MIT, 805 stars. MCP server Godot.

**Cómo conectar**:
1. Instalar godot-ai como addon en Godot 4.4.
2. Configurar Claude Code con el MCP server de godot-ai (puerto local).
3. Usar prompts en lenguaje natural para crear escenas, scripts, y assets directamente en el editor.
4. Combinar con LimboAI para generar behavior trees desde descripción de comportamiento.

**Tiempo estimado**: 1-2 días para setup; beneficio inmediato en productividad.
**Benchmark**: caso *Zombonks* (Unreal Aura, similar): lanzamiento en 5 meses vs 10+ estimados.

---

## Receta 5: Generación procedural de juegos web con OpenGame

**Caso de uso**: Prototipado ultra-rápido o generación de contenido de juegos desde prompts de texto.

**Stack**:
```
OpenGame framework (Apache-2.0)          ← framework agentico
└── GameCoder-27B                        ← LLM especializado (RL-trained en game code)
    └── OpenGame-Bench                   ← evaluación: Build Health + Visual Usability + Intent Alignment
        └── Headless browser execution   ← validación automática del juego generado
```

**Repos**:
- [leigest519/OpenGame](https://github.com/leigest519/OpenGame) — Apache-2.0, ~2.3k stars. Framework completo.

**Cómo usar**:
1. Instalar OpenGame framework (TypeScript/Node.js).
2. Describir el juego en texto: "Crea un juego de plataformas con enemigos que aumentan de velocidad cada nivel".
3. OpenGame genera el código del juego web completo, lo ejecuta en headless browser, lo evalúa.
4. Iterar sobre el resultado con más prompts.

**Tiempo estimado**: Minutos para un prototipo básico; horas para un juego completo.
**Limitación**: Juegos web (HTML5/JavaScript). No aplica para Unity/Godot/Unreal nativos.

---

## Receta 6: MMO con Carbon Engine + AI de Facciones (NUEVO Jul 2026)

**Caso de uso**: Construir un MMO desde base AAA probada en producción con simulación de facciones driven by AI.

**Stack**:
```
Carbon Engine (MIT)                      ← engine de EVE Online (Fenris Creations)
└── Destiny module                       ← física + pathfinding server-authoritative
└── Trinity module                       ← rendering
└── Capa AI:
    ├── LLMs para NPCs de facción        ← diálogo + decisiones diplomáticas
    ├── Concordia (Apache-2.0)           ← simulación social de agentes NPC
    ├── RL para comportamiento           ← facciones aprenden del comportamiento de jugadores
    └── PostHog + Grafana               ← analytics de jugadores en tiempo real
```

**Repos**:
- [carbonengine org](https://github.com/carbonengine) — MIT / Apache-2.0. 20+ módulos (nuevo Jul 2026).
- [google-deepmind/concordia](https://github.com/google-deepmind/concordia) — Apache-2.0, 1.5k stars. Simulación social LLM.
- [PostHog/posthog](https://github.com/PostHog/posthog) — MIT, 23k stars.

**Notas**:
- **Estado**: Carbon Engine recién open-sourced (1 Jul 2026). Comunidad en formación.
- Evaluar en 6-12 meses cuando el ecosistema OSS madure.
- Ideal para proyectos enterprise con 18+ meses de runway.

**Tiempo estimado**: 6-12 meses para MMO completo sobre Carbon Engine.

---

## Receta 7: Analytics + Churn Prediction con GNNs

**Caso de uso**: Predecir churn de jugadores F2P 14 días en adelante para activar retención proactiva.

**Stack**:
```
PostHog (MIT)                            ← player event collection
└── Python pipeline                      ← feature engineering
    └── PyTorch Geometric (MIT)          ← GNN sobre grafo jugador-sesión-amigos
        └── Modelo GNN entrenado         ← AUROC 75.83 (vs 62.44 LightGBM baseline)
            └── Score diario por jugador
                └── Nakama hook          ← activa reward si score > umbral
```

**Repos**:
- [PostHog/posthog](https://github.com/PostHog/posthog) — MIT, 23k stars. Eventos de jugador.
- [pyg-team/pytorch_geometric](https://github.com/pyg-team/pytorch_geometric) — MIT, 22k stars. GNNs.
- [grafana/grafana](https://github.com/grafana/grafana) — Apache-2.0, 67k stars. Dashboards.

**Cómo construir el grafo**:
- Nodos: jugadores, sesiones, ítems comprados, amigos.
- Edges: jugó-en, compró, es-amigo-de, invitó-a.
- Features de nodo: session_length, days_since_login, spend_total, friend_count.
- Target: churn_in_14_days (binario).

**Tiempo estimado**: 4-6 semanas para pipeline completo con modelo y dashboard.
**Impacto esperado**: 20-35% reducción de churn con sistema de rewards basado en score.

---
*Todas las recetas usan repos verificados con URLs reales. Licencias MIT/Apache-2.0 aptas para uso comercial. Actualizado 2026-07-12.*
