# Tendencias — Gaming AI 2026

> Investigación curada con datos verificados. Última actualización: 2026-07-12

## 🆕 Tendencias emergentes — Jul 2026

### T0. Carbon Engine — MMO OSS abre nuevo campo (1 Jul 2026)
Fenris Creations (ex-CCP Games) abrió el engine Carbon de EVE Online bajo MIT. **Primer engine AAA de MMO probado en producción** como open source.
- 20+ módulos: Destiny (física + pathfinding server-authoritative), Trinity (gráficos)
- Oportunidad: studios pueden construir MMOs sobre base probada en 20+ años sin pagar licencia
- Impacto en AI: integrar LLMs para NPCs de facción, RL para comportamiento emergente de facciones, world simulation agents
- **Riesgo**: comunidad OSS nueva. Ecosistema en formación. Evaluar en 6-12 meses.

---

## Tendencias confirmadas (alta confianza)

### T1. Ecosistema Godot como plataforma AI-first
Godot (MIT, 112k stars) emergió como el engine open source con el ecosistema AI más rico. **Godot 4.4 potencia ~12% de nuevas releases en Steam** (mayo 2026). Godot 4.5 beta corre en paralelo.
- **LimboAI** (MIT, 2.8k stars): BTs + Hierarchical State Machines. Stack NPC AI maduro.
- **Beehave** (MIT, 3.2k stars): behavior trees componibles en el scene tree de Godot.
- **godot-ai** (MIT, 805 stars, abr 2026): MCP server, 120+ operaciones, conecta Claude/Codex al editor en vivo.
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

### T3. GameCoder LLMs especializados
- **OpenGame / GameCoder-27B** (Apache-2.0, ~2.3k stars, abr 2026): primer LLM open source entrenado en código de juegos via RL orientado a ejecución. Genera juegos web end-to-end.
- **Roblox CUBE 3D** (1.8B params, mar 2025): genera objetos 3D desde texto on-platform.
- Tendencia: modelos especializados en game dev superan a modelos generales en tareas de código de juego.
- **GDevelop AI** (2024+): genera juegos desde lenguaje natural. Engine no-code + AI = prototipado ultra-rápido.

### T4. RL para testing automatizado y balance
- **godot_rl_agents** activo con 4 frameworks RL.
- Agentes RL entrenados para exploración de nivel → detectan bugs edge-case que QA manual no encuentra.
- Balance detection: agentes que encuentran estrategias dominantes (exploits) antes del launch.
- Framework **TITAN** (MMORPGs): combina zero-shot LLMs con componentes especializados para testing. Adoptado en pipelines QA de varios estudios (2026).
- Reducción estimada de QA manual: 60-70% en proyectos con RL QA implementado.

### T5. Nakama como backend universal para proyectos OSS
- 12.8k stars, Apache-2.0, SDK oficial Godot, Unreal, Unity.
- 500k devs, 1B+ players en producción.
- Adoptado como backend por defecto en proyectos Godot+AI.
- Extensible: hooks en Go/TypeScript/Lua para añadir AI server-side.

### T6. AI asistido en el desarrollo (tooling)
- **Unity AI** (v6.2, mid-2025): suite integrada en editor. Assistant (docs/code), Generators (texturas/sprites), Inference Engine (on-device).
- **Godot + godot-ai**: Claude Code/Cursor conectados al editor via MCP. 120+ operaciones.
- **Unreal — Aura** (Ramen VR, ene 2026): agente editor + coding. Caso: *Zombonks* lanzado en 5 meses.
- **Bevy v0.16** (Rust, MIT, 2026): motor ECS maduro. Sin GUI editor — mundo en código. Ahora consideración seria.
- Adopción: 87% de estudios ya usa AI agents en workflows (Google Cloud survey, jun-jul 2025); 50%+ usa AI activamente (GDC 2026).

### T7. Analytics predictivo — churn y LTV
- GNNs (Graph Neural Networks) sobre comportamiento + red social: 75.83 AUROC vs 62.44 LightGBM flat-table.
- Predicción de churn 14 días en adelante.
- Señales más fuertes: amigos que se van, difficulty walls, session lengths declining.
- F2P mobile dominante en LATAM → retención es crítica → oportunidad.
- Herramientas: PyTorch Geometric (PyG) para GNNs, PostHog (MIT, 23k stars) para events, Grafana (Apache-2.0) para dashboards.

### T8. Anti-cheat con ML conductual
- Shift de detección por firmas (binarios) a detección por comportamiento (server-side ML).
- Modelos GNN sobre grafos de interacción entre jugadores detectan boosting/account sharing.
- Anomaly detection en timing de inputs (aimbot detection).
- iGaming LATAM (Brasil 2025): regulación requiere anti-fraud — driver comercial concreto.

### T9. LLM Agents jugando juegos — evaluación y emergencia
- **GamingAgent** ([lmgame-org/GamingAgent](https://github.com/lmgame-org/GamingAgent), MIT, ICLR 2026): paper "lmgame-Bench: How Good are LLMs at Playing Games?" (UC Berkeley).
- Benchmark estándar para evaluar LLMs en: Sokoban, Tetris, Candy Crush, 2048, Super Mario Bros, Ace Attorney.
- Evalúa: vision brittleness, prompt variance, data contamination.
- Impacto: establece referencia para validar capacidades agenticas de LLMs usados como NPCs.

### T10. Sentimiento industria — GDC 2026 (dato importante)
- **52% de profesionales cree que GenAI daña la industria** — mayor porcentaje en cualquier encuesta GDC.
- Preocupaciones: desplazamiento laboral ("gameslop" inundando tiendas), calidad del contenido.
- **Oportunidad curation**: con 7,300+ juegos en Steam usando AI (doble vs 2024), la curación y discovery se vuelven críticos.
- **Oportunidad responsabilidad**: studios que usan AI de forma ética y transparente se diferencian.

---

## Señales emergentes (monitorear)

- **AI-native games**: proyectos donde la AI IS el juego (world models, generative environments) — tracking en [AI-Native-Game](https://github.com/Yuan-ManX/AI-Native-Game).
- **Bevy + AI**: motor Rust madurando — comunidad explorando integración con modelos ML en Rust.
- **Carbon Engine ecosystem**: comunidad OSS formándose alrededor del engine de EVE Online. Primeros plugins y forks en los próximos meses.
- **On-device gaming AI**: Gemma 3n demostrado en Godot; Unity Inference Engine; tendencia hacia NPCs offline-first sin latencia de nube.

---
*Fuentes: gdconf.com/GDC-2026-SOTI, youngju.dev/blog/2026-05-16, gamingonlinux.com, gamedeveloper.com, opensourceforu.com, globenewswire.com/2026/07/03 (verificado 2026-07-12)*
