# Tendencias — Gaming AI 2026

> Investigación curada con datos verificados. Última actualización: 2026-07-07 | v2

## Tendencias confirmadas (alta confianza)

### 1. Ecosistema Godot como plataforma AI-first
Godot (MIT, 112k+ stars) emergió como el engine open source con el ecosistema AI más rico:
- **LimboAI** (MIT, 2.8k stars): BTs + Hierarchical State Machines. Stack NPC AI maduro.
- **Beehave** (MIT, 3.2k stars): behavior trees componibles en el scene tree de Godot.
- **godot-ai** (MIT, 805 stars, abr 2026): MCP server, 120+ operaciones, conecta Claude/Codex al editor en vivo. Listado en Godot Asset Library jul 2026.
- **godot_rl_agents** (MIT, 900+ stars): wrappers para 4 frameworks RL (SB3, Sample Factory, RLLib, CleanRL).
- **NobodyWho** (EUPL, ver licencia): NPCs con LLM local, instalación 1-click en Godot AssetLib (jun 2026).
- **NVIDIA fork Godot** con path tracing (MIT) lanzado en GDC 2026.
- **GodotPrompter** (MIT): 51 agentic skills para AI coding agents en Godot 4.

**Oportunidad Globant**: "Godot + AI" como alternativa open source a Unity sin controversias de pricing.

### 2. Unity MCP Ecosystem — cuatro servidores compiten, uno domina
En 2026 el ecosistema Unity MCP replicó y superó al Godot MCP:
- **CoplayDev/unity-mcp** (MIT, **5.8k stars**): 47 herramientas, el más adoptado. Claude/Codex/Copilot/LLMs locales.
- **IvanMurzak/Unity-MCP** (MIT, 3.4k stars): cualquier método C# → herramienta con una línea.
- **CoderGamester/mcp-unity** (MIT, 1.8k stars): Node.js bridge para IDEs (Cursor, Windsurf, Claude Code).
- **AnkleBreaker-Studio/unity-mcp-server** (MIT, 278 stars): 268 herramientas, mayor cobertura.

Señal: >11k stars en Unity MCP en 2026. AI-assisted dev en Unity ya no es opcional.

### 3. LLM NPCs — de demo a producción + Long-Term Memory (breakthrough 2026)
En 2026, NPCs con LLMs pasaron a producción en títulos comerciales:
- Segmento NPCs + Digital Humans: **28.6% del mercado total AI gaming** (mayor segmento).
- Impacto medido: +40% immersion scores, +28% session time en RPGs.
- **Breakthrough 2026 — Long-Term Memory (LTM)**: vector databases permiten NPCs que recuerdan acciones pasadas del jugador, tono de voz, alineación moral. Personajes que evolucionan.
- Arquitectura ganadora: BT (estructura reactiva) + LLM (diálogo generativo) + Vector Store (memoria) + LTM.
- **Inworld AI** (cerrado) + **NVIDIA ACE**: stack propietario dominante en AAA.
- Alternativa OSS: Interactive LLM NPCs (MIT, 716 stars) + LimboAI + Ollama.
- **LLMUnity** (Apache-2.0, 1.7k stars): LLMs locales o cloud directamente en Unity.
- **openNPC** (MIT): NPC autónomo sin LLM requerido en runtime — diferenciador para indie.

### 4. COCOS 4 — MIT license unlock (enero 2026)
COCOS 4 adoptó MIT en enero 2026 eliminando todas las restricciones comerciales.

> "AI can better understand open code and guide the engine to evolve in AI-friendly directions." — Equipo COCOS

Impacto estratégico:
- COCOS domina mobile gaming en Asia → ahora accesible para LATAM sin licensing fees
- Filosofía AI-native: código abierto permite a AI tools razonar y modificar el engine directamente
- NPUs en móviles (2026) + ONNX models → AI on-device en COCOS sin servidor
- Para Globant: oportunidad en studios mobile LATAM con presupuesto ajustado

### 5. GameCoder LLMs especializados
- **OpenGame / GameCoder-27B** (Apache-2.0, abr 2026): primer LLM open source entrenado en código de juegos via RL orientado a ejecución. Genera juegos web end-to-end.
- **Roblox CUBE 3D** (1.8B params, mar 2025): genera objetos 3D desde texto on-platform.
- Tendencia: modelos especializados en game dev superan a modelos generales en tareas de código de juego.

### 6. RL para testing automatizado y balance
- **godot_rl_agents** activo con 4 frameworks RL.
- Agentes RL entrenados para exploración de nivel → detectan bugs edge-case que QA manual no encuentra.
- Balance detection: agentes que encuentran estrategias dominantes (exploits) antes del launch.
- **GameStudio Subagents**: equipo de agentes multi-rol (dev, QA, artist) en terminal.
- Datos AAA: ahorro promedio $10M/título. Dev cycles 24 meses → 12 meses.
- Reducción estimada de QA manual: 60-70% en proyectos con RL QA implementado.

### 7. Nakama como backend universal para proyectos OSS
- 12.8k stars, Apache-2.0, SDK oficial Godot, Unreal, Unity.
- 500k devs, 1B+ players en producción.
- Adoptado como backend por defecto en proyectos Godot+AI.
- Extensible: hooks en Go/TypeScript/Lua para añadir AI server-side.

### 8. Analytics predictivo — churn y LTV
- GNNs (Graph Neural Networks) sobre comportamiento + red social: 75.83 AUROC vs 62.44 LightGBM flat-table.
- Predicción de churn 14 días en adelante.
- Señales más fuertes: amigos que se van, difficulty walls, session lengths declining.
- F2P mobile dominante en LATAM → retención es crítica → oportunidad.
- Herramientas: PyTorch Geometric (PyG) para GNNs, PostHog (MIT, 23k stars) para events.

### 9. Anti-cheat con ML conductual
- Shift de detección por firmas (binarios) a detección por comportamiento (server-side ML).
- Ventaja: no se puede bypassear con ofuscación; detecta cheaters nuevos sin actualizar reglas.
- GNNs para detectar redes coordinadas (boosting, account sharing, fraud en iGaming).
- Driver LATAM: regulación iGaming Brasil 2025 exige sistemas anti-fraud activos.

### 10. Tensión de adopción: studios SÍ, gamers NO
Una tensión estructural emergió en 2026 que define el approach correcto:

| Lado | Dato | Implicación |
|------|------|-------------|
| Studios (adopción) | 36% usa GenAI personalmente; 87% usa AI en workflows | AI es parte del toolkit estándar |
| Studios (sentimiento) | **52% ve GenAI negativamente** (vs 30% en 2025) | Backlash interno creciente por calidad/empleos |
| Gamers | **85% actitudes negativas** hacia AI en juegos | AI visible = rechazo de mercado |
| Steam | 7,300+ juegos declaran uso de AI | Mercado más grande de lo que parece |

**Conclusión estratégica**: el éxito está en **"AI invisible"** — usar AI para producción (QA, assets, dev tooling) sin exponer la "AI-ness" al jugador final. Los NPCs AI funcionan CUANDO el jugador no sabe que habla con AI.

---

## En el radar (emergente, 2026-2027)

| Tendencia | Señal | ETA |
|-----------|-------|-----|
| **AI-native games** (world models) | Yuan-ManX/AI-Native-Game tracker activo. Genie 2 (Google). | 2026-2027 |
| **Gemma 3n on-device NPCs** | Demostrado en Godot sin API. Offline-first gaming. | Ya disponible en beta |
| **Villanos adaptativos** | Aivill (SKYHUBDev): villanos que aprenden del jugador. | Concepto emergente |
| **AI game masters** | VirtualGameMaster (MIT, 300 stars): GM automático para RPGs. | En adopción indie |
| **PCG con diffusion models** | Generación de assets (texturas, música, diálogos) in-pipeline. | Parcialmente productivo ya |
| **Agentic PCG** | LLMs que usan WFC/otros como tools (Zehua Jiang, 2025). Validado en Zelda/Sokoban. | Research → producción 2027 |
| **gamescom latam** | Primer evento dedicado LATAM 2026. Signal de regionalización. | Continuo |
| **COCOS 4 AI community** | MIT unlock ene 2026. Comunidad OSS AI sobre COCOS por desarrollar. | Oportunidad 2026-2027 |

---
*v2 (2026-07-07): añadido Unity MCP ecosystem (#2), COCOS 4 MIT (#4), Tensión studios/gamers (#10), LTM NPCs, datos GDC 2026 SOTI.*
*Fuentes: GDC 2026 SOTI, GitHub (verificado 2026-07-07), agentmarketcap.ai, aivexify.com, solidaitech.com*
