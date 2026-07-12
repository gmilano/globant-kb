# 📡 Tendencias — Financial Services AI

> Última actualización: 2026-07-12

## Tendencias principales — julio 2026

### T1. Agentic AI es el tema #1 en banca (no es hype — es producción)
70% de las instituciones financieras están desplegando o explorando agentic AI; 14% lo tienen en escala
completa. El gap 70-14% es la oportunidad: la mayoría está en PoC. IDC reporta 2.3× ROI en 13 meses.
JPMorgan, Goldman y BlackRock están en producción con agentes autónomos.

### T2. Arquitectura "debate multi-agente" se convierte en estándar
TradingAgents y ai-hedge-fund convergieron independientemente al mismo diseño:
**bull agent + bear agent + risk manager + fund manager debaten antes de cada decisión**.
Replica comités de inversión reales. Los bancos lo adoptan porque es explicable ante reguladores.

### T3. MCP como capa universal de datos financieros
El Model Context Protocol está reemplazando SDKs propietarios de datos. 2026:
- Bloomberg MCP (18 herramientas, requiere Terminal)
- Alpha Vantage MCP (datos institucionales, gratis en tier basic)
- Quiver Quantitative MCP (datos alternativos: Congress trades, insider, reddit)
- OpenBB v4 es MCP-native por defecto
Impacto: un agente puede consumir 5 fuentes de datos distintas sin escribir ningún SDK.

### T4. FinLLMs de producción (no solo investigación)
FinGPT v3 con LoRA fine-tuning sobre news+tweets está en producción en teams de trading de hedge funds.
Costo de fine-tuning: <$300 GPU-hour. Supera a GPT-4 en tareas de sentiment financiero específico.
AI4Finance Foundation publica nuevos modelos en HuggingFace mensualmente.

### T5. Open Finance impulsa nuevos agentes en LATAM
Brasil (Open Finance Phase 4) y México (APIs CNBV) abren datos que antes eran imposibles de obtener.
Esto habilita agentes de comparación de productos financieros, alertas de liquidez y forecasting de FX
para PyMEs — mercado no atendido por la banca tradicional.

### T6. KYC/AML automation: de vendor a open source
kyc-analyst (MIT, Claude) demuestra que el stack "LLM + fuentes de datos públicas + checkpoints humanos"
puede cubrir el 80% de los casos de KYC para fintech en LATAM sin pagar $50k/año a vendors.
FINOS (Linux Foundation) patrocina OpenAML para on-chain AML en Web3.

### T7. Reinforcement Learning vuelve con FinRL
Tras el hype de 2021, RL aplicado a trading regresa con entornos más realistas:
costos de transacción, slippage, market impact modelados correctamente.
FinRL v4 (AI4Finance) soporta portfolios multi-asset y comparación de algoritmos PPO/SAC/TD3 en GPUs.

### T8. Bancos compran startups de AI — ventana para Globant cierra
Microsoft adquirió Fintool (document intelligence financiero) en H1 2026.
La ventana para que bancos LATAM contraten a integradores como Globant (en lugar de comprar startup) se
estrecha. Los próximos 18 meses son críticos para posicionar soluciones.

### T9. Regulación AI en finanzas: DORA (UE) y SEC en EEUU
- EU Digital Operational Resilience Act (DORA): en vigor desde ene 2025; exige trazabilidad de sistemas AI en entidades financieras reguladas en Europa.
- SEC: propuesta de normas sobre uso de AI en recomendaciones de inversión.
- LATAM: CNBV México y CMF Chile publicaron guías de AI en finanzas; BCRA Argentina aún sin marco específico.
- Oportunidad: compliance-by-design con audit trail desde el inicio es diferenciador.

### T10. "Vibe Trading" democratiza el análisis quant
El patrón de Vibe-Trading (NL → backtest → report sin código) está bajando el costo de acceso a
análisis cuantitativo. Analistas financieros sin Python pueden generar estrategias en minutos.
Implication para Globant: los clientes que venían pidiendo "dashboards BI" ahora piden "asistentes
conversacionales con datos de mercado".

### T11. Multi-modal finance: earnings calls + PDFs + market data juntos
Nuevos agentes procesan simultáneamente: transcripciones de earnings calls (audio → texto),
estados financieros (PDF → structured data) y market data en tiempo real.
FinRobot v2 soporta este pipeline. Los bancos de inversión lo están adoptando para equity research.

### T12. Crypto/DeFi + AI se fusionan
hummingbot (Apache-2.0, 19k ★) y ccxt (MIT, 43k ★) siguen siendo la base.
Nuevos: agentes de market making adaptativo, detección de MEV, yield optimization en DeFi.
OpenAML (FINOS) aborda compliance AML en transacciones on-chain.

---
*Fuentes: Finastra, CIO Dive, The Fintech Times, Neurons Lab, Aspire Systems, Citizens Bank — julio 2026.*
