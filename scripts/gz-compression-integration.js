// custom-compression-integration.js
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

/**
 * 创建一个自定义的 Astro 集成，用于在构建后压缩文件
 * @param {Object} options - 压缩选项
 * @param {Array<string>} options.fileExtensions - 要压缩的文件扩展名
 * @param {number} options.threshold - 文件大小阈值（字节），只有超过此大小的文件才会被压缩
 * @param {string} options.algorithm - 压缩算法，支持 'gzip' 或 'brotli'
 * @param {Object} options.gzipOptions - gzip 压缩选项
 * @returns {import('astro').AstroIntegration}
 */
export default function createCompressionIntegration(options = {}) {
  const {
    fileExtensions = ['.html', '.js', '.css', '.svg', '.txt', '.xml'],
    threshold = 0, // 默认为 0，表示所有文件都会被压缩
    algorithm = 'gzip',
    gzipOptions = { level: 9 } // 最高压缩级别
  } = options;

  return {
    name: 'custom-compression-integration',
    hooks: {
      'astro:build:done': ({ dir }) => {
        console.log(`🔄 开始${algorithm}压缩文件...`);
        
        // 递归查找所有匹配的文件
        const findMatchingFiles = (directory) => {
          let matchingFiles = [];
          const items = fs.readdirSync(directory);
          
          for (const item of items) {
            const fullPath = path.join(directory, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
              matchingFiles = matchingFiles.concat(findMatchingFiles(fullPath));
            } else if (fileExtensions.some(ext => item.endsWith(ext))) {
              // 检查文件大小是否超过阈值
              if (stat.size > threshold) {
                matchingFiles.push(fullPath);
              }
            }
          }
          
          return matchingFiles;
        };

        const matchingFiles = findMatchingFiles(dir.pathname);
        let compressedCount = 0;
        let skippedCount = 0;
        
        for (const file of matchingFiles) {
          try {
            const content = fs.readFileSync(file);
            let compressed;
            
            if (algorithm === 'gzip') {
              compressed = zlib.gzipSync(content, gzipOptions);
              fs.writeFileSync(`${file}.gz`, compressed);
            } else if (algorithm === 'brotli') {
              compressed = zlib.brotliCompressSync(content);
              fs.writeFileSync(`${file}.br`, compressed);
            }
            
            const originalSize = content.length;
            const compressedSize = compressed.length;
            const ratio = ((1 - compressedSize / originalSize) * 100).toFixed(1);
            
            console.log(`✅ 已压缩: ${path.relative(dir.pathname, file)} (${originalSize} → ${compressedSize} 字节, 减少 ${ratio}%)`);
            compressedCount++;
          } catch (error) {
            console.error(`❌ 压缩失败 ${path.relative(dir.pathname, file)}:`, error);
            skippedCount++;
          }
        }
        
        console.log(`✨ 压缩完成! 共压缩 ${compressedCount} 个文件, 跳过 ${skippedCount} 个文件`);
      }
    }
  };
}
