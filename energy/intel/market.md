# 🗺️ Mapa de mercado — Energy

> Players, oportunidades, posicionamiento. Foco LATAM + global.
> Última actualización: 2026-07-13

## Tamaño de mercado

| Segmento | 2024-2025 | 2030 (est.) | CAGR | Fuente |
|----------|-----------|-------------|------|--------|
| AI en Energía (global) | $22.82B (2025) | $60.6B | 21.4% | GlobeNewswire / GrandView jun 2026 |
| AI en Energía — estimado alternativo | $8.91B (2024) | $58.66B | 36.9% | Research & Markets 2026 |
| AI en Energía — estimado conservador | $5.1B (2025) | $22.2B (2033) | 20.4% | Grand View Research 2026 |
| AI en Energía — estimado máximo | — | $297.36B (2035) | alta | SNS Insider 2026 |
| AI en Energía Renovable | segmento líder, 33% del total | crecimiento acelerado | >20% | InsightAce Analytic 2026 |
| Smart Grid con AI | $35B+ | $80B+ | ~18% | Research & Markets 2026 |
| Agentic AI para Utilities | incipiente | estimado $5B+ | >40% | Xenonstack Analytic 2026 |

> **Nota**: la varianza entre reportes refleja definiciones diferentes de "AI en energía". Usar rango conservador ($22B→$60B, CAGR 21%) en pitches enterprise; mencionar el potencial de $58B+ en contexto de transformación.

## Players globales

| Empresa | Tipo | Fortaleza | Relevancia AI |
|---------|------|-----------|---------------|
| **Schneider Electric** | OEM/Software | One Digital Grid Platform (unificado, AI-enabled) | Alta — propietario |
| **Siemens Energy** | OEM/Software | Grid automation, subestaciones digitales | Alta — propietario |
| **ABB** | OEM/Software | Power products, automation, SCADA | Media — abriendo APIs |
| **GE Vernova** | OEM/Software | Grid solutions, inverters, software SCADA | Alta — inversión en AI |
| **Honeywell** | OEM/Software | Building & industrial automation; Forge platform | Media |
| **EPRI + NVIDIA** | Consorcio | Open Power AI Consortium (OPAI) — open source AI para utilities | Alta — ecosistema abierto |
| **Oracle Utilities** | Software | Billing, CIS, OMS para utilities | Media |
| **Palantir** | Software | Analytics + AI para utilities y O&G | Alta — contratos gov |
| **AutoGrid / Enel X** | SaaS | Demand response, DER optimization | Alta — plataforma SaaS |
| **RatedPower (Enverus)** | SaaS | Diseño y optimización de plantas solar/eólica con AI | Alta |
| **Pionix** | Startup | Comercialización de EVerest para OEMs de EV charging | Media — supply chain |

## Ecosistema LF Energy — Indicadores 2026

- **35+ proyectos hosted** activos en todo el espectro de power systems
- **Power Grid Model**: >10 millones de descargas; en producción en los 3 grandes DSOs holandeses
- **EVerest v2026.02.0**: primera versión LTS; múltiples OEMs (Tritium, Pionix) en producción
- **OperatorFabric 4.12.0** lanzado; **FlexMeasures v0.31** lanzado (jul 2026)
- **PowSyBl Dependencies 2026.0.0**: suite Java para simulación de red; usada por RTE France, Amprion
- **3 nuevos proyectos**: OpenGridFM (foundation models), AINETUS (AI control room), CUPID (DER interop)
- **7° Power Grid Model Meetup**: comunidad LF Energy activa jul 2026

## Consorcio Open Power AI (OPAI) — 2026

Fundado por EPRI + NVIDIA con soporte de Avangrid, Landis+Gyr y otras utilities.
- Desarrolla **modelos AI y GenAI open source** para el sector eléctrico
- Crea **datasets curados** para entrenamiento/benchmarking de modelos energéticos
- Lanza **AI for Power Challenge 2026** con Incubatenergy Labs (IEL)
- Repositorio en: [openpowerai.org](https://openpowerai.org) / EPRI.com
- **Oportunidad directa para Globant**: implementar modelos OPAI en clientes utilities LATAM

## Oportunidades AI en LATAM

| Oportunidad | País/Región | Urgencia | Por qué ahora |
|-------------|-------------|----------|---------------|
| Forecasting solar/eólico para despacho | Brasil, Chile, México, Argentina | Alta | Crecimiento masivo de renovables; inestabilidad de red |
| Demand response inteligente | Brasil (Cemig, Copel), Colombia | Alta | Programas de respuesta a demanda regulados |
| EV charging AI management | Chile, México, Colombia, Brasil | Alta | Adopción EV en aceleración; regulación de carga inteligente |
| Predictive maintenance en subestaciones | LATAM general | Media-Alta | Infraestructura envejecida, costos de mantenimiento altos |
| Digital twins de distribución | México (CFE), Brasil (ENEL/Endesa) | Media | Modernización regulada por ANEEL/CRE |
| Microgrids rurales con IA | Latinoamérica rural | Alta | 30M+ sin acceso confiable; BNDES/BID fondos |
| Flexibilidad BESS para mercado spot | Brasil (CCEE/PLD), Chile (CDEC) | Media-Alta | Precios spot volátiles; BESS en expansión |

## Utilities LATAM (clientes potenciales)

| Empresa | País | Tipo | Tamaño |
|---------|------|------|--------|
| ENEL Brasil / Endesa | Brasil/Chile | Distribución + Generación | >15M clientes |
| Cemig | Brasil | Distribución | ~8M clientes |
| Copel | Brasil | Integrada | ~4.5M clientes |
| CFE | México | Integrada estatal | >44M contratos |
| Engie Brasil | Brasil | Generación renovable | 6+ GW |
| AES Brasil | Brasil | Generación + Distribución | >3M clientes |
| ISA (Colombia/Chile) | Colombia | Transmisión | >38k km líneas |
| Enel Chile | Chile | Distribución | ~2M clientes |
| Eneva | Brasil | Geração termelétrica + gás | ~3.7 GW |

## Posicionamiento Globant

- **Diferenciador**: capacidad de integrar open source (OpenEMS, FlexMeasures, EVerest, Grid2Op) con modelos OPAI y LLMs enterprise
- **Propuesta de valor**: "AI Agents para el Grid" — desde simulación hasta control en tiempo real
- **Entry point**: POCs con utilities LATAM en forecasting y demand response (quick win en 4-8 semanas)
- **EV Charging**: EVerest + OpenEMS + FlexMeasures = stack completo listo para customizar
- **Benchmarking como diferencial**: usar PSAB / EnergyAgentBench para demostrar calidad técnica a utilities
- **Alianza estratégica**: participar en OPAI y LF Energy como partner de implementación
