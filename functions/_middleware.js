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

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
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
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
