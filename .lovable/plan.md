# Improving agent readiness for tokenbel.info

Goal: raise the Is Agentic score from 66/100 by fixing what this landing repo actually controls, and clearly separating the items that live in the external MCP server (`mcp.tokenbel.info`, repo `Red-Panda-Dev/tokenbel-mcp`) and the Hype API.

## What this repo can fix

### 1. Agent-friendly 404 (Partial -> Pass)
- Add `public/404.md` — short English/Russian markdown body: what happened, links to `/sitemap.xml`, `/llms.txt`, `/auth.md`, main sections.
- Extend `functions/_middleware.js`: when the asset fetch results in a 404, return the markdown body with `text/markdown` for agents (`Accept: text/markdown`) and keep the existing HTML 404 page for browsers. Status stays 404 in both cases.
- Also inject a short markdown-ish recovery block (sitemap/llms.txt links) into the HTML 404 page content so the plain-text extraction of the HTML also contains it.

### 2. Agent instruction / when-to-use (Failed -> Pass)
- Add a `## When to use TokenBel` section to `public/llms.txt` (Russian body is kept per project rule, section names in the format llms.txt expects) naming concrete jobs: look up a Belarusian token/bond/share by ticker, check issuer financials, get secondary-market volumes, get payout calendar — plus how to call: markdown pages, MCP endpoint, Hype API base.
- Add a dedicated English `public/agent-instructions.md` (agent-facing file, English per project rule) with: best-fit use cases, non-goals (no investment advice, no trade execution), call patterns, rate limits, error semantics. Link it from `llms.txt`, `robots.txt`, `auth.md`, and the AI catalog.

### 3. Agent onboarding friction (Failed -> improved)
- Document the self-serve path in `agent-instructions.md` and `auth.md`: anonymous, key-free public read access (this *is* the free tier), no signup for MCP/markdown/Hype read endpoints, rate limits, and the escalation path for higher limits.
- Add machine-readable onboarding fields to `.well-known/oauth-protected-resource.json` and the AI catalog entry (`free_tier: true`, anonymous credential type, docs URL).
- Mirror the same on the pricing page markdown (`public/pricing/index.md`) so scanners reading content see a free tier.

### 4. Organization schema completeness (Partial -> Pass)
- Extend the existing Organization JSON-LD in `index.html` (and the copies on other pages that carry Organization) with `contactPoint` (`@type: ContactPoint`, `contactType: "customer support"`, email, `availableLanguage: ["ru","en"]`, Telegram URL) and `address` (`PostalAddress` with `addressCountry: BY`, `addressLocality: Минск`).
- Needs a decision from you: which public email and whether a street address/locality may be published (see Open questions).

### 5. Function-calling compatibility (Partial -> Pass)
- Publish an OpenAPI 3.1 spec for the public Hype read endpoints at `public/openapi.json` (served at `/openapi.json`), with unique `operationId`s, typed request/response schemas, and descriptions, plus a documented JSON error schema.
- Link it from `llms.txt`, `agent-instructions.md`, `ai-catalog.json`, and the MCP server card (`documentation` / `x-openapi`).
- The spec will describe only endpoints we verify against `hype.tokenbel.info` first; unverifiable endpoints are left out rather than guessed.

### 6. MCP server / manifest live handshake (Partial -> Pass)
- Add `public/.well-known/mcp.json` and route the extensionless `/.well-known/mcp` in `functions/_middleware.js` (same pattern as the existing oauth-protected-resource route) returning the server card JSON with `transport: streamable-http` and the endpoint URL, so the scanner's live handshake discovery at `/.well-known/mcp` succeeds.

## Items that live outside this repo

These are scored against `https://mcp.tokenbel.info/mcp` and `hype.tokenbel.info`, which this landing repo does not deploy. This repo also contains a second, Lovable-hosted MCP server (`src/lib/mcp/`) that is *not* the advertised endpoint.

- **Scoped permissions (Failed)** — requires OAuth scopes or API-key roles on the MCP/Hype server. We can publish the scope vocabulary in `oauth-protected-resource.json` (already lists `openid/email/profile`) and document scopes in `auth.md`, but real enforcement must ship in the MCP/API service.
- **JSON error responses (Failed)** — the API must return `{ "error": { "code", "message", "hint" } }` with proper status codes. We will define and publish that schema in the OpenAPI spec; the server must implement it.
- **MCP resources exposed (Failed)** — the advertised server declares the `resources` capability but `resources/list` is empty. Fix in the MCP server: either return real resources (e.g. `tokenbel://llms.txt`, `tokenbel://faq`, `tokenbel://statistics/secondmarket`) or drop the capability from the initialize handshake. Recommended: return resources pointing at the markdown mirrors this site already publishes.

If you want, I can also apply the resources fix to the in-repo `src/lib/mcp/` server so it is correct there, but it will not change the score until `mcp.tokenbel.info` is updated.

## Verification

- `curl -s -o /dev/null -w "%{http_code}" https://tokenbel.info/no-such-page` -> `404`; same URL with `Accept: text/markdown` -> 404 + `text/markdown` body.
- `curl -sI` on `/.well-known/mcp`, `/openapi.json`, `/agent-instructions.md`, `/llms.txt` -> 200 with correct content types.
- JSON-LD validated for the Organization block.
- Middleware behavior tested locally with a mock Cloudflare `ASSETS` fetcher (same approach used previously for the oauth-protected-resource route), covering: 404 markdown negotiation, `/.well-known/mcp`, and unchanged HTML paths.
- Final rescan via `POST https://isitagentready.com/api/scan`.

## Open questions

1. Public contact email for `contactPoint` (e.g. `info@tokenbel.info`)?
2. May I publish a postal address, or only `addressCountry: BY` + `addressLocality: Минск`?
3. Should I also fix the in-repo `src/lib/mcp/` server's resources, or leave it untouched since the live endpoint is external?
