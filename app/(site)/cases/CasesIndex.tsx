"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { CASES, FORMAT_LABEL, SKILL_GROUPS, STATS, type CaseFormat } from "@content";
import { dict, tx } from "@i18n";

import { TELEGRAM_URL } from "../SiteChrome";
import { useResolvedLang } from "../useResolvedLang";

const CasesIndex = () => {
  const { lang } = useResolvedLang();
  const t = dict[lang].cases;
  const [active, setActive] = useState<CaseFormat | null>(null);

  const formats = useMemo(() => {
    const set = new Set<CaseFormat>();
    CASES.forEach((c) => c.formats.forEach((f) => set.add(f)));
    return [...set];
  }, []);

  const visible = useMemo(
    () => (active ? CASES.filter((c) => c.formats.includes(active)) : CASES),
    [active]
  );

  const stats = [
    { value: `${STATS.apps}+`, label: t.statApps },
    { value: String(CASES.length), label: t.statCases },
    { value: String(STATS.markets), label: t.statMarkets },
    { value: String(STATS.sinceYear), label: t.statSince },
  ];

  return (
    <main className="mx-auto max-w-6xl px-5 sm:px-8">
      {/* ── Первый экран ───────────────────────────────────── */}
      <section className="rise pt-16 pb-20 sm:pt-24 sm:pb-28">
        <h1 className="display mb-7 max-w-4xl whitespace-pre-line text-[2.3rem] leading-[1.06] font-semibold sm:text-[3.4rem] lg:text-[4rem]">
          {t.lead}
        </h1>
        <p className="mb-10 max-w-2xl text-base leading-relaxed text-ink-dim sm:text-lg">
          {t.sublead}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn-primary">
            {t.ctaButton}
          </a>
          <Link href="/resume" className="btn-ghost">
            {t.navResume}
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-y-8 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="display text-3xl font-semibold sm:text-4xl">{s.value}</div>
              <div className="mt-1.5 text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="hairline" />

      {/* ── Кейсы ──────────────────────────────────────────── */}
      <section className="py-14">
        <div className="mb-10 flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={active === null}
            onClick={() => setActive(null)}
            className={`chip ${active === null ? "chip-active" : ""}`}
          >
            {t.filterAll}
          </button>
          {formats.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={active === f}
              onClick={() => setActive(active === f ? null : f)}
              className={`chip ${active === f ? "chip-active" : ""}`}
            >
              {tx(FORMAT_LABEL[f], lang)}
            </button>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {visible.map((item, i) => (
            <Link key={item.id} href={`/cases/${item.id}`} className="card-link group block">
              <article className="card flex h-full flex-col p-7 sm:p-8">
                <div className="mb-5 flex items-baseline justify-between gap-4">
                  <span className="text-[0.7rem] uppercase tracking-[0.16em] text-accent">
                    {tx(item.industry, lang)}
                  </span>
                  <span className="display text-xs text-ink-faint/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h2 className="display mb-3 text-xl leading-snug font-semibold sm:text-2xl">
                  {tx(item.name, lang)}
                </h2>
                <p className="mb-6 text-sm leading-relaxed text-ink-dim">
                  {tx(item.tagline, lang)}
                </p>

                <div className="mt-auto flex flex-wrap items-center gap-1.5">
                  {item.formats.map((f) => (
                    <span key={f} className="chip">
                      {tx(FORMAT_LABEL[f], lang)}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm text-accent">
                  {t.openCase}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <div className="hairline" />

      {/* ── Что умею ───────────────────────────────────────── */}
      <section className="py-16">
        <h2 className="display mb-2 text-2xl font-semibold sm:text-3xl">{t.skillsTitle}</h2>
        <p className="mb-10 text-sm text-ink-faint">{t.skillsLead}</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_GROUPS.map((g, i) => (
            <div key={i} className="card p-6">
              <h3 className="mb-3 text-sm font-semibold text-accent">{tx(g.title, lang)}</h3>
              <ul className="space-y-2 text-[0.82rem] leading-relaxed text-ink-dim">
                {g.items.map((item, j) => (
                  <li key={j}>{tx(item, lang)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="hairline" />

      {/* ── Как идёт работа ────────────────────────────────── */}
      <section className="py-16">
        <h2 className="display mb-2 text-2xl font-semibold sm:text-3xl">{t.processTitle}</h2>
        <p className="mb-10 text-sm text-ink-faint">{t.processLead}</p>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.processSteps.map((step, i) => (
            <li key={i} className="relative pl-11">
              <span className="display absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-white/4 text-xs text-accent">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-ink-dim">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Призыв ─────────────────────────────────────────── */}
      <section className="pb-20">
        <div className="card overflow-hidden p-9 sm:p-12">
          <h2 className="display mb-4 text-2xl font-semibold sm:text-4xl">{t.ctaTitle}</h2>
          <p className="mb-8 max-w-2xl leading-relaxed text-ink-dim">{t.ctaText}</p>
          <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn-primary">
            {t.ctaButton}
          </a>
        </div>
      </section>
    </main>
  );
};

export default CasesIndex;
