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

  const functionPositions = MbtiService.getFunctionPositions();
  const mbtiTypes = MbtiService.getAllTypes();

  return (
    <div className="container mx-auto py-10">
      <Bagua type={selectedType} />
      <Hexagrams selectedFunctions={items} onFunctionSelect={chooseFunction} />
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>16种MBTI类型的认知功能与功能排位</TableCaption>
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
