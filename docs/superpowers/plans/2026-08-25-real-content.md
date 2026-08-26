# Реальный контент портфолио — план реализации

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Заменить весь выдуманный контент портфолио реальными обезличенными кейсами и собрать из одного источника три формата — 3D-сайт, страницу `/cases` и PDF.

**Architecture:** Новый модуль `app/content/` становится единственным источником правды: типы, сводные цифры, таймлайн и 14 файлов кейсов на двух языках. Существующие `app/constants/{projects,work}.ts` перестают хранить данные и превращаются в проекции этого модуля, поэтому 3D-компоненты переписывать не нужно. Страница `/cases` и PDF читают тот же модуль.

**Tech Stack:** Next.js 16 (App Router, `output: 'export'`), React 19, TypeScript 6, Tailwind v4, Zustand 5, react-three-fiber v9 + drei v10, GSAP, vitest 2.

**Spec:** `docs/superpowers/specs/2026-08-25-real-content-design.md`

## Global Constraints

Требования ниже действуют для каждой задачи плана.

- **Рабочая директория:** `/Users/alkontv/Code/Portfolio`. Ветка — `feature/real-content`, создаётся в Task 1. Прямо в `main` не коммитить.
- **Язык коммитов и комментариев — русский.** Формат `type(scope): тема`, тело объясняет «зачем». Трейлер `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>` в каждом коммите.
- **Обезличивание — абсолютное.** Ни одного названия клиента, клиентского продукта или своего продукта: ни в коде, ни в комментариях, ни в текстах кейсов, ни в именах файлов. Разрешено называть только технологии и вендоров (`Supabase`, `CloudPayments`, `Foodics`, `RevenueCat`) — они не идентифицируют заказчика.
- **Никаких выдуманных фактов.** Каждое утверждение в кейсе восходит к карточке хранилища. Статус берётся оттуда же и не завышается.
- **Суммы — только фактически полученные деньги**, не стоимость контракта. Где деньги не получены или проект свой — поля `budget` нет.
- **Периодов и дат в кейсах нет.** Обоснование — §6.1 спеки.
- **Ограничение шрифта для 3D.** Любой EN-текст, попадающий в 3D-сцену (`name.en` у featured-кейсов, `title.en` и `subtitle.en` таймлайна, метки статусов), содержит только символы `A-Z a-z 0-9`, пробел, `-`, `&`, `.`, `,`, `/`, `(`, `)`. Шрифт `soria` не содержит `—`, `–`, `·`, `«»`, `«"»` — см. коммит `9524d34`. RU-тексты рисуются JetBrains Mono, там ограничения нет.
- **Перед каждым коммитом зелёные:** `npm test`, `npm run lint`, `npm run build`.
- Husky на pre-commit прогоняет `eslint --fix` по staged-файлам. Если хук мешает при отладке — `HUSKY=0 git commit ...`, но финально код проходит линт.
- Импорты идут через алиасы из `tsconfig.json`: `@i18n`, `@stores`, `@types`, `@constants`. В Task 2 добавляется `@content`.

---

## Структура файлов

**Создаётся:**

| Файл | Ответственность |
|---|---|
| `app/content/types.ts` | Типы `CaseStudy`, `CaseFormat`, `CaseStatus`, `DiagramId`, `TimelineEntry` |
| `app/content/stats.ts` | Сводные цифры и метки статусов |
| `app/content/timeline.ts` | Пять вех карьеры, двуязычно, без 3D-координат |
| `app/content/cases/*.ts` | По файлу на кейс, 14 штук |
| `app/content/cases/index.ts` | `CASES`, `FEATURED_CASES`, `getCase(id)` |
| `app/content/index.ts` | Бочка экспортов модуля |
| `app/content/__tests__/cases.test.ts` | Инварианты контента |
| `app/cases/page.tsx` | Страница `/cases` |
| `app/cases/CaseCard.tsx` | Карточка одного кейса |
| `app/cases/FormatFilter.tsx` | Клиентский фильтр по формату |
| `app/cases/CasesHeader.tsx` | Шапка с лидом, цифрами и CTA |
| `app/cases/SkillsBlock.tsx` | Блок «что умею» |
| `app/cases/diagrams/*.tsx` | Четыре inline-SVG диаграммы |
| `app/opengraph-image.tsx` | Генерация OG-картинки на сборке |

**Изменяется:**

| Файл | Что меняется |
|---|---|
| `app/types/projects.ts` | `Project.title` становится `LocalizedText`, `date` → `status` |
| `app/constants/projects.ts` | Из хранилища данных становится проекцией `FEATURED_CASES` |
| `app/constants/work.ts` | Становится проекцией `TIMELINE` с сохранением 3D-координат |
| `app/components/experience/projects/ProjectTile.tsx` | Резолв языка для `title`, метка статуса вместо даты |
| `app/i18n/langStore.ts` | Автоопределение языка по браузеру при первом визите |
| `app/i18n/types.ts` | Ключи `cases` для страницы `/cases` |
| `app/i18n/content/{en,ru}.ts` | Тексты страницы `/cases` |
| `app/layout.tsx` | Метаданные под новое позиционирование |
| `app/constants/footer.ts` | Ссылка на PDF-презентацию |
| `tsconfig.json` | Алиас `@content` |
| `public/Alan-CV-{ru,en}.pdf` | Перегенерируются на реальных фактах |
| `public/Alan-Cases-{ru,en}.pdf` | Новые файлы |

---

## Task 1: Ветка и зелёная база

Прежде чем что-то менять, убеждаемся, что репозиторий собирается. `node_modules` сейчас отсутствует.

**Files:**
- Modify: нет (только окружение и ветка)

**Interfaces:**
- Consumes: —
- Produces: рабочее окружение для всех последующих задач

- [ ] **Step 1: Создать ветку**

```bash
cd /Users/alkontv/Code/Portfolio
git checkout -b feature/real-content
```

- [ ] **Step 2: Поставить зависимости**

```bash
npm install
```

Ожидание: `node_modules` появляется, ошибок нет. Husky ставится через `prepare`.

- [ ] **Step 3: Прогнать тесты, линт и сборку на нетронутом коде**

```bash
npm test && npm run lint && npm run build
```

Ожидание: три зелёных прогона. Тестов сейчас три файла в `app/i18n/__tests__/`. Сборка кладёт статику в `out/`.

Если что-то падает **до** наших изменений — чинить это отдельно и не смешивать с контентом.

- [ ] **Step 4: Закоммитить спеку**

Спека уже написана, но не закоммичена.

```bash
git add docs/superpowers/specs/2026-08-25-real-content-design.md docs/superpowers/plans/2026-08-25-real-content.md
git commit -m "docs: спека и план реального контента портфолио

Фаза 1 закрыта и задеплоена, но весь контент сайта выдуман: шесть
несуществующих проектов, плейсхолдер-таймлайн и резюме с теми же
выдуманными кейсами. Клиент, нажавший VIEW, попадает на пустой профиль
GitHub — это хуже отсутствия сайта.

Спека фиксирует замену на 14 реальных обезличенных кейсов и сборку трёх
форматов из одного источника контента.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 2: Каркас контент-модуля — типы, цифры, алиас

**Files:**
- Create: `app/content/types.ts`
- Create: `app/content/stats.ts`
- Create: `app/content/index.ts`
- Create: `app/content/__tests__/stats.test.ts`
- Modify: `tsconfig.json`

**Interfaces:**
- Consumes: `LocalizedText` из `@i18n`
- Produces: `CaseStudy`, `CaseFormat`, `CaseStatus`, `DiagramId`, `TimelineEntry`, `STATS`, `STATUS_LABEL`, `FORMAT_LABEL` — на них опираются Task 3–13

- [ ] **Step 1: Написать падающий тест**

Create `app/content/__tests__/stats.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { STATS, STATUS_LABEL, FORMAT_LABEL } from "../stats";

// EN-строки уходят в 3D-сцену, где шрифт soria не содержит типографских
// символов. Ограничение продублировано тестом, чтобы не всплыло на проде.
const ASCII_SAFE = /^[A-Za-z0-9 \-&.,/()]+$/;

describe("сводные цифры", () => {
  it("совпадают с логом платежей хранилища", () => {
    expect(STATS.revenueRub).toBe(2234980);
    expect(STATS.paidProjects).toBe(18);
    expect(STATS.repos).toBe(52);
    expect(STATS.mentees).toBe(5);
  });
});

describe("метки статусов", () => {
  it("покрывают все пять статусов", () => {
    expect(Object.keys(STATUS_LABEL).sort()).toEqual(
      ["active", "beta", "mvp", "production", "shipped"]
    );
  });

  it("EN-метки безопасны для шрифта 3D-сцены", () => {
    for (const label of Object.values(STATUS_LABEL)) {
      expect(label.en).toMatch(ASCII_SAFE);
    }
  });
});

describe("метки форматов", () => {
  it("покрывают все семь форматов", () => {
    expect(Object.keys(FORMAT_LABEL).sort()).toEqual(
      ["admin", "ai", "backend", "mobile", "payments", "telegram", "web"]
    );
  });
});
```

- [ ] **Step 2: Запустить тест и убедиться, что он падает**

```bash
npx vitest run app/content/__tests__/stats.test.ts
```

Ожидание: FAIL — `Failed to resolve import "../stats"`.

- [ ] **Step 3: Создать типы**

Create `app/content/types.ts`:

```ts
import type { LocalizedText } from "@i18n";

/** Чем закрыт кейс — используется для фильтра и чипов на /cases. */
export type CaseFormat =
  | "mobile"
  | "web"
  | "telegram"
  | "backend"
  | "ai"
  | "admin"
  | "payments";

/** Статус берётся из карточки хранилища и не завышается. */
export type CaseStatus = "shipped" | "production" | "beta" | "active" | "mvp";

export type DiagramId = "sos" | "escrow" | "vpn" | "ai-intake";

export interface CaseStudy {
  /** Якорь на /cases и цель ссылки из 3D-плитки. */
  id: string;
  industry: LocalizedText;
  formats: CaseFormat[];
  /** Обезличенное имя-описание. name.en уходит в 3D — только ASCII. */
  name: LocalizedText;
  /** Фактически полученные деньги в рублях. Нет — если не получены или проект свой. */
  budget?: number;
  status: CaseStatus;
  /** Одна строка для 3D-плитки и подзаголовка карточки. */
  tagline: LocalizedText;
  problem: LocalizedText;
  solution: LocalizedText[];
  /** Инженерная соль: почему кейс стоит показывать. */
  highlight: LocalizedText;
  stack: string[];
  integrations: string[];
  scale?: { loc?: number; files?: number };
  diagram?: DiagramId;
  /** Попадает в 3D-карусель. Ровно шесть кейсов — под раскладку ProjectsCarousel. */
  featured: boolean;
}

export interface TimelineEntry {
  year: string;
  title: LocalizedText;
  subtitle: LocalizedText;
}
```

- [ ] **Step 4: Создать цифры и метки**

Create `app/content/stats.ts`:

```ts
import type { LocalizedText } from "@i18n";
import type { CaseFormat, CaseStatus } from "./types";

/**
 * Источник — лог платежей хранилища («Клиентские проекты») на 18.08.2026.
 * Число репозиториев сверено с GitHub 25.08.2026.
 */
export const STATS = {
  revenueRub: 2234980,
  paidProjects: 18,
  repos: 52,
  mentees: 5,
} as const;

export const STATUS_LABEL: Record<CaseStatus, LocalizedText> = {
  shipped: { ru: "СДАН", en: "SHIPPED" },
  production: { ru: "В ПРОДЕ", en: "IN PROD" },
  beta: { ru: "БЕТА", en: "BETA" },
  active: { ru: "В РАБОТЕ", en: "ACTIVE" },
  mvp: { ru: "MVP", en: "MVP" },
};

export const FORMAT_LABEL: Record<CaseFormat, LocalizedText> = {
  mobile: { ru: "Мобильное", en: "Mobile" },
  web: { ru: "Веб", en: "Web" },
  telegram: { ru: "Telegram", en: "Telegram" },
  backend: { ru: "Бэкенд", en: "Backend" },
  ai: { ru: "AI", en: "AI" },
  admin: { ru: "Админка", en: "Admin" },
  payments: { ru: "Платежи", en: "Payments" },
};
```

- [ ] **Step 5: Создать бочку экспортов**

Create `app/content/index.ts`:

```ts
export * from "./types";
export * from "./stats";
```

- [ ] **Step 6: Добавить алиас**

Modify `tsconfig.json` — в `compilerOptions.paths` рядом с `"@i18n"`:

```json
      "@content": [
        "./app/content"
      ]
```

- [ ] **Step 7: Запустить тест и убедиться, что он проходит**

```bash
npx vitest run app/content/__tests__/stats.test.ts
```

Ожидание: PASS, 4 теста.

- [ ] **Step 8: Проверить сборку и закоммитить**

```bash
npm test && npm run lint && npm run build
git add app/content tsconfig.json
git commit -m "feat(content): каркас контент-модуля — типы, цифры, метки

Заводим единственный источник правды для трёх форматов сразу: 3D-сайта,
страницы кейсов и PDF. Раньше контент лежал в constants и дублировался бы
при добавлении страницы и презентации.

Тест на цифры защищает от расхождения со сводной суммой из лога платежей,
тест на ASCII — от символов, которых нет в шрифте 3D-сцены.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 3: Кейсы 1–5

Пять карточек. Каждая — отдельный файл, чтобы правка одного кейса не трогала остальные.

**Files:**
- Create: `app/content/cases/safety.ts`
- Create: `app/content/cases/creator-app.ts`
- Create: `app/content/cases/meditation.ts`
- Create: `app/content/cases/family-network.ts`
- Create: `app/content/cases/consultations.ts`

**Interfaces:**
- Consumes: `CaseStudy` из `../types`
- Produces: именованные экспорты `safety`, `creatorApp`, `meditation`, `familyNetwork`, `consultations` — собираются в `cases/index.ts` в Task 5

- [ ] **Step 1: Кейс «личная безопасность»**

Create `app/content/cases/safety.ts`:

```ts
import type { CaseStudy } from "../types";

export const safety: CaseStudy = {
  id: "safety",
  industry: { ru: "Личная безопасность", en: "Personal safety" },
  formats: ["mobile", "backend", "payments"],
  name: { ru: "Приложение личной безопасности", en: "Personal Safety App" },
  budget: 110000,
  status: "beta",
  tagline: {
    ru: "Одна кнопка: обращение в службу спасения, координаты доверенным лицам и видео с камеры",
    en: "One button: an emergency report, coordinates to trusted contacts, camera video",
  },
  problem: {
    ru: "Человеку в опасности некогда выбирать между «позвонить», «написать» и «включить запись». Нужно было приложение, где всё это делает одно нажатие.",
    en: "A person in danger has no time to choose between calling, texting and hitting record. The app had to do all three from a single tap.",
  },
  solution: [
    {
      ru: "Вход по номеру телефона: одноразовый код через SMS-шлюз, подключённый к GoTrue собственным хуком",
      en: "Phone sign-in: a one-time code through an SMS gateway wired into GoTrue with a custom hook",
    },
    {
      ru: "Сценарий SOS: обращение в службу спасения с текстом заявления, координатами и ссылкой на видео",
      en: "SOS flow: an emergency report carrying the statement text, coordinates and a video link",
    },
    {
      ru: "Одновременно — SMS доверенным лицам с координатами и короткой ссылкой, событие пишется в базу",
      en: "In parallel: SMS to trusted contacts with coordinates and a short link, plus an event row in the database",
    },
    {
      ru: "Видео с фронтальной камеры в хранилище за подписанными ссылками: 14 дней, а если участвовало в SOS — бессрочно",
      en: "Front-camera video in storage behind signed URLs: 14 days, or kept forever if it was part of an SOS",
    },
    {
      ru: "Подписка с рекуррентными списаниями, тарифами и промокодами",
      en: "Subscription with recurring charges, tiers and promo codes",
    },
  ],
  highlight: {
    ru: "Инфраструктура развёрнута самостоятельно, а не взята облаком: схема PostgreSQL с триггерами и функциями, авторизация с собственным хуком на SMS-шлюз, хранилище с подписанными ссылками, edge-функции на Deno, свой домен. Единственный кейс, где весь стек собран руками под сценарий, критичный по надёжности.",
    en: "The infrastructure was deployed by hand instead of taken from a managed cloud: a PostgreSQL schema with triggers and functions, auth with a custom SMS-gateway hook, storage behind signed URLs, Deno edge functions, own domain. The only case here where the whole stack was built by hand for a reliability-critical scenario.",
  },
  stack: ["Flutter", "Supabase (self-hosted)", "PostgreSQL", "Deno", "TypeScript"],
  integrations: ["CloudPayments", "SMSC.ru"],
  diagram: "sos",
  featured: true,
};
```

- [ ] **Step 2: Кейс «приложение блогера»**

Create `app/content/cases/creator-app.ts`:

```ts
import type { CaseStudy } from "../types";

export const creatorApp: CaseStudy = {
  id: "creator-app",
  industry: { ru: "Медиа и инфобизнес", en: "Media and creator economy" },
  formats: ["mobile", "ai", "payments"],
  name: { ru: "Приложение блогера с подпиской", en: "Creator Subscription App" },
  status: "active",
  tagline: {
    ru: "Образовательный контент, комьюнити и AI-двойник автора по подписке",
    en: "Educational content, community and an AI twin of the author, by subscription",
  },
  problem: {
    ru: "У автора с большой аудиторией контент жил в соцсетях и не приносил подписочной выручки. Нужно было своё приложение: уроки, комьюнити, продуктивность — и монетизация.",
    en: "A creator with a large audience had all content living on social platforms and no subscription revenue. The ask was an owned app: lessons, community, productivity — and monetisation.",
  },
  solution: [
    {
      ru: "Три раздела — главная, продуктивность, профиль; авторизация отдельным флоу до входа в оболочку с вкладками",
      en: "Three sections — home, productivity, profile; authentication as a separate flow before the tab shell",
    },
    {
      ru: "Контент (темы, уроки, видео, сторис, акции) наполняется напрямую в базе, без промежуточной админки в MVP",
      en: "Content (topics, lessons, video, stories, promos) is filled straight into the database, with no interim admin panel in the MVP",
    },
    {
      ru: "«Персональный чат с автором» — это AI-бот в её стиле; в интерфейсе честно не выдаётся за живого человека",
      en: "The personal chat with the author is an AI bot in her voice, and the interface does not pass it off as a live person",
    },
    {
      ru: "Поиск и ассистент на LLM; удаление фона у изображений вынесено в профильный сервис, а не навешено на модель",
      en: "LLM-backed search and assistant; image background removal delegated to a dedicated service instead of the model",
    },
    {
      ru: "Подписка: платежи в приложении плюс карточный эквайринг, push-уведомления",
      en: "Subscription: in-app purchases plus card acquiring, push notifications",
    },
  ],
  highlight: {
    ru: "Единственный проект, начатый не с экспорта конструктора, а с процесса: формализованное ТЗ, дизайн-токены, вытащенные из переменных Figma, правила вёрстки, миграции базы с первого дня и письменный аудит. Около 110 экранов по макету. Это уровень процесса, который я предлагаю как норму, а не как исключение.",
    en: "The only project that started from process rather than from a builder export: a written spec, design tokens extracted from Figma variables, layout rules, database migrations from day one and a written audit. Around 110 screens in the design. This is the process level I offer as the default, not the exception.",
  },
  stack: ["Flutter", "FlutterFlow", "Supabase", "PostgreSQL", "Figma"],
  integrations: ["OpenAI / Gemini", "CloudPayments", "Apple Pay", "Google Pay"],
  featured: true,
};
```

- [ ] **Step 3: Кейс «медитации»**

Create `app/content/cases/meditation.ts`:

```ts
import type { CaseStudy } from "../types";

export const meditation: CaseStudy = {
  id: "meditation",
  industry: { ru: "Здоровье и саморазвитие", en: "Wellness and self-development" },
  formats: ["mobile", "payments"],
  name: { ru: "Платформа медитаций и практик", en: "Meditation Platform" },
  budget: 100000,
  status: "shipped",
  tagline: {
    ru: "Курсы, аудио-практики и подкасты с фоновым воспроизведением и подпиской",
    en: "Courses, audio practices and podcasts with background playback and a subscription",
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
      ru: "Платная подписка, открывающая полный доступ, и разовые покупки",
      en: "A paid subscription unlocking full access, plus one-off purchases",
    },
  ],
  highlight: {
    ru: "Аудио-продукт нельзя собрать одним конструктором: плеер, аудио-сессии и фоновое воспроизведение дописаны руками поверх сгенерированного кода. Около 51 тыс. строк, 157 файлов, версия 1.0.0+37 — релизных итераций было много.",
    en: "An audio product cannot be assembled from a builder alone: the player, audio sessions and background playback were written by hand on top of generated code. Around 51k lines, 157 files, version 1.0.0+37 — many release iterations.",
  },
  stack: ["Flutter", "FlutterFlow", "Firebase", "just_audio", "Rive", "Lottie"],
  integrations: ["RevenueCat", "ЮKassa"],
  scale: { loc: 51000, files: 157 },
  featured: false,
};
```

- [ ] **Step 4: Кейс «семейная соцсеть»**

Create `app/content/cases/family-network.ts`:

```ts
import type { CaseStudy } from "../types";

export const familyNetwork: CaseStudy = {
  id: "family-network",
  industry: { ru: "Социальные сети", en: "Social networks" },
  formats: ["mobile", "web"],
  name: { ru: "Семейная соцсеть", en: "Family Social Network" },
  budget: 272000,
  status: "mvp",
  tagline: {
    ru: "Родственники на орбитах по степени родства вместо привычной ленты",
    en: "Relatives on orbits by degree of kinship instead of a conventional feed",
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
    ru: "Своя графическая механика внутри проекта на конструкторе — редкий случай: орбиты считаются и рисуются поверх сгенерированного интерфейса. Плюс деликатная предметная область, где приватность не фича, а требование.",
    en: "A custom graphics mechanic inside a builder-based project — orbits are computed and drawn over the generated UI. Plus a delicate subject area where privacy is a requirement, not a feature.",
  },
  stack: ["Flutter", "FlutterFlow", "Firebase", "Cloud Functions"],
  integrations: [],
  scale: { loc: 39400, files: 199 },
  featured: false,
};
```

- [ ] **Step 5: Кейс «маркетплейс консультаций»**

Create `app/content/cases/consultations.ts`:

```ts
import type { CaseStudy } from "../types";

export const consultations: CaseStudy = {
  id: "consultations",
  industry: { ru: "Консультации и услуги", en: "Consulting and services" },
  formats: ["mobile", "payments"],
  name: { ru: "Маркетплейс консультаций", en: "Consultations Marketplace" },
  budget: 242500,
  status: "active",
  tagline: {
    ru: "Запись к специалисту с расчётом свободных слотов и авточатом после оплаты",
    en: "Booking a specialist with computed free slots and an auto-created chat after payment",
  },
  problem: {
    ru: "Площадке для записи к консультантам и психологам нужна была честная сетка времени: чтобы клиент не мог забронировать занятый час и чтобы у специалиста оставался перерыв между сессиями.",
    en: "A platform for booking consultants and therapists needed an honest time grid: a client must not be able to book an occupied hour, and the specialist must keep a gap between sessions.",
  },
  solution: [
    {
      ru: "Алгоритм расчёта доступных слотов: рабочие часы специалиста, уже занятые интервалы с их длительностями и обязательный перерыв между сессиями",
      en: "A slot algorithm combining the specialist's working hours, already booked intervals with their durations and a mandatory gap between sessions",
    },
    {
      ru: "Отдельный тип данных под рабочие часы: день, время начала, время окончания",
      en: "A dedicated data type for working hours: day, start time, end time",
    },
    {
      ru: "Автоматическое создание чата клиент↔специалист по факту успешной оплаты, через платёжный вебхук",
      en: "A client-to-specialist chat created automatically on successful payment, driven by a payment webhook",
    },
    {
      ru: "Каталог специалистов и услуг, история записей",
      en: "A catalogue of specialists and services, plus booking history",
    },
  ],
  highlight: {
    ru: "Расчёт слотов — та часть, где обычно ломаются маркетплейсы услуг: пересечения, длительности и перерывы считаются в одном месте, а не размазаны по экранам. Проект ведётся до сих пор.",
    en: "Slot computation is where service marketplaces usually break: overlaps, durations and gaps are handled in one place instead of being smeared across screens. The project is still ongoing.",
  },
  stack: ["Flutter", "FlutterFlow", "Firebase", "Cloud Functions"],
  integrations: [],
  featured: false,
};
```

- [ ] **Step 6: Проверить типизацию**

```bash
npx tsc --noEmit
```

Ожидание: ошибок нет. Кейсы пока никем не импортируются — проверяется только корректность типов.

- [ ] **Step 7: Коммит**

```bash
git add app/content/cases
git commit -m "feat(content): кейсы 1-5 — безопасность, блогер, медитации, соцсеть, консультации

Первая пятёрка обезличенных карточек. Названий клиентов и продуктов нет
нигде: отрасль, задача, решение, инженерная соль, стек. Суммы — только
фактически полученные, статусы взяты из карточек хранилища.

Каждый кейс отдельным файлом, чтобы правка одного не задевала остальные.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 4: Кейсы 6–10

**Files:**
- Create: `app/content/cases/loyalty.ts`
- Create: `app/content/cases/vehicle-sharing.ts`
- Create: `app/content/cases/food-rescue.ts`
- Create: `app/content/cases/escrow-marketplace.ts`
- Create: `app/content/cases/ecommerce.ts`

**Interfaces:**
- Consumes: `CaseStudy` из `../types`
- Produces: экспорты `loyalty`, `vehicleSharing`, `foodRescue`, `escrowMarketplace`, `ecommerce`

- [ ] **Step 1: Кейс «лояльность пекарни»**

Create `app/content/cases/loyalty.ts`:

```ts
import type { CaseStudy } from "../types";

export const loyalty: CaseStudy = {
  id: "loyalty",
  industry: { ru: "Ритейл и общепит, ОАЭ", en: "Retail and food service, UAE" },
  formats: ["mobile", "backend"],
  name: { ru: "Программа лояльности пекарни", en: "Bakery Loyalty Program" },
  budget: 75000,
  status: "shipped",
  tagline: {
    ru: "Тонкий клиент с персональным QR поверх кассовой системы заведения",
    en: "A thin client with a personal QR code on top of the venue point-of-sale system",
  },
  problem: {
    ru: "У пекарни уже работала кассовая система со своей логикой чеков. Приложение не должно было считать баллы само — ему следовало показывать покупателю его профиль и выдавать код, который кассир сканирует.",
    en: "The bakery already ran a point-of-sale system with its own receipt logic. The app was not supposed to count points itself — it had to show the customer their profile and produce a code for the cashier to scan.",
  },
  solution: [
    {
      ru: "Вход по номеру телефона, профиль с балансом баллов, уровнем, прогрессом и кэшбэком",
      en: "Phone sign-in, a profile with point balance, tier, progress and cashback",
    },
    {
      ru: "Персональный QR-код для сканирования на кассе, каталог и поиск, скретч-механика бонусов",
      en: "A personal QR code for the till, catalogue with search, and a scratch-card bonus mechanic",
    },
    {
      ru: "Начисление, списание и сжигание баллов, пересчёт уровней и обработка событий кассы — во внешнем сервисе, а не в приложении",
      en: "Earning, spending and expiry of points, tier recalculation and till event handling live in an external service, not in the app",
    },
    {
      ru: "Локализация на английский и арабский с поддержкой правостороннего письма",
      en: "English and Arabic localisation with right-to-left support",
    },
  ],
  highlight: {
    ru: "Разделение ответственности сделано осознанно: движок лояльности вынесен на облачный runtime и интегрирован с кассовой системой через OAuth2 и вебхуки, а мобильное приложение осталось тонким клиентом. Плюс работа под ближневосточный рынок с арабской локализацией.",
    en: "The separation of concerns was deliberate: the loyalty engine sits on a cloud runtime and integrates with the point-of-sale system over OAuth2 and webhooks, while the mobile app stays a thin client. Plus delivery for a Middle Eastern market with Arabic localisation.",
  },
  stack: ["Flutter", "FlutterFlow", "Firebase", "Google Cloud Run", "Node.js"],
  integrations: ["Foodics", "OAuth2", "FCM"],
  scale: { loc: 17700, files: 116 },
  featured: false,
};
```

- [ ] **Step 2: Кейс «шеринг техники»**

Create `app/content/cases/vehicle-sharing.ts`:

```ts
import type { CaseStudy } from "../types";

export const vehicleSharing: CaseStudy = {
  id: "vehicle-sharing",
  industry: { ru: "Туризм и шеринг", en: "Travel and sharing" },
  formats: ["mobile"],
  name: { ru: "Шеринг мототехники и лодок", en: "Powersports and Boat Sharing" },
  budget: 100000,
  status: "shipped",
  tagline: {
    ru: "Владелец публикует поездку с маршрутом, остальные бронируют места",
    en: "An owner publishes a ride with a route, others book seats on it",
  },
  problem: {
    ru: "Нужен был шеринг не автомобилей, а мотоциклов, квадроциклов, багги, гидроциклов и лодок — где важны маршрут, число мест и ограничение по весу пассажира.",
    en: "The ask was sharing not for cars but for motorcycles, quad bikes, buggies, jet skis and boats — where the route, seat count and passenger weight limit all matter.",
  },
  solution: [
    {
      ru: "Водитель добавляет транспорт с категорией и создаёт поездку: точка А, промежуточные точки, точка Б, даты до десяти дней, цена, число мест, ограничение по весу",
      en: "The driver registers a vehicle with its category and creates a ride: origin, waypoints, destination, dates up to ten days out, price, seat count and weight limit",
    },
    {
      ru: "Пассажир ищет поездки по городу и дате, фильтрует по расстоянию от себя, бронирует места и смотрит маршрут на карте",
      en: "The passenger searches rides by city and date, filters by distance from their location, books seats and views the route on a map",
    },
    {
      ru: "Водитель подтверждает заявки, после поездки обе стороны ставят оценки и пишут отзывы",
      en: "The driver confirms requests; after the ride both sides leave ratings and reviews",
    },
    {
      ru: "Обе роли живут в одном аккаунте — переключаться между профилями не нужно",
      en: "Both roles live in one account — no switching between profiles",
    },
  ],
  highlight: {
    ru: "Полный цикл шеринг-сервиса: карты, маршруты с промежуточными точками, бронирование мест, взаимные рейтинги, чат и канал поддержки. Тот самый разговор «сделайте нам такое же, но для нашей ниши» — здесь он уже пройден до конца.",
    en: "A complete sharing-service cycle: maps, multi-waypoint routes, seat booking, two-way ratings, chat and a support channel. Exactly the ask that starts with make us the same thing for our niche — here it has already been taken to the end.",
  },
  stack: ["Flutter", "FlutterFlow", "Firebase", "Cloud Functions"],
  integrations: ["Google Maps", "Google Places", "Apple Sign-In"],
  scale: { loc: 47000, files: 179 },
  featured: false,
};
```

- [ ] **Step 3: Кейс «спасение еды»**

Create `app/content/cases/food-rescue.ts`:

```ts
import type { CaseStudy } from "../types";

export const foodRescue: CaseStudy = {
  id: "food-rescue",
  industry: { ru: "Фудтех, Азербайджан", en: "Food tech, Azerbaijan" },
  formats: ["mobile", "payments", "admin"],
  name: { ru: "Спасение еды коробкой-сюрпризом", en: "Surprise Box Food Rescue" },
  budget: 37700,
  status: "shipped",
  tagline: {
    ru: "Кафе продают непроданное за день со скидкой, покупатели забирают рядом с собой",
    en: "Cafes sell the day's unsold food at a discount, buyers pick it up nearby",
  },
  problem: {
    ru: "Двусторонняя площадка для локального рынка: с одной стороны кафе с остатками, с другой — покупатели рядом. Обеим сторонам нужен был свой интерфейс, а платформе — комиссия и контроль партнёров.",
    en: "A two-sided platform for a local market: cafes with leftovers on one side, nearby buyers on the other. Both sides needed their own interface, and the platform needed commission and partner control.",
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
      ru: "Кластеризация маркеров на карте, чтобы лента заведений не превращалась в кашу",
      en: "Marker clustering on the map so a dense venue list stays readable",
    },
  ],
  highlight: {
    ru: "Готовый двусторонний маркетплейс с деньгами под зарубежный рынок: локальный платёжный шлюз через собственную облачную функцию с редиректом, внутренний кошелёк и аналитика для бизнес-стороны — вещь, которой в подобных проектах обычно нет.",
    en: "A working two-sided marketplace with money for a foreign market: a local payment gateway behind a custom cloud function with redirect, an in-app wallet, and analytics for the business side — something such projects usually lack.",
  },
  stack: ["Flutter", "FlutterFlow", "Firebase", "Cloud Functions", "Node.js"],
  integrations: ["epoint", "Google Maps", "OneSignal", "FCM"],
  scale: { loc: 76700, files: 317 },
  featured: false,
};
```

- [ ] **Step 4: Кейс «маркетплейс подработок с эскроу»**

Create `app/content/cases/escrow-marketplace.ts`:

```ts
import type { CaseStudy } from "../types";

export const escrowMarketplace: CaseStudy = {
  id: "escrow-marketplace",
  industry: { ru: "Подработки и услуги", en: "Gig work and services" },
  formats: ["mobile", "web", "admin", "payments"],
  name: { ru: "Маркетплейс подработок с эскроу", en: "Escrow Gig Marketplace" },
  status: "production",
  tagline: {
    ru: "Деньги депонируются площадкой и уходят исполнителю только после работы",
    en: "Money is held by the platform and released to the worker only after the job",
  },
  problem: {
    ru: "На площадке подработок обе стороны боятся друг друга: заказчик — что заплатит и не получит работу, исполнитель — что сделает и не получит денег. Снять этот страх можно только деньгами, которые держит платформа.",
    en: "On a gig platform both sides fear each other: the client fears paying for nothing, the worker fears working for nothing. The only way to remove that fear is money held by the platform.",
  },
  solution: [
    {
      ru: "Безопасная сделка: оплата холдируется на площадке, исполнителю выплачивается после подтверждения выполнения, платформа удерживает комиссию",
      en: "Escrow: the payment is held by the platform, released to the worker after the job is confirmed, with the platform taking a commission",
    },
    {
      ru: "Регистрация с верификацией, каталог категорий и специализаций, публикация заказа и отклики",
      en: "Registration with verification, a catalogue of categories and specialisations, job posting and applications",
    },
    {
      ru: "Чат с историями и медиа, геолокация и карты, отзывы, жалобы, push-уведомления",
      en: "Chat with stories and media, geolocation and maps, reviews, complaints and push notifications",
    },
    {
      ru: "Продукт существует в трёх частях: мобильное приложение, веб-версия как PWA и админка",
      en: "The product ships in three parts: a mobile app, a web build as a PWA, and an admin panel",
    },
    {
      ru: "Ручные обвязки на Kotlin и Swift там, где кроссплатформенного решения не хватало",
      en: "Hand-written Kotlin and Swift bridges where the cross-platform layer fell short",
    },
  ],
  highlight: {
    ru: "Самая взрослая денежная логика в списке: холдирование, выплата исполнителю и комиссия сделаны на реальном российском эквайринге отдельными облачными функциями. Самый объёмный репозиторий портфолио — около 110,8 тыс. строк, 347 файлов, порядка 30 маршрутов. В проде на трёх платформах.",
    en: "The most grown-up money logic in the list: holding, payout and commission built on real acquiring through dedicated cloud functions. The largest repository in this portfolio — around 110.8k lines, 347 files, some 30 routes. Live in production on three platforms.",
  },
  stack: ["Flutter", "FlutterFlow", "Kotlin", "Swift", "Firebase", "Cloud Functions"],
  integrations: ["Google Maps", "FCM", "Remote Config"],
  scale: { loc: 110800, files: 347 },
  diagram: "escrow",
  featured: true,
};
```

- [ ] **Step 5: Кейс «интернет-магазин»**

Create `app/content/cases/ecommerce.ts`:

```ts
import type { CaseStudy } from "../types";

export const ecommerce: CaseStudy = {
  id: "ecommerce",
  industry: { ru: "Ритуальная флористика", en: "Funeral floristry" },
  formats: ["web", "backend"],
  name: { ru: "Интернет-магазин с админкой", en: "E-commerce Site with CMS" },
  status: "mvp",
  tagline: {
    ru: "Замена устаревшего сайта: каталог, заявки в админку и в мессенджер, прицел на поиск",
    en: "Replacing a legacy site: catalogue, orders into a CMS and a messenger, built for search",
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
```

- [ ] **Step 6: Проверить типизацию**

```bash
npx tsc --noEmit
```

Ожидание: ошибок нет.

- [ ] **Step 7: Коммит**

```bash
git add app/content/cases
git commit -m "feat(content): кейсы 6-10 — лояльность, шеринг, фудтех, эскроу, магазин

Вторая пятёрка. Здесь появляются форматы кроме мобильного: у эскроу-
маркетплейса веб и админка, у магазина — чистый веб с эксплуатацией.
Это опора для позиционирования \"не только мобильные приложения\".

У эскроу-маркетплейса суммы нет намеренно: контракт был на 40к, получено
15к, а показывать 15к рядом с самым объёмным репозиторием портфолио
обесценивает кейс. Опираемся на статус.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 5: Кейсы 11–14, сборка каталога и инварианты

**Files:**
- Create: `app/content/cases/vpn-service.ts`
- Create: `app/content/cases/checklists.ts`
- Create: `app/content/cases/ai-jobs.ts`
- Create: `app/content/cases/telegram-mini-app.ts`
- Create: `app/content/cases/index.ts`
- Create: `app/content/__tests__/cases.test.ts`
- Modify: `app/content/index.ts`

**Interfaces:**
- Consumes: `CaseStudy` из `../types`, все четырнадцать экспортов кейсов
- Produces: `CASES: CaseStudy[]`, `FEATURED_CASES: CaseStudy[]`, `getCase(id: string): CaseStudy | undefined` — на них опираются Task 6–13

> **Решение по кейсу VPN.** В карточке хранилища зафиксирован риск: сервис
> заточен в том числе под обход блокировок, и это юридически серая зона.
> В текст кейса эта функция **не выносится**. Описываем то, что является
> инженерной сутью и не создаёт рисков: подписки, биллинг, провижининг,
> платежи, агенты на нодах. Формулировка «VPN-сервис по подписке» точна
> и достаточна.

- [ ] **Step 1: Кейс «VPN-сервис»**

Create `app/content/cases/vpn-service.ts`:

```ts
import type { CaseStudy } from "../types";

export const vpnService: CaseStudy = {
  id: "vpn-service",
  industry: { ru: "Телеком и приватность", en: "Telecom and privacy" },
  formats: ["telegram", "backend", "web", "admin", "payments"],
  name: { ru: "VPN-сервис по подписке", en: "Subscription VPN Service" },
  status: "beta",
  tagline: {
    ru: "Бот, мини-приложение и админка поверх собственного биллинга и агентов на нодах",
    en: "A bot, a mini app and an admin panel over an own billing system and node agents",
  },
  problem: {
    ru: "Подписочный сервис — это не клиент для подключения, а конвейер: продать тариф, принять деньги, автоматически выдать доступ на нужном сервере, продлить и вовремя отключить. Всю эту цепочку нужно было построить целиком.",
    en: "A subscription service is not a connection client but a pipeline: sell a plan, take the money, provision access on a server automatically, renew it and cut it off on time. The whole chain had to be built end to end.",
  },
  solution: [
    {
      ru: "Продажа и оплата тарифов идут в мессенджере: бот и веб-мини-приложение вместо отдельного сайта",
      en: "Plans are sold and paid for inside a messenger: a bot and a web mini app instead of a separate site",
    },
    {
      ru: "Четыре платёжных канала, включая криптовалюту и внутреннюю валюту мессенджера",
      en: "Four payment channels, including cryptocurrency and the messenger's own currency",
    },
    {
      ru: "Бэкенд ведёт жизненный цикл подписок, биллинг и отчётность; фоновые задачи — на очереди",
      en: "The backend owns the subscription lifecycle, billing and reporting; background work runs on a queue",
    },
    {
      ru: "Агенты на серверах написаны на Go и провижинят пользователей автоматически — вручную никто ничего не заводит",
      en: "Server-side agents are written in Go and provision users automatically — nobody registers anything by hand",
    },
    {
      ru: "Админка на React: дашборды, серверы, пользователи, промокоды",
      en: "A React admin panel: dashboards, servers, users, promo codes",
    },
    {
      ru: "Порядка 731 теста, мониторинг метрик и дашборды, сбор ошибок",
      en: "Around 731 tests, metrics monitoring with dashboards, and error tracking",
    },
  ],
  highlight: {
    ru: "Самый полный по стеку кейс: Python на бэкенде, Go на агентах, React в двух интерфейсах, PostgreSQL и Redis, очередь фоновых задач, миграции, мониторинг и тесты — около 68 тыс. строк в 398 файлах. Это не приложение, а сервис целиком, и он мой собственный.",
    en: "The broadest case by stack: Python on the backend, Go in the agents, React in two interfaces, PostgreSQL and Redis, a background job queue, migrations, monitoring and tests — around 68k lines across 398 files. Not an app but a whole service, and it is my own product.",
  },
  stack: [
    "Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "Redis", "Go",
    "React", "TypeScript", "Vite", "Docker", "Nginx",
  ],
  integrations: ["Telegram Bot API", "Telegram Stars", "CryptoBot", "ЮKassa", "Prometheus", "Grafana", "Sentry"],
  scale: { loc: 68000, files: 398 },
  diagram: "vpn",
  featured: true,
};
```

- [ ] **Step 2: Кейс «корпоративные чек-листы»**

Create `app/content/cases/checklists.ts`:

```ts
import type { CaseStudy } from "../types";

export const checklists: CaseStudy = {
  id: "checklists",
  industry: { ru: "Корпоративные процессы", en: "Enterprise operations" },
  formats: ["mobile", "ai"],
  name: { ru: "Корпоративные чек-листы с ассистентом", en: "Enterprise Checklists with Assistant" },
  budget: 50000,
  status: "shipped",
  tagline: {
    ru: "Работа по инструкции: шаги с фотофиксацией, видео-гайды и AI-ответы по регламенту",
    en: "Work by the book: steps with photo proof, video guides and AI answers from the manual",
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
      ru: "Встроенный AI-ассистент отвечает на вопросы по инструкции",
      en: "A built-in AI assistant answers questions about the procedure",
    },
    {
      ru: "Приложение работает поверх внешнего REST-бэкенда заказчика с авторизацией по токенам",
      en: "The app runs on top of the client's external REST backend with token-based auth",
    },
  ],
  highlight: {
    ru: "Кейс про работу в чужой инфраструктуре: бэкенд не мой, контракт API диктует заказчик, а качество клиента — моя ответственность. Это ровно тот формат, в котором чаще всего нужен подрядчик — усилить существующую систему, а не строить новую с нуля.",
    en: "A case about working inside someone else's infrastructure: the backend is not mine, the API contract is the client's, and the quality of the client app is my responsibility. This is exactly the format contractors are usually needed for — strengthening an existing system rather than building a new one.",
  },
  stack: ["Flutter", "FlutterFlow", "Django REST", "JWT"],
  integrations: ["Sentry"],
  featured: false,
};
```

- [ ] **Step 3: Кейс «AI-подбор работы»**

Create `app/content/cases/ai-jobs.ts`:

```ts
import type { CaseStudy } from "../types";

export const aiJobs: CaseStudy = {
  id: "ai-jobs",
  industry: { ru: "Найм, Юго-Восточная Азия", en: "Hiring, Southeast Asia" },
  formats: ["mobile", "ai", "backend"],
  name: { ru: "AI-подбор работы и исполнителей", en: "AI Job and Talent Matching" },
  budget: 64800,
  status: "beta",
  tagline: {
    ru: "Резюме и вакансия собираются в диалоге, а подбор идёт векторным поиском",
    en: "Resumes and vacancies are assembled in a dialogue, and matching runs on vector search",
  },
  problem: {
    ru: "Форма из двадцати полей убивает конверсию, а поиск по ключевым словам не понимает, что «нянчить детей» и «присмотр за ребёнком» — одно и то же. Нужно было убрать и то, и другое.",
    en: "A twenty-field form kills conversion, and keyword search does not know that babysitting and childcare are the same thing. Both had to go.",
  },
  solution: [
    {
      ru: "Работодатель описывает задачу голосом или текстом, AI уточняет детали в диалоге и собирает структурированное описание",
      en: "The employer describes the job by voice or text, the AI clarifies details in a dialogue and assembles a structured description",
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
  stack: ["Flutter", "FlutterFlow", "Supabase", "PostgreSQL", "pgvector"],
  integrations: [],
  scale: { loc: 51100, files: 185 },
  diagram: "ai-intake",
  featured: true,
};
```

- [ ] **Step 4: Кейс «Telegram Mini App»**

Формулировка честная: игрового цикла нет, слово «игра» не используется.

Create `app/content/cases/telegram-mini-app.ts`:

```ts
import type { CaseStudy } from "../types";

export const telegramMiniApp: CaseStudy = {
  id: "telegram-mini-app",
  industry: { ru: "Telegram-приложения", en: "Telegram apps" },
  formats: ["telegram", "web"],
  name: { ru: "Mini App внутри мессенджера", en: "In-Messenger Mini App" },
  status: "mvp",
  tagline: {
    ru: "Кроссплатформенный веб-клиент внутри Telegram: авторизация, данные, все экраны",
    en: "A cross-platform web client inside Telegram: authentication, data model, all screens",
  },
  problem: {
    ru: "Нужно было проверить связку «кроссплатформенный фреймворк внутри мессенджера»: можно ли собрать полноценный интерфейс мини-приложения без отдельного веб-стека.",
    en: "The goal was to validate a cross-platform framework running inside a messenger: whether a full mini-app interface can be built without a separate web stack.",
  },
  solution: [
    {
      ru: "Каркас мини-приложения на веб-сборке кроссплатформенного фреймворка",
      en: "A mini-app shell built on the web target of a cross-platform framework",
    },
    {
      ru: "Чтение и разбор данных, которые мессенджер передаёт приложению при открытии",
      en: "Reading and parsing the data the messenger passes to the app on launch",
    },
    {
      ru: "Флоу авторизации и регистрации, модель данных, вёрстка всех экранов",
      en: "Authentication and sign-up flow, data model and layout for every screen",
    },
  ],
  highlight: {
    ru: "Кейс честно неполный: интерфейс и авторизация собраны, прикладная логика — нет. Показываю его как подтверждение, что связка «кроссплатформенный фреймворк внутри мессенджера» освоена; продуктовая часть этой связки доведена до конца в кейсе VPN-сервиса, где мини-приложение работает кассой.",
    en: "This case is honestly incomplete: the interface and authentication are done, the domain logic is not. I show it as proof that running a cross-platform framework inside a messenger is a solved problem for me; the product side of that combination is finished in the VPN case, where the mini app works as the checkout.",
  },
  stack: ["Flutter Web", "FlutterFlow", "Firebase", "Cloud Functions", "Node.js"],
  integrations: ["Telegram Web App SDK"],
  scale: { loc: 13300, files: 67 },
  featured: false,
};
```

- [ ] **Step 5: Собрать каталог**

Create `app/content/cases/index.ts`:

```ts
import type { CaseStudy } from "../types";

import { safety } from "./safety";
import { creatorApp } from "./creator-app";
import { meditation } from "./meditation";
import { familyNetwork } from "./family-network";
import { consultations } from "./consultations";
import { loyalty } from "./loyalty";
import { vehicleSharing } from "./vehicle-sharing";
import { foodRescue } from "./food-rescue";
import { escrowMarketplace } from "./escrow-marketplace";
import { ecommerce } from "./ecommerce";
import { vpnService } from "./vpn-service";
import { checklists } from "./checklists";
import { aiJobs } from "./ai-jobs";
import { telegramMiniApp } from "./telegram-mini-app";

/**
 * Порядок — по убыванию силы кейса, а не по дате: именно так их читают
 * сверху вниз на /cases.
 */
export const CASES: CaseStudy[] = [
  safety,
  vpnService,
  escrowMarketplace,
  creatorApp,
  ecommerce,
  aiJobs,
  familyNetwork,
  consultations,
  loyalty,
  meditation,
  vehicleSharing,
  foodRescue,
  checklists,
  telegramMiniApp,
];

/** Шесть кейсов для 3D-карусели: раскладка ProjectsCarousel рассчитана на шесть. */
export const FEATURED_CASES: CaseStudy[] = CASES.filter((c) => c.featured);

export const getCase = (id: string): CaseStudy | undefined =>
  CASES.find((c) => c.id === id);
```

- [ ] **Step 6: Расширить бочку экспортов**

Modify `app/content/index.ts`:

```ts
export * from "./types";
export * from "./stats";
export * from "./cases";
```

- [ ] **Step 7: Написать тест на инварианты**

Create `app/content/__tests__/cases.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { CASES, FEATURED_CASES, getCase } from "../cases";

// EN-имена featured-кейсов рисуются в 3D шрифтом soria, где нет
// типографских символов. См. коммит 9524d34.
const ASCII_SAFE = /^[A-Za-z0-9 \-&.,/()]+$/;

describe("каталог кейсов", () => {
  it("содержит ровно 14 кейсов", () => {
    expect(CASES).toHaveLength(14);
  });

  it("идентификаторы уникальны", () => {
    const ids = CASES.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("ровно шесть кейсов помечены featured", () => {
    expect(FEATURED_CASES).toHaveLength(6);
  });

  it("getCase находит кейс по идентификатору и возвращает undefined для чужого", () => {
    expect(getCase("safety")?.id).toBe("safety");
    expect(getCase("нет-такого")).toBeUndefined();
  });
});

describe("целостность кейса", () => {
  it.each(CASES.map((c) => [c.id, c] as const))(
    "%s заполнен на обоих языках",
    (_id, c) => {
      expect(c.name.ru.length).toBeGreaterThan(0);
      expect(c.name.en.length).toBeGreaterThan(0);
      expect(c.tagline.ru.length).toBeGreaterThan(0);
      expect(c.tagline.en.length).toBeGreaterThan(0);
      expect(c.problem.ru.length).toBeGreaterThan(0);
      expect(c.problem.en.length).toBeGreaterThan(0);
      expect(c.highlight.ru.length).toBeGreaterThan(0);
      expect(c.highlight.en.length).toBeGreaterThan(0);
    }
  );

  it.each(CASES.map((c) => [c.id, c] as const))(
    "%s имеет формат, стек и решение",
    (_id, c) => {
      expect(c.formats.length).toBeGreaterThan(0);
      expect(c.stack.length).toBeGreaterThan(0);
      expect(c.solution.length).toBeGreaterThanOrEqual(3);
      c.solution.forEach((s) => {
        expect(s.ru.length).toBeGreaterThan(0);
        expect(s.en.length).toBeGreaterThan(0);
      });
    }
  );

  it.each(CASES.map((c) => [c.id, c.name.en] as const))(
    "%s имеет EN-имя, безопасное для шрифта 3D-сцены",
    (_id, nameEn) => {
      expect(nameEn).toMatch(ASCII_SAFE);
    }
  );
});

describe("обезличивание", () => {
  // Названия, которые не должны просочиться ни в один кейс.
  const FORBIDDEN = [
    "Бим", "Zentry", "LegaSea", "Amber", "Оберегон", "Iren", "Ирэн",
    "SnackPack", "Funride", "hy Bakery", "hy_bakery", "Tems", "DoubleFit", "1venok",
    "ПодРаботкин", "PodRabotkin", "Soul Software", "GoodJobBali",
    "oberegon", "zentry",
  ];

  it("ни одно название продукта или клиента не встречается в текстах", () => {
    const haystack = JSON.stringify(CASES);
    const found = FORBIDDEN.filter((word) => haystack.includes(word));
    expect(found).toEqual([]);
  });
});

describe("правило сумм", () => {
  it("сумма указана только там, где деньги получены", () => {
    const withBudget = CASES.filter((c) => c.budget !== undefined).map((c) => c.id);
    expect(withBudget.sort()).toEqual(
      [
        "ai-jobs",
        "checklists",
        "consultations",
        "family-network",
        "loyalty",
        "meditation",
        "safety",
        "vehicle-sharing",
        "food-rescue",
      ].sort()
    );
  });

  it("суммы положительные и в рублях", () => {
    CASES.filter((c) => c.budget !== undefined).forEach((c) => {
      expect(c.budget).toBeGreaterThan(0);
      expect(Number.isInteger(c.budget)).toBe(true);
    });
  });
});
```

- [ ] **Step 8: Запустить тесты**

```bash
npx vitest run app/content
```

Ожидание: PASS. Если падает тест обезличивания — из текста кейса нужно убрать название, а не слово из списка.

- [ ] **Step 9: Проверить всё и закоммитить**

```bash
npm test && npm run lint && npm run build
git add app/content
git commit -m "feat(content): кейсы 11-14 и каталог с инвариантами

Закрываем набор: VPN-сервис, корпоративные чек-листы, AI-подбор работы
и Mini App. Каталог отдаёт CASES, FEATURED_CASES и getCase — на них
строятся 3D-карусель, страница кейсов и PDF.

Тесты держат то, что легко сломать глазами: ровно 14 кейсов и 6 featured,
уникальные идентификаторы, заполненность обоих языков, ASCII в EN-именах
под шрифт 3D-сцены, список проектов с суммами и запрет названий клиентов
в текстах.

В кейсе VPN намеренно не упоминается обход блокировок: в карточке
хранилища это помечено как юридически серая зона, а инженерная суть
кейса — биллинг и провижининг — от этого не страдает.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 6: Реальный таймлайн

`constants/work.ts` перестаёт хранить данные и становится проекцией: контент живёт в `@content`, а 3D-координаты точек остаются здесь — они часть сцены, а не контента.

**Files:**
- Create: `app/content/timeline.ts`
- Create: `app/content/__tests__/timeline.test.ts`
- Modify: `app/content/index.ts`
- Modify: `app/constants/work.ts`

**Interfaces:**
- Consumes: `TimelineEntry` из `./types`
- Produces: `TIMELINE: TimelineEntry[]` длиной 5; `WORK_TIMELINE` сохраняет прежний тип `WorkTimelinePoint[]`, поэтому `Timeline.tsx` не меняется

- [ ] **Step 1: Написать падающий тест**

Create `app/content/__tests__/timeline.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { TIMELINE } from "../timeline";

const ASCII_SAFE = /^[A-Za-z0-9 \-&.,/()]+$/;

describe("таймлайн", () => {
  it("содержит пять вех", () => {
    expect(TIMELINE).toHaveLength(5);
  });

  it("годы идут по возрастанию", () => {
    const years = TIMELINE.map((e) => Number(e.year));
    expect(years).toEqual([...years].sort((a, b) => a - b));
  });

  it("EN-тексты безопасны для шрифта 3D-сцены", () => {
    TIMELINE.forEach((e) => {
      expect(e.title.en).toMatch(ASCII_SAFE);
      expect(e.subtitle.en).toMatch(ASCII_SAFE);
    });
  });

  it("заголовки короткие — иначе переносятся в 3D", () => {
    TIMELINE.forEach((e) => {
      expect(e.title.ru.length).toBeLessThanOrEqual(20);
      expect(e.title.en.length).toBeLessThanOrEqual(20);
    });
  });
});
```

- [ ] **Step 2: Запустить тест и убедиться, что он падает**

```bash
npx vitest run app/content/__tests__/timeline.test.ts
```

Ожидание: FAIL — `Failed to resolve import "../timeline"`.

- [ ] **Step 3: Создать таймлайн**

Годы 2024–2026 — тематическая группировка по типам задач, а не смена места работы; в подписях это не утверждается иначе.

Create `app/content/timeline.ts`:

```ts
import type { TimelineEntry } from "./types";

export const TIMELINE: TimelineEntry[] = [
  {
    year: "2020",
    title: { ru: "Своё дело", en: "Own business" },
    subtitle: {
      ru: "Магазин в Telegram, перепродажа техники",
      en: "Telegram shop, hardware resale",
    },
  },
  {
    year: "2023",
    title: { ru: "Первые заказы", en: "First orders" },
    subtitle: {
      ru: "Коммерческая разработка, апрель",
      en: "Commercial development, April",
    },
  },
  {
    year: "2024",
    title: { ru: "Маркетплейсы", en: "Marketplaces" },
    subtitle: {
      ru: "Эскроу, комиссии, эквайринг",
      en: "Escrow, fees, acquiring",
    },
  },
  {
    year: "2025",
    title: { ru: "Бэкенд", en: "Backend" },
    subtitle: {
      ru: "Своя инфраструктура, миграции, тесты",
      en: "Own infrastructure, migrations, tests",
    },
  },
  {
    year: "2026",
    title: { ru: "AI и свой SaaS", en: "AI and own SaaS" },
    subtitle: {
      ru: "Векторный поиск, подписки",
      en: "Vector search, subscriptions",
    },
  },
];
```

- [ ] **Step 4: Подключить к бочке экспортов**

Modify `app/content/index.ts` — добавить строку:

```ts
export * from "./timeline";
```

- [ ] **Step 5: Превратить work.ts в проекцию**

Replace `app/constants/work.ts` целиком:

```ts
import * as THREE from "three";

import { TIMELINE } from "@content";
import { WorkTimelinePoint } from "../types";

/**
 * Координаты точек — часть 3D-сцены, а не контента, поэтому живут здесь.
 * Значения взяты из исходной сцены и не меняются: под них подобрана
 * траектория камеры в work/index.tsx.
 */
const POINTS: Pick<WorkTimelinePoint, "point" | "position">[] = [
  { point: new THREE.Vector3(0, 0, 0), position: "right" },
  { point: new THREE.Vector3(-4, -4, -3), position: "left" },
  { point: new THREE.Vector3(-3, -1, -6), position: "left" },
  { point: new THREE.Vector3(0, -1, -10), position: "left" },
  { point: new THREE.Vector3(1, 1, -12), position: "right" },
];

if (POINTS.length !== TIMELINE.length) {
  throw new Error(
    `Точек сцены ${POINTS.length}, а вех таймлайна ${TIMELINE.length} — добавь координаты в POINTS`
  );
}

export const WORK_TIMELINE: WorkTimelinePoint[] = TIMELINE.map((entry, i) => ({
  ...POINTS[i],
  year: entry.year,
  title: entry.title,
  subtitle: entry.subtitle,
}));
```

- [ ] **Step 6: Запустить тесты и сборку**

```bash
npx vitest run app/content/__tests__/timeline.test.ts
npm test && npm run lint && npm run build
```

Ожидание: всё зелёное. `Timeline.tsx` не трогали — он читает `WORK_TIMELINE` того же типа.

- [ ] **Step 7: Коммит**

```bash
git add app/content app/constants/work.ts
git commit -m "feat(content): реальный таймлайн вместо плейсхолдеров

Пять вех из хронологии карьеры: своё дело, первые заказы, маркетплейсы,
бэкенд, AI и свой SaaS. Раньше в work.ts лежали выдуманные подписи.

Координаты точек остались в constants — это часть сцены, под них подобрана
траектория камеры. Проверка длины падает громко: если добавить веху и
забыть координату, сборка сломается сразу, а не тихо потеряет точку.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 7: 3D-карусель на реальных кейсах

**Files:**
- Modify: `app/types/projects.ts`
- Modify: `app/constants/projects.ts`
- Modify: `app/components/experience/projects/ProjectTile.tsx`
- Create: `app/content/__tests__/projects-projection.test.ts`

**Interfaces:**
- Consumes: `FEATURED_CASES`, `STATUS_LABEL` из `@content`
- Produces: `PROJECTS: Project[]` длиной 6, где `title` и `status` — `LocalizedText`, `url` ведёт на `/cases#<id>`

- [ ] **Step 1: Написать падающий тест**

Create `app/content/__tests__/projects-projection.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { PROJECTS } from "../../constants/projects";
import { FEATURED_CASES } from "../cases";

describe("проекция кейсов в 3D-карусель", () => {
  it("отдаёт ровно шесть плиток — под раскладку карусели", () => {
    expect(PROJECTS).toHaveLength(6);
  });

  it("порядок совпадает с featured-кейсами", () => {
    expect(PROJECTS.map((p) => p.title.ru)).toEqual(
      FEATURED_CASES.map((c) => c.name.ru)
    );
  });

  it("каждая плитка ведёт на якорь своего кейса", () => {
    PROJECTS.forEach((p, i) => {
      expect(p.url).toBe(`/cases#${FEATURED_CASES[i].id}`);
    });
  });

  it("не осталось выдуманных проектов", () => {
    const titles = PROJECTS.map((p) => `${p.title.ru} ${p.title.en}`).join(" ");
    ["Flutter Marketplace", "Business CRM", "Analytics Landing", "Web Platform"].forEach(
      (fake) => expect(titles).not.toContain(fake)
    );
  });
});
```

- [ ] **Step 2: Запустить тест и убедиться, что он падает**

```bash
npx vitest run app/content/__tests__/projects-projection.test.ts
```

Ожидание: FAIL — `PROJECTS` содержит шесть выдуманных проектов, `p.title.ru` — undefined.

- [ ] **Step 3: Обновить тип**

Проверить, что `urls` и `ProjectUrl` больше нигде не используются, и убрать их:

```bash
grep -rn "\.urls\|ProjectUrl" app/
```

Replace `app/types/projects.ts` целиком:

```ts
import type { LocalizedText } from "@i18n";

export interface Project {
  /** Обезличенное имя кейса. EN-версия рисуется шрифтом soria — только ASCII. */
  title: LocalizedText;
  /** Метка статуса вместо даты: даты из git недостоверны, см. §6.1 спеки. */
  status: LocalizedText;
  subtext: LocalizedText;
  /** Якорь на страницу кейсов. */
  url?: string;
}
```

- [ ] **Step 4: Превратить projects.ts в проекцию**

Replace `app/constants/projects.ts` целиком:

```ts
import { FEATURED_CASES, STATUS_LABEL } from "@content";
import { Project } from "../types";

/**
 * Плитки карусели — проекция шести сильнейших кейсов. Данные не дублируются:
 * текст правится в app/content/cases и расходится в 3D, на /cases и в PDF.
 */
export const PROJECTS: Project[] = FEATURED_CASES.map((c) => ({
  title: c.name,
  status: STATUS_LABEL[c.status],
  subtext: c.tagline,
  url: `/cases#${c.id}`,
}));
```

- [ ] **Step 5: Резолвить язык в плитке**

Modify `app/components/experience/projects/ProjectTile.tsx`.

Заменить рендер заголовка:

```tsx
        <Text
          {...titleProps}
          position={[-1.9, -0.8, 0.101]}
          anchorX="left"
          anchorY="bottom"
          maxWidth={4}
          fontSize={0.8}>
          {tx(project.title, lang)}
        </Text>
```

Заменить рендер даты на статус:

```tsx
          <Text
            {...subtitleProps}
            position={[-0.7, 0.2, 0]}
            fontSize={0.3}>
            {tx(project.status, lang).toUpperCase()}
          </Text>
```

`tx` и `lang` в файле уже есть — импорт `tx` из `@i18n` и `const lang = useLangStore(...)` присутствуют, добавлять нечего.

- [ ] **Step 6: Запустить тесты**

```bash
npx vitest run app/content/__tests__/projects-projection.test.ts
```

Ожидание: PASS, 4 теста.

- [ ] **Step 7: Проверить в браузере**

```bash
npm run dev
```

Открыть `http://localhost:3000`, долистать до секции проектов. Проверить:
- шесть плиток, тексты реальные;
- в EN-режиме заголовки рисуются без «квадратиков» — значит символы попали в шрифт;
- переключение RU/EN меняет заголовок, подпись и метку статуса;
- ссылка VIEW ведёт на `/cases#...` (страницы ещё нет — ожидается 404, это нормально до Task 9).

- [ ] **Step 8: Коммит**

```bash
npm test && npm run lint && npm run build
git add app/types/projects.ts app/constants/projects.ts app/components/experience/projects/ProjectTile.tsx app/content
git commit -m "feat(projects): карусель на реальных кейсах вместо выдуманных

Шесть плиток теперь проекция FEATURED_CASES, а не отдельный список.
Раньше в карусели были несуществующие проекты со ссылкой на пустой профиль
GitHub — клиент нажимал VIEW и упирался в никуда.

Заголовок стал двуязычным, дата заменена меткой статуса: даты из git
недостоверны, большинство репозиториев заведены одним заходом при переносе
в git, и первый коммит датирует импорт, а не разработку.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 8: Определение языка по браузеру

Сейчас дефолт жёстко `en`. Каналов три, языка два — при первом визите язык берётся из браузера, дальше уважается выбор пользователя.

**Files:**
- Modify: `app/i18n/langStore.ts`
- Modify: `app/i18n/__tests__/langStore.test.ts`

**Interfaces:**
- Consumes: —
- Produces: `useLangStore` получает поле `chosen: boolean`; `setLang` и `toggleLang` поднимают его в `true`

- [ ] **Step 1: Дописать падающие тесты**

Добавить в `app/i18n/__tests__/langStore.test.ts`:

```ts
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useLangStore, detectBrowserLang } from "../langStore";

describe("определение языка браузера", () => {
  it("русская локаль даёт ru", () => {
    vi.stubGlobal("navigator", { language: "ru-RU" });
    expect(detectBrowserLang()).toBe("ru");
  });

  it("любая другая локаль даёт en", () => {
    vi.stubGlobal("navigator", { language: "de-DE" });
    expect(detectBrowserLang()).toBe("en");
  });

  it("без navigator возвращает en и не падает", () => {
    vi.stubGlobal("navigator", undefined);
    expect(detectBrowserLang()).toBe("en");
  });
});

describe("флаг выбора пользователя", () => {
  beforeEach(() => {
    useLangStore.setState({ lang: "en", chosen: false });
  });

  it("изначально не поднят", () => {
    expect(useLangStore.getState().chosen).toBe(false);
  });

  it("setLang поднимает флаг", () => {
    useLangStore.getState().setLang("ru");
    expect(useLangStore.getState().chosen).toBe(true);
    expect(useLangStore.getState().lang).toBe("ru");
  });

  it("toggleLang поднимает флаг", () => {
    useLangStore.getState().toggleLang();
    expect(useLangStore.getState().chosen).toBe(true);
    expect(useLangStore.getState().lang).toBe("ru");
  });
});
```

- [ ] **Step 2: Запустить и убедиться, что падает**

```bash
npx vitest run app/i18n/__tests__/langStore.test.ts
```

Ожидание: FAIL — `detectBrowserLang` не экспортируется, `chosen` не существует.

- [ ] **Step 3: Реализовать**

Replace `app/i18n/langStore.ts` целиком:

```ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Lang = "en" | "ru";

/** Язык браузера при первом визите. Вне браузера — en. */
export const detectBrowserLang = (): Lang => {
  if (typeof navigator === "undefined" || !navigator?.language) return "en";
  return navigator.language.toLowerCase().startsWith("ru") ? "ru" : "en";
};

interface LangStore {
  lang: Lang;
  /** Пользователь выбрал язык руками — больше не переопределяем автоматикой. */
  chosen: boolean;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

export const useLangStore = create<LangStore>()(
  persist(
    (set, get) => ({
      // На сервере при статическом экспорте всегда en — иначе разъедется
      // гидратация. Настоящий язык подставляется после регидратации стора.
      lang: "en",
      chosen: false,
      setLang: (lang) => set({ lang, chosen: true }),
      toggleLang: () => set({ lang: get().lang === "en" ? "ru" : "en", chosen: true }),
    }),
    {
      name: "lang-storage",
      partialize: (state) => ({ lang: state.lang, chosen: state.chosen }),
      onRehydrateStorage: () => (state) => {
        // Язык руками не выбирали — берём из браузера.
        if (state && !state.chosen) {
          state.lang = detectBrowserLang();
        }
      },
    }
  )
);
```

- [ ] **Step 4: Запустить тесты**

```bash
npx vitest run app/i18n
```

Ожидание: PASS, включая прежние тесты стора.

- [ ] **Step 5: Проверить руками**

```bash
npm run dev
```

В браузере с русской локалью открыть сайт в приватном окне — интерфейс должен стартовать на RU. Переключить на EN, перезагрузить — остаётся EN.

- [ ] **Step 6: Коммит**

```bash
npm test && npm run lint && npm run build
git add app/i18n
git commit -m "feat(i18n): язык по умолчанию из браузера, выбор пользователя приоритетнее

Каналов получения заказов три — фриланс РФ, международный и найм, — и
жёсткий дефолт en заставлял половину аудитории переключаться вручную.

Начальное значение стора остаётся en, чтобы не разъехалась гидратация при
статическом экспорте; настоящий язык подставляется после регидратации.
Флаг chosen фиксирует ручной выбор, и автоматика его больше не трогает.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 9: Страница `/cases`

Быстрая читаемая страница без three.js и GSAP — та, которую можно кинуть ссылкой в чат.

**Files:**
- Create: `app/content/skills.ts`
- Create: `app/cases/page.tsx`
- Create: `app/cases/CasesView.tsx`
- Create: `app/cases/useResolvedLang.ts`
- Create: `app/cases/CasesHeader.tsx`
- Create: `app/cases/FormatFilter.tsx`
- Create: `app/cases/CaseCard.tsx`
- Create: `app/cases/SkillsBlock.tsx`
- Modify: `app/content/index.ts`
- Modify: `app/i18n/types.ts`
- Modify: `app/i18n/content/en.ts`
- Modify: `app/i18n/content/ru.ts`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `CASES`, `FEATURED_CASES`, `STATS`, `STATUS_LABEL`, `FORMAT_LABEL`, `SKILL_GROUPS` из `@content`; `useLangStore`, `tx` из `@i18n`
- Produces: маршрут `/cases` со статическим экспортом в `out/cases/index.html`; хук `useResolvedLang()`

- [ ] **Step 1: Блок «что умею»**

Только то, что подтверждено четырнадцатью кейсами. Ничего сверх — иначе блок превращается в список ключевых слов.

Create `app/content/skills.ts`:

```ts
import type { LocalizedText } from "@i18n";

export interface SkillGroup {
  title: LocalizedText;
  items: LocalizedText[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: { ru: "Маркетплейсы с деньгами", en: "Marketplaces with money" },
    items: [
      { ru: "Эскроу: холдирование оплаты и выплата после работы", en: "Escrow: holding payment and releasing it after the job" },
      { ru: "Комиссия площадки и внутренний кошелёк", en: "Platform commission and an in-app wallet" },
      { ru: "Расчёт свободных слотов и бронирование", en: "Free-slot computation and booking" },
      { ru: "Двусторонние площадки с кабинетом партнёра", en: "Two-sided platforms with a partner cabinet" },
    ],
  },
  {
    title: { ru: "Платежи", en: "Payments" },
    items: [
      { ru: "Карточный эквайринг с холдированием и выплатами", en: "Card acquiring with holds and payouts" },
      { ru: "Подписки и рекуррентные списания", en: "Subscriptions and recurring charges" },
      { ru: "Криптовалюта и валюта мессенджера", en: "Cryptocurrency and messenger currency" },
      { ru: "Локальные шлюзы зарубежных рынков", en: "Local gateways for foreign markets" },
    ],
  },
  {
    title: { ru: "AI в продукте", en: "AI in the product" },
    items: [
      { ru: "AI как форма ввода: диалог вместо анкеты", en: "AI as an input method: a dialogue instead of a form" },
      { ru: "Векторный поиск по смыслу, а не по словам", en: "Vector search by meaning rather than words" },
      { ru: "Ассистент, отвечающий по регламенту", en: "An assistant answering from a procedure" },
      { ru: "Чат-персонаж в стиле автора", en: "A chat persona in the author's voice" },
    ],
  },
  {
    title: { ru: "Бэкенд и инфраструктура", en: "Backend and infrastructure" },
    items: [
      { ru: "Self-hosted платформа: схема, права на строки, триггеры, edge-функции", en: "Self-hosted platform: schema, row-level security, triggers, edge functions" },
      { ru: "Свой API на Python с очередью фоновых задач", en: "An own Python API with a background job queue" },
      { ru: "Агенты на Go, управляющие серверами", en: "Go agents managing servers" },
      { ru: "Развёртывание на VPS: веб-сервер, systemd, бэкапы", en: "VPS deployment: web server, systemd, backups" },
      { ru: "Мониторинг, сбор ошибок, тесты", en: "Monitoring, error tracking, tests" },
    ],
  },
  {
    title: { ru: "Карты и гео", en: "Maps and geo" },
    items: [
      { ru: "Маршруты с промежуточными точками", en: "Routes with waypoints" },
      { ru: "Поиск по расстоянию и кластеризация маркеров", en: "Distance search and marker clustering" },
      { ru: "Координаты в сценариях безопасности", en: "Coordinates in safety scenarios" },
    ],
  },
  {
    title: { ru: "Telegram", en: "Telegram" },
    items: [
      { ru: "Боты и мини-приложения", en: "Bots and mini apps" },
      { ru: "Платежи внутри мессенджера", en: "Payments inside the messenger" },
      { ru: "Мини-приложение как касса продукта", en: "A mini app working as the product checkout" },
    ],
  },
  {
    title: { ru: "Веб и админки", en: "Web and admin panels" },
    items: [
      { ru: "Next.js с CMS и собственной базой", en: "Next.js with a CMS and an own database" },
      { ru: "Админки модерации и управления партнёрами", en: "Admin panels for moderation and partner management" },
      { ru: "PWA как третья платформа продукта", en: "PWA as a product's third platform" },
    ],
  },
];
```

Modify `app/content/index.ts` — добавить:

```ts
export * from "./skills";
```

- [ ] **Step 2: Тексты страницы в словарях**

Modify `app/i18n/types.ts` — добавить в интерфейс `Content` после `footer`:

```ts
  cases: {
    lead: string;
    sublead: string;
    statRevenue: string;
    statProjects: string;
    statRepos: string;
    statMentees: string;
    filterAll: string;
    problem: string;
    solution: string;
    highlight: string;
    stack: string;
    integrations: string;
    skillsTitle: string;
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
    back: string;
    cv: string;
    deck: string;
    anonNote: string;
  };
```

Modify `app/i18n/content/ru.ts` — добавить блок:

```ts
  cases: {
    lead: "Разработчик полного цикла",
    sublead:
      "Мобильные приложения, веб, Telegram-боты, бэкенд и AI. Беру задачу от идеи до продакшена — вместе с инфраструктурой.",
    statRevenue: "получено на заказах",
    statProjects: "оплаченных проекта",
    statRepos: "репозитория",
    statMentees: "ученика",
    filterAll: "Все",
    problem: "Задача",
    solution: "Что сделал",
    highlight: "Почему это стоит показывать",
    stack: "Стек",
    integrations: "Интеграции",
    skillsTitle: "Что умею",
    ctaTitle: "Нужен такой же — или похожий?",
    ctaText: "Напишите в Telegram: обсудим задачу, сроки и бюджет.",
    ctaButton: "Написать в Telegram",
    back: "К 3D-версии",
    cv: "Резюме",
    deck: "Презентация кейсов",
    anonNote:
      "Названия клиентов и продуктов не раскрываются: часть проектов под соглашениями о неразглашении. Технические детали, стек и суммы — реальные.",
  },
```

Modify `app/i18n/content/en.ts` — добавить блок:

```ts
  cases: {
    lead: "Full-cycle developer",
    sublead:
      "Mobile apps, web, Telegram bots, backend and AI. I take a product from idea to production, infrastructure included.",
    statRevenue: "earned on client work",
    statProjects: "paid projects",
    statRepos: "repositories",
    statMentees: "mentees",
    filterAll: "All",
    problem: "The problem",
    solution: "What I built",
    highlight: "Why it is worth showing",
    stack: "Stack",
    integrations: "Integrations",
    skillsTitle: "What I do",
    ctaTitle: "Need something like this?",
    ctaText: "Message me on Telegram and we will scope it out.",
    ctaButton: "Message on Telegram",
    back: "Back to 3D",
    cv: "Resume",
    deck: "Case deck",
    anonNote:
      "Client and product names are withheld: some projects are under non-disclosure agreements. Technical details, stack and figures are real.",
  },
```

Тест `app/i18n/__tests__/content.test.ts` сравнивает наборы ключей — он поймает, если один язык забыли.

- [ ] **Step 3: Разрешить выделение текста на странице**

В `app/globals.css` глобально стоит `user-select: none` — на странице кейсов текст надо копировать. Добавить в конец файла:

```css
/* На странице кейсов текст читают и копируют — глобальный запрет выделения
   из 3D-сцены здесь мешает. */
.cases-page,
.cases-page * {
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
  -webkit-touch-callout: default;
}
```

- [ ] **Step 4: Хук языка без рассинхрона гидратации**

Статический экспорт рендерит HTML с языком `en`. Если сразу отдать значение стора, React ругнётся на несовпадение — поэтому до монтирования отдаём `en`.

Create `app/cases/useResolvedLang.ts`:

```ts
"use client";

import { useEffect, useState } from "react";
import { useLangStore, type Lang } from "@i18n";

/**
 * Язык для DOM-страницы. До монтирования — en, как в статическом HTML;
 * после — значение стора. Иначе гидратация разъезжается.
 */
export const useResolvedLang = (): Lang => {
  const [mounted, setMounted] = useState(false);
  const lang = useLangStore((s) => s.lang);
  useEffect(() => setMounted(true), []);
  return mounted ? lang : "en";
};
```

- [ ] **Step 5: Карточка кейса**

Create `app/cases/CaseCard.tsx`:

```tsx
"use client";

import { FORMAT_LABEL, STATUS_LABEL, type CaseStudy } from "@content";
import { dict, tx, type Lang } from "@i18n";

const formatBudget = (rub: number, lang: Lang) =>
  lang === "ru"
    ? `${rub.toLocaleString("ru-RU")} ₽`
    : `${rub.toLocaleString("en-US")} RUB`;

const Chip = ({ text }: { text: string }) => (
  <span className="rounded border border-current/20 px-2 py-0.5 text-xs opacity-70">
    {text}
  </span>
);

const CaseCard = ({ item, lang }: { item: CaseStudy; lang: Lang }) => {
  const t = dict[lang].cases;

  return (
    <article
      id={item.id}
      className="scroll-mt-24 border-t border-current/15 py-10"
    >
      <div className="mb-3 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider opacity-60">
        <span>{tx(item.industry, lang)}</span>
        <span>·</span>
        <span>{tx(STATUS_LABEL[item.status], lang)}</span>
        {item.budget !== undefined && (
          <>
            <span>·</span>
            <span>{formatBudget(item.budget, lang)}</span>
          </>
        )}
      </div>

      <h3 className="mb-2 text-2xl font-semibold sm:text-3xl">
        {tx(item.name, lang)}
      </h3>
      <p className="mb-6 max-w-2xl text-base opacity-80">{tx(item.tagline, lang)}</p>

      <div className="grid gap-6 md:grid-cols-2">
        <section>
          <h4 className="mb-2 text-xs uppercase tracking-wider opacity-50">
            {t.problem}
          </h4>
          <p className="text-sm leading-relaxed opacity-90">{tx(item.problem, lang)}</p>
        </section>

        <section>
          <h4 className="mb-2 text-xs uppercase tracking-wider opacity-50">
            {t.solution}
          </h4>
          <ul className="space-y-1.5 text-sm leading-relaxed opacity-90">
            {item.solution.map((s, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="opacity-40">&mdash;</span>
                <span>{tx(s, lang)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-6 border-l-2 border-current/30 pl-4">
        <h4 className="mb-2 text-xs uppercase tracking-wider opacity-50">
          {t.highlight}
        </h4>
        <p className="max-w-3xl text-sm leading-relaxed">{tx(item.highlight, lang)}</p>
      </section>

      <div className="mt-6 flex flex-wrap gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-xs uppercase tracking-wider opacity-50">
            {t.stack}
          </span>
          {item.stack.map((s) => (
            <Chip key={s} text={s} />
          ))}
        </div>
        {item.integrations.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-xs uppercase tracking-wider opacity-50">
              {t.integrations}
            </span>
            {item.integrations.map((s) => (
              <Chip key={s} text={s} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-xs opacity-50">
        {item.formats.map((f) => (
          <span key={f}>{tx(FORMAT_LABEL[f], lang)}</span>
        ))}
        {item.scale?.loc && (
          <span>
            {lang === "ru"
              ? `${Math.round(item.scale.loc / 1000)} тыс. строк`
              : `${Math.round(item.scale.loc / 1000)}k lines`}
          </span>
        )}
      </div>
    </article>
  );
};

export default CaseCard;
```

- [ ] **Step 6: Фильтр по формату**

Create `app/cases/FormatFilter.tsx`:

```tsx
"use client";

import { FORMAT_LABEL, type CaseFormat } from "@content";
import { tx, type Lang } from "@i18n";

interface Props {
  lang: Lang;
  allLabel: string;
  active: CaseFormat | null;
  available: CaseFormat[];
  onChange: (f: CaseFormat | null) => void;
}

const FormatFilter = ({ lang, allLabel, active, available, onChange }: Props) => {
  const base =
    "rounded-full border px-3 py-1 text-sm transition-opacity cursor-pointer";

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        aria-pressed={active === null}
        onClick={() => onChange(null)}
        className={`${base} ${active === null ? "border-current" : "border-current/25 opacity-60"}`}
      >
        {allLabel}
      </button>
      {available.map((f) => (
        <button
          key={f}
          type="button"
          aria-pressed={active === f}
          onClick={() => onChange(active === f ? null : f)}
          className={`${base} ${active === f ? "border-current" : "border-current/25 opacity-60"}`}
        >
          {tx(FORMAT_LABEL[f], lang)}
        </button>
      ))}
    </div>
  );
};

export default FormatFilter;
```

- [ ] **Step 7: Шапка**

Create `app/cases/CasesHeader.tsx`:

```tsx
"use client";

import { STATS } from "@content";
import { dict, type Lang } from "@i18n";

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div>
    <div className="text-2xl font-semibold sm:text-3xl">{value}</div>
    <div className="text-xs uppercase tracking-wider opacity-50">{label}</div>
  </div>
);

const CasesHeader = ({ lang }: { lang: Lang }) => {
  const t = dict[lang].cases;
  const locale = lang === "ru" ? "ru-RU" : "en-US";
  const revenue =
    lang === "ru"
      ? `${STATS.revenueRub.toLocaleString("ru-RU")} ₽`
      : `${STATS.revenueRub.toLocaleString("en-US")} RUB`;

  return (
    <header className="pb-10">
      <h1 className="mb-3 text-3xl font-semibold sm:text-5xl">{t.lead}</h1>
      <p className="mb-8 max-w-2xl text-base opacity-80 sm:text-lg">{t.sublead}</p>

      <div className="mb-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
        <Stat value={revenue} label={t.statRevenue} />
        <Stat value={STATS.paidProjects.toLocaleString(locale)} label={t.statProjects} />
        <Stat value={STATS.repos.toLocaleString(locale)} label={t.statRepos} />
        <Stat value={STATS.mentees.toLocaleString(locale)} label={t.statMentees} />
      </div>

      <p className="max-w-2xl text-xs leading-relaxed opacity-50">{t.anonNote}</p>
    </header>
  );
};

export default CasesHeader;
```

- [ ] **Step 8: Блок «что умею»**

Create `app/cases/SkillsBlock.tsx`:

```tsx
"use client";

import { SKILL_GROUPS } from "@content";
import { dict, tx, type Lang } from "@i18n";

const SkillsBlock = ({ lang }: { lang: Lang }) => (
  <section className="border-t border-current/15 py-12">
    <h2 className="mb-8 text-2xl font-semibold">{dict[lang].cases.skillsTitle}</h2>
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {SKILL_GROUPS.map((group, i) => (
        <div key={i}>
          <h3 className="mb-3 text-sm uppercase tracking-wider opacity-50">
            {tx(group.title, lang)}
          </h3>
          <ul className="space-y-1.5 text-sm opacity-90">
            {group.items.map((item, j) => (
              <li key={j}>{tx(item, lang)}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

export default SkillsBlock;
```

- [ ] **Step 9: Сборка страницы**

Create `app/cases/CasesView.tsx`:

```tsx
"use client";

import { useMemo, useState } from "react";

import { CASES, type CaseFormat } from "@content";
import { dict } from "@i18n";

import CaseCard from "./CaseCard";
import CasesHeader from "./CasesHeader";
import FormatFilter from "./FormatFilter";
import SkillsBlock from "./SkillsBlock";
import { useResolvedLang } from "./useResolvedLang";

const TELEGRAM_URL = "https://t.me/jdm_as_fuck";

const CasesView = () => {
  const lang = useResolvedLang();
  const t = dict[lang].cases;
  const [active, setActive] = useState<CaseFormat | null>(null);

  const available = useMemo(() => {
    const set = new Set<CaseFormat>();
    CASES.forEach((c) => c.formats.forEach((f) => set.add(f)));
    return [...set];
  }, []);

  const visible = useMemo(
    () => (active ? CASES.filter((c) => c.formats.includes(active)) : CASES),
    [active]
  );

  return (
    <main className="cases-page mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <CasesHeader lang={lang} />

      <div className="pb-2">
        <FormatFilter
          lang={lang}
          allLabel={t.filterAll}
          active={active}
          available={available}
          onChange={setActive}
        />
      </div>

      <div>
        {visible.map((item) => (
          <CaseCard key={item.id} item={item} lang={lang} />
        ))}
      </div>

      <SkillsBlock lang={lang} />

      <section className="border-t border-current/15 py-12">
        <h2 className="mb-2 text-2xl font-semibold">{t.ctaTitle}</h2>
        <p className="mb-6 opacity-80">{t.ctaText}</p>
        <div className="flex flex-wrap gap-3">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-current px-5 py-2 text-sm"
          >
            {t.ctaButton}
          </a>
          <a
            href={lang === "ru" ? "/Alan-CV-ru.pdf" : "/Alan-CV-en.pdf"}
            className="rounded-full border border-current/25 px-5 py-2 text-sm opacity-70"
          >
            {t.cv}
          </a>
          <a
            href={lang === "ru" ? "/Alan-Cases-ru.pdf" : "/Alan-Cases-en.pdf"}
            className="rounded-full border border-current/25 px-5 py-2 text-sm opacity-70"
          >
            {t.deck}
          </a>
          <a href="/" className="rounded-full border border-current/25 px-5 py-2 text-sm opacity-70">
            {t.back}
          </a>
        </div>
      </section>
    </main>
  );
};

export default CasesView;
```

Create `app/cases/page.tsx` — серверный компонент, отдаёт метаданные:

```tsx
import type { Metadata } from "next";

import CasesView from "./CasesView";

export const metadata: Metadata = {
  title: "Alan — Cases",
  description:
    "Selected client and product cases: marketplaces with escrow, payments, AI features, self-hosted backends, Telegram bots and web.",
};

const CasesPage = () => <CasesView />;

export default CasesPage;
```

- [ ] **Step 10: Проверить сборку и страницу**

```bash
npm run build
ls out/cases/index.html
```

Ожидание: файл существует — маршрут попал в статический экспорт.

```bash
npm run dev
```

Открыть `http://localhost:3000/cases` и проверить:
- четырнадцать карточек, тексты реальные;
- фильтр по форматам сужает список и снимается повторным нажатием;
- переключение языка на главной меняет язык и здесь после перезагрузки;
- в консоли браузера нет предупреждения о несовпадении гидратации;
- текст выделяется мышью;
- переход по `/cases#safety` скроллит к нужной карточке;
- на ширине 375px верстка не ломается и нет горизонтального скролла.

- [ ] **Step 11: Коммит**

```bash
npm test && npm run lint && npm run build
git add app/cases app/content app/i18n app/globals.css
git commit -m "feat(cases): страница кейсов без 3D

3D-сцена красивая, но информацию из неё читать тяжело, а на слабом
телефоне до кейсов ещё надо добраться. Клиенту нужна ссылка, которая
открывается мгновенно и читается сверху вниз.

Страница берёт те же данные, что и карусель, поэтому текст правится
в одном месте. Язык до монтирования принудительно en — иначе статический
HTML и стор расходятся на гидратации.

Глобальный запрет выделения текста снят точечно для этой страницы:
он нужен 3D-сцене, но мешает копировать кейсы.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 10: Диаграммы архитектуры

Четыре inline-SVG. Без библиотек, всё на `currentColor` — работают в светлой и тёмной теме. Рисуем только то, что построено.

**Files:**
- Create: `app/cases/diagrams/DiagramFrame.tsx`
- Create: `app/cases/diagrams/SosDiagram.tsx`
- Create: `app/cases/diagrams/EscrowDiagram.tsx`
- Create: `app/cases/diagrams/VpnDiagram.tsx`
- Create: `app/cases/diagrams/AiIntakeDiagram.tsx`
- Create: `app/cases/diagrams/index.tsx`
- Modify: `app/cases/CaseCard.tsx`

**Interfaces:**
- Consumes: `DiagramId` из `@content`, `Lang` из `@i18n`
- Produces: `DIAGRAMS: Record<DiagramId, (props: { lang: Lang }) => JSX.Element>`

- [ ] **Step 1: Общие примитивы**

Create `app/cases/diagrams/DiagramFrame.tsx`:

```tsx
"use client";

import type { ReactNode } from "react";

/** Обёртка: горизонтальный скролл на узких экранах вместо ломаной вёрстки. */
export const DiagramFrame = ({
  viewBox,
  children,
}: {
  viewBox: string;
  children: ReactNode;
}) => (
  <div className="my-6 overflow-x-auto">
    <svg
      viewBox={viewBox}
      role="img"
      className="h-auto w-full min-w-[640px] max-w-3xl"
      fill="none"
      stroke="currentColor"
    >
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" stroke="none" />
        </marker>
      </defs>
      {children}
    </svg>
  </div>
);

export const Box = ({
  x,
  y,
  w = 150,
  h = 46,
  label,
  sub,
  dashed = false,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  sub?: string;
  dashed?: boolean;
}) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={6}
      strokeOpacity={0.4}
      strokeDasharray={dashed ? "4 4" : undefined}
    />
    <text
      x={x + w / 2}
      y={sub ? y + h / 2 - 2 : y + h / 2 + 4}
      textAnchor="middle"
      fontSize={12}
      fill="currentColor"
      stroke="none"
    >
      {label}
    </text>
    {sub && (
      <text
        x={x + w / 2}
        y={y + h / 2 + 14}
        textAnchor="middle"
        fontSize={10}
        fillOpacity={0.55}
        fill="currentColor"
        stroke="none"
      >
        {sub}
      </text>
    )}
  </g>
);

export const Arrow = ({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) => (
  <line
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
    strokeOpacity={0.5}
    markerEnd="url(#arrow)"
  />
);
```

- [ ] **Step 2: Диаграмма SOS**

Create `app/cases/diagrams/SosDiagram.tsx`:

```tsx
"use client";

import type { Lang } from "@i18n";
import { Arrow, Box, DiagramFrame } from "./DiagramFrame";

const L = {
  ru: {
    tap: "Нажатие SOS",
    rescue: "Служба спасения",
    rescueSub: "заявление, координаты, ссылка",
    trusted: "Доверенные лица",
    trustedSub: "SMS с координатами",
    storage: "Хранилище",
    storageSub: "видео по подписанной ссылке",
    db: "База",
    dbSub: "событие SOS",
    infra: "Развёрнуто самостоятельно: PostgreSQL · авторизация · хранилище · edge-функции",
  },
  en: {
    tap: "SOS tap",
    rescue: "Emergency service",
    rescueSub: "statement, coordinates, link",
    trusted: "Trusted contacts",
    trustedSub: "SMS with coordinates",
    storage: "Storage",
    storageSub: "video behind a signed URL",
    db: "Database",
    dbSub: "SOS event",
    infra: "Self-hosted: PostgreSQL - auth - storage - edge functions",
  },
} as const;

const SosDiagram = ({ lang }: { lang: Lang }) => {
  const t = L[lang];
  return (
    <DiagramFrame viewBox="0 0 720 300">
      <Box x={10} y={120} w={140} label={t.tap} />
      <Arrow x1={150} y1={143} x2={230} y2={40} />
      <Arrow x1={150} y1={143} x2={230} y2={110} />
      <Arrow x1={150} y1={143} x2={230} y2={180} />
      <Arrow x1={150} y1={143} x2={230} y2={250} />
      <Box x={235} y={18} w={210} label={t.rescue} sub={t.rescueSub} />
      <Box x={235} y={88} w={210} label={t.trusted} sub={t.trustedSub} />
      <Box x={235} y={158} w={210} label={t.storage} sub={t.storageSub} />
      <Box x={235} y={228} w={210} label={t.db} sub={t.dbSub} />
      <Box x={465} y={88} w={245} h={116} label="" dashed />
      <text
        x={587}
        y={140}
        textAnchor="middle"
        fontSize={11}
        fill="currentColor"
        fillOpacity={0.7}
        stroke="none"
      >
        <tspan x={587} dy="0">{t.infra.split(":")[0]}</tspan>
        <tspan x={587} dy="18" fontSize={10} fillOpacity={0.55}>
          {t.infra.split(":")[1]}
        </tspan>
      </text>
    </DiagramFrame>
  );
};

export default SosDiagram;
```

- [ ] **Step 3: Диаграмма эскроу**

Create `app/cases/diagrams/EscrowDiagram.tsx`:

```tsx
"use client";

import type { Lang } from "@i18n";
import { Arrow, Box, DiagramFrame } from "./DiagramFrame";

const L = {
  ru: {
    pay: "Заказчик платит",
    hold: "Холд на площадке",
    holdSub: "деньги заморожены",
    done: "Работа принята",
    payout: "Выплата исполнителю",
    payoutSub: "минус комиссия площадки",
  },
  en: {
    pay: "Client pays",
    hold: "Held by platform",
    holdSub: "funds frozen",
    done: "Job confirmed",
    payout: "Payout to worker",
    payoutSub: "minus platform fee",
  },
} as const;

const EscrowDiagram = ({ lang }: { lang: Lang }) => {
  const t = L[lang];
  return (
    <DiagramFrame viewBox="0 0 720 110">
      <Box x={5} y={30} w={150} label={t.pay} />
      <Arrow x1={158} y1={53} x2={183} y2={53} />
      <Box x={186} y={30} w={160} label={t.hold} sub={t.holdSub} />
      <Arrow x1={349} y1={53} x2={374} y2={53} />
      <Box x={377} y={30} w={150} label={t.done} />
      <Arrow x1={530} y1={53} x2={555} y2={53} />
      <Box x={558} y={30} w={158} label={t.payout} sub={t.payoutSub} />
    </DiagramFrame>
  );
};

export default EscrowDiagram;
```

- [ ] **Step 4: Диаграмма VPN-сервиса**

Create `app/cases/diagrams/VpnDiagram.tsx`:

```tsx
"use client";

import type { Lang } from "@i18n";
import { Arrow, Box, DiagramFrame } from "./DiagramFrame";

const L = {
  ru: {
    client: "Бот и мини-приложение",
    clientSub: "выбор тарифа, оплата",
    billing: "Биллинг",
    billingSub: "подписки, очередь задач",
    agent: "Агент на Go",
    agentSub: "провижининг",
    node: "Сервер",
    back: "Ссылка на подписку",
    admin: "Админка",
    adminSub: "дашборды, промокоды",
  },
  en: {
    client: "Bot and mini app",
    clientSub: "plan choice, payment",
    billing: "Billing",
    billingSub: "subscriptions, job queue",
    agent: "Go agent",
    agentSub: "provisioning",
    node: "Server",
    back: "Subscription link",
    admin: "Admin panel",
    adminSub: "dashboards, promo codes",
  },
} as const;

const VpnDiagram = ({ lang }: { lang: Lang }) => {
  const t = L[lang];
  return (
    <DiagramFrame viewBox="0 0 720 200">
      <Box x={5} y={20} w={165} label={t.client} sub={t.clientSub} />
      <Arrow x1={173} y1={43} x2={198} y2={43} />
      <Box x={201} y={20} w={160} label={t.billing} sub={t.billingSub} />
      <Arrow x1={364} y1={43} x2={389} y2={43} />
      <Box x={392} y={20} w={150} label={t.agent} sub={t.agentSub} />
      <Arrow x1={545} y1={43} x2={570} y2={43} />
      <Box x={573} y={20} w={140} label={t.node} />
      <Arrow x1={643} y1={70} x2={90} y2={70} />
      <text
        x={366}
        y={64}
        textAnchor="middle"
        fontSize={10}
        fill="currentColor"
        fillOpacity={0.55}
        stroke="none"
      >
        {t.back}
      </text>
      <Arrow x1={281} y1={70} x2={281} y2={115} />
      <Box x={201} y={118} w={160} label={t.admin} sub={t.adminSub} dashed />
    </DiagramFrame>
  );
};

export default VpnDiagram;
```

- [ ] **Step 5: Диаграмма AI-онбординга**

Create `app/cases/diagrams/AiIntakeDiagram.tsx`:

```tsx
"use client";

import type { Lang } from "@i18n";
import { Arrow, Box, DiagramFrame } from "./DiagramFrame";

const L = {
  ru: {
    input: "Голос или текст",
    dialog: "Диалог с AI",
    dialogSub: "уточняющие вопросы",
    record: "Структурированная запись",
    recordSub: "вместо анкеты из 20 полей",
    search: "Векторный подбор",
    searchSub: "по смыслу, не по словам",
    chat: "Чат сторон",
  },
  en: {
    input: "Voice or text",
    dialog: "AI dialogue",
    dialogSub: "clarifying questions",
    record: "Structured record",
    recordSub: "instead of a 20-field form",
    search: "Vector matching",
    searchSub: "by meaning, not words",
    chat: "Chat between sides",
  },
} as const;

const AiIntakeDiagram = ({ lang }: { lang: Lang }) => {
  const t = L[lang];
  return (
    <DiagramFrame viewBox="0 0 720 120">
      <Box x={5} y={35} w={130} label={t.input} />
      <Arrow x1={138} y1={58} x2={158} y2={58} />
      <Box x={161} y={35} w={140} label={t.dialog} sub={t.dialogSub} />
      <Arrow x1={304} y1={58} x2={324} y2={58} />
      <Box x={327} y={35} w={175} label={t.record} sub={t.recordSub} />
      <Arrow x1={505} y1={58} x2={525} y2={58} />
      <Box x={528} y={35} w={150} label={t.search} sub={t.searchSub} />
      <Arrow x1={603} y1={83} x2={603} y2={105} />
      <text
        x={603}
        y={117}
        textAnchor="middle"
        fontSize={10}
        fill="currentColor"
        fillOpacity={0.55}
        stroke="none"
      >
        {t.chat}
      </text>
    </DiagramFrame>
  );
};

export default AiIntakeDiagram;
```

- [ ] **Step 6: Реестр и врезка в карточку**

Create `app/cases/diagrams/index.tsx`:

```tsx
import type { ReactElement } from "react";

import type { DiagramId } from "@content";
import type { Lang } from "@i18n";

import AiIntakeDiagram from "./AiIntakeDiagram";
import EscrowDiagram from "./EscrowDiagram";
import SosDiagram from "./SosDiagram";
import VpnDiagram from "./VpnDiagram";

export const DIAGRAMS: Record<DiagramId, (props: { lang: Lang }) => ReactElement> = {
  sos: SosDiagram,
  escrow: EscrowDiagram,
  vpn: VpnDiagram,
  "ai-intake": AiIntakeDiagram,
};
```

Modify `app/cases/CaseCard.tsx` — добавить импорт:

```tsx
import { DIAGRAMS } from "./diagrams";
```

и вставить перед блоком со стеком (сразу после секции `highlight`):

```tsx
      {item.diagram && (() => {
        const Diagram = DIAGRAMS[item.diagram];
        return <Diagram lang={lang} />;
      })()}
```

- [ ] **Step 7: Проверить в браузере**

```bash
npm run dev
```

На `/cases` проверить четыре карточки с диаграммами (`safety`, `escrow-marketplace`, `vpn-service`, `ai-jobs`):
- стрелки со стрелочными наконечниками, подписи не наезжают на рамки;
- в тёмной теме операционной системы линии и текст видны;
- на ширине 375px диаграмма скроллится внутри своего блока, а страница по горизонтали не едет;
- переключение языка меняет подписи.

- [ ] **Step 8: Коммит**

```bash
npm test && npm run lint && npm run build
git add app/cases
git commit -m "feat(cases): четыре диаграммы архитектуры

Скриншотов у кейсов нет и не будет: при обезличивании на снимках экрана
остаётся брендинг клиента. Вместо картинок показываем механику — SOS,
эскроу, провижининг VPN и AI-онбординг.

Всё на currentColor и inline-SVG: без библиотек, читается в обеих темах,
на узких экранах скроллится внутри своего блока.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 11: OG-картинка, метаданные, sitemap, ссылка из 3D

Сейчас `app/opengraph-image.png` отсутствует — ссылка, отправленная в мессенджер, разворачивается пустой. Это видит каждый, кому Алан её кинет.

**Files:**
- Create: `app/opengraph-image.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/sitemap.ts`
- Modify: `app/constants/footer.ts`

**Interfaces:**
- Consumes: `STATS` из `@content`
- Produces: статический файл OG-картинки в `out/`; пункт «Cases» в футере 3D-сцены

- [ ] **Step 1: Генерация OG-картинки**

Текст только латиницей: шрифт `soria` не содержит кириллицы, а картинка одна на оба языка.

Create `app/opengraph-image.tsx`:

```tsx
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { STATS } from "@content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Alan — full-cycle developer";

const soria = readFileSync(join(process.cwd(), "public", "soria-font.ttf"));

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#ededed",
          padding: 72,
          fontFamily: "Soria",
        }}
      >
        <div style={{ fontSize: 128, letterSpacing: 8 }}>ALAN</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 44, color: "#0690d4" }}>
            FULL-CYCLE DEVELOPER
          </div>
          <div style={{ fontSize: 28, opacity: 0.7 }}>
            MOBILE / WEB / TELEGRAM / BACKEND / AI
          </div>
          <div style={{ fontSize: 24, opacity: 0.5 }}>
            {`${STATS.paidProjects} PAID PROJECTS - ${STATS.repos} REPOSITORIES`}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Soria", data: soria, style: "normal", weight: 400 }],
    }
  );
}
```

- [ ] **Step 2: Проверить, что картинка родилась при статическом экспорте**

```bash
npm run build
find out -iname "*opengraph*"
```

Ожидание: файл `.png` найден.

**Если файла нет** (статический экспорт не выполнил маршрут метаданных) — не тратить время на подбор конфигурации, а перейти на статичный файл:

Удалить `app/opengraph-image.tsx`, создать временный `og.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0a0a0a"/>
  <text x="72" y="190" fill="#ededed" font-family="Helvetica, Arial, sans-serif"
        font-size="128" letter-spacing="8">ALAN</text>
  <text x="72" y="420" fill="#0690d4" font-family="Helvetica, Arial, sans-serif"
        font-size="44">FULL-CYCLE DEVELOPER</text>
  <text x="72" y="480" fill="#ededed" fill-opacity="0.7"
        font-family="Helvetica, Arial, sans-serif" font-size="28">MOBILE / WEB / TELEGRAM / BACKEND / AI</text>
  <text x="72" y="536" fill="#ededed" fill-opacity="0.5"
        font-family="Helvetica, Arial, sans-serif" font-size="24">18 PAID PROJECTS - 52 REPOSITORIES</text>
</svg>
```

Отрисовать и положить готовый PNG (в системе доступны только `qlmanage` и `sips`):

```bash
rm app/opengraph-image.tsx
qlmanage -t -s 1200 -o . og.svg
sips -z 630 1200 og.svg.png --out app/opengraph-image.png
sips -g pixelWidth -g pixelHeight app/opengraph-image.png
rm -f og.svg.png og.svg
npm run build && find out -iname "*opengraph*"
```

Ожидание: `sips` подтверждает 1200x630, файл найден в `out/`.

- [ ] **Step 3: Обновить метаданные под новое позиционирование**

Modify `app/layout.tsx` — заменить значения:

```ts
  title: "Alan — Full-Cycle Developer",
  description:
    "Full-cycle developer: mobile apps, web, Telegram bots, backend and AI. From idea to production, infrastructure included.",
  keywords:
    "Alan, Full-Cycle Developer, Flutter, Mobile Developer, Web, Next.js, Backend, FastAPI, Telegram Bots, Mini Apps, Supabase, PostgreSQL, AI Integration, Vector Search, Escrow Marketplace, Portfolio",
```

и в `openGraph` / `twitter`:

```ts
    title: "Alan — Full-Cycle Developer",
    description: "Mobile, web, Telegram bots, backend and AI — from idea to production.",
```

- [ ] **Step 4: Добавить страницу кейсов в sitemap**

Modify `app/sitemap.ts` — вернуть два элемента:

```ts
  const baseUrl = siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}cases`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]
```

- [ ] **Step 5: Ссылка на кейсы из футера 3D-сцены**

Modify `app/constants/footer.ts` — добавить первым элементом массива:

```ts
  {
    name: 'Cases',
    hoverText: { en: 'Selected work', ru: 'Избранные работы' },
    icon: 'icons/chevrons-left-right.svg',
    url: './cases',
  },
```

- [ ] **Step 6: Проверить**

```bash
npm run build
grep -o "og:image[^>]*" out/index.html | head -3
grep -c "cases" out/sitemap.xml
```

Ожидание: мета `og:image` присутствует; в `sitemap.xml` есть запись про кейсы.

```bash
npm run dev
```

На главной долистать до футера: появился пункт `CASES`, ведёт на страницу кейсов.

- [ ] **Step 7: Коммит**

```bash
npm test && npm run lint && npm run build
git add app/opengraph-image.tsx app/layout.tsx app/sitemap.ts app/constants/footer.ts
git commit -m "feat(meta): OG-картинка, метаданные под позиционирование, ссылка на кейсы

Раньше ссылка на портфолио разворачивалась в мессенджере пустым блоком —
это видел каждый, кому её отправляли. Теперь генерируется картинка
с именем, позиционированием и цифрами.

Заголовок и описание переписаны с \"fullstack developer\" на разработчика
полного цикла: мобильные, веб, Telegram-боты, бэкенд и AI. Страница кейсов
добавлена в sitemap и в футер 3D-сцены.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 12: Резюме и презентация кейсов

Текущие `public/Alan-CV-{ru,en}.pdf` содержат выдуманные проекты — это прямой риск на собеседовании. Перегенерируются по тем же путям, ссылки в футере менять не нужно.

**Files:**
- Modify: `public/Alan-CV-ru.pdf`
- Modify: `public/Alan-CV-en.pdf`
- Create: `public/Alan-Cases-ru.pdf`
- Create: `public/Alan-Cases-en.pdf`

**Interfaces:**
- Consumes: `CASES`, `FEATURED_CASES`, `STATS`, `TIMELINE`, `SKILL_GROUPS` — тексты берутся оттуда дословно, чтобы PDF не разошёлся с сайтом
- Produces: четыре PDF в `public/`

**Инструмент:** навык `anthropic-skills:pdf`. Скриптовой генерации в репозитории нет намеренно — headless-браузера в зависимостях тоже нет, а тащить его ради четырёх файлов дороже, чем перегенерировать вручную при изменении контента.

- [ ] **Step 1: Резюме, одна страница, два языка**

Сохранить визуальный язык текущих файлов: тёмная колонка слева с контактами и стеком, светлая справа с содержанием.

Левая колонка:
- Имя `ALAN`, подпись «Разработчик полного цикла» / "Full-cycle developer".
- Контакты: Telegram `@jdm_as_fuck`, GitHub `github.com/alkontv`, Instagram `@alkontv`, сайт `alkontv.github.io/cases`.
- Стек по группам: Mobile (Flutter, FlutterFlow) · Языки (TypeScript, JavaScript, Python, Dart, Go) · Веб (React, Next.js, Node.js) · Данные (PostgreSQL, Supabase, Firebase, Redis) · Инфраструктура (Docker, Nginx, VPS, миграции, мониторинг).

Правая колонка:
- «О себе» — текст `cases.sublead` из словаря соответствующего языка.
- Цифры: `2 234 980 ₽` получено, `18` оплаченных проектов, `52` репозитория, `5` учеников, с апреля 2023.
- «Опыт» — пять вех из `TIMELINE` дословно.
- «Избранные проекты» — шесть кейсов из `FEATURED_CASES`: `name` заголовком, `tagline` описанием, статус и сумма где есть.
- «Дополнительно» — менторство пятерых учеников, предпринимательский бэкграунд.
- Строка про обезличивание — текст `cases.anonNote`.

Сохранить как `public/Alan-CV-ru.pdf` и `public/Alan-CV-en.pdf`.

- [ ] **Step 2: Презентация кейсов, 8–10 страниц, два языка**

- Страница 1 — обложка: имя, позиционирование, четыре цифры, ссылка на `alkontv.github.io/cases`, контакт в Telegram.
- Страницы 2–8 — четырнадцать кейсов по два на страницу. На кейс: отрасль, статус, сумма где есть; `name` заголовком; `problem`; `solution` списком; `highlight` выделенной врезкой; `stack` и `integrations` строкой.
- Предпоследняя страница — «Что умею» по семи группам из `SKILL_GROUPS`.
- Последняя страница — контакты и текст `cases.anonNote`.

Сохранить как `public/Alan-Cases-ru.pdf` и `public/Alan-Cases-en.pdf`.

- [ ] **Step 3: Проверить файлы**

```bash
cd /Users/alkontv/Code/Portfolio
file public/Alan-CV-*.pdf public/Alan-Cases-*.pdf
ls -la public/Alan-*.pdf
```

Ожидание: четыре валидных PDF. Открыть каждый и убедиться глазами:
- ни одного выдуманного проекта («Flutter Marketplace», «Business CRM», «Analytics Landing», «Web Platform», «AI Telegram Bot», «Payments Automation»);
- ни одного названия клиента или продукта;
- кириллица в русских версиях отображается, а не «квадратиками»;
- ссылки кликабельны.

- [ ] **Step 4: Проверить, что файлы попадают в сборку**

```bash
npm run build
ls out/Alan-*.pdf
```

Ожидание: четыре файла в `out/`.

- [ ] **Step 5: Коммит**

```bash
git add public/Alan-CV-ru.pdf public/Alan-CV-en.pdf public/Alan-Cases-ru.pdf public/Alan-Cases-en.pdf
git commit -m "assets: резюме на реальных фактах и презентация кейсов

Прежние резюме содержали шесть несуществующих проектов — на собеседовании
это разбирается за один уточняющий вопрос. Заменены реальными кейсами,
цифрами из лога платежей и настоящим таймлайном.

Презентация кейсов нужна для лички и откликов: не всякий клиент откроет
сайт, но PDF во вложении посмотрят почти все. Тексты взяты из того же
контент-модуля, поэтому расхождений с сайтом нет.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 13: Верификация и выкатка

**Files:**
- Modify: нет (только проверки и слияние)

**Interfaces:**
- Consumes: всё предыдущее
- Produces: задеплоенный сайт

- [ ] **Step 1: Ни одного выдуманного факта в репозитории**

```bash
cd /Users/alkontv/Code/Portfolio
grep -rniE "Flutter Marketplace|AI Telegram Bot|Business CRM|Web Platform|Payments Automation|Analytics Landing" app/ public/ --include="*.ts" --include="*.tsx" | grep -v "__tests__"
```

Ожидание: пусто. Совпадения внутри `__tests__` допустимы — это тесты, которые следят за отсутствием заглушек.

- [ ] **Step 2: Ни одного названия клиента или продукта**

```bash
grep -rniE "Бим|Zentry|LegaSea|Оберегон|Ирэн|SnackPack|Funride|Bakery|DoubleFit|1venok|ПодРаботкин|PodRabotkin|Soul.?Software|GoodJobBali|oberegon" app/ --include="*.ts" --include="*.tsx" | grep -v "__tests__"
```

Ожидание: пусто.

- [ ] **Step 3: Тесты, линт, сборка**

```bash
npm test && npm run lint && npm run build
```

Ожидание: три зелёных прогона. В `out/` есть `index.html`, `cases/index.html`, четыре PDF, картинка OG и `sitemap.xml` с двумя записями.

- [ ] **Step 4: Проверка на мобильном разрешении**

```bash
npm run dev
```

В инструментах разработчика включить ширину 375px и проверить:
- `/cases` читается, горизонтального скролла нет, диаграммы скроллятся внутри своих блоков;
- главная со сценой открывается и не роняет вкладку;
- футер сцены доступен, пункт `CASES` нажимается.

- [ ] **Step 5: Проверка обоих языков**

Переключить язык на главной и убедиться, что меняются: заголовки плиток, метки статусов, подписи таймлайна, вся страница кейсов, ссылки на резюме и презентацию.

- [ ] **Step 6: Слить в main и выкатить**

```bash
git checkout main
git merge --no-ff feature/real-content -m "feat: реальный контент портфолио вместо плейсхолдеров

14 обезличенных кейсов из одного источника расходятся в 3D-сцену,
на страницу /cases и в PDF. Резюме переписано на реальных фактах.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
git push origin main
```

- [ ] **Step 7: Дождаться деплоя и проверить прод**

```bash
gh run list --limit 3
gh run watch
```

После успешного прогона:

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://alkontv.github.io/
curl -s -o /dev/null -w "%{http_code}\n" https://alkontv.github.io/cases
curl -s https://alkontv.github.io/ | grep -o 'og:image[^>]*'
```

Ожидание: обе страницы отдают 200, мета `og:image` присутствует.

- [ ] **Step 8: Проверить превью ссылки**

Отправить `https://alkontv.github.io/cases` самому себе в Telegram и убедиться, что разворачивается карточка с картинкой и описанием, а не пустой блок.

- [ ] **Step 9: Обновить карточку проекта в хранилище**

Файл `Проекты/Портфолио/Portfolio (сайт).md`: снять формулировку «контент чужого шаблона заменён не полностью», зафиксировать 14 кейсов, страницу `/cases`, PDF-презентацию и статус. В `_Брифинги/Портфолио-питч.md` — закрыть пункты раздела «TODO для реального портфолио», которые выполнены, и обновить лид на позиционирование полного цикла.

---

## Критерии готовности

- [ ] `grep` из Task 13 Step 1 и Step 2 — пусто.
- [ ] Все 14 кейсов заведены, на двух языках, тесты инвариантов зелёные.
- [ ] `/cases` открывается, фильтр работает, якоря из 3D ведут в нужную карточку.
- [ ] Четыре PDF лежат в `public/`, попадают в `out/` и открываются.
- [ ] OG-картинка отдаётся, ссылка разворачивается превью в мессенджере.
- [ ] Язык определяется по браузеру, ручной выбор переживает перезагрузку.
- [ ] `npm test`, `npm run lint`, `npm run build` зелёные.
- [ ] Прод отвечает 200 на `/` и `/cases`.
- [ ] Карточки в хранилище обновлены.
