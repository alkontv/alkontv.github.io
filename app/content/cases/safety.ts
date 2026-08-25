import type { CaseStudy } from "../types";

export const safety: CaseStudy = {
  id: "safety",
  industry: { ru: "Личная безопасность", en: "Personal safety" },
  formats: ["mobile", "backend", "payments"],
  name: { ru: "Приложение личной безопасности", en: "Personal Safety App" },
  tagline: {
    ru: "Одна кнопка: обращение в службу спасения, координаты доверенным лицам и видео с камеры",
    en: "One button: an emergency report, coordinates to trusted contacts, camera video",
  },
  impact: {
    ru: "Заказчик получил не приложение, а работающий канал экстренной связи: одно нажатие поднимает три независимых сценария сразу, и если один не дойдёт, сигнал всё равно уйдёт остальными двумя.",
    en: "The client got a working emergency channel rather than an app: one tap fires three independent paths at once, so if one fails the signal still leaves through the other two.",
  },
  role: {
    ru: "Мобильное приложение, база и серверная логика, платежи, развёртывание и домен — всё на мне.",
    en: "Mobile app, database and server logic, payments, deployment and domain — all mine.",
  },
  problem: {
    ru: "Человеку в опасности некогда выбирать между «позвонить», «написать» и «включить запись». Нужно было приложение, где всё это делает одно нажатие.",
    en: "A person in danger has no time to choose between calling, texting and hitting record. The app had to do all three from a single tap.",
  },
  solution: [
    {
      ru: "Вход по номеру телефона: одноразовый код через SMS-шлюз, подключённый к GoTrue собственным хуком",
      en: "Phone sign-in: a one-time code through an SMS gateway wired into GoTrue with a custom hook",
    },
    {
      ru: "Сценарий SOS: обращение в службу спасения с текстом заявления, координатами и ссылкой на видео",
      en: "SOS flow: an emergency report carrying the statement text, coordinates and a video link",
    },
    {
      ru: "Одновременно — SMS доверенным лицам с координатами и короткой ссылкой, событие пишется в базу",
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
    ru: "Инфраструктура развёрнута самостоятельно, а не взята облаком: схема PostgreSQL с триггерами и функциями, авторизация с собственным хуком на SMS-шлюз, хранилище с подписанными ссылками, edge-функции на Deno, свой домен. Единственный кейс, где весь стек собран руками под сценарий, критичный по надёжности.",
    en: "The infrastructure was deployed by hand instead of taken from a managed cloud: a PostgreSQL schema with triggers and functions, auth with a custom SMS-gateway hook, storage behind signed URLs, Deno edge functions, own domain. The only case here where the whole stack was built by hand for a reliability-critical scenario.",
  },
  stack: ["Flutter", "Supabase (self-hosted)", "PostgreSQL", "Deno", "TypeScript"],
  integrations: ["CloudPayments", "SMSC.ru"],
  diagram: "sos",
  featured: true,
};
