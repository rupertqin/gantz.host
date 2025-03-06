// useFixedSizeStack.js
import { useState, useCallback } from "react";

class FixedSizeStack<T> {
  maxSize: number;
  items: T[];

  constructor(maxSize: number) {
    this.maxSize = maxSize;
    this.items = [];
  }

  push(element: T): void {
    if (this.items.length >= this.maxSize) {
      this.items.shift();
    }
    this.items.push(element);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  size(): number {
    return this.items.length;
  }
}

export function useFixedSizeStack<T>(maxSize: number) {
  const [stack] = useState(() => new FixedSizeStack<T>(maxSize));
  const [items, setItems] = useState<T[]>(stack.items);

  const push = useCallback(
    (element: T) => {
      stack.push(element);
      setItems([...stack.items]); // 触发组件更新
    },
    [stack]
  );

  const pop = useCallback(() => {
    const element = stack.pop();
    setItems([...stack.items]);
    return element;
  }, [stack]);

  return { items, push, pop, size: stack.size() };
}
