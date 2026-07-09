# 🏗️ Repos fundacionales — Healthcare AI

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-09 (v5 — Medplum, OpenEMR 8.0, OpenMRS, HAPI FHIR, OpenAPS, GNU Health, Bahmni, OHIF, care_fe)

## Plataformas y frameworks base

| Repo | Licencia | Descripción | ¿Base para AI? |
|------|----------|-------------|----------------|
| [medplum/medplum](https://github.com/medplum/medplum) | Apache-2.0 | Plataforma healthcare developer full-stack TypeScript. FHIR R4/R5 nativo, HIPAA+SOC2 out-of-box, React UI component library, "Bots" serverless (server-side logic sin infraestructura), subscriptions en tiempo real. Stack ideal para greenfield AI healthcare. | ✅ IDEAL — FHIR-native con Bots serverless para AI logic |
| [openemr/openemr](https://github.com/openemr/openemr) | GPL-2.0 | EHR/EMP más popular del mundo open source. PHP + MySQL. Versión 8.0.0 (Mar 2026): ONC Ambulatory EHR Certification, US Core 8.0, USCDI v5, SMART on FHIR v2.2.0. 1,000+ implementaciones globales. | ✅ Sólido — FHIR completo, pero PHP stack legacy |
| [openmrs/openmrs-core](https://github.com/openmrs/openmrs-core) | MPL-2.0 | EHR open source líder para entornos de recursos limitados. Java, FHIR R4 nativo. Usado en 42+ países, África/Asia/LATAM. Digital Public Good. REST API + FHIR para extensiones AI. | ✅ Ideal para LATAM y recursos limitados |
| [hapifhir/hapi-fhir](https://github.com/hapifhir/hapi-fhir) | Apache-2.0 | La implementación Java de HL7 FHIR más completa. Servidor FHIR standalone que puedes desplegar como backend de datos. Base para SMART on FHIR, CDS Hooks, subscriptions. Estándar de facto en hospitales académicos. | ✅ Capa de datos — cualquier agente FHIR se construye sobre esto |
| [openaps/oref0](https://github.com/openaps/oref0) | MIT | OpenAPS — primer artificial pancreas system open source. CGM → algoritmo basal → insulin pump. 2,500+ pacientes T1D globalmente. Referencia para FDA AID (Automated Insulin Delivery) pathway. | ✅ Referencia en AI para dispositivos médicos IoT |
| [GNU Health](https://savannah.gnu.org/projects/health) | GPL-3.0 | Sistema hospitalario + EHR en Python (Tryton). Orientado a países en desarrollo y salud pública. Módulos: prescripción, laboratorio, maternidad, oncología. Activo en LATAM, África. | ✅ Opción para hospitales públicos LATAM |
| [Bahmni](https://github.com/bahmni/bahmni-core) | AGPL-3.0 | EHR distribuido para entornos de bajos recursos, basado en OpenMRS + OpenERP. 1M+ pacientes/día. Dashboard de paciente integrado, laboratorio, farmacia. Activo en Asia y África. | ✅ Solución hospitalaria completa; API REST disponible |
| [OHIF/Viewers](https://github.com/OHIF/Viewers) | MIT | Open Health Imaging Foundation — viewer DICOM web basado en React. Extensible con plugins AI (detección de nódulos, segmentación, predicción). Estándar de facto para radiología web. | ✅ Base para proyectos de radiología AI |
| [ohcnetwork/care_fe](https://github.com/ohcnetwork/care_fe) | MIT | Care — Digital Public Good (DPG) para delivery de salud acelerado. React frontend, API FHIR. Open Healthcare Network activo con adoption en India y expandiéndose a LATAM. | ✅ Full-stack moderno, bien mantenido |
| [epfLLM/meditron](https://github.com/epfLLM/meditron) | Apache-2.0 | EPFL — Suite de LLMs médicos open source. Meditron-7B y 70B adaptados de Llama-2, pretraining en 48B tokens médicos (PubMed, guías clínicas, datos generales). Referencia en benchmarks MedQA, MedMCQA, PubMedQA. Fine-tunable para dominios específicos. | ✅ LLM médico base para fine-tuning o RAG |
| [maziyarpanahi/openmed](https://github.com/maziyarpanahi/openmed) | Apache-2.0 | Local-first healthcare AI: NER clínica + de-identificación HIPAA PII 100% on-device. 1,000+ modelos médicos, 12 idiomas, Apple MLX + Python. Zero cloud, zero PHI exposure. | ✅ Privacidad total — ideal para HIPAA/LGPD estricto |
| [biocypher/biochatter](https://github.com/biocypher/biochatter) | MIT | Framework LLM para biomedicina: knowledge graphs, RAG, model chaining, soporta modelos locales Ollama. Base para chatbots médicos con privacidad y trazabilidad. | ✅ Knowledge graph + LLM en biomedical research |

---

## Stack de referencia por caso de uso

### Stack LATAM — Hospital público con datos sensibles
```
GNU Health o OpenMRS (EHR local)
     + HAPI FHIR (servidor FHIR standalone)  
     + medspaCy + cTAKES (NLP notas clínicas en español)
     + openmed local-first (NER + de-id sin cloud)
     + Ollama + Meditron (LLM médico on-premise)
     + FHIR MCP Server (interfaz agente ↔ datos)
```

### Stack US — Hospital mid-market, cloud-hybrid
```
Medplum (plataforma FHIR TypeScript)
     + TEFCA QHINs (interoperabilidad nacional)
     + NemoClaw (PHI routing: local vs cloud)
     + OpenClaw-Medical-Skills (869 skills)
     + MedRAX (radiología) / medspaCy (NLP)
     + Claude (reasoning no-PHI) + Meditron local (PHI analysis)
```

### Stack Greenfield — Startup digital health
```
Medplum (FHIR API + Bots + UI components)
     + fhir-mcp-server (interfaz LLM ↔ FHIR)
     + Meditron o GPT-4o (LLM médico)
     + LangGraph (orquestación agentes)
     + OpenAPS pattern (si hay devices)
```

### Stack Drug Discovery — Biotech/Pharma
```
BioChatter + BioCypher (knowledge graph + LLM)
     + BioNeMo NIM (NVIDIA drug discovery models)
     + awesome-drug-discovery tools (análisis molecular)
     + AutoResearch AI pattern (automatización research)
     + Claude / GPT-5 (síntesis de literatura)
```

---

## FHIR MCP Servers (bridge EHR ↔ AI)

| Repo | Licencia | Cuándo usar |
|------|----------|-------------|
| [the-momentum/fhir-mcp-server](https://github.com/the-momentum/fhir-mcp-server) | MIT | Primer proyecto FHIR MCP; rápido, sin overhead empresarial |
| [wso2/fhir-mcp-server](https://github.com/wso2/fhir-mcp-server) | Apache-2.0 | Enterprise: expone cualquier FHIR API corporativa como MCP |
| [xSoVx/fhir-mcp](https://github.com/xSoVx/fhir-mcp) | MIT | PHI protection + audit log — hospitales con compliance estricto |
| [AWS HealthLake MCP](https://awslabs.github.io/mcp/servers/healthlake-mcp-server) | Apache-2.0 | Cloud AWS: HealthLake como backend FHIR cloud |

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
