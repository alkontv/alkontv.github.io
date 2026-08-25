"use client";

import type { Lang } from "@i18n";
import { Arrow, Box, DiagramFrame } from "./DiagramFrame";

const L = {
  ru: {
    client: "Бот и мини-приложение",
    clientSub: "выбор тарифа, оплата",
    billing: "Биллинг",
    billingSub: "подписки, очередь задач",
    agent: "Агент на Go",
    agentSub: "провижининг",
    node: "Сервер",
    back: "Ссылка на подписку — обратно пользователю",
    admin: "Админка",
    adminSub: "дашборды, промокоды",
  },
  en: {
    client: "Bot and mini app",
    clientSub: "plan choice, payment",
    billing: "Billing",
    billingSub: "subscriptions, job queue",
    agent: "Go agent",
    agentSub: "provisioning",
    node: "Server",
    back: "Subscription link back to the user",
    admin: "Admin panel",
    adminSub: "dashboards, promo codes",
  },
} as const;

const VpnDiagram = ({ lang }: { lang: Lang }) => {
  const t = L[lang];
  return (
    <DiagramFrame viewBox="0 0 720 210">
      <Box x={5} y={20} w={165} label={t.client} sub={t.clientSub} />
      <Arrow x1={173} y1={43} x2={198} y2={43} />
      <Box x={201} y={20} w={160} label={t.billing} sub={t.billingSub} />
      <Arrow x1={364} y1={43} x2={389} y2={43} />
      <Box x={392} y={20} w={150} label={t.agent} sub={t.agentSub} />
      <Arrow x1={545} y1={43} x2={570} y2={43} />
      <Box x={573} y={20} w={140} label={t.node} />
      <Arrow x1={643} y1={80} x2={90} y2={80} />
      <text
        x={366}
        y={74}
        textAnchor="middle"
        fontSize={10}
        fill="currentColor"
        fillOpacity={0.55}
        stroke="none"
      >
        {t.back}
      </text>
      <Arrow x1={281} y1={90} x2={281} y2={125} />
      <Box x={201} y={128} w={160} label={t.admin} sub={t.adminSub} dashed />
    </DiagramFrame>
  );
};

export default VpnDiagram;
