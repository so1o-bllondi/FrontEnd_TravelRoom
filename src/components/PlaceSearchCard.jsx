import React, { useState } from 'react';
import { MapPin, Plus } from 'lucide-react';

const PlaceSearchCard = ({ place, onAddPlace, onCancel }) => {
  const [category, setCategory] = useState('достопримечательность');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    if (!description.trim()) {
      alert('Пожалуйста, добавьте описание места');
      return;
    }

    onAddPlace({
      name: place.name,
      category,
      description: description.trim(),
      coordinates: {
        lat: place.lat,
        lng: place.lng
      }
    });
  };

  return (
    <div className="place-search-card">
      <div className="place-search-header">
        <h4>Найденное место</h4>
      </div>

      <div className="place-search-body">
        <p className="place-search-name">{place.name}</p>
        {place.address && (
          <p className="place-search-address">{place.address}</p>
        )}
        <p className="place-search-coords">
          <MapPin size={14} />
          {place.lat.toFixed(6)}, {place.lng.toFixed(6)}
        </p>

        <div className="form-group">
          <label htmlFor="found-place-category">Категория</label>
          <select
            id="found-place-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="достопримечательность">Достопримечательность</option>
            <option value="музей">Музей</option>
            <option value="парк">Парк</option>
            <option value="ресторан">Ресторан</option>
            <option value="отель">Отель</option>
            <option value="район">Район</option>
            <option value="другое">Другое</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="found-place-description">Описание</label>
          <textarea
            id="found-place-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Краткое описание места..."
            rows={3}
          />
        </div>

        <div className="place-search-actions">
          <button className="btn btn-primary" onClick={handleAdd}>
            <Plus size={18} />
            Добавить в поездку
          </button>
          {onCancel && (
            <button className="btn btn-secondary" onClick={onCancel}>
              Отмена
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceSearchCard;
