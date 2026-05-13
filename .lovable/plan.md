## Plan

Harden `supabase/functions/gsc/index.ts` input handling:

1. Wrap `await req.json()` in try/catch — return 400 `Invalid JSON` on parse failure.
2. Validate `action` is a known string (`get_token`, `verify`, `add_site`, `submit_sitemap`) — 400 otherwise.
3. Per-action payload validation:
   - `get_token`, `verify`: require `payload.site.identifier` (string).
   - `add_site`: require `payload.siteUrl` (string).
   - `submit_sitemap`: require `payload.siteUrl` and `payload.sitemapUrl` (strings).
4. Return 400 with a descriptive `error` message when validation fails, before any outbound fetch.
5. Keep the existing auth check and gateway call logic unchanged.

Only file touched: `supabase/functions/gsc/index.ts`. No new deps.