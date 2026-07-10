# 📡 Tendencias — Healthcare AI 2026

> Señales de mercado, tecnológicas y regulatorias. Basado en investigación profunda.
> Última actualización: 2026-07-10 (v7 — T21 Assort Health Agentic OS, T22 Sovereign AI hospital, T23 Cardiology specialization wave, T24 Benchmark cascade del mundo real)

## 🔥 Tendencia #1: Agentic AI pasa de piloto a empresa

**Señal**: BCG (Ene 2026) — "How AI Agents Will Transform Health Care in 2026"
- 80% de ejecutivos healthcare esperan valor "moderado a significativo" de agentes AI
- 61% ya tiene budgets aprobados para agentic AI en 2026
- Solo 3% tiene agentes en producción → **la mayor brecha piloto→producción en cualquier industria**

**Implicación para Globant**: Empresas de mid-market (hospitales regionales, clínicas) buscan implementadores que conozcan el stack open source — no tienen budget para Epic+Nuance.

---

## 🔥 Tendencia #2: FHIR + MCP = La infraestructura AI de salud

**Señal**: 4 FHIR MCP servers lanzados en 2026 en 6 meses (Momentum, WSO2, xSoVx, AWS)
- OpenEMR 8.0.0 (Mar 2026): SMART on FHIR v2.2.0 + US Core 8.0
- OpenMRS: FHIR R4 nativo en todos los módulos

**Patrón emergente**: `EHR (FHIR API) → MCP Server → Claude/GPT-4o → Agente clínico`

---

## 🔥 Tendencia #3: OpenClaw como "sistema operativo" clínico

**Señal**: OpenClaw fue de 9,000 a 188,000 stars en 60 días (record GitHub). OpenClaw-Medical-Skills tiene 869 módulos clínicos.

**Implicación**: OpenClaw puede ejecutar orquestación compleja de agentes clínicos especializados — diagnóstico, prescripción, documentación — sin que cada módulo necesite razonar sobre todos los contextos.

---

## 🔥 Tendencia #4: Privacy-first AI en salud (HIPAA + LGPD)

**Señal**: openmed (maziyarpanahi) tiene 4k★ y creciendo. BioChatter soporta Ollama local.

**Stack on-premise**: OpenMRS (local) + medspaCy (local) + Ollama/Llamafile + HAPI FHIR (local) = EHR AI completamente sin cloud

---

## 🔥 Tendencia #5: LATAM digital health en explosión

| País | Driver | Oportunidad AI |
|------|--------|----------------|
| Brasil | Plan Lula $4B AI; SUS 214M usuarios | AI para salud pública + telemedicina |
| Argentina | CAGR más alto 2026-2031; crisis impulsa telemedicina | Autorización de coberturas AI; triage |
| México | Turismo médico $6B/año; expansión seguro privado | Diagnóstico asistido; prior auth |
| Colombia | Ecosistema healthtech emergente Bogotá | Plataformas digitales salud |
| Chile | Isapre en crisis → eficiencia con AI | Gestión de prestaciones + AI |

---

## 📊 Tendencia #6: Ambient AI Scribe dominando documentación clínica

**Señal**: Epic integró AI scribe nativo; Nuance DAX Copilot ($150M ARR); ecosistema open source explota (scribeHC, OpenScribe, AI-Medical-Scribe, FlowMemo).

**Impacto documentado**: Reducción de 2-4 horas diarias de carga administrativa por médico.

**Open source**: Whisper (transcripción) + Claude (nota SOAP) + fhir-mcp-server (write al EHR) = alternativa a fracción del costo ($500-3,000/médico/mes → $50k-200k implementación).

---

## 🆕 Tendencia #7: FDA SaMD pathway — LLMs como dispositivos médicos (LANDMARK)

**Señal**: UpDoc FDA 510(k) K253281 — anunciado 25 jun 2026 — **primer SaMD con LLM patient-facing aprobado** por la FDA.
- Indicación: titulación de insulina para adultos con T2DM
- EHR-integrado: cada acción visible y auditable por el clínico
- Despliegues iniciales: Cleveland Clinic, AHN, UCSF

**Patrón de diseño requerido**:
```
Indicación estrecha + Predicado 510(k) + Evidencia clínica + Sandboxing estricto + Audit trail
```

---

## 🔥 Tendencia #8: MedAgentBench + FHIR-AgentBench — la era de la evaluación rigurosa

**Señal**: MedAgentBench (NEJM AI, Stanford): 300 tareas FHIR-compliant. Claude 3.5 Sonnet v2 → 69.67% de éxito. PhysicianBench (arXiv:2605.02240): 100 tareas long-horizon, 21 especialidades.

---

## 🔥 Tendencia #9: LATAM como "testing ground" para AI médico

**Señal** (Medical Device Online, 2026): Latin America is becoming the testing ground for AI-enabled medical device clinical trials.

**Para Globant**: Ser partner de referencia de startups healthtech LATAM. Deal size $150k–$800k.

---

## 🔥 Tendencia #10: TEFCA supera 1 billón de intercambios

**Señal**: HHS anuncia que TEFCA superó **1 billón de intercambios** de registros de salud (Jul 2026). De 10 millones a 1 billón en menos de 1 año. SSA se unió → disability claims 50%+ más rápido.

---

## 🔥 Tendencia #11: NVIDIA Survey — 70% de organizaciones healthcare usan AI y ven ROI real

**Señal**: NVIDIA State of AI in Healthcare Report 2026 (600+ profesionales):
- **70%** de organizaciones healthcare activamente usando AI
- **85%** de management reporta **mayor revenue** con AI; **80%** reporta **reducción de costos**
- **Agentic AI** (debut en el survey): **47%** evaluando o usando ya

---

## 🔥 Tendencia #12: NemoClaw — Enterprise Security para Agentes Healthcare (NVIDIA GTC 2026)

**Señal**: NVIDIA lanza NemoClaw (16 mar 2026). PHI → modelos Nemotron locales; reasoning complejo → Claude/GPT (sin PHI). Kernel-level sandbox, RBAC, audit logging.

---

## 🔥 Tendencia #13: Drug Discovery AI entra en "Era Clínica"

**Señal** (BIO USA 2026): **46%** de pharma/biotech reporta drug discovery como top ROI use case. BioNeMo expandido como plataforma open AI para biología, química, genómica. NVIDIA Proteina-Complexa: 1M+ binders diseñados.

---

## 🆕 Tendencia #14: CHI-Bench — Los agentes aún fallan 72% de los casos clínicos reales

**Señal** (arXiv:2605.16679): 75 flujos end-to-end, 20 apps hospitalarias reales, 87 MCP tools, 1,279 documentos de operaciones, coalición 20+ instituciones (JHU, Yale, Stanford, CMU, Oxford).

**Para Globant**: Usar CHI-Bench como gate de calidad. Especializar agentes por rol. Incorporar el handbook de operaciones del cliente como Skill.md.

---

## 🆕 Tendencia #15: ARPA-H ADVOCATE — Blueprint para agentes clínicos FDA-authorized

**Señal** (Jun 2026): ARPA-H ADVOCATE para primer agente AI cardiovascular FDA-authorized 24/7.
```
Agente Primario (patient-facing)
     ↕ supervisory protocol
Agente Supervisorio (safety + efficacy monitor)
     ↓ flags para revisión humana
Clínico (validates + overrides)
     ↓ FHIR AuditEvent
Audit trail inmutable
```

---

## 🆕 Tendencia #16: FDA CDS Guidance 2026 — La mayoría de CDSS AI son Non-Device si se diseñan bien

**Señal**: FDA actualiza guía de Clinical Decision Support (Ene 2026):
- AI revisable + médico puede verificar lógica → **Non-Device** → sin 510(k)
- AI autónoma + black-box + altamente influyente → Device regulado

**Para Globant**: Diseñar siempre con "explainability layer" + "clinician review step" desde el sprint 1.

---

## 🆕 Tendencia #17: Adopción médica masiva — 81% de médicos US usan AI en 2026

**Señal**: 81% de médicos US usan AI (vs. 38% en 2023 — más del doble en 3 años). 75% de health systems US tienen al menos una app AI activa.

---

## 🆕 Tendencia #18: Back-office AI — El ROI más rápido en healthcare

| Use case | ROI documentado | Deal size |
|----------|-----------------|-----------|
| Prior authorization automation | PA: 8h→30s (UHG) | $150k–$500k |
| Fax routing + referral triage | 5k faxes/mes automatizados (Duke via Trase) | $100k–$400k |
| Patient access agentic OS | 115% labor capacity (Assort Health) | $80k–$300k |
| Revenue cycle AI | $400M ahorros (HCA escala) | $200k–$800k |
| Clinical data normalization | Registros fragmentados → FHIR en minutos (xCures) | $150k–$500k |

---

## 🆕 Tendencia #19: Open Source Scribe Wave

**Señal**: En julio 2026, al menos 4 proyectos open source de ambient scribe han emergido: scribeHC, OpenScribe, AI-Medical-Scribe, FlowMemo. Todos MIT. La brecha de costo con propietario ($500-3,000/médico/mes) se cierra rápidamente.

---

## 🆕 Tendencia #20: Hierarchical Multi-Agent Radiology (ACL 2026)

**Señal**: MARCH (arXiv:2604.16175, ACL 2026) — Resident Agent → Fellow Agents (RAG) → Attending Agent (consenso iterativo). Supera SOTA en RadGenome-ChestCT. Arquitectura generalizable a patología, cardiología, psiquiatría.

---

## 🆕🆕 Tendencia #21: Assort Health — El Agentic OS para el Patient Journey (Jun 2026)

**Señal**: Assort Health $120M Series C @ $1.2B (Jun 24, 2026, Menlo Ventures). Total recaudado: $222M+.

**Lo que hace**: Lo que comenzó como voice AI para scheduling se convirtió en un **sistema operativo agéntico para el patient journey completo**:
- Scheduling → Intake → Referrals → Document Processing → Medication Refills → Eligibility → Lab Requests → Payments
- **Synapse**: modelo AI propietario que aprende los patrones de specialty workflows + genera edge cases + tests + simulaciones
- **190M+ patient interactions** | 62,000 care protocols | 1.6M decision pathways
- **Métricas producción**: 5% lift en appointments, **115% aumento en labor capacity**, 4.3/5 patient satisfaction
- **20x crecimiento en revenue** en 15 meses

**Qué define el patrón "Agentic OS for Patient Journey"**:
1. Un único sistema orquesta todos los touchpoints del paciente (inicio a fin)
2. El modelo propietario aprende workflows específicos de cada especialidad
3. Se mide por labor capacity liberada, no solo por tasks automatizadas
4. La data acumulada (190M interacciones) es el moat competitivo

**Open source replicable**:
```
LangGraph (orquestación de agentes por touchpoint)
     + Claude API (voice + text intelligence)
     + FHIR MCP Server (scheduling, eligibility, labs)
     + Medplum Bots (triggers en tiempo real)
     + fhir-mcp-server (write encounters, referrals, orders)
```

**Para Globant**: Deal size $100k-$400k para implementar agentic patient access OS en hospital privado LATAM. El modelo de Assort es reproducible en 3-6 meses partiendo de Medplum + LangGraph + Claude + FHIR MCP. La diferencia es el modelo propietario — Globant puede sustituirlo con Claude fine-tuned sobre los workflows del cliente.

---

## 🆕🆕 Tendencia #22: Sovereign AI Healthcare — El hospital que corre sus propios LLMs (Jul 2026)

**Señal compuesta** (Drug & Device World Ene 2026, HealthVerity blog.healthverity.com/ai-trends-shaping-healthcare-in-2026, Nelson Advisors UK):

**Definición**: Sovereign AI = el hospital despliega, entrena y controla sus propios LLMs en su propia infraestructura on-premises o en un single-tenant environment dedicado. PHI nunca sale del perímetro.

**El pitch al CIO** (textual del mercado):
- "No necesitas Business Associate Agreement para la capa de AI porque PHI nunca sale de tu red"
- "Menor superficie de breach de terceros — no hay vendor que pueda ser vulnerado"
- "Sin pricing leverage del vendor sobre tu compute"
- "Control total de datos, modelos y governance — puedes auditar, modificar o retirar cualquier modelo en cualquier momento"

**Stack técnico Sovereign AI Healthcare**:
```
NVIDIA IGX (healthcare-grade edge computing)
     + Clara (medical imaging AI, on-prem)
     + NIM microservices (NVIDIA, self-hosted)
     + Ollama / vLLM (local LLM serving)
     + Meditron-70B (medical LLM, Apache-2.0, on-prem)
     + HAPI FHIR (local FHIR server)
     + fhir-mcp-server (local bridge LLM ↔ FHIR)
     + Federated learning with TEE (Trusted Execution Environment)
```

**Federated hospital learning** (con TEE):
- Cada hospital entrena el modelo localmente dentro de un enclave confidencial
- Updates cifrados → servidor central dentro de TEE → agregación sin exposición de PHI
- Resultado: modelo colectivamente mejorado, PHI nunca expuesto

**Drivers regulatorios**:
| País | Regulación | Implicación |
|------|-----------|-------------|
| Brasil | LGPD multas 2% facturación | PHI no puede salir de Brasil → Sovereign stack obligatorio |
| México | IMSS/ISSSTE datos gubernamentales | Datos no pueden salir del gobierno → on-prem |
| Argentina | Directiva presidencial AI soberana | Inversión en AI nacional on-prem |
| EU | GDPR Art. 44-49 para transfers | Hospitales EU: PHI on-prem o EU-only cloud |
| UK | NHS Data Residency Policy | PHI en UK; NHS TrustX badge para AI agéntico |

**Gartner 2026**: Transición "cloud-first" → "sovereign-first" en healthcare se completa entre late 2026 y early 2027.

**Para Globant**: Sovereign AI convierte el mayor bloqueador de venta ("no podemos enviar datos a la nube") en una propuesta de valor diferencial. Deal pattern: $200k-$800k para Sovereign AI deployment completo. LATAM es el mercado ideal por drivers regulatorios.

---

## 🆕🆕 Tendencia #23: Ola de especialización por especialidad médica (Mar-May 2026)

**Señal**: En menos de 3 meses (Mar-May 2026) surgieron múltiples agentes especializados por especialidad:

| Agente | Especialidad | Paper | Resultado clave |
|--------|-------------|-------|-----------------|
| HeartAgent | Cardiología (diagnóstico diferencial) | arXiv:2603.10764, Mar 2026 | >36% mejora top-3 accuracy en MIMIC-IV |
| BAAI Cardiac Agent | Cardiología (cardiac MRI) | arXiv:2604.04078, Apr 2026 | Reasoning multimodal sobre CMR |
| EchoAgent | Cardiología (echocardiografía) | arXiv:2604.05541, Apr 2026 | Eyes+Hands+Minds para eco |
| DermAgent | Dermatología (imagen) | arXiv:2605.14403, May 2026 | MICCAI 2026 early accept; 5 benchmarks |
| MARCH | Radiología (CT report) | arXiv:2604.16175, ACL 2026 | Resident→Fellow→Attending; SOTA RadGenome-ChestCT |
| ClinSeekAgent | Evidencia multimodal | arXiv:2605.20176, May 2026 | Automated evidence seeking para razonamiento clínico |

**El patrón arquitectónico de los agentes especialistas**:
1. **Knowledge base específico del dominio** (guías clínicas de la especialidad + datasets históricos)
2. **Sub-agentes con roles del departamento real** (residente + fellow + attending en radiología; mismo patrón en cardio)
3. **Razonamiento verificable** por el especialista: el clínico puede auditar la lógica paso a paso
4. **RAG de especialidad** (Case RAG sobre casos similares + Guideline RAG sobre protocolos oficiales)

**Implicación para Globant**: Los centros de especialidad donde hay escasez de especialistas en LATAM son el mercado natural. Radiólogos, cardiólogos, dermatólogos son los especialistas más escasos en Argentina, Colombia y Perú. Los agentes especializados pueden actuar como "second read" o triage antes del especialista humano. Deal: $120k-$500k para implementar un agente especializado con evaluación rigurosa (PhysicianBench).

---

## 🆕🆕 Tendencia #24: Benchmark cascade — El mundo real es más difícil de lo que los demos sugieren

**Señal**: En 2026, la acumulación de benchmarks rigurosos sobre datos reales revela sistemáticamente que los agentes clínicos tienen una brecha profunda entre demo y producción:

| Benchmark | Resultado top model | Qué mide | Cuándo usar |
|-----------|---------------------|----------|------------|
| CHI-Bench (arXiv:2605.16679) | **28% éxito** | 75 workflows reales; 87 MCP tools; 1,279 policy docs | Prior auth, utilization management, care management |
| EHR-Complex (arXiv:2606.23301) | **62.3% accuracy** | SQL clínico MIMIC-IV; 52K tasks; 31.93 SQL components/query | Analytics clínico sobre datos estructurados |
| PhysicianBench (arXiv:2605.02240) | TBD | 100 long-horizon tasks; 21 especialidades; FHIR real | Agentes a nivel physician en EHR |
| MedAgentBench | **69.67%** (Claude 3.5) | 300 tareas EHR virtuales; 700k data elements | Agentes EHR en general |

**Los 3 modos de falla dominantes** (analysis de EHR-Complex + CHI-Bench):
1. **SQL/policy logic errors**: seguir reglas complejas simultáneamente falla
2. **Medical-code lookup failures**: ICD-10 / CPT / SNOMED → el agente desconoce o confunde códigos
3. **Semantic misunderstandings**: el agente no comprende el intento clínico detrás de la consulta

**Para Globant**:
- Usar los 4 benchmarks como tríada de evaluación **antes de comprometer un timeline de producción**
- El resultado real del benchmark es el número honesto que presentas al CIO, no el de un demo controlado
- Los modos de falla indican las especializaciones de engineering requeridas: dictionary de medical codes + policy RAG + clinical intent parsing
- Proyectos que Globant cotice deben aclarar qué benchmarks pasaron y cuáles no — la transparencia genera confianza y reduce riesgo de reputación

---

## Repos más activos esta semana (señal GitHub — v7)

- [YizeezLiu/DermAgent](https://github.com/YizeezLiu/DermAgent) — MICCAI 2026 early accept; dermatología Plan-Execute-Reflect; 5 benchmarks; supera SOTA MLLMs
- [NJU-RL/MA-RAG](https://github.com/NJU-RL/MA-RAG) — ICML 2026; multi-round agentic RAG: conflict → consensus; codebase oficial NJU
- [HealthRex/PhysicianBench](https://github.com/HealthRex/PhysicianBench) — Stanford HealthRex; 100 long-horizon tasks; 21 especialidades; FHIR real
- [AgenticHealthAI/Awesome-AI-Agents-for-Healthcare](https://github.com/AgenticHealthAI/Awesome-AI-Agents-for-Healthcare) — curación activa; HeartAgent, DermAgent, MA-RAG, PhysicianBench ya en la lista
- [actava-ai/chi-bench](https://github.com/actava-ai/chi-bench) — 87 MCP tools, 72% failure rate; el listón de calidad más alto publicado
- [stanfordmlgroup/MedAgentBench](https://github.com/stanfordmlgroup/MedAgentBench) — NEJM AI benchmark estándar EHR
- [masslight/ottehr](https://github.com/masslight/ottehr) — EHR AI-native + scribe incluido; tracción acelerada
- [trevorpfiz/scribeHC](https://github.com/trevorpfiz/scribeHC) — open source ambient scribe full-stack
- [medplum/medplum](https://github.com/medplum/medplum) — plataforma FHIR TypeScript enterprise
- [openmed (maziyarpanahi)](https://github.com/maziyarpanahi/openmed) — base del Sovereign AI stack on-premise

---
