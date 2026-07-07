# Verticales de partida — Healthcare AI

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-07

## Plataformas recomendadas

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| [OpenMRS](https://github.com/openmrs/openmrs-core) | MPL-2.0 | openmrs.org | Java, Spring, REST + FHIR | EMR empresarial modular con concept dictionary. 42+ países en producción. Base para agregar AI de diagnóstico y triage en hospitales públicos LATAM. |
| [OpenEMR](https://github.com/openemr/openemr) | GPL-3.0 | open-emr.org | PHP/Laravel, FHIR R4 API | EHR + practice management más popular open source. 100k+ instalaciones. FHIR R4 API completa. Base para AI de documentación y billing automation. |
| [Medplum](https://github.com/medplum/medplum) | Apache-2.0 | medplum.com | TypeScript, React, FHIR R4 | Plataforma dev FHIR-native: bots serverless, SDK, SMART on FHIR. Base moderna para construir apps clínicas con AI integrada desde día 1. |
| [MONAI](https://github.com/Project-MONAI/MONAI) | Apache-2.0 | monai.io | Python, PyTorch, CUDA | Medical imaging AI: segmentación, clasificación, detección, generación. 8.4k★. Standard de la industria para radiology, pathology, oncology AI. |
| [OHIF Viewers](https://github.com/OHIF/Viewers) | MIT | ohif.org | TypeScript, React, Cornerstone.js | DICOM viewer web zero-footprint: lesion tracking, segmentation overlay, measurements. Integra con MONAI para AI inference en tiempo real. |
| [HAPI FHIR](https://github.com/hapifhir/hapi-fhir) | Apache-2.0 | hapifhir.io | Java, Spring Boot | Servidor FHIR R4 de referencia. Implementación más adoptada. Base para construir el data layer de cualquier solución healthcare AI. |
| [cTAKES](https://github.com/apache/ctakes) | Apache-2.0 | ctakes.apache.org | Java, UIMA | Clinical NLP: extracción de entidades (diagnósticos, medicamentos, procedimientos) de notas de EHR en texto libre. Estándar en investigación clínica. |
| [medspacy](https://github.com/medspacy/medspacy) | MIT | github.com/medspacy | Python, spaCy | Clinical NLP pipeline: negación, temporalidad, sección detection para notas de EHR. Funciona en español y portugués. Ligero y fast. |
| [OpenScribe](https://github.com/sammargolis/OpenScribe) | MIT | github.com/sammargolis/OpenScribe | Python, Whisper | Medical scribe local-first: transcripción de consultas sin cloud, HIPAA nativo. Alternativa free a Nuance DAX. Base para ambient documentation AI. |
| [GNU Health](https://gnuhealth.org) | GPL-3.0 | gnuhealth.org | Python/Tryton | EMR + gestión hospitalaria + salud pública. Usado en hospitales públicos LATAM (Venezuela, Argentina, Colombia). Soporte nativo en español. |
| [Bahmni](https://github.com/Bahmni/bahmni-core) | AGPL-3.0 | bahmni.org | Java, OpenMRS, OpenERP | EHR + hospital management para settings de bajos recursos. Ampliamente usado en hospitales comunitarios LATAM y Asia. |
| [PyHealth](https://github.com/sunlabuiuc/PyHealth) | MIT | pyhealth.readthedocs.io | Python, PyTorch | Predictive modeling clínico: readmisión, mortalidad, drug recommendation, coding automation. Pipeline de 10 líneas para ML en MIMIC. |

---

## Mapas de stack por tipo de proyecto

### Para AI de imágenes médicas (radiology/pathology AI)
```
OHIF Viewers (MIT)          → Visualización DICOM: viewer web sin footprint, lesion tracking
    ↓
Orthanc (LGPL)              → PACS server: storage + retrieval de estudios DICOM
    ↓
MONAI (Apache-2.0)          → AI inference: segmentación de tumores, clasificación de hallazgos
    ↓
MedSAM (Apache-2.0)         → Segmentación interactiva: radiologist-in-the-loop refinement
    ↓
LangGraph (MIT)             → Orquestación: radiology report generation con human-in-the-loop gate
    ↓ resultado
AI radiology pipeline: estudio → análisis → draft report → radiologist approval → EHR integration
```

### Para ambient clinical documentation AI
```
OpenScribe/Whisper (MIT)    → Transcripción local: audio de consulta → texto (HIPAA sin cloud)
    ↓
medspacy + cTAKES (MIT/Apache) → Clinical NLP: extracción de diagnósticos, medicamentos, plan
    ↓
MEDITRON / BioMistral (Apache-2.0) → Structuring: notas SOAP, ICD-10 coding, CPT coding
    ↓
Medplum bots (Apache-2.0)  → FHIR integration: push estructurado al EHR del paciente
    ↓
LangGraph (MIT)             → Human gate: médico revisa + aprueba antes de guardar en EHR
    ↓ resultado
Consulta médica → nota estructurada en EHR en < 2 minutos. Sin typing. Sin cloud required.
```

### Para telemedicina AI en LATAM
```
GNU Health / OpenMRS (GPL/MPL) → Core clínico: EHR del paciente, historial, medicamentos
    ↓
medspacy ES/PT (MIT)        → Triage NLP: síntomas en español/portugués → urgencia score
    ↓
BioMistral / Med42 (Apache-2.0) → Diagnóstico diferencial en idioma local
    ↓
HAPI FHIR (Apache-2.0)     → Interoperabilidad: referral a especialista con datos estructurados
    ↓
LangGraph (MIT)             → Escalamiento: urgente → médico en línea; no urgente → AI follow-up
    ↓ resultado
Triage automatizado 24/7 en PT-BR/ES-LATAM → reducción 60% en consultas evitables
```

---

## Cómo customizar con AI

1. **Fork del repo base** — OpenMRS, OpenEMR o Medplum según el contexto de despliegue
2. **Añadir FHIR layer** — HAPI FHIR como servidor de datos o Medplum bots para workflows
3. **Integrar LLM médico** — MEDITRON fine-tuned en datos del cliente, o Claude API vía MCP
4. **Clinical NLP pipeline** — medspacy para notas en ES/PT, cTAKES para inglés, Whisper para audio
5. **Wrappear flujos con agentes** — LangGraph para orquestación multi-step con audit trail
6. **Compliance desde día 1** — HIPAA: datos locales o cifrado E2E; ANVISA/COFEPRIS: audit trail completo de decisiones AI; human-in-the-loop obligatorio para diagnósticos de alto riesgo

---

## Plataformas relevantes para LATAM

| País | Plataforma | Contexto |
|------|-----------|----------|
| Brasil | OpenMRS + medspacy PT-BR | SUS (Sistema Único de Saúde) necesita soluciones open source. OpenMRS es base de sistemas municipales. medspacy fine-tuned en PT-BR para notas de UBS. ANVISA Law 14.874/24 exige audit trail. |
| Brasil | GNU Health | Hospitales públicos estaduales y municipales. Soporte nativo en português. Base para AI de atenção primária. |
| México | OpenEMR + FHIR | Sector privado (IMSS, ISSSTE, clínicas). COFEPRIS regula medical AI. OpenEMR con FHIR R4 como base para telemedicina AI. |
| Colombia | OpenMRS + Bahmni | Red hospitalaria pública. Ministerio de Salud. Bahmni para hospitales de menor complejidad. 1DOC3 telemedicina ya validada. |
| Chile | Medplum + HAPI FHIR | EHR Chile (MINSAL) ya es open source. FHIR R4 adoptado. Medplum como plataforma moderna para apps HealthTech. |
| LATAM general | MEDITRON / BioMistral | LLMs open source multilingual (ES/PT). Más económico que GPT-4 para volumen clínico alto. Deployable on-premise para hospitales con restricciones de datos. |
