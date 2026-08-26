# alkontv.ru

Двуязычное (RU/EN) портфолио Alan — fullstack-разработчика и дизайнера:
3D-главная, страница работ с кейсами и раздел с резюме.

## Технологии

- Next.js (статический экспорт), React, TypeScript, Tailwind
- react-three-fiber, DREI, GSAP — только для 3D-главной
- Самописный i18n: Zustand + словари `app/i18n/content/{en,ru}.ts`
- Контент кейсов, стека и опыта — `app/content/`

## Локальный запуск

```bash
npm install && npm run dev   # http://localhost:3000
```

## Выкладка

Сайт — статика, серверу нужен только `file_server`.

```bash
PORTFOLIO_SSH=user@host ./scripts/deploy.sh
```

Скрипт прогоняет тесты и линт, собирает статику, заливает `out/` по rsync
и проверяет, что боевые адреса отвечают 200. Падает на любом шаге, а не
выкладывает битое.

Сервер — запись `Projects` в `~/.ssh/config`, Ubuntu, Caddy 2. Статика лежит
в `/srv/alkontv`, конфигурация — `deploy/Caddyfile.alkontv`, копия боевого
`/etc/caddy/Caddyfile`. Адрес намеренно не указан: репозиторий публичный. Ключевая строка там
`try_files {path}.html {path} ...`: статический экспорт кладёт страницы как
`cases.html`, а ссылки ведут на `/cases`, и без проверки `.html` раньше
самого пути каталог перехватит запрос.

## Резюме

`public/Alan-CV-{ru,en}.pdf` собираются из того же контента, что и сайт:

```bash
npx tsx scripts/dump-content.ts > /tmp/content.json
PORTFOLIO_HOST=alkontv.ru python3 scripts/build-cv.py /tmp/content.json
```

Скрипт падает с ошибкой, если контент не помещается на страницу.

> Форк open-source портфолио [mohitvirli/mohitvirli.github.io](https://github.com/mohitvirli/mohitvirli.github.io), переработанный под Alan.
