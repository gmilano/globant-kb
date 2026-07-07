# Mapa de mercado — Financial AI

> Players, oportunidades, posicionamiento. Foco LATAM + global.
> Última actualización: 2026-07-07

## Tamaño de mercado

| Métrica | Valor 2026 | Proyección | CAGR |
|---------|-----------|------------|------|
| AI in Fintech (global) | $20B+ | $97.70B (2034) | 19.90% |
| AI Agents en Financial Services | $2.04B | $6.54B (2035) | 13.84% |
| FinTech market total (global) | $460.76B | — | — |
| RegTech / FCC (global) | $5.5B | $17.4B (2032) | 21.22% |
| Inversión VC en AI fintech (Q1 2026) | $2.1B | — | — |
| Firmas financieras con agentes en producción | 21% | 81% (2030) | — |

---

## Players globales — competidores y ecosystem

### Plataformas AI financieras (comerciales)
| Empresa | Tipo | Fortaleza | Debilidad |
|---------|------|-----------|----------|
| Bloomberg Terminal | Data + analytics | Dataset propietario, estándar bancario | $24k/usuario/año, sin personalización |
| BlackRock Aladdin | Risk management | $21T en activos bajo gestión | Solo para institucionales grandes |
| Palantir Gotham/Foundry | AI analytics | Enterprise adoption, gobierno | Caro, vendor lock-in |
| Moody's AI Studio | Credit + research | 40k empleados, 40h→2min credit memo | Cerrado, solo clientes Moody's |
| ComplyAdvantage | AML/RegTech | Cobertura global, actualizaciones diarias | $$$, no customizable |
| Harvey AI (finanzas) | Legal + M&A due diligence | Adopted by Big 4 | Caro, no open source |
| Kensho (S&P Global) | Quant analytics | NLP sobre market events | Cerrado, propietario |
| Addepar | Wealth management | $6T AUM tracked | Solo para family offices y RIAs |

### Open source / customizable
| Proyecto | Tipo | Adopción | Posicionamiento |
|----------|------|----------|----------------|
| OpenBB | Data platform + MCP | 37k★, creciendo rápido | Bloomberg open source self-hosted |
| TradingAgents | Multi-agent trading firm | 91.6k★, más popular AI finance | El nuevo estándar para AI trading |
| ai-hedge-fund | Hedge fund simulation | 60.9k★, widely forked | Proof-of-concept que se convierte en producción |
| FinRL | RL trading | 15.7k★, academia y producción | Framework DRL de referencia |
| FinGPT | Financial LLM | 20.8k★, HuggingFace modelos | Fine-tuning financiero por $300 |
| LEAN | Algo trading engine | 12k★, 300k usuarios | QuantConnect sin suscripción |
| Marble | AML/fraud | 553★, crecimiento rápido | ComplyAdvantage self-hosted |
| Apache Fineract | Core banking | Producción en 50+ países | Mifos/neobancos base |

---

## Mapa LATAM

### Brasil — mercado dominante

**Contexto:**
- Mercado fintech LATAM más grande (45%+ del total regional)
- PIX: 600M+ transacciones/mes — el sistema de pagos instantáneos más adoptado del mundo
- Open Finance (BCB): mandatado y en producción — APIs abiertas para todos los datos bancarios
- CVM y BCB son reguladores activos con requisitos de IA explicable (Resolução BCB 96/2021)
- 120M+ sin cuenta bancaria → mercado para financial inclusion AI

**Oportunidades:**
- PLD (Prevenção à Lavagem de Dinheiro): Marble/Jube customizados para regulación BACEN
- Credit scoring con dados alternativos para desbancarizados (PIX history, utility bills)
- Open Finance data analytics: agregar y monetizar datos de clientes con IA
- FinGPT fine-tuned en PT-BR para análise de demonstrações financeiras e relatorios CVM

**Stack recomendado:** Apache Fineract + FinGPT PT-BR + Marble + OpenBB MCP

### México — segundo mercado

**Contexto:**
- Nearshoring boom 2023-2026: empresas US con treasuries en MX necesitan FX management
- CNBV activa: Ley Fintech (2018) con API obligatorias Open Banking parcial
- CONDUSEF: regulación de protección al consumidor financiero digitalizado
- Mercado de fondos de inversión (SIEFORES, AFORES) con $300B+ AUM

**Oportunidades:**
- FX y treasury management para empresas nearshore (MXN/USD)
- Algoritmos de inversión AFORE: fondos de pensión con reglas CONSAR
- Crédito PYME con IA: 80% de pymes sin acceso a crédito bancario formal
- Compliance CNBV + CONDUSEF automatizado

**Stack recomendado:** TradingAgents (FX) + FinGPT ES + LEAN (backtest) + Marble (AML)

### Argentina

**Contexto:**
- Inflación y volatilidad: modelos financieros deben actualizar parámetros frecuentemente
- Desdolarización + cepo: estrategias de cobertura complejas necesitan AI
- Ecosistema tech sofisticado: muchos quants disponibles

**Oportunidades:**
- Modelos de cobertura inflacionaria: bonos UVA, CEDEARs, opciones sobre tipo de cambio
- FinRL con datos de BYMA (Bolsas y Mercados Argentinos)
- Credit scoring alternativo con datos de billeteras digitales (Mercado Pago)

### Colombia

**Contexto:**
- Hub regional para financial BPO: credit risk outsourcing
- Sector minería y energía: contratos financieros complejos
- Superfinanciera activa en regulación de IA financiera

**Oportunidades:**
- AI para portfolio management de fondos de pensión (AFP)
- AML para sector extractivo (minerales críticos + export compliance)

---

## 5 Gaps en LATAM — oportunidades para Globant

| # | Gap | Descripción | Tamaño estimado |
|---|-----|-------------|----------------|
| 1 | **Credit scoring para desbancarizados** | 170M+ adultos sin historial crediticio formal en LATAM. FinGPT fine-tuned con datos alternativos (PIX, celular, facturas) | Muy alto |
| 2 | **Open Finance AI analytics** | Open Banking madurando en Brasil, México, Colombia. Falta capa AI para agregar y monetizar datos multi-banco | Alto |
| 3 | **AML/PLD automatizado LATAM** | Marble y Jube no tienen reglas pre-configuradas para BACEN, CNBV, UAF Colombia. Oportunidad de "Marble LATAM" | Alto |
| 4 | **FX Intelligence para nearshore** | Empresas US-MX y US-CO necesitan AI para FX exposure management y cobertura automática | Alto |
| 5 | **AFORE/AFP AI** | Fondos de pensión en MX y Colombia ($300B+ AUM combinado) sin AI en gestión de portfolios | Muy alto |

---

## Posicionamiento Globant

**Propuesta de valor:**
> "Globant AI Studios construye sobre la capa open source de fintech AI (OpenBB, TradingAgents, FinGPT, Fineract, Marble) para crear soluciones verticales financieras customizadas para bancos regionales, neobancos, fondos de inversión y reguladores en LATAM."

**Diferenciadores:**
- Fine-tuning de FinGPT/SaulLM con datos financieros propietarios del cliente (PT-BR, ES-LATAM)
- Integración de MCP servers financieros (sec-edgar-mcp, openbb-mcp) con agentes del cliente
- Expertise en Open Finance API Layer (BCB, CNBV) para agregación de datos
- Human-in-the-loop patterns con LangGraph (requerido por BCBS 239, BCB Res. 96)
- Builds sobre Apache Fineract (Apache-2.0) sin vendor lock-in para core banking

**GTM tabla:**

| Segmento | Pain point | Solución Globant | Deal size |
|----------|-----------|------------------|-----------|
| Banco mediano BR/MX | AML manual, muchos falsos positivos | Marble + LangGraph + fine-tune | $200k-600k |
| Fondo de inversión / AFORE | Portfolio management manual | TradingAgents + FinRL + OpenBB | $300k-1M |
| Neobank LATAM | Credit scoring sin historial | FinGPT fine-tune + datos alternativos | $150k-500k |
| Big 4 compliance | Regulación AI Act + BCB + CNBV | LangGraph + audit trail + human gates | $200k-800k |
