# 🏭 Vertical Solutions — Healthcare

> Existing open-source platforms to customize with AI. Model: start with something functional, add the agentic layer on top.
> Last updated: 2026-07-13 (v12)

## Core EHR / Clinical Platforms

| Platform | License | Repo | Stars | Stack | AI Use Case |
|----------|---------|------|-------|-------|-------------|
| **OpenEMR** | GPL-2.0 | [openemr/openemr](https://github.com/openemr/openemr) | ~4.7k | PHP + MySQL | Full EHR: scheduling, billing, clinical notes. ONC-certified v8.0.0 (Mar 2026). Add AI layer for ambient scribing, prior auth, coding assistance. Used in 15,000+ facilities. |
| **OpenMRS** | MPL-2.0 | [openmrs/openmrs-core](https://github.com/openmrs/openmrs-core) | ~1.9k | Java + MySQL | Community health EHR for 40+ countries (strong in Africa, Asia, LATAM). Concept dictionary enables AI-driven population health. Bahmni distribution for low-resource environments. |
| **Medplum** | Apache-2.0 | [medplum/medplum](https://github.com/medplum/medplum) | ~2.5k | TypeScript + React + Node | FHIR-native, HIPAA + SOC2 compliant. Best open platform for building AI-first healthcare apps. Bots (serverless functions), subscriptions, and built-in FHIR client. |
| **Ottehr** | Apache-2.0 | [ottehr/ottehr](https://github.com/ottehr/ottehr) | ~600 | TypeScript + React | FHIR-native EHR from Oystehr. Modern stack, telehealth + in-person, designed for AI integration from day 1. Good for digital-first clinic builds. |
| **GNU Health** | GPL-3.0 | [tryton/gnuhealth](https://github.com/gnuhealth/gnuhealth) | ~400 | Python + Tryton | Hospital management + EHR + public health tools. Strong in Latin America and Africa. Ministry-of-health deployments. AI layer for health program analytics. |
| **Bahmni** | Apache-2.0 | [Bahmni/bahmni-distro-haiti](https://github.com/Bahmni/bahmni-distro-haiti) | ~200 | OpenMRS + DHIS2 + Odoo | Hospital IS for low-resource environments. Integrates clinical + pharmacy + lab + billing. LATAM: Argentina, Colombia, Peru. AI for clinical decision support. |

## FHIR Infrastructure

| Platform | License | Repo | Stars | Purpose |
|----------|---------|------|-------|---------|
| **HAPI FHIR** | Apache-2.0 | [hapifhir/hapi-fhir](https://github.com/hapifhir/hapi-fhir) | ~2.1k | Java HL7 FHIR server/client — the reference implementation. Powers most FHIR deployments globally. |
| **EHRbase** | Apache-2.0 | [ehrbase/ehrbase](https://github.com/ehrbase/ehrbase) | ~400 | openEHR standard-compliant clinical data repository. Archetype-based data modeling for complex clinical scenarios. |
| **SMART on FHIR** | Apache-2.0 | [smart-on-fhir/client-js](https://github.com/smart-on-fhir/client-js) | ~600 | OAuth2/FHIR authorization framework — enables AI apps to securely access any compliant EHR. |

## Hospital Operations / Admin

| Platform | License | Repo | Stars | AI Use Case |
|----------|---------|------|-------|-------------|
| **Care (OHC Network)** | MIT | [ohcnetwork/care_fe](https://github.com/ohcnetwork/care_fe) | 611 | Digital Public Good: ICU management, shift handoff, bed management. AI for predictive deterioration alerts, nursing copilot. |
| **HospitalRun** | Apache-2.0 | [HospitalRun/hospitalrun-frontend](https://github.com/HospitalRun/hospitalrun-frontend) | ~7.5k | Modern offline-first hospital IS. Useful base for AI-enhanced inventory, lab, and billing in low-connectivity environments. |

## Medical Imaging

| Platform | License | Repo | Stars | Purpose |
|----------|---------|------|-------|---------|
| **3D Slicer** | BSD | [Slicer/Slicer](https://github.com/Slicer/Slicer) | ~2.2k | Extensible medical image analysis platform (MRI, CT, PET). Python scripting + MONAI integration for AI segmentation. |
| **OHIF Viewer** | MIT | [OHIF/Viewers](https://github.com/OHIF/Viewers) | ~4k | Open Health Imaging Foundation — zero-footprint DICOM viewer. Embed AI annotations and AI-assisted reads. |
| **MONAI** | Apache-2.0 | [Project-MONAI/MONAI](https://github.com/Project-MONAI/MONAI) | ~6k | PyTorch AI framework for medical imaging. Auto-segmentation, detection, classification. Production-proven in radiology AI. |

## Health Data & Analytics

| Platform | License | Repo | Stars | Purpose |
|----------|---------|------|-------|---------|
| **DHIS2** | BSD-3 | [dhis2/dhis2-core](https://github.com/dhis2/dhis2-core) | ~900 | WHO-backed health information system — 73 countries. Population health analytics. AI for epidemiological forecasting. |
| **OpenCDS** | Apache-2.0 | [opencds/opencds-parent](https://github.com/opencds/opencds-parent) | ~100 | Clinical Decision Support platform implementing HL7 vMR standard. |
| **i2b2** | MIT | [i2b2/i2b2-core-server](https://github.com/i2b2/i2b2-core-server) | ~200 | Informatics for Integrating Biology & the Bedside. Research cohort exploration. AI-powered phenotyping. |

## How to Add AI to These Platforms

### Step-by-step customization pattern:
1. **Choose base platform** → OpenEMR (established clinic) / Medplum (greenfield build) / OpenMRS (LATAM/global)
2. **Expose FHIR APIs** → HAPI FHIR server on top of existing data
3. **Add on-device AI layer** → `openmed` (Apache-2.0) for clinical NLP without HIPAA exposure
4. **Wire in agents** → `EHRAgent` for data queries, `MDAgents` for clinical decisions, `openmed-agent` for workflows
5. **Evaluate** → `MedAgentBench` / `PhysicianBench` for clinical task accuracy before go-live

## LATAM-Specific Notes

| Country | Regulation | Recommended Platform | Notes |
|---------|-----------|---------------------|-------|
| Brazil | LGPD + CFM 2.299/2021 | OpenMRS + Medplum | FHIR mandatory for SUS interop. Data localization favors openmed on-device. |
| Mexico | NOM-024-SSA3 | OpenEMR + Medplum | IMSS/ISSSTE digital transformation projects open to open-source. |
| Colombia | Res. 2654/2019 (digital health) | OpenMRS / Bahmni | Strong OpenMRS community. Gobierno Digital 2026 mandate. |
| Argentina | Ley 27.553 (e-prescriptions) | GNU Health / Medplum | MSAL interoperability roadmap 2026. |

---
*Auto-updated by the ingest pipeline.*
