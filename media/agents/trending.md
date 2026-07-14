# Trending This Week — Media & Entertainment AI

> Signal-to-noise filter: only agents/repos with meaningful momentum in the last 30 days.
> Last updated: 2026-07-14 (v10 — full rewrite)

## 🔥 Top Signals (Jul 2026)

### 1. Avid + Google Agentic Production (Apr 2026)
Avid and Google integrated agentic AI into Media Composer and MediaCentral — agents now handle ingest tagging, proxy generation, AI rough cuts, and compliance review automatically. This is the first enterprise NLE with a production-grade agentic layer on open APIs.

**Why it matters:** Signals broadcast shift from "AI-assisted" to "AI-led" post-production. Client engagements in broadcast/streaming should include an agentic production layer proposal.

### 2. Fox + Disney Autonomous Ad Buying — Pre-Cannes (Jun 2026)
Between June 11–19, at least 8 major platforms shipped autonomous ad-buying agents. Fox's sell-side agents connected to WPP and Horizon Media's buy-side agents for audience targeting, forecasting, and media recommendations — fully agentic. Disney pulled AI creative generation in-house.

**GitHub OSS stack:** LangGraph + PromptLayer + OpenRTB Python libraries

### 3. ACE-Step 1.5 XL (4B DiT) — April 2, 2026
The 4B-parameter DiT decoder variant ships three sub-models (xl-base, xl-sft, xl-turbo). Under 2 seconds per full song on A100; under 10 seconds on RTX 3090. LoRA fine-tuning from ≥10 tracks. Runs on <4 GB VRAM.

- **Repo:** [ace-step/ACE-Step-1.5](https://github.com/ace-step/ACE-Step-1.5) — Apache-2.0

### 4. Wan 2.7 — April 2026
Wan 2.7 adds first/last frame control, 9-grid image input, 5,000-character prompts, and leads the Wan-Bench 2.0 open video leaderboard for open-weight models.

- **Repo:** [Wan-Video/Wan2.2](https://github.com/Wan-Video/Wan2.2) — Apache-2.0

### 5. LTX-2.3 — Native Audio-Video in One Pass
LTX-2.3 is the only open-source model with native synchronized audio-video generation in a single diffusion pass, up to 4K at 50 FPS. IC-LoRA adapters for camera control and style. 2B and 13B weight variants.

- **Repo:** [Lightricks/LTX-Video](https://github.com/Lightricks/LTX-Video) — Apache-2.0

### 6. Cannes Lions 2026 — Agentic Ad-Tech Mainstream
Cannes Lions week confirmed agentic advertising as infrastructure: The Trade Desk, LiveRamp, Google, and Pixalate all shipped autonomous buying/verification agents. The "buying layer goes autonomous" thesis is now in production.

### 7. Dia TTS (nari-labs) — Dialogue with Non-Verbals
Dia is a 1.6B-parameter TTS model that generates realistic dialogue including non-verbal cues (laughs, coughs, sighs). Ideal for dubbing, audiobook production, and podcast localization automation.

- **Repo:** [nari-labs/dia](https://github.com/nari-labs/dia) — Apache-2.0 — ~13k stars

### 8. ComfyUI Stable API Milestone
ComfyUI shipped a stable REST API making programmatic invocation from agent orchestrators reliable. Combined with LTX and Wan ComfyUI nodes, this closes the loop on a fully open-source agentic video production pipeline.

- **Repo:** [comfy-org/ComfyUI](https://github.com/comfy-org/ComfyUI) — GPL-3.0

## Rising Repos (significant momentum this month)

| Repo | License | Stars Est. | Driver |
|------|---------|-----------|--------|
| [ace-step/ACE-Step-1.5](https://github.com/ace-step/ACE-Step-1.5) | Apache-2.0 | ~6k | XL 4B release + press |
| [Wan-Video/Wan2.2](https://github.com/Wan-Video/Wan2.2) | Apache-2.0 | ~18k | Wan 2.7 + Wan-Bench leadership |
| [Lightricks/LTX-Video](https://github.com/Lightricks/LTX-Video) | Apache-2.0 | ~9k | LTX-2.3 native A/V |
| [nari-labs/dia](https://github.com/nari-labs/dia) | Apache-2.0 | ~13k | Viral: non-verbal TTS for dubbing |
| [myshell-ai/OpenVoice](https://github.com/myshell-ai/OpenVoice) | MIT | ~32k | LATAM localization momentum |
| [resemble-ai/chatterbox](https://github.com/resemble-ai/chatterbox) | Apache-2.0 | ~9k | Production voice cloning |

## Keyword to Watch: "Agentic Production Environment"
Google Cloud coined this at NAB 2026. Projects and proposals using this framing are winning enterprise attention. Worth embedding in client-facing materials for M&E engagements.

---
*Updated weekly by ingest pipeline.*
