// Готовые маршруты для популярных направлений

export const routePresets = [
  {
    id: 'preset-paris-classic',
    title: 'Классический Париж',
    country: 'Франция',
    city: 'Париж',
    description: 'Знаковые достопримечательности Парижа: Эйфелева башня, Лувр, Нотр-Дам и прогулки по Монмартру',
    duration: '3-4 дня',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    participantsSuggestion: 2,
    coordinates: {
      lat: 48.8566,
      lng: 2.3522
    },
    places: [
      {
        name: 'Эйфелева башня',
        category: 'достопримечательность',
        description: 'Символ Парижа и один из самых узнаваемых монументов в мире',
        latitude: 48.8584,
        longitude: 2.2945,
        votesFor: 5,
        votesAgainst: 0,
        inRoute: true
      },
      {
        name: 'Лувр',
        category: 'музей',
        description: 'Крупнейший художественный музей мира с Моной Лизой',
        latitude: 48.8606,
        longitude: 2.3376,
        votesFor: 4,
        votesAgainst: 0,
        inRoute: true
      },
      {
        name: 'Собор Парижской Богоматери',
        category: 'достопримечательность',
        description: 'Готический собор на острове Сите',
        latitude: 48.8530,
        longitude: 2.3499,
        votesFor: 4,
        votesAgainst: 0,
        inRoute: true
      },
      {
        name: 'Монмартр',
        category: 'район',
        description: 'Исторический район с базиликой Сакре-Кёр и площадью Тертр',
        latitude: 48.8867,
        longitude: 2.3431,
        votesFor: 3,
        votesAgainst: 0,
        inRoute: true
      }
    ]
  },
  {
    id: 'preset-istanbul-weekend',
    title: 'Уикенд в Стамбуле',
    country: 'Турция',
    city: 'Стамбул',
    description: 'Город на двух континентах: Голубая мечеть, Гранд Базар и круиз по Босфору',
    duration: '2-3 дня',
    imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80',
    participantsSuggestion: 2,
    coordinates: {
      lat: 41.0082,
      lng: 28.9784
    },
    places: [
      {
        name: 'Голубая мечеть',
        category: 'достопримечательность',
        description: 'Величественная мечеть Султанахмет с шестью минаретами',
        latitude: 41.0054,
        longitude: 28.9768,
        votesFor: 5,
        votesAgainst: 0,
        inRoute: true
      },
      {
        name: 'Айя-София',
        category: 'достопримечательность',
        description: 'Византийский собор, ставший музеем, а затем мечетью',
        latitude: 41.0086,
        longitude: 28.9802,
        votesFor: 5,
        votesAgainst: 0,
        inRoute: true
      },
      {
        name: 'Гранд Базар',
        category: 'рынок',
        description: 'Один из крупнейших крытых рынков в мире',
        latitude: 41.0108,
        longitude: 28.9680,
        votesFor: 3,
        votesAgainst: 0,
        inRoute: true
      }
    ]
  },
  {
    id: 'preset-spb-2days',
    title: 'Санкт-Петербург за 2 дня',
    country: 'Россия',
    city: 'Санкт-Петербург',
    description: 'Культурная столица: Эрмитаж, Петергоф, разводные мосты и белые ночи',
    duration: '2 дня',
    imageUrl: 'https://images.unsplash.com/photo-1556122071-e404c4c2d98d?w=800&q=80',
    participantsSuggestion: 3,
    coordinates: {
      lat: 59.9311,
      lng: 30.3609
    },
    places: [
      {
        name: 'Эрмитаж',
        category: 'музей',
        description: 'Один из крупнейших музеев мира в Зимнем дворце',
        latitude: 59.9398,
        longitude: 30.3146,
        votesFor: 5,
        votesAgainst: 0,
        inRoute: true
      },
      {
        name: 'Петергоф',
        category: 'дворец',
        description: 'Дворцово-парковый ансамбль с фонтанами',
        latitude: 59.8847,
        longitude: 29.9087,
        votesFor: 4,
        votesAgainst: 0,
        inRoute: true
      },
      {
        name: 'Исаакиевский собор',
        category: 'достопримечательность',
        description: 'Крупнейший православный храм Санкт-Петербурга',
        latitude: 59.9340,
        longitude: 30.3061,
        votesFor: 4,
        votesAgainst: 0,
        inRoute: true
      }
    ]
  },
  {
    id: 'preset-rome-history',
    title: 'Рим: история и прогулки',
    country: 'Италия',
    city: 'Рим',
    description: 'Вечный город: Колизей, Ватикан, Фонтан Треви и вечерние прогулки',
    duration: '3-4 дня',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
    participantsSuggestion: 2,
    coordinates: {
      lat: 41.9028,
      lng: 12.4964
    },
    places: [
      {
        name: 'Колизей',
        category: 'достопримечательность',
        description: 'Древний амфитеатр — символ Римской империи',
        latitude: 41.8902,
        longitude: 12.4922,
        votesFor: 5,
        votesAgainst: 0,
        inRoute: true
      },
      {
        name: 'Ватикан',
        category: 'достопримечательность',
        description: 'Государство-анклав с собором Святого Петра',
        latitude: 41.9029,
        longitude: 12.4534,
        votesFor: 5,
        votesAgainst: 0,
        inRoute: true
      },
      {
        name: 'Фонтан Треви',
        category: 'достопримечательность',
        description: 'Знаменитый фонтан в стиле барокко',
        latitude: 41.9009,
        longitude: 12.4833,
        votesFor: 4,
        votesAgainst: 0,
        inRoute: true
      }
    ]
  },
  {
    id: 'preset-barcelona-gaudi',
    title: 'Барселона: архитектура и море',
    country: 'Испания',
    city: 'Барселона',
    description: 'Шедевры Гауди, готический квартал и пляжи Средиземноморья',
    duration: '3 дня',
    imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80',
    participantsSuggestion: 2,
    coordinates: {
      lat: 41.3874,
      lng: 2.1686
    },
    places: [
      {
        name: 'Саграда Фамилия',
        category: 'достопримечательность',
        description: 'Знаменитый собор Антонио Гауди',
        latitude: 41.4036,
        longitude: 2.1744,
        votesFor: 5,
        votesAgainst: 0,
        inRoute: true
      },
      {
        name: 'Парк Гуэль',
        category: 'парк',
        description: 'Парк с мозаичными скульптурами Гауди',
        latitude: 41.4145,
        longitude: 2.1527,
        votesFor: 4,
        votesAgainst: 0,
        inRoute: true
      },
      {
        name: 'Готический квартал',
        category: 'район',
        description: 'Исторический центр с узкими улочками',
        latitude: 41.3833,
        longitude: 2.1761,
        votesFor: 3,
        votesAgainst: 0,
        inRoute: true
      }
    ]
  },
  {
    id: 'preset-prague-castles',
    title: 'Прага: замки и мосты',
    country: 'Чехия',
    city: 'Прага',
    description: 'Карлов мост, Пражский град и атмосферные кафе Старого города',
    duration: '2-3 дня',
    imageUrl: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80',
    participantsSuggestion: 2,
    coordinates: {
      lat: 50.0755,
      lng: 14.4378
    },
    places: [
      {
        name: 'Пражский град',
        category: 'достопримечательность',
        description: 'Крупнейший замковый комплекс в мире',
        latitude: 50.0910,
        longitude: 14.4016,
        votesFor: 5,
        votesAgainst: 0,
        inRoute: true
      },
      {
        name: 'Карлов мост',
        category: 'достопримечательность',
        description: 'Средневековый мост через реку Влтаву',
        latitude: 50.0865,
        longitude: 14.4114,
        votesFor: 5,
        votesAgainst: 0,
        inRoute: true
      },
      {
        name: 'Староместская площадь',
        category: 'площадь',
        description: 'Историческая площадь с астрономическими часами',
        latitude: 50.0875,
        longitude: 14.4210,
        votesFor: 4,
        votesAgainst: 0,
        inRoute: true
      }
    ]
  },
  {
    id: 'preset-tbilisi-gastro',
    title: 'Тбилиси: старый город и гастрономия',
    country: 'Грузия',
    city: 'Тбилиси',
    description: 'Серные бани, старый город Абанотубани, грузинская кухня и вино',
    duration: '3 дня',
    imageUrl: 'https://images.unsplash.com/photo-1563635882-881c2c90a026?w=800&q=80',
    participantsSuggestion: 3,
    coordinates: {
      lat: 41.7151,
      lng: 44.8271
    },
    places: [
      {
        name: 'Старый Тбилиси',
        category: 'район',
        description: 'Исторический район с узкими улочками',
        latitude: 41.6922,
        longitude: 44.8092,
        votesFor: 5,
        votesAgainst: 0,
        inRoute: true
      },
      {
        name: 'Крепость Нарикала',
        category: 'достопримечательность',
        description: 'Древняя крепость с видом на город',
        latitude: 41.6880,
        longitude: 44.8090,
        votesFor: 4,
        votesAgainst: 0,
        inRoute: true
      },
      {
        name: 'Серные бани Абанотубани',
        category: 'достопримечательность',
        description: 'Знаменитые серные бани квартала Абанотубани',
        latitude: 41.6885,
        longitude: 44.8100,
        votesFor: 4,
        votesAgainst: 0,
        inRoute: true
      }
    ]
  },
  {
    id: 'preset-amsterdam-canals',
    title: 'Амстердам: каналы и музеи',
    country: 'Нидерланды',
    city: 'Амстердам',
    description: 'Музей Ван Гога, прогулки по каналам и велосипедные маршруты',
    duration: '2-3 дня',
    imageUrl: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80',
    participantsSuggestion: 2,
    coordinates: {
      lat: 52.3676,
      lng: 4.9041
    },
    places: [
      {
        name: 'Музей Ван Гога',
        category: 'музей',
        description: 'Крупнейшая коллекция картин Ван Гога',
        latitude: 52.3584,
        longitude: 4.8811,
        votesFor: 5,
        votesAgainst: 0,
        inRoute: true
      },
      {
        name: 'Каналы Амстердама',
        category: 'достопримечательность',
        description: 'Знаменитые каналы исторического центра',
        latitude: 52.3702,
        longitude: 4.8952,
        votesFor: 4,
        votesAgainst: 0,
        inRoute: true
      },
      {
        name: 'Дом Анны Франк',
        category: 'музей',
        description: 'Музей-дом, где пряталась Анна Франк',
        latitude: 52.3752,
        longitude: 4.8840,
        votesFor: 4,
        votesAgainst: 0,
        inRoute: true
      }
    ]
  },
  {
    id: 'preset-vienna-music',
    title: 'Вена: дворцы и музыка',
    country: 'Австрия',
    city: 'Вена',
    description: 'Шёнбрунн, Опера, венские кофейни и классическая музыка',
    duration: '2-3 дня',
    imageUrl: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80',
    participantsSuggestion: 2,
    coordinates: {
      lat: 48.2082,
      lng: 16.3738
    },
    places: [
      {
        name: 'Дворец Шёнбрунн',
        category: 'дворец',
        description: 'Летняя резиденция Габсбургов',
        latitude: 48.1848,
        longitude: 16.3120,
        votesFor: 5,
        votesAgainst: 0,
        inRoute: true
      },
      {
        name: 'Венская опера',
        category: 'достопримечательность',
        description: 'Один из ведущих оперных театров мира',
        latitude: 48.2032,
        longitude: 16.3691,
        votesFor: 4,
        votesAgainst: 0,
        inRoute: true
      },
      {
        name: 'Дворец Хофбург',
        category: 'дворец',
        description: 'Зимняя резиденция австрийских императоров',
        latitude: 48.2066,
        longitude: 16.3658,
        votesFor: 4,
        votesAgainst: 0,
        inRoute: true
      }
    ]
  },
  {
    id: 'preset-budapest-thermal',
    title: 'Будапешт: термы и набережные',
    country: 'Венгрия',
    city: 'Будапешт',
    description: 'Купальни Сечени, здание Парламента и прогулки по Дунаю',
    duration: '2-3 дня',
    imageUrl: 'https://images.unsplash.com/photo-1541946424-99a60fdfc34f?w=800&q=80',
    participantsSuggestion: 2,
    coordinates: {
      lat: 47.4979,
      lng: 19.0402
    },
    places: [
      {
        name: 'Купальни Сечени',
        category: 'термы',
        description: 'Крупнейшие термальные купальни Европы',
        latitude: 47.5190,
        longitude: 19.0820,
        votesFor: 5,
        votesAgainst: 0,
        inRoute: true
      },
      {
        name: 'Здание Парламента',
        category: 'достопримечательность',
        description: 'Величественное здание венгерского парламента',
        latitude: 47.5069,
        longitude: 19.0456,
        votesFor: 5,
        votesAgainst: 0,
        inRoute: true
      },
      {
        name: 'Рыбацкий бастион',
        category: 'достопримечательность',
        description: 'Смотровая площадка с панорамным видом',
        latitude: 47.5027,
        longitude: 19.0349,
        votesFor: 4,
        votesAgainst: 0,
        inRoute: true
      }
    ]
  }
];

export const getRandomPresets = (count = 3) => {
  const shuffled = [...routePresets].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getPresetById = (id) => {
  return routePresets.find(preset => preset.id === id);
};
