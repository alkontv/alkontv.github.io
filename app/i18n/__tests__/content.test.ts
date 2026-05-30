import { describe, it, expect } from "vitest";
import { en } from "../content/en";
import { ru } from "../content/ru";

// Рекурсивно собирает пути ключей объекта (массивы считаются листом).
function keyPaths(obj: unknown, prefix = ""): string[] {
  if (Array.isArray(obj) || typeof obj !== "object" || obj === null) {
    return [prefix];
  }
  return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) =>
    keyPaths(v, prefix ? `${prefix}.${k}` : k)
  );
}

describe("словари контента", () => {
  it("en и ru имеют одинаковый набор ключей", () => {
    expect(keyPaths(ru).sort()).toEqual(keyPaths(en).sort());
  });

  it("у окна ровно 6 слоганов в обоих языках", () => {
    expect(en.window.slogans).toHaveLength(6);
    expect(ru.window.slogans).toHaveLength(6);
  });
});
