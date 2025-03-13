// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import customCompression from "./scripts/gz-compression-integration.js";

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
  integrations: [
    customCompression({
      fileExtensions: [".html", ".js", ".css", ".svg", ".txt", ".xml"], // 需要压缩的文件类型
      threshold: 512, // 文件大小阈值（字节），只有超过 1KB 的文件才会被压缩
      algorithm: "gzip", // 压缩算法
      gzipOptions: { level: 9 }, // 最高压缩级别
    }),
  ],
});
