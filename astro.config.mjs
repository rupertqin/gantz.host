// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import compression from "vite-plugin-compression";

// Get environment variable or default
const gitHash = process.env.PUBLIC_GIT_HASH || "dev";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      tailwindcss(),
      compression({
        ext: ".gz", // 生成 .gz 格式
        algorithm: "gzip", // 压缩算法
        deleteOriginFile: false, // 保留原始文件
      }),
    ],
    define: {
      "import.meta.env.PUBLIC_GIT_HASH": JSON.stringify(gitHash),
      "import.meta.env.SITE_NAME": JSON.stringify("秦项科技"),
    },
  },
});
