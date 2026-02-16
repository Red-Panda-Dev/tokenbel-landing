import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { componentTagger } from "lovable-tagger";
import handlebars from "vite-plugin-handlebars";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    tailwindcss(),
    handlebars({
      partialDirectory: path.resolve(__dirname, "partials"),
    }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        contacts: path.resolve(__dirname, "contacts/index.html"),
        rss: path.resolve(__dirname, "rss/index.html"),
        faq: path.resolve(__dirname, "faq/index.html"),
        login: path.resolve(__dirname, "login/index.html"),
        statisticsSecondmarket: path.resolve(__dirname, "statistics/secondmarket/index.html"),
        "404": path.resolve(__dirname, "404/index.html"),
      },
    },
  },
}));
