import { describe, it, expect } from "vitest";
import { STACK_GROUPS } from "../stack";

describe("стек", () => {
  it("внутри группы нет повторов", () => {
    STACK_GROUPS.forEach((g) => {
      expect(new Set(g.items).size).toBe(g.items.length);
    });
  });

  it("одна технология не значится в двух группах сразу", () => {
    const all = STACK_GROUPS.flatMap((g) => g.items);
    const dupes = all.filter((item, i) => all.indexOf(item) !== i);
    expect([...new Set(dupes)]).toEqual([]);
  });

  it("каждая группа заполнена на обоих языках и непуста", () => {
    STACK_GROUPS.forEach((g) => {
      expect(g.label.ru.length).toBeGreaterThan(0);
      expect(g.label.en.length).toBeGreaterThan(0);
      expect(g.items.length).toBeGreaterThan(0);
    });
  });
});
