import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Trash2 } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

const TripCard = ({ trip, onDelete, showDelete = true }) => {
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate(`/trips/${trip.id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Вы уверены, что хотите удалить поездку "${trip.title}"?`)) {
      onDelete(trip.id);
    }
  };

  const placesCount = trip.places?.length || 0;
  const routePlacesCount = trip.places?.filter(p => p.inRoute).length || 0;

  return (
    <article className="trip-card">
      <div className="trip-card-header">
        <h3 className="trip-card-title">{trip.title}</h3>
        {showDelete && (
          <button 
            className="trip-card-delete"
            onClick={handleDelete}
            aria-label="Удалить поездку"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
      
      <div className="trip-card-info">
        <div className="trip-info-item">
          <MapPin size={16} />
          <span>{trip.city}, {trip.country}</span>
        </div>
        <div className="trip-info-item">
          <Calendar size={16} />
          <span>{formatDate(trip.startDate)} — {formatDate(trip.endDate)}</span>
        </div>
        <div className="trip-info-item">
          <Users size={16} />
          <span>{trip.participants?.length || 0} участников</span>
        </div>
      </div>

      <div className="trip-card-stats">
        <div className="trip-stat">
          <span className="trip-stat-value">{placesCount}</span>
          <span className="trip-stat-label">мест предложено</span>
        </div>
        <div className="trip-stat">
          <span className="trip-stat-value">{routePlacesCount}</span>
          <span className="trip-stat-label">в маршруте</span>
        </div>
      </div>

      <button className="btn btn-primary btn-full" onClick={handleOpen}>
        Открыть
      </button>
    </article>
  );
};

export default TripCard;
