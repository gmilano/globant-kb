# 🧩 Composition Patterns — Media & Entertainment

> Concrete recipes combining real repos + agents + AI.
> Updated: 2026-07-09 (v9 — Pattern 12: YuE + DiffRhythm 2 Original Music Generation; Quick-Start Matrix updated)

## Pattern 1: AI Auto-Captioning Pipeline
**Use case**: Broadcaster or OTT platform needs ADA/EU accessibility compliance + cost reduction vs manual captioning.
**Repos**: SYSTRAN/faster-whisper + m-bain/whisperX + mediacms-io/mediacms
**Build time**: 2-3 weeks | **Cost**: ~$0/hour (GPU) vs $1.50/min manual
**License**: All MIT/BSD — clean for commercial use

```python
# End-to-end captioning pipeline
from faster_whisper import WhisperModel
import whisperx
import httpx
from pathlib import Path

class BroadcastCaptionPipeline:
    def __init__(self, hf_token: str):
        # faster-whisper for transcription (4× faster than openai/whisper)
        self.asr_model = WhisperModel("large-v3", device="cuda", compute_type="int8_float16")
        # WhisperX for word alignment + speaker diarization
        self.align_model, self.metadata = whisperx.load_align_model(
            language_code="en", device="cuda"
        )
        self.diarize_model = whisperx.DiarizationPipeline(
            use_auth_token=hf_token, device="cuda"
        )

    def process(self, audio_path: str, language: str = "en") -> dict:
        # Step 1: Transcribe
        segments, info = self.asr_model.transcribe(
            audio_path, beam_size=5, language=language
        )
        segments = list(segments)
        
        # Step 2: Align words to timestamps
        result = whisperx.align(
            [{"start": s.start, "end": s.end, "text": s.text} for s in segments],
            self.align_model, self.metadata, audio_path, device="cuda"
        )
        
        # Step 3: Diarize (who spoke when)
        diarize_segments = self.diarize_model(audio_path)
        result = whisperx.assign_word_speakers(diarize_segments, result)
        
        return self._to_webvtt(result["segments"])
    
    def _to_webvtt(self, segments: list) -> str:
        lines = ["WEBVTT", ""]
        for i, seg in enumerate(segments):
            speaker = seg.get("speaker", "SPEAKER_00")
            start = self._fmt(seg["start"])
            end = self._fmt(seg["end"])
            lines += [str(i+1), f"{start} --> {end}", 
                     f"<v {speaker}>{seg['text'].strip()}", ""]
        return "\n".join(lines)
    
    def _fmt(self, t: float) -> str:
        h, m, s = int(t//3600), int((t%3600)//60), t%60
        return f"{h:02d}:{m:02d}:{s:06.3f}"

# Usage
pipeline = BroadcastCaptionPipeline(hf_token="your-huggingface-token")
vtt = pipeline.process("broadcast_segment.mp4", language="pt")  # Portuguese for LATAM
```

**Architecture**:
```
Video file → faster-whisper (transcription) → WhisperX (word alignment + diarization)
           → WebVTT/SRT → MediaCMS subtitle API → Player
```

---

## Pattern 2: Agentic Short-Form Content Factory
**Use case**: FAST platform or social media team needs to produce 50-100 short videos/day at scale.
**Repos**: Open-Montage/OpenMontage + THUDM/CogVideo + facebookresearch/audiocraft
**Build time**: 4-6 weeks | **Cost**: ~$2-5/video (GPU) vs $200-500 human production
**License**: MIT + Apache-2.0 — clean for commercial use

```python
import anthropic
import subprocess
import json
from pathlib import Path

class ShortFormContentFactory:
    def __init__(self):
        self.claude = anthropic.Anthropic()
    
    def produce_video(self, topic: str, duration_sec: int = 60, style: str = "news") -> Path:
        # Step 1: Script generation with Claude
        script = self._generate_script(topic, duration_sec, style)
        
        # Step 2: Shot list decomposition
        shots = self._decompose_shots(script)
        
        # Step 3: Generate each shot via CogVideoX
        video_clips = []
        for shot in shots:
            clip_path = self._generate_clip(shot)
            video_clips.append(clip_path)
        
        # Step 4: Generate background music via MusicGen
        bgm_path = self._generate_bgm(style, duration_sec)
        
        # Step 5: Auto-caption with faster-whisper
        voiceover_path = self._generate_voiceover(script["narration"])
        captions = self._generate_captions(voiceover_path)
        
        # Step 6: Assemble via ffmpeg
        return self._assemble(video_clips, bgm_path, voiceover_path, captions)
    
    def _generate_script(self, topic: str, duration: int, style: str) -> dict:
        response = self.claude.messages.create(
            model="claude-sonnet-5",
            max_tokens=2048,
            messages=[{
                "role": "user",
                "content": f"""Create a {duration}s {style} video script about: {topic}
                
Return JSON with:
- narration: string (spoken text, ~{duration//4} words)
- shots: array of objects with: description (visual), duration_sec, camera_movement
- title: string
- hashtags: array"""
            }]
        )
        return json.loads(response.content[0].text)
    
    def _generate_clip(self, shot: dict) -> Path:
        # Call CogVideoX inference via subprocess or API
        output_path = Path(f"/tmp/shot_{hash(shot['description'])}.mp4")
        subprocess.run([
            "python", "-m", "inference.cli_demo",
            "--prompt", shot["description"],
            "--generate_type", "t2v",
            "--output_path", str(output_path),
            "--num_frames", str(int(shot["duration_sec"] * 8)),  # 8fps
        ], check=True, cwd="/opt/CogVideo")
        return output_path
    
    def _generate_bgm(self, style: str, duration: int) -> Path:
        from audiocraft.models import MusicGen
        model = MusicGen.get_pretrained("facebook/musicgen-small")
        model.set_generation_params(duration=duration)
        
        style_prompts = {
            "news": "professional news broadcast background music, subtle, informative",
            "social": "upbeat modern background music, energetic, trendy",
            "documentary": "cinematic orchestral background, thoughtful, building",
        }
        
        wav = model.generate([style_prompts.get(style, style_prompts["social"])])
        output = Path(f"/tmp/bgm_{style}.wav")
        import torchaudio
        torchaudio.save(str(output), wav[0].cpu(), model.sample_rate)
        return output
```

**Architecture**:
```
Topic → Claude (script) → Shot list → CogVideoX (video clips) → ffmpeg assembly
                       ↘ AudioCraft (BGM) ↗           ↑
                       ↘ Coqui TTS (voiceover) → faster-whisper (captions) ↗
```

---

## Pattern 3: Music Archive Intelligence (Source Separation + AI Tagging)
**Use case**: Music label or broadcast network with large audio archive needs searchable stems and metadata.
**Repos**: facebookresearch/demucs + facebookresearch/audiocraft + Claude API
**Build time**: 3-4 weeks | **Cost**: ~$0.10/track (GPU) + Claude API calls
**License**: Both MIT — clean for commercial use

```python
import anthropic
import subprocess
import shutil
from pathlib import Path
from faster_whisper import WhisperModel

class MusicArchiveIntelligence:
    def __init__(self):
        self.claude = anthropic.Anthropic()
        self.whisper = WhisperModel("base", device="cpu")  # for lyrics detection
    
    def process_track(self, audio_path: str) -> dict:
        audio_path = Path(audio_path)
        stems_dir = audio_path.parent / f"{audio_path.stem}_stems"
        
        # Step 1: Separate into stems with Demucs v4
        subprocess.run([
            "python", "-m", "demucs.separate",
            "-n", "htdemucs_ft",  # Hybrid Transformer Demucs fine-tuned
            "--out", str(stems_dir),
            str(audio_path)
        ], check=True)
        
        stems = {
            "vocals": stems_dir / audio_path.stem / "vocals.wav",
            "drums": stems_dir / audio_path.stem / "drums.wav",
            "bass": stems_dir / audio_path.stem / "bass.wav",
            "other": stems_dir / audio_path.stem / "other.wav",
        }
        
        # Step 2: Extract lyrics from vocals stem
        segments, _ = self.whisper.transcribe(str(stems["vocals"]))
        lyrics = " ".join(s.text for s in segments)
        
        # Step 3: AI metadata enrichment with Claude
        metadata = self._enrich_metadata(audio_path.stem, lyrics, stems)
        
        return {
            "stems": {k: str(v) for k, v in stems.items()},
            "lyrics": lyrics,
            "metadata": metadata
        }
    
    def _enrich_metadata(self, filename: str, lyrics: str, stems: dict) -> dict:
        response = self.claude.messages.create(
            model="claude-haiku-4-5-20251001",  # Fast + cheap for metadata
            max_tokens=512,
            messages=[{
                "role": "user",
                "content": f"""Analyze this music track and return JSON metadata:
Filename: {filename}
Lyrics excerpt: {lyrics[:500]}

Return JSON:
- genre: string
- mood: array of strings  
- tempo: "slow"|"medium"|"fast"|"very_fast"
- vocal_style: string
- instruments_detected: array
- sync_use_cases: array (e.g. ["sports", "travel", "news"])
- broadcast_safe: boolean (no explicit content)
- language: string"""
            }]
        )
        import json
        return json.loads(response.content[0].text)
    
    def batch_process_archive(self, archive_dir: str, max_workers: int = 4) -> list:
        from concurrent.futures import ThreadPoolExecutor
        tracks = list(Path(archive_dir).glob("*.mp3")) + \
                 list(Path(archive_dir).glob("*.wav"))
        
        results = []
        with ThreadPoolExecutor(max_workers=max_workers) as executor:
            futures = {executor.submit(self.process_track, str(t)): t for t in tracks}
            for future in futures:
                try:
                    results.append(future.result())
                except Exception as e:
                    print(f"Error processing {futures[future]}: {e}")
        return results
```

**Architecture**:
```
Audio archive → Demucs (stems) → vocals.wav → faster-whisper (lyrics)
             ↘ all stems → Claude Haiku (genre/mood/sync metadata)
             → Searchable DAM (ResourceSpace / Elasticsearch)
```

---

## Pattern 4: LATAM Localization Pipeline
**Use case**: Studio or streaming platform needs to localize English content to Portuguese + Spanish at scale.
**Repos**: SYSTRAN/faster-whisper + coqui-ai/TTS + Claude API
**Build time**: 3-4 weeks | **Cost**: ~$0.50/minute of content (vs $20-40 human dubbing)
**License**: MIT + MPL-2.0

```python
import anthropic
import torch
from TTS.api import TTS
from faster_whisper import WhisperModel
import subprocess

class LATAMLocalizationPipeline:
    SUPPORTED_LANGUAGES = {
        "pt-BR": "pt",  # Brazilian Portuguese
        "es-MX": "es",  # Mexican Spanish
        "es-AR": "es",  # Argentine Spanish
    }
    
    def __init__(self):
        self.claude = anthropic.Anthropic()
        self.whisper = WhisperModel("large-v3", device="cuda", compute_type="int8")
        # Coqui TTS with XTTS v2 for voice cloning (multilingual)
        self.tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2").to("cuda")
    
    def localize(self, video_path: str, target_language: str, 
                 reference_voice: str = None) -> str:
        # Step 1: Transcribe original
        segments, info = self.whisper.transcribe(video_path)
        transcript = [{"start": s.start, "end": s.end, "text": s.text} 
                     for s in segments]
        
        # Step 2: Translate with Claude (context-aware, idiomatic)
        translated = self._translate_segments(transcript, target_language)
        
        # Step 3: Generate dubbed audio with Coqui TTS
        dubbed_audio = self._synthesize_dub(
            translated, target_language, reference_voice, video_path
        )
        
        # Step 4: Mix dubbed audio with original video (preserving SFX/music)
        output_path = video_path.replace(".mp4", f"_{target_language}.mp4")
        subprocess.run([
            "ffmpeg", "-i", video_path, "-i", dubbed_audio,
            "-c:v", "copy", "-map", "0:v", "-map", "1:a",
            "-shortest", output_path
        ], check=True)
        
        return output_path
    
    def _translate_segments(self, segments: list, target_lang: str) -> list:
        full_text = "\n".join(
            f"[{i}] {s['text']}" for i, s in enumerate(segments)
        )
        
        lang_names = {"pt-BR": "Brazilian Portuguese", "es-MX": "Mexican Spanish"}
        
        response = self.claude.messages.create(
            model="claude-sonnet-5",
            max_tokens=4096,
            messages=[{
                "role": "user",
                "content": f"""Translate to {lang_names[target_lang]}. Preserve timing constraints — keep translations roughly the same length as originals. Use natural, idiomatic {lang_names[target_lang]} as spoken in media.

Segments:
{full_text}

Return JSON array: [{{"index": 0, "text": "translation"}}, ...]"""
            }]
        )
        
        import json
        translations = json.loads(response.content[0].text)
        
        result = segments.copy()
        for t in translations:
            result[t["index"]]["text"] = t["text"]
        return result
    
    def _synthesize_dub(self, segments: list, lang: str, 
                        ref_voice: str, original_video: str) -> str:
        import soundfile as sf
        import numpy as np
        
        # Calculate total duration from video
        import subprocess as sp
        probe = sp.run(["ffprobe", "-v", "quiet", "-print_format", "json",
                       "-show_streams", original_video], capture_output=True, text=True)
        import json
        duration = float(json.loads(probe.stdout)["streams"][0]["duration"])
        
        # Generate each segment
        audio_segments = []
        for seg in segments:
            wav = self.tts.tts(
                text=seg["text"],
                speaker_wav=ref_voice,  # Clone original speaker's voice
                language=self.SUPPORTED_LANGUAGES[lang]
            )
            audio_segments.append((seg["start"], seg["end"], wav))
        
        # Assemble into final audio at correct timestamps
        sample_rate = 24000
        output = np.zeros(int(duration * sample_rate))
        for start, end, wav in audio_segments:
            start_idx = int(start * sample_rate)
            output[start_idx:start_idx + len(wav)] = wav
        
        output_path = f"/tmp/dubbed_{lang}.wav"
        sf.write(output_path, output, sample_rate)
        return output_path
```

**Architecture**:
```
Video → faster-whisper (English transcript) → Claude (translation, idiomatic)
      → Coqui TTS XTTS v2 (voice cloning, target language) → ffmpeg (mix with video)
      → Localized video (pt-BR, es-MX, es-AR)
```

---

## Pattern 5: Broadcast Radio AI Automation
**Use case**: Radio station or podcast network needs AI-driven scheduling, live transcription, and highlight clipping.
**Repos**: AzuraCast/AzuraCast + SYSTRAN/faster-whisper + savonet/liquidsoap + Claude API
**Build time**: 3-4 weeks | **Cost**: ~$500/month infrastructure vs $3k/month manual ops
**License**: Apache-2.0 + MIT + MIT

```python
import anthropic
import httpx
import asyncio
from datetime import datetime, timedelta

class BroadcastAIController:
    def __init__(self, azuracast_url: str, azura_api_key: str):
        self.azura_url = azuracast_url
        self.azura_key = azura_api_key
        self.claude = anthropic.Anthropic()
        self.http = httpx.AsyncClient()
    
    async def schedule_ai_playlist(self, station_id: str, 
                                    time_slot: str, mood: str) -> dict:
        """Use Claude to curate a playlist for a specific time slot."""
        
        # Fetch available tracks
        tracks_response = await self.http.get(
            f"{self.azura_url}/api/station/{station_id}/files",
            headers={"X-API-Key": self.azura_key}
        )
        tracks = tracks_response.json()
        
        track_summaries = [
            f"{t['title']} - {t['artist']} ({t.get('genre', 'unknown')}, {t['length']}s)"
            for t in tracks[:300]
        ]
        
        response = self.claude.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=2048,
            messages=[{
                "role": "user",
                "content": f"""Plan a radio playlist for {time_slot} with {mood} mood.
Available tracks (select 8-12, total ~60 minutes):
{chr(10).join(track_summaries)}

Return JSON: {{"playlist": [{{"title": str, "artist": str, "reason": str}}], "intro_script": str}}
The intro_script should be a 15-second radio DJ introduction for this set."""
            }]
        )
        
        import json
        plan = json.loads(response.content[0].text)
        
        # Schedule in AzuraCast
        await self.http.post(
            f"{self.azura_url}/api/station/{station_id}/playlists",
            headers={"X-API-Key": self.azura_key},
            json={
                "name": f"AI {mood} Set - {time_slot}",
                "is_enabled": True,
                "schedule_items": [{
                    "start_time": self._time_to_minutes(time_slot),
                    "end_time": self._time_to_minutes(time_slot) + 60
                }]
            }
        )
        
        return plan
    
    async def live_transcribe_and_clip(self, stream_url: str, 
                                        output_bucket: str) -> asyncio.Task:
        """Continuously transcribe live stream and auto-clip highlights."""
        from faster_whisper import WhisperModel
        import subprocess
        
        model = WhisperModel("medium", device="cuda", compute_type="int8")
        
        async def monitor_stream():
            buffer_path = "/tmp/stream_buffer.wav"
            while True:
                # Capture 5 minutes of stream
                subprocess.run([
                    "ffmpeg", "-i", stream_url, "-t", "300",
                    "-acodec", "pcm_s16le", "-ar", "16000",
                    buffer_path, "-y"
                ], capture_output=True)
                
                # Transcribe
                segments, _ = model.transcribe(buffer_path)
                transcript = " ".join(s.text for s in segments)
                
                # Detect highlights with Claude
                highlights = self._detect_highlights(transcript)
                
                for h in highlights:
                    await self._clip_and_publish(buffer_path, h, output_bucket)
                
                await asyncio.sleep(1)  # Brief pause before next capture
        
        return asyncio.create_task(monitor_stream())
    
    def _detect_highlights(self, transcript: str) -> list:
        response = self.claude.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=512,
            messages=[{
                "role": "user",
                "content": f"""Identify highlight moments in this radio transcript for social media clips.
Transcript: {transcript}

Return JSON: [{{"start_text": str, "end_text": str, "highlight_type": "funny|news|music|interview", "social_caption": str}}]
Only return moments with genuine viral/share potential. Empty array if none."""
            }]
        )
        import json
        return json.loads(response.content[0].text)
    
    def _time_to_minutes(self, time_str: str) -> int:
        h, m = map(int, time_str.split(":"))
        return h * 60 + m
```

**Architecture**:
```
AzuraCast (radio station) ← Claude Haiku (AI playlist curator)
         ↓ live stream
faster-whisper (real-time transcription)
         ↓ transcript
Claude Haiku (highlight detection)
         ↓ clips
ffmpeg → S3/CDN (social media distribution)
```

---

## Pattern 6: AI Live Sports Highlights Pipeline
**Use case**: Sports broadcaster or rights holder needs to auto-clip key moments from live events for social media, FAST platform, and post-game packages.
**Repos**: SYSTRAN/faster-whisper + Claude API + ffmpeg + faster-whisper (for transcription) + Claude vision
**Build time**: 3-5 weeks | **Cost**: ~$0.005/event-minute (GPU + Claude) vs $2-5k/event manual
**License**: MIT + Apache-2.0 — clean for commercial use

```python
import anthropic
import subprocess
import json
import asyncio
from dataclasses import dataclass
from pathlib import Path

@dataclass
class Highlight:
    start_sec: float
    end_sec: float
    event_type: str  # "goal", "score", "foul", "interview", "celebration"
    confidence: float
    social_caption: str

class SportsHighlightPipeline:
    def __init__(self):
        self.claude = anthropic.Anthropic()
    
    def process_event(self, video_path: str, sport: str = "soccer") -> list[Highlight]:
        """Process a sports event video and extract highlights."""
        
        # Step 1: Transcribe commentary with faster-whisper
        commentary = self._transcribe_commentary(video_path)
        
        # Step 2: Identify highlight moments from commentary
        moments = self._identify_moments(commentary, sport)
        
        # Step 3: Extract and package clips
        highlights = []
        for moment in moments:
            clip_path = self._extract_clip(video_path, moment["start_sec"], moment["end_sec"])
            
            highlights.append(Highlight(
                start_sec=moment["start_sec"],
                end_sec=moment["end_sec"],
                event_type=moment["event_type"],
                confidence=moment["confidence"],
                social_caption=moment["social_caption"]
            ))
        
        return highlights
    
    def _transcribe_commentary(self, video_path: str) -> list[dict]:
        """Extract and transcribe audio commentary from video."""
        from faster_whisper import WhisperModel
        
        # Extract audio
        audio_path = "/tmp/event_audio.wav"
        subprocess.run([
            "ffmpeg", "-i", video_path, "-ac", "1", "-ar", "16000", audio_path, "-y"
        ], capture_output=True, check=True)
        
        model = WhisperModel("medium", device="cuda", compute_type="int8")
        segments, _ = model.transcribe(audio_path, beam_size=5)
        
        return [{"start": s.start, "end": s.end, "text": s.text} for s in segments]
    
    def _identify_moments(self, commentary: list[dict], sport: str) -> list[dict]:
        """Use Claude to identify key moments from commentary transcript."""
        
        # Build timestamped transcript
        transcript_text = "\n".join(
            f"[{s['start']:.1f}s] {s['text']}" for s in commentary
        )
        
        sport_moments = {
            "soccer": ["goal", "penalty", "red card", "free kick", "corner", "save", "injury time"],
            "basketball": ["dunk", "three pointer", "buzzer beater", "foul", "timeout", "block"],
            "american_football": ["touchdown", "interception", "sack", "field goal", "fumble"],
        }
        key_events = sport_moments.get(sport, ["score", "foul", "timeout", "highlight"])
        
        response = self.claude.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=2048,
            messages=[{
                "role": "user",
                "content": f"""Identify highlight moments from this {sport} commentary transcript.
Key events to find: {', '.join(key_events)}

Transcript:
{transcript_text[:8000]}

Return JSON array of highlights:
[{{
    "start_sec": float (start of highlight, -5s before the call for buildup),
    "end_sec": float (end of highlight, +3s after peak),
    "event_type": string,
    "confidence": 0.0-1.0,
    "social_caption": string (max 140 chars for social media),
    "commentary_quote": string (the exact commentary call)
}}]

Only include events with confidence >= 0.75. Return empty array if none."""
            }]
        )
        
        return json.loads(response.content[0].text)
    
    def _extract_clip(self, video_path: str, start_sec: float, end_sec: float) -> str:
        """Extract a clip from the full video using ffmpeg."""
        duration = end_sec - start_sec
        output_path = f"/tmp/highlight_{int(start_sec)}.mp4"
        
        subprocess.run([
            "ffmpeg", "-i", video_path,
            "-ss", str(max(0, start_sec)),
            "-t", str(duration + 3),  # +3s buffer
            "-c:v", "libx264", "-c:a", "aac",
            "-preset", "fast",
            output_path, "-y"
        ], check=True, capture_output=True)
        
        return output_path
    
    def generate_social_package(self, highlights: list[Highlight], 
                                 event_name: str) -> dict:
        """Generate a complete social media package from highlights."""
        
        # Sort by confidence, take top 5
        top = sorted(highlights, key=lambda h: h.confidence, reverse=True)[:5]
        
        response = self.claude.messages.create(
            model="claude-sonnet-5",
            max_tokens=1024,
            messages=[{
                "role": "user",
                "content": f"""Create a social media content package for: {event_name}

Highlights detected:
{json.dumps([{
    "event": h.event_type,
    "caption": h.social_caption,
    "start": h.start_sec
} for h in top], indent=2)}

Return JSON:
{{
    "summary_post": string (Twitter/X post, max 280 chars),
    "instagram_caption": string (max 2200 chars, hashtags included),
    "thumbnail_description": string (describe ideal thumbnail frame for AI generation),
    "top_clip_index": int (which clip index to feature as the main post)
}}"""
            }]
        )
        
        package = json.loads(response.content[0].text)
        package["clips"] = [{"start": h.start_sec, "caption": h.social_caption} 
                           for h in top]
        return package

# Usage
pipeline = SportsHighlightPipeline()
highlights = pipeline.process_event("/data/match_broadcast.mp4", sport="soccer")
print(f"Found {len(highlights)} highlights")

social = pipeline.generate_social_package(highlights, "Copa América Semifinal 2026")
print(f"Summary post: {social['summary_post']}")
```

**Architecture**:
```
Live/recorded broadcast → faster-whisper (commentary transcription)
    → Claude Haiku (moment detection from commentary text)
    → ffmpeg (clip extraction with timestamp precision)
    → Claude Sonnet 5 (social media package generator)
    → Social distribution (Instagram/TikTok/X/FAST)
```

---

## Pattern 7: C2PA Content Provenance Tagger (EU AI Act Compliance)
**Use case**: News organization, broadcaster, or studio needs to attach cryptographic provenance to all AI-generated or AI-edited media assets for EU AI Act compliance.
**Repos**: `c2pa-python` (Adobe, Apache-2.0) + Claude API
**Build time**: 3-4 weeks | **Cost**: ~$0.0001/asset (near-zero API cost)
**License**: Apache-2.0 + MIT — clean for commercial use

```python
import anthropic
import json
from pathlib import Path
from datetime import datetime, timezone

# pip install c2pa-python
# Apache-2.0 license — official C2PA Python bindings from Adobe
import c2pa

class C2PAProvenanceTagger:
    """Tags media assets with C2PA provenance manifests."""
    
    def __init__(self, org_name: str, signing_cert_path: str):
        self.org_name = org_name
        self.signing_cert = signing_cert_path
        self.claude = anthropic.Anthropic()
    
    def tag_ai_generated(self, asset_path: str, generation_params: dict) -> str:
        """Tag a fully AI-generated asset with C2PA provenance."""
        
        # Build C2PA assertion for AI-generated content
        assertion = {
            "label": "c2pa.actions",
            "data": {
                "actions": [{
                    "action": "c2pa.created",
                    "softwareAgent": {
                        "name": "Globant AI Studio",
                        "version": "1.0"
                    },
                    "parameters": {
                        "description": f"AI-generated by {self.org_name}",
                        "generationModel": generation_params.get("model", "unknown"),
                        "prompt": generation_params.get("prompt", ""),
                        "timestamp": datetime.now(timezone.utc).isoformat()
                    }
                }]
            }
        }
        
        # Build AI disclosure assertion (EU AI Act requirement)
        ai_disclosure = {
            "label": "c2pa.generative.ai.training.and.data",
            "data": {
                "technique": "generative_ai",
                "model": generation_params.get("model", "unknown"),
                "dataSources": generation_params.get("training_data", "unknown")
            }
        }
        
        # Generate metadata description with Claude
        meta_description = self._generate_metadata_description(
            asset_path, generation_params
        )
        
        # Apply C2PA manifest
        manifest_json = {
            "claim_generator": f"{self.org_name}/ai-studio",
            "title": Path(asset_path).stem,
            "assertions": [assertion, ai_disclosure],
            "credentials": [],
            "metadata": {
                "description": meta_description,
                "organization": self.org_name,
                "created": datetime.now(timezone.utc).isoformat()
            }
        }
        
        # Sign and embed manifest
        output_path = asset_path.replace(
            Path(asset_path).suffix, 
            f"_c2pa{Path(asset_path).suffix}"
        )
        
        c2pa.sign_asset(
            source=asset_path,
            dest=output_path,
            manifest=json.dumps(manifest_json),
            cert_path=self.signing_cert,
            algorithm="ps256"
        )
        
        return output_path
    
    def tag_ai_edited(self, original_path: str, edited_path: str, 
                      edit_description: str) -> str:
        """Tag an AI-edited version of a human-created asset."""
        
        assertion = {
            "label": "c2pa.actions",
            "data": {
                "actions": [{
                    "action": "c2pa.edited",
                    "softwareAgent": {
                        "name": "Globant AI Studio",
                        "version": "1.0"
                    },
                    "parameters": {
                        "description": edit_description,
                        "editType": "ai_enhanced",
                        "originalAsset": original_path,
                        "timestamp": datetime.now(timezone.utc).isoformat()
                    }
                }]
            }
        }
        
        manifest_json = {
            "claim_generator": f"{self.org_name}/ai-studio",
            "assertions": [assertion],
            "ingredients": [{"title": "original", "uri": original_path}]
        }
        
        output_path = edited_path.replace(
            Path(edited_path).suffix,
            f"_c2pa{Path(edited_path).suffix}"
        )
        
        c2pa.sign_asset(
            source=edited_path,
            dest=output_path,
            manifest=json.dumps(manifest_json),
            cert_path=self.signing_cert,
            algorithm="ps256"
        )
        
        return output_path
    
    def _generate_metadata_description(self, asset_path: str, params: dict) -> str:
        """Use Claude to generate a factual description for the C2PA manifest."""
        response = self.claude.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=256,
            messages=[{
                "role": "user",
                "content": f"""Generate a factual, 1-2 sentence description for an AI-generated media asset's C2PA provenance record.

Asset: {Path(asset_path).name}
Generation model: {params.get('model', 'unknown')}
Prompt used: {params.get('prompt', 'n/a')[:200]}
Organization: {self.org_name}

Write in third person, factual tone. Focus on what was generated and by whom. No marketing language."""
            }]
        )
        return response.content[0].text.strip()
    
    def verify_asset(self, asset_path: str) -> dict:
        """Verify the C2PA provenance of an asset."""
        try:
            manifest = c2pa.read_manifest(asset_path)
            return {
                "has_provenance": True,
                "manifest": json.loads(manifest),
                "is_ai_generated": self._check_ai_disclosure(json.loads(manifest))
            }
        except Exception:
            return {"has_provenance": False, "is_ai_generated": None}
    
    def _check_ai_disclosure(self, manifest: dict) -> bool:
        for assertion in manifest.get("assertions", []):
            if "generative.ai" in assertion.get("label", ""):
                return True
        return False

# Usage
tagger = C2PAProvenanceTagger(
    org_name="Globant Media Studio",
    signing_cert_path="/etc/certs/globant_c2pa.p12"
)

# Tag an AI-generated video
tagged = tagger.tag_ai_generated(
    asset_path="/output/product_video.mp4",
    generation_params={
        "model": "LTX-2.3",
        "prompt": "Product showcase video for new sneaker line, studio lighting",
        "training_data": "Licensed commercial video datasets"
    }
)

# Verify any asset
result = tagger.verify_asset(tagged)
print(f"Provenance verified: {result['has_provenance']}")
print(f"AI-generated: {result['is_ai_generated']}")
```

**Architecture**:
```
AI-generated asset → Claude Haiku (metadata description)
    → c2pa-python (manifest building + cryptographic signing)
    → Tagged asset with embedded C2PA manifest
    → Verification API (for newsrooms, platforms, regulators)
```

---

## Pattern 8: AI Podcast Studio (Content Library → Branded Podcast)
**Use case**: Brand, publisher, or media company wants to turn existing content (blog posts, reports, news archives) into a regular AI-produced podcast series in any language.
**Repos**: souzatharsis/podcastfy + coqui-ai/TTS + AzuraCast/AzuraCast + Claude API
**Build time**: 2-3 weeks | **Cost**: ~$0.10-0.50/episode (LLM API + TTS) vs $500-2000 human production
**License**: Apache-2.0 + MPL-2.0 + Apache-2.0

```python
import anthropic
from podcastfy.client import generate_podcast
from TTS.api import TTS
import httpx
from pathlib import Path

class BrandedPodcastStudio:
    """
    Content-to-podcast pipeline using Podcastfy + Coqui TTS.
    Input: any URL, PDF, or text content.
    Output: branded audio podcast episode ready for distribution.
    """
    
    def __init__(self, brand_name: str, language: str = "pt"):
        self.brand_name = brand_name
        self.language = language  # "pt" (Brazil), "es" (LATAM), "en"
        self.claude = anthropic.Anthropic()
        # XTTS v2 for multilingual voice cloning
        self.tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2")
    
    def produce_episode(self, content_source: str, episode_title: str,
                        reference_voice: str = None, duration: str = "short") -> dict:
        """
        Produce a complete podcast episode from a content source.
        duration: "short" (5-10 min) | "long" (25-40 min)
        """
        
        # Step 1: Generate episode outline with Claude
        outline = self._generate_outline(content_source, episode_title, duration)
        
        # Step 2: Generate podcast audio via Podcastfy
        # Podcastfy handles: content extraction → LLM script → TTS → audio
        podcast_config = {
            "word_count": 1500 if duration == "short" else 5000,
            "conversation_style": ["engaging", "informative", "professional"],
            "podcast_name": self.brand_name,
            "podcast_tagline": outline["tagline"],
            "output_language": self.language,
            "text_to_speech_model": "edge",  # Use Edge TTS for speed; swap for ElevenLabs for quality
            "creativity": 0.7,
            "user_instructions": outline["custom_instructions"]
        }
        
        audio_output = generate_podcast(
            urls=[content_source] if content_source.startswith("http") else None,
            text=content_source if not content_source.startswith("http") else None,
            conversation_config=podcast_config,
            tts_model="edge",
            longform=(duration == "long")
        )
        
        # Step 3: Generate show notes and distribution metadata
        metadata = self._generate_metadata(outline, episode_title)
        
        return {
            "audio_path": audio_output,
            "title": episode_title,
            "description": metadata["description"],
            "show_notes": metadata["show_notes"],
            "chapters": metadata["chapters"],
            "social_teaser": metadata["social_teaser"]
        }
    
    def _generate_outline(self, content: str, title: str, duration: str) -> dict:
        """Pre-process content with Claude to create a focused podcast outline."""
        response = self.claude.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=1024,
            messages=[{
                "role": "user",
                "content": f"""Create a {duration}-form podcast episode outline for: {title}
Content source: {content[:500]}...
Brand: {self.brand_name}
Language: {self.language}

Return JSON:
{{
    "tagline": "1-sentence show tagline",
    "key_points": ["point 1", "point 2", "point 3"],
    "custom_instructions": "specific tone and focus instructions for the AI hosts",
    "target_audience": "who this is for"
}}"""
            }]
        )
        import json
        return json.loads(response.content[0].text)
    
    def _generate_metadata(self, outline: dict, title: str) -> dict:
        """Generate all distribution metadata for the episode."""
        response = self.claude.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=1024,
            messages=[{
                "role": "user",
                "content": f"""Create podcast episode distribution metadata.
Episode: {title}
Brand: {self.brand_name}
Key points: {outline['key_points']}
Target audience: {outline['target_audience']}

Return JSON:
{{
    "description": "Episode description (150 words max, for podcast apps)",
    "show_notes": "Detailed show notes with timestamps placeholder (200 words max)",
    "chapters": [
        {{"time": "00:00", "title": "Introduction"}},
        {{"time": "02:00", "title": "Main Topic"}},
        {{"time": "08:00", "title": "Conclusion"}}
    ],
    "social_teaser": "Twitter/LinkedIn post (280 chars max, with relevant hashtags)"
}}"""
            }]
        )
        import json
        return json.loads(response.content[0].text)
    
    def publish_to_azuracast(self, episode: dict, station_id: str, 
                              azura_url: str, azura_key: str) -> bool:
        """Upload episode to AzuraCast for podcast/radio distribution."""
        with open(episode["audio_path"], "rb") as f:
            response = httpx.post(
                f"{azura_url}/api/station/{station_id}/files",
                headers={"X-API-Key": azura_key},
                files={"file": (f"{episode['title']}.mp3", f, "audio/mpeg")},
                data={
                    "title": episode["title"],
                    "album": self.brand_name,
                    "comments": episode["description"]
                }
            )
        return response.status_code == 200

# Usage — Brazilian Portuguese branded podcast from blog post
studio = BrandedPodcastStudio(
    brand_name="Globant Tech Insights LATAM",
    language="pt"
)

episode = studio.produce_episode(
    content_source="https://www.globant.com/stay-relevant/ai-trends-2026",
    episode_title="Tendências de AI em 2026: O que muda para empresas LATAM",
    duration="short"
)

print(f"Episode ready: {episode['audio_path']}")
print(f"Social: {episode['social_teaser']}")
```

**Architecture**:
```
Content (URL / PDF / text)
    ↓ Claude Haiku (outline + instructions)
    ↓ Podcastfy (LLM script generation + multi-turn dialogue)
    ↓ Edge TTS / Coqui XTTS v2 (voice synthesis, multilingual)
    → branded .mp3 episode
    ↓ AzuraCast (podcast feed + radio distribution)
    → Spotify / Apple Podcasts / RSS / Radio stream
```

**Why this pattern wins**:
- 2-3 week PoC vs months of manual podcast setup
- Supports Portuguese + Spanish natively (LATAM-ready)
- Podcastfy Apache-2.0 = commercial use OK
- Scales: one codebase → 10+ languages, 100+ episodes/month

---

## Pattern 9: Wan 2.7 Storyboard-to-Video (Thinking Mode + First/Last Frame)
**Use case**: Brand, agency, or studio needs to turn storyboard frames into polished video sequences with minimal prompt iteration — using Wan 2.7's reasoning-first generation.
**Repos**: Wan-Video/Wan2.2 (Wan 2.7) + Claude API
**Build time**: 2-4 weeks | **Cost**: ~$3-8/video (24GB VRAM GPU required)
**License**: Apache-2.0

```python
import anthropic
import subprocess
import base64
import json
from pathlib import Path

class Wan27StoryboardPipeline:
    """
    Converts storyboard images → polished video clips using Wan 2.7 Thinking Mode.
    Wan 2.7 reasons about composition/motion BEFORE denoising — fewer failed generations.
    First/last frame control enables direct storyboard-to-shot workflow.
    """
    
    def __init__(self, wan_model_path: str):
        self.wan_path = wan_model_path  # /opt/Wan2.2
        self.claude = anthropic.Anthropic()
    
    def storyboard_to_video(self, storyboard_frames: list[str], 
                             brief: str, output_dir: str) -> list[str]:
        """
        Convert storyboard frames to video clips.
        storyboard_frames: list of image file paths (panel 1, panel 2, ...)
        brief: creative brief / brand guidelines
        Returns: list of output clip paths in order.
        """
        clips = []
        
        # Process consecutive frame pairs as shots
        for i in range(len(storyboard_frames) - 1):
            first_frame = storyboard_frames[i]
            last_frame = storyboard_frames[i + 1]
            
            # Use Claude Vision to analyze frames and generate Wan 2.7 prompt
            wan_prompt = self._generate_wan_prompt(first_frame, last_frame, brief, i)
            
            # Generate clip with Wan 2.7 Thinking Mode + first/last frame
            clip_path = self._generate_with_frames(
                first_frame, last_frame, wan_prompt, 
                output_dir, clip_index=i
            )
            clips.append(clip_path)
        
        # Also generate a clip from the last storyboard frame alone (final shot)
        if storyboard_frames:
            final_clip = self._generate_from_frame(
                storyboard_frames[-1], brief, output_dir, 
                clip_index=len(storyboard_frames)
            )
            clips.append(final_clip)
        
        return clips
    
    def _generate_wan_prompt(self, first_frame: str, last_frame: str, 
                              brief: str, shot_index: int) -> str:
        """Use Claude Vision to analyze storyboard panels → Wan 2.7 prompt."""
        
        def encode_image(path: str) -> str:
            with open(path, "rb") as f:
                return base64.b64encode(f.read()).decode()
        
        response = self.claude.messages.create(
            model="claude-sonnet-5",
            max_tokens=1024,
            messages=[{
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": f"""You are a video director. Analyze these two storyboard panels (start and end of shot {shot_index + 1}).
Creative brief: {brief}

Generate a precise Wan 2.7 video generation prompt that:
1. Describes the MOTION connecting start frame to end frame
2. Specifies camera movement (pan, zoom, cut, hold)
3. Describes lighting, mood, and visual style
4. Is under 300 words (Wan supports 5000 chars but concise is better)
5. Uses cinematic language

Return only the prompt text, no explanation."""
                    },
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": "image/jpeg",
                            "data": encode_image(first_frame)
                        }
                    },
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": "image/jpeg",
                            "data": encode_image(last_frame)
                        }
                    }
                ]
            }]
        )
        return response.content[0].text.strip()
    
    def _generate_with_frames(self, first_frame: str, last_frame: str,
                               prompt: str, output_dir: str, clip_index: int) -> str:
        """Run Wan 2.7 with thinking mode + first/last frame control."""
        output_path = str(Path(output_dir) / f"clip_{clip_index:03d}.mp4")
        
        subprocess.run([
            "python", "generate.py",
            "--task", "i2v",                  # image-to-video
            "--size", "1080*1920",             # 1080p vertical (adjust for landscape: 1920*1080)
            "--ckpt_dir", "/models/Wan2.7-I2V-14B-480P",
            "--first_frame", first_frame,
            "--last_frame", last_frame,        # Wan 2.7: define end state
            "--thinking_mode",                 # Wan 2.7: compositional reasoning before denoising
            "--prompt", prompt,
            "--sample_steps", "50",
            "--save_file", output_path,
        ], check=True, cwd=self.wan_path)
        
        return output_path
    
    def _generate_from_frame(self, frame: str, brief: str, 
                              output_dir: str, clip_index: int) -> str:
        """Generate a clip from a single storyboard frame (text-guided motion)."""
        output_path = str(Path(output_dir) / f"clip_{clip_index:03d}.mp4")
        
        # Ask Claude for a motion prompt for this single frame
        response = self.claude.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=256,
            messages=[{"role": "user", "content": f"Generate a 1-sentence Wan 2.7 motion prompt for a video starting from this scene. Brief: {brief}. Describe realistic camera and subject motion only."}]
        )
        motion_prompt = response.content[0].text.strip()
        
        subprocess.run([
            "python", "generate.py",
            "--task", "i2v",
            "--size", "1080*1920",
            "--ckpt_dir", "/models/Wan2.7-I2V-14B-480P",
            "--first_frame", frame,
            "--thinking_mode",
            "--prompt", motion_prompt,
            "--sample_steps", "50",
            "--save_file", output_path,
        ], check=True, cwd=self.wan_path)
        
        return output_path
    
    def assemble_film(self, clips: list[str], output_path: str, 
                      add_audio: bool = True) -> str:
        """Assemble clips into final film. Wan 2.7 generates native audio per clip."""
        
        # Create ffmpeg concat file
        concat_file = "/tmp/wan_concat.txt"
        with open(concat_file, "w") as f:
            for clip in clips:
                f.write(f"file '{clip}'\n")
        
        if add_audio:
            # Wan 2.7 native audio is embedded in each clip
            subprocess.run([
                "ffmpeg", "-f", "concat", "-safe", "0", "-i", concat_file,
                "-c:v", "libx264", "-c:a", "aac", "-movflags", "+faststart",
                output_path, "-y"
            ], check=True)
        else:
            subprocess.run([
                "ffmpeg", "-f", "concat", "-safe", "0", "-i", concat_file,
                "-c:v", "libx264", "-an", output_path, "-y"
            ], check=True)
        
        return output_path

# Usage — Brand TVC from storyboard
pipeline = Wan27StoryboardPipeline(wan_model_path="/opt/Wan2.2")

storyboard = [
    "/storyboard/frame_01_product_reveal.jpg",
    "/storyboard/frame_02_lifestyle_shot.jpg",
    "/storyboard/frame_03_cta_closeup.jpg",
    "/storyboard/frame_04_end_card.jpg",
]

clips = pipeline.storyboard_to_video(
    storyboard_frames=storyboard,
    brief="Premium athletic footwear brand, energetic but aspirational, warm golden tones",
    output_dir="/output/tvc_clips/"
)

final = pipeline.assemble_film(clips, "/output/tvc_final.mp4")
print(f"TVC ready: {final}")
```

**Architecture**:
```
Storyboard panels → Claude Vision (analyze panels → Wan 2.7 prompts)
    → Wan 2.7 --thinking-mode (compositional plan → denoising)
        + --first-frame / --last-frame (storyboard-defined endpoints)
    → 1080p clips with native audio (per Wan 2.7 audio integration)
    → ffmpeg assembly → final branded video
```

**Why Thinking Mode matters**:
- Prior video models: prompt → immediate denoising (no spatial reasoning)
- Wan 2.7: prompt → reasoning step (composition? motion? intent?) → denoising
- Result: fewer failed generations per accepted clip; prompt-iteration cycles shrink
- First/last frame = storyboard panels become the generation contract, not suggestions

---

## Pattern E: KrillinAI Agentic Dubbing (LATAM Multilingual Release)
**Use case**: LATAM media company or brand needs to release content in Portuguese + Spanish simultaneously, without a translation team.
**Repos**: krillinai/KrillinAI + Claude API (brand-voice layer)
**Build time**: 2-3 weeks | **Cost**: ~$0.50/minute vs $20-40/minute human dubbing
**License**: Apache-2.0

```python
import anthropic
import subprocess
import json
from pathlib import Path

class AgenticDubbingPipeline:
    """
    KrillinAI skills/ directory = each stage is a composable agent with stable CLI contract.
    Pattern: KrillinAI handles the pipeline mechanics; Claude handles brand voice + QA.
    """
    
    LATAM_TARGETS = {
        "pt-BR": {"lang_code": "pt", "dialect": "Brazilian Portuguese", "platform": "youtube"},
        "es-MX": {"lang_code": "es", "dialect": "Mexican Spanish", "platform": "youtube"},
        "es-AR": {"lang_code": "es", "dialect": "Argentine Spanish", "platform": "tiktok"},
    }
    
    def __init__(self, krillinai_path: str = "/opt/KrillinAI"):
        self.krillinai = krillinai_path
        self.claude = anthropic.Anthropic()
    
    def dub_video(self, video_url: str, target_lang: str, 
                  brand_voice: str, output_dir: str) -> str:
        """
        Full agentic dubbing pipeline: download → transcribe → translate → TTS → reformat.
        brand_voice: brand guidelines string (tone, vocabulary, personas to avoid)
        """
        lang_config = self.LATAM_TARGETS[target_lang]
        out_path = Path(output_dir) / f"dubbed_{target_lang}.mp4"
        
        # Stage 1: KrillinAI download + transcribe (agent skill)
        transcript_path = self._run_krillinai_stage(
            ["download", "transcribe"],
            video_url=video_url,
            output_dir=str(output_dir)
        )
        
        # Stage 2: Claude brand-aware translation (replaces raw MT)
        with open(transcript_path) as f:
            raw_transcript = json.load(f)
        
        translated = self._translate_with_brand_voice(
            raw_transcript, lang_config["dialect"], brand_voice
        )
        
        # Write translated transcript for KrillinAI TTS stage
        translated_path = str(Path(output_dir) / "translated.json")
        with open(translated_path, "w") as f:
            json.dump(translated, f)
        
        # Stage 3: KrillinAI TTS + reformat + cover (agent skills)
        self._run_krillinai_stage(
            ["tts", "reformat", "cover"],
            transcript=translated_path,
            target_lang=lang_config["lang_code"],
            platform=lang_config["platform"],
            output=str(out_path)
        )
        
        return str(out_path)
    
    def _run_krillinai_stage(self, skills: list[str], **kwargs) -> str:
        """Run KrillinAI skills/ CLI — each skill has a stable contract."""
        args = ["krillinai", "skills", "run", "--skill", ",".join(skills)]
        for k, v in kwargs.items():
            args += [f"--{k.replace('_', '-')}", str(v)]
        
        result = subprocess.run(args, capture_output=True, text=True, 
                                cwd=self.krillinai, check=True)
        
        # KrillinAI skills output the result file path on stdout
        return result.stdout.strip().split("\n")[-1]
    
    def _translate_with_brand_voice(self, transcript: list[dict], 
                                     dialect: str, brand_voice: str) -> list[dict]:
        """Claude translation preserving brand voice, idioms, timing."""
        segments_text = "\n".join(
            f"[{i}|{s['start']:.2f}-{s['end']:.2f}] {s['text']}"
            for i, s in enumerate(transcript)
        )
        
        response = self.claude.messages.create(
            model="claude-sonnet-5",
            max_tokens=8096,
            messages=[{
                "role": "user",
                "content": f"""Translate these video segments to {dialect}.

Brand voice guidelines: {brand_voice}

Rules:
- Keep translations roughly the same spoken length (TTS timing constraint)
- Use natural, idiomatic {dialect} as spoken in broadcast media
- Preserve brand terminology exactly as specified in guidelines
- Maintain tone: if original is formal, stay formal; casual stays casual
- Segments format: [index|start-end] text

Segments:
{segments_text}

Return JSON: [{{"index": int, "start": float, "end": float, "text": "translation"}}]"""
            }]
        )
        
        return json.loads(response.content[0].text)
    
    def dub_channel(self, video_urls: list[str], target_langs: list[str],
                    brand_voice: str, output_dir: str) -> dict:
        """Dub an entire YouTube channel's videos in parallel."""
        from concurrent.futures import ThreadPoolExecutor
        
        results = {}
        with ThreadPoolExecutor(max_workers=4) as executor:
            futures = {}
            for url in video_urls:
                for lang in target_langs:
                    future = executor.submit(
                        self.dub_video, url, lang, brand_voice, 
                        str(Path(output_dir) / Path(url).stem / lang)
                    )
                    futures[future] = (url, lang)
            
            for future in futures:
                url, lang = futures[future]
                try:
                    results[f"{url}_{lang}"] = future.result()
                except Exception as e:
                    results[f"{url}_{lang}"] = f"ERROR: {e}"
        
        return results

# Usage — LATAM brand dubbing
pipeline = AgenticDubbingPipeline()

branded = pipeline.dub_video(
    video_url="https://youtube.com/watch?v=...",
    target_lang="pt-BR",
    brand_voice="Athletic brand, energetic but not aggressive. Avoid: 'cheap', 'discount'. Use: 'acessível', 'democratizar'. Target: 18-35 urban professionals.",
    output_dir="/output/dubbed/"
)

print(f"Dubbed: {branded}")
# Cost: ~$0.50/minute of video vs $20-40 human dubbing
```

**Architecture**:
```
Video URL → KrillinAI skill:download → KrillinAI skill:transcribe
    → Claude (brand-voice translation, {dialect})
    → KrillinAI skill:tts → KrillinAI skill:reformat → KrillinAI skill:cover
    → Platform-optimized dubbed video (YouTube/TikTok/Bilibili format)
```

**Cost comparison**:
| Method | Cost/minute | Time to 10-language dub |
|--------|------------|------------------------|
| Human dubbing studio | $20-40 | 3-6 weeks |
| KrillinAI + Claude | ~$0.50 | 2-4 hours |
| Savings | 40-80× | 10-20× faster |

---

## Pattern 10: HunyuanVideo-Foley — Automated Synchronized SFX for Short-Form Video
**Use case**: Social media platform, production studio, or content agency needs to add professional synchronized sound effects to silent AI-generated or human-shot video — without a sound designer.
**Repos**: `Tencent-Hunyuan/HunyuanVideo-Foley` + `comfy-org/comfyui` (`vantagewithai/Vantage-HunyuanFoley` node)
**Build time**: 2-3 weeks | **Cost**: ~$0.02-0.10/video clip (GPU inference)
**License**: Tencent Hunyuan Community License (permissive for most commercial use; verify EU + competitor restrictions)

```python
import anthropic
import subprocess
import json
from pathlib import Path

class FoleyAudioPipeline:
    """
    HunyuanVideo-Foley: video + text prompt → synchronized 48kHz foley audio.
    One-step: no manual SFX library lookup, no timeline editing.
    Best for: AI-generated video clips, social shorts, product demos, FAST content.
    """
    
    def __init__(self, hunyuan_foley_path: str):
        self.foley_path = hunyuan_foley_path  # /opt/HunyuanVideo-Foley
        self.claude = anthropic.Anthropic()
    
    def generate_foley(self, video_path: str, sfx_hint: str = None) -> str:
        """
        Generate synchronized foley audio for a video clip.
        sfx_hint: optional text guidance (e.g. "busy city street with crowd noise")
        Returns: path to video with embedded foley audio
        """
        
        # Step 1: Auto-describe the video with Claude Vision if no hint given
        if not sfx_hint:
            sfx_hint = self._describe_for_foley(video_path)
        
        # Step 2: Run HunyuanVideo-Foley inference
        output_path = video_path.replace(".mp4", "_foley.mp4")
        subprocess.run([
            "python", "inference.py",
            "--video_path", video_path,
            "--text_prompt", sfx_hint,
            "--output_path", output_path,
            "--model_size", "XL",   # XL for best quality; base for speed
            "--sample_rate", "48000",
            "--device", "cuda"
        ], check=True, cwd=self.foley_path)
        
        return output_path
    
    def _describe_for_foley(self, video_path: str) -> str:
        """Use Claude to generate a foley-optimized description of video content."""
        
        # Extract first frame for vision analysis
        frame_path = "/tmp/foley_frame.jpg"
        subprocess.run([
            "ffmpeg", "-i", video_path, "-vframes", "1",
            "-ss", "00:00:01", frame_path, "-y"
        ], capture_output=True, check=True)
        
        with open(frame_path, "rb") as f:
            import base64
            frame_b64 = base64.standard_b64encode(f.read()).decode()
        
        response = self.claude.messages.create(
            model="claude-haiku-4-5-20251001",  # Fast + cheap for scene description
            max_tokens=256,
            messages=[{
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {"type": "base64", "media_type": "image/jpeg", "data": frame_b64}
                    },
                    {
                        "type": "text",
                        "text": """Describe the sound environment for this video frame for AI foley audio generation.
Focus ONLY on: ambient sounds, object sounds, character sounds, environmental audio.
Be specific. Example: "footsteps on wooden floor, rain on window, distant traffic, paper rustling"
Max 30 words. Do not describe visuals, only what should be HEARD."""
                    }
                ]
            }]
        )
        
        return response.content[0].text.strip()
    
    def batch_process(self, video_dir: str, output_dir: str, 
                      scene_hints: dict = None) -> list[str]:
        """
        Process a batch of video clips (e.g. AI-generated short-form content).
        scene_hints: dict mapping filename → sfx hint. Auto-describes if not provided.
        """
        from concurrent.futures import ThreadPoolExecutor
        
        videos = list(Path(video_dir).glob("*.mp4"))
        Path(output_dir).mkdir(exist_ok=True)
        
        results = []
        with ThreadPoolExecutor(max_workers=2) as executor:  # 2 concurrent GPU jobs
            futures = {}
            for video in videos:
                hint = (scene_hints or {}).get(video.name)
                futures[executor.submit(self.generate_foley, str(video), hint)] = video
            
            for future in futures:
                try:
                    result_path = future.result()
                    # Move to output dir
                    final_path = Path(output_dir) / Path(result_path).name
                    Path(result_path).rename(final_path)
                    results.append(str(final_path))
                    print(f"✓ {futures[future].name} → {final_path.name}")
                except Exception as e:
                    print(f"✗ {futures[future].name}: {e}")
        
        return results

# Usage — FAST platform short-form content pipeline
pipeline = FoleyAudioPipeline("/opt/HunyuanVideo-Foley")

# Single clip with auto-described foley
output = pipeline.generate_foley(
    video_path="/content/ai_generated_product_shot.mp4",
    sfx_hint=None  # Claude Vision will auto-describe
)

# Batch for AI-generated content factory output
results = pipeline.batch_process(
    video_dir="/content/factory_output/",
    output_dir="/content/factory_with_audio/",
    scene_hints={
        "urban_scene.mp4": "city street ambient, traffic, pedestrian crowd",
        "kitchen_scene.mp4": "cooking sounds, sizzling, clattering utensils",
        "forest_walk.mp4": "birds, wind through trees, footsteps on leaves"
    }
)
print(f"Processed {len(results)} clips with synchronized foley")
```

**Architecture**:
```
Silent video clip → Claude Vision (auto-describe sound environment)
    ↓ sfx_hint text
HunyuanVideo-Foley (multimodal diffusion: video + text → 48kHz audio)
    → video with synchronized foley audio embedded
    → [optional] ffmpeg: merge into master delivery file
```

**Why HunyuanVideo-Foley matters for Pattern 2 (Content Factory)**:
- Pattern 2 uses `AudioCraft/MusicGen` for background music — but BGM ≠ foley
- Foley = synchronized SFX that match on-screen action (footsteps, impacts, ambient sound)
- This pattern upgrades Pattern 2: after CogVideoX/Wan 2.7 generates the video clip, Foley adds synchronized audio before the final assembly step
- For short-form content (social, FAST) this eliminates the dedicated sound designer role

**Integration with Pattern 2 (upgrade)**:
```python
# In Pattern 2 produce_video(), after _generate_clip() for each shot:
clip_with_foley = foley_pipeline.generate_foley(clip_path)  # Add Foley step
video_clips.append(clip_with_foley)  # ← was clip_path before
```

---

## Pattern 11: Interactive CTV Engagement Layer (Open-Source Versus AI Alternative)
**Use case**: Sports broadcaster, FAST platform, or regional media group wants real-time AI-generated interactive experiences (trivia, predictions, polls, games) that viewers engage with via mobile while watching live content — the open-source equivalent of Versus AI.
**Repos**: `owncast/owncast` (MIT) + Claude API + Redis (open) + `comfy-org/comfyui` (optional: live visual overlays)
**Build time**: 4-6 weeks | **Cost**: ~$500-1,500/month infra + $0.003/interactive session (Claude API)
**License**: MIT + Apache-2.0 — clean for commercial use

```python
import anthropic
import asyncio
import json
import redis.asyncio as aioredis
from dataclasses import dataclass, asdict
from datetime import datetime

@dataclass
class InteractiveEvent:
    event_id: str
    event_type: str  # "trivia", "prediction", "poll", "challenge"
    question: str
    options: list[str]
    correct_answer: str | None
    sport_context: str
    expires_at: float  # timestamp

class InteractiveCTVEngine:
    """
    Real-time AI engagement overlay for live sports/streaming.
    Pattern: Claude generates contextual games from live event metadata → 
             Redis pub/sub pushes to mobile clients → WebSocket delivers to app.
    
    Inspired by Versus AI (stealth → public Jul 2026: Disney+/HBO/NFL partner).
    Built on open-source components only.
    """
    
    def __init__(self, redis_url: str = "redis://localhost:6379"):
        self.claude = anthropic.Anthropic()
        self.redis = aioredis.from_url(redis_url)
    
    async def process_game_event(self, event_metadata: dict) -> InteractiveEvent:
        """
        Given live game event metadata, generate an interactive engagement moment.
        event_metadata: {"sport": "soccer", "event": "goal", "team": "Flamengo", 
                          "minute": 73, "score": "2-1", "player": "Gabigol"}
        """
        
        event_type = self._select_event_type(event_metadata)
        
        response = self.claude.messages.create(
            model="claude-haiku-4-5-20251001",  # Fast (<1s) for real-time
            max_tokens=512,
            messages=[{
                "role": "user",
                "content": f"""Generate an interactive {event_type} for fans watching this live moment.

Game context: {json.dumps(event_metadata)}
Event type to generate: {event_type}

Return JSON:
{{
    "question": "string (max 100 chars, engaging, present-tense for live feel)",
    "options": ["A", "B", "C", "D"],
    "correct_answer": "option text or null if poll/prediction",
    "difficulty": "easy|medium|hard",
    "time_limit_seconds": 15
}}

Guidelines:
- Trivia: historical facts about teams/players ("Gabigol's career goals?")
- Prediction: what happens next ("Will Flamengo score again before 90'?")  
- Poll: fan opinion ("Man of the match so far?")
- Portuguese if LATAM event, English otherwise."""
            }]
        )
        
        data = json.loads(response.content[0].text)
        
        event = InteractiveEvent(
            event_id=f"{event_metadata.get('sport')}_{int(asyncio.get_event_loop().time())}",
            event_type=event_type,
            question=data["question"],
            options=data["options"],
            correct_answer=data.get("correct_answer"),
            sport_context=f"{event_metadata.get('sport')} {event_metadata.get('event')}",
            expires_at=asyncio.get_event_loop().time() + data.get("time_limit_seconds", 15)
        )
        
        # Push to all connected mobile clients via Redis pub/sub
        await self.redis.publish(
            f"ctv:events:{event_metadata.get('stream_id', 'main')}",
            json.dumps(asdict(event))
        )
        
        return event
    
    async def submit_answer(self, event_id: str, viewer_id: str, 
                             answer: str) -> dict:
        """Record viewer answer and update leaderboard."""
        
        # Store answer in Redis (auto-expire after 24h)
        await self.redis.hset(f"answers:{event_id}", viewer_id, answer)
        await self.redis.expire(f"answers:{event_id}", 86400)
        
        # Update leaderboard (sorted set by score)
        event_data_raw = await self.redis.get(f"event:{event_id}")
        if event_data_raw:
            event_data = json.loads(event_data_raw)
            is_correct = answer == event_data.get("correct_answer")
            if is_correct:
                await self.redis.zincrby(f"leaderboard:{event_id[:8]}", 10, viewer_id)
            return {"correct": is_correct, "points_earned": 10 if is_correct else 0}
        
        return {"correct": None, "points_earned": 0}
    
    def _select_event_type(self, metadata: dict) -> str:
        """Select engagement type based on game event."""
        event = metadata.get("event", "")
        EVENT_TYPE_MAP = {
            "goal": "trivia",         # Goal → player history trivia
            "halftime": "prediction", # Break → predict second half
            "foul": "poll",           # Controversial → fan opinion
            "substitution": "trivia", # Player swap → roster knowledge
            "kickoff": "prediction",  # Match start → score prediction
        }
        return EVENT_TYPE_MAP.get(event, "poll")

# Usage — LATAM soccer broadcast
async def main():
    engine = InteractiveCTVEngine()
    
    # Triggered by sports data feed (Sportradar, Stats Perform, etc.)
    goal_event = {
        "stream_id": "copa_latam_semifinal",
        "sport": "soccer", 
        "event": "goal",
        "team": "Flamengo",
        "player": "Gabigol",
        "minute": 73,
        "score": "2-1",
        "competition": "Copa Libertadores"
    }
    
    interactive = await engine.process_game_event(goal_event)
    print(f"Question pushed to {interactive.event_id} viewers:")
    print(f"  '{interactive.question}'")
    print(f"  Options: {interactive.options}")
    # → Fans receive in <500ms via WebSocket → tap answer → see leaderboard

asyncio.run(main())
```

**Architecture**:
```
Live sports data feed (Sportradar / XML / manual trigger)
    ↓ game event (goal, halftime, foul, etc.)
Claude Haiku (<1s) → contextual question/trivia/prediction in Portuguese/Spanish
    ↓ JSON event object
Redis pub/sub → WebSocket server → Mobile companion app (React Native / Flutter)
    ↓ viewer answers (tap in app)
Redis sorted set (leaderboard) → real-time ranking update
    ↓ prizes / badges (integrate with client loyalty platform)
[Optional] ComfyUI node → visual overlay on stream (scoreboard, timer countdown)
```

**Market context**:
- Versus AI's approach (Disney+/HBO/NFL) is closed and proprietary
- This pattern delivers the same product category on open infrastructure
- Global CTV ad spend: $42B+ (2026); interactive converts 5× standard
- LATAM fit: Brazil soccer + Mexico Liga MX have highest mobile viewing rates in region
- Add shoppable layer: Claude generates product recommendations tied to team/player context

**Globant angle**: 4-6 week PoC for any LATAM sports rights holder or FAST platform. Build the mobile app + Claude engine + Redis backbone. First client success story → productize as a platform offering.

---

## Pattern 12: Zero-License-Cost Original Music Factory (YuE + DiffRhythm 2)
**Use case**: Content agency, FAST platform, or brand needs original music for high-volume short-form content — eliminating sync licensing fees ($500-$5k/track) with Apache-2.0 AI-generated music.
**Repos**: multimodal-art-projection/YuE + ASLP-lab/DiffRhythm2 + facebookresearch/demucs + Claude API
**Build time**: 2-3 weeks | **Cost**: ~$0.05-0.20/track (GPU) vs $500-5000 sync license
**License**: Apache-2.0 (YuE) + Apache-2.0 (DiffRhythm 2) + MIT (Demucs) — all clean for commercial use

```python
import anthropic
import subprocess
import json
from pathlib import Path

class OriginalMusicFactory:
    """
    Generates zero-cost original music for branded content.
    Two modes: 
    - Quality (YuE): autoregressive, best for hero campaigns, supports lyrics
    - Speed (DiffRhythm 2): Block Flow Matching, best for volume (100+ tracks/day)
    
    Output: original tracks with 100% owned IP — no sync licensing, no royalties.
    """
    
    def __init__(self):
        self.claude = anthropic.Anthropic()
        # YuE model path (download from multimodal-art-projection/YuE HuggingFace)
        self.yue_path = "/opt/YuE"
        # DiffRhythm 2 model path
        self.diffrhythm_path = "/opt/DiffRhythm2"
        self.demucs_available = True
    
    def generate_track(
        self,
        brief: str,
        duration_sec: int = 30,
        mode: str = "quality",  # "quality" (YuE) or "speed" (DiffRhythm 2)
        with_lyrics: bool = False,
        language: str = "en",  # "en", "pt", "es"
        output_dir: str = "/output/music"
    ) -> dict:
        """
        Generate an original music track from a creative brief.
        Returns: {track_path, instrumental_path, metadata}
        """
        
        Path(output_dir).mkdir(parents=True, exist_ok=True)
        
        # Step 1: Claude generates music brief → structured generation prompt
        music_plan = self._plan_music(brief, duration_sec, with_lyrics, language)
        
        # Step 2: Generate music
        if mode == "quality" and with_lyrics:
            # YuE: lyrics → full song with vocals (quality mode)
            track_path = self._generate_yue(
                music_plan["lyrics"],
                music_plan["style_prompt"],
                duration_sec,
                output_dir,
                language
            )
        elif mode == "quality":
            # YuE: style-conditioned instrumental
            track_path = self._generate_yue(
                None,  # No lyrics = instrumental
                music_plan["style_prompt"],
                duration_sec,
                output_dir,
                language
            )
        else:
            # DiffRhythm 2: fast generation for high volume
            track_path = self._generate_diffrhythm(
                music_plan["audio_description"],
                duration_sec,
                output_dir
            )
        
        # Step 3: Extract instrumental stem with Demucs (if has vocals)
        instrumental_path = None
        if with_lyrics and mode == "quality" and self.demucs_available:
            instrumental_path = self._extract_instrumental(track_path, output_dir)
        
        return {
            "track_path": track_path,
            "instrumental_path": instrumental_path or track_path,
            "metadata": music_plan,
            "license": "Apache-2.0 (original composition, no sync license needed)",
            "ip_owner": "client"
        }
    
    def _plan_music(self, brief: str, duration: int, 
                    with_lyrics: bool, language: str) -> dict:
        """Claude generates a structured music generation plan from creative brief."""
        
        lang_names = {"en": "English", "pt": "Brazilian Portuguese", "es": "Latin American Spanish"}
        lang_label = lang_names.get(language, "English")
        
        prompt = f"""You are a music producer. Create a structured music generation plan.

Creative brief: {brief}
Target duration: {duration} seconds
Has vocals/lyrics: {with_lyrics}
Language: {lang_label}

Return JSON:
{{
    "genre": "specific genre (e.g. 'tropical funk', 'samba-electro', 'upbeat pop')",
    "mood": "3-5 descriptive words",
    "tempo": "BPM estimate",
    "instruments": ["list", "of", "key", "instruments"],
    "style_prompt": "YuE style description — 50 words max, describe instrumentation + mood + tempo + genre",
    "audio_description": "DiffRhythm/AudioCraft description — 30 words, focus on sonic characteristics",
    "lyrics": {"verses": ["verse text if with_lyrics else null"], "chorus": "chorus text if with_lyrics else null"},
    "use_cases": ["ideal video types this track fits"],
    "brand_notes": "how this music serves the brief"
}}"""
        
        response = self.claude.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=1024,
            messages=[{"role": "user", "content": prompt}]
        )
        
        return json.loads(response.content[0].text)
    
    def _generate_yue(self, lyrics: dict | None, style_prompt: str, 
                      duration: int, output_dir: str, language: str) -> str:
        """Generate full-length song with YuE (supports vocals + lyrics)."""
        
        output_path = str(Path(output_dir) / f"yue_track_{hash(style_prompt) % 100000}.mp3")
        
        # Write lyrics to temp file if provided
        lyric_args = []
        if lyrics:
            lyric_file = "/tmp/yue_lyrics.json"
            with open(lyric_file, "w") as f:
                json.dump(lyrics, f)
            lyric_args = ["--lyrics_file", lyric_file, "--language", language]
        
        subprocess.run([
            "python", "inference/infer.py",
            "--style_prompt", style_prompt,
            "--output_path", output_path,
            "--duration", str(duration),
            "--model", "YuE-s2-s",  # s2-s = balanced quality/speed
            "--genres", style_prompt,
            *lyric_args
        ], check=True, cwd=self.yue_path, timeout=300)
        
        return output_path
    
    def _generate_diffrhythm(self, audio_description: str, 
                              duration: int, output_dir: str) -> str:
        """Generate track with DiffRhythm 2 (fast Block Flow Matching)."""
        
        output_path = str(Path(output_dir) / f"dr2_track_{hash(audio_description) % 100000}.mp3")
        
        subprocess.run([
            "python", "inference.py",
            "--prompt", audio_description,
            "--duration", str(duration),
            "--output_path", output_path,
            "--device", "cuda"
        ], check=True, cwd=self.diffrhythm_path, timeout=120)
        
        return output_path
    
    def _extract_instrumental(self, track_path: str, output_dir: str) -> str:
        """Use Demucs to extract instrumental (remove vocals) for clean BGM use."""
        
        # Demucs separates into stems/htdemucs_ft/<track_name>/
        subprocess.run([
            "python", "-m", "demucs.separate",
            "-n", "htdemucs_ft",
            "--out", output_dir,
            track_path
        ], check=True, timeout=120)
        
        track_name = Path(track_path).stem
        instrumental = Path(output_dir) / "htdemucs_ft" / track_name / "no_vocals.mp4"
        
        if not instrumental.exists():
            # Compose from non-vocal stems
            drums = Path(output_dir) / "htdemucs_ft" / track_name / "drums.wav"
            bass = Path(output_dir) / "htdemucs_ft" / track_name / "bass.wav"
            other = Path(output_dir) / "htdemucs_ft" / track_name / "other.wav"
            
            instrumental_wav = str(Path(output_dir) / f"{track_name}_instrumental.wav")
            subprocess.run([
                "ffmpeg",
                "-i", str(drums), "-i", str(bass), "-i", str(other),
                "-filter_complex", "amix=inputs=3:duration=longest",
                instrumental_wav, "-y"
            ], check=True)
            return instrumental_wav
        
        return str(instrumental)
    
    def batch_generate(
        self,
        briefs: list[dict],
        mode: str = "speed",  # speed for volume; quality for hero pieces
        output_dir: str = "/output/music_batch"
    ) -> list[dict]:
        """Generate multiple tracks in parallel for content factories."""
        from concurrent.futures import ThreadPoolExecutor
        
        results = []
        with ThreadPoolExecutor(max_workers=3) as executor:  # 3 concurrent GPU jobs
            futures = {
                executor.submit(
                    self.generate_track,
                    b["brief"],
                    b.get("duration_sec", 30),
                    mode,
                    b.get("with_lyrics", False),
                    b.get("language", "en"),
                    output_dir
                ): b for b in briefs
            }
            for future in futures:
                try:
                    result = future.result()
                    result["brief"] = futures[future]["brief"]
                    results.append(result)
                    print(f"✓ Generated: {Path(result['track_path']).name}")
                except Exception as e:
                    print(f"✗ Failed: {futures[future]['brief'][:50]}: {e}")
        
        return results

# Usage 1 — Single brand track (quality mode with lyrics)
factory = OriginalMusicFactory()

hero_track = factory.generate_track(
    brief="Upbeat Brazilian funk-pop for a sports brand campaign. Energy, celebration, community. LATAM youth audience 18-30.",
    duration_sec=30,
    mode="quality",
    with_lyrics=True,
    language="pt",  # Brazilian Portuguese lyrics
    output_dir="/output/brand_campaign"
)
print(f"Track: {hero_track['track_path']}")
print(f"Instrumental: {hero_track['instrumental_path']}")
print(f"IP: {hero_track['ip_owner']} — {hero_track['license']}")

# Usage 2 — Batch for AI content factory (high-volume, speed mode)
daily_tracks = factory.batch_generate(
    briefs=[
        {"brief": "Energetic 30s news intro", "duration_sec": 30, "language": "pt"},
        {"brief": "Calm corporate background", "duration_sec": 60, "language": "en"},
        {"brief": "Tropical upbeat social clip", "duration_sec": 15, "language": "es"},
        {"brief": "Dramatic sports highlight sting", "duration_sec": 10, "language": "en"},
        {"brief": "Podcast intro jingle, professional", "duration_sec": 10, "language": "pt"},
    ],
    mode="speed",  # DiffRhythm 2 for volume
    output_dir="/output/daily_music_batch"
)
print(f"Generated {len(daily_tracks)} original tracks — $0 in sync licensing")
```

**Architecture**:
```
Creative brief → Claude Haiku (music plan: genre/mood/style/lyrics)
    ↓
YuE (quality: vocals + accompaniment from lyrics) 
    OR DiffRhythm 2 (speed: Block Flow Matching, parallel, 3× faster)
    → full-length original track
    ↓ (if vocals present)
Demucs (stem separation: extract no_vocals for BGM)
    → instrumental.wav
    ↓
ffmpeg → embed in video (Pattern 2 content factory, Pattern 6 sports highlights)
```

**Why this beats AudioCraft for full-song use cases**:
| Capability | AudioCraft/MusicGen | YuE | DiffRhythm 2 |
|------------|--------------------|----|--------------|
| Full song with vocals | ✗ | ✓ | ✓ |
| Duration | 30-120s max | Minutes | Minutes |
| Lyrics input | ✗ | ✓ (lyrics2song) | ✗ |
| Speed | Medium | Slower (autoregressive) | Fast (parallel blocks) |
| License | MIT (code) + CC-BY-NC (models) | Apache-2.0 | Apache-2.0 |
| LATAM language support | Limited | pt-BR, es ✓ | Limited |

**Cost comparison**:
| Approach | Cost per track | IP ownership | Volume limit |
|----------|--------------|--------------|-------------|
| Sync licensing | $500-$5,000 | Rights holder | Per use |
| YuE + GPU | ~$0.10-0.20 | Client (100%) | Unlimited |
| DiffRhythm 2 + GPU | ~$0.05-0.10 | Client (100%) | Unlimited |
| Suno / Udio API | ~$0.10-0.50 | Vendor ToS | API rate limits |

**Integration with Pattern 2** (Content Factory upgrade):
```python
# In Pattern 2 produce_video(), replace _generate_bgm() with:
music_factory = OriginalMusicFactory()
track = music_factory.generate_track(
    brief=f"{style} background music for {topic} video",
    duration_sec=duration_sec,
    mode="speed",  # High-volume: use DiffRhythm 2
    with_lyrics=False
)
bgm_path = track["instrumental_path"]
# ← was: model.generate([style_prompts.get(style)]) — now 0 sync licensing cost
```

---

## Quick-Start Matrix

| Client Type | Best Pattern | Time | Stack | Cost/Month |
|-------------|-------------|------|-------|------------|
| **OTT / Broadcaster** | Pattern 1 (Auto-Captions) | 2-3 wk | faster-whisper + WhisperX + MediaCMS | $200-500 GPU |
| **FAST Platform** | Pattern 2 (Content Factory) | 4-6 wk | OpenMontage + CogVideoX + AudioCraft | $500-1k GPU |
| **Music Label** | Pattern 3 (Archive Intelligence) | 3-4 wk | Demucs + Claude Haiku + ResourceSpace | $300-700 GPU |
| **Studio (LATAM expansion)** | Pattern 4 (Localization) | 3-4 wk | WhisperX + Coqui TTS + Claude | $400-800 GPU |
| **Radio Station** | Pattern 5 (Radio AI) | 3-4 wk | AzuraCast + faster-whisper + Claude | $200-400 cloud |
| **Social / Creator Platform** | Pattern 2 (Content Factory) | 4-6 wk | OpenMontage + ViMax | $500-1k GPU |
| **Sports Broadcaster** | Pattern 6 (Live Sports Highlights) | 3-5 wk | faster-whisper + Claude Haiku + ffmpeg | $200-400/event |
| **News Org / Broadcaster (compliance)** | Pattern 7 (C2PA Provenance) | 3-4 wk | c2pa-python + Claude Haiku | $100-300 infra |
| **Brand / Publisher (content → podcast)** | Pattern 8 (AI Podcast Studio) | 2-3 wk | Podcastfy + Coqui TTS + AzuraCast | $200-400 API |
| **Film / Ad Agency (storyboard)** | Pattern 9 (Wan 2.7 Storyboard) | 2-4 wk | Wan 2.7 + Claude Vision | $400-800 GPU |
| **LATAM Dubbing / Localization** | Pattern E (KrillinAI Agentic Dubbing) | 2-3 wk | KrillinAI + Claude brand layer | $200-400 API |
| **Branded Content / Agency** | Pattern 2+6 (Studio+Highlights) | 6-8 wk | LTX-2 + OpenMontage + Claude | $800-2k GPU |
| **Short-Form / AI Content Platform (SFX)** | Pattern 10 (HunyuanVideo-Foley) | 2-3 wk | HunyuanVideo-Foley + Claude Vision | $300-600 GPU |
| **Sports Broadcaster / FAST (interactive)** | Pattern 11 (Interactive CTV) | 4-6 wk | Owncast + Claude Haiku + Redis | $500-1.5k/mo infra |
| **Agency / Creator Platform (zero-license music)** | Pattern 12 (Original Music Factory) | 2-3 wk | YuE + DiffRhythm 2 + Claude + Demucs | $200-400 GPU; $0 sync licensing |

---
*All patterns use MIT/Apache-2.0/MPL-2.0 licenses unless noted. Globant delivery estimates include deployment + testing.*
