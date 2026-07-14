# 📡 Tendencias — Legal AI

> Señales de mercado, repos activos, cambios regulatorios.
> Última actualización: 2026-07-14 (v7)

## T1 — Agentic legal workflows: de asistente a ejecutor autónomo

2026: los sistemas AI **planifican y ejecutan workflows legales multi-paso de forma autónoma**. due-diligence-agents (38 pasos, 5 quality gates) y lavern (67 agentes, debate + human gates) son los patrones de referencia. Stack: LLM razonador + MCP + orquestador (LangGraph/AutoGen/custom).

## T2 — MCP como infraestructura estándar de legal research

H1 2026: MCP para derecho pasó de experimental a estándar de facto. CourtListener-MCP (250M+ docs US), CanLII-MCP (Canadá), Vaquill-MCP (20M+ sentencias India), USPTO FPD MCP (patentes). Patrón dominante: abogado + Claude Desktop + 3-4 MCP servers > solución propietaria. BYOK es el modelo de distribución.

## T3 — Governance gap: 83% adopción individual vs 34% institucional

Bloomberg Law (jun 2026): 49% brecha. La mayor oportunidad Globant: **governance frameworks + deployment seguro**. Clientes no necesitan más tools — necesitan saber cómo gobernar los que ya usan.

## T4 — EU AI Act deadline 2 agosto 2026: legaltech en zona de alto riesgo

AI en procesos judiciales = **alto riesgo**: documentación obligatoria, auditorías, HITL, registro en EU database. Providers sin compliance perderán clientes europeos.

## T5 — Colorado AI Act SB205 (jun 2026): primer marco US estatal comprehensivo

Aplica a decisiones de "consecuencias materiales" incluyendo servicios legales. Developer disclosure + deployer impact assessments. Señal: regulación subnacional US avanza antes que federal.

## T6 — CLM como segmento independiente de alto crecimiento

$2.07B (2025) → $5.09B (2034), CAGR 13%. OpenCLM (AGPL) + OpenContracts (MIT) son los equivalentes open source de Ironclad/Evisort.

## T7 — BYOK como estándar para datos legales

Privilege attorney-client + GDPR/LGPD = modelo SaaS compartido inaceptable. BYOK con self-hosted open source (OpenContracts, OpenCLM) + LLM propio se convierte en el único modelo aceptable para grandes firmas.

## T8 — RAG sobre corpus legales supera fine-tuning en adopción

57% de organizaciones NO hace fine-tuning (LangChain State of Agent Engineering 2026). RAG sobre corpus actualizados es más práctico — las leyes cambian, los modelos fine-tuned se desactualizan.

## T9 — Grafo de citas como infraestructura central del conocimiento legal

OpenContracts: documentos como nodos, citas como aristas. Navega cadena de precedentes, detecta citas circulares. Equivalente legal del knowledge graph de Google — pero para corpus de una firma.

## T10 — M&A DD multi-agente con cross-domain reasoning

due-diligence-agents resuelve el problema fundamental: ningún revisor conecta Legal con Financial con Cyber. Los agentes cross-referencian: cláusula de indemnización + pasivo contingente + CVE crítico.

## T11 — LegalBench + LRAGE como estándar de evaluación reproducible

Clientes sofisticados pedirán scores LRAGE antes de comprar. Globant debe incluir evaluación LRAGE en propuestas.

## T12 — De NLP clásico (Blackstone/spaCy) a MCP + LLM agents

Era Blackstone+spaCy (2019-2023) da paso a Claude/GPT+MCP (2024-2026). Pipeline nuevo: MCP server → LLM razonador → output estructurado → revisión humana.

## T13 — LATAM: Reforma Tributária Brasileira como caso de uso de alto valor

Reforma Tributária (IBS/CBS/IS, transición 2026-2033) genera demanda masiva de herramientas para interpretar normas en evolución. Bufetes, consultoras y corporaciones necesitan AI que lea las normas del día.

## T14 — Acceso a justicia: AI legal multilingüe para LATAM

lawglance y similares democratizan el acceso al derecho. En LATAM, con tasas de litigiosidad altas y pocos abogados per cápita, AI multilingüe (español/portugués) es oportunidad de impacto social + negocio (B2G, ONGs).

## T15 — Legal + blockchain: contratos auto-ejecutables con intentón legal interpretada por AI

Smart contracts en Ethereum/Polkadot con capa de intención legal interpretada por LLMs. Mythril (MIT, 4.3k★) para seguridad EVM + AI para verificar que el código implementa la intención legal.

---

## Repositorios más activos esta semana

- [Open-Source-Legal/OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) — DMS + MCP; citation graph
- [zoharbabin/due-diligence-agents](https://github.com/zoharbabin/due-diligence-agents) — Knowledge Compounding Arch + Neurosymbolic Orchestrator
- [Vaquill-AI/courtlistener-mcp](https://github.com/Vaquill-AI/courtlistener-mcp) — MCP legal research
- [Vaquill-AI/awesome-legaltech](https://github.com/Vaquill-AI/awesome-legaltech) — MCP registry legal
- [hoorangyee/LRAGE](https://github.com/hoorangyee/LRAGE) — Benchmark RAG legal estándar
