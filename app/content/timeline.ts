import type { TimelineEntry } from "./types";

/**
 * Вехи профессионального роста. Предпринимательский период сюда сознательно
 * не входит: в хронологии разработчика перепродажа техники читается как
 * «случайно забрёл в профессию». Польза от того опыта сказана отдельно —
 * в блоке «Дополнительно», как понимание юнит-экономики.
 *
 * Годы 2023–2026 — тематическая группировка по типам задач, а не смена
 * места работы; в подписях это не утверждается.
 */
export const TIMELINE: TimelineEntry[] = [
  {
    year: "2022",
    title: { ru: "Первые заказы", en: "First orders" },
    subtitle: {
      ru: "Коммерческая разработка под клиента",
      en: "Commercial development for clients",
    },
  },
  {
    year: "2023",
    title: { ru: "Мобильные приложения", en: "Mobile apps" },
    subtitle: {
      ru: "Приложения под ключ: от макета до релиза",
      en: "End-to-end apps, from mockup to release",
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
