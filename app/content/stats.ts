import type { LocalizedText } from "@i18n";
import type { CaseFormat, CaseStatus } from "./types";

/**
 * Источник — лог платежей хранилища («Клиентские проекты»).
 *
 * ВНИМАНИЕ: revenueRub и paidProjects взяты из раздела «Итог» этого лога,
 * и независимый пересчёт по строкам показал, что итог устарел — подзаголовки
 * разделов не обновляли при добавлении проектов. По строкам выходит
 * 3 227 030 ₽ на 21 оплаченном заказе. Цифра не поднята здесь намеренно:
 * она зависит от противоречия в хранилище по одному крупному заказу
 * и требует решения владельца портфолио.
 *
 * repos и mentees приведены к тому, что подтверждается хранилищем:
 * 51 работа в реестре, 4 платящих ученика по именам (пятая строка лога —
 * разовые подработки, а не ученик).
 */
export const STATS = {
  revenueRub: 2234980,
  paidProjects: 18,
  repos: 51,
  mentees: 4,
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
