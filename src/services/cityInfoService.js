// Сервис для получения информации о городах из Wikipedia/Wikimedia API

const WIKIPEDIA_API_RU = 'https://ru.wikipedia.org/api/rest_v1/page/summary';
const WIKIPEDIA_API_EN = 'https://en.wikipedia.org/api/rest_v1/page/summary';

export const getCityInfo = async (cityName) => {
  try {
    // Пытаемся получить русскую версию
    let response = await fetch(`${WIKIPEDIA_API_RU}/${encodeURIComponent(cityName)}`);
    
    if (!response.ok) {
      // Если русской версии нет, пробуем английскую
      response = await fetch(`${WIKIPEDIA_API_EN}/${encodeURIComponent(cityName)}`);
    }

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    
    // Проверяем, что это не страница неоднозначности
    if (data.type === 'disambiguation') {
      return null;
    }

    return {
      title: data.title,
      extract: data.extract,
      description: data.description,
      thumbnail: data.thumbnail?.source,
      url: data.content_urls?.desktop?.page,
      lang: data.lang || 'unknown'
    };
  } catch (error) {
    console.error('Ошибка получения информации о городе:', error);
    return null;
  }
};

// Fallback описания для популярных городов
export const getFallbackCityInfo = (cityName) => {
  const fallbackDescriptions = {
    'Париж': 'Столица Франции, известная как город любви и романтики. Знаменита Эйфелевой башней, Лувром, Собором Парижской Богоматери и атмосферными улочками Монмартра.',
    'Стамбул': 'Уникальный город на двух континентах — в Европе и Азии. Богатая история, величественные мечети, оживлённые базары и потрясающие виды на Босфор.',
    'Санкт-Петербург': 'Культурная столица России, основанная Петром I. Город белых ночей славится великолепными дворцами, музеями, театрами и живописными каналами.',
    'Москва': 'Столица России, город с богатой историей и современной архитектурой. Красная площадь, Кремль, Большой театр и множество музеев.',
    'Рим': 'Вечный город с тысячелетней историей. Колизей, Пантеон, Фонтан Треви и Ватикан — Рим хранит бесценные памятники античности.',
    'Барселона': 'Столица Каталонии, известная архитектурой Гауди, живописными пляжами и уникальной атмосферой. Саграда Фамилия и Парк Гуэль.',
    'Прага': 'Столица Чехии с богатым средневековым наследием. Пражский град, Карлов мост и Староместская площадь создают неповторимую атмосферу.',
    'Амстердам': 'Столица Нидерландов, известная каналами, музеями и велосипедной культурой. Дом Анны Франк и музей Ван Гога.'
  };

  const description = fallbackDescriptions[cityName];
  
  if (description) {
    return {
      title: cityName,
      extract: description,
      description: `Информация о ${cityName}`,
      thumbnail: null,
      url: null,
      lang: 'fallback'
    };
  }

  return {
    title: cityName,
    extract: 'Этот город выбран как направление поездки. Участники могут добавлять интересные места, обсуждать маршрут и формировать план путешествия.',
    description: 'Информация о городе',
    thumbnail: null,
    url: null,
    lang: 'fallback'
  };
};
