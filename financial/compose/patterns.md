# 🧩 Patrones de composición — Financial Services AI

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-12

## Stack base

```
[Plataforma financiera base (Fineract / OpenBB / ERPNext)]
          ↓
[Capa MCP — datos de mercado, GL, transacciones]
          ↓
[Agentes especializados (TradingAgents / FinRobot / kyc-analyst)]
          ↓
[Orquestador LLM (Claude / GPT-4o / FinGPT fine-tuned)]
          ↓
[UI conversacional / API / Dashboard compliance]
```

---

## Receta 1: AI Research Desk para banco de inversión
**Tiempo estimado**: 3-4 semanas | **Licencias**: Apache-2.0 + AGPLv3 (revisar AGPLv3 con legal)

```
OpenBB v4 (MCP-native) → Alpha Vantage MCP + Quiver Quant MCP
    ↓
TradingAgents framework (TauricResearch/TradingAgents)
    • BullAnalyst — busca catalizadores positivos
    • BearAnalyst — identifica riesgos y tesis bajista
    • FundamentalsAgent — P/E, EV/EBITDA, DCF simplificado
    • SentimentAgent — FinGPT sobre noticias + Twitter/X
    • RiskManager — evalúa VaR y position sizing
    • FundManager — sintetiza y decide
    ↓
Reporte en Markdown con trazabilidad de cada agente
    ↓
Almacenado en base de conocimiento interna (vector DB)
```

**Por qué funciona**: replica el workflow de un comité de inversión. El banco puede mostrar al regulador
qué agente dijo qué y por qué se tomó la decisión. Audit trail nativo.

---

## Receta 2: KYC/AML Pipeline para Fintech LATAM
**Tiempo estimado**: 2-3 semanas | **Licencias**: MIT + AGPL-3.0

```
Apache Fineract (core banking) → webhook en evento "apertura de cuenta"
    ↓
kyc-analyst (vyayasan/kyc-analyst — MIT)
    • Extrae datos del formulario KYC
    • Consulta fuentes públicas: OFAC, listas ONU, PEP databases abiertas
    • Score de riesgo determinístico (0-100)
    • Checkpoint 1: si score > 70 → pausa para revisor humano
    ↓
jube (jube-home/aml-fraud-transaction-monitoring — AGPL-3.0)
    • Monitoreo continuo post-onboarding
    • Detección de patrones AML en tiempo real
    • Velocity checks + sanctions screening
    • Checkpoint 2: alerta a oficial de cumplimiento
    ↓
Dashboard de compliance con audit log inmutable
```

**Costo vs vendor**: kyc-analyst + jube + Claude API ≈ $500-2k/mes vs $30-50k/año de vendor.
Ideal para fintech con volumen moderado (<50k clientes activos).

---

## Receta 3: Portfolio Optimizer para Asset Manager
**Tiempo estimado**: 2-3 semanas | **Licencias**: MIT + BSD-3

```
yfinance / Alpha Vantage MCP → datos históricos multi-asset
    ↓
PyPortfolioOpt (robertmartin8/PyPortfolioOpt — MIT)
    • Mean-Variance con restricciones ESG
    • Black-Litterman con views de analistas
    • Hierarchical Risk Parity para portfolios alternativos
    ↓
Riskfolio-Lib (dcajasn/Riskfolio-Lib — BSD-3)
    • CVaR optimization
    • Stress testing con escenarios históricos (COVID, GFC)
    ↓
Agente conversacional (Claude) que explica la recomendación en lenguaje natural
    ↓
Rebalanceo automático via Alpaca API (si cliente lo autoriza)
```

**Diferenciador LATAM**: incluir bonos soberanos AR/BR/MX, dólar CCL, inflación como inputs del modelo.
PyPortfolioOpt soporta assets con distribuciones no-normales — clave para mercados volátiles.

---

## Receta 4: CFO Assistant para empresa mediana
**Tiempo estimado**: 3-4 semanas | **Licencias**: GPL-3.0 + MIT

```
ERPNext (frappe/erpnext — GPL-3.0) → módulo de cuentas
    ↓
Conector MCP que expone GL, cash flow, AR/AP como contexto
    ↓
FinRobot (AI4Finance-Foundation/FinRobot — MIT)
    • Agente de análisis de estados financieros
    • Comparación con peers de la industria (datos OpenBB)
    • Proyección de flujo de caja a 30/60/90 días
    ↓
Claude como orquestador + generador de reportes narrativos
    ↓
Dashboard CFO: semáforo de liquidez, alertas de deuda, escenarios
```

**Caso de uso concreto**: CFO de empresa argentina con ingresos en pesos y deuda en dólares.
El agente monitorea la brecha cambiaria, alerta cuando la cobertura de deuda cae por debajo de ratio
objetivo, y genera el reporte de directorio automáticamente.

---

## Receta 5: Equity Research Automation (FinGPT + Earnings)
**Tiempo estimado**: 4-5 semanas | **Licencias**: MIT

```
Earnings call transcript → Whisper (speech-to-text, MIT)
    ↓
FinGPT fine-tuned (AI4Finance-Foundation/FinGPT — MIT)
    • Sentiment de la call (positivo/negativo/neutro por segmento)
    • Extracción de guidance: revenue, EBITDA, CapEx
    • Identificación de riesgos mencionados por management
    ↓
FinRL (AI4Finance-Foundation/FinRL — MIT)
    • Actualiza señal de trading con nuevo contexto
    ↓
Reporte de 2 páginas generado con Claude
    • Resumen ejecutivo
    • Cambios vs call anterior
    • Implicaciones para el modelo de valuación
    ↓
Publicado en plataforma interna con vector search para analistas
```

**Escala**: un equipo de 3 analistas con este sistema puede cubrir 50+ empresas en earnings season
vs 15 sin AI.

---

## Receta 6: Core Banking Modernization con AI Layer
**Tiempo estimado**: 6-8 semanas | **Licencias**: Apache-2.0

```
Sistema core legacy (COBOL / AS400 / sistema propietario)
    ↓
Apache Fineract (apache/fineract — Apache-2.0) como middleware moderno
    • Expone APIs REST sobre el core legacy
    • Gestión de productos: préstamos, ahorro, GL
    ↓
Capa de agentes:
    • Agente de onboarding (kyc-analyst + documentos)
    • Agente de cobranza (predicción de default con FinRL patterns)
    • Agente de ventas cruzadas (recomendación de productos)
    ↓
Claude como interfaz conversacional para el cliente final
    ↓
Canal: WhatsApp Business API + web widget
```

**Por qué Fineract**: licencia Apache-2.0, sin royalties, en producción en bancos de 80+ países,
documentación extensa, comunidad ASF activa. El riesgo regulatorio es mínimo vs sistemas propietarios.

---

## Receta 7: Agente de Compliance Tributario (Brasil — Reforma Tributaria)
**Tiempo estimado**: 4-6 semanas | **Licencias**: MIT + GPL

```
ERPNext (contabilidad) → extrae operaciones del período
    ↓
RAG sobre normativas (PDFs de la Receita Federal, Portal Nacional)
    construido con LangChain + ChromaDB (MIT)
    ↓
Agente de clasificación tributaria (CBS/IBS/IS)
    • Identifica la alícuota aplicable por tipo de operación
    • Detecta operaciones en el régimen de transición (2026-2032)
    ↓
Claude genera el borrador de declaración con notas técnicas
    ↓
Revisor humano valida y firma digitalmente (SPED)
```

**Por qué ahora**: la Reforma Tributaria brasileña entra en implementación gradual 2026-2032.
Las empresas con operaciones en Brasil necesitan sistemas que entiendan tanto el régimen viejo (PIS/COFINS)
como el nuevo (CBS/IBS). Este agente puede ser un producto vertical altamente diferenciado.

---

*Ver también: `agents/top.md` para agentes individuales · `verticals/solutions.md` para plataformas base.*
