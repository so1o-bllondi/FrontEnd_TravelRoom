import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Route, X } from 'lucide-react';

const RouteSummary = ({ trip, onRemoveFromRoute }) => {
  const navigate = useNavigate();
  const routePlaces = trip.places?.filter(p => p.inRoute) || [];

  if (routePlaces.length === 0) {
    return (
      <div className="route-summary">
        <div className="route-summary-header">
          <Route size={24} />
          <h3>Итоговый маршрут</h3>
        </div>
        <p className="route-summary-empty">
          Места, добавленные в маршрут, появятся здесь. Голосуйте за предложенные места и добавляйте их в маршрут.
        </p>
      </div>
    );
  }

  return (
    <div className="route-summary">
      <div className="route-summary-header">
        <Route size={24} />
        <h3>Итоговый маршрут</h3>
        <span className="route-count">{routePlaces.length} мест</span>
      </div>

      <div className="route-places">
        {routePlaces.map((place, index) => (
          <div key={place.id} className="route-place-item">
            <div className="route-place-number">{index + 1}</div>
            <div className="route-place-info">
              <h4>{place.name}</h4>
              <span className="route-place-category">{place.category}</span>
            </div>
            <button 
              className="route-place-remove"
              onClick={() => onRemoveFromRoute(place.id)}
              aria-label="Удалить из маршрута"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      <button 
        className="btn btn-primary"
        onClick={() => navigate(`/trips/${trip.id}/route`)}
      >
        Открыть итоговый маршрут
      </button>
    </div>
  );
};

export default RouteSummary;
