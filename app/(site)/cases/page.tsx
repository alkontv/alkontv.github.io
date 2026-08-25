import type { Metadata } from "next";

import CasesIndex from "./CasesIndex";

export const metadata: Metadata = {
  title: "Alan — Работы",
  description:
    "Маркетплейсы с эскроу, платежи, AI в продукте, self-hosted инфраструктура, Telegram-боты и веб. Тринадцать кейсов из одиннадцати отраслей.",
};

const CasesPage = () => <CasesIndex />;

export default CasesPage;
