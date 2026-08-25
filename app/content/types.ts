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

/** Статус берётся из карточки хранилища и не завышается. */
export type CaseStatus =
  | "shipped"
  | "production"
  | "beta"
  | "active"
  | "mvp"
  /** Каркас и интерфейс без прикладной логики. Отдельно от mvp намеренно:
   *  MVP обещает работающий минимум, макет — не обещает. */
  | "prototype";

export type DiagramId = "sos" | "escrow" | "vpn" | "ai-intake";

export interface CaseStudy {
  /** Якорь на /cases и цель ссылки из 3D-плитки. */
  id: string;
  industry: LocalizedText;
  formats: CaseFormat[];
  /** Обезличенное имя-описание. name.en уходит в 3D — только ASCII. */
  name: LocalizedText;
  status: CaseStatus;
  /** Одна строка для 3D-плитки и подзаголовка карточки. */
  tagline: LocalizedText;
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
