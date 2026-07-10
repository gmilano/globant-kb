# 📡 Tendencias — Healthcare AI 2026

> Señales de mercado, tecnológicas y regulatorias. Basado en investigación profunda.
> Última actualización: 2026-07-10 (v6 — T18 Back-office AI ROI masivo (UHG/HCA), T19 Open source scribe wave, T20 Hierarchical multi-agent radiology MARCH)

## 🔥 Tendencia #1: Agentic AI pasa de piloto a empresa

**Señal**: BCG (Ene 2026) — "How AI Agents Will Transform Health Care in 2026"
- 80% de ejecutivos healthcare esperan valor "moderado a significativo" de agentes AI
- 61% ya tiene budgets aprobados para agentic AI en 2026
- Solo 3% tiene agentes en producción → **la mayor brecha piloto→producción en cualquier industria**

**Qué significa**: Los hospitales grandes (Mayo Clinic, Mount Sinai) están usando AI para:
- Ambient scribes que reducen carga administrativa de médicos
- Alertas tempranas de sepsis con reducción documentada de mortalidad
- Predicción de readmisión para planificación proactiva de alta
- Identificación de interacciones medicamentosas en polifarmacia

**Implicación para Globant**: Empresas de mid-market (hospitales regionales, clínicas) buscan implementadores que conozcan el stack open source — no tienen budget para Epic+Nuance.

---

## 🔥 Tendencia #2: FHIR + MCP = La infraestructura AI de salud

**Señal**: 4 FHIR MCP servers lanzados en 2026 en 6 meses (Momentum, WSO2, xSoVx, AWS)
- OpenEMR 8.0.0 (Mar 2026): SMART on FHIR v2.2.0 + US Core 8.0
- OpenMRS: FHIR R4 nativo en todos los módulos
- AWS HealthLake + MCP Server: integración cloud enterprise
- Bahmni: roadmap FHIR activo

**Patrón emergente**: `EHR (FHIR API) → MCP Server → Claude/GPT-4o → Agente clínico`

**Implicación**: El FHIR MCP server se está convirtiendo en el estándar de facto para conectar LLMs con datos clínicos. Quien implemente esto primero para un cliente define el stack de la siguiente década.

---

## 🔥 Tendencia #3: OpenClaw como "sistema operativo" clínico

**Señal**: OpenClaw fue de 9,000 a 188,000 stars en 60 días (record GitHub). OpenClaw-Medical-Skills tiene 869 módulos clínicos.

Papers clave (Mar 2026):
- "When OpenClaw Meets Hospital: Toward an Agentic Operating System for Dynamic Clinical Workflows"
- "MedOpenClaw: Auditable Medical Imaging Agents Reasoning over Uncurated Full Studies"
- CHI-Bench: primer benchmark de agentes para flujos de trabajo healthcare

**Implicación**: OpenClaw puede ejecutar orquestación compleja de agentes clínicos especializados — diagnóstico, prescripción, documentación — sin que cada módulo necesite razonar sobre todos los contextos.

---

## 🔥 Tendencia #4: Privacy-first AI en salud (HIPAA + LGPD)

**Señal**: openmed (maziyarpanahi) tiene 4k★ y creciendo. BioChatter soporta Ollama local. openmed-agent es "private, sandboxed".

**Driver**: Regulación de privacidad se endurece:
- US: HIPAA enforcement activo en AI (HHS guidance 2026)
- Brasil: LGPD con multas hasta 2% de facturación → demanda on-premise
- Argentina/México: regulaciones espejo emergentes

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

**Señal**: Epic integró AI scribe nativo; Nuance DAX Copilot ($150M ARR); OpenAI y Anthropic lanzando soluciones específicas para EHR.

**Qué hace**: Transcribe la consulta médico-paciente → genera nota SOAP clínica → escribe en EHR automáticamente.

**Impacto documentado**:
- Reducción de 2-4 horas diarias de carga administrativa por médico
- Aumento de 30-40% en satisfacción del médico (menos burnout)
- Implementación en hospitales académicos (Mayo, Mount Sinai, Cleveland Clinic)

**Open source**: Combinando Whisper (transcripción) + Claude/GPT-4o (nota SOAP) + fhir-mcp-server (write al EHR) se puede replicar a fracción del costo.

---

## 🆕 Benchmarks emergentes (2026)

| Benchmark | Arxiv | Qué mide | Key finding |
|-----------|-------|----------|-------------|
| χ-Bench (CHI-Bench) | 2605.16679 | Agentes en workflows healthcare end-to-end | Mejor agente: 72% falla en casos reales |
| MedAgentBench (Stanford) | 2501.14654 | Agentes LLM en entorno EHR virtual realista | Claude 3.5 Sonnet v2: 69.67% success |
| FHIR-AgentBench | 2509.19319 | Reasoning multi-step sobre historias FHIR | 2,931 preguntas clínicas reales |
| ChestAgentBench (MedRAX) | ICML 2025 | Diagnóstico CXR con agentes LLM | 2,500 consultas diagnósticas CXR |
| Medmarks | 2605.01417 | Benchmark comprehensivo LLM tareas médicas | Open-source benchmark suite |
| PhysicianBench | 2605.02240 | Agentes LLM en EHR de mundo real | Evaluación nivel physician |
| MedMemoryBench | AgenticHealthAI | Memoria de agentes en atención personalizada | — |

---

## 🔥 Tendencia #7: FDA SaMD pathway — LLMs como dispositivos médicos (LANDMARK)

**Señal**: UpDoc FDA 510(k) K253281 — anunciado 25 jun 2026 — **primer SaMD con LLM patient-facing aprobado** por la FDA.

**Detalle técnico**:
- Indicación: titulación de insulina para adultos con T2DM
- Predicado 510(k): calculadora de dosis de insulina (predicate device)
- Evidencia: Stanford insulin titration trial
- EHR-integrado: cada acción visible y auditable por el clínico
- Modo: voz o texto → orientación de dosis
- Despliegues iniciales: Cleveland Clinic, AHN, UCSF

**Por qué es un hito histórico**:
- FDA había aprobado 1,000+ AI/ML devices — todos eran "locked algorithms" (no-generativos)
- UpDoc es el primero con **LLM generativo** interactuando directamente con pacientes
- Abre el pathway para: medication management, chronic disease titration, triage scoring, mental health

**Patrón de diseño requerido**:
```
Indicación estrecha + Predicado 510(k) + Evidencia clínica + Sandboxing estricto + Audit trail
```

**Implicación para Globant**: Cualquier proyecto de AI clínica con pacientes en EEUU tiene precedente. El camino está pavimentado.

---

## 🔥 Tendencia #8: MedAgentBench + FHIR-AgentBench — la era de la evaluación rigurosa

**Señal**: Dos benchmarks de clase mundial publicados en semanas:
- **MedAgentBench** (publicado en NEJM AI, Stanford): 300 tareas FHIR-compliant, 100 pacientes virtuales, 700k+ data elements. Claude 3.5 Sonnet v2 → 69.67% de éxito.
- **FHIR-AgentBench** (arXiv:2509.19319): 2,931 preguntas clínicas reales en HL7 FHIR. Evalúa razonamiento multi-step sobre historias clínicas complejas.

**Implicación**: Los proyectos healthcare AI deben incluir evaluación rigurosa usando estos benchmarks antes de ir a producción. Claude-based agents lideran en ambos.

---

## 🔥 Tendencia #9: LATAM como "testing ground" para AI médico

**Señal** (Medical Device Online, 2026): Latin America is becoming the testing ground for AI-enabled medical device clinical trials.

**Oportunidades específicas**:
- AI para TB, Chagas, dengue (epidemiología regional)
- Telemedicina para poblaciones rurales dispersas (Chile, Perú, Colombia)
- Diagnóstico asistido donde hay escasez de especialistas (radiología, dermatología)
- Prior authorization en sistemas de salud pública (SUS, IMSS, FONASA)

**Para Globant**: Ser partner de referencia de startups healthtech LATAM que necesitan AI + delivery + compliance. Deal size $150k–$800k.

---

## 🔥 Tendencia #10: TEFCA supera 1 billón de intercambios — Infraestructura AI en salud alcanza escala

**Señal**: HHS anuncia que TEFCA superó **1 billón de intercambios** de registros de salud (Jul 2026):
- De 10 millones a 1 billón de intercambios en menos de 1 año — aceleración exponencial
- HHS comprometió $1.3M adicionales para reforzar supervisión
- SSA se unió a TEFCA → disability claims 50%+ más rápido

**Patrón habilitado**: `Agente AI → TEFCA → QHIN → Cualquier EHR en la red → Datos actualizados para decisión`

---

## 🔥 Tendencia #11: NVIDIA Survey — 70% de organizaciones healthcare usan AI y ven ROI real

**Señal**: NVIDIA State of AI in Healthcare Report 2026 (600+ profesionales):
- **70%** de organizaciones healthcare activamente usando AI
- **85%** de management reporta **mayor revenue** con AI; **80%** reporta **reducción de costos**
- **Agentic AI** (debut en el survey): **47%** evaluando o usando ya; 4to lugar en adopción

**Top 3 ROI use cases**:
1. Medical imaging analysis (radiology pre-read, pathology)
2. Drug discovery & development (AI-designed molecules en trials)
3. Clinical decision support (diagnóstico diferencial, drug interactions)

---

## 🔥 Tendencia #12: NemoClaw — Enterprise Security para Agentes Healthcare (NVIDIA GTC 2026)

**Señal**: NVIDIA lanza NemoClaw (16 mar 2026) en GTC 2026:

**Tres controles críticos**:
1. **Kernel-level sandbox**: deny-by-default
2. **Privacy router**: PHI → modelos Nemotron locales; reasoning complejo → Claude/GPT (sin PHI)
3. **RBAC + audit logging**: acceso granular por rol + trazabilidad inmutable para compliance

**Patrón clave para HIPAA-compliance**:
```
Paciente input (PHI) → NemoClaw privacy router → Nemotron local (análisis PHI)
                                                 ↓
                     Claude/GPT-5 (reasoning no-PHI) ← contexto anonimizado
                                                 ↓
                                    Respuesta → Audit log FHIR AuditEvent
```

---

## 🔥 Tendencia #13: Drug Discovery AI entra en "Era Clínica" — Moléculas sobre Modelos

**Señal** (BIO USA 2026): El sector biotech AI pasa de "modelos fundacionales" a "moléculas que llegan a trials":
- **NVIDIA Proteina-Complexa**: 1M+ binders diseñados, validados experimentalmente contra 130+ targets
- **46%** de pharma/biotech reporta drug discovery como top ROI use case (NVIDIA Survey 2026)
- BioNeMo expandido como plataforma open AI para biología, química, genómica

**Herramientas open source emergentes**:
- `yboulaamane/awesome-drug-discovery` (MIT): curación activa post-AlphaFold
- `databricks-industry-solutions/ai-driven-drug-discovery` (MIT): pipelines end-to-end
- **AutoResearch AI** (arXiv:2605.23204): Automatización de investigación científica con AI

---

## 🆕 Tendencia #14: CHI-Bench — Los agentes aún fallan 72% de los casos clínicos reales

**Señal** (arXiv:2605.16679, "χ-Bench: Can AI Agents Automate End-to-End, Long-Horizon, Policy-Rich Healthcare Workflows?"):

**El benchmark más exigente publicado hasta la fecha para agentes en healthcare**:
- **75 flujos de trabajo** end-to-end en prior authorization, utilization management, care management
- **20 apps hospitalarias reales** simuladas, expuestas via **87 MCP tools**
- **Manual de 1,279 documentos** de operaciones de managed care
- **30 agentes frontier** evaluados de Anthropic, OpenAI, Google, xAI, DeepSeek, Z.ai
- **Coalición de 20+ instituciones**: Johns Hopkins, Wellstar, Yale, Stanford, CMU, Oxford, USC, UCSD

**Resultado crítico**: El mejor agente disponible falla aproximadamente 7 de cada 10 flujos de trabajo clínicos reales.

**Las 3 capacidades que faltan**:
1. **Policy density**: los agentes no logran seguir una biblioteca de 1,279 reglas simultáneamente
2. **Multi-role composition**: una tarea requiere múltiples roles con handoffs — los agentes los confunden
3. **Multilateral interaction**: diálogos multi-turno reales (peer-to-peer review, patient outreach) — colapsan

**Para Globant**: Este benchmark define la brecha de implementación real. Los demos funcionan; los proyectos fallan. Globant debe:
1. Usar CHI-Bench como gate de calidad antes de deploy en producción
2. Especializar agentes por rol (prior auth agent ≠ utilization management agent ≠ care coordinator)
3. Incorporar el handbook de operaciones del cliente como Skill.md / knowledge base del agente

---

## 🆕 Tendencia #15: ARPA-H ADVOCATE — El gobierno diseña el blueprint para agentes clínicos FDA-authorized

**Señal** (Jun 2026): ARPA-H lanza ADVOCATE (Agentic AI-Enabled Cardiovascular Care Transformation):
- **Objetivo**: primer agente AI con autorización FDA para cuidado cardiovascular 24/7
- **Estructura**: agente clínico patient-facing + agente supervisorio de seguridad/efectividad
- **Timeline**: selección de equipos en 6 meses, "down select" tras 1 año, FDA authorization en ~3 años
- **Precedente**: ARPA-H negociará con FDA un marco regulatorio nuevo para GenAI de alto riesgo

**Arquitectura de referencia que establece**:
```
Agente Primario (patient-facing)
     ↕ supervisory protocol
Agente Supervisorio (safety + efficacy monitor)
     ↓ flags para revisión humana
Clínico (validates + overrides)
     ↓ FHIR AuditEvent
Audit trail inmutable
```

**Para Globant**: ADVOCATE define la arquitectura estándar para cualquier agente clínico de alto riesgo. Los proyectos futuros de cardiovascular/diabetes/mental health AI deberán seguir este patrón: agente-primario + agente-supervisor + human-in-the-loop. Posicionarse como implementador del patrón ADVOCATE.

---

## 🆕 Tendencia #16: FDA CDS Guidance 2026 — La mayoría de CDSS AI son Non-Device si se diseñan bien

**Señal**: FDA actualiza guía de Clinical Decision Support (Ene 2026):

**El cambio clave**:
- **Antes**: ambigüedad sobre qué AI/GenAI cae bajo regulación FDA
- **Ahora**: AI que (1) provee una sola recomendación clínica apropiada + (2) permite al médico revisar la base independientemente → **Non-Device** → sin pathway 510(k) requerido

**Frontera regulatoria clara**:
- ✅ Non-Device: AI decisión-asistida + médico puede verificar lógica + datos accesibles → despliegue rápido
- ❌ Device regulado: agentes autónomos + black-box + altamente influyente → 510(k) o De Novo requerido

**Impacto práctico en proyectos Globant**:
| Tipo de CDSS | Clasificación | Implicación |
|-------------|---------------|-------------|
| Drug interaction checker con justificación | Non-Device | Deploy sin FDA clearance |
| Diagnóstico diferencial explicable con fuentes | Non-Device | Deploy sin FDA clearance |
| Agente autónomo que prescribe sin revisión | Device | 510(k) o De Novo requerido |
| Ambient scribe (documentación, no decisión) | Non-Device | Deploy sin FDA clearance |
| Prior authorization automation (admin) | Non-Device | Deploy sin FDA clearance |

**Para Globant**: Diseñar siempre con "explainability layer" + "clinician review step" desde el sprint 1. Estos dos elementos bastan para clasificar el CDSS como Non-Device y acelerar el time-to-market dramáticamente.

---

## 🆕 Tendencia #17: Adopción médica masiva — 81% de médicos US usan AI en 2026

**Señal múltiple (2026)**:
- **81%** de médicos US usan AI profesionalmente (vs. **38%** en 2023 — más del doble en 3 años)
- **75%** de health systems US tienen al menos una app AI activa (vs. **59%** en 2024)
- **25 líderes healthcare** predicen 2026 como el año de agentes en operaciones clínicas
- **Deloitte 2026**: "Hybrid workforce AI+clinician" → cambio en operating model completo

**Áreas de uso médico más frecuentes (2026)**:
1. Documentación clínica (ambient scribe, 48%)
2. Búsqueda de información / evidencia (44%)
3. Apoyo diagnóstico (32%)
4. Revisión de imágenes (21%)
5. Gestión de medicación / drug interactions (19%)

**El cambio de paradigma**: Los médicos ya no preguntan si usar AI — preguntan cuál usar. La demanda pasa de "experimentar AI" a "implementar AI confiable con evidencia clínica". El competidor ya no es "no AI" sino "AI de baja calidad."

**Para Globant**: La venta ya no es "¿debería usar AI?" — es "¿por qué Globant frente a Epic/Nuance/startups?" La respuesta: open source + LATAM-native + compliance + evaluación rigurosa (CHI-Bench/MedAgentBench gate).

---

---

## 🆕 Tendencia #18: Back-office AI — El ROI más rápido en healthcare (Jul 2026)

**Señal múltiple validada con datos reales**:
- **UnitedHealth Group PreCheck Prior Authorization** (Optum Rx): **8+ horas → menos de 30 segundos** por aprobación de prescripción
- **UnitedHealth AI investment**: $1.5B en 2026; proyecta ~$1B en savings; ROI 2:1 en 2-3 años
- **HCA Healthcare**: $400M en savings proyectados — Nurse Handoff generative AI + revenue management
- **Trase** ($107M seed, Jun 2026): agentes HIPAA+SOC2 para back-office; Duke Health: 5,000+ faxes/mes → automatizados
- **xCures** ($46M Series B, Jun 2026): Clinical clarity engine — fragmentos de registros → decision-ready data en minutos

**El patrón emergente**: Back-office → la entrada más rápida a healthcare AI porque:
1. No requiere FDA clearance (no es decisión clínica directa)
2. ROI tangible e inmediato (costos laborales reducidos vs. personal de PA, referrals, faxes)
3. Genera el trust que desbloquea proyectos clínicos de mayor valor

**Tipos de back-office AI con mayor momentum**:
| Use case | ROI documentado | Deal size |
|----------|-----------------|-----------|
| Prior authorization automation | PA: 8h→30s (UHG) | $150k–$500k |
| Fax routing + referral triage | 5k faxes/mes automatizados (Duke) | $100k–$400k |
| Nurse handoff documentation | Reducción carga cognitiva (HCA) | $80k–$250k |
| Revenue cycle AI | $400M ahorros (HCA escala) | $200k–$800k |
| Clinical data normalization | Registros fragmentados → FHIR en minutos (xCures) | $150k–$500k |

**Para Globant**: Entrar por back-office → demostrar ROI → escalar a clinical. Este es el "land and expand" de healthcare AI. UHG y HCA han validado el mercado. Globant puede replicar a hospital mid-market que no tiene el budget de UHG pero sí el problema.

---

## 🆕 Tendencia #19: Open Source Scribe Wave — El modelo SaaS propietario enfrenta presión real (Jul 2026)

**Señal**: En julio 2026, al menos 4 proyectos open source de ambient scribe han emergido con bases de código maduras:
- **scribeHC** (trevorpfiz/scribeHC, MIT): Expo + Next.js + FastAPI → SOAP notes
- **OpenScribe** (Open-scribe/OpenScribe, MIT): full-stack, full control datos
- **AI-Medical-Scribe** (hutchpd, MIT): browser-only, Chrome AI built-in, zero backend
- **FlowMemo** (aouabfeddali, MIT): lightweight, ambulatorio

**El contexto**: El mercado de scribes propietarios cobra $500-3,000/médico/mes:
- Nuance DAX Copilot: $150M ARR
- Abridge: $100M Series C (2025)
- Nabla, Suki: decenas de millones en revenue

**Por qué esto importa**: La brecha de costo entre propietario y open source se cierra rápidamente. Los modelos de audio (Whisper) y texto (Claude/GPT) son buenos enough para notas SOAP estándar. La diferencia está en soporte, integración, idioma.

**La oportunidad para Globant**: Los proyectos open source de scribes son bases de código, no productos. Globant puede:
1. Tomar scribeHC como base (MIT, ya tiene Expo + FastAPI)
2. Customizar para español/portugués médico (LATAM)
3. Integrar con OpenMRS/OpenEMR/Medplum via FHIR MCP
4. Ofrecer como managed solution con soporte 24/7

**Deal size**: $50k-$200k implementación + $500-2,000/mes soporte. Mucho más competitivo que DAX para hospitales LATAM o US mid-market.

---

## 🆕 Tendencia #20: Hierarchical Multi-Agent Radiology — De Agentes Monolíticos a Jerarquía Médica Real (ACL 2026)

**Señal**: MARCH (arXiv:2604.16175, ACL 2026) — _"Multi-Agent Radiology Clinical Hierarchy for CT Report Generation"_

**El cambio de paradigma**: Los agentes radiológicos de primera generación (MedRAX, etc.) usaban un LLM multimodal monolítico. MARCH introduce la jerarquía de departamentos reales de radiología:
```
Resident Agent → Draft inicial con extracción multi-escala de features CT
    ↓
Fellow Agent(s) → Revisión con RAG sobre casos similares
    ↓
Attending Agent → Consensus iterativo (stance-based discourse) → Reporte final
```

**Por qué esto supera al enfoque monolítico**:
1. Hallazgos iniciales del Resident → revisados por Fellow RAG → resuelven ambigüedades con fuentes
2. El Attending no aprueba automáticamente — genera un discourse iterativo hasta consenso
3. Cada agente tiene su "especialización" y protocolo de deferencia (como la realidad hospitalaria)

**Benchmarks**: Supera SOTA en RadGenome-ChestCT en fidelidad clínica + precisión lingüística.

**Extensión al patrón**: La arquitectura jerárquica es generalizable más allá de radiología:
- Patología: Resident Agent (slide review) → Fellow Agent (molecular context) → Attending Agent (tumor board consensus)
- Cardiología: Residente (ECG reading) → Fellow (historia cardíaca) → Attending Agent (management plan)
- Psiquiatría: Clinician Agent (síntomas) → Supervisor Agent (DSM criteria check) → Treatment Agent (plan)

**Para Globant**: Cuando construyas agentes de diagnóstico, adoptar MARCH-style hierarchy en lugar de agentes monolíticos. Demostrable con datos: lower hallucination rate en reports, mejor fidelidad clínica, más aceptable para radiólogos revisores (emulan su workflow real).

---

## Repos más activos esta semana (señal GitHub)

- [bowang-lab/MedRAX](https://github.com/bowang-lab/MedRAX) — radiología AI con agentes (ICML 2025), acelerando en adopción hospitalaria
- [FreedomIntelligence/OpenClaw-Medical-Skills](https://github.com/FreedomIntelligence/OpenClaw-Medical-Skills) — 869 skills médicos, explosión de tracción
- [AgenticHealthAI/Awesome-AI-Agents-for-Healthcare](https://github.com/AgenticHealthAI/Awesome-AI-Agents-for-Healthcare) — curación activa, papers 2026
- [the-momentum/fhir-mcp-server](https://github.com/the-momentum/fhir-mcp-server) — estándar emergente FHIR↔LLM
- [openmed-labs/openmed-agent](https://github.com/openmed-labs/openmed-agent) — prior auth automation en auge
- [ohcnetwork/care_fe](https://github.com/ohcnetwork/care_fe) — Digital Public Good en expansión global
- [medplum/medplum](https://github.com/medplum/medplum) — Plataforma FHIR TypeScript enterprise
- [actava-ai/chi-bench](https://github.com/actava-ai/chi-bench) — Benchmark 87 MCP tools, 72% failure rate — señal del estado real del arte
- [stanfordmlgroup/MedAgentBench](https://github.com/stanfordmlgroup/MedAgentBench) — NEJM AI benchmark estándar EHR
- [yhzhu99/HealthFlow](https://github.com/yhzhu99/HealthFlow) — Self-evolving multi-agent EHR framework
- [masslight/ottehr](https://github.com/masslight/ottehr) — Primer EHR open source AI-native con ambient scribe integrado
- [trevorpfiz/scribeHC](https://github.com/trevorpfiz/scribeHC) — Open source ambient scribe full-stack (Expo + FastAPI)
- [Open-scribe/OpenScribe](https://github.com/Open-scribe/OpenScribe) — AI scribe open source sin vendor lock-in
