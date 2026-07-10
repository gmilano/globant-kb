# 🏭 Verticales de partida — Healthcare

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional (EHR, HIS, LIS, imaging), añadir capa agéntica arriba.
> Última actualización: 2026-07-10 (v6 — Ottehr AI-native EHR, open source scribes, selección de plataforma actualizada)

## Plataformas EHR / HIS

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| **Ottehr** | MIT | [masslight/ottehr](https://github.com/masslight/ottehr) | React/Node.js/FHIR | **🆕 v6 — AI-native desde el día 1**: AI HPI chatbot + ambient scribe + AI coding assistant incluidos. FHIR R4/R5, ONC/USCDI. Urgent care. EHR development 95% más rápido que custom. |
| Medplum | Apache-2.0 | [medplum.com](https://github.com/medplum/medplum) | TypeScript (React + Node.js) | Greenfield AI healthcare — FHIR-native, HIPAA+SOC2, Bots serverless. "Vercel para healthcare." Más maduro; sin AI built-in. |
| OpenEMR | GPL-2.0 | [openemr.net](https://github.com/openemr/openemr) | PHP + MySQL | EHR más popular open source; v8.0.0 Mar 2026: ONC Certified, USCDI v5, SMART on FHIR v2.2.0. |
| OpenMRS | MPL-2.0 | [openmrs.org](https://github.com/openmrs/openmrs-core) | Java + Spring | EHR para entornos de bajos recursos; 42+ países; FHIR R4 nativo; Digital Public Good. |
| GNU Health | GPL-3.0 | [health.gnu.org](https://health.gnu.org) | Python (Tryton) | Hospitales públicos en LATAM, África. Módulos: lab, farmacia, maternidad, oncología. |
| Bahmni | AGPL-3.0 | [bahmni.org](https://github.com/bahmni/bahmni-core) | Java + OpenMRS + ERPNext | EHR distribuido para recursos limitados: 1M+ pacientes/día, laboratorio integrado, farmacia. |
| Care (OHCNetwork) | MIT | [ohcnetwork](https://github.com/ohcnetwork/care_fe) | React + Django | Digital Public Good; aceleración de delivery de salud; FHIR API; activo en India + LATAM. |

## 🆕 Ambient Scribes Open Source (v6 — Jul 2026)

> El ecosistema de scribes propietarios (Nuance DAX $150M ARR, Abridge, Nabla, Suki) enfrenta presión de alternativas open source maduras.

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| scribeHC | MIT | [trevorpfiz/scribeHC](https://github.com/trevorpfiz/scribeHC) | Expo + Next.js + FastAPI | Mobile scribe + dashboard web. Graba consulta → SOAP note. Customizable para LATAM ES/PT. |
| OpenScribe | MIT | [Open-scribe/OpenScribe](https://github.com/Open-scribe/OpenScribe) | Full-stack | Control total de datos del paciente. Sin vendor lock-in. Para hospitales con política de datos estricta. |
| AI-Medical-Scribe | MIT | [hutchpd](https://github.com/hutchpd/AI-Medical-Scribe) | Browser / Chrome AI | 100% local, sin backend, sin cloud. PHI nunca sale del dispositivo. Consultorio individual. |
| FlowMemo | MIT | [aouabfeddali/FlowMemo](https://github.com/aouabfeddali/FlowMemo) | Lightweight | MVP rápido de ambient scribe para evaluar ROI antes de solución completa. |

## Plataformas de Imágenes Médicas

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| OHIF Viewers | MIT | [ohif.org](https://github.com/OHIF/Viewers) | React + DICOMweb | Viewer DICOM web extensible con plugins AI: segmentación, detección de nódulos, predicción. |
| Orthanc | GPL-3.0 | [orthanc-server.com](https://github.com/jodogne/OrthancMirror) | C++ | Servidor DICOM lightweight, API REST, plugins extensibles. Almacenamiento + retrieval imágenes. |
| Horos / 3D Slicer | BSD-3 | [slicer.org](https://github.com/Slicer/Slicer) | C++ + Python | Análisis avanzado de imágenes médicas 3D con extensiones de ML/AI. Investigación + clínica. |

## Plataformas Especializadas

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| OpenAPS/oref0 | MIT | [openaps.org](https://github.com/openaps/oref0) | Node.js + Python | Artificial pancreas: closed-loop insulin delivery. 2,500+ pacientes T1D. Referencia dispositivos médicos AI. |
| HAPI FHIR Server | Apache-2.0 | [hapifhir.io](https://github.com/hapifhir/hapi-fhir) | Java | Servidor FHIR standalone; base para cualquier proyecto que necesite backend FHIR estándar. |
| i2b2 | Apache-2.0 | [i2b2.org](https://github.com/i2b2) | Java | Warehouse de investigación clínica; 200+ sites globales; permite federated analytics con AI. |
| OpenELIS | CDDL-1.0 | [openelisci.org](https://github.com/I-TECH-UW/OpenELIS-Global-2) | Java | Lab Information System (LIS) para África y LATAM; integrable con FHIR y AI para alertas. |

## Cómo customizar con AI — Guía de implementación

### Nivel 1 — API REST / FHIR + Agente externo (más rápido, 2-4 semanas)
```
EHR Existente (OpenEMR/OpenMRS)
     ↓ FHIR API
FHIR MCP Server (the-momentum o wso2)
     ↓ MCP tools
Claude / GPT-5 (agente via Claude Desktop/Claude Code)
     ↓ structured output
Resultado clínico auditado antes de escribir al EHR
```

### Nivel 2 — Bots Serverless en Medplum (aplicaciones nuevas)
```
Medplum FHIR Platform
     ↓ Bot triggers (subscriptions en tiempo real)
Bot serverless (TypeScript / Python)
     ↓ Claude API (clinical reasoning)
Resultado → escrito en FHIR Resource → notificación → UI
```

### Nivel 3 — Agentes Autónomos con NemoClaw (enterprise PHI)
```
PHI input (notas clínicas, labs, imágenes)
     ↓ NemoClaw privacy router
Nemotron local (análisis PHI, de-identificación)
     ↓ contexto anonimizado
Claude enterprise (reasoning complejo)
     ↓ respuesta
Agente clínico → acción → Audit log FHIR AuditEvent
```

### Nivel 4 — Sistema FHIR Standalone (máximo control)
```
HAPI FHIR Server (backend de datos)
     + Medplum UI o Care_fe (frontend)
     + MedspaCy + cTAKES (NLP notas en español/inglés)
     + Meditron local (LLM médico on-premise)
     + fhir-mcp-server (bridge agente ↔ FHIR)
     + LangGraph (orquestación workflows clínicos)
```

## Guía de selección de plataforma base

| Escenario | Plataforma recomendada |
|-----------|----------------------|
| Startup digital health, urgent care, AI primero | **Ottehr** (MIT, AI HPI + scribe + coder built-in) |
| Startup digital health, TypeScript, greenfield sin AI built-in | Medplum |
| Hospital US ya usando Open Source EHR | OpenEMR 8.0 + FHIR |
| Hospital LATAM/África con recursos limitados | OpenMRS + Bahmni |
| Hospital público con datos muy sensibles | GNU Health + openmed local |
| Plataforma de radiología AI | OHIF + MedRAX + DICOM server |
| Proyecto de investigación clínica | HAPI FHIR + i2b2 + BioChatter |
| App dispositivos médicos (T1D, cardio) | OpenAPS pattern + FHIR write |
| Digital Public Good + escalabilidad global | Care (OHCNetwork) |
| Ambient scribe open source (mobile) | scribeHC (Expo + FastAPI + Claude) |
| Ambient scribe hospital con privacidad estricta | OpenScribe o AI-Medical-Scribe (browser-only) |
| Clinical trials / pharma agentica | IQVIA.ai pattern: sub-agentes especializados + NVIDIA NIM |

---
