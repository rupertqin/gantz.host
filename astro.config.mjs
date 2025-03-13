// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import compressor from "astro-compressor";

// Get environment variable or default
const gitHash = process.env.PUBLIC_GIT_HASH || "dev";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      tailwindcss(),
    ],
    define: {
      "import.meta.env.PUBLIC_GIT_HASH": JSON.stringify(gitHash),
      "import.meta.env.SITE_NAME": JSON.stringify("秦项科技"),
    },
  },
  integrations: [
    compressor({
      gzip: true,
      brotli: false, // 如果需要 brotli 压缩，可以设置为 true
      fileExtensions: ['.html', '.js', '.css', '.svg', '.txt', '.xml'], // 需要压缩的文件类型
    })
  ]
});
