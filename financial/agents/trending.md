# 📈 Agentes trending — Financial Services

> Lo más nuevo y en crecimiento esta semana. Última actualización: 2026-07-13

## Qué está explotando en julio 2026

### FinGAIA: el benchmark que pone en perspectiva dónde fallan los LLMs financieros
[SUFE-AIFLM-Lab/FinGAIA](https://github.com/SUFE-AIFLM-Lab/FinGAIA) publicó en julio 2025 (arXiv:2507.17186)
el benchmark más completo de AI agents en finanzas: **407 tareas en 7 subdominios** (valores, fondos, banca,
seguros, futuros, trusts, gestión de activos). Resultado crítico: el mejor LLM en zero-shot alcanzó **48.9%**
de accuracy, vs >84% de expertos financieros humanos. Cinco patrones de fallo detectados:
- Cross-modal Alignment Deficiency (tablas + texto desconectados)
- Financial Terminological Bias (no entiende jerga subsectorial)
- Operational Process Awareness Barrier (no conoce el flujo real de operaciones)

**Por qué importa**: cuando un banco te pregunte "¿puede el AI reemplazar al analista?", la respuesta
honesta está aquí. Los agentes resuelven bien las capas básicas; en strategic risk management aún hay gap.
Usar FinGAIA como baseline de evaluación en propuestas diferencia a Globant de vendors que overprometen.

### TradingAgents v0.2.4 — multi-provider y checkpoint resume
[TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) lanzó en abril 2026:
- **Structured-output agents**: Research Manager, Trader y Portfolio Manager con salidas tipadas (no parsing de texto libre)
- **LangGraph checkpoint resume**: las sesiones de análisis se pueden pausar y continuar sin perder estado
- **Multi-provider LLM**: DeepSeek, Qwen, GLM, Azure — no solo OpenAI/Anthropic
- **Docker listo** y fix de UTF-8 en Windows para despliegues enterprise

Esto lo hace más robusto para producción: el checkpoint resume es clave para análisis largos (earnings season) y el multi-provider permite usar modelos chinos en clientes que operen en APAC.

### FinRobot Desktop v0.1.0 — app nativa de research financiero
El equipo de AI4Finance Foundation ([AI4Finance-Foundation/FinRobot](https://github.com/AI4Finance-Foundation/FinRobot))
lanzó una aplicación macOS nativa basada en **PydanticAI + FastAPI + React/Tauri**. Permite a analistas
financieros sin código Python acceder a workflows de equity research multi-agente. La arquitectura:
agentes con roles (Fundamental Analyst, Valuation Agent, Risk Screener) + motores determinísticos de
valuación (DCF, comparable analysis) + data providers live + generación de reports al estilo analista.

**Impacto práctico**: los bancos de inversión LATAM donde los analistas usan Excel, no Python, ahora
tienen una puerta de entrada agentica sin fricción técnica.

### Open Finance MCP — datos bancarios de Brasil a Claude en tiempo real
[open-finance-mcp](https://github.com/open-finance-ai) conecta las cuentas bancarias de un usuario a
Claude y ChatGPT a través del Open Finance de Brasil. El usuario vincula su CPF y credenciales bancarias;
el MCP expone extractos, movimientos y balances como contexto al LLM sin transmitir datos sensibles
externamente.

**Relevancia LATAM**: Chile inició implementación obligatoria de Open Finance en **abril 2026**.
México avanza con APIs CNBV. Colombia y Argentina en etapas tempranas. El patrón "Open Finance → MCP → Claude"
es el stack para un asistente financiero personal de próxima generación en la región.

### Vibe-Trading escala a 19.9k★ — "vibe trading" se convierte en término de industria
[HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) subió de 16.9k a 19.9k estrellas en días.
El concepto "vibe trading" (NL → estrategia sin código) está siendo citado en medios financieros como
nuevo paradigma de democratización del análisis cuantitativo. La arquitectura ahora incluye:
- 48 herramientas integradas (market data, screeners, fundamentals)
- 77 finance skills (candlestick analysis, momentum, pairs trading, risk metrics)
- 29 presets de multi-agente (portfolio optimization, sector rotation, factor investing)
- **Audit ledger** y **kill-switch** para deployment en entornos regulados

## Patrones emergentes en julio 2026

| Patrón | Descripción |
|--------|-------------|
| Structured-output trading agents | Agentes que devuelven JSON tipado, no texto libre — auditables y testeables |
| Multi-provider LLM en finance | Capacidad de cambiar entre OpenAI/Anthropic/DeepSeek/Qwen según latencia y costo |
| Benchmark-first proposals | Usar FinGAIA para demostrar el gap LLM vs humano y justificar fine-tuning/agentes |
| Open Finance MCP stack | Banking data → MCP → Claude → personal finance assistant |
| FinRobot Desktop pattern | Agentes financieros en app nativa para analistas sin código (no CLI, no notebook) |
| Checkpoint resume en análisis | LangGraph checkpoints: análisis que sobrevive interrupciones; apto para earnings season |

---
*Pipeline automático — se actualiza en cada ingest.*
