import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';
import './styles/layout.css';
import './styles/header.css';
import './styles/footer.css';
import './styles/home.css';
import './styles/forms.css';
import './styles/workspace.css';
import './styles/cards.css';
import './styles/chat.css';
import './styles/map.css';
import './styles/weather.css';
import './styles/notifications.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
