import { getMockTrip } from '../data/mockData';

const STORAGE_KEYS = {
  CURRENT_USER: 'travelroom_current_user',
  TRIPS: 'travelroom_trips',
  INITIALIZED: 'travelroom_initialized'
};

// Пользователь
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Ошибка чтения пользователя из localStorage:', error);
    return null;
  }
};

export const saveCurrentUser = (user) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } catch (error) {
    console.error('Ошибка сохранения пользователя:', error);
  }
};

export const logoutCurrentUser = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  } catch (error) {
    console.error('Ошибка выхода:', error);
  }
};

// Поездки
export const getTrips = () => {
  try {
    const trips = localStorage.getItem(STORAGE_KEYS.TRIPS);
    return trips ? JSON.parse(trips) : [];
  } catch (error) {
    console.error('Ошибка чтения поездок из localStorage:', error);
    return [];
  }
};

export const saveTrips = (trips) => {
  try {
    localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(trips));
  } catch (error) {
    console.error('Ошибка сохранения поездок:', error);
  }
};

export const getTripById = (id) => {
  const trips = getTrips();
  return trips.find(trip => trip.id === id);
};

export const createTrip = (tripData) => {
  try {
    const trips = getTrips();
    const newTrip = {
      id: `trip-${Date.now()}`,
      ...tripData,
      places: [],
      messages: [],
      route: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    trips.push(newTrip);
    saveTrips(trips);
    return newTrip;
  } catch (error) {
    console.error('Ошибка создания поездки:', error);
    return null;
  }
};

export const updateTrip = (id, updates) => {
  try {
    const trips = getTrips();
    const index = trips.findIndex(trip => trip.id === id);
    if (index !== -1) {
      trips[index] = {
        ...trips[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      saveTrips(trips);
      return trips[index];
    }
    return null;
  } catch (error) {
    console.error('Ошибка обновления поездки:', error);
    return null;
  }
};

export const deleteTrip = (id) => {
  try {
    const trips = getTrips();
    const filtered = trips.filter(trip => trip.id !== id);
    saveTrips(filtered);
    return true;
  } catch (error) {
    console.error('Ошибка удаления поездки:', error);
    return false;
  }
};

// Инициализация mock-данных
export const initializeMockDataIfNeeded = () => {
  try {
    const initialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
    if (!initialized) {
      const mockTrip = getMockTrip();
      saveTrips([mockTrip]);
      localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
      console.log('Mock-данные инициализированы');
    }
  } catch (error) {
    console.error('Ошибка инициализации mock-данных:', error);
  }
};

export const resetMockData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.TRIPS);
    localStorage.removeItem(STORAGE_KEYS.INITIALIZED);
    initializeMockDataIfNeeded();
  } catch (error) {
    console.error('Ошибка сброса данных:', error);
  }
};
