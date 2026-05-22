import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, MessageSquare, ThumbsUp, Route, Mail, Cloud, Info } from 'lucide-react';
import { getRandomPresets } from '../data/routePresets';
import PopularRouteCard from '../components/PopularRouteCard';
import RoutePresetModal from '../components/RoutePresetModal';
import Footer from '../components/Footer';
import { createTrip, getCurrentUser } from '../services/storageService';
import { sendTripInvitations, isEmailNotificationsConfigured } from '../services/notificationService';

const HomePage = () => {
  const navigate = useNavigate();
  const [popularRoutes] = useState(getRandomPresets(3));
  const [selectedPreset, setSelectedPreset] = useState(null);

  const handleCreateFromPreset = async (preset, participantEmails) => {
    const currentUser = getCurrentUser();
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 30);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + parseInt(preset.duration.split('-')[0] || '3'));

    const participants = participantEmails.map(email => ({
      id: `participant-${Date.now()}-${Math.random()}`,
      email,
      name: email.split('@')[0],
      status: 'invited'
    }));

    const places = preset.places.map((place, index) => ({
      id: `place-${Date.now()}-${index}`,
      name: place.name,
      category: place.category,
      description: place.description,
      coordinates: {
        lat: place.latitude,
        lng: place.longitude
      },
      votesFor: place.votesFor || 0,
      votesAgainst: place.votesAgainst || 0,
      inRoute: place.inRoute || false
    }));

    const tripData = {
      title: preset.title,
      country: preset.country,
      city: preset.city,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      participants,
      coordinates: preset.coordinates,
      places,
      imageUrl: preset.imageUrl
    };

    const newTrip = createTrip(tripData);

    if (newTrip) {
      if (isEmailNotificationsConfigured() && participants.length > 0) {
        await sendTripInvitations(newTrip, currentUser?.name || 'Организатор');
      }

      setSelectedPreset(null);
      navigate(`/trips/${newTrip.id}`);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80)'
        }}></div>
        <div className="hero-overlay"></div>
        
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Планируйте путешествия вместе</h1>
            <p className="hero-subtitle">
              Создавайте поездки, обсуждайте маршрут, отмечайте места на карте и голосуйте за лучшие идеи
            </p>
            
            <div className="hero-actions">
              <button 
                className="btn btn-primary btn-large"
                onClick={() => navigate('/trips/new')}
              >
                Начать планирование
              </button>
              <button 
                className="btn btn-secondary btn-large"
                onClick={() => navigate('/trips')}
              >
                Мои поездки
              </button>
            </div>
          </div>

          {/* Mockup Card */}
          <div className="hero-mockup">
            <div className="mockup-card">
              <div className="mockup-header">
                <h3>Поездка в Париж</h3>
                <span className="mockup-badge">В процессе</span>
              </div>
              <div className="mockup-info">
                <div className="mockup-info-item">
                  <MapPin size={16} />
                  <span>Париж, Франция</span>
                </div>
                <div className="mockup-info-item">
                  <span>10.07.2026 — 15.07.2026</span>
                </div>
              </div>
              <div className="mockup-places">
                <div className="mockup-place">✓ Эйфелева башня</div>
                <div className="mockup-place">✓ Лувр</div>
                <div className="mockup-place">✓ Монмартр</div>
              </div>
              <button className="mockup-btn" onClick={() => navigate('/trips')}>
                Открыть маршрут
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="popular-routes-section">
        <div className="container">
          <h2 className="section-title">Популярные маршруты</h2>
          <p className="section-subtitle">Готовые маршруты для ваших путешествий</p>
          
          <div className="popular-routes-grid">
            {popularRoutes.map((preset) => (
              <PopularRouteCard
                key={preset.id}
                preset={preset}
                onClick={() => setSelectedPreset(preset)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Почему TravelRoom</h2>
          <p className="section-subtitle">Всё необходимое для совместного планирования</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <MessageSquare size={32} />
              </div>
              <h3>Чат поездки</h3>
              <p>Обсуждайте планы в реальном времени с участниками поездки</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <MapPin size={32} />
              </div>
              <h3>Яндекс Карты</h3>
              <p>Отмечайте места на карте и ищите интересные точки</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <ThumbsUp size={32} />
              </div>
              <h3>Голосование</h3>
              <p>Голосуйте за предложенные места и выбирайте лучшие варианты</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Route size={32} />
              </div>
              <h3>Итоговый маршрут</h3>
              <p>Формируйте финальный план поездки из выбранных мест</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Mail size={32} />
              </div>
              <h3>Email-приглашения</h3>
              <p>Приглашайте участников по email и уведомляйте о новостях</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Cloud size={32} />
              </div>
              <h3>Прогноз погоды</h3>
              <p>Получайте актуальный прогноз погоды на даты поездки</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Info size={32} />
              </div>
              <h3>Информация о городе</h3>
              <p>Узнайте больше о выбранном городе из Wikipedia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Preset Modal */}
      {selectedPreset && (
        <RoutePresetModal
          preset={selectedPreset}
          onClose={() => setSelectedPreset(null)}
          onCreate={handleCreateFromPreset}
        />
      )}

      <Footer />
    </div>
  );
};

export default HomePage;
