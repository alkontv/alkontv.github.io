import { FEATURED_CASES } from "@content";
import { Project } from "../types";

/**
 * Плитки карусели — проекция шести сильнейших кейсов. Данные не дублируются:
 * текст правится в app/content/cases и расходится в 3D, на /cases и в PDF.
 */
export const PROJECTS: Project[] = FEATURED_CASES.map((c) => ({
  title: c.name,
  caption: c.industry,
  subtext: c.tagline,
  url: `/cases#${c.id}`,
}));
