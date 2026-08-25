"use client";

import type { Lang } from "@i18n";
import { Arrow, Box, DiagramFrame } from "./DiagramFrame";

const L = {
  ru: {
    pay: "Заказчик платит",
    hold: "Холд на площадке",
    holdSub: "деньги заморожены",
    done: "Работа принята",
    payout: "Выплата исполнителю",
    payoutSub: "минус комиссия площадки",
  },
  en: {
    pay: "Client pays",
    hold: "Held by platform",
    holdSub: "funds frozen",
    done: "Job confirmed",
    payout: "Payout to worker",
    payoutSub: "minus platform fee",
  },
} as const;

const EscrowDiagram = ({ lang }: { lang: Lang }) => {
  const t = L[lang];
  return (
    <DiagramFrame viewBox="0 0 720 110">
      <Box x={5} y={30} w={150} label={t.pay} />
      <Arrow x1={158} y1={53} x2={183} y2={53} />
      <Box x={186} y={30} w={160} label={t.hold} sub={t.holdSub} />
      <Arrow x1={349} y1={53} x2={374} y2={53} />
      <Box x={377} y={30} w={150} label={t.done} />
      <Arrow x1={530} y1={53} x2={555} y2={53} />
      <Box x={558} y={30} w={158} label={t.payout} sub={t.payoutSub} />
    </DiagramFrame>
  );
};

export default EscrowDiagram;
