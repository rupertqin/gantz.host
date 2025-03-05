import { useRef, useState, useEffect } from "react";
import { Stage, Layer, Circle, Path, Group, Text } from "react-konva";

export const Bagua = ({ type }) => {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const container: HTMLElement | null = containerRef.current;
    if (!container) return;
    setWidth(container.offsetWidth);
    setHeight(container.offsetWidth * (2 / 3));
  }, []);

  const centerY = height / 2;
  const radius = centerY * 0.7;
  const centerX = width / 2;

  const createYinYangPath = () => {
    const r = radius;
    const x = 0;
    const y = 0;
    return `
      M ${x} ${y - r}
      A ${r} ${r} 0 1 1 ${x} ${y + r}
      A ${r / 2} ${r / 2} 0 0 0 ${x} ${y}
      A ${r / 2} ${r / 2} 0 0 1 ${x} ${y - r}
      Z
    `;
  };

  // 创建八卦符号
  const createBaguaSymbol = (word: string, index: number) => {
    const angle = (index - 2) * 45;
    const distance = radius * 1.3;
    const x = centerX + Math.cos((angle * Math.PI) / 180) * distance;
    const y = centerY + Math.sin((angle * Math.PI) / 180) * distance;

    return (
      <Group key={index} x={x} y={y} rotation={angle}>
        <Text text={word} rotation={90} fontSize={24} y={-12} />
      </Group>
    );
  };

  return (
    <div ref={containerRef}>
      {containerRef.current && (
        <Stage width={width} height={height}>
          <Layer>
            <Path
              x={centerX}
              y={centerY}
              data={createYinYangPath()}
              fill="yellow"
            />
            <Path
              x={centerX}
              y={centerY}
              data={createYinYangPath()}
              fill="black"
              rotation={180}
            />
            <Circle
              x={centerX}
              y={centerY - radius / 2}
              radius={radius / 8}
              fill="black"
            />
            <Circle
              x={centerX}
              y={centerY + radius / 2}
              radius={radius / 8}
              fill="white"
            />
            {/* 添加八卦符号 */}
            {type.functions.map((fun: string, i: number) =>
              createBaguaSymbol(fun, i)
            )}
          </Layer>
        </Stage>
      )}
    </div>
  );
};
