import { describe, it, expect, beforeEach, vi } from "vitest";
import { useLangStore, detectBrowserLang } from "../langStore";

describe("langStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useLangStore.setState({ lang: "en", chosen: false });
  });

  it("по умолчанию язык en", () => {
    expect(useLangStore.getState().lang).toBe("en");
  });

  it("setLang меняет язык", () => {
    useLangStore.getState().setLang("ru");
    expect(useLangStore.getState().lang).toBe("ru");
  });

  it("toggleLang переключает en <-> ru", () => {
    useLangStore.getState().toggleLang();
    expect(useLangStore.getState().lang).toBe("ru");
    useLangStore.getState().toggleLang();
    expect(useLangStore.getState().lang).toBe("en");
  });
});

describe("определение языка браузера", () => {
  it("русская локаль даёт ru", () => {
    vi.stubGlobal("navigator", { language: "ru-RU" });
    expect(detectBrowserLang()).toBe("ru");
  });

  it("любая другая локаль даёт en", () => {
    vi.stubGlobal("navigator", { language: "de-DE" });
    expect(detectBrowserLang()).toBe("en");
  });

  it("без navigator возвращает en и не падает", () => {
    vi.stubGlobal("navigator", undefined);
    expect(detectBrowserLang()).toBe("en");
  });
});

describe("флаг ручного выбора языка", () => {
  beforeEach(() => {
    localStorage.clear();
    useLangStore.setState({ lang: "en", chosen: false });
  });

  it("изначально не поднят", () => {
    expect(useLangStore.getState().chosen).toBe(false);
  });

  it("setLang поднимает флаг", () => {
    useLangStore.getState().setLang("ru");
    expect(useLangStore.getState().chosen).toBe(true);
    expect(useLangStore.getState().lang).toBe("ru");
  });

  it("toggleLang поднимает флаг", () => {
    useLangStore.getState().toggleLang();
    expect(useLangStore.getState().chosen).toBe(true);
    expect(useLangStore.getState().lang).toBe("ru");
  });
});
