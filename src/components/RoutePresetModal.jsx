import React, { useState } from 'react';
import { X, MapPin, Users } from 'lucide-react';
import { isValidEmail } from '../utils/validationUtils';

const RoutePresetModal = ({ preset, onClose, onCreate }) => {
  const [participantsInput, setParticipantsInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    const emails = participantsInput
      .split(',')
      .map(e => e.trim())
      .filter(e => e.length > 0);

    const validEmails = emails.filter(e => isValidEmail(e));

    if (emails.length > 0 && validEmails.length === 0) {
      alert('Пожалуйста, введите корректные email адреса');
      return;
    }

    setLoading(true);
    await onCreate(preset, validEmails);
    setLoading(false);
  };

  if (!preset) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content route-preset-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Закрыть">
          <X size={24} />
        </button>

        <div 
          className="modal-header-image"
          style={{ backgroundImage: `url(${preset.imageUrl})` }}
        >
          <div className="modal-header-overlay">
            <h2>{preset.title}</h2>
            <p><MapPin size={18} /> {preset.city}, {preset.country}</p>
          </div>
        </div>

        <div className="modal-body">
          <p className="preset-description">{preset.description}</p>

          <div className="preset-info">
            <span><strong>Длительность:</strong> {preset.duration}</span>
            <span><strong>Мест в маршруте:</strong> {preset.places.length}</span>
          </div>

          <div className="preset-places">
            <h3>Места маршрута:</h3>
            <ul>
              {preset.places.map((place, index) => (
                <li key={index} className="preset-place-item">
                  <span className="place-number">{index + 1}</span>
                  <div>
                    <strong>{place.name}</strong>
                    <p>{place.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="preset-participants">
            <h3><Users size={20} /> Пригласить участников</h3>
            <p className="input-hint">Введите email участников через запятую</p>
            <input
              type="text"
              placeholder="ivan@example.com, maria@example.com"
              value={participantsInput}
              onChange={(e) => setParticipantsInput(e.target.value)}
            />
          </div>

          <button 
            className="btn btn-primary btn-large btn-full"
            onClick={handleCreate}
            disabled={loading}
          >
            {loading ? 'Создание...' : 'Создать поездку по маршруту'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoutePresetModal;
