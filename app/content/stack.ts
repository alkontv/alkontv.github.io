import type { LocalizedText } from "@i18n";

export interface StackGroup {
  label: LocalizedText;
  items: string[];
}

/**
 * Два уровня вместо одного длинного списка.
 *
 * Плоский перечень читается не как «много умеет», а как «много где побывал»:
 * владеть сотней технологий нельзя, и достоверность падает у всего списка
 * разом. Разделение решает это честнее, чем обрезка: читатель сразу видит,
 * где дно, а где потолок, и перестаёт искать слабое звено — граница
 * показана добровольно.
 *
 * CORE_STACK — то, за что отвечаешь на любой глубине. Всё остальное
 * выводится как «работал с» и заявлением о владении не является.
 */
export const CORE_STACK: string[] = [
  "Flutter",
  "Dart",
  "FlutterFlow",
  "TypeScript",
  "Python",
  "React",
  "Next.js",
  "FastAPI",
  "Node.js",
  "PostgreSQL",
  "Redis",
  "Supabase",
  "Firebase",
  "Docker",
  "Nginx",
  "Telegram Bot API",
  "Figma",
];

/** Полный перечень по темам. Позиции из CORE_STACK на странице не дублируются. */
export const STACK_GROUPS: StackGroup[] = [
  {
    label: { ru: "Мобильная разработка", en: "Mobile" },
    items: [
      "Flutter", "Dart", "FlutterFlow", "Kotlin", "Swift",
      "Jetpack Compose", "SwiftUI", "Codemagic", "Fastlane",
      "Публикация в App Store и Google Play",
    ],
  },
  {
    label: { ru: "Языки", en: "Languages" },
    items: ["TypeScript", "Python", "Go"],
  },
  {
    label: { ru: "Веб-фронтенд", en: "Web frontend" },
    items: ["React", "Next.js", "Tailwind CSS", "three.js / react-three-fiber", "GSAP"],
  },
  {
    label: { ru: "Бэкенд", en: "Backend" },
    items: [
      "FastAPI", "Node.js", "Django REST", "NestJS", "SQLAlchemy",
      "Serverless-функции", "WebSocket", "GraphQL", "Celery", "ARQ",
    ],
  },
  {
    label: { ru: "Базы и хранилища", en: "Databases and storage" },
    items: [
      "PostgreSQL", "Redis", "Firebase", "Supabase",
      "MongoDB", "Elasticsearch", "ClickHouse", "pgvector",
    ],
  },
  {
    label: { ru: "AI в продукте", en: "AI in the product" },
    items: [
      "OpenAI API", "Anthropic Claude", "Gemini", "LangChain",
      "Векторный поиск", "Whisper", "ElevenLabs", "n8n", "Компьютерное зрение",
    ],
  },
  {
    label: { ru: "Инфраструктура и DevOps", en: "Infrastructure and DevOps" },
    items: [
      "Docker", "Nginx", "Caddy", "GitHub Actions", "Google Cloud Run",
      "Kubernetes", "Traefik", "Ansible", "Terraform",
    ],
  },
  {
    label: { ru: "Мониторинг", en: "Monitoring" },
    items: ["Sentry", "Prometheus", "Grafana", "Loki", "OpenTelemetry"],
  },
  {
    label: { ru: "Платежи и подписки", en: "Payments and subscriptions" },
    items: [
      "CloudPayments", "ЮKassa", "T-Bank", "RevenueCat", "Stripe",
      "Telegram Stars", "CryptoBot", "epoint", "Эскроу",
    ],
  },
  {
    label: { ru: "Telegram", en: "Telegram" },
    items: ["Telegram Bot API", "Mini Apps", "aiogram"],
  },
  {
    label: { ru: "Аналитика", en: "Analytics" },
    items: ["AppMetrica", "Amplitude", "A/B-тесты"],
  },
  {
    label: { ru: "Дизайн", en: "Design" },
    items: ["Figma", "Дизайн-токены", "Rive", "Lottie"],
  },
  {
    label: { ru: "Тестирование", en: "Testing" },
    items: ["pytest", "Vitest", "Playwright", "TDD"],
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
