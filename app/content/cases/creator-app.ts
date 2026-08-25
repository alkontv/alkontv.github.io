import type { CaseStudy } from "../types";

export const creatorApp: CaseStudy = {
  id: "creator-app",
  industry: { ru: "Медиа и инфобизнес", en: "Media and creator economy" },
  formats: ["mobile", "ai", "payments"],
  name: { ru: "Приложение блогера", en: "Creator App" },
  tagline: {
    ru: "Образовательный контент, комьюнити и AI-двойник автора по подписке",
    en: "Educational content, community and an AI twin of the author, by subscription",
  },
  impact: {
    ru: "Аудитория перестаёт быть чужим активом на чужой платформе: контент, комьюнити и оплата живут в приложении, которое принадлежит автору, а не алгоритму соцсети.",
    en: "The audience stops being someone else's asset on someone else's platform: content, community and payments live in an app the creator owns, not a social network's algorithm.",
  },
  role: {
    ru: "Архитектура, разработка, база с миграциями, платежи и подписка; вёрстка по дизайн-токенам из Figma.",
    en: "Architecture, development, database with migrations, payments and subscription; markup driven by Figma design tokens.",
  },
  problem: {
    ru: "Автору нужно было своё приложение вместо разрозненных площадок: образовательный контент, комьюнити и продуктивность в одном месте, с монетизацией по подписке.",
    en: "The creator needed an owned app instead of scattered platforms: educational content, community and productivity in one place, monetised by subscription.",
  },
  solution: [
    {
      ru: "Три раздела — главная, продуктивность, профиль; авторизация отдельным флоу до входа в оболочку с вкладками",
      en: "Three sections — home, productivity, profile; authentication as a separate flow before the tab shell",
    },
    {
      ru: "Контент — темы, уроки, видео, сторис, акции — наполняется напрямую в базе, без промежуточной админки в MVP",
      en: "Content — topics, lessons, video, stories, promos — is filled straight into the database, with no interim admin panel in the MVP",
    },
    {
      ru: "«Персональный чат с автором» — это AI-бот в её стиле; в интерфейсе честно не выдаётся за живого человека",
      en: "The personal chat with the author is an AI bot in her voice, and the interface does not pass it off as a live person",
    },
    {
      ru: "Поиск и ассистент на языковой модели; удаление фона у изображений вынесено в профильный сервис, а не навешено на модель",
      en: "Search and assistant backed by a language model; image background removal delegated to a dedicated service instead of the model",
    },
    {
      ru: "Подписка: платежи в приложении плюс карточный эквайринг, push-уведомления",
      en: "Subscription: in-app purchases plus card acquiring, push notifications",
    },
  ],
  highlight: {
    ru: "Единственный проект, начатый не с экспорта конструктора, а с процесса: формализованное ТЗ, дизайн-токены, вытащенные из переменных Figma, правила вёрстки, миграции базы с первого дня и письменный аудит. Около 110 экранов по макету. Это уровень процесса, который я предлагаю как норму, а не как исключение.",
    en: "The only project that started from process rather than from a builder export: a written spec, design tokens extracted from Figma variables, layout rules, database migrations from day one and a written audit. Around 110 screens in the design. This is the process level I offer as the default, not the exception.",
  },
  stack: ["Flutter", "FlutterFlow", "Supabase", "PostgreSQL", "Figma"],
  integrations: ["CloudPayments", "Apple Pay", "Google Pay"],
  featured: true,
};
