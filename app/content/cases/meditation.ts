import type { CaseStudy } from "../types";

export const meditation: CaseStudy = {
  id: "meditation",
  industry: { ru: "Здоровье и саморазвитие", en: "Wellness and self-development" },
  formats: ["mobile", "payments"],
  name: { ru: "Медитации и практики", en: "Meditation App" },
  tagline: {
    ru: "Курсы, аудио-практики и подкасты с фоновым воспроизведением и подпиской",
    en: "Courses, audio practices and podcasts with background playback and a subscription",
  },
  impact: {
    ru: "Продукт, который слушают, а не смотрят: практика продолжается с выключенным экраном, и подписка перестаёт зависеть от того, держит ли человек телефон в руке.",
    en: "A product you listen to rather than look at: the practice keeps going with the screen off, so the subscription no longer depends on holding the phone.",
  },
  role: {
    ru: "Приложение целиком, включая аудиодвижок, дописанный руками поверх сгенерированного кода, и подписки.",
    en: "The whole app, including the audio engine hand-written on top of generated code, and the subscriptions.",
  },
  problem: {
    ru: "Контентному проекту про тело, разум и душу нужно было приложение, где практику можно слушать с выключенным экраном, а полный доступ открывается по подписке.",
    en: "A content project around body, mind and soul needed an app where a practice keeps playing with the screen off, and full access opens with a subscription.",
  },
  solution: [
    {
      ru: "Обучающие курсы с уроками, аудио-медитации и подкасты",
      en: "Structured courses with lessons, audio meditations and podcasts",
    },
    {
      ru: "Фоновое воспроизведение с управлением из шторки и с заблокированного экрана",
      en: "Background playback controlled from the notification shade and the lock screen",
    },
    {
      ru: "Учёт суммарного времени практики и серии занятий",
      en: "Tracking of total practice time and streaks",
    },
    {
      ru: "Платная подписка, открывающая полный доступ",
      en: "A paid subscription unlocking full access",
    },
  ],
  highlight: {
    ru: "Аудио-продукт нельзя собрать одним конструктором: плеер, аудио-сессии и фоновое воспроизведение дописаны руками поверх сгенерированного кода. Около 51 тыс. строк, 157 файлов, версия 1.0.0+37 — релизных итераций было много.",
    en: "An audio product cannot be assembled from a builder alone: the player, audio sessions and background playback were written by hand on top of generated code. Around 51k lines, 157 files, version 1.0.0+37 — many release iterations.",
  },
  stack: ["Flutter", "FlutterFlow", "Firebase", "just_audio", "Rive", "Lottie"],
  integrations: ["RevenueCat"],
  scale: { loc: 51000, files: 157 },
  featured: false,
};
