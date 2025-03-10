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

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">
        认知功能与易经卦象对应：{selectedFunctions.join(" ")}
      </h2>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {Object.entries(hexagrams).map(([func, hexagram]) => {
          const isSelected = selectedFunctions.includes(func);
          const colorClass = `${MbtiService.getColorByFunction(
            func,
            isSelected
          )} ${isSelected ? "text-white" : ""}`;

          return (
            <li key={func} className="flex items-center space-x-2 px-2 py-1">
              <Button
                variant="ghost"
                className={`w-full ${colorClass} hover:bg-opacity-90 hover:text-inherit hover:border-current`}
                onClick={() => onFunctionSelect(func)}
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
