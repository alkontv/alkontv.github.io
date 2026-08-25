import { describe, it, expect } from "vitest";
import { TIMELINE } from "../timeline";

const ASCII_SAFE = /^[A-Za-z0-9 \-&.,/()]+$/;

describe("таймлайн", () => {
  it("содержит пять вех", () => {
    expect(TIMELINE).toHaveLength(5);
  });

  it("годы идут по возрастанию", () => {
    const years = TIMELINE.map((e) => Number(e.year));
    expect(years).toEqual([...years].sort((a, b) => a - b));
  });

  it("EN-тексты безопасны для шрифта 3D-сцены", () => {
    TIMELINE.forEach((e) => {
      expect(e.title.en).toMatch(ASCII_SAFE);
      expect(e.subtitle.en).toMatch(ASCII_SAFE);
    });
  });

  it("заголовки короткие — иначе переносятся в 3D", () => {
    TIMELINE.forEach((e) => {
      expect(e.title.ru.length).toBeLessThanOrEqual(20);
      expect(e.title.en.length).toBeLessThanOrEqual(20);
    });
  });
});
