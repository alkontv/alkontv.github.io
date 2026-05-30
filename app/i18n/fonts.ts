import type { Lang } from "./langStore";

// EN сохраняет оригинальные шрифты форка; RU использует JetBrains Mono
// (полная кириллица, инженерная эстетика). Пути — относительно домена;
// латинские шрифты лежат в public/, кириллические — в public/fonts/.
export const DISPLAY_FONT: Record<Lang, string> = {
  en: "./soria-font.ttf",
  ru: "./fonts/JetBrainsMono-ExtraBold.ttf",
};

export const ACCENT_FONT: Record<Lang, string> = {
  en: "./Vercetti-Regular.woff",
  ru: "./fonts/JetBrainsMono-Regular.ttf",
};
