# 🏭 Vertical Solutions — Media & Entertainment

> Real platforms to start from — fork, extend with AI, deliver to clients.
> Model: working platform + AI layer on top = faster delivery.
> Last updated: 2026-07-08 (v7 — Localization/Dubbing section, KrillinAI, open-dubbing, Wan 2.7)

## Video Platforms & CMS

| Platform | License | Repo | Stack | Use Case | AI Integration Points |
|----------|---------|------|-------|----------|----------------------|
| **MediaCMS** | AGPL-3.0 | [mediacms-io/mediacms](https://github.com/mediacms-io/mediacms) | Python/Django + React | Full-featured video CMS with REST API, transcoding, search | Auto-tagging, AI search, transcription via Whisper |
| **PeerTube** | AGPL-3.0 | [Chocobozzz/PeerTube](https://github.com/Chocobozzz/PeerTube) | TypeScript + Vue | Federated YouTube alternative; ActivityPub; ~13k★ | Plugin AI subtitles, content moderation, recommendation |
| **Owncast** | MIT | [owncast/owncast](https://github.com/owncast/owncast) | Go + React | Self-hosted live streaming + chat; single binary deployment | AI moderation, real-time transcription, automated clips |

## Radio & Audio Broadcasting

| Platform | License | Repo | Stack | Use Case | AI Integration Points |
|----------|---------|------|-------|----------|----------------------|
| **AzuraCast** | Apache-2.0 | [AzuraCast/AzuraCast](https://github.com/AzuraCast/AzuraCast) | PHP + Vue | Web radio: stations, playlists, DJ management, analytics; ~3.5k★ | AI playlist scheduling, genre classification, listener analytics |
| **Liquidsoap** | MIT | [savonet/liquidsoap](https://github.com/savonet/liquidsoap) | OCaml + DSL | Scripted audio/video streaming language — backbone of many radio systems | AI-driven track selection, dynamic jingles, real-time SFX |
| **Castopod** | AGPL-3.0 | [ad-aures/castopod](https://github.com/ad-aures/castopod) | PHP + Vue | Self-hosted podcast hosting with ActivityPub federation — publish to Podcast Index, Spotify, Apple; ~2k★ | AI episode generation via Podcastfy, auto-show-notes, chapter generation |

## Digital Asset Management (DAM)

| Platform | License | Repo | Stack | Use Case | AI Integration Points |
|----------|---------|------|-------|----------|----------------------|
| **ResourceSpace** | BSD | [resourcespace/resourcespace](https://github.com/resourcespace/resourcespace) | PHP + MySQL | Full DAM: metadata, versioning, permissions, search, video preview | AI metadata tagging, facial recognition, content similarity |
| **AtroCore DAM** | Apache-2.0 | [atrocore/atrocore](https://github.com/atrocore/atrocore) | PHP | Free DAM with AI-ready plugin architecture | Auto-tagging, AI description generation |

## Content Management

| Platform | License | Repo | Stack | Use Case | AI Integration Points |
|----------|---------|------|-------|----------|----------------------|
| **Strapi** | MIT (Community) | [strapi/strapi](https://github.com/strapi/strapi) | Node.js | Headless CMS — API-first content management; ~65k★ | AI content enrichment, auto-categorization, editorial AI |
| **Ghost** | MIT | [TryGhost/Ghost](https://github.com/TryGhost/Ghost) | Node.js | Publishing platform for newsletters + membership sites | AI writing assist, SEO optimization, newsletter personalization |

## Localization & Dubbing Platforms (v7 addition)

| Platform | License | Repo | Stack | Use Case | AI Integration Points |
|----------|---------|------|-------|----------|----------------------|
| **KrillinAI** | Apache-2.0 | [krillinai/KrillinAI](https://github.com/krillinai/KrillinAI) | Go + LLM | AI-Agent-native video translation & dubbing; 100+ languages; 10.4k★ | Each stage is a composable agent skill; Claude orchestration for brand voice |
| **open-dubbing** (Softcatala) | MIT | [Softcatala/open-dubbing](https://github.com/Softcatala/open-dubbing) | Python | Fully local dubbing via OSS models (Coqui/MMS/Edge TTS + NLLB translation) | LGPD-compliant offline dubbing; no cloud dependency |

### Pattern E: KrillinAI Agentic Dubbing (LATAM Localization Upgrade)

```python
import anthropic
import subprocess
import json
from pathlib import Path

class AgenticDubbingPipeline:
    """KrillinAI + Claude brand-voice layer for LATAM localization."""
    
    def __init__(self, brand_glossary: dict):
        self.claude = anthropic.Anthropic()
        self.brand_glossary = brand_glossary
    
    def dub_video(self, video_url: str, target_lang: str, output_dir: str) -> str:
        """Full agentic dubbing: KrillinAI skills + Claude brand translation."""
        Path(output_dir).mkdir(parents=True, exist_ok=True)
        
        # Step 1: KrillinAI skills — download + transcribe
        result = subprocess.run([
            "krillinai", "skills", "run",
            "--skill", "download,transcribe",
            "--input", video_url,
            "--output-dir", output_dir,
            "--format", "json"
        ], capture_output=True, text=True, check=True)
        transcript = json.loads(result.stdout)
        
        # Step 2: Claude — brand-aware translation
        lang_names = {"pt-BR": "Brazilian Portuguese", "es-MX": "Mexican Spanish"}
        glossary_str = "\n".join(f"- '{k}' → '{v}'" for k, v in self.brand_glossary.items())
        full_text = "\n".join(f"[{i}] {s['text']}" for i, s in enumerate(transcript["segments"]))
        
        response = self.claude.messages.create(
            model="claude-sonnet-5",
            max_tokens=4096,
            messages=[{"role": "user", "content": 
                f"Translate to {lang_names[target_lang]}. Enforce brand glossary:\n{glossary_str}\n\nSegments:\n{full_text}\n\nReturn JSON: [{{\"index\": int, \"text\": str}}]"
            }]
        )
        translations = json.loads(response.content[0].text)
        segments = transcript["segments"].copy()
        for t in translations:
            segments[t["index"]]["text"] = t["text"]
        
        translated_path = Path(output_dir) / "translated.json"
        translated_path.write_text(json.dumps({"segments": segments}))
        
        # Step 3: KrillinAI skills — TTS + reformat + cover
        final = subprocess.run([
            "krillinai", "skills", "run",
            "--skill", "tts,reformat,cover",
            "--transcript", str(translated_path),
            "--video-dir", output_dir,
            "--target-language", target_lang,
            "--platform", "youtube",
            "--format", "json"
        ], capture_output=True, text=True, check=True)
        
        return json.loads(final.stdout)["output_video"]

# Usage — Brazilian Portuguese dubbing
pipeline = AgenticDubbingPipeline(brand_glossary={
    "artificial intelligence": "inteligência artificial",
    "cloud computing": "computação em nuvem",
    "Globant": "Globant"
})
output = pipeline.dub_video("https://youtube.com/watch?v=example", "pt-BR", "/output/latam")
print(f"Dubbed video: {output}")
```

**Architecture**:
```
Video URL → KrillinAI skills (download + transcribe)
         → Claude Sonnet 5 (brand-aware translation with glossary enforcement)
         → KrillinAI skills (TTS dub + reformat + cover generation)
         → YouTube-optimized dubbed video in pt-BR / es-MX / es-AR
```

---

## AI Video Generation Platforms (4th-Pass Additions)

| Platform | License | Repo | Stack | Use Case | AI Integration Points |
|----------|---------|------|-------|----------|----------------------|
| **LTX Desktop + LTX-2** | Apache-2.0 | [Lightricks/LTX-2](https://github.com/Lightricks/LTX-2) | Python + DiT | Local 4K video+audio generation studio; single-pass, no internet required | Native audio generation, IC-LoRA fine-tuning, camera control LoRAs |
| **Open-Generative-AI** | MIT | [Anil-matcha/Open-Generative-AI](https://github.com/Anil-matcha/Open-Generative-AI) | JavaScript | Self-hosted multi-model studio; 200+ models across Image/Video/Lip Sync/Cinema | Claude API integration for script-to-video pipelines, branded studio |
| **Wan 2.7** | Apache-2.0 | [Wan-Video/Wan2.2](https://github.com/Wan-Video/Wan2.2) | Python | Alibaba Tongyi Lab; "Thinking Mode" before generation; 1080p/15s; native audio; first/last frame (storyboard→video); Apache-2.0 | Default for new video gen projects H2 2026; storyboard-driven production |
| **Open-Sora 2.0** | Apache-2.0 | [hpcaitech/Open-Sora](https://github.com/hpcaitech/Open-Sora) | Python | Complete video gen with training pipeline; only open model shipping full train code | Custom model training on client content libraries |

## Integration Code Patterns

### Pattern A: MediaCMS + Whisper Auto-Captioning

```python
# Add to MediaCMS after video upload webhook
import subprocess
import httpx
from faster_whisper import WhisperModel

def auto_caption_on_upload(video_path: str, media_id: str):
    model = WhisperModel("large-v3", device="cuda", compute_type="int8")
    segments, info = model.transcribe(video_path, beam_size=5)
    
    # Build WebVTT
    vtt_lines = ["WEBVTT", ""]
    for i, seg in enumerate(segments):
        start = format_timestamp(seg.start)
        end = format_timestamp(seg.end)
        vtt_lines.append(f"{i+1}")
        vtt_lines.append(f"{start} --> {end}")
        vtt_lines.append(seg.text.strip())
        vtt_lines.append("")
    
    vtt_content = "\n".join(vtt_lines)
    
    # POST to MediaCMS subtitle API
    httpx.post(
        f"https://your-mediacms.com/api/v1/media/{media_id}/subtitles/",
        headers={"Authorization": "Token your-api-token"},
        json={"language": "en", "subtitles_file": vtt_content}
    )

def format_timestamp(seconds: float) -> str:
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = seconds % 60
    return f"{h:02d}:{m:02d}:{s:06.3f}"
```

### Pattern B: AzuraCast + Claude AI Playlist Curation

```python
import anthropic
import httpx

def ai_curate_playlist(station_id: str, mood: str, duration_minutes: int):
    """Use Claude to curate a radio playlist based on mood and available tracks."""
    
    # Fetch available tracks from AzuraCast
    tracks = httpx.get(
        f"https://your-azuracast.com/api/station/{station_id}/files",
        headers={"X-API-Key": "your-api-key"}
    ).json()
    
    track_list = [f"{t['title']} by {t['artist']} ({t['length']}s)" 
                  for t in tracks[:200]]
    
    client = anthropic.Anthropic()
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": f"""Select tracks for a {duration_minutes}-minute {mood} radio set.
Available tracks:
{chr(10).join(track_list)}

Return a JSON array of track titles in order, fitting within {duration_minutes} minutes total.
Ensure good flow and variety."""
        }]
    )
    
    # Parse and schedule the playlist
    import json
    selected = json.loads(response.content[0].text)
    
    # POST playlist to AzuraCast
    httpx.post(
        f"https://your-azuracast.com/api/station/{station_id}/playlists",
        headers={"X-API-Key": "your-api-key"},
        json={"name": f"AI {mood} Set", "tracks": selected}
    )
    
    return selected
```

### Pattern C: PeerTube Plugin — AI Content Moderation

```javascript
// PeerTube plugin: ai-content-moderator
// plugins/peertube-plugin-ai-moderator/main.js

async function register({ registerHook, peertubeHelpers, settingsManager }) {
  // Hook into video upload
  registerHook({
    target: 'action:api.video.updated',
    handler: async ({ video }) => {
      if (video.state !== 'published') return;
      
      const apiKey = await settingsManager.getSetting('anthropic-api-key');
      
      // Get transcript via Whisper API call
      const transcript = await transcribeVideo(video.streamingPlaylists[0]);
      
      // Moderate with Claude
      const Anthropic = require('@anthropic-ai/sdk');
      const client = new Anthropic({ apiKey });
      
      const result = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 256,
        messages: [{
          role: 'user',
          content: `Review this video transcript for policy violations. 
Reply with JSON: {"safe": boolean, "reason": "string", "confidence": 0-1}
Transcript: ${transcript.slice(0, 2000)}`
        }]
      });
      
      const moderation = JSON.parse(result.content[0].text);
      
      if (!moderation.safe && moderation.confidence > 0.85) {
        // Flag for human review
        await peertubeHelpers.videos.blacklistVideo({ videoId: video.id, reason: moderation.reason });
      }
    }
  });
}
```

### Pattern D: LTX-2 + Claude Video Script-to-Screen

```python
import anthropic
import subprocess
from pathlib import Path

def ltx2_script_to_screen(brief: str, output_dir: str, 
                            style: str = "corporate") -> list[str]:
    """Turn a creative brief into 4K video clips using LTX-2 + Claude."""
    
    claude = anthropic.Anthropic()
    
    # Step 1: Claude generates shot list from brief
    response = claude.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": f"""Turn this creative brief into LTX-2 video prompts.
Brief: {brief}
Style: {style}

Return JSON: {{"shots": [{{
    "prompt": "detailed visual description for LTX-2 (focus on lighting, movement, style)",
    "audio_prompt": "describe background audio/music for this shot",
    "duration_sec": int (5-10),
    "order": int
}}]}}

LTX-2 prompt tips: be specific about camera angle, lighting, motion speed, color grade."""
        }]
    )
    
    import json
    plan = json.loads(response.content[0].text)
    
    clips = []
    for shot in sorted(plan["shots"], key=lambda s: s["order"]):
        output_path = Path(output_dir) / f"shot_{shot['order']:02d}.mp4"
        
        # LTX-2.3 inference — generates 4K video+audio natively
        subprocess.run([
            "python", "-m", "ltx_video.inference",
            "--prompt", shot["prompt"],
            "--audio_prompt", shot["audio_prompt"],
            "--output", str(output_path),
            "--resolution", "4K",
            "--duration", str(shot["duration_sec"]),
            "--model", "ltx-2.3"
        ], check=True, cwd="/opt/LTX-2")
        
        clips.append(str(output_path))
    
    # Assemble into final video
    final_path = str(Path(output_dir) / "final.mp4")
    concat_file = Path(output_dir) / "concat.txt"
    concat_file.write_text("\n".join(f"file '{c}'" for c in clips))
    
    subprocess.run([
        "ffmpeg", "-f", "concat", "-safe", "0", "-i", str(concat_file),
        "-c:v", "copy", "-c:a", "aac", final_path
    ], check=True)
    
    return clips

# Usage
clips = ltx2_script_to_screen(
    brief="30-second product launch video for a sports brand. Energy, motion, athletes.",
    output_dir="/output/sports_campaign",
    style="high-energy cinematic"
)
```

## LATAM-Specific Platforms

| Country | Platform | License | Description |
|---------|----------|---------|-------------|
| Brazil | TV Cultura OSS stack | Mixed | Public broadcaster using open-source playout; Globo digital transformation 2018→2026 |
| Brazil | Globoplay + ge.globo | Proprietary | Simulcast + multi-angle cameras; World Cup 2026 host broadcaster; AI metadata opportunity |
| Argentina | Televisión Pública (Plex-based) | Proprietary | National platform modernizing with AI subtitles |
| Mexico | Canal Once digital stack | In-house | First Mexican broadcaster deploying AI transcription |
| Mexico | Vix+ (TelevisaUnivision) | Proprietary | ~MXN 99/month streaming; AI personalization + FAST tier opportunity |
| Regional | FAST platform builders | Apache | LATAM FAST is $152M+; open tools for free ad-supported tier |

## Build-vs-Buy Matrix

| Scenario | Build (OSS) | Time | Buy/License | Decision Driver |
|----------|------------|------|-------------|----------------|
| Auto-captions for OTT | faster-whisper + MediaCMS | 2-3 wk | Rev.ai, Verbit | Volume >100h/month → OSS wins on cost |
| Short-form content factory | OpenMontage + CogVideoX | 4-6 wk | Runway subscription | Need customization/branding → OSS |
| 4K branded content | LTX-2 + Claude | 4-6 wk | Runway Gen-3 | Apache-2.0 + no per-clip pricing → OSS |
| C2PA compliance | c2pa-python | 3-4 wk | Adobe Content Auth | Own infrastructure needed for audit trail → OSS |
| Live sports highlights | faster-whisper + Claude + ffmpeg | 3-5 wk | Magnifi AI | Volume + real-time SLA → evaluate both |
| Video dubbing (LATAM) | KrillinAI + Claude brand layer | 2-3 wk | HeyGen, ElevenLabs Dubbing | Apache-2.0, agent-native, 100+ lang → OSS wins |
| Video dubbing (offline/LGPD) | open-dubbing + Coqui | 2-3 wk | Any cloud dubbing | Data sovereignty requirement → OSS local |
| AI video generation (storyboard) | Wan 2.7 + first/last frame | 2-4 wk | Runway Gen-3 | Thinking Mode + Apache-2.0 → OSS now competitive |

---
*Globant approach: start from a working vertical platform, add AI layer on top. 2-4 week to working PoC.*
