import type { CaseStudy } from "../types";

export const telegramMiniApp: CaseStudy = {
  id: "telegram-mini-app",
  industry: { ru: "Telegram-приложения", en: "Telegram apps" },
  formats: ["telegram", "web"],
  name: { ru: "Mini App внутри мессенджера", en: "In-Messenger Mini App" },
  status: "prototype",
  tagline: {
    ru: "Кроссплатформенный веб-клиент внутри Telegram: авторизация, данные, все экраны",
    en: "A cross-platform web client inside Telegram: authentication, data model, all screens",
  },
  problem: {
    ru: "Заказчику нужно было мини-приложение внутри мессенджера на том же кроссплатформенном стеке, что и мобильная разработка. Работа остановилась на этапе каркаса и интерфейса.",
    en: "The client wanted a mini app inside the messenger built on the same cross-platform stack as the mobile work. The work stopped at the shell-and-interface stage.",
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
    ru: "Кейс честно неполный: каркас, авторизация и все экраны собраны, прикладной логики нет. Показываю его как подтверждение, что кроссплатформенный фреймворк внутри мессенджера заводится и работает. Продуктово перекликается с кейсом VPN-сервиса, где мини-приложение работает кассой, — но там оно собрано на другом стеке.",
    en: "This case is honestly incomplete: the shell, authentication and all screens are done, the domain logic is not. I show it as proof that a cross-platform framework runs inside a messenger at all. It rhymes with the VPN case, where a mini app works as the checkout — though that one is built on a different stack.",
  },
  stack: ["Flutter Web", "FlutterFlow", "Firebase", "Cloud Functions", "Node.js"],
  integrations: ["Telegram Web App SDK"],
  scale: { loc: 13300, files: 67 },
  featured: false,
};
