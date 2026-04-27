// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import compressor from "astro-compressor";

// Get environment variable or default
const gitHash = process.env.PUBLIC_GIT_HASH || "dev";

// https://astro.build/config
export default defineConfig({
  output: "static",
  vite: {
    plugins: [tailwindcss()],
    define: {
      "import.meta.env.PUBLIC_GIT_HASH": JSON.stringify(gitHash),
      "import.meta.env.SITE_NAME": JSON.stringify("秦项科技"),
    },
  },
  integrations: [
    compressor({
      gzip: { level: 9 },
      brotli: true,
      zstd: false,
      fileExtensions: [
        ".html",
        ".css",
        ".svg",
        ".txt",
        ".xml",
        ".js",
        ".cjs",
        ".mjs",
        ".json",
      ],
    }),
  ],
});
