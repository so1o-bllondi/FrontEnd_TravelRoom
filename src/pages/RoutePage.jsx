import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Route as RouteIcon } from 'lucide-react';
import { getTripById } from '../services/storageService';
import { formatDate } from '../utils/dateUtils';

const RoutePage = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const foundTrip = getTripById(tripId);
    if (foundTrip) {
      setTrip(foundTrip);
    } else {
      navigate('/trips');
    }
  }, [tripId]);

  if (!trip) {
    return <div className="container">Загрузка...</div>;
  }

  const routePlaces = trip.places?.filter(p => p.inRoute) || [];

  return (
    <div className="route-page">
      <div className="container">
        <button 
          className="btn btn-secondary"
          onClick={() => navigate(`/trips/${trip.id}`)}
        >
          <ArrowLeft size={18} />
          Вернуться к поездке
        </button>

        <div className="route-header">
          <RouteIcon size={48} />
          <div>
            <h1 className="page-title">Итоговый маршрут</h1>
            <h2 className="route-trip-title">{trip.title}</h2>
            <div className="route-trip-info">
              <span><MapPin size={16} /> {trip.city}, {trip.country}</span>
              <span>•</span>
              <span>{formatDate(trip.startDate)} — {formatDate(trip.endDate)}</span>
            </div>
          </div>
        </div>

        {routePlaces.length === 0 ? (
          <div className="route-empty">
            <p>В маршруте пока нет мест. Вернитесь к поездке и добавьте места в маршрут.</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate(`/trips/${trip.id}`)}
            >
              Вернуться к поездке
            </button>
          </div>
        ) : (
          <div className="route-content">
            <div className="route-stats">
              <div className="route-stat-card">
                <span className="route-stat-value">{routePlaces.length}</span>
                <span className="route-stat-label">мест в маршруте</span>
              </div>
              <div className="route-stat-card">
                <span className="route-stat-value">{trip.participants.length}</span>
                <span className="route-stat-label">участников</span>
              </div>
            </div>

            <div className="route-places-list">
              {routePlaces.map((place, index) => (
                <article key={place.id} className="route-place-card">
                  <div className="route-place-number-large">{index + 1}</div>
                  <div className="route-place-details">
                    <h3 className="route-place-name">{place.name}</h3>
                    <span className="route-place-category">{place.category}</span>
                    <p className="route-place-description">{place.description}</p>
                    <div className="route-place-coordinates">
                      <MapPin size={14} />
                      <span>{place.coordinates.lat.toFixed(4)}, {place.coordinates.lng.toFixed(4)}</span>
                    </div>
                    <div className="route-place-votes">
                      <span>👍 {place.votesFor} голосов за</span>
                      {place.votesAgainst > 0 && (
                        <span>👎 {place.votesAgainst} против</span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoutePage;
