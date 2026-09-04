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
      expect(c.impact.ru.length).toBeGreaterThan(0);
      expect(c.impact.en.length).toBeGreaterThan(0);
      expect(c.role.ru.length).toBeGreaterThan(0);
      expect(c.role.en.length).toBeGreaterThan(0);
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

  it.each(CASES.map((c) => [c.id, c.name] as const))(
    "%s назван коротко — длинное имя переносится в 3D-плитке",
    (_id, name) => {
      expect(name.ru.length).toBeLessThanOrEqual(26);
      expect(name.en.length).toBeLessThanOrEqual(26);
    }
  );

  it("имя кейса не повторяет его отрасль", () => {
    // Отрасль стоит строкой выше имени: дублирование выглядит как заминка.
    const same = CASES.filter(
      (c) => c.name.ru.toLowerCase() === c.industry.ru.toLowerCase()
    ).map((c) => c.id);
    expect(same).toEqual([]);
  });
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

describe("статусы", () => {
  it("ни один кейс не сообщает степень готовности", () => {
    // Ряд бейджей «БЕТА / MVP / МАКЕТ» читается клиентом как «не доводит
    // до конца» — вопрос, которого он не задавал.
    const haystack = JSON.stringify(CASES);
    expect(haystack).not.toContain("status");
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

describe("обложки", () => {
  it("указывают на webp в /covers", () => {
    CASES.filter((c) => c.cover).forEach((c) => {
      expect(c.cover).toMatch(/^\/covers\/[a-z0-9-]+\.webp$/);
    });
  });

  it("имя файла обложки совпадает с идентификатором кейса", () => {
    // иначе при переименовании кейса картинка молча отвяжется
    CASES.filter((c) => c.cover).forEach((c) => {
      expect(c.cover).toBe(`/covers/${c.id}.webp`);
    });
  });
});
