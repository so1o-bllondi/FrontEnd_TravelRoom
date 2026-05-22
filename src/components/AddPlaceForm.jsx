import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

const AddPlaceForm = ({ onAddPlace, selectedCoordinates }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'достопримечательность',
    description: '',
    lat: '',
    lng: ''
  });

  // Автоматически подставить координаты, выбранные на карте
  useEffect(() => {
    if (selectedCoordinates) {
      setFormData(prev => ({
        ...prev,
        lat: selectedCoordinates.lat.toFixed(6),
        lng: selectedCoordinates.lng.toFixed(6)
      }));
    }
  }, [selectedCoordinates]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const lat = parseFloat(formData.lat);
    const lng = parseFloat(formData.lng);

    if (!formData.name.trim() || !formData.description.trim()) {
      alert('Пожалуйста, заполните название и описание места');
      return;
    }

    if (isNaN(lat) || isNaN(lng)) {
      alert('Пожалуйста, укажите корректные координаты');
      return;
    }

    onAddPlace({
      name: formData.name.trim(),
      category: formData.category,
      description: formData.description.trim(),
      coordinates: { lat, lng }
    });

    // Сбросить форму
    setFormData({
      name: '',
      category: 'достопримечательность',
      description: '',
      lat: '',
      lng: ''
    });
  };

  return (
    <div className="add-place-form-container">
      <h3 className="form-section-title">Добавить новое место</h3>
      
      <form className="add-place-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="place-name">Название места</label>
            <input
              id="place-name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Например: Эйфелева башня"
            />
          </div>

          <div className="form-group">
            <label htmlFor="place-category">Категория</label>
            <select
              id="place-category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
        </div>

        <div className="form-group">
          <label htmlFor="place-description">Описание</label>
          <textarea
            id="place-description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Краткое описание места..."
            rows={3}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="place-lat">Широта</label>
            <input
              id="place-lat"
              type="text"
              value={formData.lat}
              onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
              placeholder="48.8584"
            />
          </div>

          <div className="form-group">
            <label htmlFor="place-lng">Долгота</label>
            <input
              id="place-lng"
              type="text"
              value={formData.lng}
              onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
              placeholder="2.2945"
            />
          </div>
        </div>

        {selectedCoordinates && (
          <p className="coordinates-hint">
            ✓ Выбраны координаты: {selectedCoordinates.lat.toFixed(4)}, {selectedCoordinates.lng.toFixed(4)}
          </p>
        )}

        <button type="submit" className="btn btn-primary">
          <Plus size={18} />
          Добавить место
        </button>
      </form>
    </div>
  );
};

export default AddPlaceForm;
