import type { TimelineEntry } from "./types";

/**
 * Вехи из хронологии карьеры. Годы 2024–2026 — тематическая группировка
 * по типам задач, а не смена места работы; в подписях это не утверждается.
 */
export const TIMELINE: TimelineEntry[] = [
  {
    year: "2020",
    title: { ru: "Своё дело", en: "Own business" },
    subtitle: {
      ru: "Магазин в Telegram, перепродажа техники",
      en: "Telegram shop, hardware resale",
    },
  },
  {
    year: "2023",
    title: { ru: "Первые заказы", en: "First orders" },
    subtitle: {
      ru: "Коммерческая разработка, апрель",
      en: "Commercial development, April",
    },
  },
  {
    year: "2024",
    title: { ru: "Маркетплейсы", en: "Marketplaces" },
    subtitle: {
      ru: "Эскроу, комиссии, эквайринг",
      en: "Escrow, fees, acquiring",
    },
  },
  {
    year: "2025",
    title: { ru: "Бэкенд", en: "Backend" },
    subtitle: {
      ru: "Своя инфраструктура, миграции, тесты",
      en: "Own infrastructure, migrations, tests",
    },
  },
  {
    year: "2026",
    title: { ru: "AI и свой SaaS", en: "AI and own SaaS" },
    subtitle: {
      ru: "Векторный поиск, подписки",
      en: "Vector search, subscriptions",
    },
  },
];
