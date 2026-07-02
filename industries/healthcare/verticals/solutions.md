# Healthcare Vertical Platforms — Open Source Solutions

> Real systems used in production worldwide that Globant can customize and build AI on top of.

## Electronic Medical Records (EMR)

### OpenEMR
- **Repo**: [openemr/openemr](https://github.com/openemr/openemr)
- **License**: GPL v3
- **Stack**: PHP, MySQL, JavaScript
- **Scale**: Most widely deployed open-source EMR globally; thousands of US outpatient clinics
- **Strengths**: US billing (ICD-10, CPT), e-prescribing, patient portal, clinical decision support hooks
- **AI integration points**: REST API, clinical decision support API, document generation hooks
- **Globant play**: Build AI-powered clinical note generation, code suggestion, and prior auth automation on top of OpenEMR

### OpenMRS
- **Repo**: [openmrs/openmrs-core](https://github.com/openmrs/openmrs-core)
- **License**: MPL 2.0
- **Stack**: Java (Spring), REST API, FHIR R4
- **Scale**: 8,000+ facilities in 70+ countries; WHO and PEPFAR endorsed
- **Strengths**: Flexible concept dictionary, modular architecture, strong API layer, used in complex longitudinal disease management (HIV, TB, maternal health)
- **AI integration points**: OpenMRS FHIR2 module (full FHIR R4 API), REST API, module system
- **Globant play**: Build AI diagnostic assistance modules, predictive readmission models, and population health dashboards

### Bahmni (OpenMRS + Odoo + OpenELIS)
- **Repo**: [bahmni/bahmni-core](https://github.com/bahmni/bahmni-core)
- **License**: AGPL v3
- **Stack**: OpenMRS (clinical) + Odoo (billing/inventory) + OpenELIS (lab)
- **Scale**: 50+ countries, deployed in 20+ Indian government hospitals, NGO and public health settings
- **Strengths**: Out-of-the-box complete hospital system. Bundled ERP + EMR + lab. Designed for low-resource environments.
- **AI integration points**: OpenMRS FHIR API, Odoo REST API, OpenELIS lab result feeds
- **Globant play**: AI triage agent, lab result interpretation, supply chain optimization (Odoo + AI)

### GNU Health
- **Repo**: [gnu-health/gnuhealth](https://github.com/gnu-health/gnuhealth)
- **License**: GPL v3
- **Stack**: Python, Tryton ERP
- **Scale**: Used heavily in Latin America, Africa, Caribbean
- **Strengths**: Full EMR + epidemiology + hospital management + genetics
- **Globant play**: Strong fit for LATAM government health clients; AI epidemiology modules

## Medical Imaging Platforms

### OHIF Medical Imaging Viewer
- **Repo**: [OHIF/Viewers](https://github.com/OHIF/Viewers)
- **License**: MIT
- **Stack**: React, Cornerstone.js, DICOM web
- **Scale**: Standard web-based DICOM viewer for radiology; deployed in hospitals globally
- **AI integration points**: Extensible with AI model overlay panels; supports segmentation rendering
- **Globant play**: Build AI radiology assistant plugin (automatic findings, measurements, report generation)

### MONAI Deploy App SDK
- **Repo**: [Project-MONAI/MONAI](https://github.com/Project-MONAI/MONAI)
- **License**: Apache 2.0
- **Stack**: Python, PyTorch, Docker, NVIDIA Triton-compatible
- **Strengths**: End-to-end: label → train → deploy → monitor imaging AI models
- **Globant play**: Build client-specific imaging AI (tumor detection, organ segmentation) using MONAI, deploy via App SDK

## Healthcare Interoperability

### HAPI FHIR Server
- **Repo**: [hapifhir/hapi-fhir](https://github.com/hapifhir/hapi-fhir)
- **License**: Apache 2.0
- **Stack**: Java (Spring Boot)
- **Scale**: Most widely used FHIR server implementation. Required for US ONC compliance.
- **AI integration points**: FHIR Bulk Data export, SMART on FHIR app model, CDS Hooks
- **Globant play**: FHIR data layer for any healthcare AI solution; CDS Hooks agent that intercepts clinical decisions in real-time

## Decision Matrix for Globant Client Engagements

| Client Type | Recommended Platform | AI Layer |
|-------------|---------------------|----------|
| US outpatient clinic | OpenEMR | Ambient documentation + billing AI |
| Global NGO / developing country | OpenMRS or Bahmni | Diagnostic support + triage agents |
| LATAM government health | GNU Health or OpenMRS | Epidemiology + population health AI |
| Hospital radiology | OHIF + MONAI | AI radiology assistant |
| Health system (Epic/Cerner connected) | HAPI FHIR + CDS Hooks | Real-time clinical decision agents |
