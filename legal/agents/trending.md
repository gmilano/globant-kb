# 📈 Tendencias — Legal AI Agents

> Última actualización: 2026-07-07

## Repos con mayor velocidad esta semana

| Nombre | Stars | Δ/semana | Licencia | Por qué importa |
|--------|-------|----------|----------|-----------------|
| [willchen96/mike](https://github.com/willchen96/mike) | ~2.2k | +2.2k | AGPL-3.0 | Harvey/Legora clone: 2.2k★ + 614 forks en la primera semana. Viral en HN. Cambia la negociación de precios con vendors. |
| [AnttiHero/lavern](https://github.com/AnttiHero/lavern) | ~400 | +150 | Apache-2.0 | Agentic law firm con 67 agentes especializados. Artificial Lawyer: "The Agentic 'Law Firm' Has Arrived" (May 20, 2026). |
| [Open-Source-Legal/OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | ~1.4k | +80 | MIT | MCP server nativo, citation graph, agentic auto-description de documentos. DMS para el mundo agentico. |
| [evolsb/claude-legal-skill](https://github.com/evolsb/claude-legal-skill) | ~355 | +50 | MIT | Skill para Claude Code: CUAD risk detection + redlines. Integra en cualquier editor con Claude Code. |
| [agentic-ops/legal-mcp](https://github.com/agentic-ops/legal-mcp) | ~120 | +40 | MIT | MCP server completo para workflows legales: buscando profesionales legales para case studies. |

---

## Trend 1: Mike OSS — "Changes the Negotiation" (May 2026)

El 5 de mayo de 2026, Will Chen (ex-Latham & Watkins) publicó Mike en GitHub bajo AGPL-3.0:
> *"I spent two weeks rebuilding the core of Harvey and Legora."*

**Impacto inmediato:**
- 2.2k★ y 614 forks en la primera semana
- Harvey valuada en $11B, Legora en $5.6B — ambas bajo presión
- Legal IT Insider: "changes the negotiation" — firmas ahora tienen alternativa self-hosted
- AGPL-3.0 permite uso interno sin publicar código; sólo requiere publicación si se expone como servicio

**Features replicadas:**
- Document-aware chat para contratos y packs de due diligence
- Tabular extraction: datos estructurados de cientos de documentos en paralelo
- No bundlea modelo: llama a Claude API o Gemini API con la API key de la firma

**Implicación Globant:** Clientes que ya pagan Harvey/Legora pueden hacer pivot a Mike + soporte Globant, capturando el diferencial de precio como servicios de customización.

---

## Trend 2: Lavern — Agentic Law Firm con Debate Epistémico (May 2026)

Artificial Lawyer cubrió Lavern el 20 de mayo de 2026. Founder: Antti Innanen (ex-managing partner Dottir Attorneys, fundó Legit).

**Arquitectura única:**
- 67 agentes = 59 especialistas + 7 orquestadores + 1 base
- Protocolo de debate: cada agente debe citar texto específico del documento; hallazgos sin cita no entran al board
- 10-pass verification: contexto → UX → claridad → estructura → exactitud → completitud → riesgo → formato → diseño legal → entrega
- Modo autónomo "Clawern": heartbeat de 30 minutos, notificaciones Telegram/email/macOS

**Licencia Apache-2.0** — listo para uso comercial sin copyleft.

---

## Trend 3: MCP como Estándar para Legal AI (Junio 2026)

Artificial Lawyer publicó: *"MCP: The Standard that Decides Legal AI's Future"* (junio 2026).

**Estado del ecosistema:**
- OpenContracts tiene endpoint MCP nativo en /mcp/ con /.well-known/mcp.json
- Docusign lanzó integración MCP para contract automation (mayo 2026)
- agentic-ops/legal-mcp: MCP server de propósito general para legal workflows
- patent_fpd_mcp: USPTO Final Petition Decisions via MCP
- Implicación: cualquier LLM cliente MCP puede ahora conectarse a repositorios de documentos legales

---

## Trend 4: Enter — Primer Unicornio AI de LATAM ($1.2B, Mayo 2026)

Enter (Brazil) cerró ronda Series B de $100M liderada por Founders Fund, Sequoia Capital, y Ribbit Capital → valuación $1.2B.

**Por qué importa:**
- Brasil: ~75 millones de litigios pendientes + 90%+ de casos laborales del mundo
- Enter automatiza: drafting de mociones, estimación de costos de settlement, coordinación de procesos
- Clientes: Nubank, Bradesco, Mercado Livre, Airbnb, LATAM Airlines
- Confirma LATAM como mercado de legaltech de alto crecimiento

---

## Señales Q3 2026 a Monitorear

| Señal | Repo / Fuente | Cuándo |
|-------|--------------|--------|
| Mike OSS llega a 5k★ | github.com/willchen96/mike | ~Q3 2026 |
| Lavern soporte multi-firma (SaaS) | lavern.ai | ~Q3 2026 |
| OpenContracts v2.0 con RAG nativo | github.com/Open-Source-Legal/OpenContracts | ~Q3 2026 |
| LegalBench v2 con agentic tasks | github.com/HazyResearch/legalbench | ~Q3 2026 |
| Enter expansión México/Colombia | getenter.ai | H2 2026 |

---
*Pipeline automático — se actualiza cada hora.*
