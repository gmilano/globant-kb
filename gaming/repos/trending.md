# Repos trending — Gaming AI

> Señales automáticas del pipeline + análisis manual. Última actualización: 2026-07-06 (segunda pasada)

## Trending con tracción real (verificado manualmente)

| Repo | Licencia | Descripción | Stars | Señal |
|------|----------|-------------|-------|-------|
| [IvanMurzak/Unity-MCP](https://github.com/IvanMurzak/Unity-MCP) | Apache-2.0 | **AI Skills + MCP Tools + CLI para Unity Engine**. 52 Tools, 48 Prompts, 12 categorías. Claude Code, Cursor, Gemini ready. Cualquier C# → tool con 1 línea. | ~3k | Mayor MCP tool para Unity, creciendo rápido en 2026 |
| [IvanMurzak/Unreal-MCP](https://github.com/IvanMurzak/Unreal-MCP) | Apache-2.0 | Plugin C++ para Unreal Engine 5.7 + .NET bridge. 62 tools en 8 familias. | Activo | Cierra el triángulo Unity+Unreal+Godot con MCP |
| [IvanMurzak/GameDev-MCP-Server](https://github.com/IvanMurzak/GameDev-MCP-Server) | MIT | MCP server engine-agnostic compartido por Unity-MCP, Godot-MCP, Unreal-MCP. Bridge SignalR. | — | Infraestructura unificada para AI dev tooling multi-engine |
| [balaraj74/openNPC](https://github.com/balaraj74/openNPC) | MIT | Framework Python para NPCs autónomos. Pipeline unificado: heurísticos → LLM → RL. Percepción, objetivos, memoria de interacciones. Sin LLM en runtime si no se necesita. | Activo | Alternativa OSS a Inworld/Convai — Python nativo |
| [lmgame-org/GamingAgent](https://github.com/lmgame-org/GamingAgent) | MIT | **[ICLR 2026]** LLM/VLM gaming agents. Evalúa modelos jugando Tetris, Pokémon Red, Mario, Sokoban, 2048, Ace Attorney. Multi-provider API. | 947 | Paper ICLR 2026, benchmarking estándar emergente |
| [hi-godot/godot-ai](https://github.com/hi-godot/godot-ai) | MIT | MCP server para Godot. 120+ ops, 41 tools. Conecta Claude Code/Cursor al editor Godot en vivo. | 805 | Lanzado abr 2026, adopción masiva |
| [leigest519/OpenGame](https://github.com/leigest519/OpenGame) | MIT | Framework agentico end-to-end para generar juegos web. Usa GameCoder-27B (LLM RL-entrenado). ArXiv abr 2026. | ~500 | Primer framework de su tipo, paper verificado |
| [AlanLaboratory/UnrealMLAgents](https://github.com/AlanLaboratory/UnrealMLAgents) | Apache-2.0 | Port de Unity ML-Agents para Unreal Engine. Deep RL para juegos UE. v1.0 en 2025. | — | Comunidad Unreal adoptando RL |
| [pamirtuna/gamestudio-subagents](https://github.com/pamirtuna/gamestudio-subagents) | MIT | Equipo de sub-agentes AI en terminal: dev, QA, artist, game designer. | — | Patrón "AI dev team" aplicado a gaming |
| [Yuan-ManX/ai-game-devtools](https://github.com/Yuan-ManX/ai-game-devtools) | MIT | Hub curado: LLMs, world models, textures, shaders, 3D, audio, analytics para game dev. | 1.2k | Lista de referencia más completa del ecosistema |
| [undreamai/LLMUnity](https://github.com/undreamai/LLMUnity) | Apache-2.0 | Personajes Unity con LLMs locales o cloud. | 1.7k | Creciendo en Unity ecosystem |
| [NPC-Worldwide/npcpy](https://github.com/NPC-Worldwide/npcpy) | MIT | Librería Python para NPCs multimodales con LLMs. | 1.4k | Tracción en comunidad Python/AI |
| [Yuan-ManX/AI-Native-Game](https://github.com/Yuan-ManX/AI-Native-Game) | MIT | Tracking de juegos donde la AI ES el juego (world models, generative environments). | — | Categoría emergente: AI-native games |
| [stride3d/stride](https://github.com/stride3d/stride) | MIT | Engine C# cross-platform (ex-Xenko). Alternativa a Unity para devs .NET. | 7.7k | Engine maduro, alternativa Unity sin drama |

## NOVÍSIMOS — Julio 2026

| Repo | Licencia | Descripción | Stars | Por qué importa |
|------|----------|-------------|-------|------------------|
| [FenrisCreations/carbon](https://github.com/FenrisCreations/carbon) | MIT | **Motor de EVE Online** open sourced el 1 julio 2026. C++ cross-platform. 20+ años en producción AAA. | N/A (muy nuevo) | Primer motor AAA-probado liberado MIT esta semana. Base única para proyectos ambiciosos. |
| [sakalond/StableGen](https://github.com/sakalond/StableGen) | MIT | Blender addon: genera meshes 3D con TRELLIS.2 + los texturiza con SDXL/FLUX.1. ComfyUI backend. | Reciente | Workflow completo OSS para assets 3D gaming con GenAI |

## Engines en radar

| Repo | Licencia | Descripción | Stars | Por qué |
|------|----------|-------------|-------|----------|
| [oxylusengine/Oxylus](https://github.com/oxylusengine/Oxylus) | Apache-2.0 | Game engine C++ data-driven con Vulkan. | 263 | Moderno, base sólida para experimentación |
| [electricsheephq/WorldOS](https://github.com/electricsheephq/WorldOS) | Custom | Simulación de mundos + evolución de juegos. | 2 | Concepto world model temprano |

## Frameworks agenticos con adopción en gaming

| Repo | URL | Licencia | Stars | Aplicación gaming |
|------|-----|----------|-------|--------------------|
| **LangChain** | [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | MIT | ~100k | Orquestar LLMs con tools, memoria y RAG. Base para NPCs con contexto y chatbots de soporte. |
| **LlamaIndex** | [run-llama/llama_index](https://github.com/run-llama/llama_index) | MIT | ~40k | RAG sobre datos propios. Para NPCs con conocimiento del lore del juego. |
| **CrewAI** | [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | ~30k | Multi-agente con roles. Para QA pipelines, PCG con agentes especializados. |

## Señales de mercado a seguir

- **GamingAgent ICLR 2026**: benchmark OSS para evaluar LLMs/VLMs en juegos reales. 947 stars en crecimiento. Multi-provider.
- **Carbon Engine (Fenris)**: motor de EVE Online liberado MIT el 1 julio 2026. Primer motor AAA de este nivel en OSS. Seguir adopción.
- **Roblox OpenGameEval** (dic 2025): benchmark OSS para evaluar AI en juegos. 47 escenarios: code gen, tool use, 3D reasoning, multiplayer.
- **Unity AI Inference Engine**: permite correr LLMs/modelos ML directamente en el runtime Unity sin servidor. Tendencia hacia AI on-device.
- **NVIDIA ACE SDK**: SDK para Unreal/Unity. NPCs con ASR + NLP + TTS + animación facial en tiempo real. Tracción en demos AAA.
- **Gemma 3n on-device**: demostrado en Godot (code-forge-temple/local-llm-npc), posibilita NPCs offline-first.

---
*Pipeline automático actualiza señales; análisis manual verifica relevancia. 2026-07-06 (segunda pasada)*
*GamingAgent (ICLR 2026) y Carbon Engine añadidos 2026-07-05 — muy frescos.*
*Unity-MCP (~3k stars Apache-2.0), Unreal-MCP, GameDev-MCP-Server (MIT), openNPC (MIT) añadidos 2026-07-06.*
