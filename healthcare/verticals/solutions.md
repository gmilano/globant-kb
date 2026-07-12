# 🏭 Vertical Platforms — Healthcare

> Existing vertical platforms customizable with AI.
> Model: start from something functional, add agentic layer on top.
> Last updated: 2026-07-12 (v11)

## Recommended Platforms

| Platform | License | URL | Stack | Use Case |
|----------|---------|-----|-------|----------|
| **OpenEMR** | GPL-3.0 | [github.com/openemr/openemr](https://github.com/openemr/openemr) | PHP + MySQL, REST + FHIR, SMART on FHIR v2.2 | Ambulatory EHR/EMR. v8.0.0 (Mar 2026): ONC-certified, US Core 8.0. 15k+ global installs. AI scribing base. |
| **OpenMRS** | MPL-2.0 | [github.com/openmrs/openmrs-core](https://github.com/openmrs/openmrs-core) | Java + Hibernate, concept dictionary, REST + FHIR | Modular EHR for developing countries. LATAM, Africa, Asia. Custom for HIV/TB/MCHN. Strong FHIR interoperability. |
| **GNU Health** | GPL-3.0 | [health.gnu.org](https://health.gnu.org) | Python + Tryton, PostgreSQL | Full hospital IS: EMR, laboratory, pharmacy, demographics. Unique social medicine module. Strong Spanish community → LATAM. |
| **CARE (care_fe)** | MIT | [github.com/ohcnetwork/care_fe](https://github.com/ohcnetwork/care_fe) | React + Django + FHIR | Digital Public Good: triage, ICU, telemedicine, bed management. Active in India + Sri Lanka. Easy AI triage integration. |
| **HAPI FHIR Server** | Apache-2.0 | [github.com/hapifhir/hapi-fhir](https://github.com/hapifhir/hapi-fhir) | Java + Spring Boot, HL7 FHIR R4/R5 | Reference FHIR server for interoperability. Standard data layer to connect any EHR with AI agents. |
| **OHIF Viewers** | MIT | [github.com/OHIF/Viewers](https://github.com/OHIF/Viewers) | React + cornerstone.js, DICOM | Extensible web radiology viewer. Plugin system for AI inference. Used in top-50 US hospitals. |
| **Medblocks UI** | MIT | [github.com/medblocks/medblocks-ui](https://github.com/medblocks/medblocks-ui) | Web Components, openEHR/FHIR | FHIR-native clinical UI components. Reusable clinical forms. Ideal for building quick clinical apps. |
| **Orthanc** | GPL-3.0 | [github.com/orthanc-server/orthanc](https://github.com/orthanc-server/orthanc) | C++ + REST + DICOMweb | Lightweight extensible DICOM server. AI plugin for medical image analysis. Base for radiology AI pipelines. |

## AI-Native Emerging (2025-2026)

| Platform | License | Description |
|----------|---------|-------------|
| **Ottehr** | MIT | The only AI-native + FHIR-native EHR. Includes ambient scribe, AI HPI chatbot, real-time tracking board. Urgent care / primary care. |
| **Medplum** | Apache-2.0 | FHIR-native healthcare application platform for builders. Auth, APIs, workflow engine. Base for custom clinical apps with AI. |

## How to Customize with AI

1. **Fork + FHIR layer**: Fork OpenEMR/OpenMRS → enable FHIR API → connect HAPI FHIR as standard data layer
2. **NLP on notes**: Add openmed/medspacy as microservice → automatic de-identification → clinical NER
3. **Agent over FHIR**: Deploy MDAgents/CHA connected to HAPI FHIR → clinical decision support on real data
4. **Conversational UI**: React chat component → LLM (Claude/MedGemma local) → FHIR queries → contextual answers
5. **Imaging AI**: OHIF Viewers + plugin torchio/MedRAX → automated image analysis → structured report
