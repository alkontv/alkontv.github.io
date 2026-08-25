import type { CaseStudy } from "../types";

export const telegramMiniApp: CaseStudy = {
  id: "telegram-mini-app",
  industry: { ru: "Telegram-приложения", en: "Telegram apps" },
  formats: ["telegram", "web"],
  name: { ru: "Mini App внутри мессенджера", en: "In-Messenger Mini App" },
  status: "mvp",
  tagline: {
    ru: "Кроссплатформенный веб-клиент внутри Telegram: авторизация, данные, все экраны",
    en: "A cross-platform web client inside Telegram: authentication, data model, all screens",
  },
  problem: {
    ru: "Нужно было проверить связку «кроссплатформенный фреймворк внутри мессенджера»: можно ли собрать полноценный интерфейс мини-приложения без отдельного веб-стека.",
    en: "The goal was to validate a cross-platform framework running inside a messenger: whether a full mini-app interface can be built without a separate web stack.",
  },
  solution: [
    {
      ru: "Каркас мини-приложения на веб-сборке кроссплатформенного фреймворка",
      en: "A mini-app shell built on the web target of a cross-platform framework",
    },
    {
      ru: "Чтение и разбор данных, которые мессенджер передаёт приложению при открытии",
      en: "Reading and parsing the data the messenger passes to the app on launch",
    },
    {
      ru: "Флоу авторизации и регистрации, модель данных, вёрстка всех экранов",
      en: "Authentication and sign-up flow, data model and layout for every screen",
    },
  ],
  highlight: {
    ru: "Кейс честно неполный: интерфейс и авторизация собраны, прикладная логика — нет. Показываю его как подтверждение, что связка «кроссплатформенный фреймворк внутри мессенджера» освоена; продуктовая часть этой связки доведена до конца в кейсе VPN-сервиса, где мини-приложение работает кассой.",
    en: "This case is honestly incomplete: the interface and authentication are done, the domain logic is not. I show it as proof that running a cross-platform framework inside a messenger is a solved problem for me; the product side of that combination is finished in the VPN case, where the mini app works as the checkout.",
  },
  stack: ["Flutter Web", "FlutterFlow", "Firebase", "Cloud Functions", "Node.js"],
  integrations: ["Telegram Web App SDK"],
  scale: { loc: 13300, files: 67 },
  featured: false,
};
