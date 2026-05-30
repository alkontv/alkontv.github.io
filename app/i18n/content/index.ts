import { en } from "./en";
import { ru } from "./ru";
import type { Lang } from "../langStore";
import type { Content, LocalizedText } from "../types";

export type { Content, LocalizedText };

export const dict: Record<Lang, Content> = { en, ru };

/** Резолв локализованной строки по языку. */
export const tx = (text: LocalizedText, lang: Lang): string => text[lang];
