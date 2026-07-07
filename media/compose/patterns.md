# 🧩 Composition Patterns — Media & Entertainment

> Concrete recipes combining real repos + agents + AI.
> Updated: 2026-07-07

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

## Quick-Start Matrix

| Client Type | Best Pattern | Time | Stack | Cost/Month |
|-------------|-------------|------|-------|------------|
| **OTT / Broadcaster** | Pattern 1 (Auto-Captions) | 2-3 wk | faster-whisper + WhisperX + MediaCMS | $200-500 GPU |
| **FAST Platform** | Pattern 2 (Content Factory) | 4-6 wk | OpenMontage + CogVideoX + AudioCraft | $500-1k GPU |
| **Music Label** | Pattern 3 (Archive Intelligence) | 3-4 wk | Demucs + Claude Haiku + ResourceSpace | $300-700 GPU |
| **Studio (LATAM expansion)** | Pattern 4 (Localization) | 3-4 wk | WhisperX + Coqui TTS + Claude | $400-800 GPU |
| **Radio Station** | Pattern 5 (Radio AI) | 3-4 wk | AzuraCast + faster-whisper + Claude | $200-400 cloud |
| **Social / Creator Platform** | Pattern 2 (Content Factory) | 4-6 wk | OpenMontage + ViMax | $500-1k GPU |

---
*All patterns use MIT/Apache-2.0/MPL-2.0 licenses unless noted. Globant delivery estimates include deployment + testing.*
