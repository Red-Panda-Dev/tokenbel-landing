import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_site_info",
  title: "Get TokenBel site info",
  description:
    "Return basic information about TokenBel: description, main sections, and key external URLs (dashboard, API, wiki).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            name: "TokenBel",
            description:
              "Агрегатор инвестиционных токенов и ценных бумаг Беларуси: каталог токенов и эмитентов, статистика вторичного рынка, аналитика доходности.",
            language: "ru-BY",
            urls: {
              landing: "https://tokenbel.info",
              dashboard: "https://dashboard.tokenbel.info",
              api: "https://hype.tokenbel.info",
              wiki: "https://wiki.tokenbel.info",
              rss: "https://tokenbel.info/rss/",
              faq: "https://tokenbel.info/faq/",
              pricing: "https://tokenbel.info/pricing/",
              statistics: "https://tokenbel.info/statistics/secondmarket/",
            },
          },
          null,
          2,
        ),
      },
    ],
  }),
});
