# 📡 Tendencias — Legal AI

> Última actualización: 2026-07-06 (segunda pasada — datos frescos)

## Tendencias principales 2026

### Trend #1: De la experimentación a la integración embebida
2026 es el año en que AI pasa de ser un proyecto piloto a una capacidad embebida en las herramientas cotidianas del abogado. Copilots dentro de Word, Outlook, y los sistemas de case management están reemplazando a los chatbots standalone. Firmas que no integren AI en su workflow principal quedarán en desventaja competitiva en 18 meses.

**Implicación Globant**: los clientes no quieren otra herramienta; quieren AI dentro de lo que ya usan (Salesforce, Teams, SharePoint, SAP).

### Trend #2: Agentic law firms — multi-agente adversarial
Lavern (lanzado mayo 2026) demostró que es viable tener 67 agentes especializados debatiendo un documento en 10 rondas antes de emitir dictamen. La arquitectura "adversarial debate + mandatory human gate" está siendo adoptada como patrón de facto para alta-stakes legal review. Harvey Agents también sigue esta arquitectura.

**Implicación**: el patrón de un solo LLM generando análisis legal está siendo superado por pipelines multi-agente con verificación cruzada.

### Trend #3: Automatización de M&A due diligence
La due diligence M&A es uno de los casos de uso con mayor ROI demostrado: `due-diligence-agents` cubre 9 dominios en 38 pasos que antes requerían semanas de trabajo de analistas. La clave diferenciadora es la trazabilidad a cita exacta — evita las alucinaciones que son inaceptables en contexto legal.

**Cifras**: Harvey adquirió Hexus, Thomson Reuters adquirió Noetica — señal de que eDiscovery y due diligence son los mercados más calientes.

### Trend #4: MCP para bases legales
Vaquill AI lanzó servidores MCP para CourtListener (US), CanLII (Canadá) y su propio índice de 8M+ opiniones. El patrón se está expandiendo: cualquier base de jurisprudencia/normativa puede exponerse como MCP server y ser consultada desde Claude, Cursor, o cualquier LLM con soporte MCP.

**Implicación**: el acceso a corpus legales se democratiza — ya no se necesita integración costosa con Westlaw/LexisNexis.

### Trend #5: EU AI Act obliga governance para herramientas legales
Las obligaciones del EU AI Act entran en vigor en agosto 2026. Los sistemas AI usados en contextos legales califican como "high-risk" (Anexo III), requiriendo: evaluación de conformidad, registro en base de datos UE, transparencia al usuario, supervisión humana, y documentación técnica.

**Implicación**: clientes europeos necesitan ayuda para navegar el compliance; Globant puede ofrecer EU AI Act readiness assessment + implementación de governance.

### Trend #6: Mitigación de alucinaciones como diferenciador clave
La principal barrera de adopción de AI legal es el riesgo de alucinaciones en citas de jurisprudencia. Las soluciones que se están imponiendo: (a) RAG sobre corpora legales verificados, (b) citation verification como paso obligatorio en el pipeline, (c) arquitecturas multi-agente con verificación cruzada.

**Proyectos líderes**: OpenContracts (grafo de citas programable), due-diligence-agents (traza a página exacta), courtlistener-mcp (fuentes verificadas).

### Trend #7: LLMs especializados por jurisdicción
DISC-LawLLM (China), fuzi.mingcha (China), y proyectos emergentes en otros países muestran que hay demanda por modelos fine-tuned en corpora legales nacionales. La especialización por jurisdicción reduce alucinaciones vs. modelos generalistas.

**Oportunidad LATAM**: no existe un LLM especializado en derecho latinoamericano (civil law, códigos napoleónicos). Globant podría liderar su creación.

### Trend #8: CLM (Contract Lifecycle Management) con AI nativa
La próxima generación de CLM embebe AI para: (a) extracción automática de metadatos al ingestar contratos, (b) alertas proactivas de vencimiento y renegociación, (c) análisis de riesgo at-scale sobre portfolios de miles de contratos, (d) negociación asistida con redlines sugeridas.

**Inversión**: Ironclad supera $200M ARR; el mercado CLM crece más rápido que el LegalTech general.

### Trend #9: Access-to-justice como palanca social
Organizaciones de ayuda legal pública (LSC en EE.UU., equivalentes en LATAM) están adoptando docassemble + LLM para automatizar la preparación de formularios judiciales para ciudadanos sin recursos. El movimiento A2J Tech (access-to-justice) está ganando tracción y funding filantrópico.

**Oportunidad**: Globant puede ofrecer implementaciones pro-bono/social-impact que construyen reputación y expertise en el sector.

### Trend #10: Concentración del mercado LegalTech
Q1 2026: 3 empresas (Harvey, Legora, Relativity) representaron el 63% de toda la inversión. El mercado se está polarizando entre grandes plataformas con ecosistemas cerrados y soluciones open source especializadas. La estrategia ganadora para integradores como Globant es el espacio intermedio: implementar + customizar open source para dar capacidades que las plataformas cerradas no ofrecen.

## Repos más activos esta semana

- [AnttiHero/lavern](https://github.com/AnttiHero/lavern) — Agentic law firm: 67 agentes especializados, debate adversarial, Apache 2.0.
- [zoharbabin/due-diligence-agents](https://github.com/zoharbabin/due-diligence-agents) — M&A due diligence con 13 agentes, 9 dominios, MIT.
- [Vaquill-AI/courtlistener-mcp](https://github.com/Vaquill-AI/courtlistener-mcp) — Servidor MCP para CourtListener, MIT.
- [zgbrenner/agentcounsel](https://github.com/zgbrenner/agentcounsel) — 198 skills legales en Markdown, MIT.
- [evolsb/claude-legal-skill](https://github.com/evolsb/claude-legal-skill) — Revisión de contratos con CUAD, MIT.
