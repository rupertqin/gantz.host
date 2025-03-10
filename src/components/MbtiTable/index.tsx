import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import "@/styles/global.css";
import { Bagua } from "@/components/Bagua";
import { useFixedSizeStack } from "@/lib/hooks";
import { MbtiService } from "@/lib/mbti";
import { Hexagrams } from "./Hexagrams";
import type { MbtiType } from "@/lib/mbti";

export default function MBTIIChingTable() {
  const [selectedType, setSelectedType] = useState<MbtiType>(
    MbtiService.getAllTypes()[0]
  );
  const { items, push, remove } = useFixedSizeStack<string>(2);

  function chooseFunction(func: string) {
    if (!items.includes(func)) {
      push(func);
    } else {
      remove(func);
    }
  }

  const categories = MbtiService.getCategories();
  const functionPositions = MbtiService.getFunctionPositions();
  const categoryColors = MbtiService.getCategoryColors();
  const mbtiTypes = MbtiService.getAllTypes();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">MBTI认知功能与易经64卦对应表</h1>
      <p className="mb-6">
        此表展示了16种MBTI类型的八个认知功能、它们在意识中的位置，以及与易经64卦的对应关系。
        功能的顺序从左到右代表了它们在意识中的重要性和使用频率，从最常用的主导功能到最不常用的恶魔功能。
        每个认知功能都与一个易经卦象相对应，反映了它们在中国传统哲学中的深层含义。
      </p>
      <Bagua type={selectedType} />
      <div className="mb-4 flex flex-wrap gap-2">
        {Object.entries(categoryColors).map(([category, color]) => (
          <div key={category} className={`${color} px-2 py-1 rounded `}>
            {category}
          </div>
        ))}
      </div>

      <Hexagrams selectedFunctions={items} onFunctionSelect={chooseFunction} />

      <div className="overflow-x-auto">
        <Table>
          <TableCaption>16种MBTI类型的认知功能与易经卦象对应</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-center">类型</TableHead>
              {functionPositions.map((position, index) => (
                <TableHead key={index} className="w-[120px] text-center">
                  {position}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {mbtiTypes.map((type) => (
              <TableRow
                key={type.type}
                data-state={type.type === selectedType.type ? "selected" : ""}
                className={MbtiService.getColorByCategory(type.category)}
                onClick={() => setSelectedType(type)}
              >
                <TableCell className="font-medium text-center">
                  {type.type}
                </TableCell>
                {type.functions.map((func, index) => {
                  const hexagram = MbtiService.getHexagramByFunction(func);
                  const isSelected = items.includes(func);
                  const highlightClass = isSelected
                    ? `bg-opacity-25 ${MbtiService.getColorByFunction(
                        func,
                        true
                      )}`
                    : "";

                  return (
                    <TableCell
                      key={index}
                      className={`text-center ${highlightClass}`}
                    >
                      <span
                        className="ml-1"
                        title={
                          hexagram
                            ? `${hexagram.name} (${hexagram.meaning})`
                            : ""
                        }
                      >
                        {func}
                      </span>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
