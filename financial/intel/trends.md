# 📡 Tendencias — Financial Services AI

> Señales del mercado, papers recientes, movimientos de ecosistema.
> Última actualización: 2026-07-14 (v6)

## T1 — Agentic AI pasa de piloto a producción en bancos (2026)

82% de medianas empresas y 95% de firmas de PE han iniciado o planean adoptar agentic AI en 2026. De los que ya adoptaron, 99% reportan mejora en eficiencia operativa. Los bancos tier-1 ya no están en piloto: JPMorgan ($2B/año), Goldman (46k empleados con GenAI), BlackRock ($25T AUM bajo Aladdin AI). El 2026 es el año de deployment a escala, no de evaluación.

**Impacto para Globant**: los clientes financieros que lleguen sin agentes deployados ya son la excepción. El pitch ya no es "¿por qué AI?" sino "¿qué siguiente capa agentica agrega el mayor ROI?"

---

## T2 — Prompts-as-weights: el siguiente salto en trading agents (ATLAS, mar 2026)

ATLAS (github.com/chrisworsey55/atlas-gic, MIT) demostró en producción real (173 días, capital real) que los prompts de los agentes pueden tratarse como parámetros del modelo, optimizados vía feedback de mercado (Sharpe ratio como loss function). 9 agentes generados autónomamente; 3 eliminados por selección darwiniana.

**Por qué es una señal estructural**: el prompt engineering manual se convierte en cuello de botella. Los sistemas financieros del futuro auto-optimizarán sus instrucciones vía mercado. El patrón es generalizable (crédito, seguros, compliance).

---

## T3 — MCP se convierte en el tejido conector del ecosistema financiero

Más de 12 MCP servers financieros disponibles en julio 2026: datos (financial-datasets-mcp), simulación (open-paper-trading-mcp), ejecución (Alpaca MCP), análisis técnico (tradingview-mcp), core banking (FinAegis MCP), compliance (FINOS AIGF MCP). La arquitectura está convergiendo: LLM + 3-4 MCPs especializados > solución monolítica.

**Impacto**: los proyectos de AI financiera ya no se construyen from scratch. Se componen MCPs existentes + LLM orchestrator. Tiempo de PoC baja de meses a semanas.

---

## T4 — EU AI Act completo el 2 de agosto 2026 (19 días al 14 jul)

El 2 de agosto de 2026, el EU AI Act se aplica completamente. Sistemas de alto riesgo en finanzas (Anexo III): scoring crediticio, AML monitoring, suscripción seguros, fraud detection que restringe servicios. Obligaciones: gestión de riesgos, supervisión humana, audit log inmutable, documentación técnica, declaración de conformidad. Sanción: €35M o 7% del facturado global.

**Impacto inmediato para Globant**: las firmas financieras en Europa necesitan urgentemente (a) auditoría de sistemas AI existentes, (b) diseño de audit logs, (c) evaluaciones de conformidad. FINOS AIGF + Common Controls son las herramientas OSS disponibles. Revenue disponible hoy.

---

## T5 — Brasil: Open Finance con 42M consents y Pix en 54.7% de transacciones

Brasil tiene el ecosistema Open Finance más activo del mundo: 42 millones de consents activos, 1.5 mil millones de llamadas API por semana. Pix representa el 54.7% de TODAS las transacciones del país (42.9B operaciones H2 2025). **Pix Automático** (pagos recurrentes automáticos) llega en H2 2026. Chile activó Open Finance obligatorio en abril 2026.

**Señal para Globant**: el stack "Open Finance → MCP → Claude" tiene product-market fit en Brasil. Replicable en Chile, Colombia, México con adaptaciones regulatorias. Personal finance agents y CFO assistants para PyMEs son el caso de uso más inmediato.

---

## T6 — FINOS AI Fund: bancos tier-1 commoditizan la capa de governance AI (jul 2026)

El 1 de julio de 2026, FINOS lanzó el AI Fund con DTCC, Morgan Stanley, RBC y NatWest como fundadores. Proyectos activos: AIGF (AI Governance Framework), Common Controls for AI Services (BMO, Citi, BofA, Microsoft, Google Cloud, AWS), Open Resource Broker (ORB) con MCP server. La capa de compliance AI se está abriendo como OSS — los bancos contribuyen su IP de governance porque quieren un estándar compartido.

**Señal estratégica**: las firmas que implementen AIGF + Common Controls antes del 2 ago 2026 poseen el expertise de EU AI Act compliance. Ventana de 6-12 meses antes de que sea commodity.

---

## T7 — Mastercard Agent Pay for Machines: pagos M2M en producción

El 10 de junio de 2026, Mastercard lanzó comercialmente AP4M con 30+ partners (Stripe, Adyen, Coinbase, Cloudflare, OKX, Ripple). Agentic Tokens vinculan credencial + agente + merchant + política de consent en blockchain (Polygon, Solana, Base). Visa Intelligent Commerce anunció el mismo día con OpenAI y Anthropic como partners estratégicos.

**Impacto arquitectónico**: los agentes financieros ya no solo recomiendan — pueden transaccionar de forma autónoma con límites y auditoría. Esto cambia el diseño de soluciones: agentes de treasury, procurement, arbitraje que ejecutan sin fricción humana.

---

## T8 — BigFinanceBench: el headroom de los agentes en research financiero es masivo

BigFinanceBench (arXiv:2606.03829, jun 2026, Rogo + OpenAI) evaluó 10 agentes frontier en 928 tareas de research financiero nivel analista. El mejor agente alcanzó solo 58.8% del rubric score. FinGAIA (arXiv:2507.17186) encontró 48.9% en 7 subdominios. Los LLMs aún están a 30-40 puntos de los expertos humanos en finanzas.

**Por qué importa**: el headroom justifica fine-tuning sectorial, RAG especializado y human-in-the-loop en workflows de research. Use estos benchmarks para calibrar expectativas con clientes y identificar dónde el agente agrega valor vs dónde el humano es imprescindible.

---

## T9 — HKUDS construye el ecosistema de trading agent más coherente (2026)

El grupo HKUDS (Hong Kong University Data Science) lanzó en 2026 dos productos complementarios: Vibe-Trading (research workspace: NL → análisis → backtest) y AI-Trader (exchange nativo para agentes: análisis → ejecución colectiva). Junto con FinSight (ACL 2026, que superó a OpenAI Deep Research), HKUDS es el grupo académico más productivo en AI financiero de 2026.

---

## T10 — FinRobot Desktop: fin de la barrera de código en research AI para finanzas

FinRobot Desktop v0.1.0 (jul 2026, AI4Finance Foundation) lanza una app macOS nativa con PydanticAI + FastAPI + React/Tauri que lleva workflows de equity research multi-agente a analistas que solo usan Excel. La separación determinístico/LLM (DCF, DDM, LBO, Monte Carlo en Python puro; LLMs solo para síntesis) es el patrón de arquitectura más maduro para evitar alucinaciones en finanzas.

---

## T11 — Look-ahead bias en backtests: deuda técnica crítica

TradingAgents v0.3.1 (jul 2026) reveló que v0.2.x usaba datos del futuro en backtests via Alpha Vantage, inflando artificialmente los resultados. Cualquier paper o repositorio que cite TradingAgents con v0.2.x tiene resultados no reproducibles. La community ha establecido "point-in-time correctness" como requisito mínimo en backtests 2026+.

**Para Globant**: exigir evidencia de look-ahead hygiene en cualquier solución de trading AI de clientes antes de aceptarla como baseline. Los backtests inflados son pasivo legal y reputacional.

---

## T12 — AI fraud detection: deepfakes y evasión generativa vs sistemas heredados

Los sistemas AML y fraud detection tradicionales (reglas estáticas, revisión manual, alertas retrasadas) son inadecuados contra fraud generativo de 2026: deepfake identity verification, phishing AI-generado, técnicas de evasión entrenadas contra los detectores. La respuesta agentica: behavioral biometrics continuo (keystroke, mouse, voz), análisis de redes para patrones relacionales, detección en tiempo real.

**Señal regulatoria**: EU AI Act clasifica fraud detection como high-risk AI (Anexo III) → explicabilidad obligatoria. Los sistemas de caja negra ya no son legales en Europa para este caso de uso.

---

## T13 — Credit underwriting para underbanked en LATAM: IA con datos alternativos

En México, Colombia, Argentina y Brasil existe una población masiva underbanked con bajo o nulo historial crediticio formal. Los agentes AI que combinan datos alternativos (Pix transactions, Open Finance, telco data, e-commerce behavior) con scoring ML han demostrado tasas de aprobación 3-5× mayores que el scoring FICO tradicional. Nubank, Kueski, Konfio y otros FinTechs LATAM son los casos de referencia.

---

## T14 — Separación determinístico/LLM como patrón de arquitectura maduro

FinRobot (Jul 2026) y ATLAS codifican explícitamente que los LLMs no hacen aritmética financiera: el cómputo (DCF, delta, Sharpe ratio, VaR) corre en código Python determinístico puro; el LLM sintetiza, narra y razona sobre los resultados. Este patrón elimina alucinaciones numéricas y permite auditoría completa de cada número en el reporte.

**Implicación para proyectos Globant**: la arquitectura correcta de un agente financiero tiene dos capas bien separadas. Los proyectos que mezclan cómputo con LLM son propensos a errores silenciosos que son peligrosos en contextos regulados.

---

## T15 — Emerging: stablecoins como rail de pagos agenticos

Mastercard AP4M soporta liquidación en stablecoins (USDC en Polygon, Solana, Base). Ripple, OKX y Coinbase son partners launch-day. La IMF publicó en julio 2026 un análisis sobre cómo agentic AI reshapea payments. El patrón emergente: LLM decide el pago → AP4M autoriza → stablecoin liquida en segundos globalmente → sin fricción FX para transacciones multi-currency entre agentes.

**Oportunidad LATAM**: para clientes con operaciones cross-border (México-EEUU, Brasil-Europa), el rail stablecoin + agentes es la solución de menor fricción para treasuries multinacionales.

---
*Pipeline automático — se actualiza en cada ingest. v6.*
