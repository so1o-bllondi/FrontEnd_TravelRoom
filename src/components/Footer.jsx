import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-about">
            <div className="footer-logo">
              <Compass size={28} />
              <span>TravelRoom</span>
            </div>
            <p className="footer-description">
              Сервис для совместного планирования путешествий
            </p>
          </div>

          <div className="footer-column">
            <h4>Навигация</h4>
            <ul>
              <li><Link to="/">Главная</Link></li>
              <li><Link to="/trips">Мои поездки</Link></li>
              <li><Link to="/trips/new">Создать поездку</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Технологии</h4>
            <ul>
              <li>React</li>
              <li>Vite</li>
              <li>Яндекс Карты</li>
              <li>Open-Meteo</li>
              <li>Wikipedia</li>
              <li>EmailJS</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Учебный проект по фронтенд-разработке © {currentYear}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
