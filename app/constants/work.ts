import * as THREE from "three";
import { WorkTimelinePoint } from "../types";

// Плейсхолдеры карьеры Alan (координаты точек из оригинала — подогнаны
// под сцену). Заменить реальными вехами.
export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: new THREE.Vector3(0, 0, 0),
    year: '2019',
    title: { en: 'Started in dev', ru: 'Старт в разработке' },
    subtitle: { en: 'First sites & bots', ru: 'Первые сайты и боты' },
    position: 'right',
  },
  {
    point: new THREE.Vector3(-4, -4, -3),
    year: '2021',
    title: { en: 'Mobile & FlutterFlow', ru: 'Mobile & FlutterFlow' },
    subtitle: { en: 'Mobile apps', ru: 'Мобильные приложения' },
    position: 'left',
  },
  {
    point: new THREE.Vector3(-3, -1, -6),
    year: '2023',
    title: { en: 'Fullstack', ru: 'Fullstack' },
    subtitle: { en: 'Web, backend, databases', ru: 'Web, backend, базы данных' },
    position: 'left',
  },
  {
    point: new THREE.Vector3(0, -1, -10),
    year: '2024',
    title: { en: 'AI & Automation', ru: 'AI & Автоматизация' },
    subtitle: { en: 'AI integrations, CRM', ru: 'AI-интеграции, CRM' },
    position: 'left',
  },
  {
    point: new THREE.Vector3(1, 1, -12),
    year: 'now',
    title: { en: 'In a team', ru: 'В команде' },
    subtitle: { en: 'With a senior engineer', ru: 'С senior-инженером' },
    position: 'right',
  },
];
