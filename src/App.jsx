import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TripsPage from './pages/TripsPage';
import CreateTripPage from './pages/CreateTripPage';
import TripWorkspacePage from './pages/TripWorkspacePage';
import RoutePage from './pages/RoutePage';
import { initializeMockDataIfNeeded } from './services/storageService';

const App = () => {
  useEffect(() => {
    // Инициализировать mock-данные при первом запуске
    initializeMockDataIfNeeded();
  }, []);

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/trips/new" element={<CreateTripPage />} />
          <Route path="/trips/:tripId" element={<TripWorkspacePage />} />
          <Route path="/trips/:tripId/route" element={<RoutePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
