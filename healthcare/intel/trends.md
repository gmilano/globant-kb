# Tendencias — Healthcare AI 2026

> Última actualización: 2026-07-07

## 1. Ambient clinical documentation: 100% adopción — ahora el valor está en los workflows

**Qué está pasando:** La documentación clínica ambiental (AI que transcribe consultas en tiempo real y genera notas estructuradas) alcanzó **100% de adopción** entre sistemas de salud encuestados en 2026 — la primera aplicación AI en lograr penetración cuasi-universal. Nuance DAX (Microsoft), Suki, Abridge dominan en EUA. OpenScribe (MIT, open source) emergió como alternativa free, local-first, HIPAA-nativa.

**Evidencia concreta:**
- Nuance DAX: adoptado en 500+ health systems en US, ahorra 2h/médico/día de documentación
- HealthBench (OpenAI, 2026): primer benchmark médico evaluado por médicos reales a escala
- ARPA-H: primer programa para agente AI autorizado FDA que va más allá de documentación

**Implicación para Globant:** El mercado de transcripción está saturado. El diferenciador hoy es la **capa post-transcripción**: coding automático ICD-10/CPT, derivaciones inteligentes, alertas de interacción farmacológica, pre-auth para aseguradoras — todo lo que fluye después de la nota.

---

## 2. Multi-agent tumor boards: el patrón TradingAgents llega a oncología

**Qué está pasando:** Los tumor boards digitales multi-agente son el caso de uso de AI agentic más traction en healthcare 2026. MDTeamGPT, Healthcare Agent Orchestrator (Microsoft/Azure), DoctorAgent-RL implementan el patrón: múltiples agentes especializados (oncólogo, radiólogo, patólogo, cirujano de tórax) en debate estructurado + agente coordinador + human gate final.

**Arquitectura estándar:**
```
Radiology Agent (MONAI + imágenes) → Pathology Agent (histología + biomarkers)
        ↓                                              ↓
Oncology Specialist ←←←← DEBATE ESTRUCTURADO ←←←← Surgery Specialist
        ↓
Treatment Coordinator → Tumor Board Chair (human) → Care Plan
```

**Evidencia concreta:**
- Microsoft Healthcare Agent Orchestrator: en producción en Azure AI Foundry, FHIR integrado
- MDTeamGPT: publicado en EMNLP 2025, validado en casos de lung cancer + breast cancer
- MedAgentBench v2 (Biocomputing 2026): mejoras en clinical agent design

**Implicación para Globant:** "El tumor board de un hospital de investigación, disponible para hospitales regionales." Deal size $400k-1.2M. Pipeline: MONAI imaging + MDTeamGPT pattern + LangGraph human gate + FHIR output.

---

## 3. Medical LLMs open source: alternativa viable a GPT-4 para clínica

**Qué está pasando:** En 2026 hay LLMs médicos open source de calidad comparable o superior a GPT-3.5 en tareas clínicas, deployables on-premise para cumplir HIPAA/ANVISA sin datos en cloud:
- **MEDITRON-70B** (EPFL, Apache-2.0): supera GPT-3.5 en MedQA, deployable en hospital
- **Med42-v2** (M42 Health, Apache-2.0): Llama-3 70B, supera MedPaLM 2 en varios benchmarks
- **BioMistral** (Apache-2.0): multilingual ES/PT, ideal para LATAM
- **Med-Gemma** (Google, open weights): strong en radiología y clinical reasoning

**Métricas clave:**
- MEDITRON-70B: 81.4% en MedQA USMLE vs GPT-3.5 75.7%
- Med42-v2: 90.7% en MedQA con chain-of-thought
- Fine-tune costo: $500-2000 con datos propietarios del cliente usando QLoRA (análogo a FinGPT para finanzas)

**Implicación para Globant:** Podemos ofrecer modelos clínicos fine-tuned en datos propietarios del cliente (historiales en PT-BR o ES-LATAM) que superan a GPT-4 en tareas específicas del cliente, on-premise, sin cloud. Costo marginal mínimo vs $20-60/1M tokens de API propietaria.

---

## 4. FHIR R4 como infraestructura universal: el SQL de la salud

**Qué está pasando:** HL7 FHIR R4 es en 2026 el estándar mandatado de facto en US (CMS Final Rule 2020 + ONC), y adoptado crecientemente en LATAM (BCB ConecteSUS, MINSAL Chile, Colombia). La emergencia de **MCP-FHIR** (arxiv 2506.13800) hace que cualquier LLM agent pueda acceder a datos clínicos estructurados sin integración custom.

**Impacto:**
- MCP-FHIR: "connect once, consume everywhere" para datos de salud — análogo a openbb-mcp para finanzas
- ClinicalTrials.gov: 500k+ ensayos accesibles via FHIR y API pública
- OpenFDA: 15M+ adverse events, drug labels accesibles sin API key
- SMART on FHIR: launch apps directamente desde Epic/Cerner/Oracle sin re-auth

**Stack técnico FHIR:** HAPI FHIR (server) + Medplum (dev platform) + MCP-FHIR (agent access) + HealthChain (Python SDK)

**Implicación para Globant:** La "FHIR AI Layer" que agrega, normaliza y analiza datos de múltiples EHRs es la oportunidad de plataforma más grande en LATAM healthtech para 2026-2028.

---

## 5. Regulación AI médica: FDA, ANVISA, EU AI Act — exigencias de explainability

**Qué está pasando:** Los reguladores exigen explainability y audit trail para decisiones de AI médica. 1,250+ AI/ML medical devices aprobados por FDA (mayo 2025), concentrados en radiología. EU AI Act agosto 2026: sistemas de diagnóstico médico = **alto riesgo**, conformity assessment obligatorio.

**RegTech por jurisdicción:**
- US: FDA 510(k)/PMA para software AI; ONC Rule para interoperabilidad EHR
- Brasil: ANVISA Law 14.874/24 + PCCP (Predetermined Change Control Plan) para AI adaptativa
- México: COFEPRIS — aún sin marco específico AI, regulación de dispositivos médicos aplica
- UE: EU AI Act agosto 2026 — sistemas de diagnóstico = High Risk, documentación obligatoria
- LATAM general: HIPAA no aplica, pero principios de privacidad similares en leyes locales

**Implicación para Globant:** Todo proyecto de AI médica debe incluir desde día 1: audit trail completo (LangGraph state + logs), explainability layer (SHAP/LIME para predicciones ML), human-in-the-loop gates para diagnósticos de alto riesgo, documentación de gobernanza del modelo. No es opcional — es requisito regulatorio.

---

## 6. Healthcare AI en zonas de baja cobertura: el caso de uso de mayor impacto en LATAM

**Qué está pasando:** 70%+ de centros de salud de primer nivel en LATAM no tienen acceso a especialistas (radiólogos, dermatólogos, cardiólogos). AI de interpretación de imágenes médicas puede llevar capacidad diagnóstica de nivel terciario a centros primarios.

**Evidencia concreta:**
- MONAI + OHIF en UBS (Brasil): lectura de radiografías de tórax con sensibilidad 94%+ para TB y COVID
- MedSAM: segmentación de lesiones dérmicas desde foto de celular → comparación con base Atlas
- Dermatología AI (Brasil): 1 dermatólogo por 12,000 habitantes → AI como primer filtro

**Stack:** MONAI (inference) + OHIF (viewer web) + Whisper (reporte de voz) + MEDITRON (diagnóstico diferencial) + LangGraph (derivación automática)

**Implicación para Globant:** "Especialista AI disponible 24/7 en cualquier UBS del SUS." Impact social alto + deal size interesante (contratos con estados/municipios brasileños).

---

## 7. Mental health AI: brecha crítica + regulación permisiva

**Qué está pasando:** La brecha de atención en salud mental es masiva en LATAM (1 psiquiatra por 50k personas en MX). AI de apoyo psicológico (chatbots terapéuticos, monitoreo de bienestar, crisis detection) está emergiendo con regulación más ligera que diagnóstico médico (no son "medical devices" en la mayoría de jurisdicciones).

**Métricas:**
- Headspace + AI: 80% de usuarios reportan mejora en ansiedad después de 30 días
- Woebot (FDA Breakthrough Device): validado para depresión moderada, CBT conversacional
- Colombia: Ministerio de Salud lanzó app de salud mental AI 2025 — 2M+ descargas en 6 meses

**Stack:** LangGraph (conversación estructurada) + BioMistral ES/PT (razonamiento) + crisis detection module + human escalation gate

**Implicación para Globant:** Mental health AI tiene: regulación más ligera, adopción alta (usuarios buscan activamente), ROI claro para aseguradoras (reducción hospitalización psiquiátrica). Deal size $100k-400k para plataformas o aseguradoras.

---

## 8. ARPA-H + agentic AI: el futuro de la atención clínica autónoma

**Qué está pasando:** ARPA-H (Advanced Research Projects Agency for Health) lanzó el primer programa para desarrollar un **agente AI clínico autorizado por FDA** que puede autónomamente: ajustar citas, modificar dosis de medicamentos, adaptar dieta/ejercicio, con un "overseer agent" monitoreando seguridad continua.

**Timeline:** Prototipo 2026-2027. First FDA authorization esperada 2028.

**Implicación para Globant:** La infraestructura para agentes clínicos autónomos se está construyendo ahora. Los proyectos que construyan capacidades de audit trail, human oversight, y FHIR integration hoy son los que tendrán la ventaja cuando la regulación permita despliegue más autónomo.

---

## Radar resumen julio 2026

```
ADOPT NOW                TRIAL                  WATCH               HOLD
─────────────────────────────────────────────────────────────────
MONAI (imaging)          MedSAM-Agent           ARPA-H agentic FDA  Full-auto diagnosis
medspacy ES/PT           FHIR-AgentBench        EU AI Act impact     Black-box clinical AI
MEDITRON fine-tuning     Healthcare Agent Orch  HealthBench scoring  GPT-4 for HIPAA data
HAPI FHIR + Medplum      OpenScribe (scribe)    MIMIC-IV fine-tune  Wearable-only AI
MDTeamGPT pattern        CHI-Bench workflows    Mental health AI     LLM diagnosis (solo)
PyHealth (predictive)    MCP-FHIR agents        Federated learning  
LangGraph human gates                                               
```
