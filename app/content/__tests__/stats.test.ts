import { describe, it, expect } from "vitest";
import { STATS, STATUS_LABEL, FORMAT_LABEL } from "../stats";

// EN-строки уходят в 3D-сцену, где шрифт soria не содержит типографских
// символов. Ограничение продублировано тестом, чтобы не всплыло на проде.
const ASCII_SAFE = /^[A-Za-z0-9 \-&.,/()]+$/;

describe("сводные цифры", () => {
  it("совпадают с логом платежей хранилища", () => {
    expect(STATS.revenueRub).toBe(2234980);
    expect(STATS.paidProjects).toBe(18);
    expect(STATS.repos).toBe(52);
    expect(STATS.mentees).toBe(5);
  });
});

describe("метки статусов", () => {
  it("покрывают все пять статусов", () => {
    expect(Object.keys(STATUS_LABEL).sort()).toEqual(
      ["active", "beta", "mvp", "production", "shipped"]
    );
  });

  it("EN-метки безопасны для шрифта 3D-сцены", () => {
    for (const label of Object.values(STATUS_LABEL)) {
      expect(label.en).toMatch(ASCII_SAFE);
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
