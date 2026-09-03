import type { CaseStudy } from "../types";

export const familyNetwork: CaseStudy = {
  id: "family-network",
  industry: { ru: "Социальные сети", en: "Social networks" },
  formats: ["mobile", "web"],
  name: { ru: "Семейная соцсеть", en: "Family Network" },
  tagline: {
    ru: "Родственники на орбитах по степени родства вместо привычной ленты",
    en: "Relatives on orbits by degree of kinship instead of a conventional feed",
  },
  impact: {
    ru: "Соцсеть, которую невозможно спутать с другой: вместо ленты — карта рода. Именно она заставляет людей приводить туда родственников, а не листать чужие посты.",
    en: "A social network you cannot mistake for another: a map of kinship instead of a feed. That is what makes people bring their relatives in rather than scroll strangers' posts.",
  },
  role: {
    ru: "Приложение и веб на общей кодовой базе, графическая механика орбит, написанная с нуля, серверная часть на облачных функциях.",
    en: "App and web from one codebase, the orbital graphics mechanic written from scratch, and the server side on cloud functions.",
  },
  problem: {
    ru: "Заказчик хотел не очередное семейное древо списком, а метафору: семья как планетарная система, где пользователь в центре, а родня расходится по орбитам.",
    en: "The client did not want another list-shaped family tree, but a metaphor: the family as a planetary system with the user at the centre and relatives spread across orbits.",
  },
  solution: [
    {
      ru: "Орбитальная визуализация: первая орбита — родители и партнёры, вторая — дети, третья — братья и сёстры, четвёртая — предки",
      en: "Orbital visualisation: first orbit for parents and partners, second for children, third for siblings, fourth for ancestors",
    },
    {
      ru: "Посты с медиа, реакции и чаты между родственниками",
      en: "Posts with media, reactions and chats between relatives",
    },
    {
      ru: "Профили умерших родственников с доступом по паролю — семейная память как закрытый раздел",
      en: "Profiles of deceased relatives behind a password — family memory as a private section",
    },
    {
      ru: "Мобильная и веб-версии на общей кодовой базе",
      en: "Mobile and web builds from one codebase",
    },
  ],
  highlight: {
    ru: "Орбиты родства считаются и отрисовываются кодом, написанным с нуля: готового компонента для такого не существует. Плюс деликатная предметная область, где приватность — не функция, а условие, и память об ушедших закрыта паролем. 39 тыс. строк, 199 файлов.",
    en: "Kinship orbits are computed and drawn by code written from scratch: no off-the-shelf component does this. Plus a delicate subject area where privacy is a condition rather than a feature, and the memory of the departed sits behind a password. 39k lines, 199 files.",
  },
  stack: ["Flutter", "FlutterFlow", "Firebase", "Cloud Functions"],
  integrations: [],
  scale: { loc: 39400, files: 199 },
  featured: false,
};
