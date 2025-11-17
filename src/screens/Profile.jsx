import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage, useTheme } from '../context/AppContext';
import { translations } from '../utils/translations';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = translations[language];
  
  const [profileImage, setProfileImage] = useState(null);
  const [userData, setUserData] = useState({ username: 'User Name', email: 'user@example.com' });
  
  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
  }, []);
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <header className="screen-header">
        <div style={{width: '100px'}}></div>
        <h2 className="gradient-text">{t.profile}</h2>
        <div style={{width: '100px'}}></div>
      </header>

      <div className="profile-content fade-in">
        <div className="profile-header card" style={{padding: '40px 20px'}}>
          <div className="avatar-container">
            <div className="avatar" style={{width: '140px', height: '140px', fontSize: '80px'}}>
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="profile-image" />
              ) : (
                <span>👤</span>
              )}
            </div>
            <label htmlFor="image-upload" className="upload-button">
              📷
            </label>
            <input 
              id="image-upload" 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              style={{display: 'none'}} 
            />
          </div>
          <h2 style={{color: 'var(--text-primary)', fontSize: '28px', marginTop: '20px'}}>{userData.username}</h2>
          <p style={{color: 'var(--text-secondary)', fontSize: '18px', marginTop: '10px'}}>{userData.email}</p>
        </div>

        <button className="btn btn-secondary logout-btn" onClick={() => navigate('/')}>
          🚪 {t.logout}
        </button>
      </div>
    </div>
  );
};

export default Profile;