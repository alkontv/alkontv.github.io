import { describe, it, expect } from "vitest";
import { STATS, FORMAT_LABEL } from "../stats";

describe("сводные цифры", () => {
  it("не содержат ни выручки, ни числа репозиториев, ни учеников", () => {
    // Сумма гонорара даёт клиенту якорь на прайс и сбивает ставку;
    // репозитории и ученики ничего ему не говорят. Тест не даёт вернуть.
    const keys = Object.keys(STATS);
    expect(keys).not.toContain("revenueRub");
    expect(keys).not.toContain("paidProjects");
    expect(keys).not.toContain("repos");
    expect(keys).not.toContain("mentees");
  });

  it("состоят из того, что отвечает на вопрос «справится ли он»", () => {
    expect(STATS.apps).toBe(40);
    expect(STATS.markets).toBe(4);
    expect(STATS.sinceYear).toBe(2022);
  });
});

describe("метки форматов", () => {
  it("покрывают все семь форматов", () => {
    expect(Object.keys(FORMAT_LABEL).sort()).toEqual(
      ["admin", "ai", "backend", "mobile", "payments", "telegram", "web"]
    );
  });
});
