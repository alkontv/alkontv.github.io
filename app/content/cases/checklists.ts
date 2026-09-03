import type { CaseStudy } from "../types";

export const checklists: CaseStudy = {
  id: "checklists",
  industry: { ru: "Корпоративные процессы", en: "Enterprise operations" },
  formats: ["mobile", "ai"],
  name: { ru: "Чек-листы с ассистентом", en: "Checklists with Assistant" },
  tagline: {
    ru: "Работа по инструкции: шаги с фотофиксацией, видео-гайды и ответы по регламенту",
    en: "Work by the book: steps with photo proof, video guides and answers from the manual",
  },
  impact: {
    ru: "Регламент перестаёт быть бумагой: компания видит, что шаг действительно выполнен, — с фотографией и временем. Это уже не инструкция, а доказательство.",
    en: "The procedure stops being paper: the company sees that a step was actually done, with a photo and a timestamp. That is no longer an instruction but evidence.",
  },
  role: {
    ru: "Мобильное приложение поверх API заказчика: интеграция по его контракту данных, видео-гайды, ассистент по регламенту.",
    en: "The mobile app on top of the client's API: integration against their data contract, video guides and the procedure assistant.",
  },
  problem: {
    ru: "Сотруднику на месте нужно выполнить регламент и доказать, что он его выполнил. Бумажные инструкции этого не дают, а бэкенд у заказчика уже был свой — переписывать его никто не собирался.",
    en: "A field employee must follow a procedure and prove they followed it. Paper instructions cannot do that, and the client already had their own backend that nobody was going to rewrite.",
  },
  solution: [
    {
      ru: "Назначенные чек-листы проходятся по шагам с подтверждением: да/нет, текст, фотография",
      en: "Assigned checklists are completed step by step with confirmation: yes/no, text or a photo",
    },
    {
      ru: "База видео-гайдов с разбивкой на параграфы и тайм-коды — нужный фрагмент открывается сразу",
      en: "A video guide library split into paragraphs and time codes, so the right fragment opens directly",
    },
    {
      ru: "Встроенный ассистент отвечает на вопросы по инструкции",
      en: "A built-in assistant answers questions about the procedure",
    },
    {
      ru: "Приложение работает поверх внешнего REST-бэкенда заказчика с авторизацией по токенам",
      en: "The app runs on top of the client's external REST backend with token-based auth",
    },
  ],
  highlight: {
    ru: "Кейс про встраивание в существующую инфраструктуру: бэкенд и контракт API на стороне заказчика, клиентская часть целиком на мне. Именно так чаще всего и нужно: усилить работающую систему, не останавливая её и не строя новую с нуля.",
    en: "A case about plugging into an existing infrastructure: the backend and API contract sit on the client's side, the client app is entirely mine. This is how it is most often needed: strengthen a working system without stopping it and without building a new one from scratch.",
  },
  stack: ["Flutter", "FlutterFlow", "Django REST", "JWT"],
  integrations: ["Sentry"],
  featured: false,
};
