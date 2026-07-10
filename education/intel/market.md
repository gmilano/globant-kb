# 🗺️ Mapa de mercado — Education

> Players, oportunidades, posicionamiento. Foco LATAM + global.
> Última actualización: 2026-07-10 (v6)

## Tamaño de mercado

| Segmento | 2026 | 2030 | CAGR | Fuente |
|----------|------|------|------|--------|
| AI in Education (GlobeNewswire) | $10.6B | $42.48B | **41.5%** | GlobeNewswire Apr 7 2026 — mercado cuadruplica en 4 años |
| AI in Education (Precedence) | $9.58B | $136.79B (2035) | ~34% | Precedence Research 2026 |
| AI in Education (Mordor) | $6.90B | $41.01B | 42.83% | Mordor Intelligence 2026 |
| AI in Education (Grand View) | $11.4B | $57.2B (2033) | 25.9% | Grand View Research 2026 |
| GenAI in EdTech (specific) | $0.76B | $3.22B | **43.6%** | The Business Research Company / GlobeNewswire Jul 8 2026 |
| LATAM AI in Education | ~$420M | $1.5B | 32.4% | Grand View Research 2026 |
| LATAM EdTech (total) | ~$25B | $50.44B (2033) | 12.4% | IMARC Group 2024 |
| AI-Powered Early Warning Systems | — | $2.3B saved/year | — | Evelyn Learning 2026 (universities) |

**Dato clave**: 86% de organizaciones educativas usan GenAI — la tasa de adopción más alta de cualquier industria (Microsoft Education Report 2025).
**Dato clave v6**: AI in Education cuadruplica de $10.6B (2026) → $42.48B (2030), CAGR 41.5% (GlobeNewswire Apr 2026).
**Dato clave v6**: Agentic AI ya maneja 81.8% del volumen de interacciones estudiantiles en deployments universitarios (Druid AI Benchmark 2026).

## Players globales

| Empresa | Tipo | Fortaleza | Debilidad | Oportunidad Globant |
|---------|------|-----------|-----------|---------------------|
| Khan Academy (Khanmigo) | Non-profit / SaaS | Socratic AI tutor, 150M+ users, trusted brand, redesign para 2026-2027 | Solo 15% adoption rate actual; proprietary; solo 400k educators (Microsoft) vs 150M users | Fork open alternatives (DeepTutor) sobre su modelo pedagógico Socrático |
| Coursera | Public company | 150M+ learners, GenAI certificate programs | Closed platform; no fork | Integraciones vía LTI para enterprise training |
| Duolingo | Public company | AI-native language learning, 500M+ users, ML personalization | Single domain (language only) | Adjacent: AI tutor para STEM/professional en español |
| Google (LearnLM / Gemini) | Enterprise | LearnLM infused in Gemini 2.5 Pro, 76.4% educator approval, RCT outperforms human tutors | Closed model (Gemini stack); no open source | Claude es el competidor directo — posicionar DeepTutor+Claude vs Gemini+LearnLM |
| HKUDS / DeepTutor | Open source | Agent-native, 30+ LLMs, Apache-2.0, 25.2k★, v1.5.0 Book Engine | No enterprise support layer | Globant = preferred integrator + customizer |
| Moodle HQ | Foundation (Australia) | 400M users, 240+ countries, plugin ecosystem 2000+ | PHP legacy; no native AI | AI overlay: moodle-ai-assistant + DeepTutor |
| Open edX / Axim | Non-profit | Harvard/MIT backing, MOOC scale, Apache-2.0 | Complex DevOps; needs system integrators | Globant = preferred integrator |
| ClassroomIO | Startup OSS | Modern stack (Svelte/Supabase), MIT, corporate focus, MCP server | Early stage; 1.5k★ | Build product on top; co-develop features |
| Microsoft | Enterprise | moodle-ai-assistant (MIT), Azure Education, 170M student accounts | Tied to Azure/OpenAI stack | Replace Azure OpenAI with Claude in ms/moodle-ai-assistant |

## Competidores de modelos AI para educación (H2 2026)

| Modelo | Tipo | Pedagogía | Para Globant |
|--------|------|-----------|--------------|
| LearnLM (Google) | Proprietary (infused Gemini 2.5 Pro) | 76.4% educator approval; supera tutores humanos en RCT 165 estudiantes | Competidor directo — posicionar Claude Sonnet 4.5 + DeepTutor |
| Khanmigo (GPT-4) | Proprietary | Socrático puro; redesign 2026-2027 (15% adoption actual) | Oportunidad: open-source equivalent |
| Claude Sonnet 4.5/Haiku 4.5 | Anthropic API | Multilingüe, context-window largo, tool use nativo, LATAM español/portugués nativo | Stack preferido Globant — mejor cost/quality ratio |
| Gemini 2.5 Pro | Proprietary | LearnLM infused, Google Classroom integration | Competidor en higher ed US/Europe |

## Oportunidades AI en LATAM

| Oportunidad | País | Signal | Tamaño estimado |
|-------------|------|--------|-----------------|
| AI tutor en español para K-12 | MX, AR, CO | Low teacher:student ratio; SEP/NAP curriculum demand | $50M–$200M |
| AI assistant universitario | BR, MX, AR | DEC LATAM Survey: 30k responses, 29 institutions | $100M–$500M |
| Corporate AI training platform | BR, MX, CO | 77% MX corporate AI adoption (per financial-kb); training demand | $80M–$300M |
| Edtech en portugués | BR | Brazil = largest LATAM market; Elevify seed $1.35M; YC-backed edtech | $200M–$1B |
| Ministerio/gobierno digital | CO, CL, PE | Digital transformation mandates; Open edX adoption | $30M–$150M |
| Agentic at-risk prevention | All LATAM | $2.3B ahorro global en dropout prevention; ROI medible para ministerios | $50M–$300M |

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
| AUSS-style Unified Campus Intelligence | $400k–$2M | 20–30 sem | AUSS architecture + LangGraph + Claude + Open edX + BI dashboard |
