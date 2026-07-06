# Tendencias — Gaming AI 2026

> Investigación curada con datos verificados. Última actualización: 2026-07-06 (segunda pasada)

## Tendencias confirmadas (alta confianza)

### 1. Ecosistema Godot como plataforma AI-first
Godot (MIT, **114k stars**) emergió como el engine open source con el ecosistema AI más rico:
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
- **62% de los nuevos juegos RPG/aventura tienen AI NPCs** (2026 vs **8% en 2024**) — crecimiento explosivo.
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

### 9. VLM gaming agents como benchmark estándar (NUEVO — Jul 2026)
**GamingAgent** ([lmgame-org/GamingAgent](https://github.com/lmgame-org/GamingAgent), MIT, 947★) publicado en **ICLR 2026** establece el paradigma:
- Evalúa LLMs/VLMs jugando videojuegos reales sin infraestructura extra
- Soporta: Tetris, Sokoban, 2048, Pokémon Red, Super Mario Bros, Candy Crush, Ace Attorney
- Multi-provider: OpenAI, Anthropic, Gemini, xAI, DeepSeek, Qwen
- **Impacto**: el gaming se convierte en benchmark de razonamiento espacial y secuencial para modelos
- Usos en studio: evaluar qué LLM es mejor para tareas de game AI específicas antes de integrarlo

### 10. Open sourcing de motores AAA (NUEVO — Jul 2026)
Semana del 1-5 julio 2026: dos releases de motores open source de alto impacto:
- **Carbon Engine** (Fenris/CCP Games): motor de EVE Online liberado **MIT el 1-julio-2026**. C++ cross-platform, 20+ años en producción MMO. Sub-módulos Apache-2.0 y PSF. URL: [FenrisCreations/carbon](https://github.com/FenrisCreations/carbon)
- **COCOS 4** (ya MIT desde inicio de 2026): motor cross-platform popular en Asia, era propietario.

Tendencia de fondo: estudios AAA comienzan a monetizar su IP tecnológica via OSS (reducción de costos de mantenimiento + comunidad → contrataciones + reputación). Esto abre oportunidades para Globant de customizar motores battle-tested para clientes.

### 11. MCP multi-engine — la capa de AI dev tooling se estandariza (NUEVO — Jul 2026)
A mediados de 2026 los tres motores principales lograron cobertura MCP madura simultáneamente:
- **Unity-MCP** ([IvanMurzak/Unity-MCP](https://github.com/IvanMurzak/Unity-MCP), Apache-2.0, ~3k stars): 52 tools, 48 prompts, 12 categorías. Cualquier método C# se convierte en tool con una línea. El más completo en stars y funcionalidad.
- **Unreal-MCP** ([IvanMurzak/Unreal-MCP](https://github.com/IvanMurzak/Unreal-MCP), Apache-2.0): 62 tools en 8 familias para UE 5.7 (actores, Blueprints, assets, C++).
- **Godot-AI** ([hi-godot/godot-ai](https://github.com/hi-godot/godot-ai), MIT, 805+ stars): 120+ ops, 41 tools — el pionero (abr 2026).
- **GameDev-MCP-Server** ([IvanMurzak/GameDev-MCP-Server](https://github.com/IvanMurzak/GameDev-MCP-Server), MIT): infraestructura bridge engine-agnostic compartida.

**Impacto**: Con los tres engines cubiertos, los AI coding agents (Claude Code, Cursor, Copilot, Gemini) pueden operar en **cualquier engine** mediante la misma interfaz MCP. Esto elimina la barrera "cuál engine usa el cliente" para ofrecer AI-assisted game dev. Los estudios que usan múltiples engines (Unity para mobile + Unreal para console) ahora tienen un paradigma unificado.

**Adopción esperada**: Los MCP servers para engines madurarán rápido — es el mismo patrón que los MCP servers para DBs (Postgres-MCP, etc.) pero para el dominio de game dev. Seguir la curva de adopción de Unity-MCP como indicador.

---

## En el radar (emergente, 2026-2027)

| Tendencia | Señal | ETA |
|-----------|-------|-----|
| **AI-native games** (world models) | Yuan-ManX/AI-Native-Game tracker activo. Genie 2 (Google). | 2026-2027 |
| **Gemma 3n on-device NPCs** | Demostrado en Godot sin API. Offline-first gaming. | Ya disponible en beta |
| **Villanos adaptativos** | Aivill (SKYHUBDev): villanos que aprenden del jugador. | Concepto emergente |
| **AI game masters** | VirtualGameMaster (MIT, 300 stars): GM automático para RPGs. | En adopción indie |
| **PCG con diffusion models** | Generación de assets (texturas, música, diálogos) in-pipeline. AI reduce asset time 70-90%. | Parcialmente productivo ya |
| **StableGen / Dream Textures** | OSS Blender addons para texturizar 3D con GenAI (TRELLIS.2 + SDXL). | Workflow productivo ya |
| **Supabase para game backends** | Alternativa PostgreSQL a Firebase/Nakama para juegos asíncronos. | Adopción creciente 2026 |
| **Carbon Engine fork projects** | MMO open source sobre Carbon (EVE engine). | Proyectos surgirán en Q3 2026 |
| **52% devs contra GenAI** (GDC 2026) | Sentiment negativo en aumento — resistencia a AI player-facing pero uso detrás del escenario. | Tendencia establecida 2026 |

---
*Fuentes: GitHub (verificado 2026-07-06), blog.imseankim.com (GDC 2026), aivexify.com, opensourceforu.com (Carbon Engine), grandviewresearch.com, solidaitech.com, thebusinessresearchcompany.com (jul 2026), businessresearchinsights.com*
