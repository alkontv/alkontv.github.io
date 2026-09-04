import type { CaseStudy } from "../types";

export const loyalty: CaseStudy = {
  id: "loyalty",
  industry: { ru: "Ритейл и общепит, ОАЭ", en: "Retail and food service, UAE" },
  formats: ["mobile", "backend"],
  name: { ru: "Лояльность пекарни", en: "Bakery Loyalty" },
  tagline: {
    ru: "Приложение лояльности с персональным QR-кодом, встроенное в кассовую систему сети",
    en: "A loyalty app with a personal QR code, built into the chain's point-of-sale system",
  },
  impact: {
    ru: "Программа лояльности, которая не мешает кассе: сеть считает баллы там, где уже считает чеки, а приложение остаётся витриной. Такую можно раскатывать на новые точки, ничего не переписывая.",
    en: "A loyalty programme that does not get in the till's way: the chain counts points where it already counts receipts, and the app stays a storefront. It rolls out to new venues without a rewrite.",
  },
  role: {
    ru: "Мобильное приложение, интеграция с кассовой системой, серверный движок лояльности и локализация под ближневосточный рынок.",
    en: "Mobile app, point-of-sale integration, the server-side loyalty engine and localisation for a Middle Eastern market.",
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
    ru: "Архитектура выбрана под рост сети: движок лояльности вынесен в облачный сервис и связан с кассой через OAuth2 и вебхуки, а приложение остаётся лёгким клиентом — новая точка подключается без переписывания. Плюс выход на ближневосточный рынок: арабский интерфейс с письмом справа налево.",
    en: "The architecture is chosen for a growing chain: the loyalty engine sits in a cloud service tied to the till over OAuth2 and webhooks, while the app stays a light client — a new venue plugs in without a rewrite. Plus a Middle Eastern launch: an Arabic interface with right-to-left script.",
  },
  cover: "/covers/loyalty.webp",
  stack: ["Flutter", "FlutterFlow", "Firebase", "Google Cloud Run", "Node.js"],
  integrations: ["Foodics", "OAuth2", "FCM"],
  scale: { loc: 17700, files: 116 },
  featured: false,
};
