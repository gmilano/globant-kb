# 📡 Tendencias — Healthcare AI 2026

> Señales de mercado, tecnológicas y regulatorias. Basado en investigación profunda.
> Última actualización: 2026-07-08 (v3 — Trend 7: FDA SaMD, Trend 8: MedAgentBench era, Trend 9: LATAM AI medical trials)

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

| Benchmark | Qué mide |
|-----------|----------|
| CHI-Bench | Agentes AI en flujos de trabajo healthcare |
| MedMemoryBench | Memoria de agentes en atención personalizada |
| SEMA-RAG | Multi-agent RAG para razonamiento médico |
| DermAgent | Agentes multimodal dermatología |
| COTCAgent | Consulta preventiva chain-of-thought |

---

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

**Qué miden**:
- ¿Puede el agente navegar un EHR real y tomar decisiones clínicas?
- ¿Puede hacer multi-step reasoning sobre miles de recursos FHIR?
- ¿Maneja correctamente preguntas que requieren integrar datos de múltiples encuentros?

**Implicación**: Los proyectos healthcare AI deben incluir evaluación rigurosa usando estos benchmarks antes de ir a producción. Claude-based agents lideran en ambos.

---

## 🔥 Tendencia #9: LATAM como "testing ground" para AI médico

**Señal** (Medical Device Online, 2026): Latin America is becoming the testing ground for AI-enabled medical device clinical trials.

**Razones**:
- Diversidad genética y epidemiológica única
- Costos de ensayo clínico menores que en EEUU/Europa
- Regulaciones más rápidas en países como Colombia, Brasil (ANVISA track)
- Alta penetración de telemedicina (46.7% del revenue digital health)
- Ecosistemas emergentes: Bogotá (Colombia), São Paulo (Brasil), Santiago (Chile)

**Oportunidades específicas**:
- AI para TB, Chagas, dengue (epidemiología regional)
- Telemedicina para poblaciones rurales dispersas (Chile, Perú, Colombia)
- Diagnóstico asistido donde hay escasez de especialistas (radiología, dermatología)
- Prior authorization en sistemas de salud pública (SUS, IMSS, FONASA)

**Para Globant**: Ser partner de referencia de startups healthtech LATAM que necesitan AI + delivery + compliance. Deal size $150k–$800k.

---

## Repos más activos esta semana (señal GitHub)

- [bowang-lab/MedRAX](https://github.com/bowang-lab/MedRAX) — radiología AI con agentes (ICML 2025), acelerando en adopción hospitalaria
- [FreedomIntelligence/OpenClaw-Medical-Skills](https://github.com/FreedomIntelligence/OpenClaw-Medical-Skills) — 869 skills médicos, explosión de tracción
- [AgenticHealthAI/Awesome-AI-Agents-for-Healthcare](https://github.com/AgenticHealthAI/Awesome-AI-Agents-for-Healthcare) — curación activa, papers 2026
- [the-momentum/fhir-mcp-server](https://github.com/the-momentum/fhir-mcp-server) — estándar emergente FHIR↔LLM
- [openmed-labs/openmed-agent](https://github.com/openmed-labs/openmed-agent) — prior auth automation en auge
- [ohcnetwork/care_fe](https://github.com/ohcnetwork/care_fe) — Digital Public Good en expansión global
