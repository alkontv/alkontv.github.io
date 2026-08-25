import type { LocalizedText } from "@i18n";

export interface Project {
  /** Обезличенное имя кейса. EN-версия рисуется шрифтом soria — только ASCII. */
  title: LocalizedText;
  /** Метка статуса вместо даты: даты из git недостоверны, см. §6.1 спеки. */
  status: LocalizedText;
  subtext: LocalizedText;
  /** Якорь на страницу кейсов. */
  url?: string;
}
