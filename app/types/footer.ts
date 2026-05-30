import type { LocalizedText } from "@i18n";

export interface FooterLink {
  name: string;
  hoverText?: LocalizedText;
  url: string;
  // Если задано — ссылка зависит от языка (например, резюме EN/RU).
  urlByLang?: LocalizedText;
  icon: string;
}