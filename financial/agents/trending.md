# 📈 Agentes trending — Financial Services

> Lo más nuevo y en crecimiento. Última actualización: 2026-07-14 (v6)
> ⚠️ EU AI Act deadline: **2026-08-02 — 19 días**

## Qué está explotando — semana del 14 jul 2026

### 🔥 NUEVO: ATLAS — Agentes de trading que reescriben sus propios prompts
[chrisworsey55/atlas-gic](https://github.com/chrisworsey55/atlas-gic) | MIT

El framework más conceptualmente avanzado de 2026. Aplica tres ideas convergentes al mercado financiero:
1. **Karpathy Autoresearch**: los prompts de los agentes son los "pesos" del sistema, optimizados vía feedback del mercado
2. **Reflexividad de Soros**: el sistema modela cómo sus propias predicciones afectan el mercado
3. **Swarm Agents de MiroFish**: enjambre de agentes especializados con selección competitiva

**Arquitectura**: 25 agentes en 4 capas (macro, sector, superinvestor philosophy, decision). El agente con peor Sharpe ratio recibe un rewrite completo de sus prompts cada 5 días de trading. El mejor rewrite sobrevive; los fallidos se revierten vía git. 9 agentes fueron generados autónomamente para cubrir gaps detectados (credit markets, earnings calendar, options flow, etc.); 3 fueron eliminados por baja performance.

**Resultado**: +22% return en 173 días de deployment con capital real (General Intelligence Capital).

**Por qué importa para Globant**: primer demo de prompts-as-weights en producción financiera. El patrón es generalizable: cualquier sistema de agentes en cualquier dominio puede adoptar Darwinian selection. Argumenta a favor de arquitecturas de agentes con self-improvement vs hardcoded logic.

---

### 🔥 NUEVO: AI-Trader — Trading 100% agent-native (HKUDS, may 2026)
[HKUDS/AI-Trader](https://github.com/HKUDS/AI-Trader) | MIT

El mismo equipo que lanzó Vibe-Trading (workspace de research) ahora entrega AI-Trader: una plataforma donde los propios agentes AI son los participantes del mercado. Diferencia clave vs otros frameworks:

- **Agent-native by design**: no es un bot que ejecuta reglas — es un exchange donde agentes compiten y colaboran
- **Collective intelligence**: los agentes debaten ideas de trading entre sí antes de ejecutar
- **Universal market access**: Stocks, Crypto, Forex, Options, Futures desde un solo endpoint
- **One-Click Copy Trading**: seguir al top performer en tiempo real
- **Agentes compatibles**: Claude Code, Cursor, OpenClaw, Codex, nanobot

**Update crítico (9 abr 2026)**: streamlining masivo del codebase para hacerlo más fácil de modificar y operar por agentes. La intención explícita: que los agentes AI puedan entender, navegar y modificar su propio entorno de trading.

---

### 🔥 NUEVO: MCP Ecosystem Financiero 2026 — 12+ servidores listos
Según la guía comparativa de [chartlibrary.io](https://chartlibrary.io/blog/financial-mcp-servers-compared), hay más de 12 MCP servers financieros disponibles en julio 2026:

| MCP | Función | Por qué es diferente |
|-----|---------|----------------------|
| financial-datasets-mcp | Raw data (stocks) | El más universal — todos los agentes lo necesitan |
| open-paper-trading-mcp | Simulación sin riesgo | 43 tools, options chain + Greeks, diseñado para entrenar agentes |
| Alpaca MCP | Ejecución real | Único MCP con live trade execution regulado |
| tradingview-mcp | Análisis técnico + screeners | Datos de TradingView para cualquier agente MCP |
| mcp-trader | Portfolio management | Para traders humanos con asistente AI |
| FinAegis MCP | Core banking + compliance | 12 herramientas bancarias con OAuth y límites de gasto |
| FINOS AIGF MCP | Governance framework | EU AI Act + OWASP integrado como MCP — para finanzas reguladas |

**Patrón emergente**: el stack de un agente financiero en 2026 = LLM + 3-4 MCPs especializados. Cada MCP resuelve una capa (datos/simulación/ejecución/compliance). No hay un MCP monolítico — es composición.

---

### 🔥 NUEVO: FINOS AI Fund — Gobernanza AI financiera como OSS (jul 2026)
[finos.org](https://www.finos.org/press/finos-launches-ai-fund)

El 1 de julio de 2026, FINOS (Fintech Open Source Foundation, Linux Foundation) lanzó el **FINOS AI Fund** con un Governing Board fundador compuesto por:
- **DTCC** (Depository Trust & Clearing Corporation)
- **Morgan Stanley**
- **RBC** (Royal Bank of Canada)
- **NatWest**

Objetivo: estándares abiertos para agentic AI en servicios financieros regulados. Proyectos activos:
- **AI Governance Framework (AIGF)**: catálogo de riesgos y mitigaciones + MCP server
- **Common Controls for AI Services**: controles comunes con BMO, Citi, Morgan Stanley, RBC, Bank of America + Microsoft, Google Cloud, AWS
- **Open Resource Broker (ORB)**: API unificada para HPC con MCP server (Morgan Stanley + AWS + RBC)
- **CALM (Compliant Architecture for Lightweight Messaging)**: estándar de mensajería para AI en finanzas

**Por qué importa**: los bancos tier-1 globales están contribuyendo su IP de governance como OSS — señal de que la capa de compliance AI se está commoditizando. Las firmas que dominen la implementación de AIGF/Common Controls antes del 2 ago 2026 capturan el revenue de EU AI Act compliance.

---

### 🔥 TradingAgents v0.3.1 — Fix crítico de look-ahead bias
[TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | MIT | 82k+★

**Fix crítico**: Alpha Vantage look-ahead filtering — backtests con v0.2.x usaban datos del futuro, inflando los resultados. Cualquier paper o repo que cite TradingAgents con v0.2.x tiene resultados no reproducibles.

**Impacto del fix de look-ahead**: al evaluar repositorios de trading AI en 2026, exigir point-in-time correctness. La mayoría de backtests publicados pre-julio 2026 no son válidos.

**Multi-provider 2026**: soporte completo para Azure, DeepSeek, Qwen, NVIDIA, Kimi, Groq, Mistral + nuevos data vendors (FRED economic data, Polymarket prediction market feeds).

---

### FinRobot Desktop v0.1.0 — App nativa para analistas sin código
[AI4Finance-Foundation/FinRobot](https://github.com/AI4Finance-Foundation/FinRobot) | MIT

App macOS nativa (PydanticAI + FastAPI + React/Tauri) que lleva workflows de equity research multi-agente a analistas que solo usan Excel. Separación explícita: cómputo determinístico (DCF, DDM, LBO, Monte Carlo) en código Python puro; LLMs solo para narración, síntesis y reportes.

**Impacto LATAM**: los bancos de inversión en Brasil, México, Colombia donde los analistas no programan ahora tienen una puerta de entrada agentica sin fricción técnica.

---

### BigFinanceBench (arXiv:2606.03829, jun 2026) — 58.8% gap vs experto
[RogoAI/big-finance-benchmark](https://huggingface.co/datasets/RogoAI/big-finance-benchmark) · Rogo + OpenAI

928 tareas de research financiero nivel analista con rúbricas de 36,241 puntos que evalúan el proceso completo (selección de fuente, definición contable, cálculo, supuestos), no solo el resultado. El mejor agente frontier: **58.8%**. El benchmark más riguroso disponible para financial AI en 2026.

---

## Patrones emergentes — julio 2026

| Patrón | Descripción |
|--------|-------------|
| **Prompts-as-weights (ATLAS)** | Tratar los prompts de los agentes como parámetros optimizables vía feedback real del mercado |
| **Agent-native exchanges** | Plataformas diseñadas desde cero para que agentes AI sean los participantes principales |
| **MCP composition stack** | 3-4 MCPs especializados por dominio > 1 MCP monolítico |
| **Governance-as-Code** | AIGF + Common Controls como OSS — compliance EU AI Act vía librerías, no consultoría manual |
| **Multi-provider LLM en finance** | Cambiar entre OpenAI/Anthropic/DeepSeek/Qwen según latencia/costo/regulación |
| **Look-ahead hygiene** | Backtests pre-v0.3.1 de TradingAgents son no válidos; point-in-time correctness obligatorio |
| **Agentic payments closed-loop** | Agentes que transaccionan autónomamente (Mastercard AP4M + Alpaca MCP) |
| **Benchmark-first proposals** | FinGAIA + BigFinanceBench para demostrar gap LLM vs humano y justificar fine-tuning |

## ⏰ EU AI Act — Countdown: 19 días (al 14 jul 2026)

**Deadline completo: 2026-08-02**

Sistemas AI de alto riesgo en servicios financieros (Anexo III):
- Scoring crediticio / decisiones de préstamo → **alto riesgo**
- Monitoreo AML / transacciones → **alto riesgo**
- Suscripción de seguros / pricing → **alto riesgo**
- Detección de fraude que restringe acceso a servicios → **alto riesgo**

Obligaciones: gestión de riesgos, supervisión humana, documentación técnica, audit log inmutable, declaración de conformidad.
Sanción: **€35M o 7% del facturado global anual**, el mayor.

**Revenue inmediato para Globant**: firmas financieras en Europa necesitan urgentemente auditoría de sistemas AI, diseño de audit logs y conformidad. FINOS AIGF MCP + FINOS Common Controls son las herramientas OSS disponibles — Globant puede ser el integrador.

---
*Pipeline automático — se actualiza en cada ingest. v6.*
