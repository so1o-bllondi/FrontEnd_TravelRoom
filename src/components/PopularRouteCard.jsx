import React from 'react';
import { MapPin, Clock } from 'lucide-react';

const PopularRouteCard = ({ preset, onClick }) => {
  const placesCount = preset.places?.length || 0;

  return (
    <article className="popular-route-card" onClick={onClick}>
      <div 
        className="popular-route-image"
        style={{ backgroundImage: `url(${preset.imageUrl})` }}
      >
        <div className="popular-route-overlay"></div>
      </div>
      <div className="popular-route-content">
        <h3>{preset.title}</h3>
        <p className="popular-route-location">
          <MapPin size={16} />
          {preset.city}, {preset.country}
        </p>
        <p className="popular-route-description">{preset.description}</p>
        <div className="popular-route-meta">
          <span className="route-meta-item">
            <Clock size={16} />
            {preset.duration}
          </span>
          <span className="route-meta-item">
            {placesCount} мест
          </span>
        </div>
        <button className="btn btn-primary btn-sm">
          Использовать маршрут
        </button>
      </div>
    </article>
  );
};

export default PopularRouteCard;
