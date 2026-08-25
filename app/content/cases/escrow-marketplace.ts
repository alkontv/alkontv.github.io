import type { CaseStudy } from "../types";

export const escrowMarketplace: CaseStudy = {
  id: "escrow-marketplace",
  industry: { ru: "Подработки и услуги", en: "Gig work and services" },
  formats: ["mobile", "web", "admin", "payments"],
  name: { ru: "Маркетплейс подработок с эскроу", en: "Escrow Gig Marketplace" },
  status: "production",
  tagline: {
    ru: "Деньги депонируются площадкой и уходят исполнителю только после работы",
    en: "Money is held by the platform and released to the worker only after the job",
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
      ru: "Ручные обвязки на Kotlin и Swift там, где кроссплатформенного решения не хватало",
      en: "Hand-written Kotlin and Swift bridges where the cross-platform layer fell short",
    },
  ],
  highlight: {
    ru: "Одна из самых взрослых денежных логик в списке: холдирование, выплата исполнителю и комиссия сделаны на реальном эквайринге отдельными облачными функциями. Самый объёмный репозиторий портфолио — около 110,8 тыс. строк, 347 файлов, порядка 30 маршрутов. В проде на iOS, Android и PWA.",
    en: "One of the most grown-up money logics in the list: holding, payout and commission built on real acquiring through dedicated cloud functions. The largest repository in this portfolio — around 110.8k lines, 347 files, some 30 routes. Live in production on iOS, Android and PWA.",
  },
  stack: ["Flutter", "FlutterFlow", "Kotlin", "Swift", "Firebase", "Cloud Functions"],
  integrations: ["Google Maps", "FCM", "Remote Config"],
  scale: { loc: 110800, files: 347 },
  diagram: "escrow",
  featured: true,
};
