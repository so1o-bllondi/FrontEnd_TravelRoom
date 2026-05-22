// Перевод кода погоды в текст
export const mapWeatherCodeToText = (code) => {
  const weatherCodes = {
    0: 'Ясно',
    1: 'Переменная облачность',
    2: 'Переменная облачность',
    3: 'Переменная облачность',
    45: 'Туман',
    48: 'Туман',
    51: 'Морось',
    53: 'Морось',
    55: 'Морось',
    61: 'Дождь',
    63: 'Дождь',
    65: 'Дождь',
    71: 'Снег',
    73: 'Снег',
    75: 'Снег',
    80: 'Ливень',
    81: 'Ливень',
    82: 'Ливень',
    95: 'Гроза',
    96: 'Гроза',
    99: 'Гроза'
  };

  return weatherCodes[code] || 'Погодные условия';
};

// Получить иконку погоды (эмодзи как простая визуализация)
export const getWeatherIcon = (code) => {
  if (code === 0) return '☀️';
  if (code >= 1 && code <= 3) return '⛅';
  if (code >= 45 && code <= 48) return '🌫️';
  if (code >= 51 && code <= 55) return '🌦️';
  if (code >= 61 && code <= 65) return '🌧️';
  if (code >= 71 && code <= 75) return '❄️';
  if (code >= 80 && code <= 82) return '🌧️';
  if (code >= 95 && code <= 99) return '⛈️';
  return '🌤️';
};

// Проверка, является ли дата в диапазоне доступного прогноза
export const isDateInForecastRange = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const maxForecastDate = new Date();
  maxForecastDate.setDate(now.getDate() + 16); // Open-Meteo предоставляет до 16 дней вперёд

  return date >= now && date <= maxForecastDate;
};
