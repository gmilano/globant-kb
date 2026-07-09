# 🏭 Verticales de partida — Healthcare

> Plataformas verticales existentes customizables con AI. Modelo: partir de algo funcional y añadir capa agéntica.
> Última actualización: 2026-07-09 (v4 — Medplum Apache-2.0 FHIR platform enterprise, NemoClaw HIPAA pattern)

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
| **beda-software/fhir-emr** | MIT | [github.com/beda-software/fhir-emr](https://github.com/beda-software/fhir-emr) | TypeScript + FHIR | EMR FHIR-native con licencia MIT pura. Usa HL7 FHIR como data model y SDC IG para formularios. Ideal para proyectos greenfield donde se quiere máxima flexibilidad. |
| **Medplum** | Apache-2.0 | [github.com/medplum/medplum](https://github.com/medplum/medplum) | TypeScript + React + Node.js + FHIR | Healthcare developer platform. FHIR-native, HIPAA+SOC2 out-of-box, "Bots" para server-side logic (similar a AWS Lambda), UI Component Library, Medplum App. Y Combinator alum. **Recomendado para greenfield 2026** — más completo que beda-software/fhir-emr para apps de producción. |

---

## Cómo customizar con AI — Receta estándar

### Integración sobre EHR existente (clientes con sistema ya desplegado)
```
1. Fork del repo base (OpenMRS / OpenEMR / Bahmni)
2. Exponer datos vía FHIR R4 API (built-in en todos)
3. Configurar fhir-mcp-server (Momentum) como conector
4. Conectar agente (openmed-agent / Claude + MCP)
5. Añadir NLP clínico sobre notas (medspaCy + cTAKES)
6. Desplegar UI conversacional (React) sobre el sistema base
```

### Greenfield FHIR-native (proyecto nuevo — recomendado 2026)
```
1. Partir de Medplum (Apache-2.0) como FHIR server + platform
2. Crear Medplum Bots para AI logic server-side (sin infra propia)
3. Conectar fhir-mcp-server para exponer datos a Claude
4. Configurar NemoClaw si el cliente requiere HIPAA estricto (PHI local)
5. Añadir UI con Medplum React components + custom clinical views
6. Desplegar en AWS/Azure con HIPAA Business Associate Agreement
```

## Mapa de selección por contexto

| Contexto | Plataforma recomendada |
|----------|----------------------|
| Clínica ambulatoria US (certificación ONC requerida) | OpenEMR 8.0.0 |
| Hospital LATAM / bajo recurso / ONG | Bahmni (OpenMRS + Odoo + OpenELIS) |
| Red nacional de salud / epidemiología | OpenMRS + GNU Health |
| Urgencias / telemedicina / startup | Ottehr |
| Interoperabilidad FHIR enterprise | HAPI FHIR + Microsoft FHIR Server |
| Plataforma AI nativa (greenfield, TypeScript) | **Medplum** + fhir-mcp-server + openmed-agent |
| HIPAA estricto + enterprise (hospital US grande) | Medplum + **NemoClaw** + openmed-agent |
| AI clínica con PHI en datacenter propio | NemoClaw + Nemotron local + Claude (reasoning no-PHI) |

## Módulos AI más demandados sobre estas plataformas

1. **Ambient Scribe**: transcripción de consulta → nota SOAP automática (Whisper + LLM + FHIR write)
2. **Prior Authorization Agent**: reglas aseguradoras → decisión automática (openmed-agent + reglas ICD/CPT)
3. **Clinical Decision Support**: diagnóstico diferencial + drug interactions (LangGraph + PubMed)
4. **Predictive Risk**: readmission, sepsis early warning (XGBoost + LangGraph + FHIR)
5. **NLP sobre EHR histórico**: extracción entidades clínicas → knowledge graph (medspaCy + BioCypher)
6. **Radiología asistida por AI**: análisis CXR automatizado (MedRAX + torchio + Claude Vision)

---

## Regulatory Corner: FDA SaMD Pathway para Clinical LLMs (NEW — Jul 2026)

**Hito regulatorio**: UpDoc Inc. recibió FDA 510(k) K253281 (dic 2025, anunciado jun 2026) — **primer LLM patient-facing clearado como Software as Medical Device (SaMD)**.

### Cómo replicar el pathway:

```
1. Identificar indicación estrecha y bien definida
   (ej: titulación de insulina en T2DM — no "asistente médico general")
2. Encontrar predicado 510(k) existente
   (UpDoc usó: calculadora de dosis de insulina)
3. Construir evidencia clínica
   (ensayo piloto controlado — UpDoc usó Stanford insulin trial)
4. Sandboxing estricto: LLM opera SOLO dentro de parámetros clínicos pre-definidos
5. EHR-integrated: acción del agente visible y auditada por el clínico
6. Submission 510(k) al FDA con predicate claim
```

### TEFCA como infraestructura para agentes (jul 2026)

TEFCA superó 1 billón de intercambios (HHS, jul 2026). Los proyectos US deben planificarse sobre TEFCA:
- Agentic workflows de prior authorization: el agente se autentica en TEFCA → accede a cualquier EHR participante
- Coordinación de cuidados AI: historial cross-institucional en tiempo real sin integraciones bilaterales
- SSA en TEFCA (spring 2026): procesamiento de discapacidad >50% más rápido como caso de referencia

---

### Qué significa para proyectos Globant US:
- **El precedente existe**: proyectos de AI clínica con pacientes en EEUU ahora tienen un modelo claro
- **Foco en indicaciones estrechas** (chronic disease management, medication titration, triage scoring)
- **Stack recomendado**: openmed-agent + HAPI FHIR local + audit logging completo + validación clínica
- **Timeline**: 12-18 meses desde concepto hasta FDA clearance (510k) en indicaciones bien definidas

### Plataformas LATAM — Mapa por País

| País | EHR público | Regulación AI | Oportunidad |
|------|------------|---------------|-------------|
| Brasil | RNDS (FHIR) + prontuário eletrônico | ANVISA + LGPD | SUS 214M usuarios; prior auth FHIR-native |
| México | IMSS/ISSSTE legacy + NOM-024 | Cofepris | 1DOC3-style telemedicina AI; IMSS modernización |
| Colombia | RIPS + HC-3 | Minsalud | Bogotá healthtech hub; telemedicina rural |
| Argentina | RUP (Registro Único de Personas) | ANMAT | OSDE/Swiss Medical prior auth automation |
| Chile | FONASA/Isapre data | ISP | Isapre crisis → AI para gestión de prestaciones |
