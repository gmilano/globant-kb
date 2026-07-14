# 🎯 Agentes AI — Legal

> Agentes y herramientas AI open source para la industria legal. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-14 (v7)

## Agentes y herramientas destacadas

| Nombre | Licencia | Descripción | Stars |
|--------|----------|-------------|-------|
| [due-diligence-agents](https://github.com/zoharbabin/due-diligence-agents) | Apache-2.0 | 13 AI agents para M&A forense en 9 dominios (Legal, Finance, Commercial, Tech, Cyber, HR, Tax, Regulatory, ESG); pipeline de 38 pasos con 5 quality gates bloqueantes; traza cada hallazgo a página y cita exacta | ~800 |
| [lavern](https://github.com/AnttiHero/lavern) | Apache-2.0 | Firma de abogados agentica: 67 agentes especialistas que revisan documentos mediante debate con evidencia, human gates obligatorios y loop de 10 verificaciones | 267 |
| [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | MIT | DMS / plataforma de inteligencia documental para el mundo agentico; grafo de citas, GraphQL+REST+MCP, búsqueda semántica, anotación humana + agentes sobre corpus legales | ~400 |
| [lawglance](https://github.com/lawglance/lawglance) | MIT | Asistente legal RAG gratuito y open-source; voice command, base de conocimiento multi-jurisdicción, roadmap multilingüe; cubre India, Canada y en expansión | ~200 |
| [OLAW](https://github.com/harvard-lil/olaw) | MIT | Harvard LIL Open Legal AI Workbench — RAG con herramientas para investigación legal; integra CourtListener API; framework extensible y multi-tool | ~350 |
| [LRAGE](https://github.com/hoorangyee/LRAGE) | MIT | Legal RAG Evaluation framework; soporta KBL, LegalBench, LawBench; índices BM25+FAISS precompilados sobre Pile-of-Law; LLM-as-judge con rúbricas; arXiv:2504.01840 | ~180 |
| [courtlistener-mcp](https://github.com/Vaquill-AI/courtlistener-mcp) | MIT | MCP server para CourtListener (250M+ páginas de tribunales US, PACER, eCFR); funciona con Claude, Cursor, Windsurf, VS Code; auth BYOK | ~300 |
| [DISC-LawLLM](https://github.com/FudanDISC/DISC-LawLLM) | Apache-2.0 | Sistema legal inteligente con LLMs; corpus judicial chino; LLM fine-tuned para consulta legal, análisis de casos, predicción de sentencias | 937 |
| [Blackstone](https://github.com/ICLRandD/Blackstone) | Apache-2.0 | Pipeline spaCy + modelos para NLP sobre texto legal inglés no estructurado; reconocimiento de entidades de casos, legislación, citas; production-ready | 691 |
| [awesome-legaltech](https://github.com/Vaquill-AI/awesome-legaltech) | MIT | Lista curada de recursos legaltech: plataformas open source, modelos AI, MCP servers, empresas, datasets; mantenida por Vaquill AI 2026 | ~500 |

---

## Señales nuevas (Jul 2026)

### OpenContracts + MCP — DMS Central para Legal Agentico (MIT)
OpenContracts se ha consolidado como el **DMS central para el mundo agentico legal** en 2026. Su servidor MCP built-in permite a agentes Claude/GPT/Cursor listar corpus, buscar documentos, seguir edges del grafo de citas y proponer nuevas anotaciones. La arquitectura de **grafo de citas** (documentos como nodos, citas como aristas) es única en el open-source legal.

```python
import anthropic
client = anthropic.Anthropic()
response = client.beta.messages.create(
    model="claude-sonnet-5",
    max_tokens=4096,
    mcp_servers=[{"url": "https://your-opencontracts.instance/mcp/"}],
    messages=[{"role": "user", "content": "Find all indemnification clauses in corpus 'M&A-2026' and flag those with uncapped liability"}]
)
```

### due-diligence-agents — M&A Forensico Multi-Agente (Apache-2.0)
- Orquestador Python con 38 pasos y **5 quality gates bloqueantes**
- 13 agentes que **cross-referencian hallazgos entre dominios** — lo que ningún revisor individual conecta
- Output: IC memos, advisor reports, negotiation checklists, integration plans
- Deps core: Apache 2.0/MIT/BSD (uso interno libre)

### Ecosistema MCP Vaquill-AI (MIT)
- **courtlistener-mcp**: 250M+ páginas tribunales US + PACER + eCFR
- **canlii-mcp**: Derecho canadiense vía MCP
- **vaquill-mcp**: 20M+ resoluciones judiciales India
- **open-legal-compliance-mcp**: APIs gubernamentales libres
- **legal-mcp** (agentic-ops): 8 workflow patterns como tool-call sequences

### LRAGE — Benchmark Estándar Legal RAG (arXiv:2504.01840, MIT)
Framework reproducible: KBL + LegalBench + LawBench. Retriever + Reranker + LLM-judge. Pile-of-Law BM25+FAISS precompilados.

---
*Actualizado automáticamente por el pipeline de ingest.*
