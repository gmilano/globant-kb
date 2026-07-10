# 🗺️ Mapa de mercado — Education

> Players, oportunidades, posicionamiento. Foco LATAM + global.
> Última actualización: 2026-07-10

## Tamaño de mercado

| Segmento | 2026 | 2030 | CAGR | Fuente |
|----------|------|------|------|--------|
| AI in Education (global) | $9.58B | $136.79B (2035) | ~34% | Precedence Research 2026 |
| AI in Education (Mordor) | $6.90B | $41.01B | 43% | Mordor Intelligence 2026 |
| GenAI in EdTech (specific) | $0.76B | $3.22B | 43.6% | The Business Research Company / GlobeNewswire Jul 8 2026 |
| LATAM AI in Education | ~$420M | $1.5B | 32.4% | Grand View Research 2026 |
| LATAM EdTech (total) | ~$25B | $50.44B (2033) | 12.4% | IMARC Group 2024 |
| AI in Personalized Learning | — | — | High | InsightAce Analytic 2026 |

**Dato clave**: 86% de organizaciones educativas usan GenAI — la tasa de adopción más alta de cualquier industria (Microsoft Education Report 2025).

## Players globales

| Empresa | Tipo | Fortaleza | Debilidad | Oportunidad Globant |
|---------|------|-----------|-----------|---------------------|
| Khan Academy (Khanmigo) | Non-profit / SaaS | Socratic AI tutor, 150M+ users, trusted brand | Proprietary; no B2B customization | Fork open alternatives (DeepTutor) sobre su modelo pedagógico |
| Coursera | Public company | 150M+ learners, GenAI certificate programs | Closed platform; no fork | Integraciones vía LTI para enterprise training |
| Duolingo | Public company | AI-native language learning, 500M+ users, ML personalization | Single domain (language only) | Adjacent: AI tutor para STEM/professional en español |
| HKUDS / DeepTutor | Open source | Agent-native, 30+ LLMs, Apache-2.0, 23.7k★ | No enterprise support layer | Globant = preferred integrator + customizer |
| Moodle HQ | Foundation (Australia) | 400M users, 240+ countries, plugin ecosystem 2000+ | PHP legacy; no native AI | AI overlay: moodle-ai-assistant + DeepTutor |
| Open edX / Axim | Non-profit | Harvard/MIT backing, MOOC scale, Apache-2.0 | Complex DevOps; needs system integrators | Globant = preferred integrator |
| ClassroomIO | Startup OSS | Modern stack (Svelte/Supabase), MIT, corporate focus | Early stage; 1.5k★ | Build product on top; co-develop features |
| Microsoft | Enterprise | moodle-ai-assistant (MIT), Azure Education | Tied to Azure/OpenAI stack | Replace Azure OpenAI with Claude in ms/moodle-ai-assistant |
| Google (Workspace for Education) | Enterprise | 170M+ student accounts, Classroom integration | Closed AI stack (Gemini proprietary) | Open alternatives on top of Google Classroom API |

## Oportunidades AI en LATAM

| Oportunidad | País | Signal | Tamaño estimado |
|-------------|------|--------|-----------------|
| AI tutor en español para K-12 | MX, AR, CO | Low teacher:student ratio; SEP/NAP curriculum demand | $50M–$200M |
| AI assistant universitario | BR, MX, AR | DEC LATAM Survey: 30k responses, 29 institutions | $100M–$500M |
| Corporate AI training platform | BR, MX, CO | 77% MX corporate AI adoption (per financial-kb); training demand | $80M–$300M |
| Edtech en portugués | BR | Brazil = largest LATAM market; Elevify seed $1.35M; YC-backed edtech | $200M–$1B |
| Ministerio/gobierno digital | CO, CL, PE | Digital transformation mandates; Open edX adoption | $30M–$150M |

**Google.org $4.6M** investment specifically in LATAM AI education: teacher training + 1.25M students target. Signals institutional appetite and public-sector alignment.

## Posicionamiento Globant — oportunidades de deal

| Tipo de proyecto | Tamaño deal | Tiempo | Stack recomendado |
|-----------------|-------------|--------|-------------------|
| Moodle AI copilot para universidad LATAM | $100k–$500k | 8–16 sem | Moodle + moodle-ai-assistant + Claude Haiku/Sonnet |
| Open edX AI extension para MOOCs corporativos | $200k–$1M | 12–20 sem | Open edX + openedx-ai-extensions + DeepTutor + Claude |
| Plataforma de AI training enterprise (greenfield) | $150k–$800k | 10–18 sem | ClassroomIO + Claude Sonnet API + custom agents |
| AI tutor LATAM K-12 (español/portugués) | $80k–$400k | 8–12 sem | DeepTutor fork + Claude Sonnet + Open edX o Moodle |
| Agentic campus: early-warning + proactive nudging | $300k–$1.5M | 16–24 sem | Open edX + LangGraph + Claude + xAPI analytics pipeline |
| LectūraAgents: AI teacher avatar para cursos async | $150k–$600k | 8–14 sem | LectūraAgents + Claude Sonnet + D-ID avatar |
