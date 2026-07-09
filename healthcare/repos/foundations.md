# 🏗️ Repos fundacionales — Healthcare

> Bases sobre las cuales construir. Licencia abierta, comunidad activa, producción-ready.
> Última actualización: 2026-07-09 (v4 — medplum Apache-2.0 FHIR platform, OpenAPS MIT diabetes)

## Plataformas y frameworks base

| Repo | Licencia | Descripción | Base para AI |
|------|----------|-------------|-------------|
| [openmrs/openmrs-core](https://github.com/openmrs/openmrs-core) | MPL-2.0 | Sistema de registros médicos open source de referencia mundial. REST + FHIR APIs nativas, modular, desplegado en 50+ países. Base para Bahmni y decenas de implementaciones nacionales. | FHIR server listo para conectar agentes via MCP |
| [openemr/openemr](https://github.com/openemr/openemr) | GPL-3.0 | EHR ambulatorio US más popular open source (v8.0.0, Mar 2026). ONC certified, US Core 8.0, USCDI v5, SMART on FHIR v2.2.0, bulk export FHIR. PHP + JavaScript. | SMART on FHIR para apps AI; API FHIR completa |
| [Bahmni/bahmni-core](https://github.com/Bahmni/bahmni-core) | LGPL-3.0 | Hospital Management System completo sobre OpenMRS + Odoo + OpenELIS. Award-winning para entornos de bajos recursos, adoptado en 50+ países. Incluye HIS, farmacia, laboratorio, billing. | Stack completo para hospital; layer AI sobre cada módulo |
| [gnuhealth/gnuhealth](https://www.gnuhealth.org/) | GPL-3.0 | GNU Health: EMR + Hospital Management + Health Information System en Python/GTK. Sistema OMS-recomendado para países en desarrollo. | Layer agéntico sobre módulos de salud pública |
| [medspacy/medspacy](https://github.com/medspacy/medspacy) | MIT | NLP clínico sobre spaCy. Componentes: negation, temporalidad, sección EHR, UMLS entity linking. Desarrollado con Mayo Clinic. Punto de entrada para extraer datos de EHR no-estructurados. | Extracción información clínica → knowledge graph |
| [apache/ctakes](https://github.com/apache/ctakes) | Apache-2.0 | Clinical Text Analysis & Knowledge Extraction System. UMLS/SNOMED/ICD-10, pipeline UIMA, NER clínica, assertion. Estándar en investigación académica y hospitales de alto nivel. | Pipeline de información clínica para RAG/CDSS |
| [TorchIO-project/torchio](https://github.com/TorchIO-project/torchio) | Apache-2.0 | Librería PyTorch para imágenes médicas 3D: MRI, CT, PET. Transforms, augmentation, datasets, samplers. Citada en 500+ papers científicos. | Foundation para modelos AI de diagnóstico por imagen |
| [hapifhir/hapi-fhir](https://github.com/hapifhir/hapi-fhir) | Apache-2.0 | La implementación FHIR en Java más completa y madura: FHIR server, validation, client library. Base de Microsoft Azure Health Data Services. | FHIR server para conectar cualquier EHR con agentes AI |
| [microsoft/fhir-server](https://github.com/microsoft/fhir-server) | MIT | FHIR server de Microsoft: Azure-native, high-performance, soporte para FHIR R4 y R4B, integrable con HealthLake. Opción enterprise para clientes Azure. | Backend FHIR enterprise para despliegues hospitalarios |
| [biocypher/biochatter](https://github.com/biocypher/biochatter) | MIT | Framework conversacional biomédico con LLMs: RAG sobre knowledge graphs, model chaining, benchmarking. Soporta Neo4j, ontologías biomédicas. Privacidad con Ollama. | Conversational AI sobre datos biomédicos estructurados |
| [beda-software/fhir-emr](https://github.com/beda-software/fhir-emr) | MIT | EMR basado en FHIR como data model nativo. HL7 FHIR + SDC IG para gestión de formularios. Stack MIT ideal para proyectos Globant sin restricciones. | Base FHIR-native para EMR customizable con AI |
| [bowang-lab/MedRAX](https://github.com/bowang-lab/MedRAX) | Apache-2.0 | Medical Reasoning Agent for Chest X-ray (ICML 2025). Framework de agentes para análisis radiológico con 2,500 benchmarks. Base para soluciones de diagnóstico por imagen. | Radiología AI con agentes especializados |
| [medplum/medplum](https://github.com/medplum/medplum) | Apache-2.0 | Plataforma healthcare developer full-stack TypeScript (React + Node.js). FHIR-native, HIPAA+SOC2 out-of-box, Bots para server-side logic, UI Component Library, Medplum App para gestión de datos. Y Combinator alum. La base más moderna para construir apps AI clínicas sobre FHIR sin partir de cero. | Healthcare app development: EHR greenfield, telehealth, patient portals, AI clinical workflows |
| [openaps/oref0](https://github.com/openaps/oref0) | MIT | OpenAPS — Open Artificial Pancreas System reference implementation. CGM data → closed-loop insulin delivery algorithm → pump commands. 2,500+ pacientes T1D globalmente. Precedente para FDA Automated Insulin Delivery (AID) pathway. Dataset: 46k+ days, 10M+ CGM points (OpenAPS Data Commons). | Closed-loop medical device AI; automated therapy management; regulatory precedent AID |

---

## Por qué estos repos son la base

```
Capa 1 — EHR/HIS (fuente de datos)
  OpenMRS / OpenEMR / Bahmni / GNU Health
        ↓ REST + FHIR API
Capa 2 — Interoperabilidad AI
  HAPI FHIR / Microsoft FHIR Server
        ↓ MCP Server
Capa 3 — Agentes AI
  openmed-agent / BioChatter / OpenClaw-Medical-Skills
        ↓ NLP / Imágenes
Capa 4 — Procesamiento especializado
  medspaCy + cTAKES (texto clínico)
  torchio + hi-ml (imágenes médicas)
```

## Stack mínimo viable para proyecto healthcare AI

### Opción A: Greenfield (nuevo sistema, TypeScript)
1. **Platform Base**: Medplum (Apache-2.0) — FHIR-native, HIPAA+SOC2, Bots para logic
2. **FHIR MCP**: fhir-mcp-server (Momentum MIT) — conector LLM↔FHIR
3. **Agente principal**: openmed-agent + Claude via MCP
4. **NLP clínico**: medspaCy (notas no estructuradas)
5. **Enterprise security**: NemoClaw (PHI local) si el cliente es hospital US grande

### Opción B: Integración sobre EHR existente
1. **EHR Base**: OpenEMR (US/LATAM ambulatorio) o OpenMRS (LATAM hospital) o Bahmni (low-resource)
2. **FHIR Layer**: HAPI FHIR o fhir-mcp-server (Momentum) — interoperabilidad AI↔EHR
3. **NLP clínico**: medspaCy para notas; cTAKES para codificación SNOMED/ICD
4. **Agente principal**: openmed-agent (workflows clínicos) o BioChatter (conocimiento biomédico)
5. **Imágenes médicas**: MedRAX (radiología CXR) + torchio (3D MRI/CT)
6. **UI**: Ottehr (React moderno) o módulo web OpenMRS / Medplum App

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
