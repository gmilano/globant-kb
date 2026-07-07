# Mapa de mercado — Gaming AI

> Players, tamaños, oportunidades. Foco LATAM + posicionamiento Globant.
> Última actualización: 2026-07-07

## Tamaño de mercado global

| Segmento | Valor 2025 | Valor 2026 | CAGR | Horizonte |
|----------|------------|------------|------|-----------|
| AI Game Development (global) | $5.23B | $6.10B | 16.8% | → $18.75B en 2034 |
| AI in Games (global) | $2.87B | $3.4B | 18.5% | 2025-2026 |
| AI in Gaming (amplio) | $4.54B | — | 33.57% | → $81.19B en 2035 |
| Generative AI in Gaming | $1.79B | $2.21B | 23.1% | → $5.09B en 2030 |
| NPCs + Digital Humans | — | 28.6% del total AI gaming | — | mayor segmento |
| LATAM Gaming market | $25.70B | $28.04B | 9.12% | 2026-2034 |
| LATAM AI investment | 1.12% del gasto AI global | — | — | vs 6.6% del PIB = brecha/oportunidad |

**Adopción**: 87% de estudios ya usa AI agents en sus workflows (Google Cloud survey, 615 developers, jun-jul 2025). 50%+ de estudios AAA. **30% de estudios AAA ya tiene sistemas AI propietarios** entrenados en datos internos (GDC Festival 2026, mayo 2026).

## Análisis Morgan Stanley — $22B en ganancias desbloqueadas (abril 2026)

| Dato | Valor |
|------|-------|
| Gasto global consumidores en juegos (2026) | **$275B** |
| % reinvertido en desarrollo y operaciones | ~20% ($55B) |
| Reducción de costos estimada por AI | **~50%** |
| Ganancias adicionales desbloqueables | **$22B / año** |
| Mecanismo principal | Coding automatizado, testing, content generation |

**Beneficiarios directos según Morgan Stanley**: Tencent, Sony, Roblox (plataformas/operadores) + Take-Two, EA, Ubisoft (publishers con escala para desplegar AI en múltiples títulos).

**Implicación para Globant**: el driver de adopción de AI en gaming ya es **financiero** (reducción de COGS), no solo tecnológico. Los decisores en estudios son ahora CFOs y boards, no solo CTOs. El pitch óptimo cuantifica el ROI: % de reducción de QA manual + velocidad de content pipeline.

*Fuente: morganstanley.com/insights/articles/ai-gaming-22-billion-industry-earning-potential-2026, reuters.com (abril 2026)*

**GDC 2026 sentiment** (julio 2026): 52% de devs ven GenAI negativamente (vs 30% en 2025). Adopción corporativa 52%, uso personal 36%. La brecha "mandato vs convicción" es el dato estratégico del año — los estudios adoptan por top-down, los devs resisten en el día a día. La ventana es tooling invisible (QA, matchmaking, analytics).

*Fuentes actualizadas jul 2026: thebusinessresearchcompany.com (GenAI Gaming), intelmarketresearch.com/ai-game-development-market, winbuzzer.com/2026/03/23 (GDC 2026 survey).*

---

## Players globales — Engines y plataformas

| Empresa | Tipo | Fortaleza AI | Debilidad | Modelo |
|---------|------|-------------|-----------|--------|
| **Unity Technologies** | Engine propietario | Unity AI 6.2 integrado (Assistant, Generators, Inference Engine). ML-Agents OSS 19.5k stars. | Controversia pricing 2023, recuperando confianza. Cerrado para AAA top-tier. | Revenue share + suscripción |
| **Epic Games (Unreal)** | Engine propietario | MetaHuman AI. Aura agent (Ramen VR, ene 2026). Persona Device para Fortnite creator. | Curva de aprendizaje alta. Royalty 5% > $1M. | Royalty |
| **Roblox** | Plataforma UGC | AI Studio (MCP). CUBE 3D 1.8B params para objetos 3D. OpenGameEval OSS. Creators: $1B+/año via DevEx. | Audiencia mayormente juvenil. Limitado para juegos "serios". | Revenue share |
| **Microsoft / Xbox** | Cloud + tools | Azure AI Services para gaming. Sponsor O3DE. Phi-3/4 on-device. | No tiene engine propio competitivo. | Cloud usage |
| **NVIDIA** | GPU + SDK | ACE (ASR+NLP+TTS+animación NPC realtime). RTX Neural Shading. Fork Godot con path tracing (GDC 2026, MIT). | Dependencia de hardware NVIDIA. Caro para indie. | Hardware + SDK |
| **Google DeepMind** | Research + cloud | Concordia OSS (simulación social). Gemini API. Gemma 3n on-device (demostrado en Godot). | Sin engine/plataforma de distribución propia. | Cloud API |
| **Amazon/AWS** | Cloud + engine | O3DE (Apache 2.0). AWS Bedrock para LLMs. GameLift para multiplayer. | O3DE adopción baja vs Unity/Unreal. | Cloud usage |
| **Inworld AI** | AI NPC platform (cerrado) | Personajes AI con voz, memoria, emoción. Partner NVIDIA (Covert Protocol). | Pricing por personaje, cerrado. | SaaS |
| **Convai** | AI NPC platform (cerrado) | NPCs conversacionales con voz realtime. Unity/Unreal/Godot. | Cerrado, pricing por llamada. | SaaS |
| **Heroic Labs** | Backend OSS | Nakama (Apache 2.0, 12.8k stars). 500k devs, 1B+ players. | Competencia de Firebase/Supabase. | OSS + Heroic Cloud managed |

---

## Open Source — Ecosystem players clave

| Organización | Repos clave | Stars | Licencia |
|-------------|-------------|-------|----------|
| **Farama Foundation** | Gymnasium, PettingZoo | 12.1k + 3.5k | MIT |
| **Unity Technologies** | ml-agents | ~19.5k | Apache 2.0 |
| **Heroic Labs** | nakama | ~12.8k | Apache 2.0 |
| **Stanford OVAL Lab** | generative_agents | ~21.7k | Apache 2.0 |
| **Google DeepMind** | concordia | ~1.5k | Apache 2.0 |
| **DLR-RM** | stable-baselines3 | ~13.5k | MIT |
| **O3DE Foundation (Linux)** | o3de | ~9.5k | Apache 2.0 |
| **limbonaut** | limboai | ~2.8k | MIT |
| **bitbrain** | beehave | ~3.2k | MIT |

---

## Mercado LATAM — Gaming + AI

### Tamaño y crecimiento
- Mercado gaming LATAM: **$25.7B (2025)** → $28.04B (2026), CAGR 9.12%
- LATAM: 1.12% del gasto global en AI vs 6.6% del PIB global → **brecha masiva = oportunidad**
- Mobile gaming dominante: infraestructura móvil en crecimiento

### Drivers por país
- **Brasil**: mayor mercado gaming LATAM, 100M+ gamers. iGaming legalizado 2025 → demanda anti-fraud + compliance AI
- **México**: fuerte cultura gaming, iGaming creciente, talento tech disponible
- **Argentina**: comunidad dev muy activa (efecto cambiario → más freelancers/studios exportando), mercado de exportación
- **Colombia**: hub emergente para estudios indie y mid-size

### Oportunidades para Globant AI Studios

| Oportunidad | Driver | Fit Globant |
|-------------|--------|-------------|
| **AI NPC para estudios LATAM** | Studios locales no pueden pagar Inworld/Convai. Stack OSS asequible. | Stack Godot + LLM + LimboAI a precio accesible |
| **Backend gaming inteligente** | Nakama es OSS pero requiere customización ML para diferenciarse. | "Nakama + AI layer" — matchmaking predictivo, anti-cheat, engagement |
| **iGaming LATAM + AI** | Brasil legalizó iGaming 2025. Mercado enorme en regulación + personalización. | Anti-fraud ML, recomendación, soporte con agentes |
| **QA automatizado con AI** | Studios mid-size LATAM sin QA bots. Gap enorme vs AAA. | godot_rl_agents + RL agents como servicio horizontal |
| **Analytics + churn prediction** | F2P mobile dominante en LATAM. Retención = survival. | PostHog + GNNs (PyTorch Geometric) para churn prediction |
| **Serious games (EdTech/Health)** | Educación y salud buscan gamification + AI en LATAM. | Godot + LLM NPCs personalizados para learning paths |
| **Exportación gaming LATAM** | Studios LATAM buscan diferenciarse en mercado global con AI. | Globant como acelerador de AI integration |

---

## Posicionamiento Globant AI Studios

### Propuesta de valor diferenciada
1. **Stack OSS end-to-end**: Godot + Nakama + SB3 + LimboAI + capa AI (sin lock-in de plataforma cerrada)
2. **Delivery LATAM**: costo y velocidad vs Accenture/Deloitte; calidad vs estudios locales
3. **Gaming Studio + AI Studios**: combinación única de gaming domain + AI practice
4. **Patterns listos para demos rápidos**: recipes de `compose/patterns.md` → PoC en 2-3 semanas

### Cuentas objetivo (perfil)
- Estudios AAA/AA con presencia en LATAM buscando reducir costos de QA con AI
- Plataformas iGaming entrando a Brasil/México que necesitan anti-fraud + personalización
- Operadores de gaming online con churn problems
- Studios indie/mid-size buscando competir con AAA usando AI a bajo costo

### Competencia
- **Accenture, Wipro**: presencia enterprise pero sin foco en gaming AI
- **Studios locales** (Aquiris Brasil, Luderia México): potenciales clientes más que competidores
- **Inworld/Convai**: plataformas cerradas caras → Globant puede ofrecer alternativa OSS consultiva

---
*Fuentes: marketresearchfuture.com, snsinsider.com, agentmarketcap.ai, marketdataforecast.com, thomsonreuters.com/latam-ai (2026-07-02)*
