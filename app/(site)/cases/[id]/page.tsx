import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CASES, getCase } from "@content";

import CaseDetail from "./CaseDetail";

export const generateStaticParams = () => CASES.map((c) => ({ id: c.id }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> => {
  const { id } = await params;
  const item = getCase(id);
  if (!item) return {};
  return {
    title: `${item.name.ru} — Alan`,
    description: item.tagline.ru,
  };
};

const CasePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  if (!getCase(id)) notFound();
  return <CaseDetail id={id} />;
};

export default CasePage;
