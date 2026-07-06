# 🏭 Verticales de partida — Legal Services

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-06

## Plataformas recomendadas

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| [docassemble](https://github.com/jhpyle/docassemble) | MIT | https://docassemble.org | Python + YAML + Markdown | Automatización de documentos legales / entrevistas guiadas. Gold-standard en clínicas jurídicas EE.UU. 2.6k★ |
| [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | MIT | https://contracts.opensource.legal | Django + React + GraphQL | DMS agéntico: gestión de contratos con anotación, agentes AI y MCP server integrado. 980★ |
| [CourtListener](https://github.com/freelawproject/courtlistener) | BSD | https://www.courtlistener.com | Django + PostgreSQL + Elasticsearch | Archivo de jurisprudencia US (9M+ opiniones); API pública + RECAP PACER integration. 961★ |
| [ArkCase CE](https://github.com/ArkCase/ArkCase) | Apache-2.0 | https://www.arkcase.com | Java + Spring + Angular | Case management empresarial: documentos, contactos, calendarios, emails, tareas, billing. FedRAMP autorizado. |
| [CiviCRM](https://github.com/civicrm/civicrm-core) | AGPL | https://civicrm.org | PHP | CRM + gestión de casos para organizaciones de ayuda legal; manejo de donantes, voluntarios y clientes. 660★ |
| [SuiteCRM](https://github.com/salesagility/SuiteCRM) | AGPL | https://suitecrm.com | PHP + JavaScript | CRM completo con módulos de cases, tareas, documentos, reportes y workflows; fork open source de SugarCRM. 4.5k★ |

## Cómo customizar con AI

### docassemble + LLM

```python
# Agregar endpoint conversacional sobre entrevistas docassemble
# 1. Instalar docassemble-llm o usar API webhook
# 2. Conectar OpenAI/Anthropic para interpretar respuestas en lenguaje natural
# 3. docassemble maneja la lógica y genera el documento; LLM maneja el diálogo

# Ejemplo: flujo docassemble con Anthropic
import anthropic

client = anthropic.Anthropic()
def interpret_user_answer(question: str, raw_answer: str) -> str:
    """Normaliza una respuesta libre del usuario al campo esperado por docassemble."""
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=256,
        messages=[{"role": "user", "content": f"Question: {question}\nAnswer: {raw_answer}\nExtract the structured value:"}]
    )
    return response.content[0].text
```

### OpenContracts + Agentes AI

```python
# OpenContracts expone GraphQL + MCP server; añadir agente encima es sencillo
# 1. Deploy OpenContracts (docker-compose up)
# 2. Usar el MCP server para conectar Claude/LLM
# 3. Definir agentes para extracción de cláusulas, alertas de vencimiento, etc.

# Las anotaciones de OpenContracts alimentan el grafo de citas
# Los agentes pueden hacer: "busca todos los contratos con cláusula de no-compete activa"
```

### ArkCase CE + AI Pipeline

```
ArkCase CE (case management)
       ↓ REST API
LexNLP (extracción de entidades legales del documento)
       ↓
LLM (Anthropic / local Ollama) — resumen, clasificación, risk scoring
       ↓
OpenContracts (almacenamiento con grafo de citas)
       ↓
UI ArkCase — abogado ve caso + análisis AI integrado
```

## Notas de licenciamiento para Globant

- **MIT / Apache-2.0**: libre para proyectos comerciales, modificación y redistribución sin restricciones.
- **AGPL (CiviCRM, SuiteCRM)**: usar como SaaS requiere open-sourcing de modificaciones; preferir fork con cuidado legal o uso interno.
- **BSD (CourtListener)**: permisivo, comparable a MIT.
- **ArkCase CE Apache-2.0**: edición comunitaria; la edición Enterprise es propietaria.
