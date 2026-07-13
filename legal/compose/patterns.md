# Patrones de composición — Legal Services AI

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-13

## Arquitectura base

```
[Plataforma vertical OSS (Docassemble / OpenContracts / ArkCase)]
          ↓
[MCP Servers legales (us-legal-mcp / canlii-mcp / uspto-mcp)]
          ↓
[Agentes especializados (lavern / claude-legal-skill / SaulLM)]
          ↓
[Orchestration (LangGraph / lavern debate protocol)]
          ↓
[Human gate OBLIGATORIO — abogado aprueba antes de output]
          ↓
[Audit trail (logging para EU AI Act compliance)]
```

---

## P1 — Contract Review Multi-Agente (lavern + Claude)

**Objetivo**: Revisión profunda de contratos complejos con evidencia y debate entre agentes.

**Stack**:
- [lavern](https://github.com/AnttiHero/lavern) (Apache-2.0) — 67 agentes especializados
- Anthropic API (o Mistral EU para cumplimiento de datos europeo)
- [claude-legal-skill](https://github.com/evolsb/claude-legal-skill) (MIT) — CUAD-41 risk detection

**Flujo**:
```
1. Abogado sube contrato al dashboard de lavern
2. Agente "Documento Reader" ingesta y clasifica el contrato
3. 67 agentes especializados (cláusulas de indemnidad, IP, terminación, etc.) analizan en paralelo
4. Protocolo de debate: cada agente publica hallazgos con citas de evidencia
5. Tres capas de verificación — contradicción cruzada entre agentes
6. Human gate — abogado revisa hallazgos antes de síntesis final
7. Output: redlines listas para negociación + audit bundle completo
```

**Tiempo estimado**: 6-10 semanas para MVP (4 agentes iniciales → iterar)
**Casos de uso LATAM**: Contratos M&A, joint ventures binacionales, contratos de distribución regional

---

## P2 — Legal RAG Agentico con OpenContracts + MCP

**Objetivo**: Plataforma de inteligencia documental self-hosted para corpus de contratos corporativos.

**Stack**:
- [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) (MIT) — DMS agentico
- MCP server nativo de OpenContracts
- [us-legal-mcp](https://github.com/mpkrass7/us-legal-mcp) (MIT) — statutes federales
- Claude API para agentes de análisis

**Flujo**:
```
1. Subir corpus de contratos a OpenContracts (self-hosted, Docker)
2. Agentes AI describen y resumen automáticamente cada documento
3. Citation graph se construye automáticamente — cada cita legal como edge del grafo
4. Abogados anotan contratos → las annotations alimentan el grafo
5. Agente consulta: "¿Qué contratos tienen cláusulas de fuerza mayor inconsistentes con el UCC §2-615?"
6. Agente traversa citation graph → encuentra precedentes → respuesta con evidencia estructurada
7. Output: análisis con fuentes exactas, no alucinaciones
```

**Tiempo estimado**: 4-8 semanas
**Diferencial**: Cero alucinaciones — todo respaldado por annotations y citation graph verificable

---

## P3 — Docassemble + AI: Portal de Formularios Legales para LATAM

**Objetivo**: Portal self-hosted de formularios legales guiados con AI, replicando los portales de tribunales de EE.UU. para LATAM.

**Stack**:
- [Docassemble](https://github.com/jhpyle/docassemble) (MIT) — guided interviews
- [SaulLM-7B](https://github.com/Equall-ai/SaulLM-7B) (MIT) — fine-tuned para jurisdicción local
- Claude API para generación de preguntas adaptativas
- CUAD dataset o dataset legal local para entrenamiento

**Flujo**:
```
1. Docassemble: entrevista guiada al usuario (YAML + Python)
2. Claude API interpreta respuestas ambiguas y hace preguntas de seguimiento
3. SaulLM-7B (fine-tuned local) valida que las respuestas son coherentes con la ley aplicable
4. Docassemble genera documento legal en Word/PDF
5. Human gate: revisión por abogado si el caso excede umbrales de complejidad definidos
6. Output: formulario legal listo para firma o presentación ante tribunal
```

**Tiempo estimado**: 8-12 semanas (incluye fine-tuning SaulLM para jurisdicción)
**Casos de uso LATAM**: Poderes notariales, contratos de arrendamiento, demandas civiles básicas, tutelas/amparos

---

## P4 — Agente de Investigación Legal con MCP Servers

**Objetivo**: Agente que investiga cualquier pregunta legal con acceso a múltiples jurisdicciones vía MCP.

**Stack**:
- Claude API (herramienta principal)
- [us-legal-mcp](https://github.com/mpkrass7/us-legal-mcp) — statutes federales EE.UU.
- [canlii-mcp](https://canlii-mcp.vaquill.ai) — derecho canadiense
- [Vaquill-AI legal-mcp](https://github.com/Vaquill-AI/legal-mcp) — 20M+ fallos India
- [uspto_fpd_mcp](https://github.com/Tam1379/uspto_fpd_mcp) — análisis de patentes

**Flujo**:
```
1. Abogado hace consulta en lenguaje natural: "¿Cuáles son los precedentes para incumplimiento de contrato en Ontario?"
2. Claude selecciona los MCP servers relevantes (canlii-mcp para Ontario)
3. Búsqueda en 20M+ fallos con AI-powered legal questions + citation networks
4. Claude sintetiza hallazgos con citas exactas (no alucinaciones — fuentes verificables)
5. Opción de profundizar: traversar la red de citas hacia atrás y adelante
6. Output: memo de investigación con N referencias verificadas
```

**Tiempo estimado**: 2-4 semanas (principalmente integración de MCP servers)
**Extender para LATAM**: Añadir MCP server para SJF mexicano, STF/STJ brasileño, Corte Suprema colombiana/argentina

---

## P5 — Consultor Tributario Brasil: Reforma Tributária Agent

**Objetivo**: Agente de compliance para la Reforma Tributária brasileña (IBS + CBS, 2026-2033).

**Stack**:
- Claude API + tools
- Web search MCP (datos web en tiempo real de nuevas normas)
- [Consultor-Tributario-AI](https://github.com/mahdyet1845/Consultor-Tributario-AI) como referencia
- Base de datos de normas del IBS/CBS (Receita Federal API o scraping)

**Flujo**:
```
1. Empresa carga su perfil: sector, CNAE, estados donde opera, tipo de operaciones
2. Agente analiza impacto de la reforma: IBS estadual vs CBS federal por operación
3. Búsqueda en tiempo real de regulamentaciones nuevas (decreto, portaria, instrução normativa)
4. Comparación de escenarios: régimen transitório 2026 vs régimen definitivo 2033
5. Human gate: contador/abogado tributarista revisa antes de output al cliente
6. Output: informe de impacto + lista de contratos a renegociar + plan de adaptación
```

**Tiempo estimado**: 6-10 semanas
**Por qué urgente**: 5M+ empresas brasileñas necesitan adaptar contratos, notas fiscais y flujos antes de 2027

---

## P6 — Case Management con OpenLawOffice + AI Agents

**Objetivo**: Law firm SMB con case management open source y AI integrada para eficiencia operativa.

**Stack**:
- [OpenLawOffice](https://github.com/NodineLegal/OpenLawOffice) (MIT) — case management, billing, tasking
- [lavern](https://github.com/AnttiHero/lavern) (Apache-2.0) — para document review automático de nuevos casos
- [claude-legal-skill](https://github.com/evolsb/claude-legal-skill) (MIT) — contract review puntual
- Claude API para resúmenes de caso y recomendaciones de próximas acciones

**Flujo**:
```
1. Nuevo caso ingresa a OpenLawOffice
2. AI agent automáticamente: extrae partes, fechas clave, jurisdicción, tipo de caso
3. lavern hace primer análisis del contrato o documento central del caso
4. Claude genera timeline de próximas acciones + riesgos identificados
5. Abogado revisa y acepta/modifica el plan en OpenLawOffice
6. Billing automático tracking de tiempo AI vs tiempo abogado
```

**Tiempo estimado**: 10-14 semanas (incluye integración y UI)
**Target LATAM**: Estudios jurídicos con 5-30 abogados en Buenos Aires, Ciudad de México, São Paulo

---

## P7 — EU AI Act Compliance Agent para Legal AI Deployments

**Objetivo**: Agente que audita que los sistemas AI legales propios cumplen con el EU AI Act (ago 2026).

**Stack**:
- Claude API
- [opencontracts](https://github.com/Open-Source-Legal/OpenContracts) para audit trail de decisiones
- Custom risk assessment framework basado en EU AI Act Annex III

**Flujo**:
```
1. Empresa declara sus sistemas AI legales en uso
2. Agente clasifica cada sistema: riesgo prohibido / alto riesgo / limitado / mínimo
3. Para sistemas de alto riesgo: genera lista de gap entre estado actual y requerimientos EU AI Act
4. Human gate: DPO y Compliance Officer aprueban la clasificación
5. Genera plan de remediación con fechas y owners
6. Genera documentación técnica requerida (conformity assessment, technical documentation)
7. Monitoring continuo: alerta si cambios en el sistema cambian la clasificación de riesgo
```

**Tiempo estimado**: 4-6 semanas
**Urgencia**: Agosto 2, 2026 — penalties de 7% revenue global o €35M por non-compliance
