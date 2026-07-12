# 🏭 Verticales de partida — Legal Services

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-12

## Plataformas recomendadas

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| **OpenContracts** | MIT | [github.com/Open-Source-Legal/OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | Python/Django + React + PostgreSQL + Qdrant | Document intelligence platform — contract repository con anotación, extracción, RAG y MCP nativo |
| **Docassemble** | MIT | [github.com/jhpyle/docassemble](https://github.com/jhpyle/docassemble) | Python + YAML + Docker | Guided interviews + document assembly — intake legal, wills, NDAs, peticiones judiciales |
| **ContraxSuite** | AGPLv3* | [github.com/LexPredict/lexpredict-contraxsuite](https://github.com/LexPredict/lexpredict-contraxsuite) | Python/Django + Celery + Elasticsearch | Contract analytics — extracción de cláusulas, clustering, exportación estructurada |
| **OpenLawOffice** | LGPL | [github.com/NodineLegal/OpenLawOffice](https://github.com/NodineLegal/OpenLawOffice) | .NET + SQL Server | Case management — archivos de casos, facturación, tareas, calendarios para firmas legales |
| **J-Lawyer** | AGPL | [j-lawyer.org](https://www.j-lawyer.org/) | Java + MySQL | Gestión de firma legal completa (Alemania). Amplia comunidad. Base para customización EU. |
| **SuiteCRM** | AGPL | [suitecrm.com](https://suitecrm.com) | PHP + MySQL | CRM de base — casos, contactos, pipeline de clientes para despachos. SuiteASSURED para compliance. |
| **lavern** | Apache-2.0 | [github.com/AnttiHero/lavern](https://github.com/AnttiHero/lavern) | Python + agentes Claude/Mistral/Ollama | Multi-agent legal review — documentos, contratos, due diligence con debate protocol |

*AGPLv3: requiere due diligence sobre licencia antes de desplegar para cliente. Contactar LexPredict para licencia comercial.

---

## Cómo customizar cada plataforma con AI

### OpenContracts (Recomendado para nuevos proyectos)

OpenContracts es la plataforma más AI-ready del ecosistema: ya tiene MCP integrado, RAG sobre corpus, y API completa.

```
1. Deploy self-hosted (Docker Compose — ver README)
2. Cargar corpus de contratos del cliente (PDF/DOCX via API)
3. Conectar Claude Desktop / cursor via MCP server built-in
4. Configurar annotation schema por tipo de contrato
5. Agregar agentes especializados (lavern-style) para review workflows
6. Exponer API para integración con sistemas ERP/CRM del cliente
```

Tiempo estimado: **2-3 semanas** para MVP funcional con corpus real.

### Docassemble (Para automatización de documentos y acceso a justicia)

```
1. Deploy en Docker (imagen oficial disponible)
2. Crear entrevistas YAML para el flujo específico (ej: generación de NDA)
3. Agregar endpoint AI: llamada a Claude API para análisis o redacción
4. Wrappear con lógica condicional en Python
5. Conectar a firma electrónica (HelloSign API) o DMS del cliente
6. Deploy en servidor del cliente o cloud soberano
```

Tiempo estimado: **1-2 semanas** por flujo de documento.

### ContraxSuite (Para contract analytics sobre corpus existente)

```
1. Deploy vía Docker Compose
2. Importar contratos existentes del cliente (bulk upload)
3. Configurar field extractors con LexNLP (+ fine-tuning si hace falta)
4. Agregar análisis LLM: campo "contract summary" con Claude
5. Exportar resultados a Excel/Power BI para el cliente
6. Considerar licencia comercial si el producto va a producción
```

Tiempo estimado: **3-4 semanas** para pipeline completo.

---

## Matriz de selección

| Necesidad del cliente | Plataforma recomendada | Alternativa |
|----------------------|----------------------|-------------|
| Contract repository + AI queries | OpenContracts | ContraxSuite |
| Automatizar generación de documentos | Docassemble | OpenContracts |
| Due diligence / M&A document review | lavern | OpenContracts |
| Gestión de casos para firma legal | OpenLawOffice | SuiteCRM |
| CRM para despacho de abogados | SuiteCRM | OpenLawOffice |
| NLP/extracción de contratos (interno) | LexNLP + Blackstone | ContraxSuite |
| Legal AI assistant conversacional | lavern + Claude | legal-mcp + Claude |

---

## Ecosistema complementario (no open source, pero de referencia)

| Plataforma | Tipo | Relevancia |
|------------|------|------------|
| [Harvey AI](https://harvey.ai) | Propietario | $11B valuation, jun 2026. AI para firmas legales grandes. Referencia de lo que el mercado espera. |
| [Clio](https://clio.com) | Propietario | $5B valuation. Practice management + AI. 150k firmas. API disponible para integración. |
| [Ironclad](https://ironcladapp.com) | Propietario | CLM (Contract Lifecycle Management) — benchmark para enterprise. |
| [Legora](https://legora.com) | Propietario | $5.55B valuation. "2026 es el año de los agentes en legal AI" (su propio blog). |
| [Robin AI](https://robinai.com) | Propietario | Contract drafting + review. UK-based. Competidor directo de Harvey en EMEA. |
