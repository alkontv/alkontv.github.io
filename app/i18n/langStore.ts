import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Lang = "en" | "ru";

interface LangStore {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

export const useLangStore = create<LangStore>()(
  persist(
    (set, get) => ({
      lang: "en",
      setLang: (lang) => set({ lang }),
      toggleLang: () => set({ lang: get().lang === "en" ? "ru" : "en" }),
    }),
    {
      name: "lang-storage",
      partialize: (state) => ({ lang: state.lang }),
    }
  )
);
