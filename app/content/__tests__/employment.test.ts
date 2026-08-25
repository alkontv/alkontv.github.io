import { describe, it, expect } from "vitest";
import { EMPLOYMENT } from "../employment";

const ASCII_SAFE = /^[A-Za-z0-9 \-&.,/()]+$/;

describe("опыт работы", () => {
  it("идёт в обратном хронологическом порядке — как в резюме", () => {
    const years = EMPLOYMENT.map((j) => Number(j.since));
    expect(years).toEqual([...years].sort((a, b) => b - a));
  });

  it("каждое место заполнено на обоих языках", () => {
    EMPLOYMENT.forEach((j) => {
      [j.company, j.role, j.period, j.summary].forEach((field) => {
        expect(field.ru.length).toBeGreaterThan(0);
        expect(field.en.length).toBeGreaterThan(0);
      });
      expect(j.since).toMatch(/^20\d\d$/);
    });
  });

  it("названия компаний безопасны для шрифта 3D-сцены", () => {
    // В сцене название рисуется шрифтом soria, где нет типографских символов.
    EMPLOYMENT.forEach((j) => expect(j.company.en).toMatch(ASCII_SAFE));
  });
});
