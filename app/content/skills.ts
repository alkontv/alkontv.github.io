import type { LocalizedText } from "@i18n";

export interface SkillGroup {
  title: LocalizedText;
  items: LocalizedText[];
}

/** Только то, что подтверждено кейсами. Иначе блок превращается в список ключевых слов. */
export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: { ru: "Маркетплейсы с деньгами", en: "Marketplaces with money" },
    items: [
      { ru: "Эскроу: холдирование оплаты и выплата после работы", en: "Escrow: holding payment and releasing it after the job" },
      { ru: "Комиссия площадки и внутренний кошелёк", en: "Platform commission and an in-app wallet" },
      { ru: "Расчёт свободных слотов и бронирование", en: "Free-slot computation and booking" },
      { ru: "Двусторонние площадки с кабинетом партнёра", en: "Two-sided platforms with a partner cabinet" },
    ],
  },
  {
    title: { ru: "Платежи", en: "Payments" },
    items: [
      { ru: "Карточный эквайринг с холдированием и выплатами", en: "Card acquiring with holds and payouts" },
      { ru: "Подписки и рекуррентные списания", en: "Subscriptions and recurring charges" },
      { ru: "Криптовалюта и валюта мессенджера", en: "Cryptocurrency and messenger currency" },
      { ru: "Локальные шлюзы зарубежных рынков", en: "Local gateways for foreign markets" },
    ],
  },
  {
    title: { ru: "AI в продукте", en: "AI in the product" },
    items: [
      { ru: "AI как способ ввода: диалог вместо анкеты", en: "AI as an input method: a dialogue instead of a form" },
      { ru: "Векторный поиск по смыслу, а не по словам", en: "Vector search by meaning rather than words" },
      { ru: "Ассистент, отвечающий по регламенту", en: "An assistant answering from a procedure" },
      { ru: "Чат-персонаж в стиле автора", en: "A chat persona in the author's voice" },
    ],
  },
  {
    title: { ru: "Бэкенд и инфраструктура", en: "Backend and infrastructure" },
    items: [
      { ru: "Self-hosted платформа: схема, права на строки, триггеры, edge-функции", en: "Self-hosted platform: schema, row-level security, triggers, edge functions" },
      { ru: "Свой API на Python с очередью фоновых задач", en: "An own Python API with a background job queue" },
      { ru: "Агенты на Go, управляющие серверами", en: "Go agents managing servers" },
      { ru: "Развёртывание на VPS: веб-сервер, systemd, бэкапы", en: "VPS deployment: web server, systemd, backups" },
      { ru: "Мониторинг, сбор ошибок, тесты", en: "Monitoring, error tracking, tests" },
    ],
  },
  {
    title: { ru: "Карты и гео", en: "Maps and geo" },
    items: [
      { ru: "Маршруты с промежуточными точками", en: "Routes with waypoints" },
      { ru: "Поиск по расстоянию и кластеризация маркеров", en: "Distance search and marker clustering" },
      { ru: "Координаты в сценариях безопасности", en: "Coordinates in safety scenarios" },
    ],
  },
  {
    title: { ru: "Telegram", en: "Telegram" },
    items: [
      { ru: "Боты и мини-приложения", en: "Bots and mini apps" },
      { ru: "Платежи внутри мессенджера", en: "Payments inside the messenger" },
      { ru: "Мини-приложение как касса продукта", en: "A mini app working as the product checkout" },
    ],
  },
  {
    title: { ru: "Веб и админки", en: "Web and admin panels" },
    items: [
      { ru: "Next.js с CMS и собственной базой", en: "Next.js with a CMS and an own database" },
      { ru: "Админки модерации и управления партнёрами", en: "Admin panels for moderation and partner management" },
      { ru: "PWA как третья платформа продукта", en: "PWA as a product's third platform" },
    ],
  },
];
