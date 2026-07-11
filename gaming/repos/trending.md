# Repos trending — Gaming AI

> Señales del pipeline + análisis manual. Última actualización: 2026-07-11 | v9

## Trending con tracción real (verificado manualmente)

| Repo | Licencia | Descripción | Stars | Señal |
|------|----------|-------------|-------|-------|
| [hi-godot/godot-ai](https://github.com/hi-godot/godot-ai) | MIT | MCP server para Godot. 120+ ops, 41 tools. Conecta Claude Code/Cursor al editor Godot en vivo. | 900+ | Lanzado abr 2026; adopción masiva en estudios indie |
| [google-deepmind/concordia](https://github.com/google-deepmind/concordia) | Apache-2.0 | Simulación multi-agente generativa. v2.0 jun 2026. Game Master + agentes LLM para mundos NPCs autónomos. | 1.5k | v2.0 jun 2026, soporte para RPGs y MMOs |
| [leigest519/OpenGame](https://github.com/leigest519/OpenGame) | MIT | Framework agentico end-to-end para generar juegos web. GameCoder-27B (LLM RL-entrenado). | ~500 | Primer framework de su tipo, abr 2026 |
| [AlanLaboratory/UnrealMLAgents](https://github.com/AlanLaboratory/UnrealMLAgents) | Apache-2.0 | Port de Unity ML-Agents para Unreal Engine. Deep RL para juegos UE. v1.0 en 2025. | 200+ | Comunidad Unreal adoptando RL |
| [pamirtuna/gamestudio-subagents](https://github.com/pamirtuna/gamestudio-subagents) | MIT | Equipo de sub-agentes AI en terminal: dev, QA, artist, game designer. | 150+ | Patrón "AI dev team" aplicado a gaming |
| [Yuan-ManX/ai-game-devtools](https://github.com/Yuan-ManX/ai-game-devtools) | MIT | Hub curado: LLMs, world models, textures, shaders, 3D, audio, analytics para game dev. | 800+ | Lista de referencia más completa del ecosistema |
| [undreamai/LLMUnity](https://github.com/undreamai/LLMUnity) | Apache-2.0 | Personajes Unity con LLMs locales o cloud. On-device inference. | 1.7k | Creciendo en Unity ecosystem |
| [NPC-Worldwide/npcpy](https://github.com/NPC-Worldwide/npcpy) | MIT | Librería Python para NPCs multimodales con LLMs. | 1.4k | Tracción en comunidad Python/AI |
| [Yuan-ManX/AI-Native-Game](https://github.com/Yuan-ManX/AI-Native-Game) | MIT | Tracking de juegos donde la AI ES el juego (world models, generative environments). | 300+ | Categoría emergente: AI-native games |
| [stride3d/stride](https://github.com/stride3d/stride) | MIT | Engine C# cross-platform (ex-Xenko). Alternativa a Unity para devs .NET. | 7.7k | Engine maduro, alternativa Unity sin drama de pricing |
| [SKYHUBDev/Aivill](https://github.com/SKYHUBDev/Aivill) | MIT | Villanos adaptativos que aprenden el comportamiento del jugador y evolucionan estrategias. | 100+ | Concepto relevante, observar crecimiento |

## Motores en radar

| Repo | Licencia | Descripción | Stars | Por qué |
|------|----------|-------------|-------|---------|
| [oxylusengine/Oxylus](https://github.com/oxylusengine/Oxylus) | Apache-2.0 | Game engine C++ data-driven con Vulkan. | 263 | Moderno, base sólida para experimentación |
| [Coding-Solo/godot-mcp](https://github.com/Coding-Solo/godot-mcp) | MIT | MCP server alternativo para Godot. Lanzar editor, correr proyectos, debug output. | 500+ | Complemento a godot-ai para workflows CI/CD |

## Frameworks agenticos con adopción en gaming

| Repo | URL | Licencia | Stars | Aplicación gaming |
|------|-----|----------|-------|-------------------|
| **LangGraph** | [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | 34.5k | Grafos de agentes con estado persistente. Para NPCs con memoria y planificación compleja. |
| **CrewAI** | [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | 44k+ | Multi-agente con roles. Para QA pipelines, PCG con agentes especializados, game design. |
| **LangChain** | [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | MIT | ~100k | Orquestar LLMs con tools, memoria y RAG. Base para NPCs con contexto y chatbots de soporte. |
| **LlamaIndex** | [run-llama/llama_index](https://github.com/run-llama/llama_index) | MIT | ~40k | RAG sobre datos propios. Para NPCs con conocimiento del lore del juego. |

## Señales de mercado a seguir

- **arXiv 2507.08892** (jul 2026): "Multi-Actor Generative AI as a Game Engine" — propone LLMs como sustitutos parciales del game engine. Abre AI-native games.
- **GPT-5.6 gpt-realtime-2.1**: latencia p95 25% menor — NPC conversations <300ms en producción ahora.
- **Roblox OpenGameEval** (dic 2025): benchmark OSS para evaluar AI en juegos. 47 escenarios: code gen, tool use, 3D reasoning, multiplayer.
- **Unity AI Inference Engine**: LLMs/modelos ML on-device en runtime Unity. Offline-first NPCs.
- **NVIDIA ACE SDK**: SDK para Unreal/Unity. NPCs con ASR + NLP + TTS + animación facial en tiempo real. Tracción en demos AAA.
- **Gemma 3n on-device**: demostrado en Godot (code-forge-temple/local-llm-npc), posibilita NPCs offline-first.

---
*Pipeline automático actualiza señales; análisis manual verifica relevancia. 2026-07-11*
