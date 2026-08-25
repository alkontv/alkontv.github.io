import type { LocalizedText } from "@i18n";
import type { CaseFormat, CaseStatus } from "./types";

/**
 * Цифры для шапки. Сознательно НЕ показываем ни выручку, ни число
 * репозиториев, ни учеников: первое даёт клиенту якорь на прайс и сбивает
 * ставку, остальное — метрики для отчёта, а не аргумент для покупателя.
 *
 * Здесь только то, что отвечает на вопрос «справится ли он с моей задачей»:
 * объём написанного, широта рынков и стаж. Число кейсов и отраслей
 * считается из самого каталога, чтобы не разошлось при правках.
 */
export const STATS = {
  /** Приложений и сервисов в реестре работ. */
  apps: 40,
  /** Россия, ОАЭ, Азербайджан, Юго-Восточная Азия. */
  markets: 4,
  /** Коммерческая разработка с апреля 2023. */
  sinceYear: 2023,
} as const;

export const STATUS_LABEL: Record<CaseStatus, LocalizedText> = {
  shipped: { ru: "СДАН", en: "SHIPPED" },
  production: { ru: "В ПРОДЕ", en: "IN PROD" },
  beta: { ru: "БЕТА", en: "BETA" },
  active: { ru: "В РАБОТЕ", en: "ACTIVE" },
  mvp: { ru: "MVP", en: "MVP" },
  prototype: { ru: "МАКЕТ", en: "PROTOTYPE" },
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
