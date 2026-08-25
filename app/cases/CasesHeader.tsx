"use client";

import { CASES, STATS } from "@content";
import { dict, type Lang } from "@i18n";

const TELEGRAM_URL = "https://t.me/jdm_as_fuck";

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div>
    <div className="text-2xl font-semibold sm:text-3xl">{value}</div>
    <div className="text-xs uppercase tracking-wider opacity-50">{label}</div>
  </div>
);

const CasesHeader = ({ lang }: { lang: Lang }) => {
  const t = dict[lang].cases;

  return (
    <header className="pb-10">
      <h1 className="mb-3 text-3xl font-semibold sm:text-5xl">{t.lead}</h1>
      <p className="mb-8 max-w-2xl text-base opacity-80 sm:text-lg">{t.sublead}</p>

      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noreferrer"
        className="mb-10 inline-block rounded-full border border-current px-5 py-2 text-sm"
      >
        {t.ctaButton}
      </a>

      <div className="mb-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
        <Stat value={`${STATS.apps}+`} label={t.statApps} />
        <Stat value={String(CASES.length)} label={t.statCases} />
        <Stat value={String(STATS.markets)} label={t.statMarkets} />
        <Stat
          value={lang === "ru" ? `с ${STATS.sinceYear}` : `since ${STATS.sinceYear}`}
          label={t.statSince}
        />
      </div>
    </header>
  );
};

export default CasesHeader;
