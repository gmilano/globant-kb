const $ = s => document.querySelector(s);
let searchTimer = null;

// Actualizar contexto del voice assistant (Realtime API) al cambiar de vista
function updateVoiceContext(viewName, description) {
  if (!window.rtPC || window.rtPC.connectionState !== 'connected') return;
  if (!window.rtDC || window.rtDC.readyState !== 'open') return;
  const msg = {
    type: 'conversation.item.create',
    item: {
      type: 'message',
      role: 'user',
      content: [{
        type: 'input_text',
        text: `[Contexto actualizado] El usuario navegó a: ${viewName}\n\n${description}\n\nResponde preguntas del usuario sobre esta sección.`
      }]
    }
  };
  try { window.rtDC.send(JSON.stringify(msg)); } catch(e) {}
}
let graphZoom = null;
let graphSvg = null;
let graphData = null;

// --- Tabs ---
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', (ev) => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.dataset.tab;
    // Permalink: push tab state unless we're replaying from popstate (flagged on the event)
    if (!(ev && ev._fromPopState)) {
      if (tab === 'wiki') {
        // Wiki without a selected file → clean home
        if (!location.pathname.startsWith('/w/')) {
          history.pushState({ kind: 'home' }, '', '/');
        }
      } else {
        history.pushState({ kind: 'tab', tab }, '', '/' + tab);
      }
    }
    $('#content-body').style.display = 'none';
    $('#ideas-panel').style.display = 'none';
    $('#widgets-panel').style.display = 'none';
    const dp = document.getElementById('dashboard-panel'); if (dp) dp.style.display = 'none';
    const np = document.getElementById('nexus-panel'); if (np) np.style.display = 'none';
    const pp = document.getElementById('pipelines-panel'); if (pp) pp.style.display = 'none';
    const tp = document.getElementById('trees-panel'); if (tp) tp.style.display = 'none';
    const fp = document.getElementById('feed-panel'); if (fp) fp.style.display = 'none';
    const prp = document.getElementById('prime-panel'); if (prp) prp.style.display = 'none';
    const dcp = document.getElementById('decisions-panel'); if (dcp) dcp.style.display = 'none';
    const bkp2 = document.getElementById('books-panel'); if (bkp2) bkp2.style.display = 'none';
    const agp2 = document.getElementById('agents-panel'); if (agp2) agp2.style.display = 'none';
    // Hide the doc action rail + inline edit button on any non-wiki tab
    const rail = document.getElementById('doc-action-rail');
    if (rail && tab !== 'wiki') rail.classList.remove('visible');
    const btnEditInline = document.getElementById('btn-edit-inline');
    if (btnEditInline && tab !== 'wiki') btnEditInline.style.display = 'none';
    if (tab === 'wiki') {
      $('#content-body').style.display = '';
    } else if (tab === 'ideas') {
      $('#ideas-panel').style.display = 'block';
      $('#backlinks').style.display = 'none';
      loadIdeas();
      updateVoiceContext('ideas', '📡 Panel de Ideas — contiene las ideas generadas diariamente sobre la KB. El usuario puede preguntar sobre ideas recientes, tendencias o propuestas de proyectos.');
    } else if (tab === 'dashboard') {
      const dp = $('#dashboard-panel');
      if (dp) { dp.style.display = 'block'; loadDashboard(); }
      $('#backlinks').style.display = 'none';
      updateVoiceContext('dashboard', '📊 Dashboard — muestra las noticias más recientes de Hacker News, artículos de la KB, y repos trending de GitHub. El usuario puede preguntar sobre las novedades del día.');
    } else if (tab === 'widgets') {
      $('#widgets-panel').style.display = 'block';
      $('#backlinks').style.display = 'none';
      loadWidgets();
      updateVoiceContext('widgets', '🔮 Panel de Widgets — visualizaciones interactivas generadas por IA sobre la KB. El usuario puede pedir crear nuevos widgets o explorar los existentes.');
    } else if (tab === 'feed') {
      const fp = document.getElementById('feed-panel');
      if (fp) fp.style.display = 'flex';
      fp.style.flexDirection = 'column';
      $('#backlinks').style.display = 'none';
      loadFeed();
    } else if (tab === 'trees') {
      const tp = document.getElementById('trees-panel');
      if (tp) { tp.style.display = 'flex'; tp.style.flexDirection = 'column'; }
      $('#backlinks').style.display = 'none';
      loadTrees();
    } else if (tab === 'pipelines') {
      const pp = document.getElementById('pipelines-panel');
      if (pp) pp.style.display = 'flex';
      pp.style.flexDirection = 'column';
      $('#backlinks').style.display = 'none';
      loadPipelines();
    } else if (tab === 'nexus') {
      const np = document.getElementById('nexus-panel');
      if (np) np.style.display = 'flex';
      $('#backlinks').style.display = 'none';
      loadNexusGraph();
      updateVoiceContext('nexus', '🕸 GitNexus — grafo de conocimiento interactivo con 3840 nodos y 4351 relaciones que muestra la estructura completa de la KB. Tiene 28 clusters detectados automáticamente. El usuario puede preguntar sobre relaciones entre conceptos o navegar el grafo.');
    } else if (tab === 'prime') {
      const prp = document.getElementById('prime-panel');
      if (prp) { prp.style.display = 'flex'; prp.style.flexDirection = 'column'; }
      $('#backlinks').style.display = 'none';
      loadPrimeStats();
      if (window._primeStatsTimer) clearInterval(window._primeStatsTimer);
      window._primeStatsTimer = setInterval(loadPrimeStats, 5000);
      updateVoiceContext('prime', 'Knowledge Fulfillment Center — el agente puede pedir conocimiento por query y recibir contexto estructurado en el budget solicitado, con SLA observable.');
    } else if (tab === 'decisions') {
      const dcp = document.getElementById('decisions-panel');
      if (dcp) { dcp.style.display = 'flex'; dcp.style.flexDirection = 'column'; }
      $('#backlinks').style.display = 'none';
      loadDecisions();
      updateVoiceContext('decisions', 'Decisions Timeline — ADRs versionados con el historial de decisiones arquitectónicas. Cada commit idealmente referencia un decision-id.');
    } else if (tab === 'books') {
      const bkp = document.getElementById('books-panel');
      if (bkp) { bkp.style.display = 'flex'; bkp.style.flexDirection = 'column'; }
      $('#backlinks').style.display = 'none';
      if (typeof loadBooksPanel === 'function') loadBooksPanel();
      updateVoiceContext('books', 'Books library — AI-composed books built from the wiki, cached in raw/books/.');
    } else if (tab === 'agents') {
      const agp = document.getElementById('agents-panel');
      if (agp) { agp.style.display = 'flex'; agp.style.flexDirection = 'column'; }
      $('#backlinks').style.display = 'none';
      if (typeof loadAgentsPanel === 'function') loadAgentsPanel();
      updateVoiceContext('agents', 'Agents panel — conversational AI agents with methodologies. The built-in Agente Crítico critiques documents using Adizes.');
    } else {
      if (window._primeStatsTimer) { clearInterval(window._primeStatsTimer); window._primeStatsTimer = null; }
    }
  });
});

// --- Knowledge Prime ---
async function loadPrimeStats() {
  try {
    const res = await fetch('/api/knowledge/stats');
    if (!res.ok) return;
    const s = await res.json();
    const el = (id) => document.getElementById(id);
    if (el('ps-raw')) el('ps-raw').textContent = s.warehouse?.raw_count ?? '—';
    if (el('ps-wiki')) el('ps-wiki').textContent = s.warehouse?.wiki_count ?? '—';
    if (el('ps-cache')) el('ps-cache').textContent = (s.cache?.size ?? 0) + '/' + (s.cache?.max ?? '—');
    if (el('ps-hit')) el('ps-hit').textContent = ((s.sla?.cache_hit_rate ?? 0) * 100).toFixed(0) + '%';
    const sla = s.sla || {};
    const slaEl = el('prime-sla');
    if (slaEl) {
      slaEl.textContent = sla.count
        ? `n=${sla.count} · p50=${sla.p50 ?? '—'}ms · p95=${sla.p95 ?? '—'}ms · p99=${sla.p99 ?? '—'}ms`
        : 'sin corridas aún';
    }
    const recent = el('prime-recent');
    if (recent) {
      recent.innerHTML = (s.recent || []).slice(0, 12).map(r => {
        const fmt = (r.format || '').padEnd(14);
        const ms = (r.total_ms ?? 0) + 'ms';
        const cachedIcon = r.cached
          ? '<i data-lucide="database" style="width:11px;height:11px;color:var(--green);vertical-align:-1px;"></i> hit'
          : '<i data-lucide="flame" style="width:11px;height:11px;color:var(--yellow);vertical-align:-1px;"></i> cold';
        const cls = r.ok ? '' : 'style="border-color:var(--red);"';
        return `<div class="prime-recent-row" ${cls}>
          <div class="q" title="${esc(r.query || '')}">${esc(r.query || '')}</div>
          <div class="fmt">${esc(fmt)}</div>
          <div class="ms">${ms}</div>
          <div class="cached">${cachedIcon}</div>
        </div>`;
      }).join('') || '<div style="color:var(--subtext);font-size:12px;">No requests yet. Try a query above.</div>';
      if (window.lucide) lucide.createIcons();
    }
  } catch (e) { /* silent */ }
}

function primeStage(name) { return document.querySelector(`.prime-stage[data-stage="${name}"]`); }
function primeArrow(name) { return document.querySelector(`.prime-stage-arrow[data-arrow="${name}"]`); }

async function firePrime() {
  const query = document.getElementById('prime-query').value.trim();
  if (!query) return;
  const format = document.getElementById('prime-format').value;
  const btn = document.getElementById('prime-fire');
  const tracker = document.getElementById('prime-tracker');
  const trackerMs = document.getElementById('prime-tracker-ms');
  const resultEl = document.getElementById('prime-result');

  btn.disabled = true;
  btn.textContent = 'Delivering…';
  tracker.style.display = 'block';
  document.querySelectorAll('.prime-stage').forEach(s => s.classList.remove('active', 'done'));
  document.querySelectorAll('.prime-stage-arrow').forEach(a => a.classList.remove('flowing', 'done'));
  primeStage('pick').classList.add('active');
  trackerMs.textContent = 'picking…';
  resultEl.innerHTML = '';

  // Optimistic stage progression: we don't have SSE yet, so simulate
  // Pick usually resolves in <100ms; flip to Pack quickly after.
  const pickTimer = setTimeout(() => {
    if (btn.disabled) {
      primeStage('pick').classList.replace('active', 'done');
      primeArrow('pick-pack').classList.add('flowing');
      setTimeout(() => {
        if (btn.disabled) {
          primeArrow('pick-pack').classList.remove('flowing');
          primeArrow('pick-pack').classList.add('done');
          primeStage('pack').classList.add('active');
          trackerMs.textContent = 'packing…';
        }
      }, 220);
    }
  }, 250);

  const t0 = Date.now();
  try {
    const res = await fetch('/api/knowledge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, format, maxItems: 8, budgetMs: 3000 }),
    });
    const data = await res.json();
    const totalMs = Date.now() - t0;
    clearTimeout(pickTimer);

    if (!res.ok) throw new Error(data.error || 'request failed');

    // Finalize all stages in sequence
    primeStage('pick').classList.remove('active');
    primeStage('pick').classList.add('done');
    primeStage('pack').classList.remove('active');
    primeStage('pack').classList.add('done');
    primeArrow('pick-pack').classList.remove('flowing');
    primeArrow('pick-pack').classList.add('done');
    primeArrow('pack-deliver').classList.add('flowing');
    await new Promise(r => setTimeout(r, 280));
    primeArrow('pack-deliver').classList.remove('flowing');
    primeArrow('pack-deliver').classList.add('done');
    primeStage('deliver').classList.add('done');

    const m = data.metrics || {};
    trackerMs.textContent = `${totalMs}ms total · pick ${m.stages?.pick_ms ?? '—'}ms · pack ${m.stages?.pack_ms ?? '—'}ms${data.cached ? ' · 💾 cache hit' : ''}`;

    // Stash current data for save-to-wiki
    window._primeLastResult = { query, format, data };
    resultEl.innerHTML = renderPrimeResult(data, query);
    highlightNewCode(resultEl);
    loadPrimeStats();
  } catch (e) {
    clearTimeout(pickTimer);
    resultEl.innerHTML = `<div class="prime-result-card" style="border-color:var(--red);"><div style="color:var(--red);font-size:13px;">❌ ${esc(e.message)}</div></div>`;
  } finally {
    btn.disabled = false;
    btn.textContent = 'Deliver';
  }
}

function mdToHtml(md) {
  if (typeof marked !== 'undefined' && marked.parse) return marked.parse(md || '');
  return esc(md || '').replace(/\n/g, '<br>');
}

function primeSectionHeader(label, editableKey) {
  return `<h4 class="prime-section">${esc(label)}
    <span class="prime-section-actions">
      <button onclick="primeToggleEdit('${editableKey}', this)"><i data-lucide="pencil"></i> Edit</button>
      <button onclick="primeCopyMd('${editableKey}')"><i data-lucide="copy"></i> Copy</button>
    </span>
  </h4>`;
}

function editableBlock(key, markdown) {
  return `<div class="prime-md" data-key="${esc(key)}" data-md="${esc(markdown)}">${mdToHtml(markdown)}</div>`;
}

function renderPrimeResult(data, query) {
  if (!data.result) {
    return `<div class="prime-result-card"><div style="color:var(--subtext);font-size:13px;">No hits para esta query. Probá con otros términos.</div></div>`;
  }
  const r = data.result;
  const fmt = data.format;
  let body = '';

  if (fmt === 'context') {
    const keyPointsMd = (r.key_points || []).map(k => `- ${k}`).join('\n');
    const sourcesMd = (r.sources || []).map(s => `- \`${s.path}\` — ${s.relevance || ''}`).join('\n');
    body = `
      ${primeSectionHeader('Summary', 'summary')}
      ${editableBlock('summary', r.summary || '')}
      ${primeSectionHeader('Key points', 'key_points')}
      ${editableBlock('key_points', keyPointsMd)}
      ${primeSectionHeader('Sources', 'sources')}
      ${editableBlock('sources', sourcesMd)}
      ${r.related_concepts?.length ? `<h4 class="prime-section">Related</h4><div>${r.related_concepts.map(c => `<span class="prime-source-chip">${esc(c)}</span>`).join('')}</div>` : ''}
    `;
  } else if (fmt === 'brief') {
    const sectionsMd = (r.sections || []).map(s => `## ${s.heading}\n\n${s.body}`).join('\n\n');
    const sourcesMd = (r.sources || []).map(p => `- \`${p}\``).join('\n');
    body = `
      ${primeSectionHeader(r.title || 'Brief', 'title')}
      ${editableBlock('tldr', r.tldr || '')}
      ${primeSectionHeader('Sections', 'sections')}
      ${editableBlock('sections', sectionsMd)}
      ${primeSectionHeader('Sources', 'sources')}
      ${editableBlock('sources', sourcesMd)}
    `;
  } else if (fmt === 'agent-prompt') {
    const citedMd = (r.sources_cited || []).map(p => `- \`${p}\``).join('\n');
    body = `
      ${primeSectionHeader('System prompt', 'system_prompt')}
      ${editableBlock('system_prompt', r.system_prompt || '')}
      ${primeSectionHeader('Sources cited', 'sources_cited')}
      ${editableBlock('sources_cited', citedMd)}
    `;
  }

  const saveBar = `
    <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:22px;padding-top:16px;border-top:1px solid var(--surface2);">
      <button onclick="primeSaveToWiki()" style="display:inline-flex;align-items:center;gap:6px;padding:10px 20px;background:var(--accent);color:var(--accent-fg);border:none;border-radius:var(--radius);cursor:pointer;font-size:12px;font-weight:700;font-family:'Inter',sans-serif;"><i data-lucide="save"></i> Save to wiki</button>
      <button onclick="primeCopyAll()" style="display:inline-flex;align-items:center;gap:6px;padding:10px 20px;background:var(--surface2);color:var(--text);border:1px solid var(--surface3);border-radius:var(--radius);cursor:pointer;font-size:12px;font-weight:600;font-family:'Inter',sans-serif;"><i data-lucide="clipboard-copy"></i> Copy all markdown</button>
    </div>`;

  const html = `<div class="prime-result-card">${body}${saveBar}</div>`;
  // Re-render Lucide icons on the newly inserted DOM after this returns
  setTimeout(() => { if (window.lucide) lucide.createIcons(); }, 0);
  return html;
}

function primeToggleEdit(key, btn) {
  const el = document.querySelector(`.prime-md[data-key="${key}"]`);
  if (!el) return;
  const isEditing = el.getAttribute('contenteditable') === 'true';
  if (isEditing) {
    const editedMd = el.innerText;
    el.setAttribute('data-md', editedMd);
    el.removeAttribute('contenteditable');
    el.innerHTML = mdToHtml(editedMd);
    btn.innerHTML = '<i data-lucide="pencil"></i> Edit';
  } else {
    const md = el.getAttribute('data-md') || '';
    el.setAttribute('contenteditable', 'true');
    el.innerText = md;
    el.focus();
    btn.innerHTML = '<i data-lucide="check"></i> Done';
  }
  if (window.lucide) lucide.createIcons();
}

function primeCopyMd(key) {
  const el = document.querySelector(`.prime-md[data-key="${key}"]`);
  if (!el) return;
  const md = el.getAttribute('contenteditable') === 'true' ? el.innerText : (el.getAttribute('data-md') || '');
  navigator.clipboard.writeText(md).then(() => primeToast(`${key} copiado`, 'clipboard-check'));
}

function primeCurrentMarkdown() {
  const last = window._primeLastResult;
  if (!last) return '';
  const blocks = document.querySelectorAll('#prime-result .prime-md');
  const parts = [`# ${last.query}`, ''];
  blocks.forEach(b => {
    const key = b.getAttribute('data-key');
    const md = b.getAttribute('contenteditable') === 'true' ? b.innerText : (b.getAttribute('data-md') || '');
    parts.push(`## ${key}`, '', md, '');
  });
  return parts.join('\n');
}

function primeCopyAll() {
  const md = primeCurrentMarkdown();
  navigator.clipboard.writeText(md).then(() => primeToast('Full markdown copied', 'clipboard-check'));
}

async function primeSaveToWiki() {
  const last = window._primeLastResult;
  if (!last) return;
  const slug = last.query.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
  const filePath = `wiki/concepts/${slug}.md`;
  const body = primeCurrentMarkdown();
  const fullContent = `---
title: ${last.query}
category: concept
source: knowledge-prime
format: ${last.format}
created: ${new Date().toISOString().slice(0, 10)}
---

${body}
`;
  try {
    const res = await fetch('/api/article/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filePath, content: fullContent }),
    });
    const data = await res.json();
    if (data.ok) primeToast(`Guardado en ${filePath}`, 'save');
    else primeToast(`${data.error || 'Error saving'}`, 'alert-triangle');
  } catch (e) {
    primeToast(`${e.message}`, 'alert-triangle');
  }
}

function primeToast(msg, iconName = 'check') {
  const t = document.createElement('div');
  t.className = 'prime-save-toast';
  t.innerHTML = `<i data-lucide="${iconName}" style="width:14px;height:14px;vertical-align:-2px;margin-right:6px;"></i>${esc(msg)}`;
  document.body.appendChild(t);
  if (window.lucide) lucide.createIcons();
  setTimeout(() => t.remove(), 2200);
}

window.primeToggleEdit = primeToggleEdit;
window.primeCopyMd = primeCopyMd;
window.primeCopyAll = primeCopyAll;
window.primeSaveToWiki = primeSaveToWiki;

// --- Decisions Timeline ---
async function loadDecisions() {
  try {
    const res = await fetch('/api/decisions');
    const data = await res.json();
    const adrs = data.adrs || [];
    window._adrs = adrs;

    const el = (id) => document.getElementById(id);
    el('ds-total').textContent = adrs.length;
    el('ds-accepted').textContent = adrs.filter(a => a.status === 'accepted').length;
    el('ds-superseded').textContent = adrs.filter(a => a.status === 'superseded').length;
    el('ds-latest').textContent = adrs.length ? (adrs[adrs.length - 1].date || '—') : '—';

    const timeline = el('decisions-timeline');
    if (!adrs.length) {
      timeline.innerHTML = '<div style="color:var(--subtext);font-size:13px;padding:20px;">No ADRs todavía. Cualquier archivo en decisions/*.md aparece acá.</div>';
      return;
    }

    timeline.innerHTML = adrs.map(a => {
      const statusClass = (a.status || '').toLowerCase();
      const tags = (a.tags || []).slice(0, 4).map(t => `<span class="adr-tag">${esc(t)}</span>`).join('');
      return `<div class="adr-item ${a.status === 'superseded' ? 'superseded' : ''}" onclick="openDecisionDetail('${esc(a.id)}')">
        <div class="adr-item-header">
          <span class="adr-item-id">ADR ${esc(String(a.id).padStart(4, '0'))}</span>
          <span class="adr-item-title">${esc(a.title)}</span>
          <span class="adr-item-date">${esc(a.date || '')}</span>
        </div>
        <div class="adr-item-meta">
          <span class="adr-status ${statusClass}">${esc(a.status)}</span>
          ${tags}
          ${a.related?.length ? `<span>↔ related: ${a.related.map(r => `ADR ${String(r).padStart(4, '0')}`).join(', ')}</span>` : ''}
        </div>
      </div>`;
    }).join('');

    if (window.lucide) lucide.createIcons();
  } catch (e) {
    document.getElementById('decisions-timeline').innerHTML = `<div style="color:var(--red);font-size:12px;">Error: ${esc(e.message)}</div>`;
  }
}

function openDecisionDetail(id) {
  const adr = (window._adrs || []).find(a => String(a.id) === String(id));
  if (!adr) return;
  document.getElementById('dd-title').textContent = `ADR ${String(adr.id).padStart(4, '0')} — ${adr.title}`;
  const meta = [
    `<span>📅 ${esc(adr.date || '—')}</span>`,
    `<span class="adr-status ${esc((adr.status||'').toLowerCase())}" style="padding:2px 8px;border-radius:3px;">${esc(adr.status)}</span>`,
    adr.deciders?.length ? `<span>👥 ${esc(adr.deciders.join(', '))}</span>` : '',
    adr.tags?.length ? adr.tags.map(t => `<span class="adr-tag">${esc(t)}</span>`).join(' ') : '',
  ].filter(Boolean).join(' ');
  document.getElementById('dd-meta').innerHTML = meta;
  document.getElementById('dd-body').innerHTML = mdToHtml(adr.body || '');
  highlightNewCode(document.getElementById('dd-body'));
  const modal = document.getElementById('decision-detail');
  modal.style.display = 'flex';
  if (window.lucide) lucide.createIcons();
}

function closeDecisionDetail() {
  document.getElementById('decision-detail').style.display = 'none';
}

window.openDecisionDetail = openDecisionDetail;
window.closeDecisionDetail = closeDecisionDetail;
window.loadDecisions = loadDecisions;

// --- Hero image promotion (Flipboard-style lead image) ---
// If the first image in the article sits within the first two block children
// of .md-content (i.e. it's the article's opener), upgrade it to .hero-image
// so the CSS can render it full-width with a 16:7 aspect ratio.
function promoteHeroImage(container) {
  if (!container) return;
  const md = container.querySelector('.md-content');
  if (!md) return;
  const firstImg = md.querySelector('img');
  if (!firstImg) return;
  // Only promote if the image is in one of the first two top-level nodes
  let parent = firstImg;
  while (parent.parentElement && parent.parentElement !== md) parent = parent.parentElement;
  const idx = [...md.children].indexOf(parent);
  if (idx >= 0 && idx <= 2) {
    firstImg.classList.add('hero-image');
    // Strip any inline width/height so the CSS rule wins
    firstImg.removeAttribute('width');
    firstImg.removeAttribute('height');
  }
}

// --- Reading progress bar ---
// Updates the #reading-progress bar's width based on how far the user has
// scrolled through #content-body. Fires on scroll of the right element.
function _updateReadingProgress() {
  const root = document.documentElement;
  const cb = document.getElementById('content-body');
  if (!cb) return;
  // Prefer measuring the content scroller when the editor is closed
  const scroller = cb.scrollHeight > cb.clientHeight ? cb :
                   document.scrollingElement || root;
  const max = Math.max(1, scroller.scrollHeight - scroller.clientHeight);
  const pct = Math.max(0, Math.min(100, (scroller.scrollTop / max) * 100));
  root.style.setProperty('--reading-progress', pct + '%');
}
document.addEventListener('scroll', _updateReadingProgress, true); // capture so all scrollers fire
window.addEventListener('load', _updateReadingProgress);

// --- Reading mode toggle ---
function toggleReadingMode(force) {
  const on = force !== undefined ? force : !document.body.classList.contains('reading-mode');
  document.body.classList.toggle('reading-mode', on);
  if (on) {
    // Make sure the article is visible and scrolled to top
    const cb = document.getElementById('content-body');
    if (cb) cb.scrollTop = 0;
    _updateReadingProgress();
  }
  if (window.lucide) lucide.createIcons();
}
window.toggleReadingMode = toggleReadingMode;
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn-reading-mode');
  if (btn) btn.addEventListener('click', () => toggleReadingMode());

  // Mobile-only: clone the top-nav tab bar into the sidebar drawer so all
  // tabs are reachable when the viewport collapses the horizontal bar.
  const sidebar = document.getElementById('sidebar');
  const sidebarHeader = document.getElementById('sidebar-header');
  const topTabBar = document.getElementById('top-tab-bar');
  if (sidebar && sidebarHeader && topTabBar && !document.getElementById('sidebar-tabs')) {
    const wrap = document.createElement('div');
    wrap.id = 'sidebar-tabs';
    // Clone each tab button, preserving its data-tab and click behavior
    for (const original of topTabBar.querySelectorAll('.tab-btn')) {
      const clone = original.cloneNode(true);
      clone.addEventListener('click', () => {
        // Sync active state on both bars and dispatch the original's click
        document.querySelectorAll('#top-tab-bar .tab-btn, #sidebar-tabs .tab-btn').forEach((b) => b.classList.remove('active'));
        original.classList.add('active');
        clone.classList.add('active');
        original.click();
        // Auto-close the mobile sidebar after picking a tab
        if (window.innerWidth < 768) {
          sidebar.classList.remove('mobile-open');
          const overlay = document.getElementById('sidebar-overlay');
          if (overlay) overlay.classList.remove('visible');
        }
      });
      wrap.appendChild(clone);
    }
    // Insert AFTER the sidebar header (which contains the search box) so on
    // mobile the order is: search → tabs → file tree.
    sidebarHeader.insertAdjacentElement("afterend", wrap);
    if (window.lucide) lucide.createIcons();
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.body.classList.contains('reading-mode')) {
    toggleReadingMode(false);
  }
});

// --- Syntax highlighting (highlight.js) ---
// Some languages (Globant, NLAH) aren't in hljs by default. We register them
// as aliases of close cousins so the highlighter doesn't spam warnings and
// still shows something sensible.
function _ensureHljsAliases() {
  if (!window.hljs || window._hljsAliasesRegistered) return;
  window._hljsAliasesRegistered = true;
  const aliasMap = {
    // Globant is a low-code 4GL — uses Pascal-ish / C#-ish procedural syntax.
    // Pascal highlights it cleanly for begin/end/if/etc.
    genexus: 'pascal',
    gxobj: 'pascal',
    nlah: 'markdown',
    // Common tech-news shorthands we've seen in the compiled corpus
    cfg: 'ini',
    conf: 'ini',
    dockerfile: 'dockerfile',
  };
  for (const [alias, target] of Object.entries(aliasMap)) {
    try {
      // If the target language is registered, register the alias.
      if (hljs.getLanguage && hljs.getLanguage(target)) {
        hljs.registerAliases(alias, { languageName: target });
      }
    } catch {}
  }
}

// Highlights any <pre><code> that hasn't been processed yet. Idempotent via the
// data-hljs-done flag — safe to call multiple times after dynamic renders.
function highlightNewCode(container) {
  if (!window.hljs) return;
  _ensureHljsAliases();
  const root = container || document;
  root.querySelectorAll('pre code').forEach((el) => {
    if (el.dataset.hljsDone) return;
    // If the code has an explicit language class that hljs doesn't know,
    // strip it so hljs falls back to auto-detect silently instead of warning.
    const langClass = [...el.classList].find((c) => c.startsWith('language-'));
    if (langClass) {
      const lang = langClass.slice('language-'.length);
      if (hljs.getLanguage && !hljs.getLanguage(lang)) {
        el.classList.remove(langClass);
      }
    }
    try { hljs.highlightElement(el); } catch {}
    el.dataset.hljsDone = '1';
  });
}
window.highlightNewCode = highlightNewCode;

// --- Lucide icons boot + hljs boot: render static [data-lucide] elements on initial load ---
function renderIcons() { if (window.lucide && lucide.createIcons) lucide.createIcons(); }
function bootRender() { renderIcons(); highlightNewCode(); }
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootRender);
} else {
  bootRender();
}
// Fallback: scripts use `defer`, so may not be ready at DOMContentLoaded on slow connections
window.addEventListener('load', bootRender);
window.renderIcons = renderIcons;

// --- Theme switcher ---
function switchTheme(theme) {
  const link = document.getElementById('kb-theme-link');
  if (!link) return;
  link.href = '/themes/' + theme + '/tokens.css';
  try { localStorage.setItem('kb-theme', theme); } catch (e) {}
}

(function initThemePicker() {
  const picker = document.getElementById('theme-picker');
  if (!picker) return;
  let current = 'catppuccin';
  try { current = localStorage.getItem('kb-theme') || current; } catch (e) {}
  // If no localStorage, reflect what the server actually loaded
  const link = document.getElementById('kb-theme-link');
  if (link && !localStorage.getItem('kb-theme')) {
    const m = link.getAttribute('href').match(/\/themes\/([^/]+)\//);
    if (m) current = m[1];
  }
  picker.value = current;
})();

window.switchTheme = switchTheme;

// Allow Enter key on prime input
document.addEventListener('DOMContentLoaded', () => {
  const q = document.getElementById('prime-query');
  if (q) q.addEventListener('keydown', (e) => { if (e.key === 'Enter') firePrime(); });
});

window.firePrime = firePrime;
window.loadPrimeStats = loadPrimeStats;

// --- File Tree ---
async function loadTree() {
  const res = await fetch('/api/files');
  const tree = await res.json();
  $('#file-tree').innerHTML = renderTree(tree);
  bindTree();
}

function renderTree(nodes, depth = 0) {
  let html = '';
  for (const n of nodes) {
    if (n.type === 'dir') {
      html += '<div class="tree-item tree-dir' + (depth < 1 ? ' open' : '') + '">'
        + '<div class="tree-label"><span class="arrow">&#9654;</span> ' + esc(n.name) + '</div>'
        + '<div class="tree-children">' + renderTree(n.children || [], depth + 1) + '</div></div>';
    } else {
      html += '<a class="tree-item tree-file" data-path="' + esc(n.path) + '" href="javascript:void(0)">' + esc(n.name) + '</a>';
    }
  }
  return html;
}

function bindTree() {
  document.querySelectorAll('.tree-dir > .tree-label').forEach(el => {
    el.addEventListener('click', () => el.parentElement.classList.toggle('open'));
  });
  document.querySelectorAll('.tree-file').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation();
      const p = el.dataset.path || '';
      // Synthetic book entry — open the book reader instead of a wiki file.
      if (p.startsWith('book:')) { loadBookBySlug(p.slice(5)); return; }
      switchToWiki();
      loadFile(p);
    });
  });
}

function switchToWiki() {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.tab-btn[data-tab="wiki"]').classList.add('active');
  $('#content-body').style.display = '';
  ['ideas-panel','widgets-panel','dashboard-panel','nexus-panel','pipelines-panel','feed-panel','zoom-overlay','prime-panel','decisions-panel','books-panel','agents-panel'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
}

// --- File Loading ---
async function loadFile(filePath, opts = {}) {
  // Permalink: push URL state unless we're replaying from popstate
  if (!opts.fromPopState) {
    const url = '/w/' + filePath.split('/').map(encodeURIComponent).join('/');
    const current = location.pathname + location.search;
    if (current !== url) {
      history.pushState({ kind: 'file', filePath }, '', url);
    }
  }
  if (typeof setCurrentFile !== "undefined") setCurrentFile(filePath);
  // Siempre activar el tab Wiki y ocultar todos los paneles al navegar a un artículo
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const wikiBtn = document.querySelector('.tab-btn[data-tab="wiki"]');
  if (wikiBtn) wikiBtn.classList.add('active');
  ['ideas-panel','widgets-panel','dashboard-panel','nexus-panel','pipelines-panel','feed-panel','zoom-overlay','prime-panel','decisions-panel','books-panel','agents-panel'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  const cb = document.getElementById('content-body');
  if (cb) cb.style.display = '';
  // Track nav history for full-path breadcrumb (M6 item 3)
  pushNavHistory(filePath);
  // Show the floating action rail on the right (M6 item 6)
  const rail = document.getElementById('doc-action-rail');
  if (rail) rail.classList.add('visible');
  // Reveal the inline "Edit page" button next to the breadcrumb
  const btnEditInline = document.getElementById('btn-edit-inline');
  if (btnEditInline) btnEditInline.style.display = '';
  // Update voice context if active
  if (window.rtDC && window.rtDC.readyState === 'open') {
    // Fetch article content and send context update to voice
    fetch('/api/file?path=' + encodeURIComponent(filePath))
      .then(r => r.json())
      .then(data => {
        const content = data.content || '';
        const title = filePath.split('/').pop().replace('.md','').replace(/-/g,' ');
        const msg = {
          type: 'conversation.item.create',
          item: {
            type: 'message',
            role: 'user',
            content: [{
              type: 'input_text',
              text: '[Contexto actualizado] El usuario navegó al artículo: ' + title + '\n\nContenido:\n---\n' + content.slice(0, 4000) + '\n---\nTomá nota de este nuevo artículo para las próximas preguntas.'
            }]
          }
        };
        window.rtDC.send(JSON.stringify(msg));
      })
      .catch(() => {});
  }
  // Ocultar siempre el repo-panel — los proyectos se leen como artículos normales
  const rp = document.getElementById('repo-panel');
  if (rp) rp.style.display = 'none';
  // Marcar active y expandir carpetas padre en el tree
  document.querySelectorAll('.tree-file').forEach(el => {
    const isActive = el.dataset.path === filePath;
    el.classList.toggle('active', isActive);
    if (isActive) {
      // Expandir todos los tree-dir ancestros
      let parent = el.parentElement;
      while (parent) {
        if (parent.classList.contains('tree-dir') && !parent.classList.contains('open')) {
          parent.classList.add('open');
        }
        parent = parent.parentElement;
      }
      // Scroll el item al viewport dentro del sidebar
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
    }
  });
  $('#current-path').textContent = filePath;
  // Render breadcrumb
  renderBreadcrumb(filePath);
  // Fetch last-edited
  fetchLastEdited(filePath);
  const res = await fetch('/api/file?path=' + encodeURIComponent(filePath));
  const data = await res.json();
  if (data.error) {
    $('#content-body').innerHTML = '<p style="color:var(--red)">' + esc(data.error) + '</p>';
    return;
  }
  let html = '';
  if (data.frontmatter && Object.keys(data.frontmatter).length) {
    html += '<div class="frontmatter"><dl>';
    for (const [k, v] of Object.entries(data.frontmatter)) {
      html += '<div><dt>' + esc(k) + ':</dt><dd>' + esc(String(v)) + '</dd></div>';
    }
    html += '</dl></div>';
  }
  let rendered = data.html.replace(/\[\[([^\]]+)\]\]/g, '<a class="wikilink" href="#" data-link="$1">$1</a>');
  // Rewrite local image paths → /raw-file?path= so browser can load them
  rendered = rendered.replace(/<img([^>]*?)src="(?!https?:\/\/|\/)([^"]+)"([^>]*?)>/g, 
    (match, pre, src, post) => {
      const clean = src.replace(/^\/raw-file\?path=/, '');
      return '<img' + pre + 'src="/raw-file?path=' + clean + '"' + post + '>';
    });
  // Also handle video tags
  rendered = rendered.replace(/<source([^>]*?)src="(?!https?:\/\/|\/)([^"]+)"([^>]*?)>/g,
    (match, pre, src, post) => '<source' + pre + 'src="/raw-file?path=' + src + '"' + post + '>');
  html += '<div class="md-content">' + rendered + '</div>';
  $('#content-body').innerHTML = html;
  // Bind Globant internal links → KB navigation
  document.querySelectorAll('.kb-internal-link').forEach(a => {
    a.style.color = 'var(--accent)'; a.style.cursor = 'pointer';
    a.addEventListener('click', e => { e.preventDefault(); const p = a.dataset.kbPath; if (p) loadFile(p); });
  });
  promoteHeroImage(document.getElementById('content-body'));
  highlightNewCode(document.getElementById('content-body'));

  document.querySelectorAll('.wikilink').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const target = el.dataset.link;
      // Normalize: "Agent Memory" → "agent-memory", "agent memory" → "agent-memory"
      const normalized = target.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-');
      // Try exact match first, then partial
      const allFiles = document.querySelectorAll('.tree-file');
      let match = null;
      for (const f of allFiles) {
        const fp = (f.dataset.path || '').toLowerCase();
        const fname = fp.split('/').pop().replace('.md', '');
        if (fname === normalized || fname === target.toLowerCase()) { match = f; break; }
      }
      // Fuzzy: contains normalized
      if (!match) {
        for (const f of allFiles) {
          const fp = (f.dataset.path || '').toLowerCase();
          if (fp.includes(normalized)) { match = f; break; }
        }
      }
      if (match) {
        loadFile(match.dataset.path);
      } else {
        // Show tooltip
        el.title = 'Artículo no encontrado: ' + target;
        el.style.opacity = '0.5';
      }
    });
  });

  loadBacklinks(filePath);
  if (window._commentsOnFileLoad) window._commentsOnFileLoad();
}

async function loadBacklinks(filePath) {
  const res = await fetch('/api/backlinks?path=' + encodeURIComponent(filePath));
  const bls = await res.json();
  const panel = $('#backlinks');
  if (bls.length) {
    panel.style.display = 'block';
    panel.innerHTML = '<h3>Backlinks (' + bls.length + ')</h3>' +
      bls.map(b => '<a class="bl-item" href="#" data-path="' + esc(b.path) + '">' + esc(b.name) + '</a>').join('');
    panel.querySelectorAll('.bl-item').forEach(el => {
      el.addEventListener('click', e => { e.preventDefault(); loadFile(el.dataset.path); });
    });
  } else {
    panel.style.display = 'none';
  }
}

// --- Search ---
$('#search-box').addEventListener('input', e => {
  clearTimeout(searchTimer);
  const q = e.target.value.trim();
  if (!q) {
    $('#search-results').style.display = 'none';
    $('#file-tree').style.display = 'block';
    return;
  }
  searchTimer = setTimeout(async () => {
    const res = await fetch('/api/search?q=' + encodeURIComponent(q));
    const results = await res.json();
    $('#file-tree').style.display = 'none';
    const sr = $('#search-results');
    sr.style.display = 'block';
    if (!results.length) {
      sr.innerHTML = '<p style="color:var(--subtext);font-size:12px;padding:8px">No results</p>';
      return;
    }
    const currentQ = q;
    sr.innerHTML = results.map(r => {
      // Highlight query in snippet
      const snip = r.snippet || '';
      const re = new RegExp('(' + currentQ.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      const highlighted = esc(snip).replace(re, '<mark style="background:rgba(249,226,175,0.2);color:#f9e2af;border-radius:3px;padding:1px 2px;">$1</mark>');
      const name = r.name || r.path.split('/').pop().replace('.md','');
      return '<div class="search-hit" data-path="' + esc(r.path) + '" data-line="' + (r.line||0) + '" data-q="' + esc(currentQ) + '">'
        + '<div class="sh-name">📄 ' + esc(name) + '</div>'
        + '<div class="sh-path">' + esc(r.path) + '</div>'
        + '<div class="sh-snippet">' + highlighted + '</div>'
        + '</div>';
    }).join('');
    sr.querySelectorAll('.search-hit').forEach(el => {
      el.addEventListener('click', () => {
        const filePath = el.dataset.path;
        const lineNum = parseInt(el.dataset.line) || 0;
        const searchQ = el.dataset.q;
        loadFile(filePath).then(() => {
          // Highlight search term in the article
          if (searchQ) {
            setTimeout(() => {
              const contentBody = document.getElementById('content-body');
              if (!contentBody) return;
              // Find and highlight text
              const walker = document.createTreeWalker(contentBody, NodeFilter.SHOW_TEXT);
              const re = new RegExp(searchQ.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
              const nodesToReplace = [];
              let node;
              while (node = walker.nextNode()) {
                if (re.test(node.textContent)) nodesToReplace.push(node);
              }
              nodesToReplace.forEach(textNode => {
                const span = document.createElement('span');
                span.innerHTML = textNode.textContent.replace(re, '<mark class="kb-search-hl" style="background:rgba(249,226,175,0.25);color:#f9e2af;border-radius:3px;padding:1px 3px;">$&</mark>');
                textNode.parentNode.replaceChild(span, textNode);
              });
              // Scroll to first highlight
              const first = contentBody.querySelector('.kb-search-hl');
              if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
          }
        });
        $('#search-box').value = '';
        sr.style.display = 'none';
        $('#file-tree').style.display = 'block';
      });
    });
  }, 300);
});

// --- Graph fullscreen modal ---
$('#btn-graph').addEventListener('click', () => openGraph());
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeGraph(); });

function openGraph() {
  const modal = $('#graph-modal');
  modal.classList.add('open');
  loadGraph();
}
function closeGraph() {
  $('#graph-modal').classList.remove('open');
  $('#connection-inspector').classList.remove('open');
}
$('#btn-close-graph').addEventListener('click', closeGraph);

async function loadGraph() {
  const container = $('#graph-svg-container');
  container.innerHTML = '';

  const res = await fetch('/api/graph');
  graphData = await res.json();
  const { nodes, edges } = graphData;

  const w = window.innerWidth;
  const h = window.innerHeight - 52;

  // Update stats
  const statsEl = document.getElementById('graph-stats');
  if (statsEl) statsEl.textContent = nodes.length + ' nodos \u00B7 ' + edges.length + ' edges';

  const svg = d3.select(container).append('svg')
    .attr('width', w).attr('height', h)
    .style('background', '#050508');
  graphSvg = svg;

  const g = svg.append('g');

  // Zoom behavior
  graphZoom = d3.zoom().scaleExtent([0.1, 8]).on('zoom', e => g.attr('transform', e.transform));
  svg.call(graphZoom);

  const sim = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(edges).id(d => d.id).distance(100))
    .force('charge', d3.forceManyBody().strength(-200))
    .force('center', d3.forceCenter(w / 2, h / 2))
    .force('collision', d3.forceCollide(20));

  const link = g.append('g').selectAll('line').data(edges).join('line')
    .attr('stroke', d => d.weak ? '#1e1e3e' : '#3a3a6a')
    .attr('stroke-width', d => d.weak ? 0.5 : 1.5)
    .attr('stroke-dasharray', d => d.weak ? '3,3' : null)
    .attr('opacity', d => d.weak ? 0.3 : 0.7);

  const colorMap = { concepts: '#cba6f7', tools: '#a6e3a1', research: '#f9e2af', project: '#89b4fa', wiki: '#cba6f7', raw: '#585880' };

  const node = g.append('g').selectAll('g').data(nodes).join('g')
    .style('cursor', 'pointer')
    .call(d3.drag()
      .on('start', (e, d) => { if (!e.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
      .on('drag', (e, d) => { d.fx = e.x; d.fy = e.y; })
      .on('end', (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }));

  node.append('circle')
    .attr('r', d => d.group === 'concepts' ? 14 : d.group === 'project' ? 10 : d.group === 'tools' || d.group === 'research' ? 12 : 7)
    .attr('fill', d => colorMap[d.group] || '#cba6f7')
    .attr('stroke', '#1e1e2e').attr('stroke-width', 2)
    .attr('opacity', 0.9);

  node.append('text')
    .text(d => d.name.length > 20 ? d.name.slice(0, 18) + '..' : d.name)
    .attr('font-size', 11).attr('fill', '#cdd6f4')
    .attr('dx', 13).attr('dy', 4)
    .style('pointer-events', 'none');

  // Click node: zoom into it
  node.on('click', (e, d) => {
    e.stopPropagation();
    const scale = 2.5;
    const svgW = +svg.attr('width');
    const svgH = +svg.attr('height');
    svg.transition().duration(500).call(
      graphZoom.transform,
      d3.zoomIdentity.translate(svgW/2 - d.x*scale, svgH/2 - d.y*scale).scale(scale)
    );
  });

  // Double-click node: open article
  node.on('dblclick', (e, d) => {
    e.stopPropagation();
    closeGraph();
    switchToWiki();
    loadFile(d.id);
  });

  // Hover: highlight + connection inspector
  node.on('mouseover', (e, d) => {
    link.attr('opacity', l => (l.source.id === d.id || l.target.id === d.id) ? 1 : 0.1)
        .attr('stroke', l => (l.source.id === d.id || l.target.id === d.id) ? '#cba6f7' : '#2a2a4a');
    node.select('circle').attr('opacity', n => {
      const connected = edges.some(l => (l.source.id === d.id && l.target.id === n.id) || (l.target.id === d.id && l.source.id === n.id));
      return (n.id === d.id || connected) ? 1 : 0.3;
    });
    showConnectionInspector(d, edges);
  }).on('mouseout', () => {
    link.attr('opacity', d => d.weak ? 0.3 : 0.7).attr('stroke', d => d.weak ? '#1e1e3e' : '#3a3a6a');
    node.select('circle').attr('opacity', 0.9);
  });

  // Legend — bottom-left
  const legendY = h - Object.keys(colorMap).length * 22 - 16;
  const legend = svg.append('g').attr('transform', 'translate(16,' + legendY + ')');
  legend.append('rect').attr('x', -8).attr('y', -10).attr('width', 100).attr('height', Object.keys(colorMap).length * 22 + 12).attr('rx', 8).attr('fill', 'rgba(5,5,8,0.7)');
  Object.entries(colorMap).forEach(([type, color], i) => {
    legend.append('circle').attr('cx', 6).attr('cy', i*22+6).attr('r', 5).attr('fill', color);
    legend.append('text').attr('x', 18).attr('y', i*22+10).attr('font-size', 11).attr('fill', '#8b8fa8').attr('font-family', 'Inter, sans-serif').text(type);
  });

  sim.on('tick', () => {
    link.attr('x1', d => d.source.x).attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
    node.attr('transform', d => `translate(${d.x},${d.y})`);
  });

  // Zoom buttons
  $('#btn-zoom-in').onclick = () => svg.transition().duration(300).call(graphZoom.scaleBy, 1.5);
  $('#btn-zoom-out').onclick = () => svg.transition().duration(300).call(graphZoom.scaleBy, 0.67);
  $('#btn-zoom-reset').onclick = () => svg.transition().duration(500).call(graphZoom.transform, d3.zoomIdentity);
}

// --- Connection Inspector ---
function showConnectionInspector(d, edges) {
  const ci = $('#connection-inspector');
  ci.classList.add('open');
  const backlinks = edges.filter(e => e.target.id === d.id && !e.weak).map(e => e.source);
  const fwdlinks = edges.filter(e => e.source.id === d.id && !e.weak).map(e => e.target);

  let html = '<div class="ci-header"><h4>' + esc(d.name) + '</h4><span class="ci-group">' + esc(d.group) + ' &middot; ' + esc(d.id) + '</span></div>';

  html += '<div class="ci-section"><h5>Backlinks (' + backlinks.length + ')</h5>';
  if (backlinks.length) {
    html += backlinks.map(n => '<a class="ci-link" data-id="' + esc(n.id) + '">' + esc(n.name) + '</a>').join('');
  } else {
    html += '<div class="ci-empty">No backlinks</div>';
  }
  html += '</div>';

  html += '<div class="ci-section"><h5>Forward links (' + fwdlinks.length + ')</h5>';
  if (fwdlinks.length) {
    html += fwdlinks.map(n => '<a class="ci-link" data-id="' + esc(n.id) + '">' + esc(n.name) + '</a>').join('');
  } else {
    html += '<div class="ci-empty">No forward links</div>';
  }
  html += '</div>';

  html += '<button class="ci-open-btn" data-id="' + esc(d.id) + '">Open article</button>';

  ci.querySelector('.ci-body').innerHTML = html;

  ci.querySelectorAll('.ci-link').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      closeGraph();
      switchToWiki();
      loadFile(el.dataset.id);
    });
  });
  ci.querySelector('.ci-open-btn').addEventListener('click', () => {
    closeGraph();
    switchToWiki();
    loadFile(d.id);
  });
}

// --- Ideas Panel ---
let ideasCache = null;

async function loadIdeas() {
  const panel = $('#ideas-panel');
  panel.innerHTML = '<div style="padding:20px;color:var(--subtext)">Loading ideas...</div>';

  try {
    const res = await fetch('/api/ideas');
    ideasCache = await res.json();
  } catch(e) {
    panel.innerHTML = '<div style="padding:20px;color:var(--red)">Failed to load ideas</div>';
    return;
  }

  if (!ideasCache.length) {
    panel.innerHTML = '<div class="ideas-header"><h2>Ideas</h2><button id="btn-gen-ideas">Generate new ideas</button></div><div style="color:var(--subtext);padding:20px">No ideas yet. Generate some!</div>';
    bindGenButton();
    return;
  }

  let html = '<div class="ideas-header"><h2>Ideas</h2><button id="btn-gen-ideas">Generate new ideas</button></div>';

  ideasCache.forEach((idea, idx) => {
    // Extract first paragraph as preview
    const previewText = (idea.content || '').replace(/^---[\s\S]*?---\s*/, '').split('\n').filter(l => l.trim() && !l.startsWith('#')).slice(0, 2).join(' ').slice(0, 140);
    html += '<div class="idea-card" data-idx="' + idx + '" data-date="' + esc(String(idea.date)) + '">'
      + '<div class="idea-card-header">'
      + '<div style="flex:1;min-width:0;"><span class="idea-title">' + esc(idea.concept || idea.filename) + '</span>'
      + (previewText ? '<div style="font-size:12px;color:var(--subtext);margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + esc(previewText) + '</div>' : '')
      + '</div>'
      + '<div class="idea-meta"><span class="idea-date">' + esc(String(idea.date)) + '</span>'
      + '<span>' + esc(String(idea.sources)) + '</span>'
      + '<span class="idea-arrow">&#9654;</span></div>'
      + '</div>'
      + '<div class="idea-card-body">'
      + '<div class="idea-card-content">'
      + '<div class="md-content">' + idea.html + '</div>'
      + '<div class="idea-chat" id="chat-' + idx + '">'
      + '<div class="idea-plan-bar" style="display:flex;gap:10px;margin-bottom:14px;padding:10px 0;border-bottom:1px solid var(--surface2);">'
      + '<button class="idea-plan-btn" onclick="planIdea(' + idx + ')" style="background:var(--accent);border:none;border-radius:8px;padding:8px 18px;color:var(--bg);font-weight:700;cursor:pointer;font-size:12px;font-family:Inter,sans-serif;transition:all 150ms ease;">&#x1F4CB; Planear</button>'
      + '<button class="idea-send-btn" onclick="sendPlanToTonga(' + idx + ')" style="background:var(--surface2);border:1px solid var(--surface3);border-radius:8px;padding:8px 18px;color:var(--text);cursor:pointer;font-size:12px;display:none;font-family:Inter,sans-serif;" id="send-plan-btn-' + idx + '">&#x1F680; Enviar a Tonga</button>'
      + '</div>'
      + '<div class="idea-plan-content md-content" id="plan-content-' + idx + '" style="display:none;margin-bottom:16px;padding:12px;background:var(--bg);border-radius:8px;border:1px solid var(--surface2);font-size:13px;"></div>'
      + '<div class="idea-chat-header"><h4>Chat</h4></div>'
      + '<div class="idea-chat-messages" id="chat-msgs-' + idx + '"></div>'
      + '<div class="idea-chat-input">'
      + '<input type="text" placeholder="Preguntá sobre esta idea..." id="chat-input-' + idx + '" />'
      + '<button onclick="sendIdeaChat(' + idx + ')">Enviar</button>'
      + '</div></div>'
      + '</div>'
      + '<div class="idea-mini-graph-wrap">'
      + '<div class="mini-graph-header"><span>Grafo</span><button class="mini-graph-expand" onclick="expandIdeaGraph(' + idx + ')">⛶ Expandir</button></div>'
      + '<div class="idea-mini-graph" id="mini-graph-' + idx + '"></div>'
      + '</div>'
      + '</div></div>';
  });

  panel.innerHTML = html;

  panel.querySelectorAll('.idea-card-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.parentElement;
      const wasOpen = card.classList.contains('open');
      card.classList.toggle('open');
      if (!wasOpen) {
        const idx = parseInt(card.dataset.idx);
        renderMiniGraph(idx, ideasCache[idx]);
        loadChatHistory(idx, ideasCache[idx]);
      }
    });
  });

  // Enter key sends chat
  panel.querySelectorAll('.idea-chat-input input').forEach(input => {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const idx = parseInt(input.id.replace('chat-input-', ''));
        sendIdeaChat(idx);
      }
    });
  });

  bindGenButton();
}

function bindGenButton() {
  const btn = $('#btn-gen-ideas');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    btn.disabled = true;
    btn.textContent = 'Generating...';
    try {
      await fetch('/api/generate-ideas', { method: 'POST' });
      ideasCache = null;
      await loadIdeas();
    } catch(e) {
      btn.textContent = 'Error - retry';
      btn.disabled = false;
    }
  });
}

async function renderMiniGraph(idx, idea) {
  const container = document.getElementById('mini-graph-' + idx);
  if (!container || container.querySelector('svg')) return;

  // Fetch graph data if not cached
  if (!graphData) {
    const res = await fetch('/api/graph');
    graphData = await res.json();
  }

  const { nodes, edges } = graphData;

  // Extract concept keywords from idea content
  const ideaText = idea.content.toLowerCase();
  const mentionedNodes = nodes.filter(n => {
    const words = n.name.toLowerCase().split(/\s+/);
    return words.some(w => w.length > 3 && ideaText.includes(w)) || ideaText.includes(n.name.toLowerCase());
  });
  const mentionedIds = new Set(mentionedNodes.map(n => n.id));

  // Get connected nodes
  const connectedIds = new Set();
  edges.forEach(e => {
    const sid = typeof e.source === 'object' ? e.source.id : e.source;
    const tid = typeof e.target === 'object' ? e.target.id : e.target;
    if (mentionedIds.has(sid)) connectedIds.add(tid);
    if (mentionedIds.has(tid)) connectedIds.add(sid);
  });
  mentionedIds.forEach(id => connectedIds.add(id));

  // Build subgraph
  const subNodes = nodes.filter(n => connectedIds.has(n.id)).map(n => ({...n, x: undefined, y: undefined}));
  if (subNodes.length === 0) {
    container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--subtext);font-size:11px">No related concepts</div>';
    return;
  }
  const subIds = new Set(subNodes.map(n => n.id));
  const subEdges = edges.filter(e => {
    const sid = typeof e.source === 'object' ? e.source.id : e.source;
    const tid = typeof e.target === 'object' ? e.target.id : e.target;
    return subIds.has(sid) && subIds.has(tid);
  }).map(e => ({
    source: typeof e.source === 'object' ? e.source.id : e.source,
    target: typeof e.target === 'object' ? e.target.id : e.target,
    weak: e.weak
  }));

  const w = 300, h = 200;
  const svg = d3.select(container).append('svg').attr('width', w).attr('height', h).style('background', '#050508');
  const g = svg.append('g');
  svg.call(d3.zoom().scaleExtent([0.3, 4]).on('zoom', e => g.attr('transform', e.transform)));

  const colorMap = { concepts: '#cba6f7', tools: '#a6e3a1', research: '#f9e2af', project: '#89b4fa', wiki: '#cba6f7', raw: '#585880' };

  const sim = d3.forceSimulation(subNodes)
    .force('link', d3.forceLink(subEdges).id(d => d.id).distance(40))
    .force('charge', d3.forceManyBody().strength(-80))
    .force('center', d3.forceCenter(w / 2, h / 2))
    .force('collision', d3.forceCollide(12));

  const mlink = g.append('g').selectAll('line').data(subEdges).join('line')
    .attr('stroke', '#3a3a6a').attr('stroke-width', 1).attr('opacity', 0.5);

  const mnode = g.append('g').selectAll('g').data(subNodes).join('g').style('cursor', 'pointer');

  mnode.append('circle')
    .attr('r', d => mentionedIds.has(d.id) ? 8 : 5)
    .attr('fill', d => colorMap[d.group] || '#cba6f7')
    .attr('stroke', d => mentionedIds.has(d.id) ? '#fff' : '#1e1e2e')
    .attr('stroke-width', d => mentionedIds.has(d.id) ? 2 : 1)
    .attr('opacity', d => mentionedIds.has(d.id) ? 1 : 0.5);

  mnode.append('text')
    .text(d => d.name.length > 14 ? d.name.slice(0, 12) + '..' : d.name)
    .attr('font-size', 8).attr('fill', d => mentionedIds.has(d.id) ? '#fff' : '#888')
    .attr('dx', 10).attr('dy', 3).style('pointer-events', 'none');

  mnode.on('click', (e, d) => {
    e.stopPropagation();
    switchToWiki();
    loadFile(d.id);
  });

  sim.on('tick', () => {
    mlink.attr('x1', d => d.source.x).attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
    mnode.attr('transform', d => `translate(${d.x},${d.y})`);
  });
}

// --- Widgets Panel ---
let widgetsCache = null;
let currentWidgetHtml = null;
let currentWidgetFile = null;

async function loadWidgets() {
  const panel = $('#widgets-panel');
  if (!panel) return;

  let html = '<div class="widgets-header"><h2>&#x1F52E; Widgets</h2></div>';
  html += '<div class="widget-gen-form">';
  html += '<div class="wg-row"><input type="text" id="widget-prompt" placeholder="Describ\u00ed la visualizaci\u00f3n que quer\u00e9s..." />';
  html += '<select id="widget-lib"><option value="auto">Auto</option><option value="chartjs">Chart.js</option><option value="d3">D3.js</option><option value="observable">Observable</option><option value="mermaid">Mermaid</option></select>';
  html += '<button id="btn-gen-widget">&#x2728; Generar</button></div></div>';
  html += '<div class="widget-preview" id="widget-preview"><iframe id="widget-iframe" sandbox="allow-scripts allow-same-origin"></iframe></div>';
  html += '<div class="widget-save-bar" id="widget-save-bar"><button class="ws-save" id="btn-save-widget">&#x1F4BE; Guardar widget</button><button class="ws-regen" id="btn-regen-widget">&#x1F504; Regenerar</button></div>';
  html += '<h3 style="font-size:14px;color:var(--subtext);margin-bottom:12px;">Widgets guardados</h3>';
  html += '<div class="widgets-grid" id="widgets-grid"></div>';

  panel.innerHTML = html;

  // Bind generate button
  document.getElementById('btn-gen-widget').addEventListener('click', generateWidget);
  document.getElementById('widget-prompt').addEventListener('keydown', e => {
    if (e.key === 'Enter') generateWidget();
  });

  // Load saved widgets
  try {
    const res = await fetch('/api/widgets');
    widgetsCache = await res.json();
  } catch { widgetsCache = []; }

  const grid = document.getElementById('widgets-grid');
  if (!widgetsCache.length) {
    grid.innerHTML = '<p style="color:var(--subtext);font-size:12px">No hay widgets a\u00fan. Gener\u00e1 uno!</p>';
    return;
  }

  grid.innerHTML = widgetsCache.map(w =>
    '<div class="widget-card" data-file="' + esc(w.file) + '">'
    + '<div class="wc-preview"><iframe sandbox="allow-scripts" src="/api/widget-html?file=' + encodeURIComponent(w.file) + '"></iframe></div>'
    + '<div class="wc-info"><div class="wc-name">' + esc(w.name) + '</div>'
    + '<div class="wc-date">' + new Date(w.created).toLocaleDateString() + '</div></div></div>'
  ).join('');

  grid.querySelectorAll('.widget-card').forEach(card => {
    card.addEventListener('click', async () => {
      const file = card.dataset.file;
      const res = await fetch('/api/widget-content?file=' + encodeURIComponent(file));
      const data = await res.json();
      if (data.html_content) {
        showWidgetPreview(data.html_content, file);
      }
    });
  });
}

async function generateWidget() {
  const prompt = document.getElementById('widget-prompt').value.trim();
  if (!prompt) return;

  const lib = document.getElementById('widget-lib').value;
  const btn = document.getElementById('btn-gen-widget');
  btn.disabled = true;
  btn.textContent = 'Generando...';

  const fullPrompt = lib !== 'auto' ? prompt + ' (us\u00e1 ' + lib + ')' : prompt;

  try {
    const res = await fetch('/api/generate-widget', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: fullPrompt })
    });
    const data = await res.json();
    if (data.ok) {
      showWidgetPreview(data.html_content, data.file_path);
      currentWidgetFile = data.file_path;
      // Already saved by backend, show save bar as confirmation
      const saveBar = document.getElementById('widget-save-bar');
      saveBar.style.display = 'flex';
      document.getElementById('btn-save-widget').textContent = '\u2713 Guardado';
      document.getElementById('btn-save-widget').disabled = true;
      document.getElementById('btn-regen-widget').onclick = generateWidget;
      // Refresh grid
      const gridRes = await fetch('/api/widgets');
      widgetsCache = await gridRes.json();
      refreshWidgetsGrid();
    } else {
      alert('Error: ' + (data.error || 'unknown'));
    }
  } catch (err) {
    alert('Error: ' + err.message);
  }

  btn.disabled = false;
  btn.textContent = '\u2728 Generar';
}

function showWidgetPreview(htmlContent, file) {
  currentWidgetHtml = htmlContent;
  const preview = document.getElementById('widget-preview');
  preview.style.display = 'block';
  const iframe = document.getElementById('widget-iframe');
  iframe.srcdoc = htmlContent;
}

function refreshWidgetsGrid() {
  const grid = document.getElementById('widgets-grid');
  if (!grid || !widgetsCache) return;
  if (!widgetsCache.length) {
    grid.innerHTML = '<p style="color:var(--subtext);font-size:12px">No hay widgets a\u00fan.</p>';
    return;
  }
  grid.innerHTML = widgetsCache.map(w =>
    '<div class="widget-card" data-file="' + esc(w.file) + '">'
    + '<div class="wc-preview"><iframe sandbox="allow-scripts" src="/api/widget-html?file=' + encodeURIComponent(w.file) + '"></iframe></div>'
    + '<div class="wc-info"><div class="wc-name">' + esc(w.name) + '</div>'
    + '<div class="wc-date">' + new Date(w.created).toLocaleDateString() + '</div></div></div>'
  ).join('');
  grid.querySelectorAll('.widget-card').forEach(card => {
    card.addEventListener('click', async () => {
      const file = card.dataset.file;
      const res = await fetch('/api/widget-content?file=' + encodeURIComponent(file));
      const data = await res.json();
      if (data.html_content) showWidgetPreview(data.html_content, file);
    });
  });
}

function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

// --- Breadcrumb (M6 item 3: full navigation history, clickable) ---
window._navHistory = window._navHistory || [];
const NAV_HISTORY_MAX = 8;

function labelFromPath(filePath) {
  return (filePath || '').split('/').pop().replace(/\.md$/, '').replace(/-/g, ' ');
}

function pushNavHistory(filePath) {
  if (!filePath) return;
  const last = window._navHistory[window._navHistory.length - 1];
  if (last && last.path === filePath) return; // dedup consecutive
  window._navHistory.push({ path: filePath, label: labelFromPath(filePath), at: Date.now() });
  if (window._navHistory.length > NAV_HISTORY_MAX) {
    window._navHistory = window._navHistory.slice(-NAV_HISTORY_MAX);
  }
  renderBreadcrumb(filePath);
}

function clearNavHistory() {
  window._navHistory = [];
  renderBreadcrumb(null);
}

function renderBreadcrumb(filePath) {
  const bc = document.getElementById('breadcrumb');
  if (!bc) return;
  const history = window._navHistory || [];
  const parts = [];
  // Anchor: Home (always first)
  parts.push({ path: null, label: 'Home', kind: 'home' });
  if (history.length === 0) {
    if (filePath) {
      parts.push({ path: filePath, label: labelFromPath(filePath), kind: 'current' });
    } else {
      parts.push({ path: null, label: 'Select a file', kind: 'empty' });
    }
  } else {
    history.forEach((h, i) => {
      parts.push({
        path: h.path,
        label: h.label,
        kind: i === history.length - 1 ? 'current' : 'trail',
      });
    });
  }

  let html = '';
  parts.forEach((p, i) => {
    if (i > 0) html += '<span class="bc-sep">&#x203A;</span>';
    if (p.kind === 'home') {
      html += '<button class="bc-part bc-home" onclick="clearNavHistory(); switchToWiki();" title="Home"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></button>';
    } else if (p.kind === 'current') {
      html += '<span class="bc-current">' + esc(p.label) + '</span>';
    } else if (p.kind === 'empty') {
      html += '<span class="bc-part" style="color:var(--subtext)">' + esc(p.label) + '</span>';
    } else {
      html += '<button class="bc-part bc-link" onclick="loadFile(\'' + esc(p.path).replace(/'/g, "\\'") + '\')">' + esc(p.label) + '</button>';
    }
  });
  bc.innerHTML = html;
}

window.pushNavHistory = pushNavHistory;
window.clearNavHistory = clearNavHistory;

// --- Permalinks: sync URL ↔ app state via History API ---
// Supported URL formats:
//   /                            → home (wiki hub)
//   /<tabname>                   → non-wiki tabs: /ideas /prime /decisions /dashboard /widgets /feed /nexus /pipelines
//   /w/<filepath>                → wiki file permalink (e.g. /w/wiki/concepts/agent-memory.md)
//   /?p=<filepath>               → legacy query-string form, still supported for shared links
//   /?tab=<tab>                  → legacy query-string form
const KNOWN_TABS = ['dashboard','wiki','ideas','widgets','nexus','feed','pipelines','prime','decisions','books','agents'];

function applyUrlState() {
  const pathname = location.pathname;
  const params = new URLSearchParams(location.search);

  // Pathname takes precedence: /w/<file>, /book/<slug>, or /<tab>
  if (pathname.startsWith('/w/')) {
    const filePath = decodeURIComponent(pathname.slice(3));
    const wikiBtn = document.querySelector('.tab-btn[data-tab="wiki"]');
    if (wikiBtn) wikiBtn.classList.add('active');
    loadFile(filePath, { fromPopState: true });
    return;
  }
  if (pathname.startsWith('/book/')) {
    const slug = decodeURIComponent(pathname.slice(6).replace(/\/$/, ''));
    if (slug) {
      // Fetch + render the cached book
      fetch('/api/books/' + encodeURIComponent(slug))
        .then((r) => r.json())
        .then((d) => {
          if (d.ok && d.book) renderBook(d.book, d.topic || slug);
          else showHome();
        })
        .catch(() => showHome());
    }
    return;
  }
  const m = pathname.match(/^\/([a-z]+)\/?$/);
  if (m && KNOWN_TABS.includes(m[1])) {
    const tab = m[1];
    if (tab === 'wiki') {
      // Treat /wiki as home
      showHome();
      return;
    }
    const btn = document.querySelector('.tab-btn[data-tab="' + tab + '"]');
    if (btn) {
      const ev = new MouseEvent('click', { bubbles: true });
      ev._fromPopState = true;
      btn.dispatchEvent(ev);
    }
    return;
  }

  // Legacy query-string fallback
  const p = params.get('p');
  const tab = params.get('tab');
  if (p) {
    const wikiBtn = document.querySelector('.tab-btn[data-tab="wiki"]');
    if (wikiBtn) wikiBtn.classList.add('active');
    loadFile(p, { fromPopState: true });
    return;
  }
  if (tab) {
    const btn = document.querySelector('.tab-btn[data-tab="' + tab + '"]');
    if (btn) {
      const ev = new MouseEvent('click', { bubbles: true });
      ev._fromPopState = true;
      btn.dispatchEvent(ev);
    }
    return;
  }

  // No match: home
  showHome();
}

function showHome() {
  clearNavHistory();
  const wikiBtn = document.querySelector('.tab-btn[data-tab="wiki"]');
  if (wikiBtn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    wikiBtn.classList.add('active');
  }
  const cb = document.getElementById('content-body');
  if (cb) cb.style.display = '';
  ['dashboard-panel','ideas-panel','widgets-panel','nexus-panel','pipelines-panel','feed-panel','prime-panel','decisions-panel','books-panel','agents-panel'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
}

window.addEventListener('popstate', () => { applyUrlState(); });

// Initial URL application — runs after tree is loaded so file clicks can still resolve
document.addEventListener('DOMContentLoaded', () => {
  // Apply initial URL state after a short tick so tree + initial handlers are wired
  setTimeout(() => {
    const pathname = location.pathname;
    const params = new URLSearchParams(location.search);
    const hasPathRoute = pathname !== '/' || params.get('p') || params.get('tab');
    if (hasPathRoute) applyUrlState();
  }, 180);
});
window.applyUrlState = applyUrlState;

// --- M6 item 5: Home hub dynamic content ---
async function loadHomeHub() {
  try {
    // Stats: raw + wiki counts from /api/knowledge/stats, ADRs from /api/decisions, ideas count from /api/ideas
    const [statsRes, adrsRes, ideasRes, filesRes] = await Promise.all([
      fetch('/api/knowledge/stats').catch(() => null),
      fetch('/api/decisions').catch(() => null),
      fetch('/api/ideas').catch(() => null),
      fetch('/api/files').catch(() => null),
    ]);
    const stats = statsRes?.ok ? await statsRes.json() : null;
    const adrs = adrsRes?.ok ? await adrsRes.json() : null;
    const ideas = ideasRes?.ok ? await ideasRes.json() : null;
    const tree = filesRes?.ok ? await filesRes.json() : null;

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val ?? '—'; };
    set('hh-raw', stats?.warehouse?.raw_count);
    set('hh-wiki', stats?.warehouse?.wiki_count);
    set('hh-adrs', adrs?.count);
    set('hh-ideas', Array.isArray(ideas) ? ideas.length : (ideas?.count ?? '—'));

    // Recently updated: walk the tree, take wiki files, pick the most recent by path heuristic
    const recent = el => el && (el.innerHTML = '');
    recent(document.getElementById('home-recent'));
    if (tree) {
      const wikiFiles = [];
      const walk = (nodes) => {
        for (const n of nodes || []) {
          if (n.type === 'dir') walk(n.children);
          else if (n.type === 'file' && n.path.startsWith('wiki/')) wikiFiles.push(n);
        }
      };
      walk(tree);
      // We don't have mtimes from /api/files, so pick the last 6 alphabetically as a proxy (most recently named tend to sort last)
      const picked = wikiFiles.slice(-6).reverse();
      const recentEl = document.getElementById('home-recent');
      if (recentEl) {
        recentEl.innerHTML = picked.map(f => {
          const label = labelFromPath(f.path);
          return `<div class="home-recent-item" onclick="loadFile('${esc(f.path).replace(/'/g, "\\'")}')">
            <i data-lucide="file-text"></i>
            <span>${esc(label)}</span>
            <span class="path">${esc(f.path)}</span>
          </div>`;
        }).join('') || '<div style="color:var(--subtext);font-size:12px;">Wiki is empty</div>';
      }
    }

    // Latest ideas
    const ideasEl = document.getElementById('home-latest-ideas');
    if (ideasEl && Array.isArray(ideas)) {
      const latest = ideas.slice(0, 4);
      ideasEl.innerHTML = latest.map(i => {
        const title = i.title || i.name || (i.path ? i.path.split('/').pop() : 'idea');
        return `<div class="home-recent-item" onclick="document.querySelector('[data-tab=\\'ideas\\']').click()">
          <i data-lucide="lightbulb"></i>
          <span>${esc(title)}</span>
          <span class="path">${esc(i.date || i.path || '')}</span>
        </div>`;
      }).join('') || '<div style="color:var(--subtext);font-size:12px;">No ideas yet</div>';
    }

    if (window.lucide) lucide.createIcons();
  } catch (e) { /* silent */ }
}
window.loadHomeHub = loadHomeHub;

// --- M6 item 1: New Page modal handlers ---
let _npmMessages = [];
function openNewPageModal() {
  const m = document.getElementById('new-page-modal');
  if (!m) return;
  m.classList.add('visible');
  document.getElementById('npm-title').value = '';
  document.getElementById('npm-editor').value = '';
  document.getElementById('npm-chat-messages').innerHTML = '<div class="npm-msg system">Ask the assistant to draft sections for you. Press Insert to paste each reply into the editor.</div>';
  _npmMessages = [];
  setTimeout(() => document.getElementById('npm-title').focus(), 60);
  if (window.lucide) lucide.createIcons();
}
function closeNewPageModal() {
  document.getElementById('new-page-modal').classList.remove('visible');
}
async function sendNewPageChat() {
  const inputEl = document.getElementById('npm-chat-input');
  const text = inputEl.value.trim();
  if (!text) return;
  inputEl.value = '';
  const messagesEl = document.getElementById('npm-chat-messages');
  _npmMessages.push({ role: 'user', content: text });
  messagesEl.innerHTML += `<div class="npm-msg user">${esc(text)}</div>`;
  messagesEl.innerHTML += `<div class="npm-msg assistant" id="npm-thinking">...</div>`;
  messagesEl.scrollTop = messagesEl.scrollHeight;
  try {
    const title = document.getElementById('npm-title').value.trim();
    const res = await fetch('/api/chat-compose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: _npmMessages, title }),
    });
    const data = await res.json();
    const thinking = document.getElementById('npm-thinking');
    if (thinking) thinking.remove();
    if (data.ok) {
      _npmMessages.push({ role: 'assistant', content: data.reply });
      const msgDiv = document.createElement('div');
      msgDiv.className = 'npm-msg assistant';
      const safeReply = esc(data.reply);
      msgDiv.innerHTML = safeReply.replace(/\n/g, '<br>') +
        `<div style="margin-top:8px;display:flex;gap:6px;">
          <button onclick="npmInsertReply(this)" style="background:var(--accent);color:var(--accent-fg);border:none;padding:4px 10px;border-radius:4px;font-size:10px;font-weight:700;cursor:pointer;"><i data-lucide="arrow-left" style="width:10px;height:10px;"></i> Insert</button>
          <button onclick="navigator.clipboard.writeText(this.parentElement.parentElement.dataset.raw || '').then(()=>primeToast('Copiado','clipboard-check'))" style="background:var(--surface2);color:var(--text);border:1px solid var(--surface3);padding:4px 10px;border-radius:4px;font-size:10px;cursor:pointer;"><i data-lucide="copy" style="width:10px;height:10px;"></i> Copy</button>
        </div>`;
      msgDiv.dataset.raw = data.reply;
      messagesEl.appendChild(msgDiv);
      if (window.lucide) lucide.createIcons();
    } else {
      messagesEl.innerHTML += `<div class="npm-msg system" style="color:var(--red)">Error: ${esc(data.error || 'unknown')}</div>`;
    }
  } catch (e) {
    const thinking = document.getElementById('npm-thinking');
    if (thinking) thinking.remove();
    messagesEl.innerHTML += `<div class="npm-msg system" style="color:var(--red)">Error: ${esc(e.message)}</div>`;
  }
  messagesEl.scrollTop = messagesEl.scrollHeight;
}
function npmInsertReply(btn) {
  const msgDiv = btn.closest('.npm-msg');
  const raw = msgDiv?.dataset?.raw || '';
  const editor = document.getElementById('npm-editor');
  if (!editor) return;
  const prev = editor.value;
  editor.value = prev ? (prev + '\n\n' + raw) : raw;
  editor.focus();
  primeToast('Insertado en el editor', 'check');
}
async function saveNewPage() {
  const title = document.getElementById('npm-title').value.trim();
  const body = document.getElementById('npm-editor').value.trim();
  if (!title) { primeToast('Title required', 'alert-triangle'); return; }
  if (!body) { primeToast('Body required', 'alert-triangle'); return; }
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
  const filePath = `wiki/concepts/${slug}.md`;
  const content = `---
title: ${title}
category: concept
source: new-page
created: ${new Date().toISOString().slice(0, 10)}
---

${body}
`;
  try {
    const res = await fetch('/api/article/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filePath, content }),
    });
    const data = await res.json();
    if (data.ok) {
      primeToast(`Saved to ${filePath}`, 'save');
      closeNewPageModal();
      setTimeout(() => { loadTree().then(() => loadFile(filePath)); }, 250);
    } else {
      primeToast(data.error || 'Error saving', 'alert-triangle');
    }
  } catch (e) {
    primeToast(e.message, 'alert-triangle');
  }
}
window.openNewPageModal = openNewPageModal;
window.closeNewPageModal = closeNewPageModal;
window.sendNewPageChat = sendNewPageChat;
window.npmInsertReply = npmInsertReply;
window.saveNewPage = saveNewPage;

// ─── Book About feature ───────────────────────────────────────────────────
// Open a modal asking for a learning topic; on submit, POST /api/book-about
// and render the returned book in a reading-mode Flipboard-style reader.
function openBookModal() {
  const m = document.getElementById('book-modal');
  if (!m) return;
  m.classList.add('visible');
  const input = document.getElementById('book-topic-input');
  if (input) { input.value = ''; setTimeout(() => input.focus(), 60); }
  const status = document.getElementById('book-modal-status');
  if (status) { status.textContent = ''; status.classList.remove('err'); }
  if (window.lucide) lucide.createIcons();
}
function closeBookModal() {
  const m = document.getElementById('book-modal');
  if (m) m.classList.remove('visible');
}
async function composeBook() {
  const input = document.getElementById('book-topic-input');
  const topic = input?.value?.trim();
  if (!topic) return;
  const btn = document.getElementById('book-compose-btn');
  const status = document.getElementById('book-modal-status');
  btn.disabled = true;
  btn.innerHTML = '<i data-lucide="loader"></i> Composing…';
  status.classList.remove('err');
  status.innerHTML = '<i data-lucide="loader" style="width:12px;height:12px;"></i><span>Starting…</span>';
  if (window.lucide) lucide.createIcons();

  try {
    const res = await fetch('/api/book-about', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, lang: (document.getElementById('book-lang')?.value) || 'auto' }),
    });
    if (!res.ok || !res.body) {
      const txt = await res.text();
      status.classList.add('err');
      status.textContent = 'HTTP ' + res.status + ' — ' + txt.slice(0, 200);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let finalResult = null;

    // Progress ticker so the user sees time elapsing even during the long
    // compose step (the LLM call is ~10-30s with no intermediate events)
    let elapsed = 0;
    const tickTimer = setInterval(() => {
      elapsed += 1;
      const msgEl = status.querySelector('span');
      if (msgEl) {
        const base = msgEl.dataset.base || msgEl.textContent;
        msgEl.dataset.base = base;
        msgEl.textContent = base + ' · ' + elapsed + 's';
      }
    }, 1000);

    const setStatus = (iconName, text) => {
      status.innerHTML = `<i data-lucide="${iconName}" style="width:12px;height:12px;"></i><span>${esc(text)}</span>`;
      elapsed = 0;
      if (window.lucide) lucide.createIcons();
    };

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      let idx;
      while ((idx = buffer.indexOf('\n\n')) !== -1) {
        const rawEvent = buffer.slice(0, idx);
        buffer = buffer.slice(idx + 2);
        if (!rawEvent.startsWith('data:')) continue;
        try {
          const ev = JSON.parse(rawEvent.slice(5).trim());
          switch (ev.stage) {
            case 'checking-cache':
              setStatus('database', ev.message); break;
            case 'cached':
              setStatus('check', ev.message);
              if (ev.result) finalResult = ev.result;
              break;
            case 'picking':
              setStatus('search', ev.message); break;
            case 'reading':
              setStatus('file-text', ev.message); break;
            case 'composing':
              setStatus('sparkles', ev.message); break;
            case 'finalizing':
              setStatus('layers', ev.message); break;
            case 'done':
              setStatus('check', ev.message);
              if (ev.result) finalResult = ev.result;
              break;
            case 'result':
              if (ev.result) finalResult = ev.result;
              break;
            case 'error':
              status.classList.add('err');
              setStatus('alert-triangle', ev.message || 'Error');
              break;
          }
        } catch (e) { /* skip malformed */ }
      }
    }

    clearInterval(tickTimer);

    if (finalResult && finalResult.ok && finalResult.book) {
      closeBookModal();
      renderBook(finalResult.book, topic);
    } else if (finalResult && finalResult.ok === false) {
      status.classList.add('err');
      setStatus('alert-triangle', finalResult.error || 'Composition failed');
    }
  } catch (e) {
    status.classList.add('err');
    status.innerHTML = '<i data-lucide="alert-triangle" style="width:12px;height:12px;"></i><span>' + esc(e.message) + '</span>';
    if (window.lucide) lucide.createIcons();
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i data-lucide="sparkles"></i> Compose book';
    if (window.lucide) lucide.createIcons();
  }
}

function renderBook(book, topic, opts = {}) {
  const reader = document.getElementById('book-reader');
  const tocList = document.getElementById('book-toc-list');
  const content = document.getElementById('book-content-inner');
  if (!reader || !tocList || !content) return;

  // Slug derived from topic so we can push a shareable URL
  const slug = (opts.slug || topic || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

  // Push a shareable URL /book/<slug> unless we're replaying from popstate
  if (slug && !opts.fromPopState) {
    try {
      history.pushState({ kind: 'book', slug }, '', '/book/' + slug);
    } catch {}
  }

  // Build TOC
  tocList.innerHTML = [
    `<button class="book-toc-item active" onclick="scrollBookTo('intro')">
      <span class="book-toc-num">Opening</span>Introduction
    </button>`,
    ...book.chapters.map((ch) => `
      <button class="book-toc-item" onclick="scrollBookTo('ch-${ch.number}')">
        <span class="book-toc-num">Chapter ${ch.number}</span>${esc(ch.title)}
      </button>
    `),
  ].join('');

  // Build content
  const parts = [];
  parts.push(`
    <nav class="book-breadcrumb">
      <button class="book-bc-home" onclick="closeBookReader()" title="Back to wiki">
        <i data-lucide="arrow-left"></i>
      </button>
      <span class="book-bc-sep">/</span>
      <button class="book-bc-link" onclick="document.querySelector('.tab-btn[data-tab=books]').click()">Books</button>
      <span class="book-bc-sep">›</span>
      <span class="book-bc-current">${esc(topic)}</span>
      <button class="book-bc-share" onclick="copyBookLink('${esc(slug)}')" title="Copy shareable link"><i data-lucide="link"></i> Copy link</button>
    </nav>
  `);
  // Toolbar: edit / cover / prologue / index / references / ideas / explore
  // Sections that are already generated show a check and clicking removes
  // them (the only way to regenerate).
  const hasCover = !!book.cover_path;
  const hasPrologue = !!book.prologue;
  const hasIndex = !!(book.thematic_index && book.thematic_index.length);
  const hasRefs = !!(book.references && book.references.length);
  const sectionBtn = (section, iconGen, label, exists, generator) => {
    if (exists) {
      return `<button class="book-toolbar-btn book-toolbar-done" onclick="removeBookSection('${esc(slug)}', '${section}', this)" title="Already generated — click to remove so you can regenerate">
        <i data-lucide="check-circle-2"></i> ${label}
      </button>`;
    }
    return `<button class="book-toolbar-btn" onclick="${generator}" title="Generate ${label.toLowerCase()}">
      <i data-lucide="${iconGen}"></i> ${label}
    </button>`;
  };
  parts.push(`
    <div class="book-toolbar">
      <button class="book-toolbar-btn" onclick="editBookMeta('${esc(slug)}')" title="Edit title and subtitle"><i data-lucide="pencil"></i> Edit</button>
      ${sectionBtn('cover', 'image', 'Cover', hasCover, `generateBookCover('${esc(slug)}', this)`)}
      ${sectionBtn('prologue', 'feather', 'Prologue', hasPrologue, `generateBookSection('${esc(slug)}', 'prologue', this)`)}
      ${sectionBtn('index', 'list-tree', 'Index', hasIndex, `generateBookSection('${esc(slug)}', 'index', this)`)}
      ${sectionBtn('references', 'bookmark', 'References', hasRefs, `generateBookSection('${esc(slug)}', 'references', this)`)}
      <button class="book-toolbar-btn book-toolbar-accent" onclick="openBookIdeasModal('${esc(slug)}')" title="Generate ideas from this book"><i data-lucide="sparkles"></i> Ideas</button>
      <button class="book-toolbar-btn" onclick="openBookExploreModal('${esc(slug)}')" title="Explore missing concepts"><i data-lucide="compass"></i> Explore for more</button>
      <button class="book-toolbar-btn" onclick="printBook()" title="Export to PDF / print"><i data-lucide="printer"></i> Export PDF</button>
      <button class="book-toolbar-btn" id="audiobook-btn-${esc(slug)}" onclick="generateAudiobook('${esc(slug)}', this)" title="Generate MP3 audiobook via OpenAI TTS"><i data-lucide="headphones"></i> Audiobook</button>
    </div>
  `);
  // Cover image — only when a cover has been generated
  if (book.cover_path) {
    const cacheBust = book.cover_generated_at ? '&t=' + encodeURIComponent(book.cover_generated_at) : '';
    parts.push(`<div class="book-cover-hero"><img src="/raw-file?path=${encodeURIComponent(book.cover_path)}${cacheBust}" alt="${esc(book.title)}"></div>`);
  }
  parts.push(`<h1 class="book-title" id="book-title-display">${esc(book.title)}</h1>`);
  if (book.subtitle) parts.push(`<p class="book-subtitle" id="book-subtitle-display">${esc(book.subtitle)}</p>`);
  // Prologue — above the original intro if generated
  if (book.prologue) {
    parts.push(`<section id="prologue" class="book-prologue"><div class="book-section-kicker">Prologue</div>${mdToHtml(book.prologue)}</section>`);
  }
  parts.push(`<div id="intro" class="book-intro">${mdToHtml(book.intro || '')}</div>`);
  if (book.reading_order_rationale) {
    parts.push(`<div class="book-reading-order"><em>${esc(book.reading_order_rationale)}</em></div>`);
  }

  for (const ch of book.chapters) {
    const keypoints = (ch.key_points || []).map(k => `<li>${esc(k)}</li>`).join('');
    const articles = (ch.articles || []).map((a) => {
      const slug = (a.path || '').split('/').pop().replace(/\.md$/, '');
      const related = (ch.articles || [])
        .filter((o) => o.path !== a.path)
        .slice(0, 4)
        .map((o) => {
          const oSlug = (o.path || '').split('/').pop().replace(/\.md$/, '');
          return `<button class="book-related-card" onclick="closeBookReader();loadFile('${esc(o.path).replace(/'/g, "\\'")}')"><i data-lucide="file-text"></i><span>${esc(o.title || oSlug.replace(/-/g, ' '))}</span></button>`;
        }).join('');
      return `
        <article class="book-article">
          <div class="book-article-layout">
            <div class="book-article-main">
              <header class="book-article-header">
                <span class="book-article-title">${esc(a.title || slug.replace(/-/g, ' '))}</span>
                <button class="book-article-open" onclick="closeBookReader();loadFile('${esc(a.path).replace(/'/g, "\\'")}')" title="Open in wiki"><i data-lucide="external-link"></i></button>
              </header>
              <div class="book-article-body">${renderBookArticleBody(a.body || '')}</div>
            </div>
            ${related ? `<aside class="book-article-side">
              <div class="book-related-title">Related in this chapter</div>
              ${related}
            </aside>` : ''}
          </div>
        </article>
      `;
    }).join('');
    const bodyHtml = ch.body ? `<div class="book-chapter-body md-content">${mdToHtml(ch.body)}</div>` : '';
    parts.push(`
      <section id="ch-${ch.number}" class="book-chapter" data-chapter-number="${ch.number}">
        <div class="book-chapter-header-row">
          <div class="book-chapter-num">Chapter ${ch.number}</div>
          <div class="book-chapter-actions">
            <button class="book-chapter-action" onclick="openChapterChat('${esc(slug)}', ${ch.number})" title="Edit with Iris"><i data-lucide="sparkles"></i></button>
            <button class="book-chapter-action" onclick="deleteChapter('${esc(slug)}', ${ch.number})" title="Delete chapter"><i data-lucide="trash-2"></i></button>
          </div>
        </div>
        <h2 class="book-chapter-title">${esc(ch.title)}</h2>
        <p class="book-chapter-summary">${esc(ch.summary || '')}</p>
        ${keypoints ? `<div class="book-chapter-keypoints">
          <div class="book-chapter-keypoints-title">Key takeaways</div>
          <ul>${keypoints}</ul>
        </div>` : ''}
        ${bodyHtml}
        ${articles}
      </section>
    `);
  }
  // Add-chapter button at the end of all chapters
  parts.push(`
    <div class="book-add-chapter-row">
      <button class="book-add-chapter-btn" onclick="openAddChapter('${esc(slug)}')">
        <i data-lucide="plus-circle"></i> Add a chapter
      </button>
      <button class="book-print-btn" onclick="printBook()">
        <i data-lucide="printer"></i> Export / Print PDF
      </button>
    </div>
  `);

  // Suggested reading — wiki stubs created via "Explore for more"
  if (book.suggested_reading && book.suggested_reading.length) {
    parts.push(`
      <section id="suggested" class="book-chapter book-chapter-suggested">
        <div class="book-chapter-num">Appendix</div>
        <h2 class="book-chapter-title">Suggested reading (new concepts)</h2>
        <p class="book-chapter-summary">Concepts identified by the explore-for-more pass. These started as stubs in the wiki and can be fleshed out.</p>
        <div class="book-suggested-grid">
          ${book.suggested_reading.map((s) => `
            <button class="book-suggested-card" onclick="closeBookReader();loadFile('${esc(s.path).replace(/'/g, "\\'")}')">
              <div class="book-suggested-title">${esc(s.title || '')}</div>
              <div class="book-suggested-summary">${esc(s.summary || '')}</div>
              <div class="book-suggested-path"><i data-lucide="file-plus"></i> ${esc(s.path || '')}</div>
            </button>
          `).join('')}
        </div>
      </section>
    `);
  }

  // Thematic index (back-of-book)
  if (book.thematic_index && book.thematic_index.length) {
    parts.push(`
      <section id="thematic-index" class="book-thematic-index">
        <div class="book-section-kicker">Index</div>
        <h2 class="book-thematic-index-title">Thematic index</h2>
        <div class="book-thematic-index-grid">
          ${book.thematic_index.map((e) => `
            <div class="book-index-entry">
              <span class="book-index-term">${esc(e.term)}</span>
              <span class="book-index-chapters">${(e.chapters || []).map((c) => `<button onclick="scrollBookTo('ch-${esc(c)}')">ch. ${esc(c)}</button>`).join(' · ')}</span>
            </div>
          `).join('')}
        </div>
      </section>
    `);
  }

  // References — formal citation list
  if (book.references && book.references.length) {
    parts.push(`
      <section id="references" class="book-references">
        <div class="book-section-kicker">References</div>
        <h2 class="book-references-title">References</h2>
        <p class="book-references-hint">Sources used across the chapters, compiled from each article's metadata. Credit belongs to the original authors.</p>
        <ol class="book-references-list">
          ${book.references.map((r) => {
            const authorPart = r.author ? `<span class="ref-author">${esc(Array.isArray(r.author) ? r.author.join(', ') : r.author)}</span>.` : '';
            const datePart = r.date ? ` <span class="ref-date">(${esc(String(r.date).slice(0, 10))})</span>.` : '';
            const titlePart = ` <span class="ref-title">${esc(r.title || '')}</span>.`;
            const pubPart = r.publisher ? ` <span class="ref-pub">${esc(r.publisher)}</span>.` : '';
            const urlPart = r.source_url ? ` <a class="ref-url" href="${esc(r.source_url)}" target="_blank" rel="noopener">${esc(r.source_url)}</a>` : '';
            const chapPart = r.chapter ? ` <span class="ref-chapter">[ch. ${esc(String(r.chapter))}]</span>` : '';
            return `<li>${authorPart}${datePart}${titlePart}${pubPart}${urlPart}${chapPart}</li>`;
          }).join('')}
        </ol>
      </section>
    `);
  }

  if (book.further_reading && book.further_reading.length) {
    parts.push(`
      <div class="book-further">
        <div class="book-further-title">Further reading</div>
        ${book.further_reading.map((f) => `<span class="book-further-item">${esc(f)}</span>`).join('')}
      </div>
    `);
  }

  content.innerHTML = parts.join('');
  reader.classList.add('visible');
  document.getElementById('book-content').scrollTop = 0;
  window._currentBook = { book, topic };
  highlightNewCode(content);
  if (window.lucide) lucide.createIcons();

  // Active TOC item tracking as the user scrolls
  const scroller = document.getElementById('book-content');
  const anchors = ['intro', ...book.chapters.map((ch) => `ch-${ch.number}`)];
  const tocBtns = [...document.querySelectorAll('.book-toc-item')];
  scroller.onscroll = () => {
    let activeIdx = 0;
    for (let i = 0; i < anchors.length; i++) {
      const el = document.getElementById(anchors[i]);
      if (!el) continue;
      if (el.offsetTop - scroller.scrollTop < 140) activeIdx = i;
    }
    tocBtns.forEach((b, i) => b.classList.toggle('active', i === activeIdx));
  };
}

// Process a book article body: run marked, rewrite [[wikilinks]] to clickable
// buttons that open the linked article in the book side panel (without
// leaving the book).
function renderBookArticleBody(md) {
  const html = mdToHtml(md || '');
  return html.replace(/\[\[([^\]]+)\]\]/g, (_m, target) => {
    const slug = target.trim().toLowerCase().replace(/\s+/g, '-');
    return `<button class="book-wikilink" onclick="openBookSidePanel('${esc(slug)}', '${esc(target.trim())}')">${esc(target.trim())}</button>`;
  });
}

// Side panel — slides in from the right inside the book reader and renders
// a wiki article inline so the user can explore related concepts without
// losing the current chapter position.
async function openBookSidePanel(slug, displayTitle) {
  const panel = document.getElementById('book-side-panel');
  const titleEl = document.getElementById('book-side-title');
  const contentEl = document.getElementById('book-side-content');
  if (!panel) return;
  panel.classList.add('visible');
  document.body.classList.add('book-side-open');
  titleEl.textContent = displayTitle || slug;
  contentEl.innerHTML = '<div style="padding:30px;color:var(--subtext);font-size:12px;">Loading…</div>';

  // Resolve the slug to a real wiki file path. Try common locations.
  const candidates = [
    `wiki/concepts/${slug}.md`,
    `wiki/tools/${slug}.md`,
    `wiki/research/${slug}.md`,
    `wiki/${slug}.md`,
  ];
  let found = null;
  for (const p of candidates) {
    try {
      const res = await fetch('/api/file?path=' + encodeURIComponent(p));
      if (res.ok) {
        const d = await res.json();
        if (d && !d.error) { found = { path: p, data: d }; break; }
      }
    } catch {}
  }
  if (!found) {
    contentEl.innerHTML = `<div style="padding:30px;color:var(--subtext);font-size:12px;"><strong>${esc(displayTitle || slug)}</strong><br><br>No matching wiki article found in any of:<br><code style="font-size:10px;">${candidates.map(esc).join('<br>')}</code></div>`;
    window._bookSideCurrent = null;
    return;
  }
  // Render: rewrite wikilinks inside this article too so the user can keep
  // chaining without leaving the panel
  let rendered = found.data.html || mdToHtml(found.data.content || '');
  rendered = rendered.replace(/\[\[([^\]]+)\]\]/g, (_m, target) => {
    const subSlug = target.trim().toLowerCase().replace(/\s+/g, '-');
    return `<button class="book-wikilink" onclick="openBookSidePanel('${esc(subSlug)}', '${esc(target.trim())}')">${esc(target.trim())}</button>`;
  });
  // Rewrite local image paths
  rendered = rendered.replace(/<img([^>]*?)src="(?!https?:\/\/|\/)([^"]+)"([^>]*?)>/g,
    (_m, pre, src, post) => '<img' + pre + 'src="/raw-file?path=' + src.replace(/^\/raw-file\?path=/, '') + '"' + post + '>');
  contentEl.innerHTML = '<div class="md-content">' + rendered + '</div>';
  if (window.highlightNewCode) highlightNewCode(contentEl);
  if (window.lucide) lucide.createIcons();
  // Rebind in-panel wikilink clicks (already inline onclick, no-op)
  // Scroll to top
  contentEl.scrollTop = 0;
  window._bookSideCurrent = found.path;
}

function closeBookSidePanel() {
  const panel = document.getElementById('book-side-panel');
  if (panel) panel.classList.remove('visible');
  document.body.classList.remove('book-side-open');
  window._bookSideCurrent = null;
}

function openSidePanelInWiki() {
  const p = window._bookSideCurrent;
  if (!p) return;
  closeBookReader();
  closeBookSidePanel();
  setTimeout(() => loadFile(p), 100);
}

window.openBookSidePanel = openBookSidePanel;
window.closeBookSidePanel = closeBookSidePanel;
window.openSidePanelInWiki = openSidePanelInWiki;

// ── Chapter actions: add / delete / chat with Iris ──────────────────

async function openAddChapter(slug) {
  const title = prompt("New chapter title:");
  if (!title || !title.trim()) return;
  const summary = prompt("One-line summary (optional):", "") || "";
  try {
    const res = await fetch("/api/books/" + encodeURIComponent(slug) + "/chapters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title.trim(), summary: summary.trim() }),
    });
    const data = await res.json();
    if (!data.ok) { alert("Error: " + (data.error || "unknown")); return; }
    // addChapter returns { ok, chapter, book } where book is the FULL book object
    if (data.book && data.book.book) {
      renderBook(data.book.book, data.book.topic || slug, { slug, fromPopState: true });
    }
  } catch (e) { alert("Add chapter failed: " + e.message); }
}
window.openAddChapter = openAddChapter;

async function deleteChapter(slug, chNum) {
  if (!confirm(`Delete chapter ${chNum}? This can't be undone without restoring from git.`)) return;
  try {
    const res = await fetch(`/api/books/${encodeURIComponent(slug)}/chapters/${chNum}`, { method: "DELETE" });
    const data = await res.json();
    if (!data.ok) { alert("Error: " + (data.error || "unknown")); return; }
    if (data.book && data.book.book) {
      renderBook(data.book.book, data.book.topic || slug, { slug, fromPopState: true });
    }
  } catch (e) { alert("Delete chapter failed: " + e.message); }
}
window.deleteChapter = deleteChapter;

// ── Chapter chat with Iris — multi-turn + proposal preview ──────────

const _chapterChatState = { slug: null, chNum: null, messages: [], proposal: null, chapter: null };

function openChapterChat(slug, chNum) {
  const book = window._currentBook && window._currentBook.book;
  if (!book) return;
  const chapter = book.chapters.find((c) => Number(c.number) === Number(chNum));
  if (!chapter) return;

  _chapterChatState.slug = slug;
  _chapterChatState.chNum = chNum;
  _chapterChatState.messages = [];
  _chapterChatState.proposal = null;
  _chapterChatState.chapter = chapter;

  let panel = document.getElementById("chapter-chat-panel");
  if (!panel) {
    panel = document.createElement("div");
    panel.id = "chapter-chat-panel";
    panel.className = "chapter-chat-panel";
    panel.innerHTML = `
      <div class="cc-resize-handle" title="Drag to resize"></div>
      <div class="cc-header">
        <div class="cc-title"><i data-lucide="sparkles"></i> Edit with Iris</div>
        <div class="cc-header-actions">
          <button class="cc-action" onclick="toggleChapterChatMax()" title="Maximize / restore"><i data-lucide="maximize-2"></i></button>
          <button class="cc-close" onclick="closeChapterChat()" title="Close"><i data-lucide="x"></i></button>
        </div>
      </div>
      <div class="cc-body">
        <div class="cc-chat">
          <div id="cc-meta" class="cc-meta"></div>
          <div id="cc-messages" class="cc-messages"></div>
          <div class="cc-input-wrap">
            <textarea id="cc-input" placeholder="Ask Iris to rewrite, tighten, expand, translate, or discuss this chapter…" rows="3"></textarea>
            <button class="cc-send" onclick="sendChapterChatMessage()"><i data-lucide="send"></i></button>
          </div>
          <div id="cc-status" class="cc-status"></div>
        </div>
        <div class="cc-editor">
          <div class="cc-editor-header">
            <span><i data-lucide="file-text"></i> Chapter body</span>
            <span id="cc-editor-mode" class="cc-editor-mode">current</span>
          </div>
          <div id="cc-editor-current" class="cc-editor-text"></div>
          <div id="cc-editor-proposal" class="cc-editor-proposal" style="display:none;">
            <div class="cc-proposal-label">Iris proposes:</div>
            <div id="cc-proposal-body" class="cc-editor-text cc-proposal-body"></div>
            <div id="cc-proposal-why" class="cc-proposal-why"></div>
            <div class="cc-proposal-actions">
              <button class="pp-btn" onclick="rejectChapterProposal()">Reject</button>
              <button class="pp-btn pp-btn-primary" onclick="applyChapterProposal()"><i data-lucide="check"></i> Accept & save</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(panel);

    // Drag-to-resize on the left handle
    const handle = panel.querySelector(".cc-resize-handle");
    let resizing = false;
    let startX = 0;
    let startWidth = 0;
    handle.addEventListener("mousedown", (e) => {
      resizing = true;
      startX = e.clientX;
      startWidth = panel.getBoundingClientRect().width;
      panel.classList.add("resizing");
      e.preventDefault();
    });
    document.addEventListener("mousemove", (e) => {
      if (!resizing) return;
      const delta = startX - e.clientX;
      const next = Math.min(window.innerWidth - 20, Math.max(480, startWidth + delta));
      panel.style.width = next + "px";
      try { localStorage.setItem("cc-panel-width", String(next)); } catch {}
    });
    document.addEventListener("mouseup", () => {
      if (!resizing) return;
      resizing = false;
      panel.classList.remove("resizing");
    });

    // Restore saved width
    try {
      const saved = localStorage.getItem("cc-panel-width");
      if (saved) panel.style.width = Math.min(window.innerWidth - 20, Math.max(480, parseInt(saved, 10))) + "px";
    } catch {}
  }

  // Populate meta + body
  document.getElementById("cc-meta").innerHTML = `<strong>Chapter ${chNum}:</strong> ${esc(chapter.title)}`;
  document.getElementById("cc-messages").innerHTML = "";
  document.getElementById("cc-status").textContent = "";
  const bodyText = chapter.body || _serializeChapterBody(chapter);
  document.getElementById("cc-editor-current").textContent = bodyText;
  document.getElementById("cc-editor-proposal").style.display = "none";
  panel.classList.add("visible");
  document.body.classList.add("chapter-chat-open");
  if (window.lucide) lucide.createIcons();
  setTimeout(() => document.getElementById("cc-input")?.focus(), 100);
}
window.openChapterChat = openChapterChat;

// If a chapter doesn't have a custom body yet, serialize its structured
// fields into markdown so Iris has something coherent to rewrite.
function _serializeChapterBody(ch) {
  const parts = [];
  if (ch.summary) parts.push(ch.summary);
  if (ch.key_points && ch.key_points.length) {
    parts.push("");
    parts.push("**Key takeaways:**");
    for (const kp of ch.key_points) parts.push("- " + kp);
  }
  if (ch.articles && ch.articles.length) {
    parts.push("");
    parts.push("**Articles in this chapter:**");
    for (const a of ch.articles) parts.push("- [[" + (a.title || a.path) + "]]");
  }
  return parts.join("\n");
}

function closeChapterChat() {
  const panel = document.getElementById("chapter-chat-panel");
  if (panel) panel.classList.remove("visible");
  document.body.classList.remove("chapter-chat-open");
}
window.closeChapterChat = closeChapterChat;

function toggleChapterChatMax() {
  const panel = document.getElementById("chapter-chat-panel");
  if (!panel) return;
  panel.classList.toggle("maximized");
  // When toggling off the maximized class, also clear inline width so the
  // saved/default kicks back in.
  if (!panel.classList.contains("maximized")) {
    try {
      const saved = localStorage.getItem("cc-panel-width");
      panel.style.width = saved ? Math.min(window.innerWidth - 20, parseInt(saved, 10)) + "px" : "";
    } catch {}
  } else {
    panel.style.width = "";
  }
}
window.toggleChapterChatMax = toggleChapterChatMax;

async function sendChapterChatMessage() {
  const input = document.getElementById("cc-input");
  const text = (input.value || "").trim();
  if (!text) return;
  input.value = "";

  const msgs = document.getElementById("cc-messages");
  const status = document.getElementById("cc-status");

  // Append user message
  _chapterChatState.messages.push({ role: "user", content: text });
  msgs.insertAdjacentHTML("beforeend", `<div class="cc-msg cc-msg-user">${esc(text).replace(/\n/g, "<br>")}</div>`);
  msgs.scrollTop = msgs.scrollHeight;

  // Create a placeholder for the assistant message
  const botDiv = document.createElement("div");
  botDiv.className = "cc-msg cc-msg-bot";
  botDiv.innerHTML = '<span class="cc-typing">Iris is thinking…</span>';
  msgs.appendChild(botDiv);
  msgs.scrollTop = msgs.scrollHeight;
  status.textContent = "";

  try {
    const { slug, chNum, chapter } = _chapterChatState;
    const chapterBody = chapter.body || _serializeChapterBody(chapter);
    const res = await fetch(`/api/books/${encodeURIComponent(slug)}/chapters/${chNum}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: _chapterChatState.messages,
        chapterBody,
        chapterTitle: chapter.title,
      }),
    });

    if (!res.ok) {
      const t = await res.text();
      botDiv.textContent = "Error: " + t.slice(0, 300);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let sseBuffer = "";
    let botAccumulated = "";
    botDiv.innerHTML = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      sseBuffer += decoder.decode(value, { stream: true });
      let idx;
      while ((idx = sseBuffer.indexOf("\n\n")) !== -1) {
        const rawEvent = sseBuffer.slice(0, idx);
        sseBuffer = sseBuffer.slice(idx + 2);
        const dataLines = rawEvent.split("\n").filter((l) => l.startsWith("data:")).map((l) => l.replace(/^data:\s?/, ""));
        if (!dataLines.length) continue;
        try {
          const ev = JSON.parse(dataLines.join("\n"));
          if (ev.type === "delta" && ev.text) {
            botAccumulated += ev.text;
            // Hide any proposal JSON block from the visible chat
            const visible = botAccumulated.replace(/```proposal[\s\S]*?```/g, "_[proposal ready — see editor →]_");
            botDiv.innerHTML = _renderMarkdownMini(visible);
            msgs.scrollTop = msgs.scrollHeight;
          } else if (ev.type === "proposal") {
            _chapterChatState.proposal = {
              scope: ev.scope,
              new_body: ev.new_body,
              explanation: ev.explanation,
            };
            _showProposal(ev);
          } else if (ev.type === "error") {
            status.textContent = "Error: " + ev.message;
            status.classList.add("err");
          }
        } catch {}
      }
    }

    // Store the assistant response in history (without the proposal block)
    _chapterChatState.messages.push({ role: "assistant", content: botAccumulated });
  } catch (e) {
    botDiv.textContent = "Error: " + e.message;
  }
}
window.sendChapterChatMessage = sendChapterChatMessage;

function _renderMarkdownMini(text) {
  return esc(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\n/g, "<br>");
}

function _showProposal(proposal) {
  const box = document.getElementById("cc-editor-proposal");
  const body = document.getElementById("cc-proposal-body");
  const why = document.getElementById("cc-proposal-why");
  const modeEl = document.getElementById("cc-editor-mode");
  if (!box || !body) return;
  box.style.display = "";
  modeEl.textContent = "proposal pending";
  modeEl.classList.add("pending");

  // Render a crude character-level highlight so the user sees what changed
  const current = _chapterChatState.chapter.body || _serializeChapterBody(_chapterChatState.chapter);
  if (proposal.scope === "selection") {
    body.innerHTML = `<span class="cc-diff-add">${esc(proposal.new_body)}</span>`;
  } else {
    body.innerHTML = _highlightDiff(current, proposal.new_body);
  }
  why.textContent = proposal.explanation || "";
  box.scrollIntoView({ behavior: "smooth", block: "center" });
}

// Line-level diff: lines that exist in both versions are dim, new lines are
// highlighted green, removed lines are shown crossed-out red.
function _highlightDiff(oldText, newText) {
  const oldLines = (oldText || "").split("\n");
  const newLines = (newText || "").split("\n");
  const oldSet = new Set(oldLines);
  const newSet = new Set(newLines);
  const out = [];
  // First pass: render the new text, marking lines that are new
  for (const line of newLines) {
    if (oldSet.has(line)) out.push(`<span class="cc-diff-keep">${esc(line)}</span>`);
    else out.push(`<span class="cc-diff-add">${esc(line)}</span>`);
  }
  // Append removed lines as a summary
  const removed = oldLines.filter((l) => l.trim() && !newSet.has(l));
  if (removed.length) {
    out.push("");
    out.push('<span class="cc-diff-removed-label">— removed —</span>');
    for (const line of removed) out.push(`<span class="cc-diff-removed">${esc(line)}</span>`);
  }
  return out.join("\n");
}

async function applyChapterProposal() {
  const { slug, chNum, proposal, chapter } = _chapterChatState;
  if (!proposal) return;
  let newBody;
  if (proposal.scope === "selection") {
    const cur = chapter.body || _serializeChapterBody(chapter);
    newBody = cur + "\n\n" + proposal.new_body;
  } else {
    newBody = proposal.new_body;
  }
  const status = document.getElementById("cc-status");
  if (status) { status.textContent = "Saving…"; status.classList.remove("err"); }
  try {
    const res = await fetch(`/api/books/${encodeURIComponent(slug)}/chapters/${chNum}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: newBody }),
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || "save failed");

    // Use the mutated book RETURNED by the PATCH response directly — on
    // Vercel a refetch would hit the stale read-only function filesystem.
    if (data.book && data.book.book) {
      renderBook(data.book.book, data.book.topic || slug, { slug, fromPopState: true });
      const newCh = data.book.book.chapters.find((c) => Number(c.number) === Number(chNum));
      if (newCh) {
        _chapterChatState.chapter = newCh;
        document.getElementById("cc-editor-current").textContent = newCh.body || "";
      }
    } else if (data.chapter) {
      // Fallback — just update the in-memory chapter
      _chapterChatState.chapter = { ..._chapterChatState.chapter, ...data.chapter };
      document.getElementById("cc-editor-current").textContent = data.chapter.body || "";
    }

    _chapterChatState.proposal = null;
    document.getElementById("cc-editor-proposal").style.display = "none";
    const modeEl = document.getElementById("cc-editor-mode");
    if (modeEl) { modeEl.textContent = "current"; modeEl.classList.remove("pending"); }
    if (status) status.textContent = "✓ Saved. The commit is propagating to Vercel (~60s for redeploy).";
    const msgs = document.getElementById("cc-messages");
    msgs.insertAdjacentHTML("beforeend", '<div class="cc-msg cc-msg-system">✓ Proposal applied and committed.</div>');
    msgs.scrollTop = msgs.scrollHeight;
  } catch (e) {
    if (status) { status.textContent = "Error: " + e.message; status.classList.add("err"); }
  }
}
window.applyChapterProposal = applyChapterProposal;

function rejectChapterProposal() {
  _chapterChatState.proposal = null;
  document.getElementById("cc-editor-proposal").style.display = "none";
  const modeEl = document.getElementById("cc-editor-mode");
  if (modeEl) { modeEl.textContent = "current"; modeEl.classList.remove("pending"); }
  const msgs = document.getElementById("cc-messages");
  msgs.insertAdjacentHTML("beforeend", '<div class="cc-msg cc-msg-system">✗ Proposal rejected. Keep chatting to refine.</div>');
  msgs.scrollTop = msgs.scrollHeight;
}
window.rejectChapterProposal = rejectChapterProposal;

// ── Print / Export PDF ───────────────────────────────────────────────

async function generateAudiobookFromCard(slug, btn) {
  // First check if MP3 already exists
  try {
    const check = await fetch(`/api/books/${encodeURIComponent(slug)}/audio`);
    const info = await check.json();
    if (info.exists) {
      // Already generated — go straight to download
      window.location = `/api/books/${encodeURIComponent(slug)}/audio/download`;
      return;
    }
  } catch {}

  // Not generated yet — try to generate
  if (btn) { btn.disabled = true; btn.innerHTML = '<i data-lucide="loader-2" class="spin"></i>'; if (window.lucide) lucide.createIcons(); }
  try {
    const res = await fetch(`/api/books/${encodeURIComponent(slug)}/audio`, { method: 'POST' });
    const data = await res.json();
    if (res.status === 501) {
      // Vercel — can't generate server-side
      if (btn) { btn.disabled = false; btn.innerHTML = '<i data-lucide="headphones"></i>'; if (window.lucide) lucide.createIcons(); }
      primeToast('Generate locally: node viewer/services/audiobook.js ' + slug, 'alert-triangle');
      return;
    }
    if (!res.ok) throw new Error(data.error || 'Failed');
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i data-lucide="download"></i>';
      btn.title = `Download MP3 (${data.sizeMB}MB)`;
      btn.onclick = (e) => { e.stopPropagation(); window.location = `/api/books/${encodeURIComponent(slug)}/audio/download`; };
      if (window.lucide) lucide.createIcons();
    }
    primeToast(`🎧 Audiobook ready — ${data.chapters} chapters, ${data.sizeMB}MB`, 'check');
  } catch(e) {
    if (btn) { btn.disabled = false; btn.innerHTML = '<i data-lucide="headphones"></i>'; if (window.lucide) lucide.createIcons(); }
    primeToast('Audiobook error: ' + e.message, 'alert-triangle');
  }
}

async function generateAudiobook(slug, btn) {
  if (btn) { btn.disabled = true; btn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Generating…'; if (window.lucide) lucide.createIcons(); }
  try {
    const res = await fetch(`/api/books/${encodeURIComponent(slug)}/audio`, { method: 'POST' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed');
    // Show download link
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i data-lucide="headphones"></i> Audiobook';
      if (window.lucide) lucide.createIcons();
    }
    // Create download anchor
    const a = document.createElement('a');
    a.href = `/api/books/${encodeURIComponent(slug)}/audio/download`;
    a.download = `${slug}.mp3`;
    a.style.cssText = 'display:inline-flex;align-items:center;gap:6px;background:var(--accent);color:#000;padding:6px 14px;border-radius:6px;font-size:12px;font-weight:600;text-decoration:none;margin-left:8px;';
    a.innerHTML = '<i data-lucide="download"></i> Download MP3 (' + data.sizeMB + 'MB)';
    btn.insertAdjacentElement('afterend', a);
    if (window.lucide) lucide.createIcons();
    primeToast(`Audiobook ready — ${data.chapters} chapters, ${data.sizeMB}MB`, 'check');
  } catch(e) {
    if (btn) { btn.disabled = false; btn.innerHTML = '<i data-lucide="headphones"></i> Audiobook'; if (window.lucide) lucide.createIcons(); }
    primeToast('Audiobook error: ' + e.message, 'alert-triangle');
  }
}

function printBook() {
  // The print stylesheet (@media print in components.css) hides every
  // chrome element and lays the book out for a PDF-friendly page flow.
  // Browsers offer "Save as PDF" in their native print dialog.
  document.body.classList.add("printing");
  setTimeout(() => {
    window.print();
    setTimeout(() => document.body.classList.remove("printing"), 500);
  }, 100);
}
window.printBook = printBook;

function scrollBookTo(anchor) {
  const el = document.getElementById(anchor);
  const scroller = document.getElementById('book-content');
  if (el && scroller) {
    scroller.scrollTo({ top: Math.max(0, el.offsetTop - 60), behavior: 'smooth' });
  }
}

function closeBookReader() {
  const reader = document.getElementById('book-reader');
  if (reader) reader.classList.remove('visible');
  // Restore the tab URL the user came from (best-effort: go back to /books)
  if (location.pathname.startsWith('/book/')) {
    try { history.pushState({ kind: 'tab', tab: 'books' }, '', '/books'); } catch {}
  }
}

function copyBookLink(slug) {
  const url = location.origin + '/book/' + slug;
  navigator.clipboard.writeText(url).then(() => {
    primeToast('Link copied — ' + url, 'link');
  }).catch(() => {
    prompt('Copy this link:', url);
  });
}
window.copyBookLink = copyBookLink;

document.addEventListener('DOMContentLoaded', () => {
  const btnBook = document.getElementById('btn-book-about');
  if (btnBook) btnBook.addEventListener('click', openBookModal);
  const topicInput = document.getElementById('book-topic-input');
  if (topicInput) topicInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); composeBook(); }
    if (e.key === 'Escape') closeBookModal();
  });
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const reader = document.getElementById('book-reader');
    if (reader && reader.classList.contains('visible')) closeBookReader();
  }
});

// ── Books library (listing + loading cached books) ───────────────────────
async function loadBookBySlug(slug) {
  try {
    const res = await fetch('/api/books/' + encodeURIComponent(slug));
    const data = await res.json();
    if (!data.ok || !data.book) { alert('Book not found: ' + slug); return; }
    closeBookModal();
    renderBook(data.book, data.topic || slug);
  } catch (e) {
    alert('Error loading book: ' + e.message);
  }
}

async function deleteBookBySlug(slug, ev) {
  if (ev) { ev.stopPropagation(); ev.preventDefault(); }
  if (!confirm('Delete cached book "' + slug + '"? The next request for this topic will re-compose.')) return;
  try {
    await fetch('/api/books/' + encodeURIComponent(slug), { method: 'DELETE' });
    if (typeof loadBooksPanel === 'function') loadBooksPanel();
    loadBookLibraryInModal();
  } catch (e) { alert('Delete failed: ' + e.message); }
}

// ─────────────────────────────────────────────────────────────────────
// Book edit + enrichment handlers — all hit the new /api/books/:slug/*
// endpoints and re-render the reader with the updated book payload.
// ─────────────────────────────────────────────────────────────────────

async function reloadBookAfterMutation(slug, updated) {
  // updated may contain {book, topic} directly OR we refetch from server
  if (!updated || !updated.book) {
    try {
      const res = await fetch('/api/books/' + encodeURIComponent(slug));
      updated = await res.json();
    } catch { return; }
  }
  if (updated && updated.book) {
    renderBook(updated.book, updated.topic || slug, { slug, fromPopState: true });
  }
}

async function editBookMeta(slug) {
  const cur = window._currentBook && window._currentBook.book;
  if (!cur) return;
  const newTitle = prompt('New book title:', cur.title || '');
  if (newTitle === null) return;
  const newSubtitle = prompt('New subtitle (blank to clear):', cur.subtitle || '');
  if (newSubtitle === null) return;
  try {
    const res = await fetch('/api/books/' + encodeURIComponent(slug), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, subtitle: newSubtitle }),
    });
    const data = await res.json();
    if (!data.ok) { alert('Edit failed: ' + (data.error || 'unknown')); return; }
    await reloadBookAfterMutation(slug, data);
    if (typeof loadBooksPanel === 'function') loadBooksPanel();
  } catch (e) { alert('Edit failed: ' + e.message); }
}

async function generateBookCover(slug, btn) {
  const originalLabel = btn ? btn.innerHTML : '';
  if (btn) { btn.disabled = true; btn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Generating cover…'; if (window.lucide) lucide.createIcons(); }
  try {
    const res = await fetch('/api/books/' + encodeURIComponent(slug) + '/cover', { method: 'POST' });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || 'cover failed');
    await reloadBookAfterMutation(slug);
  } catch (e) {
    alert('Cover generation failed: ' + e.message);
  } finally {
    if (btn) { btn.disabled = false; btn.innerHTML = originalLabel; if (window.lucide) lucide.createIcons(); }
  }
}
window.generateBookCover = generateBookCover;

async function generateBookSection(slug, section, btn) {
  const labels = { prologue: 'Writing prologue…', index: 'Building index…', references: 'Compiling references…' };
  const originalLabel = btn ? btn.innerHTML : '';
  if (btn) { btn.disabled = true; btn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> ' + (labels[section] || 'Working…'); if (window.lucide) lucide.createIcons(); }
  try {
    const res = await fetch('/api/books/' + encodeURIComponent(slug) + '/' + section, { method: 'POST' });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || section + ' failed');
    await reloadBookAfterMutation(slug, data);
    // Scroll to the newly-generated section
    setTimeout(() => {
      const anchorMap = { prologue: 'prologue', index: 'thematic-index', references: 'references' };
      const el = document.getElementById(anchorMap[section]);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  } catch (e) {
    alert(section + ' generation failed: ' + e.message);
  } finally {
    if (btn) { btn.disabled = false; btn.innerHTML = originalLabel; if (window.lucide) lucide.createIcons(); }
  }
}
window.generateBookSection = generateBookSection;

async function removeBookSection(slug, section, btn) {
  const names = { cover: 'cover image', prologue: 'prologue', index: 'thematic index', references: 'references' };
  if (!confirm(`Remove the ${names[section] || section}? You'll be able to regenerate it afterwards.`)) return;
  const originalLabel = btn ? btn.innerHTML : '';
  if (btn) { btn.disabled = true; btn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Removing…'; if (window.lucide) lucide.createIcons(); }
  try {
    const res = await fetch('/api/books/' + encodeURIComponent(slug) + '/section/' + encodeURIComponent(section), { method: 'DELETE' });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || 'remove failed');
    await reloadBookAfterMutation(slug, data);
    if (typeof loadBooksPanel === 'function') loadBooksPanel();
  } catch (e) {
    alert('Remove failed: ' + e.message);
    if (btn) { btn.disabled = false; btn.innerHTML = originalLabel; if (window.lucide) lucide.createIcons(); }
  }
}
window.removeBookSection = removeBookSection;

// ── Ideas from book modal ────────────────────────────────────────────
async function openBookIdeasModal(slug) {
  let modal = document.getElementById('book-ideas-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'book-ideas-modal';
    modal.className = 'book-extra-modal';
    modal.innerHTML = `
      <div class="book-modal-shell">
        <div class="book-modal-header">
          <i data-lucide="sparkles"></i>
          <h2>Ideas derived from this book</h2>
          <button class="book-modal-close" onclick="closeBookIdeasModal()"><i data-lucide="x"></i></button>
        </div>
        <div class="book-modal-body">
          <p class="book-modal-hint">Add context so the ideas match your situation: audience, constraints, goals, industry. Then Iris will read the book and generate ideas grounded in the chapters.</p>
          <textarea id="book-ideas-context" rows="5" placeholder="Para qué quieres estas ideas. Ej: 'Para un equipo de innovación en una PyME de servicios financieros buscando diferenciación'."></textarea>
          <div class="book-modal-actions">
            <button class="pp-btn" onclick="closeBookIdeasModal()">Cancel</button>
            <button id="btn-gen-ideas" class="pp-btn pp-btn-primary" onclick="generateIdeasFromBook('${esc(slug)}')"><i data-lucide="sparkles"></i> Generate ideas</button>
          </div>
          <div id="book-ideas-status" class="book-modal-status"></div>
          <div id="book-ideas-results" class="book-ideas-results"></div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  } else {
    modal.dataset.slug = slug;
    const btn = document.getElementById('btn-gen-ideas');
    if (btn) btn.setAttribute('onclick', `generateIdeasFromBook('${esc(slug)}')`);
  }
  modal.dataset.slug = slug;
  modal.classList.add('visible');
  if (window.lucide) lucide.createIcons();

  // Preload cached ideas if they exist
  try {
    const res = await fetch('/api/books/' + encodeURIComponent(slug) + '/ideas');
    if (res.ok) {
      const data = await res.json();
      if (data.ok && data.ideas) renderBookIdeas(data);
    }
  } catch {}
}
window.openBookIdeasModal = openBookIdeasModal;

function closeBookIdeasModal() {
  const modal = document.getElementById('book-ideas-modal');
  if (modal) modal.classList.remove('visible');
}
window.closeBookIdeasModal = closeBookIdeasModal;

async function generateIdeasFromBook(slug) {
  const contextEl = document.getElementById('book-ideas-context');
  const statusEl = document.getElementById('book-ideas-status');
  const btn = document.getElementById('btn-gen-ideas');
  const context = contextEl ? contextEl.value : '';
  if (btn) { btn.disabled = true; btn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Thinking…'; if (window.lucide) lucide.createIcons(); }
  if (statusEl) statusEl.textContent = 'Iris is reading the book and generating ideas…';
  try {
    const res = await fetch('/api/books/' + encodeURIComponent(slug) + '/ideas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context, count: 10 }),
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || 'ideas failed');
    renderBookIdeas(data);
    if (statusEl) statusEl.textContent = `Generated ${data.ideas.length} ideas.`;
  } catch (e) {
    if (statusEl) { statusEl.textContent = 'Error: ' + e.message; statusEl.classList.add('err'); }
  } finally {
    if (btn) { btn.disabled = false; btn.innerHTML = '<i data-lucide="sparkles"></i> Generate ideas'; if (window.lucide) lucide.createIcons(); }
  }
}
window.generateIdeasFromBook = generateIdeasFromBook;

function renderBookIdeas(data) {
  const out = document.getElementById('book-ideas-results');
  if (!out) return;
  const ideas = data.ideas || [];
  const folderLabel = data.folder ? `<div class="book-ideas-folder-hint"><i data-lucide="folder-open"></i> Saved to <code>${esc(data.folder)}/</code> — also visible in the Ideas tab.</div>` : '';
  out.innerHTML = folderLabel + ideas.map((idea, i) => `
    <article class="book-idea-card">
      <div class="book-idea-num">${i + 1}</div>
      <div class="book-idea-body">
        <h3 class="book-idea-title">${esc(idea.title)}</h3>
        <p class="book-idea-pitch">${esc(idea.pitch)}</p>
        <div class="book-idea-rationale"><i data-lucide="book-open"></i> ${esc(idea.rationale)}</div>
        ${idea.next_steps && idea.next_steps.length ? `
          <div class="book-idea-steps">
            <div class="book-idea-steps-title">Next steps</div>
            <ul>${idea.next_steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
          </div>
        ` : ''}
        ${idea.path ? `<button class="book-idea-open" onclick="closeBookIdeasModal();closeBookReader();loadFile('${esc(idea.path).replace(/'/g, "\\'")}')"><i data-lucide="external-link"></i> Open note</button>` : ''}
      </div>
    </article>
  `).join('');
  if (window.lucide) lucide.createIcons();
}

// ── Explore for more modal ───────────────────────────────────────────
async function openBookExploreModal(slug) {
  let modal = document.getElementById('book-explore-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'book-explore-modal';
    modal.className = 'book-extra-modal';
    modal.innerHTML = `
      <div class="book-modal-shell">
        <div class="book-modal-header">
          <i data-lucide="compass"></i>
          <h2>Explore for more — missing concepts</h2>
          <button class="book-modal-close" onclick="closeBookExploreModal()"><i data-lucide="x"></i></button>
        </div>
        <div class="book-modal-body">
          <p class="book-modal-hint">Iris will analyze the book and propose concepts that are missing from the wiki. You can then accept them to create stub articles in <code>wiki/concepts/</code>.</p>
          <div class="book-modal-actions">
            <button class="pp-btn" onclick="closeBookExploreModal()">Cancel</button>
            <button id="btn-run-explore" class="pp-btn pp-btn-primary" onclick="runBookExplore('${esc(slug)}')"><i data-lucide="compass"></i> Find missing concepts</button>
          </div>
          <div id="book-explore-status" class="book-modal-status"></div>
          <div id="book-explore-results" class="book-explore-results"></div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  } else {
    const btn = document.getElementById('btn-run-explore');
    if (btn) btn.setAttribute('onclick', `runBookExplore('${esc(slug)}')`);
  }
  modal.dataset.slug = slug;
  modal.classList.add('visible');
  if (window.lucide) lucide.createIcons();
}
window.openBookExploreModal = openBookExploreModal;

function closeBookExploreModal() {
  const modal = document.getElementById('book-explore-modal');
  if (modal) modal.classList.remove('visible');
}
window.closeBookExploreModal = closeBookExploreModal;

async function runBookExplore(slug) {
  const statusEl = document.getElementById('book-explore-status');
  const btn = document.getElementById('btn-run-explore');
  if (btn) { btn.disabled = true; btn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Analyzing…'; if (window.lucide) lucide.createIcons(); }
  if (statusEl) { statusEl.textContent = 'Iris is looking for gaps…'; statusEl.classList.remove('err'); }
  try {
    const res = await fetch('/api/books/' + encodeURIComponent(slug) + '/explore', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ count: 6 }),
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || 'explore failed');
    renderExploreProposals(data.proposals || [], slug);
    if (statusEl) statusEl.textContent = `Found ${(data.proposals || []).length} missing concepts. Accept the ones you want to add.`;
  } catch (e) {
    if (statusEl) { statusEl.textContent = 'Error: ' + e.message; statusEl.classList.add('err'); }
  } finally {
    if (btn) { btn.disabled = false; btn.innerHTML = '<i data-lucide="compass"></i> Find missing concepts'; if (window.lucide) lucide.createIcons(); }
  }
}
window.runBookExplore = runBookExplore;

function renderExploreProposals(proposals, slug) {
  const out = document.getElementById('book-explore-results');
  if (!out) return;
  // Store proposals on element for accept round-trip
  window._exploreProposals = proposals.map((p, i) => ({ ...p, _idx: i, _checked: true }));
  out.innerHTML = `
    <div class="book-explore-list">
      ${proposals.map((p, i) => `
        <label class="book-explore-item">
          <input type="checkbox" checked data-idx="${i}" onchange="_toggleExploreProposal(${i}, this.checked)">
          <div class="book-explore-item-body">
            <div class="book-explore-item-title">${esc(p.title)}</div>
            <div class="book-explore-item-summary">${esc(p.summary || '')}</div>
            <div class="book-explore-item-outline">${(p.outline || []).map((h) => `<span>${esc(h)}</span>`).join(' · ')}</div>
            <div class="book-explore-item-why"><i data-lucide="info"></i> ${esc(p.why_missing || '')}</div>
          </div>
        </label>
      `).join('')}
    </div>
    <div class="book-modal-actions" style="margin-top:14px;">
      <button class="pp-btn pp-btn-primary" onclick="acceptExploreSelected('${esc(slug)}')"><i data-lucide="file-plus"></i> Create selected stubs in wiki/concepts/</button>
    </div>
  `;
  if (window.lucide) lucide.createIcons();
}

window._toggleExploreProposal = function(idx, checked) {
  if (window._exploreProposals && window._exploreProposals[idx]) {
    window._exploreProposals[idx]._checked = checked;
  }
};

async function acceptExploreSelected(slug) {
  const selected = (window._exploreProposals || []).filter((p) => p._checked);
  if (selected.length === 0) { alert('Nothing selected.'); return; }
  const statusEl = document.getElementById('book-explore-status');
  if (statusEl) statusEl.textContent = `Writing ${selected.length} stubs…`;
  try {
    const res = await fetch('/api/books/' + encodeURIComponent(slug) + '/explore/accept', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ proposals: selected }),
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || 'accept failed');
    if (statusEl) statusEl.textContent = `Wrote ${(data.written || []).length} stubs. Reloading book…`;
    await reloadBookAfterMutation(slug, data);
    setTimeout(() => closeBookExploreModal(), 900);
  } catch (e) {
    if (statusEl) { statusEl.textContent = 'Error: ' + e.message; statusEl.classList.add('err'); }
  }
}
window.acceptExploreSelected = acceptExploreSelected;

// Close extra modals on Escape
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  for (const id of ['book-ideas-modal', 'book-explore-modal']) {
    const m = document.getElementById(id);
    if (m && m.classList.contains('visible')) m.classList.remove('visible');
  }
});

window.editBookMeta = editBookMeta;

// Deterministic hue from a string so each book cover gets a stable color
function _hueFromString(s) {
  let h = 0;
  for (let i = 0; i < (s || '').length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }
  return h % 360;
}

// Delicate compact card used inside the Compose modal — just a cover image
// and a refined title, like a row of books on a shelf. Clicking loads it.
function _bookTinyCardHTML(book) {
  const slug = esc(book.slug || '');
  const title = esc(book.title || book.topic || slug);
  const hue1 = _hueFromString(book.slug || book.topic || 'x');
  const hue2 = (hue1 + 40) % 360;
  const gradient = `linear-gradient(135deg, hsl(${hue1}, 55%, 55%), hsl(${hue2}, 60%, 42%))`;
  const initial = esc(((book.title || book.topic || '?').trim().charAt(0) || '?').toUpperCase());
  const coverPath = book.cover_path || (book.book && book.book.cover_path);
  const cacheBust = book.cover_generated_at ? '&t=' + encodeURIComponent(book.cover_generated_at) : '';
  const coverHtml = coverPath
    ? `<img src="/raw-file?path=${encodeURIComponent(coverPath)}${cacheBust}" alt="${title}" loading="lazy">`
    : `<div class="book-tiny-gradient" style="background:${gradient};"><span>${initial}</span></div>`;
  const chapters = book.chapters || 0;
  return `
    <button class="book-tiny-card" onclick="loadBookBySlug('${slug}')" title="${title}">
      <div class="book-tiny-cover">${coverHtml}</div>
      <div class="book-tiny-title">${title}</div>
      <div class="book-tiny-meta">${chapters} ch</div>
    </button>
  `;
}

function _bookCardHTML(book) {
  const slug = esc(book.slug || '');
  const title = esc(book.title || book.topic || slug);
  const subtitle = esc(book.subtitle || '');
  const topic = esc(book.topic || '');
  const chapters = book.chapters || 0;
  const date = book.composed_at
    ? new Date(book.composed_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    : '';
  // Book cover: use the DALL-E-generated image if present, otherwise fall
  // back to a deterministic two-color gradient derived from the slug.
  const hue1 = _hueFromString(book.slug || book.topic || 'x');
  const hue2 = (hue1 + 40) % 360;
  const gradient = `linear-gradient(135deg, hsl(${hue1}, 55%, 55%), hsl(${hue2}, 60%, 42%))`;
  const initial = esc(((book.title || book.topic || '?').trim().charAt(0) || '?').toUpperCase());
  const coverPath = book.cover_path || (book.book && book.book.cover_path);
  const cacheBust = book.cover_generated_at ? '&t=' + encodeURIComponent(book.cover_generated_at) : '';
  const coverHtml = coverPath
    ? `<div class="book-card-cover book-card-cover-img">
         <img src="/raw-file?path=${encodeURIComponent(coverPath)}${cacheBust}" alt="${title}" loading="lazy">
         <span class="book-card-topic-pill"><i data-lucide="book-open-text"></i>${topic}</span>
       </div>`
    : `<div class="book-card-cover" style="background:${gradient};">
         <div class="book-card-spine"></div>
         <span class="book-card-initial">${initial}</span>
         <span class="book-card-topic-pill"><i data-lucide="book-open-text"></i>${topic}</span>
       </div>`;
  return `
    <article class="book-card" onclick="loadBookBySlug('${slug}')">
      ${coverHtml}
      <div class="book-card-body">
        <h3 class="book-card-title">${title}</h3>
        ${subtitle ? `<p class="book-card-subtitle">${subtitle}</p>` : ''}
        <div class="book-card-meta">
          <span class="book-card-meta-pill"><i data-lucide="layers"></i>${chapters} ${chapters === 1 ? 'chapter' : 'chapters'}</span>
          ${date ? `<span class="book-card-meta-pill"><i data-lucide="calendar"></i>${date}</span>` : ''}
        </div>
      </div>
      <button class="book-card-delete" onclick="deleteBookBySlug('${slug}', event)" title="Delete cached book"><i data-lucide="trash-2"></i></button>
      <button class="book-card-share" onclick="event.stopPropagation();copyBookLink('${slug}')" title="Copy shareable link"><i data-lucide="link"></i></button>
      <button class="book-card-audio" onclick="event.stopPropagation();generateAudiobookFromCard('${slug}', this)" title="Generate MP3 audiobook"><i data-lucide="headphones"></i></button>
    </article>
  `;
}

async function loadBooksPanel() {
  const grid = document.getElementById('books-grid');
  if (!grid) return;
  grid.innerHTML = '<div style="padding:30px;color:var(--subtext);font-size:13px;">Loading…</div>';
  try {
    const res = await fetch('/api/books');
    const data = await res.json();
    const books = data.books || [];
    if (!books.length) {
      grid.innerHTML = `
        <div class="books-empty">
          <i data-lucide="library" style="width:40px;height:40px;color:var(--subtext);"></i>
          <h3>No books yet</h3>
          <p>Compose your first book on any topic. We'll scan the wiki, pick the most relevant articles, and organize them into chapters.</p>
          <button onclick="openBookModal()" class="pp-btn pp-btn-primary"><i data-lucide="sparkles"></i> Compose a book</button>
        </div>
      `;
    } else {
      grid.innerHTML = books.map(_bookCardHTML).join('');
    }
    if (window.lucide) lucide.createIcons();
  } catch (e) {
    grid.innerHTML = `<div style="color:var(--red);font-size:12px;padding:20px;">Error: ${esc(e.message)}</div>`;
  }
}

function refreshBooksPanel() { loadBooksPanel(); }

// Compact list of existing books inside the Book About modal
async function loadBookLibraryInModal() {
  const lib = document.getElementById('book-library');
  if (!lib) return;
  try {
    const res = await fetch('/api/books');
    const data = await res.json();
    const books = data.books || [];
    if (!books.length) { lib.innerHTML = ''; return; }
    lib.innerHTML = `
      <div class="book-library-title"><i data-lucide="library"></i> Existing books <span class="book-library-count">${books.length}</span></div>
      <div class="book-library-shelf">
        ${books.slice(0, 9).map(_bookTinyCardHTML).join('')}
      </div>
      ${books.length > 9 ? `<button class="book-library-all" onclick="closeBookModal();document.querySelector('.tab-btn[data-tab=books]').click()">See all ${books.length} →</button>` : ''}
    `;
    if (window.lucide) lucide.createIcons();
  } catch {}
}

// Wrap openBookModal so every open loads the library preview too
const _originalOpenBookModal = openBookModal;
openBookModal = function() {
  _originalOpenBookModal();
  loadBookLibraryInModal();
};

window.openBookModal = openBookModal;
window.closeBookModal = closeBookModal;
window.composeBook = composeBook;
window.closeBookReader = closeBookReader;
window.scrollBookTo = scrollBookTo;
window.loadBookBySlug = loadBookBySlug;
window.deleteBookBySlug = deleteBookBySlug;
window.loadBooksPanel = loadBooksPanel;
window.refreshBooksPanel = refreshBooksPanel;

// ── Agents panel ───────────────────────────────────────────────────

async function loadAgentsPanel() {
  const grid = document.getElementById("agents-grid");
  if (!grid) return;
  grid.innerHTML = '<div style="padding:30px;color:var(--subtext);font-size:13px;">Loading agents…</div>';
  try {
    const res = await fetch("/api/agents");
    const data = await res.json();
    const agents = (data.agents || []);
    if (!agents.length) {
      grid.innerHTML = `<div style="padding:40px;color:var(--subtext);font-size:13px;">No agents defined yet. Create one at <code>wiki/agents/&lt;slug&gt;.md</code> with YAML frontmatter <code>type: agent</code> and stages.</div>`;
      return;
    }
    grid.innerHTML = agents.map((a) => `
      <article class="agent-card" onclick="openAgentRun('${esc(a.slug)}')">
        <div class="agent-card-icon" style="${a.color ? `background:color-mix(in srgb, ${a.color} 20%, transparent);color:${a.color};` : ""}">
          <i data-lucide="${esc(a.icon || "bot")}"></i>
        </div>
        <div class="agent-card-body">
          <h3 class="agent-card-name">${esc(a.name)}</h3>
          <p class="agent-card-desc">${esc(a.description)}</p>
          <div class="agent-card-meta">
            <span class="agent-card-stages"><i data-lucide="list"></i> ${a.stageCount} stages</span>
            ${(a.tags || []).slice(0, 4).map((t) => `<span class="agent-card-tag">${esc(t)}</span>`).join("")}
            ${a.builtin ? '<span class="agent-card-builtin">built-in</span>' : ""}
          </div>
        </div>
      </article>
    `).join("");
    if (window.lucide) lucide.createIcons();
  } catch (e) {
    grid.innerHTML = `<div style="color:var(--red);padding:20px;">Error: ${esc(e.message)}</div>`;
  }
}
window.loadAgentsPanel = loadAgentsPanel;

// ── Agent run panel ───────────────────────────────────────────────

const _agentRunState = {
  slug: null,
  agent: null,
  stageId: null,
  messages: [],
  userInput: "",
};

async function openAgentRun(slug) {
  try {
    const res = await fetch("/api/agents/" + encodeURIComponent(slug));
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || "agent not found");
    const agent = data.agent;
    _agentRunState.slug = slug;
    _agentRunState.agent = agent;
    _agentRunState.stageId = agent.stages?.[0]?.id || null;
    _agentRunState.messages = [];
    _agentRunState.userInput = "";
    _renderAgentRunPanel();
  } catch (e) {
    alert("Error: " + e.message);
  }
}
window.openAgentRun = openAgentRun;

function _renderAgentRunPanel() {
  let panel = document.getElementById("agent-run-panel");
  if (!panel) {
    panel = document.createElement("div");
    panel.id = "agent-run-panel";
    panel.className = "agent-run-panel";
    document.body.appendChild(panel);
  }
  const { agent, stageId } = _agentRunState;
  if (!agent) return;
  const stages = agent.stages || [];
  const stepper = stages.map((s, i) => {
    const active = s.id === stageId;
    return `<button class="agent-stage ${active ? "active" : ""}" onclick="setAgentStage('${esc(s.id)}')" title="${esc(s.description || s.label || "")}">
      <span class="agent-stage-num">${i + 1}</span>
      <span class="agent-stage-name">${esc(s.name)}</span>
    </button>`;
  }).join('<div class="agent-stage-arrow">→</div>');

  panel.innerHTML = `
    <div class="cc-resize-handle" title="Drag to resize"></div>
    <div class="cc-header">
      <div class="cc-title"><i data-lucide="${esc(agent.icon || "bot")}"></i> ${esc(agent.name)}</div>
      <div class="cc-header-actions">
        <button class="cc-action" onclick="resetAgentRun()" title="Reset conversation"><i data-lucide="rotate-ccw"></i></button>
        <button class="cc-action" onclick="toggleAgentRunMax()" title="Maximize / restore"><i data-lucide="maximize-2"></i></button>
        <button class="cc-close" onclick="closeAgentRun()" title="Close"><i data-lucide="x"></i></button>
      </div>
    </div>
    <div class="agent-stage-bar">${stepper}</div>
    <div class="agent-run-body">
      <div class="agent-input-col">
        <div class="agent-input-label">Input — el documento, texto o idea que Iris va a analizar:</div>
        <textarea id="agent-user-input" placeholder="Pegá acá el documento, la propuesta, la idea o el texto que querés que el agente analice…">${esc(_agentRunState.userInput)}</textarea>
        <div class="agent-input-hint">Editá libremente. Cada mensaje en el chat usa el input de este box como contexto.</div>
      </div>
      <div class="agent-chat-col">
        <div id="agent-messages" class="cc-messages"></div>
        <div class="cc-input-wrap">
          <textarea id="agent-chat-input" placeholder="Escribí tu primera consigna o respuesta al agente…" rows="3"></textarea>
          <button class="cc-send" onclick="sendAgentMessage()"><i data-lucide="send"></i></button>
        </div>
        <div id="agent-status" class="cc-status"></div>
      </div>
    </div>
  `;
  panel.classList.add("visible");
  document.body.classList.add("chapter-chat-open");
  if (window.lucide) lucide.createIcons();

  // Re-render existing messages if we have any
  const msgs = document.getElementById("agent-messages");
  for (const m of _agentRunState.messages) {
    const div = document.createElement("div");
    div.className = "cc-msg " + (m.role === "user" ? "cc-msg-user" : "cc-msg-bot");
    div.innerHTML = _renderMarkdownMini(m.content);
    msgs.appendChild(div);
  }

  // Wire resize handle on first render
  if (!panel.dataset.wired) {
    panel.dataset.wired = "1";
    const handle = panel.querySelector(".cc-resize-handle");
    let resizing = false, startX = 0, startWidth = 0;
    handle.addEventListener("mousedown", (e) => {
      resizing = true; startX = e.clientX;
      startWidth = panel.getBoundingClientRect().width;
      panel.classList.add("resizing");
      e.preventDefault();
    });
    document.addEventListener("mousemove", (e) => {
      if (!resizing) return;
      const next = Math.min(window.innerWidth - 20, Math.max(560, startWidth + (startX - e.clientX)));
      panel.style.width = next + "px";
      try { localStorage.setItem("ag-panel-width", String(next)); } catch {}
    });
    document.addEventListener("mouseup", () => {
      if (!resizing) return;
      resizing = false;
      panel.classList.remove("resizing");
    });
    try {
      const saved = localStorage.getItem("ag-panel-width");
      if (saved) panel.style.width = Math.min(window.innerWidth - 20, Math.max(560, parseInt(saved, 10))) + "px";
    } catch {}
  }

  // Sync textarea value back to state
  document.getElementById("agent-user-input").addEventListener("input", (e) => {
    _agentRunState.userInput = e.target.value;
  });
}

function setAgentStage(stageId) {
  _agentRunState.stageId = stageId;
  // Re-render the stepper without losing state
  const bar = document.querySelector("#agent-run-panel .agent-stage-bar");
  if (bar) {
    bar.querySelectorAll(".agent-stage").forEach((el, i) => {
      const s = _agentRunState.agent.stages[i];
      el.classList.toggle("active", s && s.id === stageId);
    });
  }
  // System message indicating the transition
  const msgs = document.getElementById("agent-messages");
  const stage = _agentRunState.agent.stages.find((s) => s.id === stageId);
  if (msgs && stage) {
    msgs.insertAdjacentHTML("beforeend", `<div class="cc-msg cc-msg-system">→ Fase: <strong>${esc(stage.name)}</strong> — ${esc(stage.label || "")}</div>`);
    msgs.scrollTop = msgs.scrollHeight;
  }
}
window.setAgentStage = setAgentStage;

async function sendAgentMessage() {
  const input = document.getElementById("agent-chat-input");
  const text = (input.value || "").trim();
  if (!text) return;
  input.value = "";

  const userInput = document.getElementById("agent-user-input")?.value || "";
  _agentRunState.userInput = userInput;

  const msgs = document.getElementById("agent-messages");
  _agentRunState.messages.push({ role: "user", content: text });
  msgs.insertAdjacentHTML("beforeend", `<div class="cc-msg cc-msg-user">${esc(text).replace(/\n/g, "<br>")}</div>`);
  msgs.scrollTop = msgs.scrollHeight;

  const botDiv = document.createElement("div");
  botDiv.className = "cc-msg cc-msg-bot";
  botDiv.innerHTML = '<span class="cc-typing">Iris está pensando…</span>';
  msgs.appendChild(botDiv);
  msgs.scrollTop = msgs.scrollHeight;

  const status = document.getElementById("agent-status");
  if (status) { status.textContent = ""; status.classList.remove("err"); }

  try {
    const res = await fetch(`/api/agents/${encodeURIComponent(_agentRunState.slug)}/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stageId: _agentRunState.stageId,
        messages: _agentRunState.messages,
        userInput,
      }),
    });
    if (!res.ok) {
      const t = await res.text();
      botDiv.textContent = "Error: " + t.slice(0, 300);
      return;
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let sseBuffer = "";
    let botAccumulated = "";
    botDiv.innerHTML = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      sseBuffer += decoder.decode(value, { stream: true });
      let idx;
      while ((idx = sseBuffer.indexOf("\n\n")) !== -1) {
        const rawEvent = sseBuffer.slice(0, idx);
        sseBuffer = sseBuffer.slice(idx + 2);
        const dataLines = rawEvent.split("\n").filter((l) => l.startsWith("data:")).map((l) => l.replace(/^data:\s?/, ""));
        if (!dataLines.length) continue;
        try {
          const ev = JSON.parse(dataLines.join("\n"));
          if (ev.type === "delta" && ev.text) {
            botAccumulated += ev.text;
            botDiv.innerHTML = _renderMarkdownMini(botAccumulated);
            msgs.scrollTop = msgs.scrollHeight;
          } else if (ev.type === "error") {
            if (status) { status.textContent = "Error: " + ev.message; status.classList.add("err"); }
          }
        } catch {}
      }
    }
    _agentRunState.messages.push({ role: "assistant", content: botAccumulated });
  } catch (e) {
    botDiv.textContent = "Error: " + e.message;
  }
}
window.sendAgentMessage = sendAgentMessage;

function closeAgentRun() {
  const panel = document.getElementById("agent-run-panel");
  if (panel) panel.classList.remove("visible");
  document.body.classList.remove("chapter-chat-open");
}
window.closeAgentRun = closeAgentRun;

function toggleAgentRunMax() {
  const panel = document.getElementById("agent-run-panel");
  if (!panel) return;
  panel.classList.toggle("maximized");
  if (!panel.classList.contains("maximized")) {
    try {
      const saved = localStorage.getItem("ag-panel-width");
      panel.style.width = saved ? Math.min(window.innerWidth - 20, parseInt(saved, 10)) + "px" : "";
    } catch {}
  } else {
    panel.style.width = "";
  }
}
window.toggleAgentRunMax = toggleAgentRunMax;

function resetAgentRun() {
  if (!confirm("Reset conversation? This clears all messages but keeps the input document.")) return;
  _agentRunState.messages = [];
  _agentRunState.stageId = _agentRunState.agent?.stages?.[0]?.id || null;
  document.getElementById("agent-messages").innerHTML = "";
  _renderAgentRunPanel();
}
window.resetAgentRun = resetAgentRun;
document.addEventListener('DOMContentLoaded', () => {
  const npmBtn = document.getElementById('btn-new-page');
  if (npmBtn) npmBtn.addEventListener('click', openNewPageModal);
  const chatInput = document.getElementById('npm-chat-input');
  if (chatInput) chatInput.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendNewPageChat(); }});
  // Initial load of home hub
  loadHomeHub();
});

// --- Last Edited Badge ---
function fetchLastEdited(filePath) {
  const badge = document.getElementById('last-edited');
  if (!badge) return;
  badge.style.display = 'none';
  fetch('/api/file-date?path=' + encodeURIComponent(filePath))
    .then(r => r.json())
    .then(d => {
      if (d.date || d.relative) {
        badge.textContent = (d.relative || '') + (d.date ? ' · ' + d.date : '');
        badge.style.display = 'inline-block';
      }
    })
    .catch(() => {});
}


// --- Idea Chat ---
async function loadChatHistory(idx, idea) {
  const msgs = document.getElementById('chat-msgs-' + idx);
  if (!msgs) return;
  try {
    const res = await fetch('/api/chat-history?date=' + encodeURIComponent(String(idea.date)));
    const history = await res.json();
    if (history.length) {
      msgs.innerHTML = history.map(m =>
        '<div class="idea-chat-msg ' + esc(m.role) + '">' + esc(m.content) + '</div>'
      ).join('');
      msgs.scrollTop = msgs.scrollHeight;
    }
  } catch {}
}

async function sendIdeaChat(idx) {
  const idea = ideasCache[idx];
  if (!idea) return;
  const input = document.getElementById('chat-input-' + idx);
  const msgs = document.getElementById('chat-msgs-' + idx);
  const message = input.value.trim();
  if (!message) return;

  input.value = '';
  msgs.innerHTML += '<div class="idea-chat-msg user">' + esc(message) + '</div>';

  // Collect existing history from DOM
  const history = [];
  msgs.querySelectorAll('.idea-chat-msg').forEach(el => {
    if (el.classList.contains('user')) history.push({ role: 'user', content: el.textContent });
    else if (el.classList.contains('assistant')) history.push({ role: 'assistant', content: el.textContent });
  });
  // Remove the last user message (we send it separately)
  history.pop();

  const assistantDiv = document.createElement('div');
  assistantDiv.className = 'idea-chat-msg assistant';
  assistantDiv.textContent = '...';
  msgs.appendChild(assistantDiv);
  msgs.scrollTop = msgs.scrollHeight;

  try {
    const res = await fetch('/api/chat-idea', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idea_content: idea.content, message, history, idea_date: String(idea.date) })
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';
    assistantDiv.textContent = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      chunk.split('\n').forEach(line => {
        if (line.startsWith('data: ')) {
          try {
            const d = JSON.parse(line.slice(6));
            if (d.content) { fullText += d.content; assistantDiv.textContent = fullText; }
          } catch {}
        }
      });
      msgs.scrollTop = msgs.scrollHeight;
    }

    // Add save button
    const saveBtn = document.createElement('button');
    saveBtn.className = 'save-chat-btn';
    saveBtn.textContent = '💾 Guardar en KB';
    saveBtn.onclick = async () => {
      await fetch('/api/save-chat-to-kb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea_date: String(idea.date), response_text: fullText })
      });
      saveBtn.textContent = '✓ Guardado';
      saveBtn.disabled = true;
    };
    assistantDiv.appendChild(saveBtn);
  } catch (err) {
    assistantDiv.textContent = 'Error: ' + err.message;
  }
}

// --- Expand Idea Graph to Fullscreen ---
let ideaGraphZoom = null;

function expandIdeaGraph(idx) {
  const idea = ideasCache[idx];
  if (!idea || !graphData) return;

  const modal = document.getElementById('idea-graph-modal');
  modal.classList.add('open');
  document.getElementById('igm-title').textContent = 'Grafo — ' + (idea.concept || idea.filename);

  const body = document.getElementById('igm-body');
  body.innerHTML = '';

  const { nodes, edges } = graphData;

  // Find related nodes (same logic as mini-graph)
  const ideaText = idea.content.toLowerCase();
  const mentionedNodes = nodes.filter(n => {
    const words = n.name.toLowerCase().split(/\s+/);
    return words.some(w => w.length > 3 && ideaText.includes(w)) || ideaText.includes(n.name.toLowerCase());
  });
  const mentionedIds = new Set(mentionedNodes.map(n => n.id));

  const connectedIds = new Set();
  edges.forEach(e => {
    const sid = typeof e.source === 'object' ? e.source.id : e.source;
    const tid = typeof e.target === 'object' ? e.target.id : e.target;
    if (mentionedIds.has(sid)) connectedIds.add(tid);
    if (mentionedIds.has(tid)) connectedIds.add(sid);
  });
  mentionedIds.forEach(id => connectedIds.add(id));

  const w = window.innerWidth;
  const h = window.innerHeight - 52;

  // Clone all nodes for fullscreen (show full graph, highlight related)
  const allNodes = nodes.map(n => ({...n, x: undefined, y: undefined, vx: 0, vy: 0}));
  const allEdges = edges.map(e => ({
    source: typeof e.source === 'object' ? e.source.id : e.source,
    target: typeof e.target === 'object' ? e.target.id : e.target,
    weak: e.weak
  }));

  const svg = d3.select(body).append('svg').attr('width', w).attr('height', h).style('background', '#050508');
  const g = svg.append('g');

  ideaGraphZoom = d3.zoom().scaleExtent([0.1, 8]).on('zoom', e => g.attr('transform', e.transform));
  svg.call(ideaGraphZoom);

  const sim = d3.forceSimulation(allNodes)
    .force('link', d3.forceLink(allEdges).id(d => d.id).distance(100))
    .force('charge', d3.forceManyBody().strength(-200))
    .force('center', d3.forceCenter(w / 2, h / 2))
    .force('collision', d3.forceCollide(20));

  const link = g.append('g').selectAll('line').data(allEdges).join('line')
    .attr('stroke', d => {
      const sid = typeof d.source === 'object' ? d.source.id : d.source;
      const tid = typeof d.target === 'object' ? d.target.id : d.target;
      return (connectedIds.has(sid) && connectedIds.has(tid)) ? '#cba6f7' : '#1a1a2a';
    })
    .attr('stroke-width', d => {
      const sid = typeof d.source === 'object' ? d.source.id : d.source;
      const tid = typeof d.target === 'object' ? d.target.id : d.target;
      return (connectedIds.has(sid) && connectedIds.has(tid)) ? 2 : 0.5;
    })
    .attr('opacity', d => {
      const sid = typeof d.source === 'object' ? d.source.id : d.source;
      const tid = typeof d.target === 'object' ? d.target.id : d.target;
      return (connectedIds.has(sid) && connectedIds.has(tid)) ? 0.8 : 0.15;
    });

  const node = g.append('g').selectAll('g').data(allNodes).join('g')
    .style('cursor', 'pointer')
    .call(d3.drag()
      .on('start', (e, d) => { if (!e.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
      .on('drag', (e, d) => { d.fx = e.x; d.fy = e.y; })
      .on('end', (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }));

  node.append('circle')
    .attr('r', d => mentionedIds.has(d.id) ? 14 : connectedIds.has(d.id) ? 10 : 5)
    .attr('fill', d => mentionedIds.has(d.id) ? '#cba6f7' : connectedIds.has(d.id) ? '#7c5cbf' : '#2a2a3a')
    .attr('stroke', d => mentionedIds.has(d.id) ? '#fff' : '#1e1e2e')
    .attr('stroke-width', d => mentionedIds.has(d.id) ? 2.5 : 1)
    .attr('opacity', d => connectedIds.has(d.id) ? 1 : 0.3);

  node.append('text')
    .text(d => connectedIds.has(d.id) ? (d.name.length > 22 ? d.name.slice(0, 20) + '..' : d.name) : '')
    .attr('font-size', d => mentionedIds.has(d.id) ? 12 : 10)
    .attr('fill', d => mentionedIds.has(d.id) ? '#fff' : '#888')
    .attr('dx', 14).attr('dy', 4).style('pointer-events', 'none');

  node.on('click', (e, d) => {
    e.stopPropagation();
    modal.classList.remove('open');
    switchToWiki();
    loadFile(d.id);
  });

  sim.on('tick', () => {
    link.attr('x1', d => d.source.x).attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
    node.attr('transform', d => `translate(${d.x},${d.y})`);
  });

  // Zoom controls
  document.getElementById('igm-zoom-in').onclick = () => svg.transition().duration(300).call(ideaGraphZoom.scaleBy, 1.5);
  document.getElementById('igm-zoom-out').onclick = () => svg.transition().duration(300).call(ideaGraphZoom.scaleBy, 0.67);
  document.getElementById('igm-zoom-reset').onclick = () => svg.transition().duration(500).call(ideaGraphZoom.transform, d3.zoomIdentity);
  document.getElementById('igm-close').onclick = () => modal.classList.remove('open');
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.getElementById('idea-graph-modal').classList.remove('open');
    document.getElementById('voice-modal').classList.remove('open');
  }
});

// --- Voice Recording ---
let mediaRecorder = null;
let audioChunks = [];
let audioCtx = null;
let analyser = null;
let animFrameId = null;

document.getElementById('btn-voice').addEventListener('click', () => {
  document.getElementById('voice-modal').classList.add('open');
  document.getElementById('voice-transcript').style.display = 'none';
  document.getElementById('voice-actions').style.display = 'none';
  document.getElementById('voice-status').textContent = 'Presioná Grabar para empezar';
});

document.getElementById('voice-close').addEventListener('click', () => {
  stopRecording();
  document.getElementById('voice-modal').classList.remove('open');
});

document.getElementById('voice-record').addEventListener('click', startRecording);
document.getElementById('voice-stop').addEventListener('click', stopRecording);

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioChunks = [];

    mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    mediaRecorder.ondataavailable = e => { if (e.data.size > 0) audioChunks.push(e.data); };
    mediaRecorder.onstop = handleRecordingDone;
    mediaRecorder.start();

    // Setup waveform visualization
    audioCtx = new AudioContext();
    analyser = audioCtx.createAnalyser();
    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.fftSize = 256;
    drawWaveform();

    document.getElementById('voice-record').disabled = true;
    document.getElementById('voice-record').classList.add('recording');
    document.getElementById('voice-stop').disabled = false;
    document.getElementById('voice-status').textContent = '🔴 Grabando...';
    document.getElementById('voice-transcript').style.display = 'none';
    document.getElementById('voice-actions').style.display = 'none';
  } catch (err) {
    document.getElementById('voice-status').textContent = 'Error: ' + err.message;
  }
}

function drawWaveform() {
  const canvas = document.getElementById('voice-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth * 2;
  canvas.height = canvas.offsetHeight * 2;
  const W = canvas.width, H = canvas.height;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  function draw() {
    animFrameId = requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);
    ctx.fillStyle = '#050508';
    ctx.fillRect(0, 0, W, H);
    const barW = (W / bufferLength) * 2.5;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
      const barH = (dataArray[i] / 255) * H;
      const hue = 270 + (i / bufferLength) * 30;
      ctx.fillStyle = 'hsl(' + hue + ', 70%, 65%)';
      ctx.fillRect(x, H - barH, barW, barH);
      x += barW + 1;
    }
  }
  draw();
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    mediaRecorder.stream.getTracks().forEach(t => t.stop());
  }
  if (animFrameId) { cancelAnimationFrame(animFrameId); animFrameId = null; }
  if (audioCtx) { audioCtx.close(); audioCtx = null; }
  document.getElementById('voice-record').disabled = false;
  document.getElementById('voice-record').classList.remove('recording');
  document.getElementById('voice-stop').disabled = true;
}

async function handleRecordingDone() {
  const blob = new Blob(audioChunks, { type: 'audio/webm' });
  document.getElementById('voice-status').textContent = 'Transcribiendo con Whisper...';

  try {
    const res = await fetch('/api/voice-ingest', {
      method: 'POST',
      headers: { 'Content-Type': 'audio/webm' },
      body: blob
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);

    document.getElementById('voice-transcript').value = data.text;
    document.getElementById('voice-transcript').style.display = 'block';
    document.getElementById('voice-actions').style.display = 'flex';
    document.getElementById('voice-status').textContent = 'Transcripción lista. Editá si es necesario.';

    // Wire save buttons
    document.getElementById('voice-save-raw').onclick = () => saveVoice(false);
    document.getElementById('voice-save-idea').onclick = () => saveVoice(true);
  } catch (err) {
    document.getElementById('voice-status').textContent = 'Error: ' + err.message;
  }
}

async function saveVoice(asIdea) {
  const text = document.getElementById('voice-transcript').value.trim();
  if (!text) return;

  try {
    const res = await fetch('/api/save-voice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, timestamp: Date.now(), as_idea: asIdea })
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);

    document.getElementById('voice-status').textContent = '✓ Guardado en ' + data.path + (data.ideaPath ? ' + ' + data.ideaPath : '');
    document.getElementById('voice-actions').style.display = 'none';

    // Refresh tree
    loadTree();
    if (asIdea && document.querySelector('.tab-btn[data-tab="ideas"]').classList.contains('active')) {
      ideasCache = null;
      loadIdeas();
    }
  } catch (err) {
    document.getElementById('voice-status').textContent = 'Error: ' + err.message;
  }
}

// --- Realtime Voice Assistant ---
let rtPC = null;
let rtDC = null;
let rtAudioCtx = null;
let rtAnalyser = null;
let rtAnimFrame = null;
let currentFilePath = null;

function setCurrentFile(fp) { window.currentFilePath = fp; currentFilePath = fp; }

document.getElementById('btn-realtime-voice').addEventListener('click', openVoiceAssistant);
document.getElementById('rt-close').addEventListener('click', closeVoiceAssistant);
document.getElementById('rt-stop').addEventListener('click', closeVoiceAssistant);

async function openVoiceAssistant() {
  const modal = document.getElementById('realtime-modal');
  modal.classList.add('open');
  const status = document.getElementById('rt-status');
  const transcript = document.getElementById('rt-transcript');
  transcript.innerHTML = '';
  status.textContent = 'Obteniendo token...';

  try {
    // 1. Get ephemeral token
    const selCtx = typeof getSelectionContextForAgent === 'function' ? getSelectionContextForAgent() : null;
    const tokenRes = await fetch('/api/realtime-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filePath: window.currentFilePath,
        selectionText: selCtx?.selectedText || ''
      })
    });
    const tokenData = await tokenRes.json();
    if (tokenData.error) throw new Error(JSON.stringify(tokenData.error));
    const ephemeralKey = tokenData.client_secret.value;
    const articleContent = tokenData.article_content || '';
    const articleTitle = tokenData.article_title || window.currentFilePath || 'artículo';
    const selectionNote = tokenData.selection_text ? ('\n\nEl usuario tiene seleccionado: "' + tokenData.selection_text.slice(0, 300) + '"') : '';

    status.textContent = 'Conectando WebRTC...';

    // 2. Create RTCPeerConnection
    rtPC = new RTCPeerConnection();

    // Add microphone track
    const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    micStream.getTracks().forEach(track => rtPC.addTrack(track, micStream));

    // 3. Handle remote audio
    const remoteAudio = document.createElement('audio');
    remoteAudio.autoplay = true;
    rtPC.ontrack = (e) => {
      remoteAudio.srcObject = e.streams[0];
      // Setup waveform from remote audio
      rtAudioCtx = new AudioContext();
      rtAnalyser = rtAudioCtx.createAnalyser();
      const source = rtAudioCtx.createMediaStreamSource(e.streams[0]);
      source.connect(rtAnalyser);
      rtAnalyser.fftSize = 256;
      drawRtWaveform();
    };

    // 4. Create data channel
    rtDC = rtPC.createDataChannel('oai-events');
    window.rtDC = rtDC;
    rtDC.onopen = () => {
      status.textContent = '🟢 Conectado — hablá';
      // Send session.update with instructions + tools
      const sessionUpdate = {
        type: 'session.update',
        session: {
          voice: 'alloy',
          input_audio_transcription: { model: 'whisper-1' },
          turn_detection: { type: 'server_vad' },
          instructions: `Eres Iris, la asistente experta de esta Knowledge Base.

ARTÍCULO ACTUAL: ${articleTitle}
RUTA: ${window.currentFilePath || 'ninguno'}
${selectionNote}

CONTENIDO COMPLETO DEL ARTÍCULO:
---
${articleContent || '(sin contenido)'}
---

Tenés el artículo completo en tu contexto. Podés discutirlo, analizarlo, mejorarlo y modificarlo.
Usá las tools disponibles para actualizar el artículo directamente cuando el usuario lo pida.
Habla en español, sé conciso y técnico.`,
          tools: [
            {
              type: 'function',
              name: 'read_current_article',
              description: 'Lee el contenido del artículo actualmente abierto en el viewer',
              parameters: { type: 'object', properties: {}, required: [] }
            },
            {
              type: 'function',
              name: 'update_article',
              description: 'Reemplaza el contenido completo del artículo actual',
              parameters: {
                type: 'object',
                properties: {
                  content: { type: 'string', description: 'Nuevo contenido markdown completo del artículo' },
                  reason: { type: 'string', description: 'Razón del cambio' }
                },
                required: ['content', 'reason']
              }
            },
            {
              type: 'function',
              name: 'append_section',
              description: 'Agrega una nueva sección ## al final del artículo actual',
              parameters: {
                type: 'object',
                properties: {
                  title: { type: 'string', description: 'Título de la nueva sección (sin ##)' },
                  content: { type: 'string', description: 'Contenido markdown de la sección' }
                },
                required: ['title', 'content']
              }
            },
            {
              type: 'function',
              name: 'navigate_to',
              description: 'Navega a otro artículo del wiki por nombre',
              parameters: {
                type: 'object',
                properties: {
                  article_name: { type: 'string', description: 'Nombre del artículo (ej: "ai-agents", "coding-agents")' }
                },
                required: ['article_name']
              }
            },
            {
              type: 'function',
              name: 'create_article',
              description: 'Crea un nuevo artículo en el wiki',
              parameters: {
                type: 'object',
                properties: {
                  path: { type: 'string', description: 'Ruta relativa ej: wiki/concepts/mi-concepto.md' },
                  title: { type: 'string' },
                  content: { type: 'string', description: 'Contenido markdown completo' }
                },
                required: ['path', 'title', 'content']
              }
            },
            {
              type: 'function',
              name: 'create_note',
              description: 'Crea una nota rápida en raw/notes/',
              parameters: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  content: { type: 'string' }
                },
                required: ['title', 'content']
              }
            },
            {
              type: 'function',
              name: 'create_widget',
              description: 'Crea una visualización interactiva basada en datos del wiki',
              parameters: {
                type: 'object',
                properties: {
                  prompt: { type: 'string', description: 'Descripción de la visualización' },
                  data: { type: 'string', description: 'Datos o contexto a visualizar' }
                },
                required: ['prompt']
              }
            }
          ]
        }
      };
      rtDC.send(JSON.stringify(sessionUpdate));
    };

    let currentAiText = '';
    let aiSpan = null;

    rtDC.onmessage = async (e) => {
      const event = JSON.parse(e.data);

      // User speech transcription
      if (event.type === 'conversation.item.input_audio_transcription.completed') {
        const userText = event.transcript || '';
        if (userText.trim()) {
          transcript.innerHTML += '<div class="rt-user"><span class="rt-label">Tú:</span>' + esc(userText) + '</div>';
          transcript.scrollTop = transcript.scrollHeight;
        }
      }

      // AI audio transcript delta
      if (event.type === 'response.audio_transcript.delta') {
        if (!aiSpan) {
          aiSpan = document.createElement('div');
          aiSpan.className = 'rt-ai';
          aiSpan.innerHTML = '<span class="rt-label">AI:</span>';
          transcript.appendChild(aiSpan);
        }
        currentAiText += event.delta || '';
        aiSpan.innerHTML = '<span class="rt-label">AI:</span>' + esc(currentAiText);
        transcript.scrollTop = transcript.scrollHeight;
      }

      // AI transcript done
      if (event.type === 'response.audio_transcript.done') {
        currentAiText = '';
        aiSpan = null;
      }

      // Tool call
      if (event.type === 'response.function_call_arguments.done') {
        const callId = event.call_id;
        const fnName = event.name;
        let args = {};
        try { args = JSON.parse(event.arguments || '{}'); } catch {}

        let result = '';
        try {
          result = await executeRealtimeTool(fnName, args);
        } catch (err) {
          result = 'Error: ' + err.message;
        }

        // Send tool result back
        rtDC.send(JSON.stringify({
          type: 'conversation.item.create',
          item: {
            type: 'function_call_output',
            call_id: callId,
            output: result
          }
        }));
        // Trigger AI to continue
        rtDC.send(JSON.stringify({ type: 'response.create' }));
      }
    };

    // 5. SDP offer -> OpenAI -> setRemoteDescription
    const offer = await rtPC.createOffer();
    await rtPC.setLocalDescription(offer);

    const sdpRes = await fetch('https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + ephemeralKey,
        'Content-Type': 'application/sdp'
      },
      body: offer.sdp
    });
    const answerSdp = await sdpRes.text();
    await rtPC.setRemoteDescription({ type: 'answer', sdp: answerSdp });

  } catch (err) {
    status.textContent = 'Error: ' + err.message;
    console.error('Realtime voice error:', err);
  }
}

async function executeRealtimeTool(name, args) {
  if (name === 'read_current_article') {
    if (!currentFilePath) return 'No hay artículo abierto actualmente.';
    const res = await fetch('/api/file?path=' + encodeURIComponent(currentFilePath));
    const data = await res.json();
    return data.content || data.error || 'Sin contenido';
  }
  if (name === 'update_article') {
    const fp = currentFilePath || window.currentFilePath;
    if (!fp) return 'No hay artículo abierto.';
    const res = await fetch('/api/article/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filePath: fp, content: args.content, reason: args.reason })
    });
    const data = await res.json();
    if (data.ok) { loadFile(fp); return 'Artículo actualizado: ' + (args.reason || ''); }
    return 'Error: ' + (data.error || 'unknown');
  }
  if (name === 'append_section') {
    const fp2 = currentFilePath || window.currentFilePath;
    if (!fp2) return 'No hay artículo abierto.';
    const res = await fetch('/api/article/append-section', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filePath: fp2, title: args.title, content: args.content })
    });
    const data = await res.json();
    if (data.ok) { loadFile(fp2); return 'Sección "' + args.title + '" agregada.'; }
    return 'Error: ' + (data.error || 'unknown');
  }
  if (name === 'navigate_to') {
    const target = (args.article_name || '').toLowerCase().replace(/\s+/g, '-');
    const allFiles = document.querySelectorAll('.tree-file');
    let match = null;
    for (const f of allFiles) {
      const fp = (f.dataset.path || '').toLowerCase();
      const fname = fp.split('/').pop().replace('.md', '');
      if (fname === target || fname.includes(target)) { match = f; break; }
    }
    if (match) {
      switchToWiki();
      loadFile(match.dataset.path);
      return 'Navegando a: ' + match.dataset.path;
    }
    return 'No encontré artículo: ' + args.article_name;
  }
  if (name === 'create_article') {
    const filePath = args.path.startsWith('wiki/') ? args.path : 'wiki/concepts/' + args.path.replace(/[^a-z0-9-]/gi, '-').toLowerCase() + '.md';
    const content = `---\ntitle: ${args.title}\ncreated: ${new Date().toISOString().slice(0,10)}\n---\n\n# ${args.title}\n\n${args.content}`;
    const res = await fetch('/api/article/create', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ filePath, content }) });
    const data = await res.json();
    if (data.ok) { loadTree(); loadFile(filePath); return 'Artículo creado: ' + filePath; }
    return 'Error: ' + data.error;
  }
  if (name === 'create_note') {
    const slug = args.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const filePath = 'raw/notes/' + new Date().toISOString().slice(0,10) + '-' + slug + '.md';
    const content = `---\ntitle: ${args.title}\ncreated: ${new Date().toISOString()}\ncompiled: false\n---\n\n# ${args.title}\n\n${args.content}`;
    const res = await fetch('/api/article/create', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ filePath, content }) });
    const data = await res.json();
    if (data.ok) { loadTree(); return 'Nota creada: ' + filePath; }
    return 'Error: ' + data.error;
  }
  if (name === 'create_widget') {
    const res = await fetch('/api/generate-widget', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ prompt: args.prompt, data_context: args.data || '' }) });
    const data = await res.json();
    if (data.ok) { loadWidgets(); return 'Widget creado: ' + data.file_path; }
    return 'Error: ' + (data.error || 'unknown');
  }
  return 'Tool no reconocida: ' + name;
}

function drawRtWaveform() {
  const canvas = document.getElementById('rt-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth * 2;
  canvas.height = canvas.offsetHeight * 2;
  const W = canvas.width, H = canvas.height;
  const bufferLength = rtAnalyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  function draw() {
    rtAnimFrame = requestAnimationFrame(draw);
    rtAnalyser.getByteFrequencyData(dataArray);
    ctx.fillStyle = '#050508';
    ctx.fillRect(0, 0, W, H);
    const barW = (W / bufferLength) * 2.5;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
      const barH = (dataArray[i] / 255) * H;
      const hue = 270 + (i / bufferLength) * 30;
      ctx.fillStyle = 'hsl(' + hue + ', 70%, 65%)';
      ctx.fillRect(x, H - barH, barW, barH);
      x += barW + 1;
    }
  }
  draw();
}

function closeVoiceAssistant() {
  document.getElementById('realtime-modal').classList.remove('open');
  if (rtDC) { try { rtDC.close(); } catch {} rtDC = null; }
  if (rtPC) {
    rtPC.getSenders().forEach(s => { if (s.track) s.track.stop(); });
    rtPC.close();
    rtPC = null;
  }
  if (rtAnimFrame) { cancelAnimationFrame(rtAnimFrame); rtAnimFrame = null; }
  if (rtAudioCtx) { rtAudioCtx.close(); rtAudioCtx = null; }
  rtAnalyser = null;
  document.getElementById('rt-status').textContent = 'Desconectado';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && document.getElementById('realtime-modal').classList.contains('open')) {
    closeVoiceAssistant();
  }
});

// --- Repo Lens ---
let repoData = null;
let currentRepoFilePath = null;

function switchRepoTab(tab, btn) {
  document.querySelectorAll('.repo-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.repo-tab-content').forEach(c => c.style.display = 'none');
  if (btn) btn.classList.add('active');
  const el = document.getElementById('repo-' + tab);
  if (el) el.style.display = 'block';
}

async function loadRepoPanel(filePath) {
  currentRepoFilePath = filePath;
  const panel = document.getElementById('repo-panel');
  if (!panel) return;
  panel.style.display = 'block';
  document.getElementById('repo-title').textContent = '📦 Cargando...';

  try {
    const data = await fetch('/api/repo-info?path=' + encodeURIComponent(filePath)).then(r => r.json());
    if (data.error) { panel.style.display = 'none'; return; }
    repoData = data;

    document.getElementById('repo-title').textContent = '📦 ' + data.name;
    document.getElementById('repo-meta').textContent = (data.stars ? '⭐ ' + data.stars : '') + (data.language ? ' · ' + data.language : '');
    document.getElementById('repo-link').href = data.repo_url;

    // Render README
    const readmeEl = document.getElementById('repo-readme');
    if (readmeEl && data.readme) {
      readmeEl.innerHTML = typeof marked !== 'undefined' ? marked.parse(data.readme) : data.readme;
    }

    // File list
    const fileList = document.getElementById('repo-file-list');
    if (fileList && data.files) {
      fileList.innerHTML = '';
      data.files.slice(0, 40).forEach(f => {
        const div = document.createElement('div');
        div.style.cssText = 'padding:3px 6px;cursor:pointer;border-radius:4px;';
        div.textContent = '\xf0\x9f\x93\x84 ' + f;
        div.onmouseover = () => { div.style.background = 'var(--surface2)'; };
        div.onmouseout = () => { div.style.background = ''; };
        div.onclick = () => loadRepoFile(f);
        fileList.appendChild(div);
      });
    }
  } catch (err) {
    document.getElementById('repo-title').textContent = '📦 Error: ' + err.message;
  }
}

async function loadRepoFile(filePath) {
  if (!repoData) return;
  const fc = document.getElementById('repo-file-content');
  if (!fc) return;
  fc.style.display = 'block';
  fc.textContent = 'Cargando...';

  try {
    const data = await fetch('/api/repo-file?repo=' + encodeURIComponent(repoData.repo_path) + '&path=' + encodeURIComponent(filePath)).then(r => r.json());
    fc.textContent = data.content || data.error;
  } catch (err) {
    fc.textContent = 'Error: ' + err.message;
  }
}

async function askRepo() {
  const input = document.getElementById('repo-question');
  if (!input || !repoData) return;
  const question = input.value.trim();
  if (!question) return;
  input.value = '';

  const msgs = document.getElementById('repo-chat-msgs');
  if (msgs) {
    msgs.innerHTML += '<div style="margin-bottom:8px;color:var(--subtext)"><b>Vos:</b> ' + question + '</div>';
    msgs.innerHTML += '<div id="repo-answer" style="margin-bottom:8px;color:var(--text)"><b>AI:</b> </div>';
    msgs.scrollTop = msgs.scrollHeight;
  }

  try {
    const res = await fetch('/api/repo-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repo_url: repoData.repo_url, question, readme: repoData.readme, structure: repoData.files })
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    const answerEl = document.getElementById('repo-answer');
    let text = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      decoder.decode(value, { stream: true }).split('\n').forEach(line => {
        if (line.startsWith('data: ')) {
          try {
            const d = JSON.parse(line.slice(6));
            if (d.text && answerEl) { text += d.text; answerEl.innerHTML = '<b>AI:</b> ' + text; }
          } catch {}
        }
      });
    }

    // Remove id from answered element
    if (answerEl) answerEl.removeAttribute('id');
  } catch (err) {
    const el = document.getElementById('repo-answer');
    if (el) el.innerHTML = '<b>AI:</b> Error: ' + err.message;
  }
}

async function suggestRepo() {
  if (!repoData) return;
  const title = prompt('Título de la sugerencia:');
  if (!title) return;
  const body = prompt('Descripción detallada:');
  if (!body) return;

  try {
    const data = await fetch('/api/repo-suggest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repo_path: repoData.repo_path, title, body })
    }).then(r => r.json());

    if (data.ok) alert('✅ Issue creado: ' + data.issue_url);
    else if (data.error === 'GITHUB_TOKEN not configured') alert('⚠️ Configurá GITHUB_TOKEN para crear issues');
    else alert('Error: ' + JSON.stringify(data));
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

// Init
loadTree();

// ─── SelectionContext ────────────────────────────────────────────────────────
// Tracks what the user has selected in the article viewer.
// Shared with voice assistant, zoom, chat and any agent.

window.selectionContext = {
  text: '',           // selected text
  paragraph: '',      // surrounding paragraph context
  filePath: '',       // current article
  range: null,        // DOM range for replacement
};

function updateSelectionContext() {
  const sel = window.getSelection();
  if (!sel || sel.isCollapsed || !sel.rangeCount) return false;
  
  const text = sel.toString().trim();
  if (!text || text.length < 3) return false;
  
  // Get surrounding paragraph
  const range = sel.getRangeAt(0);
  const container = range.commonAncestorContainer;
  const para = container.nodeType === 3
    ? container.parentElement?.closest('p,li,h1,h2,h3,h4,blockquote') || container.parentElement
    : container.closest('p,li,h1,h2,h3,h4,blockquote') || container;
  
  window.selectionContext = {
    text,
    paragraph: para?.textContent?.trim().slice(0, 500) || '',
    filePath: window.currentFilePath || '',
    range: range.cloneRange(),
  };
  return true;
}

// Show floating action bar on selection
let selectionMenu = null;

function createSelectionMenu() {
  const div = document.createElement('div');
  div.id = 'selection-menu';
  div.style.cssText = `
    position:fixed; z-index:200; background:var(--surface);
    border:1px solid var(--surface2); border-radius:10px;
    padding:6px 8px; display:flex; gap:4px; align-items:center;
    box-shadow:0 4px 20px rgba(0,0,0,0.5); pointer-events:all;
    font-size:12px;
  `;
  div.innerHTML = `
    <button class="sel-btn" onclick="selectionAction('rewrite')" title="Reescribir">✏️ Reescribir</button>
    <button class="sel-btn" onclick="selectionAction('expand')" title="Expandir">🔍 Expandir</button>
    <button class="sel-btn" onclick="selectionAction('simplify')" title="Simplificar">⚡ Simplificar</button>
    <button class="sel-btn" onclick="selectionAction('add-to-kb')" title="Agregar a KB">📌 KB</button>
    <button class="sel-btn" onclick="selectionAction('voice')" title="Hablar sobre esto">🎙️ Voz</button>
    <span style="width:1px;height:16px;background:var(--surface2);margin:0 2px"></span>
    <button class="sel-btn sel-close" onclick="hideSelectionMenu()">✕</button>
  `;
  // Style buttons
  div.querySelectorAll('.sel-btn').forEach(b => {
    b.style.cssText = 'background:none;border:none;color:var(--text);cursor:pointer;padding:4px 8px;border-radius:6px;white-space:nowrap;font-size:11px;font-family:inherit;';
    b.onmouseover = () => b.style.background = 'var(--surface2)';
    b.onmouseout = () => b.style.background = 'none';
  });
  document.body.appendChild(div);
  return div;
}

function showSelectionMenu(x, y) {
  if (!selectionMenu) selectionMenu = createSelectionMenu();
  selectionMenu.style.display = 'flex';
  // Position above the selection
  const menuW = 340;
  const left = Math.min(x, window.innerWidth - menuW - 10);
  const top = y - 52;
  selectionMenu.style.left = Math.max(8, left) + 'px';
  selectionMenu.style.top = Math.max(8, top) + 'px';
}

function hideSelectionMenu() {
  if (selectionMenu) selectionMenu.style.display = 'none';
}

async function selectionAction(action) {
  const ctx = window.selectionContext;
  if (!ctx.text) return;
  hideSelectionMenu();

  if (action === 'voice') {
    // Open voice with selection as context
    window._voiceSelectionContext = ctx;
    openVoiceAssistant();
    return;
  }

  if (action === 'add-to-kb') {
    // Save selection as a raw note
    await fetch('/api/article/append-section', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filePath: ctx.filePath,
        title: 'Nota — ' + new Date().toLocaleDateString('es'),
        content: ctx.text
      })
    });
    // Flash selection green
    const range = ctx.range;
    if (range) {
      const mark = document.createElement('mark');
      mark.style.cssText = 'background:#22c55e33;border-radius:3px;';
      range.surroundContents(mark);
      setTimeout(() => { mark.replaceWith(...mark.childNodes); }, 2000);
    }
    return;
  }

  // LLM actions: rewrite, expand, simplify
  const prompts = {
    rewrite: 'Reescribí este texto de forma más clara y concisa en español:\n\n',
    expand: 'Expandí este texto con más detalle técnico, ejemplos concretos y profundidad:\n\n',
    simplify: 'Simplificá este texto a su esencia en 1-2 oraciones, sin jerga:\n\n',
  };

  const prompt = prompts[action];
  if (!prompt) return;

  // Show inline loading indicator
  const range = ctx.range;
  let loadingEl = null;
  if (range) {
    loadingEl = document.createElement('span');
    loadingEl.style.cssText = 'background:var(--accent);color:var(--bg);border-radius:3px;padding:1px 4px;font-size:11px;';
    loadingEl.textContent = '⏳';
    range.collapse(false);
    range.insertNode(loadingEl);
  }

  try {
    const res = await fetch('/api/selection-action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, text: ctx.text, paragraph: ctx.paragraph, filePath: ctx.filePath })
    });
    const data = await res.json();
    if (data.result && range) {
      // Replace selected text with result
      if (loadingEl) loadingEl.remove();
      // Re-select the original range
      const originalCtx = window.selectionContext;
      if (originalCtx.range) {
        // Update article content
        const content = document.getElementById('content-body')?.textContent || '';
        await fetch('/api/article/rewrite-selection', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filePath: ctx.filePath,
            original: ctx.text,
            replacement: data.result
          })
        });
        // Reload article
        loadFile(ctx.filePath);
      }
    }
  } catch (err) {
    if (loadingEl) loadingEl.remove();
    console.error('selectionAction error:', err);
  }
}

// Listen for selections in the content area
document.addEventListener('mouseup', (e) => {
  // Small delay to let selection settle
  setTimeout(() => {
    const contentBody = document.getElementById('content-body');
    if (!contentBody) return;
    if (!contentBody.contains(e.target) && e.target.id !== 'selection-menu' && !e.target.closest('#selection-menu')) {
      hideSelectionMenu();
      return;
    }
    if (updateSelectionContext()) {
      const rect = e.target.getBoundingClientRect();
      showSelectionMenu(e.clientX, e.clientY);
    } else {
      hideSelectionMenu();
    }
  }, 50);
});

// Hide on click elsewhere
document.addEventListener('mousedown', (e) => {
  if (!e.target.closest('#selection-menu')) {
    hideSelectionMenu();
  }
});

// Expose context for voice assistant
function getSelectionContextForAgent() {
  const ctx = window.selectionContext;
  const hasSelection = ctx.text.length > 0;
  return {
    hasSelection,
    selectedText: ctx.text,
    paragraph: ctx.paragraph,
    filePath: ctx.filePath,
    instruction: hasSelection
      ? `El usuario tiene seleccionado este texto: "${ctx.text.slice(0, 200)}". Podés referirte a esa selección específicamente.`
      : `No hay texto seleccionado. El artículo abierto es: ${ctx.filePath}`
  };
}

// ─── Ideas Planning ──────────────────────────────────────────────────────────

let planCache = {}; // idx → plan markdown

async function planIdea(idx) {
  const idea = ideasCache[idx];
  if (!idea) return;
  
  const planEl = document.getElementById('plan-content-' + idx);
  const sendBtn = document.getElementById('send-plan-btn-' + idx);
  if (!planEl) return;
  
  planEl.style.display = 'block';
  planEl.innerHTML = '<span style="color:var(--subtext)">⏳ Generando plan...</span>';
  if (sendBtn) sendBtn.style.display = 'none';
  
  try {
    const res = await fetch('/api/plan-idea', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idea_title: idea.concept || idea.filename, idea_content: idea.content || idea.html.replace(/<[^>]+>/g,'') })
    });
    
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let markdown = '';
    planEl.innerHTML = '';
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      decoder.decode(value, { stream: true }).split('\n').forEach(line => {
        if (line.startsWith('data: ')) {
          try {
            const d = JSON.parse(line.slice(6));
            if (d.text) {
              markdown += d.text;
              planEl.innerHTML = typeof marked !== 'undefined' ? marked.parse(markdown) : markdown.replace(/\n/g, '<br>');
            }
          } catch {}
        }
      });
    }
    
    planCache[idx] = markdown;
    if (sendBtn) sendBtn.style.display = 'block';
    
    // Auto-save plan to viz/plans/
    fetch('/api/article/append-section', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filePath: 'viz/ideas/ideas-' + (idea.date || new Date().toISOString().slice(0,10)) + '.md',
        title: 'Plan de Ejecución — ' + (idea.concept || 'Idea'),
        content: markdown
      })
    }).catch(() => {});
    
  } catch (err) {
    planEl.innerHTML = '<span style="color:#f87171">Error: ' + err.message + '</span>';
  }
}

async function sendPlanToTonga(idx) {
  const idea = ideasCache[idx];
  const plan = planCache[idx];
  if (!plan) return;

  const sendBtn = document.getElementById('send-plan-btn-' + idx);
  if (sendBtn) { sendBtn.textContent = '⏳ Enviando...'; sendBtn.disabled = true; }

  try {
    const res = await fetch('/api/send-plan-to-tonga', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idea_title: idea.concept || idea.filename, plan_content: plan })
    });
    const data = await res.json();
    if (data.ok) {
      if (sendBtn) { sendBtn.textContent = '✅ Enviado a Tonga'; sendBtn.style.background = 'var(--green)'; }
    } else {
      if (sendBtn) { sendBtn.textContent = '🚀 Enviar a Tonga'; sendBtn.disabled = false; }
    }
  } catch (err) {
    if (sendBtn) { sendBtn.textContent = '🚀 Enviar a Tonga'; sendBtn.disabled = false; }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Feature 1: Git History Panel
// ═══════════════════════════════════════════════════════════════════════════════

document.getElementById('btn-history').addEventListener('click', toggleHistory);
document.getElementById('history-close').addEventListener('click', () => {
  document.getElementById('history-panel').classList.remove('open');
});

async function toggleHistory() {
  const panel = document.getElementById('history-panel');
  if (panel.classList.contains('open')) {
    panel.classList.remove('open');
    return;
  }
  const fp = window.currentFilePath;
  if (!fp) return;
  panel.classList.add('open');
  const list = document.getElementById('history-list');
  list.innerHTML = '<div style="padding:12px;color:var(--subtext);font-size:12px">Loading...</div>';

  try {
    const res = await fetch('/api/git-history?path=' + encodeURIComponent(fp));
    const commits = await res.json();
    if (!commits.length) {
      list.innerHTML = '<div style="padding:12px;color:var(--subtext);font-size:12px">No history found</div>';
      return;
    }
    list.innerHTML = commits.map((c, i) => {
      const initials = c.author.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
      const color = historyAvatarColor(c.author);
      return '<div class="history-item" data-idx="' + i + '" data-hash="' + esc(c.hash) + '">'
        + '<span class="history-avatar" style="background:' + color + '">' + initials + '</span>'
        + '<span class="history-meta">'
        + '<span class="history-when">' + esc(c.when) + '</span>'
        + '<span class="history-msg" title="' + esc(c.message) + '">' + esc(c.message) + '</span>'
        + '</span></div>';
    }).join('');
    list.querySelectorAll('.history-item').forEach(el => {
      el.addEventListener('click', () => loadHistoryDiff(el));
    });
  } catch (err) {
    list.innerHTML = '<div style="padding:12px;color:var(--red);font-size:12px">Error: ' + esc(err.message) + '</div>';
  }
}

function historyAvatarColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return 'hsl(' + (Math.abs(h) % 360) + ', 70%, 55%)';
}

async function loadHistoryDiff(el) {
  const list = document.getElementById('history-list');
  // Toggle active
  list.querySelectorAll('.history-item').forEach(i => i.classList.remove('active'));
  el.classList.toggle('active');
  // Remove existing diffs
  list.querySelectorAll('.history-diff').forEach(d => d.remove());
  const hash = el.dataset.hash;
  const fp = window.currentFilePath;
  if (!hash || !fp) return;
  const diffEl = document.createElement('div');
  diffEl.className = 'history-diff';
  diffEl.textContent = 'Loading diff...';
  el.after(diffEl);
  try {
    const res = await fetch('/api/git-diff?path=' + encodeURIComponent(fp) + '&hash=' + encodeURIComponent(hash));
    const data = await res.json();
    diffEl.textContent = data.diff || 'No diff available';
  } catch (err) {
    diffEl.textContent = 'Error loading diff';
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Feature 2: Rich Editor with Live Preview
// ═══════════════════════════════════════════════════════════════════════════════

let editorOpen = false;
let editorOriginal = '';
let editorDirty = false;
let editorAutoSaveTimer = null;
let editorPreviewTimer = null;
// CodeMirror instance for the wiki editor + remote cursor overlay state
let wikiCM = null;
let _remoteCursorMarks = {};  // userId → { marker, widget }
let _cursorBroadcastTimer = null;
let _cursorLastActivityAt = 0;
let _cursorIdleCheckTimer = null;
let _cursorIsIdle = false;
// Last server-known file version hash so the client can detect remote changes
// and auto-reload when someone else saves. Updated on file load and after each
// successful local save.
let _lastFileVersion = null;

document.getElementById('btn-edit').addEventListener('click', toggleEditor);
{
  const btnEditInline = document.getElementById('btn-edit-inline');
  if (btnEditInline) btnEditInline.addEventListener('click', toggleEditor);
}

// Wire the formatting toolbar — each button has data-fmt. Dispatches to applyFormat().
document.querySelectorAll('.editor-toolbar .tb-btn[data-fmt]').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    applyFormat(btn.dataset.fmt);
  });
});

// ─── Markdown formatting helpers ─────────────────────────────────────────────
function applyFormat(kind) {
  if (!wikiCM) return;
  const doc = wikiCM.getDoc();
  const sel = doc.getSelection();
  const cursor = doc.getCursor();

  const wrap = (left, right) => {
    if (sel) doc.replaceSelection(left + sel + right);
    else {
      doc.replaceRange(left + right, cursor);
      doc.setCursor({ line: cursor.line, ch: cursor.ch + left.length });
    }
    wikiCM.focus();
  };

  const prefixLine = (prefix) => {
    const line = doc.getCursor().line;
    const text = doc.getLine(line);
    // If already prefixed, strip it (toggle behavior)
    if (text.startsWith(prefix)) {
      doc.replaceRange(text.slice(prefix.length), { line, ch: 0 }, { line, ch: text.length });
    } else {
      // Strip any existing heading prefix before adding the new one
      const stripped = text.replace(/^(#{1,6}\s+|>\s+|-\s+|\d+\.\s+|- \[[ x]\]\s+)/, '');
      doc.replaceRange(prefix + stripped, { line, ch: 0 }, { line, ch: text.length });
    }
    wikiCM.focus();
  };

  const insertAtCursor = (text) => {
    doc.replaceRange(text, doc.getCursor());
    wikiCM.focus();
  };

  switch (kind) {
    case 'bold':      return wrap('**', '**');
    case 'italic':    return wrap('*', '*');
    case 'strike':    return wrap('~~', '~~');
    case 'code':      return wrap('`', '`');
    case 'h1':        return prefixLine('# ');
    case 'h2':        return prefixLine('## ');
    case 'h3':        return prefixLine('### ');
    case 'ul':        return prefixLine('- ');
    case 'ol':        return prefixLine('1. ');
    case 'quote':     return prefixLine('> ');
    case 'task':      return prefixLine('- [ ] ');
    case 'link': {
      const url = prompt('URL:');
      if (!url) return;
      const label = sel || 'link text';
      return wrap('[', '](' + url + ')') || doc.replaceSelection('[' + label + '](' + url + ')');
    }
    case 'wikilink': return openWikiPicker();
    case 'codeblock': return insertAtCursor('\n```\n\n```\n');
    case 'hr':        return insertAtCursor('\n\n---\n\n');
  }
}
// Cmd/Ctrl + B / I keyboard shortcuts — supplement CM's own map
document.addEventListener('keydown', (e) => {
  if (!editorOpen || !wikiCM || !wikiCM.hasFocus()) return;
  if (!(e.metaKey || e.ctrlKey)) return;
  if (e.key === 'b') { e.preventDefault(); applyFormat('bold'); }
  else if (e.key === 'i') { e.preventDefault(); applyFormat('italic'); }
});

// ─── Wiki page picker ─────────────────────────────────────────────────────────
// Modal with fuzzy-search of all wiki/ files. Inserts [[slug]] at the caret.
let _wikiPickerIndex = null;
async function loadWikiPickerIndex() {
  if (_wikiPickerIndex) return _wikiPickerIndex;
  try {
    const res = await fetch('/api/files');
    const tree = await res.json();
    const files = [];
    const walk = (nodes) => {
      for (const n of nodes || []) {
        if (n.type === 'dir') walk(n.children);
        else if (n.type === 'file' && n.path.startsWith('wiki/') && n.path.endsWith('.md')) {
          const slug = n.path.split('/').pop().replace(/\.md$/, '');
          const label = slug.replace(/-/g, ' ');
          files.push({ slug, label, path: n.path });
        }
      }
    };
    walk(tree);
    files.sort((a, b) => a.label.localeCompare(b.label));
    _wikiPickerIndex = files;
  } catch (e) {
    _wikiPickerIndex = [];
  }
  return _wikiPickerIndex;
}

async function openWikiPicker() {
  const modal = document.getElementById('wiki-picker-modal');
  if (!modal) return;
  modal.style.display = 'flex';
  const input = document.getElementById('wiki-picker-input');
  input.value = '';
  await loadWikiPickerIndex();
  renderWikiPickerList('');
  setTimeout(() => input.focus(), 40);
  if (window.lucide) lucide.createIcons();
}
function closeWikiPicker() {
  document.getElementById('wiki-picker-modal').style.display = 'none';
  if (wikiCM) wikiCM.focus();
}
function renderWikiPickerList(query) {
  const list = document.getElementById('wiki-picker-list');
  if (!list || !_wikiPickerIndex) return;
  const q = (query || '').toLowerCase();
  const filtered = q
    ? _wikiPickerIndex.filter((f) => f.slug.toLowerCase().includes(q) || f.label.toLowerCase().includes(q))
    : _wikiPickerIndex;
  if (!filtered.length) {
    list.innerHTML = '<div class="wiki-picker-empty">No matches</div>';
    return;
  }
  list.innerHTML = filtered.slice(0, 40).map((f, i) => `
    <div class="wiki-picker-item ${i === 0 ? 'active' : ''}" data-slug="${esc(f.slug)}" data-label="${esc(f.label)}">
      <i data-lucide="file-text"></i>
      <div class="wpi-main">
        <div class="wpi-label">${esc(f.label)}</div>
        <div class="wpi-path">${esc(f.path)}</div>
      </div>
    </div>
  `).join('');
  list.querySelectorAll('.wiki-picker-item').forEach((el) => {
    el.addEventListener('click', () => insertWikiLinkFromPicker(el.dataset.slug));
  });
  if (window.lucide) lucide.createIcons();
}
function insertWikiLinkFromPicker(slug) {
  if (!wikiCM) return;
  const display = slug.replace(/-/g, ' ');
  wikiCM.getDoc().replaceRange('[[' + display + ']]', wikiCM.getCursor());
  closeWikiPicker();
}

// Wikilink autocomplete INSIDE the editor — triggered on `[[`
function wikiLinkHint(cm) {
  const cursor = cm.getCursor();
  const line = cm.getLine(cursor.line);
  const before = line.slice(0, cursor.ch);
  const m = before.match(/\[\[([^\]]*)$/);
  if (!m) return null;
  const query = (m[1] || '').toLowerCase();
  if (!_wikiPickerIndex) return null;
  const matches = _wikiPickerIndex
    .filter((f) => !query || f.slug.toLowerCase().includes(query) || f.label.toLowerCase().includes(query))
    .slice(0, 12);
  if (!matches.length) return null;
  return {
    list: matches.map((f) => ({
      text: f.label + ']]',
      displayText: f.label,
    })),
    from: CodeMirror.Pos(cursor.line, cursor.ch - query.length),
    to: CodeMirror.Pos(cursor.line, cursor.ch),
  };
}

window.applyFormat = applyFormat;
window.openWikiPicker = openWikiPicker;
window.closeWikiPicker = closeWikiPicker;
document.getElementById('editor-save').addEventListener('click', saveEditor);
document.getElementById('editor-discard').addEventListener('click', discardEditor);
document.getElementById('editor-fullscreen').addEventListener('click', () => {
  document.getElementById('editor-container').classList.toggle('editor-fullscreen');
});

function toggleEditor() {
  if (editorOpen) {
    closeEditor();
    return;
  }
  const fp = window.currentFilePath;
  if (!fp) return;
  openEditor(fp);
}

async function openEditor(fp) {
  const res = await fetch('/api/file?path=' + encodeURIComponent(fp));
  const data = await res.json();
  if (data.error) return;

  // Reconstruct raw content (frontmatter + content)
  let raw = '';
  if (data.frontmatter && Object.keys(data.frontmatter).length) {
    raw = '---\n';
    for (const [k, v] of Object.entries(data.frontmatter)) raw += k + ': ' + v + '\n';
    raw += '---\n\n';
  }
  raw += data.content;

  editorOriginal = raw;
  editorDirty = false;
  editorOpen = true;

  const textarea = document.getElementById('editor-textarea');
  textarea.value = raw;
  const preview = document.getElementById('editor-preview');
  preview.innerHTML = renderMarkdownPreview(data.content);

  // Show editor, hide content-body
  document.getElementById('content-body').style.display = 'none';
  document.getElementById('backlinks').style.display = 'none';
  const ec = document.getElementById('editor-container');
  ec.classList.add('open');
  ec.style.display = '';

  document.getElementById('unsaved-dot').classList.remove('visible');
  document.getElementById('save-indicator').textContent = '';
  document.getElementById('btn-edit').classList.add('active');

  // Initialise / refresh the CodeMirror instance that overlays the textarea.
  // We prefer CM because (a) it gives markdown syntax highlighting, (b) we can
  // position remote user cursors as bookmarks with name labels, and (c) it has
  // a proper cursorActivity event we can hook for broadcasting.
  initWikiCodeMirror(raw);
  textarea.addEventListener('input', onEditorInput);

  // Join presence — initial heartbeat posts an empty cursor; subsequent updates
  // come from the CM cursorActivity listener.
  presenceJoin(fp);
  startCursorIdleCheck();
  // Record the file version we just loaded so we can detect remote changes later
  _lastFileVersion = null; // first presence poll will set this from server response
}

function initWikiCodeMirror(content) {
  const textarea = document.getElementById('editor-textarea');
  if (!textarea) return;
  if (typeof CodeMirror === 'undefined') {
    setTimeout(() => initWikiCodeMirror(content), 150);
    return;
  }
  if (wikiCM) {
    wikiCM.setValue(content);
    wikiCM.refresh();
    setTimeout(() => wikiCM.focus(), 10);
    return;
  }
  textarea.classList.add('cm-hidden');
  wikiCM = CodeMirror.fromTextArea(textarea, {
    mode: 'markdown',
    lineNumbers: true,
    lineWrapping: true,
    matchBrackets: true,
    indentUnit: 2,
    tabSize: 2,
    styleActiveLine: true,
    viewportMargin: 50,
  });
  wikiCM.setValue(content);
  wikiCM.on('change', (cm, change) => {
    textarea.value = wikiCM.getValue();
    onEditorInput();
    // Auto-trigger wikilink autocomplete when the user types the second `[`
    if (change.origin === '+input' && change.text && change.text[0] === '[') {
      const cursor = cm.getCursor();
      const before = cm.getLine(cursor.line).slice(0, cursor.ch);
      if (before.endsWith('[[')) {
        // Preload the index in the background (no-op if cached)
        loadWikiPickerIndex().then(() => {
          if (typeof CodeMirror !== 'undefined' && CodeMirror.showHint) {
            cm.showHint({ hint: wikiLinkHint, completeSingle: false });
          }
        });
      }
    }
  });
  wikiCM.on('cursorActivity', () => {
    scheduleCursorBroadcast();
  });
  // Preload wiki picker index so autocomplete feels instant
  loadWikiPickerIndex();
  setTimeout(() => wikiCM && wikiCM.focus(), 30);
}

// Wiki picker input handlers — Enter picks the highlighted item, Esc closes,
// Arrow keys move highlight, typing filters.
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('wiki-picker-input');
  if (!input) return;
  input.addEventListener('input', (e) => renderWikiPickerList(e.target.value));
  input.addEventListener('keydown', (e) => {
    const list = document.getElementById('wiki-picker-list');
    const items = [...list.querySelectorAll('.wiki-picker-item')];
    const activeIdx = items.findIndex((el) => el.classList.contains('active'));
    if (e.key === 'Escape') { closeWikiPicker(); return; }
    if (e.key === 'Enter') {
      e.preventDefault();
      const active = items[activeIdx] || items[0];
      if (active) insertWikiLinkFromPicker(active.dataset.slug);
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const next = e.key === 'ArrowDown'
        ? Math.min(items.length - 1, activeIdx + 1)
        : Math.max(0, activeIdx - 1);
      items.forEach((el, i) => el.classList.toggle('active', i === next));
      items[next]?.scrollIntoView({ block: 'nearest' });
    }
  });
});

function scheduleCursorBroadcast() {
  _cursorLastActivityAt = Date.now();
  if (_cursorIsIdle) _cursorIsIdle = false;
  clearTimeout(_cursorBroadcastTimer);
  _cursorBroadcastTimer = setTimeout(broadcastCursor, 250);
}

// When a user stops moving their cursor for 10 seconds we broadcast cursor:null
// so their bar disappears from other users' editors. Any subsequent edit or
// selection revives the broadcast.
function startCursorIdleCheck() {
  clearInterval(_cursorIdleCheckTimer);
  _cursorLastActivityAt = Date.now();
  _cursorIsIdle = false;
  _cursorIdleCheckTimer = setInterval(() => {
    if (!editorOpen) { clearInterval(_cursorIdleCheckTimer); return; }
    const idleMs = Date.now() - _cursorLastActivityAt;
    if (idleMs > 10000 && !_cursorIsIdle) {
      _cursorIsIdle = true;
      fetch('/api/presence/cursor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filePath: window.currentFilePath,
          userId: KB_USER_ID,
          cursor: null,
          dirty: editorDirty,
        }),
      }).catch(() => {});
    }
  }, 2500);
}
function stopCursorIdleCheck() {
  clearInterval(_cursorIdleCheckTimer);
  _cursorIdleCheckTimer = null;
}

async function broadcastCursor() {
  if (!wikiCM || !window.currentFilePath) return;
  const cursor = wikiCM.getCursor();
  try {
    await fetch('/api/presence/cursor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filePath: window.currentFilePath,
        userId: KB_USER_ID,
        cursor: { line: cursor.line, ch: cursor.ch },
        dirty: editorDirty,
      }),
    });
  } catch {}
}

// Render a remote user's caret as a CodeMirror bookmark — a colored vertical
// line with a floating name label above it. Label turns yellow + shows a dot
// when the remote user has unsaved changes (dirty flag from presence).
function renderRemoteCursors(editors) {
  if (!wikiCM) return;
  const stillPresent = new Set(editors.filter((e) => e.id !== KB_USER_ID).map((e) => e.id));
  for (const uid of Object.keys(_remoteCursorMarks)) {
    if (!stillPresent.has(uid)) {
      try { _remoteCursorMarks[uid].marker.clear(); } catch {}
      delete _remoteCursorMarks[uid];
    }
  }
  for (const ed of editors) {
    if (ed.id === KB_USER_ID) continue;
    if (!ed.cursor) continue;
    const { line, ch } = ed.cursor;
    if (typeof line !== 'number' || typeof ch !== 'number') continue;
    if (line < 0 || line >= wikiCM.lineCount()) continue;
    const lineLen = (wikiCM.getLine(line) || '').length;
    const safeCh = Math.min(Math.max(0, ch), lineLen);
    if (_remoteCursorMarks[ed.id]) {
      try { _remoteCursorMarks[ed.id].marker.clear(); } catch {}
    }
    const el = document.createElement('span');
    el.className = 'remote-cursor' + (ed.dirty ? ' dirty' : '');
    el.style.setProperty('--remote-color', ed.color || 'var(--accent)');
    const dirtyDot = ed.dirty ? '<span class="remote-cursor-dot" title="unsaved"></span>' : '';
    el.innerHTML =
      '<span class="remote-cursor-bar"></span>' +
      '<span class="remote-cursor-label">' +
        esc(ed.name) + (ed.dirty ? ' <span class="remote-cursor-typing">typing…</span>' : '') + dirtyDot +
      '</span>';
    const marker = wikiCM.setBookmark({ line, ch: safeCh }, { widget: el, insertLeft: true });
    _remoteCursorMarks[ed.id] = { marker, widget: el };
  }
}
window.renderRemoteCursors = renderRemoteCursors;

// Remote-change detection: if the server's fileVersion.hash differs from
// what we last knew, someone else saved. Auto-reload if local is clean;
// otherwise show a conflict banner with Reload / Keep mine options.
async function handleRemoteFileVersion(fileVersion) {
  if (!fileVersion || !editorOpen) return;
  if (!_lastFileVersion) {
    _lastFileVersion = fileVersion;
    return;
  }
  if (fileVersion.hash === _lastFileVersion.hash) return;

  // Remote changed. Decide based on local dirty state.
  const savedBy = fileVersion.savedBy;
  if (savedBy === KB_USER_ID) {
    // We're seeing our own save echo back; just update the cache.
    _lastFileVersion = fileVersion;
    return;
  }

  if (!editorDirty) {
    // Auto-reload — local is clean, remote has the fresh truth
    _lastFileVersion = fileVersion;
    const fp = window.currentFilePath;
    try {
      const res = await fetch('/api/file?path=' + encodeURIComponent(fp));
      const data = await res.json();
      if (data.content != null) {
        let raw = '';
        if (data.frontmatter && Object.keys(data.frontmatter).length) {
          raw = '---\n';
          for (const [k, v] of Object.entries(data.frontmatter)) raw += k + ': ' + v + '\n';
          raw += '---\n\n';
        }
        raw += data.content;
        if (wikiCM) {
          // Snapshot everything we need to restore BEFORE touching the doc
          const prevCursor = wikiCM.getCursor();
          const prevScroll = wikiCM.getScrollInfo();
          const wasFocused = wikiCM.hasFocus();
          // Replace contents without rebuilding the doc from scratch — this keeps
          // CM's internal selection + scroll state and undo history intact
          wikiCM.replaceRange(
            raw,
            { line: 0, ch: 0 },
            { line: wikiCM.lineCount(), ch: 0 }
          );
          // Clamp cursor to the new doc bounds (remote save may have shrunk it)
          const maxLine = Math.max(0, wikiCM.lineCount() - 1);
          const targetLine = Math.min(prevCursor.line, maxLine);
          const targetLineLen = (wikiCM.getLine(targetLine) || '').length;
          const targetCh = Math.min(prevCursor.ch, targetLineLen);
          wikiCM.setCursor({ line: targetLine, ch: targetCh });
          // Restore scroll position so the user isn't yanked to line 0
          wikiCM.scrollTo(prevScroll.left, prevScroll.top);
          // Re-focus if we had focus — setValue/replaceRange can steal it
          if (wasFocused) wikiCM.focus();
          editorOriginal = raw;
          editorDirty = false;
          document.getElementById('unsaved-dot').classList.remove('visible');
        }
        primeToast('Reloaded — remote saved by another user', 'refresh-cw');
      }
    } catch (e) {
      console.warn('[sync] auto-reload failed:', e.message);
    }
    return;
  }

  // Local dirty + remote changed — conflict. Show banner.
  showRemoteConflictBanner(fileVersion);
}

function showRemoteConflictBanner(fileVersion) {
  let banner = document.getElementById('remote-conflict-banner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'remote-conflict-banner';
    document.getElementById('editor-container').prepend(banner);
  }
  const savedBy = fileVersion.savedBy ? ` by ${esc(fileVersion.savedBy.slice(0, 8))}` : '';
  banner.innerHTML =
    '<i data-lucide="alert-triangle" style="width:14px;height:14px;vertical-align:-2px;margin-right:8px;color:var(--yellow);"></i>' +
    'Remote changed' + savedBy + '. Your local edits are unsaved.' +
    '<button onclick="acceptRemoteVersion()" class="pp-btn" style="margin-left:12px;"><i data-lucide="download"></i> Take theirs</button>' +
    '<button onclick="dismissRemoteConflict()" class="pp-btn" style="margin-left:6px;"><i data-lucide="shield"></i> Keep mine</button>';
  banner.style.display = 'flex';
  if (window.lucide) lucide.createIcons();
}

async function acceptRemoteVersion() {
  if (!window.currentFilePath) return;
  const res = await fetch('/api/file?path=' + encodeURIComponent(window.currentFilePath));
  const data = await res.json();
  if (data.content != null) {
    let raw = '';
    if (data.frontmatter && Object.keys(data.frontmatter).length) {
      raw = '---\n';
      for (const [k, v] of Object.entries(data.frontmatter)) raw += k + ': ' + v + '\n';
      raw += '---\n\n';
    }
    raw += data.content;
    if (wikiCM) wikiCM.setValue(raw);
    editorOriginal = raw;
    editorDirty = false;
    document.getElementById('unsaved-dot').classList.remove('visible');
  }
  dismissRemoteConflict();
  primeToast('Applied remote version', 'check');
}

function dismissRemoteConflict() {
  const banner = document.getElementById('remote-conflict-banner');
  if (banner) banner.style.display = 'none';
}

window.acceptRemoteVersion = acceptRemoteVersion;
window.dismissRemoteConflict = dismissRemoteConflict;

function onEditorInput() {
  const textarea = document.getElementById('editor-textarea');
  const val = wikiCM ? wikiCM.getValue() : textarea.value;
  if (wikiCM) textarea.value = val;
  editorDirty = val !== editorOriginal;
  document.getElementById('unsaved-dot').classList.toggle('visible', editorDirty);

  // Live preview with debounce
  clearTimeout(editorPreviewTimer);
  editorPreviewTimer = setTimeout(() => {
    // Strip frontmatter for preview
    let content = val;
    if (content.startsWith('---')) {
      const end = content.indexOf('---', 3);
      if (end !== -1) content = content.slice(end + 3).trim();
    }
    document.getElementById('editor-preview').innerHTML = renderMarkdownPreview(content);
  }, 300);

  // Auto-save with debounce 5s
  clearTimeout(editorAutoSaveTimer);
  if (editorDirty) {
    editorAutoSaveTimer = setTimeout(() => {
      document.getElementById('save-indicator').textContent = 'saving…';
      saveEditor();
    }, 5000);
  }
}

function renderMarkdownPreview(md) {
  let html = '';
  if (typeof marked !== 'undefined' && marked.parse) {
    html = marked.parse(md);
  } else {
    return '<pre>' + esc(md) + '</pre>';
  }
  // Rewrite img src to go through /raw-file for local images
  html = html.replace(/<img\s+src="(?!https?:\/\/|\/raw-file\?|\/api\/)([^"]+)"/g,
    '<img src="/raw-file?path=$1"');
  return html;
}

async function saveEditor() {
  const fp = window.currentFilePath;
  if (!fp) return;
  const textarea = document.getElementById('editor-textarea');
  const content = wikiCM ? wikiCM.getValue() : textarea.value;
  if (wikiCM) textarea.value = content;
  const indicator = document.getElementById('save-indicator');
  indicator.textContent = 'saving…';

  try {
    const res = await fetch('/api/article/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filePath: fp, content, userId: KB_USER_ID })
    });
    const data = await res.json();
    if (data.ok) {
      editorOriginal = content;
      editorDirty = false;
      document.getElementById('unsaved-dot').classList.remove('visible');
      // Remember the new server-side version so presencePoll won't auto-reload
      if (data.fileVersion) _lastFileVersion = data.fileVersion;
      const pushState = data.push?.ok === true ? ' · pushed' : data.push?.ok === false ? ' · push failed' : '';
      indicator.textContent = '✓ saved' + (data.commitHash ? ' (' + data.commitHash.slice(0, 7) + ')' : '') + pushState;
      setTimeout(() => { if (indicator.textContent.startsWith('✓')) indicator.textContent = ''; }, 4000);
    } else {
      indicator.textContent = 'error: ' + (data.error || 'unknown');
    }
  } catch (err) {
    indicator.textContent = 'error: ' + err.message;
  }
}

function discardEditor() {
  if (editorDirty && !confirm('Discard unsaved changes?')) return;
  closeEditor();
}

function closeEditor() {
  editorOpen = false;
  editorDirty = false;
  clearTimeout(editorAutoSaveTimer);
  clearTimeout(editorPreviewTimer);
  clearTimeout(_cursorBroadcastTimer);
  stopCursorIdleCheck();
  // Send a final cursor:null update so other clients drop our bar immediately
  // (within their next poll) instead of waiting for the 30s staleness sweep.
  if (window.currentFilePath) {
    fetch('/api/presence/cursor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filePath: window.currentFilePath,
        userId: KB_USER_ID,
        cursor: null,
        dirty: false,
      }),
    }).catch(() => {});
  }
  // Clear remote cursor overlays but keep the CM instance around for fast re-open
  for (const uid of Object.keys(_remoteCursorMarks)) {
    try { _remoteCursorMarks[uid].marker.clear(); } catch {}
  }
  _remoteCursorMarks = {};
  // Clear the remote conflict banner if it was shown
  dismissRemoteConflict();
  _lastFileVersion = null;
  const ec = document.getElementById('editor-container');
  ec.classList.remove('open', 'editor-fullscreen');
  ec.style.display = 'none';
  document.getElementById('content-body').style.display = '';
  document.getElementById('unsaved-dot').classList.remove('visible');
  document.getElementById('btn-edit').classList.remove('active');

  // Leave presence
  presenceLeave(window.currentFilePath);

  // Reload article to show saved changes
  if (window.currentFilePath) loadFile(window.currentFilePath);
}

// Keyboard shortcuts
document.addEventListener('keydown', e => {
  if (!editorOpen) return;
  if ((e.metaKey || e.ctrlKey) && e.key === 's') {
    e.preventDefault();
    saveEditor();
  }
  if (e.key === 'Escape' && editorOpen) {
    // Only close editor if no modal is open
    if (!document.getElementById('history-panel').classList.contains('open')) {
      discardEditor();
    }
  }
});

// Warn before unload if dirty
window.addEventListener('beforeunload', e => {
  if (editorDirty) {
    e.preventDefault();
    e.returnValue = '';
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// Feature 3: Presence System (Google Docs style)
// ═══════════════════════════════════════════════════════════════════════════════

const KB_USER_ID = localStorage.getItem('kb-user-id') || (() => {
  const id = crypto.randomUUID ? crypto.randomUUID() : 'u-' + Math.random().toString(36).slice(2);
  localStorage.setItem('kb-user-id', id);
  return id;
})();
const KB_USER_NAME = localStorage.getItem('kb-user-name') || 'User ' + KB_USER_ID.slice(0, 4);

let presenceInterval = null;
let presenceCurrentFile = null;

function presenceJoin(fp) {
  presenceCurrentFile = fp;
  fetch('/api/presence/join', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filePath: fp, userId: KB_USER_ID, userName: KB_USER_NAME })
  }).catch(() => {});
  // Fast poll while actively editing so remote cursors feel near-realtime.
  // 1 s cadence matches the ~250 ms broadcast debounce closely enough that
  // users perceive each other's edits within a second.
  clearInterval(presenceInterval);
  presenceInterval = setInterval(() => presencePoll(fp), 1000);
  presencePoll(fp);
}

function presenceLeave(fp) {
  if (!fp) return;
  clearInterval(presenceInterval);
  presenceInterval = null;
  presenceCurrentFile = null;
  fetch('/api/presence/leave', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filePath: fp, userId: KB_USER_ID })
  }).catch(() => {});
  document.getElementById('presence-avatars').innerHTML = '';
  const banner = document.getElementById('presence-banner');
  banner.classList.remove('visible');
}

async function presencePoll(fp) {
  if (!fp || fp !== presenceCurrentFile) return;
  // Heartbeat: re-join to update lastSeen (carries our dirty flag too)
  fetch('/api/presence/join', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filePath: fp,
      userId: KB_USER_ID,
      userName: KB_USER_NAME,
      dirty: editorDirty,
    })
  }).catch(() => {});

  try {
    const res = await fetch('/api/presence?filePath=' + encodeURIComponent(fp));
    const data = await res.json();
    const others = (data.editors || []).filter(e => e.id !== KB_USER_ID);
    renderPresence(others);
    // Detect remote file changes and auto-reload or flag conflict
    if (data.fileVersion && typeof handleRemoteFileVersion === 'function') {
      handleRemoteFileVersion(data.fileVersion);
    }
  } catch {}
}

function renderPresence(editors) {
  const avatars = document.getElementById('presence-avatars');
  const banner = document.getElementById('presence-banner');
  if (!editors.length) {
    avatars.innerHTML = '';
    banner.classList.remove('visible');
    return;
  }
  avatars.innerHTML = editors.map(e => {
    const initials = e.name.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const dirtyClass = e.dirty ? ' dirty' : '';
    const dirtyLabel = e.dirty ? ' · unsaved' : '';
    return '<span class="presence-avatar' + dirtyClass + '" style="background:' + esc(e.color) + ';position:relative;" title="' + esc(e.name) + dirtyLabel + '">'
      + initials
      + '<span class="presence-tooltip">' + esc(e.name) + dirtyLabel + '</span></span>';
  }).join('');
  banner.innerHTML = '<i data-lucide="pencil" style="width:13px;height:13px;vertical-align:-2px;margin-right:6px;"></i>Being edited by ' + editors.map(e => esc(e.name)).join(', ');
  banner.classList.add('visible');
  if (window.lucide) lucide.createIcons();
  // Google-Docs-style live cursors: overlay the CM editor with each remote user's caret
  if (editorOpen && wikiCM && typeof renderRemoteCursors === 'function') {
    renderRemoteCursors(editors);
  }
}

// When navigating away, also poll presence for view-only
const _origLoadFile = typeof loadFile === 'function' ? loadFile : null;
// Passive presence: poll when viewing any file (not editing)
let viewPresenceInterval = null;
function startViewPresencePoll(fp) {
  clearInterval(viewPresenceInterval);
  viewPresenceInterval = setInterval(async () => {
    if (editorOpen) return; // editor handles its own presence
    try {
      const res = await fetch('/api/presence?filePath=' + encodeURIComponent(fp));
      const data = await res.json();
      const others = (data.editors || []).filter(e => e.id !== KB_USER_ID);
      renderPresence(others);
    } catch {}
  }, 5000);
  // Immediate first poll
  fetch('/api/presence?filePath=' + encodeURIComponent(fp))
    .then(r => r.json())
    .then(data => {
      const others = (data.editors || []).filter(e => e.id !== KB_USER_ID);
      renderPresence(others);
    }).catch(() => {});
}

// Hook into loadFile to start presence polling for each article
const _origLoadFileForPresence = window.loadFile || loadFile;
const _patchedLoadFile = function(fp) {
  // Clean up previous presence
  if (!editorOpen) {
    document.getElementById('presence-avatars').innerHTML = '';
    document.getElementById('presence-banner').classList.remove('visible');
  }
  startViewPresencePoll(fp);
};
// Inject after loadFile call - we listen on the tree-file click
const _origBindTree = typeof bindTree === 'function' ? bindTree : null;

// Leave presence on page unload
window.addEventListener('beforeunload', () => {
  if (presenceCurrentFile) {
    navigator.sendBeacon('/api/presence/leave', new Blob([JSON.stringify({ filePath: presenceCurrentFile, userId: KB_USER_ID })], { type: 'application/json' }));
  }
});

// Hook presence into loadFile — inject startViewPresencePoll after each article load
(function() {
  const origSetCurrentFile = window.setCurrentFile || function(){};
  window.setCurrentFile = function(fp) {
    origSetCurrentFile(fp);
    if (!editorOpen) startViewPresencePoll(fp);
  };
})();

// ═══════════════════════════════════════════════════════════════════════════════
// Feature: [[wikilink]] Autocompletion
// ═══════════════════════════════════════════════════════════════════════════════

(function() {
  let wlCache = null;
  let wlActiveIdx = -1;

  async function getArticleNames() {
    if (wlCache) return wlCache;
    try {
      const res = await fetch('/api/article-names');
      wlCache = await res.json();
      // Invalidate after 30s
      setTimeout(() => { wlCache = null; }, 30000);
    } catch { wlCache = []; }
    return wlCache;
  }

  function getWlDropdown() {
    return document.getElementById('wikilink-dropdown');
  }

  function hideWlDropdown() {
    const dd = getWlDropdown();
    if (dd) { dd.style.display = 'none'; dd.innerHTML = ''; }
    wlActiveIdx = -1;
  }

  function getTextareaWlContext(textarea) {
    const val = textarea.value;
    const pos = textarea.selectionStart;
    const before = val.slice(0, pos);
    // Find last [[ that isn't closed
    const lastOpen = before.lastIndexOf('[[');
    if (lastOpen === -1) return null;
    const afterOpen = before.slice(lastOpen + 2);
    // If there's a ]] after the [[, it's closed
    if (afterOpen.includes(']]')) return null;
    // If there's a newline, abort
    if (afterOpen.includes('\n')) return null;
    return { query: afterOpen, from: lastOpen, to: pos };
  }

  function positionDropdown(textarea, dd) {
    // Use a mirror div to get accurate cursor position
    const mirror = document.createElement('div');
    const style = window.getComputedStyle(textarea);
    ['font', 'fontSize', 'fontFamily', 'lineHeight', 'padding', 'border',
     'width', 'boxSizing', 'whiteSpace', 'wordWrap', 'overflowWrap'].forEach(p => {
      mirror.style[p] = style[p];
    });
    mirror.style.position = 'absolute';
    mirror.style.visibility = 'hidden';
    mirror.style.top = '0';
    mirror.style.left = '0';
    mirror.style.whiteSpace = 'pre-wrap';
    document.body.appendChild(mirror);
    
    const before = textarea.value.slice(0, textarea.selectionStart);
    mirror.textContent = before;
    const span = document.createElement('span');
    span.textContent = '|';
    mirror.appendChild(span);
    
    const taRect = textarea.getBoundingClientRect();
    const spanRect = span.getBoundingClientRect();
    document.body.removeChild(mirror);
    
    // Position relative to textarea, accounting for scroll
    const left = Math.min(spanRect.left - taRect.left, textarea.clientWidth - 220);
    const top = spanRect.top - taRect.top + textarea.scrollTop + 20;
    
    dd.style.position = 'absolute';
    dd.style.left = Math.max(0, left) + 'px';
    dd.style.top = top + 'px';
  }

  async function showWlDropdown(textarea, ctx) {
    const dd = getWlDropdown();
    if (!dd) return;
    const articles = await getArticleNames();
    const q = ctx.query.toLowerCase();
    const matches = q
      ? articles.filter(a => a.name.toLowerCase().includes(q) || a.path.toLowerCase().includes(q))
      : articles;
    const top = matches.slice(0, 15);
    if (!top.length) { hideWlDropdown(); return; }

    wlActiveIdx = 0;
    dd.innerHTML = top.map((a, i) =>
      '<div class="wl-item' + (i === 0 ? ' active' : '') + '" data-name="' + esc(a.name) + '" data-path="' + esc(a.path) + '">'
      + esc(a.name) + '<span class="wl-path">' + esc(a.path) + '</span></div>'
    ).join('');
    positionDropdown(textarea, dd);
    dd.style.display = 'block';

    dd.querySelectorAll('.wl-item').forEach(item => {
      item.addEventListener('mousedown', e => {
        e.preventDefault();
        insertWlCompletion(textarea, ctx, item.dataset.name);
      });
    });
  }

  function insertWlCompletion(textarea, ctx, name) {
    const val = textarea.value;
    const newVal = val.slice(0, ctx.from) + '[[' + name + ']]' + val.slice(ctx.to);
    textarea.value = newVal;
    const newPos = ctx.from + name.length + 4; // [[ + name + ]]
    textarea.selectionStart = textarea.selectionEnd = newPos;
    hideWlDropdown();
    // Trigger input event for preview update
    textarea.dispatchEvent(new Event('input'));
    textarea.focus();
  }

  // Listen on textarea input
  document.addEventListener('input', e => {
    if (e.target.id !== 'editor-textarea') return;
    const ctx = getTextareaWlContext(e.target);
    if (ctx) {
      showWlDropdown(e.target, ctx);
    } else {
      hideWlDropdown();
    }
  });

  // Keyboard navigation in dropdown
  document.addEventListener('keydown', e => {
    if (e.target.id !== 'editor-textarea') return;
    const dd = getWlDropdown();
    if (!dd || dd.style.display === 'none') return;
    const items = dd.querySelectorAll('.wl-item');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items[wlActiveIdx]?.classList.remove('active');
      wlActiveIdx = (wlActiveIdx + 1) % items.length;
      items[wlActiveIdx]?.classList.add('active');
      items[wlActiveIdx]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      items[wlActiveIdx]?.classList.remove('active');
      wlActiveIdx = (wlActiveIdx - 1 + items.length) % items.length;
      items[wlActiveIdx]?.classList.add('active');
      items[wlActiveIdx]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter' || e.key === 'Tab') {
      if (wlActiveIdx >= 0 && items[wlActiveIdx]) {
        e.preventDefault();
        const ctx = getTextareaWlContext(e.target);
        if (ctx) insertWlCompletion(e.target, ctx, items[wlActiveIdx].dataset.name);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      hideWlDropdown();
    }
  });

  // Hide on blur
  document.addEventListener('focusout', e => {
    if (e.target.id === 'editor-textarea') {
      setTimeout(hideWlDropdown, 200);
    }
  });
})();

// ═══════════════════════════════════════════════════════════════════════════════
// Feature: Image Upload (drag & drop + button)
// ═══════════════════════════════════════════════════════════════════════════════

(function() {
  async function uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch('/api/upload-image', { method: 'POST', body: formData });
    return await res.json();
  }

  function insertAtCursor(textarea, text) {
    const pos = textarea.selectionStart;
    const val = textarea.value;
    textarea.value = val.slice(0, pos) + text + val.slice(pos);
    textarea.selectionStart = textarea.selectionEnd = pos + text.length;
    textarea.dispatchEvent(new Event('input'));
    textarea.focus();
  }

  // Toolbar button
  const uploadBtn = document.getElementById('editor-upload-img');
  const fileInput = document.getElementById('editor-file-input');
  if (uploadBtn && fileInput) {
    uploadBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', async () => {
      const file = fileInput.files[0];
      if (!file) return;
      uploadBtn.textContent = '⏳ Subiendo...';
      uploadBtn.disabled = true;
      try {
        const data = await uploadImage(file);
        if (data.ok) {
          const textarea = document.getElementById('editor-textarea');
          // Use /raw-file route for the markdown src
          const md = data.markdown.replace(/!\[image\]\(([^)]+)\)/, '![image](/raw-file?path=$1)');
          if (textarea) insertAtCursor(textarea, '\n' + md + '\n');
          uploadBtn.textContent = '✅ Subida';
        }
      } catch (err) {
        console.error('Upload failed:', err);
      }
      uploadBtn.textContent = '\u{1F5BC} Imagen';
      fileInput.value = '';
    });
  }

  // Drag & drop on editor pane
  const editorPane = document.querySelector('.editor-pane');
  if (editorPane) {
    editorPane.addEventListener('dragover', e => {
      e.preventDefault();
      editorPane.style.outline = '2px dashed var(--accent)';
    });
    editorPane.addEventListener('dragleave', () => {
      editorPane.style.outline = '';
    });
    editorPane.addEventListener('drop', async e => {
      e.preventDefault();
      editorPane.style.outline = '';
      const files = [...e.dataTransfer.files].filter(f => f.type.startsWith('image/'));
      for (const file of files) {
        const data = await uploadImage(file);
        if (data.ok) {
          const textarea = document.getElementById('editor-textarea');
          if (textarea) insertAtCursor(textarea, '\n' + data.markdown + '\n');
        }
      }
    });
  }
})();

// ═══════════════════════════════════════════════════════════════════════════════
// Feature: Image & Video Generation from Editor
// ═══════════════════════════════════════════════════════════════════════════════

(function() {
  let genImgMarkdown = '';
  let genVideoMarkdown = '';

  function getArticleTitle() {
    const fp = window.currentFilePath || '';
    return fp.split('/').pop().replace('.md', '').replace(/-/g, ' ');
  }

  function insertAtCursor(textarea, text) {
    const pos = textarea.selectionStart;
    const val = textarea.value;
    textarea.value = val.slice(0, pos) + text + val.slice(pos);
    textarea.selectionStart = textarea.selectionEnd = pos + text.length;
    textarea.dispatchEvent(new Event('input'));
    textarea.focus();
  }

  // --- Image Generation ---
  const imgModal = document.getElementById('gen-img-modal');
  const imgPrompt = document.getElementById('gen-img-prompt');
  const imgPreview = document.getElementById('gen-img-preview');
  const imgStatus = document.getElementById('gen-img-status');
  const imgSubmit = document.getElementById('gen-img-submit');
  const imgInsert = document.getElementById('gen-img-insert');
  const imgCancel = document.getElementById('gen-img-cancel');

  document.getElementById('editor-gen-img')?.addEventListener('click', () => {
    imgPrompt.value = getArticleTitle();
    imgPreview.innerHTML = '';
    imgStatus.textContent = '';
    imgSubmit.style.display = '';
    imgInsert.style.display = 'none';
    genImgMarkdown = '';
    imgModal.classList.add('open');
  });

  imgCancel?.addEventListener('click', () => imgModal.classList.remove('open'));
  imgModal?.addEventListener('click', e => { if (e.target === imgModal) imgModal.classList.remove('open'); });

  imgSubmit?.addEventListener('click', async () => {
    const prompt = imgPrompt.value.trim();
    if (!prompt) return;
    imgSubmit.disabled = true;
    imgStatus.className = 'gen-status';
    imgStatus.innerHTML = '<div class="gen-spinner"></div> Generando con DALL-E 3... (puede tardar 15-30s)';
    imgPreview.innerHTML = '';
    try {
      const res = await fetch('/api/generate-image-for-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, filePath: window.currentFilePath || '' })
      });
      const data = await res.json();
      if (data.ok) {
        // Use local path for both preview and insert
        const localSrc = '/raw-file?path=' + encodeURIComponent(data.path);
        // Markdown with /raw-file path so preview works
        genImgMarkdown = '![' + prompt.slice(0, 40) + '](' + localSrc + ')';
        imgPreview.innerHTML = '<img src="' + esc(localSrc) + '" alt="Generated" style="max-width:100%;border-radius:8px;margin-top:8px;" />';
        imgStatus.className = 'gen-status success';
        imgStatus.textContent = '✅ Imagen generada — click Insertar para agregar al artículo';
        imgSubmit.style.display = 'none';
        imgInsert.style.display = '';
      } else {
        imgStatus.className = 'gen-status error';
        imgStatus.textContent = '❌ Error: ' + (data.error || 'unknown');
      }
    } catch (err) {
      imgStatus.className = 'gen-status error';
      imgStatus.textContent = '❌ Error: ' + err.message;
    }
    imgSubmit.disabled = false;
  });

  imgInsert?.addEventListener('click', () => {
    if (!genImgMarkdown) return;
    const textarea = document.getElementById('editor-textarea');
    if (textarea) insertAtCursor(textarea, '\n' + genImgMarkdown + '\n');
    imgModal.classList.remove('open');
  });

  // --- Video Generation ---
  const vidModal = document.getElementById('gen-video-modal');
  const vidPrompt = document.getElementById('gen-video-prompt');
  const vidPreview = document.getElementById('gen-video-preview');
  const vidStatus = document.getElementById('gen-video-status');
  const vidSubmit = document.getElementById('gen-video-submit');
  const vidInsert = document.getElementById('gen-video-insert');
  const vidCancel = document.getElementById('gen-video-cancel');

  document.getElementById('editor-gen-video')?.addEventListener('click', () => {
    vidPrompt.value = getArticleTitle();
    vidPreview.innerHTML = '';
    vidStatus.textContent = '';
    vidSubmit.style.display = '';
    vidInsert.style.display = 'none';
    genVideoMarkdown = '';
    vidModal.classList.add('open');
  });

  vidCancel?.addEventListener('click', () => vidModal.classList.remove('open'));
  vidModal?.addEventListener('click', e => { if (e.target === vidModal) vidModal.classList.remove('open'); });

  vidSubmit?.addEventListener('click', async () => {
    const prompt = vidPrompt.value.trim();
    if (!prompt) return;
    vidSubmit.disabled = true;
    vidStatus.textContent = 'Generando video con Seedance (puede tardar unos minutos)...';
    vidPreview.innerHTML = '';
    try {
      const res = await fetch('/api/generate-video-for-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, filePath: window.currentFilePath || '' })
      });
      const data = await res.json();
      if (data.ok && data.video_url) {
        genVideoMarkdown = data.markdown;
        vidPreview.innerHTML = '<video controls src="' + esc(data.video_url) + '"></video>';
        vidStatus.textContent = 'Video generado.';
        vidSubmit.style.display = 'none';
        vidInsert.style.display = '';
      } else {
        vidStatus.textContent = 'Error: ' + (data.error || 'unknown');
      }
    } catch (err) {
      vidStatus.textContent = 'Error: ' + err.message;
    }
    vidSubmit.disabled = false;
  });

  vidInsert?.addEventListener('click', () => {
    if (!genVideoMarkdown) return;
    const textarea = document.getElementById('editor-textarea');
    if (textarea) insertAtCursor(textarea, '\n' + genVideoMarkdown + '\n');
    vidModal.classList.remove('open');
  });

  // Close modals on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      imgModal?.classList.remove('open');
      vidModal?.classList.remove('open');
    }
  });
})();

// ─── Auth + Comments ─────────────────────────────────────────────────────────

window.currentUser = null;

(async function initAuth() {
  try {
    const res = await fetch('/auth/me');
    const data = await res.json();
    window.currentUser = data.user;
    const loginBtn = document.getElementById('github-login-btn');
    const googleBtn = document.getElementById('google-login-btn');
    const userInfo = document.getElementById('user-info');
    const anonName = document.getElementById('cf-anon-name');

    if (data.user) {
      userInfo.style.display = 'flex';
      document.getElementById('user-avatar').src = data.user.avatar_url || '';
      document.getElementById('user-name').textContent = data.user.name;
      if (loginBtn) loginBtn.style.display = 'none';
      if (googleBtn) googleBtn.style.display = 'none';
      if (anonName) anonName.style.display = 'none';
    } else {
      if (loginBtn) loginBtn.style.display = data.github_auth_enabled ? 'flex' : 'none';
      if (googleBtn) googleBtn.style.display = data.google_auth_enabled ? 'flex' : 'none';
      if (anonName) anonName.style.display = '';
    }
  } catch {}
})();

document.getElementById('logout-btn')?.addEventListener('click', async () => {
  await fetch('/auth/logout', { method: 'POST' });
  window.currentUser = null;
  document.getElementById('user-info').style.display = 'none';
  const loginBtn = document.getElementById('github-login-btn');
  const googleBtn2 = document.getElementById('google-login-btn');
  if (loginBtn) loginBtn.style.display = 'flex';
  if (googleBtn2) googleBtn2.style.display = 'flex';
  document.getElementById('cf-anon-name').style.display = '';
});

// ─── Comments Panel ──────────────────────────────────────────────────────────

let commentsCache = [];
let commentsArticlePath = '';

function getCommentsPath() {
  return window.currentFilePath || '';
}

document.getElementById('btn-comments')?.addEventListener('click', () => {
  const panel = document.getElementById('comments-panel');
  panel.classList.toggle('open');
  if (panel.classList.contains('open')) {
    loadComments();
  }
});

document.getElementById('comments-close')?.addEventListener('click', () => {
  document.getElementById('comments-panel').classList.remove('open');
});

async function loadComments() {
  const articlePath = getCommentsPath();
  if (!articlePath) {
    document.getElementById('comments-list').innerHTML = '<p style="color:var(--subtext);font-size:12px;padding:12px;">Seleccioná un artículo primero.</p>';
    return;
  }
  commentsArticlePath = articlePath;
  try {
    const res = await fetch('/api/comments?path=' + encodeURIComponent(articlePath));
    commentsCache = await res.json();
    renderComments();
    updateCommentsBadge();
  } catch {
    document.getElementById('comments-list').innerHTML = '<p style="color:var(--red);font-size:12px;padding:12px;">Error loading comments.</p>';
  }
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'ahora';
  if (mins < 60) return mins + 'm';
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + 'h';
  const days = Math.floor(hrs / 24);
  return days + 'd';
}

function renderComments() {
  const list = document.getElementById('comments-list');
  if (!commentsCache.length) {
    list.innerHTML = '<p style="color:var(--subtext);font-size:12px;padding:12px;">Sin comentarios aún.</p>';
    return;
  }
  list.innerHTML = commentsCache.map(c => {
    const avatarHtml = c.author_avatar
      ? '<img class="comment-author-avatar" src="' + esc(c.author_avatar) + '">'
      : '<span class="comment-author-avatar" style="background:var(--accent);display:inline-flex;align-items:center;justify-content:center;font-size:10px;color:var(--bg);font-weight:700;">' + esc((c.author_name || '?')[0].toUpperCase()) + '</span>';
    let html = '<div class="comment-item' + (c.resolved ? ' resolved' : '') + '" data-id="' + esc(c.id) + '">';
    html += '<div class="comment-author-row">' + avatarHtml + '<span class="comment-author">@' + esc(c.author) + '</span><span class="comment-time">' + timeAgo(c.created_at) + '</span></div>';
    if (c.selection) {
      html += '<div class="comment-selection">&gt; "' + esc(c.selection.slice(0, 200)) + '"</div>';
    }
    html += '<div class="comment-text">' + esc(c.comment) + '</div>';
    html += '<div class="comment-actions">';
    html += '<button onclick="resolveComment(\'' + c.id + '\')">' + (c.resolved ? 'Reabrir' : 'Resolver ✓') + '</button>';
    html += '<button onclick="toggleReply(\'' + c.id + '\')">Responder</button>';
    const user = window.currentUser;
    if (!user || c.author === (user && user.login) || c.author === 'anon') {
      html += '<button onclick="deleteComment(\'' + c.id + '\')">Eliminar</button>';
    }
    html += '</div>';
    // Replies
    if (c.replies && c.replies.length) {
      html += '<div class="comment-replies">';
      c.replies.forEach(r => {
        const rAvatar = r.author_avatar
          ? '<img class="comment-author-avatar" src="' + esc(r.author_avatar) + '">'
          : '<span class="comment-author-avatar" style="background:var(--accent2);display:inline-flex;align-items:center;justify-content:center;font-size:9px;color:var(--bg);font-weight:700;">' + esc((r.author_name || '?')[0].toUpperCase()) + '</span>';
        html += '<div class="comment-reply"><div class="comment-author-row">' + rAvatar + '<span class="comment-author">@' + esc(r.author) + '</span><span class="comment-time">' + timeAgo(r.created_at) + '</span></div>';
        html += '<div class="comment-text">' + esc(r.comment) + '</div></div>';
      });
      html += '</div>';
    }
    html += '<div class="reply-input" id="reply-' + c.id + '"><textarea placeholder="Responder..."></textarea><button onclick="sendReply(\'' + c.id + '\')">Enviar</button></div>';
    html += '</div>';
    return html;
  }).join('');
  highlightCommentSelections();
}

function highlightCommentSelections() {
  // Remove existing highlights
  document.querySelectorAll('mark.comment-highlight').forEach(m => {
    const parent = m.parentNode;
    parent.replaceChild(document.createTextNode(m.textContent), m);
    parent.normalize();
  });
  const contentBody = document.getElementById('content-body');
  if (!contentBody) return;
  const unresolvedWithSelection = commentsCache.filter(c => !c.resolved && c.selection);
  unresolvedWithSelection.forEach(c => {
    const walker = document.createTreeWalker(contentBody, NodeFilter.SHOW_TEXT);
    const selText = c.selection;
    let node;
    while (node = walker.nextNode()) {
      const idx = node.textContent.indexOf(selText);
      if (idx >= 0) {
        const range = document.createRange();
        range.setStart(node, idx);
        range.setEnd(node, idx + selText.length);
        const mark = document.createElement('mark');
        mark.className = 'comment-highlight';
        mark.title = c.comment.slice(0, 80);
        range.surroundContents(mark);
        break;
      }
    }
  });
}

async function updateCommentsBadge() {
  const articlePath = getCommentsPath();
  if (!articlePath) return;
  let comments = commentsCache;
  if (commentsArticlePath !== articlePath) {
    try {
      const res = await fetch('/api/comments?path=' + encodeURIComponent(articlePath));
      comments = await res.json();
    } catch { comments = []; }
  }
  const unresolved = comments.filter(c => !c.resolved).length;
  const wrap = document.getElementById('comments-badge-wrap');
  if (wrap) {
    wrap.innerHTML = unresolved > 0 ? '<span class="comments-badge">' + unresolved + '</span>' : '';
  }
}

window.resolveComment = async function(id) {
  await fetch('/api/comments/' + id + '/resolve', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path: commentsArticlePath })
  });
  loadComments();
};

window.deleteComment = async function(id) {
  await fetch('/api/comments/' + id + '?path=' + encodeURIComponent(commentsArticlePath), { method: 'DELETE' });
  loadComments();
};

window.toggleReply = function(id) {
  const el = document.getElementById('reply-' + id);
  if (el) el.style.display = el.style.display === 'block' ? 'none' : 'block';
};

window.sendReply = async function(id) {
  const el = document.getElementById('reply-' + id);
  const textarea = el.querySelector('textarea');
  const text = textarea.value.trim();
  if (!text) return;
  const body = { path: commentsArticlePath, comment: text };
  if (!window.currentUser) body.author_name = document.getElementById('cf-anon-name')?.value || 'Anónimo';
  await fetch('/api/comments/' + id + '/reply', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  textarea.value = '';
  el.style.display = 'none';
  loadComments();
};

// Submit new comment
document.getElementById('cf-submit')?.addEventListener('click', async () => {
  const textarea = document.getElementById('cf-text');
  const comment = textarea.value.trim();
  if (!comment) return;
  const articlePath = getCommentsPath();
  if (!articlePath) return;
  const selectionEl = document.getElementById('cf-selection');
  const selection = selectionEl.classList.contains('visible') ? selectionEl.dataset.text || '' : '';
  const body = { path: articlePath, comment, selection };
  if (!window.currentUser) body.author_name = document.getElementById('cf-anon-name')?.value || 'Anónimo';
  await fetch('/api/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  textarea.value = '';
  selectionEl.classList.remove('visible');
  selectionEl.dataset.text = '';
  loadComments();
});

// Selection context → comments form
document.getElementById('content-body')?.addEventListener('mouseup', () => {
  const sel = window.getSelection();
  const text = sel ? sel.toString().trim() : '';
  const selEl = document.getElementById('cf-selection');
  if (text && text.length > 2) {
    selEl.textContent = '> "' + text.slice(0, 200) + '"';
    selEl.dataset.text = text.slice(0, 500);
    selEl.classList.add('visible');
  }
});

// Hook: refresh comments when article changes
window._commentsOnFileLoad = function() {
  setTimeout(() => {
    updateCommentsBadge();
    if (document.getElementById('comments-panel')?.classList.contains('open')) {
      loadComments();
    }
  }, 500);
};

// ─── Dashboard ────────────────────────────────────────────────────────────────
async function loadDashboard() {
  const panel = document.getElementById('dashboard-panel');
  if (!panel) return;
  panel.innerHTML = '<div style="color:var(--subtext);font-size:13px">Loading dashboard…</div>';

  try {
    const [stats, news, repos, articles] = await Promise.all([
      fetch('/api/dashboard').then(r => r.json()),
      fetch('/api/latest-news').then(r => r.json()),
      fetch('/api/latest-repos').then(r => r.json()),
      fetch('/api/latest-articles').then(r => r.json()),
    ]);

    let html = '';

    // Stats
    if (stats.stats) {
      const s = stats.stats;
      const statItems = [
        { val: s.wiki_articles, label: 'Wiki Articles' },
        { val: s.raw_sources, label: 'Raw Sources' },
        { val: s.ideas_generated, label: 'Ideas Generated' },
        { val: s.news_ingested, label: 'News Batches' },
        { val: s.trending_batches, label: 'Trending Batches' },
      ];
      html += '<div class="dash-stat-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:12px;margin-bottom:24px;">';
      html += statItems.map(s => `<div class="dash-stat"><div class="stat-val">${s.val}</div><div class="stat-label">${s.label}</div></div>`).join('');
      html += '</div>';
    }

    // 2-col: News + Repos
    html += '<div class="dash-2col" style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px;">';
    
    // News
    html += '<div>';
    html += '<h3 style="font-size:13px;font-weight:700;color:var(--accent);margin-bottom:10px;text-transform:uppercase;letter-spacing:.05em;">📰 Latest News</h3>';
    const allStories = news.flatMap(n => n.stories).sort((a,b) => b.pts - a.pts).slice(0, 12);
    html += allStories.map(s => `
      <div class="dash-news-item" onclick="window.open('${s.url || '#'}','_blank')">
        <div class="news-title">${s.title.slice(0, 70)}${s.title.length > 70 ? '…' : ''}</div>
        ${s.pts ? `<div class="news-pts">▲ ${s.pts} pts · ${s.date}</div>` : `<div class="news-pts">${s.date}</div>`}
      </div>`).join('');
    html += '</div>';
    
    // Repos
    html += '<div>';
    html += '<h3 style="font-size:13px;font-weight:700;color:var(--accent);margin-bottom:10px;text-transform:uppercase;letter-spacing:.05em;">⭐ Latest Repos</h3>';
    html += repos.slice(0, 12).map(r => {
      const safeUrl = (r.url || '').replace(/"/g, '&quot;');
      const clickable = safeUrl && safeUrl.startsWith('http');
      return `
      <div class="dash-repo-item" ${clickable ? `onclick="window.open('${safeUrl}','_blank','noopener')" style="cursor:pointer;"` : ''}>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
          <span class="repo-name" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0;">${r.name}</span>
          ${r.stars ? `<span class="repo-stars">★ ${r.stars.toLocaleString()}</span>` : ''}
          ${clickable ? `<a href="${safeUrl}" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="Open on GitHub" style="color:var(--subtext);display:inline-flex;align-items:center;padding:2px;"><i data-lucide="external-link" style="width:12px;height:12px;"></i></a>` : ''}
        </div>
        ${r.desc ? `<div style="color:var(--subtext);font-size:10px;margin-top:2px;">${r.desc.slice(0,80)}</div>` : ''}
      </div>`;
    }).join('');
    html += '</div>';
    html += '</div>';

    // Recently updated articles
    html += '<div style="margin-bottom:24px;">';
    html += '<h3 style="font-size:13px;font-weight:700;color:var(--accent);margin-bottom:10px;text-transform:uppercase;letter-spacing:.05em;">📄 Recently Updated</h3>';
    html += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;">';
    html += articles.slice(0, 12).map(a => `
      <div class="dash-article-card" onclick="loadFile('${a.path}'); document.querySelector('.tab-btn[data-tab=wiki]').click();">
        <div class="article-title">${a.title}</div>
        <div class="article-excerpt">${a.excerpt}</div>
      </div>`).join('');
    html += '</div></div>';

    // Git commits
    if (stats.recent_commits?.length) {
      html += '<div>';
      html += '<h3 style="font-size:13px;font-weight:700;color:var(--accent);margin-bottom:10px;text-transform:uppercase;letter-spacing:.05em;">🔀 Recent Commits</h3>';
      html += '<div style="font-family:\'JetBrains Mono\',monospace;font-size:11px;color:var(--subtext);line-height:2;">';
      html += stats.recent_commits.map(c => `<div>${c}</div>`).join('');
      html += '</div></div>';
    }

    panel.innerHTML = html;
    if (window.lucide) lucide.createIcons();
  } catch (err) {
    panel.innerHTML = '<div style="color:#f87171">Error cargando dashboard: ' + err.message + '</div>';
  }
}

// --- Mobile sidebar ---
(function() {
  const hamburger = document.getElementById('hamburger') || document.getElementById('top-hamburger');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const sidebar = document.getElementById('sidebar');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      // On mobile: slide the sidebar in as an overlay.
      // On desktop: collapse it out of the layout so the content reclaims the space.
      if (window.innerWidth < 768) {
        sidebar.classList.toggle('mobile-open');
        if (sidebarOverlay) sidebarOverlay.classList.toggle('visible');
      } else {
        document.body.classList.toggle('sidebar-collapsed');
      }
    });
  }
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
      sidebarOverlay.classList.remove('visible');
    });
  }
  // Close sidebar when file selected on mobile
  document.addEventListener('click', e => {
    if (e.target.closest('.tree-file') && window.innerWidth < 768) {
      sidebar.classList.remove('mobile-open');
      sidebarOverlay.classList.remove('visible');
    }
  });

  // Touch gestures: swipe right to open sidebar, swipe left to close
  let touchStartX = 0, touchStartY = 0;
  document.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) < 60 || Math.abs(dy) > Math.abs(dx)) return;
    if (window.innerWidth >= 768) return;
    if (dx > 0 && touchStartX < 40) {
      sidebar.classList.add('mobile-open');
      sidebarOverlay.classList.add('visible');
    } else if (dx < 0 && sidebar.classList.contains('mobile-open')) {
      sidebar.classList.remove('mobile-open');
      sidebarOverlay.classList.remove('visible');
    }
  }, { passive: true });

  // Long press on text triggers selection context (same as mouseup)
  let longPressTimer = null;
  const contentBody = document.getElementById('content-body');
  if (contentBody) {
    contentBody.addEventListener('touchstart', e => {
      longPressTimer = setTimeout(() => {
        const sel = window.getSelection();
        if (sel && sel.toString().trim()) {
          contentBody.dispatchEvent(new Event('mouseup', { bubbles: true }));
        }
      }, 500);
    }, { passive: true });
    contentBody.addEventListener('touchend', () => clearTimeout(longPressTimer), { passive: true });
    contentBody.addEventListener('touchmove', () => clearTimeout(longPressTimer), { passive: true });
  }
})();

// ============================================================
// GitNexus Graph
// ============================================================
let nexusNetwork = null;
let nexusAllNodes = [];
let nexusAllEdges = [];
let nexusDataSet = null;
let nexusEdgeSet = null;
let nexusCurrentFilter = 'all';

const NEXUS_TYPE_COLORS = {
  File:      { bg: '#1e3a5f', border: '#4a90d9', font: '#93c5fd' },
  Section:   { bg: '#1a3a2a', border: '#4ade80', font: '#86efac' },
  Function:  { bg: '#3a1a3a', border: '#c084fc', font: '#d8b4fe' },
  Class:     { bg: '#3a2a1a', border: '#fb923c', font: '#fdba74' },
  Variable:  { bg: '#2a2a1a', border: '#facc15', font: '#fde047' },
  Import:    { bg: '#1a2a3a', border: '#67e8f9', font: '#a5f3fc' },
  default:   { bg: '#2a2a2a', border: '#9ca3af', font: '#d1d5db' },
};

function nexusNodeColor(label) {
  return NEXUS_TYPE_COLORS[label] || NEXUS_TYPE_COLORS.default;
}

async function loadNexusGraph() {
  const container = document.getElementById('nexus-graph');
  if (!container) return;
  if (nexusNetwork) return; // already loaded

  // Loading animado
  container.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:16px;">
      <div style="position:relative;width:60px;height:60px;">
        <div style="position:absolute;inset:0;border-radius:50%;border:3px solid var(--surface2);"></div>
        <div id="nexus-spinner" style="position:absolute;inset:0;border-radius:50%;border:3px solid transparent;border-top-color:var(--accent);animation:spin .8s linear infinite;"></div>
      </div>
      <div style="color:var(--subtext);font-size:13px;" id="nexus-loading-msg">Conectando con GitNexus...</div>
      <div style="width:200px;height:3px;background:var(--surface2);border-radius:2px;overflow:hidden;">
        <div id="nexus-progress-bar" style="height:100%;background:var(--accent);width:0%;transition:width 300ms ease;border-radius:2px;"></div>
      </div>
    </div>`;

  const setProgress = (pct, msg) => {
    const bar = document.getElementById('nexus-progress-bar');
    const txt = document.getElementById('nexus-loading-msg');
    if (bar) bar.style.width = pct + '%';
    if (txt && msg) txt.textContent = msg;
  };

  try {
    setProgress(10, 'Loading knowledge graph...');
    // Resolve the current repo name from /api/kb-info so this code works in
    // any scaffolded KB without hardcoding "wany-kb".
    if (!window._kbRepoName) {
      try {
        const info = await fetch('/api/kb-info').then(r => r.json());
        window._kbRepoName = info.repo || 'wany-kb';
      } catch { window._kbRepoName = 'wany-kb'; }
    }
    const repoName = window._kbRepoName;
    const res = await fetch('/api/nexus/graph?repo=' + encodeURIComponent(repoName));
    if (!res.ok) throw new Error('GitNexus server not running (port 3800)');

    setProgress(30, 'Parseando nodos y relaciones...');
    const data = await res.json();

    nexusAllNodes = data.nodes || [];
    nexusAllEdges = data.relationships || [];

    // Enrich the graph with Book nodes. Each cached book becomes a node, with
    // edges to every article it uses. We only add edges when the target
    // article already exists as a node in the graph, so we don't introduce
    // ghost nodes.
    try {
      const booksRes = await fetch('/api/books');
      const booksData = await booksRes.json();
      const cachedBooks = booksData.books || [];
      if (cachedBooks.length) {
        // Build a lookup from article path → node id. GitNexus nodes for
        // files use the relative path as their id; we try a few variants.
        const nodeByPath = new Map();
        for (const n of nexusAllNodes) {
          const candidates = [n.id, n.path, n.file_path, n.properties?.path, n.properties?.file_path];
          for (const c of candidates) if (typeof c === 'string') nodeByPath.set(c, n.id);
        }
        // Fetch each book's detail in parallel (small — user rarely has >20 books)
        const bookDetails = await Promise.all(
          cachedBooks.slice(0, 30).map((b) =>
            fetch('/api/books/' + encodeURIComponent(b.slug)).then(r => r.ok ? r.json() : null).catch(() => null)
          )
        );
        let bookNodeCount = 0, bookEdgeCount = 0;
        for (const d of bookDetails) {
          if (!d || !d.ok || !d.book) continue;
          const bookId = 'book:' + d.slug;
          const label = d.book.title || d.topic || d.slug;
          nexusAllNodes.push({
            id: bookId,
            label: label.length > 40 ? label.slice(0, 38) + '…' : label,
            type: 'Book',
            group: 'Book',
            properties: { slug: d.slug, topic: d.topic, title: d.book.title },
          });
          bookNodeCount++;
          // Edge to every article in every chapter that exists in the graph
          for (const ch of d.book.chapters || []) {
            for (const a of ch.articles || []) {
              const targetId = nodeByPath.get(a.path);
              if (!targetId) continue;
              nexusAllEdges.push({
                source: bookId,
                target: targetId,
                type: 'INCLUDES',
                properties: { chapter: ch.number },
              });
              bookEdgeCount++;
            }
          }
        }
        if (bookNodeCount) console.log(`[nexus] added ${bookNodeCount} book nodes, ${bookEdgeCount} INCLUDES edges`);
      }
    } catch (e) { console.warn('[nexus] book enrichment failed:', e.message); }

    const statsEl = document.getElementById('nexus-stats');
    if (statsEl) statsEl.textContent = `${nexusAllNodes.length} nodos · ${nexusAllEdges.length} relaciones`;

    setProgress(55, `Construyendo grafo (${nexusAllNodes.length} nodos)...`);

    // Pequeño timeout para que el browser renderice el progress antes del trabajo pesado
    await new Promise(r => setTimeout(r, 30));

    setProgress(70, 'Inicializando vis-network...');
    container.innerHTML = '';
    nexusRenderGraph(nexusAllNodes, nexusAllEdges, container);

  } catch (e) {
    container.innerHTML = `<div style="padding:40px;color:#f87171;font-size:13px;">⚠️ ${e.message}<br><small style="color:var(--subtext);">Asegurate que gitnexus serve --port 3800 esté corriendo</small></div>`;
  }
}

function nexusRenderGraph(nodes, edges, container) {
  if (!window.vis) {
    console.error('vis-network not loaded');
    container.innerHTML = '<div style="padding:40px;color:#f87171;">vis-network no disponible</div>';
    return;
  }

  // ── Size cap: for very large graphs, take the top-N most-connected nodes
  // + their edges. Loose leaves with degree 0-1 add visual noise without
  // useful structure. This brings a 10K-node graph down to ~2K without
  // losing the interesting backbone.
  const NEXUS_NODE_CAP = Number(window.NEXUS_NODE_CAP || 1500);
  let capped = false;
  if (nodes.length > NEXUS_NODE_CAP) {
    capped = true;
    // Compute degree
    const degree = new Map();
    for (const n of nodes) degree.set(n.id, 0);
    for (const e of edges) {
      const s = e.sourceId, t = e.targetId || e.target;
      degree.set(s, (degree.get(s) || 0) + 1);
      degree.set(t, (degree.get(t) || 0) + 1);
    }
    // Sort nodes by degree desc, take top N
    const topNodes = [...nodes].sort((a, b) => (degree.get(b.id) || 0) - (degree.get(a.id) || 0)).slice(0, NEXUS_NODE_CAP);
    const keepIds = new Set(topNodes.map((n) => n.id));
    nodes = topNodes;
    edges = edges.filter((e) => keepIds.has(e.sourceId) && keepIds.has(e.targetId || e.target));
    console.log('[nexus] capped to top', NEXUS_NODE_CAP, 'by degree —', edges.length, 'edges kept');
  }

  // Use the already-capped node set directly. Keep all types (File, Section,
  // Class, Folder) so the user sees the full structure. Build a node id set
  // for O(1) edge filtering.
  const nodeIdSet = new Set(nodes.map((n) => n.id));
  const renderNodes = nodes;
  const renderEdges = edges.filter((e) => {
    const src = e.sourceId, tgt = e.targetId || e.target;
    return nodeIdSet.has(src) && nodeIdSet.has(tgt);
  });

  // Size nodes by degree so the well-connected backbone is visually larger
  // and easier to click. File > Class > Section > Folder > other.
  const nodeDegree = new Map();
  for (const e of renderEdges) {
    const s = e.sourceId, t = e.targetId || e.target;
    nodeDegree.set(s, (nodeDegree.get(s) || 0) + 1);
    nodeDegree.set(t, (nodeDegree.get(t) || 0) + 1);
  }
  const typeBase = { File: 18, Class: 16, Folder: 14, Section: 10 };

  const visNodes = renderNodes.map((n) => {
    const col = nexusNodeColor(n.label);
    const name = n.properties?.name || n.id.split(':').pop();
    const deg = nodeDegree.get(n.id) || 0;
    const base = typeBase[n.label] || 8;
    const size = Math.min(30, base + Math.log2(deg + 1) * 2);
    const displayName = name.length > 26 ? name.slice(0, 24) + '…' : name;
    return {
      id: n.id,
      label: displayName,
      title: `${n.label || ''} · ${name}\n${deg} connection${deg === 1 ? '' : 's'}`,
      color: {
        background: col.bg,
        border: col.border,
        highlight: { background: col.bg, border: '#fff' },
        hover: { background: col.bg, border: '#fff' },
      },
      font: { color: col.font, size: 12, face: 'Inter, sans-serif', strokeWidth: 2, strokeColor: 'rgba(0,0,0,0.65)' },
      size,
      shape: 'dot',
      _type: n.label,
      _props: n.properties,
    };
  });

  const visEdges = renderEdges.map((e, i) => ({
    id: e.id || i,
    from: e.sourceId,
    to: e.targetId || e.target,
    color: { color: 'rgba(150,150,170,0.22)', highlight: 'rgba(203,166,247,0.9)', hover: 'rgba(203,166,247,0.9)' },
    arrows: { to: { enabled: true, scaleFactor: 0.35 } },
    width: 0.6,
    selectionWidth: 1.4,
  }));

  nexusDataSet = new vis.DataSet(visNodes);
  nexusEdgeSet = new vis.DataSet(visEdges);

  // Large graph config — barnesHut is faster + more natural than forceAtlas2
  // for 5K+ node sets. Aggressive repulsion + long springs so the nodes
  // actually spread out instead of collapsing into the initial X / grid
  // pattern that the default layout produces.
  const isLarge = nodes.length > 1500;
  const options = {
    layout: { improvedLayout: false, randomSeed: 42 },
    nodes: {
      borderWidth: 1.5,
      shape: 'dot',
      scaling: { min: 8, max: 30, label: { enabled: true, min: 11, max: 16, drawThreshold: 6 } },
    },
    edges: {
      smooth: isLarge ? false : { type: 'continuous', roundness: 0.3 },
      width: 0.4,
      color: { color: 'rgba(130,130,150,0.2)', highlight: 'rgba(203,166,247,0.9)', hover: 'rgba(203,166,247,0.9)' },
      hoverWidth: 0,
      selectionWidth: 0,
    },
    physics: {
      enabled: true,
      solver: isLarge ? 'barnesHut' : 'forceAtlas2Based',
      barnesHut: {
        theta: 0.5,
        gravitationalConstant: -12000,
        centralGravity: 0.2,
        springLength: 200,
        springConstant: 0.015,
        damping: 0.15,
        avoidOverlap: 0.6,
      },
      forceAtlas2Based: {
        gravitationalConstant: -100,
        centralGravity: 0.005,
        springLength: 120,
        springConstant: 0.08,
        damping: 0.4,
        avoidOverlap: 0.5,
      },
      // Stabilization DISABLED — we want the user to SEE the graph spreading
      // in real time as physics iterates, not a black overlay for 60 seconds
      // while vis-network quietly runs the whole simulation before rendering.
      stabilization: {
        enabled: false,
      },
      adaptiveTimestep: true,
      minVelocity: 0.75,
      maxVelocity: 60,
      timestep: 0.4,
    },
    interaction: {
      hover: true,
      tooltipDelay: 200,
      navigationButtons: false,
      keyboard: false,
      hideEdgesOnDrag: isLarge,
      hideEdgesOnZoom: isLarge,
      hideNodesOnDrag: false,
      dragNodes: true,
      zoomView: true,
      multiselect: false,
    },
  };

  nexusNetwork = new vis.Network(container, { nodes: nexusDataSet, edges: nexusEdgeSet }, options);

  // Freeze the layout ONCE it has actually settled. We use the `stabilized`
  // event (emitted when the force simulation reaches equilibrium), not
  // `stabilizationIterationsDone` which can fire before nodes are spread.
  // Hard timeout of 8 s so huge graphs still freeze even if equilibrium never
  // arrives — otherwise nodes would drift forever and zoom would accelerate
  // them visually.
  let _nexusFrozen = false;
  function _freezeNexus(reason) {
    if (_nexusFrozen || !nexusNetwork) return;
    _nexusFrozen = true;
    nexusNetwork.setOptions({ physics: { enabled: false } });
    console.log('[nexus] physics frozen:', reason);
  }
  // DON'T freeze — let physics keep improving until the user interacts
  // or explicitly clicks a node. Large graphs get a generous progress UI
  // via stabilizationProgress so the user sees it working.
  // Live chip with a REAL progress bar computed from how much the nodes are
  // still moving. Since stabilization is disabled (we want to see physics
  // running), vis-network doesn't emit progress events — so we sample
  // getPositions() every 250ms and measure the average position delta.
  // Progress = 1 - (currentDelta / initialDelta). Hits 100% when delta
  // drops below a threshold (graph has settled).
  container.style.position = 'relative';
  const chip = document.createElement('div');
  chip.id = 'nexus-status-chip';
  chip.innerHTML = `
    <div class="nexus-chip-top">
      <div class="nexus-chip-dot"></div>
      <span id="nexus-chip-label">Settling layout…</span>
      <span id="nexus-chip-pct">0%</span>
      <button class="nexus-chip-freeze" onclick="nexusFreezeNow()" title="Freeze layout now"><i data-lucide="pause"></i></button>
    </div>
    <div class="nexus-chip-bar"><div class="nexus-chip-bar-fill" id="nexus-chip-bar-fill"></div></div>
  `;
  container.appendChild(chip);
  if (window.lucide) lucide.createIcons();
  if (capped) {
    const capChip = document.createElement('div');
    capChip.id = 'nexus-cap-chip';
    capChip.textContent = `showing top-${NEXUS_NODE_CAP.toLocaleString()} most connected nodes`;
    container.appendChild(capChip);
  }

  const removeChip = () => { try { chip.remove(); } catch {} };
  window.nexusFreezeNow = () => {
    // Snapshot current progress to 100 before removing
    const fill = document.getElementById('nexus-chip-bar-fill');
    const pct = document.getElementById('nexus-chip-pct');
    if (fill) fill.style.width = '100%';
    if (pct) pct.textContent = '100%';
    _freezeNexus('manual');
    setTimeout(removeChip, 400);
  };

  // Sample the average position delta of a subset of nodes between ticks
  const sampleIds = nodes.slice(0, Math.min(80, nodes.length)).map((n) => n.id);
  let lastPositions = null;
  let maxObservedDelta = 0;
  const tStart = Date.now();
  let lastPct = 0;
  let lowDeltaStreak = 0; // consecutive ticks with near-zero movement
  // Adaptive threshold: large graphs (thousands of Section nodes) have
  // persistent jitter well above 0.6px; a fixed tight threshold makes the
  // chip live at 99% forever. Scale the threshold with node count.
  const SETTLED_THRESHOLD = nodes.length > 3000 ? 2.0 : nodes.length > 1000 ? 1.2 : 0.6;
  const SETTLED_STREAK = 3;       // consecutive ticks required to freeze

  const finish = (reason) => {
    if (_nexusFrozen) return;
    const labelEl = document.getElementById('nexus-chip-label');
    const pctEl = document.getElementById('nexus-chip-pct');
    const fillEl = document.getElementById('nexus-chip-bar-fill');
    if (labelEl) labelEl.textContent = 'Settled ✓';
    if (pctEl) pctEl.textContent = '100%';
    if (fillEl) fillEl.style.width = '100%';
    try { nexusNetwork.fit({ animation: { duration: 600, easingFunction: 'easeInOutQuad' } }); } catch {}
    setTimeout(removeChip, 1200);
    clearInterval(tick);
    _freezeNexus(reason);
  };

  const tick = setInterval(() => {
    if (_nexusFrozen) { clearInterval(tick); return; }
    if (!nexusNetwork) return;
    let positions;
    try { positions = nexusNetwork.getPositions(sampleIds); } catch { return; }
    let avgDelta = 0;
    if (lastPositions) {
      let totalDelta = 0;
      let count = 0;
      for (const id of sampleIds) {
        const a = lastPositions[id];
        const b = positions[id];
        if (!a || !b) continue;
        totalDelta += Math.hypot(b.x - a.x, b.y - a.y);
        count++;
      }
      if (count > 0) avgDelta = totalDelta / count;
    }
    lastPositions = positions;
    maxObservedDelta = Math.max(maxObservedDelta, avgDelta);

    // Progress — monotonic, driven by how much the delta has shrunk vs its peak
    let pct = lastPct;
    if (maxObservedDelta > 0) {
      const raw = Math.max(0, 1 - (avgDelta / maxObservedDelta));
      pct = Math.max(lastPct, Math.min(99, Math.round(raw * 100)));
    }
    // Boost progress based on elapsed time too so it feels like it's moving
    const elapsedS = (Date.now() - tStart) / 1000;
    const timeBoost = Math.min(95, Math.round((elapsedS / 15) * 100));
    pct = Math.max(pct, Math.min(99, timeBoost));
    lastPct = pct;

    // Near-zero movement for SETTLED_STREAK consecutive ticks → freeze
    if (avgDelta < SETTLED_THRESHOLD) {
      lowDeltaStreak++;
      if (lowDeltaStreak >= SETTLED_STREAK) { finish('auto-settled'); return; }
    } else {
      lowDeltaStreak = 0;
    }
    // Soft finish: after 45s of simulation, if movement has clearly decayed
    // below 25% of the peak, call it settled. Big graphs jitter forever
    // otherwise and the user just sees 99% indefinitely.
    if (elapsedS > 45 && maxObservedDelta > 0 && avgDelta < maxObservedDelta * 0.25) {
      finish('soft-settled'); return;
    }
    // Hard cap: 75s is plenty; beyond that it's diminishing returns
    if (elapsedS > 75) { finish('time-cap'); return; }

    const labelEl = document.getElementById('nexus-chip-label');
    const pctEl = document.getElementById('nexus-chip-pct');
    const fillEl = document.getElementById('nexus-chip-bar-fill');
    if (labelEl) labelEl.textContent = `Settling layout · ${elapsedS.toFixed(0)}s`;
    if (pctEl) pctEl.textContent = pct + '%';
    if (fillEl) fillEl.style.width = pct + '%';
  }, 250);

  nexusNetwork.on('stabilized', () => finish('stabilized'));

  // Safety net
  setTimeout(() => { finish('max-timeout'); }, 180000);

  nexusNetwork.on('click', params => {
    if (!params.nodes.length) {
      // Background click — just close the detail panel. Physics stays OFF.
      nexusHideDetail();
      return;
    }
    const nodeId = params.nodes[0];
    const node = nexusAllNodes.find(n => n.id === nodeId);
    if (node) {
      nexusShowDetail(node);
    }
  });

  nexusNetwork.once('stabilizationIterationsDone', () => {
    nexusNetwork.fit({ animation: { duration: 600, easingFunction: 'easeOutCubic' } });

    // Render progresivo: agregar el resto de nodos en batches después de que el grafo inicial estabilizó
    const BATCH_SIZE = 300;
    let batchIdx = 0;

    function addNextBatch() {
      const batch = otherNodes.slice(batchIdx, batchIdx + BATCH_SIZE);
      if (!batch.length) {
        // Todos cargados
        const statsEl = document.getElementById('nexus-stats');
        if (statsEl) statsEl.textContent = `${nexusAllNodes.length} nodos · ${nexusAllEdges.length} relaciones ✓`;
        return;
      }

      const newVisNodes = batch.map(n => {
        const col = nexusNodeColor(n.label);
        const name = n.properties?.name || n.id.split(':').pop();
        return {
          id: n.id,
          label: name.length > 20 ? name.slice(0, 18) + '…' : name,
          title: undefined,
          color: { background: col.bg, border: col.border, highlight: { background: col.bg, border: '#fff' } },
          font: { color: col.font, size: 11 },
          size: 8, shape: 'dot',
          _type: n.label, _props: n.properties,
        };
      });

      nexusDataSet.add(newVisNodes);

      // Agregar edges que conectan los nuevos nodos
      const currentIds = new Set(nexusDataSet.getIds());
      const newEdges = nexusAllEdges.filter(e => {
        const src = e.sourceId, tgt = e.targetId || e.target;
        return currentIds.has(src) && currentIds.has(tgt) &&
               !nexusEdgeSet.get(e.id || '');
      });
      if (newEdges.length) {
        const visEdges = newEdges.slice(0, 500).map((e, i) => ({
          id: e.id || ('e_' + batchIdx + '_' + i),
          from: e.sourceId, to: e.targetId || e.target,
          label: '',
          color: { color: 'rgba(100,100,120,0.35)', highlight: '#a78bfa' },
          arrows: { to: { enabled: true, scaleFactor: 0.4 } },
          width: 1,
        }));
        try { nexusEdgeSet.add(visEdges); } catch(e) {}
      }

      batchIdx += BATCH_SIZE;
      const total = nexusAllNodes.length;
      const loaded = renderNodes.length + batchIdx;
      const statsEl = document.getElementById('nexus-stats');
      if (statsEl) statsEl.textContent = `${Math.min(loaded, total)} / ${total} nodos...`;

      // Siguiente batch con pequeño delay para no bloquear el UI
      setTimeout(addNextBatch, 80);
    }

    setTimeout(addNextBatch, 200);
  });
}

function nexusShowDetail(node) {
  const el = document.getElementById('nexus-detail');
  if (!el) return;
  const props = node.properties || {};
  const col = nexusNodeColor(node.label);
  const name = props.name || node.id.split(':').pop();

  // Breadcrumb: construir ruta desde el id del nodo
  // Formatos posibles:
  //   "File:raw/research/papers/aws-strands-agents.md"
  //   "Section:raw/research/papers/coding-agents.md:L12:Título"
  //   "Function:viewer/app.js:loadFile"
  const parts = node.id.split(':');
  // Extraer solo el path de archivo (puede contener colons en Windows paths)
  // El path siempre termina en .md, .js, .py, .ts, .json, .sh, .yaml, .txt etc.
  const rawAfterType = parts.slice(1).join(':');
  // Quedarse con la parte hasta la extensión de archivo
  const filePathMatch = rawAfterType.match(/^([^:]+\.[a-zA-Z0-9]+)/);
  const filePath = filePathMatch ? filePathMatch[1] : rawAfterType;
  const breadcrumbParts = filePath ? filePath.split('/') : [];
  const breadcrumbHtml = breadcrumbParts.length > 1
    ? `<div style="font-size:10px;color:var(--subtext);margin-bottom:8px;display:flex;flex-wrap:wrap;gap:2px;align-items:center;">
        ${breadcrumbParts.map((p, i) => `
          <span style="color:${i === breadcrumbParts.length-1 ? 'var(--accent)' : 'var(--subtext)'};">${p}</span>
          ${i < breadcrumbParts.length-1 ? '<span style="color:var(--border)">/</span>' : ''}
        `).join('')}
      </div>`
    : '';

  // Detectar si es un archivo wiki navegable
  const isWikiFile = filePath && (filePath.startsWith('wiki/') || filePath.startsWith('raw/'));
  const wikiPath = isWikiFile ? filePath : null;

  // Rows de propiedades (filtrar las más útiles)
  const skipKeys = new Set(['filePath', 'name']);
  const rows = Object.entries(props)
    .filter(([k]) => !skipKeys.has(k))
    .map(([k,v]) =>
      `<div style="display:flex;gap:8px;margin-bottom:4px;">
        <span style="color:var(--subtext);min-width:70px;font-size:11px;">${k}</span>
        <span style="color:var(--text);word-break:break-all;font-size:11px;">${v}</span>
      </div>`
    ).join('');

  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
      <span style="background:${col.bg};border:1px solid ${col.border};color:${col.font};padding:2px 7px;border-radius:4px;font-size:10px;font-weight:700;">${node.label}</span>
      <span style="color:var(--text);font-weight:600;font-size:12px;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${name}">${name}</span>
    </div>
    ${breadcrumbHtml}
    ${rows}
    <div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap;">
      ${wikiPath ? `<button onclick="nexusNavigateTo('${wikiPath}')" style="background:var(--accent);color:var(--accent-fg);border:none;padding:5px 10px;border-radius:4px;font-size:11px;cursor:pointer;font-weight:600;">📄 Abrir artículo</button>` : ''}
      <button onclick="nexusNetwork && nexusNetwork.setOptions({physics:{enabled:true}}); setTimeout(()=>nexusNetwork&&nexusNetwork.setOptions({physics:{enabled:false}}),2000);" style="background:var(--surface2);border:1px solid var(--border);color:var(--subtext);padding:5px 10px;border-radius:4px;font-size:11px;cursor:pointer;">▶ Reanudar física</button>
      <button onclick="nexusHideDetail()" style="background:var(--surface2);border:1px solid var(--border);color:var(--subtext);padding:5px 10px;border-radius:4px;font-size:11px;cursor:pointer;">✕</button>
    </div>
  `;
  el.style.display = 'block';
}

function nexusNavigateTo(filePath) {
  // Navegar al wiki: cambiar al tab Wiki y cargar el archivo
  const wikiBtn = document.querySelector('.tab-btn[data-tab="wiki"]');
  if (wikiBtn) wikiBtn.click();
  // Pequeño delay para que el tab se active
  setTimeout(() => {
    if (typeof loadFile === 'function') loadFile(filePath);
  }, 100);
  nexusHideDetail();
}

function nexusHideDetail() {
  const el = document.getElementById('nexus-detail');
  if (el) el.style.display = 'none';
}

function nexusSearch(q) {
  if (!nexusDataSet) return;
  if (!q.trim()) { nexusDataSet.update(nexusAllNodes.map(n => ({ id: n.id, hidden: false }))); return; }
  const ql = q.toLowerCase();
  nexusDataSet.update(nexusAllNodes.map(n => ({
    id: n.id,
    hidden: !(n.id.toLowerCase().includes(ql) || (n.properties?.name || '').toLowerCase().includes(ql))
  })));
}

function nexusFilter(type) {
  if (!nexusDataSet) return;
  nexusCurrentFilter = type;
  if (type === 'all') {
    nexusDataSet.update(nexusAllNodes.map(n => ({ id: n.id, hidden: false })));
  } else {
    nexusDataSet.update(nexusAllNodes.map(n => ({ id: n.id, hidden: n.label !== type })));
  }
}

function nexusReset() {
  if (!nexusDataSet) return;
  nexusDataSet.update(nexusAllNodes.map(n => ({ id: n.id, hidden: false })));
  const s = document.getElementById('nexus-search');
  if (s) s.value = '';
  const f = document.getElementById('nexus-filter');
  if (f) f.value = 'all';
  if (nexusNetwork) nexusNetwork.fit({ animation: { duration: 600 } });
}

// ============================================================
// Pipelines
// ============================================================
let currentPipelineId = null;

async function loadPipelines() {
  const list = document.getElementById('pipelines-list');
  if (!list) return;
  list.innerHTML = '<div style="color:var(--subtext);font-size:12px;">Cargando...</div>';

  try {
    const res = await fetch('/api/pipelines');
    const providers = await res.json();

    const enabledBg = 'background:rgba(166,227,161,0.08);border-color:rgba(166,227,161,0.2)';
    const disabledBg = 'background:var(--surface);border-color:var(--border)';

    list.innerHTML = providers.map(p => {
      const enabled = p.enabled === 'true' || p.enabled === true;
      const files = p.stats?.files || 0;
      const lastRun = p.stats?.lastRun
        ? new Date(p.stats.lastRun).toLocaleString('es-UY', { day:'2-digit', month:'2-digit', hour:'2-digit', minute:'2-digit' })
        : 'nunca';
      const hasScript = p.script && !p.script.includes('pendiente');

      return `<div class="pipeline-card" data-enabled="${enabled}" style="${enabled ? enabledBg : disabledBg};border:1px solid;border-radius:8px;padding:14px 16px;margin-bottom:10px;">
        <div style="display:flex;align-items:flex-start;gap:10px;">
          <div style="flex:1;min-width:0;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
              <span style="font-size:13px;font-weight:600;color:var(--text);">${esc(p.name || p.id)}</span>
              <span style="font-size:10px;padding:2px 7px;border-radius:10px;font-weight:600;${enabled ? 'background:color-mix(in srgb, var(--green) 18%, transparent);color:var(--green)' : 'background:var(--surface2);color:var(--subtext)'};">${enabled ? '● activo' : '○ inactivo'}</span>
            </div>
            <div style="font-size:11px;color:var(--subtext);margin-bottom:6px;">${esc(p.description || '')}</div>
            <div style="display:flex;gap:12px;font-size:10px;color:var(--subtext);flex-wrap:wrap;">
              <span><i data-lucide="folder" style="width:11px;height:11px;vertical-align:-1px;"></i> ${esc(p.output_dir || '')}</span>
              <span><i data-lucide="file-text" style="width:11px;height:11px;vertical-align:-1px;"></i> ${files} archivos</span>
              <span><i data-lucide="clock" style="width:11px;height:11px;vertical-align:-1px;"></i> ${lastRun}</span>
              ${p.cron ? `<span><i data-lucide="timer" style="width:11px;height:11px;vertical-align:-1px;"></i> ${esc(p.cron)}</span>` : ''}
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">
            ${hasScript ? `
              <label class="pp-toggle" title="${enabled ? 'Disable + uninstall pm2 cron' : 'Enable + install pm2 cron'}">
                <input type="checkbox" onchange="togglePipeline('${esc(p.id)}', this.checked, this)" ${enabled ? 'checked' : ''} />
                <span class="pp-toggle-track"></span>
              </label>
              <button onclick="editPipelineScript('${esc(p.id)}')" class="pp-btn" title="Edit script"><i data-lucide="pencil"></i></button>
              <button onclick="runPipeline('${esc(p.id)}')" class="pp-btn pp-btn-primary" title="Run now"><i data-lucide="play"></i> Run</button>
            ` : `<span style="font-size:10px;color:var(--subtext);padding:5px;">⚠ script pendiente</span>`}
          </div>
        </div>
      </div>`;
    }).join('');

    // Agregar botón para editar providers.yaml
    list.innerHTML += `
      <div style="margin-top:16px;padding-top:16px;border-top:1px solid var(--surface2);display:flex;gap:8px;">
        <button onclick="editProvidersYaml()" class="pp-btn"><i data-lucide="file-cog"></i> Edit providers.yaml</button>
      </div>`;
    if (window.lucide) lucide.createIcons();

  } catch (e) {
    list.innerHTML = `<div style="color:#f87171;font-size:12px;">Error: ${e.message}</div>`;
  }
}

// CodeMirror instance for the pipeline editor (single reusable)
let _pipelineCM = null;

function _cmModeForPath(p) {
  const ext = (p || '').split('.').pop().toLowerCase();
  if (ext === 'sh' || ext === 'bash') return 'shell';
  if (ext === 'yaml' || ext === 'yml') return 'yaml';
  if (ext === 'js' || ext === 'mjs') return { name: 'javascript' };
  if (ext === 'ts' || ext === 'tsx') return { name: 'javascript', typescript: true };
  if (ext === 'py') return 'python';
  if (ext === 'md') return 'markdown';
  return null; // plain
}

function _initPipelineCodeMirror(content, filePath) {
  const ta = document.getElementById('pipeline-script-content');
  if (!ta) return;
  ta.value = content;
  if (typeof CodeMirror === 'undefined') {
    // CodeMirror hasn't loaded yet — retry shortly
    setTimeout(() => _initPipelineCodeMirror(content, filePath), 150);
    return;
  }
  if (_pipelineCM) {
    // Reuse the existing instance; just swap mode + content
    const mode = _cmModeForPath(filePath);
    _pipelineCM.setOption('mode', mode || 'null');
    _pipelineCM.setValue(content);
    _pipelineCM.refresh();
    return;
  }
  ta.classList.add('cm-hidden');
  _pipelineCM = CodeMirror.fromTextArea(ta, {
    mode: _cmModeForPath(filePath) || 'null',
    lineNumbers: true,
    lineWrapping: false,
    matchBrackets: true,
    indentUnit: 2,
    tabSize: 2,
    styleActiveLine: true,
    viewportMargin: 40,
  });
  _pipelineCM.on('change', () => { ta.value = _pipelineCM.getValue(); });
  setTimeout(() => _pipelineCM && _pipelineCM.refresh(), 30);
}

async function editPipelineScript(id) {
  try {
    const res = await fetch(`/api/pipelines/${id}/script`);
    const data = await res.json();
    currentPipelineId = id;
    document.getElementById('pipeline-editor-title').innerHTML = `<i data-lucide="file-code" style="width:14px;height:14px;vertical-align:-2px;margin-right:6px;"></i>${esc(data.script)}`;
    document.getElementById('pipeline-editor').style.display = 'block';
    document.getElementById('pipeline-run-output').style.display = 'none';
    _initPipelineCodeMirror(data.content, data.script);
    if (window.lucide) lucide.createIcons();
    document.getElementById('pipeline-editor').scrollIntoView({ behavior: 'smooth' });
  } catch (e) {
    alert('Error loading script: ' + e.message);
  }
}

async function savePipelineScript() {
  if (!currentPipelineId) return;
  const content = document.getElementById('pipeline-script-content').value;
  try {
    const res = await fetch(`/api/pipelines/${currentPipelineId}/script`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    const data = await res.json();
    if (data.ok) {
      document.getElementById('pipeline-editor').style.display = 'none';
      showToast('Script guardado ✓');
    }
  } catch (e) {
    alert('Error guardando: ' + e.message);
  }
}

async function togglePipeline(id, enabled, inputEl) {
  const card = inputEl.closest('.pipeline-card');
  const prev = inputEl.checked;
  // Optimistic UI — revert if server fails
  inputEl.disabled = true;
  try {
    const res = await fetch(`/api/pipelines/${id}/enabled`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'request failed');
    if (data.warning) {
      primeToast(data.warning, 'alert-triangle');
    } else if (enabled) {
      primeToast(`Enabled · pm2 cron "${data.cron}" installed`, 'check');
    } else {
      primeToast(`Disabled · pm2 cron removed`, 'check');
    }
    setTimeout(loadPipelines, 400);
  } catch (e) {
    inputEl.checked = !enabled;
    primeToast(`Toggle failed: ${e.message}`, 'alert-triangle');
  } finally {
    inputEl.disabled = false;
  }
}
window.togglePipeline = togglePipeline;

async function runPipeline(id) {
  const output = document.getElementById('pipeline-run-output');
  output.style.display = 'block';
  output.textContent = `▶ Corriendo pipeline "${id}"...\n`;
  try {
    const res = await fetch(`/api/pipelines/${id}/run`, { method: 'POST' });
    const data = await res.json();
    output.textContent += data.stdout || '';
    if (data.stderr) output.textContent += '\n[stderr] ' + data.stderr;
    output.textContent += data.ok ? '\n✅ Completado' : `\n❌ Exit: ${data.exit}`;
    loadPipelines(); // refresh stats
  } catch (e) {
    output.textContent += '\nError: ' + e.message;
  }
}

async function editProvidersYaml() {
  try {
    const res = await fetch('/api/pipelines/providers.yaml');
    const data = await res.json();
    currentPipelineId = '__yaml__';
    document.getElementById('pipeline-editor-title').innerHTML = '<i data-lucide="file-cog" style="width:14px;height:14px;vertical-align:-2px;margin-right:6px;"></i>providers.yaml';
    document.getElementById('pipeline-editor').style.display = 'block';
    _initPipelineCodeMirror(data.content, 'providers.yaml');
    if (window.lucide) lucide.createIcons();
    document.getElementById('pipeline-editor').scrollIntoView({ behavior: 'smooth' });
  } catch (e) {
    alert('Error: ' + e.message);
  }
}

// Override savePipelineScript para manejar providers.yaml
const _origSave = savePipelineScript;
async function savePipelineScript() {
  if (currentPipelineId === '__yaml__') {
    const content = document.getElementById('pipeline-script-content').value;
    try {
      const res = await fetch('/api/pipelines/providers.yaml', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (data.ok) {
        document.getElementById('pipeline-editor').style.display = 'none';
        showToast('providers.yaml guardado ✓');
        loadPipelines();
      }
    } catch (e) { alert('Error: ' + e.message); }
    return;
  }
  return _origSave();
}

function showToast(msg) {
  let t = document.getElementById('kb-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'kb-toast';
    t.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--accent);color:var(--accent-fg);padding:8px 18px;border-radius:20px;font-size:13px;font-weight:600;z-index:9999;opacity:0;transition:opacity 300ms;';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  setTimeout(() => t.style.opacity = '0', 2500);
}

// ============================================================
// Feed — TikTok (Wiki) + Stories (News)
// ============================================================
let feedMode = 'wiki';
let feedWikiLoaded = false;
let storyItems = [];
let storyIdx = 0;
let storyTimer = null;
const STORY_DURATION = 6000;

function setFeedMode(mode) {
  feedMode = mode;
  document.getElementById('feed-wiki').style.display = mode === 'wiki' ? 'block' : 'none';
  document.getElementById('feed-news').style.display = mode === 'news' ? 'flex' : 'none';
  document.getElementById('feed-news').style.flexDirection = 'column';
  document.getElementById('feed-mode-wiki').style.background = mode === 'wiki' ? 'var(--accent)' : 'var(--surface)';
  document.getElementById('feed-mode-wiki').style.color = mode === 'wiki' ? '#000' : 'var(--subtext)';
  document.getElementById('feed-mode-news').style.background = mode === 'news' ? 'var(--accent)' : 'var(--surface)';
  document.getElementById('feed-mode-news').style.color = mode === 'news' ? '#000' : 'var(--subtext)';
  if (mode === 'wiki' && !feedWikiLoaded) loadFeedWiki();
  if (mode === 'news') loadFeedNews();
}

async function loadFeed() {
  setFeedMode('wiki');
}

// ── Wiki TikTok feed ──────────────────────────────────────────────────────
async function loadFeedWiki() {
  feedWikiLoaded = true;
  const container = document.getElementById('feed-wiki-cards');
  if (!container) return;
  container.innerHTML = '<div style="padding:40px;color:var(--subtext);font-size:13px;">Cargando artículos...</div>';

  try {
    const res = await fetch('/api/latest-articles?limit=20');
    const articles = await res.json();
    if (!articles.length) { container.innerHTML = '<div style="padding:40px;color:var(--subtext);">No hay artículos</div>'; return; }

    const feedEl = document.getElementById('feed-wiki');
    container.innerHTML = articles.map(a => {
      const summary = (a.summary || a.content || '').slice(0, 300).replace(/#+\s/g, '').replace(/\*\*/g, '');
      const tag = a.path.split('/')[1] || 'wiki';
      const name = a.name || a.path.split('/').pop().replace('.md','').replace(/-/g,' ');
      return `<div class="feed-card" onclick="openFeedArticle('${esc(a.path)}')">
        <div class="feed-card-tag">${esc(tag)}</div>
        <div class="feed-card-title">${esc(name)}</div>
        <div class="feed-card-summary">${esc(summary)}</div>
        <div class="feed-card-footer">
          <span class="feed-card-path">${esc(a.path)}</span>
          ${a.date ? `<span style="font-size:10px;color:var(--subtext);">${new Date(a.date).toLocaleDateString('es-UY',{day:'numeric',month:'short',year:'numeric'})}</span>` : ''}
          <button class="feed-card-open" onclick="event.stopPropagation();openFeedArticle('${esc(a.path)}')">Leer →</button>
        </div>
      </div>`;
    }).join('');

    // Keyboard navigation
    feedEl.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') feedEl.scrollBy({ top: feedEl.clientHeight, behavior: 'smooth' });
      if (e.key === 'ArrowUp') feedEl.scrollBy({ top: -feedEl.clientHeight, behavior: 'smooth' });
    });
  } catch (e) {
    container.innerHTML = `<div style="padding:40px;color:#f87171;">Error: ${e.message}</div>`;
  }
}

function openFeedArticle(path) {
  const wikiBtn = document.querySelector('.tab-btn[data-tab="wiki"]');
  if (wikiBtn) wikiBtn.click();
  setTimeout(() => loadFile(path), 80);
}

// ── News Stories ──────────────────────────────────────────────────────────
async function loadFeedNews() {
  clearInterval(storyTimer);
  try {
    const res = await fetch('/api/latest-news?limit=5');
    const news = await res.json();
    storyItems = news.flatMap(n => (n.stories || []).map(s => ({
      ...s,
      date: n.date || '',
      source: 'Hacker News',
    }))).slice(0, 30);

    if (!storyItems.length) {
      document.getElementById('story-title').textContent = 'No hay noticias disponibles';
      return;
    }

    storyIdx = 0;
    renderStories();
    showStory(0);
  } catch (e) {
    document.getElementById('story-title').textContent = 'Error cargando noticias';
  }
}

function renderStories() {
  const prog = document.getElementById('stories-progress');
  prog.innerHTML = storyItems.map((_, i) =>
    `<div class="sp-bar"><div class="sp-fill" id="sp-fill-${i}"></div></div>`
  ).join('');
}

function showStory(idx) {
  clearInterval(storyTimer);
  if (idx < 0 || idx >= storyItems.length) return;
  storyIdx = idx;

  const s = storyItems[idx];
  const dateStr = s.date ? new Date(s.date + 'T00:00:00').toLocaleDateString('es-UY', { weekday:'short', day:'numeric', month:'short' }) : '';
  document.getElementById('story-source').textContent = (s.source || 'HN') + (dateStr ? ' · ' + dateStr : '');
  document.getElementById('story-title').textContent = s.title || '';

  // Imagen de fondo
  const bg = document.getElementById('story-bg');
  if (s.image) {
    bg.style.backgroundImage = `url('${s.image}')`;
    bg.style.backgroundSize = 'cover';
    bg.style.backgroundPosition = 'center';
    bg.style.backgroundBlendMode = 'multiply';
    bg.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } else {
    bg.style.backgroundImage = 'none';
    bg.style.background = 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.85) 100%)';
  }

  // Descripción
  let metaEl = document.getElementById('story-desc');
  if (!metaEl) {
    metaEl = document.createElement('div');
    metaEl.id = 'story-desc';
    metaEl.style.cssText = 'font-size:13px;color:rgba(255,255,255,0.8);line-height:1.5;margin-bottom:10px;max-height:80px;overflow:hidden;';
    document.getElementById('story-meta').insertAdjacentElement('beforebegin', metaEl);
  }
  metaEl.textContent = s.description || '';

  document.getElementById('story-meta').textContent = [
    s.pts ? `⬆ ${s.pts} pts` : '',
    s.comments ? `💬 ${s.comments} comentarios` : '',
    s.url ? '🔗 ' + (() => { try { return new URL(s.url.startsWith('http') ? s.url : 'https://' + s.url).hostname; } catch { return ''; } })() : ''
  ].filter(Boolean).join('  ·  ');

  // Fill past progress bars instantly
  storyItems.forEach((_, i) => {
    const fill = document.getElementById(`sp-fill-${i}`);
    if (!fill) return;
    if (i < idx) { fill.style.transition = 'none'; fill.style.width = '100%'; }
    else if (i === idx) { fill.style.transition = 'none'; fill.style.width = '0%'; }
    else { fill.style.transition = 'none'; fill.style.width = '0%'; }
  });

  // Animate current bar
  const fill = document.getElementById(`sp-fill-${idx}`);
  if (fill) {
    requestAnimationFrame(() => {
      fill.style.transition = `width ${STORY_DURATION}ms linear`;
      fill.style.width = '100%';
    });
  }

  // Auto-advance
  storyTimer = setInterval(() => nextStory(), STORY_DURATION);
}

function nextStory() {
  clearInterval(storyTimer);
  if (storyIdx < storyItems.length - 1) showStory(storyIdx + 1);
  else { storyIdx = 0; showStory(0); } // loop
}

function prevStory() {
  clearInterval(storyTimer);
  if (storyIdx > 0) showStory(storyIdx - 1);
}

function openCurrentStory() {
  const s = storyItems[storyIdx];
  if (!s) return;
  if (s.url) window.open(s.url, '_blank');
}

// ============================================================
// Trees — Guided learning paths through multiple pages
// ============================================================

async function loadTrees() {
  const list = document.getElementById('trees-list');
  if (!list) return;
  document.getElementById('tree-reader').style.display = 'none';
  list.style.display = 'grid';
  list.innerHTML = '<div style="color:var(--subtext);font-size:12px;">Cargando trees...</div>';

  try {
    const trees = await fetch('/api/trees').then(r => r.json());
    if (!trees.length) {
      list.innerHTML = '<div style="color:var(--subtext);font-size:13px;">No hay trees todavía. Agregá archivos JSON en viz/trees/.</div>';
      return;
    }
    list.innerHTML = trees.map(t => `
      <div class="tree-card" onclick="openTree('${esc(t.id)}')" style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:20px;cursor:pointer;transition:all 200ms ease;">
        <div style="font-size:28px;margin-bottom:10px;">${t.icon || '🌳'}</div>
        <div style="font-size:14px;font-weight:700;color:var(--text);margin-bottom:4px;">${esc(t.title)}</div>
        <div style="font-size:12px;color:var(--subtext);margin-bottom:10px;">${esc(t.subtitle || '')}</div>
        <div style="font-size:11px;color:var(--subtext);line-height:1.5;">${esc(t.description || '')}</div>
        <div style="display:flex;gap:10px;margin-top:12px;flex-wrap:wrap;">
          ${t.audience ? `<span style="background:var(--surface2);color:var(--accent);padding:3px 8px;border-radius:10px;font-size:10px;font-weight:600;">${esc(t.audience)}</span>` : ''}
          ${t.estimatedTime ? `<span style="background:var(--surface2);color:var(--subtext);padding:3px 8px;border-radius:10px;font-size:10px;">⏱ ${esc(t.estimatedTime)}</span>` : ''}
          ${t.totalPages ? `<span style="background:var(--surface2);color:var(--subtext);padding:3px 8px;border-radius:10px;font-size:10px;">📄 ${t.totalPages} páginas</span>` : ''}
        </div>
      </div>
    `).join('');
  } catch(e) {
    list.innerHTML = `<div style="color:#f87171;font-size:12px;">Error: ${e.message}</div>`;
  }
}

async function openTree(id) {
  const list = document.getElementById('trees-list');
  const reader = document.getElementById('tree-reader');
  const content = document.getElementById('tree-content');

  list.style.display = 'none';
  reader.style.display = 'block';
  content.innerHTML = '<div style="color:var(--subtext);font-size:12px;">Cargando...</div>';

  try {
    const tree = await fetch(`/api/trees/${encodeURIComponent(id)}`).then(r => r.json());

    function renderNodes(nodes, depth = 0) {
      return (nodes || []).map(n => {
        if (n.type === 'section') {
          return `
            <div style="margin-bottom:24px;">
              <div style="font-size:13px;font-weight:700;color:var(--accent);text-transform:uppercase;letter-spacing:.06em;margin-bottom:12px;padding-bottom:6px;border-bottom:1px solid var(--border);">${esc(n.title)}</div>
              ${n.description ? `<div style="font-size:11px;color:var(--subtext);margin-bottom:12px;">${esc(n.description)}</div>` : ''}
              <div style="display:flex;flex-direction:column;gap:8px;">${renderNodes(n.children, depth + 1)}</div>
            </div>`;
        }
        // Leaf node — a page
        return `
          <div onclick="openTreePage('${esc(n.path || '')}')" style="background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:12px 16px;cursor:pointer;display:flex;align-items:flex-start;gap:12px;transition:all 180ms ease;" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border)'">
            <span style="font-size:16px;flex-shrink:0;">${n.required ? '📌' : '📄'}</span>
            <div style="flex:1;min-width:0;">
              <div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:3px;">${esc(n.title)}</div>
              ${n.description ? `<div style="font-size:11px;color:var(--subtext);">${esc(n.description)}</div>` : ''}
            </div>
            ${n.estimatedMin ? `<span style="font-size:10px;color:var(--subtext);white-space:nowrap;flex-shrink:0;">${n.estimatedMin} min</span>` : ''}
          </div>`;
      }).join('');
    }

    content.innerHTML = `
      <div style="margin-bottom:28px;">
        <div style="font-size:28px;margin-bottom:8px;">${tree.icon || '🌳'}</div>
        <h2 style="font-size:22px;font-weight:800;color:var(--text);margin:0 0 6px;">${esc(tree.title)}</h2>
        ${tree.subtitle ? `<div style="font-size:14px;color:var(--subtext);margin-bottom:8px;">${esc(tree.subtitle)}</div>` : ''}
        ${tree.description ? `<div style="font-size:13px;color:var(--subtext);line-height:1.6;max-width:600px;">${esc(tree.description)}</div>` : ''}
        <div style="display:flex;gap:10px;margin-top:12px;flex-wrap:wrap;">
          ${tree.audience ? `<span style="background:var(--surface2);color:var(--accent);padding:4px 10px;border-radius:10px;font-size:11px;font-weight:600;">${esc(tree.audience)}</span>` : ''}
          ${tree.estimatedTime ? `<span style="background:var(--surface2);color:var(--subtext);padding:4px 10px;border-radius:10px;font-size:11px;">⏱ ${esc(tree.estimatedTime)}</span>` : ''}
        </div>
      </div>
      <div>${renderNodes(tree.nodes)}</div>`;
  } catch(e) {
    content.innerHTML = `<div style="color:#f87171;">Error: ${e.message}</div>`;
  }
}

function openTreePage(filePath) {
  if (!filePath) return;
  // Switch to wiki tab and load the file
  const wikiBtn = document.querySelector('.tab-btn[data-tab="wiki"]');
  if (wikiBtn) wikiBtn.click();
  setTimeout(() => loadFile(filePath), 80);
}

function closeTreeReader() {
  document.getElementById('tree-reader').style.display = 'none';
  document.getElementById('trees-list').style.display = 'grid';
}
window.closeTreeReader = closeTreeReader;
