// GSC helper - proxies requests to Lovable connector gateway for Google Search Console.
const GATEWAY = "https://connector-gateway.lovable.dev";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });

  const PROXY_SECRET = Deno.env.get("GSC_PROXY_SECRET");
  const reqAuth = req.headers.get("Authorization");
  if (!PROXY_SECRET || reqAuth !== `Bearer ${PROXY_SECRET}`) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: cors });
  }

  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  const GSC_KEY = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY");
  if (!LOVABLE_API_KEY || !GSC_KEY) {
    return new Response(JSON.stringify({ error: "Missing keys" }), { status: 500, headers: cors });
  }

  let parsed: any;
  try {
    parsed = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers: cors });
  }

  const action = parsed?.action;
  const payload = (parsed?.payload ?? {}) as Record<string, any>;
  const isStr = (v: unknown): v is string => typeof v === "string" && v.length > 0;

  const ALLOWED = ["get_token", "verify", "add_site", "submit_sitemap"] as const;
  if (typeof action !== "string" || !ALLOWED.includes(action as any)) {
    return new Response(JSON.stringify({ error: "unknown action" }), { status: 400, headers: cors });
  }

  if ((action === "get_token" || action === "verify") && !isStr(payload?.site?.identifier)) {
    return new Response(JSON.stringify({ error: "Missing payload.site.identifier" }), { status: 400, headers: cors });
  }
  if (action === "add_site" && !isStr(payload?.siteUrl)) {
    return new Response(JSON.stringify({ error: "Missing payload.siteUrl" }), { status: 400, headers: cors });
  }
  if (action === "submit_sitemap" && (!isStr(payload?.siteUrl) || !isStr(payload?.sitemapUrl))) {
    return new Response(JSON.stringify({ error: "Missing payload.siteUrl or payload.sitemapUrl" }), { status: 400, headers: cors });
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${LOVABLE_API_KEY}`,
    "X-Connection-Api-Key": GSC_KEY,
    "Content-Type": "application/json",
  };

  let url = "";
  let method = "POST";
  let body: string | undefined;

  if (action === "get_token") {
    url = `${GATEWAY}/google_search_console/siteVerification/v1/token`;
    body = JSON.stringify(payload);
  } else if (action === "verify") {
    url = `${GATEWAY}/google_search_console/siteVerification/v1/webResource?verificationMethod=META`;
    body = JSON.stringify(payload);
  } else if (action === "add_site") {
    const enc = encodeURIComponent(payload.siteUrl);
    url = `${GATEWAY}/google_search_console/webmasters/v3/sites/${enc}`;
    method = "PUT";
  } else if (action === "submit_sitemap") {
    const enc = encodeURIComponent(payload.siteUrl);
    const sm = encodeURIComponent(payload.sitemapUrl);
    url = `${GATEWAY}/google_search_console/webmasters/v3/sites/${enc}/sitemaps/${sm}`;
    method = "PUT";
  }

  const r = await fetch(url, { method, headers, body });
  const text = await r.text();
  return new Response(JSON.stringify({ status: r.status, body: text }), {
    status: 200,
    headers: { ...cors, "Content-Type": "application/json" },
  });
});
