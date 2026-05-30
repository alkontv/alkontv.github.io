import type { LocalizedText } from "@i18n";

interface ProjectUrl {
  text: string;
  url: string;
}

export interface Project {
  title: string;
  date: string;
  subtext: LocalizedText;
  url?: string;
  urls?: ProjectUrl[];
}