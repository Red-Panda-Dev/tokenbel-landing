## Problem

`supabase/functions/gsc/index.ts` is a public edge function that proxies privileged Google Search Console actions (verify ownership, add site, submit sitemap) using your stored connector key. Anyone who finds the URL can call it and manipulate your GSC property.

The function is only used as an internal helper (one-off setup from the agent) — it is not called from the frontend or from any public flow. So the simplest correct fix is to gate it with a shared secret.

## Plan

1. Add a new runtime secret `GSC_PROXY_SECRET` (random string, you'll be prompted to enter it).
2. Update `supabase/functions/gsc/index.ts` to:
   - Read `GSC_PROXY_SECRET` from env.
   - Reject any request whose `Authorization` header is not exactly `Bearer <GSC_PROXY_SECRET>` with HTTP 401, before doing any work or calling the gateway.
   - Keep CORS preflight (`OPTIONS`) responding 200 without auth (browsers send preflight with no auth header).
   - Tighten `Access-Control-Allow-Headers` to `authorization, content-type` (no functional change, just hygiene).
3. When the agent needs to call this function in the future (e.g. submitting another sitemap), it will pass `Authorization: Bearer $GSC_PROXY_SECRET` via the curl/edge-function tools.

No frontend code touches this function, so nothing in the static site needs to change.

## Files

- `supabase/functions/gsc/index.ts` — add the auth check at the top of the handler.
- New secret: `GSC_PROXY_SECRET`.
