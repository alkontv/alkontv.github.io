import type { LocalizedText } from "@i18n";

export interface StackGroup {
  label: LocalizedText;
  items: string[];
}

/**
 * Один уровень, без деления на «основное» и «работал с»: деление читалось
 * как ограничение — всё, что попадало во второй уровень, выглядело как
 * «этим не владею».
 *
 * Групп намеренно немного и они плотные. Тринадцать групп по три-четыре
 * пункта выглядели обрывками; языки убраны в те области, где на них пишут,
 * мониторинг сведён с инфраструктурой, тесты — с аналитикой.
 *
 * Порядок внутри групп значим: первыми идут технологии, подтверждённые
 * проектами портфолио. В резюме попадают только первые позиции каждой
 * группы — PDF читают придирчивее всего.
 */
export const STACK_GROUPS: StackGroup[] = [
  {
    label: { ru: "Мобильная разработка", en: "Mobile" },
    items: [
      "Flutter", "Dart", "FlutterFlow", "Kotlin", "Swift", "SwiftUI",
      "Codemagic", "Публикация в App Store и Google Play",
    ],
  },
  {
    label: { ru: "Веб и бэкенд", en: "Web and backend" },
    items: [
      "TypeScript", "React", "Next.js", "Python", "FastAPI", "Node.js",
      "Django REST", "NestJS", "Go", "SQLAlchemy", "Serverless-функции",
      "WebSocket", "GraphQL", "Celery", "ARQ",
    ],
  },
  {
    label: { ru: "Telegram", en: "Telegram" },
    items: ["Telegram Bot API", "Mini Apps", "aiogram"],
  },
  {
    label: { ru: "Базы и хранилища", en: "Databases and storage" },
    items: ["PostgreSQL", "Redis", "Firebase", "Supabase", "MongoDB", "pgvector"],
  },
  {
    label: { ru: "AI в продукте", en: "AI in the product" },
    items: [
      "OpenAI API", "Anthropic Claude", "Gemini", "Векторный поиск",
      "Whisper", "ElevenLabs", "n8n", "Компьютерное зрение",
    ],
  },
  {
    label: { ru: "Инфраструктура и мониторинг", en: "Infrastructure and monitoring" },
    items: [
      "Docker", "Nginx", "Caddy", "GitHub Actions", "Google Cloud Run",
      "Kubernetes", "Traefik", "Ansible", "Terraform",
      "Sentry", "Prometheus", "Grafana", "Loki", "OpenTelemetry",
    ],
  },
  {
    label: { ru: "Платежи и подписки", en: "Payments and subscriptions" },
    items: [
      "CloudPayments", "ЮKassa", "T-Bank", "Продамус", "RevenueCat", "Stripe",
      "Telegram Stars", "CryptoBot", "epoint", "Эскроу",
    ],
  },
  {
    label: { ru: "Дизайн", en: "Design" },
    items: ["Figma", "Дизайн-токены", "Rive", "Lottie"],
  },
  {
    label: { ru: "Качество и аналитика", en: "Quality and analytics" },
    items: ["pytest", "Vitest", "Playwright", "TDD", "AppMetrica", "Amplitude", "A/B-тесты"],
  },
];

/**
 * Софт-скиллы как проверяемые утверждения, а не как прилагательные.
 * «Коммуникабельный, ответственный, стрессоустойчивый» не сообщает ничего
 * и удешевляет соседний конкретный текст; за каждым пунктом здесь стоит
 * факт из опыта работы.
 */
export const SOFT_SKILLS: LocalizedText[] = [
  {
    ru: "Веду проект без менеджера: сам собираю требования, оцениваю сроки и отвечаю за них",
    en: "I run a project without a manager: gathering requirements, estimating and owning the deadline",
  },
  {
    ru: "Вхожу в чужой процесс — спринты, ревью кода, задачи в трекере — и не ломаю его под себя",
    en: "I fit into someone else's process — sprints, code review, tasks in a tracker — without bending it to my habits",
  },
  {
    ru: "Беру роль лида на задачах, где нужно свести людей и решения",
    en: "I take the lead on work that needs people and decisions brought together",
  },
  {
    ru: "Объясняю технические решения нетехническому заказчику — без жаргона и без снисходительности",
    en: "I explain technical decisions to a non-technical client, without jargon and without condescension",
  },
  {
    ru: "Говорю «нет» и предлагаю более дешёвый путь, когда задача того стоит",
    en: "I say no and offer a cheaper route when the task calls for it",
  },
  {
    ru: "Учу начинающих разработчиков — значит умею объяснять, а не только делать",
    en: "I mentor junior developers, which means I can explain and not only build",
  },
];
