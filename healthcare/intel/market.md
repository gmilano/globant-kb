# Mapa de mercado — Healthcare AI

> Players, oportunidades, posicionamiento. Foco LATAM + global.
> Última actualización: 2026-07-07

## Tamaño de mercado

| Métrica | Valor 2026 | Proyección | CAGR |
|---------|-----------|------------|------|
| AI in Healthcare (global) | $50.7B | $505.6B (2033) | 38.9% |
| AI in Healthcare (alt. estimado) | $36.67B | $194.79B (2031) | 39.7% |
| Digital Health LATAM | ~$16B | $66.40B (2033) | 20.05% |
| Hospitales usando AI en alguna función | 80% | — | — |
| Firmas con ambient doc AI | ~100% | — | (saturado) |
| Dispositivos médicos AI/ML FDA cleared | 1,250+ | creciendo | — |
| Inversión VC en healthtech AI (Q1 2026) | $4.2B global | — | — |

---

## Players globales — competidores y ecosystem

### Plataformas AI clínicas (comerciales)
| Empresa | Tipo | Fortaleza | Debilidad |
|---------|------|-----------|----------|
| Nuance DAX (Microsoft) | Ambient documentation | 100% adopción en US health systems | Caro, requiere Azure, lock-in |
| Epic AI | EHR integrado | 260M+ patient records, AI nativa | Propietario, solo clientes Epic, $$$$ |
| Oracle Health (Cerner) | EHR + AI | Grandes sistemas de salud | Complejo de implementar, no customizable |
| IBM Watson Health (adquirido) | Oncología AI | — | Vendido, fragmentado |
| Google Health / Med-Gemma | LLM médico | Med-PaLM 2 acertó USMLE, Med-Gemma open-source | Datos de privacidad cuestionados |
| Amazon HealthLake | Data platform FHIR | AWS ecosystem | Cloud-only, sin open source |
| Rad AI | Radiology AI | Ahorros en radiology workflow | Solo radiología, propietario |
| Veeva | Life sciences AI | Pharma y clinical trials | No clínica hospitalaria |

### Open source / customizable
| Proyecto | Tipo | Adopción | Posicionamiento |
|----------|------|----------|------------------|
| MONAI | Medical imaging | 8.4k★, hospitales de investigación | PyTorch de imaging médico |
| OpenMRS | EMR | 1.9k★, 42+ países | EHR de hospitales públicos mundiales |
| Medplum | FHIR dev platform | 2.5k★, crecimiento rápido | La plataforma moderna para HealthTech builders |
| MEDITRON (EPFL) | Medical LLM | 1.2k★, hospitals on-premise | LLM clínico free, Apache-2.0 |
| PyHealth | Clinical ML | 1.6k★, academia+producción | Predictive modeling en 10 líneas |
| HAPI FHIR | FHIR server | 2.1k★, miles de deploys | Implementación de referencia FHIR |
| cTAKES | Clinical NLP | 400+★, estándar academia | NLP clínico Apache, integra con EHRs |
| OpenEMR | EHR | 2.4k★, 100k+ instalaciones | EHR gratuito para clínicas pequeñas |

---

## Mapa LATAM

### Brasil — mercado dominante

**Contexto:**
- Mercado healthcare LATAM más grande: ~45% del total regional
- SUS (Sistema Único de Saúde): 210M+ ciudadanos con acceso universal
- ConecteSUS: plataforma digital federal llega a 150M+ ciudadanos (vacunas, resultados, medicamentos)
- ANVISA: Law 14.874/24 + PCCP-ready software rules para AI medical devices
- PIX usado para pagamentos de saúde → datos de health spending accesibles

**Oportunidades:**
- AI de triagem no SUS: reducción de filas de espera en UBS (Unidades Básicas de Saúde)
- Documentação clínica ambient en PT-BR: notas SOAP automatizadas para médicos del SUS
- Análise de exames por AI: laudo de raio-X, ECG, dermatoscopia para UBS sem especialista
- Open Health Data analytics: dados ConecteSUS para vigilância epidemiológica AI

**Stack recomendado:** OpenMRS + medspacy PT-BR + MEDITRON + MONAI

### México — segundo mercado

**Contexto:**
- IMSS: 67M+ afiliados; ISSSTE: 14M+; sector privado en crecimiento
- COFEPRIS regula medical AI: aún sin marco tan robusto como FDA/ANVISA
- Telemedicina acelerada post-pandemia: 1,200+ plataformas registradas
- Nearshoring boom: empresas US con empleados MX → demanda de health benefits digitales

**Oportunidades:**
- AI para detección de diabetes: 14.1M diabéticos en MX, subutilización de screening AI
- Telemedicina para zonas rurales (40% población): AI de triage en español mexicano
- Laboratorios clínicos AI: automatización de lectura de resultados (Chopo, Salud Digna)
- Mental health AI: brecha severa, 1 psiquiatra por cada 50k personas

**Stack recomendado:** OpenEMR + Med42 + medspacy ES + LangGraph human gates

### Colombia

**Contexto:**
- Hub de medical BPO regional: history, transcripción, coding
- Minsalud: avanzando en ePrescription y eSalud
- 1DOC3: telemedicina AI validada comercialmente, 3M+ usuarios
- Sectores extractivos (minero, energético): salud ocupacional compleja

**Oportunidades:**
- AI para occupational health: empresas mineras/petroleras con poblaciones dispersas
- Revenue cycle management AI: facturación a EPS/ARS con automatización
- AI para historias clínicas estructuradas: Colombia aún en papel en muchos centros

### Argentina

**Contexto:**
- Ecosistema tech sofisticado, muchos desarrolladores médicos
- PAMI: 5M+ afiliados (adultos mayores), sistema propio de salud
- Inflación afecta inversión en sistemas: soluciones open source preferidas

**Oportunidades:**
- AI para diagnóstico de imagen en clínicas privadas (Sanatorio, Swiss Medical)
- Mental health AI: Argentina tiene la mayor densidad de psicólogos del mundo → AI para apoyo entre sesiones
- Drug interaction AI: farmacias con base propia buscando AI de prescripción checking

---

## 5 Gaps en LATAM — oportunidades para Globant

| # | Gap | Descripción | Tamaño estimado |
|---|-----|-------------|------------------|
| 1 | **Ambient clinical documentation PT-BR/ES** | Nuance DAX ($$$) no está disponible en LATAM. Oportunidad para OpenScribe/Whisper + medspacy + MEDITRON customizado para SUS/IMSS | Muy alto |
| 2 | **AI para imágenes médicas en centros de baja complejidad** | 70%+ de UBS/centros de primer nivel no tienen acceso a radiólogo. MONAI + OHIF + LangGraph puede dar lectura asistida de RX, ECG | Alto |
| 3 | **FHIR interoperability layer LATAM** | Los EHRs de LATAM no hablan entre sí. Medplum + HAPI FHIR + Agentes de traducción semántica como middleware neutral | Alto |
| 4 | **AI de triaje para telemedicina** | 46.7% del revenue de digital health LATAM es telesalud. Falta la capa AI de triage que clasifica urgencia antes del médico | Muy alto |
| 5 | **Clinical AI con compliance ANVISA/COFEPRIS** | No existe un framework open source de clinical AI pre-certificado para LATAM. Globant puede construir el "clinical AI starter kit LATAM-compliant" | Alto |

---

## Posicionamiento Globant

**Propuesta de valor:**
> "Globant AI Studios construye soluciones de AI clínica sobre la capa open source de healthcare (MONAI, OpenMRS, Medplum, medspacy, MEDITRON) para hospitales regionales, neobancos de salud, aseguradoras y ministerios de salud en LATAM — con compliance ANVISA/COFEPRIS/FDA desde día 1."

**Diferenciadores:**
- Fine-tuning de MEDITRON/BioMistral con datos clínicos propietarios del cliente en PT-BR, ES-LATAM
- Integración MCP-FHIR + agents para acceso estructurado a datos EHR sin integration custom
- MONAI pipeline para imaging AI con inference on-premise (HIPAA/ANVISA: sin datos en cloud)
- Human-in-the-loop patterns con LangGraph (obligatorio para diagnósticos de alto riesgo)
- Builds sobre Apache Fineract analogy: HAPI FHIR + Medplum sin vendor lock-in

**GTM tabla:**

| Segmento | Pain point | Solución Globant | Deal size |
|----------|-----------|------------------|----------|
| Hospital regional BR/MX (200-1000 camas) | Documentación manual, sin radiólogo AI | Ambient doc + MONAI imaging AI | $200k-600k |
| Plataforma telemedicina LATAM | Triage ineficiente, costo médico alto | AI triage ES/PT + LangGraph escalamiento | $150k-450k |
| Aseguradora / EPS | Revenue cycle manual, fraude en claims | Claims AI + PyHealth + audit trail | $300k-900k |
| Ministerio de Salud | Epidemiología sin datos estructurados | FHIR interop + AI surveillance | $200k-1M |
| Clínica de oncología privada | Tumor boards lentos, no hay acceso remoto | MDTeamGPT pattern + MONAI | $400k-1.2M |
