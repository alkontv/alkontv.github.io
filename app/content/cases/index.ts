import type { CaseStudy } from "../types";

import { safety } from "./safety";
import { creatorApp } from "./creator-app";
import { meditation } from "./meditation";
import { familyNetwork } from "./family-network";
import { consultations } from "./consultations";
import { loyalty } from "./loyalty";
import { vehicleSharing } from "./vehicle-sharing";
import { foodRescue } from "./food-rescue";
import { escrowMarketplace } from "./escrow-marketplace";
import { ecommerce } from "./ecommerce";
import { vpnService } from "./vpn-service";
import { checklists } from "./checklists";
import { aiJobs } from "./ai-jobs";

/**
 * Порядок — по убыванию силы кейса, а не по дате: именно так их читают
 * сверху вниз на /cases.
 */
export const CASES: CaseStudy[] = [
  safety,
  vpnService,
  escrowMarketplace,
  creatorApp,
  ecommerce,
  aiJobs,
  familyNetwork,
  consultations,
  loyalty,
  meditation,
  vehicleSharing,
  foodRescue,
  checklists,
];

/** Шесть кейсов для 3D-карусели: раскладка ProjectsCarousel рассчитана на шесть. */
export const FEATURED_CASES: CaseStudy[] = CASES.filter((c) => c.featured);

export const getCase = (id: string): CaseStudy | undefined =>
  CASES.find((c) => c.id === id);
