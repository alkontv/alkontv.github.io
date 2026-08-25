/**
 * Выгружает контент портфолио в JSON, чтобы резюме и презентация собирались
 * из того же источника, что и сайт, и не разъезжались с ним.
 *
 * Запуск: npx tsx scripts/dump-content.ts > content.json
 */
import { CASES, EMPLOYMENT, FEATURED_CASES, STATS, SKILL_GROUPS } from "@content";
import { dict } from "@i18n";

process.stdout.write(
  JSON.stringify({
    stats: STATS,
    casesTotal: CASES.length,
    cases: CASES.map((c) => ({
      id: c.id,
      name: c.name,
      industry: c.industry,
      tagline: c.tagline,
      highlight: c.highlight,
      stack: c.stack,
      featured: c.featured,
    })),
    featured: FEATURED_CASES.map((c) => ({
      name: c.name,
      tagline: c.tagline,
      industry: c.industry,
    })),
    employment: EMPLOYMENT,
    skills: SKILL_GROUPS,
    copy: { ru: dict.ru.cases, en: dict.en.cases },
  })
);
