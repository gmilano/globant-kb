# 🧩 Patrones de composición — Legal Services

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-07

---

## Arquitectura base

```
[Plataforma vertical base (OpenContracts / OpenLawOffice / ArkCase)]
          ↓
[Capa de integración AI (lavern / mike / claude-legal-skill)]
          ↓
[Agentes especializados (Blackstone NER / LexNLP / LegalBench eval)]
          ↓
[UI conversacional / MCP server / API para el cliente]
```

---

## Patrón 1: Contract Review Agent con CUAD Risk Detection

**Repos:** [lavern](https://github.com/AnttiHero/lavern) + [evolsb/claude-legal-skill](https://github.com/evolsb/claude-legal-skill) + Claude Haiku  
**Licencias:** Apache-2.0 + MIT — libre para productos comerciales  
**Tiempo:** 2-3 semanas  
**Costo operativo:** ~$0.002/contrato (Claude Haiku)

**Caso de uso:** Revisión automática de contratos (NDAs, acuerdos de servicios, contratos laborales) con detección de cláusulas de riesgo CUAD y generación de redlines.

```python
import anthropic
import json
from pathlib import Path

client = anthropic.Anthropic()

CUAD_RISK_CATEGORIES = [
    "Limitation of Liability", "IP Ownership Assignment", "Auto-Renewal",
    "Non-Compete", "Non-Solicitation", "Change of Control",
    "Termination for Convenience", "Governing Law", "Warranty Duration",
    "Price Restrictions", "Minimum Commitment", "Indemnification"
]

def review_contract(contract_text: str, contract_type: str = "NDA") -> dict:
    tools = [
        {
            "name": "report_contract_analysis",
            "description": "Report the complete contract analysis with risks and redlines",
            "input_schema": {
                "type": "object",
                "properties": {
                    "risk_score": {
                        "type": "integer",
                        "description": "Overall risk score 1-10 (10 = highest risk)",
                        "minimum": 1, "maximum": 10
                    },
                    "verdict": {
                        "type": "string",
                        "enum": ["SIGN", "NEGOTIATE", "REJECT"],
                        "description": "Recommended action"
                    },
                    "risks_found": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "category": {"type": "string"},
                                "clause_text": {"type": "string"},
                                "risk_level": {"type": "string", "enum": ["LOW", "MEDIUM", "HIGH", "CRITICAL"]},
                                "explanation": {"type": "string"},
                                "suggested_redline": {"type": "string"}
                            },
                            "required": ["category", "clause_text", "risk_level", "explanation"]
                        }
                    },
                    "missing_clauses": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "Important clauses absent from the contract"
                    },
                    "executive_summary": {"type": "string"}
                },
                "required": ["risk_score", "verdict", "risks_found", "executive_summary"]
            }
        }
    ]

    system_prompt = f"""You are an expert contract attorney specializing in {contract_type} review.
    
Analyze contracts for the following CUAD risk categories: {', '.join(CUAD_RISK_CATEGORIES)}.

Rules:
- Every risk finding MUST cite the specific clause text from the contract
- If a clause doesn't exist in the contract, note it as missing
- Redlines must be specific and actionable
- Risk score reflects aggregate risk, not just individual issues

Be precise, cite everything, be actionable."""

    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=4096,
        system=system_prompt,
        tools=tools,
        tool_choice={"type": "any"},
        messages=[{
            "role": "user",
            "content": f"Review this {contract_type}:\n\n{contract_text}"
        }]
    )

    for block in response.content:
        if block.type == "tool_use" and block.name == "report_contract_analysis":
            return block.input

    return {"error": "No analysis produced"}


def batch_review_contracts(contract_dir: str, contract_type: str = "NDA") -> list:
    results = []
    for contract_path in Path(contract_dir).glob("*.txt"):
        text = contract_path.read_text()
        analysis = review_contract(text, contract_type)
        analysis["filename"] = contract_path.name
        results.append(analysis)
        print(f"✓ {contract_path.name}: {analysis.get('verdict')} (risk: {analysis.get('risk_score')}/10)")
    return results
```

---

## Patrón 2: RAG Legal sobre OpenContracts (Due Diligence M&A)

**Repos:** [Open-Source-Legal/OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) + Claude Sonnet 5  
**Licencia:** MIT — libre para productos comerciales  
**Tiempo:** 3-4 semanas  
**Costo operativo:** ~$0.005/query (Claude Sonnet 5)

**Caso de uso:** Equipo M&A sube data room de 500+ documentos a OpenContracts. Analistas hacen preguntas en lenguaje natural, reciben respuestas grounded con citas.

```python
import anthropic
import requests

OC_URL = "http://localhost:8000/graphql"
client = anthropic.Anthropic()

def search_opencontracts(query: str, corpus_id: int) -> list:
    gql_query = """
    query SearchDocs($query: String!, $corpusId: Int!) {
        searchDocuments(query: $query, corpusId: $corpusId, first: 5) {
            edges {
                node {
                    id
                    title
                    annotations(first: 10) {
                        edges {
                            node {
                                id
                                rawText
                                annotation { page }
                            }
                        }
                    }
                }
            }
        }
    }
    """
    response = requests.post(OC_URL, json={
        "query": gql_query,
        "variables": {"query": query, "corpusId": corpus_id}
    }, headers={"Authorization": "Bearer YOUR_TOKEN"})
    return response.json().get("data", {}).get("searchDocuments", {}).get("edges", [])


def due_diligence_query(question: str, corpus_id: int) -> str:
    tools = [{
        "name": "search_corpus",
        "description": "Search the due diligence document corpus",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {"type": "string"},
                "corpus_id": {"type": "integer"}
            },
            "required": ["query", "corpus_id"]
        }
    }]

    messages = [{"role": "user", "content": question}]

    while True:
        response = client.messages.create(
            model="claude-sonnet-5",
            max_tokens=4096,
            system="""You are a senior M&A due diligence attorney.
            Always cite specific documents and clause text when answering.
            Search the corpus multiple times with different queries to be thorough.""",
            tools=tools,
            messages=messages
        )

        if response.stop_reason == "end_turn":
            for block in response.content:
                if hasattr(block, "text"):
                    return block.text
            break

        messages.append({"role": "assistant", "content": response.content})
        tool_results = []

        for block in response.content:
            if block.type == "tool_use" and block.name == "search_corpus":
                docs = search_opencontracts(block.input["query"], corpus_id)
                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": str(docs)
                })

        if tool_results:
            messages.append({"role": "user", "content": tool_results})

    return "Error: No response generated"
```

---

## Patrón 3: Agentic Law Firm con lavern (Alta Calidad, Volumen Medio)

**Repos:** [AnttiHero/lavern](https://github.com/AnttiHero/lavern) + Claude Sonnet 5  
**Licencia:** Apache-2.0 — libre para productos comerciales  
**Tiempo:** 4-6 semanas  
**Costo operativo:** ~$0.05-0.20/documento (Claude Sonnet 5, 10-pass)

```bash
git clone https://github.com/AnttiHero/lavern
cd lavern

cat > config/agents.yaml << EOF
active_agents:
  - contract_reviewer
  - risk_assessor  
  - ip_specialist
  - employment_specialist
  - governing_law_expert
  - indemnification_specialist
  
jurisdiction: "Brazil"
language: "pt-BR"
verification_passes: 10
human_gate_on_critical: true
notifications:
  slack_webhook: "${SLACK_WEBHOOK_URL}"
EOF

export ANTHROPIC_API_KEY="sk-..."
python -m lavern.main \
  --document contracts/acquisition_agreement.pdf \
  --workflow contract_review \
  --output reports/
```

**Agente especializado para derecho brasileño:**
```python
BRAZIL_LABOR_SPECIALIST_PROMPT = """
You are a specialist in Brazilian Labor Law (CLT - Consolidação das Leis do Trabalho).

Review employment clauses for:
1. Compliance with CLT requirements (Art. 444, 468 CLT)
2. Non-compete validity under Brazilian law
3. FGTS obligations and provisions
4. Férias (vacation) and 13º salário provisions

Critical: ANY finding must cite the specific clause AND the CLT article.
Flag clauses that conflict with CLT minimum rights (cannot be waived).
Language: Portuguese (BR)
"""
```

---

## Patrón 4: MCP Legal Server con Claude Desktop (Para Abogados)

**Repos:** [Open-Source-Legal/OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) + [agentic-ops/legal-mcp](https://github.com/agentic-ops/legal-mcp)  
**Licencia:** MIT — libre para productos comerciales  
**Tiempo:** 2-3 semanas  
**Costo operativo:** ~$0.001/mensaje

```json
{
  "mcpServers": {
    "firm-contracts": {
      "url": "http://contracts.firma.com/mcp/",
      "transport": "http"
    },
    "legal-workflows": {
      "command": "uvx",
      "args": ["legal-mcp"],
      "env": {
        "LEGAL_MCP_CORPUS": "client_contracts",
        "LEGAL_MCP_JURISDICTION": "MX"
      }
    }
  }
}
```

```python
from mcp.server.fastmcp import FastMCP
import anthropic

mcp = FastMCP("Firma Legal MCP")
client = anthropic.Anthropic()

@mcp.tool()
def search_precedents(legal_issue: str, jurisdiction: str = "MX") -> str:
    """Busca precedentes en el corpus de la firma."""
    docs = oc_client.search(query=legal_issue, corpus="precedents",
                            filters={"jurisdiction": jurisdiction})
    return format_precedents(docs)

@mcp.tool()
def analyze_clause_risk(clause_text: str, clause_type: str) -> dict:
    """Analiza el riesgo de una cláusula usando CUAD."""
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=1024,
        messages=[{"role": "user",
                   "content": f"Analyze this {clause_type} clause:\n\n{clause_text}"}]
    )
    return {"analysis": response.content[0].text}

@mcp.tool()
def draft_clause(clause_type: str, party_position: str, jurisdiction: str = "MX") -> str:
    """Genera borrador de cláusula."""
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2048,
        system=f"Draft {party_position} {clause_type} clause for {jurisdiction} law.",
        messages=[{"role": "user", "content": "Draft a new clause."}]
    )
    return response.content[0].text

if __name__ == "__main__":
    mcp.run(transport="http", port=8001)
```

---

## Patrón 5: LATAM Compliance AI — Reforma Tributaria + LGPD/LPDP

**Repos:** [LexPredict/lexpredict-lexnlp](https://github.com/LexPredict/lexpredict-lexnlp) + Claude Haiku + ERPNext  
**Licencia:** AGPL-3.0 ⚠️ — revisar para SaaS  
**Tiempo:** 4-5 semanas  
**Costo operativo:** ~$0.0003/documento

```python
import anthropic
from lexnlp.extract import dates, amounts, parties, definitions

client = anthropic.Anthropic()

def extract_contract_entities(contract_text: str) -> dict:
    return {
        "dates": list(dates.get_dates(contract_text)),
        "amounts": list(amounts.get_amounts(contract_text)),
        "parties": list(parties.get_parties(contract_text)),
        "definitions": list(definitions.get_definitions(contract_text))
    }

def check_brazil_tax_compliance(contract_text: str) -> dict:
    """Verifica compliance con Reforma Tributária (IBS/CBS) + LGPD."""
    entities = extract_contract_entities(contract_text)

    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=2048,
        system="""Você é especialista em direito tributário brasileiro e LGPD.
        
Analise contratos para:
1. Cláusulas de preço: verificar CBS/IBS (vigência 2027-2033 transição)
2. Responsabilidade fiscal: quem absorve variação tributária
3. Dados pessoais: compliance com LGPD (Lei 13.709/2018)
4. NFe/CFDI: referências corretas

Sempre cite o texto específico da cláusula e o artigo legal violado.""",
        tools=[{
            "name": "tax_compliance_report",
            "description": "Report tax compliance findings",
            "input_schema": {
                "type": "object",
                "properties": {
                    "issues_found": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "issue": {"type": "string"},
                                "severity": {"type": "string", "enum": ["LOW", "MEDIUM", "HIGH"]},
                                "recommendation": {"type": "string"}
                            }
                        }
                    },
                    "lgpd_risks": {"type": "array", "items": {"type": "string"}},
                    "compliant": {"type": "boolean"}
                },
                "required": ["issues_found", "compliant"]
            }
        }],
        tool_choice={"type": "any"},
        messages=[{"role": "user",
                   "content": f"Contrato:\n{contract_text}\n\nEntidades: {entities}"}]
    )

    for block in response.content:
        if block.type == "tool_use":
            return block.input
    return {}
```

---

## Matriz quick-start por tipo de cliente

| Tipo de cliente | Patrón recomendado | Repos base | Tiempo | Costo/mes |
|----------------|-------------------|-----------|--------|----------|
| Firma legal mediana (40-200 abogados) | P3 lavern + P4 MCP Server | lavern + OpenContracts | 6-8 sem | $500-2k LLM |
| Banco / Aseguradora (contratos masivos) | P1 CUAD Review + P5 Compliance | claude-legal-skill + LexNLP | 3-5 sem | $200-800 LLM |
| M&A / Private Equity | P2 OpenContracts RAG | OpenContracts + Claude | 4-6 sem | $1k-3k LLM |
| Empresa mediana (legal in-house) | P4 MCP Server básico | OpenContracts + lavern | 3-4 sem | $100-500 LLM |
| Startup LegalTech LATAM | P1+P5 combinados | lavern + LexNLP | 4-6 sem | $300-1k LLM |
| Gobierno / Sector público | P4 + ArkCase | ArkCase + OpenContracts | 8-12 sem | $200-600 LLM |
| Firma AI-native (nuevo modelo) | P2+P3 full stack | OpenContracts + lavern + Mike | 8-12 sem | $2k-5k LLM |

---

## Selección de modelo por tarea

| Tarea | Modelo | Justificación |
|-------|--------|---------------|
| Revisión masiva de NDAs | claude-haiku-4-5-20251001 | Alto volumen, costo bajo, calidad suficiente |
| Due diligence M&A | claude-sonnet-5 | Alta precisión, citas críticas |
| Drafting de cláusulas | claude-sonnet-5 | Calidad de redacción necesaria |
| Extracción de entidades | claude-haiku-4-5-20251001 | Tarea estructurada, costo $0 |
| Multi-agente debate (lavern) | claude-sonnet-5 | Razonamiento complejo requerido |
| Compliance check básico | claude-haiku-4-5-20251001 | Reglas claras, costo bajo |

---
*Actualizado automáticamente por el pipeline de ingest.*
