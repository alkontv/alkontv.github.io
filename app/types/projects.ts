import type { LocalizedText } from "@i18n";

export interface Project {
  /** Обезличенное имя кейса. EN-версия рисуется шрифтом soria — только ASCII. */
  title: LocalizedText;
  /** Мелкая подпись в плитке. Отрасль, а не статус: она есть у каждого кейса
   *  и говорит клиенту больше, чем степень готовности. */
  caption: LocalizedText;
  subtext: LocalizedText;
  /** Якорь на страницу кейсов. */
  url?: string;
}
