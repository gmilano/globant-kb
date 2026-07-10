# Market Map — Media & Entertainment AI

> Key players, market data, positioning. Global + LATAM focus.
> Last updated: 2026-07-10 (v11)

## Market Size (2026)

| Segment | 2026 Value | 2030 Forecast | CAGR | Source |
|---------|-----------|---------------|------|--------|
| AI in M&E (total) | $35.77B | $87.44B | 25% | Business Research Co, 2026 |
| Generative AI in M&E | $3.16B | $8.06B | 26.4% | GlobeNewswire Jul 7 2026 |
| AI Video Generator | $946M–$1.81B | $3.35B–$21.6B | 19–46% | Multiple sources (wide range) |
| LATAM Media Revenue | $65B | — | +10.7% YoY | Omdia Jan 2026 |
| LATAM OTT Market | $9.8B | $25.89B (2035) | 11.4% | MarkWide Research 2026 |
| Microdrama (global) | $14B (year-end 2026) | — | — | Industry estimates |

## Global Players Map

| Company | Type | AI Strategy | Open Source? |
|---------|------|-------------|-------------|
| **Adobe (Firefly)** | Creative tools | Generative AI in Premiere/AE; Firefly model | No |
| **Avid** | Pro editing | Partnership w/ Google Cloud (Gemini → Media Composer + Content Core; NAB Apr 2026) | No |
| **WPP** | Agency/production | Gemini Enterprise; 1 AI campaign/4 days; 2.5x client value | No |
| **Quickplay / Gray Media** | OTT | 113 TV markets on Google Cloud AI (live 2026) | No |
| **YouTube / Google** | Platform + AI | Gemini integration; Veo 3 video gen; Vertex AI for M&E | Vertex AI partial |
| **Netflix** | OTT | Proprietary recommendation; ~50% LATAM streaming revenue | No |
| **ElevenLabs** | Voice AI | Industry-standard AI TTS/dubbing; Scribe ASR | API-only (not OSS) |
| **Runway** | AI video gen | Gen-4 commercial leader | No |
| **Kling (Kuaishou)** | AI video gen | Strong in APAC; integrated in OpenMontage | No |
| **Suno / Udio** | AI music | Commercial music gen leaders | No |
| **Publicis / LiveRamp** | Agentic media buying | $2.2B acquisition (May 2026); identity + agentic ad targeting | No |

## Open Source Competitive Advantages

| OSS Alternative | Replaces | Key Advantage |
|----------------|---------|---------------|
| ACE-Step 1.5 XL | Suno / Udio / Epidemic Sound | Local GPU, zero licensing, LoRA fine-tune on brand style |
| OpenMontage | Runway / Pika / commercial video factories | No per-minute cost, full workflow control, customizable |
| video-use | Descript / CapCut (AI) | Agent-native, CI/CD integrable, no vendor lock-in |
| ViMax | Runway Gen-4 + script tools | End-to-end from brief → final video, open weights |
| Whisper | Rev / Deepgram / Assembly AI | Self-hosted, no per-minute cost, 100+ languages |
| Gorse | AWS Personalize / Google Rec AI | Self-hosted, LLM re-ranker, Apache 2.0 |
| NeMo Guardrails | Hive Moderation / Two Hat | Self-hosted, programmable policies, EU AI Act ready |
| MediaCMS | Brightcove / Kaltura | AGPL-3.0, full control, Python/Django extensible |

## LATAM Opportunity Map

### Brazil
- **3rd-largest FAST market globally** ($152M revenue)
- 76% of audiences use AI for information discovery
- Mobile-first: YouTube + Instagram Reels reach 97% of adults 18–64
- **Key opportunity**: FAST platform with AI-powered local content discovery + Portuguese dubbing (Voicebox + Whisper)
- LGPD compliance requirement → self-hosted MediaCMS + Gorse preferred over AWS Personalize

### Mexico
- 53% FAST usage (highest in LATAM)
- 70% use AI for information discovery
- Telenovela/drama format dominates → microdrama adaptation is natural
- **Key opportunity**: AI-assisted microdrama production (mediago-drama + OpenMontage + ACE-Step)

### Argentina / Colombia / Chile
- Smaller markets but growing OTT adoption
- Argentina: creative production hub — AI tools for post-production, localization
- **Key opportunity**: Dubbing/localization factory (Whisper → Claude translation → Voicebox dubbing) for regional content

### Cross-LATAM
- **Ad-supported streaming plans grew from 13% → 22% (2024–2026)**: AI-driven ad targeting is required
- Content moderation challenge: UGC moderation at scale, multilingual (PT/ES)
- **Microdrama wave**: $3B outside China — LATAM is natural next market (serialized drama culture)

## Globant Positioning

**Where Globant can win:**
1. **Agentic M&E Platform Builder**: Take MediaCMS/PeerTube → add full AI stack (Whisper + Gorse + NeMo + Claude) → deliver as custom OTT platform for regional broadcasters. 8-16 weeks, $200k-$800k.
2. **Video Production Factory**: Build client-specific OpenMontage/video-use pipelines for ad agencies, social media teams. Replaces $200-$500/video human editors with $0.05-0.30 agent-driven production.
3. **LATAM FAST Enablement**: Help regional media companies launch FAST channels with AI-curated playlists, local content recommendations, Portuguese/Spanish AI dubbing.
4. **Content Moderation as a Service**: Deploy NeMo Guardrails + Llama Guard 4 for UGC platforms. Growing EU AI Act requirement for moderation auditability.
5. **Music/Audio Localization**: ACE-Step LoRA fine-tuned for Latin music styles → background music for brands at zero license cost.

---
*See intel/trends.md for detailed trend analysis.*
