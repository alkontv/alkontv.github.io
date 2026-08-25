import type { CaseStudy } from "../types";

export const vehicleSharing: CaseStudy = {
  id: "vehicle-sharing",
  industry: { ru: "Туризм и шеринг", en: "Travel and sharing" },
  formats: ["mobile"],
  name: { ru: "Шеринг мототехники и лодок", en: "Powersports and Boat Sharing" },
  budget: 100000,
  status: "shipped",
  tagline: {
    ru: "Владелец публикует поездку с маршрутом, остальные бронируют места",
    en: "An owner publishes a ride with a route, others book seats on it",
  },
  problem: {
    ru: "Нужен был шеринг не автомобилей, а мотоциклов, квадроциклов, багги, гидроциклов и лодок — где важны маршрут, число мест и ограничение по весу пассажира.",
    en: "The ask was sharing not for cars but for motorcycles, quad bikes, buggies, jet skis and boats — where the route, seat count and passenger weight limit all matter.",
  },
  solution: [
    {
      ru: "Водитель добавляет транспорт с категорией и создаёт поездку: точка А, промежуточные точки, точка Б, даты, цена, число мест, ограничение по весу",
      en: "The driver registers a vehicle with its category and creates a ride: origin, waypoints, destination, dates, price, seat count and weight limit",
    },
    {
      ru: "Пассажир ищет поездки по городу и дате, фильтрует по расстоянию от себя, бронирует места и смотрит маршрут на карте",
      en: "The passenger searches rides by city and date, filters by distance from their location, books seats and views the route on a map",
    },
    {
      ru: "Водитель подтверждает заявки, после поездки обе стороны ставят оценки и пишут отзывы",
      en: "The driver confirms requests; after the ride both sides leave ratings and reviews",
    },
    {
      ru: "Обе роли живут в одном аккаунте — переключаться между профилями не нужно",
      en: "Both roles live in one account — no switching between profiles",
    },
  ],
  highlight: {
    ru: "Полный цикл шеринг-сервиса: карты, маршруты с промежуточными точками, бронирование мест, взаимные рейтинги, чат и канал поддержки. Тот самый разговор «сделайте нам такое же, но для нашей ниши» — здесь он уже пройден до конца.",
    en: "A complete sharing-service cycle: maps, multi-waypoint routes, seat booking, two-way ratings, chat and a support channel. Exactly the ask that starts with make us the same thing for our niche — here it has already been taken to the end.",
  },
  stack: ["Flutter", "FlutterFlow", "Firebase", "Cloud Functions"],
  integrations: ["Google Maps", "Google Places", "Apple Sign-In"],
  scale: { loc: 47000, files: 179 },
  featured: false,
};
