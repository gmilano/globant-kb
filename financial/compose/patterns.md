# 🧩 Patrones de composición — Financial Services

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-12 (v10)

## Arquitectura base

```
[Plataforma vertical base (Apache Fineract / OpenBB / ERPNext)]
          ↓
[Data layer: OpenBB + yfinance + pgvector embeddings]
          ↓
[Orquestador multi-agente: LangGraph / TradingAgents]
          ↓
[Agentes especializados: análisis, riesgo, compliance, ejecución]
          ↓
[Governance layer: audit log + human-in-the-loop + EU AI Act]
          ↓
[UI: chat conversacional / API REST / dashboard]
```

---

## Patrón P1: Multi-Agent Trading Firm (TradingAgents clone)

**Caso de uso**: Broker o family office que quiere inteligencia de inversión automatizada sin equipo quant completo.

**Stack**:
- `TauricResearch/TradingAgents` — framework base con agentes especializados
- `OpenBB-finance/OpenBB` con MCP server — datos de mercado en tiempo real
- `AI4Finance-Foundation/FinGPT` — análisis de sentimiento en tiempo real (noticias, SEC)
- `robertmartin8/PyPortfolioOpt` — optimización de portafolio con output del PM agent
- Claude claude-sonnet-5 — síntesis, razonamiento y generación de reportes

**Flujo**:
```
1. Agente Analista Técnico: OpenBB → indicadores técnicos → señal
2. Agente Analista Fundamental: FinGPT → SEC filings → valoración
3. Agente Sentimiento: FinGPT → noticias + redes → score
4. Agente Risk Manager: evaluación de señales contradictorias → límites de riesgo
5. Portfolio Manager Agent: debate estructurado → decisión → PyPortfolioOpt
6. Claude: genera reporte de inversión explicable para el cliente
```

**Tiempo de implementación**: 6-8 semanas para MVP funcional en backtesting; +4 semanas para live trading con broker real.

---

## Patrón P2: KYC/AML Agent para Banco o Fintech

**Caso de uso**: Banco regional LATAM que necesita automatizar onboarding y detección de lavado de dinero sin multiplicar headcount de compliance.

**Stack**:
- `apache/fineract` — core banking con datos transaccionales del cliente
- LangGraph — orquestador de workflow con audit log inmutable
- Claude claude-sonnet-5 con Vision — lectura y análisis de documentos de identidad
- pgvector + embeddings — base de datos de patrones de transacciones sospechosas
- APIs externas: Comply Advantage / WorldCheck (sanctions), Open Corporates (ownership)

**Flujo**:
```
1. Cliente sube documentos → Claude Vision extrae entidades (nombre, doc, fecha, dirección)
2. Agent KYC: valida contra sanctions lists + PEP databases → risk score
3. Agent Transaccional: analiza patrones en Fineract → anomaly score con pgvector
4. Agent AML: combina señales → genera narrative de riesgo para investigador
5. Human-in-the-loop: casos de alto riesgo → investigador humano revisa narrative
6. Audit log inmutable: toda decisión trazable para regulador (EU AI Act compliance)
```

**Reducción esperada**: 60% menos falsos positivos, 70% del onboarding sin intervención humana.

**Tiempo**: 10-14 semanas para piloto en banco con 5k onboardings/mes.

---

## Patrón P3: AI CFO Assistant para PYME (LATAM)

**Caso de uso**: PYME latinoamericana que quiere acceso a inteligencia financiera de nivel enterprise sin CFO dedicado.

**Stack**:
- `frappe/erpnext` — ERP con contabilidad, cuentas por cobrar/pagar, nómina
- `frappe/crm` — pipeline de ventas integrado
- LangGraph + Claude claude-sonnet-5 — agente conversacional sobre datos ERPNext
- `AI4Finance-Foundation/FinRL` — forecasting de flujo de caja con RL
- WhatsApp API (LATAM: 90%+ penetración) — interfaz conversacional

**Flujo**:
```
ERPNext API → agente Claude: "¿Cuál es mi runway si no cobro las facturas pendientes?"
→ LangGraph query sobre datos de cuentas por cobrar
→ FinRL model: proyección de flujo de caja 90 días
→ Claude genera respuesta en español con recomendaciones
→ WhatsApp / chat web
```

**Tiempo**: 4-6 semanas para MVP sobre ERPNext existente. Deploy en Frappe Cloud o self-hosted.

---

## Patrón P4: Fraud Detection en Pagos Digitales (PIX / SPEI)

**Caso de uso**: Procesador de pagos o banco digital con alto volumen de transacciones (PIX Brasil: 1B+ txns/día).

**Stack**:
- `hummingbot/hummingbot` — ingestión de stream de transacciones en tiempo real
- LangGraph con graph-based memory — construcción de grafo de entidades (cuentas, dispositivos, IPs)
- `AI4Finance-Foundation/FinGPT` fine-tuned en patrones de fraude — clasificador semántico
- pgvector — embeddings de patrones históricos de fraude para similarity search
- Claude claude-sonnet-5 — generación de narrative de caso para investigadores

**Flujo**:
```
Stream transaccional → Hummingbot → LangGraph pipeline
→ Grafo de entidades: ¿esta cuenta tiene vínculos con cuentas suspendidas?
→ Similarity search pgvector: ¿pattern similar a fraudes conocidos?
→ FinGPT classifier: risk score semántico
→ Si score > umbral: Claude genera narrative de caso → investigador
→ Feedback loop: decisión investigador → retraining FinGPT
```

**Métrica objetivo**: Reducción 60% falsos positivos vs reglas estáticas. <200ms latencia por transacción.

---

## Patrón P5: Investment Research Automatizado (Equity Research)

**Caso de uso**: Asset manager o banco de inversión que produce research de equities — automatizar el 70% del proceso analítico repetitivo.

**Stack**:
- `AI4Finance-Foundation/FinRobot` — plataforma multi-agente para research
- `OpenBB-finance/OpenBB` MCP server — datos fundamentales, precios, SEC filings
- `AI4Finance-Foundation/FinGPT` — análisis de earnings calls, noticias, sentiment
- `robertmartin8/PyPortfolioOpt` — generación de targets de precio con optimización
- Claude claude-sonnet-5 — autor del report final en estilo institucional

**Flujo**:
```
FinRobot Lead Agent: recibe ticker + horizonte de inversión
→ Research Agent 1: OpenBB fundamentales → ratios P/E, EV/EBITDA, DCF
→ Research Agent 2: FinGPT → análisis earnings call últimos 8 trimestres
→ Research Agent 3: OpenBB → análisis técnico + posicionamiento institucional
→ Risk Agent: compara vs sector + macro → ajuste de valuación
→ Claude: genera reporte de 5 páginas con: thesis, risks, target price, recommendation
```

**Output**: Reporte equivalente a 3-5 días de analista en <15 minutos.

---

## Patrón P6: Scoring Crediticio Alternativo (No-bancarizados LATAM)

**Caso de uso**: Fintech de microcrédito o banco digital que quiere llegar a los 160M no-bancarizados de LATAM usando datos alternativos.

**Stack**:
- `AI4Finance-Foundation/FinRL` — modelo RL de scoring entrenado en datos alternativos
- `apache/fineract` — plataforma de gestión de préstamos
- Datos alternativos (con consentimiento): historial de pagos telco/utilities, patrones de uso móvil
- Claude claude-sonnet-5 — explicación de decisión de crédito (requerido por AI Act / regulación LATAM)
- LangGraph — workflow de aprobación con human-in-the-loop para préstamos > umbral

**Consideraciones regulatorias**:
- LGPD (Brasil) / Ley 25.326 (Argentina): consentimiento explícito para datos alternativos
- Explicabilidad de scoring: el cliente puede solicitar explicación de por qué fue rechazado
- Bias monitoring: auditoría mensual de distribución de scores por género, región, etnia
- Human override: aprobador humano para casos límite (score 40-60 percentile)

**Tiempo**: 16-20 semanas para piloto completo regulatoriamente compliant.

---

## Patrón P7: Portfolio RL + Optimización (Family Office / Fondo Mediano)

**Caso de uso**: Family office o fondo mediano (~$100M AUM) que quiere estrategias cuantitativas adaptativas sin pagar equipo quant completo.

**Stack**:
- `AI4Finance-Foundation/FinRL` — agente RL que aprende estrategias adaptativas de portfolio
- `dcajasn/Riskfolio-Lib` — optimización con métricas de riesgo avanzadas (CVaR, HRP)
- `OpenBB-finance/OpenBB` — datos de mercado multi-asset (acciones, ETFs, cripto, forex)
- `ccxt` — ejecución en exchanges (simulación primero, live después)
- Claude claude-sonnet-5 — reporte mensual de performance con análisis de atribución

**Arquitectura RL**:
```
Ambiente: FinRL multi-asset environment (datos OpenBB)
Agente: PPO (Proximal Policy Optimization) con Stable Baselines3
Observaciones: precios, indicadores técnicos, fundamentales, macro
Acciones: pesos de portafolio por activo (continuo)
Reward: Sharpe ratio - drawdown penalty
Rebalanceo: semanal con Riskfolio-Lib constraint
```

---

## Patrón P8: EU AI Act Compliance Agent para Bancos

**Caso de uso**: Banco europeo (o global con operaciones EU) que necesita cumplir con EU AI Act (en vigor agosto 2, 2026) para sus sistemas AI de riesgo alto.

**Stack**:
- LangGraph — audit log inmutable de todas las decisiones AI
- Claude claude-sonnet-5 — análisis de documentación de sistemas AI existentes
- pgvector — base de conocimiento de requisitos EU AI Act por categoría de riesgo
- Apache Fineract — registros de decisiones crediticias para trazabilidad
- Dashboard React — vista de compliance para CAIO (Chief AI & Innovation Officer)

**Entregables del agente**:
1. Inventario de sistemas AI del banco clasificados por nivel de riesgo
2. Gap analysis contra requisitos EU AI Act por sistema
3. Roadmap de remediación priorizado
4. Plantillas de documentación técnica (Technical Documentation Art. 11)
5. Monitoreo continuo: alertas cuando un sistema AI drift fuera de parámetros aprobados
