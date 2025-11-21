import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage, useAppData } from '../context/AppContext';
import { translations } from '../utils/translations';
import logoImage from '../images/logo/logo.png'; // Import the logo as a module
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { resetAppData } = useAppData();
  const t = translations[language];
  
  const [userData, setUserData] = useState({ username: 'User' });
  
  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
  }, []);

  const features = [
    { id: 1, title: 'Story Input', icon: '📝' },
    { id: 2, title: 'Character Design', icon: '👤' },
    { id: 3, title: 'Scene Editing', icon: '🎬' },
    { id: 4, title: 'Voiceover', icon: '🎤' },
    { id: 5, title: 'Music & Effects', icon: '🎵' },
    { id: 6, title: 'Export Video', icon: '📤' }
  ];

  const handleCreateNew = () => {
    resetAppData();
    navigate('/story-input');
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div></div>
        <div className="logo-section">
          <img src={logoImage} alt="AnimeMaker AI Logo" className="app-logo" />
          <h1 style={{fontFamily: "'Montserrat', sans-serif", fontSize: '28px', margin: 0, fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px'}}>AnimeMaker AI</h1>
        </div>
        <div></div>
      </header>

      <div className="welcome-message-left">
        <h2>{t.welcomeMessage?.replace('{username}', userData.username) || `Welcome, ${userData.username}!`}</h2>
      </div>

      <div className="hero-section fade-in medium-hero">
        <h2>
          {t.createAmazing} <span style={{color: '#21538B'}}>{t.animeVideos}</span>
        </h2>
        <p style={{color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '25px'}}>
          {t.transformStories}
        </p>
        <button className="btn btn-primary" onClick={handleCreateNew} style={{fontSize: '16px', padding: '12px 30px'}}>
          ✨ {t.createNew}
        </button>
      </div>

      <div className="features-section compact">
        <h3>{t.keyFeatures}</h3>
        <div className="features-grid">
          {features.map(feature => (
            <div key={feature.id} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <span className="feature-title">{feature.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;