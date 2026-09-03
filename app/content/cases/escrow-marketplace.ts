import type { CaseStudy } from "../types";

export const escrowMarketplace: CaseStudy = {
  id: "escrow-marketplace",
  industry: { ru: "Подработки и услуги", en: "Gig work and services" },
  formats: ["mobile", "web", "admin", "payments"],
  name: { ru: "Эскроу-маркетплейс", en: "Escrow Marketplace" },
  tagline: {
    ru: "Площадка держит оплату и переводит её исполнителю только после принятой работы",
    en: "The platform holds the payment and releases it to the worker only after the job is accepted",
  },
  impact: {
    ru: "Эскроу снимает единственное, что мешает двусторонней площадке взлететь, — недоверие. Пока деньги не держит платформа, заказчик не платит вперёд, а исполнитель не выходит на работу.",
    en: "Escrow removes the one thing that keeps a two-sided platform from taking off — distrust. Until the platform holds the money, the client will not pay upfront and the worker will not show up.",
  },
  role: {
    ru: "Мобильное приложение, веб-версия, админка, платёжный контур с холдированием и выплатами, нативные модули под iOS и Android.",
    en: "Mobile app, web build, admin panel, the payment flow with holds and payouts, plus native modules for iOS and Android.",
  },
  problem: {
    ru: "На площадке подработок обе стороны боятся друг друга: заказчик — что заплатит и не получит работу, исполнитель — что сделает и не получит денег. Снять этот страх можно только деньгами, которые держит платформа.",
    en: "On a gig platform both sides fear each other: the client fears paying for nothing, the worker fears working for nothing. The only way to remove that fear is money held by the platform.",
  },
  solution: [
    {
      ru: "Безопасная сделка: оплата холдируется на площадке, исполнителю выплачивается после подтверждения выполнения, платформа удерживает комиссию",
      en: "Escrow: the payment is held by the platform, released to the worker after the job is confirmed, with the platform taking a commission",
    },
    {
      ru: "Регистрация с верификацией, каталог категорий и специализаций, публикация заказа и отклики",
      en: "Registration with verification, a catalogue of categories and specialisations, job posting and applications",
    },
    {
      ru: "Чат с историями и медиа, геолокация и карты, отзывы, жалобы, push-уведомления",
      en: "Chat with stories and media, geolocation and maps, reviews, complaints and push notifications",
    },
    {
      ru: "Продукт существует в трёх частях: мобильное приложение, веб-версия как PWA и админка",
      en: "The product ships in three parts: a mobile app, a web build as a PWA, and an admin panel",
    },
    {
      ru: "Нативные модули на Kotlin и Swift там, где кроссплатформенный слой не дотягивал",
      en: "Native Kotlin and Swift modules where the cross-platform layer fell short",
    },
  ],
  highlight: {
    ru: "Полноценный эскроу на реальном эквайринге: холдирование, выплата исполнителю и комиссия площадки выполняются отдельными облачными функциями, каждая операция изолирована и прослеживается. 110 тыс. строк, 347 файлов, около 30 маршрутов — и всё это в продакшене на iOS, Android и в вебе как PWA.",
    en: "Full escrow on real acquiring: holding, worker payout and platform commission run as separate cloud functions, each operation isolated and traceable. 110k lines, 347 files, some 30 routes — all of it live on iOS, Android and on the web as a PWA.",
  },
  stack: ["Flutter", "FlutterFlow", "Kotlin", "Swift", "Firebase", "Cloud Functions"],
  integrations: ["Google Maps", "FCM", "Remote Config"],
  scale: { loc: 110800, files: 347 },
  diagram: "escrow",
  featured: true,
};
