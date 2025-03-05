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

const IE = ["I", "E"];
const INPUT = ["N", "S"];
const OUTPUT = ["T", "F"];
const JP = ["J", "P"];

function idendity(key): any {
  return key;
}

function getOpposite(key: string): string {
  const opposite = {
    I: "E",
    E: "I",
    N: "S",
    S: "N",
    T: "F",
    F: "T",
    J: "P",
    P: "J",
  };
  return opposite[key];
}

function countBoolOddeven(...arg: boolean[]): boolean {
  let count = 0;
  for (let i = 0; i < arg.length; i++) {
    if (arg[i]) {
      count++;
    }
  }
  return count % 2 === 0;
}

function getFunctionNameByType([ie, input, output, jp]: string[]): string[] {
  const halfLen = 4;
  const functions = [];
  const IS_I = IE[0] === ie;
  const IS_J = JP[0] === jp;

  for (let i = 0; i < halfLen; i++) {
    // 每两次交换一次输入输出
    if (i % 2 !== 0) {
      [input, output] = [output, input];
    }

    // ie jp 共同影响主副功能，且其余功能的位置
    let mainfn = countBoolOddeven(IS_I, IS_J) ? input : output;

    // 34 使用相反功能
    mainfn = (i % halfLen < 2 ? idendity : getOpposite)(mainfn);

    // 功能位置的内外倾由主内外倾决定， 1 2 5 6 为内倾， 3 4 7 8 为外倾，也就是说，主副内外倾已然决定
    const _ie = (i % 2 === 0 ? idendity : getOpposite)(ie).toLowerCase();
    functions[i] = mainfn + _ie;

    // 根据阳面计算阴面功能
    if (i < halfLen) {
      functions[i + halfLen] =
        mainfn + getOpposite(_ie.toUpperCase()).toLowerCase();
    }
  }

  return functions;
}

function genFuncs() {
  const atoms = [IE, INPUT, OUTPUT, JP];

  const result = [];

  for (const ie of IE) {
    for (const input of INPUT) {
      for (const output of OUTPUT) {
        for (const jp of JP) {
          const mbtiType = {
            type: "",
            category: "",
            name: "",
            functions: [] as string[],
          };
          mbtiType.type = [ie, input, output, jp].join("");
          mbtiType.functions = getFunctionNameByType(mbtiType.type.split(""));
          if (mbtiType.type.includes("NT")) {
            mbtiType.category = "NT";
            mbtiType.name = "分析型 (NT)";
          } else if (mbtiType.type.includes("NF")) {
            mbtiType.category = "NF";
            mbtiType.name = "外交型 (NF)";
          } else if (/S*J/.test(mbtiType.type)) {
            mbtiType.category = "SJ";
            mbtiType.name = "守卫型 (SJ)";
          } else {
            mbtiType.category = "SP";
            mbtiType.name = "探索型 (SP)";
          }
          result.push(mbtiType);
        }
      }
    }
  }

  return result;
}

const mbtiTypes = genFuncs();
mbtiTypes.sort((a, b) => a.category.localeCompare(b.category));

const functionPositions = [
  "主导功能",
  "辅助功能",
  "第三功能",
  "劣势功能",
  "对立功能",
  "批判性父母",
  "欺骗性角色",
  "恶魔功能",
];

const categoryColors = {
  NT: "bg-blue-100",
  NF: "bg-green-100",
  SJ: "bg-yellow-100",
  SP: "bg-red-100",
};

const ichingHexagrams = {
  Ni: { name: "观卦", symbol: "䷓", meaning: "观察" },
  Ne: { name: "大过卦", symbol: "䷛", meaning: "创新" },
  Si: { name: "艮卦", symbol: "䷳", meaning: "稳定" },
  Se: { name: "震卦", symbol: "䷲", meaning: "行动" },
  Ti: { name: "离卦", symbol: "䷝", meaning: "明晰" },
  Te: { name: "乾卦", symbol: "䷀", meaning: "创造" },
  Fi: { name: "坤卦", symbol: "䷁", meaning: "接纳" },
  Fe: { name: "兑卦", symbol: "䷹", meaning: "喜悦" },
};

function say() {
  alert("func");
}

export default function MBTIIChingTable() {
  const [selectedType, setSelectedType] = useState(null);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">MBTI认知功能与易经64卦对应表</h1>
      <p className="mb-6">
        此表展示了16种MBTI类型的八个认知功能、它们在意识中的位置，以及与易经64卦的对应关系。
        功能的顺序从左到右代表了它们在意识中的重要性和使用频率，从最常用的主导功能到最不常用的恶魔功能。
        每个认知功能都与一个易经卦象相对应，反映了它们在中国传统哲学中的深层含义。
      </p>
      <div className="mb-4 flex flex-wrap gap-2">
        {Object.entries(categoryColors).map(([category, color]) => (
          <div key={category} className={`${color} px-2 py-1 rounded`}>
            {category}
          </div>
        ))}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">认知功能与易经卦象对应：</h2>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.entries(ichingHexagrams).map(([func, hexagram]) => (
            <li
              key={func}
              className="flex items-center space-x-2"
              onClick={() => {
                say();
              }}
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
              <TableHead className="w-[100px]">类型</TableHead>
              <TableHead className="w-[150px]">类别</TableHead>
              {functionPositions.map((position, index) => (
                <TableHead key={index} className="w-[120px]">
                  {position}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {mbtiTypes.map((type) => (
              <TableRow
                key={type.type}
                className={categoryColors[type.category]}
                onClick={() => setSelectedType(type)}
              >
                <TableCell className="font-medium">{type.type}</TableCell>
                <TableCell>{type.name}</TableCell>
                {type.functions.map((func, index) => (
                  <TableCell key={index}>
                    {func}
                    <span
                      className="ml-1"
                      title={`${ichingHexagrams[func].name} (${ichingHexagrams[func].meaning})`}
                    >
                      {ichingHexagrams[func].symbol}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Bagua type={selectedType} />
    </div>
  );
}
