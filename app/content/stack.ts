import type { LocalizedText } from "@i18n";

export interface StackGroup {
  label: LocalizedText;
  /**
   * Порядок значим: первыми идут технологии, подтверждённые проектами
   * из портфолио. В резюме попадают только первые позиции каждой группы —
   * PDF читают придирчивее всего, там должно стоять самое крепкое.
   */
  items: string[];
}

export const STACK_GROUPS: StackGroup[] = [
  {
    label: { ru: "Мобильная разработка", en: "Mobile" },
    items: [
      "Flutter", "Dart", "FlutterFlow", "Kotlin", "Swift",
      "Jetpack Compose", "SwiftUI", "Android SDK", "iOS SDK",
      "Gradle", "CocoaPods", "Codemagic", "Fastlane", "App Store Connect", "Google Play Console",
      "Push (FCM, APNs)", "Deep links", "In-app purchases",
    ],
  },
  {
    label: { ru: "Языки", en: "Languages" },
    items: ["TypeScript", "JavaScript", "Python", "Dart", "Go", "Kotlin", "Swift", "SQL", "Bash"],
  },
  {
    label: { ru: "Веб-фронтенд", en: "Web frontend" },
    items: [
      "React", "Next.js", "Vite", "Tailwind CSS", "Zustand", "TanStack Query",
      "React Router", "React Hook Form", "Zod", "Radix UI", "shadcn/ui",
      "i18next", "three.js", "react-three-fiber", "GSAP", "PWA",
    ],
  },
  {
    label: { ru: "Бэкенд", en: "Backend" },
    items: [
      "FastAPI", "Node.js", "Django REST", "Express", "NestJS",
      "SQLAlchemy", "Alembic", "Pydantic", "aiogram", "Telegraf",
      "Cloud Functions", "Edge Functions", "REST", "WebSocket", "GraphQL",
      "Celery", "ARQ", "APScheduler",
    ],
  },
  {
    label: { ru: "Базы и хранилища", en: "Databases and storage" },
    items: [
      "PostgreSQL", "Redis", "Firebase Firestore", "Supabase", "SQLite",
      "MySQL", "MongoDB", "Elasticsearch", "ClickHouse",
      "pgvector", "Chroma", "S3", "MinIO",
    ],
  },
  {
    label: { ru: "AI в продукте", en: "AI in the product" },
    items: [
      "OpenAI API", "Anthropic Claude", "Gemini", "LangChain",
      "Векторный поиск", "Эмбеддинги", "RAG", "Whisper", "ElevenLabs",
      "n8n", "OCR", "Компьютерное зрение",
    ],
  },
  {
    label: { ru: "Инфраструктура и DevOps", en: "Infrastructure and DevOps" },
    items: [
      "Docker", "Docker Compose", "Nginx", "Caddy", "Linux", "VPS",
      "GitHub Actions", "Codemagic", "CI/CD", "Kubernetes", "Traefik", "Ansible", "Terraform",
      "Cloudflare", "systemd", "Let's Encrypt", "Google Cloud Run",
    ],
  },
  {
    label: { ru: "Мониторинг и надёжность", en: "Monitoring and reliability" },
    items: [
      "Sentry", "Prometheus", "Grafana", "Loki", "OpenTelemetry",
      "Firebase Crashlytics", "Firebase Performance", "Алертинг", "Логирование",
    ],
  },
  {
    label: { ru: "Платежи и подписки", en: "Payments and subscriptions" },
    items: [
      "CloudPayments", "ЮKassa", "T-Bank", "RevenueCat", "Stripe",
      "Telegram Stars", "CryptoBot", "epoint", "Apple Pay", "Google Pay",
      "Эскроу", "Рекуррентные списания", "Вебхуки", "3-D Secure",
    ],
  },
  {
    label: { ru: "Telegram", en: "Telegram" },
    items: ["Bot API", "Mini Apps", "Web App SDK", "Payments API", "aiogram", "Telegraf"],
  },
  {
    label: { ru: "Аналитика", en: "Analytics" },
    items: [
      "Firebase Analytics", "Google Analytics", "AppMetrica", "Amplitude",
      "Событийная аналитика", "A/B-тесты", "Воронки",
    ],
  },
  {
    label: { ru: "Дизайн", en: "Design" },
    items: [
      "Figma", "Дизайн-токены", "Дизайн-системы", "Прототипирование",
      "Адаптивная вёрстка", "Rive", "Lottie",
    ],
  },
  {
    label: { ru: "Процесс и качество", en: "Process and quality" },
    items: [
      "Git", "GitHub", "GitLab", "Code review", "Яндекс Трекер", "Jira",
      "Scrum", "pytest", "Vitest", "Playwright", "Postman", "TDD",
    ],
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
