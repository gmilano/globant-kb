# Agentes en tendencia — Financial AI

> Señales calientes esta semana. Foco en momentum y velocidad de adopción.
> Última actualización: 2026-07-07

## 6 señales más calientes

### 🔥 1. TradingAgents — el repo más starred de AI financiero en GitHub

[TradingAgents](https://github.com/TauricResearch/TradingAgents) alcanzó **91.6k estrellas** en GitHub, convirtiéndose en el repo de AI trading más popular del ecosistema. Simula una firma de trading real con LangGraph: analistas (fundamentals/sentiment/news/técnicos), researchers bullish/bearish en debate, trader agent, risk manager y portfolio manager. Soporta 10+ LLM providers (Anthropic, OpenAI, Gemini, DeepSeek, Qwen, Ollama).

**Implicación:** Es el nuevo estándar de referencia que todo cliente de finanzas conoce. Construir sobre este patrón acelera time-to-market.

---

### 🔥 2. ai-hedge-fund cruzando 60k★ — patrón de 19 agentes validado

[ai-hedge-fund](https://github.com/virattt/ai-hedge-fund) (MIT) cruzó 60.9k estrellas con release activa (v2026.7.3). Los 13 "legendary investor agents" (Buffett, Munger, Burry, Ackman, Taleb, Lynch...) más 6 agentes analíticos son ahora el template más clonado para portfolios multi-perspectiva.

**Implicación:** El patrón bull/bear/judge + investor-personas es el diseño dominante. Clientes en wealth management y hedge funds lo piden explícitamente.

---

### 🔥 3. Agentic AI en producción en servicios financieros

Cambridge CCAF 2026 Survey: **21% de firmas financieras ya tienen agentes en producción**, 52% en piloto o fases avanzadas. $2.1B en VC fluyó a fintech AI solo en Q1 2026.

**Evidencia:**
- Moody's AI Studio: 40,000 empleados; crédito de 40h → 2-3 minutos
- IG Group + Anthropic: 70+ horas semanales ahorradas; ROI en 3 meses
- 21% de firmas con AI agents producción (vs 4% en 2024)

**Implicación:** El shift es de piloto a ROI medible. Propuestas deben incluir casos de ROI cuantificados.

---

### 🔥 4. OpenBB MCP — capa de datos financieros nativa para agentes

OpenBB lanzó [Workspace MCP](https://github.com/OpenBB-finance/workspace-mcp) (open source), convirtiendo su plataforma en una "financial data API para AI agents". Discovery dinámica de herramientas evita token bloat. Skill guides incluidos (cómo hacer DCF, análisis de earning, etc).

**Delta:** openbb-mcp-server +3 releases en junio 2026. Momentum acelerando.

**Implicación:** Cualquier agente financiero que use OpenBB MCP tiene acceso a datos de equities, crypto, macro, opciones — sin custom scrapers.

---

### 🔥 5. Ecosistema SEC EDGAR MCP explotando

Tres repos de MCP server para SEC EDGAR aparecieron en H1 2026:
- [sec-edgar-mcp](https://github.com/stefanoamorelli/sec-edgar-mcp) — filings exactos con XBRL
- [LuisRincon23/SEC-MCP](https://github.com/luisrincon23/sec-mcp) — SSE streaming para real-time
- [isofinancial-mcp](https://github.com/Niels-8/isofinancial-mcp) — EDGAR + FINRA + institutional holdings

**Patrón:** Cualquier fuente de datos regulatorios con API pública tiene o tendrá un MCP server en semanas. El mismo patrón que el ecosistema legal MCP jurisdiccional.

---

### 🔥 6. FinWorld (NTU) — framework unificado de investigación AI financiero

[FinWorld](https://github.com/TradeMaster-NTU/FinWorld) de NTU unifica por primera vez ML, DL, RL, LLMs y LLM agents bajo un solo framework para las 4 tareas críticas: forecasting de series temporales, trading algorítmico, gestión de portfolios, y aplicaciones LLM. Preprint en arXiv junio 2026.

**Implicación:** Referencia académica que clientes de banca con equipos quant usarán como benchmark.

---

## Tabla delta de momentum

| Repo | Stars semana pasada | Stars hoy | Delta | Señal |
|------|---------------------|-----------|-------|-------|
| TradingAgents | ~85k | ~91.6k | +8% | 🔥🔥 explosivo |
| ai-hedge-fund | ~58k | ~60.9k | +5% | 🔥 fuerte |
| FinGPT | ~20k | ~20.8k | +4% | 📈 estable alto |
| OpenBB | ~36k | ~37k | +3% | 📈 estable |
| FinRL | ~15k | ~15.7k | +5% | 📈 sólido |
| Marble AML | ~480 | ~553 | +15% | 🔥 emergente |
