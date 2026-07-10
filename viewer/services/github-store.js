// github-store.js — commit files to the KB's GitHub repo via the REST API.
//
// Used as the write backend when the viewer runs on Vercel (or anywhere
// without a writable filesystem). Each "write" becomes a commit. Each
// "delete" becomes a deletion commit. The live Vercel deployment picks up
// the change on the next automatic rebuild (~60s after the commit).
//
// Env vars required:
//   GITHUB_TOKEN        — fine-grained PAT with contents:write on the repo
//   GITHUB_REPO         — "owner/repo" (e.g. "gmilano/wany-kb")
//   GITHUB_BRANCH       — default branch to commit against (default: "master")
//   GITHUB_BOT_NAME     — commit author (default: "kb-bot")
//   GITHUB_BOT_EMAIL    — commit author email (default: "kb-bot@users.noreply.github.com")
//
// Binary files (e.g. DALL-E covers) are supported via the `binary: true`
// flag on putFile — the content should be a Buffer in that case.

import { Octokit } from "@octokit/rest";

const TOKEN = process.env.GITHUB_TOKEN;
const REPO_SLUG = process.env.GITHUB_REPO || "";
const BRANCH = process.env.GITHUB_BRANCH || "master";
const BOT_NAME = process.env.GITHUB_BOT_NAME || "kb-bot";
const BOT_EMAIL = process.env.GITHUB_BOT_EMAIL || "kb-bot@users.noreply.github.com";

let _client = null;
function client() {
  if (!TOKEN) throw new Error("GITHUB_TOKEN not set — cannot write to GitHub-backed store");
  if (!REPO_SLUG || !REPO_SLUG.includes("/")) throw new Error("GITHUB_REPO must be 'owner/repo'");
  if (!_client) _client = new Octokit({ auth: TOKEN });
  return _client;
}
function ownerRepo() {
  // Tolerate full URLs, .git suffixes, and ssh remotes — extract owner/repo
  // from any of: owner/repo, github.com/owner/repo, https://github.com/owner/repo[.git],
  // git@github.com:owner/repo.git
  const m = REPO_SLUG.match(/(?:[/:])?([^/:\s]+)\/([^/\s]+?)(?:\.git)?$/);
  if (!m) throw new Error(`GITHUB_REPO must be 'owner/repo'. Got: ${REPO_SLUG}`);
  return { owner: m[1], repo: m[2] };
}

export function isConfigured() {
  return !!(TOKEN && REPO_SLUG && REPO_SLUG.includes("/"));
}

// Read a file from the remote repo. Used when the local filesystem doesn't
// have the file (e.g. because the viewer is running on Vercel and the file
// was written by a recent commit that hasn't been rebuilt yet).
export async function getFile(relPath, ref = BRANCH) {
  const octo = client();
  const { owner, repo } = ownerRepo();
  try {
    const { data } = await octo.repos.getContent({ owner, repo, path: relPath, ref });
    if (Array.isArray(data)) throw new Error(`${relPath} is a directory`);
    const content = Buffer.from(data.content, "base64").toString("utf8");
    return { path: relPath, content, sha: data.sha };
  } catch (e) {
    if (e.status === 404) return null;
    throw e;
  }
}

// Create or update a file. Automatically fetches the current SHA to do a safe
// update, or omits SHA for a create. Commit message is derived from the path.
export async function putFile(relPath, content, { message, binary = false } = {}) {
  const octo = client();
  const { owner, repo } = ownerRepo();

  // Get current SHA if the file exists (required for updates)
  let existingSha;
  try {
    const existing = await octo.repos.getContent({ owner, repo, path: relPath, ref: BRANCH });
    if (!Array.isArray(existing.data)) existingSha = existing.data.sha;
  } catch (e) {
    if (e.status !== 404) throw e;
  }

  const b64 = binary
    ? Buffer.from(content).toString("base64")
    : Buffer.from(content, "utf8").toString("base64");

  const res = await octo.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: relPath,
    message: message || `kb: update ${relPath}`,
    content: b64,
    sha: existingSha,
    branch: BRANCH,
    committer: { name: BOT_NAME, email: BOT_EMAIL },
    author: { name: BOT_NAME, email: BOT_EMAIL },
  });
  return {
    path: relPath,
    commit: res.data.commit.sha,
    url: res.data.content?.html_url,
  };
}

export async function deleteFile(relPath, { message } = {}) {
  const octo = client();
  const { owner, repo } = ownerRepo();
  try {
    const { data: existing } = await octo.repos.getContent({ owner, repo, path: relPath, ref: BRANCH });
    if (Array.isArray(existing)) throw new Error(`${relPath} is a directory`);
    await octo.repos.deleteFile({
      owner,
      repo,
      path: relPath,
      message: message || `kb: delete ${relPath}`,
      sha: existing.sha,
      branch: BRANCH,
      committer: { name: BOT_NAME, email: BOT_EMAIL },
      author: { name: BOT_NAME, email: BOT_EMAIL },
    });
    return { path: relPath, deleted: true };
  } catch (e) {
    if (e.status === 404) return { path: relPath, deleted: false, reason: "not-found" };
    throw e;
  }
}

// Batch write — creates a single commit with multiple files. Use this when
// generating related artifacts (book + cover + ideas folder) so we stay
// under GitHub's 5000/hr rate limit.
export async function putFiles(files, { message } = {}) {
  const octo = client();
  const { owner, repo } = ownerRepo();

  // 1. Get the ref + current tree
  const ref = await octo.git.getRef({ owner, repo, ref: `heads/${BRANCH}` });
  const latestCommit = await octo.git.getCommit({ owner, repo, commit_sha: ref.data.object.sha });

  // 2. Create blobs for each file
  const blobs = await Promise.all(
    files.map(async (f) => {
      const b = await octo.git.createBlob({
        owner,
        repo,
        content: f.binary
          ? Buffer.from(f.content).toString("base64")
          : Buffer.from(f.content, "utf8").toString("base64"),
        encoding: "base64",
      });
      return { path: f.path, sha: b.data.sha };
    })
  );

  // 3. Create a new tree
  const newTree = await octo.git.createTree({
    owner,
    repo,
    base_tree: latestCommit.data.tree.sha,
    tree: blobs.map((b) => ({ path: b.path, mode: "100644", type: "blob", sha: b.sha })),
  });

  // 4. Create commit
  const newCommit = await octo.git.createCommit({
    owner,
    repo,
    message: message || `kb: batch update ${files.length} files`,
    tree: newTree.data.sha,
    parents: [latestCommit.data.sha],
    author: { name: BOT_NAME, email: BOT_EMAIL, date: new Date().toISOString() },
  });

  // 5. Update ref
  await octo.git.updateRef({
    owner,
    repo,
    ref: `heads/${BRANCH}`,
    sha: newCommit.data.sha,
  });

  return { commit: newCommit.data.sha, files: files.length };
}
