# 🧩 Composition Patterns — Media & Entertainment

> Concrete recipes combining real repos + agents + AI.
> Updated: 2026-07-07 (fifth pass — Pattern 8: AI Podcast Studio added)

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
| **Branded Content / Agency** | Pattern 2+6 (Studio+Highlights) | 6-8 wk | LTX-2 + OpenMontage + Claude | $800-2k GPU |

---
*All patterns use MIT/Apache-2.0/MPL-2.0 licenses unless noted. Globant delivery estimates include deployment + testing.*
