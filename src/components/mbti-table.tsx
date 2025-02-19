import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mbtiTypes = [
  {
    type: "INTJ",
    category: "分析型 (NT)",
    functions: ["Ni", "Te", "Fi", "Se", "Ne", "Ti", "Fe", "Si"],
  },
  {
    type: "INTP",
    category: "分析型 (NT)",
    functions: ["Ti", "Ne", "Si", "Fe", "Te", "Ni", "Se", "Fi"],
  },
  {
    type: "ENTJ",
    category: "分析型 (NT)",
    functions: ["Te", "Ni", "Se", "Fi", "Ti", "Ne", "Si", "Fe"],
  },
  {
    type: "ENTP",
    category: "分析型 (NT)",
    functions: ["Ne", "Ti", "Fe", "Si", "Ni", "Te", "Fi", "Se"],
  },
  {
    type: "INFJ",
    category: "外交型 (NF)",
    functions: ["Ni", "Fe", "Ti", "Se", "Ne", "Fi", "Te", "Si"],
  },
  {
    type: "INFP",
    category: "外交型 (NF)",
    functions: ["Fi", "Ne", "Si", "Te", "Fe", "Ni", "Se", "Ti"],
  },
  {
    type: "ENFJ",
    category: "外交型 (NF)",
    functions: ["Fe", "Ni", "Se", "Ti", "Fi", "Ne", "Si", "Te"],
  },
  {
    type: "ENFP",
    category: "外交型 (NF)",
    functions: ["Ne", "Fi", "Te", "Si", "Ni", "Fe", "Ti", "Se"],
  },
  {
    type: "ISTJ",
    category: "守卫型 (SJ)",
    functions: ["Si", "Te", "Fi", "Ne", "Se", "Ti", "Fe", "Ni"],
  },
  {
    type: "ISFJ",
    category: "守卫型 (SJ)",
    functions: ["Si", "Fe", "Ti", "Ne", "Se", "Fi", "Te", "Ni"],
  },
  {
    type: "ESTJ",
    category: "守卫型 (SJ)",
    functions: ["Te", "Si", "Ne", "Fi", "Ti", "Se", "Ni", "Fe"],
  },
  {
    type: "ESFJ",
    category: "守卫型 (SJ)",
    functions: ["Fe", "Si", "Ne", "Ti", "Fi", "Se", "Ni", "Te"],
  },
  {
    type: "ISTP",
    category: "探索型 (SP)",
    functions: ["Ti", "Se", "Ni", "Fe", "Te", "Si", "Ne", "Fi"],
  },
  {
    type: "ISFP",
    category: "探索型 (SP)",
    functions: ["Fi", "Se", "Ni", "Te", "Fe", "Si", "Ne", "Ti"],
  },
  {
    type: "ESTP",
    category: "探索型 (SP)",
    functions: ["Se", "Ti", "Fe", "Ni", "Si", "Te", "Fi", "Ne"],
  },
  {
    type: "ESFP",
    category: "探索型 (SP)",
    functions: ["Se", "Fi", "Te", "Ni", "Si", "Fe", "Ti", "Ne"],
  },
];

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
  "分析型 (NT)": "bg-blue-100",
  "外交型 (NF)": "bg-green-100",
  "守卫型 (SJ)": "bg-yellow-100",
  "探索型 (SP)": "bg-red-100",
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
              <span>{hexagram.symbol}YYY</span>
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
              >
                <TableCell className="font-medium">{type.type}</TableCell>
                <TableCell>{type.category}</TableCell>
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
    </div>
  );
}
