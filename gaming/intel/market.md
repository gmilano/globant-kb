# Mapa de mercado — Gaming AI

> Players, tamaños, oportunidades. Foco LATAM + posicionamiento Globant.
> Última actualización: 2026-07-06 (segunda pasada — datos de mercado frescos)

## Tamaño de mercado global

| Segmento | Valor 2025 | Valor 2026 | CAGR | Horizonte |
|----------|------------|------------|------|----------|
| AI in Games — amplio (Grand View) | $7.05B | ~$8.4B est. | 33.2% | → $75.1B en 2033 |
| AI in Gaming — Precedence | $4.54B | — | 33.57% | → $37.89B en 2034 |
| Generative AI in Gaming | $1.79B | **$2.21B** | **23.1%** | → $5.09B en 2030 (Business Research Co., jul 2026) |
| AI Game Assets Generator | — | **$2.08B** | 20% | → $10.73B en 2035 (Business Research Insights) |
| NPCs + Digital Humans | — | 28.6% del total AI gaming | — | Mayor segmento individual |
| LATAM Gaming market | $25.70B | $28.04B | 9.12% | 2026-2034 |
| LATAM AI investment | 1.12% del gasto AI global | — | — | vs 6.6% del PIB = brecha/oportunidad |

**Adopción (datos actualizados jul 2026)**:
- 87% de estudios usa AI agents en workflows (Google Cloud survey, 615 devs, jun-jul 2025)
- 38.2% de developers de juegos en EE.UU. usan generative AI para creación de juegos/media (2024)
- 48% de rise en uso de AI para creación de assets 3D — indie studios compitiendo con AAA
- 52% tiene visión negativa de generative AI (GDC 2026 — arriba desde 30% en 2025)
- 62% de nuevos RPG/aventura tienen AI NPCs en 2026 vs 8% en 2024

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
| **CCP Games (EVE Online)** | Developer → OSS | **Carbon Engine liberado MIT — julio 2026**. Décadas de producción MMO AAA. | Motor para juegos de escala MMO, no casual. | OSS (MIT) |
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
| **lmgame-org** | GamingAgent (ICLR 2026) | ~947 | MIT |
| **CCP Games / Fenris** | Carbon Engine | NUEVO | MIT |

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
| **MMO / escala EVE** | Carbon Engine (MIT) habilita proyectos de escala MMO sin royalties. | Base técnica para proyectos ambiciosos con cliente enterprise |

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

## MCP Ecosystem Players (NUEVO — Jul 2026)

El ecosistema MCP para game engines emergió como capa de infraestructura estándar:

| Plataforma | MCP Tool | Licencia | Tools | Proveedor |
|-----------|---------|---------|-------|-----------|
| Unity | [IvanMurzak/Unity-MCP](https://github.com/IvanMurzak/Unity-MCP) | Apache-2.0 | 52 tools, 48 prompts | Comunidad |
| Unreal Engine 5.7 | [IvanMurzak/Unreal-MCP](https://github.com/IvanMurzak/Unreal-MCP) | Apache-2.0 | 62 tools | Comunidad |
| Godot | [hi-godot/godot-ai](https://github.com/hi-godot/godot-ai) | MIT | 120+ ops, 41 tools | hi-godot |
| Multi-engine | [IvanMurzak/GameDev-MCP-Server](https://github.com/IvanMurzak/GameDev-MCP-Server) | MIT | Bridge agnostic | Comunidad |

**Oportunidad**: los tres motores de juego principales ya tienen MCP servers maduros. Globant puede ofrecer "AI Game Studio" como servicio completo sin importar el engine del cliente.

---
*Fuentes: grandviewresearch.com, precedenceresearch.com, thebusinessresearchcompany.com (jul 2026 report), businessresearchinsights.com, globenewswire.com (jul 2026), wifitalents.com, snsinsider.com, kevurugames.com, GitHub (2026-07-06)*
