# 🧩 Patrones de composición — Legal Services

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-06 (segunda pasada — recetas completas)

## Arquitectura base

```
[Plataforma vertical base (open source)]
          ↓
[Capa de extracción / NLP — LexNLP / Blackstone]
          ↓
[Agentes especializados — lavern / agentcounsel / due-diligence-agents]
          ↓
[LLM backend — Claude claude-sonnet-5 / Mistral EU / Ollama local]
          ↓
[Almacenamiento + grafo de citas — OpenContracts / CourtListener]
          ↓
[UI conversacional / API para el cliente]
```

---

## Receta 1: Revisión inteligente de contratos

**Objetivo**: Analizar contratos comerciales en segundos, detectar cláusulas abusivas y generar redlines.

**Stack**:
- [`LexNLP`](https://github.com/LexPredict/lexpredict-lexnlp) — extracción de partes, fechas, montos, obligaciones, cláusulas de termination
- [`claude-legal-skill`](https://github.com/evolsb/claude-legal-skill) — CUAD risk detection, benchmarks de mercado, redlines sugeridas
- [`OpenContracts`](https://github.com/Open-Source-Legal/OpenContracts) — almacenamiento con anotaciones + grafo de citas para comparar vs. contratos previos

**Flujo**:
```
PDF/DOCX contrato
      ↓
LexNLP → extrae metadatos estructurados (partes, fechas, montos, jurisdicción)
      ↓
claude-legal-skill (vía Claude Code / Cursor) → análisis CUAD, risk scoring, redlines
      ↓
OpenContracts API → guarda contrato + anotaciones + vincula a contratos relacionados
      ↓
Dashboard → abogado ve heat-map de riesgo + redlines comparativas
```

**Tiempo estimado**: 3-4 semanas (MVP) | **Licencias**: MIT + Apache-2.0

---

## Receta 2: M&A Due Diligence Automatizada

**Objetivo**: Cubrir un data room completo con 13 agentes AI especializados en 9 dominios antes de que los abogados revisen.

**Stack**:
- [`due-diligence-agents`](https://github.com/zoharbabin/due-diligence-agents) — orquesta 13 agentes en 38 pasos (Legal, Finance, Commercial, Tech, Cyber, HR, Tax, Regulatory, ESG)
- [`OpenContracts`](https://github.com/Open-Source-Legal/OpenContracts) — DMS para el data room con grafo de citas
- [`courtlistener-mcp`](https://github.com/Vaquill-AI/courtlistener-mcp) — verificación de litigios previos de las partes en jurisprudencia US

**Flujo**:
```
Data room (carpetas de documentos)
      ↓
OpenContracts → ingesta, OCR, indexación vectorial
      ↓
due-diligence-agents → 13 agentes en paralelo por dominio
  ├── Legal Agent → cláusulas críticas, litigios pendientes
  ├── Finance Agent → estados financieros, deuda
  ├── Cyber Agent → políticas de seguridad, incidentes
  └── ... (9 dominios) → Judge Agent → síntesis ejecutiva con red flags
      ↓
courtlistener-mcp → verificar historial litigioso de las partes
      ↓
Report: executive summary + hallazgos por dominio + citas exactas (página/párrafo)
```

**Tiempo estimado**: 4-6 semanas (MVP productizable) | **Licencias**: MIT

---

## Receta 3: Agentic Law Firm (Tipo lavern)

**Objetivo**: Sistema multi-agente que revisa documentos legales mediante debate adversarial con 10 rondas de verificación.

**Stack**:
- [`lavern`](https://github.com/AnttiHero/lavern) — 67 agentes especializados, debate adversarial, mandatory human gates
- [`agentcounsel`](https://github.com/zgbrenner/agentcounsel) — 198 skills por área de práctica para enriquecer el conocimiento de los agentes
- [`OpenContracts`](https://github.com/Open-Source-Legal/OpenContracts) — repositorio de precedentes y contratos previos

**Configuración lavern**:
```yaml
# lavern/config.yaml
llm_backend: anthropic  # o "mistral" para datos EU, o "ollama" para local
heartbeat: 30m          # procesa nuevos documentos cada 30 minutos
agents:
  - contract_reviewer
  - risk_assessor
  - compliance_checker
  - precedent_searcher   # usa OpenContracts MCP
notifications:
  - telegram
  - email
human_gate: required_before_output  # obligatorio antes de emitir dictamen final
```

**Flujo**:
```
Documento nuevo detectado (carpeta monitoreada)
      ↓
lavern Clawern → 67 agentes analizan en paralelo
      ↓
Rondas de debate (10 pasadas) → agentes se contraargumentan
      ↓
Human gate → abogado revisa y aprueba o rechaza
      ↓
Precedent board actualizado → aprendizaje acumulativo entre revisiones
      ↓
Notificación (Telegram/email/macOS) con dictamen final
```

**Tiempo estimado**: 2-3 semanas (lavern ya listo, customizar agentes) | **Licencias**: Apache-2.0

---

## Receta 4: Legal Research RAG sobre Jurisprudencia

**Objetivo**: Asistente que responde preguntas legales citando casos reales de jurisprudencia US.

**Stack**:
- [`CourtListener`](https://github.com/freelawproject/courtlistener) — corpus de 9M+ opiniones US (o API pública)
- [`courtlistener-mcp`](https://github.com/Vaquill-AI/courtlistener-mcp) — interfaz MCP para Claude
- [`LexNLP`](https://github.com/LexPredict/lexpredict-lexnlp) — extracción de citas a casos, estatutos y secciones del CFR

**Flujo**:
```python
# Configurar servidor MCP en Claude Desktop / Claude Code
# En settings de Claude:
# {
#   "mcp_servers": {
#     "courtlistener": {
#       "url": "courtlistener-mcp.vaquill.ai",
#       "auth": "bring-your-own-key"
#     }
#   }
# }

# Claude puede entonces responder:
# "¿Hay precedentes sobre non-compete clauses en California post-2024?"
# → courtlistener-mcp busca en 9M+ opiniones → respuesta con citas verificadas

# Para LATAM: reemplazar CourtListener por corpus local del país
# (e.g. jurisprudencia argentina de la CSJN, colombiana de la Corte Suprema)
```

**Tiempo estimado**: 1-2 semanas | **Licencias**: BSD (CourtListener) + MIT (MCP)

---

## Receta 5: Automatización de Documentos Legales (A2J)

**Objetivo**: Asistente conversacional que ayuda a ciudadanos sin recursos a completar formularios judiciales.

**Stack**:
- [`docassemble`](https://github.com/jhpyle/docassemble) — motor de entrevistas guiadas y generación de documentos
- LLM (Claude claude-haiku-4-5 para bajo costo) — interpretación en lenguaje natural de respuestas del usuario
- [`LexNLP`](https://github.com/LexPredict/lexpredict-lexnlp) — extracción de entidades para auto-completar campos

**Flujo**:
```
Usuario en lenguaje natural: "Quiero demandar a mi arrendador por no devolver el depósito"
      ↓
LLM (Claude Haiku) → identifica tipo de formulario necesario
      ↓
docassemble → lanza entrevista guiada con preguntas en lenguaje simple
      ↓
LLM → normaliza respuestas libres a campos estructurados de docassemble
      ↓
LexNLP → verifica entidades (nombres, fechas, montos) extraídas
      ↓
docassemble → genera formulario judicial completado y listo para firma
      ↓
PDF descargable + instrucciones de presentación al tribunal
```

**Tiempo estimado**: 3-4 semanas | **Licencias**: MIT

---

## Receta 6: Compliance Continuo con Monitoreo de Cambios Normativos

**Objetivo**: Sistema que monitorea cambios en regulaciones y alerta sobre contratos afectados en el portfolio.

**Stack**:
- [`agentcounsel`](https://github.com/zgbrenner/agentcounsel) — skills de compliance por área regulatoria
- [`LexNLP`](https://github.com/LexPredict/lexpredict-lexnlp) — extracción de referencias normativas en contratos
- [`OpenContracts`](https://github.com/Open-Source-Legal/OpenContracts) — portfolio de contratos indexado y consultable
- LangGraph / LangChain — orquestación del agente de monitoreo

**Flujo**:
```python
# Agente LangGraph que corre diariamente:
from langgraph.graph import StateGraph

# Estado del agente de compliance
class ComplianceState(TypedDict):
    regulation_changes: list  # cambios detectados en normativa
    affected_contracts: list  # contratos con cláusulas afectadas
    alerts: list              # alertas para el equipo legal

# Nodos del grafo
# 1. monitor_regulations: scraping/API de fuentes normativas (BOE, CFR, DO)
# 2. extract_changes: LLM identifica cambios relevantes vs. estado previo
# 3. query_contracts: OpenContracts API → contratos que referencian la normativa
# 4. risk_assess: agentcounsel skills → evalúa impacto de cambio sobre cada contrato
# 5. notify: genera alerts priorizadas por nivel de riesgo
```

**Tiempo estimado**: 5-6 semanas | **Licencias**: MIT + Apache-2.0

---

## Anti-patrones a evitar

| Anti-patrón | Problema | Alternativa |
|-------------|---------|-------------|
| LLM generando citas legales sin RAG | Alucinaciones de casos inexistentes | Siempre usar RAG sobre corpus verificado (CourtListener, OpenContracts) |
| Un solo agente para todo | Sin verificación cruzada | Arquitectura multi-agente adversarial (lavern pattern) |
| Procesar datos legales en cloud de terceros sin consentimiento | Violación de confidencialidad cliente-abogado | `due-diligence-agents` corre 100% local; preferir Ollama o deployments privados |
| Outputs legales sin human gate | Riesgo de mal consejo jurídico | Mandatory human gate (lavern, agentcounsel lo implementan) |
| Ignorar jurisdicción en análisis contractual | Análisis incorrecto (ley aplicable varía) | LexNLP extrae jurisdicción; adaptar prompts por marco legal |
