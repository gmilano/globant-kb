# 📡 Tendencias — Financial Services AI

> Última actualización: 2026-07-14 (v5) | EU AI Act deadline: **2026-08-02 — 19 días**

## Tendencias principales — julio 2026

### T1. Agentic AI es el tema #1 en banca (no es hype — es producción)
70% de las instituciones financieras están desplegando o explorando agentic AI; 14% lo tienen en escala
completa. **44% de los equipos de finanzas ya usan agentic AI** en julio 2026 — un crecimiento de 600%
vs 2025 (Onereach AI). El gap 70-14% es la oportunidad: la mayoría está en PoC. IDC/KPMG reporta
2.3× ROI en 13 meses; top performers alcanzan $8 por cada $1 invertido.

### T2. Arquitectura "debate multi-agente" se convierte en estándar
TradingAgents y ai-hedge-fund convergieron independientemente al mismo diseño:
**bull agent + bear agent + risk manager + fund manager debaten antes de cada decisión**.
Replica comités de inversión reales. Los bancos lo adoptan porque es explicable ante reguladores.
TradingAgents v0.2.4 lo eleva con structured-output agents: los agentes devuelven JSON tipado,
auditables y testeables automáticamente.

### T3. MCP como capa universal de datos financieros
El Model Context Protocol está reemplazando SDKs propietarios de datos. 2026:
- Bloomberg MCP (18 herramientas, requiere Terminal)
- Alpha Vantage MCP (datos institucionales, gratis en tier basic)
- Quiver Quantitative MCP (datos alternativos: Congress trades, insider, reddit)
- Open Finance MCP (Brasil operacional, Chile desde abr 2026)
- OpenBB v4 es MCP-native por defecto
Impacto: un agente puede consumir 5 fuentes de datos distintas sin escribir ningún SDK.

### T4. FinLLMs de producción (no solo investigación)
FinGPT v3 con LoRA fine-tuning sobre news+tweets está en producción en teams de trading de hedge funds.
Costo de fine-tuning: <$300 GPU-hour. Supera a GPT-4 en tareas de sentiment financiero específico.
AI4Finance Foundation publica nuevos modelos en HuggingFace mensualmente.

### T5. Open Finance impulsa nuevos agentes en LATAM
Brasil (Open Finance Phase 4) y Chile (implementación obligatoria desde **abril 2026**) abren datos
que antes eran imposibles de obtener. México avanza con APIs CNBV. El patrón "Open Finance → MCP → Claude"
habilita agentes de comparación de productos financieros, alertas de liquidez y forecasting para PyMEs.
El Open Finance MCP (open-finance-ai) demuestra la integración en minutos.

### T6. KYC/AML automation: de vendor a open source
kyc-analyst (MIT, Claude) demuestra que el stack "LLM + fuentes de datos públicas + checkpoints humanos"
puede cubrir el 80% de los casos de KYC para fintech en LATAM sin pagar $50k/año a vendors.
FINOS (Linux Foundation) patrocina OpenAML para on-chain AML en Web3. Coste estimado: $500-2k/mes
vs $30-50k/año de vendor comparable.

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
análisis cuantitativo. Analistas financieros sin Python pueden generar estrategias en minutos con
48 herramientas integradas y 77 finance skills. Implication para Globant: los clientes que venían
pidiendo "dashboards BI" ahora piden "asistentes conversacionales con datos de mercado".

### T11. Multi-modal finance: earnings calls + PDFs + market data juntos
Nuevos agentes procesan simultáneamente: transcripciones de earnings calls (audio → texto),
estados financieros (PDF → structured data) y market data en tiempo real.
FinRobot v2 soporta este pipeline. Los bancos de inversión lo están adoptando para equity research.

### T12. Crypto/DeFi + AI se fusionan
hummingbot (Apache-2.0, 19k ★) y ccxt (MIT, 43k ★) siguen siendo la base.
Nuevos: agentes de market making adaptativo, detección de MEV, yield optimization en DeFi.
OpenAML (FINOS) aborda compliance AML en transacciones on-chain.

### T13. FinGAIA revela el gap real: LLMs genéricos vs expertos humanos
El benchmark FinGAIA (arXiv:2507.17186, SUFE + Fudan, julio 2025) es el primer estudio riguroso
que mide AI agents en las 7 verticales de finanzas (securities, funds, banking, insurance, futures,
trusts, asset management) con 407 tareas y 3 niveles de dificultad.

**Resultado clave**: el mejor LLM zero-shot (ChatGPT, 48.9%) aún queda **35+ puntos** por debajo de
expertos financieros humanos. Cinco patrones de fallo sistemáticos identificados. Esto tiene dos
implicaciones para Globant:
1. **Argumento de venta**: los LLMs genéricos no son suficientes; se necesita fine-tuning + RAG + human-in-the-loop.
2. **Checklist de entrega**: usar FinGAIA como evaluación pre-go-live del sistema de agentes del cliente.

### T14. Multi-provider LLM: vendor independence como requisito de producción
Los bancos regulados exigen no depender de un solo LLM provider por razones de continuidad operacional
(DORA, Basel Committee guidance). TradingAgents v0.2.4 agrega soporte nativo para DeepSeek, Qwen,
GLM y Azure — además de OpenAI y Anthropic. Vibe-Trading también es multi-model.

Implicación para arquitecturas de solución: usar abstracción multi-provider desde el diseño inicial.
LangGraph o PydanticAI como orquestador + configuración de provider por entorno (dev: local Ollama;
prod: Claude/Azure) se está convirtiendo en el patrón de referencia.

### T15. TradingAgents v0.3.1 — fix de look-ahead bias que invalida resultados anteriores

TradingAgents v0.3.1 (jul 2026) corrigió un filtro de look-ahead en Alpha Vantage que hacía que los backtests tuvieran acceso a datos del futuro. Resultado: **todos los benchmarks y papers publicados usando TradingAgents v0.2.x son sospechosos**. Esto crea dos oportunidades: (1) diferenciar propuestas de Globant mostrando awareness del problema; (2) ofrecer re-evaluación de sistemas de trading existentes con datos point-in-time correctos. El fix también añade Claude Sonnet 5 / Fable 5 support y Bedrock auth.

### T16. BigFinanceBench — benchmark de producción revela el gap real en research financiero

BigFinanceBench (arXiv:2606.03829, jun 2026) es el primer benchmark de research financiero workflow-grounded: 928 tareas de nivel experto, 36,241 puntos de rúbrica que evalúan la derivación completa (no solo el resultado). El mejor agente frontier alcanza **58.8%** — aún debajo de analistas humanos. Diferencia clave vs FinGAIA (48.9%): BigFinanceBench viene de contexto de producción buy-side y evalúa el proceso. Implicación: financial research agents necesitan supervisión humana obligatoria para cumplir con EU AI Act y con estándares fiduciarios.

### T17. Agentic Payments — pagos M2M son infraestructura de producción (desde jun 2026)

Mastercard Agent Pay for Machines se lanzó comercialmente el 10 jun 2026 con 30+ partners (Stripe, Adyen, Coinbase, Cloudflare, OKX, Ripple, Polygon, Solana). Visa Intelligent Commerce integró con OpenAI y Anthropic el mismo día. Los agentes financieros ya no son solo sistemas de recomendación — pueden **transaccionar de forma autónoma** con credenciales tokenizadas vinculadas a (agent, merchant, policy). Esto cambia el diseño de arquitecturas: treasury sweeps automáticos, procurement agentic, arbitraje liquidado en stablecoins.

**Implicación de seguridad**: la autorización de pagos agenticos requiere política de consentimiento explícita, límites por transacción y auditoría inmutable — elementos que Globant puede incorporar por diseño.

---
*Fuentes: Finastra, CIO Dive, The Fintech Times, Neurons Lab, Aspire Systems, Citizens Bank, Lloyds Banking Group, Mordor Intelligence, KPMG, arXiv:2507.17186, arXiv:2606.03829, Mastercard/Visa releases, Gartner — jul 2026.*
