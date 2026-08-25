"use client";

import type { Lang } from "@i18n";
import { Arrow, Box, DiagramFrame } from "./DiagramFrame";

const L = {
  ru: {
    input: "Голос или текст",
    dialog: "Диалог с AI",
    dialogSub: "уточняющие вопросы",
    record: "Структурированная запись",
    recordSub: "вместо анкеты из 20 полей",
    search: "Векторный подбор",
    searchSub: "по смыслу, не по словам",
    chat: "Чат сторон",
  },
  en: {
    input: "Voice or text",
    dialog: "AI dialogue",
    dialogSub: "clarifying questions",
    record: "Structured record",
    recordSub: "instead of a 20-field form",
    search: "Vector matching",
    searchSub: "by meaning, not words",
    chat: "Chat between sides",
  },
} as const;

const AiIntakeDiagram = ({ lang }: { lang: Lang }) => {
  const t = L[lang];
  return (
    <DiagramFrame viewBox="0 0 720 125">
      <Box x={5} y={35} w={130} label={t.input} />
      <Arrow x1={138} y1={58} x2={158} y2={58} />
      <Box x={161} y={35} w={140} label={t.dialog} sub={t.dialogSub} />
      <Arrow x1={304} y1={58} x2={324} y2={58} />
      <Box x={327} y={35} w={175} label={t.record} sub={t.recordSub} />
      <Arrow x1={505} y1={58} x2={525} y2={58} />
      <Box x={528} y={35} w={150} label={t.search} sub={t.searchSub} />
      <Arrow x1={603} y1={83} x2={603} y2={103} />
      <text
        x={603}
        y={118}
        textAnchor="middle"
        fontSize={10}
        fill="currentColor"
        fillOpacity={0.55}
        stroke="none"
      >
        {t.chat}
      </text>
    </DiagramFrame>
  );
};

export default AiIntakeDiagram;
