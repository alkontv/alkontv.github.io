import { describe, it, expect } from "vitest";
import { STATS, STATUS_LABEL, FORMAT_LABEL } from "../stats";

// EN-строки уходят в 3D-сцену, где шрифт soria не содержит типографских
// символов. Ограничение продублировано тестом, чтобы не всплыло на проде.
const ASCII_SAFE = /^[A-Za-z0-9 \-&.,/()]+$/;

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
    expect(STATS.sinceYear).toBe(2023);
  });
});

describe("метки статусов", () => {
  it("подписаны только завершённые статусы", () => {
    // Ряд бейджей «БЕТА / MVP / МАКЕТ» читается клиентом как «не доводит
    // до конца». Незавершённое просто не выводится — врать не заставляет,
    // но и слабость не рекламирует.
    expect(Object.keys(STATUS_LABEL).sort()).toEqual(["production", "shipped"]);
  });

  it("EN-метки безопасны для шрифта 3D-сцены", () => {
    for (const label of Object.values(STATUS_LABEL)) {
      expect(label!.en).toMatch(ASCII_SAFE);
    }
  });
});

describe("метки форматов", () => {
  it("покрывают все семь форматов", () => {
    expect(Object.keys(FORMAT_LABEL).sort()).toEqual(
      ["admin", "ai", "backend", "mobile", "payments", "telegram", "web"]
    );
  });
});
