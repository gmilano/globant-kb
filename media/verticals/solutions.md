# 🏭 Vertical Solutions — Media & Entertainment

> Real platforms to start from — fork, extend with AI, deliver to clients.
> Model: working platform + AI layer on top = faster delivery.
> Last updated: 2026-07-07

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

## LATAM-Specific Platforms

| Country | Platform | License | Description |
|---------|----------|---------|-------------|
| Brazil | TV Cultura OSS stack | Mixed | Public broadcaster using open-source playout |
| Argentina | Televisión Pública (Plex-based) | Proprietary | National platform modernizing with AI subtitles |
| Mexico | Canal Once digital stack | In-house | First Mexican broadcaster deploying AI transcription |
| Regional | FAST platform builders | Apache | LATAM FAST is $152M+; open tools for free ad-supported tier |

---
*Globant approach: start from a working vertical platform, add AI layer on top. 2-4 week to working PoC.*
