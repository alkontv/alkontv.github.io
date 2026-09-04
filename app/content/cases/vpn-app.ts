import type { CaseStudy } from "../types";

export const vpnApp: CaseStudy = {
  id: "vpn-app",
  industry: { ru: "Телеком и приватность", en: "Telecom and privacy" },
  formats: ["mobile", "backend", "payments"],
  name: { ru: "Мобильный VPN", en: "Mobile VPN" },
  tagline: {
    ru: "Своя сеть нод, свой бэкенд и приложение со встроенным шифрованным мессенджером",
    en: "Its own node network, its own backend and an app with a built-in encrypted messenger",
  },
  impact: {
    ru: "Продукт ни от кого не зависит: трафик идёт через свои ноды, подписка продаётся в сторе, переписка остаётся внутри приложения. Нет посредника, который может отключить, и нет чужой площадки, которая заберёт аудиторию.",
    en: "The product depends on nobody: traffic goes through its own nodes, the subscription sells in the store, conversations stay inside the app. No intermediary that can switch it off, no third-party platform that takes the audience.",
  },
  role: {
    ru: "Всё: сеть нод, серверная часть с выдачей доступа и подписками, мобильное приложение и встроенный мессенджер.",
    en: "Everything: the node network, the server side with provisioning and subscriptions, the mobile app and the built-in messenger.",
  },
  problem: {
    ru: "Нужен был самостоятельный VPN, а не надстройка над чужим сервисом: собственная инфраструктура, свой клиент в сторе и переписка, которая не уходит на сторону.",
    en: "The ask was a VPN of its own rather than a layer over someone else's service: own infrastructure, an own store client, and messaging that does not leave the product.",
  },
  solution: [
    {
      ru: "Своя сеть нод: доступ выдаётся автоматически, сервер выбирается из каталога по странам",
      en: "An own node network: access is provisioned automatically, the server is picked from a country catalogue",
    },
    {
      ru: "Главный экран — одна кнопка подключения, таймер сессии и текущая локация",
      en: "The home screen is one connect button, a session timer and the current location",
    },
    {
      ru: "Каталог серверов с отметкой скорости и избранным",
      en: "A server catalogue with speed marks and favourites",
    },
    {
      ru: "Встроенный мессенджер со сквозным шифрованием: текст, медиа, вложения",
      en: "A built-in end-to-end encrypted messenger: text, media and attachments",
    },
    {
      ru: "Подписка оформляется в приложении, доступ открывается сразу после оплаты",
      en: "The subscription is bought inside the app and access opens right after payment",
    },
  ],
  highlight: {
    ru: "Продукт целиком под одной рукой: ноды, серверная часть с выдачей доступа и подписками, приложение и мессенджер сделаны под одну задачу и стыкуются без прослоек. Сквозное шифрование переписки встроено в клиент, а не подключено сбоку отдельным сервисом.",
    en: "A whole product in one pair of hands: nodes, the server side with provisioning and subscriptions, the app and the messenger were built for one job and fit together without glue layers. End-to-end encryption is part of the client, not a separate service bolted on.",
  },
  cover: "/covers/vpn-app.webp",
  stack: ["Flutter", "Dart"],
  integrations: [],
  featured: false,
};
