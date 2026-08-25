"use client";

import Link from "next/link";

import {
  EMPLOYMENT,
  FEATURED_CASES,
  SKILL_GROUPS,
  SOFT_SKILLS,
  STACK_GROUPS,
  STATS,
} from "@content";
import { dict, tx } from "@i18n";

import { TELEGRAM_URL } from "../SiteChrome";
import { useResolvedLang } from "../useResolvedLang";

const CONTACTS = [
  { label: "Telegram", value: "@jdm_as_fuck", href: TELEGRAM_URL },
  { label: "GitHub", value: "github.com/alkontv", href: "https://github.com/alkontv" },
];

const ResumeView = () => {
  const { lang } = useResolvedLang();
  const t = dict[lang].cases;

  const stats = [
    { value: `${STATS.apps}+`, label: t.statApps },
    { value: String(STATS.markets), label: t.statMarkets },
    { value: String(STATS.sinceYear), label: t.statSince },
  ];

  return (
    <main className="mx-auto max-w-4xl px-5 sm:px-8">
      <section className="rise pt-16 pb-14 sm:pt-24">
        <h1 className="display mb-5 text-[2.4rem] leading-[1.08] font-semibold sm:text-[3.6rem]">
          {t.resumeTitle}
        </h1>
        <p className="mb-9 max-w-2xl text-base leading-relaxed text-ink-dim sm:text-lg">
          {t.resumeLead}
        </p>
        <a
          href={lang === "ru" ? "/Alan-CV-ru.pdf" : "/Alan-CV-en.pdf"}
          className="btn-primary inline-block"
        >
          {t.resumeDownload}
        </a>

        <div className="mt-14 grid grid-cols-3 gap-6">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="display text-2xl font-semibold sm:text-3xl">{s.value}</div>
              <div className="mt-1.5 text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="hairline" />

      <section className="py-14">
        <h2 className="display mb-9 text-2xl font-semibold">{t.resumeExperience}</h2>
        <ol className="relative space-y-8 pl-8">
          <span
            aria-hidden
            className="absolute left-[3px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/60 via-white/12 to-transparent"
          />
          {EMPLOYMENT.map((job, i) => (
            <li key={i} className="relative">
              <span
                aria-hidden
                className="absolute -left-8 top-2 h-[7px] w-[7px] rounded-full bg-accent shadow-[0_0_0_4px_rgba(76,194,255,0.14)]"
              />
              <div className="mb-1.5 text-[0.72rem] uppercase tracking-[0.18em] text-accent">
                {tx(job.period, lang)}
              </div>
              <div className="display mb-1 text-lg font-semibold">
                {tx(job.company, lang)}
              </div>
              <div className="mb-2 text-sm text-ink">{tx(job.role, lang)}</div>
              <p className="max-w-2xl text-sm leading-relaxed text-ink-dim">
                {tx(job.summary, lang)}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <div className="hairline" />

      <section className="py-14">
        <h2 className="display mb-9 text-2xl font-semibold">{t.resumeSelected}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {FEATURED_CASES.map((c) => (
            <Link key={c.id} href={`/cases/${c.id}`} className="card-link group block">
              <article className="card h-full p-6">
                <div className="mb-2.5 text-[0.7rem] uppercase tracking-[0.16em] text-accent">
                  {tx(c.industry, lang)}
                </div>
                <h3 className="display mb-2 text-base font-semibold">{tx(c.name, lang)}</h3>
                <p className="text-sm leading-relaxed text-ink-dim">{tx(c.tagline, lang)}</p>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <div className="hairline" />

      <section className="py-14">
        <h2 className="display mb-9 text-2xl font-semibold">{t.stackTitle}</h2>
        <div className="space-y-5">
          {STACK_GROUPS.map((g, i) => (
            <div key={i} className="grid gap-2 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <h3 className="text-sm font-semibold text-accent">{tx(g.label, lang)}</h3>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="hairline" />

      <section className="py-14">
        <h2 className="display mb-9 text-2xl font-semibold">{t.skillsTitle}</h2>
        <div className="space-y-7">
          {SKILL_GROUPS.map((g, i) => (
            <div key={i} className="grid gap-2 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <h3 className="text-sm font-semibold text-accent">{tx(g.title, lang)}</h3>
              <p className="text-sm leading-relaxed text-ink-dim">
                {g.items.map((item) => tx(item, lang)).join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="hairline" />

      <section className="py-14">
        <h2 className="display mb-2 text-2xl font-semibold">{t.softTitle}</h2>
        <p className="mb-9 text-sm text-ink-faint">{t.softLead}</p>
        <ul className="grid gap-4 sm:grid-cols-2">
          {SOFT_SKILLS.map((item, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink-dim">
              <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-accent/60" />
              <span>{tx(item, lang)}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="hairline" />

      <section className="py-14">
        <h2 className="display mb-7 text-2xl font-semibold">{t.resumeExtra}</h2>
        <ul className="space-y-4">
          {t.resumeExtraItems.map((item, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-ink-dim">
              <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-accent/60" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="hairline" />

      <section className="py-14 pb-20">
        <h2 className="display mb-7 text-2xl font-semibold">{t.resumeContacts}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {CONTACTS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="card-link block"
            >
              <div className="card flex items-center justify-between p-6">
                <div>
                  <div className="mb-1 text-[0.7rem] uppercase tracking-[0.16em] text-ink-faint">
                    {c.label}
                  </div>
                  <div className="text-base">{c.value}</div>
                </div>
                <span className="text-accent">&rarr;</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ResumeView;
