import type { LocalizedText } from "@i18n";

/** Чем закрыт кейс — используется для фильтра и чипов на /cases. */
export type CaseFormat =
  | "mobile"
  | "web"
  | "telegram"
  | "backend"
  | "ai"
  | "admin"
  | "payments";

export type DiagramId = "sos" | "escrow" | "vpn" | "ai-intake";

export interface CaseStudy {
  /** Якорь на /cases и цель ссылки из 3D-плитки. */
  id: string;
  industry: LocalizedText;
  formats: CaseFormat[];
  /** Обезличенное имя-описание. name.en уходит в 3D — только ASCII. */
  name: LocalizedText;
  /** Одна строка для 3D-плитки и подзаголовка карточки. */
  tagline: LocalizedText;
  /** Что клиент получил как бизнес-механику, а не как строчки кода. */
  impact: LocalizedText;
  /** Что было на мне в этом проекте. */
  role: LocalizedText;
  problem: LocalizedText;
  solution: LocalizedText[];
  /** Инженерная соль: почему кейс стоит показывать. */
  highlight: LocalizedText;
  stack: string[];
  integrations: string[];
  scale?: { loc?: number; files?: number };
  diagram?: DiagramId;
  /** Попадает в 3D-карусель. Ровно шесть кейсов — под раскладку ProjectsCarousel. */
  featured: boolean;
}

export interface TimelineEntry {
  year: string;
  title: LocalizedText;
  subtitle: LocalizedText;
}
