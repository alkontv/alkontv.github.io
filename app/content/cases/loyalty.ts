import type { CaseStudy } from "../types";

export const loyalty: CaseStudy = {
  id: "loyalty",
  industry: { ru: "Ритейл и общепит, ОАЭ", en: "Retail and food service, UAE" },
  formats: ["mobile", "backend"],
  name: { ru: "Программа лояльности пекарни", en: "Bakery Loyalty Program" },
  budget: 75000,
  status: "shipped",
  tagline: {
    ru: "Тонкий клиент с персональным QR поверх кассовой системы заведения",
    en: "A thin client with a personal QR code on top of the venue point-of-sale system",
  },
  problem: {
    ru: "У пекарни уже работала кассовая система со своей логикой чеков. Приложение не должно было считать баллы само — ему следовало показывать покупателю его профиль и выдавать код, который кассир сканирует.",
    en: "The bakery already ran a point-of-sale system with its own receipt logic. The app was not supposed to count points itself — it had to show the customer their profile and produce a code for the cashier to scan.",
  },
  solution: [
    {
      ru: "Вход по номеру телефона, профиль с балансом баллов, уровнем, прогрессом и кэшбэком",
      en: "Phone sign-in, a profile with point balance, tier, progress and cashback",
    },
    {
      ru: "Персональный QR-код для сканирования на кассе, каталог и поиск, скретч-механика бонусов",
      en: "A personal QR code for the till, catalogue with search, and a scratch-card bonus mechanic",
    },
    {
      ru: "Начисление, списание и сжигание баллов, пересчёт уровней и обработка событий кассы — во внешнем сервисе, а не в приложении",
      en: "Earning, spending and expiry of points, tier recalculation and till event handling live in an external service, not in the app",
    },
    {
      ru: "Локализация на английский и арабский с поддержкой правостороннего письма",
      en: "English and Arabic localisation with right-to-left support",
    },
  ],
  highlight: {
    ru: "Разделение ответственности сделано осознанно: движок лояльности вынесен на облачный runtime и интегрирован с кассовой системой через OAuth2 и вебхуки, а мобильное приложение осталось тонким клиентом. Плюс работа под ближневосточный рынок с арабской локализацией.",
    en: "The separation of concerns was deliberate: the loyalty engine sits on a cloud runtime and integrates with the point-of-sale system over OAuth2 and webhooks, while the mobile app stays a thin client. Plus delivery for a Middle Eastern market with Arabic localisation.",
  },
  stack: ["Flutter", "FlutterFlow", "Firebase", "Google Cloud Run", "Node.js"],
  integrations: ["Foodics", "OAuth2", "FCM"],
  scale: { loc: 17700, files: 116 },
  featured: false,
};
