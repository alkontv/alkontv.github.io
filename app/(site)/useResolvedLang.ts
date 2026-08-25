"use client";

import { useSyncExternalStore } from "react";
import { useLangStore, type Lang } from "@i18n";

// Нас интересует не «смонтирован ли компонент», а «поднял ли persist язык
// из localStorage»: именно после этого момента язык становится настоящим.
const subscribe = (onChange: () => void) =>
  useLangStore.persist.onFinishHydration(onChange);
const getSnapshot = () => useLangStore.persist.hasHydrated();
const getServerSnapshot = () => false;

/**
 * Язык для DOM-страницы. До регидратации — en, как в статическом HTML;
 * после — значение стора. Иначе гидратация разъезжается.
 *
 * Возвращает и флаг готовности: он нужен тем, кто должен дождаться
 * настоящего языка (например, доводка скролла к якорю — после смены языка
 * высоты блоков меняются, и браузерный переход к #id промахивается).
 */
export const useResolvedLang = (): { lang: Lang; hydrated: boolean } => {
  const hydrated = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const lang = useLangStore((s) => s.lang);
  return { lang: hydrated ? lang : "en", hydrated };
};
