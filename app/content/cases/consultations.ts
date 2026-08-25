import type { CaseStudy } from "../types";

export const consultations: CaseStudy = {
  id: "consultations",
  industry: { ru: "Консультации и услуги", en: "Consulting and services" },
  formats: ["mobile", "payments"],
  name: { ru: "Маркетплейс консультаций", en: "Consultations Marketplace" },
  budget: 242500,
  status: "active",
  tagline: {
    ru: "Запись к специалисту с расчётом свободных слотов и авточатом после оплаты",
    en: "Booking a specialist with computed free slots and an auto-created chat after payment",
  },
  problem: {
    ru: "Площадке для записи к консультантам и психологам нужна была честная сетка времени: чтобы клиент не мог забронировать занятый час и чтобы у специалиста оставался перерыв между сессиями.",
    en: "A platform for booking consultants and therapists needed an honest time grid: a client must not be able to book an occupied hour, and the specialist must keep a gap between sessions.",
  },
  solution: [
    {
      ru: "Алгоритм расчёта доступных слотов: рабочие часы специалиста, уже занятые интервалы с их длительностями и обязательный перерыв между сессиями",
      en: "A slot algorithm combining the specialist's working hours, already booked intervals with their durations and a mandatory gap between sessions",
    },
    {
      ru: "Отдельный тип данных под рабочие часы: день, время начала, время окончания",
      en: "A dedicated data type for working hours: day, start time, end time",
    },
    {
      ru: "Автоматическое создание чата клиент-специалист по факту успешной оплаты, через платёжный вебхук",
      en: "A client-to-specialist chat created automatically on successful payment, driven by a payment webhook",
    },
    {
      ru: "Каталог специалистов и услуг с категориями",
      en: "A catalogue of specialists and services with categories",
    },
  ],
  highlight: {
    ru: "Расчёт слотов — та часть, где обычно ломаются маркетплейсы услуг: пересечения, длительности и перерывы считаются в одном месте, а не размазаны по экранам. Проект ведётся до сих пор.",
    en: "Slot computation is where service marketplaces usually break: overlaps, durations and gaps are handled in one place instead of being smeared across screens. The project is still ongoing.",
  },
  stack: ["Flutter", "FlutterFlow", "Firebase"],
  integrations: [],
  featured: false,
};
