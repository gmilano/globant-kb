# 🏭 Verticales de partida — Legal Services

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-05

## Plataformas recomendadas

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| docassemble | MIT | [github.com/jhpyle/docassemble](https://github.com/jhpyle/docassemble) | Python/Flask | Entrevistas guiadas, formularios de corte, acceso a justicia, generación de documentos legales |
| OpenContracts | MIT | [github.com/Open-Source-Legal/OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | Django/React/Postgres | DMS legal con anotación humana, agentes AI integrados, MCP server, vector search |
| EspoCRM | MIT | [github.com/espocrm/espocrm](https://github.com/espocrm/espocrm) | PHP/JS | CRM para firmas legales: gestión de clientes, casos, actividades, documentos |
| SuiteCRM | AGPL-3.0 | [github.com/salesagility/SuiteCRM](https://github.com/salesagility/SuiteCRM) | PHP/SugarCRM | CRM relacional para firmas: seguimiento de clientes, pipeline de asuntos, compliance |
| ClinicCases | GPL-3.0 | [github.com/ClinicCases/ClinicCases](https://github.com/ClinicCases/ClinicCases) | PHP/MySQL | Gestión de casos para clínicas jurídicas universitarias: time tracking, calendar, export |
| Dolibarr | GPL-3.0 | [github.com/Dolibarr/dolibarr](https://github.com/Dolibarr/dolibarr) | PHP | ERP/CRM web para despachos: facturación, cotizaciones, agenda, contactos, contabilidad |
| OpenLaw | Apache-2.0 | [github.com/openlawteam/openlaw-core](https://github.com/openlawteam/openlaw-core) | Scala/JVM | Acuerdos legales digitales con lógica programable; base para contratos inteligentes |
| Portabilis i-diario | MIT | [github.com/portabilis/i-diario](https://github.com/portabilis/i-diario) | Ruby on Rails | Gestión de registros legales LATAM (Brasil); adaptable para registro y expedientes |

---

## Cómo customizar con AI

### Paso 1 — Fork + setup local
```bash
git clone https://github.com/Open-Source-Legal/OpenContracts
docker-compose up -d
```

### Paso 2 — Añadir endpoint AI
```python
# settings.py / .env
ANTHROPIC_API_KEY = "..."
OPENAI_API_KEY = "..."       # alternativa
OLLAMA_BASE_URL = "http://localhost:11434"  # opción local/privada
```

### Paso 3 — Wrappear flujos existentes con agentes
```python
# Ejemplo: agente de extracción de cláusulas sobre OpenContracts
from opencontracts import DocumentAgent
from lexnlp.extract.en import clauses

agent = DocumentAgent(
    model="claude-sonnet-5-20251101",
    extractors=[clauses.get_clauses],
    annotation_schema="contract_clauses_v2"
)
result = agent.analyze(document_id="doc-123")
```

### Paso 4 — UI conversacional
- Exponer resultados vía MCP server (OpenContracts ya incluye uno)
- Conectar Claude Desktop o cualquier cliente MCP al endpoint
- Configurar herramientas: `search_contracts`, `get_clause`, `compare_versions`

---

## Selección por tamaño de cliente

| Perfil | Plataforma recomendada | Razón |
|--------|----------------------|-------|
| Clínica jurídica / pro-bono | docassemble | Portales de autoservicio para ciudadanos |
| Firma mediana (20-100 abogados) | EspoCRM + OpenContracts | CRM + DMS agéntico integrado |
| Firma grande / corporate legal | OpenContracts + lavern | Análisis masivo de contratos con pipeline multi-agente |
| Legal Ops / GC office | agentcounsel + OpenContracts | Skills AI sobre flujos existentes |
| Cortes / sector público | docassemble + ClinicCases | Acceso a justicia + gestión de casos |

---
*Ver también: `repos/foundations.md` para librerías NLP y `compose/patterns.md` para recetas.*
