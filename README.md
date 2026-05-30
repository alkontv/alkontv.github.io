# alkontv.github.io

Двуязычное (RU/EN) 3D-портфолио Alan — fullstack-разработчика:
web, mobile, боты, CRM и продукты с AI, от идеи до запуска.

## Технологии

- Next.js, React, react-three-fiber, DREI, GSAP, Zustand, Tailwind
- Самописный i18n: Zustand + словари `app/i18n/content/{en,ru}.ts`

## Локальный запуск

```bash
docker compose up -d   # http://localhost:3000
# либо
npm install && npm run dev
```

## Деплой

GitHub Pages через `.github/workflows/nextjs.yml` (ветка `main`).
Кастомный домен — секрет `GH_PAGES_CUSTOM_DOMAIN` (сгенерирует `public/CNAME`).
Google Analytics — секрет `NEXT_PUBLIC_GA_ID`.

> Форк open-source портфолио [mohitvirli/mohitvirli.github.io](https://github.com/mohitvirli/mohitvirli.github.io), переработанный под Alan.
