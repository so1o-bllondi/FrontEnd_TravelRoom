import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { createTrip } from '../services/storageService';
import { getCityCoordinates, getFallbackCoordinates } from '../services/geoService';
import CreateTripForm from '../components/CreateTripForm';

const CreateTripPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreateTrip = async (tripData) => {
    setLoading(true);

    try {
      // Попытаться получить координаты города
      const coords = await getCityCoordinates(tripData.city, tripData.country);
      
      const tripWithCoords = {
        ...tripData,
        coordinates: coords || getFallbackCoordinates(tripData.city)
      };

      if (!coords) {
        console.warn(`Не удалось получить координаты для ${tripData.city}, используются fallback-координаты`);
      }

      const newTrip = createTrip(tripWithCoords);
      
      if (newTrip) {
        navigate(`/trips/${newTrip.id}`);
      } else {
        alert('Ошибка создания поездки');
      }
    } catch (error) {
      console.error('Ошибка создания поездки:', error);
      alert('Произошла ошибка при создании поездки');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-trip-page">
      <div className="container">
        <div className="create-trip-layout">
          <div className="create-trip-info">
            <div className="create-trip-icon">
              <MapPin size={48} />
            </div>
            <h1 className="page-title">Создание новой поездки</h1>
            <p className="create-trip-description">
              Укажите основную информацию о поездке. После создания вы сможете добавить места для посещения, обсудить их с участниками в чате и сформировать итоговый маршрут.
            </p>
            <div className="create-trip-features">
              <div className="feature-item">
                <span className="feature-number">1</span>
                <p>Укажите город и даты поездки</p>
              </div>
              <div className="feature-item">
                <span className="feature-number">2</span>
                <p>Пригласите участников</p>
              </div>
              <div className="feature-item">
                <span className="feature-number">3</span>
                <p>Добавляйте места и голосуйте</p>
              </div>
              <div className="feature-item">
                <span className="feature-number">4</span>
                <p>Сформируйте финальный маршрут</p>
              </div>
            </div>
          </div>

          <div className="create-trip-form-wrapper">
            <CreateTripForm onSubmit={handleCreateTrip} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTripPage;
