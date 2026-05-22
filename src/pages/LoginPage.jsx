import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { saveCurrentUser } from '../services/storageService';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Пожалуйста, введите ваше имя');
      return;
    }

    const user = {
      name: formData.name.trim(),
      email: formData.email.trim() || `${formData.name.toLowerCase().replace(/\s/g, '')}@example.com`,
      loginDate: new Date().toISOString()
    };

    saveCurrentUser(user);
    navigate('/trips');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <Compass size={48} />
            <h1>Вход в TravelRoom</h1>
            <p className="login-subtitle">
              Для курсового проекта используется демонстрационный вход
            </p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="user-name">Ваше имя</label>
              <input
                id="user-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Александр"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="user-email">Email (опционально)</label>
              <input
                id="user-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="alexander@example.com"
              />
              <small className="form-hint">
                Email используется для демонстрации функции уведомлений
              </small>
            </div>

            <button type="submit" className="btn btn-primary btn-large btn-full">
              Войти в демо-режиме
            </button>
          </form>

          <div className="login-footer">
            <p>
              Приложение создано в рамках курсовой работы по дисциплине «Фронтенд-разработка»
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
