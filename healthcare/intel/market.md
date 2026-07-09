# 🗺️ Mapa de mercado — Healthcare AI 2026

> Players, oportunidades, posicionamiento. Foco LATAM + global.
> Última actualización: 2026-07-09 (v5 — market $36.67B→$194.79B, agentic $1.83B→$19.71B, 81% physician adoption, ARPA-H ADVOCATE, FDA CDS expansion)

## Mercado Global — Tamaño y Proyecciones

| Segmento | 2026 | Proyección | CAGR | Fuente |
|----------|------|------------|------|--------|
| AI en Healthcare (general) | $36.67B | $194.79B (2031) | 39.7% | MarketsandMarkets |
| AI en Healthcare (Grand View) | $50.7B | $505.6B (2033) | 38.9% | Grand View Research |
| Agentic AI en Healthcare | $1.83B | $19.71B (2034) | 34.61% | Fortune Business Insights |
| Agentic AI en Healthcare (R&M) | $1.03B | $5.78B (2031) | 42.03% | Research and Markets |
| GenAI en Healthcare | $0.95B | $5.77B (2030) | 43.4% | GlobeNewswire Jul 8, 2026 |
| AI en Healthcare (Precedence) | $613.81B by 2034 | — | 43.96% | Precedence Research |

## Estadísticas de adopción clave (2026)

| Métrica | Valor 2026 | Comparación |
|---------|-----------|-------------|
| Sistemas de salud US usando AI | 75% | vs. 59% en 2024 |
| Médicos US usando AI profesionalmente | **81%** | vs. 38% en 2023 (más del doble) |
| Healthcare orgs con AI activa | 70% (NVIDIA Survey) | vs. 63% en 2025 |
| Workload principal: GenAI + LLMs | 69% | — |
| Management reporta mayor revenue | 85% | — |
| Management reporta reducción costos | 80% | — |
| Agentic AI: evaluando o usando | 47% | (nuevo en NVIDIA survey 2026) |
| Budget AI aprobado para 2026 | 61% | BCG Ene 2026 |
| Agentes AI en producción | solo 3% | Brecha masiva piloto→producción |
| Orgs planean aumentar budget AI | 85% | NVIDIA Survey 2026 |

## Players Globales

| Empresa | Tipo | Fortaleza | Debilidad |
|---------|------|-----------|-----------|
| Epic Systems | Propietario | EHR líder US, 250M+ pacientes, integra AI nativo (DAX Ambient) | Caro, cerrado, difícil customizar |
| Oracle Health (Cerner) | Propietario | 5,500+ hospitales globales, Oracle Cloud AI | Migración compleja, atención post-adquisición |
| Nuance/Microsoft | Propietario | DAX Copilot ambient scribe ($150M ARR), Azure AI HIPAA | Cloud-only, privacy concerns |
| Google Health/DeepMind | Propietario | AlphaFold 3, MedGemini, Vertex AI for Healthcare | Privacy concerns, foco en investigación |
| NVIDIA | Hardware + SW | GPU H100/H200, BioNeMo, NemoClaw, NIM for Healthcare, Proteina-Complexa | No es sistema clínico; enabler |
| Medplum | Open Source (Apache-2.0) | FHIR-native TypeScript, startup-friendly, HIPAA+SOC2 incluido | Comunidad en crecimiento, menor que Epic |
| OpenEMR | Open Source (GPL-2.0) | Más usado open source, 1,000+ implementaciones, FHIR 8.0 certificado | PHP legacy, deuda técnica |
| OpenMRS | Open Source (MPL-2.0) | 42+ países, LATAM/África, FHIR R4 nativo, Digital Public Good | Optimizado para recursos limitados |
| Harvey (legal AI) / equiv. | VC-backed | Fuerte en NLP médico + regulatory | Closed-source, vertical estático |
| Abridge / Nabla / Suki | VC-backed | Ambient scribes médicos líderes | Closed, SaaS-only |

## Regulación — Puntos de inflexión 2026

### FDA — Nuevas políticas clave
| Evento | Fecha | Impacto |
|--------|-------|---------|
| UpDoc FDA 510(k) K253281 | Jun 25, 2026 | **Primer LLM patient-facing aprobado como SaMD** — pathway regulatorio validado |
| FDA CDS Guidance actualizada | Ene 2026 | Non-Device CDS expandido: AI revisable por médico = sin regulación FDA |
| ARPA-H ADVOCATE | Jun 2026 | Programa para primer agente cardiovascular FDA-authorized; 3-year timeline |
| FDA agentic AI deployment | 2026 | FDA adopta agentic AI internamente — señal de legitimación regulatoria |

### HIPAA + Privacidad
- HHS guidance 2026: PHI en AI modelos cloud → requires BAA + compliance audit
- **NemoClaw** (NVIDIA) = solución enterprise: PHI never leaves hospital datacenter
- Brasil: LGPD multas hasta 2% facturación → demanda on-premise fuerte en LATAM

### TEFCA
- 1 billón de intercambios en <1 año — infraestructura nacional madura
- SSA se une → disability claims 50%+ más rápido
- "La liquidez de datos es la necesidad definitoria cuando AI se aplica a salud" — Thomas Keane, HHS

## Oportunidades AI en LATAM

| País | Mercado | Driver | Oportunidad para Globant |
|------|---------|--------|--------------------------|
| Brasil | SUS 214M usuarios; Plan Lula $4B AI (4 años) | Salud pública + telemedicina + LGPD on-premise | Prior auth SUS; AI para diagnóstico comunitario; ambient scribe PT-BR |
| Argentina | CAGR más alto 2026-2031 en digital health LATAM; crisis impulsa telemedicina | Ineficiencia del sistema → demanda de automatización | Autorización de coberturas AI; triage; gestión de turnos |
| México | Turismo médico $6B/año; expansión seguro privado | Demanda de calidad hospitalaria; prior auth privado | Diagnóstico asistido; documentación clínica; prior authorization |
| Colombia | Ecosistema healthtech Bogotá emergente; LATAM "testing ground" clínico | Regulación ágil; diversidad genética; costos de ensayo menores | Plataformas digitales salud; AI diagnóstico especialidades escasas |
| Chile | Isapre en crisis → eficiencia con AI; penetración digital alta | Reforma sistema de salud → ventana de modernización | Gestión de prestaciones + AI; AI para Fonasa |

**Drivers LATAM comunes**:
- Escasez de especialistas (radiólogos, psiquiatras, dermatólogos) → diagnóstico AI
- Alta penetración de telemedicina (46.7% del revenue digital health en LATAM)
- Interoperabilidad limitada → oportunidad para FHIR + AI layers
- LATAM = "testing ground" para AI medical device clinical trials (Medical Device Online 2026)

## Posicionamiento Globant

### Propuesta de valor diferencial
1. **Open source first**: Globant construye sobre Medplum + OpenMRS + OpenClaw (no lock-in propietario)
2. **Compliance embebido**: NemoClaw + FHIR audit trails → HIPAA/LGPD desde el día 1
3. **Evaluación rigurosa**: MedAgentBench + CHI-Bench como gate de calidad antes de producción
4. **LATAM native**: Spanish NLP (medspaCy en español) + LATAM regulaciones conocidas + presencia regional

### Deal sizes estimados
| Tipo de proyecto | Range | Duración |
|-----------------|-------|----------|
| CDSS Non-Device (revisable médico) | $80k–$300k | 8–16 semanas |
| Prior Auth Automation (revenue cycle) | $150k–$500k | 12–20 semanas |
| Ambient Scribe (Whisper + Claude + EHR) | $50k–$200k | 6–12 semanas |
| Plataforma FHIR greenfield (Medplum) | $100k–$600k | 16–32 semanas |
| NemoClaw enterprise (hospital US grande) | $400k–$1.5M | 20–40 semanas |
| Drug Discovery AI stack (biotech/pharma) | $300k–$1.5M | 20–40 semanas |
| LATAM digital health platform | $100k–$400k | 12–24 semanas |

---
