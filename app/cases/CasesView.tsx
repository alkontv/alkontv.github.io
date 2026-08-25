"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { CASES, type CaseFormat } from "@content";
import { dict } from "@i18n";

import CaseCard from "./CaseCard";
import CasesHeader from "./CasesHeader";
import FormatFilter from "./FormatFilter";
import ProcessBlock from "./ProcessBlock";
import SkillsBlock from "./SkillsBlock";
import { useResolvedLang } from "./useResolvedLang";

const TELEGRAM_URL = "https://t.me/jdm_as_fuck";

const CasesView = () => {
  const { lang, hydrated } = useResolvedLang();
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

  // Переход с главной идёт на /cases#<id>. Статический HTML отдаётся на
  // английском, после регидратации язык меняется и высоты блоков вместе с ним —
  // браузер к этому моменту уже отскроллил мимо. Доводим руками один раз,
  // когда настоящий язык применён.
  useEffect(() => {
    if (!hydrated) return;
    const id = window.location.hash.slice(1);
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ block: "start" });
  }, [hydrated]);

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

      <ProcessBlock lang={lang} />

      <section className="border-t border-current/15 py-12">
        <h2 className="mb-2 text-2xl font-semibold">{t.ctaTitle}</h2>
        <p className="mb-6 max-w-xl opacity-80">{t.ctaText}</p>
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
          <Link
            href="/"
            className="rounded-full border border-current/25 px-5 py-2 text-sm opacity-70"
          >
            {t.back}
          </Link>
        </div>

        {/* Оговорка про NDA — разговор для конца страницы. В шапке она была
            третьим, что читает клиент, и открывала знакомство с отказа. */}
        <p className="mt-10 max-w-2xl text-xs leading-relaxed opacity-40">{t.anonNote}</p>
      </section>
    </main>
  );
};

export default CasesView;
