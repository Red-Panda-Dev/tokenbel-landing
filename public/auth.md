# auth.md

This document describes how AI agents and automated clients access TokenBel data.
Version: 1.1 · Updated: 2026-08-19 · Contact: https://tokenbel.info/contacts/

## Audience

This document is addressed to autonomous agents (AI assistants, MCP clients, crawlers),
not to browser users. Humans sign in to the dashboard at
https://dashboard.tokenbel.info/ (sign-in page: https://tokenbel.info/login/).

## Resources

| Resource | URL | Auth |
| --- | --- | --- |
| Public website and markdown versions of pages | `https://tokenbel.info/` (see `/llms.txt`) | not required |
| MCP server (streamable-http) | `https://mcp.tokenbel.info/mcp` | not required (anonymous access) |
| MCP server card | `https://tokenbel.info/.well-known/mcp/server-card.json` | not required |
| AI catalog | `https://tokenbel.info/.well-known/ai-catalog.json` | not required |

## Authentication model

Public read-only resources (the website, markdown versions, and the MCP tools for
searching tokens, shares, bonds and issuers) are available **anonymously**: a bearer
token is neither required nor validated. If a client does send an `Authorization`
header, it is ignored.

OAuth Protected Resource Metadata is published at
`https://tokenbel.info/.well-known/oauth-protected-resource` and lists an
authorization server for clients that prefer an OAuth flow; it is not required for
public data.

## Registration / provisioning

Separate agent registration is not needed for public access. Registration is only
required for higher rate limits, commercial use, and private dashboard data; it is
handled by humans, not programmatically.

```json
{
  "agent_auth": {
    "skill": "https://isitagentready.com/.well-known/agent-skills/markdown-negotiation/SKILL.md",
    "register_uri": "https://tokenbel.info/contacts/",
    "identity_types_supported": ["anonymous"],
    "anonymous": {
      "credential_types_supported": ["none"],
      "claim_uri": "https://tokenbel.info/auth.md"
    },
    "methods": [
      {
        "type": "anonymous",
        "description": "Public credential-free access to the website, markdown versions of pages, and the MCP server.",
        "resource": "https://mcp.tokenbel.info/mcp",
        "credential_types_supported": ["none"],
        "bearer_methods_supported": [],
        "register_uri": "https://tokenbel.info/contacts/",
        "claim_uri": "https://tokenbel.info/auth.md"
      },
      {
        "type": "manual_provisioning",
        "description": "Request higher rate limits or access to private data: submit a request via the contacts page; terms and response are handled over email/Telegram.",
        "register_uri": "https://tokenbel.info/contacts/",
        "credential_types_supported": ["none"]
      }
    ]
  }
}
```

## Credential use

No credentials are issued or required for anonymous access: requests are sent without
an `Authorization` header. If a key is granted after manual review, it is passed as
`Authorization: Bearer <token>` over HTTPS, is never logged, and is never published in
a URL.

## Rate limits and etiquette

- Identify yourself with a clear `User-Agent` that links to the agent operator.
- Prefer markdown representations (`Accept: text/markdown` or `<path>/index.md`) over scraping HTML.
- Respect `robots.txt`: https://tokenbel.info/robots.txt
- Keep a reasonable pace: no more than ~1 request per second; back off exponentially on 429.
- Do not POST to service endpoints during passive scanning.
