import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage, useAppData } from '../context/AppContext';
import { translations } from '../utils/translations';
import './StoryInput.css';

import animePreview from '../images/story-previews/anime.jpg';
import cartoonPreview from '../images/story-previews/cartoon.jpg';
import realisticPreview from '../images/story-previews/realistic.jpg';

const StoryInput = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { appData, updateAppData } = useAppData();
  const t = translations[language];
  const [story, setStory] = useState(appData.storyInput?.story || '');
  const [selectedStyle, setSelectedStyle] = useState(appData.storyInput?.selectedStyle || null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const storyStyles = [
    { 
      id: 'anime', 
      name: 'Anime Style',
      image: animePreview
    },
    { 
      id: 'cartoon', 
      name: 'Cartoon Style',
      image: cartoonPreview
    },
    { 
      id: 'realistic', 
      name: 'Realistic',
      image: realisticPreview
    }
  ];

  const handleGenerate = () => {
    updateAppData('storyInput', {
      story: story,
      selectedStyle: selectedStyle
    });
    navigate('/character-design');
  };

  return (
    <div className="story-container">
      <header className="screen-header">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>←</button>
        <h2 className="gradient-text">{t.storyInput}</h2>
        <div style={{width: '40px'}}></div>
      </header>

      <div className="story-content fade-in">
        <div className="story-input-section">
          <div className="card story-card">
            <h3>{t.describeStory}</h3>
            <textarea
              className="story-textarea"
              placeholder={t.storyPlaceholder}
              value={story}
              onChange={(e) => setStory(e.target.value)}
            />
          </div>

          <div className="card story-card">
            <h3>Story Style</h3>
            <div className="story-styles-grid">
              {storyStyles.map((style) => (
                <div
                  key={style.id}
                  className={`style-option ${selectedStyle === style.id ? 'active' : ''}`}
                  onClick={() => setSelectedStyle(style.id)}
                >
                  <div className="style-image-container">
                    <div className="style-image-wrapper">
                      <img 
                        src={style.image} 
                        alt={style.name} 
                        className="style-image"
                        onError={(e) => {
                          console.error('Error loading image:', e);
                          e.target.style.display = 'none';
                          // Create a fallback element
                          const container = e.target.parentNode;
                          const placeholder = document.createElement('div');
                          placeholder.className = 'style-placeholder-fallback';
                          placeholder.textContent = style.name.charAt(0);
                          placeholder.style.backgroundColor = style.id === 'anime' ? '#FF6B6B' : 
                                                      style.id === 'cartoon' ? '#4ECDC4' : '#45B7D1';
                          placeholder.style.width = '100%';
                          placeholder.style.height = '100%';
                          placeholder.style.display = 'flex';
                          placeholder.style.alignItems = 'center';
                          placeholder.style.justifyContent = 'center';
                          placeholder.style.fontSize = '24px';
                          placeholder.style.fontWeight = 'bold';
                          placeholder.style.color = 'white';
                          placeholder.style.borderRadius = '8px';
                          container.appendChild(placeholder);
                        }}
                        onLoad={(e) => {
                          // Make sure the image is visible when loaded
                          e.target.style.display = 'block';
                        }}
                      />
                    </div>
                  </div>
                  <div className="style-name">{style.name}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="button-container">
            <button className="btn btn-primary generate-btn" onClick={handleGenerate} disabled={!story.trim() || !selectedStyle}>
              {t.next} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryInput;