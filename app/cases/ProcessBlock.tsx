"use client";

import { dict, type Lang } from "@i18n";

const ProcessBlock = ({ lang }: { lang: Lang }) => {
  const t = dict[lang].cases;

  return (
    <section className="border-t border-current/15 py-12">
      <h2 className="mb-8 text-2xl font-semibold">{t.processTitle}</h2>
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {t.processSteps.map((step, i) => (
          <li key={i}>
            <div className="mb-2 text-xs uppercase tracking-wider opacity-40">
              {String(i + 1).padStart(2, "0")}
            </div>
            <p className="text-sm leading-relaxed opacity-90">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default ProcessBlock;
