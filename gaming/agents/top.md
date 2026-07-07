# 🎮 Agentes AI — Gaming

> Agentes y herramientas AI open source verificados. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-07 | Cuarta actualización — añadidos: GamingAgent (ICLR 2026), awesome-LLM-game-agent-papers, sección benchmarks

## Ecosistema Godot (MIT — recomendado como base)

| Nombre | Repo | Licencia | Descripción | Stars |
|--------|------|----------|-------------|-------|
| Beehave | [bitbrain/beehave](https://github.com/bitbrain/beehave) | MIT | Behavior trees componibles en el scene tree de Godot para NPC y boss AI | 3.2k |
| LimboAI | [limbonaut/limboai](https://github.com/limbonaut/limboai) | MIT | Plugin C++ para Godot: Behavior Trees + Hierarchical State Machines. BTState permite combinar ambos para IA reactiva | 2.8k |
| godot-ai | [hi-godot/godot-ai](https://github.com/hi-godot/godot-ai) | MIT | Servidor MCP con 120+ operaciones y ~41 herramientas. Conecta Claude/Codex al editor Godot en vivo: scene building, scripts, signals, animations | 805 |
| godot_rl_agents | [edbeeching/godot_rl_agents](https://github.com/edbeeching/godot_rl_agents) | MIT | Wrappers para 4 frameworks RL: StableBaselines3, Sample Factory, Ray RLLib, CleanRL. Entrena agentes contra juegos Godot | 900+ |

## NPC AI con LLMs

| Nombre | Repo | Licencia | Descripción | Stars |
|--------|------|----------|-------------|-------|
| Interactive LLM NPCs | [AkshitIreddy/Interactive-LLM-Powered-NPCs](https://github.com/AkshitIreddy/Interactive-LLM-Powered-NPCs) | MIT | LLM-driven dialogue para Cyberpunk 2077, GTA 5, AC. Vector stores para memoria ilimitada de NPCs + pre-conversation.json por personaje | 716 |
| LLMUnity | [undreamai/LLMUnity](https://github.com/undreamai/LLMUnity) | Apache-2.0 | Personajes Unity con LLMs locales o cloud | 1.7k |
| UnrealGenAISupport | [prajwalshettydev/UnrealGenAISupport](https://github.com/prajwalshettydev/UnrealGenAISupport) | MIT | Plugin Unreal Engine para LLM/GenAI + MCP server UE5. Soporta GPT, Gemini, Claude | 619 |
| npcpy | [NPC-Worldwide/npcpy](https://github.com/NPC-Worldwide/npcpy) | MIT | Librería Python para NPC con LLMs multimodales | 1.4k |

## Pathfinding y AI de movimiento

| Nombre | Repo | Licencia | Descripción | Stars |
|--------|------|----------|-------------|-------|
| recastnavigation | [recastnavigation/recastnavigation](https://github.com/recastnavigation/recastnavigation) | Zlib | Estándar de la industria para navigation mesh (navmesh). Usado en Unity, Godot, UE. C++ | 7.8k |
| yuka | [Mugen87/yuka](https://github.com/Mugen87/yuka) | MIT | Game AI primitives en JavaScript: steering behaviors, pathfinding, FSM | 1.4k |
| aitoolkit | [linkdd/aitoolkit](https://github.com/linkdd/aitoolkit) | MIT | Da un cerebro a los NPCs de tu juego (header-only C++) | 524 |

## Generación procedural

| Nombre | Repo | Licencia | Descripción | Stars |
|--------|------|----------|-------------|-------|
| WorldX | [YGYOOO/WorldX](https://github.com/YGYOOO/WorldX) | MIT | Generación procedural de mundos con AI (TypeScript) | 1.1k |

## ⚠️ Licencias a tener en cuenta

| Nombre | Licencia | Restricción |
|--------|----------|-------------|
| NobodyWho | EUPL-1.2 | **Copyleft** — requiere que derivados sean open source. No usar en soluciones propietarias. |

---
*Verificado con deep-research: 3-0 votes en claims principales. Fuentes directas de GitHub API.*

## Benchmarks y evaluación de agentes en juegos

> Proyectos que miden capacidades de LLMs/VLMs usando juegos como entorno de evaluación. Clave para validar qué modelos sirven para gaming.

| Nombre | Repo | Licencia | Descripción | Stars |
|--------|------|----------|-------------|-------|
| GamingAgent | [lmgame-org/GamingAgent](https://github.com/lmgame-org/GamingAgent) | Apache-2.0 | ICLR 2026 — LLM/VLM gaming agents y lmgame-Bench. 6 juegos (Sokoban, Tetris, Candy Crush, 2048, Super Mario Bros, Ace Attorney), harness modular (percepción/memoria/razonamiento), 13 modelos evaluados. Identifica qué capacidades LLM se correlacionan con qué juegos. | ~800 |
| awesome-LLM-game-agent-papers | [git-disl/awesome-LLM-game-agent-papers](https://github.com/git-disl/awesome-LLM-game-agent-papers) | MIT | Survey ACM CSUR sobre LLM game agents. Cataloga papers de PCG, RPG, RTS, narrative games. Incluye "Memory-Augmented State Machine Prompting for RTS" y "Speculative Actions" (ICLR 2026 Oral). | ~600 |

**¿Por qué importa para Globant?**
- lmgame-Bench permite evaluar sistemáticamente qué modelo usar en cada juego antes de contratar API.
- Patrón: ejecutar benchmark contra el juego del cliente → elegir el modelo óptimo (costo/latencia/capacidad).
- Identifica brechas: razonamiento espacial (Tetris, Sokoban) requiere modelos más potentes que narrativa (Ace Attorney).

---

## World Models — Motores de juego neurales

> Modelos que generan el entorno de juego frame-a-frame como estado latente, sin motor de física tradicional. Permiten entrenar agentes RL en mundos completamente sintetizados.

| Nombre | Repo | Licencia | Descripción | Stars |
|--------|------|----------|-------------|-------|
| DIAMOND | [eloialonso/diamond](https://github.com/eloialonso/diamond) | MIT | Agente RL entrenado en mundo difusivo. NeurIPS 2024 Spotlight. Atari 100k benchmark: 1.46 human normalized score. También demo como motor neural interactivo con CS:GO. | ~2k |
| open-oasis | [etched-ai/open-oasis](https://github.com/etched-ai/open-oasis) | MIT | Oasis 500M: modelo playable generado frame-a-frame. Primer mundo Minecraft-like sin motor de física. Input: teclado → genera frame siguiente. Decart + Etched, oct 2024. | ~14k |
| awesome-world-model-games | [dweam-team/awesome-world-model-games](https://github.com/dweam-team/awesome-world-model-games) | MIT | Lista curada de todos los juegos world-model disponibles y dónde encontrarlos. Referencia del ecosistema. | — |
| AI-Native-Game tracker | [Yuan-ManX/AI-Native-Game](https://github.com/Yuan-ManX/AI-Native-Game) | MIT | Tracking de juegos donde la AI ES el motor. World models, generative environments, interactive AI worlds. | — |
| ReactiveGWM | arxiv: [2605.15256](https://arxiv.org/abs/2605.15256) | Research | Steering NPC en Game World Models reactivos — conecta world models con comportamiento NPC adaptativo. Jun 2026. | — |

**¿Por qué importa para Globant?**
- Permite crear entornos de entrenamiento RL sin motor de física (más barato, más rápido).
- Base para juegos donde la IA genera el mundo dinámicamente (categría "AI-native games").
- DIAMOND demuestra que agentes RL entrenados en world models superan métodos clásicos en Atari.
- Caso de uso inmediato: entrenar agentes QA en una representación aprendida del juego antes de compilarlo.

---

## ⚠️ Contexto industria — GDC 2026 Developer Sentiment

> Survey GDC 2026 (n=3.000+ devs):

| Métrica | Dato |
|---------|------|
| Devs que ven GenAI negativamente | **52%** (vs 30% en 2025 — crecimiento del rechazo) |
| Adopción corporativa GenAI | 52% |
| Uso personal de tools AI | 36% (brecha employer vs dev) |
| Uso más común: research/brainstorm | 81% |
| Uso diario / code assist | 47% |
| Prototyping | 35% |
| Asset generation | 19% |
| PCG (procedural content gen) | 10% |
| Player-facing features con AI | 5% |

**Implicación estratégica**: La mayor oportunidad está en **tooling interno** (code assist, brainstorm, QA), no en features de cara al jugador. El 52% de rechazo activo es un dato de negocio crítico para Globant — proponer AI como productivity tool tiene mejor aceptación que "AI en el juego". Áreas donde SÍ hay adopción alta: backend invisible (matchmaking, anti-cheat), analytics, QA automatizado.

---
*Datos GDC 2026: winbuzzer.com/2026/03/23, blog.imseankim.com/gdc-2026. World models: github.com/eloialonso/diamond, github.com/etched-ai/open-oasis.*
