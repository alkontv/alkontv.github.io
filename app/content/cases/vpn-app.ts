import type { CaseStudy } from "../types";

export const vpnApp: CaseStudy = {
  id: "vpn-app",
  industry: { ru: "Телеком и приватность", en: "Telecom and privacy" },
  formats: ["mobile", "payments"],
  name: { ru: "VPN-приложение", en: "VPN App" },
  tagline: {
    ru: "Подключение одной кнопкой, выбор страны и мессенджер со сквозным шифрованием",
    en: "One-tap connection, a country picker and an end-to-end encrypted messenger",
  },
  impact: {
    ru: "Подписка перестала жить только в мессенджере: у сервиса появился клиент в сторе, куда человек заходит каждый день. Это и канал продаж, и удержание — из приложения нет повода выходить.",
    en: "The subscription stopped living inside a messenger alone: the service got a store client people open every day. That is both a sales channel and retention — there is no reason to leave the app.",
  },
  role: {
    ru: "Мобильное приложение целиком: интерфейс, работа с профилями подключения, встроенный мессенджер, подписка и выпуск в стор.",
    en: "The whole mobile app: interface, connection profiles, the built-in messenger, subscription and store release.",
  },
  problem: {
    ru: "У подписочного VPN-сервиса продажи и выдача доступа уже работали, но клиента не было — человек копировал ссылку в стороннее приложение. Нужен был свой, где подключение занимает одно касание.",
    en: "The subscription VPN service already sold plans and provisioned access, but had no client of its own — people copied a link into a third-party app. It needed one where connecting takes a single tap.",
  },
  solution: [
    {
      ru: "Главный экран — одна кнопка подключения, таймер сессии и текущая локация",
      en: "The home screen is one connect button, a session timer and the current location",
    },
    {
      ru: "Каталог серверов по странам с отметкой скорости и избранным",
      en: "A server catalogue by country with speed marks and favourites",
    },
    {
      ru: "Встроенный мессенджер со сквозным шифрованием: текст, медиа, вложения",
      en: "A built-in end-to-end encrypted messenger: text, media and attachments",
    },
    {
      ru: "Подписка оформляется внутри приложения, доступ открывается сразу после оплаты",
      en: "The subscription is bought inside the app and access opens right after payment",
    },
    {
      ru: "Тёмная тема, собранная под долгие сессии и слабый свет",
      en: "A dark theme built for long sessions and low light",
    },
  ],
  highlight: {
    ru: "Клиент к инфраструктуре, которую я построил сам: приложение работает поверх тех же серверов и биллинга, что выдают доступ, продлевают и отключают подписку. Мессенджер со сквозным шифрованием встроен в клиент, а не подключён сбоку отдельным продуктом.",
    en: "A client for infrastructure I built myself: the app runs on the same servers and billing that provision, renew and cut off the subscription. The end-to-end encrypted messenger is part of the client, not a separate product bolted on.",
  },
  cover: "/covers/vpn-app.webp",
  stack: ["Flutter", "Dart"],
  integrations: [],
  featured: false,
};
