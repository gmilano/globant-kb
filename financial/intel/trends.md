# 📡 Tendencias — Financial Services AI

> Actualización 2026-07-08. Horizon: 12 meses.

---

## Trend 1 — "Agentic Finance" como categoría oficial (🔥 CRÍTICO)

**Señal**: Robinhood CEO declara era de "agentic finance" (Jun-2026). 44% de equipos de finanzas adoptando AI agéntico en 2026 (+600% YoY). 95% de PE firms ya comenzaron implementación.

**¿Qué significa en práctica?**
- Agentes que ejecutan trades, rebalancean portafolios, completan formularios regulatorios **sin intervención humana**
- TradingAgents v0.3.1 (Jul-2026) ya soporta Claude Sonnet 5 / Fable 5 para decisiones de trading
- Los bancos deben implementar Human-in-the-Loop (HITL) mandatory según EU AI Act

**Para Globant**: Primera categoría donde un cliente puede justificar $500k+ en un proyecto de 8 semanas

---

## Trend 2 — EU AI Act Deadline Aug-2, 2026 (⚠️ URGENTE — 25 días)

**Señal**: Aug-2, 2026 es el deadline para que sistemas AI de alto riesgo en el sector financiero cumplan con el EU AI Act. Credit scoring, AML, KYC, seguros — todos calificados como "high risk" bajo Annex III.

**Requisitos obligatorios**:
- Transparencia y explicabilidad (XAI) de decisiones de crédito
- Trazabilidad completa de decisiones agénticas
- Registro y auditoría de todos los modelos
- Human oversight demostrable

**Para Globant**: Clientes europeos (bancos, insurers) necesitan implementación urgente. Patrón P5 (RegTech EU AI Act) es el enganche más rápido. Timeline real: 3-4 semanas para audit + documentación si el sistema ya existe.

---

## Trend 3 — MCP se convierte en protocolo estándar para datos financieros

**Señal**: OpenBB lanzó `openbb_mcp_server` exponiendo 30+ providers de datos financieros (FMP, FRED, Yahoo Finance, Polygon, SEC) como MCP tools. Bloomberg MCP disponible vía `blpapi-mcp`. `financial-datasets/mcp-server` con 680★.

**¿Qué cambia?**
- Los agentes AI pueden ahora consultar datos financieros en tiempo real sin APIs custom
- "Connect once, consume everywhere": un MCP server de OpenBB alimenta Claude Desktop, agentes LangGraph, VS Code, y REST APIs

**Para Globant**: MCP es el integration layer que elimina el 40-60% del tiempo de integración de datos en proyectos finance. Usar como foundation en todos los patrones.

---

## Trend 4 — Open Source "Agentic Finance" alcanza madurez productiva

**Señal**:
- `virattt/ai-hedge-fund`: 60.9k★, React frontend + FastAPI backend — producción lista
- `virattt/dexter`: 24.8k★ con eval suite, self-validation, WhatsApp gateway
- TradingAgents v0.3.1: soporte Claude Sonnet 5 / Fable 5 official

**¿Qué significa?**: Por primera vez, un banco/fintech puede tomar un repo MIT y construir un producto de trading o research en 4-8 semanas sin partir de cero.

**Para Globant**: El moat ya no es "saber hacer un trading agent". Es la integración con los sistemas legados del banco, el cumplimiento regulatorio, y el fine-tuning sobre datos propietarios del cliente.

---

## Trend 5 — Open Finance + Open Banking LATAM — ventana 12-18 meses

**Señal**: Brasil BCB Open Finance con 300+ fintechs reguladas. México CNBV fintech license en expansión. Colombia SFC Open Banking pilot. Chile CMF regulación fintech.

**¿Qué significa?**: Los datos bancarios del consumidor latinoamericano son ahora accesibles via API estandarizadas. Esto es el combustible para agentes de crédito alternativo, asesoría financiera personalizada y comparadores de productos.

**Para Globant**: Proyectos de $100k-$600k donde el diferenciador es entender la regulación local + construir el agente encima. Brasil y Colombia son los mercados más maduros para empezar.

---

## Trend 6 — RegTech agéntico: de herramientas reactivas a sistemas proactivos

**Señal**: "Always-on compliance" con agentic AI logra 89% de detección pre-deployment vs 43% convencional (Neurons-Lab 2026). FINOS lanza AI Fund + OSERA con los mayores bancos del mundo.

**¿Qué cambia?**
- AML/KYC ya no es batch semanal — es monitoreo continuo agéntico
- SAR (Suspicious Activity Reports) ahora generados automáticamente por agentes
- Gobernanza de modelos AI mandatoria: EU AI Act + SR 11-7 (Fed) + DORA (EU) + LGPD (Brasil)

**Para Globant**: RegTech agéntico es la vertical más defensible — alta barrera de entrada, clientes con budget elevado ($300k-$1.2M), recurrente (compliance no es proyecto puntual).

---

## Trend 7 — LLM Reasoning para análisis financiero supera analistas humanos en benchmarks

**Señal**: FinSight (ACL 2026) genera reportes financieros publication-ready. Claude Opus 4.8 gana HAQQ-LAB (hallucination rate 24% promedio — incluso frontier models). TradingAgents arxiv:2412.20138 muestra que multi-agent debate mejora señales de trading.

**Advertencia crítica**: 24% hallucination rate en razonamiento financiero → mandatory human review para decisiones reguladas. Usar LLMs como "research assistant" no como "decision maker" en crédito/AML.

---

## Trend 8 — Prediction Markets como nueva clase de activo para AI

**Señal**: `jon-becker/prediction-market-analysis` — 36GB de datos Polymarket + Kalshi. Polymarket adquirió Dome (YC-backed cross-platform API). Opinion alcanzó 31% del volumen global ($8B+/mes).

**Para Globant**: Hedge funds alternativos + fintech de datos buscan products que agreguen prediction markets + mercados tradicionales. Nicho emergente con alto margen.

---

## Trend 9 — SLMs para finanzas on-premise (privacidad de datos)

**Señal**: 70%+ de banking firms usan AI agéntico pero con datos propietarios que no pueden salir a la nube. Phi-4, Mistral 7B, Llama 3.1 ofrecen capacidad de análisis financiero básico on-premise.

**Para Globant**: Patrón "Ollama + Qdrant + LangGraph + Fineract on-premise" para bancos LATAM con restricciones LGPD/datos soberanos. Deal size $200k-800k por el componente de compliance.

---

## Trend 10 — FinMTM: La era de los benchmarks especializados en finanzas

**Señal**: FinMTM (ACL 2026) — primer benchmark multi-turn multimodal para agentes financieros. CLEF-2026 FinMMEval — multilingual + multimodal evaluation. El campo está madurando con estándares de evaluación.

**Para Globant**: Incluir benchmarking en todos los deliverables de finance AI. Clientes quieren saber si su agente es mejor o peor que el promedio del mercado. FinMTM + FinSight evaluation suite como herramientas de validación.

---

## Tabla de monitoreo — señales clave

| Señal | Fuente | Frecuencia monitoreo |
|-------|--------|---------------------|
| EU AI Act enforcement actions | EUR-Lex, EBA | Semanal hasta ago-2026 |
| FINOS AI Fund releases | github.com/finos | Quincenal |
| TradingAgents releases | github.com/TauricResearch | Semanal |
| OpenBB MCP server updates | github.com/OpenBB-finance | Quincenal |
| Brasil Open Finance nuevas fintechs | BCB.gov.br | Mensual |
| LLM reasoning en finance papers | arxiv cs.AI + q-fin | Semanal |
| virattt repos (ai-hedge-fund, dexter) | github.com/virattt | Semanal |
