# 🏗️ Vertical Solutions — Healthcare

> Existing functional platforms customizable with AI. Model: start from something working, add an agentic layer on top.
> Last updated: 2026-07-12 (v10)

## Core EHR / Hospital Information Systems

| Platform | Repo | License | Stack | Deployment Context | AI Integration Path |
|----------|------|---------|-------|--------------------|---------------------|
| OpenEMR | [openemr/openemr](https://github.com/openemr/openemr) | GPL-2.0 | PHP/MySQL | Clinics, hospitals, 100+ countries | REST API + FHIR R4. Add ambient scribe (Whisper→medspacy→Claude), drug safety agent (TxAgent), clinical NLP layer. |
| OpenMRS | [openmrs/openmrs-core](https://github.com/openmrs/openmrs-core) | MPL-2.0 | Java/MySQL | 40+ countries, ~36M patient records. **Strong in LATAM** (Haiti, Bolivia, Peru, Nicaragua). Has openmrs-esm-chartsearchai module. | REST API, event-based hooks. Ideal for AI-powered care protocols in LATAM. |
| Bahmni | [Bahmni/openmrs-distro-bahmni](https://github.com/Bahmni/openmrs-distro-bahmni) | GPL-3.0 | Java/OpenMRS + OpenERP | Low-resource settings, Nepal, India, LATAM | Built on OpenMRS. Add AI triage, drug interaction checking, EvoClinician adaptive diagnosis. |
| Medplum | [medplum/medplum](https://github.com/medplum/medplum) | Apache-2.0 | TypeScript/React/Node | Cloud-native digital health startups. Updated July 11, 2026. | **Best for new builds.** FHIR-native, bot/subscription system. Wire AI agents directly to FHIR resource events. |
| Ottehr | [Ottehr/ottehr](https://github.com/Ottehr/ottehr) | Apache-2.0 | TypeScript/React | First FHIR-native open source telehealth EHR. Production-ready modules. | FHIR-native = AI-ready. Use Medplum as FHIR backend. Telehealth + agentic workflows. |
| Care (OHC Network) | [ohcnetwork/care](https://github.com/ohcnetwork/care) | MIT | Python/Django + React | India, international. ICU, telehealth, disaster response. | REST API. Add triage agent (EvoClinician), ICU monitoring AI, clinical decision support. |
| GNU Health | [gnuhealth/gnuhealth](https://github.com/gnuhealth/gnuhealth) | GPL-3.0 | Python/PostgreSQL | LATAM, Africa, community health centers | FHIR module available. Social medicine focus — add community health AI agents, MedAgents for clinical QA. |
| OpenHospital | [informatici/openhospital](https://github.com/informatici/openhospital) | GPL-3.0 | Java | Resource-limited hospitals, Africa/LATAM | REST API. Add AI for ward management, inventory, patient flow optimization. |

## FHIR & Interoperability Infrastructure

| Platform | Repo | License | Stars | Role |
|----------|------|---------|-------|------|
| HAPI FHIR Server | [hapifhir/hapi-fhir](https://github.com/hapifhir/hapi-fhir) | Apache-2.0 | ~2.1k | Drop-in FHIR R4/R5 server — the data layer that makes AI pipelines possible. Updated July 10, 2026. |
| FHIR Works (AWS) | [awslabs/fhir-works-on-aws](https://github.com/awslabs/fhir-works-on-aws) | Apache-2.0 | ~400 | Serverless FHIR on AWS Lambda — good for cloud-native deployments |
| LinuxForHealth FHIR | [LinuxForHealth/FHIR](https://github.com/LinuxForHealth/FHIR) | Apache-2.0 | ~500 | IBM/Linux Foundation FHIR R4 server with high performance focus |

## Medical Imaging Platforms

| Platform | Repo | License | Stars | Role |
|----------|------|---------|-------|------|
| Orthanc | [orthanc-team/orthanc](https://github.com/orthanc-team/orthanc) | GPL-3.0 | ~700 | Lightweight DICOM server. REST API. Foundation for radiology AI pipelines. |
| OHIF Viewer | [OHIF/Viewers](https://github.com/OHIF/Viewers) | MIT | ~4.2k | Open source medical imaging viewer (React). Extensible — plug in AI overlays, MedRAX agent results. |
| 3D Slicer | [Slicer/Slicer](https://github.com/Slicer/Slicer) | BSD | ~2.0k | Research platform for medical image analysis and 3D visualization. |
| InVesalius | [invesalius/invesalius3](https://github.com/invesalius/invesalius3) | GPL-2.0 | ~800 | Brazilian open source 3D medical imaging. Strong LATAM adoption — good entry point for hospital clients in Brazil/Argentina. |

## Pharmacy & Drug Management

| Platform | Repo/Notes | License | Stars | Role |
|----------|------------|---------|-------|------|
| OpenMRS Pharmacy Module | [openmrs/openmrs-module-pharmacy](https://github.com/openmrs/openmrs-module-pharmacy) | MPL-2.0 | ~50 | Prescription, dispensing, stock management for OpenMRS environments |
| TxAgent + ToolUniverse | [mims-harvard/TxAgent](https://github.com/mims-harvard/TxAgent) | MIT | ~700 | AI-native drug interaction and therapeutic reasoning — wraps all FDA drugs since 1939. Harvard-validated. |
| scientific-agent-skills | [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) | MIT | 30.7k | 148 drug discovery + biomedical skills. PubChem, ChEMBL, DrugBank, ClinicalTrials.gov integrations. Pharma research pipeline in a box. |

## Mental Health & Behavioral Health Platforms

| Platform | Repo | License | Notes |
|----------|------|---------|-------|
| OpenMRS MH Module | [openmrs/openmrs-module-mentalhealth](https://github.com/openmrs/openmrs-module-mentalhealth) | MPL-2.0 | Mental health screening and tracking on OpenMRS |
| Mindlogger | [ChildMindInstitute/mindlogger-app-refactor](https://github.com/ChildMindInstitute/mindlogger-app-refactor) | Apache-2.0 | Digital assessment and remote monitoring for mental health research |
| YAQIN (emerging) | Research 2026 | — | Culturally sensitive agentic AI for mental healthcare — arXiv 2026. Watch for release. |
