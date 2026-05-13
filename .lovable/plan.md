## Plan

Wrap the outbound `fetch` to the connector gateway in `supabase/functions/gsc/index.ts` in a try/catch so network failures return a proper CORS-enabled 502 instead of a bare 500.

### Change

In `supabase/functions/gsc/index.ts`, replace the final block:

```ts
const r = await fetch(url, { method, headers, body });
const text = await r.text();
return new Response(JSON.stringify({ status: r.status, body: text }), {
  status: 200,
  headers: { ...cors, "Content-Type": "application/json" },
});
```

with:

```ts
try {
  const r = await fetch(url, { method, headers, body });
  const text = await r.text();
  return new Response(JSON.stringify({ status: r.status, body: text }), {
    status: 200,
    headers: { ...cors, "Content-Type": "application/json" },
  });
} catch (error) {
  console.error("Gateway request failed:", error);
  return new Response(JSON.stringify({ error: "Gateway request failed" }), {
    status: 502,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}
```

### Notes

- Only file touched: `supabase/functions/gsc/index.ts`.
- Existing auth, JSON parsing, and per-action validation remain unchanged.
- `console.error` aids debugging via edge function logs without leaking error details to the client.
