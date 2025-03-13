// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Get environment variable or default
const gitHash = process.env.PUBLIC_GIT_HASH || "dev";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    define: {
      "import.meta.env.PUBLIC_GIT_HASH": JSON.stringify(gitHash),
      "import.meta.env.SITE_NAME": JSON.stringify("秦项科技"),
    },
  },
});
