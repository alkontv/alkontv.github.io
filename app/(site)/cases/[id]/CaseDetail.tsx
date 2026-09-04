"use client";

import Link from "next/link";

import { CASES, FORMAT_LABEL, getCase } from "@content";
import { dict, tx } from "@i18n";

import { DIAGRAMS } from "../../diagrams";
import { TELEGRAM_URL } from "../../SiteChrome";
import { useResolvedLang } from "../../useResolvedLang";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="py-9">
    <h2 className="mb-4 text-[0.72rem] uppercase tracking-[0.18em] text-accent">{title}</h2>
    {children}
  </section>
);

const CaseDetail = ({ id }: { id: string }) => {
  const { lang } = useResolvedLang();
  const t = dict[lang].cases;
  const item = getCase(id);
  if (!item) return null;

  const index = CASES.findIndex((c) => c.id === id);
  const next = CASES[(index + 1) % CASES.length];
  const Diagram = item.diagram ? DIAGRAMS[item.diagram] : null;

  return (
    <main className="mx-auto max-w-4xl px-5 sm:px-8">
      <div className="rise pt-12 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-ink-faint transition-colors hover:text-ink"
        >
          <span>&larr;</span>
          {t.backToCases}
        </Link>
      </div>

      <header className="rise pb-10">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="text-[0.72rem] uppercase tracking-[0.18em] text-accent">
            {tx(item.industry, lang)}
          </span>
          {item.formats.map((f) => (
            <span key={f} className="chip">
              {tx(FORMAT_LABEL[f], lang)}
            </span>
          ))}
        </div>

        <h1 className="display mb-5 text-[2.1rem] leading-[1.1] font-semibold sm:text-[3.2rem]">
          {tx(item.name, lang)}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-ink-dim">
          {tx(item.tagline, lang)}
        </p>
      </header>

      {/* Экраны идут до текста: их смотрят раньше, чем читают. Рамки нет
          намеренно — мокап уже со своей тенью, коробка вокруг него читалась
          бы как вставленная картинка, а не как сам продукт. */}
      {item.cover && (
        <div className="rise relative mb-14 flex justify-center">
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 h-[90%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-accent/[0.09] blur-3xl"
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- статический экспорт без оптимизатора */}
          <img
            src={item.cover}
            alt={tx(item.name, lang)}
            /* главный элемент страницы и он выше сгиба: грузим сразу */
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="relative w-full max-w-[860px]"
          />
        </div>
      )}

      {/* Деловой смысл вперёд технических деталей — клиент читает сверху. */}
      <div className="card mb-4 p-7 sm:p-9">
        <h2 className="mb-3 text-[0.72rem] uppercase tracking-[0.18em] text-accent">
          {t.impact}
        </h2>
        <p className="text-lg leading-relaxed">{tx(item.impact, lang)}</p>
      </div>

      <div className="hairline" />

      <div className="grid gap-x-12 md:grid-cols-2">
        <Section title={t.problem}>
          <p className="leading-relaxed text-ink-dim">{tx(item.problem, lang)}</p>
        </Section>

        <Section title={t.role}>
          <p className="leading-relaxed text-ink-dim">{tx(item.role, lang)}</p>
        </Section>
      </div>

      <div className="hairline" />

      <Section title={t.solution}>
        <ul className="space-y-3">
          {item.solution.map((s, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-ink-dim">
              <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-accent/60" />
              <span>{tx(s, lang)}</span>
            </li>
          ))}
        </ul>
      </Section>

      {Diagram && (
        <>
          <div className="hairline" />
          <div className="py-6">
            <Diagram lang={lang} />
          </div>
        </>
      )}

      <div className="hairline" />

      <Section title={t.highlight}>
        <p className="max-w-3xl text-lg leading-relaxed">{tx(item.highlight, lang)}</p>
      </Section>

      <div className="hairline" />

      <section className="grid gap-8 py-9 sm:grid-cols-2">
        <div>
          <h2 className="mb-4 text-[0.72rem] uppercase tracking-[0.18em] text-accent">
            {t.stack}
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {item.stack.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
        </div>
        {item.integrations.length > 0 && (
          <div>
            <h2 className="mb-4 text-[0.72rem] uppercase tracking-[0.18em] text-accent">
              {t.integrations}
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {item.integrations.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      <div className="hairline" />

      <section className="py-12">
        <div className="card p-8 sm:p-10">
          <h2 className="display mb-3 text-xl font-semibold sm:text-2xl">{t.ctaTitle}</h2>
          <p className="mb-7 max-w-xl leading-relaxed text-ink-dim">{t.ctaText}</p>
          <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn-primary">
            {t.ctaButton}
          </a>
        </div>
      </section>

      <Link href={`/cases/${next.id}`} className="card-link group mb-16 block">
        <div className="card flex items-center justify-between gap-6 p-7">
          <div>
            <div className="mb-1.5 text-[0.72rem] uppercase tracking-[0.18em] text-ink-faint">
              {t.nextCase}
            </div>
            <div className="display text-lg font-semibold">{tx(next.name, lang)}</div>
          </div>
          <span className="text-2xl text-accent transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </div>
      </Link>
    </main>
  );
};

export default CaseDetail;
