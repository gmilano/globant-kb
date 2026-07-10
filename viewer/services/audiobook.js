// audiobook.js — Convert a KB book to an MP3 audiobook via ElevenLabs TTS.
//
// Uses ElevenLabs for higher quality voices. Falls back to OpenAI TTS if
// ELEVENLABS_API_KEY is not set.
//
// Pipeline:
//   1. Load book JSON (title, subtitle, chapters)
//   2. Build chapter scripts
//   3. Stream each chapter through ElevenLabs TTS (model: eleven_multilingual_v2)
//   4. Concatenate with ffmpeg into a single MP3
//   5. Save to raw/books/<slug>/<slug>.mp3

import path from 'path';
import fs from 'fs/promises';
import { existsSync, createWriteStream } from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const KB_ROOT    = path.resolve(__dirname, '..', '..');
const BOOKS_DIR  = path.join(KB_ROOT, 'raw', 'books');

// ElevenLabs voice IDs — good defaults
const ELEVEN_VOICES = {
  'nova':    'pNInz6obpgDQGcFmaJgB',  // Adam — warm, clear
  'onyx':    'VR6AewLTigWG4xSOukaG',  // Arnold — deep
  'shimmer': 'EXAVITQu4vr4xnSDxMaL',  // Bella — warm female
  'alloy':   'ErXwobaYiN019PkySvjV',  // Antoni — natural
  default:   'pNInz6obpgDQGcFmaJgB',  // Adam
};

function getApiKey() {
  return process.env.ELEVENLABS_API_KEY || process.env.XI_API_KEY || '';
}

function getOpenAIKey() {
  return process.env.OPENAI_API_KEY || '';
}

// ── TTS via ElevenLabs ─────────────────────────────────────────────────────

async function ttsElevenLabs(text, outputPath, voice = 'nova') {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('ELEVENLABS_API_KEY not set');

  const voiceId = ELEVEN_VOICES[voice] || ELEVEN_VOICES.default;
  const body = JSON.stringify({
    text: text.slice(0, 5000),
    model_id: 'eleven_multilingual_v2',
    voice_settings: { stability: 0.5, similarity_boost: 0.75 },
  });

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: 'api.elevenlabs.io',
        path: `/v1/text-to-speech/${voiceId}`,
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg',
          'Content-Length': Buffer.byteLength(body),
        },
      },
      (res) => {
        if (res.statusCode !== 200) {
          let err = '';
          res.on('data', d => (err += d));
          res.on('end', () => reject(new Error(`ElevenLabs error ${res.statusCode}: ${err}`)));
          return;
        }
        const out = createWriteStream(outputPath);
        res.pipe(out);
        out.on('finish', resolve);
        out.on('error', reject);
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ── TTS via OpenAI (fallback) ──────────────────────────────────────────────

async function ttsOpenAI(text, outputPath, voice = 'nova') {
  const apiKey = getOpenAIKey();
  if (!apiKey) throw new Error('OPENAI_API_KEY not set');

  const body = JSON.stringify({ model: 'tts-1', voice, input: text.slice(0, 4096), response_format: 'mp3' });

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: 'api.openai.com',
        path: '/v1/audio/speech',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
        },
      },
      (res) => {
        if (res.statusCode !== 200) {
          let err = '';
          res.on('data', d => (err += d));
          res.on('end', () => reject(new Error(`OpenAI TTS error ${res.statusCode}: ${err}`)));
          return;
        }
        const out = createWriteStream(outputPath);
        res.pipe(out);
        out.on('finish', resolve);
        out.on('error', reject);
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function tts(text, outputPath, voice = 'nova') {
  // Prefer ElevenLabs, fallback to OpenAI
  if (getApiKey()) {
    return ttsElevenLabs(text, outputPath, voice);
  }
  return ttsOpenAI(text, outputPath, voice);
}

// ── Chapter script builder ─────────────────────────────────────────────────

function buildChapterScript(chapterIndex, chapter, bookTitle) {
  const lines = [];
  if (chapterIndex === 0) {
    lines.push(`${bookTitle}.`);
    lines.push('');
  }
  lines.push(`Chapter ${chapterIndex + 1}. ${chapter.title}.`);
  lines.push('');
  if (chapter.intro) lines.push(chapter.intro);
  if (chapter.summary) lines.push(chapter.summary);
  if (chapter.content) lines.push(chapter.content);
  if (chapter.sections) {
    for (const s of chapter.sections) {
      if (s.title) lines.push(`Section: ${s.title}.`);
      if (s.content) lines.push(s.content);
    }
  }
  return lines.join('\n')
    .replace(/[#*`_]/g, '')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .trim();
}

// ── Main export ────────────────────────────────────────────────────────────

export async function generate(slug, { voice = 'nova', onProgress = () => {} } = {}) {
  const bookPath = path.join(BOOKS_DIR, `${slug}.json`);
  if (!existsSync(bookPath)) throw new Error(`Book not found: ${slug}`);

  const raw = JSON.parse(await fs.readFile(bookPath, 'utf8'));
  const book = raw.book || raw;
  const title = book.title || slug;
  const chapters = book.chapters || [];
  if (!chapters.length) throw new Error('Book has no chapters');

  const outDir = path.join(BOOKS_DIR, slug);
  await fs.mkdir(outDir, { recursive: true });

  const provider = getApiKey() ? 'ElevenLabs' : 'OpenAI TTS';
  onProgress({ stage: 'start', total: chapters.length, provider });

  const chapterFiles = [];
  for (let i = 0; i < chapters.length; i++) {
    const ch = chapters[i];
    const script = buildChapterScript(i, ch, title);
    const chFile = path.join(outDir, `ch${String(i + 1).padStart(2, '0')}.mp3`);
    onProgress({ stage: 'tts', chapter: i + 1, total: chapters.length, title: ch.title, provider });
    await tts(script, chFile, voice);
    chapterFiles.push(chFile);
  }

  // Concatenate with ffmpeg
  const finalPath = path.join(outDir, `${slug}.mp3`);
  const listFile  = path.join(outDir, 'chapters.txt');
  await fs.writeFile(listFile, chapterFiles.map(f => `file '${f}'`).join('\n'));

  onProgress({ stage: 'concat', files: chapterFiles.length });
  execSync(`ffmpeg -y -f concat -safe 0 -i "${listFile}" -c copy "${finalPath}"`, { stdio: 'pipe' });
  await fs.unlink(listFile);

  const stat = await fs.stat(finalPath);
  onProgress({ stage: 'done', path: finalPath, sizeBytes: stat.size, provider });

  return {
    slug,
    title,
    chapters: chapters.length,
    path: path.relative(KB_ROOT, finalPath),
    sizeBytes: stat.size,
    sizeMB: (stat.size / 1048576).toFixed(1),
    provider,
  };
}

// ── CLI ────────────────────────────────────────────────────────────────────

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const slug = process.argv[2];
  const voice = process.argv[3] || 'nova';
  if (!slug) { console.error('Usage: node audiobook.js <slug> [voice]'); process.exit(1); }
  try {
    const result = await generate(slug, {
      voice,
      onProgress: (p) => process.stderr.write(JSON.stringify(p) + '\n'),
    });
    console.log(JSON.stringify(result, null, 2));
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
