import type { Metadata } from "next";

import Scene from "./Scene";

export const metadata: Metadata = {
  title: "Alan — 3D-портфолио",
  description:
    "Интерактивная 3D-версия портфолио. Основная версия — на главной странице.",
};

// Метаданные экспортируются только из серверного компонента, а сцене нужен
// клиент — поэтому она вынесена в Scene.tsx.
const ThreeDPage = () => <Scene />;

export default ThreeDPage;
