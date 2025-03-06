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
import "../styles/global.css";
import { Bagua } from "@/components/Bagua";
import { useFixedSizeStack } from "@/lib/hooks";
import {
  ICHING_HEXAGRAMS,
  mbtiTypes,
  functionPositions,
  categoryColors,
  MbtiService,
} from "@/components/constant/mbti";
import type { MbtiType } from "@/components/constant/mbti";

export default function MBTIIChingTable() {
  const [selectedType, setSelectedType] = useState<MbtiType>(mbtiTypes[0]);
  const { items, push, pop, size } = useFixedSizeStack(2);

  function chooseFunction(func: string) {
    if (!items.includes(func)) push(func);
  }

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
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">
          认知功能与易经卦象对应：{items.join(" ")}
        </h2>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.entries(ICHING_HEXAGRAMS).map(([func, hexagram]) => (
            <li
              key={func}
              className="flex items-center space-x-2 px-2 py-1 rounded bg-gray-100"
              onClick={() => chooseFunction(func)}
            >
              <span className="font-bold">{func}:</span>
              <span>{hexagram.symbol}</span>
              <span>{hexagram.name}</span>
              <span>({hexagram.meaning})</span>
            </li>
          ))}
        </ul>
      </div>
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
                className={
                  categoryColors[type.category as keyof typeof categoryColors]
                }
                onClick={() => setSelectedType(type)}
              >
                <TableCell className="font-medium text-center">
                  {type.type}
                </TableCell>
                {type.functions.map((func, index) => (
                  <TableCell key={index} className="text-center">
                    <span
                      className="ml-1"
                      title={`${
                        ICHING_HEXAGRAMS[func as keyof typeof ICHING_HEXAGRAMS]
                          .name
                      } (${
                        ICHING_HEXAGRAMS[func as keyof typeof ICHING_HEXAGRAMS]
                          .meaning
                      })`}
                    >
                      {func}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
