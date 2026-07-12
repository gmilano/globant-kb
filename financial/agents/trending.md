# 📈 Agentes trending — Financial Services

> Lo más nuevo y en crecimiento esta semana. Última actualización: 2026-07-12

## Qué está explotando en julio 2026

### TradingAgents supera 80 k estrellas — la arquitectura "debate" gana
[TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) acaba de superar
80 000 estrellas y 15 500 forks. La convergencia que señala: **multi-agent debate antes de ejecutar
un trade** (bull agent vs bear agent → risk manager → fund manager) se convirtió en el patrón estándar,
igual que ai-hedge-fund (59 k ★) llegó independientemente al mismo diseño. Múltiples equipos enterprise
reportan adoptarlo como plantilla para sus propias implementaciones.

### MCP explota como capa de datos financieros
Los MCP servers para datos de mercado crecieron 4× en H1 2026. Ecosistema actual:
- **Bloomberg MCP** (`sbctreasury/bloomberg-mcp`): 18 herramientas — reference data, historical, BQL queries, supply chain screening; requiere Bloomberg Terminal.
- **Alpha Vantage MCP**: datos institucionales, cobertura multi-asset, latencia baja; oficial y gratuito en tier basic.
- **Quiver Quantitative MCP**: datos alternativos (Congress trades, insider activity, reddit sentiment).
- **awesome-trading-agents** ([LLMQuant/awesome-trading-agents](https://github.com/LLMQuant/awesome-trading-agents)): lista curada de MCP servers + agent skills para trading — referencia comunitaria emergente.

### Vibe-Trading de HKUDS: 16.9 k ★ en semanas
[HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) es el mismo equipo detrás de DeepTutor (edu).
Enfoque: NL → estrategia → backtest → reporte, todo en sesión. Sin código. Está popularizando el concepto
de "vibe trading" donde analistas financieros sin código Python pueden generar estrategias cuantitativas.

### kyc-analyst: compliance KYC/AML vía Claude
[vyayasan/kyc-analyst](https://github.com/vyayasan/kyc-analyst) lanzó en junio 2026 como plugin open source
(MIT) para Claude Cowork. 17 checkpoints human-in-the-loop, scoring determinístico, sin APIs de pago.
Primer indicador de que el stack "Claude + open source data + MCP" puede competir con vendors de compliance
de $50k/año.

### AgenticTrading — Open-Finance-Lab
[Open-Finance-Lab/AgenticTrading](https://github.com/Open-Finance-Lab/AgenticTrading): FinAgent
Orchestration Framework conectado al FinLLM-Leaderboard. Proyecto académico que se está volviendo
referencia de evaluación: incluye benchmarks sobre dónde fallan los LLMs financieros.

## Patrones emergentes en julio 2026

| Patrón | Descripción |
|--------|-------------|
| Bull-Bear debate | Dos agentes con mandatos opuestos debaten antes de que un risk manager decida |
| MCP-first data | Datos de mercado consumidos vía MCP server en lugar de SDK propietario |
| LoRA finance fine-tuning | FinGPT v3 pattern: fine-tune base LLM sobre noticias+tweets; costo < $300 GPU-hour |
| Human-in-the-loop compliance | kyc-analyst pattern: scoring automatizado + pausa para revisor humano en casos borderline |
| Vibe-to-strategy | NL prompt → código de backtest generado → ejecución automática → reporte |

---
*Pipeline automático — se actualiza en cada ingest.*
