# Patrones de composición — Healthcare AI

> Recetas de arquitectura listas para proponer a clientes.
> Cada receta: stack, código Python, timeline, deal size estimado.
> Última actualización: 2026-07-07

## Arquitectura base

```
┌─────────────────────────────────────────────────────────────────┐
│                      MCP / Data Layer                           │
│  MCP-FHIR (EHR data) │ PubMed MCP │ OpenFDA MCP │ ClinicalTrials│
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                     Clinical AI Agents                          │
│  MEDITRON/BioMistral │ MONAI imaging │ medspacy NLP │ PyHealth  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Orchestration Layer                          │
│  LangGraph (state + human gates) │ CrewAI (roles) │ AutoGen    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│               Base Platforms (open source)                      │
│ OpenMRS │ OpenEMR │ Medplum │ HAPI FHIR │ OHIF │ MONAI Deploy  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Recipe 1: Ambient Clinical Documentation AI
**Timeline:** 3-5 semanas | **Deal size:** $150k-400k | **Stack:** Whisper + medspacy + MEDITRON + Medplum + LangGraph

### Problema
Médicos dedican 2-4h/día a documentación clínica. Burn-out masivo. Sin solución open source para LATAM en PT-BR/ES.

### Arquitectura
```
Consulta médica (audio) → Whisper (transcripción local) → medspacy ES/PT
→ MEDITRON (estructurar: diagnóstico, plan, medicamentos) → human gate
→ Medplum bot (push FHIR al EHR) → ICD-10 coding automático
```

### Código
```python
import whisper
from langchain_anthropic import ChatAnthropic
from langgraph.graph import StateGraph, END
import medspacy
from medplum import MedplumClient

# Transcripción local HIPAA-segura (sin cloud)
whisper_model = whisper.load_model("large-v3")
nlp = medspacy.load("es_core_news_lg")  # PT-BR: pt_core_news_lg

llm = ChatAnthropic(model="claude-sonnet-5")

def transcribe_audio(state):
    result = whisper_model.transcribe(state["audio_path"], language="es")
    return {"transcript": result["text"]}

def extract_clinical_entities(state):
    doc = nlp(state["transcript"])
    entities = {
        "diagnoses": [e.text for e in doc.ents if e.label_ == "CONDITION"],
        "medications": [e.text for e in doc.ents if e.label_ == "DRUG"],
        "procedures": [e.text for e in doc.ents if e.label_ == "PROCEDURE"],
    }
    return {"entities": entities}

def generate_soap_note(state):
    prompt = f"""Genera una nota médica SOAP estructurada basada en:
    Transcripción: {state['transcript']}
    Entidades clínicas: {state['entities']}
    Incluye: S (subjetivo), O (objetivo), A (assessment con ICD-10), P (plan con dosis y follow-up).
    Formato: JSON con campos soap_s, soap_o, soap_a, icd10_codes, plan_items."""
    response = llm.invoke(prompt)
    return {"soap_note": response.content}

def human_review_gate(state):
    # Interrupt para revisión médica antes de guardar en EHR
    print(f"\n--- REVISIÓN REQUERIDA ---\n{state['soap_note']}\n")
    approved = input("¿Aprobar nota? (s/n): ").strip().lower()
    return {"approved": approved == "s", "final_note": state["soap_note"]}

def push_to_ehr(state):
    if not state["approved"]:
        return {"status": "rejected", "ehr_id": None}
    
    client = MedplumClient(base_url="https://api.medplum.com/fhir/R4")
    doc_ref = {
        "resourceType": "DocumentReference",
        "status": "current",
        "type": {"coding": [{"system": "http://loinc.org", "code": "11488-4", "display": "Consultation note"}]},
        "content": [{"attachment": {"contentType": "text/plain", "data": state["final_note"]}}],
        "subject": {"reference": f"Patient/{state['patient_id']}"},
    }
    result = client.create_resource(doc_ref)
    return {"status": "saved", "ehr_id": result["id"]}

graph = StateGraph(dict)
graph.add_node("transcribe", transcribe_audio)
graph.add_node("extract_entities", extract_clinical_entities)
graph.add_node("generate_note", generate_soap_note)
graph.add_node("human_review", human_review_gate)
graph.add_node("push_ehr", push_to_ehr)

graph.set_entry_point("transcribe")
graph.add_edge("transcribe", "extract_entities")
graph.add_edge("extract_entities", "generate_note")
graph.add_edge("generate_note", "human_review")
graph.add_edge("human_review", "push_ehr")
graph.add_edge("push_ehr", END)

clinical_scribe = graph.compile()
# Resultado: audio de 10min → nota SOAP estructurada + ICD-10 + FHIR en EHR en < 3min
```

---

## Recipe 2: Multi-Agent Tumor Board AI
**Timeline:** 6-10 semanas | **Deal size:** $400k-1.2M | **Stack:** CrewAI + MONAI + Healthcare Agent Orchestrator pattern + LangGraph

### Problema
Tumor boards requieren reunir a 5-8 especialistas. Acceso limitado en hospitales regionales. Decisiones tardías = outcomes peores.

### Arquitectura
```
Caso de paciente (imagen CT/RX + histología + labs + historia) →
→ Radiology Agent (MONAI) → Pathology Agent → Oncology Agent → Surgery Agent
→ DEBATE estructurado → Treatment Coordinator → Human gate (médico líder) → Care Plan FHIR
```

### Código
```python
from crewai import Agent, Task, Crew, Process
from langchain_anthropic import ChatAnthropic

llm = ChatAnthropic(model="claude-sonnet-5")

radiology_agent = Agent(
    role="Radiólogo Oncológico",
    goal="Analizar imágenes CT/PET y reportar tamaño, localización, invasión vascular y linfática del tumor.",
    backstory="Radiólogo con 15 años en oncología torácica. Experto en TNM staging por imagen.",
    llm=llm,
    verbose=True,
)

pathology_agent = Agent(
    role="Patólogo Molecular",
    goal="Interpretar resultados de histología, IHQ y marcadores moleculares (PD-L1, EGFR, ALK, KRAS).",
    backstory="Patólogo especializado en carcinomas de pulmón y mama. Certificado en biopsias líquidas.",
    llm=llm,
    verbose=True,
)

oncology_agent = Agent(
    role="Oncólogo Médico",
    goal="Proponer opciones de tratamiento sistémico basadas en guidelines NCCN 2026 y ensayos clínicos activos.",
    backstory="Oncólogo médico con expertise en inmunoterapia y terapias dirigidas. Actualizando guidelines 2026.",
    llm=llm,
    verbose=True,
)

surgery_agent = Agent(
    role="Cirujano Torácico",
    goal="Evaluar resecabilidad y proponer abordaje quirúrgico óptimo (VATS vs robótico vs abierto).",
    backstory="Cirujano torácico con 500+ resecciones pulmonares. Referente en técnicas mínimamente invasivas.",
    llm=llm,
    verbose=True,
)

coordinator_agent = Agent(
    role="Coordinador del Tumor Board",
    goal="Sintetizar el debate entre especialistas y producir un plan de tratamiento consensuado con evidencia.",
    backstory="Oncólogo sénior con 20 años liderando tumor boards. Experto en síntesis de decisiones complejas.",
    llm=llm,
    verbose=True,
)

def create_tumor_board_tasks(patient_case: dict) -> list:
    radiology_analysis = Task(
        description=f"""Analiza las imágenes de este paciente y reporta en formato estructurado:
        Caso: {patient_case}
        - Tamaño del tumor (cm), localización anatómica exacta
        - Invasión de estructuras adyacentes
        - Adenopatías mediastínicas (según criterios RECIST)
        - Staging por imagen (T, N, M según TNM 9th ed.)
        - Recomendación: ¿PET adicional? ¿Biopsia guiada?""",
        agent=radiology_agent,
        expected_output="Reporte radiológico estructurado con staging TNM y recomendaciones",
    )

    pathology_analysis = Task(
        description=f"""Analiza los resultados de histología y marcadores moleculares:
        Caso: {patient_case}
        - Tipo histológico (NSCLC: adeno vs escamoso vs otro)
        - Score PD-L1, status EGFR/ALK/ROS1/KRAS/BRAF
        - Índice de proliferación Ki-67
        - Recomendaciones para terapia dirigida o inmunoterapia""",
        agent=pathology_agent,
        expected_output="Reporte molecular con perfil de biomarcadores y orientación terapéutica",
    )

    oncology_plan = Task(
        description="""Propone líneas de tratamiento sistémico basadas en los análisis de radiología y patología.
        Sigue guidelines NCCN NSCLC 2026 Version 3.
        Compara: 1ra línea quimio vs inmunoterapia vs terapia dirigida vs combinada.
        Incluye ensayos clínicos activos relevantes (ClinicalTrials.gov).""",
        agent=oncology_agent,
        expected_output="Plan de tratamiento sistémico con 2-3 opciones rankeadas por evidencia",
        context=[radiology_analysis, pathology_analysis],
    )

    surgical_assessment = Task(
        description="""Evalúa la resecabilidad del tumor y propone estrategia quirúrgica.
        Considera: función pulmonar (FEV1, DLCO), comorbilidades, staging.
        ¿Cirugía primaria vs neoadyuvante + cirugía? ¿VATS vs toracotomía?
        Intent: curativo vs paliativo.""",
        agent=surgery_agent,
        expected_output="Evaluación de resecabilidad con abordaje quirúrgico propuesto",
        context=[radiology_analysis, pathology_analysis],
    )

    final_plan = Task(
        description="""Sintetiza el debate del tumor board y genera el plan de tratamiento final.
        Integra: radiología, patología, oncología, cirugía.
        Produce:
        1. Decisión consensuada (cirugía vs radio vs quimio vs combinado vs trial)
        2. Timeline de tratamiento (semanas)
        3. KPIs de seguimiento
        4. Presentación para firma del médico responsable (HUMAN GATE)""",
        agent=coordinator_agent,
        expected_output="Plan de tratamiento final integrado en formato JSON para FHIR CarePlan resource",
        context=[radiology_analysis, pathology_analysis, oncology_plan, surgical_assessment],
        human_input=True,  # CRÍTICO: médico líder del tumor board firma antes de ejecutar
    )
    
    return [radiology_analysis, pathology_analysis, oncology_plan, surgical_assessment, final_plan]

def run_tumor_board(patient_case: dict):
    tasks = create_tumor_board_tasks(patient_case)
    crew = Crew(
        agents=[radiology_agent, pathology_agent, oncology_agent, surgery_agent, coordinator_agent],
        tasks=tasks,
        process=Process.sequential,
        verbose=True,
    )
    return crew.kickoff()
# Resultado: tumor board completo con 5 especialistas → 45 min vs semanas de espera
```

---

## Recipe 3: AI de Triaje para Telemedicina LATAM (PT-BR / ES)
**Timeline:** 4-6 semanas | **Deal size:** $150k-450k | **Stack:** medspacy + BioMistral + LangGraph + HAPI FHIR

### Problema
46.7% del revenue de digital health LATAM es telesalud. El cuello de botella es el triage: médicos gastan 60% del tiempo en casos que no requieren consulta presencial.

### Código
```python
from langgraph.graph import StateGraph, END
from langchain_anthropic import ChatAnthropic
import medspacy
from enum import Enum

class UrgencyLevel(Enum):
    EMERGENCY = "emergencia"
    URGENT = "urgente"
    SEMI_URGENT = "semi_urgente"
    NON_URGENT = "no_urgente"

nlp_es = medspacy.load("es_core_news_lg")
nlp_pt = medspacy.load("pt_core_news_lg")
llm = ChatAnthropic(model="claude-sonnet-5")

EMERGENCY_FLAGS = [
    "dolor pecho", "dificultad respirar", "pérdida consciencia",
    "dor no peito", "falta de ar", "perda de consciência",
    "hemorragia", "sangramento intenso", "convulsión", "convulsão",
    "avc", "derrame", "stroke", "paralisia", "parálisis",
]

def detect_language(state):
    text = state["patient_message"]
    lang = "pt" if any(w in text.lower() for w in ["não", "está", "você", "também", "dor"]) else "es"
    return {"language": lang}

def extract_symptoms(state):
    nlp = nlp_pt if state["language"] == "pt" else nlp_es
    doc = nlp(state["patient_message"])
    text_lower = state["patient_message"].lower()
    if any(flag in text_lower for flag in EMERGENCY_FLAGS):
        return {"urgency": UrgencyLevel.EMERGENCY.value, "symptoms": ["EMERGENCY FLAG"], "skip_llm": True}
    symptoms = [ent.text for ent in doc.ents if ent.label_ in ["CONDITION", "SYMPTOM"]]
    return {"symptoms": symptoms, "urgency": None, "skip_llm": False}

def ai_clinical_triage(state):
    if state.get("skip_llm"):
        return state
    lang_instruction = "Responde em português brasileiro." if state["language"] == "pt" else "Responde en español."
    prompt = f"""{lang_instruction}
    Eres un triagista clínico AI. Analiza estos síntomas:
    Síntomas: {state['symptoms']}
    Mensaje: {state['patient_message']}
    Responde en JSON: {{urgency_level, urgency_reason, probable_diagnoses, red_flags, ai_recommendations, icd10_provisional}}
    IMPORTANTE: Si hay duda, sube el nivel de urgencia."""
    response = llm.invoke(prompt)
    import json
    triage_result = json.loads(response.content)
    return {"triage_result": triage_result, "urgency": triage_result["urgency_level"]}

def route_by_urgency(state):
    urgency = state["urgency"]
    if urgency == UrgencyLevel.EMERGENCY.value:
        return "emergency_alert"
    elif urgency in [UrgencyLevel.URGENT.value, UrgencyLevel.SEMI_URGENT.value]:
        return "human_doctor"
    return "ai_followup"

def emergency_alert(state):
    lang = state["language"]
    message = "EMERGÊNCIA — ligue 192 (SAMU) imediatamente" if lang == "pt" else "EMERGENCIA — llame al 911 inmediatamente"
    return {"response": message, "action": "emergency_dispatch"}

def connect_doctor(state):
    return {"response": "Un médico estará disponible en breve.", "action": "connect_physician", "doctor_notification": state["triage_result"]}

def ai_followup(state):
    result = state["triage_result"]
    recs = "\n".join(f"• {r}" for r in result.get("ai_recommendations", []))
    return {"response": f"Basado en sus síntomas:\n{recs}", "action": "ai_care_guidance"}

graph = StateGraph(dict)
graph.add_node("detect_language", detect_language)
graph.add_node("extract_symptoms", extract_symptoms)
graph.add_node("ai_triage", ai_clinical_triage)
graph.add_node("emergency_alert", emergency_alert)
graph.add_node("human_doctor", connect_doctor)
graph.add_node("ai_followup", ai_followup)

graph.set_entry_point("detect_language")
graph.add_edge("detect_language", "extract_symptoms")
graph.add_edge("extract_symptoms", "ai_triage")
graph.add_conditional_edges("ai_triage", route_by_urgency, {
    "emergency_alert": "emergency_alert",
    "human_doctor": "human_doctor",
    "ai_followup": "ai_followup",
})
graph.add_edge("emergency_alert", END)
graph.add_edge("human_doctor", END)
graph.add_edge("ai_followup", END)

triage_agent = graph.compile()
# Resultado: triage PT-BR/ES en < 30s, reducción 50-60% carga médica en casos no urgentes
```

---

## Recipe 4: Radiology AI Pipeline (Chest X-Ray)
**Timeline:** 5-8 semanas | **Deal size:** $250k-700k | **Stack:** MONAI + OHIF + LangGraph + FHIR DiagnosticReport

### Problema
1 radiólogo por 150k habitantes en LATAM. Backlog de estudios de 3-10 días. UBS sin acceso a especialista.

### Código (core)
```python
import monai
from monai.networks.nets import DenseNet121
from monai.transforms import Compose, LoadImaged, EnsureChannelFirstd, ScaleIntensityd, Resized, ToTensord
from langchain_anthropic import ChatAnthropic
from langgraph.graph import StateGraph, END
import torch

model = DenseNet121(spatial_dims=2, in_channels=1, out_channels=14)

FINDINGS = ["Atelectasis", "Cardiomegaly", "Effusion", "Infiltration", "Mass", "Nodule",
            "Pneumonia", "Pneumothorax", "Consolidation", "Edema", "Emphysema",
            "Fibrosis", "Pleural Thickening", "Hernia"]
HIGH_PRIORITY = {"Pneumothorax", "Mass", "Nodule", "Pneumonia"}

llm = ChatAnthropic(model="claude-sonnet-5")

def run_monai_inference(state):
    transforms = Compose([LoadImaged(keys=["image"]), EnsureChannelFirstd(keys=["image"]),
                          ScaleIntensityd(keys=["image"]), Resized(keys=["image"], spatial_size=(224, 224)),
                          ToTensord(keys=["image"])])
    data = transforms({"image": state["dicom_path"]})
    with torch.no_grad():
        output = torch.sigmoid(model(data["image"].unsqueeze(0)))
        probs = output.squeeze().numpy()
    findings_detected = {FINDINGS[i]: float(probs[i]) for i in range(len(FINDINGS)) if probs[i] > 0.5}
    high_priority = {k: v for k, v in findings_detected.items() if k in HIGH_PRIORITY}
    return {"findings_detected": findings_detected, "high_priority_findings": high_priority,
            "requires_urgent_review": len(high_priority) > 0}

def generate_radiology_report(state):
    prompt = f"""Eres un radiólogo AI asistente. Genera un borrador de reporte radiológico.
    Hallazgos de AI: {state['findings_detected']}
    Contexto: {state.get('patient_info', {})}
    Estructura: TÉCNICA / HALLAZGOS / IMPRESIÓN / RECOMENDACIONES
    Nota: BORRADOR AI — REQUIERE VALIDACIÓN DEL RADIÓLOGO."""
    response = llm.invoke(prompt)
    return {"draft_report": response.content}

def route_by_priority(state):
    return "urgent_review" if state["requires_urgent_review"] else "standard_review"

def urgent_review(state):
    return {"action": "notify_radiologist_urgent", "priority": "STAT", "draft_report": state["draft_report"]}

def standard_review(state):
    return {"action": "add_to_radiology_queue", "priority": "routine", "draft_report": state["draft_report"]}

graph = StateGraph(dict)
graph.add_node("monai_inference", run_monai_inference)
graph.add_node("generate_report", generate_radiology_report)
graph.add_node("urgent_review", urgent_review)
graph.add_node("standard_review", standard_review)
graph.set_entry_point("monai_inference")
graph.add_edge("monai_inference", "generate_report")
graph.add_conditional_edges("generate_report", route_by_priority, {"urgent_review": "urgent_review", "standard_review": "standard_review"})
graph.add_edge("urgent_review", END)
graph.add_edge("standard_review", END)

radiology_pipeline = graph.compile()
# Resultado: estudio → borrador de reporte en 2min. Radiólogo solo firma. Throughput 5x.
```

---

## Recipe 5: Clinical Trial Matching Agent
**Timeline:** 5-8 semanas | **Deal size:** $200k-600k | **Stack:** RAG + FHIR + ClinicalTrials.gov API + LangGraph

### Problema
Solo 3-5% de pacientes oncológicos elegibles llegan a participar en ensayos clínicos. Barrera: criterios de inclusión/exclusión complejos, revisión manual tarda horas.

### Código (core)
```python
import requests
from langchain_anthropic import ChatAnthropic
from langgraph.graph import StateGraph, END
import json

llm = ChatAnthropic(model="claude-sonnet-5")

def fetch_patient_fhir_profile(state):
    fhir_base = "https://hapi.fhir.org/baseR4"
    patient_id = state["patient_id"]
    conditions = requests.get(f"{fhir_base}/Condition?patient={patient_id}&clinical-status=active").json()
    medications = requests.get(f"{fhir_base}/MedicationStatement?patient={patient_id}&status=active").json()
    observations = requests.get(f"{fhir_base}/Observation?patient={patient_id}&_sort=-date&_count=20").json()
    profile = {
        "conditions": [c["resource"]["code"]["text"] for c in conditions.get("entry", []) if "resource" in c],
        "medications": [m["resource"]["medicationCodeableConcept"]["text"] for m in medications.get("entry", []) if "resource" in m],
        "recent_labs": {o["resource"]["code"]["text"]: o["resource"].get("valueQuantity", {}).get("value") for o in observations.get("entry", []) if "resource" in o},
    }
    return {"patient_profile": profile}

def search_matching_trials(state):
    profile = state["patient_profile"]
    condition_query = " OR ".join(profile["conditions"][:3])
    response = requests.get("https://clinicaltrials.gov/api/v2/studies",
        params={"query.cond": condition_query, "filter.overallStatus": "RECRUITING", "pageSize": 20, "format": "json"})
    return {"candidate_trials": response.json().get("studies", [])}

def evaluate_eligibility(state):
    profile = state["patient_profile"]
    eligible_trials = []
    for trial in state["candidate_trials"][:10]:
        nct_id = trial.get("protocolSection", {}).get("identificationModule", {}).get("nctId", "")
        criteria = trial.get("protocolSection", {}).get("eligibilityModule", {}).get("eligibilityCriteria", "")
        title = trial.get("protocolSection", {}).get("identificationModule", {}).get("briefTitle", "")
        prompt = f"""Evalúa eligibilidad: Paciente: {profile}\nTrial: {title} ({nct_id})\nCriterios: {criteria[:2000]}
        JSON: {{nct_id, eligible, confidence (0-1), met_criteria, unmet_criteria, rationale}}"""
        try:
            result = json.loads(llm.invoke(prompt).content)
            if result.get("eligible") and result.get("confidence", 0) > 0.6:
                eligible_trials.append(result)
        except:
            pass
    return {"eligible_trials": sorted(eligible_trials, key=lambda x: x["confidence"], reverse=True)}

def present_to_physician(state):
    trials = state["eligible_trials"]
    if not trials:
        return {"result": "No se encontraron ensayos clínicos activos elegibles."}
    summary = f"{len(trials)} ensayos potencialmente elegibles encontrados. Top 3:\n"
    for i, t in enumerate(trials[:3], 1):
        summary += f"{i}. {t['nct_id']} ({t['confidence']:.0%}): {t['rationale']}\n"
    return {"result": summary, "eligible_trials": trials, "action": "physician_review_required"}

graph = StateGraph(dict)
graph.add_node("fetch_profile", fetch_patient_fhir_profile)
graph.add_node("search_trials", search_matching_trials)
graph.add_node("evaluate_eligibility", evaluate_eligibility)
graph.add_node("physician_review", present_to_physician)
graph.set_entry_point("fetch_profile")
graph.add_edge("fetch_profile", "search_trials")
graph.add_edge("search_trials", "evaluate_eligibility")
graph.add_edge("evaluate_eligibility", "physician_review")
graph.add_edge("physician_review", END)

trial_matcher = graph.compile()
# Resultado: matching en minutos vs horas. 3-5x más pacientes enrolados en ensayos.
```

---

## Recipe 6: Healthcare Compliance Monitor (ANVISA / COFEPRIS / FDA)
**Timeline:** 3-5 semanas | **Deal size:** $100k-350k SaaS | **Stack:** LangGraph + OpenFDA API + scraper regulatorio

### Problema
Cambios regulatorios FDA/ANVISA/COFEPRIS son frecuentes. Empresas healthtech pequeñas no tienen capacidad de monitoreo continuo.

### Código (core)
```python
import requests
from langchain_anthropic import ChatAnthropic
from langgraph.graph import StateGraph, END
import json

llm = ChatAnthropic(model="claude-sonnet-5")

def fetch_fda_updates(state):
    response = requests.get("https://api.fda.gov/device/event.json",
        params={"search": "date_received:[NOW-7DAY TO NOW]", "limit": 50})
    return {"fda_events": response.json().get("results", [])}

def fetch_anvisa_updates(state):
    try:
        anvisa_rdc = requests.get("https://consultas.anvisa.gov.br/api/consulta/resolucoesrdc",
            params={"dataDe": "2026-06-30", "dataAte": "2026-07-07", "situacao": "Vigente"}, timeout=10)
        return {"anvisa_updates": anvisa_rdc.json() if anvisa_rdc.status_code == 200 else []}
    except:
        return {"anvisa_updates": []}

def analyze_regulatory_impact(state):
    client_systems = state.get("client_product_portfolio", [
        "Módulo de triagem AI com NLP",
        "Algoritmo de classificação de imagens DICOM",
        "Sistema de prescrição eletrônica",
    ])
    prompt = f"""Analiza actualizaciones regulatorias e impacto en sistemas del cliente.
    FDA events: {str(state.get('fda_events', []))[:2000]}
    ANVISA updates: {str(state.get('anvisa_updates', []))[:2000]}
    Portafolio: {client_systems}
    JSON: {{high_priority_alerts: [{{regulation, regulator, impacted_systems, action_required, deadline, priority}}], summary}}
    Solo reporta P1 y P2. No reportes cambios sin impacto claro."""
    try:
        analysis = json.loads(llm.invoke(prompt).content)
        alerts = [a for a in analysis.get("high_priority_alerts", []) if a.get("priority") in ["P1", "P2"]]
        return {"alerts": alerts, "summary": analysis.get("summary", "")}
    except:
        return {"alerts": [], "summary": "Error parsing regulatory analysis"}

def send_compliance_report(state):
    alerts = state["alerts"]
    if not alerts:
        return {"action": "no_report_sent", "reason": "No hay actualizaciones con impacto en el portafolio"}
    report = {"total_alerts": len(alerts), "p1_count": len([a for a in alerts if a.get("priority") == "P1"]),
              "alerts": alerts, "summary": state["summary"]}
    # send_email / Slack / webhook al cliente
    return {"report_sent": True, "report": report}

graph = StateGraph(dict)
graph.add_node("fetch_fda", fetch_fda_updates)
graph.add_node("fetch_anvisa", fetch_anvisa_updates)
graph.add_node("analyze_impact", analyze_regulatory_impact)
graph.add_node("send_report", send_compliance_report)
graph.set_entry_point("fetch_fda")
graph.add_edge("fetch_fda", "fetch_anvisa")
graph.add_edge("fetch_anvisa", "analyze_impact")
graph.add_edge("analyze_impact", "send_report")
graph.add_edge("send_report", END)

compliance_monitor = graph.compile()
# Corre en cron semanal. Solo notifica cuando hay impacto real. SaaS recurrente natural.
```
