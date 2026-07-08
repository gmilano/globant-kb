# Agentes en tendencia — Financial AI

> Señales calientes esta semana. Foco en momentum y velocidad de adopción.
> Última actualización: 2026-07-08 (v2)

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

### 🔥 7. TradingAgents v0.3.1 — release jul-2026 con Claude Sonnet 5 + Fable 5

[TradingAgents v0.3.1](https://github.com/TauricResearch/TradingAgents) publicó release en jul-2026 con soporte nativo de **Claude Sonnet 5 y Fable 5**. Fixes clave: corrección de look-ahead bias en backtesting (bug crítico que inflaba resultados), mejoras de crash-safety en ejecución multi-agente, y mejor logging de debates bull/bear.

**Implicación:** La migración a Sonnet 5 / Fable 5 como LLMs de producción es ya el default recomendado para TradingAgents. Los clientes en pilotos anteriores con Sonnet 4 deben actualizar.

---

### 🔥 8. Dexter (deep financial research) — 13k+ stars, explosión desde mayo 2026

[Dexter](https://github.com/virattt/dexter) (MIT) de virattt alcanzó 13k+ estrellas con crecimiento explosivo desde mayo 2026. Propuesta única: agente autónomo de investigación financiera con **trail de tool usage auditabe en JSON**. Cada respuesta incluye exactamente qué fuentes consultó, qué herramientas ejecutó, y en qué orden.

**Por qué importa:** El patrón de "respuestas auditables" de Dexter es el que los reguladores financieros (BCB Res. 96, EU AI Act) exigen para decisiones crediticias y de inversión. Adoptar este patrón desde el diseño evita deuda técnica regulatoria.

---

### 🔥 9. FinSight — ACL 2026 Main: "One ticker, one click, one publication-ready report"

[FinSight](https://github.com/ai4finance-foundation/FinSight) (MIT) de AI4Finance Foundation apareció en ACL 2026 Main. Propuesta: un agente que genera un **reporte financiero listo para publicación** a partir de un ticker. Lee 10-K/10-Q de SEC EDGAR, calcula ratios, compara contra peers, detecta deterioro de métricas (EBITDA margin, FCF, working capital) y genera PDF con fuentes citadas.

**Oportunidad Globant:** Template para CFO co-pilot en empresas LATAM medianas que no pueden pagar análisis de Bloomberg. Stack: FinSight + datos locales (CVM Brasil, BMV México) + Claude Haiku para generación en ES/PT.

---

### 🔥 10. Alpaca MCP Server — "killer app" de MCP en finanzas

[alpaca-mcp-server](https://github.com/alpacahq/alpaca-mcp-server) (Apache-2.0) es el MCP server de Alpaca Markets — **trading real de acciones, ETFs, crypto y opciones vía lenguaje natural**. Un LLM puede ahora ejecutar "compra 100 acciones de AAPL con un stop-loss en $180" sin una línea de código de integración.

**Delta:** Primer MCP server que cierra el loop completo: research → análisis → **ejecución real** en un solo flujo conversacional. Vibe-Trading y AI-Trader del equipo HKUDS ya lo integran.

**Señal regulatoria:** SEC ya observa los "agentic finance" execution loops. Cualquier implementación necesita human-in-the-loop obligatorio antes de ejecución.

---

## Tabla delta de momentum

| Repo | Stars jul-07 | Stars jul-08 | Delta 7d | Señal |
|------|-------------|--------------|----------|-------|
| TradingAgents | ~91.6k | ~91.6k+ | estable alto | 🔥🔥 referencia |
| ai-hedge-fund | ~60.9k | ~60.9k+ | +5% sem | 🔥 fuerte |
| Dexter | ~12k | ~13k+ | +8% sem | 🔥🔥 explosivo |
| FinGPT | ~20.8k | ~20.8k | +4% sem | 📈 estable alto |
| OpenBB | ~37k | ~40k+ | +8% sem | 🔥 acelerando |
| FinRL | ~15.7k | ~15.7k | +5% sem | 📈 sólido |
| Marble AML | ~553 | ~600+ | +10% sem | 🔥 emergente |
| Vibe-Trading | nuevo | ~16.9k | entrada fuerte | 🔥 nuevo |
