# Top AI Agents & Tools — Media & Entertainment Industry

> Last updated: 2026-07-02 | Focus: MIT / Apache 2.0 / BSD licenses Globant can build on

## AI Agents Table

| # | Name | GitHub | License | Stars | Description |
|---|------|--------|---------|-------|-------------|
| 1 | Whisper | [openai/whisper](https://github.com/openai/whisper) | MIT | 75k+ | OpenAI's robust ASR system trained on 680k hours of multilingual audio; backbone for transcription, subtitling, accessibility, and content search across all media verticals |
| 2 | whisper.cpp | [ggml-org/whisper.cpp](https://github.com/ggml-org/whisper.cpp) | MIT | 15k+ | Pure C/C++ port of Whisper; runs CPU-only with no Python dependency — ideal for edge devices, broadcast encoders, and real-time on-prem transcription |
| 3 | WhisperX | [m-bain/whisperX](https://github.com/m-bain/whisperX) | BSD-2-Clause | 13k+ | Extends Whisper with word-level timestamps and multi-speaker diarization; critical for podcast editing, news captioning, and multi-host show transcription |
| 4 | WhisperLive | [collabora/WhisperLive](https://github.com/collabora/WhisperLive) | MIT | 4k+ | Near-real-time Whisper implementation over WebSocket; designed for live broadcast transcription, live news tickers, and simultaneous accessibility captions |
| 5 | subsai | [absadiki/subsai](https://github.com/absadiki/subsai) | MIT | 2k+ | Subtitles generation tool (WebUI + CLI + Python package) powered by Whisper variants; supports batched 70× realtime inference and multi-speaker diarization for SRT/VTT output |
| 6 | auto-subs | [tmoroney/auto-subs](https://github.com/tmoroney/auto-subs) | MIT | 3k+ | On-device AI subtitle generation plugin connecting directly to DaVinci Resolve, Adobe Premiere Pro, and After Effects; no cloud or subscription required |
| 7 | Open-Sora | [hpcaitech/Open-Sora](https://github.com/hpcaitech/Open-Sora) | Apache 2.0 | 22k+ | Open-source text-to-video generation system; democratizes efficient video production for trailers, promotional content, and synthetic B-roll generation |
| 8 | Open-Generative-AI | [Anil-matcha/Open-Generative-AI](https://github.com/Anil-matcha/Open-Generative-AI) | MIT | 7.5k+ | Self-hosted unified studio giving access to 200+ image and video generation models (FLUX, Kling, Sora, Veo); no content filters, no per-generation cost |
| 9 | OpenMontage | [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) | MIT | 3k+ | World's first open-source agentic video production system; 12 production pipelines, 52 tools, 500+ agent skills — turns an LLM coding agent into a full video production studio |
| 10 | OpenShorts | [mutonby/openshorts](https://github.com/mutonby/openshorts) | MIT | 2k+ | Free & open source AI video platform: Clip Generator, AI Shorts with AI actors, YouTube-style studio; self-hosted, no watermarks, built on FastAPI + YOLOv8 + faster-whisper |

## Notes

- **Whisper family (1–5)** is the undisputed foundation for any media transcription, subtitling, or audio search use case. whisper.cpp enables deployment on broadcast hardware without GPU.
- **WhisperX** is preferred over raw Whisper when multi-speaker shows, podcasts, or legal depositions need per-speaker attribution.
- **Video generation (7–9)** is moving fast: Open-Sora and Open-Generative-AI are the leading open-source choices; both are suitable for generating promotional content, synthetic B-roll, and ad creative at scale.
- **OpenMontage (9)** is the most agentic option — it accepts a natural-language brief and handles research, scripting, asset generation, editing, and composition autonomously.
- **OpenShorts (10)** targets short-form social media content (YouTube Shorts, TikTok-equivalent) with built-in AI actors and clip generation.
- All entries carry MIT or Apache 2.0 / BSD licenses except WhisperX (BSD-2-Clause, equally permissive for commercial use).
