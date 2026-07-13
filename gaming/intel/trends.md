# Tendencias — Gaming AI 2026

> Investigación curada con datos verificados. Última actualización: 2026-07-13 | v7

## Tendencias confirmadas (alta confianza)

### 1. 🆕 Carbon Engine — Motor AAA open source (julio 2026)
Fenris Creations publicó Carbon bajo **MIT** el 1 de julio 2026 en [github.com/carbonengine](https://github.com/carbonengine).
- **Trinity**: rendering engine para gráficos AAA
- **Destiny**: física y pathfinding para batallas masivas de flota (EVE Online)
- 24+ módulos de simulación, gráficos y física
- Comunidad activa desde el día 1 con PRs de seguridad y herramientas

**Implicación para Globant**: primer motor AAA battle-tested, MIT, para juegos espaciales/MMO/simulación. Módulos aprovechables de forma aislada (Destiny pathfinding para cualquier juego con agentes masivos).

### 2. 🆕 COCOS 4 — Engine AI-native open source (enero 2026)
COCOS 4 publicado bajo **MIT** en ene-2026 por SUD (ex-Cocos, adquirido $72M).
- AI-native: nuevas features distribuidas como MCPs/Agents
- JS/TypeScript primario (óptimo para codegen con LLMs)
- Sin royalties ni restricciones comerciales
- 500M+ jugadores en juegos COCOS en LATAM/Asia

**Implicación para Globant**: engine dominante en mobile gaming LATAM. Stack JS/TS + MCP = integración AI mínima fricción. Opportunity gap vs studios que aún no lo saben.

### 3. 🆕 Godot Foundation AI ban en core (1 julio 2026)
La Godot Foundation **prohibió** PRs de "vibe coding" y AI agents en el engine core.
- Razón: el código del motor requiere comprensión profunda y revisión humana experta
- **Sin afectar**: plugins, addons, proyectos de usuarios — sin restricción
- Ecosistema MCP/AI para Godot (godot-ai, Godot-MCP, etc.) continúa sin restricciones

**Implicación**: oportunidad para Globant como contribuidor humano de calidad al engine + builder de plugins AI encima.

### 4. 🆕 OmniGameArena — VLM benchmark para agentes gaming (junio 2026)
Paper arXiv:2606.09826. 12 juegos UE5. Resultado clave: **VLMs comerciales (Claude, GPT, Gemini, Qwen) aún superados por políticas especializadas (NitroGen) en tiempo real**.
- Gap principal: latencia de inferencia en VLMs vs políticas RL pre-entrenadas
- IDC (Improvement Dynamics Curve): mide cuánto mejora un agente con reflexión propia
- Implicación: para juegos competitivos en tiempo real, políticas RL especializadas siguen siendo superiores

### 5. MCP para engines — Unity y Godot (explosion Q2-Q3 2026)
El protocolo MCP (Model Context Protocol) explotó en game development:

**Unity**: 5+ implementaciones activas
- AnkleBreaker (288 tools, MIT): la suite más completa
- CoplayDev (5.8k stars, MIT): mayor adopción
- IvanMurzak (MIT): cualquier método C# → herramienta con 1 línea

**Godot**: 6+ implementaciones activas
- hi-godot/godot-ai (MIT, en Asset Library): 120+ ops, 41 tools
- IvanMurzak/Godot-MCP (Apache-2.0, C#): 39 tools, 11 familias
- mkdevkit/godot-mcp (MIT): controla editor completo

**Implicación**: MCP se convierte en el estándar para AI-assisted game development. Cualquier studio puede conectar Claude Code / Cursor / Codex a su engine en horas.

### 6. Ecosistema Godot como plataforma AI-first
Godot (MIT, 112k stars) mantiene el ecosistema AI más rico en open source:
- **LimboAI** (MIT, 2.9k stars): BTs + Hierarchical State Machines
- **Beehave** (MIT, 3.4k stars): behavior trees componibles
- **godot-ai** (MIT, 900+ stars): MCP server production-grade
- **godot_rl_agents** (MIT, 950+ stars): 4 frameworks RL
- **NobodyWho** (EUPL): NPCs con LLM local, 1-click AssetLib

### 7. LLM NPCs — de demo a producción
En 2026, NPCs con LLMs están en producción en títulos comerciales:
- Segmento NPCs + Digital Humans: **28.6% del mercado total AI gaming** (mayor segmento)
- Impacto medido: **+43% player retention** y **2.3× playtime** en juegos con AI avanzada
- Arquitectura ganadora: BT (estructura reactiva) + LLM (diálogo generativo) + Vector Store (memoria)
- Alternativa OSS: Interactive LLM NPCs (MIT) + LimboAI + Ollama

### 8. GameCoder LLMs especializados
- **OpenGame / GameCoder-27B** (abr 2026): primer LLM OSS entrenado vía RL en código de juegos. Genera juegos web end-to-end.
- Modelos especializados superan a modelos generales en tareas de game code
- Tendencia: fine-tuning de Llama/CodeLlama en GDScript, GML, Lua

### 9. RL para testing automatizado y balance
- **godot_rl_agents** activo con 4 frameworks RL
- Reducción estimada de QA manual: 60-70% con agentes exploradores RL
- Balance detection: agentes que encuentran exploits antes del launch
- **GameStudio Subagents** (MIT): equipo multi-rol (dev, QA, artist, designer) en terminal

### 10. Nakama como backend universal OSS
- 12.8k stars, Apache-2.0, SDK oficial Godot/Unreal/Unity
- 500k devs, 1B+ players en producción
- Extensible: hooks en Go/TypeScript/Lua para añadir AI server-side
- Patrón: Nakama + ONNX + PostHog = backend inteligente completo

### 11. Analytics predictivo — churn y LTV
- GNNs (Graph Neural Networks) sobre comportamiento + red social: 75.83 AUROC vs 62.44 LightGBM
- Predicción de churn 14 días en adelante
- Señales más fuertes: amigos que se van, difficulty walls, session lengths declining
- F2P mobile dominante en LATAM → retención es crítica → oportunidad

### 12. Anti-cheat con ML conductual
- Shift de detección por firmas → detección por comportamiento (server-side ML)
- **OACS** (MIT): framework Python para anomaly detection server-side
- GNNs para detectar redes coordinadas (boosting, fraud en iGaming)
- Driver LATAM: regulación iGaming Brasil 2025 exige sistemas anti-fraud activos

---

## En el radar (emergente, 2026-2027)

| Tendencia | Señal | ETA |
|-----------|-------|-----|
| **AI-native games** (world models) | Yuan-ManX/AI-Native-Game tracker activo. Genie 2 (Google). | 2026-2027 |
| **Gemma 3n on-device NPCs** | Demostrado en Godot sin API. Offline-first gaming. | Ya disponible en beta |
| **Carbon Engine community** | Engine EVE Online nuevo en OSS. Ecosistema de plugins por construir. | Q3-Q4 2026 |
| **COCOS 4 MCP ecosystem** | AI-native features = MCPs/Agents. Ecosystem embrionario. | Q3 2026 |
| **Villanos adaptativos** | Aivill (SKYHUBDev): villanos que aprenden del comportamiento del jugador. | Concepto emergente |
| **AI game masters** | VirtualGameMaster (MIT, 300 stars): GM automático para RPGs. | En adopción indie |
| **PCG con diffusion models** | Generación de assets (texturas, música, diálogos) in-pipeline. | Parcialmente productivo ya |

## Fricción del mercado

### Resistencia de desarrolladores
- **GDC 2026**: 52% de desarrolladores dicen que GenAI *daña* la industria (vs 7% positivos)
- Causas: preocupaciones de employment en arte/narrativa, calidad inconsistente, incertidumbre en licencias
- **Área menos cuestionada**: AI como herramienta de dev (MCP, testing, analytics) vs reemplazo de artistas

### Área de consenso
- 90% de devs integra AI en su workflow — la adopción existe
- El debate no es IF usar AI sino HOW y para QUÉ
- Oportunidad Globant: posicionarse en "AI que amplifica al desarrollador", no "AI que reemplaza"

---
*v7 actualizado 2026-07-13. Fuentes: gamingonlinux.com, itsfoss.com, arxiv.org (2606.09826), blog.imseankim.com/gdc-2026, verifiedmarketresports.com, marketresearchfuture.com*
