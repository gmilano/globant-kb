# Agentes trending — Gaming AI

> Tendencias activas en AI gaming. Última actualización: 2026-07-13 | v7
> Nuevas señales: Carbon Engine MIT, COCOS 4 MIT, OmniGameArena, Unity/Godot MCP explosion

## Señales nuevas — Semana de 2026-07-13

### 🔥 Carbon Engine (EVE Online) — MIT open source (1 jul 2026)
Fenris Creations (antigua CCP Games) publicó Carbon, el motor de 23 años que impulsa EVE Online, bajo licencia **MIT** en [github.com/carbonengine](https://github.com/carbonengine).

Módulos principales publicados:
- **Trinity** — motor gráfico (rendering, shaders, efectos visuales)
- **Destiny** — física y pathfinding para batallas masivas de flota
- Más de 24 módulos de gráficos, física y simulación

**Por qué importa para Globant**: engine AAA con 23 años de battle-testing, MIT, especializado en física masiva multijugador. Base para juegos espaciales/simulación o fork de módulos aislados (pathfinding Destiny, gráficos Trinity). La comunidad ya empieza con PRs de seguridad y nuevas herramientas.

### 🔥 COCOS 4 — MIT open source, AI-native (4 ene 2026)
COCOS 4 publicado bajo **MIT** sin restricciones comerciales ([cocos2d/cocos-engine](https://github.com/cocos2d/cocos-engine)). Dominante en mobile gaming Asia.

Features clave:
- **AI-native**: nuevas features se distribuyen como MCPs o Agents, no como librerías
- JavaScript/TypeScript como lenguaje primario (optimizado para LLMs que generan código)
- Engine + editor separados (PinK = IDE standalone)
- Adquirido por SUD (empresa gamificación china) por $72M en nov 2025

**Por qué importa**: 500M+ usuarios LATAM en juegos COCOS (mobile F2P). Stack completo en TS/JS = más amigable para AI codegen. Sin royalties.

### 🔥 OmniGameArena — VLM Benchmark para agentes (jun 2026)
Paper arXiv:2606.09826, repo [mxlin043/OmniGameArena](https://github.com/mxlin043/OmniGameArena).

- 12 juegos UE5 nuevos: 7 Solo, 3 PvP, 2 Coop
- **IDC (Improvement Dynamics Curve)**: mide cuánto mejora un agente con reflexión agentica propia
- Dos tracks de evaluación: PDQ (Quality, pausa para razonar) y LCRT (Real-time, latencia virtual)
- Evalúa: Claude, GPT-4o, Gemini, Qwen vs NitroGen (política especializada; entrenada con 40k horas de juego)
- Resultado: VLMs comerciales aún superados por políticas especializadas en tiempo real — gap activo

**Por qué importa**: benchmark estándar para comparar agentes gaming. Útil para clientes que quieren medir calidad de NPCs/agentes.

### 🔥 Godot MCP — Explosion de herramientas (Q2-Q3 2026)
El ecosistema MCP para Godot pasó de 1-2 proyectos a un ecosistema rico:

| Repo | Herramientas | Destacado |
|------|-------------|----------|
| [hi-godot/godot-ai](https://github.com/hi-godot/godot-ai) | 120+ ops, 41 tools | En Godot Asset Library, producción-grade |
| [IvanMurzak/Godot-MCP](https://github.com/IvanMurzak/Godot-MCP) | 39 tools, 11 familias | Apache-2.0, C#, cloud ai-game.dev |
| [mkdevkit/godot-mcp](https://github.com/mkdevkit/godot-mcp) | — | MIT, controla Godot 4 editor |
| [3ddelano/gdai-mcp-plugin-godot](https://github.com/3ddelano/gdai-mcp-plugin-godot) | — | MIT, debug + scene creation |
| [tomyud1/godot-mcp](https://github.com/tomyud1/godot-mcp) | 42 tool handlers | Build games faster con Claude/Cursor |
| [youichi-uda/godot-mcp-pro](https://github.com/youichi-uda/godot-mcp-pro) | 162 tools | 3D, physics, particles, audio, shader ($15) |

### 🔥 Unity MCP — AnkleBreaker (288 tools)
[AnkleBreaker-Studio/unity-mcp-server](https://github.com/AnkleBreaker-Studio/unity-mcp-server): la suite MCP Unity más completa.
- 288 herramientas en 30+ categorías
- Scene management, GameObjects, builds, profiling, Shader Graph, Amplify, terrain, physics, NavMesh, animation, MPPM multiplayer
- Conecta Claude, Cursor, Windsurf o cualquier cliente MCP a Unity Editor & Unity Hub
- Free & open source

---

## Tendencias sostenidas — activas en julio 2026

### 1. NPCs con LLM + Memoria persistente — en producción
Arquitectura ganadora confirmada:
- **LLM base** (Claude 3.5 Haiku, GPT-4o-mini, Llama 3.1 local) para generación de diálogo
- **Behavior Tree** (LimboAI/Beehave) para lógica reactiva del NPC — estructura + confiabilidad
- **Vector store** (ChromaDB, Qdrant) para memoria episódica persistente
- **TTS** (ElevenLabs, Kokoro OSS) para output de audio

Impacto medido 2026: +43% player retention y 2.3× playtime en juegos con AI avanzada (vs tradicionales).

### 2. Generative AI — fricción en la industria
**GDC 2026**: 52% de desarrolladores creen que la AI generativa está **dañando** la industria (vs 7% positivos). Principalmente por:
- Preocupaciones sobre employment en arte y narrativa
- Calidad inconsistente de assets generados
- Confusión sobre licencias de modelos entrenados en assets protegidos

**Implicación**: foco en AI como *herramienta para desarrolladores* (MCP, testing, analytics) más que reemplazo directo de artistas — narrativa más aceptada internamente.

### 3. GameCoder LLMs especializados
- **OpenGame / GameCoder-27B**: primer LLM OSS entrenado vía RL para código de juegos. Genera juegos web end-to-end.
- Modelos especializados superan a modelos generales en tareas de game code
- Tendencia: fine-tuning de Llama/CodeLlama en corpus de scripts GDScript, GML, Lua

### 4. Godot AI ban en core — oportunidad Globant
**1 jul 2026**: Godot Foundation **prohibió** PRs de "vibe coding" y agentes AI en el engine core.
- El código de motor requiere comprensión profunda y PRs humanos de calidad
- Plugins y addons: SIN restricción — ecosistema AI sigue creciendo
- **Oportunidad**: Globant puede posicionarse como contribuidor de calidad *humano* al engine, mientras construye plugins AI encima

### 5. RL para QA automatizado y balance
- godot_rl_agents activo con 4 frameworks RL
- Reducción estimada de QA manual: 60-70% con agentes RL exploradores
- Balance detection: agentes que encuentran exploits antes del launch
- Adopción creciente en mid-size studios LATAM

### 6. Player analytics — GNNs y churn prediction
- 75.83 AUROC con GNN (PyTorch Geometric) vs 62.44 LightGBM
- Señales más fuertes: amigos que se van, difficulty walls, session length declining
- F2P mobile en LATAM: driver crítico (retención > adquisición)

---

## Proyectos a seguir

| Proyecto | URL | Señal |
|----------|-----|-------|
| **Carbon Engine** | [github.com/carbonengine](https://github.com/carbonengine) | MIT, 23 años de battle-test, EVE Online. Módulos aprovechables (Destiny pathfinding, Trinity graphics). |
| **COCOS 4** | [cocos2d/cocos-engine](https://github.com/cocos2d/cocos-engine) | MIT, AI-native, 500M users mobile. Domina Asia/LATAM mobile F2P. |
| **OmniGameArena** | [mxlin043/OmniGameArena](https://github.com/mxlin043/OmniGameArena) | Benchmark estándar emergente para agentes gaming en UE5. |
| **unity-mcp (CoplayDev)** | [CoplayDev/unity-mcp](https://github.com/CoplayDev/unity-mcp) | MIT, 5.8k stars, 700+ forks — mayor adopción Unity MCP. |
| **godot_rl_agents** | [edbeeching/godot_rl_agents](https://github.com/edbeeching/godot_rl_agents) | RL sobre Godot con 4 frameworks, comunidad activa |
| **LLMUnity** | [undreamai/LLMUnity](https://github.com/undreamai/LLMUnity) | LLMs locales en Unity, 1.7k stars, creciendo |

## Señal de mercado — julio 2026

- **AI in Games** (broad): $10.64B (2026) → $163.1B (2034), CAGR 40.8%
- **Generative AI in Gaming**: $1.79B (2025) → $2.21B (2026), CAGR 23.1% → $5.09B (2030)
- **AI Game Assets Generator**: $2.08B (2026) → $10.73B (2035), CAGR ~20%
- 90% de devs integra AI en workflows; 50%+ de studios en producción
- Cost savings: 70-90% reducción en tiempo de creación de assets; $100K-$500K ahorros por título
- Games con AI avanzada: +43% player retention, 2.3× average playtime

---
*Fuentes: gamingonlinux.com, itsfoss.com, arxiv.org/abs/2606.09826, github.com (verificado 2026-07-13)*
