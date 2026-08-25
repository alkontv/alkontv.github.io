import { describe, it, expect } from "vitest";
import { CORE_STACK, STACK_GROUPS } from "../stack";

describe("основной стек", () => {
  it("остаётся коротким — иначе теряет смысл выделения", () => {
    expect(CORE_STACK.length).toBeLessThanOrEqual(20);
    expect(CORE_STACK.length).toBeGreaterThanOrEqual(12);
  });

  it("без повторов", () => {
    expect(new Set(CORE_STACK).size).toBe(CORE_STACK.length);
  });

  it("каждая позиция есть в тематических группах", () => {
    const all = new Set(STACK_GROUPS.flatMap((g) => g.items));
    const missing = CORE_STACK.filter((item) => !all.has(item));
    expect(missing).toEqual([]);
  });
});

describe("тематические группы", () => {
  it("внутри группы нет повторов", () => {
    STACK_GROUPS.forEach((g) => {
      expect(new Set(g.items).size).toBe(g.items.length);
    });
  });
});
