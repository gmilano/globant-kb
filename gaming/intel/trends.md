# Tendencias — Gaming AI 2026

> Investigación curada con datos verificados. Última actualización: 2026-07-06

## Tendencias confirmadas (alta confianza)

### 1. Ecosistema Godot como plataforma AI-first
Godot (MIT, 112k stars) emergió como el engine open source con el ecosistema AI más rico:
- **LimboAI** (MIT, 2.8k stars): BTs + Hierarchical State Machines. Stack NPC AI maduro.
- **Beehave** (MIT, 3.2k stars): behavior trees componibles en el scene tree de Godot.
- **godot-ai** (MIT, 805 stars, abr 2026): MCP server, 120+ operaciones, conecta Claude/Codex al editor en vivo.
- **godot_rl_agents** (MIT, 900+ stars): wrappers para 4 frameworks RL (SB3, Sample Factory, RLLib, CleanRL).
- **NobodyWho** (EUPL, ver licencia): NPCs con LLM local, instalación 1-click en Godot AssetLib (jun 2026).
- **NVIDIA fork Godot** con path tracing (MIT) lanzado en GDC 2026.

**Oportunidad Globant**: "Godot + AI" como alternativa open source a Unity sin controversias de pricing.

### 2. LLM NPCs — de demo a producción
En 2026, NPCs con LLMs pasaron a producción en títulos comerciales:
- Segmento NPCs + Digital Humans: **28.6% del mercado total AI gaming** (mayor segmento).
- Impacto medido: +40% immersion scores, +28% session time en RPGs.
- Arquitectura ganadora: BT (estructura reactiva) + LLM (diálogo generativo) + Vector Store (memoria).
- **Inworld AI** (cerrado) + **NVIDIA ACE**: stack propietario dominante en AAA.
- Alternativa OSS: Interactive LLM NPCs (MIT, 716 stars) + LimboAI + Ollama.
- **LLMUnity** (Apache-2.0, 1.7k stars): LLMs locales o cloud directamente en Unity.

### 3. GameCoder LLMs especializados
- **OpenGame / GameCoder-27B** (Apache-2.0, abr 2026): primer LLM open source entrenado en código de juegos via RL orientado a ejecución. Genera juegos web end-to-end.
- **Roblox CUBE 3D** (1.8B params, mar 2025): genera objetos 3D desde texto on-platform.
- Tendencia: modelos especializados en game dev superan a modelos generales en tareas de código de juego.

### 4. RL para testing automatizado y balance
- **godot_rl_agents** activo con 4 frameworks RL.
- Agentes RL entrenados para exploración de nivel → detectan bugs edge-case que QA manual no encuentra.
- Balance detection: agentes que encuentran estrategias dominantes (exploits) antes del launch.
- **GameStudio Subagents**: equipo de agentes multi-rol (dev, QA, artist) en terminal.
- Reducción estimada de QA manual: 60-70% en proyectos con RL QA implementado.

### 5. Nakama como backend universal para proyectos OSS
- 12.8k stars, Apache-2.0, SDK oficial Godot, Unreal, Unity.
- 500k devs, 1B+ players en producción.
- Adoptado como backend por defecto en proyectos Godot+AI.
- Extensible: hooks en Go/TypeScript/Lua para añadir AI server-side.
- Nakama vs Managed (2026): mayoría de proyectos mid-size prefieren self-host para control de datos.

### 6. AI asistido en el desarrollo (tooling)
- **Unity AI** (v6.2, mid-2025): suite integrada en editor. Assistant (docs/code), Generators (texturas/sprites), Inference Engine (on-device).
- **Godot + godot-ai**: Claude Code/Cursor conectados al editor via MCP. 120+ operaciones: build scenes, edit scripts, wire signals.
- **Unreal — Aura** (Ramen VR, ene 2026): agente editor + coding. Caso: *Zombonks* lanzado en 5 meses (mitad del tiempo).
- Adopción: 87% de estudios ya usa AI agents en workflows (Google Cloud survey, jun-jul 2025).

### 7. Analytics predictivo — churn y LTV
- GNNs (Graph Neural Networks) sobre comportamiento + red social: 75.83 AUROC vs 62.44 LightGBM flat-table.
- Predicción de churn 14 días en adelante.
- Señales más fuertes: amigos que se van, difficulty walls, session lengths declining.
- F2P mobile dominante en LATAM → retención es crítica → oportunidad.
- Herramientas: PyTorch Geometric (PyG) para GNNs, PostHog (MIT, 23k stars) para events, Grafana (Apache-2.0) para dashboards.

### 8. Anti-cheat con ML conductual
- Shift de detección por firmas (binarios) a detección por comportamiento (server-side ML).
- Ventaja: no se puede bypassear con ofuscación; detecta cheaters nuevos sin actualizar reglas.
- **OACS** (MIT): framework Python para anomaly detection server-side.
- **UltimateAntiCheat** (AGPL-3.0): referencia educativa C++ client-side.
- GNNs para detectar redes coordinadas (boosting, account sharing, fraud en iGaming).
- Driver LATAM: regulación iGaming Brasil 2025 exige sistemas anti-fraud activos.

---

## En el radar (emergente, 2026-2027)

| Tendencia | Señal | ETA |
|-----------|-------|-----|
| **AI-native games** (world models) | Yuan-ManX/AI-Native-Game tracker activo. Genie 2 (Google). | 2026-2027 |
| **Gemma 3n on-device NPCs** | Demostrado en Godot sin API. Offline-first gaming. | Ya disponible en beta |
| **Villanos adaptativos** | Aivill (SKYHUBDev): villanos que aprenden del jugador. | Concepto emergente |
| **AI game masters** | VirtualGameMaster (MIT, 300 stars): GM automático para RPGs. | En adopción indie |
| **PCG con diffusion models** | Generación de assets (texturas, música, diálogos) in-pipeline. | Parcialmente productivo ya |
| **Supabase para game backends** | Alternativa PostgreSQL a Firebase/Nakama para juegos asíncronos. | Adopción creciente 2026 |

---
*Fuentes: GitHub (verificado 2026-07-02), agentmarketcap.ai, solidaitech.com, snsinsider.com, marketresearchfuture.com*

### 9. GDC 2026 — La brecha adopción-rechazo define el mercado
El GDC State of the Game Industry 2026 (survey con 3.000+ devs profesionales, mar 2026) es el barómetro de la industria:

**Datos clave**:
- 52% de devs ven GenAI negativamente — era 30% en 2025. El rechazo crece más rápido que la adopción.
- Adopción corporativa: 52% de empresas usan GenAI.
- Uso personal real de devs: 36% → brecha "mandato vs convicción" de 16 puntos.
- Usos aceptados: research/brainstorm (81%), code assist (47%), prototipado (35%).
- Usos rechazados: generación de assets (19%), PCG (10%), player-facing (5%).

**Interpretación para Globant**:
El 52% de rechazo no es anti-tecnología — es anti-reemplazo. Los devs aceptan AI para su productividad personal pero rechazan AI que sustituya su craft (arte, diseño, diálogo de personajes). La estrategia correcta para un estudio que vende a estudios de gaming:
1. **Vender como "amplificador de devs"** (no "reemplazo"). Framing: "Tu equipo produce 3x más con AI" > "AI hace el trabajo por ti".
2. **Priorizar casos de uso backend invisible**: matchmaking, anti-cheat, analytics — el jugador no sabe que existe AI ahí.
3. **Evitar** pitches de "NPCs con AI" o "assets generados por AI" como feature principal — 80%+ de devs los ven con sospecha.

Fuente: winbuzzer.com/2026/03/23, blog.imseankim.com/gdc-2026

### 10. World Models como motores de juego — categoría emergente
Los **world models** (modelos que predicen el siguiente frame de juego como estado latente) pasaron de papers académicos a demos jugables entre 2024-2026:

**Hitos principales**:
- **DIAMOND** (NeurIPS 2024 Spotlight, [eloialonso/diamond](https://github.com/eloialonso/diamond), MIT): Agente RL entrenado completamente dentro de un world model difusivo. 1.46 human normalized score en Atari 100k — estado del arte para agentes entrenados en world models. Funciona también como motor neural interactivo de CS:GO sin motor de física.
- **Oasis 500M** (oct 2024, [etched-ai/open-oasis](https://github.com/etched-ai/open-oasis), MIT): Decart + Etched. Primer mundo tipo Minecraft generado frame-a-frame por un transformer difusivo. ~14k stars. Weights públicos (500M params) + inference code.
- **GameNGen** (NeurIPS 2024): DOOM como motor neural en tiempo real — muestra que un diffusion model puede simular un juego FPS clásico.
- **ReactiveGWM** (arxiv jun 2026): NPCs reactivos en world models generativos — conecta la generación de mundo con comportamiento de agentes.

**Estado actual (2026)**:
- **Fortalezas**: entrenamiento RL sin motor, variaciones infinitas de niveles, prototipado visual antes de código.
- **Limitaciones**: inconsistencia temporal (inventario que aparece/desaparece), consumo de GPU alto, no production-ready para juegos publicados completos.
- **Proyección**: categoría "AI-native games" (juegos donde el modelo ES el motor) estará en producción indie 2027-2028.

**Uso hoy en estudios**: entrenar agentes QA sobre representación aprendida del juego (más barato/rápido que ejecutar el motor real). Prototipado de "vibes" de nivel antes de construir el asset.

---
*Fuentes: github.com/eloialonso/diamond, github.com/etched-ai/open-oasis, diamond-wm.github.io, arxiv 2405.12399, arxiv 2605.15256*
