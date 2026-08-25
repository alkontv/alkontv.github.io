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
