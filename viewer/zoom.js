// Zoom feature — Google Earth style, vertical map-zoom slider (M6 item 4)
// Slider direction convention (cross-browser reliable via CSS transform):
//   UP  = higher slider value = MORE detail (Deep dive)
//   DOWN = lower slider value  = MORE aerial (Aerial overview)
// The semantic level passed to the server (/api/zoom) is the SAME value — the
// compile step interprets 0=aerial and 4=deep dive.

let currentZoomLevel = 2;
let zoomCache = {};
let originalContent = null;

const ZOOM_LEVELS = [
  { value: 0, label: 'Aerial',    icon: 'globe',       desc: 'Titles and one line per section',       color: 'var(--accent2)' },
  { value: 1, label: 'Summary',   icon: 'telescope',   desc: 'Condensed paragraphs, headings kept',   color: 'var(--accent2)' },
  { value: 2, label: 'Normal',    icon: 'file-text',   desc: 'Original document',                     color: 'var(--green)' },
  { value: 3, label: 'Detailed',  icon: 'microscope',  desc: 'Expanded with examples',                color: 'var(--accent)' },
  { value: 4, label: 'Deep dive', icon: 'atom',        desc: 'Full analysis and connections',          color: 'var(--accent)' },
];

function initZoom() {
  const panel = document.getElementById('zoom-panel');
  if (!panel) return;

  const level = currentZoomLevel;
  const z = ZOOM_LEVELS[level];

  // Build the vertical slider markup
  panel.innerHTML = `
    <div class="zoom-slider-header">
      <i data-lucide="${z.icon}" class="zoom-current-icon" style="color:${z.color}"></i>
      <span id="zoom-level-label" style="color:${z.color}">${z.label}</span>
    </div>
    <div class="zoom-slider-body">
      <div class="zoom-slider-track">
        <div class="zoom-slider-thumb"></div>
        <input type="range" id="zoom-slider" min="0" max="4" step="1" value="${level}" aria-label="Zoom level" />
      </div>
      <div class="zoom-ticks">
        ${ZOOM_LEVELS.slice().reverse().map(zl => `
          <button class="zoom-tick ${zl.value === level ? 'active' : ''}" data-level="${zl.value}" title="${zl.desc}">
            <i data-lucide="${zl.icon}"></i>
            <span>${zl.label}</span>
          </button>
        `).join('')}
      </div>
    </div>
    <div id="zoom-status" class="zoom-status"></div>
    <button class="zoom-close" onclick="toggleZoomPanel()" title="Close zoom"><i data-lucide="x"></i></button>
  `;

  const slider = document.getElementById('zoom-slider');
  const track = panel.querySelector('.zoom-slider-track');
  // Vertical slider with 5 levels: Deep dive at TOP (value 4), Aerial at
  // BOTTOM (value 0). Thumb and fill both computed from the level.
  const updateVisual = (lvl) => {
    const zl = ZOOM_LEVELS[lvl];
    const label = document.getElementById('zoom-level-label');
    if (label) { label.textContent = zl.label; label.style.color = zl.color; }
    const iconEl = panel.querySelector('.zoom-current-icon');
    if (iconEl) { iconEl.setAttribute('data-lucide', zl.icon); iconEl.style.color = zl.color; }
    // Position: level 4 (Deep dive) at top (0%), level 0 (Aerial) at bottom (100%)
    const pct = ((4 - lvl) / 4) * 100;
    track.style.setProperty('--zoom-thumb-y', pct + '%');
    if (slider) slider.value = lvl;
    panel.querySelectorAll('.zoom-tick').forEach(t => {
      t.classList.toggle('active', parseInt(t.dataset.level) === lvl);
    });
    if (window.lucide) lucide.createIcons();
  };
  updateVisual(level);

  // Click anywhere on the track → jump to the nearest level based on vertical position
  track.addEventListener('click', (e) => {
    const rect = track.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const yPct = Math.max(0, Math.min(1, y / rect.height));
    // yPct 0 → top (Deep dive, level 4); 1 → bottom (Aerial, level 0)
    const lvl = Math.round((1 - yPct) * 4);
    currentZoomLevel = lvl;
    updateVisual(lvl);
    if (window.currentFilePath) applyZoom(lvl);
  });

  panel.querySelectorAll('.zoom-tick').forEach(tick => {
    tick.addEventListener('click', () => {
      const lvl = parseInt(tick.dataset.level);
      currentZoomLevel = lvl;
      updateVisual(lvl);
      if (window.currentFilePath) applyZoom(lvl);
    });
  });

  if (window.lucide) lucide.createIcons();
}

function setCurrentFile(filePath) {
  window.currentFilePath = filePath;
  originalContent = null;
  const panel = document.getElementById('zoom-panel');
  if (panel && panel.classList.contains('open')) {
    currentZoomLevel = 2;
    const slider = document.getElementById('zoom-slider');
    if (slider) slider.value = 2;
    const label = document.getElementById('zoom-level-label');
    if (label) { label.textContent = ZOOM_LEVELS[2].label; label.style.color = ZOOM_LEVELS[2].color; }
    const cb = document.getElementById('content-body');
    if (cb && originalContent) { cb.innerHTML = originalContent; bindWikilinks(); }
  }
}

function bindWikilinks() {
  document.querySelectorAll('.wikilink').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const target = el.dataset.link;
      const normalized = target.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-');
      const allFiles = document.querySelectorAll('.tree-file');
      let match = null;
      for (const f of allFiles) {
        const fp = (f.dataset.path || '').toLowerCase();
        const fname = fp.split('/').pop().replace('.md', '');
        if (fname === normalized || fname === target.toLowerCase()) { match = f; break; }
      }
      if (!match) for (const f of allFiles) {
        if ((f.dataset.path || '').toLowerCase().includes(normalized)) { match = f; break; }
      }
      if (match) loadFile(match.dataset.path);
    });
  });
}

// Render LLM-streamed markdown the SAME way loadFile renders wiki files:
// - run marked.parse
// - rewrite [[wikilinks]] → <a class="wikilink" data-link="...">
// - rewrite local <img src="..."> and <source src="..."> → /raw-file?path=...
// Keeps the zoom output visually and behaviorally identical to a normal article.
function renderZoomMarkdown(markdown) {
  const parsed = (typeof marked !== 'undefined' && marked.parse)
    ? marked.parse(markdown || '')
    : (markdown || '').replace(/\n/g, '<br>');
  let rendered = parsed.replace(/\[\[([^\]]+)\]\]/g, '<a class="wikilink" href="#" data-link="$1">$1</a>');
  rendered = rendered.replace(/<img([^>]*?)src="(?!https?:\/\/|\/)([^"]+)"([^>]*?)>/g,
    (_match, pre, src, post) => {
      const clean = src.replace(/^\/raw-file\?path=/, '');
      return '<img' + pre + 'src="/raw-file?path=' + clean + '"' + post + '>';
    });
  rendered = rendered.replace(/<source([^>]*?)src="(?!https?:\/\/|\/)([^"]+)"([^>]*?)>/g,
    (_match, pre, src, post) => '<source' + pre + 'src="/raw-file?path=' + src + '"' + post + '>');
  return rendered;
}

async function applyZoom(level) {
  if (!window.currentFilePath) return;
  const cb = document.getElementById('content-body');
  if (!cb) return;

  if (level === 2) {
    if (originalContent) {
      cb.innerHTML = originalContent;
      bindWikilinks();
      if (window.highlightNewCode) window.highlightNewCode(cb);
    }
    const statusEl = document.getElementById('zoom-status');
    if (statusEl) statusEl.textContent = '';
    return;
  }

  if (!originalContent) originalContent = cb.innerHTML;

  // Extract the frontmatter block from the original DOM so we can re-emit it
  // on every streaming tick. Without this, the zoom output would blow away the
  // <div class="frontmatter"> + <div class="md-content"> wrappers and the page
  // would lose its typography styles, wikilinks, and image rewrites.
  const tmp = document.createElement('div');
  tmp.innerHTML = originalContent;
  const fmEl = tmp.querySelector('.frontmatter');
  const fmHtml = fmEl ? fmEl.outerHTML : '';

  const cacheKey = window.currentFilePath + ':' + level;
  if (zoomCache[cacheKey]) {
    cb.innerHTML = zoomCache[cacheKey];
    bindWikilinks();
    if (window.highlightNewCode) window.highlightNewCode(cb);
    return;
  }

  const fileRes = await fetch('/api/file?path=' + encodeURIComponent(window.currentFilePath));
  const fileData = await fileRes.json();
  const articleContent = fileData.content || '';

  const statusEl = document.getElementById('zoom-status');
  if (statusEl) statusEl.innerHTML = '<span class="zoom-spinner"></span>Transforming…';

  const res = await fetch('/api/zoom', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filePath: window.currentFilePath, level, content_override: articleContent })
  });

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let markdown = '';
  // Proper SSE parser: buffer partial chunks, split on '\n\n' (event boundary).
  // The previous per-chunk split('\n') dropped events that spanned chunk
  // boundaries, which happened constantly on longer streams (deep dive,
  // detailed) — that's why formatting seemed to "disappear" on those levels.
  let sseBuffer = '';

  // Initial loading placeholder — keep the wrapper structure so CSS doesn't vanish
  cb.innerHTML = fmHtml + '<div class="md-content"><div style="opacity:.5;font-size:12px;color:var(--subtext);padding:20px;">Transforming…</div></div>';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    sseBuffer += decoder.decode(value, { stream: true });
    let idx;
    while ((idx = sseBuffer.indexOf('\n\n')) !== -1) {
      const rawEvent = sseBuffer.slice(0, idx);
      sseBuffer = sseBuffer.slice(idx + 2);
      // An event may have multiple `data:` lines; concatenate them per SSE spec
      const dataLines = rawEvent
        .split('\n')
        .filter((l) => l.startsWith('data:'))
        .map((l) => l.replace(/^data:\s?/, ''));
      if (!dataLines.length) continue;
      try {
        const d = JSON.parse(dataLines.join('\n'));
        if (d && d.text) {
          markdown += d.text;
          cb.innerHTML = fmHtml + '<div class="md-content">' + renderZoomMarkdown(markdown) + '</div>';
        }
      } catch { /* skip malformed event */ }
    }
  }

  zoomCache[cacheKey] = cb.innerHTML;
  bindWikilinks();
  if (window.highlightNewCode) window.highlightNewCode(cb);
  if (statusEl) statusEl.textContent = '';
}

function toggleZoomPanel() {
  const panel = document.getElementById('zoom-panel');
  if (!panel) return;
  const isOpen = panel.classList.contains('open');
  if (isOpen) {
    panel.classList.remove('open');
    const cb = document.getElementById('content-body');
    if (cb && originalContent) { cb.innerHTML = originalContent; bindWikilinks(); }
    currentZoomLevel = 2;
    const slider = document.getElementById('zoom-slider');
    if (slider) slider.value = 2;
  } else {
    panel.classList.add('open');
    initZoom();
    if (window.currentFilePath && currentZoomLevel !== 2) applyZoom(currentZoomLevel);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const panel = document.getElementById('zoom-panel');
  if (panel) { panel.classList.remove('open'); initZoom(); }
});
