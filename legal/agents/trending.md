# 📈 Agentes trending — Legal Services

> Lo nuevo esta semana en el espacio legal AI. Última actualización: 2026-07-12

## Highlights de la semana (julio 2026)

### 🔥 lavern — Agentic Law Firm (v0.15.0)
**[AnttiHero/lavern](https://github.com/AnttiHero/lavern)** | Apache-2.0 | 267+ ★

El proyecto más significativo del mes en legal AI open source. Lanzado en mayo 2026, recibió amplia cobertura en Artificial Lawyer y XIRA. Arquitectura clave:
- 67 agentes especializados (abogados de distintas prácticas) + orquestadores
- Protocolo de debate: los agentes publican hallazgos con citas de evidencia, luego 3 capas de verificación
- Human gates obligatorios antes de decisiones críticas (no agentic-only)
- Corre contra Anthropic API, Mistral EU, o Ollama completamente local
- Clawern daemon + dashboard estable en v0.15.0

### 🆕 OpenContracts — Document Intelligence con MCP
**[Open-Source-Legal/OpenContracts](https://github.com/Open-Source-Legal/OpenContracts)** | MIT | 1.4k ★

Alcanzó 1.4k stars en 2026. Agregó servidor MCP nativo — ahora los agentes pueden hacer queries directamente sobre el citation graph del repositorio de contratos. Arquitectura:
- API GraphQL + REST para apps
- MCP server para agentes Claude/Cursor/OpenHands
- React UI para equipos legales
- Extracción estructurada + anotación humana + búsqueda semántica

### 🆕 Ecosistema de MCP Servers legales
Tres nuevos MCP servers especializados ganaron tracción:

| Repo | Descripción | Status |
|------|-------------|--------|
| [legal-mcp](https://github.com/agentic-ops/legal-mcp) | Framework MCP extensible para legal AI — 85★ | Activo |
| [us-legal-mcp](https://github.com/JamesANZ/us-legal-mcp) | US law: Congress + Federal Register + CourtListener | Activo |
| [open-legal-compliance-mcp](https://github.com/TCoder920x/open-legal-compliance-mcp) | Multi-jurisdicción: US + EU compliance via APIs públicas | Activo |

### 📊 LegalMD — Markdown para documentos legales
Nuevo proyecto de HAQQ AI (2026): dialect de Markdown para documentos legales con 4 primitivas tipadas:
- `@party` — partes del contrato
- `@cite` — citas legales verificadas vs datos abiertos
- `@clause` — cláusulas identificadas
- `@deadline` — fechas y vencimientos

TypeScript parser + renderers HTML/JSON + extensión VS Code. Licencia MIT.

### 🌎 LATAM: Consultor Tributario AI
**[Consultor-Tributario-AI](https://github.com/mahdyet1845/Consultor-Tributario-AI)** — Analyzes Brazil's Reforma Tributária in real time (IBS, CBS, transición fiscal 2026). Señal: hay demanda de AI legal en español/portugués para compliance local.

---

## Tendencia general de julio 2026

1. **MCP se volvió el protocolo estándar para integrar legal AI** — múltiples servidores dedicados a jurisdicciones y dominios específicos
2. **Multi-agent legal con human-in-the-loop** — lavern como modelo a seguir: debate entre agentes + gates humanos
3. **Legal AI local/EU** — lavern soporta Mistral EU y Ollama local; respuesta directa a preocupaciones de soberanía de datos
4. **Brasil reforma tributaria** impulsa proyectos de compliance AI en LATAM

---
*Pipeline automático — se actualiza cada hora.*
