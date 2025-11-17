import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage, useAppData } from '../context/AppContext';
import { translations } from '../utils/translations';
import './OutputStyle.css';

import animeDemoVideo from '../videos/anime_demo.mp4';
import realisticDemoVideo from '../videos/realistic_demo.mp4';

const OutputStyle = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { appData, updateAppData } = useAppData();
  const t = translations[language];
  
  const [selectedResolution, setSelectedResolution] = useState(
    appData.outputStyle?.selectedResolution || null
  );
  
  const [currentVideo, setCurrentVideo] = useState('anime_demo');

  useEffect(() => {
    updateAppData('outputStyle', {
      selectedResolution
    });
  }, [selectedResolution]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const { story, selectedStyle } = appData.storyInput || {};
    
    let video = 'anime_demo';
    
    if (selectedStyle) {
      if (selectedStyle === 'realistic') {
        video = 'realistic_demo';
      }
      else {
        video = 'anime_demo';
      }
    }
    
    setCurrentVideo(video);
  }, [appData]);

  const resolutions = ['480p', '720p', '1080p', '4K'];

  const handleDownload = () => {
    if (!selectedResolution) {
      alert('Please select a resolution first!');
      return;
    }
    alert(`Video download started at ${selectedResolution} resolution!`);
  };

  const handleShare = () => {
    if (!selectedResolution) {
      alert('Please select a resolution first!');
      return;
    }
    alert(`Video shared successfully at ${selectedResolution} resolution!`);
  };

  const getVideoSource = () => {
    return currentVideo === 'anime_demo' ? animeDemoVideo : realisticDemoVideo;
  };

  return (
    <div className="output-container">
      <header className="screen-header">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>← {t.back}</button>
        <h2 className="gradient-text">{t.outputStyle}</h2>
        <div style={{width: '100px'}}></div>
      </header>

      <div className="output-content fade-in">
        <div className="output-frame">
          <div className="preview-section card">
            <h3>{t.preview}</h3>
            <div className="preview-video">
              <video 
                src={getVideoSource()}
                style={{ width: '100%', height: 'auto', maxHeight: '200px', borderRadius: '12px', marginBottom: '15px' }}
                controls={false}
                muted
              />
              <div style={{fontSize: '16px', color: 'var(--text-secondary)', textAlign: 'center'}}>
                {currentVideo === 'anime_demo' ? 'Anime Style Demo' : 'Realistic Style Demo'}
              </div>
              <div style={{marginTop: '10px', fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'center'}}>
                Final Output Preview
              </div>
            </div>
          </div>

          <div className="resolution-section card">
            <h3>{t.resolution}</h3>
            <div className="stack-options">
              {resolutions.map(res => (
                <div
                  key={res}
                  className={`option-btn ${selectedResolution === res ? 'active' : ''}`}
                  onClick={() => setSelectedResolution(res)}
                >
                  <span className="option-label">{res}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="action-buttons">
            <button 
              className="btn btn-primary download-btn"
              onClick={handleDownload}
            >
              📥 {t.download}
            </button>
            <button 
              className="btn btn-secondary share-btn"
              onClick={handleShare}
            >
              📤 {t.share}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutputStyle;