# 🗺️ Mapa de mercado — Enterprise AI

> Players, oportunidades, posicionamiento. Foco global + LATAM.
> Última actualización: 2026-07-05

## Tamaño de mercado

| Segmento | 2025 | 2026 | 2030/2033 | CAGR |
|----------|------|------|-----------|------|
| AI Agents global | $7.8B | $10.9B | $52.6B (2030) | 46.3% |
| Enterprise Agentic AI | $5.9B | $7.5B | — | 27.3% |
| Agentic AI total | $7.3B | $9.1B | $139.2B (2034) | 40.5% |
| Enterprise AI total | — | — | ~$300B (2035) | 35%+ |

**Adopción actual (2026)**:
- 31% de enterprises ejecutan al menos 1 agente AI en producción
- Banking/insurance lidera: 47% adoption rate
- 40% de enterprise apps tendrán AI agents embebidos a fin de 2026 (Gartner)
- Enterprises que pasaron 2 años con AI propietario están volviendo a open source

## Players globales — Proveedores de plataforma

| Empresa | Tipo | Fortaleza enterprise | Debilidad |
|---------|------|----------------------|-----------|
| **Microsoft** | Plataforma + SDK | Azure OpenAI, Semantic Kernel, Copilot Studio. C#/Java first. | Lock-in a Azure, caro a escala |
| **Salesforce** | CRM + AI | Einstein AI embebido, Agentforce. 150k+ clientes. | Muy caro, código cerrado |
| **ServiceNow** | ITSM + AI | "AI control tower for business". Partnership OpenAI. | Solo ITSM/HR, nicho |
| **SAP** | ERP + AI | Joule AI embebido en S/4HANA. 300M usuarios. | Migración compleja, caro |
| **IBM** | AI + Consulting | Watsonx enterprise. Gobernanza, compliance. | Lento, percibido como legacy |
| **Google** | AI + GWS | Gemini en Google Workspace. ADK open source. Vertex AI. | Compite con clientes |
| **AWS** | Cloud + Bedrock | Bedrock Agents managed. Multi-model. Auto-scaling. | Vendor lock-in severo |
| **Oracle** | DB + Cloud | AI integrado en Fusion Cloud. RRHH, finanzas fuertes. | Muy caro, legacy |

## Players open source — Ecosistema

| Proyecto | Empresa detrás | Modelo | Fortaleza |
|----------|----------------|--------|-----------|
| LangChain / LangGraph | LangChain Inc. | Open core | Estándar de facto para LLM apps |
| CrewAI | CrewAI Inc. | Open core | Multi-agente más adoptado |
| Dify | LangGenius | Apache 2.0 + cloud | Plataforma visual más popular |
| n8n | n8n GmbH | Sustainable Use + cloud | iPaaS con AI |
| Odoo | Odoo SA | LGPL + enterprise | ERP más popular |
| ERPNext / Frappe | Frappe Technologies | GPL + cloud | ERP India/LATAM |
| OpenMetadata | Collate | Apache 2.0 + cloud | Gobernanza datos |

## Oportunidades AI en LATAM

### Mercado
- LATAM digital transformation: $40B+ en software enterprise para 2027
- Brasil, México, Colombia: los 3 mercados enterprise más grandes
- 65% de enterprises LATAM sin solución AI en producción (oportunidad)
- Preferencia por self-hosted / data sovereignty (regulación LGPD Brasil, etc.)

### Verticales con mayor demanda en LATAM

| Vertical | Oportunidad | Plataforma base |
|----------|-------------|-----------------|
| Manufactura / Industria | Automatización de órdenes, calidad, mantenimiento predictivo | ERPNext + LangGraph |
| Banca / Finanzas | AML, KYC agéntico, atención al cliente | LangGraph + Dify |
| Retail / Distribución | Gestión de inventario inteligente, pricing dinámico | Odoo + CrewAI |
| Servicios profesionales | Knowledge management, generación de propuestas | LangGraph + OpenMetadata |
| Gobierno / Sector público | Procesamiento documental, atención ciudadana | n8n + Dify (on-premise) |

### Diferenciadores para Globant en LATAM
1. **Self-hosted AI** sobre Odoo/ERPNext (cumplimiento LGPD/datos locales)
2. **Español nativo**: agentes que hablan castellano y portugués sin degradación de calidad
3. **Integración con sistemas legados**: SAP legacy, sistemas gubernamentales, bancarios core
4. **Precio**: open source base = 60-80% menos que Salesforce/SAP AI Premium

## Posicionamiento Globant

### Fortaleza competitiva
- **Implementadores** de Odoo, ERPNext, Frappe con AI layer encima
- **Integradores** entre sistemas legacy (SAP, Oracle) y capa agéntica nueva
- **Constructores** de agentes verticales específicos (manufactura, banca LATAM)

### Propuesta de valor central
> "Transformamos tu ERP/CRM actual en una plataforma agéntica en 8-12 semanas, sin reemplazar tu inversión existente"

### Stack recomendado para propuestas
```
Base: Odoo (LGPL) o ERPNext (GPL) — sin costo de licencia
IA:   LangGraph + Dify (Apache) — self-hosted
LLM:  Claude API (Anthropic) o Azure OpenAI — según requisitos de datos
Infra: Docker + Kubernetes on-premise o cloud LATAM
```

### Competidores a desplazar
- **Tier 1**: Salesforce Agentforce (~$150/user/mes) → Odoo+CrewAI (~$0 licencia + impl)
- **Tier 2**: SAP Joule (incluido en S/4HANA Premium) → integración LangGraph sobre SAP legacy
- **Tier 3**: Microsoft Copilot Studio ($200/mes/tenant) → Semantic Kernel self-hosted

---
*Fuentes: Grand View Research, Fortune Business Insights, Accelirate 2026, Gartner, kai-waehner.de*
