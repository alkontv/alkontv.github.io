import type { ReactElement } from "react";

import type { DiagramId } from "@content";
import type { Lang } from "@i18n";

import AiIntakeDiagram from "./AiIntakeDiagram";
import EscrowDiagram from "./EscrowDiagram";
import SosDiagram from "./SosDiagram";
import VpnDiagram from "./VpnDiagram";

export const DIAGRAMS: Record<DiagramId, (props: { lang: Lang }) => ReactElement> = {
  sos: SosDiagram,
  escrow: EscrowDiagram,
  vpn: VpnDiagram,
  "ai-intake": AiIntakeDiagram,
};
