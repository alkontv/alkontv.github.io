import type { LocalizedText } from "@i18n";

export interface StackGroup {
  label: LocalizedText;
  items: string[];
}

/**
 * Список технологий одним местом. Раньше он жил только в генераторе резюме,
 * и на сайте стек нельзя было найти нигде, кроме чипов внутри кейсов.
 * Теперь и страница, и PDF читают отсюда — разойтись не могут.
 */
export const STACK_GROUPS: StackGroup[] = [
  { label: { ru: "Mobile", en: "Mobile" }, items: ["Flutter", "FlutterFlow"] },
  {
    label: { ru: "Языки", en: "Languages" },
    items: ["TypeScript", "JavaScript", "Python", "Dart", "Go"],
  },
  { label: { ru: "Веб", en: "Web" }, items: ["React", "Next.js", "Node.js"] },
  {
    label: { ru: "Данные", en: "Data" },
    items: ["PostgreSQL", "Supabase", "Firebase", "Redis"],
  },
  {
    label: { ru: "Бэкенд", en: "Backend" },
    items: ["FastAPI", "Django REST", "Cloud Functions", "Edge Functions"],
  },
  {
    label: { ru: "Инфраструктура", en: "Infrastructure" },
    items: ["Docker", "Nginx", "VPS", "CI", "Мониторинг"],
  },
  {
    label: { ru: "Платежи", en: "Payments" },
    items: ["Эквайринг", "Подписки", "Эскроу", "Крипта"],
  },
  { label: { ru: "Дизайн", en: "Design" }, items: ["Figma", "Дизайн-токены"] },
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
