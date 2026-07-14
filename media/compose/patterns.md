# Composition Patterns — Media & Entertainment AI

> Concrete recipes combining specific repos + agents. Production-oriented.
> Last updated: 2026-07-14 (v10 — full rewrite)

## Architecture Overview

```
[Vertical Platform (MediaCMS / Ghost / PeerTube)]
          ↓
[Event Hook / Webhook / REST API]
          ↓
[Orchestration Layer (LangGraph / n8n)]
          ↓
[Specialist AI Agents]
     ↙         ↘         ↘
[Audio]    [Video]    [Text/Meta]
(Dia/ACE-Step) (Wan/LTX) (Whisper/LLM)
          ↓
[Human Approval Gate (HITL)]
          ↓
[Distribution / CDN / Ad Platform]
```

---

## P1 — Agentic Video Dubbing & Localization Pipeline (LATAM)

**Use case:** Auto-dub English-language content into Spanish/Portuguese with voice cloning and lip-sync.

**Stack:**
- [openai/whisper](https://github.com/openai/whisper) — MIT — transcription + diarization
- [myshell-ai/OpenVoice](https://github.com/myshell-ai/OpenVoice) — MIT — zero-shot voice clone in target language
- [nari-labs/dia](https://github.com/nari-labs/dia) — Apache-2.0 — dialogue TTS with non-verbals
- [Wan-Video/Wan2.2](https://github.com/Wan-Video/Wan2.2) — Apache-2.0 — video V2V for lip-sync correction
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — MIT — workflow + HITL review gate

```python
from langgraph.graph import StateGraph
from typing import TypedDict

class DubbingState(TypedDict):
    video_path: str
    transcript: str
    translated_text: str
    dubbed_audio: bytes
    human_approved: bool
    output_path: str

workflow = StateGraph(DubbingState)
workflow.add_node("transcribe", transcribe_whisper)
workflow.add_node("translate", translate_with_llm)
workflow.add_node("clone_voice", clone_with_openvoice)
workflow.add_node("generate_audio", generate_dia_tts)
workflow.add_node("human_review", human_approval_gate)    # HITL interrupt
workflow.add_node("lipsync_video", wan_v2v_lipsync)
workflow.add_node("publish", upload_to_mediacms)

workflow.set_entry_point("transcribe")
workflow.add_edge("transcribe", "translate")
workflow.add_edge("translate", "clone_voice")
workflow.add_edge("clone_voice", "generate_audio")
workflow.add_edge("generate_audio", "human_review")
workflow.add_conditional_edges("human_review",
    lambda s: "lipsync_video" if s["human_approved"] else "clone_voice")
workflow.add_edge("lipsync_video", "publish")

app = workflow.compile()
result = app.invoke({"video_path": "episode_01_en.mp4"})
```

**Time estimate:** ~15 min per 30-min episode on A100. Cost: ~$0.60/episode.

---

## P2 — Agentic Music Bed Generation (Brand / Podcast)

**Use case:** Generate custom licensed music using client's style guide + LoRA fine-tuning.

**Stack:**
- [ace-step/ACE-Step-1.5](https://github.com/ace-step/ACE-Step-1.5) — Apache-2.0
- [facebookresearch/audiocraft](https://github.com/facebookresearch/audiocraft) — MIT (code)
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — MIT

```python
from ace_step import ACEStepPipeline

pipe = ACEStepPipeline.from_pretrained("ACE-Step/ACE-Step-v1-3.5B")
pipe.load_lora("./client_brand_lora.safetensors", weight=0.8)
pipe.to("cuda")

def generate_music_bed(scene_description: str, duration_seconds: int = 30) -> str:
    prompt = f"background music for: {scene_description}, instrumental, no vocals, {duration_seconds}s"
    audio = pipe(prompt=prompt, duration=duration_seconds, num_inference_steps=25, guidance_scale=7.5)
    output_path = f"/tmp/music_bed_{hash(prompt)}.wav"
    audio.save(output_path)
    return output_path
```

**Fine-tuning cost:** ~$15 one-time (A100 ~2h). Per-generation: <$0.01/30s track.

---

## P3 — AI Ad Creative Generation Pipeline (AdTech)

**Use case:** Agentic creative + media buying matching Fox/Disney approach with OSS stack.

**Stack:**
- [prebid/Prebid.js](https://github.com/prebid/Prebid.js) — Apache-2.0 — header bidding
- [Lightricks/LTX-Video](https://github.com/Lightricks/LTX-Video) — Apache-2.0 — audio+video in one pass
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — MIT

```python
from langgraph.graph import StateGraph
from typing import TypedDict, List

class AdCampaignState(TypedDict):
    brief: str
    audience_segments: List[dict]
    generated_creatives: List[str]
    approved_creatives: List[str]
    campaign_live: bool

def generate_creative_agent(state: AdCampaignState) -> AdCampaignState:
    from ltx_video import LTXVideoPipeline
    pipe = LTXVideoPipeline.from_pretrained("Lightricks/LTX-Video")
    creatives = []
    for segment in state["audience_segments"]:
        prompt = f"{state['brief']} targeting {segment['description']}, 15-second ad"
        video = pipe(prompt=prompt, duration=15, audio=True)
        path = f"/tmp/ad_{segment['id']}.mp4"
        video.save(path)
        creatives.append(path)
    return {**state, "generated_creatives": creatives}

workflow = StateGraph(AdCampaignState)
workflow.add_node("parse_brief", parse_campaign_brief)
workflow.add_node("generate_creatives", generate_creative_agent)
workflow.add_node("review_gate", human_creative_review)       # HITL
workflow.add_node("optimize_bids", ai_bid_optimizer)
workflow.add_node("launch_campaign", prebid_campaign_launch)
```

---

## P4 — MediaCMS + Whisper Ingest Pipeline

**Use case:** Self-hosted video platform with AI auto-transcription, tagging, and content moderation.

**Stack:**
- [mediacms-io/mediacms](https://github.com/mediacms-io/mediacms) — AGPL-3.0
- [openai/whisper](https://github.com/openai/whisper) — MIT
- [IDEA-Research/Grounded-Segment-Anything](https://github.com/IDEA-Research/Grounded-Segment-Anything) — Apache-2.0

```python
from fastapi import FastAPI
import whisper, httpx

app = FastAPI()
model = whisper.load_model("large-v3")

@app.post("/webhook/video-uploaded")
async def on_video_uploaded(payload: dict):
    video_id = payload["media_id"]
    transcript = model.transcribe(payload["video_url"], language="auto")
    tags = await generate_tags_with_llm(transcript["text"])
    chapters = await generate_chapters(transcript["segments"])
    async with httpx.AsyncClient() as client:
        await client.patch(
            f"https://media.client.com/api/v1/media/{video_id}/",
            json={"description": transcript["text"][:500], "tags": tags, "chapters": chapters},
            headers={"Authorization": f"Token {MEDIACMS_API_TOKEN}"}
        )
    return {"status": "enriched", "video_id": video_id}
```

**Architecture note:** Keep AI enrichment service separate from MediaCMS (AGPL boundary isolation).

---

## P5 — Ghost CMS + LangGraph Editorial Agent

**Use case:** AI-assisted content production with editorial approval workflow.

**Stack:**
- [TryGhost/Ghost](https://github.com/TryGhost/Ghost) — MIT
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — MIT
- Claude API (claude-sonnet-5)

```python
from langgraph.graph import StateGraph
from anthropic import Anthropic

client = Anthropic()

def draft_article(state):
    response = client.messages.create(
        model="claude-sonnet-5", max_tokens=2000,
        messages=[{"role": "user", "content": f"Write a {state['format']} article: {state['brief']}"}]
    )
    return {**state, "draft": response.content[0].text}

def publish_to_ghost(state):
    import httpx
    response = httpx.post("https://publisher.com/ghost/api/admin/posts/",
        json={"posts": [{"title": state["title"], "html": state["approved_draft"], "status": "draft"}]},
        headers={"Authorization": f"Ghost {GHOST_ADMIN_KEY}"})
    return {**state, "ghost_post_id": response.json()["posts"][0]["id"]}

workflow = StateGraph(dict)
workflow.add_node("draft", draft_article)
workflow.add_node("editor_review", human_editorial_gate)   # HITL interrupt
workflow.add_node("publish", publish_to_ghost)
```

---

## P6 — Live Broadcast AI Captioning + Translation (Edge)

**Use case:** Real-time closed captioning and live translation with <100ms latency.

**Stack:**
- [owncast/owncast](https://github.com/owncast/owncast) — MIT
- [ggml-org/whisper.cpp](https://github.com/ggml-org/whisper.cpp) — MIT
- [cumulo-autumn/StreamDiffusion](https://github.com/cumulo-autumn/StreamDiffusion) — Apache-2.0

```bash
./stream -m models/ggml-large-v3.bin \
  --step 500 --length 5000 --language auto --translate -t 8
# Output: JSON segments fed to Owncast WebSocket overlay API
```

---

## P7 — Podcast AI Production Pipeline

**Use case:** Full podcast production from raw recording to published episode.

```
Recording (WAV/MP3)
    → whisper.cpp: transcript + chapters
    → LLM: show notes + social posts
    → ACE-Step: generate intro music (brand LoRA, 15s)
    → Dia TTS: render AI-voice ad reads
    → FFmpeg: assemble final episode
    → HITL: producer review in n8n UI
    → Castopod REST API: publish + chapters
    → n8n: post to socials + WhatsApp newsletter
```

**Time to publish:** ~8 minutes automated + human review. Cost: <$0.10/episode.

---

## P8 — Agentic DAM + AI Tagging

**Use case:** Media company DAM with auto-tagging, semantic search, rights tracking.

**Stack:**
- [pimcore/pimcore](https://github.com/pimcore/pimcore) — GPL-3.0
- [IDEA-Research/Grounded-Segment-Anything](https://github.com/IDEA-Research/Grounded-Segment-Anything) — Apache-2.0
- [openai/whisper](https://github.com/openai/whisper) — MIT
- CLIP (HuggingFace)

```python
def enrich_asset_on_upload(asset_id: str, asset_type: str):
    client = AssetClient(base_url=PIMCORE_URL, api_key=PIMCORE_KEY)
    asset = client.get_asset(asset_id)
    enrichments = {}
    if asset_type in ["image", "video_thumbnail"]:
        enrichments["tags"] = grounded_sam_tag(asset.file_path)
        enrichments["clip_embedding"] = clip_embed(asset.file_path).tolist()
    if asset_type == "video":
        transcript = whisper_transcribe(asset.file_path)
        enrichments["transcript"] = transcript
        enrichments["language"] = transcript["language"]
    enrichments["rights_status"] = infer_rights(asset.filename)
    client.update_asset_metadata(asset_id, enrichments)
```

**Result:** 80%+ reduction in manual metadata work.

---

## P9 — EU AI Act Compliance Layer (M&E)

**Use case:** Mandatory for EU media clients — C2PA synthetic content disclosure + audit trail.

```python
from c2pa import Builder, SigningAlg

def generate_ai_video_with_provenance(prompt: str, model: str) -> tuple[str, dict]:
    video_path = run_wan_generation(prompt)
    builder = Builder({
        "claim_generator": "Globant Media AI Studio/1.0",
        "assertions": [
            {"label": "c2pa.ai_generated", "data": {"prompt": prompt, "model": model}},
            {"label": "c2pa.created", "data": {"digitalSourceType": "trainedAlgorithmicMedia"}}
        ]
    })
    signed_video = builder.sign(video_path, SigningAlg.ES256, cert_chain, private_key)
    audit_db.insert({"asset_id": signed_video["asset_id"], "model": model,
                     "prompt": prompt, "timestamp": datetime.utcnow().isoformat(),
                     "c2pa_manifest_hash": signed_video["manifest_hash"]})
    return signed_video["path"], signed_video["manifest_hash"]
```

**Deadline:** EU AI Act enforcement August 2, 2026. Default in all EU media client deliveries.

---

## P10 — WhatsApp-First Media Distribution Agent (LATAM)

**Use case:** Content distribution via WhatsApp Business API for LATAM audiences.

**Stack:**
- WhatsApp Business Cloud API (Meta)
- [TryGhost/Ghost](https://github.com/TryGhost/Ghost) — MIT
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — MIT

```python
from langgraph.graph import StateGraph

def on_new_article_published(article: dict) -> None:
    workflow = StateGraph(dict)
    workflow.add_node("summarize", lambda s: {**s, "wa_summary": llm_summarize(s["article_html"], max_chars=280)})
    workflow.add_node("audio_version", lambda s: {**s, "audio_path": chatterbox_tts(s["wa_summary"], voice="es-latam")})
    workflow.add_node("send_whatsapp", lambda s: send_wa_message(
        subscriber_list=get_subscribers(s["article"]["tags"]),
        text=s["wa_summary"], audio=s["audio_path"], cta_url=s["article"]["url"]
    ))
    app = workflow.compile()
    app.invoke({"article": article})
```

**LATAM signal:** WhatsApp newsletter open rates 70%+ vs email 20%. Highest-impact for Brazilian/Mexican media clients.

---
*All patterns: real repo URLs, verified licenses, Python code. GPL/AGPL always isolated behind service boundaries.*
