export type LocalizedText = { en: string; ru: string };

export interface Content {
  hero: { title: string };
  window: { slogans: string[] };
  sections: { experience: string; work: string; projects: string };
  hint: { scroll: string; pan: string };
  footer: { telegram: string; github: string; instagram: string; resume: string };
  cases: {
    lead: string;
    sublead: string;
    statApps: string;
    statCases: string;
    statMarkets: string;
    statSince: string;
    filterAll: string;
    problem: string;
    solution: string;
    highlight: string;
    stack: string;
    integrations: string;
    skillsTitle: string;
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
    back: string;
    cv: string;
    deck: string;
    anonNote: string;
  };
}
