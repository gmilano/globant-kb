# Vertical Platforms — Healthcare

> Existing platforms to customize with AI. Model: start from something functional, add an agentic layer on top.
> Last updated: 2026-07-06

## Recommended Platforms

| Platform | License | GitHub | Stack | Use Case |
|----------|---------|--------|-------|----------|
| [OpenMRS](https://github.com/openmrs/openmrs-core) | MPL-2.0 | openmrs/openmrs-core | Java/Spring + React (3.x) | Full EMR/EHR: 8,000+ facilities, 70+ countries. FHIR R4 API. Strong LATAM presence. AI modules via REST hooks. |
| [OpenEMR](https://github.com/openemr/openemr) | GPL-3.0 | openemr/openemr | PHP + MySQL | ONC-certified ambulatory EHR (v8.0.0, Mar 2026). US Core 8.0, USCDI v5, SMART on FHIR v2.2. AI integration via FHIR API. |
| [Medplum](https://github.com/medplum/medplum) | Apache-2.0 | medplum/medplum | TypeScript/React + Node.js | Developer-first FHIR platform. HIPAA+SOC2. Best for building custom AI-native health apps. "Bot" system for server-side agents. |
| [Bahmni](https://github.com/Bahmni/openmrs-module-bahmniapps) | LGPL-3.0 | Bahmni/openmrs-module-bahmniapps | Angular/React + OpenMRS + Odoo + OpenELIS | Integrated hospital system: EMR + billing + lab. 50+ countries. Ideal for LATAM hospital clients with limited budgets. |
| [GNU Health](https://health.gnu.org/) | GPL-3.0 | — (Savannah) | Python + Tryton ERP | Hospital management + health information system. Strong in Argentina, Brazil, Cuba. |
| [CARE (OHC Network)](https://github.com/ohcnetwork/care_fe) | MIT | ohcnetwork/care_fe | React + Django + PostgreSQL | Digital Public Good for care coordination. FHIR-compatible. Proven in India, Bangladesh. LATAM expansion underway. |
| [HAPI FHIR JPA Server](https://github.com/hapifhir/hapi-fhir-jpaserver-starter) | Apache-2.0 | hapifhir/hapi-fhir-jpaserver-starter | Java + Spring Boot + PostgreSQL | Reference FHIR R4/R5 server. Deploy as interoperability hub. MCP server wrappers available for AI agent connectivity. |

## How to Customize with AI

### Pattern 1: AI Layer on OpenMRS/OpenEMR
```
1. Deploy OpenMRS/OpenEMR (existing FHIR R4 API)
2. Deploy HAPI FHIR as interoperability layer (optional)
3. Connect AI agent via SMART on FHIR (client-py)
4. Agent reads: Patient, Observation, Condition, MedicationRequest
5. Agent writes: DocumentReference (notes), CarePlan, CommunicationRequest
6. Frontend: conversational UI in React consuming FHIR resources
```

### Pattern 2: Greenfield with Medplum
```
1. Fork medplum/medplum (Apache-2.0)
2. Define data model as FHIR profiles (US Core or custom)
3. Write Medplum Bots (server-side JS) = your AI agents
4. Bot triggers: on new Observation → run clinical decision logic
5. Connect openmed for on-device NLP of clinical notes
6. Deploy: Medplum Cloud (managed) or self-hosted on AWS/GCP
```

### Pattern 3: Bahmni for LATAM Hospital Client
```
1. Deploy Bahmni (OpenMRS + Odoo + OpenELIS)
2. Add AI module via OpenMRS REST API
3. Use medspacy for Spanish clinical note parsing
4. Add ambient documentation: Whisper (ASR) → medspacy → FHIR note
5. Clinical decision support: LLM-Medical-Agent orchestrating lab + diagnosis
6. Revenue cycle: Odoo AI extensions for billing automation
```

## LATAM-Specific Considerations

- **Language**: `medspacy` + `openmed` support Spanish clinical text. `edsnlp` handles Portuguese (Brazil).
- **Infrastructure**: Bahmni and OpenMRS have the strongest LATAM deployments (Brazil, Mexico, Argentina, Colombia).
- **Regulations**: LGPD (Brazil), Ley de Protección de Datos (Colombia/Argentina) require on-premise or local-cloud deployments — favors `openmed` on-device approach.
- **GNU Health**: Particularly strong in Argentina and Cuba; active Spanish-speaking community.
- **CARE FE**: Being adapted for LATAM contexts; MIT license = zero barriers.

## Proprietary Platforms (for Integration Engagements)

| Platform | Notes for AI Integration |
|----------|--------------------------|
| Epic | 150+ AI features native (Feb 2026). External integration via SMART on FHIR + Epic App Orchard. AI Charting embedded. |
| Oracle Health (Cerner) | Clinical AI Agent with ambient order creation (Feb 2026). Integration via FHIR R4 APIs. |
| Nuance DAX Copilot (Microsoft) | Ambient documentation. Can be layered on any EHR. |
| Innovaccer | AI analytics platform with FHIR data lake. Enterprise segment. |

---
*See also: `repos/foundations.md` for libraries to build on.*
