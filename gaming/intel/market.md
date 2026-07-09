# Mapa de mercado — Gaming AI

> Players, tamaños, oportunidades. Foco LATAM + posicionamiento Globant.
> Última actualización: 2026-07-09 (v6)

## Tamaño de mercado global

| Segmento | Valor 2025 | Valor 2026 | CAGR | Horizonte | Fuente |
|----------|------------|------------|------|-----------|--------|
| AI in Gaming (broad — Persistence MR) | — | **$10.1B** | **33.2%** | → **$75.1B en 2033** | Persistence Market Research |
| AI in Games (segmento menor) | $2.87B | $3.4B+ | 18.5% | 2025-2026 | Technavio |
| AI in Gaming (Technavio — amplio) | — | — | 40.7% | Crecimiento $34B proyectado 2026-2030 | Technavio |
| Generative AI in Gaming | $1.79B | $2.21B | 23.1% | → $5.09B en 2030 | Research&Markets |
| NPC Generation AI Market | $1.86B | $2.44B | 31.4% | ↑ YoY acelerado | Research&Markets |
| AI Game Assets Generator | $1.7B | $2.08B | ~20% | → $10.73B en 2035 | Business Research Insights |
| NPCs + Digital Humans | — | 28.6% del total AI gaming | — | mayor segmento único | Technavio |
| LATAM Gaming market | $25.70B | $28.04B | 9.12% | 2026-2034 | GII Research |
| LATAM AI investment | 1.12% del gasto AI global | — | — | vs 6.6% del PIB = brecha/oportunidad | — |

**Adopción**: 90% de desarrolladores integra AI en workflows; 50% de estudios AAA usa AI en producción. ChatGPT: 74% adopción en industria gaming; Google Gemini: 37%; Microsoft Copilot: 22%. Reducción de tiempo de creación de assets: 70-90%. Ahorro promedio: $100K-$500K por título. 95%+ de jugadores encuentran experiencias con NPCs AI "agradables o recompensantes" (2026).

---

## Players globales — Engines y plataformas

| Empresa | Tipo | Fortaleza AI | Debilidad | Modelo |
|---------|------|-------------|-----------|--------|
| **Unity Technologies** | Engine propietario | Unity AI 6.2 integrado (Assistant, Generators, Inference Engine). ML-Agents OSS 19.5k stars. | Controversia pricing 2023, recuperando confianza. | Revenue share + suscripción |
| **Epic Games (Unreal)** | Engine propietario | MetaHuman AI. Aura agent (Ramen VR, ene 2026). Persona Device para Fortnite creator. | Curva aprendizaje alta. Royalty 5% > $1M. | Royalty |
| **Roblox** | Plataforma UGC | AI Studio (MCP). CUBE 3D 1.8B params para objetos 3D. OpenGameEval OSS. | Audiencia mayormente juvenil. | Revenue share |
| **Microsoft / Xbox** | Cloud + tools | Azure AI Services para gaming. Sponsor O3DE. Phi-3/4 on-device. | Sin engine propio competitivo. | Cloud usage |
| **NVIDIA** | GPU + SDK | ACE (ASR+NLP+TTS+animación NPC realtime). RTX Neural Shading. Fork Godot path tracing (GDC 2026, MIT). | Dependencia de hardware NVIDIA. Caro para indie. | Hardware + SDK |
| **Google DeepMind** | Research + cloud | Concordia OSS (simulación social). Gemini API. Gemma 3n on-device (demostrado en Godot). | Sin engine/plataforma de distribución propia. | Cloud API |
| **Amazon/AWS** | Cloud + engine | O3DE (Apache 2.0). AWS Bedrock para LLMs. GameLift para multiplayer. | O3DE adopción baja vs Unity/Unreal. | Cloud usage |
| **Fenris Creations (CCP)** | Engine AAA → OSS | **Carbon Engine MIT (1-jul-2026)**. Trinity + Destiny. 20+ años de MMO a escala. | Nuevo entorno OSS, comunidad aún formándose. | Abierto (MIT) |
| **Inworld AI** | AI NPC platform (cerrado) | Personajes AI con voz, memoria, emoción. Partner NVIDIA (Covert Protocol). | Pricing por personaje, cerrado. | SaaS |
| **Convai** | AI NPC platform (cerrado) | NPCs conversacionales con voz realtime. Unity/Unreal/Godot. | Cerrado, pricing por llamada. | SaaS |
| **Heroic Labs** | Backend OSS | Nakama (Apache 2.0, 12.8k stars). 500k devs, 1B+ players. | Competencia de Firebase/Supabase. | OSS + managed cloud |

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
| **Fenris Creations/CCP** | carbonengine (Trinity + Destiny) | Nuevo | MIT |
| **lmgame-org** | GamingAgent | 947 | MIT |

---

## Mercado LATAM — Gaming + AI

### Tamaño y crecimiento
- Mercado gaming LATAM: **$25.7B (2025)** → $28.04B (2026), CAGR 9.12%
- LATAM: 1.12% del gasto global en AI vs 6.6% del PIB global → **brecha masiva = oportunidad**
- Mobile gaming dominante: infraestructura móvil en crecimiento
- Mobile AI-native: COCOS/Cocos Creator (MIT) dominante en APAC+LATAM

### Drivers por país
- **Brasil**: mayor mercado gaming LATAM, 100M+ gamers. iGaming legalizado 2025 → demanda anti-fraud + compliance AI
- **México**: fuerte cultura gaming, iGaming creciente, talento tech disponible
- **Argentina**: comunidad dev muy activa (efecto cambiario → más freelancers/studios exportando)
- **Colombia**: hub emergente para estudios indie y mid-size

### Oportunidades para Globant AI Studios

| Oportunidad | Driver | Fit Globant |
|-------------|--------|-------------|
| **AI NPC para estudios LATAM** | Studios locales no pueden pagar Inworld/Convai. Stack OSS asequible. | Stack Godot + Mantella (MIT) + LimboAI |
| **Backend gaming inteligente** | Nakama es OSS pero requiere customización ML para diferenciarse. | "Nakama + AI layer" — matchmaking predictivo, anti-cheat, engagement |
| **iGaming LATAM + AI** | Brasil legalizó iGaming 2025. Mercado enorme en regulación + personalización. | Anti-fraud ML, recomendación, soporte con agentes |
| **QA automatizado con AI** | Studios mid-size LATAM sin QA bots. Gap enorme vs AAA. | godot_rl_agents + GamingAgent framework |
| **Analytics + churn prediction** | F2P mobile dominante en LATAM. Retención = survival. | PostHog + GNNs (PyTorch Geometric) para churn prediction |
| **Serious games (EdTech/Health)** | Educación y salud buscan gamification + AI en LATAM. | Godot + LLM NPCs personalizados para learning paths |
| **MMO / mundo persistente** | Carbon Engine abre posibilidades para MMO LATAM sin royalties. | Carbon + LangGraph + Claude para agentes de mundo persistente |

---

## Posicionamiento Globant AI Studios

### Propuesta de valor diferenciada
1. **Stack OSS end-to-end**: Godot + Nakama + SB3 + LimboAI + Mantella + capa AI (sin lock-in)
2. **Delivery LATAM**: costo y velocidad vs Accenture/Deloitte; calidad vs estudios locales
3. **Gaming Studio + AI Studios**: combinación única de gaming domain + AI practice
4. **Patterns listos para demos rápidos**: recipes de `compose/patterns.md` → PoC en 2-3 semanas
5. **Carbon Engine expertise**: primeros en LATAM con expertise en el engine de EVE Online (nuevo Jul 2026)

### Cuentas objetivo (perfil)
- Estudios AAA/AA con presencia en LATAM buscando reducir costos de QA con AI
- Plataformas iGaming entrando a Brasil/México que necesitan anti-fraud + personalización
- Operadores de gaming online con churn problems
- Studios indie/mid-size buscando competir con AAA usando AI a bajo costo
- Startups de MMO/mundos persistentes que quieren base Carbon Engine

### Competencia
- **Accenture, Wipro**: presencia enterprise pero sin foco en gaming AI ni Carbon Engine expertise
- **Studios locales** (Aquiris Brasil, Luderia México): potenciales clientes más que competidores
- **Inworld/Convai**: plataformas cerradas caras → Globant puede ofrecer alternativa OSS consultiva

---
*Fuentes: Technavio, Research & Markets, Business Research Company, Persistence Market Research (jul 2026), GDC 2026 Survey (2026-07-09)*
