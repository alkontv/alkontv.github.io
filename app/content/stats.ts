import type { LocalizedText } from "@i18n";
import type { CaseFormat, CaseStatus } from "./types";

/**
 * Источник — лог платежей хранилища («Клиентские проекты») на 18.08.2026.
 * Число репозиториев сверено с GitHub 25.08.2026.
 */
export const STATS = {
  revenueRub: 2234980,
  paidProjects: 18,
  repos: 52,
  mentees: 5,
} as const;

export const STATUS_LABEL: Record<CaseStatus, LocalizedText> = {
  shipped: { ru: "СДАН", en: "SHIPPED" },
  production: { ru: "В ПРОДЕ", en: "IN PROD" },
  beta: { ru: "БЕТА", en: "BETA" },
  active: { ru: "В РАБОТЕ", en: "ACTIVE" },
  mvp: { ru: "MVP", en: "MVP" },
};

export const FORMAT_LABEL: Record<CaseFormat, LocalizedText> = {
  mobile: { ru: "Мобильное", en: "Mobile" },
  web: { ru: "Веб", en: "Web" },
  telegram: { ru: "Telegram", en: "Telegram" },
  backend: { ru: "Бэкенд", en: "Backend" },
  ai: { ru: "AI", en: "AI" },
  admin: { ru: "Админка", en: "Admin" },
  payments: { ru: "Платежи", en: "Payments" },
};
