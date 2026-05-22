import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Map, Compass } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="header-logo">
            <Compass size={28} />
            <span>TravelRoom</span>
          </Link>
          
          <nav className="header-nav">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              end
            >
              Главная
            </NavLink>
            <NavLink 
              to="/trips" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Мои поездки
            </NavLink>
            <NavLink 
              to="/trips/new" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Создать поездку
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
