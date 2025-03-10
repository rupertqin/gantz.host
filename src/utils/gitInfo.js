import { execSync } from "child_process";

export function getGitHash() {
  try {
    // 尝试获取短版本的 git hash
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch (error) {
    // 如果失败，返回一个默认值
    return "development";
  }
}
