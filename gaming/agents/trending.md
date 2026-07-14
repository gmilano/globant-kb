# Agentes trending — Gaming AI

> Tendencias activas en AI gaming. Última actualización: 2026-07-14 | v9
> Nuevas señales: AlayaRenderer neural rendering pipeline, Player2 AI NPC Godot plugin, Godot_AI C++ native, GRL×Google Tunix TPU collaboration, AI in Games $10.64B→$163.1B CAGR 40.8%

## Señales nuevas — Semana de 2026-07-14 (v9 cycle-2)

### 🔥 AlayaRenderer — Generative World Renderer open-source (abril 2026)
Repo: [ShandaAI/AlayaRenderer](https://github.com/ShandaAI/AlayaRenderer), Apache-2.0. Paper arXiv:2604.02329.

**Qué hace**: primer pipeline de neural rendering open-source entrenado con datos reales de juegos AAA (Cyberpunk 2077 + Black Myth: Wukong).

- **Dataset**: 4 millones de frames continuos a 720p/30FPS con 5 canales G-buffer por frame (depth, normals, albedo, metallic, roughness) — el dataset más grande de su tipo
- **Inverse rendering**: deduce materiales y geometría desde RGB puro — no requiere acceso al engine
- **Forward rendering**: a partir de materiales + prompt de texto → genera RGB con estilo arbitrario (re-skin completo del juego)
- Demo de Game Editing online lanzado 4 abr 2026

**Por qué importa para Globant**: permite crear pipelines de re-skinning de juegos completos o generación de assets con coherencia de materiales sin acceder al source del juego. Nuevo espacio de propuesta de valor para clientes de remaster / mobile port.

### 🔥 Player2 AI NPC Godot Plugin (elefant-ai, MIT)
Repo: [elefant-ai/player2-ai-npc-godot](https://github.com/elefant-ai/player2-ai-npc-godot). En Godot Asset Library.

- Nodo `Player2AINPC` = AI brain drop-in: event queue, **long-term memory** y function calls implementados OOB
- El dev solo define la descripción del NPC y llama `notify(stimulus)` — el plugin maneja el resto
- 40,000+ jugadores activos en el Discord de Player2
- Mismo equipo tiene plugin para Defold ([elefant-ai/player2-ai-npc-defold](https://github.com/elefant-ai/player2-ai-npc-defold))

**Por qué importa**: la opción de menor fricción para añadir NPCs AI en Godot. Drop-in node con infraestructura de memoria lista. Para MVPs y proyectos de clients con timeline corto.

### 🔥 Godot_AI — Módulo C++ nativo para Godot 4.7 (MIT)
Repo: [spardanviro/Godot_AI](https://github.com/spardanviro/Godot_AI).

- Native C++ = performance máxima dentro del editor, sin overhead Python/GDExtension
- Multi-provider LLM chat directo (no solo Ollama — múltiples backends)
- Generación de GDScript + **ejecución directa** en el editor
- Contexto scene-aware: el LLM "ve" la escena actual
- Inyección de API docs on-demand para el LLM

**Por qué importa**: para studios con Godot 4.7+ que quieren tooling AI production-grade sin overhead de runtime, con acceso a múltiples providers.

### 🔥 GRL × Google Tunix — LLM post-training en TPUs (dic 2025 / activo 2026)
Repo: [lmgame-org/GRL](https://github.com/lmgame-org/GRL) × [google/tunix](https://github.com/google/tunix).
Publicado en Google Open Source Blog.

- **UCSD Hao AI Lab × Google TRC**: GRL corre en TPU v4 meshes via Tunix (JAX-native RL)
- Pipeline: juegos como Sokoban/Tetris → benchmarks verificables con reward automático → post-training de LLMs (Qwen2.5, Llama)
- Escala: multi-host, multi-turn RL en Google Cloud TPUs Research Cloud
- Tunix disponible en PyPI: `pip install google-tunix`

**Por qué importa**: valida GRL como infraestructura seria para LLM post-training vía juegos. El benchmark de referencia para fine-tuning de LLMs con juegos como entorno de entrenamiento.

---

## Señales sostenidas — activas en julio 2026

### 1. AlayaWorld — World Model open-source interactivo (continuando desde julio 2026)
Paper arXiv publicado **7-9 jul 2026** por Shanda AI Research (China). Pipeline de publicación completo previsto mid-jul 2026.

**Qué hace**: genera entornos de video interactivos y espacialmente coherentes durante **más de 60 segundos** de juego continuo — el umbral más alto reportado en cualquier modelo open-source hasta la fecha.

- Supera a modelos previos (GameNGen, Genie, DIAMOND, OASIS) en duración coherente de juego
- Pipeline completo publicable: data preparation, arquitectura, training, inference acceleration, deployment
- Licencia esperada: Apache-2.0 (basado en práctica de Shanda AI)

**Por qué importa para Globant**: primera base real para "AI-native games" donde el mundo del juego es generado por un modelo y no por geometría fija. Oportunidad de ser early adopters para clientes de gaming experimental / metaverse.

### 🔥 GamingAgent — ICLR 2026 (lmgame-org, MIT)
Paper [arXiv:2505.15146](https://arxiv.org/abs/2505.15146) publicado como ICLR 2026. Repo: [lmgame-org/GamingAgent](https://github.com/lmgame-org/GamingAgent).

**lmgame-Bench**: benchmark sobre 6 juegos (platformer, puzzle, narrativa detectivesca) con API Gym-style.
- Evalúa **13 modelos SOTA** (incluyendo GPT-4o, Claude Opus, Gemini) — benchmark sigue siendo **difícil** para todos
- Módulos toggeables: percepción, memoria, razonamiento — permite aislar qué capacidad falla
- **CUA (Computer Use Agent) mode**: deployment de agentes que juegan via interacción de pantalla, sin acceso a API del juego (como un humano)

**Por qué importa**: estándar académico emergente para medir capacidades de LLMs/VLMs en gaming. Útil para clientes que quieren medir y mejorar agentes NPC vs benchmark público.

### 🔥 GRL — Multi-Turn RL para LLM Gaming (lmgame-org, MIT)
Repo: [lmgame-org/GRL](https://github.com/lmgame-org/GRL). Del mismo equipo que GamingAgent (ICLR 2026).

- Sistema de RL multi-turno con AgentTrainer para **fine-tuning de LLMs directamente en entornos de juego**
- Permite especializar modelos generales (Llama, Qwen, etc.) en estrategias de juego específicas sin cambiar arquitectura base
- Alternativa open-source a RLHF-for-gaming

**Por qué importa**: combinar con GamingAgent = evaluar baseline → identificar debilidades → entrenar con GRL → medir mejora. Pipeline completo open-source para gaming agent development.

### 🔥 COS-PLAY — Co-Evolving LLM Agents para juegos (2026)
Repo: [wuxiyang1996/cos-play](https://github.com/wuxiyang1996/cos-play), MIT.

- **Co-Evolución**: el agente tiene un Skill Bank que crece durante el juego. Decisiones LLM + habilidades aprendidas se co-evolucionan.
- Diseñado para **long-horizon game play** donde las tareas abarcan cientos de pasos
- Supera a baselines LLM puro en juegos de mundo abierto con tareas complejas

**Por qué importa**: patrón novedoso para NPCs y agentes que mejoran con el tiempo de juego. Alternativa a memoria puramente vectorial (más activa).

---

## Señales sostenidas — activas en julio 2026

### 1. Carbon Engine — Motor AAA open source (continuando desde jul 2026)
Fenris Creations publicó Carbon bajo MIT el 1 jul 2026. [github.com/carbonengine](https://github.com/carbonengine).
- Trinity (gráficos AAA) + Destiny (física + pathfinding masivo) + 24+ módulos
- Comunidad activa. Plugin ecosystem embrionario — oportunidad Globant como early contributor.

### 2. COCOS 4 — Engine mobile AI-native
COCOS 4 MIT desde ene-2026. [cocos2d/cocos-engine](https://github.com/cocos2d/cocos-engine).
- AI-native: features como MCPs/Agents primera clase
- 500M+ jugadores en juegos COCOS LATAM/Asia. Sin royalties.

### 3. OmniGameArena — Benchmark UE5 (jun 2026)
arXiv:2606.09826. [mxlin043/OmniGameArena](https://github.com/mxlin043/OmniGameArena).
- VLMs comerciales aún superados por políticas RL especializadas (NitroGen) en tiempo real
- IDC (Improvement Dynamics Curve): mide mejora agentica con auto-reflexión

### 4. Unity/Godot MCP — Explosion continúa
Ecosistema MCP para game engines sigue creciendo:

| Repo | Herramientas | Destacado |
|------|-------------|----------|
| [hi-godot/godot-ai](https://github.com/hi-godot/godot-ai) | 120+ ops, 41 tools | En Godot Asset Library, producción-grade |
| [AnkleBreaker-Studio/unity-mcp-server](https://github.com/AnkleBreaker-Studio/unity-mcp-server) | **288 tools** | Suite Unity MCP más completa |
| [CoplayDev/unity-mcp](https://github.com/CoplayDev/unity-mcp) | 25+ tools | 5.8k stars, mayor adopción |
| [IvanMurzak/Godot-MCP](https://github.com/IvanMurzak/Godot-MCP) | 39 tools, 11 familias | Apache-2.0, C# |

### 5. NPCs con LLM — métricas de mercado actualizadas
- **NPC Generation AI Market**: $1.86B (2025) → **$2.44B (2026)**, CAGR 31.4% (Research and Markets)
- NPC behavior modeling: **28.6% del mercado total AI gaming** — mayor segmento único
- **7,300 juegos en Steam** declaran uso de AI en 2026 — el doble de 2024
- Juegos con AI avanzada: +43% player retention, 2.3× playtime (benchmark industria 2026)

### 6. Fricción de mercado — señal importante para posicionamiento
- **52% de devs** dicen que GenAI daña la industria (GDC 2026, vs 7% positivos)
- **85% de gamers** tienen actitudes negativas hacia AI en juegos
- Área menos cuestionada: AI como herramienta de dev (MCP, testing, analytics) vs reemplazo de artistas
- **Implicación Globant**: narrative "AI que amplifica al desarrollador" > "AI que reemplaza"

### 7. Godot Foundation AI ban en core (1 jul 2026 — activo)
PRs de "vibe coding" y agentes AI prohibidos en engine core. Plugins/addons sin restricción.
- Oportunidad: Globant como contribuidor humano de calidad → ventaja reputacional

---

## Proyectos a seguir

| Proyecto | URL | Señal |
|----------|-----|-------|
| **AlayaRenderer** | [ShandaAI/AlayaRenderer](https://github.com/ShandaAI/AlayaRenderer) | Generative World Renderer, Apache-2.0, 4M AAA frames, arXiv:2604.02329. Neural rendering open-source pipeline. |
| **AlayaWorld** | [AlayaLab/AlayaWorld](https://github.com/AlayaLab/AlayaWorld) | World model open-source para gaming, 60s+ coherente, arXiv:2607.06291. |
| **Player2 AI NPC Godot** | [elefant-ai/player2-ai-npc-godot](https://github.com/elefant-ai/player2-ai-npc-godot) | Drop-in AI NPC plugin: event queue + long-term memory + function calls OOB. MIT, Asset Library. |
| **Godot_AI** | [spardanviro/Godot_AI](https://github.com/spardanviro/Godot_AI) | Native C++ AI assistant module Godot 4.7, multi-provider LLM, GDScript gen+run. MIT. |
| **GamingAgent** | [lmgame-org/GamingAgent](https://github.com/lmgame-org/GamingAgent) | ICLR 2026 benchmark LLM/VLM, MIT, CUA mode, 13 modelos evaluados. |
| **GRL × Google Tunix** | [lmgame-org/GRL](https://github.com/lmgame-org/GRL) × [google/tunix](https://github.com/google/tunix) | Multi-turn RL en Google Cloud TPUs. UCSD Hao AI Lab. Publicado Google Open Source Blog. |
| **COS-PLAY** | [wuxiyang1996/cos-play](https://github.com/wuxiyang1996/cos-play) | Co-evolving LLM + Skill Bank para long-horizon, MIT. |
| **Carbon Engine** | [github.com/carbonengine](https://github.com/carbonengine) | MIT, 23 años battle-test EVE Online, Trinity (gráficos) + Destiny (física). |
| **COCOS 4** | [cocos2d/cocos-engine](https://github.com/cocos2d/cocos-engine) | MIT, AI-native, 500M users mobile. Adquirido por SUD ($72M). |

## Señal de mercado — julio 2026 (v9 actualizado)

- **AI in Games (Verified MR — mayor estimado)**: **$10.64B** (2026) → **$163.1B** (2034), CAGR **40.8%**
- **AI in Games (broad, Persistence MR)**: **$10.1B** (2026) → $75.1B (2033), CAGR 33.2%
- **AI in Video Games (BRC)**: $2.88B (2025) → **$3.73B** (2026), CAGR 29.4%
- **Generative AI in Gaming**: $1.79B (2025) → **$2.21B** (2026), CAGR 23.1% → $5.09B (2030)
- **NPC Generation AI**: $1.86B (2025) → **$2.44B** (2026), CAGR 31.4%
- **AI Game Assets Generator**: $2.08B (2026) → $10.73B (2035), CAGR ~20%
- 90% de devs integra AI en workflows; 50%+ de studios en producción
- **7,300 juegos Steam** declaran AI (2026) — 2× 2024
- **300% más juegos indie** logran 1M+ descargas (2024–2026)
- Cost savings: 70-90% reducción en tiempo de creación de assets; $100K-$500K ahorros por título

---
*v9 actualizado 2026-07-14. Fuentes: arxiv.org/abs/2604.02329 (AlayaRenderer), arxiv.org/abs/2607.06291 (AlayaWorld), github.com/elefant-ai (Player2 NPC), github.com/spardanviro (Godot_AI), opensource.googleblog.com (GRL×Tunix), arxiv.org/abs/2505.15146 (GamingAgent), verifiedmarketreports.com (AI in Games $163.1B 2034), blog.imseankim.com/gdc-2026, researchandmarkets.com/reports/6226388*
