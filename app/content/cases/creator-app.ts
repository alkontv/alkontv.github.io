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
      ru: "Контент — темы, уроки, видео, сторис, акции — живёт в базе и обновляется без выпуска новой версии приложения",
      en: "Content — topics, lessons, video, stories, promos — lives in the database and updates without shipping a new app version",
    },
    {
      ru: "«Личный чат с автором» — AI-собеседник, говорящий её стилем; интерфейс прямо сообщает, что отвечает ассистент, а не человек",
      en: "The personal chat with the author is an AI companion in her voice, and the interface says plainly that an assistant is answering, not a person",
    },
    {
      ru: "Поиск и ассистент на языковой модели; удаление фона у изображений — через специализированный сервис, чтобы работало быстро и предсказуемо",
      en: "Search and assistant backed by a language model; image background removal through a dedicated service so it stays fast and predictable",
    },
    {
      ru: "Подписка: платежи в приложении плюс карточный эквайринг, push-уведомления",
      en: "Subscription: in-app purchases plus card acquiring, push notifications",
    },
  ],
  highlight: {
    ru: "Проект, выстроенный вокруг процесса: формализованное ТЗ, дизайн-токены, вытащенные из переменных Figma, правила вёрстки, миграции базы с первого дня и письменный аудит. Около 110 экранов, и каждый совпадает с макетом с точностью до токена. Так выглядит разработка, в которой результат предсказуем с первой недели.",
    en: "A project built around process: a written spec, design tokens extracted from Figma variables, layout rules, database migrations from day one and a written audit. Around 110 screens, each matching the design down to the token. This is what development looks like when the outcome is predictable from week one.",
  },
  cover: "/covers/creator-app.webp",
  stack: ["Flutter", "FlutterFlow", "Supabase", "PostgreSQL", "Figma"],
  integrations: ["CloudPayments", "Apple Pay", "Google Pay"],
  featured: true,
};
