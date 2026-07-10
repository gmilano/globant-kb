// mcp-build.js — single source of truth for the MCP server's tools,
// resources, and prompts. Both the local stdio CLI (bin/kb-mcp.js) and
// the Vercel HTTP handler (lib/handlers/mcp.js) call buildMcpServer()
// to produce a fully-wired Server, then connect it to their respective
// transport (stdio for desktop, StreamableHTTP for serverless).

import path from "path";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import kb from "./kb-api.js";

const info = kb.info();

export const TOOLS = [
  { name: "kb_info", description: "Return metadata about the currently attached KB (name, context, root path). Always call this first if you are unsure which KB you are talking to.", inputSchema: { type: "object", properties: {} } },
  { name: "kb_stats", description: "Counts for the KB — raw files, compiled wiki articles, ideas, books.", inputSchema: { type: "object", properties: {} } },
  { name: "kb_search", description: "Lexical + semantic search of the KB. Returns ranked article paths with snippets. Prefer this over reading files at random.", inputSchema: { type: "object", required: ["query"], properties: { query: { type: "string", description: "Natural language query" }, max_items: { type: "number", description: "Maximum hits to return (default 15)" } } } },
  { name: "kb_prime", description: "Full Pick → Pack → Deliver pipeline. Given a query, returns a synthesized context block built from the most relevant articles. Use this when you need one concrete answer rather than a list of hits.", inputSchema: { type: "object", required: ["query"], properties: { query: { type: "string" }, format: { type: "string", enum: ["context", "markdown", "answer"], description: "Output shape (default: context)" }, max_items: { type: "number" } } } },
  { name: "kb_file_read", description: "Read a markdown file from the KB by relative path. Returns frontmatter + content separately.", inputSchema: { type: "object", required: ["path"], properties: { path: { type: "string", description: "Path relative to the KB root, e.g. 'wiki/concepts/agent-harness.md'" } } } },
  { name: "kb_file_write", description: "Create or overwrite a file in the KB. Writes are constrained to stay inside KB_ROOT. Use this to save new notes, ideas, or updates.", inputSchema: { type: "object", required: ["path", "content"], properties: { path: { type: "string" }, content: { type: "string" } } } },
  { name: "kb_file_list", description: "List markdown files under a subtree of the KB.", inputSchema: { type: "object", properties: { dir: { type: "string", description: "Subdirectory (default: whole KB)" } } } },
  { name: "kb_wikilinks", description: "Return the [[wikilinks]] a given article points at.", inputSchema: { type: "object", required: ["path"], properties: { path: { type: "string" } } } },
  { name: "kb_backlinks", description: "Return every file that points at the given article via a [[wikilink]].", inputSchema: { type: "object", required: ["path"], properties: { path: { type: "string" } } } },
  { name: "kb_compile", description: "Compile raw notes into the wiki. Runs the Pack step of the fulfillment pipeline on up to N raw files.", inputSchema: { type: "object", properties: { max_files: { type: "number" } } } },
  { name: "kb_book_list", description: "List every composed book in this KB (slug, title, chapter count, cover path).", inputSchema: { type: "object", properties: {} } },
  { name: "kb_book_compose", description: "Compose a brand new book about a topic. Scans the wiki for relevant articles and organizes them into pedagogical chapters. Returns the slug; subsequent reads/enrichments use it.", inputSchema: { type: "object", required: ["topic"], properties: { topic: { type: "string" }, lang: { type: "string", enum: ["auto", "en", "es"] }, force: { type: "boolean", description: "Re-compose even if a book with the same slug is cached" } } } },
  { name: "kb_book_get", description: "Load the full book JSON (title, subtitle, intro, chapters, articles).", inputSchema: { type: "object", required: ["slug"], properties: { slug: { type: "string" } } } },
  { name: "kb_book_delete", description: "Delete a book, its cover PNG, and its derived-ideas folder.", inputSchema: { type: "object", required: ["slug"], properties: { slug: { type: "string" } } } },
  { name: "kb_book_rename", description: "Rename a book's title and/or subtitle. Slug stays stable.", inputSchema: { type: "object", required: ["slug"], properties: { slug: { type: "string" }, title: { type: "string" }, subtitle: { type: "string" } } } },
  { name: "kb_book_generate_cover", description: "Generate a DALL-E 3 cover image for the book. Requires OPENAI_API_KEY.", inputSchema: { type: "object", required: ["slug"], properties: { slug: { type: "string" } } } },
  { name: "kb_book_generate_prologue", description: "Generate a narrative prologue grounded in the chapter content.", inputSchema: { type: "object", required: ["slug"], properties: { slug: { type: "string" } } } },
  { name: "kb_book_generate_index", description: "Generate a back-of-book thematic index mapping concepts to chapters.", inputSchema: { type: "object", required: ["slug"], properties: { slug: { type: "string" } } } },
  { name: "kb_book_generate_references", description: "Build a deterministic reference list from each cited article's frontmatter (author, date, source_url).", inputSchema: { type: "object", required: ["slug"], properties: { slug: { type: "string" } } } },
  { name: "kb_book_generate_ideas", description: "Generate actionable ideas derived from a book + optional user context (audience, goals, constraints). Each idea is persisted as a real markdown note in viz/ideas/from-books/<slug>/.", inputSchema: { type: "object", required: ["slug"], properties: { slug: { type: "string" }, context: { type: "string", description: "Context from the user about who the ideas are for" }, count: { type: "number", description: "How many ideas (default 10)" } } } },
  { name: "kb_book_explore", description: "Ask the LLM to propose wiki concepts that are MISSING from the KB and would strengthen the given book. Returns proposals; use kb_book_explore_accept to actually create the stubs.", inputSchema: { type: "object", required: ["slug"], properties: { slug: { type: "string" }, count: { type: "number" } } } },
  { name: "kb_book_explore_accept", description: "Accept explore proposals by writing them as stub articles into wiki/concepts/.", inputSchema: { type: "object", required: ["slug", "proposals"], properties: { slug: { type: "string" }, proposals: { type: "array", items: { type: "object" } } } } },
  { name: "kb_ideas_list", description: "List every idea note in the KB (hand-written, voice-transcribed, and book-derived).", inputSchema: { type: "object", properties: {} } },
  { name: "kb_ideas_new", description: "Create a new idea note.", inputSchema: { type: "object", required: ["concept"], properties: { concept: { type: "string" }, body: { type: "string" } } } },
  { name: "kb_nexus_query", description: "Query the GitNexus knowledge graph for execution flows / clusters / concepts matching a query.", inputSchema: { type: "object", required: ["query"], properties: { query: { type: "string" } } } },
  { name: "kb_nexus_context", description: "Get 360° context on a named symbol or file in the graph (callers, callees, clusters).", inputSchema: { type: "object", required: ["name"], properties: { name: { type: "string" } } } },
];

const PROMPTS = [
  { name: "kb_tour", description: "Give the user a guided tour of what's in the KB — raw vs wiki, books, ideas, how to navigate.", arguments: [] },
  { name: "kb_ask", description: "Answer a question grounded strictly in the KB. Prefers kb_prime then cites its sources.", arguments: [{ name: "question", description: "The user's question", required: true }] },
  { name: "kb_author_book", description: "Walk the user through composing a book on a topic and enriching it with cover/prologue/index/references.", arguments: [{ name: "topic", description: "Book topic", required: true }] },
];

// Build a fresh Server instance with all tools, resources, and prompts wired.
// Stateless serverless callers create a new server per request; the stdio
// CLI creates one at startup and lives forever.
export function buildMcpServer() {
  const server = new Server(
    { name: `kb-${info.name}`, version: "1.0.0" },
    { capabilities: { tools: {}, resources: {}, prompts: {} } }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));

  server.setRequestHandler(CallToolRequestSchema, async (req) => {
    const { name, arguments: args = {} } = req.params;
    const wrap = (value) => ({ content: [{ type: "text", text: typeof value === "string" ? value : JSON.stringify(value, null, 2) }] });
    const err = (msg) => ({ content: [{ type: "text", text: `error: ${msg}` }], isError: true });
    try {
      switch (name) {
        case "kb_info": return wrap(kb.info());
        case "kb_stats": return wrap(await kb.stats());
        case "kb_search": return wrap(await kb.search(args.query, { maxItems: args.max_items || 15 }));
        case "kb_prime": return wrap(await kb.prime(args.query, { format: args.format || "context", maxItems: args.max_items || 8 }));
        case "kb_file_read": return wrap(await kb.fileRead(args.path));
        case "kb_file_write": return wrap(await kb.fileWrite(args.path, args.content));
        case "kb_file_list": return wrap(await kb.fileList({ dir: args.dir || "", recursive: true }));
        case "kb_wikilinks": return wrap(await kb.wikilinks(args.path));
        case "kb_backlinks": return wrap(await kb.backlinks(args.path));
        case "kb_compile": return wrap(await kb.compileAll({ maxFiles: args.max_files || 20 }));
        case "kb_book_list": return wrap(await kb.books.list());
        case "kb_book_compose": return wrap(await kb.books.compose(args.topic, { lang: args.lang || "auto", force: !!args.force }));
        case "kb_book_get": return wrap(await kb.books.get(args.slug));
        case "kb_book_delete": return wrap(await kb.books.delete(args.slug));
        case "kb_book_rename": return wrap(await kb.books.patch(args.slug, { title: args.title, subtitle: args.subtitle }));
        case "kb_book_generate_cover": return wrap(await kb.books.generateCover(args.slug));
        case "kb_book_generate_prologue": return wrap(await kb.books.generatePrologue(args.slug));
        case "kb_book_generate_index": return wrap(await kb.books.generateIndex(args.slug));
        case "kb_book_generate_references": return wrap(await kb.books.generateReferences(args.slug));
        case "kb_book_generate_ideas": return wrap(await kb.books.generateIdeas(args.slug, { context: args.context || "", count: args.count || 10 }));
        case "kb_book_explore": return wrap(await kb.books.explore(args.slug, { count: args.count || 6 }));
        case "kb_book_explore_accept": return wrap(await kb.books.acceptExplore(args.slug, args.proposals || []));
        case "kb_ideas_list": return wrap(await kb.ideas.list());
        case "kb_ideas_new": return wrap(await kb.ideas.create({ concept: args.concept, body: args.body || "" }));
        case "kb_nexus_query": return wrap(await kb.nexus.query(args.query));
        case "kb_nexus_context": return wrap(await kb.nexus.context(args.name));
        default: return err(`unknown tool: ${name}`);
      }
    } catch (e) {
      return err(e.message || String(e));
    }
  });

  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    const wikiFiles = await kb.fileList({ dir: "wiki", recursive: true });
    const books = await kb.books.list();
    const ideas = await kb.ideas.list();
    const resources = [];
    for (const f of wikiFiles.slice(0, 500)) {
      resources.push({
        uri: `kb://wiki/${f.path.replace(/^wiki\//, "")}`,
        name: path.basename(f.path, ".md"),
        mimeType: "text/markdown",
        description: `Wiki article · ${f.path}`,
      });
    }
    for (const b of books) {
      resources.push({
        uri: `kb://book/${b.slug}`,
        name: b.title || b.slug,
        mimeType: "application/json",
        description: `Book · ${b.chapters} chapters · ${b.topic}`,
      });
    }
    for (const i of ideas.slice(0, 200)) {
      resources.push({
        uri: `kb://idea/${encodeURIComponent(i.path)}`,
        name: i.concept || path.basename(i.path),
        mimeType: "text/markdown",
        description: `Idea · ${i.date}${i.source_book ? " · from " + i.source_book : ""}`,
      });
    }
    return { resources };
  });

  server.setRequestHandler(ReadResourceRequestSchema, async (req) => {
    const uri = req.params.uri;
    try {
      if (uri.startsWith("kb://wiki/")) {
        const rel = "wiki/" + uri.slice("kb://wiki/".length);
        const f = await kb.fileRead(rel);
        return { contents: [{ uri, mimeType: "text/markdown", text: f.raw }] };
      }
      if (uri.startsWith("kb://book/")) {
        const slug = uri.slice("kb://book/".length);
        const b = await kb.books.get(slug);
        return { contents: [{ uri, mimeType: "application/json", text: JSON.stringify(b, null, 2) }] };
      }
      if (uri.startsWith("kb://idea/")) {
        const rel = decodeURIComponent(uri.slice("kb://idea/".length));
        const f = await kb.fileRead(rel);
        return { contents: [{ uri, mimeType: "text/markdown", text: f.raw }] };
      }
      throw new Error("unknown URI scheme");
    } catch (e) {
      return { contents: [{ uri, mimeType: "text/plain", text: `error: ${e.message}` }] };
    }
  });

  server.setRequestHandler(ListPromptsRequestSchema, async () => ({ prompts: PROMPTS }));

  server.setRequestHandler(GetPromptRequestSchema, async (req) => {
    const { name, arguments: args = {} } = req.params;
    switch (name) {
      case "kb_tour":
        return {
          messages: [{
            role: "user",
            content: { type: "text", text: `You are attached to the ${info.display_name} via MCP. Call kb_stats first to see the shape of the KB, then give me a short tour: which folders matter (wiki/, raw/, viz/ideas/, raw/books/), what a typical wiki article looks like (call kb_file_read on a sample), how books and ideas work, and the 3 most useful tools I should know about.` },
          }],
        };
      case "kb_ask":
        return {
          messages: [{
            role: "user",
            content: { type: "text", text: `Answer this question using only the contents of the ${info.display_name}: "${args.question}". Call kb_prime first to retrieve grounded context, then answer. Cite every claim with the wiki/raw path you used. If the KB doesn't cover the question, say so explicitly.` },
          }],
        };
      case "kb_author_book":
        return {
          messages: [{
            role: "user",
            content: { type: "text", text: `I want to compose a book about "${args.topic}" in the ${info.display_name}. Please:\n1. Call kb_book_compose with topic="${args.topic}"\n2. Once composed, call kb_book_generate_prologue, kb_book_generate_index, and kb_book_generate_references on the returned slug\n3. Call kb_book_generate_cover (optional — costs money via OpenAI)\n4. Show me the final book structure: title, chapter titles, and a short summary per chapter.` },
          }],
        };
      default:
        throw new Error(`unknown prompt: ${name}`);
    }
  });

  return server;
}

export function getKbInfo() { return info; }
