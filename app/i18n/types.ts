export type LocalizedText = { en: string; ru: string };

export interface Content {
  hero: { title: string };
  window: { slogans: string[] };
  sections: { experience: string; work: string; projects: string };
  hint: { scroll: string; pan: string };
  footer: { telegram: string; github: string; instagram: string; resume: string };
  cases: {
    navCases: string;
    navResume: string;
    navContact: string;
    lead: string;
    sublead: string;
    statApps: string;
    statMarkets: string;
    statSince: string;
    filterAll: string;
    openCase: string;
    impact: string;
    role: string;
    problem: string;
    solution: string;
    highlight: string;
    stack: string;
    integrations: string;
    backToCases: string;
    nextCase: string;
    skillsTitle: string;
    skillsLead: string;
    processTitle: string;
    processLead: string;
    processSteps: string[];
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
    resumeTitle: string;
    resumeLead: string;
    resumeDownload: string;
    resumeExperience: string;
    resumeSelected: string;
    resumeExtra: string;
    resumeExtraItems: string[];
    resumeContacts: string;
    anonNote: string;
  };
}
