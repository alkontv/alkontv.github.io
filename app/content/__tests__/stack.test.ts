import { describe, it, expect } from "vitest";
import { STACK_GROUPS, txItem } from "../stack";

describe("стек", () => {
  it("внутри группы нет повторов", () => {
    STACK_GROUPS.forEach((g) => {
      const names = g.items.map((i) => txItem(i, "ru"));
      expect(new Set(names).size).toBe(names.length);
    });
  });

  it("в английской версии нет кириллицы", () => {
    // Список технологий языконезависим по форме, но часть позиций —
    // это понятия, а не имена. Непереведённое утекало в английское резюме.
    const leaked = STACK_GROUPS.flatMap((g) => g.items)
      .map((i) => txItem(i, "en"))
      .filter((name) => /[А-Яа-яЁё]/.test(name));
    expect(leaked).toEqual([]);
  });

  it("одна технология не значится в двух группах сразу", () => {
    const all = STACK_GROUPS.flatMap((g) => g.items).map((i) => txItem(i, "ru"));
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
