import { describe, it, expect } from "vitest";
import { CASES, FEATURED_CASES, getCase } from "../cases";

// EN-имена featured-кейсов рисуются в 3D шрифтом soria, где нет
// типографских символов. См. коммит 9524d34.
const ASCII_SAFE = /^[A-Za-z0-9 \-&.,/()]+$/;

describe("каталог кейсов", () => {
  it("содержит ровно 14 кейсов", () => {
    expect(CASES).toHaveLength(14);
  });

  it("идентификаторы уникальны", () => {
    const ids = CASES.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("ровно шесть кейсов помечены featured", () => {
    expect(FEATURED_CASES).toHaveLength(6);
  });

  it("getCase находит кейс по идентификатору и возвращает undefined для чужого", () => {
    expect(getCase("safety")?.id).toBe("safety");
    expect(getCase("нет-такого")).toBeUndefined();
  });
});

describe("целостность кейса", () => {
  it.each(CASES.map((c) => [c.id, c] as const))(
    "%s заполнен на обоих языках",
    (_id, c) => {
      expect(c.name.ru.length).toBeGreaterThan(0);
      expect(c.name.en.length).toBeGreaterThan(0);
      expect(c.tagline.ru.length).toBeGreaterThan(0);
      expect(c.tagline.en.length).toBeGreaterThan(0);
      expect(c.problem.ru.length).toBeGreaterThan(0);
      expect(c.problem.en.length).toBeGreaterThan(0);
      expect(c.highlight.ru.length).toBeGreaterThan(0);
      expect(c.highlight.en.length).toBeGreaterThan(0);
    }
  );

  it.each(CASES.map((c) => [c.id, c] as const))(
    "%s имеет формат, стек и решение",
    (_id, c) => {
      expect(c.formats.length).toBeGreaterThan(0);
      expect(c.stack.length).toBeGreaterThan(0);
      expect(c.solution.length).toBeGreaterThanOrEqual(3);
      c.solution.forEach((s) => {
        expect(s.ru.length).toBeGreaterThan(0);
        expect(s.en.length).toBeGreaterThan(0);
      });
    }
  );

  it.each(CASES.map((c) => [c.id, c.name.en] as const))(
    "%s имеет EN-имя, безопасное для шрифта 3D-сцены",
    (_id, nameEn) => {
      expect(nameEn).toMatch(ASCII_SAFE);
    }
  );
});

describe("обезличивание", () => {
  // Названия, которые не должны просочиться ни в один кейс.
  const FORBIDDEN = [
    "Бим", "Zentry", "LegaSea", "Amber", "Оберегон", "Iren", "Ирэн",
    "SnackPack", "Funride", "hy Bakery", "hy_bakery", "Tems", "DoubleFit",
    "1venok", "ПодРаботкин", "PodRabotkin", "Soul Software", "GoodJobBali",
    "oberegon", "zentry",
  ];

  it("ни одно название продукта или клиента не встречается в текстах", () => {
    const haystack = JSON.stringify(CASES);
    const found = FORBIDDEN.filter((word) => haystack.includes(word));
    expect(found).toEqual([]);
  });
});

describe("гонорары", () => {
  it("ни в одном кейсе нет суммы", () => {
    // Клиент, увидевший гонорар рядом с кейсом, получает якорь на прайс.
    const haystack = JSON.stringify(CASES);
    expect(haystack).not.toContain("budget");
    CASES.forEach((c) => {
      expect(c as unknown as Record<string, unknown>).not.toHaveProperty("budget");
    });
  });
});
