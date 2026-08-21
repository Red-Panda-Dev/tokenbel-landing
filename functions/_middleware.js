/**
 * Cloudflare Pages Function — content negotiation for "Markdown for Agents".
 *
 * Requests with `Accept: text/markdown` (agents/LLM crawlers) get the markdown
 * representation of the page; browsers keep receiving HTML.
 * Docs: https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 */

/** Routes that have a markdown twin in the build output. */
const MARKDOWN_ROUTES = {
  "/": "/index.md",
  "/pricing/": "/pricing/index.md",
  "/faq/": "/faq.md",
  "/statistics/secondmarket/": "/statistics/secondmarket/index.md",
  "/contacts/": "/contacts/index.md",
  "/rss/": "/rss/index.md",
  "/login/": "/login/index.md",
};

/** Parse an Accept header into a map of media type -> q value. */
function parseAccept(header) {
  const result = new Map();
  for (const part of header.split(",")) {
    const [rawType, ...params] = part.trim().split(";");
    const type = rawType.trim().toLowerCase();
    if (!type) continue;
    let q = 1;
    for (const param of params) {
      const [key, value] = param.split("=");
      if (key && key.trim().toLowerCase() === "q") {
        const parsed = Number.parseFloat(value);
        if (!Number.isNaN(parsed)) q = parsed;
      }
    }
    result.set(type, q);
  }
  return result;
}

function prefersMarkdown(accept) {
  if (!accept) return false;
  const types = parseAccept(accept);
  const md = Math.max(
    types.get("text/markdown") ?? 0,
    types.get("text/x-markdown") ?? 0,
  );
  if (md <= 0) return false;
  const html = Math.max(
    types.get("text/html") ?? 0,
    types.get("application/xhtml+xml") ?? 0,
  );
  return md >= html;
}

function normalizePath(pathname) {
  if (pathname === "") return "/";
  if (pathname !== "/" && !pathname.endsWith("/")) return `${pathname}/`;
  return pathname;
}

/** Extensionless well-known JSON documents -> static asset with .json suffix. */
const WELL_KNOWN_JSON = {
  "/.well-known/oauth-protected-resource": "/.well-known/oauth-protected-resource.json",
  // Live MCP handshake/discovery document.
  "/.well-known/mcp": "/.well-known/mcp.json",
  // Web Bot Auth key directory (JWKS) — RFC 9421 / IETF WebBotAuth WG.
  "/.well-known/http-message-signatures-directory":
    "/.well-known/http-message-signatures-directory.json",
};

/** Media types for extensionless well-known documents. */
const WELL_KNOWN_CONTENT_TYPE = {
  "/.well-known/http-message-signatures-directory":
    "application/http-message-signatures-directory+json",
};


export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  const wellKnownPath = url.pathname.replace(/\/$/, "");
  const jsonPath = WELL_KNOWN_JSON[wellKnownPath];
  if (jsonPath && (request.method === "GET" || request.method === "HEAD")) {
    const assetResponse = await context.env.ASSETS.fetch(
      new Request(new URL(jsonPath, url.origin), { method: request.method }),
    );
    if (assetResponse.ok) {
      const headers = new Headers(assetResponse.headers);
      headers.set(
        "Content-Type",
        WELL_KNOWN_CONTENT_TYPE[wellKnownPath] || "application/json; charset=utf-8",
      );
      headers.set("Access-Control-Allow-Origin", "*");
      // Discovery metadata must not reuse the old HTML fallback that may still
      // exist in browser or intermediary caches from before this route existed.
      headers.set("Cache-Control", "no-store");
      headers.set("CDN-Cache-Control", "no-store");
      return new Response(assetResponse.body, { status: 200, headers });
    }
  }

  const path = normalizePath(url.pathname);
  const mdPath = MARKDOWN_ROUTES[path];


  if (
    mdPath &&
    (request.method === "GET" || request.method === "HEAD") &&
    prefersMarkdown(request.headers.get("Accept"))
  ) {
    const mdRequest = new Request(new URL(mdPath, url.origin), {
      method: request.method,
      headers: { Accept: "text/plain" },
    });
    const mdResponse = await context.env.ASSETS.fetch(mdRequest);
    if (mdResponse.ok) {
      const headers = new Headers(mdResponse.headers);
      headers.set("Content-Type", "text/markdown; charset=utf-8");
      headers.set("Vary", "Accept");
      // Cloudflare's edge cache ignores `Vary: Accept`, so negotiated responses
      // must never be stored at the edge — otherwise a markdown response gets
      // replayed to browsers (and vice versa).
      headers.set("Cache-Control", "no-store");
      headers.set("CDN-Cache-Control", "no-store");
      headers.set("Link", `<${url.origin}${mdPath}>; rel="alternate"; type="text/markdown"`);
      return new Response(mdResponse.body, { status: 200, headers });
    }
  }

  const response = await next();
  const headers = new Headers(response.headers);
  const existingVary = headers.get("Vary");
  headers.set(
    "Vary",
    existingVary && !/\baccept\b/i.test(existingVary) ? `${existingVary}, Accept` : existingVary || "Accept",
  );
  if (mdPath) {
    headers.set("Link", `<${url.origin}${mdPath}>; rel="alternate"; type="text/markdown"`);
    headers.set("Cache-Control", "no-store");
    headers.set("CDN-Cache-Control", "no-store");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
