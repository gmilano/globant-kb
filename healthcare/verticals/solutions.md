# 🏭 Vertical Solutions — Healthcare

> Existing functional platforms customizable with AI. Model: start from something working, add an agentic layer on top.
> Last updated: 2026-07-11

## Core EHR / Hospital Information Systems

| Platform | Repo | License | Stack | Deployment Context | AI Integration Path |
|----------|------|---------|-------|--------------------|---------------------|
| OpenEMR | [openemr/openemr](https://github.com/openemr/openemr) | GPL-2.0 | PHP/MySQL | Clinics, hospitals, 100+ countries | REST API + FHIR R4. Add ambient scribe, drug safety agent, clinical NLP layer. |
| OpenMRS | [openmrs/openmrs-core](https://github.com/openmrs/openmrs-core) | MPL-2.0 | Java/MySQL | 40+ countries, ~36M patient records. **Strong in LATAM** (Haiti, Bolivia, Peru, Nicaragua) | REST API, event-based hooks. Ideal for AI-powered care protocols in LATAM. |
| Bahmni | [Bahmni/openmrs-distro-bahmni](https://github.com/Bahmni/openmrs-distro-bahmni) | GPL-3.0 | Java/OpenMRS + OpenERP | Low-resource settings, Nepal, India, LATAM | Built on OpenMRS. Add AI triage, drug interaction checking on top. |
| Medplum | [medplum/medplum](https://github.com/medplum/medplum) | Apache-2.0 | TypeScript/React/Node | Cloud-native digital health startups | **Best for new builds.** FHIR-native, bot/subscription system. Wire AI agents directly to FHIR events. |
| Ottehr | [Ottehr/ottehr](https://github.com/Ottehr/ottehr) | Apache-2.0 | TypeScript/React | First FHIR-native open source EHR. Production-ready modules. | FHIR-native = AI-ready. Use Medplum as backend. |
| Care (OHC Network) | [ohcnetwork/care](https://github.com/ohcnetwork/care) | MIT | Python/Django + React | India, international. ICU, telehealth, disaster response. | REST API. Add triage agent, ICU monitoring AI, clinical decision support. |
| GNU Health | [gnuhealth/gnuhealth](https://github.com/gnuhealth/gnuhealth) | GPL-3.0 | Python/PostgreSQL | LATAM, Africa, community health centers | FHIR module available. Social medicine focus — add community health AI agents. |
| OpenHospital | [informatici/openhospital](https://github.com/informatici/openhospital) | GPL-3.0 | Java | Resource-limited hospitals, Africa/LATAM | REST API. Add AI for ward management, inventory, patient flow. |

## FHIR & Interoperability Infrastructure

| Platform | Repo | License | Stars | Role |
|----------|------|---------|-------|------|
| HAPI FHIR Server | [hapifhir/hapi-fhir](https://github.com/hapifhir/hapi-fhir) | Apache-2.0 | 2.1k | Drop-in FHIR R4/R5 server — the data layer that makes AI pipelines possible |
| FHIR Works (AWS) | [awslabs/fhir-works-on-aws](https://github.com/awslabs/fhir-works-on-aws) | Apache-2.0 | ~400 | Serverless FHIR on AWS Lambda — good for cloud-native deployments |
| LinuxForHealth FHIR | [LinuxForHealth/FHIR](https://github.com/LinuxForHealth/FHIR) | Apache-2.0 | ~500 | IBM/Linux Foundation FHIR R4 server with high performance focus |

## Medical Imaging

| Platform | Repo | License | Stars | Role |
|----------|------|---------|-------|------|
| Orthanc | [orthanc-team/orthanc](https://github.com/orthanc-team/orthanc) | GPL-3.0 | ~700 | Lightweight DICOM server. REST API. Foundation for radiology AI pipelines. |
| OHIF Viewer | [OHIF/Viewers](https://github.com/OHIF/Viewers) | MIT | 4.2k | Open source medical imaging viewer (React). Extensible — plug in AI overlays. |
| 3D Slicer | [Slicer/Slicer](https://github.com/Slicer/Slicer) | BSD | 2.0k | Research platform for medical image analysis and 3D visualization. |

## Pharmacy & Drug Management

| Platform | Notes | License |
|----------|-------|---------|
| OpenMRS Pharmacy Module | Prescription, dispensing, stock management for OpenMRS | MPL-2.0 |
| TxAgent + ToolUniverse | AI-native drug interaction and therapeutic reasoning — wraps all FDA drugs | MIT |

## How to Customize with AI

1. **Choose the base platform** matching the client context (Medplum for new builds, OpenMRS for LATAM/resource-limited, OpenEMR for established clinics).
2. **Add a FHIR layer** if not native (HAPI FHIR Server in front of OpenEMR) — gives AI agents a standard interface.
3. **Wire an AI agent** to FHIR event subscriptions (patient admission → triage agent, new prescription → drug safety agent, encounter close → ambient scribe).
4. **Use MedGemma / Claude Haiku** as the LLM — MedGemma for on-prem/HIPAA, Claude Haiku via API for cloud deployments.
5. **Add NLP layer** (medspacy, cTAKES) for extracting structured data from clinical notes.
6. **Deploy observability** (Langfuse or equivalent) to audit every agent action for clinical governance.

## LATAM Specific Notes

- **OpenMRS** is already widely deployed in LATAM — Bolivia (SNIS), Haiti, Nicaragua, Peru (MINSA pilots). Globant can lead AI-augmentation of existing OpenMRS deployments.
- **Bahmni** is the recommended stack for hospitals in resource-constrained settings — pre-integrated pharmacy, lab, billing.
- **GNU Health** has active LATAM community and social medicine modules relevant to public health programs.
- Spanish/Portuguese localization already exists for all three — reduces effort significantly.

---
*Updated by ingest pipeline.*
