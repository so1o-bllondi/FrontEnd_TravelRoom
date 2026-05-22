import React, { useEffect, useState } from 'react';
import { Cloud, Loader } from 'lucide-react';
import { getWeatherForecast, getCurrentWeather } from '../services/weatherService';
import { mapWeatherCodeToText, isDateInForecastRange } from '../utils/weatherUtils';
import { formatDate } from '../utils/dateUtils';

const WeatherCard = ({ trip }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFallbackMessage, setShowFallbackMessage] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!trip.coordinates) {
        setError('Координаты города не определены');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Проверить, попадают ли даты в диапазон прогноза
        const startInRange = isDateInForecastRange(trip.startDate);
        const endInRange = isDateInForecastRange(trip.endDate);

        let data;
        if (startInRange && endInRange) {
          // Получить прогноз на даты поездки
          data = await getWeatherForecast(
            trip.coordinates.lat,
            trip.coordinates.lng,
            trip.startDate,
            trip.endDate
          );
          setShowFallbackMessage(false);
        } else {
          // Получить ближайший доступный прогноз
          data = await getCurrentWeather(
            trip.coordinates.lat,
            trip.coordinates.lng
          );
          setShowFallbackMessage(true);
        }

        if (data) {
          setWeather(data);
        } else {
          setError('Не удалось получить прогноз погоды');
        }
      } catch (err) {
        console.error('Ошибка загрузки погоды:', err);
        setError('Ошибка загрузки погоды');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [trip]);

  if (loading) {
    return (
      <div className="weather-card">
        <div className="weather-loading">
          <Loader size={24} className="spinner" />
          <p>Загрузка прогноза погоды...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-card">
        <div className="weather-error">
          <Cloud size={32} />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!weather || !weather.daily) {
    return (
      <div className="weather-card">
        <div className="weather-unavailable">
          <Cloud size={32} />
          <p>Прогноз погоды недоступен</p>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-card">
      <div className="weather-header">
        <Cloud size={24} />
        <div>
          <h3>Погода</h3>
          <p className="weather-location">{trip.city}, {trip.country}</p>
        </div>
      </div>

      {showFallbackMessage && (
        <div className="weather-fallback-message">
          <p>Точный прогноз на выбранные даты пока недоступен. Ниже показан ближайший доступный прогноз.</p>
        </div>
      )}

      <div className="weather-dates">
        <span>Даты поездки: {formatDate(trip.startDate)} — {formatDate(trip.endDate)}</span>
      </div>

      <div className="weather-days">
        {weather.daily.time.slice(0, 7).map((date, index) => (
          <div key={date} className="weather-day">
            <div className="weather-day-date">{formatDate(date)}</div>
            <div className="weather-day-condition">
              {mapWeatherCodeToText(weather.daily.weather_code[index])}
            </div>
            <div className="weather-day-temp">
              {Math.round(weather.daily.temperature_2m_min[index])}° / {Math.round(weather.daily.temperature_2m_max[index])}°
            </div>
            {weather.daily.precipitation_probability_max && (
              <div className="weather-day-precipitation">
                💧 {weather.daily.precipitation_probability_max[index]}%
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;
