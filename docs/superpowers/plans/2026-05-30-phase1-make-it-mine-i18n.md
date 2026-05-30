# Фаза 1: «Сделать своим» + двуязычность — план реализации

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Превратить форк mohitvirli.github.io в двуязычное (RU/EN) портфолио Alan: убрать всё авторское, ввести самописный i18n, локализовать весь текст (включая 3D), добавить кириллический шрифт и переключатель языка, настроить деплой на GitHub Pages.

**Architecture:** i18n — лёгкий слой на Zustand (`langStore` + persist) с словарями `app/i18n/content/{en,ru}.ts` и хуком `useT()`. Весь человекочитаемый текст переезжает в словари; структурные данные (проекты, опыт) хранят локализуемые поля как `{ ru, en }` и резолвятся в компонентах. 3D-шрифт выбирается по языку (EN — soria/Vercetti, RU — JetBrains Mono с кириллицей). Визуальная 3D-сцена, модели и анимации не меняются.

**Tech Stack:** Next.js 16 (App Router, `output: 'export'`), React 19, react-three-fiber v9, @react-three/drei v10, GSAP, Zustand 5, Tailwind v4, TypeScript, vitest (новый, для логики i18n).

**Спек:** `docs/superpowers/specs/2026-05-30-portfolio-rework-design.md`
**Baseline:** git-коммит `d96bc4f`. Все коммиты — на русском (см. CLAUDE.md), с трейлером `Co-Authored-By`.

---

## Соглашения для исполнителя

- Команды запускаются из корня `/Users/alkontv/Code/Other/Portfolio`.
- Зависимости ставятся локально (Task 1) — `node_modules` появится на хосте; Docker-окружение остаётся для визуального просмотра.
- После Task 1 у репозитория есть `.git` и активный husky → коммиты прогоняют `eslint --fix` на staged-файлах. Если pre-commit мешает в момент отладки — коммить с `HUSKY=0 git commit ...`, но финально код должен проходить линт.
- 3D-текст рисуется troika (`@react-three/drei` `<Text>`); шрифт задаётся пропом `font` как путь к файлу в `public/` (напр. `"./soria-font.ttf"`).

---

## Task 1: Окружение + vitest

**Files:**
- Modify: `package.json` (scripts + devDependencies)
- Create: `vitest.config.ts`
- Create: `app/i18n/__tests__/smoke.test.ts`

- [ ] **Step 1: Установить зависимости локально и проверить baseline-сборку**

Run:
```bash
HUSKY=0 npm install
npm run build
```
Expected: `npm install` завершается без ошибок; `npm run build` печатает `✓ Compiled successfully` и `Exporting (…)`, в корне появляется `out/`. Если build падает — НЕ продолжать, разобраться (baseline должен собираться).

- [ ] **Step 2: Добавить vitest и jsdom в devDependencies**

Run:
```bash
HUSKY=0 npm install -D vitest@^2 jsdom@^25
```
Expected: установка успешна, `package.json` обновлён.

- [ ] **Step 3: Добавить test-скрипты в `package.json`**

В объекте `scripts` (после строки `"lint": "eslint ."`) добавить:
```json
    "lint": "eslint .",
    "test": "vitest run",
    "test:watch": "vitest"
```
(не забыть запятую после `"lint": "eslint ."`).

- [ ] **Step 4: Создать `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    include: ["app/**/*.test.ts", "app/**/*.test.tsx"],
  },
});
```

- [ ] **Step 5: Создать smoke-тест `app/i18n/__tests__/smoke.test.ts`**

```ts
import { describe, it, expect } from "vitest";

describe("vitest окружение", () => {
  it("работает", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 6: Запустить тесты — должны пройти**

Run: `npm test`
Expected: `1 passed`.

- [ ] **Step 7: Коммит**

```bash
git add package.json package-lock.json vitest.config.ts app/i18n/__tests__/smoke.test.ts
HUSKY=0 git commit -m "test: подключить vitest для логики i18n

Добавляет vitest + jsdom и npm-скрипты test/test:watch. Нужно для
TDD самописного i18n-слоя (langStore, словари, резолв)."
```

---

## Task 2: langStore (TDD)

Стор языка по образцу `themeStore` (Zustand + persist). Дефолтный язык — `en`.

**Files:**
- Create: `app/i18n/langStore.ts`
- Create: `app/i18n/__tests__/langStore.test.ts`
- Modify: `app/stores/index.ts` (реэкспорт)

- [ ] **Step 1: Написать падающий тест `app/i18n/__tests__/langStore.test.ts`**

```ts
import { describe, it, expect, beforeEach } from "vitest";
import { useLangStore } from "../langStore";

describe("langStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useLangStore.setState({ lang: "en" });
  });

  it("по умолчанию язык en", () => {
    expect(useLangStore.getState().lang).toBe("en");
  });

  it("setLang меняет язык", () => {
    useLangStore.getState().setLang("ru");
    expect(useLangStore.getState().lang).toBe("ru");
  });

  it("toggleLang переключает en <-> ru", () => {
    useLangStore.getState().toggleLang();
    expect(useLangStore.getState().lang).toBe("ru");
    useLangStore.getState().toggleLang();
    expect(useLangStore.getState().lang).toBe("en");
  });
});
```

- [ ] **Step 2: Запустить — тест падает**

Run: `npm test -- langStore`
Expected: FAIL — `Cannot find module '../langStore'`.

- [ ] **Step 3: Реализовать `app/i18n/langStore.ts`**

```ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Lang = "en" | "ru";

interface LangStore {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

export const useLangStore = create<LangStore>()(
  persist(
    (set, get) => ({
      lang: "en",
      setLang: (lang) => set({ lang }),
      toggleLang: () => set({ lang: get().lang === "en" ? "ru" : "en" }),
    }),
    {
      name: "lang-storage",
      partialize: (state) => ({ lang: state.lang }),
    }
  )
);
```

- [ ] **Step 4: Запустить — тест проходит**

Run: `npm test -- langStore`
Expected: `3 passed`.

- [ ] **Step 5: Реэкспортировать стор из барреля `app/stores/index.ts`**

Текущее содержимое:
```ts
export * from './portalStore';
export * from './scrollStore';
export * from './themeStore';
```
Добавить строкой ниже:
```ts
export * from './portalStore';
export * from './scrollStore';
export * from './themeStore';
export * from '../i18n/langStore';
```

- [ ] **Step 6: Коммит**

```bash
git add app/i18n/langStore.ts app/i18n/__tests__/langStore.test.ts app/stores/index.ts
HUSKY=0 git commit -m "feat(i18n): добавить langStore для переключения RU/EN

Стор языка на Zustand+persist по образцу themeStore. Дефолт en,
выбор сохраняется в localStorage. Реэкспорт из барреля @stores."
```

---

## Task 3: Словари контента + тип + useT + шрифты (TDD)

Сердце i18n: явный тип `Content` и `LocalizedText` в `types.ts`, словари `en`/`ru` со ВСЕМ текстом сайта, хук `useT()` и хелпер выбора 3D-шрифта по языку. Тест проверяет, что наборы ключей `en` и `ru` идентичны.

> **Почему явный интерфейс, а не `typeof en`:** `as const` сузил бы тип до строковых литералов EN, и `ru.ts` (другие строки) не прошёл бы проверку. Поэтому форму задаёт ручной `interface Content`.

**Files:**
- Create: `app/i18n/types.ts`
- Create: `app/i18n/content/en.ts`
- Create: `app/i18n/content/ru.ts`
- Create: `app/i18n/content/index.ts`
- Create: `app/i18n/useT.ts`
- Create: `app/i18n/fonts.ts`
- Create: `app/i18n/__tests__/content.test.ts`

- [ ] **Step 1: Создать `app/i18n/types.ts` (явная форма словаря)**

```ts
export type LocalizedText = { en: string; ru: string };

export interface Content {
  hero: { title: string };
  window: { slogans: string[] };
  sections: { experience: string; work: string; projects: string };
  hint: { scroll: string; pan: string };
  footer: { telegram: string; github: string; instagram: string; resume: string };
}
```

- [ ] **Step 2: Создать `app/i18n/content/en.ts`**

```ts
import type { Content } from "../types";

export const en: Content = {
  hero: {
    title: "Hi, I am Alan.",
  },
  window: {
    slogans: [
      "FULLSTACK ENGINEER",
      "IDEA → LAUNCH",
      "MOBILE · FLUTTER",
      "WEB · BACKEND",
      "BOTS · CRM",
      "AI INTEGRATIONS",
    ],
  },
  sections: {
    experience: "EXPERIENCE",
    work: "WORK & EDUCATION",
    projects: "PROJECTS",
  },
  hint: {
    scroll: "SCROLL",
    pan: "PAN",
  },
  footer: {
    telegram: "Message me",
    github: "Open source",
    instagram: "@alkontv",
    resume: "Download CV",
  },
};
```

- [ ] **Step 3: Создать `app/i18n/content/ru.ts`**

```ts
import type { Content } from "../types";

export const ru: Content = {
  hero: {
    title: "Привет, я Alan.",
  },
  window: {
    slogans: [
      "FULLSTACK-ИНЖЕНЕР",
      "ОТ ИДЕИ К ЗАПУСКУ",
      "MOBILE · FLUTTER",
      "WEB · BACKEND",
      "БОТЫ · CRM",
      "AI-ИНТЕГРАЦИИ",
    ],
  },
  sections: {
    experience: "ОПЫТ",
    work: "ОПЫТ И УЧЁБА",
    projects: "ПРОЕКТЫ",
  },
  hint: {
    scroll: "ЛИСТАЙ",
    pan: "ВЕДИ",
  },
  footer: {
    telegram: "Написать",
    github: "Открытый код",
    instagram: "@alkontv",
    resume: "Скачать резюме",
  },
};
```

- [ ] **Step 4: Создать `app/i18n/content/index.ts`**

```ts
import { en } from "./en";
import { ru } from "./ru";
import type { Lang } from "../langStore";
import type { Content, LocalizedText } from "../types";

export type { Content, LocalizedText };

export const dict: Record<Lang, Content> = { en, ru };

/** Резолв локализованной строки по языку. */
export const tx = (text: LocalizedText, lang: Lang): string => text[lang];
```

- [ ] **Step 5: Создать `app/i18n/useT.ts`**

```ts
import { useLangStore } from "./langStore";
import { dict } from "./content";
import type { Content } from "./types";

/** Возвращает словарь текущего языка. Использование: const t = useT(); t.hero.title */
export const useT = (): Content => dict[useLangStore((s) => s.lang)];
```

- [ ] **Step 6: Создать `app/i18n/fonts.ts` (выбор 3D-шрифта по языку)**

```ts
import type { Lang } from "./langStore";

// EN сохраняет оригинальные шрифты форка; RU использует JetBrains Mono
// (полная кириллица, инженерная эстетика). Пути — относительно домена,
// файлы лежат в public/ (Task добавит кириллические в public/fonts/).
export const DISPLAY_FONT: Record<Lang, string> = {
  en: "./soria-font.ttf",
  ru: "./fonts/JetBrainsMono-ExtraBold.ttf",
};

export const ACCENT_FONT: Record<Lang, string> = {
  en: "./Vercetti-Regular.woff",
  ru: "./fonts/JetBrainsMono-Regular.ttf",
};
```

- [ ] **Step 7: Написать тест консистентности словарей `app/i18n/__tests__/content.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { en } from "../content/en";
import { ru } from "../content/ru";

// Рекурсивно собирает пути ключей объекта (массивы считаются листом).
function keyPaths(obj: unknown, prefix = ""): string[] {
  if (Array.isArray(obj) || typeof obj !== "object" || obj === null) {
    return [prefix];
  }
  return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) =>
    keyPaths(v, prefix ? `${prefix}.${k}` : k)
  );
}

describe("словари контента", () => {
  it("en и ru имеют одинаковый набор ключей", () => {
    expect(keyPaths(ru).sort()).toEqual(keyPaths(en).sort());
  });

  it("у окна ровно 6 слоганов в обоих языках", () => {
    expect(en.window.slogans).toHaveLength(6);
    expect(ru.window.slogans).toHaveLength(6);
  });
});
```

- [ ] **Step 8: Запустить тест — проходит**

Run: `npm test -- content`
Expected: `2 passed`. (Если падает на ключах — синхронизировать `ru.ts` с `en.ts`.)

- [ ] **Step 9: Коммит**

```bash
git add app/i18n/types.ts app/i18n/content app/i18n/useT.ts app/i18n/fonts.ts app/i18n/__tests__/content.test.ts
HUSKY=0 git commit -m "feat(i18n): словари RU/EN, хук useT и выбор 3D-шрифта по языку

Весь текст сайта в content/{en,ru}.ts (en задаёт тип Content). Хук
useT() отдаёт словарь по текущему языку, tx() резолвит локализуемые
поля данных. fonts.ts переключает 3D-шрифт: EN — soria/Vercetti,
RU — JetBrains Mono с кириллицей. Тест гарантирует совпадение ключей."
```

---

## Task 4: Кириллические шрифты для 3D

Кладём JetBrains Mono (кириллица) в `public/fonts/` — на них ссылается `app/i18n/fonts.ts` для RU.

**Files:**
- Create: `public/fonts/JetBrainsMono-ExtraBold.ttf`
- Create: `public/fonts/JetBrainsMono-Regular.ttf`

- [ ] **Step 1: Скачать шрифты с GitHub**

Run:
```bash
mkdir -p public/fonts
curl -fL -o public/fonts/JetBrainsMono-ExtraBold.ttf \
  https://github.com/JetBrains/JetBrainsMono/raw/master/fonts/ttf/JetBrainsMono-ExtraBold.ttf
curl -fL -o public/fonts/JetBrainsMono-Regular.ttf \
  https://github.com/JetBrains/JetBrainsMono/raw/master/fonts/ttf/JetBrainsMono-Regular.ttf
```

- [ ] **Step 2: Проверить, что файлы — настоящие TTF, а не HTML-ошибка**

Run:
```bash
file public/fonts/JetBrainsMono-*.ttf
ls -la public/fonts/
```
Expected: оба определяются как `TrueType Font` (или `TrueType font data`), размер каждого > 100 КБ. Если `HTML document` — URL не отдал файл; попробовать зеркало `https://raw.githubusercontent.com/JetBrains/JetBrainsMono/master/fonts/ttf/JetBrainsMono-ExtraBold.ttf`.

- [ ] **Step 3: Коммит**

```bash
git add public/fonts/JetBrainsMono-ExtraBold.ttf public/fonts/JetBrainsMono-Regular.ttf
HUSKY=0 git commit -m "assets: добавить JetBrains Mono с кириллицей для 3D-текста RU

Шрифт для русской версии (soria/Vercetti — латиница без кириллицы).
ExtraBold для заголовков, Regular для акцентов; ссылки в i18n/fonts.ts."
```

---

## Task 5: Переключатель языка + удаление Awwwards-бейджа

Добавляем `LangSwitcher` рядом с `ThemeSwitcher` и удаляем чужой Awwwards-бейдж (решение спека §8.7).

**Files:**
- Create: `app/components/common/LangSwitcher.tsx`
- Modify: `app/components/common/CanvasLoader.tsx`
- Delete: `app/components/common/AwwardsBadge.tsx`

- [ ] **Step 1: Создать `app/components/common/LangSwitcher.tsx`**

```tsx
'use client';

import { useGSAP } from "@gsap/react";
import { useLangStore, usePortalStore } from "@stores";
import gsap from "gsap";
import { useRef } from "react";
import { isMobile } from "react-device-detect";

const LangSwitcher = () => {
  const ref = useRef<HTMLDivElement>(null);
  const lang = useLangStore((state) => state.lang);
  const toggleLang = useLangStore((state) => state.toggleLang);
  const isActive = usePortalStore((state) => state.activePortalId);
  const positionClass = isMobile ? 'top-2 right-12' : 'top-6 right-16';

  useGSAP(() => {
    gsap.to(ref.current, {
      opacity: isActive ? 0 : 1,
      duration: 1,
      delay: isActive ? 0 : 1,
    });
  }, [isActive]);

  return (
    <div className={`fixed ${positionClass}`} ref={ref} style={{ opacity: 0, zIndex: 2 }}>
      <a
        className="hover:cursor-pointer text-white text-sm tracking-wide"
        onClick={() => toggleLang()}
      >
        {lang === 'en' ? 'RU' : 'EN'}
      </a>
    </div>
  );
};

export default LangSwitcher;
```

- [ ] **Step 2: Подключить `LangSwitcher` и убрать `AwwardsBadge` в `CanvasLoader.tsx`**

Заменить блок импортов (строки 12-16) — убрать строку `AwwardsBadge`, добавить `LangSwitcher`:
```tsx
import Preloader from "./Preloader";
import ProgressLoader from "./ProgressLoader";
import { ScrollHint } from "./ScrollHint";
import ThemeSwitcher from "./ThemeSwitcher";
import LangSwitcher from "./LangSwitcher";
```

Заменить хвост JSX (строки 89-91):
```tsx
      <ThemeSwitcher />
      <LangSwitcher />
      <ScrollHint />
```
(строка `<AwwardsBadge />` удалена.)

- [ ] **Step 3: Удалить файл бейджа**

Run: `git rm app/components/common/AwwardsBadge.tsx`
Expected: файл удалён из дерева и индекса.

- [ ] **Step 4: Проверить сборку**

Run: `npm run build`
Expected: `✓ Compiled successfully`, без ошибок про отсутствующий `AwwardsBadge`.

- [ ] **Step 5: Коммит**

```bash
git add app/components/common/LangSwitcher.tsx app/components/common/CanvasLoader.tsx
HUSKY=0 git commit -m "feat(i18n): переключатель языка RU/EN, убрать чужой Awwwards-бейдж

LangSwitcher рядом с переключателем темы, тоггл языка, прячется в
портале как ThemeSwitcher. Awwwards-бейдж вёл на заявку автора форка —
удалён вместе с компонентом."
```

---

## Task 6: Алиас @i18n + миграция Hero и окна слоганов

Заводим барель `@i18n` и переводим Hero-заголовок и 6 слоганов окна на словарь + языко-зависимый шрифт.

**Files:**
- Create: `app/i18n/index.ts`
- Modify: `tsconfig.json`
- Modify: `app/components/hero/index.tsx`
- Modify: `app/components/hero/TextWindow.tsx`

- [ ] **Step 1: Создать барель `app/i18n/index.ts`**

```ts
export * from "./content";
export * from "./fonts";
export * from "./langStore";
export * from "./useT";
```

- [ ] **Step 2: Добавить алиас `@i18n` в `tsconfig.json`**

В `compilerOptions.paths` после блока `@constants` добавить (не забыть запятую после `]` у `@constants`):
```json
      "@constants": [
        "./app/constants"
      ],
      "@i18n": [
        "./app/i18n"
      ]
```

- [ ] **Step 3: Hero — импорты, заголовок, шрифт по языку**

В `app/components/hero/index.tsx` добавить в импорты (после строки `import TextWindow from "./TextWindow";`):
```tsx
import { useLangStore } from "@stores";
import { DISPLAY_FONT, useT } from "@i18n";
```

После строки `const { progress } = useProgress();` добавить:
```tsx
  const t = useT();
  const lang = useLangStore((state) => state.lang);
```

Заменить `fontProps`:
```tsx
  const fontProps = {
    font: DISPLAY_FONT[lang],
    fontSize: 1.2,
  };
```

Заменить строку с `<Text ... >Hi, I am Mohit Virli.</Text>` на:
```tsx
      <Text position={[0, 2, -10]} {...fontProps} ref={titleRef}>{t.hero.title}</Text>
```

- [ ] **Step 4: TextWindow — импорты, шрифт по языку, 6 слоганов**

В `app/components/hero/TextWindow.tsx` добавить в импорты (после `import * as THREE from "three";`):
```tsx
import { useLangStore } from "@stores";
import { DISPLAY_FONT, useT } from "@i18n";
```

После строки `const windowRef = useRef<THREE.Group>(null);` добавить:
```tsx
  const t = useT();
  const lang = useLangStore((state) => state.lang);
```

Заменить `fontProps`:
```tsx
  const fontProps = {
    font: DISPLAY_FONT[lang],
  };
```

Заменить тексты в шести `<Text>` (по порядку сверху вниз) на ключи словаря:
- `FRONTEND ENGINEER` → `{t.window.slogans[0]}`
- `DESIGNER. DEVELOPER` → `{t.window.slogans[1]}`
- `DESIGNER. DUMBASS.` → `{t.window.slogans[2]}`
- `DJ. MELOMANIAC` → `{t.window.slogans[3]}`
- `GAMER. CREATIVE` → `{t.window.slogans[4]}`
- `CREATIVE. OPTIMIST` → `{t.window.slogans[5]}`

(Меняется только текст между `>` и `</Text>`; позиции/повороты/размеры не трогать.)

- [ ] **Step 5: Проверить сборку и типы**

Run: `npm run build`
Expected: `✓ Compiled successfully`, без TS-ошибок про `@i18n` или `slogans`.

- [ ] **Step 6: Коммит**

```bash
git add app/i18n/index.ts tsconfig.json app/components/hero/index.tsx app/components/hero/TextWindow.tsx
HUSKY=0 git commit -m "feat(i18n): локализовать Hero и слоганы окна

Заголовок героя и 6 слоганов окна берутся из словаря, шрифт
выбирается по языку. Имя автора форка заменено на Alan. Добавлен
баррель-алиас @i18n."
```

---

## Task 7: Миграция Experience и заголовков плиток

Заголовок секции «опыт» и подписи плиток WORK/PROJECTS — на словарь + шрифт по языку.

**Files:**
- Modify: `app/components/experience/index.tsx`
- Modify: `app/components/experience/GridTile.tsx`

- [ ] **Step 1: Experience — импорты, шрифт, заголовок секции, подписи плиток**

В `app/components/experience/index.tsx` добавить в импорты (после `import Work from "./work";`):
```tsx
import { useLangStore } from "@stores";
import { DISPLAY_FONT, useT } from "@i18n";
```

После строки `const isActive = usePortalStore((state) => !!state.activePortalId);` добавить:
```tsx
  const t = useT();
  const lang = useLangStore((state) => state.lang);
```

Заменить `fontProps` (использует свой `fontSize`/`color`):
```tsx
  const fontProps = {
    font: DISPLAY_FONT[lang],
    fontSize: 0.4,
    color: 'white',
  };
```

В `getTitle` заменить строку `const title = 'experience'.toUpperCase();` на:
```tsx
    const title = t.sections.experience;
```

Заменить проп `title` у двух `GridTile`:
- `title='WORK AND EDUCATION'` → `title={t.sections.work}`
- `title='SIDE PROJECTS'` → `title={t.sections.projects}`

- [ ] **Step 2: GridTile — шрифт по языку**

В `app/components/experience/GridTile.tsx` добавить в импорты (после `import { usePortalStore } from '@stores';` — заменить эту строку на):
```tsx
import { usePortalStore, useLangStore } from '@stores';
import { DISPLAY_FONT } from '@i18n';
```

После строки `const data = useScroll();` (внутри компонента) добавить:
```tsx
  const lang = useLangStore((state) => state.lang);
```

В объекте `fontProps` заменить `font: "./soria-font.ttf",` на:
```tsx
    font: DISPLAY_FONT[lang],
```

- [ ] **Step 3: Проверить сборку**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 4: Коммит**

```bash
git add app/components/experience/index.tsx app/components/experience/GridTile.tsx
HUSKY=0 git commit -m "feat(i18n): локализовать заголовок секции опыта и подписи плиток

EXPERIENCE/WORK/PROJECTS из словаря, шрифт плиток по языку."
```

---

## Task 8: Локализация подсказки скролла + мелкие фиксы

`ScrollHint` — текст из словаря; заодно убираем баг рендера булева и чиним `alt`.

**Files:**
- Modify: `app/components/common/ScrollHint.tsx`

- [ ] **Step 1: Импорт словаря**

В `app/components/common/ScrollHint.tsx` после строки `import { usePortalStore, useScrollStore } from "@stores";` добавить:
```tsx
import { useT } from "@i18n";
```

- [ ] **Step 2: Брать тексты из словаря**

Внутри компонента после `const scrollProgress = useScrollStore((state) => state.scrollProgress);` добавить:
```tsx
  const t = useT();
```

В блоке выбора подсказки заменить присваивания `hintText`:
- `hintText = 'SCROLL';` (оба вхождения) → `hintText = t.hint.scroll;`
- `hintText = 'PAN';` → `hintText = t.hint.pan;`

Внимание: переменная `svgSrc` сравнивает `hintText === 'PAN'` — это сломается при локализации. Заменить логику выбора иконки. Заменить строку:
```tsx
  const svgSrc = hintText === 'PAN' ? 'icons/chevrons-left-right.svg' : 'icons/chevrons-up-down.svg';
```
на (опираемся на портал, а не на текст):
```tsx
  const isPan = !!portal && portal !== 'work';
  const svgSrc = isPan ? 'icons/chevrons-left-right.svg' : 'icons/chevrons-up-down.svg';
```

- [ ] **Step 3: Убрать баг-рендер булева и поправить alt**

Удалить строку `{ showScrollHint }` (рендерит булево — артефакт). Заменить `alt="night mode"` у `<Image>` на `alt={hintText}`.

Итоговый `return` должен выглядеть так:
```tsx
  return (
    <div className="fixed w-full bottom-5 scroll-hint" style={{ opacity: 0 }}>
      <div className="flex items-center justify-center animate-pulse">
        <Image src={svgSrc} width={18} height={18} alt={hintText} loading="lazy" />
        <span className="text-white">{hintText}</span>
      </div>
    </div>
  );
```

- [ ] **Step 4: Проверить сборку**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 5: Коммит**

```bash
git add app/components/common/ScrollHint.tsx
HUSKY=0 git commit -m "feat(i18n): локализовать подсказку скролла, убрать баг рендера булева

hintText из словаря, выбор иконки по активному порталу (не по тексту),
удалён артефакт-рендер { showScrollHint }, исправлен alt иконки."
```

---

## Task 9: Футер — контакты Alan, локализация, иконка Telegram

Меняем ссылки на контакты Alan, делаем `hoverText` локализуемым, добавляем иконку Telegram, резюме-ссылку по языку.

**Files:**
- Modify: `app/types/footer.ts`
- Modify: `app/constants/footer.ts`
- Modify: `app/components/footer/index.tsx`
- Create: `public/icons/telegram.svg`

- [ ] **Step 1: Расширить тип `app/types/footer.ts`**

```ts
import type { LocalizedText } from "@i18n";

export interface FooterLink {
  name: string;
  hoverText?: LocalizedText;
  url: string;
  // Если задано — ссылка зависит от языка (например, резюме EN/RU).
  urlByLang?: LocalizedText;
  icon: string;
}
```

- [ ] **Step 2: Заменить содержимое `app/constants/footer.ts`**

```ts
import { FooterLink } from "../types";

export const FOOTER_LINKS: FooterLink[] = [
  {
    name: 'Telegram',
    hoverText: { en: 'Message me', ru: 'Написать' },
    icon: 'icons/telegram.svg',
    url: 'https://t.me/jdm_as_fuck',
  },
  {
    name: 'GitHub',
    hoverText: { en: 'Open source', ru: 'Открытый код' },
    icon: 'icons/github.svg',
    url: 'https://github.com/alkontv',
  },
  {
    name: 'Instagram',
    hoverText: { en: '@alkontv', ru: '@alkontv' },
    icon: 'icons/instagram.svg',
    url: 'https://www.instagram.com/alkontv/',
  },
  {
    name: 'Resume',
    hoverText: { en: 'Download CV', ru: 'Скачать резюме' },
    icon: 'icons/file.svg',
    url: './Alan-CV-en.pdf',
    urlByLang: { en: './Alan-CV-en.pdf', ru: './Alan-CV-ru.pdf' },
  },
];
```

- [ ] **Step 3: Создать иконку `public/icons/telegram.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 4.5 2.5 12.5l6 2 2 6 3-4 5 4 3-16z"/><path d="m8.5 14.5 10-8-7 9"/></svg>
```

- [ ] **Step 4: Footer — резолв языка для текста и резюме-ссылки**

В `app/components/footer/index.tsx` добавить в импорты (после `import { FooterLink } from "../../types";`):
```tsx
import { useLangStore } from "@stores";
import { tx } from "@i18n";
```

Внутри `FooterLinkItem` после `const [hovered, setHovered] = useState(false);` добавить:
```tsx
  const lang = useLangStore((state) => state.lang);
  const resolvedUrl = link.urlByLang ? tx(link.urlByLang, lang) : link.url;
```

Заменить `onClick`:
```tsx
  const onClick = () => window.open(resolvedUrl, '_blank');
```

В первом `useEffect` (создание hover-div) заменить строку `hoverDiv.textContent = link.hoverText ?? link.name.toUpperCase();` на:
```tsx
      hoverDiv.textContent = link.hoverText ? tx(link.hoverText, lang) : link.name.toUpperCase();
```

Добавить НОВЫЙ `useEffect` сразу после первого (он обновляет подпись при смене языка):
```tsx
  useEffect(() => {
    const hoverDiv = document.getElementById(`footer-link-${link.name}`);
    if (hoverDiv) {
      hoverDiv.textContent = link.hoverText ? tx(link.hoverText, lang) : link.name.toUpperCase();
    }
  }, [lang]);
```

(Имена брендов в самом 3D-тексте — `link.name.toUpperCase()` — оставляем латиницей, шрифт Vercetti не трогаем.)

- [ ] **Step 5: Проверить сборку**

Run: `npm run build`
Expected: `✓ Compiled successfully`. (Резюме-PDF появятся в Task 15; ссылка на них корректна заранее.)

- [ ] **Step 6: Коммит**

```bash
git add app/types/footer.ts app/constants/footer.ts app/components/footer/index.tsx public/icons/telegram.svg
HUSKY=0 git commit -m "feat(i18n): контакты Alan в футере, локализованные подписи, резюме по языку

Telegram/GitHub/Instagram/Resume вместо ссылок автора форка (без
LinkedIn/Spotify). hoverText двуязычный, резюме-ссылка зависит от
языка, добавлена иконка Telegram."
```

---

## Task 10: Проекты — локализация + плейсхолдеры Alan

`subtext` проектов делаем двуязычным, заменяем список на 6 правдоподобных кейсов под позиционирование.

**Files:**
- Modify: `app/types/projects.ts`
- Modify: `app/constants/projects.ts`
- Modify: `app/components/experience/projects/ProjectTile.tsx`

- [ ] **Step 1: Локализуемый `subtext` в `app/types/projects.ts`**

```ts
import type { LocalizedText } from "@i18n";

interface ProjectUrl {
  text: string;
  url: string;
}

export interface Project {
  title: string;
  date: string;
  subtext: LocalizedText;
  url?: string;
  urls?: ProjectUrl[];
}
```

- [ ] **Step 2: Заменить содержимое `app/constants/projects.ts`**

```ts
import { Project } from "../types";

// Плейсхолдеры под позиционирование Alan. Заменить реальными проектами.
export const PROJECTS: Project[] = [
  {
    title: 'Flutter Marketplace',
    date: '2024',
    subtext: {
      en: 'Cross-platform marketplace on Flutter: real-time catalog, cart and payments.',
      ru: 'Кроссплатформенный маркетплейс на Flutter: каталог в реальном времени, корзина и оплата.',
    },
    url: 'https://github.com/alkontv',
  },
  {
    title: 'AI Telegram Bot',
    date: '2024',
    subtext: {
      en: 'Telegram bot with an AI assistant: chat, document Q&A and smart automations.',
      ru: 'Telegram-бот с AI-ассистентом: чат, ответы по документам и умные автоматизации.',
    },
    url: 'https://github.com/alkontv',
  },
  {
    title: 'Business CRM',
    date: '2023',
    subtext: {
      en: 'Custom CRM on Supabase/Postgres: deals, roles, analytics and team workflows.',
      ru: 'CRM под бизнес на Supabase/Postgres: сделки, роли, аналитика и процессы команды.',
    },
    url: 'https://github.com/alkontv',
  },
  {
    title: 'Web Platform',
    date: '2023',
    subtext: {
      en: 'Full-stack web platform with REST API, auth and an admin dashboard.',
      ru: 'Fullstack веб-платформа с REST API, авторизацией и админ-панелью.',
    },
    url: 'https://github.com/alkontv',
  },
  {
    title: 'Payments Automation',
    date: '2025',
    subtext: {
      en: 'Payment integration and back-office automation that halved manual work.',
      ru: 'Интеграция платежей и автоматизация бэк-офиса — вдвое меньше ручной работы.',
    },
    url: 'https://github.com/alkontv',
  },
  {
    title: 'Analytics Landing',
    date: '2025',
    subtext: {
      en: 'High-conversion landing with analytics, A/B tests and CRM integration.',
      ru: 'Конверсионный лендинг с аналитикой, A/B-тестами и интеграцией с CRM.',
    },
    url: 'https://github.com/alkontv',
  },
];
```

- [ ] **Step 3: ProjectTile — резолв языка и шрифты**

В `app/components/experience/projects/ProjectTile.tsx` добавить в импорты (после `import { Project } from "@types";`):
```tsx
import { useLangStore } from "@stores";
import { ACCENT_FONT, DISPLAY_FONT, tx } from "@i18n";
```

После строки `const isTop = datePosition === 'top';` добавить:
```tsx
  const lang = useLangStore((state) => state.lang);
```

Заменить `titleProps` и `subtitleProps` (шрифт по языку, lang в deps):
```tsx
  const titleProps = useMemo(() => ({
    font: DISPLAY_FONT[lang],
    color: "black",
  }), [lang]);

  const subtitleProps: Partial<TextProps> = useMemo(() => ({
    font: ACCENT_FONT[lang],
    color: "black",
    anchorX: "left",
    anchorY: "top",
  }), [lang]);
```

Заменить рендер описания `{project.subtext}` на:
```tsx
          {tx(project.subtext, lang)}
```

- [ ] **Step 4: Проверить сборку**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 5: Коммит**

```bash
git add app/types/projects.ts app/constants/projects.ts app/components/experience/projects/ProjectTile.tsx
HUSKY=0 git commit -m "feat(i18n): двуязычные проекты-плейсхолдеры под позиционирование Alan

subtext проектов локализован (RU/EN), шрифт карточек по языку. Список
автора форка заменён 6 кейсами: Flutter, AI-бот, CRM, web, платежи, лендинг."
```

---

## Task 11: Опыт — локализация таймлайна

`title`/`subtitle` точек таймлайна — двуязычные; заменяем карьеру автора на плейсхолдеры Alan.

**Files:**
- Modify: `app/types/work.ts`
- Modify: `app/constants/work.ts`
- Modify: `app/components/experience/work/Timeline.tsx`

- [ ] **Step 1: Локализуемые поля в `app/types/work.ts`**

```ts
import * as THREE from "three";
import type { LocalizedText } from "@i18n";

export interface WorkTimelinePoint {
  point: THREE.Vector3,
  year: string,
  title: LocalizedText,
  subtitle?: LocalizedText,
  position: 'left' | 'right',
}
```

- [ ] **Step 2: Заменить содержимое `app/constants/work.ts`**

```ts
import * as THREE from "three";
import { WorkTimelinePoint } from "../types";

// Плейсхолдеры карьеры Alan (координаты точек из оригинала — подогнаны
// под сцену). Заменить реальными вехами.
export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: new THREE.Vector3(0, 0, 0),
    year: '2019',
    title: { en: 'Started in dev', ru: 'Старт в разработке' },
    subtitle: { en: 'First sites & bots', ru: 'Первые сайты и боты' },
    position: 'right',
  },
  {
    point: new THREE.Vector3(-4, -4, -3),
    year: '2021',
    title: { en: 'Mobile · FlutterFlow', ru: 'Mobile · FlutterFlow' },
    subtitle: { en: 'Mobile apps', ru: 'Мобильные приложения' },
    position: 'left',
  },
  {
    point: new THREE.Vector3(-3, -1, -6),
    year: '2023',
    title: { en: 'Fullstack', ru: 'Fullstack' },
    subtitle: { en: 'Web, backend, databases', ru: 'Web, backend, базы данных' },
    position: 'left',
  },
  {
    point: new THREE.Vector3(0, -1, -10),
    year: '2024',
    title: { en: 'AI · Automation', ru: 'AI · Автоматизация' },
    subtitle: { en: 'AI integrations, CRM', ru: 'AI-интеграции, CRM' },
    position: 'left',
  },
  {
    point: new THREE.Vector3(1, 1, -12),
    year: 'now',
    title: { en: 'In a team', ru: 'В команде' },
    subtitle: { en: 'With a senior engineer', ru: 'С senior-инженером' },
    position: 'right',
  },
];
```

- [ ] **Step 3: TimelinePoint — резолв языка и шрифты**

В `app/components/experience/work/Timeline.tsx` добавить в импорты (после `import { WorkTimelinePoint } from "@types";`):
```tsx
import { useLangStore } from "@stores";
import { ACCENT_FONT, DISPLAY_FONT, tx } from "@i18n";
```

Внутри `TimelinePoint` после `const textAlign = point.position === 'left' ? 'right' : 'left';` добавить:
```tsx
  const lang = useLangStore((state) => state.lang);
```

Заменить `textProps` и `titleProps` (шрифт по языку, lang в deps):
```tsx
  const textProps: Partial<TextProps> = useMemo(() => ({
    font: ACCENT_FONT[lang],
    color: "white",
    anchorX: textAlign,
    fillOpacity: 2 - 2 * diff,
  }), [textAlign, diff, lang]);

  const titleProps = useMemo(() => ({
    ...textProps,
    font: DISPLAY_FONT[lang],
    fontSize: 0.6,
    maxWidth: 3,
  }), [textProps, lang]);
```

Заменить рендер `{point.title}` на `{tx(point.title, lang)}` и `{point.subtitle}` на:
```tsx
            {point.subtitle ? tx(point.subtitle, lang) : ''}
```

- [ ] **Step 4: Проверить сборку**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 5: Коммит**

```bash
git add app/types/work.ts app/constants/work.ts app/components/experience/work/Timeline.tsx
HUSKY=0 git commit -m "feat(i18n): двуязычный таймлайн опыта с плейсхолдерами Alan

title/subtitle точек локализованы, шрифт по языку. Карьера автора форка
заменена вехами Alan (старт, mobile, fullstack, AI, команда)."
```

---

## Task 12: Дезинфекция метаданных (layout.tsx)

Заменяем SEO/мету на Alan, убираем чужой verification-токен, ставим GA по наличию ID, чиним theme-color.

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Заменить объект `metadata`**

Заменить весь `export const metadata: Metadata = { ... };` (строки 16-54) на:
```tsx
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://alkontv.github.io/'),
  title: "Alan — Fullstack Developer",
  description: "Fullstack developer building web, mobile, bots, CRM and AI-powered products — from idea to launch.",
  keywords: "Alan, Fullstack Developer, Flutter, FlutterFlow, Mobile Developer, Web, Backend, Telegram Bots, CRM, AI, Supabase, Postgres, Firebase, JavaScript, TypeScript, Python, Portfolio",
  authors: [{ name: "Alan" }],
  creator: "Alan",
  publisher: "Alan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Alan — Fullstack Developer",
    description: "Web, mobile, bots, CRM and AI — from idea to launch.",
    siteName: "Alan's Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alan — Fullstack Developer",
    description: "Web, mobile, bots, CRM and AI — from idea to launch.",
  },
};
```
(блок `verification` удалён полностью.)

- [ ] **Step 2: Поправить `themeColor` под светлую тему**

Заменить `themeColor: "#000000",` на:
```tsx
  themeColor: "#0690d4",
```

- [ ] **Step 3: GA только при наличии ID**

Заменить строку `<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''}/>` на:
```tsx
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
```

- [ ] **Step 4: Проверить сборку**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 5: Коммит**

```bash
git add app/layout.tsx
HUSKY=0 git commit -m "chore: дезинфекция метаданных — мета Alan, убрать чужой verification-токен

SEO/OG/twitter под бренд Alan, удалён Google verification-токен автора
форка, GA подключается только при заданном NEXT_PUBLIC_GA_ID,
theme-color приведён к светлой теме."
```

---

## Task 13: Конфиги и CI

Убираем мёртвый GA-env, переключаем деплой на ветку `main`, чиним fallback-URL в robots/sitemap.

**Files:**
- Modify: `next.config.ts`
- Modify: `.github/workflows/nextjs.yml`
- Modify: `app/robots.ts`
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Убрать мёртвый `env`-блок в `next.config.ts`**

Заменить весь файл на:
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // strict mode временно выключен; вернём в Фазе 2 после фикса утечек
  reactStrictMode: false,
};

export default nextConfig;
```

- [ ] **Step 2: Переключить деплой на ветку `main`**

В `.github/workflows/nextjs.yml` заменить:
```yaml
    branches: ["master"]
```
на:
```yaml
    branches: ["main"]
```

- [ ] **Step 3: Fallback-URL в `app/robots.ts` и `app/sitemap.ts`**

В обоих файлах заменить `'https://example.com'` на `'https://alkontv.github.io'`.

- [ ] **Step 4: Проверить сборку**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 5: Коммит**

```bash
git add next.config.ts .github/workflows/nextjs.yml app/robots.ts app/sitemap.ts
HUSKY=0 git commit -m "chore: чистка конфигов и CI под Alan

Убран мёртвый env-блок GA из next.config, деплой-workflow слушает main
вместо master, fallback-URL robots/sitemap указывает на alkontv.github.io."
```

---

## Task 14: Удаление чужих ассетов, README, комментарии моделей

**Files:**
- Delete: `public/Mohit Virli - Resume.pdf`
- Modify: `README.md`
- Modify: `app/components/models/WindowModel.tsx`, `Memory.tsx`, `Wanderer.tsx` (комментарии)

- [ ] **Step 1: Удалить чужое резюме и OG-картинку автора**

Run:
```bash
git rm "public/Mohit Virli - Resume.pdf"
git rm app/opengraph-image.png
```
Expected: оба файла удалены. (OG-картинка — авторское превью ссылок по конвенции Next; без замены OG будет без изображения — допустимо для плейсхолдера, своё добавим позже.)

- [ ] **Step 2: Переписать `README.md`**

Заменить весь файл на:
```markdown
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
```

- [ ] **Step 3: Почистить комментарии-пути автора в моделях**

Run (найти): `grep -rn "mohitvirli\|/Users/" app/components/models/`
Expected: строки-комментарии в шапках `WindowModel.tsx`, `Memory.tsx`, `Wanderer.tsx`, оставленные генератором gltfjsx (вида `/Users/mohitvirli/Desktop/... npx gltfjsx ...`).
Действие: в каждом из трёх файлов удалить/заменить эти строки-комментарии на нейтральный комментарий:
```tsx
// Модель сгенерирована gltfjsx (https://github.com/pmndrs/gltfjsx)
```
(Меняются только комментарии — код модели не трогать. После правки повторный `grep -rn "mohitvirli" app/` по коду должен быть пустым.)

- [ ] **Step 4: Проверить сборку**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 5: Коммит**

```bash
git add -A
HUSKY=0 git commit -m "chore: убрать чужие ассеты и переписать README

Удалено резюме автора форка, README под проект Alan (двуязычное
портфолио), почищены комментарии-пути автора в моделях."
```

---

## Task 15: Резюме PDF (EN + RU)

Сгенерировать два резюме навыком `pdf` и положить в `public/`. Ссылки на них уже заданы в `constants/footer.ts` (`./Alan-CV-en.pdf`, `./Alan-CV-ru.pdf`).

**Files:**
- Create: `public/Alan-CV-en.pdf`
- Create: `public/Alan-CV-ru.pdf`

**Данные для резюме (согласованы с сайтом):**
- Имя: **Alan** (без фамилии).
- Роль: Fullstack Developer — web, mobile, bots, CRM, AI.
- Контакты: Telegram `t.me/jdm_as_fuck`, Instagram `instagram.com/alkontv`, GitHub `github.com/alkontv`.
- Навыки: Flutter / FlutterFlow, JavaScript / TypeScript, Python, Node, React/Next, Postgres, Supabase, Firebase; Telegram-боты, CRM, интеграции платежей, AI-интеграции.
- Опыт (плейсхолдеры, как в `work.ts`): 2019 старт → 2021 Mobile/FlutterFlow → 2023 Fullstack → 2024 AI/Automation → сейчас работа в команде с senior-инженером.
- Проекты (как в `projects.ts`): Flutter Marketplace, AI Telegram Bot, Business CRM, Web Platform, Payments Automation, Analytics Landing.

- [ ] **Step 1: Сгенерировать оба PDF навыком `pdf`**

Использовать навык `anthropic-skills:pdf`: создать чистое одностраничное резюме в тёмной/минималистичной эстетике (в духе сайта). EN-версия → `public/Alan-CV-en.pdf`, RU-версия (тот же контент по-русски, имя «Alan» латиницей) → `public/Alan-CV-ru.pdf`.

- [ ] **Step 2: Проверить файлы**

Run:
```bash
file public/Alan-CV-en.pdf public/Alan-CV-ru.pdf
ls -la public/Alan-CV-*.pdf
```
Expected: оба — `PDF document`, ненулевого размера.

- [ ] **Step 3: Коммит**

```bash
git add public/Alan-CV-en.pdf public/Alan-CV-ru.pdf
HUSKY=0 git commit -m "assets: резюме Alan на EN и RU

Сгенерированы навыком pdf, контент согласован с сайтом (контакты,
навыки, опыт, проекты). Ссылка в футере ведёт на версию по языку."
```

---

## Task 16: Верификация Фазы 1

**Files:** —

- [ ] **Step 1: Никаких следов автора форка в коде/ассетах**

Run:
```bash
grep -rin "mohit\|clevir\|GsRYY\|awwwards\|virli" app/ public/ README.md next.config.ts || echo "ЧИСТО: следов автора нет"
```
Expected: `ЧИСТО: следов автора нет` (пусто). Если что-то найдено — устранить и довести до пустоты.

- [ ] **Step 2: Тесты и сборка**

Run:
```bash
npm test
npm run build
```
Expected: тесты — все `passed`; сборка — `✓ Compiled successfully`, каталог `out/` сгенерирован.

- [ ] **Step 3: Линт**

Run: `npm run lint`
Expected: без ошибок (предупреждения допустимы). Падающие правила — поправить.

- [ ] **Step 4: Визуальная проверка EN (headless-скриншот)**

Run:
```bash
docker compose up -d
# дождаться "Ready", затем:
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --hide-scrollbars --no-sandbox --use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader --window-size=1440,900 --virtual-time-budget=15000 --screenshot=/tmp/alan_en.png "http://localhost:3000/"
```
Действие: открыть `/tmp/alan_en.png`, убедиться — имя «Alan», английские слоганы, нет картинок-следов автора.

- [ ] **Step 5: Визуальная проверка RU (кириллица в 3D)**

Run: `open "http://localhost:3000"`
Действие: в браузере кликнуть переключатель «RU» (верхний правый угол рядом с темой). Убедиться, что русский текст (заголовок, слоганы, секции) **отрисовался кириллицей** (шрифт JetBrains Mono) — это ключевая проверка, что troika-шрифт подключён. Если кириллица не видна/«тофу» — проверить, что `public/fonts/JetBrainsMono-*.ttf` существуют и пути в `app/i18n/fonts.ts` верны.

- [ ] **Step 6: Зафиксировать завершение Фазы 1**

Run:
```bash
git tag phase-1-complete
git log --oneline phase-1-complete -1
```

---

## Self-review плана (заполняется исполнителем после прохождения всех задач)

- [ ] Все секции спека §5 (дезинфекция, i18n, переключатель, контент, деплой, шрифты) покрыты задачами.
- [ ] `grep` из Task 16 Step 1 — пусто.
- [ ] EN и RU обе визуально корректны (Task 16 Step 4-5).
- [ ] Тесты/сборка/линт зелёные.

