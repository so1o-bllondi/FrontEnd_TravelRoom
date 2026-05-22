import React from 'react';
import { ThumbsUp, ThumbsDown, Plus, Check, Trash2, MapPin } from 'lucide-react';

const PlaceCard = ({ place, onVote, onAddToRoute, onDelete }) => {
  const { name, category, description, coordinates, votesFor, votesAgainst, inRoute } = place;

  return (
    <article className="place-card">
      <div className="place-card-header">
        <div>
          <h4 className="place-card-title">{name}</h4>
          <span className="place-category-badge">{category}</span>
        </div>
        <button 
          className="place-delete-btn"
          onClick={() => onDelete(place.id)}
          aria-label="Удалить место"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <p className="place-card-description">{description}</p>

      <div className="place-coordinates">
        <MapPin size={14} />
        <span>{coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}</span>
      </div>

      <div className="place-card-actions">
        <div className="place-votes">
          <button 
            className="vote-btn vote-btn-up"
            onClick={() => onVote(place.id, 'up')}
            aria-label="Голосовать за"
          >
            <ThumbsUp size={16} />
            <span>{votesFor}</span>
          </button>
          <button 
            className="vote-btn vote-btn-down"
            onClick={() => onVote(place.id, 'down')}
            aria-label="Голосовать против"
          >
            <ThumbsDown size={16} />
            <span>{votesAgainst}</span>
          </button>
        </div>

        {inRoute ? (
          <span className="place-in-route">
            <Check size={16} />
            В маршруте
          </span>
        ) : (
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => onAddToRoute(place.id)}
          >
            <Plus size={16} />
            Добавить в маршрут
          </button>
        )}
      </div>
    </article>
  );
};

export default PlaceCard;
