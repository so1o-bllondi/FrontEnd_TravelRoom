// Сервис для получения прогноза погоды через Open-Meteo API
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

export const getWeatherForecast = async (lat, lng, startDate, endDate) => {
  try {
    const params = new URLSearchParams({
      latitude: lat,
      longitude: lng,
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max',
      timezone: 'auto',
      start_date: startDate,
      end_date: endDate
    });

    const response = await fetch(`${WEATHER_API}?${params}`);
    
    if (!response.ok) {
      throw new Error('Ошибка получения прогноза погоды');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка запроса погоды:', error);
    return null;
  }
};

export const getCurrentWeather = async (lat, lng) => {
  try {
    const params = new URLSearchParams({
      latitude: lat,
      longitude: lng,
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max',
      timezone: 'auto',
      forecast_days: 7
    });

    const response = await fetch(`${WEATHER_API}?${params}`);
    
    if (!response.ok) {
      throw new Error('Ошибка получения текущей погоды');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка запроса текущей погоды:', error);
    return null;
  }
};
