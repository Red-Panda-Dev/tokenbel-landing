import { defineMcp } from "@lovable.dev/mcp-js";
import getSiteInfo from "./tools/get-site-info";
import searchSecurities from "./tools/search-securities";

export default defineMcp({
  name: "tokenbel-mcp",
  title: "TokenBel MCP",
  version: "0.1.0",
  instructions:
    "Tools for TokenBel — Belarusian securities & tokens aggregator. Use `get_site_info` for platform overview and `search_securities` to look up tokens, shares or bonds by ticker or issuer.",
  tools: [getSiteInfo, searchSecurities],
});
