// Сервис для геокодирования через Open-Meteo Geocoding API
const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';

export const getCityCoordinates = async (city, country) => {
  try {
    const query = country ? `${city}, ${country}` : city;
    const response = await fetch(`${GEOCODING_API}?name=${encodeURIComponent(query)}&count=1&language=ru&format=json`);
    
    if (!response.ok) {
      throw new Error('Ошибка запроса геокодирования');
    }

    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      return {
        lat: result.latitude,
        lng: result.longitude,
        name: result.name,
        country: result.country
      };
    }

    return null;
  } catch (error) {
    console.error('Ошибка получения координат города:', error);
    return null;
  }
};

// Fallback координаты для популярных городов
export const getFallbackCoordinates = (city) => {
  const fallbacks = {
    'Париж': { lat: 48.8566, lng: 2.3522 },
    'Стамбул': { lat: 41.0082, lng: 28.9784 },
    'Санкт-Петербург': { lat: 59.9311, lng: 30.3609 },
    'Москва': { lat: 55.7558, lng: 37.6173 },
    'Рим': { lat: 41.9028, lng: 12.4964 },
    'Барселона': { lat: 41.3874, lng: 2.1686 }
  };

  return fallbacks[city] || { lat: 48.8566, lng: 2.3522 }; // По умолчанию Париж
};
