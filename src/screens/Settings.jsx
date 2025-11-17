import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage, useTheme } from '../context/AppContext';
import { translations } from '../utils/translations';
import './Settings.css';

const Settings = () => {
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = translations[language];

  const handleContactUs = () => {
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=026ekka@gmail.com', '_blank');
  };

  return (
    <div className="settings-container">
      <header className="screen-header">
        <div style={{width: '100px'}}></div>
        <h2 className="gradient-text">{t.settings}</h2>
        <div style={{width: '100px'}}></div>
      </header>

      <div className="settings-content fade-in">
        <div className="settings-section card">
          <h3 style={{marginBottom: '16px', color: 'var(--text-primary)'}}>{t.settings}</h3>
          
          <div className="setting-item">
            <div>
              <h4 style={{color: 'var(--text-primary)'}}>{t.language}</h4>
              <p style={{color: 'var(--text-secondary)', fontSize: '14px'}}>
                {t.chooseLanguage}
              </p>
            </div>
            <div className="language-buttons">
              <button
                className={`btn ${language === 'en' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => changeLanguage('en')}
                style={{padding: '8px 20px', fontSize: '14px'}}
              >
                English
              </button>
              <button
                className={`btn ${language === 'hi' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => changeLanguage('hi')}
                style={{padding: '8px 20px', fontSize: '14px'}}
              >
                हिंदी
              </button>
            </div>
          </div>

          <div className="setting-item">
            <div>
              <h4 style={{color: 'var(--text-primary)'}}>{t.theme}</h4>
              <p style={{color: 'var(--text-secondary)', fontSize: '14px'}}>
                {t.switchTheme}
              </p>
            </div>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
            >
              {theme === 'light' ? '🌙 ' + t.dark : '☀️ ' + t.light}
            </button>
          </div>

          <div className="setting-item">
            <div>
              <h4 style={{color: 'var(--text-primary)'}}>{t.notifications}</h4>
              <p style={{color: 'var(--text-secondary)', fontSize: '14px'}}>
                {t.enableNotifications}
              </p>
            </div>
            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="switch-slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div>
              <h4 style={{color: 'var(--text-primary)'}}>{t.contactUs}</h4>
              <p style={{color: 'var(--text-secondary)', fontSize: '14px'}}>
                {t.haveQuestions}
              </p>
            </div>
            <button
              className="btn btn-secondary"
              onClick={handleContactUs}
              style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', padding: '0', fontSize: '20px'}}
            >
              📧
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;