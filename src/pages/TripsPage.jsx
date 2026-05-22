import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { getTrips, deleteTrip } from '../services/storageService';
import TripCard from '../components/TripCard';
import EmptyState from '../components/EmptyState';

const TripsPage = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = () => {
    const allTrips = getTrips();
    setTrips(allTrips);
  };

  const handleDeleteTrip = (tripId) => {
    deleteTrip(tripId);
    loadTrips();
  };

  return (
    <div className="trips-page">
      <div className="container">
        <div className="trips-header">
          <div>
            <h1 className="page-title">Мои поездки</h1>
            <p className="page-subtitle">Управляйте своими путешествиями и планируйте новые маршруты</p>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/trips/new')}
          >
            <Plus size={20} />
            Создать поездку
          </button>
        </div>

        {trips.length === 0 ? (
          <EmptyState
            title="У вас пока нет поездок"
            description="Создайте первую поездку, добавьте участников и начните планировать маршрут вместе"
            actionText="Создать первую поездку"
            actionPath="/trips/new"
          />
        ) : (
          <div className="trips-grid">
            {trips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onDelete={handleDeleteTrip}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripsPage;
