# Agentes trending — Gaming AI

> Tendencias activas en AI gaming. Última actualización: 2026-07-14 | v8
> Nuevas señales: GamingAgent ICLR 2026, AlayaWorld world model open-source, COS-PLAY, GRL, NPC market $2.44B

## Señales nuevas — Semana de 2026-07-14

### 🔥 AlayaWorld — World Model open-source interactivo (julio 2026)
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
| **AlayaWorld** | Shanda AI Research (arXiv jul 2026) | World model open-source para gaming, 60s+ coherente. Publicación full pipeline mid-jul 2026. |
| **GamingAgent** | [lmgame-org/GamingAgent](https://github.com/lmgame-org/GamingAgent) | ICLR 2026 benchmark LLM/VLM, MIT, CUA mode, 13 modelos evaluados. |
| **GRL** | [lmgame-org/GRL](https://github.com/lmgame-org/GRL) | Multi-turn RL para LLM gaming fine-tuning, MIT. |
| **COS-PLAY** | [wuxiyang1996/cos-play](https://github.com/wuxiyang1996/cos-play) | Co-evolving LLM + Skill Bank para long-horizon, MIT. |
| **Carbon Engine** | [github.com/carbonengine](https://github.com/carbonengine) | MIT, 23 años battle-test EVE Online, ecosistema por construir. |
| **COCOS 4** | [cocos2d/cocos-engine](https://github.com/cocos2d/cocos-engine) | MIT, AI-native, 500M users mobile. Domina Asia/LATAM mobile F2P. |

## Señal de mercado — julio 2026

- **AI in Video Games**: $2.88B (2025) → **$3.73B (2026)**, CAGR 29.4% (Business Research Company)
- **AI in Games (broad)**: **$10.1B** (2026) → $75.1B (2033), CAGR 33.2% (Persistence MR)
- **NPC Generation AI**: $1.86B (2025) → **$2.44B (2026)**, CAGR 31.4%
- **AI Game Assets Generator**: $2.08B (2026) → $10.73B (2035), CAGR ~20%
- **Generative AI in Gaming**: $1.79B (2025) → $2.21B (2026), CAGR 23.1%
- 90% de devs integra AI en workflows; 50%+ de studios en producción
- **7,300 juegos Steam** declaran AI (2026) — 2× 2024
- **300% más juegos indie** logran 1M+ descargas (2024–2026)
- Cost savings: 70-90% reducción en tiempo de creación de assets; $100K-$500K ahorros por título

---
*Fuentes: arxiv.org/abs/2505.15146, arxiv.org/abs/2606.09826, techtimes.com (AlayaWorld jul 2026), gamingonlinux.com, blog.imseankim.com/gdc-2026, researchandmarkets.com/reports/6226388 (verificado 2026-07-14)*
