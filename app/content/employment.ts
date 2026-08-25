import type { LocalizedText } from "@i18n";

export interface Job {
  /** Название компании или обезличенное описание, если называть нельзя. */
  company: LocalizedText;
  role: LocalizedText;
  /** Для резюме: «2025 — сейчас». */
  period: LocalizedText;
  /** Для 3D-сцены: год начала одной короткой строкой. */
  since: string;
  summary: LocalizedText;
}

/**
 * Опыт работы по нарастанию: от раннего к позднему. Так читается как
 * траектория — от частной практики к найму и росту до Senior.
 *
 * Раньше здесь была тематическая линия («маркетплейсы», «бэкенд», «AI»).
 * Её убрали: под заголовком «Опыт» читатель ждёт места работы, а получал
 * абстракции с годами и не понимал, что ему сообщают. Широта компетенций
 * показана отдельно, в блоке «Что умею».
 */
export const EMPLOYMENT: Job[] = [
  {
    company: { ru: "Частная практика", en: "Independent practice" },
    role: {
      ru: "Fullstack-разработчик и дизайнер",
      en: "Fullstack developer and designer",
    },
    period: { ru: "2022 — сейчас", en: "2022 — now" },
    since: "2022",
    summary: {
      ru: "Продукты под ключ для заказчиков из России, ОАЭ, Азербайджана и Юго-Восточной Азии: маркетплейсы с платежами, приложения с подписками, Telegram-боты, self-hosted инфраструктура.",
      en: "End-to-end products for clients in Russia, the UAE, Azerbaijan and Southeast Asia: marketplaces with payments, subscription apps, Telegram bots and self-hosted infrastructure.",
    },
  },
  {
    company: { ru: "Продуктовая компания", en: "Product company" },
    role: {
      ru: "Middle fullstack-разработчик",
      en: "Middle fullstack developer",
    },
    period: { ru: "2024 — 2025", en: "2024 — 2025" },
    since: "2024",
    summary: {
      ru: "Продуктовая разработка в штате: участвовал в проработке идеи, писал бэкенд, внедрял AI-функциональность. Командный процесс в Яндекс Трекере, на части задач — в роли лида.",
      en: "In-house product development: took part in shaping the idea, wrote the backend and built AI features. Team process in Yandex Tracker, leading on part of the work.",
    },
  },
  {
    company: { ru: "AppFyl", en: "AppFyl" },
    role: {
      ru: "Senior fullstack-разработчик",
      en: "Senior fullstack developer",
    },
    period: { ru: "2025 — сейчас", en: "2025 — now" },
    since: "2025",
    summary: {
      ru: "Студия разработки: клиентские продукты от макета до релиза — мобильные приложения, веб, бэкенд и интерфейсы. Работа по процессу студии: постановка, ревью, сдача.",
      en: "A development studio: client products from mockup to release — mobile apps, web, backend and interfaces. Delivered inside the studio's process: briefing, review, handover.",
    },
  },
];
