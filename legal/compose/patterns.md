# Patrones de composición — Legal Services AI

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-10 (v8)

## Mapa de patrones

```
[Ingesta documentos]           [Investigación jurídica]        [Compliance]
  Docassemble intake             CourtListener MCP                Vaara audit logs
  LegalMD parser                 FOLIO MCP ontología              EU AI Act gates
  OpenContracts DMS              CUAD dataset                     Human approval gates
          ↓                              ↓                               ↓
[Agentes de revisión]          [Redacción y negociación]       [Gestión de casos]
  Lavern 67 specialists          Claude API claude-3-7            OpenLawOffice
  claude-for-legal plugins       LegalMD renderer                 Odoo Legal module
  CUAD risk detection            Redlines .docx / PDF tracked     CRM + billing
          ↓                              ↓                               ↓
[Plataforma de entrega]        [Evaluación / QA]               [Monitoreo]
  Mike self-hosted UI            LegalBench suite                 Vaara + hash-chain
  Next.js conversacional         legalbenchrag RAG eval           Dashboard compliance
  API REST para integraciones    Human lawyer review gate         LGPD / EU AI Act
```

---

## P1 — EU AI Act Compliance Auditor (URGENTE: deadline Aug 2 2026)

**Deal size**: $50k–$200k | **Timeline**: 4–8 semanas | **Urgencia**: T-23 días

**Problema**: Firmas legales con sistemas AI de alto riesgo deben demostrar compliance para Aug 2 2026 o enfrentar €15M penalidad.

**Stack**:
- `microsoft/agent-governance-toolkit` (MIT) → policy enforcement <0.1ms, cubre 10 OWASP Agentic AI risks
- `vaaraio/vaara` (AGPL-3.0) → audit logs hash-chained + TPM attestation
- `SdSarthak/AegisAI` (MIT) → AI-GRC platform, EU AI Act checklist
- `GenAI-Gurus/awesome-eu-ai-act` → templates y guías oficiales
- Claude API → análisis de documentación existente, generación de evidencia

```python
# Patrón: EU AI Act compliance audit agent
import anthropic
from vaara import VaaraClient, AuditLogger

client = anthropic.Anthropic()
vaara = VaaraClient(tpm_attestation=True)

EU_AI_ACT_CHECKLIST = """
EU AI Act High-Risk System Audit (effective Aug 2, 2026):
1. Art. 9: Risk management system — documented and tested
2. Art. 10: Data governance — training data quality and bias
3. Art. 11: Technical documentation — complete and current
4. Art. 12: Record-keeping — logs of all AI decisions (VAARA)
5. Art. 13: Transparency — human-readable explanations
6. Art. 14: Human oversight — gates at critical decisions
7. Art. 15: Accuracy, robustness, cybersecurity — tested
"""

def audit_legal_ai_system(system_docs: str, ai_outputs_sample: list[str]) -> dict:
    """Run EU AI Act compliance audit on a legal AI system."""
    
    with vaara.audit_session(article_12=True, article_14=True) as session:
        response = client.messages.create(
            model="claude-opus-4-8",
            max_tokens=4096,
            system=EU_AI_ACT_CHECKLIST,
            messages=[{
                "role": "user",
                "content": f"""
                Audit this legal AI system for EU AI Act compliance.
                
                System documentation: {system_docs}
                
                Sample outputs for bias/accuracy check:
                {chr(10).join(ai_outputs_sample[:5])}
                
                Output: JSON with compliance gaps per article, severity (HIGH/MED/LOW), 
                remediation steps, and estimated effort in person-days.
                """
            }]
        )
        
        audit_result = response.content[0].text
        session.log_decision(
            decision=audit_result,
            human_approved=False,  # requires human gate
            article_14_flag=True
        )
    
    return {
        "audit_log_hash": vaara.get_chain_hash(),
        "compliance_gaps": audit_result,
        "tpm_attestation": vaara.get_attestation()
    }
```

---

## P2 — Agentic Contract Review (Lavern Stack)

**Deal size**: $80k–$300k | **Timeline**: 6–12 semanas

**Problema**: Revisión de contratos en firmas medianas consume 40-60% tiempo de abogados júnior.

**Stack**:
- `AnttiHero/lavern` (Apache 2.0) → 67 agentes especializados, debate protocol
- `Open-Source-Legal/OpenContracts` (Apache 2.0) → DMS + anotación semántica
- `evolsb/claude-legal-skill` (MIT) → CUAD risk detection + redlines .docx
- `vaaraio/vaara` (AGPL-3.0) → audit trail de cada decisión de agente
- Claude API (Anthropic) → backbone de los 67 agentes

```python
# Patrón: contract review con Lavern + CUAD + human gate
import anthropic
import subprocess
import json
from pathlib import Path

client = anthropic.Anthropic()

CUAD_RISK_CATEGORIES = [
    "Termination For Convenience", "Change Of Control", "Anti-Assignment",
    "Revenue/Profit Sharing", "Price Restriction", "IP Ownership",
    "Liquidated Damages", "Warranty Duration", "Limitation On Liability",
    "Indemnification", "Insurance", "Audit Rights", "Governing Law"
]

def review_contract_lavern(contract_path: str, jurisdiction: str = "US") -> dict:
    """
    Multi-agent contract review using Lavern pattern:
    - Pass 1: CUAD risk extraction
    - Pass 2: Jurisdiction-specific analysis
    - Pass 3: Market benchmark comparison
    - Pass 4: Redline generation
    - Pass 5-10: Verification passes
    - Human gate: lawyer approval before final output
    """
    contract_text = Path(contract_path).read_text()
    
    # Pass 1: CUAD risk extraction
    risk_response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=2048,
        messages=[{
            "role": "user",
            "content": f"""
            Extract the following risk categories from this contract (CUAD framework).
            For each found, provide: location, severity (HIGH/MED/LOW), market_standard.
            
            Categories: {', '.join(CUAD_RISK_CATEGORIES)}
            
            Contract: {contract_text[:8000]}
            
            Output as JSON array.
            """
        }]
    )
    risks = json.loads(risk_response.content[0].text)
    
    # Pass 2: Jurisdiction-specific issues
    jurisdiction_response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2048,
        messages=[{
            "role": "user",
            "content": f"""
            Identify jurisdiction-specific issues for {jurisdiction}.
            Contract excerpt: {contract_text[:5000]}
            CUAD risks already found: {json.dumps(risks[:5])}
            
            Flag mandatory local law clauses, prohibited terms, required disclosures.
            Output as JSON.
            """
        }]
    )
    
    # Human gate: critical issues require lawyer approval
    critical_risks = [r for r in risks if r.get("severity") == "HIGH"]
    
    return {
        "risks": risks,
        "jurisdiction_issues": json.loads(jurisdiction_response.content[0].text),
        "requires_human_review": len(critical_risks) > 0,
        "critical_count": len(critical_risks),
        "redline_path": f"{contract_path}.redline.docx"
    }
```

---

## P3 — Legal Research via CourtListener MCP

**Deal size**: $40k–$120k | **Timeline**: 3–6 semanas

**Problema**: Investigación de jurisprudencia US toma 2-4 horas por asunto; con MCP < 10 minutos.

**Stack**:
- CourtListener MCP (Apache 2.0) → 250M+ páginas, PACER, citas
- `alea-institute/folio-mcp` (MIT) → ontología legal 18k+ conceptos
- Claude API con tools → agente de investigación
- `HazyResearch/legalbench` (MIT) → evaluación calidad de respuestas

```python
# Patrón: legal research agent con CourtListener MCP
import anthropic

client = anthropic.Anthropic()

# MCP tools expuestos por CourtListener
COURTLISTENER_TOOLS = [
    {
        "name": "search_opinions",
        "description": "Search court opinions by query, jurisdiction, date range",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {"type": "string"},
                "jurisdiction": {"type": "string", "enum": ["all", "scotus", "ca9", "nysd", "txsd"]},
                "date_after": {"type": "string", "format": "date"},
                "date_before": {"type": "string", "format": "date"}
            },
            "required": ["query"]
        }
    },
    {
        "name": "get_citation_network",
        "description": "Get cases that cite or are cited by a given opinion",
        "input_schema": {
            "type": "object",
            "properties": {"opinion_id": {"type": "string"}},
            "required": ["opinion_id"]
        }
    }
]

def research_legal_issue(legal_question: str, jurisdiction: str = "all") -> dict:
    """Autonomous legal research agent using CourtListener MCP."""
    
    messages = [{
        "role": "user",
        "content": f"""
        Research this legal question: {legal_question}
        Jurisdiction: {jurisdiction}
        
        1. Search for leading cases (last 10 years)
        2. Get citation networks for the top 3 cases
        3. Identify circuit splits or conflicting authorities
        4. Summarize current state of law with citations
        """
    }]
    
    # Agentic loop with MCP tools
    while True:
        response = client.messages.create(
            model="claude-opus-4-8",
            max_tokens=4096,
            tools=COURTLISTENER_TOOLS,
            messages=messages
        )
        
        if response.stop_reason == "end_turn":
            return {
                "research_memo": response.content[-1].text,
                "model": "claude-opus-4-8",
                "mcp_source": "CourtListener"
            }
        
        # Process tool calls (MCP handles actual execution)
        messages.append({"role": "assistant", "content": response.content})
        
        tool_results = []
        for block in response.content:
            if block.type == "tool_use":
                # In production: MCP server handles this automatically
                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": f"[CourtListener MCP result for {block.name}({block.input})]"
                })
        
        messages.append({"role": "user", "content": tool_results})
```

---

## P4 — Open Legal Platform LATAM (Mid-Market)

**Deal size**: $200k–$800k | **Timeline**: 12–20 semanas

**Problema**: Firmas 50-500 abogados en LATAM no pueden pagar Harvey ($300-800/abogado/mes); necesitan plataforma self-hosted.

**Stack**:
- `NodineLegal/OpenLawOffice` (Apache 2.0) → case management + billing base
- `jhpyle/docassemble` (MIT) → intake digital + formularios automáticos
- `willchen96/mike` (AGPL-3.0) → UI conversacional sobre documentos
- `alea-institute/folio-mcp` (MIT) → ontología legal ES/PT
- Claude API → backbone IA (Managed Agents para background)
- `vaaraio/vaara` (AGPL-3.0) → LGPD compliance + audit trail
- Infraestructura: on-prem (Brasil LGPD) o AWS LATAM

```
Arquitectura:

Cliente web (Mike UI)
         ↓
[Claude Managed Agent]
     ↙        ↘
FOLIO MCP    OpenLawOffice API
(ontología)  (casos, billing)
     ↓               ↓
Docassemble      Vaara audit
(documentos)     (LGPD logs)
         ↓
   PostgreSQL (on-prem)
```

**ROI para el cliente**: Reducir costo junior paralegal de $2,000-4,000/mes a $200-500/mes en tareas repetitivas.

---

## P5 — EU AI Act Rapid Remediation Sprint

**Deal size**: $50k–$200k | **Timeline**: 4–8 semanas | **Urgencia**: T-23 días

**Problema**: Deadline Aug 2 2026 para sistemas alto riesgo en legal (credit scoring, AML, pricing).

**Deliverables**:
1. AI system inventory + risk classification (built-in vs per-use)
2. Gap analysis contra Art. 9, 10, 11, 12, 13, 14, 15
3. Implementación Vaara para record-keeping (Art. 12)
4. Human oversight gates en flujos críticos (Art. 14)
5. Documentación técnica completa
6. Submission a autoridad competente

**Stack**:
- `microsoft/agent-governance-toolkit` (MIT) + `vaaraio/vaara` (AGPL-3.0) + `SdSarthak/AegisAI` (MIT)
- Claude API para análisis de documentación y generación de evidencia

---

## P6 — Brasil Tributário AI Assistant

**Deal size**: $150k–$500k | **Timeline**: 10–16 semanas

**Problema**: Reforma Tributária 2026 (IBS + CBS) requiere reestructuración masiva → contadores y abogados tributarios necesitan asistente AI actualizado.

**Stack**:
- RAG sobre legislación tributária brasileña (Receita Federal, CARF, STJ, STF)
- `jhpyle/docassemble` (MIT) → calculadora interactiva de impacto
- `freelawproject/courtlistener` adaptado para jurisprudencia BR
- `willchen96/mike` → chat con documentos tributários
- Claude API (claude-opus-4-8) → análisis de complejidad tributária
- Hosting: AWS São Paulo (LGPD compliance)

**Dataset mínimo para RAG**:
- Constituição Federal (Art. 145-162 tributário)
- CTN (Código Tributário Nacional)
- Lei 14.133/2021 (LGPD)
- PEC 45/2019 → Emenda 132/2023 (Reforma Tributária)
- Decisões CARF 2020-2026 (100k+ decisões)

---

## P7 — Agentic Document Due Diligence (M&A)

**Deal size**: $100k–$400k | **Timeline**: 6–10 semanas

**Problema**: Due diligence en M&A LATAM: 2,000-10,000 documentos en 2-4 semanas; 3-5 abogados junior × $150-250/hr.

**Stack**:
- `Open-Source-Legal/OpenContracts` (Apache 2.0) → DMS + anotación semántica de VDR
- `AnttiHero/lavern` (Apache 2.0) → pipeline de review de 67 agentes
- `evolsb/claude-legal-skill` (MIT) → CUAD risk extraction + redlines
- `zeroentropy-ai/legalbenchrag` (MIT) → eval calidad de extracción
- Claude API (claude-opus-4-8 para análisis crítico, haiku-4-5 para batch processing)
- `vaaraio/vaara` (AGPL-3.0) → audit trail de cada documento revisado

**Métricas de éxito**:
- Reducción 70-80% tiempo de revisión inicial
- Precisión > 95% en extracción de cláusulas CUAD vs. revisión humana
- 100% de documentos trazables (quién / qué agente / qué decisión)

---

## P8 — LATAM Legal Data MCP Server

**Deal size**: $80k–$250k | **Timeline**: 8–12 semanas

**Problema**: No existe MCP server de calidad para jurisprudencia LATAM (como CourtListener para US).

**Stack**:
- `freelawproject/courtlistener` como base arquitectónica (Apache 2.0)
- `alea-institute/folio-mcp` como modelo de ontología (MIT)
- Datos: Poder Judicial BR (Juristas), SCJN MX, Poder Judicial CL, Colombia Corte Suprema
- Indexación: Elasticsearch + embeddings multilingüe
- API: MCP protocol + REST para backward compat

**Output**: MCP server open source para jurisprudencia LATAM — posicionamiento como Free Law Project de América Latina.

---

## Matriz de decisión

| Patrón | Tiempo al mercado | Deal size | Riesgo técnico | Riesgo regulatorio |
|--------|-------------------|-----------|----------------|-------------------|
| P1 EU AI Act | 4-8s | $50k-$200k | Bajo | CRÍTICO (deadline Aug 2) |
| P2 Contract Review | 6-12s | $80k-$300k | Medio | Bajo |
| P3 Legal Research | 3-6s | $40k-$120k | Bajo | Bajo |
| P4 LATAM Platform | 12-20s | $200k-$800k | Alto | Medio (LGPD) |
| P5 EU Remediation | 4-8s | $50k-$200k | Bajo | ALTO (deadline) |
| P6 Brasil Tributário | 10-16s | $150k-$500k | Medio | Medio (LGPD) |
| P7 M&A Due Diligence | 6-10s | $100k-$400k | Medio | Bajo |
| P8 LATAM MCP | 8-12s | $80k-$250k | Alto | Bajo |

---
*Ver también: `intel/trends.md` para contexto, `agents/top.md` para herramientas disponibles.*
