import type { CaseStudy } from "../types";

export const safety: CaseStudy = {
  id: "safety",
  industry: { ru: "Личная безопасность", en: "Personal safety" },
  formats: ["mobile", "backend", "payments"],
  name: { ru: "Кнопка SOS", en: "SOS Button" },
  tagline: {
    ru: "Одно нажатие: заявление в службу спасения, координаты доверенным лицам и видео с камеры",
    en: "One tap: an emergency report, coordinates to trusted contacts and camera video",
  },
  impact: {
    ru: "Заказчик получил не приложение, а работающий канал экстренной связи: одно нажатие поднимает три независимых сценария сразу, и если один не дойдёт, сигнал всё равно уйдёт остальными двумя.",
    en: "The client got a working emergency channel rather than an app: one tap fires three independent paths at once, so if one fails the signal still leaves through the other two.",
  },
  role: {
    ru: "Всё, от первого экрана до сервера: мобильное приложение, база и серверная логика, платежи, развёртывание, домен.",
    en: "Everything from the first screen to the server: mobile app, database and server logic, payments, deployment, domain.",
  },
  problem: {
    ru: "Человеку в опасности некогда выбирать между «позвонить», «написать» и «включить запись». Нужно было приложение, где всё это делает одно нажатие.",
    en: "A person in danger has no time to choose between calling, texting and hitting record. The app had to do all three from a single tap.",
  },
  solution: [
    {
      ru: "Вход по номеру телефона: одноразовый код через SMS-шлюз, подключённый к авторизации отдельным хуком",
      en: "Phone sign-in: a one-time code through an SMS gateway wired into auth with a dedicated hook",
    },
    {
      ru: "Сценарий SOS: заявление в службу спасения с текстом, координатами и ссылкой на видео",
      en: "SOS flow: an emergency report carrying the statement text, coordinates and a video link",
    },
    {
      ru: "Одновременно — SMS доверенным лицам с координатами и короткой ссылкой, событие фиксируется в базе",
      en: "In parallel: SMS to trusted contacts with coordinates and a short link, plus an event row in the database",
    },
    {
      ru: "Видео с фронтальной камеры в хранилище за подписанными ссылками: 14 дней, а если участвовало в SOS — бессрочно",
      en: "Front-camera video in storage behind signed URLs: 14 days, or kept forever if it was part of an SOS",
    },
    {
      ru: "Подписка с рекуррентными списаниями, тарифами и промокодами",
      en: "Subscription with recurring charges, tiers and promo codes",
    },
  ],
  highlight: {
    ru: "Инфраструктура развёрнута на своём сервере, а не арендована у облака: PostgreSQL с триггерами и функциями, авторизация с хуком на SMS-шлюз, хранилище за подписанными ссылками, edge-функции на Deno, свой домен. Каждый узел собран под сценарий, где отказ недопустим, — поэтому у сигнала три независимых пути.",
    en: "The infrastructure runs on an own server instead of a rented cloud: PostgreSQL with triggers and functions, auth with an SMS-gateway hook, storage behind signed URLs, Deno edge functions, own domain. Every node was built for a scenario where failure is not an option — which is why the signal has three independent paths.",
  },
  stack: ["Flutter", "Supabase (self-hosted)", "PostgreSQL", "Deno", "TypeScript"],
  integrations: ["CloudPayments", "SMSC.ru"],
  diagram: "sos",
  featured: true,
};
