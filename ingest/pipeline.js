#!/usr/bin/env node
/**
 * Globant Industry KB — Ingest Pipeline
 *
 * Busca en GitHub repos open source por industria, filtra por licencia,
 * y actualiza los archivos markdown de la KB correspondiente.
 *
 * Usage:
 *   GITHUB_TOKEN=xxx node pipeline.js gaming
 *   node pipeline.js --all          (corre todas las industrias)
 *   node pipeline.js gaming --dry   (preview sin escribir)
 *
 * Requiere: GITHUB_TOKEN (https://github.com/settings/tokens — solo read:public)
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECTS_DIR = join(__dirname, '../..');
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const DRY_RUN = process.argv.includes('--dry');
const TODAY = new Date().toISOString().slice(0, 10);

const INDUSTRIES = [
  'gaming', 'legal', 'financial', 'healthcare', 'media',
  'retail', 'travel', 'technology', 'education',
  'automotive', 'energy', 'enterprise',
];

// ─── GitHub API ───────────────────────────────────────────────────────────────

async function ghSearch(query, sort = 'stars', perPage = 30) {
  const cleanQuery = query.replace(/\slicense:\S+/g, '').trim();

  // Use gh CLI if available (reuses existing auth token)
  const { execSync } = await import('child_process');
  try {
    const result = execSync(
      `gh api "/search/repositories?q=${encodeURIComponent(cleanQuery)}&sort=${sort}&order=desc&per_page=${perPage}"`,
      { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
    );
    const data = JSON.parse(result);
    return data.items || [];
  } catch (ghErr) {
    // Fallback: direct fetch with token if available
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(cleanQuery)}&sort=${sort}&order=desc&per_page=${perPage}`;
    const headers = {
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'globant-kb-ingest/1.0',
      ...(GITHUB_TOKEN ? { 'Authorization': `Bearer ${GITHUB_TOKEN}` } : {}),
    };
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
    const data = await res.json();
    if (data.message) throw new Error(data.message);
    return data.items || [];
  }
}

function starsLabel(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function licenseLabel(repo) {
  return repo.license?.spdx_id || repo.license?.name || '?';
}

function isOpenLicense(repo) {
  const id = repo.license?.spdx_id || '';
  return ['MIT', 'Apache-2.0', 'BSD-2-Clause', 'BSD-3-Clause', 'LGPL-2.1',
    'MPL-2.0', 'ISC', 'Unlicense', 'CC0-1.0'].includes(id);
}

// ─── Config per industry ──────────────────────────────────────────────────────

function loadConfig(industry) {
  const configPath = join(PROJECTS_DIR, `${industry}-kb`, 'ingest', 'config.json');
  if (existsSync(configPath)) {
    return JSON.parse(readFileSync(configPath, 'utf8'));
  }
  return getDefaultConfig(industry);
}

function getDefaultConfig(industry) {
  const configs = {
    gaming: {
      topics: ['game-engine', 'game-ai', 'procedural-generation', 'npc-ai', 'game-development'],
      agentKeywords: 'AI NPC game agent open source',
      repoKeywords: 'game engine AI open source',
      verticalKeywords: 'game server multiplayer open source',
      awesomeLists: ['https://github.com/ellisonleao/magictools'],
    },
    legal: {
      topics: ['legal-tech', 'contract-analysis', 'legal-ai', 'nlp-legal'],
      agentKeywords: 'AI legal contract agent open source',
      repoKeywords: 'legal NLP document analysis open source',
      verticalKeywords: 'legal case management open source',
      awesomeLists: [],
    },
    financial: {
      topics: ['fintech', 'algorithmic-trading', 'finance-ai', 'quantitative-finance'],
      agentKeywords: 'AI finance trading agent open source',
      repoKeywords: 'quantitative finance algorithmic trading open source',
      verticalKeywords: 'banking fintech platform open source',
      awesomeLists: ['https://github.com/wilsonfreitas/awesome-quant'],
    },
    healthcare: {
      topics: ['healthcare', 'medical-ai', 'clinical-nlp', 'health-informatics'],
      agentKeywords: 'AI healthcare medical agent open source',
      repoKeywords: 'medical imaging clinical NLP health open source',
      verticalKeywords: 'electronic health records EHR open source',
      awesomeLists: [],
    },
    media: {
      topics: ['content-generation', 'media-ai', 'video-generation', 'text-to-speech'],
      agentKeywords: 'AI content creation media agent open source',
      repoKeywords: 'content generation media AI open source',
      verticalKeywords: 'CMS media platform open source',
      awesomeLists: [],
    },
    retail: {
      topics: ['ecommerce', 'retail-ai', 'recommendation-system', 'inventory-management'],
      agentKeywords: 'AI retail ecommerce agent recommendation open source',
      repoKeywords: 'ecommerce recommendation system retail AI open source',
      verticalKeywords: 'ecommerce platform open source',
      awesomeLists: [],
    },
    travel: {
      topics: ['travel-tech', 'booking-system', 'hospitality-ai'],
      agentKeywords: 'AI travel booking concierge agent open source',
      repoKeywords: 'travel booking hospitality AI open source',
      verticalKeywords: 'hotel booking property management open source',
      awesomeLists: [],
    },
    technology: {
      topics: ['devops', 'developer-tools', 'code-review', 'observability'],
      agentKeywords: 'AI coding developer agent code review open source',
      repoKeywords: 'AI developer tools devops automation open source',
      verticalKeywords: 'developer platform IDE open source',
      awesomeLists: [],
    },
    education: {
      topics: ['edtech', 'learning-management', 'educational-ai', 'tutoring'],
      agentKeywords: 'AI tutor education agent learning open source',
      repoKeywords: 'educational AI tutoring LMS open source',
      verticalKeywords: 'learning management system LMS open source',
      awesomeLists: [],
    },
    automotive: {
      topics: ['autonomous-vehicles', 'automotive-ai', 'connected-vehicles', 'adas'],
      agentKeywords: 'AI automotive vehicle agent predictive maintenance open source',
      repoKeywords: 'autonomous driving automotive AI open source',
      verticalKeywords: 'fleet management automotive platform open source',
      awesomeLists: [],
    },
    energy: {
      topics: ['smart-grid', 'energy-management', 'renewable-energy', 'iot-energy'],
      agentKeywords: 'AI energy grid optimization agent open source',
      repoKeywords: 'smart grid energy forecasting AI open source',
      verticalKeywords: 'energy management platform open source',
      awesomeLists: [],
    },
    enterprise: {
      topics: ['erp', 'crm', 'enterprise-ai', 'business-automation'],
      agentKeywords: 'AI enterprise ERP CRM agent automation open source',
      repoKeywords: 'ERP CRM enterprise platform AI open source',
      verticalKeywords: 'Odoo SAP-like enterprise platform open source',
      awesomeLists: [],
    },
  };
  return configs[industry] || configs.technology;
}

// ─── Markdown writers ─────────────────────────────────────────────────────────

function repoToTableRow(repo) {
  const url = repo.html_url;
  const name = repo.name;
  const license = licenseLabel(repo);
  const desc = (repo.description || '').replace(/\|/g, '\\|').slice(0, 80);
  const stars = starsLabel(repo.stargazers_count);
  return `| [${name}](${url}) | ${license} | ${desc} | ${stars} |`;
}

function writeAgentsTop(kbDir, repos, industry) {
  const open = repos.filter(isOpenLicense).slice(0, 10);
  const rows = open.map(r =>
    `| [${r.name}](${r.html_url}) | ${licenseLabel(r)} | ${(r.description || '').slice(0, 70)} | ${starsLabel(r.stargazers_count)} |`
  ).join('\n');

  const content = `# 🎯 Agentes AI — ${industry}

> Agentes y herramientas AI open source para la industria. Foco: MIT / Apache 2.0.
> Última actualización: ${TODAY}

## Agentes y herramientas destacadas

| Nombre | Licencia | Descripción | Stars |
|--------|----------|-------------|-------|
${rows || '| — | — | Sin resultados esta semana | — |'}

---
*Actualizado automáticamente por el pipeline de ingest.*
`;
  return content;
}

function writeReposTrending(kbDir, repos) {
  const recent = repos
    .filter(r => new Date(r.pushed_at) > new Date(Date.now() - 90 * 24 * 3600 * 1000))
    .slice(0, 10);

  const rows = recent.map(repoToTableRow).join('\n');

  return `# 📈 Repos trending

> Última actualización: ${TODAY}

| Nombre | Licencia | Descripción | Stars |
|--------|----------|-------------|-------|
${rows || '| — | — | Sin resultados | — |'}

---
*Pipeline automático — se actualiza cada hora.*
`;
}

function writeReposFoundations(existing, openRepos) {
  // Preserve existing content and append new findings section
  const newSection = openRepos.slice(0, 8).map(r =>
    `| [${r.name}](${r.html_url}) | ${licenseLabel(r)} | ${(r.description || '').slice(0, 80)} | Sí — ${starsLabel(r.stargazers_count)} ★ |`
  ).join('\n');

  return `# 🏗️ Repos fundacionales

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: ${TODAY}

## Plataformas y frameworks base

| Repo | Licencia | Descripción | ¿Base para AI? |
|------|----------|-------------|----------------|
${newSection || '| — | — | Por completar | — |'}

---
*Ver también: \`verticals/solutions.md\` para plataformas verticales completas.*
`;
}

// ─── Main pipeline ────────────────────────────────────────────────────────────

async function runIndustry(industry) {
  console.log(`\n🔄 [${industry}] Iniciando pipeline...`);
  const kbDir = join(PROJECTS_DIR, `${industry}-kb`);

  if (!existsSync(kbDir)) {
    console.error(`  ✗ No existe ${kbDir}`);
    return;
  }

  const config = loadConfig(industry);

  // 1. Search GitHub
  // Build short targeted queries from config keywords
  const agentTerms = (config.keywords?.agents || [config.agentKeywords]).slice(0, 2);
  const repoTerms = (config.keywords?.repos || [config.repoKeywords]).slice(0, 2);

  console.log(`  → Buscando agentes AI (${agentTerms.join(', ')})...`);
  let agentRepos = [];
  for (const term of agentTerms) {
    try {
      const results = await ghSearch(term, 'stars', 10);
      agentRepos.push(...results);
      await new Promise(r => setTimeout(r, 400));
    } catch (e) {
      console.warn(`    ⚠ "${term}": ${e.message}`);
    }
  }
  // Dedup
  { const seen = new Set(); agentRepos = agentRepos.filter(r => seen.has(r.html_url) ? false : seen.add(r.html_url)); }
  console.log(`    ${agentRepos.length} repos encontrados`);

  console.log(`  → Buscando repos fundacionales (${repoTerms.join(', ')})...`);
  let foundationRepos = [];
  for (const term of repoTerms) {
    try {
      const results = await ghSearch(term, 'stars', 10);
      foundationRepos.push(...results);
      await new Promise(r => setTimeout(r, 400));
    } catch (e) {
      console.warn(`    ⚠ "${term}": ${e.message}`);
    }
  }
  { const seen = new Set(); foundationRepos = foundationRepos.filter(r => seen.has(r.html_url) ? false : seen.add(r.html_url)); }

  console.log(`  → Buscando trending por topics...`);
  let trendingRepos = [];
  for (const topic of config.topics.slice(0, 4)) {
    try {
      const results = await ghSearch(`topic:${topic}`, 'updated', 8);
      trendingRepos.push(...results);
      await new Promise(r => setTimeout(r, 400));
    } catch (e) {
      console.warn(`    ⚠ Topic ${topic}: ${e.message}`);
    }
  }

  // Dedup by html_url
  const seen = new Set();
  trendingRepos = trendingRepos.filter(r => {
    if (seen.has(r.html_url)) return false;
    seen.add(r.html_url);
    return true;
  });

  // 2. Write files
  const files = {
    'agents/top.md': writeAgentsTop(kbDir, agentRepos, industry),
    'agents/trending.md': writeReposTrending(kbDir, trendingRepos),
    'repos/foundations.md': writeReposFoundations('', foundationRepos.filter(isOpenLicense)),
    'repos/trending.md': writeReposTrending(kbDir, trendingRepos),
    'intel/trends.md': `# 📡 Tendencias — ${industry}\n\n> Última actualización: ${TODAY}\n\n## Repos más activos esta semana\n\n${trendingRepos.slice(0, 5).map(r => `- [${r.full_name}](${r.html_url}) — ${r.description || ''}`).join('\n') || '- Sin datos'}\n`,
  };

  if (DRY_RUN) {
    console.log(`  [DRY] Archivos que se escribirían:`);
    for (const [file, content] of Object.entries(files)) {
      console.log(`    ${file} (${content.length} chars)`);
    }
    return;
  }

  for (const [file, content] of Object.entries(files)) {
    const path = join(kbDir, file);
    writeFileSync(path, content, 'utf8');
    console.log(`  ✓ ${file}`);
  }

  // 3. Git commit + push
  const { execSync } = await import('child_process');
  try {
    execSync(`cd ${kbDir} && git add -A && git commit -m "ingest: ${industry} pipeline update ${TODAY}" && git push`, {
      stdio: 'pipe'
    });
    console.log(`  ✓ Commit + push OK`);
  } catch (e) {
    console.warn(`  ⚠ Git: ${e.message?.slice(0, 100)}`);
  }

  console.log(`  ✅ [${industry}] Done`);
}

// ─── CLI entry ────────────────────────────────────────────────────────────────

async function main() {
  const arg = process.argv[2];

  if (!arg || arg === '--help') {
    console.log('Usage: node pipeline.js <industry|--all> [--dry]');
    console.log('Industries:', INDUSTRIES.join(', '));
    process.exit(0);
  }

  if (arg === '--all') {
    for (const industry of INDUSTRIES) {
      await runIndustry(industry);
      await new Promise(r => setTimeout(r, 500));
    }
  } else if (INDUSTRIES.includes(arg)) {
    await runIndustry(arg);
  } else {
    console.error(`Unknown industry: ${arg}. Valid: ${INDUSTRIES.join(', ')}`);
    process.exit(1);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
