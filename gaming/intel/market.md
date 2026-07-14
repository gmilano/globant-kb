# Mapa de mercado — Gaming AI

> Players, tamaños, oportunidades. Foco LATAM + posicionamiento Globant.
> Última actualización: 2026-07-14 | v9 — AI in Games $10.64B→$163.1B CAGR 40.8%; AlayaRenderer neural rendering; ShandaAI ecosystem; GRL×Google Tunix

## Tamaño de mercado global

| Segmento | Valor 2025 | Valor 2026 | CAGR | Horizonte |
|----------|------------|------------|------|----------|
| **AI in Games (Verified MR — max estimado)** | — | **$10.64B** | **40.8%** | → **$163.1B** en 2034 |
| **AI in Games (Persistence MR)** | — | **$10.1B** | 33.2% | → $75.1B en 2033 |
| **AI in Video Games (BRC)** | $2.88B | **$3.73B** | 29.4% | → largo plazo |
| **Generative AI in Gaming** | $1.79B | **$2.21B** | 23.1% | → $5.09B en 2030 |
| **AI Game Assets Generator** | — | **$2.08B** | ~20% | → $10.73B en 2035 |
| **NPC Generation AI** | $1.86B | **$2.44B** | 31.4% | → crecimiento sostenido |
| AI in Games (alt. GMR) | $4.54B | — | 33.57% | → $81.19B en 2035 |
| NPC Behavior Modeling | — | 28.6% del total | — | mayor segmento único |
| LATAM Gaming market | $25.70B | $28.04B | 9.12% | 2026-2034 |
| LATAM AI investment | 1.12% del gasto AI global | — | — | vs 6.6% del PIB = brecha/oportunidad |

**Adopción de AI**: 90% de devs integra AI en workflows; 50%+ de studios en producción (2026).
**Steam**: 7,300 juegos declaran uso de AI en 2026 — el doble de 2024.
**Adopción LLM entre profesionales de gaming**: ChatGPT 74%, Google Gemini 37%, Microsoft Copilot 22%.

**ROI medido**: games con AI avanzada → +43% player retention y 2.3× playtime promedio vs títulos sin AI.
**Cost savings**: 70-90% reducción en tiempo de creación de assets; $100K-$500K ahorros por título.
**Indie uplift**: 300% más juegos indie logran 1M+ descargas (2024–2026) gracias a AI.

---

## Players globales — Engines y plataformas

| Empresa | Tipo | Fortaleza AI | Debilidad | Modelo |
|---------|------|-------------|-----------|--------|
| **Unity Technologies** | Engine propietario | Unity AI 6.2: Assistant, Generators, Inference Engine (LLMs on-device). ML-Agents OSS 17k stars. | Controversia pricing 2023, recuperando confianza. | Revenue share + suscripción |
| **Epic Games (Unreal)** | Engine propietario | MetaHuman AI. Aura agent (Ramen VR, ene 2026). Persona Device para Fortnite. OmniGameArena evalúa agentes en UE5. | Curva aprendizaje alta. Royalty 5% > $1M. | Royalty |
| **Roblox** | Plataforma UGC | AI Studio (MCP). CUBE 3D 1.8B params. Creators: $1B+/año via DevEx. | Audiencia mayormente juvenil. | Revenue share |
| **Fenris Creations** | Engine OSS (nuevo) | Carbon Engine MIT (jul 2026): Trinity + Destiny + 24 módulos AAA de EVE Online. 23 años de battle-test. | Engine nuevo en OSS — ecosistema de terceros por desarrollar. | MIT, community-driven |
| **SUD / Cocos** | Engine OSS (móvil) | COCOS 4 MIT (ene 2026). AI-native, features como MCPs/Agents. 500M+ players en juegos COCOS. | Percepción como "engine chino". JS/TS puede limitar devs C++. | MIT, community |
| **Shanda AI Research** | Research (world models + rendering) | **AlayaWorld** (jul 2026): world model open-source para gaming, 60s+ coherente. **AlayaRenderer** (abr 2026): pipeline neural rendering con 4M frames AAA (Cyberpunk+Black Myth). | Startup China, ecosistema aún por establecer. | Apache-2.0 |
| **Microsoft / Xbox** | Cloud + tools | Azure AI Services para gaming. Sponsor O3DE. Phi-3/4 on-device. | No tiene engine propio competitivo. | Cloud usage |
| **NVIDIA** | GPU + SDK | ACE (ASR+NLP+TTS+animación NPC realtime). RTX Neural Shading. Fork Godot con path tracing (GDC 2026, MIT). | Dependencia de hardware NVIDIA. | Hardware + SDK |
| **Google DeepMind** | Research + cloud | Concordia OSS (simulación social). Gemini API. Gemma 3n on-device (demostrado en Godot). | Sin engine/plataforma de distribución propia. | Cloud API |
| **Amazon/AWS** | Cloud + engine | O3DE (Apache 2.0). AWS Bedrock. GameLift para multiplayer. | O3DE adopción baja vs Unity/Unreal. | Cloud usage |
| **Inworld AI** | AI NPC platform (cerrado) | Personajes AI con voz, memoria, emoción. Partner NVIDIA (Covert Protocol). | Pricing por personaje, cerrado. | SaaS |
| **Convai** | AI NPC platform (cerrado) | NPCs conversacionales con voz realtime. Unity/Unreal/Godot. | Cerrado, pricing por llamada. | SaaS |
| **Heroic Labs** | Backend OSS | Nakama (Apache 2.0, 12.8k stars). 500k devs, 1B+ players. | Competencia de Firebase/Supabase. | OSS + Heroic Cloud managed |
| **lmgame-org** | Research OSS | **GamingAgent** (ICLR 2026, MIT). **GRL** (multi-turn RL, MIT). lmgame-Bench: 13 SOTA modelos evaluados. | Académico, no comercial. | MIT open-source |

---

## Open Source — Ecosystem players clave

| Organización | Repos clave | Stars | Licencia |
|-------------|-------------|-------|----------|
| **Farama Foundation** | Gymnasium, PettingZoo | 12.5k + 3.5k | MIT |
| **Unity Technologies** | ml-agents | ~17k | Apache 2.0 |
| **Heroic Labs** | nakama | ~12.8k | Apache 2.0 |
| **Stanford OVAL Lab** | generative_agents | ~21.7k | Apache 2.0 |
| **Google DeepMind** | concordia | ~1.5k | Apache 2.0 |
| **DLR-RM** | stable-baselines3 | ~14k | MIT |
| **O3DE Foundation (Linux)** | o3de | ~9.5k | Apache 2.0 |
| **Fenris Creations** | carbonengine (Trinity, Destiny) | ★ nuevo | MIT |
| **lmgame-org** | GamingAgent, GRL | — | MIT |
| **limbonaut** | limboai | ~2.9k | MIT |
| **bitbrain** | beehave | ~3.4k | MIT |
| **edbeeching** | godot_rl_agents | ~950 | MIT |

---

## Eventos de mercado julio 2026

| Evento | Fecha | Impacto |
|--------|-------|--------|
| **AlayaWorld open-source world model** | 7-9 jul 2026 | World model gaming 60s+ coherente publicado. Full pipeline mid-jul. Primer candidato viable para AI-native games. Repo: AlayaLab/AlayaWorld. |
| **AlayaRenderer neural rendering** | Abr 2026 | Generative World Renderer con 4M frames de Cyberpunk 2077 + Black Myth: Wukong. Inverse + forward neural rendering. ShandaAI/AlayaRenderer. |
| Carbon Engine MIT release | 1 jul 2026 | Motor EVE Online disponible. Módulos Destiny + Trinity reutilizables. |
| Godot Foundation AI ban | 1 jul 2026 | PRs AI en engine core prohibidos. Plugins libres. Calidad > velocidad. |
| GDC 2026 developer survey | Q2 2026 | 52% devs dicen que GenAI daña la industria; 85% de gamers negativos; 7% devs positivos. |
| OmniGameArena paper | Jun 2026 | Benchmark VLM: 12 juegos UE5. VLMs comerciales aún detrás de políticas especializadas. |
| GamingAgent / lmgame-Bench | May-Jun 2026 | ICLR 2026, MIT. 13 modelos SOTA evaluados, todos con gaps significativos. |
| COCOS 4 MIT release | 4 ene 2026 | Engine mobile gaming AI-native, sin restricciones comerciales. |
| 7,300 Steam AI games | 2026 | 2× 2024. AI en gaming = mainstream. |

---

## Mercado LATAM — Gaming + AI

### Tamaño y crecimiento
- Mercado gaming LATAM: **$25.7B (2025)** → $28.04B (2026), CAGR 9.12%
- LATAM: 1.12% del gasto global en AI vs 6.6% del PIB global → **brecha masiva = oportunidad**
- Mobile gaming dominante: infraestructura móvil en crecimiento
- COCOS 4 domina mobile gaming LATAM: 500M+ players

### Drivers por país
- **Brasil**: mayor mercado gaming LATAM, 100M+ gamers. iGaming legalizado 2025 → demanda anti-fraud + compliance AI
- **México**: fuerte cultura gaming, iGaming creciente, talento tech disponible
- **Argentina**: comunidad dev muy activa, mercado de exportación. Stack OSS reduce barreras de costo.
- **Colombia**: hub emergente para estudios indie y mid-size

### Oportunidades para Globant AI Studios

| Oportunidad | Driver | Fit Globant |
|-------------|--------|------------|
| **AI NPC para estudios LATAM** | Studios locales no pueden pagar Inworld/Convai. COCOS 4 domina mobile LATAM. | Stack Godot/COCOS4 + LLM + LimboAI a precio accesible |
| **Mobile gaming LATAM + COCOS 4** | COCOS 4 MIT con AI-native features. 500M+ jugadores en juegos COCOS. | Integración LLM/DDA sobre COCOS 4 para studios móvil |
| **Carbon Engine consulting** | Motor EVE Online MIT = oportunidad para studios que quieren AAA-grade sin royalties. | Consulting + customización Carbon para juegos espaciales/MMO |
| **Backend gaming inteligente** | Nakama es OSS pero requiere customización ML. | "Nakama + AI layer" — matchmaking predictivo, anti-cheat, engagement |
| **iGaming LATAM + AI** | Brasil legalizó iGaming 2025. Mercado enorme en regulación + personalización. | Anti-fraud ML, recomendación, soporte con agentes |
| **QA automatizado con AI** | Studios mid-size LATAM sin QA bots. Gap enorme vs AAA. | godot_rl_agents + RL agents como servicio horizontal |
| **Analytics + churn prediction** | F2P mobile dominante en LATAM. Retención = survival. | PostHog + GNNs para churn prediction |
| **AI Dev Tooling** | Unity/Godot MCP explosion — estudios quieren acelerar con AI. | Setup MCP + Claude Code → 2-3x velocidad dev. |
| **LLM Gaming Agent eval** | GamingAgent + GRL pipeline MIT completo. GRL × Google Tunix TPU validation. Studios necesitan medir calidad de sus agentes. | Evaluation-as-a-service usando lmgame-Bench + benchmarks propios |
| **Neural Rendering / Game Reskin** (nuevo v9) | AlayaRenderer (Apache-2.0, abr 2026): pipeline open-source para re-skin completo de juegos sin acceso al engine. | Servicio de visual remaster / mobile port con neural rendering |
| **World Models / AI-native games** (emergente) | AlayaWorld (jul 2026): primer world model gaming open-source viable. Shanda AI Ecosystem (AlayaRenderer + AlayaWorld). | Consultoría early-adopter para studios experimentales. 2027+ play. |

---

## Posicionamiento Globant AI Studios

### Propuesta de valor diferenciada
1. **Stack OSS end-to-end**: Godot/COCOS4 + Nakama + SB3 + LimboAI + capa AI (sin lock-in ni royalties)
2. **Carbon Engine early mover**: asesorar a studios sobre Carbon (MIT, EVE Online) antes de que la competencia lo vea
3. **Evaluación con GamingAgent/lmgame-Bench**: medición objetiva de calidad de agentes con benchmark ICLR 2026
4. **Delivery LATAM**: costo y velocidad vs Accenture/Deloitte; calidad vs estudios locales
5. **Gaming Studio + AI Studios**: combinación única de gaming domain + AI practice
6. **Patterns listos para demos rápidos**: recipes de `compose/patterns.md` → PoC en 2-3 semanas

### Cuentas objetivo (perfil)
- Estudios AAA/AA con presencia en LATAM buscando reducir costos de QA con AI
- Plataformas iGaming entrando a Brasil/México que necesitan anti-fraud + personalización
- Studios COCOS 4 mobile que quieren añadir AI (dynamic difficulty, NPC dialogue)
- Studios que quieren explorar Carbon Engine (MMO, simulación, espacial)
- Studios indie/mid-size buscando competir con AAA usando AI a bajo costo
- Labs gaming experimentales interesados en world models (AlayaWorld) para prototipos

---
*v9 actualizado 2026-07-14. Fuentes: verifiedmarketreports.com (AI in Games $163.1B 2034 CAGR 40.8%), thebusinessresearchcompany.com, arxiv.org/abs/2604.02329 (AlayaRenderer), arxiv.org/abs/2607.06291 (AlayaWorld), techtimes.com, gamingonlinux.com, iclr.cc/virtual/2026 (GamingAgent), blog.imseankim.com/gdc-2026, opensource.googleblog.com (GRL×Tunix TPU)*
