# Composition Patterns — Media & Entertainment

> Concrete recipes for building M&E solutions with open source AI.
> Each pattern names specific repos, wiring, and realistic deal sizes.
> Last updated: 2026-07-10 (v11)

---

## Pattern Architecture

```
[Vertical Platform (MediaCMS / PeerTube / SRS / Owncast)]
              ↓
[AI Microservices Layer]
  ├── Transcription: Whisper.cpp
  ├── Recommendations: Gorse + LLM ranker
  ├── Content Moderation: NeMo Guardrails + Llama Guard
  ├── Music Generation: ACE-Step 1.5 XL
  └── Search: Meilisearch + Claude embeddings
              ↓
[Agent Orchestration (LangGraph / CrewAI)]
              ↓
[MCP Tools exposed to Claude / conversational UI]
```

---

## P1 — AI-Powered OTT Platform (Full Stack)

**Use case**: Regional broadcaster wants to launch an OTT platform with AI recommendations, auto-subtitles, and content moderation.
**Stack**: MediaCMS + Whisper.cpp + Gorse + NeMo Guardrails + Meilisearch + Claude
**Deal size**: $200k–$800k | **Timeline**: 12–20 weeks

```python
# Pattern: Event-driven AI enrichment on video upload
# MediaCMS webhook → AI pipeline → metadata back to CMS

from fastapi import FastAPI, BackgroundTasks
from anthropic import Anthropic
import subprocess, json, httpx

app = FastAPI()
client = Anthropic()

async def enrich_video(video_id: str, video_path: str, audio_path: str):
    # 1. Transcription via Whisper.cpp
    result = subprocess.run(
        ["whisper.cpp/main", "-m", "models/ggml-large-v3.bin",
         "-f", audio_path, "--output-json", "-l", "auto"],
        capture_output=True, text=True
    )
    transcript = json.loads(result.stdout)
    transcript_text = " ".join([seg["text"] for seg in transcript["transcription"]])

    # 2. AI Metadata Generation via Claude
    metadata_response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": f"""You are a media metadata expert. Given this video transcript, generate:
- title: SEO-optimized title (max 70 chars)
- description: Engaging description (150-300 chars)  
- tags: 10 relevant tags
- category: One of [Drama, Comedy, News, Sports, Documentary, Kids, Reality]
- age_rating: One of [G, PG, PG-13, R]
- language: detected language code

Transcript: {transcript_text[:3000]}

Respond as JSON only."""
        }]
    )
    metadata = json.loads(metadata_response.content[0].text)

    # 3. Content Moderation check
    moderation_response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=256,
        messages=[{
            "role": "user",
            "content": f"""Content safety check. Transcript: {transcript_text[:2000]}
            
Is this content safe for general audiences? Respond JSON: 
{{"safe": true/false, "flags": [], "age_rating_override": null}}"""
        }]
    )
    moderation = json.loads(moderation_response.content[0].text)

    # 4. Generate embedding for semantic search
    embedding_response = httpx.post(
        "http://meilisearch:7700/indexes/videos/documents",
        json={
            "id": video_id,
            "transcript": transcript_text,
            "title": metadata["title"],
            "description": metadata["description"],
            "tags": metadata["tags"],
            "category": metadata["category"],
        }
    )

    # 5. Ingest into Gorse recommender
    gorse_response = httpx.post(
        "http://gorse:8086/api/item",
        json={
            "ItemId": video_id,
            "Labels": metadata["tags"] + [metadata["category"]],
            "Comment": metadata["description"]
        }
    )

    # 6. Update MediaCMS via API
    await update_mediacms(video_id, metadata, moderation, transcript)

@app.post("/webhook/video-uploaded")
async def on_video_uploaded(payload: dict, bg: BackgroundTasks):
    bg.add_task(enrich_video, payload["video_id"], 
                payload["video_path"], payload["audio_path"])
    return {"status": "processing"}
```

---

## P2 — Agent-Native Video Editor (video-use Pattern)

**Use case**: Content team produces raw talking-head videos; agent delivers polished final cuts.
**Stack**: video-use + ElevenLabs Scribe + Claude Code + FFmpeg
**Deal size**: $50k–$200k | **Timeline**: 4–8 weeks | **Unit economics**: $0.05–0.30/video

```python
# Pattern: Raw footage → finished video via Claude Code agent
# Uses video-use architecture: transcript + frames, never raw video bytes

import anthropic
import subprocess, json, os
from pathlib import Path

client = anthropic.Anthropic()

def transcribe_with_elevenlabs(audio_path: str) -> dict:
    """Get word-level transcript with timestamps via ElevenLabs Scribe."""
    import requests
    response = requests.post(
        "https://api.elevenlabs.io/v1/speech-to-text",
        headers={"xi-api-key": os.environ["ELEVENLABS_API_KEY"]},
        files={"audio": open(audio_path, "rb")},
        data={"model_id": "scribe_v1", "timestamps_granularity": "word"}
    )
    return response.json()

def extract_keyframes(video_path: str, output_dir: str, fps: float = 0.5) -> list[str]:
    """Extract keyframe PNGs at low fps for LLM visual context."""
    os.makedirs(output_dir, exist_ok=True)
    subprocess.run([
        "ffmpeg", "-i", video_path, "-vf", f"fps={fps}",
        f"{output_dir}/frame_%04d.png", "-y"
    ], check=True)
    return sorted(Path(output_dir).glob("*.png"))

def agent_edit_video(raw_video: str, output_video: str, style: str = "professional"):
    """Main agent editing loop."""
    
    # Get transcript + keyframes (what the agent sees, not raw video)
    transcript = transcribe_with_elevenlabs(raw_video)
    keyframes = extract_keyframes(raw_video, "/tmp/frames")
    
    # Agent generates FFmpeg edit plan from transcript + visual context
    edit_plan_response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=4096,
        messages=[{
            "role": "user", 
            "content": [
                {
                    "type": "text",
                    "text": f"""You are a video editor. Plan the edits for this video.
                    
Style: {style}
Transcript (with timestamps): {json.dumps(transcript['words'][:500], indent=2)}

Tasks:
1. Identify all filler words (umm, uh, like, you know) with timestamps → mark for cut
2. Identify dead space (gaps >0.5s between words) → mark for cut  
3. Plan color grade: "lut=vibrancy" or "eq=contrast=1.2:saturation=1.1"
4. Plan subtitle style: font, size, position
5. Identify speaker segments for audio normalization

Output a JSON edit plan with: cuts[], color_grade, subtitle_config, audio_normalize"""
                }
            ]
        }]
    )
    
    edit_plan = json.loads(edit_plan_response.content[0].text)
    
    # Build FFmpeg command from edit plan
    cuts = edit_plan["cuts"]
    
    # Generate select filter for cuts
    keep_segments = build_keep_segments(transcript, cuts)
    select_filter = "+".join([f"between(t,{s},{e})" for s, e in keep_segments])
    
    # Execute FFmpeg edit
    ffmpeg_cmd = [
        "ffmpeg", "-i", raw_video,
        "-vf", f"select='{select_filter}',setpts=N/FRAME_RATE/TB,{edit_plan['color_grade']}",
        "-af", f"aselect='{select_filter}',asetpts=N/SR/TB,loudnorm",
        "-c:v", "libx264", "-c:a", "aac", "-preset", "medium",
        output_video, "-y"
    ]
    subprocess.run(ffmpeg_cmd, check=True)
    
    # Burn subtitles
    srt_path = generate_srt(transcript, cuts)
    subprocess.run([
        "ffmpeg", "-i", output_video, "-vf", f"subtitles={srt_path}",
        output_video.replace(".mp4", "_final.mp4"), "-y"
    ], check=True)
    
    return output_video.replace(".mp4", "_final.mp4")

def build_keep_segments(transcript, cuts):
    """Convert list of cut timestamps into keep segments."""
    # Implementation: find gaps between cut regions
    all_times = [(w["start"], w["end"]) for w in transcript["words"]]
    # ... filtering logic
    return []  # list of (start, end) tuples to keep
```

---

## P3 — Agentic Video Production Factory (OpenMontage)

**Use case**: Ad agency wants to produce 50+ social media videos/week from creative briefs.
**Stack**: OpenMontage + ACE-Step 1.5 XL + ElevenLabs + Claude Sonnet
**Deal size**: $80k–$300k setup + $5k–$20k/month operation | **Timeline**: 6–10 weeks

```python
# Pattern: Brief → finished video via OpenMontage multi-agent system
# OpenMontage provides 12 pipelines, 52 tools, 500+ skills

import subprocess, json, os
from anthropic import Anthropic

client = Anthropic()

def generate_creative_brief(client_brief: str, brand_guidelines: dict) -> dict:
    """Expand client brief into production-ready creative direction."""
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2048,
        messages=[{
            "role": "user",
            "content": f"""You are a creative director for a video production agency.
            
Client brief: {client_brief}
Brand guidelines: {json.dumps(brand_guidelines)}

Generate a structured production brief:
{{
    "title": "...",
    "duration_seconds": 30,
    "format": "9:16|16:9|1:1",
    "tone": "energetic|professional|emotional|playful",
    "hook": "Opening 3 seconds hook line",
    "script": "Full voiceover script",
    "visual_style": "Description of visual style",
    "music_prompt": "ACE-Step music generation prompt",
    "color_palette": ["#hex1", "#hex2"],
    "target_platform": "TikTok|Instagram|YouTube|LinkedIn"
}}"""
        }]
    )
    return json.loads(response.content[0].text)

def generate_brand_music(music_prompt: str, duration: int) -> str:
    """Generate brand-consistent music via ACE-Step 1.5 XL."""
    # Run ACE-Step locally (requires GPU)
    result = subprocess.run([
        "python", "ace-step/generate.py",
        "--prompt", music_prompt,
        "--duration", str(duration),
        "--output", "/tmp/music.wav",
        "--model", "ace-step/ACE-Step-1.5"
    ], capture_output=True)
    return "/tmp/music.wav"

def produce_video_via_openmontage(brief: dict) -> str:
    """Invoke OpenMontage skill pipeline to produce video."""
    # OpenMontage exposes skills via Claude Code SKILL.md interface
    # This wraps the CLI interface
    skill_prompt = f"""
/video-production create
Title: {brief['title']}
Script: {brief['script']}
Duration: {brief['duration_seconds']}s
Format: {brief['format']}
Visual style: {brief['visual_style']}
Platform: {brief['target_platform']}
Music: {brief['music_prompt']}
"""
    # Claude Code + OpenMontage skills handle the rest
    result = subprocess.run(
        ["claude", "--no-interactive", skill_prompt],
        capture_output=True, text=True,
        cwd="/opt/OpenMontage"
    )
    return result.stdout.strip()  # path to rendered video

def video_factory_pipeline(client_brief: str, brand_guidelines: dict) -> str:
    """End-to-end: brief → finished video."""
    brief = generate_creative_brief(client_brief, brand_guidelines)
    music_path = generate_brand_music(brief["music_prompt"], brief["duration_seconds"])
    video_path = produce_video_via_openmontage(brief)
    return video_path

# Usage:
# video = video_factory_pipeline(
#     "30s ad for eco-friendly sneakers targeting Gen Z on TikTok",
#     {"colors": ["#00FF88"], "tone": "energetic", "no_text": ["fast fashion"]}
# )
```

---

## P4 — LATAM FAST Channel AI Stack

**Use case**: Brazilian broadcaster launching 5 FAST channels with AI-powered curation and Portuguese subtitles.
**Stack**: PeerTube + Gorse + Whisper.cpp + Claude (PT translation) + NeMo Guardrails + SRS
**Deal size**: $150k–$500k | **Timeline**: 10–16 weeks

```python
# Pattern: Automated FAST channel curation + localization
# PeerTube as distribution, Gorse for playlist curation, Whisper for PT-BR subtitles

from anthropic import Anthropic
import subprocess, json, httpx

client = Anthropic()

class FASTChannelCurator:
    """AI curator for FAST channel playlist management."""
    
    def __init__(self, channel_theme: str, target_language: str = "pt-BR"):
        self.channel_theme = channel_theme
        self.target_language = target_language
        self.gorse_url = "http://gorse:8086"
        self.peertube_url = "http://peertube:9000"
    
    def transcribe_and_translate(self, audio_path: str) -> dict:
        """Whisper transcription + Claude translation to Portuguese."""
        # Transcription
        transcript_result = subprocess.run(
            ["./whisper.cpp/main", "-m", "models/ggml-large-v3.bin",
             "-f", audio_path, "-l", "auto", "--output-json"],
            capture_output=True, text=True
        )
        transcript = json.loads(transcript_result.stdout)
        original_text = " ".join([s["text"] for s in transcript["transcription"]])
        
        # Translation to Portuguese if needed
        if self.target_language == "pt-BR" and transcript.get("detected_language") != "pt":
            translation_response = client.messages.create(
                model="claude-haiku-4-5-20251001",
                max_tokens=4096,
                messages=[{
                    "role": "user",
                    "content": f"""Translate this to Brazilian Portuguese (pt-BR) naturally.
Preserve speaker tone and cultural nuance. Keep timing-friendly phrasing.

Original ({transcript.get('detected_language', 'unknown')}):
{original_text}

Return only the translated text."""
                }]
            )
            translated_text = translation_response.content[0].text
        else:
            translated_text = original_text
        
        return {"original": original_text, "translated": translated_text, 
                "segments": transcript["transcription"]}
    
    def curate_playlist(self, available_video_ids: list, playlist_length: int = 24) -> list:
        """Use Gorse + LLM re-ranking to curate thematic playlist."""
        # Get Gorse popularity recommendations
        gorse_recs = httpx.get(
            f"{self.gorse_url}/api/popular",
            params={"n": playlist_length * 3}
        ).json()
        
        # Filter to available content
        candidates = [v for v in gorse_recs if v["Id"] in available_video_ids]
        
        # LLM re-ranking for thematic coherence
        rerank_response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=1024,
            messages=[{
                "role": "user",
                "content": f"""You are a FAST channel programmer for a "{self.channel_theme}" channel.
Select and order {playlist_length} videos for a 24-hour programming block.
Consider: viewer flow, genre variety, time-of-day appropriateness.

Available videos: {json.dumps(candidates[:50])}

Return JSON: {{"playlist": ["video_id1", "video_id2", ...]}}"""
            }]
        )
        playlist = json.loads(rerank_response.content[0].text)
        return playlist["playlist"][:playlist_length]
    
    def moderate_content(self, transcript: str) -> dict:
        """NeMo Guardrails + Claude for content compliance check."""
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=256,
            messages=[{
                "role": "user",
                "content": f"""Brazilian content compliance check (ANATEL/ANCINE).
Check for: adult content, political bias, hate speech, commercial violations.
Transcript: {transcript[:2000]}
Response JSON: {{"compliant": true/false, "issues": [], "age_rating": "Livre|10|12|14|16|18"}}"""
            }]
        )
        return json.loads(response.content[0].text)
```

---

## P5 — AI Microdrama Production Pipeline

**Use case**: Production company wants to adapt existing telenovela scripts into microdrama format (3-min episodes) for TikTok/Instagram.
**Stack**: mediago-drama + ViMax + ACE-Step 1.5 XL + Voicebox + Claude
**Deal size**: $80k–$250k | **Timeline**: 6–10 weeks | **Output**: 5-10 episodes/day automated

```python
# Pattern: Novel/script → microdrama episode via multi-agent pipeline
# Targets the $14B global microdrama market (esp. LATAM)

from anthropic import Anthropic
import json

client = Anthropic()

def adapt_to_microdrama(source_content: str, episode_number: int, 
                         series_style: dict) -> dict:
    """Agent adapts longer content to 3-min microdrama episode."""
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=4096,
        messages=[{
            "role": "user",
            "content": f"""You are a microdrama writer specializing in adapting stories 
for TikTok/Instagram (3 minutes max, hook in first 3 seconds, cliffhanger ending).

Series style: {json.dumps(series_style)}
Episode number: {episode_number}
Source material: {source_content[:5000]}

Create episode {episode_number}:
{{
    "hook": "First 3 seconds line (must create immediate tension)",
    "scenes": [
        {{
            "scene_number": 1,
            "duration_seconds": 30,
            "action": "Visual description",
            "dialogue": [{{"character": "...", "line": "..."}}],
            "emotion": "tension|joy|surprise|heartbreak",
            "camera": "close-up|wide|medium"
        }}
    ],
    "cliffhanger": "Final line that makes viewers watch next episode",
    "music_mood": "tense|romantic|triumphant|melancholic",
    "estimated_duration_seconds": 180
}}"""
        }]
    )
    return json.loads(response.content[0].text)

def generate_episode_music(mood: str, duration: int) -> str:
    """ACE-Step 1.5 XL: generate mood-appropriate background music."""
    music_prompts = {
        "tense": "suspenseful telenovela strings, crescendo, minor key, dramatic",
        "romantic": "romantic acoustic guitar, soft strings, warm, melodic",
        "triumphant": "uplifting orchestral, brass section, triumphant, inspiring",
        "melancholic": "sad piano, minor key, emotional, slow tempo"
    }
    # Call ACE-Step generation
    import subprocess
    subprocess.run([
        "python", "generate.py",
        "--prompt", music_prompts[mood],
        "--duration", str(duration),
        "--output", f"/tmp/music_{mood}.wav"
    ], cwd="/opt/ACE-Step-1.5")
    return f"/tmp/music_{mood}.wav"

def voice_characters(scenes: list, character_voices: dict) -> list:
    """Voicebox: generate character voice lines per scene."""
    voiced_scenes = []
    for scene in scenes:
        voiced_dialogue = []
        for line in scene["dialogue"]:
            char = line["character"]
            voice_id = character_voices.get(char, "default")
            # Voicebox API call
            audio_path = f"/tmp/audio_{char}_{scene['scene_number']}.wav"
            # ... voicebox synthesis call here
            voiced_dialogue.append({**line, "audio_path": audio_path})
        voiced_scenes.append({**scene, "voiced_dialogue": voiced_dialogue})
    return voiced_scenes

def produce_microdrama_episode(source_content: str, episode_number: int,
                                series_config: dict) -> str:
    """Full pipeline: source → finished episode."""
    # 1. Adapt to microdrama format
    episode_script = adapt_to_microdrama(source_content, episode_number, 
                                          series_config["style"])
    
    # 2. Generate music
    music_path = generate_episode_music(
        episode_script["music_mood"], 
        episode_script["estimated_duration_seconds"]
    )
    
    # 3. Voice characters
    voiced_scenes = voice_characters(
        episode_script["scenes"], 
        series_config["character_voices"]
    )
    
    # 4. Produce via ViMax/mediago-drama
    # ... ViMax orchestrates visual production from scene descriptions
    
    return f"episode_{episode_number:03d}_final.mp4"
```

---

## P6 — Content Moderation Agent for UGC Platform

**Use case**: Social video platform needs real-time moderation of uploaded content (video + audio + text).
**Stack**: NeMo Guardrails + Llama Guard 4 + Whisper.cpp + Claude
**Deal size**: $60k–$200k | **Timeline**: 6–10 weeks

```python
# Pattern: Multi-modal content moderation pipeline
# Whisper (transcript) → Llama Guard (safety) → Claude (nuance) → decision

from anthropic import Anthropic
import subprocess, json, base64
from enum import Enum

client = Anthropic()

class ModerationDecision(Enum):
    APPROVED = "approved"
    PENDING_REVIEW = "pending_human_review"
    AUTO_REJECTED = "auto_rejected"

def moderate_video_upload(video_path: str, audio_path: str, 
                           thumbnail_path: str, metadata: dict) -> dict:
    """Full multi-modal content moderation pipeline."""
    
    # Stage 1: Transcription
    whisper_result = subprocess.run(
        ["./whisper.cpp/main", "-m", "models/ggml-large-v3.bin",
         "-f", audio_path, "--output-json"],
        capture_output=True, text=True
    )
    transcript = json.loads(whisper_result.stdout)
    transcript_text = " ".join([s["text"] for s in transcript["transcription"]])
    
    # Stage 2: Claude multi-modal safety analysis (transcript + thumbnail)
    with open(thumbnail_path, "rb") as f:
        thumbnail_b64 = base64.b64encode(f.read()).decode()
    
    moderation_response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=512,
        messages=[{
            "role": "user",
            "content": [
                {
                    "type": "image",
                    "source": {"type": "base64", "media_type": "image/jpeg",
                               "data": thumbnail_b64}
                },
                {
                    "type": "text",
                    "text": f"""Content safety analysis for user-uploaded video.

Video metadata: {json.dumps(metadata)}
Audio transcript: {transcript_text[:3000]}

Analyze for:
1. Violence (graphic, incitement to violence)
2. Adult content (nudity, explicit content)  
3. Hate speech (race, religion, gender, nationality)
4. Misinformation (health, election, crisis misinformation)
5. CSAM signals (immediate auto-reject + report)
6. Spam/commercial policy violations

Output JSON:
{{
    "decision": "approved|pending_human_review|auto_rejected",
    "confidence": 0.0-1.0,
    "flags": [],
    "reason": "...",
    "csam_detected": false,
    "age_recommendation": "all|13+|17+|18+"
}}

IMPORTANT: When in doubt about severity, escalate to pending_human_review."""
                }
            ]
        }]
    )
    
    result = json.loads(moderation_response.content[0].text)
    
    # CSAM: always immediate auto-reject + report
    if result.get("csam_detected"):
        result["decision"] = ModerationDecision.AUTO_REJECTED.value
        await report_csam(video_path, metadata)
    
    # High-confidence safe content → approve immediately
    if result["decision"] == "approved" and result["confidence"] > 0.95:
        return {**result, "action": "publish", "reviewed_by": "ai"}
    
    # Borderline → human review queue
    if result["decision"] == "pending_human_review":
        await queue_for_human_review(video_path, result)
        return {**result, "action": "hold", "reviewed_by": "human_pending"}
    
    return result

async def report_csam(video_path: str, metadata: dict):
    """NCMEC reporting pipeline — always synchronous, never async."""
    # NCMEC CyberTipline API integration
    pass

async def queue_for_human_review(video_path: str, ai_analysis: dict):
    """Add to human moderation queue with AI pre-analysis."""
    pass
```

---

## P7 — Agentic Metadata Enrichment for Broadcast Archive

**Use case**: Broadcaster has 50,000+ video archive with no/poor metadata; needs enrichment for OS-level discovery and searchability.
**Stack**: Whisper.cpp + Grounded-SAM + CLIP + Claude + Meilisearch
**Deal size**: $60k–$200k | **Timeline**: 4–8 weeks (batch processing)

```python
# Pattern: Bulk archive enrichment — crucial for OS-level content discovery
# Apple/Google/Samsung TV OS discovery depends on metadata quality

from anthropic import Anthropic
import subprocess, json, httpx
from pathlib import Path

client = Anthropic()

def batch_enrich_archive(video_dir: str, batch_size: int = 100):
    """Process video archive in batches for metadata enrichment."""
    videos = list(Path(video_dir).glob("**/*.mp4"))
    
    for batch_start in range(0, len(videos), batch_size):
        batch = videos[batch_start:batch_start + batch_size]
        
        for video_path in batch:
            metadata = enrich_single_video(str(video_path))
            index_in_meilisearch(video_path.stem, metadata)
            print(f"Enriched: {video_path.name}")

def enrich_single_video(video_path: str) -> dict:
    """Complete metadata enrichment for a single video."""
    
    # 1. Extract audio + transcribe
    audio_path = video_path.replace(".mp4", ".wav")
    subprocess.run(["ffmpeg", "-i", video_path, "-ar", "16000", "-ac", "1",
                    audio_path, "-y"], check=True)
    
    transcript_result = subprocess.run(
        ["./whisper.cpp/main", "-m", "models/ggml-large-v3.bin",
         "-f", audio_path, "-l", "auto", "--output-json"],
        capture_output=True, text=True
    )
    transcript = json.loads(transcript_result.stdout)
    text = " ".join([s["text"] for s in transcript["transcription"]])
    
    # 2. Extract keyframe for visual context
    subprocess.run([
        "ffmpeg", "-i", video_path, "-vf", "select='eq(n,0)'",
        "-frames:v", "1", "/tmp/thumb.jpg", "-y"
    ], check=True)
    
    import base64
    with open("/tmp/thumb.jpg", "rb") as f:
        img_b64 = base64.b64encode(f.read()).decode()
    
    # 3. Claude metadata generation (text + visual)
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": [
                {"type": "image", "source": {"type": "base64", 
                 "media_type": "image/jpeg", "data": img_b64}},
                {"type": "text", "text": f"""Generate rich metadata for this video for OTT/FAST discovery.
                
Audio transcript (first 2000 chars): {text[:2000]}

Generate JSON:
{{
    "title": "Compelling title (max 70 chars)",
    "synopsis": "Engaging 2-3 sentence synopsis",
    "short_description": "One line (max 150 chars)",
    "genre": "Drama|Comedy|Documentary|News|Sports|Reality|Kids|Thriller",
    "sub_genre": ["...", "..."],
    "mood": ["dramatic", "uplifting", ...],
    "topics": ["...", "..."],
    "language": "pt|es|en|...",
    "content_rating": "Livre|10|12|14|16|18",
    "seo_keywords": ["...", "..."],
    "apple_tv_categories": ["...", "..."],
    "google_tv_categories": ["...", "..."]
}}"""
                }
            ]
        }]
    )
    return json.loads(response.content[0].text)

def index_in_meilisearch(video_id: str, metadata: dict):
    """Index enriched metadata in Meilisearch for fast search."""
    httpx.post(
        "http://meilisearch:7700/indexes/archive/documents",
        json=[{"id": video_id, **metadata}]
    )
```

---

## P8 — Open Source Music Factory for Brand Audio (ACE-Step + LoRA)

**Use case**: Brand needs consistent background music for all their video content without licensing fees.
**Stack**: ACE-Step 1.5 XL + LoRA fine-tuning + brand music library
**Deal size**: $30k–$100k setup | **Timeline**: 2–4 weeks | **Ongoing cost**: $0 (local GPU)

```python
# Pattern: Fine-tune ACE-Step on brand's existing music → generate unlimited brand music
# LoRA training on 5-10 reference tracks captures brand sound identity

import subprocess, json, os

def train_brand_music_lora(
    reference_tracks: list[str],  # 5-10 WAV files of brand music
    brand_name: str,
    output_dir: str
) -> str:
    """Fine-tune ACE-Step LoRA on brand's music style."""
    
    # Prepare training data
    train_data = []
    for track in reference_tracks:
        # ACE-Step expects audio + text description pairs
        train_data.append({
            "audio": track,
            "caption": f"{brand_name} brand music, professional, consistent style"
        })
    
    # Run LoRA training (~$30-100 on A100, ~4-6 hours)
    subprocess.run([
        "python", "train_lora.py",
        "--model", "ace-step/ACE-Step-1.5",
        "--data", json.dumps(train_data),
        "--output", output_dir,
        "--epochs", "100",
        "--learning_rate", "1e-4",
        "--lora_rank", "16"
    ], cwd="/opt/ACE-Step-1.5", check=True)
    
    return f"{output_dir}/lora_weights.safetensors"

def generate_brand_music(
    lora_weights: str,
    video_duration: int,
    mood: str,
    scene_description: str
) -> str:
    """Generate on-brand music for specific video."""
    output_path = f"/tmp/music_{mood}_{video_duration}s.wav"
    
    prompt = f"{mood} background music for {scene_description}, {video_duration} seconds"
    
    subprocess.run([
        "python", "generate.py",
        "--model", "ace-step/ACE-Step-1.5",
        "--lora", lora_weights,
        "--prompt", prompt,
        "--duration", str(video_duration),
        "--output", output_path,
        "--no-lyrics"  # instrumental only for background
    ], cwd="/opt/ACE-Step-1.5", check=True)
    
    return output_path

# Usage:
# lora = train_brand_music_lora(
#     ["brand_track1.wav", "brand_track2.wav"],
#     "Coca-Cola Brazil",
#     "/models/coca-cola-lora"
# )
# music = generate_brand_music(
#     lora, 30, "uplifting", "summer beach commercial"
# )
```

---

## Deal Size Reference

| Pattern | Deal Size | Timeline | Monthly Recurring |
|---------|-----------|----------|-------------------|
| P1 — AI-Powered OTT Platform | $200k–$800k | 12–20 weeks | $10k–$30k (ops) |
| P2 — Agent-Native Video Editor | $50k–$200k | 4–8 weeks | $0.05–0.30/video |
| P3 — Video Production Factory | $80k–$300k | 6–10 weeks | $5k–$20k/month |
| P4 — LATAM FAST Channel AI | $150k–$500k | 10–16 weeks | $8k–$25k/month |
| P5 — Microdrama Production Pipeline | $80k–$250k | 6–10 weeks | $3k–$10k/month |
| P6 — Content Moderation Agent | $60k–$200k | 6–10 weeks | $5k–$15k/month |
| P7 — Broadcast Archive Enrichment | $60k–$200k | 4–8 weeks | One-time |
| P8 — Brand Music Factory | $30k–$100k | 2–4 weeks | $0 (local GPU) |

---
*See intel/market.md for Globant positioning and LATAM opportunity details.*
