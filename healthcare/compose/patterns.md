# 🧩 Patrones de composición — Healthcare AI

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-11 (v8 — P18 Drug Interaction Checker, P19 Triage Chatbot paciente, P20 MedAgents CDSS multi-especialidad — 20 patrones totales)

## Arquitectura base

```
[EHR Open Source (OpenMRS / OpenEMR / Bahmni)]
          ↓ FHIR R4 API
[FHIR MCP Server (the-momentum/fhir-mcp-server)]
          ↓ Model Context Protocol
[Agente AI (openmed-agent / Claude / LangGraph)]
          ↓ NLP / Reasoning / Imágenes
[Herramientas especializadas (medspaCy / torchio / cTAKES)]
          ↓
[UI conversacional / API REST para el cliente]
```

---

## Patrón 1: Ambient AI Scribe (Transcripción → Nota Clínica → EHR)

**Caso de uso**: Reducir 2-4h de carga administrativa diaria por médico; auto-generar notas SOAP.

**Repos**: `openai/whisper` + `biocypher/biochatter` + `the-momentum/fhir-mcp-server` + `openemr/openemr`

**Flujo**:
```
Consulta médico-paciente (audio)
    ↓ Whisper (transcripción ASR local)
Transcript de texto
    ↓ LLM (Claude claude-sonnet-5 o GPT-4o)
Nota SOAP estructurada
    ↓ fhir-mcp-server (write Patient/Encounter/Observation FHIR)
OpenEMR / OpenMRS actualizado automáticamente
```

**Código mínimo (Python)**:
```python
import whisper
import anthropic
import requests

model = whisper.load_model("base")
result = model.transcribe("consulta.mp3")
transcript = result["text"]

client = anthropic.Anthropic()
message = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": f"""Eres un asistente médico clínico. Genera una nota SOAP estructurada 
        a partir de esta transcripción de consulta médica:
        
        {transcript}
        
        Formato: Subjetivo, Objetivo, Análisis, Plan. Incluye ICD-10 codes cuando aplique."""
    }]
)
soap_note = message.content[0].text

headers = {"Content-Type": "application/fhir+json"}
encounter = {
    "resourceType": "Encounter",
    "status": "finished",
    "text": {"status": "generated", "div": f"<div>{soap_note}</div>"}
}
requests.post("http://fhir-server:8080/fhir/Encounter",
              json=encounter, headers=headers)
```

**Time-to-value**: 4-6 semanas. **ROI**: 2-4h médico/día ahorradas. **Deal size**: $50k-$200k.

---

## Patrón 2: Prior Authorization Automation (PA Agéntico)

**Caso de uso**: Automatizar decisiones de prior authorization de prescripciones/procedimientos. ROI referencia: UHG PreCheck PA 8h → 30s.

**Repos**: `openmed-agent` + `the-momentum/fhir-mcp-server` + `openemr/openemr` + LangGraph

**Flujo**:
```
Solicitud de PA (médico o sistema)
    ↓ FHIR MCP Server (retrieve: patient history, diagnosis, medications, prior auths)
Contexto clínico completo
    ↓ openmed-agent (PA reasoning agent)
Decisión preliminar + justificación clínica
    ↓ [Human gate] Revisor aprueba/rechaza/modifica
Decisión final → FHIR Coverage.authorizationRequired write
    ↓ Notificación al médico + paciente
```

**Código mínimo (Python)**:
```python
from langgraph.graph import StateGraph, END
import anthropic

client = anthropic.Anthropic()

def pa_analysis_agent(state):
    """Prior authorization analysis agent."""
    patient_context = state["patient_context"]
    
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2048,
        system="""Eres un especialista en revisión de prior authorization. 
        Analiza la solicitud según criterios de necesidad médica, alternativas menos costosas,
        guías clínicas y política del pagador. Provee:
        1. Recomendación (Aprobado/Negado/Más información)
        2. Justificación clínica con referencias a guías
        3. Criterios cumplidos/no cumplidos
        4. Alternativas si aplica
        Cada decisión debe ser revisable por el médico tratante.""",
        messages=[{
            "role": "user",
            "content": f"Analiza esta solicitud de PA:\n{patient_context}"
        }]
    )
    
    return {**state, "pa_decision": response.content[0].text, "requires_human_review": True}

def human_review_gate(state):
    """Gate: human must review before PA decision is finalized."""
    return "approved" if state.get("human_approved") else "pending"

graph = StateGraph(dict)
graph.add_node("analyze", pa_analysis_agent)
graph.add_node("human_review", lambda s: s)  # human-in-the-loop
graph.add_conditional_edges("human_review", human_review_gate,
    {"approved": END, "pending": "human_review"})
graph.set_entry_point("analyze")
graph.add_edge("analyze", "human_review")
pa_workflow = graph.compile()
```

**Time-to-value**: 12-20 semanas. **ROI**: 8h → <30s por PA. **Deal size**: $150k-$500k.

---

## Patrón 3: CDSS Non-Device (Clinical Decision Support)

**Caso de uso**: Apoyo diagnóstico o farmacológico donde el médico puede verificar la lógica (FDA Non-Device CDS pathway).

**Repos**: `Healthcare-AI-CDSS-LangGraph` + PubMed API + `medspaCy` + `fhir-mcp-server`

**Flujo**:
```
Input clínico (síntomas, labs, medicamentos)
    ↓ medspaCy (NER: entidades clínicas, negation, temporalidad)
Entidades estructuradas
    ↓ PubMed RAG (evidence retrieval con fuentes citables)
Evidencia médica relevante
    ↓ LLM con chain-of-thought explicable
Recomendación con justificación verificable
    ↓ [Médico ve razonamiento paso a paso]   ← FDA Non-Device requirement
EHR write solo si médico aprueba
```

**Clasificación FDA**: Non-Device (médico puede verificar lógica independientemente). Sin 510(k) requerido. **Deal size**: $80k-$300k.

---

## Patrón 4: FHIR-MCP Medical Agent (Query EHR en lenguaje natural)

**Caso de uso**: Agente que permite a médicos o staff interrogar el EHR en lenguaje natural.

**Repos**: `the-momentum/fhir-mcp-server` + `openmed-agent` + Claude Desktop/API

**Flujo**:
```
Médico: "¿Cuál fue el último A1c de Juan Pérez y cuándo fue?"
    ↓ Claude + FHIR MCP Server
fhir_mcp.search_patient(name="Juan Pérez")
fhir_mcp.get_observations(patient_id=..., code="LOINC:4548-4")  # A1c LOINC
    ↓ Claude interpreta
"El último HbA1c fue 7.2% el 15 de marzo de 2026."
```

**Time-to-value**: 2-4 semanas. **Deal size**: $40k-$120k como módulo de un proyecto mayor.

---

## Patrón 5: Drug Discovery AI Stack (Biotech/Pharma)

**Caso de uso**: Aceleración de descubrimiento de fármacos con AI para biotech/pharma mid-market.

**Repos**: `biocypher/biochatter` + `yboulaamane/awesome-drug-discovery` tools + BioNeMo NIM

**Flujo**:
```
Target clínico (proteína, gen, pathway)
    ↓ BioNeMo NIM (protein structure prediction, molecular generation)
Candidatos moleculares generados
    ↓ awesome-drug-discovery tools (ADMET, docking, toxicity prediction)
Candidatos filtrados con propiedades favorables
    ↓ BioChatter (literature RAG: PubMed, ChEMBL, UniProt)
Candidatos priorizados con evidencia clínica
    ↓ AutoResearch AI pattern (automated research synthesis)
Report para equipo científico + decisión de avanzar a síntesis
```

**Deal size**: $300k-$1.5M. **Duración**: 20-40 semanas.

---

## Patrón 6: Radiology Multi-Agent Hierarchy (MARCH Pattern)

**Caso de uso**: CT report generation con calidad de supervisión radiológica real.

**Repos**: MARCH (arXiv:2604.16175) + `torchio` + `OHIF/Viewers` + `bowang-lab/MedRAX` + LangGraph

**Arquitectura MARCH**:
```python
from langgraph.graph import StateGraph
import anthropic

client = anthropic.Anthropic()

def resident_agent(state):
    """Draft inicial: extracción multi-escala de features CT."""
    ct_features = state["ct_features"]  # from torchio/MedRAX
    
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1500,
        system="""Eres un médico residente de radiología. 
        Analiza las características del CT y genera un reporte preliminar.
        Describe hallazgos sistemáticamente: pulmones, corazón, mediastino, 
        pared torácica, abdomen superior visible. Marca áreas de incertidumbre.""",
        messages=[{"role": "user", "content": f"CT features: {ct_features}"}]
    )
    return {**state, "resident_draft": response.content[0].text}

def fellow_agent(state):
    """Fellow: revisión con RAG sobre casos similares."""
    resident_draft = state["resident_draft"]
    similar_cases = retrieve_similar_cases(state["ct_features"])  # Case RAG
    
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1500,
        system="""Eres un fellow de radiología. 
        Revisa el reporte del residente con casos similares de referencia.
        Identifica hallazgos que podrían ser refinados, 
        correcciones basadas en los casos de referencia,
        y áreas que requieren atención del attending.""",
        messages=[{
            "role": "user", 
            "content": f"Reporte residente:\n{resident_draft}\n\nCasos similares:\n{similar_cases}"
        }]
    )
    return {**state, "fellow_review": response.content[0].text}

def attending_agent(state):
    """Attending: consenso iterativo con stance-based discourse."""
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2000,
        system="""Eres el attending de radiología. 
        Genera el reporte final con consenso médico basado en el draft del residente y 
        la revisión del fellow. Resuelve discrepancias con razonamiento explícito.
        El reporte final debe ser verificable y citable por el radiólogo que firma.""",
        messages=[{
            "role": "user",
            "content": f"Draft residente:\n{state['resident_draft']}\n\nRevisión fellow:\n{state['fellow_review']}"
        }]
    )
    return {**state, "final_report": response.content[0].text}

graph = StateGraph(dict)
graph.add_node("resident", resident_agent)
graph.add_node("fellow", fellow_agent)
graph.add_node("attending", attending_agent)
graph.add_edge("resident", "fellow")
graph.add_edge("fellow", "attending")
graph.set_entry_point("resident")
radiology_workflow = graph.compile()
```

**Resultado**: Supera SOTA en RadGenome-ChestCT. **Deal size**: $150k-$500k. **Duración**: 12-24 semanas.

---

## Patrón 7: Open Source FHIR Platform (Greenfield Healthcare App)

**Caso de uso**: Construir app de salud digital desde cero con FHIR como columna vertebral.

**Stack**: `medplum/medplum` + `the-momentum/fhir-mcp-server` + Claude API

**Arquitectura**:
```
Medplum (FHIR Platform: API + UI Components + Bots)
     ↓ FHIR Subscriptions (triggers en tiempo real)
Medplum Bot (TypeScript serverless function)
     ↓ Claude API (clinical reasoning)
Resultado estructurado → FHIR Resource → Medplum UI
```

**Deal size**: $80k-$600k. **Duración**: 8-32 semanas.

---

## Patrón 8: NemoClaw Enterprise (HIPAA-Compliant Agentic System)

**Caso de uso**: Hospital US enterprise que necesita usar LLMs con PHI sin violar HIPAA.

**Stack**: NemoClaw + OpenClaw-Medical-Skills + FHIR MCP + Claude (non-PHI reasoning)

```python
class NemoClawPHIRouter:
    """Route PHI to local Nemotron, non-PHI to Claude."""
    
    def route(self, clinical_input: str, contains_phi: bool) -> str:
        if contains_phi:
            return self.nemotron_local_analyze(clinical_input)
        else:
            return self.claude_cloud_reason(self.anonymized_context)
    
    def nemotron_local_analyze(self, phi_text: str) -> str:
        """PHI analysis stays on-prem with Nemotron."""
        # Runs in hospital datacenter — NVIDIA IGX or on-prem GPU
        pass
    
    def claude_cloud_reason(self, anonymized_context: str) -> str:
        """Complex reasoning with Claude — no PHI."""
        client = anthropic.Anthropic()
        return client.messages.create(
            model="claude-sonnet-5",
            messages=[{"role": "user", "content": anonymized_context}]
        ).content[0].text
```

**Deal size**: $400k-$1.5M. **Duración**: 20-40 semanas.

---

## Patrón 9: LATAM Digital Health Platform (OpenMRS + AI)

**Caso de uso**: Plataforma de salud digital para hospitales LATAM con recursos limitados.

**Stack**: `openmrs/openmrs-core` + `medspaCy` (español) + Claude API + `fhir-mcp-server`

```python
# medspaCy en español para NLP clínico LATAM
import spacy
import medspacy

nlp = medspacy.load(model="es_core_web_lg")  # Español

def process_clinical_note_spanish(note_text: str):
    """Process clinical note in Spanish with medspaCy."""
    doc = nlp(note_text)
    
    entities = []
    for ent in doc.ents:
        entities.append({
            "text": ent.text,
            "label": ent.label_,
            "negated": ent._.is_negated,
            "uncertain": ent._.is_uncertain,
            "historical": ent._.is_historical
        })
    return entities
```

**Deal size**: $100k-$400k. **Duración**: 12-24 semanas.

---

## Patrón 10: Drug Interaction Checker (Non-Device CDS)

**Caso de uso**: Verificación de interacciones medicamentosas antes de prescripción.

**Stack**: OpenFDA API + Claude API + fhir-mcp-server + medspaCy

**Time-to-value**: 3-5 semanas. **Deal size**: $40k-$100k como módulo. **FDA**: Non-Device (lógica verificable por farmacéutico/médico).

---

## Patrón 11: Autonomous Clinical Trial Site Selection (IQVIA Pattern)

**Caso de uso**: Automatizar la selección de sitios para clinical trials (proceso típicamente de 200 días).

**Stack**: LangGraph + Claude + FHIR data + clinical trial databases + i2b2

**Sub-agentes especializados**:
- Protocol Agent: analiza criterios de inclusión/exclusión
- Site Feasibility Agent: evalúa cada sitio candidato
- Patient Cohort Agent: estima population available en cada sitio
- Track Record Agent: evalúa historial del investigador en trials anteriores
- Synthesis Agent: ranquea y recomienda sitios

**Deal size**: $300k-$1.2M. **Duración**: 16-32 semanas.

---

## Patrón 12: Clinical AI Sovereign Stack (on-prem, sin cloud)

**Caso de uso**: Hospital que requiere PHI completamente on-prem (LGPD Brasil, IMSS México, NHS UK data residency).

**Stack**: HAPI FHIR (local) + Meditron-70B via Ollama + fhir-mcp-server (local) + LangGraph + openmed (local NER) + FHIR AuditEvent

```python
import ollama
import anthropic_compatible_client as local_client

def sovereign_clinical_agent(patient_query: str, patient_id: str):
    """Fully on-prem clinical agent — no PHI leaves hospital."""
    
    # 1. Retrieve patient data from local FHIR server
    fhir_data = local_fhir_client.get_patient_summary(patient_id)
    
    # 2. NER + de-identification (openmed, local, no cloud)
    entities = openmed_ner.extract_entities(fhir_data)
    
    # 3. Reasoning with local Meditron-70B via Ollama
    response = ollama.chat(
        model="meditron:70b",
        messages=[{
            "role": "system",
            "content": "Eres un asistente clínico médico. Responde solo en base a los datos del paciente."
        }, {
            "role": "user", 
            "content": f"Datos paciente: {fhir_data}\nConsulta: {patient_query}"
        }]
    )
    
    # 4. Write audit log to local FHIR AuditEvent (immutable)
    local_fhir_client.create_audit_event(
        agent="sovereign_clinical_agent",
        action="READ+RESPOND",
        patient_id=patient_id,
        outcome="success"
    )
    
    return response["message"]["content"]
```

**Time-to-value**: 16-32 semanas. **Deal size**: $200k-$800k. **ROI**: Sin BAA + sin PHI breach risk + control total de modelos.

---

## Patrón 13: Artificial Pancreas / Diabetes AI (OpenAPS Pattern)

**Caso de uso**: Sistema de insulin delivery closed-loop para pacientes T1D.

**Stack**: `openaps/oref0` + CGM sensor API + insulin pump API + FHIR write + Claude (advisory)

**Deal size**: $150k-$600k. FDA AID pathway aplica. **Duración**: 20-40 semanas.

---

## Patrón 14: MARCH Hierarchical Radiology Multi-Agent

**Ver Patrón 6 (arriba)** para la implementación completa del patrón MARCH (Resident→Fellow→Attending Agent) para CT report generation.

**Extensiones generalizables**:
- Patología: Resident Agent (slide review) → Fellow Agent (molecular context) → Attending Agent (tumor board consensus)
- Cardiología: Residente (ECG reading) → Fellow (cardiac history) → Attending Agent (management plan)

---

## Patrón 15: Open Source Ambient Scribe LATAM (Español/Portugués)

**Caso de uso**: Scribe AI en español/portugués médico para hospitales LATAM. Alternativa a Nuance DAX.

**Stack**: `trevorpfiz/scribeHC` + Whisper (ASR) + Claude API + `the-momentum/fhir-mcp-server` + OpenMRS/OpenEMR

```python
import whisper
import anthropic

whisper_model = whisper.load_model("medium", language="es")  # o "pt" para Brasil

def generate_soap_note_latam(audio_path: str, language: str = "es") -> dict:
    """Genera nota SOAP en español/portugués."""
    
    result = whisper_model.transcribe(audio_path, language=language)
    transcript = result["text"]
    
    client = anthropic.Anthropic()
    lang_prompt = "español médico latinoamericano" if language == "es" else "português médico brasileiro"
    
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2000,
        system=f"""Eres un asistente médico clínico experto en {lang_prompt}.
        Genera notas SOAP estructuradas con terminología médica apropiada para LATAM.
        Incluye códigos CIE-10 (equivalente latinoamericano de ICD-10) cuando aplique.
        Sé preciso, claro y usa el formato que prefieren los médicos de la región.""",
        messages=[{
            "role": "user",
            "content": f"Transcripción de consulta:\n\n{transcript}\n\nGenera nota SOAP completa."
        }]
    )
    
    return {
        "transcript": transcript,
        "soap_note": response.content[0].text,
        "language": language
    }
```

**Time-to-value**: 4-6 semanas. **Deal size**: $50k-$200k implementación + $500-2,000/mes soporte. **Ventaja**: Mucho más competitivo que Nuance DAX para hospitales LATAM o US mid-market.

---

## 🆕🆕 Patrón 16: HeartAgent — Cardiology AI Specialist (v7)

**Caso de uso**: Agente de diagnóstico diferencial cardiológico para centros de cardio o telemedicina donde hay escasez de cardiólogos.

**Basado en**: HeartAgent (arXiv:2603.10764, Mar 2026) + BAAI Cardiac Agent (arXiv:2604.04078) + MA-RAG (ICML 2026)

**Stack**: HeartAgent pattern + LangGraph + MA-RAG (NJU-RL/MA-RAG) + FHIR MCP + PhysicianBench (gate de calidad)

**Arquitectura**:
```
Input clínico cardiológico (síntomas, ECG, labs, imaging)
    ↓ FHIR MCP Server (retrieve: cardiac history, medications, vitals, prior ECGs)
Historia clínica cardiológica completa
    ↓ Sub-agente de percepción (ECG/echo/CMR features extraction)
Features cardiológicas estructuradas
    ↓ Sub-agente de conocimiento (cardiology knowledge base: ACC/AHA guidelines)
Candidatos diagnósticos con criterios
    ↓ MA-RAG (NJU-RL/MA-RAG): multi-round evidence retrieval → conflict resolution → consensus
Diagnóstico diferencial con evidencia consensuada
    ↓ Sub-agente de razonamiento explícito (trayectorias verificables)
Reporte diagnóstico con referencias verificables
    ↓ [Cardiologist reviews] ← FDA Non-Device: lógica verificable por especialista
    ↓ FHIR AuditEvent (audit trail inmutable)
```

**Código mínimo (Python)**:
```python
import anthropic
from langgraph.graph import StateGraph
import requests

client = anthropic.Anthropic()

CARDIOLOGY_KNOWLEDGE_BASE = """
ACC/AHA Guidelines 2023/2024:
- Chest pain evaluation: HEART score, troponin kinetics, rest ECG
- HF diagnosis: BNP/NT-proBNP, echo EF, NYHA class
- Arrhythmia: rhythm interpretation, QTc, delta wave
- Coronary artery disease: risk factors, calcium score, FFR
"""

def cardiac_perception_agent(state):
    """Extract cardiac features from input."""
    clinical_input = state["clinical_input"]
    
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1000,
        system="""Eres un especialista en cardiología. 
        Extrae y estructura todas las características cardiológicas del input clínico:
        - Síntomas: onset, duración, carácter, irradiación, factores moduladores
        - ECG findings: ritmo, eje, intervalos, bloqueos, ST/T changes
        - Ecocardiografía: FE, segmentos, valvas, pericardio
        - Labs: troponina, BNP, lípidos, glucosa
        - Factores de riesgo CV""",
        messages=[{"role": "user", "content": f"Input clínico:\n{clinical_input}"}]
    )
    return {**state, "cardiac_features": response.content[0].text}

def cardiology_knowledge_agent(state):
    """Apply cardiology knowledge and guidelines."""
    features = state["cardiac_features"]
    
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1500,
        system=f"""Eres un cardiólogo senior. Usa las guías ACC/AHA para generar
        diagnósticos diferenciales estructurados:
        
        {CARDIOLOGY_KNOWLEDGE_BASE}
        
        Para cada diagnóstico:
        1. Criterios cumplidos en este caso
        2. Criterios ausentes o contradictorios
        3. Próximos pasos diagnósticos recomendados
        4. Referencias a guías específicas (verificables)""",
        messages=[{"role": "user", "content": f"Características cardiológicas:\n{features}"}]
    )
    return {**state, "differential_dx": response.content[0].text}

def ma_rag_consensus_agent(state):
    """MA-RAG pattern: multi-round evidence retrieval → consensus."""
    differential = state["differential_dx"]
    
    # Round 1: Initial evidence retrieval
    evidence_round1 = retrieve_pubmed_evidence(differential, round=1)
    # Round 2: Conflicting evidence resolution
    evidence_round2 = retrieve_pubmed_evidence(differential, round=2, focus="conflicting")
    
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2000,
        system="""Eres un experto en medicina basada en evidencia cardiológica.
        Resuelve conflictos entre evidencias y genera un consenso diagnóstico robusto.
        El reporte debe ser verificable por el cardiólogo que lo revisa.
        Incluye nivel de evidencia (A/B/C) para cada recomendación.""",
        messages=[{
            "role": "user",
            "content": f"Diagnóstico diferencial:\n{differential}\n\nEvidencia R1:\n{evidence_round1}\n\nEvidencia conflictiva R2:\n{evidence_round2}"
        }]
    )
    return {**state, "consensus_report": response.content[0].text}

def write_fhir_audit(state):
    """Write immutable audit log to FHIR AuditEvent."""
    # Write to local FHIR server — stays in hospital
    audit = {
        "resourceType": "AuditEvent",
        "type": {"code": "heartAgent-v1"},
        "action": "E",  # Execute
        "outcome": "0",  # Success
        "agent": [{"who": {"display": "HeartAgent v1"}, "requestor": False}],
        "source": {"observer": {"display": "Globant HeartAgent"}},
        "entity": [{"what": {"reference": f"Patient/{state['patient_id']}"}}]
    }
    requests.post("http://fhir-server:8080/fhir/AuditEvent", json=audit)
    return state

def retrieve_pubmed_evidence(query: str, round: int = 1, focus: str = "") -> str:
    """Retrieve PubMed evidence for MA-RAG consensus."""
    # Integration with PubMed E-utilities API
    return f"[PubMed evidence round {round} for: {query[:100]}...]"

# Build HeartAgent workflow
graph = StateGraph(dict)
graph.add_node("perceive", cardiac_perception_agent)
graph.add_node("knowledge", cardiology_knowledge_agent)
graph.add_node("consensus", ma_rag_consensus_agent)
graph.add_node("audit", write_fhir_audit)
graph.add_edge("perceive", "knowledge")
graph.add_edge("knowledge", "consensus")
graph.add_edge("consensus", "audit")
graph.set_entry_point("perceive")

heartAgent = graph.compile()

# Pre-production validation
print("Evaluar con PhysicianBench (HealthRex/PhysicianBench) antes de deploy en producción")
print("Objetivo mínimo: >50% en especialidad cardiología")
```

**Evaluación pre-producción**: Usar PhysicianBench (HealthRex/PhysicianBench, especialidad cardiología) + MedAgentBench como gate. HeartAgent (paper) logró >36% mejora en top-3 accuracy en MIMIC-IV vs. baseline.

**FDA pathway**: Non-Device CDS si el cardiólogo puede verificar la lógica (lógica + referencias visibles). ARPA-H ADVOCATE arquitectura (primary + supervisory agent) para casos de mayor riesgo.

**Deal size**: $150k-$500k. **Duración**: 12-20 semanas. **LATAM opportunity**: Colombia, Perú, Argentina — escasez de cardiólogos en regiones.

---

## 🆕🆕 Patrón 17: Sovereign AI Healthcare Stack (PHI on-prem, sin cloud) (v7)

**Caso de uso**: Hospital con requisitos de PHI completamente on-prem (LGPD Brasil, IMSS México, NHS UK data residency, GDPR EU). La respuesta al "no podemos enviar datos a la nube."

**Stack**: NVIDIA IGX + Clara + Meditron-70B (Ollama) + HAPI FHIR local + fhir-mcp-server local + openmed + LangGraph + Federated TEE learning

**Arquitectura completa**:
```
Hospital perimeter (PHI NEVER LEAVES)
────────────────────────────────────────────────────────
NVIDIA IGX Edge Server (healthcare-grade GPU)
  ├── NVIDIA Clara (medical imaging AI)
  ├── Ollama serving Meditron-70B (medical LLM, Apache-2.0)
  ├── HAPI FHIR Server (local FHIR R4/R5 backend)
  ├── fhir-mcp-server (local bridge LLM ↔ FHIR)
  ├── openmed (local NER + HIPAA/LGPD de-identification)
  └── LangGraph (local agent orchestration)
────────────────────────────────────────────────────────
[Optional] Federated Learning Hub (TEE — Trusted Execution Environment)
  ├── Aggregates encrypted model updates from multiple hospitals
  ├── PHI never exposed — only encrypted gradients
  └── Collective model improves without data sharing
```

**Código de implementación**:
```python
import ollama
import anthropic  # Only for non-PHI reasoning if hybrid mode
from langgraph.graph import StateGraph

class SovereignClinicalAgent:
    """Fully sovereign clinical AI — PHI never leaves hospital."""
    
    def __init__(self, fhir_server_url: str, mode: str = "full_sovereign"):
        self.fhir_url = fhir_server_url
        self.mode = mode
        self.local_ner = LocalOpenMedNER()  # openmed local
        
    def analyze(self, patient_id: str, clinical_query: str) -> dict:
        # Step 1: Get patient data from local FHIR
        patient_data = self._get_fhir_patient(patient_id)
        
        # Step 2: Local NER + de-id (openmed — no cloud)
        entities = self.local_ner.extract_and_deidentify(patient_data)
        
        # Step 3: Local reasoning with Meditron-70B via Ollama
        response = ollama.chat(
            model="meditron:70b",
            messages=[
                {
                    "role": "system",
                    "content": """Eres un asistente clínico médico especializado.
                    Analiza con precisión. Indica incertidumbre cuando aplique.
                    Cita guías clínicas cuando sea relevante.
                    IMPORTANTE: Tus respuestas serán revisadas por un médico antes de cualquier acción."""
                },
                {
                    "role": "user",
                    "content": f"Datos del paciente:\n{patient_data}\n\nConsulta:\n{clinical_query}"
                }
            ]
        )
        
        clinical_response = response["message"]["content"]
        
        # Step 4: Write immutable audit log (local FHIR AuditEvent)
        self._write_audit_event(patient_id, clinical_query, clinical_response)
        
        # Step 5: Human gate — médico revisa antes de cualquier write al EHR
        return {
            "analysis": clinical_response,
            "requires_physician_approval": True,
            "audit_logged": True,
            "phi_stayed_local": True,
            "model_used": "meditron-70b-local"
        }
    
    def _get_fhir_patient(self, patient_id: str) -> dict:
        """Read from local HAPI FHIR server."""
        import requests
        response = requests.get(f"{self.fhir_url}/Patient/{patient_id}/$everything")
        return response.json()
    
    def _write_audit_event(self, patient_id: str, query: str, response_text: str):
        """Immutable audit trail in local FHIR AuditEvent."""
        import requests, datetime
        audit = {
            "resourceType": "AuditEvent",
            "recorded": datetime.datetime.utcnow().isoformat() + "Z",
            "type": {"code": "sovereign-clinical-agent"},
            "action": "E",
            "outcome": "0",
            "source": {"observer": {"display": "SovereignClinicalAgent-v1"}},
            "entity": [{
                "what": {"reference": f"Patient/{patient_id}"},
                "query": query[:500]
            }]
        }
        requests.post(f"{self.fhir_url}/AuditEvent", json=audit)

class LocalOpenMedNER:
    """openmed local NER for PHI extraction + de-identification."""
    def extract_and_deidentify(self, text: str) -> dict:
        # Uses openmed (maziyarpanahi/openmed) — runs on-device
        # NER: diseases, medications, procedures, dates, names
        # De-id: replaces PHI with [REDACTED] before any logging
        return {"entities": [], "deidentified_text": text}
```

**CIO pitch deck (textual)**:
```
Slide 1: "¿Por qué Sovereign AI Healthcare?"
  - PHI nunca sale de tu red → sin Business Associate Agreement para la capa AI
  - Menor superficie de breach: eliminas al vendor como vector de ataque
  - Sin pricing leverage del vendor sobre tu compute: tú controlas los costos
  - Control total de modelos y governance: auditas, modificas, retiras cualquier modelo
  - Regulación: LGPD / IMSS / NHS Data Residency / GDPR Art.44-49 — cumplimiento de oficio

Slide 2: "El stack"
  - NVIDIA IGX (healthcare-grade edge) — ya en 50+ hospitales globalmente
  - Meditron-70B (Apache-2.0) — 48B tokens médicos, on-prem sin licencia
  - HAPI FHIR Server — estándar de facto, Apache-2.0
  - LangGraph — orquestación de agentes, MIT
  - Globant deployment + soporte 24/7

Slide 3: "ROI"
  - Prior auth: 8h → 30s (patrón UHG validado, replicable on-prem)
  - Ambient scribe: 2-4h/médico/día ahorradas (sin cloud)
  - Sin costos de BAA legal: $50k-$200k/año en savings legales
  - Sin vendor lock-in: modelo cambia sin negociación
```

**Federated Learning (opcional, fase 2)**:
```python
# Federated learning con TEE — múltiples hospitales mejoran el modelo sin compartir PHI
class FederatedHospitalLearning:
    def local_train(self, hospital_data: dict) -> bytes:
        """Train local model update in hospital enclave."""
        # Each hospital trains on its own PHI data — never shared
        model_update = local_fine_tune(self.base_model, hospital_data)
        # Encrypt update before sending to aggregator
        return encrypt_with_hospital_key(model_update)
    
    def aggregate_at_hub(self, encrypted_updates: list) -> bytes:
        """Aggregate encrypted updates inside TEE — no PHI exposure."""
        # TEE (Trusted Execution Environment): Intel SGX or AMD SEV
        # Decrypts updates, aggregates, re-encrypts result
        # PHI was never in the aggregated updates — only model weights
        return federated_average(encrypted_updates)
```

**Evaluación**: Meditron-70B on-prem vs. Claude API — PhysicianBench + MedAgentBench revelan la brecha. Para casos donde Meditron es insuficiente, usar modo híbrido: PHI → Nemotron/Meditron local; reasoning complejo (sin PHI) → Claude API.

**Time-to-value**: 16-32 semanas (más largo por hardware procurement NVIDIA IGX). **Deal size**: $200k-$800k. **LATAM priority markets**: Brasil (LGPD obligatorio), México (IMSS/ISSSTE), Argentina.

---

---

## 🆕 Patrón 18: Drug Interaction Checker + Prescripción Asistida (v8)

**Caso de uso**: Alertar al médico sobre interacciones medicamentosas antes de confirmar la prescripción; reducir errores de prescripción -40% (FDA meta-análisis 2024).

**Repos**:
- `allenai/scispacy` (MIT) — NER para extraer nombres de fármacos del texto
- RxNorm API (NIH, gratuito) — normalización de nombres de medicamentos a RxCUI estándar
- DrugBank Open Data (CC BY-NC 4.0) — base de datos de interacciones conocidas
- `openemr/openemr` (GPL-3.0) — integración con módulo e-prescribing
- Claude claude-sonnet-5 — explicar la interacción en lenguaje clínico comprensible

**Flujo**:
```
Médico escribe prescripción (texto libre)
    ↓ scispaCy NER: extrae entidades medicamento
    ↓ RxNorm API: nombre → RxCUI estándar
    ↓ DrugBank: query interacciones para cada par de fármacos
Lista de interacciones + severidad (mayor/moderada/leve)
    ↓ Claude: explica en lenguaje clínico + sugiere alternativa
Alert card al médico → [Human gate] confirma o modifica
    ↓ OpenEMR e-prescribing write
```

**Time-to-value**: 2–3 semanas | **ROI**: -40% errores de prescripción | **Deal size**: $50k–$150k

---

## 🆕 Patrón 19: Chatbot de Triaje y Onboarding del Paciente (v8)

**Caso de uso**: Chatbot que recoge síntomas e historia clínica antes de la consulta, asigna urgencia, y prepara resumen para el médico. -20% tiempo de consulta; +30% satisfacción (Philips 2026).

**Repos**:
- Claude claude-haiku-4-5 — conversación de triaje rápida (10x menor costo que Sonnet)
- `medspacy/medspacy` (MIT) — extracción de síntomas del texto libre del paciente
- `ohcnetwork/care_fe` (MIT) — frontend React + Django; registro EHR y asignación urgencia
- `hapifhir/hapi-fhir` (Apache-2.0) — output como FHIR QuestionnaireResponse + Appointment

**Flujo**:
```
Paciente abre app (web o WhatsApp)
    ↓ Claude Haiku: conversación multi-turn (síntomas, duración, severidad, historial)
    ↓ medspaCy: extrae entidades clínicas estructuradas
    ↓ Urgency scoring (ESI-like algorithm)
    ↓ FHIR QuestionnaireResponse + Appointment FHIR write
Médico entra a consulta con resumen completo (30 segundos lectura)
```

**LATAM tip**: Integrar con WhatsApp Business API (>90% penetración LATAM); Claude Haiku responde en español nativo.

**Time-to-value**: 2–3 semanas | **Deal size**: $40k–$150k

---

## 🆕 Patrón 20: MedAgents CDSS Multi-Especialidad (v8)

**Caso de uso**: CDSS donde múltiples agentes LLM (cardiólogo, internista, farmacólogo) razonan en paralelo sobre el caso y llegan a consenso antes de presentar al médico.

**Repos**:
- `gersteinlab/MedAgents` (Apache-2.0) — framework multi-LLM consensus (ACL 2024 Findings)
- `hapifhir/hapi-fhir` (Apache-2.0) — FHIR para recuperar historia del paciente
- `NJU-RL/MA-RAG` (MIT) — multi-round RAG para resolver conflictos entre especialistas
- LangGraph (MIT) — orquestación del grafo de agentes especialistas
- Claude claude-opus-4-8 — agente de síntesis final ("attending" que consolida)

**Flujo**:
```
Caso clínico (FHIR Bundle)
    ↓ LangGraph: dispatch a 3 agentes especializados en paralelo
    [Cardiólogo LLM] [Internista LLM] [Farmacólogo LLM]
    ↓ cada agente razona + cita evidencia
    ↓ MA-RAG: detecta conflictos + busca evidencia adicional
    ↓ Claude Opus: síntesis "attending" → recomendación final
Recomendación con referencias + nivel de evidencia
    ↓ [Human gate] Médico revisor aprueba/modifica
FHIR ClinicalImpression write + AuditEvent (Non-Device CDS FDA 2026)
```

**Time-to-value**: 4–6 semanas | **ROI**: -25% reingresos (Mayo Clinic benchmark) | **Deal size**: $80k–$300k

---

*Actualizado automáticamente por el pipeline de ingest. v8 — 20 patrones totales.*
