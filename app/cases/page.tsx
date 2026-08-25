import type { Metadata } from "next";

import CasesView from "./CasesView";

export const metadata: Metadata = {
  title: "Alan — Cases",
  description:
    "Selected client and product cases: marketplaces with escrow, payments, AI features, self-hosted backends, Telegram bots and web.",
};

const CasesPage = () => <CasesView />;

export default CasesPage;
