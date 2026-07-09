# Tendencias — Gaming AI 2026

> Investigación curada con datos verificados. Última actualización: 2026-07-08

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

### 9. Carbon Engine open source — base AAA sin royalties (1 julio 2026)
El engine de EVE Online se liberó bajo MIT. Este es el primer motor AAA profesional de MMO en open source con 20+ años de producción demostrada.

- **Trinity renderer**: visuales del espacio EVE para juegos de espacio/sci-fi
- **CarbonIO**: networking probado para 500k+ jugadores simultáneos
- **Python scripting hooks**: extensible con AI via Python (LangChain, Claude SDK, etc.)
- **Por qué importa**: elimina la necesidad de royalties de engine para proyectos enterprise de espacio/MMO. Globant puede ofrecer proyectos basados en Carbon + AI sin lock-in.

### 10. GDC 2026 paradox — el mercado crece aunque los devs estén en contra
La tensión más importante de la industria en 2026: 52% de devs rechazan GenAI, pero los estudios la adoptan de todos modos.

**¿Por qué?** Los decisores (CTOs, PMs) ven el ROI; los ejecutores (artists, writers, programmers) ven la amenaza a sus roles. El resultado es adopción "invisible": AI en pipelines backend que los devs no ven directamente.

**Implicación estratégica**: Globant debe framear los servicios de AI gaming como "herramientas que dan superpoderes al dev", no "AI que reemplaza al dev". El posicionamiento correcto es:
- ❌ "AI que genera assets"
- ✅ "AI que automatiza QA para que tu equipo de arte se enfoque en calidad"
- ❌ "NPCs generados por AI"  
- ✅ "AI que ayuda a tu equipo a crear más personajes con más profundidad"

---

## En el radar (emergente, 2026-2027)

| Tendencia | Señal | ETA |
|-----------|-------|-----|
| **Carbon Engine ecosistema** | Primera semana post-launch. Comunidad formándose. | Próximos 3-6 meses |
| **COCOS 4 AI-native extensions** | MIT + SUD backing + roadmap AI explícito | 2026 Q3-Q4 |
| **AI-native games** (world models) | Yuan-ManX/AI-Native-Game tracker activo. LingBot-World Apache-2.0 (procedural AI world). | 2026-2027 |
| **Gemma 3n on-device NPCs** | Demostrado en Godot sin API. Offline-first gaming. | Ya disponible en beta |
| **openNPC LOD engine** | Arquitectura heuristic→RL según importancia narrativa. No requiere LLM en runtime. | Adopción creciente |
| **PCG con diffusion models** | Generación de assets (texturas, música, diálogos) in-pipeline. | Parcialmente productivo ya |
| **Supabase para game backends** | Alternativa PostgreSQL a Firebase/Nakama para juegos asíncronos. | Adopción creciente 2026 |

---
*Fuentes: GitHub (verificado 2026-07-08), agentmarketcap.ai, solidaitech.com, snsinsider.com, market.us, gdconf.com/GDC-2026-SOTI, fenris.com, opensourceforu.com*
