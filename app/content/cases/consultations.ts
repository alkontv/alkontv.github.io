import type { CaseStudy } from "../types";

export const consultations: CaseStudy = {
  id: "consultations",
  industry: { ru: "Консультации и услуги", en: "Consulting and services" },
  formats: ["mobile", "payments"],
  name: { ru: "Запись к специалистам", en: "Booking Marketplace" },
  tagline: {
    ru: "Запись без накладок: свободные слоты считаются автоматически, чат открывается сразу после оплаты",
    en: "Booking without clashes: free slots are computed automatically, and a chat opens right after payment",
  },
  impact: {
    ru: "Расписание, которому можно доверять: клиент физически не может занять чужой час, а специалист не окажется без перерыва между сессиями. На этом держится вся выручка площадки.",
    en: "A schedule you can trust: a client physically cannot take an occupied hour, and a specialist never ends up without a gap between sessions. The platform's entire revenue rests on this.",
  },
  role: {
    ru: "Приложение, модель данных, алгоритм расписания и связка оплаты с чатом.",
    en: "The app, the data model, the scheduling algorithm and the link between payment and chat.",
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
      ru: "Рабочие часы задаются по дням недели, и сетка свободного времени пересчитывается сама",
      en: "Working hours are set per weekday, and the free-time grid recomputes itself",
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
    ru: "Расчёт слотов — та часть, где обычно ломаются маркетплейсы услуг: пересечения, длительности и перерывы считаются в одном месте, а не размазаны по экранам. Оплата и чат связаны вебхуком, так что ни одна сессия не теряется между «заплатил» и «написал». Проект развивается до сих пор.",
    en: "Slot computation is where service marketplaces usually break: overlaps, durations and gaps are handled in one place instead of being smeared across screens. Payment and chat are tied by a webhook, so no session gets lost between paid and messaged. The project is still growing.",
  },
  cover: "/covers/consultations.webp",
  stack: ["Flutter", "FlutterFlow", "Firebase"],
  integrations: [],
  featured: false,
};
