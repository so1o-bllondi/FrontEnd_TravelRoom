import React, { useEffect, useRef, useState } from 'react';
import { loadYandexMaps } from '../services/yandexMapsLoader';
import { Search } from 'lucide-react';

const YandexMapView = ({ trip, places, onMapClick, onPlaceFound }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [mapError, setMapError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const tempPlacemarkRef = useRef(null);

  const apiKey = import.meta.env.VITE_YANDEX_MAPS_API_KEY;
  const suggestApiKey = import.meta.env.VITE_YANDEX_SUGGEST_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      setMapError('no-key');
      return;
    }

    const initMap = async () => {
      try {
        const ymaps = await loadYandexMaps(apiKey, suggestApiKey);

        const center = trip.coordinates 
          ? [trip.coordinates.lat, trip.coordinates.lng]
          : [48.8566, 2.3522]; // Fallback на Париж

        const map = new ymaps.Map(mapRef.current, {
          center: center,
          zoom: 12,
          controls: ['zoomControl']
        });

        // Отключить скролл зума
        map.behaviors.disable('scrollZoom');

        mapInstanceRef.current = map;

        // Добавить метки для всех мест
        places.forEach(place => {
          const placemark = new ymaps.Placemark(
            [place.coordinates.lat, place.coordinates.lng],
            {
              balloonContentHeader: place.name,
              balloonContentBody: `<p><strong>Категория:</strong> ${place.category}</p>
                                   <p>${place.description}</p>
                                   <p><small>Координаты: ${place.coordinates.lat.toFixed(4)}, ${place.coordinates.lng.toFixed(4)}</small></p>`,
              hintContent: place.name
            },
            {
              preset: place.inRoute ? 'islands#blueDotIcon' : 'islands#darkGreenDotIcon'
            }
          );
          map.geoObjects.add(placemark);
        });

        // Обработка клика по карте
        map.events.add('click', (e) => {
          const coords = e.get('coords');
          
          // Удалить предыдущую временную метку
          if (tempPlacemarkRef.current) {
            map.geoObjects.remove(tempPlacemarkRef.current);
          }

          // Создать новую временную метку
          const tempPlacemark = new ymaps.Placemark(coords, {
            balloonContent: 'Выбранное место'
          }, {
            preset: 'islands#redDotIcon'
          });

          map.geoObjects.add(tempPlacemark);
          tempPlacemarkRef.current = tempPlacemark;

          // Передать координаты наверх
          if (onMapClick) {
            onMapClick({
              lat: coords[0],
              lng: coords[1]
            });
          }
        });

      } catch (error) {
        console.error('Ошибка инициализации карты:', error);
        setMapError('load-error');
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, [apiKey, trip, places]);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setSearchStatus('Введите название места');
      return;
    }

    if (!window.ymaps || !mapInstanceRef.current) {
      setSearchStatus('Карта ещё не загружена');
      return;
    }

    setSearchStatus('Поиск...');

    try {
      const fullQuery = `${searchQuery}, ${trip.city}, ${trip.country}`;
      const result = await window.ymaps.geocode(fullQuery);
      const firstGeoObject = result.geoObjects.get(0);

      if (firstGeoObject) {
        const coords = firstGeoObject.geometry.getCoordinates();
        
        // Центрировать карту на найденном месте
        mapInstanceRef.current.setCenter(coords, 15);

        // Удалить предыдущую временную метку
        if (tempPlacemarkRef.current) {
          mapInstanceRef.current.geoObjects.remove(tempPlacemarkRef.current);
        }

        // Создать временную метку
        const tempPlacemark = new window.ymaps.Placemark(coords, {
          balloonContent: searchQuery
        }, {
          preset: 'islands#redDotIcon'
        });

        mapInstanceRef.current.geoObjects.add(tempPlacemark);
        tempPlacemarkRef.current = tempPlacemark;

        setSearchStatus(`Найдено: ${firstGeoObject.getAddressLine()}`);

        // Передать координаты и название наверх
        if (onPlaceFound) {
          onPlaceFound({
            name: searchQuery,
            lat: coords[0],
            lng: coords[1]
          });
        }
      } else {
        setSearchStatus('Место не найдено');
      }
    } catch (error) {
      console.error('Ошибка поиска:', error);
      setSearchStatus('Ошибка поиска');
    }
  };

  if (mapError === 'no-key') {
    return (
      <div className="map-container">
        <div className="map-error">
          <h4>Яндекс Карты недоступны</h4>
          <p>Для отображения карты необходимо указать API-ключ Яндекс Карт в файле .env</p>
          <p className="map-error-hint">
            Создайте файл .env по примеру .env.example и добавьте ключ VITE_YANDEX_MAPS_API_KEY
          </p>
        </div>
      </div>
    );
  }

  if (mapError === 'load-error') {
    return (
      <div className="map-container">
        <div className="map-error">
          <h4>Ошибка загрузки карты</h4>
          <p>Не удалось загрузить Яндекс Карты. Проверьте API-ключ и подключение к интернету.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="map-container">
      <div className="map-search">
        <h4>Найти место на карте</h4>
        <form onSubmit={handleSearch}>
          <div className="map-search-input-group">
            <input
              type="text"
              placeholder="Например: Эйфелева башня"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="map-search-input"
            />
            <button type="submit" className="map-search-btn" aria-label="Найти">
              <Search size={18} />
            </button>
          </div>
        </form>
        {searchStatus && (
          <p className="map-search-status">{searchStatus}</p>
        )}
      </div>

      <div ref={mapRef} className="yandex-map" style={{ width: '100%', height: '480px' }} />
      
      <p className="map-hint">
        Кликните на карту, чтобы выбрать координаты для нового места
      </p>
    </div>
  );
};

export default YandexMapView;
