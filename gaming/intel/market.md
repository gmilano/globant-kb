# Mapa de mercado — Gaming AI

> Players, tamaños, oportunidades. Foco LATAM + posicionamiento Globant.
> Última actualización: 2026-07-11 | v9

## Tamaño de mercado global

| Segmento | Valor 2026 | Proyección | CAGR | Fuente |
|----------|------------|------------|------|--------|
| AI in Gaming (global) | **$10.1B** | $75.1B (2033) | 33.2% | Persistence Market Research |
| Generative AI in Gaming | ~$1.79B | — | 23.2% | Market.us |
| NPC Generation AI Market | **$2.44B** | $7.22B (2030) | 31.1% | Research & Markets |
| AI Game Assets Generator | $2.08B | $10.73B (2035) | — | SolidAITech |
| LATAM Gaming market | $28.04B | $38B+ (2034) | 9.12% | SNS Insider |
| LATAM AI investment | 1.12% del gasto AI global | — | — | vs 6.6% del PIB = brecha/oportunidad |

**Adopción clave (GDC 2026)**:
- **87%** de estudios usa AI agents en sus workflows (Google Cloud survey, 615 developers, jun-jul 2025).
- **62%** de nuevos RPG/adventure games lanzados en 2026 tienen AI NPCs (vs 8% en 2024).
- **52%** de game developers ven GenAI negativamente (tensión laboral) — vs 30% en 2025.
- 50%+ de estudios AAA usa AI en alguna capacidad.
- AI tools reducen creación de assets 70-90% y costos $100k-$500k por título.

---

## Players globales — Engines y plataformas

| Empresa | Tipo | Fortaleza AI | Debilidad | Modelo |
|---------|------|-------------|-----------|--------|
| **Unity Technologies** | Engine propietario | Unity AI 6.2 integrado (Assistant, Generators, Inference Engine). ML-Agents OSS 19.5k stars. | Controversia pricing 2023, recuperando confianza. | Revenue share + suscripción |
| **Epic Games (Unreal)** | Engine propietario | MetaHuman AI. Aura agent (Ramen VR, ene 2026). Persona Device para Fortnite creator. | Curva de aprendizaje alta. Royalty 5% > $1M. | Royalty |
| **Roblox** | Plataforma UGC | AI Studio (MCP). CUBE 3D 1.8B params. OpenGameEval OSS. Creators: $1B+/año via DevEx. | Audiencia mayormente juvenil. | Revenue share |
| **Microsoft / Xbox** | Cloud + tools | Azure AI Services para gaming. Sponsor O3DE. Phi-3/4 on-device. | No tiene engine propio competitivo. | Cloud usage |
| **NVIDIA** | GPU + SDK | ACE (ASR+NLP+TTS+animación NPC realtime). RTX Neural Shading. Fork Godot con path tracing (GDC 2026, MIT). | Dependencia de hardware NVIDIA. Caro para indie. | Hardware + SDK |
| **Google DeepMind** | Research + cloud | Concordia v2.0 OSS (simulación social multi-agente). Gemini 3.5 Flash (agentic). Gemma 3n on-device. | Sin engine/plataforma de distribución propia. | Cloud API |
| **Amazon/AWS** | Cloud + engine | O3DE (Apache 2.0). AWS Bedrock para LLMs. GameLift para multiplayer. | O3DE adopción baja vs Unity/Unreal. | Cloud usage |
| **Inworld AI** | AI NPC platform (cerrado) | Personajes AI con voz, memoria, emoción. Partner NVIDIA + Ubisoft (NEO NPCs). | Pricing por personaje, cerrado. | SaaS |
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
| **Google DeepMind** | concordia v2.0 | ~1.5k | Apache 2.0 |
| **DLR-RM** | stable-baselines3 | ~13.5k | MIT |
| **O3DE Foundation (Linux)** | o3de | ~9.5k | Apache 2.0 |
| **limbonaut** | limboai | ~2.8k | MIT |
| **bitbrain** | beehave | ~3.2k | MIT |
| **hi-godot** | godot-ai (MCP) | ~900 | MIT |

---

## Mercado LATAM — Gaming + AI

### Tamaño y crecimiento
- Mercado gaming LATAM: **$28.04B (2026)**, CAGR 9.12% → $38B+ en 2034.
- LATAM: 1.12% del gasto global en AI vs 6.6% del PIB global → **brecha masiva = oportunidad**.
- Mobile gaming dominante: infraestructura móvil en crecimiento.
- iGaming Brasil legalizado 2025 → demanda anti-fraud + compliance AI.

### Drivers por país
- **Brasil**: mayor mercado gaming LATAM, 100M+ gamers. iGaming legalizado 2025.
- **México**: fuerte cultura gaming, iGaming creciente, talento tech disponible.
- **Argentina**: comunidad dev muy activa (efecto cambiario → más freelancers/studios exportando).
- **Colombia**: hub emergente para estudios indie y mid-size.

### Oportunidades para Globant AI Studios

| Oportunidad | Driver | Fit Globant | Potencial |
|-------------|--------|-------------|-----------|
| **AI NPC para estudios LATAM** | Studios locales no pueden pagar Inworld/Convai. Stack OSS asequible. | Stack Godot + LLM + LimboAI a precio accesible | 3-6 semanas MVP |
| **Backend gaming inteligente** | Nakama OSS requiere customización ML para diferenciarse. | "Nakama + AI layer" — matchmaking predictivo, anti-cheat, engagement | 4-8 semanas |
| **iGaming LATAM + AI** | Brasil legalizó iGaming 2025. Mercado enorme en regulación + personalización. | Anti-fraud ML, recomendación, soporte con agentes | $200k-$500k proyecto |
| **QA automatizado con AI** | Studios mid-size LATAM sin QA bots. Gap enorme vs AAA. | godot_rl_agents + RL agents como servicio horizontal | $80k-$200k proyecto |
| **Analytics + churn prediction** | F2P mobile dominante en LATAM. Retención = survival. | PostHog + GNNs (PyTorch Geometric) para churn prediction | $60k-$150k proyecto |
| **Serious games (EdTech/Health)** | Educación y salud buscan gamification + AI en LATAM. | Godot + LLM NPCs para learning paths | $100k-$300k proyecto |
| **Exportación gaming LATAM** | Studios LATAM buscan diferenciarse en mercado global con AI. | Globant como acelerador de AI integration | Relación larga duración |

---
*Fuentes: persistencemarketresearch.com, solidaitech.com, researchandmarkets.com, GDC 2026, GitHub (verificado 2026-07-11)*
