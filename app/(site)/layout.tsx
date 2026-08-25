import type { ReactNode } from "react";

import SiteChrome from "./SiteChrome";

/** Общая оболочка контентных разделов. 3D-сцена на «/» живёт отдельно. */
const SiteLayout = ({ children }: { children: ReactNode }) => (
  <div className="site">
    <SiteChrome>{children}</SiteChrome>
  </div>
);

export default SiteLayout;
