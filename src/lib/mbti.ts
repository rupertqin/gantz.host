export interface MbtiType {
  type: string;
  category: string;
  name: string;
  functions: string[];
}

export interface Hexagram {
  name: string;
  symbol: string;
  meaning: string;
  description: string;
}

export class MbtiService {
  // 常量定义
  private static readonly ICHING_HEXAGRAMS: Record<string, Hexagram> = {
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

  private static readonly FUNC_CATEGORIES = {
    NT: "分析型 (NT)",
    NF: "外交型 (NF)",
    SJ: "守卫型 (SJ)",
    SP: "探索型 (SP)",
  };

  private static readonly IE = ["I", "E"];
  private static readonly INPUT = ["N", "S"];
  private static readonly OUTPUT = ["T", "F"];
  private static readonly JP = ["J", "P"];

  private static readonly functionPositions = [
    "主导功能",
    "辅助功能",
    "第三功能",
    "劣势功能",
    "对立功能",
    "批判性父母",
    "欺骗性角色",
    "恶魔功能",
  ];

  private static readonly categoryColors = {
    NT: "bg-blue-100",
    NF: "bg-green-100",
    SJ: "bg-yellow-100",
    SP: "bg-red-100",
  };

  // 公共访问方法
  public static getHexagrams(): Record<string, Hexagram> {
    return this.ICHING_HEXAGRAMS;
  }

  public static getCategories(): Record<string, string> {
    return this.FUNC_CATEGORIES;
  }

  public static getFunctionPositions(): string[] {
    return this.functionPositions;
  }

  public static getCategoryColors(): Record<string, string> {
    return this.categoryColors;
  }

  // 核心功能方法
  private static getOpposite(key: string): string {
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

  /**
   * 判断布尔值中true的个数是否为偶数
   * @param booleans 任意数量的布尔值
   * @returns true表示true的个数为偶数，false表示true的个数为奇数
   */
  private static countBoolOddeven(...booleans: boolean[]): boolean {
    return (
      booleans.reduce((count, value) => count + (value ? 1 : 0), 0) % 2 === 0
    );
  }

  private static getFunctionNameByType([
    ie,
    input,
    output,
    jp,
  ]: string[]): string[] {
    const halfLen = 4;
    const functions = new Array(halfLen * 2);
    const IS_I = this.IE[0] === ie;
    const IS_J = this.JP[0] === jp;

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

  public static genFuncs(): MbtiType[] {
    const result: MbtiType[] = [];
    for (const ie of this.IE) {
      for (const input of this.INPUT) {
        for (const output of this.OUTPUT) {
          for (const jp of this.JP) {
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
              mbtiType.name = this.FUNC_CATEGORIES.NT;
            } else if (mbtiType.type.includes("NF")) {
              mbtiType.category = "NF";
              mbtiType.name = this.FUNC_CATEGORIES.NF;
            } else if (/S*J/.test(mbtiType.type)) {
              mbtiType.category = "SJ";
              mbtiType.name = this.FUNC_CATEGORIES.SJ;
            } else {
              mbtiType.category = "SP";
              mbtiType.name = this.FUNC_CATEGORIES.SP;
            }
            result.push(mbtiType);
          }
        }
      }
    }

    return result.sort((a, b) => a.category.localeCompare(b.category));
  }

  // 获取所有MBTI类型
  public static getAllTypes(): MbtiType[] {
    return this.genFuncs();
  }

  // 根据类型获取MBTI信息
  public static getTypeByCode(code: string): MbtiType | undefined {
    return this.getAllTypes().find((type) => type.type === code);
  }

  // 获取功能的卦象信息
  public static getHexagramByFunction(func: string): Hexagram | undefined {
    return this.ICHING_HEXAGRAMS[func];
  }

  // 获取类型的颜色
  public static getColorByCategory(category: string): string {
    return (
      this.categoryColors[category as keyof typeof this.categoryColors] || ""
    );
  }

  // 在 MbtiService 类中添加
  static getColorByFunction(func: string, isSelected: boolean = false): string {
    const functionType = func.charAt(0);
    const isExtroverted = func.charAt(1) === "e";

    // 选中状态的颜色
    if (isSelected) {
      switch (functionType) {
        case "T":
          return isExtroverted ? "bg-blue-600" : "bg-blue-400";
        case "F":
          return isExtroverted ? "bg-green-600" : "bg-green-400";
        case "S":
          return isExtroverted ? "bg-yellow-600" : "bg-yellow-400";
        case "N":
          return isExtroverted ? "bg-purple-600" : "bg-purple-400";
        default:
          return "bg-gray-500";
      }
    }

    // 未选中状态的浅色
    switch (functionType) {
      case "T":
        return isExtroverted ? "bg-blue-100" : "bg-blue-50";
      case "F":
        return isExtroverted ? "bg-green-100" : "bg-green-50";
      case "S":
        return isExtroverted ? "bg-yellow-100" : "bg-yellow-50";
      case "N":
        return isExtroverted ? "bg-purple-100" : "bg-purple-50";
      default:
        return "bg-gray-50";
    }
  }
}

// 导出默认实例
export const mbtiService = new MbtiService();
