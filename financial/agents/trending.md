# 📈 Agentes trending — Financial Services

> Lo más nuevo y en crecimiento esta semana. Última actualización: 2026-07-14 (v5)
> ⚠️ EU AI Act deadline: **2026-08-02 — 19 días**

## Qué está explotando — semana del 14 jul 2026

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

### 🔥 NUEVO: TradingAgents v0.3.1 (jul 2026) — fix crítico de look-ahead bias
[TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | MIT | 82k+★

**v0.3.1 (jul 2026)** es una release de corrección crítica + extensibilidad:
- **Fix crítico**: Alpha Vantage look-ahead filtering — backtests con v0.2.x usaban datos del futuro, inflando los resultados. Los resultados publicados en papers y repos usando v0.2.x son sospechosos.
- **Claude Sonnet 5 + Fable 5**: soporte nativo con effort control para toda la línea Claude 5
- **Bedrock API-key auth**: clientes enterprise con AWS Bedrock pueden integrar sin cambios de arquitectura
- **graph-router crash-safety**: el orquestador ya no falla silenciosamente en topologías complejas
- **checkpoint resume shape-aware**: reanudación más robusta para análisis multi-hora

**v0.3.0** (jun 2026): registro de providers expandido (NVIDIA, Kimi, Groq, Mistral) + nuevos data vendors (FRED economic data, Polymarket prediction market feeds).

**Impacto del fix de look-ahead**: cambia cómo evaluar repositorios de trading AI — muchos benchmarks publicados previa al fix no son reproducibles con datos point-in-time correctos.

### 🔥 NUEVO: BigFinanceBench (arXiv:2606.03829, jun 2026) — 58.8% gap
[RogoAI/big-finance-benchmark](https://huggingface.co/datasets/RogoAI/big-finance-benchmark) · Rogo + OpenAI

928 tareas financieras de nivel experto con rúbricas de 36,241 puntos que evalúan la **derivación completa** (selección de fuente, definición de período/contabilidad, cálculo, supuestos), no solo el resultado final. Resultado: el mejor agente frontier alcanza **solo 58.8%** — headroom masivo vs analistas humanos.

Diferencia vs FinGAIA (48.9%):
- BigFinanceBench evalúa el proceso, no el resultado
- Viene de Rogo (empresa que sirve a buy-side funds reales — contexto de producción)
- 928 tareas vs 407 (más cobertura)

**Casos de uso para Globant**: (1) eval harness para sistemas de financial AI antes de go-live; (2) argumento de venta más sólido que FinGAIA para buy-side; (3) identificar dónde específicamente fallan los agentes del cliente.

### 🔥 NUEVO: FinSight ACL 2026 — supera a OpenAI Deep Research
[RUC-NLPIR/FinSight](https://github.com/RUC-NLPIR/FinSight) | MIT | ~800★

**Aceptado en ACL 2026 Main** — el venue de NLP más selectivo. Pipeline multi-etapa de investigación financiera profunda:
1. DataCollectionAgent → recopila fundamentals, filings, noticias, macro
2. AnalysisAgent → cálculos financieros, análisis de ratios, comparación de pares
3. VLMChartAgent → genera charts, un VLM los critica iterativamente hasta calidad publicable
4. Chain-of-Analysis → destila insights en segmentos estructurados
5. ReportGenerationAgent → ensambla reporte con charts + citas

Benchmark: **8.09** vs Gemini Deep Research 6.82 vs OpenAI Deep Research 6.11. Un ticker → reporte institucional en ~20 min vs ~8h de analista.

**Para Globant**: el primer agente open source que supera a todas las alternativas comerciales en research financiero. Base para Receta de Research Automation de alto valor (sell-side, IR teams).

### 🔥 NUEVO: Mastercard Agent Pay for Machines (10 jun 2026) — pagos M2M en producción
Mastercard lanzó comercialmente su protocolo de pagos máquina-a-máquina el 10 de junio, con **30+ partners**: Stripe, Adyen, Coinbase, Cloudflare, OKX, Ripple, Polygon, Solana. Soporta micropagos (fracciones de centavo) y liquidación en tarjetas, cuentas bancarias o stablecoins.

El mismo día, Visa anunció integración estratégica con OpenAI; Anthropic también es partner de Visa Intelligent Commerce.

**Por qué es una señal estructural, no solo noticia**: los agentes financieros ya no solo _recomiendan_ — pueden _transaccionar_ de forma autónoma con credenciales tokenizadas vinculadas a agent + merchant + policy. Esto cambia la arquitectura de soluciones:
- Agentes de treasury que ejecutan sweeps automáticos
- Agentes de procurement que compran directamente
- Agentes de arbitraje que liquidan posiciones en stablecoins

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

## Patrones emergentes — semana del 14 jul 2026

| Patrón | Descripción |
|--------|-------------|
| Structured-output trading agents | Agentes que devuelven JSON tipado, no texto libre — auditables y testeables |
| Multi-provider LLM en finance | Capacidad de cambiar entre OpenAI/Anthropic/DeepSeek/Qwen según latencia y costo |
| Benchmark-first proposals | Usar FinGAIA + BigFinanceBench para demostrar el gap LLM vs humano y justificar fine-tuning/agentes |
| Open Finance MCP stack | Banking data → MCP → Claude → personal finance assistant |
| FinRobot Desktop pattern | Agentes financieros en app nativa para analistas sin código (no CLI, no notebook) |
| Checkpoint resume en análisis | LangGraph checkpoints: análisis que sobrevive interrupciones; apto para earnings season |
| **Agentic payments closed-loop** | Agentes que transaccionan (Mastercard Agent Pay / Visa Intelligent Commerce) — no solo recomiendan |
| **Look-ahead hygiene** | Backtests v0.2.x de TradingAgents inflados; v0.3.1 fix requerido para resultados confiables |
| **EU AI Act sprint (19 días)** | Aug 2 deadline: compliance engineering en servicios financieros como revenue stream inmediato |

## ⏰ EU AI Act — Countdown

**Deadline: 2026-08-02 — 19 días**

Sistemas AI de alto riesgo en servicios financieros según Anexo III:
- Scoring crediticio / decisiones de préstamo → **alto riesgo**
- Monitoreo AML / transacciones → **alto riesgo**
- Suscripción de seguros / pricing → **alto riesgo**
- Detección de fraude que restringe acceso a servicios financieros → **alto riesgo** (carve-out estrecho para detección pura)

Obligaciones: sistema de gestión de riesgos, supervisión humana, documentación técnica, log de decisiones inmutable, declaración de conformidad.

Sanción: **€35M o 7% del facturado global anual**, el mayor.

**Revenue inmediato para Globant**: las firmas financieras en Europa necesitan ayuda urgente con auditoría de sistemas AI, diseño de audit logs y preparación de evaluaciones de conformidad. Ver Receta 10 en `compose/patterns.md`.

---
*Pipeline automático — se actualiza en cada ingest.*
