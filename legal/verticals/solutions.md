# 🏭 Verticales de partida — Legal Services

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agentica arriba.
> Última actualización: 2026-07-07

---

## Plataformas recomendadas

| Plataforma | Licencia | Stars | Stack | Caso de uso |
|------------|----------|-------|-------|-------------|
| [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | MIT ✅ | ~1.4k | Django, React, pgvector | DMS agentico: contratos, due diligence, regulatory libraries |
| [Mike OSS](https://github.com/willchen96/mike) | AGPL-3.0 ⚠️ | ~2.2k | FastAPI, React | Plataforma legal AI completa: chat + extracción |
| [lavern](https://github.com/AnttiHero/lavern) | Apache-2.0 ✅ | ~400 | Python, TypeScript | Sistema agentico de revisión: 67 agentes especializados |
| [OpenLawOffice](https://github.com/NodineLegal/OpenLawOffice) | Apache-2.0 ✅ | ~420 | .NET, PostgreSQL | Gestión de bufete: casos, facturación, tareas |
| [ArkCase CE](https://www.arkcase.com/) | Apache-2.0 ✅ | Community | Java, Spring Boot | Case management FedRAMP/HIPAA para sector regulado |
| [ERPNext](https://github.com/frappe/erpnext) | GPL-3.0 ⚠️ | ~22k | Python, Frappe | ERP completo con módulo legal + billing para firmas |
| [Odoo](https://github.com/odoo/odoo) | LGPL-3.0 ⚠️ | ~52k | Python, JavaScript | CRM + facturación + gestión de contratos para firmas |

---

## Deep dive: OpenContracts (MIT — Recomendado principal)

**Por qué es el punto de partida ideal:**
1. MIT license — sin restricciones para productos comerciales
2. MCP server nativo — Claude/GPT-4 se conectan directo sin código adicional
3. Citation graph automático — cada upload genera relaciones entre documentos
4. GraphQL + REST API — integra con cualquier frontend

**Arquitectura:**
```
Upload documentos
      ↓
Agentes auto-describen y resumen (configurable)
      ↓
Citation graph: statutory citations → edges automáticos
      ↓
MCP server en /mcp/ — clientes LLM se conectan
      ↓
GraphQL API para apps + React UI para equipos
```

**Integración con Claude (código):**
```python
# Conectar Claude a OpenContracts via MCP
import anthropic

client = anthropic.Anthropic()

# Claude usa el MCP server de OpenContracts directamente
# Configurar en claude_desktop_config.json:
# {
#   "mcpServers": {
#     "opencontracts": {
#       "url": "http://localhost:8000/mcp/",
#       "transport": "http"
#     }
#   }
# }

# O usar via API con herramientas manuales
response = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=2048,
    tools=[{
        "name": "search_contracts",
        "description": "Search the OpenContracts corpus for relevant documents and annotations",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "Search query"},
                "corpus_id": {"type": "integer", "description": "OpenContracts corpus ID"}
            },
            "required": ["query"]
        }
    }],
    messages=[{
        "role": "user",
        "content": "Find all NDA clauses about data retention in our contract corpus"
    }]
)
```

---

## Deep dive: Mike OSS (AGPL-3.0)

**Cuándo usar:** Cliente que quiere Harvey/Legora sin vendor lock-in y tiene capacidad técnica interna.

**Features principales (replicando Harvey/Legora):**
- Document-aware chat: respuestas grounded en documentos específicos
- Tabular extraction: extrae tablas de datos de cientos de contratos en paralelo
- Multi-model: Claude API o Gemini API (la firma provee su propia API key)

**Deployment pattern:**
```bash
# Docker deployment básico
git clone https://github.com/willchen96/mike
cd mike
cp .env.example .env
# Configurar ANTHROPIC_API_KEY o GOOGLE_API_KEY en .env
docker compose up -d
```

**⚠️ Nota AGPL-3.0:** Si Globant despliega Mike como servicio (SaaS) para el cliente, las modificaciones deben publicarse. Para deployments internos en la firma del cliente, AGPL-3.0 es libre.

---

## Deep dive: lavern (Apache-2.0 — Preferido para productos SaaS)

**Cuándo usar:** Necesitas un pipeline de revisión de contratos de alta calidad con verificación multi-agente.

**Configuración mínima:**
```bash
git clone https://github.com/AnttiHero/lavern
cd lavern
pip install -r requirements.txt
# Configurar ANTHROPIC_API_KEY en .env
# Seleccionar agentes activos en config/agents.yaml
python -m lavern.main --document path/to/contract.pdf
```

**Personalización típica para cliente:**
1. Seleccionar subset de 67 agentes según especialidad del cliente (M&A, empleo, IP)
2. Modificar prompts de agentes para jurisdicción específica (Brasil, México, etc.)
3. Integrar notificaciones con Slack/Teams en lugar de Telegram
4. Añadir webhook para guardar resultados en OpenLawOffice o sistema cliente

---

## LATAM: Mapa de plataformas por país

| País | Plataforma dominante | AI opportunity | Notas |
|------|---------------------|----------------|-------|
| Brasil | ERPNext + custom | Enter ($1.2B unicorn) — acceso a justicia masivo | 75M litigios pendientes |
| México | Odoo + módulos locales | Contratos comerciales + compliance fiscal SAT | CFDI integration |
| Argentina | Odoo + ERPNext | Contratos laborales + restructuring | Inestabilidad regulatoria = alta demanda |
| Colombia | SuiteCRM + custom | Due diligence M&A + contratos de servicios | Mercado M&A creciente |
| Chile | OpenLawOffice + custom | Contratos minería + infraestructura | Inglés/español bilingual |
| Perú | ERPNext | Contratos minería + gobierno | Licitaciones públicas AI |

---

## Build vs Buy matrix

| Escenario | Recomendación | Licencia | Tiempo |
|-----------|--------------|----------|--------|
| Firma mediana quiere Harvey alternativo | Mike OSS + Globant support | AGPL-3.0 | 4-6 sem |
| Due diligence M&A repository | OpenContracts + Claude MCP | MIT | 3-4 sem |
| Revisión de contratos de alto volumen | lavern + customización agentes | Apache-2.0 | 4-6 sem |
| Gestión operativa bufete | OpenLawOffice + capa AI | Apache-2.0 | 6-8 sem |
| Sector regulado (gobierno/banca) | ArkCase CE + AI layer | Apache-2.0 | 8-12 sem |
| LATAM acceso a justicia masivo | Enter-style + OpenContracts | MIT | 10-16 sem |

---
*Actualizado automáticamente por el pipeline de ingest.*
