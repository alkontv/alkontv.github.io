import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Lang = "en" | "ru";

/** Язык браузера при первом визите. Вне браузера — en. */
export const detectBrowserLang = (): Lang => {
  if (typeof navigator === "undefined" || !navigator?.language) return "en";
  return navigator.language.toLowerCase().startsWith("ru") ? "ru" : "en";
};

interface LangStore {
  lang: Lang;
  /** Пользователь выбрал язык руками — больше не переопределяем автоматикой. */
  chosen: boolean;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

export const useLangStore = create<LangStore>()(
  persist(
    (set, get) => ({
      // На сервере при статическом экспорте всегда en — иначе разъедется
      // гидратация. Настоящий язык подставляется после регидратации стора.
      lang: "en",
      chosen: false,
      setLang: (lang) => set({ lang, chosen: true }),
      toggleLang: () =>
        set({ lang: get().lang === "en" ? "ru" : "en", chosen: true }),
    }),
    {
      name: "lang-storage",
      partialize: (state) => ({ lang: state.lang, chosen: state.chosen }),
      onRehydrateStorage: () => (state) => {
        // Язык руками не выбирали — берём из браузера.
        if (state && !state.chosen) {
          state.lang = detectBrowserLang();
        }
      },
    }
  )
);
