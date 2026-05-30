import { describe, it, expect, beforeEach } from "vitest";
import { useLangStore } from "../langStore";

describe("langStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useLangStore.setState({ lang: "en" });
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
