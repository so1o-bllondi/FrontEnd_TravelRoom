export const getMockTrip = () => ({
  id: 'trip-paris-1',
  title: 'Поездка в Париж',
  country: 'Франция',
  city: 'Париж',
  startDate: '2026-07-10',
  endDate: '2026-07-15',
  participants: ['Александр', 'Иван', 'Мария'],
  coordinates: {
    lat: 48.8566,
    lng: 2.3522
  },
  places: [
    {
      id: 'place-1',
      name: 'Эйфелева башня',
      category: 'достопримечательность',
      description: 'Один из самых узнаваемых символов Парижа',
      coordinates: {
        lat: 48.8584,
        lng: 2.2945
      },
      votesFor: 3,
      votesAgainst: 0,
      inRoute: true
    },
    {
      id: 'place-2',
      name: 'Лувр',
      category: 'музей',
      description: 'Один из крупнейших художественных музеев мира',
      coordinates: {
        lat: 48.8606,
        lng: 2.3376
      },
      votesFor: 2,
      votesAgainst: 1,
      inRoute: false
    },
    {
      id: 'place-3',
      name: 'Монмартр',
      category: 'район',
      description: 'Исторический район Парижа, известный атмосферными улицами и базиликой Сакре-Кёр',
      coordinates: {
        lat: 48.8867,
        lng: 2.3431
      },
      votesFor: 2,
      votesAgainst: 0,
      inRoute: false
    },
    {
      id: 'place-4',
      name: 'Люксембургский сад',
      category: 'парк',
      description: 'Известный парк для прогулок и отдыха',
      coordinates: {
        lat: 48.8462,
        lng: 2.3372
      },
      votesFor: 1,
      votesAgainst: 0,
      inRoute: false
    }
  ],
  messages: [
    {
      id: 'msg-1',
      author: 'Александр',
      text: 'Давайте выберем места, которые точно хотим посетить.',
      timestamp: new Date('2026-06-15T10:00:00').toISOString(),
      isSystem: false
    },
    {
      id: 'msg-2',
      author: 'Мария',
      text: 'Я предлагаю добавить Лувр.',
      timestamp: new Date('2026-06-15T10:05:00').toISOString(),
      isSystem: false
    },
    {
      id: 'msg-3',
      author: 'Иван',
      text: 'Хорошая идея, но нужно посмотреть, сколько времени займёт посещение.',
      timestamp: new Date('2026-06-15T10:10:00').toISOString(),
      isSystem: false
    },
    {
      id: 'msg-4',
      author: 'Система',
      text: 'Мария предложила место «Лувр».',
      timestamp: new Date('2026-06-15T10:15:00').toISOString(),
      isSystem: true
    }
  ],
  route: [],
  createdAt: new Date('2026-06-15T09:00:00').toISOString(),
  updatedAt: new Date('2026-06-15T10:15:00').toISOString()
});

export const getPopularTrips = () => [
  {
    id: 'popular-1',
    title: 'Поездка в Париж',
    city: 'Париж',
    country: 'Франция',
    placesCount: 4,
    routePlacesCount: 1
  },
  {
    id: 'popular-2',
    title: 'Уикенд в Стамбуле',
    city: 'Стамбул',
    country: 'Турция',
    placesCount: 6,
    routePlacesCount: 3
  },
  {
    id: 'popular-3',
    title: 'Маршрут по Санкт-Петербургу',
    city: 'Санкт-Петербург',
    country: 'Россия',
    placesCount: 8,
    routePlacesCount: 5
  }
];
