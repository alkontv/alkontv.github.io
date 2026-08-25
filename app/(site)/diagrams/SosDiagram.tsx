"use client";

import type { Lang } from "@i18n";
import { Arrow, Box, DiagramFrame } from "./DiagramFrame";

const L = {
  ru: {
    tap: "Нажатие SOS",
    rescue: "Служба спасения",
    rescueSub: "заявление, координаты, ссылка",
    trusted: "Доверенные лица",
    trustedSub: "SMS с координатами",
    storage: "Хранилище",
    storageSub: "видео по подписанной ссылке",
    db: "База",
    dbSub: "событие SOS",
    infraTitle: "Развёрнуто самостоятельно",
    infraSub: "PostgreSQL, авторизация, хранилище, edge-функции",
  },
  en: {
    tap: "SOS tap",
    rescue: "Emergency service",
    rescueSub: "statement, coordinates, link",
    trusted: "Trusted contacts",
    trustedSub: "SMS with coordinates",
    storage: "Storage",
    storageSub: "video behind a signed URL",
    db: "Database",
    dbSub: "SOS event",
    infraTitle: "Self-hosted by me",
    infraSub: "PostgreSQL, auth, storage, edge functions",
  },
} as const;

const SosDiagram = ({ lang }: { lang: Lang }) => {
  const t = L[lang];
  return (
    <DiagramFrame viewBox="0 0 720 300">
      <Box x={5} y={122} w={140} label={t.tap} />
      <Arrow x1={148} y1={145} x2={228} y2={45} />
      <Arrow x1={148} y1={145} x2={228} y2={112} />
      <Arrow x1={148} y1={145} x2={228} y2={182} />
      <Arrow x1={148} y1={145} x2={228} y2={250} />
      <Box x={232} y={20} w={215} label={t.rescue} sub={t.rescueSub} />
      <Box x={232} y={90} w={215} label={t.trusted} sub={t.trustedSub} />
      <Box x={232} y={160} w={215} label={t.storage} sub={t.storageSub} />
      <Box x={232} y={230} w={215} label={t.db} sub={t.dbSub} />
      <Box x={470} y={90} w={245} h={116} label="" dashed />
      <text
        x={592}
        y={136}
        textAnchor="middle"
        fontSize={12}
        fill="currentColor"
        fillOpacity={0.75}
        stroke="none"
      >
        {t.infraTitle}
      </text>
      <text
        x={592}
        y={156}
        textAnchor="middle"
        fontSize={10}
        fill="currentColor"
        fillOpacity={0.5}
        stroke="none"
      >
        {t.infraSub}
      </text>
    </DiagramFrame>
  );
};

export default SosDiagram;
