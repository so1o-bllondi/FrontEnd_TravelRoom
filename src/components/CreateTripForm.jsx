import React, { useState } from 'react';
import { Loader } from 'lucide-react';

const CreateTripForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    country: '',
    city: '',
    startDate: '',
    endDate: '',
    participants: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.city.trim() || !formData.country.trim()) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      alert('Пожалуйста, укажите даты поездки');
      return;
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      alert('Дата начала не может быть позже даты окончания');
      return;
    }

    const participants = formData.participants
      .split(',')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    onSubmit({
      title: formData.title.trim(),
      country: formData.country.trim(),
      city: formData.city.trim(),
      startDate: formData.startDate,
      endDate: formData.endDate,
      participants: participants.length > 0 ? participants : ['Вы']
    });
  };

  return (
    <form className="create-trip-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="trip-title">Название поездки *</label>
        <input
          id="trip-title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Например: Летний уикенд в Париже"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="trip-country">Страна *</label>
          <input
            id="trip-country"
            type="text"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            placeholder="Франция"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="trip-city">Город *</label>
          <input
            id="trip-city"
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="Париж"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="trip-start-date">Дата начала *</label>
          <input
            id="trip-start-date"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="trip-end-date">Дата окончания *</label>
          <input
            id="trip-end-date"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="trip-participants">Участники (через запятую)</label>
        <input
          id="trip-participants"
          type="text"
          value={formData.participants}
          onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
          placeholder="Александр, Мария, Иван"
        />
        <small className="form-hint">
          Укажите имена или email участников через запятую. Если не указать, участником будете только вы.
        </small>
      </div>

      <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
        {loading ? (
          <>
            <Loader size={20} className="spinner" />
            Создание...
          </>
        ) : (
          'Создать поездку'
        )}
      </button>
    </form>
  );
};

export default CreateTripForm;
