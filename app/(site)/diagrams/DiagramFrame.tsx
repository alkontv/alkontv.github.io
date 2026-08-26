"use client";

import type { ReactNode } from "react";

/** Обёртка: горизонтальный скролл на узких экранах вместо ломаной вёрстки. */
export const DiagramFrame = ({
  viewBox,
  children,
}: {
  viewBox: string;
  children: ReactNode;
}) => (
  <div className="my-6 overflow-x-auto">
    <svg
      viewBox={viewBox}
      role="img"
      className="h-auto w-full min-w-[640px] max-w-3xl"
      fill="none"
      stroke="currentColor"
    >
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" stroke="none" />
        </marker>
      </defs>
      {children}
    </svg>
  </div>
);

export const Box = ({
  x,
  y,
  w = 150,
  h = 46,
  label,
  sub,
  dashed = false,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  sub?: string;
  dashed?: boolean;
}) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={6}
      strokeOpacity={0.4}
      strokeDasharray={dashed ? "4 4" : undefined}
    />
    <text
      x={x + w / 2}
      y={sub ? y + h / 2 - 2 : y + h / 2 + 4}
      textAnchor="middle"
      fontSize={12}
      fill="currentColor"
      stroke="none"
    >
      {label}
    </text>
    {sub && (
      <text
        x={x + w / 2}
        y={y + h / 2 + 14}
        textAnchor="middle"
        fontSize={10}
        fillOpacity={0.55}
        fill="currentColor"
        stroke="none"
      >
        {sub}
      </text>
    )}
  </g>
);

export const Arrow = ({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} strokeOpacity={0.5} markerEnd="url(#arrow)" />
);
