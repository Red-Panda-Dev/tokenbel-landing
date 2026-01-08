import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    tailwindcss(),
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
        auth: path.resolve(__dirname, "auth/index.html"),
        "404": path.resolve(__dirname, "404/index.html"),
      },
    },
  },
}));
