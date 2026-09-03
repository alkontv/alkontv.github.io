import type { CaseStudy } from "../types";

export const foodRescue: CaseStudy = {
  id: "food-rescue",
  industry: { ru: "Фудтех, Азербайджан", en: "Food tech, Azerbaijan" },
  formats: ["mobile", "payments", "admin"],
  name: { ru: "Спасение еды", en: "Food Rescue" },
  tagline: {
    ru: "Кафе продают непроданное за день со скидкой, покупатели забирают рядом с собой",
    en: "Cafes sell the day's unsold food at a discount, buyers pick it up nearby",
  },
  impact: {
    ru: "Заведение продаёт то, что иначе выбросило бы, покупатель платит заметно меньше, площадка зарабатывает на обороте. Экономика сходится у всех троих — в маркетплейсах это редкость.",
    en: "The venue sells what it would otherwise bin, the buyer pays noticeably less, the platform earns on turnover. The economics work for all three — rare in a marketplace.",
  },
  role: {
    ru: "Оба приложения — покупателя и мерчанта, платёжный контур, внутренний кошелёк, админ-панель и аналитика для бизнеса.",
    en: "Both apps — buyer and merchant — the payment flow, the in-app wallet, the admin panel and the business-side analytics.",
  },
  problem: {
    ru: "Двусторонняя площадка для локального рынка: с одной стороны кафе с остатками, с другой — покупатели рядом. Обеим сторонам нужен был свой интерфейс, а платформе — контроль партнёров.",
    en: "A two-sided platform for a local market: cafes with leftovers on one side, nearby buyers on the other. Both sides needed their own interface, and the platform needed partner control.",
  },
  solution: [
    {
      ru: "Покупатель видит ближайшие заведения на карте и в ленте, оформляет заказ и забирает его",
      en: "The buyer sees nearby venues on a map and in a feed, places an order and picks it up",
    },
    {
      ru: "Оплата картой через локальный платёжный шлюз или списание с внутреннего кошелька",
      en: "Card payment through a local gateway, or a charge against the in-app wallet",
    },
    {
      ru: "Кабинет мерчанта: приём и выполнение заказов, аналитика остатков на графиках",
      en: "A merchant cabinet: accepting and fulfilling orders, plus leftover analytics on charts",
    },
    {
      ru: "Бонусно-реферальная программа и админ-панель управления партнёрами",
      en: "A bonus and referral programme, plus an admin panel for partner management",
    },
    {
      ru: "Кластеризация маркеров, чтобы плотная карта заведений оставалась читаемой",
      en: "Marker clustering so a dense map of venues stays readable",
    },
  ],
  highlight: {
    ru: "Двусторонний маркетплейс с живыми деньгами под зарубежный рынок: локальный платёжный шлюз подключён через облачную функцию с редиректом, внутренний кошелёк держит баланс, а бизнес-сторона видит аналитику остатков на графиках — то, что в подобных проектах обычно откладывают «на потом». 77 тыс. строк, 317 файлов, два приложения и админка.",
    en: "A two-sided marketplace with real money for a foreign market: a local payment gateway wired through a cloud function with redirect, an in-app wallet holding balances, and leftover analytics on charts for the business side — the part such projects usually postpone. 77k lines, 317 files, two apps and an admin panel.",
  },
  stack: ["Flutter", "FlutterFlow", "Firebase", "Cloud Functions", "Node.js"],
  integrations: ["Google Maps", "OneSignal", "FCM"],
  scale: { loc: 76700, files: 317 },
  featured: false,
};
