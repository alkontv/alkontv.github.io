import { useLangStore } from "./langStore";
import { dict } from "./content";
import type { Content } from "./types";

/** Возвращает словарь текущего языка. Использование: const t = useT(); t.hero.title */
export const useT = (): Content => dict[useLangStore((s) => s.lang)];
