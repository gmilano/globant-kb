# 🧩 Patrones de composición — Legal Services AI

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-12

## Arquitectura base

```
[Corpus legal del cliente]
          ↓
[Document Intelligence Layer — OpenContracts / ContraxSuite]
          ↓
[MCP / API bridge]
          ↓
[Agentes especializados — lavern / claude-legal-skill / custom]
          ↓
[Human review gate → aprobación obligatoria]
          ↓
[Output: redlines, reportes, compliance checks, filings]
```

---

## Receta 1: Contract Intelligence Platform (enterprise)

**Caso de uso**: firma legal o equipo in-house que necesita revisar cientos de contratos (M&A, NDA, vendor agreements) y extraer cláusulas clave + riesgos.

**Stack**:
- **Base**: [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) (MIT) — document repository con MCP
- **NLP base**: [LexNLP](https://github.com/LexPredict/lexpredict-lexnlp) — extracción de fechas, partes, montos
- **Agentes**: [claude-legal-skill](https://github.com/evolsb/claude-legal-skill) (MIT) — CUAD risk detection para 41 tipos de cláusulas
- **LLM**: Claude 5 Sonnet via Anthropic API
- **Benchmarking**: [CUAD dataset](https://github.com/TheAtticusProject/cuad) para validar precisión

**Arquitectura**:
```
PDF/DOCX contracts
      ↓ OpenContracts bulk ingest
Document store + citation graph (PostgreSQL + Qdrant)
      ↓ MCP server
Claude Desktop / agente custom
      ↓ claude-legal-skill
CUAD-based risk scoring × 41 clause types
      ↓ human review gate
Redlined output + risk report → Word/PDF
```

**Pasos de implementación**:
1. Deploy OpenContracts (Docker Compose, ~2h)
2. Ingerir corpus del cliente via API batch
3. Configurar annotation schema por tipo de contrato (NDA, MSA, SOW)
4. Integrar claude-legal-skill via MCP
5. Configurar dashboard de riesgos (React UI de OpenContracts)
6. Human review gate antes de entrega a abogado revisor

**Tiempo estimado**: 2-3 semanas para MVP | 6-8 semanas para producción enterprise
**Costo infra**: ~$200-500/mes (self-hosted) + costos de API Claude

---

## Receta 2: Agentic Law Firm (due diligence y M&A)

**Caso de uso**: proceso de due diligence para M&A — revisar data room con 500-2000 documentos, identificar red flags legales, producir memo de riesgos.

**Stack**:
- **Orquestador**: [lavern](https://github.com/AnttiHero/lavern) (Apache-2.0) — 67 agentes especializados
- **LLM primario**: Anthropic Claude 5 Sonnet
- **LLM EU/soberano**: Mistral Large (soporte nativo en lavern)
- **Local fallback**: Ollama + Llama 3.3 (soporte nativo en lavern)
- **Fuentes de datos**: [CourtListener API](https://www.courtlistener.com/) para jurisprudencia de referencia

**Cómo funciona lavern**:
```
Data room (PDFs, contratos, financieros, IP docs)
      ↓ Clawern daemon (lavern)
67 agentes especializados leen + postean hallazgos con citas
      ↓ debate protocol (3 rondas de verificación cruzada)
      ↓ 10-pass verification loop
HUMAN GATE — abogado senior aprueba antes de continuar
      ↓
Due diligence memo con evidencia citada
```

**Diferenciadores**:
- Debate entre agentes elimina confirmación sesgada
- Citas obligatorias con evidencia del documento fuente
- No hallucina jurisprudencia (grounding en CourtListener)
- Human gate explícito — cumple con políticas de responsabilidad profesional

**Tiempo estimado**: 3-4 semanas para integración + datos del cliente
**Nota**: configurar con Mistral EU u Ollama si el cliente requiere datos en Europa o on-premise.

---

## Receta 3: Legal Document Automation (document assembly)

**Caso de uso**: firma legal o acceso a justicia — automatizar generación de documentos estándar (NDAs, contratos de trabajo, demandas tipo, testamentos simples).

**Stack**:
- **Base**: [Docassemble](https://github.com/jhpyle/docassemble) (MIT) — expert system para entrevistas guiadas
- **LLM**: Claude 5 Haiku (bajo costo para volumen alto de documentos)
- **Firma electrónica**: integración HelloSign/DocuSign API
- **Almacenamiento**: S3-compatible (MinIO si self-hosted)

**Flujo**:
```
Usuario responde entrevista guiada (Docassemble YAML)
      ↓ lógica condicional Python
Claude Haiku: redactar cláusulas customizadas basadas en respuestas
      ↓ revisión breve del usuario
Documento generado (DOCX + PDF)
      ↓ Firma electrónica (opcional)
      ↓ Almacenamiento seguro
```

**Casos concretos**:
- NDA estándar → 5 min de entrevista → documento listo para firma
- Contrato de trabajo → 10 preguntas → MSA customizado
- Actas societarias → wizard → PDF firmable
- Acceso a justicia: demanda de desalojo, protección de consumidor

**Tiempo estimado**: 1-2 semanas por tipo de documento
**Costo**: < $50/mes infra + ~$0.01-0.05 por documento con Claude Haiku

---

## Receta 4: Legal Compliance Hub (multi-jurisdicción)

**Caso de uso**: empresa multinacional que necesita chequear compliance de contratos o políticas frente a regulaciones de múltiples países (US, EU, LATAM).

**Stack**:
- **MCP base**: [legal-mcp](https://github.com/agentic-ops/legal-mcp) (MIT) — extensible framework
- **US law**: [us-legal-mcp](https://github.com/JamesANZ/us-legal-mcp) (MIT) — Congress + Federal Register + CourtListener
- **EU compliance**: [open-legal-compliance-mcp](https://github.com/TCoder920x/open-legal-compliance-mcp) (MIT) — EUR-Lex + GDPR + AI Act
- **Agente**: Claude 5 Sonnet con chain-of-thought sobre regulaciones recuperadas
- **Storage**: PostgreSQL para historial de compliance checks

**Patrón de consulta**:
```
Cláusula contractual o política interna
      ↓ legal-mcp router
┌────────────────────────────────────┐
│ us-legal-mcp: ¿viola ley federal? │
│ open-legal-compliance-mcp: GDPR?  │
│ [custom LATAM module]: ley local?  │
└────────────────────────────────────┘
      ↓ Claude 5 Sonnet síntesis
Compliance report con citas y recomendaciones
      ↓ Log en PostgreSQL (auditoría)
```

**Customización LATAM**:
- Agregar módulo para Reforma Tributária Brasil (scraper de Receita Federal + Congreso)
- Módulo para normativa de protección de datos LATAM (LGPD Brasil, Ley 25.326 Argentina, Ley 19.628 Chile)

**Tiempo estimado**: 2-3 semanas para MVP | +1 semana por jurisdicción adicional

---

## Receta 5: AI Legal Assistant para firma SMB (chatbot + RAG)

**Caso de uso**: firma de 10-50 abogados que quiere un asistente interno para responder preguntas sobre jurisprudencia, redactar borradores, y buscar cláusulas en contratos anteriores.

**Stack**:
- **RAG backend**: [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) sobre contratos históricos
- **MCP data sources**: us-legal-mcp (jurisprudencia) + open-legal-compliance-mcp (regulaciones)
- **Chat interface**: cualquier frontend React sobre Claude API
- **LLM**: Claude 5 Sonnet con context window extendida para documentos largos
- **Grounding anti-hallucination**: CourtListener para verificar citas de jurisprudencia

**Guardrails críticos** (post-caso de NY con sanciones de $145k):
1. Todas las citas judiciales deben incluir URL a CourtListener
2. Si no hay jurisprudencia verificada → respuesta explícita "no encontré precedente confirmado"
3. Borradores generados marcados explícitamente como "BORRADOR AI — requiere revisión de abogado"
4. Log de todas las queries para auditoría

**Tiempo estimado**: 3-4 semanas incluyendo ingesta de corpus histórico
**Diferenciador**: RAG sobre contratos propios del cliente (no data genérica) + grounding en fuentes verificadas

---

## Receta 6: Patent Intelligence (USPTO)

**Caso de uso**: empresa de tecnología o firma de PI que necesita analizar paisajes de patentes, detectar conflictos, y redactar claims.

**Stack**:
- **MCP**: [uspto-fpd-mcp](https://github.com/Tam1379/uspto_fpd_mcp) (MIT) — USPTO Final Petition Decisions
- **Base NLP**: [Blackstone](https://github.com/ICLRandD/Blackstone) (Apache-2.0) — NER sobre texto de patentes
- **LLM**: Claude 5 Opus para análisis de complejidad alta (claim analysis)
- **Data**: Google Patents Public Data (BigQuery) + USPTO bulk data

**Flujo**:
```
Descripción de invención (texto libre)
      ↓ Claude: extraer claims técnicos
uspto-fpd-mcp: buscar patentes similares + decisiones IPR previas
      ↓ Blackstone: identificar entidades (inventores, asignees, CPC codes)
      ↓ análisis de libertad de operación
Reporte: conflictos potenciales + claims diferenciales sugeridos
```

**Tiempo estimado**: 2-3 semanas para MVP de patent landscape analysis

---

## Principios de diseño para legal AI en Globant

1. **Human gate siempre antes de filing/firma** — ningún output legal va al mundo sin revisión humana
2. **Citar fuentes verificadas** — RAG sobre bases de datos legales autoritativas (CourtListener, EUR-Lex, Receita Federal)
3. **Logging completo** — auditoría de todas las decisiones AI para responsabilidad profesional
4. **Soberanía de datos** — ofrecer Mistral EU u Ollama para clientes con restricciones de privacidad
5. **Transparencia de limitaciones** — documentar explícitamente qué jurisdicciones y tipos de ley cubre cada sistema
6. **Benchmarking con LegalBench** — validar calidad del sistema antes de producción

---
*Recetas basadas en arquitecturas reales de lavern, OpenContracts, Docassemble, y legal-mcp.*
