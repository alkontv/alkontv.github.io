import * as THREE from "three";

import { EMPLOYMENT } from "@content";
import { WorkTimelinePoint } from "../types";

/**
 * Координаты точек — часть 3D-сцены, а не контента: под них подобрана
 * траектория камеры в work/index.tsx, поэтому значения не меняются.
 */
const POINTS: Pick<WorkTimelinePoint, "point" | "position">[] = [
  { point: new THREE.Vector3(0, 0, 0), position: "right" },
  { point: new THREE.Vector3(-4, -4, -3), position: "left" },
  { point: new THREE.Vector3(-3, -1, -6), position: "left" },
  { point: new THREE.Vector3(0, -1, -10), position: "left" },
  { point: new THREE.Vector3(1, 1, -12), position: "right" },
];

if (EMPLOYMENT.length > POINTS.length) {
  throw new Error(
    `Мест работы ${EMPLOYMENT.length}, а точек сцены ${POINTS.length} — добавь координаты в POINTS`
  );
}

/**
 * Мест работы меньше, чем точек в сцене, поэтому берём их не подряд,
 * а с равным шагом: иначе линия оборвётся на середине пути камеры.
 */
const spread = (count: number) =>
  count === 1
    ? [POINTS[0]]
    : Array.from({ length: count }, (_, i) =>
        POINTS[Math.round((i * (POINTS.length - 1)) / (count - 1))]
      );

// Список уже идёт по нарастанию — разворачивать не нужно.
export const WORK_TIMELINE: WorkTimelinePoint[] = EMPLOYMENT.map((job, i) => ({
  ...spread(EMPLOYMENT.length)[i],
  year: job.since,
  title: job.company,
  subtitle: job.role,
}));
