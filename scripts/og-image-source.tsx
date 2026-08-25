/**
 * Исходник OG-картинки. НЕ маршрут: лежит вне app/ намеренно.
 *
 * Next.js кладёт сгенерированный маршрут метаданных в out/opengraph-image
 * БЕЗ расширения, а GitHub Pages определяет Content-Type по расширению —
 * скрапер мессенджера может получить application/octet-stream вместо PNG
 * и не показать превью. Поэтому картинка сгенерирована один раз и лежит
 * статикой в public/og.png.
 *
 * Чтобы перегенерировать: временно скопировать этот файл в
 * app/opengraph-image.tsx, выполнить `npm run build`, затем
 * `cp out/opengraph-image public/og.png` и убрать файл из app/.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { STATS } from "@content";

// Без этого статический экспорт отказывается собирать маршрут метаданных.
export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Alan — full-cycle developer";

// Текст только латиницей: soria не содержит кириллицы, а картинка одна на оба языка.
const soria = readFileSync(join(process.cwd(), "public", "soria-font.ttf"));

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#ededed",
          padding: 72,
          fontFamily: "Soria",
        }}
      >
        <div style={{ fontSize: 128, letterSpacing: 8 }}>ALAN</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 44, color: "#0690d4" }}>FULL-CYCLE DEVELOPER</div>
          <div style={{ fontSize: 28, opacity: 0.7 }}>
            MOBILE / WEB / TELEGRAM / BACKEND / AI
          </div>
          <div style={{ fontSize: 24, opacity: 0.5 }}>
            {`${STATS.apps}+ APPS AND SERVICES - ${STATS.markets} MARKETS - SINCE ${STATS.sinceYear}`}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Soria", data: soria, style: "normal", weight: 400 }] }
  );
}
