import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/AppContext';
import './BottomNav.css';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  if (location.pathname === '/') {
    return null;
  }

  const navItems = [
    { id: 'home', icon: '🏠', label: 'Home', path: '/home' },
    { id: 'profile', icon: '👤', label: 'Profile', path: '/profile' },
    { id: 'settings', icon: '⚙️', label: 'Settings', path: '/settings' }
  ];

  const isActive = (path) => {
    if (path === '/home') {
      return location.pathname === '/home' || location.pathname === '/';
    }
    return location.pathname === path;
  };

  return (
    <nav className={`bottom-nav ${theme}`}>
      {navItems.map((item) => (
        <div
          key={item.id}
          className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}
    </nav>
  );
};

export default BottomNav;