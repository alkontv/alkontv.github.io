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
    <article id={item.id} className="scroll-mt-24 border-t border-current/15 py-10">
      <div className="mb-3 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider opacity-60">
        <span>{tx(item.industry, lang)}</span>
        <span aria-hidden>&middot;</span>
        <span>{tx(STATUS_LABEL[item.status], lang)}</span>
        {item.budget !== undefined && (
          <>
            <span aria-hidden>&middot;</span>
            <span>{formatBudget(item.budget, lang)}</span>
          </>
        )}
      </div>

      <h3 className="mb-2 text-2xl font-semibold sm:text-3xl">{tx(item.name, lang)}</h3>
      <p className="mb-6 max-w-2xl text-base opacity-80">{tx(item.tagline, lang)}</p>

      <div className="grid gap-6 md:grid-cols-2">
        <section>
          <h4 className="mb-2 text-xs uppercase tracking-wider opacity-50">{t.problem}</h4>
          <p className="text-sm leading-relaxed opacity-90">{tx(item.problem, lang)}</p>
        </section>

        <section>
          <h4 className="mb-2 text-xs uppercase tracking-wider opacity-50">{t.solution}</h4>
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
        <h4 className="mb-2 text-xs uppercase tracking-wider opacity-50">{t.highlight}</h4>
        <p className="max-w-3xl text-sm leading-relaxed">{tx(item.highlight, lang)}</p>
      </section>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-xs uppercase tracking-wider opacity-50">{t.stack}</span>
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
