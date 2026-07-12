# 📡 Tendencias — Financial Services AI

> Últimas tendencias en AI para servicios financieros.
> Última actualización: 2026-07-12 (v10)

## Tendencias macro (Q2-Q3 2026)

### 1. Boom de Agentic FinTech como paradigma dominante
Agentic FinTech ya no es un experimento: 52% de la industria tiene agentes en producción. El shift de "LLM como chat" a "LLM como agente autónomo con herramientas financieras" es la transformación más importante del sector. TradingAgents alcanzó 80k+ stars — el crecimiento más rápido en GitHub de cualquier repo financiero en 2026.

### 2. Multi-agente para trading institucional
El patrón de simular una firma de trading como colección de agentes LLM especializados (analista técnico, analista fundamental, gestor de riesgos, portfolio manager) demostró resultados prometedores en backtesting. TradingAgents y ai-hedge-fund son las implementaciones de referencia. El riesgo: la brecha entre backtesting y live trading sigue siendo grande (costos de transacción, slippage, cambios de régimen).

### 3. KYC/AML: "última mejor esperanza" para compliance a escala
Los bancos detectan solo ~2% del crimen financiero global a pesar de dedicar 10-15% de su headcount a compliance. Fintech Global (Jun 2026) documenta que agentic AI es el único camino para escalar KYC/AML sin multiplicar costos. El análisis semántico con LLMs reduce falsos positivos en fraude en un 60%.

### 4. EU AI Act (en vigor agosto 2, 2026) redefine requisitos
El scoring crediticio es "riesgo alto" bajo el AI Act. Los sistemas de scoring automatizados requieren: explicabilidad de decisiones, audit log inmutable, human-in-the-loop en decisiones significativas, y evaluación periódica de sesgos. Los bancos europeos (y globales con operaciones EU) buscan urgentemente frameworks de governance.

### 5. OpenBB + MCP = datos financieros para agentes nativos
OpenBB lanzó soporte MCP server nativo en Q2 2026. Esto significa que cualquier agente Claude / GPT-4o puede conectarse directamente a 50+ proveedores de datos financieros (Yahoo Finance, Polygon, FRED, SEC) como herramienta MCP. Democratiza el acceso a datos de calidad institucional.

### 6. 70% del onboarding de cuentas será automático en 2026
La proyección de automatización total del onboarding se está cumpliendo: plataformas con AI Vision para verificación de documentos + NLP para análisis de riesgo + sanctions screening automático están procesando >70% de los casos sin intervención humana.

### 7. Embedded Finance + Agentes: finanzas donde el cliente ya está
Open banking + AI agents permite ofrecer crédito, seguros y pagos dentro de apps no financieras. Los agentes hacen el underwriting en tiempo real usando datos transaccionales del usuario (con consentimiento). LATAM es mercado prioritario por alta penetración móvil y baja bancarización.

### 8. Reguladores divergentes crean complejidad global
USA, UE, UK y Canadá tienen enfoques distintos sobre AI en finanzas. El 70% de los bancos usa agentic AI pero sin governance robusto (EY 2026). Solo el 29% tiene frameworks formales de supervisión de AI. Esta brecha es tanto riesgo regulatorio como oportunidad de consultoría.

### 9. On-premise LLMs para datos sensibles
Por regulación (LGPD, GDPR, secreto bancario), los bancos LATAM y europeos no pueden enviar datos de clientes a cloud LLMs. La demanda de stacks con Ollama + modelos locales (Llama 3.1, Mistral) + Claude Enterprise con datos retention off está creciendo. Esto favorece a Globant como implementador on-premise.

### 10. RL para portfolios dinámicos reemplaza quant tradicional
FinRL y sus derivados están siendo adoptados por family offices y fondos medianos que no pueden pagar equipos quant completos. Los agentes RL se adaptan a cambios de régimen de mercado más rápido que las estrategias basadas en reglas fijas.

## Repos más activos esta semana

- [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) — 80k+ stars, multi-agent LLM trading firm
- [virattt/ai-hedge-fund](https://github.com/virattt/ai-hedge-fund) — 60k+ stars, 14 investor personas
- [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) — 17k stars, personal trading agent Jun 2026
- [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) — fine-tuning LLMs con datos de mercado en tiempo real
- [agentic-fintech/Agentic_FinTech_Survey](https://github.com/agentic-fintech/Agentic_FinTech_Survey) — survey académico Jun 2026
