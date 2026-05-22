import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Route as RouteIcon } from 'lucide-react';
import { getTripById, updateTrip, getCurrentUser } from '../services/storageService';
import { formatDate } from '../utils/dateUtils';
import ChatPanel from '../components/ChatPanel';
import YandexMapView from '../components/YandexMapView';
import AddPlaceForm from '../components/AddPlaceForm';
import PlaceCard from '../components/PlaceCard';
import WeatherCard from '../components/WeatherCard';
import CityInfoCard from '../components/CityInfoCard';
import RouteSummary from '../components/RouteSummary';
import NotificationSettings from '../components/NotificationSettings';
import Toast from '../components/Toast';
import { notifyTripParticipants, showBrowserNotification } from '../services/notificationService';

const TripWorkspacePage = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadTrip();
  }, [tripId]);

  const loadTrip = () => {
    const foundTrip = getTripById(tripId);
    if (foundTrip) {
      setTrip(foundTrip);
    } else {
      navigate('/trips');
    }
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleSendMessage = async (messageText) => {
    const currentUser = getCurrentUser();
    const authorName = currentUser?.name || 'Гость';

    const newMessage = {
      id: `msg-${Date.now()}`,
      author: authorName,
      text: messageText,
      timestamp: new Date().toISOString(),
      isSystem: false
    };

    const updatedMessages = [...trip.messages, newMessage];
    updateTrip(trip.id, { messages: updatedMessages });
    loadTrip();

    showToast('Сообщение отправлено', 'success');

    // Browser notification
    showBrowserNotification('Новое сообщение в чате', {
      body: `${authorName}: ${messageText}`,
      icon: '/vite.svg'
    });

    // Email notifications
    if (emailNotificationsEnabled) {
      const result = await notifyTripParticipants(trip, authorName, messageText, true);
      if (result.sent > 0) {
        console.log(`Email отправлены ${result.sent} участникам`);
      }
    }
  };

  const handleMapClick = (coords) => {
    setSelectedCoordinates(coords);
  };

  const handlePlaceFound = (placeData) => {
    setSelectedCoordinates({
      lat: placeData.lat,
      lng: placeData.lng
    });
  };

  const handleAddPlace = (placeData) => {
    const newPlace = {
      id: `place-${Date.now()}`,
      ...placeData,
      votesFor: 0,
      votesAgainst: 0,
      inRoute: false
    };

    const updatedPlaces = [...trip.places, newPlace];
    
    const systemMessage = {
      id: `msg-${Date.now()}`,
      author: 'Система',
      text: `Добавлено новое место: ${placeData.name}`,
      timestamp: new Date().toISOString(),
      isSystem: true
    };

    const updatedMessages = [...trip.messages, systemMessage];

    updateTrip(trip.id, { 
      places: updatedPlaces,
      messages: updatedMessages
    });
    
    loadTrip();
    setSelectedCoordinates(null);
    showToast('Место успешно добавлено', 'success');
  };

  const handleVote = (placeId, voteType) => {
    const updatedPlaces = trip.places.map(place => {
      if (place.id === placeId) {
        return {
          ...place,
          votesFor: voteType === 'up' ? place.votesFor + 1 : place.votesFor,
          votesAgainst: voteType === 'down' ? place.votesAgainst + 1 : place.votesAgainst
        };
      }
      return place;
    });

    updateTrip(trip.id, { places: updatedPlaces });
    loadTrip();
  };

  const handleAddToRoute = (placeId) => {
    const updatedPlaces = trip.places.map(place => {
      if (place.id === placeId) {
        return { ...place, inRoute: true };
      }
      return place;
    });

    updateTrip(trip.id, { places: updatedPlaces });
    loadTrip();
    showToast('Место добавлено в маршрут', 'success');
  };

  const handleRemoveFromRoute = (placeId) => {
    const updatedPlaces = trip.places.map(place => {
      if (place.id === placeId) {
        return { ...place, inRoute: false };
      }
      return place;
    });

    updateTrip(trip.id, { places: updatedPlaces });
    loadTrip();
    showToast('Место удалено из маршрута', 'info');
  };

  const handleDeletePlace = (placeId) => {
    if (window.confirm('Вы уверены, что хотите удалить это место?')) {
      const updatedPlaces = trip.places.filter(p => p.id !== placeId);
      updateTrip(trip.id, { places: updatedPlaces });
      loadTrip();
      showToast('Место удалено', 'info');
    }
  };

  if (!trip) {
    return <div className="container">Загрузка...</div>;
  }

  return (
    <div className="trip-workspace-page">
      <div className="container">
        {/* Trip Header Card */}
        <div className="trip-header-card">
          <div className="trip-header-content">
            <h1 className="trip-title">{trip.title}</h1>
            <div className="trip-header-info">
              <div className="trip-info-badge">
                <MapPin size={18} />
                <span>{trip.city}, {trip.country}</span>
              </div>
              <div className="trip-info-badge">
                <Calendar size={18} />
                <span>{formatDate(trip.startDate)} — {formatDate(trip.endDate)}</span>
              </div>
              <div className="trip-info-badge">
                <Users size={18} />
                <span>{trip.participants.join(', ')}</span>
              </div>
            </div>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => navigate(`/trips/${trip.id}/route`)}
          >
            <RouteIcon size={20} />
            Итоговый маршрут
          </button>
        </div>

        {/* Chat and Map Grid */}
        <div className="workspace-grid">
          <ChatPanel 
            messages={trip.messages}
            onSendMessage={handleSendMessage}
          />
          <YandexMapView
            trip={trip}
            places={trip.places}
            onMapClick={handleMapClick}
            onPlaceFound={handlePlaceFound}
          />
        </div>

        {/* Weather and City Info */}
        <div className="info-grid">
          <WeatherCard trip={trip} />
          <CityInfoCard city={trip.city} />
        </div>

        {/* Add Place Form */}
        <AddPlaceForm 
          onAddPlace={handleAddPlace}
          selectedCoordinates={selectedCoordinates}
        />

        {/* Places List */}
        {trip.places.length > 0 && (
          <div className="places-section">
            <h2 className="section-title">Предложенные места</h2>
            <div className="places-grid">
              {trip.places.map(place => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  onVote={handleVote}
                  onAddToRoute={handleAddToRoute}
                  onDelete={handleDeletePlace}
                />
              ))}
            </div>
          </div>
        )}

        {/* Route Summary */}
        <RouteSummary 
          trip={trip}
          onRemoveFromRoute={handleRemoveFromRoute}
        />

        {/* Notification Settings */}
        <NotificationSettings
          emailEnabled={emailNotificationsEnabled}
          onToggleEmail={setEmailNotificationsEnabled}
        />
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default TripWorkspacePage;
