import type { Metadata } from "next";

import ResumeView from "./ResumeView";

export const metadata: Metadata = {
  title: "Alan — Резюме",
  description:
    "Разработчик полного цикла: мобильные приложения, веб, Telegram-боты, бэкенд и инфраструктура. Опыт, стек и избранные проекты.",
};

const ResumePage = () => <ResumeView />;

export default ResumePage;
