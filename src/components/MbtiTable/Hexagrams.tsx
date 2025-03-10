import { Button } from "@/components/ui/button";
import { MbtiService } from "@/lib/mbti";
import type { Hexagram } from "@/lib/mbti";

interface HexagramsProps {
  selectedFunctions: string[];
  onFunctionSelect: (func: string) => void;
}

export function Hexagrams({
  selectedFunctions,
  onFunctionSelect,
}: HexagramsProps) {
  const hexagrams = MbtiService.getHexagrams();

  // 根据功能获取对应的颜色
  function getColorForFunction(func: string): string {
    // 根据功能的第一个字母确定类别
    const functionType = func.charAt(0);
    if (functionType === "T") return "bg-blue-500 hover:bg-blue-600"; // 思考型
    if (functionType === "F") return "bg-green-500 hover:bg-green-600"; // 情感型
    if (functionType === "S") return "bg-yellow-500 hover:bg-yellow-600"; // 感觉型
    if (functionType === "N") return "bg-purple-500 hover:bg-purple-600"; // 直觉型
    return "bg-gray-500 hover:bg-gray-600"; // 默认
  }

  // 获取功能对应的浅色背景（未选中状态）
  function getLightColorForFunction(func: string): string {
    const functionType = func.charAt(0);
    if (functionType === "T") return "bg-blue-50 hover:bg-blue-100";
    if (functionType === "F") return "bg-green-50 hover:bg-green-100";
    if (functionType === "S") return "bg-yellow-50 hover:bg-yellow-100";
    if (functionType === "N") return "bg-purple-50 hover:bg-purple-100";
    return "";
  }

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">
        认知功能与易经卦象对应：{selectedFunctions.join(" ")}
      </h2>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {Object.entries(hexagrams).map(([func, hexagram]) => {
          const isSelected = selectedFunctions.includes(func);
          const colorClass = isSelected
            ? `${getColorForFunction(func)} text-white`
            : getLightColorForFunction(func);

          return (
            <li
              key={func}
              className="flex items-center space-x-2 px-2 py-1"
              onClick={() => onFunctionSelect(func)}
            >
              <Button
                variant={isSelected ? "default" : "outline"}
                className={`w-full ${colorClass}`}
              >
                <span className="font-bold">{func}:</span>
                <span>{hexagram.symbol}</span>
                <span>{hexagram.name}</span>
                <span>({hexagram.meaning})</span>
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
