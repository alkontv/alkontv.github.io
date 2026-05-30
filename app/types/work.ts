import * as THREE from "three";
import type { LocalizedText } from "@i18n";

export interface WorkTimelinePoint {
  point: THREE.Vector3,
  year: string,
  title: LocalizedText,
  subtitle?: LocalizedText,
  position: 'left' | 'right',
}
