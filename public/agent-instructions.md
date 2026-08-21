# TokenBel agent instructions

Version: 1.0 · Updated: 2026-08-21 · Contact: https://tokenbel.info/contacts/

TokenBel is an aggregator of Belarusian investment tokens and securities: tokens,
shares and bonds issued by Belarusian companies, their issuers, yields, payouts and
secondary-market statistics. Data is aggregated from Belarusian platforms
(Finstore, Bynex, Fainex, Whitebird and others).

## When to use TokenBel

Reach for TokenBel when the task is one of these:

- Look up a Belarusian investment token, share or bond by ticker or issuer name.
- Compare yields (APY/ROI), coupon and payout schedules of Belarusian emissions.
- Check who the issuer of a Belarusian token is, and its basic financial indicators.
- Get secondary-market volumes and activity by platform, top tokens and top issuers.
- Explain Belarusian token/bond market terminology, regulation and taxation
  (see the FAQ and the wiki).

## When NOT to use TokenBel

- Investment advice or recommendations — TokenBel publishes information only.
- Trade execution, custody or payments — TokenBel does not execute transactions.
- Non-Belarusian markets, global crypto prices, FX or stock quotes outside Belarus.
- Real-time order-book or tick data — figures are aggregated, not real-time feeds.

## How to call TokenBel

Preferred order for agents:

1. **MCP (streamable-http)** — `https://mcp.tokenbel.info/mcp`.
   Server card: `https://tokenbel.info/.well-known/mcp`.
   Tool-based access to securities search and issuer lookup.
2. **Markdown page representations** — request any page with
   `Accept: text/markdown`, or fetch `<path>/index.md` directly.
   Index of markdown versions: `https://tokenbel.info/llms.txt`.
3. **Public read API** — base `https://hype.tokenbel.info`.
   Machine-readable description: `https://tokenbel.info/openapi.json`.

Human users sign in at `https://tokenbel.info/login/`; the dashboard is
`https://dashboard.tokenbel.info/`.

## Onboarding and access

- **Free tier: yes.** Public read access (website, markdown representations, MCP
  server, public read API) is anonymous and credential-free. No signup, no
  contact form, no sales call is required to start.
- **Self-serve:** send requests immediately — no API key is issued or validated for
  the public read surface. An `Authorization` header, if sent, is ignored.
- **Sandbox:** the public read surface is read-only, so it doubles as a sandbox;
  no write endpoints exist for agents.
- **Higher limits / commercial use / private dashboard data:** handled manually via
  https://tokenbel.info/contacts/ (email `admin@tokenbel.info`, Telegram
  https://t.me/tokenbel).

Full access model: https://tokenbel.info/auth.md

## Rate limits and etiquette

- Identify yourself with a descriptive `User-Agent` linking to the agent operator.
- Keep to roughly 1 request per second; back off exponentially on HTTP 429.
- Prefer markdown representations over scraping HTML.
- Respect https://tokenbel.info/robots.txt
- Do not POST to service endpoints during passive scanning.

## Error semantics

Public API errors are returned as JSON with an HTTP status that matches the
condition (`400`, `404`, `429`, `5xx`) and this body shape:

```json
{
  "error": {
    "code": "not_found",
    "message": "No security matches the requested ticker.",
    "hint": "Try a shorter ticker fragment or search by issuer name."
  }
}
```

Codes in use: `invalid_request`, `not_found`, `rate_limited`, `internal_error`.
HTML error pages are only produced for browser navigation; agents that send
`Accept: application/json` receive JSON, and `Accept: text/markdown` yields a
markdown body (including for 404 responses).

## Disclaimer

Information on TokenBel is provided for informational purposes only and is not an
investment recommendation.
