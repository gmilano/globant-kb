# Market Map — AI in Media & Entertainment (2026)

## Market Size

- **$101 billion+** projected streaming content spend by 2026 (surpassing traditional broadcasters for first time)
- Streaming achieved **44.8% of total viewership** in May 2025 — first time it exceeded combined broadcast + cable share
- AI in Media & Entertainment market projected at **35.9% CAGR** through 2030 for agentic AI workflows
- **78%** of top-100 streaming services deployed at least one AI feature in 2025 (up from 42% in 2023)
- Agentic AI adoption in media still **<20%** — large greenfield for Globant engagements

## Key Players

### Streaming Platforms
| Company | Product | Model | Open Source? |
|---------|---------|-------|-------------|
| Netflix | Netflix | Subscription VOD | No |
| Disney | Disney+ / Hulu | Subscription VOD | No |
| Amazon | Prime Video | Subscription + ad tier | No |
| YouTube (Google) | YouTube / YT Premium | Ad + subscription | No |
| Spotify | Spotify | Ad + subscription (audio/podcast/video) | No |
| **PeerTube Foundation** | **PeerTube** | **AGPL-3.0 federated** | **Yes** |
| **Community** | **Owncast** | **MIT self-hosted** | **Yes** |

### Broadcast & News
| Company | Product | AI Use Case |
|---------|---------|-------------|
| BBC | BBC iPlayer | AI script-to-article conversion (TV segments → digital text) |
| CNN / Warner Bros. | CNN Max | AI metadata, personalized feeds |
| Associated Press | AP News | Automated sports/earnings news generation (since 2016) |
| Reuters | Reuters Next | AI-assisted newsroom workflows |

### Cloud Media Infrastructure
| Company | Product | Model | Open Source? |
|---------|---------|-------|-------------|
| AWS | Elemental Media Services | Proprietary | No |
| Microsoft | Azure Media Services | Proprietary (EOL 2024; migrating) | No |
| Google | Google Cloud Media CDN + Vertex AI | Proprietary | No |
| Cloudflare | Cloudflare Stream | Proprietary | No |
| **datarhei** | **Restreamer** | **Apache 2.0** | **Yes** |

### AI-Native Media Startups
| Company | Product | Model | Open Source? |
|---------|---------|-------|-------------|
| Runway | Gen-3 Alpha / Gen-4 | Subscription SaaS | No |
| ElevenLabs | Voice AI + ElevenMusic | Subscription + API | No |
| HeyGen | Avatar video generation | Subscription SaaS | No |
| Synthesia | AI presenter video | Subscription SaaS | No |
| Descript | AI video/audio editing | Subscription SaaS | No |
| **Lightricks** | **LTX-Video (LTX-2.3)** | **Apache 2.0 model weights** | **Partial** |
| **HPCaiTech** | **Open-Sora** | **Apache 2.0** | **Yes** |

### Foundation Models Driving the Space
| Model | Provider | License | Use Case |
|-------|----------|---------|----------|
| Whisper | OpenAI | MIT | Transcription, subtitles, accessibility |
| Whisper.cpp | ggml-org | MIT | Edge / CPU-only transcription |
| FLUX.1-dev | Black Forest Labs | Open weights (dev) | Image generation for media assets |
| LTX-2.3 | Lightricks | Apache 2.0 | 4K video + audio generation |
| Open-Sora | HPCaiTech | Apache 2.0 | Text-to-video generation |
| Stable Diffusion XL | Stability AI | Apache 2.0 weights | Thumbnail, poster, cover art |

## Globant Positioning

**Sweet spot:** Broadcast networks, streaming platforms, and media agencies who want to:
1. **Automate post-production** with AI (transcription, subtitling, tagging, chapters) — replacing expensive manual workflows
2. **Accelerate content creation** — AI-generated B-roll, trailers, social shorts, thumbnail variants at scale
3. **Deploy private VOD/live platforms** on open-source infrastructure (MediaCMS + Owncast) with AI features on top
4. **Build content discovery** engines using semantic search over video archives (Whisper + FAISS + Jina)
5. **Achieve accessibility compliance** (ADA/WCAG) with automated captioning pipelines at a fraction of vendor cost

**Competitive differentiation:** Globant can deliver the full stack — open-source platform deployment + AI pipeline integration + MLOps for transcription/generation models + analytics — that boutique AI media vendors cannot. The open-source components reduce client lock-in and total cost of ownership by 40–60% vs. SaaS stacks.
