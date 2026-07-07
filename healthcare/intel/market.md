# 🗺️ Mapa de mercado — Healthcare AI

> Players, oportunidades, posicionamiento. Foco LATAM + global.
> Última actualización: 2026-07-07 (v2 — datos de mercado verificados)

## Tamaño de mercado

| Segmento | 2026 | Proyección | CAGR |
|----------|------|-----------|------|
| AI en Healthcare (global) | $50.7B | $505.6B (2033) | 38.9% |
| Agentic AI en Healthcare | $1.83B | $19.71B (2034) | ~35% |
| Digital Health LATAM | $12.82B (2024 base) | $66.40B (2033) | 20.05% |
| Telemedicina LATAM | $3.46B | $12.34B (2034) | 17.23% |

**Señal clave (Deloitte, 2026)**: 80% de ejecutivos healthcare esperan valor significativo de agentes AI. Solo 3% tienen agentes en producción. → **Ventana de oportunidad masiva**: primero en llegar define el stack.

## Players globales

| Empresa | Tipo | Fortaleza | Debilidad |
|---------|------|-----------|----------|
| **Epic Systems** | EHR propietario | 35% del mercado hospitalario US, AI scribe integrado | Lock-in extremo, sin API abierta real, caro |
| **Cerner (Oracle Health)** | EHR propietario | Fuerte en hospitales grandes, VA/DoD | Post-adquisición Oracle caótico, integración lenta |
| **Nuance (Microsoft)** | AI clínica | DAX Copilot (ambient scribe), integración Azure + Epic | Propietario, caro para mid-market |
| **Tempus AI** | Oncología AI | Datos genómicos + AI para oncología, FDA cleared | Solo oncología, base de datos propietaria |
| **Google Health** | Tech grande | DeepMind AlphaFold, Med-PaLM 2, Fitbit data | Privacidad cuestionada, proyectos discontinuados |
| **Amazon HealthLake** | Cloud AI | FHIR nativo, HealthLake MCP, escala AWS | Dependencia AWS, costo en escala |
| **OpenMRS Community** | Open source EHR | 50+ países, FHIR nativo, sin vendor lock-in | Recursos de desarrollo limitados |
| **Bahmni (ThoughtWorks)** | Open source HIS | Hospital completo + bajo recurso, ONG/gobiernos | Requiere customización; soporte comunidad |
| **Mediware / Nuvolo** | Specialty clinical | Especialidades clínicas propietarias | No AI-first |

## Mapa de oportunidades LATAM

### Brasil (mercado líder)
- **Tamaño**: Mayor mercado digital health LATAM (>40% del total regional)
- **Driver**: Presidente Lula → Plan AI $4B en 4 años incluyendo salud pública
- **Oportunidad**: Sistema Único de Saúde (SUS) con 214M usuarios → enorme base para AI pública
- **LGPD**: Ley brasileña de protección de datos equivalente a HIPAA → demanda LLMs on-premise / privacidad
- **Tracción**: Plataformas de telemedicina (Teladoc, Docway, iClinic) en expansión con AI

### México
- **Tamaño**: 2do mercado LATAM, parte del top-3 con >70% del share regional
- **Driver**: Crecimiento clase media + seguro privado + turismo médico ($6B+/año)
- **Oportunidad**: IMSS/ISSSTE con sistemas legacy → modernización con AI; hospitales privados compitiendo con AI scribe
- **Gap**: Falta de EHR interoperables → Bahmni/OpenEMR + FHIR como oportunidad

### Argentina
- **CAGR más alto (2026-2031)** según Grand View Research
- **Driver**: Crisis económica → telemedicina más económica que presencial; talento técnico de alto nivel
- **Oportunidad**: Sector privado (OSDE, Swiss Medical) invirtiendo en AI para eficiencia operativa
- **Gap**: Integración AI con prepagas (obra social) para automatización de autorizaciones médicas

### Colombia / Chile / Perú
- **Crecimiento acelerado** en telemedicina post-COVID
- Colombia: Ecosistema healthtech Bogotá emergente; regulación favorable
- Chile: Sistema dual público/privado (Fonasa/Isapre) → AI para optimización de beneficios

## Oportunidades específicas para Globant AI Studios

| Oportunidad | Mercado | Stack recomendado | Tamaño deal estimado |
|-------------|---------|-------------------|---------------------|
| Prior Authorization AI | US (revenue cycle) | openmed-agent + LangGraph + FHIR MCP | $200k–$800k |
| Ambient Scribe para clínicas LATAM | Brasil / México / Argentina | Whisper + Claude + FHIR write | $150k–$500k |
| CDSS open source para hospitales públicos | Brasil (SUS) / México (IMSS) | OpenMRS + medspaCy + LangGraph | $300k–$1.2M |
| Telemedicina AI (triage + diagnóstico) | LATAM broad | Ottehr + Multi-Agent-Medical-Assistant | $200k–$600k |
| Drug discovery / investigación | Global / Universidades | BioChatter + BioCypher + LLMs locales | $100k–$400k |
| Compliance LGPD/HIPAA on-premise | Brasil / US | openmed (local) + HAPI FHIR local | $150k–$500k |

## Posicionamiento Globant

**Ventaja diferencial**:
- Delivery LATAM + presencia en US → único proveedor que puede entregar compliance LGPD+HIPAA
- Expertise en plataformas open source (Bahmni, OpenMRS, OpenEMR) sin lock-in de vendor
- Stack AI agéntico sobre EHR existente → time-to-value 6-12 semanas vs. 18 meses legacy
- Talento en AI/ML + conocimiento regulatorio salud LATAM
