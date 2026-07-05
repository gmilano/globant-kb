# 📡 Tendencias — enterprise AI (julio 2026)

> Tendencias tecnológicas y de mercado que definen el landscape enterprise AI.
> Última actualización: 2026-07-05

## 1. La "tercera capa de automatización": agentes sobre RPA y BPM

2026 es el año en que el agente AI dejó de ser un experimento y se convirtió en la **tercera capa** de la plataforma de automatización enterprise (junto a RPA y BPM):

```
Capa 1 — RPA        : Bots para UI scraping, automatización de pantallas
Capa 2 — BPM/iPaaS  : Orquestación de procesos (n8n, MuleSoft, Workato)
Capa 3 — AI Agents  : Razonamiento, toma de decisiones, manejo de excepciones
```

**Impacto**: Empresas no reemplazan RPA — lo envuelven. Los agentes AI manejan las excepciones que el RPA no puede, reduciendo intervención humana de 30% a <5%.

## 2. Agentic Automation end-to-end

Las empresas ya no automatizan tareas discretas sino **procesos completos end-to-end**:
- Lead entra → agente califica → genera propuesta → actualiza CRM → programa follow-up
- Factura llega → agente extrae datos → valida contra PO → aprueba/rechaza → contabiliza
- Ticket de soporte entra → agente diagnostica → resuelve o escala → documenta solución

**Drivers**: Presión de productividad, costos operacionales, ventaja competitiva.

## 3. MCP (Model Context Protocol) como estándar de integración

El protocolo MCP de Anthropic está convirtiéndose en el USB-C de las integraciones AI enterprise:

- **Servidores MCP existentes**: ERPNext, 1C:Enterprise, Salesforce, ServiceNow, SAP (community), GitHub, Jira, Confluence
- **Adopción**: Cada plataforma enterprise mayor tendrá servidor MCP oficial en H2 2026
- **Patrón emergente**: `LLM ←→ MCP ←→ Sistema enterprise` reemplaza integraciones custom

```
Claude / GPT-4 / Llama
        ↕  MCP
[ERPNext] [SAP] [Salesforce] [ServiceNow] [GitHub]
```

## 4. Visual builders dominan la adopción masiva

Las 3 herramientas más estrelladas en AI enterprise son builders visuales:
- Dify: 138k★ (Apache 2.0)
- Langflow: 60k★ (MIT)
- Flowise: 40k★ (Apache 2.0)

**Por qué**: Reducen el tiempo de prototipado de semanas a horas. Permiten que analistas de negocio participen en el diseño de agentes. El código Python sigue siendo el estándar para producción.

## 5. Open source gana sobre propietario para infraestructura

> "Enterprises que pasaron 2 años en pilotos de AI propietaria están volviendo a open source porque las herramientas cerradas no pueden conectarse a sus sistemas reales."

**Motores del cambio**:
- Vendor lock-in inaceptable para sistemas core
- Cumplimiento de datos (LGPD, GDPR) — self-hosted obligatorio en sectores regulados
- Costo: $150-200/user/mes para Salesforce AI vs. $0 licencia + implementación
- Velocidad de customización: 4-6 semanas open source vs. 6-12 meses vendor

## 6. Human-in-the-loop como requisito enterprise

Los sistemas puramente autónomos generan resistencia. El patrón ganador combina:
- Agente propone → humano aprueba para decisiones de alto impacto
- Agente ejecuta → humano puede intervenir/pausar en cualquier momento
- Agente aprende de correcciones → mejora continua supervisada

**LangGraph** lo implementa nativamente con checkpoints y `interrupt()`.

## 7. Observabilidad y evaluación de agentes = nuevo NFR crítico

En 2025, el despliegue era el reto. En 2026, el reto es saber si el agente está **funcionando correctamente** en producción:
- **Langsmith** (LangChain) — trazabilidad de cadenas y agentes
- **Phoenix** (Arize) — evaluación de LLMs en producción
- **Helicone** — monitoreo de costos y latencia de LLM calls
- **Opik** (Comet) — evaluación end-to-end de RAG pipelines

## 8. RAG de segunda generación — más allá de la búsqueda vectorial

Los RAG simples (chunk → embed → search) son insuficientes para enterprise:
- **GraphRAG**: Microsoft Research — recuperación con grafos de conocimiento. Mejor para documentos relacionados.
- **HybridRAG**: Búsqueda vectorial + BM25 keyword. Más preciso en dominios técnicos.
- **Agentic RAG**: El agente decide qué recuperar, cuándo, con qué query. Self-corrects.
- **Multimodal RAG**: Documentos con tablas, imágenes, gráficos (esencial en manufactura, legal, medicina).

## 9. Gobernanza de datos como prerequisito para AI enterprise

Sin datos limpios y catalogados, los agentes dan respuestas incorrectas. Las empresas están invirtiendo en:
- **DataHub / OpenMetadata** para catalogar activos de datos
- **Great Expectations / Soda** para calidad de datos automatizada
- **Data lineage** visible para auditorías de AI

**Patrón**: OpenMetadata como "capa de contexto" que alimenta al agente con metadata de negocio.

## 10. Agentes especializados por dominio, orquestados por coordinador

El patrón multi-agente enterprise que funciona:

```
                    [Agente Coordinador (LangGraph)]
                   /           |            \
          [Agente ERP]  [Agente CRM]  [Agente RRHH]
          (Odoo tools)  (SuiteCRM API) (ERPNext HR)
```

Cada agente es experto en su dominio. El coordinador enruta, desambigua y consolida.

## Tendencias emergentes (H2 2026)

| Tendencia | Estado | Impacto esperado |
|-----------|--------|------------------|
| **Agents as microservices** — deploy de agentes como containers independientes | Early adoption | Alto — infraestructura estándar |
| **LLM local en enterprise** — Llama 4, Mistral on-prem para datos sensibles | Creciendo | Alto — LATAM regulación |
| **AI en ERP SaaS** — Odoo AI copilot, ERPNext AI | GA | Medio — complemento |
| **Agent evaluation standards** — benchmarks enterprise | Emergente | Alto — compras enterprise |
| **Multi-modal agents** — voz + imagen en flujos enterprise | Early | Medio — manufactura, retail |

---
*Fuentes: machinelearningmastery.com, prolifics.ai, kai-waehner.de, accelirate.com, informationweek.com, Gartner 2026*
