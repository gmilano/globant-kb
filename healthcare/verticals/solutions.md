# 🏭 Verticales de partida — Healthcare

> Plataformas verticales existentes customizables con AI. Modelo: partir de algo funcional y añadir capa agéntica.
> Última actualización: 2026-07-07 (v2 — investigación profunda)

## Plataformas recomendadas

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| **OpenMRS** | MPL-2.0 | [github.com/openmrs](https://github.com/openmrs/openmrs-core) | Java + REST + FHIR R4 | EHR modular para clínicas y hospitales. 50+ países, incluyendo implementaciones nacionales LATAM. APIs FHIR nativas para conectar agentes AI. |
| **OpenEMR** | GPL-3.0 | [github.com/openemr/openemr](https://github.com/openemr/openemr) | PHP + JS + MySQL | EHR ambulatorio US más popular open source. v8.0.0 (Mar 2026): ONC certified, SMART on FHIR v2.2.0, USCDI v5. Ideal para clínicas en US/LATAM que necesitan certificación. |
| **Bahmni** | Apache-2.0 / LGPL | [bahmni.org](https://www.bahmni.org) / [github.com/Bahmni](https://github.com/Bahmni) | OpenMRS + Odoo + OpenELIS + React | Hospital Management System completo para entornos de bajos recursos. Incluye HIS, farmacia, laboratorio, billing. 50+ países. Premio Digital Public Good. Adoptado por MSF/OPS/gobiernos. |
| **GNU Health** | GPL-3.0 | [gnuhealth.org](https://www.gnuhealth.org) | Python + GNU Tryton | EMR + HIS + Health Information System. Recomendado por OMS para países en desarrollo. Módulos de salud pública, epidemiología, farmacia, control de vectores. |
| **Ottehr** | MIT | [github.com/masslight/ottehr](https://github.com/masslight/ottehr) | React + Node.js + FHIR | EMR moderno open source construido nativo con FHIR. Diseñado para urgencias y telemedicina. Stack JS moderno, fácil de customizar. |
| **care_fe (OHC Network)** | MIT | [github.com/ohcnetwork/care_fe](https://github.com/ohcnetwork/care_fe) | React + REST | Digital Public Good para entrega acelerada de atención. UI moderna sobre OpenMRS. Adoptado en India, expandiéndose globalmente. 611★ activos. |
| **HAPI FHIR Server** | Apache-2.0 | [github.com/hapifhir/hapi-fhir](https://github.com/hapifhir/hapi-fhir) | Java + Spring Boot | La implementación FHIR más completa: servidor, cliente, validador. Base de Azure Health Data Services. Estándar para interoperabilidad AI↔EHR. |
| **Microsoft FHIR Server** | MIT | [github.com/microsoft/fhir-server](https://github.com/microsoft/fhir-server) | C# + Azure | FHIR server enterprise de Microsoft. FHIR R4 + R4B, high-performance, Azure native. Integrable con HealthLake MCP. Para clientes enterprise en Azure. |

---

## Cómo customizar con AI — Receta estándar

```
1. Fork del repo base (OpenMRS / OpenEMR / Bahmni)
2. Exponer datos vía FHIR R4 API (built-in en todos)
3. Configurar fhir-mcp-server (Momentum) como conector
4. Conectar agente (openmed-agent / Claude + MCP)
5. Añadir NLP clínico sobre notas (medspaCy + cTAKES)
6. Desplegar UI conversacional (React) sobre el sistema base
```

## Mapa de selección por contexto

| Contexto | Plataforma recomendada |
|----------|----------------------|
| Clínica ambulatoria US (certificación ONC requerida) | OpenEMR 8.0.0 |
| Hospital LATAM / bajo recurso / ONG | Bahmni (OpenMRS + Odoo + OpenELIS) |
| Red nacional de salud / epidemiología | OpenMRS + GNU Health |
| Urgencias / telemedicina / startup | Ottehr |
| Interoperabilidad FHIR enterprise | HAPI FHIR + Microsoft FHIR Server |
| Plataforma AI nativa (greenfield) | Ottehr + fhir-mcp-server + openmed-agent |

## Módulos AI más demandados sobre estas plataformas

1. **Ambient Scribe**: transcripción de consulta → nota SOAP automática (Whisper + LLM + FHIR write)
2. **Prior Authorization Agent**: reglas aseguradoras → decisión automática (openmed-agent + reglas ICD/CPT)
3. **Clinical Decision Support**: diagnóstico diferencial + drug interactions (LangGraph + PubMed)
4. **Predictive Risk**: readmission, sepsis early warning (XGBoost + LangGraph + FHIR)
5. **NLP sobre EHR histórico**: extracción entidades clínicas → knowledge graph (medspaCy + BioCypher)
