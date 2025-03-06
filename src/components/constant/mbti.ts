export const ICHING_HEXAGRAMS = {
  Te: {
    name: "乾",
    symbol: "☰",
    meaning: "天、刚健、主动",
    description: "逻辑分析、规则制定、目标导向",
  },
  Fi: {
    name: "坤",
    symbol: "☷",
    meaning: "地、包容、柔顺",
    description: "内在价值观、情感独立性、自我反思",
  },
  Ni: {
    name: "坎",
    symbol: "☵",
    meaning: "水、危险、深邃",
    description: "未来预见、深层洞察、象征性思维",
  },
  Ne: {
    name: "离",
    symbol: "☲",
    meaning: "火、灵感、发散",
    description: "可能性探索、联想跳跃、创意激发",
  },
  Se: {
    name: "震",
    symbol: "☳",
    meaning: "雷、行动、冲击",
    description: "即时体验、感官刺激、现实关注",
  },
  Ti: {
    name: "艮",
    symbol: "☶",
    meaning: "山、静止、内省",
    description: "逻辑内省、概念分析、系统构建",
  },
  Si: {
    name: "巽",
    symbol: "☴",
    meaning: "风、渗透、记忆",
    description: "经验积累、传统遵循、细节感知",
  },
  Fe: {
    name: "兑",
    symbol: "☱",
    meaning: "泽、和谐、联结",
    description: "人际协调、情感共鸣、社会适应性",
  },
};

export const FUNC_CATEGORIES = {
  NT: "分析型 (NT)",
  NF: "外交型 (NF)",
  SJ: "守卫型 (SJ)",
  SP: "探索型 (SP)",
};

export const IE = ["I", "E"];
export const INPUT = ["N", "S"];
export const OUTPUT = ["T", "F"];
export const JP = ["J", "P"];

export const functionPositions = [
  "主导功能",
  "辅助功能",
  "第三功能",
  "劣势功能",
  "对立功能",
  "批判性父母",
  "欺骗性角色",
  "恶魔功能",
];

export const categoryColors = {
  NT: "bg-blue-100",
  NF: "bg-green-100",
  SJ: "bg-yellow-100",
  SP: "bg-red-100",
};

export interface MbtiType {
  type: string;
  category: string;
  name: string;
  functions: string[];
}

export class MbtiService {
  static getOpposite(key: string): string {
    const opposite: { [key: string]: string } = {
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

  static countBoolOddeven(...arg: boolean[]): boolean {
    let count = 0;
    for (let i = 0; i < arg.length; i++) {
      if (arg[i]) {
        count++;
      }
    }
    return count % 2 === 0;
  }

  static getFunctionNameByType([ie, input, output, jp]: string[]): string[] {
    const halfLen = 4;
    const functions = new Array(halfLen * 2);
    const IS_I = IE[0] === ie;
    const IS_J = JP[0] === jp;

    for (let i = 0; i < halfLen; i++) {
      // 每两次交换一次输入输出, 这个循环里，交换的值保留到下一次循环
      if (i % 2 !== 0) {
        [input, output] = [output, input];
      }

      // ie jp 共同影响主副功能，且其余功能的位置
      let mainfn = this.countBoolOddeven(IS_I, IS_J) ? input : output;

      // 34 使用相反功能
      if (i > 1) {
        mainfn = this.getOpposite(mainfn);
      }

      // 功能位置的内外倾由主内外倾决定， 1 2 5 6 为内倾， 3 4 7 8 为外倾，也就是说，主副内外倾已然决定
      const _ie = i % 2 === 0 ? ie : this.getOpposite(ie);
      functions[i] = mainfn + _ie.toLowerCase();

      // 根据阳面计算阴面功能
      functions[i + halfLen] = mainfn + this.getOpposite(_ie).toLowerCase();
    }

    return functions;
  }

  static genFuncs(): MbtiType[] {
    const result: MbtiType[] = [];
    for (const ie of IE) {
      for (const input of INPUT) {
        for (const output of OUTPUT) {
          for (const jp of JP) {
            const mbtiType: MbtiType = {
              type: "",
              category: "",
              name: "",
              functions: [],
            };
            mbtiType.type = [ie, input, output, jp].join("");
            mbtiType.functions = this.getFunctionNameByType(
              mbtiType.type.split("")
            );
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
}

export const mbtiTypes = MbtiService.genFuncs();
mbtiTypes.sort((a, b) => a.category.localeCompare(b.category));
