"use client";

import { SKILL_GROUPS } from "@content";
import { dict, tx, type Lang } from "@i18n";

const SkillsBlock = ({ lang }: { lang: Lang }) => (
  <section className="border-t border-current/15 py-12">
    <h2 className="mb-8 text-2xl font-semibold">{dict[lang].cases.skillsTitle}</h2>
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {SKILL_GROUPS.map((group, i) => (
        <div key={i}>
          <h3 className="mb-3 text-sm uppercase tracking-wider opacity-50">
            {tx(group.title, lang)}
          </h3>
          <ul className="space-y-1.5 text-sm opacity-90">
            {group.items.map((item, j) => (
              <li key={j}>{tx(item, lang)}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

export default SkillsBlock;
