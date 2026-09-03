import type { CaseStudy } from "../types";

export const vpnService: CaseStudy = {
  id: "vpn-service",
  industry: { ru: "Телеком и приватность", en: "Telecom and privacy" },
  formats: ["telegram", "backend", "web", "admin", "payments"],
  name: { ru: "VPN по подписке", en: "Subscription VPN" },
  tagline: {
    ru: "Бот, мини-приложение и админка поверх биллинга и серверных агентов, написанных с нуля",
    en: "A bot, a mini app and an admin panel on top of billing and server agents written from scratch",
  },
  impact: {
    ru: "Подписка живёт без человека: оплата, выдача доступа, продление и отключение происходят сами. Владельцу остаётся считать выручку, а не заводить пользователей руками.",
    en: "The subscription runs without a human: payment, provisioning, renewal and cut-off happen on their own. The owner counts revenue instead of registering users by hand.",
  },
  role: {
    ru: "Всё: бэкенд, агенты на серверах, бот, мини-приложение, админка, инфраструктура, мониторинг и тесты.",
    en: "Everything: backend, server agents, bot, mini app, admin panel, infrastructure, monitoring and tests.",
  },
  problem: {
    ru: "Подписочный сервис — это не клиент для подключения, а конвейер: продать тариф, принять деньги, автоматически выдать доступ на нужном сервере, продлить и вовремя отключить. Всю эту цепочку нужно было построить целиком.",
    en: "A subscription service is not a connection client but a pipeline: sell a plan, take the money, provision access on a server automatically, renew it and cut it off on time. The whole chain had to be built end to end.",
  },
  solution: [
    {
      ru: "Продажа и оплата тарифов идут в мессенджере: бот и веб-мини-приложение вместо отдельного сайта",
      en: "Plans are sold and paid for inside a messenger: a bot and a web mini app instead of a separate site",
    },
    {
      ru: "Четыре платёжных канала, включая криптовалюту и внутреннюю валюту мессенджера",
      en: "Four payment channels, including cryptocurrency and the messenger's own currency",
    },
    {
      ru: "Бэкенд ведёт жизненный цикл подписок, биллинг и отчётность; фоновые задачи — на очереди",
      en: "The backend owns the subscription lifecycle, billing and reporting; background work runs on a queue",
    },
    {
      ru: "Агенты на серверах написаны на Go и выдают доступ автоматически — вручную никто ничего не заводит",
      en: "Server-side agents are written in Go and provision access automatically — nobody registers anything by hand",
    },
    {
      ru: "Админка на React: дашборды, серверы, пользователи, промокоды",
      en: "A React admin panel: dashboards, servers, users, promo codes",
    },
    {
      ru: "731 автотест, мониторинг метрик с дашбордами и сбор ошибок в реальном времени",
      en: "731 automated tests, metrics monitoring with dashboards and real-time error tracking",
    },
  ],
  highlight: {
    ru: "Сервис целиком, а не приложение: Python на бэкенде, Go в агентах на серверах, React и TypeScript в мини-приложении и админке, PostgreSQL и Redis, очередь фоновых задач, миграции, мониторинг и 731 тест — 68 тыс. строк в 398 файлах. Выдача доступа, продление и отключение проходят без единого ручного действия.",
    en: "A whole service, not an app: Python on the backend, Go in the server agents, React and TypeScript in the mini app and admin panel, PostgreSQL and Redis, a background job queue, migrations, monitoring and 731 tests — 68k lines across 398 files. Provisioning, renewal and cut-off run without a single manual step.",
  },
  stack: [
    "Python",
    "FastAPI",
    "SQLAlchemy",
    "PostgreSQL",
    "Redis",
    "Go",
    "React",
    "TypeScript",
    "Vite",
    "Docker",
    "Nginx",
  ],
  integrations: [
    "Telegram Bot API",
    "Telegram Stars",
    "CryptoBot",
    "ЮKassa",
    "Prometheus",
    "Grafana",
    "Sentry",
  ],
  scale: { loc: 68000, files: 398 },
  diagram: "vpn",
  featured: true,
};
