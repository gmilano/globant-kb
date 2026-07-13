# Tendencias — Gaming AI 2026

> Investigación curada con datos verificados. Última actualización: 2026-07-13 | v13

## 🔴 Tendencia emergente crítica (julio 2026)

### T0. Carbon Engine (EVE Online) — MIT open source — 1 jul 2026

El evento más importante del mes en gaming open source: Fenris Creations abrió el **Carbon Engine**, motor de EVE Online bajo MIT. 20+ módulos C++:
- **Destiny**: physics simulation + pathfinding. El mismo motor que procesó batallas con +6,000 naves simultáneas en producción real.
- **Trinity**: motor gráfico para worlds AAA sci-fi a gran escala. PBR, LOD, rendering a distancias MMO.
- Implicaciones: primera alternativa MIT con física de MMO masivo probada 20 años en producción. Complementa Godot (engine generalista) para proyectos de simulación masiva.
- Estado: repo público, comunidad en formación. Oportunidad first-mover para Globant.

---

## Tendencias confirmadas (alta confianza)

### T1. Ecosistema Godot como plataforma AI-first
Godot (MIT, 112k+ stars) emergió como el engine open source con el ecosistema AI más rico:
- **LimboAI** (MIT, 2.8k stars): BTs + Hierarchical State Machines. Stack NPC AI maduro.
- **Beehave** (MIT, 3.2k stars): behavior trees componibles en el scene tree de Godot.
- **godot-ai** (MIT, 805+ stars, abr 2026): MCP server, 120+ operaciones, conecta Claude/Codex al editor en vivo.
- **Godot-MCP** (Apache-2.0): alternativa C# con conexión a ai-game.dev.
- **godot_rl_agents** (MIT, 900+ stars): wrappers para 4 frameworks RL (SB3, Sample Factory, RLLib, CleanRL).
- **NobodyWho** (EUPL, ver licencia): NPCs con LLM local, instalación 1-click en Godot AssetLib (jun 2026).
- **NVIDIA fork Godot** con path tracing (MIT) lanzado en GDC 2026.

**Oportunidad Globant**: "Godot + AI" como alternativa open source a Unity sin controversias de pricing.

### T2. LLM NPCs — de demo a producción
En 2026, NPCs con LLMs pasaron a producción en títulos comerciales:
- Segmento NPCs + Digital Humans: **28.6% del mercado total AI gaming** (mayor segmento).
- Impacto medido: +40% immersion scores, +28% session time en RPGs.
- Arquitectura ganadora: BT (estructura reactiva) + LLM (diálogo generativo) + Vector Store (memoria).
- **Inworld AI** (cerrado) + **NVIDIA ACE**: stack propietario dominante en AAA.
- Alternativa OSS: Interactive LLM NPCs (MIT, 716 stars) + LimboAI + Ollama.
- **LLMUnity** (Apache-2.0, 1.7k stars): LLMs locales o cloud directamente en Unity.
- Conversational NPCs entienden contexto, recuerdan interacciones pasadas, responden sin árboles de diálogo pre-scriptados.

### T3. GameCoder LLMs especializados
- **OpenGame / GameCoder-27B** (Apache-2.0, abr 2026): primer LLM open source entrenado en código de juegos via RL orientado a ejecución. Genera juegos web end-to-end.
- **Roblox CUBE 3D** (1.8B params, mar 2025): genera objetos 3D desde texto on-platform.
- Tendencia: modelos especializados en game dev superan a modelos generales en tareas de código de juego.
- **OpenGame-Bench**: evalúa Build Health + Visual Usability + Intent Alignment via headless browser.

### T4. GamingAgent + lmgame-bench — evaluación LLM en juegos reales (ICLR 2026)
- **GamingAgent** (lmgame-org, Apache-2.0, 1.2k stars): aceptado en ICLR 2026.
- **lmgame-bench**: 6 juegos reales como benchmarks. 13 modelos SOTA evaluados. Benchmark aún desafiante para todos.
- Expose limitaciones: visual state extraction, reflection, spatiotemporal reasoning, long-context.
- Benchmark modular: harness con percepción, memoria y razonamiento togglables → diagnostica capacidades específicas.
- Implicación: evaluación estándar de modelos en tareas de juego reales, no sintéticas.

### T5. RL para testing automatizado y balance
- **godot_rl_agents** activo con 4 frameworks RL.
- Agentes RL entrenados para exploración de nivel → detectan bugs edge-case que QA manual no encuentra.
- Balance detection: agentes que encuentran estrategias dominantes (exploits) antes del launch.
- **GameStudio Subagents**: equipo de agentes multi-rol (dev, QA, artist) en terminal.
- Reducción estimada de QA manual: 60-70% en proyectos con RL QA implementado.

### T6. Nakama como backend universal para proyectos OSS
- 12.8k stars, Apache-2.0, SDK oficial Godot, Unreal, Unity.
- 500k devs, 1B+ players en producción.
- Adoptado como backend por defecto en proyectos Godot+AI.
- Extensible: hooks en Go/TypeScript/Lua para añadir AI server-side.

### T7. MCP como protocolo de AI dev tooling en game engines
- **Godot**: godot-ai, Godot-MCP (C#), godot-mcp (Coding-Solo) — 11+ opciones serias en 2026
- **Unity**: Unity-MCP (MIT) — Any C# method as tool with one line
- **Unreal**: UnrealGenAISupport (MIT) + Aura agent (Ramen VR)
- **FunplayAI**: herramientas MCP cross-engine (Unity, Cocos, Godot)
- MCP como protocolo estándar entre AI assistants y game editors: mismo patrón que MCP en enterprise

### T8. AI asistido en el desarrollo (tooling)
- **Unity AI** (v6.2, mid-2025): suite integrada en editor. Assistant (docs/code), Generators (texturas/sprites), Inference Engine (on-device).
- **Unreal — Aura** (Ramen VR, ene 2026): agente editor + coding. Caso: *Zombonks* lanzado en 5 meses (mitad del tiempo).
- Adopción: 87% de estudios ya usa AI agents en workflows (Google Cloud survey, jun-jul 2025).
- **GDC 2026**: AI tools para generación de assets (texturas, entornos, secuencias animadas) comprimieron semanas de trabajo manual.

### T9. Analytics predictivo — churn y LTV
- GNNs (Graph Neural Networks) sobre comportamiento + red social: 75.83 AUROC vs 62.44 LightGBM flat-table.
- Predicción de churn 14 días en adelante.
- Señales más fuertes: amigos que se van, difficulty walls, session lengths declining.
- F2P mobile dominante en LATAM → retención es crítica → oportunidad.
- Herramientas: PyTorch Geometric (PyG) para GNNs, PostHog (MIT, 23k stars) para events, Grafana (Apache-2.0) para dashboards.

### T10. Anti-cheat con ML conductual
- Shift de detección por firmas (binarios) a detección por comportamiento (server-side ML).
- Ventaja: no se puede bypassear con ofuscación; detecta cheaters nuevos sin actualizar reglas.
- **OACS** (MIT): framework Python para anomaly detection server-side.
- GNNs para detectar redes coordinadas (boosting, account sharing, fraud en iGaming).
- Driver LATAM: regulación iGaming Brasil 2025 exige sistemas anti-fraud activos.

### T11. Developer pushback contra GenAI (señal de mercado)
- **52% de game developers tienen visión negativa de GenAI** (GDC 2026) — subió de 30% hace un año
- Preocupaciones: calidad inconsistente, problemas de propiedad intelectual, reemplazo de talento creativo
- Oportunidad: studios que implementan AI de forma transparente y respetuosa con devs
- Implicación para Globant: pitch de "AI que amplifica al dev, no que lo reemplaza" + stacks OSS auditables

---

## En el radar (emergente, 2026-2027)

| Tendencia | Señal | ETA |
|-----------|-------|-----|
| **Carbon Engine ecosystem** | Comunidad formándose post-jul 2026. Plugins AI. | 2026-2027 |
| **AI-native games** (world models) | Yuan-ManX/AI-Native-Game tracker activo. Genie 2 (Google). | 2026-2027 |
| **Gemma 3n on-device NPCs** | Demostrado en Godot sin API. Offline-first gaming. | Ya disponible en beta |
| **Villanos adaptativos** | Aivill (SKYHUBDev): villanos que aprenden del jugador. | Concepto emergente |
| **AI game masters** | VirtualGameMaster (MIT, 300 stars): GM automático para RPGs. | En adopción indie |
| **PCG con diffusion models** | Generación de assets (texturas, música, diálogos) in-pipeline. | Parcialmente productivo ya |
| **Benchmark consolidation** | lmgame-bench + OpenGameEval + Roblox → estándar unificado | 2026-2027 |

---
*Fuentes: GitHub (verificado 2026-07-13), PC Gamer/GamingOnLinux (Carbon jul 2026), imseankim.com (GDC 2026), solidaitech.com, snsinsider.com, thebusinessresearchcompany.com, persistencemarketresearch.com*
