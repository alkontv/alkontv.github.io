import type { CaseStudy } from "../types";

export const ecommerce: CaseStudy = {
  id: "ecommerce",
  industry: { ru: "Ритуальная флористика", en: "Funeral floristry" },
  formats: ["web", "backend"],
  name: { ru: "Интернет-магазин", en: "E-commerce Site" },
  tagline: {
    ru: "Свой сайт вместо посредника: каталог, заявка менеджеру за секунды и органический поисковый трафик",
    en: "An own site instead of an intermediary: a catalogue, orders reaching the manager in seconds and organic search traffic",
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
      ru: "Заявка мгновенно падает в админку и дублируется в мессенджер — менеджер отвечает клиенту в первые минуты",
      en: "An order lands in the CMS instantly and is mirrored into a messenger, so the manager replies to the customer within minutes",
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
      ru: "Развёрнут на своём сервере: веб-сервер с автоматическими сертификатами, systemd-юниты, регулярные бэкапы базы",
      en: "Deployed on an own server: a web server with automatic certificates, systemd units and scheduled database backups",
    },
  ],
  highlight: {
    ru: "Здесь я отвечаю не за код, а за результат: сайт, поисковый трафик, скорость реакции на заявку и бесперебойную работу. Деплой, сертификаты и бэкапы — тоже моя зона, отдельного администратора заказчик не держит.",
    en: "Here I answer for the outcome, not the code: the site, search traffic, response time to an order and uninterrupted operation. Deployment, certificates and backups are mine too — the client keeps no separate administrator.",
  },
  stack: ["Next.js", "React", "TypeScript", "Tailwind", "Payload CMS", "PostgreSQL", "Caddy"],
  integrations: ["Telegram Bot API", "WhatsApp"],
  scale: { files: 106 },
  featured: true,
};
