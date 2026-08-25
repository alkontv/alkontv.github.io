import * as THREE from "three";

import { TIMELINE } from "@content";
import { WorkTimelinePoint } from "../types";

/**
 * Координаты точек — часть 3D-сцены, а не контента, поэтому живут здесь.
 * Значения взяты из исходной сцены и не меняются: под них подобрана
 * траектория камеры в work/index.tsx.
 */
const POINTS: Pick<WorkTimelinePoint, "point" | "position">[] = [
  { point: new THREE.Vector3(0, 0, 0), position: "right" },
  { point: new THREE.Vector3(-4, -4, -3), position: "left" },
  { point: new THREE.Vector3(-3, -1, -6), position: "left" },
  { point: new THREE.Vector3(0, -1, -10), position: "left" },
  { point: new THREE.Vector3(1, 1, -12), position: "right" },
];

if (POINTS.length !== TIMELINE.length) {
  throw new Error(
    `Точек сцены ${POINTS.length}, а вех таймлайна ${TIMELINE.length} — добавь координаты в POINTS`
  );
}

export const WORK_TIMELINE: WorkTimelinePoint[] = TIMELINE.map((entry, i) => ({
  ...POINTS[i],
  year: entry.year,
  title: entry.title,
  subtitle: entry.subtitle,
}));
