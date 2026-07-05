import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const API_BASE = "https://hype.tokenbel.info";

export default defineTool({
  name: "search_securities",
  title: "Search Belarusian securities",
  description:
    "Search Belarusian tokens, shares and bonds by ticker or issuer name via the TokenBel public Hype API.",
  inputSchema: {
    query: z.string().min(1).describe("Ticker fragment or issuer name to search for."),
    limit: z
      .number()
      .int()
      .min(1)
      .max(50)
      .describe("Maximum number of results to return (1-50).")
      .default(10),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: async ({ query, limit }) => {
    const url = `${API_BASE}/search?q=${encodeURIComponent(query)}&limit=${limit}`;
    try {
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      const text = await res.text();
      if (!res.ok) {
        return {
          content: [{ type: "text", text: `Hype API error ${res.status}: ${text.slice(0, 500)}` }],
          isError: true,
        };
      }
      return { content: [{ type: "text", text }] };
    } catch (err) {
      return {
        content: [{ type: "text", text: `Request failed: ${(err as Error).message}` }],
        isError: true,
      };
    }
  },
});
