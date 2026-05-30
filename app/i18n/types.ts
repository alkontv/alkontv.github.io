export type LocalizedText = { en: string; ru: string };

export interface Content {
  hero: { title: string };
  window: { slogans: string[] };
  sections: { experience: string; work: string; projects: string };
  hint: { scroll: string; pan: string };
  footer: { telegram: string; github: string; instagram: string; resume: string };
}
