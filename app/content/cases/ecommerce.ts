import type { CaseStudy } from "../types";

export const ecommerce: CaseStudy = {
  id: "ecommerce",
  industry: { ru: "Ритуальная флористика", en: "Funeral floristry" },
  formats: ["web", "backend"],
  name: { ru: "Интернет-магазин", en: "E-commerce Site" },
  tagline: {
    ru: "Замена устаревшего сайта: каталог, заявки в админку и в мессенджер, прицел на поиск",
    en: "Replacing a legacy site: catalogue, orders into a CMS and a messenger, built for search",
  },
  impact: {
    ru: "Бизнес перестал платить посреднику за собственных клиентов: трафик приходит на свой сайт, заявка попадает менеджеру за секунды, маржа остаётся внутри компании.",
    en: "The business stopped paying an intermediary for its own customers: traffic lands on its own site, an order reaches the manager in seconds, and the margin stays in-house.",
  },
  role: {
    ru: "Сайт, админка, база, миграция со старой системы, сервер и эксплуатация, поисковая оптимизация.",
    en: "Site, admin panel, database, migration off the legacy system, the server and its operation, plus search optimisation.",
  },
  problem: {
    ru: "У действующего бизнеса работал сайт на устаревшей CMS: его нельзя было развивать, а органический трафик уходил к агрегатору-посреднику, который забирал маржу за привлечение.",
    en: "A working business ran on a legacy CMS: it could not be developed further, and organic traffic went to an intermediary aggregator that took the acquisition margin.",
  },
  solution: [
    {
      ru: "Каталог с расчётом цены по размеру прямо в карточке товара, корзина, форма заявки",
      en: "A catalogue with size-based price calculation right in the product card, a cart and an order form",
    },
    {
      ru: "Заявки падают в админку и дублируются в мессенджер — менеджер согласует сумму вручную",
      en: "Orders land in the CMS and are mirrored into a messenger, where a manager confirms the amount",
    },
    {
      ru: "Скрипт миграции контента со старой CMS, чтобы не потерять накопленные страницы и позиции",
      en: "A content migration script from the old CMS so accumulated pages and rankings survive",
    },
    {
      ru: "Отдельные разделы под нишевые сегменты и B2B-страницы для оптовых покупателей",
      en: "Dedicated sections for niche segments and B2B pages for wholesale buyers",
    },
    {
      ru: "Развёрнут на собственном VPS: веб-сервер, systemd-юниты, регулярные дампы базы",
      en: "Deployed on an own VPS: web server, systemd units and scheduled database dumps",
    },
  ],
  highlight: {
    ru: "Единственный чисто веб-кейс здесь и единственный, где я отвечаю не только за код, но и за онлайн-направление бизнеса целиком: сайт, поисковый трафик, автоматизация заявок. Плюс собственная эксплуатация — деплой, сертификаты и бэкапы делаю сам.",
    en: "The only pure web case here, and the only one where I own not just the code but the whole online side of the business: the site, search traffic and order automation. Plus operations — deployment, certificates and backups are mine.",
  },
  stack: ["Next.js", "React", "TypeScript", "Tailwind", "Payload CMS", "PostgreSQL", "Caddy"],
  integrations: ["Telegram Bot API", "WhatsApp"],
  scale: { files: 106 },
  featured: true,
};
