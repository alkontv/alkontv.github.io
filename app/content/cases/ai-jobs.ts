import type { CaseStudy } from "../types";

export const aiJobs: CaseStudy = {
  id: "ai-jobs",
  industry: { ru: "Найм, Юго-Восточная Азия", en: "Hiring, Southeast Asia" },
  formats: ["mobile", "ai", "backend"],
  name: { ru: "AI-подбор работы и исполнителей", en: "AI Job and Talent Matching" },
  tagline: {
    ru: "Резюме и вакансия собираются в диалоге, а подбор идёт векторным поиском",
    en: "Resumes and vacancies are assembled in a dialogue, and matching runs on vector search",
  },
  impact: {
    ru: "Человек рассказывает о себе словами — и доходит до конца, вместо того чтобы бросить анкету на пятом поле. Подбор при этом становится точнее: он ищет по смыслу, а не по совпадению слов.",
    en: "A person describes themselves in words — and finishes, instead of abandoning a form at the fifth field. Matching gets sharper too: it searches by meaning, not word overlap.",
  },
  role: {
    ru: "Приложение, база с векторным поиском, диалоговый онбординг и подбор, многоязычность с автопереводом.",
    en: "The app, a database with vector search, the conversational onboarding and matching, plus multilingual support with auto-translation.",
  },
  problem: {
    ru: "Форма из двадцати полей убивает конверсию, а поиск по ключевым словам не понимает, что «нянчить детей» и «присмотр за ребёнком» — одно и то же. Нужно было убрать и то, и другое.",
    en: "A twenty-field form kills conversion, and keyword search does not know that babysitting and childcare are the same thing. Both had to go.",
  },
  solution: [
    {
      ru: "Работодатель описывает задачу голосом или текстом, диалог уточняет детали и собирает структурированное описание",
      en: "The employer describes the job by voice or text; a dialogue clarifies details and assembles a structured description",
    },
    {
      ru: "Соискатель создаёт резюме тем же способом — диалогом из пяти шагов вместо анкеты",
      en: "The candidate builds a resume the same way — a five-step dialogue instead of a form",
    },
    {
      ru: "Подбор идёт векторным поиском по смыслу, а не по совпадению слов",
      en: "Matching runs on vector search by meaning rather than word overlap",
    },
    {
      ru: "Чат с переводом сообщений, отзывы, жалобы, сохранённые объявления",
      en: "Chat with message translation, reviews, complaints and saved listings",
    },
    {
      ru: "Три языка интерфейса с автопереводом пользовательского контента",
      en: "Three interface languages with automatic translation of user content",
    },
  ],
  highlight: {
    ru: "Лучший в списке пример «AI как способ ввода данных»: на входе разговор, на выходе структурированная запись в базе, по которой работает векторный поиск. Базовый сценарий замкнут сквозно — регистрация, резюме, подбор, чат, отзыв.",
    en: "The best example here of AI as an input method: a conversation goes in, a structured database record comes out, and vector search runs on top of it. The core flow is closed end to end — sign-up, resume, matching, chat, review.",
  },
  stack: ["Flutter", "FlutterFlow", "Supabase", "PostgreSQL"],
  integrations: [],
  scale: { loc: 51100, files: 185 },
  diagram: "ai-intake",
  featured: true,
};
